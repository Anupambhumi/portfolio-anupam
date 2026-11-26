import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

const TOKEN_KEY = 'admin-token';

export default function Admin() {
  const [token, setToken] = useState('');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(null);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  const api = useCallback(
    async (url, options = {}, auth = token) => {
      const res = await fetch(url, { ...options, headers: { ...options.headers, Authorization: `Bearer ${auth}` } });
      if (res.status === 204) return null;
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw Object.assign(new Error(data.error || `Request failed (${res.status})`), { status: res.status });
      return data;
    },
    [token]
  );

  const load = useCallback(
    async (auth) => {
      setError('');
      try {
        const [m, s] = await Promise.all([api('/api/admin/messages', {}, auth), api('/api/admin/stats', {}, auth)]);
        setMessages(m.messages);
        setStats(s);
        setToken(auth);
        try {
          sessionStorage.setItem(TOKEN_KEY, auth);
        } catch {}
      } catch (err) {
        setError(err.message);
        if (err.status === 401) {
          setToken('');
          try {
            sessionStorage.removeItem(TOKEN_KEY);
          } catch {}
        }
      }
    },
    [api]
  );

  useEffect(() => {
    let saved = '';
    try {
      saved = sessionStorage.getItem(TOKEN_KEY) || '';
    } catch {}
    if (saved) load(saved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleRead = async (m) => {
    const { message } = await api(`/api/admin/messages?id=${encodeURIComponent(m.id)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read: !m.read }),
    });
    setMessages((list) => list.map((x) => (x.id === m.id ? message : x)));
  };

  const remove = async (m) => {
    if (!window.confirm(`Delete the message from ${m.name}?`)) return;
    await api(`/api/admin/messages?id=${encodeURIComponent(m.id)}`, { method: 'DELETE' });
    setMessages((list) => list.filter((x) => x.id !== m.id));
  };

  const logout = () => {
    try {
      sessionStorage.removeItem(TOKEN_KEY);
    } catch {}
    setToken('');
    setMessages(null);
    setStats(null);
  };

  const days = stats ? Object.entries(stats.days).sort(([a], [b]) => a.localeCompare(b)).slice(-14) : [];
  const maxDay = Math.max(1, ...days.map(([, n]) => n));
  const today = new Date().toISOString().slice(0, 10);

  return (
    <>
      <Head>
        <title>Admin | Anupam</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="admin">
        <header className="admin-bar container">
          <Link href="/" className="brand">
            <span className="brand-mark">A</span>
            <span>Admin</span>
          </Link>
          <div className="nav-actions">
            <ThemeToggle />
            {token && (
              <button type="button" className="btn btn-ghost btn-sm" onClick={logout}>
                Log out
              </button>
            )}
          </div>
        </header>

        <main className="container admin-main">
          {!token ? (
            <form
              className="card admin-login"
              onSubmit={(e) => {
                e.preventDefault();
                load(input.trim());
              }}
            >
              <h1>Sign in</h1>
              <p className="muted">Enter the ADMIN_TOKEN configured for this site.</p>
              <div className="field">
                <label htmlFor="token">Admin token</label>
                <input id="token" type="password" value={input} onChange={(e) => setInput(e.target.value)} autoFocus />
              </div>
              <button type="submit" className="btn btn-primary" disabled={!input.trim()}>
                Continue
              </button>
              {error && <p className="form-status error">{error}</p>}
            </form>
          ) : (
            <>
              {error && <p className="form-status error">{error}</p>}
              <div className="grid grid-3 stat-row">
                <div className="card stat">
                  <span className="muted small">Total page views</span>
                  <strong>{stats?.total ?? 0}</strong>
                </div>
                <div className="card stat">
                  <span className="muted small">Today</span>
                  <strong>{stats?.days?.[today] ?? 0}</strong>
                </div>
                <div className="card stat">
                  <span className="muted small">Unread messages</span>
                  <strong>{messages?.filter((m) => !m.read).length ?? 0}</strong>
                </div>
              </div>

              <div className="grid grid-2">
                <section className="card admin-panel">
                  <h2>Last 14 days</h2>
                  {days.length ? (
                    <ul className="bars">
                      {days.map(([day, n]) => (
                        <li key={day}>
                          <span className="small muted">{day.slice(5)}</span>
                          <span className="bar">
                            <span style={{ width: `${(n / maxDay) * 100}%` }} />
                          </span>
                          <span className="small">{n}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="muted">No visits recorded yet.</p>
                  )}
                </section>
                <section className="card admin-panel">
                  <h2>Top pages</h2>
                  <ul className="top-pages">
                    {Object.entries(stats?.paths || {})
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 8)
                      .map(([p, n]) => (
                        <li key={p}>
                          <code>{p}</code>
                          <span>{n}</span>
                        </li>
                      ))}
                  </ul>
                </section>
              </div>

              <section className="admin-messages">
                <div className="admin-messages-head">
                  <h2>Messages ({messages?.length ?? 0})</h2>
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => load(token)}>
                    <i className="fas fa-sync-alt" aria-hidden="true" /> Refresh
                  </button>
                </div>
                {messages?.length ? (
                  messages.map((m) => (
                    <article key={m.id} className={`card message${m.read ? ' read' : ''}`}>
                      <div className="message-head">
                        <div>
                          <strong>{m.name}</strong>{' '}
                          <a href={`mailto:${m.email}?subject=${encodeURIComponent(`Re: ${m.subject || 'your message'}`)}`}>
                            {m.email}
                          </a>
                          <div className="muted small">{new Date(m.createdAt).toLocaleString()}</div>
                        </div>
                        <div className="message-actions">
                          <button type="button" className="btn btn-ghost btn-sm" onClick={() => toggleRead(m)}>
                            {m.read ? 'Mark unread' : 'Mark read'}
                          </button>
                          <button type="button" className="btn btn-ghost btn-sm danger" onClick={() => remove(m)}>
                            Delete
                          </button>
                        </div>
                      </div>
                      {m.subject && <p className="message-subject">{m.subject}</p>}
                      <p className="message-text">{m.message}</p>
                    </article>
                  ))
                ) : (
                  <p className="muted">No messages yet.</p>
                )}
              </section>
            </>
          )}
        </main>
      </div>
    </>
  );
}

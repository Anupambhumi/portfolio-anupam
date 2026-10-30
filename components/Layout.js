import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import profile from '@/data/profile.json';
import ThemeToggle from './ThemeToggle';

const NAV = [
  { href: '/#about', label: 'About' },
  { href: '/experience', label: 'Experience' },
  { href: '/projects', label: 'Projects' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#publications', label: 'Publications' },
  { href: '/#contact', label: 'Contact' },
];

function useRevealOnScroll(key) {
  useEffect(() => {
    const items = document.querySelectorAll('.reveal:not(.in)');
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('in'));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }),
      { rootMargin: '0px 0px -8% 0px' }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key]);
}

function useVisitTracking(path) {
  useEffect(() => {
    if (path.startsWith('/admin')) return;
    const body = JSON.stringify({ path });
    // sendBeacon survives navigation; fall back to fetch.
    if (!navigator.sendBeacon?.('/api/visit', new Blob([body], { type: 'application/json' }))) {
      fetch('/api/visit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }).catch(
        () => {}
      );
    }
  }, [path]);
}

export default function Layout({ title, description, children }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = router.asPath.split(/[?#]/)[0];

  useRevealOnScroll(router.asPath);
  useVisitTracking(path);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [router.asPath]);

  const fullTitle = title ? `${title} | ${profile.shortName}` : `${profile.name} | ${profile.title}`;
  const desc = description || profile.summary;

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={desc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content={profile.photo} />
        <meta name="theme-color" content="#4f46e5" />
      </Head>

      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header className={`site-header${scrolled ? ' scrolled' : ''}${open ? ' open' : ''}`}>
        <div className="container nav-row">
          <Link href="/" className="brand" aria-label="Home">
            <span className="brand-mark">A</span>
            <span>{profile.shortName}</span>
          </Link>

          <nav id="site-nav" className="site-nav" aria-label="Main">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={path !== '/' && item.href === path ? 'active' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="nav-actions">
            <ThemeToggle />
            <button
              type="button"
              className="icon-btn menu-btn"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="site-nav"
              onClick={() => setOpen((o) => !o)}
            >
              <i className={open ? 'fas fa-times' : 'fas fa-bars'} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <main id="main">{children}</main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <Link href="/" className="brand">
              <span className="brand-mark">A</span>
              <span>{profile.shortName}</span>
            </Link>
            <p className="muted">
              Thanks for stopping by. Say hi through the contact form, or ask the chat assistant in the corner.
            </p>
          </div>
          <div>
            <h3 className="footer-title">Explore</h3>
            <ul className="footer-links">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="footer-title">Contact</h3>
            <p className="muted">
              <i className="fas fa-envelope" aria-hidden="true" /> <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </p>
            <p className="muted">
              <i className="fas fa-map-marker-alt" aria-hidden="true" /> {profile.location}
            </p>
            <div className="socials">
              {profile.socials.map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noreferrer" aria-label={s.name} className="icon-btn">
                  <i className={s.icon} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <a href="#main" className="muted">
            Back to top <i className="fas fa-arrow-up" aria-hidden="true" />
          </a>
        </div>
      </footer>
    </>
  );
}

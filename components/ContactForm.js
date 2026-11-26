import { useState } from 'react';

const INITIAL = { name: '', email: '', subject: '', message: '', website: '' };

export default function ContactForm({ email }) {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const update = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'sending', message: '' });
    setErrors({});
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrors(data.errors || {});
        setStatus({ state: 'error', message: data.error || 'Something went wrong. Please try again.' });
        return;
      }
      setValues(INITIAL);
      setStatus({ state: 'sent', message: "Thanks! Your message is in. I'll get back to you soon." });
    } catch {
      setStatus({ state: 'error', message: `Network error. You can also email me at ${email}.` });
    }
  };

  const field = (name, label, props = {}) => (
    <div className={`field${errors[name] ? ' has-error' : ''}`}>
      <label htmlFor={`cf-${name}`}>{label}</label>
      {props.as === 'textarea' ? (
        <textarea
          id={`cf-${name}`}
          name={name}
          rows={5}
          value={values[name]}
          onChange={update}
          aria-invalid={Boolean(errors[name])}
          aria-describedby={errors[name] ? `cf-${name}-err` : undefined}
          required={props.required}
        />
      ) : (
        <input
          id={`cf-${name}`}
          name={name}
          type={props.type || 'text'}
          value={values[name]}
          onChange={update}
          autoComplete={props.autoComplete}
          aria-invalid={Boolean(errors[name])}
          aria-describedby={errors[name] ? `cf-${name}-err` : undefined}
          required={props.required}
        />
      )}
      {errors[name] && (
        <span id={`cf-${name}-err`} className="field-error">
          {errors[name]}
        </span>
      )}
    </div>
  );

  return (
    <form className="card contact-form" onSubmit={submit} noValidate>
      <div className="field-row">
        {field('name', 'Name', { autoComplete: 'name', required: true })}
        {field('email', 'Email', { type: 'email', autoComplete: 'email', required: true })}
      </div>
      {field('subject', 'Subject (optional)')}
      {field('message', 'Message', { as: 'textarea', required: true })}

      {/* Honeypot for bots; hidden from people and assistive tech. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={update} />
      </div>

      <div className="form-footer">
        <button type="submit" className="btn btn-primary" disabled={status.state === 'sending'}>
          {status.state === 'sending' ? 'Sending…' : 'Send message'} <i className="fas fa-paper-plane" aria-hidden="true" />
        </button>
        <p className={`form-status ${status.state}`} role="status">
          {status.message}
        </p>
      </div>
    </form>
  );
}

import React, { useState } from 'react';
import './contact.css';

// Form submissions go through the serverless proxy /api/contact
// which adds honeypot + rate-limit + server-side validation before
// forwarding to Formspree. No Formspree endpoint is exposed client-side.
const API_ENDPOINT = '/api/contact';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const form = e.target;

    // Honeypot: if hidden field got filled (bot), silently drop without hitting API
    const honeypotValue = form.elements['website']?.value;
    if (honeypotValue && honeypotValue.trim() !== '') {
      // Pretend success so bots don't learn
      setSent(true);
      setTimeout(() => setSent(false), 3000);
      form.reset();
      return;
    }

    // Minimal client-side rate check: ignore submissions faster than 2s apart
    const now = Date.now();
    const lastSubmit = parseInt(form.dataset.lastSubmit || '0', 10);
    if (now - lastSubmit < 2000) {
      setError('Please wait a moment before sending again.');
      return;
    }
    form.dataset.lastSubmit = String(now);

    const data = new FormData(form);
    setSubmitting(true);

    try {
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (res.status === 429) {
        const json = await res.json().catch(() => ({}));
        setError(json.error || 'Too many messages. Please try again later.');
        setSubmitting(false);
        return;
      }

      if (res.ok) {
        setSent(true);
        form.reset();
        setTimeout(() => setSent(false), 3000);
      } else {
        const json = await res.json().catch(() => ({}));
        setError(json.error || 'Gagal mengirim.');
      }
    } catch (err) {
      setError('Network error.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="container">
        <h2>Contact Me</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <input name="name" placeholder="Name" required />
          <input name="email" type="email" placeholder="Email" required />
          <textarea name="message" placeholder="Message" rows="4" required />
          {/* Honeypot — hidden from humans, bots fill it */}
          <input
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
            onChange={() => {}}
          />
          <button type="submit" disabled={submitting}>
            {submitting ? 'Sending…' : 'Send'}
          </button>
        </form>
        {sent && <p className="success">Thank you, the message was sent!</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </section>
  );
}

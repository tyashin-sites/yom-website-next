'use client';

import { useEffect, useState } from 'react';
import { siteConfig } from '@/config/site';

const TOPICS = ['Demo', 'Pricing', 'Agency / multi-client', 'Platform / embedding', 'Privacy & security', 'Other'];
const VOLUMES = ['Under 100K', '100K – 1M', '1M – 10M', '10M – 100M', '100M +', 'Not sure'];

const field =
  'mt-2 w-full rounded-md border border-border bg-paper px-3.5 py-3 text-[0.98rem] text-foreground placeholder:text-muted focus:border-foreground focus:outline-none';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');
  // Time-trap for the Contact Form plugin: submissions < 2 s after render are spam.
  const [renderedAt, setRenderedAt] = useState(0);
  useEffect(() => setRenderedAt(Date.now()), []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...Object.fromEntries(fd.entries()), renderedAt }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || 'Something went wrong.');
      setStatus('done');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (status === 'done') {
    return (
      <div className="card p-8" role="status" aria-live="polite">
        <p className="eyebrow">Received</p>
        <h2 className="tt-h2 mt-3">Thanks. A person will read this.</h2>
        <p className="mt-4 text-muted">
          We reply from {siteConfig.contact.email}. If it&rsquo;s urgent, call{' '}
          <a className="tt-num underline" href={siteConfig.contact.phoneHref}>
            {siteConfig.contact.phone}
          </a>
          . In the meantime you can{' '}
          <a className="underline" href={siteConfig.app.signUp}>
            start free
          </a>
          ; no credit card needed.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card grid gap-5 p-6 sm:grid-cols-2 sm:p-8" noValidate={false}>
      <div>
        <label htmlFor="c-name" className="text-sm font-semibold">
          Name
        </label>
        <input id="c-name" name="name" required autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor="c-email" className="text-sm font-semibold">
          Work email
        </label>
        <input id="c-email" name="email" type="email" required autoComplete="email" className={field} />
      </div>
      <div>
        <label htmlFor="c-company" className="text-sm font-semibold">
          Company <span className="font-normal text-muted">(optional)</span>
        </label>
        <input id="c-company" name="company" autoComplete="organization" className={field} />
      </div>
      <div>
        <label htmlFor="c-topic" className="text-sm font-semibold">
          What&rsquo;s this about?
        </label>
        <select id="c-topic" name="topic" defaultValue="Demo" className={field}>
          {TOPICS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="c-volume" className="text-sm font-semibold">
          Roughly how many events a month? <span className="font-normal text-muted">(optional)</span>
        </label>
        <select id="c-volume" name="volume" defaultValue="" className={field}>
          <option value="">Choose a range</option>
          {VOLUMES.map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="c-message" className="text-sm font-semibold">
          Message <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea id="c-message" name="message" rows={5} className={field} />
      </div>
      {/* Honeypot — hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="c-website">Website</label>
        <input id="c-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          We use these details only to reply. See the <a href="/privacy" className="underline">privacy notice</a>.
        </p>
        <button type="submit" disabled={status === 'sending'} className="btn btn-primary disabled:opacity-60">
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
      </div>
      {status === 'error' ? (
        <p role="alert" className="text-sm font-semibold text-primary sm:col-span-2">
          {error} You can also email {siteConfig.contact.email}.
        </p>
      ) : null}
    </form>
  );
}

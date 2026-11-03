'use client';

import { useState, type FormEvent } from 'react';
import {
  GRIEVANCE_CATEGORIES,
  GRIEVANCE_COPY,
  GRIEVANCE_EMAIL,
  findGrievanceCategory,
  type GrievanceLang,
} from '@/lib/grievance';

const field =
  'mt-2 w-full rounded-md border border-border bg-paper px-3.5 py-3 text-[0.98rem] text-foreground placeholder:text-muted focus:border-foreground focus:outline-none';

/** Complaint form for the Grievance Officer page (IT Rules 3(2)). Posts to /api/grievance. */
export function GrievanceForm({ lang = 'en' }: { lang?: GrievanceLang }) {
  const t = GRIEVANCE_COPY[lang];
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ reference: string | null; clock: string }>({ reference: null, clock: '' });
  // Time-trap for the Contact Form plugin: submissions < 2 s after render are treated as spam.
  // Set at first render (on the client during hydration), so a fast submit never sends 0.
  const [renderedAt] = useState(() => Date.now());

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const categoryId = String(fd.get('category') ?? '');
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/grievance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...Object.fromEntries(fd.entries()), lang, renderedAt }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; reference?: string | null; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || '');
      setResult({ reference: data.reference ?? null, clock: findGrievanceCategory(categoryId)?.clock[lang] ?? '' });
      setStatus('done');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : '');
    }
  }

  if (status === 'done') {
    return (
      <div className="card not-prose mt-6 p-8" role="status" aria-live="polite" lang={lang}>
        <h3 className="tt-h2">{t.doneTitle}</h3>
        {result.reference && (
          <p className="mt-3">
            {t.reference}: <strong>{result.reference}</strong>
          </p>
        )}
        {result.clock && <p className="mt-2 text-muted">{t.doneClock(result.clock)}</p>}
        <p className="mt-2 text-sm text-muted">
          {t.doneEmail} <a href={`mailto:${GRIEVANCE_EMAIL}`} className="underline">{GRIEVANCE_EMAIL}</a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} lang={lang} className="card not-prose relative mt-6 grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
      <p className="text-sm text-muted sm:col-span-2">{t.intro}</p>
      <div>
        <label htmlFor="g-name" className="text-sm font-semibold">{t.name}</label>
        <input id="g-name" name="name" required maxLength={100} autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor="g-email" className="text-sm font-semibold">{t.email}</label>
        <input id="g-email" name="email" type="email" required maxLength={200} autoComplete="email" className={field} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="g-category" className="text-sm font-semibold">{t.category}</label>
        <select id="g-category" name="category" required defaultValue="" className={field}>
          <option value="" disabled>…</option>
          {GRIEVANCE_CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>{c.label[lang]}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="g-url" className="text-sm font-semibold">
          {t.contentUrl} <span className="font-normal text-muted">({t.optional})</span>
        </label>
        <input id="g-url" name="contentUrl" type="url" maxLength={500} placeholder="https://" className={field} />
        <p className="mt-2 text-sm text-muted">{t.contentUrlHint}</p>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="g-message" className="text-sm font-semibold">{t.message}</label>
        <textarea id="g-message" name="message" required maxLength={5000} rows={5} className={field} />
      </div>
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="sm:col-span-2">
        <button type="submit" disabled={status === 'sending'} className="btn btn-primary disabled:opacity-60">
          {status === 'sending' ? t.sending : t.submit}
        </button>
      </div>
      {status === 'error' && (
        <p role="alert" className="text-sm font-semibold text-primary sm:col-span-2">
          {error || t.error} {!error && <a href={`mailto:${GRIEVANCE_EMAIL}`} className="underline">{GRIEVANCE_EMAIL}</a>}
        </p>
      )}
    </form>
  );
}

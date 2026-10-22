'use client';

import { useEffect, useRef, useState } from 'react';
import { reduced } from '@/components/motion/reduced';

/**
 * Signature 2 — the consent stream (DESIGN-SPEC §8.2).
 *
 * A deterministic, illustrative event stream. Rows whose consent is not
 * granted (GPC, denied, unknown) visibly lose their visitor id — the id is
 * struck through and replaced by `cookieless` — while conversions are still
 * counted. Mirrors YOM's documented behaviour: without consent the visitor
 * id is forced empty server-side and nothing is stored; only the path is
 * sent; PII-looking params are scrubbed from client events.
 *
 * The SSR frame shows both states, so no-JS / reduced-motion visitors get
 * the whole story. The loop pauses whenever the panel is off-screen.
 */

type Consent = 'granted' | 'GPC' | 'denied' | 'unknown';
interface Ev {
  key: number;
  t: string;
  event: string;
  path: string;
  consent: Consent;
  vid: string;
  note?: string;
}

const SEQ: Omit<Ev, 'key' | 't'>[] = [
  { event: 'page_view', path: '/collections/linen', consent: 'granted', vid: 'v_8f2c41' },
  { event: 'add_to_cart', path: '/products/throw', consent: 'GPC', vid: 'v_31d9a0' },
  { event: 'purchase', path: '/checkout/thanks', consent: 'GPC', vid: 'v_31d9a0', note: 'counted · no id' },
  { event: 'page_view', path: '/search', consent: 'denied', vid: 'v_c07e5b', note: '?q= stripped' },
  { event: 'form_submit', path: '/contact', consent: 'granted', vid: 'v_8f2c41', note: 'email scrubbed' },
  { event: 'purchase', path: '/checkout/thanks', consent: 'granted', vid: 'v_8f2c41' },
  { event: 'sign_up', path: '/start', consent: 'unknown', vid: 'v_5ab112', note: 'counted · no id' },
  { event: 'generate_lead', path: '/demo', consent: 'GPC', vid: 'v_e44f02', note: 'not forwarded' },
];

const VISIBLE = 6;

function stamp(i: number) {
  const s = 12 + i * 3;
  return `14:02:${String(s % 60).padStart(2, '0')}`;
}

function initial(): Ev[] {
  return SEQ.slice(0, VISIBLE)
    .map((e, i) => ({ ...e, key: i, t: stamp(i) }))
    .reverse();
}

export function ConsentStream() {
  const [rows, setRows] = useState<Ev[]>(initial);
  const [animate, setAnimate] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const nextRef = useRef(VISIBLE);

  useEffect(() => {
    if (reduced() || !ref.current) return;
    let timer = 0;
    const tick = () => {
      const i = nextRef.current++;
      const base = SEQ[i % SEQ.length];
      setAnimate(true);
      setRows((prev) => [{ ...base, key: i, t: stamp(i) }, ...prev].slice(0, VISIBLE));
    };
    const io = new IntersectionObserver(([entry]) => {
      window.clearInterval(timer);
      if (entry.isIntersecting && document.visibilityState === 'visible') timer = window.setInterval(tick, 1900);
    });
    io.observe(ref.current);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  const conversions = rows.filter((r) => ['purchase', 'sign_up', 'generate_lead', 'form_submit'].includes(r.event)).length;

  return (
    <div ref={ref} className="ink-panel on-ink overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--on-ink-border)] px-5 py-3.5">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-on-ink-muted">Ingest · live view</p>
        <p className="font-mono text-[0.7rem] text-on-ink-muted">
          conversions in view <span className="tt-num ml-1 text-on-ink">{conversions}</span>
        </p>
      </div>
      <p className="sr-only">
        Illustration of an event stream. Events from visitors who granted consent keep a visitor id. Events
        carrying a Global Privacy Control signal, a denied consent, or no consent decision are collected
        cookieless: the visitor id is removed, but conversions are still counted. Query strings are stripped and
        email-like fields are scrubbed.
      </p>
      <ol role="list" aria-hidden="true" className="divide-y divide-[color:var(--on-ink-border)] font-mono text-[0.74rem] sm:text-[0.78rem]">
        {rows.map((r, idx) => {
          const cookieless = r.consent !== 'granted';
          return (
            <li
              key={r.key}
              className={`stream-row grid grid-cols-[4.2rem_1fr_auto] items-center gap-x-3 gap-y-1 px-5 py-2.5 sm:grid-cols-[4.6rem_8.5rem_1fr_auto] ${
                animate && idx === 0 ? 'is-new' : ''
              }`}
            >
              <span className="text-on-ink-muted">{r.t}</span>
              <span className={r.event === 'purchase' || r.event === 'sign_up' ? 'text-on-ink-signal' : 'text-on-ink'}>
                {r.event}
              </span>
              <span className="col-span-1 hidden truncate text-on-ink-muted sm:block">{r.path}</span>
              <span className="flex items-center justify-end gap-2">
                <span
                  className={`rounded-full border px-1.5 py-px text-[0.62rem] uppercase tracking-wider ${
                    cookieless ? 'border-[color:var(--on-ink-signal)] text-on-ink-signal' : 'border-[color:var(--on-ink-match)] text-on-ink-match'
                  }`}
                >
                  {r.consent}
                </span>
                {cookieless ? (
                  <span className="flex items-center gap-1.5">
                    <span className={`text-on-ink-muted ${animate && idx === 0 ? 'vid-strike' : 'line-through decoration-[color:var(--on-ink-signal)]'}`}>
                      {r.vid}
                    </span>
                    <span className="text-on-ink">cookieless</span>
                  </span>
                ) : (
                  <span className="text-on-ink-match">{r.vid}</span>
                )}
              </span>
              {r.note ? (
                <span className="col-span-3 -mt-0.5 text-[0.66rem] text-on-ink-brass sm:col-span-4 sm:pl-[4.6rem] sm:ml-3">
                  {r.note}
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
      <p className="border-t border-[color:var(--on-ink-border)] px-5 py-2.5 font-mono text-[0.66rem] text-on-ink-muted">
        Illustration · simulated events, not customer data
      </p>
    </div>
  );
}

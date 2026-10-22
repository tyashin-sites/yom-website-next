'use client';

import { useEffect, useRef, useState } from 'react';
import { reduced } from '@/components/motion/reduced';

/**
 * Signature 1 — the reconciliation ledger (DESIGN-SPEC §8.1).
 *
 * LCP LAW: the server renders the FINAL, reconciled state (every row matched,
 * Δ 0.00). After hydration a cobalt scan line sweeps the rows (transform-only)
 * and each row's check pings as the line passes; the needle settles. Nothing
 * is ever hidden, so no-JS / reduced-motion visitors see the same proof.
 * All figures are illustrative and labelled as such.
 */

const ROWS = [
  { id: '#1041', order: '128.00', yom: '128.00', note: '' },
  { id: '#1042', order: '64.50', yom: '64.50', note: '' },
  { id: '#1043', order: '212.00', yom: '212.00', note: 'sent twice · counted once' },
  { id: '#1044', order: '89.99', yom: '89.99', note: '' },
  { id: '#1045', order: '45.00', yom: '45.00', note: 'server event · HMAC' },
  { id: '#1046', order: '310.40', yom: '310.40', note: '' },
];
const TOTAL = '849.89';

export function HeroLedger() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(false);
  const [settle, setSettle] = useState(false);

  useEffect(() => {
    if (reduced()) return;
    const tbody = bodyRef.current;
    if (!tbody) return;
    tbody.style.setProperty('--scan-distance', `${tbody.offsetHeight + 8}px`);
    const start = window.setTimeout(() => setRunning(true), 50);
    const rows = Array.from(tbody.querySelectorAll<HTMLElement>('.ledger-row'));
    const timers = rows.map((row, i) =>
      window.setTimeout(() => {
        row.classList.add('is-pinged');
      }, 650 + (i + 0.6) * (2100 / rows.length)),
    );
    const s = window.setTimeout(() => setSettle(true), 2900);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(s);
      timers.forEach(window.clearTimeout);
    };
  }, []);

  return (
    <figure className="ink-panel on-ink overflow-hidden" aria-labelledby="ledger-caption">
      <div className="flex items-center justify-between gap-4 border-b border-[color:var(--on-ink-border)] px-5 py-3.5">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-on-ink-muted">
          Reconciliation · purchase
        </p>
        <span className="chip chip-live">
          <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
          Exact
        </span>
      </div>

      <div ref={bodyRef} className="relative px-2 sm:px-3">
        <div aria-hidden="true" className={`ledger-scan ${running ? 'is-running' : ''}`} />
        <table className="w-full text-[0.82rem] sm:text-[0.86rem]">
          <caption className="sr-only">
            Illustration: six orders from an order system compared with YOM&rsquo;s exact purchase counts. Every row
            matches; a duplicate send of order 1043 is counted once. Difference: 0.00.
          </caption>
          <thead>
            <tr className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-on-ink-muted">
              <th scope="col" className="px-3 py-3 text-left font-medium">Order</th>
              <th scope="col" className="px-3 py-3 text-right font-medium">Order system</th>
              <th scope="col" className="px-3 py-3 text-right font-medium">YOM</th>
              <th scope="col" className="w-10 px-3 py-3 text-right font-medium">
                <span className="sr-only">Status</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.id} className="ledger-row border-t border-[color:var(--on-ink-border)]">
                <th scope="row" className="px-3 py-2.5 text-left font-mono font-normal">
                  {r.id}
                  {r.note ? (
                    <span className="mt-0.5 block font-mono text-[0.64rem] text-on-ink-brass">{r.note}</span>
                  ) : null}
                </th>
                <td className="tt-num px-3 py-2.5 text-right text-on-ink-muted">{r.order}</td>
                <td className="tt-num px-3 py-2.5 text-right">{r.yom}</td>
                <td className="px-3 py-2.5 text-right">
                  <span className="ledger-check inline-flex text-on-ink-match" role="img" aria-label="matched">
                    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none">
                      <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-2 grid grid-cols-[1fr_auto] items-end gap-4 border-t border-[color:var(--on-ink-border)] px-5 py-4">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-1 font-mono text-[0.78rem]">
          <dt className="text-on-ink-muted">Order system</dt>
          <dd className="tt-num text-right">{TOTAL}</dd>
          <dt className="text-on-ink-muted">YOM, exact</dt>
          <dd className="tt-num text-right">{TOTAL}</dd>
        </dl>
        <div className="flex items-center gap-3">
          <svg width="58" height="34" viewBox="0 0 58 34" aria-hidden="true" fill="none">
            <path d="M5 31a24 24 0 0 1 48 0" stroke="var(--on-ink-border)" strokeWidth="1.5" />
            <path d="M29 4v4M9 17l3 2M49 17l-3 2" stroke="var(--on-ink-brass)" strokeWidth="1.3" strokeLinecap="round" />
            <g className={`needle ${settle ? 'is-settled' : ''} ${running ? 'is-swinging' : ''}`} style={{ transformBox: 'view-box', transformOrigin: '29px 31px' }}>
              <path d="M29 31V9" stroke="var(--on-ink-signal)" strokeWidth="2" strokeLinecap="round" />
            </g>
            <circle cx="29" cy="31" r="2.6" fill="var(--on-ink-signal)" />
          </svg>
          <p className="text-right">
            <span className="block font-mono text-[0.62rem] uppercase tracking-[0.14em] text-on-ink-muted">Δ</span>
            <span className="tt-num text-2xl leading-none text-on-ink">0.00</span>
          </p>
        </div>
      </div>
      <figcaption id="ledger-caption" className="border-t border-[color:var(--on-ink-border)] px-5 py-2.5 font-mono text-[0.66rem] text-on-ink-muted">
        Illustration · sample orders, not customer data
      </figcaption>
    </figure>
  );
}

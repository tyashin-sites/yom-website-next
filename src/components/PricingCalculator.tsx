'use client';

import { useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  EVENT_TIERS,
  eventsToSlider,
  formatEvents,
  formatMoney,
  formatRate,
  quote,
  readoutSize,
  scaleWords,
  sliderToEvents,
  type Currency,
} from '@/lib/pricing';

const PRESETS = [100_000, 1_000_000, 10_000_000, 50_000_000, 250_000_000, 1_000_000_000];

/**
 * Fit the readout to its field: start from the design size and step down until the whole
 * number is visible, re-checking when the value or the field width changes. `readoutSize`
 * stays as the SSR/first-paint class; this only ever shrinks.
 */
function useFitText(value: string) {
  const ref = useRef<HTMLInputElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      el.style.fontSize = '';
      let size = parseFloat(getComputedStyle(el).fontSize);
      while (el.scrollWidth > el.clientWidth && size > 14) {
        size -= 1;
        el.style.fontSize = `${size}px`;
      }
    };
    fit();
    // Web fonts can land after first paint and widen the digits: fit again once they have.
    document.fonts?.ready.then(fit).catch(() => {});
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [value]);
  return ref;
}

export function PricingCalculator() {
  const [events, setEvents] = useState(2_000_000);
  const [currency, setCurrency] = useState<Currency>('USD');
  const [draft, setDraft] = useState<string | null>(null);
  const id = useId();
  const q = useMemo(() => quote(events, currency), [events, currency]);
  const fmtInt = (n: number) => new Intl.NumberFormat('en-US').format(n);
  const readout = draft ?? fmtInt(events);
  const readoutRef = useFitText(readout);

  return (
    <div className="ink-panel on-ink p-5 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="eyebrow">Monthly estimate</p>
        <div role="radiogroup" aria-label="Currency" className="inline-flex rounded-md border border-[color:var(--on-ink-border)] p-0.5 font-mono text-xs">
          {(['USD', 'CAD'] as const).map((c) => (
            <button
              key={c}
              type="button"
              role="radio"
              aria-checked={currency === c}
              onClick={() => setCurrency(c)}
              className={`rounded-[4px] px-3 py-1.5 transition-colors ${
                currency === c ? 'bg-[color:var(--on-ink)] text-[#14171C]' : 'text-on-ink-muted hover:text-on-ink'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-8">
        <div>
          <label htmlFor={`${id}-events`} className="block text-sm text-on-ink-muted">
            Events per month
          </label>
          <div className="mt-2">
            <input
              id={`${id}-events`}
              inputMode="numeric"
              autoComplete="off"
              aria-describedby={`${id}-scale`}
              ref={readoutRef}
              value={readout}
              onChange={(e) => {
                setDraft(e.target.value);
                const n = Number(e.target.value.replace(/[^0-9]/g, ''));
                if (Number.isFinite(n)) setEvents(Math.min(n, 5_000_000_000));
              }}
              onBlur={() => setDraft(null)}
              className={`tt-num w-full min-w-0 border-b border-[color:var(--on-ink-border)] bg-transparent pb-1 text-on-ink outline-none transition-[font-size] duration-150 focus:border-[color:var(--on-ink-signal)] ${readoutSize(readout.length)}`}
            />
            <p id={`${id}-scale`} className="mt-2 font-mono text-xs text-on-ink-muted">
              {scaleWords(events)} events / month
            </p>
          </div>
          <label htmlFor={`${id}-range`} className="sr-only">
            Events per month (logarithmic slider)
          </label>
          <input
            id={`${id}-range`}
            type="range"
            min={0}
            max={1000}
            step={1}
            value={eventsToSlider(events)}
            onChange={(e) => {
              setDraft(null);
              setEvents(sliderToEvents(Number(e.target.value)));
            }}
            aria-valuetext={`${fmtInt(events)} events`}
            className="mt-6 w-full accent-[#FF6B3D]"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  setDraft(null);
                  setEvents(p);
                }}
                className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
                  events === p
                    ? 'border-[color:var(--on-ink-signal)] text-on-ink'
                    : 'border-[color:var(--on-ink-border)] text-on-ink-muted hover:text-on-ink'
                }`}
              >
                {formatEvents(p)}
              </button>
            ))}
          </div>
        </div>

        <div aria-live="polite">
          <p className="text-sm text-on-ink-muted">Estimated monthly cost</p>
          <p className="tt-num mt-1 text-5xl leading-none text-on-ink sm:text-6xl">{formatMoney(q.total, currency)}</p>
          <p className="mt-3 text-sm text-on-ink-muted">
            {q.total === 0 ? 'Inside the free 100,000 events.' : `Pay-as-you-go estimate in ${currency}, before tax.`}
          </p>
        </div>
      </div>

      <table className="mt-10 w-full text-left text-[0.82rem]">
        <caption className="sr-only">Cost by pricing band for {fmtInt(events)} events</caption>
        <thead>
          <tr className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-on-ink-muted">
            <th scope="col" className="py-2 pr-3 font-medium">Band</th>
            <th scope="col" className="py-2 pr-3 text-right font-medium">Rate / 1K</th>
            <th scope="col" className="py-2 pr-3 text-right font-medium">Events in band</th>
            <th scope="col" className="py-2 text-right font-medium">Cost</th>
          </tr>
        </thead>
        <tbody className="font-mono">
          {EVENT_TIERS.map((tier, i) => {
            const line = q.lines[i];
            const active = Boolean(line && line.events > 0);
            return (
              <tr key={tier.label} className={`border-t border-[color:var(--on-ink-border)] ${active ? 'text-on-ink' : 'text-on-ink-muted'}`}>
                <th scope="row" className="py-2.5 pr-3 font-normal">
                  {tier.label}
                </th>
                <td className="tt-num py-2.5 pr-3 text-right">{tier.perK[currency] === 0 ? 'Free' : formatRate(tier.perK[currency], currency)}</td>
                <td className="tt-num py-2.5 pr-3 text-right">{active ? fmtInt(line.events) : '—'}</td>
                <td className="tt-num py-2.5 text-right">{active ? formatMoney(Math.round(line.cost), currency) : '—'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="mt-4 font-mono text-[0.68rem] text-on-ink-muted">
        Graduated like tax brackets: each rate applies only to the events inside its band. Totals round to the cent.
        Taxes not included.
      </p>
    </div>
  );
}

/**
 * YOM event pricing — a faithful copy of the graduated tiers in the YOM repo
 * (`packages/shared/src/constants/index.ts` → EVENT_TIERS + calculateEventCost).
 *
 * Amounts are MINOR UNITS (cents) per 1,000 events. Tiers are graduated like
 * tax brackets: each tier's rate applies only to the events inside its band.
 * The first 100,000 events each month are free.
 *
 * If the YOM constants change, change this file and the unit tests together
 * (docs/ASSET-DEBT.md #18).
 */

export type Currency = 'USD' | 'CAD';

export interface EventTier {
  /** Upper bound of the band (events). Infinity for the last band. */
  upTo: number;
  /** Price per 1,000 events in minor units (cents). */
  perK: Record<Currency, number>;
  label: string;
}

export const FREE_EVENTS = 100_000;

export const EVENT_TIERS: readonly EventTier[] = [
  { upTo: 100_000, perK: { USD: 0, CAD: 0 }, label: 'First 100K' },
  { upTo: 1_000_000, perK: { USD: 10, CAD: 14 }, label: '100K – 1M' },
  { upTo: 10_000_000, perK: { USD: 6, CAD: 8 }, label: '1M – 10M' },
  { upTo: 100_000_000, perK: { USD: 3, CAD: 4 }, label: '10M – 100M' },
  { upTo: Infinity, perK: { USD: 1.5, CAD: 2 }, label: '100M +' },
];

export interface TierLine {
  label: string;
  from: number;
  to: number;
  events: number;
  perK: number; // minor units per 1K
  cost: number; // minor units, unrounded
}

export interface Quote {
  events: number;
  currency: Currency;
  lines: TierLine[];
  /** Total in minor units, rounded to the nearest cent (matches calculateEventCost). */
  total: number;
}

/** Graduated monthly cost in minor units (cents), rounded like calculateEventCost. */
export function calculateEventCost(events: number, currency: Currency): number {
  return quote(events, currency).total;
}

export function quote(rawEvents: number, currency: Currency): Quote {
  const events = Number.isFinite(rawEvents) && rawEvents > 0 ? Math.floor(rawEvents) : 0;
  let remaining = events;
  let prevUpTo = 0;
  let cost = 0;
  const lines: TierLine[] = [];
  for (const tier of EVENT_TIERS) {
    if (remaining <= 0) break;
    const capacity = tier.upTo - prevUpTo;
    const inTier = Math.min(remaining, capacity);
    const perK = tier.perK[currency];
    const lineCost = (inTier / 1000) * perK;
    lines.push({ label: tier.label, from: prevUpTo, to: prevUpTo + inTier, events: inTier, perK, cost: lineCost });
    cost += lineCost;
    remaining -= inTier;
    prevUpTo = tier.upTo;
  }
  return { events, currency, lines, total: Math.round(cost) };
}

/** Format minor units as a currency string. USD → "$90.00", CAD → "CA$126.00". */
export function formatMoney(minor: number, currency: Currency): string {
  const major = minor / 100;
  const n = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(major);
  return currency === 'CAD' ? `CA$${n}` : `$${n}`;
}

/** Per-1K rate as a display string, e.g. 10 → "$0.10", 1.5 → "$0.015". */
export function formatRate(perKMinor: number, currency: Currency): string {
  const major = perKMinor / 100;
  const digits = major !== 0 && major < 0.1 && Math.round(major * 1000) % 10 !== 0 ? 3 : 2;
  const n = major.toFixed(digits);
  return currency === 'CAD' ? `CA$${n}` : `$${n}`;
}

export function formatEvents(n: number): string {
  if (n >= 1_000_000_000) return `${+(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `${+(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${+(n / 1_000).toFixed(1)}K`;
  return String(n);
}

/** Slider position (0..1000) ↔ events on a log scale from 10K to 1B. */
const LOG_MIN = Math.log10(10_000);
const LOG_MAX = Math.log10(1_000_000_000);
export function sliderToEvents(pos: number): number {
  const v = 10 ** (LOG_MIN + (Math.min(Math.max(pos, 0), 1000) / 1000) * (LOG_MAX - LOG_MIN));
  // Snap to 2 significant figures so the readout stays legible.
  const mag = 10 ** Math.floor(Math.log10(v) - 1);
  return Math.round(v / mag) * mag;
}
export function eventsToSlider(events: number): number {
  const e = Math.min(Math.max(events, 10_000), 1_000_000_000);
  return Math.round(((Math.log10(e) - LOG_MIN) / (LOG_MAX - LOG_MIN)) * 1000);
}

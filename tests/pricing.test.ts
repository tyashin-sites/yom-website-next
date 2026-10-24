import { describe, expect, it } from 'vitest';
import {
  EVENT_TIERS,
  FREE_EVENTS,
  calculateEventCost,
  eventsToSlider,
  formatMoney,
  formatRate,
  quote,
  sliderToEvents, readoutSize, scaleWords } from '@/lib/pricing';

/**
 * Reference implementation, copied VERBATIM (modulo types) from the YOM repo:
 * packages/shared/src/constants/index.ts → calculateEventCost + EVENT_TIERS.
 * The site's calculator must agree with it for every input.
 */
const REF_TIERS = [
  { upTo: 100_000, USD: 0, CAD: 0 },
  { upTo: 1_000_000, USD: 10, CAD: 14 },
  { upTo: 10_000_000, USD: 6, CAD: 8 },
  { upTo: 100_000_000, USD: 3, CAD: 4 },
  { upTo: Infinity, USD: 1.5, CAD: 2 },
];
function refCalculateEventCost(events: number, currency: 'USD' | 'CAD'): number {
  let remaining = events;
  let cost = 0;
  let prevUpTo = 0;
  for (const tier of REF_TIERS) {
    if (remaining <= 0) break;
    const tierCapacity = tier.upTo - prevUpTo;
    const eventsInTier = Math.min(remaining, tierCapacity);
    cost += (eventsInTier / 1000) * tier[currency];
    remaining -= eventsInTier;
    prevUpTo = tier.upTo;
  }
  return Math.round(cost);
}

describe('tier table mirrors the YOM constants', () => {
  it('has the five published bands with the published rates (cents per 1K)', () => {
    expect(EVENT_TIERS.map((t) => t.upTo)).toEqual([100_000, 1_000_000, 10_000_000, 100_000_000, Infinity]);
    expect(EVENT_TIERS.map((t) => t.perK.USD)).toEqual([0, 10, 6, 3, 1.5]);
    expect(EVENT_TIERS.map((t) => t.perK.CAD)).toEqual([0, 14, 8, 4, 2]);
    expect(FREE_EVENTS).toBe(100_000);
  });
});

describe('graduated math (USD)', () => {
  it.each([
    [0, 0],
    [50_000, 0],
    [100_000, 0], // first 100K free
    [100_001, 0], // 1 event × $0.0001 → rounds to 0 cents
    [110_000, 100], // 10K × $0.10/1K = $1.00
    [1_000_000, 9_000], // 900K × $0.10/1K = $90
    [2_000_000, 9_000 + 6_000], // + 1M × $0.06/1K = $60
    [10_000_000, 63_000], // $90 + $540
    [20_000_000, 93_000], // $630 + 10M × $0.03/1K = $300
    [100_000_000, 333_000], // $630 + 90M × $0.03 = $2,700
    [250_000_000, 333_000 + 225_000], // + 150M × $0.015/1K = $2,250
  ])('%i events → %i cents', (events, cents) => {
    expect(calculateEventCost(events, 'USD')).toBe(cents);
  });
});

describe('graduated math (CAD)', () => {
  it.each([
    [100_000, 0],
    [1_000_000, 12_600], // 900K × CA$0.14
    [10_000_000, 12_600 + 72_000], // + 9M × CA$0.08
    [100_000_000, 84_600 + 360_000], // + 90M × CA$0.04
    [200_000_000, 444_600 + 200_000], // + 100M × CA$0.02
  ])('%i events → %i cents', (events, cents) => {
    expect(calculateEventCost(events, 'CAD')).toBe(cents);
  });
});

describe('agrees with the YOM reference implementation', () => {
  const samples = [
    0, 1, 999, 1_000, 99_999, 100_000, 100_500, 123_456, 999_999, 1_000_000, 1_000_001, 3_333_333, 9_999_999,
    10_000_000, 47_250_000, 99_999_999, 100_000_000, 100_000_001, 512_345_678, 1_000_000_000,
  ];
  for (const currency of ['USD', 'CAD'] as const) {
    it(`matches for ${samples.length} samples in ${currency}`, () => {
      for (const n of samples) expect(calculateEventCost(n, currency)).toBe(refCalculateEventCost(n, currency));
    });
  }
  it('matches across a dense sweep', () => {
    for (let n = 0; n <= 120_000_000; n += 777_777) {
      expect(calculateEventCost(n, 'USD')).toBe(refCalculateEventCost(n, 'USD'));
      expect(calculateEventCost(n, 'CAD')).toBe(refCalculateEventCost(n, 'CAD'));
    }
  });
});

describe('quote breakdown', () => {
  it('only charges each band for the events inside it', () => {
    const q = quote(12_000_000, 'USD');
    expect(q.lines.map((l) => l.events)).toEqual([100_000, 900_000, 9_000_000, 2_000_000]);
    expect(q.lines.map((l) => l.cost)).toEqual([0, 9_000, 54_000, 6_000]);
    expect(q.total).toBe(69_000);
  });
  it('treats negative, NaN and fractional input safely', () => {
    expect(quote(-5, 'USD').total).toBe(0);
    expect(quote(Number.NaN, 'USD').total).toBe(0);
    expect(quote(1_000_000.9, 'USD').events).toBe(1_000_000);
  });
});

describe('formatting', () => {
  it('formats money from cents', () => {
    expect(formatMoney(9_000, 'USD')).toBe('$90.00');
    expect(formatMoney(333_000, 'USD')).toBe('$3,330.00');
    expect(formatMoney(12_600, 'CAD')).toBe('CA$126.00');
  });
  it('formats per-1K rates', () => {
    expect(formatRate(10, 'USD')).toBe('$0.10');
    expect(formatRate(6, 'USD')).toBe('$0.06');
    expect(formatRate(1.5, 'USD')).toBe('$0.015');
    expect(formatRate(14, 'CAD')).toBe('CA$0.14');
    expect(formatRate(2, 'CAD')).toBe('CA$0.02');
  });
  it('slider maps the log scale round-trip at the ends', () => {
    expect(sliderToEvents(0)).toBe(10_000);
    expect(sliderToEvents(1000)).toBe(1_000_000_000);
    expect(eventsToSlider(10_000)).toBe(0);
    expect(eventsToSlider(1_000_000_000)).toBe(1000);
  });
});

describe('readout legibility (calculator)', () => {
  const fmt = (n: number) => new Intl.NumberFormat('en-US').format(n);

  it('names the scale in words so 1,000,000,000 can never read as 1,000,000', () => {
    expect(scaleWords(1_000_000_000)).toBe('1 billion');
    expect(scaleWords(250_000_000)).toBe('250 million');
    expect(scaleWords(2_500_000)).toBe('2.5 million');
    expect(scaleWords(100_000)).toBe('100 thousand');
  });

  it('shrinks the readout as digits grow', () => {
    expect(readoutSize(fmt(999_999).length)).toBe('text-3xl sm:text-4xl');
    expect(readoutSize(fmt(10_000_000).length)).toBe('text-2xl sm:text-3xl');
    expect(readoutSize(fmt(1_000_000_000).length)).toBe('text-xl sm:text-2xl');
    expect(readoutSize(fmt(5_000_000_000).length)).toBe('text-xl sm:text-2xl');
  });

  it('the slider maximum is exactly the 1B preset', () => {
    expect(sliderToEvents(1000)).toBe(1_000_000_000);
  });
});

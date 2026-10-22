import localFont from 'next/font/local';

// Type stack (DESIGN-SPEC §3), self-hosted via next/font/local — no build-time
// network dependency on fonts.googleapis.com. All three faces are OFL
// (fontsource builds, latin subset).
//   Display — Instrument Serif 400 (+ italic for the one emphasised word)
//   Body/UI — Schibsted Grotesk variable 400–700
//   Data    — Geist Mono variable 400–600 (preloaded: the hero eyebrow and the
//             ledger are mono, and a late swap there measured CLS 0.023)

export const displayFont = localFont({
  src: [
    { path: '../fonts/instrument-serif-latin-400.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/instrument-serif-latin-400-italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-display',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
});

export const bodyFont = localFont({
  src: [{ path: '../fonts/schibsted-grotesk-latin.woff2', weight: '400 700', style: 'normal' }],
  variable: '--font-body',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

export const monoFont = localFont({
  src: [{ path: '../fonts/geist-mono-latin.woff2', weight: '400 600', style: 'normal' }],
  variable: '--font-mono',
  display: 'swap',
  fallback: ['ui-monospace', 'monospace'],
});

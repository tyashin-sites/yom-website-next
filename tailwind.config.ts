import type { Config } from 'tailwindcss';

// Tailwind v3 tokens → brand CSS variables (addendum §13). Vars hold plain hex,
// so no <alpha-value> wrapping is needed (and the oklch/HSL footer bug can't
// occur). For translucent tints use the `color-mix()` component classes in
// globals.css instead of `/NN` modifiers on these colours.
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--brand-primary)',
        'primary-deep': 'var(--brand-primary-deep)',
        'primary-contrast': 'var(--brand-primary-contrast)',
        accent: 'var(--brand-match)',
        match: 'var(--brand-match)',
        brass: 'var(--brand-brass)',
        ink: 'var(--brand-ink)',
        paper: 'var(--brand-paper)',
        background: 'var(--brand-bg)',
        surface: 'var(--brand-surface)',
        foreground: 'var(--brand-text)',
        muted: 'var(--brand-text-muted)',
        border: 'var(--brand-border)',
        'on-ink': 'var(--on-ink)',
        'on-ink-muted': 'var(--on-ink-muted)',
        'on-ink-signal': 'var(--on-ink-signal)',
        'on-ink-match': 'var(--on-ink-match)',
        'on-ink-brass': 'var(--on-ink-brass)',
      },
      borderRadius: {
        sm: 'var(--brand-radius-sm)',
        md: 'var(--brand-radius-md)',
        lg: 'var(--brand-radius-lg)',
        full: 'var(--brand-radius-full)',
      },
      fontFamily: {
        heading: ['var(--brand-heading-font)'],
        body: ['var(--brand-body-font)'],
        mono: ['var(--brand-mono-font)'],
      },
      maxWidth: { container: '76rem' },
    },
  },
  plugins: [],
} satisfies Config;

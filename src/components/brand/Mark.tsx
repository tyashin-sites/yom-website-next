/**
 * The "null point" mark (docs/BRAND.md): a gauge resting at zero. Ring and
 * ticks take currentColor; the zero line is brass; the dot is always signal.
 */
export function Mark({ size = 28, className, dotClassName }: { size?: number; className?: string; dotClassName?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.75" />
      <path d="M5 12h14" stroke="var(--brand-brass)" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M12 2.9v2.5M12 18.6v2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2.4" fill="var(--brand-primary)" className={dotClassName} />
    </svg>
  );
}

export function Wordmark({ className = '', size = 26 }: { className?: string; size?: number }) {
  return (
    <span className={`brand-lockup inline-flex items-center gap-[0.55rem] ${className}`}>
      <Mark size={size} />
      <span
        className="font-body font-semibold leading-none"
        style={{ letterSpacing: '0.06em', fontSize: size * 0.72 }}
      >
        YOM
      </span>
    </span>
  );
}

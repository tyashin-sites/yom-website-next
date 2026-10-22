import { siteConfig } from '@/config/site';

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" fill="none">
      <path d="M3 8h9M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** The one primary CTA (DESIGN-SPEC §10): always "Start free — no credit card". */
export function PrimaryCta({ className = '', id }: { className?: string; id?: string }) {
  return (
    <a href={siteConfig.app.signUp} className={`btn btn-primary ${className}`} data-cta={id ?? 'start-free'}>
      {siteConfig.cta.primary}
      <Arrow />
    </a>
  );
}

export function GhostLink({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      className={`btn btn-ghost ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}
    >
      {children}
    </a>
  );
}

export { Arrow };

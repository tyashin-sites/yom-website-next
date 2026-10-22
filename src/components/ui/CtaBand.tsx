import { PrimaryCta, GhostLink } from './Cta';

export function CtaBand({
  title = 'Measure what you can prove.',
  lead = 'The first 100,000 events every month are free. No credit card, no sales call.',
  secondary = { href: '/pricing', label: 'See pricing' },
}: {
  title?: string;
  lead?: string;
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="ink-band on-ink" aria-labelledby="cta-band-title">
      <div className="container-y section-tight flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow">Start measuring</p>
          <h2 id="cta-band-title" className="tt-h2 mt-4 text-balance">
            {title}
          </h2>
          <p className="mt-4 text-on-ink-muted">{lead}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <PrimaryCta id="cta-band" />
          <GhostLink href={secondary.href}>{secondary.label}</GhostLink>
        </div>
      </div>
    </section>
  );
}

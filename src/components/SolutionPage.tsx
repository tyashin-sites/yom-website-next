import { solutions } from '@/config/site';
import type { SourceId } from '@/lib/sources';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { PrimaryCta, GhostLink } from '@/components/ui/Cta';
import { ComingSoon, Live } from '@/components/ui/Section';
import { CtaBand } from '@/components/ui/CtaBand';
import { footnotes } from '@/components/ui/Footnotes';

export interface Pain {
  stat: string;
  text: string;
  source: SourceId;
}

export interface SolutionContent {
  slug: string;
  name: string;
  description: string;
  eyebrow: string;
  title: string;
  lead: string;
  secondary: { href: string; label: string };
  painsTitle: string;
  pains: Pain[];
  today: { title: string; body: string }[];
  soon: string[];
  showcaseTitle: string;
  showcaseLead: string;
  showcase: React.ReactNode;
  note?: React.ReactNode;
}

export function SolutionPage({ c }: { c: SolutionContent }) {
  const path = `/solutions/${c.slug}`;
  const fn = footnotes(c.pains.map((p) => p.source));
  const others = solutions.filter((s) => s.slug !== c.slug);
  return (
    <>
      <JsonLd
        page={{
          path,
          title: c.name,
          description: c.description,
          crumbs: [
            { name: 'Solutions', path: '/solutions' },
            { name: c.name, path },
          ],
        }}
      />
      <PageHero
        eyebrow={c.eyebrow}
        title={c.title}
        lead={c.lead}
        trail={[
          { name: 'Solutions', path: '/solutions' },
          { name: c.name, path },
        ]}
      >
        <PrimaryCta id={`sol-${c.slug}`} />
        <GhostLink href={c.secondary.href}>{c.secondary.label}</GhostLink>
      </PageHero>

      <section aria-labelledby="pains-h" className="rule-top">
        <div className="container-y section-tight">
          <h2 id="pains-h" className="eyebrow">
            {c.painsTitle}
          </h2>
          <dl className="mt-8 grid gap-10 md:grid-cols-3">
            {c.pains.map((p) => (
              <div key={p.stat} className="flex flex-col-reverse gap-3" data-fx="rise">
                <dt className="text-muted">
                  {p.text}
                  <fn.Ref id={p.source} />
                </dt>
                <dd className="tt-num font-heading text-5xl">{p.stat}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="showcase-h" className="bg-surface">
        <div className="container-y section grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">How it works</p>
            <h2 id="showcase-h" className="tt-h2 mt-4 text-balance">
              {c.showcaseTitle}
            </h2>
            <p className="tt-lead mt-5">{c.showcaseLead}</p>
          </div>
          <div data-fx="rise">{c.showcase}</div>
        </div>
      </section>

      <section aria-labelledby="today-h">
        <div className="container-y section">
          <div className="flex flex-wrap items-center gap-4">
            <h2 id="today-h" className="tt-h2">
              What you get today
            </h2>
            <Live label="Shipped" />
          </div>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
            {c.today.map((t) => (
              <li key={t.title} className="bg-background p-7" data-fx="rise">
                <h3 className="tt-h3">{t.title}</h3>
                <p className="mt-2 text-muted">{t.body}</p>
              </li>
            ))}
          </ul>
          {c.soon.length ? (
            <div className="mt-12 grid gap-6 md:grid-cols-[0.6fr_1.4fr]">
              <h3 className="tt-h3">Next on the roadmap</h3>
              <ul className="divide-y divide-border border-y border-border">
                {c.soon.map((s) => (
                  <li key={s} className="flex items-center justify-between gap-4 py-3.5">
                    <span>{s}</span>
                    <ComingSoon />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {c.note ? <div className="mt-12">{c.note}</div> : null}
        </div>
      </section>

      <section aria-labelledby="other-h" className="rule-top">
        <div className="container-y section-tight">
          <h2 id="other-h" className="eyebrow">
            Other solutions
          </h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <a href={o.href} className="card block h-full p-6">
                  <span className="font-semibold">{o.label}</span>
                  <span className="mt-2 block text-sm text-muted">{o.blurb}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-12">
            <fn.List />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

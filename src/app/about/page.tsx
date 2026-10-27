import { pageMetadata } from '@/lib/seo';
import { siteConfig } from '@/config/site';
import { legalEntities } from '@/config/legal';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { GhostLink, PrimaryCta } from '@/components/ui/Cta';
import { Mark } from '@/components/brand/Mark';
import { CtaBand } from '@/components/ui/CtaBand';

const TITLE = 'About';
const DESCRIPTION =
  'YOM (Your Own Metrics) is built by Aapastech: Aapastech Private Limited in India, and 14818032 Canada Inc., headquartered in Burlington, Ontario, everywhere else.';

export const metadata = pageMetadata({ title: 'About YOM', description: DESCRIPTION, path: '/about' });

const PRINCIPLES = [
  { t: 'Exact where it matters', b: 'Money and lead events are counted exactly. Anything estimated is labelled as an estimate.' },
  { t: 'An opt-out is final', b: 'Consent is enforced where the data lands, not only where the banner sits.' },
  { t: 'Your data, portable', b: 'Raw archive, CSV and NDJSON export, and signed webhooks, because leaving should be easy.' },
  { t: 'Say what isn’t shipped', b: 'Roadmap items carry a “Coming soon” label until they are real.' },
];

export default function AboutPage() {
  const { company, contact } = siteConfig;
  return (
    <>
      <JsonLd page={{ path: '/about', title: TITLE, description: DESCRIPTION, type: 'AboutPage' }} />
      <PageHero
        eyebrow="About"
        title="We build the measurement layer we wanted to trust."
        lead={`${siteConfig.longName} is built by ${company.builder}. In India we are ${legalEntities.india.name}; everywhere else, ${company.legalName}, headquartered in ${company.hq.city}, ${company.hq.region}.`}
        trail={[{ name: TITLE, path: '/about' }]}
      >
        <PrimaryCta id="about-hero" />
        <GhostLink href="/contact">Contact us</GhostLink>
      </PageHero>

      <section aria-labelledby="mark-h" className="ink-band on-ink">
        <div className="container-y section grid items-center gap-12 lg:grid-cols-[auto_1fr]">
          <Mark size={180} className="text-on-ink" />
          <div className="max-w-2xl">
            <p className="eyebrow">The mark</p>
            <h2 id="mark-h" className="tt-h2 mt-4">A gauge at its null point.</h2>
            <p className="mt-5 text-on-ink-muted">
              When your analytics and your order system agree, the difference is zero and the needle rests at
              the centre. That&rsquo;s the idea behind YOM, drawn as one glyph.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="principles-h">
        <div className="container-y section">
          <h2 id="principles-h" className="tt-h2">How we work</h2>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <li key={p.t} className="bg-background p-7 sm:p-8">
                <span className="tt-num text-sm text-primary">0{i + 1}</span>
                <h3 className="tt-h3 mt-3">{p.t}</h3>
                <p className="mt-2 text-muted">{p.b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="company-h" className="rule-top">
        <div className="container-y section-tight grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <h2 id="company-h" className="tt-h2">Company details</h2>
          <dl className="divide-y divide-border border-y border-border">
            {[
              ['Product', `${siteConfig.name} (${siteConfig.longName})`],
              ['Built by', company.builder],
              ['Legal entity (India)', `${legalEntities.india.name}, ${legalEntities.india.principalOffice.locality}, ${legalEntities.india.principalOffice.region}`],
              ['Legal entity (outside India)', company.legalName],
              ['Headquarters', `${company.hq.city}, ${company.hq.region}, ${company.hq.countryName}`],
            ].map(([k, v]) => (
              <div key={k} className="grid gap-1 py-3.5 sm:grid-cols-[14rem_1fr]">
                <dt className="text-muted">{k}</dt>
                <dd className="font-semibold">{v}</dd>
              </div>
            ))}
            <div className="grid gap-1 py-3.5 sm:grid-cols-[14rem_1fr]">
              <dt className="text-muted">Email</dt>
              <dd><a className="font-semibold underline" href={`mailto:${contact.email}`}>{contact.email}</a></dd>
            </div>
            <div className="grid gap-1 py-3.5 sm:grid-cols-[14rem_1fr]">
              <dt className="text-muted">Phone</dt>
              <dd><a className="tt-num font-semibold underline" href={contact.phoneHref}>{contact.phone}</a></dd>
            </div>
          </dl>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

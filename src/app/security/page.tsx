import { pageMetadata } from '@/lib/seo';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { GhostLink } from '@/components/ui/Cta';
import { ComingSoon, Live } from '@/components/ui/Section';
import { CtaBand } from '@/components/ui/CtaBand';

const TITLE = 'Security';
const DESCRIPTION =
  "YOM security, stated honestly: what exists today (MFA, scoped and signed keys, encrypted webhook secrets, consent enforcement) and what doesn't yet.";

export const metadata = pageMetadata({ title: 'Security: what exists today, and what doesn’t', description: DESCRIPTION, path: '/security' });

const TODAY: { area: string; items: string[] }[] = [
  {
    area: 'Infrastructure',
    items: [
      'Runs on Cloudflare Workers, with D1, KV, R2 and Queues for storage and processing.',
      'Bot filtering at the edge before events are processed.',
      'Per-principal API rate limits (120 requests/min on Free, 1,200 on pay-as-you-go).',
    ],
  },
  {
    area: 'Accounts',
    items: [
      'Email and password, or Google sign-in.',
      'TOTP multi-factor authentication.',
      'Audit logs on pay-as-you-go.',
    ],
  },
  {
    area: 'Keys & signing',
    items: [
      'Separate publishable (yom_pk_…) and secret (yom_sk_…) keys, with scopes.',
      'Keys and embed tokens can be bound to one sub-tenant; asking for another returns 403.',
      'Server events can be HMAC-signed instead of sending the key.',
      'Webhook secrets are shown once and encrypted at rest; every delivery is HMAC-signed.',
    ],
  },
  {
    area: 'Data handling',
    items: [
      'Cookieless until analytics consent; enforced server-side.',
      'GPC and DNT honoured; PII-like params scrubbed from browser events; path-only URLs.',
      'Retention windows applied to reports, archive and delivery logs by plan.',
      'Export any time as CSV or NDJSON.',
    ],
  },
];

const NOT_YET = [
  'Independent third-party security attestation reports',
  'Business associate agreements',
  'Commitments about the geographic location of stored data',
  'Sign-in through your own identity provider',
  'A published data processing agreement and subprocessor list',
  'A public status page or a contractual availability commitment',
];

export default function SecurityPage() {
  return (
    <>
      <JsonLd page={{ path: '/security', title: TITLE, description: DESCRIPTION }} />
      <PageHero
        eyebrow="Security"
        title="What exists today. What doesn’t. No grey area."
        lead="Security pages tend to blur shipped controls with intentions. This one separates them, so your review can start from facts."
        trail={[{ name: TITLE, path: '/security' }]}
      >
        <GhostLink href="/contact">Ask a security question</GhostLink>
      </PageHero>

      <section aria-labelledby="today-h" className="rule-top">
        <div className="container-y section">
          <div className="flex flex-wrap items-center gap-4">
            <h2 id="today-h" className="tt-h2">In place today</h2>
            <Live label="Shipped" />
          </div>
          <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
            {TODAY.map((g) => (
              <div key={g.area} className="bg-background p-7 sm:p-8">
                <h3 className="tt-h3">{g.area}</h3>
                <ul className="mt-4 space-y-2.5 text-[0.96rem]">
                  {g.items.map((i) => (
                    <li key={i} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-match" />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="notyet-h" className="bg-surface">
        <div className="container-y section grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 id="notyet-h" className="tt-h2 text-balance">Not available today</h2>
            <p className="tt-lead mt-5">
              If your procurement requires any of these, YOM isn&rsquo;t the right fit yet. We&rsquo;d rather tell you
              now than in week six of a review.
            </p>
          </div>
          <ul className="divide-y divide-border border-y border-border">
            {NOT_YET.map((n) => (
              <li key={n} className="flex items-center justify-between gap-4 py-4">
                <span>{n}</span>
                <span className="chip chip-soon">Not yet</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="roadmap-h">
        <div className="container-y section-tight grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 id="roadmap-h" className="tt-h2">On the roadmap</h2>
          <ul className="divide-y divide-border border-y border-border">
            <li className="flex items-center justify-between gap-4 py-4">
              <span>Opt-out evidence report (proof that GPC and consent were honoured)</span>
              <ComingSoon />
            </li>
          </ul>
        </div>
      </section>

      <section aria-labelledby="report-h" className="rule-top">
        <div className="container-y section-tight">
          <h2 id="report-h" className="tt-h3">Report a vulnerability</h2>
          <p className="mt-3 max-w-2xl text-muted">
            Email{' '}
            <a href={`mailto:${siteConfig.contact.email}?subject=Security%20report`} className="underline">
              {siteConfig.contact.email}
            </a>{' '}
            with &ldquo;Security report&rdquo; in the subject. Please don&rsquo;t test against other customers&rsquo;
            data.
          </p>
        </div>
      </section>

      <CtaBand title="Start with the free tier and review it yourself." />
    </>
  );
}

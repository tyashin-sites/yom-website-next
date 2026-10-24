import { pageMetadata } from '@/lib/seo';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/ui/JsonLd';
import { PrimaryCta, GhostLink } from '@/components/ui/Cta';
import { SectionHead, ComingSoon } from '@/components/ui/Section';
import { CtaBand } from '@/components/ui/CtaBand';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { footnotes } from '@/components/ui/Footnotes';
import { HeroLedger } from '@/components/signature/HeroLedger';
import { ConsentStream } from '@/components/signature/ConsentStream';
import { FanOut } from '@/components/signature/FanOut';

const DESCRIPTION =
  'First-party, consent-aware analytics. Exact conversion counts that reconcile with your order system, cookieless collection after an opt-out, and one org for every client.';

export const metadata = pageMetadata({ description: DESCRIPTION, path: '/' });

const PILLARS = [
  {
    n: '01',
    title: 'Conversions that reconcile',
    body: 'purchase, refund, generate_lead, form_submit and sign_up are counted exactly and deduplicated on the event id. A retried send is counted once.',
    href: '/product#conversions',
  },
  {
    n: '02',
    title: 'Opt-outs that can’t leak',
    body: 'Cookieless by default. DNT and Global Privacy Control are honoured at the edge, PII is scrubbed, URLs are path-only, nothing is forwarded without marketing consent.',
    href: '/product#privacy',
  },
  {
    n: '03',
    title: 'One org, every client',
    body: 'Sub-tenants with scoped keys and embed tokens, usage by sub-tenant for re-billing, and white-label webhook headers.',
    href: '/product#multi-tenant',
  },
  {
    n: '04',
    title: 'An API agents can call',
    body: 'An MCP server with read-only report tools, scoped keys, a generic counters query and CSV/NDJSON export. AI-assistant visits get their own channel.',
    href: '/product#ai-ready',
  },
];

const SERVER_SNIPPET = `import { YOMServer } from '@yourownmetric/sdk/node'

const yom = new YOMServer({ secretKey: process.env.YOM_SECRET_KEY })

// The order id is the event id: retries can't double-count.
yom.track({
  event: 'purchase',
  id: 'order-1043',
  params: { transaction_id: '1043', value: 212.0, currency: 'USD' },
})`;

export default function HomePage() {
  const fn = footnotes(['adBlock', 'stateLaws', 'healthline', 'gpcSweep']);
  return (
    <>
      <JsonLd page={{ path: '/', title: `${siteConfig.name}: ${siteConfig.tagline}`, description: DESCRIPTION }} />

      {/* HERO — h1 is the LCP element: server-rendered, never hidden. */}
      <section className="container-y grid items-center gap-12 pt-10 pb-16 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-24">
        <div>
          <p className="eyebrow">Your Own Metrics · first-party analytics</p>
          <h1 className="tt-display mt-6 text-balance">
            The measurement layer you can <em className="italic text-primary">prove</em>.
          </h1>
          <p className="tt-lead mt-7 max-w-xl text-pretty">
            YOM counts purchases, leads and sign-ups exactly, keeps collecting cookieless after an opt-out, and runs
            every client from one org. Check any number against your order system.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <PrimaryCta id="hero" />
            <GhostLink href="/product#conversions">How it reconciles</GhostLink>
          </div>
          <p className="mt-5 font-mono text-[0.74rem] text-muted">100,000 events free every month · no credit card</p>
        </div>
        <HeroLedger />
      </section>

      {/* PILLARS */}
      <section className="rule-top" aria-labelledby="pillars-title">
        <div className="container-y section">
          <SectionHead
            id="pillars-title"
            eyebrow="Four things you can check"
            title="A measurement layer you can audit yourself."
            lead="Each claim below is a behaviour you can test in your own account, on your own data."
          />
          <ol className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
            {PILLARS.map((p) => (
              <li key={p.n} data-fx="rise" className="bg-background">
                <a href={p.href} className="group flex h-full flex-col p-7 transition-colors hover:bg-paper sm:p-9">
                  <span className="tt-num text-sm text-primary">{p.n}</span>
                  <h3 className="tt-h3 mt-4 flex flex-wrap items-center gap-3">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-muted">{p.body}</p>
                  <span className="link-arrow mt-auto pt-6 text-sm">Read how →</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CONSENT STREAM */}
      <section className="bg-surface" aria-labelledby="consent-title">
        <div className="container-y section grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
          <div data-fx="rise">
            <p className="eyebrow">Consent at the edge</p>
            <h2 id="consent-title" className="tt-h2 mt-4 text-balance">
              An opt-out changes what we store. Your counts stay the same.
            </h2>
            <p className="tt-lead mt-5">
              When a visitor sends Global Privacy Control, denies consent or hasn&rsquo;t decided, YOM drops the
              visitor id on the server and keeps the session in memory only. The purchase still counts, and no visitor
              id is ever written.
            </p>
            <ul className="mt-7 space-y-3 text-[0.95rem]">
              {[
                'GPC and DNT default to cookieless; a project can choose to drop instead.',
                'Only the path is sent. Query strings never leave the browser.',
                'Email, phone and card-like params are scrubbed from browser events.',
                'Nothing is forwarded to ad platforms without marketing consent.',
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-match" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <a href="/product#privacy" className="link-arrow mt-8 inline-block text-sm">
              The full privacy model →
            </a>
          </div>
          <div data-fx="rise">
            <ConsentStream />
          </div>
        </div>
      </section>

      {/* WHY NOW — cited */}
      <section aria-labelledby="whynow-title">
        <div className="container-y section">
          <SectionHead
            id="whynow-title"
            eyebrow="Why now"
            title="Regulators are fining the gap between the banner and the data."
            lead="The 2025 enforcement actions went after data that kept flowing after people opted out."
          />
          <dl className="mt-14 grid gap-10 border-t border-border pt-10 md:grid-cols-3">
            <div data-fx="rise" className="flex flex-col-reverse gap-3">
              <dt className="text-muted">US internet users with an ad blocker, Q2 2025<fn.Ref id="adBlock" /></dt>
              <dd className="tt-num font-heading text-6xl">32.5%</dd>
            </div>
            <div data-fx="rise" className="flex flex-col-reverse gap-3">
              <dt className="text-muted">US states with comprehensive privacy laws in effect by 2026<fn.Ref id="stateLaws" /></dt>
              <dd className="tt-num font-heading text-6xl">20</dd>
            </div>
            <div data-fx="rise" className="flex flex-col-reverse gap-3">
              <dt className="text-muted">
                California settlement with Healthline for sending data to ad partners after users opted out
                <fn.Ref id="healthline" />
              </dt>
              <dd className="tt-num font-heading text-6xl">$1.55M</dd>
            </div>
          </dl>
          <p className="mt-10 max-w-2xl text-muted">
            California, Colorado and Connecticut announced a joint sweep focused on Global Privacy Control in
            September 2025.<fn.Ref id="gpcSweep" /> YOM enforces an opt-out on the server, where the data lands.{' '}
            <a href="/why-yom" className="link-arrow text-foreground">
              Read the full case
            </a>
            .
          </p>
        </div>
      </section>

      {/* FAN-OUT */}
      <section className="ink-band on-ink" aria-labelledby="fan-title-h">
        <div className="container-y section grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow">Agencies &amp; platforms</p>
            <h2 id="fan-title-h" className="tt-h2 mt-4 text-balance">
              One org, with each client fenced off.
            </h2>
            <p className="mt-5 text-on-ink-muted">
              Add each client or customer as a sub-tenant. Bind keys and embed tokens to it, and that principal can only
              ever read its own data. Pull usage by sub-tenant to re-bill, and brand the webhook headers as your own.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <GhostLink href="/solutions/agencies">For agencies</GhostLink>
              <GhostLink href="/solutions/platforms">For platforms</GhostLink>
            </div>
          </div>
          <FanOut />
        </div>
      </section>

      {/* DEVELOPERS */}
      <section aria-labelledby="dev-title">
        <div className="container-y section grid items-center gap-12 lg:grid-cols-2">
          <div data-fx="rise">
            <p className="eyebrow">For developers</p>
            <h2 id="dev-title" className="tt-h2 mt-4 text-balance">
              Send the conversion from your backend. Sign it if you like.
            </h2>
            <p className="tt-lead mt-5">
              Browser collection uses <code className="font-mono text-[0.9em]">sendBeacon</code> with no CORS
              preflight. Server events go to <code className="font-mono text-[0.9em]">/v2/events</code> with a secret
              key or an HMAC signature, and a stable id makes retries safe.
            </p>
            <a href="/developers" className="link-arrow mt-8 inline-block text-sm">
              Install guide &amp; API →
            </a>
          </div>
          <div data-fx="rise">
            <CodeBlock code={SERVER_SNIPPET} label="server.ts" lang="Node" />
          </div>
        </div>
      </section>

      {/* HONEST LIMITS */}
      <section className="bg-surface" aria-labelledby="limits-title">
        <div className="container-y section grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">What we won&rsquo;t pretend</p>
            <h2 id="limits-title" className="tt-h2 mt-4 text-balance">
              Exact counts, and clear labels on every estimate.
            </h2>
            <p className="tt-lead mt-5">
              Conversion counts are exact. Funnels, attribution and unique-visitor counts are statistical estimates,
              and the product says so. YOM doesn&rsquo;t do session replay, feature flags or experiments. Pair it with
              a product-analytics tool if you need those.
            </p>
            <a href="/compare" className="link-arrow mt-8 inline-block text-sm">
              See how YOM compares →
            </a>
          </div>
          <div className="card p-7 sm:p-9" data-fx="rise">
            <h3 className="tt-h3">On the roadmap, not shipped</h3>
            <ul className="mt-6 divide-y divide-border">
              {[
                'Google Ads Enhanced Conversions',
                'Shopify App Store listing (the app is in early access)',
                'WooCommerce plugin on wordpress.org (early access today)',
                'Looker Studio connector in the public gallery',
              ].map((t) => (
                <li key={t} className="flex items-center justify-between gap-4 py-3 text-[0.95rem]">
                  <span>{t}</span>
                  <ComingSoon />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section aria-labelledby="price-title">
        <div className="container-y section grid items-end gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="eyebrow">Pricing</p>
            <h2 id="price-title" className="tt-h2 mt-4 text-balance">
              Your first 100,000 events each month are free.
            </h2>
            <p className="tt-lead mt-5">
              Then pay as you go, graduated like tax brackets: $0.10 per 1,000 events up to 1M, falling to $0.015 per
              1,000 above 100M. One million events a month costs $90.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <PrimaryCta id="pricing-teaser" />
            <GhostLink href="/pricing">Open the calculator</GhostLink>
          </div>
        </div>
      </section>

      <div className="container-y pb-16">
        <fn.List />
      </div>

      <CtaBand />
    </>
  );
}

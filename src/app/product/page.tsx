import { pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { PrimaryCta, GhostLink } from '@/components/ui/Cta';
import { ComingSoon, Live } from '@/components/ui/Section';
import { CtaBand } from '@/components/ui/CtaBand';
import { ConsentStream } from '@/components/signature/ConsentStream';
import { FanOut } from '@/components/signature/FanOut';

const TITLE = 'Product';
const DESCRIPTION =
  'What YOM does today: exact conversion counts, consent-aware cookieless collection, edge ingest, signed webhooks, sub-tenants and an agent-ready API.';

export const metadata = pageMetadata({ title: 'Product: what YOM does today', description: DESCRIPTION, path: '/product' });

const TOC = [
  { id: 'conversions', label: 'Exact conversions' },
  { id: 'privacy', label: 'Consent & privacy' },
  { id: 'collection', label: 'First-party collection' },
  { id: 'reports', label: 'Reports' },
  { id: 'destinations', label: 'Destinations' },
  { id: 'multi-tenant', label: 'Multi-tenant & embedding' },
  { id: 'ai-ready', label: 'AI-ready' },
];

function Block({
  id,
  n,
  eyebrow,
  title,
  lead,
  children,
  aside,
}: {
  id: string;
  n: string;
  eyebrow: string;
  title: string;
  lead: React.ReactNode;
  children?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-24 rule-top">
      <div className="container-y section grid gap-12 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <p className="eyebrow">
            <span className="tt-num text-primary">{n}</span> {eyebrow}
          </p>
          <h2 id={`${id}-h`} className="tt-h2 mt-4 text-balance">
            {title}
          </h2>
          <div className="tt-lead mt-5">{lead}</div>
          {children}
        </div>
        {aside ? <div data-fx="rise">{aside}</div> : null}
      </div>
    </section>
  );
}

function Spec({ rows }: { rows: [string, React.ReactNode][] }) {
  return (
    <dl className="mt-8 divide-y divide-border border-y border-border text-[0.95rem]">
      {rows.map(([k, v]) => (
        <div key={k} className="grid gap-1 py-3.5 sm:grid-cols-[11rem_1fr] sm:gap-6">
          <dt className="font-mono text-[0.78rem] uppercase tracking-[0.08em] text-muted">{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function ProductPage() {
  return (
    <>
      <JsonLd page={{ path: '/product', title: TITLE, description: DESCRIPTION }} />
      <PageHero
        eyebrow="Product"
        title="Everything here ships today. Everything else says “Coming soon”."
        lead="YOM is a first-party measurement layer on Cloudflare's edge: collection, exact conversions, consent enforcement, reports, signed data-out and multi-tenancy in one account."
        trail={[{ name: TITLE, path: '/product' }]}
      >
        <PrimaryCta id="product-hero" />
        <GhostLink href="/developers">Read the docs</GhostLink>
      </PageHero>

      <nav aria-label="On this page" className="container-y pb-12">
        <ul className="flex flex-wrap gap-2">
          {TOC.map((t) => (
            <li key={t.id}>
              <a href={`#${t.id}`} className="inline-block rounded-full border border-border px-3.5 py-1.5 text-sm text-muted hover:border-foreground hover:text-foreground">
                {t.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <Block
        id="conversions"
        n="01"
        eyebrow="Exact conversions"
        title="The numbers that pay the bills are counted, not estimated."
        lead={
          <p>
            Five conversion events take an exact, deduplicated path: <code className="font-mono">purchase</code>,{' '}
            <code className="font-mono">refund</code>, <code className="font-mono">generate_lead</code>,{' '}
            <code className="font-mono">form_submit</code> and <code className="font-mono">sign_up</code>. Each event
            carries a stable id, so a retried or double-fired send is counted once, and the total can be checked line by
            line against your order system.
          </p>
        }
        aside={
          <div className="card p-7">
            <h3 className="tt-h3">Exact vs estimated, stated plainly</h3>
            <table className="data-table mt-5">
              <thead>
                <tr>
                  <th scope="col">Metric</th>
                  <th scope="col">How YOM counts it</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Conversion counts</th>
                  <td>
                    <span className="font-semibold text-match">Exact</span>, deduplicated on event id
                  </td>
                </tr>
                <tr>
                  <th scope="row">Funnels</th>
                  <td>Statistical estimate</td>
                </tr>
                <tr>
                  <th scope="row">Attribution</th>
                  <td>Statistical estimate</td>
                </tr>
                <tr>
                  <th scope="row">Unique visitors</th>
                  <td>Statistical estimate (consented visitors only carry an id)</td>
                </tr>
              </tbody>
            </table>
          </div>
        }
      >
        <Spec
          rows={[
            ['Dedup key', 'The event id you send (an order id works well); the SDK generates one if you don’t.'],
            ['Sampling', 'None on conversion counts.'],
            ['Server events', 'Send the conversion from your backend so ad blockers never see it.'],
            [
              'Reconciliation report',
              'Send your orders (API or CSV) and YOM matches each order id to the purchase event’s transaction id, using exact, unsampled events. Missing and extra orders are listed.',
            ],
          ]}
        />
      </Block>

      <Block
        id="privacy"
        n="02"
        eyebrow="Consent & privacy"
        title="Cookieless until someone says yes. Enforced on the server, too."
        lead={
          <p>
            Without analytics consent, the browser SDK keeps no persistent id and writes nothing to storage, and the
            server forces the visitor id empty regardless of what the client sent. Withdrawing consent wipes the stored
            ids.
          </p>
        }
        aside={<ConsentStream />}
      >
        <Spec
          rows={[
            ['Consent states', 'granted · denied · unknown. Only granted allows a first-party visitor id.'],
            ['DNT / GPC', 'Treated as denied: cookieless by default. Per project you can choose drop or ignore instead.'],
            ['Required mode', 'Optionally drop every event whose consent is denied.'],
            ['URLs', 'Path only. Query strings and fragments never leave the browser; referrers are reduced to a host.'],
            ['Click ids', 'Reports record presence only (e.g. “gclid present”). The one exception: with marketing consent and Meta CAPI configured, the Meta click id is passed to Meta for matching.'],
            ['PII scrubbing', 'Email-, phone-, name-, address- and card-like params are removed from browser events.'],
            ['Forwarding', 'Browser forwarding to your own GA4 or Meta Pixel, and server-side Meta CAPI / GA4 Measurement Protocol, run only with explicit marketing consent and no GPC signal.'],
            ['Internal traffic', 'Flagged internal events are excluded from reports and never sent to destinations.'],
            [
              'Opt-out evidence report',
              'Per event: the consent state, GPC, DNT, whether it was kept cookieless, PII scrubbed or forwarding suppressed.',
            ],
          ]}
        />
      </Block>

      <Block
        id="collection"
        n="03"
        eyebrow="First-party collection"
        title="Built for the network you actually have: ad blockers, Safari, page-close."
        lead={
          <p>
            Browser batches go to YOM&rsquo;s edge ingest as <code className="font-mono">text/plain</code>, which is
            CORS-safelisted, so there&rsquo;s no preflight and <code className="font-mono">sendBeacon</code> works on
            page hide. Server events use a secret key or an HMAC signature. Bots are filtered at the edge.
          </p>
        }
        aside={
          <div className="card p-7">
            <h3 className="tt-h3">Ingest endpoints</h3>
            <table className="data-table mt-5">
              <thead>
                <tr>
                  <th scope="col">Endpoint</th>
                  <th scope="col">Auth</th>
                </tr>
              </thead>
              <tbody className="font-mono text-[0.82rem]">
                <tr>
                  <th scope="row" className="font-normal">POST /v2/collect</th>
                  <td>publishable key in body</td>
                </tr>
                <tr>
                  <th scope="row" className="font-normal">POST /v2/events</th>
                  <td>Bearer yom_sk_… or HMAC</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-5 text-sm text-muted">
              ≤ 50 events or 64 KB per request. Retries use backoff on network errors, 429 and 5xx.
            </p>
          </div>
        }
      >
        <Spec
          rows={[
            ['Taxonomy', 'GA4-aligned event names out of the box: page_view, view_item, add_to_cart, begin_checkout, purchase, refund, generate_lead, sign_up and more.'],
            ['Custom events', 'Any snake_case name up to 64 characters; strict mode drops names you haven’t declared.'],
            ['Enrichment', 'Channel from UTM + referrer, device / browser / OS, country and region from the edge.'],
            ['Bot filtering', 'User-agent rules and missing-UA checks at the edge; webdriver detection in the SDK.'],
            ['SDK', 'Browser, React and Node, from one npm package, around 12 KB gzipped with every plugin.'],
            ['Commerce connectors', 'Shopify app and WooCommerce plugin, in early access: not yet listed in the Shopify App Store or on wordpress.org, so we set them up with you.'],
          ]}
        />
      </Block>

      <Block
        id="reports"
        n="04"
        eyebrow="Reports"
        title="The reports a growth team uses, with the estimates labelled."
        lead={
          <p>
            Overview, timeseries, breakdowns by any dimension, ecommerce (view → cart → checkout → purchase, revenue,
            AOV, items), goals, funnels, attribution (first, last or any touch by channel), retention cohorts, Core Web
            Vitals, errors and a 30-minute realtime view.
          </p>
        }
      >
        <Spec
          rows={[
            ['Export', 'CSV or NDJSON; older data comes from the raw archive.'],
            ['Raw archive', 'Your events, kept as files you can export.'],
            ['Retention', 'Free: 90 days. Pay-as-you-go: 365 days.'],
            ['Generic query', 'One counters endpoint (count, sum, unique sessions/visitors, percentiles) grouped by up to two dimensions or by time.'],
          ]}
        />
      </Block>

      <Block
        id="destinations"
        n="05"
        eyebrow="Destinations"
        title="Your data leaves when you say so: signed, retried, logged."
        lead={
          <p>
            Webhook destinations receive events in realtime or in batches. Every request is signed with an HMAC
            signature and carries a stable event id, so your receiver can verify it and drop duplicates.
          </p>
        }
        aside={
          <div className="card p-7">
            <h3 className="tt-h3">Delivery guarantees</h3>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              <li><span className="font-mono text-sm text-muted">Signature</span><br />YOM-Signature: t=…, v1=HMAC-SHA256</li>
              <li><span className="font-mono text-sm text-muted">Retries</span><br />Backoff from 30 seconds to 6 hours, about 24 hours in total</li>
              <li><span className="font-mono text-sm text-muted">Visibility</span><br />Delivery log, health, test events and one-click redelivery</li>
              <li><span className="font-mono text-sm text-muted">White-label</span><br />Your own header prefix and user agent</li>
            </ul>
          </div>
        }
      >
        <Spec
          rows={[
            ['Filters', 'All events, a family (event.*) or named events.'],
            ['Never sent', 'Internal traffic.'],
            ['Meta CAPI / GA4 MP', 'Server-side forwarding to your Meta pixel and GA4 property. Sent only with explicit marketing consent and no GPC; everything else is logged as suppressed. Pay-as-you-go.'],
            ['Warehouse exports', 'Hourly files to S3, Google Cloud Storage or R2 (NDJSON or Parquet), or BigQuery. Snowflake reads the S3 export through an external stage. Pay-as-you-go, up to 5 per project.'],
            ['Looker Studio', 'A community connector that reads your reports with a read-scoped key. Early access: you deploy it from our repository.'],
            ['Moving from GA4', 'A gtag shim in the SDK so existing gtag() calls keep working, and an import of daily totals from your GA4 BigQuery export for the days before YOM.'],
            [
              'Google Ads Enhanced Conversions',
              <span key="g" className="flex flex-wrap items-center gap-3">
                Not built yet <ComingSoon />
              </span>,
            ],
          ]}
        />
      </Block>

      <section id="multi-tenant" aria-labelledby="multi-tenant-h" className="scroll-mt-24 ink-band on-ink">
        <div className="container-y section grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">
              <span className="tt-num text-on-ink-signal">06</span> Multi-tenant &amp; embedding
            </p>
            <h2 id="multi-tenant-h" className="tt-h2 mt-4 text-balance">
              Built for organisations that serve other organisations.
            </h2>
            <p className="mt-5 text-on-ink-muted">
              Sub-tenants partition data inside one project. They can be <span className="font-mono">open</span>{' '}
              (created on first event, zero setup) or <span className="font-mono">registered</span>. Keys and embed
              tokens can be bound to one sub-tenant, and a bound principal is forced to it.
            </p>
            <ul className="mt-7 space-y-3 text-[0.95rem]">
              <li className="flex flex-wrap items-center gap-3"><Live label="Live" /> Scoped keys and embed tokens per sub-tenant</li>
              <li className="flex flex-wrap items-center gap-3"><Live label="Live" /> Usage by sub-tenant, for re-billing</li>
              <li className="flex flex-wrap items-center gap-3"><Live label="Live" /> White-label webhook headers</li>
              <li className="flex flex-wrap items-center gap-3"><Live label="Live" /> White-label client portals with read-only client logins (own domain on pay-as-you-go)</li>
              <li className="flex flex-wrap items-center gap-3"><Live label="Live" /> <span className="font-mono">&lt;yom-report&gt;</span> embed and scheduled email reports</li>
              <li className="flex flex-wrap items-center gap-3"><Live label="Live" /> Partner API: create projects and mint keys</li>
            </ul>
          </div>
          <FanOut />
        </div>
      </section>

      <Block
        id="ai-ready"
        n="07"
        eyebrow="AI-ready"
        title="An MCP server and an API an agent can use."
        lead={
          <p>
            YOM&rsquo;s MCP server gives Claude and other AI agents 13 read-only tools over your reports, authorised
            by a read-scoped secret key or a short-lived embed token. The same reports are served by an API: overview,
            timeseries, breakdowns, a generic counters query and CSV/NDJSON export. An agent can ask &ldquo;why did
            leads drop?&rdquo; without anyone exporting a spreadsheet.
          </p>
        }
      >
        <ul className="mt-8 divide-y divide-border border-y border-border">
          {[
            ['MCP server for Claude and other AI agents: read-only, scoped by key', false],
            ['AI-assistant traffic channel: ChatGPT, Perplexity, Claude and 9 others stop landing in Direct', false],
            ['AI-crawler report (last 88 days): sees crawlers that reach YOM through server-side tracking or the pixel', false],
            ['Report API with read-scoped keys', false],
          ].map(([t, soon]) => (
            <li key={String(t)} className="flex items-center justify-between gap-4 py-3.5 text-[0.95rem]">
              <span>{t}</span>
              {soon ? <ComingSoon /> : <span className="chip chip-live">Live</span>}
            </li>
          ))}
        </ul>
      </Block>

      <section className="rule-top">
        <div className="container-y section-tight flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-xl text-muted">
            Also included: Google sign-in and multi-factor authentication for your team. See{' '}
            <a href="/security" className="link-arrow text-foreground">security</a> for what exists today and what
            doesn&rsquo;t yet.
          </p>
          <a href="/pricing" className="link-arrow text-sm">What it costs →</a>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

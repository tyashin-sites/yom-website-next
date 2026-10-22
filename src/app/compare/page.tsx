import { pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { PrimaryCta, GhostLink } from '@/components/ui/Cta';
import { ComingSoon } from '@/components/ui/Section';
import { CtaBand } from '@/components/ui/CtaBand';
import { footnotes } from '@/components/ui/Footnotes';
import { LAST_VERIFIED, LAST_VERIFIED_LABEL } from '@/lib/sources';
import { calculateEventCost, formatMoney } from '@/lib/pricing';

const TITLE = 'Compare';
const DESCRIPTION =
  'YOM compared with GA4, Mixpanel and Amplitude, and Segment and RudderStack, using only cited, published facts. Includes where each tool is the better fit.';

export const metadata = pageMetadata({
  title: 'YOM vs GA4, Mixpanel, Amplitude, Segment and RudderStack',
  description: DESCRIPTION,
  path: '/compare',
});

const usd = (n: number) => formatMoney(calculateEventCost(n, 'USD'), 'USD');

export default function ComparePage() {
  const fn = footnotes([
    'ga4Thresholds',
    'ga4Modeling',
    'ga4Retention',
    'ga4Export',
    'lookerQuota',
    'mixpanelPricing',
    'amplitudePricing',
    'segmentPricing',
    'rudderstackPricing',
  ]);

  const Table = ({
    id,
    vs,
    rows,
  }: {
    id: string;
    vs: string;
    rows: { topic: string; them: React.ReactNode; yom: React.ReactNode }[];
  }) => (
    <div className="mt-10 overflow-x-auto rounded-lg border border-border bg-paper">
      <table className="data-table min-w-[40rem]" aria-labelledby={`${id}-h`}>
        <thead>
          <tr>
            <th scope="col" className="w-[22%]">What we checked</th>
            <th scope="col" className="w-[39%]">{vs} (as published)</th>
            <th scope="col">YOM</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.topic}>
              <th scope="row">{r.topic}</th>
              <td>{r.them}</td>
              <td>{r.yom}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const Fit = ({ them, yom }: { them: React.ReactNode; yom: React.ReactNode }) => (
    <div className="mt-8 grid gap-4 md:grid-cols-2">
      <div className="rounded-lg border border-border p-6">
        <p className="eyebrow">Keep or choose them when</p>
        <div className="mt-3 text-[0.97rem]">{them}</div>
      </div>
      <div className="rounded-lg border border-border bg-paper p-6">
        <p className="eyebrow">Choose YOM when</p>
        <div className="mt-3 text-[0.97rem]">{yom}</div>
      </div>
    </div>
  );

  return (
    <>
      <JsonLd page={{ path: '/compare', title: TITLE, description: DESCRIPTION }} />
      <PageHero
        eyebrow="Compare"
        title="Only what we can cite. Including where they win."
        lead="Competitor facts come from the vendors' own pages or named third parties, with a footnote on every one. If we couldn't verify a capability, it isn't in the table."
        trail={[{ name: TITLE, path: '/compare' }]}
      >
        <PrimaryCta id="compare-hero" />
        <GhostLink href="/why-yom">Why YOM</GhostLink>
      </PageHero>

      <div className="container-y -mt-4 pb-6">
        <p className="inline-flex items-center gap-3 rounded-md border border-border px-4 py-2 font-mono text-[0.74rem] text-muted">
          Last verified <time dateTime={LAST_VERIFIED} className="text-foreground">{LAST_VERIFIED_LABEL}</time> ·
          YOM prices from its published rate card
        </p>
        <nav aria-label="Comparisons" className="mt-6 flex flex-wrap gap-2">
          {[
            ['#ga4', 'vs GA4'],
            ['#product-analytics', 'vs Mixpanel / Amplitude'],
            ['#cdp', 'vs Segment / RudderStack'],
          ].map(([href, label]) => (
            <a key={href} href={href} className="rounded-full border border-border px-3.5 py-1.5 text-sm text-muted hover:border-foreground hover:text-foreground">
              {label}
            </a>
          ))}
        </nav>
      </div>

      <section id="ga4" aria-labelledby="ga4-h" className="scroll-mt-24">
        <div className="container-y section-tight">
          <p className="eyebrow">01</p>
          <h2 id="ga4-h" className="tt-h2 mt-3">YOM vs GA4</h2>
          <p className="tt-lead mt-4 max-w-3xl">
            GA4 is free and deeply tied to Google Ads. YOM is the layer you reconcile against.
          </p>
          <Table
            id="ga4"
            vs="GA4"
            rows={[
              {
                topic: 'Small numbers',
                them: <>Withholds report rows under system-defined thresholds you can&rsquo;t adjust.<fn.Ref id="ga4Thresholds" /></>,
                yom: 'Conversion counts are exact and never thresholded. Other reports are labelled estimates.',
              },
              {
                topic: 'Consent gaps',
                them: (
                  <>
                    Behavioral modeling needs 1,000+ denied events a day for 7 days and 1,000+ granted users a day on 7
                    of 28 days; eligibility still isn&rsquo;t guaranteed.<fn.Ref id="ga4Modeling" />
                  </>
                ),
                yom: 'No modeling. Without consent, events are collected cookieless and conversions still count.',
              },
              {
                topic: 'Retention',
                them: <>Event-level data: 2 or 14 months on standard properties, 50 months on 360.<fn.Ref id="ga4Retention" /></>,
                yom: '90 days on Free, 365 days on pay-as-you-go, plus export from the raw archive.',
              },
              {
                topic: 'Raw export',
                them: <>Free daily BigQuery export capped at 1 million events a day.<fn.Ref id="ga4Export" /></>,
                yom: (
                  <span className="flex flex-wrap items-center gap-2">
                    CSV / NDJSON export today. Warehouse sync <ComingSoon />
                  </span>
                ),
              },
              {
                topic: 'Agencies',
                them: <>Looker Studio reports hit GA4 API quota errors.<fn.Ref id="lookerQuota" /></>,
                yom: 'Clients are sub-tenants of one org with scoped keys and embed tokens.',
              },
            ]}
          />
          <Fit
            them={<p>You buy Google Ads and rely on its native GA4 integrations. Many teams keep GA4 for that.</p>}
            yom={<p>You need revenue and leads that match your order system, and an opt-out that is enforced server-side. Run it alongside GA4.</p>}
          />
        </div>
      </section>

      <section id="product-analytics" aria-labelledby="pa-h" className="scroll-mt-24 rule-top">
        <div className="container-y section-tight">
          <p className="eyebrow">02</p>
          <h2 id="pa-h" className="tt-h2 mt-3">YOM vs Mixpanel and Amplitude</h2>
          <p className="tt-lead mt-4 max-w-3xl">Product-analytics suites, priced per event or per user.</p>
          <Table
            id="pa"
            vs="Mixpanel / Amplitude"
            rows={[
              {
                topic: '10M events / month',
                them: <>Mixpanel Growth: $840 / mo on annual billing, $1,176 monthly.<fn.Ref id="mixpanelPricing" /></>,
                yom: <span className="tt-num">{usd(10_000_000)} / mo</span>,
              },
              {
                topic: '20M events / month',
                them: <>Mixpanel Growth: $1,635 / mo on annual billing, $2,289 monthly. Above 20M is sales-only.<fn.Ref id="mixpanelPricing" /></>,
                yom: <span className="tt-num">{usd(20_000_000)} / mo, no sales call at any volume</span>,
              },
              {
                topic: 'Billing unit',
                them: <>Amplitude Plus is billed per monthly tracked user, from about $49 / mo.<fn.Ref id="amplitudePricing" /></>,
                yom: 'Per event. Anonymous, cookieless traffic doesn’t inflate a user count.',
              },
              {
                topic: 'Free tier',
                them: <>Mixpanel: 1M events free.<fn.Ref id="mixpanelPricing" /></>,
                yom: '100,000 events free every month on both plans.',
              },
            ]}
          />
          <Fit
            them={<p>You need session replay, feature flags or experiments. YOM doesn&rsquo;t offer those. Pair it with a product-analytics tool.</p>}
            yom={<p>You need marketing and conversion measurement that reconciles, consent enforcement, and multiple clients in one org.</p>}
          />
        </div>
      </section>

      <section id="cdp" aria-labelledby="cdp-h" className="scroll-mt-24 rule-top">
        <div className="container-y section-tight">
          <p className="eyebrow">03</p>
          <h2 id="cdp-h" className="tt-h2 mt-3">YOM vs Segment and RudderStack</h2>
          <p className="tt-lead mt-4 max-w-3xl">Customer data platforms: collection plus fan-out to many destinations.</p>
          <Table
            id="cdp"
            vs="Segment / RudderStack"
            rows={[
              {
                topic: 'Entry price',
                them: <>Segment Team: $120 / mo for 10K MTUs; overages about $10–12 per 1K MTUs (third-party).<fn.Ref id="segmentPricing" /></>,
                yom: 'Free for the first 100,000 events every month.',
              },
              {
                topic: '1M events / month',
                them: <>RudderStack Growth: $265 / mo on monthly billing.<fn.Ref id="rudderstackPricing" /></>,
                yom: <span className="tt-num">{usd(1_000_000)} / mo</span>,
              },
              {
                topic: '25M events / month',
                them: <>RudderStack Growth: $2,750 / mo on monthly billing; above 25M is sales-only.<fn.Ref id="rudderstackPricing" /></>,
                yom: <span className="tt-num">{usd(25_000_000)} / mo</span>,
              },
              {
                topic: 'Data out',
                them: 'Routing events to downstream tools is what a CDP is for.',
                yom: (
                  <span className="flex flex-wrap items-center gap-2">
                    Signed realtime or batched webhooks with retries, log and redelivery. Meta CAPI / GA4 MP <ComingSoon />
                  </span>
                ),
              },
            ]}
          />
          <Fit
            them={<p>You fan events out to many tools. Keep your CDP for that; it can send YOM a copy through /v2/events.</p>}
            yom={<p>What you mostly need is analytics and exact conversions, with signed webhooks for the few systems that consume them.</p>}
          />
        </div>
      </section>

      <div className="container-y section-tight">
        <fn.List />
        <p className="mt-6 text-sm text-muted">
          Spotted something out of date? Tell us at <a href="/contact" className="underline">contact</a> and we&rsquo;ll
          correct it.
        </p>
      </div>

      <CtaBand />
    </>
  );
}

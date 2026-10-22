import { pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { FaqList, type Faq } from '@/components/ui/FaqList';
import { CtaBand } from '@/components/ui/CtaBand';

const TITLE = 'FAQ';
const DESCRIPTION =
  'Straight answers about YOM: what is exact and what is estimated, consent and GPC, ad blockers, GA4, sub-tenants, pricing, security and what is not shipped yet.';

export const metadata = pageMetadata({ title: 'Frequently asked questions', description: DESCRIPTION, path: '/faq' });

const GROUPS: { id: string; title: string; items: Faq[] }[] = [
  {
    id: 'basics',
    title: 'The basics',
    items: [
      { q: 'What is YOM?', a: 'YOM (Your Own Metrics) is a first-party, consent-aware analytics platform. It counts conversions exactly so they reconcile with your order system, keeps collecting cookieless after an opt-out, and lets one organisation run many clients as sub-tenants. It is built by Aapastech.' },
      { q: 'Who is it for?', a: 'E-commerce and DTC brands that need revenue to match the order system, agencies running many clients, SaaS platforms that want analytics inside their product, and privacy-sensitive teams that want collection to stop at an opt-out.' },
      { q: 'Is the data sampled?', a: 'Conversion counts (purchase, refund, generate_lead, form_submit and sign_up) are exact and deduplicated on the event id. Funnels, attribution and unique-visitor counts are statistical estimates, and YOM labels them that way.' },
      { q: 'Does YOM replace GA4?', a: 'It can sit alongside it. Many teams keep GA4 for its Google Ads integrations and use YOM as the source of truth for revenue and leads. Event names follow the GA4 taxonomy, so existing events map across by name.' },
      { q: 'Does YOM do session replay, feature flags or experiments?', a: 'No. Those are product-analytics features outside YOM’s lane. Pair YOM with a product-analytics tool if you need them.' },
    ],
  },
  {
    id: 'privacy',
    title: 'Consent & privacy',
    items: [
      { q: 'What happens when a visitor opts out or sends Global Privacy Control?', a: 'By default the event is collected cookieless: no visitor id, nothing written to browser storage, and the server forces the id empty regardless of what the browser sent. Conversions are still counted. Per project you can instead drop those events or ignore the signal.' },
      { q: 'Does YOM collect personal data?', a: 'Browser events are path-only (query strings never leave the browser), click ids are recorded only as present or absent, and email-, phone-, name-, address- and card-like params are scrubbed. Server events you send keep the fields you include, which is how lead details can reach your CRM through a destination.' },
      { q: 'Does YOM forward data to ad platforms?', a: 'Only if you configure browser forwarding to your own GA4 or Meta Pixel, and only for visitors who granted marketing consent. Server-side Meta CAPI and GA4 Measurement Protocol forwarding is coming soon.' },
      { q: 'Is YOM compliant with my privacy law?', a: 'Compliance depends on how you use any tool, so we can’t promise it for you. YOM is privacy-first by design; have your counsel review your setup. Nothing on this site is legal advice.' },
    ],
  },
  {
    id: 'collection',
    title: 'Collection',
    items: [
      { q: 'Will ad blockers stop YOM?', a: 'Some may block browser collection. The durable path is sending conversions from your backend to /v2/events with a secret key or HMAC signature, which no browser filter list can see.' },
      { q: 'How do I install it?', a: 'npm install @yourownmetric/sdk, then call YOM.init with your publishable key. The same package includes React components and a Node server client. See the developers page for code.' },
      { q: 'What stops a retry from double-counting a purchase?', a: 'Every event carries an id. Use your order id as the event id and YOM counts it once, however many times it is sent.' },
    ],
  },
  {
    id: 'clients',
    title: 'Agencies & platforms',
    items: [
      { q: 'How do I separate clients?', a: 'Each client or customer is a sub-tenant inside your project. Keys and embed tokens can be bound to one sub-tenant, and a bound key can only read that sub-tenant’s data.' },
      { q: 'Can I re-bill clients for usage?', a: 'Yes. The usage report breaks event volume down by sub-tenant, so you can bill at your own margin.' },
      { q: 'Is there a white-label client portal?', a: 'Not yet; it is coming soon. Today you can white-label webhook headers and embed scoped reports with embed tokens.' },
    ],
  },
  {
    id: 'billing',
    title: 'Pricing & account',
    items: [
      { q: 'How much does it cost?', a: 'The first 100,000 events each month are free on both plans. Pay-as-you-go then charges $0.10 per 1,000 events up to 1 million, $0.06 up to 10 million, $0.03 up to 100 million and $0.015 above that, each rate applying only to its own band. Prices are also published in CAD.' },
      { q: 'Do I need a credit card to try it?', a: 'No. The Free plan needs no credit card.' },
      { q: 'How long is data kept?', a: '90 days on Free and 365 days on pay-as-you-go. You can export raw events as CSV or NDJSON at any time.' },
      { q: 'How do I sign in?', a: 'With email and password or Google sign-in, with optional multi-factor authentication.' },
    ],
  },
  {
    id: 'roadmap',
    title: 'Roadmap',
    items: [
      { q: 'Is there an MCP server for Claude or other AI agents?', a: 'Coming soon, scoped by key and sub-tenant. Today agents can use the report API with a read-scoped key.' },
      { q: 'What else is coming soon?', a: 'An AI-assistant traffic channel and AI-crawler report, server-side Meta CAPI and GA4 Measurement Protocol forwarding, a white-label client portal, a Shopify app, warehouse sync, a revenue reconciliation report and an opt-out evidence report.' },
    ],
  },
];

const ALL = GROUPS.flatMap((g) => g.items);

export default function FaqPage() {
  return (
    <>
      <JsonLd page={{ path: '/faq', title: TITLE, description: DESCRIPTION, type: 'FAQPage', faq: ALL }} />
      <PageHero
        eyebrow="FAQ"
        title="Straight answers, including the ones that cost us a sale."
        trail={[{ name: TITLE, path: '/faq' }]}
      />
      <nav aria-label="FAQ sections" className="container-y pb-10">
        <ul className="flex flex-wrap gap-2">
          {GROUPS.map((g) => (
            <li key={g.id}>
              <a href={`#${g.id}`} className="inline-block rounded-full border border-border px-3.5 py-1.5 text-sm text-muted hover:border-foreground hover:text-foreground">
                {g.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="container-y space-y-16 pb-24">
        {GROUPS.map((g) => (
          <section key={g.id} id={g.id} aria-labelledby={`${g.id}-h`} className="grid scroll-mt-24 gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <h2 id={`${g.id}-h`} className="tt-h2">{g.title}</h2>
            <FaqList items={g.items} />
          </section>
        ))}
        <p className="text-muted">
          Didn&rsquo;t find it? <a href="/contact" className="underline">Ask us</a>, read the{' '}
          <a href="/developers" className="underline">developer guide</a> or check{' '}
          <a href="/security" className="underline">security</a>.
        </p>
      </div>
      <CtaBand />
    </>
  );
}

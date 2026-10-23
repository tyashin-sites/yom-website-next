import { pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { PrimaryCta, GhostLink } from '@/components/ui/Cta';
import { CtaBand } from '@/components/ui/CtaBand';
import { footnotes } from '@/components/ui/Footnotes';
import { calculateEventCost, formatMoney } from '@/lib/pricing';

const TITLE = 'Why YOM';
const DESCRIPTION =
  'The cited case for provable measurement: thresholded analytics, GPC and opt-out fines, ad blockers and Safari, per-event and per-client pricing.';

export const metadata = pageMetadata({ title: 'Why YOM: the case, with sources', description: DESCRIPTION, path: '/why-yom' });

export default function WhyYomPage() {
  const fn = footnotes([
    'ga4Thresholds',
    'ga4Modeling',
    'ga4Retention',
    'ga4Export',
    'stateLaws',
    'healthline',
    'tractorSupply',
    'cppaHonda',
    'toddSnyder',
    'gpcSweep',
    'adBlock',
    'safariItp',
    'sgtmBlocked',
    'chromeCookies',
    'mixpanelPricing',
    'agencyAnalytics',
    'lookerQuota',
    'embeddedDashboards',
    'aiReferrals',
    'aiDirect',
    'gaMcp',
  ]);
  const yom20m = formatMoney(calculateEventCost(20_000_000, 'USD'), 'USD');

  const Problem = ({
    n,
    id,
    title,
    children,
    answer,
  }: {
    n: string;
    id: string;
    title: string;
    children: React.ReactNode;
    answer: React.ReactNode;
  }) => (
    <section id={id} aria-labelledby={`${id}-h`} className="rule-top scroll-mt-24">
      <div className="container-y section grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="eyebrow">
            <span className="tt-num text-primary">{n}</span> The problem
          </p>
          <h2 id={`${id}-h`} className="tt-h2 mt-4 text-balance">
            {title}
          </h2>
          <div className="mt-6 space-y-4 text-[1.02rem] leading-relaxed">{children}</div>
        </div>
        <aside className="card self-start p-7 sm:p-8" data-fx="rise" aria-label="What YOM does about it">
          <p className="eyebrow">What YOM does</p>
          <div className="mt-4 space-y-3 text-[0.98rem]">{answer}</div>
        </aside>
      </div>
    </section>
  );

  return (
    <>
      <JsonLd page={{ path: '/why-yom', title: TITLE, description: DESCRIPTION }} />
      <PageHero
        eyebrow="Why YOM"
        title="Measurement broke in four places. Here’s the evidence."
        lead="Every figure on this page links to its source. Where a number comes from a third-party estimate rather than the vendor itself, we say so."
        trail={[{ name: TITLE, path: '/why-yom' }]}
      >
        <PrimaryCta id="why-hero" />
        <GhostLink href="/compare">Compare tools</GhostLink>
      </PageHero>

      <Problem
        n="01"
        id="trust"
        title="The numbers don’t reconcile, and you can’t see why."
        answer={
          <>
            <p>Counts purchase, refund, generate_lead, form_submit and sign_up exactly, deduplicated on the event id. No thresholds or sampling on those counts.</p>
            <p>Keeps your raw events in an archive you can export as CSV or NDJSON.</p>
            <p className="text-muted">Funnels, attribution and unique visitors are estimates in YOM too, and are labelled as such.</p>
          </>
        }
      >
        <p>
          GA4 withholds rows from reports to stop anyone inferring a user&rsquo;s identity, using thresholds Google
          sets and you can&rsquo;t adjust.<fn.Ref id="ga4Thresholds" /> Consent-mode modeling only switches on above
          1,000 denied events a day for 7 days and 1,000 granted users a day on 7 of the last 28 days, and meeting
          that still doesn&rsquo;t guarantee eligibility.<fn.Ref id="ga4Modeling" />
        </p>
        <p>
          Event-level retention on a standard property is 2 or 14 months.<fn.Ref id="ga4Retention" /> The free daily
          BigQuery export is capped at 1 million events a day.<fn.Ref id="ga4Export" /> None of that is wrong for a
          free tool. It just means the revenue in your analytics and the revenue in your order system are produced
          by different processes, and only one of them can be audited.
        </p>
      </Problem>

      <Problem
        n="02"
        id="opt-outs"
        title="Regulators are fining opt-outs that didn’t stop the data."
        answer={
          <>
            <p>Treats Global Privacy Control and DNT as denied consent: collection goes cookieless, or is dropped if you choose.</p>
            <p>Enforces it on the server: without consent the visitor id is forced empty whatever the browser sent.</p>
            <p>Forwards to ad platforms only with explicit marketing consent and no GPC signal.</p>
            <p>Records the evidence: an opt-out report shows, per event, the consent state and what was dropped, kept cookieless or suppressed.</p>
          </>
        }
      >
        <p>
          Twenty US states had comprehensive privacy laws in effect by 2026.<fn.Ref id="stateLaws" /> The 2025
          enforcement actions share a pattern: the companies had banners, but the data kept moving.
        </p>
        <ul className="space-y-2 pl-5 [list-style:square]">
          <li>
            Healthline paid <span className="tt-num">$1.55M</span> to the California AG after it kept sending
            identifiers and article titles to ad partners after users opted out, despite having a GPC detector and a
            banner.<fn.Ref id="healthline" />
          </li>
          <li>
            Tractor Supply was fined <span className="tt-num">$1.35M</span> by the CPPA; its failures included not
            honouring GPC.<fn.Ref id="tractorSupply" />
          </li>
          <li>
            The CPPA also reached settlements with Honda (<span className="tt-num">$632,500</span>) and Todd Snyder
            (<span className="tt-num">$345,178</span>), whose opt-out portal failed for 40 days.
            <fn.Ref id="cppaHonda" />
            <fn.Ref id="toddSnyder" />
          </li>
        </ul>
        <p>
          In September 2025 California, Colorado and Connecticut announced a joint sweep targeting Global Privacy
          Control.<fn.Ref id="gpcSweep" />
        </p>
      </Problem>

      <Problem
        n="03"
        id="signal"
        title="A third of your visitors block the script. Safari limits the rest."
        answer={
          <>
            <p>Browser batches go out with sendBeacon as text/plain: no CORS preflight, and page-close events aren&rsquo;t lost.</p>
            <p>Conversions can come straight from your backend to /v2/events with a secret key or HMAC signature, which no filter list can block.</p>
            <p>Cookieless collection counts fewer unique visitors by design. That&rsquo;s the legally safe number.</p>
          </>
        }
      >
        <p>
          32.5% of US internet users used an ad blocker in Q2 2025.<fn.Ref id="adBlock" /> Safari caps script-writable
          storage at 7 days without user interaction.<fn.Ref id="safariItp" /> Filter lists now target server-side
          tagging subdomains by name, so &ldquo;first-party&rdquo; alone keeps eroding.<fn.Ref id="sgtmBlocked" />
        </p>
        <p>
          This isn&rsquo;t about cookies going away: Chrome kept third-party cookies in 2025.
          <fn.Ref id="chromeCookies" /> It&rsquo;s about blockers, browsers and consent law, which are all already here.
        </p>
      </Problem>

      <Problem
        n="04"
        id="cost"
        title="Pricing that punishes growth, and agencies that pay per client."
        answer={
          <>
            <p>
              Graduated per-event pricing with the first 100,000 events free every month. At 20 million events a month
              YOM&rsquo;s list price is <span className="tt-num font-semibold">{yom20m}</span>.{' '}
              <a href="/pricing" className="underline">Check the calculator</a>.
            </p>
            <p>Unlimited projects and team members on pay-as-you-go. Clients are sub-tenants, not extra seats.</p>
          </>
        }
      >
        <p>
          Mixpanel lists 20 million events a month at <span className="tt-num">$1,635</span> a month on annual
          billing.<fn.Ref id="mixpanelPricing" /> Agency reporting tools commonly charge per client, for example{' '}
          <span className="tt-num">$20</span> per client per month on annual billing.<fn.Ref id="agencyAnalytics" />{' '}
          Agencies reporting on GA4 through Looker Studio also run into API quota errors.<fn.Ref id="lookerQuota" />
        </p>
        <p>
          SaaS platforms want analytics inside their own product: a vendor survey found 78% already ship in-product
          dashboards, which users rate 3.6 out of 5.<fn.Ref id="embeddedDashboards" />
        </p>
      </Problem>

      <section id="ai" aria-labelledby="ai-h" className="ink-band on-ink">
        <div className="container-y section grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow">
              <span className="tt-num text-on-ink-signal">05</span> AI search and agents
            </p>
            <h2 id="ai-h" className="tt-h2 mt-4 text-balance">
              AI assistants send traffic. Agents want to ask questions.
            </h2>
            <div className="mt-6 space-y-4 text-on-ink-muted">
              <p>
                Adobe measured AI-referred US retail traffic up 693% year over year in the 2025 holiday season,
                while independent data says the channel is still small.<fn.Ref id="aiReferrals" /> By default GA4 puts
                much of it in Direct or Referral.<fn.Ref id="aiDirect" />
              </p>
              <p>
                Google shipped an experimental, read-only MCP server for Google Analytics in July 2025.
                <fn.Ref id="gaMcp" /> Agents will query analytics the way people open dashboards today.
              </p>
            </div>
          </div>
          <ul className="self-center divide-y divide-[color:var(--on-ink-border)] border-y border-[color:var(--on-ink-border)]">
            {['AI-assistant traffic channel', 'AI-crawler report', 'MCP server for Claude and other agents'].map((t) => (
              <li key={t} className="flex items-center justify-between gap-4 py-4">
                <span>{t}</span>
                <span className="chip chip-live">Live</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="container-y section-tight">
        <fn.List />
      </div>

      <CtaBand title="Measure what you can defend." />
    </>
  );
}

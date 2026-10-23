import { pageMetadata } from '@/lib/seo';
import { SolutionPage, type SolutionContent } from '@/components/SolutionPage';
import { FanOut } from '@/components/signature/FanOut';

const c: SolutionContent = {
  slug: 'platforms',
  name: 'SaaS platforms',
  description:
    'Embedded, multi-tenant analytics for SaaS platforms: zero-touch sub-tenants, scoped embed tokens, a generic counters query and usage per customer.',
  eyebrow: 'For SaaS platforms',
  title: 'Analytics inside your product, metered per customer.',
  lead: 'Give every customer their own analytics without building a pipeline. Tag events with a sub-tenant, embed scoped reports, and read usage per customer to bill for it.',
  secondary: { href: '/developers', label: 'Read the docs' },
  painsTitle: 'The embedded-analytics gap',
  pains: [
    { stat: '78%', text: 'of SaaS companies already ship in-product dashboards (vendor survey)', source: 'embeddedDashboards' },
    { stat: '3.6 / 5', text: 'is how users rate those dashboards in the same survey', source: 'embeddedDashboards' },
    { stat: '$120', text: 'a month for 10K MTUs is where a CDP like Segment starts (third-party)', source: 'segmentPricing' },
  ],
  showcaseTitle: 'One project. A sub-tenant per customer, created on first event.',
  showcaseLead:
    'Set subTenant in the SDK or on server events. In open mode the sub-tenant appears the first time it sends data: no provisioning call, no per-customer setup.',
  showcase: <FanOut orgLabel="Your platform" />,
  today: [
    { title: 'Zero-touch sub-tenants', body: 'Open mode creates a customer partition on its first event.' },
    { title: 'Embed tokens', body: 'Bound to one customer, with report and origin allow-lists.' },
    { title: 'Generic counters query', body: 'Count, sum, unique sessions or visitors and percentiles, grouped by up to two dimensions or by time: the building block for your own charts.' },
    { title: 'Usage per customer', body: 'Event volume by sub-tenant for your own billing.' },
    { title: 'White-label data-out', body: 'Signed webhooks under your brand’s header prefix, so customers never see YOM.' },
    { title: 'Custom dimensions', body: 'Map your own context (plan, region, cohort) into reportable dimensions and metrics.' },
    { title: 'Partner API', body: 'Management keys create and suspend projects and mint their keys from your own backend. They can never read analytics data.' },
    { title: 'The <yom-report> element', body: 'Drop a report into your product with one HTML element and an embed token; around 9 KB gzipped.' },
    { title: 'MCP server for agents', body: 'Read-only report tools for Claude and other AI agents, authorised by a read-scoped key or an embed token.' },
    { title: 'Warehouse exports', body: 'Hourly files to S3, GCS or R2, or BigQuery, so your data team works from the raw events.' },
  ],
  soon: [],
};

export const metadata = pageMetadata({ title: 'Embedded, multi-tenant analytics for SaaS platforms', description: c.description, path: '/solutions/platforms' });

export default function Page() {
  return <SolutionPage c={c} />;
}

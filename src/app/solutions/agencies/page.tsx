import { pageMetadata } from '@/lib/seo';
import { SolutionPage, type SolutionContent } from '@/components/SolutionPage';
import { FanOut } from '@/components/signature/FanOut';

const c: SolutionContent = {
  slug: 'agencies',
  name: 'Agencies',
  description:
    'Multi-client analytics for agencies: one YOM org, each client a scoped sub-tenant with its own keys and embed tokens, and usage per client for re-billing.',
  eyebrow: 'For agencies',
  title: 'All your clients in one org, each one scoped.',
  lead: 'Stop stitching together separate properties and per-client tools. Each client is a sub-tenant of your org, with keys and tokens that can only see that client.',
  secondary: { href: '/contact', label: 'Talk to us' },
  painsTitle: 'What agencies are working around',
  pains: [
    { stat: '$20', text: 'per client per month is a common price for agency reporting tools (annual billing)', source: 'agencyAnalytics' },
    { stat: 'Quota', text: 'errors when Looker Studio reports pull from the GA4 API', source: 'lookerQuota' },
    { stat: 'Hidden', text: 'GA4 rows withheld under thresholds, which hits small clients hardest', source: 'ga4Thresholds' },
  ],
  showcaseTitle: 'One login for you, with a fence around each client.',
  showcaseLead:
    'Create a sub-tenant per client, bind a key or embed token to it, and that principal is forced to its own data. Ask for another client’s data and the API answers 403.',
  showcase: <FanOut orgLabel="Your agency" />,
  today: [
    { title: 'Sub-tenants', body: 'Open (a new client id becomes a partition on its first event) or registered, inside one project. Free includes 3; pay-as-you-go has no limit.' },
    { title: 'Scoped keys & embed tokens', body: 'Bound to one client; embed tokens also carry report and origin allow-lists.' },
    { title: 'Usage by client', body: 'Event volume per sub-tenant, so you can re-bill at your own margin.' },
    { title: 'White-label webhooks', body: 'Your header prefix and user agent on every signed delivery.' },
    { title: 'Unlimited projects', body: 'On pay-as-you-go, every client can have its own project, with no per-client seat price.' },
    { title: 'Exact client conversions', body: 'Leads and purchases counted exactly, even for low-traffic clients.' },
    { title: 'White-label client portals', body: 'A branded portal per client with read-only logins limited to the reports you pick. On pay-as-you-go the “Powered by” line goes away.' },
  ],
  soon: ['Client portals on your own domain', 'Scheduled weekly or monthly email reports to each client'],
};

export const metadata = pageMetadata({ title: 'Multi-client analytics for agencies', description: c.description, path: '/solutions/agencies' });

export default function Page() {
  return <SolutionPage c={c} />;
}

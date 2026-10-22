import { pageMetadata } from '@/lib/seo';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/ui/JsonLd';
import { LegalDraft } from '@/components/LegalDraft';

const DESCRIPTION = 'Draft terms of service for YOM, pending legal review.';
export const metadata = pageMetadata({ title: 'Terms of service (draft)', description: DESCRIPTION, path: '/terms' });

export default function TermsPage() {
  const { company, contact } = siteConfig;
  return (
    <>
      <JsonLd page={{ path: '/terms', title: 'Terms', description: DESCRIPTION }} />
      <LegalDraft title="Terms" path="/terms" updated="21 October 2026">
        <h2>Agreement</h2>
        <p>
          These terms govern use of YOM (Your Own Metrics), offered in North America by {company.legalName}
          (&ldquo;we&rdquo;). By creating an account you agree to them on behalf of yourself or the organisation you
          represent.
        </p>

        <h2>The service</h2>
        <p>
          YOM collects, processes and reports analytics events you send to it. Features marked &ldquo;Coming
          soon&rdquo; on our website are not part of the service until released. Statistical estimates (such as
          funnels, attribution and unique-visitor counts) are approximations.
        </p>

        <h2>Your responsibilities</h2>
        <ul>
          <li>Keep your credentials and secret keys confidential.</li>
          <li>Have a lawful basis and any required notices or consents for the data you send to YOM.</li>
          <li>Don&rsquo;t send data that your legal obligations require us to be specifically certified or contracted to handle.</li>
          <li>Don&rsquo;t misuse the service, probe other customers&rsquo; data or exceed rate limits deliberately.</li>
        </ul>

        <h2>Plans and fees</h2>
        <p>
          The Free plan includes 100,000 events a month and needs no credit card. Pay-as-you-go is charged on the
          graduated rates published on our <a href="/pricing">pricing page</a>. Fees exclude applicable taxes.
        </p>

        <h2>Your data</h2>
        <p>
          You own the data you send. You can export it as CSV or NDJSON while your account is active. Data is retained
          according to your plan.
        </p>

        <h2>Changes and termination</h2>
        <p>
          You may close your account at any time. We may suspend accounts that breach these terms. We will post material
          changes to these terms here.
        </p>

        <h2>Contact</h2>
        <p>
          <a href={`mailto:${contact.email}`}>{contact.email}</a> · {contact.phone} · {company.hq.city}, {company.hq.region}
        </p>
        <p className="text-muted">
          Sections still to be completed by counsel: warranties, limitation of liability, indemnities, governing law,
          dispute resolution and the data processing terms.
        </p>
      </LegalDraft>
    </>
  );
}

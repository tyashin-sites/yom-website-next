import { pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { LegalPage } from '@/components/LegalPage';
import { legalContact, legalEntities } from '@/config/legal';
import { EntityBlock } from '@/components/LegalEntities';

const TITLE = 'Sub-processors';
const DESCRIPTION =
  'Who processes personal data for YOM: our group companies in India, Estonia and Canada, Cloudflare for hosting, storage and compute, Resend for email, Slack for internal alerts, and the providers we use for payments, sign-in and our website, with 30 days’ notice of changes.';
export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/subprocessors' });

type Row = [name: string, purpose: string, data: string, location: string];

function Table({ rows, caption }: { rows: Row[]; caption: string }) {
  return (
    <div className="table-wrap">
      <table className="data-table stack-table">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Provider</th>
            <th scope="col">What it does for YOM</th>
            <th scope="col">Data involved</th>
            <th scope="col">Location</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([n, p, d, l]) => (
            <tr key={n + p}>
              <th scope="row">{n}</th>
              <td data-label="What it does for YOM">{p}</td>
              <td data-label="Data involved">{d}</td>
              <td data-label="Location">{l}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const { india: IN, estonia: EE, canada: CA } = legalEntities;

const GROUP: Row[] = [
  [
    IN.name,
    `Group company. Engineering, hosting operations, support and billing for YOM. Sub-processor for customers who contract with ${CA.name} or ${EE.name}`,
    'Customer Data and Account Data, as each task needs',
    `India (principal place of business ${IN.principalPlace}; registered office ${IN.address})`,
  ],
  [
    CA.name,
    `Group company. Engineering, hosting operations, support and billing for YOM; collects card payments from customers in the EU and the UK as billing agent for ${EE.name}. Sub-processor for customers who contract with ${IN.name} or ${EE.name}`,
    'Customer Data and Account Data, as each task needs',
    `Canada (${CA.place})`,
  ],
  [
    EE.name,
    `Group company. Contracting party for customers in the European Union and the United Kingdom, and their processor; ${CA.name} and ${IN.name} do the processing for it`,
    'Customer Data and Account Data of customers in the EU and the UK',
    `Estonia (${EE.address.replace(', Estonia', '')}; registry code ${EE.registryCode})`,
  ],
];

const SERVICE: Row[] = [
  [
    'Cloudflare, Inc.',
    'Hosting and compute (Workers, Pages, Durable Objects), databases (D1), object storage (R2), queues, key-value storage, analytics storage, DNS, TLS, custom domains for client portals, and AI inference for optional AI features (Workers AI)',
    'All Customer Data and Account Data',
    'Global network; United States and other countries',
  ],
  [
    'Resend',
    'Transactional email: scheduled reports, alerts, verification, password reset and billing notices',
    'Recipient email addresses and the content of those emails, which for scheduled reports includes report data',
    'United States',
  ],
];

const ACCOUNT: Row[] = [
  ['Stripe, Inc. and affiliates', 'Payment processing and billing (outside India)', 'Billing contact name, email, payment details and invoices', 'United States and other countries'],
  ['Razorpay Software Private Limited', 'Payment processing for customers billed in India', 'Billing contact name, email, payment details and subscriptions', 'India'],
  ['Google LLC', 'Google sign-in, only if you choose it', 'Your Google account email, name and identifier', 'United States and other countries'],
  ['Slack Technologies, LLC', 'Internal operational alerts to our team', 'Error messages and request paths; not intended to contain Customer Data', 'United States'],
];

const WEBSITE: Row[] = [
  ['Cloudflare, Inc.', 'Hosting this website and the Tyashin platform that runs our contact form and serves its scripts', 'Contact-form enquiries; technical request data, including visitors’ IP addresses', 'Global network'],
  ['MongoDB, Inc. (Atlas)', 'Database for the Tyashin platform, which stores contact-form enquiries', 'Name, email, company, message', 'United States or other regions'],
  ['Twilio Inc. (SendGrid) or Resend', 'Emails our team about new enquiries and sends any auto-reply', 'Name, email and message', 'United States'],
];

export default function SubprocessorsPage() {
  const e = legalContact;
  return (
    <>
      <JsonLd page={{ path: '/subprocessors', title: TITLE, description: DESCRIPTION }} />
      <LegalPage
        title={TITLE}
        path="/subprocessors"
        intro={
          <p>
            These are the companies that process personal data for YOM, as described in our{' '}
            <a href="/dpa">Data Processing Addendum</a> and <a href="/privacy">Privacy Policy</a>. Each is bound by
            written data-protection terms.
          </p>
        }
      >
        <h2 id="group">Our group companies</h2>
        <EntityBlock />
        <p>
          The three companies share engineering, hosting and support under a written intra-group agreement.{' '}
          {IN.name} and {CA.name} do the processing: each is the other&rsquo;s sub-processor, and both are
          sub-processors of {EE.name}, which contracts with customers in the European Union and the United Kingdom.
        </p>
        <Table rows={GROUP} caption="Group companies that process data for each other" />

        <h2 id="service">Service sub-processors (Customer Data)</h2>
        <Table rows={SERVICE} caption="Sub-processors that process Customer Data" />

        <h2 id="account">Account, billing and operations</h2>
        <p>These process information about account holders, not our customers&rsquo; analytics data.</p>
        <Table rows={ACCOUNT} caption="Sub-processors for account, billing and operations" />

        <h2 id="website">This website and enquiries</h2>
        <p>
          Our contact form runs on Tyashin, our own website platform. It relies on these providers.
        </p>
        <Table rows={WEBSITE} caption="Providers used by this website and the contact form" />

        <h2 id="not-subprocessors">Destinations you choose are not sub-processors</h2>
        <p>
          When you connect a destination or connector, such as a webhook, Meta, Google Analytics, Google Cloud Storage,
          Amazon S3, BigQuery, Snowflake, Shopify, WooCommerce or Looker Studio, we send data there on your instructions.
          Those services are your own providers, governed by your agreements with them.
        </p>

        <h2 id="changes">Changes and notice</h2>
        <p>
          We will give at least 30 days&rsquo; notice before a new sub-processor starts processing Customer Data, by
          updating this page and its date. To receive these notices by email, write to{' '}
          <a href={`mailto:${e.email}?subject=Sub-processor%20notices`}>{e.email}</a> with the subject &ldquo;Sub-processor
          notices&rdquo;. You may object as section 6 of the <a href="/dpa#subprocessors">DPA</a> describes.
        </p>
      </LegalPage>
    </>
  );
}

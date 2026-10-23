import { pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { LegalPage } from '@/components/LegalPage';
import { legalEntity } from '@/config/legal';

const TITLE = 'Data Processing Addendum';
const DESCRIPTION =
  'The processor terms for YOM: instructions, confidentiality, sub-processors, security measures, breach notice, audits, international transfers (SCCs and UK Addendum) and deletion on termination.';
export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/dpa' });

const TOC = [
  { id: 'scope', label: 'Scope and roles' },
  { id: 'definitions', label: 'Definitions' },
  { id: 'instructions', label: 'Processing on instructions' },
  { id: 'customer-duties', label: 'Customer obligations' },
  { id: 'personnel', label: 'Confidentiality of personnel' },
  { id: 'subprocessors', label: 'Sub-processors' },
  { id: 'security', label: 'Security measures' },
  { id: 'breach', label: 'Personal data breaches' },
  { id: 'assistance', label: 'Assistance and data-subject requests' },
  { id: 'audits', label: 'Audits' },
  { id: 'transfers', label: 'International transfers' },
  { id: 'ccpa', label: 'US state privacy laws' },
  { id: 'deletion', label: 'Return and deletion' },
  { id: 'liability', label: 'Liability and precedence' },
  { id: 'annex-1', label: 'Annex 1: Details of processing' },
];

export default function DpaPage() {
  const e = legalEntity;
  return (
    <>
      <JsonLd page={{ path: '/dpa', title: TITLE, description: DESCRIPTION }} />
      <LegalPage
        title={TITLE}
        path="/dpa"
        toc={TOC}
        intro={
          <p>
            This Data Processing Addendum (&ldquo;DPA&rdquo;) forms part of the <a href="/terms">Terms of Service</a>{' '}
            between {e.name}, operating as {e.operatingAs} (&ldquo;Processor&rdquo;, &ldquo;we&rdquo;), and the customer
            (&ldquo;Customer&rdquo;, &ldquo;you&rdquo;). It applies automatically when you accept the Terms; no separate
            signature is needed. If you need a countersigned copy, email{' '}
            <a href={`mailto:${e.email}?subject=DPA`}>{e.email}</a>.
          </p>
        }
      >
        <h2 id="scope">1. Scope and roles</h2>
        <p>
          This DPA applies when we process Customer Personal Data in providing the Service. For Customer Personal Data,
          you are the controller (or a processor acting for your own client, in which case we are your sub-processor),
          and we are your processor or service provider. Each party will comply with the Data Protection Laws that apply
          to it.
        </p>

        <h2 id="definitions">2. Definitions</h2>
        <ul>
          <li>
            <strong>Data Protection Laws</strong>: all privacy and data-protection laws that apply to the processing,
            which may include PIPEDA and Canadian provincial laws (including Quebec&rsquo;s Law 25), the EU GDPR, the UK
            GDPR and Data Protection Act 2018, the Swiss Federal Act on Data Protection, and US state privacy laws such as
            the CCPA as amended by the CPRA.
          </li>
          <li>
            <strong>Customer Personal Data</strong>: personal data or personal information within Customer Data (as
            defined in the Terms) that we process for you.
          </li>
          <li>
            <strong>Sub-processor</strong>: a third party we engage that processes Customer Personal Data.
          </li>
          <li>
            <strong>Personal Data Breach</strong>: a breach of security leading to the accidental or unlawful
            destruction, loss, alteration, unauthorised disclosure of, or access to, Customer Personal Data in our or our
            Sub-processors&rsquo; systems.
          </li>
          <li>Terms such as controller, processor, data subject and processing have the meanings given in the GDPR, or the nearest equivalent in other Data Protection Laws.</li>
        </ul>

        <h2 id="instructions">3. Processing on instructions</h2>
        <p>
          We process Customer Personal Data only on your documented instructions. Your instructions are: the Terms and
          this DPA; your configuration and use of the Service (including the settings, destinations, exports, portals and
          reports you set up); and other reasonable written instructions consistent with the Terms. If we believe an
          instruction infringes Data Protection Laws we will tell you, and we may decline to follow it. If the law
          requires us to process Customer Personal Data otherwise, we will tell you first unless the law forbids it.
          Annex 1 describes the processing.
        </p>

        <h2 id="customer-duties">4. Customer obligations</h2>
        <p>
          You are responsible for the lawfulness of the Customer Personal Data you send and of your instructions,
          including having a lawful basis, giving notices and obtaining consents for collection and for every
          destination you configure, and for honouring End Users&rsquo; choices. You will not send special categories of
          data or other data prohibited by the <a href="/acceptable-use">Acceptable Use Policy</a>. You will keep your
          credentials secure.
        </p>

        <h2 id="personnel">5. Confidentiality of personnel</h2>
        <p>
          We ensure that people we authorise to process Customer Personal Data are bound by confidentiality obligations
          and access it only as needed to provide, secure and support the Service.
        </p>

        <h2 id="subprocessors">6. Sub-processors</h2>
        <ul>
          <li>
            You give general authorisation for us to engage Sub-processors. Our current Sub-processors are listed on our{' '}
            <a href="/subprocessors">sub-processors page</a>.
          </li>
          <li>
            We will give at least 30 days&rsquo; notice before a new Sub-processor processes Customer Personal Data, by
            updating that page and, if you have asked to receive notices (email {e.email} with the subject
            &ldquo;Sub-processor notices&rdquo;), by email. In an emergency affecting security or continuity of the
            Service we may give shorter notice.
          </li>
          <li>
            You may object on reasonable data-protection grounds within that notice period. We will try in good faith to
            address the objection. If we cannot, you may terminate the affected Service, and we will refund any prepaid
            Fees for the period after termination.
          </li>
          <li>
            We impose data-protection obligations on each Sub-processor that are no less protective in substance than
            this DPA, and we remain responsible for their performance as the law requires.
          </li>
          <li>
            Destinations and connectors you configure (such as webhooks, Meta, Google Analytics, storage buckets, data
            warehouses, Shopify, WooCommerce or Looker Studio) are recipients you choose, not our Sub-processors.
          </li>
        </ul>

        <h2 id="security">7. Security measures</h2>
        <p>
          We implement appropriate technical and organisational measures to protect Customer Personal Data, taking into
          account the nature of the processing and the risks. The measures in place at the date above include:
        </p>
        <ul>
          <li><strong>Encryption in transit:</strong> all public endpoints are served over HTTPS/TLS through Cloudflare.</li>
          <li><strong>Credential protection:</strong> passwords are stored as salted bcrypt hashes; API keys are stored as hashes; secret keys and destination credentials are encrypted at rest with AES-GCM; embed tokens are signed and expire within 24 hours.</li>
          <li><strong>Access control:</strong> role-based access (owner, admin, analyst, viewer), scoped API keys, keys and tokens that can be bound to one project or sub-tenant, origin allow-lists for embeds, and multi-factor authentication available to every user.</li>
          <li><strong>Separation of customers:</strong> each organisation&rsquo;s data is held in its own database or partitioned by organisation and project, and every API request is checked against the caller&rsquo;s organisation and project.</li>
          <li><strong>Data minimisation by default:</strong> no persistent identifiers without consent; query strings stripped and referrers reduced to a host in browser events; personal-looking parameters scrubbed from browser events; IP addresses and raw user agents not stored in event records.</li>
          <li><strong>Integrity of data out:</strong> webhook deliveries are signed with HMAC-SHA256 and carry stable event ids; delivery attempts are logged.</li>
          <li><strong>Abuse protection:</strong> rate limiting on the API and ingest, request-size limits and bot filtering.</li>
          <li><strong>Accountability:</strong> audit records of administrative actions.</li>
          <li><strong>Infrastructure:</strong> physical and environmental security, and resilience of the underlying platform, are provided by Cloudflare.</li>
        </ul>
        <p>
          We may update these measures as long as the overall level of protection is not materially reduced. You are
          responsible for the security of your own systems, credentials and configuration. We do not hold third-party
          security certifications or attestations at the date above.
        </p>

        <h2 id="breach">8. Personal data breaches</h2>
        <p>
          We will notify you without undue delay after becoming aware of a Personal Data Breach. The notice will describe,
          as far as then known, the nature of the breach, the categories and approximate number of data subjects and
          records concerned, the likely consequences, and the measures taken or proposed. We will update you as more
          information becomes available, take reasonable steps to contain and remedy the breach, and give reasonable help
          with your own notification obligations. Our notice is not an admission of fault. Unsuccessful attempts that do
          not compromise security (such as pings, port scans or blocked log-in attempts) are not breaches.
        </p>

        <h2 id="assistance">9. Assistance and data-subject requests</h2>
        <p>
          Taking into account the nature of the processing, we will give you reasonable help to respond to requests from
          data subjects and to carry out data-protection impact assessments and prior consultations, mainly through the
          Service&rsquo;s own controls and documentation. If we receive a request from your End User, we will refer it to
          you and not respond ourselves except to say so, unless the law requires otherwise. Help beyond the Service&rsquo;s
          standard functionality may be charged at reasonable cost.
        </p>

        <h2 id="audits">10. Audits</h2>
        <p>
          On written request, no more than once a year (or after a Personal Data Breach, or where a regulator requires),
          we will give you information reasonably necessary to show compliance with this DPA, such as written answers to a
          security questionnaire, descriptions of our controls, and our Sub-processors&rsquo; available certifications or
          reports. You agree that this documentation satisfies your audit rights, including under the Standard Contractual
          Clauses, unless a regulator requires more. Any on-site or further audit must be agreed in advance, at your cost,
          during business hours, with reasonable notice, by an auditor bound by confidentiality, and without access to
          other customers&rsquo; data.
        </p>

        <h2 id="transfers">11. International transfers</h2>
        <p>
          We are based in Canada and the Service runs on Cloudflare&rsquo;s global network, so Customer Personal Data may
          be processed in Canada, the United States and other countries. We do not commit to storing data in any
          particular country. Where Data Protection Laws restrict a transfer:
        </p>
        <ul>
          <li>
            Transfers from the EEA to us in Canada rely on the European Commission&rsquo;s adequacy decision for Canada to
            the extent it applies. Otherwise, and for onward transfers, the Standard Contractual Clauses adopted by
            Commission Implementing Decision (EU) 2021/914 are incorporated by reference: Module 2 (controller to
            processor) or Module 3 (processor to processor) as applicable; clause 7 (docking) applies; under clause 9
            option 2 (general authorisation) applies with the notice period in section 6; the optional language in clause
            11 does not apply; under clauses 17 and 18 the law and courts of Ireland apply; Annex I is Annex 1 below; Annex
            II is section 7; and Annex III is our sub-processors page.
          </li>
          <li>
            For the UK, the International Data Transfer Addendum to the EU Standard Contractual Clauses issued by the
            Information Commissioner (version B1.0) is incorporated, with its tables completed by this section and Annex 1,
            and either party may end it as allowed by its section 19.
          </li>
          <li>
            For Switzerland, the Standard Contractual Clauses apply with references to the GDPR read as references to the
            Swiss Federal Act on Data Protection, and the Swiss Federal Data Protection and Information Commissioner is
            the competent supervisory authority where applicable.
          </li>
        </ul>
        <p>If these clauses conflict with the rest of this DPA, the clauses prevail.</p>

        <h2 id="ccpa">12. US state privacy laws</h2>
        <p>
          Where the CCPA or similar US state laws apply, we are your service provider or processor. We will not: sell or
          share Customer Personal Data; retain, use or disclose it for any purpose other than the business purposes in the
          Terms, or outside our direct business relationship with you; or combine it with personal information we receive
          from others, except as those laws permit. We will comply with the obligations those laws place on service
          providers, give the same level of privacy protection they require, and tell you if we can no longer meet them.
          You may take reasonable steps to stop and remediate unauthorised use. We certify that we understand these
          restrictions.
        </p>

        <h2 id="deletion">13. Return and deletion</h2>
        <p>
          During the term you can export Customer Data with the Service&rsquo;s tools. After termination of the Service,
          and at your election made in writing within 30 days, we will provide an export of the Customer Personal Data we
          still hold or delete it. In any case we will delete Customer Personal Data within 180 days after termination,
          except where the law requires us to keep it, in which case we will keep it confidential and process it only for
          that purpose. Copies in backups are deleted as the backups expire. On request we will confirm deletion in
          writing.
        </p>

        <h2 id="liability">14. Liability and precedence</h2>
        <p>
          Each party&rsquo;s liability under this DPA is subject to the limitations and exclusions in the Terms, except
          where Data Protection Laws or the Standard Contractual Clauses do not allow it. If this DPA conflicts with the
          Terms on the processing of personal data, this DPA prevails.
        </p>

        <h2 id="annex-1">Annex 1: Details of processing</h2>
        <ul>
          <li><strong>Parties:</strong> data exporter: the Customer (controller or processor); data importer: {e.name}, {e.place}, {e.email} (processor).</li>
          <li><strong>Subject matter and duration:</strong> provision of the Service under the Terms, for the term of the Terms and until deletion under section 13.</li>
          <li><strong>Nature and purpose:</strong> collecting, receiving, enriching (device, browser, operating system and approximate location), storing, aggregating, analysing, reporting, exporting and forwarding analytics events as configured by the Customer; providing reports, portals, embeds, email reports and API and MCP access; security and support.</li>
          <li><strong>Data subjects:</strong> visitors and users of the Customer&rsquo;s websites, apps and stores (End Users), and the Customer&rsquo;s clients and their users where the Customer serves clients.</li>
          <li><strong>Categories of data:</strong> pseudonymous identifiers (visitor, session and, if the Customer sends one, user id) where consent allows; event names, parameters, page paths, referring hosts and campaign tags; device, browser and operating system; approximate location; consent state and privacy signals; transaction details such as order ids and values; any other data the Customer chooses to send in events, including from its servers.</li>
          <li><strong>Special categories:</strong> none. The Customer must not send them (see the Acceptable Use Policy).</li>
          <li><strong>Frequency:</strong> continuous.</li>
          <li><strong>Retention:</strong> as set by the Customer&rsquo;s plan and settings during the term; deletion under section 13.</li>
          <li><strong>Sub-processors:</strong> as listed on the <a href="/subprocessors">sub-processors page</a>.</li>
          <li><strong>Competent supervisory authority:</strong> as determined under clause 13 of the Standard Contractual Clauses.</li>
        </ul>
      </LegalPage>
    </>
  );
}

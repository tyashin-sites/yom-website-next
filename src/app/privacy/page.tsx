import { pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { LegalPage } from '@/components/LegalPage';
import { legalEntities, legalOfficer } from '@/config/legal';
import { EntityBlock, OfficerBlock } from '@/components/LegalEntities';

const TITLE = 'Privacy Policy';
const DESCRIPTION =
  'How Aapastech Private Limited (India) and 14818032 Canada Inc. (everywhere else) handle personal information for YOM: as data fiduciary or controller for visitors and account holders, and as processor for the analytics data customers send.';
export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/privacy' });

const TOC = [
  { id: 'who', label: 'Who we are' },
  { id: 'roles', label: 'Our two roles' },
  { id: 'visitors', label: 'Website visitors and enquiries' },
  { id: 'account-holders', label: 'Account holders' },
  { id: 'processor', label: 'Analytics data we process for customers' },
  { id: 'purposes', label: 'Purposes and legal bases' },
  { id: 'sharing', label: 'Who we share it with' },
  { id: 'transfers', label: 'Where data is processed' },
  { id: 'retention', label: 'How long we keep it' },
  { id: 'security', label: 'Security' },
  { id: 'rights', label: 'Your rights' },
  { id: 'india', label: 'India: the Digital Personal Data Protection Act, 2023' },
  { id: 'canada', label: 'Canada: PIPEDA and Quebec Law 25' },
  { id: 'us', label: 'United States: CCPA/CPRA and other state laws' },
  { id: 'eu-uk', label: 'EEA, UK and Switzerland' },
  { id: 'children', label: 'Children' },
  { id: 'changes', label: 'Changes' },
  { id: 'contact', label: 'Contact and complaints' },
];

export default function PrivacyPage() {
  const o = legalOfficer;
  const mail = <a href={`mailto:${o.email}?subject=Privacy`}>{o.email}</a>;
  return (
    <>
      <JsonLd page={{ path: '/privacy', title: TITLE, description: DESCRIPTION }} />
      <LegalPage
        title={TITLE}
        path="/privacy"
        toc={TOC}
        intro={
          <p>
            This policy explains what personal information we collect, why, who we share it with, and the choices and
            rights you have. It applies to this website, to the YOM (Your Own Metrics) service, and to our dealings with
            customers and prospects.
          </p>
        }
      >
        <h2 id="who">1. Who we are</h2>
        <EntityBlock />
        <OfficerBlock />

        <h2 id="roles">2. Our two roles</h2>
        <ul>
          <li>
            <strong>As a controller</strong> (the organisation that decides why and how information is used) for
            information about visitors to this website, people who contact us, and the people who hold or use YOM
            accounts. In India we are the data fiduciary for this information. Sections 3, 4 and 6 to 18 describe this.
          </li>
          <li>
            <strong>As a processor or service provider</strong> for the analytics data our customers collect about
            visitors to their own websites and apps (&ldquo;End Users&rdquo;) and send to YOM. The customer decides what
            is collected and why, and we process it only on the customer&rsquo;s instructions under our{' '}
            <a href="/dpa">Data Processing Addendum</a>. Section 5 describes this. If you are an End User of one of our
            customers, please read that customer&rsquo;s privacy notice and send requests to them; if you contact us, we
            will pass your request to the customer where we can identify them.
          </li>
        </ul>

        <h2 id="visitors">3. Website visitors and enquiries</h2>
        <ul>
          <li>
            <strong>Contact form and emails.</strong> When you use our contact form or write to us, we collect your name,
            email, company (optional), the topic, your approximate event volume (optional), your message, the page you
            sent it from and the time. The form is handled by Tyashin, our own website platform, which stores the enquiry
            and notifies our team by email.
          </li>
          <li>
            <strong>Technical information.</strong> As with any website, our hosting provider processes your IP address,
            browser user agent and request details to deliver pages, protect against abuse and keep short-lived logs.
          </li>
          <li>
            <strong>Cookies.</strong> This website sets no cookies of its own and loads no analytics or advertising
            tags. Our hosts add only strictly necessary items (a Cloudflare security cookie, and session-storage keys
            used for error reporting). See the <a href="/cookies">Cookie Policy</a>. If we add analytics later, we
            will use YOM in its default cookieless mode and update that policy first.
          </li>
        </ul>

        <h2 id="account-holders">4. Account holders</h2>
        <ul>
          <li>
            <strong>Identity and sign-in:</strong> name, email address, a password stored only as a salted hash, whether
            your email is verified, multi-factor authentication settings and recovery codes (stored hashed), and your
            Google account identifier if you sign in with Google.
          </li>
          <li>
            <strong>Organisation:</strong> organisation name, plan, currency, the country inferred from your IP address at
            sign-up (used for currency, tax and payment-provider selection), your role, and team members you invite.
          </li>
          <li>
            <strong>Billing:</strong> billing contact details, invoices, tax information and payment-provider references.
            Card and bank details are collected by our payment providers, not by us.
          </li>
          <li>
            <strong>Usage and security records:</strong> when you last signed in, audit records of administrative actions
            (who did what, when, and from which IP address), API usage and error logs, and messages you send to support.
          </li>
          <li>
            <strong>Recipients you add:</strong> email addresses you enter for scheduled reports, alerts and client-portal
            logins. Please only add people who expect to receive them.
          </li>
        </ul>

        <h2 id="processor">5. Analytics data we process for customers</h2>
        <p>
          What reaches YOM depends on how each customer configures it. With the current YOM browser SDK and ingest API,
          by default:
        </p>
        <ul>
          <li>
            <strong>No cookies, and no persistent identifier without consent.</strong> Until an End User grants analytics
            consent, the SDK keeps no persistent id and writes nothing to the browser, and our servers clear any visitor
            or user id the browser sends. Do Not Track and Global Privacy Control are treated as a refusal by default.
          </li>
          <li>
            <strong>With consent</strong>, the SDK keeps a random visitor id, a 30-minute session and the consent choice
            in the browser&rsquo;s local storage (see the <a href="/cookies">Cookie Policy</a>). A customer can also
            attach their own user id. If a customer turns on the optional cross-site identity feature, the SDK also
            stores a hash of browser characteristics, for consented End Users only, to recognise the same browser across
            that customer&rsquo;s sites.
          </li>
          <li>
            <strong>Event content:</strong> the event name and parameters, the page path (query strings and fragments are
            removed in the browser), the referring site&rsquo;s host, campaign tags, whether an ad click id was present,
            device type, browser and operating system (derived from the user agent, which is then discarded), and
            approximate location (country, region and city derived from the IP address by our hosting provider).
          </li>
          <li>
            <strong>IP addresses</strong> are not stored in event records. They are used in transit to derive approximate
            location, to protect the service, and, where a customer turns on the optional cookieless visitor hash or uses
            our legacy v1 endpoints, to compute a daily-rotating hashed identifier.
          </li>
          <li>
            <strong>Scrubbing:</strong> parameters that look like emails, phone numbers, names, addresses or card numbers
            are removed from browser events. Events a customer sends from its own servers are not scrubbed; the customer
            controls their content.
          </li>
          <li>
            <strong>Forwarding:</strong> a customer can forward events to its own destinations, such as webhooks, Meta,
            Google Analytics, cloud storage or a data warehouse. Forwarding to advertising platforms happens only with the
            End User&rsquo;s explicit marketing consent and no Global Privacy Control signal. In that case, the SDK may
            read (never set) Meta&rsquo;s own browser cookies and the Meta click id so Meta can match the conversion.
          </li>
        </ul>
        <p id="intent">
          If a customer turns on YOM Intent, we also build interest profiles for that customer, from its own sites only,
          and send scrambled email addresses or phone numbers to the customer&rsquo;s own ad accounts on its
          instructions. We never combine one customer&rsquo;s profiles with another&rsquo;s. YOM Intent is off unless a
          customer turns it on, and the <a href="/intent-addendum">YOM Intent Addendum</a> sets its rules: a profile is
          built only with the End User&rsquo;s consent to personalisation, an audience export includes only people who
          consented to advertising, and anyone with a Global Privacy Control signal, opt-out or withdrawal on record on
          any linked device is left out. Profiles are deleted after 180 days without activity by default, and never later
          than 13 months or the customer&rsquo;s own retention period. Consent receipts (a record of what a person agreed
          to, with no event data) are kept for 3 years after the profile they belong to is deleted, so the customer can
          show what consent it had. YOM Intent is not available for End Users in the European Economic Area, the United
          Kingdom or Quebec.
        </p>
        <p>
          We use Customer Data only to provide, secure and support the service for that customer, as the DPA sets out,
          and to make aggregated statistics that identify no one, as section 6 of our <a href="/terms#aggregated-data">Terms</a>{' '}
          allows. We do not sell it, use it for our own advertising, or combine it across customers to profile End Users.
          Optional AI features for customers who enable them run on our hosting provider&rsquo;s AI service using that
          customer&rsquo;s aggregated report data; we do not send Customer Data to other AI model providers.
        </p>

        <h2 id="purposes">6. Purposes and legal bases</h2>
        <p>We use the information in sections 3 and 4 to:</p>
        <ul>
          <li>provide, secure and support the website and the service, and authenticate users (performance of a contract; legitimate interests);</li>
          <li>reply to enquiries and follow up on demos you request (your request; legitimate interests in growing our business);</li>
          <li>bill, collect payment, keep accounting and tax records (performance of a contract; legal obligation);</li>
          <li>send service messages such as verification, password reset, security, billing and policy notices (performance of a contract; legitimate interests);</li>
          <li>detect and prevent fraud, abuse and security incidents, and enforce our terms (legitimate interests; legal obligation);</li>
          <li>improve the service using aggregated or de-identified information (legitimate interests);</li>
          <li>comply with law and respond to lawful requests (legal obligation).</li>
        </ul>
        <p>
          We send marketing email only where the law allows, including Canada&rsquo;s anti-spam legislation, and every
          message lets you unsubscribe. We do not sell personal information or share it for cross-context behavioural
          advertising, and we do not make decisions about you based solely on automated processing that produce legal or
          similarly significant effects.
        </p>

        <h2 id="sharing">7. Who we share it with</h2>
        <ul>
          <li>
            <strong>Service providers</strong> that host and run our systems, send our email and process payments, under
            contracts that limit their use of the information. They are listed on our{' '}
            <a href="/subprocessors">sub-processors page</a>.
          </li>
          <li>
            <strong>Destinations a customer configures</strong>, which receive that customer&rsquo;s data on its
            instructions.
          </li>
          <li>
            <strong>Your organisation and its clients.</strong> Account owners and admins can see their team&rsquo;s
            activity; people you give portal or report access can see those reports.
          </li>
          <li>
            <strong>Advisers and authorities</strong>, where needed to comply with law, a court order or a binding
            request, or to protect rights, safety and property.
          </li>
          <li>
            <strong>A buyer or successor</strong> in a merger, acquisition, financing or sale of assets, subject to this
            policy.
          </li>
        </ul>

        <h2 id="transfers">8. Where data is processed</h2>
        <p>
          Our two companies are based in India and Canada, and each can access personal information to run YOM for the
          other. Our service runs on Cloudflare&rsquo;s global network, so personal information may be processed and
          stored in India, Canada, the United States and other countries where our providers or their data centres
          operate. We do not currently offer a choice of data location or promise that data stays in any country. Data
          processed outside your province or country may be accessible to courts and authorities there. Where the law
          requires a transfer mechanism, such as for data from the EEA, UK or Switzerland, we rely on the European
          Commission&rsquo;s adequacy decision for Canada (for commercial organisations subject to PIPEDA), the Standard
          Contractual Clauses and the UK Addendum, or other lawful mechanisms, as the <a href="/dpa">DPA</a> describes.
          Transfers out of India are covered in <a href="#india">section 12</a>.
        </p>

        <h2 id="retention">9. How long we keep it</h2>
        <ul>
          <li>Enquiries and sales correspondence: up to 24 months after our last exchange, unless you become a customer.</li>
          <li>Account information: while the account is open, then up to 24 months after closure to handle disputes and security matters, unless you ask us to delete it sooner and no exception applies.</li>
          <li>Billing and tax records (invoices, payments and subscription records): kept for 8 years after the account is closed, to meet Canadian and Indian tax and accounting law, then deleted automatically.</li>
          <li>Audit and security records: as long as needed for security and accountability, normally no more than 24 months.</li>
          <li>Short-lived operational logs kept by our hosting provider: days to weeks.</li>
          <li>
            Customer Data: according to the customer&rsquo;s plan and settings while the account is active, and deleted
            after termination as the DPA describes. Copies in backups expire on their own cycle.
          </li>
        </ul>
        <p>
          We may keep information longer where the law requires it or to establish or defend legal claims. If you are in
          India, <a href="#india">section 12</a> explains the sealed copy Indian law requires us to keep after deletion.
        </p>

        <h2 id="security">10. Security</h2>
        <p>
          We use technical and organisational safeguards appropriate to the sensitivity of the information, including
          encryption in transit, hashing of passwords and API keys, encryption of stored destination credentials and
          secret keys, role-based access, multi-factor authentication available to every account, and isolation of each
          customer&rsquo;s data. A summary is in the <a href="/dpa#security">DPA</a> and on our{' '}
          <a href="/security">security page</a>. No system is perfectly secure; if a breach of security safeguards creates
          a real risk of significant harm, we will notify affected people and regulators as the law requires.
        </p>

        <h2 id="rights">11. Your rights</h2>
        <p>
          Depending on where you live, you may have the right to: know what personal information we hold about you and
          get a copy; correct it; have it deleted; receive it in a portable format; withdraw consent; object to or restrict
          certain processing; and not be discriminated against for exercising these rights. To make a request, email{' '}
          {mail}. We will verify your identity before acting, may ask for more information to do so, and will reply
          within the time the law allows (generally 30 days). An authorised agent may make a request for you with proof of
          authority. If we refuse a request, we will explain why and how to complain.
        </p>
        <p>
          For data we process for a customer (section 5), please contact that customer. If you contact us, we will refer
          the request to the customer and help it respond.
        </p>

        <h2 id="india">12. India: the Digital Personal Data Protection Act, 2023</h2>
        <p>
          If you are in India, {legalEntities.india.name} is the data fiduciary for the personal data in sections 3 and 4,
          and this section applies to you as well as the rest of this policy.
        </p>
        <p>
          <strong>Your rights.</strong> You can ask us for a summary of the personal data we hold about you and what we
          do with it, ask us to correct, complete, update or delete it, withdraw any consent you gave (as easily as you
          gave it), and nominate someone to act for you if you die or become unable to act. Email {mail}. We answer
          within one month, and never later than the law allows. We may ask you to confirm your identity, but only with
          information we already hold.
        </p>
        <p>
          <strong>How long we keep data.</strong> We keep personal data while your account is active and as long as we
          need it for the purpose you gave it for, then delete it. Some records stay longer because the law requires it:
          invoices and tax records for 8 years, and security logs for at least 180 days. Indian law also requires us to
          keep personal data, related traffic data and processing logs for one year from processing; when we delete your
          data from our systems we keep a sealed copy for the rest of that year, which nobody uses except to meet that
          legal duty, and then destroy it.
        </p>
        <p>
          <strong>Where data goes.</strong> We use service providers in other countries, listed on our{' '}
          <a href="/subprocessors">sub-processors list</a>. Transfers out of India follow section 16 of the Digital
          Personal Data Protection Act, 2023; we will not transfer data to any country the Government of India restricts.
        </p>
        <p>
          <strong>Security.</strong> We keep a documented information security programme: encryption in transit, access
          limited to staff who need it, logging, and incident response. If a breach affects your personal data we will
          tell you and the authorities as the law requires.
        </p>
        <p>
          <strong>Complaints.</strong> Contact our Grievance Officer (see <a href="/grievance">/grievance</a>). If you are
          not satisfied, you can complain to the Data Protection Board of India once the relevant provisions apply.
        </p>

        <h2 id="canada">13. Canada: PIPEDA and Quebec Law 25</h2>
        <p>
          We handle personal information in line with the Personal Information Protection and Electronic Documents Act
          and applicable provincial laws, including Quebec&rsquo;s Act respecting the protection of personal information in
          the private sector as amended by Law 25. {o.name}, our Privacy Officer, is the person in charge of the
          protection of personal information ({mail}, {o.phoneCanada}). Quebec residents may request access, rectification, de-indexing where applicable, and
          information about the communication of their information outside Quebec, and may withdraw consent. We assess
          the privacy risks of communicating personal information outside Quebec before doing so. You may complain to the
          Office of the Privacy Commissioner of Canada or, in Quebec, the Commission d&rsquo;accès à l&rsquo;information.
        </p>

        <h2 id="us">14. United States: CCPA/CPRA and other state laws</h2>
        <p>
          For data we process for customers, we act as a &ldquo;service provider&rdquo; or &ldquo;processor&rdquo;: we
          process it only for the business purposes in our contract, and we do not sell or share it (as those terms are
          defined in the California Consumer Privacy Act as amended by the CPRA), retain, use or disclose it outside the
          direct business relationship, or combine it with personal information from other sources except as the law
          permits. The one exception is a YOM Intent audience export: there the customer makes personal information
          available to us so we can send it to the customer&rsquo;s own ad accounts, we act as a &ldquo;third
          party&rdquo;, and the <a href="/intent-addendum">YOM Intent Addendum</a> holds the contract terms the CCPA
          regulations require.
        </p>
        <p>
          For our own data, in the last 12 months we have collected the categories described in sections 3 and 4:
          identifiers (name, email, IP address), commercial information (plans and invoices), internet activity (website
          and service usage), approximate geolocation, and professional information (company and role). We collect them
          from you, your organisation, your devices and our service providers, for the purposes in section 6, and
          disclose them to the recipients in section 7. We do not sell or share personal information, have no actual
          knowledge of selling or sharing information of anyone under 16, and do not use sensitive personal information
          to infer characteristics. Residents of California and other states with similar laws may exercise the rights in
          section 11.
        </p>

        <h2 id="eu-uk">15. EEA, UK and Switzerland</h2>
        <p>
          Where the GDPR, UK GDPR or Swiss law applies to our processing as a controller, our legal bases are those in
          section 6, and you may also lodge a complaint with your local supervisory authority. Where you rely on
          legitimate interests, you may object to that processing. For Customer Data, the customer is the controller and
          our processor terms are in the <a href="/dpa">DPA</a>. We have not appointed a representative in the EU or UK;
          contact us at {mail}.
        </p>

        <h2 id="children">16. Children</h2>
        <p>
          Our website and service are for businesses and are not directed to children. We do not knowingly collect
          personal information from children under 16. Our customers must not use YOM on services directed to children
          or send us children&rsquo;s information (see the <a href="/acceptable-use">Acceptable Use Policy</a>). If you
          believe a child has given us personal information, contact us and we will delete it.
        </p>

        <h2 id="changes">17. Changes</h2>
        <p>
          We will post changes here and update the date above. If a change is material, we will tell account owners by
          email or in the product before it takes effect.
        </p>

        <h2 id="contact">18. Contact and complaints</h2>
        <p>
          {o.name}, Grievance Officer (India) and Privacy Officer (Canada). In India: {legalEntities.india.name},{' '}
          {legalEntities.india.address}, {legalEntities.india.country}, {o.phoneIndia}. Everywhere else:{' '}
          {legalEntities.canada.name}, {legalEntities.canada.address}, {o.phoneCanada}. Email {mail}. Please contact us
          first so we can try to resolve your concern; the <a href="/grievance">Grievance Officer</a> page explains how we
          handle complaints and how quickly. You keep the right to complain to the regulators named above.
        </p>
      </LegalPage>
    </>
  );
}

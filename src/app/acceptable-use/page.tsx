import { pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { LegalPage } from '@/components/LegalPage';
import { legalEntity } from '@/config/legal';

const TITLE = 'Acceptable Use Policy';
const DESCRIPTION =
  'What you may and may not do with YOM. Sensitive or health data needs an agreement signed by both parties, tracking needs a lawful basis, and illegal content and abuse of the service are prohibited.';
export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/acceptable-use' });

const TOC = [
  { id: 'scope', label: 'Scope' },
  { id: 'lawful-tracking', label: 'Lawful tracking only' },
  { id: 'sensitive-data', label: 'Sensitive data' },
  { id: 'prohibited-content', label: 'Prohibited content and purposes' },
  { id: 'service-abuse', label: 'Abuse of the service' },
  { id: 'limits', label: 'Rate limits and fair use' },
  { id: 'enforcement', label: 'Enforcement' },
  { id: 'reporting', label: 'Reporting misuse' },
];

export default function AcceptableUsePage() {
  return (
    <>
      <JsonLd page={{ path: '/acceptable-use', title: TITLE, description: DESCRIPTION }} />
      <LegalPage
        title={TITLE}
        path="/acceptable-use"
        toc={TOC}
        intro={
          <p>
            This policy is part of the <a href="/terms">Terms of Service</a> between you and {legalEntity.name}, operating
            as {legalEntity.operatingAs} (&ldquo;we&rdquo;, &ldquo;us&rdquo;). It applies to every account, project,
            key, token, portal and integration of YOM (Your Own Metrics). Capitalised words have the meaning given in the
            Terms.
          </p>
        }
      >
        <h2 id="scope">1. Scope</h2>
        <p>
          You are responsible for everyone who uses the Service through your account or keys, including your team, your
          clients and sub-tenants, people who log in to a client portal you create, and any agent or software acting with
          your credentials.
        </p>

        <h2 id="lawful-tracking">2. Lawful tracking only</h2>
        <p>You may use YOM to collect or process information about a person only if you:</p>
        <ul>
          <li>have a lawful basis or valid consent for that collection under the laws that apply to you and to them;</li>
          <li>
            give the notices those laws require, including a privacy notice that discloses your use of analytics and of
            any destination you forward data to; and
          </li>
          <li>honour opt-outs and consent choices.</li>
        </ul>
        <p>You must not:</p>
        <ul>
          <li>
            configure YOM, or alter its SDK or requests, to defeat a visitor&rsquo;s consent choice, Global Privacy
            Control signal or Do Not Track setting where the law requires you to honour it; or
          </li>
          <li>
            use YOM to identify, re-identify or fingerprint individuals who have not consented, or combine YOM data with
            other data to do so.
          </li>
        </ul>

        <h2 id="sensitive-data">3. Sensitive data</h2>
        <p>Unless we have agreed otherwise in a document signed by both parties, you must not send YOM:</p>
        <ul>
          <li>
            health information, including protected health information under HIPAA, or events from pages that reveal a
            person&rsquo;s health condition, treatment or appointment;
          </li>
          <li>
            special categories of personal data or sensitive personal information under any applicable law, such as
            racial or ethnic origin, political opinions, religious beliefs, union membership, genetic or biometric data,
            sex life or sexual orientation, precise geolocation, or immigration status;
          </li>
          <li>
            government identification numbers, financial account or payment card numbers, passwords or security
            credentials;
          </li>
          <li>personal information of children under 13, or under 16 where a higher age applies, or from services directed at children;</li>
          <li>any data whose processing would require us to hold a certification, licence or agreement we do not hold.</li>
        </ul>
        <p>
          YOM scrubs some personal-looking parameters from browser events as a safeguard. That safeguard does not make it
          acceptable to send the data above, and it does not apply to server events you send.
        </p>

        <h2 id="prohibited-content">4. Prohibited content and purposes</h2>
        <p>You must not use YOM, including portals, embeds and email reports, to:</p>
        <ul>
          <li>break any law or regulation, or help anyone else do so;</li>
          <li>measure, promote or support illegal goods or services, fraud, phishing, malware or scams;</li>
          <li>host, send or link to content that is unlawful, infringing, defamatory, harassing, hateful, or sexually exploits minors;</li>
          <li>send spam, or send email reports to people who have not asked for them;</li>
          <li>infringe anyone&rsquo;s intellectual property or privacy rights;</li>
          <li>conduct surveillance of individuals, or track employees or other people in breach of applicable law;</li>
          <li>make decisions with legal or similarly significant effects on individuals (such as credit, housing, employment or insurance eligibility) based on YOM data;</li>
          <li>build or benchmark a competing product, except for ordinary evaluation.</li>
        </ul>

        <h2 id="service-abuse">5. Abuse of the service</h2>
        <p>You must not:</p>
        <ul>
          <li>access or try to access another customer&rsquo;s data, account, project or sub-tenant, or circumvent key scopes, sub-tenant bindings, origin allow-lists or embed-token limits;</li>
          <li>probe, scan or test the vulnerability of the Service except as allowed by our <a href="/security/disclosure">security disclosure policy</a>;</li>
          <li>interfere with or disrupt the Service, including denial-of-service attacks, flooding ingest endpoints, or sending deliberately malformed or excessive events;</li>
          <li>use the Service to send traffic to, or attack, a third party, including through webhook or warehouse destinations;</li>
          <li>reverse engineer the Service, except to the extent the law allows despite this restriction;</li>
          <li>share, publish or embed secret keys or management keys in client-side code, or resell access to the Service except as part of your own product or client service under the Terms;</li>
          <li>create accounts by automated means or to evade a suspension or plan limit.</li>
        </ul>

        <h2 id="limits">6. Rate limits and fair use</h2>
        <p>
          The Service enforces rate limits, request-size limits, plan quotas and per-project caps (for example on events,
          destinations, portals, exports and scheduled reports). Published limits may change as the Service evolves. You
          must not work around a limit, for example by splitting one workload across many free accounts. If your use
          puts the stability of the Service at risk, we may throttle or queue it while we talk to you.
        </p>

        <h2 id="enforcement">7. Enforcement</h2>
        <p>
          If we reasonably believe you or your users have breached this policy, we may remove content, disable keys,
          tokens, portals or destinations, stop processing specific data, suspend the account, or terminate under the{' '}
          <a href="/terms#suspension">Terms</a>. Where practical and lawful we will tell you first and give you a chance to
          fix the problem. We may act without notice where needed to prevent harm, to comply with law, or to protect the
          Service or other customers. We may report unlawful activity to the authorities.
        </p>

        <h2 id="reporting">8. Reporting misuse</h2>
        <p>
          Report suspected misuse of YOM to <a href={`mailto:${legalEntity.email}`}>{legalEntity.email}</a>. Report security
          vulnerabilities as described in our <a href="/security/disclosure">security disclosure policy</a>.
        </p>
      </LegalPage>
    </>
  );
}

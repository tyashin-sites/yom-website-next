import { pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { LegalPage } from '@/components/LegalPage';
import { legalContact } from '@/config/legal';

const TITLE = 'Vulnerability disclosure policy';
const DESCRIPTION =
  'How to report a security vulnerability in YOM to contact@aapastech.com, what is in scope, and our safe-harbour commitment for good-faith research.';
export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/security/disclosure' });

const TOC = [
  { id: 'report', label: 'How to report' },
  { id: 'scope', label: 'Scope' },
  { id: 'rules', label: 'Rules of engagement' },
  { id: 'safe-harbour', label: 'Safe harbour' },
  { id: 'our-commitments', label: 'What we commit to' },
];

export default function DisclosurePage() {
  const e = legalContact;
  const mail = <a href={`mailto:${e.email}?subject=Security%20report`}>{e.email}</a>;
  return (
    <>
      <JsonLd page={{ path: '/security/disclosure', title: TITLE, description: DESCRIPTION }} />
      <LegalPage
        title={TITLE}
        path="/security/disclosure"
        trail={[
          { name: 'Security', path: '/security' },
          { name: TITLE, path: '/security/disclosure' },
        ]}
        toc={TOC}
        intro={
          <p>
            We welcome reports from security researchers. If you believe you have found a vulnerability in YOM, please
            tell us privately so we can fix it before it is exploited. This policy is also published in machine-readable
            form at <a href="/.well-known/security.txt">/.well-known/security.txt</a>.
          </p>
        }
      >
        <h2 id="report">1. How to report</h2>
        <p>
          Email {mail} with &ldquo;Security report&rdquo; in the subject. Please include the affected URL or component, a
          description of the issue and its impact, steps to reproduce, and any proof-of-concept. Use test accounts you
          created yourself. If the report contains sensitive detail, say so and we will arrange a secure channel.
        </p>

        <h2 id="scope">2. Scope</h2>
        <p>In scope:</p>
        <ul>
          <li>yom.aapastech.com (this website and the YOM dashboard)</li>
          <li>*.yourownmetrics.aapastech.com (API, ingest, MCP and connector endpoints)</li>
          <li>The YOM SDK (<code className="font-mono">@yourownmetric/sdk</code>) and embed component (<code className="font-mono">@yourownmetric/embed</code>)</li>
        </ul>
        <p>Out of scope:</p>
        <ul>
          <li>Other customers&rsquo; accounts, data, portals or custom domains.</li>
          <li>Denial-of-service, load or stress testing, and volumetric attacks.</li>
          <li>Social engineering, phishing, or physical attacks against our staff or providers.</li>
          <li>The infrastructure of our providers (report those to the provider).</li>
          <li>Findings without a demonstrated security impact, such as missing headers on static pages, clickjacking on pages with no sensitive actions, self-XSS, rate-limit observations without abuse impact, or reports from automated scanners alone.</li>
        </ul>

        <h2 id="rules">3. Rules of engagement</h2>
        <ul>
          <li>Only test against accounts and data you own. Stop and tell us as soon as you reach data that isn&rsquo;t yours, and do not keep, copy or share it.</li>
          <li>Do not degrade the service or disrupt other users. Keep automated testing to a gentle rate.</li>
          <li>Do not use a vulnerability beyond what is needed to show it exists.</li>
          <li>Give us a reasonable time to fix the issue (normally 90 days) before any public disclosure, and coordinate the disclosure with us.</li>
          <li>Comply with all applicable laws.</li>
        </ul>

        <h2 id="safe-harbour">4. Safe harbour</h2>
        <p>
          If you make a good-faith effort to follow this policy, we will consider your research authorised, will not
          pursue or support legal action against you for it, and will work with you to understand and resolve the issue.
          If a third party takes legal action against you for research that followed this policy, we will make it known
          that your actions were authorised. This safe harbour does not cover activity that breaks the rules above or the
          law.
        </p>

        <h2 id="our-commitments">5. What we commit to</h2>
        <ul>
          <li>Acknowledge your report within 5 business days.</li>
          <li>Keep you informed while we investigate and fix it.</li>
          <li>Credit you publicly when the fix ships, if you want to be credited.</li>
        </ul>
        <p>We do not run a paid bug-bounty programme at this time.</p>
      </LegalPage>
    </>
  );
}

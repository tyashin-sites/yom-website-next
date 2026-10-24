import { pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { LegalPage } from '@/components/LegalPage';
import { legalEntity } from '@/config/legal';

const TITLE = 'Cookie Policy';
const DESCRIPTION =
  'What this website, the YOM dashboard and the YOM SDK store in your browser. The site sets no tracking cookies (only our host’s strictly necessary security cookie), and the SDK is cookieless by default and uses local storage only after analytics consent.';
export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/cookies' });

const TOC = [
  { id: 'website', label: 'This website' },
  { id: 'dashboard', label: 'The YOM dashboard' },
  { id: 'sdk', label: 'The YOM SDK on our customers’ sites' },
  { id: 'third-party', label: 'Third-party cookies' },
  { id: 'choices', label: 'Your choices' },
];

type Row = [name: string, kind: string, when: string, purpose: string, lasts: string];

function StorageTable({ rows, caption }: { rows: Row[]; caption: string }) {
  return (
    <div className="table-wrap">
      <table className="data-table stack-table">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Set when</th>
            <th scope="col">Purpose</th>
            <th scope="col">Lasts</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([n, k, w, p, l]) => (
            <tr key={n}>
              <th scope="row" className="font-mono text-[0.84rem] font-normal">
                {n}
              </th>
              <td data-label="Type">{k}</td>
              <td data-label="Set when">{w}</td>
              <td data-label="Purpose">{p}</td>
              <td data-label="Lasts">{l}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const DASHBOARD: Row[] = [
  ['yom_token', 'Local storage', 'You sign in', 'Keeps you signed in (session token)', 'Until you sign out; the token expires after 24 hours'],
  ['yom_user', 'Local storage', 'You sign in', 'Your name and email for the interface', 'Until you sign out'],
  ['yom_tenant', 'Local storage', 'You sign in', 'Which organisation you are working in', 'Until you sign out'],
  ['yom_selected_project', 'Local storage', 'You pick a project', 'Remembers the selected project', 'Until cleared'],
];

const SDK: Row[] = [
  ['yom_visitor', 'Local storage', 'Only after the visitor grants analytics consent', 'Random visitor id, so returning visits are recognised', 'Until consent is withdrawn or storage is cleared'],
  ['yom_session', 'Local storage', 'Only after analytics consent', 'Session id, last activity time and the landing referrer and campaign', '30 minutes of inactivity; removed when consent is withdrawn'],
  ['yom_consent', 'Local storage', 'Only when the visitor grants consent (and the site allows remembering it)', 'Remembers the consent choice', 'Until consent is withdrawn or storage is cleared'],
  ['yom_fp', 'Local storage', 'Only after analytics consent, and only if the site owner turns on cross-site identity (off by default)', 'Hash of browser characteristics to recognise the same browser across that owner’s sites', 'Until storage is cleared'],
];

export default function CookiesPage() {
  const e = legalEntity;
  return (
    <>
      <JsonLd page={{ path: '/cookies', title: TITLE, description: DESCRIPTION }} />
      <LegalPage
        title={TITLE}
        path="/cookies"
        toc={TOC}
        intro={
          <p>
            Cookies and similar technologies (such as local storage) store information in your browser. This policy
            lists exactly what we use. It supplements our <a href="/privacy">Privacy Policy</a>.
          </p>
        }
      >
        <h2 id="website">1. This website</h2>
        <p>
          This marketing website&rsquo;s own code sets <strong>no cookies</strong>, stores nothing in your browser, and
          loads no analytics, advertising or social-media tags. Our hosting providers add only what is strictly
          necessary to run the site:
        </p>
        <ul>
          <li>
            Cloudflare may set a security cookie (such as <code className="font-mono">__cf_bm</code>) when it needs to
            tell people from bots. It does not track you across sites.
          </li>
          <li>
            Our website platform&rsquo;s error reporter may keep a random per-tab id (
            <code className="font-mono">__tyTelSid</code>) in session storage when a page error is reported, and a
            one-time flag (<code className="font-mono">__tyTelReload</code>) if it reloads a page that failed to load.
            Session storage is cleared when you close the tab. It also writes and immediately removes a test key (
            <code className="font-mono">__ty_test</code>) to check that storage works.
          </li>
        </ul>
        <p>
          If we add analytics to this site, we will use YOM in its default cookieless mode and update this page first.
        </p>

        <h2 id="dashboard">2. The YOM dashboard</h2>
        <p>
          When you sign in to YOM, the dashboard stores the following in your browser&rsquo;s local storage. They are
          strictly necessary for the service you asked for. No YOM cookies are set.
        </p>
        <StorageTable rows={DASHBOARD} caption="Browser storage used by the YOM dashboard" />
        <p>
          If you choose Google sign-in, Google&rsquo;s sign-in script loads from Google and Google may set its own
          cookies under its policy. Payment pages run by our payment providers may set their own cookies.
        </p>

        <h2 id="sdk">3. The YOM SDK on our customers&rsquo; sites</h2>
        <p>
          Our customers install the YOM SDK on their own websites and apps and decide how it is configured. The current
          SDK sets <strong>no cookies</strong> and sends requests without cookies. By default it is{' '}
          <strong>cookieless</strong>: until a visitor grants analytics consent it keeps no persistent identifier and
          writes nothing to the browser, and Do Not Track and Global Privacy Control are treated as a refusal. After
          consent, it may use:
        </p>
        <StorageTable rows={SDK} caption="Browser storage used by the YOM SDK after consent" />
        <p>
          When a visitor withdraws consent, the SDK removes <code className="font-mono">yom_visitor</code>,{' '}
          <code className="font-mono">yom_session</code> and <code className="font-mono">yom_consent</code>.
        </p>
        <p>
          If the site owner forwards conversions to Meta and the visitor has given marketing consent, the SDK may{' '}
          <em>read</em> (never set) Meta&rsquo;s own <code className="font-mono">_fbp</code> and{' '}
          <code className="font-mono">_fbc</code> cookies so Meta can match the conversion. If the site owner enables
          browser forwarding to its own Google Analytics or Meta Pixel, those tags load only after marketing consent and
          may set their own cookies under Google&rsquo;s and Meta&rsquo;s policies. The site owner is responsible for
          its consent banner and for describing these in its own cookie notice.
        </p>

        <h2 id="third-party">4. Third-party cookies</h2>
        <p>
          We do not place advertising or cross-site tracking cookies on this website or in the dashboard. The only
          third-party cookies are the ones described above, set by Cloudflare, Google or payment providers when you use
          their features, and by tags a site owner chooses to load with consent.
        </p>

        <h2 id="choices">5. Your choices</h2>
        <ul>
          <li>You can clear cookies and local storage in your browser settings at any time; signing out of the dashboard also clears its session.</li>
          <li>On a site that uses YOM, use that site&rsquo;s consent controls, or turn on Global Privacy Control in your browser.</li>
          <li>Questions: <a href={`mailto:${e.email}?subject=Privacy`}>{e.email}</a>.</li>
        </ul>
      </LegalPage>
    </>
  );
}

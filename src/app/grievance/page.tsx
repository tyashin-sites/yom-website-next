import type { Metadata } from 'next';
import { pageMetadata, siteUrl } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { LegalPage } from '@/components/LegalPage';
import { legalEntities, legalOfficer } from '@/config/legal';
import { EntityBlock } from '@/components/LegalEntities';

/** PUBLISH-KIT K2 (English grievance page, with the Canada/Quebec line), {Brand} = YOM. */
const TITLE = 'Grievance Officer';
const DESCRIPTION =
  'How to complain about YOM, about content or data we hold, or about how we handle personal data: our Grievance Officer, response times, and where to appeal in India, the EU, the UK and Canada.';
const base = pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/grievance' });
export const metadata: Metadata = {
  ...base,
  alternates: { ...base.alternates, languages: { en: siteUrl('/grievance'), hi: siteUrl('/grievance/hi') } },
};

export default function GrievancePage() {
  const o = legalOfficer;
  const IN = legalEntities.india;
  const mail = <a href={`mailto:${o.email}?subject=Grievance`}>{o.email}</a>;
  return (
    <>
      <JsonLd page={{ path: '/grievance', title: TITLE, description: DESCRIPTION }} />
      <LegalPage
        title={TITLE}
        path="/grievance"
        intro={
          <p>
            Write to us if you have a complaint about YOM, about content on a page or site we host, or about how we
            handle your personal data. Complaints from anyone are welcome, whether or not you have an account.
          </p>
        }
      >
        <h2 id="officer">Grievance Officer</h2>
        <p>
          {o.name}
          <br />
          {IN.name}
          <br />
          Registered office (for legal notices): {IN.address}, {IN.country}
          <br />
          Principal place of business: {IN.principalPlace}
          <br />
          Email: {mail}
          <br />
          Phone: <a href={IN.phoneHref}>{IN.phone}</a>
        </p>

        <h2 id="how">How to complain</h2>
        <p>
          Email us with &ldquo;Grievance&rdquo; in the subject line. Tell us your name and how to reach you, the page,
          site or account the complaint is about, what happened, and what you would like us to do. Attach screenshots or
          links if you have them. For a request about your personal data, tell us which product you use and the email
          address you use with us, so we can find your records without asking for more than we need.
        </p>

        <h2 id="next">What happens next</h2>
        <ul>
          <li>We acknowledge your complaint within 24 hours and give you a reference number.</li>
          <li>We resolve it within 7 days.</li>
          <li>
            If you ask us to remove content we host that breaks our rules for users (see our{' '}
            <a href="/terms#acceptable-use">terms</a>), we act within 36 hours. Claims about who owns the content, or
            about intellectual property, can take up to 7 days because we need to hear from both sides.
          </li>
          <li>
            If content shows you in a private or sexual way, or pretends to be you, including images changed with AI,
            report it and we will remove it or block access within 2 hours.
          </li>
          <li>
            Requests to see, correct or delete your personal data, or to withdraw consent, are answered within one month.
            Most take far less.
          </li>
          <li>
            Orders and notices from courts and government authorities can be sent to the same address. We act on them
            within the time the law sets.
          </li>
        </ul>

        <h2 id="appeal">If you are not satisfied</h2>
        <ul>
          <li>
            Under India&rsquo;s Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021,
            you can appeal our decision to the Grievance Appellate Committee at{' '}
            <a href="https://gac.gov.in" rel="noopener">
              gac.gov.in
            </a>{' '}
            within 30 days of hearing from us.
          </li>
          <li>
            For personal data, once the relevant parts of the Digital Personal Data Protection Act, 2023 apply, you can
            complain to the Data Protection Board of India after using this process.
          </li>
          <li>
            In the European Union you can complain to the Estonian Data Protection Inspectorate (Andmekaitse
            Inspektsioon,{' '}
            <a href="https://www.aki.ee" rel="noopener">
              www.aki.ee
            </a>
            ) or to the data protection authority where you live. In the United Kingdom you can complain to the
            Information Commissioner&rsquo;s Office (
            <a href="https://ico.org.uk" rel="noopener">
              ico.org.uk
            </a>
            ). {o.name} is also the privacy contact for {legalEntities.estonia.name}.
          </li>
          <li>
            In Canada you can contact the Office of the Privacy Commissioner of Canada, and in Quebec the Commission
            d&rsquo;accès à l&rsquo;information. {o.name} is also our Privacy Officer for {legalEntities.canada.name} and
            the person in charge of the protection of personal information for Quebec ({o.email}, {o.phoneCanada}).
          </li>
        </ul>

        <h2 id="companies">Which company you deal with</h2>
        <EntityBlock />

        <p>
          This page is also available in{' '}
          <a href="/grievance/hi" hrefLang="hi">
            Hindi (<span lang="hi">हिंदी</span>)
          </a>
          . Ask us at the
          address above if you need it in another language listed in the Eighth Schedule to the Constitution of India and
          we will send it within 7 days.
        </p>
      </LegalPage>
    </>
  );
}

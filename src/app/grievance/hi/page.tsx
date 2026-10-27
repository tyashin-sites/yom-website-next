import type { Metadata } from 'next';
import { pageMetadata, siteUrl } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { LegalPage } from '@/components/LegalPage';
import { legalOfficer, legalEntities } from '@/config/legal';

/** PUBLISH-KIT K3 (Hindi grievance page), {Brand} = YOM. The English page (K2) prevails. */
const TITLE = 'शिकायत अधिकारी';
const DESCRIPTION =
  'YOM से जुड़ी शिकायत कैसे करें: हमारे शिकायत अधिकारी, जवाब देने का समय, और भारत में अपील कहाँ करें। Grievance Officer, in Hindi.';
const base = pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/grievance/hi' });
export const metadata: Metadata = {
  ...base,
  alternates: { ...base.alternates, languages: { en: siteUrl('/grievance'), hi: siteUrl('/grievance/hi') } },
  openGraph: { ...base.openGraph, locale: 'hi_IN' },
};

export default function GrievanceHindiPage() {
  const o = legalOfficer;
  const IN = legalEntities.india;
  return (
    <>
      <JsonLd
        page={{
          path: '/grievance/hi',
          title: TITLE,
          description: DESCRIPTION,
          inLanguage: 'hi',
          crumbs: [
            { name: 'Grievance Officer', path: '/grievance' },
            { name: TITLE, path: '/grievance/hi' },
          ],
        }}
      />
      <LegalPage
        title={TITLE}
        path="/grievance/hi"
        lang="hi"
        trail={[
          { name: 'Grievance Officer', path: '/grievance' },
          { name: TITLE, path: '/grievance/hi' },
        ]}
        intro={
          <p>
            अगर आपको YOM से, हमारे द्वारा होस्ट किए गए किसी पेज या साइट की सामग्री से, या आपके निजी डेटा को संभालने के हमारे
            तरीके से कोई शिकायत है, तो हमें लिखें। कोई भी व्यक्ति शिकायत कर सकता है, चाहे उसका खाता हो या न हो।
          </p>
        }
      >
        <h2 id="officer">शिकायत अधिकारी</h2>
        <p>
          शिखा गुप्ता
          <br />
          आपसटेक प्राइवेट लिमिटेड (<span lang="en">{IN.name}</span>)
          <br />
          पंजीकृत कार्यालय (कानूनी सूचनाओं के लिए): 8/3, दूसरी मंज़िल, रूप नगर, दिल्ली 110007, भारत
          <br />
          मुख्य कारोबारी स्थान: पहली मंज़िल, 145, सेक्टर 44, गुरुग्राम, हरियाणा 122003
          <br />
          ईमेल: <a href={`mailto:${o.email}?subject=Grievance`}>{o.email}</a>
          <br />
          फ़ोन: <a href={IN.phoneHref}>{IN.phone}</a>
        </p>

        <h2 id="how">शिकायत कैसे करें</h2>
        <p>
          विषय पंक्ति में &ldquo;Grievance&rdquo; या &ldquo;शिकायत&rdquo; लिखकर ईमेल करें। अपना नाम और संपर्क, जिस पेज, साइट या
          खाते के बारे में शिकायत है, क्या हुआ, और आप हमसे क्या चाहते हैं, यह बताएँ। स्क्रीनशॉट या लिंक हों तो जोड़ें। अपने
          निजी डेटा के बारे में अनुरोध हो तो बताएँ कि आप कौन सा उत्पाद इस्तेमाल करते हैं और हमारे साथ कौन सा ईमेल पता
          इस्तेमाल करते हैं।
        </p>

        <h2 id="next">आगे क्या होगा</h2>
        <ul>
          <li>हम 24 घंटे के भीतर आपकी शिकायत की पावती देंगे और एक संदर्भ संख्या देंगे।</li>
          <li>हम 7 दिनों के भीतर शिकायत का समाधान करेंगे।</li>
          <li>
            अगर आप हमारे होस्ट की गई ऐसी सामग्री हटाने को कहते हैं जो हमारे उपयोगकर्ता नियमों को तोड़ती है, तो हम 36 घंटे
            के भीतर कार्रवाई करेंगे। स्वामित्व या बौद्धिक संपदा से जुड़े दावों में 7 दिन तक लग सकते हैं, क्योंकि हमें दोनों
            पक्षों को सुनना होता है।
          </li>
          <li>
            अगर कोई सामग्री आपको निजी या यौन रूप में दिखाती है, या आपका रूप धारण करती है (AI से बदली गई तस्वीरों सहित), तो
            रिपोर्ट करें। हम 2 घंटे के भीतर उसे हटा देंगे या उस तक पहुँच रोक देंगे।
          </li>
          <li>
            अपना निजी डेटा देखने, सुधारने या मिटाने, या सहमति वापस लेने के अनुरोधों का उत्तर एक महीने के भीतर दिया जाता है।
          </li>
          <li>
            अदालतों और सरकारी प्राधिकरणों के आदेश और सूचनाएँ इसी पते पर भेजी जा सकती हैं। हम कानून में तय समय के भीतर उन पर
            कार्रवाई करते हैं।
          </li>
        </ul>

        <h2 id="appeal">अगर आप संतुष्ट नहीं हैं</h2>
        <ul>
          <li>
            सूचना प्रौद्योगिकी (मध्यवर्ती दिशानिर्देश और डिजिटल मीडिया आचार संहिता) नियम, 2021 के तहत आप हमारा जवाब मिलने के
            30 दिनों के भीतर{' '}
            <a href="https://gac.gov.in" rel="noopener">
              gac.gov.in
            </a>{' '}
            पर शिकायत अपील समिति (<span lang="en">Grievance Appellate Committee</span>) में अपील कर सकते हैं।
          </li>
          <li>
            निजी डेटा के मामलों में, डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम, 2023 के संबंधित प्रावधान लागू होने के बाद, इस
            प्रक्रिया का उपयोग करने के बाद आप भारतीय डेटा संरक्षण बोर्ड से शिकायत कर सकते हैं।
          </li>
        </ul>

        <p>
          यह हिंदी अनुवाद है। किसी अंतर की स्थिति में{' '}
          <a href="/grievance" hrefLang="en">
            अंग्रेज़ी संस्करण
          </a>{' '}
          मान्य होगा।
        </p>
      </LegalPage>
    </>
  );
}

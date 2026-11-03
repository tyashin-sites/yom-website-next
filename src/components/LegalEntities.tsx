import { k1, k1Summary, legalEntities, legalOfficer } from '@/config/legal';

const { india: IN, estonia: EE, canada: CA } = legalEntities;

/**
 * PUBLISH-KIT K1 v2.0 (regional entity block), verbatim with {Brand} = YOM,
 * rendered from the shared text in config/legal.ts. Every legal document that
 * names a contracting party renders this.
 */
export function EntityBlock() {
  return (
    <>
      <p>{k1.intro}</p>
      <ul>
        {k1.regions.map((r) => (
          <li key={r.key}>
            <strong>{r.label}:</strong> {r.text}
          </li>
        ))}
      </ul>
      <p>
        {k1.shared} {k1.meaning}
      </p>
    </>
  );
}

/** One-sentence K1 summary for the footer and short notices. */
export function EntityLine({ className }: { className?: string }) {
  return <p className={className}>{k1Summary}</p>;
}

/** Hindi summary of K1 for /grievance/hi (Claude's translation; the English K1 prevails). */
export function EntityLineHindi() {
  const [IN, EEr, CAr] = k1.regions;
  return (
    <p>
      YOM को एक ही समूह की तीन कंपनियाँ चलाती हैं: भारत में <span lang="en">{IN.name}</span>, यूरोपीय संघ और यूनाइटेड
      किंगडम में <span lang="en">{EEr.name}</span>, और बाकी सभी जगह <span lang="en">{CAr.name}</span>। आप किससे जुड़े
      हैं, यह आपके स्थान पर निर्भर करता है; व्यावसायिक खाते के लिए यह व्यवसाय के बिलिंग पते का देश है। पूरा विवरण{' '}
      <a href="/terms#agreement" hrefLang="en">
        हमारी शर्तों
      </a>{' '}
      में है।
    </p>
  );
}

/** The group officer and the roles she holds (determinations A2 and §1, K2 v2.0). */
export function OfficerBlock() {
  const o = legalOfficer;
  return (
    <p>
      {o.name} is our Grievance Officer for India, our Privacy Officer for {CA.name}, the person in charge of the
      protection of personal information for Quebec, and the privacy contact for {EE.name}. Write to her at{' '}
      <a href={`mailto:${o.email}?subject=Privacy`}>{o.email}</a> or call {o.phoneIndia} (India) or {o.phoneCanada}{' '}
      (Canada). How we handle complaints, and how fast, is set out on the <a href="/grievance">Grievance Officer</a>{' '}
      page.
    </p>
  );
}

/**
 * Hindi K1 block for /privacy/hi and /terms/hi (Claude's translation of PUBLISH-KIT K1 v2.0; the English K1
 * prevails). Names, numbers and addresses come from config/legal.ts and stay in English.
 */
export function EntityBlockHindi() {
  return (
    <>
      <p>
        YOM को एक ही समूह की तीन कंपनियाँ चलाती हैं। आप किस कंपनी से जुड़े हैं, यह इस पर निर्भर करता है कि आप कहाँ हैं।
        व्यावसायिक खाते के लिए, यह व्यवसाय के बिलिंग पते का देश है।
      </p>
      <ul>
        <li>
          <strong>भारत:</strong> <span lang="en">{IN.name}</span> (CIN {IN.cin}; पंजीकृत कार्यालय{' '}
          <span lang="en">
            {IN.address}, {IN.country}
          </span>
          )। भारतीय कानून के तहत यह आपके व्यक्तिगत डेटा के लिए डेटा न्यासी (data fiduciary) है।
        </li>
        <li>
          <strong>यूरोपीय संघ और यूनाइटेड किंगडम:</strong> <span lang="en">{EE.name}</span> (रजिस्ट्री कोड{' '}
          {EE.registryCode}, VAT {EE.vat}, <span lang="en">{EE.address}</span>)। GDPR और UK GDPR के तहत यह आपके
          व्यक्तिगत डेटा का नियंत्रक (controller) है।
        </li>
        <li>
          <strong>बाकी सभी जगह:</strong> <span lang="en">{CA.name}</span> (<span lang="en">{CA.address}</span>)। यह
          आपके व्यक्तिगत डेटा का नियंत्रक है।
        </li>
      </ul>
      <p>
        तीनों कंपनियाँ इंजीनियरिंग, होस्टिंग और सहायता साझा करती हैं, और समूह के भीतर के एक लिखित समझौते के तहत हर कंपनी
        बाकी कंपनियों के लिए व्यक्तिगत डेटा प्रोसेस करती है। इस दस्तावेज़ में &ldquo;YOM&rdquo;, &ldquo;हम&rdquo; और
        &ldquo;हमें&rdquo; का अर्थ इनमें से वह कंपनी है जिससे आप जुड़े हैं।
      </p>
    </>
  );
}

/** Hindi OfficerBlock for /privacy/hi (Claude's translation; the English page prevails). */
export function OfficerBlockHindi() {
  const o = legalOfficer;
  return (
    <p>
      <span lang="en">{o.name}</span> भारत के लिए हमारे शिकायत अधिकारी, <span lang="en">{CA.name}</span> के लिए निजता
      अधिकारी (Privacy Officer), क्यूबेक के लिए व्यक्तिगत जानकारी की सुरक्षा के प्रभारी व्यक्ति, और{' '}
      <span lang="en">{EE.name}</span> के लिए निजता संपर्क हैं। उन्हें{' '}
      <a href={`mailto:${o.email}?subject=Privacy`}>{o.email}</a> पर लिखें, या {o.phoneIndia} (भारत) या{' '}
      {o.phoneCanada} (कनाडा) पर कॉल करें। हम शिकायतों को कैसे और कितनी जल्दी निपटाते हैं, यह{' '}
      <a href="/grievance/hi">शिकायत अधिकारी</a> पेज पर बताया गया है।
    </p>
  );
}

/**
 * Legal documents. First drafted 2026-10-23 under the user's delegation. The
 * 2026-10-26 update implements the in-house counsel determinations v1.0
 * (Claude-Workspace/yom-legal-pack: COUNSEL-DETERMINATIONS.md, PUBLISH-KIT.md):
 * two regional entities, one named officer, the grievance pages and the YOM
 * Intent Addendum. Every data-handling statement traces to the YOM codebase
 * or the legal pack; see docs/LEGAL-SOURCES.md.
 */
export const LEGAL_UPDATED = '27 October 2026';
export const LEGAL_UPDATED_ISO = '2026-10-27';

export const legalDocs = [
  { href: '/terms', label: 'Terms of Service' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/dpa', label: 'Data Processing Addendum' },
  { href: '/intent-addendum', label: 'YOM Intent Addendum' },
  { href: '/acceptable-use', label: 'Acceptable Use Policy' },
  { href: '/cookies', label: 'Cookie Policy' },
  { href: '/subprocessors', label: 'Sub-processors' },
  { href: '/security/disclosure', label: 'Vulnerability disclosure policy' },
  { href: '/grievance', label: 'Grievance Officer' },
] as const;

const EMAIL = 'contact@aapastech.com';

/**
 * The three contracting entities (PUBLISH-KIT K1 v2.0, COUNSEL-DETERMINATIONS
 * v2.0 §1, owner decision 27 Oct 2026). Region = the country of a business's
 * billing address (anyone else: where they live): India → Aapastech Private
 * Limited (data fiduciary); EU and UK → Aapastech OÜ (controller under the GDPR
 * and UK GDPR, processor for customers' end-user data); everywhere else →
 * 14818032 Canada Inc. Aapastech Private Limited and 14818032 Canada Inc. do the
 * processing for each other and for Aapastech OÜ.
 */
const IN_REGISTERED = { street: '8/3, 2nd Floor, Roop Nagar', locality: 'Delhi', postalCode: '110007' } as const;
const IN_PRINCIPAL = {
  street: '1st Floor, 145, Sector 44',
  locality: 'Gurugram',
  region: 'Haryana',
  postalCode: '122003',
} as const;

export const legalEntities = {
  india: {
    name: 'Aapastech Private Limited',
    cin: 'U72900DL2022PTC395508',
    /** Registered office, as K1 prints it (no country). Legal notices go here. */
    address: `${IN_REGISTERED.street}, ${IN_REGISTERED.locality} ${IN_REGISTERED.postalCode}`,
    registeredOffice: IN_REGISTERED,
    /** Principal place of business (GSTIN 06AAVCA6693D1ZK), PUBLISH-KIT v1.1 facts. */
    principalPlace: `${IN_PRINCIPAL.street}, ${IN_PRINCIPAL.locality}, ${IN_PRINCIPAL.region} ${IN_PRINCIPAL.postalCode}`,
    principalOffice: IN_PRINCIPAL,
    countryCode: 'IN',
    country: 'India',
    email: EMAIL,
    phone: '+91 96677 47082',
    phoneHref: 'tel:+919667747082',
    payments: 'Razorpay',
  },
  estonia: {
    name: 'Aapastech OÜ',
    registryCode: '16453146',
    vat: 'EE102489493',
    street: 'Tornimäe tn 3 // 5 // 7',
    locality: 'Tallinn',
    postalCode: '10145',
    address: 'Tornimäe tn 3 // 5 // 7, 10145 Tallinn, Estonia',
    countryCode: 'EE',
    country: 'Estonia',
    email: EMAIL,
  },
  canada: {
    name: '14818032 Canada Inc.',
    place: 'Burlington, Ontario',
    address: 'Burlington, Ontario, Canada',
    locality: 'Burlington',
    regionCode: 'ON',
    countryCode: 'CA',
    country: 'Canada',
    email: EMAIL,
    phone: '+1 437 800 0190',
    phoneHref: 'tel:+14378000190',
    payments: 'Stripe',
  },
} as const;

const { india: IN_E, estonia: EE_E, canada: CA_E } = legalEntities;

/**
 * PUBLISH-KIT K1 v2.0, verbatim with {Brand} = YOM, as plain text. The React
 * block (components/LegalEntities.tsx), llms.txt and the about page all render
 * from this, so the three entities read the same everywhere.
 */
export const k1 = {
  intro:
    "YOM is run by three companies in the same group. Which one you deal with depends on where you are. For a business account, that is the country of the business's billing address.",
  regions: [
    {
      key: 'india',
      label: 'India',
      short: 'in India',
      name: IN_E.name,
      text: `${IN_E.name} (CIN ${IN_E.cin}; registered office ${IN_E.address}; principal place of business ${IN_E.principalPlace}). It is the data fiduciary for your personal data under Indian law.`,
    },
    {
      key: 'estonia',
      label: 'European Union and United Kingdom',
      short: 'in the European Union and the United Kingdom',
      name: EE_E.name,
      text: `${EE_E.name} (registry code ${EE_E.registryCode}, VAT ${EE_E.vat}, ${EE_E.address}). It is the controller of your personal data under the GDPR and the UK GDPR.`,
    },
    {
      key: 'canada',
      label: 'Everywhere else',
      short: 'everywhere else',
      name: CA_E.name,
      text: `${CA_E.name} (${CA_E.address}). It is the controller of your personal data.`,
    },
  ],
  shared:
    'The three companies share engineering, hosting and support, and each processes personal data for the others under a written intra-group agreement.',
  meaning: 'In this document \u201cYOM\u201d, \u201cwe\u201d and \u201cus\u201d mean whichever of them you deal with.',
} as const;

/** One sentence naming all three, for the footer and other short places. */
export const k1Summary = `YOM is run by three companies in the same group: ${k1.regions
  .map((r) => `${r.name} ${r.short}`)
  .join(', ')
  .replace(/, ([^,]*)$/, ', and $1')}.`;

/** One officer for the group (determination A2). */
export const legalOfficer = {
  name: 'Shikha Gupta',
  email: EMAIL,
  phoneIndia: legalEntities.india.phone,
  phoneCanada: legalEntities.canada.phone,
} as const;

/** Where every legal notice, request and complaint goes. */
export const legalContact = { email: EMAIL } as const;

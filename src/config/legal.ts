/**
 * Legal documents. First drafted 2026-10-23 under the user's delegation. The
 * 2026-10-26 update implements the in-house counsel determinations v1.0
 * (Claude-Workspace/yom-legal-pack: COUNSEL-DETERMINATIONS.md, PUBLISH-KIT.md):
 * two regional entities, one named officer, the grievance pages and the YOM
 * Intent Addendum. Every data-handling statement traces to the YOM codebase
 * or the legal pack; see docs/LEGAL-SOURCES.md.
 */
export const LEGAL_UPDATED = '26 October 2026';
export const LEGAL_UPDATED_ISO = '2026-10-26';

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
 * The two contracting entities (PUBLISH-KIT K1, determination A1). Customers and
 * users in India (billed through Razorpay) contract with the Indian company,
 * which is their data fiduciary; everyone else (billed through Stripe)
 * contracts with the Canadian company, which is their controller. Each is the
 * other's intra-group sub-processor.
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

/** One officer for the group (determination A2). */
export const legalOfficer = {
  name: 'Shikha Gupta',
  email: EMAIL,
  phoneIndia: legalEntities.india.phone,
  phoneCanada: legalEntities.canada.phone,
} as const;

/** Where every legal notice, request and complaint goes. */
export const legalContact = { email: EMAIL } as const;

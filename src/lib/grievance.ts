/**
 * Grievance form: categories, response clocks and copy (English and Hindi).
 *
 * Shared by the /grievance pages (GrievanceForm) and POST /api/grievance.
 * The clocks follow the IT Rules 2021 as amended on 10 Feb 2026: 2 hours for
 * intimate images and impersonation (rule 3(2)(b)), 36 hours for removal of
 * content that breaks the rules for users (first proviso to rule 3(2)(a)(i)),
 * 7 days for everything else. Personal-data requests follow the privacy
 * policy (one month). Keep these in step with the "What happens next" list
 * on the page and with yom-legal-pack/13-incident-and-takedown-runbook.md.
 */

export type GrievanceLang = 'en' | 'hi';

export const GRIEVANCE_CATEGORIES = [
  {
    id: 'intimate-or-impersonation',
    clock: { en: '2 hours', hi: '2 घंटे' },
    label: {
      en: 'Content shows me in a private or sexual way, or pretends to be me',
      hi: 'सामग्री मुझे निजी या यौन रूप में दिखाती है, या मेरे नाम से कोई और बन रहा है',
    },
  },
  {
    id: 'unlawful-content',
    clock: { en: '36 hours', hi: '36 घंटे' },
    label: {
      en: 'Content that breaks the law or our rules for users',
      hi: 'ऐसी सामग्री जो कानून या उपयोगकर्ताओं के लिए हमारे नियम तोड़ती है',
    },
  },
  {
    id: 'ip-or-ownership',
    clock: { en: '7 days', hi: '7 दिन' },
    label: {
      en: 'Copyright, trademark, or who owns the content',
      hi: 'कॉपीराइट, ट्रेडमार्क, या सामग्री किसकी है',
    },
  },
  {
    id: 'personal-data',
    clock: { en: '1 month', hi: '1 महीना' },
    label: {
      en: 'My personal data: see it, correct it or delete it',
      hi: 'मेरा निजी डेटा: देखना, सुधारना या हटाना',
    },
  },
  {
    id: 'other',
    clock: { en: '7 days', hi: '7 दिन' },
    label: { en: 'Something else about our service', hi: 'हमारी सेवा के बारे में कुछ और' },
  },
] as const;

export type GrievanceCategoryId = (typeof GRIEVANCE_CATEGORIES)[number]['id'];

export function findGrievanceCategory(id: string) {
  return GRIEVANCE_CATEGORIES.find((c) => c.id === id);
}

export const GRIEVANCE_COPY = {
  en: {
    intro: 'Or use this form. You get a reference number as soon as you send it.',
    name: 'Your name',
    email: 'Email',
    category: 'What is it about?',
    contentUrl: 'Link to the page or content',
    contentUrlHint: 'A link is enough. Please do not send us copies of private images.',
    message: 'What happened, and what would you like us to do?',
    submit: 'Send complaint',
    sending: 'Sending…',
    doneTitle: 'We have your complaint.',
    reference: 'Your reference number',
    doneClock: (clock: string) => `We will act on it within ${clock} and reply by email.`,
    doneEmail: 'Quote this number if you write to us again at',
    error: 'We could not send this. Please email it to',
    optional: 'optional',
    errors: {
      invalid: 'Invalid request.',
      name: 'Please add your name.',
      email: 'Please add a valid email address.',
      category: 'Please choose what the complaint is about.',
      contentUrl: 'The link should start with http:// or https://.',
      message: 'Please tell us what happened.',
      undelivered: 'We could not send this. Please email it to contact@aapastech.com.',
    },
  },
  hi: {
    intro: 'या यह फ़ॉर्म भरें। भेजते ही आपको संदर्भ संख्या मिल जाएगी।',
    name: 'आपका नाम',
    email: 'ईमेल',
    category: 'शिकायत किस बारे में है?',
    contentUrl: 'पेज या सामग्री का लिंक',
    contentUrlHint: 'लिंक काफ़ी है। कृपया निजी तस्वीरों की कॉपी हमें न भेजें।',
    message: 'क्या हुआ, और आप हमसे क्या चाहते हैं?',
    submit: 'शिकायत भेजें',
    sending: 'भेज रहे हैं…',
    doneTitle: 'हमें आपकी शिकायत मिल गई है।',
    reference: 'आपकी संदर्भ संख्या',
    doneClock: (clock: string) => `हम ${clock} के भीतर कार्रवाई करेंगे और ईमेल से जवाब देंगे।`,
    doneEmail: 'दोबारा लिखें तो यह संख्या बताएँ:',
    error: 'यह नहीं भेजा जा सका। कृपया इसे ईमेल करें:',
    optional: 'वैकल्पिक',
    errors: {
      invalid: 'अनुरोध सही नहीं है।',
      name: 'कृपया अपना नाम लिखें।',
      email: 'कृपया सही ईमेल पता लिखें।',
      category: 'कृपया चुनें कि शिकायत किस बारे में है।',
      contentUrl: 'लिंक http:// या https:// से शुरू होना चाहिए।',
      message: 'कृपया बताएँ कि क्या हुआ।',
      undelivered: 'यह नहीं भेजा जा सका। कृपया इसे contact@aapastech.com पर ईमेल करें।',
    },
  },
} as const;

export const GRIEVANCE_EMAIL = 'contact@aapastech.com';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(v: unknown, max: number): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

export type GrievanceInput = {
  name: string;
  email: string;
  categoryId: GrievanceCategoryId;
  contentUrl: string;
  message: string;
  lang: GrievanceLang;
  renderedAt?: number;
};

export type GrievanceErrorCode = keyof (typeof GRIEVANCE_COPY)['en']['errors'];

/** The visitor's language from a raw body (anything but 'hi' is English). */
export function grievanceLang(body: Record<string, unknown> | null | undefined): GrievanceLang {
  return body?.lang === 'hi' ? 'hi' : 'en';
}

/** A validation or delivery message in the visitor's language. */
export function grievanceError(code: GrievanceErrorCode, lang: GrievanceLang): string {
  return GRIEVANCE_COPY[lang].errors[code];
}

/**
 * Validate a raw request body. Returns the cleaned input, or an error code
 * plus the message in the visitor's language (so /grievance/hi shows Hindi).
 */
export function parseGrievance(
  body: Record<string, unknown>
): { ok: true; value: GrievanceInput } | { ok: false; code: GrievanceErrorCode; error: string } {
  const name = str(body.name, 100);
  const email = str(body.email, 200);
  const category = findGrievanceCategory(str(body.category, 60));
  const contentUrl = str(body.contentUrl, 500);
  const message = str(body.message, 5000);
  const lang = grievanceLang(body);
  const renderedAt = Number(body.renderedAt);
  const fail = (code: GrievanceErrorCode) => ({ ok: false as const, code, error: grievanceError(code, lang) });

  if (!name) return fail('name');
  if (!email || !EMAIL_RE.test(email)) return fail('email');
  if (!category) return fail('category');
  if (contentUrl && !/^https?:\/\//i.test(contentUrl)) return fail('contentUrl');
  if (!message) return fail('message');

  return {
    ok: true,
    value: {
      name,
      email,
      categoryId: category.id,
      contentUrl,
      message,
      lang,
      renderedAt: Number.isFinite(renderedAt) && renderedAt > 0 ? renderedAt : undefined,
    },
  };
}

/**
 * What a grievance log line may carry: no name, email, link or complaint text.
 * Logs are kept for months (CERT-In) and are not the place for complaint data;
 * the complaint itself lives only in the Contact Form plugin's inbox.
 */
export function grievanceLogFields(g: GrievanceInput) {
  return { category: g.categoryId, lang: g.lang, hasContentUrl: g.contentUrl !== '' };
}

/** Payload for the Tyashin Contact Form plugin (`/api/v1/contact/public/submit`). */
export function toContactSubmission(g: GrievanceInput, site: string, pageUrl?: string) {
  const category = findGrievanceCategory(g.categoryId)!;
  return {
    name: g.name,
    email: g.email,
    category: `Grievance: ${category.label.en}`,
    subject: `[Grievance, ${category.clock.en}] ${site}`,
    message: [
      `Category: ${category.label.en} (respond within ${category.clock.en})`,
      ...(g.contentUrl ? [`Content: ${g.contentUrl}`] : []),
      `Language: ${g.lang === 'hi' ? 'Hindi' : 'English'}`,
      '',
      g.message,
    ].join('\n'),
    source: 'grievance-form',
    renderedAt: g.renderedAt,
    pageUrl,
    metadata: { grievance: true, category: g.categoryId, clock: category.clock.en, contentUrl: g.contentUrl || undefined, lang: g.lang },
  };
}

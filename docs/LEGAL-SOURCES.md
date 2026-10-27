# Legal pages: sources and open items

Published 2026-10-23 under the user's delegation ("you are on your own for legal review… do your
best to protect Aapastech and publish"). Drafted by Claude, **not reviewed by a lawyer**. An
eventual review by Ontario counsel is recommended (not blocking); the list at the bottom is what
to ask them first.

Pages: `/terms`, `/privacy`, `/dpa`, `/intent-addendum`, `/acceptable-use`, `/cookies`,
`/subprocessors`, `/security/disclosure`, `/grievance`, `/grievance/hi`,
`public/.well-known/security.txt`. Shared strings: `src/config/legal.ts` (entities, officer, date,
document list). Shared blocks: `src/components/LegalEntities.tsx` (K1 entity block, officer).
Shell: `src/components/LegalPage.tsx` (optional `lang` for the Hindi page).

Entities (since 2026-10-26, see the next section): **Aapastech Private Limited** (CIN
U72900DL2022PTC395508; registered office 8/3, 2nd Floor, Roop Nagar, Delhi 110007, the address for
legal notices; principal place of business 1st Floor, 145, Sector 44, Gurugram, Haryana 122003;
+91 96677 47082) for customers and users in India; **14818032 Canada Inc.**, Burlington, Ontario
(+1 437 800 0190) everywhere else. Both at contact@aapastech.com. Officer: **Shikha Gupta**, named.
Both companies are named in the footer, the JSON-LD graph (`#org-india`, `#org-canada`, parents of
`#organization`), llms.txt and the about page.

## 2026-10-26 update: regional entities, India, grievance pages, YOM Intent Addendum

Source of the positions: in-house counsel determinations v1.0 of 26 October 2026 and the shared
wording in `~/Documents/Claude-Workspace/yom-legal-pack/` (`COUNSEL-DETERMINATIONS.md`,
`PUBLISH-KIT.md`, `01-yom-intent-dpa-addendum.md`, `04-aggregate-data-clause.md`,
`11-intra-group-data-agreement.md`). Claude acted as counsel on the user's instruction; no
enrolled advocate has reviewed it. Kit text (K1 to K9) is used verbatim except for `{Brand}` = YOM,
capitalised defined terms (Terms, Fees) and the K1 payment line turned into a sentence.

| Statement (page) | Source |
|---|---|
| Two entities: Aapastech Private Limited contracts and is data fiduciary in India; 14818032 Canada Inc. everywhere else; each the other's sub-processor (all legal pages via `EntityBlock`, `/subprocessors`, DPA §6) | Determination A1 and §1; kit K1; file 11 |
| Razorpay customers deal with Aapastech Private Limited, Stripe customers with 14818032 Canada Inc. | Kit K1 note; file 01 question 6 (Razorpay seller of record); memory `yom-stripe-canada` |
| Shikha Gupta is Grievance Officer (India), Privacy Officer (Canada), Quebec person in charge; contact@aapastech.com; +91 96677 47082, +1 437 800 0190 (`OfficerBlock`, privacy §1, §13, §18, `/grievance`) | Determination A2 and §1; kit facts block |
| `/grievance` text, timelines (24 h acknowledgement, 7 days, 36 h, 2 h, one month), GAC appeal, Board, OPC and CAI line | Kit K2; IT Rules 2021 r.3(2), 3A as summarised in determinations §2 |
| `/grievance/hi` text | Kit K3, verbatim; English prevails |
| Terms §6 aggregated data: k ≥ 100 people, ≥ 5 customers, ≤ 25% each, data ≥ 30 days old, no prices or forward-looking figures, no Shopify-sourced data, Quebec excluded | File 04 Insertion 3 plus kit K8 settled rules (G33) |
| Terms §6: no profiles or advertising except when the customer turns on YOM Intent, under the Intent Addendum | File 01 consequential edit 1, file 04 Insertion 3 (cooperative reference dropped: that addendum is unpublished, Phase 2) |
| Terms §8 YOM short form of the user rules | Kit K4 |
| Terms §19 changes: 30 days' notice, refund of prepaid Fees | Kit K7 (stronger than the old clause, which had no refund and a new-features carve-out) |
| Terms §20: India = Indian law, sole arbitrator, seat New Delhi, English, Delhi courts; elsewhere Ontario law and Toronto courts | Determination A5 |
| Privacy §5 Intent paragraph (first two sentences verbatim) | File 01 consequential edit 4 |
| Privacy §12 India: rights, retention, transfers, security, Board | Kit K6 v1.1, verbatim, except the security-log sentence (next row) |
| Sealed copy in the future tense ("From 13 May 2027 Indian law will also require ...") in privacy §9 and §12, DPA §13, Intent 8.4 | Determination C13 (Rule 8 commences May 2027); kit K6 v1.1 |
| "We are extending security log retention to 180 days across all systems by 31 December 2026, as Indian cyber security rules require." (privacy §12) | Coordinator wording 2026-10-26, replacing K6's "at least 180 days", which is not true today; CERT-In Direction (iv); determinations §6 task due 31 Dec 2026. Privacy §9 keeps "days to weeks" for hosting-provider logs |
| Consent receipts kept for the project's retention period, like other events (privacy §5, Intent 8.5, Annex 1) | What the code does: `docs/consent.md` ("Receipts follow the project's retention like other exact events"). Determination C14's 3-year rule is not promised until it is built |
| Intent excluded for EEA, UK, Switzerland and Quebec (privacy §5, Intent definitions, 12, Annex 1) | Determination G38 (Switzerland added 26 Oct 2026), E23 |
| Aapastech Private Limited's principal place of business next to its registered office (K1 block, terms §23, privacy §18, DPA Annex 1, `/grievance`, `/grievance/hi`, `/subprocessors`) | Determinations §1; kit v1.1 facts (GSTIN 06AAVCA6693D1ZK). Hindi labels "पंजीकृत कार्यालय" and "मुख्य कारोबारी स्थान" are Claude's translation |
| DPA §7 security measures limited to seven commitments (TLS, encryption at rest by hosting and database providers, need-to-know production access, managed secret stores, security and admin event logging, incident response per §8, backups by database providers) | Coordinator instruction 2026-10-26; replaces the detailed list (no MFA, NTP or tested-restore promise in the DPA). The privacy policy §10 and `/security` still describe MFA availability, which is verified (claims ledger C67) |
| Privacy §14 and DPA §12: Intent audience exports are the one CCPA "third party" exception | Determination D17; 11 CCR §7050(b) |
| DPA §2 adds the DPDP Act 2023, DPDP Rules 2025 and IT Act 2000 to Data Protection Laws | File 01 consequential edit 3 |
| DPA §3 adds "turning on YOM Intent features" to the instructions | File 01 consequential edit 2 |
| DPA §8: notice within 24 hours, so the customer can meet the Board's 72 hours and CERT-In's 6 hours | File 01 clause 9; file 11 §3(f); determinations §2 (CERT-In) |
| DPA §11 and privacy §12: transfers out of India under DPDP §16 | Kit K6; file 11 §4.1 |
| `/subprocessors` group-company rows: engineering, hosting operations, support, billing; India and Canada | Determination A1; file 11 §1 |
| Cloudflare row now names Durable Objects | Already in the evidence row below (`DO`); Intent profile store is a Durable Object (`docs/intent.md` §4 on the Intent branch) |
| Intent Addendum v1.0 (all clauses) | File 01 v0.1 as changed by determinations A1, B6, B7, B12, C13, C14, D17, E23, G37, G38, G39 |
| Schedule 1 (third-party terms) | **Official text** of 11 CCR §7053(a)(1) to (6), CCPA Regulations effective 1 January 2026, CPPA: https://cppa.ca.gov/regulations/pdf/ccpa_statute_eff_20260101.pdf (pages 62 to 63), read 26 Oct 2026. Drift fixed: "only" in para 1; para 3 now "all applicable sections" and the level of protection "required of businesses", plus the Civ. Code §1798.81.5 security example; para 4 "ensure ... in a manner consistent with" and the attestation example; para 6 "after it determines". Cal. Civ. Code §1798.100(d) not re-read |
| Intent 6.1 quote of 11 CCR §7025(c)(1) and 5.3 citation of §7025(c)(6); clause 2.2 paraphrase of §7050(b) | Same CPPA PDF (pages 45 to 46, 59); quotes match the official text |
| No third-party CDN sees visitors' IP addresses, so none is listed (closes claims ledger D7, jsDelivr) | YOM origin/main: `packages/sdk/README.md:268` (script builds served from `yom.aapastech.com/app/cdn/sdk/`), `docs/embed.md:120` ("no third-party CDN"); the only `jsdelivr`/`unpkg` hits are package.json fields in `packages/embed`. Live site 26 Oct 2026: external scripts only from `website-api.tyashin.com` (`server: cloudflare`), covered by the Cloudflare website row |

Intent behaviour the addendum states, checked against `docs/intent.md` and code on
`aapastech/yourownmetrics` branch `feat/intent-4-exports` @ 556b621 (PRs #79 to #82, **unmerged,
undeployed**; worktree `yom-wt-intent`):

| Addendum clause | Evidence on the Intent branch |
|---|---|
| 6.1 scoring needs analytics + personalisation consent; exports need advertising (seen ≤ 180 d), activity ≤ 180 d, no GPC/opt-out/withdrawal on any linked device; scores frozen; explicit-only per export | `docs/intent.md` §4 "Consent on profiles", §8 "Rules every run applies" |
| 6.2 SHA-256 only, raw identifiers rejected (`400`); hashed ids returned only to admin principals; CSV kept 7 days | `docs/intent.md` §3 (lines 110 to 120), §7, §8 table and §10 |
| 6.3 fingerprint and cookieless hashes never identity keys | `docs/intent.md` §3 ("A test pins both") |
| 6.4 and Annex 2 taxonomy nodes | `docs/intent.md` §5 |
| 5.5 health-sector projects cannot export | `docs/intent.md` §2, §8 (`intent.sensitiveSite`) |
| 6.5 minimum 100 people, nothing sent below it | `packages/shared/src/analytics/intent/connectors.ts:30` `MIN_EXPORT_SIZE = 100`; `docs/intent.md` §8 |
| 6.8 export runs recorded; create/update/delete/run audited | `packages/api/src/services/intent-exports.ts` (`intent_export_runs`); `packages/api/src/services/audit-trail.ts:270-283` |
| 7.3 scoring is rule-based (dashboard weights and decay) | `docs/intent.md` §6; determination G37 |
| 8.1 withdrawal erases linked profiles; Meta and Google audiences replaced each run; Klaviyo additive | `docs/intent.md` §4, §8 ("Klaviyo sync is additive"), §9 |
| 8.3 retention 180 days default, 1 to 393 days, never above project retention | `docs/intent.md` §9 |
| 10 access and erasure include Intent profiles | `docs/intent.md` §9 "Data-subject requests" |
| 13 Intent runs on Durable Objects, R2, Queues (no Vectorize, so the draft's mention was dropped) | `docs/intent.md` §4, §8; `git grep -i vectorize` finds nothing |

### Promised on the pages but not built yet (must be true before anyone enables Intent)

The legal hold in memory `yom-intent-phase1` stays: **do not set `intent.enabled` for any project**
until each item below is built or the clause is changed.

1. **Excluded Regions (Intent 6.7, privacy §5):** no code on the Intent branch drops EEA, UK, Swiss
   or Quebec (`cf.country` / `cf.regionCode = QC`) events from profiles, scores or exports.
2. **Sealed copy for India (privacy §12, DPA §13, Intent 8.4):** now stated in the future tense
   (from 13 May 2027); still to build before then (T-0378, due 30 Apr 2027; `docs/intent.md` §9).
3. **Security logs to 180 days by 31 Dec 2026 (privacy §12):** stated as work in progress; the
   CERT-In log task must land by that date.
4. **Consent receipts:** exist only with the Consent SDK (PR #66) and the Intent branch; the pages
   describe them only inside the YOM Intent paragraph and addendum.
5. **Profiles deleted within 30 days of a written request after Intent is turned off (Intent 8.2):**
   manual ops step; turning Intent off keeps stored profiles until retention (`docs/intent.md` §2).
   Deleting audiences YOM created in a Destination Account is also manual.
6. **24-hour breach notice (DPA §8):** an operational commitment; needs the incident runbook
   (determinations §6).
7. **Correction of a Profile within 10 business days (Intent 10):** manual; no correction tool.

### Changed from the v0.1 draft to stay accurate (not in the counsel brief)

- Clause 2/11: YOM is a CCPA third party for Audience Exports only (D17); service provider otherwise.
- Clause 5.2A (now 5.3): the draft promised the Consent SDK would show the GPC-honoured message
  ("not built"); the page now makes it the customer's job.
- Clause 6.7 (now 6.8): the draft's "24 months in the dashboard" is not what the code keeps (last 20
  runs per export, deleted with the export); the page states what is recorded, not for how long.
- Clause 8.1: the draft's "removes ... within 7 days" is not what the code does (Meta and Google
  replaced on each run, Klaviyo additive, runs can be manual); the page states the real behaviour.
- Clause 8.2: the draft's automatic deletion within 30 days of turning Intent off became "on written
  request", because the code keeps profiles until retention.
- Clause 12 (Quebec mandate) and the EEA/UK consent bullet were replaced by the exclusion (E23, G38).
- Clause 7.3 (Shopify merchant consent to fitted weights) replaced by the rule-based statement (G37).
- Annex 1: location is "country" (the profile row stores country, not city); "price band" dropped
  (not found in the profile store).
- References to YOM Network and the Data Cooperative Addendum dropped (Phase 2, unpublished).

## Where each data-handling statement comes from

Verified against `yourownmetrics` **origin/main @ 426b341** (2026-10-23 20:08 UTC). Local `main`
in that checkout is stale; always check `origin/main`.

| Statement | Evidence |
|---|---|
| SDK sets no cookies; requests use `credentials: 'omit'` | `packages/sdk/src/core/transport.ts:58,103` |
| No persistent id / no storage writes until consent `granted`; server forces visitor/user empty otherwise | `packages/sdk/src/core/client.ts` (consent default `unknown`, storage gated); `packages/shared/src/analytics/normalize.ts` |
| Local-storage keys `yom_visitor`, `yom_session` (30 min), `yom_consent`, `yom_fp` (consent + `crossSiteIdentity` only) | `packages/sdk/src/core/client.ts`, `fingerprint.ts`, `constants.ts` |
| Withdrawal removes visitor/session/consent (not `yom_fp`, so the cookie page doesn't claim it) | `client.ts:504-506` |
| DNT/GPC = denied by default; per-project cookieless/drop/ignore | `client.ts`, `normalize.ts`, `config.ts` |
| Query strings stripped, referrer → host, click ids presence-only; PII-like params scrubbed on browser events only | `normalize.ts` (`cleanPath`, `cleanHost`, scrub), `client.ts` |
| IP not stored in event records; used for geo (`request.cf`), optional daily hash, legacy v1 hash | `packages/ingest/src/v2.ts`, `packages/ingest/src/index.ts` (v1 still live) |
| Meta `_fbp`/`_fbc` read, never set, marketing consent only | `packages/sdk/src/core/forwarders.ts:100-125` |
| Ad-platform forwarding (Meta CAPI, GA4 MP) requires marketing consent and no GPC | `packages/pipeline/src/ad-delivery.ts`, `packages/shared/src/analytics/destinations.ts` (`suppressed_consent`) |
| Dashboard local storage `yom_token`, `yom_user`, `yom_tenant`, `yom_selected_project`; cleared on sign-out (except project) | `packages/dashboard/src/modules/auth/authSlice.ts`, `app/projectSlice.ts` |
| Sub-processors: Cloudflare (Workers, Pages, D1, R2, KV, Queues, DO, Analytics Engine, Workers AI), Resend, Stripe, Razorpay (IN), Google sign-in, Slack (internal alerts) | `packages/*/wrangler.toml`; `packages/shared/src/utils/email-service.ts`; `packages/api/src/services/{stripe,razorpay}-provider.ts`; `packages/api/src/routes/auth.ts` (tokeninfo); `packages/api/src/index.ts` (Slack). No Anthropic/OpenAI/Sentry found. |
| Website contact form → Tyashin (Cloudflare + MongoDB Atlas, email via SendGrid or Resend by env) | `tyashin-platform/aapastech-backend/src/routes/contact.ts`, `src/lib/email.ts`, `ARCHITECTURE.md` |
| Security measures: bcrypt passwords, hashed API keys, AES-GCM for secrets/destination credentials, RBAC owner/admin/analyst/viewer, TOTP MFA, per-tenant D1, rate limits, HMAC webhooks, audit log writer | `packages/shared/src/utils/index.ts`, `analytics/crypto.ts`, `api/src/middleware/auth.ts`, `api/src/routes/mfa.ts`, `api/src/routes/v2/audit.ts`, `api/wrangler.toml` |

## Wording chosen to stay true despite engineering gaps

First listed 2026-10-23. Status re-checked 2026-10-26 against YOM prod (main 75fa6b2, PRs #56 #57
#58 #61 #62) and the claims ledger; wording tightened the same day where the gap is closed.

| # | Gap (2026-10-23) | Status 2026-10-26 | Wording now |
|---|---|---|---|
| 1 | Legacy v1 endpoints: no consent/DNT/GPC, no scrubbing | v1 applies GPC/DNT, path-only URLs, PII scrubbing, never keeps a fingerprint (C17, VERIFIED-IN-PROD). Still no consent signal: an old SDK keeps its own visitor id when no GPC/DNT is set (`ingest/src/v1-privacy.ts`, cookieless only on `denied`) | Privacy §5 keeps "with the current SDK and ingest API" for the no-persistent-id promise and adds a v1 bullet saying exactly what v1 does and doesn't do |
| 2 | Archive never purged; hard delete and project delete leave data | Deletion lifecycle live (C80): close / delete → collection stops → 30-day grace (restorable) → automated purge of every store → certificate. Coordinator decision: raw archive kept for the life of the project, so retention never purges it (C43) | Privacy §9, Terms §17, DPA §13: 30-day grace, automatic deletion, 180-day cap kept as the outer promise; project deletion deletes its data; event records/reports follow plan retention, raw archive for the life of the project. /security adds the purge bullet |
| 3 | Retention numbers disagree | One constant since YOM #55 (Free 180, PAYG 395 default / 1,825 max); site copy matches | Legal pages still say "plan and settings" (no numbers in legal text on purpose) |
| 4 | Webhooks / warehouse exports not consent-gated | By design | Unchanged |
| 5 | MFA TOTP secret plaintext | Sealed with AES-GCM, existing rows re-sealed (C83, VERIFIED-IN-PROD) | Privacy §10, DPA §7, /security now say MFA secrets are encrypted at rest; recovery codes hashed |
| 6 | Backup job targets staging DB | Fix released (YOM #56); first prod run 2026-10-27 00:00Z, C82 still BUILD-PENDING | **No backup promise yet.** Only "backup copies expire within 30 days" (D1 Time Travel and dumps both ≤ 30 days, true whether or not dumps run). Add a backup statement only after C82 is verified |
| 7 | No data-subject tooling | Access + erasure by visitor id, user id or email hash, dashboard + API (C81); Analytics Engine rows suppressed by tombstone until they expire at 90 days | DPA §9 describes the controls and the 90-day analytics-engine exception; reasonable-cost clause kept for help beyond them. /security adds a bullet |
| 8 | No self-service account deletion | Owner "Close organisation" in dashboard settings, restore within 30 days (#61) | Terms §17 names the control and the 30-day restore |

## Open points from the 2026-10-26 update

- The Terms liability floor is still CAD $100 for free accounts, including Indian ones.
- Full Hindi versions of the policies are due 31 Dec 2026 (determination B10); only the grievance page
  is in Hindi today.

## Ask a lawyer first (non-blocking)

- Quebec: Charter of the French Language (Bill 96) requires adhesion contracts to be offered in
  French before an English version is agreed; the English-language clause alone may not suffice
  for Quebec customers. Consider a French version of the Terms/DPA/Privacy.
- Enforceability of the CAD $100 free-plan cap and the one-year limitation period in Ontario.
- Whether to add an arbitration clause (kept out for simplicity).
- SCC module selection and clause 17/18 choice (Ireland) for EU customers; Swiss FADP wording.
- Law 25: privacy-impact assessment for transfers outside Quebec (we state we assess them; make
  sure that process exists), and the confidentiality-incident register.
- CCPA service-provider language vs. Workers AI processing of aggregated customer data.

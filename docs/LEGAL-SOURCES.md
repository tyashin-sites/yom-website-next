# Legal pages: sources and open items

Published 2026-10-23 under the user's delegation ("you are on your own for legal review… do your
best to protect Aapastech and publish"). Drafted by Claude, **not reviewed by a lawyer**. An
eventual review by Ontario counsel is recommended (not blocking); the list at the bottom is what
to ask them first.

Pages: `/terms`, `/privacy`, `/dpa`, `/acceptable-use`, `/cookies`, `/subprocessors`,
`/security/disclosure`, `public/.well-known/security.txt`. Shared strings: `src/config/legal.ts`
(entity, date). Shell: `src/components/LegalPage.tsx`.

Entity: **14818032 Canada Inc. (operating as Aapastech), Burlington, Ontario, Canada**,
contact@aapastech.com, +1 437 800 0190. Privacy officer named by role only.

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

These are real gaps in the YOM code (reported to the coordinator). The legal text was written so
it is accurate today; fixing them lets the text be tightened later.

1. **Legacy v1 endpoints** (`/v1/ingest`, `/v1/beacon`, `/v1/pixel.gif`) are live and derive an
   IP+UA daily hash without consent/DNT/GPC handling or scrubbing. → Privacy §5 names "legacy v1
   endpoints"; "by default" statements are scoped to "the current YOM browser SDK and ingest API".
2. **Raw R2 archive is never purged by retention**; tenant hard-delete misses `v2/`,
   `compressed-archive/`, `DB_ANALYTICS` and Analytics Engine; project delete removes no event
   data. → No page promises automatic deletion at the end of a retention period. Terms §17 / DPA
   §13 promise deletion **within 180 days after termination** — an ops step (manual purge of all
   prefixes/tables for the org) until the code does it. /security now says the raw archive is
   kept for the life of the project.
3. **Retention numbers disagree** (plan constants 90/365, entitlements 180/1825, v2 default 395
   uncapped until a config save). → Legal pages say "as set by your plan and settings"; the
   marketing pages' 90/365 (ASSET-DEBT #19) is unchanged and still needs the YOM team's call.
4. **Webhooks and warehouse exports are not consent-gated** (by design: unconsented events go
   without ids). → Only ad-platform forwarding is described as consent-gated.
5. **MFA TOTP secret stored in plaintext**. → No page claims MFA secrets are encrypted.
6. **D1 backup job targets the staging DB id** (`packages/cron/src/jobs/backup.ts:13`). → Pages
   only say backup copies "expire on their own cycle"; no backup/RPO promise.
7. **No data-subject tooling** (delete/export by visitor or user id). → DPA §9 promises help
   "mainly through the Service's controls and documentation" and at reasonable cost beyond that.
8. **No self-service account deletion for users**; org delete is owner-only via API. → Terms §17:
   "by asking us … or, where available, using the controls".

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

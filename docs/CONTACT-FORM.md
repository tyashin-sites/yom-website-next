# Contact form → Tyashin Contact Form & Lead Capture plugin

`/contact` renders `src/components/ContactForm.tsx`, which posts JSON to this site's
`/api/contact` (`src/app/api/contact/route.ts`). The route validates, logs the lead with a
`LEAD:` prefix (always, so nothing is lost), and forwards it server-to-server to the plugin:

```
POST {TYASHIN_API_URL}/api/v1/contact/public/submit
X-API-Key: {TYASHIN_API_KEY}
{ name, email, company, category: <topic>, subject: "YOM website — <topic>",
  message: <message + "Monthly events: <range>">, source: "yom-website-contact",
  pageUrl, renderedAt, metadata: { company, topic, volume } }
```

Same pattern as the reference site (`team-website-moj7aqqd/src/app/api/contact/route.ts`).
Plugin handler: `tyashin-platform/aapastech-backend/src/routes/contact.ts` (`publicRoutes.post('/submit')`).

## What the coordinator sets

| Name | Kind | Value | Notes |
|---|---|---|---|
| `TYASHIN_API_KEY` | **Worker secret** (runtime) | The YOM website project's API key (admin.tyashin.com → project → API key) | Without it the route is log-only. The `/adopt` workflow normally sets it; otherwise `wrangler secret put TYASHIN_API_KEY --name site-yom-website`. |
| `TYASHIN_API_URL` | var (already in `wrangler.jsonc`) | `https://website-api.tyashin.com` | Leave as is. |

The key resolves the project by hash (`apiKeyMiddleware`). The forward sends no `Origin`
header, so the project's domain allow-list does not block it.

## Plugin settings (admin.tyashin.com → YOM website project → Contact Form & Lead Capture)

Install + enable the plugin, then:

| Setting | Value | Why |
|---|---|---|
| `notifyEmails` | `contact@aapastech.com` | Team admins are emailed by default; this adds the shared inbox. |
| `slackWebhookUrl` | optional (the team's leads channel) | Posts each lead to Slack. |
| `honeypotEnabled` | `true` (default) | The site drops its own honeypot (`website`) before forwarding; the plugin's stays on as a second layer. |
| `captchaEnabled` | `false` | The site's own form sends no captcha token; turning this on would reject every lead. |
| `requireMessage` | `false` | The YOM form's message is optional. |
| `autoReplyEnabled` | optional; if on, subject "We received your message" and a body that makes no reply-time promise (ASSET-DEBT #20) | Plan-gated (`autoReply`). |
| `categoryOptions` | not needed | The site sends one of: Demo, Pricing, Agency / multi-client, Platform / embedding, Privacy & security, Other. |
| `successMessage` / `successCtaUrl` | not used | The site renders its own confirmation. |

Behaviour to know:

- **Rate limit:** the public endpoint allows 5 submissions per minute per API key. All site
  leads share the key, so a burst over 5/min gets 429; the lead is still in the `LEAD:` log.
- **Spam:** submissions under 2 s after the form rendered are flagged as spam (the form sends
  `renderedAt`), as are the plugin's heuristic matches.
- **Plan cap:** non-spam leads count toward the plugin plan's monthly limit; over the cap the
  plugin refuses and notifies the admins. The lead is still in the log.

## Smoke test after deploy

```bash
curl -s -X POST https://yom.aapastech.com/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Smoke Test","email":"contact@aapastech.com","topic":"Other","message":"Smoke test, please ignore","renderedAt":1}'
```

Expect `{"ok":true}`, a row in the plugin inbox, and an email to the notify list. Then archive
the test row. `wrangler tail site-yom-website` shows `LEAD:` and any `platform forward failed (<status>)`.

Note: `/api/*` must stay with this site in the yom.aapastech.com router (it is not in the
dashboard path list, `src/config/router-paths.json`).

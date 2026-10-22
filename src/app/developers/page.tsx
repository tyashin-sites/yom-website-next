import { pageMetadata } from '@/lib/seo';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { PrimaryCta, GhostLink } from '@/components/ui/Cta';
import { ComingSoon } from '@/components/ui/Section';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { CtaBand } from '@/components/ui/CtaBand';

const TITLE = 'Developers';
const DESCRIPTION =
  'Install the YOM SDK, set consent, send exact conversions from browser or server (secret key or HMAC) and verify signed webhooks. Real code.';

export const metadata = pageMetadata({ title: 'Developers: install, server events, webhooks', description: DESCRIPTION, path: '/developers' });

const INGEST = siteConfig.sdk.ingestUrl;

const S = {
  install: `npm install ${siteConfig.sdk.package}`,
  browser: `import { YOM } from '@yourownmetric/sdk'

YOM.init({
  apiKey: 'yom_pk_live_…',          // publishable key from your dashboard
  consent: { default: 'unknown' },  // cookieless until granted
  autoCapture: {
    pageviews: true,
    engagement: true,
    errors: true,
    performance: true,
    ecommerce: true,
  },
})

// Call from your consent banner / CMP
YOM.setConsent({ analytics: true, marketing: false })`,
  conversions: `// GA4-aligned ecommerce helpers
YOM.ecommerce.viewItem({ item_id: 'SKU-1', price: 20 })
YOM.ecommerce.addToCart({ item_id: 'SKU-1', price: 20 }, 2)
YOM.ecommerce.purchase({
  transaction_id: '1043',
  value: 212.0,
  currency: 'USD',
})

// Lead / form conversion — never put contact details in the browser event
YOM.lead('contact-form')

// Any custom event (snake_case, up to 64 chars)
YOM.track('trial_started', { plan: 'pro' })`,
  react: `import { YOMProvider, PageTracker, useTrack } from '@yourownmetric/sdk/react'

export function App() {
  return (
    <YOMProvider config={{ apiKey: 'yom_pk_live_…', consent: { default: 'unknown' } }}>
      <PageTracker />
      {/* your routes */}
    </YOMProvider>
  )
}

function BuyButton() {
  const track = useTrack()
  return <button onClick={() => track('cta_click', { id: 'buy' })}>Buy</button>
}`,
  server: `import { YOMServer } from '@yourownmetric/sdk/node'

const yom = new YOMServer({
  secretKey: process.env.YOM_SECRET_KEY,   // yom_sk_… with the server scope
  // auth: 'hmac', keyId: 'key_…',         // sign instead of sending the key
})

yom.track({
  event: 'purchase',
  id: 'order-1043',                        // stable id = safe retries
  subTenant: 'client-a',                   // optional: platforms & agencies
  params: { transaction_id: '1043', value: 212.0, currency: 'USD' },
})

// Lead details belong server-side, where they can reach your CRM
yom.track({ event: 'generate_lead', params: { form_id: 'demo', email } })

process.on('SIGTERM', async () => {
  await yom.shutdown()                     // flushes the queue
})`,
  curl: `curl -X POST ${INGEST}/v2/events \\
  -H "Authorization: Bearer $YOM_SECRET_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "v": 2,
    "events": [{
      "e": "purchase",
      "t": 1760960000000,
      "id": "order-1043",
      "p": { "transaction_id": "1043", "value": 212.0, "currency": "USD" }
    }]
  }'`,
  hmac: `# HMAC instead of a bearer key: sign "<unix-ts>.<raw body>" with your secret key
BODY='{"v":2,"events":[{"e":"sign_up","t":1760960000000,"id":"u-88"}]}'
TS=$(date +%s)
SIG=$(printf '%s.%s' "$TS" "$BODY" | openssl dgst -sha256 -hmac "$YOM_SECRET_KEY" -hex | sed 's/^.* //')

curl -X POST ${INGEST}/v2/events \\
  -H "YOM-Key-Id: $YOM_KEY_ID" \\
  -H "YOM-Signature: t=$TS,v1=$SIG" \\
  -H "Content-Type: application/json" \\
  -d "$BODY"`,
  verify: `import { verifyWebhook } from '@yourownmetric/sdk/node'

export async function POST(req: Request) {
  const raw = await req.text()                       // the RAW body, before JSON.parse
  const ok = await verifyWebhook(
    process.env.YOM_WEBHOOK_SECRET,                  // whsec_… shown once at creation
    req.headers.get('yom-signature'),
    raw,
  )
  if (!ok) return new Response('bad signature', { status: 401 })

  const eventId = req.headers.get('yom-event-id')    // stable across retries
  // if (await seen(eventId)) return new Response('ok')  ← dedupe here
  const payload = JSON.parse(raw)
  return new Response('ok')
}`,
  verifyManual: `import { createHmac, timingSafeEqual } from 'node:crypto'

// YOM-Signature: t=<unix>,v1=<hex hmac_sha256(secret, t + "." + body)>
export function verify(secret: string, header: string, rawBody: string) {
  const parts = Object.fromEntries(header.split(',').map((p) => p.trim().split('=')))
  const t = Number(parts.t)
  if (!t || Math.abs(Date.now() / 1000 - t) > 300) return false   // 5-minute tolerance
  const expected = createHmac('sha256', secret).update(\`\${t}.\${rawBody}\`).digest('hex')
  const given = Buffer.from(parts.v1 ?? '', 'hex')
  return given.length === 32 && timingSafeEqual(given, Buffer.from(expected, 'hex'))
}`,
};

function Step({ n, id, title, children }: { n: string; id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-24 rule-top">
      <div className="container-y section-tight grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="eyebrow">
            <span className="tt-num text-primary">{n}</span>
          </p>
          <h2 id={`${id}-h`} className="tt-h2 mt-3 text-balance">
            {title}
          </h2>
        </div>
        <div className="min-w-0 space-y-5">{children}</div>
      </div>
    </section>
  );
}

export default function DevelopersPage() {
  return (
    <>
      <JsonLd page={{ path: '/developers', title: TITLE, description: DESCRIPTION }} />
      <PageHero
        eyebrow="Developers"
        title="A few lines to collect. One header to prove it came from you."
        lead={
          <>
            One npm package for browser, React and Node: <code className="font-mono text-[0.9em]">{siteConfig.sdk.package}</code>{' '}
            v{siteConfig.sdk.version}. Zero dependencies, around 12 KB gzipped with every plugin.
          </>
        }
        trail={[{ name: TITLE, path: '/developers' }]}
      >
        <PrimaryCta id="dev-hero" />
        <GhostLink href={`https://www.npmjs.com/package/${siteConfig.sdk.package}`}>View on npm</GhostLink>
      </PageHero>

      <Step n="01" id="install" title="Install and initialise">
        <CodeBlock code={S.install} label="terminal" lang="shell" />
        <CodeBlock code={S.browser} label="analytics.ts" lang="TypeScript" />
        <p className="text-muted">
          Until <code className="font-mono">setConsent</code> grants analytics, the SDK keeps no persistent id and
          writes nothing to storage. DNT and Global Privacy Control are treated as denied unless you opt out of that
          behaviour. Batches go out as <code className="font-mono">text/plain</code> through{' '}
          <code className="font-mono">sendBeacon</code> on page hide, with a <code className="font-mono">fetch(keepalive)</code> fallback.
        </p>
      </Step>

      <Step n="02" id="conversions" title="Track conversions the GA4 way">
        <CodeBlock code={S.conversions} label="checkout.ts" lang="TypeScript" />
        <p className="text-muted">
          Event names follow the GA4 taxonomy, so existing GA4 events map across by name.{' '}
          <code className="font-mono">purchase</code>, <code className="font-mono">refund</code>,{' '}
          <code className="font-mono">generate_lead</code>, <code className="font-mono">form_submit</code> and{' '}
          <code className="font-mono">sign_up</code> are counted exactly and deduplicated on the event id.
        </p>
      </Step>

      <Step n="03" id="react" title="React">
        <CodeBlock code={S.react} label="App.tsx" lang="React" />
      </Step>

      <Step n="04" id="server" title="Send conversions from your server">
        <CodeBlock code={S.server} label="server.ts" lang="Node" />
        <p className="text-muted">
          Server events keep the details you send (that&rsquo;s how lead data reaches a CRM through your
          destinations), are batched per sub-tenant, retried with backoff, and carry stable ids so destinations can
          dedupe.
        </p>
      </Step>

      <Step n="05" id="http" title="Or call the HTTP API directly">
        <CodeBlock code={S.curl} label="bearer auth" lang="curl" />
        <CodeBlock code={S.hmac} label="HMAC auth" lang="shell" />
        <p className="text-muted">≤ 50 events or 64 KB per request. 429 and 5xx are safe to retry with the same ids.</p>
      </Step>

      <Step n="06" id="webhooks" title="Verify signed webhooks">
        <CodeBlock code={S.verify} label="app/api/yom/route.ts" lang="TypeScript" />
        <p className="text-muted">Not using the SDK? The signature is plain HMAC-SHA256:</p>
        <CodeBlock code={S.verifyManual} label="verify.ts" lang="Node" />
        <div className="rounded-lg border border-border p-5 text-[0.95rem]">
          <p className="font-semibold">Headers on every delivery</p>
          <ul className="mt-3 space-y-1.5 font-mono text-[0.84rem] text-muted">
            <li>YOM-Signature: t=&lt;unix&gt;,v1=&lt;hex&gt;</li>
            <li>YOM-Event-Id: &lt;stable across retries&gt;</li>
          </ul>
          <p className="mt-3 text-muted">
            Platforms can replace the <span className="font-mono">YOM-</span> prefix and user agent with their own
            brand. Failed deliveries retry for about 24 hours, with a delivery log and redelivery.
          </p>
        </div>
      </Step>

      <section aria-labelledby="soon-h" className="rule-top">
        <div className="container-y section-tight grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <h2 id="soon-h" className="tt-h2 text-balance">Next for developers</h2>
          <ul className="divide-y divide-border border-y border-border">
            {['MCP server over the report API', 'Shopify app (Customer Events pixel + order webhooks)', 'Meta CAPI and GA4 Measurement Protocol destinations', 'Warehouse sync'].map((t) => (
              <li key={t} className="flex items-center justify-between gap-4 py-3.5">
                <span>{t}</span>
                <ComingSoon />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title="Get a key. Send your first event." lead="Sign up free, create a project, copy the publishable key. No credit card." secondary={{ href: '/product', label: 'Product overview' }} />
    </>
  );
}

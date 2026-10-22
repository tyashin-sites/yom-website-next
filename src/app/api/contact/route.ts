import { NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';

/**
 * Contact / demo-request lead pipeline (reference implementation pattern).
 *
 * POST /api/contact
 *  1. Validates the payload (name + email required).
 *  2. ALWAYS logs the lead with a `LEAD:` prefix so nothing is lost
 *     (`wrangler tail` / Cloudflare logs).
 *  3. When a TYASHIN_API_KEY binding exists, forwards in the background to the
 *     Tyashin **Contact Form & Lead Capture** plugin
 *     (`/api/v1/contact/public/submit`, X-API-Key auth). The plugin owns the
 *     inbox, CRM sync, email and Slack destinations — this route invents none.
 *     Until the plugin is installed on the project the forward is a no-op
 *     (docs/ASSET-DEBT.md #3).
 *  4. Honeypot field `website` silently drops bots.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TOPICS = ['Demo', 'Pricing', 'Agency / multi-client', 'Platform / embedding', 'Privacy & security', 'Other'];

function str(v: unknown, max: number): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  if (str(body.website, 200)) return NextResponse.json({ ok: true }); // honeypot

  const name = str(body.name, 100);
  const email = str(body.email, 200);
  const company = str(body.company, 200);
  const topicRaw = str(body.topic, 60);
  const topic = TOPICS.includes(topicRaw) ? topicRaw : 'Other';
  const volume = str(body.volume, 60);
  const message = str(body.message, 5000);

  if (!name) return NextResponse.json({ ok: false, error: 'Please add your name.' }, { status: 400 });
  if (!email || !EMAIL_RE.test(email))
    return NextResponse.json({ ok: false, error: 'Please add a valid work email.' }, { status: 400 });

  const lead = { name, email, company: company || undefined, topic, volume: volume || undefined, message: message || undefined, submittedAt: new Date().toISOString() };
  console.log('LEAD:', JSON.stringify(lead));

  try {
    const { env, ctx } = getCloudflareContext();
    const e = env as Record<string, unknown>;
    const apiKey = e.TYASHIN_API_KEY ?? process.env.TYASHIN_API_KEY;
    const apiUrl = (e.TYASHIN_API_URL ?? process.env.TYASHIN_API_URL ?? 'https://website-api.tyashin.com') as string;
    if (typeof apiKey === 'string' && apiKey.length > 0) {
      const forward = fetch(`${apiUrl}/api/v1/contact/public/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
        body: JSON.stringify({
          name,
          email,
          company: company || undefined,
          category: topic,
          subject: `YOM website — ${topic}`,
          message: [message, volume ? `Monthly events: ${volume}` : ''].filter(Boolean).join('\n\n') || undefined,
          source: 'yom-website-contact',
          pageUrl: request.headers.get('referer') || undefined,
          metadata: { company, topic, volume },
        }),
      })
        .then((res) => {
          if (!res.ok) console.log(`LEAD: platform forward failed (${res.status}); lead preserved above`);
        })
        .catch((err) => console.log(`LEAD: platform forward errored (${String(err)}); lead preserved above`));
      ctx.waitUntil(forward);
    } else {
      console.log('LEAD: no TYASHIN_API_KEY binding; log-only');
    }
  } catch {
    console.log('LEAD: no Cloudflare context; log-only');
  }

  return NextResponse.json({ ok: true });
}

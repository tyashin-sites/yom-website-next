import { NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { GRIEVANCE_EMAIL, parseGrievance, toContactSubmission } from '@/lib/grievance';

/**
 * Grievance complaints (POST /api/grievance), from the form on /grievance and /grievance/hi.
 *
 * Unlike /api/contact this waits for the Tyashin Contact Form plugin to store
 * the complaint, because the reply carries the reference number the IT Rules
 * acknowledgement needs: the plugin's submission id, shown as GRV-<id>. The
 * plugin emails the team, so the complaint reaches the Grievance Officer the
 * same way contact leads do. If the plugin cannot be reached, the whole
 * complaint is logged with a GRIEVANCE_UNDELIVERED: prefix so it is never lost,
 * and the visitor is asked to email contact@aapastech.com instead.
 */
const SITE = 'yom.aapastech.com';

function resolveTyashin(): { apiKey?: string; endpoint: string } {
  let env: Record<string, unknown> = {};
  try {
    env = getCloudflareContext().env as Record<string, unknown>;
  } catch {
    // No Cloudflare context (e.g. plain next dev): fall back to process.env.
  }
  const apiKey = (env.TYASHIN_API_KEY ?? process.env.TYASHIN_API_KEY) as string | undefined;
  const apiUrl = (env.TYASHIN_API_URL ?? process.env.TYASHIN_API_URL ?? 'https://website-api.tyashin.com') as string;
  return { apiKey: apiKey || undefined, endpoint: `${apiUrl.replace(/\/+$/, '')}/api/v1/contact/public/submit` };
}

function undelivered(reason: string, submission: object) {
  console.log('GRIEVANCE_UNDELIVERED:', JSON.stringify({ reason, ...submission }));
  return NextResponse.json(
    { ok: false, error: `We could not send this. Please email it to ${GRIEVANCE_EMAIL}.` },
    { status: 502 }
  );
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields; accept silently so they don't retry.
  if (typeof body.website === 'string' && body.website.trim()) {
    return NextResponse.json({ ok: true, reference: null });
  }

  const parsed = parseGrievance(body);
  if (!parsed.ok) return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  const g = parsed.value;
  const submission = toContactSubmission(g, SITE, request.headers.get('referer') || undefined);

  const { apiKey, endpoint } = resolveTyashin();
  if (!apiKey) return undelivered('no-api-key', submission);

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
      body: JSON.stringify(submission),
    });
    const data = (await res.json().catch(() => ({}))) as { success?: boolean; data?: { id?: string | number } };
    const id = data.data?.id;
    if (!res.ok || !data.success || id === undefined || id === null) {
      return undelivered(`status-${res.status}`, submission);
    }
    const reference = `GRV-${id}`;
    console.log('GRIEVANCE:', JSON.stringify({ reference, category: g.categoryId, contentUrl: g.contentUrl || undefined, lang: g.lang }));
    return NextResponse.json({ ok: true, reference });
  } catch (err) {
    return undelivered(`fetch-error: ${String(err)}`, submission);
  }
}

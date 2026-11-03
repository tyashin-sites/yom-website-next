import { NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { siteConfig } from '@/config/site';
import {
  grievanceError,
  grievanceLogFields,
  parseGrievance,
  toContactSubmission,
  type GrievanceInput,
} from '@/lib/grievance';

/**
 * Grievance complaints (POST /api/grievance), from the form on /grievance and /grievance/hi.
 *
 * Unlike /api/contact this waits for the Tyashin Contact Form plugin to store
 * the complaint, because the reply carries the reference number the IT Rules
 * acknowledgement needs: the plugin's submission id, shown as GRV-<id>. The
 * plugin emails the team, so the complaint reaches the Grievance Officer the
 * same way contact leads do. If the plugin cannot be reached the visitor is
 * asked to email contact@aapastech.com instead. Log lines carry only the
 * category and language (grievanceLogFields), never the complainant's details
 * or the complaint text.
 */
const SITE = new URL(siteConfig.url).host;

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

function undelivered(reason: string, g: GrievanceInput) {
  console.log('GRIEVANCE_UNDELIVERED:', JSON.stringify({ reason, ...grievanceLogFields(g) }));
  return NextResponse.json({ ok: false, error: grievanceError('undelivered', g.lang) }, { status: 502 });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: grievanceError('invalid', 'en') }, { status: 400 });
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
  if (!apiKey) return undelivered('no-api-key', g);

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
      body: JSON.stringify(submission),
    });
    const data = (await res.json().catch(() => ({}))) as { success?: boolean; data?: { id?: string | number } };
    const id = data.data?.id;
    if (!res.ok || !data.success || id === undefined || id === null) {
      return undelivered(`status-${res.status}`, g);
    }
    const reference = `GRV-${id}`;
    console.log('GRIEVANCE:', JSON.stringify({ reference, ...grievanceLogFields(g) }));
    return NextResponse.json({ ok: true, reference });
  } catch (err) {
    return undelivered(`fetch-error: ${err instanceof Error ? err.name : 'unknown'}`, g);
  }
}

import { NextResponse } from 'next/server'

/** Upstream CRM lead endpoint (same target the legacy site posts to). */
const CRM_ENDPOINT = 'https://crm.otium.ge/rest/local/callRequestAPI.php'

interface CrmPayload {
  name: string
  phone: string
  project: string
  source: string
  lead_form_submit: string
  answers?: Record<string, unknown>
}

/**
 * Server-side proxy to the CRM, mirroring the legacy Laravel `CrmController`.
 * Keeps the browser same-origin (no CORS) and hides the upstream URL. Both the
 * `#contact` section and the Request-a-Call modal reach the CRM through here.
 */
export async function POST(request: Request) {
  let body: Partial<CrmPayload>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid body' }, { status: 400 })
  }

  const phone = (body.phone ?? '').trim()
  // Name is optional: the inline slider widget captures phone only, so fall back
  // to the phone number as the display name for those quick-call leads.
  const name = (body.name ?? '').trim() || phone
  if (phone.length < 5) {
    return NextResponse.json({ success: false, message: 'Phone is required' }, { status: 422 })
  }

  const payload: CrmPayload = {
    name,
    phone,
    project: body.project || '4969',
    source: body.source || 'landing',
    lead_form_submit: 'true',
    ...(body.answers ? { answers: body.answers } : {}),
  }

  try {
    const upstream = await fetch(CRM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(30_000),
    })
    if (!upstream.ok) {
      return NextResponse.json({ success: false, message: 'Failed to submit request' }, { status: 502 })
    }
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false, message: 'CRM request failed' }, { status: 500 })
  }
}

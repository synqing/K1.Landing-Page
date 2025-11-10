import { NextResponse } from 'next/server'
import { appendWaitlist, readWaitlist, type WaitlistEntry } from '@/lib/storage'
import { rateLimit, getRateLimitIdentifier } from '@/lib/rate-limit'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function GET() {
  const list = await readWaitlist()
  const last = list.slice(-20).map((e) => ({
    emailMasked: e.email.replace(/(^.).*(@.*$)/, '$1***$2'),
    ts: e.ts,
  }))
  return NextResponse.json({ count: list.length, last })
}

export async function POST(req: Request) {
  // Rate limiting: 5 requests per minute per IP
  const identifier = getRateLimitIdentifier(req)
  if (!rateLimit(identifier, { max: 5, window: 60000 })) {
    return NextResponse.json({ error: 'rate_limit_exceeded' }, { status: 429 })
  }

  try {
    const body = await req.json()
    const email = String(body?.email ?? '').trim().toLowerCase()

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
    }

    // Check for duplicates
    const list = await readWaitlist()
    const exists = list.some(e => e.email.toLowerCase() === email)

    if (exists) {
      return NextResponse.json({ error: 'already_subscribed' }, { status: 409 })
    }

    const entry: WaitlistEntry = { email, ts: Date.now() }
    await appendWaitlist(entry)
    return NextResponse.json({ ok: true, ts: entry.ts })
  } catch (error) {
    console.error('[waitlist] POST failed:', error)
    return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  }
}

import { NextResponse } from 'next/server'
import { appendWaitlist, readWaitlist, type WaitlistEntry } from '@/lib/storage'
import { rateLimit, getRateLimitIdentifier } from '@/lib/rate-limit'

/**
 * Validates if a given string is a correctly formatted email address.
 * @param {string} email - The email address to validate.
 * @returns {boolean} `true` if the email is valid, `false` otherwise.
 */
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Handles GET requests to the `/api/waitlist` endpoint.
 *
 * This function retrieves the waitlist, returning the total count of entries
 * and a list of the 20 most recent submissions with masked email addresses.
 *
 * @returns {Promise<NextResponse>} A promise that resolves to the response.
 */
export async function GET() {
  const list = await readWaitlist()
  const last = list.slice(-20).map((e) => ({
    emailMasked: e.email.replace(/(^.).*(@.*$)/, '$1***$2'),
    ts: e.ts,
  }))
  return NextResponse.json({ count: list.length, last })
}

/**
 * Handles POST requests to the `/api/waitlist` endpoint.
 *
 * This function adds a new email to the waitlist. It performs validation
 * to ensure the email is correctly formatted and checks for duplicates.
 * The endpoint is rate-limited to prevent abuse.
 *
 * @param {Request} req - The incoming request object.
 * @returns {Promise<NextResponse>} A promise that resolves to the response,
 * indicating success or failure.
 */
export async function POST(req:Request) {
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

import { NextResponse } from 'next/server'
import { appendWaitlist, readWaitlist, type WaitlistEntry } from '@/lib/storage'

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
  try {
    const body = await req.json()
    const email = String(body?.email ?? '').trim()
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
    }
    const entry: WaitlistEntry = { email, ts: Date.now() }
    await appendWaitlist(entry)
    return NextResponse.json({ ok: true, ts: entry.ts })
  } catch {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  }
}

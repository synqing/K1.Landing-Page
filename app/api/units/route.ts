import { NextResponse } from 'next/server'
import { readFile, writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { rateLimit, getRateLimitIdentifier } from '@/lib/rate-limit'

export async function GET() {
  try {
    const p = join(process.cwd(), 'public', 'data', 'units.json')
    const raw = await readFile(p, 'utf-8')
    const data = JSON.parse(raw)
    return NextResponse.json(data)
  } catch (error) {
    console.error('[units] GET failed:', error)
    return NextResponse.json({ unitsTotal: 100, unitsSold: 0, error: 'fallback' })
  }
}

export async function POST(req: Request) {
  // Authentication check (server-side only)
  const authHeader = req.headers.get('authorization')
  const serverKey = process.env.ADMIN_KEY // NOT NEXT_PUBLIC_

  if (!serverKey || authHeader !== `Bearer ${serverKey}`) {
    console.warn('[units] Unauthorized POST attempt')
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  // Rate limiting: 10 requests per minute
  const identifier = getRateLimitIdentifier(req)
  if (!rateLimit(identifier, { max: 10, window: 60000 })) {
    return NextResponse.json({ error: 'rate_limit_exceeded' }, { status: 429 })
  }

  try {
    const body = await req.json()
    const total = Number.isFinite(body?.unitsTotal) ? Number(body.unitsTotal) : undefined
    const sold = Number.isFinite(body?.unitsSold) ? Number(body.unitsSold) : undefined
    if (total !== undefined && (total < 0 || !Number.isInteger(total))) {
      return NextResponse.json({ error: 'invalid_unitsTotal' }, { status: 400 })
    }
    if (sold !== undefined && (!Number.isInteger(sold) || sold < 0)) {
      return NextResponse.json({ error: 'invalid_unitsSold' }, { status: 400 })
    }
    const p = join(process.cwd(), 'public', 'data', 'units.json')
    await mkdir(join(process.cwd(), 'public', 'data'), { recursive: true })
    let current = { unitsTotal: 100, unitsSold: 0, lastUpdated: new Date().toISOString() }
    try {
      const raw = await readFile(p, 'utf-8')
      current = JSON.parse(raw)
    } catch (error) {
      console.error('[units] Current read failed:', error)
    }
    const next = {
      ...current,
      ...(total !== undefined ? { unitsTotal: total } : {}),
      ...(sold !== undefined ? { unitsSold: sold } : {}),
      lastUpdated: new Date().toISOString(),
    }
    if (next.unitsSold > next.unitsTotal) {
      return NextResponse.json({ error: 'sold_exceeds_total' }, { status: 400 })
    }
    await writeFile(p, JSON.stringify(next, null, 2), 'utf-8')
    return NextResponse.json(next)
  } catch (error) {
    console.error('[units] POST failed:', error)
    return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  }
}

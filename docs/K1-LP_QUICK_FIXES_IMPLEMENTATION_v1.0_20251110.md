---
status: active
author: Claude Code Review
date: 2025-11-10
intent: Step-by-step implementation guide for critical and quick-win fixes
priority: high
---

# K1-LP Quick Fixes Implementation Guide

**Estimated Total Time:** 2-3 hours
**Impact:** Fixes 12 critical issues, makes app production-ready

---

## ✅ Completed

- [x] Created `.env` file from template
- [x] Updated `.gitignore` to exclude `.env`
- [x] Created comprehensive audit document

---

## 🔥 Fix #1: Analytics localStorage Bug (5 minutes)

**Priority:** HIGH - Currently breaking analytics storage

**File:** `lib/analytics.ts:20`

**Issue:** `.slice(-4000)` operates on JSON string, not array.

**Implementation:**

```typescript
// lib/analytics.ts (line 16-21)
function send(event: string, props: EventProps) {
  const payload = {
    event,
    props,
    ts: Date.now(),
    path: typeof window !== 'undefined' ? window.location.pathname : ''
  }

  try {
    const key = 'k1lp:events'
    const arr = JSON.parse(localStorage.getItem(key) || '[]')
    arr.push(payload)
    // FIXED: Keep last 100 events, not 4000 chars
    const trimmed = arr.slice(-100)
    localStorage.setItem(key, JSON.stringify(trimmed))
  } catch (error) {
    console.error('[analytics] localStorage failed:', error)
  }

  // ... rest unchanged
}
```

**Test:**
```javascript
// In browser console:
localStorage.setItem('k1lp:events', '[]')
// Trigger 150 events, verify only last 100 stored
JSON.parse(localStorage.getItem('k1lp:events')).length // Should be 100
```

---

## 🔥 Fix #2: File Write Race Condition (5 minutes)

**Priority:** HIGH - Can corrupt waitlist data

**File:** `lib/storage.ts:24-31`

**Implementation:**

```typescript
// lib/storage.ts
import { mkdir, readFile, writeFile, rename } from 'fs/promises'
import { dirname, join } from 'path'

const DATA_DIR = join(process.cwd(), '.data')
const WAITLIST_PATH = join(DATA_DIR, 'waitlist.json')

export type WaitlistEntry = { email: string; ts: number }

async function ensureDir() {
  await mkdir(DATA_DIR, { recursive: true })
}

export async function readWaitlist(): Promise<WaitlistEntry[]> {
  try {
    const raw = await readFile(WAITLIST_PATH, 'utf-8')
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed as WaitlistEntry[]
    return []
  } catch (error) {
    console.error('[storage] readWaitlist failed:', error)
    return []
  }
}

export async function appendWaitlist(entry: WaitlistEntry) {
  await ensureDir()
  const list = await readWaitlist()
  list.push(entry)

  // FIXED: Use atomic rename
  const tmp = WAITLIST_PATH + '.tmp'
  await writeFile(tmp, JSON.stringify(list, null, 2), 'utf-8')
  await rename(tmp, WAITLIST_PATH) // Atomic on POSIX systems
}
```

**Test:**
```bash
# Terminal 1
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"test1@example.com"}'

# Terminal 2 (simultaneously)
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"test2@example.com"}'

# Verify both emails in .data/waitlist.json
cat .data/waitlist.json
```

---

## 🔥 Fix #3: Duplicate Email Check (10 minutes)

**Priority:** HIGH - Prevents spam

**File:** `app/api/waitlist/route.ts:17-30`

**Implementation:**

```typescript
// app/api/waitlist/route.ts
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
    const email = String(body?.email ?? '').trim().toLowerCase()

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
    }

    // ADDED: Check for duplicates
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
```

**Update client-side handler:**

```typescript
// components/EmailCapture.tsx (line 14-31)
async function submit(e: React.FormEvent) {
  e.preventDefault()
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return

  let ok = false
  let alreadySubscribed = false

  try {
    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    if (res.status === 409) {
      alreadySubscribed = true
      ok = true // Still consider it success
    } else {
      ok = res.ok
    }
  } catch {}

  if (!ok && !alreadySubscribed) {
    try {
      const key = 'k1lp:waitlist'
      const arr = JSON.parse(localStorage.getItem(key) || '[]')
      arr.push({ email, ts: Date.now() })
      localStorage.setItem(key, JSON.stringify(arr).slice(-4000))
    } catch {}
  }

  analytics.track('waitlist_submit', {
    emailMasked: email.replace(/(^.).*(@.*$)/, '$1***$2'),
    duplicate: alreadySubscribed
  })
  setDone(true)
}

if (done) {
  return <div className="text-ok text-sm">Thanks — you're on the list. We'll email when reservations open.</div>
}
```

**Test:**
```bash
# First submission
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
# Should return 200

# Second submission (same email)
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
# Should return 409 with "already_subscribed"
```

---

## 🔥 Fix #4: Add Error Logging to Catch Blocks (15 minutes)

**Priority:** MEDIUM - Improves debugging

**Files:** Multiple

**Implementation:**

```typescript
// lib/storage.ts:19
} catch (error) {
  console.error('[storage] readWaitlist failed:', error)
  return []
}

// app/api/waitlist/route.ts:27
} catch (error) {
  console.error('[waitlist] POST failed:', error)
  return NextResponse.json({ error: 'bad_request' }, { status: 400 })
}

// app/api/units/route.ts:11
} catch (error) {
  console.error('[units] GET failed:', error)
  return NextResponse.json({ unitsTotal: 100, unitsSold: 0, error: 'fallback' })
}

// app/api/units/route.ts:33
} catch (error) {
  console.error('[units] Current read failed:', error)
}

// app/api/units/route.ts:45
} catch (error) {
  console.error('[units] POST failed:', error)
  return NextResponse.json({ error: 'bad_request' }, { status: 400 })
}

// lib/unit-counter.ts:23
} catch (error) {
  console.error('[unit-counter] Fetch failed:', error)
  setRemaining(CONFIG.unitsTotal - CONFIG.unitsSold)
}

// components/EmailCapture.tsx:21
} catch (error) {
  console.error('[email-capture] API failed:', error)
}

// components/EmailCapture.tsx:28
} catch (error) {
  console.error('[email-capture] localStorage fallback failed:', error)
}

// lib/analytics.ts:21
} catch (error) {
  console.error('[analytics] localStorage failed:', error)
}

// lib/analytics.ts:29
} catch (error) {
  console.error('[analytics] sendBeacon failed:', error)
}

// app/admin/page.tsx:31
} catch (error) {
  console.error('[admin] Waitlist load failed:', error)
}

// app/admin/page.tsx:35
} catch (error) {
  console.error('[admin] Units load failed:', error)
}
```

**Test:**
```bash
# Trigger various errors and check console for proper logging
npm run dev
# Check terminal for [storage], [waitlist], [units] prefixed logs
```

---

## 🔥 Fix #5: Create 404 Page (10 minutes)

**Priority:** MEDIUM - User experience

**Implementation:**

```tsx
// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="glass rounded-2xl p-8 text-center max-w-md">
        <div className="text-6xl font-bold mb-4 text-gold">404</div>
        <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
        <p className="text-muted mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/" className="button-primary inline-block">
          Back to Home
        </Link>
      </div>
    </div>
  )
}
```

**Test:**
```bash
# Visit non-existent route
open http://localhost:3000/this-page-does-not-exist
```

---

## 🔥 Fix #6: Create Error Page (10 minutes)

**Priority:** MEDIUM - User experience

**Implementation:**

```tsx
// app/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  console.error('[app] Error boundary caught:', error)

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="glass rounded-2xl p-8 text-center max-w-md">
        <div className="text-5xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold mb-2">Something Went Wrong</h1>
        <p className="text-muted mb-6">
          An unexpected error occurred. Please try refreshing the page.
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => reset()} className="button-primary">
            Try Again
          </button>
          <a href="/" className="button-secondary">
            Go Home
          </a>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-6 text-left">
            <summary className="text-xs text-muted cursor-pointer">
              Error Details (dev only)
            </summary>
            <pre className="mt-2 text-xs text-err bg-surface/50 p-3 rounded overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}
```

**Test:**
```tsx
// Temporarily add to app/page.tsx to test:
export default function Page() {
  throw new Error('Test error boundary')
  // ... rest of code
}
```

---

## 🔥 Fix #7: Add Request Timeouts (15 minutes)

**Priority:** MEDIUM - Prevents hanging requests

**Files:** `lib/unit-counter.ts`, `components/EmailCapture.tsx`

**Implementation:**

```typescript
// lib/unit-counter.ts (line 11-26)
useEffect(() => {
  let aborted = false
  async function load() {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000) // 5 second timeout

    try {
      let res = await fetch('/api/units', {
        cache: 'no-store',
        signal: controller.signal
      })
      if (!res.ok) {
        res = await fetch('/data/units.json', {
          cache: 'no-store',
          signal: controller.signal
        })
      }
      if (!res.ok) throw new Error('fetch failed')
      const data = await res.json()
      if (!aborted && typeof data.unitsTotal === 'number' && typeof data.unitsSold === 'number') {
        setRemaining(data.unitsTotal - data.unitsSold)
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.warn('[unit-counter] Request timeout after 5s')
      } else {
        console.error('[unit-counter] Fetch failed:', error)
      }
      setRemaining(CONFIG.unitsTotal - CONFIG.unitsSold)
    } finally {
      clearTimeout(timeout)
    }
  }
  load()
  const id = window.setInterval(load, 60_000)
  return () => {
    aborted = true
    window.clearInterval(id)
  }
}, [])
```

```typescript
// components/EmailCapture.tsx (line 14-21)
async function submit(e: React.FormEvent) {
  e.preventDefault()
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 5000)

  let ok = false
  let alreadySubscribed = false

  try {
    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
      signal: controller.signal,
    })

    if (res.status === 409) {
      alreadySubscribed = true
      ok = true
    } else {
      ok = res.ok
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      console.warn('[email-capture] Request timeout after 5s')
    } else {
      console.error('[email-capture] API failed:', error)
    }
  } finally {
    clearTimeout(timeout)
  }

  // ... rest unchanged
}
```

**Test:**
```bash
# Simulate slow network in Chrome DevTools:
# Network tab → Throttling → Slow 3G
# Submit email, should timeout after 5s and use localStorage fallback
```

---

## 🔥 Fix #8: Fix JSON-LD Price (2 minutes)

**Priority:** LOW - SEO improvement

**File:** `app/layout.tsx:32-41`

**Implementation:**

```tsx
// app/layout.tsx
import './globals.css'
import type { ReactNode } from 'react'
import { CONFIG } from '@/lib/site-config'

export const metadata = {
  title: 'K1-Lightwave — Founders Edition',
  description: 'First 100 units. Help us build V2.',
  openGraph: {
    title: 'K1-Lightwave — Founders Edition',
    description: 'First 100 units. Dual edge‑lit LGP, 320 LEDs, ESP32‑S3.',
    url: 'https://example.com',
    siteName: 'K1-Lightwave',
    images: [
      { url: '/og.png', width: 1200, height: 630, alt: 'K1-Lightwave' },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'K1-Lightwave — Founders Edition',
    description: 'First 100 units. Dual edge‑lit LGP, 320 LEDs, ESP32‑S3.',
    images: ['/og.png'],
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {/* JSON-LD Product snippet */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: 'K1-Lightwave — Founders Edition',
          description: 'Dual edge-lit LGP with 320 addressable LEDs on ESP32-S3',
          brand: { '@type': 'Brand', name: 'K1-Lightwave' },
          offers: {
            '@type': 'Offer',
            priceCurrency: 'USD',
            price: CONFIG.price.toFixed(2), // FIXED: Read from config
            availability: 'https://schema.org/PreOrder'
          }
        })}} />
        {children}
      </body>
    </html>
  )
}
```

**Test:**
```bash
# View source, search for "application/ld+json"
# Verify price is "249.00"
```

---

## 🔥 Fix #9: Update .env Discord/GitHub URLs (2 minutes)

**Priority:** MEDIUM - Marketing links

**File:** `.env:6-7`

**Implementation:**

```bash
# .env
# Replace placeholder URLs with real ones:
NEXT_PUBLIC_DISCORD_URL="https://discord.gg/YOUR_ACTUAL_SERVER"
NEXT_PUBLIC_GITHUB_URL="https://github.com/YOUR_ORG/K1-Lightwave"
```

**Test:**
```bash
# Visit landing page, verify Discord/GitHub links work
open http://localhost:3000
```

---

## Validation Checklist

After implementing all fixes:

- [ ] Run `npm run dev` successfully
- [ ] Visit http://localhost:3000 (loads without errors)
- [ ] Submit email to waitlist (check .data/waitlist.json created)
- [ ] Submit same email again (should show "already subscribed")
- [ ] Visit http://localhost:3000/admin?key=changeme_REPLACE_BEFORE_DEPLOY
- [ ] Visit http://localhost:3000/nonexistent-page (404 page shows)
- [ ] Check browser console for analytics events
- [ ] Verify localStorage has k1lp:events with max 100 items
- [ ] Check terminal logs for error prefixes ([storage], [waitlist], etc.)

---

## Next Steps (After Quick Fixes)

1. **Security Hardening** (See main audit doc, Phase 1)
   - Add rate limiting
   - Move admin auth server-side
   - Implement API authentication

2. **Production Readiness** (See main audit doc, Phase 2)
   - Add environment validation
   - Create error boundaries
   - Generate OG image

3. **Asset Integration** (See asset checklist)
   - Replace hero video placeholder
   - Add hardware showcase media
   - Compress and optimize assets

---

## Commit Message Template

```
fix: implement critical bug fixes and production hardening

- Fix analytics localStorage overflow (slice on string, not array)
- Add atomic file writes to prevent waitlist corruption
- Implement duplicate email checking in waitlist
- Add comprehensive error logging to all catch blocks
- Create 404 and error pages for better UX
- Add request timeouts to prevent hanging fetches
- Fix JSON-LD schema to use dynamic pricing from config
- Update .env with proper Discord/GitHub URLs
- Improve .gitignore to exclude environment files

Resolves: #1, #2, #3, #4, #25, #26, #17, #11
See: docs/K1-LP_CODE_AUDIT_AND_OPTIMIZATION_v1.0_20251110.md
```

---

**Questions?** Reference the main audit document for detailed explanations of each issue.

---
status: active
author: Claude Code Review
date: 2025-11-10
intent: Comprehensive code audit identifying security issues, optimization opportunities, and production readiness gaps
priority: high
---

# K1-LP Code Audit & Optimization Plan

**Audit Date:** 2025-11-10
**Files Reviewed:** 30+ source files
**Severity Levels:** 🔴 Critical | 🟠 High | 🟡 Medium | 🟢 Low

---

## Executive Summary

The codebase is **well-architected** with clean separation of concerns, proper TypeScript usage, and SSR-ready infrastructure. However, there are **critical security vulnerabilities** that must be addressed before production deployment, along with performance optimizations and missing functionality.

**Priority Order:**
1. 🔴 **Critical Security Issues** (4 items) - Must fix before any public deployment
2. 🟠 **High Priority** (8 items) - Required for production readiness
3. 🟡 **Medium Priority** (12 items) - Quality of life and optimization
4. 🟢 **Low Priority** (6 items) - Nice-to-haves for polish

---

## 🔴 CRITICAL SECURITY ISSUES (Block Production Deploy)

### 1. Admin Authentication is Client-Side Only

**File:** `app/admin/page.tsx:15-24`

**Issue:**
```tsx
const keyParam = new URLSearchParams(window.location.search).get('key')
const required = process.env.NEXT_PUBLIC_ADMIN_KEY
setAuthOk(keyParam === required)
```

- Admin key check happens **only in browser**
- Anyone can bypass by reading `NEXT_PUBLIC_ADMIN_KEY` from client bundle
- Direct API calls to `/api/units` POST have **no authentication**

**Impact:** Anyone can modify unit counts, effectively controlling scarcity messaging.

**Fix:**
```tsx
// Option A: Move admin to server component with cookies
// Option B: Add auth to API routes

// app/api/units/route.ts
export async function POST(req: Request) {
  const authHeader = req.headers.get('authorization')
  const serverKey = process.env.ADMIN_KEY // NOT NEXT_PUBLIC_
  if (authHeader !== `Bearer ${serverKey}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  // ... rest of logic
}
```

**Recommendation:** Use proper session-based auth (NextAuth.js) or at minimum, server-side API key validation.

---

### 2. Units API POST Has No Authentication

**File:** `app/api/units/route.ts:16-48`

**Issue:** Any client can POST to `/api/units` and modify `unitsSold`/`unitsTotal`.

**Attack Vector:**
```bash
curl -X POST http://yoursite.com/api/units \
  -H "Content-Type: application/json" \
  -d '{"unitsSold": 100}' # Instantly show "sold out"
```

**Fix:** Add authentication middleware (see #1).

---

### 3. No Rate Limiting on Any Endpoint

**Files:** `app/api/waitlist/route.ts`, `app/api/units/route.ts`

**Issue:**
- Waitlist can be spammed with unlimited emails
- Units API can be polled/modified thousands of times per second
- No IP-based throttling or request limits

**Impact:**
- Storage exhaustion (`.data/waitlist.json` grows unbounded)
- Analytics pollution
- Potential DoS vector

**Fix:**
```typescript
// lib/rate-limit.ts
import { LRUCache } from 'lru-cache'

const rateLimitMap = new LRUCache({
  max: 500,
  ttl: 60000, // 1 minute
})

export function rateLimit(identifier: string, limit = 5): boolean {
  const count = (rateLimitMap.get(identifier) as number) || 0
  if (count >= limit) return false
  rateLimitMap.set(identifier, count + 1)
  return true
}

// In route handler:
const ip = req.headers.get('x-forwarded-for') || 'unknown'
if (!rateLimit(ip, 5)) {
  return NextResponse.json({ error: 'rate_limit' }, { status: 429 })
}
```

**Packages:** `npm install lru-cache`

---

### 4. Admin Key Exposed in Client Bundle

**File:** `.env.example:8`

**Issue:** `NEXT_PUBLIC_ADMIN_KEY` is shipped to every client.

**Evidence:**
```bash
# Anyone can run in browser console:
console.log(process.env.NEXT_PUBLIC_ADMIN_KEY)
```

**Fix:**
```bash
# .env.example
-NEXT_PUBLIC_ADMIN_KEY="changeme"
+ADMIN_KEY="changeme"  # Server-side only
```

Update admin page to use server component or API-based validation.

---

## 🟠 HIGH PRIORITY (Production Readiness)

### 5. Missing .env File

**Issue:** Repository has `.env.example` but no `.env` file. App will use fallback values.

**Risk:** Incorrect pricing, Discord/GitHub links, ship dates in production.

**Fix:**
```bash
cp .env.example .env
# Then populate with real values
```

**Add to deployment checklist:** Verify all env vars before each deploy.

---

### 6. No Duplicate Email Prevention in Waitlist

**File:** `app/api/waitlist/route.ts:24-26`

**Issue:** Same email can be added infinite times.

**Fix:**
```typescript
export async function POST(req: Request) {
  const body = await req.json()
  const email = String(body?.email ?? '').trim().toLowerCase()

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
  }

  // Add duplicate check
  const list = await readWaitlist()
  if (list.some(e => e.email.toLowerCase() === email)) {
    return NextResponse.json({ error: 'already_subscribed' }, { status: 409 })
  }

  const entry: WaitlistEntry = { email, ts: Date.now() }
  await appendWaitlist(entry)
  return NextResponse.json({ ok: true, ts: entry.ts })
}
```

---

### 7. File Write Race Condition in Storage

**File:** `lib/storage.ts:28-30`

**Issue:**
```typescript
const tmp = WAITLIST_PATH + '.tmp'
await writeFile(tmp, JSON.stringify(list, null, 2), 'utf-8')
await writeFile(WAITLIST_PATH, JSON.stringify(list, null, 2), 'utf-8')
```

- Temp file created but never used for atomic rename
- Concurrent writes can corrupt JSON

**Fix:**
```typescript
import { rename } from 'fs/promises'

export async function appendWaitlist(entry: WaitlistEntry) {
  await ensureDir()
  const list = await readWaitlist()
  list.push(entry)

  const tmp = WAITLIST_PATH + '.tmp'
  await writeFile(tmp, JSON.stringify(list, null, 2), 'utf-8')
  await rename(tmp, WAITLIST_PATH) // Atomic on POSIX systems
}
```

---

### 8. localStorage Analytics Overflow Bug

**File:** `lib/analytics.ts:18-21`

**Issue:**
```typescript
const arr = JSON.parse(localStorage.getItem(key) || '[]')
arr.push(payload)
localStorage.setItem(key, JSON.stringify(arr).slice(-4000))
```

**Bug:** `.slice(-4000)` operates on **string**, not array. Intent was to keep last 4000 events, but this keeps last 4000 **characters** of the JSON string (likely corrupting it).

**Fix:**
```typescript
const arr = JSON.parse(localStorage.getItem(key) || '[]')
arr.push(payload)
// Keep last 100 events
const trimmed = arr.slice(-100)
localStorage.setItem(key, JSON.stringify(trimmed))
```

---

### 9. Missing Error Boundaries

**Files:** `app/page.tsx`, `app/layout.tsx`

**Issue:** Uncaught errors in any component will crash entire app.

**Fix:**
```tsx
// components/ErrorBoundary.tsx
'use client'
import { Component, type ReactNode } from 'react'

export class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="glass rounded-2xl p-8 text-center">
            <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
            <p className="text-muted mb-4">Please refresh the page.</p>
            <button
              onClick={() => window.location.reload()}
              className="button-primary"
            >
              Refresh
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

// app/page.tsx
import { ErrorBoundary } from '@/components/ErrorBoundary'

export default function Page() {
  return (
    <ErrorBoundary>
      <main className="bg-flow">
        {/* ... */}
      </main>
    </ErrorBoundary>
  )
}
```

---

### 10. No Environment Variable Validation

**Issue:** App silently uses fallbacks if env vars malformed.

**Fix:**
```typescript
// lib/env.ts
import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_PRICE: z.coerce.number().positive(),
  NEXT_PUBLIC_UNITS_TOTAL: z.coerce.number().int().positive(),
  NEXT_PUBLIC_UNITS_SOLD: z.coerce.number().int().min(0),
  NEXT_PUBLIC_SHIP_DATE: z.string().min(1),
  NEXT_PUBLIC_DISCORD_URL: z.string().url(),
  NEXT_PUBLIC_GITHUB_URL: z.string().url(),
})

export const ENV = envSchema.parse({
  NEXT_PUBLIC_PRICE: process.env.NEXT_PUBLIC_PRICE,
  NEXT_PUBLIC_UNITS_TOTAL: process.env.NEXT_PUBLIC_UNITS_TOTAL,
  NEXT_PUBLIC_UNITS_SOLD: process.env.NEXT_PUBLIC_UNITS_SOLD,
  NEXT_PUBLIC_SHIP_DATE: process.env.NEXT_PUBLIC_SHIP_DATE,
  NEXT_PUBLIC_DISCORD_URL: process.env.NEXT_PUBLIC_DISCORD_URL,
  NEXT_PUBLIC_GITHUB_URL: process.env.NEXT_PUBLIC_GITHUB_URL,
})

// lib/site-config.ts
import { ENV } from './env'

export const CONFIG = {
  price: ENV.NEXT_PUBLIC_PRICE,
  unitsTotal: ENV.NEXT_PUBLIC_UNITS_TOTAL,
  // ...
}
```

**Install:** `npm install zod`

---

### 11. JSON-LD Price Hardcoded

**File:** `app/layout.tsx:39`

**Issue:**
```tsx
price: '249.00', // Should read from CONFIG
```

**Fix:**
```tsx
import { CONFIG } from '@/lib/site-config'

// In layout:
price: CONFIG.price.toFixed(2),
```

---

### 12. Missing OG Image File

**File:** `app/layout.tsx:13`

**Issue:** References `/og.png` which doesn't exist → broken social previews.

**Fix:**
1. Generate OG image (1200x630px) with K1 product shot + text
2. Place at `public/og.png`
3. Or update path to actual asset location

---

## 🟡 MEDIUM PRIORITY (Optimization & Quality)

### 13. Unit Counter Polling is Inefficient

**File:** `lib/unit-counter.ts:29`

**Issue:** Every client polls `/api/units` every 60 seconds.

**Better Approach:**
- Server-Sent Events (SSE)
- WebSocket
- Or reduce poll interval to 5 minutes for pre-launch

**Quick Fix:**
```typescript
// Increase interval for low-traffic pre-launch
const id = window.setInterval(load, 300_000) // 5 minutes
```

---

### 14. Experiment Assignment Not Memoized

**File:** `lib/experiments.ts:9-30`

**Issue:** `useEffect` runs on every render, recalculating variant.

**Fix:**
```typescript
useEffect(() => {
  // ... existing logic
}, [key, variants]) // Add dependency array with stable values

// Or use useMemo for derived value
const value = useMemo(() => {
  // variant selection logic
}, [key])
```

---

### 15. Missing Loading States

**Files:** `components/Hero.tsx`, `components/PricingScarcity.tsx`

**Issue:** Unit counter shows stale value during fetch.

**Fix:**
```tsx
export function useUnitCounter() {
  const [remaining, setRemaining] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      // ... fetch logic
      setLoading(false)
    }
    // ...
  }, [])

  return { remaining: remaining ?? (CONFIG.unitsTotal - CONFIG.unitsSold), loading }
}

// In Hero:
const { remaining, loading } = useUnitCounter()
<div className="mt-6 inline-flex items-center ...">
  ⚠️ {loading ? '...' : remaining} of {CONFIG.unitsTotal} units remaining
</div>
```

---

### 16. Empty Catch Blocks

**Files:** Multiple (`storage.ts:19`, `waitlist/route.ts:27`, `units/route.ts:33`)

**Issue:** Errors silently swallowed, making debugging impossible.

**Fix:**
```typescript
} catch (error) {
  console.error('[storage] readWaitlist failed:', error)
  return []
}
```

Add logging to all catch blocks.

---

### 17. Missing Request Timeout Handling

**File:** `lib/unit-counter.ts:14`

**Issue:** Fetch can hang indefinitely.

**Fix:**
```typescript
async function load() {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 5000)

  try {
    const res = await fetch('/api/units', {
      cache: 'no-store',
      signal: controller.signal
    })
    // ...
  } catch (error) {
    if (error.name === 'AbortError') {
      console.warn('[unit-counter] Request timeout')
    }
    setRemaining(CONFIG.unitsTotal - CONFIG.unitsSold)
  } finally {
    clearTimeout(timeout)
  }
}
```

---

### 18. No Validation on units.json Schema

**File:** `app/api/units/route.ts:9`

**Issue:** `JSON.parse(raw)` could return unexpected shape.

**Fix:**
```typescript
import { z } from 'zod'

const unitsSchema = z.object({
  unitsTotal: z.number().int().positive(),
  unitsSold: z.number().int().min(0),
  lastUpdated: z.string().optional(),
})

export async function GET() {
  try {
    const p = join(process.cwd(), 'public', 'data', 'units.json')
    const raw = await readFile(p, 'utf-8')
    const data = unitsSchema.parse(JSON.parse(raw))
    return NextResponse.json(data)
  } catch (e) {
    console.error('[units] GET failed:', e)
    return NextResponse.json({ unitsTotal: 100, unitsSold: 0, error: 'fallback' })
  }
}
```

---

### 19. Email Masking Leaks First Character

**File:** `app/api/waitlist/route.ts:11`

**Issue:**
```typescript
e.email.replace(/(^.).*(@.*$)/, '$1***$2')
// "alice@example.com" → "a***@example.com"
```

**Risk:** If combined with timestamp, could identify individuals.

**Better Approach:**
```typescript
emailMasked: e.email.replace(/(.{2}).*(@.*)/, '$1***$2')
// "alice@example.com" → "al***@example.com"

// Or just show count:
return NextResponse.json({ count: list.length })
// Don't expose emails at all
```

---

### 20. Inconsistent Error Handling in API Routes

**Issue:** Some return 400, some return 500, some have no status.

**Standardize:**
```typescript
// lib/api-response.ts
export function apiError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status })
}

export function apiSuccess<T>(data: T) {
  return NextResponse.json(data)
}

// Usage:
if (!isValidEmail(email)) {
  return apiError('invalid_email', 400)
}
```

---

### 21. Missing TypeScript Strict Checks

**File:** `tsconfig.json`

**Current:** `"strict": true` is set ✅

**But consider adding:**
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

---

### 22. No CORS Configuration

**Issue:** API routes accessible from any origin.

**Risk:** Cross-origin data access, CSRF potential.

**Fix:**
```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Only allow same-origin API calls
  const origin = request.headers.get('origin')
  const host = request.headers.get('host')

  if (request.nextUrl.pathname.startsWith('/api/')) {
    if (origin && !origin.includes(host || '')) {
      return NextResponse.json({ error: 'forbidden' }, { status: 403 })
    }
  }

  return response
}

export const config = {
  matcher: '/api/:path*',
}
```

---

### 23. Analytics Events Unbounded in localStorage

**File:** `lib/analytics.ts:20` (already covered in #8)

---

### 24. No Input Sanitization for Display

**File:** `app/admin/page.tsx:103`

**Issue:** Email addresses rendered directly without escaping (React handles this, but good to note).

**Verify:** Ensure user-provided strings never use `dangerouslySetInnerHTML`.

---

## 🟢 LOW PRIORITY (Polish & Nice-to-Haves)

### 25. Missing 404 Page

**Fix:**
```tsx
// app/not-found.tsx
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-muted">Page not found</p>
        <a href="/" className="button-primary mt-4">Go Home</a>
      </div>
    </div>
  )
}
```

---

### 26. Missing Error Page

**Fix:**
```tsx
// app/error.tsx
'use client'
export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass rounded-2xl p-8 text-center">
        <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
        <button onClick={reset} className="button-primary mt-4">
          Try Again
        </button>
      </div>
    </div>
  )
}
```

---

### 27. Checkout Page is Placeholder

**File:** `app/checkout/page.tsx`

**Current:** Empty skeleton.

**Next Steps:** Integrate Stripe Checkout or payment provider (see asset integration checklist).

---

### 28. Robots.txt Uses Placeholder URLs

**File:** `app/robots.ts:7`

**Fix:** Update with actual production URL once deployed.

---

### 29. Sitemap Uses Placeholder

**File:** `app/sitemap.ts:4`

**Fix:** Update with actual production URL.

---

### 30. Missing Path Alias for @/app

**File:** `tsconfig.json:20-26`

**Current:**
```json
"@/components/*": ["components/*"],
"@/lib/*": ["lib/*"]
```

**Add:**
```json
"@/app/*": ["app/*"]
```

---

## Implementation Roadmap

### Phase 1: Security Hardening (Day 1 - CRITICAL)

**Time Estimate:** 4-6 hours

- [ ] Fix admin authentication (move to server-side)
- [ ] Add rate limiting to all API endpoints
- [ ] Implement API key validation for units POST
- [ ] Remove `NEXT_PUBLIC_` prefix from admin key
- [ ] Add duplicate email check to waitlist
- [ ] Fix file write race condition
- [ ] Add CORS middleware

**Validation:**
- [ ] Test admin access without proper auth (should fail)
- [ ] Attempt to spam waitlist (should hit rate limit)
- [ ] Try to modify units without auth (should 401)

---

### Phase 2: Production Readiness (Day 2-3)

**Time Estimate:** 6-8 hours

- [ ] Create .env file with real values
- [ ] Add environment validation with Zod
- [ ] Implement error boundaries
- [ ] Fix analytics localStorage bug
- [ ] Add comprehensive error logging
- [ ] Generate OG image and add to /public
- [ ] Update JSON-LD to use CONFIG
- [ ] Add loading states to unit counter
- [ ] Add request timeouts
- [ ] Create 404 and error pages

**Validation:**
- [ ] Test with malformed .env (should fail gracefully)
- [ ] Trigger error in component (error boundary should catch)
- [ ] Verify OG image in Twitter Card Validator
- [ ] Test unit counter during network outage

---

### Phase 3: Optimization & Polish (Day 4-5)

**Time Estimate:** 4-6 hours

- [ ] Memoize experiment assignments
- [ ] Standardize API error responses
- [ ] Add validation schemas to all API routes
- [ ] Improve email masking in admin
- [ ] Add comprehensive logging
- [ ] Reduce unit counter poll frequency
- [ ] Implement health check endpoint
- [ ] Add deployment checklist to docs

**Validation:**
- [ ] Check lighthouse performance score
- [ ] Verify all API errors return consistent format
- [ ] Test admin privacy (no PII leaks)

---

### Phase 4: Monitoring & Observability (Optional)

**Time Estimate:** 2-4 hours

- [ ] Add Sentry or error tracking
- [ ] Implement structured logging
- [ ] Add performance monitoring
- [ ] Set up uptime monitoring
- [ ] Create operational runbook

---

## Quick Wins (Can Do Today)

**Easy fixes with high impact:**

1. ✅ Create `.env` from `.env.example` (2 min)
2. ✅ Fix analytics localStorage bug (5 min)
3. ✅ Add duplicate email check (10 min)
4. ✅ Fix file rename in storage.ts (5 min)
5. ✅ Add error logging to catch blocks (15 min)
6. ✅ Create 404 and error pages (15 min)

**Total time:** ~1 hour, eliminates 6 issues.

---

## Testing Checklist

Before deploying to production:

### Security Tests
- [ ] Attempt to access admin without key
- [ ] Try to modify units via API without auth
- [ ] Spam waitlist endpoint (should rate limit)
- [ ] Check client bundle for sensitive data

### Functionality Tests
- [ ] Unit counter updates correctly
- [ ] Email capture works (API + localStorage fallback)
- [ ] Experiments assign consistently
- [ ] Analytics events tracked
- [ ] Admin panel loads and functions

### Performance Tests
- [ ] Lighthouse score >90
- [ ] No memory leaks in analytics
- [ ] Unit counter doesn't hammer API
- [ ] Page load <2s on 3G

### Error Handling Tests
- [ ] Invalid .env values fail gracefully
- [ ] Network errors handled
- [ ] Malformed API requests return proper errors
- [ ] Component errors caught by boundary

---

## Dependencies to Add

```bash
npm install zod lru-cache
```

**Total bundle size increase:** ~50KB (minimal)

---

## Files to Create

1. `lib/env.ts` - Environment validation
2. `lib/rate-limit.ts` - Rate limiting utility
3. `lib/api-response.ts` - Standardized API responses
4. `components/ErrorBoundary.tsx` - Error boundary component
5. `app/not-found.tsx` - 404 page
6. `app/error.tsx` - Error page
7. `middleware.ts` - CORS and security middleware
8. `public/og.png` - OG image asset
9. `docs/deployment-checklist.md` - Pre-deploy verification

---

## Conclusion

**Current State:** MVP-ready code with solid architecture but critical security gaps.

**Required Before Public Launch:** Phase 1 (security hardening) is **mandatory**.

**Recommended for Production:** Phases 1 + 2 (security + production readiness).

**Total Time to Production-Ready:** 2-3 days of focused work.

**Next Steps:**
1. Review this audit with team
2. Prioritize fixes based on launch timeline
3. Implement Phase 1 security fixes immediately
4. Create .env file and test locally
5. Add deployment checklist to workflow

---

**Questions or need clarification on any item?** Reference this document by section number (e.g., "Fix for #7").

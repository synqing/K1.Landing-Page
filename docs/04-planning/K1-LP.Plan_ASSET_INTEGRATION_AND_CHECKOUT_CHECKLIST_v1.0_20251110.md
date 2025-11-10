---
status: active
author: Spectrasynq Landing Team
date: 2025-11-10
intent: Execution checklist to integrate media assets and implement checkout/reservations for K1-LP
references: [K1-LP.Plan_LANDING_PAGE_STRATEGY_v1.0_20251110, K1-LP.Arch_LANDING_PAGE_STRUCTURE_v1.0_20251110]
---

# K1‑LP — Asset Integration & Checkout Checklist

This checklist drives the final mile: swapping real assets into the live layout and wiring the reservations/checkout flow. Use this document to track implementation status and decisions.

## 1) Media Assets Integration
- [ ] Hero: replace placeholder with 15s loop (MP4/H.264 + WebM VP9), muted, playsinline, autoplay, loop, poster fallback
- [ ] Hero: add `<track>` captions (optional if music only), `aria-label` and `title`
- [ ] Bento Grid: swap video/image placeholders for hardware close‑ups and music‑reactive demo
- [ ] Compression: hero video <5MB (AV1/VP9 test), use `preload="metadata"` and poster, defer heavy assets below fold
- [ ] Responsive sources: `source` set for mobile/tablet/desktop bitrates
- [ ] Alt text and captions: all images describe scene, videos have captions or are marked decorative when appropriate
- [ ] Fallbacks: still images for browsers disallowing autoplay

Implementation Notes
- Hero component (`components/Hero.tsx`): add `<video>` with `poster`, `<source>` variants, and safe autoplay flags
- HardwareShowcase (`components/HardwareShowcase.tsx`): replace text placeholders with `<video>/<img>` grid
- Add assets under `public/media/` with descriptive names and update imports

## 2) Reservations / Checkout
- [ ] Decide provider: Stripe Checkout vs. manual reservation (Phase 1: email capture, Phase 2: payment)
- [ ] If Stripe: create `api/checkout` route that creates a Checkout Session (split payments optional)
- [ ] Success/Cancel routes: `app/checkout/success` and `.../cancel`
- [ ] Webhooks: secure endpoint to mark reservations paid; idempotency and signature verification
- [ ] Units counter update: increment on reservation/payment; add rate limiting and basic auth to admin
- [ ] Env: STRIPE_SECRET_KEY, STRIPE_PRICE_ID, STRIPE_SPLIT_PRICE_IDS (if applicable)
- [ ] Legal pages: Terms, Privacy (link in footer)

Implementation Notes
- Start with reservation intent only: direct CTA → email capture + Discord join (if payment provider not ready)
- For split payments, set metadata on Stripe session to capture “part 1/2” and reconcile on webhook

## 3) Analytics & Experiments
- [ ] Define events: `cta_click`, `checkout_start`, `checkout_success`, `scroll_depth`, `waitlist_submit`
- [ ] Add destination: set `NEXT_PUBLIC_ANALYTICS_URL` or integrate provider SDK
- [ ] Persist experiment assignments with a stable key; add cohort id for analysis
- [ ] Dashboards or simple export of local breadcrumbs for manual analysis during pre‑launch

## 4) Accessibility & SEO
- [ ] Keyboard focus styles and order validated for all CTAs
- [ ] Color contrast meets WCAG AA with current tokens
- [ ] Structured data (Product) reviewed and updated with final pricing/availability
- [ ] OG image actual asset exported to `/public/og.png`

## 5) Performance Budgets
- [ ] Core Web Vitals: LCP (<2.5s), CLS (<0.1), INP (<200ms)
- [ ] Lazy‑load non‑critical media; preconnect/preload critical origins if needed
- [ ] Bundle size sanity: avoid heavy deps; rely on CSS + native media

## 6) Governance & Ops
- [ ] Protect `/admin` with real auth (beyond NEXT_PUBLIC_ADMIN_KEY) before launch
- [ ] Back up `.data/waitlist.json` if still using file store in pre‑prod; migrate to DB when ready
- [ ] Document environment and operational runbook in `docs/09-implementation/`

## 7) Rollout Plan
- [ ] Feature flags for payment vs. reservation‑only path
- [ ] Dry run end‑to‑end: waitlist → Stripe test mode → units counter update → analytics verified
- [ ] Revert plan if provider down: auto‑fallback to waitlist capture

---

### Quick Links
- Layout spec: `docs/01-architecture/K1-LP.Arch_LANDING_PAGE_STRUCTURE_v1.0_20251110.md`
- Strategy: `docs/04-planning/K1-LP.Plan_LANDING_PAGE_STRATEGY_v1.0_20251110.md`
- Action items: `docs/04-planning/K1-LP.Plan_ACTION_ITEMS_EXECUTION_v1.0_20251110.md`

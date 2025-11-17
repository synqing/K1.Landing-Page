# K1-Lightwave Landing Page — Action Items & Progress

**Date:** 2025-11-17
**Session:** Aura Intelligent Prompting Strategy
**Status:** Brand identity locked, copy guide complete, ready for polish

---

## ✅ COMPLETED

### 1. Aura Documentation Investigation
- **Status:** ✅ COMPLETE
- **Outcome:** Discovered @ reference system (100K char context), component library (1400+ components), stepwise refinement approach
- **Key Learning:** Previous Phase 1-2-3 strategy was monolithic. Should have used template library + iterative refinement.
- **Files:** Research notes in conversation transcript

### 2. Improved Aura Prompting Strategy
- **Status:** ✅ COMPLETE
- **Outcome:** Leveraged Aura's hardware template library, customized for K1 branding in single prompt
- **Result:** `Aura.html/landingpage04-k1-customized.html` — full K1 landing page with glassmorphism, proper branding
- **Quality:** "Actually pretty fucking descent" (user feedback) — solid foundation, needs copy tightening

### 3. Brand Identity Lock-Down
- **Status:** ✅ COMPLETE
- **File:** `docs/K1-BRAND-IDENTITY-LOCKDOWN.md`
- **Contents:**
  - **Color palette:** Gold (#FFB84D), green (#22DD88), orange (#F59E0B), cyan (#6EE7F3)
  - **Typography:** Bebas Neue (display), M PLUS Rounded 1c (body), JetBrains Mono (specs)
  - **Glassmorphism rules:** Base glass, heavy glass, glass inset (with CSS specs)
  - **Background constraints:** Clean radial gradients only, NO LED flow animations, NO noise textures
  - **Component patterns:** Corner brackets, hairline grids, badge design
  - **Copy tone:** Honest, technical, direct — "V1 for pioneers"
  - **Mobile responsive:** Breakpoints and adjustments documented
- **Status:** LOCKED — maintainer approval required for changes

### 4. Copy Tightening Guide
- **Status:** ✅ COMPLETE
- **File:** `docs/K1-COPY-TIGHTENING-GUIDE.md`
- **Outcome:** Section-by-section surgical edits achieving 35-40% word reduction
- **Method:**
  - Cut implied verbs and hedging
  - Remove redundant modifiers
  - Convert conditionals to questions ("Break it? We'll debug it.")
  - Use symbols over words ("+" instead of "and")
  - Present tense imperatives ("Fork it" not "You can fork")
- **Examples:**
  - Hero: 20 words → 14 words (-30%)
  - Mounting spec: 16 words → 7 words (-56%)
  - PRISM.node: 21 words → 12 words (-43%)
- **Next step:** Apply edits to HTML or port to Next.js components

---

## 📋 READY FOR EXECUTION

### 5. Apply Copy Edits to Aura HTML
- **Status:** 🟡 PENDING
- **File:** `Aura.html/landingpage04-k1-customized.html`
- **Task:** Manually apply edits from `K1-COPY-TIGHTENING-GUIDE.md` to the HTML
- **Estimated time:** 30-45 minutes
- **Owner:** TBD
- **Alternative:** Generate new Aura output with "use tightened copy from this reference doc" + upload guide

### 6. Replace Placeholder Hardware Render
- **Status:** 🟡 PENDING (blocked by asset creation)
- **Current:** Two horizontal gradient lines representing dual edge-lit LGP
- **Needed:** Actual K1 hardware render or photograph
- **Format:** PNG/WebP, optimized for web
- **Dimensions:** ~800×600px, aspect ratio 4:3
- **Location in HTML:** `.aspect-[4/3]` device silhouette div in hero section
- **Blocker:** No 3D model or physical prototype photos available yet

### 7. Add FAQ Section (Optional)
- **Status:** 🟡 PENDING (optional, not critical path)
- **Copy source:** `lib/copy.ts` has 7 FAQ questions already written
- **Design:** Accordion pattern (click to expand/collapse)
- **Location:** Between Pricing and Footer
- **Reason for optional:** Current 4-section flow (Hero → Specs → Roadmap → Pricing) is strong. FAQ adds value but not essential for V1 launch.

### 8. Port to Next.js Components
- **Status:** 🟡 PENDING
- **Source:** `Aura.html/landingpage04-k1-customized.html`
- **Target:** `.deprecated/app/page.tsx` + components
- **Work required:**
  - Extract sections into components (`Hero.tsx`, `Specs.tsx`, `Roadmap.tsx`, `Pricing.tsx`)
  - Convert inline styles to Tailwind classes
  - Add custom CSS for glassmorphism effects to `globals.css`
  - Import fonts (Bebas Neue, M PLUS Rounded 1c, JetBrains Mono)
  - Test responsive breakpoints (375px, 768px, 1440px)
- **Estimated time:** 2-3 hours
- **Owner:** TBD

### 9. Real Hardware Assets Integration
- **Status:** 🔴 BLOCKED (no assets yet)
- **Needed:**
  1. Hero background: K1 on desk with glowing LEDs (full-screen image, compressed <500KB)
  2. Hardware detail shots: Close-ups of dual edge-lit LGP, LED strips, mounting
  3. Desk context photo: K1 behind monitor with keyboard, tasteful setup
  4. Optional: 360° rotating view or short video clip (<5MB)
- **Placeholder strategy:** Keep Aura's gradient placeholder until real assets available
- **Production plan:** See `docs/asset-production-plan.md` (if exists) or create one

### 10. Scarcity Counter Backend
- **Status:** 🟡 PENDING
- **Current:** Hardcoded "73 of 100 units remaining"
- **Needed:** Real-time counter synced with reservation system
- **Options:**
  1. Simple JSON endpoint returning `{"remaining": 73}`
  2. Firestore/Supabase real-time query
  3. Stripe/payment processor webhook updating count
- **Frontend:** Fetch on page load, update every 30s (optional)
- **Fallback:** If fetch fails, show "Limited units remaining" instead of number

---

## 🚀 LAUNCH BLOCKERS

These must be resolved before going live:

1. **Payment integration** — Stripe or similar for $249 reservation
2. **Email capture** — Waitlist form for sold-out scenario
3. **Domain + hosting** — Where will this be deployed?
4. **Analytics** — Plausible/Fathom/GA4 for conversion tracking
5. **GitHub + Discord links** — Actual URLs (currently placeholders)
6. **Legal pages** — Terms, Privacy, Warranty (referenced in footer, don't exist yet)

---

## 📊 CURRENT STATE SUMMARY

### What We Have
✅ Full landing page HTML with K1 branding (Aura output)
✅ Locked brand identity (colors, fonts, glassmorphism rules)
✅ Copy tightening guide (35-40% reduction edits ready)
✅ Clean component structure (Hero, Specs, Roadmap, Pricing, Footer)
✅ Responsive design (mobile, tablet, desktop breakpoints)
✅ Technical credibility aesthetic (no consumer gadget flourishes)

### What We Need
🟡 Copy edits applied to HTML
🟡 Port to Next.js for production build
🟡 Real hardware photos/renders
🟡 Payment + email capture backend
🟡 Scarcity counter integration
🟡 Domain, hosting, analytics

### What's Blocked
🔴 Asset integration (no hardware photos yet)
🔴 Launch (no payment system yet)

---

## 🎯 RECOMMENDED NEXT STEPS

### Immediate (Today)
1. **Apply copy edits** to `landingpage04-k1-customized.html` using the tightening guide
2. **Open edited HTML** in browser, screenshot all sections for review
3. **Decide on font loading strategy** (Google Fonts vs self-hosted for Bebas Neue, M PLUS Rounded 1c)

### Short-term (This Week)
4. **Port to Next.js** in `.deprecated/` for build/deploy readiness
5. **Set up Stripe test mode** for reservation flow ($249 payment)
6. **Create asset production plan** with shot list, equipment, timeline

### Medium-term (Next Week)
7. **Capture hardware photos** (if prototype available)
8. **Integrate scarcity counter** with real backend
9. **Deploy staging version** for feedback from first 5-10 beta testers
10. **Legal pages** (Terms, Privacy, Warranty) — use template + customize

---

## 📁 FILE REFERENCE

| File | Purpose | Status |
|------|---------|--------|
| `Aura.html/landingpage04-k1-customized.html` | Full landing page (Aura output) | ✅ Complete, needs copy edits |
| `docs/K1-BRAND-IDENTITY-LOCKDOWN.md` | Canonical design system | ✅ Locked |
| `docs/K1-COPY-TIGHTENING-GUIDE.md` | Section-by-section edits (35-40% reduction) | ✅ Complete |
| `docs/landing-page-strategy.md` | Positioning, audience, messaging | ✅ Existing reference |
| `docs/landing-page-structure.md` | 7-section architecture | ✅ Existing reference |
| `lib/copy.ts` | FAQ copy (7 questions) | ✅ Complete |
| `components/*.tsx` | Next.js components (Hero, Community, WhoIsThisFor, FAQ) | ✅ Existing, need updates |
| `.deprecated/app/page.tsx` | Main page component | 🟡 Needs Aura output integration |

---

## 🔗 DEPENDENCIES

- **Aura.build** — Used for rapid iteration on glassmorphism layouts
- **Tailwind CSS** — Styling framework (via CDN in Aura HTML, needs config for Next.js)
- **Lucide Icons** — Icon library (already integrated in Aura output)
- **Next.js 14** — Build system (existing in `.deprecated/`)
- **Google Fonts** — Bebas Neue, M PLUS Rounded 1c (need to add JetBrains Mono)

---

## 📝 NOTES

- **Phase 2 vs Phase 3:** Phase 2 Aura output achieved technical credibility through restraint. Phase 3 added LED flow animations + noise texture = consumer gadget aesthetic (rejected). Current output (landingpage04) maintains Phase 2 restraint.
- **@ Reference System:** Aura's killer feature. Can reference templates, components, snippets with up to 100K chars context. Use this for all future iterations instead of monolithic prompts.
- **Copy Tone Success:** "V1 for pioneers", "works but isn't polished", "if you break it, we'll help debug" — honesty resonates with hardware hacker audience.
- **Glassmorphism Quality:** Backdrop blur + borders + shadows achieved without CSS preprocessor. Aura nailed it on first try with component library approach.

---

**LAST UPDATED:** 2025-11-17
**NEXT REVIEW:** After copy edits applied + Next.js port complete

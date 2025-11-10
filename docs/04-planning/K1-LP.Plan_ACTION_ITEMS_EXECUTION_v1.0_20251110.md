---
status: active
author: Spectrasynq Landing Team
date: 2025-11-10
intent: Execution checklist for K1-Lightwave landing page launch
---

# K1-Lightwave Action Items

Prioritized execution checklist for launching the Founder's Edition landing page.

---

## 🔴 CRITICAL PATH (Do First)

### **Week 1: Foundation (Target: 5 hours total)**

#### **Day 1: Setup (10 minutes)**
- [ ] Sign up for Aura Pro (120 monthly prompts)
  - URL: https://aura.build
  - Choose Pro tier
  - Payment method ready

#### **Day 2: Critical Asset Production (3 hours)**
**Photography with A7S III:**

- [ ] **Shot 1: Hero angle photo** (30 min)
  - Setup: K1 on desk, 3/4 angle, dark bg, "Fire" palette
  - Camera: 35mm or 50mm, f/2.8, RAW
  - Deliverable: 1 RAW photo

- [ ] **Shot 2: Hero video loop** (45 min)
  - Setup: Same as Shot 1, cycle Fire → Ocean → Neon
  - Camera: 4K 24fps, S-Log3, 15 seconds
  - Deliverable: 15s seamless loop

- [ ] **Shot 3: Music reactive demo** (45 min)
  - Setup: K1 with bass-heavy music, dark room
  - Camera: 4K 60fps, S-Log3, locked exposure
  - Deliverable: 30s video clip

- [ ] **Color grade & export** (60 min)
  - Apply S-Log3 → Rec.709 LUT
  - Match PRISM aesthetic (dark, saturated LEDs)
  - Export: Hero video <5MB, stills as JPEG

**Deliverable:** 70% of landing page visual impact

---

#### **Day 3: Landing Page Integration (2 hours)**

- [ ] Generate landing page in Aura
  - Copy prompt from `docs/07-resources/K1-LP.Res_AURA_PROMPT_v1.0_20251110.md`
  - Paste into Aura.build
  - Generate and review

- [ ] Upload assets to Aura library
  - Hero photo (background)
  - Hero video loop (autoplay)
  - Music reactive clip (bento grid)

- [ ] Integrate assets into design
  - Replace placeholders
  - Use Aura DIV editor for positioning
  - Test video autoplay

- [ ] Export HTML from Aura
  - Download complete HTML/CSS
  - Save to desktop (ready for integration)

---

## 🟡 HIGH PRIORITY (Week 2)

### **Asset Production: Full Photography Day (6-8 hours)**

- [ ] **Shot 4: Under-monitor context**
  - K1 under 27" monitor, keyboard visible
  - 24mm, f/4, eye-level

- [ ] **Shot 5: Dual-edge detail** (CRITICAL)
  - Extreme close-up, both edges lit
  - 90mm macro, f/4-f/5.6, "Monochrome" palette

- [ ] **Shot 6: LED density close-up**
  - Individual LED zones visible
  - 50mm or 90mm, "PRISM" palette

- [ ] **Shot 7: Music reactive side view**
  - Cinematic angle, side view
  - 50mm, f/2, 4K 60fps

- [ ] **Shot 8: Palette cycle showreel**
  - Overhead angle, all 12 palettes
  - 50mm, f/5.6, 60s total

- [ ] **Shot 9: Streamer setup**
  - Ring light, mic visible
  - 35mm, f/2.8, "Neon" palette

- [ ] **Shot 10: Maker bench**
  - Tools, laptop visible
  - 35mm, f/4, "Arctic" palette

- [ ] Color grade entire batch
- [ ] Export all assets (web-optimized)

**Deliverable:** Complete asset library

---

### **Landing Page Polish (3 hours)**

- [ ] Refine copy in Aura DIV editor
  - Adjust FAQ based on anticipated objections
  - Test CTA variations ("Reserve Yours" vs "Join First 100")

- [ ] Update scarcity counter
  - Change "73 of 100" to actual remaining units
  - Ensure visible in hero + pricing sections

- [ ] Test responsive layouts
  - Mobile preview in Aura
  - Tablet preview
  - Desktop at various widths

- [ ] A/B test pricing section
  - Try 2-3 layout variations
  - Test split payment prominence

- [ ] Add email capture form
  - Waitlist for overflow demand
  - Footer integration

**Deliverable:** Polished, ready-to-launch page

---

## 🟢 MEDIUM PRIORITY (Week 3)

### **3D Rendering (If Photography Has Gaps) (3-4 hours)**

- [ ] Set up Blender with K1 STEP files
  - Import STEP file
  - Separate components
  - Set up materials (glass, LEDs, metal)

- [ ] **Render 1: Exploded view diagram**
  - Show LGP, LED strips, housing separated
  - Labels with arrows
  - 4K export

- [ ] **Render 2: 360° turntable**
  - 10-second rotation
  - "Fire" palette glowing
  - 1080p MP4 export

- [ ] **Render 3: Clean product shot**
  - White background, studio lighting
  - LEDs off (show hardware)
  - 4K PNG (transparent bg)

- [ ] **Render 4: Dual-edge light path diagram**
  - Cross-section view
  - Light rays with arrows
  - Technical illustration style

**Deliverable:** Technical credibility assets

---

### **AI Supplementary Assets (Gemini Ultra) (2-3 hours)**

**Only generate what photography can't provide:**

- [ ] 4 desk background variations
  - Gaming setup (ultrawide, RGB keyboard)
  - Music studio (MIDI controller, purple lighting)
  - Creative workspace (MacBook, Wacom tablet)
  - Streaming setup (ring light, mic arm)

- [ ] PRISM.node UI mockups
  - Mobile app (color palette selector)
  - Pattern marketplace (grid of patterns)
  - Home Assistant integration card

- [ ] Custom icon set (8 icons)
  - Weekly updates (envelope)
  - Discord (chat bubbles)
  - Voting (ballot box)
  - Open source (unlocked padlock)
  - (4 more as needed)

- [ ] Technical diagrams
  - ESP32 architecture graphic
  - System block diagram

**Deliverable:** Supporting assets for gaps

---

### **Landing Page Integration (Final) (2 hours)**

- [ ] Replace old landing page files
  - Delete current `/app/page.tsx`
  - Delete current `/app/layout.tsx` if needed
  - Clear out old assets

- [ ] Integrate Aura HTML export
  - Copy HTML structure to new `page.tsx`
  - Extract CSS to `globals.css` or component
  - Convert to Next.js App Router format
  - Replace `<html>` tags with proper layout

- [ ] Add real assets
  - Upload all photos/videos to `/public`
  - Update image paths in code
  - Test video autoplay (muted, playsinline)

- [ ] Test on real devices
  - iPhone (Safari)
  - Android (Chrome)
  - Desktop (Chrome, Firefox, Safari)
  - Tablet (iPad)

**Deliverable:** Live, integrated landing page

---

## 🔵 FUTURE (After Landing Page Launch)

### **Technical Setup (Week 4)**

- [ ] Set up payment processor
  - Stripe Checkout integration
  - Test payment flow (use test mode)
  - Configure webhooks for order confirmation

- [ ] Email automation
  - Welcome email after reservation
  - Order confirmation email
  - Weekly dev update email template

- [ ] Analytics setup
  - Google Analytics 4 or Vercel Analytics
  - Hotjar for heatmaps (optional)
  - Conversion tracking (Reserve button clicks)

- [ ] Inventory tracking
  - Manual counter update system (or automated)
  - Soldout state handling
  - Waitlist redirect

---

### **Pre-Launch Marketing (Week 4-5)**

- [ ] Create social media teasers
  - 15s hero video clip (Instagram Reel)
  - Music reactive demo (TikTok)
  - Dual-edge close-up (Twitter)

- [ ] Build email list
  - Launch countdown page
  - "Notify me" form for launch day

- [ ] Community outreach
  - r/battlestations post (tasteful, not spammy)
  - r/esp32 post (focus on hardware)
  - Hacker News Show HN (if appropriate)
  - Twitter/X thread with demo videos

- [ ] Create founder's Discord
  - Set up channels (announcements, support, feedback)
  - Onboarding flow for new buyers
  - Invite early access testers

---

### **PRISM.node Webapp Design (Month 2-3)**

- [ ] Generate main canvas/editor UI in Aura
  - Node-based programming interface
  - Grid overlay, connection lines
  - Light/heavy glass variants

- [ ] Design node component library
  - 12+ different node types
  - Connected/disconnected states
  - Selected/hover states

- [ ] Create side panels
  - Compilation status panel
  - Properties panel
  - Node palette/library
  - Settings

- [ ] Responsive layouts
  - Desktop-first (primary use case)
  - Tablet adaptations
  - Mobile (view-only or simplified)

**Estimated:** 90-120 Aura prompts

---

## 📊 Success Metrics to Track

Once landing page is live, monitor:

**Primary:**
- [ ] Conversion rate (visitors → reservations) - Target: >3%
- [ ] Units sold - Target: 100 in 60 days
- [ ] Average time on page - Target: >2 minutes

**Secondary:**
- [ ] Video engagement (% watch >5s) - Target: 60%+
- [ ] Scroll depth (% reach pricing) - Target: 40%+
- [ ] Email signups (waitlist) - Target: 500+
- [ ] Discord joins - Target: 80%+
- [ ] FAQ clicks (most common questions)

**Qualitative:**
- [ ] Buyer feedback quality (are they right audience?)
- [ ] Feature request themes (shapes v2 roadmap)
- [ ] Community engagement (Discord activity)

---

## 🚨 Critical Decision Points

Before launching, finalize:

### **Pricing**
- [ ] Confirm final price ($249 is placeholder)
  - Calculate COGS + margin for 100 units
  - Compare to competitors (Govee, Nanoleaf)
  - Factor in founder perks (lifetime updates, v2 discount)

### **Ship Date**
- [ ] Confirm March 2026 is realistic
  - Production timeline for 100 units
  - Component sourcing (ESP32-S3, LEDs, LGP)
  - Assembly + QA time
  - Shipping buffer

### **Payment Flow**
- [ ] Choose payment structure
  - Option A: Full payment now ($249)
  - Option B: Split (50% deposit + 50% at ship)
  - Option C: Hybrid (offer both)

### **Inventory Tracking**
- [ ] How to update "73 of 100 left" counter
  - Manual update after each sale
  - Automated via Stripe webhook
  - Daily batch update

---

## ⏱️ Week-by-Week Timeline

### **Week 1: Foundation** (5 hours)
- ✅ Sign up Aura Pro (10 min)
- ✅ Shoot 3 critical assets (3 hours)
- ✅ Generate + integrate landing page (2 hours)

### **Week 2: Production** (9-11 hours)
- ✅ Full photography day (6-8 hours)
- ✅ Landing page polish (3 hours)

### **Week 3: Supplementary** (5-7 hours)
- ✅ 3D renders (3-4 hours)
- ✅ AI assets (2-3 hours)

### **Week 4: Launch Prep** (10-15 hours)
- ✅ Technical setup (5-7 hours)
- ✅ Marketing prep (5-8 hours)

**Total time to launch: 30-40 hours over 4 weeks**

---

## 🎯 The 80/20 Focus

**If you only do 3 things this week:**

1. ✅ **Sign up Aura Pro** (10 min)
2. ✅ **Shoot hero + music reactive footage** (2 hours)
3. ✅ **Generate landing page + integrate assets** (2 hours)

**Total: ~4 hours to 10x your landing page credibility.**

---

## 📋 Master Checklist (Copy to Notion/Todoist)

**CRITICAL PATH:**
- [ ] Sign up Aura Pro
- [ ] Shoot 3 critical assets (hero, hero video, music reactive)
- [ ] Color grade & export
- [ ] Generate landing page in Aura
- [ ] Upload assets to Aura
- [ ] Export HTML from Aura

**HIGH PRIORITY:**
- [ ] Full photography day (10 shots)
- [ ] Landing page polish (copy, responsive, A/B tests)
- [ ] Replace old landing page with Aura export
- [ ] Test on real devices

**MEDIUM PRIORITY:**
- [ ] 3D renders (4 renders)
- [ ] AI supplementary assets (backgrounds, mockups, icons)
- [ ] Set up payment processor (Stripe)
- [ ] Analytics setup

**FUTURE:**
- [ ] Pre-launch marketing (social, email, community)
- [ ] Create founder's Discord
- [ ] PRISM.node webapp design (Month 2-3)

---

## 🆘 Troubleshooting

**If you get stuck:**

1. **Aura not generating well?**
   - Break prompt into smaller sections
   - Simplify sticky split (most complex part)
   - Generate structure first, polish later

2. **Photography not working?**
   - Focus on hero shot only (most important)
   - Use 3D renders for other shots
   - AI generate contexts, composite K1 onto them

3. **Out of Aura prompts?**
   - Upgrade to Max (240 prompts)
   - Use DIV editor for tweaks (doesn't burn prompts)
   - Wait for monthly refresh

4. **Timeline slipping?**
   - Focus on critical path only
   - Ship with "good enough" assets
   - Iterate post-launch based on feedback

---

## 📞 Need Help?

Reference these docs:
- Strategy: `docs/04-planning/K1-LP.Plan_LANDING_PAGE_STRATEGY_v1.0_20251110.md`
- Structure: `docs/01-architecture/K1-LP.Arch_LANDING_PAGE_STRUCTURE_v1.0_20251110.md`
- Assets: `docs/04-planning/K1-LP.Plan_ASSET_PRODUCTION_v1.0_20251110.md`
- Aura Prompt: `docs/07-resources/K1-LP.Res_AURA_PROMPT_v1.0_20251110.md`

---

**Ready to execute? Start with Week 1, Day 1. Sign up for Aura Pro and shoot those 3 critical assets. Everything else builds on that foundation.**

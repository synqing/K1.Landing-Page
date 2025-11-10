# K1-Lightwave Landing Page Structure

Complete specification for the 7-section landing page design.

---

## Design System

### Color Palette
```css
--bg: #1C2130          /* Dark canvas background */
--surface: #252D3F     /* Card background */
--elev: #2F3849        /* Elevated surface */
--text: #E6E9EF        /* Primary text */
--text-2: #B5BDCA      /* Secondary text */
--gold: #FFB84D        /* CTA color, accents */
--ok: #22DD88          /* Success green */
--warn: #F59E0B        /* Warning orange */
--err: #EF4444         /* Error red */
--info: #6EE7F3        /* Info cyan */
```

### Typography
- **Display:** Bebas Neue (uppercase headlines, tracking-tight)
- **UI:** M PLUS Rounded 1c (body copy, labels)
- **Mono:** JetBrains Mono (specs, technical details)

### Glassmorphism Style
- Background: `rgba(255,255,255,0.06)`
- Backdrop blur: `20px` (standard), `40px` (heavy variant)
- Border: `1px solid rgba(255,255,255,0.20)`
- Box shadow: `0 12px 24px rgba(0,0,0,0.18), 0 32px 64px rgba(0,0,0,0.27)`
- Pseudo-elements for Fresnel lighting effects

### Background Effects
- LED flow animation (conic + radial gradients, 24s loop)
- Subtle noise texture overlay
- Grid overlay (32px spacing, optional)

---

## Section 1: Hero (100vh)

### Purpose
**STOP scrolling.** First impression. 15-second kill shot.

### Layout
```
Full-screen background video/image of K1 glowing
    ↓
Dark gradient overlay (30-60% opacity)
    ↓
Centered glass card with content
    ↓
Scroll indicator at bottom
```

### Content Structure

**Glass Card (max-width: 2xl, center-aligned):**

1. **Logo Area**
   - Small gold gradient square (32x32px)
   - Placeholder for actual K1 logo

2. **Headline** (font-display, 6xl)
   ```
   K1-Lightwave
   ```

3. **Subheadline** (text-xl, gold color)
   ```
   Founder's Edition
   ```

4. **Main Pitch** (text-2xl)
   ```
   First 100 Units. Help Us Build V2.
   ```

5. **Description** (text-lg, text-2 color)
   ```
   Dual edge-lit LGP. 320 individually addressable LEDs.
   ESP32-S3. Open hardware. V1 ships March 2026.
   ```

6. **Scarcity Badge** (glass-inset, warning color)
   ```
   ⚠️ 73 of 100 units remaining
   ```

7. **CTAs** (flex gap-4)
   - Primary: `bg-gold`, `text-black`, "Reserve Yours – $249"
   - Secondary: `glass-inset`, "Learn More ↓" (smooth scroll)

8. **Scroll Indicator** (bottom center, pulsing)
   - Animated down arrow

### Background Asset
- Video: K1 on desk, cycling through Fire → Ocean → Neon palettes (15s loop)
- Fallback: Still image of K1 with Fire palette

### Responsive
- Desktop: 6xl headline
- Tablet: 4xl headline
- Mobile: 3xl headline, stack CTAs vertically

---

## Section 2: Hardware Showcase (80vh)

### Purpose
**SHOW the spectacle.** Prove K1 is unique with visual evidence.

### Layout
Bento Grid (asymmetric, 12-column)

```
┌─────────────────┬────────────┐
│                 │  Card 1    │
│   Large Video   │  (Dual-    │
│   (8 cols,      │   edge)    │
│    2 rows)      ├────────────┤
│                 │  Card 2    │
│                 │  (320 LEDs)│
├─────────────────┴────────────┤
│  Full-Width Context Photo    │
│  (Built for Desks)           │
└──────────────────────────────┘
```

### Content

**Headline** (font-display, 5xl, center)
```
What Makes K1 Different
```

**Large Card (8 cols × 2 rows):**
- Video: Rotating product view or close-up of K1 patterns
- Glass card, rounded-2xl, overflow hidden
- Hover: Overlay with caption

**Top-Right Card (4 cols × 1 row):**
- Icon: Abstract dual-edge light visualization
- Title (font-display, uppercase): "Dual Edge-Lit LGP"
- Body: "First consumer device with dual-edge illumination. Light enters from both sides, creating even, diffused glow with zero hotspots. Not an LED strip. A light guide."
- Glass-inset styling

**Middle-Right Card (4 cols × 1 row):**
- Icon: Grid pattern
- Title: "320 Addressable LEDs"
- Body: "Not RGB zones. True per-LED control (RGBIC). 160 LEDs per edge. Powered by ESP32-S3 dual-core. Run patterns at 120+ FPS."
- Glass-inset styling

**Bottom Full-Width (12 cols × 1 row):**
- Image: K1 on desk with monitor, keyboard, tasteful setup
- Title: "Built for Desks"
- Body: "32cm length. Sits perfectly under 27-34" monitors. USB-C powered. Mounts via 3M adhesive or stand. Cable management built in."
- Glass-heavy styling

### Responsive
- Desktop: 12-column asymmetric grid
- Tablet: 6-column (large video spans full-width)
- Mobile: Single column, stack all cards, equal heights

---

## Section 3: The Vision - Sticky Split (300vh total scroll, 100vh visible)

### Purpose
**SHOW how it works.** Be honest about v1 vs v2 roadmap.

### Layout
Sticky container at top, split 50/50 (desktop)

**Left Panel (Sticky):**
- "What Ships Now" - glass-heavy card
- Fixed in viewport while right scrolls

**Right Panel (Scrollable):**
- 3 cards with spacing (~50vh between each)
- Scroll reveals change left panel visual

### Left Panel Content

**Title** (font-display, 4xl, uppercase)
```
What Ships Now
```

**Intro** (lg, text-2)
```
V1 firmware is functional, not flashy. You get:
```

**Checklist** (text-lg)
```
✓ 12 preset patterns
✓ Music-reactive (spectrum analyzer)
✓ WiFi control (web UI)
✓ Open source firmware (ESP-IDF)
```

**Warning Callout** (glass-inset, orange border)
```
Honest talk: This is v1. It works. It's not polished.
If you need plug-and-play perfection, wait for v2.
```

### Right Panel Content

**Title** (font-display, 4xl, uppercase)
```
What's Coming
```

**Intro** (lg, text-2)
```
This is where YOU come in. Our roadmap:
```

**Card 1 - PRISM.node** (glass-inset)
- Screenshot/mockup of PRISM.node interface
- Badge (gold): "STEP 1"
- Title (font-display, 3xl): "PRISM.node"
- Description: "Visual programming interface. No code required."

**Card 2 - Marketplace** (glass-inset)
- Icon/illustration
- Badge (info color): "STEP 2"
- Title: "Pattern Marketplace"
- Description: "Share patterns. Sell designs. Community-driven."

**Card 3 - Integrations** (glass-inset)
- Icon/illustration
- Badge (green): "STEP 3"
- Title: "Platform Integrations"
- Description: "Home Assistant, WLED, Spotify, IFTTT."

**Bottom Callout** (glass-heavy)
```
The first 100 decide priority.

Weekly dev updates. Discord access. Feedback surveys.
Your needs shape the roadmap. You're not customers—
you're co-creators.
```

### Scroll Behavior
- 0-33% scroll: Left shows v1 firmware screenshot
- 34-66% scroll: Left shows PRISM.node mockup
- 67-100% scroll: Left shows deployment/hardware upload

### Responsive
- Desktop: Side-by-side sticky split
- Tablet: Reduce left panel to 40% width
- Mobile: Stack vertically, no sticky (scroll normally)

---

## Section 4: Co-Creator Pitch (60vh)

### Purpose
**SELL the journey.** Frame as participation, not transaction.

### Layout
```
Headline (center)
    ↓
3-column icon cards
    ↓
Large perks card (glass-heavy)
```

### Content

**Headline** (font-display, 5xl, center)
```
You're Not Buying a Product.
```

**Subhead** (2xl, center, text-2)
```
You're joining a journey.
```

**Three Icon Cards** (grid, glass-inset)

1. **Weekly Dev Updates**
   - Icon: 📬 (5xl emoji)
   - Title (font-display, 2xl, uppercase)
   - Body: "Behind-the-scenes. Firmware progress. Feature previews. No marketing fluff."

2. **Founder's Discord**
   - Icon: 💬
   - Title: "Founder's Discord"
   - Body: "Direct access to dev team. Ask questions. Share patterns. Debug together."

3. **Priority Input**
   - Icon: 🗳️
   - Title: "Priority Input"
   - Body: "Monthly surveys. Feature votes. Your needs shape what we build next."

**Perks Card** (glass-heavy, 2-column grid)

**Title** (font-display, 3xl, uppercase)
```
Founder's Edition Perks
```

**Left Column:**
```
✓ Numbered Unit
  Laser-etched serial (e.g., "23/100")

✓ Beta Firmware Access
  New features before public release

✓ Credits
  Your name in firmware & docs
```

**Right Column:**
```
✓ Lifetime Updates
  All firmware updates, forever

✓ 20% Off V2
  When we launch the next gen

✓ Open Hardware
  Schematics + firmware source on GitHub
```

### Responsive
- Desktop: 3 columns for icon cards
- Tablet: 2 columns for icon cards, perks card adjusts
- Mobile: Single column, stack all cards

---

## Section 5: Who Is This For? (60vh)

### Purpose
**SELL honestly.** Self-selection filter to reduce refunds/complaints.

### Layout
Two-column grid (50/50)

### Content

**Headline** (font-display, 5xl, center)
```
Is K1 Right For You?
```

**Left Card** (glass-inset, green accent)

**Title** (font-display, 3xl, uppercase, green)
```
✓ You'll Love This If...
```

**Checklist** (text-lg)
```
→ You tinker with ESP32, Arduino, or Raspberry Pi
→ You've used WLED, FastLED, or similar LED projects
→ Your desk setup is on r/battlestations (or should be)
→ You want the first dual edge-lit LGP light bar
→ You're okay with "v1" rough edges
→ You want to shape what this becomes
```

**Right Card** (glass-inset, orange border)

**Title** (font-display, 3xl, uppercase, orange)
```
⚠️ This Isn't For You If...
```

**Checklist** (text-lg, text-2 color)
```
→ You want plug-and-play perfection
→ You need extensive customer support
→ You expect mobile apps and mature integrations now
→ You've never flashed firmware or edited config files
→ You're buying this as a gift for someone non-technical
```

**Bottom Callout** (glass-inset within right card)
```
We're being honest: V1 is for pioneers. If you need
mature software, wait for our Kickstarter in Q3 2026.
```

### Responsive
- Desktop: 2 columns side-by-side
- Tablet: 2 columns (narrower)
- Mobile: Stack vertically, ideal customer first

---

## Section 6: Pricing (80vh)

### Purpose
**CONVERT.** Single tier, transparent, remove friction.

### Layout
```
Headline (center)
    ↓
Subhead (center)
    ↓
Single centered card (glass-heavy)
    ↓
Trust footer (below card)
```

### Content

**Headline** (font-display, 6xl, center)
```
Founder's Edition
```

**Subhead** (xl, center, text-2)
```
One tier. Fair price. Ships March 2026.
```

**Pricing Card** (glass-heavy, max-width 2xl, center)

1. **Badge** (top, gold, center)
   ```
   Unit 73/100
   ```

2. **Price** (font-display, 7xl, gold, center)
   ```
   $249
   ```

3. **Divider** (subtle line)

4. **What's Included** (2-column grid)

   **Left:**
   ```
   ✓ 1x K1-Lightwave (numbered)
   ✓ USB-C cable + power adapter
   ✓ Mounting kit (adhesive + stand)
   ✓ Beta firmware access
   ```

   **Right:**
   ```
   ✓ Founder's Discord
   ✓ Lifetime updates
   ✓ 20% off v2 hardware
   ✓ Name in credits
   ```

5. **Divider**

6. **Ship Date** (center, text-lg)
   ```
   Ships: March 2026
   ```

7. **CTA Button** (full-width, gold, black text, 2xl, bold)
   ```
   Reserve Your Unit
   ```

**Trust Footer** (below card, center, text-lg, text-2)
```
✓ 30-day returns
✓ 1-year warranty
✓ Pay now, or 50% deposit + 50% at ship
```

### Responsive
- Desktop: Max-width 2xl card
- Tablet: Adjust padding
- Mobile: Single column for checklist, full-width button

---

## Section 7: FAQ (Auto height)

### Purpose
**CLOSE objections.** Answer every doubt before checkout.

### Layout
Accordion cards (max-width 4xl, center)

### Questions & Answers

1. **"What exactly ships in March 2026?"**
   ```
   Hardware: K1-Lightwave unit, USB-C cable, power adapter, mounting kit.
   Firmware: V1 with 12 preset patterns, music-reactive mode, WiFi control.
   Not included: PRISM.node (coming Q3 2026), mobile app (TBD).
   ```

2. **"Can I return it if I don't like it?"**
   ```
   Yes. 30-day return window from delivery date. Full refund minus shipping.
   We're confident you'll love it, but we understand v1 isn't for everyone.
   ```

3. **"Is the firmware really open source?"**
   ```
   Yes. Full source on GitHub (Apache 2.0 license). Hardware schematics too.
   Fork it, mod it, share it. We encourage hacking.
   ```

4. **"Will there be more than 100 units?"**
   ```
   Yes, but not immediately. This is a limited founder's run.
   After we ship these 100 and gather feedback, we'll launch a full
   Kickstarter (Q3 2026) with v2 improvements.
   Founder's Edition holders get 20% off v2 + priority shipping.
   ```

5. **"What if something breaks?"**
   ```
   1-year hardware warranty covers defects. We'll replace or repair.
   For v1, we also offer Discord support (founders-only channel) where
   we troubleshoot together.
   ```

6. **"Why should I buy v1 instead of waiting for v2?"**
   ```
   If you want to shape the product: Your feedback becomes features.
   If you want exclusivity: Only 100 numbered units exist.
   If you want savings: V2 will cost more (~$329). You get 20% off as a founder.
   If you want to wait: That's totally fine. We'll see you at the Kickstarter.
   ```

7. **"What's the difference between K1 and other LED strips?"**
   ```
   It's not an LED strip. It's a dual edge-lit light guide plate.
   LEDs are hidden at the edges. Light diffuses through the acrylic.
   No hotspots, no visible LEDs. Clean, even glow.
   Also: 320 individually addressable LEDs (RGBIC), not RGB zones.
   ```

### Interaction
- Click to expand/collapse
- Smooth height transition (300ms)
- Chevron rotates on expand

### Styling
- Each item: glass-inset card
- Question: font-display, xl, uppercase
- Answer: text-lg, text-2 color
- Space between items: 1rem

---

## Section 8: Footer (30vh)

### Purpose
Final conversion opportunity + capture overflow.

### Layout
```
Final CTA section (glass-heavy card, center)
    ↓
Email capture (waitlist)
    ↓
Footer links (3-column grid)
    ↓
Copyright (center)
```

### Content

**Final CTA Card** (glass-heavy, center)
```
Ready to join the first 100?
[Reserve Your Unit – $249]
```

**Email Capture** (below CTA)
```
Sold out? Join the waitlist for Kickstarter launch:
[Email input field] [Submit button]
```

**Footer Links** (3-column grid, center)

**Column 1:**
- About
- Contact
- Press Kit

**Column 2:**
- GitHub
- Discord
- Twitter

**Column 3:**
- Terms
- Privacy
- Warranty

**Copyright** (center, small, text-2, opacity-70)
```
© 2026 K1-Lightwave. First 100 units only.
```

---

## Responsive Breakpoints

### Desktop (>1024px)
- All layouts as specified
- Bento grid: 12 columns
- Sticky split: side-by-side
- Pricing: single centered card

### Tablet (768-1023px)
- Bento grid: 6 columns
- Sticky split: 40/60 split
- Pricing: adjust padding
- Footer: 3 columns still viable

### Mobile (<767px)
- Single column for all sections
- Bento grid: stack vertically
- Sticky split: no sticky, stack
- Hero: reduce font sizes (6xl → 3xl)
- FAQ: full-width accordion
- Footer: single column

---

## Interactions & Animations

### On Load
- Fade-in hero content (500ms delay)
- Autoplay hero video (muted)

### On Scroll
- Parallax LED flow background (subtle)
- Fade-in section content (Intersection Observer)
- Sticky split: opacity transitions between cards
- Progress indicator (optional, top bar)

### On Hover
- Glass cards: border brightness increase
- CTAs: scale 1.05, shadow glow
- FAQ items: highlight

### On Click
- FAQ: smooth expand/collapse (300ms)
- CTAs: scale 0.98 (active state)
- Scroll anchors: smooth scroll behavior

---

## Performance Optimization

### Critical
- Hero video: <5MB (H.264, 1080p)
- Bento videos: <2MB each (720p)
- Images: WebP format, responsive sizes
- Fonts: Preload display font (Bebas Neue)

### Glassmorphism
- Limit backdrop-filter to <10 elements per viewport
- Disable on low-end devices (@supports query)
- Use will-change sparingly

### Animations
- Use transform/opacity only (GPU-accelerated)
- Avoid animating width/height/top/left
- Debounce scroll events (use Intersection Observer)

---

## Accessibility

### Keyboard Navigation
- All interactive elements focusable (tabindex)
- Skip-to-content link
- Visible focus indicators

### Screen Readers
- Semantic HTML5 tags (header, main, section, footer)
- Alt text on all images/videos
- ARIA labels on interactive elements

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  .led-animate { animation: none; }
  .transition-all { transition: none; }
}
```

---

## Next Steps

1. See `docs/aura-prompt.md` for complete Aura generation prompt
2. See `docs/asset-production-plan.md` for asset creation workflow
3. See `docs/action-items.md` for execution checklist

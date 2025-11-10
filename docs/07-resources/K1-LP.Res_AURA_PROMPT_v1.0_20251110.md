---
status: active
author: Spectrasynq Landing Team
date: 2025-11-10
intent: Canonical Aura.build prompt for generating the K1-LP landing page layout
---

# Aura.build Prompt for K1-Lightwave Landing Page

**Ready to paste into Aura.build**

Copy everything below the line and paste into Aura's prompt field.

---

```
Create a single-page landing page for K1-Lightwave Founder's Edition - a pre-launch product page selling 100 units of v1 hardware to early adopters and beta testers.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRODUCT CONTEXT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Product: K1-Lightwave - First-to-market dual edge-lit light guide plate (LGP) with 320 individually addressable RGB LEDs, powered by ESP32-S3. Form factor: light bar that sits under monitors on desks.

Target Audience: Hardware hackers, ESP32 enthusiasts, r/battlestations desk setup obsessives, creative lighting enthusiasts. People who understand "v1" and want to co-create the future.

Goal: Convert 100 early believers who understand they're buying v1 hardware + platform vision, not a finished product. Honesty and transparency are critical.

Price: $249 (single tier, no upsells)
Ships: March 2026

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DESIGN SYSTEM (USE PRISM.NODE AESTHETIC)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Color Palette:
--bg: #1C2130 (dark canvas)
--surface: #252D3F (card background)
--elev: #2F3849 (elevated surface)
--text: #E6E9EF (primary text)
--text-2: #B5BDCA (secondary text)
--gold: #FFB84D (CTA color, accents)
--ok: #22DD88 (success green)
--warn: #F59E0B (warning orange)
--info: #6EE7F3 (info cyan)

Typography:
- Display: Bebas Neue (uppercase headlines, tracking-tight)
- UI: M PLUS Rounded 1c (body copy, labels)
- Mono: JetBrains Mono (specs, technical details)

Glass Morphism Style:
- Background: rgba(255,255,255,0.06)
- Backdrop blur: 20px
- Border: 1px solid rgba(255,255,255,0.20)
- Box shadow: 0 12px 24px rgba(0,0,0,0.18), 0 32px 64px rgba(0,0,0,0.27)
- Pseudo-element for top-left light source highlight
- Pseudo-element for bottom-right environmental reflection
- Heavy glass variant: 0.10 opacity, 40px blur for important cards

Background Effects:
- LED flow animation (conic gradient + radial gradients, slow 24s animation)
- Subtle noise texture overlay
- Dark canvas base color

Visual Style:
- Dark theme first (makes product LEDs pop in photos)
- Premium, technical, honest aesthetic
- Product photography in real contexts (desks, not studio shots)
- Generous whitespace
- Subtle animations (hover states, scroll reveals)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAGE STRUCTURE (7 SECTIONS)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. HERO SECTION (100vh - Full Screen)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Background: Full-screen image of K1-Lightwave on a desk, glowing with colorful LED patterns. Apply dark gradient overlay (30-60% opacity) for text readability.

Center Content (Glass Card):
- Logo placeholder (small gold gradient square)
- Headline (font-display, 6xl): "K1-Lightwave"
- Subheadline (text-xl, gold color): "Founder's Edition"
- Main pitch (text-2xl): "First 100 Units. Help Us Build V2."
- Description (text-lg, text-2 color): "Dual edge-lit LGP. 320 individually addressable LEDs. ESP32-S3. Open hardware. V1 ships March 2026."
- Scarcity indicator (glass-inset badge, orange warning color): "⚠️ 73 of 100 units remaining"
- Two CTAs:
  - Primary (gold background, black text, large): "Reserve Yours – $249"
  - Secondary (glass-inset): "Learn More ↓"
- Subtle scroll indicator at bottom center (pulsing down arrow)

Glass card styling: Center-aligned content, max-width 2xl, generous padding, heavy glass variant with glow effect on primary CTA.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. HARDWARE SHOWCASE (80vh)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Headline (font-display, 5xl, center): "What Makes K1 Different"

Bento Grid Layout (asymmetric, 12-column grid):

Large Card (8 columns, 2 rows tall):
- Product rotating 3D view or video showing K1 from multiple angles
- Glass card with rounded-2xl corners, overflow hidden

Top-Right Card (4 columns, 1 row):
- Icon: Abstract dual-edge light visualization
- Title (font-display, uppercase): "Dual Edge-Lit LGP"
- Body: "First consumer device with dual-edge illumination. Light enters from both sides, creating even, diffused glow with zero hotspots. Not an LED strip. A light guide."
- Glass-inset styling

Middle-Right Card (4 columns, 1 row):
- Icon: Grid pattern representing LEDs
- Title: "320 Addressable LEDs"
- Body: "Not RGB zones. True per-LED control (RGBIC). 160 LEDs per edge. Powered by ESP32-S3 dual-core. Run patterns at 120+ FPS."
- Glass-inset styling

Bottom Full-Width Card (12 columns, 1 row):
- Image: K1 on a real desk setup (mechanical keyboard, monitor, tasteful decor)
- Overlay text: "Built for Desks"
- Body: "32cm length. Sits perfectly under 27-34" monitors. USB-C powered. Mounts via 3M adhesive or stand. Cable management built in."
- Glass-heavy styling

Grid gap: 1rem
Responsive: Stack vertically on mobile, adjust column spans on tablet

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. THE VISION - STICKY SPLIT SCREEN (300vh scroll height, 100vh visible)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sticky container at top, split into two panels (50/50 on desktop).

LEFT PANEL (Sticky, Glass Heavy Card):
- Title (font-display, 4xl, uppercase): "What Ships Now"
- Intro text (lg, text-2 color): "V1 firmware is functional, not flashy. You get:"
- Checklist (text-lg):
  ✓ 12 preset patterns
  ✓ Music-reactive (spectrum analyzer)
  ✓ WiFi control (web UI)
  ✓ Open source firmware (ESP-IDF)
- Warning callout (glass-inset, orange border):
  Bold: "Honest talk:"
  "This is v1. It works. It's not polished. If you need plug-and-play perfection, wait for v2."

RIGHT PANEL (Scrollable content, 3 cards with spacing):
- Title (font-display, 4xl, uppercase): "What's Coming"
- Intro: "This is where YOU come in. Our roadmap:"

Card 1 (glass-inset):
- Large screenshot/mockup of PRISM.node interface
- Badge (gold background, small): "STEP 1"
- Title (font-display, 3xl): "PRISM.node"
- Description: "Visual programming interface. No code required."

Card 2 (glass-inset):
- Icon/illustration representing marketplace
- Badge (info color): "STEP 2"
- Title: "Pattern Marketplace"
- Description: "Share patterns. Sell designs. Community-driven."

Card 3 (glass-inset):
- Icon/illustration for integrations
- Badge (green color): "STEP 3"
- Title: "Platform Integrations"
- Description: "Home Assistant, WLED, Spotify, IFTTT."

Bottom Callout (glass-heavy, centered):
- Bold text (lg): "The first 100 decide priority."
- Body (text-2 color): "Weekly dev updates. Discord access. Feedback surveys. Your needs shape the roadmap. You're not customers—you're co-creators."

Scroll Behavior: As user scrolls, fade between the 3 cards on the right while left panel stays visible. Use scroll-triggered opacity transitions.

Mobile: Stack left panel on top, then scrollable right content below (no sticky).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. CO-CREATOR PITCH (60vh)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Headline (font-display, 5xl, center): "You're Not Buying a Product."
Subhead (2xl, center, text-2 color): "You're joining a journey."

Three Icon Cards (grid, 3 columns, glass-inset):

Card 1:
- Icon: 📬 (large emoji, 5xl)
- Title (font-display, 2xl, uppercase): "Weekly Dev Updates"
- Body (text-2 color): "Behind-the-scenes. Firmware progress. Feature previews. No marketing fluff."

Card 2:
- Icon: 💬
- Title: "Founder's Discord"
- Body: "Direct access to dev team. Ask questions. Share patterns. Debug together."

Card 3:
- Icon: 🗳️
- Title: "Priority Input"
- Body: "Monthly surveys. Feature votes. Your needs shape what we build next."

Below Cards: Large Glass Heavy Card
- Title (font-display, 3xl, uppercase): "Founder's Edition Perks"
- Two-column checklist grid (text-lg):

  Left Column:
  ✓ Numbered Unit
     Laser-etched serial (e.g., "23/100")
  ✓ Beta Firmware Access
     New features before public release
  ✓ Credits
     Your name in firmware & docs

  Right Column:
  ✓ Lifetime Updates
     All firmware updates, forever
  ✓ 20% Off V2
     When we launch the next gen
  ✓ Open Hardware
     Schematics + firmware source on GitHub

Gold checkmarks, text-2 color for descriptions.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. WHO IS THIS FOR? (60vh)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Headline (font-display, 5xl, center): "Is K1 Right For You?"

Two-Column Grid (50/50 split):

LEFT CARD (Glass-inset, green accent):
- Title (font-display, 3xl, uppercase, green color): "✓ You'll Love This If..."
- Bulleted list (text-lg):
  → You tinker with ESP32, Arduino, or Raspberry Pi
  → You've used WLED, FastLED, or similar LED projects
  → Your desk setup is on r/battlestations (or should be)
  → You want the first dual edge-lit LGP light bar
  → You're okay with "v1" rough edges
  → You want to shape what this becomes

RIGHT CARD (Glass-inset, orange border, warning tone):
- Title (font-display, 3xl, uppercase, orange color): "⚠️ This Isn't For You If..."
- Bulleted list (text-lg, text-2 color):
  → You want plug-and-play perfection
  → You need extensive customer support
  → You expect mobile apps and mature integrations now
  → You've never flashed firmware or edited config files
  → You're buying this as a gift for someone non-technical

- Bottom callout (glass-inset within card):
  Bold: "We're being honest:"
  "V1 is for pioneers. If you need mature software, wait for our Kickstarter in Q3 2026."

Mobile: Stack vertically, ideal customer card first.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. PRICING SECTION (80vh)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Headline (font-display, 6xl, center): "Founder's Edition"
Subhead (xl, center, text-2 color): "One tier. Fair price. Ships March 2026."

Single Centered Card (Glass Heavy, max-width 2xl):
- Badge at top (gold background, center): "Unit 73/100"
- Price (font-display, 7xl, gold color, center): "$249"
- Divider line (subtle, white/10 opacity)

What's Included Section:
- Title (font-display, uppercase, lg): "What's Included"
- Checklist (text-lg, two columns):

  Left:
  ✓ 1x K1-Lightwave (numbered)
  ✓ USB-C cable + power adapter
  ✓ Mounting kit (adhesive + stand)
  ✓ Beta firmware access

  Right:
  ✓ Founder's Discord
  ✓ Lifetime updates
  ✓ 20% off v2 hardware
  ✓ Name in credits

- Divider line

Ship Date (center, text-lg):
  "Ships: March 2026"

- Large CTA button (full-width, gold background, black text, 2xl, bold, rounded-xl):
  "Reserve Your Unit"

Below Card (center-aligned, text-lg, text-2 color):
- ✓ 30-day returns
- ✓ 1-year warranty
- ✓ Pay now, or 50% deposit + 50% at ship

Hover effect on CTA: Subtle scale up (1.05), shadow glow increase.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
7. FAQ SECTION (Auto height, ~80vh)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Headline (font-display, 5xl, center): "Questions?"

FAQ Accordion (max-width 4xl, centered):

Each FAQ item is a glass-inset card with:
- Question (font-display, xl, uppercase, cursor pointer)
- Expandable answer (text-lg, text-2 color, padding when open)
- Smooth expand/collapse animation

FAQ Questions & Answers:

1. "What exactly ships in March 2026?"
   Answer: "Hardware: K1-Lightwave unit, USB-C cable, power adapter, mounting kit. Firmware: V1 with 12 preset patterns, music-reactive mode, WiFi control. Not included: PRISM.node (coming Q3 2026), mobile app (TBD)."

2. "Can I return it if I don't like it?"
   Answer: "Yes. 30-day return window from delivery date. Full refund minus shipping. We're confident you'll love it, but we understand v1 isn't for everyone."

3. "Is the firmware really open source?"
   Answer: "Yes. Full source on GitHub (Apache 2.0 license). Hardware schematics too. Fork it, mod it, share it. We encourage hacking."

4. "Will there be more than 100 units?"
   Answer: "Yes, but not immediately. This is a limited founder's run. After we ship these 100 and gather feedback, we'll launch a full Kickstarter (Q3 2026) with v2 improvements. Founder's Edition holders get 20% off v2 + priority shipping."

5. "What if something breaks?"
   Answer: "1-year hardware warranty covers defects. We'll replace or repair. For v1, we also offer Discord support (founders-only channel) where we troubleshoot together."

6. "Why should I buy v1 instead of waiting for v2?"
   Answer: "If you want to shape the product: Your feedback becomes features. If you want exclusivity: Only 100 numbered units exist. If you want savings: V2 will cost more (~$329). You get 20% off as a founder. If you want to wait: That's totally fine. We'll see you at the Kickstarter."

7. "What's the difference between K1 and other LED strips?"
   Answer: "It's not an LED strip. It's a dual edge-lit light guide plate. LEDs are hidden at the edges. Light diffuses through the acrylic. No hotspots, no visible LEDs. Clean, even glow. Also: 320 individually addressable LEDs (RGBIC), not RGB zones."

Space between items: 1rem
Accordion interaction: Click to expand/collapse, show/hide answer with smooth transition

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
8. FOOTER (Auto height, ~30vh)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Dark background (slightly darker than body), glass-inset top border.

Final CTA Section (center, glass-heavy card):
- Text (2xl): "Ready to join the first 100?"
- CTA button (gold, large): "Reserve Your Unit – $249"

Email Capture (center, below CTA):
- Text (text-2 color): "Sold out? Join the waitlist for Kickstarter launch:"
- Email input field (glass-inset) + Submit button (gold)

Footer Links (center, grid 3-column):
- Column 1: About, Contact, Press Kit
- Column 2: GitHub, Discord, Twitter
- Column 3: Terms, Privacy, Warranty

Copyright (center, small, text-2 color, opacity-70):
"© 2026 K1-Lightwave. First 100 units only."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RESPONSIVE DESIGN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Desktop (>1024px):
- Bento grid: asymmetric 12-column layout
- Sticky split: side-by-side panels
- Pricing: single centered card
- FAQ: 2-column where appropriate

Tablet (768-1023px):
- Bento grid: adjust to 6-column
- Sticky split: reduce left panel width to 40%
- Maintain two-column layouts where readable

Mobile (<767px):
- Stack all sections vertically
- Bento grid: single column, equal heights
- Sticky split: no sticky, stack top-to-bottom
- Hero text: reduce font sizes (6xl → 3xl)
- Single column for all grids
- Full-width CTAs

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERACTIONS & ANIMATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. LED Flow Background:
   - Slow 24-second conic gradient animation
   - Radial gradients for light source simulation
   - Subtle, not distracting

2. Glass Cards:
   - Hover: Slight brightness increase on border
   - Cursor: pointer on interactive elements

3. CTAs:
   - Hover: Scale 1.05, shadow glow increase
   - Active: Scale 0.98

4. Scroll Reveals:
   - Fade-in animations as sections enter viewport
   - Use Intersection Observer approach
   - Subtle, not jarring

5. FAQ Accordion:
   - Smooth height transition (300ms ease)
   - Rotate chevron icon on expand

6. Sticky Split:
   - Fade between right-side cards based on scroll position
   - Smooth opacity transitions (500ms)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONVERSION OPTIMIZATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Scarcity: "73 of 100 units remaining" appears in hero and pricing sections
2. Social Proof: Mention "14 units reserved in last 24h" below pricing (subtle)
3. Price Transparency: $249 shown in hero, pricing section, footer CTA
4. Multiple CTAs: Hero, pricing section, footer (all consistent messaging)
5. Risk Reversal: "30-day returns" and "1-year warranty" mentioned prominently
6. Honesty: Clear about v1 state, what ships vs what's coming
7. Email Capture: Waitlist for those who miss the 100 units

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COPY TONE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Direct and honest (no marketing fluff)
- Technical but accessible
- Confident but not overselling
- Emphasize "first 100", "v1", "co-creator" framing
- Use "you" and "your" (personal, not corporate)
- Short sentences, active voice
- Embrace limitations as features ("v1 is for pioneers")

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VISUAL ASSETS NEEDED (PLACEHOLDERS)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Hero background: K1-Lightwave on desk, glowing with LED patterns
2. Bento grid large: Rotating 3D product view or multi-angle video
3. Bento grid context: K1 on desk with monitor, keyboard, tasteful setup
4. Vision section: PRISM.node interface screenshot/mockup (labeled "coming soon")
5. Icons: Simple, minimalist (can use emojis as placeholders)
6. Product detail shots: Close-ups of dual edge-lit LGP, LED detail, mounting

Use placeholder images where needed. Final assets will be provided later.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OUTPUT FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Generate clean, production-ready HTML with Tailwind CSS classes. Export code should include:
- Full CSS custom properties in :root
- Glass morphism styles with pseudo-elements
- LED flow animation keyframes
- Responsive breakpoints
- All sections in order
- Interactive elements (accordion, hover states)
- Semantic HTML5 tags

Prioritize visual hierarchy, readability, and conversion optimization throughout.
```

---

## Usage Instructions

1. Copy the entire prompt above (between the ``` markers)
2. Go to Aura.build
3. Create new project
4. Paste prompt into generation field
5. Click "Generate"
6. Wait 2-3 minutes for initial generation
7. Use Aura's DIV editor to refine:
   - Adjust scarcity counter (73 → actual number)
   - Swap placeholder images with real assets
   - Fine-tune colors if needed
   - Test FAQ accordion interaction
8. Export HTML when satisfied
9. Integrate into Next.js project

## Expected Output

Aura should generate:
- Clean HTML structure with all 7 sections
- Tailwind CSS classes throughout
- Custom CSS for glassmorphism effects
- LED flow animation (conic + radial gradients)
- Responsive breakpoints
- Interactive elements (accordion, hover states)

## Post-Generation Checklist

- [ ] Hero background video/image looks good
- [ ] Glassmorphism effects render correctly
- [ ] All 7 sections present and styled
- [ ] CTAs are prominent (gold buttons)
- [ ] FAQ accordion expands/collapses
- [ ] Responsive on mobile (test in Aura preview)
- [ ] Scarcity counter is visible
- [ ] All copy is accurate

## Troubleshooting

**If Aura generates poorly:**
- Try breaking prompt into 2 parts (sections 1-4, then 5-8)
- Simplify sticky split section (most complex part)
- Remove LED flow animation (add manually later)
- Focus on structure first, polish second

**If sections are missing:**
- Regenerate with emphasis on missing section
- Use Aura's "Add Section" feature
- Manually code the section in exported HTML

## Next Steps After Generation

1. Export HTML from Aura
2. See `docs/04-planning/K1-LP.Plan_ACTION_ITEMS_EXECUTION_v1.0_20251110.md` for integration steps
3. Replace placeholders with real assets
4. Set up payment processing
5. Launch and test

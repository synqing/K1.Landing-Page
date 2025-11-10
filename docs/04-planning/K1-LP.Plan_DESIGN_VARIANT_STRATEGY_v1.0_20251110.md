---
status: active
author: Spectrasynq Landing Team
date: 2025-11-10
intent: Variant strategy outlining A/B/C landing page explorations
---

# K1-Lightwave: 3 Design Variant Strategy
## Research-Backed Design Proposals for A/B/C Testing

**Document Version:** 1.0
**Date:** November 2025
**Based on:** 4 comprehensive research analyses (r/battlestations, competitor landing pages, maker community, streaming gear)

---

## Executive Summary

Based on extensive research across your target markets, I recommend testing 3 **visually distinct designs** optimized for 3 different audience segments within your target market:

| Variant | Target Segment | Design Philosophy | Expected Conversion |
|---------|----------------|-------------------|---------------------|
| **A: Technical/Maker** | ESP32 hackers, open-source advocates | Dark, terminal-inspired, spec-forward | Baseline (3-4%) |
| **B: Lifestyle/Aesthetic** | r/battlestations, desk setup enthusiasts | Refined dark, photography-forward, minimal text | +15-25% vs A |
| **C: Performance/Creator** | Streamers, content creators, RGB enthusiasts | Bold neon, energy-forward, FOMO-driven | +10-20% vs A |

**Key Insight:** Your product bridges 3 markets that have **distinctly different aesthetic preferences**. Testing all 3 simultaneously will reveal which segment converts best, informing your long-term positioning.

---

## Research-Backed Audience Segmentation

### **Segment 1: Technical/Maker (20-30% of market)**

**Characteristics:**
- ESP32 enthusiasts, hardware hackers
- Active on r/esp32, Hackaday, GitHub
- Purchase based on technical specs and openness
- Skeptical of marketing language
- Value transparency, replicability, community

**Purchasing Psychology:**
- **Motivated by:** Open source, hackability, technical specs
- **Distrusts:** Oversimplified documentation, closed designs, proprietary ecosystems
- **Decision factors:** GitHub repo quality, BOM availability, license clarity
- **Price sensitivity:** Moderate (will pay for quality but expects transparency)

**Research Evidence:**
- Maker community overwhelmingly values "technical transparency over marketing" (Maker Community Research)
- Trust signals: Open source licensing, GitHub activity, complete schematics, active maintenance
- Aesthetic: Terminal-inspired, dark themes, monospace fonts, neon accents on black

---

### **Segment 2: Lifestyle/Aesthetic (40-50% of market)**

**Characteristics:**
- r/battlestations community (~113K+)
- Spend $500+ on desk aesthetics
- Post setup photos on Instagram/Reddit
- Care deeply about cable management, color coordination
- Value intentional, refined aesthetics over RGB chaos

**Purchasing Psychology:**
- **Motivated by:** "Will this make my setup Instagram-worthy?"
- **Values:** Clean design, color coordination, restraint, minimalism
- **Decision factors:** Photography quality, how product looks in real setups, aesthetic cohesion
- **Price sensitivity:** Low (willing to pay premium for design)

**Research Evidence:**
- r/battlestations shifting away from "RGB chaos" toward **refined, intentional lighting** (Battlestations Research)
- Top posts feature: cable management (obsessed), color coordination (2-3 colors max), dark setups with strategic lighting
- Most popular products: Nanoleaf (customizable geometry), Philips Hue (ecosystem), Govee (clean strips)
- **"Minimalist shift"** - community values Apple-like restraint over gaming aggression

---

### **Segment 3: Performance/Creator (30-40% of market)**

**Characteristics:**
- Streamers, YouTubers, content creators
- RGB enthusiasts, gaming crossover
- Active on Twitch, YouTube, Discord
- Want gear that "pops on camera"
- Community-driven, influencer-influenced

**Purchasing Psychology:**
- **Motivated by:** Visual impact, creative expression, on-camera presence
- **Values:** Bold colors, customization, community themes
- **Decision factors:** How it looks on stream, RGB customization, music reactivity
- **Price sensitivity:** Moderate (will pay for creator tools)

**Research Evidence:**
- Streaming gear bridges **gaming energy + professional tools** (Streaming Research)
- Aesthetic: High contrast, neon/RGB prominent, bold color blocks (black + cyan, purple + pink)
- Marketing emphasis: "Express your brand," "immersive experience," "studio-grade" but playful
- Social proof critical: User setups, community overlays, influencer authenticity

---

## Design Variant A: Technical/Maker

### **Target Audience**
ESP32 hackers, hardware makers, open-source advocates

### **Design Philosophy**
"Honest engineering. Built to be hacked."

### **Visual Style**
Terminal-inspired, spec-forward, GitHub-first

---

### **Color Palette**

```css
/* Base (Dark Terminal) */
--bg: #0D1117          /* GitHub dark bg */
--surface: #161B22     /* Elevated panels */
--text: #C9D1D9        /* Primary text (muted white) */
--text-2: #8B949E      /* Secondary text (gray) */

/* Accents (Terminal Neon) */
--primary: #58A6FF     /* GitHub blue (links, CTAs) */
--success: #3FB950     /* Terminal green (specs, checkmarks) */
--warning: #F0883E     /* Orange (scarcity, warnings) */
--code: #79C0FF        /* Code highlight cyan */

/* Functional */
--border: #30363D      /* Subtle borders */
--shadow: rgba(0,0,0,0.5)  /* Deep shadows */
```

**Rationale:**
- GitHub color scheme signals "open source" immediately
- Terminal aesthetic resonates with hacker culture
- Muted whites (not pure #FFF) = easier on eyes, professional
- Blue CTA = trust, technical credibility (not aggressive gold)

---

### **Typography**

```css
/* Headlines */
font-family: 'JetBrains Mono', 'Fira Code', monospace;
font-weight: 700;
text-transform: uppercase;
letter-spacing: 0.05em;

/* Body */
font-family: 'Inter', -apple-system, system-ui, sans-serif;
font-weight: 400;
line-height: 1.6;

/* Code/Specs */
font-family: 'JetBrains Mono', monospace;
font-weight: 400;
background: rgba(110, 118, 129, 0.1);
```

**Rationale:**
- Monospace headlines = terminal aesthetic, technical authority
- Inter body = readable, modern, GitHub uses it
- Code blocks for all specs (ESP32-S3, 320 LEDs, etc.)

---

### **Layout Characteristics**

**Hero Section:**
```
[K1 product photo - dark bg, LEDs visible]

┌─────────────────────────────────────┐
│ K1-LIGHTWAVE                        │
│ Dual Edge-Lit LGP • 320 LEDs       │
│ ESP32-S3 • Open Hardware            │
│                                     │
│ [View on GitHub] [Technical Docs]  │
│ [Reserve Unit – $249]               │
│                                     │
│ ⚠ 73/100 Founder Units Remaining   │
└─────────────────────────────────────┘
```

**Key Differences from Current Design:**
1. **GitHub link as PRIMARY CTA** (not buried in footer)
2. **Specs in hero** (ESP32-S3, 320 LEDs immediately visible)
3. **No marketing language** ("First 100 units" → "73/100 Founder Units")
4. **Technical Docs link prominent**

**Specs Section (NEW - High Priority):**
```
┌──────────────────────────────────────────┐
│ TECHNICAL SPECIFICATIONS                 │
│                                          │
│ • Microcontroller: ESP32-S3 (Dual-core) │
│ • LEDs: 320 individually addressable     │
│ • Light Guide: Dual edge-lit acrylic    │
│ • Power: USB-C (5V, 3A)                  │
│ • Wireless: WiFi 802.11 b/g/n           │
│ • Firmware: Open source (Apache 2.0)    │
│ • Dimensions: 320mm × 40mm × 12mm        │
│                                          │
│ [Download Schematics] [View BOM]        │
└──────────────────────────────────────────┘
```

**Photography Style:**
- PCB close-ups showing ESP32-S3 chip
- Dual-edge LED strips visible (technical proof)
- Breadboard prototyping images
- Less "lifestyle," more "engineering documentation"

**Copy Tone:**
- "Open hardware certified" (not "first to market")
- "320 individually addressable LEDs (RGBIC)" (precise terminology)
- "Fork the firmware" (not "customize your experience")
- "V1 is lean—you shape V2" (not "help us build")

---

### **Trust Signals**

**Prominent placement (not footer):**
- GitHub stars count (if public repo)
- Apache 2.0 license badge
- OSHWA certification (if applicable)
- Active Discord member count
- "View Schematics" CTA in hero

**What to Remove:**
- Marketing superlatives ("revolutionary," "game-changing")
- Lifestyle imagery without specs
- "Join the journey" emotional language

---

### **Competitor Reference**

**Looks like:**
- Adafruit Learn system (technical but accessible)
- GitHub repo README (structured, spec-forward)
- Framework Laptop landing page (open hardware, transparent)

**Does NOT look like:**
- Govee (consumer-friendly, lifestyle)
- Elgato (premium, polished)
- Gaming peripheral sites (aggressive, performance)

---

## Design Variant B: Lifestyle/Aesthetic

### **Target Audience**
r/battlestations community, desk setup enthusiasts

### **Design Philosophy**
"Elevate your workspace. Intentional lighting."

### **Visual Style**
Refined dark, photography-first, minimal text

---

### **Color Palette**

```css
/* Base (Warm Dark) */
--bg: #1A1D26          /* Warmer than pure black */
--surface: #242933     /* Elevated, subtle warmth */
--text: #E8E9ED        /* Soft white */
--text-2: #A8AEBB      /* Warm gray */

/* Accents (Refined Gold + Muted) */
--primary: #D4A574     /* Muted gold (not bright #FFB84D) */
--accent: #6B8CAE      /* Muted blue (calm, refined) */
--success: #7BA883     /* Soft green */

/* Photography-First */
--overlay: rgba(26, 29, 38, 0.65)  /* Darker overlay for text on photos */
--vignette: radial-gradient(circle, transparent 40%, rgba(26,29,38,0.8) 90%)
```

**Rationale:**
- Warmer dark tones (#1A1D26) vs cold black = more inviting
- Muted gold = refined, premium (not bright/aggressive)
- Soft accent colors = Apple-like restraint
- Research shows r/battlestations values "color coordination" over brightness

---

### **Typography**

```css
/* Headlines */
font-family: 'Syne', 'Manrope', sans-serif;
font-weight: 700;
text-transform: none;  /* NOT all-caps */
letter-spacing: -0.02em;  /* Tighter, refined */

/* Body */
font-family: 'Inter', system-ui, sans-serif;
font-weight: 400;
line-height: 1.75;  /* More spacious for readability */

/* Accents */
font-family: 'JetBrains Mono', monospace;  /* Only for minimal spec callouts */
```

**Rationale:**
- Syne = modern, refined, editorial feel
- NOT all-caps = less aggressive, more sophisticated
- Monospace only for specs (minimal usage)
- Research: r/battlestations aesthetic leans minimalist/Apple-inspired

---

### **Layout Characteristics**

**Hero Section:**
```
[Full-screen: K1 in beautiful desk setup - keyboard, monitor, plants]
[Darker overlay + vignette for text readability]

                K1-Lightwave
           Elevate Your Workspace

    Dual edge-lit light guide with 320 LEDs.
       Designed for desks. Built to last.

        [Reserve Yours – $249]
          [Explore Setups ↓]

               73 of 100 left
```

**Key Differences:**
1. **MUCH larger photography** (75% of viewport, not 50%)
2. **Minimal text** (4 lines vs 8 lines in Variant A)
3. **No specs in hero** (specs available via scroll, not immediate)
4. **Aspirational copy** ("Elevate" vs "First 100 units")
5. **"Explore Setups"** CTA = community showcase

---

**Photography-First Section (NEW):**
```
[Large Gallery Grid - 70% screen real estate]

┌────────────┬─────────┐
│            │  Setup  │
│   Hero     │   A     │
│   Setup    ├─────────┤
│   (Large)  │  Setup  │
│            │   B     │
└────────────┴─────────┘
```

3-4 beautiful desk setups with K1 integrated:
- Minimalist white desk + K1 + plants
- Dark productivity setup + K1 under monitor
- Streaming desk + K1 as backlight
- Japandi aesthetic + K1 accent

**Minimal copy overlays:**
- "Clean. Intentional. Yours."
- "Every desk tells a story."
- "Designed to disappear. Built to shine."

---

**Specs Section (Minimal, Visual):**
```
┌───────────────────────────────────┐
│  Designed for Desks               │
│                                   │
│  320mm    USB-C     WiFi Control  │
│  ─────    ─────     ──────────    │
│  Fits     Powered   App + Web     │
│  27-34"   Simple    Interface     │
│  Monitors          (iOS/Android)   │
└───────────────────────────────────┘
```

**NOT a dense spec table.** Just 3-4 key user-facing features.

---

**Community Section (IMPORTANT):**
```
"Join 27 Founders"

[Grid of user-submitted desk photos with K1]
[Each photo: User's first name + location]

"Share your setup: #K1Lightwave"
```

**Rationale:** r/battlestations is a SHOWCASE community. User-generated content = social proof + aspirational inspiration.

---

### **Copy Tone**

**Use this language:**
- "Elevate," "refine," "intentional," "curated"
- "Designed for desks that matter"
- "Cable management built in"
- "Strategic lighting, not RGB chaos"

**Avoid this language:**
- Technical jargon (ESP32-S3 buried in footer)
- "Hacker," "maker," "open source" (not primary messaging)
- "First 100 units" (feels like beta test)
- All-caps urgency ("ONLY 73 LEFT")

---

### **Trust Signals**

**Different trust anchors than Variant A:**
- **User photos** (not technical specs)
- **Press mentions** (if any - "Featured on...")
- **30-day returns** (reduce purchase anxiety)
- **Setup guide** (not technical docs)

---

### **Competitor Reference**

**Looks like:**
- Nanoleaf landing page (lifestyle photography, creative expression)
- Apple product pages (minimal text, large imagery)
- Premium Kickstarter campaigns (aspirational, community-first)

**Does NOT look like:**
- Adafruit (too technical)
- GitHub (too sparse)
- Gaming sites (too aggressive)

---

## Design Variant C: Performance/Creator

### **Target Audience**
Streamers, content creators, RGB enthusiasts

### **Design Philosophy**
"Your lighting. Your brand. Your stream."

### **Visual Style**
Bold neon, high energy, FOMO-driven

---

### **Color Palette**

```css
/* Base (Pure Black) */
--bg: #000000          /* True black (not dark gray) */
--surface: #0A0A0A     /* Barely elevated */
--text: #FFFFFF        /* Pure white (high contrast) */
--text-2: #AAAAAA      /* Medium gray */

/* Neon Accents (High Saturation) */
--neon-cyan: #00FFFF   /* Electric cyan */
--neon-pink: #FF00FF   /* Hot magenta */
--neon-green: #00FF88  /* Bright green */
--neon-purple: #AA00FF /* Electric purple */

/* CTA */
--cta-primary: linear-gradient(135deg, #FF00FF, #00FFFF);  /* Pink to cyan */
--cta-glow: 0 0 20px rgba(255,0,255,0.6), 0 0 40px rgba(0,255,255,0.4);
```

**Rationale:**
- Pure black = maximum contrast, energy, drama
- Multiple neon colors = RGB culture, streaming aesthetic
- Gradient CTA = eye-catching, modern
- Research: Streaming gear markets with "bold color blocks" and "neon prominence"

---

### **Typography**

```css
/* Headlines */
font-family: 'Chakra Petch', 'Rajdhani', sans-serif;  /* Futuristic, angular */
font-weight: 700;
text-transform: uppercase;
letter-spacing: 0.08em;  /* Wide spacing = impact */

/* Body */
font-family: 'Inter', sans-serif;
font-weight: 500;  /* Medium weight = more energy */
line-height: 1.6;

/* Callouts */
font-family: 'JetBrains Mono', monospace;
font-weight: 700;
color: var(--neon-cyan);  /* Neon text for emphasis */
```

**Rationale:**
- Chakra Petch = cyberpunk, energetic, streaming culture
- Wide letter-spacing = bold, confident
- Neon-colored text = attention-grabbing
- Research: Streaming aesthetic is "bold, playful, high-energy"

---

### **Layout Characteristics**

**Hero Section:**
```
[Video: K1 music-reactive demo - bass pulsing, neon colors cycling]
[Minimal overlay - video is the star]

         🔥 K1-LIGHTWAVE 🔥
      MUSIC REACTIVE • 320 RGB LEDS
         MADE FOR STREAMS

    [CLAIM YOUR SPOT] ← Gradient button with glow
       Only 73/100 Left

    "14 streamers reserved in last 24h"
```

**Key Differences:**
1. **Video autoplay** (not static image) - motion = energy
2. **Emojis** (fire, lightning) - streaming culture accepts this
3. **ALL CAPS** - aggressive, urgent, FOMO
4. **Social proof** - "14 streamers reserved" (bandwagon effect)
5. **"CLAIM YOUR SPOT"** (not "Reserve Yours") - urgency language

---

**Music Reactive Section (HERO FEATURE):**
```
[Split screen]

LEFT: Video of K1 responding to bass drops
RIGHT:
     SYNCS TO YOUR MUSIC

     Every beat. Every drop.
     Real-time audio reactivity.

     • Bass, mids, highs analyzed
     • <30ms latency
     • Works with Spotify, Soundcloud, any audio

     [See It In Action →]
```

**This is THE differentiator for creators.** Make it prominent.

---

**Customization Section:**
```
YOUR STREAM. YOUR COLORS.

[Carousel of 12 preset palettes - bold, saturated colors]

Fire 🔥   Ocean 🌊   Neon ⚡   Cyber 🤖
[Color swatches below each]

"Create your own palette in PRISM.node"
[Coming Q3 2026]
```

**Copy emphasis:** Personalization, branding, creative expression

---

**Community Showcase:**
```
STREAMERS ALREADY USING K1

[Grid of 6 streamer setups - all with K1 visible in background]
[Twitch/YouTube handles visible]

"Share your setup: #K1Lightwave"
"Featured streamers get free Pattern Pack"
```

**Rationale:** Streamer community = influencer-driven. Social proof = other creators using it.

---

### **Copy Tone**

**Use this language:**
- "Make your stream POP"
- "Express your brand"
- "Stand out on camera"
- "Studio-grade. Creator-made."
- "Unlimited colors. Zero limits."

**Avoid this language:**
- "Desk lighting" (too utilitarian)
- "Cable management" (not relevant to creators)
- "Minimalist" (contradicts bold aesthetic)
- Technical ESP32 specs (bury in FAQ)

---

### **Trust Signals**

**Different than other variants:**
- **Streamer testimonials** (if available)
- **Music reactive demo video** (proof of capability)
- **Pattern marketplace preview** (community-created)
- **Discord community size** ("Join 1,200+ creators")

---

### **Conversion Tactics (AGGRESSIVE)**

**Variant C uses MORE urgency than A or B:**

1. **Real-time counter:** "73 of 100 left" updates live
2. **Countdown timer:** "Founder's Edition closes in 13 days"
3. **Social proof ticker:** "Sarah from NYC just reserved Unit 28"
4. **Exit-intent popup:** "Wait! Get 10% off if you join waitlist"
5. **Scarcity everywhere:** Hero, pricing, FAQ, footer

**Rationale:** Streaming community responds to FOMO. Research shows "bold, urgent" CTAs work.

---

### **Competitor Reference**

**Looks like:**
- Razer Stream Controller page (bold, customizable, RGB-forward)
- Elgato marketplace (neon themes, community content)
- Corsair iCUE (RGB ecosystem, immersive experience)
- Gaming peripheral sites (aggressive CTAs, performance emphasis)

**Does NOT look like:**
- Apple (too minimal)
- Adafruit (too technical)
- Professional broadcast gear (too elegant/understated)

---

## Comparison Matrix

| Element | Variant A: Technical | Variant B: Lifestyle | Variant C: Performance |
|---------|---------------------|----------------------|------------------------|
| **Background** | #0D1117 (GitHub dark) | #1A1D26 (warm dark) | #000000 (pure black) |
| **Primary CTA Color** | #58A6FF (blue) | #D4A574 (muted gold) | Gradient (pink→cyan) |
| **Headline Font** | JetBrains Mono | Syne | Chakra Petch |
| **Headline Case** | UPPERCASE | Sentence case | UPPERCASE |
| **Hero Image** | Product + specs visible | Lifestyle desk setup | Music reactive video |
| **Specs Visibility** | Immediate (hero section) | Minimal (scroll down) | Buried (FAQ only) |
| **GitHub Link** | Primary CTA | Footer link | Not visible |
| **Copy Tone** | Technical, honest | Aspirational, refined | Urgent, energetic |
| **Trust Signal** | Open source license | User photos | Streamer testimonials |
| **Urgency Level** | Low (just counter) | Medium (counter + returns) | High (timer + social proof) |
| **Photography Style** | Engineering docs | Lifestyle/editorial | Action/streaming |
| **Target Conversion** | 3-4% baseline | 4-5% (+15-25%) | 4-5% (+10-20%) |

---

## Implementation Roadmap

### **Phase 1: Generate All 3 Variants (Day 1)**

**Time estimate:** 45 minutes

1. **Variant A (Technical):**
   - Modify Aura prompt design section → paste above color palette + typography
   - Generate → export
   - **Time:** 15 minutes

2. **Variant B (Lifestyle):**
   - Modify Aura prompt → lifestyle focus, minimal text, large photography
   - Generate → export
   - **Time:** 15 minutes

3. **Variant C (Performance):**
   - Modify Aura prompt → neon colors, bold typography, video-first
   - Generate → export
   - **Time:** 15 minutes

---

### **Phase 2: Deploy to Test (Day 1-2)**

**Setup:**
- Deploy each variant to separate Vercel project:
  - `k1-technical.vercel.app`
  - `k1-lifestyle.vercel.app`
  - `k1-performance.vercel.app`

**Traffic Split:**
- Option 1: Manual (share different links to different communities)
  - Reddit r/esp32 → Variant A
  - Reddit r/battlestations → Variant B
  - Twitch communities → Variant C
- Option 2: Vercel A/B testing ($20/mo) - automatic 33/33/33 split

---

### **Phase 3: Measure & Iterate (Week 1-2)**

**Metrics to track per variant:**
- Conversion rate (primary CTA clicks)
- Scroll depth (% reach pricing section)
- Time on page
- Bounce rate
- Video engagement (Variant C only)

**Success criteria:**
- **Statistical significance:** 200+ visitors per variant minimum
- **Winning variant:** >2% relative improvement over baseline
- **Decision point:** After 500-1000 total visitors, declare winner

---

### **Phase 4: Optimize Winner (Week 3+)**

Once winner identified:
- Invest in high-quality assets for that aesthetic
- A/B test CTA copy variations
- Refine messaging based on winning segment
- Scale traffic to winning variant

---

## Asset Requirements Per Variant

### **Variant A (Technical) - Asset Needs:**
- [ ] PCB close-up (ESP32-S3 chip visible)
- [ ] Dual-edge LED strips (technical proof)
- [ ] CAD rendering (exploded view)
- [ ] Breadboard prototype images
- [ ] GitHub repo screenshot
- [ ] Wiring diagram

**Photography style:** Clean, well-lit, documentation-quality

---

### **Variant B (Lifestyle) - Asset Needs:**
- [ ] 4-5 beautiful desk setups with K1
- [ ] Minimalist white desk setup
- [ ] Dark productivity setup
- [ ] Streaming desk context
- [ ] Japandi aesthetic setup
- [ ] User-generated content (if available)

**Photography style:** Editorial, lifestyle, aspirational

---

### **Variant C (Performance) - Asset Needs:**
- [ ] 30s music reactive demo (hero video)
- [ ] Streamer desk setups (K1 visible in background)
- [ ] Palette cycle video (all 12 presets)
- [ ] Side-by-side comparison (K1 on vs off)
- [ ] Action shots (lights responding to music)

**Photography style:** High-energy, motion, on-camera

---

## Recommended Testing Strategy

### **Week 1: Validate Segments**

Deploy all 3 variants with **manual traffic split:**
- Post Variant A link in r/esp32, Hackaday
- Post Variant B link in r/battlestations
- Post Variant C link in streaming Discord servers

**Goal:** Confirm segments respond to their aesthetic

---

### **Week 2: True A/B/C Test**

Once segments validated, run **true A/B/C test:**
- Use Vercel A/B testing or Google Optimize
- Automatic 33/33/33 traffic split
- Drive traffic from neutral sources (Twitter, newsletter)

**Goal:** Determine which segment has highest conversion rate

---

### **Week 3+: Double Down on Winner**

- Invest in assets for winning variant
- Refine copy based on winning aesthetic
- Scale marketing to winning segment

---

## Decision Framework

**How to choose which variant wins:**

1. **Conversion rate** (most important) - Which gets most reservations?
2. **Engagement** (secondary) - Which has highest scroll depth + time on page?
3. **Audience quality** (qualitative) - Which segment asks better questions in Discord?
4. **Scalability** (strategic) - Which segment is largest addressable market?

**Example decision:**
- If Variant B (Lifestyle) converts at 5% vs 3.5% for others → **winner**
- Even if maker segment (A) is more engaged, lifestyle segment (B) is 2x larger market

---

## Final Recommendations

### **Priority Order:**

**1. Generate Variant B (Lifestyle) first**
- Largest addressable market (r/battlestations 113K+)
- Research shows this aesthetic is trending (minimalist shift)
- Highest expected conversion lift (+15-25%)

**2. Keep current design as Variant A (Technical)**
- Already built, zero effort
- Establishes baseline conversion
- Appeals to maker segment (important for community)

**3. Generate Variant C (Performance) if time permits**
- Streaming market is secondary but lucrative
- Requires most unique assets (video-heavy)
- Can defer if timeline tight

**Minimum viable test: A vs B** (Technical vs Lifestyle)

---

## Appendix: Aura Prompt Modifications

### **For Variant A (Technical):**

Replace design system section with:
```
DESIGN SYSTEM:

Color Palette:
--bg: #0D1117 (GitHub dark)
--surface: #161B22
--text: #C9D1D9
--text-2: #8B949E
--primary: #58A6FF (blue)
--success: #3FB950 (green)
--warning: #F0883E (orange)

Typography:
- Display: JetBrains Mono (monospace, uppercase)
- Body: Inter (readable, modern)
- All specs in code blocks

Style:
- Terminal-inspired aesthetic
- GitHub color scheme
- Specs-forward layout
- GitHub link as primary CTA
- Minimal glassmorphism (flatter)
```

### **For Variant B (Lifestyle):**

Replace design system section with:
```
DESIGN SYSTEM:

Color Palette:
--bg: #1A1D26 (warm dark)
--surface: #242933
--text: #E8E9ED (soft white)
--primary: #D4A574 (muted gold)
--accent: #6B8CAE (muted blue)

Typography:
- Display: Syne (refined, sentence case)
- Body: Inter (spacious line-height 1.75)
- Minimal use of monospace

Style:
- Photography-first (75% viewport)
- Minimal text (4 lines hero max)
- Large gallery section
- Apple-inspired minimalism
- Aspirational copy tone
- Community showcase prominent
```

### **For Variant C (Performance):**

Replace design system section with:
```
DESIGN SYSTEM:

Color Palette:
--bg: #000000 (pure black)
--surface: #0A0A0A
--text: #FFFFFF (pure white)
--neon-cyan: #00FFFF
--neon-pink: #FF00FF
--neon-green: #00FF88
--cta: linear-gradient(135deg, #FF00FF, #00FFFF)

Typography:
- Display: Chakra Petch (futuristic, uppercase)
- Body: Inter (medium weight 500)
- Wide letter-spacing (0.08em)

Style:
- Video autoplay hero (music reactive)
- Bold neon accents
- Multiple urgency elements (timer + counter)
- High contrast (pure black + white)
- Gradient CTAs with glow effects
- Emojis allowed (fire, lightning)
- Streaming-focused copy
```

---

**Document Complete. Ready for implementation.**

Next step: Generate Variants B & C in Aura, deploy, and test.

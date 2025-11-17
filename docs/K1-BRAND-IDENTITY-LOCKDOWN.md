# K1-Lightwave Brand Identity — LOCKED

**Version:** 1.0
**Date:** 2025-11-17
**Status:** CANONICAL — Do not deviate without explicit approval

---

## Visual Identity Summary

**Brand Position:** "Open hardware datasheet meets premium desk tool"
**Aesthetic:** Technical credibility through restraint, not decoration
**Audience:** Hardware hackers, ESP32 enthusiasts, r/battlestations obsessives

---

## Color Palette (FINAL)

### Primary Colors
```css
--bg:       #1C2130   /* Dark canvas background */
--surface:  #252D3F   /* Card/panel background */
--elev:     #2F3849   /* Elevated surface (hover states) */
--text:     #E6E9EF   /* Primary text */
--text-2:   #B5BDCA   /* Secondary text / muted */
```

### Accent Colors
```css
--gold:     #FFB84D   /* Primary CTA, branding, warm accents */
--ok:       #22DD88   /* Success states, checkmarks, "what works" */
--warn:     #F59E0B   /* Warning states, scarcity, caution */
--info:     #6EE7F3   /* Info states, technical highlights, cyan accents */
```

### Usage Rules
- **Gold (#FFB84D)**: Primary CTAs, K1 logo, brand accents, pricing emphasis
- **Green (#22DD88)**: Checkmarks, success badges, "what's included", positive feedback
- **Orange (#F59E0B)**: Scarcity counter, warnings, "honest talk" callouts
- **Cyan (#6EE7F3)**: Technical specs, LED references, info badges
- **Never use:** Bright reds, purples, or saturated blues (breaks technical credibility)

---

## Typography Stack (FINAL)

### Display / Headlines
**Font:** Bebas Neue
**Usage:** Section headlines, product name, CTAs
**Settings:**
- `text-transform: uppercase`
- `letter-spacing: 0.16em–0.22em` (wider tracking)
- `font-weight: 600–700`
- Sizes: `text-3xl` to `text-6xl` (mobile to desktop)

**Example:**
```html
<h1 style="font-family: 'Bebas Neue'; letter-spacing: 0.2em;">
  K1-LIGHTWAVE
</h1>
```

### Body / UI Text
**Font:** M PLUS Rounded 1c
**Usage:** Paragraphs, descriptions, labels, navigation
**Settings:**
- `font-weight: 400–500` (regular to medium)
- Sizes: `text-sm` to `text-lg`
- Line height: `leading-relaxed` (1.625)

**Example:**
```html
<p class="text-base text-neutral-300" style="font-family: 'M PLUS Rounded 1c';">
  320 individually addressable LEDs...
</p>
```

### Monospace / Technical Specs
**Font:** JetBrains Mono
**Usage:** Specs, code snippets, technical data, pricing
**Settings:**
- `font-weight: 400–600`
- Sizes: `text-xs` to `text-base`
- Use for: LED counts, processor specs, power ratings, prices

**Example:**
```html
<span style="font-family: 'JetBrains Mono';">
  320 RGBIC
</span>
```

---

## Glassmorphism Aesthetic (FINAL)

### Base Glass Card
```css
.glass {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.20);
  box-shadow:
    0 12px 24px rgba(0, 0, 0, 0.18),
    0 32px 64px rgba(0, 0, 0, 0.27);
  border-radius: 1.5rem; /* rounded-3xl */
}
```

### Heavy Glass (Important Cards)
```css
.glass-heavy {
  background: rgba(255, 255, 255, 0.10);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow:
    0 18px 60px rgba(6, 8, 15, 0.9);
}
```

### Glass Inset (Nested Cards)
```css
.glass-inset {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.12);
}
```

### Usage Rules
- **Hero/Pricing cards:** Heavy glass with gold accents
- **Spec blocks:** Base glass with white/10 borders
- **Nested content:** Glass inset for hierarchy
- **Never:** Multiple heavy glass cards side-by-side (breaks hierarchy)

---

## Background Effects (FINAL)

### Clean Radial Gradient
```css
body {
  background:
    radial-gradient(circle at top, #252d3f55, transparent 55%),
    radial-gradient(circle at bottom, #1c2130, #020617);
}
```

### Constraints
- ❌ **NO** LED flow animated backgrounds (killed Phase 3)
- ❌ **NO** noise texture overlays (consumer gadget aesthetic)
- ❌ **NO** conic gradients or rotating effects
- ✅ **YES** to subtle static radial gradients only

---

## Component Patterns

### Corner Brackets (Technical Accent)
```html
<!-- Use sparingly on hero, pricing, or key spec cards -->
<div class="relative">
  <!-- Top-left bracket -->
  <div class="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-gold"></div>
  <!-- Bottom-right bracket -->
  <div class="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-gold"></div>
</div>
```

### Hairline Grid (Spec Sheets)
```css
.spec-grid-overlay {
  background-image:
    linear-gradient(rgba(255,255,255,0.08) 0.5px, transparent 0.5px),
    linear-gradient(90deg, rgba(255,255,255,0.08) 0.5px, transparent 0.5px);
  background-size: 4rem 4rem;
}
```

### Badge Design
```html
<!-- Success badge -->
<span class="inline-flex items-center gap-1.5 rounded-full
             border border-[#22DD88]/40 bg-[#22DD88]/10
             text-xs text-[#22DD88] px-2.5 py-0.5">
  <icon />
  <span>Badge text</span>
</span>
```

---

## Interaction States

### CTA Button (Primary)
```css
.button-primary {
  background: #FFB84D;
  color: #0A0C12;
  box-shadow: 0 8px 20px rgba(255, 184, 77, 0.4);
  transition: all 200ms ease;
}

.button-primary:hover {
  filter: brightness(1.1);
  transform: scale(1.02); /* NOT 1.05 — too aggressive */
}

.button-primary:active {
  transform: scale(0.98);
}
```

### Glass Card Hover
```css
.glass:hover {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.08);
}
```

---

## Copy Tone (LOCKED)

### Voice Attributes
1. **Honest** — No hype without proof, acknowledge V1 limitations upfront
2. **Technical** — Lead with specs, use precise terminology (RGBIC, ESP32-S3, dual edge-lit LGP)
3. **Direct** — Short sentences, active voice, no marketing fluff
4. **Transparent** — "V1 for pioneers", "works but isn't polished", "you'll help debug"

### Forbidden Phrases
- ❌ "Revolutionary", "Game-changing", "Cutting-edge" (unless backed by specific proof)
- ❌ "Amazing", "Incredible", "Stunning" (subjective, no value)
- ❌ "Best-in-class", "Industry-leading" (unverifiable claims)
- ❌ "Limited time offer", "Act now" (false urgency)

### Preferred Patterns
- ✅ "320 individually addressable LEDs" (specific)
- ✅ "V1 ships March 2026" (concrete date)
- ✅ "Works but isn't polished" (honest)
- ✅ "First 100 units only" (factual scarcity)
- ✅ "If you break it, we'll help you debug it" (co-creator framing)

---

## Section Hierarchy (LOCKED)

### Information Architecture
1. **Hero** — Product name, scarcity, primary CTA
2. **Specs** — Hardware details, "who this is for" honesty filter
3. **Roadmap** — What ships now vs what's coming
4. **Pricing** — Single card, $249, what's included
5. **FAQ** — 7 questions (optional, not in current Aura output)
6. **Footer** — Minimal links, brand tagline

### Do Not Reorder Without Approval
This sequence was validated against `docs/landing-page-structure.md`.

---

## Mobile Responsiveness

### Breakpoints
- **Mobile:** `< 767px` — Stack everything, single column
- **Tablet:** `768px–1023px` — 2-column grids where appropriate
- **Desktop:** `> 1024px` — Full bento grids, side-by-side panels

### Mobile Adjustments
- Bebas Neue: `text-3xl` → `text-2xl`
- Remove side-by-side layouts (stack vertically)
- Full-width CTAs
- Reduce glassmorphism blur on low-end devices (optional)

---

## Design System Checklist

Before shipping any page/component:

- [ ] Colors match canonical palette (no deviations)
- [ ] Bebas Neue used for display text (uppercase, wide tracking)
- [ ] JetBrains Mono used for all technical specs
- [ ] Glassmorphism cards have proper backdrop blur + borders
- [ ] No LED flow animations or noise textures
- [ ] CTAs use gold (#FFB84D) with proper shadow
- [ ] Copy tone is honest, technical, direct
- [ ] Mobile responsive (tested 375px, 768px, 1440px)
- [ ] Icons from Lucide library (consistent style)
- [ ] Scarcity counter, pricing, ship date are synchronized

---

## Reference Files

- Color palette source: `docs/landing-page-structure.md`
- Typography guidance: `CLAUDE.md` mission doc
- Aura output: `Aura.html/landingpage04-k1-customized.html`
- Phase 2 success: Referenced in earlier Aura exports

---

**LOCKED ON:** 2025-11-17
**MAINTAINER APPROVAL REQUIRED** for any changes to this document.

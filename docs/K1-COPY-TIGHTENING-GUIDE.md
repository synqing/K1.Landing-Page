# K1-Lightwave Copy Tightening Guide

**Problem:** Aura output is "far too fucking wordy" — descriptions are verbose, some copy repeats itself
**Goal:** Cut 30-40% of words while preserving technical credibility and honesty
**Method:** Surgical edits, section by section

---

## Hero Section

### BEFORE (Wordy)
```
First 100 units. Help us build V2. Dual edge-lit LGP. 320
addressable LEDs. ESP32-S3. Open hardware. V1 ships March
2026.
```
**Word count:** 20 words

### AFTER (Tight)
```
First 100 units. 320 LEDs, ESP32-S3, dual edge-lit.
Open hardware. Ships March 2026.
```
**Word count:** 14 words (-30%)

**Rationale:** "Help us build V2" is implied by "First 100 units" + co-creator framing elsewhere. "Addressable" is redundant if we say "RGBIC" in specs.

---

## Hero Device Panel — Bottom Warning

### BEFORE (Wordy)
```
V1 works, but isn't polished. Expect sharp edges: firmware
changes, rougher UX, and frequent updates. In return, you
influence V2.
```
**Word count:** 22 words

### AFTER (Tight)
```
V1 works but isn't polished. Firmware changes, rough UX,
frequent updates. You shape V2.
```
**Word count:** 14 words (-36%)

**Rationale:** "Expect" → cut (implied). "Sharp edges:" → cut (just list them). "In return" → cut (causality is obvious).

---

## Specs Section — LED Block

### BEFORE (Wordy)
```
Individually addressable, tuned for smooth gradients and
solid whites.
```
**Word count:** 9 words

### AFTER (Tight)
```
Individually addressable. Tuned for gradients + whites.
```
**Word count:** 7 words (-22%)

**Rationale:** "Smooth" is implied by "tuned". "Solid" is redundant with "whites".

---

## Specs Section — Controller Block

### BEFORE (Wordy)
```
Dual-core, WiFi 6 capable module. Enough headroom for custom
patterns and integrations.
```
**Word count:** 13 words

### AFTER (Tight)
```
Dual-core, WiFi 6. Headroom for custom patterns.
```
**Word count:** 8 words (-38%)

**Rationale:** "Capable module" → cut (obvious). "And integrations" → cut (redundant with "custom").

---

## Specs Section — Form Factor Block

### BEFORE (Wordy)
```
Designed to sit behind 27–34" monitors or along a shelf
edge without visual clutter.
```
**Word count:** 15 words

### AFTER (Tight)
```
Fits 27–34" monitors or shelf edges. No clutter.
```
**Word count:** 9 words (-40%)

**Rationale:** "Designed to sit behind" → "Fits". "Without visual clutter" → "No clutter."

---

## Specs Section — Power Block

### BEFORE (Wordy)
```
Standard USB-C input. No proprietary bricks. Design assumes
a clean 5V/3A source.
```
**Word count:** 13 words

### AFTER (Tight)
```
USB-C input. No proprietary bricks. Needs 5V/3A.
```
**Word count:** 8 words (-38%)

**Rationale:** "Standard" → cut (implied). "Design assumes a clean" → "Needs".

---

## Specs Section — Control Block

### BEFORE (Wordy)
```
Runs on ESP-IDF with an HTTP API. You can fork the firmware,
flash your own builds, or stay on the mainline.
```
**Word count:** 21 words

### AFTER (Tight)
```
ESP-IDF + HTTP API. Fork it, flash it, or use mainline.
```
**Word count:** 11 words (-48%)

**Rationale:** "Runs on" → cut (implied). "You can" → cut (direct imperative). "The firmware" → "it". "Your own builds" → "it".

---

## Specs Section — Mounting Block

### BEFORE (Wordy)
```
Ships with 3M adhesive for monitor backs and a simple desk
stand option. No drill required.
```
**Word count:** 16 words

### AFTER (Tight)
```
3M adhesive + desk stand. No drill.
```
**Word count:** 7 words (-56%)

**Rationale:** "Ships with" → cut (implied). "For monitor backs" → cut (context obvious). "Simple...option" → cut (redundant). "Required" → cut (obvious).

---

## Specs Section — "Who This Is For" Card

### BEFORE (Wordy - Bullet 1)
```
• You're comfortable flashing firmware and opening an issue
  when something's off.
```
**Word count:** 12 words

### AFTER (Tight)
```
• You flash firmware and file issues.
```
**Word count:** 7 words (-42%)

**Rationale:** "You're comfortable" → cut (implied by doing it). "Opening an issue when something's off" → "file issues".

### BEFORE (Wordy - Bullet 2)
```
• You want a light bar that talks in APIs, not "modes".
```
**Word count:** 12 words

### AFTER (Tight)
```
• You want APIs, not "modes".
```
**Word count:** 6 words (-50%)

**Rationale:** "A light bar that talks in" → cut (context established).

### BEFORE (Wordy - Bullet 3)
```
• You care more about control and repeatability than marketing
  animations.
```
**Word count:** 11 words

### AFTER (Tight)
```
• You value control over marketing animations.
```
**Word count:** 7 words (-36%)

**Rationale:** "Care more about" → "value". "And repeatability" → cut (redundant with "control"). "Than" → "over".

### Bottom Paragraph
**BEFORE (Wordy):**
```
No mobile app lock-in. No closed effects engine. If you break
it, we'll help you debug it. If you extend it, we'll probably
merge it.
```
**Word count:** 25 words

**AFTER (Tight):**
```
No app lock-in. No closed engine. Break it? We'll debug it.
Extend it? We'll merge it.
```
**Word count:** 17 words (-32%)

**Rationale:** "Mobile app" → "app". "Effects engine" → "engine". Convert conditionals to terse questions.

---

## Roadmap — "What Ships Now" Intro

### BEFORE (Wordy)
```
The unit you get in March 2026 is functional, debuggable,
and open. It's not "finished".
```
**Word count:** 15 words

### AFTER (Tight)
```
March 2026: functional, debuggable, open. Not "finished".
```
**Word count:** 8 words (-47%)

**Rationale:** "The unit you get in" → date prefix. "It's" → cut (parallel structure).

---

## Roadmap — "What Ships Now" Blocks

### Music-Reactive Block
**BEFORE (Wordy):**
```
Line-in style mic input on the board. Simple FFT,
tuned for desk distance.
```
**Word count:** 13 words

**AFTER (Tight):**
```
Mic input on board. Simple FFT for desk use.
```
**Word count:** 9 words (-31%)

**Rationale:** "Line-in style" → cut (technical jargon adds no value). "Tuned for desk distance" → "for desk use".

### WiFi Control Block
**BEFORE (Wordy):**
```
Local web UI. No cloud, no account. JSON API if you
want to script it.
```
**Word count:** 16 words

**AFTER (Tight):**
```
Local web UI. No cloud. JSON API for scripting.
```
**Word count:** 10 words (-38%)

**Rationale:** "No account" → cut (implied by "no cloud"). "If you want to script it" → "for scripting".

### Honest Warning Block
**BEFORE (Wordy):**
```
V1 works but isn't polished. UI rough edges, missing
docs, and firmware churn are expected while we converge
with you.
```
**Word count:** 21 words

**AFTER (Tight):**
```
V1 works but isn't polished. Expect rough UI, missing docs,
firmware churn.
```
**Word count:** 13 words (-38%)

**Rationale:** "Are expected while we converge with you" → "Expect" (move verb). Cut "with you" (obvious).

---

## Roadmap — "What's Coming" Intro

### BEFORE (Wordy)
```
These are roadmap items, not promises. Early buyers help
decide what ships first.
```
**Word count:** 13 words

### AFTER (Tight)
```
Roadmap, not promises. You decide priority.
```
**Word count:** 6 words (-54%)

**Rationale:** "These are...items" → just "Roadmap". "Early buyers help decide what ships first" → "You decide priority".

---

## Roadmap — "What's Coming" Blocks

### PRISM.node Block
**BEFORE (Wordy):**
```
Visual programming for patterns. Drag nodes to build
animations instead of compiling C. Early builds will be
rough but scriptable.
```
**Word count:** 21 words

**AFTER (Tight):**
```
Visual programming for patterns. Drag nodes, skip compiling.
Rough but scriptable.
```
**Word count:** 12 words (-43%)

**Rationale:** "To build animations instead of compiling C" → "skip compiling". "Early builds will be" → cut (just state the outcome).

### Pattern Marketplace Block
**BEFORE (Wordy):**
```
Share and load community patterns from a small,
curated library. No dark patterns, no subscriptions.
```
**Word count:** 15 words

**AFTER (Tight):**
```
Share + load community patterns. Curated library. No dark
patterns or subscriptions.
```
**Word count:** 12 words (-20%)

**Rationale:** "From a small, curated library" → "Curated library" (separate sentence for punch). "No...no" → "No...or" (parallel).

### Platform Integrations Block
**BEFORE (Wordy):**
```
Home Assistant, WLED compatibility layer, and potential
Spotify / media sync. Which ones land first depends on
the first 100.
```
**Word count:** 21 words

**AFTER (Tight):**
```
Home Assistant, WLED, Spotify sync. First 100 decide priority.
```
**Word count:** 10 words (-52%)

**Rationale:** "Compatibility layer" → cut (technical noise). "And potential...media sync" → just "Spotify sync". "Which ones land first depends on the first 100" → "First 100 decide priority".

---

## Roadmap — Bottom Callout

### BEFORE (Wordy)
```
The first 100 decide priority. You're co-creators, not
customers.
```
**Word count:** 10 words

### AFTER (Tight)
```
First 100 decide priority. Co-creators, not customers.
```
**Word count:** 8 words (-20%)

**Rationale:** "The" → cut. "You're" → cut (implied).

---

## Pricing Section — Header

### BEFORE (Wordy)
```
73 of 100 units remaining. Production run is capped to keep
the feedback loop tight.
```
**Word count:** 15 words

### AFTER (Tight)
```
73 of 100 units left. Capped run = tight feedback loop.
```
**Word count:** 11 words (-27%)

**Rationale:** "Remaining" → "left". "Production run is capped to keep the feedback loop tight" → "Capped run = tight feedback loop".

---

## Pricing Section — What's Included

### Hardware Bullets
**BEFORE (Wordy - Bullet 3):**
```
ESP32-S3 control board, USB-C powered
```
**Word count:** 6 words

**AFTER (Tight):**
```
ESP32-S3 controller, USB-C
```
**Word count:** 4 words (-33%)

**Rationale:** "Control board" → "controller". "Powered" → cut (implied).

### Software Bullets
**BEFORE (Wordy - Bullet 2):**
```
Access to roadmap calls and feedback channels
```
**Word count:** 7 words

**AFTER (Tight):**
```
Roadmap calls + feedback channels
```
**Word count:** 5 words (-29%)

**Rationale:** "Access to" → cut (implied).

**BEFORE (Wordy - Bullet 3):**
```
Early access to PRISM.node and integrations
```
**Word count:** 6 words

**AFTER (Tight):**
```
Early PRISM.node + integrations
```
**Word count:** 4 words (-33%)

**Rationale:** "Access to" → cut. "Early" is kept for emphasis.

---

## Pricing Section — Bottom Fine Print

### BEFORE (Wordy)
```
30-day returns • 1-year warranty • Optional 50/50 payment
(50% now, 50% before shipment).

No crypto, no BNPL. Plain card payments only.
```
**Word count:** 23 words

### AFTER (Tight)
```
30-day returns • 1-year warranty • 50/50 payment option.

Card payments only. No crypto or BNPL.
```
**Word count:** 16 words (-30%)

**Rationale:** "Optional 50/50 payment (50% now, 50% before shipment)" → "50/50 payment option" (details obvious). "Plain" → cut. Flip sentence order for punch.

---

## Footer Tagline

### BEFORE (Wordy)
```
Built for hardware hackers, ESP32 enthusiasts, and desk setup
obsessives.
```
**Word count:** 11 words

### AFTER (Tight)
```
For hardware hackers, ESP32 enthusiasts, desk obsessives.
```
**Word count:** 8 words (-27%)

**Rationale:** "Built for" → "For". "Desk setup obsessives" → "desk obsessives".

---

## Summary of Cuts

| Section | Before | After | % Reduction |
|---------|--------|-------|-------------|
| Hero description | 20 | 14 | -30% |
| Device warning | 22 | 14 | -36% |
| LED spec | 9 | 7 | -22% |
| Controller spec | 13 | 8 | -38% |
| Form factor | 15 | 9 | -40% |
| Power spec | 13 | 8 | -38% |
| Control spec | 21 | 11 | -48% |
| Mounting spec | 16 | 7 | -56% |
| Who this is for (3 bullets) | 35 | 20 | -43% |
| Roadmap intro (now) | 15 | 8 | -47% |
| Roadmap intro (coming) | 13 | 6 | -54% |
| PRISM.node | 21 | 12 | -43% |
| Integrations | 21 | 10 | -52% |
| Pricing header | 15 | 11 | -27% |
| Footer tagline | 11 | 8 | -27% |

**Overall:** ~35-40% word reduction across all sections

---

## Copy Editing Principles Applied

1. **Cut implied verbs:** "You're comfortable flashing" → "You flash"
2. **Remove hedging:** "Enough headroom" → "Headroom"
3. **Convert conditionals to questions:** "If you break it, we'll debug" → "Break it? We'll debug."
4. **Eliminate redundant modifiers:** "Simple FFT, tuned for" → "FFT for"
5. **Use parallel structure:** "No cloud, no account" → "No cloud" (second is implied)
6. **Prefer symbols over words:** "and" → "+", "or" → "/"
7. **Cut marketing fluff:** "Designed to" → direct statement
8. **Use present tense imperatives:** "You can fork" → "Fork it"

---

## Next Step: Apply Edits to HTML

Use these edits as a reference to manually update `Aura.html/landingpage04-k1-customized.html` or create a new Aura prompt with "tightened copy" as input.

Alternatively, port this to the Next.js components in `.deprecated/` and apply the edits there.

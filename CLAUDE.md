# CLAUDE Agent Operations Manual — K1.Lightwave Landing Page

Guardrails for autonomous or semi-autonomous agents working in the K1.Lightwave landing page workspace. Follow this guide before touching copy, assets, or code so every artifact stays aligned with the current launch plan.

---

## 1. Mission & Product Snapshot
- **Goal**: Sell out the first 100 Founder's Edition units to validate demand and collect feedback ahead of the broader PRISM.node launch.
- **Hardware**: 32 cm dual edge-lit light guide plate, 320 addressable RGB LEDs (160 per edge), ESP32-S3 controller, USB-C power.
- **Offer**: $249 per unit (50/50 payment option), March 2026 delivery, numbered hardware, Discord access, lifetime firmware updates, 20% off v2.
- **Audience**: Hardware hackers, desk-setup obsessives, creative lighting enthusiasts, and early adopters willing to co-create V2.
- **Voice**: Honest, technical, co-creator friendly. No hype without proof; lead with transparency and specs.

---

## 2. Repository Map (Authoritative)
| Path | Description |
| --- | --- |
| `docs/` | Everything that defines the story: strategy, structure, research, prompts, asset plans, and action checklists. |
| `docs/landing-page-strategy.md` | Positioning, audience segments, pricing, messaging tone. |
| `docs/landing-page-structure.md` | Seven-section information architecture, design tokens, animation guidelines. |
| `docs/action-items.md` | Sequenced execution backlog (asset capture → Aura integration → polish). Update it whenever you add/remove work. |
| `docs/aura-prompt.md` | Prompt + instructions for generating layouts in Aura. |
| `docs/asset-production-plan.md` | Shot lists and deliverables for photography/video. |
| `docs/ANALYSIS-SUMMARY.md` & `docs/competitor-*.md` | Competitive research and synthesis. Reference them whenever you justify a design or copy move. |
| `Aura.html/` | Exported Aura builds (`landingpage*.html`, `PRISM.node*.html`). Open in a browser for quick reviews or to diff against new exports. |
| `app/examples/tokens/page.tsx` | Minimal Next.js page showing current semantic tokens; extend once the refreshed app shell is in place. |
| `.deprecated/` | Previous full Next 14 + Tailwind implementation, complete with configs, `node_modules/`, `out/`, etc. Use this folder to run the site locally until the new root-level app is rebuilt. |
| `.claude/`, `.github/`, `.vscode/` | Agent defaults, workflow automation, editor settings. Leave untouched unless the maintainer asks for changes. |

**Rule**: Do not add new top-level directories. New artifacts belong in `docs/`, `Aura.html/`, or the active Next app directory.

---

## 3. Source-of-Truth Documents
Always align work with these files (in order):
1. `docs/landing-page-strategy.md`
2. `docs/landing-page-structure.md`
3. `docs/action-items.md`
4. `docs/asset-production-plan.md`
5. `docs/ANALYSIS-SUMMARY.md` + the detailed competitor/design pattern docs listed there

Before posting new copy or layouts, re-read the strategy + structure docs to ensure the tone, section order, and CTAs still match current guidance.

---

## 4. Standard Workflow
1. **Ingest**  
   - Skim the five docs above plus any files referenced inside your assigned ticket.  
   - Confirm whether the work touches assets, copy, layout, or code.
2. **Plan**  
   - Document the intended change inside `docs/action-items.md` (new checkbox or notes) before beginning hands-on work.  
   - If the change is exploratory, create a short brief (e.g., `docs/hero-video-test-notes.md`).
3. **Prototype**  
   - Use Aura (`docs/aura-prompt.md`) for layout or copy experiments. Export to `Aura.html/landingpageXX.html` with incremental numbering and note the diff in `docs/action-items.md`.
4. **Implement**  
   - Until the refreshed app lands at the repo root, mirror production-intent code in `.deprecated/`. When editing there, keep changes isolated (e.g., update `app/page.tsx`, `app/components/*`, or styles).  
   - For token or design-system work, update `app/examples/tokens/page.tsx` plus any supporting CSS/JS once the official app shell exists.
5. **Document**  
   - Summaries of what changed, why, and any data/insights go into `docs/` using concise, kebab-case filenames. Link back to the section or prototype you touched.
6. **Review & Handoff**  
   - Validate again against the strategy doc.  
   - Ensure `docs/action-items.md` reflects completion status and references the asset or commit.

---

## 5. Document & Asset Routing Rules
| Artifact Type | Location | Naming Guidance |
| --- | --- | --- |
| Strategy / Positioning updates | `docs/*strategy*.md` or `docs/landing-page-strategy.md` | Append sections or add a new file such as `docs/messaging-v2-strategy.md`. |
| Layout or structural updates | `docs/landing-page-structure.md` or a sibling file (`docs/section-five-refresh.md`). |
| Research / analysis | `docs/competitor-*.md`, `docs/design-patterns-quick-reference.md`, etc. Use `docs/<topic>-analysis.md`. |
| Execution plans / checklists | `docs/action-items.md`, `docs/asset-production-plan.md`, `docs/landing-page-structure.md#production-notes`. |
| Prompts / scripts | `docs/aura-prompt.md` (append new sections) or `docs/<tool>-prompt.md`. |
| Exported layouts | `Aura.html/landingpageNN.html`, `Aura.html/PRISM.nodeNN.html`. Increment `NN` and log the change. |
| Code experiments | Root `app/` once rebuilt; interim work goes in `.deprecated/` (match Next.js conventions). |

**Filenames**: lowercase, kebab-case, `.md` for docs, `.html` for Aura exports. Include dates only when needed (`-20250305.md`). No spaces.

---

## 6. Prototyping & Build Notes
### Aura
- Use the prompt in `docs/aura-prompt.md`.
- Keep exports lightweight: compress hero video (<5 MB) and stills before uploading.
- After exporting new HTML, capture a 1–2 sentence summary + file name in `docs/action-items.md`.

### Next/Tailwind (`.deprecated/`)
```bash
cd .deprecated
npm install           # first run
npm run dev           # http://localhost:3000
```
- This environment already has Next 14, Tailwind, PostCSS, and TypeScript configured.
- When editing, keep changes scoped and document affected files in your PR/summary.
- Once the new root-level app is ready, copy the updated `app/` tree + configs out of `.deprecated/` and delete stale files here.

### Token Demo
- `app/examples/tokens/page.tsx` mirrors the semantic tokens defined in design docs. Update class names or token definitions when the official palette/spacing tokens change.

---

## 7. Roles & Deliverables
- **Design Researcher**: Maintain `docs/ANALYSIS-SUMMARY.md`, competitor breakdowns, and testing recommendations. Deliver actionable insights referenced by copy/design tasks.
- **Copy & Messaging Lead**: Own hero/pricing/FAQ copy inside Aura exports and sync updates back into Markdown (e.g., `docs/landing-page-structure.md`). Ensure tone matches `docs/landing-page-strategy.md`.
- **Implementation Engineer**: Translate approved Aura layouts into Next/Tailwind, keep design tokens in sync, and manage build tooling (currently under `.deprecated/`). Provide runnable previews and note dependencies.
- **Asset Producer**: Execute `docs/asset-production-plan.md`, deliver graded photos/videos, and log filenames + storage locations. Flag blockers in `docs/action-items.md`.
- **QA / Optimization** (optional rotation): Run responsiveness checks, CTA experiments, scarcity counter accuracy, and analytics instrumentation once the page is live.

Each role closes the loop by updating `docs/action-items.md` (status + links) and referencing the specific files touched.

---

## 8. Copy, Design, and Tone Guardrails
- Lead with tangible proof: specs, real unit counts, shipping dates, actual benefits. No vague hype.
- Emphasize the co-creator framing (“First 100 units. Help us build V2.”) and stay transparent about V1 limitations.
- Keep CTAs singular and decisive (primary: Reserve; secondary: Learn/Specs; tertiary: GitHub/Discord).
- Always show technical credibility near the top: LED count, dual edge-lit explanation, ESP32-S3, open-source links.
- Visual direction: dark/glassmorphism palette (`landing-page-structure.md`), Bebas Neue for display, M PLUS Rounded 1c for UI, JetBrains Mono for specs.
- Scarcity counter, pricing, and shipping date must stay synchronized wherever they appear (hero, pricing card, FAQ).

---

## 9. Pre-Ship Checklists
### Copy/Layout
- ✅ Matches `docs/landing-page-strategy.md` voice and promises.
- ✅ Sections and hierarchy follow `docs/landing-page-structure.md`.
- ✅ Specs, pricing, unit count, and shipping date consistent across hero, pricing, FAQ.
- ✅ GitHub + Discord links visible above the fold or in early sections.

### Code / Prototype
- ✅ Changes reproduced in Aura export and Next code (if applicable).
- ✅ Mobile, tablet, and desktop states reviewed (Aura preview + browser dev tools).
- ✅ Assets optimized (hero video <5 MB, images compressed, consistent naming).

### Documentation
- ✅ `docs/action-items.md` updated with status, owner, and link to assets/commits.
- ✅ Any new research or testing notes filed in `docs/<topic>-analysis.md`.
- ✅ Aura exports saved with incremented filenames and referenced in the action log.

Do not mark a task complete until all three checklist areas are satisfied.

---

## 10. Current Priorities (Snapshot)
Reference `docs/action-items.md` for timestamps and owners; highlights include:
1. **Capture hero + music-reactive assets** (Week 1 critical path). Deliver graded photo/video loops aligned to the palette guidance.
2. **Integrate assets in Aura** and export a refreshed `landingpageXX.html` with updated scarcity, CTAs, and FAQ copy.
3. **Responsive + CTA polish** (Week 2) including split-payment messaging, email capture, and real-time counter accuracy.
4. **Optional Week 3 work**: 3D renders, AI supplemental imagery, and final Next/Tailwind build parity once the new app structure is ready.

Keep this manual close. If a task feels like it belongs somewhere else, pause and update the docs before proceeding.

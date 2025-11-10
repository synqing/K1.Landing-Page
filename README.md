# K1.Lightwave Landing Page

Workspace for the Founder's Edition launch site where we pre-sell the first 100 dual edge-lit K1-Lightwave units, capture early adopter feedback, and prove demand ahead of the broader PRISM.node roadmap.

## What We're Building
- **Product**: 32 cm dual edge-lit light guide powered by an ESP32-S3 with 320 individually addressable LEDs.
- **Offer**: Limited Founder's Edition run (100 units, $249, 50/50 split payments supported) shipping March 2026.
- **Landing Page Goal**: Communicate honesty about the V1 state, emphasize co-creation, and drive conversions >3% by combining cinematic hero assets, transparent specs, scarcity, and community proof.

## Repository At a Glance
| Path | Purpose |
| --- | --- |
| `docs/` | Strategy, structure, competitor research, asset plans, and action trackers that define the page content. |
| `docs/landing-page-strategy.md` | Product positioning, target audience, pricing, and messaging tone—read first. |
| `docs/landing-page-structure.md` | Complete seven-section layout spec with design system tokens. |
| `docs/action-items.md` | Prioritized execution plan (asset capture → Aura integration → polish). Update this when scope shifts. |
| `docs/aura-prompt.md` | Prompt used inside Aura to generate/update the layout. |
| `docs/asset-production-plan.md` & `docs/competitor-*` | Photography/video shot lists and research that justify creative choices. |
| `Aura.html/` | Exported Aura builds and PRISM.node concept pages (open directly in a browser for quick reviews). |
| `app/examples/tokens/page.tsx` | Minimal Next.js route demonstrating the design tokens we plan to standardize once the new app shell lands. |
| `.deprecated/` | Previous Next 14 + Tailwind implementation (complete app, assets, and build artifacts). Use it as the current runnable sandbox until the refreshed app directory is rebuilt at the repo root. |
| `.claude/`, `.github/`, `.vscode/` | Local agent settings, CI chores, and editor prefs. Leave them intact unless explicitly asked to edit. |

## Working Model
1. **Start with the docs** → Re-read `landing-page-strategy`, `landing-page-structure`, and `action-items` before touching copy, code, or assets so updates stay anchored to the current plan.
2. **Prototype in Aura first** → Use `docs/aura-prompt.md` and `Aura.html/` exports to iterate quickly on layout/copy. Lock visuals there before rebuilding in code.
3. **Implement in Next/Tailwind** → The production build will live in the root `app/` directory again; for now, mirror changes inside `.deprecated/` to keep a running preview while the refreshed structure is being reconstituted.
4. **Document every change** → Summaries, decisions, and new research stay in `docs/` with short, kebab-case filenames (e.g., `docs/prism-node-faq.md`). Reference source material and link back to the section/asset you touched.

## Prototyping & Build Instructions
### Aura exports
- Open any file inside `Aura.html/` (e.g., `landingpage01.html`) directly in a browser for stakeholder reviews.
- Update or regenerate layouts inside Aura, then export the HTML again into the same folder with an incremented suffix. Note the delta in `docs/action-items.md`.

### Run the landing page (root, SSR mode)
```bash
npm install
npm run dev   # http://localhost:3000
```
- Configure environment via `.env` (see `.env.example`).
- SSR is enabled (API routes available). For production on Node:
  - `npm run build && npm start`
  - or deploy to Vercel/any SSR host

### Token demo (`app/examples/tokens/page.tsx`)
- Lightweight token demo; root app already consumes the same design tokens.

### Minimal API routes
- `POST /api/waitlist` — Accepts `{ email }`; stores entries in-memory (dev/server deploy). The Email Capture form uses this endpoint with local fallback.
- `GET /api/units` — Returns the current unit totals by reading `public/data/units.json`.

For static hosting, these routes won’t be available; the UI will gracefully fallback to client-only behavior.

### Data persistence (dev/server)
- Waitlist entries are persisted to `.data/waitlist.json` (git-ignored) via the API.
- You can inspect recent masked entries with `GET /api/waitlist`.

## Documentation Workflow
- **Naming**: `kebab-case.md`, descriptive but short (e.g., `docs/founders-discord-onboarding.md`).
- **Routing**:
  - Strategy & narrative → `docs/*strategy*.md`
  - Research & analysis → `docs/*analysis*.md`, `docs/competitor-*.md`
  - Execution plans & checklists → `docs/action-items.md`, `docs/asset-production-plan.md`
  - Prompting/scripts → `docs/aura-prompt.md`
- **Updates**: When adding a new file, link it from `docs/action-items.md` or reference it inside related docs so nothing drifts out of sight.

## Current Priorities
Summarized from `docs/action-items.md`:
- **Week 1 foundation**: Capture hero photo/video/music-reactive clips, grade/export assets, and upload them to Aura for integration.
- **Week 1–2**: Generate the updated Aura layout, integrate assets, and export fresh HTML for this repo.
- **Week 2 polish**: Responsive QA, CTA experiments, scarcity counter accuracy, and email capture wiring.
- **Week 3+**: Fill any asset gaps with 3D renders or AI-generated supporting imagery, then push final layout/code parity in Next.

Stay honest about the V1 state, highlight the co-creator program, and always show technical credibility (specs, open-source links, community proof) above the fold.

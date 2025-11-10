---
status: active
author: Spectrasynq Landing Team
date: 2025-11-10
intent: Landing page documentation hub describing structure, navigation, and filing rules
---

# K1-LP Documentation Hub

Central reference for all documentation supporting the K1-Lightwave Landing Page (K1-LP) program.

## Start Here

- **Master Index:** `K1-LP_INDEX_v1.0_20251110.md`
- **Navigation Guide:** `K1-LP_NAVIGATION_v1.0_20251110.md`
- **Governance:** `08-governance/K1-LP.Gov_GOVERNANCE_v1.0_20251110.md`
- **Agent Ops:** `../CLAUDE.md`

## Folder Map

| Folder | Purpose |
| --- | --- |
| `01-architecture/` | Structural specs (page sections, systems, flows) |
| `02-adr/` | Landing-page-specific decision records |
| `03-guides/` | How-to guides, runbooks, tooling notes |
| `04-planning/` | Strategies, action plans, schedules |
| `05-analysis/` | Competitive research, design audits, insights |
| `06-reference/` | APIs, schema specs, quick references |
| `07-resources/` | Prompts, templates, team resources |
| `08-governance/` | Policies, naming conventions, lifecycle rules |
| `09-implementation/` | Implementation specs & authoring guides |
| `09-reports/` | Phase/milestone reports & validations |

Each folder maintains its own README plus links back to the index for discoverability.

## Filing Checklist

1. Place files in the correct numbered folder.
2. Use the `K1-LP.<Type>_<TOPIC>_vMAJOR.MINOR_YYYYMMDD.md` naming scheme.
3. Include YAML front matter (status, author, date, intent, references).
4. Cross-link related docs and update folder README + master index.
5. Use `07-resources/K1-LP.Res_DOC_TEMPLATE_v1.0_20251110.md` when creating new files to avoid missing metadata.

Questions? Start with `08-governance/K1-LP.Gov_GOVERNANCE_v1.0_20251110.md`.

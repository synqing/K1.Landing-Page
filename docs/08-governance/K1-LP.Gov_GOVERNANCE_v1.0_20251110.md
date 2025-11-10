---
status: active
author: Spectrasynq Landing Team
date: 2025-11-10
intent: Governance rules for K1-LP documentation, naming, and lifecycle management
---

# K1-LP Documentation Governance

K1-LP follows the same discipline as the reference `docs_copy` tree: numbered folders, strict naming, and metadata guardrails to prevent drift.

## Metadata Requirements

Each Markdown file must include YAML front matter:

```yaml
---
status: active
author: Spectrasynq Landing Team
date: 2025-11-10
intent: Short explanation of why the doc exists
references: [optional ids]
---
```

- **status** ∈ `draft | active | superseded | archived`
- Update `date` when materially editing a document.
- Use `references` to cite ADRs, research, or related files.

## Naming Convention

`K1-LP.<Type>_<TOPIC>_vMAJOR.MINOR_YYYYMMDD.md`

Examples:
- `K1-LP.Plan_LANDING_PAGE_STRATEGY_v1.0_20251110.md`
- `K1-LP.Analysis_COMPETITOR_SUMMARY_v1.0_20251110.md`

Type prefixes:
- `Arch` — architecture
- `Plan` — strategies/action plans
- `Analysis` — research
- `Guide` — how-to/runbooks
- `Res` — shared resources
- `Gov` — governance/policy

## Filing Rules

1. Place new docs inside the appropriate numbered folder and update that folder's README.
2. Use the template at `07-resources/K1-LP.Res_DOC_TEMPLATE_v1.0_20251110.md` to guarantee metadata and naming compliance.
3. Add entries to `K1-LP_INDEX` + `K1-LP_NAVIGATION`.
4. Superseded docs: update `status`, link to replacement, and move to `archive/` within one month.
5. Delete archived docs after three months unless tagged as historical.

## Review Cadence

- **Active docs**: review every 6 months.
- **Drafts**: either publish or delete within 30 days.
- **Superseded**: archive within 30 days.

Compliance is mandatory before merging documentation changes.

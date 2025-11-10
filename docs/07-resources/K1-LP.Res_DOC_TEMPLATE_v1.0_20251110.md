---
status: active
author: Spectrasynq Landing Team
date: 2025-11-10
intent: Template and checklist for creating new K1-LP documentation files
---

# K1-LP Documentation Template

Copy this scaffold when authoring a new document so naming, metadata, and routing stay compliant.

## 1. File Naming

```
docs/<folder>/K1-LP.<Type>_<TOPIC>_vMAJOR.MINOR_YYYYMMDD.md
```

- `<folder>` → numbered directory (01-architecture, 04-planning, etc.)
- `<Type>` → `Arch`, `Plan`, `Analysis`, `Guide`, `Res`, `Gov`, `Impl`, `Report`, etc.
- `<TOPIC>` → Upper snake case summary (`LANDING_PAGE_STRATEGY`, `COMPETITOR_SUMMARY`)
- `vMAJOR.MINOR` → bump when publishing revisions (start with `v1.0`)
- `YYYYMMDD` → creation or latest publish date in UTC

## 2. Front Matter (Required)

```markdown
---
status: draft
author: Your Name
date: 2025-11-10
intent: One-line description of why this doc exists
references: [K1-LP.Plan_LANDING_PAGE_STRATEGY_v1.0_20251110, ADR-0001]
---
```

- `status` = `draft | active | superseded | archived`
- Update `date` whenever intent or content changes materially.
- Use `references` to link related docs or ADRs (optional but preferred).

## 3. Body Structure

1. `# Title` (match filename topic phrase)
2. `## Summary` (2-3 sentences, optional for short docs)
3. Additional sections as needed (`## Context`, `## Decisions`, `## Action Items`, etc.)
4. `## References` linking to supporting docs or tickets.

## 4. Filing Checklist

- [ ] Placed in correct numbered folder.
- [ ] Filename follows `K1-LP.<Type>_<TOPIC>_vX.Y_YYYYMMDD`.
- [ ] YAML front matter filled in.
- [ ] Folder README updated with a one-line description.
- [ ] Added to `K1-LP_INDEX` (if noteworthy).
- [ ] Linked from any related docs (strategy, action items, etc.).

Keep this template close (duplicate and edit) rather than writing docs freehand.

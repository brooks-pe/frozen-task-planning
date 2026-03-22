# SyncPoint Guidelines — Router

Load only module(s) relevant to the current task. Global rules are always active.

---

## Global Rules (Always Active)

### Change Safety
- Smallest change possible. One concern per prompt.
- Preserve existing behavior unless explicitly asked to change it.
- Do NOT clean up unrelated code, rename files, modify layout while adding interaction, or modify content while adjusting styling.
- If both visual and behavioral changes are implied, ask for confirmation.
- Repetition is a failure mode. Do not reapply or reimplement completed work.
- If context is lost, ask one clarifying question or request fresh context.

### Destructive Changes
- Deleting/replacing pages, renaming routes, removing nav items requires explicit intent.
- If ambiguous between "create new" and "replace existing," confirm first.

### Incremental Build
1. Shell + routing → 2. Static table → 3. Parent expansion → 4. Child expansion → 5. Editable fields → 6. Simulated behavior.
- Do not combine phases unless instructed.

### Multi-Step Execution
- Prompt before stopping if additional steps are needed.

### Pattern Reuse
- Reference existing implementations, not original designs.
- Match structure, spacing, styling, behavior exactly unless told otherwise.

### Cross-Page Changes
- Visual-only changes may span multiple pages per request.
- Structural changes: page-by-page unless instructed otherwise.
- If both structural + multi-page, pause and ask.
- Hardening protocol: Canonical page → harden → validate → propagate.

---

## Core Principles

- Explicit layout over auto-sizing. Fixed grid templates when alignment matters.
- One grid template per table. Headers/rows/expanded content share it.
- Figma = visual reference, not structural mandate. Match the *look*, not the *implementation*.
- React functional components, CSS Grid, Tailwind, clear boundaries (Shell → Page → Section → Component).

> When in doubt, choose predictable and stable over clever.

---

## Module Routing

| Task Domain | Module |
|---|---|
| Table layout, columns, rows, expansion, sorting, selection, grouping | `tables.md` |
| Filter bars, search, dropdowns, clear filters, filter toggle | `filters.md` |
| Form fields, inputs, validation, date pickers | `forms.md` |
| Sidebar, top nav, routing, page creation | `navigation.md` |
| Colors, backgrounds, hover, accent, accessibility, tooltips, sticky footer | `visual-system.md` |
| Font tokens, text roles, KPI typography | `typography.md` |
| Segmented controls, pagination, split buttons, pills, toasts, cell states | `components.md` |
| Simulated data, visual lock vs data lock | `data-behavior.md` |
| Banners, badges, pills, warning/info/success callouts | `banners-badges.md` |
| Page headers, top-level layout, breadcrumbs, section spacing | `page-layout.md` |
| Structured metadata sections (e.g., Task Summary), key-value layouts | `metadata-sections.md` |

---

## Multi-Module Loading

- Load minimum required modules only.
- When multiple apply:
  - Forms + Components → Forms governs behavior, Components governs structure.
  - Tables + Components → Tables governs layout, Components governs interactions.
- Conflict resolution: more specific module wins.
- Do NOT merge or reinterpret rules across domains.

## Scope Control

- Do NOT apply rules from unrelated modules.
- Do NOT expand beyond the requested change.
- Do NOT refactor adjacent areas.
- Only implement the exact requested scope.

---

## Reuse & Correction Rules

### Pattern Reuse (Strengthened)
- Before creating a new pattern, search for an existing implementation and match it exactly.
- Reference existing implementations, not original designs.

### Correction Rule
- When fixing UI, replace incorrect styling rather than preserving it.

### Visual Reference Rule
- If a design image is provided, treat layout and structure as authoritative unless explicitly told to reinterpret.
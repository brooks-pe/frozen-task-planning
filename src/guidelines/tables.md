# Tables & Grids

- **Scope:** Table layout, columns, rows, expansion, sorting, selection, grouping, density
- **Do not apply outside this domain**

## Rule Priority
- Hard Rules: must be followed exactly
- Guidance: preferred, but flexible

---

## Hard Rules

### Grid-Based Tables
- All tables use CSS Grid (not flexbox or `<table>`).
- Every column explicitly defined (including chevron, actions, spacers).
- At most one `1fr` column. All others fixed or max-width constrained.
- Headers include placeholder cells for chevron/actions columns.
- All cells: `px: 12px`, `py: 12px`. No exceptions.

### Expanded Rows
- `grid-column: 1 / -1` for full span.
- Must NOT redefine parent grid.
- Declare max depth explicitly. Default: collapsed only.
- Left accent rail + subtle parent highlight when expanded.
- Child rows indented, clearly subordinate.

### Sorting
- Click 1 → Asc, Click 2 → Desc, Click 3 → Clear. Single active column.
- Active direction: accent color. Inactive: neutral icon.
- Icon must not cause truncation; column width accounts for icon.
- With grouping: sort within grouping level only.

### Row Selection
- Single-select. Persists on mouse leave.
- 3px left accent rail + subtle accent background. No text change, no layout shift.
- Priority: Error Cell > Selected > Hover > Neutral.

### Numeric Alignment
- Currency: right-aligned header + cells, thousand separators required.
- Numeric non-currency: right-aligned if used for comparison.
- Dates: left-aligned default.

### Section Headers
- Full width of table container. Surface-gray background, standard border.
- Title + subtitle in same container. Separation via spacing, not color escalation.

### Table Title Header
- Left: title + search + Expand/Collapse All.
- Right: table-level actions.
- Single container. No stacked wrappers.

---

## Guidance

### Column Width
- Do not arbitrarily expand table width. Reallocate from low-priority columns.
- Never clip interactive controls. 16px minimum horizontal spacing between controls.

### Grouping
- Reorder rebuilds hierarchy. Default fully expanded on regroup.

### Density
- Maintain standard row height. Do not reduce padding unless requested.

### Freezing
- Use frozen columns only when table exceeds viewport, first column is anchor, or cross-column comparison is frequent.

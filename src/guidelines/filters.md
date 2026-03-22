# Filters

- **Scope:** Filter bars, search inputs, dropdowns, clear filters, filter toggle
- **Do not apply outside this domain**

## Rule Priority
- Hard Rules: must be followed exactly
- Guidance: preferred, but flexible

---

## Hard Rules

### Single Pattern
- All filter areas use the same container pattern. No "toolbar" vs "panel" variants.

### Container Header
- Every filter container: left "Filters" label, right "Hide/Show Filters" toggle with chevron.
- Always present, even with 1–2 filters.

### Collapse
- Hides filter controls only. No layout shift. No alternate mini-toolbar.

### Interaction Model
- Immediate apply (no Apply button). Clear Filters resets immediately.
- Apply button allowed only for expensive queries, complex rule builders, or explicit request.
- No mixing immediate and deferred within same module.

### Clear Filters
- Ghost/inline accent link (not a button). Underline on hover.
- Within filter container, aligned with controls.

### Cross-Page Consistency
- Identical controls across pages: height, font size, padding, chevron, hit target.
- All dropdowns include right-aligned down chevron.

### Labels
- Medium font weight, primary text color. Left-aligned with inputs.
- No mixed weights within same section.

---

## Guidance

### Search Field
- Consistent width across pages. Never full-width unless designed so.

### Layout
- Stable grid for controls. Predictable wrapping.

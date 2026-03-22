# Page Layout

- **Scope:** Page headers, top-level layout structure, section spacing, breadcrumbs
- **Do not apply outside this domain**

## Rule Priority
- Hard Rules: must be followed exactly
- Guidance: preferred, but flexible

---

## Hard Rules

### Page Header Anatomy
1. **Top action row:** Back button (if sub-page), primary actions (right-aligned)
2. **Title:** Display or Content Heading role per `typography.md`
3. **Subtitle:** Context line (e.g., task number, plan name) — optional
4. **Breadcrumb:** Below top nav, above title — follows `SyncPointBreadcrumb` pattern
5. **Divider:** Horizontal rule below header block, before first content section

### Spacing Rules
- Header block to first section: `mt-4` or `16px`
- Between sections: `gap-4` or `16px` (consistent throughout page)
- Section internal padding follows section-specific rules

### When to Use a Page Header
- All top-level routed pages MUST have a page header
- Embedded/nested content (e.g., expanded rows, flyout panels) do NOT use page headers

### Consistency Rule
- Page headers must match existing implemented pages before introducing variation
- If a new page is created, reference the closest existing page header as template

---

## Guidance

### Back Navigation
- Sub-pages (e.g., Task Workspace) show a back button/link in the top action row
- Back navigates to the parent list or dashboard

### Action Placement
- Primary actions in top action row, right-aligned
- Secondary actions below header or within sections as appropriate

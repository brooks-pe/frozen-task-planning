# Metadata Sections

- **Scope:** Structured metadata displays (e.g., Task Summary), key-value layouts, detail sections
- **Do not apply outside this domain**

## Rule Priority
- Hard Rules: must be followed exactly
- Guidance: preferred, but flexible

---

## Hard Rules

### Section Shell
- Outer container: neutral surface (`bg-[#F0F0F3]` or Surface Neutral 2), with padding and rounded corners
- Inner content surface: white or light background (`bg-white`), with own padding and rounded corners

### Metadata Layout
- Fixed grid columns across ALL rows — columns do not resize independently per row
- Labels above values (label/value vertical stacking within each cell)
- Consistent alignment across rows — all rows share the same `grid-template-columns`

### Row Structure
- Rows separated by subtle dividers (`border-b border-[#E0E1E6]`) or consistent spacing
- No independent column resizing per row — grid template is defined once
- Banding (alternating row colors) is NOT used unless explicitly requested

### Action Placement
- Actions (e.g., "Edit" button) must NOT break grid alignment
- Use a separate action row or position actions in a dedicated column
- Actions within metadata sections should be subtle (ghost/link style)

### CRITICAL: Stability
- Metadata sections must remain stable and aligned regardless of content length
- Long values truncate with ellipsis; they do not wrap or push layout

### Spacing and Padding
- Outer container padding: `p-4`
- Inner content padding: `p-4` or `px-4 py-3`
- Gap between label and value: `gap-1` (4px)
- Row gap: `gap-y-3` or consistent with section rhythm

---

## Guidance

### Labels
- Muted/secondary color, small text role
- Consistent across all metadata sections in the application

### Values
- Default text color, standard text role
- May include inline badges or action links per `banners-badges.md`

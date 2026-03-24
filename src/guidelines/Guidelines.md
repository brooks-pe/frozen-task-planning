# SyncPoint Guidelines (Compressed v1)

## 1. Core Operating Rules (Always Active)

### Scope Control

* Make the **smallest possible change**
* **Do not modify anything outside scope**
* Do not refactor, clean up, or “improve” adjacent areas
* One concern per prompt

### Pattern Reuse (Critical)

* Always reuse **existing implemented patterns**
* Do NOT recreate or approximate designs
* Implementation > design mockups

### Stability Over Cleverness

* Prefer predictable, explicit layouts
* No auto-resizing layouts that shift with content
* No layout changes unless explicitly requested

### Change Safety

* Preserve behavior unless explicitly changing it
* If visual + logic changes are both implied → **ask first**
* Destructive changes (delete, replace, reroute) require explicit instruction

---

## 2. Layout System

### Structure

* Use: `Shell → Page → Section → Component`
* Tables and structured layouts use **CSS Grid only**
* One grid definition per table (shared across all rows)

### Alignment Rules

* Headers, rows, expanded content share exact column structure
* No per-row layout variation
* No layout shift on interaction

### Spacing

* Standard spacing rhythm: **16px (gap-4)**
* Do not invent new spacing values

---

## 3. Tables (High Priority)

### Core Rules

* CSS Grid only (no flexbox/table elements)
* All columns explicitly defined
* Max **one flexible column (1fr)**

### Behavior

* Sorting: Asc → Desc → Clear (single column)
* Row selection:

  * persistent
  * left accent rail + subtle background
  * no layout shift

### Expansion

* Expanded rows span full width
* Do NOT redefine grid
* Parent-child relationship must be visually clear

### Data

* Currency: right-aligned + formatted
* Numbers: right-aligned if comparable
* No visual-only fake data inconsistencies

---

## 4. Forms & Inputs

### Validation

* Only on blur + submit
* Error = red border + message (always both)

### Disabled State (Global Standard)

* `bg-[#e0e1e6]`, `text-[#8b8d98]`, `cursor-not-allowed`
* No hover state

### Input Behavior

* Entire field is interactive (no dead zones)
* No layout shift while editing

---

## 5. Filters

### Single Pattern Only

* One consistent filter container across all pages

### Behavior

* Immediate apply (no Apply button)
* Clear Filters = instant reset

### Structure

* Header: "Filters" + toggle (always present)
* No alternate toolbar versions

---

## 6. Components (Interaction Patterns)

### Segmented Controls

* One shared container
* Selected = filled pill
* No layout shift

### Status / Badges

* Must reuse existing badge styles
* No new colors
* Inline, no layout impact

### Feedback

* Success = toast + subtle row highlight
* No layout movement

---

## 7. Data Behavior

### Rules

* Data can change → UI structure cannot
* Filters = full dataset swap (not partial mutation)
* Totals and values must reconcile

### Never:

* Add UI to explain data
* Modify layout during data changes

---

## 8. Metadata Sections

* Fixed grid across all rows
* Labels above values
* No wrapping that breaks layout
* Long text:
  * may wrap up to 2 lines
  * truncate only after 2 lines (ellipsis)
  * show full value via tooltip on hover

---

## 9. Navigation & Pages

### Page Creation Order

1. Component
2. Route
3. Navigation

### Consistency

* Titles, breadcrumbs, and routes must match
* Top row layout must remain consistent across pages

---

## 10. Typography

* All text must use defined roles (no custom sizes)
* No ad-hoc font weights or sizes
* KPIs:

  * Value = prominent
  * Label = secondary
  * Metadata = subtle

---

## 11. Visual System

### Colors

* Use only defined semantic colors
* No custom hex values

### Interaction

* Hover must NOT shift layout
* Hover ≠ selected state

### Accessibility

* All interactions keyboard accessible
* Focus states visible

---

## 12. Anti-Drift Rules (Critical)

* Do NOT:

  * Combine unrelated changes
  * Expand scope beyond request
  * Reinterpret existing patterns
  * Introduce new layout systems
* If unsure → ask one question instead of guessing

---

## 13. Editing Model (Task Summary & Metadata)

### Inline Editing (Primary Pattern)

* Editing must occur **in place**, not via modal/flyout (unless explicitly required)
* Enter edit mode via a single action (e.g., "Edit")
* Replace values with inputs **without changing layout structure**
* Layout must remain stable (no reflow or resizing)

### Save Behavior

* One save model per section:
  * Save (primary)
  * Cancel (secondary)
* No per-field save buttons
* No auto-save on blur

### Field-Specific Editing

* Clicking a field-level CTA (e.g., "Add Objective") should:
  * enter section edit mode
  * focus the relevant field
* Do not create isolated editing flows

### Derived Fields

* Derived fields must:
  * remain read-only
  * update automatically when source field changes
* Never allow manual override of derived values

---

## 14. Field → Component Mapping

### Rule

* Each field must always use its **canonical input type**
* Do NOT infer input types generically (e.g., "text → input")
* Always reuse the pattern used elsewhere in the app

### Examples

* Execution Statement → searchable dropdown
* WBS Attribute → searchable dropdown
* Funding Source → searchable dropdown
* Task Type → radio buttons
* Period of Performance → date range picker
* Objective → multiline textarea

### Searchable Dropdown Standard

* Must include search input at top
* Must match existing dropdown behavior exactly
* No alternate dropdown variants

### Anti-Pattern (Forbidden)

* Do NOT convert fields based on display type
  * (e.g., badge → dropdown)
* Do NOT invent new input patterns

---

## 15. Text Overflow & Responsiveness

### Two-Line Rule

* Text values may wrap to a maximum of 2 lines
* If content exceeds 2 lines:
  * truncate with ellipsis (...)
  * no third line allowed

### Tooltip Rule

* Tooltip appears ONLY when text is truncated
* Tooltip shows full value
* Must reuse existing tooltip pattern

--

## 16. Interaction Consistency

### Pattern Reuse Across Contexts

* Components must behave the same across:
  * Create
  * Edit
  * Inline editing

### Examples

* Dropdowns must match across all contexts
* Date pickers must match across all contexts
* Radio buttons must match across all contexts

### Anti-Drift

* If a component behaves differently in one place → it must be corrected
* Do NOT introduce alternate versions of the same component

### Goal

* Preserve layout stability
* Improve readability on smaller screens

---

### Typography Role Enforcement (Critical)

- Semantic typography roles must be followed exactly
- `Body` text is `14/20` and is the default size for standard readable content
- `13/18` is reserved for `Column Header` usage only
- Do NOT use 13px as general body, metadata, helper, or supporting text unless a specific semantic role explicitly defines it
- Do NOT invent intermediate text sizes for convenience
- If text appears to function as normal readable content, default to Body (`14/20`)

---

### Icon Library Standard

- Use `lucide-react` icons wherever an icon is needed
- Do NOT mix icon libraries unless explicitly required by existing implementation
- Reuse existing icon patterns before introducing any new icon usage
- Icon sizing and stroke weight should remain consistent with nearby UI patterns

---

### Text Contrast and Neutral Color Usage

- Do NOT place low-contrast gray text on gray or muted backgrounds unless the content is intentionally disabled
- Standard readable text must maintain strong contrast against its background
- Muted/secondary text may be used only when readability remains clear
- Disabled styling is the only acceptable use case for intentionally low-contrast text on muted surfaces
- Avoid “gray on gray” combinations that make active content appear disabled or washed out

---

## Final Rule

> When in doubt:
> **match existing SyncPoint behavior exactly and make the smallest possible change**

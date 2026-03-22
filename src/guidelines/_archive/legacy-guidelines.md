# ARCHIVED — Legacy Monolithic Guidelines
# This file is no longer active. See /guidelines/guidelines.md for the router.
# Preserved for historical reference only.

# SyncPoint UI Engineering Guidelines

These guidelines define how Figma Make should generate, modify, and refactor code for SyncPoint screens and components.  
The primary goals are **predictability**, **layout stability**, **enterprise UX consistency**, and **ease of iteration**.

---

## 1. Core Principles (Highest Priority)

### 1.1 Layout Stability Over Cleverness
- Prefer **explicit layout definitions** over auto-sizing behavior.
- Avoid layouts that resize or shift based on content length.
- If a layout can break under edge-case data, it **will** break in production.

**Rule:**  
> If alignment matters, use fixed grid templates or shared layout primitives.

---

### 1.2 Single Source of Layout Truth
- Headers, rows, and expanded content **must share the same layout definition**.
- Do not redefine grids independently for headers vs body vs expanded rows.

**Rule:**  
> One grid template per table. Reuse it everywhere.

---

### 1.3 Refactor Is Allowed (and Preferred)
- Figma designs are a **visual reference**, not a structural mandate.
- If the Figma structure is awkward or overly nested, refactor to a cleaner code structure **as long as visuals remain consistent**.

**Rule:**  
> Match the *look*, not the *implementation*.

---

## 2. Tables & Grids (Critical Lessons Learned)

### 2.1 Grid-Based Tables (Required)
All data tables must be implemented using **CSS Grid**, not flexbox or semantic `<table>` elements.

**Why:**
- Prevents column drift
- Guarantees header/body alignment
- Supports expandable rows cleanly

---

### 2.2 Explicit Column Definitions
Every column must be explicitly defined, including:
- Chevron / expand controls
- Kebab / actions menus
- Spacer columns

**Example Pattern:**
```css
grid-template-columns:
  48px   /* Chevron */
  180px  /* Name */
  240px  /* Email */
  1fr    /* Primary flexible column */
  160px  /* Roles */
  140px  /* Status */
  170px  /* Requests */
  64px;  /* Actions */
```

**Rules:**
- Use **at most one `1fr` column** per table.
- All other columns should be fixed or max-width constrained.
- Headers must include placeholder cells for chevron/actions columns.

---

### 2.3 Padding Consistency
All table cells (headers and body) must use **identical padding**.

**Rule:**
```txt
px: 12px
py: 12px
```

No exceptions unless explicitly requested.

---

### 2.4 Expanded Rows
- Expanded content must span the full width of the parent grid.
- Use `grid-column: 1 / -1`.
- Expanded sections must **not redefine or override** the parent grid sizing.

---

## 3. Responsiveness Strategy

### 3.1 Desktop-First, Enterprise Context
SyncPoint is primarily used on:
- Large monitors
- Government / enterprise desktops
- Docked laptops

**Rules:**
- Do not aggressively collapse columns.
- Prefer controlled truncation (`truncate`, ellipsis) over wrapping.
- Horizontal scrolling is acceptable **only** as a last resort.

---

### 3.2 Flexible Width Sharing
When screens are very wide:
- Distribute excess width across **multiple logical columns** (e.g., Name + Email).
- Avoid allowing a single column (e.g., Tenants) to absorb all available space.

---

## 4. Navigation & Shell Behavior

### 4.1 Sidebar Navigation
- Section labels and chevrons have distinct behaviors:
  - **Chevron:** expand/collapse only
  - **Label/Icon:** navigation (if implemented)
- Expandable sections must default to **collapsed** unless explicitly instructed.

---

### 4.2 Top-Level Navigation
- SyncPoint logo and tenant logo may both navigate “Home” if requested.
- Navigation should never be ambiguous or hidden behind icons without affordances.

---

## 5. Interaction & States

### 5.1 Hover & Focus States
- All navigational text must have:
  - Hover state
  - Keyboard focus state
- Use **link-like behavior**, not buttons, unless explicitly designed as buttons.

---

### 5.2 Do Not Change Layout on Hover
- Hover states must not:
  - Shift content
  - Change height
  - Affect surrounding layout

---

## 6. Visual Hierarchy Rules

### 6.1 Backgrounds
- Background changes should:
  - Improve focus
  - Reduce visual noise
  - Never compete with primary content

- If large background changes are made:
  - Section separation must be preserved using spacing or subtle dividers
  - Avoid heavy borders or high-contrast separators unless requested

---

### 6.2 Dividers
- Dividers are optional and should be:
  - Subtle
  - Consistent
  - Removed if they disrupt rhythm or alignment

---

## 7. Accessibility & UX Baselines

- All interactive elements must be reachable via keyboard.
- Focus states must be visible.
- Cursor must change to pointer for clickable items.
- Text links must look interactive on hover.

---

## 8. Change Safety Rules (Very Important)

When implementing a request:

**DO:**
- Make the smallest change possible
- Preserve existing behavior unless explicitly asked to change it
- Ask for clarification via comments if assumptions are required

**DO NOT:**
- “Clean up” unrelated code
- Rename files or components without a reason
- Modify layout while adding interaction
- Modify content while adjusting styling

---

## 9. Preferred Tech Patterns

- React functional components
- CSS Grid for layout
- Utility-first CSS (Tailwind-style) where applicable
- Clear component boundaries (Shell, Page, Section, Component)

---

## 10. Guiding Principle (If Unsure)

> When in doubt, choose the option that makes the UI **more predictable**, **more stable**, and **easier to reason about later** — even if it is less “clever”.

## 11. Forms & Input Behavior

### 11.1 General Form Layout
- Forms should default to a **clean white background** unless the form is long or multi-section.
- Section grouping should prioritize:
  - Vertical spacing
  - Section headers
  - Light dividers
- Avoid heavy card backgrounds unless explicitly required for long or complex forms.

### 11.2 Field Alignment
- Field labels must be **left-aligned** with their corresponding inputs.
- Labels should not appear indented relative to their fields.

### 11.3 Validation Timing
- Validation errors should trigger:
  - On **blur** (field loses focus)
  - On **submit**
- Do **not** show validation errors while the user is actively typing.

### 11.4 Validation Messaging
- Error messages must be:
  - Specific
  - Actionable
  - Displayed directly beneath the affected field
- Fields in error must have a visible error state (border + message).

**Example:**
> Enter a valid navy.mil, navy.us.mil, or pioneeringevolution.com email address.

---

## 12. Filter Row Patterns

### 12.1 Filter Grouping
- Search input, dropdown filters, and Clear Filters must be grouped in a single container.
- The container should use:
  - A subtle surface-gray background
  - Rounded corners

### 12.2 Search Field
- Search field width must be **consistent across pages**.
- Search inputs should never stretch to full width unless explicitly designed to do so.

### 12.3 Dropdown Filters
- Dropdown filters should align horizontally with the search field.
- Use consistent sizing and spacing across all filter rows.

### 12.4 Clear Filters
- Clear Filters must be styled as a **ghost link**.
- Underline on hover.
- Never styled as a primary or secondary button.

---

## 13. Pagination Synchronization

### 13.1 Page Size Options
- Page Size dropdown must include:
  - 10
  - 50
  - 100 (and higher if required)

### 13.2 Default Page Size
- Default page size must match the number of visible rows rendered on initial load.

### 13.3 Pagination Label
- Pagination text must dynamically reflect the selected page size.

**Examples:**
- 1–10 of 956
- 1–50 of 956

**Rule:**
> Page size selection and pagination display must never diverge.

---

## 14. Status Pill Consistency

### 14.1 Visual Consistency
- Summary status pills (parent tables) must match detail pills in:
  - Color
  - Icon
  - Typography

### 14.2 Label Differences
- Only the label text may differ between summary and detail pills.

**Example:**
- Summary: "2 Requests"
- Detail: "Requested"

**Rule:**
> Status meaning must be recognizable at a glance regardless of table depth.

---

## 15. Expanded Row Visual Cues

### 15.1 Parent Row State
- When a row is expanded:
  - The parent row should have a subtle highlight.

### 15.2 Expanded Area Styling
- Expanded content must include a left-side accent rail.
- Expanded sections should visually connect to the parent row and not feel floating.

**Rule:**
> Expanded rows should clearly communicate an active, contextual relationship to their parent row.

## 16. Simulated Data & Prototype Behavior (Critical for Dashboards)

### Definition
Simulated behavior refers to UI state changes driven by **generated placeholder data**, not real APIs, backend logic, or persistent state.

This pattern is used to validate:
- Filter interactions
- Dashboard responsiveness
- Information hierarchy
- Mental models and workflows

### Rules
- Simulated data updates **must preserve all existing layout, spacing, typography, and visual hierarchy**.
- Only **values and row-level data** may change. Containers, card structures, and section composition must remain untouched.
- Simulated filters should **swap entire datasets**, not mutate or derive values from currently rendered UI.
- Each filter selection should be treated as a **new dataset state**, even if visually similar.

### Data Integrity Expectations
- Generated data must be realistic and domain-appropriate.
- Totals must reconcile (e.g., sub-counts must equal card totals).
- Statuses, tenants, roles, and health indicators must align with the existing domain model.

### Explicitly Forbidden
- Adding new UI elements to explain simulated data
- Adding totals, headers, badges, or annotations not present in the design
- Removing sections because their data does not change
- Refactoring layout or spacing while implementing simulated logic

---

## 17. Visual Lock vs Data Lock (Clarification)

### Principle
When a design is attached, **visual structure is locked** — data is not, unless explicitly stated.

### Rules
- Attached designs lock:
  - Layout
  - Spacing
  - Alignment
  - Typography
  - Visual hierarchy

- Attached designs do **not** lock:
  - Numbers
  - Labels
  - Row contents
  - Generated placeholder data

### Guiding Rule
> If the request is behavioral, assume visuals are locked but data is mutable.

Data values may change as long as the visual structure remains identical.

---

## 18. One Concern Per Change (Change Safety Reinforcement)

### Rule
Each prompt should address **one primary concern only**.

- When adding or modifying behavior:
  - Do not refactor styles
  - Do not normalize spacing
  - Do not rename components

- When adjusting layout or responsiveness:
  - Do not modify data logic
  - Do not introduce or simulate new state

### Multi-Concern Changes
If a request implicitly requires both visual and behavioral changes:
> Stop and ask for confirmation before proceeding.

---

## 19. Multi-Step Make Execution Awareness

### Background
Some changes require multiple execution steps (e.g., wiring state first, rendering data second).

### Rules
- If Make indicates that additional steps are required to complete a request:
  - Do not assume failure
  - Complete the next step before evaluating results

- Make should explicitly prompt before stopping if:
  - Only partial implementation was completed due to scope
  - A follow-up step is required for data rendering or interaction

---

## 20. Dashboard Card Responsiveness (Refinement)

### Card Expansion Rules
- Dashboard cards may expand horizontally on wider screens.
- Internal content should redistribute to reduce unused white space (e.g., grid columns or space-between alignment).

### Constraints
Dashboard cards must not:
- Stretch typography
- Change information density
- Introduce new visual hierarchy levels
- Reflow content into new sections unless explicitly requested

Responsiveness should enhance readability without altering meaning or emphasis.

## 21. Page Creation & Routing Safety

### 21.1 Page Creation Order (Required)
When creating a new page:

1. Create the page component first
2. Export the component
3. Then add the route
4. Then update navigation links

**Rule:**
> Never add or modify a route until the referenced component exists and compiles.

---

### 21.2 Page Identity Rules
When creating a new page:

- Page title
- Breadcrumb label
- Route path
- Side navigation label

must all refer to the **same conceptual page**.

**Explicitly Forbidden:**
- Reusing an existing page component and renaming it without confirmation
- Creating a page whose title and route do not match

## 22. Destructive Change Guardrail

Destructive changes include:
- Deleting pages
- Replacing existing pages
- Renaming routes
- Removing navigation items

**Rule:**
> Destructive changes must not be performed unless the prompt explicitly states the intent.

If a prompt could be interpreted as either:
- “Create a new page” OR
- “Replace an existing page”

Make must stop and ask for confirmation.

## 23. Expansion Depth Declaration

Expandable tables must explicitly declare their maximum depth.

Examples:
- Parent only
- Parent → Child
- Parent → Child → Grandchild

**Rule:**
> Do not implement additional expansion levels beyond what is explicitly requested.

If expansion depth is unclear, default to **collapsed only**.

## 24. Editable Field Scope

When introducing editable fields:

- Editable scope must be explicitly limited by:
  - Row depth (parent / child / grandchild)
  - Column
  - Section

**Rule:**
> If only a subset of fields is editable, all other fields must remain read-only.

Make must not infer editability beyond what is explicitly stated.

## 25. Incremental Page Build Strategy

For new pages:

1. Page shell + routing
2. Static table (collapsed)
3. Parent expansion
4. Child expansion
5. Editable fields
6. Simulated behavior

**Rule:**
> Do not implement multiple phases in a single execution unless explicitly instructed.

## 26. Pattern Reuse vs Re-Creation (Critical)

### Principle

When an identical or near-identical UI pattern already exists in the product, that implementation is the source of truth — not a prior design file.

### Rules

If a table, card, filter bar, or interaction already exists on another page:

- Reference the implemented pattern, not the original design used to create it.
- Match structure, spacing, styling, and behavior exactly unless explicitly told otherwise.
- Do not reinterpret or re-infer the pattern from memory.
- Do not partially match the pattern (e.g., same layout but different spacing or borders).

### Explicit Prompting Guidance

**Preferred:**

> Use the same table pattern already implemented on the APM Acceptance page.

**Avoid:**

> Recreate the table based on the original design.

**Rule:**

Existing implementation always overrides historical design artifacts.

---

## 27. Cross-Page Standardization Rules

### Principle

When a user requests standardization across multiple pages, consistency is more important than speed.

### Rules

For visual-only standardization (filters, headers, pills, spacing):

- It is acceptable to update multiple pages in a single request if the pattern is clearly defined.

For layout or structural changes:

- Apply changes page by page unless explicitly instructed otherwise.

### Required Clarification

If a request involves:

- Multiple pages **and**
- Structural or layout changes

Then:

- Pause and ask whether the change should be applied incrementally or globally.

---

## 28. Filter Controls Consistency (New)

### Definition

Filter controls include dropdowns, search inputs, and **Clear Filters** actions.

### Rules

Filter controls must be visually identical across pages unless a page is explicitly an exception.

Standardized attributes include:

- Control height
- Font size
- Padding
- Chevron icon presence and alignment
- Hit target size

### Chevron Requirement

- All dropdown filters must include a right-aligned down chevron.
- Chevron styling must match the canonical version used on the Execution Planning Dashboard.

**Rule:**

No page may use a "small" or alternate filter style once a standard is established.

---

## 29. Section Headers & Table Title Containers

### Principle

Table headers must behave as full-width containers, not text-wrapped elements.

### Rules

Section headers (e.g., *Execution Plans*, *Funding Source Authorizations*) must:

- Span the full width of the table container
- Use surface-gray background
- Use standard gray border
- Titles and subtitles must live inside the same container, not split across adjacent divs

### Explicitly Forbidden

- Headers that only wrap text width
- Visual gaps between title headers and column headers
- Multiple stacked header containers for a single table

---

## 30. Expanded Row Hierarchy & Indentation (Reinforcement)

### Rules

Expanded parent rows must include:

- A left accent rail (accent-default color)
- Increased visual weight relative to collapsed rows

Child rows must be:

- Slightly indented horizontally
- Clearly subordinate to the parent row

**Rule:**

Expansion must communicate hierarchy, not just visibility.

---

## 31. Change Drift & Repetition Prevention (New – Important)

### Principle

When responding to iterative prompts, only the delta requested should change.

### Rules

- Do not reapply previous changes unless explicitly asked.
- Do not restate or reimplement completed work.
- Do not “clean up” adjacent areas opportunistically.

### If Context Is Lost

If there is uncertainty about:

- Current state
- Previously completed changes
- Which version is authoritative

Then:

- Ask a single clarifying question **or** request a fresh chat context.

**Rule:**

Repetition is a failure mode, not a safe default.

---

## 32. Multi-Page Navigation & Top-Row Stability

### Principle

Top-of-page rows (version selectors, primary actions) must not cause visual “jumping” between pages.

### Rules

Version rows across pages must share:

- Height
- Vertical padding
- Control sizing

Buttons within these rows must feel consistent in visual weight.

### Standardization Guidance

- Do not let one page be “slimmer” or “fatter” than others.
- Optimize for perceived stability during navigation.

# 33. Filter Interaction Model Standard (New – Critical)

## Principle
Filters across a module must follow a **single interaction model**.

## Default Standard (Execution Planning)
Filters are **immediate apply**.

- No Apply button
- No staged filter state
- Filter changes update results instantly
- Clear Filters resets immediately

## When Apply Is Allowed
An **Apply Filters** button may only be introduced if:

- Filtering triggers expensive server-side queries
- Filters are complex AND/OR rule builders
- Product owner explicitly requests staged filtering

## Rule
> Do not mix immediate and deferred filtering patterns within the same module.

---

# 34. Filter Section

## Filters (Standardized Pattern)

### One Pattern Only (No Variants)
All filter areas MUST use the same container pattern regardless of filter count or density. Do not switch between “toolbar” vs “panel” layouts. The content inside the container may be compact, but the outer structure stays identical.

### Filter Container Header (Required)
Every filter container MUST include a header row with:

- Left: **"Filters"** label (single, consistent)
- Right: a toggle control labeled:
  - **"Hide Filters"** when expanded
  - **"Show Filters"** when collapsed
- Include a chevron icon that reflects state:
  - Expanded: chevron up
  - Collapsed: chevron down

This header row MUST always be present (even if there are only 1–2 filters).

### Collapse Behavior
- Collapsing filters hides ONLY the filter control region.
- The table and page layout MUST NOT shift unexpectedly (avoid reflow drift).
- When collapsed, do NOT render an alternate “mini toolbar” layout. The container remains; only the interior content is hidden.

### Apply Behavior (Immediate)
- Filters MUST apply immediately on change.
- No Apply button unless explicitly requested.

### Clear Filters
- **Clear Filters** MUST be a ghost/inline accent link.
- Placement: within the filter container, aligned with the filter controls (not in the table header).
- Resets all filters to defaults, including date quick sets.

### Layout Rules (Inside the Container)
- Use a consistent grid for filter controls (stable columns, aligned fields).
- Maintain predictable wrapping; avoid “smart” reflow behaviors that change alignment between screens.

---

# 35. Table Title Header Standardization (New)

## Principle
All table header/title sections within a module must follow a consistent structural pattern.

## Standard Layout

**Left Column:**
- Single table title (no super-header)
- Search input beneath title
- Expand/Collapse All control to the right of Search

**Right Column:**
- Table-level actions (e.g., Mass Change)
- Any additional controls not directly related to structure

## Rules
- Do not stack multiple title containers.
- Do not split title and search into separate structural wrappers.
- Do not alternate left/right positioning across pages.

## Explicitly Forbidden
- Two-tier headers without clear hierarchy
- Search bars floating without structural alignment
- Expand/Collapse controls placed inconsistently across tables

---

# 36. Sorting Standardization (New)

## Principle
Sortable tables must behave identically across pages.

## Interaction Rules
- Click 1 → Ascending
- Click 2 → Descending
- Click 3 → Clear sort
- Single active sort column (unless explicitly expanded later)

## Visual Rules
- Neutral sort icon when inactive
- Accent color for active direction
- Sort icon must not cause header truncation
- Column width must account for icon footprint

## Hierarchical Sorting
When grouping is active:
- Sorting applies within the current grouping level only.
- Sorting must not flatten hierarchy unless explicitly requested.

---

# 37. Tooltip Collision & Viewport Safety (New)

## Principle
Tooltips must never render outside viewport bounds.

## Rules
- Default open direction may be right.
- If insufficient space, flip left.
- Maintain minimum viewport padding (8–16px).
- Tooltip must remain fully visible.

## Explicitly Forbidden
- Tooltips that overflow viewport.
- Tooltips that cause horizontal scroll.
- Layout shifts on tooltip render.

---

# 38. Hover Layering & Hierarchy Safety (New)

## Principle
Hover states must not overpower hierarchy shading.

## Rules
- Hover must override background tone subtly.
- Hover must not resemble selected state.
- Hover contrast must remain distinguishable on all hierarchy levels.
- Avoid dramatic darkening.

## Rule
> Hover indicates focus, not activation.

---

# 39. Column Width Redistribution Discipline (New)

## Principle
When adding new UI elements (e.g., sort icons), redistribute width intentionally.

## Rules
- Do not arbitrarily expand table width.
- Reallocate space from low-priority columns.
- Numeric columns may compress slightly before structural columns.
- Never clip interactive controls (segmented buttons, kebabs).

---

# 40. Accent Usage Governance (New)

## Principle
Accent color should signal interaction or active state — not decoration.

## Rules
Accent blue is used for:
- Active sort direction
- Ghost action links (e.g., Clear Filters)
- Active interactive states
- Focus rings

Accent should not be used for:
- Structural backgrounds
- Neutral grouping
- Non-interactive labels

---

# 41. Control Density & Breathing Room (New)

## Principle
Enterprise tables are dense but must not feel cramped.

## Rules
- Maintain minimum 16px horizontal spacing between controls.
- Interactive controls must have visible breathing room inside grid columns.
- Avoid clipping segmented controls.
- Expand structural columns before shrinking action columns.

---

# 42. Freezing vs Scrolling Rule (New)

## Principle
Sticky/frozen columns should only be used when materially necessary.

## Rules
Use frozen columns only when:
- Table width exceeds typical viewport
- First column is critical anchor
- Cross-column comparison is frequent

Otherwise:
- Allow full horizontal scroll
- Avoid content sliding under frozen elements

---

# 43. Grouping Behavior Contract (New – Advanced Tables)

## Principle
Grouping order controls table hierarchy structure.

## Rules
- Grouping reorders must rebuild hierarchy.
- Grouping change should:
  - Animate collapse
  - Re-render hierarchy
  - Default to fully expanded (unless otherwise specified)
- Expansion depth must be respected.

---

# 44. Persistent Row Selection Standard (New)

## Principle  
Users must be able to visually anchor a row without relying on hover.

## Behavior
- Clicking a data row selects it.
- Only one row may be selected at a time (single-select).
- Clicking another row moves the selection.
- Selection persists when mouse leaves the row.
- Selection does not clear when clicking elsewhere on the page (unless explicitly designed to do so).

## Visual Standard
Selected row must include:
- A 3px left accent rail (accent-default)
- A subtle accent-tinted background (lighter than hover state)
- No change to text color
- No layout shift

## Hierarchy Rules
Visual priority must follow:

1. Error Cell (highest visual weight)
2. Selected Row
3. Hover State
4. Neutral Row

Hover must never resemble selected state.

**Rule:**  
> Selection is an anchor state, not an activation state.

---

# 45. Segmented Control (Track + Pill) Standard (New – Critical)

## Principle  
Segmented controls must read as a single unit, not independent buttons.

## Structural Pattern
- One shared track container (light neutral surface).
- No borders between individual segments.
- Selected state uses a pill-style indicator inside the track.
- Pill must not overflow the track container.

## Selected State
- Solid (non-alpha) accent fill OR high-contrast accent-tinted fill.
- Medium font weight.
- Stronger contrast than unselected options.
- No layout shift when toggled.

## Unselected State
- Neutral text.
- No border box per segment.
- No alpha overlays that blend unpredictably with surface gray.

## Explicitly Forbidden
- Three independent bordered buttons.
- Alpha-only fills that reduce readability.
- Selected state that blends into track color.
- Clipped segment labels.

**Rule:**  
> A segmented control is one component with internal state, not three buttons.

---

# 46. Bulk Table Action Labeling Standard (New)

## Principle  
Table-wide actions must use enterprise-recognizable terminology.

## Standard Term
Replace:
- “Mass Change”

With:
- “Bulk Status Update”
OR
- “Bulk Update”

## Rules
- Label must sit inline with control.
- No stacked mini-headers above segmented controls.
- Bulk controls belong in the table header action zone (right side).

**Rule:**  
> Use language that reflects operational clarity, not developer shorthand.

---

# 47. Semantic Table Cell State Standard (New – Critical)

## Principle  
Cell states must reflect severity hierarchy consistently across all tables.

## Severity Levels

### Error (Hard Stop)
Used when:
- Data violates rule
- Reconciliation fails
- Totals mismatch

Visual:
- Red text
- Red warning icon
- Very subtle red-tinted cell background
- Tooltip required

### Warning (Soft Concern)
Used when:
- Data is unusual
- Negative values
- Manual review suggested

Visual:
- Orange/amber text
- Warning icon
- Very subtle amber-tinted background
- Tooltip required

### Informational (Optional)
Used when:
- Contextual indicator
- Non-critical deviation

Visual:
- Accent or neutral emphasis
- No heavy background

## Explicitly Forbidden
- Using red and orange interchangeably.
- Background fills without icon.
- Icon without tooltip.
- Full-row red background for single-cell issue.

**Rule:**  
> Severity must be visually distinguishable at a glance.

---

# 48. Table Header Vertical Rhythm Standard (New)

## Principle  
Table title containers must be visually distinct through spacing and structure, not heavy color changes.

## Rules
- Increase vertical padding relative to column header row.
- Bottom divider may be thicker than column header divider.
- Background must remain surface tone (do not darken arbitrarily).
- Title font weight may be semibold.

## Explicitly Forbidden
- Using darker neutral tones to simulate importance.
- Stacking multiple background bands.

**Rule:**  
> Separation should come from spacing and structure, not color escalation.

---

# 49. Filter Label Weight Standardization (New)

## Principle  
Filter labels must maintain consistent typographic hierarchy.

## Rules
- All filter labels must use medium font weight.
- No mixture of regular and medium within the same filter section.
- Filter labels must use primary text color (no gray-on-gray).
- Labels must remain left-aligned with inputs.

## Explicitly Forbidden
- Gray labels on gray background.
- Mixed label weights.
- Right-aligned labels in left-aligned forms.

**Rule:**  
> Filters must read as structured controls, not placeholder text.

---

# 50. Surface Tone Governance (New – Clarification)

## Principle  
Surface gray tones must serve hierarchy, not decoration.

## Rules
- Surface Neutral 2 (#F9F9FB) remains default container tone.
- Do not introduce darker neutral variants to imply hierarchy unless explicitly defined.
- Column headers, filter containers, and expanded parents must not compete via escalating gray tones.
- Hierarchy must be communicated through spacing, borders, and structure first.

**Rule:**  
> If two surfaces compete, reduce tone variation — don’t increase it.
>
> # 51. Typography Token Enforcement (Critical)

## Principle
All typography must map to a defined design system role. No ad-hoc sizes.

## Rules

- Do not introduce arbitrary font sizes.
- All text must use a defined typographic role:
  - Display Primary
  - Display Subtitle
  - Section Title
  - Container Title
  - Card Title
  - Body
  - Helper
  - Field Label
  - Field Value
  - Table Column Header
  - Breadcrumb

- If a role does not exist:
  - Stop and define it in the design system first.
  - Do not improvise.

## Explicitly Forbidden

- 15px text
- 17px text
- Inline font-size overrides
- Mixing semibold and medium randomly

**Rule:**  
> Typography is a contract, not a suggestion.

---

# 52. KPI Metric Typography Rule

## Principle
Large numeric metrics (e.g., dashboard KPI cards) must use Display Primary.

## Rules

- KPI metric numbers use:
  - Display Primary size
  - Semibold
  - Default color
- Supporting labels use:
  - Card Title or Body
- Supporting metadata (timestamps, etc.) use Helper

**Rule:**  
> KPI metrics reuse Display Primary. They are not a separate token.

---

# 53. Numeric Column Alignment Standard

## Principle
Numeric data must align for vertical comparison.

## Rules

### Currency Columns
- Header: right-aligned
- Cells: right-aligned
- Thousand separators required
- Fixed decimal formatting (if used)

### Numeric Non-Currency Columns
- Right-aligned if used for comparison
- Left-aligned only if part of mixed text content

### Dates
- Default: left-aligned
- Right-align only if used in numeric comparison grids

**Rule:**  
> If values are compared vertically, they must align on the right.

---

# 54. Sticky Footer Standard

## Principle
Pages with persistent actions must use a sticky action footer.

## Structure
- Full-width container
- Surface background
- Subtle top shadow (elevation effect)
- Content aligned with page container padding
- Actions right-aligned
- Status indicator left of actions

## Behavior
- Always visible while scrolling
- Must not overlap page content
- Must not cause layout shift

## Explicitly Forbidden
- Floating action buttons
- In-content action rows that scroll away
- Sticky footer without elevation shadow

**Rule:**  
> Primary page actions must never scroll out of view.

---

# 55. Text Color Token Enforcement (Critical)

## Principle
Text color must use semantic tokens only.

## Allowed
- Default (primary text)
- Neutral (secondary text)
- Semantic Error
- Semantic Warning
- Accent (interactive only)

## Forbidden
- Inline hex values
- Custom gray shades
- Darker gray for “visual weight”

**Rule:**  
> Color indicates meaning, not decoration.

---

# 56. Editable Currency Input Pattern

## Rules
- Dollar symbol inside input (left-aligned)
- Numeric value right-aligned
- No layout shift when editing
- Validation messages below input
- No inline error icon without message

**Rule:**  
> Editable currency fields must visually mirror read-only currency columns.

---

# 57. Cross-Page Hardening Protocol

## Standardization Process

When standardizing across multiple pages:

1. Choose a canonical page.
2. Harden it fully.
3. Validate visually and behaviorally.
4. Propagate pattern to other pages.

If a pattern conflicts:
- Update the design system first.
- Then update pages.

**Rule:**  
> The design system drives pages — not the reverse.

---

# 58. Table Density Guardrail

## Principle
Enterprise tables are dense but must not feel cramped.

## Rules
- Maintain minimum row height equal to current standard.
- Do not reduce vertical padding for density unless explicitly requested.
- Preserve readability over compression.

**Rule:**  
> Enterprise density should feel efficient, not crowded.

---

# End of Additions

These sections are intended to integrate directly into the existing SyncPoint UI Engineering Guidelines to reinforce token discipline, numeric alignment standards, and cross-page consistency governance.








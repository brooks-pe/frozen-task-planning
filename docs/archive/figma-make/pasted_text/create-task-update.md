Change type:
Behavioral + interaction update

Scope:
Standalone Create Task page only

* Create Task grid/table
* Action buttons below grid

Objective:
Replace the Reset and Create Task buttons with a single “Add Task” button that allows users to dynamically add multiple empty rows for inline task creation.

Changes:

1. Remove existing buttons

* Remove:

  * `Reset` button
  * `Create Task` split button
* Do NOT leave empty space or broken alignment
* Do NOT affect any other page elements

2. Add new primary action

* Add a single button below the grid:
  Label: `Add Task`
* Placement:

  * Bottom-left, aligned with table content (same alignment as previous buttons)
* Style:

  * Use standard primary button styling (same as existing primary buttons in app)

3. Add row behavior

* On click of `Add Task`:

  * Add a NEW empty row directly BELOW the last existing row
  * The new row must:

    * Contain all the same fields as the initial row
    * Be fully editable
    * Follow the same field logic and dependencies as the first row

4. Default page state

* Page loads with:

  * ONE empty row already present (unchanged from current behavior)
* Additional rows are only created via `Add Task`

5. Field behavior (CRITICAL — reuse existing logic)
   Each row must independently support:

* Project selection
* CODB conditional checkbox behavior
* Execution Statement dropdown + hover card
* Execution Statement → APPN + Funding Source autopopulation
* Searchable dropdowns
* Validation logic (even if not yet enforced visually)

DO NOT break or simplify any existing field logic.

6. Row independence

* Each row must function independently:

  * Selecting values in one row must NOT affect other rows
  * Autopopulation must only apply within the same row

7. Layout behavior

* Table must:

  * Expand vertically as rows are added
  * NOT introduce internal scrolling
  * Continue using page-level scrolling only
* Dropdowns must remain fully visible (no clipping)

8. Task ID behavior

* Each new row should:

  * Display a unique, incremented Task ID preview
  * Example:
    Row 1 → 41-2001
    Row 2 → 41-2002
    Row 3 → 41-2003
* IDs are preview-only (read-only display)

9. No submission behavior (for now)

* Do NOT implement:

  * Save
  * Create
  * Bulk submit
* This page is currently for staging multiple task shells only

10. Preserve everything else
    DO NOT CHANGE:

* Page header and breadcrumb
* Table column structure
* Field order
* Dropdown search inputs
* Hover card behavior
* Autopopulation logic
* Styling of inputs

Constraints:

* Do NOT introduce inline validation errors yet
* Do NOT add delete row functionality yet
* Do NOT convert to spreadsheet component
* Do NOT add keyboard shortcuts
* Keep interaction simple and stable

Success Criteria:

* Reset and Create Task buttons are removed
* “Add Task” button appears in their place
* Clicking “Add Task” adds a new empty row below
* Multiple rows can be added sequentially
* Each row behaves independently and correctly
* Task IDs increment per row
* No layout clipping or scroll regressions

Change type:
Structural + behavioral

Scope:
Task Planning module only

Objective:
Add a new standalone Create Task page that supports quick task-shell entry in a grid/table format, while reusing the same field set, dependencies, and create actions as the existing Create Task flyout.

Changes:

1. Add new page / route

* Create a new standalone page for quick task creation
* Page title:
  `Create Task`
* Add standard page header and breadcrumb pattern already used elsewhere in Task Planning
* Breadcrumb should follow existing Tasks page conventions and append:
  `Create Task`

2. Page intro copy

* Below the page title, add short instructional copy:
  `Create one or more task shells quickly using the grid below. Complete the required fields, then create the task or open the task workspace.`
* Use existing body text style and spacing conventions
* Keep this brief and enterprise-friendly

3. Add navigation entry point from Tasks page

* On the existing Tasks grid page, add a new button:
  `Create Task Grid`
* Place it to the LEFT of the existing `Create Task` button
* Reuse existing secondary button styling
* Clicking `Create Task Grid` navigates to the new standalone Create Task page
* Do NOT change existing `Create Task` flyout button behavior

4. Create Task Grid structure

* Main interaction area is a simple creation table
* Do NOT add a separate card header/title area for the table
* Show column headers only

5. Grid columns

* Use the same core fields as the Create Task flyout, plus Task ID preview
* Exact column order:

  1. Task ID
  2. Project
  3. CODB
  4. Execution Statement
  5. Task Title
  6. WBS Attribute
  7. Executing Activity
  8. Appropriation (APPN)
  9. Funding Source

6. Default row behavior

* On page load, show exactly ONE empty editable row ready for input
* This row should be immediately usable inline
* Do NOT require the user to click “Add Row” before entering data
* Reuse existing input/dropdown patterns exactly within the row

7. Task ID preview

* Prepopulate the Task ID cell with the next available task ID preview
* Use this as a read-only preview value only
* It should visually match a read-only table cell, not an editable field
* If exact dynamic generation is not available in this prototype, use a realistic next-ID placeholder that appears system-generated

8. Field/component mapping

* Project → searchable dropdown
* CODB → single checkbox, visible/usable only when Project = CODB, otherwise empty/non-applicable in row
* Execution Statement → searchable dropdown
* Task Title → text input
* WBS Attribute → searchable dropdown
* Executing Activity → searchable dropdown
* Appropriation (APPN) → searchable dropdown
* Funding Source → searchable dropdown

9. Reuse flyout logic exactly

* This page must reuse the same field dependency and auto-population behavior already implemented in the Create Task flyout
* Specifically:

  * CODB visibility rule
  * Execution Statement details / mapping logic
  * APPN auto-population
  * Funding Source auto-population
  * Required-field logic
  * Searchable dropdown pattern
* Do NOT invent alternate behaviors for the grid page

10. CODB behavior in grid row

* Only show/use the CODB checkbox when Project = `CODB`
* For all other project values:

  * checkbox should not appear as active/applicable
* Reuse same checkbox styling rules already established in flyout

11. Execution Statement details

* Do NOT add a persistent details field below the grid row on this page
* Keep the grid compact
* However, preserve the hover-card preview behavior inside the Execution Statement dropdown options
* The row should remain table-like and stable

12. Buttons below the row

* Below the row, aligned bottom-left, add:

  * secondary button: `Reset`
  * primary split button: `Create Task`
* Place `Reset` to the left of `Create Task`
* Reuse existing button styles and split-button pattern already used in the Create Task flyout

13. Split button behavior

* Restore the same two actions used in the flyout:

  * Primary/default: create task and stay on current page
  * Secondary option: `Create and go to workspace`
* For this page:

  * Primary/default action:

    * creates the task
    * keeps user on this page
    * clears the current row and replaces it with a fresh empty row
    * shows standard top-right success toast
  * Secondary action:

    * creates the task
    * then navigates to Task Workspace 41-0279 (same controlled demo behavior used in flyout)

14. Disabled state behavior

* The `Create Task` split button must appear disabled until all required fields in the row are validly completed
* Reuse the same enable/disable rules as the flyout
* Standard row:

  * Project
  * Execution Statement
  * Task Title
  * WBS Attribute
  * Executing Activity
  * Appropriation (APPN)
  * Funding Source
* CODB row:

  * Project
  * Task Title
  * Appropriation (APPN)
* Disabled state must use existing button-disabled pattern and remain readable

15. Reset button behavior

* Clicking `Reset`:

  * clears all entered values in the current row
  * restores the default empty row state
  * restores Task ID preview to the next available preview value
* Do NOT navigate away
* Do NOT remove the row

16. Table/layout rules

* Reuse existing SyncPoint table/grid conventions:

  * stable column alignment
  * clear column headers
  * no layout shift
  * no card header for the table
* This creation grid should feel like a lightweight inline-entry table, not a reporting table
* Keep columns practical for data entry
* Long values may truncate appropriately within cells
* Dropdowns may overflow above the table as needed without changing row height

17. Scope limits

* This first version supports ONE inline creation row only
* Do NOT implement multi-row entry yet
* The page copy may reference quick creation, but the initial implementation is a single-row grid shell creator
* Do NOT add bulk import, add-row, or spreadsheet-like behaviors yet

Pattern Anchors:

* Reuse existing page header + breadcrumb pattern from Task Planning pages
* Reuse existing table/grid conventions
* Reuse existing searchable dropdown pattern with search input at top
* Reuse existing Create Task split-button behavior
* Reuse existing success toast pattern
* Reuse existing dependent-field logic from the Create Task flyout

Constraints:

* Do NOT modify the existing Create Task flyout
* Do NOT change the existing Tasks grid structure
* Do NOT change the existing `Create Task` button behavior on the Tasks page
* Do NOT introduce new components or new input variants
* Do NOT add a separate title/header bar above the creation table
* Do NOT implement multi-row creation in this pass
* Do NOT restyle existing page-level patterns

Success Criteria:

* A new standalone Create Task page exists and is reachable from the Tasks page via `Create Task Grid`
* The page uses standard header, intro copy, and breadcrumbs
* One editable row is visible by default
* The row uses the same fields and dependency logic as the flyout
* Task ID is shown as a read-only preview
* `Reset` clears the row
* `Create Task` remains disabled until required fields are complete
* Primary create action creates and stays on page with a fresh empty row
* Secondary action creates and opens Task Workspace 41-0279
* No regressions are introduced to existing flyout or Tasks grid behavior

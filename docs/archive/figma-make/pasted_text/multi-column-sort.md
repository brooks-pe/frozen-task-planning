Change type:
Behavioral enhancement (multi-column sorting)

Scope:
Task Planning → Tasks Grid table

* Column header sorting behavior
* Sort state management
* Header indicators

Objective:
Enable controlled multi-column sorting (Primary + Secondary) using existing click and shift+click behavior, with automatic priority handling based on interaction order.

Core Behavior:

1. Primary sort (default)

* Clicking any column header or sort icon:

  * Sets that column as the PRIMARY sort
  * Clears any existing secondary sort (unless shift is used)

2. Secondary sort (shift interaction)

* If a column is already sorted (primary exists):

  * Shift + click on a different column OR clicking its sort icon while holding shift:
    → Adds that column as SECONDARY sort

3. Interaction-based priority (IMPORTANT)

* Sort priority is determined by order of interaction:

  * First sorted column = Primary (1)
  * Second sorted column = Secondary (2)

4. Removing a sort (dynamic reordering)

* If the PRIMARY sort is removed:
  → The SECONDARY sort automatically becomes the new PRIMARY

* If the SECONDARY sort is removed:
  → PRIMARY remains unchanged

5. Sort toggle behavior (per column)
   Each column cycles through:

* Ascending → Descending → Not sorted

If a column becomes "Not sorted":

* It is removed from the sort stack
* Remaining sorts reflow (secondary becomes primary if needed)

---

Visual Indicators:

6. Sort order indicators (required)

* Display a small numeric indicator next to the sort icon:

  * "1" = Primary sort
  * "2" = Secondary sort

7. Header styling

Primary sort column:

* Bold header text
* Header background highlight (existing behavior)
* Sort arrow (direction)
* Sort index badge "1"

Secondary sort column:

* Normal (or slightly emphasized) text
* NO background highlight
* Sort arrow (direction)
* Sort index badge "2"

Unsorted columns:

* Default styling
* No badge

---

Sorting Logic:

8. Sorting execution order

* Apply Primary sort first
* Then apply Secondary sort within grouped results

Example:

* Primary: Workflow State (ascending)
* Secondary: Delta (descending)

Result:

* Tasks grouped by Workflow State
* Within each group → sorted by Delta

---

Constraints (VERY IMPORTANT):

* Maximum of 2 active sorts at any time (Primary + Secondary only)
* Do NOT allow a third sort to be added
* Do NOT redesign table layout
* Do NOT change column widths
* Do NOT remove existing sort arrows
* Do NOT break existing click-to-sort behavior
* Do NOT remove header highlight for primary sort

---

State Management:

* Sort state must reset correctly when:

  * Columns are toggled off
  * New primary sort is selected without shift
* No stale sort states should persist
* Sort order must always reflect current UI indicators

---

Design Intent:

* Match enterprise patterns (Excel, Airtable, Power BI)
* Keep behavior intuitive:

  * “What I clicked first = most important”
* Avoid complexity while enabling meaningful analysis

---

Success Criteria:

* Clicking a column sorts it as primary
* Shift + clicking a second column adds it as secondary
* Sort order is visually indicated with "1" and "2"
* Removing primary promotes secondary automatically
* Only one column is highlighted (primary)
* No regressions in existing sorting behavior

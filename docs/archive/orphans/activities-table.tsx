Build the “Activities” table section on the Funding Work Plans page, using the existing SyncPoint table patterns (do NOT copy the dev server styling).

SCOPE (this step)
1) Add the table title/control row (Table Title | Search | Expand All)
2) Add the Activities hierarchical table structure with the required columns
3) Implement the Funding Source cell layout improvement using a “ghost” badge gutter inside the Funding Source column
Do NOT implement real data logic yet beyond placeholder rows and expand/collapse UI.

A) TABLE TITLE / CONTROLS (reuse existing pattern)
Add the standard SyncPoint table header row used on other Execution Planning screens:
- Left: Table title = “Activities”
- Middle: Search input (placeholder “Search...”)
- Right: “Expand All” control (same pattern used elsewhere)

B) TABLE COLUMNS
Create the table with these columns in this order:
1. Executing Activity
2. Funding Source
3. Approved Tasking
4. Funds on Board
5. Increments Planned
6. Remaining
7. Increments

Notes:
- Parent rows (top-level Executing Activity rows) do NOT have a Funding Source value (Funding Source is only populated on child rows).
- Keep alignment and column header typography consistent with other tables (ALL CAPS column headers, same spacing).
- “Increments” column can be relatively narrow for now since there is currently no increments content shown.

C) HIERARCHY / ROW TYPES (structure only)
Implement a hierarchical row pattern consistent with other Execution Planning tables:
- Parent rows: Executing Activity is shown with expand/collapse chevron; other numeric columns can show summary placeholders.
- Child rows: show Funding Source details and the numeric columns.

You can include a small set of placeholder data similar to the dev example for layout verification:
- One parent executing activity with 2–3 child funding source rows
- A couple of collapsed parent rows below it

D) FUNDING SOURCE CELL LAYOUT (ghost badge gutter)
For CHILD rows only, implement the Funding Source cell so it does NOT become a 3-line stack pushed far to the right by indentation.

Within the Funding Source column, create an internal two-part layout:
1) A narrow left “badge gutter” area (this is the “ghost” badge column)
2) A main content area to the right for the funding source identifier and year

Layout rules:
- The appropriation badge (e.g., RDTEN, OPN) should render in the left badge gutter area, leveraging the horizontal space created by the hierarchy indent.
- The funding source identifier should appear to the right of the badge on the first line.
- The year should appear on the second line, aligned under the funding source identifier (not under the badge).

Example (child row, Funding Source cell):
[Badge]  0605512N/3428 – sUSV
         2025

Important constraints:
- Do NOT create a separate visible table column for the badge; it should be inside the Funding Source cell as a gutter layout.
- Do NOT reduce the Executing Activity column width to make room; the goal is to reclaim the indent/gutter space.
- It is OK to allocate a bit more width to the Funding Source column by narrowing the (currently empty) Increments column.

E) STYLE CONSTRAINTS
- Reuse existing table components and patterns from the prototype (container, header, row styling, expand/collapse behavior, column header typography).
- Do not redesign the page or change existing sections.
- Focus on layout correctness, alignment, and responsiveness.

Deliverable for this step:
The Activities table appears under the status tabs and matches the SyncPoint table pattern, with correct columns and improved Funding Source child-row layout using the badge gutter approach.
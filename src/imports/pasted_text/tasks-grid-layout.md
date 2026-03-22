Fix Tasks Grid Column Width Allocation and Header Separation

Update the Tasks List table on the Task Planning → Tasks page.

This is a targeted column layout fix. Do not change filters, data, button styling, sorting behavior, or overall page layout.

1. Correct the column width distribution

The current table still has a layout issue where:

Executing Activity is too narrow

Title begins too early / too close to it

The two columns visually run together, especially in the header row

Refine the grid so the columns are properly separated and intentionally sized.

2. Explicitly rebalance these columns

Adjust widths so that:

Task ID remains narrow

Executing Activity gets enough width to comfortably fit typical values like:

NSWC PCD

NSWC DD

Maritime Systems Lab

Naval AI Systems

Title remains the widest column, but starts with clear separation from Executing Activity

Workflow State remains medium

Requested / Allocated / Gap remain equal width

Actions remains narrow

3. Ensure visible separation between column headers

The header row must clearly read as separate columns:

TASK ID

EXECUTING ACTIVITY

TITLE

Right now, EXECUTING ACTIVITYTITLE visually reads like a merged header.

Fix this by ensuring:

proper column width allocation

enough horizontal padding between columns

header text alignment that makes each column boundary obvious

If needed, slightly increase spacing or padding so the headers do not visually collide.

4. Preserve balanced table composition

The goal is not just to widen one column arbitrarily. The whole table should still feel balanced and evenly distributed across the available width.

The layout should feel similar to a clean enterprise data grid:

no overlap

no visual collisions

no overly compressed text columns

no excessively wide empty columns

5. Do not change anything else

Do NOT change:

row data

sort behavior

clone button styling

gap color treatment

typography

table header pattern

6. Outcome goal

The table should now clearly read as distinct columns, with:

Executing Activity and Title fully separated

column widths feeling intentional

no header collisions

no crowding in the left half of the grid
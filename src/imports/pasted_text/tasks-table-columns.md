Rebalance Tasks Table Columns with Even Auto Distribution

Update the Tasks List table on the Task Planning → Tasks page.

This is a column sizing correction. Do not change data, styling, sorting, filters, or button treatments.

Problem to fix

The table is still not distributing width correctly.

Right now:

the Title column is taking too much width

the other columns are being overly compressed

the grid does not feel evenly distributed across the available table width

We want the columns to feel balanced by default, not dominated by the Title column.

1. Use balanced auto-width distribution across the table

Refactor the table columns so they auto size and evenly distribute across the available width.

Desired behavior

Columns should share available width more evenly

The table should not leave one very large Title column while compacting everything else

All headers and cell values should have enough room to breathe

Column boundaries should read clearly

The table should feel like a balanced enterprise grid, not a manually stretched layout.

2. Apply only a controlled width preference to Title

The Title column should have a moderate preference, not an overwhelming one.

Rule:

At standard desktop width, columns should feel generally balanced

The Title column can be somewhat wider than others, but not dramatically wider

When the screen begins to shrink, Title should be the last major column to give up space

In other words:

balanced by default

title gets priority only under tighter widths

Do NOT let Title consume excessive width at large viewport sizes.

3. Suggested sizing intent

Use this as layout guidance:

Task ID → narrow

Executing Activity → small/medium

Title → medium/wide, but not oversized

Workflow State → medium

Requested → medium

Allocated → medium

Gap → medium

Actions → narrow

Important

Financial columns should feel visually consistent with one another.

4. Preserve clean separation between left-side columns

Ensure there is clear separation between:

Task ID

Executing Activity

Title

Do not allow the left side of the table to feel crowded while the middle has excessive empty space.

5. Responsive behavior

As viewport width decreases:

maintain readable headers

preserve the Title column preferentially

reduce other columns first only as needed

keep overall grid alignment clean and intentional

At wider viewport widths:

use the full table width more evenly

6. Do not change anything else

Do NOT change:

row data

sort state

clone button styling

typography

table header structure

spacing outside the table

7. Outcome goal

The final table should feel:

evenly distributed

balanced across the full width

readable at a glance

consistent with a modern enterprise data grid

It should no longer look like:

one oversized Title column plus compressed supporting columns

It should look like:

a properly auto-sized grid with smart width behavior
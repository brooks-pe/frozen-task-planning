Refine Recent Task Updates Table

Update the Recent Task Updates table on the Task Planning Dashboard.

This is a scoped refinement. Do not redesign the dashboard or change the purpose of the table.

1. Evenly distribute the table columns

Adjust the table layout so the columns are more evenly distributed across the available width.

Current columns:

Task ID

Title

Workflow State

Updated By

Updated On

Intent

The table should feel balanced and easier to scan, rather than overly weighted toward one or two columns.

Guidance

Distribute column widths more evenly across the table

Keep enough width for Title so it remains readable

Avoid overly narrow columns that cause awkward wrapping

Maintain clean alignment and consistent padding

This does not need to mean mathematically identical widths, but it should feel visually even and intentionally balanced.

2. Apply the standard table header pattern

Update the top of the card to follow the existing SyncPoint table title pattern used elsewhere in the product.

Required structure

Table title on the left: Recent Task Updates

Vertical divider

Search field

Existing time-range filters remain on the right:

Last 24 Hours

Last 5 Days

Last 30 Days

Notes

Reuse the same visual pattern used on other data tables

Search bar should feel like part of the title row, not a separate filter row

Maintain alignment and spacing consistency with existing SyncPoint tables

3. Add sortable column headers

Add sorting arrows to the columns where sorting makes sense.

Apply sort affordances to:

Task ID

Title

Workflow State

Updated By

Updated On

Default active sort

Updated On should be the default active sort

Show it as sorted in descending order (most recent first)

Visual behavior

Use the same sort arrow treatment already used in other SyncPoint tables

Active sort should be visually distinguishable from inactive sortable headers

Keep styling subtle and enterprise-appropriate

4. Expand the table to 10 rows

Increase the table from its current row count to 10 total rows.

Data requirements

Use believable task names and IDs

Keep the data realistic and aligned to Task Planning context

Maintain descending order by Updated On

Critical requirement

Ensure the 10 rows collectively include at least one example of every workflow state represented in the dashboard workflow model:

Draft

BOE Build-Up

Activity Acceptance

Project Acceptance

Project Allocation

Impact Assessment

Project Approval

Program Approval

Baselined

Since there are 9 workflow states and 10 rows total, one state may appear twice.

5. Preserve existing table behavior and styling

Maintain:

Blue linked Task IDs

Enterprise table styling

Strong column header treatment

Clean row separators

Good hover behavior if already present

Do not:

Add pagination

Add extra filters

Add badges unless already needed by existing design patterns

Change “Workflow State” terminology

6. Outcome goal

The table should feel:

more consistent with existing SyncPoint table patterns

easier to scan

better balanced across the width

more complete as a dashboard summary table

It should still read as a compact recent activity view, not a full data management table.
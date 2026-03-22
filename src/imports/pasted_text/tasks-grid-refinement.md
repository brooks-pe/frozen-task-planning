Tasks Grid Refinement (Column Layout, Actions, Sorting)

Update the Tasks List table on the Task Planning → Tasks page.

This is a grid refinement pass. Do not change data, filters, or overall page layout.

1. Fix column layout (even distribution + no overlap)

The current table has a layout issue where:

The Title column is encroaching on Executing Activity

Column widths are not balanced

The table feels compressed in some areas and stretched in others

Required update:

Distribute columns evenly and intentionally across the available width

Ensure no column overlap or visual collision

Maintain clear separation between:

Executing Activity

Title

Suggested column width approach (use as guidance, not rigid rules):

Task ID → narrow

Executing Activity → small/medium

Title → largest column (but constrained, not spilling)

Workflow State → medium

Requested / Allocated / Gap → equal widths

Actions → narrow

👉 Important:

Title should be the widest, but must not push or overlap adjacent columns

Financial columns should align cleanly and feel consistent

Overall table should feel balanced and grid-aligned, similar to:

Jira issue tables

Azure DevOps grids

2. Update “Clone” to a proper secondary button

Replace the current “Clone” action (link-style) with a secondary outline button.

Requirements:

Use SyncPoint secondary button style

Styling:

outline

accent blue border and text

subtle hover state (fill or tint per design system)

Size:

compact (table-friendly)

consistent across all rows

Alignment:

right-aligned in the Actions column

Do NOT:

use plain text links

introduce new button styles

3. Set default sorting to Workflow State

The table is intended to be default sorted by Workflow State.

Required updates:

Apply default sort on:
Workflow State (ascending, based on workflow order — not alphabetical if a defined order exists)

Visually indicate active sort:

Show sort indicator on Workflow State column header

Match existing table sorting UI pattern

Important (if workflow order exists):

Sort should follow logical progression:

Draft → BOE Build-Up → Activity Acceptance → Project Acceptance → Project Allocation → Impact Assessment → Project Approval → Program Approval → Baselined

NOT alphabetical.

4. Preserve everything else

Do NOT change:

data values

typography

spacing system

filter behavior

table container styling

🎯 Outcome

The table should now feel:

Structurally clean (no column collisions)

Visually balanced (intentional widths)

Consistent with design system (button styling)

Behaviorally correct (default sorted by workflow)

This should match the polish level of:

Jira backlog tables

Azure DevOps grids

internal enterprise data tables
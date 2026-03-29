Make Workflow States Clickable Links to Filtered Tasks View

Update the Workflow Progress section on the Task Planning Dashboard.

This is a targeted interaction enhancement. Do not redesign the component layout or progress bar styling.

1. Make Workflow State labels clickable

Convert each Workflow State label in the left column into a clickable link.

Examples:

Draft

BOE Build-Up

Activity Acceptance

Project Acceptance

Project Allocation

Impact Assessment

Project Approval

Program Approval

Baselined

These labels should act as navigation links.

2. Apply link styling consistent with the system

Style the workflow state labels as links using the existing design system:

Use standard accent blue link color

Add a clear hover state:

underline OR subtle color shift

Cursor should be pointer on hover

Do not over-style them — they should still feel like labels first, links second.

3. Preserve layout and readability

Ensure:

No changes to row height

No shifting of alignment between columns

Progress bars remain visually dominant

The labels remain easy to scan

The links should integrate cleanly into the existing layout.

4. Add navigation behavior

Clicking a workflow state should:

Navigate to Task Planning → Tasks page

Automatically apply:

Workflow State filter = selected state

Examples:

Clicking “Draft” → opens Tasks page filtered to Draft tasks

Clicking “Project Allocation” → filtered to Project Allocation

5. Optional (recommended) — expand clickable hit area

Improve usability by slightly increasing the clickable area:

Allow the hitbox to extend slightly beyond just the text (similar to KPI number improvement)

Do not make the entire row clickable

Keep interaction focused on the label region only

6. Maintain consistency with KPI interaction model

This interaction should feel consistent with:

KPI number click behavior

Task Status Focus filtering

Together they should form a unified pattern:

Dashboard element → click → filtered task grid

7. Do not change anything else

Do NOT modify:

progress bar colors or widths

percentage labels

remaining counts

typography hierarchy

spacing or layout structure

8. Outcome goal

The Workflow Progress section should now:

support direct drill-down into tasks by workflow state

feel interactive without becoming visually heavy

reinforce a consistent dashboard-to-grid navigation pattern
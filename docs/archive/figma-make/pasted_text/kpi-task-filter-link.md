Link Dashboard KPI Cards to Filtered Tasks View + Apply Status Colors

Update the Task Planning Dashboard KPI cards so they visually align with the Task Status Focus indicators used in the Tasks grid and support navigation into the filtered Tasks page.

This is a scoped interaction and styling enhancement. Do not redesign the dashboard layout.

1. Apply Task Status Focus colors to KPI card left rails

Update the left rail / accent border of each KPI card to use the same status color mapping used for the Task Status Focus indicators in the Tasks table.

Apply this mapping:

Tasks Awaiting My Action → blue

Stalled Tasks → amber / yellow

Tasks Near Deadline → orange

Overdue Tasks → red

Requirements:

Keep the existing card structure and left-rail treatment

Only update the rail color

Use clean, enterprise-appropriate tones that align with the SyncPoint palette

Ensure the colors match the table status indicators as closely as possible

2. Make the KPI numbers clickable

Turn the numeric value in each KPI card into the clickable element.

Examples:

7

4

12

3

Requirements:

Use the standard accent blue link color

Keep the number visually prominent

Add a clear hover state so users understand it is clickable

underline or subtle color shift is acceptable

Use a pointer cursor on hover

Do not make the entire card clickable.

Do not add a separate button like “View Tasks.”

The number alone should act as the link target.

3. Clicking a KPI number should navigate to the Tasks page with Task Status Focus applied

Each KPI number should deep-link to the Task Planning → Tasks page and apply the corresponding Task Status Focus filter automatically.

Mapping:

Tasks Awaiting My Action → Task Status Focus = Awaiting My Action

Stalled Tasks → Task Status Focus = Stalled Tasks

Tasks Near Deadline → Task Status Focus = Near Deadline

Overdue Tasks → Task Status Focus = Overdue

This should feel like a direct drill-down from summary metric to actionable task list.

4. Preserve card clarity and hierarchy

Maintain:

existing title placement

existing supporting text

existing spacing and alignment

The clickable number should still feel like the primary metric, not like a button.

5. Optional tooltip / affordance (only if it fits cleanly)

If helpful and consistent with the existing pattern, add a subtle affordance such as:

tooltip on hover over the number: View tasks

or a very subtle underline-on-hover only

Do not clutter the card.

6. Keep interaction model consistent with enterprise dashboard behavior

The desired behavior is similar to:

Jira dashboard metrics linking into filtered issue lists

ServiceNow summary cards linking into queue views

Azure DevOps widgets linking into filtered work views

This should create a clear dashboard → action pathway.

7. Do not change anything else

Do NOT change:

KPI labels

dashboard layout

non-KPI cards

workflow progress logic

milestone styling

funding widgets

8. Outcome goal

The KPI cards should now:

visually align with the Task Status Focus system through color

provide a clear interactive path into the Tasks page

feel connected to the task grid rather than isolated summary widgets

The result should be a stronger operational workflow:
Dashboard insight → click metric → filtered task list
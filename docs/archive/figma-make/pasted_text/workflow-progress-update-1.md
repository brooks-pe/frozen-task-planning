Refine Workflow Progress (Column Clarity + Correct Counts)

Update the Workflow Progress widget on the Task Planning Dashboard.

This is a targeted refinement. Do NOT change layout structure, stage names, or overall card composition.

1. Keep the existing bar logic (DO NOT CHANGE)

Bars represent cumulative progression

Percentage = % of tasks that have reached or passed that workflow state

Maintain current funnel shape and styling

2. Update right-side numbers to represent “tasks in this state”

Replace the current right-side values.

They should now represent:

Number of tasks currently in that workflow state (active workload)

Example (based on your dataset):

Draft → 4

BOE Build-Up → 8

Activity Acceptance → 6

Project Acceptance → 5

Project Allocation → 3

Impact Assessment → 7

Project Approval → 4

Program Approval → 6

Baselined → 13

These values:

Should reflect actual distribution of tasks across workflow states

Must NOT be derived from cumulative percentages

Should feel consistent with real system behavior

3. Introduce lightweight column headers

Add a subtle header row above the chart to clarify meaning.

Structure:

Left (above labels):
Workflow State

Center (above bars):
Completed (or alternative below)

Right (above counts):
In State

Alternative label options (Claude may choose best fit):

For center:

Completed

Progress

Through Stage

For right:

In State

Active

Current

👉 Prefer short labels (1–2 words max)
👉 Do NOT introduce long phrases inline

4. Add tooltip support for clarity (important)

Since labels are intentionally short, add tooltips:

“Completed” (center / bars)

Percentage of tasks that have reached this workflow state or beyond.

“In State” (right column)

Number of tasks currently in this workflow state.

Tooltips should:

Follow existing dashboard tooltip pattern

Appear on hover of header labels or info icons

Be concise (1 sentence)

5. Alignment and layout expectations

Column headers must align with:

Left: workflow labels

Center: bars

Right: numeric counts

Maintain clean spacing between:

labels

bars

counts

Ensure rows remain highly scannable

6. Preserve visual hierarchy

Bars remain the primary visual

Right-side numbers are secondary but readable

Column headers should be:

subtle (muted color)

smaller than section title

consistent with table column header styling

7. Do NOT

Do NOT revert to “remaining tasks” model

Do NOT remove percentages

Do NOT add heavy gridlines or table borders

Do NOT rename workflow states

Do NOT introduce new workflow stages

🎯 Outcome

The widget should now clearly communicate:

Progression (bars) → how far tasks have moved through the workflow

Current distribution (counts) → where work is actively sitting

This should feel similar to:

Jira workflow column counts + cumulative flow

Azure DevOps pipeline stage distribution
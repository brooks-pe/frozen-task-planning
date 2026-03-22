Update Workflow Progress to Show Current Tasks in State

Update the Workflow Progress component on the Task Planning Dashboard.

This is a targeted data logic + interaction refinement. Do not redesign the component layout.

1. Change the right column to show current tasks in state

Replace the current right-column values so they represent:

The number of tasks currently in that workflow state

This means:

If the user clicks into that workflow state in the Tasks grid, the row count should match the number shown in this right column

These numbers must reflect the same source-of-truth dataset used by the Tasks grid

2. Rename the right column header

Change the right-column header from Remaining to a clearer label.

Preferred option:

Current

Acceptable alternative if needed for clarity:

In State

Tasks in State

Choose the shortest label that still reads cleanly in the layout.

3. Make the right-column numbers clickable

Each number in the right column should become a clickable link.

Examples:

Draft → 4

BOE Build-Up → 4

Activity Acceptance → 9

Requirements:

Use standard accent blue link styling

Add a decent-sized hitbox around the number, not just the numeral itself

Add a subtle hover background to show the interactive area

Keep the interaction lightweight and consistent with the KPI number click behavior

Do not make the whole row clickable

4. Clicking the right-column number should navigate to filtered Tasks grid

When the user clicks the number in the right column:

Navigate to Task Planning → Tasks

Apply Workflow State = selected state

This should show all tasks currently in that workflow state.

The filtered row count in the Tasks grid should match the number shown in the chart.

5. Update Completed percentages to match source-of-truth data

Because the right column now represents tasks currently in state, the Completed percentages must also be corrected to stay logically consistent.

Important example:

Draft should no longer be 100%

If there are still 4 tasks currently in Draft, then Draft is not fully complete

Update all percentages so they correctly reflect:

the percentage of tasks that have completed each workflow state

These values must be consistent with the canonical task dataset used in the Tasks grid.

6. Update tooltips to match the new model

Revise tooltip copy accordingly.

A. Widget header tooltip — Workflow Progress

Replace with:

Completed shows the percentage of tasks that have finished each workflow state. Current shows how many tasks are currently in each state.

B. Completed column tooltip

Replace with:

Percentage of tasks that have completed this workflow state.

C. Right-column tooltip

If column header is Current, use:

Number of tasks currently in this workflow state.

If column header is In State or Tasks in State, adjust wording to match naturally but keep the same meaning.

7. Preserve layout and styling

Keep:

current bar styling

subtle gradient / polish

rounded bar shape

percentage labels inside bars

link styling on workflow state labels

general spacing and component structure

Do not:

redesign the chart

add new rows

add legends

add badges inside the chart

8. Ensure full consistency with Tasks grid source of truth

The Workflow Progress component should now align with the canonical Tasks dataset:

workflow state label click → filtered Tasks grid

current count click → filtered Tasks grid

filtered row counts should match

completed percentages should be mathematically and logically consistent with the same data

9. Outcome goal

The chart should now communicate two clean ideas:

Completed → how much of each workflow state has been finished

Current → how much work is currently sitting in that state

This should feel:

more trustworthy

easier to validate

more actionable
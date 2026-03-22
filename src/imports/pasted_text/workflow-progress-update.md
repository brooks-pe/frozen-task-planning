Convert Right-Side Counts to “Remaining Tasks”

Update the Workflow Progress widget on the Task Planning Dashboard.

This is a targeted refinement. Do NOT change layout, spacing, stage names, or bar behavior.

1. Keep the existing bar logic (DO NOT CHANGE)

Bars represent cumulative progression

Percent = % of tasks that have reached or passed each stage

Funnel shape remains exactly as-is

2. Change the right-side numbers to “remaining tasks”

Update the numbers on the right side of each row to represent:

Number of tasks that have NOT yet reached that stage

This should behave as a countdown to zero as you move down the workflow.

3. Correct logic for each stage

Given:

Total tasks = 56

The right-side values should be:

Draft → 0 (all tasks have passed Draft)

BOE Build-Up → 4 (56 - 52)

Activity Acceptance → 12 (56 - 44)

Project Acceptance → 18

Project Allocation → 23

Impact Assessment → 26

Project Approval → 33

Program Approval → 37

Baselined → 43

These values must:

Be mathematically consistent with the percentages

Decrease in progression completeness, but increase in remaining work

4. Label clarity (important but subtle)

Add a small visual cue so users understand what the number represents:

Either:

Add a tooltip on hover:
“Tasks remaining to reach this stage”

Or:

Slightly mute the number and optionally add a small label (e.g., “remaining”)

Do NOT add heavy labels or clutter the UI.

5. Preserve visual hierarchy

Right-side numbers should:

Be readable but secondary to the bars

Not compete with percentage labels

Maintain alignment and spacing consistency across rows

6. Do NOT

Do NOT revert to “current tasks in stage”

Do NOT remove the right-side numbers

Do NOT add extra columns or legends

Do NOT change stage names or order

🎯 Outcome

The widget should now clearly communicate:

Progression funnel (bars) → how far tasks have advanced

Remaining workload (counts) → how much is left at each stage

This should feel similar to:

Azure DevOps pipeline backlog signals

Jira workflow progression + backlog awareness combined
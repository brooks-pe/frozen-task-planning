Fix Workflow Progress Metrics + Label Alignment

Update the Workflow Progress widget on the Task Planning Dashboard.

Do not change the overall card layout, stage names, spacing structure, or surrounding dashboard components. This is a targeted refinement to improve metric accuracy and readability.

1. Correct the right-side numbers

The widget is now using a cumulative pipeline progression model.

That means:

The bar length = percent of tasks that have reached or passed that workflow state

The right-side number should also align to that same logic, or be removed/reworked so it does not contradict the bar

The current implementation is incorrect because it still shows values that look like “tasks currently in this stage,” which creates contradictions such as:

Draft = 100%

right-side count = 4

That is not logically valid in the current visualization model.

2. Replace the right-side counts with cumulative counts

For each workflow state, the number on the right should represent the count of tasks that have reached or passed that stage, matching the bar.

Using the current 56-task planning cycle example, the right-side counts should align to the cumulative percentages and decrease down the funnel.

Example expectation:

Draft = 56

BOE Build-Up = 52

Activity Acceptance = 44

Project Acceptance = 38

Project Allocation = 33

Impact Assessment = 30

Project Approval = 23

Program Approval = 19

Baselined = 13

Use values that correctly correspond to the displayed percentages and total task count.

3. Left-align the percentage labels inside the bars

Currently the percentages are centered within each bar.

Update them so the percentage labels are:

positioned inside the filled portion of the bar

left-aligned

consistently inset from the left edge

vertically centered within the bar

This should make the chart easier to scan from top to bottom.

4. Preserve enterprise readability

Maintain:

current bar styling

current funnel shape

current typography hierarchy

current card proportions

Do not make this feel decorative or experimental.

5. Optional small polish if needed

If necessary for clarity, Claude may:

slightly refine spacing between bar label, bar, and right-side count

subtly improve contrast of the percentage text inside shorter bars

ensure alignment feels clean and consistent across all rows

Do not:

rename stages

redesign the widget

add legends or helper text unless absolutely necessary

revert back to a stage distribution model

Goal: the widget should clearly read as a workflow pipeline progression chart, with internally consistent metrics and easier left-to-right scanning.
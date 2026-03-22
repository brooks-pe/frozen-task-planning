Final Workflow Progress Corrections

Update the Workflow Progress widget on the Task Planning Dashboard.

This is a targeted correction pass. Do not change the overall layout, spacing structure, stage names, or bar styling beyond what is required below.

1. Correct the ACTIVE counts on the right

The current right-side numbers are still logically incorrect.

Required logic

The Progress % represents how many tasks have successfully completed that workflow state

The Active count represents how many tasks are currently sitting in that workflow state and have not yet completed it

Because of that:

If Draft = 100% complete, then 0 tasks should currently be in Draft

A task cannot be both:

counted as having completed a state

and still be active in that same state

Fix this specifically

The Draft row must show:

100%

0 Active

Apply this logic consistently to all workflow states.

Important

The Active values should reflect current in-state distribution, not remaining-to-reach counts, and not cumulative counts.

2. Update tooltip copy to reflect the correct logic

Revise the tooltip language so it matches the intended model exactly.

A. Widget header tooltip — “Workflow Progress”

Replace current text with:

Shows how tasks are progressing through the planning workflow. Percentages reflect tasks that have completed each workflow state, while Active counts show tasks currently sitting in that state.

B. Progress column tooltip

Replace current text with:

Percentage of tasks that have successfully completed this workflow state.

C. Active column tooltip

Replace current text with:

Number of tasks currently sitting in this workflow state and not yet completed it.

3. Update all tooltip icons to accent blue

All tooltip / info icons in this widget should use the same accent blue already used elsewhere in the app for info icons.

Apply to:

Workflow Progress header info icon

Progress column info icon

Active column info icon

Requirements

Use the standard SyncPoint accent blue

Keep icon size and spacing unchanged unless a small adjustment is needed for alignment

Do not invent a new icon style

4. Preserve current column structure

Keep the current lightweight header structure:

Workflow State

Progress

Active

This structure is working well and should remain.

5. Preserve enterprise clarity

Do not:

add more helper text inline

add legends

add decorative styling

rename columns unless absolutely necessary

This should remain clean, compact, and operational.

6. Outcome goal

The widget should now clearly communicate:

Progress = tasks that have completed each workflow state

Active = tasks currently sitting in that workflow state

Tooltip language and counts should fully align with that logic

Draft should no longer show an impossible active value when progress is 100%
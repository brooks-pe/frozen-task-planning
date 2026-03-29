Add Status Focus Indicators to Task ID Column

Update the Tasks List table on the Task Planning → Tasks page.

This is a scoped enhancement to visually indicate when a task belongs to one of the Task Status Focus categories.

Do not redesign the table or add a new standalone column.

1. Add a compact status indicator to the Task ID cell

Append a single color-coded status dot to the end of the Task ID for tasks that match a Task Status Focus condition.

The dot should:

appear inline with the Task ID link

sit to the right of the Task ID with a small amount of spacing

be clearly visible but compact

feel intentional and minimal, not decorative

2. Use a minimalist dot pattern, not a full badge

Use a medium-sized circular dot indicator rather than a text badge.

Requirements:

small but noticeable

vertically aligned with the Task ID text

should not cause the Task ID column to become much wider

should not visually overpower the link

Do not:

add long inline status labels

add pill badges

add multiple icons per row

3. Tooltip behavior

On hover over the dot, show a tooltip with the corresponding Task Status Focus value.

Use these tooltip labels exactly:

Awaiting My Action

Stalled Tasks

Near Deadline

Overdue

Tooltip should:

use the existing dashboard / app tooltip style

be concise

appear on hover

not require extra helper text inline

4. Color-code the status indicators

Assign a distinct color to each Task Status Focus type so these can later align with the dashboard KPI card system.

Use clean, enterprise-appropriate colors with good contrast, not neon or overly saturated colors.

Recommended mapping:

Awaiting My Action → blue

Stalled Tasks → amber / yellow

Near Deadline → orange

Overdue → red

These colors should feel compatible with the SyncPoint palette and suitable for future reuse across the dashboard.

5. Only show indicators for matching tasks

Do not show a dot for every task.

Only display the indicator when a task belongs to one of the Task Status Focus conditions.

Tasks without one of these conditions should show only the Task ID with no dot.

6. Add at least one example of each status in the table

Update the sample table data so that the visible rows include at least one example of each:

Awaiting My Action

Stalled Tasks

Near Deadline

Overdue

Keep the dataset realistic:

do not make too many rows flagged

distribute them naturally

avoid making every task look exceptional

7. Preserve table layout quality

Ensure the Task ID column still reads cleanly:

Task ID remains the primary text

dot is secondary

no row height changes

no awkward wrapping caused by the indicator

8. Do not change anything else

Do NOT change:

existing columns

sort behavior

button styling

filter layout

financial values

workflow state ordering

9. Outcome goal

The table should now provide a lightweight visual cue that certain tasks have a Task Status Focus condition, while staying compact and readable.

This should feel similar to how enterprise tools use small severity/status indicators in dense grids:

meaningful

scannable

unobtrusive
Align Recent Task Updates with Tasks Grid Source of Truth

Update the Recent Task Updates table on the Task Planning Dashboard so it is fully aligned with the Tasks Grid as the source of truth.

This is a data consistency + table parity refinement. Do not redesign the table layout.

1. Use the Tasks Grid dataset as the source of truth

The 10 rows shown in Recent Task Updates should come from the same canonical task dataset used by the Tasks Grid.

Requirements:

Do not use a separate fictional task list for Recent Task Updates

The Task IDs, titles, workflow states, and other task details shown here should match tasks that also exist in the Tasks Grid

This table should feel like a “recently updated slice” of the full Tasks Grid dataset

2. Keep the table scoped to recent updates

Preserve the purpose of the table:

it should still represent the most recently updated tasks

continue sorting by Updated On descending

keep 10 rows visible

So the rows should be:

real tasks from the Tasks Grid dataset

specifically the 10 most recently updated tasks for the selected time range

3. Carry over Task Status Focus indicators into Task ID cells

If a task shown in Recent Task Updates has a Task Status Focus condition, display the same status indicator next to the Task ID that is used in the Tasks Grid.

Requirements:

use the same color-coded dot treatment

use the same sizing, spacing, and hover behavior

use the same tooltip behavior and labels

do not invent a different pattern here

This should create visual consistency between:

Tasks Grid

Recent Task Updates

4. Only show indicators where applicable

Do not show a dot for every task.

Only show the status indicator for tasks that have one of the Task Status Focus conditions:

Awaiting My Action

Stalled Tasks

Near Deadline

Overdue

Tasks without one of these conditions should display only the Task ID.

5. Preserve current table layout and styling

Do not change:

header layout

search bar

View All Tasks link

time range filters

column structure

overall card styling

This is a data and row-level parity update, not a table redesign.

6. Preserve realism and consistency across views

Ensure the task data remains internally consistent across:

Dashboard KPI cards

Recent Task Updates

Tasks Grid

If a task appears in both tables, its:

Task ID

Title

Workflow State

Task Status Focus indicator
should all match.

7. Outcome goal

The Recent Task Updates table should now feel like:

a true “recent activity” view into the same task system

not a separate mock table

Users should be able to recognize the same tasks across the dashboard and task grid, with consistent status signaling and no conflicting data.
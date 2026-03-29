Add “Task Status Focus” Filter to Tasks Page

Update the Task Planning → Tasks page to add a new filter that connects the Tasks grid to the key operational conditions surfaced on the Dashboard.

This is a scoped enhancement. Do not redesign the page or change the existing page header, table styling, or filter panel pattern.

1. Add a new filter to the Filters section

Add a new dropdown filter called:

Task Status Focus

This filter should follow the same visual and interaction pattern as the other filters on the page:

label above control

standard dropdown styling

aligned with the existing filter row

wraps responsively with the rest of the filters as needed

2. Include these filter options

Add the following options:

All

Awaiting My Action

Stalled Tasks

Near Deadline

Overdue

3. Keep “Awaiting My Action” included

Even though the other three options are time-based, Awaiting My Action should still be included in this filter.

Treat this filter as a focus / quick-filter lens for operational conditions, not as a strict data taxonomy field.

4. Optional grouping (only if supported cleanly)

If the dropdown component supports grouped options cleanly without adding visual clutter, organize them like this:

My Work

Awaiting My Action

Time-Based

Stalled Tasks

Near Deadline

Overdue

If grouping adds complexity or visual inconsistency, use a flat list instead.

5. Behavioral intent

This filter should conceptually map to the same logic as the dashboard KPI cards:

Awaiting My Action

tasks requiring the current user’s review, approval, or action

Stalled Tasks

tasks with no workflow progress or updates within the defined inactivity threshold

Near Deadline

tasks approaching key planning or milestone deadlines within the defined time window

Overdue

tasks that have passed their planned milestone or completion date without progressing

Do not add helper text inline. The filter label and option names should be sufficient.

6. Placement in filter order

Place Task Status Focus near the front of the filter set so it reads as a high-value operational filter.

Recommended order:

Planning Year

Workflow State

Task Status Focus

Project

Funding Status

Executing Activity

Adjust as needed to fit the existing layout cleanly, but keep it toward the front rather than burying it at the end.

7. Preserve layout quality

After adding the filter:

maintain the compact SyncPoint filter layout

keep fields aligned and evenly spaced

ensure controls remain properly sized

preserve responsive wrapping behavior

avoid awkward gaps

8. Do not change anything else

Do not change:

existing table columns

sort behavior

button styling

page header

other existing filters unless needed only to reflow layout cleanly

9. Outcome goal

The Tasks page should now include a filter that lets users quickly narrow the grid to the same operational conditions highlighted on the Dashboard, creating a stronger connection between dashboard awareness and task-level action.
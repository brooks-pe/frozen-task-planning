Update Baselined Completion Logic + Rename Page + Fix Tooltip Clipping

Update the Task Planning Dashboard with the following refinements.

This is a targeted behavior + polish pass. Do not redesign the page.

1. Update Workflow Progress logic for the Baselined end state

The Baselined row is a special exception in the Workflow Progress chart.

Required behavior

Baselined is the final workflow state

Any task currently in Baselined should also be considered complete

Therefore, the Completed percentage for Baselined should include the tasks currently sitting in Baselined

This is different from all other workflow states, where:

a task is only considered complete for that state once it moves past that state

Important

Do not change the logic for the other workflow states.

Only adjust the Baselined row so that:

the tasks currently in Baselined count toward Completed

the Baselined completion bar reflects that end-state behavior correctly

This means:

if there are 3 tasks currently in Baselined

and Baselined is the terminal state

then those 3 tasks should count as completed for Baselined

Preserve

current click behavior

current Current column behavior

current link styling

current chart layout

2. Rename the page title from “Dashboard” to “Task Planning”

On this page, update the main page title:

Dashboard → Task Planning

Keep the rest of the page header pattern intact:

subtitle remains

breadcrumbs remain unless they need to update naturally for consistency

spacing and typography stay the same

Intent

The page itself is the Task Planning landing page, so the title should reflect the module name rather than a generic Dashboard label.

3. Fix tooltip clipping on Recent Task Updates

The tooltip for the Recent Task Updates section is currently being clipped by its table/container and does not render cleanly outside the component bounds.

Required fix

Ensure the tooltip:

renders above surrounding containers

is not clipped by the table/card boundary

can extend outside the table header region as needed

remains fully visible

Implementation intent

This likely means the tooltip needs to render in a layer/portal or otherwise escape the overflow/clipping context of the table container.

Preserve

current tooltip styling

current tooltip copy

current icon placement

current hover behavior

Do not redesign the tooltip — only fix the rendering/clipping issue.

4. Do not change anything else

Do NOT change:

KPI card layout

workflow state link behavior

current count click behavior

recent task table layout

filters

task grid behavior

milestone card styling

5. Outcome goal

After this update:

Baselined behaves correctly as a terminal completed state

the page title accurately reflects the module landing page

Recent Task Updates tooltips render cleanly and are no longer clipped
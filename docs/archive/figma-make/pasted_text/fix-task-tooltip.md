Fix Recent Task Updates Tooltip Without Affecting Table Layout

Update the Recent Task Updates tooltip implementation on the Task Planning dashboard.

This is a targeted bug fix. The previous tooltip clipping fix appears to have affected the table/card layout. Fix the tooltip rendering without changing the layout or structure of the table.

1. Restore the Recent Task Updates table/card layout

The Recent Task Updates section should render exactly like it did before the tooltip fix:

normal card height

normal table body height

normal header row layout

normal spacing between:

title

info icon

search bar

time filters

View All Tasks link

Do not allow the tooltip implementation to collapse, compress, or otherwise affect the table container.

2. Fix tooltip clipping using a non-layout-breaking approach

The tooltip should:

render above surrounding content

not be clipped by the table/card container

not affect the size, flow, or dimensions of the header or table

Preferred implementation approach:

render tooltip in a portal / overlay layer / floating layer

or otherwise escape the clipping context without restructuring the card

Important:

do not solve this by changing the table/card layout itself

do not wrap the header in a way that changes its dimensions

do not alter the table body height

3. Preserve the existing tooltip behavior and style

Keep:

current tooltip text

current icon placement

current dark tooltip styling

hover behavior

Only fix:

rendering layer

clipping behavior

unintended layout side effects

4. Preserve container behavior

Do not change the Recent Task Updates component’s:

width

height

borders

header alignment

table row rendering

overflow behavior unless strictly necessary for tooltip rendering

If overflow must be changed, do it in the smallest possible scope and do not let it affect the table layout.

5. Do not change anything else

Do NOT change:

dashboard title

workflow progress chart

KPI cards

table columns

recent task data

search bar width

time filter controls

6. Outcome goal

After this update:

the Recent Task Updates table looks normal again

the tooltip is fully visible outside the container

the tooltip fix does not alter layout, sizing, or table rendering
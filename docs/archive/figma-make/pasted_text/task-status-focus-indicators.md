Improve Task Status Focus Indicators for Visibility and Hover Usability

Update the Task Status Focus indicators in the Task ID column on the Task Planning → Tasks page.

This is a targeted usability refinement. Do not redesign the table or replace the status indicator pattern with badges.

1. Keep the current dot-based indicator pattern

Retain the current approach of showing a single color-coded circular indicator appended to the Task ID for tasks with a Task Status Focus condition.

Do not replace the indicator with:

text labels

pill badges

multiple icons

a new standalone status column

The dot-based pattern is correct and should remain the core solution.

2. Increase visibility slightly

Refine the indicator so it is easier to notice and easier to distinguish by color.

Update the indicator to be:

slightly larger than it is now

more visually clear in dense table rows

still compact enough to avoid adding noise

The goal is to make it more legible without making it feel decorative or oversized.

3. Increase the hover / hit area

The current indicator is too small to hover comfortably.

Increase the interactive hitbox around the indicator so it is easier to trigger the tooltip.

Important:

the visible dot can remain relatively compact

the hover target should be larger than the visible dot

do not make the visual indicator itself excessively large just to solve hoverability

This should improve usability without making the table feel heavier.

4. Keep the minimalist visual style

Maintain a clean enterprise look:

no icon inside the dot

no heavy borders

no animation

no glow effects

The indicator should remain a secondary signal, not compete with:

Task ID

Workflow State

funding values

5. Preserve tooltip behavior

Keep the existing tooltip behavior:

tooltip appears on hover

tooltip identifies the Task Status Focus condition

uses existing dashboard/app tooltip styling

Do not add extra inline labels.

6. Improve color clarity slightly

Keep the current status-to-color mapping, but refine the colors if needed so they are easier to distinguish at small sizes.

Maintain the same conceptual mapping:

Awaiting My Action → blue

Stalled Tasks → amber / yellow

Near Deadline → orange

Overdue → red

Use slightly clearer / stronger tones only if necessary for legibility, while staying within the SyncPoint palette.

7. Preserve spacing and alignment

Ensure the indicator remains:

inline with the Task ID

vertically centered

separated by a small consistent gap

non-disruptive to column width or row height

8. Do not change anything else

Do not change:

table structure

sorting

data values

clone button styling

filters

workflow state ordering

9. Outcome goal

The Task Status Focus indicators should remain lightweight and minimal, but become:

easier to see

easier to hover

easier to interpret at a glance

This should feel like a refined enterprise table interaction, not a new visual feature.
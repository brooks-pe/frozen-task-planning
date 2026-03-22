Fix Tasks Page Filters Layout to Match Existing SyncPoint Pattern

Update the Filters section on the Task Planning → Tasks page.

This is a layout correction only for the filter panel. Do not redesign the page, change filter labels, or alter page header / table structure.

1. Replace the current filter layout with the standard SyncPoint filter pattern

The current filters are visually broken because each field is taking up too much horizontal space while the actual dropdown/input remains very small. The dropdown chevrons are pushed to the far right, creating large empty gaps.

Refactor this section to match the established filter behavior used on other SyncPoint pages:

Filters should be arranged left-to-right in a compact row

Each filter should have:

label above the control

properly sized input/dropdown beneath it

Controls should be content-sized / intentionally sized, not stretched across oversized grid cells

Filters should wrap responsively to the next line based on screen width

Spacing between filters should be consistent and compact

Dropdown chevrons must sit inside the dropdown control, aligned normally at the right edge of the control itself

2. Use intentional control widths

Apply practical widths similar to other filter bars in the app.

Suggested sizing approach:

Planning Year: narrow

Tier: narrow

Workflow State: medium

Project: medium

Funding Status: medium

Executing Activity: medium

Appropriation: narrow to medium

Requirement: medium

Risk: narrow

Do not make every filter the same width if that creates wasted space. Size them based on expected content, using the same logic as other SyncPoint filter panels.

3. Preserve the existing filter panel container

Keep:

the existing Filters card/container

header row with “Filters”

Hide Filters control

Reset Filters link

But align the internal filter controls to the standard enterprise filter layout pattern already used elsewhere in the product.

4. Align Reset Filters correctly

Keep Reset Filters visually associated with the filter controls

Place it in a way consistent with other filter sections in SyncPoint

It should not feel detached or pushed awkwardly to an isolated corner

5. Match existing filter section styling from other pages

Use the same visual conventions as the attached example and other existing HiFi pages:

compact horizontal flow

consistent field spacing

consistent label spacing

clean wrapping behavior

no oversized empty columns

6. Do not change the filter set

Keep these filters:

Planning Year

Tier

Workflow State

Project

Funding Status

Executing Activity

Appropriation

Requirement

Risk

Do not add or remove filters.

7. Outcome goal

The filter section should feel like a normal SyncPoint filter bar:

compact

aligned

responsive

intentional

enterprise-grade

It should look like the filters were built from the same system as the G-Invoicing / Execution Planning filters, not like a separate layout experiment.
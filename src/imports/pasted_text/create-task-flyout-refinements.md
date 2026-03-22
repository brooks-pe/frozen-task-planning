Refine Create Task Flyout (Radio, Dropdowns, Layout, Data Integrity, Requirement Lineage)

Update the Create Task side panel (flyout) in the Task Planning → Tasks page.

This is a targeted refinement pass. Do not redesign the panel. Only fix the issues described below.

1. Fix Radio Button Styling (Unselected State)

Current issue:

Unselected radio appears filled black, which looks disabled

Required fix:

Unselected radio should be:

White fill

Dark border (neutral / near-black)

Selected radio:

Filled with primary color (existing pattern)

Outcome:

Radios clearly appear interactive and selectable

No ambiguity with disabled state

2. Fix Dropdown Option Text Color

Current issue:

Dropdown options are rendered in gray, appearing disabled

Required fix:

All selectable dropdown options should use:

Standard body text color: #1c2024

Applies to:

Execution Statement dropdown

Funding Source dropdown

Executing Activity dropdown

Any other dropdowns in this panel

Outcome:

Options clearly appear active and selectable

Matches rest of application

3. Fix Period of Performance Field Alignment

Current issue:

Second date input extends too far right and breaks panel padding alignment

Required fix:

Ensure both date inputs:

Respect panel padding

Align with right edge of all other fields above

Maintain:

Equal spacing between start/end date inputs

Consistent width behavior

Outcome:

Clean right-edge alignment across entire form

No overflow or misalignment

4. Fix Execution Statement → Data Population
Current issues:

Project incorrectly populates with “PMS 420” (this is not a project)

Appropriation includes unnecessary extra codes

Required behavior:
Project

Populate with a valid project name

Example:

“Littoral Combat Ship Mission Modules”

“Unmanned Surface Vehicle Program”

Field should remain:

System-driven

Read-only style

Appropriation

Populate with a single valid appropriation

Remove extra codes/noise

Display as:

Standard color-coded badge (use existing badge component)

Example:

O&MN

RDT&E

SCN

Do NOT show multiple codes or appended identifiers

Outcome:

Data reflects real domain structure

Clean, scannable, and consistent with rest of app

5. Requirement Lineage Enhancements

Apply ONLY to the Requirement Lineage section

5.1 Add Tooltip to Info Icon

Attach tooltip to the info icon next to “Requirement Lineage”

Tooltip text:
Requirement Lineage links the task to a Program Initiative and L1 Requirement. This ensures alignment to program priorities and enables aggregation of planning, funding, and execution data across related tasks.

5.2 Auto-Populate Behavior

When BOTH conditions are met:

Non-CODB is selected

Execution Statement is selected

Then automatically populate:

Program Initiative

L1 Requirement

5.3 Field Styling

These fields must:

Be system-driven (read-only or disabled style)

Include helper text:

“Derived from Execution Statement”

5.4 Replace Placeholder Content with Realistic Data

Use domain-aligned values such as:

Example Set 1

Program Initiative:
MCM Mission Package Readiness

L1 Requirement:
Ensure deployment-ready MCM mission packages for surface and unmanned platforms

Example Set 2

Program Initiative:
Unmanned Surface Vehicle (USV) Capability Development

L1 Requirement:
Develop and integrate USV systems for mine countermeasures and maritime security operations

Example Set 3

Program Initiative:
Fleet Readiness and Sustainment

L1 Requirement:
Maintain operational availability of mission-critical systems through lifecycle support and logistics readiness

5.5 Behavior Constraints

Do NOT make these fields editable

Do NOT redesign layout

Only enhance:

Tooltip

Auto-population

Visual clarity

6. Preserve Everything Else

Do NOT change:

Panel structure

Field order

Button placement

Existing spacing system (except alignment fix)

Interaction patterns outside this scope

7. Outcome Goal

After this update:

Radios look interactive (not disabled)

Dropdowns clearly show selectable options

Form alignment is clean and consistent

Execution Statement drives correct, realistic data

Requirement Lineage feels:

Real

System-driven

Tied to program structure
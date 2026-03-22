Task: Improve Tier Field Layout — Prevent Wrapping by Stacking Badge and Action Link

Context

In the Task Summary section, the Tier field currently displays:

Tier status badge (e.g., “Not Assigned”)

“Assign Tier” link (inline)

Issue:

On smaller screen widths, these elements wrap unpredictably

This creates poor alignment and visual inconsistency within the grid

OBJECTIVE

Update the Tier field so that:

The badge and link are stacked vertically

Each element has its own line

Layout remains stable across all screen sizes

REQUIRED CHANGE
Current (Problematic)

Badge + link inline → wraps on smaller screens

Updated Behavior (Required)

Within the Tier field:

Place the status badge on the first line

Place the “Assign Tier” link directly below it

LAYOUT RULES

Use a vertical stack (column layout)

Align both elements left

Maintain consistent spacing between:

Badge and link (tight spacing, ~4–6px equivalent)

Do NOT center or right-align

VISUAL CONSISTENCY

Badge styling remains unchanged

Link styling remains unchanged

Typography remains unchanged

Spacing should match other multi-line metadata fields (if any)

RESPONSIVE BEHAVIOR

This stacked layout should apply at all screen sizes

Do NOT revert to inline layout on larger screens
(Consistency > conditional responsiveness)

DO NOT CHANGE

Field label (“Tier”)

Badge design or color

Link text or behavior

Task Summary grid structure

Any other fields

DESIGN PRINCIPLE

Prefer:
Deterministic layout > reactive wrapping

This ensures:

Predictable rendering

Clean alignment across rows

No layout degradation at smaller widths

OUTCOME

A stable Tier field where:

Badge and action are clearly separated

No wrapping occurs at any viewport size

Visual hierarchy is improved

Layout consistency is preserved across the Task Summary grid
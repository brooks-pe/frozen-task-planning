Tier “Not Assigned” Actionable State

We are enhancing the Tier field in the Task Summary section to support a “Not Assigned” actionable state.

Do NOT redesign the section.
Do NOT change layout, spacing, or grid structure.
This is a field-level enhancement only.

🎯 Objective

Replace the current “Not Assigned” plain text with a combined status + action pattern that:

Clearly communicates the missing Tier

Provides a direct way to initiate Tier Assessment

Maintains alignment within the existing grid

🔧 Required Changes
1. Replace Tier Value

Replace:

Not Assigned (plain text)

With:

Inline structure:
[ Not Assigned ]   Assign Tier
2. Status Chip (Left Element)

Text: Not Assigned

Style: badge/pill (same base pattern as existing badges)

Visual requirements:

Background: light warning/neutral tone (subtle, not red)

Text: standard dark text (not white)

No border required unless part of badge system

3. Inline Action (Right Element)

Text: Assign Tier

Style: text button / link style

Color: primary system blue

Slightly higher emphasis than normal body text

Optional:

Include subtle arrow (→) if consistent with system patterns

4. Layout Rules (CRITICAL)

Both elements must remain inline on a single row

Must fit within the existing Tier column

Must NOT:

Wrap to a second line

Expand the column width

Shift other columns

Alignment:

Align vertically with other field values in the row

Maintain standard spacing between chip and action (small gap)

📐 Grid Integrity (NON-NEGOTIABLE)

Do NOT modify:

Column widths

Row heights

Spacing system

Tier field must remain aligned with all other columns

⚠️ Do NOT

Do NOT turn this into a full button

Do NOT stack elements vertically

Do NOT add icons that change layout height

Do NOT change other fields in the section

Do NOT affect the banner (separate component)

✅ Success Criteria

Tier field shows:

“Not Assigned” as a badge

“Assign Tier” as an inline action

Layout remains perfectly aligned with other fields

No wrapping or layout shift occurs

Action is clearly visible but not visually dominant
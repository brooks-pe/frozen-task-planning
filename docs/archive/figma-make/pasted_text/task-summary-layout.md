Task Summary Section (Accurate Layout Correction)

We are refining the existing Task Summary section to match the attached design exactly.

This is a layout correction, not a redesign.
Follow the structure and visual hierarchy from the reference precisely.

🎯 Core Requirement

The section must follow this hierarchy:

Neutral section container → row-based bands → aligned field grid → independent Edit button

📐 1. Section Container (IMPORTANT)

Use standard section container styling

Background: light neutral gray (NOT white)

Include:

Section title: Task Summary

Right-aligned control: “Hide Task Summary”

Divider line under header

❗ Critical Rule:

The section itself is NOT white.
Only inner rows use lighter contrast.

📊 2. Row-Based Layout (PRIMARY STRUCTURE)

The content must be organized into 3 horizontal rows:

Each row:

Full width

Has its own subtle background band

Uses consistent padding

No borders between individual fields

Row Background Behavior:

Slight contrast against section background

All rows use same style (or very subtle alternation)

Flat, not card-like

🧱 3. Grid System (NON-NEGOTIABLE)

Each row must use a fixed 5-column grid

Rules:

Same column widths across ALL rows

Fields must vertically align across rows

NO auto-width behavior

NO shifting based on content length

📋 4. Row Content (Match Exactly)
🔹 Row 1 — Task Context

Execution Statement → Maritime ISR Modernization Program

Executing Activity → PMS 420

Appropriation → O&MN (badge)

Tier → Not Assigned

Planning Year → FY2026

🔹 Row 2 — Financial + Timing

Requested → $1,250,000

Allocated → $0

Gap → $1,250,000

Funding Source → Not Yet Funded

Period of Performance → Not Yet Defined

🔹 Row 3 — Ownership + Status

Project Lead → Sarah Mitchell

Activity Lead → James O’Connor

Operational Status → Draft (badge)

Previous Task → Not Yet Linked

Next Task → Not Yet Created

🧩 5. Field Formatting

Each field uses standard pattern:

Label (top)

Small, muted

Value (below)

Standard body text or badge

No icons. No cards. No extra decoration.

🔘 6. Edit Button (CRITICAL FIX)
Problem to Avoid:

Button must NOT affect grid alignment.

Required Behavior:

Edit button is NOT part of the grid

It must be:

Right-aligned within the section

Vertically aligned with the third row

Use absolute positioning OR separate container

Hard Rule:

Column alignment must remain identical whether the button exists or not

⚠️ DO NOT

Do NOT make section background white

Do NOT collapse into a single container

Do NOT use flexible row layouts

Do NOT allow content to shift columns

Do NOT attach button to grid flow

✅ Success Criteria

Section background = neutral gray (matches page)

Three distinct horizontal rows with subtle banding

Perfect vertical column alignment across all rows

Edit button floats independently on the right

Layout visually matches the attached design
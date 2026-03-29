Task Summary Section (Refinement Pass)

We are updating the Task Summary section in the Task Workspace for TSK-0501.

Use the attached design as the primary visual reference.
Do not redesign. Do not reinterpret. Match the structure and layout exactly.

🎯 Objective

Refactor the existing Task Summary section to:

Match the row-based grouped layout shown in the reference

Improve scanability via row banding

Maintain strict adherence to SyncPoint design system patterns

📐 Section Structure
1. Section Container

Follow the existing section pattern (same as Filters):

Title: Task Summary

Right-aligned control: “Hide Task Summary”

Divider line under header

Standard section padding and container styling

2. Content Layout (CRITICAL)

Replace current layout with a 3-row structured grid

Each row:

Full-width container

Subtle background (row banding)

Consistent padding

No borders between fields

3. Row Definitions
🔹 Row 1 — Task Context

Fields (left → right):

Execution Statement → Maritime ISR Modernization Program

Executing Activity → PMS 420

Appropriation → O&MN (use existing badge style)

Tier → Not Assigned (plain text for now)

Planning Year → FY2026

🔹 Row 2 — Financial + Timing

Fields:

Requested → $1,250,000

Allocated → $0

Gap → $1,250,000

Funding Source → Not Yet Funded

Period of Performance → Not Yet Defined

🔹 Row 3 — Ownership + Status

Fields:

Project Lead → Sarah Mitchell

Activity Lead → James O’Connor

Operational Status → Draft (use existing status badge)

Previous Task → Not Yet Linked

Next Task → Not Yet Created

4. Field Presentation Rules

Each field must follow standard system pattern:

Label (top)

Small, muted

Value (below)

Standard body text

Vertical stacking within each field

DO NOT:

Add cards

Add icons

Add extra borders

Change typography scale

5. Row Styling (IMPORTANT)

Apply alternating or subtle row background styling (as shown in reference)

Keep it very light (low contrast)

Maintain clean, flat enterprise aesthetic

6. Edit Button

Place Edit button bottom-right of section

Use standard secondary button styling

Do not change behavior

⚠️ Constraints

Do NOT redesign layout structure

Do NOT introduce new components

Do NOT change spacing system globally

Do NOT over-style (keep it clean and system-aligned)

📌 Data Accuracy

Use TSK-0501 — Coastal Surveillance Radar Modernization data only
Do not reuse data from other mockups

✅ Success Criteria

Section visually matches reference layout

Rows are clearly separated and scannable

Fields are aligned consistently across rows

No regression in system consistency
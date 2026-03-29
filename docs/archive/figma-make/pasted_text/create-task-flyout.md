Implement Create Task Side Panel (Flyout) — High-Fidelity

Implement a Create Task side panel (flyout) for the Task Planning → Tasks page.

This is a net-new interaction pattern for SyncPoint, but it must align with existing design system components, spacing, and interaction patterns already used across the application.

1. Trigger Behavior

The “Create Task” button (top right of Tasks page) should:

Open a right-side flyout panel

Slide in from the right

Overlay the page content

Dim the background slightly (subtle overlay)

The panel should:

Have a fixed width (~420–480px)

Be full height

Not shift the underlying layout

2. Panel Structure

The panel has three main sections:

A. Header (fixed)

Title: Create Task

Optional short helper text:
“Initialize a new task header for the current planning cycle.”

Include:

Close (X) icon (top right)

B. Body (scrollable)

Vertical form layout

Clean spacing between fields

Consistent field grouping

C. Footer (sticky)

Always visible at bottom

Contains:

Cancel (secondary)

Create Task (primary)

3. Form Structure (STRICT — DO NOT CHANGE ORDER)

Task Type (radio group)

CODB (default)

Non-CODB

Task Title (text input)

Execution Statement (dropdown)

Project (system-driven, read-only)

Appropriation (system-driven, read-only)

Funding Source (dropdown)

Executing Activity (dropdown)

Planning Year (dropdown, default FY2026)

Period of Performance (date range)

Requirement Lineage (conditional section)

4. Field Logic (CRITICAL — MUST IMPLEMENT)
Execution Statement dependency

When selected:

Automatically populate:

Project

Appropriation

These fields must:

Appear read-only / system-driven

Use:

muted background OR disabled input styling

Include helper text:
“Driven by Execution Statement”

Executing Activity dependency

Disabled until Execution Statement is selected

Placeholder:
“Select an Execution Statement first…”

Once enabled:

Shows selectable options

Includes:
“+ Create New Activity”

CODB vs Non-CODB behavior

Default = CODB

If CODB:

Hide Requirement Lineage section completely

If Non-CODB:

Show Requirement Lineage section

This must:

Appear/disappear cleanly

Not break spacing or layout

Funding Source

Use realistic funding labels:

Example:

“BLI 0956/RU00187 – sUSV 2 (FY2025)”

Do NOT use:

Reimbursable

Direct Cite

5. Visual Design (HIGH FIDELITY)
Panel

Clean white surface

Subtle shadow separating from page

Smooth slide-in animation

Form Fields

Use existing SyncPoint input patterns:

Dropdowns

Text inputs

Radio buttons

Date pickers

Do NOT introduce new component styles.

System-Driven Fields (Project, Appropriation)

Visually distinct:

Slightly muted background OR disabled state

Still readable

Include helper text below field

Disabled Fields

Clearly non-interactive

Maintain readability (do not overly fade)

Conditional Section (Requirement Lineage)

Include subtle section label

Maintain spacing consistency when toggled

No layout jumpiness

Typography

Follow existing system:

Labels: standard form label styling

Helper text: smaller, muted

Section labels: slightly emphasized

Buttons

Create Task = primary

Cancel = secondary

Right-aligned in footer

Consistent spacing

6. Behavior Expectations

Panel is scrollable if content exceeds height

Footer remains fixed

Background page is not scrollable while open

Clicking outside OR pressing X closes panel

7. Data / UX Intent

This panel is:

A lightweight intake form

Not a full configuration experience

Not a wizard

After submission:

Task is created in Draft

Task ID is assigned

Further work happens in Task Workspace

Include subtle helper text near footer:
“The new task will be assigned the next available Task ID and created in Draft status.”

8. DO NOT

Do NOT redesign field order

Do NOT add new fields

Do NOT introduce multi-step flows

Do NOT make Project/Appropriation editable

Do NOT over-style with heavy borders or colors

9. Outcome Goal

The result should feel like:

Jira “Create Issue”

Azure DevOps “New Work Item”

Specifically:

Fast

Structured

Low-friction

Enterprise-grade
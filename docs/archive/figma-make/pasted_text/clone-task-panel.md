Task: Design "Clone Task" side panel (flyout) for Task Planning module

Context:
We are creating a high-fidelity Clone Task side panel in the SyncPoint Task Planning module.

This panel must match the existing Create Task panel in:
- width
- spacing
- typography
- layout structure
- footer behavior

However, Clone Task is a different workflow:
- It starts from an existing task
- It allows selective carry-forward of data
- It is a copy + adjust flow, not a full creation flow

Load Guidelines:
- panels.md
- forms.md
- components.md
- visual-system.md

Complexity Constraint:
Moderate UI build.
Do not introduce new layout patterns or redesign the panel structure.
Reuse existing panel and form patterns.

Processing Constraint:
Do not refactor Create Task.
This is a new panel that mirrors its structure but with different content.

---

Implementation Approach:
Build a right-side flyout panel using the same structure as Create Task, with clearly separated sections for:
- read-only source data
- editable fields
- copy-forward controls

---

Panel Structure (top to bottom):

1. Header:
- Title: "Clone Task"
- Description (helper text under title):
  "Create a new task using an existing task as a starting point. You can adjust key details and choose which data to carry forward."

---

2. Source Task (read-only summary card):
- Display as a visually distinct card/container
- Content:
  - Task ID + Title
  - Executing Activity
  - Appropriation
  - Tier (read-only)
- Styling:
  - Slight visual separation from form inputs (subtle background or border)
  - No editable controls
- Purpose:
  - Clearly communicate this is reference-only

---

3. Clone Mode (dropdown field):
- Label: "Clone Mode"
- Options:
  - "Clone within current planning year"
  - "Create follow-on task for future year"
- Standard dropdown styling (match Create Task inputs)

---

4. New Task Title (text input):
- Label: "New Task Title"
- Pre-filled with source task title
- Fully editable

---

5. Planning Year (dropdown):
- Label: "Planning Year"
- Default to current planning year
- Standard dropdown styling

---

6. Period of Performance (date range):
- Label: "Period of Performance"
- Two date inputs (start and end)
- Not pre-filled

---

7. Copy Forward Content (checkbox group):
- Label: "Copy Forward Content"
- Group checkboxes vertically with clear spacing

Options:
- Task Header Information (checked by default)
- Subtasks (unchecked)
- BOE Summary (checked)
- Tier 2 Labor Lines (checked)
- Deliverables (checked)
- Risk Entries (checked)

- Use standard checkbox components
- Ensure strong label readability and clean vertical alignment

---

8. Clone Notes (textarea):
- Label: "Clone Notes"
- Placeholder:
  "Add notes about how this clone should differ from the original task…"
- Optional field

---

9. Footer:
- Left: Cancel (secondary)
- Right: "Create Clone" (primary button)
- Match Create Task footer layout and spacing exactly

---

Behavior / Logic Rules:

- Source Task section is strictly read-only
- Do NOT include:
  - Execution Statement
  - Project selection
  - Appropriation selection
- These are inherited and not editable

- Tier is display-only (no interaction)

- Checkbox selections determine copied content
- Do not introduce dependencies between checkboxes

- New task will be created in Draft (no UI needed, just do not expose workflow controls)

---

Visual / UX Requirements:

- Maintain exact visual consistency with Create Task panel
- Clearly differentiate:
  - read-only reference section (Source Task)
  - editable form fields
- Ensure strong vertical rhythm and spacing
- Avoid visual clutter
- Keep the experience lightweight and scannable

---

Do NOT:
- Redesign panel layout or structure
- Introduce new interaction patterns
- Add unnecessary fields or logic
- Overcomplicate copy-forward behavior
- Introduce requirement lineage or execution logic

---

Outcome Goal:
A clean, enterprise-grade Clone Task panel that feels consistent with Create Task, clearly communicates source vs editable data, and supports a fast, controlled duplication workflow.
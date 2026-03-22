Task: Implement Tier Assessment Side Panel (Reuse Existing Flyout Pattern)

Context:
We are working within the SyncPoint Task Workspace (Task Planning module).

The user can initiate the Tier Assessment process by:

* Clicking "Assign Tier" in the Task Summary
* Clicking the Tier Assessment link in the info banner

We already have an existing side panel flyout pattern used for:

* Create Task
* Clone Task

You MUST reuse that exact side panel structure, spacing, typography, and footer behavior.

Reference:
Use the provided "Clone Task" side panel as the structural and visual reference.

---

Objective:
Create a new side panel titled "Tier Assessment" that allows users to determine the task’s tier before detailed planning begins.

This is part of a progressive workflow:
Draft → Tier → BOE → Allocation → Approval

The panel must support incomplete inputs and should NOT imply finality.

---

CRITICAL BEHAVIOR RULES:

* This is NOT a blocking modal workflow
* Users can close the panel without completing everything
* Tier is an early-stage decision and may be based on rough estimates
* Do NOT imply that cost, allocation, or BOE is finalized
* Do NOT introduce validation that forces completion of all fields

---

Panel Structure (REQUIRED)

Follow the SAME layout pattern as Clone Task panel:

1. Header
2. Body (scrollable)
3. Footer (sticky)

---

HEADER

Title: Tier Assessment

Description:
Determine the appropriate planning tier for this task.
Tier selection defines the level of detail required for BOE and planning.

Include close (X) icon (same placement and styling as existing panel)

---

BODY

SECTION 1 — Context Summary (reuse card pattern from Clone Task "Source Task")

* Show:
  Task ID + Title
  Executing Activity
  Appropriation
  Current Tier (if any, else "Not Assigned")

This is read-only.

---

SECTION 2 — Info Banner (REQUIRED)

Use standard info banner pattern (blue, neutral emphasis)

Text:
Complete the Tier Assessment to establish the planning estimate and required BOE detail before building this task.

This must match existing banner styling (do NOT invent new styles)

---

SECTION 3 — Tier Inputs

This is a guided form. Keep structure simple and explicit.

Fields:

1. Estimated Task Cost (Required for tier determination, but allow rough input)

   * Currency input
   * Placeholder: "Enter rough order of magnitude estimate"
   * Helper text:
     This estimate can be refined later during BOE development.

2. Type of Work

   * Dropdown or select
   * Example options:

     * Study / Analysis
     * Equipment Procurement
     * System Development
     * Sustainment / Maintenance
     * Other

3. Major Deliverable / End Item

   * Toggle or Yes/No selection
   * Label:
     Does this task produce a major deliverable or end item?

---

SECTION 4 — Derived Tier (System Feedback)

Display a non-editable field:

Label: Recommended Tier
Value: (Dynamic placeholder for now, e.g. "Tier 1", "Tier 2", etc.)

Include helper text:
Tier is determined based on estimated cost, type of work, and deliverable complexity.

Do NOT implement logic — just show placeholder state.

---

SECTION 5 — Optional Notes

Label: Assessment Notes
Textarea
Placeholder:
Add any notes or assumptions used to determine the tier...

---

FOOTER (sticky, same as Clone Task)

Primary Button:
Save Tier

Secondary Button:
Cancel

Behavior:

* Save updates the Task Summary Tier field
* Panel closes on save
* Cancel closes panel without saving

---

DO NOT CHANGE:

* Do NOT modify the existing Task Summary layout
* Do NOT modify global spacing, typography, or tokens
* Do NOT convert this into a modal
* Do NOT introduce stepper or wizard behavior
* Do NOT add validation beyond basic input structure

---

DESIGN PRINCIPLES TO FOLLOW:

* Layout stability over cleverness
* Explicit structure over implicit behavior
* Reuse existing components and spacing
* Keep hierarchy consistent with Clone Task panel
* Maintain enterprise UI consistency

---

Outcome:

A clean, reusable Tier Assessment side panel that:

* Matches existing SyncPoint panel patterns
* Supports progressive task enrichment
* Clearly guides users without forcing completion

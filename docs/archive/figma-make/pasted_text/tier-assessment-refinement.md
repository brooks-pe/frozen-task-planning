Task: Refine Tier Assessment Side Panel — Align to BOE Tier Logic (SRS §4)

Context:
We are refining the existing Tier Assessment side panel in the SyncPoint Task Workspace.

This is NOT a redesign.
This is a correction and enhancement to align with BOE Tier Definitions (SRS Section 4).

The goal is to transform this from a basic form into a guided decision flow.

---

CRITICAL DOMAIN RULES (AUTHORITATIVE)

* Tier 0 = lowest complexity

* Tier 1 = moderate complexity

* Tier 2 = highest complexity

* A task with a **Major Deliverable / End Item automatically qualifies as Tier 2**

* Tier recommendation must be:

  * based on inputs
  * clearly explained to the user
  * transparent for auditability

---

OBJECTIVE

Update the Tier Assessment panel to:

1. Use correct input fields
2. Delay recommendation until sufficient data is provided
3. Clearly explain WHY a tier is recommended
4. Allow user to accept OR override with justification
5. Maintain progressive (non-blocking) workflow

---

UPDATE 1 — Replace Estimate Input Structure

REMOVE:

* "Estimated Task Cost" (single field)

ADD:

1. Estimated Direct Labor Dollars

   * Currency input

2. Estimated Total Task Funding (optional)

   * Currency input
   * Label must include "(optional)"

Keep spacing and styling consistent with existing inputs.

---

UPDATE 2 — Remove Unnecessary Fields

REMOVE completely:

* Type of Work
* Assessment Notes

Do not leave empty space — reflow layout cleanly.

---

UPDATE 3 — Recommendation Timing (CRITICAL)

The "Recommended Tier" section must NOT appear until:

* Estimated Direct Labor is entered
  AND
* Major Deliverable selection is made

Before that:
→ Do NOT show placeholder recommendation
→ Do NOT show "Not yet determined"

This section should appear dynamically only after required inputs exist.

---

UPDATE 4 — Recommended Tier Section (Enhanced)

When visible, display:

A highlighted container (reuse info/surface pattern)

Include:

1. Tier Badge
   Example: "Tier 2"

2. Label:
   "Recommended BOE Tier"

3. Dynamic Explanation Text (REQUIRED)

Example structure:

"The system recommends Tier 2 based on the following factors:"

Bullet points (dynamic based on inputs):

* Direct labor estimate exceeds Tier threshold
* Major deliverable included — requires detailed BOE breakdown
* (Optional future factor placeholder: historical similarity)

Do NOT hardcode all bullets — show only relevant ones.

---

UPDATE 5 — Accept or Override Section

Add new section BELOW recommendation:

Section Title:
"Accept or Override"

Options (radio buttons):

1. Accept Recommendation (Tier X)

   * Default selected

2. Override Tier

---

IF "Override Tier" is selected:

Show:

1. Warning Banner (use warning style)

Text:
"You are overriding the system recommendation. An override reason is required and will be recorded for audit traceability."

2. Selected Tier Dropdown
   Options:

   * Tier 0
   * Tier 1
   * Tier 2

3. Override Reason (Required)

   * Textarea
   * Helper text:
     "Override reason is required and will be recorded for audit traceability."

---

UPDATE 6 — Acceptance Feedback

IF user selects "Accept Recommendation":

Show confirmation banner (success/positive tone):

Example:
"Tier 2 accepted. This task will use a full detailed BOE structure including subtasks, labor, travel, material, and ODC."

Text should adapt to tier level (do not hardcode Tier 2 only).

---

UPDATE 7 — Save Behavior (Maintain Existing + Ensure Consistency)

On Save:

* Persist selected tier (recommended or overridden)

* Close panel

* Show success toast:
  Title: Tier Assigned
  Message: The task has been updated with the selected planning tier.

* Update Task Summary Tier field

* Update banner below Task Summary:
  "Complete task details to submit to BOE Build Up."

---

DO NOT CHANGE:

* Panel container, width, or layout structure
* Header and footer patterns
* Existing spacing system
* Typography scale
* Other Task Workspace components

---

DESIGN PRINCIPLES:

* Make system logic visible (not hidden)
* Support auditability (especially overrides)
* Avoid premature outputs (no early recommendation)
* Keep UI structured and predictable
* Reuse existing component patterns only

---

Outcome:

A Tier Assessment experience that:

* reflects real BOE decision logic
* explains recommendations clearly
* enforces audit traceability for overrides
* aligns tightly with SRS requirements

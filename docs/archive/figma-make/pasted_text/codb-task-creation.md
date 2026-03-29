Change type:
Behavioral + validation + conditional UI state

Scope:
Create Task flyout panel only

Objective:
When the CODB checkbox is selected, simplify the required inputs for Task creation while maintaining layout stability and clear user guidance.

---

Changes:

1. Required Fields Update (CODB Mode)

When the CODB checkbox is checked:

Set the following fields as REQUIRED:

* Project (already required)
* Task Title (must be enforced as required)
* Appropriation (APPN)

All other fields become NOT REQUIRED.

---

2. Field Behavior (Do NOT remove fields)

When CODB is checked:

The following fields should remain visible but become DISABLED:

* WBS Attribute
* Executing Activity
* Funding Source (only disable if it is not required based on APPN selection logic)

Disabled fields must:

* Retain their layout position (no shifting or collapsing)
* Use proper disabled styling (see styling rules below)

---

3. Helper Text for Disabled Fields

For each disabled field, add helper text beneath the field:

Text:
"Not required for CODB tasks"

This should use:

* Helper Text typography (12px)
* Neutral text color (not too faint / not low contrast)

---

4. Task Title Requirement

* Task Title must now be a required field (add * if not already present)
* Prevent task creation if Task Title is empty
* Show standard validation message if user attempts to submit without it

---

5. Checkbox Behavior (No layout shift)

* Checking CODB should NOT:

  * Remove fields
  * Collapse sections
  * Cause layout jump

* Only state changes:

  * Required → optional
  * Enabled → disabled
  * Helper text appears

---

6. Disabled Field Styling (CRITICAL)

Disabled fields must:

* Have slightly muted background (light gray)
* Maintain readable text contrast
* NOT appear fully grayed-out or “inactive system error” style
* Labels remain visible and readable
* Inputs are non-editable but clearly still part of the form

DO NOT:

* Use low-contrast gray-on-gray text
* Hide labels
* Remove borders entirely

---

7. Unchecked Behavior (Revert State)

When CODB checkbox is unchecked:

* All fields return to normal:

  * Enabled
  * Required rules restored
  * Helper text removed

---

Constraints:

* Do NOT remove or reorder fields
* Do NOT introduce new layout structures
* Do NOT modify dropdown logic or data sources
* Preserve spacing, typography, and design system tokens
* Follow guidelines.md strictly (typography, color usage, interaction states)

---

Success Criteria:

* CODB checkbox simplifies form without removing structure
* Only Project, Task Title, and Appropriation are required in CODB mode
* Other fields remain visible but disabled with clear explanation
* No layout shifting occurs
* Disabled fields remain readable and consistent with design system

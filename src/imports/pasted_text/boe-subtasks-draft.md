Change type:
Structural + behavioral (new section within existing page)

Scope:
Task Workspace → BOE Tab (Tier 1 and Tier 2, Draft state only)

Objective:
Introduce a structured BOE tab that allows optional subtask creation and organization in Draft state, without enforcing BOE requirements.

---

Changes:

1. BOE Tab Content (Draft State Only)

Add a new section within the existing BOE tab:

Section Title:
“Subtasks”

---

2. Empty State (No Subtasks)

Display:

* Informational guidance (reuse existing info banner pattern):
  “Define subtasks to organize the work and guide BOE build-up. Subtasks are optional in Draft but required before BOE Build-Up.”

* Empty state content:
  “No subtasks yet.”

* Primary CTA:
  [+ Add Subtask]

* Secondary CTA:
  [+ Add Cost Item]

---

3. Subtask List Structure

When subtasks exist:

* Display subtasks as vertically stacked, expandable sections
* Each subtask must:

  * use consistent container styling (reuse existing expandable row/panel pattern)
  * support expand/collapse behavior
  * default to expanded when newly created

---

4. Subtask Fields (Draft State)

Within each expanded subtask:

Field Mapping:

* Subtask Title → standard text input (single-line)
* Description → multiline textarea (optional)
* Period of Performance → date range picker (optional)

---

5. Subtask Actions

Each subtask must support:

* inline editing (no modal)
* removal (reuse existing delete/remove pattern)
* collapse/expand toggle

---

6. Optional Cost Items (Draft Only)

Within each subtask, include:

Section: “Cost Items” (optional)

Buttons:

* [+ Add Labor]
* [+ Add Material]
* [+ Add Travel]
* [+ Add Other]

Do NOT enforce entry of cost items in Draft

---

7. Task-Level Cost Items (No Subtasks Case)

If user adds cost items without subtasks:

* Create a “Cost Items” section at task level

* Display same structure as subtask cost items

* Display helper text:
  “Cost items can be organized under subtasks for better structure.”

---

8. Add Subtask Interaction

Clicking [+ Add Subtask]:

* Creates a new subtask section
* Automatically expands it
* Focus cursor in Subtask Title field

---

Behavior Rules:

* Subtasks are OPTIONAL in Draft state

* Cost items are OPTIONAL in Draft state

* No validation errors shown during editing

* Validation is deferred to workflow transition (Submit to BOE Build-Up)

* Do NOT introduce separate UI for Tier 1 vs Tier 2 in Draft

* Use same structure for both tiers

---

Constraints:

* Do NOT create new component patterns

* Reuse:

  * expandable section pattern
  * input fields
  * date picker
  * button styles

* Do NOT modify Task Summary

* Do NOT change layout outside BOE tab

* Do NOT introduce tabs for subtasks

* Do NOT enforce BOE requirements in Draft

---

Success Criteria:

* User can create subtasks optionally in Draft
* Subtasks appear as expandable structured sections
* User can optionally add cost items
* UI scales cleanly with multiple subtasks
* No validation blocks exist in Draft
* Layout remains stable and consistent with existing system

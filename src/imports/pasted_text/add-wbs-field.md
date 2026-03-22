Task: Add WBS Attribute Field to Create Task Flyout

Context:
We are updating the Create Task flyout in SyncPoint.

The current form is missing the WBS (Work Breakdown Structure) field, which is required for task classification and alignment to planning structure.

This field must be added in the correct location and follow existing form patterns.

---

ADD NEW FIELD

Field Label:
WBS Attribute *

Field Type:
Searchable dropdown

---

PLACEMENT (CRITICAL)

Insert the WBS Attribute field directly AFTER:

Execution Statement

And BEFORE:

Project

---

FINAL FIELD ORDER (TOP TO BOTTOM)

* Task Type
* Task Title
* Execution Statement
* WBS Attribute ← NEW
* Project (derived)
* Appropriation (derived)
* Funding Source
* Executing Activity
* Planning Year
* Period of Performance

---

FIELD BEHAVIOR

* Required field
* Dropdown options should be filtered based on selected Execution Statement
* If no Execution Statement is selected, WBS dropdown should be disabled or empty

---

DROPDOWN CONTENT

Populate with realistic hierarchical WBS options:

Examples:

5.1 — Hull Systems
5.2 — Sensor Fusion Systems
5.3 — Weapons Integration
6.1 — AI Navigation
6.2 — Autonomy Algorithms

Format:
[Code] — [Description]

---

HELPER TEXT (OPTIONAL)

"Select the Work Breakdown Structure element for this task."

---

VISUAL STYLE

* Match existing dropdown fields (Execution Statement, Funding Source, etc.)
* Use same spacing, typography, and input styling
* Maintain consistent label and required indicator formatting

---

DO NOT CHANGE

* Existing layout structure
* Other field behaviors
* Button placement
* Form spacing system

---

OUTCOME

A Create Task form that:

* includes WBS as a core planning input
* places it correctly within the data hierarchy
* aligns with enterprise planning workflows
* maintains consistency with existing form design

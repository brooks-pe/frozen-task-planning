Task: Build "Task Summary" Section for TSK-0501 Using Correct Data + System Pattern

Context:
We are building the Task Summary section for the Task Workspace of:

TSK-0501 — Coastal Surveillance Radar Modernization

This section must:

* Reuse the **Filters section layout pattern** (provided as reference)
* Use **correct task data for TSK-0501**
* Reflect **Draft state behavior (no allocation yet, no tier assigned)**

---

## 🔷 1. Section Container (Match Filters Pattern EXACTLY)

Use the Filters section as the structural reference.

### Title Row:

Left:

* **Task Summary**

Right:

* **Hide Task Summary** (same style as "Hide Filters")

### Divider:

* Thin horizontal divider directly under title row
* Match Filters styling exactly

---

## 🔷 2. Content Layout (Metadata Grid)

Below the divider, create a structured metadata layout using system standards:

* Labels: small, muted
* Values: primary text
* Clean multi-column grid
* No inner cards

---

## 🔷 3. Populate with Correct TSK-0501 Data

Use the following data (aligned with screenshots and context):

---

### Row 1:

* Execution Statement → Maritime ISR Modernization Program
* Executing Activity → PMS 420
* Appropriation → O&MN (styled tag/pill)
* Tier → **Not Assigned** (Draft state)
* Planning Year → FY2026
* Period of Performance → Not Yet Defined

---

### Row 2:

* Requested → $1,250,000
* Allocated → $0
* Gap → $1,250,000
* Funding Source → Not Yet Funded

---

### Row 3:

* Project Lead → Sarah Mitchell *(realistic placeholder if not defined)*
* Activity Lead → James O'Connor *(realistic placeholder if not defined)*
* Operational Status → Draft (styled status badge)
* Previous Task → Not Yet Linked
* Next Task → Not Yet Created

---

## 🔷 4. Draft State Rules (Critical)

This task is in **Draft state**, so:

* Tier must display: **Not Assigned**
* Allocated must be: **$0**
* Gap should equal Requested
* Period of Performance can be empty or "Not Yet Defined"
* No advanced workflow indicators yet

---

## 🔷 5. Edit Button

* Place **Edit** button in bottom-right of the section
* Style: Secondary outline (match system)
* Include edit icon
* No interaction required

---

## 🔷 6. Alignment + Spacing

* Match Filters section padding exactly
* Align to page grid
* Maintain consistent vertical spacing from header above

---

## ❌ Do NOT:

* Do not reuse data from other example tasks
* Do not show Tier 1 / Tier 2
* Do not introduce cards or containers inside section
* Do not change layout pattern from Filters
* Do not infer unrelated metadata

---

## 🎯 Goal:

Create a clean, accurate Task Summary section that:

* Uses the correct TSK-0501 data
* Reflects Draft state behavior
* Matches SyncPoint section patterns exactly
* Sets up the next step (Tier Assessment)

Task: Implement Task Workspace Main Content — Overview Tab (Workflow-State Overview Pattern)

Context:
We are building the main content area below the Task Summary banner in the SyncPoint Task Workspace.

This area will use a tabbed layout.

Initial tabs:

1. Overview (active)
2. BOE Build Up (empty placeholder)

We are ONLY implementing the Overview tab content in this task.

---

CRITICAL DESIGN INTENT

The Overview tab is NOT a duplicate of Task Summary.

It is a **workflow-state-based overview** that shows:

* what has happened at each stage
* what data has been added
* what is still pending

It should feel:

* structured
* vertically scannable
* exportable (PDF-friendly)
* audit-oriented

---

TAB STRUCTURE

Use existing tab component.

Tabs:

* Overview (active)
* BOE Build Up (inactive, empty for now)

Do NOT add additional tabs.

---

OVERVIEW TAB — LAYOUT

The page should render a vertical stack of sections.

Each section represents a **workflow state**.

Order (top → bottom):

1. Draft
2. Tier Assignment
3. BOE Build Up
4. Allocation
5. Approval

---

SECTION DESIGN (REUSABLE PATTERN)

Each workflow section must:

* Use a **surface container** (light gray background)
* Have consistent padding and spacing
* Follow existing section styling (like other panels in app)

Each section contains:

1. Section Header

   * Title: Workflow State Name (e.g., "Draft")
   * Optional status indicator (see below)

2. Section Content Area

   * Key data or messages

---

STATE HANDLING (CRITICAL)

We are currently in **Draft state**.

---

SECTION 1 — Draft (ACTIVE)

This is the ONLY section with real content.

Header:
Draft

Content (include):

* Created Date

* Created By

* Current Operational Status (Active badge)

* Tier Status:
  "Tier not yet assigned"
  Include inline link:
  "Assign Tier"

* Guidance text:
  "Complete the Tier Assessment to establish planning structure before proceeding."

Keep content structured in label/value format (consistent with app patterns)

---

SECTION 2 — Tier Assignment (INCOMPLETE)

Header:
Tier Assignment

Visual State:

* Slightly muted / reduced emphasis (but still readable)
* Do NOT fully gray out or disable

Content:

Message:
"Tier has not been assigned yet. Complete Tier Assessment to proceed."

---

SECTION 3 — BOE Build Up (INCOMPLETE)

Header:
BOE Build Up

Content:

Message:
"BOE structure will be available after Tier Assignment is completed."

---

SECTION 4 — Allocation (INCOMPLETE)

Header:
Allocation

Content:

Message:
"Funding allocation occurs after BOE development."

---

SECTION 5 — Approval (INCOMPLETE)

Header:
Approval

Content:

Message:
"Task approval occurs after allocation is completed."

---

VISUAL DIFFERENTIATION RULES

* Active section (Draft):

  * Full contrast
  * Normal text color

* Future sections:

  * Slightly muted text color (use neutral token)
  * Same layout — DO NOT collapse or hide

This ensures:

* visibility of full workflow
* clarity of progression
* no layout shift

---

TYPOGRAPHY

* Section titles → Section Title style (18px semibold)
* Labels → standard metadata label style
* Values → body text
* Messages → helper/secondary text style

---

SPACING

* Maintain consistent vertical rhythm between sections
* Use existing container padding (do NOT invent new spacing)

---

DO NOT CHANGE

* Task Summary section
* Banner above this area
* Global layout or page width
* Navigation or sidebar
* Existing typography tokens

---

BOE BUILD UP TAB (PLACEHOLDER)

When user clicks "BOE Build Up":

* Show empty state message:

"BOE Build Up will be available after Tier Assignment is completed."

No additional UI needed.

---

DESIGN PRINCIPLES

* Show progression, not just data
* Avoid duplication of Task Summary
* Keep layout stable across states
* Make it easy to export/read as a document
* Use existing components only

---

Outcome:

A structured Overview tab that:

* clearly communicates workflow progression
* shows what has been completed vs pending
* supports auditability and export use cases
* establishes a reusable pattern for other modules

Task: Refine Overview Tab Layout — Single Container + Workflow Sections + Proper State Indicators

Context:
We are refining the Overview tab in the SyncPoint Task Workspace.

Current implementation:

* Uses separate “card-like” sections
* Includes a Tier Assignment section (not needed)
* Uses circular indicators that resemble radio buttons

We need to correct this to better reflect:

* workflow progression (SRS-aligned)
* document-style layout (export-friendly)
* proper visual semantics

---

CRITICAL DESIGN CHANGE

Convert the Overview layout from:

❌ Multiple stacked cards

TO:

✅ A single continuous container with clearly separated sections

This should feel like:

* one cohesive page
* structured into sections
* similar to a report or document

---

UPDATE 1 — Container Structure

* Wrap ALL workflow sections inside ONE parent container
* Use a single surface background (white)
* Use internal dividers (subtle borders or spacing) between sections

Do NOT render each section as its own card

---

UPDATE 2 — Workflow Sections (SRS-ALIGNED)

Sections must represent actual workflow states.

REMOVE:

* "Tier Assignment" section entirely

USE these sections (top → bottom):

1. Draft
2. BOE Build-Up
3. Activity Acceptance
4. Project Acceptance
5. Project Allocation
6. Impact Assessment
7. Project Approval
8. Program Approval
9. Baselined

---

UPDATE 3 — Section Header Structure

Each section header should include:

* Section Title (left)
* Status Indicator (left of title OR inline)

Example:
[Indicator] Draft

Maintain consistent spacing and alignment across all sections.

---

UPDATE 4 — Status Indicator (CRITICAL FIX)

REMOVE:

* Circular indicators that resemble radio buttons

REPLACE WITH:

A small, non-interactive status indicator using one of the following patterns:

Option (Preferred):

* Icon + color system

States:

1. Completed

   * Check icon
   * Green

2. Active (current stage)

   * Filled dot OR subtle highlight bar
   * Blue or primary color

3. Not Started

   * Muted dot OR no icon
   * Neutral gray

---

IMPORTANT RULES:

* Indicators must NOT look clickable
* Must NOT resemble inputs (radio/checkbox)
* Must clearly communicate state at a glance

---

UPDATE 5 — Visual State Treatment

Draft (current active):

* Full opacity
* Normal text
* Indicator = Active style

Future sections:

* Slightly muted text color
* Same layout (DO NOT collapse)

Completed sections (future state):

* Will use green check indicator

---

UPDATE 6 — Draft Section Content (KEEP + CLEAN)

Keep existing content but ensure:

* Structured label/value layout
* Includes:

  * Created Date
  * Created By
  * Operational Status (Active badge)
  * Tier Status + Assign Tier link
  * Guidance text

---

UPDATE 7 — Future Sections Content

Each section should include a short, clear message:

Examples:

BOE Build-Up:
"BOE development will begin after the task is submitted."

Activity Acceptance:
"This stage begins once BOE development is completed."

Project Allocation:
"Funding allocation occurs after approvals."

Keep messaging:

* concise
* informative
* consistent tone

---

UPDATE 8 — Spacing & Dividers

Between sections:

* Use subtle horizontal divider OR consistent vertical spacing
* Maintain strong alignment (left edge consistency)

Avoid heavy borders or card outlines

---

UPDATE 9 — Maintain Export-Friendly Design

Ensure:

* clean vertical flow
* no overlapping elements
* consistent spacing
* readable as a PDF

---

DO NOT CHANGE:

* Tab structure
* Task Summary section
* Banner above tabs
* Typography scale
* Global spacing tokens

---

DESIGN PRINCIPLES:

* One page, multiple sections (not multiple containers)
* Reflect real workflow states (not UI artifacts)
* Use visual hierarchy, not boxes, to separate content
* Indicators must communicate state, not afford interaction
* Optimize for readability and export

---

Outcome:

An Overview tab that:

* reads like a lifecycle document
* accurately reflects workflow progression
* uses clear, non-interactive status indicators
* avoids visual confusion with form controls
* aligns with SRS-defined workflow states

Task: Build Task Workspace Header (TSK-0501) – SyncPoint HiFi Alignment

Context:
We are beginning construction of the Task Workspace in the SyncPoint HiFi prototype. This update focuses ONLY on the top header section when a user clicks into a task (example: TSK-0501).

This must follow established SyncPoint layout patterns (not the low-fi mockups).

---

Entry Point Behavior:

* Clicking on Task ID "TSK-0501" from the Task Grid navigates to the Task Workspace view for that task.

---

Header Structure (Top of Page Only):

### 1. Top Action Bar

Layout:

* Left: Back navigation
* Right: Primary action

Elements:

* Left:
  ← Back to Tasks (text button with left arrow icon)

* Right:
  [Clone Task] (secondary button style, consistent with existing pattern)

Rules:

* Align with existing page padding and grid system
* No Export button
* Keep spacing consistent with Dashboard / Task Grid patterns

---

### 2. Breadcrumb (Above Title)

Format:
Home / Task Planning / Tasks / TSK-0501

Behavior:

* "Home", "Task Planning", and "Tasks" are clickable
* "TSK-0501" is current page (non-clickable)
* Use standard breadcrumb styling from system

---

### 3. Page Title Section

Primary Title (H1):
Coastal Surveillance Radar Modernization

* This is the Task Title
* Use standard page title typography (same as other primary pages)

Secondary Description (Subtext under title):
TSK-0501 Task Summary

* Smaller, muted text
* Acts as contextual descriptor (NOT metadata)

Spacing:

* Tight vertical relationship between title and description
* Consistent with other page headers in system

---

### Layout Notes:

* This header section should feel consistent with:

  * Task Grid page
  * Dashboard page
  * Other SyncPoint modules

* Do NOT introduce:

  * Cards
  * Containers
  * Dividers that break standard header flow

* Keep it clean, top-aligned, and breathable

---

Out of Scope (DO NOT BUILD YET):

* Task metadata (Execution Statement, Funding, etc.)
* Tabs (Overview, Subtasks, BOE, etc.)
* Workflow timeline
* Any content below the header

---

Outcome Goal:

A clean, system-consistent Task Workspace header that:

* Clearly identifies the task
* Provides navigation context
* Establishes the page structure for future sections

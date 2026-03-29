Task: Implement Sticky Workflow Footer with Timeline + Contextual Action Row

Context:
We are refining the Task Workspace in SyncPoint.

We need a new sticky footer pattern that is fixed to the bottom of the viewport and sits above the global footer.

This footer should support:

1. workflow visibility
2. progression awareness
3. next-step action

This is a NEW pattern, but it must reuse existing SyncPoint visual styles, spacing, buttons, surfaces, typography, and semantic color usage.

---

CRITICAL DESIGN DECISION

Do NOT make the workflow state boxes themselves the primary action buttons.

Instead:

* Row 1 = workflow timeline (status / stage indicators)
* Row 2 = contextual action area for the next eligible workflow action

This separation is required so that:

* workflow state remains readable and stable
* actions remain explicit
* the pattern scales later when multiple actions or role-based actions are added

---

OBJECTIVE

Create a sticky workflow footer that:

* stays fixed above the global footer
* spans the main content width
* shows workflow states on the left
* shows available workflow action on the right
* remains clean, enterprise-grade, and scalable

---

LAYOUT STRUCTURE

Create a sticky footer bar with:

* fixed position at bottom of viewport
* placed directly above the global footer
* white or standard surface background
* top border to separate it from page content
* sufficient horizontal padding aligned with page content

Inside the footer:

TOP ROW:

* workflow timeline boxes aligned left
* contextual action area aligned right

Optional:
If needed for spacing and clarity, the action area may sit on a second row beneath the timeline, but it should still feel part of one cohesive sticky footer container.

Preferred initial layout:

* timeline left
* action right
* all inside one sticky footer bar

---

WORKFLOW TIMELINE

Include these workflow states in order:

1. Draft
2. BOE Build-Up
3. Activity Acceptance
4. Project Acceptance
5. Project Allocation
6. Impact Assessment
7. Project Approval
8. Program Approval
9. Baselined

Render each as a compact workflow box / pill / segmented state item.

These are NOT primary buttons.

They are status indicators first.

They may support hover and optional future navigation behavior, but should not look like primary CTA buttons.

---

WORKFLOW STATE STYLES

Use distinct visual treatments for:

1. Current Active State

   * Example: Draft
   * Primary/blue emphasis
   * Strongest visual weight among timeline items

2. Completed State

   * Green semantic styling
   * Check icon

3. Upcoming State

   * Neutral / muted styling

4. Next Available State

   * For the immediate next workflow step only
   * Example in current case: BOE Build-Up
   * Slightly more emphasized than other future states
   * May use stronger border or subtle primary accent
   * Must still NOT look like the primary action button

---

CURRENT EXAMPLE STATE

For the current screen:

* Draft = Active
* BOE Build-Up = Next Available
* All later states = Upcoming / Not Yet Reached

No completed states yet in this example.

---

TOOLTIP BEHAVIOR

Each workflow state should support hover tooltip.

Tooltip content should briefly explain the stage.

Examples:

Draft:
"Task has been created but not yet submitted for BOE development."

BOE Build-Up:
"Next workflow state. Submitting will send this task to BOE Build-Up."

Activity Acceptance:
"This stage begins after BOE development is completed."

Keep tooltip styling aligned with existing tooltip patterns.

---

CONTEXTUAL ACTION AREA

Add a dedicated action area on the right side of the sticky footer.

This is where available workflow actions appear.

For the current Draft example:

Primary button:
Submit to BOE Build-Up

This is the primary CTA for the footer.

Do NOT place this label inside the BOE Build-Up workflow box.

---

ACTION AREA BEHAVIOR

Current behavior:

* Show single primary button:
  Submit to BOE Build-Up

Future-proofing requirement:

* This area must be able to support multiple actions later
* When multiple actions exist in the future, this area can evolve into:

  * split button
  * primary button + overflow menu
  * stacked responsive layout

Do NOT implement multi-action behavior yet.
Just structure the layout so it can support it later.

---

INTERACTION RULES

* Workflow boxes are informational / status-oriented
* Primary workflow action occurs in the contextual action area
* Footer remains visible while scrolling the page
* Footer must not overlap the global footer
* Footer must feel attached to Task Workspace content, not the app shell

---

VISUAL DESIGN GUIDANCE

Use existing SyncPoint styles.

Do NOT invent flashy controls.

Prefer:

* subtle borders
* semantic color coding
* compact spacing
* clear hierarchy

Recommended semantic treatment:

* Active = primary/blue
* Completed = success/green
* Upcoming = neutral gray
* CTA = standard primary button

Ensure workflow items do NOT resemble form inputs.

Do NOT make them look like radio buttons, checkboxes, or segmented inputs.

---

DO NOT CHANGE

* Global footer
* Task Summary
* Overview tab content
* Existing banner
* Page header
* Sidebar/navigation
* Typography scale or token system

---

DESIGN PRINCIPLES

* Separate state from action
* Make next step explicit
* Keep workflow readable at a glance
* Support future role-based and multi-action complexity
* Maintain layout stability and enterprise UX consistency

---

OUTCOME

A sticky workflow footer that:

* clearly shows lifecycle progression
* indicates current vs next vs future workflow states
* provides a dedicated primary action for progression
* establishes a scalable pattern for later workflow actions

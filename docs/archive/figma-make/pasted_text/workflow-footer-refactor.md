Task: Refine Sticky Workflow Footer — Status Styling + Save + Actions Split Button

Context:
We are refining the sticky workflow footer in the SyncPoint Task Workspace.

Current implementation:

* Workflow timeline exists
* Submit button exists on right
* Timeline states use primary color and resemble buttons

We need to:

1. Fix visual semantics of workflow states
2. Replace submit button with Save + Actions pattern
3. Introduce scalable workflow action handling

---

CRITICAL DESIGN PRINCIPLES

* Workflow states are NOT buttons
* Separate state (timeline) from action (buttons)
* Follow enterprise UX conventions for primary actions
* Keep footer slim and high-signal

---

UPDATE 1 — WORKFLOW STATE STYLING

REMOVE:

* primary button styling from workflow states

IMPLEMENT:

1. Active State (Draft)

* Light primary-tinted background (subtle)
* Dark text
* Optional small leading indicator (dot or icon)
* Must NOT look like a button

2. Next State (BOE Build-Up)

* Outline style using same primary color
* No fill
* Slightly emphasized vs future states

3. Future States

* Neutral gray background or text
* Low emphasis

4. Completed States (future)

* Green accent
* Check icon

IMPORTANT:

* No shadows
* No elevation
* No button affordance

---

UPDATE 2 — RIGHT SIDE ACTIONS

Replace:
"Submit to BOE Build-Up" button

With:

1. Save Button

* Secondary / outline style
* Label: Save

2. Actions Split Button (Primary)

Default action:
Submit to BOE Build-Up

Split button behavior:

* Clicking main button executes default action
* Dropdown arrow opens menu

Dropdown menu (current state):

* Submit to BOE Build-Up

---

UPDATE 3 — ACTION PLACEMENT

* Align Save and Actions to the right side of footer
* Maintain spacing between buttons
* Ensure alignment with page content grid

---

UPDATE 4 — REMOVE SECOND ACTION ROW

Do NOT implement a second row of actions.

Keep:

* single-line footer
* compact layout

---

UPDATE 5 — INTERACTION RULES

* Workflow states:

  * hover tooltip only
  * not primary click targets

* Actions button:

  * handles all workflow transitions

---

TOOLTIPS (KEEP)

Ensure each workflow state still has tooltip explaining stage.

---

DO NOT CHANGE

* Footer position (sticky)
* Overall layout structure
* Workflow state order
* Typography tokens
* Global spacing system

---

OUTCOME

A refined sticky footer that:

* clearly distinguishes status vs action
* avoids button-like timeline elements
* uses enterprise-standard Save + Actions pattern
* scales to future workflow complexity

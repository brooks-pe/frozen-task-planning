Task: Refine Tier Assessment Panel + Align Tier Behavior with SRS

Context:
We are updating the existing Tier Assessment side panel in the SyncPoint Task Workspace.

This is a correction pass to align:

* Tier definitions (SRS)
* Field values (Type of Work)
* System feedback (toast)
* State propagation (panel → Task Summary → banner)

Do NOT redesign the panel. Only apply the updates below.

---

CRITICAL DOMAIN CORRECTION — TIERS

Update all references to Tier values:

Valid tiers:

* Tier 0 (lowest)
* Tier 1 (moderate)
* Tier 2 (highest)

Replace any incorrect assumptions that Tier 1 is the lowest.

---

UPDATE 1 — Recommended Tier Display

In the "Recommended Tier" field:

* Ensure values can be:
  Tier 0 / Tier 1 / Tier 2

* Default placeholder (before inputs):
  "Not yet determined"

* Example populated value:
  "Tier 1"

Do NOT implement calculation logic — just ensure correct values and labeling.

---

UPDATE 2 — Type of Work Field

Replace existing dropdown options with ONLY:

* Government
* Contractor

Do NOT include any other options.

Keep existing dropdown styling and behavior.

---

UPDATE 3 — Save Behavior (CRITICAL)

When user clicks "Save Tier":

1. Show success toast (reuse existing app toast pattern)

Toast content:
Title: Tier Assigned
Message: The task has been updated with the selected planning tier.

2. Update Task Summary section (in background page):

* Tier field changes from:
  "Not Assigned" → selected tier (e.g., "Tier 1")

* Use existing badge styling for tier display

3. Close the side panel after save

---

UPDATE 4 — Banner State Transition

Current banner (before tier is set):
"Complete the Tier Assessment to establish the planning estimate and required BOE detail before building this task."

AFTER tier is saved:

Replace banner text with:

"Complete task details to submit to BOE Build Up."

Use SAME banner component and styling.
Only update the text.

Do NOT remove the banner entirely.

---

UPDATE 5 — Maintain Draft-State Integrity

Ensure:

* No implication that cost or BOE is finalized
* No validation forcing all fields to be completed
* Inputs remain flexible for early-stage estimation

---

DO NOT CHANGE:

* Panel layout or structure
* Section ordering
* Typography or spacing
* Footer button placement
* Any other Task Summary fields
* Any unrelated UI

---

DESIGN PRINCIPLES:

* Align to SRS (Tier definitions are authoritative)
* Maintain progressive enrichment workflow
* Use existing system feedback patterns (toast, banners)
* Keep behavior predictable and explicit

---

Outcome:

A corrected Tier Assessment experience that:

* Uses proper Tier 0 / 1 / 2 definitions
* Reflects real domain constraints
* Provides clear system feedback on save
* Updates Task Summary and banner state appropriately

Task: Standardize Tier Assignment Success Feedback (Toast + Field Highlight)

Context:
We are refining the Tier Assessment save behavior in the SyncPoint Task Workspace.

Currently:

* A toast exists but does NOT follow the correct system pattern
* The Task Summary Tier field updates but lacks clear visual confirmation

We need to align both with existing SyncPoint patterns.

---

REFERENCE PATTERN (AUTHORITATIVE)

Use the success toast behavior from:

User Management → Add Role Assignment page

When a role is successfully created:

* A green toast appears
* Positioned top-right
* Slides in
* Remains visible briefly
* Then fades out

This is the exact pattern to reuse.

Do NOT invent a new toast style.

---

UPDATE 1 — Success Toast Standardization

On "Save Tier":

Replace existing toast with:

STYLE:

* Green success toast
* Matches existing success variant exactly

POSITION:

* Top-right corner of viewport

ANIMATION:

* Slides in from the right
* Subtle ease-in motion
* Auto-dismiss after a few seconds

CONTENT:

Title:
Tier Assigned

Message:
The task has been updated with the selected planning tier.

Do NOT change typography, spacing, or iconography from the reference pattern.

---

UPDATE 2 — Task Summary Tier Field Feedback (NEW)

After successful save:

Apply a temporary visual highlight to the Tier field in the Task Summary section.

Behavior:

1. Field updates (e.g., "Not Assigned" → "Tier 1")

2. Immediately apply success highlight:

   * Soft green background OR glow (use existing success color token)
   * Subtle emphasis — not distracting

3. Add a short pulse/flash effect:

   * 1–2 pulses max
   * Duration ~1–1.5 seconds total

4. Fade back to normal state

---

IMPORTANT:

* This effect must feel like confirmation, NOT animation for decoration
* Do NOT loop animation
* Do NOT persist green state after animation completes

---

UPDATE 3 — Timing Coordination

Sequence should feel cohesive:

1. User clicks "Save Tier"
2. Panel closes
3. Toast slides in (top-right)
4. Task Summary Tier field updates
5. Field pulses green briefly
6. Toast remains visible, then fades out

---

DO NOT CHANGE:

* Task Summary layout
* Tier badge styling
* Panel structure
* Any other fields or components
* Global animation system

---

DESIGN PRINCIPLES:

* Reinforce cause → effect
* Use motion sparingly and purposefully
* Reuse existing system patterns (no new variants)
* Keep feedback immediate and localized

---

Outcome:

A consistent, enterprise-grade feedback experience where:

* Success is clearly communicated (toast)
* The exact updated field is visually confirmed (pulse highlight)
* Behavior matches established SyncPoint interaction patterns

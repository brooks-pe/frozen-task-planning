Change type:
Behavioral + header utility enhancement

Scope:
Task Planning → Tasks Grid table section only

* Section title header
* Multi-sort controls

Objective:
Add a right-aligned sort summary and Clear Sort control to the Tasks Grid section header so users can easily understand and reset active multi-column sorts.

Changes:

1. Add header utility area

* In the Tasks Grid section title/header area, add a right-aligned utility group
* Place items in this order from left to right:

  1. Sorted by summary
  2. Clear Sort control

2. Add Sorted by summary

* Show a compact summary of the active sort state
* Format examples:

  * `Sorted by: Title ↑`
  * `Sorted by: Title ↑, Workflow State ↑`
  * `Sorted by: Workflow State ↓, Delta ↑`
* Summary should reflect:

  * active sorted columns
  * sort direction
  * primary/secondary order
* If no sort is active:

  * hide the summary entirely

3. Add Clear Sort control

* Add a text-based header control:

  * label: `Clear Sort`
* Style it like an existing lightweight header action / utility control
* Place it to the right of the sort summary
* It should feel similar in weight to other header utility actions in the app

4. Clear Sort behavior

* Clicking `Clear Sort`:

  * removes all active sort states
  * clears both primary and secondary sort
  * removes sort badges (1 and 2)
  * removes header highlight from the active sorted column
  * restores unsorted/default header styling
* After clearing:

  * the `Sorted by` summary disappears

5. Preserve existing multi-sort behavior

* Do NOT change:

  * click sort behavior
  * shift+click secondary sort behavior
  * sort priority reordering
  * active sort badges
  * header highlight behavior for primary sort

6. Header layout behavior

* Keep the title/header layout stable
* Utility group should align to the right side of the section header
* Do NOT push search/filter controls into a new row
* Do NOT move the table itself

7. Visual styling

* Sorted by summary should use standard readable body/supporting text
* Clear Sort should be visually actionable but lightweight
* Do NOT style Clear Sort as a large button
* Reuse existing text/action styling patterns where possible

8. Content rules

* Use actual column display names in the summary:

  * Task ID
  * Executing Activity
  * Project
  * Title
  * Workflow State
  * Requested
  * Allocated
  * Delta
* Use arrow indicators in text form:

  * ascending = ↑
  * descending = ↓

Constraints:

* Do NOT redesign the table section
* Do NOT move search out of its current area
* Do NOT add new buttons inside the table header row
* Do NOT add more than two active sorts
* Do NOT change table sorting logic
* Only add the right-aligned sort summary + Clear Sort controls to the section header

Success Criteria:

* Active sorts are summarized in the section header
* Clear Sort appears to the right of the summary
* Clicking Clear Sort removes all active sorting states
* Summary disappears when no sort is active
* Existing multi-sort behavior remains unchanged
* No adjacent layout regressions are introduced

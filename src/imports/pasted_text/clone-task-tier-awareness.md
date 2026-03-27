Change type:
Behavioral + conditional UI refinement

Scope:
Task Detail Workspace → Clone Task flyout only

* Source Task context box
* Copy Forward Content checkbox section

Objective:
Make the Clone Task flyout tier-aware so the displayed Tier and available Copy Forward Content options change based on the source task’s current tier.

Changes:

1. Make Source Task context box tier-aware

* In the Source Task summary card at the top of the flyout, the Tier row must reflect the current source task tier dynamically
* Possible values:

  * No Tier Assigned
  * Tier 0
  * Tier 1
  * Tier 2
* This should behave like the current tier display in Task Summary:

  * show the current tier value clearly
  * update based on the source task being cloned

2. Make Copy Forward Content section tier-aware

* The checkbox list must change based on the source task tier

3. No Tier Assigned behavior
   If source task tier = `No Tier Assigned`:

* Show only one checkbox:

  * Task Header Information
* Hide/remove:

  * Subtasks
  * BOE Summary
  * Tier 0 BOE
  * Tier 1 Labor Lines
  * Tier 2 Labor Lines
  * Deliverables
  * Risk Entries

4. Tier 0 behavior
   If source task tier = `Tier 0`:

* Show exactly two checkboxes:

  * Task Header Information
  * Tier 0 BOE
* Hide/remove:

  * Subtasks
  * BOE Summary
  * Tier 1 Labor Lines
  * Tier 2 Labor Lines
  * Deliverables
  * Risk Entries

5. Tier 1 behavior
   If source task tier = `Tier 1`:

* Show:

  * Task Header Information
  * Subtasks
  * BOE Summary
  * Tier 1 Labor Lines
  * Deliverables
  * Risk Entries
* Do NOT show:

  * Tier 2 Labor Lines
  * Tier 0 BOE

6. Tier 2 behavior
   If source task tier = `Tier 2`:

* Show:

  * Task Header Information
  * Subtasks
  * BOE Summary
  * Tier 2 Labor Lines
  * Deliverables
  * Risk Entries
* Do NOT show:

  * Tier 1 Labor Lines
  * Tier 0 BOE

7. Checkbox defaults

* Preserve current default checked/unchecked behavior where it still makes sense
* For newly renamed conditional items:

  * Tier 1 Labor Lines should inherit the same default pattern currently used by Tier 2 Labor Lines unless explicitly changed elsewhere
* Do NOT introduce random new defaults

8. Preserve flyout structure

* Keep the overall field order unchanged:

  1. Source Task summary card
  2. New Task Title
  3. Planning Year
  4. Period of Performance
  5. Copy Forward Content
  6. Clone Notes
  7. Footer buttons
* Only the contents of the Copy Forward Content checkbox list should vary

9. Preserve all other flyout behavior

* Do NOT change:

  * New Task Title behavior
  * Planning Year dropdown
  * Period of Performance inputs
  * Clone Notes
  * Cancel button
  * Create Clone button
  * flyout layout or spacing beyond collapsing removed checkbox rows

Behavior Rules:

* Tier awareness is driven by the current source task being cloned
* Changing the source task tier should update:

  * the Tier line in the Source Task context box
  * the visible checkbox options in Copy Forward Content
* Hidden tier-inapplicable checkboxes should not leave blank space

Constraints:

* Do NOT redesign the Clone Task flyout
* Do NOT add new sections
* Do NOT change checkbox styling
* Do NOT change source task summary formatting beyond the tier value
* Do NOT alter cloning logic outside of visible tier-aware options
* Only make the Source Task tier display and Copy Forward Content section tier-aware

Success Criteria:

* Source Task summary card shows the correct current tier dynamically
* No Tier Assigned shows only Task Header Information
* Tier 0 shows Task Header Information + Tier 0 BOE only
* Tier 1 shows all relevant checkboxes with Tier 1 Labor Lines label
* Tier 2 shows all relevant checkboxes with Tier 2 Labor Lines label
* Removed options collapse cleanly with no empty gaps
* No adjacent flyout regressions are introduced

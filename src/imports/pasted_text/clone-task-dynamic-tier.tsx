Change type:
Behavioral correction + dynamic state binding

Scope:
Task Detail Workspace → Clone Task flyout only

* Source Task context box
* Copy Forward Content checkbox section

Objective:
Make the Clone Task flyout dynamically reflect the task’s CURRENT selected tier state in the Task Workspace (including Tier Dev Override state), rather than showing a static Tier 1 configuration.

Problem:
The Clone Task flyout is currently stuck showing Tier 1 values/options even when the task’s current selected tier in the workspace is Tier 0 or Tier 2.

Required Outcome:
When the user opens the Clone Task flyout, it must read and reflect the current visible tier state of the task in the workspace.

Changes:

1. Bind flyout to current selected tier state

* When the Clone Task flyout opens, read the CURRENT tier value from the Task Workspace
* Use the same current tier state shown in the workspace UI (including the current Tier Dev Override selection if one is active)
* Do NOT use a static source-task tier
* Do NOT use the original saved tier if the workspace is currently showing a different selected tier

2. Update Source Task tier display dynamically

* In the Source Task context card, the Tier line must display the current visible task tier at the moment the flyout opens
* Possible values:

  * No Tier Assigned
  * Tier 0
  * Tier 1
  * Tier 2

3. Update Copy Forward Content dynamically from the same current tier

* The visible checkbox set must be driven by that same current selected tier value
* The Source Task tier display and checkbox list must always stay in sync

4. Exact checkbox mapping rules

If current tier = `No Tier Assigned`

* Show only:

  * Task Header Information
* Hide:

  * Subtasks
  * BOE Summary
  * Tier 0 BOE
  * Tier 1 Labor Lines
  * Tier 2 Labor Lines
  * Deliverables
  * Risk Entries

If current tier = `Tier 0`

* Show only:

  * Task Header Information
  * Tier 0 BOE
* Hide:

  * Subtasks
  * BOE Summary
  * Tier 1 Labor Lines
  * Tier 2 Labor Lines
  * Deliverables
  * Risk Entries

If current tier = `Tier 1`

* Show:

  * Task Header Information
  * Subtasks
  * BOE Summary
  * Tier 1 Labor Lines
  * Deliverables
  * Risk Entries
* Hide:

  * Tier 0 BOE
  * Tier 2 Labor Lines

If current tier = `Tier 2`

* Show:

  * Task Header Information
  * Subtasks
  * BOE Summary
  * Tier 2 Labor Lines
  * Deliverables
  * Risk Entries
* Hide:

  * Tier 0 BOE
  * Tier 1 Labor Lines

5. Dynamic refresh behavior

* Opening the flyout while the workspace tier is Tier 2 must show Tier 2 in the Source Task card and the Tier 2 checkbox set
* Opening the flyout while the workspace tier is Tier 0 must show Tier 0 in the Source Task card and the Tier 0 checkbox set
* Opening the flyout while the workspace tier is No Tier Assigned must show No Tier Assigned in the Source Task card and only Task Header Information
* If the user closes the flyout, changes the workspace tier, and reopens the flyout, the flyout must reflect the new current tier

6. Reset stale state

* Do NOT carry forward previously rendered tier state from the last time the flyout was opened
* Recompute the tier display and checkbox set fresh each time the flyout opens

7. Preserve existing defaults where applicable

* Keep existing checked/unchecked defaults for visible checkboxes unless explicitly changed elsewhere
* Hidden checkboxes should not leave blank space
* Hidden checkbox state must not visually persist

8. Preserve all other flyout behavior

* Do NOT change:

  * New Task Title
  * Planning Year
  * Period of Performance
  * Clone Notes
  * Cancel button
  * Create Clone button
  * overall flyout layout beyond collapsing hidden options

Pattern Anchors:

* Treat the current visible tier in Task Summary / Tier Dev Override area as the source of truth for this flyout’s tier-aware behavior
* Source Task card Tier line and Copy Forward Content list must always use the same source of truth

Constraints:

* Do NOT redesign the Clone Task flyout
* Do NOT add new controls
* Do NOT change checkbox styling
* Do NOT change the task workspace tier selector itself
* Do NOT use a static hardcoded Tier 1 example
* Only fix the flyout so it dynamically reflects the current workspace tier state

Success Criteria:

* If workspace currently shows Tier 2, Clone Task flyout shows Tier 2 and Tier 2 options
* If workspace currently shows Tier 0, Clone Task flyout shows Tier 0 and Tier 0 options
* If workspace currently shows No Tier Assigned, Clone Task flyout shows No Tier Assigned and only Task Header Information
* Flyout recomputes correctly each time it opens
* Source Task tier display and visible checkboxes always match each other
* No adjacent regressions are introduced

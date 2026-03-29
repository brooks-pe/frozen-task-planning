Change type:
Behavioral + validation UX enhancement

Scope:
Create Task flyout panel

* Create Task button (footer)

Objective:
Make the Create Task button appear and behave as disabled until all required fields are validly completed.

Changes:

1. Disabled button state (default)

* On initial load of the Create Task flyout:

  * `Create Task` button must be in a disabled state
* Disabled state styling must:

  * Use reduced opacity (consistent with design system)
  * Maintain contrast (avoid gray-on-gray text issues)
  * Clearly appear non-interactive but still visible
* Do NOT use solid gray fill that mimics “inactive/hidden”
* Cursor should be `not-allowed`

2. Required field logic (enable conditions)
   The Create Task button becomes enabled ONLY when all required fields are valid:

Standard (non-CODB flow):

* Project
* Execution Statement
* Task Title (non-empty, trimmed)
* WBS Attribute
* Executing Activity
* Appropriation (APPN)
* Funding Source

CODB flow (when CODB checkbox is selected):

* Project
* Task Title
* Appropriation (APPN)

3. Real-time validation behavior

* As user fills fields:

  * Button state updates immediately (no submit attempt required)
* If any required field becomes invalid again:

  * Button returns to disabled state

4. Prevent invalid submission

* Clicking disabled button must do nothing
* No validation errors should trigger from clicking a disabled button

5. Visual consistency with validation states

* Keep existing red error states on fields (do not remove)
* Button state should complement—not replace—field validation
* Do NOT auto-show all errors on load (preserve current behavior)

6. Edge cases

* Whitespace-only Task Title = invalid
* If Execution Statement changes:

  * Revalidate dependent fields (WBS, Activity, APPN, Funding Source)
  * Button should disable if dependencies reset

7. Preserve existing behaviors

* Do NOT change:

  * Field order
  * Autopopulation logic
  * Dropdown search functionality
  * CODB conditional field logic
  * Success toast or navigation behavior
  * Split button behavior (when re-enabled)

Pattern Anchors:

* Follow existing SyncPoint disabled button pattern (used elsewhere in forms)
* Align with enterprise UX standard (e.g., Jira/ServiceNow form gating)

Constraints:

* Do NOT introduce new validation messages
* Do NOT block typing or field interaction
* Do NOT change button label or placement
* Do NOT alter layout

Success Criteria:

* Button is disabled on load
* Button enables only when required fields are complete
* Behavior differs correctly between CODB and non-CODB flows
* No regressions to dropdowns, autopopulation, or field dependencies
* Users cannot submit incomplete task shells

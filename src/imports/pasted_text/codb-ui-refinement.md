Change type:
Behavioral + conditional UI refinement

Scope:
Create Task flyout only

* CODB checked state

Objective:
When the CODB checkbox is checked, simplify the form by removing Execution Statement fields and updating required/optional field rules and helper text accordingly.

Changes:

1. Remove Execution Statement fields in CODB mode

* When the CODB checkbox is checked:

  * hide the `Execution Statement` field
  * hide the `Execution Statement Details` field
* These two fields should be completely removed from the visible form in CODB mode
* When CODB is unchecked, both fields return and behave as they do today

2. Update required fields in CODB mode
   When CODB is checked, required fields should be:

* Project
* Task Title
* WBS Attribute
* Executing Activity
* Appropriation (APPN)

Funding Source should be optional.

3. Keep fields active in CODB mode
   When CODB is checked:

* WBS Attribute remains enabled
* Executing Activity remains enabled
* Appropriation (APPN) remains enabled
* Funding Source remains enabled

Do NOT disable these fields in CODB mode.

4. Remove outdated helper text in CODB mode
   When CODB is checked:

* Remove helper text under `WBS Attribute` that says:

  * `Not required for CODB tasks`
* Remove helper text under `Executing Activity` that says:

  * `Not required for CODB tasks`
* Remove helper text under `Appropriation (APPN)` that says:

  * `Select an Execution Statement to populate...`
* Remove any placeholder or helper text that references selecting an Execution Statement first, since that field is no longer present in CODB mode

5. Funding Source helper text in CODB mode

* Funding Source remains visible and enabled
* Funding Source is optional in CODB mode
* Replace any CODB-specific “not required” helper text with simple optional guidance only
* Preferred helper text:

  * `Optional`
* Do NOT say:

  * `Not required for CODB tasks`

6. Placeholder cleanup in CODB mode
   When CODB is checked:

* Ensure placeholders do not reference Execution Statement dependencies
* WBS Attribute, Executing Activity, Appropriation, and Funding Source should have direct standalone placeholders appropriate to their own field

7. Preserve non-CODB behavior
   When CODB is unchecked:

* Restore the existing non-CODB form behavior exactly
* Execution Statement and Execution Statement Details return
* Existing dependency logic remains unchanged
* Existing required/optional rules remain unchanged

Behavior Rules:

* These changes apply ONLY when the CODB checkbox is checked
* Checking CODB should simplify the form immediately
* Unchecking CODB should restore the full standard flow

Constraints:

* Do NOT reorder fields
* Do NOT redesign the flyout
* Do NOT change checkbox styling
* Do NOT change split button behavior
* Do NOT change create-task success behavior
* Do NOT modify Project dropdown behavior
* Only update the conditional CODB checked-state form behavior

Success Criteria:

* CODB checked hides Execution Statement and Execution Statement Details
* In CODB mode, required fields are Task Title, WBS Attribute, Executing Activity, and Appropriation, with Funding Source optional
* WBS Attribute and Executing Activity no longer say “Not required for CODB tasks”
* Appropriation no longer references Execution Statement population
* Funding Source remains enabled and simply indicates it is optional
* Non-CODB behavior remains unchanged

Change type:
Behavioral + dependent field logic

Scope:
Create Task flyout panel only

* Execution Statement
* Appropriation (APPN)
* Funding Source

Objective:
Update dependent field behavior so that selecting an Execution Statement auto-populates Appropriation and Funding Source when there is only one valid option, while still allowing user selection when multiple valid options exist.

Changes:

1. Execution Statement → Appropriation auto-population

* When the user selects an Execution Statement:

  * look up all valid Appropriation (APPN) options associated with that Execution Statement

Behavior:

* If exactly 1 APPN is valid:

  * auto-select that APPN
* If more than 1 APPN is valid:

  * do NOT auto-select
  * enable the APPN dropdown
  * require the user to choose one
* If no APPN is valid:

  * leave field empty
  * preserve existing empty/error-safe behavior

2. Execution Statement / APPN → Funding Source auto-population

* Funding Source must be populated based on the selected Execution Statement and resolved APPN

Behavior:

* If exactly 1 Funding Source is valid:

  * auto-select that Funding Source
* If more than 1 Funding Source is valid:

  * do NOT auto-select
  * enable the Funding Source dropdown
  * require the user to choose one
* If Funding Source options depend on APPN first:

  * wait until APPN is selected or auto-selected
  * then evaluate Funding Source options using the same rule above

3. Preserve user choice

* If multiple valid options exist:

  * user must be able to open the dropdown and manually choose
* Auto-population must NOT remove the ability to manually change the selected value where multiple valid mappings exist

Field Mapping:

* Execution Statement → searchable dropdown
* Appropriation (APPN) → searchable dropdown
* Funding Source → searchable dropdown

Behavior Rules:

* Auto-populate only when there is exactly one valid option
* Do NOT force manual selection when there is only one valid option
* Do NOT overwrite a valid user-selected value unless upstream selection changes
* If the user changes Execution Statement:

  * recalculate APPN options
  * recalculate Funding Source options
  * clear invalid downstream selections
* If the user changes APPN:

  * recalculate Funding Source options
  * clear invalid Funding Source selection if needed

Pattern Anchors:

* Reuse the existing searchable dropdown pattern exactly
* Keep search inputs at the top of dropdowns
* Preserve current field order, labels, and layout

Constraints:

* Do NOT remove search boxes from dropdowns
* Do NOT change field order
* Do NOT change labels
* Do NOT introduce new helper panels, modals, or new components
* Do NOT restyle the fields
* Do NOT change unrelated validation behavior
* Only update dependency logic for APPN and Funding Source

Success Criteria:

* Selecting an Execution Statement auto-selects APPN when only one valid APPN exists
* Selecting an Execution Statement does not auto-select APPN when multiple valid APPNs exist
* Funding Source auto-selects when only one valid option exists
* Funding Source remains user-selectable when multiple valid options exist
* Downstream selections recalculate correctly when upstream selections change
* No regressions to searchable dropdown behavior

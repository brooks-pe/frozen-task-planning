Change type:
Structural + visual refinement

Scope:
Create Task flyout only

* Non-CODB project flow
* Execution Statement dropdown options

Objective:
For non-CODB projects, remove the Appropriation and Funding Source fields from the flyout and instead show a right-aligned badge on each Execution Statement dropdown option to communicate the associated appropriation / funding context.

Changes:

1. Remove fields for non-CODB flow only

* When Project is NOT `CODB`:

  * remove/hide the `Appropriation (APPN)` field
  * remove/hide the `Funding Source` field
* These two fields should no longer appear in the visible non-CODB form

2. Preserve CODB behavior

* When Project = `CODB` and the CODB checkbox flow is active:

  * keep the existing CODB-specific field behavior unchanged
  * do NOT remove Appropriation or Funding Source from CODB flow
* This update applies ONLY to non-CODB projects

3. Add badge to Execution Statement dropdown options

* In the Execution Statement searchable dropdown, add a right-aligned badge to each dropdown option row
* Keep the existing info icon on the left
* Keep the existing hover preview behavior
* Keep the existing search input at the top

4. Add a third execution statement example

* Add a third realistic Execution Statement example to the dropdown so there are 3 visible examples total

Use these three example options:

Option 1:
Title: `Surface Ship Undersea Warfare Modernization`
Badge label: `O&MN`

Option 2:
Title: `Littoral Combat Systems Readiness Improvement`
Badge label: `BLI 0603`

Option 3:
Title: `Expeditionary Mission Support Coordination`
Badge label: `None`

5. Badge placement and alignment

* Badges must be right-aligned within each dropdown option row
* All badges should stack neatly with the same right edge
* Badge widths must be equalized:

  * use the width of the widest badge as the shared badge width
  * all other badges match that width
* Maintain consistent spacing between:

  * left info icon
  * execution statement title
  * right badge

6. Badge styles

* `O&MN` badge:

  * use the existing O&MN appropriation badge style/color already used elsewhere in the app

* `BLI 0603` badge:

  * use the existing RDTEN appropriation badge color/style already used elsewhere in the app
  * do NOT invent a new badge color

* `None` badge:

  * use a neutral gray badge style
  * it should clearly read as “no mapped funding / appropriation context”

7. Execution Statement title truncation

* It is acceptable to truncate the Execution Statement title within the dropdown row if needed to comfortably fit the badge without cramming
* If truncated:

  * keep single-line truncation with ellipsis
* Do NOT wrap dropdown option rows to multiple lines
* The existing hover card already covers the full statement preview

8. Preserve current selected-state behavior

* Selecting an Execution Statement should continue to behave as it currently does for non-CODB projects, except that Appropriation and Funding Source fields are no longer shown
* Keep the existing Execution Statement Details field behavior unless explicitly changed elsewhere

9. Preserve existing patterns

* Reuse existing badge styles already implemented in SyncPoint
* Reuse existing searchable dropdown pattern exactly
* Reuse existing hover card behavior exactly

Behavior Rules:

* Non-CODB projects:

  * no visible Appropriation field
  * no visible Funding Source field
  * funding context is communicated through Execution Statement option badges
* CODB project flow:

  * unchanged from current CODB behavior
* Dropdown rows remain compact and scannable

Constraints:

* Do NOT redesign the Create Task flyout
* Do NOT change Project dropdown behavior
* Do NOT remove the info icon or hover card from Execution Statement options
* Do NOT introduce new badge variants beyond reusing existing styles
* Do NOT wrap option rows to multiple lines
* Do NOT modify Create Task success or split-button behavior
* Only update:

  * non-CODB field visibility
  * execution statement option rows
  * addition of the third example option

Success Criteria:

* Appropriation and Funding Source are hidden for non-CODB projects
* CODB behavior remains unchanged
* Execution Statement dropdown shows 3 example options
* Each option has a right-aligned badge
* Badges are equal width and visually aligned
* Execution Statement titles may truncate cleanly to make room for badges
* Hover preview and search remain intact
* No adjacent regressions are introduced

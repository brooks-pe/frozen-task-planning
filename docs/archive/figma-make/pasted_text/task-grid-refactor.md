Change type:
Visual + data-display refinement

Scope:
Task Planning → Task Grid table only

Objective:
Improve sort-state visibility in the header and reduce horizontal pressure in Draft rows by replacing long placeholder text in financial columns with compact symbols plus hover tooltips.

Changes:

1. Active sort header emphasis

* For the currently sorted column header, make the header text a darker / stronger color than the unsorted headers
* Keep the existing sort arrow indicator
* The sorted header should now use BOTH:

  * the arrow
  * darker header text color
* Reuse an existing darker semantic text color already used in the app
* Do NOT introduce a new custom color

2. Preserve unsorted header styling

* All other unsorted column headers should remain in their current lighter / standard header state
* Do NOT restyle all headers equally

3. Draft-row compact financial display

* For rows in Workflow State = Draft only:

  * Requested → display em dash
  * Allocated → display em dash
  * Delta → display em dash

Use a true em dash if possible:

* `—`

If implementation requires a fallback, use:

* `--`

4. Tooltip behavior for Draft financial cells

* On hover over those draft-state em dash values, show tooltips with:

  * Requested → `Not Yet Estimated`
  * Allocated → `Not Yet Allocated`
  * Delta → `Not Applicable`

5. Tooltip rules

* Reuse the existing tooltip pattern already used elsewhere in the app
* Tooltips should appear only for the Draft-state compact symbols in these three columns
* Do NOT add tooltips to non-Draft financial values

6. Reduce column width pressure

* After replacing Draft-state placeholder text with compact symbols:

  * reduce the width of Requested, Allocated, and Delta columns modestly
  * give the reclaimed width to more content-heavy columns, especially:

    * Project
    * Title
* Keep numeric values readable in non-Draft rows
* Do NOT overly compress the financial columns

7. Preserve non-Draft rows

* For non-Draft rows:

  * keep existing Requested / Allocated / Delta value formatting unchanged
  * continue showing numeric values as they do now

8. Preserve table structure

* Keep:

  * current column order
  * current sorting behavior
  * current two-line content wrapping behavior
  * current tooltip behavior for truncated text
* Do NOT redesign the table

Behavior Rules:

* Only Draft rows get compact symbol display in financial columns
* Only the active sorted column gets darker header emphasis
* Width rebalance should be subtle and content-driven, not a full table redesign

Constraints:

* Do NOT change row order
* Do NOT change data values for non-Draft rows
* Do NOT remove the sort arrow
* Do NOT introduce new badge styles or icons
* Do NOT modify search/filter controls
* Only update:

  * active sort header emphasis
  * Draft-row financial display
  * modest column width rebalance

Success Criteria:

* The active sorted column header is visually darker than other headers
* Draft rows show compact em dash values in Requested / Allocated / Delta
* Hovering those Draft em dashes shows the correct tooltip text
* Financial columns become slightly narrower
* Project and Title gain some horizontal room
* No adjacent table regressions are introduced

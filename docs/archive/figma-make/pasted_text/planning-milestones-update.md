Change type:
Behavioral + content update + contained widget refinement

Scope:
Task Planning Dashboard only

* Planning Milestones widget

Objective:
Update the Planning Milestones widget to use the 14 milestone steps and due dates from the legacy tool, while preserving the existing SyncPoint widget style and adding controlled scrolling + next-up focus behavior.

Changes:

1. Replace milestone content with legacy milestone list

* Update the Planning Milestones widget content to show these 14 milestones in this exact order, with step numbers included in the visible label:

1. PM approve FY North Stars (Top-Level Requirements) — 21 Feb 2025

2. Establish PAPM Top-Level Requirements for the FY25 (North Star Inputs) with Metric. — 14 Mar 2025

3. Create Task Shells and submit to supporting Activity — 18 Apr 2025

4. APM Acceptance — 6 Jun 2025

5. APM push to Awaiting Allocation — 13 Jun 2025

6. BFM Release Planning Year Controls — 12 May 2025

7. PAPM Distribute funds to APMs — 23 May 2025

8. APM Allocate Task, Complete Risk Process and submit to PAPM — 18 Jul 2025

9. PAPM Review and Accept Tasking (Per PMC) — 1 Aug 2025

10. Develop PMC Briefs — 8 Aug 2025

11. Conduct PMC — 13 Aug 2025

12. PAPMs/APMs resolve any PMC action and submit FINAL tasks for PM approval — 12 Sep 2025

13. PM approves all task — 30 Sep 2025

14. Activities submit Final Obligation phasing plan — 30 Sep 2025

15. Preserve existing SyncPoint widget style

* Keep the current Planning Milestones widget styling and layout pattern
* Do NOT restyle it to match the legacy widget
* Keep:

  * current header style
  * current row/list style
  * current typography roles
  * current date alignment pattern
* We are only merging the legacy milestone data into the existing SyncPoint component style

3. Make widget body scrollable

* The Planning Milestones widget should keep a fixed widget height similar to its current dashboard size
* Do NOT expand the widget vertically to show all 14 milestones at once
* The milestone list area inside the widget should be vertically scrollable

4. Make scrollability discoverable

* Ensure the internal scrollbar is visible / discoverable but still subtle
* Use an existing neutral scrollbar style if one already exists
* Do NOT hide the scrollbar completely
* Do NOT make the scrollbar overly heavy or visually distracting

5. Initial load focus behavior

* On dashboard load, automatically scroll the Planning Milestones list so that the row marked as the current “Next Up” milestone is positioned at the top of the visible list area
* This should happen automatically without user interaction

6. Next Up emphasis

* Keep the existing “Next Up” treatment concept
* The next-up milestone should:

  * appear at the top of the visible widget area on load
  * receive a subtle slow blue pulse or soft emphasis on initial page load
* The pulse must be calm and enterprise-appropriate
* It should stop automatically after a short duration
* Do NOT create continuous distracting animation

7. Past due milestone treatment

* Milestones whose due dates have already passed should visually differ from upcoming milestones
* Reuse existing semantic styling where possible
* Past due milestones should remain readable, but clearly look completed / in the past
* Do NOT use low-contrast gray-on-gray
* Do NOT hide past milestones
* Users must be able to scroll upward to review them

8. Future / upcoming milestone treatment

* Upcoming milestones after the current next-up item should remain visually standard and readable
* Do NOT over-style all future rows

9. Preserve widget structure

* Keep this as a simple list widget
* Do NOT add filters
* Do NOT add expand/collapse
* Do NOT add a separate card title area inside the widget body
* Do NOT convert to timeline or accordion

Behavior Rules:

* Widget uses internal scrolling only for the milestone list body
* Dashboard page layout must remain stable
* Auto-scroll should happen once on initial page load
* User can then freely scroll within the widget
* Auto-scroll must not fight the user after load

Constraints:

* Do NOT modify other dashboard widgets
* Do NOT change the dashboard page layout
* Do NOT change KPI cards
* Do NOT redesign the Planning Milestones widget
* Do NOT reorder milestones beyond the exact order listed above
* Do NOT omit the step numbers from milestone labels
* Only update content + contained scroll/focus behavior for this widget

Success Criteria:

* Planning Milestones widget shows all 14 legacy milestones in order with exact dates
* Widget keeps existing SyncPoint visual style
* Widget body is scrollable and does not expand to full height
* Scrollbar is discoverable
* On page load, the “Next Up” milestone is auto-positioned at the top of the visible list
* “Next Up” gets a subtle temporary blue emphasis
* Past milestones remain visible via upward scroll and are visually distinct from upcoming ones

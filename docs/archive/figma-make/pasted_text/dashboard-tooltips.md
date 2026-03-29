Implement Dashboard Tooltips (Scoped + Consistent)

Add tooltips across the Task Planning Dashboard using consistent patterns and the definitions below.

This is a targeted UX clarity enhancement. Do NOT change layout, spacing, component structure, or introduce new features.

1. Global Tooltip Behavior (STRICT)

Apply the following rules to all tooltips:

Tooltips must clarify meaning, not restate labels

Use plain, operational language

Limit to 1–2 sentences max

Avoid filler phrases like:

“This shows…”

“This indicates…”

When relevant, explain:

what is being counted

what triggers inclusion

how to interpret it

Interaction pattern

Tooltip appears on hover

Trigger via info icon (ⓘ)

Icon placement:

Right of section titles and KPI labels

Use consistent icon style and size across all widgets

Tooltip position:

Prefer top-right or right-aligned placement

Avoid covering key data

2. KPI Cards (Top Row)

Add an info icon to each KPI label.

Tasks Awaiting My Action

Tooltip:

Tasks currently requiring your review, approval, or action based on your role in the workflow.

Stalled Tasks

Tooltip:

Tasks with no workflow progress or updates within the defined inactivity threshold.

Tasks Near Deadline

Tooltip:

Tasks approaching key planning or milestone deadlines within the defined time window.

Overdue Tasks

Tooltip:

Tasks that have passed their planned milestone or completion date without progressing.

3. Workflow Progress Widget
Header Tooltip (on “Workflow Progress”)

Shows how tasks are progressing through the planning workflow. Bar length reflects cumulative progression, while counts indicate tasks remaining to reach each state.

(Ensure this reflects the current countdown model, not “tasks currently in state”)

Row-Level Tooltip (for each workflow state row)

If row hover is supported, apply this tooltip:

Percentage of tasks that have reached this stage or beyond. The number indicates how many tasks have not yet reached this stage.

Do NOT introduce additional labels or visual clutter.

4. Planning Milestones
Header Tooltip

Key planning deadlines that govern task progression through the workflow.

“Next Up” Indicator Tooltip (if hoverable)

The next upcoming milestone that requires attention based on the current planning schedule.

5. Funding Risk Widget
Header Tooltip

Compares planned task funding against allocated funding to identify shortfalls and potential impact.

Empty State Tooltip (if implemented)

Funding data will appear once allocations are released for the planning cycle.

Do NOT introduce funding type explanations.

6. Allocation Progress Widget
Header Tooltip

Shows how much available funding has been allocated to tasks within the planning cycle.

Empty State Tooltip

Allocation progress will be available once funding allocations are issued.

7. Recent Task Updates Table
Header Tooltip

Recently updated tasks across the planning cycle, including workflow changes and key edits.

8. Consistency Requirements (CRITICAL)

Use “Workflow State” terminology everywhere (do NOT introduce “Stage”)

Do NOT introduce:

tier logic

funding type explanations (Reimbursable / Direct Cite)

Maintain alignment with:

planning cycle terminology

allocation language

workflow progression concepts

9. Visual Consistency

All info icons:

Same size

Same color treatment (neutral, non-primary)

Same spacing from labels

Tooltips:

Same width behavior

Same padding and typography

Clean, enterprise styling (no decorative effects)

🎯 Outcome

The dashboard should now:

Require minimal explanation from training

Feel self-explanatory to a first-time user

Match the clarity level of:

Azure DevOps dashboards

Jira advanced boards

Enterprise planning systems
Final Terminology + Info Icon Standardization

Update the Task Planning Dashboard.

This is a UI polish pass. Do not change layout structure, spacing, or data logic.

1. Rename “Progress” → “Completed”

In the Workflow Progress widget:

Change column header:

Progress → Completed

Update associated tooltip

Replace existing tooltip with:

Percentage of tasks that have completed this workflow state.

2. Ensure column pairing is clear and consistent

Final column structure should be:

Workflow State

Completed

Remaining

These should read as a clear pair:

Completed = what’s done

Remaining = what’s left

Do not add additional explanatory text inline.

3. Standardize all info icons across the dashboard

Update all tooltip/info icons across the entire dashboard to use the same accent blue used in the Workflow Progress widget.

Apply to all widgets including:

KPI Cards (if/when icons are present)

Workflow Progress

Planning Milestones

Funding Risk

Allocation Progress

Recent Task Updates

Any section headers with info icons

Requirements

Use the existing SyncPoint accent blue (do not introduce a new shade)

Keep icon:

size

spacing

placement (right of title)
consistent with current pattern

Do NOT change icon type (keep same icon style, just update color)

4. Tooltip behavior consistency (global check)

Ensure all tooltips:

Appear on hover

Use consistent positioning

Follow the same visual style (dark background, white text)

Are limited to 1–2 sentences max

Use plain, operational language

Do not introduce:

“This shows…”

verbose explanations

inconsistent tone between widgets

5. Do NOT

Do NOT modify chart logic

Do NOT change data values

Do NOT adjust layout spacing

Do NOT introduce new UI elements

Do NOT rename anything else beyond “Progress” → “Completed”

🎯 Outcome

The dashboard should now have:

Clear, intuitive terminology:

Completed vs Remaining

Consistent visual language:

all info icons in accent blue

Unified tooltip system:

concise, operational, and predictable

This should feel on par with:

Azure DevOps dashboards

Jira reporting widgets

enterprise BI tooling
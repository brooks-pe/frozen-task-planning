Convert “Tasks Page” to HiFi (SyncPoint)

Implement the HiFi design for the Task Planning → Tasks page using the provided low-fidelity design as structure.

This page must align with existing SyncPoint UI patterns, particularly:

Page headers (as used across Dashboard / Execution Planning)

Table styling (AG Grid-based patterns)

Filter panels

Button hierarchy and placement

Do NOT redesign — translate to HiFi using established system patterns.

1. Page Header (Follow Existing Pattern)

Use the standard SyncPoint page header structure:

Title:

Tasks

Subtitle:

Browse and filter all tasks in the current planning cycle. Click a Task ID to open the Task Workspace.

Right-aligned actions:

Primary: Create Task

Secondary: Export

Follow same spacing, typography, and alignment as:

Execution Planning pages

G-Invoicing Reports screen

2. Filters Section (Standard Panel)

Use the existing Filters panel pattern (same as G-Invoicing / Execution Planning):

Fields:

Planning Year

Tier

Workflow State

Project

Funding Status

Executing Activity

Appropriation

Requirement

Risk

Behavior:

Inputs aligned in a single structured row (wrapping if needed)

Consistent field widths (do NOT auto-size randomly)

Include:

Reset Filters (right-aligned, link style)

Styling:

Use standard card container:

light background

subtle border

consistent padding

3. Tasks Table Container

Use the standard table card pattern:

Header section:

Title: Tasks List

Search bar: “Search by ID or title…”

Apply same header structure as:

Recent Task Updates

Performance Items table

Important:

Add bordered header container (same fix we just applied elsewhere):

Ensures the table feels like a single component

4. Table Structure (AG Grid Pattern)
Columns:

Task ID

Executing Activity

Title

Workflow State

Requested

Allocated

Gap

Actions

Column Behavior
Task ID

Blue link (navigates to Task Workspace)

Matches link styling used elsewhere

Workflow State

Use consistent terminology: Workflow State

No badges yet unless already standardized

Keep clean text for now (enterprise > decorative)

Financial Columns (IMPORTANT — Data Realism)
Requested

Total funding requested

Allocated

Funding assigned

Gap

Requested – Allocated

Enforce Realistic Data Rules

These must be reflected in the UI data:

Workflow State	Expected Behavior
Draft	Allocated = $0
BOE Build-Up	Partial or none allocated
Activity Acceptance+	Increasing allocation
Project Allocation	Fully allocated
Baselined	Fully allocated (Gap = $0)

🚨 Do NOT display impossible combinations:

Baselined with funding gap

Draft with allocated funding

Negative gaps

Gap Column Styling

Neutral when = 0

Highlight when > 0 (subtle, not aggressive)

follow existing financial variance styling if available

Actions Column

Clone action

Styled as:

inline button OR link (match existing pattern)

Right-aligned

5. Table Styling Rules

Follow existing AG Grid / SyncPoint standards:

Column headers:

ALL CAPS

13px semibold

Row height consistent

No vertical stacking issues

Proper column spacing (no crowding)

6. Interaction Consistency

Sorting enabled on key columns (Task ID, Workflow State, Funding)

Hover states consistent with other tables

Search filters table live

7. Layout + Spacing

Maintain strict alignment:

Page header → Filters → Table

Equal horizontal padding across sections

No shifting widths between components

8. Do NOT

Do NOT introduce new components

Do NOT redesign layout structure

Do NOT add badges unless already standardized

Do NOT use inconsistent colors

Do NOT allow unrealistic financial states

🎯 Outcome

This page should feel like a native extension of the existing system, comparable to:

Jira issue table

Azure DevOps backlog grid

Internal enterprise funding dashboards

It should achieve:

Immediate scannability

Financial clarity

Workflow awareness

Zero ambiguity in data interpretation
Task Planning Dashboard (HiFi)

Below is a clean, production-quality prompt you can drop directly into Figma Make.

🔹 Prompt — Task Planning Dashboard (HiFi Conversion)

We are creating a high-fidelity Task Planning Dashboard in the SyncPoint application.

This is a conversion from an existing low-fidelity design.
Do NOT redesign layout or change workflow logic.

1. Page Placement & Navigation

Add a new page under:

Task Planning (expanded in left navigation)

Insert as the first item: "Dashboard"

Follow the same navigation behavior and styling used in:

Execution Planning → Dashboard

2. REQUIRED — Global Header Pattern (STRICT)

You MUST reuse the exact existing SyncPoint page header pattern:

Row 1 — Context Bar

Left:

Program Badge (e.g., PMS 420)

Version selector dropdown (e.g., “Version: Current Record”)

Right:

Action buttons (ghost + primary styles as appropriate)

Row 2 — Title Block

Page Title: Dashboard

Subtitle:

“Situational awareness for program managers. Review task status, funding health, and workflow progress at a glance.”

Breadcrumbs:

Home / Task Planning / Dashboard

Maintain:

Spacing

Typography roles

Alignment

Do NOT modify this pattern.

3. Overall Layout Structure

Use a 2-column responsive grid (same feel as Execution Planning dashboard):

Max width container

Consistent outer padding

Vertical stacking of sections

Card-based layout system

Spacing rules:

24px between major sections

16px between cards

12px internal card padding baseline

4. KPI Summary Row (Top Cards)

Create 4 KPI cards in a single row:

Tasks Awaiting My Action

Stalled Tasks

Tasks Near Deadline

Overdue Tasks

Styling Requirements

Use existing KPI card component style

Improve hierarchy:

Label → small, muted

Value → large, bold (primary emphasis)

Supporting text → subtle secondary line

Add left accent border or subtle icon (consistent with system style)

Ensure:

Equal height

Even spacing

Responsive behavior

Data Treatment

Numbers must feel prominent (like Jira dashboards)

Supporting text should NOT compete visually

5. Workflow Progress Section

Left column — large card:

Structure:

Title: “Workflow Progress”

Subtitle: “56 tasks in FY2026 planning cycle”

Content:

Vertical list of workflow states:

Draft

BOE Build-Up

Activity Acceptance

Project Acceptance

Project Allocation

Impact Assessment

Project Approval

Program Approval

Baselined

Visual Design Improvements:

Replace flat bars with:

Modern progress bars

Rounded edges

Subtle background track

Show:

% inside or adjacent to bar

Count aligned right

Critical:

This represents Workflow State (NOT status) — do NOT relabel

6. Planning Milestones (Right Column)

Card with table-style layout:

Improvements:

Highlight “Next Up” milestone:

Use subtle background tint OR left accent bar

Improve readability:

Stronger typography for milestone name

Muted secondary text for dates

Add:

Calendar icon in header

Use:

Clean row separators (light dividers)

7. Funding Risk + Allocation Progress

Two side-by-side cards:

Funding Risk

Allocation Progress

Empty State Handling (IMPORTANT):

Show clean empty state:

Icon (subtle, neutral)

Text: “Awaiting FY27 Funding Allocation”

Center content vertically + horizontally

Do NOT show fake data

8. Recent Task Updates (Table)

Full-width table at bottom.

Table Improvements:

Use existing data table component

Columns:

Task ID (link style)

Title

Workflow State (NOT “Stage”)

Updated By

Updated On

Enhancements:

Make Task ID:

Blue link

Hover underline

Add:

Subtle row hover state

Improve header:

Stronger column header typography

Add top-right filters:

Last 24 Hours

Last 5 Days

Last 30 Days (active state styled)

9. Visual Design System Enforcement

Apply SyncPoint design system:

Typography

Use defined semantic roles:

Section Title

Body

Helper text

Column headers (ALL CAPS, 13px)

Colors

Neutral grays for structure

Blue for actions / links

Status colors used sparingly

Elevation

Cards use:

Light border

Minimal shadow (or none)

Icons

Use consistent system icon set

Do NOT overuse icons

10. Interaction Expectations

KPI cards are clickable (optional hover state)

Table rows clickable

Filters toggle active states

Milestone highlight is static (not interactive)

11. DO NOT DO

Do NOT introduce Tier selection

Do NOT show funding amounts in KPI cards unless already present

Do NOT rename Workflow State

Do NOT redesign layout structure

Do NOT introduce new workflow stages

12. Where You MAY Improve

Claude is allowed to:

Improve spacing consistency

Refine alignment

Introduce subtle visual hierarchy improvements

Slightly modernize components (within enterprise norms)

Introduce better empty states

🎯 Outcome Goal

This dashboard should feel like:

A clean, executive-level operational dashboard

Comparable to:

Jira dashboards

Azure DevOps overview pages

SAP Fiori analytics pages

It should NOT feel:

Experimental

Over-designed

Consumer-style
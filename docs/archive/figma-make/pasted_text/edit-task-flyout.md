Task: Implement “Edit Task Summary” Flyout — Reuse Create Task Structure with Controlled Editability

Context

We are adding functionality to the Edit button in the Task Summary section of the Task Workspace.

Clicking Edit should open a right-side flyout panel that allows users to update editable task metadata.

This flyout should be structurally aligned with the existing Create Task flyout, but:

Pre-populated with current values

Only allows editing of appropriate fields

Respects system-driven / locked fields

This is an extension of an existing pattern, not a new design.

OBJECTIVE

Create an Edit Task flyout that:

Reuses the Create Task layout and components

Loads current task values

Allows editing of user-controlled fields

Clearly distinguishes editable vs system-driven fields

Saves updates back to the Task Summary

FLYOUT BEHAVIOR
Trigger

Clicking Edit button in Task Summary

Panel Behavior

Right-side slide-in flyout (same as Create Task)

Same width, padding, spacing, and header structure

HEADER

Title:
Edit Task

Subtext:
Update task metadata and planning attributes. Changes will be saved to the current task.

FIELD STRUCTURE

Reuse the same field order and grouping as Create Task:

Task Type (CODB / Non-CODB)

Task Title

Execution Statement (dropdown)

Project (derived)

WBS Attribute (dropdown)

Appropriation (derived badge)

Funding Source

Executing Activity

Planning Year

Period of Performance (date range)

FIELD EDITABILITY RULES
Editable Fields (Primary User Inputs)

These should be fully interactive:

Task Title

Task Type

WBS Attribute

Funding Source

Executing Activity

Planning Year

Period of Performance

Conditionally Editable / Controlled Fields

Execution Statement

Editable ONLY if allowed by system rules

If not editable → render as disabled dropdown

Derived / Locked Fields (Read-Only)

These must NOT be editable:

Project

Display as read-only text

Include helper text: “Driven by Execution Statement”

Appropriation

Display as badge (same style as summary)

Include helper text: “Driven by Execution Statement”

DATA BEHAVIOR

All fields pre-populated from current task

Changes update Task Summary on save

No navigation — inline update only

FOOTER ACTIONS

Left:
Cancel

Right:
Save Changes (Primary button)

VALIDATION

Maintain same required fields as Create Task

Prevent saving if required fields are empty

Inline validation messages (reuse existing pattern)

DESIGN RULES

Reuse all Create Task components (inputs, dropdowns, date pickers)

Maintain identical spacing, typography, and alignment

Do NOT introduce new component styles

Do NOT redesign form layout

IMPORTANT CONSTRAINTS

Do NOT allow editing of:

Project

Appropriation

Do NOT introduce:

New fields

Workflow logic changes

Navigation changes

Do NOT modify Task Summary layout

ENTERPRISE UX PARALLEL (for reasoning)

This should behave like:

Jira Edit Issue panel

Azure DevOps Work Item edit form

Where:

Core identity fields are editable

System-driven fields are visible but locked

Form structure mirrors creation flow for consistency

OUTCOME

A clean, predictable Edit Task flyout that:

Feels identical to Create Task

Clearly separates editable vs system-driven data

Enables safe metadata updates without breaking workflow

Reinforces consistency across the application
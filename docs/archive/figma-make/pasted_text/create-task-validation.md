Add Required Field Validation + Disable Create Task Button

Update the Create Task flyout on the Task Planning → Tasks page.

This is a validation + UX refinement pass. Do not redesign the panel.

1. Disable Create Task button by default

When the panel opens:

The Create Task split button (main action) should be:

Disabled

Visually distinct from enabled state (reduced opacity or muted styling)

Not clickable

The dropdown trigger may remain visible, but:

Selecting options should not bypass validation

2. Define required fields

The Create Task action should only be enabled when the following fields are completed:

Required fields:

Task Type (default is already selected → satisfied)

Task Title

Execution Statement

Funding Source

Executing Activity

Planning Year

Period of Performance

Both start date and end date required

3. Conditional requirement (Non-CODB)

If Non-CODB is selected:

Also require:

Program Initiative (auto-populated)

L1 Requirement (auto-populated)

These should count as “valid” once populated via Execution Statement.

4. Enable button when form is valid

Once all required fields are satisfied:

Enable the Create Task button

Restore full primary styling

Make it clickable

5. Inline validation behavior (lightweight)

Do NOT introduce heavy validation UI.

Instead:

While incomplete:

Button remains disabled

No error messages shown yet

Optional (recommended subtle UX):

If user attempts interaction (e.g., clicks disabled button or submits via keyboard):

Highlight missing required fields

Use subtle indicators:

red border OR

helper text: “Required”

Keep it minimal and enterprise-style.

6. Field-level validation rules
Task Title

Must not be empty

Trim whitespace (no blank-only input)

Execution Statement

Must be selected (not placeholder)

Funding Source

Must be selected

Executing Activity

Must be selected

Only enabled after Execution Statement → respect existing dependency

Planning Year

Default value counts as valid

Period of Performance

Both dates required

Ensure:

Start date ≤ End date

7. Preserve existing behavior

Do NOT change:

Split button structure

Create & Stay Here flow

Toast behavior

Row insertion + pulse highlight

Field layout or order

System-driven field logic

8. UX intent

The form should feel:

Guided

Controlled

Low-friction

Enterprise-grade

Users should immediately understand:
👉 “I need to fill these fields before I can create a task”

Without being overwhelmed by validation messaging.

9. Outcome goal

After this update:

Create Task button starts disabled

Becomes enabled only when form is complete

Prevents invalid task creation

Maintains fast, clean workflow
Implement Split Create Task Button (Stay-on-Page Flow Only)

Update the Create Task flyout on the Task Planning → Tasks page.

This is a targeted interaction enhancement. Do not redesign the flyout layout or form structure.

1. Replace the current single primary action with a split button

At the bottom-right of the flyout, replace the current single Create Task button with a split button pattern.

Structure

Main primary button label:

Create Task

Attached dropdown trigger (caret)

Secondary button remains:

Cancel

The split button should feel like a cohesive enterprise control, similar to:

Azure DevOps save/split actions

GitHub split action buttons

standard enterprise toolbar action patterns

2. Default behavior of main Create Task button

Clicking the main Create Task button should:

Create the new task

Close the flyout

Keep the user on the Tasks page

Add the new task to the top of the Tasks List table

Set the new task’s Workflow State = Draft

Show a success toast

Briefly apply a success pulse / highlight to the new row so the user can easily spot it

This is the primary behavior for now.

3. Dropdown options

The split button dropdown should include:

Create & Stay Here

Create & Open Task

Behavior for now

Create & Stay Here

Same behavior as the default main button action

Create & Open Task

Show as an available option in the dropdown

Do not navigate anywhere yet

It may be shown as:

disabled

or non-functional placeholder

or enabled visually but not wired to a destination yet

Preferred approach:

Show it in a way that communicates it is a future path, but do not break the UI

Do not invent the task details page behavior yet.

4. Table update behavior after creation

When a task is created via the stay-on-page flow:

Insert the new task as the first row in the Tasks List

This should align with the current default sort behavior (newest / top placement)

New row should display realistic created-task values:

new Task ID

Draft workflow state

no allocated funding

gap reflects requested amount if requested exists

status consistent with task creation rules

Do not add impossible data combinations.

5. Success toast

Show a lightweight success toast after creation.

Suggested copy:

Task created

or

Task TSK-0538 created

Toast should:

feel consistent with the app’s enterprise style

be brief and unobtrusive

confirm success clearly

6. New row pulse / highlight

After the table refreshes with the new row at the top:

briefly apply a success pulse / highlight treatment to that new row

this should draw attention without being flashy

Examples of acceptable treatment:

subtle green-tinted row background fade

brief soft highlight pulse

Do not:

use strong animation

use bright neon success styling

make it feel consumer-product-like

The effect should be:

noticeable

brief

professional

7. Preserve existing flyout behavior and form logic

Do not change:

field order

conditional logic

read-only/system-driven field behavior

button placement other than replacing Create Task with split button

form spacing

radio/dropdown/input styling

8. Split button UX expectations

Main button should trigger the default stay-on-page behavior directly

Dropdown trigger should expose both action options

Pattern should feel:

clear

compact

enterprise-standard

reusable elsewhere in SyncPoint later

Do not make this feel experimental or custom for its own sake.

9. Do not build task details navigation yet

Important:

Do not create or simulate the destination page for Create & Open Task

Do not invent a fake navigation target

This option is being introduced visually now, but the destination flow will be implemented later

10. Outcome goal

The Create Task flyout should now support:

a modern split-button action pattern

a smooth default create and remain on page workflow

immediate confirmation through:

toast

row insertion

row highlight pulse

This should make task creation feel fast, controlled, and production-ready.
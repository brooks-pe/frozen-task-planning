Add the status tabs section below the Data Filters panel on the Funding Work Plans page.

Reference:
The dev server screenshot shows three status tabs:
- Planning
- Ready for Execution
- In Progress

We want to replicate the structure and functionality but use the SyncPoint design system styling.

Tabs

Create a horizontal tab group with three tabs in this order:

1. Planning
2. Ready for Execution
3. In Progress

Icons

Include the same icons used in the dev server example:

Planning → hamburger/list style icon  
Ready for Execution → open circle icon  
In Progress → half-filled circle icon

Use existing icon library components already used elsewhere in the app.

Selected State Styling

The selected tab should use the SyncPoint accent selection color:

#147DB9

Selected tab behavior:
- Background: #147DB9
- Text: white
- Icon: white

Unselected tabs:
- Neutral surface background
- Standard text color
- Standard icon color

Interaction

Default selected tab:
Planning

When a tab is selected:
- It becomes the highlighted blue tab
- Other tabs revert to neutral state

Layout

- Tabs appear directly below the Data Filters panel
- Align left with page content
- Use the same horizontal spacing used for other control groups in Execution Planning pages

Constraints

- Reuse the existing button/tab styling primitives where possible
- Do NOT introduce new typography styles
- Do NOT modify the filters section above
- Do NOT build the table yet
Update the Data Filters section on the Funding Work Plans page to include the View selector inside the filter panel.

The goal is to keep all filtering controls inside the filter section and remove the "View: All / Assigned" control from the tab area.

Use the existing SyncPoint filter panel pattern.

FILTER PANEL STRUCTURE

The filter row should contain the following elements in this order:

1. Execution Year dropdown
2. Appropriation dropdown
3. PUCC dropdown
4. Activity dropdown

After the dropdown filters, add a subtle vertical divider.

VIEW FILTER

Add a new filter group labeled:

View

The label styling must match the existing dropdown labels:
- Same font size
- Same alignment
- Positioned above the control

Below the label, add a radio button group with two options:

All  
Assigned

Default selection: All

Use the same radio button styling used in other filter sections (e.g., Active Years / All).

LAYOUT

Final order inside the filter row should be:

Execution Year | Appropriation | PUCC | Activity | divider | View radio buttons | divider | Clear Filters

The Clear Filters button should remain aligned on the far right as in other filter panels.

VISUAL RULES

- Use the same spacing and alignment as other filters
- Reuse the existing radio button component
- Reuse the subtle divider style used elsewhere in the filter panel
- The "View" label must align with the other filter labels above the dropdowns

CLEANUP

Remove the existing "View: All / Assigned" segmented control from the tab area below the filters.

CONSTRAINTS

- Do not change the Data Filters panel styling
- Do not modify the status tabs
- Do not change any dropdown filter behavior
- Only relocate the View control into the filter panel and convert it to radio buttons
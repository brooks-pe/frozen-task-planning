Add the Filters section to the Funding Work Plans page.

Important:
Use the existing SyncPoint filter panel pattern already used in the prototype (the same pattern used on other Execution Planning screens). 
Do NOT copy the visual structure from the dev server screenshot. Only match the filter content.

The goal is to keep visual consistency with the SyncPoint design system while matching the same filtering options.

Filters Section Structure

Use the standard filter panel component:

Section title:
Data Filters

Inside the filter panel add four dropdown filters in this order:

1. Execution Year
   Default value: All Execution Years

2. Appropriation
   Default value: All Appropriations

3. PUCC
   Default value: All PUCCs

4. Activity
   Default value: All Activities

Layout Requirements

- Use the same grid layout used by other filter panels in the prototype.
- Four filters should appear in a single row on desktop.
- Filters should wrap responsively on smaller screens.
- Maintain the same spacing, label styles, and dropdown styling used elsewhere.

Buttons

Use the existing filter panel actions pattern already implemented in the prototype:

Include:
- Clear Filters
- Hide Filters

These should follow the same button styling and placement used in other pages in the prototype.

Do NOT replicate the dev server's button styling or placement.

Constraints

- Reuse the existing filter panel component.
- Reuse the existing dropdown component.
- Do not create new styles.
- Do not change the layout of the header or other page sections.
- Only add the filters section below the page header.
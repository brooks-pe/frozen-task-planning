Update: Task Summary → replace Edit flyout with inline edit mode

Change type: Structural interaction change

Context:
We are changing Task Summary editing behavior in the Task Workspace.

Today, clicking Edit opens a side panel flyout that largely reuses the Create Task / Edit Task form. We want to replace that with inline editing directly inside the Task Summary card.

Important:
Do NOT invent new field patterns.
When a field becomes editable, it must use the same field type and interaction pattern that field already uses elsewhere in the product (especially the Create Task / Edit Task patterns and existing searchable dropdown pattern).

Objective:
When the user clicks Edit in the Task Summary header, the Task Summary card should enter inline edit mode. Editable fields should become the correct input controls in-place, while read-only/derived fields remain read-only. The card layout must remain stable.

Header behavior:
- Replace the Edit button with:
  - Save (primary)
  - Cancel (secondary)
- Keep Hide Task Summary as the far-right collapse control
- Do not create a new footer action row

Field mapping rules:
Use the correct existing field control for each editable field.

Editable fields and required control types:

1. Task Type
- Use the existing radio button pattern
- Options:
  - CODB
  - Non-CODB

2. WBS Attribute
- Use the existing dropdown selector pattern
- Include the existing searchable dropdown behavior with search field at the top

3. Funding Source
- Use the existing dropdown selector pattern
- Include the existing searchable dropdown behavior with search field at the top

4. Executing Activity
- Use the existing dropdown selector pattern
- Include the existing searchable dropdown behavior with search field at the top

5. Planning Year
- Use the existing dropdown selector pattern
- Include the existing searchable dropdown behavior with search field at the top only if that is already how Planning Year behaves elsewhere; otherwise reuse its exact existing selector behavior

6. Period of Performance
- Use the existing start/end date field pattern with date picker controls

7. Previous Task
- Use the appropriate existing task relationship selector pattern
- If no dedicated relationship selector exists yet, use the existing searchable dropdown pattern as the interim pattern

8. Associated Tasks
- Use the appropriate existing task relationship selector pattern
- If no dedicated relationship selector exists yet, use the existing searchable dropdown pattern as the interim pattern

9. Next Task
- Use the appropriate existing task relationship selector pattern
- If no dedicated relationship selector exists yet, use the existing searchable dropdown pattern as the interim pattern

10. Objective
- Use a multiline text input / textarea style field appropriate for narrative text
- Keep it inline within the existing Objective field area
- Do not open a flyout for Objective editing

Read-only / derived fields:
These fields should remain read-only in inline edit mode and should not become editable:
- Execution Statement
- Project
- Appropriation
- Program Initiative
- L1 Requirement
- Requested
- Allocated
- Gap
- Project Lead
- Activity Lead
- Operational Status
- Tier

For read-only / derived fields:
- Preserve current visual styling as much as possible
- If helpful text is already used elsewhere (for example “Derived from Execution Statement”), you may reuse that pattern subtly, but do not add unnecessary helper text everywhere

Critical layout rules:
- Do not redesign Task Summary
- Do not change the established grid / row structure
- Do not add or remove rows
- Keep all fields in their current positions
- Swap read-only values for the correct in-place controls only within their existing field containers
- Avoid layout shift as much as possible
- Preserve the existing label/value rhythm

Dropdown/search rules:
- Wherever a field uses a dropdown pattern that already supports search elsewhere in the product, reuse that same searchable dropdown pattern
- Do not create a new dropdown variant
- Search field should appear at the top of the opened dropdown menu, matching the existing pattern

Behavior rules:
- Clicking Edit enters inline edit mode
- Clicking Cancel discards unsaved changes and returns the Task Summary to read-only mode
- Clicking Save saves changes and returns the Task Summary to read-only mode
- Preserve existing values when entering edit mode
- Do not route away, open a side panel, or reload the page

Constraints:
- Apply only to Task Summary edit behavior
- Do not modify Overview in this prompt
- Do not change Tier Assessment flow
- Do not change workflow footer behavior
- Do not reuse the old flyout for editing
- Do not invent new component patterns when an existing one already exists

Success criteria:
- Edit mode happens inline inside Task Summary
- Each editable field uses the correct existing control type
- Searchable dropdowns reuse the established searchable pattern
- Read-only/derived fields remain read-only
- Save/Cancel replace Edit in the header cleanly
- The Task Summary remains visually stable and enterprise-consistent
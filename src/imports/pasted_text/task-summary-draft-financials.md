Task: Refine Draft-State Financial Fields in Task Summary — Remove Unrealistic Requested / Allocated / Gap Values

Context:
We are refining the Task Summary section in the SyncPoint Task Workspace.

Current issue:
The Draft-state example currently shows populated financial values for:

Requested

Allocated

Gap

This is misleading for Draft state because detailed BOE has not been built yet, allocation has not occurred yet, and the UI should not imply financial completeness before those workflow steps are reached.

This is a correction pass only.
Do NOT redesign the Task Summary.

OBJECTIVE

Update the Draft-state Task Summary so the financial fields reflect realistic early-stage data behavior.

In Draft:

Requested should not appear as a finalized dollar amount

Allocated should not appear as a valid funded value

Gap should not appear as a computed amount

The UI must support progressive enrichment and avoid implying completeness too early.

REQUIRED DRAFT-STATE VALUES

For the current Draft example, update these fields as follows:

Requested

Replace current dollar amount with:
Not Yet Estimated

Allocated

Replace current dollar amount with:
Not Yet Allocated

Gap

Replace current dollar amount with:
Not Applicable

BEHAVIOR INTENT

These values should read as state-aware placeholders, not actual financial data.

Interpretation:

Requested becomes populated only after BOE development establishes an estimate

Allocated becomes populated only after funding allocation occurs

Gap becomes meaningful only once Requested and Allocated are both valid

Do NOT implement this full logic yet.
Just correct the current Draft-state mockup to reflect this behavior.

VISUAL RULES

Keep the same Task Summary grid layout

Preserve label/value formatting

Use the same typography and spacing as other metadata fields

Do NOT style these as badges

Render them as normal metadata values / placeholder text consistent with the rest of the summary

If needed, use slightly muted body text for these placeholder values, but keep them readable.

DO NOT CHANGE

Row structure

Field ordering

Other Task Summary values

Tier behavior

Banner copy

Edit button

Any other page sections

DESIGN PRINCIPLES

Do not imply data completeness in Draft

Support progressive enrichment

Make placeholder states explicit and honest

Preserve layout stability while improving data realism

OUTCOME

A corrected Draft-state Task Summary that:

no longer shows unrealistic financial totals

accurately reflects early-stage task maturity

preserves the existing layout and visual structure

better aligns the UI with real planning workflow progression

After this pass, the Task Summary should clearly communicate that financial values have not yet been established in Draft state.
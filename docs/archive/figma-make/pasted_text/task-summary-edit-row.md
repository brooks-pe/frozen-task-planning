Task Summary Edit Button Row (Surface Separation Fix)

We are refining the Task Summary section to correct layout and surface behavior.

Do NOT redesign the component.
This is a targeted structural adjustment only.

🎯 Objective

Remove the Edit button from the metadata grid

Place it in its own row

Ensure that this new row exists outside of the white content surface

🔧 Required Changes
1. Preserve Existing Structure

Keep the following unchanged:

Section container (light gray background)

Section header (Task Summary + Hide control)

White content surface containing:

Row 1 (Task Context)

Row 2 (Financial + Timing)

Row 3 (Ownership + Status)

2. Fix Row 3 Alignment

Ensure Row 3 uses the same 5-column grid as Rows 1 and 2

Fields must align vertically across all rows

Remove any layout influence from the Edit button

3. Remove Edit Button from White Content Area

The Edit button must no longer exist inside the white content surface

It must not be part of any metadata row

4. Create New Action Row (Outside White Surface)

Add a new row below the white content surface

This row must:

Sit on the section’s gray background (NOT white)

Span full width of the section

Contain ONLY the Edit button

Use standard section padding

5. Divider Behavior

Keep dividers between the 3 metadata rows (inside white surface)

Do NOT extend the white surface downward

No divider required below the white surface unless already part of section pattern

6. Edit Button Alignment

Right-align the Edit button within the new row

Maintain existing styling (secondary button with icon)

Vertically center within the row

📐 Layout Rules (Critical)

Metadata grid (3 rows) must remain:

Fixed 5-column layout

Perfect vertical alignment across rows

Action row must be completely independent of the grid

⚠️ Do NOT

Do NOT extend the white background to include the Edit button row

Do NOT place the Edit button inside the metadata grid

Do NOT alter spacing, typography, or field structure

Do NOT introduce new styling patterns

✅ Success Criteria

White content surface contains ONLY the 3 metadata rows

Edit button sits on gray background below the white surface

All metadata fields align cleanly across rows

Clear visual separation between data and actions
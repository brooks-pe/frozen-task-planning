Refine Workflow Progress Bar Styling (Subtle Visual Polish Only)

Update the Workflow Progress component on the Task Planning Dashboard.

This is a visual refinement pass only. The goal is to improve polish and readability while maintaining a clean, enterprise-grade appearance.

Do not redesign the component.

1. Preserve existing structure and data

Keep all existing elements exactly as-is:

Workflow State labels

Progress bars

Percentage labels

Remaining counts

Layout and alignment

Do not change:

ordering

data values

interaction behavior (links already added)

2. Improve progress track contrast

Refine the background track (the empty portion of the bar):

Make the track slightly more distinct from the page background

Use a subtle neutral tone (slightly darker than current if needed)

Ensure clear contrast between:

filled portion

unfilled portion

Do not make the track visually heavy or high contrast.

3. Refine bar shape and finish

Improve the appearance of the filled bars:

Ensure consistent rounded ends (pill shape)

Slightly soften the edges for a more modern look

Maintain the current color (do not change to multi-color bars)

Optional (only if very subtle):

Add a barely perceptible tonal variation across the bar (e.g., extremely subtle left-to-right shift)

Do NOT:

use strong gradients

use multiple colors

create glossy or “shiny” effects

If the effect is noticeable, it is too strong.

4. Improve percentage label clarity

Refine the % labels inside the bars:

Ensure strong contrast against the bar color

Maintain consistent padding around the text

Ensure the text is vertically centered

Optional (subtle only):

Slightly improve legibility with a very light contrast adjustment (do not add heavy badges or pills)

5. Improve vertical spacing rhythm

Slightly refine spacing between rows:

Add a small amount of additional vertical spacing between each workflow state row (e.g., +2–4px)

Ensure consistent spacing across all rows

Goal:

reduce visual density slightly

improve scanability

6. Optional: subtle hover affordance

If consistent with existing interaction patterns:

Add a very subtle hover effect on each row OR progress bar:

slight background tint OR slight bar brightness shift

Do not:

add animations

add shadows

make it feel like a button

This should remain a data visualization, not a control.

7. Maintain enterprise visual tone

This component should feel:

clean

structured

readable at a glance

Avoid:

decorative styling

flashy gradients

unnecessary visual effects

8. Outcome goal

The Workflow Progress component should now feel:

slightly more modern

more readable

more polished

while remaining:

minimal

consistent with the rest of the SyncPoint design system

appropriate for an enterprise application
Add Date Picker to Period of Performance Fields

Update the Period of Performance section in the Create Task flyout on the Task Planning → Tasks page.

This is a targeted usability enhancement. Do not redesign the flyout.

1. Add calendar picker support to both date fields

Enhance the Period of Performance date range inputs so users can either:

type dates manually

or select dates from a calendar picker

Apply this to both:

Start date

End date

2. Use existing enterprise date input pattern

The date fields should remain consistent with the rest of the SyncPoint form system.

Requirements:

Keep the current input styling

Add a calendar picker affordance (calendar icon or equivalent)

Picker should feel like a standard enterprise date control

Do not introduce a consumer-style oversized calendar experience

3. Preserve current validation behavior

Keep the existing required-field logic intact:

both dates are required

invalid state styling remains

Create Task stays disabled until valid dates are provided

Also preserve:

Start date must be on or before End date

4. Improve usability without changing layout

The two date fields should still:

align properly within the flyout

respect panel padding

maintain the current side-by-side layout

not overflow the container

If a calendar icon is added inside the input, ensure it does not break spacing or text alignment.

5. Keep manual entry supported

Do not force calendar-only interaction.

Users should still be able to:

click into the field

type a date manually in the existing format

The date picker is an added convenience, not a replacement.

6. Do not change anything else

Do NOT change:

field order

validation copy

button behavior

footer layout

split button behavior

other fields in the form

7. Outcome goal

The Period of Performance fields should now feel:

easier to use

more complete

more production-ready

while remaining fully aligned with the app’s enterprise form patterns.
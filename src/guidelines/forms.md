# Forms & Input Behavior

- **Scope:** Form layout, field validation, date pickers, editable fields, currency inputs, disabled states
- **Do not apply outside this domain**
- **Disabled state styling is governed here.** Other modules should reference this file.

## Rule Priority
- Hard Rules: must be followed exactly
- Guidance: preferred, but flexible

---

## Hard Rules

### Validation Timing
- On blur and on submit only. Never while typing.

### Validation Display
- Error message directly beneath affected field.
- Red border + message. No icon without message.

### Editable Scope
- Explicitly limited by row depth, column, or section.
- Do NOT infer editability beyond what is stated.

### Date Picker — Trigger
- Clicking anywhere in the field opens calendar (text area, placeholder, icon).
- No dead zones. Input = unified interactive control.

### Date Picker — Positioning
- Calendar always fully within viewport. Never clipped.
- Left field: align left. Right field: flip leftward or reposition dynamically.
- Use space detection (flip/shift), not hardcoded positions.

### Date Picker — Preservation
- Manual typing always supported alongside picker.
- Must not change field order, validation, buttons, or layout.

### Disabled State (Canonical)
- `bg-[#e0e1e6]`, `text-[#8b8d98]`, `cursor-not-allowed`.
- No hover effect. Driven by form validity.
- All components reference this pattern.

### Currency Input
- Dollar symbol inside input (left-aligned). Value right-aligned.
- No layout shift when editing. Validation below input.
- Visually mirrors read-only currency columns.

---

## Guidance

### Layout
- Default clean white background. Section grouping via spacing, headers, light dividers.

### Labels
- Left-aligned with inputs. Not indented relative to fields.

# Components

- **Scope:** Segmented controls, pagination, split buttons, status pills, cell states, bulk actions, toasts
- **Do not apply outside this domain**
- **Disabled states follow Forms guidelines.**

## Rule Priority
- Hard Rules: must be followed exactly
- Guidance: preferred, but flexible

---

## Hard Rules

### Segmented Control
- One shared track container (neutral surface). No borders between segments.
- Selected: pill indicator, solid accent fill, medium weight, strong contrast.
- Unselected: neutral text, no border box, no alpha overlays.
- No layout shift on toggle. Not three independent buttons.

### Pagination
- Options: 10, 50, 100+. Default matches visible row count.
- Label reflects selection (e.g., "1–50 of 956"). Size and label never diverge.

### Status Pills
- Summary and detail pills match color, icon, typography.
- Only label text differs (e.g., "2 Requests" vs "Requested").
- Badge and banner styling must defer to `banners-badges.md` for color tokens and pattern definitions.
- Do NOT define new badge colors in component code — reference the canonical definitions.

### Semantic Cell States
- Error: red text + red icon + subtle red bg + tooltip.
- Warning: amber text + warning icon + subtle amber bg + tooltip.
- Info: accent/neutral emphasis, no heavy background.
- Red and orange never interchangeable. No bg without icon. No icon without tooltip.

### Split Button
- Primary action + dropdown chevron as unified control.
- Dropdown position adapts to available space.
- Disabled: entire split button uses disabled styling (per Forms guidelines). Dropdown inert.

### Success Toast + Row Pulse
- New entry: brief success toast + brief row highlight/pulse.
- No layout shift from either.

---

## Guidance

### Bulk Actions
- Use "Bulk Status Update" or "Bulk Update" (not "Mass Change").
- Label inline with control, in table header action zone (right side).
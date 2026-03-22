# Visual System

- **Scope:** Responsiveness, colors, backgrounds, hover/focus, accent, accessibility, tooltips, sticky footer
- **Do not apply outside this domain**
- **Disabled states follow Forms guidelines.**

## Rule Priority
- Hard Rules: must be followed exactly
- Guidance: preferred, but flexible

---

## Hard Rules

### Hover & Focus
- All navigational text: hover + keyboard focus states.
- Hover must NOT shift content, change height, or affect layout.
- Hover must not resemble selected state. Subtle override only.
- Cursor: pointer for clickable items. Focus rings visible.

### Accent Usage
- Used for: active sort, ghost action links, active states, focus rings.
- NOT for: structural backgrounds, neutral grouping, non-interactive labels.

### Text Color Tokens
- Allowed: Default, Neutral, Semantic Error, Semantic Warning, Accent (interactive only).
- No inline hex values, custom grays, or darker gray for "visual weight."

### Surface Tones
- Default: Surface Neutral 2 (`#F9F9FB`).
- No darker variants for implied hierarchy unless explicitly defined.
- Hierarchy via spacing/borders/structure, not escalating gray tones.

### Tooltips
- Default right, flip left if no space. 8–16px viewport padding.
- Must not overflow viewport, cause scroll, or shift layout.

### Sticky Footer
- Full-width, surface background, subtle top shadow.
- Always visible while scrolling. No overlap, no layout shift.
- Actions right-aligned, aligned with page container padding.

### Accessibility
- All interactive elements keyboard-reachable.
- Focus states visible. Text links interactive on hover.

---

## Guidance

### Responsiveness
- Desktop-first (large monitors, enterprise desktops).
- Truncation over wrapping. Horizontal scroll as last resort.
- Wide screens: distribute width across columns, not one column.

### Backgrounds
- Changes should improve focus, reduce noise, never compete with content.

### Dividers
- Optional. Subtle, consistent. Remove if they disrupt rhythm.

---

## Semantic Color Categories

Colors MUST come from existing implemented components, not new values.

| Category | Background | Icon/Text Color | Reference Implementation |
|---|---|---|---|
| Info (Blue) | `rgba(0,179,238,0.12)` | `#00749E` | Task Workspace info banner |
| Warning (Amber) | `rgba(255,222,0,0.24)` | `#ab6400` | "Available to Allocate" pill, "Unsaved Changes" pill |
| Success (Green) | `rgba(0,168,84,0.12)` | `#18794E` | — |
| Neutral (Gray) | `#F0F0F3` | `#60646C` | — |

- For full banner/badge rules, defer to `banners-badges.md`.
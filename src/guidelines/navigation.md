# Navigation & Shell

- **Scope:** Sidebar, top nav, routing, page creation, multi-page stability
- **Do not apply outside this domain**

## Rule Priority
- Hard Rules: must be followed exactly
- Guidance: preferred, but flexible

---

## Hard Rules

### Sidebar
- Chevron: expand/collapse only. Label/Icon: navigation.
- Expandable sections default collapsed unless instructed otherwise.

### Page Creation Order
1. Create component → 2. Export → 3. Add route → 4. Update nav links.
- Never add a route until the component exists and compiles.
- Title, breadcrumb, route path, and nav label must all match.

### Top-Row Stability
- Version rows across pages share height, padding, control sizing.
- No page should feel slimmer or fatter than others.

---

## Guidance

### Top-Level Navigation
- Logo elements may navigate "Home" if requested.
- Navigation should never be ambiguous or hidden without affordances.

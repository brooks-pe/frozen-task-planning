# Data Behavior

- **Scope:** Simulated data, prototype behavior, visual lock vs data lock
- **Do not apply outside this domain**

## Rule Priority
- Hard Rules: must be followed exactly
- Guidance: preferred, but flexible

---

## Hard Rules

### Simulated Data
- Preserve all layout, spacing, typography, visual hierarchy. Only values/rows change.
- Filters swap entire datasets. Do not mutate rendered UI.
- Each filter selection = new dataset state.
- Data must be realistic, domain-appropriate. Totals must reconcile.
- Forbidden: adding UI to explain data, adding elements not in design, removing sections, refactoring layout during data work.

### Visual Lock vs Data Lock
- Design attachment locks: layout, spacing, alignment, typography, hierarchy.
- Design attachment does NOT lock: numbers, labels, row contents, placeholder data.
- Behavioral requests: visuals locked, data mutable.

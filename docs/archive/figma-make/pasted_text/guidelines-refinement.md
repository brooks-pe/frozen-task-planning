We are performing a refinement pass on the modular SyncPoint guidelines system.

The system has already been split into domain modules. This pass is focused on **optimization, deduplication, and clarity**, not restructuring.

---

## Objective

Refine the existing guidelines to:

* Reduce token usage
* Remove duplicated rules across modules
* Introduce rule prioritization (Hard Rules vs Guidance)
* Strengthen the router to prevent cross-domain drift
* Improve scannability and execution precision

---

## Critical Context

There are currently TWO guideline files:

* A lightweight router (correct)
* A large legacy guidelines file (~1300 lines)

---

## Step 0 — Resolve Conflict (MANDATORY)

* The lightweight router file must remain as the ONLY `guidelines.md`
* The large legacy file must be REMOVED from active use

Do NOT merge them
Do NOT preserve duplicate content
Do NOT keep both active

If needed, move the large file to:
`/guidelines/_archive/legacy-guidelines.md`

---

## Step 1 — Deduplicate Rules

Across all modules:

* Identify repeated rules (e.g., disabled states, pagination, typography enforcement, etc.)
* Keep the rule ONLY in the most appropriate domain file
* Replace duplicates with a short reference:

Example:
"Disabled states follow Forms guidelines"

Do NOT repeat full rule definitions across modules

---

## Step 2 — Introduce Rule Priority

In EVERY module, add this structure at the top:

## Rule Priority

🔒 Hard Rules (must be followed exactly)
🟡 Guidance (preferred, but flexible)

---

Then reorganize content:

* Hard constraints → 🔒 Hard Rules
* Recommendations → 🟡 Guidance

Do NOT leave rules unclassified

---

## Step 3 — Reduce Verbosity

Across all files:

* Remove explanatory sentences that restate rules
* Remove persuasive or philosophical language
* Keep only actionable constraints

Examples:

Replace:
"This pattern ensures consistency across the application"

With:
"Use consistent pattern across pages"

---

* Shorten phrasing wherever possible
* Eliminate redundant “Forbidden” sections if rules already imply the constraint
* Optimize for scanability, not readability

---

## Step 4 — Strengthen Router (High Priority)

Update the router file to include:

### Multi-Module Loading Rules

* Load only the minimum required modules
* When multiple modules apply:

  * Forms + Components → Forms governs behavior, Components governs structure
  * Tables + Components → Tables governs layout, Components governs interactions
* If rules conflict → the more specific module wins
* Do NOT merge or reinterpret rules across domains

---

### Scope Control (Critical)

* Do NOT apply rules from unrelated modules
* Do NOT expand beyond the requested change
* Do NOT refactor adjacent areas
* Only implement the exact requested scope

---

## Step 5 — Tighten Module Boundaries

Ensure each module:

* Contains only rules relevant to its domain
* Does NOT include cross-domain logic
* Uses short references instead of duplication

Examples:

* Disabled button styling → Forms only
* Pagination → Components only
* Layout/grid → Tables only

---

## Step 6 — Light Structural Cleanup

* Ensure consistent formatting across all modules
* Keep sections shallow (avoid deep nesting)
* Keep lists concise and aligned
* Maintain clear section headers

---

## Constraints

* Do NOT introduce new rules
* Do NOT change intent of existing rules
* Do NOT restructure file system
* Do NOT expand scope beyond refinement

---

## Output

Return:

1. Updated router `guidelines.md`
2. Updated modular files with:

   * Deduplicated rules
   * Rule priority sections
   * Reduced verbosity
   * Clean formatting

---

## Success Criteria

* Each module is fast to scan (< 1–2 seconds to understand structure)
* No duplicated rules across modules
* Router clearly controls module usage
* Token usage is reduced without losing clarity
* Claude can execute tasks with minimal context confusion

---

Focus on precision, clarity, and enforceability.

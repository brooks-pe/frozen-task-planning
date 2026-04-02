# SyncPoint Contrast Rollout Playbook v0.1

## Purpose

Define a practical rollout process for applying contrast and style improvements in bounded, low-risk waves so visual consistency improves without behavior or layout regressions.

## Summary

Use a staged Codex rollout method: prove direction with small pilots, then expand in bounded waves, then finish with a QA punch-list pass. This keeps risk low while still reaching module-level consistency.

## Recommended Stages

1. Foundation docs  
Purpose: lock semantic direction and governance before touching runtime UI.  
Exit criteria: approved text/border foundations and repo behavior guidance are in place.

2. Isolated pilots  
Purpose: validate contrast direction on one small, high-visibility surface.  
Exit criteria: pilot improves readability without behavior/layout regressions.

3. Shared control pilot  
Purpose: validate reusable input/dropdown/focus patterns for leverage.  
Exit criteria: shared control updates are stable and visibly improve all consuming surfaces.

4. Bounded workspace/screen waves  
Purpose: align one coherent workflow cluster so users feel continuity.  
Exit criteria: adjacent surfaces read consistently; no redesign or behavior drift introduced.

5. Module-level rollout  
Purpose: move from local consistency to module consistency across major screens.  
Exit criteria: primary module screens share consistent text, border, and state language.

6. Shared-pattern pass  
Purpose: update remaining reused wrappers/filters/shells still carrying legacy softness.  
Exit criteria: shared pattern drift no longer makes updated screens feel held back.

7. QA punch-list pass  
Purpose: remove the most visible remaining outliers only.  
Exit criteria: remaining issues are low-priority visual nits with diminishing payoff.

## Exit Criteria: When To Move To Next Stage

Move to the next stage when the current stage's exit criteria are met, with no behavior changes, no layout regressions, and no scope spill into unrelated modules.

## Scope Selection Rules

- Inspect first, then choose the smallest meaningful scope with clear user-visible payoff.
- Target high-visibility surfaces before low-traffic edges.
- Start with panels/forms/filters/controls/tables that users scan constantly.
- Once pilots are proven, prefer the smallest meaningful workflow cluster over arbitrary micro-locality.
- Keep each pass bounded, reviewable, and module-specific.

## Prompt Framing Pattern (Codex)

- `Task Type`: `patch` or `docs-only patch`.
- `Scope`: explicitly bounded module/surface cluster.
- `Objective`: readability/contrast/state clarity outcome.
- `Do not modify`: behavior, layout model, interaction model, global theme/token architecture.
- `Instructions`: inspect first, choose smallest high-value file set, apply style-only updates.
- `Return`: changed files, why chosen, what improved, remaining outliers.
- `Verification`: smallest relevant check (typically build), confirm scope boundaries.

## Guardrails

- No behavior changes.
- No layout redesign.
- No refactor unless explicitly needed.
- Keep changes style-only during rollout.
- Do not expand scope to unrelated modules.
- Reuse validated patterns instead of inventing new local variants.

## Lessons Learned

- Text and border foundations first reduced downstream churn.
- Shared controls became the highest-leverage consistency points.
- As updated surfaces improved, older surfaces stood out more and were easier to prioritize.
- Moving from pilots to waves increased speed once direction was proven.
- A final QA punch-list pass was necessary to remove high-visibility residual drift.

## How To Know When To Stop

Stop module rollout when:

- major user-visible surfaces in the module are consistent,
- state meaning is clear enough at a glance,
- remaining issues are mostly low-priority cosmetic nits,
- further passes would add churn with limited readability payoff.

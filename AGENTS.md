# AGENTS.md

## Project Overview

SyncPoint Prototype is a maintained Vite + React codebase worked on primarily in VS Code with Codex. Treat this repository as the source of truth for current implementation, not as a disposable export bundle.

## Repo Map

- `src/main.tsx`: app entry point
- `src/routes.ts`: route definitions
- `src/App.tsx`: main shell and current home page composition
- `src/components/`: runtime feature components
- `src/imports/`: mixed bag of live generated modules and suspicious leftovers
- `src/assets/`: live app assets
- `docs/archive/figma-make/`: archived prompt/history material, not runtime code

## Core Editing Rules

- Make the smallest possible change.
- Do not modify anything outside scope.
- Do not refactor, clean up, or improve adjacent areas unless explicitly requested.
- Preserve behavior unless the task is specifically to change behavior.
- If a request implies both logic and UI changes, confirm before doing both.
- Reuse existing implemented patterns before creating new ones.

## Runtime Safety Rules

- Do not rename live imported generated files unless that cleanup is explicitly in scope.
- Do not touch `figma:asset` imports or Vite alias wiring unless explicitly requested.
- Do not delete suspicious files just because they look generated; verify references first.
- Prefer archiving uncertain leftovers before deleting them.

## UI Rules To Preserve

- Match existing SyncPoint behavior and structure before introducing new patterns.
- Prefer stable layouts over clever layouts.
- Avoid layout shift during hover, selection, expansion, or editing.
- Reuse existing table, filter, form, badge, and tooltip patterns.
- Keep inline editing in place unless a modal or flyout is explicitly required.
- Use `lucide-react` for new icons unless the surrounding implementation already requires something else.

## `src/imports` Warning

`src/imports/` is not a safe “generated trash” folder. It contains:

- live imported modules that are still part of runtime behavior
- generated-looking files with non-semantic names
- suspicious leftovers from Figma/Make-style exports

Before editing, moving, renaming, or deleting anything in `src/imports/`, reference-check it with search first.

## Verification Checklist

- Verify the exact files referenced by the task.
- After docs-only changes, confirm no runtime files were touched.
- After code changes, run a build or the smallest relevant verification step.
- Report assumptions and any suspicious leftovers you intentionally did not touch.

## Final Rule

When in doubt, match existing SyncPoint behavior exactly and make the smallest possible change.

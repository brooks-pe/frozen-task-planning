# SyncPoint Prototype

This repository is the maintained source of truth for the SyncPoint Prototype. Development is expected to happen locally in VS Code with Codex, using the code in this repo rather than treating it as a one-time Figma export.

## Local Development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

## Repo Structure

- `src/main.tsx`: app entry point
- `src/routes.ts`: route definitions
- `src/App.tsx`: main shell and current home page composition
- `src/components/`: runtime feature components
- `src/imports/`: mixed set of live generated modules and possible leftovers
- `src/assets/`: live assets
- `docs/archive/figma-make/`: archived prompt/history material
- `AGENTS.md`: concise Codex workflow guidance for this repo

## VS Code + Codex Workflow

- Prefer small, scoped changes.
- Reuse existing SyncPoint patterns before inventing new ones.
- Treat `src/imports/` carefully: some files are live runtime dependencies, others are leftovers.
- Reference-check suspicious generated-looking files before editing, moving, or deleting them.

## Current Constraints

- Some live files still have generated, non-semantic names.
- `figma:asset` imports and related Vite aliases are still active.
- `src/App.tsx` currently contains a large amount of app shell and home page logic.

These constraints are known and should be handled deliberately, not opportunistically during unrelated changes.

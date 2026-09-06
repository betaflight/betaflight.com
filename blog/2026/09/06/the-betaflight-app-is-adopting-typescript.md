---
title: The Betaflight App Is Adopting TypeScript, Incrementally
date: 2026-09-06
authors: ['blckmn']
---

The Betaflight App is now type-checked. Three TypeScript files had already made their way into the tree over the past fortnight, but nothing was checking them: Vite quietly stripped the types and moved on. With [#5503](https://github.com/betaflight/betaflight-configurator/pull/5503) the repository has a `tsconfig.json`, `vue-tsc` runs as part of `npm run lint`, and ESLint understands `.ts` files and `<script setup lang="ts">` blocks. CI and the pre-commit hook gate on it like they do on lint.

<!--truncate-->

## Why

The app talks to the flight controller through a large, loosely typed object graph: the `FC` state, MSP replies, CLI output. Most of the bugs we chase are shape mismatches: a field that moved, a `null` nobody handled, a wire format that changed. Last week a port-annotation feature was built against a function mask the firmware had already stopped sending; the code was fine, the assumption was not. Types make those assumptions visible, and the compiler enforces them on every refactor rather than relying on grep.

## The Approach

- **No rewrite.** `src/js` (MSP, FC, serial) stays JavaScript. Users see no change.
- **New code is TypeScript**, as `.ts` files or `<script setup lang="ts">`, in strict mode from day one.
- **Legacy JavaScript is importable, not judged.** `allowJs` lets TypeScript consume it; `checkJs: false` means it is not type-checked. Where TS needs a shape from a JS module, a JSDoc `@type` on that module is enough.
- **Convert as you touch.** A composable or store you materially change may be converted in the same pull request, one file per PR so reviews stay small.
- **Ratchet later.** Once enough of a folder is TypeScript, `allowJs` is switched off there and the FC state gets a sealed interface. That is the next phase, tracked in the repository's `AGENTS.md`.

## For Contributors

Nothing changes in how you build or run the app. `npm run lint` now includes the type-check; `npm run typecheck` runs it alone. If you open a pull request that adds a JavaScript file where a TypeScript one would do, expect a reviewer to ask for the `.ts` version.

Questions and discussion are welcome in the development channels on the [Betaflight Discord](https://discord.betaflight.com/invite).

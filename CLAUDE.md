# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Betaflight.com is the official website for the Betaflight FPV drone flight controller firmware. Built with **Docusaurus 3** (RSpack bundler, experimental faster mode), it serves documentation, blog posts, downloads, and sponsor info.

Requires Node.js ≥ 20.10. Copy `.env.example` to `.env` before starting — it sets `URL`, `BASE_PATH`, and `ORG`.

## Commands

```bash
npm start              # Dev server at http://localhost:3000
npm run build          # Build static site to /build
npm run lint           # ESLint on src/ (.js, .tsx)
npm run lint:fix       # ESLint with auto-fix
npm run format         # Prettier on src/
npm run typecheck      # TypeScript type check
npm run check          # Run both title-case and file-name checks
```

Pre-commit hooks (Husky) run ESLint, Prettier, title-case check, and file-name check automatically. Use `--no-verify` to bypass when needed.

## Architecture

**Content** lives in three auto-generated sidebars mapped from the filesystem:

- `docs/wiki/` — user-facing wiki
- `docs/development/` — developer documentation
- `docs/sponsors/` — sponsor pages

**Blog** posts go in `blog/` with MDX support; authors defined in `blog/authors.yml`.

**Custom React code** lives in `src/`:

- `src/components/` — reusable React components (charts, carousels, sponsor layouts, etc.)
- `src/pages/` — standalone pages: `download.tsx`, `stats.tsx`, `sponsors.mdx`, `privacy.tsx`
- `src/theme/` — swizzled Docusaurus theme components (Footer, DocCard, BlogPostItem, SearchBar, etc.)
- `src/css/` — global styles: `custom.css`, `tailwind.scss`, `mermaid.scss`

**Plugins** in `plugins/blog-plugin.js` wraps the standard Docusaurus blog plugin.

**Tools** in `tools/`:

- `check_title_case.mjs` — enforces Title Case on H1 headers in `.md` and `.mdx` files under `docs/`
- `check_file_names.mjs` — enforces `[a-zA-Z0-9-_.]` filenames everywhere in `docs/` **except** `docs/development/` and `docs/wiki/` (which are exempt)

## Conventions

**Markdown/MDX:**

- H1 headers (`# Title`) in `.md` and `.mdx` files under `docs/` must be Title Case — enforced by pre-commit hook
- New doc files outside `docs/development` and `docs/wiki` must use only alphanumeric characters, hyphens, underscores, and dots in filenames
- Mermaid diagrams are supported; math via KaTeX (remark-math + rehype-katex)
- `@mentions` in docs link to GitHub profiles automatically

**Code style (Prettier):**

- `printWidth: 200`, single quotes, trailing commas, no semicolons
- ESLint targets `src/` only — docs and config files are not linted

**Sidebars** are fully auto-generated from filesystem structure — no manual sidebar config needed when adding new doc pages.

## Docs Reorganization Context

**Directory audiences:**

- `docs/wiki/` — end-user guides and wiki content
- `docs/development/` — firmware contributor docs only; exempt from filename checker
- Docs misplaced in `docs/development/` for user audiences belong in `docs/wiki/guides/current/`

**Asset moves:**

- Always use `git rm` on the source after copying, so git detects a rename — never `cp` without cleaning up the original
- `docs/development/assets/` contains dev-only subdirs (`building-in-eclipse/`, `eclipse-gdb-debugging/`, `hardware/`) used by remaining dev docs — do not move those
- Static downloadable files (PDFs, ZIPs) belong in `static/resources/`, not inside `docs/`

**Broken link checker:**

- Docusaurus validates doc page URLs only — links to `static/` files (e.g. `/resources/Jeti-Ex-Bus-Setup.pdf`) always show as broken warnings; this is a known false positive
- `.md` extension in links (e.g. `[foo](/docs/bar.md#anchor)`) causes broken link errors — use extensionless paths

**`npm install` may be needed** after a fresh clone or branch switch if `check_title_case.mjs` dependencies are missing (symptom: `check` command fails with module-not-found).

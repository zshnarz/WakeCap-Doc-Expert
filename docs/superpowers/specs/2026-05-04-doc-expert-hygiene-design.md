# WakeCap-Doc-Expert — Polish & Hygiene Pass

**Date:** 2026-05-04
**Author:** zshn (zishan.shahzad@wakecap.com)
**Status:** Draft, awaiting review

## Problem

The repository works, but several things drift from reality or add friction:

- `README.md` lists 4 templates when 18 exist; references `templates/docx-generator.js` which does not exist.
- `old_generators/` (untracked, pre-Pandoc generators) and `.mppt_dashboard.pid` (stray PID from an unrelated tool) clutter the root.
- 5 stray `WC-WS-*.docx` outputs sit at `output/` root rather than in the `output/weather-station/` product folder.
- No test signal — Pandoc pipeline or Lua filter regressions only surface manually.
- `pandoc/generate.js` lacks a `--dry-run` mode, which makes test runs without a Pandoc install impossible.

This spec covers the smallest changes that fix all of the above without expanding scope.

## Goals

1. Repo state matches documentation.
2. Stray files removed; legacy generators preserved under a tracked `archive/` folder.
3. A `npm test` command runs in under a minute and gives a green/red signal on:
   - Pandoc pipeline can produce a `.docx` from a representative input.
   - Lua filter handles all defined fenced-div classes (safety panels, callouts).
   - Validators (`kb-validator.js`, `validator.js`) report no errors against checked-in fixtures.
4. Test harness uses zero new runtime dependencies.

## Non-Goals

- CI / GitHub Actions. Tests are local-only for now (revisit when contributors join).
- Pre-commit hooks.
- Snapshot tests of binary `.docx` output. Word doc internals shift between Pandoc versions and aren't worth pinning.
- Refactoring `pandoc/generate.js`, `wakecap.lua`, or any validator beyond the `--dry-run` flag.
- Anything in options B/C/D/E from the brainstorming session — those are separate specs.

## Design

### 1. Cleanup

Single commit, file moves and deletes only:

- `git mv old_generators/ archive/old_generators/`
- Create `archive/README.md` — one paragraph explaining what's there and that the live engine is in `pandoc/`.
- `rm .mppt_dashboard.pid` — already covered by `*.pid` in `.gitignore`, just remove the on-disk file.
- `mv output/WC-WS-*.docx output/weather-station/` — 5 files. Once moved, they're covered by the existing `output/*/` ignore rule.
- No `.gitignore` change needed; existing rules already cover the relevant cases.

### 2. Pandoc pipeline — minimal additions

Single commit. Existing error handling in `pandoc/generate.js` is already solid (missing input, missing reference template, missing Pandoc binary all produce friendly errors). Only add what's needed for testability:

- New flag: `--dry-run`. When set, `generate.js` parses arguments, validates input file existence and reference-template existence, extracts metadata, computes the output path, prints what *would* run, and exits `0` without invoking Pandoc.
- Update the help text in `printHelp()` to document the new flag.

This lets the smoke test run against any source markdown without requiring a working Pandoc install on the contributor's machine.

### 3. Smoke-test harness

Single commit. Test runner: Node's built-in `node:test` and `node:assert`. No new dependencies.

Layout:

```
tests/
├── smoke.test.js           # pandoc pipeline dry-run + (optional) full run
├── filter.test.js          # lua filter handles all fenced-div classes
├── validators.test.js      # kb-validator + validator on fixtures
└── fixtures/
    ├── sample-kb.md        # minimal KB exercising SCHEMA.md fields
    └── sample-doc.md       # Pandoc-flavored markdown using every filter feature
```

**`tests/fixtures/sample-doc.md`** — a small but complete document covering:
- YAML frontmatter (all required fields)
- Each safety panel: `.danger`, `.warning`, `.caution`, `.notice`
- Each callout: `.note`, `.tip`, `.important`
- Subscript / superscript / strikethrough
- A pipe table
- A `[TBD]` placeholder
- An image reference (placeholder, no real file)

**`smoke.test.js`** — for `tests/fixtures/sample-doc.md`:
1. Run `node pandoc/generate.js <fixture> --dry-run`. Assert exit code `0` and stdout mentions the expected output path.
2. If `pandoc --version` succeeds, also run without `--dry-run` to a temp output path. Assert exit `0`, file exists, file size > 1 KB. If Pandoc is unavailable, log a clear `SKIP` message — do not fail.

**`filter.test.js`** — given `tests/fixtures/sample-doc.md`:
1. Skip with clear message if `pandoc --version` fails.
2. Run `pandoc -t json --lua-filter pandoc/filters/wakecap.lua` against the fixture. This emits the post-filter Pandoc AST as JSON to stdout — no `.docx` produced, no zip handling needed.
3. `JSON.parse` the output, walk the AST, and assert every fenced-div class the filter is expected to handle (`danger`, `warning`, `caution`, `notice`, `note`, `tip`, `important`) survives the filter with whatever attribute/class shape `wakecap.lua` emits. The exact assertion shape will be derived from `wakecap.lua` while writing the test.

**`validators.test.js`** — runs `kb-validator.js` against `tests/fixtures/sample-kb.md` and `validator.js` against `tests/fixtures/sample-doc.md`. Both must exit `0`. No skip; these don't need Pandoc.

`package.json`:
```json
"test": "node --test tests/"
```

### 4. README rewrite

Single commit, last in the sequence so it documents the new state.

- Replace 4-template table with the full 18-template list (mirror `CLAUDE.md`'s table).
- Remove the broken reference to `templates/docx-generator.js`.
- Fix folder-structure block: add `pandoc/`, correct `templates/` contents (lists `kb-validator.js`, `validator.js`, `version-manager.js`, `xref-index.js`), add `archive/`, add `tests/`.
- Document the real `package.json` scripts including the new `test`.
- Add a **Testing** section: `npm test` summary, what's covered, what's skipped without Pandoc.
- Add an **Archive** section pointing to `archive/old_generators/`.
- Note that `knowledge-base/*.md` (except `SCHEMA.md`) is gitignored — contributors provide their own product KBs.

## Commit Sequence

1. **Cleanup** — moves and deletes only. Repo state matches documentation.
2. **Pipeline `--dry-run`** — single flag added, help text updated.
3. **Test harness** — fixtures + three test files + `package.json` script. Lands green.
4. **README** — documents the new reality.

Each commit stands alone and leaves the repo in a working state.

## Risks & Open Questions

- **`--toc=false` / `--number-sections=false`.** Lines 230 and 232 of `generate.js` use a `=false` syntax that some Pandoc versions reject. Out of scope for this pass (no test currently exercises these paths). Flag here so we remember; fix in a separate change if/when it bites.
- **Fixture drift vs. real KBs.** A passing smoke against `tests/fixtures/` doesn't guarantee real KBs work. Acceptable: real KB validity is checked manually during doc generation. Future enhancement (out of scope) could be a `npm run smoke:local` that runs against any locally-present `output/*/*.md`.
- **Filter AST shape.** The spec doesn't pin the exact attribute keys the filter emits because they're best read from `wakecap.lua` directly while writing the test. If the filter is later refactored to emit different shapes, the test will fail loudly and the new shape goes in alongside the change.

## Verification

After all four commits:
- `npm test` exits 0.
- `git status` shows a clean tree.
- `archive/old_generators/` exists and is tracked.
- `.mppt_dashboard.pid` is gone.
- No `.docx` remain in `output/` root.
- README's template list matches `instructions/` directory listing.

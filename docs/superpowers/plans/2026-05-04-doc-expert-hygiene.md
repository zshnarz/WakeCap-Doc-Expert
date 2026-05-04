# WakeCap-Doc-Expert Hygiene Pass — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Polish the WakeCap-Doc-Expert repo: archive legacy generators, remove stray files, add a `--dry-run` flag to the Pandoc pipeline, add a smoke-test harness using Node's built-in `node:test`, and bring the README up to date.

**Architecture:** Six commits, each self-contained and leaving the repo in a working state. Tests live in `tests/` and use only the Node standard library (`node:test`, `node:assert`, `node:child_process`). Fixtures under `tests/fixtures/` so tests work on a fresh clone where `knowledge-base/*.md` is gitignored.

**Tech Stack:** Node.js 18+ (built-in test runner), Pandoc 3.9+ (already installed), no new npm dependencies.

**Spec:** `docs/superpowers/specs/2026-05-04-doc-expert-hygiene-design.md`

---

## File Structure

| Path | Action | Purpose |
|------|--------|---------|
| `old_generators/` | Move → `archive/old_generators/` | Preserve legacy generators under tracked archive |
| `archive/README.md` | Create | Brief explanation of what's archived |
| `.mppt_dashboard.pid` | Delete | Stray PID from unrelated tool |
| `output/WC-WS-*.docx` (5 files) | Move → `output/weather-station/` | Group with their product |
| `pandoc/generate.js` | Modify | Add `--dry-run` flag and help text |
| `tests/fixtures/sample-doc.md` | Create | Pandoc-flavored markdown exercising every filter feature |
| `tests/fixtures/sample-kb.md` | Create | Minimal KB exercising all 7 required sections |
| `tests/smoke.test.js` | Create | Verify `generate.js` `--dry-run` and full Pandoc run |
| `tests/filter.test.js` | Create | Inspect Pandoc JSON AST after Lua filter |
| `tests/validators.test.js` | Create | Run `kb-validator.js` against fixture |
| `package.json` | Modify | Add `"test": "node --test tests/"` |
| `README.md` | Rewrite | Match current repo reality |

---

## Task 1: Cleanup commit

**Files:**
- Move: `old_generators/` → `archive/old_generators/`
- Create: `archive/README.md`
- Delete: `.mppt_dashboard.pid`
- Move: `output/WC-WS-DS-v1.0.docx`, `output/WC-WS-PM-v1.0.docx`, `output/WC-WS-QR-v1.0.docx`, `output/WC-WS-SG-v1.0.docx`, `output/WC-WS-TG-v1.0.docx` → `output/weather-station/`

- [ ] **Step 1: Verify current clutter exists**

```bash
ls old_generators/ && ls -la .mppt_dashboard.pid && ls output/WC-WS-*.docx
```
Expected: all three listings show files (confirms we're operating on the right state).

- [ ] **Step 2: Move `old_generators/` under `archive/`**

`old_generators/` is untracked, so `git mv` won't work. Use plain `mv`:

```bash
mkdir -p archive
mv old_generators archive/old_generators
```

- [ ] **Step 3: Create `archive/README.md`**

Write this content to `archive/README.md`:

```markdown
# Archive

Historical artifacts retained for reference. Not part of the live engine.

## `old_generators/`

Pre-Pandoc JavaScript generators that produced `.docx` directly using the `docx` npm package. Superseded by the Pandoc-based pipeline in `pandoc/`. Kept here so the generator history is accessible without spelunking through `git log`.

If you need the engine, look at `pandoc/` and `templates/`. Don't add new code under `archive/`.
```

- [ ] **Step 4: Delete the stray PID file**

```bash
rm .mppt_dashboard.pid
```

- [ ] **Step 5: Move stray Weather Station `.docx` outputs**

```bash
mv output/WC-WS-DS-v1.0.docx output/weather-station/
mv output/WC-WS-PM-v1.0.docx output/weather-station/
mv output/WC-WS-QR-v1.0.docx output/weather-station/
mv output/WC-WS-SG-v1.0.docx output/weather-station/
mv output/WC-WS-TG-v1.0.docx output/weather-station/
```

After this, `output/weather-station/` is gitignored (per `output/*/`), so the moved files become invisible to git, which is correct.

- [ ] **Step 6: Verify final state**

```bash
ls archive/old_generators/ | head -3
ls archive/README.md
ls .mppt_dashboard.pid 2>&1 | grep -i "no such" || echo "STILL EXISTS - FAIL"
ls output/WC-WS-*.docx 2>&1 | grep -i "no such" || echo "STILL IN ROOT - FAIL"
```
Expected: archive entries listed, no stale files at original locations.

- [ ] **Step 7: Stage and commit**

```bash
git add archive/
git status
```
Expected: `archive/` files staged. The deletion of `.mppt_dashboard.pid` doesn't show because `*.pid` is in `.gitignore` (the file was never tracked). The moved `.docx` files don't show because the source location wasn't tracked and the destination is gitignored.

```bash
git commit -m "$(cat <<'EOF'
Cleanup: archive legacy generators, remove stray files

- Move old_generators/ under archive/ (tracked) for posterity
- Add archive/README.md explaining what lives there
- Remove stray .mppt_dashboard.pid (unrelated tool)
- Group stray output/WC-WS-*.docx under output/weather-station/

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Add `--dry-run` flag (TDD)

**Files:**
- Create: `tests/fixtures/sample-doc.md`
- Create: `tests/smoke.test.js`
- Modify: `pandoc/generate.js`
- Modify: `package.json`

- [ ] **Step 1: Create the fixture `tests/fixtures/sample-doc.md`**

Write this content (small but covers every filter feature):

````markdown
---
title: "Sample Doc — Filter Smoke Test"
doc-id: WC-XX-XX-v0.0
product: Sample
doc-type: Smoke Test
revision-date: 2026-05-04
author: "Test Fixture"
---

# Sample Doc

This fixture exercises every fenced-div class the Lua filter handles, plus
subscript, superscript, strikethrough, a pipe table, and a `[TBD]` marker.

::: {.danger}
**TOXIC GAS** — H~2~S above 10 ppm is immediately dangerous.
:::

::: {.warning}
**ELECTRICAL HAZARD** — De-energize before servicing.
:::

::: {.caution}
**FALL HAZARD** — Use fall protection.
:::

::: {.notice}
Sensor calibration certificates verified before deployment.
:::

::: {.note}
Factory-configured parameter; no field adjustment required.
:::

::: {.tip}
Install during calm weather (wind < 5 m/s).
:::

::: {.important}
Report incidents to support within 24 hours.
:::

## Specs

| Parameter | Value | Unit |
|:----------|------:|:----:|
| Temperature | -40 to +60 | °C |
| Area | 100 | m^2^ |

Threshold value: [TBD]. Deprecated value: ~~obsolete~~.
````

- [ ] **Step 2: Create the failing test in `tests/smoke.test.js`**

```javascript
const test = require('node:test');
const assert = require('node:assert');
const { spawnSync } = require('node:child_process');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const FIXTURE = path.join(ROOT, 'tests', 'fixtures', 'sample-doc.md');
const GENERATE = path.join(ROOT, 'pandoc', 'generate.js');

test('generate.js --dry-run exits 0 and prints the planned output path', () => {
  const result = spawnSync(process.execPath, [GENERATE, FIXTURE, '--dry-run'], {
    encoding: 'utf-8',
    cwd: ROOT,
  });
  assert.strictEqual(result.status, 0, `stderr: ${result.stderr}`);
  assert.match(result.stdout, /\[dry-run\]/i, 'expected dry-run banner');
  assert.match(result.stdout, /WC-XX-XX-v0\.0\.docx/, 'expected planned output path mentioning doc-id');
});
```

- [ ] **Step 3: Run the test to verify it fails**

```bash
node --test tests/smoke.test.js
```
Expected: FAIL. Either exit code non-zero or no `[dry-run]` in stdout, because the flag doesn't exist yet.

- [ ] **Step 4: Add `--dry-run` to `pandoc/generate.js`**

In the `parseArgs()` function (around line 60), add `dryRun: false` to the default `opts`:

```javascript
  const opts = {
    input: null,
    output: null,
    version: 'B',
    toc: null,
    numbers: null,
    dryRun: false,
    extra: []
  };
```

In the same function's `switch` (around lines 70-101), add a case before `--help`:

```javascript
      case '--dry-run':
        opts.dryRun = true;
        break;
```

In `printHelp()` (around line 113), add this line to the Options block (after `--no-numbers`):

```
  --dry-run       Validate input + reference template, print planned output, exit without invoking Pandoc
```

In `main()` (after the Pandoc command is built, around line 240, just before `console.log('Generating: ...')`), add:

```javascript
  if (opts.dryRun) {
    console.log(`[dry-run] Would generate: ${path.basename(outputPath)}`);
    console.log(`  Input:    ${path.relative(ROOT, inputPath)}`);
    console.log(`  Style:    Version ${opts.version}`);
    console.log(`  Output:   ${path.relative(ROOT, outputPath)}`);
    console.log(`  Pandoc:   (skipped)`);
    return;
  }
```

- [ ] **Step 5: Run the test to verify it passes**

```bash
node --test tests/smoke.test.js
```
Expected: PASS. One test passed.

- [ ] **Step 6: Wire up `npm test`**

Edit `package.json`. Replace this line:

```json
    "test": "echo \"Error: no test specified\" && exit 1"
```

with:

```json
    "test": "node --test tests/"
```

- [ ] **Step 7: Verify `npm test` works**

```bash
npm test
```
Expected: PASS. The single dry-run test runs and passes.

- [ ] **Step 8: Commit**

```bash
git add pandoc/generate.js tests/fixtures/sample-doc.md tests/smoke.test.js package.json
git commit -m "$(cat <<'EOF'
Add --dry-run flag to pandoc/generate.js

- New flag validates input + reference template, prints planned
  output path, exits 0 without invoking Pandoc
- First test under tests/ using Node's built-in test runner
- Wire up npm test

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Add full Pandoc smoke run (Pandoc-conditional)

**Files:**
- Modify: `tests/smoke.test.js`

- [ ] **Step 1: Add the failing test**

Append to `tests/smoke.test.js` (after the existing test):

```javascript
const fs = require('node:fs');
const os = require('node:os');

function pandocAvailable() {
  const r = spawnSync('pandoc', ['--version'], { encoding: 'utf-8' });
  return r.status === 0;
}

test('generate.js produces a non-empty .docx when Pandoc is available', { skip: !pandocAvailable() && 'Pandoc not installed' }, () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'wc-smoke-'));
  const out = path.join(tmp, 'sample.docx');
  try {
    const result = spawnSync(
      process.execPath,
      [GENERATE, FIXTURE, '-o', out],
      { encoding: 'utf-8', cwd: ROOT, timeout: 30_000 }
    );
    assert.strictEqual(result.status, 0, `stderr: ${result.stderr}`);
    assert.ok(fs.existsSync(out), 'expected output .docx to exist');
    assert.ok(fs.statSync(out).size > 1024, 'expected output > 1 KB');
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
```

- [ ] **Step 2: Run the test**

```bash
npm test
```
Expected: PASS (assuming Pandoc 3.9+ is on PATH). Two tests passed. If Pandoc isn't installed, you'll see a `skip` marker — that's also acceptable.

- [ ] **Step 3: Commit**

```bash
git add tests/smoke.test.js
git commit -m "$(cat <<'EOF'
Add full Pandoc smoke run to smoke tests

Skips gracefully when Pandoc isn't installed. Verifies the
generator produces a non-empty .docx for the sample fixture.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Add Lua-filter test via JSON AST

**Files:**
- Create: `tests/filter.test.js`

- [ ] **Step 1: Write the failing test**

```javascript
const test = require('node:test');
const assert = require('node:assert');
const { spawnSync } = require('node:child_process');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const FIXTURE = path.join(ROOT, 'tests', 'fixtures', 'sample-doc.md');
const FILTER = path.join(ROOT, 'pandoc', 'filters', 'wakecap.lua');

function pandocAvailable() {
  const r = spawnSync('pandoc', ['--version'], { encoding: 'utf-8' });
  return r.status === 0;
}

const SIGNAL_WORDS = ['DANGER', 'WARNING', 'CAUTION', 'NOTICE', 'NOTE', 'TIP', 'IMPORTANT'];

test('lua filter transforms every fenced-div class into RawBlock OpenXML', { skip: !pandocAvailable() && 'Pandoc not installed' }, () => {
  const result = spawnSync(
    'pandoc',
    [FIXTURE, '-t', 'json', '--lua-filter', FILTER],
    { encoding: 'utf-8', timeout: 30_000 }
  );
  assert.strictEqual(result.status, 0, `stderr: ${result.stderr}`);

  const ast = JSON.parse(result.stdout);

  // Walk the AST collecting all RawBlocks of format "openxml"
  const rawXml = [];
  function walk(node) {
    if (Array.isArray(node)) { node.forEach(walk); return; }
    if (node && typeof node === 'object') {
      if (node.t === 'RawBlock' && Array.isArray(node.c) && node.c[0] === 'openxml') {
        rawXml.push(node.c[1]);
      }
      Object.values(node).forEach(walk);
    }
  }
  walk(ast.blocks || ast);

  const allXml = rawXml.join('\n');

  for (const word of SIGNAL_WORDS) {
    assert.ok(
      allXml.includes(`>${word}<`) || allXml.includes(word),
      `expected ${word} signal word in filter output`
    );
  }
});

test('lua filter wraps [TBD] markers in Strong', { skip: !pandocAvailable() && 'Pandoc not installed' }, () => {
  const result = spawnSync(
    'pandoc',
    [FIXTURE, '-t', 'json', '--lua-filter', FILTER],
    { encoding: 'utf-8', timeout: 30_000 }
  );
  assert.strictEqual(result.status, 0, `stderr: ${result.stderr}`);

  const ast = JSON.parse(result.stdout);

  // Look for a Strong element whose stringified content is "[TBD]"
  let found = false;
  function walk(node) {
    if (found) return;
    if (Array.isArray(node)) { node.forEach(walk); return; }
    if (node && typeof node === 'object') {
      if (node.t === 'Strong' && Array.isArray(node.c)) {
        const text = node.c.map(c => c && c.t === 'Str' ? c.c : '').join('');
        if (text === '[TBD]') { found = true; return; }
      }
      Object.values(node).forEach(walk);
    }
  }
  walk(ast.blocks || ast);

  assert.ok(found, 'expected [TBD] to be wrapped in Strong by the filter');
});
```

- [ ] **Step 2: Run and verify**

```bash
npm test
```
Expected: PASS. Smoke + filter tests all green (or skipped if Pandoc missing).

- [ ] **Step 3: Commit**

```bash
git add tests/filter.test.js
git commit -m "$(cat <<'EOF'
Add Lua filter test using Pandoc JSON AST

Asserts every supported fenced-div class produces a RawBlock
of openxml format containing the expected signal word, and that
[TBD] markers are wrapped in Strong. Walks AST without unzipping
.docx — zero new dependencies.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Add KB validator test

**Files:**
- Create: `tests/fixtures/sample-kb.md`
- Create: `tests/validators.test.js`

- [ ] **Step 1: Create `tests/fixtures/sample-kb.md`**

The fixture must satisfy `kb-validator.js`'s checks: all 7 required sections, model number, units on numeric specs.

```markdown
# Sample Product - Product Knowledge

## Product Identity

- **Product name:** Sample Sensor
- **Model numbers:** SP-1000-A
- **Variants:** SP-1000-B (extended range)
- Manufacturer: WakeCap Technologies

## Specifications

| Parameter | Value | Unit |
|:----------|------:|:----:|
| Supply voltage | 12 | V |
| Operating temperature | -40 to +60 | deg C |
| Power consumption | 1.5 | W |

## Interfaces

- RS485 (Modbus RTU)
- USB-C (configuration only)
- 4-pin M12 connector — pinout: 1=V+, 2=GND, 3=A, 4=B

## Procedures

### Installation

1. Install bracket on a flat surface using M6 fasteners.
2. Connect the 4-pin M12 cable observing pinout.
3. Apply 12 V supply voltage.
4. Verify the green LED is steady.

### Maintenance

1. Inspect cable seals every 6 months.
2. Clean optical surfaces with isopropyl alcohol.

## Safety

- DANGER: H~2~S exposure above 10 ppm — evacuate the area.
- WARNING: Electrical hazard — de-energize before servicing.
- Safe-use conditions: -40 to +60 deg C, 0 to 100 % RH.

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| LED off | No supply voltage | Verify 12 V at terminals |
| RS485 no response | Wrong baud rate | Set master to 9600 8N1 |

## Glossary

- **PPE** - Personal Protective Equipment
- **RTU** - Remote Terminal Unit (Modbus protocol variant)
```

- [ ] **Step 2: Sanity-check the fixture passes the validator manually**

```bash
node templates/kb-validator.js tests/fixtures/sample-kb.md
```
Expected: exit code 0. Some warnings or info messages are acceptable. If errors, edit the fixture to address them before continuing.

- [ ] **Step 3: Write the failing test in `tests/validators.test.js`**

```javascript
const test = require('node:test');
const assert = require('node:assert');
const { spawnSync } = require('node:child_process');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const KB_VALIDATOR = path.join(ROOT, 'templates', 'kb-validator.js');
const FIXTURE_KB = path.join(ROOT, 'tests', 'fixtures', 'sample-kb.md');

test('kb-validator.js exits 0 on the sample-kb fixture', () => {
  const result = spawnSync(
    process.execPath,
    [KB_VALIDATOR, FIXTURE_KB],
    { encoding: 'utf-8', cwd: ROOT }
  );
  assert.strictEqual(result.status, 0, `validator output:\n${result.stdout}\n${result.stderr}`);
});
```

Note: this plan deliberately does NOT test `templates/validator.js` — its `--product` flag hardcodes the lookup directory to `knowledge-base/`, so testing it cleanly against a fixture would require either modifying the validator (out of scope per spec) or polluting `knowledge-base/` during the test. Skipped here; revisit in a follow-up.

- [ ] **Step 4: Run all tests and verify**

```bash
npm test
```
Expected: PASS. All four test files green (or appropriate skips for Pandoc-conditional ones).

- [ ] **Step 5: Commit**

```bash
git add tests/fixtures/sample-kb.md tests/validators.test.js
git commit -m "$(cat <<'EOF'
Add KB validator test against fixture

Runs templates/kb-validator.js against tests/fixtures/sample-kb.md
and asserts exit 0. Fixture covers all 7 required sections.

validator.js is not tested here — its --product flag is hardcoded
to knowledge-base/, which would require either refactoring or
test-time pollution. Out of scope for this hygiene pass.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: README rewrite

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Replace `README.md` wholesale**

Overwrite with this content:

````markdown
# WakeCap Documentation Expert

A Claude-driven documentation engine that produces professional `.docx` engineering documentation for any WakeCap IoT product. Knowledge bases (`.md`) flow through Claude → Pandoc-flavored markdown → Pandoc with WakeCap reference templates → `.docx`.

---

## Quick Start

### 1. Add a product knowledge base

Place a `.md` file under `knowledge-base/` named after the product (kebab-case), or paste the content into a Claude session and the assistant will save it for you.

```
knowledge-base/
├── SCHEMA.md           # required structure (committed)
├── weather-station.md  # user-provided (gitignored)
└── your-product.md     # user-provided (gitignored)
```

`knowledge-base/*.md` is gitignored except `SCHEMA.md`. Each contributor maintains their own product KBs locally.

### 2. Request documentation

Ask Claude (e.g. via the `/generate-doc` skill) for a specific document type:

- "Create a Product Manual for the Weather Station"
- "Create a Quick Reference for the Gateway, Version A"
- "Create a Troubleshooting Guide for the MODBUS Asset"

### 3. Convert to `.docx`

```bash
node pandoc/generate.js output/weather-station/WC-WS-PM-v1.0.md
node pandoc/generate.js output/weather-station/WC-WS-DS-v1.0.md --version A
node pandoc/generate.js output/weather-station/WC-WS-PM-v1.0.md --dry-run   # validate, don't run pandoc
```

---

## Available Document Templates

### Sales & Stakeholder
| Template | File | Code |
|----------|------|------|
| Product Datasheet | `instructions/DATASHEET.md` | DS |
| Product Overview | `instructions/PRODUCT-OVERVIEW.md` | PO |
| Solution Brief | `instructions/SOLUTION-BRIEF.md` | SB |
| Compliance Summary | `instructions/COMPLIANCE-SUMMARY.md` | CS |

### Field Deployment
| Template | File | Code |
|----------|------|------|
| Quick Reference | `instructions/QUICK-REFERENCE.md` | QR |
| Installation Guide | `instructions/INSTALLATION-GUIDE.md` | IG |
| Setup Guide | `instructions/SETUP-GUIDE.md` | SG |
| Commissioning Guide | `instructions/COMMISSIONING-GUIDE.md` | CG |
| Troubleshooting Guide | `instructions/TROUBLESHOOTING.md` | TG |
| Maintenance Manual | `instructions/MAINTENANCE-MANUAL.md` | MG |

### Engineering & Integration
| Template | File | Code |
|----------|------|------|
| Product Manual | `instructions/PRODUCT-MANUAL.md` | PM |
| Technical Reference | `instructions/TECHNICAL-REFERENCE.md` | TR |
| Interface Control Document | `instructions/INTERFACE-CONTROL-DOCUMENT.md` | ICD |
| System Integration Guide | `instructions/SYSTEM-INTEGRATION-GUIDE.md` | SIG |
| Safety Manual | `instructions/SAFETY-MANUAL.md` | SM |
| Release Notes | `instructions/RELEASE-NOTES.md` | RN |

### Operations
| Template | File | Code |
|----------|------|------|
| Operations Guide | `instructions/OPERATIONS-GUIDE.md` | OG |
| Runbook | `instructions/RUNBOOK.md` | RB |

The master typography / colour / safety-panel rules live in `instructions/STYLE-GUIDE.md`.

Need a different document type? Ask Claude — the assistant will help define the structure (or research a standard one) and add a new template under `instructions/`.

---

## Style Versions

- **Version A — Marketing/Sales.** Larger fonts, more whitespace, benefit-focused language.
- **Version B — Technical/Field** *(default).* Denser layout, neutral colours, spec-focused.

Pass `--version A` or `--version B` to `pandoc/generate.js`.

---

## Folder Structure

```
WakeCap-Doc-Expert/
├── CLAUDE.md                    # Main instructions for Claude
├── README.md                    # This file
├── package.json
│
├── pandoc/                      # Pandoc pipeline
│   ├── generate.js              # Single-doc generator (supports --dry-run)
│   ├── generate-all.js          # Batch generator
│   ├── create-reference.js      # Regenerate reference templates
│   ├── reference-A.docx         # Marketing/sales template
│   ├── reference-B.docx         # Technical template
│   ├── defaults-A.yaml
│   ├── defaults-B.yaml
│   └── filters/
│       └── wakecap.lua          # Safety panels, callouts, [TBD] highlighter
│
├── instructions/                # 18 doc templates + STYLE-GUIDE.md
│
├── knowledge-base/              # Product KBs (gitignored except SCHEMA.md)
│   └── SCHEMA.md
│
├── templates/                   # Validators and helpers
│   ├── kb-validator.js          # KB schema validator
│   ├── validator.js             # Doc-quality validator
│   ├── version-manager.js       # Doc-version tracking
│   └── xref-index.js            # Cross-reference index
│
├── tests/                       # node:test smoke tests
│   ├── smoke.test.js
│   ├── filter.test.js
│   ├── validators.test.js
│   └── fixtures/
│
├── styles/
│   └── color-codes.md
│
├── images/                      # Product images (gitignored)
│
├── output/                      # Generated docs (gitignored under product subdirs)
│
├── archive/                     # Historical artifacts (tracked)
│   └── old_generators/          # Pre-Pandoc JS generators
│
└── docs/superpowers/            # Specs and implementation plans
```

---

## Scripts

| Command | What it does |
|---------|--------------|
| `npm test` | Runs the smoke + filter + validator tests under `tests/`. Pandoc-dependent tests skip cleanly if Pandoc isn't on PATH. |
| `npm run generate` | `node pandoc/generate.js` — single-doc generator |
| `npm run generate:all` | Batch generator |
| `npm run create-ref` | Regenerate reference templates from style guide |
| `npm run validate:kb` | Validate `knowledge-base/*.md` against `SCHEMA.md` |
| `npm run validate:doc` | Doc-quality validator (units, action verbs) |
| `npm run xref` | Build cross-reference index |
| `npm run version` | Document version manager / manifest |

---

## Testing

```bash
npm test
```

Tests use Node's built-in `node:test` runner — no additional dependencies. Coverage:

- **Smoke** — `pandoc/generate.js --dry-run` always runs; full Pandoc invocation runs only if Pandoc 3.9+ is on PATH (otherwise skipped with a clear message).
- **Filter** — Pandoc-conditional. Inspects the post-filter JSON AST to confirm every fenced-div class (`danger`, `warning`, `caution`, `notice`, `note`, `tip`, `important`) produces the expected `RawBlock` and that `[TBD]` markers are wrapped in `Strong`.
- **Validators** — `templates/kb-validator.js` runs against a checked-in fixture under `tests/fixtures/`.

---

## File Naming Convention

```
WC-[PRODUCT]-[DOCTYPE]-v[VERSION].md     (source markdown)
WC-[PRODUCT]-[DOCTYPE]-v[VERSION].docx   (generated output)

Examples:
WC-WS-PM-v1.0.md     (Weather Station Product Manual — source)
WC-WS-PM-v1.0.docx   (Weather Station Product Manual — output)
WC-GW-QR-v1.0.docx   (Gateway Quick Reference)
WC-PS-SG-v1.0.docx   (Power Solutions Setup Guide)
```

---

## Quality Gates

Before a doc is released:

1. **Engineering review** — technical accuracy
2. **Safety review** — ANSI Z535.4 hazard communication
3. **Usability review** — field-technician readability

---

## Archive

Pre-Pandoc legacy generators live under `archive/old_generators/`. Read them for context only; the live engine is in `pandoc/`.

---

## References

- IEC/IEEE 82079-1 — Preparation of information for use
- ANSI Z535.4 — Product Safety Signs and Labels
- DITA-style topic-based authoring (concept / task / reference)

---

WakeCap Technologies
````

- [ ] **Step 2: Run tests one more time as a regression check**

```bash
npm test
```
Expected: PASS. README rewrite shouldn't break anything.

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "$(cat <<'EOF'
Rewrite README to match repo reality

- List all 18 templates instead of 4
- Drop broken reference to templates/docx-generator.js
- Document pandoc/, archive/, tests/ folders accurately
- Add Testing and Archive sections
- Document --dry-run flag and the npm scripts that exist

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Final Verification

After all six commits:

```bash
git log --oneline
npm test
git status
ls archive/old_generators/ | head -3
ls .mppt_dashboard.pid 2>&1 | grep -i "no such" && echo "OK"
ls output/WC-WS-*.docx 2>&1 | grep -i "no such" && echo "OK"
```

Expected:
- 6 new commits on top of the spec commit
- `npm test` green (Pandoc-conditional tests may skip if Pandoc missing — that's fine)
- Clean `git status`
- `archive/old_generators/` populated, `.mppt_dashboard.pid` and root-level `WC-WS-*.docx` gone

---

## Out of Scope (Punted)

- `templates/validator.js` test (requires refactor to accept arbitrary file paths)
- `--toc=false` / `--number-sections=false` Pandoc syntax in `generate.js` lines 230, 232 (latent bug, not exercised by any current test)
- CI / GitHub Actions
- Pre-commit hooks

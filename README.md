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

- **Smoke** — `pandoc/generate.js --dry-run` always runs; full Pandoc invocation runs only if Pandoc is on PATH (otherwise skipped with a clear message).
- **Filter** — Pandoc-conditional. Walks the post-filter JSON AST and asserts that the OpenXML emitted for the seven fenced-div classes (`danger`, `warning`, `caution`, `notice`, `note`, `tip`, `important`) includes each corresponding signal word (DANGER, WARNING, …), and that `[TBD]` markers are wrapped in a `Strong` node.
- **Validators** — `templates/kb-validator.js` runs against checked-in fixtures (one valid, one missing a required section) to verify both the success and error paths.

The test runner pattern `node --test tests/**/*.test.js` requires Node 21+ for native glob handling. The repo is otherwise compatible with Node 18+.

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

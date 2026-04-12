# WakeCap Documentation Expert

A modular Claude Expert system for creating consistent, professional technical documentation for **any** WakeCap IoT product deployed in mega construction and oil & gas environments.

---

## Quick Start

### 1. Add Your Product Knowledge Base
Either place a file in `knowledge-base/` or paste the content directly in the terminal:

```
knowledge-base/
├── weather-station.md       <- Already included
├── power-solutions.md       <- Already included
└── your-product.md          <- Add your file here
```

If you paste content directly, it will be saved automatically as `knowledge-base/<product-name>.md`.

### 2. Request Documentation
Tell Claude what you need:
```
"Create a Product Manual for the Weather Station"
"Create a Setup Guide for the Smart Hat"
"Create a Quick Reference Card for the Gateway, Version B"
"Create a Troubleshooting Guide for the MODBUS Asset"
```

### 3. Use the Skill (optional)
Type `/generate-doc` to launch the guided documentation generation workflow.

---

## Available Templates

| Template | File | Purpose |
|----------|------|---------|
| Product Manual | `instructions/PRODUCT-MANUAL.md` | Comprehensive technical documentation |
| Setup / Installation Guide | `instructions/SETUP-GUIDE.md` | Mechanical & electrical deployment |
| Quick Reference | `instructions/QUICK-REFERENCE.md` | Field reference card (1-2 pages) |
| Troubleshooting Guide | `instructions/TROUBLESHOOTING.md` | Symptom-based diagnostics |

**Need a different document type?** Just ask. The system will help you define the structure (or research it) and create a reusable template.

---

## Style Versions

**Version A (Marketing/Sales)**
- Larger fonts, more white space
- WakeCap Blue headers
- Benefit-focused language

**Version B (Technical/Field)** *(default)*
- Denser layout, neutral colors
- Spec-focused language
- Suitable for field technicians and engineers

---

## Folder Structure

```
WakeCap-Doc-Expert/
├── CLAUDE.md                    # Main instructions for Claude
├── README.md                    # This file
├── package.json                 # npm dependencies
│
├── instructions/                # Document templates & style guide
│   ├── STYLE-GUIDE.md           # Master style specifications
│   ├── PRODUCT-MANUAL.md        # Product Manual template
│   ├── SETUP-GUIDE.md           # Setup/Installation Guide template
│   ├── QUICK-REFERENCE.md       # Quick Reference template
│   └── TROUBLESHOOTING.md       # Troubleshooting Guide template
│
├── knowledge-base/              # Product knowledge files
│   ├── weather-station.md
│   └── power-solutions.md
│
├── styles/
│   └── color-codes.md           # Color palette reference
│
├── templates/
│   └── docx-generator.js        # Base .docx generation library
│
├── output/                      # Generated docs (by product)
│   ├── weather-station/
│   ├── gateway/
│   └── power-solutions/
│
└── generators/                  # Archived product-specific JS scripts
```

---

## File Naming Convention

```
WC-[PRODUCT]-[DOCTYPE]-v[VERSION].docx

Examples:
WC-WS-PM-v1.0.docx     (Weather Station Product Manual)
WC-GW-QR-v1.0.docx     (Gateway Quick Reference)
WC-PS-SG-v1.0.docx     (Power Solutions Setup Guide)
```

---

## Adding a New Product

1. **Create knowledge base** - Add `<product-name>.md` to `knowledge-base/` (or paste content in terminal)
2. **Request documentation** - Specify document type and optional style version
3. **Review output** - Fill any `[TBD]` placeholders and replace `[IMAGE: ...]` placeholders with actual images

---

## Quality Gates

Before release, every document should pass:

1. **Engineering review** - Technical accuracy verification
2. **Safety review** - Hazard communication compliance (ANSI Z535.4)
3. **Usability review** - Field technician readability check

---

## References

- IEC/IEEE 82079-1: Preparation of information for use
- ANSI Z535.4: Product Safety Signs and Labels
- Topic-based authoring (DITA-style concept/task/reference)

---

WakeCap Technologies

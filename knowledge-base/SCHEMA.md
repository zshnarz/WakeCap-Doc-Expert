# Knowledge Base File Schema

This document defines the required structure and formatting rules for all knowledge base files in the `knowledge-base/` directory. Every product knowledge file must conform to this schema to ensure consistent, machine-validatable documentation.

## Required Sections

Every knowledge base file **must** contain the following seven top-level sections. Section numbering is recommended but not enforced; the validator checks for the section heading text.

### 1. Product Identity

**Heading:** `## Product Identity` (or includes "Product Identity" in a ## heading)

Must include:
- **Product name** - The official product name
- **Model numbers** - At least one model number or part number
- **Variants** - List of sub-models, configurations, or optional components (if applicable)
- Manufacturer and/or distributor information (recommended)
- Equipment classification (recommended)
- Primary purpose / intended use (recommended)

### 2. Specifications

**Heading:** `## Specifications` (or includes "Specifications" or "Specs" in a ## heading)

This section covers electrical, environmental, and mechanical specifications. Rules:
- All numeric specifications **must include units** (e.g., `12 V`, `0 to 70 m/s`, `-20 to +50 deg C`)
- Use standard unit abbreviations: V, A, W, Hz, MHz, m/s, deg C, %, hPa, ppm, mm, ug/m3, MOhm, mA
- Ranges should use the format: `X to Y unit` or `X - Y unit`
- Accuracy should use the format: `+/-value unit`
- Tables are the preferred format for specification listings
- Group specifications by category (electrical, environmental, mechanical) using ### sub-headings

### 3. Interfaces

**Heading:** `## Interfaces` (or includes "Interfaces" or "Connections" or "Wiring" in a ## heading)

Must include:
- All physical ports and connectors
- Communication protocols (e.g., RS485, RS232, USB, WiFi, Ethernet)
- Pinouts for wired connections (where applicable)
- Cable type recommendations (where applicable)
- Signal direction (input/output)

### 4. Procedures

**Heading:** `## Procedures` (or includes "Procedures" or "Installation" or "Configuration" or "Maintenance" in a ## heading)

Must include at least one of:
- **Installation** procedures - Physical mounting, wiring, initial setup
- **Configuration** procedures - Software settings, parameter adjustments
- **Maintenance** procedures - Scheduled maintenance, calibration, replacement

Rules:
- Procedures must use numbered steps
- Each step should begin with an action verb (Install, Connect, Verify, Configure, etc.)
- Include prerequisites where applicable
- Include verification steps (how to confirm success)

### 5. Safety Information

**Heading:** `## Safety` (or includes "Safety" in a ## heading)

Must include:
- **Hazards** - Electrical, environmental, mechanical hazards
- **Warnings** - Actions that could cause injury or equipment damage
- **Safe-use conditions** - Operating limits, environmental constraints, PPE requirements

Rules:
- Use ANSI Z535.4 signal words: DANGER, WARNING, CAUTION, NOTICE
- Safety information must appear before any related procedural steps
- Include specific voltage/current/pressure limits where applicable

### 6. Troubleshooting

**Heading:** `## Troubleshooting` (or includes "Troubleshooting" in a ## heading)

Must include:
- **Symptoms** - Observable problems (LED behavior, display readings, communication failures)
- **Causes** - Root cause for each symptom
- **Fixes** - Step-by-step resolution for each cause

Preferred format: table with Symptom | Cause | Fix columns, or structured list with each symptom as a sub-heading.

### 7. Glossary and Definitions

**Heading:** `## Glossary` (or includes "Glossary" or "Definitions" in a ## heading)

Must include:
- All acronyms used in the document
- Technical terms specific to the product domain
- Unit definitions where non-obvious

Format: `TERM - Definition` or a markdown table.

## Formatting Rules

### Headers
- Use standard markdown headers: `#`, `##`, `###`
- Top-level document title: `# Product Name - Product Knowledge`
- Major sections: `##`
- Sub-sections: `###`
- Do **not** use `===` or `---` underline-style headers

### Specifications with Units
- Every numeric value in a specification **must** be followed by a unit
- Accepted unit patterns: any letters or symbols immediately following or near a number
- Examples of valid specs: `12 V`, `0 to 70 m/s`, `+/-0.5 deg C`, `<= 2W`, `108 MHz`
- Examples of invalid specs: `12` (no unit), `Range: 0 to 70` (no unit)

### Model Numbers
- Must appear in the Product Identity section
- Use the manufacturer's official format
- List all variants and sub-component model numbers

### Tables
- Use markdown pipe tables or ASCII-art tables
- Include header row
- Align columns for readability

### Placeholders
- Use `[TBD]` for any unknown or pending values
- Never leave a specification value blank

## Validation

Run the validator to check compliance:

```bash
# Validate a single file
node templates/kb-validator.js knowledge-base/weather-station.md

# Validate all knowledge base files
node templates/kb-validator.js
```

The validator checks:
- **Errors** (must fix): Missing required sections
- **Warnings** (should fix): Specifications without units, missing model numbers
- **Info** (optional): Suggestions for improvement

Exit code 0 = no errors, exit code 1 = errors found.

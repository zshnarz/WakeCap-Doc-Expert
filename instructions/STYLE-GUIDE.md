# WakeCap Documentation Style Guide

This is the master style reference for all WakeCap technical documentation. Every document MUST follow these specifications exactly to ensure brand consistency and compliance with industrial documentation standards.

---

## 1. Documentation Architecture

### 1.1 Topic-Based Content Model

All documentation is built from three reusable topic types. This enables single-sourcing and consistent generation across document types.

| Topic Type | Purpose | Content Characteristics |
|------------|---------|-------------------------|
| **Concept** | Explain what something is and why it matters | Definitions, architecture overviews, system context, principles |
| **Task** | Describe how to accomplish a goal | Numbered steps, prerequisites, expected outcomes, verification |
| **Reference** | Provide lookup information | Tables, specifications, codes, parameters, part numbers |

**Rules:**
- Each topic should be self-contained and reusable across documents
- Concept topics answer "what" and "why"
- Task topics answer "how" (always procedural)
- Reference topics provide data for lookup (always tabular or list-based)

### 1.2 Document Type Taxonomy

#### Sales and Stakeholder Documents

| Type | Code | Purpose | Typical Length |
|------|------|---------|----------------|
| Product Overview | PO | Marketing-oriented introduction | 2-4 pages |
| Product Datasheet | DS | Fast fit/no-fit decision for procurement | 1-2 pages |
| Solution Brief | SB | Industry-specific positioning | 2-4 pages |
| Compliance Summary | CS | Certifications and regulatory status | 1-2 pages |

#### Field Deployment Documents

| Type | Code | Purpose | Typical Length |
|------|------|---------|----------------|
| Quick Reference Guide | QR | Field reference card | 1-2 pages |
| Installation Guide | IG | Mechanical and electrical deployment | 8-16 pages |
| Commissioning Guide | CG | Bring-up, calibration, acceptance | 6-12 pages |
| Troubleshooting Guide | TG | Symptom-based diagnostics | 10-20 pages |
| Maintenance Manual | MG | Scheduled upkeep and servicing | 10-20 pages |

#### Engineering and Integration Documents

| Type | Code | Purpose | Typical Length |
|------|------|---------|----------------|
| Product Manual | PM | Comprehensive technical documentation | 30-60 pages |
| Technical Reference | TR | Complete technical truth for design/QA | 40-80 pages |
| Interface Control Document | ICD | Integration specification per interface | 10-30 pages |
| System Integration Guide | SIG | Reference architectures, network design | 15-30 pages |
| Safety Manual | SM | Safe-use conditions and constraints | 8-16 pages |
| Release Notes | RN | Version changes and compatibility | 2-4 pages |

#### Operations Documents

| Type | Code | Purpose | Typical Length |
|------|------|---------|----------------|
| Operations Guide | OG | Day-2 monitoring and alerts | 10-20 pages |
| Runbook | RB | Alert-to-action playbooks | 5-15 pages |

---

## 2. Design Patterns by Document Type

Each document type has specific design priorities. Follow these patterns for layout, density, and imagery.

### 2.1 Datasheet (DS)

**Primary goal:** Fast fit/no-fit decision for procurement and stakeholders.

| Element | Specification |
|---------|---------------|
| Layout | Two-column grid with "spec rail" for key numbers |
| Color usage | Minimal; strong section anchors |
| Hero content | Tables (specifications are the primary content) |
| Imagery | 1 hero photo + 1 dimensioned outline drawing |
| Language | Define unavoidable terms once; avoid jargon |

**Required sections:**
1. Product name and model matrix
2. Purpose (one paragraph) and key benefits
3. Key specifications table
4. Environmental ratings (temperature, ingress, shock/vibration)
5. Interfaces summary (power, comms, I/O)
6. Mechanical (dimensions, mounting)
7. Certifications and compliance summary
8. Ordering info, accessories, revision, support contact

### 2.2 Marketing Overview (PO)

**Primary goal:** Confidence and differentiation for non-technical decision makers.

| Element | Specification |
|---------|---------------|
| Layout | More white space; short paragraphs; benefit blocks |
| Color usage | Brand-forward accent color with accessible contrast |
| Hero content | Use-case tiles, KPI callouts, proof points |
| Imagery | High-quality photos + simple system context diagram |
| Language | Benefits over features; no unexplained acronyms |

**Required sections:**
1. Problem to outcome narrative
2. Where it fits (system context)
3. Differentiators and proof points
4. Industry use cases (construction and oil & gas variants)
5. Deployment story (adoption and rollout)
6. Security and reliability claims (only provable claims)
7. Packages/variants and next steps

### 2.3 Quick Reference Guide (QR)

**Primary goal:** Successful first setup under time pressure.

| Element | Specification |
|---------|---------------|
| Layout | 1-2 pages; big step numbers; single primary flow |
| Typography | Large (suitable for printing and harsh lighting) |
| Hero content | Annotated photos, LED meanings, verify success checklist |
| Imagery | Annotated photos + simplified wiring diagram + QR links |
| Language | Minimal; action-oriented; no background explanation |

**Required sections:**
1. Top safety warnings
2. What's in the box + required tools
3. Prerequisites (power, network, accounts)
4. Numbered setup steps (max 8)
5. LED/status meanings
6. Verify success checklist
7. QR links to full docs and support

### 2.4 Installation Guide (IG)

**Primary goal:** Safe and correct physical deployment.

| Element | Specification |
|---------|---------------|
| Layout | Phase-based structure |
| Hero content | Checklists, torque tables, connector tables |
| Safety | Warnings placed BEFORE the hazardous action |
| Imagery | Dimension drawings + mounting templates + pinouts |
| Language | Imperative; one action per step |

**Required sections:**
1. Scope + supported models/revisions
2. Safety + site requirements
3. Mounting (orientation, clearances, templates)
4. Wiring + grounding + surge protection
5. Sealing/IP practices (if relevant)
6. Network/comms setup
7. Power-up checks and common mistakes
8. Install completion checklist

### 2.5 Commissioning Guide (CG)

**Primary goal:** Prove it works and capture acceptance evidence.

| Element | Specification |
|---------|---------------|
| Layout | Checklist-first with pass/fail fields |
| Hero content | Expected ranges, acceptance criteria |
| Imagery | Screenshots of expected readings and typical ranges |
| Language | Precise; include measurement tolerances |

**Required sections:**
1. Preconditions (install complete, firmware version, tools)
2. Calibration steps with expected ranges
3. Connectivity validation
4. Sensor validation tests
5. Alarm/alert tests
6. Acceptance criteria + evidence capture
7. Handover checklist + sign-off

### 2.6 Troubleshooting Guide (TG)

**Primary goal:** Fast restore to service; minimal support back-and-forth.

| Element | Specification |
|---------|---------------|
| Layout | Symptom-based index + decision trees |
| Hero content | Symptom-to-fix tables |
| Imagery | Flowcharts and decision trees |
| Language | Direct; assume urgency |

**Table format:**
```
| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
```

**Required sections:**
1. Triage flow (power, comms, sensor, config)
2. Symptom-to-fix tables
3. LED/error code dictionary
4. Log collection steps
5. Escalation criteria (what to send support)
6. Known issues by version

### 2.7 Technical Reference Manual (TR)

**Primary goal:** Complete technical truth for design, review, and QA.

| Element | Specification |
|---------|---------------|
| Layout | Strict hierarchy; deep TOC; consistent numbering |
| Hero content | Block diagrams, state machines, register maps |
| Imagery | Block diagrams, timing diagrams, performance curves |
| Language | Precise; define all terms; no marketing claims |

**Required sections:**
1. Technical overview and block diagram
2. Functional architecture
3. Electrical specs + power profiles
4. Environmental + reliability specs
5. Interfaces (deep reference)
6. Performance characteristics and limits
7. Firmware behavior notes + safety considerations
8. Appendix: glossary, acronyms, references

### 2.8 Interface Control Document (ICD)

**Primary goal:** Integration without guesswork.

| Element | Specification |
|---------|---------------|
| Layout | Rigid tables; versioned interfaces |
| Hero content | Examples and test vectors |
| Imagery | Sequence diagrams and message flow diagrams |
| Language | Unambiguous; include all edge cases |

**Required sections:**
1. Purpose + scope
2. Interface summary table (all ports/protocols)
3. Electrical details (pinouts, levels)
4. Protocol spec (framing, timing, retries)
5. Data model (registers/fields, scaling, units)
6. Error handling
7. Example transactions + test vectors
8. Compatibility + versioning rules

### 2.9 Maintenance Manual (MG)

**Primary goal:** Predictable upkeep and safe servicing.

| Element | Specification |
|---------|---------------|
| Layout | Interval-based organization |
| Hero content | Intervals, inspection points, replacement procedures |
| Imagery | Exploded views and replaceable module photos |
| Language | Procedural; include verification steps |

**Required sections:**
1. Safety and lockout considerations
2. Maintenance intervals and inspection points
3. Cleaning, sealing, corrosion and environmental guidance
4. Replacement procedures (step-by-step)
5. Spare parts list + part numbers + compatible revisions
6. Post-maintenance verification checklist

---

## 3. Typography System

### 3.1 Primary Font: Source Sans Pro
- Available weights: Light, Regular, SemiBold, Bold
- Use for: All text content
- Fallback: Arial (if Source Sans Pro unavailable)

### 3.2 Secondary Font: Roboto Mono
- Use for: Code, serial numbers, technical values, register addresses
- Fallback: Consolas, Courier New

### 3.3 Heading Hierarchy

#### Version A (Marketing/Sales)

| Element | Font | Size (pt) | Weight | Color | Spacing Before | Spacing After |
|---------|------|-----------|--------|-------|----------------|---------------|
| H1 - Document Title | Source Sans Pro | 28 | Bold | #1E3A8A | 0 | 480 twips |
| H2 - Section | Source Sans Pro | 20 | SemiBold | #1E3A8A | 360 twips | 240 twips |
| H3 - Subsection | Source Sans Pro | 14 | SemiBold | #374151 | 240 twips | 120 twips |
| H4 - Sub-subsection | Source Sans Pro | 12 | SemiBold | #64748B | 180 twips | 80 twips |
| Body Text | Source Sans Pro | 11 | Regular | #212121 | 0 | 160 twips |
| Caption | Source Sans Pro | 9 | Regular | #64748B | 80 twips | 80 twips |

#### Version B (Technical/Field)

| Element | Font | Size (pt) | Weight | Color | Spacing Before | Spacing After |
|---------|------|-----------|--------|-------|----------------|---------------|
| H1 - Document Title | Source Sans Pro | 24 | Bold | #212121 | 0 | 360 twips |
| H2 - Section | Source Sans Pro | 18 | SemiBold | #374151 | 300 twips | 180 twips |
| H3 - Subsection | Source Sans Pro | 12 | SemiBold | #374151 | 200 twips | 100 twips |
| H4 - Sub-subsection | Source Sans Pro | 11 | Medium | #616161 | 160 twips | 60 twips |
| Body Text | Source Sans Pro | 10 | Regular | #212121 | 0 | 120 twips |
| Caption | Source Sans Pro | 8 | Regular | #9E9E9E | 60 twips | 60 twips |

### 3.4 Line Spacing
- Version A: 1.4x (140%) for body text
- Version B: 1.25x (125%) for body text
- Headings: 1.2x (120%) for both versions

### 3.5 Line Length Target
- 60-70 characters per line for optimal readability

---

## 4. Color Palette

### 4.1 Primary Brand Colors

| Role | Name | Hex | RGB | Usage |
|------|------|-----|-----|-------|
| Primary | WakeCap Blue | #0063A3 | (0, 99, 163) | Headers, accents, links |
| Primary Dark | Deep Blue | #004F83 | (0, 79, 131) | Hover states, footers |
| Accent | Alert Orange | #FB923C | (251, 146, 60) | Construction safety tie-in, CTAs |

### 4.2 Text Colors

| Role | Name | Hex | RGB |
|------|------|-----|-----|
| Text Primary | Charcoal | #212121 | (33, 33, 33) |
| Text Secondary | Slate | #64748B | (100, 116, 139) |
| Text Tertiary | Gray | #9E9E9E | (158, 158, 158) |

### 4.3 Background Colors

| Role | Name | Hex | RGB |
|------|------|-----|-----|
| Background Primary | White | #FFFFFF | (255, 255, 255) |
| Background Secondary | Light Gray | #F8F9FA | (248, 249, 250) |
| Dividers/Borders | Border Gray | #E0E0E0 | (224, 224, 224) |

### 4.4 ANSI Safety Colors (Mandatory for Safety Panels)

| Signal Word | Background Hex | Text Hex | Text Color |
|-------------|----------------|----------|------------|
| DANGER | #BD2024 | #FFFFFF | White |
| WARNING | #FF7900 | #000000 | Black |
| CAUTION | #EED202 | #000000 | Black |
| NOTICE | #004488 | #FFFFFF | White |

### 4.5 Callout Box Colors

| Type | Background Hex | Left Border Hex | Icon Color Hex |
|------|----------------|-----------------|----------------|
| Note | #EFF6FF | #3B82F6 | #2563EB |
| Tip | #F0FDF4 | #22C55E | #16A34A |
| Important | #FDF4FF | #A855F7 | #9333EA |

---

## 5. Page Layout

### 5.1 Page Size
- Primary: A4 (210mm x 297mm / 11906 x 16838 DXA)
- Alternative: US Letter (8.5" x 11" / 12240 x 15840 DXA)

### 5.2 Margins (A4)

| Edge | Version A | Version B |
|------|-----------|-----------|
| Top | 20mm (1134 twips) | 18mm (1020 twips) |
| Bottom | 20mm (1134 twips) | 18mm (1020 twips) |
| Inside (binding) | 25mm (1417 twips) | 22mm (1247 twips) |
| Outside | 18mm (1020 twips) | 15mm (850 twips) |

### 5.3 Grid System

**Version A (Marketing):** 2-column layout
- Column width: 82mm each
- Gutter: 10mm
- Use for: Product overviews, datasheets, brochures

**Version B (Technical):** Single column or 3-column for dense specs
- Single column width: 170mm
- 3-column width: 53mm each, 8mm gutters
- Use for: Technical specs, field guides, internal docs

### 5.4 Spacing Scale (8px base unit = 160 twips)

| Use | Twips | Millimeters |
|-----|-------|-------------|
| Paragraph spacing | 320 | 5.6mm |
| Section spacing | 640 | 11.3mm |
| Table cell padding | 160 (v), 240 (h) | 2.8mm, 4.2mm |
| Callout box padding | 320 | 5.6mm |
| Icon-to-text gap | 160 | 2.8mm |

---

## 6. Tables

### 6.1 Specification Table Structure

```
| Parameter | Symbol | Conditions | Min | Typ | Max | Unit |
```

### 6.2 Table Styling

| Element | Specification |
|---------|---------------|
| Header row background | #0063A3 (WakeCap Blue) |
| Header row text | White, SemiBold, 9pt |
| Header row height | 640 twips (32px) |
| Data row height | 560 twips (28px) |
| Alternating row background | #F8F9FA on odd rows |
| Cell padding | 160 twips vertical, 240 twips horizontal |
| Border | 1px #E0E0E0, horizontal rules only |
| Numerical alignment | Right-aligned, decimals aligned |

### 6.3 Feature Comparison Tables
- Checkmarks: Use check icon in WakeCap Blue (#0063A3)
- Unavailable: Use em dash (—)
- Recommended column: Light blue background (#EFF6FF)

### 6.4 Troubleshooting Tables

| Column | Width | Content |
|--------|-------|---------|
| Symptom | 25% | Observable problem |
| Likely Cause | 20% | Root cause |
| Quick Checks | 20% | Diagnostic steps |
| Fix | 25% | Resolution procedure |
| Escalate When | 10% | Escalation criteria |

---

## 7. Safety Information Panels

### 7.1 Panel Structure

```
+----------------------------------------------+
| [Symbol] [SIGNAL WORD]                       | <- Colored header (32px min)
+----------------------------------------------+
| [Hazard Symbol]  Hazard identification       | <- White message panel
|                  Consequence if not avoided  |
|                  How to avoid the hazard     |
+----------------------------------------------+
```

### 7.2 Signal Word Hierarchy (ANSI Z535.4)

1. **DANGER** - Immediate hazard WILL cause death or serious injury
2. **WARNING** - Hazard COULD cause death or serious injury
3. **CAUTION** - Hazard COULD cause minor or moderate injury
4. **NOTICE** - Property damage or important information (no injury)

### 7.3 Panel Specifications
- Signal word panel height: 640 twips minimum
- Safety alert symbol: 24px, left of signal word
- Message panel padding: 320 twips all sides
- Body text: Source Sans Pro Regular, 10pt, sentence case (NOT all caps)

### 7.4 Placement Rule
**Safety warnings MUST appear BEFORE the hazardous step, not after.**

---

## 8. Callout Boxes

### 8.1 Note Box
```
+---------------------------------------------+
| [i] NOTE                                    |
| ------------------------------------------- |
| Information that clarifies or adds context. |
+---------------------------------------------+
```
- Background: #EFF6FF
- Left border: 4px solid #3B82F6
- Icon: Info icon in #2563EB

### 8.2 Tip Box
```
+---------------------------------------------+
| [bulb] TIP                                  |
| ------------------------------------------- |
| Helpful suggestion to improve outcome.      |
+---------------------------------------------+
```
- Background: #F0FDF4
- Left border: 4px solid #22C55E
- Icon: Lightbulb in #16A34A

### 8.3 Important Box
```
+---------------------------------------------+
| [!] IMPORTANT                               |
| ------------------------------------------- |
| Critical information for correct operation. |
+---------------------------------------------+
```
- Background: #FDF4FF
- Left border: 4px solid #A855F7
- Icon: Exclamation in #9333EA

---

## 9. Numbered Procedures

### 9.1 Step Format

```
[Number Badge]  [Bold action verb] [object] [condition/result]
                [Supporting detail in regular weight]
                [Sub-step a., b., c. if needed]
```

### 9.2 Number Badge Specifications
- Size: 24px diameter circle
- Background: #0063A3 (WakeCap Blue)
- Number: White, Source Sans Pro Bold, 12pt, centered
- Gap to text: 240 twips (12px)

### 9.3 Procedure Writing Rules
1. Start each step with an action verb (Connect, Install, Verify, etc.)
2. One action per step
3. Include expected result where applicable
4. Sub-steps use lowercase letters (a, b, c)
5. Maximum 10 steps per procedure; break into sections if more
6. Safety warnings appear BEFORE the step they apply to

---

## 10. Image Strategy

### 10.1 Image Types by Document

| Image Type | Best Use | Document Types |
|------------|----------|----------------|
| High-quality product photos | Hero images, box contents, connector ID | DS, PO, QR |
| Annotated photos (callouts) | Installation steps, mounting, cable routing | IG, QR, MG |
| Line drawings (dimensioned) | Measurements, hole patterns, clearances | DS, IG |
| Wiring diagrams (simplified) | Correct wiring at a glance | QR, IG |
| Schematics excerpts | Troubleshooting, validation | TR, TG |
| Block diagrams | Architecture alignment | TR, PM, ICD |
| Exploded views / part maps | Maintenance, spare parts | MG |
| Flowcharts / decision trees | Troubleshooting triage, escalation | TG |
| Screenshots (apps/platform) | Commissioning, configuration, acceptance | CG, IG |
| Plots / typical curves | Performance characteristics | TR, DS |
| Sequence diagrams | Message flows, protocol behavior | ICD |

### 10.2 Image Placement Rules
- Images should appear immediately after the text that references them
- Never place an image before its first reference
- Annotated photos preferred over plain photos for procedures
- Use callout numbers that match step numbers in procedures

### 10.3 Image Placeholder Format

```
[IMAGE: Brief description of required illustration]

Examples:
[IMAGE: WS Box front panel showing LCD display and terminal layout]
[IMAGE: Isometric view of complete Weather Station assembly]
[IMAGE: Step 3 - Connecting RS485 cables to MODBUS Asset terminals]
[IMAGE: Decision tree for LED fault diagnosis]
```

### 10.4 Placeholder Box Styling
- Border: 2px dashed #9E9E9E
- Background: #F8F9FA
- Padding: 320 twips
- Text: Source Sans Pro Italic, 10pt, #64748B, centered
- Minimum height: 1500 twips (approximately 1 inch)

---

## 11. Headers and Footers

### 11.1 Header Content

| Position | Content | Font |
|----------|---------|------|
| Left | "WakeCap [Product Name] [Doc Type]" | Source Sans Pro SemiBold, 10pt |
| Center | Current section title | Source Sans Pro Regular, 9pt |
| Right | WakeCap logo (15mm height) | — |

### 11.2 Footer Content

| Position | Content | Font |
|----------|---------|------|
| Left | Document number (e.g., WC-WS01-PM-v1.0) | Source Sans Pro Regular, 8pt |
| Center | Revision date | Source Sans Pro Regular, 8pt |
| Right | Page X of Y | Source Sans Pro Regular, 8pt |

### 11.3 Header/Footer Rules
- 0.5pt horizontal rule, #E0E0E0
- 160 twips gap between rule and content
- No header on cover page
- Footer on all pages including cover

---

## 12. Document Numbering and Versioning

### 12.1 Document ID Format

```
WC-[PRODUCT]-[TYPE]-v[VERSION]

WC = WakeCap prefix
PRODUCT = Product code (2-4 characters)
TYPE = Document type code
VERSION = Major.Minor version
```

### 12.2 Product Codes

| Product | Code |
|---------|------|
| Weather Station | WS |
| Smart Hat | SH |
| Gateway | GW |
| Anchor | AN |
| MODBUS Asset | MA |

### 12.3 Document Type Codes

| Type | Code |
|------|------|
| Product Manual | PM |
| Technical Reference | TR |
| Setup Guide | SG |
| Installation Guide | IG |
| Commissioning Guide | CG |
| Quick Reference | QR |
| Troubleshooting Guide | TG |
| Maintenance Guide | MG |
| Interface Control Document | ICD |
| Datasheet | DS |
| Product Overview | PO |
| Safety Manual | SM |
| Release Notes | RN |

### 12.4 Version Numbering
- **Major version (X.0):** Significant content changes, new sections, structural changes
- **Minor version (X.Y):** Corrections, clarifications, small additions

### 12.5 Traceability Requirements

Every document MUST include:
- Document ID
- Version number
- Revision date
- Hardware revision compatibility (where applicable)
- Firmware version compatibility (where applicable)
- Change log (for versions > 1.0)

---

## 13. Cross-References

### 13.1 Format
- Section references: "See Section 3.2 Component Specifications"
- Figure references: "See Figure 4-1"
- Table references: "See Table 2-3"
- Page references: Avoid; use section numbers instead

### 13.2 Styling
- Italicized text
- No hyperlink styling in print documents
- Include descriptive title, not just number

---

## 14. Units and Measurements

### 14.1 Standard Units
- Temperature: Celsius primary, with Fahrenheit in parentheses for US docs
- Dimensions: mm (with inches in parentheses)
- Weight: g or kg (with lb/oz in parentheses)
- Voltage: V DC or V AC
- Current: mA or A
- Pressure: hPa or mbar
- Wind speed: m/s or km/h

### 14.2 Format

```
45 mm (1.77 in)
-20 C to +60 C (-4 F to +140 F)
12V DC +/- 0.5V
```

### 14.3 Rules
- Space between number and unit
- No space before degree symbol
- Use multiplication sign for dimensions (not letter x)
- Include tolerances where applicable

---

## 15. Writing Style

### 15.1 Voice and Tone
- Use active voice for procedures
- Use passive voice sparingly for descriptions
- Be direct and concise
- Avoid marketing language in technical documents
- State facts, not opinions

### 15.2 Terminology Consistency
- Define acronyms on first use
- Use consistent terms throughout (do not alternate synonyms)
- Maintain a product glossary for each knowledge base

### 15.3 Procedure Language
- Start each step with an imperative verb
- One action per step
- Include expected result: "Connect the cable. The LED turns green."

---

## 16. Automation and Single-Sourcing

### 16.1 Content Reuse Principles
- Build all documents from Concept/Task/Reference topics
- Store topics in the knowledge base, not in document templates
- Generate multiple outputs from the same source topics

### 16.2 Knowledge Base Requirements

Each product knowledge base MUST include:
- Product identity (name, model numbers, variants)
- Specifications (electrical, environmental, mechanical)
- Interfaces (all ports, protocols, pinouts)
- Procedures (installation, configuration, maintenance)
- Safety information (hazards, warnings, safe-use conditions)
- Troubleshooting (symptoms, causes, fixes)
- Glossary and definitions

### 16.3 Quality Gates

Before release, every document requires:
1. **Engineering review:** Technical accuracy verification
2. **Safety review:** Hazard communication compliance
3. **Usability review:** Field technician readability check

### 16.4 Delivery Strategy
- **Contractual:** PDF with document control
- **Online:** Canonical web version (always current)
- **Device labels:** QR codes linking to current doc set

---

## Appendix A: DXA Conversions

| Unit | DXA Value |
|------|-----------|
| 1 inch | 1440 |
| 1 cm | 567 |
| 1 mm | 56.7 |
| 1 pt | 20 |
| 1 twip | 1 |

*Note: 1 twip = 1/20 of a point = 1/1440 of an inch*

---

## Appendix B: Checklist for Document Review

### Safety Communication
- [ ] All hazards identified with appropriate signal word
- [ ] Warnings appear BEFORE hazardous steps
- [ ] Safe-use conditions stated in scope section
- [ ] ANSI Z535.4 color coding applied correctly

### Versioning and Traceability
- [ ] Document ID present and correctly formatted
- [ ] Version number and date in footer
- [ ] Hardware/firmware compatibility stated
- [ ] Change log included (if version > 1.0)

### Content Quality
- [ ] All specifications include units
- [ ] All procedures numbered and action-verb led
- [ ] All placeholders marked [TBD]
- [ ] Cross-references use section numbers
- [ ] Glossary defines all acronyms

### Visual Consistency
- [ ] Typography matches style guide
- [ ] Colors match brand palette
- [ ] Tables follow specification format
- [ ] Images have descriptive placeholders

---

## 12. Document Generation Formatting Rules (DOCX)

These rules are MANDATORY when generating `.docx` files. They exist because hard-won experience showed that without them, documents look cramped, tables break across pages without context, and the reading experience degrades.

### 12.1 Element Spacing

Every element needs breathing room. Cramped layouts are unprofessional.

| Transition | Minimum space_before on the FOLLOWING element | Why |
|-----------|-----------------------------------------------|-----|
| Table → Paragraph | **8pt** | Tables must not touch the text below them |
| Table → Heading | **12pt** | Headings need visual separation from preceding tables |
| Callout box → Any element | **10pt** | Notes/warnings need bottom margin |
| Body text → Code block | **6pt** | Code blocks need top separation |
| Code block → Body text | **8pt** | Code blocks need bottom separation |
| Heading H2 → Heading H3 | Use H2's space_after (no extra) | H2→H3 is normal hierarchy |
| Register label → Table | **12pt** space_before on the label | Labels like "R0: Status Registers" must not touch the preceding table |

### 12.2 Table Formatting

| Rule | Specification | Why |
|------|---------------|-----|
| **Repeat header row** | Enable `tblHeader` on the first row of EVERY data table (2+ rows) | When a table splits across a page, the reader loses context without the header |
| **Consistent borders** | All data tables use the same border color and weight | Mixed border styles look unintentional |
| **Cell padding** | 160 twips vertical, 240 twips horizontal (from Section 5.4) | Text touching cell borders is unreadable |
| **Header row styling** | Background fill + contrasting text color on row 0 | Headers must be visually distinct from data |
| **No empty cells** | Use "—" (em dash) for intentionally empty cells, not blank | Blank cells look like missing data |

### 12.3 Widow and Orphan Control

| Rule | Setting | Why |
|------|---------|-----|
| **Widow control** | `w:widowControl val="1"` on ALL body paragraphs | A single line at the top of a page (widow) looks broken |
| **Orphan control** | Same setting handles orphans | A single line at the bottom of a page before a break looks abandoned |
| **Keep with next** | Enable on headings and table labels | A heading at the bottom of a page with content on the next page is wrong |

### 12.4 Code Blocks

| Rule | Specification |
|------|---------------|
| Font | Consolas or IBM Plex Mono, 8pt |
| Background | Light gray (#F5F5F5) or no background with left indent |
| Space before first line | **6pt** minimum (from preceding body text) |
| Space after last line | **8pt** minimum (before following body text) |
| Internal line spacing | 0pt space_after between code lines (tight) |
| Left indent | 400 twips (~0.7cm) |

### 12.5 Callout Boxes (Note / Tip / Important / Warning)

| Rule | Specification |
|------|---------------|
| Implementation | Single-cell table with colored header bar |
| Space before | **8pt** minimum above the callout |
| Space after | **10pt** minimum below the callout (on the NEXT element) |
| Header bar | Dark background (#333 or type-specific color) with white text, bold |
| Body | Light background (type-specific), padded text |
| Never stack | Two callouts back-to-back need at least 12pt gap between them |

### 12.6 Page Breaks

| Rule | Why |
|------|-----|
| Force page break before each major section (H2) | Sections should start on a fresh page |
| Never break inside a table row | Split rows are unreadable |
| Never break between a heading and its first paragraph | Headings must be followed by content on the same page |
| Never break between a label and its table | "R0: Status Registers" and the R0 table must stay together |

### 12.7 Post-Generation Formatting Checklist

After generating any `.docx`, verify ALL of these before delivering:

- [ ] Every table has repeat-header enabled
- [ ] No element-to-element gap is less than 6pt
- [ ] No heading appears at the bottom of a page without content following it
- [ ] No table splits without header repetition on the continuation page
- [ ] Code blocks have visible top and bottom margins
- [ ] Callout boxes have visible top and bottom margins
- [ ] Widow/orphan control is enabled on all body paragraphs
- [ ] Register/field labels have 12pt space_before
- [ ] No two tables are directly adjacent without spacing
- [ ] All table cells have consistent padding

---

## References

- IEC/IEEE 82079-1: Preparation of information for use
- ANSI Z535.4: Product Safety Signs and Labels
- Microsoft Style Guide: Consistency and instructional formatting
- Topic-based authoring (DITA-style concept/task/reference model)

# Product Manual Template Instructions

This document defines the structure and content requirements for WakeCap Product Manuals.

---

## Purpose

Product Manuals provide comprehensive technical documentation covering all aspects of a WakeCap product. They serve as the primary reference for understanding the product's capabilities, specifications, and operation.

---

## Target Audience

**Version A (Marketing/Sales):**
- End customers evaluating or purchasing products
- Sales team for conferences and presentations
- Partners and distributors

**Version B (Internal/Technical):**
- Field technicians
- Support engineers
- Internal training

---

## Document Structure

### Cover Page (Page 1)

**Version A Layout:**
```
┌─────────────────────────────────────────────┐
│                                             │
│  [IMAGE: Product hero shot - 60% of page]   │
│                                             │
│ ─────────────────────────────────────────── │
│                                             │
│  [WakeCap Logo - left aligned, 25mm]        │
│                                             │
│  [PRODUCT NAME]                    ← H1     │
│  Product Manual                    ← H3     │
│                                             │
│  [Tagline - one line description]  ← Body   │
│                                             │
│  Model: [MODEL]     Document: [DOC-ID]      │
│  Revision: [VERSION]    Date: [DATE]        │
│                                             │
└─────────────────────────────────────────────┘
```

**Version B Layout:**
```
┌─────────────────────────────────────────────┐
│  [WakeCap Logo - top left, 20mm]            │
│                                             │
│  ─────────────────────────────────────────  │
│                                             │
│  PRODUCT MANUAL                    ← H2     │
│                                             │
│  [Product Name]                    ← H1     │
│  [Subtitle if needed]              ← H3     │
│                                             │
│  Document: [DOC-ID]                         │
│  Revision: [VERSION]                        │
│  Date: [DATE]                               │
│                                             │
│  [IMAGE: Technical line drawing - 40%]      │
│                                             │
│  ─────────────────────────────────────────  │
│  CONFIDENTIAL - INTERNAL USE ONLY           │
│  (only for Version B)                       │
└─────────────────────────────────────────────┘
```

---

### Table of Contents (Page 2)

- Auto-generated from H1 and H2 headings
- Include page numbers
- Leader dots between title and page number

---

### Section 1: Product Overview

**Required Content:**
1. Product description (2-3 paragraphs)
2. Primary purpose and applications
3. Key features (bulleted list, 5-8 items)
4. Included components / What's in the box
5. Product image with labeled callouts

**Example Structure:**
```
1. PRODUCT OVERVIEW

1.1 Description
[2-3 paragraphs describing the product, its purpose, and primary use cases]

1.2 Key Features
• Feature 1 - brief description
• Feature 2 - brief description
[...]

1.3 Package Contents
[Table listing all included items with quantities]

1.4 Product Identification
[IMAGE: Product with callout numbers pointing to key components]
[Numbered list explaining each callout]
```

---

### Section 2: System Architecture

**Required Content:**
1. High-level system diagram
2. Data flow explanation
3. Communication protocols
4. Architecture layers (if applicable)

**Example Structure:**
```
2. SYSTEM ARCHITECTURE

2.1 System Overview
[IMAGE: Block diagram showing all components and connections]

2.2 Data Flow
[Explanation of how data moves through the system]
[Simplified flow diagram: A → B → C → D]

2.3 Communication Protocols
[Table listing each connection and its protocol]

| Connection | Protocol | Notes |
|------------|----------|-------|
| A to B     | RS485    | MODBUS RTU |
[...]
```

---

### Section 3: Technical Specifications

**Required Content:**
1. Physical specifications (dimensions, weight, materials)
2. Electrical specifications (voltage, current, power)
3. Environmental specifications (temperature, humidity, IP rating)
4. Performance specifications (accuracy, range, resolution)
5. Compliance and certifications

**Table Format:**
```
3. TECHNICAL SPECIFICATIONS

3.1 Physical Specifications

| Parameter | Value | Unit |
|-----------|-------|------|
| Dimensions (L × W × H) | [TBD] × [TBD] × [TBD] | mm |
| Weight | [TBD] | g |
| Enclosure Material | [TBD] | — |
| IP Rating | [TBD] | — |

3.2 Electrical Specifications

| Parameter | Symbol | Min | Typ | Max | Unit |
|-----------|--------|-----|-----|-----|------|
| Input Voltage | VIN | [TBD] | [TBD] | [TBD] | V DC |
| Current Draw | ICC | — | [TBD] | [TBD] | mA |

3.3 Environmental Specifications

| Parameter | Min | Max | Unit |
|-----------|-----|-----|------|
| Operating Temperature | [TBD] | [TBD] | °C |
| Storage Temperature | [TBD] | [TBD] | °C |
| Operating Humidity | [TBD] | [TBD] | % RH |

3.4 Certifications
[List of applicable certifications: CE, FCC, etc.]
```

---

### Section 4: Components

**Required Content:**
For each major component:
1. Component name and function
2. Physical description
3. Connections/interfaces
4. LED indicators (if applicable)
5. Component diagram

**Example Structure:**
```
4. COMPONENTS

4.1 [Component Name]

Function:
[Brief description of what this component does]

Physical Description:
[Description of enclosure, size, visible features]

[IMAGE: Component diagram with callouts]

Interfaces:
| Interface | Type | Purpose |
|-----------|------|---------|
| Terminal A | RS485+ | Data transmission |
[...]

LED Indicators:
| Pattern | Status | Meaning |
|---------|--------|---------|
| 1 blink/min | Normal | Operating correctly |
[...]
```

---

### Section 5: Installation

**Required Content:**
1. Pre-installation requirements
2. Site preparation
3. Mounting instructions
4. Wiring/connection instructions
5. Initial power-up procedure

**Format:**
- Use numbered steps
- Include safety warnings BEFORE each hazardous step
- Include verification step after each critical action

---

### Section 6: Operation

**Required Content:**
1. Normal operation description
2. User interface explanation (displays, buttons)
3. Operating modes (if applicable)
4. Data access methods (app, dashboard)

---

### Section 7: Maintenance

**Required Content:**
1. Maintenance schedule (table format)
2. Routine inspection checklist
3. Cleaning procedures
4. Calibration requirements
5. Replacement parts list

**Schedule Table Format:**
```
| Task | Frequency | Procedure Reference |
|------|-----------|---------------------|
| Visual inspection | Monthly | §7.2 |
| Sensor cleaning | Monthly | §7.3 |
| Full calibration | Annually | §7.4 |
```

---

### Section 8: Troubleshooting

**Required Content:**
1. Common issues table
2. LED status reference
3. Diagnostic procedures
4. When to contact support

**Issue Table Format:**
```
| Symptom | Possible Cause | Solution |
|---------|----------------|----------|
| No display | Power issue | Check battery voltage; verify connections |
| Incorrect readings | Sensor fault | Recalibrate; check for obstructions |
```

---

### Section 9: Safety Information

**Required Content:**
1. General safety warnings
2. Electrical safety
3. Environmental hazards (if applicable)
4. PPE requirements
5. Emergency procedures

**Must Include:**
- All applicable DANGER, WARNING, CAUTION panels
- Reference to site-specific safety procedures
- Contact information for emergencies

---

### Appendices

**Optional sections as needed:**
- Appendix A: Glossary of terms
- Appendix B: Wiring diagrams
- Appendix C: Spare parts list
- Appendix D: Warranty information
- Appendix E: Compliance declarations

---

### Back Cover (Version A only)

```
┌─────────────────────────────────────────────┐
│                                             │
│  [WakeCap Logo - centered, 40mm]            │
│                                             │
│  WakeCap Technologies                       │
│  [Address]                                  │
│  [Website]                                  │
│  [Support email]                            │
│                                             │
│  © [Year] WakeCap Technologies              │
│  All rights reserved.                       │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Content Guidelines

### Writing Style
- Use present tense for descriptions
- Use imperative mood for instructions
- Avoid jargon; define technical terms on first use
- Keep sentences under 25 words
- One idea per paragraph

### Placeholder Handling
- Mark all missing data as `[TBD]`
- Mark all missing images as `[IMAGE: description]`
- Highlight placeholders in yellow background (#FEF3C7) for easy identification

### Cross-References
- Always include section numbers
- Format: "See §X.X [Section Title]"
- Verify all cross-references are accurate

---

## Quality Checklist

Before finalizing, verify:

- [ ] All sections from template are included
- [ ] All specifications have units
- [ ] All procedures are numbered
- [ ] Safety warnings precede hazardous steps
- [ ] Table of contents matches actual headings
- [ ] Document number follows naming convention
- [ ] Header and footer appear on all pages (except cover for header)
- [ ] All [TBD] placeholders are clearly marked
- [ ] All [IMAGE] placeholders have descriptive text
- [ ] Cross-references are accurate
- [ ] Consistent terminology throughout

# Datasheet Template Instructions

This document defines the structure and content requirements for WakeCap Product Datasheets.

---

## Purpose

Datasheets provide a concise, specification-dense summary of a WakeCap product. They enable procurement teams, engineers, and integrators to make a fast fit/no-fit decision without reading a full product manual.

---

## Target Audience

- Procurement and purchasing teams
- Systems engineers evaluating product fit
- Integrators comparing options
- Distributors and channel partners

---

## Document Characteristics

| Attribute | Specification |
|-----------|---------------|
| Typical Length | 1-2 pages |
| Orientation | Portrait (A4 or Letter) |
| Primary Content | Specification tables, key figures |
| Layout | Two-column grid with "spec rail" for key numbers |
| Image Ratio | 20% visual, 80% data |

---

## Document Structure

### Page 1 Layout

**Version A (Marketing/Sales):**
```
┌──────────────────────────────────────────────────┐
│  [WakeCap Logo - top left, 25mm]                 │
│                                                  │
│  [PRODUCT NAME]                         ← H1     │
│  [Subtitle / Model Variant]             ← H3     │
│                                                  │
│  ┌─────────────────┬────────────────────────────┐│
│  │                 │                            ││
│  │  [IMAGE: Hero   │  PURPOSE                   ││
│  │   product photo │  [One paragraph describing ││
│  │   - 40%]        │   the product and its      ││
│  │                 │   primary value]            ││
│  │                 │                            ││
│  │                 │  KEY BENEFITS               ││
│  │                 │  • Benefit 1                ││
│  │                 │  • Benefit 2                ││
│  │                 │  • Benefit 3                ││
│  └─────────────────┴────────────────────────────┘│
│                                                  │
│  KEY SPECIFICATIONS                              │
│  ┌──────────────────────────────────────────────┐│
│  │  [Full-width specification table]            ││
│  └──────────────────────────────────────────────┘│
│                                                  │
│  ENVIRONMENTAL RATINGS                           │
│  ┌──────────────────────────────────────────────┐│
│  │  [Environmental specifications table]        ││
│  └──────────────────────────────────────────────┘│
│                                                  │
│  Document: [DOC-ID]  Rev: [VERSION]  [DATE]      │
└──────────────────────────────────────────────────┘
```

**Version B (Technical/Field):**
```
┌──────────────────────────────────────────────────┐
│  [WakeCap Logo - top left, 20mm]                 │
│                                                  │
│  DATASHEET                              ← H2     │
│  [Product Name]                         ← H1     │
│  [Model Number(s)]                      ← H3     │
│                                                  │
│  ┌─────────────────┬────────────────────────────┐│
│  │ [IMAGE: Product │  PRODUCT SUMMARY            ││
│  │  photo - 30%]   │  [One paragraph]            ││
│  │                 │                            ││
│  │                 │  APPLICATIONS               ││
│  │                 │  • Application 1            ││
│  │                 │  • Application 2            ││
│  └─────────────────┴────────────────────────────┘│
│                                                  │
│  [Specification tables fill remaining space]     │
│                                                  │
│  ─────────────────────────────────────────────── │
│  CONFIDENTIAL - INTERNAL USE ONLY                │
│  Document: [DOC-ID]  Rev: [VERSION]  [DATE]      │
└──────────────────────────────────────────────────┘
```

---

### Required Sections

#### 1. Product Name and Model Matrix

```
PRODUCT IDENTIFICATION

| Attribute | Value |
|-----------|-------|
| Product Name | [TBD] |
| Model Number(s) | [TBD] |
| Hardware Revision | [TBD] |
| Firmware Version | [TBD] |

MODEL VARIANTS (if applicable):
| Model | Description | Key Difference |
|-------|-------------|----------------|
| [Model-A] | [Description] | [Difference] |
| [Model-B] | [Description] | [Difference] |
```

#### 2. Purpose and Key Benefits

```
PURPOSE
[One paragraph: what the product does, where it is deployed, what problem it solves]

KEY BENEFITS
• [Benefit 1 - quantified where possible]
• [Benefit 2]
• [Benefit 3]
• [Benefit 4]
```

#### 3. Key Specifications Table

```
KEY SPECIFICATIONS

| Parameter | Symbol | Min | Typ | Max | Unit |
|-----------|--------|-----|-----|-----|------|
| Input Voltage | VIN | [TBD] | [TBD] | [TBD] | V DC |
| Current Draw | ICC | — | [TBD] | [TBD] | mA |
| Power Consumption | P | — | [TBD] | [TBD] | W |
| [Additional parameters] | | | | | |
```

#### 4. Environmental Ratings

```
ENVIRONMENTAL RATINGS

| Parameter | Min | Max | Unit |
|-----------|-----|-----|------|
| Operating Temperature | [TBD] | [TBD] | °C |
| Storage Temperature | [TBD] | [TBD] | °C |
| Operating Humidity | [TBD] | [TBD] | % RH |
| Ingress Protection | — | [TBD] | IP rating |
| Shock | — | [TBD] | G |
| Vibration | — | [TBD] | G / Hz range |
```

#### 5. Interfaces Summary

```
INTERFACES

| Interface | Type | Protocol | Connector | Notes |
|-----------|------|----------|-----------|-------|
| Power | Input | DC | [TBD] | [TBD] |
| Communication | Data | [TBD] | [TBD] | [TBD] |
| Sensor I/O | Input | [TBD] | [TBD] | [TBD] |
```

#### 6. Mechanical Specifications

```
MECHANICAL

| Parameter | Value | Unit |
|-----------|-------|------|
| Dimensions (L × W × H) | [TBD] × [TBD] × [TBD] | mm |
| Weight | [TBD] | g |
| Enclosure Material | [TBD] | — |
| Mounting | [TBD] | — |
| Color | [TBD] | — |

[IMAGE: Dimensioned outline drawing with mounting hole pattern]
```

#### 7. Certifications and Compliance

```
CERTIFICATIONS

| Standard | Status | Certificate # |
|----------|--------|---------------|
| CE | [TBD] | [TBD] |
| FCC Part 15 | [TBD] | [TBD] |
| IP Rating | [TBD] | [TBD] |
| RoHS | [TBD] | [TBD] |
```

#### 8. Ordering Information

```
ORDERING INFORMATION

| Part Number | Description | Includes |
|-------------|-------------|----------|
| [TBD] | [Product base unit] | [TBD] |
| [TBD] | [Accessory / option] | [TBD] |

ACCESSORIES
| Part Number | Description |
|-------------|-------------|
| [TBD] | [Accessory 1] |
| [TBD] | [Accessory 2] |
```

---

## Image Strategy

| Image Type | Requirement |
|------------|-------------|
| Hero photo | 1 high-quality product photo (front/isometric view) |
| Dimensioned drawing | 1 outline drawing with key dimensions and mounting pattern |

```
[IMAGE: DS - Product hero photo, white background, professional lighting]
[IMAGE: DS - Dimensioned outline drawing showing L × W × H and mounting holes]
```

---

## Content Rules

1. **Density is essential** - Maximize information per page
2. **Tables over prose** - Use specification tables for all quantitative data
3. **Units always** - Every numerical value must include its unit
4. **No paragraphs in spec sections** - Use bullets and tables
5. **Min/Typ/Max** - Use this format for electrical specs wherever possible
6. **Define unavoidable terms once** - Avoid jargon; if necessary, define on first use

---

## Quality Checklist

Before finalizing, verify:

- [ ] Fits on 1-2 pages maximum
- [ ] Product name and model numbers are correct
- [ ] All specifications include units
- [ ] Min/Typ/Max format used for electrical specs
- [ ] Environmental ratings are complete
- [ ] Interfaces summary covers all ports
- [ ] Dimensioned drawing included or placeholder present
- [ ] Certifications listed with status
- [ ] Ordering information with part numbers
- [ ] Document ID and revision shown
- [ ] Hero product photo included or placeholder present
- [ ] No marketing fluff in Version B

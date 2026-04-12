# Quick Reference Card Template Instructions

This document defines the structure and content requirements for WakeCap Quick Reference Cards.

---

## Purpose

Quick Reference Cards provide essential information on a single page (or two pages maximum) for field use. They are designed to be printed, laminated, and kept on-site for immediate reference.

---

## Target Audience

- Field technicians
- Site supervisors
- Maintenance personnel
- Anyone needing quick access to key information

---

## Document Characteristics

| Attribute | Specification |
|-----------|---------------|
| Length | 1-2 pages maximum |
| Orientation | Landscape preferred (fits in pockets/toolboxes) |
| Paper Size | A4 Landscape or Letter Landscape |
| Design | High density, minimal text, maximum visual |
| Print Recommendation | Laminated for durability |

---

## Layout Options

### Option A: Single-Page Landscape (Preferred)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  [Logo] QUICK REFERENCE: [Product Name]              Doc: [ID] Rev: [X]  │
├──────────────────────────────────────────────────────────────────────────┤
│                           │                          │                   │
│  COMPONENT OVERVIEW       │  LED STATUS              │  SPECIFICATIONS   │
│  ───────────────────      │  ──────────              │  ──────────────   │
│                           │                          │                   │
│  [IMAGE: Product with     │  ● 1/min = OK            │  Power: 12V DC    │
│   numbered callouts]      │  ● 2/min = Error         │  Protocol: RS485  │
│                           │  ○ Off = No power        │  IP Rating: IP67  │
│  1. [Component]           │                          │  Temp: -20 to 60°C│
│  2. [Component]           │  DISPLAY READINGS        │                   │
│  3. [Component]           │  ───────────────         │  WIRING           │
│                           │                          │  ───────          │
│                           │  Wind: [value] m/s       │  A ──── A         │
│                           │  Temp: [value] °C        │  B ──── B         │
│                           │  Hum: [value] %          │                   │
│                           │                          │                   │
├──────────────────────────────────────────────────────────────────────────┤
│  TROUBLESHOOTING: No LED = Check power │ 2 blinks = Check RS485 │ ...   │
├──────────────────────────────────────────────────────────────────────────┤
│  Support: [email] │ [phone]                          © WakeCap [Year]    │
└──────────────────────────────────────────────────────────────────────────┘
```

### Option B: Two-Page (Front/Back)

**Front:**
```
┌──────────────────────────────────────────────────────────────────────────┐
│  [Logo] QUICK REFERENCE: [Product Name]                                  │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  [IMAGE: Large product diagram with numbered callouts - 70% of page]     │
│                                                                          │
│  1. [Component name] - [one-line description]                            │
│  2. [Component name] - [one-line description]                            │
│  3. [Component name] - [one-line description]                            │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

**Back:**
```
┌──────────────────────────────────────────────────────────────────────────┐
│  SPECIFICATIONS          │  STATUS INDICATORS       │  TROUBLESHOOTING   │
├──────────────────────────┼──────────────────────────┼────────────────────┤
│                          │                          │                    │
│  [Spec table]            │  [LED/Display guide]     │  [Issue→Solution]  │
│                          │                          │                    │
├──────────────────────────┴──────────────────────────┴────────────────────┤
│  WIRING DIAGRAM                                                          │
│  [Connection diagram]                                                    │
├──────────────────────────────────────────────────────────────────────────┤
│  Support: [contact info]                                                 │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Required Sections

### 1. Header Bar
- WakeCap logo (left)
- "QUICK REFERENCE: [Product Name]" (center)
- Document ID and revision (right)

### 2. Component Overview
- Product image with numbered callouts
- Numbered legend identifying each callout
- Keep to 5-8 key components maximum

### 3. Key Specifications
Essential specs only (not full spec sheet):
```
| Parameter | Value |
|-----------|-------|
| Power | 12V DC |
| Protocol | RS485/MODBUS RTU |
| IP Rating | [TBD] |
| Operating Temp | [TBD] to [TBD] °C |
```

### 4. Status Indicators
LED patterns and/or display readings:
```
LED STATUS:
● 1 blink/min = Normal operation
● 2 blinks/min = Communication error
○ No blinks = Check power

DISPLAY:
• Values shown = Normal
• All zeros = Sensor issue
• Blank = Power issue
```

### 5. Wiring Quick Reference
Simplified connection diagram:
```
[Source]        [Destination]
   A  ─────────────  A
   B  ─────────────  B
  GND ─────────────  GND
```

### 6. Quick Troubleshooting
3-5 most common issues only:
```
SYMPTOM → SOLUTION
No power → Check battery >12V
No data → Verify A-A, B-B wiring
Offline → Check gateway/anchors
```

### 7. Footer
- Support contact information
- Copyright notice
- "For full documentation see: [Doc ID]"

---

## Design Guidelines

### Typography
- Larger fonts than Product Manual (minimum 9pt body, 12pt headings)
- Bold for labels/headers
- Use symbols and icons where possible

### Layout
- Use boxes and clear dividers
- Maximize white space efficiency
- Group related information
- Use consistent column widths

### Colors
- Use color sparingly but effectively
- WakeCap Blue (#0063A3) for headers and accents
- Safety colors for relevant warnings
- Gray (#F8F9FA) backgrounds for specification boxes

### Icons and Symbols
Use standardized symbols:
- ● Solid circle = LED on
- ○ Empty circle = LED off
- ⚠ Warning/caution
- ✓ Correct/OK
- ✗ Error/incorrect
- → Arrow for flow/connection

---

## Content Rules

1. **Brevity is essential** - Use fragments, not full sentences
2. **No paragraphs** - Use bullets, tables, and lists only
3. **Abbreviate wisely** - Use standard abbreviations (V, mA, °C, min)
4. **Prioritize** - Only include information needed in the field
5. **Visual first** - Prefer diagrams over text explanations

### What to Include
- Component identification
- Connection reference
- Status indicator meanings
- Quick troubleshooting
- Key specifications
- Support contact

### What to Exclude
- Installation procedures (use Setup Guide)
- Full specifications (use Product Manual)
- Detailed troubleshooting (use Troubleshooting Guide)
- Theory/explanations
- Marketing content

---

## Image Placeholder Format

```
[IMAGE: QR - Product overview with callouts to: 1-Display, 2-Terminals, 3-LED]
[IMAGE: QR - Simplified wiring diagram showing A-A, B-B connections]
```

---

## Quality Checklist

Before finalizing, verify:

- [ ] Fits on 1-2 pages maximum
- [ ] All text readable at printed size (minimum 9pt)
- [ ] Component callouts are numbered clearly
- [ ] LED/status indicators explained
- [ ] Wiring connections shown
- [ ] 3-5 troubleshooting items included
- [ ] Support contact information present
- [ ] Document ID and revision shown
- [ ] Suitable for lamination (no full-bleed color that wastes ink)

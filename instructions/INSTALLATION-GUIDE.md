# Installation Guide Template Instructions

This document defines the structure and content requirements for WakeCap Installation Guides.

---

## Purpose

Installation Guides provide detailed instructions for the safe and correct physical deployment of WakeCap products. They cover mechanical mounting, electrical wiring, grounding, sealing, and initial power-up verification. Installation Guides assume no prior familiarity with the product.

---

## Target Audience

- Field installation technicians
- Qualified electrical contractors
- Site engineers
- Facilities management teams

---

## Document Characteristics

| Attribute | Specification |
|-----------|---------------|
| Typical Length | 8-16 pages |
| Orientation | Portrait (A4 or Letter) |
| Primary Content | Phase-based procedures with illustrations |
| Layout | Phase-based structure |
| Safety | Warnings placed BEFORE the hazardous action |
| Image Ratio | 50% visual, 50% text |

---

## Document Structure

### Cover Page

```
┌──────────────────────────────────────────────────┐
│  [WakeCap Logo - top left, 20mm]                 │
│                                                  │
│  ─────────────────────────────────────────────── │
│                                                  │
│  INSTALLATION GUIDE                     ← H2     │
│                                                  │
│  [Product Name]                         ← H1     │
│  Mechanical & Electrical Deployment              │
│                                                  │
│  [IMAGE: Product being installed - 40%]          │
│                                                  │
│  Document: [DOC-ID]                              │
│  Revision: [VERSION]                             │
│  Date: [DATE]                                    │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

### Required Sections

#### 1. Scope and Supported Models

```
1. SCOPE

1.1 Purpose
This guide covers the physical installation of the [Product Name]
at construction and oil & gas sites.

1.2 Supported Models and Revisions

| Model | Hardware Rev | Firmware Ver | Notes |
|-------|-------------|-------------|-------|
| [TBD] | [TBD] | [TBD] | [TBD] |

1.3 Safe-Use Conditions
This product is designed for use under the following conditions:
• [Environmental condition 1]
• [Environmental condition 2]
• [Limitation 1]
```

#### 2. Safety and Site Requirements

```
2. SAFETY AND SITE REQUIREMENTS

2.1 Safety Precautions

⚠ DANGER
[Hazards that WILL cause death or serious injury]
[How to avoid the hazard]

⚠ WARNING
[Hazards that COULD cause death or serious injury]
[How to avoid the hazard]

⚠ CAUTION
[Hazards that COULD cause minor or moderate injury]
[How to avoid the hazard]

2.2 Required Qualifications
Installation must be performed by personnel with:
• [Qualification 1]
• [Qualification 2]

2.3 Required PPE
• [PPE item 1]
• [PPE item 2]

2.4 Site Requirements
Before installation, verify:
• [Site requirement 1 - e.g., structural support capacity]
• [Site requirement 2 - e.g., power availability]
• [Site requirement 3 - e.g., clearances]

2.5 Required Tools and Materials

| Item | Specification | Provided |
|------|---------------|----------|
| [Tool 1] | [Spec] | No |
| [Tool 2] | [Spec] | No |
| [Material 1] | [Spec] | Yes |
```

#### 3. Mounting

```
3. MOUNTING

3.1 Mounting Location Selection
[Criteria for selecting the installation location]

[IMAGE: Site diagram showing optimal mounting location]

3.2 Orientation and Clearances

| Parameter | Requirement |
|-----------|-------------|
| Orientation | [TBD] |
| Minimum clearance (top) | [TBD] mm |
| Minimum clearance (sides) | [TBD] mm |
| Minimum clearance (front) | [TBD] mm |

[IMAGE: Dimensioned mounting drawing with clearance zones]

3.3 Mounting Template
[IMAGE: Full-scale mounting template showing hole pattern]

| Hole | Diameter | Spacing |
|------|----------|---------|
| A | [TBD] mm | — |
| B | [TBD] mm | [TBD] mm from A |

3.4 Mounting Procedure

⚠ CAUTION
[Mounting-specific safety warning]

① Mark drill positions using the mounting template.
   ✓ Verification: Marks are level and match template spacing.

② Drill mounting holes to [TBD] mm diameter, [TBD] mm depth.

③ Secure mounting bracket using [fastener type].
   Torque: [TBD] N·m

④ Attach unit to mounting bracket.
   ✓ Verification: Unit is level and secure with no play.
```

#### 4. Wiring and Grounding

```
4. WIRING AND GROUNDING

⚠ WARNING
De-energize all circuits before making electrical connections.
Verify zero voltage with a multimeter before touching terminals.

4.1 Cable Entry

① Route cables through cable glands.
② Tighten cable glands to [TBD] N·m.

⚠ CAUTION
Do not over-tighten cable glands. Over-tightening can damage
cable insulation and compromise IP rating.

4.2 Power Connections

| Terminal | Label | Wire | Torque |
|----------|-------|------|--------|
| 1 | V+ | [TBD] | [TBD] N·m |
| 2 | GND | [TBD] | [TBD] N·m |

4.3 Communication Connections

| Terminal | Label | Wire | Connects To |
|----------|-------|------|-------------|
| A | RS485+ | [TBD] | [Destination] Terminal A |
| B | RS485- | [TBD] | [Destination] Terminal B |

⚠ CAUTION
Ensure correct polarity: A connects to A, B connects to B.
Reversed connections will prevent communication.

4.4 Grounding

① Connect grounding wire to the grounding terminal.
② Connect the other end to the site grounding bus.
   Wire gauge: minimum [TBD] AWG

4.5 Surge Protection (if applicable)

[IMAGE: Surge protection installation diagram]
[Surge protection connection procedure]

4.6 Wiring Diagram

[IMAGE: Complete wiring diagram showing all connections]
```

#### 5. Sealing and IP Practices

```
5. SEALING AND IP PRACTICES

ℹ NOTE
Proper sealing is critical for maintaining the [IP rating]
ingress protection rating.

5.1 Cable Gland Sealing

① Verify all cable glands are populated or blanked.
② Tighten each gland to [TBD] N·m.

5.2 Enclosure Sealing

① Inspect gasket for damage before closing.
② Close enclosure and tighten fasteners in a star pattern.
   Torque: [TBD] N·m

5.3 Unused Openings

① Install blanking plugs in all unused cable entry points.
② Verify plugs are rated to [IP rating] or better.

☐ Sealing checklist:
☐ All cable glands tightened
☐ All unused openings blanked
☐ Enclosure gasket intact
☐ Enclosure fasteners torqued
```

#### 6. Network and Communication Setup

```
6. NETWORK / COMMUNICATION SETUP

6.1 Communication Parameters

| Parameter | Value |
|-----------|-------|
| Protocol | [TBD] |
| Baud Rate | [TBD] |
| Address | [TBD] |
| [Additional params] | [TBD] |

6.2 Configuration Steps

① [Configuration step 1]
② [Configuration step 2]
③ [Configuration step 3]
```

#### 7. Power-Up Checks and Common Mistakes

```
7. POWER-UP AND VERIFICATION

7.1 Pre-Power Checklist

☐ All mechanical connections secure
☐ All electrical connections correct
☐ No exposed wires or damaged insulation
☐ Cable glands properly tightened
☐ Enclosure sealed
☐ Grounding connected

7.2 Initial Power-Up

① Apply power to the system.
   ✓ Expected: [LED behavior on power-up]

② Wait [X] seconds for initialization.
   ✓ Expected: [LED behavior after init]

③ Verify communication.
   ✓ Expected: [Expected comm behavior]

7.3 Common Installation Mistakes

| Mistake | Symptom | Correction |
|---------|---------|------------|
| Reversed A/B wiring | No communication | Swap A and B at one end |
| Cable gland not sealed | Moisture ingress | Re-tighten or replace |
| Wrong voltage | No power-up | Verify supply matches spec |
| Missing ground | Intermittent faults | Connect grounding wire |
```

#### 8. Installation Completion Checklist

```
8. INSTALLATION COMPLETION CHECKLIST

MECHANICAL
☐ Unit mounted level and secure
☐ Correct orientation maintained
☐ Clearances meet minimum requirements
☐ All fasteners torqued to specification

ELECTRICAL
☐ Power connections correct and secure
☐ Communication wiring correct (A-A, B-B)
☐ Grounding connected
☐ Surge protection installed (if required)

SEALING
☐ All cable glands tightened
☐ Unused openings blanked
☐ Enclosure gasket intact and sealed

VERIFICATION
☐ Power-up successful
☐ LED status normal (1 blink/min)
☐ Communication established
☐ Device visible on dashboard/app

SIGN-OFF
Installer: ___________________  Date: ___________
Supervisor: __________________  Date: ___________
```

---

## Image Strategy

| Image Type | Requirement |
|------------|-------------|
| Dimension drawings | Mounting dimensions, clearance zones, hole patterns |
| Mounting templates | Full-scale or dimensioned drilling templates |
| Pinout diagrams | Terminal assignments and connector layouts |
| Wiring diagrams | Complete connection diagrams |
| Step illustrations | One illustration per procedure step |

```
[IMAGE: IG - Mounting location selection criteria diagram]
[IMAGE: IG - Dimensioned mounting drawing with clearances]
[IMAGE: IG - Full-scale mounting hole template]
[IMAGE: IG - Terminal block pinout diagram]
[IMAGE: IG - Complete wiring diagram]
[IMAGE: IG - Cable gland sealing detail]
```

---

## Content Rules

1. **One action per step** - Break complex actions into sub-steps
2. **Safety first** - Place warnings BEFORE the hazardous step
3. **Imperative mood** - Start every step with an action verb
4. **Verification after critical steps** - Add checkpoints
5. **Include torque values** - Specify for all fasteners
6. **Phase-based structure** - Organize by installation phase

---

## Quality Checklist

Before finalizing, verify:

- [ ] Scope defines supported models and revisions
- [ ] All safety warnings appear BEFORE hazardous steps
- [ ] Required qualifications and PPE are listed
- [ ] Site requirements are clearly stated
- [ ] Mounting procedure includes dimensions and torque values
- [ ] Wiring connections include polarity warnings
- [ ] Grounding procedure is included
- [ ] Sealing/IP practices are documented
- [ ] Power-up verification procedure is included
- [ ] Common installation mistakes are listed
- [ ] Completion checklist with sign-off is included
- [ ] All [IMAGE] placeholders have descriptive text
- [ ] Document ID and revision shown

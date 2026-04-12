# Setup Guide Template Instructions

This document defines the structure and content requirements for WakeCap Setup Guides.

---

## Purpose

Setup Guides provide step-by-step instructions for installing, configuring, and commissioning WakeCap products. They focus on getting the product operational quickly and correctly.

---

## Target Audience

- Field installation technicians
- Site engineers
- Qualified electrical contractors
- End users performing self-installation

---

## Document Characteristics

| Attribute | Specification |
|-----------|---------------|
| Typical Length | 8-16 pages |
| Orientation | Portrait (A4 or Letter) |
| Primary Content | Step-by-step procedures with illustrations |
| Image Ratio | 50% visual, 50% text |

---

## Document Structure

### Cover Page

```
┌─────────────────────────────────────────────┐
│  [WakeCap Logo - top left, 20mm]            │
│                                             │
│  ─────────────────────────────────────────  │
│                                             │
│  SETUP GUIDE                       ← H2     │
│                                             │
│  [Product Name]                    ← H1     │
│  Installation & Configuration               │
│                                             │
│  [IMAGE: Product being installed - 40%]     │
│                                             │
│  Document: [DOC-ID]                         │
│  Revision: [VERSION]                        │
│  Date: [DATE]                               │
│                                             │
└─────────────────────────────────────────────┘
```

---

### Section 1: Before You Begin

**Required Content:**

```
1. BEFORE YOU BEGIN

1.1 Package Contents
Verify all items are present before starting installation.

[TABLE: Item | Quantity | Check]
| WS Box | 1 | ☐ |
| Mounting bracket | 1 | ☐ |
| Cable glands | 4 | ☐ |
[...]

⚠ NOTICE
If any items are missing or damaged, contact WakeCap support 
before proceeding with installation.

1.2 Required Tools
The following tools are required (not included):
• Phillips screwdriver (#2)
• Wire strippers
• Multimeter
• [...]

1.3 Required Qualifications
This installation must be performed by personnel with:
• [Qualification 1]
• [Qualification 2]

1.4 Safety Precautions

⚠ WARNING
[Electrical/environmental hazards specific to this product]
[Consequence of ignoring warning]
[How to avoid the hazard]

1.5 Site Requirements
Before installation, ensure:
• [Requirement 1]
• [Requirement 2]
• [...]
```

---

### Section 2: Installation Overview

**Required Content:**

```
2. INSTALLATION OVERVIEW

2.1 Installation Summary
[Brief description of the overall installation process]

2.2 Installation Steps
This guide covers the following procedures:

| Step | Description | Time Estimate |
|------|-------------|---------------|
| 1 | Mounting the unit | 15 min |
| 2 | Connecting power | 10 min |
| 3 | Connecting sensors | 20 min |
| 4 | System verification | 10 min |

Total estimated time: [X] minutes

2.3 System Diagram
[IMAGE: Overview diagram showing all components and connections]
```

---

### Section 3-N: Installation Procedures

**Format for Each Procedure Section:**

```
3. [PROCEDURE NAME]

Time required: [X] minutes

⚠ [SAFETY PANEL if applicable]
[Safety warning that applies to this entire procedure]

┌─────────────────────────────────────────────┐
│                                             │
│  [IMAGE: Step 1 illustration]               │
│                                             │
│  ① [Action verb] [object] [details]         │
│                                             │
│     [Supporting detail if needed]           │
│                                             │
│     ✓ Verification: [Expected result]       │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  [IMAGE: Step 2 illustration]               │
│                                             │
│  ② [Action verb] [object] [details]         │
│                                             │
│     a. [Sub-step if needed]                 │
│     b. [Sub-step if needed]                 │
│                                             │
│     ✓ Verification: [Expected result]       │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  ⚠ CAUTION                                  │
│  [Step-specific warning before step 3]      │
│                                             │
│  [IMAGE: Step 3 illustration]               │
│                                             │
│  ③ [Action verb] [object] [details]         │
│                                             │
└─────────────────────────────────────────────┘

ℹ NOTE
[Helpful information related to this procedure]
```

---

### Procedure Content Rules

1. **One action per step** - Break complex actions into sub-steps (a, b, c)
2. **Start with action verb** - Connect, Install, Verify, Tighten, etc.
3. **Include verification** - Add ✓ checkpoints after critical steps
4. **Safety first** - Place warnings BEFORE the hazardous step
5. **Visual support** - Every step should have an illustration placeholder

### Action Verbs to Use
| Category | Verbs |
|----------|-------|
| Assembly | Attach, Connect, Insert, Mount, Secure |
| Adjustment | Adjust, Align, Position, Rotate, Tighten |
| Verification | Check, Confirm, Ensure, Inspect, Verify |
| Configuration | Configure, Enable, Select, Set |
| Power | Energize, Power on/off, Switch |

---

### Section: Wiring Connections

**Required Format for Connection Details:**

```
X. WIRING CONNECTIONS

X.1 Connection Diagram
[IMAGE: Wiring diagram showing all connections]

X.2 Terminal Assignments

[Component A] Terminals:
| Terminal | Label | Wire Color | Connects To |
|----------|-------|------------|-------------|
| 1 | A+ | [TBD] | [Component B] Terminal A |
| 2 | B- | [TBD] | [Component B] Terminal B |
[...]

⚠ CAUTION
Ensure correct polarity when connecting terminals. 
Reversed connections may damage equipment.

X.3 Cable Specifications
| Connection | Cable Type | Max Length |
|------------|------------|------------|
| RS485 | Shielded twisted pair | 1200m |
[...]
```

---

### Section: System Verification

**Required Content:**

```
X. SYSTEM VERIFICATION

X.1 Pre-Power Checklist
Before applying power, verify:

☐ All mechanical connections are secure
☐ All electrical connections are correct (A-A, B-B)
☐ No exposed wires or damaged insulation
☐ Cable glands are properly tightened
☐ [Product-specific checks]

X.2 Initial Power-Up

① Apply power to the system

   ✓ Verification: [Expected LED/display behavior]

② Wait [X] seconds for system initialization

   ✓ Verification: [Expected behavior after init]

X.3 Functional Verification

| Check | Expected Result | ☐ |
|-------|-----------------|---|
| Display active | Shows sensor readings | ☐ |
| LED status | 1 blink per minute | ☐ |
| [Check 3] | [Result] | ☐ |

X.4 Dashboard Verification (if applicable)

① Open WakeCap Dashboard at [URL]
② Navigate to [Location]
③ Verify device appears online
④ Confirm data is updating

   ✓ Verification: Live data visible within [X] minutes
```

---

### Section: Troubleshooting Quick Reference

**Required Format:**

```
X. TROUBLESHOOTING

If you encounter issues during setup, refer to this quick guide:

| Symptom | Likely Cause | Solution |
|---------|--------------|----------|
| No LED activity | No power | Check power connections; verify voltage |
| 2 blinks/min | Communication error | Check RS485 wiring (A-A, B-B) |
| Display shows zeros | Sensor disconnected | Check sensor cable connections |
| Not visible on dashboard | Network issue | Verify gateway online; check mesh |

For additional troubleshooting, see the full Troubleshooting Guide 
(Document: WC-[PRODUCT]-TG-vX.X)
```

---

### Section: What's Next

**Required Content:**

```
X. WHAT'S NEXT

Installation is complete. To get the most from your [Product]:

1. Review the Product Manual (WC-[PRODUCT]-PM-vX.X) for:
   • Detailed specifications
   • Maintenance schedules
   • Advanced configuration options

2. Download the WakeCap Verify App to:
   • Monitor system status in the field
   • Verify mesh network connectivity
   • Access device configurations

3. Bookmark the WakeCap Dashboard at:
   [Dashboard URL]

Support Contact:
• Email: [support email]
• Phone: [support phone]
• Documentation: [docs URL]
```

---

### Back Page: Quick Reference

**Optional but recommended:**

```
┌─────────────────────────────────────────────┐
│              QUICK REFERENCE                │
├─────────────────────────────────────────────┤
│                                             │
│  LED Status:                                │
│  ● 1 blink/min = Normal                     │
│  ● 2 blinks/min = Communication error       │
│                                             │
│  Power Requirements:                        │
│  • Voltage: [X]V DC                         │
│  • Current: [X] mA typical                  │
│                                             │
│  Terminal Reference:                        │
│  [Simple terminal diagram]                  │
│                                             │
│  Support: [contact info]                    │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Image Placeholder Guidelines

For Setup Guides, every step should have an illustration. Use these placeholder descriptions:

```
[IMAGE: Step X - Brief description of what the image should show]

Examples:
[IMAGE: Step 1 - Hands positioning mounting bracket against wall with level]
[IMAGE: Step 2 - Close-up of terminal block with wire being inserted into Terminal A]
[IMAGE: Step 3 - Complete assembly showing all cables connected]
[IMAGE: Verification - LCD display showing normal readings]
```

---

## Quality Checklist

Before finalizing, verify:

- [ ] Package contents list is complete
- [ ] Required tools are listed
- [ ] Safety warnings appear BEFORE hazardous steps
- [ ] Every step starts with an action verb
- [ ] Every critical step has a verification checkpoint
- [ ] Wiring connections include polarity warnings
- [ ] Terminal assignments are in table format
- [ ] System verification checklist is included
- [ ] Troubleshooting quick reference is included
- [ ] Contact information is provided
- [ ] All [IMAGE] placeholders have descriptive text
- [ ] Time estimates are realistic

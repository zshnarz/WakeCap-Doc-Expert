# Troubleshooting Guide Template Instructions

This document defines the structure and content requirements for WakeCap Troubleshooting Guides.

---

## Purpose

Troubleshooting Guides provide systematic diagnostic procedures for identifying and resolving issues with WakeCap products. They follow a logical flow from symptom identification to resolution.

---

## Target Audience

- Field service technicians
- Support engineers
- Advanced users performing self-diagnosis

---

## Document Characteristics

| Attribute | Specification |
|-----------|---------------|
| Typical Length | 10-20 pages |
| Orientation | Portrait (A4 or Letter) |
| Primary Content | Diagnostic flowcharts, issue tables, procedures |
| Organization | Symptom-based (user starts with what they observe) |

---

## Document Structure

### Cover Page

```
┌─────────────────────────────────────────────┐
│  [WakeCap Logo - top left, 20mm]            │
│                                             │
│  ─────────────────────────────────────────  │
│                                             │
│  TROUBLESHOOTING GUIDE             ← H2     │
│                                             │
│  [Product Name]                    ← H1     │
│  Diagnostic & Resolution Procedures         │
│                                             │
│  Document: [DOC-ID]                         │
│  Revision: [VERSION]                        │
│  Date: [DATE]                               │
│                                             │
│  [IMAGE: Product diagnostic setup - 30%]    │
│                                             │
└─────────────────────────────────────────────┘
```

---

### Section 1: Before You Begin

```
1. BEFORE YOU BEGIN

1.1 Required Tools
• Multimeter (DC voltage measurement)
• WakeCap Verify App (installed on mobile device)
• Access to WakeCap Dashboard
• [Product-specific tools]

1.2 Safety Precautions

⚠ WARNING
Always de-energize the system before inspecting electrical 
connections. Verify zero voltage before touching terminals.

1.3 How to Use This Guide

This guide is organized by SYMPTOM. Start with Section 2 to 
identify your symptom category, then follow the diagnostic 
procedure for that symptom.

If you cannot resolve the issue using this guide, contact 
WakeCap Support with:
• Device serial number
• Symptom description
• Diagnostic results from this guide
• Photos of the installation
```

---

### Section 2: Symptom Index

**Critical Section - Entry Point for Users**

```
2. SYMPTOM INDEX

Find your symptom below, then go to the referenced section.

POWER ISSUES
┌────────────────────────────────────────┬─────────┐
│ Symptom                                │ Section │
├────────────────────────────────────────┼─────────┤
│ No LED activity on any device          │ §3.1    │
│ LED flashes then stops                 │ §3.2    │
│ Intermittent power loss                │ §3.3    │
└────────────────────────────────────────┴─────────┘

COMMUNICATION ISSUES
┌────────────────────────────────────────┬─────────┐
│ Symptom                                │ Section │
├────────────────────────────────────────┼─────────┤
│ MODBUS Asset shows 2 blinks/min        │ §4.1    │
│ Device not appearing on Dashboard      │ §4.2    │
│ Data updates intermittently            │ §4.3    │
│ Mesh network connectivity issues       │ §4.4    │
└────────────────────────────────────────┴─────────┘

DATA ISSUES
┌────────────────────────────────────────┬─────────┐
│ Symptom                                │ Section │
├────────────────────────────────────────┼─────────┤
│ Display shows all zeros                │ §5.1    │
│ Sensor reading out of range            │ §5.2    │
│ Readings don't match actual conditions │ §5.3    │
│ Historical data missing                │ §5.4    │
└────────────────────────────────────────┴─────────┘

[Additional categories as needed]
```

---

### Section 3-N: Diagnostic Procedures

**Format for Each Symptom:**

```
X.X [SYMPTOM NAME]

SYMPTOM DESCRIPTION:
[Detailed description of what the user observes]

POSSIBLE CAUSES:
1. [Cause A] - Most common
2. [Cause B]
3. [Cause C]
4. [Cause D] - Least common

DIAGNOSTIC FLOWCHART:

    ┌─────────────────────┐
    │  [Symptom observed] │
    └──────────┬──────────┘
               │
               ▼
    ┌─────────────────────┐     YES    ┌─────────────────┐
    │ Check [Condition 1] ├───────────▶│ Go to Step A    │
    └──────────┬──────────┘            └─────────────────┘
               │ NO
               ▼
    ┌─────────────────────┐     YES    ┌─────────────────┐
    │ Check [Condition 2] ├───────────▶│ Go to Step B    │
    └──────────┬──────────┘            └─────────────────┘
               │ NO
               ▼
    ┌─────────────────────┐
    │ Contact Support     │
    │ Provide: [info]     │
    └─────────────────────┘


DIAGNOSTIC STEPS:

Step A: [Resolution for Condition 1]
─────────────────────────────────────
① [First action]
   ✓ Expected result: [what you should see]

② [Second action]
   ✓ Expected result: [what you should see]

If issue persists → Go to Step B

Step B: [Resolution for Condition 2]
─────────────────────────────────────
① [First action]
② [Second action]

If issue persists → Contact Support


RESOLUTION VERIFICATION:
After completing the repair, verify:
☐ [Verification check 1]
☐ [Verification check 2]
☐ [Verification check 3]
```

---

### LED Status Reference Section

**Include for all products with LEDs:**

```
X. LED STATUS REFERENCE

X.1 [Component Name] LED

| LED Pattern | Status | Meaning | Action Required |
|-------------|--------|---------|-----------------|
| 1 blink/min | Normal | System operating correctly | None |
| 2 blinks/min | Error | Communication failure | Check RS485 |
| Rapid blink | Init | System initializing | Wait 60 sec |
| Solid ON | Fault | Hardware fault | Contact support |
| OFF | No power | No power to device | Check power supply |

X.2 How to Count Blinks

To accurately determine LED status:
① Observe the LED for a full 60 seconds
② Count total number of blinks
③ Divide by 1 to get blinks per minute
④ Match to table above

ℹ NOTE
A "blink" is defined as the LED turning ON then OFF. 
Do not count the OFF period as a separate event.
```

---

### Connection Verification Section

```
X. CONNECTION VERIFICATION

X.1 RS485 Connection Test

① Disconnect power from both devices

② At [Source Device], measure resistance between A and B terminals
   ✓ Expected: Open circuit (infinite resistance)
   ✗ If shorted: Cable or terminal damage

③ At [Source Device], measure continuity from A terminal to 
   [Destination Device] A terminal
   ✓ Expected: Near 0Ω (continuous)
   ✗ If open: Cable break or loose connection

④ Repeat for B terminals

⑤ Verify A connects to A, B connects to B (not crossed)

X.2 Power Supply Test

① Measure voltage at power input terminals
   ✓ Expected: [Min]V to [Max]V DC
   ✗ Below [Min]V: Check battery/solar system
   ✗ Above [Max]V: Check regulator, risk of damage

② If using solar power, check MPPT controller:
   • Charging indicator active during daylight
   • Battery voltage within range
```

---

### Error Code Reference (if applicable)

```
X. ERROR CODES

If your device displays error codes, find them here:

| Code | Description | Likely Cause | Resolution |
|------|-------------|--------------|------------|
| E01 | Sensor fault | Sensor disconnected | Check sensor cable |
| E02 | Calibration needed | Sensor drift | Recalibrate sensor |
| E03 | Communication timeout | Network issue | Check mesh path |
| E04 | Memory error | Internal fault | Power cycle; contact support |
```

---

### Escalation Procedures

```
X. WHEN TO CONTACT SUPPORT

Contact WakeCap Support if:
• Issue not resolved after following all procedures
• Error codes not listed in this guide
• Physical damage to equipment observed
• Repeated failures after repairs

INFORMATION TO PROVIDE:
1. Device serial number (found on [location])
2. Symptom description
3. Diagnostic steps already completed
4. Error codes or LED patterns observed
5. Photos of installation and any damage
6. Site conditions (weather, location type)

SUPPORT CONTACT:
• Email: [support email]
• Phone: [support phone]
• Portal: [support URL]
• Hours: [support hours]
```

---

### Appendix: System Health Checklist

```
APPENDIX A: SYSTEM HEALTH CHECKLIST

Use this checklist for periodic system verification:

PHYSICAL INSPECTION
☐ Enclosure intact, no visible damage
☐ Cable glands properly sealed
☐ No corrosion on terminals
☐ Mounting secure
☐ Solar panel clean and unobstructed

POWER SYSTEM
☐ Battery voltage: ______V (should be >12V)
☐ MPPT charging indicator active (daytime)
☐ No loose power connections

COMMUNICATION
☐ MODBUS Asset LED: 1 blink/min
☐ Device visible in WakeCap Verify App
☐ Data appearing on Dashboard

DATA QUALITY
☐ All sensors showing readings (not zero)
☐ Readings within expected ranges
☐ Data updating at expected intervals

Date checked: ___________
Technician: ___________
```

---

## Flowchart Guidelines

### Symbols

```
┌─────────────┐
│  Rectangle  │  = Step or action
└─────────────┘

◇ Diamond ◇     = Decision (Yes/No)

(  Oval  )      = Start or End

→               = Flow direction
```

### Flowchart Rules
1. Start with the symptom at the top
2. Use Yes/No decisions that are objectively verifiable
3. Maximum 5-6 decision points before resolution or escalation
4. Always include an escalation path ("Contact Support")
5. Place most common cause checks first

---

## Quality Checklist

Before finalizing, verify:

- [ ] Symptom Index covers all known issues
- [ ] Every symptom has a diagnostic procedure
- [ ] Flowcharts are clear and follow logical order
- [ ] LED status reference is complete
- [ ] Connection verification procedures included
- [ ] Resolution verification steps included
- [ ] Escalation procedure with contact info
- [ ] All procedures start with safety reminders
- [ ] Cross-references (§X.X) are accurate

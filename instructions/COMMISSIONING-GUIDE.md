# Commissioning Guide Template Instructions

This document defines the structure and content requirements for WakeCap Commissioning Guides.

---

## Purpose

Commissioning Guides provide procedures to bring up, calibrate, validate, and formally accept a WakeCap product installation. They prove the system works correctly and capture evidence for handover. Commissioning follows installation and precedes operational handover.

---

## Target Audience

- Commissioning engineers
- Field service technicians
- Site acceptance teams
- Project managers overseeing handover

---

## Document Characteristics

| Attribute | Specification |
|-----------|---------------|
| Typical Length | 6-12 pages |
| Orientation | Portrait (A4 or Letter) |
| Primary Content | Checklists with pass/fail fields, acceptance criteria |
| Layout | Checklist-first with pass/fail fields |
| Hero Content | Expected ranges, acceptance criteria |
| Image Ratio | 30% visual (screenshots, expected readings), 70% text |

---

## Document Structure

### Cover Page

```
┌──────────────────────────────────────────────────┐
│  [WakeCap Logo - top left, 20mm]                 │
│                                                  │
│  ─────────────────────────────────────────────── │
│                                                  │
│  COMMISSIONING GUIDE                    ← H2     │
│                                                  │
│  [Product Name]                         ← H1     │
│  Bring-Up, Calibration & Acceptance              │
│                                                  │
│  Document: [DOC-ID]                              │
│  Revision: [VERSION]                             │
│  Date: [DATE]                                    │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

### Required Sections

#### 1. Preconditions

```
1. PRECONDITIONS

Before starting commissioning, verify the following:

INSTALLATION COMPLETE
☐ Installation Guide (WC-[PRODUCT]-IG-vX.X) fully executed
☐ Installation completion checklist signed off
☐ All mechanical and electrical connections verified

FIRMWARE AND SOFTWARE
| Item | Required Version | Actual Version | ☐ |
|------|-----------------|----------------|---|
| Device firmware | [TBD] | _________ | ☐ |
| App version | [TBD] | _________ | ☐ |
| Dashboard version | [TBD] | _________ | ☐ |

TOOLS AND EQUIPMENT
• [Calibration reference instrument 1]
• [Calibration reference instrument 2]
• WakeCap Verify App (installed and logged in)
• Access to WakeCap Dashboard
• [Product-specific commissioning tools]

ENVIRONMENTAL CONDITIONS
| Parameter | Required | Actual | ☐ |
|-----------|----------|--------|---|
| Temperature | [TBD] to [TBD] °C | _______ °C | ☐ |
| Humidity | < [TBD] % RH | _______ % | ☐ |
| Wind (for outdoor sensors) | < [TBD] m/s | _______ m/s | ☐ |
```

#### 2. Calibration Steps

```
2. CALIBRATION

2.1 [Sensor/Parameter 1] Calibration

⚠ NOTICE
Calibration must be performed under stable environmental
conditions. Allow [X] minutes for sensor stabilization.

REFERENCE INSTRUMENT: [Type, model, calibration date]

① Apply reference [stimulus] of [value] [unit].
② Wait [X] seconds for reading to stabilize.
③ Record the device reading.

| Point | Reference Value | Device Reading | Deviation | Pass (≤[X]%)? |
|-------|----------------|----------------|-----------|---------------|
| Low | [TBD] | _________ | _________ | ☐ |
| Mid | [TBD] | _________ | _________ | ☐ |
| High | [TBD] | _________ | _________ | ☐ |

ACCEPTANCE CRITERIA: Deviation ≤ [TBD]% of full scale

④ If deviation exceeds tolerance:
   a. Perform offset calibration per §2.X
   b. Repeat measurement
   c. If still out of tolerance, contact support

2.2 [Sensor/Parameter 2] Calibration
[Repeat format for each calibratable parameter]
```

#### 3. Connectivity Validation

```
3. CONNECTIVITY VALIDATION

3.1 Local Communication

① Verify device responds on [protocol] at address [TBD].
   Tool: [tool or app name]
   ✓ Expected: Response within [X] seconds

| Test | Command / Action | Expected Response | Actual | ☐ |
|------|------------------|-------------------|--------|---|
| Ping | [TBD] | [TBD] | _______ | ☐ |
| Read register | [TBD] | [TBD] | _______ | ☐ |

3.2 Network / Mesh Connectivity

① Open WakeCap Verify App.
② Scan for device [serial number].
③ Verify signal strength.

| Parameter | Min Acceptable | Actual | ☐ |
|-----------|---------------|--------|---|
| RSSI | [TBD] dBm | _______ | ☐ |
| Packet loss | < [TBD]% | _______ | ☐ |
| Latency | < [TBD] ms | _______ | ☐ |

3.3 Cloud / Dashboard Connectivity

① Log in to WakeCap Dashboard at [URL].
② Navigate to device page.
③ Verify device status shows "Online."

| Check | Expected | Actual | ☐ |
|-------|----------|--------|---|
| Device status | Online | _______ | ☐ |
| Last update | < [X] min ago | _______ | ☐ |
| Data displayed | All parameters | _______ | ☐ |

[IMAGE: Screenshot of expected dashboard view with device online]
```

#### 4. Sensor Validation Tests

```
4. SENSOR VALIDATION

For each sensor, verify readings are within expected ranges
under current site conditions.

4.1 [Sensor 1] Validation

| Parameter | Expected Range | Reading | ☐ |
|-----------|---------------|---------|---|
| [Parameter A] | [TBD] to [TBD] [unit] | _______ | ☐ |
| [Parameter B] | [TBD] to [TBD] [unit] | _______ | ☐ |

[IMAGE: Screenshot showing typical sensor readings on display/app]

4.2 [Sensor 2] Validation
[Repeat for each sensor]
```

#### 5. Alarm and Alert Tests

```
5. ALARM AND ALERT TESTS

5.1 Threshold Alarm Test

① Set alarm threshold to a test value within current conditions.
② Wait for alarm to trigger.
③ Verify alarm appears on dashboard/app.
④ Reset threshold to operational value.

| Alarm | Test Threshold | Triggered? | Dashboard? | ☐ |
|-------|---------------|------------|------------|---|
| [Alarm 1] | [TBD] | ☐ Yes ☐ No | ☐ Yes ☐ No | ☐ |
| [Alarm 2] | [TBD] | ☐ Yes ☐ No | ☐ Yes ☐ No | ☐ |

5.2 Communication Loss Alert

① Disconnect device from network (remove antenna / cable).
② Wait [X] minutes.
③ Verify "offline" alert on dashboard.
④ Reconnect device.
⑤ Verify device returns to "online" within [X] minutes.

Result: ☐ Pass  ☐ Fail
Notes: _________________________________
```

#### 6. Acceptance Criteria and Evidence Capture

```
6. ACCEPTANCE CRITERIA

ALL of the following must be satisfied for commissioning acceptance:

| # | Criterion | Section | Result |
|---|-----------|---------|--------|
| 1 | All calibration points within tolerance | §2 | ☐ Pass ☐ Fail |
| 2 | Local communication verified | §3.1 | ☐ Pass ☐ Fail |
| 3 | Network connectivity verified | §3.2 | ☐ Pass ☐ Fail |
| 4 | Dashboard connectivity verified | §3.3 | ☐ Pass ☐ Fail |
| 5 | All sensor readings within range | §4 | ☐ Pass ☐ Fail |
| 6 | Alarm tests passed | §5 | ☐ Pass ☐ Fail |

EVIDENCE CAPTURE
Collect and attach the following:
☐ Photo of installed device with serial number visible
☐ Screenshot of dashboard showing device online
☐ Screenshot of sensor readings
☐ Completed calibration table (§2)
☐ Photo of wiring connections (close-up)
```

#### 7. Handover Checklist and Sign-Off

```
7. HANDOVER

7.1 Documentation Provided to Client

☐ Product Manual (WC-[PRODUCT]-PM-vX.X)
☐ Quick Reference Card (WC-[PRODUCT]-QR-vX.X)
☐ Troubleshooting Guide (WC-[PRODUCT]-TG-vX.X)
☐ This Commissioning Report (completed and signed)

7.2 Training Provided

☐ Dashboard navigation and data interpretation
☐ Alarm configuration and response
☐ Basic troubleshooting (LED interpretation)
☐ Maintenance schedule overview
☐ Support contact procedure

7.3 Sign-Off

COMMISSIONING RESULT:  ☐ ACCEPTED  ☐ CONDITIONAL  ☐ REJECTED

Conditions (if conditional):
_________________________________________________________
_________________________________________________________

Commissioned by: _________________  Date: ___________
                 Name / Company

Accepted by:     _________________  Date: ___________
                 Name / Company

Witnessed by:    _________________  Date: ___________
                 Name / Company
```

---

## Image Strategy

| Image Type | Requirement |
|------------|-------------|
| Screenshots | Expected dashboard views, app readings, typical ranges |
| Reference photos | Calibration setup, expected display readings |

```
[IMAGE: CG - Screenshot of dashboard showing device online and healthy]
[IMAGE: CG - Screenshot of typical sensor readings within range]
[IMAGE: CG - Calibration setup showing reference instrument and device]
[IMAGE: CG - Expected alarm notification on dashboard]
```

---

## Content Rules

1. **Pass/fail fields** - Every test must have a clear pass/fail outcome
2. **Expected ranges** - State the acceptable range for every measurement
3. **Measurement tolerances** - Include tolerance percentages
4. **Evidence capture** - Specify what evidence to collect
5. **Traceability** - Record firmware versions, serial numbers, reference instruments
6. **Sign-off required** - Formal acceptance with signatures and dates

---

## Quality Checklist

Before finalizing, verify:

- [ ] Preconditions include firmware version requirements
- [ ] All calibration steps include acceptance criteria
- [ ] Connectivity tests cover local, network, and cloud
- [ ] Sensor validation includes expected ranges
- [ ] Alarm tests include trigger and recovery
- [ ] Acceptance criteria table summarizes all tests
- [ ] Evidence capture list is complete
- [ ] Handover checklist includes all deliverable documents
- [ ] Sign-off section includes multiple roles
- [ ] All pass/fail fields are present
- [ ] Document ID and revision shown

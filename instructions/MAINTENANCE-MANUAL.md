# Maintenance Manual Template Instructions

This document defines the structure and content requirements for WakeCap Maintenance Manuals.

---

## Purpose

Maintenance Manuals provide scheduled upkeep procedures, inspection protocols, and replacement instructions for WakeCap products. They ensure predictable performance, extend product lifespan, and maintain safety compliance through systematic servicing.

---

## Target Audience

- Maintenance technicians
- Facility management teams
- Field service engineers
- Site supervisors responsible for asset upkeep

---

## Document Characteristics

| Attribute | Specification |
|-----------|---------------|
| Typical Length | 10-20 pages |
| Orientation | Portrait (A4 or Letter) |
| Primary Content | Interval-based procedures, inspection checklists, replacement steps |
| Layout | Interval-based organization |
| Hero Content | Intervals, inspection points, replacement procedures |
| Image Ratio | 40% visual (exploded views, replaceable modules), 60% text |

---

## Document Structure

### Cover Page

```
┌──────────────────────────────────────────────────┐
│  [WakeCap Logo - top left, 20mm]                 │
│                                                  │
│  ─────────────────────────────────────────────── │
│                                                  │
│  MAINTENANCE MANUAL                     ← H2     │
│                                                  │
│  [Product Name]                         ← H1     │
│  Scheduled Upkeep & Servicing                    │
│                                                  │
│  Document: [DOC-ID]                              │
│  Revision: [VERSION]                             │
│  Date: [DATE]                                    │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

### Required Sections

#### 1. Safety and Lockout Considerations

```
1. SAFETY AND LOCKOUT

1.1 General Safety

⚠ WARNING
De-energize the system and follow lockout/tagout (LOTO)
procedures before performing any maintenance that involves
electrical connections or internal components.

1.2 Lockout/Tagout Procedure

① Notify all affected personnel.
② Identify all energy sources.
③ Shut down equipment using normal stop procedure.
④ Isolate all energy sources.
⑤ Apply lockout/tagout devices.
⑥ Verify zero energy state.

1.3 Required PPE

| Task Category | Required PPE |
|---------------|-------------|
| Visual inspection | Safety glasses, hard hat |
| Electrical work | Insulated gloves, safety glasses |
| Cleaning (chemical) | Chemical-resistant gloves, eye protection |
| Working at height | Fall protection per site requirements |

1.4 Qualified Personnel

| Maintenance Level | Required Qualification |
|-------------------|----------------------|
| Level 1 (Inspection) | Site-trained personnel |
| Level 2 (Cleaning/adjustment) | Trained technician |
| Level 3 (Component replacement) | Certified field service engineer |
```

#### 2. Maintenance Intervals and Inspection Points

```
2. MAINTENANCE SCHEDULE

2.1 Interval Summary

| Task | Interval | Level | Section | Est. Time |
|------|----------|-------|---------|-----------|
| Visual inspection | Monthly | 1 | §3.1 | 15 min |
| Cleaning | Monthly | 2 | §3.2 | 30 min |
| Connection check | Quarterly | 2 | §3.3 | 20 min |
| Sensor calibration | Semi-annually | 3 | §3.4 | 45 min |
| Seal/gasket inspection | Semi-annually | 2 | §3.5 | 20 min |
| Full system check | Annually | 3 | §3.6 | 90 min |
| Battery replacement | As needed | 2 | §4.1 | 30 min |
| [Component] replacement | As needed | 3 | §4.2 | [TBD] |

2.2 Maintenance Log

| Date | Task Performed | Technician | Next Due |
|------|---------------|------------|----------|
| _______ | _____________ | _________ | _______ |
| _______ | _____________ | _________ | _______ |
| _______ | _____________ | _________ | _______ |
```

#### 3. Scheduled Maintenance Procedures

```
3. SCHEDULED MAINTENANCE PROCEDURES

3.1 Visual Inspection (Monthly, Level 1)

Inspect the following and record findings:

| Inspection Point | OK | Issue Found | Notes |
|-----------------|----|----|-------|
| Enclosure condition (cracks, dents) | ☐ | ☐ | _____ |
| Mounting security (no movement) | ☐ | ☐ | _____ |
| Cable condition (no damage, chafing) | ☐ | ☐ | _____ |
| Cable gland tightness | ☐ | ☐ | _____ |
| LED status (1 blink/min = normal) | ☐ | ☐ | _____ |
| Corrosion on terminals or enclosure | ☐ | ☐ | _____ |
| Solar panel condition (if applicable) | ☐ | ☐ | _____ |

3.2 Cleaning (Monthly, Level 2)

⚠ CAUTION
Do not use solvents, abrasives, or high-pressure water jets.
Use only approved cleaning materials.

APPROVED CLEANING MATERIALS
• Soft lint-free cloth
• Isopropyl alcohol (70% for stubborn residue)
• Distilled water

PROCEDURE
① De-energize the system (if cleaning near terminals).
② Clean enclosure exterior with damp lint-free cloth.
③ Clean sensor elements per manufacturer instructions:
   • [Sensor 1]: [Specific cleaning method]
   • [Sensor 2]: [Specific cleaning method]
④ Clean solar panel (if applicable) with distilled water.
⑤ Dry all surfaces.
⑥ Re-energize and verify normal operation.

3.3 Connection Check (Quarterly, Level 2)

⚠ WARNING
De-energize the system before inspecting electrical connections.

① Open enclosure (if required for terminal access).
② Check each terminal connection for tightness.
   Re-torque to [TBD] N·m if loose.
③ Inspect wire insulation for damage or discoloration.
④ Check grounding connection integrity.
⑤ Close and reseal enclosure.
⑥ Re-energize and verify normal operation.

3.4 Sensor Calibration (Semi-annual, Level 3)

[Reference to Commissioning Guide §2 calibration procedure]
Follow calibration procedure in WC-[PRODUCT]-CG-vX.X, Section 2.

3.5 Seal and Gasket Inspection (Semi-annual, Level 2)

① Open enclosure.
② Inspect gasket for:
   • Compression set (permanent deformation)
   • Cracking or hardening
   • Debris or contamination
③ Replace gasket if any defects found (see §4.X).
④ Inspect cable gland seals.
⑤ Replace damaged cable glands (see §4.X).

3.6 Full System Check (Annual, Level 3)

Perform all items from §3.1 through §3.5 plus:
☐ Firmware version check (update if newer version available)
☐ Full calibration verification
☐ Battery health assessment (if applicable)
☐ Communication performance test (signal strength, packet loss)
☐ Dashboard data integrity check (historical data review)
```

#### 4. Replacement Procedures

```
4. REPLACEMENT PROCEDURES

4.1 [Component 1] Replacement

REPLACEMENT PART: [Part number], [Description]

⚠ [Safety warning specific to this replacement]

① De-energize the system.
② [Removal step 1]
③ [Removal step 2]
④ [Installation of new component step 1]
⑤ [Installation of new component step 2]
⑥ Re-energize and verify normal operation.
   ✓ Expected: [Normal behavior]

[IMAGE: Exploded view showing component location and removal direction]

4.2 [Component 2] Replacement
[Repeat format for each replaceable component]
```

#### 5. Spare Parts List

```
5. SPARE PARTS

| # | Part Number | Description | Compatible Rev | Qty per Unit |
|---|-------------|-------------|----------------|-------------|
| 1 | [TBD] | [Description] | [TBD] | [TBD] |
| 2 | [TBD] | [Description] | [TBD] | [TBD] |
| 3 | [TBD] | [Description] | [TBD] | [TBD] |

RECOMMENDED SPARES KIT
For a site with [X] deployed units, maintain:
| Part | Recommended Stock |
|------|-------------------|
| [Part 1] | [Quantity] |
| [Part 2] | [Quantity] |

ORDERING
Contact: [ordering email / portal]
Lead time: [typical lead time]
```

#### 6. Post-Maintenance Verification Checklist

```
6. POST-MAINTENANCE VERIFICATION

After completing any maintenance activity, verify:

☐ Enclosure properly sealed (gasket, fasteners, cable glands)
☐ All electrical connections secure
☐ System powered on and LED status normal
☐ Sensor readings within expected ranges
☐ Device visible on dashboard
☐ Data updating at expected intervals
☐ No alarms or error conditions
☐ Maintenance log updated (§2.2)

SIGN-OFF
Technician: _________________  Date: ___________
Supervisor: __________________  Date: ___________
```

---

## Image Strategy

| Image Type | Requirement |
|------------|-------------|
| Exploded views | Show replaceable components and assembly order |
| Replaceable module photos | Close-up of each replaceable part with part number |
| Inspection point diagrams | Product diagram with inspection points annotated |

```
[IMAGE: MG - Exploded view showing all replaceable components]
[IMAGE: MG - Inspection point diagram with numbered callouts]
[IMAGE: MG - Close-up of gasket inspection points]
[IMAGE: MG - Component removal sequence]
```

---

## Content Rules

1. **Interval-based organization** - Group tasks by maintenance interval
2. **Level-based access** - Specify qualification level for each task
3. **LOTO always** - Include lockout/tagout for any electrical work
4. **Verification after every procedure** - Confirm system is operational
5. **Part numbers** - Include for all replaceable components
6. **Procedural** - Use numbered steps with action verbs

---

## Quality Checklist

Before finalizing, verify:

- [ ] Safety and lockout procedures are included
- [ ] Maintenance schedule covers all intervals
- [ ] Each procedure specifies qualification level
- [ ] Cleaning procedure specifies approved materials
- [ ] Replacement procedures include part numbers
- [ ] Spare parts list is complete with compatible revisions
- [ ] Post-maintenance verification checklist is included
- [ ] Maintenance log template is provided
- [ ] Sign-off fields are present
- [ ] All [IMAGE] placeholders have descriptive text
- [ ] Cross-references to other documents are accurate
- [ ] Document ID and revision shown

# Safety Manual Template Instructions

This document defines the structure and content requirements for WakeCap Safety Manuals.

---

## Purpose

Safety Manuals define the safe-use conditions, operational constraints, hazard identification, and risk mitigation measures for a WakeCap product. They serve as the authoritative safety reference for compliance, site access approvals, and safety management system integration.

---

## Target Audience

- HSE (Health, Safety, Environment) managers
- Site safety officers
- Compliance and regulatory teams
- Risk assessment engineers
- Installation and maintenance personnel

---

## Document Characteristics

| Attribute | Specification |
|-----------|---------------|
| Typical Length | 8-16 pages |
| Orientation | Portrait (A4 or Letter) |
| Primary Content | Hazard tables, safe-use conditions, risk matrices |
| Layout | Safety-forward; ANSI Z535.4 compliant panels |
| Hero Content | Hazard identification, risk assessment, safe-use boundaries |
| Image Ratio | 20% visual (safety symbols, hazard zones), 80% text |

---

## Document Structure

### Cover Page

```
┌──────────────────────────────────────────────────┐
│  [WakeCap Logo - top left, 20mm]                 │
│                                                  │
│  ─────────────────────────────────────────────── │
│                                                  │
│  SAFETY MANUAL                          ← H2     │
│                                                  │
│  [Product Name]                         ← H1     │
│  Safe-Use Conditions & Constraints               │
│                                                  │
│  Document: [DOC-ID]                              │
│  Revision: [VERSION]                             │
│  Date: [DATE]                                    │
│                                                  │
│  ⚠ READ THIS MANUAL BEFORE INSTALLING,           │
│  OPERATING, OR SERVICING THIS PRODUCT.           │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

### Required Sections

#### 1. General Safety Information

```
1. GENERAL SAFETY INFORMATION

1.1 About This Manual
This Safety Manual is a MANDATORY companion document to all
other [Product Name] documentation. It defines the conditions
under which the product can be safely installed, operated,
and maintained.

1.2 Intended Use
The [Product Name] is designed and tested for use as:
• [Intended use statement 1]
• [Intended use statement 2]

1.3 Reasonably Foreseeable Misuse
The following uses are NOT intended and may create hazards:
• [Misuse 1 - e.g., use in explosive atmospheres unless rated]
• [Misuse 2 - e.g., modification of hardware or firmware]
• [Misuse 3 - e.g., use outside environmental ratings]

1.4 Safety Symbol Reference

| Symbol | Signal Word | Meaning |
|--------|-------------|---------|
| ⚠ DANGER | DANGER | Immediate hazard WILL cause death or serious injury |
| ⚠ WARNING | WARNING | Hazard COULD cause death or serious injury |
| ⚠ CAUTION | CAUTION | Hazard COULD cause minor or moderate injury |
| ℹ NOTICE | NOTICE | Property damage or important information |
```

#### 2. Safe-Use Conditions

```
2. SAFE-USE CONDITIONS

The product is safe to use ONLY when ALL of the following
conditions are met:

2.1 Environmental Conditions

| Parameter | Safe Range | Consequence if Exceeded |
|-----------|-----------|------------------------|
| Operating Temperature | [TBD] to [TBD] °C | [Consequence] |
| Humidity | [TBD] to [TBD] % RH | [Consequence] |
| Altitude | 0 to [TBD] m | [Consequence] |
| UV Exposure | [TBD] | [Consequence] |

2.2 Electrical Conditions

| Parameter | Safe Range | Consequence if Exceeded |
|-----------|-----------|------------------------|
| Supply Voltage | [TBD] to [TBD] V DC | [Consequence] |
| Max Current | [TBD] A | [Consequence] |
| Grounding | Connected to site ground | [Consequence] |

2.3 Mechanical Conditions

| Parameter | Requirement | Consequence if Not Met |
|-----------|-------------|----------------------|
| Mounting | Per Installation Guide | [Consequence] |
| Enclosure | Sealed, all glands tight | [Consequence] |
| Weight load | [TBD] kg max on mounting | [Consequence] |

2.4 Operational Conditions

| Condition | Requirement |
|-----------|-------------|
| Qualified personnel | See §3 |
| Maintenance schedule | Per Maintenance Manual |
| Firmware | Approved version only |
| Modifications | None permitted |
```

#### 3. Personnel Qualifications

```
3. PERSONNEL QUALIFICATIONS

3.1 Installation Personnel

| Requirement | Description |
|-------------|-------------|
| Electrical qualification | [TBD] (e.g., licensed electrician) |
| Training | Product-specific installation training |
| PPE | Per site requirements + §4.2 |

3.2 Operating Personnel

| Requirement | Description |
|-------------|-------------|
| Training | Product familiarization |
| Access | Authorized site access |

3.3 Maintenance Personnel

| Requirement | Description |
|-------------|-------------|
| Electrical qualification | [TBD] |
| Training | Product-specific maintenance training |
| LOTO certification | Required for electrical maintenance |
```

#### 4. Hazard Identification

```
4. HAZARD IDENTIFICATION

4.1 Electrical Hazards

⚠ DANGER
ELECTRIC SHOCK HAZARD
Contact with energized terminals can cause death or serious
injury. De-energize and verify zero voltage before servicing
electrical connections.
• Always follow lockout/tagout procedures.
• Use insulated tools rated for the voltage present.
• Never bypass safety interlocks or fuses.

4.2 Mechanical Hazards

⚠ WARNING
FALLING OBJECT HAZARD
The product weighs [TBD] kg. Improper mounting can result in
the unit falling, causing injury.
• Use mounting hardware rated for 4× product weight.
• Verify mounting surface structural capacity.
• Wear hard hat when working below mounted equipment.

4.3 Environmental Hazards

⚠ CAUTION
[Environmental hazard description - e.g., battery chemical
exposure, UV degradation, extreme temperature effects]
• [Mitigation measure 1]
• [Mitigation measure 2]

4.4 Hazard Summary Table

| # | Hazard | Risk Level | Location | Mitigation | Section |
|---|--------|-----------|----------|------------|---------|
| H1 | Electric shock | High | Terminals | LOTO, insulated tools | §4.1 |
| H2 | Falling object | Medium | Mounting point | Rated hardware, hard hat | §4.2 |
| H3 | [Hazard] | [Level] | [Location] | [Mitigation] | §4.X |
```

#### 5. Risk Assessment Matrix

```
5. RISK ASSESSMENT

5.1 Risk Matrix

              │ Negligible │ Minor │ Moderate │ Serious │ Fatal │
──────────────┼────────────┼───────┼──────────┼─────────┼───────┤
Very Likely   │   Medium   │ High  │   High   │  V.High │V.High │
Likely        │    Low     │Medium │   High   │  High   │V.High │
Possible      │    Low     │  Low  │  Medium  │  High   │ High  │
Unlikely      │    Low     │  Low  │   Low    │ Medium  │ High  │
Rare          │    Low     │  Low  │   Low    │  Low    │Medium │

5.2 Product Risk Register

| # | Hazard | Severity | Likelihood | Risk | Mitigation | Residual Risk |
|---|--------|----------|------------|------|------------|---------------|
| R1 | [TBD] | [TBD] | [TBD] | [TBD] | [TBD] | [TBD] |
| R2 | [TBD] | [TBD] | [TBD] | [TBD] | [TBD] | [TBD] |
```

#### 6. Emergency Procedures

```
6. EMERGENCY PROCEDURES

6.1 Electrical Emergency

① Disconnect power at the source (breaker / isolator).
② Do NOT touch the victim if they are in contact with live conductors.
③ Call site emergency services.
④ Administer first aid only if trained and safe to do so.

6.2 Equipment Failure Emergency

① Isolate the failed equipment from power.
② Secure the area to prevent unauthorized access.
③ Report the failure to site management and WakeCap support.
④ Do not attempt repairs until root cause is determined.

6.3 Emergency Contacts

| Contact | Number | Hours |
|---------|--------|-------|
| Site Emergency | [TBD] | 24/7 |
| WakeCap Support | [TBD] | [TBD] |
| [Local emergency] | [TBD] | 24/7 |
```

#### 7. Disposal and End-of-Life

```
7. DISPOSAL AND END-OF-LIFE

7.1 Battery Disposal
[If product contains batteries]

⚠ WARNING
Batteries must be disposed of according to local regulations.
Do not incinerate, puncture, or dispose of in general waste.

7.2 Electronic Waste
This product is classified as electronic waste (WEEE).
Dispose of according to local e-waste regulations.

7.3 Hazardous Materials
| Material | Location | Disposal Method |
|----------|----------|----------------|
| [Battery type] | [Location] | Licensed battery recycler |
| [Material] | [Location] | [Method] |
```

#### 8. Applicable Standards

```
8. APPLICABLE STANDARDS

| Standard | Title | Relevance |
|----------|-------|-----------|
| IEC/IEEE 82079-1 | Preparation of information for use | Documentation |
| ANSI Z535.4 | Product Safety Signs and Labels | Safety labeling |
| IEC 62368-1 | Safety for audio/video and IT equipment | Product safety |
| [Standard] | [Title] | [Relevance] |
```

---

## Image Strategy

| Image Type | Requirement |
|------------|-------------|
| Safety symbols | ANSI Z535.4 compliant signal word panels |
| Hazard zone diagrams | Product diagrams showing hazard locations |

```
[IMAGE: SM - Product diagram with hazard zone annotations]
[IMAGE: SM - Safety label locations on product]
[IMAGE: SM - PPE requirements illustration]
```

---

## Content Rules

1. **Safety is absolute** - No ambiguous or qualified safety statements
2. **Consequences stated** - Every hazard must state the potential consequence
3. **Mitigation required** - Every hazard must have documented mitigation
4. **ANSI Z535.4 compliance** - Use correct signal words and panel formats
5. **Mandatory reading** - Document must state it is required reading
6. **No marketing** - This is a safety-critical document

---

## Quality Checklist

Before finalizing, verify:

- [ ] Intended use is clearly defined
- [ ] Reasonably foreseeable misuse is documented
- [ ] Safe-use conditions cover environmental, electrical, and mechanical
- [ ] Personnel qualifications are specified for each activity
- [ ] All hazards are identified with ANSI signal word panels
- [ ] Risk assessment matrix is included
- [ ] Emergency procedures are documented
- [ ] Disposal and end-of-life guidance is included
- [ ] Applicable standards are listed
- [ ] Signal words (DANGER, WARNING, CAUTION) are used correctly
- [ ] All hazards state consequence and mitigation
- [ ] Document ID and revision shown

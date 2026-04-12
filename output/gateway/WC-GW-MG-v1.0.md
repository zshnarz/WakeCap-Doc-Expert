# WakeCap Gateway Maintenance Manual

| Field | Value |
|---|---|
| **Document ID** | WC-GW-MG-v1.0 |
| **Document Type** | Maintenance Manual (MG) |
| **Version** | 1.0 |
| **Date** | 2026-02-09 |
| **Product** | WakeCap Gateway |
| **Product Code** | GW |
| **Hardware Compatibility** | Rev [TBD] and later |
| **Firmware Compatibility** | v[TBD] and later |
| **Classification** | Technical / Field (Version B) |

---

## Related Documents

| Document ID | Title | Version |
|---|---|---|
| WC-GW-PM-v1.0 | WakeCap Gateway Product Manual | 1.0 |
| WC-GW-IG-v1.0 | WakeCap Gateway Installation Guide | 1.0 |
| WC-GW-TG-v1.0 | WakeCap Gateway Troubleshooting Guide | 1.0 |

---

## Revision History

| Version | Date | Author | Description |
|---|---|---|---|
| 1.0 | 2026-02-09 | [TBD] | Initial release |

---

## Table of Contents

1. [Safety and Lockout Considerations](#1-safety-and-lockout-considerations)
2. [Maintenance Intervals and Inspection Points](#2-maintenance-intervals-and-inspection-points)
3. [Cleaning, Sealing, Corrosion, and Environmental Guidance](#3-cleaning-sealing-corrosion-and-environmental-guidance)
4. [Replacement Procedures](#4-replacement-procedures)
   - 4.1 [Antenna Replacement](#41-antenna-replacement)
   - 4.2 [SIM Card Replacement](#42-sim-card-replacement)
   - 4.3 [Enclosure Seal Replacement](#43-enclosure-seal-replacement)
   - 4.4 [Power Cable Replacement](#44-power-cable-replacement)
   - 4.5 [Mounting Hardware Replacement](#45-mounting-hardware-replacement)
5. [Spare Parts List](#5-spare-parts-list)
6. [Post-Maintenance Verification Checklist](#6-post-maintenance-verification-checklist)
7. [Firmware Update Procedure](#7-firmware-update-procedure)
8. [Maintenance Log Template](#8-maintenance-log-template)

---

## 1. Safety and Lockout Considerations

### 1.1 General Safety

> **DANGER:** The WakeCap Gateway may be installed in elevated locations. Always use appropriate fall protection equipment and follow site-specific working-at-height procedures before accessing the unit.

> **WARNING:** Disconnect all power sources before performing any maintenance procedure on the Gateway. Failure to de-energize the unit may result in electrical shock or equipment damage.

> **WARNING:** The Gateway contains a lithium-based backup battery rated at [TBD] V / [TBD] Ah. Do not puncture, crush, short-circuit, or expose the battery to temperatures exceeding [TBD] C. Risk of fire or chemical burn.

> **CAUTION:** The Gateway antenna transmits RF energy at [TBD] MHz / [TBD] GHz. Maintain a minimum separation distance of [TBD] cm from the antenna during powered operation.

### 1.2 Required Personal Protective Equipment (PPE)

| PPE Item | Requirement |
|---|---|
| Safety gloves (insulated) | Required for all electrical work |
| Safety glasses | Required for all procedures |
| ESD wrist strap | Required when handling internal electronics |
| Hard hat | Required on construction sites |
| Fall protection harness | Required when working above [TBD] m |

### 1.3 Lockout/Tagout (LOTO) Procedure

1. Notify all affected personnel that the Gateway will be taken offline for maintenance.
2. Identify all energy sources supplying the Gateway:
   - Primary power supply: [TBD] V DC input via power cable.
   - Internal backup battery: [TBD] V / [TBD] Ah.
3. Disconnect the primary DC power cable from the Gateway power input connector.
4. If the Gateway is powered by a PoE (Power over Ethernet) source, disconnect the Ethernet cable at the PoE injector or switch and apply a lockout tag.
5. Wait a minimum of [TBD] seconds for internal capacitors to discharge.
6. Verify zero-energy state by confirming that all LED indicators on the Gateway are OFF.
7. Apply a lockout tag to the disconnected power cable or PoE port with the following information:
   - Technician name
   - Date and time of lockout
   - Reason for lockout
   - Expected duration
8. Retain the lockout key or tag on your person for the duration of the maintenance activity.

> **WARNING:** Do not rely solely on software power-down commands. Physically disconnect all power sources and verify zero-energy state before servicing.

### 1.4 ESD Precautions

- Always wear a grounded ESD wrist strap when the enclosure is open.
- Place removed electronic components on an ESD-safe mat.
- Do not touch connector pins, circuit board traces, or IC packages directly.
- Store replacement parts in ESD-safe packaging until immediately before installation.

### 1.5 Tools Required for Maintenance

| Tool | Specification | Use |
|---|---|---|
| Torx screwdriver | T[TBD] | Enclosure screws |
| Phillips screwdriver | #[TBD] | Mounting bracket screws |
| Torque wrench | Range [TBD] - [TBD] Nm | Antenna connector, mounting bolts |
| SIM card ejection tool | Standard | SIM card tray |
| Multimeter | CAT III rated | Voltage verification |
| ESD wrist strap | Grounded | Static protection |
| Isopropyl alcohol (IPA) | 99% purity | Cleaning |
| Lint-free cloths | Non-abrasive | Cleaning |
| Silicone-based sealant | [TBD] (manufacturer-approved) | Re-sealing enclosure |
| Cable ties | UV-resistant, [TBD] mm width | Cable management |

---

## 2. Maintenance Intervals and Inspection Points

### 2.1 Interval Summary

| Interval | Frequency | Scope |
|---|---|---|
| Routine Inspection | Every [TBD] months | Visual inspection, LED status check, connectivity verification |
| Preventive Maintenance | Every [TBD] months | Full inspection, cleaning, seal check, firmware review |
| Major Service | Every [TBD] months | Complete inspection, seal replacement, hardware torque check, battery assessment |
| End-of-Life Review | Every [TBD] years | Full unit assessment for replacement planning |

### 2.2 Routine Inspection (Every [TBD] Months)

Perform the following checks without opening the enclosure or disconnecting power.

| # | Inspection Point | Method | Accept Criteria | Action if Fail |
|---|---|---|---|---|
| R-01 | Enclosure physical condition | Visual | No cracks, dents, discoloration, or deformation | Report damage; schedule replacement if IP rating compromised |
| R-02 | Mounting stability | Manual check (gentle push test) | No movement, looseness, or vibration | Tighten mounting hardware to [TBD] Nm |
| R-03 | Antenna condition | Visual | Antenna upright, no bending, no corrosion at base connector | Replace antenna (see Section 4.1) |
| R-04 | Cable entry points | Visual | No cable damage, no exposed conductors, glands tight | Repair or replace cable gland; re-seal |
| R-05 | LED status indicators | Visual | Power LED: solid [TBD]; Network LED: solid/blinking [TBD] | Refer to WC-GW-TG-v1.0 |
| R-06 | Network connectivity | Remote dashboard or ping test | Gateway reporting to cloud within last [TBD] minutes | Refer to WC-GW-TG-v1.0 |
| R-07 | Surrounding environment | Visual | No obstructions within [TBD] cm of antenna; no water pooling at base | Clear obstructions; improve drainage |

[IMAGE: Routine inspection points diagram showing exterior check locations on the WakeCap Gateway]

### 2.3 Preventive Maintenance (Every [TBD] Months)

Perform all Routine Inspection items plus the following. Requires enclosure to be opened.

> **WARNING:** Complete the LOTO procedure (Section 1.3) before opening the enclosure.

| # | Inspection Point | Method | Accept Criteria | Action if Fail |
|---|---|---|---|---|
| P-01 | Enclosure seal / gasket | Visual and tactile | Gasket intact, pliable, seated in groove, no compression set | Replace seal (see Section 4.3) |
| P-02 | Internal moisture or condensation | Visual | No visible moisture, corrosion, or water stains on PCB | Dry unit, identify ingress path, replace seals |
| P-03 | Internal connector seating | Visual and gentle push | All internal connectors fully seated, locking tabs engaged | Re-seat connector; replace if damaged |
| P-04 | Power cable and terminals | Visual and multimeter | No fraying, no corrosion on terminals; voltage within [TBD] V +/- [TBD]% | Replace power cable (see Section 4.4) |
| P-05 | SIM card seating | Visual | SIM card fully inserted, no corrosion on contacts | Clean contacts or replace SIM (see Section 4.2) |
| P-06 | Antenna connector torque | Torque wrench | [TBD] Nm +/- [TBD] Nm | Re-torque to specification |
| P-07 | Firmware version | Dashboard or CLI | Running version >= v[TBD] | Update firmware (see Section 7) |
| P-08 | Internal backup battery voltage | Multimeter at battery terminals | >= [TBD] V | Schedule battery replacement |
| P-09 | Exterior cleaning | Procedure in Section 3 | Enclosure free of debris, salt deposits, biological growth | Clean per Section 3 |

[IMAGE: Exploded view of WakeCap Gateway showing internal inspection points P-01 through P-08]

### 2.4 Major Service (Every [TBD] Months)

Perform all Preventive Maintenance items plus the following.

| # | Inspection Point | Method | Accept Criteria | Action if Fail |
|---|---|---|---|---|
| M-01 | Enclosure seal replacement | Replacement | New seal installed regardless of condition | Mandatory replacement at this interval |
| M-02 | Mounting hardware torque | Torque wrench on all mounting bolts | All bolts at [TBD] Nm +/- [TBD] Nm | Replace corroded or stripped bolts (see Section 4.5) |
| M-03 | Antenna base corrosion | Visual (magnified if necessary) | No oxidation or pitting on antenna connector threads | Replace antenna and/or connector (see Section 4.1) |
| M-04 | Cable gland integrity | Torque check and visual | Glands at [TBD] Nm; no cracking of gland body | Replace cable gland |
| M-05 | Grounding continuity | Multimeter (resistance) | Ground path resistance <= [TBD] Ohm | Repair ground connection |
| M-06 | Full functional test | Post-maintenance verification (Section 6) | All checks pass | Address individual failures per troubleshooting guide |

### 2.5 End-of-Life Review (Every [TBD] Years)

| # | Assessment Item | Criteria |
|---|---|---|
| E-01 | Enclosure UV degradation | No chalking, brittleness, or structural weakness |
| E-02 | Overall uptime history | >= [TBD]% uptime over review period |
| E-03 | Repair frequency | No more than [TBD] unscheduled repairs in review period |
| E-04 | Backup battery capacity | Holds charge for >= [TBD] hours under load |
| E-05 | Hardware revision currency | Hardware revision still supported by current firmware |

If any End-of-Life criterion fails, schedule the unit for replacement and order a new Gateway (product code GW, part number [TBD]).

---

## 3. Cleaning, Sealing, Corrosion, and Environmental Guidance

### 3.1 Exterior Cleaning Procedure

> **CAUTION:** Do not use high-pressure water jets, abrasive cleaners, or solvents other than those specified below. Doing so may damage the enclosure finish or compromise the IP[TBD] rating.

**Frequency:** Every [TBD] months, or as needed based on site conditions.

**Materials:**

| Material | Specification |
|---|---|
| Cleaning solution | Mild detergent diluted in water (pH [TBD] - [TBD]) |
| Cloth | Lint-free, non-abrasive |
| Rinse | Clean fresh water |
| Drying | Lint-free cloth or compressed air (max [TBD] psi / [TBD] kPa) |

**Steps:**

1. Ensure the enclosure is closed and all cable glands are secure.
2. Dampen a lint-free cloth with the diluted detergent solution.
3. Wipe all exterior surfaces of the enclosure, removing dirt, dust, salt deposits, and biological growth (algae, lichen).
4. Pay particular attention to:
   - Cable entry glands and sealing surfaces.
   - Mounting bracket contact points.
   - Antenna base and connector area.
   - Ventilation openings (if present).
5. Rinse with clean fresh water applied via a damp cloth (do not pour or spray directly).
6. Dry thoroughly with a clean lint-free cloth.
7. Inspect for any damage revealed after cleaning (paint peeling, cracks, corrosion).

### 3.2 Interior Cleaning Procedure

> **WARNING:** Complete the LOTO procedure (Section 1.3) before opening the enclosure.

> **CAUTION:** Use only 99% isopropyl alcohol (IPA) for cleaning internal components. Do not use water inside the enclosure.

**Steps:**

1. Open the enclosure per the procedure described in Section 4.3, Step 1.
2. Inspect for moisture, debris, or biological contamination.
3. If moisture is present, gently blot with a lint-free cloth. Do not rub PCB surfaces.
4. Clean connector contacts and SIM card contacts using a lint-free cloth lightly dampened with IPA.
5. Remove any debris (insects, dust, fibrous material) with compressed air at max [TBD] psi / [TBD] kPa, directed away from connectors.
6. Allow all IPA-cleaned surfaces to air-dry for a minimum of [TBD] minutes before reassembly.

### 3.3 Sealing and Ingress Protection

The WakeCap Gateway enclosure is rated IP[TBD] when all seals, glands, and closures are correctly installed.

**Seal Inspection Criteria:**

| Criterion | Accept | Reject |
|---|---|---|
| Gasket elasticity | Returns to shape when pressed | Permanent deformation (compression set) |
| Surface condition | Smooth, no cracks, no tears | Cracked, torn, or flattened |
| Seated position | Fully seated in groove, no gaps | Partially dislodged, pinched, or extruding |
| Contamination | Clean, free of debris | Debris embedded in sealing surface |

**Re-sealing after enclosure opening:**

1. Clean the gasket groove and mating surface with IPA.
2. Inspect the gasket. Replace if any reject criterion is met (see Section 4.3).
3. Seat the gasket fully into the groove, ensuring no twists or kinks.
4. Apply a thin, continuous bead of manufacturer-approved silicone sealant ([TBD]) to the gasket surface if specified for the hardware revision.
5. Close the enclosure and tighten screws in a star pattern to [TBD] Nm.
6. Allow sealant to cure for [TBD] hours before exposing the unit to rain or wash-down.

### 3.4 Corrosion Prevention

| Component | Material | Corrosion Risk | Prevention Measure |
|---|---|---|---|
| Enclosure body | [TBD] | [TBD] | Inspect for paint/coating damage; touch up with [TBD] paint (part number [TBD]) |
| Mounting bolts | [TBD] | Galvanic corrosion if dissimilar metals | Use only WakeCap-supplied stainless steel hardware; apply anti-seize compound [TBD] |
| Antenna connector | [TBD] | Oxidation from moisture exposure | Apply dielectric grease [TBD] to threads during reassembly |
| Cable glands | [TBD] | UV degradation, cracking | Replace if cracked; use UV-rated replacements only |
| PCB / internal connectors | [TBD] | Condensation-induced corrosion | Maintain seal integrity; use desiccant pack (part [TBD]) inside enclosure |

### 3.5 Environmental Operating and Storage Conditions

| Parameter | Operating Range | Storage Range |
|---|---|---|
| Temperature | [TBD] C to [TBD] C | [TBD] C to [TBD] C |
| Relative humidity | [TBD]% to [TBD]% (non-condensing) | [TBD]% to [TBD]% (non-condensing) |
| Altitude | Up to [TBD] m above sea level | Up to [TBD] m above sea level |
| Wind resistance (mounted) | Up to [TBD] km/h | N/A |
| IP rating | IP[TBD] (with all seals intact) | N/A |
| UV exposure | Rated for continuous outdoor exposure | Store in shaded, dry location |
| Salt spray resistance | [TBD] hours per IEC 60068-2-52 | N/A |

> **CAUTION:** Operating the Gateway outside the specified environmental range may cause premature component failure and void the warranty.

---

## 4. Replacement Procedures

> **WARNING:** Before beginning any replacement procedure, complete the LOTO procedure described in Section 1.3. Verify zero-energy state before proceeding.

[IMAGE: Exploded view of WakeCap Gateway showing all replaceable modules and their locations]

### 4.1 Antenna Replacement

**Part Number:** [TBD]
**Compatible Hardware Revisions:** Rev [TBD] and later
**Estimated Time:** [TBD] minutes
**Tools Required:** Torque wrench (set to [TBD] Nm), dielectric grease

**When to Replace:**

- Antenna is physically bent, cracked, or broken.
- Antenna connector shows corrosion or pitting that cannot be cleaned.
- Signal strength has degraded below [TBD] dBm despite other troubleshooting (see WC-GW-TG-v1.0).

[IMAGE: Photo of WakeCap Gateway antenna module showing connector type and orientation]

**Procedure:**

> **CAUTION:** Do not over-torque the antenna connector. Exceeding [TBD] Nm may damage the bulkhead connector on the enclosure.

1. Complete the LOTO procedure (Section 1.3). Verify all LEDs are OFF.
2. If the antenna is externally mounted, unscrew the antenna by rotating counterclockwise by hand until finger-tight resistance is released, then continue to unthread.
3. If the antenna connector is seized, apply a small amount of penetrating lubricant to the connector threads. Wait [TBD] minutes before attempting removal again. Do not use pliers on the connector body.
4. Inspect the bulkhead connector on the enclosure:
   - Check for damaged threads, bent center pin, or corrosion.
   - Clean threads with IPA and a lint-free cloth.
   - If the bulkhead connector is damaged, escalate to Level [TBD] support. Do not attempt field replacement of the bulkhead connector.
5. Apply a thin coat of dielectric grease to the threads of the new antenna connector.
6. Thread the new antenna onto the bulkhead connector by hand, rotating clockwise until finger-tight.
7. Using a torque wrench, tighten to [TBD] Nm. Do not exceed [TBD] Nm.
8. Verify the antenna is upright and oriented per the installation guide (WC-GW-IG-v1.0).

**Verification:**

- [ ] Antenna is mechanically secure (no wobble).
- [ ] Antenna connector torqued to [TBD] Nm.
- [ ] After power restoration, signal strength reads >= [TBD] dBm on dashboard.

---

### 4.2 SIM Card Replacement

**Part Number:** Carrier-supplied, form factor [TBD] (Nano / Micro / Mini)
**Compatible Hardware Revisions:** Rev [TBD] and later
**Estimated Time:** [TBD] minutes
**Tools Required:** SIM card ejection tool, ESD wrist strap, lint-free cloth, IPA

**When to Replace:**

- SIM card is deactivated or expired by the carrier.
- SIM card contacts show visible corrosion that cannot be cleaned.
- Network registration failure persists after troubleshooting (see WC-GW-TG-v1.0).
- Carrier migration requires a new SIM.

[IMAGE: Photo showing SIM card tray location inside the WakeCap Gateway enclosure]

**Procedure:**

> **CAUTION:** Handle the SIM card by its edges only. Do not touch the gold contacts. Wear an ESD wrist strap.

1. Complete the LOTO procedure (Section 1.3). Verify all LEDs are OFF.
2. Open the enclosure:
   a. Remove the [TBD] enclosure screws using a T[TBD] Torx screwdriver.
   b. Carefully lift the enclosure lid. Note the gasket position.
   c. Set the lid aside on a clean, ESD-safe surface.
3. Locate the SIM card slot on the main PCB (position marked "SIM1" on the silkscreen, location [TBD]).
4. Using the SIM card ejection tool, press the SIM card inward until the spring mechanism releases and the card partially ejects.
5. Remove the old SIM card.
6. Clean the SIM card slot contacts with a lint-free cloth dampened with IPA. Allow to dry for [TBD] minutes.
7. Verify the new SIM card is the correct form factor ([TBD]) and has been activated by the carrier.
8. Insert the new SIM card into the slot with the gold contacts facing [TBD] (toward/away from PCB) and the notched corner oriented [TBD]. Push until the spring mechanism clicks and holds the card in place.
9. Re-seal and close the enclosure per Section 3.3.

**Verification:**

- [ ] SIM card is seated and retained by the spring mechanism.
- [ ] Enclosure re-sealed and screws torqued to [TBD] Nm.
- [ ] After power restoration, Network LED shows [TBD] (registered) within [TBD] minutes.
- [ ] Dashboard confirms Gateway is online and reporting.

---

### 4.3 Enclosure Seal Replacement

**Part Number:** [TBD]
**Compatible Hardware Revisions:** Rev [TBD] and later
**Estimated Time:** [TBD] minutes
**Tools Required:** T[TBD] Torx screwdriver, torque wrench, IPA, lint-free cloth, silicone sealant [TBD]

**When to Replace:**

- Mandatory replacement at every Major Service interval ([TBD] months).
- Seal fails any criterion in the seal inspection table (Section 3.3).
- Evidence of moisture ingress inside the enclosure.

[IMAGE: Photo of enclosure seal gasket showing correct seating in the groove]

**Procedure:**

> **CAUTION:** Improper seal installation will compromise the IP[TBD] rating and may lead to internal corrosion and unit failure.

1. Complete the LOTO procedure (Section 1.3). Verify all LEDs are OFF.
2. Open the enclosure:
   a. Remove the [TBD] enclosure screws using a T[TBD] Torx screwdriver, following a star pattern.
   b. Carefully lift the enclosure lid straight up. Do not pry or lever, as this may damage the sealing surface.
   c. Set the lid aside on a clean surface.
3. Remove the old gasket:
   a. Carefully lift the gasket out of the groove. Note the gasket cross-section profile and orientation.
   b. If the gasket is bonded with sealant, gently separate using a plastic spudger. Do not use metal tools on the sealing surface.
4. Clean the gasket groove and the mating surface on the lid:
   a. Remove all old sealant residue using IPA and a lint-free cloth.
   b. Inspect both surfaces for scratches, gouges, or corrosion. If either surface is damaged to the point that a seal cannot be maintained, escalate for enclosure replacement.
5. Install the new gasket:
   a. Verify the replacement gasket part number matches [TBD].
   b. Starting at one corner, press the gasket into the groove, working around the perimeter.
   c. Ensure the gasket is fully seated with no twists, kinks, overlaps, or gaps at the joint.
   d. If specified for the hardware revision, apply a thin, continuous bead of silicone sealant ([TBD]) on top of the seated gasket.
6. Close the enclosure:
   a. Align the lid with the base. Lower straight down onto the gasket.
   b. Insert all [TBD] screws finger-tight.
   c. Tighten screws in a star pattern to [TBD] Nm using a torque wrench.
7. If sealant was applied, allow [TBD] hours cure time before exposing the unit to moisture.

**Verification:**

- [ ] Gasket is fully seated with no visible gaps.
- [ ] All enclosure screws torqued to [TBD] Nm in star pattern.
- [ ] Sealant cure time observed (if applicable).
- [ ] Enclosure lid sits flush with no visible gap between lid and base.

---

### 4.4 Power Cable Replacement

**Part Number:** [TBD]
**Compatible Hardware Revisions:** Rev [TBD] and later
**Estimated Time:** [TBD] minutes
**Tools Required:** T[TBD] Torx screwdriver, torque wrench, wire stripper (if terminating), multimeter, cable gland wrench [TBD] mm

**When to Replace:**

- Cable jacket is cracked, cut, or UV-degraded.
- Conductor is frayed or exposed.
- Terminal shows corrosion that cannot be cleaned.
- Voltage drop across the cable exceeds [TBD] V under load.

[IMAGE: Photo of WakeCap Gateway power cable showing connector type, cable gland, and termination]

**Procedure:**

> **DANGER:** Verify zero-energy state with a multimeter at the cable terminals before handling. Even after LOTO, confirm no voltage is present.

1. Complete the LOTO procedure (Section 1.3). Verify all LEDs are OFF.
2. Measure voltage at the power cable terminals with a multimeter. Confirm 0 V DC.
3. Open the enclosure per Section 4.3, Steps 2a-2c.
4. Disconnect the internal power connector from the PCB:
   a. If the connector has a locking tab, depress the tab and pull the connector straight out. Do not pull on the wires.
   b. Note the connector orientation and pin assignment:
      - Pin 1: [TBD] (positive / negative)
      - Pin 2: [TBD] (positive / negative)
      - Pin 3 (if present): [TBD] (ground / NC)
5. Loosen the cable gland nut (counterclockwise) and slide the cable out through the gland.
6. Remove the old cable from the enclosure.
7. Prepare the new cable:
   a. If the cable is pre-terminated, verify the connector type matches [TBD].
   b. If field termination is required, strip [TBD] mm of jacket and [TBD] mm of conductor insulation. Crimp terminals per manufacturer specification.
8. Route the new cable through the cable gland. Ensure the gland sealing insert grips the cable jacket, not the conductor insulation.
9. Tighten the cable gland to [TBD] Nm. The cable should not rotate or slide in the gland when moderate force is applied.
10. Connect the internal power connector to the PCB, matching the pin orientation noted in Step 4b.
11. Verify the connection is seated and the locking tab (if present) is engaged.
12. Re-seal and close the enclosure per Section 3.3.

**Verification:**

- [ ] Cable gland tight; cable does not move when pulled with moderate force.
- [ ] Internal connector fully seated with locking tab engaged.
- [ ] After power restoration, measure voltage at PCB power connector: [TBD] V DC +/- [TBD]%.
- [ ] Power LED illuminates [TBD] within [TBD] seconds.
- [ ] No voltage on exposed cable gland or enclosure body (ground fault check).

---

### 4.5 Mounting Hardware Replacement

**Part Number:** [TBD] (mounting kit)
**Compatible Hardware Revisions:** Rev [TBD] and later
**Estimated Time:** [TBD] minutes
**Tools Required:** Phillips screwdriver #[TBD], torque wrench, socket [TBD] mm, anti-seize compound, thread locker [TBD]

**When to Replace:**

- Bolts are corroded, stripped, or stretched.
- Mounting bracket is bent or cracked.
- Routine inspection reveals movement or instability (R-02).
- Major Service interval reached (M-02) and hardware does not meet torque specification.

[IMAGE: Exploded view of WakeCap Gateway mounting bracket assembly showing bolt positions and orientation]

**Procedure:**

> **WARNING:** If the Gateway is mounted at height, ensure fall protection measures are in place. Use a secondary retention strap to secure the Gateway enclosure during bracket work to prevent the unit from falling.

1. Complete the LOTO procedure (Section 1.3). Verify all LEDs are OFF.
2. Attach a secondary retention strap (tether) from the Gateway enclosure to the mounting structure.
3. Note the current mounting orientation (photograph recommended for reference).
4. If replacing only bolts:
   a. Remove bolts one at a time, starting from the least loaded position.
   b. Clean the bolt hole and mounting surface with a wire brush or IPA.
   c. Apply anti-seize compound to the new bolt threads.
   d. Apply thread locker [TBD] to the first [TBD] threads.
   e. Insert and tighten each bolt to [TBD] Nm before moving to the next.
5. If replacing the entire mounting bracket:
   a. Support the Gateway enclosure with a secondary means (tether or assistant).
   b. Remove all [TBD] mounting bolts.
   c. Remove the old bracket.
   d. Verify the mounting surface (pole, wall, rail) is structurally sound and free of corrosion.
   e. Position the new bracket per the installation guide (WC-GW-IG-v1.0), matching the original orientation.
   f. Insert all bolts finger-tight.
   g. Apply anti-seize compound and thread locker as described in Step 4c-4d.
   h. Tighten all bolts in a star pattern to [TBD] Nm.
6. Remove the secondary retention strap.
7. Perform a stability check: apply [TBD] N of lateral force to the enclosure and verify no movement.

**Verification:**

- [ ] All mounting bolts torqued to [TBD] Nm.
- [ ] Gateway orientation matches installation specification (WC-GW-IG-v1.0).
- [ ] Stability check passed (no movement under [TBD] N lateral force).
- [ ] Secondary retention strap removed.
- [ ] Anti-seize and thread locker applied to all bolt threads.

---

## 5. Spare Parts List

### 5.1 Replaceable Parts

| # | Description | WakeCap Part Number | Quantity per Unit | Compatible HW Revisions | Notes |
|---|---|---|---|---|---|
| SP-01 | External antenna assembly | [TBD] | 1 | Rev [TBD]+ | Includes connector |
| SP-02 | Enclosure gasket / seal | [TBD] | 1 | Rev [TBD]+ | Replace at every Major Service |
| SP-03 | Power cable assembly (pre-terminated) | [TBD] | 1 | Rev [TBD]+ | Length: [TBD] m |
| SP-04 | Mounting bracket kit (bracket + bolts) | [TBD] | 1 | Rev [TBD]+ | Includes [TBD] bolts, [TBD] washers |
| SP-05 | Mounting bolt set (bolts only) | [TBD] | [TBD] | Rev [TBD]+ | M[TBD] x [TBD] mm, stainless steel |
| SP-06 | Cable gland | [TBD] | [TBD] | Rev [TBD]+ | Thread: M[TBD], cable range [TBD]-[TBD] mm |
| SP-07 | Internal backup battery | [TBD] | 1 | Rev [TBD]+ | [TBD] V / [TBD] Ah; contact support for replacement procedure |
| SP-08 | Desiccant pack | [TBD] | [TBD] | All | Replace each time enclosure is opened |
| SP-09 | SIM card tray / holder | [TBD] | 1 | Rev [TBD]+ | Replacement if spring mechanism fails |

### 5.2 Consumables

| # | Description | Specification | WakeCap Part Number or Source |
|---|---|---|---|
| CO-01 | Dielectric grease | [TBD] | [TBD] |
| CO-02 | Silicone sealant | [TBD] | [TBD] |
| CO-03 | Anti-seize compound | [TBD] | [TBD] |
| CO-04 | Thread locker | [TBD] (medium strength) | [TBD] |
| CO-05 | Isopropyl alcohol (IPA) | 99% purity | Standard laboratory supply |
| CO-06 | Lint-free cloths | Non-abrasive | Standard laboratory supply |
| CO-07 | UV-resistant cable ties | [TBD] mm width, [TBD] kg tensile | [TBD] |
| CO-08 | Touch-up paint | [TBD] color, [TBD] type | [TBD] |

### 5.3 Recommended Spares Inventory (Per 10 Deployed Units)

| Part | Recommended Stock Quantity |
|---|---|
| SP-01 External antenna | [TBD] |
| SP-02 Enclosure gasket | [TBD] |
| SP-03 Power cable assembly | [TBD] |
| SP-04 Mounting bracket kit | [TBD] |
| SP-05 Mounting bolt set | [TBD] |
| SP-06 Cable gland | [TBD] |
| SP-08 Desiccant pack | [TBD] |

---

## 6. Post-Maintenance Verification Checklist

Complete this checklist after every maintenance activity before returning the Gateway to service.

### 6.1 Mechanical Verification

| # | Check | Method | Pass Criteria | Result |
|---|---|---|---|---|
| V-01 | Enclosure screws torqued | Torque wrench | All [TBD] screws at [TBD] Nm | [ ] Pass / [ ] Fail |
| V-02 | Enclosure seal visible gap | Visual | No gap between lid and base around full perimeter | [ ] Pass / [ ] Fail |
| V-03 | Cable gland torqued | Torque wrench | [TBD] Nm; cable does not slide | [ ] Pass / [ ] Fail |
| V-04 | Antenna torqued | Torque wrench | [TBD] Nm; no wobble | [ ] Pass / [ ] Fail |
| V-05 | Mounting hardware torqued | Torque wrench | All bolts at [TBD] Nm | [ ] Pass / [ ] Fail |
| V-06 | No foreign objects inside enclosure | Visual (before closing) | Enclosure interior clear of tools, debris, cut wire | [ ] Pass / [ ] Fail |
| V-07 | Desiccant pack installed | Visual (before closing) | New desiccant pack present inside enclosure | [ ] Pass / [ ] Fail |

### 6.2 Electrical Verification

> **WARNING:** Re-energize the unit only after all mechanical verification checks pass and the enclosure is fully sealed.

| # | Check | Method | Pass Criteria | Result |
|---|---|---|---|---|
| V-08 | Supply voltage at Gateway input | Multimeter | [TBD] V DC +/- [TBD]% | [ ] Pass / [ ] Fail |
| V-09 | Power LED status | Visual | Solid [TBD] within [TBD] seconds of power-on | [ ] Pass / [ ] Fail |
| V-10 | Network LED status | Visual | [TBD] (registered) within [TBD] minutes | [ ] Pass / [ ] Fail |
| V-11 | Ground fault check | Multimeter (enclosure to ground) | < [TBD] V AC/DC on enclosure body | [ ] Pass / [ ] Fail |

### 6.3 Functional Verification

| # | Check | Method | Pass Criteria | Result |
|---|---|---|---|---|
| V-12 | Cloud connectivity | Dashboard | Gateway reports online within [TBD] minutes | [ ] Pass / [ ] Fail |
| V-13 | Signal strength | Dashboard | >= [TBD] dBm | [ ] Pass / [ ] Fail |
| V-14 | Data transmission | Dashboard | At least [TBD] data packet(s) received within [TBD] minutes | [ ] Pass / [ ] Fail |
| V-15 | Firmware version confirmed | Dashboard or CLI | v[TBD] or later | [ ] Pass / [ ] Fail |
| V-16 | Time synchronization | Dashboard or CLI | Gateway clock within +/- [TBD] seconds of NTP reference | [ ] Pass / [ ] Fail |

### 6.4 Final Steps

1. Record all verification results in the Maintenance Log (Section 8).
2. Remove all LOTO devices and tags.
3. Notify all affected personnel that the Gateway is returned to service.
4. Update the asset management system with the maintenance performed, parts replaced, and next scheduled maintenance date.

> **NOTICE:** If any verification check fails, do not return the unit to service. Refer to the Troubleshooting Guide (WC-GW-TG-v1.0) for diagnostic steps.

---

## 7. Firmware Update Procedure

### 7.1 Pre-Update Requirements

| Requirement | Detail |
|---|---|
| Current firmware version | Confirm via dashboard or CLI command: `[TBD]` |
| Target firmware version | v[TBD] (obtain from WakeCap support portal or authorized distributor) |
| Firmware file format | [TBD] (e.g., .bin, .hex, .fw) |
| Firmware file integrity | Verify SHA-256 checksum matches value published in release notes |
| Update method | [TBD] (OTA via cloud / USB / serial console / SD card) |
| Power stability | Ensure uninterrupted power for the duration of the update ([TBD] minutes estimated). If the site has unstable power, connect a UPS rated at [TBD] W / [TBD] VA |
| Backup | Export current Gateway configuration from dashboard: [TBD] |

> **CAUTION:** Do not interrupt the firmware update process. Power loss or disconnection during the update may render the Gateway inoperable (bricked), requiring factory recovery.

### 7.2 Over-the-Air (OTA) Update Procedure

1. Log in to the WakeCap cloud dashboard at [TBD].
2. Navigate to **Devices > Gateways > [Target Gateway] > Firmware**.
3. Confirm the currently reported firmware version.
4. If a new firmware version is available, it will be listed under **Available Updates**.
5. Review the release notes for the target version. Note any pre-requisites, breaking changes, or required configuration steps.
6. Click **Update to v[TBD]**.
7. The dashboard will display a progress indicator. Estimated duration: [TBD] minutes.
8. Do not close the browser window or power cycle the Gateway during the update.
9. Upon completion, the Gateway will automatically restart. The dashboard status will show "Online" and the firmware version will reflect the new version within [TBD] minutes.

### 7.3 Local Update Procedure (USB / Serial / SD Card)

> **NOTICE:** Use this procedure only when OTA update is not available (e.g., no network connectivity).

1. Download the firmware file from the WakeCap support portal: [TBD].
2. Verify the SHA-256 checksum:
   ```
   sha256sum [firmware_filename]
   ```
   Expected checksum: [TBD] (per release notes).
3. Copy the firmware file to a [TBD] (USB drive / SD card) formatted as [TBD] (FAT32 / exFAT).
4. Complete the LOTO procedure (Section 1.3).
5. Open the enclosure per Section 4.3, Steps 2a-2c.
6. Insert the [TBD] (USB drive / SD card) into the [TBD] port on the Gateway PCB.
7. Close the enclosure and restore power.
8. The Gateway will detect the firmware file and begin the update automatically. The [TBD] LED will blink [TBD] to indicate update in progress.
9. Wait for the update to complete. Estimated duration: [TBD] minutes. The [TBD] LED will turn solid [TBD] when complete.

> **CAUTION:** Do not remove the USB drive / SD card or power cycle the Gateway while the [TBD] LED is blinking.

10. After the update completes, power down the Gateway (LOTO procedure).
11. Open the enclosure and remove the [TBD] (USB drive / SD card).
12. Re-seal and close the enclosure per Section 3.3.
13. Restore power and verify per Section 6.

### 7.4 Firmware Rollback

If the updated firmware causes issues:

1. Contact WakeCap support at [TBD] to obtain the rollback firmware file.
2. Follow the Local Update Procedure (Section 7.3) using the rollback firmware file.
3. After rollback, verify the Gateway functionality per Section 6.
4. Report the firmware issue to WakeCap support with the following information:
   - Gateway serial number: [TBD] (printed on enclosure label)
   - Previous firmware version
   - Target firmware version (that caused the issue)
   - Description of the observed issue
   - Maintenance log excerpt

### 7.5 Post-Update Verification

| # | Check | Pass Criteria |
|---|---|---|
| FW-01 | Firmware version on dashboard | Matches target version v[TBD] |
| FW-02 | Gateway online status | Reports online within [TBD] minutes |
| FW-03 | Configuration integrity | All settings match pre-update backup |
| FW-04 | Data transmission | At least [TBD] data packet(s) received within [TBD] minutes |
| FW-05 | Connected device count | Matches expected count within [TBD] minutes |

---

## 8. Maintenance Log Template

Use this template to record all maintenance activities performed on the WakeCap Gateway. Maintain one log per Gateway unit. Store completed logs per your organization's records retention policy.

### 8.1 Unit Identification

| Field | Value |
|---|---|
| Gateway Serial Number | |
| WakeCap Asset ID | |
| Hardware Revision | |
| Site / Location | |
| Installation Date | |
| Warranty Expiration Date | |

### 8.2 Maintenance Record

Copy and complete the following block for each maintenance event.

---

**Maintenance Entry**

| Field | Value |
|---|---|
| Date | YYYY-MM-DD |
| Time (start) | HH:MM |
| Time (end) | HH:MM |
| Technician Name | |
| Technician ID / Badge | |
| Maintenance Type | [ ] Routine Inspection / [ ] Preventive Maintenance / [ ] Major Service / [ ] Corrective (Unscheduled) / [ ] Firmware Update |
| Trigger | [ ] Scheduled interval / [ ] Fault reported / [ ] Support ticket #______ |

**Pre-Maintenance Status:**

| Parameter | Value |
|---|---|
| Firmware Version | |
| Power LED Status | |
| Network LED Status | |
| Signal Strength (dBm) | |
| Last Cloud Report (timestamp) | |
| Reported Issue (if corrective) | |

**Work Performed:**

| # | Action Taken | Parts Replaced (Part #) | Torque / Setting Verified |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |

**Post-Maintenance Verification (Section 6):**

| Check ID | Result (Pass/Fail) | Notes |
|---|---|---|
| V-01 | | |
| V-02 | | |
| V-03 | | |
| V-04 | | |
| V-05 | | |
| V-06 | | |
| V-07 | | |
| V-08 | | |
| V-09 | | |
| V-10 | | |
| V-11 | | |
| V-12 | | |
| V-13 | | |
| V-14 | | |
| V-15 | | |
| V-16 | | |

**Post-Maintenance Status:**

| Parameter | Value |
|---|---|
| Firmware Version | |
| Power LED Status | |
| Network LED Status | |
| Signal Strength (dBm) | |
| Cloud Report Confirmed (timestamp) | |

**Next Scheduled Maintenance:**

| Field | Value |
|---|---|
| Maintenance Type | |
| Due Date | YYYY-MM-DD |

**Technician Sign-Off:**

| | |
|---|---|
| Technician Signature | _________________________ |
| Date | YYYY-MM-DD |
| Supervisor Signature (if required) | _________________________ |
| Date | YYYY-MM-DD |

---

*End of Document*

**Document ID:** WC-GW-MG-v1.0 | **Version:** 1.0 | **Date:** 2026-02-09

Copyright [TBD] WakeCap Technologies. All rights reserved. This document contains proprietary information. Unauthorized reproduction or distribution is prohibited.

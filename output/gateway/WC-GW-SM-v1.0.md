# WakeCap Gateway

## Safety Manual

---

| Field | Value |
|-------|-------|
| **Document ID** | WC-GW-SM-v1.0 |
| **Version** | 1.0 |
| **Date** | 2026-02-09 |
| **Product** | WakeCap Gateway |
| **Product Code** | GW |
| **Document Type** | Safety Manual (SM) |
| **Classification** | Technical / Field |
| **HW Compatibility** | [TBD] |
| **FW Compatibility** | [TBD] |
| **Author** | [TBD] |
| **Approved By** | [TBD] |

---

## Revision History

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | 2026-02-09 | [TBD] | Initial release |

---

## Table of Contents

1. [Scope and Intended Use](#1-scope-and-intended-use)
2. [Safe-Use Conditions and Operating Limits](#2-safe-use-conditions-and-operating-limits)
3. [Foreseeable Misuse Scenarios](#3-foreseeable-misuse-scenarios)
4. [Hazard Identification and Risk Assessment](#4-hazard-identification-and-risk-assessment)
5. [Electrical Safety](#5-electrical-safety)
6. [RF Exposure Safety](#6-rf-exposure-safety)
7. [Environmental Safety](#7-environmental-safety)
8. [Installation Safety](#8-installation-safety)
9. [Maintenance Safety](#9-maintenance-safety)
10. [Emergency Procedures](#10-emergency-procedures)
11. [Safety Symbols and Signal Words Reference](#11-safety-symbols-and-signal-words-reference)
12. [Related Documents](#12-related-documents)

---

> **WARNING**
>
> **READ THIS ENTIRE SAFETY MANUAL BEFORE INSTALLING, OPERATING, OR SERVICING THE WAKECAP GATEWAY.** Failure to follow the safety instructions in this manual may result in equipment damage, fire, personal injury, or death. Keep this manual accessible to all personnel who install, operate, or maintain the Gateway.

---

## 1. Scope and Intended Use

### 1.1 Scope

This Safety Manual defines the safe-use conditions, hazard controls, and safety procedures for the WakeCap Gateway. It applies to all models and hardware revisions of the Gateway, including:

| Model | Description |
|-------|-------------|
| [TBD] | Standard Gateway (Ethernet) |
| [TBD] | Cellular Gateway (4G LTE + Ethernet) |
| [TBD] | Solar-Ready Gateway (4G LTE + Ethernet) |

This manual must be read in conjunction with the Installation Guide (WC-GW-IG-v1.0), Product Manual (WC-GW-PM-v1.0), and any site-specific safety documentation.

### 1.2 Intended Use

The WakeCap Gateway is designed and intended for:

- **Application:** Aggregating data from WakeCap field devices (Weather Stations, Smart Hats, Anchors, MODBUS Assets) and transmitting that data to the WakeCap Cloud Platform via cellular or Ethernet uplink.
- **Environment:** Outdoor and indoor installation in construction sites, industrial facilities, and commercial properties.
- **Mounting:** Wall, pole, or DIN-rail mounting at heights up to [TBD] m above ground level.
- **Power:** Operation from a DC power supply within the rated voltage range (see Section 2).
- **Users:** Installation and maintenance by qualified technical personnel. No end-user serviceable parts inside.

### 1.3 Intended Users

| User Category | Permitted Activities | Required Qualifications |
|---------------|---------------------|------------------------|
| Installation technician | Physical installation, wiring, antenna mounting, power connection | DC electrical wiring, working at height (if applicable), site safety orientation |
| Commissioning engineer | Configuration, network setup, testing, validation | Network configuration, WakeCap system training |
| Maintenance technician | Inspection, cleaning, component replacement, firmware updates | DC electrical wiring, ESD awareness |
| Site operator | Status monitoring (LED, dashboard), alert response | WakeCap dashboard training |

### 1.4 Restrictions on Use

The WakeCap Gateway must **NOT** be used:

- In explosive or potentially explosive atmospheres (the Gateway is NOT rated for ATEX/IECEx Zone 0, 1, or 2)
- As a safety-critical control system component (it is a monitoring device only)
- In medical environments or in proximity to life-support equipment
- Submerged in water or exposed to continuous water jets beyond its IP rating
- With power supplies outside the rated voltage range
- With antennas or accessories not approved by WakeCap
- By unqualified personnel for installation or maintenance activities

---

## 2. Safe-Use Conditions and Operating Limits

### 2.1 Electrical Operating Limits

> **WARNING**
>
> Operating the Gateway outside the electrical limits specified below may result in fire, equipment damage, or electrical shock. Verify all power supply parameters before connecting the Gateway.

| Parameter | Symbol | Min | Max | Unit |
|-----------|--------|-----|-----|------|
| Input Voltage | V_IN | [TBD] | [TBD] | V DC |
| Input Current (max continuous) | I_MAX | — | [TBD] | mA |
| Input Current (peak, transient) | I_PEAK | — | [TBD] | mA |
| Power Consumption (max) | P_MAX | — | [TBD] | W |
| Fuse Rating (external, recommended) | — | — | [TBD] | A |
| Maximum Wire Gauge (power cable) | — | [TBD] | [TBD] | AWG |
| Power Source | — | — | — | SELV / PELV Class 2 DC supply only |

### 2.2 Environmental Operating Limits

| Parameter | Min | Max | Unit |
|-----------|-----|-----|------|
| Operating Temperature | [TBD] | [TBD] | C |
| Storage Temperature | [TBD] | [TBD] | C |
| Operating Humidity | [TBD] | [TBD] | % RH (non-condensing) |
| Operating Altitude | 0 | [TBD] | m above sea level |
| Ingress Protection Rating | — | IP [TBD] | — |
| UV Exposure | — | [TBD] | — |
| Wind Load (with antenna) | — | [TBD] | km/h |
| Vibration (operating) | — | [TBD] | g RMS |
| Shock (non-operating) | — | [TBD] | g |

### 2.3 RF Operating Limits

| Parameter | Value | Unit |
|-----------|-------|------|
| Maximum Transmit Power (mesh radio) | [TBD] | dBm |
| Maximum Transmit Power (cellular) | [TBD] | dBm |
| Maximum Antenna Gain (mesh) | [TBD] | dBi |
| Maximum EIRP (mesh) | [TBD] | dBm |
| Minimum Separation Distance (mesh antenna to persons) | [TBD] | mm |
| Minimum Separation Distance (cellular antenna to persons) | [TBD] | mm |
| Approved Antenna(s) Only | Yes | — |

### 2.4 Mechanical Limits

| Parameter | Value | Unit |
|-----------|-------|------|
| Maximum Mounting Height | [TBD] | m |
| Mounting Surface Load Capacity (minimum) | [TBD] | kg |
| Antenna Connector Torque (maximum) | [TBD] | N m |
| Mounting Bracket Screw Torque | [TBD] | N m |
| U-bolt Nut Torque (pole mount) | [TBD] | N m |
| Maximum Cable Pull Force (Ethernet) | [TBD] | N |
| Minimum Cable Bend Radius (Ethernet) | [TBD] | mm |

---

## 3. Foreseeable Misuse Scenarios

The following misuse scenarios have been identified through risk analysis. The Gateway design includes protections where feasible, but users must take responsibility for preventing these conditions.

| # | Misuse Scenario | Potential Consequence | Severity | Design Mitigation | User Prevention |
|---|-----------------|----------------------|----------|-------------------|-----------------|
| M-01 | Power supply exceeds maximum rated voltage ([TBD] V DC) | Internal component damage, fire risk, smoke | High | Overvoltage protection (OVP) circuit clamps at [TBD] V DC | Verify supply voltage with multimeter before connecting; use approved power supply only |
| M-02 | Reversed polarity on power input | Component damage | Medium | Limited reverse polarity protection diode | Verify polarity markings (V+ / V-) before connecting |
| M-03 | Operation without antenna connected | Radio module damage (output stage overheating) | Medium | [TBD] (software TX disable / hardware detection) | Always connect antenna before powering on |
| M-04 | Use of non-approved antenna with excessive gain | Regulatory violation, excessive RF exposure | Medium | None (antenna is user-installed) | Use only WakeCap-approved antennas |
| M-05 | Installation in explosive atmosphere | Ignition source (electrical arcing, hot surface) | Critical | None (not designed for hazardous areas) | Do not install in ATEX/IECEx classified zones |
| M-06 | Submersion in water beyond IP rating | Water ingress, short circuit, equipment failure | High | IP [TBD] rated enclosure | Do not submerge; install with drip loops; verify enclosure seals |
| M-07 | Opening enclosure without ESD precautions | ESD damage to internal electronics | Low | [TBD] (ESD protection on exposed I/O) | Use ESD wrist strap when accessing internal components |
| M-08 | Hot-swapping SIM card (power on) | SIM or cellular module corruption | Low | [TBD] (software warning / no hardware interlock) | Power off before inserting or removing SIM |
| M-09 | Operating at temperature extremes beyond rating | Component failure, battery swelling (if applicable), data loss | Medium | Thermal shutdown at [TBD] C | Monitor internal temperature via dashboard; install in shaded location if possible |
| M-10 | Using Gateway as structural support (hanging objects from it) | Mechanical failure, falling object hazard | Medium | None | Do not attach additional weight to Gateway or antenna |
| M-11 | Severing power during firmware update | Firmware corruption, device bricked | Medium | Dual-bank firmware with rollback | Do not remove power during OTA update (LED indicates update in progress) |
| M-12 | Accessing live electrical connections without de-energizing | Electrical shock | High | Recessed terminals, labeled warnings | De-energize and verify zero voltage before touching any terminals |

---

## 4. Hazard Identification and Risk Assessment

### 4.1 Risk Assessment Methodology

Risk is assessed using the following matrix, consistent with ISO 12100 and ISO 14971 principles.

**Severity levels:**

| Level | Description | Examples |
|-------|-------------|---------|
| 1 - Negligible | No injury; minor equipment inconvenience | Temporary data loss, LED malfunction |
| 2 - Minor | First-aid injury; minor equipment damage | Small burn, single-component failure |
| 3 - Moderate | Medical treatment required; significant equipment damage | Electrical shock (non-fatal), fire confined to device |
| 4 - Serious | Hospitalization; major equipment/property damage | Serious electrical shock, fire spread |
| 5 - Catastrophic | Fatality or permanent disability | Fatal fall from height, electrocution |

**Probability levels:**

| Level | Description | Frequency |
|-------|-------------|-----------|
| A - Rare | Almost never occurs | < 1 in [TBD] device-years |
| B - Unlikely | Could occur in exceptional circumstances | 1 in [TBD] device-years |
| C - Possible | Might occur at some time | 1 in [TBD] device-years |
| D - Likely | Will probably occur in most circumstances | 1 in [TBD] device-years |
| E - Almost certain | Expected to occur | > 1 in [TBD] device-years |

**Risk matrix:**

| | Negligible (1) | Minor (2) | Moderate (3) | Serious (4) | Catastrophic (5) |
|---|---|---|---|---|---|
| **Almost certain (E)** | Medium | High | High | Critical | Critical |
| **Likely (D)** | Low | Medium | High | Critical | Critical |
| **Possible (C)** | Low | Medium | Medium | High | Critical |
| **Unlikely (B)** | Low | Low | Medium | High | High |
| **Rare (A)** | Low | Low | Low | Medium | High |

### 4.2 Hazard Register

| Hazard ID | Hazard | Cause | Severity | Probability (before controls) | Risk (before) | Controls | Probability (after controls) | Residual Risk |
|-----------|--------|-------|----------|------------------------------|----------------|----------|------------------------------|---------------|
| H-01 | Electrical shock from DC power terminals | Contact with energized conductors during installation/maintenance | 3 - Moderate | C - Possible | Medium | Recessed terminals; safety warnings; LOTO procedure; SELV/PELV supply requirement | B - Unlikely | Medium |
| H-02 | Fire from overvoltage or short circuit | Power supply exceeds rated voltage; internal fault | 4 - Serious | B - Unlikely | High | OVP circuit; external fuse; enclosure material rating [TBD]; warnings on max voltage | A - Rare | Medium |
| H-03 | Fire from reverse polarity (sustained) | Incorrect wiring | 3 - Moderate | C - Possible | Medium | Reverse polarity protection diode; polarity markings; verification procedure | B - Unlikely | Medium |
| H-04 | Fall from height during installation | Inadequate fall protection during elevated mounting | 5 - Catastrophic | B - Unlikely | High | Safety warnings; PPE requirements; qualified installer requirement | A - Rare | High |
| H-05 | RF exposure exceeding limits | Antenna closer than minimum separation distance to persons | 2 - Minor | C - Possible | Medium | Minimum separation distance specification; antenna placement guidance; RF warning label | B - Unlikely | Low |
| H-06 | Environmental damage leading to electrical fault | Water ingress, corrosion, UV degradation | 3 - Moderate | C - Possible | Medium | IP [TBD] rated enclosure; UV-resistant materials; seal inspection schedule | B - Unlikely | Medium |
| H-07 | ESD damage to electronics | Improper handling during enclosure access | 1 - Negligible | D - Likely | Low | ESD warnings; ESD wrist strap requirement | C - Possible | Low |
| H-08 | Structural failure of mounting | Inadequate mounting surface, corrosion, vibration loosening | 4 - Serious | B - Unlikely | High | Mounting specs; torque values; periodic inspection; qualified installer | A - Rare | Medium |
| H-09 | Ignition in explosive atmosphere | Electrical arcing, hot surface in classified area | 5 - Catastrophic | A - Rare | High | Restriction on use in ATEX zones (Section 1.4); warnings | A - Rare | High |
| H-10 | Thermal injury from hot enclosure | Enclosure surface temperature at max operating temperature | 2 - Minor | B - Unlikely | Low | Enclosure surface temp < [TBD] C at max ambient; warning label if > 60 C | B - Unlikely | Low |
| H-11 | Falling object (dropped Gateway during installation) | Loss of grip during handling at height | 4 - Serious | B - Unlikely | High | Weight < [TBD] kg; tethering recommendation; exclusion zone below work area | A - Rare | Medium |

---

## 5. Electrical Safety

> **WARNING**
>
> The WakeCap Gateway is powered by DC electricity. Although the voltage levels are low ([TBD] V DC), incorrect wiring, damaged cables, or faulty power supplies can still cause electrical shock, burns, or fire. Follow all electrical safety procedures in this section.

### 5.1 Power Supply Requirements

> **WARNING**
>
> Use only a SELV (Safety Extra-Low Voltage) or PELV (Protective Extra-Low Voltage) Class 2 DC power supply that meets the following requirements. Using a non-compliant power supply may create a shock or fire hazard.

| Requirement | Specification | Unit |
|-------------|---------------|------|
| Output type | DC, regulated | — |
| Output voltage | [TBD] (nominal), [TBD] to [TBD] (range) | V DC |
| Output current (minimum) | [TBD] | mA |
| Safety class | Class II (double insulated) or Class I (earthed) | — |
| Safety certifications | [TBD] (UL/CSA/CE/[TBD]) | — |
| Overcurrent protection | Built-in, [TBD] A | A |
| Operating temperature | Compatible with site ambient | C |
| Ingress protection | Compatible with installation location | IP rating |

### 5.2 Voltage Limits and Grounding

| Safety Control | Specification |
|---------------|---------------|
| Maximum input voltage (absolute) | [TBD] V DC |
| Overvoltage protection (OVP) activation | [TBD] V DC |
| Undervoltage lockout (UVLO) | [TBD] V DC |
| Reverse polarity protection | Yes (diode-based, limited duration [TBD] s) |
| Grounding | Chassis ground terminal connected to mounting bracket; bond to site earth if required by local code |
| Protective earth | Connect PE terminal (if present) to site protective earth |

### 5.3 Overcurrent Protection

> **CAUTION**
>
> An external fuse or circuit breaker must protect the Gateway power circuit. The fuse must be rated as specified below.

| Parameter | Value | Unit |
|-----------|-------|------|
| Recommended external fuse rating | [TBD] | A |
| Fuse type | [TBD] (slow-blow / fast-blow) | — |
| Maximum wire gauge (power cable) | [TBD] | AWG |
| Minimum wire gauge (power cable) | [TBD] | AWG |

### 5.4 Wiring Safety Procedures

> **WARNING**
>
> De-energize the power source and verify zero voltage with a multimeter before connecting, disconnecting, or modifying any electrical connection. Failure to do so may result in electrical shock or arc flash.

**Before wiring:**

1. Turn off and lock out the power supply (see Section 9.2 for LOTO procedure)
2. Verify zero voltage at the power supply output terminals with a multimeter
3. Inspect all cables for damage (frayed insulation, exposed conductors, corrosion)
4. Verify that the power supply output is within the Gateway rated voltage range

**During wiring:**

5. Connect the positive (+) lead to the V+ terminal
6. Connect the negative (-) lead to the V-/GND terminal
7. Connect the protective earth (PE) to the PE terminal (if present)
8. Verify correct polarity with a multimeter before energizing
9. Tighten all terminal connections to [TBD] N m

**After wiring:**

10. Inspect all connections for secure fit and no exposed conductors
11. Apply strain relief to the power cable
12. Route the cable with a drip loop before entry to prevent water ingress

> **CAUTION**
>
> Reversed polarity will cause the reverse polarity protection diode to conduct. If the condition is sustained beyond [TBD] seconds, the diode may fail and internal components may be permanently damaged. Always verify polarity before applying power.

### 5.5 Electrical Safety Labels

[IMAGE: Location of electrical safety labels on the Gateway enclosure: voltage warning near power terminal, polarity markings (V+ / V- / PE), and maximum voltage label]

---

## 6. RF Exposure Safety

### 6.1 RF Transmitter Information

The WakeCap Gateway contains the following RF transmitters:

| Transmitter | Frequency Band | Max TX Power | Max Antenna Gain | Max EIRP | Unit |
|------------|---------------|-------------|-----------------|----------|------|
| Mesh radio | [TBD] MHz | [TBD] dBm | [TBD] dBi | [TBD] dBm | — |
| Cellular modem (if equipped) | [TBD] MHz | [TBD] dBm | [TBD] dBi | [TBD] dBm | — |

### 6.2 Specific Absorption Rate (SAR) and MPE Compliance

> **CAUTION**
>
> The WakeCap Gateway transmits radio frequency (RF) energy during normal operation. Maintain the minimum separation distances specified below between any antenna and all persons to comply with RF exposure limits.

| Standard | Limit | Compliance Status |
|----------|-------|-------------------|
| FCC OET Bulletin 65 | Maximum Permissible Exposure (MPE) | [TBD] |
| IC RSS-102 | SAR / MPE limits | [TBD] |
| EU EN 62311 | Basic restrictions and reference levels | [TBD] |
| ICNIRP 2020 Guidelines | Reference levels for general public | [TBD] |

### 6.3 Separation Distances

> **WARNING**
>
> Do not allow persons to remain closer than the minimum separation distances specified below during Gateway operation. RF exposure at close range may exceed regulatory limits.

| Antenna | Minimum Separation Distance (general public) | Minimum Separation Distance (occupational) | Unit |
|---------|----------------------------------------------|---------------------------------------------|------|
| Mesh radio antenna | [TBD] | [TBD] | mm |
| Cellular antenna (if equipped) | [TBD] | [TBD] | mm |

### 6.4 Antenna Safety Rules

> **CAUTION**
>
> Do not operate the Gateway without an antenna connected. Transmitting into an open or short-circuited antenna connector can damage the radio module and may cause localized RF energy concentration.

| Rule | Description |
|------|-------------|
| Approved antennas only | Use only WakeCap-approved antennas. Using a higher-gain antenna may exceed regulatory EIRP limits and increase RF exposure. |
| Antenna orientation | Mount the antenna vertically for the designed radiation pattern. Tilting or bending the antenna may concentrate RF energy in unintended directions. |
| Antenna maintenance | Inspect the antenna periodically for damage. A damaged antenna may radiate unpredictably. |
| No antenna modification | Do not modify, shorten, or extend the antenna or its cable. Modifications invalidate RF compliance. |
| Connector torque | Do not exceed [TBD] N m when tightening the antenna connector. Over-torquing can damage the connector and degrade RF performance. |

### 6.5 RF Interference

| Consideration | Guidance |
|--------------|---------|
| Sensitive equipment | Maintain [TBD] m separation from sensitive electronic equipment (test instruments, medical devices) |
| Co-located RF transmitters | Maintain [TBD] m separation from other ISM-band transmitters to minimize interference |
| Pacemaker safety | Persons with implanted cardiac pacemakers should maintain a minimum distance of [TBD] mm from the Gateway antenna, per [TBD] guidelines |

### 6.6 RF Warning Labels

[IMAGE: RF warning label placement on the Gateway enclosure near the antenna connector, showing the standard RF hazard symbol and minimum separation distance]

---

## 7. Environmental Safety

### 7.1 Temperature Safety

> **WARNING**
>
> Operating the Gateway outside the rated temperature range may cause component failure, battery damage (if applicable), or fire. In extreme heat, the enclosure surface may reach temperatures that can cause skin burns on contact.

| Condition | Risk | Mitigation |
|-----------|------|------------|
| Ambient temperature > [TBD] C | Component overheating, thermal shutdown, reduced lifespan | Install in shaded location; verify temperature rating before deployment in extreme climates |
| Ambient temperature < [TBD] C | LCD/display failure (if applicable), reduced battery capacity, brittle plastics | Verify cold-temperature rating; consider heated enclosure if site conditions require it |
| Direct solar radiation | Enclosure surface temperature may exceed ambient by [TBD] C | Install sun shield; mount on north-facing surface (in northern hemisphere) when possible |
| Enclosure surface temperature > 60 C | Skin burn hazard on contact | Warning label required; do not touch enclosure without gloves at high ambient temperatures |

#### 7.1.1 Thermal Shutdown

The Gateway includes an internal thermal protection mechanism:

| Parameter | Value | Unit |
|-----------|-------|------|
| Thermal warning threshold | [TBD] | C (internal) |
| Thermal shutdown threshold | [TBD] | C (internal) |
| Recovery (automatic restart) | [TBD] | C (internal) |

When thermal shutdown activates, the Gateway powers off all RF transmitters and enters a low-power state. It automatically resumes operation when the internal temperature drops below the recovery threshold.

### 7.2 Ingress Protection

| Parameter | Rating | Description |
|-----------|--------|-------------|
| IP Rating | IP [TBD] | [TBD] (e.g., IP65 = dust-tight, protected against water jets) |
| First digit ([TBD]) | Solid particle protection | [TBD] |
| Second digit ([TBD]) | Liquid ingress protection | [TBD] |

#### 7.2.1 Maintaining IP Rating

> **CAUTION**
>
> The IP rating is only valid when all enclosure covers, cable glands, and seals are correctly installed and in good condition. Failure to maintain enclosure integrity may allow water or dust ingress, leading to short circuits, corrosion, or equipment failure.

| Action | Frequency | Reference |
|--------|-----------|-----------|
| Inspect enclosure seals and gaskets | Every [TBD] months | WC-GW-PM-v1.0, Section 7.4 |
| Verify all cable glands are tight | Every [TBD] months | WC-GW-PM-v1.0, Section 7.3 |
| Replace degraded gaskets | As needed | Spare part: [TBD] |
| Verify SIM slot cover is sealed (cellular models) | After every SIM access | WC-GW-IG-v1.0, Section 6.4 |
| Verify antenna connector is tight | Every [TBD] months | WC-GW-PM-v1.0, Section 7.5 |

### 7.3 Chemical Exposure

| Chemical Category | Resistance | Notes |
|-------------------|-----------|-------|
| Water (rain, condensation) | Protected (per IP rating) | Maintain enclosure seals |
| Salt spray / saline atmosphere | [TBD] | For coastal deployments, inspect for corrosion at increased frequency ([TBD] months) |
| Industrial solvents | [TBD] | Do not clean with solvents; use damp cloth only |
| Concrete dust / cement | [TBD] | Cover antenna connector when not in use during construction phase |
| Hydrocarbons (diesel, oil) | [TBD] | Avoid prolonged contact; wipe off promptly |
| Cleaning agents | Mild detergent only | Do not use abrasive or solvent-based cleaners |

### 7.4 UV and Weather Exposure

| Parameter | Rating | Notes |
|-----------|--------|-------|
| UV resistance (enclosure) | [TBD] | Enclosure material rated for [TBD] years outdoor UV exposure |
| UV resistance (antenna) | [TBD] | Replace antenna if cracking or discoloration observed |
| UV resistance (cables) | [TBD] | Use UV-rated outdoor cables for permanent installations |
| Wind load (survival) | [TBD] km/h | With antenna installed; verify mounting integrity after storms exceeding [TBD] km/h |
| Ice loading | [TBD] mm radial ice | [TBD] |
| Lightning protection | [TBD] | External surge protector recommended for exposed installations (see accessories) |

---

## 8. Installation Safety

### 8.1 Working at Height

> **WARNING**
>
> **Falls from height are a leading cause of fatality on construction sites.** If the Gateway is installed at an elevated position (any height above [TBD] m), the following fall protection requirements apply. Failure to use proper fall protection can result in serious injury or death.

| Requirement | Specification |
|-------------|---------------|
| Fall protection required | At heights above [TBD] m (or lower if required by local regulations) |
| Fall protection type | Full-body harness with lanyard, anchored to rated anchor point |
| Harness standard | [TBD] (EN 361 / ANSI Z359.11 / local equivalent) |
| Lanyard type | Shock-absorbing, max free-fall [TBD] m |
| Rescue plan | A documented rescue plan must be in place before commencing elevated work |
| Exclusion zone | Establish exclusion zone below the work area; minimum radius [TBD] m |
| Tool tethering | All tools and the Gateway unit must be tethered when working above [TBD] m |

### 8.2 Structural Requirements

> **WARNING**
>
> Verify the structural adequacy of the mounting surface before installing the Gateway. An inadequate mounting surface may fail under load or environmental stress, causing the Gateway to fall.

| Requirement | Specification | Unit |
|-------------|---------------|------|
| Minimum load capacity (wall/pole) | [TBD] (static, including Gateway + antenna + wind load) | kg |
| Mounting hardware | Use only provided or approved hardware rated for the load | — |
| Pole diameter (pole mount) | [TBD] to [TBD] | mm |
| Wall material suitability | Concrete, steel, solid masonry (not drywall or plywood without backing) | — |
| Screw torque (wall mount) | [TBD] | N m |
| U-bolt torque (pole mount) | [TBD] | N m |

> **CAUTION**
>
> Before drilling, verify there are no concealed electrical cables, gas pipes, or water pipes behind the mounting surface. Use a cable/pipe detector before drilling.

### 8.3 Lifting and Handling

| Parameter | Value | Unit |
|-----------|-------|------|
| Gateway weight (without antenna) | [TBD] | g |
| Gateway weight (with antenna) | [TBD] | g |
| Packaging weight (complete) | [TBD] | g |

The Gateway is light enough for one-person handling under normal conditions. When working at height, secure the Gateway with a tether line before releasing it from the packaging.

### 8.4 PPE Requirements for Installation

> **WARNING**
>
> The following Personal Protective Equipment (PPE) is required during Gateway installation. Additional PPE may be required by site-specific safety rules.

| PPE Item | Standard | Requirement |
|----------|----------|-------------|
| Safety helmet | [TBD] (EN 397 / ANSI Z89.1) | Mandatory on construction sites |
| Safety footwear | [TBD] (EN ISO 20345 / ASTM F2413) | Mandatory |
| High-visibility vest | [TBD] (EN ISO 20471 / ANSI 107) | Mandatory near traffic or machinery |
| Fall-protection harness | [TBD] (EN 361 / ANSI Z359.11) | When working at heights above [TBD] m |
| Safety gloves | [TBD] | When handling sharp mounting hardware or cables |
| Safety glasses | [TBD] (EN 166 / ANSI Z87.1) | When drilling or cutting |
| ESD wrist strap | [TBD] | When accessing internal components |

### 8.5 Drilling and Cutting

> **WARNING**
>
> Wear safety glasses and hearing protection when drilling. Ensure the drill bit is appropriate for the mounting surface material (masonry, steel, wood).

> **WARNING**
>
> Verify there are no concealed services (electrical, gas, water) before drilling. Use a cable and pipe detector.

---

## 9. Maintenance Safety

### 9.1 General Maintenance Safety

> **WARNING**
>
> Before performing any maintenance on the Gateway, de-energize the power supply and follow the lockout/tagout (LOTO) procedure in Section 9.2. Verify zero voltage with a multimeter before touching any electrical connection.

| Safety Rule | Description |
|-------------|-------------|
| Power off before service | De-energize and LOTO the power supply before any physical maintenance |
| One person, one lock | Each maintenance worker applies their own lock to the power isolation point |
| Verify zero energy | Use a multimeter to verify no voltage is present at the Gateway terminals |
| ESD precautions | Wear an ESD wrist strap connected to a grounded surface when accessing internal components |
| No live work | Do not perform maintenance on energized Gateway equipment |
| Restore all covers | After maintenance, replace all enclosure covers and verify seal integrity before re-energizing |

### 9.2 Lockout/Tagout (LOTO) Procedure

> **WARNING**
>
> Lockout/tagout prevents accidental re-energization during maintenance. Failure to properly lock out the power supply can result in electrical shock or equipment damage.

**Lockout procedure:**

| Step | Action | Verification |
|------|--------|-------------|
| 1 | Notify all affected personnel that maintenance is being performed | Verbal or written notification |
| 2 | Identify the power isolation point (circuit breaker, disconnect switch, or power supply switch) | Trace power cable from Gateway to source |
| 3 | Turn off the power isolation device | Isolation device in OFF position |
| 4 | Apply personal padlock to the isolation device in the OFF position | Lock prevents re-energization |
| 5 | Attach a "DO NOT ENERGIZE — MAINTENANCE IN PROGRESS" tag to the lock | Tag visible and legible |
| 6 | Verify zero voltage at the Gateway power terminals with a multimeter | Measured voltage: 0 V DC |

**Restoration procedure:**

| Step | Action | Verification |
|------|--------|-------------|
| 1 | Verify all maintenance work is complete and all personnel are clear | Visual inspection |
| 2 | Replace all enclosure covers, seals, and cable glands | All covers secured |
| 3 | Remove the tag and personal padlock from the isolation device | Lock and tag removed |
| 4 | Re-energize the power supply | Gateway LED illuminates within [TBD] s |
| 5 | Verify normal operation (LED solid green) | Status confirmed |

### 9.3 ESD Safety

> **CAUTION**
>
> The Gateway contains components sensitive to electrostatic discharge (ESD). ESD damage may not be immediately apparent but can cause latent failures that reduce equipment reliability.

| ESD Control | Description |
|-------------|-------------|
| ESD wrist strap | Always wear an ESD wrist strap connected to a grounded point when accessing internal components |
| Ground yourself first | If no ESD strap is available, touch a grounded metal surface immediately before handling electronics |
| Anti-static packaging | Keep replacement components in anti-static bags until installation |
| Anti-static work surface | Place the Gateway on an anti-static mat during service |
| Avoid synthetic clothing | Synthetic fabrics generate static charge; wear cotton or anti-static clothing |
| Humidity | ESD risk is highest in dry conditions (< [TBD] % RH) |

### 9.4 Component Replacement Safety

> **WARNING**
>
> De-energize the Gateway and follow the LOTO procedure (Section 9.2) before replacing any component.

| Component | Safety Notes |
|-----------|-------------|
| Antenna | Power off before removing antenna connector. Transmitting without antenna damages radio module. |
| SIM card | Power off before inserting or removing SIM card. Hot-swap is not supported. |
| Power cable | De-energize and verify zero voltage. Check polarity before re-energizing. |
| Ethernet cable | No special safety precautions (data cable, low voltage). |
| Enclosure seals/gaskets | Ensure replacement seals are compatible. Verify IP rating is restored after reassembly. |
| Internal modules (if field-replaceable) | ESD precautions required. Follow WakeCap service bulletin for authorized replacements. |

### 9.5 Firmware Update Safety

> **CAUTION**
>
> Do not remove power during a firmware update. Interrupting a firmware update may corrupt the Gateway firmware, requiring a factory reset or return for service (RMA).

| Safety Rule | Description |
|-------------|-------------|
| Stable power | Ensure the power supply is stable and uninterrupted during the update process. If using battery/solar power, verify sufficient charge. |
| Do not disconnect | Do not disconnect the power cable, Ethernet cable, or antenna during the update |
| Update indication | The status LED displays [TBD] pattern during firmware update. Do not disturb the Gateway while this pattern is active. |
| Verify completion | After the update, verify the new firmware version via the Cloud dashboard or USB CLI |
| Rollback | If the update fails, the Gateway automatically rolls back to the previous firmware version. If rollback fails, perform a factory reset (hold reset button for [TBD] s). |

---

## 10. Emergency Procedures

### 10.1 Electrical Fire

> **WARNING**
>
> In the event of smoke or fire originating from the Gateway or its power supply, follow these steps immediately.

| Step | Action |
|------|--------|
| 1 | **Do not touch the Gateway.** The enclosure or cables may be energized or at high temperature. |
| 2 | **De-energize the power supply** from a safe distance using the circuit breaker or disconnect switch. Do not touch the Gateway power cable. |
| 3 | **Evacuate personnel** from the immediate area. |
| 4 | **Alert the site fire warden / emergency services** per site emergency procedures. |
| 5 | If safe to do so and the fire is small, use a **CO2 or dry chemical fire extinguisher** rated for electrical fires (Class C / Class E). **Do not use water** on an electrical fire. |
| 6 | After the fire is extinguished, **do not re-energize** the Gateway. The unit must be inspected by WakeCap support before any attempt to restore power. |

### 10.2 Electrical Shock

> **WARNING**
>
> If a person receives an electrical shock from the Gateway or its power supply, follow these steps immediately.

| Step | Action |
|------|--------|
| 1 | **Do not touch the victim** if they are still in contact with the electrical source. |
| 2 | **De-energize the power supply** from a safe distance using the circuit breaker or disconnect switch. |
| 3 | If the power cannot be disconnected, use a **non-conductive object** (dry wood, plastic) to separate the victim from the source. |
| 4 | **Call emergency services** immediately. |
| 5 | If the victim is unconscious and not breathing, begin **CPR** if trained to do so. |
| 6 | Keep the victim warm and calm until emergency services arrive. |
| 7 | **Report the incident** to site management and WakeCap support. |

### 10.3 Equipment Falling from Height

> **WARNING**
>
> If the Gateway or its mounting fails and the unit falls, or if there is a risk of falling during installation:

| Step | Action |
|------|--------|
| 1 | **Evacuate the area** directly below the Gateway. Establish an exclusion zone. |
| 2 | **Do not attempt to catch** a falling unit. |
| 3 | If a person is struck, provide **first aid** and call emergency services if needed. |
| 4 | **De-energize the power supply** before approaching the fallen unit. |
| 5 | **Inspect the mounting structure** for failure before reinstalling. |
| 6 | **Report the incident** to site management and WakeCap support. |

### 10.4 Water Ingress / Flooding

| Step | Action |
|------|--------|
| 1 | **De-energize the power supply** immediately if water ingress is suspected. |
| 2 | **Do not touch the Gateway** until power is confirmed off. |
| 3 | Allow the Gateway to **dry completely** before any further action. |
| 4 | **Do not re-energize.** Contact WakeCap support for inspection guidance. |
| 5 | **Inspect the cause** of water ingress (damaged seal, missing cover, flooding). |

### 10.5 RF Exposure Incident

| Step | Action |
|------|--------|
| 1 | **Move away** from the antenna to beyond the minimum separation distance ([TBD] mm). |
| 2 | If prolonged close-range exposure occurred, **seek medical advice** as a precaution. |
| 3 | **Verify antenna placement** complies with the separation distances in Section 6.3. |
| 4 | **Report the incident** and review the installation to prevent recurrence. |

### 10.6 Emergency Contact Information

| Contact | Details |
|---------|---------|
| Site Emergency Number | [TBD] (site-specific) |
| Local Emergency Services | [TBD] (site-specific) |
| WakeCap Support (24/7) | [TBD - Phone] |
| WakeCap Support Email | [TBD - Email] |
| Poison Control (if battery leakage) | [TBD] |

---

## 11. Safety Symbols and Signal Words Reference

### 11.1 Signal Word Definitions

The following signal words are used throughout WakeCap documentation, consistent with ANSI Z535.6 and ISO 3864-2.

| Signal Word | Color | Meaning | Usage |
|-------------|-------|---------|-------|
| **DANGER** | Red | Indicates a hazardous situation that, if not avoided, **will** result in death or serious injury. | Reserved for the most extreme hazards. Not used in this manual (no DANGER-level hazards identified for normal use). |
| **WARNING** | Orange | Indicates a hazardous situation that, if not avoided, **could** result in death or serious injury. | Electrical shock, falls from height, fire risk. |
| **CAUTION** | Yellow | Indicates a hazardous situation that, if not avoided, **could** result in minor or moderate injury. | RF exposure, ESD, radio damage from missing antenna, reverse polarity. |
| **NOTICE** | Blue | Indicates information considered important but not related to personal injury. | Equipment damage, data loss, operational guidance. |
| **NOTE** | — (no color) | Supplementary information, tips, or clarifications. | Useful operational information, performance hints. |

### 11.2 Safety Symbols

The following symbols may appear on the WakeCap Gateway product label, packaging, or in documentation.

| Symbol | Description | Meaning | Reference Standard |
|--------|-------------|---------|-------------------|
| [IMAGE: Lightning bolt in triangle] | Electrical hazard | Risk of electrical shock. De-energize before servicing. | IEC 60417-5036 |
| [IMAGE: RF radiation symbol] | Non-ionizing radiation | RF transmitter present. Maintain separation distance. | IEC 60417-5140 |
| [IMAGE: ESD symbol - hand with arc] | ESD sensitive | Electrostatic-sensitive components. Handle with ESD precautions. | IEC 60417-5134 |
| [IMAGE: Earth/ground symbol] | Protective earth | Protective earth terminal. Connect to site grounding. | IEC 60417-5019 |
| [IMAGE: DC symbol (solid + dashed lines)] | Direct current | DC power input. Do not connect to AC supply. | IEC 60417-5031 |
| [IMAGE: Crossed-out wheelie bin] | WEEE disposal | Do not dispose in household waste. Follow local e-waste regulations. | EU WEEE Directive 2012/19/EU |
| [IMAGE: Exclamation mark in triangle] | General warning | Caution: refer to documentation before proceeding. | ISO 7010 W001 |
| [IMAGE: CE mark] | CE conformity | Product complies with applicable EU directives. | EU CE Marking |
| [IMAGE: FCC logo] | FCC compliance | Product complies with FCC Part 15. | FCC Part 15 |
| [IMAGE: RoHS symbol] | RoHS compliance | Product complies with Restriction of Hazardous Substances. | EU RoHS Directive 2011/65/EU |
| [IMAGE: IP rating badge] | Ingress Protection | Enclosure IP rating for dust and water protection. | IEC 60529 |

### 11.3 Label Placement

[IMAGE: Gateway enclosure diagram showing the location of each safety label and symbol: electrical hazard near power terminal, RF warning near antenna connector, ESD warning on enclosure access panel, regulatory markings on rear label, WEEE symbol on bottom label]

---

## 12. Related Documents

| Document ID | Title | Version | Relationship |
|-------------|-------|---------|-------------|
| WC-GW-PM-v1.0 | WakeCap Gateway Product Manual | 1.0 | Reference: complete product documentation |
| WC-GW-IG-v1.0 | WakeCap Gateway Installation Guide | 1.0 | Reference: installation procedures and safety |
| WC-GW-CG-v1.0 | WakeCap Gateway Commissioning Guide | 1.0 | Reference: commissioning safety and validation |
| WC-GW-PM-v1.0 | WakeCap Gateway Preventive Maintenance Guide | 1.0 | Reference: maintenance procedures and schedules |
| WC-GW-TG-v1.0 | WakeCap Gateway Troubleshooting Guide | 1.0 | Reference: fault diagnosis and resolution |
| WC-GW-ICD-v1.0 | WakeCap Gateway Interface Control Document | 1.0 | Reference: electrical interface specifications |
| WC-GW-DS-v1.0 | WakeCap Gateway Product Datasheet | 1.0 | Reference: specifications summary |

---

*End of Document WC-GW-SM-v1.0*

---

**WakeCap Technologies**
[TBD - Address]
[TBD - Website]
Support: [TBD - Email] | [TBD - Phone]

(c) 2026 WakeCap Technologies. All rights reserved.

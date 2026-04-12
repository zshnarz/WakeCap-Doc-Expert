# WakeCap Gateway

## Installation Guide

---

| Field | Value |
|-------|-------|
| **Document ID** | WC-GW-IG-v1.0 |
| **Version** | 1.0 |
| **Date** | 2026-02-09 |
| **Product** | WakeCap Gateway |
| **HW Compatibility** | [TBD] |
| **FW Compatibility** | [TBD] |

---

## Table of Contents

1. Scope and Supported Models
2. Safety Information
3. Before You Begin
4. Site Requirements
5. Mounting
6. Wiring and Connections
7. Antenna Installation
8. Network Configuration
9. Power-Up and Initial Checks
10. Installation Completion Checklist

---

## 1. Scope and Supported Models

This guide covers the physical installation and initial power-up of the WakeCap Gateway. It applies to the following models:

| Model | Description | Connectivity |
|-------|-------------|-------------|
| [TBD] | Standard Gateway | Ethernet |
| [TBD] | Cellular Gateway | 4G LTE + Ethernet |
| [TBD] | Solar-Ready Gateway | 4G LTE + Ethernet |

**Hardware revisions covered:** [TBD] and later

**Firmware version required:** [TBD] or later

---

## 2. Safety Information

> **WARNING**
>
> **Electrical hazard.** The Gateway operates on DC power. Ensure the power source is de-energized before connecting or disconnecting power cables. Failure to do so may result in electrical shock or equipment damage.

> **WARNING**
>
> **Elevated installation.** If mounting the Gateway at height (e.g., on a pole or mast), use appropriate fall-protection equipment and follow site safety procedures. A fall from height can cause serious injury or death.

> **CAUTION**
>
> **Antenna safety.** Do not operate the Gateway without the antenna connected. Transmitting without an antenna may damage the radio module.

> **NOTICE**
>
> **ESD precautions.** The Gateway contains static-sensitive components. Handle with ESD precautions when the enclosure is open. Touch a grounded metal surface before handling internal components.

---

## 3. Before You Begin

### 3.1 Package Contents

Verify all items are present before starting installation.

| Item | Quantity | Check |
|------|----------|-------|
| WakeCap Gateway unit | 1 | ☐ |
| External antenna | [TBD] | ☐ |
| Mounting bracket | 1 | ☐ |
| Mounting hardware (bolts, nuts, washers) | 1 set | ☐ |
| Power cable | 1 | ☐ |
| Ethernet cable (patch) | 1 | ☐ |
| Quick Start card | 1 | ☐ |

> **NOTICE**
>
> If any items are missing or damaged, contact WakeCap support before proceeding with installation.

### 3.2 Required Tools

The following tools are required (not included):

- Phillips screwdriver (#2)
- Adjustable wrench or [TBD] mm socket
- Cable ties
- Multimeter (DC voltage measurement)
- Drill with [TBD] mm bit (if wall mounting)
- Level
- Laptop with USB port (for initial configuration, if required)

### 3.3 Required Qualifications

This installation must be performed by personnel with:

- Basic knowledge of DC electrical wiring
- Familiarity with network equipment (Ethernet, SIM cards)
- Authorization to work at the installation site

---

## 4. Site Requirements

Before installation, ensure the following site conditions are met:

| Requirement | Specification |
|-------------|---------------|
| Power supply available | [TBD] V DC, [TBD] W minimum |
| Network connectivity | Ethernet LAN or cellular coverage at installation point |
| Mounting surface | Structural surface capable of supporting [TBD] kg |
| Ambient temperature | [TBD] C to [TBD] C |
| Ventilation | Minimum [TBD] mm clearance on all sides |
| Line of sight | Clear path to mesh device antennas preferred |
| Elevation | Mount [TBD] m above ground level for optimal mesh coverage |

---

## 5. Mounting

### 5.1 Mounting Options

| Method | Description | When to Use |
|--------|-------------|-------------|
| Wall mount | Bracket fixed to vertical surface | Indoor / sheltered outdoor |
| Pole mount | Bracket clamped to vertical pole | Outdoor, elevated position |
| DIN rail | DIN-rail clip (accessory) | Electrical cabinet installation |

### 5.2 Wall Mounting Procedure

> **WARNING**
>
> Verify there are no concealed electrical cables or pipes behind the mounting surface before drilling.

[IMAGE: Wall mounting template showing hole positions and dimensions]

**1.** Position the mounting bracket at the desired location. Use a level to ensure the bracket is plumb.

**2.** Mark the hole positions using the bracket as a template.
   - Hole spacing: [TBD] mm x [TBD] mm

**3.** Drill holes at marked positions using a [TBD] mm drill bit.

**4.** Insert wall anchors (if required for the surface material).

**5.** Secure the mounting bracket to the wall using the provided screws.
   - Torque: [TBD] N m

**6.** Attach the Gateway to the mounting bracket.
   - Engage the top hooks first, then secure the bottom latch.

   Verification: Gateway is firmly seated with no movement.

### 5.3 Pole Mounting Procedure

[IMAGE: Pole mounting showing U-bolt clamp arrangement on a vertical pole]

**1.** Position the pole mounting bracket around the pole.
   - Supported pole diameters: [TBD] mm to [TBD] mm

**2.** Insert the U-bolt through the bracket holes and around the pole.

**3.** Tighten the U-bolt nuts evenly to [TBD] N m.

**4.** Attach the Gateway to the mounting bracket.

   Verification: Gateway does not rotate or slide on the pole.

### 5.4 Orientation

- Mount the Gateway with the antenna connector pointing **upward**
- Ensure the status LED is visible from the ground
- Maintain minimum [TBD] mm clearance around the enclosure for ventilation

---

## 6. Wiring and Connections

### 6.1 Connection Diagram

[IMAGE: Wiring diagram showing power supply, Ethernet, and antenna connections to the Gateway]

### 6.2 Power Connection

> **WARNING**
>
> De-energize the power source before connecting power cables. Verify zero voltage with a multimeter.

**1.** Route the power cable from the power source to the Gateway.

**2.** Connect the positive (+) lead to the **V+** terminal.

**3.** Connect the negative (-) lead to the **V-/GND** terminal.

   Verification: Verify correct polarity with a multimeter before energizing.

> **CAUTION**
>
> Reversed polarity may permanently damage the Gateway. Double-check connections before applying power.

### 6.3 Ethernet Connection

**1.** Route the Ethernet cable from the network switch or router to the Gateway.

**2.** Insert the RJ45 connector into the Gateway Ethernet port until the latch clicks.

   Verification: Link LED on the Ethernet port illuminates.

### 6.4 SIM Card Installation (Cellular Models Only)

> **NOTICE**
>
> Power off the Gateway before inserting or removing the SIM card.

**1.** Open the SIM card slot cover.

**2.** Insert the SIM card with the contacts facing [TBD] and the notched corner oriented [TBD].

**3.** Push until the SIM card clicks into place.

**4.** Close the SIM card slot cover and verify it is sealed.

### 6.5 Cable Management

- Secure all cables using cable ties at [TBD] mm intervals
- Ensure cables have drip loops before entering the enclosure
- Do not exceed minimum bend radius of [TBD] mm for Ethernet cables

---

## 7. Antenna Installation

> **CAUTION**
>
> Do not power on the Gateway without the antenna connected. Operating without an antenna can damage the radio module.

**1.** Thread the antenna connector onto the Gateway antenna port.

**2.** Hand-tighten the connector, then snug with [TBD] turn using a wrench.
   - Torque: [TBD] N m maximum

**3.** Orient the antenna vertically for optimal omnidirectional coverage.

[IMAGE: Antenna installation showing correct vertical orientation and connector tightening]

   Verification: Antenna is firmly attached and oriented vertically.

---

## 8. Network Configuration

### 8.1 Ethernet (DHCP — Default)

The Gateway defaults to DHCP for Ethernet connectivity. Connect to a network with a DHCP server and the Gateway will obtain an IP address automatically.

### 8.2 Ethernet (Static IP)

To assign a static IP:

**1.** Connect a laptop to the Gateway USB port.

**2.** Open the configuration utility at [TBD].

**3.** Navigate to Network Settings.

**4.** Enter the static IP address, subnet mask, gateway, and DNS server.

**5.** Save and reboot the Gateway.

### 8.3 Cellular Configuration

**1.** Ensure the SIM card is installed (see Section 6.4).

**2.** Verify APN settings via the configuration utility.
   - Default APN: [TBD]

**3.** The Gateway will automatically connect to the cellular network on power-up.

   Verification: Cellular status LED indicates connected.

---

## 9. Power-Up and Initial Checks

### 9.1 Pre-Power Checklist

Before applying power, verify:

- ☐ All mechanical connections are secure (mounting, antenna)
- ☐ Power cable polarity is correct (V+ to V+, GND to GND)
- ☐ Ethernet cable is connected (if using wired uplink)
- ☐ SIM card is installed (if using cellular uplink)
- ☐ Antenna is attached and oriented vertically
- ☐ No exposed wires or damaged insulation

### 9.2 Initial Power-Up

**1.** Apply power to the Gateway.

   Verification: Status LED illuminates within [TBD] seconds.

**2.** Wait [TBD] seconds for system initialization.

   Verification: Status LED transitions to slow blink green (connecting).

**3.** Wait for the Gateway to establish cloud connectivity.

   Verification: Status LED changes to solid green (connected).

> **NOTE**
>
> First boot may take up to [TBD] minutes as the Gateway downloads its initial configuration from the cloud.

### 9.3 Common Power-Up Issues

| Symptom | Likely Cause | Immediate Action |
|---------|--------------|------------------|
| LED does not illuminate | No power | Check supply voltage; verify polarity |
| LED solid red | Boot failure | Power cycle; check firmware version |
| LED amber (no cloud) | Network issue | Verify Ethernet / SIM; check APN settings |
| LED blink red | Hardware fault | Remove power; contact support |

---

## 10. Installation Completion Checklist

| Item | Check |
|------|-------|
| Gateway securely mounted | ☐ |
| Power connected, correct polarity | ☐ |
| Antenna installed and vertical | ☐ |
| Ethernet or SIM connected | ☐ |
| Status LED solid green (cloud connected) | ☐ |
| Gateway visible on WakeCap Dashboard | ☐ |
| Mesh devices associating with Gateway | ☐ |
| Cables secured and routed with drip loops | ☐ |
| Enclosure sealed (all covers, glands closed) | ☐ |
| Installation photos taken for records | ☐ |

**Installer name:** _______________
**Date:** _______________
**Site:** _______________
**Gateway serial number:** _______________

---

## Related Documents

| Document | ID |
|----------|----|
| Product Manual | WC-GW-PM-v1.0 |
| Commissioning Guide | WC-GW-CG-v1.0 |
| Quick Reference | WC-GW-QR-v1.0 |
| Troubleshooting Guide | WC-GW-TG-v1.0 |

---

**WakeCap Technologies**
[TBD - Address]
[TBD - Website]
Support: [TBD - Email] | [TBD - Phone]

(c) 2026 WakeCap Technologies. All rights reserved.

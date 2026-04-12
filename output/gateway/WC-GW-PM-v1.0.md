# PRODUCT MANUAL

# WakeCap Gateway

---

| Field | Value |
|-------|-------|
| **Document ID** | WC-GW-PM-v1.0 |
| **Version** | 1.0 |
| **Date** | 2026-02-09 |
| **Product** | WakeCap Gateway |
| **HW Compatibility** | [TBD] |
| **FW Compatibility** | [TBD] |
| **Classification** | CONFIDENTIAL - INTERNAL USE ONLY |

[IMAGE: Technical line drawing of the WakeCap Gateway showing front and side views]

---

## Table of Contents

1. Product Overview
2. System Architecture
3. Technical Specifications
4. Components
5. Installation
6. Operation
7. Maintenance
8. Troubleshooting
9. Safety Information
10. Appendices

---

## 1. Product Overview

### 1.1 Description

The WakeCap Gateway is the central communication hub in the WakeCap IoT monitoring ecosystem. It aggregates data from field-deployed devices operating on the WakeCap wireless mesh network and transmits that data to the WakeCap Cloud Platform via cellular (4G LTE) or Ethernet uplink.

The Gateway supports simultaneous connections from multiple device types including Weather Stations, Smart Hats, Anchors, and MODBUS Assets. It provides store-and-forward data buffering during connectivity outages, ensuring no data loss during transient network disruptions.

The Gateway is designed for deployment in harsh outdoor environments typical of construction sites and industrial facilities, with an [TBD] IP-rated enclosure and an extended operating temperature range.

### 1.2 Key Features

- Dual WAN connectivity: Cellular (4G LTE) and Ethernet with automatic failover
- WakeCap proprietary mesh radio supporting [TBD] concurrent device connections
- Store-and-forward buffering for [TBD] hours of data during connectivity loss
- Over-the-air (OTA) firmware and configuration updates
- Industrial-grade [TBD] IP-rated enclosure
- Operating temperature range: [TBD] C to [TBD] C
- Low power consumption suitable for solar-powered deployments
- Built-in diagnostics with status LED and USB configuration port
- Wall, pole, and DIN-rail mounting options

### 1.3 Package Contents

| Item | Quantity | Part Number |
|------|----------|-------------|
| WakeCap Gateway unit | 1 | [TBD] |
| External antenna | [TBD] | [TBD] |
| Mounting bracket | 1 | [TBD] |
| Mounting hardware set | 1 | [TBD] |
| Power cable | 1 | [TBD] |
| Ethernet patch cable ([TBD] m) | 1 | [TBD] |
| Quick Start card | 1 | [TBD] |

### 1.4 Product Identification

[IMAGE: WakeCap Gateway with numbered callouts pointing to key components: 1-Antenna connector, 2-Status LED, 3-Ethernet port, 4-Power input, 5-SIM slot, 6-USB port, 7-Mounting bracket points, 8-Reset button, 9-Serial number label, 10-Regulatory markings]

1. **Antenna connector** — SMA female connector for external mesh antenna
2. **Status LED** — Multi-color LED indicating system status
3. **Ethernet port** — RJ45 10/100 Ethernet for LAN/WAN uplink
4. **Power input** — DC power connector ([TBD] V DC)
5. **SIM slot** — Nano/Micro SIM card slot for cellular connectivity
6. **USB port** — USB [TBD] for local configuration and diagnostics
7. **Mounting bracket points** — [TBD] mounting holes for bracket attachment
8. **Reset button** — Recessed button for factory reset
9. **Serial number label** — Unique device identifier and manufacturing info
10. **Regulatory markings** — CE, FCC, and other compliance marks

---

## 2. System Architecture

### 2.1 System Overview

[IMAGE: Block diagram showing WakeCap Gateway as the central hub connecting mesh field devices (Weather Station, Smart Hat, Anchor, MODBUS Asset) on the left side to the WakeCap Cloud Platform on the right side via cellular or Ethernet uplink]

The WakeCap Gateway operates as a bridge between two network domains:

- **Mesh domain:** The Gateway communicates with field devices over the WakeCap proprietary wireless mesh protocol
- **WAN domain:** The Gateway transmits aggregated data to the WakeCap Cloud Platform via cellular or Ethernet

### 2.2 Data Flow

```
Field Devices → Mesh Radio → Gateway Processor → Data Buffer → WAN Uplink → WakeCap Cloud
                                    ↓
                              Local Storage
                          (store-and-forward)
```

1. Field devices transmit sensor readings and status messages over the mesh network
2. The Gateway mesh radio receives and demodulates incoming packets
3. The Gateway processor validates, timestamps, and queues data for transmission
4. Data is transmitted to the WakeCap Cloud via the active WAN uplink (cellular or Ethernet)
5. If the WAN uplink is unavailable, data is stored locally and transmitted when connectivity is restored

### 2.3 Communication Protocols

| Connection | Protocol | Direction | Data Rate | Notes |
|------------|----------|-----------|-----------|-------|
| Mesh devices to Gateway | [TBD] proprietary | Bidirectional | [TBD] kbps | Star/mesh topology |
| Gateway to Cloud (cellular) | MQTT over TLS | Bidirectional | Varies | 4G LTE Cat [TBD] |
| Gateway to Cloud (Ethernet) | MQTT over TLS | Bidirectional | 10/100 Mbps | TCP/IP |
| USB configuration | [TBD] | Bidirectional | [TBD] | Local only |

### 2.4 Network Topology

[IMAGE: Network topology diagram showing star-of-stars mesh with Gateway at center, Anchors as relay points, and end devices (Weather Stations, Smart Hats, MODBUS Assets) at the edges]

The Gateway supports the following mesh topologies:

- **Star:** Devices communicate directly with the Gateway
- **Multi-hop mesh:** Devices relay through Anchors to extend range
- **Maximum hops:** [TBD] hops between end device and Gateway

---

## 3. Technical Specifications

### 3.1 Physical Specifications

| Parameter | Value | Unit |
|-----------|-------|------|
| Dimensions (L x W x H) | [TBD] x [TBD] x [TBD] | mm |
| Weight (without antenna) | [TBD] | g |
| Weight (with antenna) | [TBD] | g |
| Enclosure Material | [TBD] | — |
| Enclosure Color | [TBD] | — |
| IP Rating | [TBD] | — |
| Mounting | Wall, pole, DIN-rail | — |

### 3.2 Electrical Specifications

| Parameter | Symbol | Min | Typ | Max | Unit |
|-----------|--------|-----|-----|-----|------|
| Input Voltage | V_IN | [TBD] | [TBD] | [TBD] | V DC |
| Current Draw (idle) | I_IDLE | — | [TBD] | — | mA |
| Current Draw (active) | I_ACT | — | [TBD] | [TBD] | mA |
| Current Draw (peak TX) | I_PEAK | — | — | [TBD] | mA |
| Power Consumption (idle) | P_IDLE | — | [TBD] | — | W |
| Power Consumption (active) | P_ACT | — | [TBD] | [TBD] | W |

### 3.3 Environmental Specifications

| Parameter | Min | Max | Unit |
|-----------|-----|-----|------|
| Operating Temperature | [TBD] | [TBD] | C |
| Storage Temperature | [TBD] | [TBD] | C |
| Operating Humidity | [TBD] | [TBD] | % RH (non-condensing) |
| Altitude | 0 | [TBD] | m |

### 3.4 Wireless Specifications (Mesh Radio)

| Parameter | Value | Unit |
|-----------|-------|------|
| Frequency Band | [TBD] | MHz |
| Transmit Power | [TBD] | dBm |
| Receiver Sensitivity | [TBD] | dBm |
| Modulation | [TBD] | — |
| Data Rate (mesh) | [TBD] | kbps |
| Range (line of sight) | [TBD] | m |
| Range (non-line of sight) | [TBD] | m |
| Max Connected Devices | [TBD] | — |
| Max Mesh Hops | [TBD] | — |
| Antenna Connector | SMA female | — |
| Antenna Gain | [TBD] | dBi |

### 3.5 Cellular Specifications (Cellular Models)

| Parameter | Value | Unit |
|-----------|-------|------|
| Technology | 4G LTE Cat [TBD] | — |
| Frequency Bands | [TBD] | — |
| Fallback | [TBD] | — |
| SIM Type | [TBD] | — |
| Data Rate (downlink) | [TBD] | Mbps |
| Data Rate (uplink) | [TBD] | Mbps |

### 3.6 Ethernet Specifications

| Parameter | Value | Unit |
|-----------|-------|------|
| Standard | IEEE 802.3 | — |
| Speed | 10/100 | Mbps |
| Connector | RJ45 | — |
| Cable | Cat5e or better | — |
| Max Cable Length | 100 | m |

### 3.7 Data Buffering

| Parameter | Value | Unit |
|-----------|-------|------|
| Local Storage Capacity | [TBD] | MB |
| Buffer Duration (typical load) | [TBD] | hours |
| Buffer Duration (max load) | [TBD] | hours |
| Data Retention on Power Loss | [TBD] | — |

### 3.8 Certifications

| Certification | Status | Notes |
|---------------|--------|-------|
| CE | [TBD] | [TBD] |
| FCC Part 15 | [TBD] | [TBD] |
| IC | [TBD] | [TBD] |
| RoHS | [TBD] | [TBD] |
| REACH | [TBD] | [TBD] |

---

## 4. Components

### 4.1 Gateway Main Unit

**Function:** Central processor, mesh radio transceiver, WAN uplink, and data buffer in a single integrated enclosure.

**Physical Description:** [TBD] enclosure with [TBD] finish. The front panel provides the status LED, Ethernet port, and USB port. The top provides the antenna connector. The bottom provides the power input and SIM slot access.

[IMAGE: Gateway main unit exploded view showing internal components: processor board, mesh radio module, cellular module, antenna feed, power management, and enclosure]

**Internal Modules:**

| Module | Function | Notes |
|--------|----------|-------|
| Processor Board | Main CPU, memory, storage | [TBD] processor, [TBD] MB RAM |
| Mesh Radio Module | WakeCap mesh transceiver | [TBD] MHz band |
| Cellular Module | 4G LTE modem (cellular models) | [TBD] chipset |
| Power Management | Voltage regulation, protection | Input: [TBD] V DC |
| Local Storage | Non-volatile data buffer | [TBD] MB flash |

### 4.2 Status LED

**Function:** Provides visual indication of Gateway operational status.

| LED Pattern | Color | Status | Meaning |
|-------------|-------|--------|---------|
| Solid | Green | Normal | Connected to cloud, mesh active |
| Slow blink (1 per 5 s) | Green | Connecting | Establishing cloud connection |
| Fast blink | Green | Data transfer | Active data upload |
| Solid | Amber | Warning | Connected locally, no cloud uplink |
| Blink | Amber | Mesh only | Mesh active, no WAN connection |
| Solid | Red | Fault | Hardware or critical software error |
| Blink | Red | Boot error | Failed to initialize |
| Off | — | No power | No power supply to device |

### 4.3 Antenna

**Function:** External omnidirectional antenna for the mesh radio network.

| Parameter | Value | Unit |
|-----------|-------|------|
| Type | Omnidirectional whip | — |
| Gain | [TBD] | dBi |
| Frequency | [TBD] | MHz |
| Connector | SMA male | — |
| Length | [TBD] | mm |
| Material | [TBD] | — |

### 4.4 Mounting Bracket

**Function:** Universal mounting bracket for wall, pole, or DIN-rail installation.

| Parameter | Value | Unit |
|-----------|-------|------|
| Material | [TBD] | — |
| Supported pole diameters | [TBD] to [TBD] | mm |
| Mounting hole pattern | [TBD] x [TBD] | mm |
| Weight capacity | [TBD] | kg |

---

## 5. Installation

For detailed installation instructions, refer to the Installation Guide (WC-GW-IG-v1.0).

### 5.1 Pre-Installation Requirements

- Power supply: [TBD] V DC, [TBD] W minimum
- Network: Ethernet LAN or cellular coverage at installation point
- Mounting: Structural surface rated for [TBD] kg
- Tools: Phillips screwdriver, adjustable wrench, multimeter, drill (wall mount)

### 5.2 Installation Summary

| Step | Description | Time | Reference |
|------|-------------|------|-----------|
| 1 | Mount the Gateway | 15 min | See Section 5.3 |
| 2 | Connect antenna | 2 min | See Section 5.4 |
| 3 | Connect power | 5 min | See Section 5.5 |
| 4 | Connect network | 5 min | See Section 5.6 |
| 5 | Power up and verify | 10 min | See Section 5.7 |

Total estimated time: 40 minutes

### 5.3 Mounting

> **WARNING**
>
> If mounting at height, use appropriate fall-protection equipment. A fall from height can cause serious injury or death.

Refer to *WC-GW-IG-v1.0, Section 5* for detailed mounting procedures including wall mount, pole mount, and DIN-rail options.

### 5.4 Antenna Connection

> **CAUTION**
>
> Do not power on the Gateway without the antenna connected. Operating without an antenna can damage the radio module.

**1.** Thread the antenna connector onto the Gateway antenna port.

**2.** Hand-tighten, then snug with [TBD] turn using a wrench. Torque: [TBD] N m maximum.

**3.** Orient the antenna vertically.

### 5.5 Power Connection

> **WARNING**
>
> De-energize the power source before connecting cables. Verify zero voltage with a multimeter before touching terminals.

**1.** Connect the positive (+) lead to the V+ terminal.

**2.** Connect the negative (-) lead to the V-/GND terminal.

> **CAUTION**
>
> Reversed polarity may permanently damage the Gateway.

### 5.6 Network Connection

**Ethernet:** Insert the RJ45 connector into the Ethernet port until the latch clicks.

**Cellular:** Install the SIM card with power off. See *WC-GW-IG-v1.0, Section 6.4*.

### 5.7 Power-Up Verification

**1.** Apply power. Status LED illuminates within [TBD] seconds.

**2.** Wait [TBD] seconds for initialization. LED transitions to slow blink green.

**3.** Wait for cloud connection. LED changes to solid green.

> **NOTE**
>
> First boot may take up to [TBD] minutes for initial configuration download.

---

## 6. Operation

### 6.1 Normal Operation

During normal operation, the Gateway:

- Maintains continuous connection to the WakeCap Cloud Platform
- Receives data from mesh devices and forwards to the cloud
- Processes configuration updates and firmware commands from the cloud
- Buffers data locally during WAN outages
- Indicates status via the front-panel LED (solid green = normal)

No user intervention is required during normal operation.

### 6.2 Status Monitoring

#### 6.2.1 LED Indicator

See *Section 4.2* for the complete LED status reference.

#### 6.2.2 WakeCap Dashboard

The Gateway status is visible on the WakeCap Dashboard:

**1.** Log in to the WakeCap Dashboard at [TBD].

**2.** Navigate to Devices > Gateways.

**3.** Select the Gateway by serial number or site name.

The Dashboard displays:
- Connection status (online/offline)
- Uplink type (cellular/Ethernet)
- Signal strength (cellular)
- Connected mesh devices
- Data throughput
- Last seen timestamp
- Firmware version

#### 6.2.3 WakeCap Verify App

The WakeCap Verify mobile app provides field-level Gateway diagnostics:

- Mesh radio status and signal strength
- Connected device list
- WAN uplink status
- Local data buffer usage
- Device health metrics

### 6.3 Operating Modes

| Mode | Description | LED | Trigger |
|------|-------------|-----|---------|
| Normal | Full operation, cloud connected | Solid green | Default |
| Connecting | Establishing WAN connection | Slow blink green | Power-up / reconnect |
| Mesh Only | Mesh active, no WAN | Blink amber | WAN failure |
| Local Only | No mesh, no WAN | Solid amber | Antenna / radio issue |
| Firmware Update | Applying OTA update | [TBD] | Cloud command |
| Safe Mode | Minimal operation, diagnostics only | [TBD] | Boot failure recovery |

### 6.4 Configuration

Configuration is managed via:

1. **WakeCap Cloud Platform** — Primary method. Configuration pushed OTA.
2. **USB local configuration** — Secondary method. Connect a laptop and use the configuration utility.

Configurable parameters include:

| Parameter | Default | Range | Notes |
|-----------|---------|-------|-------|
| Device name | [TBD] | 1-32 characters | Displayed on Dashboard |
| Mesh channel | [TBD] | [TBD] | Must match all mesh devices |
| Mesh TX power | [TBD] | [TBD] to [TBD] dBm | Higher = more range, more power |
| Data upload interval | [TBD] | [TBD] to [TBD] s | Lower = more responsive, more data |
| WAN priority | Cellular | Cellular / Ethernet | Primary uplink selection |
| APN | [TBD] | — | Cellular APN setting |
| Static IP | DHCP | — | Ethernet IP configuration |
| NTP server | [TBD] | — | Time synchronization |

### 6.5 Firmware Updates

Firmware updates are delivered over-the-air (OTA) from the WakeCap Cloud Platform:

**1.** A new firmware version is published by WakeCap.

**2.** The Gateway downloads the update during the configured maintenance window.

**3.** The Gateway validates the firmware image integrity.

**4.** The Gateway applies the update and reboots.

**5.** The Gateway reports the new firmware version to the cloud.

> **NOTICE**
>
> Do not remove power during a firmware update. Interrupting an update may require a factory reset or RMA.

---

## 7. Maintenance

For detailed maintenance procedures, refer to the Maintenance Manual (WC-GW-MG-v1.0).

### 7.1 Maintenance Schedule

| Task | Frequency | Procedure Reference |
|------|-----------|---------------------|
| Visual inspection | Monthly | See Section 7.2 |
| Connection integrity check | Quarterly | See Section 7.3 |
| Enclosure seal inspection | Every 6 months | See Section 7.4 |
| Antenna inspection | Every 6 months | See Section 7.5 |
| Full system health check | Annually | See Section 7.6 |
| Firmware review | As released | See Section 6.5 |

### 7.2 Visual Inspection

- Check enclosure for cracks, corrosion, or physical damage
- Verify LED is operational (solid green during normal operation)
- Inspect cable routing and cable ties for wear
- Check mounting bracket for looseness or corrosion

### 7.3 Connection Integrity

- Verify Ethernet cable connection is secure (latch engaged)
- Check power cable for damage or loose connections
- Verify antenna connector is tight and not corroded
- Inspect SIM card slot seal (cellular models)

### 7.4 Enclosure Seal Inspection

- Inspect gaskets and seals for degradation
- Verify all covers and glands are properly closed
- Check for signs of moisture ingress (condensation, corrosion)

### 7.5 Antenna Inspection

- Check antenna for physical damage (bends, cracks)
- Verify connector is tight (no loosening from vibration)
- Clean connector threads if corrosion is visible
- Replace antenna if damaged (see spare parts, Section 7.7)

### 7.6 Full System Health Check

- Perform all checks from Sections 7.2 through 7.5
- Verify data throughput on WakeCap Dashboard
- Confirm all expected mesh devices are connected
- Review error logs for recurring issues
- Verify firmware is current

### 7.7 Spare Parts

| Part | Part Number | Compatible Revisions |
|------|-------------|---------------------|
| External antenna | [TBD] | [TBD] |
| Mounting bracket | [TBD] | [TBD] |
| Mounting hardware set | [TBD] | [TBD] |
| Power cable | [TBD] | [TBD] |
| Enclosure seal kit | [TBD] | [TBD] |
| Ethernet patch cable | [TBD] | [TBD] |

---

## 8. Troubleshooting

For detailed troubleshooting procedures, refer to the Troubleshooting Guide (WC-GW-TG-v1.0).

### 8.1 Common Issues

| Symptom | Possible Cause | Solution |
|---------|----------------|----------|
| LED off | No power | Check power supply voltage ([TBD] V DC); verify connector and polarity |
| LED solid red | Hardware/software fault | Power cycle the Gateway. If fault persists, contact support |
| LED blink red | Boot failure | Attempt factory reset. If unsuccessful, contact support for RMA |
| LED amber (no cloud) | WAN connectivity loss | Check Ethernet cable / SIM card; verify network availability; check APN |
| Devices not connecting | Mesh radio issue | Verify antenna is connected; check mesh channel config; reboot Gateway |
| Data gaps on Dashboard | Intermittent WAN | Check signal strength (cellular); verify Ethernet link; review buffer status |
| Slow data updates | High device count / low bandwidth | Check connected device count vs. capacity; reduce upload interval |
| Configuration lost | Firmware corruption | Factory reset and allow cloud re-provisioning |

### 8.2 LED Quick Reference

See *Section 4.2* for the complete LED reference table.

### 8.3 When to Contact Support

Contact WakeCap Support if:

- Issue persists after following troubleshooting procedures
- LED solid red after power cycle
- Physical damage to the enclosure or components
- Repeated connectivity failures without identifiable cause
- Firmware update failure

**Provide to support:**
- Gateway serial number
- Symptom description and LED pattern
- Diagnostic steps completed
- Screenshots from Dashboard (if available)
- Photos of the installation

---

## 9. Safety Information

### 9.1 General Safety

> **WARNING**
>
> **Read all safety information before installing, operating, or servicing the Gateway.** Failure to follow safety instructions may result in equipment damage, personal injury, or death.

### 9.2 Electrical Safety

> **WARNING**
>
> **Electrical hazard.** The Gateway operates on DC power. De-energize the power source and verify zero voltage before connecting, disconnecting, or servicing electrical connections. Contact with energized conductors can cause electrical shock.

> **CAUTION**
>
> **Reverse polarity protection.** While the Gateway includes basic reverse polarity protection, sustained reverse voltage may damage internal components. Always verify polarity before applying power.

### 9.3 Radio Frequency Safety

> **CAUTION**
>
> **RF exposure.** The Gateway transmits radio frequency energy. Maintain a minimum separation distance of [TBD] mm between the antenna and persons during operation. Do not operate the device with the antenna removed or damaged.

### 9.4 Environmental Hazards

> **NOTICE**
>
> **Operating conditions.** The Gateway is rated for outdoor use within the specified environmental limits (see Section 3.3). Operating outside these limits may cause malfunction or permanent damage not covered by warranty.

### 9.5 Installation Safety

> **WARNING**
>
> **Working at height.** If the Gateway is mounted at an elevated position, use appropriate fall-protection equipment and follow site safety procedures. Falls from height can cause serious injury or death.

> **NOTICE**
>
> **ESD precautions.** Handle internal components with ESD precautions. Touch a grounded metal surface before handling the processor board or radio modules.

### 9.6 PPE Requirements

The following personal protective equipment is recommended during installation and maintenance:

- Safety helmet (mandatory on construction sites)
- Safety footwear
- High-visibility vest (if working near traffic or machinery)
- Fall-protection harness (if working at height)
- ESD wrist strap (if accessing internal components)

---

## Appendix A: Glossary

| Term | Definition |
|------|------------|
| APN | Access Point Name — cellular network configuration parameter |
| DHCP | Dynamic Host Configuration Protocol — automatic IP address assignment |
| DIN rail | Standard metal rail for mounting industrial control equipment |
| ESD | Electrostatic Discharge — sudden flow of static electricity |
| MQTT | Message Queuing Telemetry Transport — lightweight messaging protocol |
| NTP | Network Time Protocol — clock synchronization protocol |
| OTA | Over-the-Air — wireless delivery of firmware or configuration |
| RMA | Return Merchandise Authorization — process for returning defective hardware |
| SMA | SubMiniature version A — coaxial RF connector type |
| TLS | Transport Layer Security — cryptographic protocol for secure communication |
| WAN | Wide Area Network — network connecting to external/cloud services |

## Appendix B: Wiring Diagrams

[IMAGE: Complete wiring diagram showing Gateway power input, Ethernet connection, antenna, and SIM card with color-coded cable identification]

[IMAGE: Gateway connection to solar power system showing solar panel, charge controller, battery, and Gateway power input]

## Appendix C: Spare Parts List

See *Section 7.7* for the complete spare parts reference.

## Appendix D: Warranty Information

The WakeCap Gateway is covered by a [TBD]-year limited hardware warranty from the date of purchase. The warranty covers defects in materials and workmanship under normal use conditions.

**Not covered:**
- Damage from improper installation or operation outside specified conditions
- Damage from unauthorized modifications
- Damage from lightning, surge, or other acts of nature
- Normal wear and tear (antenna, seals, cables)

For warranty claims, contact WakeCap Support with the device serial number and proof of purchase.

## Appendix E: Compliance Declarations

| Standard | Status | Certificate Number |
|----------|--------|--------------------|
| CE (RED 2014/53/EU) | [TBD] | [TBD] |
| FCC Part 15, Subpart C | [TBD] | [TBD] |
| IC RSS-247 | [TBD] | [TBD] |
| RoHS (2011/65/EU) | [TBD] | [TBD] |
| REACH | [TBD] | [TBD] |

---

## Related Documents

| Document | ID |
|----------|----|
| Product Datasheet | WC-GW-DS-v1.0 |
| Installation Guide | WC-GW-IG-v1.0 |
| Commissioning Guide | WC-GW-CG-v1.0 |
| Quick Reference | WC-GW-QR-v1.0 |
| Troubleshooting Guide | WC-GW-TG-v1.0 |
| Maintenance Manual | WC-GW-MG-v1.0 |
| Technical Reference | WC-GW-TR-v1.0 |
| Interface Control Document | WC-GW-ICD-v1.0 |

---

**WakeCap Technologies**
[TBD - Address]
[TBD - Website]
Support: [TBD - Email] | [TBD - Phone]

(c) 2026 WakeCap Technologies. All rights reserved.

# WakeCap Gateway

## Interface Control Document

---

| Field | Value |
|-------|-------|
| **Document ID** | WC-GW-ICD-v1.0 |
| **Version** | 1.0 |
| **Date** | 2026-02-09 |
| **Product** | WakeCap Gateway |
| **Product Code** | GW |
| **Document Type** | Interface Control Document (ICD) |
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

1. [Purpose and Scope](#1-purpose-and-scope)
2. [Interface Summary](#2-interface-summary)
3. [Electrical Interface Details](#3-electrical-interface-details)
4. [Protocol Specifications](#4-protocol-specifications)
5. [Data Model](#5-data-model)
6. [Error Handling](#6-error-handling)
7. [Example Transactions and Test Vectors](#7-example-transactions-and-test-vectors)
8. [Compatibility and Versioning Rules](#8-compatibility-and-versioning-rules)
9. [Related Documents](#9-related-documents)

---

## 1. Purpose and Scope

### 1.1 Purpose

This Interface Control Document (ICD) defines the electrical, protocol, and data-level specifications for every external interface on the WakeCap Gateway. It serves as the authoritative reference for integration engineers, firmware developers, cloud platform engineers, and third-party system integrators who must interface with the Gateway.

### 1.2 Scope

This document covers the following Gateway interfaces:

- Mesh radio (WakeCap proprietary wireless mesh)
- Ethernet (RJ45, 10/100 Mbps)
- Cellular (4G LTE modem)
- USB (local configuration and diagnostics)
- DC power input
- SIM card slot
- Antenna port (SMA)

For each interface, the document specifies:

- Physical and electrical characteristics (connector, pinout, voltage levels)
- Protocol framing, timing, and retry behavior
- Data message formats with field-level definitions
- Error handling and recovery procedures

### 1.3 Intended Audience

- Firmware engineers developing Gateway or field device software
- Cloud platform engineers integrating with Gateway data streams
- Systems integrators connecting WakeCap to third-party SCADA, BMS, or IT systems
- Field engineers performing interface verification during commissioning

### 1.4 Reference Architecture

[IMAGE: High-level interface diagram showing the WakeCap Gateway with labeled interface arrows: mesh radio to field devices, Ethernet to LAN, cellular to WAN, USB to laptop, DC power from supply, SIM card, and antenna]

### 1.5 Conventions

Throughout this document:

- All voltages are in **V DC** unless otherwise noted
- All currents are in **mA** unless otherwise noted
- All frequencies are in **MHz** unless otherwise noted
- All data rates are in **kbps** or **Mbps** as specified
- All temperatures are in **degrees Celsius (C)**
- Pin numbering follows manufacturer connector datasheets
- Byte order is **big-endian (network byte order)** unless otherwise noted
- [TBD] indicates a value pending hardware or firmware finalization

---

## 2. Interface Summary

### 2.1 Interface Overview Table

| # | Interface | Type | Direction | Connector | Protocol | Data Rate | Notes |
|---|-----------|------|-----------|-----------|----------|-----------|-------|
| IF-01 | Mesh Radio | Wireless RF | Bidirectional | Internal (antenna via SMA) | WakeCap Mesh Protocol (WMP) | [TBD] kbps | Proprietary mesh network |
| IF-02 | Ethernet | Wired, copper | Bidirectional | RJ45 (8P8C) | TCP/IP, MQTT over TLS | 10/100 Mbps | IEEE 802.3 |
| IF-03 | Cellular | Wireless RF | Bidirectional | Internal (antenna via [TBD]) | TCP/IP, MQTT over TLS | [TBD] Mbps UL / [TBD] Mbps DL | 4G LTE Cat [TBD] |
| IF-04 | USB | Wired | Bidirectional | USB Type [TBD] | [TBD] serial / CLI | [TBD] kbps | Local configuration only |
| IF-05 | DC Power Input | Wired | Input only | [TBD] barrel / terminal | N/A (electrical) | N/A | [TBD] V DC |
| IF-06 | SIM Card Slot | Contact-based | Bidirectional | [TBD] SIM tray | ISO 7816 / ETSI TS 102.221 | N/A | Nano or Micro SIM |
| IF-07 | Antenna Port | RF coaxial | N/A (passive) | SMA female | N/A (RF feed) | N/A | 50 ohm impedance |

### 2.2 Interface Location Diagram

[IMAGE: Gateway enclosure diagram with numbered callouts showing the physical location of each interface: IF-01 through IF-07, front/top/bottom views]

### 2.3 Interface Dependency Matrix

| Interface | Depends On | Required For |
|-----------|-----------|-------------|
| IF-01 Mesh Radio | IF-05 Power, IF-07 Antenna | Field device data collection |
| IF-02 Ethernet | IF-05 Power | Cloud uplink (primary or failover) |
| IF-03 Cellular | IF-05 Power, IF-06 SIM | Cloud uplink (primary or failover) |
| IF-04 USB | IF-05 Power | Local configuration, diagnostics |
| IF-05 DC Power | None | All other interfaces |
| IF-06 SIM | IF-05 Power | IF-03 Cellular operation |
| IF-07 Antenna | None (passive) | IF-01 Mesh Radio RF performance |

---

## 3. Electrical Interface Details

### 3.1 IF-01: Mesh Radio

The mesh radio is an internal module. Its RF interface is exposed externally through the SMA antenna connector (IF-07).

| Parameter | Symbol | Min | Typ | Max | Unit |
|-----------|--------|-----|-----|-----|------|
| Operating Frequency | f_mesh | [TBD] | [TBD] | [TBD] | MHz |
| Transmit Power | P_TX | [TBD] | [TBD] | [TBD] | dBm |
| Receiver Sensitivity | P_RX_min | — | [TBD] | — | dBm |
| Channel Bandwidth | BW | — | [TBD] | — | kHz |
| Number of Channels | N_CH | — | [TBD] | — | — |
| Antenna Impedance | Z_ANT | — | 50 | — | ohm |
| Modulation | — | — | [TBD] | — | — |
| Data Rate (over-air) | R_OTA | — | [TBD] | — | kbps |
| Duty Cycle (regulatory max) | — | — | — | [TBD] | % |

> **CAUTION**
>
> Do not exceed the maximum transmit power setting. Exceeding regulatory limits may violate local telecommunications law and void device certification.

### 3.2 IF-02: Ethernet

| Parameter | Value | Unit |
|-----------|-------|------|
| Standard | IEEE 802.3, 802.3u | — |
| Speed | 10/100 (auto-negotiation) | Mbps |
| Duplex | Full / Half (auto-negotiation) | — |
| Connector | RJ45 (8P8C), shielded | — |
| Cable Requirement | Cat5e or better, shielded recommended | — |
| Maximum Cable Length | 100 | m |
| MDI/MDI-X | Auto | — |
| PoE Support | [TBD] | — |

#### 3.2.1 Ethernet Pinout (T-568B)

| Pin | Signal | Color (T-568B) | Direction |
|-----|--------|----------------|-----------|
| 1 | TX+ | White/Orange | Output |
| 2 | TX- | Orange | Output |
| 3 | RX+ | White/Green | Input |
| 4 | — | Blue | Reserved |
| 5 | — | White/Blue | Reserved |
| 6 | RX- | Green | Input |
| 7 | — | White/Brown | Reserved |
| 8 | — | Brown | Reserved |

#### 3.2.2 Ethernet LED Indicators

| LED | Color | State | Meaning |
|-----|-------|-------|---------|
| Link | Green | Solid | Link established |
| Link | Green | Off | No link |
| Activity | Amber | Blinking | Data traffic |
| Activity | Amber | Off | No traffic |

### 3.3 IF-03: Cellular

| Parameter | Value | Unit |
|-----------|-------|------|
| Technology | 4G LTE Cat [TBD] | — |
| Frequency Bands | [TBD] | — |
| Fallback | [TBD] (3G/2G) | — |
| Max Downlink Rate | [TBD] | Mbps |
| Max Uplink Rate | [TBD] | Mbps |
| Antenna Connector | [TBD] | — |
| Antenna Impedance | 50 | ohm |
| SIM Interface | See IF-06 | — |

#### 3.3.1 Cellular Module Electrical

| Parameter | Symbol | Min | Typ | Max | Unit |
|-----------|--------|-----|-----|-----|------|
| Module Supply Voltage | V_CEL | [TBD] | [TBD] | [TBD] | V DC |
| Current Draw (idle) | I_CEL_IDLE | — | [TBD] | — | mA |
| Current Draw (active TX) | I_CEL_TX | — | [TBD] | [TBD] | mA |
| Current Draw (peak burst) | I_CEL_PEAK | — | — | [TBD] | mA |

### 3.4 IF-04: USB

| Parameter | Value | Unit |
|-----------|-------|------|
| Standard | USB [TBD] | — |
| Connector (device side) | [TBD] | — |
| Connector (host side) | USB Type-A (standard) | — |
| Data Rate | [TBD] | kbps |
| Power Output (to host) | None | — |
| Voltage Level | [TBD] | V DC |
| ESD Protection | [TBD] kV (contact) / [TBD] kV (air) | — |

#### 3.4.1 USB Pinout

| Pin | Signal | Description |
|-----|--------|-------------|
| 1 | VBUS | +5 V DC (input from host, [TBD]) |
| 2 | D- | Data minus |
| 3 | D+ | Data plus |
| 4 | GND | Ground |
| — | Shield | Cable shield / chassis ground |

> **NOTICE**
>
> The USB port is intended for local configuration and diagnostics only. It is not designed for permanent connection or field data transfer.

### 3.5 IF-05: DC Power Input

> **WARNING**
>
> De-energize the power source before connecting or disconnecting the power interface. Verify zero voltage with a multimeter before touching any terminal. Contact with energized conductors can cause electrical shock.

| Parameter | Symbol | Min | Typ | Max | Unit |
|-----------|--------|-----|-----|-----|------|
| Input Voltage | V_IN | [TBD] | [TBD] | [TBD] | V DC |
| Input Current (idle) | I_IN_IDLE | — | [TBD] | — | mA |
| Input Current (active) | I_IN_ACT | — | [TBD] | [TBD] | mA |
| Input Current (peak) | I_IN_PEAK | — | — | [TBD] | mA |
| Power Consumption (idle) | P_IDLE | — | [TBD] | — | W |
| Power Consumption (active) | P_ACT | — | [TBD] | [TBD] | W |
| Reverse Polarity Protection | — | — | Yes (limited) | — | — |
| Overvoltage Protection | V_OVP | — | — | [TBD] | V DC |
| Undervoltage Lockout | V_UVLO | [TBD] | — | — | V DC |
| Inrush Current (at power-on) | I_INRUSH | — | — | [TBD] | mA |
| Ripple (max, peak-to-peak) | V_RIPPLE | — | — | [TBD] | mV pp |

#### 3.5.1 Power Connector Pinout

| Pin / Terminal | Signal | Description |
|----------------|--------|-------------|
| V+ (center / positive) | V_IN | Positive DC input |
| V- / GND (sleeve / negative) | GND | DC ground / return |
| Shield (if applicable) | PE | Protective earth / chassis ground |

Connector type: [TBD] barrel connector / [TBD] terminal block

> **CAUTION**
>
> Reversed polarity may permanently damage internal power regulation circuits. Always verify polarity with a multimeter before applying power.

### 3.6 IF-06: SIM Card Slot

| Parameter | Value | Unit |
|-----------|-------|------|
| SIM Form Factor | [TBD] (Nano / Micro / Mini) | — |
| Standard | ISO 7816, ETSI TS 102.221 | — |
| Voltage | [TBD] | V DC |
| Insertion Method | Push-push (push to insert, push to eject) | — |
| Hot-Swap | No (power off required) | — |

#### 3.6.1 SIM Pinout (per ISO 7816)

| Pin | Signal | Description |
|-----|--------|-------------|
| C1 | VCC | Supply voltage ([TBD] V DC) |
| C2 | RST | Reset |
| C3 | CLK | Clock |
| C5 | GND | Ground |
| C6 | VPP | Programming voltage (not used) |
| C7 | I/O | Data input/output |

> **NOTICE**
>
> Power off the Gateway before inserting or removing the SIM card. Hot-swapping the SIM is not supported and may corrupt the cellular module configuration.

### 3.7 IF-07: Antenna Port (SMA)

| Parameter | Value | Unit |
|-----------|-------|------|
| Connector Type | SMA female (jack) | — |
| Impedance | 50 | ohm |
| Frequency Range | [TBD] to [TBD] | MHz |
| Max Input Power | [TBD] | dBm |
| VSWR (with supplied antenna) | < [TBD]:1 | — |
| Mating Cycles | [TBD] | cycles |
| Torque (max) | [TBD] | N m |

> **CAUTION**
>
> Do not operate the Gateway without an antenna connected to the SMA port. Transmitting into an open or short-circuited antenna port can damage the radio module output stage.

[IMAGE: Close-up photo of the SMA antenna connector showing correct antenna mating orientation and hand-tightening position]

---

## 4. Protocol Specifications

### 4.1 IF-01: WakeCap Mesh Protocol (WMP)

#### 4.1.1 Protocol Overview

The WakeCap Mesh Protocol (WMP) is a proprietary wireless protocol operating on the [TBD] MHz ISM band. It provides reliable, low-power data transport between field devices and the Gateway.

| Parameter | Value | Unit |
|-----------|-------|------|
| Protocol Name | WakeCap Mesh Protocol (WMP) | — |
| Version | [TBD] | — |
| Topology | Star / Multi-hop mesh | — |
| Maximum Hops | [TBD] | hops |
| Maximum Devices (per Gateway) | [TBD] | — |
| Frame Size (max payload) | [TBD] | bytes |
| Addressing | [TBD]-bit device address | — |
| Network Identifier (PAN ID) | [TBD]-bit | — |
| Encryption | [TBD] | — |
| Authentication | [TBD] | — |

#### 4.1.2 Frame Structure

```
+--------+--------+---------+--------+----------+---------+-------+
| PRE    | SFD    | LEN     | HDR    | PAYLOAD  | MIC     | CRC   |
| [TBD]B | [TBD]B | [TBD]B  | [TBD]B | 0-[TBD]B | [TBD]B | [TBD]B|
+--------+--------+---------+--------+----------+---------+-------+
```

| Field | Size | Description |
|-------|------|-------------|
| PRE (Preamble) | [TBD] bytes | Synchronization sequence |
| SFD (Start Frame Delimiter) | [TBD] bytes | Frame start marker: `0x[TBD]` |
| LEN (Length) | [TBD] bytes | Payload length in bytes (unsigned) |
| HDR (Header) | [TBD] bytes | Frame type, addressing, sequence number |
| PAYLOAD | 0 to [TBD] bytes | Application data |
| MIC (Message Integrity Code) | [TBD] bytes | Encryption/authentication tag |
| CRC | [TBD] bytes | Frame check sequence (CRC-[TBD]) |

#### 4.1.3 Header Fields

| Field | Bits | Description |
|-------|------|-------------|
| Frame Type | [TBD] | 0x00=Data, 0x01=Ack, 0x02=Command, 0x03=Beacon, [TBD] |
| Source Address | [TBD] | Originating device address |
| Destination Address | [TBD] | Target device address (0x[TBD]=broadcast) |
| PAN ID | [TBD] | Network identifier |
| Sequence Number | [TBD] | Incremental frame counter for deduplication |
| Hop Count | [TBD] | Current hop count (decremented per hop) |
| Flags | [TBD] | ACK request, encryption, priority, [TBD] |

#### 4.1.4 Timing Parameters

| Parameter | Value | Unit |
|-----------|-------|------|
| Beacon Interval | [TBD] | ms |
| Device Report Interval (default) | [TBD] | s |
| Device Report Interval (configurable range) | [TBD] to [TBD] | s |
| ACK Timeout | [TBD] | ms |
| Retry Count (max) | [TBD] | — |
| Retry Backoff (per attempt) | [TBD] | ms |
| Association Timeout | [TBD] | s |
| Disassociation Timeout (device offline) | [TBD] | s |
| Channel Dwell Time (frequency hopping, if applicable) | [TBD] | ms |

#### 4.1.5 Association Procedure

1. Device powers on and listens for Gateway beacons on configured channel
2. Device sends Association Request containing device ID, device type, and firmware version
3. Gateway validates device credentials against its allow-list or cloud provisioning record
4. Gateway sends Association Response (accept or reject) with assigned short address
5. Device confirms association with an ACK
6. Gateway reports device association event to the cloud

#### 4.1.6 Mesh Routing

| Parameter | Value | Unit |
|-----------|-------|------|
| Routing Algorithm | [TBD] | — |
| Route Discovery Method | [TBD] | — |
| Route Table Size (per node) | [TBD] | entries |
| Route Timeout | [TBD] | s |
| Link Quality Metric | [TBD] (RSSI / LQI / ETX) | — |

### 4.2 IF-02 / IF-03: MQTT over TLS (Cloud Uplink)

The Gateway communicates with the WakeCap Cloud Platform using MQTT over TLS. This protocol applies to both the Ethernet (IF-02) and Cellular (IF-03) interfaces.

#### 4.2.1 MQTT Connection Parameters

| Parameter | Value | Unit |
|-----------|-------|------|
| MQTT Version | [TBD] (3.1.1 / 5.0) | — |
| Broker Hostname | [TBD] | — |
| Broker Port (TLS) | [TBD] | — |
| TLS Version | [TBD] (TLS 1.2 / 1.3) | — |
| Client Certificate Auth | [TBD] (Yes / No) | — |
| Client ID Format | `gw-[serial_number]` | — |
| Username | [TBD] | — |
| Password / Token | [TBD] | — |
| Keep-Alive Interval | [TBD] | s |
| Clean Session | [TBD] (True / False) | — |
| Max In-Flight (QoS 1) | [TBD] | messages |

#### 4.2.2 MQTT Topic Structure

| Topic Pattern | QoS | Direction | Description |
|---------------|-----|-----------|-------------|
| `wakecap/gw/[serial]/telemetry` | [TBD] | GW to Cloud | Aggregated device telemetry |
| `wakecap/gw/[serial]/status` | [TBD] | GW to Cloud | Gateway heartbeat and status |
| `wakecap/gw/[serial]/event` | [TBD] | GW to Cloud | Events (association, alerts, errors) |
| `wakecap/gw/[serial]/buffered` | [TBD] | GW to Cloud | Store-and-forward backlog data |
| `wakecap/gw/[serial]/cmd` | [TBD] | Cloud to GW | Commands (config update, reboot, OTA) |
| `wakecap/gw/[serial]/cmd/resp` | [TBD] | GW to Cloud | Command acknowledgement/response |
| `wakecap/gw/[serial]/ota` | [TBD] | Cloud to GW | Firmware update delivery |
| `wakecap/gw/[serial]/ota/status` | [TBD] | GW to Cloud | OTA update progress and result |
| `wakecap/gw/[serial]/diag` | [TBD] | GW to Cloud | Diagnostic logs |

#### 4.2.3 MQTT Timing and Retry

| Parameter | Value | Unit |
|-----------|-------|------|
| Initial Connection Timeout | [TBD] | s |
| Reconnect Delay (initial) | [TBD] | s |
| Reconnect Delay (max, exponential backoff) | [TBD] | s |
| Reconnect Jitter | [TBD] | ms |
| Publish Retry (QoS 1, max attempts) | [TBD] | — |
| Publish Retry Interval | [TBD] | s |
| Heartbeat (status) Interval | [TBD] | s |
| Telemetry Upload Interval (default) | [TBD] | s |
| Telemetry Upload Interval (configurable) | [TBD] to [TBD] | s |

#### 4.2.4 TLS Configuration

| Parameter | Value |
|-----------|-------|
| TLS Version (minimum) | [TBD] |
| Cipher Suites | [TBD] |
| Certificate Authority | [TBD] (WakeCap Root CA / public CA) |
| Client Certificate | [TBD] |
| Certificate Rotation | [TBD] |
| Certificate Pinning | [TBD] (Yes / No) |
| OCSP Stapling | [TBD] (Yes / No) |

#### 4.2.5 WAN Failover Behavior

| Parameter | Value | Unit |
|-----------|-------|------|
| Primary WAN | [TBD] (Cellular / Ethernet, configurable) | — |
| Secondary WAN | [TBD] | — |
| Failover Detection Time | [TBD] | s |
| Failover Trigger | [TBD] (MQTT disconnect / ICMP timeout / [TBD]) | — |
| Failback Behavior | [TBD] (automatic / manual) | — |
| Failback Detection Time | [TBD] | s |

### 4.3 IF-04: USB Configuration Protocol

| Parameter | Value | Unit |
|-----------|-------|------|
| Serial Protocol | [TBD] (CDC ACM / virtual COM port) | — |
| Baud Rate | [TBD] | bps |
| Data Bits | [TBD] | — |
| Parity | [TBD] | — |
| Stop Bits | [TBD] | — |
| Flow Control | [TBD] | — |
| Command Interface | [TBD] (CLI / JSON-RPC / AT commands) | — |
| Authentication | [TBD] (password / certificate / none) | — |
| Session Timeout | [TBD] | s |

#### 4.3.1 USB CLI Command Set (if CLI-based)

| Command | Description | Example |
|---------|-------------|---------|
| `status` | Display Gateway status summary | `> status` |
| `config show` | Display current configuration | `> config show` |
| `config set [key] [value]` | Set a configuration parameter | `> config set mesh_channel [TBD]` |
| `config save` | Save configuration to non-volatile storage | `> config save` |
| `network status` | Display WAN and mesh network status | `> network status` |
| `mesh devices` | List associated mesh devices | `> mesh devices` |
| `diag log` | Display recent diagnostic log entries | `> diag log` |
| `firmware version` | Display firmware and bootloader versions | `> firmware version` |
| `reboot` | Reboot the Gateway | `> reboot` |
| `factory-reset` | Reset to factory defaults (requires confirmation) | `> factory-reset` |

---

## 5. Data Model

### 5.1 Telemetry Message Format

Telemetry messages are published to the `wakecap/gw/[serial]/telemetry` MQTT topic. The payload is [TBD] (JSON / CBOR / Protocol Buffers).

#### 5.1.1 Telemetry Payload Structure (JSON representation)

```json
{
  "gw_serial": "[TBD]",
  "gw_fw_ver": "[TBD]",
  "timestamp": "[TBD] (ISO 8601 / Unix epoch ms)",
  "seq": "[TBD] (uint32)",
  "devices": [
    {
      "dev_id": "[TBD] (device unique ID)",
      "dev_type": "[TBD] (WS / HAT / ANCHOR / MODBUS)",
      "dev_fw_ver": "[TBD]",
      "rssi": "[TBD] (int8, dBm)",
      "lqi": "[TBD] (uint8, 0-255)",
      "hops": "[TBD] (uint8)",
      "last_seen": "[TBD] (ISO 8601 / Unix epoch ms)",
      "battery_v": "[TBD] (float, V DC)",
      "battery_pct": "[TBD] (uint8, %)",
      "readings": [
        {
          "sensor": "[TBD] (sensor type identifier)",
          "value": "[TBD] (float/int)",
          "unit": "[TBD]",
          "ts": "[TBD] (ISO 8601 / Unix epoch ms)"
        }
      ]
    }
  ]
}
```

#### 5.1.2 Telemetry Field Definitions

| Field | Type | Range | Scale | Unit | Description |
|-------|------|-------|-------|------|-------------|
| gw_serial | string | [TBD] chars | — | — | Gateway serial number |
| gw_fw_ver | string | Semantic version | — | — | Gateway firmware version |
| timestamp | string/uint64 | [TBD] | [TBD] | ms (if epoch) | Message generation timestamp |
| seq | uint32 | 0 to 4294967295 | 1 | — | Sequence counter, wraps at max |
| dev_id | string | [TBD] chars | — | — | Device unique identifier |
| dev_type | string/enum | WS, HAT, ANCHOR, MODBUS | — | — | Device type code |
| dev_fw_ver | string | Semantic version | — | — | Device firmware version |
| rssi | int8 | [TBD] to 0 | 1 | dBm | Received signal strength at Gateway |
| lqi | uint8 | 0 to 255 | 1 | — | Link quality indicator |
| hops | uint8 | 1 to [TBD] | 1 | — | Number of mesh hops to Gateway |
| last_seen | string/uint64 | [TBD] | [TBD] | ms (if epoch) | Last data reception timestamp |
| battery_v | float32 | [TBD] to [TBD] | 0.01 | V DC | Device battery voltage |
| battery_pct | uint8 | 0 to 100 | 1 | % | Estimated battery remaining |
| sensor | string/enum | [TBD] | — | — | Sensor type identifier |
| value | float32/int32 | Sensor-dependent | Sensor-dependent | Sensor-dependent | Sensor reading value |
| unit | string | [TBD] | — | — | Engineering unit string |
| ts | string/uint64 | [TBD] | [TBD] | ms (if epoch) | Sensor reading timestamp |

### 5.2 Gateway Status Message Format

Status messages are published to `wakecap/gw/[serial]/status` at the configured heartbeat interval.

```json
{
  "gw_serial": "[TBD]",
  "gw_fw_ver": "[TBD]",
  "timestamp": "[TBD]",
  "uptime_s": "[TBD] (uint32, seconds)",
  "wan_type": "[TBD] (ethernet / cellular)",
  "wan_ip": "[TBD]",
  "wan_rssi": "[TBD] (int8, dBm, cellular only)",
  "wan_status": "[TBD] (connected / disconnected / connecting)",
  "mesh_status": "[TBD] (active / inactive / error)",
  "mesh_device_count": "[TBD] (uint16)",
  "buffer_used_pct": "[TBD] (uint8, %)",
  "buffer_msg_count": "[TBD] (uint32)",
  "cpu_usage_pct": "[TBD] (uint8, %)",
  "mem_usage_pct": "[TBD] (uint8, %)",
  "temp_c": "[TBD] (float, internal temperature, C)",
  "errors": ["[TBD] (array of active error codes)"]
}
```

#### 5.2.1 Status Field Definitions

| Field | Type | Range | Scale | Unit | Description |
|-------|------|-------|-------|------|-------------|
| uptime_s | uint32 | 0 to 4294967295 | 1 | s | Time since last boot |
| wan_type | string/enum | ethernet, cellular | — | — | Active WAN interface |
| wan_ip | string | IPv4 dotted decimal | — | — | Current WAN IP address |
| wan_rssi | int8 | [TBD] to 0 | 1 | dBm | Cellular signal strength (cellular only) |
| wan_status | string/enum | connected, disconnected, connecting | — | — | WAN connection state |
| mesh_status | string/enum | active, inactive, error | — | — | Mesh radio state |
| mesh_device_count | uint16 | 0 to [TBD] | 1 | — | Number of associated devices |
| buffer_used_pct | uint8 | 0 to 100 | 1 | % | Store-and-forward buffer usage |
| buffer_msg_count | uint32 | 0 to [TBD] | 1 | — | Messages in buffer |
| cpu_usage_pct | uint8 | 0 to 100 | 1 | % | CPU utilization |
| mem_usage_pct | uint8 | 0 to 100 | 1 | % | Memory utilization |
| temp_c | float32 | [TBD] to [TBD] | 0.1 | C | Internal enclosure temperature |
| errors | array of string | [TBD] | — | — | Active error codes (see Section 6) |

### 5.3 Event Message Format

Events are published to `wakecap/gw/[serial]/event` for significant system occurrences.

```json
{
  "gw_serial": "[TBD]",
  "timestamp": "[TBD]",
  "event_type": "[TBD]",
  "severity": "[TBD] (info / warning / error / critical)",
  "source": "[TBD] (gateway / device / network)",
  "dev_id": "[TBD] (if device-related, null otherwise)",
  "message": "[TBD] (human-readable description)",
  "data": {}
}
```

#### 5.3.1 Event Types

| Event Type Code | Severity | Source | Description |
|-----------------|----------|--------|-------------|
| `dev_associated` | info | device | Device joined mesh network |
| `dev_disassociated` | warning | device | Device left mesh network |
| `dev_offline` | warning | device | Device not heard within timeout |
| `dev_online` | info | device | Device reconnected after offline |
| `dev_low_battery` | warning | device | Battery below threshold ([TBD] V DC) |
| `gw_wan_connected` | info | network | WAN connection established |
| `gw_wan_disconnected` | warning | network | WAN connection lost |
| `gw_wan_failover` | warning | network | Switched to secondary WAN |
| `gw_wan_failback` | info | network | Returned to primary WAN |
| `gw_buffer_high` | warning | gateway | Buffer usage above [TBD] % |
| `gw_buffer_full` | critical | gateway | Buffer full, data may be lost |
| `gw_ota_started` | info | gateway | Firmware update started |
| `gw_ota_complete` | info | gateway | Firmware update completed |
| `gw_ota_failed` | error | gateway | Firmware update failed |
| `gw_reboot` | info | gateway | Gateway rebooted |
| `gw_error` | error | gateway | Hardware or software error |

### 5.4 Command Message Format

Commands are received from the cloud on `wakecap/gw/[serial]/cmd`.

```json
{
  "cmd_id": "[TBD] (unique command identifier, UUID)",
  "cmd_type": "[TBD]",
  "timestamp": "[TBD]",
  "params": {}
}
```

#### 5.4.1 Command Types

| Command Type | Description | Parameters |
|-------------|-------------|------------|
| `config_update` | Update Gateway configuration | `{ "key": "value", ... }` |
| `reboot` | Reboot the Gateway | `{ "delay_s": [TBD] }` |
| `ota_start` | Initiate firmware update | `{ "fw_ver": "[TBD]", "url": "[TBD]", "checksum": "[TBD]" }` |
| `diag_request` | Request diagnostic data upload | `{ "type": "[TBD]", "duration_s": [TBD] }` |
| `mesh_scan` | Perform mesh network scan | `{ "duration_s": [TBD] }` |
| `device_remove` | Remove a device from mesh | `{ "dev_id": "[TBD]" }` |
| `factory_reset` | Reset Gateway to factory defaults | `{ "confirm": true }` |

#### 5.4.2 Command Response Format

Responses are published to `wakecap/gw/[serial]/cmd/resp`.

```json
{
  "cmd_id": "[TBD] (matches original command)",
  "status": "[TBD] (accepted / rejected / completed / failed)",
  "timestamp": "[TBD]",
  "result": {},
  "error_code": "[TBD] (if failed)",
  "error_message": "[TBD] (if failed)"
}
```

### 5.5 Sensor Type Reference

| Sensor Type Code | Description | Value Type | Min | Max | Resolution | Unit |
|------------------|-------------|------------|-----|-----|------------|------|
| `temp_air` | Air temperature | float32 | [TBD] | [TBD] | [TBD] | C |
| `humidity` | Relative humidity | float32 | [TBD] | [TBD] | [TBD] | % RH |
| `pressure` | Barometric pressure | float32 | [TBD] | [TBD] | [TBD] | hPa |
| `wind_speed` | Wind speed | float32 | [TBD] | [TBD] | [TBD] | m/s |
| `wind_dir` | Wind direction | float32 | 0 | 360 | [TBD] | degrees |
| `rain_rate` | Rainfall rate | float32 | [TBD] | [TBD] | [TBD] | mm/h |
| `rain_accum` | Accumulated rainfall | float32 | [TBD] | [TBD] | [TBD] | mm |
| `solar_rad` | Solar irradiance | float32 | [TBD] | [TBD] | [TBD] | W/m2 |
| `uv_index` | UV index | float32 | [TBD] | [TBD] | [TBD] | — |
| `pm25` | Particulate matter 2.5 | float32 | [TBD] | [TBD] | [TBD] | ug/m3 |
| `noise` | Noise level | float32 | [TBD] | [TBD] | [TBD] | dBA |
| `accel_x` | Acceleration X-axis | float32 | [TBD] | [TBD] | [TBD] | g |
| `accel_y` | Acceleration Y-axis | float32 | [TBD] | [TBD] | [TBD] | g |
| `accel_z` | Acceleration Z-axis | float32 | [TBD] | [TBD] | [TBD] | g |
| `modbus_reg` | MODBUS register value | uint16/float32 | [TBD] | [TBD] | [TBD] | [TBD] |

---

## 6. Error Handling

### 6.1 IF-01: Mesh Radio Error Handling

| Error Condition | Detection Method | Gateway Response | Recovery | Max Retries |
|-----------------|-----------------|-----------------|----------|-------------|
| Frame CRC failure | CRC mismatch on received frame | Discard frame, increment error counter | Automatic (sender will retry) | N/A (receiver) |
| ACK timeout | No ACK received within [TBD] ms | Retransmit frame with exponential backoff | Automatic | [TBD] |
| Max retries exceeded | Retry counter reaches limit | Mark frame as failed, log error, report event | Drop frame, notify cloud | — |
| Association failure | No beacon or rejection response | Retry association with backoff | Device reboots after [TBD] failures | [TBD] |
| Mesh congestion | Collision rate above [TBD] % | Increase backoff window, reduce non-critical traffic | Automatic | — |
| Radio hardware fault | Module self-test failure | LED solid red, report `gw_error` event | Reboot; if persistent, safe mode | [TBD] |
| Interference detected | Noise floor above [TBD] dBm | Log warning, [TBD] (channel change if supported) | Automatic / manual channel change | — |

### 6.2 IF-02/IF-03: MQTT / Cloud Uplink Error Handling

| Error Condition | Detection Method | Gateway Response | Recovery | Max Retries |
|-----------------|-----------------|-----------------|----------|-------------|
| TLS handshake failure | Handshake timeout or certificate error | Log error, retry with backoff | Automatic reconnect | [TBD] |
| MQTT connection refused | CONNACK return code != 0 | Log error code, retry with backoff | Automatic; check credentials | [TBD] |
| MQTT keepalive timeout | No PINGRESP within timeout | Close connection, reconnect | Automatic reconnect | Infinite (with backoff) |
| Publish failure (QoS 1) | No PUBACK within [TBD] s | Retransmit, buffer to local storage | Automatic | [TBD] |
| WAN link down (Ethernet) | Link LED off, no carrier | Failover to cellular (if available) | Automatic failover | — |
| WAN link down (Cellular) | Registration lost, no signal | Failover to Ethernet (if available) | Automatic failover | — |
| DNS resolution failure | No response to DNS query | Retry DNS, fall back to cached IP | Automatic | [TBD] |
| Buffer overflow | Buffer usage reaches 100 % | Overwrite oldest data (FIFO), report `gw_buffer_full` event | Clear when uplink restored | — |
| Certificate expiry | Certificate validity check | Attempt certificate renewal, log critical error | OTA certificate update | — |

### 6.3 IF-04: USB Error Handling

| Error Condition | Detection Method | Gateway Response | Recovery |
|-----------------|-----------------|-----------------|----------|
| USB enumeration failure | Host does not detect device | No action (passive) | Reconnect cable; try different USB port |
| Invalid command | Unrecognized CLI input | Return error message: `ERROR: Unknown command` | User retries with valid command |
| Authentication failure | Incorrect password / token | Return `ERROR: Authentication failed`, lock after [TBD] attempts | Wait [TBD] s lockout, then retry |
| Session timeout | No input within [TBD] s | Close session, require re-authentication | Reconnect and re-authenticate |

### 6.4 IF-05: Power Error Handling

> **WARNING**
>
> Power-related faults may indicate hazardous conditions. De-energize the power source before investigating. Do not attempt to repair power supply circuits.

| Error Condition | Detection Method | Gateway Response | Recovery |
|-----------------|-----------------|-----------------|----------|
| Undervoltage (V_IN < [TBD] V DC) | Voltage monitor | Graceful shutdown if below UVLO | Restore supply voltage to rated range |
| Overvoltage (V_IN > [TBD] V DC) | Voltage monitor / OVP circuit | OVP circuit clamps or disconnects | Reduce supply voltage; replace OVP if tripped |
| Reverse polarity | Reverse polarity protection circuit | Protection diode blocks current (limited) | Correct wiring polarity |
| Overcurrent | [TBD] fuse / current limiter | Fuse blows / limiter activates | Identify short circuit, replace fuse ([TBD] A) |
| Power interruption | Voltage drops below UVLO | Graceful shutdown, data saved to non-volatile storage | Restore power; Gateway reboots automatically |

### 6.5 Error Code Reference

| Error Code | Severity | Interface | Description |
|------------|----------|-----------|-------------|
| E001 | critical | Power | Overvoltage detected |
| E002 | critical | Power | Undervoltage lockout triggered |
| E003 | error | Mesh Radio | Radio module initialization failure |
| E004 | warning | Mesh Radio | High collision rate on mesh channel |
| E005 | warning | Mesh Radio | No devices associated |
| E010 | error | Ethernet | Link down |
| E011 | error | Cellular | SIM not detected |
| E012 | error | Cellular | Registration failure |
| E013 | error | Cellular | No signal |
| E020 | error | MQTT | Connection refused by broker |
| E021 | warning | MQTT | Publish retry limit reached |
| E022 | warning | MQTT | Keepalive timeout |
| E030 | critical | System | Buffer overflow, data loss possible |
| E031 | error | System | Firmware update failure |
| E032 | warning | System | Internal temperature above threshold ([TBD] C) |
| E033 | error | System | Watchdog reset occurred |
| E040 | warning | USB | Authentication lockout |
| [TBD] | [TBD] | [TBD] | [TBD] |

---

## 7. Example Transactions and Test Vectors

### 7.1 Mesh Device Association (IF-01)

**Scenario:** A WakeCap Weather Station powers on and associates with the Gateway.

**Step 1 — Device listens for beacon:**

```
Direction: Gateway -> Broadcast
Frame Type: 0x03 (Beacon)
PAN ID: [TBD]
Source: Gateway address [TBD]
Destination: 0x[TBD] (broadcast)
Payload: { channel: [TBD], gw_serial: "[TBD]", capacity: [TBD] }
```

**Step 2 — Device sends association request:**

```
Direction: Device -> Gateway
Frame Type: 0x02 (Command)
PAN ID: [TBD]
Source: Device address [TBD]
Destination: Gateway address [TBD]
Flags: ACK requested
Payload: { cmd: "assoc_req", dev_id: "[TBD]", dev_type: "WS", fw_ver: "[TBD]" }
```

**Step 3 — Gateway sends ACK:**

```
Direction: Gateway -> Device
Frame Type: 0x01 (Ack)
Sequence: [matches request sequence]
```

**Step 4 — Gateway sends association response:**

```
Direction: Gateway -> Device
Frame Type: 0x02 (Command)
Payload: { cmd: "assoc_resp", status: "accepted", short_addr: [TBD], report_interval: [TBD] s }
```

**Step 5 — Device sends ACK:**

```
Direction: Device -> Gateway
Frame Type: 0x01 (Ack)
Sequence: [matches response sequence]
```

**Expected timing:** Steps 1-5 complete within [TBD] s.

### 7.2 Telemetry Upload (IF-02/IF-03)

**Scenario:** Gateway publishes a telemetry message containing one Weather Station reading.

**MQTT Publish:**

```
Topic: wakecap/gw/GW-00001/telemetry
QoS: [TBD]
Retain: false
```

**Payload (JSON):**

```json
{
  "gw_serial": "GW-00001",
  "gw_fw_ver": "1.0.0",
  "timestamp": "2026-02-09T12:00:00.000Z",
  "seq": 42,
  "devices": [
    {
      "dev_id": "WS-10001",
      "dev_type": "WS",
      "dev_fw_ver": "2.1.0",
      "rssi": -65,
      "lqi": 200,
      "hops": 1,
      "last_seen": "2026-02-09T11:59:55.000Z",
      "battery_v": 3.72,
      "battery_pct": 85,
      "readings": [
        {
          "sensor": "temp_air",
          "value": 34.5,
          "unit": "C",
          "ts": "2026-02-09T11:59:50.000Z"
        },
        {
          "sensor": "humidity",
          "value": 62.3,
          "unit": "% RH",
          "ts": "2026-02-09T11:59:50.000Z"
        },
        {
          "sensor": "wind_speed",
          "value": 4.7,
          "unit": "m/s",
          "ts": "2026-02-09T11:59:50.000Z"
        }
      ]
    }
  ]
}
```

**Expected response:** PUBACK from broker within [TBD] ms.

### 7.3 Cloud Command — Configuration Update (IF-02/IF-03)

**Scenario:** Cloud sends a command to change the telemetry upload interval.

**MQTT Received:**

```
Topic: wakecap/gw/GW-00001/cmd
```

```json
{
  "cmd_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "cmd_type": "config_update",
  "timestamp": "2026-02-09T12:05:00.000Z",
  "params": {
    "telemetry_interval_s": 30
  }
}
```

**MQTT Response Published:**

```
Topic: wakecap/gw/GW-00001/cmd/resp
```

```json
{
  "cmd_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "status": "completed",
  "timestamp": "2026-02-09T12:05:01.000Z",
  "result": {
    "telemetry_interval_s": 30,
    "applied": true
  },
  "error_code": null,
  "error_message": null
}
```

**Expected timing:** Response published within [TBD] s of command receipt.

### 7.4 WAN Failover (IF-02 to IF-03)

**Scenario:** Ethernet link goes down; Gateway fails over to cellular.

| Time (s) | Event | Interface | Observable |
|-----------|-------|-----------|------------|
| 0 | Ethernet link drops | IF-02 | Link LED off |
| [TBD] | Gateway detects link loss | IF-02 | Internal log: "E010 Ethernet link down" |
| [TBD] | Gateway initiates cellular connection | IF-03 | Cellular module power-up |
| [TBD] | Cellular registration complete | IF-03 | Signal acquired |
| [TBD] | MQTT connection re-established via cellular | IF-03 | Cloud status: Online |
| [TBD] | `gw_wan_failover` event published | IF-03 | Event visible in cloud |

**Total failover time:** < [TBD] s

### 7.5 USB Configuration Session (IF-04)

**Scenario:** Field engineer connects via USB to check status and change mesh channel.

```
> status
Gateway Serial: GW-00001
Firmware: 1.0.0
Uptime: 72h 15m 30s
WAN: cellular (connected, RSSI: -72 dBm)
Mesh: active (12 devices, channel [TBD])
Buffer: 0% (0 messages)
Temp: 38.2 C
Errors: none

> config set mesh_channel [TBD]
OK: mesh_channel set to [TBD]. Restart required.

> config save
OK: Configuration saved to non-volatile storage.

> reboot
Rebooting in 3 seconds...
```

### 7.6 Test Vectors

#### 7.6.1 CRC Test Vectors

| Input Data (hex) | CRC Algorithm | Expected CRC (hex) |
|-------------------|---------------|---------------------|
| [TBD] | CRC-[TBD] | [TBD] |
| [TBD] | CRC-[TBD] | [TBD] |
| [TBD] | CRC-[TBD] | [TBD] |

#### 7.6.2 Encryption Test Vectors

| Plaintext (hex) | Key (hex) | IV/Nonce (hex) | Ciphertext (hex) | MIC (hex) |
|-----------------|-----------|----------------|-------------------|-----------|
| [TBD] | [TBD] | [TBD] | [TBD] | [TBD] |
| [TBD] | [TBD] | [TBD] | [TBD] | [TBD] |

#### 7.6.3 Telemetry Encoding Test Vectors

| Sensor | Raw ADC Value | Scaled Value | Unit | Encoding (hex) |
|--------|---------------|-------------|------|----------------|
| temp_air | [TBD] | 34.5 | C | [TBD] |
| humidity | [TBD] | 62.3 | % RH | [TBD] |
| wind_speed | [TBD] | 4.7 | m/s | [TBD] |
| battery_v | [TBD] | 3.72 | V DC | [TBD] |

---

## 8. Compatibility and Versioning Rules

### 8.1 Interface Versioning

Each interface protocol carries a version identifier. The versioning follows semantic versioning (MAJOR.MINOR.PATCH):

| Interface | Current Version | Version Location |
|-----------|----------------|-----------------|
| WakeCap Mesh Protocol (WMP) | [TBD] | Beacon payload, association request |
| MQTT Topic Structure | [TBD] | Topic prefix (e.g., `v1/wakecap/...`) |
| USB CLI | [TBD] | `firmware version` command output |
| Telemetry Payload Schema | [TBD] | JSON field `schema_ver` (if present) |

### 8.2 Version Compatibility Matrix

| Gateway FW | WMP Version | MQTT Schema | USB CLI | Min Device FW | Cloud API |
|-----------|-------------|-------------|---------|---------------|-----------|
| [TBD] | [TBD] | [TBD] | [TBD] | [TBD] | [TBD] |
| [TBD] | [TBD] | [TBD] | [TBD] | [TBD] | [TBD] |
| [TBD] | [TBD] | [TBD] | [TBD] | [TBD] | [TBD] |

### 8.3 Backward Compatibility Rules

| Rule # | Rule | Applies To |
|--------|------|-----------|
| BC-01 | A MINOR version increment must not break existing device associations. Devices running older firmware must continue to associate and transmit data. | WMP |
| BC-02 | A MAJOR version increment may introduce breaking changes. A migration period of at least [TBD] days must be provided during which both old and new protocol versions are supported simultaneously. | WMP |
| BC-03 | New MQTT topic additions are always backward compatible. Existing topics must not be removed or renamed within the same MAJOR version. | MQTT |
| BC-04 | New telemetry payload fields may be added at any time. Consumers must ignore unrecognized fields (open schema). Existing fields must not be removed or have their type/unit changed within the same MAJOR version. | Telemetry Schema |
| BC-05 | USB CLI commands may be added in MINOR releases. Existing command syntax and output format must not change within the same MAJOR version. | USB CLI |
| BC-06 | Electrical interface specifications (connector type, voltage range, pinout) must not change without a hardware revision increment. | All electrical |

### 8.4 Deprecation Policy

| Phase | Duration | Action |
|-------|----------|--------|
| Announcement | [TBD] days before removal | Deprecated features documented in release notes; `DEPRECATED` tag added to relevant MQTT messages |
| Dual-support | [TBD] days | Both old and new interfaces operational simultaneously |
| Removal | After dual-support period | Old interface removed in next MAJOR release |
| End-of-life notice | [TBD] days before hardware EOL | Hardware interface EOL communicated to all integrators |

### 8.5 Change Control

All interface changes must follow the WakeCap Interface Change Request (ICR) process:

1. ICR submitted with proposed change, rationale, and impact assessment
2. Review by firmware, cloud, and integration teams
3. Compatibility impact analysis (backward/forward compatibility)
4. Approval by [TBD] (technical authority)
5. ICD document updated with new version
6. Change communicated to all known integrators at least [TBD] days before release

---

## 9. Related Documents

| Document ID | Title | Version | Relationship |
|-------------|-------|---------|-------------|
| WC-GW-DS-v1.0 | WakeCap Gateway Product Datasheet | 1.0 | Reference: summary specifications |
| WC-GW-PM-v1.0 | WakeCap Gateway Product Manual | 1.0 | Reference: full product documentation |
| WC-GW-IG-v1.0 | WakeCap Gateway Installation Guide | 1.0 | Reference: physical interface installation |
| WC-GW-CG-v1.0 | WakeCap Gateway Commissioning Guide | 1.0 | Reference: interface validation procedures |
| WC-GW-SIG-v1.0 | WakeCap Gateway System Integration Guide | 1.0 | Reference: system-level integration |
| WC-GW-SM-v1.0 | WakeCap Gateway Safety Manual | 1.0 | Reference: electrical and RF safety |
| WC-GW-TG-v1.0 | WakeCap Gateway Troubleshooting Guide | 1.0 | Reference: interface fault diagnosis |

---

*End of Document WC-GW-ICD-v1.0*

---

**WakeCap Technologies**
[TBD - Address]
[TBD - Website]
Support: [TBD - Email] | [TBD - Phone]

(c) 2026 WakeCap Technologies. All rights reserved.

# WakeCap Gateway -- Technical Reference

| Field             | Value                          |
|-------------------|--------------------------------|
| Document ID       | WC-GW-TR-v1.0                 |
| Document Type     | Technical Reference (TR)       |
| Product           | WakeCap Gateway                |
| Style             | Version B -- Technical/Field   |
| Classification    | [TBD]                          |
| Date              | 2026-02-09                     |
| Revision          | 1.0                            |
| Author            | [TBD]                          |
| Approved By       | [TBD]                          |

---

## Revision History

| Rev | Date       | Author | Description              |
|-----|------------|--------|--------------------------|
| 1.0 | 2026-02-09 | [TBD]  | Initial technical release |

---

## Table of Contents

1. [Technical Overview and Block Diagram](#1-technical-overview-and-block-diagram)
2. [Functional Architecture](#2-functional-architecture)
3. [Electrical Specifications and Power Profiles](#3-electrical-specifications-and-power-profiles)
4. [Environmental and Reliability Specifications](#4-environmental-and-reliability-specifications)
5. [Interfaces Deep Reference](#5-interfaces-deep-reference)
6. [Performance Characteristics and Limits](#6-performance-characteristics-and-limits)
7. [Firmware Behavior Notes and Safety Considerations](#7-firmware-behavior-notes-and-safety-considerations)
8. [Appendix](#8-appendix)

---

## 1. Technical Overview and Block Diagram

### 1.1 Purpose

The WakeCap Gateway is the central communications hub for WakeCap site deployments. It aggregates data from WakeCap mesh network devices (sensors, anchors, tags) and backhaults that data to the WakeCap cloud platform via cellular or Ethernet connectivity. The Gateway manages local mesh orchestration, performs edge-level data buffering, and provides a management interface for field technicians.

### 1.2 Product Identification

| Parameter               | Value                  |
|-------------------------|------------------------|
| Product Name            | WakeCap Gateway        |
| Model Number            | [TBD]                  |
| Hardware Revision       | [TBD]                  |
| Firmware Version (Base) | [TBD]                  |
| OEM Module References   | [TBD]                  |

### 1.3 System Context

The Gateway operates within the broader WakeCap ecosystem:

- **Downstream (Mesh Side):** Communicates with WakeCap Mesh Anchors, WakeCap Sensors, WakeCap Smart Helmets, and MODBUS Assets over a proprietary mesh radio protocol.
- **Upstream (Backhaul Side):** Transmits aggregated data to the WakeCap Cloud Platform via LTE-M/NB-IoT cellular or 10/100 Ethernet.
- **Local Management:** Provides a local configuration and diagnostic interface accessible over [TBD] (e.g., BLE, USB, local web UI).

### 1.4 High-Level Block Diagram

[IMAGE: System-level block diagram showing the WakeCap Gateway at center, with arrows to Mesh Anchors/Sensors on the left (mesh radio), WakeCap Cloud at the top (cellular/Ethernet), power input at the bottom, and a local management interface on the right. Internal blocks visible: processor, mesh radio module, cellular module, Ethernet PHY, power management, and local storage.]

### 1.5 Internal Architecture Block Diagram

[IMAGE: Detailed internal block diagram of the WakeCap Gateway PCB. Shows main processor/SoC connected via internal buses to: mesh radio transceiver (with antenna port), cellular module (with SIM slot and antenna port), Ethernet PHY (with RJ45 jack), flash storage, RAM, power management IC (with input connector, battery charger, voltage regulators), USB port, status LEDs, and debug/JTAG header. Include bus labels (SPI, UART, I2C, GPIO) between blocks.]

### 1.6 Reference Documents

| Document ID    | Title                                      |
|----------------|--------------------------------------------|
| [TBD]          | WakeCap Gateway Installation Guide         |
| [TBD]          | WakeCap Gateway Quick Start Guide          |
| WC-GW-SB-v1.0 | WakeCap Gateway Solution Brief             |
| WC-GW-CS-v1.0 | WakeCap Gateway Compliance Summary         |
| [TBD]          | WakeCap Cloud Platform API Reference       |
| [TBD]          | WakeCap Mesh Protocol Specification        |

---

## 2. Functional Architecture

### 2.1 Processor Subsystem

#### 2.1.1 Main Processor

| Parameter            | Value       |
|----------------------|-------------|
| Manufacturer         | [TBD]       |
| Part Number          | [TBD]       |
| Architecture         | [TBD]       |
| Core Count           | [TBD]       |
| Clock Frequency      | [TBD] MHz   |
| Flash (Internal)     | [TBD] MB    |
| RAM (Internal)       | [TBD] MB    |
| Operating Voltage    | [TBD] V     |

#### 2.1.2 Processor Functional Responsibilities

- Mesh network coordination and scheduling
- Data aggregation and local buffering
- Cellular/Ethernet backhaul management
- Firmware update orchestration (OTA and local)
- Watchdog supervision and fault recovery
- LED status indication control
- Configuration and provisioning management

#### 2.1.3 Boot Sequence

| Stage | Description                                        | Duration   |
|-------|----------------------------------------------------|------------|
| 1     | Power-on reset and hardware initialization         | [TBD] ms   |
| 2     | Bootloader validation and firmware integrity check | [TBD] ms   |
| 3     | OS/RTOS kernel initialization                      | [TBD] ms   |
| 4     | Peripheral and radio initialization                | [TBD] ms   |
| 5     | Network registration (cellular or Ethernet DHCP)   | [TBD] s    |
| 6     | Cloud handshake and time synchronization           | [TBD] s    |
| 7     | Mesh network start and anchor discovery            | [TBD] s    |
| **Total** | **Cold boot to operational**                   | **[TBD] s** |

### 2.2 Mesh Radio Subsystem

#### 2.2.1 Radio Module

| Parameter               | Value              |
|-------------------------|--------------------|
| Manufacturer            | [TBD]              |
| Part Number             | [TBD]              |
| Frequency Band          | [TBD] MHz          |
| Modulation              | [TBD]              |
| Channel Bandwidth       | [TBD] kHz          |
| Number of Channels      | [TBD]              |
| Max TX Power            | [TBD] dBm          |
| Receiver Sensitivity    | [TBD] dBm          |
| Data Rate (Air)         | [TBD] kbps         |
| Antenna Connector       | [TBD]              |
| Antenna Gain            | [TBD] dBi          |

#### 2.2.2 Mesh Protocol Overview

| Parameter                     | Value          |
|-------------------------------|----------------|
| Protocol Type                 | [TBD]          |
| Network Topology              | [TBD]          |
| Max Mesh Hops                 | [TBD]          |
| Time Synchronization Method   | [TBD]          |
| Slot Duration                 | [TBD] ms       |
| Superframe Period             | [TBD] ms       |
| Encryption                    | [TBD]          |
| Authentication                | [TBD]          |

#### 2.2.3 Mesh Capacity

| Parameter                        | Min    | Typ    | Max    | Unit   |
|----------------------------------|--------|--------|--------|--------|
| Supported Anchors per Gateway    | [TBD]  | [TBD]  | [TBD]  | nodes  |
| Supported Sensors per Gateway    | [TBD]  | [TBD]  | [TBD]  | nodes  |
| Supported Tags per Gateway       | [TBD]  | [TBD]  | [TBD]  | nodes  |
| Total Mesh Nodes per Gateway     | [TBD]  | [TBD]  | [TBD]  | nodes  |
| Mesh Join Time (single node)     | [TBD]  | [TBD]  | [TBD]  | s      |
| Mesh Recovery Time (anchor loss) | [TBD]  | [TBD]  | [TBD]  | s      |

### 2.3 Cellular Subsystem

#### 2.3.1 Cellular Module

| Parameter              | Value              |
|------------------------|--------------------|
| Manufacturer           | [TBD]              |
| Part Number            | [TBD]              |
| Supported Technologies | [TBD]              |
| LTE Bands              | [TBD]              |
| NB-IoT Bands           | [TBD]              |
| LTE-M Bands            | [TBD]              |
| Fallback (2G/3G)       | [TBD]              |
| Max Uplink Data Rate   | [TBD] kbps         |
| Max Downlink Data Rate | [TBD] kbps         |
| SIM Type               | [TBD]              |
| SIM Slot Count         | [TBD]              |
| Antenna Connector      | [TBD]              |
| Antenna Gain           | [TBD] dBi          |

#### 2.3.2 Cellular Behavior

| Parameter                          | Value       |
|------------------------------------|-------------|
| Network Registration Timeout       | [TBD] s     |
| Reconnection Retry Interval        | [TBD] s     |
| Max Reconnection Attempts          | [TBD]       |
| Data Compression Enabled           | [TBD]       |
| TLS Version                        | [TBD]       |
| Heartbeat Interval (to Cloud)      | [TBD] s     |
| Fallback to Ethernet on Cell Fail  | [TBD]       |

#### 2.3.3 SIM Provisioning

| Parameter                      | Value       |
|--------------------------------|-------------|
| SIM Type Supported             | [TBD]       |
| eSIM Support                   | [TBD]       |
| APN Configuration Method       | [TBD]       |
| Remote SIM Provisioning (RSP)  | [TBD]       |

### 2.4 Ethernet Subsystem

#### 2.4.1 Ethernet Interface

| Parameter               | Value              |
|-------------------------|--------------------|
| PHY Chip                | [TBD]              |
| Speed                   | [TBD] Mbps         |
| Duplex                  | [TBD]              |
| Connector               | RJ45               |
| Auto-MDIX              | [TBD]              |
| PoE Support             | [TBD]              |
| PoE Class               | [TBD]              |
| PoE Input Voltage Range | [TBD] V            |
| PoE Max Power Draw      | [TBD] W            |
| Cable Length (Max)       | [TBD] m            |
| IP Configuration        | [TBD]              |

#### 2.4.2 Ethernet Behavior

| Parameter                     | Value       |
|-------------------------------|-------------|
| DHCP Timeout                  | [TBD] s     |
| Static IP Fallback            | [TBD]       |
| Link Detection Interval       | [TBD] ms    |
| Priority (vs Cellular)        | [TBD]       |
| VLAN Support                  | [TBD]       |

### 2.5 Power Management Subsystem

#### 2.5.1 Power Architecture Overview

[IMAGE: Power management block diagram showing DC input path, optional PoE input path, battery charger, battery, and multiple regulated voltage rails feeding processor, mesh radio, cellular module, Ethernet PHY, and peripherals. Include enable/control lines from processor to power switches.]

#### 2.5.2 Primary Power Input

| Parameter               | Min     | Typ     | Max     | Unit   |
|--------------------------|---------|---------|---------|--------|
| Input Voltage (DC Jack)  | [TBD]   | [TBD]   | [TBD]   | V      |
| Input Current (Peak)     | [TBD]   | [TBD]   | [TBD]   | A      |
| Input Current (Avg)      | [TBD]   | [TBD]   | [TBD]   | A      |
| Connector Type           | [TBD]   | --      | --      | --     |
| Reverse Polarity Prot.   | [TBD]   | --      | --      | --     |
| Overvoltage Protection   | [TBD]   | --      | [TBD]   | V      |
| Surge Protection         | [TBD]   | --      | [TBD]   | kV     |

#### 2.5.3 Battery Backup (if equipped)

| Parameter                | Min     | Typ     | Max     | Unit   |
|--------------------------|---------|---------|---------|--------|
| Battery Chemistry        | [TBD]   | --      | --      | --     |
| Nominal Voltage          | [TBD]   | [TBD]   | [TBD]   | V      |
| Capacity                 | [TBD]   | [TBD]   | [TBD]   | mAh    |
| Charge Current           | [TBD]   | [TBD]   | [TBD]   | mA     |
| Charge Time (0-100%)     | [TBD]   | [TBD]   | [TBD]   | h      |
| Battery Runtime          | [TBD]   | [TBD]   | [TBD]   | h      |
| Low Battery Threshold    | --      | [TBD]   | --      | V      |
| Critical Shutdown Thresh.| --      | [TBD]   | --      | V      |
| Battery Temp. Protection | [TBD]   | --      | [TBD]   | deg C  |

#### 2.5.4 Internal Voltage Rails

| Rail Name     | Voltage (V) | Max Current (mA) | Regulator Type | Supplies             |
|---------------|-------------|-------------------|----------------|----------------------|
| VCC_CORE      | [TBD]       | [TBD]             | [TBD]          | Processor core       |
| VCC_IO        | [TBD]       | [TBD]             | [TBD]          | Processor I/O        |
| VCC_RADIO     | [TBD]       | [TBD]             | [TBD]          | Mesh radio module    |
| VCC_CELL      | [TBD]       | [TBD]             | [TBD]          | Cellular module      |
| VCC_ETH       | [TBD]       | [TBD]             | [TBD]          | Ethernet PHY         |
| VCC_PERIPH    | [TBD]       | [TBD]             | [TBD]          | LEDs, sensors, misc. |

### 2.6 Local Storage

| Parameter               | Value              |
|-------------------------|--------------------|
| Storage Type            | [TBD]              |
| Capacity                | [TBD] MB           |
| Interface               | [TBD]              |
| Read Speed              | [TBD] MB/s         |
| Write Speed             | [TBD] MB/s         |
| Wear Leveling           | [TBD]              |
| Data Retention          | [TBD] years        |
| Write Endurance         | [TBD] cycles       |

#### 2.6.1 Storage Partitions

| Partition         | Size (MB) | Purpose                                |
|-------------------|-----------|----------------------------------------|
| Bootloader        | [TBD]     | Primary and backup bootloader images   |
| Firmware A        | [TBD]     | Active firmware image                  |
| Firmware B        | [TBD]     | Backup/rollback firmware image         |
| Configuration     | [TBD]     | Device config, certificates, keys      |
| Data Buffer       | [TBD]     | Offline data store-and-forward         |
| Logs              | [TBD]     | System and diagnostic logs             |

#### 2.6.2 Store-and-Forward Buffer

| Parameter                       | Value       |
|---------------------------------|-------------|
| Max Buffered Messages           | [TBD]       |
| Max Buffer Duration             | [TBD] h     |
| Buffer Full Policy              | [TBD]       |
| Data Prioritization             | [TBD]       |
| Buffer Flush Rate (on reconnect)| [TBD] msg/s |

---

## 3. Electrical Specifications and Power Profiles

### 3.1 Absolute Maximum Ratings

> **WARNING:** Exceeding absolute maximum ratings may cause permanent damage to the WakeCap Gateway. These are stress ratings only; operation at or near these limits is not implied.

| Parameter                        | Min     | Max     | Unit   |
|----------------------------------|---------|---------|--------|
| DC Input Voltage                 | [TBD]   | [TBD]   | V      |
| ESD (HBM, all pins)             | --      | [TBD]   | kV     |
| ESD (CDM, all pins)             | --      | [TBD]   | kV     |
| Storage Temperature              | [TBD]   | [TBD]   | deg C  |
| Operating Temperature            | [TBD]   | [TBD]   | deg C  |
| Humidity (non-condensing)        | [TBD]   | [TBD]   | %RH    |
| Altitude                         | --      | [TBD]   | m      |
| Vibration (random, 3-axis)       | --      | [TBD]   | g(rms) |
| Shock (half-sine, 11 ms)        | --      | [TBD]   | g      |

### 3.2 Recommended Operating Conditions

| Parameter                        | Min     | Typ     | Max     | Unit   |
|----------------------------------|---------|---------|---------|--------|
| DC Input Voltage                 | [TBD]   | [TBD]   | [TBD]   | V      |
| Operating Temperature            | [TBD]   | [TBD]   | [TBD]   | deg C  |
| Humidity (non-condensing)        | [TBD]   | --      | [TBD]   | %RH    |
| Altitude                         | --      | --      | [TBD]   | m      |

### 3.3 Power Consumption Profiles

#### 3.3.1 System-Level Power Consumption

| Operating Mode                  | Min     | Typ     | Max     | Unit   |
|---------------------------------|---------|---------|---------|--------|
| Full Active (Cell + Mesh TX)    | [TBD]   | [TBD]   | [TBD]   | W      |
| Active (Mesh Only)              | [TBD]   | [TBD]   | [TBD]   | W      |
| Active (Ethernet Backhaul)      | [TBD]   | [TBD]   | [TBD]   | W      |
| Idle (Connected, No Traffic)    | [TBD]   | [TBD]   | [TBD]   | W      |
| Low Power / Sleep               | [TBD]   | [TBD]   | [TBD]   | mW     |
| Shutdown (Battery Maintenance)  | [TBD]   | [TBD]   | [TBD]   | uW     |

#### 3.3.2 Subsystem Power Breakdown (Typical Active)

| Subsystem           | Current (mA) | Voltage (V) | Power (mW) | % of Total |
|---------------------|-------------|-------------|------------|------------|
| Processor           | [TBD]       | [TBD]       | [TBD]      | [TBD]     |
| Mesh Radio (TX)     | [TBD]       | [TBD]       | [TBD]      | [TBD]     |
| Mesh Radio (RX)     | [TBD]       | [TBD]       | [TBD]      | [TBD]     |
| Cellular (TX Peak)  | [TBD]       | [TBD]       | [TBD]      | [TBD]     |
| Cellular (Idle)     | [TBD]       | [TBD]       | [TBD]      | [TBD]     |
| Ethernet PHY        | [TBD]       | [TBD]       | [TBD]      | [TBD]     |
| Storage (Active)    | [TBD]       | [TBD]       | [TBD]      | [TBD]     |
| LEDs (All On)       | [TBD]       | [TBD]       | [TBD]      | [TBD]     |
| Misc. / Overhead    | [TBD]       | [TBD]       | [TBD]      | [TBD]     |
| **Total**           | **[TBD]**   | --          | **[TBD]**  | **100%**  |

#### 3.3.3 Power Profile Over Time

[IMAGE: Time-domain power consumption graph showing typical Gateway power draw over a 60-second cycle. X-axis: time in seconds. Y-axis: current draw in mA. Annotated regions for mesh TX bursts, cellular uplink bursts, idle periods, and background processing. Show peak and average lines.]

### 3.4 Voltage Regulator Specifications

| Regulator | Input (V) | Output (V) | Accuracy (%) | Ripple (mV p-p) | Efficiency (%) | Type   |
|-----------|-----------|------------|-------------|-----------------|----------------|--------|
| VCC_CORE  | [TBD]     | [TBD]      | [TBD]       | [TBD]           | [TBD]          | [TBD]  |
| VCC_IO    | [TBD]     | [TBD]      | [TBD]       | [TBD]           | [TBD]          | [TBD]  |
| VCC_RADIO | [TBD]     | [TBD]      | [TBD]       | [TBD]           | [TBD]          | [TBD]  |
| VCC_CELL  | [TBD]     | [TBD]      | [TBD]       | [TBD]           | [TBD]          | [TBD]  |
| VCC_ETH   | [TBD]     | [TBD]      | [TBD]       | [TBD]           | [TBD]          | [TBD]  |

### 3.5 Conducted Emissions Profile

| Frequency Range       | Limit (dBuV) | Standard            |
|-----------------------|-------------|----------------------|
| [TBD] kHz - [TBD] MHz | [TBD]       | [TBD]               |
| [TBD] MHz - [TBD] MHz | [TBD]       | [TBD]               |
| [TBD] MHz - [TBD] GHz | [TBD]       | [TBD]               |

---

## 4. Environmental and Reliability Specifications

### 4.1 Environmental Ratings

| Parameter                          | Min     | Typ     | Max     | Unit   | Notes           |
|------------------------------------|---------|---------|---------|--------|-----------------|
| Operating Temperature              | [TBD]   | [TBD]   | [TBD]   | deg C  | At full load    |
| Storage Temperature                | [TBD]   | --      | [TBD]   | deg C  | No battery      |
| Storage Temperature (with battery) | [TBD]   | --      | [TBD]   | deg C  | Battery limits  |
| Operating Humidity                 | [TBD]   | --      | [TBD]   | %RH    | Non-condensing  |
| Storage Humidity                   | [TBD]   | --      | [TBD]   | %RH    | Non-condensing  |
| Operating Altitude                 | [TBD]   | --      | [TBD]   | m      |                 |
| Ingress Protection (Enclosure)     | --      | [TBD]   | --      | IP     | IEC 60529       |
| UV Resistance                      | --      | [TBD]   | --      | --     | UV-stabilized   |
| Salt Fog Resistance                | --      | [TBD]   | --      | h      | IEC 60068-2-52  |

### 4.2 Mechanical Specifications

| Parameter                | Value              | Unit   |
|--------------------------|--------------------|--------|
| Dimensions (L x W x H)  | [TBD] x [TBD] x [TBD] | mm |
| Weight (without cables)  | [TBD]              | g      |
| Weight (with battery)    | [TBD]              | g      |
| Enclosure Material       | [TBD]              | --     |
| Enclosure Color          | [TBD]              | --     |
| Mounting Method          | [TBD]              | --     |
| Mounting Hardware        | [TBD]              | --     |
| Cable Entry              | [TBD]              | --     |
| Cable Gland Size         | [TBD]              | --     |

[IMAGE: Mechanical drawing of the WakeCap Gateway showing front, side, and bottom views with dimensioned callouts in millimeters. Include mounting hole pattern, cable entry locations, LED window, and antenna port positions.]

### 4.3 Reliability Data

| Parameter                          | Value       | Unit       | Notes                    |
|------------------------------------|-------------|------------|--------------------------|
| MTBF (Predicted, Telcordia SR-332) | [TBD]       | h          | Ground, fixed, 40 deg C  |
| MTBF (Predicted, MIL-HDBK-217F)   | [TBD]       | h          | Ground, fixed, 40 deg C  |
| Design Life                        | [TBD]       | years      | Normal operating cond.   |
| Warranty Period                    | [TBD]       | years      | Standard warranty        |
| Firmware Update Cycles             | [TBD]       | cycles     | Flash write endurance    |
| Power Cycle Endurance              | [TBD]       | cycles     |                          |
| Connector Mate/Unmate Cycles       | [TBD]       | cycles     | All external connectors  |

### 4.4 Thermal Performance

#### 4.4.1 Thermal Derating Curve

[IMAGE: Thermal derating curve graph. X-axis: ambient temperature in deg C from -40 to +85. Y-axis: maximum allowable power dissipation in watts (0 to Max). Show the flat region from low temp to the derating onset temperature, then linear derating down to zero at max junction temperature. Annotate key inflection points with temperature and power values.]

#### 4.4.2 Thermal Management

| Parameter                            | Value       | Unit   |
|--------------------------------------|-------------|--------|
| Max Junction Temperature             | [TBD]       | deg C  |
| Thermal Resistance (junction-case)   | [TBD]       | deg C/W|
| Thermal Resistance (case-ambient)    | [TBD]       | deg C/W|
| Cooling Method                       | [TBD]       | --     |
| Internal Airflow                     | [TBD]       | --     |
| Thermal Shutdown Threshold           | [TBD]       | deg C  |
| Thermal Shutdown Hysteresis          | [TBD]       | deg C  |

### 4.5 Mechanical Stress Testing

| Test                         | Standard           | Level        | Duration    | Result   |
|------------------------------|--------------------|-------------|-------------|----------|
| Vibration (sinusoidal)       | IEC 60068-2-6      | [TBD] g     | [TBD] h     | [TBD]    |
| Vibration (random)           | IEC 60068-2-64     | [TBD] g(rms)| [TBD] h     | [TBD]    |
| Mechanical Shock             | IEC 60068-2-27     | [TBD] g     | [TBD] ms    | [TBD]    |
| Free Fall (packaged)         | IEC 60068-2-31     | [TBD] m     | [TBD] drops | [TBD]    |
| Free Fall (unpackaged)       | [TBD]              | [TBD] m     | [TBD] drops | [TBD]    |

### 4.6 Environmental Stress Testing

| Test                         | Standard           | Condition              | Duration    | Result   |
|------------------------------|--------------------|------------------------|-------------|----------|
| Dry Heat                     | IEC 60068-2-2      | [TBD] deg C            | [TBD] h     | [TBD]    |
| Cold                         | IEC 60068-2-1      | [TBD] deg C            | [TBD] h     | [TBD]    |
| Thermal Cycling              | IEC 60068-2-14     | [TBD] to [TBD] deg C   | [TBD] cycles| [TBD]    |
| Damp Heat (Steady State)     | IEC 60068-2-78     | [TBD] deg C / [TBD] %RH| [TBD] h     | [TBD]    |
| Damp Heat (Cyclic)           | IEC 60068-2-30     | [TBD] deg C / [TBD] %RH| [TBD] cycles| [TBD]    |
| Salt Fog                     | IEC 60068-2-52     | [TBD]% NaCl            | [TBD] h     | [TBD]    |
| UV Exposure                  | [TBD]              | [TBD]                  | [TBD] h     | [TBD]    |
| Dust Ingress (IP6X)          | IEC 60529          | [TBD]                  | [TBD] h     | [TBD]    |
| Water Ingress (IPX5/X6/X7)   | IEC 60529          | [TBD]                  | [TBD]       | [TBD]    |

---

## 5. Interfaces Deep Reference

### 5.1 Interface Summary

| Interface          | Connector       | Direction  | Protocol         | Speed         |
|--------------------|-----------------|-----------|------------------|---------------|
| DC Power Input     | [TBD]           | Input      | --               | --            |
| Ethernet           | RJ45            | Bidir      | 10/100 Ethernet  | [TBD] Mbps    |
| Mesh Radio         | [TBD] (Antenna) | Bidir      | [TBD]            | [TBD] kbps    |
| Cellular           | [TBD] (Antenna) | Bidir      | LTE-M/NB-IoT    | [TBD] kbps    |
| USB                | [TBD]           | Bidir      | [TBD]            | [TBD] Mbps    |
| Debug/JTAG         | [TBD]           | Bidir      | [TBD]            | --            |
| SIM Card           | [TBD]           | --         | ISO 7816         | --            |
| Status LEDs        | --              | Output     | Visual           | --            |
| Reset Button       | [TBD]           | Input      | Momentary        | --            |

### 5.2 DC Power Input Interface

#### 5.2.1 Connector Specification

| Parameter          | Value              |
|--------------------|--------------------|
| Connector Type     | [TBD]              |
| Pin Count          | [TBD]              |
| Pin 1 Function     | [TBD]              |
| Pin 2 Function     | [TBD]              |
| Mating Force       | [TBD] N            |
| Contact Rating     | [TBD] A            |
| Voltage Rating     | [TBD] V            |

#### 5.2.2 Power Input Timing

[IMAGE: Timing diagram showing power input sequence. Show DC input voltage rise, internal rail sequencing (VCC_CORE, VCC_IO, VCC_RADIO, VCC_CELL enabling in order), power good signals, and processor reset release. Include timing annotations in milliseconds between each stage.]

### 5.3 Ethernet Interface

#### 5.3.1 RJ45 Pinout

| Pin | Signal     | Direction | Description               |
|-----|-----------|-----------|---------------------------|
| 1   | TX+       | Output    | Transmit data positive    |
| 2   | TX-       | Output    | Transmit data negative    |
| 3   | RX+       | Input     | Receive data positive     |
| 4   | [TBD]     | [TBD]     | [TBD]                     |
| 5   | [TBD]     | [TBD]     | [TBD]                     |
| 6   | RX-       | Input     | Receive data negative     |
| 7   | [TBD]     | [TBD]     | [TBD]                     |
| 8   | [TBD]     | [TBD]     | [TBD]                     |

#### 5.3.2 Ethernet Electrical Characteristics

| Parameter                  | Min     | Typ     | Max     | Unit   |
|---------------------------|---------|---------|---------|--------|
| TX Output Amplitude        | [TBD]   | [TBD]   | [TBD]   | V p-p  |
| TX Rise/Fall Time          | [TBD]   | --      | [TBD]   | ns     |
| RX Input Sensitivity       | [TBD]   | --      | --      | mV p-p |
| Return Loss (1-100 MHz)    | [TBD]   | --      | --      | dB     |
| ESD Protection (per pin)   | --      | --      | [TBD]   | kV     |
| Isolation (magnetic)       | --      | [TBD]   | --      | V(rms) |

#### 5.3.3 Ethernet Protocol Stack

| Layer         | Protocol / Standard          | Notes                      |
|---------------|------------------------------|----------------------------|
| Physical      | IEEE 802.3 10BASE-T/100BASE-TX | Auto-negotiation          |
| Data Link     | IEEE 802.3 Ethernet          | [TBD]                      |
| Network       | IPv4 / IPv6                  | [TBD]                      |
| Transport     | TCP / UDP                    | [TBD]                      |
| Session/TLS   | TLS [TBD]                    | Mutual authentication      |
| Application   | MQTT / HTTPS                 | [TBD]                      |

### 5.4 Mesh Radio Interface

#### 5.4.1 Antenna Port

| Parameter              | Value              |
|------------------------|--------------------|
| Connector Type         | [TBD]              |
| Impedance              | [TBD] ohm          |
| VSWR (Max)             | [TBD]:1             |
| Frequency Range        | [TBD] MHz          |
| Max Input Power        | [TBD] dBm          |

#### 5.4.2 Mesh Radio Timing

[IMAGE: Timing diagram showing a mesh radio superframe. Show time slots allocated for beacon, downlink, uplink, and contention-based access. Annotate slot durations, guard times, and synchronization markers. Include a zoomed-in view of a single uplink slot showing preamble, header, payload, and CRC fields with bit-level timing.]

#### 5.4.3 Mesh Radio Register Map (Configuration)

| Address (Hex) | Register Name       | Width (bits) | Access | Default | Description                    |
|---------------|---------------------|-------------|--------|---------|--------------------------------|
| 0x00          | MESH_CTRL           | [TBD]       | R/W    | [TBD]   | Mesh controller enable/config  |
| 0x01          | MESH_STATUS          | [TBD]       | R      | [TBD]   | Mesh status and flags          |
| 0x02          | MESH_CHANNEL         | [TBD]       | R/W    | [TBD]   | Operating channel selection    |
| 0x03          | MESH_TX_POWER        | [TBD]       | R/W    | [TBD]   | Transmit power level           |
| 0x04          | MESH_PAN_ID          | [TBD]       | R/W    | [TBD]   | Network PAN identifier         |
| 0x05          | MESH_NODE_ID         | [TBD]       | R/W    | [TBD]   | Gateway node address           |
| 0x06          | MESH_SYNC_PERIOD     | [TBD]       | R/W    | [TBD]   | Synchronization interval       |
| 0x07          | MESH_SLOT_DURATION   | [TBD]       | R/W    | [TBD]   | Time slot duration config      |
| 0x08          | MESH_MAX_RETRIES     | [TBD]       | R/W    | [TBD]   | Max packet retransmissions     |
| 0x09          | MESH_RSSI_THRESH     | [TBD]       | R/W    | [TBD]   | Minimum RSSI for association   |
| [TBD]         | ...                  | ...         | ...    | ...     | ...                            |

### 5.5 Cellular Interface

#### 5.5.1 Cellular Antenna Port

| Parameter              | Value              |
|------------------------|--------------------|
| Connector Type         | [TBD]              |
| Impedance              | [TBD] ohm          |
| VSWR (Max)             | [TBD]:1             |
| Frequency Range        | [TBD] MHz - [TBD] MHz |
| Max Input Power        | [TBD] dBm          |

#### 5.5.2 Cellular AT Command Interface (Internal)

| Parameter              | Value              |
|------------------------|--------------------|
| Interface Type         | UART               |
| Baud Rate              | [TBD] bps          |
| Data Bits              | [TBD]              |
| Parity                 | [TBD]              |
| Stop Bits              | [TBD]              |
| Flow Control           | [TBD]              |

#### 5.5.3 Cellular Communication Protocol

| Parameter                     | Value              |
|-------------------------------|---------------------|
| Cloud Protocol                | [TBD]              |
| Broker/Endpoint Address       | [TBD]              |
| Port                          | [TBD]              |
| Authentication Method         | [TBD]              |
| Certificate Type              | [TBD]              |
| Keep-Alive Interval           | [TBD] s            |
| QoS Level                     | [TBD]              |
| Max Payload Size              | [TBD] bytes        |

### 5.6 USB Interface

| Parameter              | Value              |
|------------------------|--------------------|
| USB Standard           | [TBD]              |
| Connector Type         | [TBD]              |
| Role                   | [TBD]              |
| Supported Functions    | [TBD]              |
| Max Current (VBUS out) | [TBD] mA           |
| ESD Protection         | [TBD] kV           |

### 5.7 Status LEDs

| LED ID | Color    | Label    | Behavior                                      |
|--------|---------|----------|-----------------------------------------------|
| LED1   | [TBD]   | Power    | [TBD]                                         |
| LED2   | [TBD]   | Mesh     | [TBD]                                         |
| LED3   | [TBD]   | Cell     | [TBD]                                         |
| LED4   | [TBD]   | Cloud    | [TBD]                                         |
| LED5   | [TBD]   | Status   | [TBD]                                         |

#### 5.7.1 LED State Definitions

| LED    | State              | Pattern              | Meaning                          |
|--------|--------------------|----------------------|----------------------------------|
| Power  | Solid Green        | Continuous ON        | DC power OK                      |
| Power  | Solid Amber        | Continuous ON        | Running on battery backup        |
| Power  | Blinking Red       | [TBD] Hz             | Low battery / power fault        |
| Power  | Off                | --                   | No power                         |
| Mesh   | Solid Green        | Continuous ON        | Mesh active, nodes connected     |
| Mesh   | Blinking Green     | [TBD] Hz             | Mesh initializing/scanning       |
| Mesh   | Blinking Amber     | [TBD] Hz             | Mesh degraded (node loss)        |
| Mesh   | Off                | --                   | Mesh radio disabled              |
| Cell   | Solid Green        | Continuous ON        | Cellular connected               |
| Cell   | Blinking Green     | [TBD] Hz             | Cellular registering             |
| Cell   | Blinking Red       | [TBD] Hz             | Cellular connection failed       |
| Cell   | Off                | --                   | Cellular disabled/not equipped   |
| Cloud  | Solid Green        | Continuous ON        | Cloud connected, data flowing    |
| Cloud  | Blinking Green     | [TBD] Hz             | Cloud connecting / authenticating|
| Cloud  | Blinking Amber     | [TBD] Hz             | Cloud connected, data buffered   |
| Cloud  | Solid Red          | Continuous ON        | Cloud authentication failure     |
| Cloud  | Off                | --                   | No backhaul available            |
| Status | Solid Green        | Continuous ON        | Normal operation                 |
| Status | Blinking Green     | [TBD] Hz             | Firmware update in progress      |
| Status | Solid Red          | Continuous ON        | Critical fault                   |
| Status | Blinking Red/Green | [TBD] Hz alternating | Factory reset in progress        |

### 5.8 Reset Button

| Parameter                     | Value              |
|-------------------------------|---------------------|
| Button Type                   | [TBD]              |
| Activation Force              | [TBD] N            |
| Short Press (< [TBD] s)      | [TBD] (Action)     |
| Long Press ([TBD]-[TBD] s)   | [TBD] (Action)     |
| Very Long Press (> [TBD] s)  | [TBD] (Action)     |
| Recessed (tool required)      | [TBD]              |

---

## 6. Performance Characteristics and Limits

### 6.1 Data Throughput

| Metric                                | Min     | Typ     | Max     | Unit      |
|---------------------------------------|---------|---------|---------|-----------|
| Mesh Aggregate Uplink Throughput      | [TBD]   | [TBD]   | [TBD]   | kbps      |
| Mesh Single Node Throughput           | [TBD]   | [TBD]   | [TBD]   | kbps      |
| Cellular Uplink Throughput            | [TBD]   | [TBD]   | [TBD]   | kbps      |
| Cellular Downlink Throughput          | [TBD]   | [TBD]   | [TBD]   | kbps      |
| Ethernet Uplink Throughput            | [TBD]   | [TBD]   | [TBD]   | Mbps      |
| Cloud Message Rate (Sustained)        | [TBD]   | [TBD]   | [TBD]   | msg/s     |
| Cloud Message Rate (Burst)            | [TBD]   | [TBD]   | [TBD]   | msg/s     |

### 6.2 Latency

| Metric                                     | Min     | Typ     | Max     | Unit   |
|--------------------------------------------|---------|---------|---------|--------|
| Mesh: Node-to-Gateway (1 hop)              | [TBD]   | [TBD]   | [TBD]   | ms     |
| Mesh: Node-to-Gateway (max hops)           | [TBD]   | [TBD]   | [TBD]   | ms     |
| Gateway Processing Latency                 | [TBD]   | [TBD]   | [TBD]   | ms     |
| Cellular: Gateway-to-Cloud                 | [TBD]   | [TBD]   | [TBD]   | ms     |
| Ethernet: Gateway-to-Cloud                 | [TBD]   | [TBD]   | [TBD]   | ms     |
| End-to-End: Sensor-to-Cloud (Cell, 1 hop)  | [TBD]   | [TBD]   | [TBD]   | s      |
| End-to-End: Sensor-to-Cloud (Cell, max hop)| [TBD]   | [TBD]   | [TBD]   | s      |
| OTA Command: Cloud-to-Node                 | [TBD]   | [TBD]   | [TBD]   | s      |

### 6.3 Capacity

| Metric                                    | Min     | Typ     | Max     | Unit   |
|-------------------------------------------|---------|---------|---------|--------|
| Max Mesh Nodes (Total)                    | --      | --      | [TBD]   | nodes  |
| Max Mesh Anchors                          | --      | --      | [TBD]   | nodes  |
| Max Mesh Sensors                          | --      | --      | [TBD]   | nodes  |
| Max Mesh Tags                             | --      | --      | [TBD]   | nodes  |
| Max Simultaneous Active Sessions          | --      | --      | [TBD]   | --     |
| Offline Buffer Capacity                   | --      | --      | [TBD]   | h      |
| Offline Buffer Messages                   | --      | --      | [TBD]   | msgs   |
| Concurrent Firmware Updates (mesh nodes)  | --      | --      | [TBD]   | nodes  |

### 6.4 Coverage

| Metric                                    | Min     | Typ     | Max     | Unit   |
|-------------------------------------------|---------|---------|---------|--------|
| Mesh Range (Gateway-to-Anchor, LOS)       | [TBD]   | [TBD]   | [TBD]   | m      |
| Mesh Range (Gateway-to-Anchor, NLOS)      | [TBD]   | [TBD]   | [TBD]   | m      |
| Mesh Range (Indoor, obstructed)           | [TBD]   | [TBD]   | [TBD]   | m      |
| Effective Site Coverage (with anchors)    | [TBD]   | [TBD]   | [TBD]   | m^2    |
| Cellular Coverage (operator dependent)    | --      | --      | --      | --     |

### 6.5 Performance Derating

[IMAGE: Multi-line graph showing throughput derating under adverse conditions. X-axis: number of active mesh nodes (0 to Max). Y-axis: per-node throughput in kbps. Multiple lines for different conditions: ideal (LOS, no interference), moderate (NLOS, light interference), harsh (heavy multipath, interference). Annotate the recommended operating point.]

### 6.6 GPS / Location Performance (if equipped)

| Parameter                      | Min     | Typ     | Max     | Unit   |
|--------------------------------|---------|---------|---------|--------|
| GPS Module                     | [TBD]   | --      | --      | --     |
| Supported Constellations       | [TBD]   | --      | --      | --     |
| Horizontal Accuracy (CEP50)   | [TBD]   | [TBD]   | [TBD]   | m      |
| Time to First Fix (Cold)       | [TBD]   | [TBD]   | [TBD]   | s      |
| Time to First Fix (Warm)       | [TBD]   | [TBD]   | [TBD]   | s      |
| GPS Antenna                    | [TBD]   | --      | --      | --     |

---

## 7. Firmware Behavior Notes and Safety Considerations

### 7.1 Firmware Architecture

| Parameter                      | Value              |
|--------------------------------|--------------------|
| RTOS / OS                      | [TBD]              |
| Programming Language           | [TBD]              |
| Firmware Image Size            | [TBD] MB           |
| Dual-Bank (A/B) Update         | [TBD]              |
| Rollback Support               | [TBD]              |
| Bootloader Lockable            | [TBD]              |
| Secure Boot                    | [TBD]              |
| Code Signing                   | [TBD]              |

### 7.2 Firmware Update Mechanisms

| Method              | Trigger                    | Max Image Size | Duration     |
|---------------------|----------------------------|---------------|-------------|
| OTA (Cloud-pushed)  | Cloud command              | [TBD] MB      | [TBD] min   |
| USB (Local)         | USB tool + file            | [TBD] MB      | [TBD] min   |
| Ethernet (Local)    | [TBD]                      | [TBD] MB      | [TBD] min   |

> **WARNING:** Do not remove power or disconnect the Gateway during a firmware update. Interrupting the update process may render the device inoperable, requiring factory service.

### 7.3 Watchdog and Fault Recovery

| Parameter                          | Value       | Unit   |
|------------------------------------|-------------|--------|
| Hardware Watchdog Timeout          | [TBD]       | s      |
| Software Watchdog Timeout          | [TBD]       | s      |
| Max Consecutive Reboot Attempts    | [TBD]       | --     |
| Safe Mode Trigger Condition        | [TBD]       | --     |
| Automatic Recovery Actions         | [TBD]       | --     |
| Fault Log Retention                | [TBD]       | entries|

### 7.4 Security Features

| Feature                          | Implementation           |
|----------------------------------|--------------------------|
| Secure Boot                      | [TBD]                    |
| Firmware Signing                 | [TBD]                    |
| TLS Version (Cloud Comm.)       | [TBD]                    |
| Certificate Storage              | [TBD]                    |
| Device Identity                  | [TBD]                    |
| Mesh Encryption                  | [TBD]                    |
| Key Rotation                     | [TBD]                    |
| Tamper Detection                 | [TBD]                    |
| Secure Element / TPM             | [TBD]                    |
| Debug Port Lockout (Production)  | [TBD]                    |

### 7.5 Safety Considerations

> **WARNING:** The WakeCap Gateway is not classified as a safety-critical device. It must not be used as the sole means of personnel safety monitoring in hazardous environments. Always follow site-specific safety protocols.

> **CAUTION:** Battery replacement must be performed only by qualified personnel. Use only WakeCap-approved replacement batteries. Incorrect battery type may result in fire or explosion risk.

> **CAUTION:** The Gateway enclosure must remain sealed during operation. Opening the enclosure in the field voids the IP rating and may expose internal components to moisture and dust damage.

#### 7.5.1 Safety-Related Firmware Behaviors

| Behavior                           | Description                                              |
|------------------------------------|----------------------------------------------------------|
| Thermal Shutdown                   | Processor halts and enters safe state at [TBD] deg C     |
| Battery Over-Temperature           | Charging suspended at [TBD] deg C                        |
| Overvoltage Lockout                | Input power disconnected above [TBD] V                   |
| Watchdog Reset                     | System resets if firmware hangs for > [TBD] s             |
| Graceful Shutdown (Low Battery)    | Buffers flushed and state saved at [TBD] V               |
| Tamper Alert                       | [TBD] notification sent on enclosure breach detection    |

### 7.6 Data Integrity

| Feature                        | Implementation               |
|--------------------------------|------------------------------|
| Message CRC                    | [TBD]                        |
| End-to-End Checksum            | [TBD]                        |
| Duplicate Message Detection    | [TBD]                        |
| Sequence Number Tracking       | [TBD]                        |
| Data Encryption (at rest)      | [TBD]                        |
| Data Encryption (in transit)   | [TBD]                        |
| Audit Logging                  | [TBD]                        |

### 7.7 Configuration Management

| Parameter                     | Value              |
|-------------------------------|--------------------|
| Configuration Format          | [TBD]              |
| Config Backup (Local)         | [TBD]              |
| Config Backup (Cloud)         | [TBD]              |
| Factory Reset Method          | [TBD]              |
| Config Migration (FW Update)  | [TBD]              |
| Max Config File Size          | [TBD] KB           |

---

## 8. Appendix

### 8.1 Glossary

| Term             | Definition                                                                 |
|------------------|---------------------------------------------------------------------------|
| Anchor           | WakeCap Mesh Anchor -- a fixed-position mesh relay and localization node   |
| Backhaul         | The communication link between Gateway and cloud (cellular or Ethernet)    |
| CEP50            | Circular Error Probable, 50th percentile -- radius within which 50% of position fixes fall |
| Derating         | Reduction of maximum allowable operating parameter as a function of another variable (e.g., temperature) |
| DHCP             | Dynamic Host Configuration Protocol                                        |
| eSIM             | Embedded SIM -- a SIM that is soldered to the PCB and remotely provisionable |
| Gateway          | WakeCap Gateway -- the central hub aggregating mesh data and providing backhaul |
| HBM              | Human Body Model -- an ESD test model simulating discharge from a human body |
| LOS              | Line of Sight -- unobstructed radio propagation path                       |
| LTE-M            | Long Term Evolution for Machines -- a low-power wide-area cellular standard |
| Mesh             | WakeCap proprietary mesh network connecting field devices to the Gateway   |
| MODBUS Asset      | A WakeCap device bridging MODBUS-compatible industrial sensors into the mesh |
| MTBF             | Mean Time Between Failures                                                 |
| NB-IoT           | Narrowband Internet of Things -- a low-power wide-area cellular standard   |
| NLOS             | Non-Line of Sight -- obstructed radio propagation path                     |
| OTA              | Over-The-Air -- wireless firmware/software update delivery                 |
| PAN              | Personal Area Network                                                      |
| PoE              | Power over Ethernet -- delivering electrical power over Ethernet cabling   |
| RTOS             | Real-Time Operating System                                                 |
| SoC              | System on Chip                                                             |
| Store-and-Forward | Local buffering of data when backhaul is unavailable, with automatic upload on reconnect |
| Superframe       | The repeating time-division structure of the mesh radio protocol           |
| Tag              | WakeCap Smart Helmet tag -- a wearable device for personnel tracking       |
| TLS              | Transport Layer Security                                                   |
| TPM              | Trusted Platform Module                                                    |
| VSWR             | Voltage Standing Wave Ratio -- a measure of antenna impedance match quality |
| WS Box           | WakeCap Weather Station Box -- an environmental sensor enclosure           |

### 8.2 Acronyms

| Acronym | Expansion                                  |
|---------|-------------------------------------------|
| APN     | Access Point Name                          |
| BLE     | Bluetooth Low Energy                       |
| CDM     | Charged Device Model                       |
| CRC     | Cyclic Redundancy Check                    |
| DC      | Direct Current                             |
| EMC     | Electromagnetic Compatibility              |
| ESD     | Electrostatic Discharge                    |
| FCC     | Federal Communications Commission          |
| GPIO    | General Purpose Input/Output               |
| GPS     | Global Positioning System                  |
| I2C     | Inter-Integrated Circuit                   |
| IC      | Innovation, Science and Economic Development Canada (formerly Industry Canada) |
| IEC     | International Electrotechnical Commission  |
| IP      | Ingress Protection                         |
| JTAG    | Joint Test Action Group                    |
| LED     | Light-Emitting Diode                       |
| LTE     | Long Term Evolution                        |
| MDIX    | Medium Dependent Interface Crossover       |
| MQTT    | Message Queuing Telemetry Transport        |
| NaCl    | Sodium Chloride                            |
| PCB     | Printed Circuit Board                      |
| PHY     | Physical Layer                             |
| QoS     | Quality of Service                         |
| RAM     | Random Access Memory                       |
| REACH   | Registration, Evaluation, Authorisation and Restriction of Chemicals |
| RED     | Radio Equipment Directive                  |
| RoHS    | Restriction of Hazardous Substances        |
| RSP     | Remote SIM Provisioning                    |
| SIM     | Subscriber Identity Module                 |
| SPI     | Serial Peripheral Interface                |
| UART    | Universal Asynchronous Receiver/Transmitter|
| USB     | Universal Serial Bus                       |
| UV      | Ultraviolet                                |
| VLAN    | Virtual Local Area Network                 |
| WEEE    | Waste Electrical and Electronic Equipment  |

### 8.3 References

| Ref # | Document / Standard                                    | Notes                          |
|-------|-------------------------------------------------------|--------------------------------|
| [1]   | IEC 60529 -- Degrees of protection by enclosures (IP) | IP rating test methods         |
| [2]   | IEC 60068 -- Environmental testing series              | Climatic and mechanical tests  |
| [3]   | IEEE 802.3 -- Ethernet standard                       | 10BASE-T / 100BASE-TX         |
| [4]   | 3GPP TS 36.series -- LTE / LTE-M specifications       | Cellular air interface         |
| [5]   | 3GPP TS 36.series -- NB-IoT specifications            | NB-IoT air interface           |
| [6]   | Telcordia SR-332 -- Reliability Prediction Procedure   | MTBF calculation method        |
| [7]   | MIL-HDBK-217F -- Reliability Prediction of Electronic Equipment | Alternate MTBF method |
| [8]   | ISO 7816 -- Identification cards -- Integrated circuit cards | SIM card interface       |
| [9]   | EU Directive 2014/53/EU -- Radio Equipment Directive (RED) | CE radio certification    |
| [10]  | FCC Part 15 -- Radio Frequency Devices                 | FCC certification              |
| [11]  | RSS-247 -- Digital Transmission Systems (IC)           | IC certification               |
| [12]  | EU Directive 2011/65/EU -- RoHS                        | Hazardous substance limits     |
| [13]  | EU Regulation 1907/2006 -- REACH                       | Chemical safety                |
| [14]  | EU Directive 2012/19/EU -- WEEE                        | E-waste disposal               |

### 8.4 Document Conventions

- All temperatures in degrees Celsius (deg C) unless otherwise noted.
- All voltages in volts (V), currents in milliamps (mA) or amps (A), and power in watts (W) or milliwatts (mW) unless otherwise noted.
- All frequencies in hertz (Hz), kilohertz (kHz), megahertz (MHz), or gigahertz (GHz) as appropriate.
- All distances in meters (m) or millimeters (mm) unless otherwise noted.
- [TBD] indicates a value to be determined and populated when product specifications are finalized.
- [IMAGE: description] indicates a placeholder for a figure to be inserted.
- Min/Typ/Max columns: a dash (--) indicates the parameter is not specified or not applicable for that column.

---

*End of Document -- WC-GW-TR-v1.0*

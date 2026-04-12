---
title: "WakeCap AVL System — Product Manual"
doc-id: WC-AVL-PM-v1.0
product: AVL System
doc-type: Product Manual
revision-date: 2026-04-12
subtitle: "Automatic Vehicle Location & Equipment Tracking Platform"
author: "WakeCap Technologies"
version: "A"
hardware-compatibility: "Teltonika FMC130, ALLCAN-300 (CAN300)"
platform-version: "Equipment Manager v1.8.1"
---

[IMAGE: WakeCap AVL System hero shot — Teltonika FMC130 GPS tracker device mounted on a vehicle dashboard with a construction site visible through the windshield, WakeCap Equipment Manager dashboard displayed on a tablet nearby showing a live fleet map with vehicle icons]

# WakeCap AVL System

**Product Manual**

Real-time vehicle tracking and fleet intelligence for mega construction and oil & gas operations.

| | |
|:---|:---|
| **Model** | WakeCap AVL (Teltonika FMC130) |
| **Document** | WC-AVL-PM-v1.0 |
| **Revision** | 1.0 |
| **Date** | 2026-04-12 |

---

\newpage

# 1. Product Overview

## 1.1 Description

The WakeCap AVL (Automatic Vehicle Location) System provides real-time GPS tracking and fleet telematics for construction vehicles and heavy equipment on mega project sites. The system combines Teltonika FMC130 GPS tracker hardware with the WakeCap Equipment Manager portal to deliver comprehensive fleet visibility, driver behavior monitoring, and operational intelligence.

Deployed across Aramco mega projects and other large-scale construction sites, the AVL system tracks vehicles ranging from light transport buses to heavy excavators and cranes. Each tracker transmits GPS position, speed, ignition status, and vehicle diagnostics over cellular networks to the WakeCap cloud platform, where data is processed and presented through real-time dashboards, interactive maps, and automated alerts.

The Equipment Manager portal (v1.8.1) serves as the unified interface for fleet operations, combining live tracking, 20+ configurable alert types, geofencing, CO~2~ emissions monitoring, device health diagnostics, and 12 exportable reports into a single web-based application accessible from any browser.

## 1.2 Key Features

- **Real-Time GPS Tracking** — Live position updates with custom vehicle icons for excavators, cranes, trucks, and more
- **20+ Alert Types** — Overspeed, geofence entry/exit, harsh braking, harsh acceleration, seatbelt compliance, idle detection, SOS, and more
- **Fleet Dashboard** — At-a-glance metrics for mobilization, connectivity, compliance, CO~2~, and offline tracker detection
- **Route Intelligence** — Historical route playback with speed-based color coding, distance, and moving time statistics
- **Geofence Management** — Draw custom boundaries on the map with GeoJSON import/export
- **Device Health Monitoring** — 7 health indicators per tracker with dynamic scoring and Teltonika diagnostics
- **CO~2~ Emissions Tracking** — Fuel-based emissions calculations with automatic telemetry from Traccar
- **12 Exportable Reports** — One-click Excel downloads for fleet operations, alerts, compliance, and device health

## 1.3 Package Contents

| Item | Quantity | Description |
|:-----|:--------:|:------------|
| Teltonika FMC130 GPS Tracker | 1 | 4G LTE vehicle tracking device |
| Mounting Bracket & Hardware | 1 set | Bracket, screws, cable ties for vehicle installation |
| Power Cable Harness | 1 | 3-wire harness (power, ground, ignition) |
| SIM Card | 1 | Pre-configured Caburn M2MI or Jasper cellular SIM |
| Teltonika ALLCAN-300 (CAN300) | Optional | CAN bus adapter for vehicle diagnostics |
| Quick Installation Card | 1 | Field reference for installer |

## 1.4 Product Identification

[IMAGE: Annotated top-down photo of Teltonika FMC130 device with numbered callouts pointing to — 1: Status LED indicators, 2: SIM card slot, 3: MicroSD card slot, 4: Power/IO connector (10-pin), 5: External GNSS antenna port, 6: External cellular antenna port, 7: 1-Wire interface connector, 8: Bluetooth antenna (internal)]

1. **Status LED Indicators** — GNSS (green), cellular (blue), power (red) status LEDs
2. **SIM Card Slot** — Micro-SIM slot for cellular connectivity
3. **MicroSD Card Slot** — Optional storage for data buffering
4. **Power/IO Connector** — 10-pin connector for power, ignition, digital/analog I/O
5. **External GNSS Antenna Port** — For improved GPS reception in enclosed installations
6. **External Cellular Antenna Port** — For improved cellular signal in metal enclosures
7. **1-Wire Interface** — For temperature sensors and iButton driver identification
8. **Bluetooth Antenna** — Internal antenna for BLE peripherals and beacons

---

\newpage

# 2. System Architecture

## 2.1 System Overview

[IMAGE: System architecture block diagram showing the complete WakeCap AVL data flow — left side: vehicles with FMC130 trackers and ALLCAN-300 CAN bus adapters sending data over cellular network (4G LTE) to cell towers; center: cloud infrastructure with Traccar GPS engine, Equipment Manager microservice, Integration Service, and Observation Service; right side: WakeCap Equipment Manager portal on browser screens showing fleet dashboard, live map, alerts panel, and reports; bottom: SIM management platforms (Caburn M2MI, Jasper) connected to the cloud; arrows showing real-time data flow via SignalR WebSocket]

## 2.2 Data Flow

The AVL system follows a straightforward data pipeline from vehicle to dashboard:

1. **Vehicle → Tracker:** The FMC130 device reads GPS coordinates, ignition state, speed, and optional CAN bus data from the vehicle
2. **Tracker → Cellular Network:** Data is transmitted over 4G LTE at configurable intervals (default: every 2 minutes)
3. **Cellular → Traccar Engine:** GPS data is received and processed by the Traccar tracking platform
4. **Traccar → Equipment Manager:** Processed positions, events, and alerts flow into the Equipment Manager microservice
5. **Equipment Manager → Portal:** Real-time updates are pushed to the web dashboard via SignalR WebSocket connections
6. **Alerts → Observation Service:** Safety-critical alerts are routed to the WakeCap Observation Service for unified incident management

## 2.3 Communication Protocols

| Connection | Protocol | Direction | Notes |
|:-----------|:---------|:---------:|:------|
| FMC130 → Cell Tower | 4G LTE (Cat 1) | Upstream | 3G/2G fallback available |
| FMC130 → ALLCAN-300 | CAN bus (J1939) | Bidirectional | Vehicle diagnostics |
| FMC130 → Sensors | 1-Wire / Digital I/O | Input | Ignition, seatbelt, SOS, temperature |
| Traccar → Equipment Manager | REST API | Bidirectional | Position data and device commands |
| Equipment Manager → Browser | SignalR (WebSocket) | Push | Real-time map and status updates |
| Equipment Manager → Observation Service | Webhook | Push | Alert events for incident management |
| SIM Management → Caburn/Jasper | REST API | Bidirectional | SIM status, data usage, activation |

## 2.4 Platform Components

| Component | Function |
|:----------|:---------|
| **Equipment Manager** | Independent microservice — equipment registration, fleet dashboard, reports |
| **Traccar Engine** | Open-source GPS tracking platform — position processing, geofencing, alerts |
| **Integration Service** | Data synchronization between GPS platform and WakeCap portal |
| **Observation Service** | Unified incident timeline — receives alerts and maps to safety observations |
| **SignalR Hub** | Real-time WebSocket connections for live map updates in the browser |

---

\newpage

# 3. Technical Specifications

## 3.1 GPS Tracker — Teltonika FMC130

### 3.1.1 Physical Specifications

| Parameter | Value | Unit |
|:----------|------:|:----:|
| Dimensions (L × W × H) | 85.2 × 54.4 × 16.6 | mm |
| Weight | [TBD] | g |
| Enclosure Material | Black polycarbonate | — |
| Mounting | DIN rail or bracket | — |

### 3.1.2 Electrical Specifications

| Parameter | Min | Typ | Max | Unit |
|:----------|----:|----:|----:|:----:|
| Input Voltage | 10 | 12/24 | 30 | V DC |
| Current Draw (active) | — | [TBD] | [TBD] | mA |
| Internal Battery | — | 450 | — | mAh |
| Battery Chemistry | — | Li-Polymer | — | — |

### 3.1.3 Environmental Specifications

| Parameter | Min | Max | Unit |
|:----------|----:|----:|:----:|
| Operating Temperature | -40 | +85 | °C |
| Storage Temperature | -40 | +85 | °C |
| Operating Humidity | 5 | 95 | % RH (non-condensing) |

### 3.1.4 GNSS Performance

| Parameter | Value | Unit |
|:----------|------:|:----:|
| Constellations | GPS, GLONASS, BeiDou, Galileo, SBAS | — |
| Accuracy (CEP) | < 2.5 | m |
| Cold Start TTFF | < 35 | s |
| Hot Start TTFF | < 1 | s |
| Tracking Sensitivity | -165 | dBm |

### 3.1.5 Cellular Specifications

| Parameter | Value |
|:----------|:------|
| Technology | 4G LTE Cat 1 with 3G/2G fallback |
| LTE Bands | B1, B3, B5, B7, B8, B20 (region-dependent) |
| Data Protocol | TCP/UDP |
| SIM Type | Micro-SIM (3FF) |
| SIM Providers | Caburn M2MI, Jasper (Mobily), STC, Zain |

### 3.1.6 Interfaces

| Interface | Type | Quantity | Purpose |
|:----------|:-----|:--------:|:--------|
| Digital Inputs | Active low / high | 4 | Ignition, SOS, seatbelt, door |
| Digital Outputs | Open collector | 3 | Relay control, buzzer, LED |
| Analog Inputs | 0–30 V DC | 2 | Fuel sensor, temperature |
| 1-Wire | Dallas 1-Wire | 1 | Temperature sensor, iButton |
| RS232 / RS485 | Serial | 1 | External peripherals |
| Bluetooth | BLE 4.0 | Internal | Beacons, sensors, OBDII dongle |
| CAN bus | Via ALLCAN-300 | 1 | Vehicle diagnostics (J1939/OBD-II) |
| USB | Micro-USB | 1 | Configuration only |

## 3.2 CAN Bus Adapter — Teltonika ALLCAN-300

| Parameter | Value |
|:----------|:------|
| Purpose | Reads vehicle CAN bus data for advanced telematics |
| Connection | CAN H and CAN L wires to vehicle, data cable to FMC130 |
| Vehicle Parameters | RPM, fuel level, odometer, engine load, throttle position, mass air flow, speed, auxiliary status |
| Configuration | Program number per vehicle model; Autoscan feature available |
| Protocol | CAN 2.0B / J1939 / OBD-II |

## 3.3 Platform Specifications

| Parameter | Value |
|:----------|:------|
| Platform Version | Equipment Manager v1.8.1 |
| Tracking Engine | Traccar (open-source) |
| Real-Time Protocol | SignalR (WebSocket) |
| API Endpoints | 40+ |
| Automated Test Suites | 6 |
| Alert Rules Capacity | 258+ rules, 63,000+ device links |
| Supported Browsers | Chrome (optimized), Firefox, Edge, Safari |
| Report Export Format | Microsoft Excel (.xlsx) |

## 3.4 Certifications

| Certification | Status | Notes |
|:-------------|:-------|:------|
| CE | [TBD] | European conformity — per Teltonika FMC130 datasheet |
| E-Mark (E13) | [TBD] | Automotive EMC directive compliance |
| RoHS | [TBD] | Restriction of hazardous substances |
| REACH | [TBD] | EU chemical safety regulation |
| EAC | [TBD] | Eurasian Conformity |
| IP54 | Yes | Dust-protected, splash-proof |

::: {.notice}
Certification documentation is maintained by Teltonika (OEM). Contact WakeCap for current certification status and compliance declarations for specific project requirements.
:::

---

\newpage

# 4. Components

## 4.1 Teltonika FMC130 GPS Tracker

**Function:**
The FMC130 is the primary tracking device installed in each vehicle or piece of heavy equipment. It captures GPS position, vehicle telemetry, and sensor data, then transmits this information over cellular networks to the WakeCap cloud platform.

**Physical Description:**
Compact black polycarbonate enclosure designed for concealed installation behind the vehicle dashboard or in the engine compartment. Features a 10-pin power/IO connector, SIM card slot, MicroSD slot, and optional external antenna ports.

[IMAGE: Teltonika FMC130 device photographed from three angles — front showing LED indicators, back showing mounting bracket holes, and side showing connector ports. Clean white background, studio lighting, with a ruler for scale reference]

**LED Indicators:**

| LED | Color | Pattern | Meaning |
|:----|:------|:--------|:--------|
| GNSS | Green | Solid | GPS fix acquired |
| GNSS | Green | Blinking | Searching for satellites |
| GNSS | Off | — | GNSS module off |
| Cellular | Blue | Solid | Connected to network |
| Cellular | Blue | Blinking | Registering on network |
| Cellular | Off | — | No cellular coverage |
| Power | Red | Solid | External power connected |
| Power | Red | Blinking | Running on internal battery |
| Power | Off | — | Device powered off |

## 4.2 Teltonika ALLCAN-300 (CAN300) Adapter

**Function:**
Optional CAN bus adapter that connects between the FMC130 and the vehicle's CAN bus network. Reads engine and vehicle parameters for advanced fleet analytics, fuel monitoring, and CO~2~ emissions calculations.

**Physical Description:**
Small adapter module with wiring harness. Connects to the vehicle's CAN H and CAN L wires on one end and to the FMC130 data port on the other.

[IMAGE: ALLCAN-300 CAN bus adapter with wiring harness spread out, showing CAN H (yellow) and CAN L (green) wires on the vehicle side, and the data connector on the FMC130 side. Labels on each wire. White background]

::: {.notice}
The program number in the CAN300 configuration is critical because it tells the device how to interpret the vehicle's CAN bus data. Each vehicle model requires a specific program number for correct data decoding.
:::

## 4.3 SIM Card

**Function:**
Provides cellular connectivity for data transmission from the FMC130 to the WakeCap cloud. Pre-configured with APN settings for the WakeCap tracking platform.

**Supported Providers:**

| Provider | Platform | Coverage |
|:---------|:---------|:---------|
| Caburn Telecom (M2MI) | m2miportal.com | International / Multi-network |
| Jasper Wireless (Mobily) | mobily.jasperwireless.com | KSA — Mobily network |
| STC Direct | — | KSA — STC network |
| Zain Direct | — | KSA — Zain network |

## 4.4 AVL Workstation (On-Site)

**Function:**
Dedicated monitoring station at the project site office for real-time fleet monitoring by site automation engineers.

| Item | Specification |
|:-----|:-------------|
| Computer | Windows PC with keyboard and mouse |
| Display | 27" monitor |
| Software | WakeCap Equipment Manager (web-based) |
| Network | Internet connection (wired or Wi-Fi) |

---

\newpage

# 5. Installation

::: {.warning}
**ELECTRICAL HAZARD** — Vehicle electrical systems operate at 12 V DC or 24 V DC. Disconnect the vehicle battery before wiring the AVL tracker to prevent short circuits and electrical shock.
:::

::: {.caution}
**PINCH HAZARD** — When routing cables in engine compartments, ensure cables are secured away from moving parts such as fan belts, pulleys, and hinges.
:::

## 5.1 Prerequisites

Before installation, confirm the following:

- [ ] FMC130 tracker device with mounting hardware
- [ ] Pre-configured SIM card (activated and tested)
- [ ] ALLCAN-300 CAN adapter (if CAN bus integration required)
- [ ] Wiring tools: wire strippers, crimping tool, heat-shrink tubing, zip ties
- [ ] Multimeter for voltage verification
- [ ] Vehicle ignition source location identified
- [ ] Teltonika Configurator Tool installed on laptop (for configuration)
- [ ] WakeCap Equipment Manager portal credentials

## 5.2 Light Vehicle Installation

### 5.2.1 Wiring

1. **Disconnect** the vehicle battery negative terminal.
2. **Route** the FMC130 power cable harness from the installation location to the vehicle battery.
3. **Connect** the red power wire to the vehicle battery positive (+) terminal.
4. **Connect** the black ground wire to the vehicle battery negative (−) terminal.
5. **Locate** the vehicle ignition wire at the fuse box or ignition switch.
6. **Connect** the orange ignition wire to the identified ignition source.

::: {.important}
The ignition wire MUST be connected to the actual vehicle ignition source — not the battery. Without a proper ignition connection, the system cannot distinguish between engine running, idle, and parked states. Reports for stop, idle, and running times depend on this connection.
:::

7. **Verify** all connections with a multimeter:
   - Power wire: 12 V DC or 24 V DC at battery
   - Ignition wire: 0 V when ignition OFF, 12/24 V when ignition ON
8. **Reconnect** the vehicle battery negative terminal.

### 5.2.2 Device Mounting

9. **Insert** the pre-configured SIM card into the FMC130 SIM slot.
10. **Mount** the FMC130 using the bracket and hardware. Preferred locations:
    - Behind the dashboard (concealed)
    - Under the driver seat (concealed)
    - In the glove compartment (accessible)
11. **Secure** all cables with zip ties. Ensure no loose wires near pedals or moving parts.
12. **Verify** the device powers on — observe red power LED solid, blue cellular LED blinking.

### 5.2.3 Sensor Connections (Optional)

| Sensor | Wire Color | Digital Input | Notes |
|:-------|:-----------|:-------------|:------|
| SOS Button | [TBD] | DIN1 | Connect to dashboard-mounted panic button |
| Seatbelt | [TBD] | DIN2 | Connect to seatbelt buckle switch |
| Door Sensor | [TBD] | DIN3 | Connect to door open/close switch |

## 5.3 Heavy Equipment Installation

Heavy equipment installation follows the same wiring principles as light vehicles with these differences:

::: {.notice}
The ignition source location varies significantly between equipment types (excavators, cranes, bulldozers, loaders). Consult the equipment manufacturer's electrical schematic to identify the correct ignition wire before installation.
:::

1. **Identify** the ignition source on the heavy equipment. Common locations:
   - Excavators: Main fuse box near operator cabin
   - Cranes: Electrical panel behind operator console
   - Loaders: Fuse block under dashboard
2. **Follow** Steps 1–12 from Section 5.2 for wiring and mounting.
3. **Install** the ALLCAN-300 CAN adapter (if required):
   a. **Locate** the vehicle CAN bus wires (CAN H and CAN L) — typically in the diagnostic connector area.
   b. **Wire** the CAN300 CAN H (yellow) to vehicle CAN H.
   c. **Wire** the CAN300 CAN L (green) to vehicle CAN L.
   d. **Connect** the CAN300 data cable to the FMC130.

::: {.important}
Complete ALL FMC130 wiring to the vehicle BEFORE connecting the CAN300 adapter. The CAN300 configuration must be performed after the FMC130 is fully operational.
:::

4. **Configure** the CAN300 program number using the Teltonika Configurator:
   a. Connect laptop to FMC130 via USB.
   b. Open Teltonika Configurator Tool.
   c. Navigate to CAN bus settings.
   d. Enter the correct program number for the vehicle model (or use Autoscan).
   e. Save configuration and disconnect.

## 5.4 Post-Installation Verification

After completing installation on any vehicle type:

1. **Turn on** the vehicle ignition.
2. **Confirm** LED status (see *Section 8.2 LED Status Reference* for full details):
   - Power LED: Solid red
   - Cellular LED: Solid blue (connected)
   - GNSS LED: Solid green (GPS fix acquired)
3. **Log in** to the WakeCap Equipment Manager portal.
4. **Verify** the device appears on the live map with correct position.
5. **Test** ignition detection: Turn ignition off and on; confirm status change in portal.
6. **Test** movement: Drive the vehicle a short distance; confirm route appears on map.

## 5.5 AVL Device Transfer (Client-Owned Devices)

For projects where the client transfers existing Teltonika devices to the WakeCap platform:

**Included in transfer scope:**

- First-time installation of new WakeCap SIM card
- First-time device configuration and linking to WakeCap platform
- Operational support during subscription period

**Not included (unit pricing applies):**

- Demobilize hardware from Vehicle A and reinstall in Vehicle B (200 SAR per device)

**Out of scope:**

- Hardware warranty on transferred devices
- Repair or replacement in case of damage

---

\newpage

# 6. Operation

## 6.1 Equipment Manager Portal

The WakeCap Equipment Manager portal is the primary interface for all AVL operations. Access it via any modern web browser at the WakeCap portal URL.

### 6.1.1 Fleet Dashboard

The dashboard provides a real-time overview of the entire fleet at a glance.

[IMAGE: Screenshot mockup of the WakeCap Equipment Manager Fleet Dashboard showing — top row: 4 KPI cards (Total Vehicles, Online Trackers, Active Alerts, CO2 This Month); middle row: 2 charts (Mobilization Breakdown pie chart, Tracker Connectivity bar chart); bottom row: 3 charts (Equipment Distribution by type, Compliance Timeline line chart, Alert Activity heatmap). Modern glassmorphism UI with frosted glass cards, dark sidebar navigation, and WakeCap branding]

**Dashboard Widgets:**

| Widget | Description |
|:-------|:------------|
| Mobilization Breakdown | Mobilized vs. demobilized equipment counts |
| Tracker Connectivity | Online, offline, and stale tracker status |
| Equipment Distribution | Breakdown by equipment type (cranes, trucks, excavators, etc.) |
| Compliance Timeline | Inspection and certification compliance over time |
| Alert Activity | Recent alert frequency and type distribution |
| CO~2~ Summary | Total emissions, fuel usage, and distance metrics |
| Offline Tracker Detection | Devices that have not reported in a configurable time window |

### 6.1.2 Live Tracking Map

The interactive map displays all tracked vehicles in real-time with automatic position updates.

[IMAGE: Screenshot mockup of the WakeCap Equipment Manager Live Map showing — satellite view of a construction site with 15-20 custom vehicle icons (different shapes for excavators, cranes, trucks, buses) scattered across the site. One vehicle selected showing an info panel with: Vehicle ID, Plate Number, Speed (45 km/h), Ignition (ON), Last Update (2 sec ago), Driver Name. Frosted glass sidebar listing all vehicles. Geofence boundary drawn in blue around the site perimeter. Modern dark UI theme]

**Map Features:**

- Custom vehicle icons per equipment type
- Per-device live tracking toggle
- Route history playback with speed-based color coding
- Route statistics: distance, max/avg speed, moving time
- Speed on hover over any route point
- Real-time marker color updates when device status changes
- Geofence boundaries displayed with customizable colors and opacity
- Frosted glass transparent sidebar and info panels

### 6.1.3 Alert System

The Equipment Manager includes 20+ configurable alert types for comprehensive fleet safety and compliance monitoring.

**Alert Types:**

| Category | Alert | Description |
|:---------|:------|:------------|
| **Speed** | Overspeed | Speed exceeds configured threshold |
| **Geofence** | Geofence Entry | Vehicle enters a defined geofence boundary |
| **Geofence** | Geofence Exit | Vehicle exits a defined geofence boundary |
| **Ignition** | Ignition On | Vehicle engine started |
| **Ignition** | Ignition Off | Vehicle engine stopped |
| **Safety** | SOS | Emergency button pressed by driver |
| **Safety** | Harsh Braking | Sudden deceleration detected by accelerometer |
| **Safety** | Harsh Acceleration | Sudden acceleration detected by accelerometer |
| **Safety** | Seatbelt Compliance | Driver seatbelt not fastened while vehicle in motion |
| **Behavior** | Idle | Vehicle stationary with engine running beyond threshold |
| **Behavior** | Unauthorized Stop | Vehicle stopped in restricted area |
| **Device** | Offline Detection | Tracker loses connectivity beyond threshold |
| **Device** | Stale GPS | Device reporting outdated GPS coordinates |

**Alert Configuration:**

- Custom thresholds per alert type (e.g., speed limit, idle duration)
- Custom schedules (e.g., only monitor during working hours)
- Notification channels: Email, Push notification, Silent (log only)
- Intelligent consolidation: Ongoing violations are merged into a single alert with accurate duration and location

::: {.tip}
Use intelligent alert consolidation to reduce alert fatigue. Instead of receiving repeated alerts for a single speeding event, the system generates one alert with the full duration and route segment where the violation occurred.
:::

### 6.1.4 Geofence Management

[IMAGE: Screenshot mockup of the Geofence Management panel showing — a construction site map with 3 geofences drawn: a large blue polygon around the entire site perimeter labeled "Site Boundary", a smaller red polygon around a hazardous excavation zone labeled "Exclusion Zone", and a green circle around the main gate labeled "Entry/Exit Point". Side panel showing geofence list with toggle switches for visibility and color pickers]

- **Draw geofences** directly on the map using point-and-click tools
- **Customize** colors and opacity per geofence
- **Import/Export** geofences as GeoJSON files for cross-system sharing
- **Toggle visibility** of individual geofences on the map
- **Link alerts** to geofences for automatic entry/exit notifications

### 6.1.5 Reports

The Equipment Manager provides 12 reports across two categories:

**Fleet Reports (6):**

| Report | Description | Key Fields |
|:-------|:------------|:-----------|
| Driver Timesheet | Work hours and activity per driver | Start, end, duration, distance |
| Fleet Summary | Fleet-wide statistics overview | Total vehicles, active, idle, offline |
| Trip Status | Individual trip details with route | Start/end location, distance, speed |
| Track Data | Raw GPS track data | Timestamp, lat/lon, speed, heading |
| Device List | All registered devices and status | IMEI, status, last seen, project |
| Offline Devices | Devices that have gone offline | IMEI, last seen, offline duration |

**Exportable Reports (6 — One-Click Excel Download):**

| Report | Description | Key Fields |
|:-------|:------------|:-----------|
| Alert History | Historical alert data | Alert type, timestamp, vehicle, location, duration |
| Compliance Status | Equipment compliance tracking | Equipment, inspection status, expiry |
| CO~2~ Emissions | Per-equipment emissions breakdown | Equipment, fuel type, consumption, CO~2~ kg |
| SIM Health | SIM card status and data usage | ICCID, provider, data used, status |
| Equipment Utilization | Usage statistics per equipment | Running hours, idle hours, distance, trips |
| Device Health | Device performance metrics | Health score, GPS quality, connectivity, power |

::: {.notice}
Reports use ignition-based boundaries — data is trimmed to actual engine ON/OFF times, eliminating parked noise from driver timesheets and utilization calculations.
:::

### 6.1.6 Device Health Dashboard

[IMAGE: Screenshot mockup of the Device Health Dashboard showing — a table of tracked devices with columns: Device IMEI, Vehicle, Health Score (color-coded 0-100), GPS Quality, Connectivity, Power Stability, Data Freshness. One device expanded showing 7 health indicators as horizontal progress bars in green/yellow/red. A "Run Diagnostics" button prominent. Modern card-based layout]

**Health Indicators (7 per device):**

| Indicator | What It Measures |
|:----------|:-----------------|
| GPS Quality | Satellite count, HDOP, fix type |
| Connectivity | Cellular signal strength, connection stability |
| Power Stability | External power voltage, battery backup status |
| Data Freshness | Time since last data transmission |
| Device Temperature | Internal temperature within operating range |
| Memory Usage | Onboard buffer utilization |
| Firmware Status | Current firmware version vs. latest available |

- **Dynamic health scores** calculated from all 7 indicators
- **Stale GPS detection** catches devices reporting outdated coordinates
- **On-demand Teltonika diagnostics** for detailed device status
- **Fleet-wide health overview** for quick identification of devices needing attention

### 6.1.7 SIM Management

| Feature | Description |
|:--------|:------------|
| ICCID Copy | One-click copy of SIM serial number |
| Data Usage | SIM data consumption visible per device |
| ICCID Validation | Rejects invalid serial numbers on SIM creation |
| Live SIM Status | Real-time status from Caburn M2MI and Jasper platforms |
| Provider Data | Usage, activation status, and provider info in health summaries |

### 6.1.8 Equipment Registration

The Equipment Manager uses an 8-step wizard for registering new equipment:

1. **Basic Information** — Equipment name, type, plate number
2. **Vehicle Details** — Make, model, year, VIN
3. **Tracker Assignment** — Link IMEI to equipment (searchable dropdown)
4. **SIM Card** — Associate SIM card (ICCID)
5. **Specifications** — PWAS type, door numbers, TP calibration
6. **Inspection Data** — CO~2~ inspection records, compliance dates
7. **Operator Assignment** — Assign driver/operator to equipment
8. **Review & Confirm** — Final review before submission

::: {.tip}
Use the Smart IMEI Search feature to quickly find available trackers by typing IMEI, equipment type, or plate number in the searchable dropdown.
:::

### 6.1.9 CO~2~ Emissions Tracking

The platform calculates CO~2~ emissions using a combination of automatic telemetry and manual inspection data.

**Automatic Data (from Traccar):**

- Engine hours (active vs. idle)
- Distance traveled
- Active time vs. idle time

**Manual Inspection Data (Testo 300 probe):**

- O~2~ percentage
- CO concentration
- NO concentration
- Draft pressure
- Flue gas temperature
- Ambient temperature

**Calculation Method:**

- Stationary equipment (bulldozers, excavators): CO~2~ estimated by Ignition On Time (hours) x fuel consumption rate (L/h)
- Commuting equipment (buses, tankers, loaders): CO~2~ estimated by Trip Distance (km) x fuel consumption rate (L/km)
- Fuel-based CO~2~ with predefined emission factors per fuel type
- Default consumption rates per equipment type with idle consumption logic
- Smart fallback to manual input if tracker data fails

---

\newpage

# 7. Maintenance

## 7.1 Maintenance Schedule

| Task | Frequency | Procedure |
|:-----|:----------|:----------|
| Check tracker power connection | Monthly | Verify red power LED is solid; check wiring for corrosion |
| Verify GPS fix quality | Monthly | Confirm green GNSS LED is solid; check health dashboard |
| Review SIM data usage | Monthly | Check SIM Management panel for unusual consumption |
| Inspect cable routing | Quarterly | Ensure cables are secure and away from moving parts |
| Review device health scores | Quarterly | Check Device Health Dashboard for degraded devices (see *Section 6.1.6*) |
| Firmware update check | Quarterly | Compare firmware version against latest on Teltonika FOTA |
| CAN300 data validation | Quarterly | Verify CAN bus parameters match expected vehicle readings |
| Full fleet health audit | Annually | Run diagnostics on all devices; replace degraded units |

## 7.2 Calibration Requirements

### 7.2.1 CAN Bus Calibration (ALLCAN-300)

Verify CAN bus program number accuracy quarterly or whenever a vehicle is replaced:

1. **Compare** CAN bus readings (RPM, speed, fuel level) against the vehicle instrument panel.
2. **If values differ**, update the CAN300 program number using the Teltonika Configurator (see *Section 8.3.2 CAN Bus Data Validation*).
3. **Run Autoscan** if the correct program number for the vehicle model is unknown.

### 7.2.2 GPS Accuracy Validation

Verify GPS position accuracy quarterly:

1. **Park** the vehicle at a known location with surveyed coordinates.
2. **Compare** the reported GPS position in the Equipment Manager portal against the known coordinates.
3. **Acceptable accuracy:** CEP < 2.5 m (see *Section 3.1.4 GNSS Performance*).
4. **If accuracy exceeds threshold**, check external GNSS antenna connection and ensure the antenna has a clear view of the sky.

## 7.4 Routine Inspection Checklist

- [ ] Power LED solid red on all trackers
- [ ] Cellular LED solid blue (connected) on all trackers
- [ ] GNSS LED solid green (GPS fix) on all trackers
- [ ] No "offline" alerts in past 24 hours
- [ ] Health scores above 70% for all devices
- [ ] SIM data usage within expected range
- [ ] All geofences active and correctly positioned
- [ ] Alert notifications being received

## 7.5 Firmware Updates

Firmware updates for the FMC130 are distributed via Teltonika FOTA (Firmware Over The Air):

1. **Log in** to the Teltonika FOTA portal at fota.teltonika.lt.
2. **Select** the device(s) to update.
3. **Choose** the target firmware version.
4. **Schedule** the update (devices must be online to receive updates).
5. **Verify** the update completes successfully in the FOTA dashboard.

::: {.notice}
Firmware updates require the device to be online and connected to cellular network. Schedule updates during working hours when vehicles are in areas with good cellular coverage.
:::

---

\newpage

# 8. Troubleshooting

## 8.1 Common Issues

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|:--------|:-------------|:-------------|:----|:--------------|
| Device not appearing on map | No cellular connection | Check blue LED; verify SIM is active | Replace SIM or send SMS command to reset | Device still offline after SIM replacement |
| GPS position not updating | Stale GPS fix | Check green LED; check Device Health | Move vehicle to open sky area; reboot device | Position stuck for > 24 hours |
| Incorrect speed readings | CAN300 program mismatch | Compare CAN speed with vehicle speedometer | Update CAN300 program number for vehicle model | Multiple vehicles showing wrong data |
| No ignition detection | Ignition wire not connected | Check orange wire; measure voltage at ignition | Reconnect ignition wire to correct source | Voltage present but ignition not detected |
| High SIM data usage | Short reporting interval | Check reporting interval configuration (see *Appendix B*) | Increase interval to 2 min (default) | Usage exceeds plan limit |
| Alerts not triggering | Alert rule misconfigured | Check alert thresholds and schedules | Reconfigure alert rules in Equipment Manager | Alerts configured correctly but not firing |
| Device health score low | Multiple degraded indicators | Run on-demand Teltonika diagnostics (see *Section 6.1.6*) | Address specific failing indicators | Score below 30% after diagnostics |
| Route history gaps | Cellular coverage gaps | Check cellular coverage map for route area | Enable onboard data buffering (store-and-forward) | Gaps persist in areas with confirmed coverage |

## 8.2 LED Status Reference

| Power (Red) | Cellular (Blue) | GNSS (Green) | Status | Action |
|:------------|:----------------|:-------------|:-------|:-------|
| Solid | Solid | Solid | Normal operation | None required |
| Solid | Solid | Blinking | Searching for GPS | Move to open sky; wait 1–2 minutes |
| Solid | Blinking | Any | Registering on network | Wait 30 seconds; check SIM if persistent |
| Blinking | Any | Any | On backup battery | Check vehicle power connection |
| Off | Off | Off | No power | Check battery connection and fuse |

## 8.3 Diagnostic Procedures

### 8.3.1 Bringing Offline Devices Back Online

1. **Send SMS command** to the device from the management platform.
2. **Wait** 60 seconds for the device to respond.
3. **Check** the Equipment Manager portal for device status change.
4. If the device remains offline:
   a. **Visit** the vehicle and verify power connection.
   b. **Check** SIM card is properly seated.
   c. **Replace** SIM card if damaged or deactivated.
   d. **Load** new configuration via USB using Teltonika Configurator.

### 8.3.2 CAN Bus Data Validation

1. **Open** the Equipment Manager portal and navigate to the vehicle detail page.
2. **Compare** the following CAN bus readings with the vehicle instrument panel:
   - RPM
   - Speed
   - Fuel level
   - Odometer
3. **If values differ**, update the CAN300 program number:
   a. Connect laptop to FMC130 via USB.
   b. Open Teltonika Configurator → CAN bus settings.
   c. Use Autoscan to discover the correct program number.
   d. Save and verify readings match.

## 8.4 When to Contact Support

Contact the WakeCap Sakaka Squad support team when:

- Device remains offline after SIM replacement and configuration reset
- Health score remains below 30% after addressing all indicators
- CAN bus data consistently incorrect despite Autoscan
- Multiple devices in the same area experience simultaneous issues
- SIM data usage anomaly cannot be explained by configuration
- Firmware update fails repeatedly

---

\newpage

# 9. Safety Information

## 9.1 General Safety

::: {.warning}
**VEHICLE SAFETY** — Never install, adjust, or troubleshoot AVL devices while the vehicle is in motion. All installation and maintenance work must be performed with the vehicle stationary, engine off, and parking brake engaged.
:::

::: {.caution}
**BATTERY HAZARD** — Vehicle batteries contain sulfuric acid and produce hydrogen gas. Wear appropriate PPE (safety glasses, gloves) when working near batteries. Do not create sparks near battery terminals.
:::

## 9.2 Electrical Safety

::: {.warning}
**ELECTRICAL HAZARD** — Disconnect the vehicle battery negative terminal before performing any wiring work. Verify circuits are de-energized with a multimeter before touching exposed conductors.
:::

- Always use insulated tools when working on vehicle electrical systems
- Verify wire gauges match device requirements
- Use heat-shrink tubing on all splices and connections
- Route cables away from heat sources (exhaust manifolds, turbochargers)
- Fuse the power connection to protect against short circuits

## 9.3 Environmental Considerations

- The FMC130 is rated for operation from −40 °C to +85 °C (see *Section 3.1.3 Environmental Specifications*). In extreme heat environments, install the device in a shaded or ventilated location within the vehicle.
- Protect cable entry points against moisture ingress in wash-down environments.
- In dusty environments (desert construction sites), inspect cable connections quarterly for sand and dust accumulation.

## 9.4 PPE Requirements

| Task | Required PPE |
|:-----|:-------------|
| Tracker installation | Safety glasses, gloves, hard hat (on site) |
| Battery wiring | Safety glasses, acid-resistant gloves |
| Engine compartment work | Safety glasses, heat-resistant gloves |
| Working at height (on equipment) | Hard hat, safety harness, fall protection |

## 9.5 Emergency Procedures

In the event of a vehicle safety incident:

1. **Activate** the SOS button on the vehicle (if equipped) to send an immediate alert through the AVL system.
2. **Follow** site-specific emergency procedures.
3. **Report** the incident to the site safety officer.
4. WakeCap Observation Service will log the SOS event with timestamp, GPS coordinates, and vehicle ID for incident investigation.

---

\newpage

# Appendix A: Glossary

| Term | Definition |
|:-----|:----------|
| AVL | Automatic Vehicle Location — GPS-based real-time vehicle tracking system |
| CAN bus | Controller Area Network — vehicle communication bus for engine and diagnostic data |
| CEP | Circular Error Probable — radius of the circle containing 50% of GPS position fixes |
| FOTA | Firmware Over The Air — remote firmware update mechanism |
| GeoJSON | Open standard format for encoding geographic data structures |
| GNSS | Global Navigation Satellite System — satellite-based positioning (GPS, GLONASS, BeiDou, Galileo) |
| HDOP | Horizontal Dilution of Precision — measure of GPS horizontal accuracy quality |
| ICCID | Integrated Circuit Card Identifier — unique 20-digit SIM card serial number |
| IMEI | International Mobile Equipment Identity — unique 15-digit device identifier |
| J1939 | SAE standard for CAN bus communication in heavy-duty vehicles |
| OBD-II | On-Board Diagnostics version 2 — standardized vehicle diagnostic interface |
| PWAS | Proximity Warning Alert System — vehicle-to-worker proximity detection |
| SignalR | Microsoft library for real-time web communication via WebSocket |
| TTFF | Time To First Fix — time required for GNSS receiver to determine position |
| Traccar | Open-source GPS tracking platform used as the WakeCap tracking engine |

---

# Appendix B: Data Reporting Intervals

| Interval | Data Points / Hour | Approximate Monthly Data | Use Case |
|:---------|-------------------:|:-------------------------|:---------|
| 10 seconds | 360 | High | Client-requested high-accuracy tracking |
| 15 seconds | 240 | High | Enhanced monitoring |
| 30 seconds | 120 | Moderate | — |
| 1 minute | 60 | Moderate | — |
| **2 minutes (default)** | **30** | **Standard** | **Normal fleet tracking** |
| 5 minutes | 12 | Low | Battery conservation |

::: {.important}
Shorter reporting intervals significantly increase SIM data consumption. Conduct a 1-week pilot test on 3–4 vehicles before deploying shorter intervals fleet-wide to validate data usage against SIM plan limits.
:::

---

# Appendix C: Supported Equipment Types

| Category | Equipment Types |
|:---------|:---------------|
| Light Vehicles | Pickup trucks, SUVs, sedans, vans |
| Buses | Worker transport buses, minibuses |
| Heavy Vehicles | Dump trucks, tanker trucks, concrete mixers, flatbed trucks |
| Earthmoving | Excavators, bulldozers, wheel loaders, graders, backhoes |
| Lifting | Tower cranes, mobile cranes, forklifts, boom lifts |
| Specialized | Generators, compressors, welding machines (with engines) |

---

# Appendix D: Version History

| Version | Date | Changes |
|:--------|:-----|:--------|
| 1.0 | 2026-04-12 | Initial release |

---

# Appendix E: Contact Information

| | |
|:---|:---|
| **Company** | WakeCap Technologies |
| **Support Team** | Sakaka Squad (Equipment Manager) |
| **Portal** | portal.wakecap.com |
| **General** | support@wakecap.com |
| **Website** | www.wakecap.com |

---

*© 2026 WakeCap Technologies. All rights reserved.*
*WC-AVL-PM-v1.0 — Revision Date: 2026-04-12*

# WakeCap AVL (Automatic Vehicle Location) System — Knowledge Base

## Product Identity

- **Product Name:** WakeCap AVL System (Equipment Manager)
- **Product Code:** AVL
- **Category:** Vehicle & Equipment Tracking / Fleet Telematics
- **Current Platform Version:** Equipment Manager v1.8.1 (March 30, 2026)
- **Tracking Engine:** Traccar (open-source GPS tracking platform)
- **Legacy System:** GPS WOX (retired March 2026)
- **Portal URL:** portal.wakecap.com
- **Development Squad:** Sakaka Squad

---

## Hardware

### Primary Tracker: Teltonika FMC130

- **Type:** GPS/GNSS vehicle tracker with cellular connectivity
- **Identification:** 15-digit IMEI number per device
- **Connectivity:** Cellular (2G/4G LTE) via SIM card
- **GPS:** Multi-constellation GNSS (GPS, GLONASS, BeiDou, Galileo)
- **Interfaces:** CAN bus, 1-Wire, Digital/Analog I/O, RS232/RS485
- **Sensors Supported:** Ignition, SOS button, seatbelt, fuel level, temperature
- **Recording:** Onboard memory for data buffering (records at one interval, transmits at another)
- **Configuration:** Via Teltonika Configurator Tool
- **Firmware Updates:** FOTA (Firmware Over The Air) via fota.teltonika.lt
- **Power:** Direct vehicle battery connection (10–30 V DC range typical for Teltonika FMC series)
- **Mounting:** With mounting accessories (bracket, screws, cable ties)

### CAN Bus Adapter: Teltonika ALLCAN-300 (CAN300)

- **Purpose:** Reads vehicle CAN bus data for advanced telematics
- **Connection:** Wired to vehicle CAN H and CAN L lines, connected to FMC130
- **Vehicle Parameters Read:** RPM, fuel level, odometer, engine load, throttle position, mass air flow, speed, auxiliary system status
- **Configuration:** Requires correct program number per vehicle model; has Autoscan feature for discovery
- **Note:** Must be configured after all FMC130 wiring to vehicle is complete

### Workstation (On-Site)

- AVL Workstation with keyboard, mouse, and Windows license
- 27" Monitor for on-site monitoring
- Used by site automation engineers

---

## Communication & Connectivity

### SIM Card Providers

| Provider | Platform | Role |
|----------|----------|------|
| Caburn Telecom (M2MI) | m2miportal.com | Primary international SIM provider |
| Jasper Wireless (Mobily) | mobily.jasperwireless.com | Secondary provider |
| M2M Porta | m2miportal.com | M2M portal access |
| Local carriers | Mobily, STC, Zain | Regional coverage |

### Data Reporting Intervals

- **Default:** Every 2 minutes
- **High accuracy mode:** 10–15 seconds (4–5 data points per minute)
- **Consideration:** Shorter intervals increase SIM data consumption significantly

### Real-Time Communication

- **SignalR:** WebSocket-based real-time updates for map markers and device status
- **SMS Commands:** Remote device management (bring offline devices back online, push new configuration)

---

## Platform Features (Equipment Manager v1.8.1)

### Fleet Dashboard

- Real-time charts and fleet-wide metrics
- Mobilization breakdown
- Tracker connectivity status
- Equipment distribution overview
- Compliance timeline
- Alert activity summary
- CO₂ emissions summary
- Offline tracker detection

### Live Tracking & Maps

- Real-time GPS tracking with live position updates
- Custom vehicle icons (excavators, cranes, trucks, buses, etc.)
- Per-device live tracking toggle with loading overlay
- Route history playback with speed-based color coding and road projection
- Route stats panel: distance, max/avg speed, moving time
- Speed on hover over route points
- Real-time marker color updates when device status changes (via SignalR)
- Frosted glass transparent sidebar and info panel

### Alert System (20+ Alert Types)

| Alert Type | Description |
|------------|-------------|
| Overspeed | Speed exceeds configured threshold |
| Geofence Entry | Vehicle enters defined geofence boundary |
| Geofence Exit | Vehicle exits defined geofence boundary |
| Ignition On | Vehicle ignition turned on |
| Ignition Off | Vehicle ignition turned off |
| SOS | Emergency button pressed |
| Idle | Vehicle stationary with engine running |
| Stop | Vehicle stopped |
| Offline Detection | Device loses connectivity |
| Harsh Braking | Sudden deceleration detected |
| Harsh Acceleration | Sudden acceleration detected |
| Seatbelt Compliance | Seatbelt not fastened while driving |

- **Configurable notifications:** Email, Push, Silent
- **Custom thresholds and schedules** per alert type
- **Intelligent alert consolidation:** Ongoing violations consolidated into single alert with accurate duration and location context
- **Unified incident timeline:** All alerts flow into the Observation Service
- **Migration stats:** 258 alert rules and 63,000 device links migrated from GPS WOX

### Geofence Management

- Draw geofences directly on map with click-to-draw tools
- Customize colors and opacity per geofence
- Import/export geofences as GeoJSON files
- Visibility toggle to show/hide individual geofences

### Reports (12 Total)

#### Fleet Reports (6)

| Report | Description |
|--------|-------------|
| Driver Timesheet | Driver work hours and activity |
| Fleet Summary | Fleet-wide statistics overview |
| Trip Status | Trip start/end with route details |
| Track Data | Raw GPS track data export |
| Device List | All registered devices and status |
| Offline Devices | Devices that have gone offline |

#### Exportable Reports (6 — One-Click Excel Download)

| Report | Description |
|--------|-------------|
| Alert History | Historical alert data with timestamps |
| Compliance Status | Equipment compliance tracking |
| CO₂ Emissions | Per-equipment emissions breakdown |
| SIM Health | SIM card status and data usage |
| Equipment Utilization | Usage statistics per equipment |
| Device Health | Device performance and connectivity |

- **Ignition-based report boundaries:** Reports trim to actual engine ON/OFF times, removing parked noise
- **Early start / late end reports** (requested by field teams)

### Device Health Dashboard

- Stale GPS detection (catches devices reporting outdated locations)
- Dynamic health scores based on: GPS quality, connectivity, power stability, data freshness
- On-demand Teltonika diagnostics with detailed device status
- 7 health indicators per device showing component-level performance
- Fleet-wide health overview to quickly identify devices needing attention

### SIM Management

- Copy ICCID with one click
- SIM data usage visible in device management
- ICCID validation on SIM card creation (rejects invalid serial numbers)
- Live SIM status, usage, and provider data in health summaries
- Caburn M2MI and Jasper SIM card provider integration

### Equipment Management

- Fully independent microservice (faster, more reliable, scalable)
- 8-step equipment form wizard (basic info through operator assignment)
- Smart IMEI search (searchable dropdown matching by IMEI, equipment type, or plate number)
- Manual IMEI entry in equipment form
- Equipment list as default tab
- Guided feature tour for new users (React Joyride)
- QR code access to equipment info
- Excel export for data analysis

### CO₂ Emissions Tracking

- CO₂ inspections per equipment with full Testo 300 probe readings (O₂%, CO, NO, temps, pressure)
- Support for multiple fuel types + operational data (engine hours, active time, distance)
- Automatic telemetry from Traccar devices (engine hours, distance, active vs idle)
- Smart fallback to manual input if tracker data fails
- Fuel-based CO₂ calculations with predefined emission factors
- Default consumption rates per equipment type + idle consumption logic
- Dashboard widget: total CO₂, fuel usage, and distance
- Active vs Idle CO₂ visualization chart

### Equipment Inspection

- CO/O₂ Inspection Form: 8 key measurement fields (O₂%, CO, NO, Draft, Temperatures, etc.)
- Multi-inspection support per equipment
- Equipment specifications with PWAS Installed/Types & Door numbers
- Pre-mobilization process tracking
- TP Calibration fields

---

## Installation

### Light Vehicles

1. Connect power cable to vehicle battery positive (+)
2. Connect ground wire to vehicle battery negative (−)
3. Connect ignition wire to actual vehicle ignition source
4. Mount FMC130 device using mounting accessories
5. Insert SIM card
6. Configure device via Teltonika Configurator Tool

### Heavy Equipment

1. Same wiring principle as light vehicles
2. Ignition source location varies by machine type
3. Requires finding the correct ignition source on each equipment type
4. For CAN bus integration: wire ALLCAN-300 to CAN H and CAN L after FMC130 wiring is complete

### AVL Device Transfer (Client-Owned Devices)

**Included in transfer scope:**
- First-time installation of new SIM card
- First-time configuration & linking to WakeCap platform
- Operational support during subscription period

**Not included (unit price applies):**
- Demobilize hardware from Vehicle A & reinstall in Vehicle B (200 SAR per device)

**Out of scope:**
- Hardware warranty
- Repair or replacement in case of damage

---

## Deployment Scale

| Project | Organization | AVL Devices | Notes |
|---------|--------------|-------------|-------|
| JCDC | Aramco | 20 | Active |
| JCDC 2 | Aramco | 90 | Active |
| Riyas (NGL) | Aramco | 75+ | 117 vehicles total |
| Jafurah (Hyundai PKG-03) | Aramco | 42+ | 250 planned transfers |
| Juaymah C3C4 (Enppi) | Aramco | 146 | Ordered Oct 2024 |
| Fadhili | Aramco | 250 | Pending transfer |
| Master Gas (L&T Ph3 Pkg8) | Aramco | Active | — |

---

## Version History

| Version | Date | Key Changes |
|---------|------|-------------|
| v1.0.0 | Oct 8, 2025 | Initial release — centralized tracking, dashboard, inspections, QR codes, Excel export |
| v1.1.0 | Oct 21, 2025 | CO/O₂ inspection tracking, 8 measurement fields, multi-inspection support |
| v1.1.1 | Nov 13, 2025 | Inspection creation/expiration, date picker UI |
| v1.1.2 | Nov 23, 2025 | PWAS specs, door numbers, pre-mobilization process, equipment types |
| v1.2.0 | Dec 28, 2025 | Migration to GPS WOX, AVL sync job, observation flow migration |
| v1.5.0 | Jan 26, 2026 | AVL Dashboard, new required fields, redesigned reports, tracker map upgrades |
| v1.7.0 | Mar 1, 2026 | Independent microservice, 8-step wizard, Traccar live tracking, 20+ alerts, geofencing, glassmorphism UI |
| v1.7.5 | Mar 10, 2026 | GPS WOX retired, Traccar-only, intelligent alerts, Device Health Dashboard, route playback with alerts |
| v1.8.1 | Mar 30, 2026 | Fleet Dashboard, 6 new reports, harsh braking/acceleration/seatbelt alerts, SIM management, SignalR |

---

## Backend Architecture

- **Equipment Manager:** Independent microservice
- **Traccar:** GPS tracking engine
- **Integration Service:** Syncs equipment data to WakeCap portal
- **Observation Service:** Receives alerts and maps to observations
- **SignalR:** Real-time WebSocket updates
- **Webhook:** Receives events from GPS platforms
- **PowerBI:** Analytics and reporting dashboards
- 40+ API endpoints, 6 automated test suites

---

## Glossary

| Term | Definition |
|------|-----------|
| AVL | Automatic Vehicle Location — GPS-based vehicle tracking |
| IMEI | International Mobile Equipment Identity — unique 15-digit device identifier |
| ICCID | Integrated Circuit Card Identifier — unique SIM card serial number |
| FMC130 | Teltonika GPS tracker model used in WakeCap AVL deployments |
| ALLCAN-300 | Teltonika CAN bus adapter for reading vehicle telematics data |
| Traccar | Open-source GPS tracking platform powering WakeCap fleet tracking |
| FOTA | Firmware Over The Air — remote firmware update mechanism |
| Geofence | Virtual boundary on a map triggering alerts on entry/exit |
| SignalR | Microsoft real-time communication library for WebSocket connections |
| PWAS | Proximity Warning Alert System — safety system for vehicle-to-worker proximity |
| Testo 300 | Flue gas analyzer probe used for CO₂ emission inspections |
| GeoJSON | Open standard format for geographic data structures |

# WakeCap Weather Station
## Product Manual

**Document ID:** WC-WS-PM-v1.0
**Revision Date:** February 2026
**Model:** PH-282-AIR

---

## Document Information

| Field | Value |
|-------|-------|
| Document Number | WC-WS-PM-v1.0 |
| Product | WakeCap Weather Station |
| Model | PH-282-AIR |
| Revision | 1.0 |
| Date | February 2026 |
| Classification | Technical Documentation |

### Revision History

| Version | Date | Description | Author |
|---------|------|-------------|--------|
| 1.0 | Feb 2026 | Initial release | WakeCap Documentation |

---

## Table of Contents

1. Product Overview
2. System Architecture
3. System Components
4. Sensor Specifications
5. Data Acquisition Terminal Specifications
6. Electrical Specifications
7. Environmental Specifications
8. Communication Interfaces
9. Installation Overview
10. Configuration and Settings
11. Operation
12. Maintenance
13. Safety Information
14. Certifications and Compliance
15. Ordering Information
16. Support Information
17. Appendix A: Glossary
18. Appendix B: Technical Drawings

---

## 1. Product Overview

### 1.1 Introduction

The WakeCap Weather Station (Model: PH-282-AIR) is a comprehensive environmental monitoring system designed for industrial sites, construction zones, and remote locations. The system provides real-time monitoring of weather conditions and air quality to support safety compliance, operational planning, and environmental awareness in mega construction and oil & gas deployments.

### 1.2 Intended Use

The Weather Station is intended for:

- Real-time environmental data collection
- Safety compliance monitoring (gas detection, weather alerts)
- Operational planning support (wind conditions for crane operations, rainfall monitoring)
- Historical data logging for analysis and regulatory reporting
- Remote monitoring via cloud-based dashboard

### 1.3 Key Features

- **Wireless Mesh Connectivity:** No cables required from Weather Station to gateway
- **Solar-Powered Operation:** Autonomous operation with battery backup
- **Real-Time Cloud Transmission:** Data available on web dashboard within seconds
- **Multi-Sensor Support:** Weather, gas detection, and particulate matter monitoring
- **Mobile Verification:** WakeCap Verify App for field status checks
- **Certified Accuracy:** All sensors verified per international metrological standards

### 1.4 Product Identification

| Field | Value |
|-------|-------|
| Product Name | WakeCap Weather Station |
| Primary Model | PH-282-AIR |
| Equipment Type | Environmental Detector |
| Safety Class | Class II Appliance |
| Use Environment | Outdoor Only |

### 1.5 Manufacturer

**WUHAN XINPUHUI TECHNOLOGY CO., LTD**
Address: 8004-44, 8th Floor, Longyue Building, No. 42 Guanggu 1st Road, Donghu New Technology Development Zone, Wuhan, China
Website: www.whxph.com
Technical Support: 027-82666096
Certification: ISO9001:2008

### 1.6 Distributor

**Saudi Wakecap Company for Information Systems Technologies**
P.O. Box: 85540
Riyadh 11612, Saudi Arabia

---

## 2. System Architecture

### 2.1 Architecture Overview

The WakeCap Weather Station system follows a layered data flow architecture that transforms raw sensor measurements into actionable information accessible via web dashboard.

[IMAGE: System architecture block diagram showing data flow from sensors to dashboard]

```
SENSORS -> WS BOX -> MODBUS ASSET -> ANCHORS -> GATEWAY -> CLOUD -> DASHBOARD
[Wired]    [Wired]   [Wireless]    [Wireless] [Internet] [Internet]
```

### 2.2 Architecture Layers

| Layer | Component | Function |
|-------|-----------|----------|
| 1 | Environmental Sensors | Data collection (weather, gas, particulate) |
| 2 | WS Box (Data Acquisition Terminal) | Data aggregation and processing |
| 3 | MODBUS Asset | Protocol bridge (wired to wireless) |
| 4 | Mesh Anchors | Wireless network relay |
| 5 | Gateway | Internet connectivity |
| 6 | Cloud Server | Data processing and storage |
| 7 | Web Dashboard | User interface and visualization |

### 2.3 Communication Protocols

| Connection | Protocol | Medium |
|------------|----------|--------|
| Sensors to WS Box | Analog/Digital signals | Wired |
| WS Box to MODBUS Asset | MODBUS RTU over RS485 | Wired |
| MODBUS Asset to Anchors | Proprietary mesh protocol | Wireless |
| Anchors to Gateway | Proprietary mesh protocol | Wireless |
| Gateway to Cloud | HTTPS | Cellular/WiFi/Ethernet |

### 2.4 Data Flow Description

1. **Data Collection:** Environmental sensors continuously measure conditions and output analog or digital signals
2. **Data Aggregation:** WS Box receives signals, converts to digital values, displays on LCD, and packages into MODBUS RTU format
3. **Protocol Conversion:** MODBUS Asset receives RS485 data, validates integrity, and broadcasts wirelessly
4. **Wireless Relay:** Mesh network relays data through multiple Anchors toward Gateway
5. **Internet Transmission:** Gateway transmits data to Cloud via HTTPS
6. **Cloud Processing:** Server validates, processes, stores data, and triggers alerts
7. **Visualization:** Dashboard displays real-time and historical data

---

## 3. System Components

### 3.1 Component Overview

[IMAGE: Exploded view showing all system components with labels]

| Component | Model | Function |
|-----------|-------|----------|
| Data Acquisition Terminal | PH-1 | Central data aggregation unit |
| Wind Speed Sensor | PHWS-5V-M | Measures wind velocity |
| Wind Direction Sensor | PH-WDZ-5V-V | Measures wind bearing |
| Temperature/Humidity Sensor | PH-FC-X | Measures ambient conditions |
| Atmospheric Pressure Sensor | PH-BYX-12V-W2 | Measures barometric pressure |
| Rain Gauge | PHY-5V-M-01 | Measures precipitation |
| Particulate Sensor | PH-282-PM100 | Measures PM2.5/PM10/TSP |
| H2S Sensor | PH-H2S | Detects hydrogen sulfide |
| SO2 Sensor | PH-SO2 | Detects sulfur dioxide |
| CO Sensor | PH-CO | Detects carbon monoxide |
| CO2 Sensor | PH-CO2 | Detects carbon dioxide |

### 3.2 WS Box (Data Acquisition Terminal)

The WS Box is the central data aggregation unit that collects and processes readings from all connected sensors.

[IMAGE: WS Box front panel layout showing LCD display, terminals, and connectors]

#### 3.2.1 Physical Layout

```
+-------------------------------------+
|             WS BOX                  |
|                                     |
|    +-------------------------+      |
|    |     LCD DISPLAY         |      |
|    |  (Shows live readings)  |      |
|    +-------------------------+      |
|                                     |
|  SENSOR TERMINALS:                  |
|  +---+---+---+---+---+---+          |
|  |T1 |T2 |T3 |T4 |T5 |T6 |          |
|  +---+---+---+---+---+---+          |
|  Wind Wind Temp Hum Press Rain      |
|  Spd  Dir                           |
|                                     |
|  RS485 OUTPUT:    POWER INPUT:      |
|  +---+---+       +---------+        |
|  | A | B |       | 12V DC  |        |
|  +---+---+       +---------+        |
+-------------------------------------+
```

#### 3.2.2 Terminal Assignments

| Terminal | Sensor | Signal Type |
|----------|--------|-------------|
| T1 | Wind Speed | Analog |
| T2 | Wind Direction | Analog |
| T3 | Temperature | Digital |
| T4 | Humidity | Digital |
| T5 | Atmospheric Pressure | Analog |
| T6 | Rainfall | Pulse |

#### 3.2.3 Control Buttons

| Button | Function |
|--------|----------|
| Up Arrow | Menu select: move up |
| Down Arrow | Menu select: move down |
| Left Arrow | Menu options: previous / previous interface |
| Right Arrow | Menu options: next / next interface |
| + | Modify parameters: increase value |
| - | Modify parameters: decrease value |
| Confirm | Enter menu / confirm selection |
| Cancel | Exit menu / cancel operation |

### 3.3 MODBUS Asset

The MODBUS Asset acts as a communication bridge between the wired WS Box and the wireless mesh network.

[IMAGE: MODBUS Asset layout showing NFC tag, LED indicator, and terminals]

#### 3.3.1 Physical Layout

```
+------------------------------------+
|          MODBUS ASSET              |
|                                    |
|        +---------------+           |
|        |   NFC TAG     |           |
|        | (Configuration)|          |
|        +---------------+           |
|                                    |
|    +-----+                         |
|    | LED | <- Status indicator     |
|    +-----+                         |
|                                    |
|  RS485 INPUT:     POWER:           |
|  +---+---+      +---+---+          |
|  | A | B |      | + | - |          |
|  +---+---+      +---+---+          |
+------------------------------------+
```

#### 3.3.2 LED Status Indicator

| Blinks per Minute | Status | Meaning |
|-------------------|--------|---------|
| 1 | NORMAL | System operating correctly, data transmitting |
| 2 | COMMUNICATION ERROR | No data from WS Box, check RS485 wiring |

### 3.4 Mesh Network Anchors

Anchors create a wireless mesh network that relays data from the MODBUS Asset to the Gateway.

#### 3.4.1 Mesh Network Features

- Self-healing topology
- Multiple redundant paths
- Automatic route optimization
- Status viewable in WakeCap Verify App

#### 3.4.2 Mesh Topology Example

```
    +---------+
    | MODBUS  |
    | ASSET   |
    +----+----+
         | wireless
         v
    +---------+     +---------+
    | ANCHOR  |---->| ANCHOR  |
    |   #1    |     |   #2    |
    +----+----+     +----+----+
         |               |
         v               v
    +---------+     +---------+
    | ANCHOR  |---->| GATEWAY |
    |   #3    |     |         |
    +---------+     +---------+
```

### 3.5 Gateway

The Gateway connects the local mesh network to the internet and cloud server.

#### 3.5.1 Connectivity Options

| Option | Description |
|--------|-------------|
| Cellular | 4G/LTE with SIM card |
| WiFi | Connects to local wireless network |
| Ethernet | Wired LAN connection |

### 3.6 Cloud Server and Dashboard

#### 3.6.1 Cloud Server Functions

- Receives data from Gateway via HTTPS
- Validates and processes data
- Stores data in backend database
- Handles user authentication
- Manages alerts and notifications

#### 3.6.2 Dashboard Features

- Real-time sensor data display
- Historical data graphs and charts
- Data export (configurable date range)
- Alert configuration and management
- Site management
- User access control

---

## 4. Sensor Specifications

All sensor specifications verified per Calibration Lab Test Certificate CCTS240605001S (Test Date: 2025-06-16 to 2025-06-18).

### 4.1 Wind Speed Sensor (PHWS-5V-M)

[IMAGE: Wind speed sensor (anemometer) with mounting details]

| Parameter | Specification |
|-----------|---------------|
| Range | 0 to 70 m/s |
| Resolution | 0.1 m/s |
| Accuracy | +/-(0.3 + 0.03V) m/s |
| Starting Wind Speed | <= 0.8 m/s |
| Output | Analog voltage |

### 4.2 Wind Direction Sensor (PH-WDZ-5V-V)

[IMAGE: Wind direction sensor (wind vane) with mounting details]

| Parameter | Specification |
|-----------|---------------|
| Range | 0 to 360 degrees |
| Resolution | 1 degree |
| Accuracy | +/-3 degrees |
| Starting Wind Speed | <= 0.5 m/s |
| Output | Analog voltage |

### 4.3 Air Temperature Sensor (PH-FC-X)

| Parameter | Specification |
|-----------|---------------|
| Range | -50 to +100 deg C |
| Resolution | 0.1 deg C |
| Accuracy | +/-0.5 deg C |
| Housing | Radiation shield (Baiye Box) |

### 4.4 Air Humidity Sensor (PH-FC-X)

| Parameter | Specification |
|-----------|---------------|
| Range | 0 to 100% RH |
| Resolution | 0.1% RH |
| Accuracy | +/-5% RH |
| Housing | Radiation shield (Baiye Box) |

### 4.5 Atmospheric Pressure Sensor (PH-BYX-12V-W2)

| Parameter | Specification |
|-----------|---------------|
| Range | 10 to 1100 hPa |
| Resolution | 0.1 hPa |
| Accuracy | +/-0.3 hPa |

### 4.6 Rain Gauge (PHY-5V-M-01)

[IMAGE: Stainless steel rain gauge with funnel and collection mechanism]

| Parameter | Specification |
|-----------|---------------|
| Range | 0 to 999.9 mm |
| Resolution | 0.2 mm |
| Accuracy | +/-4% |
| Rainfall Intensity | 0 to 4 mm/min |
| Material | Stainless steel |

### 4.7 Gas Sensors (Optional)

#### 4.7.1 Hydrogen Sulfide Sensor (PH-H2S)

| Parameter | Specification |
|-----------|---------------|
| Range | 0 to 10 ppm |
| Resolution | 0.001 ppm |
| Accuracy | +/-3% |

#### 4.7.2 Sulfur Dioxide Sensor (PH-SO2)

| Parameter | Specification |
|-----------|---------------|
| Range | 0 to 2 ppm |
| Resolution | 0.001 ppm |
| Accuracy | +/-3% |

#### 4.7.3 Carbon Monoxide Sensor (PH-CO)

| Parameter | Specification |
|-----------|---------------|
| Range | 0 to 10 ppm |
| Resolution | 0.01 ppm |
| Accuracy | +/-3% |

#### 4.7.4 Carbon Dioxide Sensor (PH-CO2)

| Parameter | Specification |
|-----------|---------------|
| Range | 0 to 2000 ppm |
| Resolution | 1 ppm |
| Accuracy | +/-(40 ppm + 3% F.S.) |

### 4.8 Particulate Matter Sensors (PH-282-PM100)

#### 4.8.1 PM2.5 Sensor

| Parameter | Specification |
|-----------|---------------|
| Range | 0 to 1000 ug/m3 |
| Resolution | 1 ug/m3 |
| Accuracy | +/-10% |

#### 4.8.2 PM10 Sensor

| Parameter | Specification |
|-----------|---------------|
| Range | 0 to 2000 ug/m3 |
| Resolution | 1 ug/m3 |
| Accuracy | +/-15% |

#### 4.8.3 TSP Sensor

| Parameter | Specification |
|-----------|---------------|
| Range | 0 to 2000 ug/m3 |
| Resolution | 1 ug/m3 |
| Accuracy | +/-15% |

---

## 5. Data Acquisition Terminal Specifications

### 5.1 Processor and Memory

| Parameter | Specification |
|-----------|---------------|
| CPU | ARM 32-bit Cortex-M3 |
| Maximum Frequency | 108 MHz |
| System Clock | Up to 72 MHz |
| A/D Conversion | 12-bit |
| FLASH Storage | 4M bits |
| Storage Capacity | >1 year meteorological data |
| Data Protection | Button battery backup |

### 5.2 Display

| Parameter | Specification |
|-----------|---------------|
| Type | LCD dot matrix |
| Resolution | 192 x 64 pixels |
| Display Capability | 12 x 4 characters |
| Languages | Chinese, English (switchable) |
| Content | Data, time, date, parameters, settings |

### 5.3 Data Storage

| Parameter | Specification |
|-----------|---------------|
| Internal Storage | >1 year meteorological data |
| External Storage | SD card, USB drive |
| Storage Interval | 1 to 240 minutes (configurable) |
| Data Export | Via USB to PC software |

### 5.4 Protocol Support

| Protocol | Description |
|----------|-------------|
| XPH | Proprietary protocol |
| MODBUS RTU | Industrial standard |
| JSON | Web-compatible format |

- Manual protocol switching supported
- Configurable device address (0-255)

### 5.5 Additional Features

- Watchdog circuit with automatic reset
- GPS positioning (optional)
- Unique device ID (queryable)
- Active/passive reporting modes
- Remote firmware upgrade capability
- LED screen extension support (single/dual/full-color)
- Touch screen extension support
- Relay control output (multiple switches)
- Photoelectric isolation (anti-interference)

---

## 6. Electrical Specifications

### 6.1 Power Supply Options

| Option | Specification |
|--------|---------------|
| DC Input | 12 to 36 V DC |
| AC Input | 220 V AC (with adapter) |
| Solar | Solar panel + MPPT controller + battery |
| Connector | Barrel jack (12V DC to WS Box) |

### 6.2 Power Consumption

| Parameter | Specification |
|-----------|---------------|
| Operating Voltage | DC 12V |
| Power Consumption | <= 2W (overall system) |

### 6.3 Electrical Safety

Specifications per GB 4793.1-2007:

| Parameter | Specification |
|-----------|---------------|
| Insulation Resistance | >= 10 MOhm (power terminal to casing) |
| Dielectric Strength | 1500V AC for 1 minute (no breakdown or arcing) |
| Leakage Current | <= 5 mA (AC operation) |

### 6.4 Power System Architecture

```
+--------------+     +----------+     +-------------+     +--------+
| SOLAR PANEL  |---->|   MPPT   |---->|   BATTERY   |---->| WS BOX |
|              |     |Controller|     |   (12V)     |     |        |
+--------------+     +----------+     +-------------+     +--------+
```

#### 6.4.1 Solar Panel

- Generates electricity from sunlight
- Connected to MPPT controller
- Must be oriented for optimal sun exposure

#### 6.4.2 MPPT Controller

- Maximum Power Point Tracking
- Regulates solar panel output
- Charges battery efficiently
- LED/display for status indication
- Protects battery from overcharge/discharge

#### 6.4.3 Battery

- Stores energy for continuous operation
- Provides power during night/cloudy conditions
- Nominal voltage: 12V

---

## 7. Environmental Specifications

### 7.1 Operating Conditions

Specifications per GB/T 2423.1-2008, GB/T 2423.2-2008, and GB/T 2423.3-2016:

| Parameter | Specification |
|-----------|---------------|
| Operating Temperature | -20 to +50 deg C |
| Operating Humidity | 0 to 95% RH (non-condensing) |
| Use Environment | Outdoor |

### 7.2 Sensor Operating Ranges

| Sensor | Operating Range |
|--------|----------------|
| Temperature Sensor | -50 to +100 deg C (measurement range) |
| All Other Sensors | Per system operating conditions |

### 7.3 Equipment Classification

| Parameter | Classification |
|-----------|---------------|
| Safety Class | Class II appliance |
| Use Environment | Outdoor use only |

---

## 8. Communication Interfaces

### 8.1 RS485 Interface

| Parameter | Specification |
|-----------|---------------|
| Type | 2-wire differential |
| Terminals | A (485-), B (485+), GND |
| Protocol | MODBUS RTU |
| Cable | Shielded twisted pair (recommended) |

#### 8.1.1 RS485 Pinout

| Terminal | Signal | Description |
|----------|--------|-------------|
| A | 485- | Differential signal negative |
| B | 485+ | Differential signal positive |
| GND | Ground | Signal ground |

### 8.2 RS232 Interface

| Parameter | Specification |
|-----------|---------------|
| Type | Standard serial port |
| Use | Direct PC connection |

### 8.3 USB Interface

| Parameter | Specification |
|-----------|---------------|
| Type | USB port |
| Use | Data export to PC |
| Storage | SD card and USB drive support |

### 8.4 Optional Communication Modules

| Module | Description |
|--------|-------------|
| 4G/5G | Cellular connectivity |
| WiFi | Wireless LAN |
| Ethernet | Wired LAN |
| LoRa | Long-range wireless |
| NB-IoT | Narrowband IoT |

### 8.5 Communication Settings

| Parameter | Range |
|-----------|-------|
| Device Address | 0 to 255 |
| Storage Interval | 1 to 240 minutes |
| Reporting Mode | Active or passive (polling) |

---

## 9. Installation Overview

**NOTICE:** For complete installation instructions, refer to the WakeCap Weather Station Installation Guide (WC-WS-IG-v1.0).

### 9.1 Installation Summary

1. Complete site survey and determine sensor placement
2. Mount sensors on mast or tripod
3. Connect sensor cables to WS Box terminals (T1-T6)
4. Connect RS485 cable from WS Box to MODBUS Asset
5. Connect power (12V DC from solar/battery system)
6. Verify operation via LCD display and LED indicators
7. Confirm data flow in WakeCap Verify App and Dashboard

### 9.2 Critical Wiring Note

**RS485 Connection - Match Terminals Exactly:**

| WS Box | MODBUS Asset |
|--------|--------------|
| Terminal A | Terminal A |
| Terminal B | Terminal B |

Reversed wiring causes communication failure (MODBUS LED blinks 2x per minute).

### 9.3 Related Documents

| Document | Content |
|----------|---------|
| WC-WS-IG-v1.0 | Complete Installation Guide |
| WC-WS-QR-v1.0 | Quick Reference Guide |
| WC-WS-TG-v1.0 | Troubleshooting Guide |

---

## 10. Configuration and Settings

### 10.1 Accessing Settings Menu

1. Press **Confirm** button to enter menu
2. Use **Up/Down** arrows to navigate options
3. Use **Left/Right** arrows to switch interface pages
4. Press **Confirm** to select option
5. Use **+/-** buttons to modify values
6. Press **Cancel** to exit without saving

### 10.2 Settings Menu Options

| Option | Description |
|--------|-------------|
| Version Information | View firmware version number |
| Time Setting | Set system date and time |
| Other Setting | Electronic compass configuration |
| Communication Settings | Set device address (0-255), TCP/IP settings |
| Parameter Reset | Factory reset (clears all data) |
| Interval | Set data storage interval (1-240 minutes) |
| Language Settings | Switch between Chinese and English |
| Data Save | Select external storage: SD / USB / None |

### 10.3 Display Interfaces

The LCD display has four interface pages:

| Page | Content |
|------|---------|
| Pg1 | 8-channel sensor readings (channels 1-8) |
| Pg2 | 8-channel sensor readings (channels 9-16) |
| Pg3 | External memory status |
| Set | Parameter settings menu |

### 10.4 Data Storage Configuration

#### 10.4.1 Internal Storage

- Automatically stores data per configured interval
- Capacity: >1 year of meteorological data
- Protected by button battery during power loss

#### 10.4.2 External Storage

1. Insert SD card or USB drive
2. Navigate to Settings > Data Save
3. Select storage medium: SD / USB
4. Data automatically exports to external storage

---

## 11. Operation

### 11.1 Normal Operation

During normal operation:

1. **WS Box LCD** displays current date, time, and sensor values
2. **MODBUS LED** blinks once per minute
3. **Data** transmits through mesh network to cloud
4. **Dashboard** shows real-time values

### 11.2 Monitoring System Status

#### 11.2.1 WS Box Display Status

| Display | Status | Meaning |
|---------|--------|---------|
| Live values shown | NORMAL | Sensors operating correctly |
| All zeros | SENSOR ERROR | Check sensor cable connections |
| Screen OFF | POWER ERROR | Check power supply |

#### 11.2.2 MODBUS Asset LED Status

| Blinks/Minute | Status |
|---------------|--------|
| 1 | Normal operation |
| 2 | Communication error |

### 11.3 WakeCap Verify App

Use the mobile app to verify system status:

- View Anchor online/offline status
- View Gateway online/offline status
- Verify mesh network connectivity
- Check device configurations

### 11.4 Dashboard Operations

#### 11.4.1 Real-Time Monitoring

- View current sensor readings
- Monitor multiple sites simultaneously
- Receive alert notifications

#### 11.4.2 Historical Data

- View graphs and charts
- Select custom date ranges
- Export data (CSV format)

#### 11.4.3 Alert Configuration

- Set threshold values per parameter
- Configure notification recipients
- Define alert escalation rules

---

## 12. Maintenance

### 12.1 Maintenance Schedule

#### 12.1.1 Monthly Maintenance

| Task | Description |
|------|-------------|
| Visual Inspection | Inspect all sensors for physical damage |
| Cable Check | Verify all cable connections secure |
| Rain Gauge Cleaning | Clean funnel and remove debris |
| Data Verification | Compare dashboard data with field readings |

#### 12.1.2 Annual Maintenance

| Task | Description |
|------|-------------|
| Full Calibration | Calibrate all sensors per standards |
| Gas Sensor Replacement | Replace consumable gas sensors |
| Firmware Update | Update to latest firmware version |
| System Test | Complete end-to-end system verification |

### 12.2 Calibration Requirements

| Sensor Type | Calibration Interval | Requirements |
|-------------|---------------------|--------------|
| Gas Sensors | 12 months minimum | Certified calibration gas |
| Environmental Sensors | 12 months | Field calibration equipment |
| All Sensors | Per JJF 1076-2020 | Accredited laboratory |

### 12.3 Cleaning Procedures

#### 12.3.1 Rain Gauge

1. Remove funnel assembly
2. Clean funnel interior with soft brush
3. Flush with clean water
4. Inspect tipping mechanism
5. Reassemble and verify level

#### 12.3.2 Sensors

1. Wipe sensor housings with damp cloth
2. Do not use solvents or abrasives
3. Ensure Baiye Box vents are unobstructed
4. Check for insect or bird nests

### 12.4 Battery Maintenance

- Check battery voltage monthly
- Replace battery when voltage drops below 12V under load
- Inspect terminals for corrosion
- Verify MPPT controller operation

---

## 13. Safety Information

### 13.1 Electrical Safety

**WARNING: ELECTRICAL HAZARD**

Risk of electric shock or equipment damage.

- Always use appropriate Personal Protective Equipment (PPE)
- De-energize equipment before performing maintenance
- Verify voltage with calibrated multimeter before touching terminals
- Follow site-specific electrical safety procedures
- Use only specified voltage range (DC 12-36V or AC 220V)

### 13.2 Environmental Safety

**CAUTION: GAS DETECTION**

Hazardous atmosphere may be present.

- Check gas sensor readings before entering monitored area
- Follow site evacuation procedures if gas alarms trigger
- Use respiratory protection as required by site safety plan
- Do not rely solely on Weather Station for life safety decisions

### 13.3 Installation Safety

**CAUTION: OUTDOOR INSTALLATION**

Risk of injury during installation.

- Equipment rated for outdoor use only
- Ensure proper grounding of all equipment
- Protect electrical connections from moisture ingress
- Follow mounting guidelines for wind sensors
- Use appropriate fall protection when working at height

### 13.4 Maintenance Safety

**NOTICE: MAINTENANCE REQUIREMENTS**

- Only qualified personnel should perform maintenance
- Use proper lockout/tagout procedures
- Dispose of replaced components per local regulations
- Gas sensors are consumable - handle per manufacturer guidelines

---

## 14. Certifications and Compliance

### 14.1 Test Report Information

| Field | Value |
|-------|-------|
| Report Number | CCTS240605001S |
| Test Date | 2025-06-16 to 2025-06-18 |
| Report Issue Date | 2025-06-19 |
| Testing Laboratory | Shenzhen Zhongan Quality Inspection and Certification Co., Ltd. |
| Laboratory Address | Room 301&313, No. 20, Xinhe Road, Xinqiao Street, Bao'an District, Shenzhen, Guangdong, China |
| Test Result | PASS (all parameters) |

### 14.2 Test Standards Applied

#### 14.2.1 Metrological Standards

| Standard | Description |
|----------|-------------|
| JJG695-2019 | Anemometers |
| JJG635-2011 | Atmospheric Pressure |
| JJG551-2021 | Thermometers |
| JJG005-2015 | Humidity |
| JJG004-2011 | General Standard |
| JJG 431-2014 | Rain Gauges |
| JJF 1076-2020 | Calibration |

#### 14.2.2 Environmental Standards

| Standard | Description |
|----------|-------------|
| HJ 653-2021 | Environmental monitoring |
| GB16297-1996 | Air pollutant emissions |

#### 14.2.3 Environmental Testing Standards

| Standard | Description |
|----------|-------------|
| GB/T 2423.1-2008 | Cold test |
| GB/T 2423.2-2008 | Dry heat test |
| GB/T 2423.3-2016 | Damp heat test |

#### 14.2.4 Electrical Safety Standards

| Standard | Description |
|----------|-------------|
| GB 4793.1-2007 | Safety requirements for electrical equipment |

### 14.3 Manufacturer Certification

| Certification | Scope |
|---------------|-------|
| ISO9001:2008 | Quality Management System |

---

## 15. Ordering Information

### 15.1 Standard Configuration

| Item | Model | Included |
|------|-------|----------|
| Data Acquisition Terminal | PH-1 | Yes |
| Wind Speed Sensor | PHWS-5V-M | Yes |
| Wind Direction Sensor | PH-WDZ-5V-V | Yes |
| Temperature/Humidity Sensor | PH-FC-X | Yes |
| Atmospheric Pressure Sensor | PH-BYX-12V-W2 | Yes |
| Rain Gauge | PHY-5V-M-01 | Yes |
| Radiation Shield (Baiye Box) | - | Yes |

### 15.2 Optional Gas Sensors

| Item | Model |
|------|-------|
| Hydrogen Sulfide Sensor | PH-H2S |
| Sulfur Dioxide Sensor | PH-SO2 |
| Carbon Monoxide Sensor | PH-CO |
| Carbon Dioxide Sensor | PH-CO2 |

### 15.3 Optional Particulate Sensors

| Item | Model |
|------|-------|
| PM2.5/PM10/TSP Sensor | PH-282-PM100 |

### 15.4 Optional Accessories

| Item | Description |
|------|-------------|
| Field Protection Case | Weatherproof enclosure for WS Box |
| Tripod Mounting System | Adjustable height tripod |
| Solar Panel Kit | Solar panel with mounting hardware |
| MPPT Controller | Solar charge controller |
| Battery System | 12V battery with enclosure |
| Adapter Cables | Various configurations |
| Communication Modules | 4G/5G, WiFi, Ethernet, LoRa, NB-IoT |

---

## 16. Support Information

### 16.1 Technical Support

**Manufacturer:**
WUHAN XINPUHUI TECHNOLOGY CO., LTD
Technical Support: 027-82666096
Website: www.whxph.com

### 16.2 Regional Support

**Saudi Arabia:**
Saudi Wakecap Company for Information Systems Technologies
P.O. Box: 85540
Riyadh 11612, Saudi Arabia

### 16.3 Documentation

| Document | Number | Description |
|----------|--------|-------------|
| Product Manual | WC-WS-PM-v1.0 | This document |
| Installation Guide | WC-WS-IG-v1.0 | Complete installation instructions |
| Quick Reference Guide | WC-WS-QR-v1.0 | Field reference card |
| Troubleshooting Guide | WC-WS-TG-v1.0 | Diagnostic procedures |
| Datasheet | WC-WS-DS-v1.0 | Product specifications |

---

## Appendix A: Glossary

| Term | Definition |
|------|------------|
| A/D | Analog to Digital (conversion) |
| ARM | Advanced RISC Machine (processor architecture) |
| Baiye Box | Radiation shield for temperature/humidity sensor |
| GPRS | General Packet Radio Service |
| GPS | Global Positioning System |
| hPa | Hectopascal (pressure unit, equivalent to mbar) |
| H2S | Hydrogen Sulfide |
| LCD | Liquid Crystal Display |
| LED | Light Emitting Diode |
| LoRa | Long Range (wireless protocol) |
| mbar | Millibar (pressure unit) |
| MODBUS | Modular Bus (communication protocol) |
| MPPT | Maximum Power Point Tracking |
| NB-IoT | Narrowband Internet of Things |
| NFC | Near Field Communication |
| PM2.5 | Particulate Matter less than 2.5 micrometers |
| PM10 | Particulate Matter less than 10 micrometers |
| ppm | Parts Per Million |
| RH | Relative Humidity |
| RS232 | Recommended Standard 232 (serial communication) |
| RS485 | Recommended Standard 485 (serial communication) |
| RTU | Remote Terminal Unit |
| SO2 | Sulfur Dioxide |
| TSP | Total Suspended Particulates |
| USB | Universal Serial Bus |

---

## Appendix B: Technical Drawings

[IMAGE: WS Box dimensional drawing with mounting hole pattern]

[IMAGE: System wiring diagram showing all connections]

[IMAGE: Sensor mounting configuration diagram]

[IMAGE: Power system wiring diagram]

---

**Document:** WC-WS-PM-v1.0
**WakeCap Technologies**

*End of Document*

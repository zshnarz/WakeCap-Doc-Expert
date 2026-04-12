# WakeCap Weather Station - Product Knowledge

Environmental Monitoring System Documentation

## 1. Product Identity

### 1.1 Product Name

WakeCap Weather Station (Automatic Weather Station System)

### 1.2 Model Numbers

Primary Model: PH-282-AIR

Sub-component Models:
- PHWS-5V-M       Wind Speed Sensor
- PH-WDZ-5V-V     Wind Direction Sensor
- PH-BYX-12V-W2   Atmospheric Pressure Sensor
- PHY-5V-M-01    Rain Gauge
- PH-FC-X         Temperature/Humidity Sensor (Baiye Box)
- PH-282-PM100    Particulate Matter Sensor (PM2.5/PM10)
- PH-H2S          Hydrogen Sulfide Gas Sensor
- PH-SO2          Sulfur Dioxide Gas Sensor
- PH-CO           Carbon Monoxide Gas Sensor
- PH-CO2          Carbon Dioxide Gas Sensor
- PH-1            Data Acquisition Terminal

### 1.3 Manufacturer

WUHAN XINPUHUI TECHNOLOGY CO., LTD
Address: 8004-44, 8th Floor, Longyue Building, No. 42 Guanggu 1st Road,
         Donghu New Technology Development Zone, Wuhan, China
Website: http://www.whxph.com
Technical Support: 027-82666096
Certification: ISO9001:2008

### 1.4 Client/Distributor

Saudi Wakecap Company for Information Systems Technologies
P.O. Box: 85540
Riyadh 11612, Saudi Arabia

### 1.5 Equipment Classification

- Equipment Type: Environmental Detector
- Safety Class: Class II appliance
- Use Environment: Outdoor use only

### 1.6 Primary Purpose

- Real-time environmental data collection
- Safety compliance monitoring (gas detection, weather alerts)
- Operational planning support (wind conditions, rainfall)
- Historical data logging for analysis and reporting
- Remote monitoring via cloud-based dashboard


## 2. System Architecture

### 2.1 High-Level Architecture

The system follows a linear data flow architecture:

SENSORS -> WS BOX -> MODBUS ASSET -> ANCHORS -> GATEWAY -> CLOUD -> DASHBOARD

Connection types: Wired -> Wired -> Wireless -> Wireless -> Internet -> Internet

### 2.2 Architecture Layers

| Layer | Name | Component |
|-------|------|-----------|
| Layer 1 | Data Collection | Environmental Sensors |
| Layer 2 | Data Aggregation | WS Box (Weather Station Box / Data Acquisition Terminal) |
| Layer 3 | Protocol Bridge | MODBUS Asset |
| Layer 4 | Wireless Network | Mesh Anchors |
| Layer 5 | Internet Gateway | Gateway Device |
| Layer 6 | Cloud Processing | Cloud Server & Database |
| Layer 7 | User Interface | Web Dashboard |

### 2.3 Communication Protocols

| Link | Protocol |
|------|----------|
| Sensors to WS Box | Analog/Digital wired connections |
| WS Box to MODBUS Asset | RS485 serial (MODBUS RTU protocol) |
| MODBUS Asset to Anchors | Proprietary wireless mesh protocol |
| Anchors to Gateway | Proprietary wireless mesh protocol |
| Gateway to Cloud | HTTPS over Cellular/WiFi/Ethernet |


## 3. Sensor Specifications (Certified)

All sensor specifications verified per Calibration Lab Test Certificate
Report No. CCTS240605001S (Test Date: 2025-06-16 to 2025-06-18)

### 3.1 Wind Speed Sensor (PHWS-5V-M)

| Parameter | Specification |
|-----------|---------------|
| Range | 0 to 70 m/s |
| Resolution | 0.1 m/s |
| Accuracy | +/-(0.3 + 0.03V) m/s |
| Starting Speed | <= 0.8 m/s |
| Output | Analog voltage |

### 3.2 Wind Direction Sensor (PH-WDZ-5V-V)

| Parameter | Specification |
|-----------|---------------|
| Range | 0 to 360 degrees |
| Resolution | 1 degree |
| Accuracy | +/-3 degrees |
| Starting Speed | <= 0.5 m/s |
| Output | Analog voltage |

### 3.3 Air Temperature Sensor (PH-FC-X with Baiye Box)

| Parameter | Specification |
|-----------|---------------|
| Range | -50 to +100 deg C |
| Resolution | 0.1 deg C |
| Accuracy | +/-0.5 deg C |
| Housing | Radiation shield (Baiye Box) |

### 3.4 Air Humidity Sensor (PH-FC-X with Baiye Box)

| Parameter | Specification |
|-----------|---------------|
| Range | 0 to 100% RH |
| Resolution | 0.1% RH |
| Accuracy | +/-5% RH |
| Housing | Radiation shield (Baiye Box) |

### 3.5 Atmospheric Pressure Sensor (PH-BYX-12V-W2)

| Parameter | Specification |
|-----------|---------------|
| Range | 10 to 1100 hPa |
| Resolution | 0.1 hPa |
| Accuracy | +/-0.3 hPa |

### 3.6 Rain Gauge - Stainless Steel (PHY-5V-M-01)

| Parameter | Specification |
|-----------|---------------|
| Range | 0 to 999.9 mm |
| Resolution | 0.2 mm |
| Accuracy | +/-4% |
| Rainfall Rate | 0 to 4 mm/min |
| Material | Stainless steel |

### 3.7 Gas Sensors (Site-Specific Options)

**H2S Sensor (PH-H2S):**

| Parameter | Specification |
|-----------|---------------|
| Range | 0 to 10 ppm |
| Resolution | 0.001 ppm |
| Accuracy | +/-3% |

**SO2 Sensor (PH-SO2):**

| Parameter | Specification |
|-----------|---------------|
| Range | 0 to 2 ppm |
| Resolution | 0.001 ppm |
| Accuracy | +/-3% |

**CO Sensor (PH-CO):**

| Parameter | Specification |
|-----------|---------------|
| Range | 0 to 10 ppm |
| Resolution | 0.01 ppm |
| Accuracy | +/-3% |

**CO2 Sensor (PH-CO2):**

| Parameter | Specification |
|-----------|---------------|
| Range | 0 to 2000 ppm |
| Resolution | 1 ppm |
| Accuracy | +/-(40 ppm + 3% F.S.) |

### 3.8 Particulate Matter Sensors (PH-282-PM100)

**PM2.5 Sensor:**

| Parameter | Specification |
|-----------|---------------|
| Range | 0 to 1000 ug/m3 |
| Resolution | 1 ug/m3 |
| Accuracy | +/-10% |

**PM10 Sensor:**

| Parameter | Specification |
|-----------|---------------|
| Range | 0 to 2000 ug/m3 |
| Resolution | 1 ug/m3 |
| Accuracy | +/-15% |

**TSP Sensor:**

| Parameter | Specification |
|-----------|---------------|
| Range | 0 to 2000 ug/m3 |
| Resolution | 1 ug/m3 |
| Accuracy | +/-15% |


## 4. Data Acquisition Terminal (WS Box) Specifications

### 4.1 Processor and Memory

| Parameter | Specification |
|-----------|---------------|
| CPU | ARM 32-bit Cortex-M3 |
| Max Frequency | 108 MHz |
| System Clock | Up to 72 MHz |
| A/D Conversion | 12-bit |
| FLASH Storage | 4M bits (>1 year data capacity) |
| Data Protection | Button battery backup |

### 4.2 Display

| Parameter | Specification |
|-----------|---------------|
| Type | LCD dot matrix |
| Resolution | 192 x 64 pixels |
| Display Modes | 12 x 4 characters |
| Language | Chinese / English (switchable) |
| Content | Data, time, date, parameters |

### 4.3 Communication Interfaces

| Interface | Specification |
|-----------|---------------|
| RS485 | 2-wire (485+, 485-, GND) |

RS485 Pinout:
- 485- (A terminal)
- 485+ (B terminal)
- GND (Ground)

### 4.4 Data Storage

| Parameter | Specification |
|-----------|---------------|
| Internal Storage | >1 year meteorological data |
| External Storage | SD card and USB drive supported |
| Storage Interval | 1 to 240 minutes (configurable) |
| Data Export | Via USB to PC software |

### 4.5 Protocol Support

- XPH Protocol (proprietary)
- MODBUS RTU Protocol
- JSON Protocol
- Manual protocol switching supported
- Configurable device address (0-255)

### 4.6 Additional Features

- Watchdog circuit with automatic reset
- GPS positioning (optional)
- Unique device ID (queryable)
- Active/passive reporting modes
- Remote firmware upgrade capability
- LED screen extension (single/dual/full-color)
- Touch screen extension support
- Relay control output (multiple switches)
- Photoelectric isolation (anti-interference)


## 5. Electrical Specifications

### 5.1 Power Supply Options

| Option | Specification |
|--------|---------------|
| DC Input | 12 to 36 V DC |
| AC Input | 220 V AC (with adapter) |
| Solar | Solar panel + battery system |
| Connector | Barrel jack (12V DC to WS Box) |

### 5.2 Power Consumption

| Parameter | Specification |
|-----------|---------------|
| Operating Power | DC 12V |
| Power Consumption | <= 2W (overall system) |

### 5.3 Electrical Safety (per GB 4793.1-2007)

| Parameter | Specification |
|-----------|---------------|
| Insulation Resistance | >= 10 MOhm (power to casing) |
| Dielectric Strength | 1500V AC for 1 min (no breakdown) |
| Leakage Current | <= 5 mA (AC operation) |


## 6. Environmental Specifications

### 6.1 Operating Conditions (per GB/T 2423.1/2/3)

| Parameter | Specification |
|-----------|---------------|
| Temperature Range | -20 to +50 deg C |
| Humidity Range | 0 to 95% RH (non-condensing) |
| Environment | Outdoor use |

### 6.2 Sensor Operating Conditions

Temperature sensor operates: -50 to +100 deg C
(Full sensor range extends beyond operating environment)


## 7. Certifications and Compliance

### 7.1 Test Report

Report Number: CCTS240605001S
Test Date: 2025-06-16 to 2025-06-18
Testing Laboratory: Shenzhen Zhongan Quality Inspection and Certification Co., Ltd.
Address: Room 301&313, No. 20, Xinhe Road, Xinqiao Street,
         Bao'an District, Shenzhen, Guangdong, China
Report Date: 2025-06-19

### 7.2 Test Standards Applied

Metrological Standards:
- JJG695-2019 (Anemometers)
- JJG635-2011 (Atmospheric Pressure)
- JJG551-2021 (Thermometers)
- JJG005-2015 (Humidity)
- JJG004-2011 (Standard)
- JJG 431-2014 (Rain Gauges)
- JJF 1076-2020 (Calibration)

Environmental Standards:
- HJ 653-2021 (Environmental monitoring)
- GB16297-1996 (Air pollutant emissions)

Environmental Testing:
- GB/T 2423.1-2008 (Cold test)
- GB/T 2423.2-2008 (Dry heat test)
- GB/T 2423.3-2016 (Damp heat test)

Electrical Safety:
- GB 4793.1-2007 (Safety requirements)

### 7.3 Manufacturer Certification

- ISO9001:2008 Quality Management System

### 7.4 Test Result Summary

All tested parameters: PASS


## 8. System Components Detail

### 8.1 WS BOX (Weather Station Box / Data Acquisition Terminal)

**Function:**
- Aggregates data from all connected environmental sensors
- Performs initial data processing and validation
- Displays live sensor readings on built-in LCD screen
- Transmits data to MODBUS Asset via RS485 interface

[IMAGE: WS Box physical layout showing LCD display, sensor terminals T1-T6 (Wind Speed, Wind Direction, Temperature, Humidity, Pressure, Rain), RS485 output (A, B), and 12V DC power input]

**Key Functions:**

| Button | Function | Button | Function |
|--------|----------|--------|----------|
| Up | Menu select: select up | + | Modify parameters: increase |
| Down | Menu select: select down | - | Modify parameters: decrease |
| Left | Menu/Interface: previous | Confirm | Enter menu / confirm |
| Right | Menu/Interface: next | Cancel | Exit menu / cancel |


### 8.2 MODBUS Asset

**Function:**
- Receives sensor data from WS Box via RS485 (MODBUS RTU protocol)
- Converts wired data to wireless transmission format
- Transmits data wirelessly to nearby Mesh Anchors
- Provides visual status indication via LED
- Supports NFC for configuration and verification

[IMAGE: MODBUS Asset physical layout showing NFC tag area, LED status indicator, RS485 input (A, B) from WS Box, and power terminals (+, -)]

**LED Status Indicator:**

| Blinks/Minute | Status | Meaning |
|---------------|--------|---------|
| 1 blink/min | NORMAL | System operating correctly, data being transmitted |
| 2 blinks/min | COMMUNICATION ERROR | No data from WS Box. Check RS485 wiring (A-A, B-B) |


### 8.3 Mesh Network Anchors

**Function:**
- Receive data wirelessly from MODBUS Asset
- Create self-healing mesh network topology
- Relay data hop-by-hop to Gateway
- Provide network redundancy (multiple paths)

[IMAGE: Mesh network topology diagram showing MODBUS Asset transmitting wirelessly to Anchor #1, which connects to Anchor #2 and Anchor #3, with multiple paths converging at the Gateway]


### 8.4 Gateway

**Connectivity Options:**
- Cellular (4G/LTE with SIM card)
- WiFi (connects to local network)
- Ethernet (wired LAN connection)


### 8.5 Cloud Server and Dashboard

**Dashboard Features:**
- Real-time sensor data display
- Historical data graphs and charts
- Data export (select date range)
- Alert configuration
- Site management
- User access control


## 9. Connections and Wiring

### 9.1 Sensor to WS Box Connections

| Sensor | WS Box Terminal |
|--------|-----------------|
| Wind Speed Sensor | Terminal T1 |
| Wind Direction | Terminal T2 |
| Temperature Sensor | Terminal T3 |
| Humidity Sensor | Terminal T4 |
| Pressure Sensor | Terminal T5 |
| Rainfall Sensor | Terminal T6 |
| Gas Sensors | Additional terminals (site-specific) |

Connection Type: Wired (varies by sensor - analog/digital)


### 9.2 WS Box to MODBUS Asset Connection

RS485 serial connection using 2 wires:

| WS Box | MODBUS Asset |
|--------|--------------|
| Terminal A | Terminal A |
| Terminal B | Terminal B |

CRITICAL: Wire A must connect to A, Wire B must connect to B. Reversed wiring causes communication failure (LED blinks 2x/min).

Cable Type: Shielded twisted pair recommended
Protocol: MODBUS RTU


## 10. Power System

### 10.1 Power Architecture

[IMAGE: Power architecture diagram showing Solar Panel -> MPPT Controller -> Battery (12V) -> WS Box]

### 10.2 Components

**Solar Panel:**
- Generates electricity from sunlight
- Connected to MPPT controller
- Must be oriented for optimal sun exposure

**MPPT Controller (Maximum Power Point Tracking):**
- Regulates solar panel output
- Charges battery efficiently
- Has LED/display for status indication
- Protects battery from overcharge/discharge

**Battery:**
- Stores energy for continuous operation
- Provides power during night/cloudy conditions
- Nominal voltage: 12V
- Minimum operating voltage: 12V+


## 11. Configuration and Settings

### 11.1 Parameter Settings Menu

| Option | Function Description |
|--------|----------------------|
| Version Info | View the version number of the collection instrument |
| Time Setting | Setting the system clock |
| Other Setting | Electronic compass settings |
| Communication | Set serial communication address (0-255), TCP/IP address for cable communications |
| Parameter Reset | Manual reset - clears all parameters and history |
| Interval | Auto save interval (1-240 minutes) |
| Language | Alternative Chinese / English |
| Data Save | External memory: SD / USB / no medium |


## 12. Field Verification

### 12.1 WakeCap Verify App

Mobile application for field technicians:
- View Anchor online/offline status
- View Gateway online/offline status
- Verify mesh network connectivity
- Check device configurations

### 12.2 Physical Indicators

**WS BOX Screen:**
- ON with values = System receiving sensor data
- ON with zeros = Sensor connection issue
- OFF = Power issue

**MODBUS LED:**
- 1 blink/min = Normal operation
- 2 blinks/min = Communication error with WS Box

**MPPT Controller:**
- LED/Display shows charging status
- Indicates errors or faults


## 13. Maintenance

### 13.1 Maintenance Schedule

**Monthly:**
- Visual inspection of all sensors
- Check cable connections
- Clean rainfall sensor funnel
- Verify dashboard data accuracy

**Annually:**
- Full system calibration
- Replace gas sensors (consumable)
- Firmware updates
- Complete system test

### 13.2 Calibration Requirements

- Gas sensors: Require certified calibration gas, every 12 months minimum
- Environmental sensors: Field calibration available
- Test standards per JJF 1076-2020


## 14. Safety Information

### 14.1 Electrical Safety

WARNING: Electrical Hazard
- Always use appropriate PPE
- De-energize before maintenance
- Verify voltage before work
- Follow site-specific procedures

NOTICE: Power Requirements
- Use only specified voltage range (DC 12-36V or AC 220V)
- Do not exceed rated power consumption

### 14.2 Environmental Safety

CAUTION: Gas Detection
- Check gas readings before entering area
- Follow evacuation procedures if alarms trigger
- Use respiratory protection as required

### 14.3 Installation Safety

CAUTION: Outdoor Installation
- Equipment rated for outdoor use only
- Ensure proper grounding
- Protect connections from moisture ingress
- Follow mounting guidelines for wind sensors


## 15. Ordering Information

### 15.1 Standard Configuration

- Data Acquisition Terminal (WS Box)
- Wind Speed Sensor (PHWS-5V-M)
- Wind Direction Sensor (PH-WDZ-5V-V)
- Temperature/Humidity Sensor with Baiye Box (PH-FC-X)
- Atmospheric Pressure Sensor (PH-BYX-12V-W2)
- Rain Gauge (PHY-5V-M-01)

### 15.2 Optional Sensors

- H2S Sensor (PH-H2S)
- SO2 Sensor (PH-SO2)
- CO Sensor (PH-CO)
- CO2 Sensor (PH-CO2)
- PM2.5/PM10 Sensor (PH-282-PM100)

### 15.3 Optional Accessories

- Light shutter boxes (Baiye Box)
- Field protection case
- Tripod mounting system
- Adapter cables (various configurations)
- Solar panel kit
- MPPT controller
- Battery system


## 16. Glossary

A/D      - Analog to Digital (conversion)
ARM      - Advanced RISC Machine (processor architecture)
GPRS     - General Packet Radio Service
GPS      - Global Positioning System
hPa      - Hectopascal (pressure unit, equivalent to mbar)
H2S      - Hydrogen Sulfide
IEC      - International Electrotechnical Commission
LCD      - Liquid Crystal Display
LED      - Light Emitting Diode
LoRa     - Long Range (wireless protocol)
mbar     - Millibar (pressure unit)
MODBUS   - Modular Bus (communication protocol)
MPPT     - Maximum Power Point Tracking
NB-IoT   - Narrowband Internet of Things
NFC      - Near Field Communication
PM2.5    - Particulate Matter < 2.5 micrometers
PM10     - Particulate Matter < 10 micrometers
ppm      - Parts Per Million
RH       - Relative Humidity
RS485    - Recommended Standard 485 (serial communication)
RTU      - Remote Terminal Unit
SO2      - Sulfur Dioxide
TSP      - Total Suspended Particulates
USB      - Universal Serial Bus

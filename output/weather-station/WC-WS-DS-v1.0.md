# WakeCap Weather Station
## Product Datasheet

**Document ID:** WC-WS-DS-v1.0
**Revision Date:** February 2026
**Model:** PH-282-AIR
**Hardware Compatibility:** Rev 1.0+
**Firmware Compatibility:** [TBD]

---

[IMAGE: Weather Station hero photo showing complete assembly with sensors, WS Box, solar panel, and mounting tripod in an outdoor industrial site]

## Product Overview

The WakeCap Weather Station (Model PH-282-AIR) is a comprehensive automatic environmental monitoring system designed for mega construction sites, oil & gas facilities, and industrial operations. It provides real-time monitoring of weather conditions, air quality, and hazardous gases to support safety compliance, operational planning, and regulatory reporting.

### Key Benefits

- **Real-time monitoring** with cloud-based dashboard access from any location
- **Solar-powered operation** with battery backup for remote, off-grid deployments
- **Wireless mesh network** eliminates cable runs between station and gateway
- **Certified accuracy** per international metrological standards (Report CCTS240605001S)
- **Multi-parameter sensing**: weather, gas detection (H2S, SO2, CO, CO2), and particulate matter (PM2.5/PM10/TSP)
- **Modular design** with standard and optional sensor configurations

---

## System Architecture

```
SENSORS --> WS BOX --> MODBUS ASSET --> ANCHORS --> GATEWAY --> CLOUD --> DASHBOARD
 [Wired]    [RS485]    [Wireless Mesh]  [Wireless]  [Internet]  [Web]
```

**Power:** Solar Panel --> MPPT Controller --> Battery (12 V) --> WS Box

---

## Sensor Specifications

All specifications verified per Calibration Lab Test Certificate CCTS240605001S (June 2025).

### Weather Sensors (Standard)

| Parameter | Model | Range | Resolution | Accuracy |
|-----------|-------|-------|------------|----------|
| Wind Speed | PHWS-5V-M | 0 to 70 m/s | 0.1 m/s | +/-(0.3 + 0.03V) m/s |
| Wind Direction | PH-WDZ-5V-V | 0 to 360 deg | 1 deg | +/-3 deg |
| Air Temperature | PH-FC-X | -50 to +100 C | 0.1 C | +/-0.5 C |
| Air Humidity | PH-FC-X | 0 to 100% RH | 0.1% RH | +/-5% RH |
| Atmospheric Pressure | PH-BYX-12V-W2 | 10 to 1100 hPa | 0.1 hPa | +/-0.3 hPa |
| Rainfall | PHY-5V-M-01 | 0 to 999.9 mm | 0.2 mm | +/-4% |

### Gas Sensors (Optional)

| Parameter | Model | Range | Resolution | Accuracy |
|-----------|-------|-------|------------|----------|
| Hydrogen Sulfide (H2S) | PH-H2S | 0 to 10 ppm | 0.001 ppm | +/-3% |
| Sulfur Dioxide (SO2) | PH-SO2 | 0 to 2 ppm | 0.001 ppm | +/-3% |
| Carbon Monoxide (CO) | PH-CO | 0 to 10 ppm | 0.01 ppm | +/-3% |
| Carbon Dioxide (CO2) | PH-CO2 | 0 to 2000 ppm | 1 ppm | +/-(40 ppm + 3% F.S.) |

### Particulate Matter Sensors (Optional)

| Parameter | Model | Range | Resolution | Accuracy |
|-----------|-------|-------|------------|----------|
| PM2.5 | PH-282-PM100 | 0 to 1000 ug/m3 | 1 ug/m3 | +/-10% |
| PM10 | PH-282-PM100 | 0 to 2000 ug/m3 | 1 ug/m3 | +/-15% |
| TSP | PH-282-PM100 | 0 to 2000 ug/m3 | 1 ug/m3 | +/-15% |

---

## Data Acquisition Terminal (WS Box)

| Parameter | Specification |
|-----------|---------------|
| Processor | ARM 32-bit Cortex-M3, 108 MHz max |
| A/D Conversion | 12-bit |
| Display | 192 x 64 pixel LCD (English/Chinese) |
| Internal Storage | 4M bits (>1 year data capacity) |
| Storage Interval | 1 to 240 minutes (configurable) |
| External Storage | SD card, USB drive |
| Data Protection | Button battery backup |

---

## Interfaces

| Interface | Specification |
|-----------|---------------|
| RS485 | 2-wire (A, B, GND) - MODBUS RTU protocol |
| RS232 | Standard serial port |
| USB | Data export to PC |
| Supported Protocols | MODBUS RTU, XPH (proprietary), JSON |
| Device Address | 0 to 255 (configurable) |
| Optional Modules | 4G/5G, WiFi, Ethernet, LoRa, NB-IoT |

---

## Electrical Specifications

| Parameter | Specification |
|-----------|---------------|
| DC Input Voltage | 12 to 36 V DC |
| AC Option | 220 V AC (with adapter) |
| Power Consumption | <= 2 W (overall system) |
| Operating Voltage | 12 V DC |
| Power Connector | Barrel jack |
| Solar Power Option | Solar panel + MPPT controller + 12 V battery |

### Electrical Safety (per GB 4793.1-2007)

| Parameter | Specification |
|-----------|---------------|
| Insulation Resistance | >= 10 MOhm (power to casing) |
| Dielectric Strength | 1500 V AC / 1 min (no breakdown) |
| Leakage Current | <= 5 mA (AC operation) |

---

## Environmental Specifications

| Parameter | Specification |
|-----------|---------------|
| Operating Temperature | -20 to +50 C (-4 to +122 F) |
| Operating Humidity | 0 to 95% RH (non-condensing) |
| Use Environment | Outdoor only |
| Safety Class | Class II appliance |
| IP Rating | [TBD] |
| Dimensions (WS Box) | [TBD] |
| Weight (WS Box) | [TBD] |

---

## Mechanical

[IMAGE: Dimensioned outline drawing showing WS Box front panel with terminal layout, LCD display, and overall dimensions in mm]

| Component | Specification |
|-----------|---------------|
| WS Box Enclosure | Weatherproof, outdoor-rated |
| Sensor Terminals | T1-T6 (6 standard sensor inputs) |
| Rain Gauge Material | Stainless steel |
| Temperature/Humidity Housing | Radiation shield (Baiye Box) |
| Mounting | Tripod system (optional) |
| Wind Speed Starting Threshold | <= 0.8 m/s |
| Wind Direction Starting Threshold | <= 0.5 m/s |

---

## Certifications and Compliance

**Test Report:** CCTS240605001S (June 2025)
**Testing Laboratory:** Shenzhen Zhongan Quality Inspection and Certification Co., Ltd.
**Result:** All parameters PASS

### Standards Applied

| Category | Standards |
|----------|-----------|
| Metrological | JJG695-2019, JJG635-2011, JJG551-2021, JJG005-2015, JJG004-2011, JJG431-2014, JJF1076-2020 |
| Environmental Monitoring | HJ653-2021, GB16297-1996 |
| Environmental Testing | GB/T2423.1-2008 (Cold), GB/T2423.2-2008 (Heat), GB/T2423.3-2016 (Humidity) |
| Electrical Safety | GB4793.1-2007 |

**Manufacturer Certification:** ISO9001:2008

---

## Ordering Information

### Standard Configuration (PH-282-AIR)

| Item | Model |
|------|-------|
| Data Acquisition Terminal (WS Box) | PH-1 |
| Wind Speed Sensor | PHWS-5V-M |
| Wind Direction Sensor | PH-WDZ-5V-V |
| Temperature/Humidity Sensor with Baiye Box | PH-FC-X |
| Atmospheric Pressure Sensor | PH-BYX-12V-W2 |
| Rain Gauge (Stainless Steel) | PHY-5V-M-01 |

### Optional Sensors

| Item | Model |
|------|-------|
| Hydrogen Sulfide Sensor | PH-H2S |
| Sulfur Dioxide Sensor | PH-SO2 |
| Carbon Monoxide Sensor | PH-CO |
| Carbon Dioxide Sensor | PH-CO2 |
| Particulate Matter Sensor (PM2.5/PM10/TSP) | PH-282-PM100 |

### Optional Accessories

- Radiation shield (Baiye Box)
- Field protection case
- Tripod mounting system
- Solar panel kit with MPPT controller
- Battery system (12 V)
- Adapter cables (various configurations)

---

## Manufacturer

**WUHAN XINPUHUI TECHNOLOGY CO., LTD**
8004-44, 8th Floor, Longyue Building
No. 42 Guanggu 1st Road
Donghu New Technology Development Zone
Wuhan, China

Technical Support: 027-82666096
Website: www.whxph.com

---

## Distributor

**Saudi Wakecap Company for Information Systems Technologies**
P.O. Box: 85540
Riyadh 11612, Saudi Arabia

---

*WC-WS-DS-v1.0 | February 2026 | (c) 2026 WakeCap Technologies*

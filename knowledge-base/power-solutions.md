# WakeCap Power Solutions — Product Knowledge Base

## Product Family Overview

The WakeCap Power Solutions are autonomous off-grid solar power systems designed to provide reliable DC power for remote equipment in harsh environments. The product family comprises four tiers based on energy capacity.

### Naming Convention
Model numbers are based on battery capacity in Wh (watt-hours). The "T" suffix denotes trailer-mounted systems.

| Product | Model | Battery | Solar | System Voltage | Target Load |
|---------|-------|---------|-------|----------------|-------------|
| WakeCap Power 384 | WP-384 | 30Ah LiFePO4 | 80W | 12V DC | ≤8W |
| WakeCap Power 768 | WP-768 | 60Ah LiFePO4 | 100W | 12V DC | ≤15W |
| WakeCap Power 4800T | WP-4800T | 400Ah Lead Acid (GEL) | 450W | 12V DC | ≤100W |
| WakeCap Power 21600T | WP-21600T | 900Ah Lead Acid | 1305W | 24V DC | ≤350W |

## Design Environment

All systems are designed for deployment in Saudi Arabia:
- High ambient temperatures (up to 55°C)
- Desert conditions with high dust/sand exposure
- Coastal areas with salt-laden humid air
- High solar irradiance (Peak Sun Hours: 5.5–7.5 hours)
- Remote locations with limited grid access

## Applicable Standards

- IEC 62124: Photovoltaic standalone systems — Design verification
- IEC 61427: Secondary cells for solar photovoltaic energy systems
- IEC 62509: Battery charge controllers for photovoltaic systems
- IP ratings per IEC 60529

## System Architecture

All WakeCap Power Solutions share a common functional architecture:
- Solar Photovoltaic Array: Energy harvesting from solar radiation
- MPPT Charge Controller: Maximum Power Point Tracking and charge regulation
- Battery Energy Storage: Electrochemical energy storage for autonomy
- DC Output Stage: Voltage regulation and load distribution
- Protection Systems: Over-current, over-voltage, temperature, and reverse polarity
- Monitoring/Indicators: State of charge, charging status, fault indication

### Energy Flow Modes

1. **Solar Charging Mode** (irradiance >200 W/m²): MPPT tracks max power point, solar charges battery and powers load simultaneously
2. **Battery Discharge Mode** (night/overcast): Battery supplies full load, DoD limited, low voltage disconnect prevents deep discharge
3. **Float/Maintenance Mode** (battery full): MPPT maintains float voltage, solar directly powers load

### System Sizing Philosophy

| Design Parameter | Value | Rationale |
|-----------------|-------|-----------|
| Backup Duration | 48 hours | Two consecutive days without solar (worst case) |
| Depth of Discharge | 70% | Balance between capacity utilization and cycle life |
| Solar Derating | 75% | Dust, misalignment, temperature, aging |
| System Efficiency | 90% | Wiring losses, controller self-consumption |
| DC-DC Efficiency | 80% | Conversion losses if voltage conversion required |
| Peak Sun Hours | 6.5h | Annual average for Saudi Arabia |

## Load Capacity Summary

| Solution | Battery | Max Load (48h) | Max Load (24h) | Max Load (12h) | Practical Limit |
|----------|---------|----------------|----------------|----------------|-----------------|
| WP-384 | 30Ah / 384Wh | ~4W | ~8W | ~16W | 8W |
| WP-768 | 60Ah / 768Wh | ~8W | ~15W | ~30W | 15W |
| WP-4800T | 400Ah / 4800Wh | ~50W | ~100W | ~200W | 100W |
| WP-21600T | 900Ah@24V / 21600Wh | ~175W | ~350W | ~700W | 350W |

---

## WP-384 — WakeCap Power 384

**Model:** G8030 | 80W Solar, 384Wh LiFePO4 Off-Grid Power System

### Architecture
- Aluminum-potted MPPT controller (>95% efficiency) integrated with BMS
- LiFePO4 battery pack with 2P4S cell configuration (30Ah @ 12.8V nominal)
- Integrated SOC indication via LED display
- Single 12V DC output channel with over-current protection
- Optional RS485 interface for remote monitoring

### Solar Panel Specifications
| Parameter | Value | Unit |
|-----------|-------|------|
| Panel Material | Grade-A Monocrystalline Silicon | — |
| Total Output Power | 80 | W |
| Panel Configuration | 2 x 40W panels | — |
| Photoelectric Conversion Efficiency | ≥23 | % |
| Rated Output Voltage | 18 | V |
| Maximum Power Point Voltage (Vmp) | 18 | V |
| Open Circuit Voltage (Voc) | 24 | V |
| Maximum Power Point Current (Imp) | 4.44 | A |
| Short Circuit Current (Isc) | 5 | A |
| Panel Dimensions | 390 x 530 x 17 (x2 panels) | mm |
| Panel Weight | 3.2 | kg |
| Frame Material | Anodized Aluminum Alloy, 0.8mm | — |
| Encapsulation | Tempered Glass / EVA / Cells / EVA Backsheet | — |
| Snow Load Rating | 5400 | Pa |
| Wind Load Rating | 2400 | Pa |

### Battery Pack Specifications
| Parameter | Value | Unit |
|-----------|-------|------|
| Cell Type | LiFePO4 (Lithium Iron Phosphate) | — |
| Cell Model | IFR32140E15.0Ah | — |
| Cell Configuration | 2P4S (2 Parallel, 4 Series) | — |
| Nominal Voltage | 12.8 | V |
| Pack Capacity | 30Ah / 384Wh | — |
| Discharge Voltage Range | 11.2–14.8 | V |
| Over-Discharge Protection | ≤10 ±0.1 | V |
| Over-Charge Protection | >14.6 ±0.1 | V |
| Maximum Charge Current | 7 | A |
| High-Temp Protection | ≥60°C prohibited | — |
| Low-Temp Charge Protection | -10 ±1 | °C |
| Low-Temp Charge Recovery | 0 ±1 | °C |
| Low-Temp Discharge Protection | -20 ±1 | °C |
| Low-Temp Discharge Recovery | -15 ±1 | °C |
| SOC Accuracy | <5 | % |
| BMS Communication | IIC | — |
| Battery Arm Dimensions | 535 x 80 x 100 | mm |
| Battery Pack Weight | ~2.25 | kg |

### Main Unit Specifications
| Parameter | Value | Unit |
|-----------|-------|------|
| Model | TD-G8030 | — |
| DC Output Channels | 1 (86cm cable, black) | — |
| Output Voltage | 12 ±0.5 | V DC |
| Output Current (Max) | ≤3 ±0.05 | A |
| Output Protection Current | >4A for >3 seconds | — |
| Input Channels | 1 (male plug, 220mm cable) | — |
| Input Voltage Range | 15–21 | V DC |
| Maximum Input Current | 7 | A |
| RS-485 Channels | 1 (2-pin terminal, 30cm) | — |
| Energy Efficiency (3A load) | Max 92 | % |
| Short-Circuit Protection | >5A instantaneous | — |
| Operating Temperature | -20 to +50 | °C |
| Storage Temperature | -40 to +60 | °C |
| Operating Humidity | 15–85 | % RH |
| Protection Rating | IP66 | — |
| Factory State of Charge | 40–50 | % |
| Runtime (no solar, 150mA) | ~8–10 days (25°C) | — |
| Recharge Time (0–100%) | ~8–10 hours | — |
| Installation Method | Pole Mount / Wall Mount | — |

### LED Indicator Status
| Indicator | Flashing | Steady On | Off |
|-----------|----------|-----------|-----|
| Blue Light | Charging | Charge Complete | No Solar Input |
| Green Light | Overload/Short Circuit | Output Normal | Shutdown/Fault |
| Red Light | Low Battery | — | Normal Battery |

---

## WP-768 — WakeCap Power 768

**Model:** TS-100W60AH | 100W Solar, 768Wh LiFePO4 Power System

### Architecture
- Separate 10A MPPT charge controller
- 60Ah LiFePO4 battery with integrated BMS
- Charging protection board with multiple safety features
- Aviation-style waterproof connectors
- DC output via standard 5.5x2.1mm barrel connector

### Solar Panel Specifications
| Parameter | Value | Unit |
|-----------|-------|------|
| Panel Material | N-Type A+ Grade Monocrystalline Silicon | — |
| Total Output Power | 100 | W |
| Panel Configuration | 2 x 50W panels | — |
| Conversion Efficiency | >22 | % |
| Panel Dimensions | 390 x 510 (x2 panels) | mm |
| Frame Material | Anodized Aluminum | — |
| Glass | 3.2mm Tempered | — |
| Protection Rating | IP66 | — |
| Operating Temperature | -30 to +85 | °C |
| Maximum Operating Current | 7.8 | A |
| Open Circuit Voltage | 20 | V |
| Maximum Operating Voltage | 17 | V |
| Surface Pressure Resistance | 60m/s (200kg/m²) | — |

### Battery Pack Specifications
| Parameter | Value | Unit |
|-----------|-------|------|
| Battery Type | LiFePO4 (Lithium Iron Phosphate) | — |
| Nominal Capacity | 60 | Ah |
| Rated Voltage | 10.5–12.6 | V DC |
| Charging Temperature | -30 to +85 | °C |
| Discharging Temperature | -30 to +85 | °C |
| Protection Features | High-temp, Low-temp compensation, Balance, OC/OD | — |

### Controller Specifications
| Parameter | Value | Unit |
|-----------|-------|------|
| Maximum Charging Current | 10 | A |
| Maximum Output Current | 10 | A |
| Reverse Connection Protection | Yes | — |
| Controller Self-consumption | 0.06 | W |
| Operating Temperature | -30 to +85 | °C |
| MPPT Efficiency | 96.5 | % |

### System Specifications
| Parameter | Value | Unit |
|-----------|-------|------|
| System Weight | 23 | kg |
| Packaging Size | 940 x 780 x 240 | mm |
| Packaging Volume | 0.175 | m³ |
| Mounting Bracket | Galvanized + powder-coated, integrated | — |
| Solar Panel Orientation | South-facing | — |
| Adjustable Ground Angle | 0–30 | ° |
| PV Cable Connector | Male/Female Aviation Connector | — |
| PV Cable Specification | 2x1.5 National Standard, 80cm | — |
| DC Output Connector | 5.5x2.1mm Male | — |
| DC Output Cable | 2x0.75 Pure Copper, 1m | — |

---

## WP-4800T — WakeCap Power 4800T

**Model:** [TBD] | 450W Solar, 4800Wh GEL Trailer Power Station

### Architecture
- 30A MPPT charge controller
- 2x200Ah GEL deep-cycle batteries in parallel (400Ah total)
- 6.5m pneumatic telescoping mast (5 sections, aluminum alloy)
- Integrated equipment cabinet with thermal management
- Exchange board for data/power distribution
- Electric fan for enclosure cooling

### Solar Panel Specifications
| Parameter | Value | Unit |
|-----------|-------|------|
| Panel Type | Monocrystalline Silicon | — |
| Total Output Power | 450 | W |
| Panel Configuration | 3 x 150W panels | — |

### Battery Specifications
| Parameter | Value | Unit |
|-----------|-------|------|
| Battery Type | GEL Deep Cycle (LEOCH brand) | — |
| Configuration | 2 x 200Ah parallel | — |
| Total Capacity | 400Ah / 4800Wh | — |
| System Voltage | 12 | V DC |
| Output Variants | WP-4800T-DC (12V DC output), WP-4800T-AC (220V AC output) | — |

### Controller Specifications
| Parameter | Value | Unit |
|-----------|-------|------|
| Controller Type | MPPT | — |
| Current Rating | 30 | A |

### Mechanical Specifications
| Parameter | Value | Unit |
|-----------|-------|------|
| Total System Weight | 525 | kg |
| Packing Dimensions | 2000 x 1400 x 2300 | mm |
| Operating Dimensions | 2000 x 2250 x 6500 | mm |
| Mast Type | Pneumatic Telescoping | — |
| Mast Sections | 5 | — |
| Mast Material | Aluminum Alloy | — |
| Mast Height (Extended) | 6.5 | m |
| Mast Lifting Power | 16W (negligible) | — |
| Spring Cable Specification | 2x1.5 | mm² |
| Trailer Type | Single Axle | — |
| Trailer Standard | US Standard | — |
| Hitch Type | Ball Hitch | — |
| Tire Size | 165/70R13 | — |
| Outriggers | Manual | — |
| Surface Treatment | Anti-oxidation Electrostatic Powder Coat | — |
| Protection Level | IP65 | — |

### Performance Specifications
| Parameter | Value | Unit |
|-----------|-------|------|
| Charging Time (0–100%) | ~10 | hours |
| Runtime (180W camera load) | ~25 | hours |
| Warranty | 2 | years |

---

## WP-21600T — WakeCap Power 21600T

**Model:** VTS3P | 1305W Solar, 21600Wh Lead Acid Trailer Power Station

### Architecture
- EPEVER 60A MPPT charge controller
- 6x150Ah high-temperature lead-acid batteries (3S2P for 24V, 900Ah)
- 9m manual telescoping mast tower
- Large equipment cabinet with multiple cable passages
- CAT6 and power cable routing through mast

### Solar Panel Specifications
| Parameter | Value | Unit |
|-----------|-------|------|
| Number of Panels | 3 | — |
| Individual Panel Wattage | 435 | W |
| Total Output Power | 1305 | W |
| Panel Type | Monocrystalline Silicon | — |

### Battery Specifications
| Parameter | Value | Unit |
|-----------|-------|------|
| Battery Type | High Temperature Lead Acid | — |
| Configuration | 6 x 12V 150Ah (3S2P for 24V) | — |
| Total Capacity | 900Ah @ 24V | — |
| Energy Capacity | 21,600 | Wh |
| System Voltage | 24 | V DC |
| Output Variants | WP-21600T-DC (24V DC output), WP-21600T-AC (220V AC output) | — |

### Controller Specifications
| Parameter | Value | Unit |
|-----------|-------|------|
| Controller Brand | EPEVER | — |
| Controller Type | MPPT | — |
| Current Rating | 60 | A |

### Mechanical Specifications
| Parameter | Value | Unit |
|-----------|-------|------|
| Total System Weight | 1300 | kg |
| Overall Dimensions | 2320 x 1495 x 2350 | mm |
| Mast Type | Manual Telescoping | — |
| Mast Height (Extended) | 9 | m |
| Mast Cables | 2 x CAT6 + 2 x 1.5mm² | — |
| Camera Box Dimensions | 412 x 412 x 416 | mm |
| Trailer Type | Single Axle, Mechanical Brake | — |
| Suspension | Steel Plate Spring | — |
| Tire Size | 15" | — |
| Tow Hitch | 50mm Ball Hitch | — |
| Surface Treatment | Powder Coat (corrosion prevention) | — |
| Protection Level | IP65 | — |
| Wind Rating | 100 | km/h |
| Container Loading | 8 units per 40ft container | — |

---

## Solar Cell Technology Comparison

| Product | Cell Grade | Efficiency | Technology |
|---------|-----------|------------|------------|
| WP-384 | Grade-A Monocrystalline | ≥23% | Standard |
| WP-768 | N-Type A+ Grade Monocrystalline | >22% | N-Type (better low-light) |
| WP-4800T | Monocrystalline | >20% | Standard |
| WP-21600T | Monocrystalline | >21% | Standard |

## Battery Chemistry Comparison

| Parameter | LiFePO4 (WP-384, WP-768) | GEL Lead Acid (WP-4800T) | Lead Acid (WP-21600T) |
|-----------|------------------------|------------------------|---------------------|
| Nominal Voltage/Cell | 3.2V | 2.0V | 2.0V |
| Cycle Life (80% DoD) | 2000–5000 cycles | 500–800 cycles | 300–500 cycles |
| Calendar Life | 8–10 years | 5–7 years | 3–5 years |
| Usable DoD | 80–90% | 50–70% | 50–70% |
| Self-Discharge | <3%/month | 3–5%/month | 5–15%/month |
| Temperature Sensitivity | Low | Medium | High |
| Maintenance | None | Minimal | Periodic equalization |
| Safety | Excellent | Good | Good |

## MPPT Controller Comparison

| Parameter | WP-384 | WP-768 | WP-4800T | WP-21600T |
|-----------|-------|-------|---------|---------|
| Controller Type | Integrated MPPT | Standalone MPPT | MPPT | EPEVER MPPT |
| Rated Current | [TBD] | 10A | 30A | 60A |
| Efficiency | >95% | 96.5% | 95% | 98% |
| Max PV Input Voltage | ~24V | 20V | [TBD] | 150V |
| Battery Voltage | 12V | 12V | 12V | 24V |
| Self-consumption | [TBD] | 0.06W | [TBD] | [TBD] |
| Reverse Polarity Protection | Yes | Yes | Yes | Yes |
| Temperature Compensation | Yes | Yes | Yes | Yes |

## Protection Features

| Protection Type | WP-384 | WP-768 | WP-4800T | WP-21600T |
|----------------|-------|-------|---------|---------|
| Over-Current Protection | 4A (>3s) | 10A | [TBD] | [TBD] |
| Short-Circuit Protection | >5A instant | Yes | Yes | Yes |
| Over-Voltage Protection | >14.6V | Yes | Yes | Yes |
| Under-Voltage Protection | <10V | Yes | Yes | Yes |
| Reverse Polarity Protection | Yes | Yes | Yes | Yes |
| Over-Temperature Protection | >60°C | Yes | [TBD] | [TBD] |

## Environmental Specifications

### IP Ratings
| Product | IP Rating | Dust Protection | Water Protection |
|---------|-----------|----------------|------------------|
| WP-384 | IP66 | Dust-tight | Powerful water jets |
| WP-768 | IP66 | Dust-tight | Powerful water jets |
| WP-4800T | IP65 | Dust-tight | Low pressure water jets |
| WP-21600T | IP65 | Dust-tight | Low pressure water jets |

### Temperature Specifications
| Parameter | WP-384 | WP-768 | WP-4800T | WP-21600T |
|-----------|-------|-------|---------|---------|
| Operating Range | -20°C to +50°C | -30°C to +85°C | -20°C to +85°C | -20°C to +85°C |
| Storage Range | -40°C to +60°C | -30°C to +85°C | -20°C to +85°C | -20°C to +85°C |
| Optimal Performance | +10°C to +35°C | +10°C to +35°C | +10°C to +35°C | +10°C to +35°C |

### Corrosion Resistance
- Solar panel frames: Anodized aluminum alloy
- Mounting brackets: Galvanized + powder-coated steel
- Enclosures: UV-resistant polymers or coated metals
- Trailers: Anti-oxidation electrostatic powder coating
- Fasteners: Stainless steel or zinc-plated

## Installation Requirements

| Requirement | WP-384 | WP-768 | WP-4800T | WP-21600T |
|-------------|-------|-------|---------|---------|
| Ground Area | N/A (pole mount) | N/A (structure mount) | ~4 m² | ~6 m² |
| Ground Type | Existing structure | Existing structure | Level, compacted | Level, compacted |
| Vehicle Access | Light vehicle | Light vehicle | Pickup with trailer | Heavy vehicle |
| Crane Required | No | No | No | No |
| Solar Exposure | Southern sky | Southern sky | Southern sky | Southern sky |
| Pole Diameter (WP-384/768) | 60–150mm | — | — | — |
| Min Pole Height | 3m above ground | — | — | — |

## Contact Information

For any additional details or clarity: Zishan Shahzad
E-mail: zishan.shahzad@wakecap.com

## Related Documents

- WC-PS-LRG-v1.2: Power Solutions Logistics Reference Guide
- WC-PS-OSG-v1.2: Power Solutions Operations Selection Guide
- WC-PS-TEM-v1.2: Power Solutions Technical Engineering Manual

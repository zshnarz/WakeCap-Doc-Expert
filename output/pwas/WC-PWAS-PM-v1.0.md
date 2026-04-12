---
title: "WakeCap PWAS — Product Manual"
doc-id: WC-PWAS-PM-v1.0
product: PWAS (Proximity Warning and Alert System)
doc-type: Product Manual
revision-date: 2026-04-12
subtitle: "AI-Based Collision Avoidance System for Construction Equipment"
author: "WakeCap Technologies"
version: "A"
hardware-compatibility: "Blaxtair 5 (BXT5 Ethernet) — MR260 Camera, Flash Beacon, Smart Display"
platform-version: "Equipment Manager v1.8.1"
---

[IMAGE: WakeCap PWAS hero shot — a large yellow excavator on a construction site with Blaxtair cameras visibly mounted on the rear and sides of the cab, Flash Beacon strobe light on top of the cab, and a worker in full PPE (hard hat, reflective vest) walking nearby. The Smart Display inside the cab is visible through the windshield showing the camera feed with a green detection zone overlay around the worker. Dust and construction activity in the background]

# WakeCap PWAS

**Product Manual**

AI-powered pedestrian detection and collision avoidance for heavy equipment on mega construction and oil & gas sites.

| | |
|:---|:---|
| **System** | Blaxtair 5 (BXT5 Ethernet) |
| **Document** | WC-PWAS-PM-v1.0 |
| **Revision** | 1.0 |
| **Date** | 2026-04-12 |

---

\newpage

# 1. Product Overview

## 1.1 Description

The WakeCap PWAS (Proximity Warning and Alert System) is an AI-based collision avoidance solution designed to prevent accidents between heavy construction equipment and pedestrian workers. The system uses Blaxtair's 3D stereo camera technology with onboard artificial intelligence to detect humans in real time, alert equipment operators through visual and audible alarms, and provide configurable outputs for automated vehicle intervention.

PWAS is mandatory on all heavy equipment at Aramco construction sites. Every subcontractor must install a proximity warning system before equipment enters the work zone. The WakeCap PWAS solution leverages Blaxtair — a French technology leader in the pedestrian detection vertical (Arcure Group) — to deliver AI-grade detection performance that far exceeds the basic camera-and-beep systems commonly deployed by subcontractors.

The system differentiates between humans and other objects (vehicles, structures, materials), detecting pedestrians even when partially occluded by obstacles, in dusty conditions, under backlighting, and in PPE-heavy environments with reflective clothing. With a detection latency of less than 200 ms and configurable warning and danger zones, the PWAS system provides operators with the critical reaction time needed to prevent collisions on active construction sites.

## 1.2 Key Features

- **AI-Powered 3D Detection** — Blaxtair's stereo camera with onboard AI identifies pedestrians in real time, including partial body detection through obstructions
- **< 200 ms Latency** — Sub-200-millisecond detection-to-alert response for life-critical reaction time
- **Human-Only Detection** — Distinguishes workers from vehicles, structures, and materials to minimize false alarms and work disruption
- **Multi-Zone Alerting** — Configurable warning zone and danger zone with graduated visual, audible, and electrical responses
- **360-Degree Coverage** — Up to 4 cameras per vehicle for complete blind-spot elimination
- **In-Cabin Smart Display** — Real-time camera feed with detection zone overlay and alert indicators for the operator
- **External Flash Beacon** — High-visibility strobe light alerts pedestrians of detected proximity
- **2 Configurable Outputs** — Discrete electrical signals for driving alarms, braking relays, or engine shutdown
- **All-Weather Operation** — Designed for dust, rain, backlighting, reflections, and extreme temperatures on construction sites

## 1.3 Package Contents

| Item | Quantity | Description |
|:-----|:--------:|:------------|
| Blaxtair MR260 AI Camera | 1–4 | 3D stereo camera with onboard AI processor |
| Blaxtair Smart Display | 1 | In-cabin 7" display with camera feed and alert overlay |
| Blaxtair Flash Beacon | 1 | External high-intensity strobe alarm |
| Ethernet Cable Set | 1 set | Pre-terminated cables for camera-to-display connection |
| Power Cable Harness | 1 | Vehicle power connection (12/24 V DC) |
| Mounting Brackets & Hardware | 1 set | Camera, display, and beacon mounting hardware |
| Installation Manual | 1 | BXT5 Ethernet Installation Manual (EN) |
| Configuration Guide | 1 | Zone configuration and output setup guide |

## 1.4 Product Identification

[IMAGE: Annotated photo showing all three Blaxtair components laid out on a clean surface — LEFT: MR260 camera (compact black enclosure with dual stereo lenses visible on front face, Ethernet and power connectors on rear), callout numbers 1-4 pointing to: 1-Stereo lens pair, 2-Status LED, 3-Ethernet port, 4-Power connector. CENTER: Smart Display (7" touchscreen showing a sample camera view with green/red zone overlay), callout numbers 5-6: 5-Touchscreen display, 6-Mounting arm connector. RIGHT: Flash Beacon (amber strobe unit with clear lens dome), callout numbers 7-8: 7-Strobe module, 8-Mounting base. Scale ruler at bottom]

1. **Stereo Lens Pair** — Dual cameras for 3D depth perception and distance calculation
2. **Status LED** — Indicates camera operational status (green = active, red = fault)
3. **Ethernet Port** — RJ45 for data and power (PoE) to Smart Display
4. **Power Connector** — Direct vehicle power input (12/24 V DC)
5. **Touchscreen Display** — 7" screen showing live camera feed with detection zone overlays
6. **Mounting Arm Connector** — Adjustable arm for in-cabin positioning
7. **Strobe Module** — High-intensity amber flash visible in daylight conditions
8. **Mounting Base** — Magnetic or bolt-on base for vehicle exterior mounting

---

\newpage

# 2. System Architecture

## 2.1 System Overview

[IMAGE: System architecture diagram showing a heavy equipment vehicle (excavator) in the center with Blaxtair components installed — 1-4 MR260 cameras mounted at strategic positions around the vehicle (rear, left side, right side, front), connected via Ethernet cables to the Smart Display inside the operator cab. The Flash Beacon on top of the cab. Two discrete output wires from the Smart Display running to: (A) a buzzer/siren and (B) a braking control relay. Dotted line labeled "Future Integration" connecting from the Smart Display to a WakeCap cloud icon showing the Equipment Manager portal. Detection zones shown as colored concentric arcs around the vehicle: green outer zone (Warning) and red inner zone (Danger). A pedestrian figure shown entering the warning zone]

## 2.2 How It Works

The Blaxtair PWAS system uses a continuous detection loop:

1. **Capture** — The MR260 stereo camera continuously captures 3D image data from its dual lenses
2. **Process** — Onboard AI analyzes each frame in real time, identifying human shapes, postures, and body parts
3. **Classify** — The AI distinguishes humans from non-human objects (vehicles, barriers, materials) using deep learning models
4. **Range** — 3D stereo vision calculates the precise distance between the detected pedestrian and the equipment
5. **Zone Check** — The system compares the pedestrian's distance against configured Warning Zone and Danger Zone thresholds
6. **Alert** — If a pedestrian is within a zone, the system activates the appropriate alert (visual, audible, electrical output)

**Detection latency from capture to alert: < 200 ms.**

::: {.notice}
All AI processing occurs onboard the camera — no cloud connectivity or internet connection is required for detection. The system operates autonomously once powered on.
:::

## 2.3 Detection Zones

The system operates with two configurable proximity zones around the vehicle:

| Zone | Typical Range | Response | Output |
|:-----|:-------------|:---------|:-------|
| **Warning Zone** (outer) | [TBD] m | Visual alert on Smart Display + audible tone | Discrete Output 1 activated |
| **Danger Zone** (inner) | [TBD] m | Urgent alert on display + loud alarm + Flash Beacon | Discrete Output 2 activated |
| **Safe Zone** (beyond) | Beyond warning range | No alert — normal operation | No outputs activated |

[IMAGE: Top-down diagram of a yellow excavator with two concentric colored zones radiating from all sides — outer zone in semi-transparent green labeled "Warning Zone" with a walking pedestrian icon and a yellow triangle warning symbol, inner zone in semi-transparent red labeled "Danger Zone" with a pedestrian icon and a red octagon stop symbol. Dimensions showing zone radii from vehicle body. Arrows from each zone pointing to icons: Warning Zone arrow to speaker icon (audible tone) and display icon (visual alert), Danger Zone arrow to beacon icon (Flash Beacon), speaker icon (loud alarm), and relay icon (electrical output)]

::: {.tip}
Configure zone ranges based on the equipment type and operating speed. Slow-moving equipment (e.g., excavators, forklifts) can use shorter zones, while faster vehicles (e.g., dump trucks) should use wider zones to account for stopping distance.
:::

## 2.4 Communication Architecture

| Connection | Type | Direction | Notes |
|:-----------|:-----|:---------:|:------|
| MR260 Camera → Smart Display | Ethernet (PoE) | Bidirectional | Video stream + detection data + power |
| Smart Display → Flash Beacon | Wired (12/24 V) | Output | Triggered on zone breach |
| Smart Display → Output 1 | Discrete relay | Output | Warning zone — configurable |
| Smart Display → Output 2 | Discrete relay | Output | Danger zone — configurable |
| Smart Display → Buzzer/Siren | Wired (12/24 V) | Output | Audible alerts |
| Smart Display → WakeCap Platform | Ethernet/4G (future) | Upstream | Event logging and compliance (planned) |

---

\newpage

# 3. Technical Specifications

## 3.1 MR260 AI Camera

### 3.1.1 Detection Performance

| Parameter | Value | Unit |
|:----------|------:|:----:|
| Detection Latency | < 200 | ms |
| Detection Type | Human-only (AI classification) | — |
| Partial Occlusion | Supported (body parts) | — |
| 3D Distance Measurement | Stereo vision | — |
| Detection Range | [TBD] | m |
| Field of View (horizontal) | [TBD] | ° |
| Field of View (vertical) | [TBD] | ° |
| Frame Rate | [TBD] | fps |
| AI Processing | Onboard (edge) | — |

### 3.1.2 Physical Specifications

| Parameter | Value | Unit |
|:----------|------:|:----:|
| Dimensions (L × W × H) | [TBD] | mm |
| Weight | [TBD] | g |
| Enclosure Material | [TBD] | — |
| IP Rating | [TBD] | — |
| Mounting | Bracket (bolt-on or magnetic) | — |

### 3.1.3 Electrical Specifications

| Parameter | Min | Typ | Max | Unit |
|:----------|----:|----:|----:|:----:|
| Input Voltage | 10 | 12/24 | 30 | V DC |
| Power Consumption | — | [TBD] | [TBD] | W |

### 3.1.4 Environmental Specifications

| Parameter | Min | Max | Unit |
|:----------|----:|----:|:----:|
| Operating Temperature | [TBD] | [TBD] | °C |
| Storage Temperature | [TBD] | [TBD] | °C |
| Humidity | 0 | 95 | % RH (non-condensing) |

## 3.2 Smart Display

| Parameter | Value |
|:----------|:------|
| Screen Size | 7" (estimated) |
| Type | Touchscreen LCD |
| Display Content | Live camera feed with zone overlays, alert indicators |
| Mounting | Adjustable arm for in-cabin positioning |
| Connectivity | Ethernet to camera(s), wired outputs |
| Discrete Outputs | 2 configurable relay outputs |

## 3.3 Flash Beacon

| Parameter | Value |
|:----------|:------|
| Type | High-intensity amber strobe |
| Visibility | Daylight-visible |
| Trigger | Activated by Smart Display on zone breach |
| Mounting | Magnetic or bolt-on base for vehicle roof/exterior |
| Power | 12/24 V DC from vehicle |

## 3.4 System Configurations

| Configuration | Cameras | Coverage | Typical Application |
|:-------------|:-------:|:---------|:-------------------|
| Single Rear | 1 | Reverse blind spot | Forklifts, small loaders |
| Dual (Rear + Side) | 2 | Rear + one side | Excavators, graders |
| Triple | 3 | Rear + both sides | Dump trucks, large loaders |
| Full 360° | 4 | All directions | Tower cranes (fixed-point), large excavators |

## 3.5 Certifications

| Certification | Status | Notes |
|:-------------|:-------|:------|
| CE | [TBD] | European conformity — per Blaxtair documentation |
| ISO 21815 | [TBD] | Earth-moving machinery — collision warning and avoidance |
| EN 16191 | [TBD] | Tunnelling machinery — safety requirements |
| Functional Safety | [TBD] | Per Blaxtair compliance documentation |
| IP Rating | [TBD] | Ingress protection for camera and beacon |

::: {.notice}
Certification documentation is maintained by Blaxtair (Arcure Group). Contact WakeCap for current certification status and compliance declarations for specific project requirements.
:::

---

\newpage

# 4. Components

## 4.1 Blaxtair MR260 AI Camera

**Function:**
The MR260 is the core detection unit. Its dual stereo lenses capture 3D imagery that is processed by the onboard AI to detect pedestrians, calculate distance, and trigger zone-based alerts. The camera differentiates humans from vehicles, barriers, and construction materials using deep learning.

[IMAGE: Close-up product photo of the Blaxtair MR260 camera — front view showing the two stereo lens apertures side by side in a rugged black enclosure, with a small status LED between them. The enclosure shows IP-rated sealing around lens openings. A small "Blaxtair" logo is visible. White background, studio lighting]

**Key Capabilities:**

- Identifies humans even when partially hidden behind obstacles (partial body detection)
- Works in dust, rain, backlighting, and reflective PPE environments
- Uphill/downhill coverage — maintains accuracy on slopes
- Reflection detection — handles glass, water, and metallic surfaces
- No false triggers on other vehicles or construction materials

## 4.2 Blaxtair Smart Display

**Function:**
In-cabin display providing the operator with a live camera feed overlaid with detection zone boundaries and real-time alert indicators. Also serves as the system controller, routing detection events to the Flash Beacon and discrete outputs.

[IMAGE: Photo of the Blaxtair Smart Display mounted on an adjustable arm inside an excavator cab — the 7" screen shows a live camera view of the rear of the vehicle with a green semi-transparent overlay showing the warning zone and a pedestrian highlighted with a blue bounding box. Alert status bar at the top of the screen showing "WARNING — Worker detected at 4.2 m". Operator's hand visible on equipment controls nearby]

## 4.3 Blaxtair Flash Beacon

**Function:**
Exterior-mounted strobe light that activates when a pedestrian is detected in the danger zone. Alerts pedestrians and nearby workers to the equipment's proximity warning.

[IMAGE: Photo of the Blaxtair Flash Beacon — amber dome strobe light with a heavy-duty black base, shown mounted on top of an excavator cab. The strobe is shown in both OFF state (clear amber dome) and ON state (bright amber flash radiating outward). Two mounting options shown: magnetic base and bolt-on bracket]

## 4.4 Braking Integration Module (WakeCap Developed)

**Function:**
Optional automated braking module developed by WakeCap that connects to the Blaxtair Discrete Output 2 (danger zone) to physically slow or stop the vehicle when a pedestrian enters the danger zone.

::: {.warning}
**VEHICLE CONTROL HAZARD** — Automated braking systems can cause equipment instability (tipping) if braking force is not proportional to vehicle speed, load, and terrain. The braking integration module must be calibrated for each specific vehicle type and operating condition. Do not deploy on highway-speed vehicles.
:::

**Components (in development):**

| Component | Description |
|:----------|:------------|
| Micro PLC Controller | MRS Electronic programmable controller for brake logic |
| Brake Actuator | Mechanical actuator on brake pedal or hydraulic valve |
| PCAN USB Interface | CAN bus programming and diagnostics |
| Override Switch | Manual driver override to disable auto-braking |

::: {.notice}
The braking integration module is currently in the development and testing phase. Initial deployments use the Blaxtair system in PWAS alert-only mode (visual + audible alerts without automated braking).
:::

---

\newpage

# 5. Installation

::: {.danger}
**CRUSHING HAZARD** — Never work under or around heavy equipment while installing the PWAS system unless the equipment is fully shut down, keys removed, wheels chocked, and hydraulics depressurized. Follow site-specific lockout/tagout (LOTO) procedures.
:::

::: {.warning}
**ELECTRICAL HAZARD** — Disconnect the vehicle battery before performing any wiring work. Verify circuits are de-energized with a multimeter before touching exposed conductors.
:::

## 5.1 Prerequisites

Before installation, confirm the following:

- [ ] Blaxtair hardware kit (camera(s), Smart Display, Flash Beacon, cables)
- [ ] Equipment type and model identified
- [ ] Camera mounting positions determined (based on blind spots and risk assessment)
- [ ] Vehicle power source located (12 V DC or 24 V DC)
- [ ] Ethernet cables of correct length for camera runs
- [ ] Installation tools: drill, wrenches, cable ties, multimeter
- [ ] Site work permit obtained (hot work / electrical permit as required)
- [ ] Vehicle fully shut down with LOTO procedures in place

## 5.2 Camera Installation

1. **Identify** the blind spots on the specific equipment type. Common mounting positions:

| Equipment Type | Camera Position(s) | Notes |
|:--------------|:-------------------|:------|
| Excavator | Rear of cab + both sides | Primary risk is swing radius |
| Dump Truck | Rear + right side | Reversing and turning blind spots |
| Wheel Loader | Rear + bucket side | Bucket obstructs forward view when raised |
| Forklift | Rear only | Single camera sufficient for small equipment |
| Mobile Crane | Multiple positions | 360° coverage recommended |

2. **Mount** the MR260 camera(s) using the supplied brackets at the identified positions.
   a. Ensure the camera lens faces outward and downward at a slight angle to cover the ground-level detection area.
   b. Secure the bracket with bolts (preferred) or magnetic base (temporary).
   c. Route the Ethernet cable from each camera to the operator cab, protecting it from heat, abrasion, and pinch points.

3. **Verify** each camera has a clear field of view — no obstructions from vehicle body, mirrors, or accessories.

## 5.3 Smart Display Installation

4. **Mount** the Smart Display inside the operator cab on the adjustable arm.
   a. Position within the operator's natural line of sight without obstructing the primary view of the work area.
   b. Ensure the screen is readable in direct sunlight.

5. **Connect** each camera's Ethernet cable to the Smart Display's camera ports.

6. **Connect** the Smart Display power cable to the vehicle electrical system.
   a. Route power cable to vehicle battery or fuse box.
   b. Connect positive wire to +12/24 V DC source (fused).
   c. Connect ground wire to vehicle chassis ground.

## 5.4 Flash Beacon Installation

7. **Mount** the Flash Beacon on the vehicle exterior — roof of cab or top of rollover protection structure (ROPS).
   a. Use magnetic base for temporary installations or bolt-on bracket for permanent deployment.
   b. Ensure 360° visibility from ground level.

8. **Connect** the Flash Beacon wiring to the Smart Display beacon output.

## 5.5 Output Wiring

9. **Wire** Discrete Output 1 (warning zone) to the desired response device:
   - In-cabin buzzer or tone generator (standard)
   - Additional external alarm (optional)

10. **Wire** Discrete Output 2 (danger zone) to the desired response device:
    - High-priority in-cabin alarm (standard)
    - Braking control relay (if braking module installed)
    - Engine shutdown relay (optional)

## 5.6 System Configuration

11. **Power on** the vehicle and the PWAS system.
12. **Verify** the system self-test completes:
    - Flash Beacon activates briefly (siren + light)
    - Smart Display shows live camera feed
    - Status LED on camera shows green (active)
13. **Configure** detection zones using the Smart Display interface:
    a. Set Warning Zone distance (outer boundary).
    b. Set Danger Zone distance (inner boundary).
    c. Verify Output 1 activates when a person enters the Warning Zone.
    d. Verify Output 2 activates when a person enters the Danger Zone.

## 5.7 Post-Installation Verification

14. **Walk test** — Have a person in full PPE walk toward the vehicle from multiple directions:
    a. Confirm detection at the Warning Zone boundary — Smart Display shows alert, buzzer sounds.
    b. Confirm detection at the Danger Zone boundary — Flash Beacon activates, loud alarm sounds.
    c. Confirm the system does NOT trigger on other vehicles or objects passing nearby.

15. **Record** the installation in the WakeCap Equipment Manager portal:
    a. Set `pwasInstalled` to true.
    b. Set `pwasType` to "Blaxtair 5".

::: {.important}
Repeat the walk test from ALL directions (front, rear, left, right, and diagonal approaches) to verify full coverage. Adjust camera angles if any blind spots are detected.
:::

---

\newpage

# 6. Operation

## 6.1 Normal Operation

During normal equipment operation, the PWAS system runs continuously and autonomously:

| System State | Operator Action | Display Shows |
|:------------|:---------------|:--------------|
| **No detection** | Operate normally | Live camera feed — green status bar |
| **Warning Zone alert** | Reduce speed, increase awareness | Camera feed with pedestrian highlighted in yellow, audible tone |
| **Danger Zone alert** | Stop immediately, verify surroundings | Camera feed with pedestrian highlighted in red, loud alarm, Flash Beacon active |
| **System fault** | Stop operations, report to supervisor (see *Section 9.5*) | Error indicator — red status LED on camera (see *Section 8.2*) |

## 6.2 Operator Interface — Smart Display

The Smart Display provides:

- **Live camera feed** from connected MR260 camera(s)
- **Zone overlay** — semi-transparent colored boundaries showing Warning and Danger zones
- **Pedestrian highlighting** — bounding box around detected persons with distance readout
- **Alert status bar** — top of screen showing current alert level and detected distance
- **Camera selection** — switch between cameras if multiple are installed
- **Settings access** — zone configuration, output configuration, system diagnostics

## 6.3 Alert Behavior

### 6.3.1 Warning Zone Triggered

When a pedestrian enters the Warning Zone:

1. Smart Display highlights the pedestrian with a yellow bounding box
2. Distance readout updates in real time
3. In-cabin buzzer emits a steady tone
4. Discrete Output 1 energizes

### 6.3.2 Danger Zone Triggered

When a pedestrian enters the Danger Zone:

1. Smart Display highlights the pedestrian with a red bounding box
2. Distance readout updates with urgent styling
3. In-cabin alarm emits a loud, rapid pulse
4. Flash Beacon activates — amber strobe visible to all nearby workers
5. Discrete Output 2 energizes

### 6.3.3 Pedestrian Exits Zone

When the detected pedestrian leaves all zones:

1. All alerts cease automatically
2. Smart Display returns to normal view
3. Outputs de-energize
4. Flash Beacon deactivates

::: {.notice}
The system uses intelligent alert logic — it does not continuously re-trigger alerts for the same pedestrian staying in a zone. Alerts are sustained while the person is present and cease when they leave.
:::

## 6.4 Human-Only Detection

The Blaxtair AI discriminates between humans and non-human objects:

| Object | Detected | Alert |
|:-------|:--------:|:-----:|
| Worker on foot | Yes | Yes |
| Worker bending / crouching | Yes | Yes |
| Partially hidden worker (behind barrier) | Yes | Yes |
| Worker in full PPE (reflective vest, hard hat) | Yes | Yes |
| Other vehicle | No | No |
| Construction materials (pipes, beams) | No | No |
| Traffic cones / barriers | No | No |
| Wildlife / animals | No | No |

::: {.tip}
Human-only detection significantly reduces false alarms compared to radar or ultrasonic systems, which trigger on all objects. This minimizes alert fatigue and avoids unnecessary work stoppages when vehicles operate near each other.
:::

## 6.5 Equipment Manager Integration

Each vehicle's PWAS status is tracked in the WakeCap Equipment Manager portal:

| Field | Type | Description |
|:------|:-----|:------------|
| `pwasInstalled` | Boolean | Whether a PWAS system is installed on the vehicle |
| `pwasType` | String | Type of PWAS system (e.g., "Blaxtair 5") |

**Future platform integration (planned):**

- Real-time PWAS event streaming to WakeCap dashboard
- Detection event logging for compliance reporting
- Integration with Observation Service for incident management
- Unified Video Management System (VMS) for CCTV, dashcam, and PWAS camera streams

---

\newpage

# 7. Maintenance

## 7.1 Maintenance Schedule

| Task | Frequency | Procedure |
|:-----|:----------|:----------|
| Clean camera lenses | Weekly | Wipe stereo lenses with soft microfiber cloth; remove dust, mud, and water spots |
| Inspect camera mounting | Weekly | Verify brackets are secure and camera angle has not shifted |
| Walk test verification | Monthly | Repeat walk test (see *Section 5.7 Post-Installation Verification*) from all directions |
| Check Flash Beacon | Monthly | Verify beacon activates on danger zone entry; check dome for cracks |
| Inspect all cables | Monthly | Check Ethernet and power cables for damage, abrasion, or loose connectors |
| Verify detection zones | Quarterly | Confirm zone distances match configured values using measured walk test |
| Check Smart Display | Quarterly | Verify screen brightness, touch response, and camera feed clarity |
| Review system logs | Quarterly | Check for error patterns or false detection trends (when platform integration available) |

## 7.2 Calibration Requirements

### 7.2.1 Detection Zone Calibration

Verify zone accuracy quarterly or after any camera repositioning:

1. **Mark** the configured Warning Zone distance on the ground (use tape measure from vehicle body).
2. **Walk** a test person toward the vehicle from the marked distance.
3. **Confirm** the Warning alert triggers within 0.5 m of the marked boundary.
4. **Repeat** for the Danger Zone distance.
5. **Adjust** zone settings in the Smart Display if boundaries have drifted.

### 7.2.2 Camera Alignment Check

1. **Compare** the camera feed on the Smart Display with the actual scene behind the vehicle.
2. **Verify** the camera covers the full intended detection area.
3. **Realign** the camera bracket if the field of view has shifted due to vibration.

## 7.3 Lens Cleaning

::: {.caution}
**EQUIPMENT STARTUP HAZARD** — Ensure the vehicle is fully shut down before cleaning cameras mounted on the vehicle exterior. Do not lean against or climb on equipment to reach cameras without proper fall protection.
:::

1. **Shut down** the vehicle and engage LOTO.
2. **Wipe** each camera lens with a clean, dry microfiber cloth.
3. **Remove** heavy mud or debris with a damp cloth first, then dry.
4. **Inspect** the lens for scratches — scratched lenses can degrade 3D depth measurement.
5. **Replace** cameras with heavily scratched lenses.

---

\newpage

# 8. Troubleshooting

## 8.1 Common Issues

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|:--------|:-------------|:-------------|:----|:--------------|
| No display on Smart Display | Power issue | Check power connections; verify vehicle battery voltage | Reconnect power cable; check fuse | Display still blank after power verified |
| Camera shows no image | Ethernet disconnected | Check Ethernet cable at both ends | Reseat or replace Ethernet cable | Cable tested OK but no image |
| False detections on objects | Dirty or scratched lens | Clean lens with microfiber cloth | Clean or replace camera lens | False detections persist after cleaning |
| No detection of nearby person | Camera misaligned | Check camera angle; verify field of view covers ground level (see *Section 7.2.2*) | Realign camera bracket | Detection consistently missed in walk test |
| Flash Beacon not activating | Wiring issue | Check beacon power wiring and connection to Smart Display | Reconnect beacon wiring | Wiring verified OK but beacon still inactive |
| Intermittent alerts | Loose cable connection | Inspect all Ethernet and power connectors | Reseat all connectors; secure with cable ties | Intermittent after resecuring all connections |
| Zone distances inaccurate | Calibration drift | Perform measured walk test (see *Section 7.2.1*) | Reconfigure zone distances in Smart Display | Distances incorrect after reconfiguration |
| System does not self-test on startup | Controller fault | Power cycle the vehicle | Full power cycle; wait 30 seconds between off and on | Self-test fails after power cycle |

## 8.2 LED Status Reference

| Camera Status LED | Meaning | Action |
|:------------------|:--------|:-------|
| Solid Green | Normal operation — detecting | None required |
| Blinking Green | Initializing / self-test in progress | Wait 30 seconds |
| Solid Red | System fault | Check connections; power cycle; escalate if persistent |
| Off | No power | Check power cable and vehicle battery |

## 8.3 When to Contact Support

Contact the WakeCap technical support team when:

- Walk test consistently fails to detect pedestrians in the configured zone
- False detections persist after lens cleaning and recalibration
- Smart Display shows error codes not resolved by power cycling
- Camera hardware appears physically damaged
- Braking integration module requires calibration for a new vehicle type

---

\newpage

# 9. Safety Information

## 9.1 General Safety

::: {.danger}
**CRUSHING HAZARD** — The PWAS system is a supplementary safety aid. It does NOT replace the operator's responsibility to maintain situational awareness, use mirrors, follow spotter procedures, and obey site safety rules. Equipment operators must NEVER rely solely on the PWAS system to detect pedestrians.
:::

::: {.warning}
**SYSTEM LIMITATION** — No AI detection system achieves 100% accuracy under all conditions. Factors that can reduce detection performance include: extreme fog or smoke, direct lens contamination (mud, ice), camera physical damage, and electrical interference. Always maintain manual safety procedures alongside the PWAS system.
:::

## 9.2 Electrical Safety

::: {.warning}
**ELECTRICAL HAZARD** — Disconnect the vehicle battery negative terminal before performing any installation or wiring work on the PWAS system. Verify circuits are de-energized with a multimeter before touching exposed conductors.
:::

- Use insulated tools when working on vehicle electrical systems
- Fuse all power connections to protect against short circuits
- Route cables away from heat sources (exhaust, turbochargers, hydraulic lines)
- Use heat-shrink tubing on all splices

## 9.3 Braking Safety

::: {.danger}
**VEHICLE CONTROL HAZARD** — If the optional braking integration module is installed, incorrect calibration can cause: sudden uncontrolled braking, vehicle tipping, loss of steering control, or equipment instability. Braking calibration MUST be performed by qualified WakeCap engineers for each specific vehicle type, load condition, and terrain.
:::

::: {.warning}
**HIGHWAY PROHIBITION** — The automated braking function must NOT be active when equipment is driven on public roads or highways. Use the manual override switch to disable auto-braking before highway travel.
:::

## 9.4 PPE Requirements

| Task | Required PPE |
|:-----|:-------------|
| PWAS installation on equipment | Hard hat, safety glasses, gloves, high-visibility vest, safety boots |
| Camera mounting at height | All above + safety harness and fall protection |
| Electrical wiring | Safety glasses, insulated gloves |
| Walk test verification | Full site PPE (hard hat, vest, boots) |

## 9.5 Emergency Procedures

If the PWAS system fails during operation:

1. **Stop** the equipment immediately.
2. **Post** a spotter to manually direct traffic and pedestrians around the vehicle.
3. **Report** the system failure to the site safety officer and WakeCap support.
4. **Do not resume** unsupervised equipment operation until the PWAS system is repaired or a spotter is permanently assigned.

---

\newpage

# Appendix A: Glossary

| Term | Definition |
|:-----|:----------|
| PWAS | Proximity Warning and Alert System — technology to prevent vehicle-pedestrian collisions |
| CAS | Collision Avoidance System — used interchangeably with PWAS |
| Blaxtair | French AI camera company (Arcure Group) — primary PWAS vendor |
| MR260 | Blaxtair 3D stereo AI camera model |
| BXT5 | Blaxtair 5 — current generation system (Ethernet variant) |
| 3D Stereo Vision | Dual-camera technique for measuring distance through parallax |
| Warning Zone | Outer configurable detection boundary — triggers awareness alerts |
| Danger Zone | Inner configurable detection boundary — triggers urgent alerts and outputs |
| Flash Beacon | High-intensity amber strobe light for external pedestrian alerting |
| Smart Display | In-cabin touchscreen showing camera feed, zone overlays, and alert status |
| LOTO | Lockout/Tagout — safety procedure to ensure equipment is shut down during maintenance |
| ROPS | Rollover Protection Structure — cab frame on heavy equipment |
| PoE | Power over Ethernet — delivers power and data through a single Ethernet cable |
| VMS | Video Management System — unified platform for multiple video streams |
| PLC | Programmable Logic Controller — used in braking integration module |

---

# Appendix B: Comparison — AI Camera vs. Alternative Detection Technologies

| Feature | AI Camera (Blaxtair) | Radar | Ultrasonic | UWB Tags | RFID Tags |
|:--------|:-------------------:|:-----:|:----------:|:--------:|:---------:|
| Human-only detection | Yes | No | No | Yes (tagged only) | Yes (tagged only) |
| No tags required on workers | Yes | Yes | Yes | No | No |
| Partial body detection | Yes | No | No | No | No |
| Detection through dust/fog | Moderate | Good | Poor | Good | Good |
| False alarm rate | Low | High | High | Low | Low |
| Detection latency | < 200 ms | < 100 ms | < 100 ms | < 50 ms | < 200 ms |
| 3D distance measurement | Yes | Yes | Yes | Yes | No |
| Installation complexity | Medium | Low | Low | High (tags) | High (tags) |
| Per-worker cost | None | None | None | Per tag | Per tag |
| Video evidence | Yes | No | No | No | No |

---

# Appendix C: Supported Equipment Types

| Category | Equipment Types | Camera Configuration |
|:---------|:---------------|:--------------------|
| Excavators | Crawler, wheeled, mini | 2–4 cameras (rear + sides + front) |
| Loaders | Wheel loaders, backhoe loaders | 1–2 cameras (rear + bucket side) |
| Dump Trucks | Articulated, rigid | 2–3 cameras (rear + right side) |
| Forklifts | Counterbalance, reach | 1 camera (rear) |
| Cranes | Mobile, tower (fixed-point) | 2–4 cameras (ground-level fixed-point for tower cranes) |
| Compactors | Rollers, plate compactors | 1–2 cameras (front + rear) |
| Graders | Motor graders | 2 cameras (rear + blind side) |
| Dozers | Crawler dozers | 2 cameras (rear + right side) |

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
| **PWAS Technical Lead** | Rami Nassouh |
| **Portal** | portal.wakecap.com |
| **Vendor** | Blaxtair (Arcure Group) — blaxtair.com |
| **General** | support@wakecap.com |
| **Website** | www.wakecap.com |

---

*© 2026 WakeCap Technologies. All rights reserved.*
*WC-PWAS-PM-v1.0 — Revision Date: 2026-04-12*

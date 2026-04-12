# WakeCap PWAS (Proximity Warning and Alert System) — Knowledge Base

## Product Identity

- **Product Name:** WakeCap AI-based Collision Avoidance System (PWAS)
- **Product Code:** PWAS
- **Category:** Vehicle-to-Pedestrian Safety / Anti-Collision
- **Primary Vendor:** Blaxtair (Arcure Group, France) — blaxtair.com
- **Secondary Vendor Evaluated:** WT-Safe (China) — wt-safe.com
- **Deployment Status:** POC / field testing phase (as of April 2026)
- **Slack Channel:** #vms-anti-collision (C09SJQP5BFE)

---

## What is PWAS

PWAS (Proximity Warning and Alert System) is a safety technology approved by Aramco used in Saudi Arabia to prevent accidents between construction equipment and personnel on worksites. It uses AI cameras and sensors to detect potential hazards and alert workers and equipment operators. Every subcontractor is obligated to install PWAS on heavy equipment before entering Aramco construction sites.

The WakeCap PWAS solution uses Blaxtair's AI-powered 3D camera technology as the primary detection system, combined with WakeCap's own braking integration and platform connectivity.

---

## Hardware — Blaxtair 5 System

### Core Components

| Component | Model | Function |
|-----------|-------|----------|
| AI Camera | Blaxtair MR260 | 3D stereo camera with onboard AI for real-time pedestrian detection |
| Flash Beacon | Blaxtair Flash Beacon | External visual alarm — high-intensity strobe light on vehicle exterior |
| Smart Display | Blaxtair Smart Display | In-cabin driver display showing camera feed, detection zones, and alerts |

### System Architecture

- Blaxtair 5 Ethernet variant
- Camera(s) mounted on vehicle exterior covering blind spots
- Up to 4 cameras per vehicle for 360-degree coverage
- Smart Display mounted in operator cabin
- Flash Beacon mounted on vehicle exterior (visible to pedestrians)
- 2 discrete electrical outputs for user-configurable response (alarm, braking relay, etc.)
- Onboard AI processing — no cloud dependency for detection

### Key Technical Characteristics

- **Detection latency:** < 200 ms
- **Detection method:** AI-based 3D computer vision
- **Human-only detection:** Can distinguish humans from vehicles/objects — does not false-trigger on other machines
- **Partial body detection:** AI can detect parts of body even when view is partially obstructed
- **Coverage:** Works uphill/downhill, handles reflections
- **PPE-heavy environments:** Designed for construction sites with reflective clothing, backlight, dust
- **Detection range:** [TBD — per Blaxtair documentation]
- **Detection zones:** Configurable warning and danger zones around vehicle
- **Self-test:** Siren + light activation on system startup
- **Cameras per solution:** Up to 4 cameras
- **AI access:** Lifetime access to Blaxtair AI intelligence with hardware purchase
- **Price point:** ~3,000 EUR per vehicle solution (hardware + lifetime AI)
- **Installation:** Blaxtair provides hardware and remote training; WakeCap performs installation

### Outputs

The Blaxtair system provides 2 configurable discrete electrical outputs:

1. **Output 1:** Warning zone triggered — can drive visual alarm (Flash Beacon), audible alarm (buzzer/siren), or relay control
2. **Output 2:** Danger zone triggered — can drive emergency braking relay, engine shutdown, or additional alarm

---

## Braking System Integration (WakeCap Developed)

Blaxtair does not include a braking system. WakeCap is independently developing braking integration using the Blaxtair discrete output signals.

### Approaches Explored

| Approach | Description | Status |
|----------|-------------|--------|
| Pull-wire controller | Mechanical cable actuator on brake pedal | Tested with WT-Safe system |
| Mechanical actuator | Motor-driven actuator pressing brake pedal | Under development |
| Electronic throttle override | Signal injection to limit/kill engine power | Under evaluation |
| Micro PLC Controllers | MRS Electronic models for programmable control | Hardware ordered for testing |

### Braking Hardware (Ordered for Testing)

- Micro PLC Controller Model 1.111.311.00 (MRS Electronic)
- Micro PLC Controller Model 1.111.311P.00 (MRS Electronic)
- Programming cable sets
- PCAN USB Interface
- Source: www.mrs-electronic.com

### Key Concerns

- Highway driving: Auto-braking must NOT trigger at highway speeds
- Vehicle warranty and compliance implications
- Tipping risk from harsh deceleration on heavy equipment
- Different equipment types have different braking mechanisms
- Installation time: Several hours per vehicle
- Need for dynamic/proportional braking based on speed and distance

---

## WT-Safe SF-420 (Secondary System Evaluated)

| Parameter | Value |
|-----------|-------|
| Vendor | WT-Safe (China) |
| Model | SF-420 |
| Price | ~10x cheaper than Blaxtair |
| Detection | Camera-based AI |
| Vehicle Control | Electronic throttle override, CAN bus, pull-wire braking |
| Human Detection | Can identify human only (vs vehicles) |
| Detection Area | Configurable |
| Vehicle Support | Forklifts, loaders, most common equipment |

### WT-Safe Improvement Needs (from field testing)

- Better cameras for improved detection accuracy
- Speed meter integration
- Better vehicle stopping mechanism
- Highway speed handling
- Overall comparison unfavorable vs Blaxtair in quality

---

## Alert Types and Mechanisms

| Alert Type | Mechanism | Trigger |
|------------|-----------|---------|
| Visual — External | Flash Beacon (strobe) | Pedestrian detected in warning or danger zone |
| Visual — In-Cabin | Smart Display overlay | Pedestrian detected — shows on camera feed with highlighted zone |
| Audible — In-Cabin | Buzzer/siren | Graduated alarm based on proximity |
| Audible — External | Siren on startup | Self-test and worker awareness when equipment starts |
| Electrical Output 1 | Discrete signal | Warning zone triggered — configurable |
| Electrical Output 2 | Discrete signal | Danger zone triggered — configurable |
| Automatic Braking | Via WakeCap braking integration | Danger zone breached — activates brake actuator |

---

## Platform Integration

### Current Integration (Equipment Manager v1.1.2+)

- Equipment registration includes PWAS fields:
  - `pwasType` — type of PWAS system installed
  - `pwasInstalled` — boolean flag (true/false)
- Equipment Manager tracks PWAS installation status per vehicle

### Future Integration (Planned)

- Blaxtair API integration into WakeCap platform
- Event logging and compliance reporting
- Integration with Observation Service for incident management
- Video Management System (VMS) unified experience for CCTV, dashcam, and anti-collision streams
- NFC operator authentication via WakeCap smart helmet
- Connected worker tracking via AVL BLE/Gateway
- Live tracking and streaming when 4G connectivity available

---

## Deployment

### Field Testing Completed

| Site | System | Date | Notes |
|------|--------|------|-------|
| Master Gas Pipeline (L&T Pkg 8) | WT-Safe | Nov 2025 | Field test report written |
| Rabigh | WT-Safe | Nov 2025 | Videos recorded |
| Lab (Dammam office) | Blaxtair | Feb 2026 | Configured and ready for site testing |

### Planned Deployments

| Project | Organization | Status |
|---------|-------------|--------|
| Fadhili | Aramco | Blaxtair testing planned; VMS integration in progress |
| Riyas | Aramco | Demo requested; considered as test location |
| Master Gas (4 packages) | Aramco | Technical proposals submitted |
| Sports Boulevard | SBF | Client asked about PWAS linkage |
| SABIC | SABIC | POC consideration for heavy machinery |

### Aramco Requirements

- PWAS is mandatory on all heavy equipment at Aramco construction sites
- Every subcontractor must install PWAS before equipment enters site
- Currently, most subcontractors use basic camera+beep systems (not AI-based)
- WakeCap's AI-based solution is positioned as a significant upgrade
- Technology scouting registration with Aramco Innovation team in progress

---

## Competitors

| Competitor | Notes |
|-----------|-------|
| Navatech | Used by Sports Boulevard; WakeCap knows them well |
| Perfect Vision KSA | perfectvisionksa.com/ai-pwas |
| Shield Sensor SA | shieldsensor.sa |
| Hexagon/Leica xSight360 | Market leader |
| Safety Shield (UK) | CAN-based braking for excavators/dozers |
| Monitech IntelliZone / Matrix | Engine kill for haul trucks |
| Becker Mining PDS | Relay-triggered brake actuators |
| Tatawwar | RTLS helmet with proximity alerts |

---

## Key People

| Person | Role |
|--------|------|
| Hassan | CEO/CTO — strategic direction, vendor selection, Blaxtair relationship |
| Rami Nassouh | Technical lead — lab testing, braking R&D, installation planning |
| Tarek Fayad | Deployment oversight, client management |
| Zishan Shahzad | Documentation, lab setup, hardware ordering, field support |
| Fawaz | Field installation and testing support |
| Ayman Mahmoud | Field testing, site visits |
| Sally | Procurement — sourcing motors and Chinese vendors |
| Shady Zaky | Platform/Equipment Manager software integration |

---

## Glossary

| Term | Definition |
|------|-----------|
| PWAS | Proximity Warning and Alert System |
| CAS | Collision Avoidance System (used interchangeably with PWAS) |
| Blaxtair | French AI camera company (Arcure Group) — primary PWAS vendor |
| MR260 | Blaxtair 3D AI camera model |
| BXT5 | Blaxtair 5 — current generation system |
| VMS | Video Management System — unified video streaming platform |
| PLC | Programmable Logic Controller — for braking system control |
| CAN bus | Controller Area Network — vehicle communication bus |
| UWB | Ultra-Wideband — radio technology for precise distance measurement |
| RFID | Radio-Frequency Identification — tag-based proximity detection |

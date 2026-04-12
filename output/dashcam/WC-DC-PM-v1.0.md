---
title: "WakeCap DashCam System — Product Manual"
doc-id: WC-DC-PM-v1.0
product: WakeCap DashCam System
doc-type: Product Manual
revision-date: 2026-04-12
subtitle: "Intelligent In-Vehicle Monitoring for Construction and Industrial Fleets"
author: "WakeCap Technologies"
hardware-base: "Hikvision AE-DI2032-G40 Industry DashCam"
model-number: "AE-DI2032-G40"
---

# 1. Product Overview

## 1.1 Description

The WakeCap DashCam System is an intelligent in-vehicle monitoring solution purpose-built for construction and industrial fleet environments. Built on the Hikvision G40 Industry DashCam platform, the system combines dual-channel HD video recording with advanced AI-driven driver monitoring and assistance capabilities.

The DashCam System integrates seamlessly with WakeCap's broader site safety ecosystem, providing centralized fleet monitoring through HikCentral Professional and planned integration with the WakeCap Observation Manager. By connecting driver behavior analytics with vehicle telemetry from the AVL (Automatic Vehicle Location) system, the DashCam delivers a unified safety intelligence layer for vehicle operations on mega construction and oil & gas sites.

Designed for the harsh operating conditions of Middle Eastern construction environments, the system operates reliably across a wide temperature range and connects via 4G LTE cellular networks for real-time data transmission, live video streaming, and remote fleet management.

## 1.2 Key Features

- **Dual-Channel HD Recording** — Simultaneous road-facing and driver-facing cameras capture comprehensive in-vehicle and forward-road footage
- **AI Driver Monitoring (DMS)** — Real-time detection of fatigue, distraction, phone use, smoking, and seatbelt non-compliance
- **Advanced Driver Assistance (ADAS)** — Forward collision warning, lane departure warning, pedestrian detection, and headway monitoring
- **4G LTE Connectivity** — SIM-based cellular connection for live streaming, remote access, and cloud communication
- **HikCentral Professional Integration** — Centralized fleet monitoring with live view, playback, device management, and alert routing via ISUP 5.0
- **Local + Cloud Storage** — SD card recording for offline redundancy with event-based cloud upload for remote evidence access
- **Mobile App Configuration** — Device onboarding, APN setup, and platform binding through the HAT-Dashcam mobile application
- **WakeCap Ecosystem Integration** — Connects with AVL tracking, Observation Manager, and the unified Video Management System (VMS)

## 1.3 Package Contents

| Item | Quantity | Description |
|:-----|:--------:|:------------|
| Hikvision G40 DashCam Unit | 1 | Dual-camera main unit with integrated GPS and G-sensor |
| Windshield Mount Kit | 1 | Heavy-duty adhesive mount with adjustment bracket |
| Power Cable / Wiring Harness | 1 | Vehicle fuse box connection cable with inline fuse |
| M2M SIM Card | 1 | Pre-configured 4G LTE SIM with 50 GB data package |
| microSD Card | 1 | High-endurance microSD for continuous loop recording |
| Quick Start Card | 1 | Field reference for initial setup |
| Cable Management Kit | 1 | Clips, ties, and routing guides for clean installation |

## 1.4 Product Identification

[IMAGE: Hikvision G40 DashCam unit — front isometric view showing the road-facing lens on the front face, driver-facing IR camera on the rear, microSD card slot on the side, SIM card tray, status LED indicators on top, and the windshield mount bracket attached. Clean white background, professional product photography style with numbered callout labels pointing to each component.]

| Callout | Component | Description |
|:-------:|:----------|:------------|
| 1 | Road-Facing Camera Lens | Wide-angle HD lens for forward road recording |
| 2 | Driver-Facing IR Camera | Infrared camera for 24/7 driver monitoring |
| 3 | Status LED Indicators | Device power, recording, and connectivity status |
| 4 | microSD Card Slot | Local storage slot (up to 256 GB) |
| 5 | SIM Card Tray | M2M SIM card slot for 4G LTE connectivity |
| 6 | Power Input Port | Vehicle power connection (8–36 V DC) |
| 7 | Windshield Mount Bracket | Adjustable adhesive mounting system |
| 8 | Speaker / Microphone | In-cab audio capture and voice alert output |
| 9 | Reset Button | Factory reset and device recovery |

---

# 2. System Architecture

## 2.1 System Overview

The WakeCap DashCam System operates within a multi-tier architecture connecting in-vehicle hardware to cloud-based fleet management platforms.

[IMAGE: System architecture block diagram showing the full data flow. Left side: Vehicle with DashCam G40 (showing road camera, driver camera, GPS, G-sensor, 4G modem). Middle: 4G LTE cellular network cloud. Right side: Three connected systems — (1) HikCentral Professional Server with database icon, (2) WakeCap Observation Manager dashboard, (3) Mobile devices with HAT-Dashcam app. Arrows show bidirectional data flow. Below the vehicle: AVL tracker connected via dotted line showing integration. Color scheme: WakeCap blue (#0063A3) for system components, light gray for network cloud, orange for alert paths. Clean technical illustration style with labeled components.]

## 2.2 Data Flow

The DashCam system processes data through four stages:

**Stage 1 — Capture.** The dual cameras continuously record road and driver footage. The ADAS and DMS AI engines process video frames in real-time on the device, generating events when driver behavior anomalies or road hazards are detected. GPS, G-sensor, and speed data are synchronized with video timestamps.

**Stage 2 — Transmit.** The 4G LTE modem transmits event clips, alerts, and telemetry to the HikCentral Professional server via the ISUP 5.0 protocol. Continuous video is stored locally on the SD card. High-priority events (collisions, fatigue alerts) are uploaded immediately; routine footage is available for on-demand retrieval.

**Stage 3 — Manage.** HikCentral Professional provides the centralized command interface. Fleet managers access live video streams, review historical playback, manage device configurations, and route alerts to designated personnel. The platform supports multi-site, multi-vehicle fleet topologies.

**Stage 4 — Integrate.** DashCam alerts flow into the WakeCap Observation Manager (Phase 2), joining AVL telemetry, CCTV streams, and anti-collision alerts in a unified safety operations view. This enables correlated incident analysis across vehicle and site safety domains.

## 2.3 Communication Protocols

| Connection | Protocol | Port | Direction | Purpose |
|:-----------|:---------|:----:|:---------:|:--------|
| DashCam to HikCentral Server | ISUP 5.0 | 7660 | Bidirectional | Device registration, video upload, remote config |
| DashCam to Cellular Network | 4G LTE | — | Outbound | Data transmission via M2M SIM |
| HikCentral to Client Browser | HTTPS | 443 | Inbound | Web-based management console |
| HAT-Dashcam App to DashCam | WiFi / Cellular | — | Bidirectional | Device onboarding, APN config, platform binding |
| DashCam to AVL Tracker | Shared Infrastructure | — | Data correlation | Vehicle telemetry integration |

## 2.4 Network Requirements

::: {.important}
The HikCentral Professional server requires a **public static IP address** and **port forwarding** (Port 7660) for ISUP device connectivity. Coordinate with the site IT team for firewall approval before deployment.
:::

| Requirement | Specification |
|:------------|:-------------|
| Server Public IP | Static IP on WAN interface |
| ISUP Port | 7660 (TCP) — must be open on firewall |
| Bandwidth per Unit | 2–5 Mbps for live streaming; 500 Kbps for event upload |
| SIM Data Package | 50 GB/month per unit (recommended) |
| SIM Provider (KSA) | STC (primary); Mobily (secondary) |

---

# 3. Technical Specifications

## 3.1 Camera Specifications

### Built-In Camera (Channel 1 — Road-Facing)

| Parameter | Value | Unit |
|:----------|------:|:----:|
| Image Sensor | 1/2.7" Progressive Scan CMOS | — |
| Max Resolution | 1920 x 1080 (1080p / 2 MP) | px |
| Photo Resolution | 4 MP | — |
| Frame Rate (Main Stream) | 25 | fps |
| Focal Length | 2.1 mm (fixed) | — |
| Aperture | F2.1 | — |
| Lens Mount | M12 | — |
| Horizontal FOV | 127 | degrees |
| Vertical FOV | 73 | degrees |
| Diagonal FOV | 137 | degrees |
| Min. Illumination | 0.01 Lux (AGC ON) | Lux |
| Shutter Speed | 1/3 to 1/100,000 | s |
| WDR | Supported | — |
| SNR | 37.5 | dB |
| Video Encoding | H.265 / H.264 | — |
| Audio Encoding | G.711ulaw, G.711alaw, AAC | — |
| OSD Overlay | Date, Time, GPS coordinates, Speed | — |

### Extension Camera Inputs (Channels 2–3)

| Parameter | Value |
|:----------|:------|
| Video Input | 2-ch 720p TVI or 1-ch 1080p TVI |
| Frame Rate | 25 fps (720p default) |
| Sub-Stream | 25 fps at 480p (640 x 480) |
| Purpose | Driver-facing DMS camera, cargo/side view |

::: {.note}
The G40 supports up to 3 video channels: 1 built-in road-facing camera plus 2 extension cameras connected via TVI. The DMS (driver monitoring) camera is typically connected as Channel 2.
:::

## 3.2 Physical Specifications

| Parameter | Value | Unit |
|:----------|------:|:----:|
| Dimensions (W x D x H) | 123.0 x 85.0 x 38.9 | mm |
| Dimensions (Imperial) | 4.8 x 3.4 x 1.5 | in |
| Net Weight | 270 | g (0.6 lb) |
| Package Weight | 900 | g (2.0 lb) |
| Package Dimensions | 223 x 153 x 63 | mm |
| Enclosure Material | ABS/PC Engineering Plastic | — |
| Color | Black | — |
| Mounting | Windshield adhesive mount | — |
| IP Rating | IP4X (dust-protected, cabin-mounted) | — |

## 3.3 Electrical Specifications

| Parameter | Range 1 | Range 2 | Unit |
|:----------|--------:|--------:|:----:|
| Input Voltage (Low) | 10–16 | — | V DC |
| Input Voltage (High) | — | 20–36 | V DC |
| Max Power Consumption | — | < 12 | W |
| Power Connector | 1x 8-pin BM Male Terminal | — | — |

::: {.notice}
The DashCam supports dual voltage ranges: 10–16 V DC for 12 V vehicle systems and 20–36 V DC for 24 V vehicle systems. Built-in protection against overvoltage, undervoltage, short circuit, and reverse polarity.
:::

## 3.4 Environmental Specifications

| Parameter | Min | Max | Unit |
|:----------|----:|----:|:----:|
| Operating Temperature | -20 | +60 | C |
| Operating Humidity | 10 | 95 (non-condensing) | % RH |

## 3.5 Connectivity Specifications

| Parameter | Specification |
|:----------|:-------------|
| Cellular | 4G LTE |
| LTE Bands (FDD) | B1, B3, B5, B7, B8, B20 |
| LTE Bands (TDD) | B38, B40, B41 |
| 3G WCDMA | B1, B5, B8 |
| 2G GSM/EDGE | 900 / 1800 MHz |
| SIM Type | 1x Industrial Micro SIM (plug-in; standard SIM not supported) |
| WiFi | IEEE 802.11 b/g/n, 2.4 GHz (AP mode supported) |
| GNSS | BDS + GPS + GLONASS |
| ISUP Protocol | Version 5.0 |

## 3.6 Storage Specifications

| Parameter | Specification |
|:----------|:-------------|
| Storage Media | Dual microSD/TF card slots |
| Max Capacity per Card | 256 GB (Class 10 or above) |
| Total Max Capacity | 512 GB (2 x 256 GB) |
| Recording Mode | Continuous loop with event-locked segments |
| Overwrite | Supported (oldest footage first; event-locked clips preserved) |
| Cloud Upload | Event-based auto-upload over 4G LTE |
| Video Encoding | H.265 / H.264 |

## 3.7 Sensor Suite

| Sensor | Type | Function |
|:-------|:-----|:---------|
| G-Sensor | Six-axis (accelerometer + gyroscope) | Harsh braking, acceleration, cornering, impact, and collision detection |
| GNSS | BDS / GPS / GLONASS | Positioning, speed tracking, route recording |
| Microphone | Omnidirectional, 50–20,000 Hz | In-cab audio capture for incident evidence |
| Speaker | Built-in, max 1.5 W, >= 70 dB at 1 m | Voice alerts, adjustable volume |
| Tamper | Internal | Camera obstruction and device removal detection |

## 3.8 Interfaces

| Interface | Connector / Type | Purpose |
|:----------|:----------------|:--------|
| Power Input | 1x 8-pin BM Male Terminal | Vehicle power connection |
| Alarm Input | 2 channels | External trigger inputs |
| RS-232 | 1 port (reserved) | Serial communication |
| CAN Bus | CAN_L + CAN_H | Vehicle data integration |
| I/O #1 | 4-pin BMW Male Connector | GND + I/O |
| I/O #2 | 4-pin BMW Male Connector | Alarm button for platform upload |
| Steering Signal | 3 channels | Turn signal integration |
| Reset | Pinhole button | Factory reset and recovery |

## 3.9 Certifications

| Certification | Standard / ID | Scope |
|:-------------|:-------------|:------|
| CE | EN 55032, EN 55035 | Electromagnetic compatibility (EU) |
| CB | IEC 62368 | Electrical safety |
| FCC | Part 15 (ID: 2a3iq2032g40) | Radio frequency emissions (USA) |
| E-Mark | ECE R10 | Automotive EMC compliance |
| RCM | AS/NZS | Australia / New Zealand compliance |
| ANATEL | — | Brazil telecommunications |
| ICASA | — | South Africa telecommunications |

---

# 4. Components and Interfaces

## 4.1 Main Unit — Hikvision G40

The G40 is a compact, dual-camera unit that integrates all sensing, processing, storage, and communication functions in a single windshield-mounted device.

[IMAGE: Annotated top-down and side-view diagram of the Hikvision G40 DashCam showing all external ports and interfaces. Top view: front lens, rear IR lens. Left side: microSD slot, SIM tray, reset pinhole. Right side: power input connector. Bottom: mounting rail. Include dimension arrows. Technical line drawing style with callout labels, light gray background, black line work.]

### External Interfaces

| Interface | Connector | Purpose |
|:----------|:----------|:--------|
| Power Input | Proprietary cable | 8–36 V DC vehicle power connection |
| microSD Slot | Push-push TF card | Local video storage (up to 256 GB) |
| SIM Tray | Micro SIM (2FF) | 4G LTE cellular connectivity |
| Reset Pinhole | Recessed button | Factory reset and recovery |
| WiFi Antenna | Internal | Local configuration and firmware update |
| GPS Antenna | Internal | Satellite positioning |
| 4G LTE Antenna | Internal | Cellular data communication |

## 4.2 LED Status Indicators

| LED State | Color | Meaning |
|:----------|:-----:|:--------|
| Solid green | Green | Normal operation — recording active |
| Blinking green | Green | Connecting to network |
| Solid red | Red | Error condition — check SIM/SD card |
| Blinking red | Red | Recording paused — storage full or missing |
| Alternating red/green | — | Firmware update in progress |
| Off | — | Device powered off or no power |

::: {.caution}
**DO NOT INTERRUPT POWER** during firmware updates (alternating red/green LED). Interrupting a firmware update may render the device inoperable and require factory service.
:::

## 4.3 Wiring Harness

The power cable connects the DashCam to the vehicle's fuse box. The harness includes:

| Wire | Color | Connection | Purpose |
|:-----|:-----:|:-----------|:--------|
| Constant Power | Red | Vehicle battery (always-on fuse) | Continuous power for parking mode |
| Ignition | Yellow | Accessory fuse (ACC) | Ignition-triggered recording activation |
| Ground | Black | Vehicle chassis ground | Common ground reference |
| Fuse | Inline | Power line | Overcurrent protection |

---

# 5. Features and Capabilities

## 5.1 Advanced Driver Assistance System (ADAS)

The DashCam's road-facing camera runs AI models that analyze the forward scene in real-time, generating alerts when hazardous conditions are detected.

| Feature | Trigger Condition | Alert Type |
|:--------|:------------------|:-----------|
| Forward Collision Warning (FCW) | Closing distance to vehicle ahead falls below safe threshold at speed > 30 km/h | Audible alarm + event upload |
| Lane Departure Warning (LDW) | Vehicle drifts across lane markings without turn signal | Audible alarm + event upload |
| Solid Lane Departure Warning (SLW) | Vehicle crosses solid lane boundary | Audible alarm + event upload |
| Pedestrian Collision Warning (PCW) | Pedestrian detected in collision path | Audible alarm + event upload |
| Headway Monitoring Warning (HMW) | Following distance drops below safe time-to-collision threshold | Audible alert + event upload |
| Traffic Sign Recognition (TSR) | Speed limit and road signs detected by camera | Event log + HUD overlay |
| Traffic Light Detection (TLD) | Red/green light status detected at intersections | Audible alert + event log |
| Forward Car Leaving (FCL) | Vehicle ahead starts moving when stopped (e.g., traffic light turns green) | Audible alert |

::: {.note}
ADAS features activate above 30 km/h and sensitivity thresholds are configurable through HikCentral Professional (see Section 6.1). Features should be calibrated for each vehicle type during commissioning. For camera specifications, see Section 3.1.
:::

## 5.2 Driver Monitoring System (DMS)

The driver-facing IR camera monitors the driver's face and posture continuously, detecting unsafe behaviors even in complete darkness.

| Feature | Detection Method | Alert Type |
|:--------|:----------------|:-----------|
| Fatigue — Eye Closure | Eye closure frequency exceeds threshold | Voice warning + audible alarm + event upload |
| Fatigue — Yawning | Repeated or prolonged yawning detected | Voice warning + event upload |
| Distraction Detection | Gaze direction away from road for extended period | Voice warning + event upload |
| Phone Call Detection | Hand raised to ear or phone held near face | Voice warning + event upload |
| Smoking Detection | Cigarette or smoke detected near face | Voice warning + event upload |
| Seatbelt Compliance | Shoulder belt not detected across driver's chest | Audible alert + event upload |
| IR Blocking Sunglasses | Infrared-blocking eyewear detected (defeats IR monitoring) | Event upload + alert |
| Camera Tampering | Video occlusion or camera obstruction detected | Event upload + alert |
| Driver Authentication | Facial recognition against enrolled driver database | Event log |

::: {.tip}
Enroll all authorized drivers in the facial recognition system during commissioning. This enables automatic driver identification in trip reports and links behavior alerts to specific individuals. See Section 7.4 for alert severity classification.
:::

## 5.3 Recording Modes

| Mode | Trigger | Storage | Upload |
|:-----|:--------|:--------|:-------|
| Continuous Recording | Ignition ON | SD card (loop overwrite) | On-demand retrieval |
| Event Recording | ADAS/DMS alert or G-sensor trigger | SD card (locked, non-overwrite) | Automatic over 4G |
| Pre-Event Capture | 15 seconds before event trigger | SD card (locked) | Included with event clip |
| Parking Mode | Ignition OFF (constant power connected) | SD card | On-demand retrieval |
| Manual Recording | Driver presses event button (if configured) | SD card (locked) | On-demand retrieval |

## 5.4 Live Video Streaming

Fleet managers access live video feeds from any connected DashCam through HikCentral Professional:

- **Live View** — Real-time road and driver camera streams
- **Multi-Camera Grid** — View multiple vehicles simultaneously on a single screen
- **PTZ-Style Control** — Switch between road and driver cameras per vehicle
- **Bandwidth Adaptation** — Stream quality adjusts automatically based on cellular signal strength
- **Access Control** — User roles and permissions control who can view live feeds

## 5.5 Event Management

When the DashCam detects an event (AI alert, collision, harsh maneuver), the system:

1. Records and locks a video clip with 15-second pre-event context
2. Tags the clip with GPS location, timestamp, speed, and event classification
3. Uploads the clip to HikCentral Professional over 4G LTE
4. Generates an alert in the fleet management dashboard
5. Routes the alert to designated personnel (configurable notification rules)

Events include G-sensor triggers (harsh braking, acceleration, impact), ADAS alerts, DMS alerts, and speed violations.

## 5.6 Driver Coaching and Safety Scoring

The HikCentral Professional platform aggregates DashCam events to generate:

- **Driver Safety Scores** — Composite scores based on ADAS and DMS event frequency, severity, and driving time
- **Trip Reports** — Per-trip summaries with route map, speed profile, and event markers
- **Trend Analytics** — Weekly and monthly behavior trend reports for fleet-level safety improvement tracking
- **Coaching Workflows** — Flag high-risk drivers for targeted coaching based on event patterns

---

# 6. Platform Integration

## 6.1 HikCentral Professional

HikCentral Professional is the primary management platform for the WakeCap DashCam System. It provides server-based fleet monitoring with enterprise-grade features.

| Capability | Description |
|:-----------|:------------|
| Device Management | Register, configure, and monitor all DashCam units from a single interface |
| Live View | Real-time video from road and driver cameras |
| Playback | Historical video retrieval with timeline scrubbing and event filtering |
| Alert Routing | Configurable notification rules for event types and severity levels |
| User Management | Role-based access control for fleet managers, supervisors, and safety officers |
| Multi-Site Support | Manage DashCams across multiple project sites from one server |
| Reporting | Export event reports, trip summaries, and driver performance data |

### Server Requirements

| Requirement | Specification |
|:------------|:-------------|
| Platform Version | HikCentral Professional V2.6.3 or later |
| Operating System | Windows Server 2016/2019/2022 |
| Public Static IP | Required for ISUP device connectivity |
| ISUP Port | 7660 (TCP) |
| Storage | Server-dependent; scales with retention policy and fleet size |

[IMAGE: HikCentral Professional dashboard screenshot mockup showing a fleet management view. Left panel: vehicle list with status indicators (online/offline). Center: live video feed from selected vehicle showing road-facing camera. Right panel: latest alert feed showing DMS and ADAS events with timestamps. Bottom bar: map view with vehicle location markers. Professional UI mockup style, dark theme with blue accent colors matching Hikvision branding.]

## 6.2 WakeCap Observation Manager Integration

The DashCam System integrates with the WakeCap Observation Manager in a phased approach:

**Phase 1 (Current):** DashCam alerts are delivered to clients through HikCentral Professional as the primary interface.

**Phase 2 (Planned):** DashCam alerts will be routed to the WakeCap Observation Manager, joining AVL telemetry, CCTV feeds, and anti-collision alerts in a unified safety operations view.

::: {.note}
Phase 2 integration enables correlated incident analysis. For example, a DMS fatigue alert (see Section 5.2) combined with an AVL harsh-braking event (see Section 6.3) and a nearby anti-collision proximity alarm creates a comprehensive incident narrative without manual cross-referencing.
:::

## 6.3 AVL System Integration

The DashCam complements WakeCap's AVL (Automatic Vehicle Location) system:

| AVL Feature | DashCam Enhancement |
|:------------|:-------------------|
| Vehicle GPS Tracking | Video evidence of driver behavior at tracked locations |
| Seatbelt Alert | Visual confirmation via DMS camera |
| Harsh Braking/Acceleration | Synchronized video clip for context |
| Speeding Alert | Forward camera footage showing road conditions |
| Geofence Violations | Video evidence of vehicle at restricted locations |

## 6.4 Unified Video Management System (VMS) Vision

The WakeCap DashCam is part of a broader strategy to unify all video streams on construction and industrial sites:

- **CCTV cameras** — Fixed site surveillance
- **DashCam system** — Mobile vehicle monitoring
- **Anti-collision cameras** — Equipment proximity alerting

All video streams will be integrated into a unified VMS experience, enabling site safety managers to monitor fixed and mobile camera assets from a single platform.

---

# 7. Operation

## 7.1 Normal Operation

Under normal operating conditions, the DashCam system operates autonomously once commissioned:

1. **Power-On.** The DashCam activates automatically when the vehicle ignition is turned on. The status LED turns solid green when recording begins.

2. **Continuous Recording.** The road-facing and driver-facing cameras record continuously to the SD card. Older footage is overwritten in a loop when storage is full (event-locked clips are preserved).

3. **AI Monitoring.** The ADAS and DMS engines process video frames in real-time. When an unsafe condition is detected, the system generates an audible/voice alert to the driver and uploads the event clip to HikCentral.

4. **Data Transmission.** GPS position, speed, and telemetry data are transmitted periodically to HikCentral. Event clips are uploaded as they occur.

5. **Power-Off.** When the ignition is turned off, the DashCam completes its current recording segment and enters standby mode. If constant power is connected, parking mode activates.

## 7.2 HAT-Dashcam Mobile Application

The HAT-Dashcam app provides field configuration capabilities:

| Function | Description |
|:---------|:------------|
| Device Onboarding | Scan and register new DashCam units to the fleet |
| APN Configuration | Set cellular network access point parameters |
| Platform Binding | Link the device to the HikCentral Professional server |
| WiFi Setup | Connect to the DashCam's local WiFi for direct configuration |
| Firmware Update | Push firmware updates to connected devices |
| Device Diagnostics | Check camera status, SIM signal, GPS lock, and storage health |

## 7.3 Remote Monitoring

Fleet managers monitor the DashCam fleet through the HikCentral Professional web interface:

- **Dashboard** — Fleet health overview: online/offline counts, active alerts, event trends
- **Live View** — Select any vehicle for real-time road and driver camera feeds
- **Playback** — Search and review historical footage by vehicle, time range, or event type
- **Alerts** — Real-time alert feed with severity classification and acknowledgment workflow
- **Reports** — Generate driver safety scorecards, trip summaries, and fleet analytics

## 7.4 Alert Management

Alerts are classified by severity and routed to designated personnel:

| Severity | Alert Types | Response |
|:---------|:-----------|:---------|
| Critical | Collision detected, driver unconscious | Immediate notification to fleet manager and safety officer |
| High | Fatigue warning, forward collision warning, pedestrian detected | Real-time notification with video clip |
| Medium | Phone use, smoking, seatbelt non-compliance, lane departure | Dashboard alert with video clip |
| Low | Tailgating, minor harsh events | Event logged for trend analysis |

---

# 8. Safety and Compliance

## 8.1 Vehicle Safety

::: {.warning}
**DRIVER DISTRACTION HAZARD** — Do not operate, configure, or adjust the DashCam while the vehicle is in motion. All configuration must be performed with the vehicle stationary and engine off. The driver must maintain full attention on the road at all times.
:::

::: {.caution}
**WINDSHIELD OBSTRUCTION** — Position the DashCam so it does not obstruct the driver's field of vision. Follow local regulations for windshield-mounted device placement. In Saudi Arabia, the device must not exceed the area covered by the sun visor.
:::

- The DashCam is a driver assistance tool, not a replacement for attentive driving
- ADAS alerts are advisory — the driver must always make independent safety decisions
- Voice alerts are intended to remind, not to command — human judgment takes priority

## 8.2 Electrical Safety

::: {.notice}
All electrical connections to the vehicle must be performed by qualified technicians. Incorrect wiring may damage the DashCam or vehicle electrical system.
:::

- Use only the supplied wiring harness with the correct fuse rating
- Disconnect the vehicle battery before any wiring modifications
- Ensure proper grounding to the vehicle chassis
- Do not splice into safety-critical vehicle circuits (airbag, ABS, engine management)

## 8.3 Data Privacy and Compliance

The DashCam system records video and audio inside and outside the vehicle. Operators must comply with local data privacy regulations:

- Inform all vehicle operators that monitoring is active
- Display clear signage in the vehicle indicating recording is in progress
- Control access to recorded footage through HikCentral user permissions
- Define and enforce data retention policies appropriate to local regulations
- Driver facial recognition data must be handled in accordance with applicable privacy laws

## 8.4 Environmental Compliance

| Certification | Compliance |
|:-------------|:-----------|
| CE | Electromagnetic compatibility — EN 55032, EN 55035 |
| FCC Part 15 | Radio frequency emissions compliance |
| E-Mark (ECE R10) | Automotive electromagnetic compatibility |
| RoHS | Free from restricted hazardous substances |

---

# Appendix A: Glossary

| Term | Definition |
|:-----|:-----------|
| ADAS | Advanced Driver Assistance System — AI features that assist the driver in avoiding hazards |
| APN | Access Point Name — cellular network configuration for data connectivity |
| AVL | Automatic Vehicle Location — GPS-based vehicle tracking system |
| DMS | Driver Monitoring System — AI features that monitor driver behavior and alertness |
| FCW | Forward Collision Warning — alerts when closing distance to vehicle ahead is unsafe |
| GNSS | Global Navigation Satellite System — satellite positioning (GPS, GLONASS) |
| HMW | Headway Monitoring & Warning — time-to-collision measurement and alerting |
| ISUP | Intelligent Security Unified Protocol — Hikvision's device-to-platform protocol |
| IVMS | In-Vehicle Monitoring System — general term for vehicle monitoring solutions |
| LDW | Lane Departure Warning — alerts when vehicle drifts across lane markings |
| LTE | Long-Term Evolution — 4G cellular data standard |
| M2M | Machine-to-Machine — SIM card type designed for IoT/device communication |
| MDVR | Mobile Digital Video Recorder — multi-channel vehicle recording platform |
| PCW | Pedestrian Collision Warning — alerts when pedestrian is detected in collision path |
| VMS | Video Management System — software platform for managing video streams |
| WDR | Wide Dynamic Range — camera technology for high-contrast lighting conditions |

# Appendix B: Model Quick Reference

| Item | Model / Part Number | Specification |
|:-----|:-------------------|:-------------|
| DashCam Unit | Hikvision AE-DI2032-G40 | 3-ch, 1080p, 4G LTE, GPS, AI-enabled |
| G40 V2 (Upgrade) | AE-DI2032-G40/V2 | 3-ch, 1080p, 512 GB SD, enhanced AI |
| G40 PRO (Premium) | AE-DI5052-G40 PRO | 5-ch, 1620p front, 1080p rear, 1 TB SD |
| Management Platform | HikCentral Professional | V2.6.3 or later |
| Communication Protocol | ISUP | Version 5.0 |
| Mobile Application | HAT-Dashcam | Android / iOS |
| SIM Card | Industrial Micro SIM (plug-in) | 4G LTE, 50 GB data package (M2M) |
| SD Card | Dual microSD/TF (Class 10+) | Up to 256 GB each (512 GB total) |

# Appendix C: Version History

| Version | Date | Author | Changes |
|:--------|:-----|:-------|:--------|
| 1.0 | 2026-04-12 | WakeCap Technologies | Initial release |

# Appendix D: Contact Information

| Contact | Details |
|:--------|:--------|
| WakeCap Technical Support | support@wakecap.com |
| Documentation Contact | zishan.shahzad@wakecap.com |
| HikCentral Support | Hikvision regional distributor |
| Website | www.wakecap.com |

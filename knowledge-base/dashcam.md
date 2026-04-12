# WakeCap DashCam System — Knowledge Base

## Product Identity

- **Product Name:** WakeCap DashCam System
- **Base Hardware:** Hikvision G40 Industry DashCam
- **Product Category:** In-Vehicle Monitoring System (IVMS)
- **Product Code:** DC
- **Manufacturer:** Hikvision (OEM hardware); WakeCap Technologies (deployment, integration, support)
- **Mobile App:** HAT-Dashcam (Android/iOS)
- **Management Platform:** HikCentral Professional (server-based VMS)
- **Protocol:** ISUP 5.0 (device-to-platform communication)

## Key Features

- Dual-channel recording: road-facing + driver-facing cameras
- SIM-based 4G LTE connectivity for remote access and live data transmission
- SD card storage for local recording, redundancy, and offline evidence retention
- HikCentral Professional integration via ISUP 5.0 for centralized fleet monitoring, live view, playback, and device management
- Mobile app configuration for device onboarding, APN setup, and platform binding
- Driver Monitoring System (DMS) with live driver behavior alerts
- Advanced Driver Assistance System (ADAS) capabilities
- Cloud communication for remote monitoring and data access
- Integration with WakeCap Observation Manager (Phase 2)
- Integration with AVL vehicle tracking system

## Camera Specifications

### Road-Facing Camera (Primary)
- Resolution: 1080p Full HD (1920x1080) standard; 1440p (2560x1440) capable
- Frame rate: 25-30 fps
- Field of view: 140 degrees (typical)
- Sensor: Sony STARVIS series with Wide Dynamic Range (WDR)
- Night vision: Front IR illumination
- Video encoding: H.264 (standard), H.265 (optional)

### Driver-Facing Camera (DMS)
- Resolution: 720p-1080p
- Frame rate: 15-30 fps
- Field of view: 150 degrees (typical)
- Night vision: IR-CUT infrared with 940nm IR LEDs for 24/7 monitoring
- Purpose: Driver behavior monitoring and facial recognition

## AI / ADAS Features

### Advanced Driver Assistance System (ADAS)
- Forward Collision Warning (FCW)
- Lane Departure Warning (LDW)
- Pedestrian Collision Warning (PCW)
- Headway Monitoring & Warning (HMW)
- Close Following / Tailgating detection

### Driver Monitoring System (DMS)
- Fatigue detection (eye closure, yawning, head drop)
- Distraction detection (phone usage, smoking, looking away)
- Seatbelt compliance monitoring
- Driver identification via facial recognition
- Real-time alert generation

## Connectivity

- **Cellular:** 4G LTE with M2M SIM card (50 GB data package per device typical)
- **SIM Provider (KSA):** STC (Saudi Telecom Company); Mobily (secondary)
- **WiFi:** 802.11 b/g/n for local configuration and firmware updates
- **GNSS:** GPS + GLONASS for positioning and tracking
- **APN:** Required configuration for cellular data connectivity
- **ISUP Protocol:** Version 5.0 for device-to-server communication

## Storage

- **Local:** microSD/TF card (up to 256 GB)
- **Recording Modes:** Continuous loop recording with event-locked segments
- **Pre-event Buffer:** 15-second pre-event recording
- **Cloud:** Event-based auto-upload over 4G LTE; retention per HikCentral server storage

## Physical Specifications

- **Form Factor:** Compact dual-camera windshield-mount unit
- **Dimensions:** [TBD — from Hikvision G40 datasheet]
- **Weight:** [TBD — from Hikvision G40 datasheet]
- **Mounting:** Windshield mount with heavy-duty adhesive tape
- **Color:** Black
- **Material:** ABS/PC engineering plastic

## Electrical Specifications

- **Input Voltage:** DC 10-16V or DC 20-36V (dual range; 12V and 24V vehicle compatible)
- **Max Power Consumption:** < 12 W
- **Power Connector:** 1x 8-pin BM Male Terminal
- **Protection:** Overvoltage, undervoltage, short circuit, reverse polarity
- **Power Failure:** Built-in supercapacitor for emergency recording after power loss

## Environmental Specifications

- **Operating Temperature:** -20 C to +60 C (per Hikvision AE-DI2032-G40 datasheet)
- **Operating Humidity:** 10-95% RH (non-condensing)
- **IP Rating:** IP4X (dust-protected, cabin-mounted)
- **Vibration:** Automotive-grade anti-vibration design

## Sensors

- Six-axis G-sensor (accelerometer + gyroscope) for harsh event detection
- GNSS: BDS + GPS + GLONASS
- Omnidirectional microphone (50-20,000 Hz) for in-cab audio
- Speaker: built-in, max 1.5 W, >= 70 dB at 1 m, adjustable volume
- Tamper detection (camera obstruction)

## Platform Integration

### HikCentral Professional
- Server-based video management platform
- Centralized fleet monitoring across all dashcam units
- Live view, playback, and device management
- Public static IP and port forwarding required
- Domain setup for WAN access
- Reference version: HikCentral Professional V2.6.3

### WakeCap Observation Manager
- Phase 1: DashCam alerts delivered to client through HikCentral Professional
- Phase 2: Integration with WakeCap Observation Manager for unified alerting
- AVL new alerts (seatbelt, harsh acceleration, harsh braking) already integrated

### Unified VMS Vision
- Streams from CCTV, dashcam, and anti-collision systems to be integrated
- Expanding video streams for unified video management system experience
- Gateway/hub connectivity for camera-to-internet bridging with storage

### AVL Integration
- DashCam system closely tied to AVL (vehicle tracking)
- Shared vehicle monitoring infrastructure
- Combined driver behavior and vehicle telemetry analytics

## Network Requirements

- Public static IP for HikCentral server remote access
- Port forwarding configuration (Port 7660 for ISUP)
- IP address example: 82.147.196.115 (ISUP server)
- Domain setup for WAN access
- IT coordination for firewall port approval (client-side)

## Deployment Context

### Active Deployments
- **ARAMCO Master Gas System** — L&T Phase 3 Package 8 (active, 50 units with AVL)
- **ARAMCO Jafurah** — L&T Package 01 (190 dashcams deploying)
- **ARAMCO Fadhili Gas Increment Plan** — Samsung (200 dashcams approved)

### Target Industries
- Mega construction projects
- Oil & gas facilities
- Heavy industrial sites
- Fleet management for construction vehicles and buses

### Procurement Requirements per Unit
- 1x Hikvision G40 DashCam unit
- 1x M2M SIM card (50 GB data package)
- 1x microSD card
- Wiring harness for vehicle fuse box connection
- Cable management materials

## Safety Information

### Vehicle Safety
- Do not operate or configure the dashcam while driving
- Professional installation recommended for vehicle wiring
- Ensure dashcam does not obstruct driver's field of vision
- Follow local regulations for in-vehicle recording devices

### Electrical Safety
- Use only the specified input voltage range (8-36V DC)
- Disconnect vehicle battery before wiring installation
- Use appropriate fuse protection on power connections
- Ensure proper grounding to vehicle chassis

### Data Privacy
- Driver monitoring captures facial images — comply with local privacy laws
- Inform all vehicle operators of monitoring system presence
- Data stored locally and transmitted to authorized platforms only
- Access controlled through HikCentral user management

## Certifications

- CE (European Conformity)
- FCC Part 15 (USA)
- E-Mark (Automotive EMC, ECE R10)
- RoHS (Restriction of Hazardous Substances)
- [TBD — full Hikvision G40 certification list]

## Key Personnel (WakeCap)

- **Zishan Shahzad** — Documentation, HikCentral setup, technical support
- **Ayman Mahmoud** — Physical installations, field deployment
- **Tarek Fayad** — Project management, squad coordination
- **Zuhair Aslam** — Hikvision vendor coordination, procurement

## Alternative Products Evaluated

| Product | Manufacturer | Status |
|---------|-------------|--------|
| Hikvision G40 | Hikvision | **Selected — In deployment** |
| JC450-Pro | [TBD] | Evaluated, not selected |
| Hero-ME40-02 (V3) | [TBD] | Evaluated, not selected |

## Glossary

- **ADAS** — Advanced Driver Assistance System
- **APN** — Access Point Name (cellular data configuration)
- **AVL** — Automatic Vehicle Location
- **DMS** — Driver Monitoring System
- **FCW** — Forward Collision Warning
- **HMW** — Headway Monitoring & Warning
- **ISUP** — Intelligent Security Unified Protocol
- **IVMS** — In-Vehicle Monitoring System
- **LDW** — Lane Departure Warning
- **M2M** — Machine-to-Machine (SIM type for IoT devices)
- **MDVR** — Mobile Digital Video Recorder
- **PCW** — Pedestrian Collision Warning
- **VMS** — Video Management System
- **WDR** — Wide Dynamic Range

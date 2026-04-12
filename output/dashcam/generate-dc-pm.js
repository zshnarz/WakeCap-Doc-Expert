/**
 * WakeCap DashCam System — Product Manual Generator
 *
 * Generates WC-DC-PM-v1.0.docx from structured content using
 * the WakeCap docx-generator base helpers.
 *
 * Version A (Marketing/Client-facing style)
 */

const path = require('path');
const fs = require('fs');

const {
  // Constants
  COLORS,
  FONT_SIZES,
  SPACING,
  PAGE_A4,
  // Content helpers
  createHeading,
  createBodyText,
  createPlaceholder,
  createBullet,
  createNumberedStep,
  createSpacer,
  // Complex components
  createSpecTable,
  createCalloutBox,
  createSafetyPanel,
  createImagePlaceholder,
  // Page structure
  createHeader,
  createFooter,
  createCoverPage,
  // Document builders
  buildDocument,
  getDocumentStyles,
  // Re-exported docx classes
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  PageBreak,
  PageNumber,
  AlignmentType,
  HeadingLevel,
  BorderStyle,
  WidthType,
  ShadingType,
  VerticalAlign,
  TableOfContents,
  ImageRun
} = require('../../old_generators/docx-generator');

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const VERSION = 'A';
const DOC_ID = 'WC-DC-PM-v1.0';
const REVISION_DATE = '2026-04-12';
const PRODUCT_NAME = 'WakeCap DashCam System';
const DOC_TYPE = 'Product Manual';
const SUBTITLE = 'Intelligent In-Vehicle Monitoring for Construction and Industrial Fleets';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Page break paragraph */
function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

/** Shorthand for Version A body text */
function body(text) {
  return createBodyText(text, VERSION);
}

/** Shorthand for Version A heading */
function h1(text) { return createHeading(text, 1, VERSION); }
function h2(text) { return createHeading(text, 2, VERSION); }
function h3(text) { return createHeading(text, 3, VERSION); }

/** Shorthand for Version A bullet */
function bullet(text, level) { return createBullet(text, level || 0, VERSION); }

/** Shorthand for numbered step */
function step(n, text) { return createNumberedStep(n, text, VERSION); }

/** Shorthand for spec table */
function specTable(headers, rows, accent) {
  return createSpecTable(headers, rows, VERSION, accent);
}

/** Shorthand for safety panel */
function safety(level, msg) { return createSafetyPanel(level, msg, VERSION); }

/** Shorthand for callout */
function callout(type, msg) { return createCalloutBox(type, msg, VERSION); }

/** Shorthand for image placeholder */
function img(desc) { return createImagePlaceholder(desc, VERSION); }

/** Bold-lead paragraph: "**Lead** — rest of text" */
function boldLead(lead, rest) {
  const sizes = FONT_SIZES.versionA;
  const spacing = SPACING.versionA;
  return new Paragraph({
    spacing: { after: spacing.bodyAfter },
    children: [
      new TextRun({ text: lead, bold: true, size: sizes.body, font: 'Source Sans Pro', color: COLORS.charcoal }),
      new TextRun({ text: ` \u2014 ${rest}`, size: sizes.body, font: 'Source Sans Pro', color: COLORS.charcoal })
    ]
  });
}

/** Paragraph with bold prefix and normal continuation */
function boldPrefix(prefix, rest) {
  const sizes = FONT_SIZES.versionA;
  const spacing = SPACING.versionA;
  return new Paragraph({
    spacing: { after: spacing.bodyAfter },
    children: [
      new TextRun({ text: prefix, bold: true, size: sizes.body, font: 'Source Sans Pro', color: COLORS.charcoal }),
      new TextRun({ text: rest, size: sizes.body, font: 'Source Sans Pro', color: COLORS.charcoal })
    ]
  });
}

// ---------------------------------------------------------------------------
// Build Content
// ---------------------------------------------------------------------------

function buildContent() {
  const c = [];

  // =======================================================================
  // Hero image + title block
  // =======================================================================
  c.push(img('WakeCap DashCam System hero shot \u2014 Hikvision AE-DI2032-G40 dual-camera DashCam unit mounted on a vehicle windshield with a construction site visible through the glass, driver-facing IR camera visible on rear, status LEDs illuminated, professional product photography'));

  c.push(createSpacer(100));

  c.push(specTable(
    ['', ''],
    [
      ['Model', 'Hikvision AE-DI2032-G40'],
      ['Document', 'WC-DC-PM-v1.0'],
      ['Revision', '1.0'],
      ['Date', '2026-04-12']
    ]
  ));

  c.push(pageBreak());

  // =======================================================================
  // 1. Product Overview
  // =======================================================================
  c.push(h1('1. Product Overview'));

  c.push(h2('1.1 Description'));
  c.push(body('The WakeCap DashCam System is an intelligent in-vehicle monitoring solution purpose-built for construction and industrial fleet environments. Built on the Hikvision G40 Industry DashCam platform, the system combines dual-channel HD video recording with advanced AI-driven driver monitoring and assistance capabilities.'));
  c.push(body('The DashCam System integrates seamlessly with WakeCap\u2019s broader site safety ecosystem, providing centralized fleet monitoring through HikCentral Professional and planned integration with the WakeCap Observation Manager. By connecting driver behavior analytics with vehicle telemetry from the AVL (Automatic Vehicle Location) system, the DashCam delivers a unified safety intelligence layer for vehicle operations on mega construction and oil & gas sites.'));
  c.push(body('Designed for the harsh operating conditions of Middle Eastern construction environments, the system operates reliably across a wide temperature range and connects via 4G LTE cellular networks for real-time data transmission, live video streaming, and remote fleet management.'));

  c.push(h2('1.2 Key Features'));
  c.push(boldLead('Dual-Channel HD Recording', 'Simultaneous road-facing and driver-facing cameras capture comprehensive in-vehicle and forward-road footage'));
  c.push(boldLead('AI Driver Monitoring (DMS)', 'Real-time detection of fatigue, distraction, phone use, smoking, and seatbelt non-compliance'));
  c.push(boldLead('Advanced Driver Assistance (ADAS)', 'Forward collision warning, lane departure warning, pedestrian detection, and headway monitoring'));
  c.push(boldLead('4G LTE Connectivity', 'SIM-based cellular connection for live streaming, remote access, and cloud communication'));
  c.push(boldLead('HikCentral Professional Integration', 'Centralized fleet monitoring with live view, playback, device management, and alert routing via ISUP 5.0'));
  c.push(boldLead('Local + Cloud Storage', 'SD card recording for offline redundancy with event-based cloud upload for remote evidence access'));
  c.push(boldLead('Mobile App Configuration', 'Device onboarding, APN setup, and platform binding through the HAT-Dashcam mobile application'));
  c.push(boldLead('WakeCap Ecosystem Integration', 'Connects with AVL tracking, Observation Manager, and the unified Video Management System (VMS)'));

  c.push(h2('1.3 Package Contents'));
  c.push(specTable(
    ['Item', 'Quantity', 'Description'],
    [
      ['Hikvision G40 DashCam Unit', '1', 'Dual-camera main unit with integrated GPS and G-sensor'],
      ['Windshield Mount Kit', '1', 'Heavy-duty adhesive mount with adjustment bracket'],
      ['Power Cable / Wiring Harness', '1', 'Vehicle fuse box connection cable with inline fuse'],
      ['M2M SIM Card', '1', 'Pre-configured 4G LTE SIM with 50 GB data package'],
      ['microSD Card', '1', 'High-endurance microSD for continuous loop recording'],
      ['Quick Start Card', '1', 'Field reference for initial setup'],
      ['Cable Management Kit', '1', 'Clips, ties, and routing guides for clean installation']
    ]
  ));

  c.push(h2('1.4 Product Identification'));
  c.push(img('Hikvision G40 DashCam unit \u2014 front isometric view showing the road-facing lens on the front face, driver-facing IR camera on the rear, microSD card slot on the side, SIM card tray, status LED indicators on top, and the windshield mount bracket attached. Clean white background, professional product photography style with numbered callout labels pointing to each component.'));

  c.push(specTable(
    ['Callout', 'Component', 'Description'],
    [
      ['1', 'Road-Facing Camera Lens', 'Wide-angle HD lens for forward road recording'],
      ['2', 'Driver-Facing IR Camera', 'Infrared camera for 24/7 driver monitoring'],
      ['3', 'Status LED Indicators', 'Device power, recording, and connectivity status'],
      ['4', 'microSD Card Slot', 'Local storage slot (up to 256 GB)'],
      ['5', 'SIM Card Tray', 'M2M SIM card slot for 4G LTE connectivity'],
      ['6', 'Power Input Port', 'Vehicle power connection (8\u201336 V DC)'],
      ['7', 'Windshield Mount Bracket', 'Adjustable adhesive mounting system'],
      ['8', 'Speaker / Microphone', 'In-cab audio capture and voice alert output'],
      ['9', 'Reset Button', 'Factory reset and device recovery']
    ]
  ));

  c.push(pageBreak());

  // =======================================================================
  // 2. System Architecture
  // =======================================================================
  c.push(h1('2. System Architecture'));

  c.push(h2('2.1 System Overview'));
  c.push(body('The WakeCap DashCam System operates within a multi-tier architecture connecting in-vehicle hardware to cloud-based fleet management platforms.'));
  c.push(img('System architecture block diagram showing the full data flow. Left side: Vehicle with DashCam G40 (showing road camera, driver camera, GPS, G-sensor, 4G modem). Middle: 4G LTE cellular network cloud. Right side: Three connected systems \u2014 (1) HikCentral Professional Server with database icon, (2) WakeCap Observation Manager dashboard, (3) Mobile devices with HAT-Dashcam app. Arrows show bidirectional data flow. Below the vehicle: AVL tracker connected via dotted line showing integration.'));

  c.push(h2('2.2 Data Flow'));
  c.push(body('The DashCam system processes data through four stages:'));

  c.push(boldPrefix('Stage 1 \u2014 Capture. ', 'The dual cameras continuously record road and driver footage. The ADAS and DMS AI engines process video frames in real-time on the device, generating events when driver behavior anomalies or road hazards are detected. GPS, G-sensor, and speed data are synchronized with video timestamps.'));
  c.push(boldPrefix('Stage 2 \u2014 Transmit. ', 'The 4G LTE modem transmits event clips, alerts, and telemetry to the HikCentral Professional server via the ISUP 5.0 protocol. Continuous video is stored locally on the SD card. High-priority events (collisions, fatigue alerts) are uploaded immediately; routine footage is available for on-demand retrieval.'));
  c.push(boldPrefix('Stage 3 \u2014 Manage. ', 'HikCentral Professional provides the centralized command interface. Fleet managers access live video streams, review historical playback, manage device configurations, and route alerts to designated personnel. The platform supports multi-site, multi-vehicle fleet topologies.'));
  c.push(boldPrefix('Stage 4 \u2014 Integrate. ', 'DashCam alerts flow into the WakeCap Observation Manager (Phase 2), joining AVL telemetry, CCTV streams, and anti-collision alerts in a unified safety operations view. This enables correlated incident analysis across vehicle and site safety domains.'));

  c.push(h2('2.3 Communication Protocols'));
  c.push(specTable(
    ['Connection', 'Protocol', 'Port', 'Direction', 'Purpose'],
    [
      ['DashCam to HikCentral Server', 'ISUP 5.0', '7660', 'Bidirectional', 'Device registration, video upload, remote config'],
      ['DashCam to Cellular Network', '4G LTE', '\u2014', 'Outbound', 'Data transmission via M2M SIM'],
      ['HikCentral to Client Browser', 'HTTPS', '443', 'Inbound', 'Web-based management console'],
      ['HAT-Dashcam App to DashCam', 'WiFi / Cellular', '\u2014', 'Bidirectional', 'Device onboarding, APN config, platform binding'],
      ['DashCam to AVL Tracker', 'Shared Infrastructure', '\u2014', 'Data correlation', 'Vehicle telemetry integration']
    ]
  ));

  c.push(h2('2.4 Network Requirements'));
  c.push(callout('important', 'The HikCentral Professional server requires a public static IP address and port forwarding (Port 7660) for ISUP device connectivity. Coordinate with the site IT team for firewall approval before deployment.'));

  c.push(specTable(
    ['Requirement', 'Specification'],
    [
      ['Server Public IP', 'Static IP on WAN interface'],
      ['ISUP Port', '7660 (TCP) \u2014 must be open on firewall'],
      ['Bandwidth per Unit', '2\u20135 Mbps for live streaming; 500 Kbps for event upload'],
      ['SIM Data Package', '50 GB/month per unit (recommended)'],
      ['SIM Provider (KSA)', 'STC (primary); Mobily (secondary)']
    ]
  ));

  c.push(pageBreak());

  // =======================================================================
  // 3. Technical Specifications
  // =======================================================================
  c.push(h1('3. Technical Specifications'));

  // 3.1 Camera Specifications
  c.push(h2('3.1 Camera Specifications'));

  c.push(h3('Built-In Camera (Channel 1 \u2014 Road-Facing)'));
  c.push(specTable(
    ['Parameter', 'Value', 'Unit'],
    [
      ['Image Sensor', '1/2.7" Progressive Scan CMOS', '\u2014'],
      ['Max Resolution', '1920 x 1080 (1080p / 2 MP)', 'px'],
      ['Photo Resolution', '4 MP', '\u2014'],
      ['Frame Rate (Main Stream)', '25', 'fps'],
      ['Focal Length', '2.1 mm (fixed)', '\u2014'],
      ['Aperture', 'F2.1', '\u2014'],
      ['Lens Mount', 'M12', '\u2014'],
      ['Horizontal FOV', '127', 'degrees'],
      ['Vertical FOV', '73', 'degrees'],
      ['Diagonal FOV', '137', 'degrees'],
      ['Min. Illumination', '0.01 Lux (AGC ON)', 'Lux'],
      ['Shutter Speed', '1/3 to 1/100,000', 's'],
      ['WDR', 'Supported', '\u2014'],
      ['SNR', '37.5', 'dB'],
      ['Video Encoding', 'H.265 / H.264', '\u2014'],
      ['Audio Encoding', 'G.711ulaw, G.711alaw, AAC', '\u2014'],
      ['OSD Overlay', 'Date, Time, GPS coordinates, Speed', '\u2014']
    ]
  ));

  c.push(h3('Extension Camera Inputs (Channels 2\u20133)'));
  c.push(specTable(
    ['Parameter', 'Value'],
    [
      ['Video Input', '2-ch 720p TVI or 1-ch 1080p TVI'],
      ['Frame Rate', '25 fps (720p default)'],
      ['Sub-Stream', '25 fps at 480p (640 x 480)'],
      ['Purpose', 'Driver-facing DMS camera, cargo/side view']
    ]
  ));

  c.push(callout('note', 'The G40 supports up to 3 video channels: 1 built-in road-facing camera plus 2 extension cameras connected via TVI. The DMS (driver monitoring) camera is typically connected as Channel 2.'));

  // 3.2 Physical Specifications
  c.push(h2('3.2 Physical Specifications'));
  c.push(specTable(
    ['Parameter', 'Value', 'Unit'],
    [
      ['Dimensions (W x D x H)', '123.0 x 85.0 x 38.9', 'mm'],
      ['Dimensions (Imperial)', '4.8 x 3.4 x 1.5', 'in'],
      ['Net Weight', '270', 'g (0.6 lb)'],
      ['Package Weight', '900', 'g (2.0 lb)'],
      ['Package Dimensions', '223 x 153 x 63', 'mm'],
      ['Enclosure Material', 'ABS/PC Engineering Plastic', '\u2014'],
      ['Color', 'Black', '\u2014'],
      ['Mounting', 'Windshield adhesive mount', '\u2014'],
      ['IP Rating', 'IP4X (dust-protected, cabin-mounted)', '\u2014']
    ]
  ));

  // 3.3 Electrical Specifications
  c.push(h2('3.3 Electrical Specifications'));
  c.push(specTable(
    ['Parameter', 'Range 1', 'Range 2', 'Unit'],
    [
      ['Input Voltage (Low)', '10\u201316', '\u2014', 'V DC'],
      ['Input Voltage (High)', '\u2014', '20\u201336', 'V DC'],
      ['Max Power Consumption', '\u2014', '< 12', 'W'],
      ['Power Connector', '1x 8-pin BM Male Terminal', '\u2014', '\u2014']
    ]
  ));

  c.push(safety('notice', 'The DashCam supports dual voltage ranges: 10\u201316 V DC for 12 V vehicle systems and 20\u201336 V DC for 24 V vehicle systems. Built-in protection against overvoltage, undervoltage, short circuit, and reverse polarity.'));

  // 3.4 Environmental Specifications
  c.push(h2('3.4 Environmental Specifications'));
  c.push(specTable(
    ['Parameter', 'Min', 'Max', 'Unit'],
    [
      ['Operating Temperature', '-20', '+60', '\u00B0C'],
      ['Operating Humidity', '10', '95 (non-condensing)', '% RH']
    ]
  ));

  // 3.5 Connectivity Specifications
  c.push(h2('3.5 Connectivity Specifications'));
  c.push(specTable(
    ['Parameter', 'Specification'],
    [
      ['Cellular', '4G LTE'],
      ['LTE Bands (FDD)', 'B1, B3, B5, B7, B8, B20'],
      ['LTE Bands (TDD)', 'B38, B40, B41'],
      ['3G WCDMA', 'B1, B5, B8'],
      ['2G GSM/EDGE', '900 / 1800 MHz'],
      ['SIM Type', '1x Industrial Micro SIM (plug-in; standard SIM not supported)'],
      ['WiFi', 'IEEE 802.11 b/g/n, 2.4 GHz (AP mode supported)'],
      ['GNSS', 'BDS + GPS + GLONASS'],
      ['ISUP Protocol', 'Version 5.0']
    ]
  ));

  // 3.6 Storage Specifications
  c.push(h2('3.6 Storage Specifications'));
  c.push(specTable(
    ['Parameter', 'Specification'],
    [
      ['Storage Media', 'Dual microSD/TF card slots'],
      ['Max Capacity per Card', '256 GB (Class 10 or above)'],
      ['Total Max Capacity', '512 GB (2 x 256 GB)'],
      ['Recording Mode', 'Continuous loop with event-locked segments'],
      ['Overwrite', 'Supported (oldest footage first; event-locked clips preserved)'],
      ['Cloud Upload', 'Event-based auto-upload over 4G LTE'],
      ['Video Encoding', 'H.265 / H.264']
    ]
  ));

  // 3.7 Sensor Suite
  c.push(h2('3.7 Sensor Suite'));
  c.push(specTable(
    ['Sensor', 'Type', 'Function'],
    [
      ['G-Sensor', 'Six-axis (accelerometer + gyroscope)', 'Harsh braking, acceleration, cornering, impact, and collision detection'],
      ['GNSS', 'BDS / GPS / GLONASS', 'Positioning, speed tracking, route recording'],
      ['Microphone', 'Omnidirectional, 50\u201320,000 Hz', 'In-cab audio capture for incident evidence'],
      ['Speaker', 'Built-in, max 1.5 W, >= 70 dB at 1 m', 'Voice alerts, adjustable volume'],
      ['Tamper', 'Internal', 'Camera obstruction and device removal detection']
    ]
  ));

  // 3.8 Interfaces
  c.push(h2('3.8 Interfaces'));
  c.push(specTable(
    ['Interface', 'Connector / Type', 'Purpose'],
    [
      ['Power Input', '1x 8-pin BM Male Terminal', 'Vehicle power connection'],
      ['Alarm Input', '2 channels', 'External trigger inputs'],
      ['RS-232', '1 port (reserved)', 'Serial communication'],
      ['CAN Bus', 'CAN_L + CAN_H', 'Vehicle data integration'],
      ['I/O #1', '4-pin BMW Male Connector', 'GND + I/O'],
      ['I/O #2', '4-pin BMW Male Connector', 'Alarm button for platform upload'],
      ['Steering Signal', '3 channels', 'Turn signal integration'],
      ['Reset', 'Pinhole button', 'Factory reset and recovery']
    ]
  ));

  // 3.9 Certifications
  c.push(h2('3.9 Certifications'));
  c.push(specTable(
    ['Certification', 'Standard / ID', 'Scope'],
    [
      ['CE', 'EN 55032, EN 55035', 'Electromagnetic compatibility (EU)'],
      ['CB', 'IEC 62368', 'Electrical safety'],
      ['FCC', 'Part 15 (ID: 2a3iq2032g40)', 'Radio frequency emissions (USA)'],
      ['E-Mark', 'ECE R10', 'Automotive EMC compliance'],
      ['RCM', 'AS/NZS', 'Australia / New Zealand compliance'],
      ['ANATEL', '\u2014', 'Brazil telecommunications'],
      ['ICASA', '\u2014', 'South Africa telecommunications']
    ]
  ));

  c.push(pageBreak());

  // =======================================================================
  // 4. Components and Interfaces
  // =======================================================================
  c.push(h1('4. Components and Interfaces'));

  c.push(h2('4.1 Main Unit \u2014 Hikvision G40'));
  c.push(body('The G40 is a compact, dual-camera unit that integrates all sensing, processing, storage, and communication functions in a single windshield-mounted device.'));

  c.push(img('Annotated top-down and side-view diagram of the Hikvision G40 DashCam showing all external ports and interfaces. Top view: front lens, rear IR lens. Left side: microSD slot, SIM tray, reset pinhole. Right side: power input connector. Bottom: mounting rail. Include dimension arrows. Technical line drawing style with callout labels, light gray background, black line work.'));

  c.push(h3('External Interfaces'));
  c.push(specTable(
    ['Interface', 'Connector', 'Purpose'],
    [
      ['Power Input', 'Proprietary cable', '8\u201336 V DC vehicle power connection'],
      ['microSD Slot', 'Push-push TF card', 'Local video storage (up to 256 GB)'],
      ['SIM Tray', 'Micro SIM (2FF)', '4G LTE cellular connectivity'],
      ['Reset Pinhole', 'Recessed button', 'Factory reset and recovery'],
      ['WiFi Antenna', 'Internal', 'Local configuration and firmware update'],
      ['GPS Antenna', 'Internal', 'Satellite positioning'],
      ['4G LTE Antenna', 'Internal', 'Cellular data communication']
    ]
  ));

  c.push(h2('4.2 LED Status Indicators'));
  c.push(specTable(
    ['LED State', 'Color', 'Meaning'],
    [
      ['Solid green', 'Green', 'Normal operation \u2014 recording active'],
      ['Blinking green', 'Green', 'Connecting to network'],
      ['Solid red', 'Red', 'Error condition \u2014 check SIM/SD card'],
      ['Blinking red', 'Red', 'Recording paused \u2014 storage full or missing'],
      ['Alternating red/green', '\u2014', 'Firmware update in progress'],
      ['Off', '\u2014', 'Device powered off or no power']
    ]
  ));

  c.push(safety('caution', 'DO NOT INTERRUPT POWER during firmware updates (alternating red/green LED). Interrupting a firmware update may render the device inoperable and require factory service.'));

  c.push(h2('4.3 Wiring Harness'));
  c.push(body('The power cable connects the DashCam to the vehicle\u2019s fuse box. The harness includes:'));
  c.push(specTable(
    ['Wire', 'Color', 'Connection', 'Purpose'],
    [
      ['Constant Power', 'Red', 'Vehicle battery (always-on fuse)', 'Continuous power for parking mode'],
      ['Ignition', 'Yellow', 'Accessory fuse (ACC)', 'Ignition-triggered recording activation'],
      ['Ground', 'Black', 'Vehicle chassis ground', 'Common ground reference'],
      ['Fuse', 'Inline', 'Power line', 'Overcurrent protection']
    ]
  ));

  c.push(pageBreak());

  // =======================================================================
  // 5. Features and Capabilities
  // =======================================================================
  c.push(h1('5. Features and Capabilities'));

  c.push(h2('5.1 Advanced Driver Assistance System (ADAS)'));
  c.push(body('The DashCam\u2019s road-facing camera runs AI models that analyze the forward scene in real-time, generating alerts when hazardous conditions are detected.'));

  c.push(specTable(
    ['Feature', 'Trigger Condition', 'Alert Type'],
    [
      ['Forward Collision Warning (FCW)', 'Closing distance to vehicle ahead falls below safe threshold at speed > 30 km/h', 'Audible alarm + event upload'],
      ['Lane Departure Warning (LDW)', 'Vehicle drifts across lane markings without turn signal', 'Audible alarm + event upload'],
      ['Solid Lane Departure Warning (SLW)', 'Vehicle crosses solid lane boundary', 'Audible alarm + event upload'],
      ['Pedestrian Collision Warning (PCW)', 'Pedestrian detected in collision path', 'Audible alarm + event upload'],
      ['Headway Monitoring Warning (HMW)', 'Following distance drops below safe time-to-collision threshold', 'Audible alert + event upload'],
      ['Traffic Sign Recognition (TSR)', 'Speed limit and road signs detected by camera', 'Event log + HUD overlay'],
      ['Traffic Light Detection (TLD)', 'Red/green light status detected at intersections', 'Audible alert + event log'],
      ['Forward Car Leaving (FCL)', 'Vehicle ahead starts moving when stopped (e.g., traffic light turns green)', 'Audible alert']
    ]
  ));

  c.push(callout('note', 'ADAS features activate above 30 km/h and sensitivity thresholds are configurable through HikCentral Professional. Features should be calibrated for each vehicle type during commissioning.'));

  c.push(h2('5.2 Driver Monitoring System (DMS)'));
  c.push(body('The driver-facing IR camera monitors the driver\u2019s face and posture continuously, detecting unsafe behaviors even in complete darkness.'));

  c.push(specTable(
    ['Feature', 'Detection Method', 'Alert Type'],
    [
      ['Fatigue \u2014 Eye Closure', 'Eye closure frequency exceeds threshold', 'Voice warning + audible alarm + event upload'],
      ['Fatigue \u2014 Yawning', 'Repeated or prolonged yawning detected', 'Voice warning + event upload'],
      ['Distraction Detection', 'Gaze direction away from road for extended period', 'Voice warning + event upload'],
      ['Phone Call Detection', 'Hand raised to ear or phone held near face', 'Voice warning + event upload'],
      ['Smoking Detection', 'Cigarette or smoke detected near face', 'Voice warning + event upload'],
      ['Seatbelt Compliance', 'Shoulder belt not detected across driver\u2019s chest', 'Audible alert + event upload'],
      ['IR Blocking Sunglasses', 'Infrared-blocking eyewear detected (defeats IR monitoring)', 'Event upload + alert'],
      ['Camera Tampering', 'Video occlusion or camera obstruction detected', 'Event upload + alert'],
      ['Driver Authentication', 'Facial recognition against enrolled driver database', 'Event log']
    ]
  ));

  c.push(callout('tip', 'Enroll all authorized drivers in the facial recognition system during commissioning. This enables automatic driver identification in trip reports and links behavior alerts to specific individuals.'));

  c.push(h2('5.3 Recording Modes'));
  c.push(specTable(
    ['Mode', 'Trigger', 'Storage', 'Upload'],
    [
      ['Continuous Recording', 'Ignition ON', 'SD card (loop overwrite)', 'On-demand retrieval'],
      ['Event Recording', 'ADAS/DMS alert or G-sensor trigger', 'SD card (locked, non-overwrite)', 'Automatic over 4G'],
      ['Pre-Event Capture', '15 seconds before event trigger', 'SD card (locked)', 'Included with event clip'],
      ['Parking Mode', 'Ignition OFF (constant power connected)', 'SD card', 'On-demand retrieval'],
      ['Manual Recording', 'Driver presses event button (if configured)', 'SD card (locked)', 'On-demand retrieval']
    ]
  ));

  c.push(h2('5.4 Live Video Streaming'));
  c.push(body('Fleet managers access live video feeds from any connected DashCam through HikCentral Professional:'));
  c.push(boldLead('Live View', 'Real-time road and driver camera streams'));
  c.push(boldLead('Multi-Camera Grid', 'View multiple vehicles simultaneously on a single screen'));
  c.push(boldLead('PTZ-Style Control', 'Switch between road and driver cameras per vehicle'));
  c.push(boldLead('Bandwidth Adaptation', 'Stream quality adjusts automatically based on cellular signal strength'));
  c.push(boldLead('Access Control', 'User roles and permissions control who can view live feeds'));

  c.push(h2('5.5 Event Management'));
  c.push(body('When the DashCam detects an event (AI alert, collision, harsh maneuver), the system:'));
  c.push(step(1, 'Records and locks a video clip with 15-second pre-event context'));
  c.push(step(2, 'Tags the clip with GPS location, timestamp, speed, and event classification'));
  c.push(step(3, 'Uploads the clip to HikCentral Professional over 4G LTE'));
  c.push(step(4, 'Generates an alert in the fleet management dashboard'));
  c.push(step(5, 'Routes the alert to designated personnel (configurable notification rules)'));
  c.push(body('Events include G-sensor triggers (harsh braking, acceleration, impact), ADAS alerts, DMS alerts, and speed violations.'));

  c.push(h2('5.6 Driver Coaching and Safety Scoring'));
  c.push(body('The HikCentral Professional platform aggregates DashCam events to generate:'));
  c.push(boldLead('Driver Safety Scores', 'Composite scores based on ADAS and DMS event frequency, severity, and driving time'));
  c.push(boldLead('Trip Reports', 'Per-trip summaries with route map, speed profile, and event markers'));
  c.push(boldLead('Trend Analytics', 'Weekly and monthly behavior trend reports for fleet-level safety improvement tracking'));
  c.push(boldLead('Coaching Workflows', 'Flag high-risk drivers for targeted coaching based on event patterns'));

  c.push(pageBreak());

  // =======================================================================
  // 6. Platform Integration
  // =======================================================================
  c.push(h1('6. Platform Integration'));

  c.push(h2('6.1 HikCentral Professional'));
  c.push(body('HikCentral Professional is the primary management platform for the WakeCap DashCam System. It provides server-based fleet monitoring with enterprise-grade features.'));

  c.push(specTable(
    ['Capability', 'Description'],
    [
      ['Device Management', 'Register, configure, and monitor all DashCam units from a single interface'],
      ['Live View', 'Real-time video from road and driver cameras'],
      ['Playback', 'Historical video retrieval with timeline scrubbing and event filtering'],
      ['Alert Routing', 'Configurable notification rules for event types and severity levels'],
      ['User Management', 'Role-based access control for fleet managers, supervisors, and safety officers'],
      ['Multi-Site Support', 'Manage DashCams across multiple project sites from one server'],
      ['Reporting', 'Export event reports, trip summaries, and driver performance data']
    ]
  ));

  c.push(h3('Server Requirements'));
  c.push(specTable(
    ['Requirement', 'Specification'],
    [
      ['Platform Version', 'HikCentral Professional V2.6.3 or later'],
      ['Operating System', 'Windows Server 2016/2019/2022'],
      ['Public Static IP', 'Required for ISUP device connectivity'],
      ['ISUP Port', '7660 (TCP)'],
      ['Storage', 'Server-dependent; scales with retention policy and fleet size']
    ]
  ));

  c.push(img('HikCentral Professional dashboard screenshot mockup showing a fleet management view. Left panel: vehicle list with status indicators (online/offline). Center: live video feed from selected vehicle showing road-facing camera. Right panel: latest alert feed showing DMS and ADAS events with timestamps. Bottom bar: map view with vehicle location markers.'));

  c.push(h2('6.2 WakeCap Observation Manager Integration'));
  c.push(body('The DashCam System integrates with the WakeCap Observation Manager in a phased approach:'));
  c.push(boldPrefix('Phase 1 (Current): ', 'DashCam alerts are delivered to clients through HikCentral Professional as the primary interface.'));
  c.push(boldPrefix('Phase 2 (Planned): ', 'DashCam alerts will be routed to the WakeCap Observation Manager, joining AVL telemetry, CCTV feeds, and anti-collision alerts in a unified safety operations view.'));

  c.push(callout('note', 'Phase 2 integration enables correlated incident analysis. For example, a DMS fatigue alert combined with an AVL harsh-braking event and a nearby anti-collision proximity alarm creates a comprehensive incident narrative without manual cross-referencing.'));

  c.push(h2('6.3 AVL System Integration'));
  c.push(body('The DashCam complements WakeCap\u2019s AVL (Automatic Vehicle Location) system:'));
  c.push(specTable(
    ['AVL Feature', 'DashCam Enhancement'],
    [
      ['Vehicle GPS Tracking', 'Video evidence of driver behavior at tracked locations'],
      ['Seatbelt Alert', 'Visual confirmation via DMS camera'],
      ['Harsh Braking/Acceleration', 'Synchronized video clip for context'],
      ['Speeding Alert', 'Forward camera footage showing road conditions'],
      ['Geofence Violations', 'Video evidence of vehicle at restricted locations']
    ]
  ));

  c.push(h2('6.4 Unified Video Management System (VMS) Vision'));
  c.push(body('The WakeCap DashCam is part of a broader strategy to unify all video streams on construction and industrial sites:'));
  c.push(boldLead('CCTV cameras', 'Fixed site surveillance'));
  c.push(boldLead('DashCam system', 'Mobile vehicle monitoring'));
  c.push(boldLead('Anti-collision cameras', 'Equipment proximity alerting'));
  c.push(body('All video streams will be integrated into a unified VMS experience, enabling site safety managers to monitor fixed and mobile camera assets from a single platform.'));

  c.push(pageBreak());

  // =======================================================================
  // 7. Operation
  // =======================================================================
  c.push(h1('7. Operation'));

  c.push(h2('7.1 Normal Operation'));
  c.push(body('Under normal operating conditions, the DashCam system operates autonomously once commissioned:'));

  c.push(step(1, 'Power-On. The DashCam activates automatically when the vehicle ignition is turned on. The status LED turns solid green when recording begins.'));
  c.push(step(2, 'Continuous Recording. The road-facing and driver-facing cameras record continuously to the SD card. Older footage is overwritten in a loop when storage is full (event-locked clips are preserved).'));
  c.push(step(3, 'AI Monitoring. The ADAS and DMS engines process video frames in real-time. When an unsafe condition is detected, the system generates an audible/voice alert to the driver and uploads the event clip to HikCentral.'));
  c.push(step(4, 'Data Transmission. GPS position, speed, and telemetry data are transmitted periodically to HikCentral. Event clips are uploaded as they occur.'));
  c.push(step(5, 'Power-Off. When the ignition is turned off, the DashCam completes its current recording segment and enters standby mode. If constant power is connected, parking mode activates.'));

  c.push(h2('7.2 HAT-Dashcam Mobile Application'));
  c.push(body('The HAT-Dashcam app provides field configuration capabilities:'));
  c.push(specTable(
    ['Function', 'Description'],
    [
      ['Device Onboarding', 'Scan and register new DashCam units to the fleet'],
      ['APN Configuration', 'Set cellular network access point parameters'],
      ['Platform Binding', 'Link the device to the HikCentral Professional server'],
      ['WiFi Setup', 'Connect to the DashCam\u2019s local WiFi for direct configuration'],
      ['Firmware Update', 'Push firmware updates to connected devices'],
      ['Device Diagnostics', 'Check camera status, SIM signal, GPS lock, and storage health']
    ]
  ));

  c.push(h2('7.3 Remote Monitoring'));
  c.push(body('Fleet managers monitor the DashCam fleet through the HikCentral Professional web interface:'));
  c.push(boldLead('Dashboard', 'Fleet health overview: online/offline counts, active alerts, event trends'));
  c.push(boldLead('Live View', 'Select any vehicle for real-time road and driver camera feeds'));
  c.push(boldLead('Playback', 'Search and review historical footage by vehicle, time range, or event type'));
  c.push(boldLead('Alerts', 'Real-time alert feed with severity classification and acknowledgment workflow'));
  c.push(boldLead('Reports', 'Generate driver safety scorecards, trip summaries, and fleet analytics'));

  c.push(h2('7.4 Alert Management'));
  c.push(body('Alerts are classified by severity and routed to designated personnel:'));
  c.push(specTable(
    ['Severity', 'Alert Types', 'Response'],
    [
      ['Critical', 'Collision detected, driver unconscious', 'Immediate notification to fleet manager and safety officer'],
      ['High', 'Fatigue warning, forward collision warning, pedestrian detected', 'Real-time notification with video clip'],
      ['Medium', 'Phone use, smoking, seatbelt non-compliance, lane departure', 'Dashboard alert with video clip'],
      ['Low', 'Tailgating, minor harsh events', 'Event logged for trend analysis']
    ]
  ));

  c.push(pageBreak());

  // =======================================================================
  // 8. Safety and Compliance
  // =======================================================================
  c.push(h1('8. Safety and Compliance'));

  c.push(h2('8.1 Vehicle Safety'));

  c.push(safety('warning', 'DRIVER DISTRACTION HAZARD \u2014 Do not operate, configure, or adjust the DashCam while the vehicle is in motion. All configuration must be performed with the vehicle stationary and engine off. The driver must maintain full attention on the road at all times.'));

  c.push(safety('caution', 'WINDSHIELD OBSTRUCTION \u2014 Position the DashCam so it does not obstruct the driver\u2019s field of vision. Follow local regulations for windshield-mounted device placement. In Saudi Arabia, the device must not exceed the area covered by the sun visor.'));

  c.push(bullet('The DashCam is a driver assistance tool, not a replacement for attentive driving'));
  c.push(bullet('ADAS alerts are advisory \u2014 the driver must always make independent safety decisions'));
  c.push(bullet('Voice alerts are intended to remind, not to command \u2014 human judgment takes priority'));

  c.push(h2('8.2 Electrical Safety'));

  c.push(safety('notice', 'All electrical connections to the vehicle must be performed by qualified technicians. Incorrect wiring may damage the DashCam or vehicle electrical system.'));

  c.push(bullet('Use only the supplied wiring harness with the correct fuse rating'));
  c.push(bullet('Disconnect the vehicle battery before any wiring modifications'));
  c.push(bullet('Ensure proper grounding to the vehicle chassis'));
  c.push(bullet('Do not splice into safety-critical vehicle circuits (airbag, ABS, engine management)'));

  c.push(h2('8.3 Data Privacy and Compliance'));
  c.push(body('The DashCam system records video and audio inside and outside the vehicle. Operators must comply with local data privacy regulations:'));
  c.push(bullet('Inform all vehicle operators that monitoring is active'));
  c.push(bullet('Display clear signage in the vehicle indicating recording is in progress'));
  c.push(bullet('Control access to recorded footage through HikCentral user permissions'));
  c.push(bullet('Define and enforce data retention policies appropriate to local regulations'));
  c.push(bullet('Driver facial recognition data must be handled in accordance with applicable privacy laws'));

  c.push(h2('8.4 Environmental Compliance'));
  c.push(specTable(
    ['Certification', 'Compliance'],
    [
      ['CE', 'Electromagnetic compatibility \u2014 EN 55032, EN 55035'],
      ['FCC Part 15', 'Radio frequency emissions compliance'],
      ['E-Mark (ECE R10)', 'Automotive electromagnetic compatibility'],
      ['RoHS', 'Free from restricted hazardous substances']
    ]
  ));

  c.push(pageBreak());

  // =======================================================================
  // Appendix A: Glossary
  // =======================================================================
  c.push(h1('Appendix A: Glossary'));
  c.push(specTable(
    ['Term', 'Definition'],
    [
      ['ADAS', 'Advanced Driver Assistance System \u2014 AI features that assist the driver in avoiding hazards'],
      ['APN', 'Access Point Name \u2014 cellular network configuration for data connectivity'],
      ['AVL', 'Automatic Vehicle Location \u2014 GPS-based vehicle tracking system'],
      ['DMS', 'Driver Monitoring System \u2014 AI features that monitor driver behavior and alertness'],
      ['FCW', 'Forward Collision Warning \u2014 alerts when closing distance to vehicle ahead is unsafe'],
      ['GNSS', 'Global Navigation Satellite System \u2014 satellite positioning (GPS, GLONASS)'],
      ['HMW', 'Headway Monitoring & Warning \u2014 time-to-collision measurement and alerting'],
      ['ISUP', 'Intelligent Security Unified Protocol \u2014 Hikvision\u2019s device-to-platform protocol'],
      ['IVMS', 'In-Vehicle Monitoring System \u2014 general term for vehicle monitoring solutions'],
      ['LDW', 'Lane Departure Warning \u2014 alerts when vehicle drifts across lane markings'],
      ['LTE', 'Long-Term Evolution \u2014 4G cellular data standard'],
      ['M2M', 'Machine-to-Machine \u2014 SIM card type designed for IoT/device communication'],
      ['MDVR', 'Mobile Digital Video Recorder \u2014 multi-channel vehicle recording platform'],
      ['PCW', 'Pedestrian Collision Warning \u2014 alerts when pedestrian is detected in collision path'],
      ['VMS', 'Video Management System \u2014 software platform for managing video streams'],
      ['WDR', 'Wide Dynamic Range \u2014 camera technology for high-contrast lighting conditions']
    ]
  ));

  c.push(pageBreak());

  // =======================================================================
  // Appendix B: Model Quick Reference
  // =======================================================================
  c.push(h1('Appendix B: Model Quick Reference'));
  c.push(specTable(
    ['Item', 'Model / Part Number', 'Specification'],
    [
      ['DashCam Unit', 'Hikvision AE-DI2032-G40', '3-ch, 1080p, 4G LTE, GPS, AI-enabled'],
      ['G40 V2 (Upgrade)', 'AE-DI2032-G40/V2', '3-ch, 1080p, 512 GB SD, enhanced AI'],
      ['G40 PRO (Premium)', 'AE-DI5052-G40 PRO', '5-ch, 1620p front, 1080p rear, 1 TB SD'],
      ['Management Platform', 'HikCentral Professional', 'V2.6.3 or later'],
      ['Communication Protocol', 'ISUP', 'Version 5.0'],
      ['Mobile Application', 'HAT-Dashcam', 'Android / iOS'],
      ['SIM Card', 'Industrial Micro SIM (plug-in)', '4G LTE, 50 GB data package (M2M)'],
      ['SD Card', 'Dual microSD/TF (Class 10+)', 'Up to 256 GB each (512 GB total)']
    ]
  ));

  c.push(pageBreak());

  // =======================================================================
  // Appendix C: Version History
  // =======================================================================
  c.push(h1('Appendix C: Version History'));
  c.push(specTable(
    ['Version', 'Date', 'Author', 'Changes'],
    [
      ['1.0', '2026-04-12', 'WakeCap Technologies', 'Initial release']
    ]
  ));

  c.push(pageBreak());

  // =======================================================================
  // Appendix D: Contact Information
  // =======================================================================
  c.push(h1('Appendix D: Contact Information'));
  c.push(specTable(
    ['Contact', 'Details'],
    [
      ['WakeCap Technical Support', 'support@wakecap.com'],
      ['Documentation Contact', 'zishan.shahzad@wakecap.com'],
      ['HikCentral Support', 'Hikvision regional distributor'],
      ['Website', 'www.wakecap.com']
    ]
  ));

  return c;
}

// ---------------------------------------------------------------------------
// Main — build and save document
// ---------------------------------------------------------------------------

async function main() {
  console.log('Building WC-DC-PM-v1.0.docx ...');

  const content = buildContent();

  const doc = buildDocument({
    docId: DOC_ID,
    productName: PRODUCT_NAME,
    docType: DOC_TYPE,
    version: VERSION,
    revisionDate: REVISION_DATE,
    subtitle: SUBTITLE,
    content,
    includeCoverPage: true,
    includeTOC: true,
    metadata: {
      title: 'WakeCap DashCam System \u2014 Product Manual',
      subject: 'Intelligent In-Vehicle Monitoring for Construction and Industrial Fleets',
      keywords: 'WakeCap, DashCam, Hikvision G40, ADAS, DMS, Fleet Monitoring, HikCentral, IoT',
      creator: 'WakeCap Technologies'
    }
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.resolve(__dirname, 'WC-DC-PM-v1.0.docx');
  fs.writeFileSync(outputPath, buffer);

  const stats = fs.statSync(outputPath);
  const sizeKB = (stats.size / 1024).toFixed(1);
  console.log(`Generated: ${outputPath}`);
  console.log(`File size: ${sizeKB} KB (${stats.size} bytes)`);
}

main().catch(err => {
  console.error('Generation failed:', err);
  process.exit(1);
});

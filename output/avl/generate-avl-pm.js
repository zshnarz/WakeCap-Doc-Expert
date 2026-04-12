/**
 * WakeCap AVL System — Product Manual Generator
 *
 * Generates WC-AVL-PM-v1.0.docx from structured content using
 * the WakeCap docx-generator base helpers.
 *
 * Version A (Marketing/Sales style)
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
const DOC_ID = 'WC-AVL-PM-v1.0';
const REVISION_DATE = '2026-04-12';
const PRODUCT_NAME = 'WakeCap AVL System';
const DOC_TYPE = 'Product Manual';
const SUBTITLE = 'Automatic Vehicle Location & Equipment Tracking Platform';

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
      new TextRun({ text: ` — ${rest}`, size: sizes.body, font: 'Source Sans Pro', color: COLORS.charcoal })
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

/** Checkbox-style bullet item */
function checkItem(text) {
  const sizes = FONT_SIZES.versionA;
  return new Paragraph({
    spacing: { after: 80 },
    indent: { left: 360 },
    children: [
      new TextRun({ text: '☐ ', size: sizes.body, font: 'Source Sans Pro', color: COLORS.charcoal }),
      new TextRun({ text: text, size: sizes.body, font: 'Source Sans Pro', color: COLORS.charcoal })
    ]
  });
}

/** Sub-step (lettered) */
function subStep(letter, text) {
  const sizes = FONT_SIZES.versionA;
  return new Paragraph({
    spacing: { after: 100 },
    indent: { left: 720 },
    children: [
      new TextRun({ text: `${letter}. `, bold: true, size: sizes.body, font: 'Source Sans Pro', color: COLORS.wakecapBlue }),
      new TextRun({ text: text, size: sizes.body, font: 'Source Sans Pro', color: COLORS.charcoal })
    ]
  });
}

// ---------------------------------------------------------------------------
// Build Content
// ---------------------------------------------------------------------------

function buildContent() {
  const c = [];

  // =======================================================================
  // Cover page hero image
  // =======================================================================
  c.push(img('WakeCap AVL System hero shot — Teltonika FMC130 GPS tracker device mounted on a vehicle dashboard with a construction site visible through the windshield, WakeCap Equipment Manager dashboard displayed on a tablet nearby showing a live fleet map with vehicle icons'));

  c.push(createSpacer(100));

  // Title block info table
  c.push(specTable(
    ['', ''],
    [
      ['Model', 'WakeCap AVL (Teltonika FMC130)'],
      ['Document', 'WC-AVL-PM-v1.0'],
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
  c.push(body('The WakeCap AVL (Automatic Vehicle Location) System provides real-time GPS tracking and fleet telematics for construction vehicles and heavy equipment on mega project sites. The system combines Teltonika FMC130 GPS tracker hardware with the WakeCap Equipment Manager portal to deliver comprehensive fleet visibility, driver behavior monitoring, and operational intelligence.'));
  c.push(body('Deployed across Aramco mega projects and other large-scale construction sites, the AVL system tracks vehicles ranging from light transport buses to heavy excavators and cranes. Each tracker transmits GPS position, speed, ignition status, and vehicle diagnostics over cellular networks to the WakeCap cloud platform, where data is processed and presented through real-time dashboards, interactive maps, and automated alerts.'));
  c.push(body('The Equipment Manager portal (v1.8.1) serves as the unified interface for fleet operations, combining live tracking, 20+ configurable alert types, geofencing, CO\u2082 emissions monitoring, device health diagnostics, and 12 exportable reports into a single web-based application accessible from any browser.'));

  c.push(h2('1.2 Key Features'));
  c.push(boldLead('Real-Time GPS Tracking', 'Live position updates with custom vehicle icons for excavators, cranes, trucks, and more'));
  c.push(boldLead('20+ Alert Types', 'Overspeed, geofence entry/exit, harsh braking, harsh acceleration, seatbelt compliance, idle detection, SOS, and more'));
  c.push(boldLead('Fleet Dashboard', 'At-a-glance metrics for mobilization, connectivity, compliance, CO\u2082, and offline tracker detection'));
  c.push(boldLead('Route Intelligence', 'Historical route playback with speed-based color coding, distance, and moving time statistics'));
  c.push(boldLead('Geofence Management', 'Draw custom boundaries on the map with GeoJSON import/export'));
  c.push(boldLead('Device Health Monitoring', '7 health indicators per tracker with dynamic scoring and Teltonika diagnostics'));
  c.push(boldLead('CO\u2082 Emissions Tracking', 'Fuel-based emissions calculations with automatic telemetry from Traccar'));
  c.push(boldLead('12 Exportable Reports', 'One-click Excel downloads for fleet operations, alerts, compliance, and device health'));

  c.push(h2('1.3 Package Contents'));
  c.push(specTable(
    ['Item', 'Quantity', 'Description'],
    [
      ['Teltonika FMC130 GPS Tracker', '1', '4G LTE vehicle tracking device'],
      ['Mounting Bracket & Hardware', '1 set', 'Bracket, screws, cable ties for vehicle installation'],
      ['Power Cable Harness', '1', '3-wire harness (power, ground, ignition)'],
      ['SIM Card', '1', 'Pre-configured Caburn M2MI or Jasper cellular SIM'],
      ['Teltonika ALLCAN-300 (CAN300)', 'Optional', 'CAN bus adapter for vehicle diagnostics'],
      ['Quick Installation Card', '1', 'Field reference for installer']
    ]
  ));

  c.push(h2('1.4 Product Identification'));
  c.push(img('Annotated top-down photo of Teltonika FMC130 device with numbered callouts — 1: Status LED indicators, 2: SIM card slot, 3: MicroSD card slot, 4: Power/IO connector (10-pin), 5: External GNSS antenna port, 6: External cellular antenna port, 7: 1-Wire interface connector, 8: Bluetooth antenna (internal)'));

  c.push(step(1, 'Status LED Indicators — GNSS (green), cellular (blue), power (red) status LEDs'));
  c.push(step(2, 'SIM Card Slot — Micro-SIM slot for cellular connectivity'));
  c.push(step(3, 'MicroSD Card Slot — Optional storage for data buffering'));
  c.push(step(4, 'Power/IO Connector — 10-pin connector for power, ignition, digital/analog I/O'));
  c.push(step(5, 'External GNSS Antenna Port — For improved GPS reception in enclosed installations'));
  c.push(step(6, 'External Cellular Antenna Port — For improved cellular signal in metal enclosures'));
  c.push(step(7, '1-Wire Interface — For temperature sensors and iButton driver identification'));
  c.push(step(8, 'Bluetooth Antenna — Internal antenna for BLE peripherals and beacons'));

  c.push(pageBreak());

  // =======================================================================
  // 2. System Architecture
  // =======================================================================
  c.push(h1('2. System Architecture'));

  c.push(h2('2.1 System Overview'));
  c.push(img('System architecture block diagram showing the complete WakeCap AVL data flow — vehicles with FMC130 trackers sending data over cellular network (4G LTE) to cloud infrastructure with Traccar GPS engine, Equipment Manager microservice, and WakeCap Equipment Manager portal on browser screens'));

  c.push(h2('2.2 Data Flow'));
  c.push(body('The AVL system follows a straightforward data pipeline from vehicle to dashboard:'));
  c.push(step(1, 'Vehicle \u2192 Tracker: The FMC130 device reads GPS coordinates, ignition state, speed, and optional CAN bus data from the vehicle'));
  c.push(step(2, 'Tracker \u2192 Cellular Network: Data is transmitted over 4G LTE at configurable intervals (default: every 2 minutes)'));
  c.push(step(3, 'Cellular \u2192 Traccar Engine: GPS data is received and processed by the Traccar tracking platform'));
  c.push(step(4, 'Traccar \u2192 Equipment Manager: Processed positions, events, and alerts flow into the Equipment Manager microservice'));
  c.push(step(5, 'Equipment Manager \u2192 Portal: Real-time updates are pushed to the web dashboard via SignalR WebSocket connections'));
  c.push(step(6, 'Alerts \u2192 Observation Service: Safety-critical alerts are routed to the WakeCap Observation Service for unified incident management'));

  c.push(h2('2.3 Communication Protocols'));
  c.push(specTable(
    ['Connection', 'Protocol', 'Direction', 'Notes'],
    [
      ['FMC130 \u2192 Cell Tower', '4G LTE (Cat 1)', 'Upstream', '3G/2G fallback available'],
      ['FMC130 \u2192 ALLCAN-300', 'CAN bus (J1939)', 'Bidirectional', 'Vehicle diagnostics'],
      ['FMC130 \u2192 Sensors', '1-Wire / Digital I/O', 'Input', 'Ignition, seatbelt, SOS, temperature'],
      ['Traccar \u2192 Equipment Manager', 'REST API', 'Bidirectional', 'Position data and device commands'],
      ['Equipment Manager \u2192 Browser', 'SignalR (WebSocket)', 'Push', 'Real-time map and status updates'],
      ['Equipment Manager \u2192 Observation Service', 'Webhook', 'Push', 'Alert events for incident management'],
      ['SIM Management \u2192 Caburn/Jasper', 'REST API', 'Bidirectional', 'SIM status, data usage, activation']
    ]
  ));

  c.push(h2('2.4 Platform Components'));
  c.push(specTable(
    ['Component', 'Function'],
    [
      ['Equipment Manager', 'Independent microservice \u2014 equipment registration, fleet dashboard, reports'],
      ['Traccar Engine', 'Open-source GPS tracking platform \u2014 position processing, geofencing, alerts'],
      ['Integration Service', 'Data synchronization between GPS platform and WakeCap portal'],
      ['Observation Service', 'Unified incident timeline \u2014 receives alerts and maps to safety observations'],
      ['SignalR Hub', 'Real-time WebSocket connections for live map updates in the browser']
    ]
  ));

  c.push(pageBreak());

  // =======================================================================
  // 3. Technical Specifications
  // =======================================================================
  c.push(h1('3. Technical Specifications'));

  c.push(h2('3.1 GPS Tracker \u2014 Teltonika FMC130'));

  c.push(h3('3.1.1 Physical Specifications'));
  c.push(specTable(
    ['Parameter', 'Value', 'Unit'],
    [
      ['Dimensions (L x W x H)', '85.2 x 54.4 x 16.6', 'mm'],
      ['Weight', '[TBD]', 'g'],
      ['Enclosure Material', 'Black polycarbonate', '\u2014'],
      ['Mounting', 'DIN rail or bracket', '\u2014']
    ]
  ));

  c.push(h3('3.1.2 Electrical Specifications'));
  c.push(specTable(
    ['Parameter', 'Min', 'Typ', 'Max', 'Unit'],
    [
      ['Input Voltage', '10', '12/24', '30', 'V DC'],
      ['Current Draw (active)', '\u2014', '[TBD]', '[TBD]', 'mA'],
      ['Internal Battery', '\u2014', '450', '\u2014', 'mAh'],
      ['Battery Chemistry', '\u2014', 'Li-Polymer', '\u2014', '\u2014']
    ]
  ));

  c.push(h3('3.1.3 Environmental Specifications'));
  c.push(specTable(
    ['Parameter', 'Min', 'Max', 'Unit'],
    [
      ['Operating Temperature', '-40', '+85', '\u00B0C'],
      ['Storage Temperature', '-40', '+85', '\u00B0C'],
      ['Operating Humidity', '5', '95', '% RH (non-condensing)']
    ]
  ));

  c.push(h3('3.1.4 GNSS Performance'));
  c.push(specTable(
    ['Parameter', 'Value', 'Unit'],
    [
      ['Constellations', 'GPS, GLONASS, BeiDou, Galileo, SBAS', '\u2014'],
      ['Accuracy (CEP)', '< 2.5', 'm'],
      ['Cold Start TTFF', '< 35', 's'],
      ['Hot Start TTFF', '< 1', 's'],
      ['Tracking Sensitivity', '-165', 'dBm']
    ]
  ));

  c.push(h3('3.1.5 Cellular Specifications'));
  c.push(specTable(
    ['Parameter', 'Value'],
    [
      ['Technology', '4G LTE Cat 1 with 3G/2G fallback'],
      ['LTE Bands', 'B1, B3, B5, B7, B8, B20 (region-dependent)'],
      ['Data Protocol', 'TCP/UDP'],
      ['SIM Type', 'Micro-SIM (3FF)'],
      ['SIM Providers', 'Caburn M2MI, Jasper (Mobily), STC, Zain']
    ]
  ));

  c.push(h3('3.1.6 Interfaces'));
  c.push(specTable(
    ['Interface', 'Type', 'Quantity', 'Purpose'],
    [
      ['Digital Inputs', 'Active low / high', '4', 'Ignition, SOS, seatbelt, door'],
      ['Digital Outputs', 'Open collector', '3', 'Relay control, buzzer, LED'],
      ['Analog Inputs', '0\u201330 V DC', '2', 'Fuel sensor, temperature'],
      ['1-Wire', 'Dallas 1-Wire', '1', 'Temperature sensor, iButton'],
      ['RS232 / RS485', 'Serial', '1', 'External peripherals'],
      ['Bluetooth', 'BLE 4.0', 'Internal', 'Beacons, sensors, OBDII dongle'],
      ['CAN bus', 'Via ALLCAN-300', '1', 'Vehicle diagnostics (J1939/OBD-II)'],
      ['USB', 'Micro-USB', '1', 'Configuration only']
    ]
  ));

  c.push(h2('3.2 CAN Bus Adapter \u2014 Teltonika ALLCAN-300'));
  c.push(specTable(
    ['Parameter', 'Value'],
    [
      ['Purpose', 'Reads vehicle CAN bus data for advanced telematics'],
      ['Connection', 'CAN H and CAN L wires to vehicle, data cable to FMC130'],
      ['Vehicle Parameters', 'RPM, fuel level, odometer, engine load, throttle position, mass air flow, speed, auxiliary status'],
      ['Configuration', 'Program number per vehicle model; Autoscan feature available'],
      ['Protocol', 'CAN 2.0B / J1939 / OBD-II']
    ]
  ));

  c.push(h2('3.3 Platform Specifications'));
  c.push(specTable(
    ['Parameter', 'Value'],
    [
      ['Platform Version', 'Equipment Manager v1.8.1'],
      ['Tracking Engine', 'Traccar (open-source)'],
      ['Real-Time Protocol', 'SignalR (WebSocket)'],
      ['API Endpoints', '40+'],
      ['Automated Test Suites', '6'],
      ['Alert Rules Capacity', '258+ rules, 63,000+ device links'],
      ['Supported Browsers', 'Chrome (optimized), Firefox, Edge, Safari'],
      ['Report Export Format', 'Microsoft Excel (.xlsx)']
    ]
  ));

  c.push(pageBreak());

  // =======================================================================
  // 4. Components
  // =======================================================================
  c.push(h1('4. Components'));

  c.push(h2('4.1 Teltonika FMC130 GPS Tracker'));
  c.push(boldPrefix('Function: ', 'The FMC130 is the primary tracking device installed in each vehicle or piece of heavy equipment. It captures GPS position, vehicle telemetry, and sensor data, then transmits this information over cellular networks to the WakeCap cloud platform.'));
  c.push(boldPrefix('Physical Description: ', 'Compact black polycarbonate enclosure designed for concealed installation behind the vehicle dashboard or in the engine compartment. Features a 10-pin power/IO connector, SIM card slot, MicroSD slot, and optional external antenna ports.'));
  c.push(img('Teltonika FMC130 device photographed from three angles \u2014 front showing LED indicators, back showing mounting bracket holes, and side showing connector ports. Clean white background, studio lighting, with a ruler for scale reference'));

  c.push(boldPrefix('LED Indicators:', ''));
  c.push(specTable(
    ['LED', 'Color', 'Pattern', 'Meaning'],
    [
      ['GNSS', 'Green', 'Solid', 'GPS fix acquired'],
      ['GNSS', 'Green', 'Blinking', 'Searching for satellites'],
      ['GNSS', 'Off', '\u2014', 'GNSS module off'],
      ['Cellular', 'Blue', 'Solid', 'Connected to network'],
      ['Cellular', 'Blue', 'Blinking', 'Registering on network'],
      ['Cellular', 'Off', '\u2014', 'No cellular coverage'],
      ['Power', 'Red', 'Solid', 'External power connected'],
      ['Power', 'Red', 'Blinking', 'Running on internal battery'],
      ['Power', 'Off', '\u2014', 'Device powered off']
    ]
  ));

  c.push(h2('4.2 Teltonika ALLCAN-300 (CAN300) Adapter'));
  c.push(boldPrefix('Function: ', 'Optional CAN bus adapter that connects between the FMC130 and the vehicle\'s CAN bus network. Reads engine and vehicle parameters for advanced fleet analytics, fuel monitoring, and CO\u2082 emissions calculations.'));
  c.push(boldPrefix('Physical Description: ', 'Small adapter module with wiring harness. Connects to the vehicle\'s CAN H and CAN L wires on one end and to the FMC130 data port on the other.'));
  c.push(img('ALLCAN-300 CAN bus adapter with wiring harness spread out, showing CAN H (yellow) and CAN L (green) wires on the vehicle side, and the data connector on the FMC130 side'));

  c.push(safety('notice', 'The program number in the CAN300 configuration is critical because it tells the device how to interpret the vehicle\'s CAN bus data. Each vehicle model requires a specific program number for correct data decoding.'));

  c.push(h2('4.3 SIM Card'));
  c.push(boldPrefix('Function: ', 'Provides cellular connectivity for data transmission from the FMC130 to the WakeCap cloud. Pre-configured with APN settings for the WakeCap tracking platform.'));
  c.push(boldPrefix('Supported Providers:', ''));
  c.push(specTable(
    ['Provider', 'Platform', 'Coverage'],
    [
      ['Caburn Telecom (M2MI)', 'm2miportal.com', 'International / Multi-network'],
      ['Jasper Wireless (Mobily)', 'mobily.jasperwireless.com', 'KSA \u2014 Mobily network'],
      ['STC Direct', '\u2014', 'KSA \u2014 STC network'],
      ['Zain Direct', '\u2014', 'KSA \u2014 Zain network']
    ]
  ));

  c.push(h2('4.4 AVL Workstation (On-Site)'));
  c.push(boldPrefix('Function: ', 'Dedicated monitoring station at the project site office for real-time fleet monitoring by site automation engineers.'));
  c.push(specTable(
    ['Item', 'Specification'],
    [
      ['Computer', 'Windows PC with keyboard and mouse'],
      ['Display', '27" monitor'],
      ['Software', 'WakeCap Equipment Manager (web-based)'],
      ['Network', 'Internet connection (wired or Wi-Fi)']
    ]
  ));

  c.push(pageBreak());

  // =======================================================================
  // 5. Installation
  // =======================================================================
  c.push(h1('5. Installation'));

  c.push(safety('warning', 'ELECTRICAL HAZARD \u2014 Vehicle electrical systems operate at 12 V DC or 24 V DC. Disconnect the vehicle battery before wiring the AVL tracker to prevent short circuits and electrical shock.'));
  c.push(createSpacer(80));
  c.push(safety('caution', 'PINCH HAZARD \u2014 When routing cables in engine compartments, ensure cables are secured away from moving parts such as fan belts, pulleys, and hinges.'));

  c.push(h2('5.1 Prerequisites'));
  c.push(body('Before installation, confirm the following:'));
  c.push(checkItem('FMC130 tracker device with mounting hardware'));
  c.push(checkItem('Pre-configured SIM card (activated and tested)'));
  c.push(checkItem('ALLCAN-300 CAN adapter (if CAN bus integration required)'));
  c.push(checkItem('Wiring tools: wire strippers, crimping tool, heat-shrink tubing, zip ties'));
  c.push(checkItem('Multimeter for voltage verification'));
  c.push(checkItem('Vehicle ignition source location identified'));
  c.push(checkItem('Teltonika Configurator Tool installed on laptop (for configuration)'));
  c.push(checkItem('WakeCap Equipment Manager portal credentials'));

  c.push(h2('5.2 Light Vehicle Installation'));

  c.push(h3('5.2.1 Wiring'));
  c.push(step(1, 'Disconnect the vehicle battery negative terminal.'));
  c.push(step(2, 'Route the FMC130 power cable harness from the installation location to the vehicle battery.'));
  c.push(step(3, 'Connect the red power wire to the vehicle battery positive (+) terminal.'));
  c.push(step(4, 'Connect the black ground wire to the vehicle battery negative (\u2212) terminal.'));
  c.push(step(5, 'Locate the vehicle ignition wire at the fuse box or ignition switch.'));
  c.push(step(6, 'Connect the orange ignition wire to the identified ignition source.'));

  c.push(callout('important', 'The ignition wire MUST be connected to the actual vehicle ignition source \u2014 not the battery. Without a proper ignition connection, the system cannot distinguish between engine running, idle, and parked states. Reports for stop, idle, and running times depend on this connection.'));

  c.push(step(7, 'Verify all connections with a multimeter: Power wire: 12 V DC or 24 V DC at battery. Ignition wire: 0 V when ignition OFF, 12/24 V when ignition ON.'));
  c.push(step(8, 'Reconnect the vehicle battery negative terminal.'));

  c.push(h3('5.2.2 Device Mounting'));
  c.push(step(9, 'Insert the pre-configured SIM card into the FMC130 SIM slot.'));
  c.push(step(10, 'Mount the FMC130 using the bracket and hardware. Preferred locations: behind the dashboard (concealed), under the driver seat (concealed), in the glove compartment (accessible).'));
  c.push(step(11, 'Secure all cables with zip ties. Ensure no loose wires near pedals or moving parts.'));
  c.push(step(12, 'Verify the device powers on \u2014 observe red power LED solid, blue cellular LED blinking.'));

  c.push(h3('5.2.3 Sensor Connections (Optional)'));
  c.push(specTable(
    ['Sensor', 'Wire Color', 'Digital Input', 'Notes'],
    [
      ['SOS Button', '[TBD]', 'DIN1', 'Connect to dashboard-mounted panic button'],
      ['Seatbelt', '[TBD]', 'DIN2', 'Connect to seatbelt buckle switch'],
      ['Door Sensor', '[TBD]', 'DIN3', 'Connect to door open/close switch']
    ]
  ));

  c.push(h2('5.3 Heavy Equipment Installation'));
  c.push(body('Heavy equipment installation follows the same wiring principles as light vehicles with these differences:'));

  c.push(safety('notice', 'The ignition source location varies significantly between equipment types (excavators, cranes, bulldozers, loaders). Consult the equipment manufacturer\'s electrical schematic to identify the correct ignition wire before installation.'));

  c.push(step(1, 'Identify the ignition source on the heavy equipment. Common locations: Excavators \u2014 Main fuse box near operator cabin; Cranes \u2014 Electrical panel behind operator console; Loaders \u2014 Fuse block under dashboard.'));
  c.push(step(2, 'Follow Steps 1\u201312 from Section 5.2 for wiring and mounting.'));
  c.push(step(3, 'Install the ALLCAN-300 CAN adapter (if required):'));
  c.push(subStep('a', 'Locate the vehicle CAN bus wires (CAN H and CAN L) \u2014 typically in the diagnostic connector area.'));
  c.push(subStep('b', 'Wire the CAN300 CAN H (yellow) to vehicle CAN H.'));
  c.push(subStep('c', 'Wire the CAN300 CAN L (green) to vehicle CAN L.'));
  c.push(subStep('d', 'Connect the CAN300 data cable to the FMC130.'));

  c.push(callout('important', 'Complete ALL FMC130 wiring to the vehicle BEFORE connecting the CAN300 adapter. The CAN300 configuration must be performed after the FMC130 is fully operational.'));

  c.push(step(4, 'Configure the CAN300 program number using the Teltonika Configurator:'));
  c.push(subStep('a', 'Connect laptop to FMC130 via USB.'));
  c.push(subStep('b', 'Open Teltonika Configurator Tool.'));
  c.push(subStep('c', 'Navigate to CAN bus settings.'));
  c.push(subStep('d', 'Enter the correct program number for the vehicle model (or use Autoscan).'));
  c.push(subStep('e', 'Save configuration and disconnect.'));

  c.push(h2('5.4 Post-Installation Verification'));
  c.push(body('After completing installation on any vehicle type:'));
  c.push(step(1, 'Turn on the vehicle ignition.'));
  c.push(step(2, 'Confirm LED status: Power LED: Solid red; Cellular LED: Solid blue (connected); GNSS LED: Solid green (GPS fix acquired).'));
  c.push(step(3, 'Log in to the WakeCap Equipment Manager portal.'));
  c.push(step(4, 'Verify the device appears on the live map with correct position.'));
  c.push(step(5, 'Test ignition detection: Turn ignition off and on; confirm status change in portal.'));
  c.push(step(6, 'Test movement: Drive the vehicle a short distance; confirm route appears on map.'));

  c.push(h2('5.5 AVL Device Transfer (Client-Owned Devices)'));
  c.push(body('For projects where the client transfers existing Teltonika devices to the WakeCap platform:'));

  c.push(boldPrefix('Included in transfer scope:', ''));
  c.push(bullet('First-time installation of new WakeCap SIM card'));
  c.push(bullet('First-time device configuration and linking to WakeCap platform'));
  c.push(bullet('Operational support during subscription period'));

  c.push(boldPrefix('Not included (unit pricing applies):', ''));
  c.push(bullet('Demobilize hardware from Vehicle A and reinstall in Vehicle B (200 SAR per device)'));

  c.push(boldPrefix('Out of scope:', ''));
  c.push(bullet('Hardware warranty on transferred devices'));
  c.push(bullet('Repair or replacement in case of damage'));

  c.push(pageBreak());

  // =======================================================================
  // 6. Operation
  // =======================================================================
  c.push(h1('6. Operation'));

  c.push(h2('6.1 Equipment Manager Portal'));
  c.push(body('The WakeCap Equipment Manager portal is the primary interface for all AVL operations. Access it via any modern web browser at the WakeCap portal URL.'));

  c.push(h3('6.1.1 Fleet Dashboard'));
  c.push(body('The dashboard provides a real-time overview of the entire fleet at a glance.'));
  c.push(img('WakeCap Equipment Manager Fleet Dashboard \u2014 top row: 4 KPI cards, middle row: Mobilization and Connectivity charts, bottom row: Equipment Distribution, Compliance Timeline, Alert Activity heatmap'));

  c.push(boldPrefix('Dashboard Widgets:', ''));
  c.push(specTable(
    ['Widget', 'Description'],
    [
      ['Mobilization Breakdown', 'Mobilized vs. demobilized equipment counts'],
      ['Tracker Connectivity', 'Online, offline, and stale tracker status'],
      ['Equipment Distribution', 'Breakdown by equipment type (cranes, trucks, excavators, etc.)'],
      ['Compliance Timeline', 'Inspection and certification compliance over time'],
      ['Alert Activity', 'Recent alert frequency and type distribution'],
      ['CO\u2082 Summary', 'Total emissions, fuel usage, and distance metrics'],
      ['Offline Tracker Detection', 'Devices that have not reported in a configurable time window']
    ]
  ));

  c.push(h3('6.1.2 Live Tracking Map'));
  c.push(body('The interactive map displays all tracked vehicles in real-time with automatic position updates.'));
  c.push(img('WakeCap Equipment Manager Live Map \u2014 satellite view of construction site with custom vehicle icons, info panel, geofence boundaries, and frosted glass sidebar'));

  c.push(boldPrefix('Map Features:', ''));
  c.push(bullet('Custom vehicle icons per equipment type'));
  c.push(bullet('Per-device live tracking toggle'));
  c.push(bullet('Route history playback with speed-based color coding'));
  c.push(bullet('Route statistics: distance, max/avg speed, moving time'));
  c.push(bullet('Speed on hover over any route point'));
  c.push(bullet('Real-time marker color updates when device status changes'));
  c.push(bullet('Geofence boundaries displayed with customizable colors and opacity'));
  c.push(bullet('Frosted glass transparent sidebar and info panels'));

  c.push(h3('6.1.3 Alert System'));
  c.push(body('The Equipment Manager includes 20+ configurable alert types for comprehensive fleet safety and compliance monitoring.'));

  c.push(boldPrefix('Alert Types:', ''));
  c.push(specTable(
    ['Category', 'Alert', 'Description'],
    [
      ['Speed', 'Overspeed', 'Speed exceeds configured threshold'],
      ['Geofence', 'Geofence Entry', 'Vehicle enters a defined geofence boundary'],
      ['Geofence', 'Geofence Exit', 'Vehicle exits a defined geofence boundary'],
      ['Ignition', 'Ignition On', 'Vehicle engine started'],
      ['Ignition', 'Ignition Off', 'Vehicle engine stopped'],
      ['Safety', 'SOS', 'Emergency button pressed by driver'],
      ['Safety', 'Harsh Braking', 'Sudden deceleration detected by accelerometer'],
      ['Safety', 'Harsh Acceleration', 'Sudden acceleration detected by accelerometer'],
      ['Safety', 'Seatbelt Compliance', 'Driver seatbelt not fastened while vehicle in motion'],
      ['Behavior', 'Idle', 'Vehicle stationary with engine running beyond threshold'],
      ['Behavior', 'Unauthorized Stop', 'Vehicle stopped in restricted area'],
      ['Device', 'Offline Detection', 'Tracker loses connectivity beyond threshold'],
      ['Device', 'Stale GPS', 'Device reporting outdated GPS coordinates']
    ]
  ));

  c.push(boldPrefix('Alert Configuration:', ''));
  c.push(bullet('Custom thresholds per alert type (e.g., speed limit, idle duration)'));
  c.push(bullet('Custom schedules (e.g., only monitor during working hours)'));
  c.push(bullet('Notification channels: Email, Push notification, Silent (log only)'));
  c.push(bullet('Intelligent consolidation: Ongoing violations are merged into a single alert with accurate duration and location'));

  c.push(callout('tip', 'Use intelligent alert consolidation to reduce alert fatigue. Instead of receiving repeated alerts for a single speeding event, the system generates one alert with the full duration and route segment where the violation occurred.'));

  c.push(h3('6.1.4 Geofence Management'));
  c.push(img('Geofence Management panel \u2014 construction site map with 3 geofences (Site Boundary, Exclusion Zone, Entry/Exit Point), side panel with toggle switches and color pickers'));

  c.push(bullet('Draw geofences directly on the map using point-and-click tools'));
  c.push(bullet('Customize colors and opacity per geofence'));
  c.push(bullet('Import/Export geofences as GeoJSON files for cross-system sharing'));
  c.push(bullet('Toggle visibility of individual geofences on the map'));
  c.push(bullet('Link alerts to geofences for automatic entry/exit notifications'));

  c.push(h3('6.1.5 Reports'));
  c.push(body('The Equipment Manager provides 12 reports across two categories:'));

  c.push(boldPrefix('Fleet Reports (6):', ''));
  c.push(specTable(
    ['Report', 'Description', 'Key Fields'],
    [
      ['Driver Timesheet', 'Work hours and activity per driver', 'Start, end, duration, distance'],
      ['Fleet Summary', 'Fleet-wide statistics overview', 'Total vehicles, active, idle, offline'],
      ['Trip Status', 'Individual trip details with route', 'Start/end location, distance, speed'],
      ['Track Data', 'Raw GPS track data', 'Timestamp, lat/lon, speed, heading'],
      ['Device List', 'All registered devices and status', 'IMEI, status, last seen, project'],
      ['Offline Devices', 'Devices that have gone offline', 'IMEI, last seen, offline duration']
    ]
  ));

  c.push(boldPrefix('Exportable Reports (6 \u2014 One-Click Excel Download):', ''));
  c.push(specTable(
    ['Report', 'Description', 'Key Fields'],
    [
      ['Alert History', 'Historical alert data', 'Alert type, timestamp, vehicle, location, duration'],
      ['Compliance Status', 'Equipment compliance tracking', 'Equipment, inspection status, expiry'],
      ['CO\u2082 Emissions', 'Per-equipment emissions breakdown', 'Equipment, fuel type, consumption, CO\u2082 kg'],
      ['SIM Health', 'SIM card status and data usage', 'ICCID, provider, data used, status'],
      ['Equipment Utilization', 'Usage statistics per equipment', 'Running hours, idle hours, distance, trips'],
      ['Device Health', 'Device performance metrics', 'Health score, GPS quality, connectivity, power']
    ]
  ));

  c.push(safety('notice', 'Reports use ignition-based boundaries \u2014 data is trimmed to actual engine ON/OFF times, eliminating parked noise from driver timesheets and utilization calculations.'));

  c.push(h3('6.1.6 Device Health Dashboard'));
  c.push(img('Device Health Dashboard \u2014 table of tracked devices with Health Score, GPS Quality, Connectivity, Power Stability, Data Freshness columns, expanded device detail with 7 horizontal progress bars'));

  c.push(boldPrefix('Health Indicators (7 per device):', ''));
  c.push(specTable(
    ['Indicator', 'What It Measures'],
    [
      ['GPS Quality', 'Satellite count, HDOP, fix type'],
      ['Connectivity', 'Cellular signal strength, connection stability'],
      ['Power Stability', 'External power voltage, battery backup status'],
      ['Data Freshness', 'Time since last data transmission'],
      ['Device Temperature', 'Internal temperature within operating range'],
      ['Memory Usage', 'Onboard buffer utilization'],
      ['Firmware Status', 'Current firmware version vs. latest available']
    ]
  ));

  c.push(bullet('Dynamic health scores calculated from all 7 indicators'));
  c.push(bullet('Stale GPS detection catches devices reporting outdated coordinates'));
  c.push(bullet('On-demand Teltonika diagnostics for detailed device status'));
  c.push(bullet('Fleet-wide health overview for quick identification of devices needing attention'));

  c.push(h3('6.1.7 SIM Management'));
  c.push(specTable(
    ['Feature', 'Description'],
    [
      ['ICCID Copy', 'One-click copy of SIM serial number'],
      ['Data Usage', 'SIM data consumption visible per device'],
      ['ICCID Validation', 'Rejects invalid serial numbers on SIM creation'],
      ['Live SIM Status', 'Real-time status from Caburn M2MI and Jasper platforms'],
      ['Provider Data', 'Usage, activation status, and provider info in health summaries']
    ]
  ));

  c.push(h3('6.1.8 Equipment Registration'));
  c.push(body('The Equipment Manager uses an 8-step wizard for registering new equipment:'));
  c.push(step(1, 'Basic Information \u2014 Equipment name, type, plate number'));
  c.push(step(2, 'Vehicle Details \u2014 Make, model, year, VIN'));
  c.push(step(3, 'Tracker Assignment \u2014 Link IMEI to equipment (searchable dropdown)'));
  c.push(step(4, 'SIM Card \u2014 Associate SIM card (ICCID)'));
  c.push(step(5, 'Specifications \u2014 PWAS type, door numbers, TP calibration'));
  c.push(step(6, 'Inspection Data \u2014 CO\u2082 inspection records, compliance dates'));
  c.push(step(7, 'Operator Assignment \u2014 Assign driver/operator to equipment'));
  c.push(step(8, 'Review & Confirm \u2014 Final review before submission'));

  c.push(callout('tip', 'Use the Smart IMEI Search feature to quickly find available trackers by typing IMEI, equipment type, or plate number in the searchable dropdown.'));

  c.push(h3('6.1.9 CO\u2082 Emissions Tracking'));
  c.push(body('The platform calculates CO\u2082 emissions using a combination of automatic telemetry and manual inspection data.'));

  c.push(boldPrefix('Automatic Data (from Traccar):', ''));
  c.push(bullet('Engine hours (active vs. idle)'));
  c.push(bullet('Distance traveled'));
  c.push(bullet('Active time vs. idle time'));

  c.push(boldPrefix('Manual Inspection Data (Testo 300 probe):', ''));
  c.push(bullet('O\u2082 percentage'));
  c.push(bullet('CO concentration'));
  c.push(bullet('NO concentration'));
  c.push(bullet('Draft pressure'));
  c.push(bullet('Flue gas temperature'));
  c.push(bullet('Ambient temperature'));

  c.push(boldPrefix('Calculation Method:', ''));
  c.push(bullet('Stationary equipment (bulldozers, excavators): CO\u2082 estimated by Ignition On Time (hours) x fuel consumption rate (L/h)'));
  c.push(bullet('Commuting equipment (buses, tankers, loaders): CO\u2082 estimated by Trip Distance (km) x fuel consumption rate (L/km)'));
  c.push(bullet('Fuel-based CO\u2082 with predefined emission factors per fuel type'));
  c.push(bullet('Default consumption rates per equipment type with idle consumption logic'));
  c.push(bullet('Smart fallback to manual input if tracker data fails'));

  c.push(pageBreak());

  // =======================================================================
  // 7. Maintenance
  // =======================================================================
  c.push(h1('7. Maintenance'));

  c.push(h2('7.1 Maintenance Schedule'));
  c.push(specTable(
    ['Task', 'Frequency', 'Procedure'],
    [
      ['Check tracker power connection', 'Monthly', 'Verify red power LED is solid; check wiring for corrosion'],
      ['Verify GPS fix quality', 'Monthly', 'Confirm green GNSS LED is solid; check health dashboard'],
      ['Review SIM data usage', 'Monthly', 'Check SIM Management panel for unusual consumption'],
      ['Inspect cable routing', 'Quarterly', 'Ensure cables are secure and away from moving parts'],
      ['Review device health scores', 'Quarterly', 'Check Device Health Dashboard for degraded devices'],
      ['Firmware update check', 'Quarterly', 'Compare firmware version against latest on Teltonika FOTA'],
      ['CAN300 data validation', 'Quarterly', 'Verify CAN bus parameters match expected vehicle readings'],
      ['Full fleet health audit', 'Annually', 'Run diagnostics on all devices; replace degraded units']
    ]
  ));

  c.push(h2('7.2 Routine Inspection Checklist'));
  c.push(checkItem('Power LED solid red on all trackers'));
  c.push(checkItem('Cellular LED solid blue (connected) on all trackers'));
  c.push(checkItem('GNSS LED solid green (GPS fix) on all trackers'));
  c.push(checkItem('No "offline" alerts in past 24 hours'));
  c.push(checkItem('Health scores above 70% for all devices'));
  c.push(checkItem('SIM data usage within expected range'));
  c.push(checkItem('All geofences active and correctly positioned'));
  c.push(checkItem('Alert notifications being received'));

  c.push(h2('7.3 Firmware Updates'));
  c.push(body('Firmware updates for the FMC130 are distributed via Teltonika FOTA (Firmware Over The Air):'));
  c.push(step(1, 'Log in to the Teltonika FOTA portal at fota.teltonika.lt.'));
  c.push(step(2, 'Select the device(s) to update.'));
  c.push(step(3, 'Choose the target firmware version.'));
  c.push(step(4, 'Schedule the update (devices must be online to receive updates).'));
  c.push(step(5, 'Verify the update completes successfully in the FOTA dashboard.'));

  c.push(safety('notice', 'Firmware updates require the device to be online and connected to cellular network. Schedule updates during working hours when vehicles are in areas with good cellular coverage.'));

  c.push(pageBreak());

  // =======================================================================
  // 8. Troubleshooting
  // =======================================================================
  c.push(h1('8. Troubleshooting'));

  c.push(h2('8.1 Common Issues'));
  c.push(specTable(
    ['Symptom', 'Likely Cause', 'Quick Checks', 'Fix', 'Escalate When'],
    [
      ['Device not appearing on map', 'No cellular connection', 'Check blue LED; verify SIM is active', 'Replace SIM or send SMS command to reset', 'Device still offline after SIM replacement'],
      ['GPS position not updating', 'Stale GPS fix', 'Check green LED; check Device Health', 'Move vehicle to open sky area; reboot device', 'Position stuck for > 24 hours'],
      ['Incorrect speed readings', 'CAN300 program mismatch', 'Compare CAN speed with vehicle speedometer', 'Update CAN300 program number for vehicle model', 'Multiple vehicles showing wrong data'],
      ['No ignition detection', 'Ignition wire not connected', 'Check orange wire; measure voltage at ignition', 'Reconnect ignition wire to correct source', 'Voltage present but ignition not detected'],
      ['High SIM data usage', 'Short reporting interval', 'Check reporting interval configuration', 'Increase interval to 2 min (default)', 'Usage exceeds plan limit'],
      ['Alerts not triggering', 'Alert rule misconfigured', 'Check alert thresholds and schedules', 'Reconfigure alert rules in Equipment Manager', 'Alerts configured correctly but not firing'],
      ['Device health score low', 'Multiple degraded indicators', 'Run on-demand Teltonika diagnostics', 'Address specific failing indicators', 'Score below 30% after diagnostics'],
      ['Route history gaps', 'Cellular coverage gaps', 'Check cellular coverage map for route area', 'Enable onboard data buffering (store-and-forward)', 'Gaps persist in areas with confirmed coverage']
    ]
  ));

  c.push(h2('8.2 LED Status Reference'));
  c.push(specTable(
    ['Power (Red)', 'Cellular (Blue)', 'GNSS (Green)', 'Status', 'Action'],
    [
      ['Solid', 'Solid', 'Solid', 'Normal operation', 'None required'],
      ['Solid', 'Solid', 'Blinking', 'Searching for GPS', 'Move to open sky; wait 1\u20132 minutes'],
      ['Solid', 'Blinking', 'Any', 'Registering on network', 'Wait 30 seconds; check SIM if persistent'],
      ['Blinking', 'Any', 'Any', 'On backup battery', 'Check vehicle power connection'],
      ['Off', 'Off', 'Off', 'No power', 'Check battery connection and fuse']
    ]
  ));

  c.push(h2('8.3 Diagnostic Procedures'));

  c.push(h3('8.3.1 Bringing Offline Devices Back Online'));
  c.push(step(1, 'Send SMS command to the device from the management platform.'));
  c.push(step(2, 'Wait 60 seconds for the device to respond.'));
  c.push(step(3, 'Check the Equipment Manager portal for device status change.'));
  c.push(body('If the device remains offline:'));
  c.push(subStep('a', 'Visit the vehicle and verify power connection.'));
  c.push(subStep('b', 'Check SIM card is properly seated.'));
  c.push(subStep('c', 'Replace SIM card if damaged or deactivated.'));
  c.push(subStep('d', 'Load new configuration via USB using Teltonika Configurator.'));

  c.push(h3('8.3.2 CAN Bus Data Validation'));
  c.push(step(1, 'Open the Equipment Manager portal and navigate to the vehicle detail page.'));
  c.push(step(2, 'Compare the following CAN bus readings with the vehicle instrument panel: RPM, Speed, Fuel level, Odometer.'));
  c.push(step(3, 'If values differ, update the CAN300 program number:'));
  c.push(subStep('a', 'Connect laptop to FMC130 via USB.'));
  c.push(subStep('b', 'Open Teltonika Configurator \u2192 CAN bus settings.'));
  c.push(subStep('c', 'Use Autoscan to discover the correct program number.'));
  c.push(subStep('d', 'Save and verify readings match.'));

  c.push(h2('8.4 When to Contact Support'));
  c.push(body('Contact the WakeCap Sakaka Squad support team when:'));
  c.push(bullet('Device remains offline after SIM replacement and configuration reset'));
  c.push(bullet('Health score remains below 30% after addressing all indicators'));
  c.push(bullet('CAN bus data consistently incorrect despite Autoscan'));
  c.push(bullet('Multiple devices in the same area experience simultaneous issues'));
  c.push(bullet('SIM data usage anomaly cannot be explained by configuration'));
  c.push(bullet('Firmware update fails repeatedly'));

  c.push(pageBreak());

  // =======================================================================
  // 9. Safety Information
  // =======================================================================
  c.push(h1('9. Safety Information'));

  c.push(h2('9.1 General Safety'));
  c.push(safety('warning', 'VEHICLE SAFETY \u2014 Never install, adjust, or troubleshoot AVL devices while the vehicle is in motion. All installation and maintenance work must be performed with the vehicle stationary, engine off, and parking brake engaged.'));
  c.push(createSpacer(80));
  c.push(safety('caution', 'BATTERY HAZARD \u2014 Vehicle batteries contain sulfuric acid and produce hydrogen gas. Wear appropriate PPE (safety glasses, gloves) when working near batteries. Do not create sparks near battery terminals.'));

  c.push(h2('9.2 Electrical Safety'));
  c.push(safety('warning', 'ELECTRICAL HAZARD \u2014 Disconnect the vehicle battery negative terminal before performing any wiring work. Verify circuits are de-energized with a multimeter before touching exposed conductors.'));

  c.push(bullet('Always use insulated tools when working on vehicle electrical systems'));
  c.push(bullet('Verify wire gauges match device requirements'));
  c.push(bullet('Use heat-shrink tubing on all splices and connections'));
  c.push(bullet('Route cables away from heat sources (exhaust manifolds, turbochargers)'));
  c.push(bullet('Fuse the power connection to protect against short circuits'));

  c.push(h2('9.3 Environmental Considerations'));
  c.push(bullet('The FMC130 is rated for operation from \u221240 \u00B0C to +85 \u00B0C. In extreme heat environments, install the device in a shaded or ventilated location within the vehicle.'));
  c.push(bullet('Protect cable entry points against moisture ingress in wash-down environments.'));
  c.push(bullet('In dusty environments (desert construction sites), inspect cable connections quarterly for sand and dust accumulation.'));

  c.push(h2('9.4 PPE Requirements'));
  c.push(specTable(
    ['Task', 'Required PPE'],
    [
      ['Tracker installation', 'Safety glasses, gloves, hard hat (on site)'],
      ['Battery wiring', 'Safety glasses, acid-resistant gloves'],
      ['Engine compartment work', 'Safety glasses, heat-resistant gloves'],
      ['Working at height (on equipment)', 'Hard hat, safety harness, fall protection']
    ]
  ));

  c.push(h2('9.5 Emergency Procedures'));
  c.push(body('In the event of a vehicle safety incident:'));
  c.push(step(1, 'Activate the SOS button on the vehicle (if equipped) to send an immediate alert through the AVL system.'));
  c.push(step(2, 'Follow site-specific emergency procedures.'));
  c.push(step(3, 'Report the incident to the site safety officer.'));
  c.push(body('WakeCap Observation Service will log the SOS event with timestamp, GPS coordinates, and vehicle ID for incident investigation.'));

  c.push(pageBreak());

  // =======================================================================
  // Appendix A: Glossary
  // =======================================================================
  c.push(h1('Appendix A: Glossary'));
  c.push(specTable(
    ['Term', 'Definition'],
    [
      ['AVL', 'Automatic Vehicle Location \u2014 GPS-based real-time vehicle tracking system'],
      ['CAN bus', 'Controller Area Network \u2014 vehicle communication bus for engine and diagnostic data'],
      ['CEP', 'Circular Error Probable \u2014 radius of the circle containing 50% of GPS position fixes'],
      ['FOTA', 'Firmware Over The Air \u2014 remote firmware update mechanism'],
      ['GeoJSON', 'Open standard format for encoding geographic data structures'],
      ['GNSS', 'Global Navigation Satellite System \u2014 satellite-based positioning (GPS, GLONASS, BeiDou, Galileo)'],
      ['HDOP', 'Horizontal Dilution of Precision \u2014 measure of GPS horizontal accuracy quality'],
      ['ICCID', 'Integrated Circuit Card Identifier \u2014 unique 20-digit SIM card serial number'],
      ['IMEI', 'International Mobile Equipment Identity \u2014 unique 15-digit device identifier'],
      ['J1939', 'SAE standard for CAN bus communication in heavy-duty vehicles'],
      ['OBD-II', 'On-Board Diagnostics version 2 \u2014 standardized vehicle diagnostic interface'],
      ['PWAS', 'Proximity Warning Alert System \u2014 vehicle-to-worker proximity detection'],
      ['SignalR', 'Microsoft library for real-time web communication via WebSocket'],
      ['TTFF', 'Time To First Fix \u2014 time required for GNSS receiver to determine position'],
      ['Traccar', 'Open-source GPS tracking platform used as the WakeCap tracking engine']
    ]
  ));

  c.push(pageBreak());

  // =======================================================================
  // Appendix B: Data Reporting Intervals
  // =======================================================================
  c.push(h1('Appendix B: Data Reporting Intervals'));
  c.push(specTable(
    ['Interval', 'Data Points / Hour', 'Approx Monthly Data', 'Use Case'],
    [
      ['10 seconds', '360', 'High', 'Client-requested high-accuracy tracking'],
      ['15 seconds', '240', 'High', 'Enhanced monitoring'],
      ['30 seconds', '120', 'Moderate', '\u2014'],
      ['1 minute', '60', 'Moderate', '\u2014'],
      ['2 minutes (default)', '30', 'Standard', 'Normal fleet tracking'],
      ['5 minutes', '12', 'Low', 'Battery conservation']
    ]
  ));

  c.push(callout('important', 'Shorter reporting intervals significantly increase SIM data consumption. Conduct a 1-week pilot test on 3\u20134 vehicles before deploying shorter intervals fleet-wide to validate data usage against SIM plan limits.'));

  c.push(pageBreak());

  // =======================================================================
  // Appendix C: Supported Equipment Types
  // =======================================================================
  c.push(h1('Appendix C: Supported Equipment Types'));
  c.push(specTable(
    ['Category', 'Equipment Types'],
    [
      ['Light Vehicles', 'Pickup trucks, SUVs, sedans, vans'],
      ['Buses', 'Worker transport buses, minibuses'],
      ['Heavy Vehicles', 'Dump trucks, tanker trucks, concrete mixers, flatbed trucks'],
      ['Earthmoving', 'Excavators, bulldozers, wheel loaders, graders, backhoes'],
      ['Lifting', 'Tower cranes, mobile cranes, forklifts, boom lifts'],
      ['Specialized', 'Generators, compressors, welding machines (with engines)']
    ]
  ));

  c.push(pageBreak());

  // =======================================================================
  // Appendix D: Version History
  // =======================================================================
  c.push(h1('Appendix D: Version History'));
  c.push(specTable(
    ['Version', 'Date', 'Changes'],
    [
      ['1.0', '2026-04-12', 'Initial release']
    ]
  ));

  c.push(pageBreak());

  // =======================================================================
  // Appendix E: Contact Information
  // =======================================================================
  c.push(h1('Appendix E: Contact Information'));
  c.push(specTable(
    ['', ''],
    [
      ['Company', 'WakeCap Technologies'],
      ['Support Team', 'Sakaka Squad (Equipment Manager)'],
      ['Portal', 'portal.wakecap.com'],
      ['General', 'support@wakecap.com'],
      ['Website', 'www.wakecap.com']
    ]
  ));

  c.push(createSpacer(400));

  // Footer copyright
  const sizes = FONT_SIZES.versionA;
  c.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 600 },
    children: [
      new TextRun({
        text: '\u00A9 2026 WakeCap Technologies. All rights reserved.',
        italics: true,
        size: sizes.caption,
        font: 'Source Sans Pro',
        color: COLORS.slate
      })
    ]
  }));
  c.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [
      new TextRun({
        text: 'WC-AVL-PM-v1.0 \u2014 Revision Date: 2026-04-12',
        italics: true,
        size: sizes.caption,
        font: 'Source Sans Pro',
        color: COLORS.slate
      })
    ]
  }));

  return c;
}

// ---------------------------------------------------------------------------
// Main — build and save document
// ---------------------------------------------------------------------------

async function main() {
  console.log('Building WC-AVL-PM-v1.0.docx ...');

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
      title: 'WakeCap AVL System \u2014 Product Manual',
      subject: 'Automatic Vehicle Location & Equipment Tracking Platform',
      keywords: 'WakeCap, AVL, GPS Tracking, Fleet Management, Teltonika FMC130, Equipment Manager, IoT',
      creator: 'WakeCap Technologies'
    }
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.resolve(__dirname, 'WC-AVL-PM-v1.0.docx');
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

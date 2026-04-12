/**
 * WakeCap PWAS — Product Manual Generator
 *
 * Generates WC-PWAS-PM-v1.0.docx from structured content using
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
const DOC_ID = 'WC-PWAS-PM-v1.0';
const REVISION_DATE = '2026-04-12';
const PRODUCT_NAME = 'WakeCap PWAS';
const DOC_TYPE = 'Product Manual';
const SUBTITLE = 'AI-Based Collision Avoidance System for Construction Equipment';

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

/** Bold-lead paragraph: "**Lead** \u2014 rest of text" */
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

/** Checkbox-style bullet item */
function checkItem(text) {
  const sizes = FONT_SIZES.versionA;
  return new Paragraph({
    spacing: { after: 80 },
    indent: { left: 360 },
    children: [
      new TextRun({ text: '\u2610 ', size: sizes.body, font: 'Source Sans Pro', color: COLORS.charcoal }),
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
  c.push(img('WakeCap PWAS hero shot \u2014 a large yellow excavator on a construction site with Blaxtair cameras visibly mounted on the rear and sides of the cab, Flash Beacon strobe light on top of the cab, and a worker in full PPE walking nearby. The Smart Display inside the cab is visible through the windshield showing the camera feed with a green detection zone overlay around the worker.'));

  c.push(createSpacer(100));

  // Title block info table
  c.push(specTable(
    ['', ''],
    [
      ['System', 'Blaxtair 5 (BXT5 Ethernet)'],
      ['Document', 'WC-PWAS-PM-v1.0'],
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
  c.push(body('The WakeCap PWAS (Proximity Warning and Alert System) is an AI-based collision avoidance solution designed to prevent accidents between heavy construction equipment and pedestrian workers. The system uses Blaxtair\u2019s 3D stereo camera technology with onboard artificial intelligence to detect humans in real time, alert equipment operators through visual and audible alarms, and provide configurable outputs for automated vehicle intervention.'));
  c.push(body('PWAS is mandatory on all heavy equipment at Aramco construction sites. Every subcontractor must install a proximity warning system before equipment enters the work zone. The WakeCap PWAS solution leverages Blaxtair \u2014 a French technology leader in the pedestrian detection vertical (Arcure Group) \u2014 to deliver AI-grade detection performance that far exceeds the basic camera-and-beep systems commonly deployed by subcontractors.'));
  c.push(body('The system differentiates between humans and other objects (vehicles, structures, materials), detecting pedestrians even when partially occluded by obstacles, in dusty conditions, under backlighting, and in PPE-heavy environments with reflective clothing. With a detection latency of less than 200 ms and configurable warning and danger zones, the PWAS system provides operators with the critical reaction time needed to prevent collisions on active construction sites.'));

  c.push(h2('1.2 Key Features'));
  c.push(boldLead('AI-Powered 3D Detection', 'Blaxtair\u2019s stereo camera with onboard AI identifies pedestrians in real time, including partial body detection through obstructions'));
  c.push(boldLead('< 200 ms Latency', 'Sub-200-millisecond detection-to-alert response for life-critical reaction time'));
  c.push(boldLead('Human-Only Detection', 'Distinguishes workers from vehicles, structures, and materials to minimize false alarms and work disruption'));
  c.push(boldLead('Multi-Zone Alerting', 'Configurable warning zone and danger zone with graduated visual, audible, and electrical responses'));
  c.push(boldLead('360-Degree Coverage', 'Up to 4 cameras per vehicle for complete blind-spot elimination'));
  c.push(boldLead('In-Cabin Smart Display', 'Real-time camera feed with detection zone overlay and alert indicators for the operator'));
  c.push(boldLead('External Flash Beacon', 'High-visibility strobe light alerts pedestrians of detected proximity'));
  c.push(boldLead('2 Configurable Outputs', 'Discrete electrical signals for driving alarms, braking relays, or engine shutdown'));
  c.push(boldLead('All-Weather Operation', 'Designed for dust, rain, backlighting, reflections, and extreme temperatures on construction sites'));

  c.push(h2('1.3 Package Contents'));
  c.push(specTable(
    ['Item', 'Quantity', 'Description'],
    [
      ['Blaxtair MR260 AI Camera', '1\u20134', '3D stereo camera with onboard AI processor'],
      ['Blaxtair Smart Display', '1', 'In-cabin 7" display with camera feed and alert overlay'],
      ['Blaxtair Flash Beacon', '1', 'External high-intensity strobe alarm'],
      ['Ethernet Cable Set', '1 set', 'Pre-terminated cables for camera-to-display connection'],
      ['Power Cable Harness', '1', 'Vehicle power connection (12/24 V DC)'],
      ['Mounting Brackets & Hardware', '1 set', 'Camera, display, and beacon mounting hardware'],
      ['Installation Manual', '1', 'BXT5 Ethernet Installation Manual (EN)'],
      ['Configuration Guide', '1', 'Zone configuration and output setup guide']
    ]
  ));

  c.push(h2('1.4 Product Identification'));
  c.push(img('Annotated photo showing all three Blaxtair components laid out \u2014 LEFT: MR260 camera (compact black enclosure with dual stereo lenses visible on front face, Ethernet and power connectors on rear), callout numbers 1\u20134. CENTER: Smart Display (7" touchscreen showing zone overlay). RIGHT: Flash Beacon (amber strobe unit with clear lens dome), callout numbers 7\u20138. Scale ruler at bottom'));

  c.push(step(1, 'Stereo Lens Pair \u2014 Dual cameras for 3D depth perception and distance calculation'));
  c.push(step(2, 'Status LED \u2014 Indicates camera operational status (green = active, red = fault)'));
  c.push(step(3, 'Ethernet Port \u2014 RJ45 for data and power (PoE) to Smart Display'));
  c.push(step(4, 'Power Connector \u2014 Direct vehicle power input (12/24 V DC)'));
  c.push(step(5, 'Touchscreen Display \u2014 7" screen showing live camera feed with detection zone overlays'));
  c.push(step(6, 'Mounting Arm Connector \u2014 Adjustable arm for in-cabin positioning'));
  c.push(step(7, 'Strobe Module \u2014 High-intensity amber flash visible in daylight conditions'));
  c.push(step(8, 'Mounting Base \u2014 Magnetic or bolt-on base for vehicle exterior mounting'));

  c.push(pageBreak());

  // =======================================================================
  // 2. System Architecture
  // =======================================================================
  c.push(h1('2. System Architecture'));

  c.push(h2('2.1 System Overview'));
  c.push(img('System architecture diagram showing a heavy equipment vehicle (excavator) in the center with Blaxtair components installed \u2014 1\u20134 MR260 cameras mounted at strategic positions around the vehicle, connected via Ethernet cables to the Smart Display inside the operator cab. The Flash Beacon on top of the cab. Two discrete output wires from the Smart Display running to: (A) a buzzer/siren and (B) a braking control relay. Detection zones shown as colored concentric arcs: green outer zone (Warning) and red inner zone (Danger).'));

  c.push(h2('2.2 How It Works'));
  c.push(body('The Blaxtair PWAS system uses a continuous detection loop:'));
  c.push(step(1, 'Capture \u2014 The MR260 stereo camera continuously captures 3D image data from its dual lenses'));
  c.push(step(2, 'Process \u2014 Onboard AI analyzes each frame in real time, identifying human shapes, postures, and body parts'));
  c.push(step(3, 'Classify \u2014 The AI distinguishes humans from non-human objects (vehicles, barriers, materials) using deep learning models'));
  c.push(step(4, 'Range \u2014 3D stereo vision calculates the precise distance between the detected pedestrian and the equipment'));
  c.push(step(5, 'Zone Check \u2014 The system compares the pedestrian\u2019s distance against configured Warning Zone and Danger Zone thresholds'));
  c.push(step(6, 'Alert \u2014 If a pedestrian is within a zone, the system activates the appropriate alert (visual, audible, electrical output)'));

  c.push(boldPrefix('Detection latency from capture to alert: ', '< 200 ms.'));

  c.push(callout('note', 'All AI processing occurs onboard the camera \u2014 no cloud connectivity or internet connection is required for detection. The system operates autonomously once powered on.'));

  c.push(h2('2.3 Detection Zones'));
  c.push(body('The system operates with two configurable proximity zones around the vehicle:'));

  c.push(specTable(
    ['Zone', 'Typical Range', 'Response', 'Output'],
    [
      ['Warning Zone (outer)', '[TBD] m', 'Visual alert on Smart Display + audible tone', 'Discrete Output 1 activated'],
      ['Danger Zone (inner)', '[TBD] m', 'Urgent alert on display + loud alarm + Flash Beacon', 'Discrete Output 2 activated'],
      ['Safe Zone (beyond)', 'Beyond warning range', 'No alert \u2014 normal operation', 'No outputs activated']
    ]
  ));

  c.push(img('Top-down diagram of a yellow excavator with two concentric colored zones radiating from all sides \u2014 outer zone in semi-transparent green labeled "Warning Zone", inner zone in semi-transparent red labeled "Danger Zone". Dimensions showing zone radii from vehicle body. Arrows from each zone pointing to alert icons.'));

  c.push(callout('tip', 'Configure zone ranges based on the equipment type and operating speed. Slow-moving equipment (e.g., excavators, forklifts) can use shorter zones, while faster vehicles (e.g., dump trucks) should use wider zones to account for stopping distance.'));

  c.push(h2('2.4 Communication Architecture'));
  c.push(specTable(
    ['Connection', 'Type', 'Direction', 'Notes'],
    [
      ['MR260 Camera \u2192 Smart Display', 'Ethernet (PoE)', 'Bidirectional', 'Video stream + detection data + power'],
      ['Smart Display \u2192 Flash Beacon', 'Wired (12/24 V)', 'Output', 'Triggered on zone breach'],
      ['Smart Display \u2192 Output 1', 'Discrete relay', 'Output', 'Warning zone \u2014 configurable'],
      ['Smart Display \u2192 Output 2', 'Discrete relay', 'Output', 'Danger zone \u2014 configurable'],
      ['Smart Display \u2192 Buzzer/Siren', 'Wired (12/24 V)', 'Output', 'Audible alerts'],
      ['Smart Display \u2192 WakeCap Platform', 'Ethernet/4G (future)', 'Upstream', 'Event logging and compliance (planned)']
    ]
  ));

  c.push(pageBreak());

  // =======================================================================
  // 3. Technical Specifications
  // =======================================================================
  c.push(h1('3. Technical Specifications'));

  c.push(h2('3.1 MR260 AI Camera'));

  c.push(h3('3.1.1 Detection Performance'));
  c.push(specTable(
    ['Parameter', 'Value', 'Unit'],
    [
      ['Detection Latency', '< 200', 'ms'],
      ['Detection Type', 'Human-only (AI classification)', '\u2014'],
      ['Partial Occlusion', 'Supported (body parts)', '\u2014'],
      ['3D Distance Measurement', 'Stereo vision', '\u2014'],
      ['Detection Range', '[TBD]', 'm'],
      ['Field of View (horizontal)', '[TBD]', '\u00B0'],
      ['Field of View (vertical)', '[TBD]', '\u00B0'],
      ['Frame Rate', '[TBD]', 'fps'],
      ['AI Processing', 'Onboard (edge)', '\u2014']
    ]
  ));

  c.push(h3('3.1.2 Physical Specifications'));
  c.push(specTable(
    ['Parameter', 'Value', 'Unit'],
    [
      ['Dimensions (L \u00D7 W \u00D7 H)', '[TBD]', 'mm'],
      ['Weight', '[TBD]', 'g'],
      ['Enclosure Material', '[TBD]', '\u2014'],
      ['IP Rating', '[TBD]', '\u2014'],
      ['Mounting', 'Bracket (bolt-on or magnetic)', '\u2014']
    ]
  ));

  c.push(h3('3.1.3 Electrical Specifications'));
  c.push(specTable(
    ['Parameter', 'Min', 'Typ', 'Max', 'Unit'],
    [
      ['Input Voltage', '10', '12/24', '30', 'V DC'],
      ['Power Consumption', '\u2014', '[TBD]', '[TBD]', 'W']
    ]
  ));

  c.push(h3('3.1.4 Environmental Specifications'));
  c.push(specTable(
    ['Parameter', 'Min', 'Max', 'Unit'],
    [
      ['Operating Temperature', '[TBD]', '[TBD]', '\u00B0C'],
      ['Storage Temperature', '[TBD]', '[TBD]', '\u00B0C'],
      ['Humidity', '0', '95', '% RH (non-condensing)']
    ]
  ));

  c.push(h2('3.2 Smart Display'));
  c.push(specTable(
    ['Parameter', 'Value'],
    [
      ['Screen Size', '7" (estimated)'],
      ['Type', 'Touchscreen LCD'],
      ['Display Content', 'Live camera feed with zone overlays, alert indicators'],
      ['Mounting', 'Adjustable arm for in-cabin positioning'],
      ['Connectivity', 'Ethernet to camera(s), wired outputs'],
      ['Discrete Outputs', '2 configurable relay outputs']
    ]
  ));

  c.push(h2('3.3 Flash Beacon'));
  c.push(specTable(
    ['Parameter', 'Value'],
    [
      ['Type', 'High-intensity amber strobe'],
      ['Visibility', 'Daylight-visible'],
      ['Trigger', 'Activated by Smart Display on zone breach'],
      ['Mounting', 'Magnetic or bolt-on base for vehicle roof/exterior'],
      ['Power', '12/24 V DC from vehicle']
    ]
  ));

  c.push(h2('3.4 System Configurations'));
  c.push(specTable(
    ['Configuration', 'Cameras', 'Coverage', 'Typical Application'],
    [
      ['Single Rear', '1', 'Reverse blind spot', 'Forklifts, small loaders'],
      ['Dual (Rear + Side)', '2', 'Rear + one side', 'Excavators, graders'],
      ['Triple', '3', 'Rear + both sides', 'Dump trucks, large loaders'],
      ['Full 360\u00B0', '4', 'All directions', 'Tower cranes (fixed-point), large excavators']
    ]
  ));

  c.push(h2('3.5 Certifications'));
  c.push(specTable(
    ['Certification', 'Status', 'Notes'],
    [
      ['CE', '[TBD]', 'European conformity \u2014 per Blaxtair documentation'],
      ['ISO 21815', '[TBD]', 'Earth-moving machinery \u2014 collision warning and avoidance'],
      ['EN 16191', '[TBD]', 'Tunnelling machinery \u2014 safety requirements'],
      ['Functional Safety', '[TBD]', 'Per Blaxtair compliance documentation'],
      ['IP Rating', '[TBD]', 'Ingress protection for camera and beacon']
    ]
  ));

  c.push(callout('note', 'Certification documentation is maintained by Blaxtair (Arcure Group). Contact WakeCap for current certification status and compliance declarations for specific project requirements.'));

  c.push(pageBreak());

  // =======================================================================
  // 4. Components
  // =======================================================================
  c.push(h1('4. Components'));

  c.push(h2('4.1 Blaxtair MR260 AI Camera'));
  c.push(boldPrefix('Function: ', 'The MR260 is the core detection unit. Its dual stereo lenses capture 3D imagery that is processed by the onboard AI to detect pedestrians, calculate distance, and trigger zone-based alerts. The camera differentiates humans from vehicles, barriers, and construction materials using deep learning.'));

  c.push(img('Close-up product photo of the Blaxtair MR260 camera \u2014 front view showing the two stereo lens apertures side by side in a rugged black enclosure, with a small status LED between them. The enclosure shows IP-rated sealing around lens openings.'));

  c.push(boldPrefix('Key Capabilities:', ''));
  c.push(bullet('Identifies humans even when partially hidden behind obstacles (partial body detection)'));
  c.push(bullet('Works in dust, rain, backlighting, and reflective PPE environments'));
  c.push(bullet('Uphill/downhill coverage \u2014 maintains accuracy on slopes'));
  c.push(bullet('Reflection detection \u2014 handles glass, water, and metallic surfaces'));
  c.push(bullet('No false triggers on other vehicles or construction materials'));

  c.push(h2('4.2 Blaxtair Smart Display'));
  c.push(boldPrefix('Function: ', 'In-cabin display providing the operator with a live camera feed overlaid with detection zone boundaries and real-time alert indicators. Also serves as the system controller, routing detection events to the Flash Beacon and discrete outputs.'));

  c.push(img('Photo of the Blaxtair Smart Display mounted on an adjustable arm inside an excavator cab \u2014 the 7" screen shows a live camera view of the rear of the vehicle with a green semi-transparent overlay showing the warning zone and a pedestrian highlighted with a blue bounding box.'));

  c.push(h2('4.3 Blaxtair Flash Beacon'));
  c.push(boldPrefix('Function: ', 'Exterior-mounted strobe light that activates when a pedestrian is detected in the danger zone. Alerts pedestrians and nearby workers to the equipment\u2019s proximity warning.'));

  c.push(img('Photo of the Blaxtair Flash Beacon \u2014 amber dome strobe light with a heavy-duty black base, shown mounted on top of an excavator cab. Two mounting options shown: magnetic base and bolt-on bracket'));

  c.push(h2('4.4 Braking Integration Module (WakeCap Developed)'));
  c.push(boldPrefix('Function: ', 'Optional automated braking module developed by WakeCap that connects to the Blaxtair Discrete Output 2 (danger zone) to physically slow or stop the vehicle when a pedestrian enters the danger zone.'));

  c.push(safety('warning', 'VEHICLE CONTROL HAZARD \u2014 Automated braking systems can cause equipment instability (tipping) if braking force is not proportional to vehicle speed, load, and terrain. The braking integration module must be calibrated for each specific vehicle type and operating condition. Do not deploy on highway-speed vehicles.'));

  c.push(boldPrefix('Components (in development):', ''));
  c.push(specTable(
    ['Component', 'Description'],
    [
      ['Micro PLC Controller', 'MRS Electronic programmable controller for brake logic'],
      ['Brake Actuator', 'Mechanical actuator on brake pedal or hydraulic valve'],
      ['PCAN USB Interface', 'CAN bus programming and diagnostics'],
      ['Override Switch', 'Manual driver override to disable auto-braking']
    ]
  ));

  c.push(callout('note', 'The braking integration module is currently in the development and testing phase. Initial deployments use the Blaxtair system in PWAS alert-only mode (visual + audible alerts without automated braking).'));

  c.push(pageBreak());

  // =======================================================================
  // 5. Installation
  // =======================================================================
  c.push(h1('5. Installation'));

  c.push(safety('danger', 'CRUSHING HAZARD \u2014 Never work under or around heavy equipment while installing the PWAS system unless the equipment is fully shut down, keys removed, wheels chocked, and hydraulics depressurized. Follow site-specific lockout/tagout (LOTO) procedures.'));
  c.push(createSpacer(80));
  c.push(safety('warning', 'ELECTRICAL HAZARD \u2014 Disconnect the vehicle battery before performing any wiring work. Verify circuits are de-energized with a multimeter before touching exposed conductors.'));

  c.push(h2('5.1 Prerequisites'));
  c.push(body('Before installation, confirm the following:'));
  c.push(checkItem('Blaxtair hardware kit (camera(s), Smart Display, Flash Beacon, cables)'));
  c.push(checkItem('Equipment type and model identified'));
  c.push(checkItem('Camera mounting positions determined (based on blind spots and risk assessment)'));
  c.push(checkItem('Vehicle power source located (12 V DC or 24 V DC)'));
  c.push(checkItem('Ethernet cables of correct length for camera runs'));
  c.push(checkItem('Installation tools: drill, wrenches, cable ties, multimeter'));
  c.push(checkItem('Site work permit obtained (hot work / electrical permit as required)'));
  c.push(checkItem('Vehicle fully shut down with LOTO procedures in place'));

  c.push(h2('5.2 Camera Installation'));

  c.push(step(1, 'Identify the blind spots on the specific equipment type. Common mounting positions:'));
  c.push(specTable(
    ['Equipment Type', 'Camera Position(s)', 'Notes'],
    [
      ['Excavator', 'Rear of cab + both sides', 'Primary risk is swing radius'],
      ['Dump Truck', 'Rear + right side', 'Reversing and turning blind spots'],
      ['Wheel Loader', 'Rear + bucket side', 'Bucket obstructs forward view when raised'],
      ['Forklift', 'Rear only', 'Single camera sufficient for small equipment'],
      ['Mobile Crane', 'Multiple positions', '360\u00B0 coverage recommended']
    ]
  ));

  c.push(step(2, 'Mount the MR260 camera(s) using the supplied brackets at the identified positions.'));
  c.push(subStep('a', 'Ensure the camera lens faces outward and downward at a slight angle to cover the ground-level detection area.'));
  c.push(subStep('b', 'Secure the bracket with bolts (preferred) or magnetic base (temporary).'));
  c.push(subStep('c', 'Route the Ethernet cable from each camera to the operator cab, protecting it from heat, abrasion, and pinch points.'));

  c.push(step(3, 'Verify each camera has a clear field of view \u2014 no obstructions from vehicle body, mirrors, or accessories.'));

  c.push(h2('5.3 Smart Display Installation'));

  c.push(step(4, 'Mount the Smart Display inside the operator cab on the adjustable arm.'));
  c.push(subStep('a', 'Position within the operator\u2019s natural line of sight without obstructing the primary view of the work area.'));
  c.push(subStep('b', 'Ensure the screen is readable in direct sunlight.'));

  c.push(step(5, 'Connect each camera\u2019s Ethernet cable to the Smart Display\u2019s camera ports.'));

  c.push(step(6, 'Connect the Smart Display power cable to the vehicle electrical system.'));
  c.push(subStep('a', 'Route power cable to vehicle battery or fuse box.'));
  c.push(subStep('b', 'Connect positive wire to +12/24 V DC source (fused).'));
  c.push(subStep('c', 'Connect ground wire to vehicle chassis ground.'));

  c.push(h2('5.4 Flash Beacon Installation'));

  c.push(step(7, 'Mount the Flash Beacon on the vehicle exterior \u2014 roof of cab or top of rollover protection structure (ROPS).'));
  c.push(subStep('a', 'Use magnetic base for temporary installations or bolt-on bracket for permanent deployment.'));
  c.push(subStep('b', 'Ensure 360\u00B0 visibility from ground level.'));

  c.push(step(8, 'Connect the Flash Beacon wiring to the Smart Display beacon output.'));

  c.push(h2('5.5 Output Wiring'));

  c.push(step(9, 'Wire Discrete Output 1 (warning zone) to the desired response device:'));
  c.push(bullet('In-cabin buzzer or tone generator (standard)'));
  c.push(bullet('Additional external alarm (optional)'));

  c.push(step(10, 'Wire Discrete Output 2 (danger zone) to the desired response device:'));
  c.push(bullet('High-priority in-cabin alarm (standard)'));
  c.push(bullet('Braking control relay (if braking module installed)'));
  c.push(bullet('Engine shutdown relay (optional)'));

  c.push(h2('5.6 System Configuration'));

  c.push(step(11, 'Power on the vehicle and the PWAS system.'));
  c.push(step(12, 'Verify the system self-test completes:'));
  c.push(bullet('Flash Beacon activates briefly (siren + light)'));
  c.push(bullet('Smart Display shows live camera feed'));
  c.push(bullet('Status LED on camera shows green (active)'));

  c.push(step(13, 'Configure detection zones using the Smart Display interface:'));
  c.push(subStep('a', 'Set Warning Zone distance (outer boundary).'));
  c.push(subStep('b', 'Set Danger Zone distance (inner boundary).'));
  c.push(subStep('c', 'Verify Output 1 activates when a person enters the Warning Zone.'));
  c.push(subStep('d', 'Verify Output 2 activates when a person enters the Danger Zone.'));

  c.push(h2('5.7 Post-Installation Verification'));

  c.push(step(14, 'Walk test \u2014 Have a person in full PPE walk toward the vehicle from multiple directions:'));
  c.push(subStep('a', 'Confirm detection at the Warning Zone boundary \u2014 Smart Display shows alert, buzzer sounds.'));
  c.push(subStep('b', 'Confirm detection at the Danger Zone boundary \u2014 Flash Beacon activates, loud alarm sounds.'));
  c.push(subStep('c', 'Confirm the system does NOT trigger on other vehicles or objects passing nearby.'));

  c.push(step(15, 'Record the installation in the WakeCap Equipment Manager portal:'));
  c.push(subStep('a', 'Set pwasInstalled to true.'));
  c.push(subStep('b', 'Set pwasType to "Blaxtair 5".'));

  c.push(callout('important', 'Repeat the walk test from ALL directions (front, rear, left, right, and diagonal approaches) to verify full coverage. Adjust camera angles if any blind spots are detected.'));

  c.push(pageBreak());

  // =======================================================================
  // 6. Operation
  // =======================================================================
  c.push(h1('6. Operation'));

  c.push(h2('6.1 Normal Operation'));
  c.push(body('During normal equipment operation, the PWAS system runs continuously and autonomously:'));

  c.push(specTable(
    ['System State', 'Operator Action', 'Display Shows'],
    [
      ['No detection', 'Operate normally', 'Live camera feed \u2014 green status bar'],
      ['Warning Zone alert', 'Reduce speed, increase awareness', 'Camera feed with pedestrian highlighted in yellow, audible tone'],
      ['Danger Zone alert', 'Stop immediately, verify surroundings', 'Camera feed with pedestrian highlighted in red, loud alarm, Flash Beacon active'],
      ['System fault', 'Stop operations, report to supervisor', 'Error indicator \u2014 red status LED on camera']
    ]
  ));

  c.push(h2('6.2 Operator Interface \u2014 Smart Display'));
  c.push(body('The Smart Display provides:'));
  c.push(bullet('Live camera feed from connected MR260 camera(s)'));
  c.push(bullet('Zone overlay \u2014 semi-transparent colored boundaries showing Warning and Danger zones'));
  c.push(bullet('Pedestrian highlighting \u2014 bounding box around detected persons with distance readout'));
  c.push(bullet('Alert status bar \u2014 top of screen showing current alert level and detected distance'));
  c.push(bullet('Camera selection \u2014 switch between cameras if multiple are installed'));
  c.push(bullet('Settings access \u2014 zone configuration, output configuration, system diagnostics'));

  c.push(h2('6.3 Alert Behavior'));

  c.push(h3('6.3.1 Warning Zone Triggered'));
  c.push(body('When a pedestrian enters the Warning Zone:'));
  c.push(step(1, 'Smart Display highlights the pedestrian with a yellow bounding box'));
  c.push(step(2, 'Distance readout updates in real time'));
  c.push(step(3, 'In-cabin buzzer emits a steady tone'));
  c.push(step(4, 'Discrete Output 1 energizes'));

  c.push(h3('6.3.2 Danger Zone Triggered'));
  c.push(body('When a pedestrian enters the Danger Zone:'));
  c.push(step(1, 'Smart Display highlights the pedestrian with a red bounding box'));
  c.push(step(2, 'Distance readout updates with urgent styling'));
  c.push(step(3, 'In-cabin alarm emits a loud, rapid pulse'));
  c.push(step(4, 'Flash Beacon activates \u2014 amber strobe visible to all nearby workers'));
  c.push(step(5, 'Discrete Output 2 energizes'));

  c.push(h3('6.3.3 Pedestrian Exits Zone'));
  c.push(body('When the detected pedestrian leaves all zones:'));
  c.push(step(1, 'All alerts cease automatically'));
  c.push(step(2, 'Smart Display returns to normal view'));
  c.push(step(3, 'Outputs de-energize'));
  c.push(step(4, 'Flash Beacon deactivates'));

  c.push(callout('note', 'The system uses intelligent alert logic \u2014 it does not continuously re-trigger alerts for the same pedestrian staying in a zone. Alerts are sustained while the person is present and cease when they leave.'));

  c.push(h2('6.4 Human-Only Detection'));
  c.push(body('The Blaxtair AI discriminates between humans and non-human objects:'));

  c.push(specTable(
    ['Object', 'Detected', 'Alert'],
    [
      ['Worker on foot', 'Yes', 'Yes'],
      ['Worker bending / crouching', 'Yes', 'Yes'],
      ['Partially hidden worker (behind barrier)', 'Yes', 'Yes'],
      ['Worker in full PPE (reflective vest, hard hat)', 'Yes', 'Yes'],
      ['Other vehicle', 'No', 'No'],
      ['Construction materials (pipes, beams)', 'No', 'No'],
      ['Traffic cones / barriers', 'No', 'No'],
      ['Wildlife / animals', 'No', 'No']
    ]
  ));

  c.push(callout('tip', 'Human-only detection significantly reduces false alarms compared to radar or ultrasonic systems, which trigger on all objects. This minimizes alert fatigue and avoids unnecessary work stoppages when vehicles operate near each other.'));

  c.push(h2('6.5 Equipment Manager Integration'));
  c.push(body('Each vehicle\u2019s PWAS status is tracked in the WakeCap Equipment Manager portal:'));

  c.push(specTable(
    ['Field', 'Type', 'Description'],
    [
      ['pwasInstalled', 'Boolean', 'Whether a PWAS system is installed on the vehicle'],
      ['pwasType', 'String', 'Type of PWAS system (e.g., "Blaxtair 5")']
    ]
  ));

  c.push(boldPrefix('Future platform integration (planned):', ''));
  c.push(bullet('Real-time PWAS event streaming to WakeCap dashboard'));
  c.push(bullet('Detection event logging for compliance reporting'));
  c.push(bullet('Integration with Observation Service for incident management'));
  c.push(bullet('Unified Video Management System (VMS) for CCTV, dashcam, and PWAS camera streams'));

  c.push(pageBreak());

  // =======================================================================
  // 7. Maintenance
  // =======================================================================
  c.push(h1('7. Maintenance'));

  c.push(h2('7.1 Maintenance Schedule'));
  c.push(specTable(
    ['Task', 'Frequency', 'Procedure'],
    [
      ['Clean camera lenses', 'Weekly', 'Wipe stereo lenses with soft microfiber cloth; remove dust, mud, and water spots'],
      ['Inspect camera mounting', 'Weekly', 'Verify brackets are secure and camera angle has not shifted'],
      ['Walk test verification', 'Monthly', 'Repeat walk test (see Section 5.7) from all directions'],
      ['Check Flash Beacon', 'Monthly', 'Verify beacon activates on danger zone entry; check dome for cracks'],
      ['Inspect all cables', 'Monthly', 'Check Ethernet and power cables for damage, abrasion, or loose connectors'],
      ['Verify detection zones', 'Quarterly', 'Confirm zone distances match configured values using measured walk test'],
      ['Check Smart Display', 'Quarterly', 'Verify screen brightness, touch response, and camera feed clarity'],
      ['Review system logs', 'Quarterly', 'Check for error patterns or false detection trends (when platform integration available)']
    ]
  ));

  c.push(h2('7.2 Calibration Requirements'));

  c.push(h3('7.2.1 Detection Zone Calibration'));
  c.push(body('Verify zone accuracy quarterly or after any camera repositioning:'));
  c.push(step(1, 'Mark the configured Warning Zone distance on the ground (use tape measure from vehicle body).'));
  c.push(step(2, 'Walk a test person toward the vehicle from the marked distance.'));
  c.push(step(3, 'Confirm the Warning alert triggers within 0.5 m of the marked boundary.'));
  c.push(step(4, 'Repeat for the Danger Zone distance.'));
  c.push(step(5, 'Adjust zone settings in the Smart Display if boundaries have drifted.'));

  c.push(h3('7.2.2 Camera Alignment Check'));
  c.push(step(1, 'Compare the camera feed on the Smart Display with the actual scene behind the vehicle.'));
  c.push(step(2, 'Verify the camera covers the full intended detection area.'));
  c.push(step(3, 'Realign the camera bracket if the field of view has shifted due to vibration.'));

  c.push(h2('7.3 Lens Cleaning'));

  c.push(safety('caution', 'EQUIPMENT STARTUP HAZARD \u2014 Ensure the vehicle is fully shut down before cleaning cameras mounted on the vehicle exterior. Do not lean against or climb on equipment to reach cameras without proper fall protection.'));

  c.push(step(1, 'Shut down the vehicle and engage LOTO.'));
  c.push(step(2, 'Wipe each camera lens with a clean, dry microfiber cloth.'));
  c.push(step(3, 'Remove heavy mud or debris with a damp cloth first, then dry.'));
  c.push(step(4, 'Inspect the lens for scratches \u2014 scratched lenses can degrade 3D depth measurement.'));
  c.push(step(5, 'Replace cameras with heavily scratched lenses.'));

  c.push(pageBreak());

  // =======================================================================
  // 8. Troubleshooting
  // =======================================================================
  c.push(h1('8. Troubleshooting'));

  c.push(h2('8.1 Common Issues'));
  c.push(specTable(
    ['Symptom', 'Likely Cause', 'Quick Checks', 'Fix', 'Escalate When'],
    [
      ['No display on Smart Display', 'Power issue', 'Check power connections; verify vehicle battery voltage', 'Reconnect power cable; check fuse', 'Display still blank after power verified'],
      ['Camera shows no image', 'Ethernet disconnected', 'Check Ethernet cable at both ends', 'Reseat or replace Ethernet cable', 'Cable tested OK but no image'],
      ['False detections on objects', 'Dirty or scratched lens', 'Clean lens with microfiber cloth', 'Clean or replace camera lens', 'False detections persist after cleaning'],
      ['No detection of nearby person', 'Camera misaligned', 'Check camera angle; verify field of view covers ground level', 'Realign camera bracket', 'Detection consistently missed in walk test'],
      ['Flash Beacon not activating', 'Wiring issue', 'Check beacon power wiring and connection to Smart Display', 'Reconnect beacon wiring', 'Wiring verified OK but beacon still inactive'],
      ['Intermittent alerts', 'Loose cable connection', 'Inspect all Ethernet and power connectors', 'Reseat all connectors; secure with cable ties', 'Intermittent after resecuring all connections'],
      ['Zone distances inaccurate', 'Calibration drift', 'Perform measured walk test', 'Reconfigure zone distances in Smart Display', 'Distances incorrect after reconfiguration'],
      ['System does not self-test on startup', 'Controller fault', 'Power cycle the vehicle', 'Full power cycle; wait 30 seconds between off and on', 'Self-test fails after power cycle']
    ]
  ));

  c.push(h2('8.2 LED Status Reference'));
  c.push(specTable(
    ['Camera Status LED', 'Meaning', 'Action'],
    [
      ['Solid Green', 'Normal operation \u2014 detecting', 'None required'],
      ['Blinking Green', 'Initializing / self-test in progress', 'Wait 30 seconds'],
      ['Solid Red', 'System fault', 'Check connections; power cycle; escalate if persistent'],
      ['Off', 'No power', 'Check power cable and vehicle battery']
    ]
  ));

  c.push(h2('8.3 When to Contact Support'));
  c.push(body('Contact the WakeCap technical support team when:'));
  c.push(bullet('Walk test consistently fails to detect pedestrians in the configured zone'));
  c.push(bullet('False detections persist after lens cleaning and recalibration'));
  c.push(bullet('Smart Display shows error codes not resolved by power cycling'));
  c.push(bullet('Camera hardware appears physically damaged'));
  c.push(bullet('Braking integration module requires calibration for a new vehicle type'));

  c.push(pageBreak());

  // =======================================================================
  // 9. Safety Information
  // =======================================================================
  c.push(h1('9. Safety Information'));

  c.push(h2('9.1 General Safety'));
  c.push(safety('danger', 'CRUSHING HAZARD \u2014 The PWAS system is a supplementary safety aid. It does NOT replace the operator\u2019s responsibility to maintain situational awareness, use mirrors, follow spotter procedures, and obey site safety rules. Equipment operators must NEVER rely solely on the PWAS system to detect pedestrians.'));
  c.push(createSpacer(80));
  c.push(safety('warning', 'SYSTEM LIMITATION \u2014 No AI detection system achieves 100% accuracy under all conditions. Factors that can reduce detection performance include: extreme fog or smoke, direct lens contamination (mud, ice), camera physical damage, and electrical interference. Always maintain manual safety procedures alongside the PWAS system.'));

  c.push(h2('9.2 Electrical Safety'));
  c.push(safety('warning', 'ELECTRICAL HAZARD \u2014 Disconnect the vehicle battery negative terminal before performing any installation or wiring work on the PWAS system. Verify circuits are de-energized with a multimeter before touching exposed conductors.'));

  c.push(bullet('Use insulated tools when working on vehicle electrical systems'));
  c.push(bullet('Fuse all power connections to protect against short circuits'));
  c.push(bullet('Route cables away from heat sources (exhaust, turbochargers, hydraulic lines)'));
  c.push(bullet('Use heat-shrink tubing on all splices'));

  c.push(h2('9.3 Braking Safety'));
  c.push(safety('danger', 'VEHICLE CONTROL HAZARD \u2014 If the optional braking integration module is installed, incorrect calibration can cause: sudden uncontrolled braking, vehicle tipping, loss of steering control, or equipment instability. Braking calibration MUST be performed by qualified WakeCap engineers for each specific vehicle type, load condition, and terrain.'));
  c.push(createSpacer(80));
  c.push(safety('warning', 'HIGHWAY PROHIBITION \u2014 The automated braking function must NOT be active when equipment is driven on public roads or highways. Use the manual override switch to disable auto-braking before highway travel.'));

  c.push(h2('9.4 PPE Requirements'));
  c.push(specTable(
    ['Task', 'Required PPE'],
    [
      ['PWAS installation on equipment', 'Hard hat, safety glasses, gloves, high-visibility vest, safety boots'],
      ['Camera mounting at height', 'All above + safety harness and fall protection'],
      ['Electrical wiring', 'Safety glasses, insulated gloves'],
      ['Walk test verification', 'Full site PPE (hard hat, vest, boots)']
    ]
  ));

  c.push(h2('9.5 Emergency Procedures'));
  c.push(body('If the PWAS system fails during operation:'));
  c.push(step(1, 'Stop the equipment immediately.'));
  c.push(step(2, 'Post a spotter to manually direct traffic and pedestrians around the vehicle.'));
  c.push(step(3, 'Report the system failure to the site safety officer and WakeCap support.'));
  c.push(step(4, 'Do not resume unsupervised equipment operation until the PWAS system is repaired or a spotter is permanently assigned.'));

  c.push(pageBreak());

  // =======================================================================
  // Appendix A: Glossary
  // =======================================================================
  c.push(h1('Appendix A: Glossary'));
  c.push(specTable(
    ['Term', 'Definition'],
    [
      ['PWAS', 'Proximity Warning and Alert System \u2014 technology to prevent vehicle-pedestrian collisions'],
      ['CAS', 'Collision Avoidance System \u2014 used interchangeably with PWAS'],
      ['Blaxtair', 'French AI camera company (Arcure Group) \u2014 primary PWAS vendor'],
      ['MR260', 'Blaxtair 3D stereo AI camera model'],
      ['BXT5', 'Blaxtair 5 \u2014 current generation system (Ethernet variant)'],
      ['3D Stereo Vision', 'Dual-camera technique for measuring distance through parallax'],
      ['Warning Zone', 'Outer configurable detection boundary \u2014 triggers awareness alerts'],
      ['Danger Zone', 'Inner configurable detection boundary \u2014 triggers urgent alerts and outputs'],
      ['Flash Beacon', 'High-intensity amber strobe light for external pedestrian alerting'],
      ['Smart Display', 'In-cabin touchscreen showing camera feed, zone overlays, and alert status'],
      ['LOTO', 'Lockout/Tagout \u2014 safety procedure to ensure equipment is shut down during maintenance'],
      ['ROPS', 'Rollover Protection Structure \u2014 cab frame on heavy equipment'],
      ['PoE', 'Power over Ethernet \u2014 delivers power and data through a single Ethernet cable'],
      ['VMS', 'Video Management System \u2014 unified platform for multiple video streams'],
      ['PLC', 'Programmable Logic Controller \u2014 used in braking integration module']
    ]
  ));

  c.push(pageBreak());

  // =======================================================================
  // Appendix B: Comparison \u2014 AI Camera vs. Alternative Detection Technologies
  // =======================================================================
  c.push(h1('Appendix B: AI Camera vs. Alternative Technologies'));
  c.push(specTable(
    ['Feature', 'AI Camera (Blaxtair)', 'Radar', 'Ultrasonic', 'UWB Tags', 'RFID Tags'],
    [
      ['Human-only detection', 'Yes', 'No', 'No', 'Yes (tagged only)', 'Yes (tagged only)'],
      ['No tags required on workers', 'Yes', 'Yes', 'Yes', 'No', 'No'],
      ['Partial body detection', 'Yes', 'No', 'No', 'No', 'No'],
      ['Detection through dust/fog', 'Moderate', 'Good', 'Poor', 'Good', 'Good'],
      ['False alarm rate', 'Low', 'High', 'High', 'Low', 'Low'],
      ['Detection latency', '< 200 ms', '< 100 ms', '< 100 ms', '< 50 ms', '< 200 ms'],
      ['3D distance measurement', 'Yes', 'Yes', 'Yes', 'Yes', 'No'],
      ['Installation complexity', 'Medium', 'Low', 'Low', 'High (tags)', 'High (tags)'],
      ['Per-worker cost', 'None', 'None', 'None', 'Per tag', 'Per tag'],
      ['Video evidence', 'Yes', 'No', 'No', 'No', 'No']
    ]
  ));

  c.push(pageBreak());

  // =======================================================================
  // Appendix C: Supported Equipment Types
  // =======================================================================
  c.push(h1('Appendix C: Supported Equipment Types'));
  c.push(specTable(
    ['Category', 'Equipment Types', 'Camera Configuration'],
    [
      ['Excavators', 'Crawler, wheeled, mini', '2\u20134 cameras (rear + sides + front)'],
      ['Loaders', 'Wheel loaders, backhoe loaders', '1\u20132 cameras (rear + bucket side)'],
      ['Dump Trucks', 'Articulated, rigid', '2\u20133 cameras (rear + right side)'],
      ['Forklifts', 'Counterbalance, reach', '1 camera (rear)'],
      ['Cranes', 'Mobile, tower (fixed-point)', '2\u20134 cameras (ground-level fixed-point for tower cranes)'],
      ['Compactors', 'Rollers, plate compactors', '1\u20132 cameras (front + rear)'],
      ['Graders', 'Motor graders', '2 cameras (rear + blind side)'],
      ['Dozers', 'Crawler dozers', '2 cameras (rear + right side)']
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
      ['PWAS Technical Lead', 'Rami Nassouh'],
      ['Portal', 'portal.wakecap.com'],
      ['Vendor', 'Blaxtair (Arcure Group) \u2014 blaxtair.com'],
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
        text: 'WC-PWAS-PM-v1.0 \u2014 Revision Date: 2026-04-12',
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
// Main \u2014 build and save document
// ---------------------------------------------------------------------------

async function main() {
  console.log('Building WC-PWAS-PM-v1.0.docx ...');

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
      title: 'WakeCap PWAS \u2014 Product Manual',
      subject: 'AI-Based Collision Avoidance System for Construction Equipment',
      keywords: 'WakeCap, PWAS, Blaxtair, Collision Avoidance, Pedestrian Detection, Construction Safety, IoT',
      creator: 'WakeCap Technologies'
    }
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.resolve(__dirname, 'WC-PWAS-PM-v1.0.docx');
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

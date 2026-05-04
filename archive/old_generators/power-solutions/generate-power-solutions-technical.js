/**
 * WakeCap Power Solutions - Technical Engineering Manual Generator
 * Document: WC-PS-TEM-v1.2
 * Purpose: Comprehensive technical documentation with engineering depth
 * Audience: Technical Engineers, System Designers, Advanced Users
 */

const {
  COLORS, FONT_SIZES, SPACING, PAGE_A4,
  createHeading, createBodyText,
  createBullet: _createBullet,
  createNumberedStep, createSpacer,
  createSpecTable, createSafetyPanel,
  createImagePlaceholder,
  createHeader, createFooter,
  getDocumentStyles,
  Document, Packer, Paragraph, TextRun, ImageRun, Header,
  AlignmentType, BorderStyle, ShadingType, PageBreak, PageNumber
} = require('../../templates/docx-generator');
const fs = require('fs');
const path = require('path');

// =============================================================================
// COMPATIBILITY WRAPPERS (delegate to shared library)
// =============================================================================

const VERSION = 'B';

// Power Solutions accent color — dark grey instead of blue
const PS_ACCENT = '212121';

// Logo images
const LOGO_PATH = path.resolve(__dirname, '../../output/LOGOTYPE.png');
const logoBuffer = fs.readFileSync(LOGO_PATH);
const LOGOMARK_PATH = path.resolve(__dirname, '../../output/LOGOMARK.png');
const logomarkBuffer = fs.readFileSync(LOGOMARK_PATH);

// Product images
const IMG_DIR = path.resolve(__dirname, '../../output/power-solutions/images');
const wp384Img = fs.readFileSync(path.join(IMG_DIR, 'WP-384.png'));
const wp768Img = fs.readFileSync(path.join(IMG_DIR, 'WP-768.png'));
const wp4800tImg = fs.readFileSync(path.join(IMG_DIR, 'WP-4800T.png'));
const wp21600tImg = fs.readFileSync(path.join(IMG_DIR, 'WP-21600T.png'));

function h1(text) { return createHeading(text, 1, VERSION); }
function h2(text) { return createHeading(text, 2, VERSION); }
function h3(text) { return createHeading(text, 3, VERSION); }

function h4(text) {
  const sizes = FONT_SIZES.versionB;
  return new Paragraph({
    spacing: { before: 160, after: 60 },
    children: [new TextRun({ text, bold: true, size: sizes.h4, font: 'Source Sans Pro', color: COLORS.charcoal })]
  });
}

function p(text) { return createBodyText(text, VERSION); }
function bullet(text, level = 0) { return _createBullet(text, level, VERSION); }
function table(headers, rows) { return createSpecTable(headers, rows, VERSION, PS_ACCENT); }
function safetyPanel(level, message) { return createSafetyPanel(level, message, VERSION); }
function image(description) { return createImagePlaceholder(description, VERSION); }
function space(twips = 200) { return createSpacer(twips); }

function formula(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 120, after: 120 },
    shading: { fill: COLORS.lightGray, type: ShadingType.CLEAR },
    children: [new TextRun({ text, bold: true, size: 22, font: 'Roboto Mono', color: COLORS.charcoal })]
  });
}

function createPSHeader() {
  return new Header({
    children: [
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        border: {
          bottom: { style: BorderStyle.SINGLE, size: 6, color: COLORS.borderGray }
        },
        spacing: { after: 200 },
        children: [
          new ImageRun({
            data: logoBuffer,
            transformation: { width: 150, height: 23 },
            type: 'png'
          })
        ]
      })
    ]
  });
}

// =============================================================================
// DOCUMENT CONTENT
// =============================================================================

const content = [
  // COVER PAGE
  space(400),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new ImageRun({
        data: logomarkBuffer,
        transformation: { width: 130, height: 104 },
        type: 'png'
      })
    ]
  }),
  space(500),

  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
    children: [new TextRun({ text: 'POWER SOLUTIONS', bold: true, size: 48, font: 'Arial', color: COLORS.black })]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [new TextRun({ text: 'Technical Engineering Manual', size: 36, font: 'Arial', color: COLORS.darkGray })]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
    children: [new TextRun({ text: 'Off-Grid Solar Power Systems for Remote Equipment', size: 20, font: 'Arial', color: COLORS.mediumGray })]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 400 },
    children: [new TextRun({ text: 'WP-384 | WP-768 | WP-4800T | WP-21600T', size: 22, font: 'Arial', color: COLORS.mediumGray })]
  }),

  image('Technical illustration of all four Power Solution tiers with system block diagram'),

  space(300),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({ text: 'Document: WC-PS-TEM-v1.2', size: 18, font: 'Arial', color: COLORS.mediumGray }),
      new TextRun({ text: '  |  Revision: February 2026', size: 18, font: 'Arial', color: COLORS.mediumGray })
    ]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: 'CONFIDENTIAL - ENGINEERING USE', bold: true, size: 16, font: 'Arial', color: COLORS.mediumGray })]
  }),

  new Paragraph({ children: [new PageBreak()] }),

  // REVISION HISTORY
  h1('Revision History'),
  table(
    ['Version', 'Date', 'Author', 'Description'],
    [
      ['1.0', 'February 2026', 'Hardware & Firmware Department', 'Initial release']
    ]
  ),
  space(400),

  h1('Table of Contents'),
  p('1. Introduction and Scope ........................................................ 3'),
  p('2. System Architecture ............................................................ 4'),
  p('3. Design Parameters and Calculations ......................................... 7'),
  p('4. Product Technical Specifications ............................................ 11'),
  p('5. Solar Photovoltaic Subsystem ................................................ 17'),
  p('6. Battery Energy Storage Subsystem ........................................... 20'),
  p('7. Power Management and Control ............................................... 24'),
  p('8. Protection and Safety Systems ............................................... 27'),
  p('9. Environmental Performance .................................................... 29'),
  p('10. Installation Engineering .................................................... 31'),
  p('11. Commissioning and Validation .............................................. 34'),
  p('12. Maintenance Engineering ..................................................... 36'),
  p('13. Troubleshooting and Diagnostics ........................................... 38'),
  p('14. Appendices .................................................................... 41'),

  new Paragraph({ children: [new PageBreak()] }),

  // SECTION 1: INTRODUCTION
  h1('1. Introduction and Scope'),
  space(100),

  h2('1.1 Document Purpose'),
  p('This Technical Engineering Manual provides comprehensive engineering documentation for the WakeCap Power Solutions product line. It is intended for engineers requiring detailed technical understanding of system design, performance characteristics, and integration requirements.'),
  space(100),

  h2('1.2 Product Family Overview'),
  p('The WakeCap Power Solutions are autonomous off-grid solar power systems designed to provide reliable DC power for remote equipment in harsh environments. The product family comprises four tiers based on energy capacity:'),
  space(100),

  table(
    ['Product', 'Model', 'Battery', 'Solar', 'System Voltage', 'Target Load'],
    [
      ['WakeCap Power 384', 'WP-384', '30Ah LiFePO₄', '80W', '12V DC', '≤8W'],
      ['WakeCap Power 768', 'WP-768', '60Ah LiFePO₄', '100W', '12V DC', '≤15W'],
      ['WakeCap Power 4800T', 'WP-4800T', '400Ah GEL', '450W', '12V DC', '≤100W'],
      ['WakeCap Power 21600T', 'WP-21600T', '900Ah Lead Acid', '1305W', '24V DC', '≤350W']
    ]
  ),
  space(200),

  h2('1.3 Design Environment'),
  p('All systems are designed for deployment in Saudi Arabia with the following environmental considerations:'),
  bullet('High ambient temperatures (up to 55°C)'),
  bullet('Desert conditions with high dust/sand exposure'),
  bullet('Coastal areas with salt-laden humid air'),
  bullet('High solar irradiance (Peak Sun Hours: 5.5-7.5 hours)'),
  bullet('Remote locations with limited grid access'),
  space(100),

  h2('1.4 Applicable Standards'),
  bullet('IEC 62124: Photovoltaic (PV) standalone systems - Design verification'),
  bullet('IEC 61427: Secondary cells for solar photovoltaic energy systems'),
  bullet('IEC 62509: Battery charge controllers for photovoltaic systems'),
  bullet('IP ratings per IEC 60529'),
  bullet('[TBD - Additional certifications]'),

  new Paragraph({ children: [new PageBreak()] }),

  // SECTION 2: SYSTEM ARCHITECTURE
  h1('2. System Architecture'),
  space(100),

  h2('2.1 Functional Block Diagram'),
  p('All WakeCap Power Solutions share a common functional architecture:'),
  space(100),

  image('System block diagram showing: Solar Panel Array → MPPT Controller → Battery Bank → Load Output with protection circuits'),
  space(100),

  p('Key functional blocks:'),
  bullet('Solar Photovoltaic Array: Energy harvesting from solar radiation'),
  bullet('MPPT Charge Controller: Maximum Power Point Tracking and charge regulation'),
  bullet('Battery Energy Storage: Electrochemical energy storage for autonomy'),
  bullet('DC Output Stage: Voltage regulation and load distribution'),
  bullet('Protection Systems: Over-current, over-voltage, temperature, and reverse polarity'),
  bullet('Monitoring/Indicators: State of charge, charging status, fault indication'),
  space(200),

  h2('2.2 Energy Flow'),
  p('The system operates in three primary modes:'),
  space(100),

  h3('2.2.1 Solar Charging Mode'),
  p('When solar irradiance is sufficient (typically >200 W/m²):'),
  bullet('MPPT controller tracks maximum power point of solar array'),
  bullet('Solar energy charges battery and simultaneously powers load'),
  bullet('Excess energy stored in battery bank'),
  bullet('Charging follows CC-CV profile for battery chemistry'),
  space(100),

  h3('2.2.2 Battery Discharge Mode'),
  p('When solar input is insufficient (night/overcast):'),
  bullet('Battery supplies full load demand'),
  bullet('Depth of Discharge (DoD) limited to protect battery life'),
  bullet('Low voltage disconnect prevents deep discharge'),
  space(100),

  h3('2.2.3 Float/Maintenance Mode'),
  p('When battery is fully charged:'),
  bullet('MPPT controller maintains float voltage'),
  bullet('Solar directly powers load with minimal battery cycling'),
  bullet('Periodic equalization charge (lead-acid systems only)'),
  space(200),

  h2('2.3 System Sizing Philosophy'),
  p('All WakeCap Power Solutions are sized according to:'),
  space(100),

  table(
    ['Design Parameter', 'Value', 'Rationale'],
    [
      ['Backup Duration', '48 hours', 'Two consecutive days without solar (worst case)'],
      ['Depth of Discharge', '70%', 'Balance between capacity utilization and cycle life'],
      ['Solar Derating', '75%', 'Account for dust, misalignment, temperature, aging'],
      ['System Efficiency', '90%', 'Wiring losses, controller self-consumption'],
      ['DC-DC Efficiency', '80%', 'Conversion losses if voltage conversion required'],
      ['Peak Sun Hours', '6.5h', 'Annual average for Saudi Arabia']
    ]
  ),

  new Paragraph({ children: [new PageBreak()] }),

  h2('2.4 Architecture by Product'),
  space(100),

  h3('2.4.1 WP-384 Architecture'),
  new Paragraph({ alignment: AlignmentType.CENTER, children: [new ImageRun({ data: wp384Img, transformation: { width: 400, height: 400 }, type: 'png' })] }),
  p('The WP-384 features a highly integrated design with:'),
  bullet('Aluminum-potted MPPT controller (>95% efficiency) integrated with BMS'),
  bullet('LiFePO₄ battery pack with 2P4S cell configuration (30Ah @ 12.8V nominal)'),
  bullet('Integrated SOC indication via LED display'),
  bullet('Single 12V DC output channel with over-current protection'),
  bullet('Optional RS485 interface for remote monitoring'),
  space(200),

  h3('2.4.2 WP-768 Architecture'),
  new Paragraph({ alignment: AlignmentType.CENTER, children: [new ImageRun({ data: wp768Img, transformation: { width: 400, height: 400 }, type: 'png' })] }),
  p('The WP-768 provides a modular pole-mount design:'),
  bullet('Separate 10A MPPT charge controller'),
  bullet('60Ah LiFePO₄ battery with integrated BMS'),
  bullet('Charging protection board with multiple safety features'),
  bullet('Aviation-style waterproof connectors'),
  bullet('DC output via standard 5.5×2.1mm barrel connector'),
  space(200),

  h3('2.4.3 WP-4800T Architecture'),
  new Paragraph({ alignment: AlignmentType.CENTER, children: [new ImageRun({ data: wp4800tImg, transformation: { width: 400, height: 400 }, type: 'png' })] }),
  p('The WP-4800T is a trailer-mounted mobile power station:'),
  bullet('30A MPPT charge controller'),
  bullet('2×200Ah GEL deep-cycle batteries in parallel (400Ah total)'),
  bullet('6.5m pneumatic telescoping mast'),
  bullet('Integrated equipment cabinet with thermal management'),
  bullet('Exchange board for data/power distribution'),
  bullet('Electric fan for enclosure cooling'),
  space(200),

  h3('2.4.4 WP-21600T Architecture'),
  new Paragraph({ alignment: AlignmentType.CENTER, children: [new ImageRun({ data: wp21600tImg, transformation: { width: 400, height: 400 }, type: 'png' })] }),
  p('The WP-21600T is the highest-capacity trailer solution:'),
  bullet('EPEVER 60A MPPT charge controller'),
  bullet('6×150Ah high-temperature lead-acid batteries (3S2P for 24V, 900Ah)'),
  bullet('9m manual telescoping mast tower'),
  bullet('Large equipment cabinet with multiple cable passages'),
  bullet('CAT6 and power cable routing through mast'),

  new Paragraph({ children: [new PageBreak()] }),

  // SECTION 3: DESIGN CALCULATIONS
  h1('3. Design Parameters and Calculations'),
  space(100),

  h2('3.1 Fundamental Equations'),
  p('System sizing follows the calculation sequence: LOAD → BATTERY → SOLAR → MPPT → AUXILIARY'),
  space(100),

  h3('3.1.1 Battery Capacity Calculation'),
  p('Required battery capacity to support a given load for specified backup duration:'),
  space(50),
  formula('B = (T × P) / (DoD × η_sys × η_conv × V)'),
  space(50),
  p('Where:'),
  bullet('B = Required battery capacity (Ah)'),
  bullet('T = Backup time (hours) = 48'),
  bullet('P = Total system load power (W)'),
  bullet('DoD = Depth of Discharge = 0.70'),
  bullet('η_sys = System efficiency = 0.90'),
  bullet('η_conv = Converter efficiency = 0.80'),
  bullet('V = System voltage (V)'),
  space(200),

  h3('3.1.2 Solar Array Sizing'),
  p('Required solar panel wattage to fully recharge the battery in one day:'),
  space(50),
  formula('S = (B × V) / (PSH × η_solar × η_mppt)'),
  space(50),
  p('Where:'),
  bullet('S = Required solar array power (W)'),
  bullet('B = Battery capacity (Ah)'),
  bullet('V = System voltage (V)'),
  bullet('PSH = Peak Sun Hours = 6.5'),
  bullet('η_solar = Solar derating factor = 0.75'),
  bullet('η_mppt = MPPT efficiency = 0.95'),
  space(200),

  h3('3.1.3 MPPT Controller Sizing'),
  p('Minimum charge controller current rating:'),
  space(50),
  formula('I_mppt = S / (η_mppt × V)'),
  space(50),
  p('Where:'),
  bullet('I_mppt = MPPT controller current rating (A)'),
  bullet('S = Solar array power (W)'),
  bullet('η_mppt = MPPT efficiency = 0.95'),
  bullet('V = System voltage (V)'),

  new Paragraph({ children: [new PageBreak()] }),

  h2('3.2 Design Verification Calculations'),
  space(100),

  h3('3.2.1 WP-384 Design Verification'),
  p('Target Load: 8W continuous'),
  space(50),

  p('Battery Calculation:'),
  bullet('B = (48 × 8) / (0.70 × 0.90 × 0.80 × 12)'),
  bullet('B = 384 / 6.048 = 63.5 Ah (theoretical)'),
  bullet('Actual: 30Ah (provides ~22h backup at 8W, or 48h at ~4W)'),
  bullet('Note: LiFePO₄ chemistry allows higher effective DoD'),
  space(100),

  p('Solar Calculation:'),
  bullet('S = (30 × 12) / (6.5 × 0.75 × 0.95)'),
  bullet('S = 360 / 4.63 = 77.8W'),
  bullet('Actual: 80W (sufficient)'),
  space(200),

  h3('3.2.2 WP-768 Design Verification'),
  p('Target Load: 15W continuous'),
  space(50),

  p('Battery Calculation:'),
  bullet('B = (48 × 15) / (0.70 × 0.90 × 0.80 × 12)'),
  bullet('B = 720 / 6.048 = 119 Ah (theoretical)'),
  bullet('Actual: 60Ah (provides ~24h backup at 15W)'),
  space(100),

  p('Solar Calculation:'),
  bullet('S = (60 × 12) / (6.5 × 0.75 × 0.95)'),
  bullet('S = 720 / 4.63 = 155.5W'),
  bullet('Actual: 100W (marginal - relies on LiFePO₄ efficiency)'),
  space(200),

  h3('3.2.3 WP-4800T Design Verification'),
  p('Target Load: 100W continuous'),
  space(50),

  p('Battery Calculation:'),
  bullet('B = (48 × 100) / (0.70 × 0.90 × 0.80 × 12)'),
  bullet('B = 4800 / 6.048 = 794 Ah (theoretical)'),
  bullet('Actual: 400Ah (provides ~24h backup at 100W)'),
  space(100),

  p('Solar Calculation:'),
  bullet('S = (400 × 12) / (6.5 × 0.75 × 0.95)'),
  bullet('S = 4800 / 4.63 = 1037W'),
  bullet('Actual: 450W (requires multiple sunny days for full recovery)'),
  space(200),

  h3('3.2.4 WP-21600T Design Verification'),
  p('Target Load: 350W continuous'),
  space(50),

  p('Battery Calculation:'),
  bullet('B = (48 × 350) / (0.70 × 0.90 × 0.80 × 24)'),
  bullet('B = 16800 / 12.096 = 1389 Ah (theoretical at 24V)'),
  bullet('Actual: 900Ah @ 24V (provides ~30h backup at 350W)'),
  space(100),

  p('Solar Calculation:'),
  bullet('S = (900 × 24) / (6.5 × 0.75 × 0.95)'),
  bullet('S = 21600 / 4.63 = 4665W'),
  bullet('Actual: 1305W (sized for typical loads of 150-200W)'),

  new Paragraph({ children: [new PageBreak()] }),

  h2('3.3 Load Capacity Summary'),
  p('Based on design calculations, the actual continuous load capacity per solution:'),
  space(100),

  table(
    ['Solution', 'Battery', 'Max Load (48h)', 'Max Load (24h)', 'Max Load (12h)', 'Practical Limit'],
    [
      ['WP-384', '30Ah/384Wh', '~4W', '~8W', '~16W', '8W'],
      ['WP-768', '60Ah/768Wh', '~8W', '~15W', '~30W', '15W'],
      ['WP-4800T', '400Ah/4800Wh', '~50W', '~100W', '~200W', '100W'],
      ['WP-21600T', '900Ah@24V/21600Wh', '~175W', '~350W', '~700W', '350W']
    ]
  ),
  space(100),

  safetyPanel('notice', 'The "Practical Limit" values assume good solar conditions and should be used as the design target. Exceeding these values will reduce backup time below 24 hours during extended overcast periods.'),

  new Paragraph({ children: [new PageBreak()] }),

  // SECTION 4: PRODUCT SPECIFICATIONS
  h1('4. Product Technical Specifications'),
  space(100),

  h2('4.1 WakeCap Power 384 (WP-384) Specifications'),
  p('Model: G8030 | 80W Solar, 384Wh LiFePO₄ Off-Grid Power System'),
  space(100),

  h3('4.1.1 Solar Panel Specifications'),
  table(
    ['Parameter', 'Value', 'Unit'],
    [
      ['Panel Material', 'Grade-A Monocrystalline Silicon', '—'],
      ['Total Output Power', '80', 'W'],
      ['Panel Configuration', '2 × 40W panels', '—'],
      ['Photoelectric Conversion Efficiency', '≥23', '%'],
      ['Rated Output Voltage', '18', 'V'],
      ['Maximum Power Point Voltage (Vmp)', '18', 'V'],
      ['Open Circuit Voltage (Voc)', '24', 'V'],
      ['Maximum Power Point Current (Imp)', '4.44', 'A'],
      ['Short Circuit Current (Isc)', '5', 'A'],
      ['Panel Dimensions', '390 × 530 × 17 (×2 panels)', 'mm'],
      ['Panel Weight', '3.2', 'kg'],
      ['Frame Material', 'Anodized Aluminum Alloy, 0.8mm', '—'],
      ['Encapsulation', 'Tempered Glass / EVA / Cells / EVA Backsheet', '—'],
      ['Snow Load Rating', '5400', 'Pa'],
      ['Wind Load Rating', '2400', 'Pa']
    ]
  ),
  space(200),

  h3('4.1.2 Battery Pack Specifications'),
  table(
    ['Parameter', 'Value', 'Unit'],
    [
      ['Cell Type', 'LiFePO₄ (Lithium Iron Phosphate)', '—'],
      ['Cell Model', 'IFR32140E15.0Ah', '—'],
      ['Cell Configuration', '2P4S (2 Parallel, 4 Series)', '—'],
      ['Nominal Voltage', '12.8', 'V'],
      ['Pack Capacity', '30Ah / 384Wh', '—'],
      ['Discharge Voltage Range', '11.2 - 14.8', 'V'],
      ['Over-Discharge Protection', '≤10 ±0.1', 'V'],
      ['Over-Charge Protection', '>14.6 ±0.1', 'V'],
      ['Maximum Charge Current', '7', 'A'],
      ['High-Temp Protection (Charge/Discharge)', '≥60°C prohibited', '—'],
      ['Low-Temp Charge Protection', '-10 ±1', '°C'],
      ['Low-Temp Charge Recovery', '0 ±1', '°C'],
      ['Low-Temp Discharge Protection', '-20 ±1', '°C'],
      ['Low-Temp Discharge Recovery', '-15 ±1', '°C'],
      ['SOC Accuracy', '<5', '%'],
      ['BMS Communication', 'IIC', '—'],
      ['Battery Arm Dimensions', '535 × 80 × 100', 'mm'],
      ['Battery Pack Weight', '~2.25', 'kg']
    ]
  ),

  new Paragraph({ children: [new PageBreak()] }),

  h3('4.1.3 Main Unit Specifications'),
  table(
    ['Parameter', 'Value', 'Unit'],
    [
      ['Model', 'TD-G8030', '—'],
      ['DC Output Channels', '1 (86cm cable, black)', '—'],
      ['Output Voltage', '12 ±0.5', 'V DC'],
      ['Output Current (Max)', '≤3 ±0.05', 'A'],
      ['Output Protection Current', '>4A for >3 seconds', '—'],
      ['Input Channels', '1 (male plug, 220mm cable)', '—'],
      ['Input Voltage Range', '15 - 21', 'V DC'],
      ['Maximum Input Current', '7', 'A'],
      ['RS-485 Channels', '1 (2-pin terminal, 30cm)', '—'],
      ['Energy Efficiency (3A load)', 'Max 92', '%'],
      ['Short-Circuit Protection', '>5A instantaneous', '—'],
      ['Operating Temperature', '-20 to +50', '°C'],
      ['Storage Temperature', '-40 to +60', '°C'],
      ['Operating Humidity', '15 - 85', '% RH'],
      ['Protection Rating', 'IP66', '—'],
      ['Factory State of Charge', '40 - 50', '%'],
      ['Runtime (no solar, 150mA)', '~8-10 days (25°C)', '—'],
      ['Recharge Time (0-100%)', '~8-10 hours', '—'],
      ['Installation Method', 'Pole Mount / Wall Mount', '—']
    ]
  ),
  space(200),

  h3('4.1.4 LED Indicator Status'),
  table(
    ['Indicator', 'Flashing', 'Steady On', 'Off'],
    [
      ['Blue Light', 'Charging', 'Charge Complete', 'No Solar Input'],
      ['Green Light', 'Overload/Short Circuit', 'Output Normal', 'Shutdown/Fault'],
      ['Red Light', 'Low Battery', '—', 'Normal Battery']
    ]
  ),

  new Paragraph({ children: [new PageBreak()] }),

  h2('4.2 WakeCap Power 768 (WP-768) Specifications'),
  p('Model: TS-100W60AH | 100W Solar, 768Wh LiFePO₄ Power System'),
  space(100),

  h3('4.2.1 Solar Panel Specifications'),
  table(
    ['Parameter', 'Value', 'Unit'],
    [
      ['Panel Material', 'N-Type A+ Grade Monocrystalline Silicon', '—'],
      ['Total Output Power', '100', 'W'],
      ['Panel Configuration', '2 × 50W panels', '—'],
      ['Conversion Efficiency', '>22', '%'],
      ['Panel Dimensions', '390 × 510 (×2 panels)', 'mm'],
      ['Frame Material', 'Anodized Aluminum', '—'],
      ['Glass', '3.2mm Tempered', '—'],
      ['Protection Rating', 'IP66', '—'],
      ['Operating Temperature', '-30 to +85', '°C'],
      ['Maximum Operating Current', '7.8', 'A'],
      ['Open Circuit Voltage', '20', 'V'],
      ['Maximum Operating Voltage', '17', 'V'],
      ['Surface Pressure Resistance', '60m/s (200kg/m²)', '—']
    ]
  ),
  space(200),

  h3('4.2.2 Battery Pack Specifications'),
  table(
    ['Parameter', 'Value', 'Unit'],
    [
      ['Battery Type', 'LiFePO₄ (Lithium Iron Phosphate)', '—'],
      ['Nominal Capacity', '60', 'Ah'],
      ['Rated Voltage', '10.5 - 12.6', 'V DC'],
      ['Charging Temperature', '-30 to +85', '°C'],
      ['Discharging Temperature', '-30 to +85', '°C'],
      ['Protection Features', 'High-temp, Low-temp compensation, Balance, OC/OD', '—']
    ]
  ),
  space(200),

  h3('4.2.3 Controller Specifications'),
  table(
    ['Parameter', 'Value', 'Unit'],
    [
      ['Maximum Charging Current', '10', 'A'],
      ['Maximum Output Current', '10', 'A'],
      ['Reverse Connection Protection', 'Yes', '—'],
      ['Controller Self-consumption', '0.06', 'W'],
      ['Operating Temperature', '-30 to +85', '°C'],
      ['MPPT Efficiency', '96.5', '%']
    ]
  ),

  new Paragraph({ children: [new PageBreak()] }),

  h3('4.2.4 System Specifications'),
  table(
    ['Parameter', 'Value', 'Unit'],
    [
      ['System Weight', '23', 'kg'],
      ['Packaging Size', '940 × 780 × 240', 'mm'],
      ['Packaging Volume', '0.175', 'm³'],
      ['Mounting Bracket', 'Galvanized + powder-coated, integrated', '—'],
      ['Solar Panel Orientation', 'South-facing', '—'],
      ['Adjustable Ground Angle', '0 - 30', '°'],
      ['PV Cable Connector', 'Male/Female Aviation Connector', '—'],
      ['PV Cable Specification', '2×1.5 National Standard, 80cm', '—'],
      ['DC Output Connector', '5.5×2.1mm Male', '—'],
      ['DC Output Cable', '2×0.75 Pure Copper, 1m', '—']
    ]
  ),
  space(300),

  h2('4.3 WakeCap Power 4800T (WP-4800T) Specifications'),
  p('Model: [TBD] | 450W Solar, 4800Wh GEL Trailer Power Station'),
  space(100),

  h3('4.3.1 Solar Panel Specifications'),
  table(
    ['Parameter', 'Value', 'Unit'],
    [
      ['Panel Type', 'Monocrystalline Silicon', '—'],
      ['Total Output Power', '450', 'W'],
      ['Panel Configuration', '3 × 150W panels', '—'],
      ['[Additional specs]', '[TBD]', '—']
    ]
  ),
  space(200),

  h3('4.3.2 Battery Specifications'),
  table(
    ['Parameter', 'Value', 'Unit'],
    [
      ['Battery Type', 'GEL Deep Cycle (LEOCH brand)', '—'],
      ['Configuration', '2 × 200Ah parallel', '—'],
      ['Total Capacity', '400Ah / 4800Wh', '—'],
      ['System Voltage', '12', 'V DC'],
      ['Battery Brand', 'LEOCH', '—']
    ]
  ),
  space(200),

  h3('4.3.3 Controller Specifications'),
  table(
    ['Parameter', 'Value', 'Unit'],
    [
      ['Controller Type', 'MPPT', '—'],
      ['Current Rating', '30', 'A'],
      ['[Additional specs]', '[TBD]', '—']
    ]
  ),

  new Paragraph({ children: [new PageBreak()] }),

  h3('4.3.4 Mechanical Specifications'),
  table(
    ['Parameter', 'Value', 'Unit'],
    [
      ['Total System Weight', '525', 'kg'],
      ['Packing Dimensions', '2000 × 1400 × 2300', 'mm'],
      ['Operating Dimensions', '2000 × 2250 × 6500', 'mm'],
      ['Mast Type', 'Pneumatic Telescoping', '—'],
      ['Mast Sections', '5', '—'],
      ['Mast Material', 'Aluminum Alloy', '—'],
      ['Mast Height (Extended)', '6.5', 'm'],
      ['Mast Lifting Power', '16W (negligible)', '—'],
      ['Spring Cable Specification', '2×1.5', 'mm²'],
      ['Trailer Type', 'Single Axle', '—'],
      ['Trailer Standard', 'US Standard', '—'],
      ['Hitch Type', 'Ball Hitch', '—'],
      ['Tire Size', '165/70R13', '—'],
      ['Outriggers', 'Manual', '—'],
      ['Surface Treatment', 'Anti-oxidation Electrostatic Powder Coat', '—'],
      ['Protection Level', 'IP65', '—']
    ]
  ),
  space(200),

  h3('4.3.5 Performance Specifications'),
  table(
    ['Parameter', 'Value', 'Unit'],
    [
      ['Charging Time (0-100%)', '~10', 'hours'],
      ['Runtime (180W camera load)', '~25', 'hours'],
      ['Warranty', '2', 'years'],
      ['Camera Box Dimensions', 'With CCTV mounting box', '—']
    ]
  ),
  space(300),

  h2('4.4 WakeCap Power 21600T (WP-21600T) Specifications'),
  p('Model: VTS3P | 1305W Solar, 21600Wh Lead Acid Trailer Power Station'),
  space(100),

  h3('4.4.1 Solar Panel Specifications'),
  table(
    ['Parameter', 'Value', 'Unit'],
    [
      ['Number of Panels', '3', '—'],
      ['Individual Panel Wattage', '435', 'W'],
      ['Total Output Power', '1305', 'W'],
      ['Panel Type', 'Monocrystalline Silicon', '—']
    ]
  ),

  new Paragraph({ children: [new PageBreak()] }),

  h3('4.4.2 Battery Specifications'),
  table(
    ['Parameter', 'Value', 'Unit'],
    [
      ['Battery Type', 'High Temperature Lead Acid', '—'],
      ['Configuration', '6 × 12V 150Ah (3S2P for 24V)', '—'],
      ['Total Capacity', '900Ah @ 24V', '—'],
      ['Energy Capacity', '21,600', 'Wh'],
      ['System Voltage', '24', 'V DC']
    ]
  ),
  space(200),

  h3('4.4.3 Controller Specifications'),
  table(
    ['Parameter', 'Value', 'Unit'],
    [
      ['Controller Brand', 'EPEVER', '—'],
      ['Controller Type', 'MPPT', '—'],
      ['Current Rating', '60', 'A']
    ]
  ),
  space(200),

  h3('4.4.4 Mechanical Specifications'),
  table(
    ['Parameter', 'Value', 'Unit'],
    [
      ['Total System Weight', '1300', 'kg'],
      ['Overall Dimensions', '2320 × 1495 × 2350', 'mm'],
      ['Mast Type', 'Manual Telescoping', '—'],
      ['Mast Height (Extended)', '9', 'm'],
      ['Mast Cables', '2 × CAT6 + 2 × 1.5mm²', '—'],
      ['Camera Box Dimensions', '412 × 412 × 416', 'mm'],
      ['Trailer Type', 'Single Axle, Mechanical Brake', '—'],
      ['Suspension', 'Steel Plate Spring', '—'],
      ['Tire Size', '15"', '—'],
      ['Tow Hitch', '50mm Ball Hitch', '—'],
      ['Surface Treatment', 'Powder Coat (corrosion prevention)', '—'],
      ['Protection Level', 'IP65', '—'],
      ['Wind Rating', '100', 'km/h'],
      ['Container Loading', '8 units per 40ft container', '—']
    ]
  ),

  new Paragraph({ children: [new PageBreak()] }),

  // SECTION 5: SOLAR SUBSYSTEM
  h1('5. Solar Photovoltaic Subsystem'),
  space(100),

  h2('5.1 Solar Cell Technology'),
  p('All WakeCap Power Solutions use monocrystalline silicon photovoltaic technology:'),
  space(100),

  table(
    ['Product', 'Cell Grade', 'Efficiency', 'Technology'],
    [
      ['WP-384', 'Grade-A Monocrystalline', '≥23%', 'Standard'],
      ['WP-768', 'N-Type A+ Grade Monocrystalline', '>22%', 'N-Type (better low-light)'],
      ['WP-4800T', 'Monocrystalline', '>20%', 'Standard'],
      ['WP-21600T', 'Monocrystalline', '>21%', 'Standard']
    ]
  ),
  space(200),

  h2('5.2 Temperature Derating'),
  p('Solar panel output decreases at elevated temperatures. Standard Temperature Coefficient (Pmax) is approximately -0.35%/°C above 25°C STC.'),
  space(100),

  p('Example calculation for 50°C ambient:'),
  bullet('Temperature rise above STC: 50°C - 25°C = 25°C'),
  bullet('Cell temperature (add ~20°C for module): ~70°C'),
  bullet('Effective rise: 70°C - 25°C = 45°C'),
  bullet('Power reduction: 45 × 0.35% = 15.75%'),
  bullet('Effective panel output at 50°C: ~84% of rated'),
  space(200),

  h2('5.3 Panel Soiling Considerations'),
  p('In desert environments, dust accumulation significantly impacts performance:'),
  bullet('Weekly cleaning recommended for optimal performance'),
  bullet('Dust buildup can reduce output by 15-25% within 2 weeks'),
  bullet('Tilt angle of 20-30° promotes natural dust shedding'),
  bullet('Use soft cloth and water only - no abrasive cleaners'),
  space(200),

  h2('5.4 Optimal Orientation'),
  p('For maximum annual energy harvest in Saudi Arabia (latitude ~24°N):'),
  bullet('Azimuth: True South (0°)'),
  bullet('Tilt: 20-30° from horizontal'),
  bullet('Seasonal adjustment: 15° (summer) to 35° (winter) if accessible'),

  new Paragraph({ children: [new PageBreak()] }),

  // SECTION 6: BATTERY SUBSYSTEM
  h1('6. Battery Energy Storage Subsystem'),
  space(100),

  h2('6.1 Battery Chemistry Comparison'),
  table(
    ['Parameter', 'LiFePO₄ (WP-384, WP-768)', 'GEL Lead Acid (WP-4800T)', 'Lead Acid (WP-21600T)'],
    [
      ['Nominal Voltage/Cell', '3.2V', '2.0V', '2.0V'],
      ['Cycle Life (80% DoD)', '2000-5000 cycles', '500-800 cycles', '300-500 cycles'],
      ['Calendar Life', '8-10 years', '5-7 years', '3-5 years'],
      ['Usable DoD', '80-90%', '50-70%', '50-70%'],
      ['Self-Discharge', '<3%/month', '3-5%/month', '5-15%/month'],
      ['Temperature Sensitivity', 'Low', 'Medium', 'High'],
      ['Maintenance', 'None', 'Minimal', 'Periodic equalization'],
      ['Weight (per Wh)', '~8 Wh/kg', '~35 Wh/kg', '~35 Wh/kg'],
      ['Cost (per Wh)', 'Higher', 'Medium', 'Lower'],
      ['Safety', 'Excellent', 'Good', 'Good']
    ]
  ),
  space(200),

  h2('6.2 LiFePO₄ Battery Management (WP-384, WP-768)'),
  p('The integrated BMS provides comprehensive protection:'),
  space(100),

  h3('6.2.1 Protection Functions'),
  bullet('Over-charge protection: >14.6V (cuts charging)'),
  bullet('Over-discharge protection: <10V (disconnects load)'),
  bullet('Over-current protection: Configurable threshold'),
  bullet('Short-circuit protection: Instantaneous disconnect'),
  bullet('High-temperature protection: >60°C (inhibits charge/discharge)'),
  bullet('Low-temperature charge protection: <-10°C (inhibits charging)'),
  bullet('Cell balancing: Active balancing during charge'),
  space(200),

  h3('6.2.2 Cold Weather Operation'),
  p('LiFePO₄ batteries have specific low-temperature behaviors:'),
  table(
    ['Condition', 'Charging', 'Discharging'],
    [
      ['Above 0°C', 'Full rate', 'Full rate'],
      ['-10°C to 0°C', 'Inhibited until recovery', 'Reduced capacity (~80%)'],
      ['-20°C to -10°C', 'Inhibited', 'Reduced capacity (~60%)'],
      ['Below -20°C', 'Inhibited', 'Inhibited']
    ]
  ),

  new Paragraph({ children: [new PageBreak()] }),

  h2('6.3 Lead Acid Battery Management (WP-4800T, WP-21600T)'),
  space(100),

  h3('6.3.1 Charging Profile'),
  p('Lead acid batteries require a specific charging profile:'),
  bullet('Bulk Stage: Constant current at max rate until ~80% SOC'),
  bullet('Absorption Stage: Constant voltage (14.4V/cell) until current tapers'),
  bullet('Float Stage: Reduced voltage (13.5V/cell) for maintenance'),
  bullet('Equalization: Periodic overcharge (15.5V) to balance cells'),
  space(200),

  h3('6.3.2 Temperature Compensation'),
  p('Charging voltage must be adjusted for temperature:'),
  bullet('Temperature coefficient: -3mV/°C per cell'),
  bullet('At 40°C: Reduce charge voltage by ~0.15V per cell'),
  bullet('At 50°C: Reduce charge voltage by ~0.25V per cell'),
  bullet('GEL batteries are more sensitive - follow manufacturer specs'),
  space(200),

  h2('6.4 Battery Maintenance Schedule'),
  table(
    ['Task', 'LiFePO₄ (WP-384/60)', 'GEL (WP-4800T)', 'Lead Acid (WP-21600T)'],
    [
      ['Visual Inspection', 'Every 6 months', 'Monthly', 'Monthly'],
      ['Terminal Cleaning', 'Annually', 'Quarterly', 'Quarterly'],
      ['Voltage Check', 'Every 6 months', 'Monthly', 'Monthly'],
      ['Capacity Test', 'Annually', 'Annually', 'Every 6 months'],
      ['Equalization Charge', 'N/A', 'N/A (GEL)', 'Quarterly'],
      ['Electrolyte Check', 'N/A (sealed)', 'N/A (sealed)', 'N/A (sealed)'],
      ['Expected Replacement', '8-10 years', '5-7 years', '3-5 years']
    ]
  ),

  new Paragraph({ children: [new PageBreak()] }),

  // SECTION 7: POWER MANAGEMENT
  h1('7. Power Management and Control'),
  space(100),

  h2('7.1 MPPT Charge Controller'),
  p('All systems use Maximum Power Point Tracking (MPPT) technology for optimal energy harvest.'),
  space(100),

  h3('7.1.1 MPPT Operating Principle'),
  p('MPPT controllers continuously adjust the operating point of the solar array to extract maximum power:'),
  bullet('Monitors solar panel voltage and current'),
  bullet('Calculates instantaneous power (P = V × I)'),
  bullet('Perturbs operating point to find maximum'),
  bullet('Converts voltage down to battery charging voltage'),
  bullet('Efficiency typically >95% (vs ~75% for PWM controllers)'),
  space(200),

  h2('7.2 Controller Specifications by Product'),
  table(
    ['Parameter', 'WP-384', 'WP-768', 'WP-4800T', 'WP-21600T'],
    [
      ['Controller Type', 'Integrated MPPT', 'Standalone MPPT', 'MPPT', 'EPEVER MPPT'],
      ['Rated Current', '[TBD]', '10A', '30A', '60A'],
      ['Efficiency', '>95%', '96.5%', '95%', '98%'],
      ['Max PV Input Voltage', '~24V', '20V', '[TBD]', '150V'],
      ['Battery Voltage', '12V', '12V', '12V', '24V'],
      ['Self-consumption', '[TBD]', '0.06W', '[TBD]', '[TBD]'],
      ['Reverse Polarity Protection', 'Yes', 'Yes', 'Yes', 'Yes'],
      ['Temperature Compensation', 'Yes', 'Yes', 'Yes', 'Yes'],
      ['Communication', 'IIC/RS485', '—', '—', '[TBD]']
    ]
  ),
  space(200),

  h2('7.3 Output Regulation'),
  p('DC output characteristics:'),
  space(100),
  table(
    ['Parameter', 'WP-384', 'WP-768', 'WP-4800T', 'WP-21600T'],
    [
      ['Nominal Output Voltage', '12V DC', '10.5-12.6V DC', '12V DC', '24V DC'],
      ['Voltage Tolerance', '±0.5V', '—', '[TBD]', '[TBD]'],
      ['Max Continuous Current', '3A', '10A', '<30A (25A typical)', '<60A (55A typical)'],
      ['Output Connector', 'Cable', '5.5×2.1mm DC', '[TBD]', '[TBD]'],
      ['Number of Channels', '1', '1', 'Multiple', 'Multiple']
    ]
  ),

  new Paragraph({ children: [new PageBreak()] }),

  // SECTION 8: PROTECTION SYSTEMS
  h1('8. Protection and Safety Systems'),
  space(100),

  h2('8.1 Electrical Protection Features'),
  p('WakeCap Power Solutions incorporate multiple layers of protection:'),
  space(100),

  table(
    ['Protection Type', 'WP-384', 'WP-768', 'WP-4800T', 'WP-21600T'],
    [
      ['Over-Current Protection', '4A (>3s)', '10A', '[TBD]', '[TBD]'],
      ['Short-Circuit Protection', '>5A instant', 'Yes', 'Yes', 'Yes'],
      ['Over-Voltage Protection', '>14.6V', 'Yes', 'Yes', 'Yes'],
      ['Under-Voltage Protection', '<10V', 'Yes', 'Yes', 'Yes'],
      ['Reverse Polarity Protection', 'Yes', 'Yes', 'Yes', 'Yes'],
      ['Over-Temperature Protection', '>60°C', 'Yes', '[TBD]', '[TBD]'],
      ['Lightning/Surge Protection', '[TBD]', '[TBD]', '[TBD]', '[TBD]']
    ]
  ),
  space(200),

  h2('8.2 Safety Warnings'),
  space(100),

  safetyPanel('danger', 'ELECTRICAL SHOCK HAZARD: Solar panels produce DC voltage when exposed to light. Disconnect all panels before servicing. Cover panels with opaque material if disconnection is not possible.'),
  space(150),

  safetyPanel('warning', 'BATTERY HAZARD: Lead-acid batteries (WP-4800T, WP-21600T) contain sulfuric acid and produce explosive hydrogen gas during charging. Ensure adequate ventilation. No smoking or open flames near batteries.'),
  space(150),

  safetyPanel('warning', 'LITHIUM BATTERY: LiFePO₄ batteries (WP-384, WP-768) must not be punctured, crushed, or exposed to fire. In case of damage, handle with care and dispose according to local regulations.'),
  space(150),

  safetyPanel('caution', 'HOT SURFACES: Enclosures may reach temperatures exceeding 60°C in direct sunlight. Allow cooling before maintenance. Use appropriate PPE.'),

  new Paragraph({ children: [new PageBreak()] }),

  // SECTION 9: ENVIRONMENTAL
  h1('9. Environmental Performance'),
  space(100),

  h2('9.1 Ingress Protection'),
  table(
    ['Product', 'IP Rating', 'Dust Protection', 'Water Protection'],
    [
      ['WP-384', 'IP66', 'Dust-tight', 'Powerful water jets'],
      ['WP-768', 'IP66', 'Dust-tight', 'Powerful water jets'],
      ['WP-4800T', 'IP65', 'Dust-tight', 'Low pressure water jets'],
      ['WP-21600T', 'IP65', 'Dust-tight', 'Low pressure water jets']
    ]
  ),
  space(200),

  h2('9.2 Temperature Specifications'),
  table(
    ['Parameter', 'WP-384', 'WP-768', 'WP-4800T', 'WP-21600T'],
    [
      ['Operating Range', '-20°C to +50°C', '-30°C to +85°C', '-20°C to +80°C', '-20°C to +85°C'],
      ['Storage Range', '-40°C to +60°C', '-30°C to +85°C', '-20°C to +80°C', '-20°C to +85°C'],
      ['Optimal Performance', '+10°C to +35°C', '+10°C to +35°C', '+10°C to +35°C', '+10°C to +35°C']
    ]
  ),
  space(200),

  h2('9.3 Corrosion Resistance'),
  p('All systems are designed for harsh environments:'),
  bullet('Solar panel frames: Anodized aluminum alloy'),
  bullet('Mounting brackets: Galvanized + powder-coated steel'),
  bullet('Enclosures: UV-resistant polymers or coated metals'),
  bullet('Trailers: Anti-oxidation electrostatic powder coating'),
  bullet('Fasteners: Stainless steel or zinc-plated'),
  space(100),

  p('For coastal deployments with salt air exposure:'),
  bullet('Increase inspection frequency to monthly'),
  bullet('Apply additional corrosion protection to exposed metal'),
  bullet('Consider supplementary enclosure sealing'),

  new Paragraph({ children: [new PageBreak()] }),

  // SECTION 10: INSTALLATION
  h1('10. Installation Engineering'),
  space(100),

  h2('10.1 Site Requirements'),
  table(
    ['Requirement', 'WP-384', 'WP-768', 'WP-4800T', 'WP-21600T'],
    [
      ['Ground Area', 'N/A (pole mount)', 'N/A (structure mount)', '~4 m²', '~6 m²'],
      ['Ground Type', 'Existing structure', 'Existing structure', 'Level, compacted', 'Level, compacted'],
      ['Vehicle Access', 'Light vehicle', 'Light vehicle', 'Pickup with trailer', 'Heavy vehicle'],
      ['Crane Required', 'No', 'No', 'No', 'No'],
      ['Solar Exposure', 'Southern sky', 'Southern sky', 'Southern sky', 'Southern sky']
    ]
  ),
  space(200),

  h2('10.2 Structural Requirements'),
  space(100),

  h3('10.2.1 WP-384 / WP-768 Mounting'),
  bullet('Pole diameter: 60-150mm (WP-384 clamps fit Ø150mm)'),
  bullet('Pole material: Steel or aluminum'),
  bullet('Minimum pole height: 3m above ground level'),
  bullet('Structural capacity: Must support system weight + wind load'),
  bullet('Wind load calculation: Consider local design wind speed'),
  space(200),

  h3('10.2.2 WP-4800T / WP-21600T Trailer Setup'),
  bullet('Level ground within 5° slope'),
  bullet('Deploy all outriggers (WP-4800T)'),
  bullet('Chock wheels before unhitching'),
  bullet('Anchor if wind speeds may exceed rating'),
  bullet('Minimum 2m clearance around trailer for maintenance'),
  space(200),

  h2('10.3 Electrical Installation'),
  space(100),

  safetyPanel('warning', 'All electrical connections must be made with system powered OFF. Verify zero voltage before connecting or disconnecting any cables.'),
  space(100),

  h3('10.3.1 Connection Sequence'),
  p('Follow this sequence to prevent damage:'),
  bullet('1. Connect load equipment (powered OFF)'),
  bullet('2. Connect battery (WP-4800T/900T: connect batteries in correct series/parallel configuration)'),
  bullet('3. Connect solar panels LAST'),
  space(100),

  h3('10.3.2 Disconnection Sequence'),
  p('Reverse sequence for disconnection:'),
  bullet('1. Cover solar panels with opaque material'),
  bullet('2. Disconnect solar panels'),
  bullet('3. Disconnect load equipment'),
  bullet('4. Disconnect battery (if required for service)'),

  new Paragraph({ children: [new PageBreak()] }),

  // SECTION 11: COMMISSIONING
  h1('11. Commissioning and Validation'),
  space(100),

  h2('11.1 Pre-Commissioning Checklist'),
  p('□ All components received and undamaged'),
  p('□ Installation completed per Section 10'),
  p('□ Solar panels oriented correctly (south-facing, 20-30° tilt)'),
  p('□ All electrical connections secure and properly terminated'),
  p('□ No visible damage to cables, connectors, or enclosures'),
  p('□ Battery state of charge verified (>40%)'),
  space(200),

  h2('11.2 System Startup'),
  space(100),

  h3('11.2.1 Initial Power-Up'),
  bullet('1. Verify battery voltage within normal range'),
  bullet('2. Connect solar panels (during daylight)'),
  bullet('3. Verify charging indicator active (blue LED flashing on WP-384)'),
  bullet('4. Measure output voltage at load terminals'),
  bullet('5. Connect load equipment'),
  bullet('6. Verify load operates correctly'),
  space(200),

  h2('11.3 Validation Tests'),
  table(
    ['Test', 'Expected Result', 'Pass Criteria'],
    [
      ['Battery Voltage', 'Within rated range', 'WP-384/60: 10.5-14.8V, WP-21600T: 22-29V'],
      ['Charging Current', 'Positive during sunlight', '>0.5A with sun'],
      ['Output Voltage', 'Nominal ± tolerance', 'WP-384: 12V ±0.5V'],
      ['Load Operation', 'Equipment powers ON', 'All devices functional'],
      ['Indicator Status', 'Normal operation', 'No fault indicators'],
      ['Night Operation', 'Battery supplies load', 'No interruption']
    ]
  ),
  space(200),

  h2('11.4 Documentation'),
  p('Record the following for system handover:'),
  bullet('Serial numbers of all major components'),
  bullet('Installation date and location coordinates'),
  bullet('Initial battery voltage and state of charge'),
  bullet('Connected load equipment and power consumption'),
  bullet('Photos of installation (overview, connections, solar orientation)'),

  new Paragraph({ children: [new PageBreak()] }),

  // SECTION 12: MAINTENANCE
  h1('12. Maintenance Engineering'),
  space(100),

  h2('12.1 Maintenance Schedule'),
  table(
    ['Task', 'Frequency', 'WP-384/60', 'WP-4800T/900T'],
    [
      ['Visual inspection', 'Monthly', '✓', '✓'],
      ['Solar panel cleaning', 'Weekly-Monthly', '✓', '✓'],
      ['Connection tightness check', 'Quarterly', '✓', '✓'],
      ['Battery voltage check', 'Monthly', '—', '✓'],
      ['Enclosure seal inspection', 'Quarterly', '✓', '✓'],
      ['Trailer wheel/brake check', 'Monthly', 'N/A', '✓'],
      ['Mast mechanism inspection', 'Monthly', 'N/A', '✓'],
      ['Full system test', 'Annually', '✓', '✓']
    ]
  ),
  space(200),

  h2('12.2 Solar Panel Maintenance'),
  bullet('Clean with soft cloth and water only'),
  bullet('No abrasive materials or solvents'),
  bullet('Inspect for cracks, delamination, or discoloration'),
  bullet('Check cable integrity and connector condition'),
  bullet('Verify mounting bracket tightness'),
  space(200),

  h2('12.3 Battery Maintenance'),
  space(100),

  h3('12.3.1 LiFePO₄ Batteries (WP-384, WP-768)'),
  bullet('No routine maintenance required'),
  bullet('Keep terminals clean and dry'),
  bullet('Monitor SOC indicator for anomalies'),
  bullet('Store at 40-60% SOC if not in use for extended periods'),
  space(100),

  h3('12.3.2 Lead Acid Batteries (WP-4800T, WP-21600T)'),
  bullet('Check terminal corrosion monthly'),
  bullet('Clean terminals with baking soda solution if corroded'),
  bullet('Verify electrolyte level (if accessible)'),
  bullet('Perform equalization charge quarterly (standard lead acid only)'),
  bullet('Replace batteries showing capacity below 80%'),

  new Paragraph({ children: [new PageBreak()] }),

  // SECTION 13: TROUBLESHOOTING
  h1('13. Troubleshooting and Diagnostics'),
  space(100),

  h2('13.1 Symptom-Based Troubleshooting'),
  table(
    ['Symptom', 'Possible Cause', 'Diagnostic Steps', 'Solution'],
    [
      ['No output power', 'Battery depleted', 'Check battery voltage', 'Recharge in sunlight'],
      ['No output power', 'Over-current trip', 'Check load current', 'Reduce load, reset system'],
      ['No charging', 'Panel disconnected', 'Check panel connections', 'Reconnect panels'],
      ['No charging', 'Panel shaded', 'Inspect panel surface', 'Remove shade source'],
      ['No charging', 'Controller fault', 'Check controller LED', 'Replace controller'],
      ['Low output voltage', 'Battery worn', 'Capacity test', 'Replace battery'],
      ['Intermittent power', 'Loose connection', 'Inspect all terminals', 'Tighten connections'],
      ['Overheating', 'Overload', 'Measure load current', 'Reduce load'],
      ['Overheating', 'Poor ventilation', 'Check enclosure temp', 'Improve airflow']
    ]
  ),
  space(200),

  h2('13.2 LED Diagnostic Reference (WP-384)'),
  table(
    ['LED Pattern', 'Meaning', 'Action'],
    [
      ['Blue flashing', 'Charging active', 'Normal operation'],
      ['Blue steady', 'Charge complete', 'Normal operation'],
      ['Blue off', 'No solar input', 'Check panels/sun'],
      ['Green steady', 'Output normal', 'Normal operation'],
      ['Green flashing', 'Overload/short', 'Reduce load, check wiring'],
      ['Green off', 'Shutdown/fault', 'Check battery, reset'],
      ['Red flashing', 'Low battery', 'Recharge system'],
      ['Red off', 'Battery OK', 'Normal operation']
    ]
  ),
  space(200),

  h2('13.3 When to Escalate'),
  p('Contact technical support if:'),
  bullet('Battery fails to hold charge after full recharge cycle'),
  bullet('Controller shows persistent fault even after reset'),
  bullet('Physical damage to enclosures, panels, or structure'),
  bullet('System repeatedly trips protection without apparent cause'),
  bullet('Performance degrades significantly (>30% below expected)'),

  new Paragraph({ children: [new PageBreak()] }),

  // SECTION 14: APPENDICES
  h1('14. Appendices'),
  space(200),

  h2('Appendix A: Glossary'),
  table(
    ['Term', 'Definition'],
    [
      ['Ah (Ampere-hour)', 'Unit of battery capacity; 1Ah = 1 ampere for 1 hour'],
      ['BMS', 'Battery Management System - monitors and protects battery pack'],
      ['DoD', 'Depth of Discharge - percentage of capacity used from battery'],
      ['LiFePO₄', 'Lithium Iron Phosphate - a lithium battery chemistry'],
      ['MPPT', 'Maximum Power Point Tracking - optimizes solar energy harvest'],
      ['PSH', 'Peak Sun Hours - equivalent hours of 1000 W/m² irradiance'],
      ['SOC', 'State of Charge - remaining battery capacity percentage'],
      ['Vmp', 'Voltage at Maximum Power point'],
      ['Voc', 'Open Circuit Voltage - panel voltage with no load'],
      ['Wh (Watt-hour)', 'Unit of energy; 1Wh = 1 watt for 1 hour']
    ]
  ),
  space(300),

  h2('Appendix B: Contact Information'),
  p('Technical Support: [TBD]'),
  p('Spare Parts: [TBD]'),
  p('Emergency: [TBD]'),
  space(300),

  h2('Appendix C: Document References'),
  bullet('WC-PS-LRG-v1.0: Power Solutions Logistics Reference Guide'),
  bullet('WC-PS-OSG-v1.0: Power Solutions Operations Selection Guide'),
  bullet('[TBD]: Installation Drawings'),
  bullet('[TBD]: Wiring Diagrams'),
  space(400),

  // END
  new Paragraph({
    alignment: AlignmentType.CENTER,
    border: { top: { style: BorderStyle.SINGLE, size: 6, color: COLORS.borderGray } },
    spacing: { before: 300 },
    children: [
      new TextRun({ text: '\n', size: 14 }),
      new TextRun({ text: 'END OF DOCUMENT', bold: true, size: 16, font: 'Arial', color: COLORS.mediumGray })
    ]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: 'WakeCap Power Solutions - Technical Engineering Manual v1.2', size: 14, font: 'Arial', color: COLORS.mediumGray })]
  })
];

// =============================================================================
// DOCUMENT GENERATION
// =============================================================================

const doc = new Document({
  styles: getDocumentStyles(VERSION),
  sections: [{
    properties: {
      page: {
        size: { width: PAGE_A4.width, height: PAGE_A4.height },
        margin: PAGE_A4.margins
      }
    },
    headers: {
      default: createPSHeader()
    },
    footers: {
      default: createFooter('WC-PS-TEM-v1.2', 'February 2026')
    },
    children: content
  }]
});

// Save document
const outputPath = path.resolve(__dirname, '../../output/power-solutions/WC-PS-TEM-v1.2.docx');
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outputPath, buffer);
  console.log(`Document saved: ${outputPath}`);
}).catch(err => {
  console.error('Error generating document:', err);
});

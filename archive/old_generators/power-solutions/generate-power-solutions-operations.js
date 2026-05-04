/**
 * WakeCap Power Solutions - Operations Selection Guide Generator
 * Document: WC-PS-OSG-v1.2
 * Purpose: Site-specific selection criteria and deployment guidance
 * Audience: Project Engineers, Site Engineers, Operations Department
 */

const {
  COLORS, PAGE_A4,
  createHeading: _createHeading,
  createBodyText,
  createBullet: _createBullet,
  createNumberedStep,
  createSpecTable,
  createCalloutBox,
  createImagePlaceholder: _createImagePlaceholder,
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

function createHeading(text, level) { return _createHeading(text, level, VERSION); }
function createBody(text) { return createBodyText(text, VERSION); }
function createBullet(text, level = 0) { return _createBullet(text, level, VERSION); }
function createNumberedItem(number, text) { return createNumberedStep(number, text, VERSION); }
function createTable(headers, rows) { return createSpecTable(headers, rows, VERSION, PS_ACCENT); }
function createCallout(type, _title, text) { return createCalloutBox(type, text, VERSION); }
function createImagePlaceholder(description) { return _createImagePlaceholder(description, VERSION); }

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

const docContent = [
  // COVER PAGE
  new Paragraph({ spacing: { after: 400 } }),
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
  new Paragraph({ spacing: { after: 600 } }),

  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 150 },
    children: [new TextRun({ text: 'POWER SOLUTIONS', bold: true, size: 52, font: 'Arial', color: COLORS.black })]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 300 },
    children: [new TextRun({ text: 'Operations Selection Guide', size: 38, font: 'Arial', color: COLORS.darkGray })]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 150 },
    children: [new TextRun({ text: 'Site Assessment & Solution Selection for Field Deployment', size: 22, font: 'Arial', color: COLORS.mediumGray })]
  }),

  new Paragraph({ spacing: { after: 300 } }),
  createImagePlaceholder('Decision flowchart graphic or product lineup comparison image'),

  new Paragraph({ spacing: { after: 400 } }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({ text: 'Document: WC-PS-OSG-v1.2', size: 20, font: 'Arial', color: COLORS.mediumGray }),
      new TextRun({ text: '     |     ', size: 20, color: COLORS.mediumGray }),
      new TextRun({ text: 'February 2026', size: 20, font: 'Arial', color: COLORS.mediumGray })
    ]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
    children: [new TextRun({ text: 'INTERNAL USE - OPERATIONS DEPARTMENT', bold: true, size: 18, font: 'Arial', color: COLORS.mediumGray })]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: 'Target: Project Engineers | Site Engineers | Operations Managers', size: 18, font: 'Arial', color: COLORS.mediumGray })]
  }),

  new Paragraph({ children: [new PageBreak()] }),

  // TABLE OF CONTENTS
  createHeading('TABLE OF CONTENTS', 1),
  createBody('1. Quick Selection Guide ......................................................... 3'),
  createBody('2. Load Calculation Fundamentals ........................................... 4'),
  createBody('3. Product Specifications Comparison ...................................... 6'),
  createBody('4. Site Assessment Checklist .................................................. 8'),
  createBody('5. Environmental Considerations ............................................. 10'),
  createBody('6. Installation Requirements ................................................... 11'),
  createBody('7. Solution Selection Decision Tree ......................................... 13'),
  createBody('8. Common Deployment Scenarios ........................................... 14'),

  new Paragraph({ children: [new PageBreak()] }),

  // SECTION 1: QUICK SELECTION GUIDE
  createHeading('1. Quick Selection Guide', 1),
  createBody('Use this section for rapid solution selection based on your equipment load requirements.'),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('1.1 Selection by Load', 2),
  createBody('Match your total system power consumption to the appropriate Power Solution:'),
  new Paragraph({ spacing: { after: 150 } }),

  createTable(
    ['Total System Load', 'Recommended Solution', 'Typical Equipment', 'Backup Time*'],
    [
      ['≤ 8W', 'WakeCap Power 384 (WP-384)', 'WakeCap Gateway only', '48+ hours'],
      ['9W - 15W', 'WakeCap Power 768 (WP-768)', 'Single bullet camera, small sensor', '48+ hours'],
      ['16W - 100W', 'WakeCap Power 4800T (WP-4800T)', 'PTZ camera, multiple bullets, gateway + cameras', '48+ hours'],
      ['101W - 350W', 'WakeCap Power 21600T (WP-21600T)', 'Multiple PTZ cameras, comm equipment', '48+ hours']
    ]
  ),
  new Paragraph({ spacing: { after: 100 } }),
  createBody('* Backup time assumes zero solar input (worst case). Actual runtime varies with solar conditions.'),
  new Paragraph({ spacing: { after: 200 } }),

  createCallout('important', 'Critical', 'Always calculate TOTAL SYSTEM POWER, not just device power. System power includes the device, PoE injectors, routers, voltage converters, and all auxiliary equipment.'),
  new Paragraph({ spacing: { after: 300 } }),

  createHeading('1.2 Equipment Power Reference', 2),
  createBody('Standard power consumption for common equipment:'),
  new Paragraph({ spacing: { after: 150 } }),

  createTable(
    ['Equipment Type', 'Device Power', 'System Power*', 'Notes'],
    [
      ['WakeCap Gateway', '~5W', '~8W', 'Includes power conversion losses'],
      ['Bullet Camera (standard)', '15W', '35W', 'Includes PoE injector, router'],
      ['PTZ Camera (Type 1)', '42W', '70W', 'Mid-range PTZ with PoE'],
      ['PTZ Camera (Type 2)', '62W', '90W', 'High-end PTZ with heater'],
      ['Network Router/Switch', '5-15W', '—', 'Add to system total'],
      ['PoE Injector', '3-8W', '—', 'Conversion losses']
    ]
  ),
  new Paragraph({ spacing: { after: 100 } }),
  createBody('* System Power = Device + PoE + Router + Conversion Losses. Always use System Power for selection.'),

  new Paragraph({ children: [new PageBreak()] }),

  // SECTION 2: LOAD CALCULATION
  createHeading('2. Load Calculation Fundamentals', 1),
  createBody('Proper load calculation is essential for selecting the correct power solution. Follow this systematic approach.'),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('2.1 Calculation Order', 2),
  createBody('Power system sizing follows this sequence:'),
  new Paragraph({ spacing: { after: 100 } }),
  createNumberedItem(1, 'LOAD - Calculate total continuous power consumption'),
  createNumberedItem(2, 'BATTERY - Size battery bank for required backup duration'),
  createNumberedItem(3, 'SOLAR - Size solar array to recharge battery daily'),
  createNumberedItem(4, 'MPPT - Select controller to handle solar current'),
  createNumberedItem(5, 'AUXILIARY - Add protection, cabling, mounting'),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('2.2 Standard Design Parameters', 2),
  createBody('All WakeCap Power Solutions are designed using these parameters:'),
  new Paragraph({ spacing: { after: 150 } }),

  createTable(
    ['Parameter', 'Symbol', 'Value', 'Description'],
    [
      ['Backup Time', 'T', '48 hours', 'Required autonomy without solar input'],
      ['Depth of Discharge', 'DoD', '70%', 'Usable battery capacity'],
      ['System Efficiency', 'η_sys', '90%', 'Wiring and general losses'],
      ['Converter Efficiency', 'η_conv', '80%', 'DC-DC conversion losses'],
      ['Solar Derating', 'η_solar', '75%', 'Dust, misalignment, temperature'],
      ['MPPT Efficiency', 'η_mppt', '95%', 'Charge controller efficiency'],
      ['Peak Sun Hours', 'PSH', '6.5 hours', 'Saudi Arabia average']
    ]
  ),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('2.3 Battery Capacity Formula', 2),
  createBody('Required battery capacity (Ah) for a given load:'),
  new Paragraph({ spacing: { after: 100 } }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    shading: { fill: COLORS.lightGray, type: ShadingType.CLEAR },
    spacing: { before: 100, after: 100 },
    children: [new TextRun({ text: 'Battery (Ah) = (T × Load) / (DoD × η_sys × η_conv × V)', bold: true, size: 24, font: 'Courier New', color: COLORS.darkGray })]
  }),
  new Paragraph({ spacing: { after: 100 } }),
  createBody('Where: T = 48h, DoD = 0.70, η_sys = 0.90, η_conv = 0.80, V = System Voltage'),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('2.4 Example Calculation', 2),
  createBody('Calculate the solution for a single PTZ Camera (Type 1) system:'),
  new Paragraph({ spacing: { after: 100 } }),
  createBullet('System Load: 70W (42W camera + PoE + router)'),
  createBullet('System Voltage: 12V'),
  createBullet('Required Battery = (48 × 70) / (0.70 × 0.90 × 0.80 × 12)'),
  createBullet('Required Battery = 3360 / 6.048 = 556 Ah'),
  new Paragraph({ spacing: { after: 100 } }),

  createCallout('note', 'Result', 'A 70W load requires approximately 556Ah battery capacity. The WP-4800T (400Ah) is insufficient; select WP-21600T (900Ah @ 24V = equivalent to ~450Ah usable at 12V reference, but provides 24V system) for margin. Alternatively, reduce load or accept shorter backup time.'),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('2.5 Load Capacity Summary', 2),
  createBody('Maximum continuous loads per solution (for 48-hour backup):'),
  new Paragraph({ spacing: { after: 150 } }),

  createTable(
    ['Solution', 'Battery Capacity', 'Max Load (48h backup)', 'Max Load (24h backup)'],
    [
      ['WP-384', '30Ah / 384Wh', '~8W', '~16W'],
      ['WP-768', '60Ah / 768Wh', '~15W', '~30W'],
      ['WP-4800T', '400Ah / 4,800Wh', '~100W', '~200W'],
      ['WP-21600T', '900Ah @ 24V / 21,600Wh', '~350W', '~700W']
    ]
  ),

  new Paragraph({ children: [new PageBreak()] }),

  // SECTION 3: SPECIFICATIONS COMPARISON
  createHeading('3. Product Specifications Comparison', 1),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('3.1 Power System Specifications', 2),
  createTable(
    ['Specification', 'WP-384', 'WP-768', 'WP-4800T', 'WP-21600T'],
    [
      ['System Voltage', '12V DC', '12V DC', '12V DC', '24V DC'],
      ['Battery Capacity', '30Ah', '60Ah', '400Ah (2×200)', '900Ah (6×150)'],
      ['Battery Energy', '384Wh', '768Wh', '4,800Wh', '21,600Wh'],
      ['Battery Type', 'LiFePO4', 'LiFePO4', 'GEL Lead Acid', 'HT Lead Acid'],
      ['Solar Power', '80W', '100W', '450W', '1,305W'],
      ['Solar Panels', '2 × 40W', '2 × 50W', '3 × 150W', '3 × 435W'],
      ['MPPT Controller', 'Integrated', '10A', '30A', '60A EPEVER'],
      ['MPPT Efficiency', '>95%', '96.5%', '95%', '98%'],
      ['Output Voltage', '12V ±0.5V', '10.5-12.6V', '12V DC', '24V DC'],
      ['Max Output Current', '3A', '10A', '<30A (25A typical)', '<60A (55A typical)']
    ]
  ),
  new Paragraph({ spacing: { after: 300 } }),

  createHeading('3.2 Physical Specifications', 2),
  createTable(
    ['Specification', 'WP-384', 'WP-768', 'WP-4800T', 'WP-21600T'],
    [
      ['Total Weight', '~6 kg', '23 kg', '525 kg', '1,300 kg'],
      ['Form Factor', 'Pole/Wall Mount', 'Bracket Mount', 'Trailer', 'Trailer'],
      ['Mast Height', 'N/A', 'N/A', '6.5m (pneumatic)', '9m (manual)'],
      ['Transport Size (mm)', '780×530×200', '940×780×240', '2000×1400×2300', '2320×1495×2350'],
      ['Deployed Size (mm)', '780×530×varies', '940×780×varies', '2000×2250×6500', '2320×1495×2350 (+ mast)'],
      ['Trailer Type', 'N/A', 'N/A', 'Single axle', 'Single axle'],
      ['Tow Hitch', 'N/A', 'N/A', 'Ball hitch', '50mm ball hitch'],
      ['Tire Size', 'N/A', 'N/A', '165/70R13', '15"']
    ]
  ),
  new Paragraph({ spacing: { after: 300 } }),

  createHeading('3.3 Environmental Ratings', 2),
  createTable(
    ['Specification', 'WP-384', 'WP-768', 'WP-4800T', 'WP-21600T'],
    [
      ['IP Rating', 'IP66', 'IP66', 'IP65', 'IP65'],
      ['Operating Temp', '-20°C to +50°C', '-30°C to +85°C', '-20°C to +80°C', '-20°C to +85°C'],
      ['Charge Temp (Low)', '-10°C', '-30°C', '[TBD]', '[TBD]'],
      ['Discharge Temp (Low)', '-20°C', '-30°C', '[TBD]', '[TBD]'],
      ['Wind Rating (Panel)', '2400Pa', '60m/s (200kg/m²)', '100 km/h', '100 km/h'],
      ['Snow Load', '5400Pa', '[TBD]', '[TBD]', '[TBD]']
    ]
  ),
  new Paragraph({ spacing: { after: 200 } }),

  createCallout('tip', 'Battery Chemistry Note', 'LiFePO4 batteries (WP-384, WP-768) offer better cold weather performance and longer cycle life. GEL/Lead Acid batteries (WP-4800T, WP-21600T) are more cost-effective for high-capacity applications but require more frequent replacement.'),

  new Paragraph({ children: [new PageBreak()] }),

  // SECTION 4: SITE ASSESSMENT
  createHeading('4. Site Assessment Checklist', 1),
  createBody('Complete this assessment before selecting and deploying a Power Solution.'),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('4.1 Load Requirements', 2),
  createBody('□ List all equipment to be powered:'),
  createBullet('Equipment 1: _____________ Power: _____ W'),
  createBullet('Equipment 2: _____________ Power: _____ W'),
  createBullet('Equipment 3: _____________ Power: _____ W'),
  createBullet('PoE Injectors / Converters: _____ W'),
  createBullet('Network Equipment: _____ W'),
  createBody('□ TOTAL SYSTEM LOAD: _________ W'),
  createBody('□ Required backup time without solar: _________ hours (standard: 48h)'),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('4.2 Site Access', 2),
  createBody('□ Access road available for:'),
  createBullet('Light vehicle (WP-384, WP-768): □ Yes □ No'),
  createBullet('Pickup truck with trailer (WP-4800T): □ Yes □ No'),
  createBullet('Heavy truck with trailer (WP-21600T): □ Yes □ No'),
  createBody('□ Site accessible during deployment period: □ Yes □ No'),
  createBody('□ Crane or lifting equipment available (if needed): □ Yes □ No'),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('4.3 Ground Conditions', 2),
  createBody('□ Ground type: □ Compacted soil □ Sand □ Gravel □ Concrete □ Other: _______'),
  createBody('□ Ground is level (within 5°): □ Yes □ No'),
  createBody('□ Ground can support trailer weight: □ Yes □ No □ N/A'),
  createBody('□ Anchor points available (for trailers): □ Yes □ No □ N/A'),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('4.4 Mounting Structure (WP-384, WP-768 only)', 2),
  createBody('□ Existing pole available: □ Yes □ No'),
  createBody('□ Pole diameter: _________ mm (WP-384 clamps fit Ø150mm)'),
  createBody('□ Pole structural capacity verified: □ Yes □ No'),
  createBody('□ Wall mounting possible: □ Yes □ No'),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('4.5 Solar Exposure', 2),
  createBody('□ Clear southern sky exposure: □ Yes □ Partial □ No'),
  createBody('□ Shading from structures/equipment: □ None □ Morning □ Afternoon □ Full day'),
  createBody('□ Estimated Peak Sun Hours: _________ hours/day (Saudi average: 6.5h)'),
  createBody('□ Seasonal variation considered: □ Yes □ No'),

  new Paragraph({ children: [new PageBreak()] }),

  // SECTION 5: ENVIRONMENTAL CONSIDERATIONS
  createHeading('5. Environmental Considerations', 1),
  createBody('Saudi Arabia deployment environments require special attention to these factors.'),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('5.1 Desert Environment', 2),
  createBullet('High ambient temperatures (up to 50°C+)'),
  createBullet('Solar panel derating at high temperatures (expect 10-15% reduction)'),
  createBullet('Battery capacity reduction at extreme temperatures'),
  createBullet('Dust accumulation on solar panels - plan monthly cleaning'),
  createBullet('Sand/dust ingress - verify IP rating adequate for location'),
  new Paragraph({ spacing: { after: 200 } }),

  createCallout('warning', 'High Temperature', 'At temperatures above 45°C, expect reduced charging efficiency and shorter battery runtime. LiFePO4 batteries (WP-384, WP-768) handle heat better than Lead Acid (WP-4800T, WP-21600T). Consider shading the battery enclosure if possible.'),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('5.2 Coastal/Humid Environment', 2),
  createBullet('Salt air accelerates corrosion on exposed metal'),
  createBullet('Higher humidity reduces solar panel efficiency slightly'),
  createBullet('Verify all connections are sealed and protected'),
  createBullet('More frequent maintenance inspections recommended'),
  createBullet('Consider additional corrosion protection for trailer frames'),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('5.3 Wind Considerations', 2),
  createBody('Maximum wind ratings by product:'),
  createBullet('WP-384/WP-768: Solar panels rated for 60 m/s (216 km/h)'),
  createBullet('WP-4800T/WP-21600T: Mast should be lowered in high winds'),
  createBullet('WP-21600T: System rated for 100 km/h wind speed'),
  new Paragraph({ spacing: { after: 100 } }),

  createCallout('important', 'Mast Safety', 'Always lower trailer masts before wind speeds exceed 50 km/h. Extended masts act as significant wind loads and can cause trailer instability or structural damage.'),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('5.4 Security Considerations', 2),
  createBullet('Site fencing recommended for all trailer deployments'),
  createBullet('Wheel locks and hitch locks for theft deterrence'),
  createBullet('Consider GPS tracking for high-value trailer units'),
  createBullet('Remote monitoring via cellular (if available) for intrusion alerts'),

  new Paragraph({ children: [new PageBreak()] }),

  // SECTION 6: INSTALLATION REQUIREMENTS
  createHeading('6. Installation Requirements', 1),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('6.1 Personnel Requirements', 2),
  createTable(
    ['Solution', 'Min. Personnel', 'Skill Level', 'Special Equipment'],
    [
      ['WP-384', '1 technician', 'Basic electrical', 'Ladder, hand tools'],
      ['WP-768', '1 technician', 'Basic electrical', 'Ladder, hand tools, drill'],
      ['WP-4800T', '2 technicians', 'Electrical + mechanical', 'Tow vehicle, level, hand tools'],
      ['WP-21600T', '2-3 technicians', 'Electrical + mechanical', 'Heavy tow vehicle, level, hand tools']
    ]
  ),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('6.2 Installation Time Estimates', 2),
  createTable(
    ['Solution', 'Setup Time', 'Equipment Connection', 'Commissioning', 'Total'],
    [
      ['WP-384', '30 min', '15 min', '15 min', '~1 hour'],
      ['WP-768', '45 min', '15 min', '15 min', '~1.25 hours'],
      ['WP-4800T', '1.5 hours', '30 min', '30 min', '~2.5 hours'],
      ['WP-21600T', '2 hours', '45 min', '30 min', '~3.25 hours']
    ]
  ),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('6.3 Pre-Installation Checklist', 2),
  createBody('□ Site assessment completed (Section 4)'),
  createBody('□ Equipment manifest verified against delivery'),
  createBody('□ All components present and undamaged'),
  createBody('□ Battery state of charge verified (>40% recommended)'),
  createBody('□ Tools and PPE available'),
  createBody('□ Weather conditions acceptable (no rain, wind < 30 km/h)'),
  createBody('□ Communication with site supervisor confirmed'),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('6.4 Solar Panel Orientation', 2),
  createBody('For optimal energy harvest in Saudi Arabia:'),
  createBullet('Panel orientation: SOUTH (0° azimuth)'),
  createBullet('Tilt angle: 20-30° from horizontal (WP-768 adjustable 0-30°)'),
  createBullet('Seasonal adjustment: 15° summer, 35° winter (if accessible)'),
  createBullet('Avoid any shading, especially partial shading across cells'),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('6.5 Trailer Setup Procedure (WP-4800T, WP-21600T)', 2),
  createNumberedItem(1, 'Position trailer on level ground with southern sky exposure'),
  createNumberedItem(2, 'Engage parking brake and chock wheels'),
  createNumberedItem(3, 'Deploy outriggers and level trailer (WP-4800T)'),
  createNumberedItem(4, 'Disconnect from tow vehicle'),
  createNumberedItem(5, 'Deploy and orient solar panels'),
  createNumberedItem(6, 'Raise mast to desired height'),
  createNumberedItem(7, 'Mount equipment to mast/camera box'),
  createNumberedItem(8, 'Connect equipment cables'),
  createNumberedItem(9, 'Verify system operation'),

  new Paragraph({ children: [new PageBreak()] }),

  // SECTION 7: DECISION TREE
  createHeading('7. Solution Selection Decision Tree', 1),
  createBody('Follow this flowchart to select the appropriate Power Solution:'),
  new Paragraph({ spacing: { after: 200 } }),

  createImagePlaceholder('Decision tree flowchart: Start → Calculate Load → Select by load range → Verify site access → Confirm selection'),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('7.1 Decision Steps', 2),
  createNumberedItem(1, 'Calculate TOTAL SYSTEM LOAD (not device power alone)'),
  createNumberedItem(2, 'Check load against solution capacity table (Section 1.1)'),
  createNumberedItem(3, 'Verify site access for selected solution'),
  createNumberedItem(4, 'Confirm environmental compatibility'),
  createNumberedItem(5, 'If multiple solutions qualify, prefer smaller for cost savings'),
  createNumberedItem(6, 'If borderline, select larger solution for margin'),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('7.2 Quick Decision Matrix', 2),
  createTable(
    ['If your load is...', 'And site has...', 'Select...'],
    [
      ['≤8W (Gateway only)', 'Existing pole/wall', 'WP-384'],
      ['9-15W (single camera)', 'Existing structure', 'WP-768'],
      ['16-100W (PTZ or multi-camera)', 'Vehicle access + level ground', 'WP-4800T'],
      ['101-350W (surveillance system)', 'Heavy vehicle access + space', 'WP-21600T'],
      ['>350W', 'Any', 'Multiple units or custom solution']
    ]
  ),

  new Paragraph({ children: [new PageBreak()] }),

  // SECTION 8: DEPLOYMENT SCENARIOS
  createHeading('8. Common Deployment Scenarios', 1),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('8.1 Scenario A: Remote Gateway', 2),
  createBody('Situation: WakeCap Gateway for worker tracking at isolated site'),
  createBullet('Equipment: WakeCap Gateway (~8W system)'),
  createBullet('Solution: WP-384'),
  createBullet('Mounting: Existing pole or temporary pole'),
  createBullet('Installation: 1 technician, ~1 hour'),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('8.2 Scenario B: Single Bullet Camera', 2),
  createBody('Situation: Security camera monitoring equipment yard'),
  createBullet('Equipment: Bullet camera + PoE + router (~35W system)'),
  createBullet('Solution: WP-768 (15W continuous allows 24h backup at 35W)'),
  createBullet('Alternative: WP-4800T for full 48h backup'),
  createBullet('Mounting: Bracket on structure or dedicated pole'),
  createBullet('Installation: 1 technician, ~1.25 hours'),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('8.3 Scenario C: Single PTZ Camera', 2),
  createBody('Situation: PTZ surveillance camera at remote checkpoint'),
  createBullet('Equipment: PTZ camera Type 1 (~70W system)'),
  createBullet('Solution: WP-4800T (100W capacity with margin)'),
  createBullet('Mounting: Trailer mast (6.5m height)'),
  createBullet('Installation: 2 technicians, ~2.5 hours'),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('8.4 Scenario D: Multi-Camera Surveillance', 2),
  createBody('Situation: Construction site perimeter monitoring'),
  createBullet('Equipment: 2× PTZ cameras + 1× bullet + router (~200W system)'),
  createBullet('Solution: WP-21600T (350W capacity)'),
  createBullet('Mounting: Trailer mast (9m height)'),
  createBullet('Installation: 2-3 technicians, ~3.25 hours'),
  createBullet('Note: Consider communication equipment power if cellular backhaul needed'),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('8.5 Scenario E: High-Power PTZ System', 2),
  createBody('Situation: High-end PTZ with heating element in harsh environment'),
  createBullet('Equipment: PTZ Type 2 (~90W) + backup camera (~35W) = 125W system'),
  createBullet('Solution: WP-21600T'),
  createBullet('Note: WP-4800T insufficient for 48h backup at 125W'),
  new Paragraph({ spacing: { after: 300 } }),

  createCallout('note', 'Hybrid Deployments', 'For some sites, deploying multiple smaller units may be more practical than one large unit. Example: Two WP-768 units for separate cameras vs. one WP-4800T requires no trailer access but needs two mounting structures.'),

  new Paragraph({ spacing: { after: 600 } }),

  // DOCUMENT FOOTER
  new Paragraph({
    alignment: AlignmentType.CENTER,
    border: { top: { style: BorderStyle.SINGLE, size: 6, color: COLORS.borderGray } },
    spacing: { before: 300 },
    children: [
      new TextRun({ text: '\n', size: 16 }),
      new TextRun({ text: 'END OF DOCUMENT', bold: true, size: 18, font: 'Arial', color: COLORS.mediumGray })
    ]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: 'WakeCap Power Solutions - Operations Selection Guide v1.2', size: 16, font: 'Arial', color: COLORS.mediumGray })]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: 'For technical support: [TBD - Operations Support Contact]', size: 16, font: 'Arial', color: COLORS.mediumGray })]
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
      default: createFooter('WC-PS-OSG-v1.2', 'February 2026')
    },
    children: docContent
  }]
});

// Save document
const outputPath = path.resolve(__dirname, '../../output/power-solutions/WC-PS-OSG-v1.2.docx');
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outputPath, buffer);
  console.log(`Document saved: ${outputPath}`);
}).catch(err => {
  console.error('Error generating document:', err);
});

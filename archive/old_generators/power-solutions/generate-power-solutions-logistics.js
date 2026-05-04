/**
 * WakeCap Power Solutions - Logistics Reference Guide Generator
 * Document: WC-PS-LRG-v1.2
 * Purpose: Basic product identification, specifications, and inventory management
 * Audience: Logistics/Inventory Department
 */

const {
  COLORS, PAGE_A4,
  createHeading: _createHeading,
  createBodyText,
  createBullet: _createBullet,
  createSpecTable,
  createImagePlaceholder: _createImagePlaceholder,
  createHeader, createFooter,
  getDocumentStyles,
  Document, Packer, Paragraph, TextRun, ImageRun, Header,
  AlignmentType, BorderStyle, PageBreak, PageNumber
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

function createHeading(text, level) { return _createHeading(text, level, VERSION); }
function createBody(text) { return createBodyText(text, VERSION); }
function createBullet(text) { return _createBullet(text, 0, VERSION); }
function createTable(headers, rows) { return createSpecTable(headers, rows, VERSION, PS_ACCENT); }
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
  new Paragraph({ spacing: { after: 600 } }),
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
  new Paragraph({ spacing: { after: 800 } }),

  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [new TextRun({ text: 'POWER SOLUTIONS', bold: true, size: 56, font: 'Arial', color: COLORS.black })]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 400 },
    children: [new TextRun({ text: 'Logistics Reference Guide', size: 40, font: 'Arial', color: COLORS.darkGray })]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 800 },
    children: [new TextRun({ text: 'Product Identification & Inventory Management', size: 24, font: 'Arial', color: COLORS.mediumGray })]
  }),

  createImagePlaceholder('Product lineup photo showing all four Power Solution tiers'),

  new Paragraph({ spacing: { after: 600 } }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({ text: 'Document: WC-PS-LRG-v1.2', size: 20, font: 'Arial', color: COLORS.mediumGray }),
      new TextRun({ text: '     |     ', size: 20, font: 'Arial', color: COLORS.mediumGray }),
      new TextRun({ text: 'Revision Date: February 2026', size: 20, font: 'Arial', color: COLORS.mediumGray })
    ]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [new TextRun({ text: 'INTERNAL USE - LOGISTICS DEPARTMENT', bold: true, size: 18, font: 'Arial', color: COLORS.mediumGray })]
  }),

  new Paragraph({ children: [new PageBreak()] }),

  // TABLE OF CONTENTS
  createHeading('TABLE OF CONTENTS', 1),
  createBody('1. Introduction ...................................................................... 3'),
  createBody('2. Product Portfolio Overview .................................................. 3'),
  createBody('3. Product Identification Guide ................................................ 4'),
  createBody('4. Specifications Summary ...................................................... 5'),
  createBody('5. Shipping & Storage Requirements ........................................ 7'),
  createBody('6. Inventory Quick Reference .................................................. 8'),

  new Paragraph({ children: [new PageBreak()] }),

  // SECTION 1: INTRODUCTION
  createHeading('1. Introduction', 1),
  createBody('This document provides the Logistics and Inventory department with essential information for identifying, storing, handling, and tracking WakeCap Power Solutions. These are complete solar power systems designed to provide off-grid power for WakeCap equipment and third-party devices in remote locations.'),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('1.1 Document Purpose', 2),
  createBullet('Enable quick product identification by model number, appearance, and packaging'),
  createBullet('Provide shipping dimensions and weights for logistics planning'),
  createBullet('Define storage requirements and handling precautions'),
  createBullet('Support inventory management with part numbers and specifications'),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('1.2 Product Naming Convention', 2),
  createBody('WakeCap Power Solutions use a standardized naming system based on battery capacity:'),
  new Paragraph({ spacing: { after: 100 } }),

  createTable(
    ['Product Name', 'Model Code', 'Battery Capacity', 'Form Factor'],
    [
      ['WakeCap Power 384', 'WP-384', '30Ah', 'Pole/Wall Mount Unit'],
      ['WakeCap Power 768', 'WP-768', '60Ah', 'Bracket Mount Kit'],
      ['WakeCap Power 4800T', 'WP-4800T', '400Ah', 'Compact Trailer'],
      ['WakeCap Power 21600T', 'WP-21600T', '900Ah (24V)', 'Full-Size Trailer']
    ]
  ),
  new Paragraph({ spacing: { after: 300 } }),

  // SECTION 2: PRODUCT PORTFOLIO OVERVIEW
  createHeading('2. Product Portfolio Overview', 1),
  createBody('The Power Solutions portfolio consists of four tiers, each designed for progressively higher power demands. Selection is based on the total load (watts) that needs to be powered.'),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('2.1 WakeCap Power 384 (WP-384)', 2),
  createBody('The smallest power solution, designed specifically for powering WakeCap Gateway devices. Compact pole or wall-mounted design suitable for installation on existing structures.'),
  createBullet('Primary Use: WakeCap Gateway'),
  createBullet('Maximum Load: ~8W continuous'),
  createBullet('Battery: 30Ah Lithium Iron Phosphate (LiFePO4)'),
  createBullet('Solar: 80W monocrystalline panel'),
  new Paragraph({ alignment: AlignmentType.CENTER, children: [new ImageRun({ data: wp384Img, transformation: { width: 400, height: 400 }, type: 'png' })] }),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('2.2 WakeCap Power 768 (WP-768)', 2),
  createBody('A mid-size bracket-mounted kit for low-power devices such as single cameras or sensor systems. Integrated design with solar panel and battery enclosure.'),
  createBullet('Primary Use: Single bullet cameras, small sensors'),
  createBullet('Maximum Load: ~15W continuous'),
  createBullet('Battery: 60Ah Lithium Iron Phosphate (LiFePO4)'),
  createBullet('Solar: 100W monocrystalline panels (2 × 50W)'),
  new Paragraph({ alignment: AlignmentType.CENTER, children: [new ImageRun({ data: wp768Img, transformation: { width: 400, height: 400 }, type: 'png' })] }),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('2.3 WakeCap Power 4800T (WP-4800T)', 2),
  createBody('A trailer-mounted power station for medium to high power loads. Features a 6.5-meter pneumatic mast for elevated equipment mounting. Towable and repositionable.'),
  createBullet('Primary Use: Multiple cameras, PTZ cameras, communication equipment'),
  createBullet('Maximum Load: ~100W continuous'),
  createBullet('Battery: 400Ah GEL Lead Acid (2 × 200Ah @ 12V)'),
  createBullet('Solar: 450W monocrystalline panels (3 × 150W)'),
  new Paragraph({ alignment: AlignmentType.CENTER, children: [new ImageRun({ data: wp4800tImg, transformation: { width: 400, height: 400 }, type: 'png' })] }),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('2.4 WakeCap Power 21600T (WP-21600T)', 2),
  createBody('The largest power solution - a full-size trailer for high-demand deployments. Features a 9-meter manual mast and 24V DC system for extended runtime with heavy loads.'),
  createBullet('Primary Use: Multi-camera surveillance, high-power PTZ systems'),
  createBullet('Maximum Load: ~350W continuous'),
  createBullet('Battery: 900Ah High-Temperature Lead Acid (6 × 150Ah @ 24V)'),
  createBullet('Solar: 1305W monocrystalline panels (3 × 435W)'),
  new Paragraph({ alignment: AlignmentType.CENTER, children: [new ImageRun({ data: wp21600tImg, transformation: { width: 400, height: 400 }, type: 'png' })] }),

  new Paragraph({ children: [new PageBreak()] }),

  // SECTION 3: PRODUCT IDENTIFICATION
  createHeading('3. Product Identification Guide', 1),
  createBody('Use the following visual and label identifiers to distinguish between products:'),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('3.1 Visual Identification', 2),
  createTable(
    ['Product', 'Key Visual Features'],
    [
      ['WP-384', 'Small box-style enclosure, single solar panel (~780mm), pole clamps included'],
      ['WP-768', 'Medium enclosure with dual tilted panels (~940mm width), bracket mount system'],
      ['WP-4800T', 'White trailer body, 3 solar panels, 6.5m pneumatic mast, single axle'],
      ['WP-21600T', 'Larger trailer body, 3 large solar panels, 9m mast tower, equipment cabinet']
    ]
  ),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('3.2 Label Location & Information', 2),
  createBody('Each product has an identification label containing:'),
  createBullet('Model Number (WP-384, WP-768, WP-4800T, WP-21600T)'),
  createBullet('Serial Number'),
  createBullet('Manufacturing Date'),
  createBullet('Rated Voltage and Capacity'),
  new Paragraph({ spacing: { after: 100 } }),
  createBody('Label locations:'),
  createBullet('WP-384: On battery enclosure rear panel'),
  createBullet('WP-768: On battery enclosure side panel'),
  createBullet('WP-4800T: Inside equipment cabinet door'),
  createBullet('WP-21600T: Inside main equipment cabinet'),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('3.3 Part Numbers Reference', 2),
  createTable(
    ['Product', 'WakeCap Part Number', 'Supplier Model', 'Barcode Prefix'],
    [
      ['WakeCap Power 384', '[TBD]', 'G8030', '[TBD]'],
      ['WakeCap Power 768', '[TBD]', 'TS-100W60AH', '[TBD]'],
      ['WakeCap Power 4800T', '[TBD]', '[TBD]', '[TBD]'],
      ['WakeCap Power 21600T', '[TBD]', 'VTS3P', '[TBD]']
    ]
  ),
  new Paragraph({ spacing: { after: 100 } }),
  createBody('Note: All products are manufactured in China.'),

  new Paragraph({ children: [new PageBreak()] }),

  // SECTION 4: SPECIFICATIONS SUMMARY
  createHeading('4. Specifications Summary', 1),
  createBody('The following tables provide key specifications for logistics planning and inventory records.'),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('4.1 Physical Specifications', 2),
  createTable(
    ['Specification', 'WP-384', 'WP-768', 'WP-4800T', 'WP-21600T'],
    [
      ['System Weight', '~6 kg', '23 kg', '525 kg', '1,300 kg'],
      ['Packaging Dimensions (mm)', '780×530×200', '940×780×240', '2000×1400×2300', '2320×1495×2350'],
      ['Packaging Volume (m³)', '~0.08', '0.175', '~6.4', '~8.1'],
      ['Operating Dimensions (mm)', '780×530×varies', '940×780×varies', '2000×2250×6500', '2320×1495×2350'],
      ['Solar Panel Area', '2 × 390×530mm', '2 × 390×510mm', '3 × panels', '3 × large panels'],
      ['Mast Height', 'N/A', 'N/A', '6.5 meters', '9 meters']
    ]
  ),
  new Paragraph({ spacing: { after: 300 } }),

  createHeading('4.2 Electrical Specifications', 2),
  createTable(
    ['Specification', 'WP-384', 'WP-768', 'WP-4800T', 'WP-21600T'],
    [
      ['System Voltage', '12V DC', '12V DC', '12V DC', '24V DC'],
      ['Battery Capacity', '30Ah (384Wh)', '60Ah (768Wh)', '400Ah (4,800Wh)', '900Ah (21,600Wh)'],
      ['Battery Type', 'LiFePO4', 'LiFePO4', 'GEL Lead Acid', 'Lead Acid'],
      ['Solar Panel Power', '80W', '100W', '450W', '1,305W'],
      ['MPPT Controller', 'Built-in (>95%)', '10A (96.5%)', '30A (95%)', '60A EPEVER (98%)'],
      ['Output Voltage', '12V ±0.5V', '10.5-12.6V', '12V DC', '24V DC'],
      ['Max Output Current', '3A', '10A', '<30A (25A typical)', '<60A (55A typical)']
    ]
  ),
  new Paragraph({ spacing: { after: 300 } }),

  createHeading('4.3 Environmental Ratings', 2),
  createTable(
    ['Specification', 'WP-384', 'WP-768', 'WP-4800T', 'WP-21600T'],
    [
      ['IP Rating', 'IP66', 'IP66', 'IP65', 'IP65'],
      ['Operating Temp', '-20°C to +50°C', '-30°C to +85°C', '-20°C to +80°C', '-20°C to +85°C'],
      ['Storage Temp', '-40°C to +60°C', '-30°C to +85°C', '-20°C to +80°C', '-20°C to +85°C'],
      ['Wind Rating', '60 m/s (panel)', '60 m/s (panel)', '100 km/h', '100 km/h'],
      ['Humidity', '15% to 85%', '15% to 85%', '15% to 85%', '15% to 85%']
    ]
  ),

  new Paragraph({ children: [new PageBreak()] }),

  // SECTION 5: SHIPPING & STORAGE
  createHeading('5. Shipping & Storage Requirements', 1),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('5.1 Shipping Classifications', 2),
  createTable(
    ['Product', 'Freight Class', 'Hazmat Status', 'Special Requirements'],
    [
      ['WP-384', 'Standard', 'Lithium Battery (UN3481)', 'Battery documentation required'],
      ['WP-768', 'Standard', 'Lithium Battery (UN3481)', 'Battery documentation required'],
      ['WP-4800T', 'Oversize', 'Lead Acid Battery', 'Upright transport only'],
      ['WP-21600T', 'Oversize/Heavy', 'Lead Acid Battery', 'Heavy equipment trailer']
    ]
  ),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('5.2 Lithium Battery Shipping (WP-384, WP-768)', 2),
  createBody('Products containing lithium iron phosphate batteries require:'),
  createBullet('UN3481 hazmat labeling (Lithium Ion Batteries Packed with Equipment)'),
  createBullet('Batteries shipped at 40-50% state of charge'),
  createBullet('Shipping documentation per IATA/IMDG regulations'),
  createBullet('Temperature-controlled storage if ambient exceeds 45°C'),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('5.3 Trailer Shipping (WP-4800T, WP-21600T)', 2),
  createBody('Trailer units require special handling:'),
  createBullet('Flatbed truck or roll-on transport'),
  createBullet('Secure mast in lowered/locked position'),
  createBullet('Solar panels folded/secured for transport'),
  createBullet('Wheel chocks and tie-down straps required'),
  createBullet('Outriggers retracted and locked'),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('5.4 Storage Requirements', 2),
  createTable(
    ['Requirement', 'WP-384 / WP-768', 'WP-4800T / WP-21600T'],
    [
      ['Storage Area', 'Indoor warehouse', 'Outdoor compound / covered area'],
      ['Temperature Range', '-40°C to +60°C', '-20°C to +50°C'],
      ['Humidity', 'Below 85% RH', 'Weather protected'],
      ['Orientation', 'Any (packaged)', 'Level ground, wheels chocked'],
      ['Battery Maintenance', 'Recharge every 6 months', 'Recharge every 3 months'],
      ['Stacking', 'Max 3 units (WP-384/768)', 'Not stackable']
    ]
  ),
  new Paragraph({ spacing: { after: 200 } }),

  createHeading('5.5 Handling Precautions', 2),
  createBullet('Never drop or impact solar panels - glass breakage risk'),
  createBullet('Keep battery terminals protected and insulated'),
  createBullet('Do not expose to direct sunlight during extended storage'),
  createBullet('Trailers: Engage parking brake before unhitching'),
  createBullet('Use appropriate lifting equipment for trailer units'),

  new Paragraph({ children: [new PageBreak()] }),

  // SECTION 6: INVENTORY QUICK REFERENCE
  createHeading('6. Inventory Quick Reference', 1),
  createBody('Use this table for quick inventory checks and order processing:'),
  new Paragraph({ spacing: { after: 200 } }),

  createTable(
    ['Field', 'WP-384', 'WP-768', 'WP-4800T', 'WP-21600T'],
    [
      ['Product Name', 'WakeCap Power 384', 'WakeCap Power 768', 'WakeCap Power 4800T', 'WakeCap Power 21600T'],
      ['Short Code', 'WP-384', 'WP-768', 'WP-4800T', 'WP-21600T'],
      ['Part Number', '[TBD]', '[TBD]', '[TBD]', '[TBD]'],
      ['Supplier Model', 'G8030', 'TS-100W60AH', '[TBD]', 'VTS3P'],
      ['Unit Weight', '~6 kg', '23 kg', '525 kg', '1,300 kg'],
      ['Box Dimensions', '780×530×200mm', '940×780×240mm', 'N/A (Trailer)', 'N/A (Trailer)'],
      ['Pallet Qty', '[TBD]', '[TBD]', '1 unit', '1 unit'],
      ['Container Qty (40ft)', '[TBD]', '[TBD]', '[TBD]', '8 units'],
      ['Lead Time', '~4 weeks*', '~4 weeks*', '~8 weeks*', '~8 weeks*'],
      ['Warranty', '[TBD]', '[TBD]', '2 years', '[TBD]'],
      ['Country of Origin', 'China', 'China', 'China', 'China'],
      ['HS Code', '[TBD]', '[TBD]', '[TBD]', '[TBD]']
    ]
  ),
  new Paragraph({ spacing: { after: 100 } }),
  createBody('* Lead times are approximate and depend on availability. Actual delivery may be shorter or longer.'),
  new Paragraph({ spacing: { after: 400 } }),

  createHeading('6.1 Included Accessories', 2),
  createBody('Standard package contents for each product:'),
  new Paragraph({ spacing: { after: 100 } }),

  createHeading('WP-384 Package Contents:', 3),
  createBullet('Solar Panel × 2 (40W each)'),
  createBullet('Solar Panel Mounting Bracket (pre-installed) × 1'),
  createBullet('Battery Arm (including battery pack) × 1'),
  createBullet('Battery Arm Mounting Plate × 1'),
  createBullet('Pole Mounting Clamps (Ø150mm) × 2'),
  createBullet('Mounting Hardware (screws, spring-loaded) × 1 set'),
  createBullet('User Manual × 1'),
  new Paragraph({ spacing: { after: 150 } }),

  createHeading('WP-768 Package Contents:', 3),
  createBullet('Solar Panel × 2 (50W each, 390×510mm)'),
  createBullet('Integrated Battery Enclosure × 1'),
  createBullet('Mounting Bracket (galvanized, powder-coated) × 1'),
  createBullet('PV Cables with Aviation Connectors × 1 set'),
  createBullet('DC Output Cable (5.5×2.1mm connector, 1m) × 1'),
  createBullet('User Manual × 1'),
  new Paragraph({ spacing: { after: 150 } }),

  createHeading('WP-4800T Package Contents:', 3),
  createBullet('Complete Trailer Unit × 1'),
  createBullet('Solar Panels × 3 (150W each, pre-mounted)'),
  createBullet('GEL Batteries × 2 (200Ah, pre-installed)'),
  createBullet('MPPT Controller (30A, pre-installed)'),
  createBullet('6.5m Pneumatic Mast (integrated)'),
  createBullet('CCTV Mounting Box'),
  createBullet('Spring Cables × 1 set'),
  createBullet('User Manual × 1'),
  new Paragraph({ spacing: { after: 150 } }),

  createHeading('WP-21600T Package Contents:', 3),
  createBullet('Complete Trailer Unit × 1'),
  createBullet('Solar Panels × 3 (435W each, pre-mounted)'),
  createBullet('Lead Acid Batteries × 6 (150Ah, pre-installed)'),
  createBullet('EPEVER 60A MPPT Controller (pre-installed)'),
  createBullet('9m Manual Mast Tower (integrated)'),
  createBullet('Camera Box (412×412×416mm)'),
  createBullet('CAT6 Cables × 2'),
  createBullet('Power Cables (1.5mm²) × 2'),
  createBullet('User Manual × 1'),

  new Paragraph({ spacing: { after: 600 } }),

  // DOCUMENT FOOTER INFO
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 400 },
    border: { top: { style: BorderStyle.SINGLE, size: 6, color: COLORS.borderGray } },
    children: [
      new TextRun({ text: '\n', size: 16 }),
      new TextRun({ text: 'END OF DOCUMENT', bold: true, size: 18, font: 'Arial', color: COLORS.mediumGray })
    ]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({ text: 'WakeCap Power Solutions - Logistics Reference Guide v1.2', size: 16, font: 'Arial', color: COLORS.mediumGray })
    ]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({ text: 'For questions, contact: [TBD - Logistics Support Email]', size: 16, font: 'Arial', color: COLORS.mediumGray })
    ]
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
      default: createFooter('WC-PS-LRG-v1.2', 'February 2026')
    },
    children: docContent
  }]
});

// Save document
const outputPath = path.resolve(__dirname, '../../output/power-solutions/WC-PS-LRG-v1.2.docx');
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outputPath, buffer);
  console.log(`Document saved: ${outputPath}`);
}).catch(err => {
  console.error('Error generating document:', err);
});

/**
 * WakeCap Weather Station Product Datasheet Generator
 * Generates WC-WS-DS-v1.0.docx
 * Style Version A (Marketing/Sales) - 2-page datasheet
 */

const {
  COLORS,
  FONT_SIZES,
  SPACING,
  PAGE_A4,
  createHeading,
  createBodyText,
  createSpecTable,
  createCalloutBox,
  createSafetyPanel,
  createHeader,
  createFooter,
  createImagePlaceholder,
  getDocumentStyles,
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  AlignmentType,
  HeadingLevel,
  BorderStyle,
  WidthType,
  ShadingType,
  PageBreak,
  TableOfContents
} = require('../../templates/docx-generator.js');

const fs = require('fs');

const DOC_ID = 'WC-WS-DS-v1.0';
const REVISION_DATE = 'February 2026';
const VERSION = 'A';

const sizes = FONT_SIZES.versionA;
const spacing = SPACING.versionA;
const contentWidth = PAGE_A4.width - PAGE_A4.margins.left - PAGE_A4.margins.right;

// Helper: create a compact spec table row text
function dsText(text, bold = false, size = sizes.body) {
  return new TextRun({
    text: text,
    bold: bold,
    size: size,
    font: 'Source Sans Pro',
    color: COLORS.charcoal
  });
}

function dsBody(text) {
  return new Paragraph({
    spacing: { after: spacing.bodyAfter },
    children: [dsText(text)]
  });
}

function dsBullet(text, bold = false) {
  return new Paragraph({
    spacing: { after: 60 },
    children: [
      new TextRun({
        text: bold ? text : text,
        bold: bold,
        size: sizes.body,
        font: 'Source Sans Pro',
        color: COLORS.charcoal
      })
    ],
    bullet: { level: 0 }
  });
}

function createBenefitItem(boldText, normalText) {
  return new Paragraph({
    spacing: { after: 80 },
    bullet: { level: 0 },
    children: [
      new TextRun({ text: boldText, bold: true, size: sizes.body, font: 'Source Sans Pro', color: COLORS.charcoal }),
      new TextRun({ text: normalText, size: sizes.body, font: 'Source Sans Pro', color: COLORS.charcoal })
    ]
  });
}

async function generateDatasheet() {
  const border = { style: BorderStyle.SINGLE, size: 1, color: COLORS.borderGray };
  const borders = { top: border, bottom: border, left: border, right: border };

  const doc = new Document({
    styles: getDocumentStyles(VERSION),
    sections: [
      // =====================================================================
      // PAGE 1
      // =====================================================================
      {
        properties: {
          page: {
            size: { width: PAGE_A4.width, height: PAGE_A4.height },
            margin: PAGE_A4.margins
          }
        },
        headers: { default: createHeader('Weather Station', 'Product Datasheet') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          // TITLE BLOCK
          new Paragraph({
            spacing: { after: 80 },
            children: [
              new TextRun({ text: 'WakeCap Weather Station', bold: true, size: sizes.h1, font: 'Source Sans Pro', color: COLORS.wakecapBlue })
            ]
          }),
          new Paragraph({
            spacing: { after: 40 },
            children: [
              new TextRun({ text: 'Product Datasheet', bold: true, size: sizes.h2, font: 'Source Sans Pro', color: COLORS.slate })
            ]
          }),
          new Paragraph({
            spacing: { after: 240 },
            children: [
              new TextRun({ text: 'Model: PH-282-AIR  |  ', size: sizes.body, font: 'Source Sans Pro', color: COLORS.slate }),
              new TextRun({ text: DOC_ID, size: sizes.body, font: 'Source Sans Pro', color: COLORS.slate }),
              new TextRun({ text: '  |  ', size: sizes.body, font: 'Source Sans Pro', color: COLORS.slate }),
              new TextRun({ text: REVISION_DATE, size: sizes.body, font: 'Source Sans Pro', color: COLORS.slate })
            ]
          }),

          // HERO IMAGE
          createImagePlaceholder('Weather Station hero photo showing complete assembly with sensors, WS Box, solar panel, and mounting tripod', VERSION),

          new Paragraph({ spacing: { after: 240 }, children: [] }),

          // PRODUCT OVERVIEW
          createHeading('Product Overview', 2, VERSION),
          dsBody('The WakeCap Weather Station (Model PH-282-AIR) is a comprehensive automatic environmental monitoring system designed for mega construction sites, oil & gas facilities, and industrial operations. It provides real-time monitoring of weather conditions, air quality, and hazardous gases to support safety compliance, operational planning, and regulatory reporting.'),

          // KEY BENEFITS
          createHeading('Key Benefits', 3, VERSION),
          createBenefitItem('Real-time monitoring ', 'with cloud-based dashboard access from any location'),
          createBenefitItem('Solar-powered operation ', 'with battery backup for remote, off-grid deployments'),
          createBenefitItem('Wireless mesh network ', 'eliminates cable runs between station and gateway'),
          createBenefitItem('Certified accuracy ', 'per international metrological standards (Report CCTS240605001S)'),
          createBenefitItem('Multi-parameter sensing: ', 'weather, gas detection (H2S, SO2, CO, CO2), and particulate matter (PM2.5/PM10/TSP)'),
          createBenefitItem('Modular design ', 'with standard and optional sensor configurations'),

          new Paragraph({ spacing: { after: 200 }, children: [] }),

          // WEATHER SENSOR SPECS
          createHeading('Weather Sensors (Standard)', 2, VERSION),
          new Paragraph({
            spacing: { after: 120 },
            children: [
              new TextRun({ text: 'All specifications verified per Calibration Lab Test Certificate CCTS240605001S (June 2025).', italics: true, size: sizes.caption, font: 'Source Sans Pro', color: COLORS.slate })
            ]
          }),
          createSpecTable(
            ['Parameter', 'Model', 'Range', 'Resolution', 'Accuracy'],
            [
              ['Wind Speed', 'PHWS-5V-M', '0 to 70 m/s', '0.1 m/s', '\u00B1(0.3+0.03V) m/s'],
              ['Wind Direction', 'PH-WDZ-5V-V', '0 to 360\u00B0', '1\u00B0', '\u00B13\u00B0'],
              ['Air Temperature', 'PH-FC-X', '-50 to +100\u00B0C', '0.1\u00B0C', '\u00B10.5\u00B0C'],
              ['Air Humidity', 'PH-FC-X', '0 to 100% RH', '0.1% RH', '\u00B15% RH'],
              ['Atm. Pressure', 'PH-BYX-12V-W2', '10 to 1100 hPa', '0.1 hPa', '\u00B10.3 hPa'],
              ['Rainfall', 'PHY-5V-M-01', '0 to 999.9 mm', '0.2 mm', '\u00B14%']
            ],
            VERSION
          ),

          new Paragraph({ spacing: { after: 240 }, children: [] }),

          // GAS SENSORS
          createHeading('Gas Sensors (Optional)', 2, VERSION),
          createSpecTable(
            ['Parameter', 'Model', 'Range', 'Resolution', 'Accuracy'],
            [
              ['H\u2082S', 'PH-H2S', '0 to 10 ppm', '0.001 ppm', '\u00B13%'],
              ['SO\u2082', 'PH-SO2', '0 to 2 ppm', '0.001 ppm', '\u00B13%'],
              ['CO', 'PH-CO', '0 to 10 ppm', '0.01 ppm', '\u00B13%'],
              ['CO\u2082', 'PH-CO2', '0 to 2000 ppm', '1 ppm', '\u00B1(40 ppm+3% F.S.)']
            ],
            VERSION
          ),

          new Paragraph({ spacing: { after: 240 }, children: [] }),

          // PARTICULATE SENSORS
          createHeading('Particulate Matter Sensors (Optional)', 2, VERSION),
          createSpecTable(
            ['Parameter', 'Model', 'Range', 'Resolution', 'Accuracy'],
            [
              ['PM2.5', 'PH-282-PM100', '0 to 1000 \u00B5g/m\u00B3', '1 \u00B5g/m\u00B3', '\u00B110%'],
              ['PM10', 'PH-282-PM100', '0 to 2000 \u00B5g/m\u00B3', '1 \u00B5g/m\u00B3', '\u00B115%'],
              ['TSP', 'PH-282-PM100', '0 to 2000 \u00B5g/m\u00B3', '1 \u00B5g/m\u00B3', '\u00B115%']
            ],
            VERSION
          ),

          // PAGE BREAK
          new Paragraph({ children: [new PageBreak()] }),

          // =====================================================================
          // PAGE 2
          // =====================================================================

          // DATA ACQUISITION TERMINAL
          createHeading('Data Acquisition Terminal (WS Box)', 2, VERSION),
          createSpecTable(
            ['Parameter', 'Specification'],
            [
              ['Processor', 'ARM 32-bit Cortex-M3, 108 MHz max'],
              ['A/D Conversion', '12-bit'],
              ['Display', '192 \u00D7 64 pixel LCD (English/Chinese)'],
              ['Internal Storage', '4M bits (>1 year data capacity)'],
              ['Storage Interval', '1 to 240 minutes (configurable)'],
              ['External Storage', 'SD card, USB drive'],
              ['Data Protection', 'Button battery backup']
            ],
            VERSION
          ),

          new Paragraph({ spacing: { after: 240 }, children: [] }),

          // INTERFACES
          createHeading('Interfaces', 2, VERSION),
          createSpecTable(
            ['Interface', 'Specification'],
            [
              ['RS485', '2-wire (A, B, GND) \u2014 MODBUS RTU protocol'],
              ['RS232', 'Standard serial port'],
              ['USB', 'Data export to PC'],
              ['Protocols', 'MODBUS RTU, XPH (proprietary), JSON'],
              ['Device Address', '0 to 255 (configurable)'],
              ['Optional Modules', '4G/5G, WiFi, Ethernet, LoRa, NB-IoT']
            ],
            VERSION
          ),

          new Paragraph({ spacing: { after: 240 }, children: [] }),

          // ELECTRICAL SPECS
          createHeading('Electrical Specifications', 2, VERSION),
          createSpecTable(
            ['Parameter', 'Specification'],
            [
              ['DC Input Voltage', '12 to 36 V DC'],
              ['AC Option', '220 V AC (with adapter)'],
              ['Power Consumption', '\u22642 W (overall system)'],
              ['Operating Voltage', '12 V DC'],
              ['Power Connector', 'Barrel jack'],
              ['Solar Power', 'Solar panel + MPPT controller + 12 V battery']
            ],
            VERSION
          ),

          new Paragraph({ spacing: { after: 160 }, children: [] }),

          createHeading('Electrical Safety (per GB 4793.1-2007)', 3, VERSION),
          createSpecTable(
            ['Parameter', 'Specification'],
            [
              ['Insulation Resistance', '\u226510 M\u03A9 (power to casing)'],
              ['Dielectric Strength', '1500 V AC / 1 min (no breakdown)'],
              ['Leakage Current', '\u22645 mA (AC operation)']
            ],
            VERSION
          ),

          new Paragraph({ spacing: { after: 240 }, children: [] }),

          // ENVIRONMENTAL SPECS
          createHeading('Environmental Specifications', 2, VERSION),
          createSpecTable(
            ['Parameter', 'Specification'],
            [
              ['Operating Temperature', '-20 to +50\u00B0C (-4 to +122\u00B0F)'],
              ['Operating Humidity', '0 to 95% RH (non-condensing)'],
              ['Use Environment', 'Outdoor only'],
              ['Safety Class', 'Class II appliance'],
              ['IP Rating', '[TBD]'],
              ['Dimensions (WS Box)', '[TBD]'],
              ['Weight (WS Box)', '[TBD]']
            ],
            VERSION
          ),

          new Paragraph({ spacing: { after: 240 }, children: [] }),

          // MECHANICAL
          createHeading('Mechanical', 2, VERSION),
          createImagePlaceholder('Dimensioned outline drawing showing WS Box front panel with terminal layout, LCD display, and overall dimensions in mm', VERSION),

          new Paragraph({ spacing: { after: 160 }, children: [] }),

          createSpecTable(
            ['Component', 'Specification'],
            [
              ['WS Box Enclosure', 'Weatherproof, outdoor-rated'],
              ['Sensor Terminals', 'T1\u2013T6 (6 standard sensor inputs)'],
              ['Rain Gauge Material', 'Stainless steel'],
              ['Temp/Humidity Housing', 'Radiation shield (Baiye Box)'],
              ['Mounting', 'Tripod system (optional)'],
              ['Wind Speed Start', '\u22640.8 m/s'],
              ['Wind Direction Start', '\u22640.5 m/s']
            ],
            VERSION
          ),

          new Paragraph({ spacing: { after: 240 }, children: [] }),

          // CERTIFICATIONS
          createHeading('Certifications and Compliance', 2, VERSION),
          dsBody('Test Report: CCTS240605001S (June 2025)'),
          dsBody('Testing Laboratory: Shenzhen Zhongan Quality Inspection and Certification Co., Ltd.'),
          dsBody('Result: All parameters PASS'),

          new Paragraph({ spacing: { after: 120 }, children: [] }),

          createSpecTable(
            ['Category', 'Standards'],
            [
              ['Metrological', 'JJG695-2019, JJG635-2011, JJG551-2021, JJG005-2015, JJG004-2011, JJG431-2014, JJF1076-2020'],
              ['Environmental Monitoring', 'HJ653-2021, GB16297-1996'],
              ['Environmental Testing', 'GB/T2423.1-2008, GB/T2423.2-2008, GB/T2423.3-2016'],
              ['Electrical Safety', 'GB4793.1-2007']
            ],
            VERSION
          ),

          new Paragraph({ spacing: { after: 120 }, children: [] }),

          dsBody('Manufacturer Certification: ISO9001:2008'),

          new Paragraph({ spacing: { after: 240 }, children: [] }),

          // ORDERING INFORMATION
          createHeading('Ordering Information', 2, VERSION),
          createHeading('Standard Configuration (PH-282-AIR)', 3, VERSION),
          createSpecTable(
            ['Item', 'Model'],
            [
              ['Data Acquisition Terminal (WS Box)', 'PH-1'],
              ['Wind Speed Sensor', 'PHWS-5V-M'],
              ['Wind Direction Sensor', 'PH-WDZ-5V-V'],
              ['Temperature/Humidity Sensor with Baiye Box', 'PH-FC-X'],
              ['Atmospheric Pressure Sensor', 'PH-BYX-12V-W2'],
              ['Rain Gauge (Stainless Steel)', 'PHY-5V-M-01']
            ],
            VERSION
          ),

          new Paragraph({ spacing: { after: 160 }, children: [] }),

          createHeading('Optional Sensors', 3, VERSION),
          createSpecTable(
            ['Item', 'Model'],
            [
              ['Hydrogen Sulfide Sensor', 'PH-H2S'],
              ['Sulfur Dioxide Sensor', 'PH-SO2'],
              ['Carbon Monoxide Sensor', 'PH-CO'],
              ['Carbon Dioxide Sensor', 'PH-CO2'],
              ['Particulate Matter Sensor (PM2.5/PM10/TSP)', 'PH-282-PM100']
            ],
            VERSION
          ),

          new Paragraph({ spacing: { after: 160 }, children: [] }),

          createHeading('Optional Accessories', 3, VERSION),
          dsBullet('Radiation shield (Baiye Box)'),
          dsBullet('Field protection case'),
          dsBullet('Tripod mounting system'),
          dsBullet('Solar panel kit with MPPT controller'),
          dsBullet('Battery system (12 V)'),
          dsBullet('Adapter cables (various configurations)'),

          new Paragraph({ spacing: { after: 240 }, children: [] }),

          // NOTICE
          createCalloutBox('note', 'Gas sensors are consumable components requiring annual replacement and calibration with certified calibration gas per JJF 1076-2020.', VERSION),

          new Paragraph({ spacing: { after: 320 }, children: [] }),

          // CONTACT INFORMATION
          createHeading('Contact Information', 2, VERSION),

          // Two-column contact table
          new Table({
            width: { size: contentWidth, type: WidthType.DXA },
            columnWidths: [Math.floor(contentWidth / 2), Math.floor(contentWidth / 2)],
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: Math.floor(contentWidth / 2), type: WidthType.DXA },
                    borders: { top: border, bottom: border, left: border, right: border },
                    shading: { fill: COLORS.lightGray, type: ShadingType.CLEAR },
                    margins: { top: 120, bottom: 120, left: 160, right: 160 },
                    children: [
                      new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: 'Manufacturer', bold: true, size: sizes.body, font: 'Source Sans Pro', color: COLORS.wakecapBlue })] }),
                      new Paragraph({ spacing: { after: 40 }, children: [dsText('WUHAN XINPUHUI TECHNOLOGY CO., LTD', true)] }),
                      new Paragraph({ spacing: { after: 40 }, children: [dsText('8004-44, 8th Floor, Longyue Building')] }),
                      new Paragraph({ spacing: { after: 40 }, children: [dsText('No. 42 Guanggu 1st Road')] }),
                      new Paragraph({ spacing: { after: 40 }, children: [dsText('Wuhan, China')] }),
                      new Paragraph({ spacing: { after: 40 }, children: [dsText('Tel: 027-82666096')] }),
                      new Paragraph({ children: [dsText('www.whxph.com')] })
                    ]
                  }),
                  new TableCell({
                    width: { size: Math.floor(contentWidth / 2), type: WidthType.DXA },
                    borders: { top: border, bottom: border, left: border, right: border },
                    shading: { fill: COLORS.lightGray, type: ShadingType.CLEAR },
                    margins: { top: 120, bottom: 120, left: 160, right: 160 },
                    children: [
                      new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: 'Distributor', bold: true, size: sizes.body, font: 'Source Sans Pro', color: COLORS.wakecapBlue })] }),
                      new Paragraph({ spacing: { after: 40 }, children: [dsText('Saudi Wakecap Company for', true)] }),
                      new Paragraph({ spacing: { after: 40 }, children: [dsText('Information Systems Technologies', true)] }),
                      new Paragraph({ spacing: { after: 40 }, children: [dsText('P.O. Box: 85540')] }),
                      new Paragraph({ spacing: { after: 40 }, children: [dsText('Riyadh 11612, Saudi Arabia')] }),
                      new Paragraph({ children: [] })
                    ]
                  })
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { after: 200 }, children: [] }),

          // FOOTER LINE
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 160 },
            border: { top: { style: BorderStyle.SINGLE, size: 6, color: COLORS.borderGray } },
            children: [
              new TextRun({ text: '\u00A9 2026 WakeCap Technologies. All rights reserved.', size: sizes.caption, font: 'Source Sans Pro', color: COLORS.slate }),
              new TextRun({ text: '  |  ', size: sizes.caption, font: 'Source Sans Pro', color: COLORS.slate }),
              new TextRun({ text: 'Specifications subject to change without notice.', size: sizes.caption, font: 'Source Sans Pro', color: COLORS.slate })
            ]
          })
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync('./output/WC-WS-DS-v1.0.docx', buffer);
  console.log('Generated: ./output/WC-WS-DS-v1.0.docx');
}

generateDatasheet().catch(console.error);

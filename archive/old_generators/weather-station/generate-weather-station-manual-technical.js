/**
 * WakeCap Weather Station Technical Product Manual Generator
 * Generates WC-WS-PM-v1.0-TECH.docx
 * VERSION B: Internal/Technical - Engineering-focused documentation
 */

const {
  COLORS,
  FONT_SIZES,
  SPACING,
  PAGE_A4,
  createHeading,
  createBodyText,
  createPlaceholder,
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

const VERSION = 'B'; // Technical/Internal version
const DOC_ID = 'WC-WS-PM-v1.0-TECH';
const REVISION_DATE = '2026-02-04';

// Helper to create a bullet point
function createBullet(text, version = 'B') {
  const sizes = version === 'A' ? FONT_SIZES.versionA : FONT_SIZES.versionB;
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 60 },
    children: [
      new TextRun({
        text: text,
        size: sizes.body,
        font: 'Source Sans Pro',
        color: COLORS.charcoal
      })
    ]
  });
}

// Helper to create sub-bullet
function createSubBullet(text, version = 'B') {
  const sizes = version === 'A' ? FONT_SIZES.versionA : FONT_SIZES.versionB;
  return new Paragraph({
    bullet: { level: 1 },
    spacing: { after: 40 },
    children: [
      new TextRun({
        text: text,
        size: sizes.body,
        font: 'Source Sans Pro',
        color: COLORS.charcoal
      })
    ]
  });
}

// Helper to create numbered step
function createStep(number, text, version = 'B') {
  const sizes = version === 'A' ? FONT_SIZES.versionA : FONT_SIZES.versionB;
  return new Paragraph({
    spacing: { after: 80 },
    children: [
      new TextRun({
        text: `${number}. `,
        bold: true,
        size: sizes.body,
        font: 'Source Sans Pro',
        color: COLORS.slate
      }),
      new TextRun({
        text: text,
        size: sizes.body,
        font: 'Source Sans Pro',
        color: COLORS.charcoal
      })
    ]
  });
}

// Create technical code/value text
function createTechValue(label, value, unit = '', version = 'B') {
  const sizes = version === 'A' ? FONT_SIZES.versionA : FONT_SIZES.versionB;
  return new Paragraph({
    spacing: { after: 40 },
    children: [
      new TextRun({
        text: `${label}: `,
        size: sizes.body,
        font: 'Source Sans Pro',
        color: COLORS.slate
      }),
      new TextRun({
        text: `${value}${unit ? ' ' + unit : ''}`,
        size: sizes.body,
        font: 'Roboto Mono',
        color: COLORS.charcoal
      })
    ]
  });
}

// Create empty paragraph for spacing
function createSpacer(height = 120) {
  return new Paragraph({
    spacing: { after: height },
    children: []
  });
}

async function generateTechnicalManual() {
  const doc = new Document({
    styles: getDocumentStyles(VERSION),
    sections: [
      // =====================================================================
      // COVER PAGE
      // =====================================================================
      {
        properties: {
          page: {
            size: { width: PAGE_A4.width, height: PAGE_A4.height },
            margin: PAGE_A4.margins
          }
        },
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: '[WakeCap Logo]',
                size: 18,
                font: 'Source Sans Pro',
                color: COLORS.slate,
                italics: true
              })
            ]
          }),
          createSpacer(200),

          new Paragraph({
            children: [
              new TextRun({
                text: 'TECHNICAL DOCUMENTATION',
                size: 20,
                font: 'Source Sans Pro',
                color: COLORS.slate,
                bold: true
              })
            ]
          }),
          createSpacer(100),

          createHeading('WakeCap Weather Station', 1, VERSION),
          createHeading('Technical Product Manual', 3, VERSION),
          createSpacer(50),

          createBodyText('Engineering Reference | Internal Use', VERSION),
          createSpacer(200),

          createImagePlaceholder('Technical exploded view diagram showing all internal components and connections', VERSION),
          createSpacer(200),

          new Paragraph({
            children: [
              new TextRun({
                text: `Model: WS-100`,
                size: 16,
                font: 'Roboto Mono',
                color: COLORS.charcoal
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Document: ${DOC_ID}`,
                size: 16,
                font: 'Roboto Mono',
                color: COLORS.charcoal
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Revision: 1.0`,
                size: 16,
                font: 'Roboto Mono',
                color: COLORS.charcoal
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Date: ${REVISION_DATE}`,
                size: 16,
                font: 'Roboto Mono',
                color: COLORS.charcoal
              })
            ]
          }),
          createSpacer(100),

          createSafetyPanel('notice', 'This document contains technical specifications and engineering details intended for qualified technical personnel. For customer-facing documentation, refer to WC-WS-PM-v1.0.', VERSION),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // =====================================================================
      // TABLE OF CONTENTS
      // =====================================================================
      {
        properties: {
          page: {
            size: { width: PAGE_A4.width, height: PAGE_A4.height },
            margin: PAGE_A4.margins
          }
        },
        headers: { default: createHeader('Weather Station', 'Technical Manual') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('Table of Contents', 1, VERSION),
          createSpacer(100),

          createBodyText('1. System Overview .................................................... 3', VERSION),
          createBodyText('2. Hardware Architecture .............................................. 4', VERSION),
          createBodyText('3. Detailed Technical Specifications .................................. 6', VERSION),
          createBodyText('4. Communication Protocols ............................................ 9', VERSION),
          createBodyText('5. Electrical Characteristics ......................................... 11', VERSION),
          createBodyText('6. Sensor Integration ................................................. 13', VERSION),
          createBodyText('7. Power System Design ................................................ 15', VERSION),
          createBodyText('8. Installation Engineering ........................................... 17', VERSION),
          createBodyText('9. Calibration Procedures ............................................. 19', VERSION),
          createBodyText('10. Diagnostic & Debug ................................................ 21', VERSION),
          createBodyText('11. Firmware & Configuration .......................................... 23', VERSION),
          createBodyText('Appendix A: Register Map .............................................. 25', VERSION),
          createBodyText('Appendix B: Wiring Schematics ......................................... 27', VERSION),
          createBodyText('Appendix C: Part Numbers .............................................. 29', VERSION),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // =====================================================================
      // SECTION 1: SYSTEM OVERVIEW
      // =====================================================================
      {
        properties: {
          page: {
            size: { width: PAGE_A4.width, height: PAGE_A4.height },
            margin: PAGE_A4.margins
          }
        },
        headers: { default: createHeader('Weather Station', 'Technical Manual') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('1. System Overview', 1, VERSION),

          createHeading('1.1 System Description', 2, VERSION),
          createBodyText('The WakeCap Weather Station (Model WS-100) is a modular environmental monitoring system designed for industrial deployment. The system implements a distributed architecture with local data aggregation and wireless mesh network transmission.', VERSION),
          createSpacer(50),

          createHeading('1.2 Functional Block Diagram', 2, VERSION),
          createImagePlaceholder('Detailed functional block diagram with signal flow, data buses, and power distribution', VERSION),
          createSpacer(50),

          createHeading('1.3 System Components', 2, VERSION),
          createSpecTable(
            ['Component', 'Part Number', 'Function', 'Interface'],
            [
              ['WS Box', 'WC-WS-BOX-01', 'Data aggregation & display', 'RS485, Analog/Digital I/O'],
              ['MODBUS Asset', 'WC-MA-01', 'Protocol bridge', 'RS485 in, Wireless out'],
              ['Solar Panel', 'WC-SP-50W', 'Power generation', '18-22V DC output'],
              ['MPPT Controller', 'WC-MPPT-12', 'Charge control', 'Solar in, 12V DC out'],
              ['Battery', 'WC-BAT-12', 'Energy storage', '12V nominal'],
              ['Mesh Anchor', 'WC-AN-01', 'Wireless relay', 'Proprietary mesh'],
              ['Gateway', 'WC-GW-01', 'Cloud connectivity', 'Mesh in, HTTPS out']
            ],
            VERSION
          ),
          createSpacer(50),

          createHeading('1.4 Data Flow Architecture', 2, VERSION),
          createBodyText('Data flow follows a unidirectional path from sensors to cloud:', VERSION),
          createSpacer(30),
          createTechValue('Layer 1', 'Sensors → WS Box (Analog/Digital signals)', '', VERSION),
          createTechValue('Layer 2', 'WS Box → MODBUS Asset (RS485, MODBUS RTU)', '', VERSION),
          createTechValue('Layer 3', 'MODBUS Asset → Anchors (Proprietary 2.4GHz mesh)', '', VERSION),
          createTechValue('Layer 4', 'Anchors → Gateway (Multi-hop mesh routing)', '', VERSION),
          createTechValue('Layer 5', 'Gateway → Cloud (HTTPS/TLS 1.3)', '', VERSION),
          createSpacer(50),

          createHeading('1.5 Operating Modes', 2, VERSION),
          createSpecTable(
            ['Mode', 'Description', 'Power State', 'Data Rate'],
            [
              ['Normal', 'Continuous monitoring', 'Active', '1 sample/min'],
              ['Low Power', 'Extended battery operation', 'Sleep between samples', '1 sample/5 min'],
              ['Diagnostic', 'Debug and calibration', 'Active + verbose logging', 'Continuous'],
              ['Firmware Update', 'OTA update mode', 'Active', 'N/A']
            ],
            VERSION
          ),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // =====================================================================
      // SECTION 2: HARDWARE ARCHITECTURE
      // =====================================================================
      {
        properties: {
          page: {
            size: { width: PAGE_A4.width, height: PAGE_A4.height },
            margin: PAGE_A4.margins
          }
        },
        headers: { default: createHeader('Weather Station', 'Technical Manual') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('2. Hardware Architecture', 1, VERSION),

          createHeading('2.1 WS Box Internal Architecture', 2, VERSION),
          createImagePlaceholder('WS Box internal block diagram showing MCU, ADC, display driver, RS485 transceiver, and power management', VERSION),
          createSpacer(50),

          createHeading('2.1.1 Microcontroller Unit', 3, VERSION),
          createTechValue('MCU Type', '[TBD - ARM Cortex-M series expected]', '', VERSION),
          createTechValue('Clock Speed', '[TBD]', 'MHz', VERSION),
          createTechValue('Flash Memory', '[TBD]', 'KB', VERSION),
          createTechValue('RAM', '[TBD]', 'KB', VERSION),
          createTechValue('ADC Resolution', '[TBD - 12-bit expected]', 'bits', VERSION),
          createTechValue('ADC Channels', '6 (T1-T6)', '', VERSION),
          createSpacer(50),

          createHeading('2.1.2 Analog Input Subsystem', 3, VERSION),
          createSpecTable(
            ['Terminal', 'Input Type', 'Voltage Range', 'Resolution', 'Sampling'],
            [
              ['T1', 'Analog', '0-5V / 4-20mA', '12-bit', '1 Hz'],
              ['T2', 'Analog', '0-5V / 4-20mA', '12-bit', '1 Hz'],
              ['T3', 'Analog/Digital', '0-5V / I2C', '12-bit/16-bit', '1 Hz'],
              ['T4', 'Analog/Digital', '0-5V / I2C', '12-bit/16-bit', '1 Hz'],
              ['T5', 'Digital', 'I2C/SPI', '16-24 bit', '1 Hz'],
              ['T6', 'Pulse count', 'Digital pulse', 'Counter', 'Event-driven']
            ],
            VERSION
          ),
          createSpacer(50),

          createHeading('2.1.3 RS485 Interface', 3, VERSION),
          createTechValue('Transceiver IC', '[TBD - MAX485 family expected]', '', VERSION),
          createTechValue('Data Rate', '9600', 'baud', VERSION),
          createTechValue('Protocol', 'MODBUS RTU', '', VERSION),
          createTechValue('Termination', '120Ω (internal, jumper selectable)', '', VERSION),
          createTechValue('ESD Protection', '±15kV HBM', '', VERSION),
          createSpacer(50),

          createHeading('2.1.4 Display Subsystem', 3, VERSION),
          createTechValue('Display Type', 'LCD', '', VERSION),
          createTechValue('Resolution', '[TBD]', 'pixels', VERSION),
          createTechValue('Backlight', '[TBD]', '', VERSION),
          createTechValue('Update Rate', '1 Hz', '', VERSION),
          createSpacer(50),

          createHeading('2.2 MODBUS Asset Architecture', 2, VERSION),
          createImagePlaceholder('MODBUS Asset internal block diagram showing RS485 receiver, MCU, wireless transceiver, NFC interface', VERSION),
          createSpacer(50),

          createHeading('2.2.1 Wireless Transceiver', 3, VERSION),
          createTechValue('Frequency', '2.4', 'GHz', VERSION),
          createTechValue('Protocol', 'Proprietary mesh (WakeCap)', '', VERSION),
          createTechValue('TX Power', '[TBD]', 'dBm', VERSION),
          createTechValue('Sensitivity', '[TBD]', 'dBm', VERSION),
          createTechValue('Range (line of sight)', '[TBD]', 'm', VERSION),
          createSpacer(50),

          createHeading('2.2.2 NFC Interface', 3, VERSION),
          createTechValue('Standard', 'ISO 14443A / NFC Forum Type 2', '', VERSION),
          createTechValue('Function', 'Configuration read/write via mobile app', '', VERSION),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // =====================================================================
      // SECTION 3: DETAILED TECHNICAL SPECIFICATIONS
      // =====================================================================
      {
        properties: {
          page: {
            size: { width: PAGE_A4.width, height: PAGE_A4.height },
            margin: PAGE_A4.margins
          }
        },
        headers: { default: createHeader('Weather Station', 'Technical Manual') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('3. Detailed Technical Specifications', 1, VERSION),

          createHeading('3.1 Environmental Sensor Specifications', 2, VERSION),

          createHeading('3.1.1 Wind Speed Sensor', 3, VERSION),
          createSpecTable(
            ['Parameter', 'Min', 'Typ', 'Max', 'Unit'],
            [
              ['Measurement Range', '0', '—', '60', 'm/s'],
              ['Accuracy', '—', '±0.3', '—', 'm/s'],
              ['Resolution', '—', '0.1', '—', 'm/s'],
              ['Response Time', '—', '[TBD]', '—', 's'],
              ['Output Signal', '—', '[TBD - Pulse/Analog]', '—', ''],
              ['Operating Temperature', '-40', '—', '+85', '°C'],
              ['Starting Threshold', '—', '[TBD]', '—', 'm/s']
            ],
            VERSION
          ),
          createSpacer(50),

          createHeading('3.1.2 Wind Direction Sensor', 3, VERSION),
          createSpecTable(
            ['Parameter', 'Min', 'Typ', 'Max', 'Unit'],
            [
              ['Measurement Range', '0', '—', '360', 'degrees'],
              ['Accuracy', '—', '±3', '—', 'degrees'],
              ['Resolution', '—', '1', '—', 'degree'],
              ['Damping Ratio', '—', '[TBD]', '—', ''],
              ['Output Signal', '—', '[TBD - Potentiometer/Digital]', '—', ''],
              ['Operating Temperature', '-40', '—', '+85', '°C']
            ],
            VERSION
          ),
          createSpacer(50),

          createHeading('3.1.3 Temperature Sensor', 3, VERSION),
          createSpecTable(
            ['Parameter', 'Min', 'Typ', 'Max', 'Unit'],
            [
              ['Measurement Range', '-40', '—', '+85', '°C'],
              ['Accuracy', '—', '±0.5', '—', '°C'],
              ['Resolution', '—', '0.1', '—', '°C'],
              ['Response Time (63%)', '—', '[TBD]', '—', 's'],
              ['Output Signal', '—', '[TBD - Analog/I2C]', '—', ''],
              ['Self-heating', '—', '<0.1', '—', '°C']
            ],
            VERSION
          ),
          createSpacer(50),

          createHeading('3.1.4 Humidity Sensor', 3, VERSION),
          createSpecTable(
            ['Parameter', 'Min', 'Typ', 'Max', 'Unit'],
            [
              ['Measurement Range', '0', '—', '100', '% RH'],
              ['Accuracy (20-80% RH)', '—', '±3', '—', '% RH'],
              ['Accuracy (0-100% RH)', '—', '±5', '—', '% RH'],
              ['Resolution', '—', '0.1', '—', '% RH'],
              ['Response Time (63%)', '—', '[TBD]', '—', 's'],
              ['Hysteresis', '—', '±1', '—', '% RH']
            ],
            VERSION
          ),

          new Paragraph({ children: [new PageBreak()] }),

          createHeading('3.1.5 Atmospheric Pressure Sensor', 3, VERSION),
          createSpecTable(
            ['Parameter', 'Min', 'Typ', 'Max', 'Unit'],
            [
              ['Measurement Range', '300', '—', '1100', 'hPa'],
              ['Accuracy (absolute)', '—', '±1', '—', 'hPa'],
              ['Resolution', '—', '0.1', '—', 'hPa'],
              ['Temperature Coefficient', '—', '[TBD]', '—', 'hPa/°C'],
              ['Output Interface', '—', 'I2C/SPI', '—', ''],
              ['Oversampling', '—', '16x', '—', '']
            ],
            VERSION
          ),
          createSpacer(50),

          createHeading('3.1.6 Rainfall Sensor', 3, VERSION),
          createSpecTable(
            ['Parameter', 'Min', 'Typ', 'Max', 'Unit'],
            [
              ['Measurement Range', '0', '—', '[TBD]', 'mm'],
              ['Resolution', '—', '0.2', '—', 'mm/tip'],
              ['Accuracy', '—', '±4', '—', '%'],
              ['Collection Area', '—', '[TBD]', '—', 'cm²'],
              ['Output Type', '—', 'Reed switch pulse', '—', ''],
              ['Maximum Rainfall Rate', '—', '[TBD]', '—', 'mm/hr']
            ],
            VERSION
          ),
          createSpacer(50),

          createHeading('3.2 Gas Sensor Specifications', 2, VERSION),

          createHeading('3.2.1 H2S Sensor', 3, VERSION),
          createSpecTable(
            ['Parameter', 'Min', 'Typ', 'Max', 'Unit'],
            [
              ['Detection Range', '0', '—', '100', 'ppm'],
              ['Resolution', '—', '0.1', '—', 'ppm'],
              ['Accuracy', '—', '±5', '—', '% of reading'],
              ['Response Time (T90)', '—', '<30', '—', 's'],
              ['Recovery Time', '—', '<60', '—', 's'],
              ['Sensor Life', '—', '24', '—', 'months'],
              ['Cross-sensitivity', '—', 'See datasheet', '—', ''],
              ['Calibration Interval', '—', '6-12', '—', 'months']
            ],
            VERSION
          ),
          createSpacer(50),

          createHeading('3.2.2 CO Sensor', 3, VERSION),
          createSpecTable(
            ['Parameter', 'Min', 'Typ', 'Max', 'Unit'],
            [
              ['Detection Range', '0', '—', '500', 'ppm'],
              ['Resolution', '—', '1', '—', 'ppm'],
              ['Accuracy', '—', '±5', '—', '% of reading'],
              ['Response Time (T90)', '—', '<30', '—', 's'],
              ['Sensor Life', '—', '24', '—', 'months'],
              ['Calibration Interval', '—', '6-12', '—', 'months']
            ],
            VERSION
          ),
          createSpacer(50),

          createHeading('3.2.3 Particulate Matter Sensor', 3, VERSION),
          createSpecTable(
            ['Parameter', 'PM2.5', 'PM10', 'Unit'],
            [
              ['Detection Range', '0-1000', '0-1000', 'µg/m³'],
              ['Resolution', '1', '1', 'µg/m³'],
              ['Accuracy', '±10% + 10µg/m³', '±10% + 10µg/m³', ''],
              ['Counting Efficiency (0.3µm)', '>50%', '>50%', ''],
              ['Response Time', '<10', '<10', 's']
            ],
            VERSION
          ),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // =====================================================================
      // SECTION 4: COMMUNICATION PROTOCOLS
      // =====================================================================
      {
        properties: {
          page: {
            size: { width: PAGE_A4.width, height: PAGE_A4.height },
            margin: PAGE_A4.margins
          }
        },
        headers: { default: createHeader('Weather Station', 'Technical Manual') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('4. Communication Protocols', 1, VERSION),

          createHeading('4.1 RS485/MODBUS RTU Protocol', 2, VERSION),

          createHeading('4.1.1 Physical Layer', 3, VERSION),
          createTechValue('Standard', 'EIA/TIA-485-A', '', VERSION),
          createTechValue('Topology', 'Point-to-point (WS Box to MODBUS Asset)', '', VERSION),
          createTechValue('Cable Type', 'Shielded twisted pair (STP)', '', VERSION),
          createTechValue('Max Cable Length', '1200', 'm', VERSION),
          createTechValue('Termination', '120Ω at each end', '', VERSION),
          createSpacer(50),

          createHeading('4.1.2 Data Link Layer', 3, VERSION),
          createSpecTable(
            ['Parameter', 'Value'],
            [
              ['Baud Rate', '9600 bps'],
              ['Data Bits', '8'],
              ['Parity', 'None'],
              ['Stop Bits', '1'],
              ['Frame Format', '8N1'],
              ['Protocol', 'MODBUS RTU'],
              ['Slave Address', '1 (default, configurable 1-247)'],
              ['Inter-frame Delay', '3.5 character times (min)']
            ],
            VERSION
          ),
          createSpacer(50),

          createHeading('4.1.3 MODBUS Function Codes', 3, VERSION),
          createSpecTable(
            ['Function Code', 'Name', 'Usage'],
            [
              ['0x03', 'Read Holding Registers', 'Read sensor data'],
              ['0x04', 'Read Input Registers', 'Read sensor data (alternative)'],
              ['0x06', 'Write Single Register', 'Configuration'],
              ['0x10', 'Write Multiple Registers', 'Bulk configuration']
            ],
            VERSION
          ),
          createSpacer(50),

          createHeading('4.1.4 Register Map Summary', 3, VERSION),
          createBodyText('See Appendix A for complete register map. Summary of key registers:', VERSION),
          createSpecTable(
            ['Address', 'Name', 'Type', 'Scale', 'Unit'],
            [
              ['0x0000', 'Wind Speed', 'Input', '×0.1', 'm/s'],
              ['0x0001', 'Wind Direction', 'Input', '×1', 'degrees'],
              ['0x0002', 'Temperature', 'Input', '×0.1', '°C'],
              ['0x0003', 'Humidity', 'Input', '×0.1', '% RH'],
              ['0x0004', 'Pressure', 'Input', '×0.1', 'hPa'],
              ['0x0005', 'Rainfall', 'Input', '×0.1', 'mm'],
              ['0x0010', 'H2S', 'Input', '×0.1', 'ppm'],
              ['0x0011', 'CO', 'Input', '×1', 'ppm'],
              ['0x0012', 'PM2.5', 'Input', '×1', 'µg/m³'],
              ['0x0013', 'PM10', 'Input', '×1', 'µg/m³']
            ],
            VERSION
          ),
          createSpacer(50),

          createCalloutBox('note', 'Register values are 16-bit unsigned integers. Apply scale factor to convert to engineering units. Example: Register 0x0002 value 0x00FA (250) = 25.0°C', VERSION),

          new Paragraph({ children: [new PageBreak()] }),

          createHeading('4.2 Wireless Mesh Protocol', 2, VERSION),

          createHeading('4.2.1 Physical Layer', 3, VERSION),
          createTechValue('Frequency Band', '2.4', 'GHz ISM', VERSION),
          createTechValue('Modulation', '[TBD]', '', VERSION),
          createTechValue('Data Rate', '[TBD]', 'kbps', VERSION),
          createTechValue('TX Power', '[TBD]', 'dBm', VERSION),
          createTechValue('Receiver Sensitivity', '[TBD]', 'dBm', VERSION),
          createSpacer(50),

          createHeading('4.2.2 Network Layer', 3, VERSION),
          createTechValue('Topology', 'Self-healing mesh', '', VERSION),
          createTechValue('Max Hops', '[TBD]', '', VERSION),
          createTechValue('Routing Protocol', 'Proprietary (WakeCap)', '', VERSION),
          createTechValue('Node Discovery', 'Automatic', '', VERSION),
          createTechValue('Failover Time', '[TBD]', 'ms', VERSION),
          createSpacer(50),

          createHeading('4.3 Cloud Communication', 2, VERSION),
          createTechValue('Protocol', 'HTTPS', '', VERSION),
          createTechValue('TLS Version', '1.3', '', VERSION),
          createTechValue('Data Format', 'JSON', '', VERSION),
          createTechValue('Endpoint', '[TBD - api.wakecap.com expected]', '', VERSION),
          createTechValue('Authentication', 'Device certificate + API key', '', VERSION),
          createTechValue('Upload Interval', '60', 's (configurable)', VERSION),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // =====================================================================
      // SECTION 5: ELECTRICAL CHARACTERISTICS
      // =====================================================================
      {
        properties: {
          page: {
            size: { width: PAGE_A4.width, height: PAGE_A4.height },
            margin: PAGE_A4.margins
          }
        },
        headers: { default: createHeader('Weather Station', 'Technical Manual') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('5. Electrical Characteristics', 1, VERSION),

          createHeading('5.1 WS Box Electrical Specifications', 2, VERSION),
          createSpecTable(
            ['Parameter', 'Min', 'Typ', 'Max', 'Unit'],
            [
              ['Input Voltage', '10.8', '12.0', '13.8', 'V DC'],
              ['Input Current (active)', '—', '[TBD]', '[TBD]', 'mA'],
              ['Input Current (sleep)', '—', '[TBD]', '—', 'mA'],
              ['Power Consumption (active)', '—', '[TBD]', '—', 'W'],
              ['Reverse Polarity Protection', '—', 'Yes', '—', ''],
              ['Overvoltage Protection', '—', '15V', '—', ''],
              ['Operating Temperature', '-20', '—', '+60', '°C']
            ],
            VERSION
          ),
          createSpacer(50),

          createHeading('5.2 MODBUS Asset Electrical Specifications', 2, VERSION),
          createSpecTable(
            ['Parameter', 'Min', 'Typ', 'Max', 'Unit'],
            [
              ['Input Voltage', '[TBD]', '[TBD]', '[TBD]', 'V DC'],
              ['Input Current (TX)', '—', '[TBD]', '—', 'mA'],
              ['Input Current (RX)', '—', '[TBD]', '—', 'mA'],
              ['Input Current (sleep)', '—', '[TBD]', '—', 'mA'],
              ['Operating Temperature', '-20', '—', '+60', '°C']
            ],
            VERSION
          ),
          createSpacer(50),

          createHeading('5.3 Sensor Power Requirements', 2, VERSION),
          createSpecTable(
            ['Sensor', 'Voltage', 'Current (Typ)', 'Current (Max)', 'Notes'],
            [
              ['Wind Speed', '[TBD]', '[TBD]', '[TBD]', ''],
              ['Wind Direction', '[TBD]', '[TBD]', '[TBD]', ''],
              ['Temperature', '[TBD]', '[TBD]', '[TBD]', ''],
              ['Humidity', '[TBD]', '[TBD]', '[TBD]', ''],
              ['Pressure', '[TBD]', '[TBD]', '[TBD]', 'I2C interface'],
              ['Rainfall', 'N/A', 'N/A', 'N/A', 'Passive reed switch'],
              ['H2S', '[TBD]', '[TBD]', '[TBD]', 'Electrochemical'],
              ['CO', '[TBD]', '[TBD]', '[TBD]', 'Electrochemical'],
              ['PM Sensor', '[TBD]', '[TBD]', '[TBD]', 'Laser scattering']
            ],
            VERSION
          ),
          createSpacer(50),

          createHeading('5.4 Total System Power Budget', 2, VERSION),
          createSpecTable(
            ['Component', 'Voltage', 'Current', 'Power', 'Duty Cycle'],
            [
              ['WS Box', '12V', '[TBD] mA', '[TBD] W', '100%'],
              ['MODBUS Asset', '[TBD]V', '[TBD] mA', '[TBD] W', '100%'],
              ['All Sensors', '[TBD]V', '[TBD] mA', '[TBD] W', '100%'],
              ['TOTAL (Active)', '—', '—', '[TBD] W', '—'],
              ['TOTAL (Sleep)', '—', '—', '[TBD] W', '—']
            ],
            VERSION
          ),
          createSpacer(50),

          createCalloutBox('important', 'Solar panel sizing must account for worst-case solar irradiance at installation latitude. Minimum 3× safety factor recommended for continuous operation.', VERSION),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // =====================================================================
      // SECTION 6: SENSOR INTEGRATION
      // =====================================================================
      {
        properties: {
          page: {
            size: { width: PAGE_A4.width, height: PAGE_A4.height },
            margin: PAGE_A4.margins
          }
        },
        headers: { default: createHeader('Weather Station', 'Technical Manual') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('6. Sensor Integration', 1, VERSION),

          createHeading('6.1 Terminal Pinouts', 2, VERSION),

          createHeading('6.1.1 Terminal T1 - Wind Speed', 3, VERSION),
          createSpecTable(
            ['Pin', 'Function', 'Signal Type'],
            [
              ['1', 'Signal +', 'Pulse / 0-5V / 4-20mA'],
              ['2', 'Signal -', 'Ground'],
              ['3', 'Power +', 'Sensor supply (5V/12V selectable)'],
              ['4', 'Power -', 'Ground']
            ],
            VERSION
          ),
          createSpacer(30),

          createHeading('6.1.2 Terminal T2 - Wind Direction', 3, VERSION),
          createSpecTable(
            ['Pin', 'Function', 'Signal Type'],
            [
              ['1', 'Signal', '0-5V / Potentiometer'],
              ['2', 'Ground', 'Ground'],
              ['3', 'Excitation +', 'Reference voltage'],
              ['4', 'Excitation -', 'Ground']
            ],
            VERSION
          ),
          createSpacer(30),

          createHeading('6.1.3 Terminal T3-T4 - Temperature/Humidity', 3, VERSION),
          createSpecTable(
            ['Pin', 'Function', 'Signal Type'],
            [
              ['1', 'SDA/Signal', 'I2C Data / Analog'],
              ['2', 'SCL/Ground', 'I2C Clock / Ground'],
              ['3', 'VCC', 'Sensor supply (3.3V/5V)'],
              ['4', 'GND', 'Ground']
            ],
            VERSION
          ),
          createSpacer(30),

          createHeading('6.1.4 Terminal T5 - Pressure (I2C)', 3, VERSION),
          createSpecTable(
            ['Pin', 'Function', 'Signal Type'],
            [
              ['1', 'SDA', 'I2C Data'],
              ['2', 'SCL', 'I2C Clock'],
              ['3', 'VCC', 'Sensor supply (3.3V)'],
              ['4', 'GND', 'Ground']
            ],
            VERSION
          ),
          createSpacer(30),

          createHeading('6.1.5 Terminal T6 - Rainfall (Pulse)', 3, VERSION),
          createSpecTable(
            ['Pin', 'Function', 'Signal Type'],
            [
              ['1', 'Signal', 'Reed switch output'],
              ['2', 'Ground', 'Ground'],
              ['3', 'N/C', 'Not connected'],
              ['4', 'N/C', 'Not connected']
            ],
            VERSION
          ),
          createSpacer(50),

          createHeading('6.2 I2C Bus Configuration', 2, VERSION),
          createTechValue('Bus Speed', '100 / 400', 'kHz (Standard/Fast mode)', VERSION),
          createTechValue('Pull-up Resistors', '4.7', 'kΩ (internal)', VERSION),
          createTechValue('Max Bus Capacitance', '400', 'pF', VERSION),
          createTechValue('Max Cable Length', '1', 'm (recommended)', VERSION),
          createSpacer(30),
          createBodyText('Default I2C addresses:', VERSION),
          createTechValue('Temperature Sensor', '0x44', 'or 0x45', VERSION),
          createTechValue('Humidity Sensor', '0x44', '(combined T+H sensor)', VERSION),
          createTechValue('Pressure Sensor', '0x76', 'or 0x77', VERSION),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // =====================================================================
      // SECTION 7: POWER SYSTEM DESIGN
      // =====================================================================
      {
        properties: {
          page: {
            size: { width: PAGE_A4.width, height: PAGE_A4.height },
            margin: PAGE_A4.margins
          }
        },
        headers: { default: createHeader('Weather Station', 'Technical Manual') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('7. Power System Design', 1, VERSION),

          createHeading('7.1 Solar Panel Specifications', 2, VERSION),
          createSpecTable(
            ['Parameter', 'Value', 'Unit'],
            [
              ['Rated Power (Pmax)', '50', 'W'],
              ['Voltage at Pmax (Vmp)', '18', 'V'],
              ['Current at Pmax (Imp)', '2.78', 'A'],
              ['Open Circuit Voltage (Voc)', '22', 'V'],
              ['Short Circuit Current (Isc)', '3.0', 'A'],
              ['Cell Type', 'Monocrystalline silicon', ''],
              ['Temperature Coefficient (Voc)', '-0.3', '%/°C'],
              ['Temperature Coefficient (Isc)', '+0.05', '%/°C'],
              ['Temperature Coefficient (Pmax)', '-0.4', '%/°C']
            ],
            VERSION
          ),
          createSpacer(50),

          createHeading('7.2 MPPT Controller Specifications', 2, VERSION),
          createSpecTable(
            ['Parameter', 'Value', 'Unit'],
            [
              ['Input Voltage Range', '12-30', 'V DC'],
              ['Max Input Current', '5', 'A'],
              ['Output Voltage', '12', 'V DC (regulated)'],
              ['Max Charge Current', '[TBD]', 'A'],
              ['MPPT Efficiency', '>99', '%'],
              ['Conversion Efficiency', '>95', '%'],
              ['Charge Algorithm', '3-stage (Bulk/Absorption/Float)', ''],
              ['Float Voltage', '13.8', 'V'],
              ['Absorption Voltage', '14.4', 'V'],
              ['Low Voltage Disconnect', '11.0', 'V'],
              ['Reconnect Voltage', '12.5', 'V']
            ],
            VERSION
          ),
          createSpacer(50),

          createHeading('7.3 Battery Specifications', 2, VERSION),
          createSpecTable(
            ['Parameter', 'Value', 'Unit'],
            [
              ['Nominal Voltage', '12', 'V'],
              ['Capacity', '[TBD]', 'Ah'],
              ['Chemistry', 'Lead-acid / AGM / LiFePO4', ''],
              ['Cycle Life', '[TBD]', 'cycles @ 50% DOD'],
              ['Operating Temperature', '-20 to +50', '°C'],
              ['Self-discharge', '<3', '% per month']
            ],
            VERSION
          ),
          createSpacer(50),

          createHeading('7.4 Autonomy Calculation', 2, VERSION),
          createBodyText('Battery autonomy (days without solar charging):', VERSION),
          createSpacer(30),
          createBodyText('Autonomy = (Battery Capacity × DOD × Efficiency) / Daily Load', VERSION),
          createSpacer(30),
          createBodyText('Example calculation:', VERSION),
          createTechValue('Battery Capacity', '[TBD]', 'Ah', VERSION),
          createTechValue('Depth of Discharge (DOD)', '50', '%', VERSION),
          createTechValue('System Efficiency', '85', '%', VERSION),
          createTechValue('Daily Load', '[TBD]', 'Ah/day', VERSION),
          createTechValue('Calculated Autonomy', '[TBD]', 'days', VERSION),
          createSpacer(50),

          createCalloutBox('tip', 'For critical installations, specify battery capacity for minimum 5 days autonomy to account for extended cloudy periods.', VERSION),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // =====================================================================
      // SECTION 8: INSTALLATION ENGINEERING
      // =====================================================================
      {
        properties: {
          page: {
            size: { width: PAGE_A4.width, height: PAGE_A4.height },
            margin: PAGE_A4.margins
          }
        },
        headers: { default: createHeader('Weather Station', 'Technical Manual') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('8. Installation Engineering', 1, VERSION),

          createHeading('8.1 Mounting Requirements', 2, VERSION),
          createSpecTable(
            ['Parameter', 'Requirement'],
            [
              ['Wind sensor height', '10 m above ground (WMO standard) or site-specific'],
              ['Wind sensor clearance', '10× obstacle height in all directions'],
              ['Temperature sensor', 'Radiation shield required, 1.5-2m height'],
              ['Rainfall sensor', 'Level surface, away from obstructions'],
              ['Solar panel tilt', 'Latitude angle ± 15° (seasonal adjustment)'],
              ['Solar panel azimuth', '180° (true south, northern hemisphere)'],
              ['Enclosure mounting', 'Vibration-resistant, corrosion-resistant hardware']
            ],
            VERSION
          ),
          createSpacer(50),

          createHeading('8.2 Cable Specifications', 2, VERSION),

          createHeading('8.2.1 RS485 Cable', 3, VERSION),
          createSpecTable(
            ['Parameter', 'Specification'],
            [
              ['Type', 'Shielded twisted pair (STP)'],
              ['Conductor', '24 AWG stranded'],
              ['Impedance', '120Ω nominal'],
              ['Capacitance', '<30 pF/ft'],
              ['Shield', 'Foil + drain wire'],
              ['Jacket', 'UV-resistant, outdoor rated'],
              ['Temperature Rating', '-40°C to +80°C']
            ],
            VERSION
          ),
          createSpacer(30),

          createHeading('8.2.2 Power Cable', 3, VERSION),
          createSpecTable(
            ['Parameter', 'Specification'],
            [
              ['Type', '2-conductor stranded'],
              ['Conductor', '18 AWG minimum'],
              ['Voltage Rating', '300V'],
              ['Current Rating', '> 5A'],
              ['Jacket', 'UV-resistant, outdoor rated']
            ],
            VERSION
          ),
          createSpacer(50),

          createHeading('8.3 Grounding & Surge Protection', 2, VERSION),
          createBullet('All metallic enclosures bonded to earth ground', VERSION),
          createBullet('RS485 shield grounded at one end only (WS Box end)', VERSION),
          createBullet('Surge protection on RS485 lines (TVS diodes)', VERSION),
          createBullet('Lightning protection per local codes', VERSION),
          createSpacer(50),

          createSafetyPanel('warning', 'Proper grounding is essential for personnel safety and equipment protection. Follow local electrical codes for earth grounding requirements.', VERSION),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // =====================================================================
      // SECTION 9: CALIBRATION PROCEDURES
      // =====================================================================
      {
        properties: {
          page: {
            size: { width: PAGE_A4.width, height: PAGE_A4.height },
            margin: PAGE_A4.margins
          }
        },
        headers: { default: createHeader('Weather Station', 'Technical Manual') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('9. Calibration Procedures', 1, VERSION),

          createHeading('9.1 Calibration Schedule', 2, VERSION),
          createSpecTable(
            ['Sensor Type', 'Interval', 'Method', 'Traceability'],
            [
              ['Temperature', '24 months', 'Comparison with reference', 'NIST-traceable thermometer'],
              ['Humidity', '24 months', 'Comparison with reference', 'NIST-traceable hygrometer'],
              ['Pressure', '24 months', 'Comparison with reference', 'NIST-traceable barometer'],
              ['Wind Speed', '24 months', 'Wind tunnel or comparison', 'Calibrated reference anemometer'],
              ['Wind Direction', '24 months', 'Compass alignment', 'Surveyed reference bearing'],
              ['H2S', '6-12 months', 'Certified calibration gas', 'NIST-traceable gas standard'],
              ['CO', '6-12 months', 'Certified calibration gas', 'NIST-traceable gas standard'],
              ['PM2.5/PM10', '12 months', 'Gravimetric reference', 'Reference sampler']
            ],
            VERSION
          ),
          createSpacer(50),

          createHeading('9.2 Gas Sensor Calibration Procedure', 2, VERSION),
          createSafetyPanel('warning', 'Gas sensor calibration requires certified calibration gases. Perform in well-ventilated area. Use appropriate respiratory protection.', VERSION),
          createSpacer(50),

          createHeading('9.2.1 Zero Calibration', 3, VERSION),
          createStep(1, 'Ensure sensor is warmed up (minimum 15 minutes at operating temperature)', VERSION),
          createStep(2, 'Expose sensor to zero air (synthetic air, hydrocarbon-free)', VERSION),
          createStep(3, 'Wait for stable reading (minimum 60 seconds)', VERSION),
          createStep(4, 'Record baseline value via MODBUS register or NFC', VERSION),
          createStep(5, 'Apply zero offset correction if required', VERSION),
          createSpacer(30),

          createHeading('9.2.2 Span Calibration', 3, VERSION),
          createStep(1, 'Connect certified calibration gas at known concentration', VERSION),
          createStep(2, 'Flow rate: 0.5-1.0 L/min through calibration adapter', VERSION),
          createStep(3, 'Wait for stable reading (minimum 60 seconds)', VERSION),
          createStep(4, 'Compare reading to certified gas concentration', VERSION),
          createStep(5, 'Calculate and apply span correction factor', VERSION),
          createStep(6, 'Verify corrected reading within ±5% of standard', VERSION),
          createSpacer(50),

          createHeading('9.3 Environmental Sensor Field Verification', 2, VERSION),
          createBodyText('Field verification compares WS readings against portable reference instruments:', VERSION),
          createSpacer(30),
          createBullet('Temperature: Compare with calibrated digital thermometer (±0.5°C)', VERSION),
          createBullet('Humidity: Compare with calibrated sling psychrometer (±3% RH)', VERSION),
          createBullet('Pressure: Compare with calibrated digital barometer (±1 hPa)', VERSION),
          createBullet('Wind: Visual verification of direction; speed comparison if reference available', VERSION),
          createSpacer(50),

          createCalloutBox('note', 'Field verification is not a substitute for laboratory calibration but can identify gross errors between scheduled calibrations.', VERSION),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // =====================================================================
      // SECTION 10: DIAGNOSTIC & DEBUG
      // =====================================================================
      {
        properties: {
          page: {
            size: { width: PAGE_A4.width, height: PAGE_A4.height },
            margin: PAGE_A4.margins
          }
        },
        headers: { default: createHeader('Weather Station', 'Technical Manual') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('10. Diagnostic & Debug', 1, VERSION),

          createHeading('10.1 LED Diagnostic Codes', 2, VERSION),
          createSpecTable(
            ['LED Pattern', 'Blinks/min', 'Status', 'Root Cause', 'Resolution'],
            [
              ['1 blink', '1', 'Normal', 'System OK', 'None required'],
              ['2 blinks', '2', 'RS485 Error', 'No data from WS Box', 'Check A-A, B-B wiring'],
              ['3 blinks', '3', 'Mesh Error', 'Cannot reach Anchors', 'Check Anchor power/position'],
              ['Rapid', '>10', 'Initializing', 'Boot sequence', 'Wait 60 seconds'],
              ['Solid ON', '—', 'Hardware Fault', 'Internal failure', 'Replace unit'],
              ['OFF', '0', 'No Power', 'Power supply issue', 'Check power source']
            ],
            VERSION
          ),
          createSpacer(50),

          createHeading('10.2 MODBUS Diagnostic Registers', 2, VERSION),
          createSpecTable(
            ['Address', 'Name', 'Description'],
            [
              ['0x0100', 'COMM_STATUS', 'RS485 communication status (0=OK, 1=Error)'],
              ['0x0101', 'MSG_COUNT', 'Successful message count (rolling)'],
              ['0x0102', 'ERR_COUNT', 'Error count (rolling)'],
              ['0x0103', 'LAST_ERROR', 'Last error code'],
              ['0x0104', 'UPTIME_H', 'Uptime hours (high word)'],
              ['0x0105', 'UPTIME_L', 'Uptime hours (low word)'],
              ['0x0106', 'TEMP_INT', 'Internal temperature (×0.1 °C)'],
              ['0x0107', 'VIN', 'Input voltage (×0.01 V)'],
              ['0x0108', 'FW_VERSION', 'Firmware version (major.minor)']
            ],
            VERSION
          ),
          createSpacer(50),

          createHeading('10.3 Error Codes', 2, VERSION),
          createSpecTable(
            ['Code', 'Name', 'Description', 'Action'],
            [
              ['0x01', 'CRC_ERROR', 'MODBUS CRC mismatch', 'Check wiring, EMI'],
              ['0x02', 'TIMEOUT', 'No response from slave', 'Check WS Box power'],
              ['0x03', 'FRAME_ERROR', 'Invalid frame format', 'Check baud rate'],
              ['0x04', 'SENSOR_FAULT', 'Sensor reading invalid', 'Check sensor connection'],
              ['0x05', 'OVERTEMP', 'Internal temperature high', 'Improve ventilation'],
              ['0x06', 'UNDERVOLT', 'Input voltage low', 'Check battery/solar']
            ],
            VERSION
          ),
          createSpacer(50),

          createHeading('10.4 Debug Mode', 2, VERSION),
          createBodyText('Enable debug mode via NFC or MODBUS register write:', VERSION),
          createSpacer(30),
          createTechValue('Debug Register', '0x0200', '', VERSION),
          createTechValue('Enable Value', '0x00DB', '', VERSION),
          createTechValue('Disable Value', '0x0000', '', VERSION),
          createSpacer(30),
          createBodyText('Debug mode enables:', VERSION),
          createBullet('Verbose logging to internal buffer', VERSION),
          createBullet('1-second data transmission (vs 60-second normal)', VERSION),
          createBullet('Raw ADC values in diagnostic registers', VERSION),
          createSpacer(30),
          createCalloutBox('important', 'Debug mode increases power consumption and network traffic. Disable after troubleshooting.', VERSION),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // =====================================================================
      // SECTION 11: FIRMWARE & CONFIGURATION
      // =====================================================================
      {
        properties: {
          page: {
            size: { width: PAGE_A4.width, height: PAGE_A4.height },
            margin: PAGE_A4.margins
          }
        },
        headers: { default: createHeader('Weather Station', 'Technical Manual') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('11. Firmware & Configuration', 1, VERSION),

          createHeading('11.1 Firmware Information', 2, VERSION),
          createTechValue('Current Version', '[TBD]', '', VERSION),
          createTechValue('Release Date', '[TBD]', '', VERSION),
          createTechValue('Update Method', 'OTA via Gateway or NFC provisioning', '', VERSION),
          createSpacer(50),

          createHeading('11.2 Configuration Parameters', 2, VERSION),
          createSpecTable(
            ['Parameter', 'Register', 'Default', 'Range', 'Description'],
            [
              ['SLAVE_ADDR', '0x0300', '1', '1-247', 'MODBUS slave address'],
              ['BAUD_RATE', '0x0301', '9600', '9600/19200', 'RS485 baud rate'],
              ['SAMPLE_INT', '0x0302', '60', '1-3600', 'Sample interval (seconds)'],
              ['TX_POWER', '0x0303', '[TBD]', '[TBD]', 'Wireless TX power'],
              ['MESH_CHAN', '0x0304', '[TBD]', '[TBD]', 'Mesh network channel'],
              ['SENSOR_EN', '0x0310', '0x003F', 'Bitmap', 'Sensor enable mask'],
              ['ALARM_H2S', '0x0320', '10', '0-100', 'H2S alarm threshold (ppm)'],
              ['ALARM_CO', '0x0321', '50', '0-500', 'CO alarm threshold (ppm)']
            ],
            VERSION
          ),
          createSpacer(50),

          createHeading('11.3 NFC Configuration', 2, VERSION),
          createBodyText('Configuration can be read/written via NFC using WakeCap Verify App:', VERSION),
          createSpacer(30),
          createStep(1, 'Open WakeCap Verify App on NFC-enabled mobile device', VERSION),
          createStep(2, 'Select "Configure Device" from menu', VERSION),
          createStep(3, 'Hold phone near NFC tag on MODBUS Asset', VERSION),
          createStep(4, 'Read current configuration', VERSION),
          createStep(5, 'Modify parameters as needed', VERSION),
          createStep(6, 'Write configuration (hold phone steady during write)', VERSION),
          createStep(7, 'Verify write success on app display', VERSION),
          createSpacer(50),

          createHeading('11.4 Factory Reset', 2, VERSION),
          createBodyText('To restore factory defaults:', VERSION),
          createSpacer(30),
          createBodyText('Method 1 (MODBUS):', VERSION),
          createTechValue('Write register', '0x03FF = 0xREST', '', VERSION),
          createSpacer(30),
          createBodyText('Method 2 (NFC):', VERSION),
          createBullet('Use "Factory Reset" option in Verify App', VERSION),
          createSpacer(30),
          createBodyText('Method 3 (Hardware):', VERSION),
          createBullet('Hold reset button during power-up for 10 seconds', VERSION),
          createSpacer(50),

          createSafetyPanel('caution', 'Factory reset erases all configuration including calibration offsets. Recalibration may be required after reset.', VERSION),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // =====================================================================
      // APPENDIX A: REGISTER MAP
      // =====================================================================
      {
        properties: {
          page: {
            size: { width: PAGE_A4.width, height: PAGE_A4.height },
            margin: PAGE_A4.margins
          }
        },
        headers: { default: createHeader('Weather Station', 'Technical Manual') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('Appendix A: MODBUS Register Map', 1, VERSION),

          createHeading('A.1 Input Registers (Function Code 0x04)', 2, VERSION),
          createSpecTable(
            ['Address', 'Name', 'Type', 'Scale', 'Unit', 'Description'],
            [
              ['0x0000', 'WIND_SPEED', 'UINT16', '×0.1', 'm/s', 'Wind speed'],
              ['0x0001', 'WIND_DIR', 'UINT16', '×1', '°', 'Wind direction'],
              ['0x0002', 'TEMPERATURE', 'INT16', '×0.1', '°C', 'Ambient temperature'],
              ['0x0003', 'HUMIDITY', 'UINT16', '×0.1', '%RH', 'Relative humidity'],
              ['0x0004', 'PRESSURE', 'UINT16', '×0.1', 'hPa', 'Atmospheric pressure'],
              ['0x0005', 'RAINFALL', 'UINT16', '×0.1', 'mm', 'Accumulated rainfall'],
              ['0x0006', 'RAIN_RATE', 'UINT16', '×0.1', 'mm/hr', 'Rainfall rate'],
              ['0x0010', 'H2S', 'UINT16', '×0.1', 'ppm', 'H2S concentration'],
              ['0x0011', 'CO', 'UINT16', '×1', 'ppm', 'CO concentration'],
              ['0x0012', 'PM25', 'UINT16', '×1', 'µg/m³', 'PM2.5 concentration'],
              ['0x0013', 'PM10', 'UINT16', '×1', 'µg/m³', 'PM10 concentration']
            ],
            VERSION
          ),
          createSpacer(50),

          createHeading('A.2 Holding Registers (Function Code 0x03/0x06)', 2, VERSION),
          createSpecTable(
            ['Address', 'Name', 'R/W', 'Default', 'Description'],
            [
              ['0x0100', 'COMM_STATUS', 'R', '—', 'Communication status'],
              ['0x0101', 'MSG_COUNT', 'R', '0', 'Message counter'],
              ['0x0102', 'ERR_COUNT', 'R', '0', 'Error counter'],
              ['0x0103', 'LAST_ERROR', 'R', '0', 'Last error code'],
              ['0x0108', 'FW_VERSION', 'R', '—', 'Firmware version'],
              ['0x0200', 'DEBUG_MODE', 'R/W', '0x0000', 'Debug mode enable'],
              ['0x0300', 'SLAVE_ADDR', 'R/W', '1', 'MODBUS address'],
              ['0x0301', 'BAUD_RATE', 'R/W', '9600', 'Serial baud rate'],
              ['0x0302', 'SAMPLE_INT', 'R/W', '60', 'Sample interval (s)'],
              ['0x03FF', 'FACTORY_RST', 'W', '—', 'Factory reset trigger']
            ],
            VERSION
          ),
          createSpacer(50),

          createCalloutBox('note', 'All multi-byte values are big-endian (MSB first) per MODBUS specification. INT16 values use two\'s complement for negative numbers.', VERSION),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // =====================================================================
      // APPENDIX B: WIRING SCHEMATICS
      // =====================================================================
      {
        properties: {
          page: {
            size: { width: PAGE_A4.width, height: PAGE_A4.height },
            margin: PAGE_A4.margins
          }
        },
        headers: { default: createHeader('Weather Station', 'Technical Manual') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('Appendix B: Wiring Schematics', 1, VERSION),

          createHeading('B.1 System Wiring Overview', 2, VERSION),
          createImagePlaceholder('Complete system wiring schematic showing all connections with wire gauges and colors', VERSION),
          createSpacer(50),

          createHeading('B.2 RS485 Connection Detail', 2, VERSION),
          createImagePlaceholder('RS485 wiring detail showing terminal connections, shield grounding, and termination resistor', VERSION),
          createSpacer(30),
          createBodyText('RS485 Wiring Notes:', VERSION),
          createBullet('Use shielded twisted pair cable (STP)', VERSION),
          createBullet('Connect A to A, B to B (do not cross)', VERSION),
          createBullet('Ground shield at WS Box end only', VERSION),
          createBullet('Install 120Ω termination at both ends for runs >50m', VERSION),
          createSpacer(50),

          createHeading('B.3 Power System Wiring', 2, VERSION),
          createImagePlaceholder('Power system schematic: Solar panel → MPPT → Battery → Load with fuse locations', VERSION),
          createSpacer(30),
          createBodyText('Power Wiring Notes:', VERSION),
          createBullet('Observe polarity: + to +, - to -', VERSION),
          createBullet('Install inline fuse on battery positive (5A recommended)', VERSION),
          createBullet('Use appropriately rated wire gauge for current', VERSION),
          createBullet('Protect connections from moisture', VERSION),
          createSpacer(50),

          createHeading('B.4 Sensor Wiring Examples', 2, VERSION),
          createImagePlaceholder('Typical sensor wiring diagrams for analog, digital, and I2C sensors', VERSION),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // =====================================================================
      // APPENDIX C: PART NUMBERS
      // =====================================================================
      {
        properties: {
          page: {
            size: { width: PAGE_A4.width, height: PAGE_A4.height },
            margin: PAGE_A4.margins
          }
        },
        headers: { default: createHeader('Weather Station', 'Technical Manual') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('Appendix C: Part Numbers', 1, VERSION),

          createHeading('C.1 System Components', 2, VERSION),
          createSpecTable(
            ['Part Number', 'Description', 'Notes'],
            [
              ['WC-WS-BOX-01', 'WS Box (Weather Station Box)', 'Main data aggregation unit'],
              ['WC-MA-01', 'MODBUS Asset', 'RS485 to wireless bridge'],
              ['WC-SP-50W', 'Solar Panel 50W', 'Monocrystalline'],
              ['WC-MPPT-12', 'MPPT Charge Controller', '12V system'],
              ['WC-BAT-12', 'Battery 12V', 'AGM or LiFePO4'],
              ['WC-MNT-KIT', 'Mounting Hardware Kit', 'Brackets, fasteners'],
              ['WC-CBL-RS485', 'RS485 Cable Assembly', '10m standard length']
            ],
            VERSION
          ),
          createSpacer(50),

          createHeading('C.2 Sensors (Ordered Separately)', 2, VERSION),
          createSpecTable(
            ['Part Number', 'Description', 'Terminal'],
            [
              ['WC-SEN-WS', 'Wind Speed Sensor', 'T1'],
              ['WC-SEN-WD', 'Wind Direction Sensor', 'T2'],
              ['WC-SEN-TEMP', 'Temperature Sensor', 'T3'],
              ['WC-SEN-HUM', 'Humidity Sensor', 'T4'],
              ['WC-SEN-PRES', 'Pressure Sensor', 'T5'],
              ['WC-SEN-RAIN', 'Rainfall Sensor', 'T6'],
              ['WC-SEN-H2S', 'H2S Gas Sensor', 'Gas module'],
              ['WC-SEN-CO', 'CO Gas Sensor', 'Gas module'],
              ['WC-SEN-PM', 'Particulate Matter Sensor', 'PM module']
            ],
            VERSION
          ),
          createSpacer(50),

          createHeading('C.3 Spare Parts & Consumables', 2, VERSION),
          createSpecTable(
            ['Part Number', 'Description', 'Replacement Interval'],
            [
              ['WC-SEN-H2S-R', 'H2S Sensor (replacement)', '12-24 months'],
              ['WC-SEN-CO-R', 'CO Sensor (replacement)', '12-24 months'],
              ['WC-FUSE-5A', 'Fuse 5A (pack of 5)', 'As needed'],
              ['WC-GLAND-KIT', 'Cable Gland Kit', 'As needed'],
              ['WC-TERM-KIT', 'Terminal Block Kit', 'As needed']
            ],
            VERSION
          ),
          createSpacer(100),

          createHeading('Document Information', 2, VERSION),
          createTechValue('Document ID', DOC_ID, '', VERSION),
          createTechValue('Revision', '1.0', '', VERSION),
          createTechValue('Date', REVISION_DATE, '', VERSION),
          createTechValue('Classification', 'Internal / Technical', '', VERSION),
          createSpacer(100),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: '© 2026 WakeCap Technologies | INTERNAL USE | www.wakecap.com',
                size: 16,
                font: 'Source Sans Pro',
                color: COLORS.slate
              })
            ]
          })
        ]
      }
    ]
  });

  // Generate the document
  const buffer = await Packer.toBuffer(doc);
  const outputPath = './output/WC-WS-PM-v1.0-TECH.docx';
  fs.writeFileSync(outputPath, buffer);
  console.log(`✓ Generated: ${outputPath}`);
}

generateTechnicalManual().catch(console.error);

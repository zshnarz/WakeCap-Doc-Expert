/**
 * WakeCap Weather Station Product Manual Generator
 * Generates WC-WS-PM-v1.0.docx
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

const VERSION = 'A'; // Marketing version
const DOC_ID = 'WC-WS-PM-v1.0';
const REVISION_DATE = '2026-02-04';

// Helper to create a bullet point
function createBullet(text, version = 'A') {
  const sizes = version === 'A' ? FONT_SIZES.versionA : FONT_SIZES.versionB;
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 80 },
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
function createStep(number, text, version = 'A') {
  const sizes = version === 'A' ? FONT_SIZES.versionA : FONT_SIZES.versionB;
  return new Paragraph({
    spacing: { after: 120 },
    children: [
      new TextRun({
        text: `${number}. `,
        bold: true,
        size: sizes.body,
        font: 'Source Sans Pro',
        color: COLORS.wakecapBlue
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

// Create empty paragraph for spacing
function createSpacer(height = 200) {
  return new Paragraph({
    spacing: { after: height },
    children: []
  });
}

async function generateManual() {
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
          createImagePlaceholder('WakeCap Weather Station - Product Hero Shot (60% of page)', VERSION),
          createSpacer(400),

          new Paragraph({
            children: [
              new TextRun({
                text: '[WakeCap Logo]',
                size: 20,
                font: 'Source Sans Pro',
                color: COLORS.slate,
                italics: true
              })
            ]
          }),
          createSpacer(200),

          createHeading('WakeCap Weather Station', 1, VERSION),
          createHeading('Product Manual', 3, VERSION),
          createSpacer(100),

          createBodyText('Comprehensive Environmental Monitoring System for Industrial Sites', VERSION),
          createSpacer(300),

          new Paragraph({
            children: [
              new TextRun({
                text: `Model: WS-100\t\tDocument: ${DOC_ID}`,
                size: 18,
                font: 'Source Sans Pro',
                color: COLORS.slate
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Revision: 1.0\t\tDate: ${REVISION_DATE}`,
                size: 18,
                font: 'Source Sans Pro',
                color: COLORS.slate
              })
            ]
          }),

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
        headers: { default: createHeader('Weather Station', 'Product Manual') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('Table of Contents', 1, VERSION),
          createSpacer(200),

          // Manual TOC entries
          createBodyText('1. Product Overview .................................................... 3', VERSION),
          createBodyText('2. System Architecture ................................................ 4', VERSION),
          createBodyText('3. Technical Specifications .......................................... 5', VERSION),
          createBodyText('4. Components ......................................................... 6', VERSION),
          createBodyText('5. Installation ........................................................ 10', VERSION),
          createBodyText('6. Operation ........................................................... 12', VERSION),
          createBodyText('7. Maintenance ........................................................ 13', VERSION),
          createBodyText('8. Troubleshooting .................................................... 14', VERSION),
          createBodyText('9. Safety Information ................................................ 15', VERSION),
          createBodyText('Appendix A: Wiring Diagrams ........................................ 16', VERSION),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // =====================================================================
      // SECTION 1: PRODUCT OVERVIEW
      // =====================================================================
      {
        properties: {
          page: {
            size: { width: PAGE_A4.width, height: PAGE_A4.height },
            margin: PAGE_A4.margins
          }
        },
        headers: { default: createHeader('Weather Station', 'Product Manual') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('1. Product Overview', 1, VERSION),

          createHeading('1.1 Description', 2, VERSION),
          createBodyText('The WakeCap Weather Station is a comprehensive environmental monitoring system designed for industrial sites, construction zones, and remote locations. It provides real-time monitoring of weather conditions and air quality to support safety compliance, operational planning, and environmental awareness.', VERSION),
          createBodyText('The system integrates multiple sensor types for weather and air quality monitoring, transmitting data wirelessly through a mesh network to a cloud-based dashboard for visualization, analysis, and alerting.', VERSION),
          createSpacer(100),

          createHeading('1.2 Primary Purpose', 2, VERSION),
          createBullet('Real-time environmental data collection', VERSION),
          createBullet('Safety compliance monitoring (gas detection, weather alerts)', VERSION),
          createBullet('Operational planning support (wind conditions, rainfall)', VERSION),
          createBullet('Historical data logging for analysis and reporting', VERSION),
          createBullet('Remote monitoring via cloud-based dashboard', VERSION),
          createSpacer(100),

          createHeading('1.3 Key Features', 2, VERSION),
          createBullet('Wireless mesh network connectivity (no cables to gateway)', VERSION),
          createBullet('Solar-powered operation with battery backup', VERSION),
          createBullet('Real-time cloud data transmission via HTTPS', VERSION),
          createBullet('Multi-sensor support (weather + gas + particulate)', VERSION),
          createBullet('Mobile app for field verification (WakeCap Verify App)', VERSION),
          createBullet('Web dashboard for data visualization and export', VERSION),
          createSpacer(100),

          createHeading('1.4 Package Contents', 2, VERSION),
          createSpecTable(
            ['Item', 'Quantity', 'Part Number'],
            [
              ['WS Box (Weather Station Box)', '1', 'WC-WS-BOX-01'],
              ['MODBUS Asset', '1', 'WC-MA-01'],
              ['Solar Panel', '1', 'WC-SP-50W'],
              ['MPPT Controller', '1', 'WC-MPPT-12'],
              ['Battery (12V)', '1', 'WC-BAT-12'],
              ['Mounting Hardware Kit', '1', 'WC-MNT-KIT'],
              ['RS485 Cable (shielded)', '1', 'WC-CBL-RS485'],
              ['Quick Start Guide', '1', '—']
            ],
            VERSION
          ),
          createSpacer(100),

          createCalloutBox('note', 'Environmental sensors are ordered separately based on site requirements. Contact WakeCap for sensor configuration options.', VERSION),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // =====================================================================
      // SECTION 2: SYSTEM ARCHITECTURE
      // =====================================================================
      {
        properties: {
          page: {
            size: { width: PAGE_A4.width, height: PAGE_A4.height },
            margin: PAGE_A4.margins
          }
        },
        headers: { default: createHeader('Weather Station', 'Product Manual') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('2. System Architecture', 1, VERSION),

          createHeading('2.1 System Overview', 2, VERSION),
          createBodyText('The Weather Station follows a linear data flow architecture, collecting environmental data and transmitting it through multiple network layers to the cloud dashboard.', VERSION),
          createSpacer(100),

          createImagePlaceholder('System Architecture Block Diagram - Sensors → WS Box → MODBUS Asset → Anchors → Gateway → Cloud → Dashboard', VERSION),
          createSpacer(100),

          createHeading('2.2 Architecture Layers', 2, VERSION),
          createSpecTable(
            ['Layer', 'Component', 'Function'],
            [
              ['Layer 1 - Data Collection', 'Environmental Sensors', 'Measure environmental parameters'],
              ['Layer 2 - Data Aggregation', 'WS Box', 'Collect and process sensor data'],
              ['Layer 3 - Protocol Bridge', 'MODBUS Asset', 'Convert wired to wireless transmission'],
              ['Layer 4 - Wireless Network', 'Mesh Anchors', 'Relay data wirelessly'],
              ['Layer 5 - Internet Gateway', 'Gateway Device', 'Connect to cloud via internet'],
              ['Layer 6 - Cloud Processing', 'Cloud Server', 'Process, store, and serve data'],
              ['Layer 7 - User Interface', 'Web Dashboard', 'Visualize and export data']
            ],
            VERSION
          ),
          createSpacer(100),

          createHeading('2.3 Communication Protocols', 2, VERSION),
          createSpecTable(
            ['Connection', 'Protocol', 'Notes'],
            [
              ['Sensors to WS Box', 'Analog/Digital wired', 'Varies by sensor type'],
              ['WS Box to MODBUS Asset', 'RS485 (MODBUS RTU)', '2-wire serial connection'],
              ['MODBUS Asset to Anchors', 'Proprietary wireless mesh', 'Self-healing network'],
              ['Anchors to Gateway', 'Proprietary wireless mesh', 'Multi-hop routing'],
              ['Gateway to Cloud', 'HTTPS over Cellular/WiFi/Ethernet', 'Encrypted transmission']
            ],
            VERSION
          ),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // =====================================================================
      // SECTION 3: TECHNICAL SPECIFICATIONS
      // =====================================================================
      {
        properties: {
          page: {
            size: { width: PAGE_A4.width, height: PAGE_A4.height },
            margin: PAGE_A4.margins
          }
        },
        headers: { default: createHeader('Weather Station', 'Product Manual') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('3. Technical Specifications', 1, VERSION),

          createHeading('3.1 Environmental Sensors - Standard', 2, VERSION),
          createSpecTable(
            ['Sensor', 'Parameter', 'Range', 'Unit'],
            [
              ['Wind Speed', 'Velocity', '0–60', 'm/s'],
              ['Wind Direction', 'Bearing', '0–360', 'degrees'],
              ['Temperature', 'Ambient', '-40 to +85', '°C'],
              ['Humidity', 'Relative', '0–100', '% RH'],
              ['Atmospheric Pressure', 'Barometric', '300–1100', 'hPa'],
              ['Rainfall', 'Precipitation', '0–[TBD]', 'mm']
            ],
            VERSION
          ),
          createSpacer(100),

          createHeading('3.2 Environmental Sensors - Gas Detection', 2, VERSION),
          createSpecTable(
            ['Sensor', 'Detection', 'Range', 'Unit'],
            [
              ['H2S (Hydrogen Sulfide)', 'Toxic gas', '0–100', 'ppm'],
              ['CO (Carbon Monoxide)', 'Toxic gas', '0–500', 'ppm'],
              ['PM2.5', 'Fine particulate', '0–1000', 'µg/m³'],
              ['PM10', 'Coarse particulate', '0–1000', 'µg/m³']
            ],
            VERSION
          ),
          createSpacer(100),

          createHeading('3.3 WS Box Specifications', 2, VERSION),
          createSpecTable(
            ['Parameter', 'Value', 'Unit'],
            [
              ['Input Voltage', '12', 'V DC'],
              ['Connector Type', 'Barrel jack', '—'],
              ['Interface Output', 'RS485 (MODBUS RTU)', '—'],
              ['Display', 'LCD (live readings)', '—'],
              ['Sensor Terminals', '6 (T1–T6)', '—'],
              ['Enclosure Rating', '[TBD]', 'IP']
            ],
            VERSION
          ),
          createSpacer(100),

          createHeading('3.4 MODBUS Asset Specifications', 2, VERSION),
          createSpecTable(
            ['Parameter', 'Value', 'Unit'],
            [
              ['Input Interface', 'RS485 (A, B terminals)', '—'],
              ['Output Interface', 'Wireless mesh', '—'],
              ['LED Indicator', '1 blink/min = OK; 2 blinks/min = Error', '—'],
              ['Configuration', 'NFC tag', '—'],
              ['Enclosure Rating', 'Weatherproof', '—']
            ],
            VERSION
          ),
          createSpacer(100),

          createHeading('3.5 Power System Specifications', 2, VERSION),
          createSpecTable(
            ['Parameter', 'Value', 'Unit'],
            [
              ['Solar Panel Output', '[TBD]', 'W'],
              ['Battery Type', 'Rechargeable', '—'],
              ['Battery Voltage', '12', 'V DC'],
              ['Controller Type', 'MPPT', '—'],
              ['Minimum Operating Voltage', '12+', 'V']
            ],
            VERSION
          ),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // =====================================================================
      // SECTION 4: COMPONENTS
      // =====================================================================
      {
        properties: {
          page: {
            size: { width: PAGE_A4.width, height: PAGE_A4.height },
            margin: PAGE_A4.margins
          }
        },
        headers: { default: createHeader('Weather Station', 'Product Manual') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('4. Components', 1, VERSION),

          createHeading('4.1 WS Box (Weather Station Box)', 2, VERSION),
          createBodyText('The WS Box is the central data aggregation unit that collects and processes readings from all connected sensors.', VERSION),
          createSpacer(100),

          createHeading('Function', 3, VERSION),
          createBullet('Aggregates data from all connected environmental sensors', VERSION),
          createBullet('Performs initial data processing and validation', VERSION),
          createBullet('Displays live sensor readings on built-in LCD screen', VERSION),
          createBullet('Transmits data to MODBUS Asset via RS485 interface', VERSION),
          createSpacer(100),

          createHeading('Physical Characteristics', 3, VERSION),
          createBullet('Housed in weatherproof enclosure (IP-rated)', VERSION),
          createBullet('Built-in LCD display showing real-time sensor values', VERSION),
          createBullet('Multiple sensor connection terminals (T1–T6)', VERSION),
          createBullet('RS485 output terminals (A and B) for MODBUS communication', VERSION),
          createBullet('Barrel jack connector for 12V DC power input', VERSION),
          createSpacer(100),

          createImagePlaceholder('WS Box Terminal Layout - showing LCD display, sensor terminals T1-T6, RS485 A/B terminals, and 12V DC power input', VERSION),
          createSpacer(100),

          createHeading('Sensor Terminal Assignments', 3, VERSION),
          createSpecTable(
            ['Terminal', 'Sensor', 'Connection Type'],
            [
              ['T1', 'Wind Speed', 'Analog/Digital'],
              ['T2', 'Wind Direction', 'Analog/Digital'],
              ['T3', 'Temperature', 'Analog/Digital'],
              ['T4', 'Humidity', 'Analog/Digital'],
              ['T5', 'Atmospheric Pressure', 'Analog/Digital'],
              ['T6', 'Rainfall', 'Analog/Digital']
            ],
            VERSION
          ),

          new Paragraph({ children: [new PageBreak()] }),

          createHeading('4.2 MODBUS Asset', 2, VERSION),
          createBodyText('The MODBUS Asset acts as a communication bridge between the wired WS Box and the wireless mesh network.', VERSION),
          createSpacer(100),

          createHeading('Function', 3, VERSION),
          createBullet('Receives sensor data from WS Box via RS485 (MODBUS RTU protocol)', VERSION),
          createBullet('Converts wired data to wireless transmission format', VERSION),
          createBullet('Transmits data wirelessly to nearby Mesh Anchors', VERSION),
          createBullet('Provides visual status indication via LED', VERSION),
          createBullet('Supports NFC for configuration and verification', VERSION),
          createSpacer(100),

          createImagePlaceholder('MODBUS Asset - showing NFC tag, LED indicator, RS485 input terminals (A/B), and power terminals', VERSION),
          createSpacer(100),

          createHeading('LED Status Indicator', 3, VERSION),
          createSpecTable(
            ['Blinks/Minute', 'Status', 'Meaning'],
            [
              ['1 blink/min', 'NORMAL', 'System operating correctly; data being transmitted'],
              ['2 blinks/min', 'COMMUNICATION ERROR', 'No data from WS Box; check RS485 wiring (A-A, B-B)']
            ],
            VERSION
          ),
          createSpacer(100),

          createCalloutBox('important', 'Wire polarity is critical. Terminal A on WS Box must connect to Terminal A on MODBUS Asset. Reversed wiring causes communication failure.', VERSION),

          new Paragraph({ children: [new PageBreak()] }),

          createHeading('4.3 Mesh Network Anchors', 2, VERSION),
          createBodyText('Anchors create a wireless mesh network that relays data from the MODBUS Asset to the Gateway.', VERSION),
          createSpacer(100),

          createHeading('Function', 3, VERSION),
          createBullet('Receive data wirelessly from MODBUS Asset', VERSION),
          createBullet('Create self-healing mesh network topology', VERSION),
          createBullet('Relay data hop-by-hop to Gateway', VERSION),
          createBullet('Provide network redundancy through multiple paths', VERSION),
          createSpacer(100),

          createImagePlaceholder('Mesh Network Topology Diagram - showing MODBUS Asset → multiple Anchors → Gateway with multiple routing paths', VERSION),
          createSpacer(100),

          createCalloutBox('note', 'The mesh network is self-healing. If one Anchor fails, data automatically routes through alternative Anchors.', VERSION),
          createSpacer(100),

          createHeading('4.4 Gateway', 2, VERSION),
          createBodyText('The Gateway connects the local mesh network to the internet and cloud server.', VERSION),
          createSpacer(100),

          createHeading('Connectivity Options', 3, VERSION),
          createSpecTable(
            ['Option', 'Requirements', 'Use Case'],
            [
              ['Cellular (4G/LTE)', 'SIM card with data plan', 'Remote sites without infrastructure'],
              ['WiFi', 'Local WiFi network access', 'Sites with existing network'],
              ['Ethernet', 'Wired LAN connection', 'Fixed installations']
            ],
            VERSION
          ),

          new Paragraph({ children: [new PageBreak()] }),

          createHeading('4.5 Power System', 2, VERSION),
          createBodyText('The Weather Station uses solar power with battery backup for continuous, off-grid operation.', VERSION),
          createSpacer(100),

          createImagePlaceholder('Power System Diagram - Solar Panel → MPPT Controller → Battery → WS Box', VERSION),
          createSpacer(100),

          createHeading('Components', 3, VERSION),
          createBodyText('Solar Panel: Generates electricity from sunlight. Must be oriented for optimal sun exposure.', VERSION),
          createBodyText('MPPT Controller (Maximum Power Point Tracking): Regulates solar panel output, charges battery efficiently, and protects against overcharge/discharge.', VERSION),
          createBodyText('Battery: Stores energy for continuous operation during night or cloudy conditions. Nominal voltage 12V.', VERSION),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // =====================================================================
      // SECTION 5: INSTALLATION
      // =====================================================================
      {
        properties: {
          page: {
            size: { width: PAGE_A4.width, height: PAGE_A4.height },
            margin: PAGE_A4.margins
          }
        },
        headers: { default: createHeader('Weather Station', 'Product Manual') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('5. Installation', 1, VERSION),

          createSafetyPanel('warning', 'Installation must be performed by qualified personnel only. Follow all site-specific safety procedures. Ensure power is disconnected before making electrical connections.', VERSION),
          createSpacer(200),

          createHeading('5.1 Pre-Installation Requirements', 2, VERSION),
          createBullet('Verify all components are present (see §1.4 Package Contents)', VERSION),
          createBullet('Ensure site has clear view of sky for solar panel', VERSION),
          createBullet('Confirm at least one Mesh Anchor is within wireless range', VERSION),
          createBullet('Have appropriate mounting hardware for site conditions', VERSION),
          createSpacer(100),

          createHeading('5.2 Mounting the WS Box', 2, VERSION),
          createStep(1, 'Select a mounting location with clear exposure for sensors.', VERSION),
          createStep(2, 'Install the mounting bracket securely to the structure.', VERSION),
          createStep(3, 'Attach the WS Box to the mounting bracket.', VERSION),
          createStep(4, 'Verify the enclosure is level and secure.', VERSION),
          createSpacer(100),

          createHeading('5.3 Connecting Sensors', 2, VERSION),
          createStep(1, 'Connect Wind Speed sensor cable to Terminal T1.', VERSION),
          createStep(2, 'Connect Wind Direction sensor cable to Terminal T2.', VERSION),
          createStep(3, 'Connect Temperature sensor cable to Terminal T3.', VERSION),
          createStep(4, 'Connect Humidity sensor cable to Terminal T4.', VERSION),
          createStep(5, 'Connect Pressure sensor cable to Terminal T5.', VERSION),
          createStep(6, 'Connect Rainfall sensor cable to Terminal T6.', VERSION),
          createStep(7, 'Connect any additional gas sensors to supplementary terminals.', VERSION),
          createSpacer(100),

          createHeading('5.4 Connecting WS Box to MODBUS Asset', 2, VERSION),
          createSafetyPanel('caution', 'Ensure correct wire polarity. Terminal A must connect to Terminal A; Terminal B must connect to Terminal B. Incorrect wiring will cause communication failure.', VERSION),
          createSpacer(100),

          createStep(1, 'Route the RS485 cable from WS Box to MODBUS Asset location.', VERSION),
          createStep(2, 'Connect Wire A from WS Box Terminal A to MODBUS Asset Terminal A.', VERSION),
          createStep(3, 'Connect Wire B from WS Box Terminal B to MODBUS Asset Terminal B.', VERSION),
          createStep(4, 'Secure cable connections and route cables to prevent damage.', VERSION),
          createSpacer(100),

          createHeading('5.5 Connecting Power System', 2, VERSION),
          createStep(1, 'Mount the solar panel with clear sky exposure.', VERSION),
          createStep(2, 'Connect solar panel output to MPPT controller input.', VERSION),
          createStep(3, 'Connect MPPT controller output to battery terminals.', VERSION),
          createStep(4, 'Connect battery 12V output to WS Box barrel jack.', VERSION),
          createStep(5, 'Verify MPPT controller LED/display indicates charging.', VERSION),
          createSpacer(100),

          createHeading('5.6 Initial Power-Up', 2, VERSION),
          createStep(1, 'Apply power to the WS Box.', VERSION),
          createStep(2, 'Verify WS Box LCD display turns on and shows sensor readings.', VERSION),
          createStep(3, 'Verify MODBUS Asset LED blinks once per minute (normal operation).', VERSION),
          createStep(4, 'Use WakeCap Verify App to confirm data is reaching the Gateway.', VERSION),
          createStep(5, 'Log into Dashboard and verify sensor data appears.', VERSION),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // =====================================================================
      // SECTION 6: OPERATION
      // =====================================================================
      {
        properties: {
          page: {
            size: { width: PAGE_A4.width, height: PAGE_A4.height },
            margin: PAGE_A4.margins
          }
        },
        headers: { default: createHeader('Weather Station', 'Product Manual') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('6. Operation', 1, VERSION),

          createHeading('6.1 Normal Operation', 2, VERSION),
          createBodyText('During normal operation, the Weather Station continuously collects environmental data and transmits it to the cloud. No user intervention is required for routine data collection.', VERSION),
          createSpacer(100),

          createHeading('Data Flow Summary', 3, VERSION),
          createStep(1, 'Environmental sensors continuously measure conditions.', VERSION),
          createStep(2, 'WS Box aggregates sensor data and displays on LCD.', VERSION),
          createStep(3, 'MODBUS Asset converts and transmits data wirelessly.', VERSION),
          createStep(4, 'Mesh Anchors relay data to Gateway.', VERSION),
          createStep(5, 'Gateway transmits data to Cloud via HTTPS.', VERSION),
          createStep(6, 'Dashboard displays real-time and historical data.', VERSION),
          createSpacer(100),

          createHeading('6.2 Verification Indicators', 2, VERSION),
          createSpecTable(
            ['Component', 'Normal Indication', 'Issue Indication'],
            [
              ['WS Box LCD', 'ON, displaying sensor values', 'OFF or showing zeros'],
              ['MODBUS LED', '1 blink per minute', '2 blinks per minute'],
              ['MPPT Controller', 'Charging indicator active', 'Fault indicator']
            ],
            VERSION
          ),
          createSpacer(100),

          createHeading('6.3 Dashboard Access', 2, VERSION),
          createBodyText('Access the WakeCap Dashboard via web browser to view and manage Weather Station data.', VERSION),
          createSpacer(100),

          createHeading('Dashboard Features', 3, VERSION),
          createBullet('Real-time sensor data display with graphical visualization', VERSION),
          createBullet('Historical data graphs and trend analysis', VERSION),
          createBullet('Data export functionality (select date range)', VERSION),
          createBullet('Alert configuration for threshold monitoring', VERSION),
          createBullet('Site and user access management', VERSION),
          createSpacer(100),

          createHeading('6.4 Mobile Verification', 2, VERSION),
          createBodyText('Use the WakeCap Verify App to verify system status in the field.', VERSION),
          createSpacer(100),

          createHeading('App Capabilities', 3, VERSION),
          createBullet('View Anchor online/offline status', VERSION),
          createBullet('View Gateway online/offline status', VERSION),
          createBullet('Verify mesh network connectivity', VERSION),
          createBullet('Check device configurations via NFC', VERSION),
          createBullet('Troubleshoot connectivity issues', VERSION),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // =====================================================================
      // SECTION 7: MAINTENANCE
      // =====================================================================
      {
        properties: {
          page: {
            size: { width: PAGE_A4.width, height: PAGE_A4.height },
            margin: PAGE_A4.margins
          }
        },
        headers: { default: createHeader('Weather Station', 'Product Manual') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('7. Maintenance', 1, VERSION),

          createHeading('7.1 Maintenance Schedule', 2, VERSION),
          createSpecTable(
            ['Task', 'Frequency', 'Procedure Reference'],
            [
              ['Visual inspection of all sensors', 'Monthly', '§7.2'],
              ['Check cable connections', 'Monthly', '§7.2'],
              ['Clean rainfall sensor funnel', 'Monthly', '§7.3'],
              ['Verify dashboard data accuracy', 'Monthly', '§7.2'],
              ['Full system calibration', 'Annually', '§7.4'],
              ['Replace gas sensors', 'Annually (or as required)', '§7.5'],
              ['Firmware updates', 'Annually', '§7.6'],
              ['Complete system test', 'Annually', '§7.4']
            ],
            VERSION
          ),
          createSpacer(100),

          createHeading('7.2 Monthly Inspection Checklist', 2, VERSION),
          createBullet('Visually inspect all sensors for damage or obstruction', VERSION),
          createBullet('Check all cable connections for security and corrosion', VERSION),
          createBullet('Verify WS Box LCD displays correct readings', VERSION),
          createBullet('Confirm MODBUS Asset LED shows normal operation (1 blink/min)', VERSION),
          createBullet('Compare dashboard readings with portable reference instruments', VERSION),
          createBullet('Check battery voltage (should be 12V+)', VERSION),
          createBullet('Verify solar panel is clean and unobstructed', VERSION),
          createSpacer(100),

          createHeading('7.3 Sensor Cleaning', 2, VERSION),
          createBodyText('Clean sensors regularly to maintain accuracy.', VERSION),
          createSpacer(50),
          createBullet('Rainfall Sensor: Clear debris from funnel opening', VERSION),
          createBullet('Wind Sensors: Remove any obstructions from moving parts', VERSION),
          createBullet('Solar Panel: Wipe surface with soft, damp cloth', VERSION),
          createSpacer(100),

          createHeading('7.4 Calibration', 2, VERSION),
          createBodyText('Annual calibration ensures measurement accuracy.', VERSION),
          createSpacer(50),
          createBullet('Environmental sensors: Field calibration available using reference instruments', VERSION),
          createBullet('Gas sensors: Require certified calibration gas, minimum every 12 months', VERSION),
          createSpacer(100),

          createCalloutBox('important', 'Gas sensor calibration must be performed by qualified personnel using certified calibration gases. Contact WakeCap Support for calibration procedures.', VERSION),
          createSpacer(100),

          createHeading('7.5 Replacement Parts', 2, VERSION),
          createBodyText('Gas sensors are consumable items requiring periodic replacement.', VERSION),
          createSpacer(50),
          createBullet('H2S Sensor: Replace every 12–24 months or when readings drift', VERSION),
          createBullet('CO Sensor: Replace every 12–24 months or when readings drift', VERSION),
          createBullet('PM Sensors: Replace as recommended by manufacturer', VERSION),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // =====================================================================
      // SECTION 8: TROUBLESHOOTING
      // =====================================================================
      {
        properties: {
          page: {
            size: { width: PAGE_A4.width, height: PAGE_A4.height },
            margin: PAGE_A4.margins
          }
        },
        headers: { default: createHeader('Weather Station', 'Product Manual') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('8. Troubleshooting', 1, VERSION),

          createHeading('8.1 Common Issues', 2, VERSION),
          createSpecTable(
            ['Symptom', 'Possible Cause', 'Solution'],
            [
              ['WS Box display OFF', 'Power issue', 'Check battery voltage; verify power connections'],
              ['WS Box shows zeros', 'Sensor connection issue', 'Check sensor cables at terminals T1–T6'],
              ['MODBUS LED: 2 blinks/min', 'RS485 communication error', 'Verify A-A and B-B wiring; check cable integrity'],
              ['No data on Dashboard', 'Network connectivity issue', 'Check Gateway status; verify mesh network path'],
              ['Incorrect readings', 'Sensor fault or drift', 'Clean sensor; recalibrate; check for obstructions'],
              ['Battery not charging', 'Solar panel issue', 'Clean panel; check MPPT controller; verify connections']
            ],
            VERSION
          ),
          createSpacer(100),

          createHeading('8.2 LED Status Reference', 2, VERSION),
          createHeading('MODBUS Asset LED', 3, VERSION),
          createSpecTable(
            ['Pattern', 'Status', 'Action Required'],
            [
              ['1 blink/min', 'Normal', 'None - system operating correctly'],
              ['2 blinks/min', 'Communication Error', 'Check RS485 wiring between WS Box and MODBUS Asset']
            ],
            VERSION
          ),
          createSpacer(100),

          createHeading('8.3 Diagnostic Steps', 2, VERSION),
          createStep(1, 'Check physical indicators (WS Box display, MODBUS LED, MPPT display).', VERSION),
          createStep(2, 'Use WakeCap Verify App to check Anchor and Gateway status.', VERSION),
          createStep(3, 'Verify all cable connections are secure and correctly wired.', VERSION),
          createStep(4, 'Check Dashboard for last data timestamp to identify data gaps.', VERSION),
          createStep(5, 'If issue persists, contact WakeCap Support with diagnostic information.', VERSION),
          createSpacer(100),

          createHeading('8.4 When to Contact Support', 2, VERSION),
          createBodyText('Contact WakeCap Support if:', VERSION),
          createBullet('Issue persists after following troubleshooting steps', VERSION),
          createBullet('Hardware damage is observed', VERSION),
          createBullet('Firmware update is required', VERSION),
          createBullet('Gas sensor calibration is needed', VERSION),
          createSpacer(100),

          createCalloutBox('tip', 'When contacting Support, have the following information ready: Site name, Device serial numbers, Description of issue, Troubleshooting steps already performed.', VERSION),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // =====================================================================
      // SECTION 9: SAFETY INFORMATION
      // =====================================================================
      {
        properties: {
          page: {
            size: { width: PAGE_A4.width, height: PAGE_A4.height },
            margin: PAGE_A4.margins
          }
        },
        headers: { default: createHeader('Weather Station', 'Product Manual') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('9. Safety Information', 1, VERSION),

          createSafetyPanel('danger', 'Hazardous gas conditions may be present at sites with gas monitoring. Always check gas readings before entering the area. Follow site evacuation procedures if alarms trigger.', VERSION),
          createSpacer(200),

          createHeading('9.1 General Safety', 2, VERSION),
          createBullet('Read and understand all documentation before installation or maintenance', VERSION),
          createBullet('Follow all site-specific safety procedures and protocols', VERSION),
          createBullet('Use appropriate personal protective equipment (PPE)', VERSION),
          createBullet('Only qualified personnel should perform installation and maintenance', VERSION),
          createSpacer(100),

          createHeading('9.2 Electrical Safety', 2, VERSION),
          createSafetyPanel('warning', 'Always de-energize the system before performing maintenance on electrical connections. Verify voltage is zero before working on wiring.', VERSION),
          createSpacer(100),

          createBullet('De-energize system before performing electrical maintenance', VERSION),
          createBullet('Verify voltage before working on any connections', VERSION),
          createBullet('Use insulated tools when working with electrical components', VERSION),
          createBullet('Do not exceed rated voltage specifications', VERSION),
          createSpacer(100),

          createHeading('9.3 Environmental Hazards', 2, VERSION),
          createBodyText('At sites with gas monitoring capabilities, the Weather Station provides safety-critical data.', VERSION),
          createSpacer(50),
          createBullet('Always check gas sensor readings before entering monitored area', VERSION),
          createBullet('Follow site evacuation procedures if gas alarms are triggered', VERSION),
          createBullet('Use appropriate respiratory protection as required by readings', VERSION),
          createBullet('Do not disable or ignore gas monitoring alerts', VERSION),
          createSpacer(100),

          createHeading('9.4 PPE Requirements', 2, VERSION),
          createBodyText('Minimum PPE for installation and maintenance:', VERSION),
          createBullet('Safety glasses', VERSION),
          createBullet('Work gloves', VERSION),
          createBullet('Safety footwear', VERSION),
          createBullet('Hard hat (as required by site)', VERSION),
          createBullet('High-visibility vest (as required by site)', VERSION),
          createSpacer(100),

          createHeading('9.5 Emergency Contact', 2, VERSION),
          createBodyText('For emergencies involving hazardous conditions, follow site emergency procedures immediately.', VERSION),
          createSpacer(50),
          createBodyText('WakeCap Technical Support: [TBD]', VERSION),
          createBodyText('Email: support@wakecap.com', VERSION),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // =====================================================================
      // APPENDIX A: WIRING DIAGRAMS
      // =====================================================================
      {
        properties: {
          page: {
            size: { width: PAGE_A4.width, height: PAGE_A4.height },
            margin: PAGE_A4.margins
          }
        },
        headers: { default: createHeader('Weather Station', 'Product Manual') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('Appendix A: Wiring Diagrams', 1, VERSION),

          createHeading('A.1 Sensor to WS Box Connections', 2, VERSION),
          createImagePlaceholder('Wiring Diagram - Sensor connections to WS Box terminals T1–T6', VERSION),
          createSpacer(200),

          createHeading('A.2 RS485 Connection', 2, VERSION),
          createImagePlaceholder('Wiring Diagram - WS Box RS485 (A, B) to MODBUS Asset RS485 (A, B)', VERSION),
          createSpacer(100),

          createSafetyPanel('notice', 'Wire polarity is critical for RS485 communication. Terminal A on WS Box connects to Terminal A on MODBUS Asset. Terminal B connects to Terminal B. Use shielded twisted pair cable for best results.', VERSION),
          createSpacer(200),

          createHeading('A.3 Power System Connections', 2, VERSION),
          createImagePlaceholder('Wiring Diagram - Solar Panel → MPPT Controller → Battery → WS Box power chain', VERSION),
          createSpacer(200),

          createHeading('A.4 Complete System Overview', 2, VERSION),
          createImagePlaceholder('Complete System Wiring Overview - All components with connection types labeled', VERSION)
        ]
      },

      // =====================================================================
      // BACK COVER
      // =====================================================================
      {
        properties: {
          page: {
            size: { width: PAGE_A4.width, height: PAGE_A4.height },
            margin: PAGE_A4.margins
          }
        },
        children: [
          new Paragraph({ children: [new PageBreak()] }),
          createSpacer(2000),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: '[WakeCap Logo]',
                size: 32,
                font: 'Source Sans Pro',
                color: COLORS.wakecapBlue,
                bold: true
              })
            ]
          }),
          createSpacer(400),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'WakeCap Technologies',
                size: 24,
                font: 'Source Sans Pro',
                color: COLORS.charcoal,
                bold: true
              })
            ]
          }),
          createSpacer(200),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: '[Company Address]',
                size: 20,
                font: 'Source Sans Pro',
                color: COLORS.slate
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'www.wakecap.com',
                size: 20,
                font: 'Source Sans Pro',
                color: COLORS.wakecapBlue
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'support@wakecap.com',
                size: 20,
                font: 'Source Sans Pro',
                color: COLORS.wakecapBlue
              })
            ]
          }),
          createSpacer(600),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: '© 2026 WakeCap Technologies',
                size: 18,
                font: 'Source Sans Pro',
                color: COLORS.slate
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'All rights reserved.',
                size: 18,
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
  const outputPath = './output/WC-WS-PM-v1.0.docx';
  fs.writeFileSync(outputPath, buffer);
  console.log(`✓ Generated: ${outputPath}`);
}

generateManual().catch(console.error);

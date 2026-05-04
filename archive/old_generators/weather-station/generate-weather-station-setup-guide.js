/**
 * WakeCap Weather Station Setup Guide Generator
 * Generates WC-WS-SG-v1.0.docx
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
  AlignmentType,
  PageBreak
} = require('../../templates/docx-generator.js');

const fs = require('fs');

const VERSION = 'A';
const DOC_ID = 'WC-WS-SG-v1.0';
const REVISION_DATE = '2026-02-04';

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

function createCheckbox(text, version = 'A') {
  const sizes = version === 'A' ? FONT_SIZES.versionA : FONT_SIZES.versionB;
  return new Paragraph({
    spacing: { after: 80 },
    children: [
      new TextRun({
        text: '☐ ',
        size: sizes.body,
        font: 'Source Sans Pro',
        color: COLORS.charcoal
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

function createStep(number, action, detail = null, verification = null, version = 'A') {
  const sizes = version === 'A' ? FONT_SIZES.versionA : FONT_SIZES.versionB;
  const children = [
    new TextRun({
      text: `${number}  `,
      bold: true,
      size: sizes.body + 4,
      font: 'Source Sans Pro',
      color: COLORS.wakecapBlue
    }),
    new TextRun({
      text: action,
      bold: true,
      size: sizes.body,
      font: 'Source Sans Pro',
      color: COLORS.charcoal
    })
  ];

  const paragraphs = [new Paragraph({ spacing: { after: detail || verification ? 40 : 120 }, children })];

  if (detail) {
    paragraphs.push(new Paragraph({
      spacing: { after: verification ? 40 : 120 },
      indent: { left: 400 },
      children: [
        new TextRun({
          text: detail,
          size: sizes.body,
          font: 'Source Sans Pro',
          color: COLORS.charcoal
        })
      ]
    }));
  }

  if (verification) {
    paragraphs.push(new Paragraph({
      spacing: { after: 120 },
      indent: { left: 400 },
      children: [
        new TextRun({
          text: '✓ Verification: ',
          bold: true,
          size: sizes.body,
          font: 'Source Sans Pro',
          color: '#22C55E'
        }),
        new TextRun({
          text: verification,
          size: sizes.body,
          font: 'Source Sans Pro',
          color: COLORS.charcoal
        })
      ]
    }));
  }

  return paragraphs;
}

function createSpacer(height = 200) {
  return new Paragraph({ spacing: { after: height }, children: [] });
}

async function generateSetupGuide() {
  const doc = new Document({
    styles: getDocumentStyles(VERSION),
    sections: [
      // COVER PAGE
      {
        properties: {
          page: { size: { width: PAGE_A4.width, height: PAGE_A4.height }, margin: PAGE_A4.margins }
        },
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: '[WakeCap Logo]', size: 20, font: 'Source Sans Pro', color: COLORS.slate, italics: true })
            ]
          }),
          createSpacer(300),
          createHeading('SETUP GUIDE', 2, VERSION),
          createSpacer(100),
          createHeading('WakeCap Weather Station', 1, VERSION),
          createBodyText('Installation & Configuration', VERSION),
          createSpacer(200),
          createImagePlaceholder('Weather Station being installed on site - field technician mounting equipment', VERSION),
          createSpacer(300),
          new Paragraph({
            children: [
              new TextRun({ text: `Document: ${DOC_ID}`, size: 18, font: 'Source Sans Pro', color: COLORS.slate })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Revision: 1.0\t\tDate: ${REVISION_DATE}`, size: 18, font: 'Source Sans Pro', color: COLORS.slate })
            ]
          }),
          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // SECTION 1: BEFORE YOU BEGIN
      {
        properties: {
          page: { size: { width: PAGE_A4.width, height: PAGE_A4.height }, margin: PAGE_A4.margins }
        },
        headers: { default: createHeader('Weather Station', 'Setup Guide') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('1. Before You Begin', 1, VERSION),

          createHeading('1.1 Package Contents', 2, VERSION),
          createBodyText('Verify all items are present before starting installation.', VERSION),
          createSpacer(100),
          createSpecTable(
            ['Item', 'Qty', 'Check'],
            [
              ['WS Box (Weather Station Box)', '1', '☐'],
              ['MODBUS Asset', '1', '☐'],
              ['Solar Panel (50W)', '1', '☐'],
              ['MPPT Controller', '1', '☐'],
              ['Battery (12V)', '1', '☐'],
              ['Mounting Hardware Kit', '1', '☐'],
              ['RS485 Cable (shielded twisted pair)', '1', '☐'],
              ['Power cables', '1 set', '☐'],
              ['This Setup Guide', '1', '☐']
            ],
            VERSION
          ),
          createSpacer(100),
          createSafetyPanel('notice', 'If any items are missing or damaged, contact WakeCap Support before proceeding with installation. Do not attempt installation with incomplete components.', VERSION),
          createSpacer(200),

          createHeading('1.2 Required Tools', 2, VERSION),
          createBodyText('The following tools are required (not included):', VERSION),
          createBullet('Phillips screwdriver (#2)', VERSION),
          createBullet('Flat-head screwdriver', VERSION),
          createBullet('Wire strippers', VERSION),
          createBullet('Multimeter (DC voltage measurement)', VERSION),
          createBullet('Drill with appropriate bits (for mounting)', VERSION),
          createBullet('Level', VERSION),
          createBullet('Adjustable wrench', VERSION),
          createSpacer(100),

          createHeading('1.3 Required Qualifications', 2, VERSION),
          createBodyText('This installation must be performed by personnel with:', VERSION),
          createBullet('Familiarity with low-voltage DC electrical systems', VERSION),
          createBullet('Understanding of RS485/MODBUS communication', VERSION),
          createBullet('Site-specific safety training', VERSION),
          createSpacer(100),

          createHeading('1.4 Safety Precautions', 2, VERSION),
          createSafetyPanel('warning', 'Installation involves working with electrical systems. Always de-energize the system before making connections. Use appropriate PPE including safety glasses and work gloves. Follow all site-specific safety procedures.', VERSION),
          createSpacer(100),

          createHeading('1.5 Site Requirements', 2, VERSION),
          createBodyText('Before installation, ensure:', VERSION),
          createBullet('Clear sky exposure for solar panel (no obstructions)', VERSION),
          createBullet('Mounting surface is structurally sound', VERSION),
          createBullet('At least one Mesh Anchor is within wireless range', VERSION),
          createBullet('Gateway is installed and online', VERSION),
          createBullet('Environmental sensors are available (ordered separately)', VERSION),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // SECTION 2: INSTALLATION OVERVIEW
      {
        properties: {
          page: { size: { width: PAGE_A4.width, height: PAGE_A4.height }, margin: PAGE_A4.margins }
        },
        headers: { default: createHeader('Weather Station', 'Setup Guide') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('2. Installation Overview', 1, VERSION),

          createHeading('2.1 Installation Summary', 2, VERSION),
          createBodyText('The Weather Station installation consists of mounting the hardware, connecting sensors and communication cables, setting up the solar power system, and verifying data transmission to the cloud.', VERSION),
          createSpacer(100),

          createHeading('2.2 Installation Steps', 2, VERSION),
          createSpecTable(
            ['Step', 'Description', 'Est. Time'],
            [
              ['1', 'Mount the WS Box', '15 min'],
              ['2', 'Connect environmental sensors', '20 min'],
              ['3', 'Install and connect MODBUS Asset', '10 min'],
              ['4', 'Connect RS485 communication', '10 min'],
              ['5', 'Install solar power system', '20 min'],
              ['6', 'System verification', '15 min']
            ],
            VERSION
          ),
          createSpacer(50),
          createBodyText('Total estimated time: 90 minutes', VERSION),
          createSpacer(100),

          createHeading('2.3 System Diagram', 2, VERSION),
          createImagePlaceholder('System Overview Diagram - showing all components: Sensors → WS Box → MODBUS Asset (wireless) → Anchors → Gateway, plus Solar Panel → MPPT → Battery → WS Box power', VERSION),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // SECTION 3: MOUNTING THE WS BOX
      {
        properties: {
          page: { size: { width: PAGE_A4.width, height: PAGE_A4.height }, margin: PAGE_A4.margins }
        },
        headers: { default: createHeader('Weather Station', 'Setup Guide') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('3. Mounting the WS Box', 1, VERSION),
          createBodyText('Time required: 15 minutes', VERSION),
          createSpacer(100),

          createImagePlaceholder('Step 3.1 - Selecting mounting location with clear exposure for sensors', VERSION),
          ...createStep('①', 'Select a mounting location with clear exposure for sensors.',
            'Ensure adequate clearance for wind and rain sensors. Avoid proximity to exhaust vents or HVAC equipment.',
            'Location provides unobstructed airflow and precipitation measurement', VERSION),
          createSpacer(50),

          createImagePlaceholder('Step 3.2 - Installing mounting bracket with level', VERSION),
          ...createStep('②', 'Install the mounting bracket securely to the structure.',
            'Use appropriate fasteners for the mounting surface. Ensure bracket is level.',
            'Bracket is secure and level (verify with level tool)', VERSION),
          createSpacer(50),

          createImagePlaceholder('Step 3.3 - Attaching WS Box to bracket', VERSION),
          ...createStep('③', 'Attach the WS Box to the mounting bracket.',
            'Secure using the provided hardware. Do not overtighten.',
            'WS Box is firmly attached and does not move', VERSION),
          createSpacer(50),

          createImagePlaceholder('Step 3.4 - Routing cable entry points', VERSION),
          ...createStep('④', 'Prepare cable entry points.',
            'Install cable glands in the appropriate knockouts for sensor and power cables.',
            'Cable glands installed and finger-tight', VERSION),
          createSpacer(100),

          createCalloutBox('tip', 'Route cables with a drip loop below the enclosure entry point to prevent water ingress.', VERSION),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // SECTION 4: CONNECTING SENSORS
      {
        properties: {
          page: { size: { width: PAGE_A4.width, height: PAGE_A4.height }, margin: PAGE_A4.margins }
        },
        headers: { default: createHeader('Weather Station', 'Setup Guide') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('4. Connecting Environmental Sensors', 1, VERSION),
          createBodyText('Time required: 20 minutes', VERSION),
          createSpacer(100),

          createHeading('4.1 Sensor Terminal Assignments', 2, VERSION),
          createSpecTable(
            ['Terminal', 'Sensor', 'Wire Colors'],
            [
              ['T1', 'Wind Speed', '[Per sensor documentation]'],
              ['T2', 'Wind Direction', '[Per sensor documentation]'],
              ['T3', 'Temperature', '[Per sensor documentation]'],
              ['T4', 'Humidity', '[Per sensor documentation]'],
              ['T5', 'Atmospheric Pressure', '[Per sensor documentation]'],
              ['T6', 'Rainfall', '[Per sensor documentation]']
            ],
            VERSION
          ),
          createSpacer(100),

          createImagePlaceholder('Step 4.1 - Close-up of WS Box sensor terminals T1-T6', VERSION),
          ...createStep('①', 'Route sensor cables through cable glands into the WS Box.',
            'Maintain proper cable management to prevent strain on connections.', null, VERSION),
          createSpacer(50),

          ...createStep('②', 'Connect Wind Speed sensor to Terminal T1.',
            'Follow sensor documentation for wire polarity.',
            'Wires securely inserted and screw terminals tightened', VERSION),
          createSpacer(50),

          ...createStep('③', 'Connect Wind Direction sensor to Terminal T2.', null,
            'Wires securely connected', VERSION),
          createSpacer(50),

          ...createStep('④', 'Connect Temperature sensor to Terminal T3.', null,
            'Wires securely connected', VERSION),
          createSpacer(50),

          ...createStep('⑤', 'Connect Humidity sensor to Terminal T4.', null,
            'Wires securely connected', VERSION),
          createSpacer(50),

          ...createStep('⑥', 'Connect Pressure sensor to Terminal T5.', null,
            'Wires securely connected', VERSION),
          createSpacer(50),

          ...createStep('⑦', 'Connect Rainfall sensor to Terminal T6.', null,
            'Wires securely connected', VERSION),
          createSpacer(50),

          ...createStep('⑧', 'Tighten cable glands to seal enclosure.',
            'Ensure weatherproof seal while allowing cable movement.',
            'Cable glands secure; cables do not pull out', VERSION),
          createSpacer(100),

          createCalloutBox('note', 'Gas sensors (H2S, CO, PM2.5, PM10) connect to additional terminals. Refer to site-specific configuration documentation.', VERSION),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // SECTION 5: CONNECTING MODBUS ASSET
      {
        properties: {
          page: { size: { width: PAGE_A4.width, height: PAGE_A4.height }, margin: PAGE_A4.margins }
        },
        headers: { default: createHeader('Weather Station', 'Setup Guide') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('5. Installing MODBUS Asset', 1, VERSION),
          createBodyText('Time required: 10 minutes', VERSION),
          createSpacer(100),

          createImagePlaceholder('Step 5.1 - MODBUS Asset mounting location near WS Box', VERSION),
          ...createStep('①', 'Select mounting location for MODBUS Asset.',
            'Mount within cable reach of WS Box. Ensure LED is visible for status monitoring.',
            'Location allows RS485 cable connection and LED visibility', VERSION),
          createSpacer(50),

          ...createStep('②', 'Mount the MODBUS Asset using provided hardware.',
            'Ensure secure attachment to prevent vibration damage.',
            'Unit is firmly mounted', VERSION),
          createSpacer(100),

          createHeading('5.1 RS485 Connection', 2, VERSION),
          createSafetyPanel('caution', 'Correct wire polarity is critical. Terminal A on WS Box must connect to Terminal A on MODBUS Asset. Terminal B must connect to Terminal B. Reversed wiring causes communication failure.', VERSION),
          createSpacer(100),

          createImagePlaceholder('Step 5.2 - RS485 wiring diagram showing A-A and B-B connections', VERSION),
          ...createStep('③', 'Connect RS485 cable Wire A from WS Box Terminal A to MODBUS Asset Terminal A.', null,
            'Wire A connected at both ends', VERSION),
          createSpacer(50),

          ...createStep('④', 'Connect RS485 cable Wire B from WS Box Terminal B to MODBUS Asset Terminal B.', null,
            'Wire B connected at both ends', VERSION),
          createSpacer(50),

          ...createStep('⑤', 'Connect shield wire to ground terminal (if available).',
            'Proper shielding reduces electrical interference.',
            'Shield grounded at one end only', VERSION),
          createSpacer(100),

          createHeading('5.2 MODBUS Asset Power', 2, VERSION),
          ...createStep('⑥', 'Connect power to MODBUS Asset.',
            'Connect power terminals according to MODBUS Asset documentation.',
            'Power terminals connected with correct polarity', VERSION),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // SECTION 6: SOLAR POWER SYSTEM
      {
        properties: {
          page: { size: { width: PAGE_A4.width, height: PAGE_A4.height }, margin: PAGE_A4.margins }
        },
        headers: { default: createHeader('Weather Station', 'Setup Guide') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('6. Installing Solar Power System', 1, VERSION),
          createBodyText('Time required: 20 minutes', VERSION),
          createSpacer(100),

          createSafetyPanel('warning', 'Solar panels generate voltage when exposed to light. Cover the panel during installation or work in low-light conditions to prevent shock hazard.', VERSION),
          createSpacer(100),

          createImagePlaceholder('Step 6.1 - Solar panel mounting with optimal sun orientation', VERSION),
          ...createStep('①', 'Mount the solar panel with clear sky exposure.',
            'Orient panel toward the equator (south in northern hemisphere, north in southern). Tilt angle should match site latitude.',
            'Panel securely mounted with optimal sun exposure', VERSION),
          createSpacer(50),

          createImagePlaceholder('Step 6.2 - MPPT controller connections', VERSION),
          ...createStep('②', 'Connect solar panel output cables to MPPT controller input.',
            'Observe correct polarity (+ to +, - to -).',
            'Solar input connected; MPPT may show charging indicator if panel is exposed to light', VERSION),
          createSpacer(50),

          ...createStep('③', 'Connect battery to MPPT controller battery terminals.',
            'Connect positive (+) first, then negative (-).',
            'Battery connected; MPPT shows battery status', VERSION),
          createSpacer(50),

          ...createStep('④', 'Connect MPPT controller 12V output to WS Box power input.',
            'Use the barrel jack connector for WS Box.',
            '12V DC connected to WS Box', VERSION),
          createSpacer(100),

          createCalloutBox('important', 'Ensure battery is fully charged before initial operation. Allow 24-48 hours of solar charging for optimal battery conditioning.', VERSION),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // SECTION 7: SYSTEM VERIFICATION
      {
        properties: {
          page: { size: { width: PAGE_A4.width, height: PAGE_A4.height }, margin: PAGE_A4.margins }
        },
        headers: { default: createHeader('Weather Station', 'Setup Guide') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('7. System Verification', 1, VERSION),
          createBodyText('Time required: 15 minutes', VERSION),
          createSpacer(100),

          createHeading('7.1 Pre-Power Checklist', 2, VERSION),
          createBodyText('Before applying power, verify:', VERSION),
          createCheckbox('All sensor cables are securely connected to correct terminals', VERSION),
          createCheckbox('RS485 wiring is correct (A-A, B-B)', VERSION),
          createCheckbox('No exposed wires or damaged insulation', VERSION),
          createCheckbox('Cable glands are properly tightened', VERSION),
          createCheckbox('Solar panel is mounted and connected', VERSION),
          createCheckbox('Battery is connected to MPPT controller', VERSION),
          createCheckbox('MPPT output is connected to WS Box', VERSION),
          createSpacer(100),

          createHeading('7.2 Initial Power-Up', 2, VERSION),
          ...createStep('①', 'Apply power to the system by connecting the MPPT output to WS Box.',
            'The WS Box should begin initialization.',
            'WS Box LCD display turns ON', VERSION),
          createSpacer(50),

          ...createStep('②', 'Wait 60 seconds for system initialization.',
            'The WS Box will initialize sensors and communication.',
            'LCD displays sensor values (not all zeros)', VERSION),
          createSpacer(50),

          ...createStep('③', 'Observe MODBUS Asset LED.',
            'Count blinks over 60 seconds.',
            'LED blinks once per minute (normal operation)', VERSION),
          createSpacer(100),

          createHeading('7.3 Functional Verification', 2, VERSION),
          createSpecTable(
            ['Check', 'Expected Result', '✓'],
            [
              ['WS Box LCD', 'Shows sensor readings (not zero)', '☐'],
              ['MODBUS LED', '1 blink per minute', '☐'],
              ['MPPT display', 'Shows charging status', '☐'],
              ['Battery voltage', '12V or higher', '☐']
            ],
            VERSION
          ),
          createSpacer(100),

          createHeading('7.4 Dashboard Verification', 2, VERSION),
          ...createStep('①', 'Open WakeCap Dashboard in web browser.', null, null, VERSION),
          ...createStep('②', 'Navigate to the site/location for this Weather Station.', null, null, VERSION),
          ...createStep('③', 'Verify the Weather Station device appears online.', null,
            'Device status shows "Online"', VERSION),
          ...createStep('④', 'Confirm sensor data is updating.', null,
            'Live data visible within 5 minutes of power-up', VERSION),
          createSpacer(100),

          createCalloutBox('tip', 'Use the WakeCap Verify App to check mesh network connectivity and device status from the field.', VERSION),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // SECTION 8: TROUBLESHOOTING
      {
        properties: {
          page: { size: { width: PAGE_A4.width, height: PAGE_A4.height }, margin: PAGE_A4.margins }
        },
        headers: { default: createHeader('Weather Station', 'Setup Guide') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('8. Troubleshooting', 1, VERSION),
          createBodyText('If you encounter issues during setup, refer to this quick guide:', VERSION),
          createSpacer(100),

          createSpecTable(
            ['Symptom', 'Likely Cause', 'Solution'],
            [
              ['No LED activity', 'No power', 'Check battery voltage (>12V); verify power connections'],
              ['WS Box LCD off', 'Power not reaching unit', 'Check MPPT output; verify barrel jack connection'],
              ['LCD shows zeros', 'Sensor disconnected', 'Check sensor cables at terminals T1-T6'],
              ['MODBUS LED: 2 blinks/min', 'RS485 communication error', 'Verify A-A and B-B wiring; check cable integrity'],
              ['Not visible on Dashboard', 'Network issue', 'Verify Gateway online; check mesh network path'],
              ['Battery not charging', 'Solar panel issue', 'Clean panel; check MPPT connections; verify orientation']
            ],
            VERSION
          ),
          createSpacer(100),

          createBodyText('For additional troubleshooting, see the full Troubleshooting Guide (Document: WC-WS-TG-v1.0)', VERSION),
          createSpacer(200),

          createHeading('9. What\'s Next', 1, VERSION),
          createBodyText('Installation is complete. To get the most from your Weather Station:', VERSION),
          createSpacer(100),

          createBodyText('1. Review the Product Manual (WC-WS-PM-v1.0) for:', VERSION),
          createBullet('Detailed specifications', VERSION),
          createBullet('Maintenance schedules', VERSION),
          createBullet('Advanced configuration options', VERSION),
          createSpacer(50),

          createBodyText('2. Download the WakeCap Verify App to:', VERSION),
          createBullet('Monitor system status in the field', VERSION),
          createBullet('Verify mesh network connectivity', VERSION),
          createBullet('Access device configurations', VERSION),
          createSpacer(50),

          createBodyText('3. Bookmark the WakeCap Dashboard for data access.', VERSION),
          createSpacer(200),

          createHeading('Support Contact', 2, VERSION),
          createBodyText('Email: support@wakecap.com', VERSION),
          createBodyText('Phone: [TBD]', VERSION),
          createBodyText('Documentation: docs.wakecap.com', VERSION),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // QUICK REFERENCE BACK PAGE
      {
        properties: {
          page: { size: { width: PAGE_A4.width, height: PAGE_A4.height }, margin: PAGE_A4.margins }
        },
        headers: { default: createHeader('Weather Station', 'Setup Guide') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('Quick Reference', 1, VERSION),
          createSpacer(100),

          createHeading('LED Status', 2, VERSION),
          createBodyText('● 1 blink/min = Normal operation', VERSION),
          createBodyText('● 2 blinks/min = Communication error (check RS485)', VERSION),
          createBodyText('○ No blinks = Check power supply', VERSION),
          createSpacer(100),

          createHeading('Power Requirements', 2, VERSION),
          createBodyText('• Input Voltage: 12V DC', VERSION),
          createBodyText('• Source: Solar panel + battery via MPPT controller', VERSION),
          createSpacer(100),

          createHeading('Terminal Reference', 2, VERSION),
          createImagePlaceholder('Simplified terminal diagram showing T1-T6 sensor terminals, RS485 A/B terminals, and 12V power input', VERSION),
          createSpacer(100),

          createHeading('Wiring Quick Reference', 2, VERSION),
          createBodyText('RS485 Connection:', VERSION),
          createBodyText('WS Box A ────── MODBUS Asset A', VERSION),
          createBodyText('WS Box B ────── MODBUS Asset B', VERSION),
          createSpacer(200),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: '© 2026 WakeCap Technologies | support@wakecap.com | www.wakecap.com', size: 18, font: 'Source Sans Pro', color: COLORS.slate })
            ]
          })
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync('./output/WC-WS-SG-v1.0.docx', buffer);
  console.log('✓ Generated: ./output/WC-WS-SG-v1.0.docx');
}

generateSetupGuide().catch(console.error);

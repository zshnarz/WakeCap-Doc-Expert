/**
 * WakeCap Weather Station Troubleshooting Guide Generator
 * Generates WC-WS-TG-v1.0.docx
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
  BorderStyle,
  WidthType,
  ShadingType,
  PageBreak
} = require('../../templates/docx-generator.js');

const fs = require('fs');

const VERSION = 'A';
const DOC_ID = 'WC-WS-TG-v1.0';
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
      new TextRun({ text: '☐ ', size: sizes.body, font: 'Source Sans Pro', color: COLORS.charcoal }),
      new TextRun({ text: text, size: sizes.body, font: 'Source Sans Pro', color: COLORS.charcoal })
    ]
  });
}

function createStep(number, action, expected = null, version = 'A') {
  const sizes = version === 'A' ? FONT_SIZES.versionA : FONT_SIZES.versionB;
  const paragraphs = [
    new Paragraph({
      spacing: { after: expected ? 40 : 100 },
      children: [
        new TextRun({ text: `${number} `, bold: true, size: sizes.body, font: 'Source Sans Pro', color: COLORS.wakecapBlue }),
        new TextRun({ text: action, size: sizes.body, font: 'Source Sans Pro', color: COLORS.charcoal })
      ]
    })
  ];

  if (expected) {
    paragraphs.push(new Paragraph({
      spacing: { after: 100 },
      indent: { left: 300 },
      children: [
        new TextRun({ text: '✓ Expected: ', bold: true, size: sizes.body, font: 'Source Sans Pro', color: '#22C55E' }),
        new TextRun({ text: expected, size: sizes.body, font: 'Source Sans Pro', color: COLORS.charcoal })
      ]
    }));
  }
  return paragraphs;
}

function createSpacer(height = 200) {
  return new Paragraph({ spacing: { after: height }, children: [] });
}

function createSymptomHeader(section, title, version = 'A') {
  const sizes = version === 'A' ? FONT_SIZES.versionA : FONT_SIZES.versionB;
  return new Paragraph({
    spacing: { before: 200, after: 120 },
    shading: { fill: COLORS.lightGray, type: ShadingType.CLEAR },
    children: [
      new TextRun({ text: `${section} ${title}`, bold: true, size: sizes.h3, font: 'Source Sans Pro', color: COLORS.charcoal })
    ]
  });
}

async function generateTroubleshootingGuide() {
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
          createSpacer(400),
          createHeading('TROUBLESHOOTING GUIDE', 2, VERSION),
          createSpacer(100),
          createHeading('WakeCap Weather Station', 1, VERSION),
          createBodyText('Diagnostic & Resolution Procedures', VERSION),
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
          createSpacer(300),
          createImagePlaceholder('Weather Station diagnostic setup - technician using multimeter and mobile app', VERSION),
          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // SECTION 1: BEFORE YOU BEGIN
      {
        properties: {
          page: { size: { width: PAGE_A4.width, height: PAGE_A4.height }, margin: PAGE_A4.margins }
        },
        headers: { default: createHeader('Weather Station', 'Troubleshooting Guide') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('1. Before You Begin', 1, VERSION),

          createHeading('1.1 Required Tools', 2, VERSION),
          createBullet('Multimeter (DC voltage measurement)', VERSION),
          createBullet('WakeCap Verify App (installed on mobile device)', VERSION),
          createBullet('Access to WakeCap Dashboard', VERSION),
          createBullet('Screwdriver set (Phillips and flat-head)', VERSION),
          createBullet('RS485 cable (spare, for testing)', VERSION),
          createSpacer(100),

          createHeading('1.2 Safety Precautions', 2, VERSION),
          createSafetyPanel('warning', 'Always de-energize the system before inspecting electrical connections. Verify zero voltage before touching terminals. Follow all site-specific safety procedures.', VERSION),
          createSpacer(100),

          createHeading('1.3 How to Use This Guide', 2, VERSION),
          createBodyText('This guide is organized by SYMPTOM. Follow these steps:', VERSION),
          createBullet('Go to Section 2 (Symptom Index) to find your symptom', VERSION),
          createBullet('Navigate to the referenced section for diagnostic procedures', VERSION),
          createBullet('Follow the diagnostic steps in order', VERSION),
          createBullet('If unresolved, contact WakeCap Support with diagnostic results', VERSION),
          createSpacer(100),

          createCalloutBox('note', 'When contacting support, have ready: Device serial number, symptom description, diagnostic results from this guide, and photos of the installation.', VERSION),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // SECTION 2: SYMPTOM INDEX
      {
        properties: {
          page: { size: { width: PAGE_A4.width, height: PAGE_A4.height }, margin: PAGE_A4.margins }
        },
        headers: { default: createHeader('Weather Station', 'Troubleshooting Guide') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('2. Symptom Index', 1, VERSION),
          createBodyText('Find your symptom below, then go to the referenced section.', VERSION),
          createSpacer(100),

          createHeading('POWER ISSUES', 2, VERSION),
          createSpecTable(
            ['Symptom', 'Section'],
            [
              ['No LED activity on any device', '§3.1'],
              ['WS Box LCD display is off', '§3.2'],
              ['Intermittent power loss', '§3.3'],
              ['Battery not charging', '§3.4']
            ],
            VERSION
          ),
          createSpacer(100),

          createHeading('COMMUNICATION ISSUES', 2, VERSION),
          createSpecTable(
            ['Symptom', 'Section'],
            [
              ['MODBUS Asset shows 2 blinks/min', '§4.1'],
              ['Device not appearing on Dashboard', '§4.2'],
              ['Data updates intermittently', '§4.3'],
              ['Mesh network connectivity issues', '§4.4']
            ],
            VERSION
          ),
          createSpacer(100),

          createHeading('DATA ISSUES', 2, VERSION),
          createSpecTable(
            ['Symptom', 'Section'],
            [
              ['WS Box display shows all zeros', '§5.1'],
              ['Sensor reading out of range', '§5.2'],
              ['Readings don\'t match actual conditions', '§5.3'],
              ['Historical data missing', '§5.4']
            ],
            VERSION
          ),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // SECTION 3: POWER ISSUES
      {
        properties: {
          page: { size: { width: PAGE_A4.width, height: PAGE_A4.height }, margin: PAGE_A4.margins }
        },
        headers: { default: createHeader('Weather Station', 'Troubleshooting Guide') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('3. Power Issues', 1, VERSION),

          createSymptomHeader('§3.1', 'No LED Activity on Any Device', VERSION),
          createBodyText('SYMPTOM: No LEDs are illuminated on WS Box, MODBUS Asset, or MPPT controller.', VERSION),
          createSpacer(50),
          createBodyText('POSSIBLE CAUSES:', VERSION),
          createBullet('1. Battery discharged or disconnected', VERSION),
          createBullet('2. Solar panel not generating power', VERSION),
          createBullet('3. MPPT controller fault', VERSION),
          createBullet('4. Wiring disconnection', VERSION),
          createSpacer(100),

          createBodyText('DIAGNOSTIC STEPS:', VERSION),
          ...createStep('①', 'Measure battery voltage with multimeter.', 'Should read 12V or higher', VERSION),
          ...createStep('②', 'If battery <12V, check solar panel output voltage.', 'Should read 18-22V in daylight', VERSION),
          ...createStep('③', 'Verify connections from solar panel to MPPT controller.', 'Secure connections, no corrosion', VERSION),
          ...createStep('④', 'Verify connections from MPPT to battery.', 'Correct polarity, secure connections', VERSION),
          ...createStep('⑤', 'Check MPPT controller for fault indicators.', 'No fault LEDs illuminated', VERSION),
          createSpacer(50),
          createBodyText('If battery is charged but no power: Check fuses (if equipped) and wiring continuity.', VERSION),
          createSpacer(100),

          createSymptomHeader('§3.2', 'WS Box LCD Display is Off', VERSION),
          createBodyText('SYMPTOM: WS Box LCD display is blank/off, but other components may have power.', VERSION),
          createSpacer(50),
          createBodyText('DIAGNOSTIC STEPS:', VERSION),
          ...createStep('①', 'Verify power cable is connected to WS Box barrel jack.', 'Secure connection', VERSION),
          ...createStep('②', 'Measure voltage at WS Box power input.', 'Should read 12V DC', VERSION),
          ...createStep('③', 'Check MPPT controller 12V output.', 'Should read 12V DC', VERSION),
          ...createStep('④', 'Try different power cable if available.', 'Display turns on', VERSION),
          createSpacer(50),
          createBodyText('If voltage present but display off → WS Box may have internal fault. Contact Support.', VERSION),
          createSpacer(100),

          createSymptomHeader('§3.3', 'Intermittent Power Loss', VERSION),
          createBodyText('SYMPTOM: System powers on and off randomly.', VERSION),
          createSpacer(50),
          createBodyText('DIAGNOSTIC STEPS:', VERSION),
          ...createStep('①', 'Check battery voltage over time.', 'Should maintain 12V+', VERSION),
          ...createStep('②', 'Verify solar panel is unobstructed.', 'Clear sky exposure', VERSION),
          ...createStep('③', 'Check all power connections for looseness.', 'All terminals tight', VERSION),
          ...createStep('④', 'Inspect cables for damage.', 'No cuts, breaks, or corrosion', VERSION),
          createSpacer(50),
          createBodyText('Intermittent issues often caused by loose connections or undersized battery. Consider battery replacement if >2 years old.', VERSION),
          createSpacer(100),

          createSymptomHeader('§3.4', 'Battery Not Charging', VERSION),
          createBodyText('SYMPTOM: Battery voltage not increasing despite sunlight.', VERSION),
          createSpacer(50),
          createBodyText('DIAGNOSTIC STEPS:', VERSION),
          ...createStep('①', 'Verify solar panel orientation.', 'Facing equator, appropriate tilt', VERSION),
          ...createStep('②', 'Clean solar panel surface.', 'No dirt, debris, or obstructions', VERSION),
          ...createStep('③', 'Measure solar panel open-circuit voltage.', 'Should read 18-22V in daylight', VERSION),
          ...createStep('④', 'Check MPPT controller charging indicator.', 'Should show active charging', VERSION),
          ...createStep('⑤', 'Verify MPPT-to-battery connections.', 'Correct polarity, secure', VERSION),
          createSpacer(50),
          createBodyText('If panel voltage OK but not charging → MPPT controller may be faulty. Contact Support.', VERSION),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // SECTION 4: COMMUNICATION ISSUES
      {
        properties: {
          page: { size: { width: PAGE_A4.width, height: PAGE_A4.height }, margin: PAGE_A4.margins }
        },
        headers: { default: createHeader('Weather Station', 'Troubleshooting Guide') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('4. Communication Issues', 1, VERSION),

          createSymptomHeader('§4.1', 'MODBUS Asset Shows 2 Blinks/Min', VERSION),
          createBodyText('SYMPTOM: MODBUS Asset LED blinks twice per minute instead of once.', VERSION),
          createSpacer(50),
          createBodyText('MEANING: RS485 communication error - MODBUS Asset cannot communicate with WS Box.', VERSION),
          createSpacer(50),
          createBodyText('POSSIBLE CAUSES:', VERSION),
          createBullet('1. RS485 wiring reversed (A-B swapped)', VERSION),
          createBullet('2. RS485 cable disconnected or damaged', VERSION),
          createBullet('3. WS Box not powered or not transmitting', VERSION),
          createSpacer(100),

          createBodyText('DIAGNOSTIC STEPS:', VERSION),
          ...createStep('①', 'Verify WS Box is powered and LCD displays readings.', 'LCD shows sensor values', VERSION),
          ...createStep('②', 'Check RS485 wiring: A connects to A, B connects to B.', 'Correct polarity confirmed', VERSION),
          ...createStep('③', 'Inspect RS485 cable for damage.', 'No cuts or breaks', VERSION),
          ...createStep('④', 'Check terminal connections at both ends.', 'Secure, no corrosion', VERSION),
          ...createStep('⑤', 'Test with known-good RS485 cable.', 'LED changes to 1 blink/min', VERSION),
          createSpacer(100),

          createSafetyPanel('caution', 'The most common cause of 2 blinks/min is reversed A-B wiring. Always verify: WS Box A → MODBUS Asset A, and WS Box B → MODBUS Asset B.', VERSION),
          createSpacer(100),

          createSymptomHeader('§4.2', 'Device Not Appearing on Dashboard', VERSION),
          createBodyText('SYMPTOM: Weather Station does not appear in WakeCap Dashboard.', VERSION),
          createSpacer(50),
          createBodyText('DIAGNOSTIC STEPS:', VERSION),
          ...createStep('①', 'Verify MODBUS Asset LED shows 1 blink/min (normal).', 'Normal LED pattern', VERSION),
          ...createStep('②', 'Use WakeCap Verify App to check mesh network.', 'Anchors visible, path to Gateway exists', VERSION),
          ...createStep('③', 'Verify Gateway is online in Dashboard.', 'Gateway status = Online', VERSION),
          ...createStep('④', 'Check Gateway internet connection.', 'Cellular/WiFi/Ethernet connected', VERSION),
          ...createStep('⑤', 'Wait 5 minutes and refresh Dashboard.', 'Device appears', VERSION),
          createSpacer(50),
          createBodyText('If Gateway offline → troubleshoot Gateway first. If mesh path broken → reposition Anchors.', VERSION),
          createSpacer(100),

          createSymptomHeader('§4.3', 'Data Updates Intermittently', VERSION),
          createBodyText('SYMPTOM: Data appears on Dashboard but with gaps or delays.', VERSION),
          createSpacer(50),
          createBodyText('DIAGNOSTIC STEPS:', VERSION),
          ...createStep('①', 'Check MODBUS Asset LED pattern consistency.', 'Stable 1 blink/min', VERSION),
          ...createStep('②', 'Check mesh network signal quality in Verify App.', 'Strong signal to Anchors', VERSION),
          ...createStep('③', 'Verify no RF interference sources nearby.', 'No new equipment installed', VERSION),
          ...createStep('④', 'Check Gateway connectivity status.', 'Stable internet connection', VERSION),
          createSpacer(50),
          createBodyText('Intermittent data often indicates weak mesh signal. Consider adding an Anchor closer to MODBUS Asset.', VERSION),
          createSpacer(100),

          createSymptomHeader('§4.4', 'Mesh Network Connectivity Issues', VERSION),
          createBodyText('SYMPTOM: Device visible locally but mesh path to Gateway is broken.', VERSION),
          createSpacer(50),
          createBodyText('DIAGNOSTIC STEPS:', VERSION),
          ...createStep('①', 'Use Verify App to map mesh network topology.', 'Identify break in path', VERSION),
          ...createStep('②', 'Check status of each Anchor in the path.', 'All Anchors powered and online', VERSION),
          ...createStep('③', 'Verify no new obstructions between devices.', 'Clear line of sight or adequate signal', VERSION),
          ...createStep('④', 'Reposition Anchors if needed to create alternate path.', 'Continuous path to Gateway', VERSION),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // SECTION 5: DATA ISSUES
      {
        properties: {
          page: { size: { width: PAGE_A4.width, height: PAGE_A4.height }, margin: PAGE_A4.margins }
        },
        headers: { default: createHeader('Weather Station', 'Troubleshooting Guide') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('5. Data Issues', 1, VERSION),

          createSymptomHeader('§5.1', 'WS Box Display Shows All Zeros', VERSION),
          createBodyText('SYMPTOM: LCD displays 0.0 for all sensor readings.', VERSION),
          createSpacer(50),
          createBodyText('POSSIBLE CAUSES:', VERSION),
          createBullet('1. Sensors disconnected', VERSION),
          createBullet('2. Sensor cable damage', VERSION),
          createBullet('3. Sensor failure', VERSION),
          createBullet('4. WS Box input fault', VERSION),
          createSpacer(100),

          createBodyText('DIAGNOSTIC STEPS:', VERSION),
          ...createStep('①', 'Check sensor cable connections at WS Box terminals T1-T6.', 'All cables secure', VERSION),
          ...createStep('②', 'Inspect sensor cables for damage.', 'No cuts, breaks, or water ingress', VERSION),
          ...createStep('③', 'If single sensor shows zero, swap with known-good sensor.', 'Value appears', VERSION),
          ...createStep('④', 'Test sensor output with multimeter (if applicable).', 'Signal within expected range', VERSION),
          createSpacer(50),
          createBodyText('If all sensors show zero simultaneously → possible WS Box internal issue. Contact Support.', VERSION),
          createSpacer(100),

          createSymptomHeader('§5.2', 'Sensor Reading Out of Range', VERSION),
          createBodyText('SYMPTOM: Sensor displays value clearly outside physical possibility.', VERSION),
          createSpacer(50),
          createBodyText('DIAGNOSTIC STEPS:', VERSION),
          ...createStep('①', 'Verify sensor is appropriate type for terminal.', 'Correct sensor at correct terminal', VERSION),
          ...createStep('②', 'Check for sensor damage or contamination.', 'Sensor clean and undamaged', VERSION),
          ...createStep('③', 'Verify sensor wiring matches documentation.', 'Correct wire to correct pin', VERSION),
          ...createStep('④', 'Recalibrate sensor if supported.', 'Reading normalizes', VERSION),
          createSpacer(50),
          createBodyText('Out-of-range readings typically indicate sensor fault or wiring error.', VERSION),
          createSpacer(100),

          createSymptomHeader('§5.3', 'Readings Don\'t Match Actual Conditions', VERSION),
          createBodyText('SYMPTOM: Sensor values differ significantly from reference measurements.', VERSION),
          createSpacer(50),
          createBodyText('DIAGNOSTIC STEPS:', VERSION),
          ...createStep('①', 'Compare with calibrated reference instrument.', 'Quantify the discrepancy', VERSION),
          ...createStep('②', 'Check for environmental interference.', 'Sensor not near heat source, exhaust, etc.', VERSION),
          ...createStep('③', 'Check sensor age and calibration due date.', 'Within calibration period', VERSION),
          ...createStep('④', 'Perform field calibration if supported.', 'Readings align with reference', VERSION),
          createSpacer(50),
          createBodyText('Gas sensors require periodic calibration with certified calibration gas.', VERSION),
          createSpacer(100),

          createSymptomHeader('§5.4', 'Historical Data Missing', VERSION),
          createBodyText('SYMPTOM: Gaps in historical data on Dashboard.', VERSION),
          createSpacer(50),
          createBodyText('DIAGNOSTIC STEPS:', VERSION),
          ...createStep('①', 'Check if gap corresponds to known power outage.', 'Review power system logs', VERSION),
          ...createStep('②', 'Check Gateway connectivity logs for same period.', 'Gateway was online', VERSION),
          ...createStep('③', 'Verify MODBUS Asset was operating normally.', 'LED showed 1 blink/min', VERSION),
          ...createStep('④', 'Check for mesh network issues during gap period.', 'Anchors were online', VERSION),
          createSpacer(50),
          createBodyText('Data gaps usually correspond to communication path interruption. Review logs to identify root cause.', VERSION),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // SECTION 6: LED STATUS REFERENCE
      {
        properties: {
          page: { size: { width: PAGE_A4.width, height: PAGE_A4.height }, margin: PAGE_A4.margins }
        },
        headers: { default: createHeader('Weather Station', 'Troubleshooting Guide') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('6. LED Status Reference', 1, VERSION),

          createHeading('6.1 MODBUS Asset LED', 2, VERSION),
          createSpecTable(
            ['LED Pattern', 'Status', 'Meaning', 'Action Required'],
            [
              ['1 blink/min', 'Normal', 'System operating correctly', 'None'],
              ['2 blinks/min', 'Error', 'RS485 communication failure', 'Check wiring (§4.1)'],
              ['Rapid blinking', 'Init', 'System initializing', 'Wait 60 seconds'],
              ['Solid ON', 'Fault', 'Hardware fault', 'Contact Support'],
              ['OFF', 'No Power', 'No power to device', 'Check power (§3.1)']
            ],
            VERSION
          ),
          createSpacer(100),

          createHeading('6.2 How to Count Blinks', 2, VERSION),
          createBodyText('To accurately determine LED status:', VERSION),
          ...createStep('①', 'Observe the LED for a full 60 seconds.', null, VERSION),
          ...createStep('②', 'Count the total number of blinks.', null, VERSION),
          ...createStep('③', 'A "blink" = LED turns ON then OFF.', null, VERSION),
          ...createStep('④', 'Match count to table above.', null, VERSION),
          createSpacer(100),

          createCalloutBox('note', 'Do not count the OFF period as a separate event. One complete ON-OFF cycle equals one blink.', VERSION),
          createSpacer(200),

          createHeading('7. Connection Verification', 1, VERSION),

          createHeading('7.1 RS485 Connection Test', 2, VERSION),
          createSafetyPanel('caution', 'Disconnect power from both devices before performing resistance measurements.', VERSION),
          createSpacer(100),

          ...createStep('①', 'At WS Box, measure resistance between A and B terminals.', 'Open circuit (infinite resistance)', VERSION),
          ...createStep('②', 'Measure continuity from WS Box Terminal A to MODBUS Asset Terminal A.', 'Near 0Ω (continuous)', VERSION),
          ...createStep('③', 'Repeat for B terminals.', 'Near 0Ω (continuous)', VERSION),
          ...createStep('④', 'Verify A connects to A, B connects to B (not crossed).', 'Correct polarity', VERSION),
          createSpacer(100),

          createHeading('7.2 Power Supply Test', 2, VERSION),
          ...createStep('①', 'Measure voltage at WS Box power input.', '12V DC (±0.5V)', VERSION),
          ...createStep('②', 'Measure battery voltage.', '12V or higher', VERSION),
          ...createStep('③', 'Check MPPT controller charging indicator.', 'Active during daylight', VERSION),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // SECTION 8: ESCALATION & APPENDIX
      {
        properties: {
          page: { size: { width: PAGE_A4.width, height: PAGE_A4.height }, margin: PAGE_A4.margins }
        },
        headers: { default: createHeader('Weather Station', 'Troubleshooting Guide') },
        footers: { default: createFooter(DOC_ID, REVISION_DATE) },
        children: [
          createHeading('8. When to Contact Support', 1, VERSION),
          createBodyText('Contact WakeCap Support if:', VERSION),
          createBullet('Issue not resolved after following all diagnostic procedures', VERSION),
          createBullet('Error codes or LED patterns not listed in this guide', VERSION),
          createBullet('Physical damage to equipment observed', VERSION),
          createBullet('Repeated failures after repairs', VERSION),
          createBullet('Gas sensor calibration required', VERSION),
          createSpacer(100),

          createHeading('Information to Provide', 2, VERSION),
          createBullet('Device serial number (found on device label)', VERSION),
          createBullet('Symptom description', VERSION),
          createBullet('Diagnostic steps already completed and results', VERSION),
          createBullet('LED patterns or error codes observed', VERSION),
          createBullet('Photos of installation and any visible damage', VERSION),
          createBullet('Site conditions (weather, location type)', VERSION),
          createSpacer(100),

          createHeading('Support Contact', 2, VERSION),
          createBodyText('Email: support@wakecap.com', VERSION),
          createBodyText('Phone: [TBD]', VERSION),
          createBodyText('Portal: support.wakecap.com', VERSION),
          createBodyText('Hours: Monday-Friday, 8:00-18:00 (local time)', VERSION),

          new Paragraph({ children: [new PageBreak()] }),

          createHeading('Appendix A: System Health Checklist', 1, VERSION),
          createBodyText('Use this checklist for periodic system verification:', VERSION),
          createSpacer(100),

          createHeading('Physical Inspection', 2, VERSION),
          createCheckbox('Enclosure intact, no visible damage', VERSION),
          createCheckbox('Cable glands properly sealed', VERSION),
          createCheckbox('No corrosion on terminals', VERSION),
          createCheckbox('Mounting secure', VERSION),
          createCheckbox('Solar panel clean and unobstructed', VERSION),
          createSpacer(100),

          createHeading('Power System', 2, VERSION),
          createCheckbox('Battery voltage: ______V (should be >12V)', VERSION),
          createCheckbox('MPPT charging indicator active (daytime)', VERSION),
          createCheckbox('No loose power connections', VERSION),
          createSpacer(100),

          createHeading('Communication', 2, VERSION),
          createCheckbox('MODBUS Asset LED: 1 blink/min', VERSION),
          createCheckbox('Device visible in WakeCap Verify App', VERSION),
          createCheckbox('Data appearing on Dashboard', VERSION),
          createSpacer(100),

          createHeading('Data Quality', 2, VERSION),
          createCheckbox('All sensors showing readings (not zero)', VERSION),
          createCheckbox('Readings within expected ranges', VERSION),
          createCheckbox('Data updating at expected intervals', VERSION),
          createSpacer(200),

          new Paragraph({
            children: [
              new TextRun({ text: 'Date checked: _______________    Technician: _______________', size: 20, font: 'Source Sans Pro', color: COLORS.charcoal })
            ]
          }),
          createSpacer(300),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: '© 2026 WakeCap Technologies  |  www.wakecap.com  |  support@wakecap.com', size: 18, font: 'Source Sans Pro', color: COLORS.slate })
            ]
          })
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync('./output/WC-WS-TG-v1.0.docx', buffer);
  console.log('✓ Generated: ./output/WC-WS-TG-v1.0.docx');
}

generateTroubleshootingGuide().catch(console.error);

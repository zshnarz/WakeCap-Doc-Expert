/**
 * WC-MA-DPC-v1.1 — MPPT Data Parsing Contract (Updated)
 * Generates .docx using WakeCap docx-generator base template
 *
 * Changes from v1.0:
 *   - R2 (0x331A): Clarified as Battery Voltage + Current (not 32-bit composite)
 *   - R6 (0x9013): Expanded from 1 register (MM:SS) to 3 registers (full timestamp)
 *   - TLV packet: 29 bytes → 33 bytes (LEN: 0x1B → 0x1F)
 *   - Added backward compatibility note (v1.0 = 27 bytes, v1.1 = 31 bytes)
 */

const path = require('path');
const fs = require('fs');

const {
  buildDocument,
  Packer,
  createHeading,
  createBodyText,
  createBullet,
  createNumberedStep,
  createSpecTable,
  createCalloutBox,
  createSpacer,
  Paragraph,
  TextRun,
  AlignmentType,
  PageBreak,
  COLORS,
  FONT_SIZES
} = require(path.resolve(__dirname, '../../old_generators/docx-generator.js'));

const V = 'B'; // Technical style (Version B)
const sizes = FONT_SIZES.versionB;

// Helper: monospace code block
function codeBlock(lines) {
  return lines.map(line =>
    new Paragraph({
      spacing: { after: 0 },
      indent: { left: 400 },
      children: [
        new TextRun({
          text: line,
          size: 16,
          font: 'Consolas',
          color: COLORS.charcoal
        })
      ]
    })
  );
}

// Helper: body text with inline styled segments
function richBody(segments) {
  return new Paragraph({
    spacing: { after: 120 },
    children: segments.map(s =>
      new TextRun({
        text: s.text,
        bold: !!s.bold,
        italics: !!s.italics,
        size: sizes.body,
        font: s.mono ? 'Consolas' : 'Source Sans Pro',
        color: s.muted ? '737373' : COLORS.charcoal
      })
    )
  });
}

// ─── Build content ───────────────────────────────────────────────────────────

const content = [];

// ══════════════════════════════════════════════════════════════════════════════
// Section 1: Overview
// ══════════════════════════════════════════════════════════════════════════════
content.push(createHeading('1. Overview', 2, V));
content.push(createBodyText(
  'This document defines the contract between the Firmware (FW) team responsible for the MPPT solar charge controller add-on and the Backend (BE) team responsible for processing the data. It specifies the MQTT topic structure, payload format using a Tag-Length-Value (TLV) scheme, field definitions for the MPPT data block, and the required parsing logic.', V
));
content.push(createBodyText(
  'The MPPT add-on reads 7 register groups from an EPEver-compatible solar charge controller over Modbus RTU (RS485) and aggregates them into a single TLV packet transmitted over the Wirepas mesh network.', V
));

// ══════════════════════════════════════════════════════════════════════════════
// Section 2: Data Transmission via MQTT
// ══════════════════════════════════════════════════════════════════════════════
content.push(createHeading('2. Data Transmission via MQTT', 2, V));

content.push(createHeading('2.1  MQTT Topic Structure', 3, V));
content.push(createBodyText('Sensor data is published to the following MQTT topic:', V));
content.push(...codeBlock([
  '<env>/gw-event/received_data/<gw-id>/<sink-id>/<net_id>/61/61'
]));
content.push(createSpacer(60));
content.push(createBodyText('Where:', V));
content.push(createBullet('<env>: The deployment environment. Possible values: production, test, local.', 0, V));
content.push(createBullet('<gw-id>: The unique serial ID of the gateway device.', 0, V));
content.push(createBullet('<sink-id>: The unique serial ID of the sink device (also used as the sink\'s mesh node address).', 0, V));
content.push(createBullet('<net_id>: The identifier for the Wirepas mesh network.', 0, V));
content.push(createBullet('61/61: Static identifiers indicating Source Endpoint 61, Destination Endpoint 61 (Modbus data).', 0, V));

content.push(createCalloutBox('note',
  'Additional metadata, such as the originating node\'s source address within the mesh network, is provided within the accompanying Protobuf message structure wrapping the payload. This document focuses specifically on parsing the raw byte payload field within that structure.', V
));

content.push(createHeading('2.2  MQTT Payload Format (TLV Structure)', 3, V));
content.push(createBodyText(
  'The payload field within the Protobuf message contains one or more data blocks formatted using a Tag-Length-Value (TLV) structure. This allows both MPPT and Weather Station data to share the same endpoint.', V
));
content.push(createBodyText('Each TLV block has the following format:', V));
content.push(createBullet('Tag (T): 1 byte. Uniquely identifies the type of data block that follows.', 0, V));
content.push(createBullet('Length (L): 1 byte. Specifies the length (in bytes) of the Value field only.', 0, V));
content.push(createBullet('Value (V): L bytes. The actual data payload for the specified Tag.', 0, V));

content.push(richBody([{ text: 'Current Implementation (v1.1):', bold: true }]));
content.push(createBullet('MPPT Tag: 0x02', 0, V));
content.push(createBullet('MPPT Value Length: 29 bytes (1-byte bitmask + 28 bytes register data) = 0x1D', 0, V));
content.push(createCalloutBox('note',
  'v1.0 used Length = 0x1B (27 bytes) with a 2-byte RTC field (Minutes:Seconds only). v1.1 expands RTC to 4 bytes (adds Day and Hour), increasing the packet to 31 bytes total. The backend should accept both lengths for backward compatibility.', V
));

content.push(createHeading('2.3  Discriminating MPPT from Weather Station', 3, V));
content.push(createBodyText(
  'MPPT and Weather Station use different Tag values on Endpoint 61. The backend can discriminate by Tag alone:', V
));
content.push(createSpecTable(
  ['Device Type', 'Tag', 'Length', 'Hex', 'Value Structure'],
  [
    ['Weather Station', '0x01', '32', '0x20', '16 × 2-byte signed int16 fields'],
    ['MPPT v1.1', '0x02', '29', '0x1D', '1-byte bitmask + 28 bytes data'],
    ['MPPT v1.0 (legacy)', '0x02', '27', '0x1B', '1-byte bitmask + 26 bytes data']
  ], V
));
content.push(createBodyText('Parsing rule:', V));
content.push(createBullet('If Tag == 0x01 and Length == 0x20: Parse as Weather Station.', 0, V));
content.push(createBullet('If Tag == 0x02 and Length == 0x1D: Parse as MPPT v1.1 (this document).', 0, V));
content.push(createBullet('If Tag == 0x02 and Length == 0x1B: Parse as MPPT v1.0 legacy (R6 = 2 bytes only).', 0, V));
content.push(createBullet('Otherwise: Log unknown tag and skip.', 0, V));

content.push(createHeading('2.4  Bitmask Field', 3, V));
content.push(createBodyText(
  'The first byte of the MPPT Value field is a register success bitmask. Each bit indicates whether the corresponding register group was successfully read.', V
));
content.push(...codeBlock([
  'Bit:    6        5        4        3        2        1        0',
  '        |        |        |        |        |        |        |',
  '       RTC    PV Pwr   PV V/I   Batt     Load     SOC     Status',
  '      0x9013   0x310C   0x3100   V/I      Power   0x311A   0x3200',
  '                                 0x3110   0x331A'
]));
content.push(createSpacer(60));
content.push(createBullet('Bit N = 1: Register group N responded successfully; data bytes are valid.', 0, V));
content.push(createBullet('Bit N = 0: Register group N failed (timeout / CRC error); data bytes are zero-filled (0x00).', 0, V));
content.push(createBullet('Bit 7: Reserved (always 0).', 0, V));

// ══════════════════════════════════════════════════════════════════════════════
// Section 3: Field Definitions
// ══════════════════════════════════════════════════════════════════════════════
content.push(new Paragraph({ children: [new PageBreak()] }));
content.push(createHeading('3. Field Definitions (Tag 0x02 — MPPT, Length 0x1D)', 2, V));
content.push(createBodyText(
  'The following table defines the fields within the Value part of the TLV structure when Tag == 0x02 and Length == 0x1D (29 bytes). The first byte is the bitmask (Section 2.4). The remaining 28 bytes contain register data in the order shown.', V
));
content.push(createBullet('Byte Order: Big-Endian (Most Significant Byte first) for all 16-bit values.', 0, V));

content.push(createHeading('3.1  Register Data Layout', 3, V));
content.push(createSpecTable(
  ['Reg', 'Bit', 'Offset', 'Bytes', 'Modbus Addr', 'Func', 'Description'],
  [
    ['R0', 'Bit 0', '0–5',   '6', '0x3200', '0x04', 'Battery / Charging / Load Status'],
    ['R1', 'Bit 1', '6–7',   '2', '0x311A', '0x04', 'Battery SOC'],
    ['R2', 'Bit 2', '8–11',  '4', '0x331A', '0x04', 'Battery Voltage / Current'],
    ['R3', 'Bit 3', '12–15', '4', '0x3110', '0x04', 'Battery Temp / Device Temp'],
    ['R4', 'Bit 4', '16–19', '4', '0x3100', '0x04', 'PV Array Voltage / Current'],
    ['R5', 'Bit 5', '20–23', '4', '0x310C', '0x04', 'Load Voltage / Current'],
    ['R6', 'Bit 6', '24–27', '4', '0x9013', '0x03', 'Real-Time Clock (min:sec + day:hour)']
  ], V
));

content.push(createHeading('3.2  Detailed Field Definitions', 3, V));

// R0
content.push(richBody([{ text: 'R0: Status Registers (0x3200–0x3202) — 6 bytes', bold: true }]));
content.push(createSpecTable(
  ['Sub-Field', 'Offset', 'Bytes', 'Data Type', 'Description'],
  [
    ['R0.a', '0–1', '2', 'Unsigned 16-bit', 'Battery Status'],
    ['R0.b', '2–3', '2', 'Unsigned 16-bit', 'Charging Equipment Status'],
    ['R0.c', '4–5', '2', 'Unsigned 16-bit', 'Load / Discharging Status']
  ], V
));

content.push(richBody([{ text: 'R0.a — Battery Status (0x3200) Bit Definitions', bold: true }]));
content.push(createSpecTable(
  ['Bits', 'Meaning', 'Values'],
  [
    ['3:0', 'Battery voltage status', '0=Normal, 1=Over-V, 2=Under-V, 3=Over discharge, 4=Fault'],
    ['7:4', 'Battery temperature status', '0=Normal, 1=Over Temp, 2=Low Temp'],
    ['8', 'Internal resistance abnormal', '0=Normal, 1=Abnormal'],
    ['15', 'Wrong identification for rated voltage', '0=Correct, 1=Wrong']
  ], V
));

content.push(richBody([{ text: 'R0.b — Charging Equipment Status (0x3201) Bit Definitions', bold: true }]));
content.push(createSpecTable(
  ['Bits', 'Meaning', 'Values'],
  [
    ['0',     'Running',                  '0=Standby, 1=Running'],
    ['1',     'Fault',                    '0=Normal, 1=Fault'],
    ['3:2',   'Charging status',          '0=Not Charging, 1=Float, 2=Boost, 3=Equalize'],
    ['4',     'PV input short circuit',   '0=Normal, 1=Short'],
    ['7',     'Load MOSFET short circuit', '0=Normal, 1=Short'],
    ['8',     'Load short circuit',       '0=Normal, 1=Short'],
    ['9',     'Load over-current',        '0=Normal, 1=Over-current'],
    ['10',    'Input over-current',       '0=Normal, 1=Over-current'],
    ['13',    'Charging MOSFET short',    '0=Normal, 1=Short'],
    ['15:14', 'Input voltage status',     '0=Normal, 1=No input, 2=Higher input V, 3=Error']
  ], V
));

content.push(richBody([{ text: 'R0.c — Discharging Equipment Status (0x3202) Bit Definitions', bold: true }]));
content.push(createSpecTable(
  ['Bits', 'Meaning', 'Values'],
  [
    ['0',     'Running / Standby',     '0=Standby, 1=Running'],
    ['1',     'Fault',                 '0=Normal, 1=Fault'],
    ['4',     'Output over-voltage',   '0=Normal, 1=Over-voltage'],
    ['7',     'Input over-voltage',    '0=Normal, 1=Over-voltage'],
    ['11',    'Short circuit',         '0=Normal, 1=Short'],
    ['13:12', 'Output power level',    '0=Light, 1=Moderate, 2=Rated, 3=Overload'],
    ['15:14', 'Input voltage status',  '0=Normal, 1=Low, 2=High, 3=No access']
  ], V
));

// R1
content.push(richBody([{ text: 'R1: Battery SOC (0x311A) — 2 bytes', bold: true }]));
content.push(createSpecTable(
  ['Offset', 'Bytes', 'Data Type', 'Unit', 'Description', 'Coefficient'],
  [['6–7', '2', 'Unsigned 16-bit', '%', 'Battery State of Charge', '1 (direct)']], V
));
content.push(createBodyText('Value range: 0–100 (percent). No scaling needed.', V));

// R2
content.push(richBody([{ text: 'R2: Battery Voltage and Current (0x331A–0x331B) — 4 bytes', bold: true }]));
content.push(createSpecTable(
  ['Sub', 'Offset', 'Bytes', 'Type', 'Unit', 'Description', 'Coeff'],
  [
    ['R2.a', '8–9', '2', 'Unsigned 16-bit', 'V', 'Battery Voltage', '0.01'],
    ['R2.b', '10–11', '2', 'Unsigned 16-bit', 'A', 'Battery Current (Low)', '0.01']
  ], V
));
content.push(createBodyText('Derived value: Battery Power (W) = Battery Voltage × Battery Current', V));
content.push(createCalloutBox('note',
  'Correction from v1.0: Previously documented as a 32-bit composite "Battery Net Current." Per EPEver MODBUS-Protocol-v25.pdf (registers A36–A37): 0x331A is Battery Voltage (V ×100), 0x331B is Battery Current low word (A ×100). These are two separate 16-bit values. The high word of battery current (0x331C) is not read.', V
));

// R3
content.push(richBody([{ text: 'R3: Battery Temperature and Device Temperature (0x3110–0x3111) — 4 bytes', bold: true }]));
content.push(createSpecTable(
  ['Sub', 'Offset', 'Bytes', 'Type', 'Unit', 'Description', 'Coeff'],
  [
    ['R3.a', '12–13', '2', 'Unsigned 16-bit', '°C', 'Battery Temperature', '0.01'],
    ['R3.b', '14–15', '2', 'Unsigned 16-bit', '°C', 'Device Temperature', '0.01']
  ], V
));

// R4
content.push(richBody([{ text: 'R4: PV Array Voltage and Current (0x3100–0x3101) — 4 bytes', bold: true }]));
content.push(createSpecTable(
  ['Sub', 'Offset', 'Bytes', 'Type', 'Unit', 'Description', 'Coeff'],
  [
    ['R4.a', '16–17', '2', 'Unsigned 16-bit', 'V', 'PV Voltage', '0.01'],
    ['R4.b', '18–19', '2', 'Unsigned 16-bit', 'A', 'PV Current', '0.01']
  ], V
));

// R5
content.push(richBody([{ text: 'R5: Load Voltage and Current (0x310C–0x310D) — 4 bytes', bold: true }]));
content.push(createSpecTable(
  ['Sub', 'Offset', 'Bytes', 'Type', 'Unit', 'Description', 'Coeff'],
  [
    ['R5.a', '20–21', '2', 'Unsigned 16-bit', 'V', 'Load Voltage', '0.01'],
    ['R5.b', '22–23', '2', 'Unsigned 16-bit', 'A', 'Load Current', '0.01']
  ], V
));
content.push(createBodyText('Derived value: Load Power (W) = Load Voltage × Load Current', V));

// R6
content.push(richBody([{ text: 'R6: Real-Time Clock (0x9013–0x9014) — 4 bytes', bold: true }]));
content.push(createSpecTable(
  ['Sub', 'Offset', 'Bytes', 'Data Type', 'Description'],
  [
    ['R6.a', '24–25', '2', 'Packed byte', 'D15-D8=Minutes, D7-D0=Seconds'],
    ['R6.b', '26–27', '2', 'Packed byte', 'D15-D8=Day, D7-D0=Hour']
  ], V
));
content.push(richBody([{ text: 'RTC Decoding (per EPEver MODBUS-Protocol-v25.pdf, registers 0x9013–0x9014):', bold: true }]));
content.push(...codeBlock([
  'minutes = byte[24]     // 0-59',
  'seconds = byte[25]     // 0-59',
  'day     = byte[26]     // 1-31',
  'hour    = byte[27]     // 0-23',
  '',
  'time_string = sprintf("%02d:%02d:%02d (day %d)", hour, minutes, seconds, day)'
]));
content.push(createCalloutBox('note',
  'Change from v1.0: Previously read only register 0x9013 (1 register = Minutes:Seconds, no hour). Now reads 2 registers (0x9013–0x9014) adding Day and Hour. Year/Month (0x9015) is not read to save bytes. This adds 2 bytes to the TLV packet.', V
));

// ══════════════════════════════════════════════════════════════════════════════
// Section 4: Data Parsing Logic
// ══════════════════════════════════════════════════════════════════════════════
content.push(new Paragraph({ children: [new PageBreak()] }));
content.push(createHeading('4. Data Parsing Logic', 2, V));
content.push(createBodyText(
  'The backend must first parse the overall TLV structure of the MQTT payload and then parse the content of recognized Value fields.', V
));
content.push(createNumberedStep(1, 'Parse TLV Blocks: Process the payload sequentially. For each block: read Tag (1 byte), read Length (1 byte), read Length bytes for Value.', V));
content.push(createNumberedStep(2, 'Identify Block Type: Check Tag and Length values.', V));
content.push(createBullet('If Tag == 0x02 and Length == 0x1D (29): Parse as MPPT v1.1 (Step 3).', 1, V));
content.push(createBullet('If Tag == 0x02 and Length == 0x1B (27): Parse as MPPT v1.0 legacy (R6 = 2 bytes).', 1, V));
content.push(createBullet('If Tag == 0x01 and Length == 0x20 (32): Parse as Weather Station.', 1, V));
content.push(createBullet('If Tag is unknown: Log and skip.', 1, V));
content.push(createNumberedStep(3, 'Parse MPPT Value Data: Read bitmask, then for each register R0–R6:', V));
content.push(createBullet('Check bitmask: If bit N is 0, skip (treat as NULL).', 1, V));
content.push(createBullet('Extract bytes at the offset specified in Section 3.1.', 1, V));
content.push(createBullet('Combine into 16-bit integers (Big-Endian).', 1, V));
content.push(createBullet('Apply Coefficient from Section 3.2.', 1, V));
content.push(createBullet('Decode bitfields for status registers (R0).', 1, V));
content.push(createNumberedStep(4, 'Repeat: If payload has more bytes, return to Step 1.', V));

// ══════════════════════════════════════════════════════════════════════════════
// Section 5: Parsing Examples
// ══════════════════════════════════════════════════════════════════════════════
content.push(createHeading('5. Parsing Examples', 2, V));

content.push(createHeading('5.1  Full Successful Packet (All 7 Registers OK)', 3, V));
content.push(richBody([{ text: 'Raw Hex (31 bytes):', bold: true }]));
content.push(...codeBlock([
  '02 1D 7F 00 00 00 04 00 00 00 64 00 00 00 00 05 14 00 64 0D 48 00 32 00 00 00 00 0C 1E 18 0B'
]));
content.push(createSpacer(60));
content.push(createSpecTable(
  ['Field', 'Hex Bytes', 'Interpretation'],
  [
    ['TAG', '02', 'MPPT Modbus Add-On Data'],
    ['LEN', '1D', '29 bytes'],
    ['Bitmask', '7F', '0111 1111 = all 7 registers OK'],
    ['R0 Batt Status', '00 00', '0x0000 = Normal'],
    ['R0 Chg Status', '00 04', '0x0004: bits 3:2 = 01 = Float charge mode'],
    ['R0 Dischg Status', '00 00', '0x0000 = Standby, Normal'],
    ['R1 SOC', '00 64', '100 → 100%'],
    ['R2 Batt V', '00 00', '0x0000 = 0 → 0 × 0.01 = 0.00 V'],
    ['R2 Batt I(L)', '00 00', '0x0000 = 0 → 0 × 0.01 = 0.00 A'],
    ['R3 Batt Temp', '05 14', '0x0514 = 1300 → 1300 × 0.01 = 13.00 °C'],
    ['R3 Dev Temp', '00 64', '0x0064 = 100 → 100 × 0.01 = 1.00 °C'],
    ['R4 PV Voltage', '0D 48', '0x0D48 = 3400 → 3400 × 0.01 = 34.00 V'],
    ['R4 PV Current', '00 32', '0x0032 = 50 → 50 × 0.01 = 0.50 A'],
    ['R5 Load V', '00 00', '0x0000 = 0 → 0.00 V'],
    ['R5 Load I', '00 00', '0x0000 = 0 → 0.00 A'],
    ['R6 RTC Min:Sec', '0C 1E', 'Minutes=12, Seconds=30'],
    ['R6 RTC Day:Hr', '18 0B', 'Day=24, Hour=11 → 11:12:30 (day 24)']
  ], V
));

content.push(createHeading('5.2  Partial Data (Registers 2 and 5 Failed)', 3, V));
content.push(richBody([{ text: 'Bitmask: 0x5B = binary 0101 1011', bold: true }]));
content.push(createSpecTable(
  ['Bit', 'Register', 'Status', 'Action'],
  [
    ['0', 'R0 Status', '1 (OK)', 'Parse normally'],
    ['1', 'R1 SOC', '1 (OK)', 'Parse normally'],
    ['2', 'R2 Batt V/I', '0 (FAIL)', 'Skip — zero-filled, treat as NULL'],
    ['3', 'R3 Temps', '1 (OK)', 'Parse normally'],
    ['4', 'R4 PV V/I', '1 (OK)', 'Parse normally'],
    ['5', 'R5 Load V/I', '0 (FAIL)', 'Skip — treat as NULL'],
    ['6', 'R6 RTC', '1 (OK)', 'Parse normally']
  ], V
));

content.push(createHeading('5.3  Decoding a 16-bit Value (Battery Temperature)', 3, V));
content.push(createBodyText('Applies to R3.a bytes at data offset 12–13.', V));
content.push(createBullet('Hexadecimal Bytes: 05 14', 0, V));
content.push(createBullet('Combined 16-bit Value (Big-Endian): 0x0514', 0, V));
content.push(createBullet('As Unsigned Integer: 1300', 0, V));
content.push(createBullet('Apply Coefficient (0.01): 1300 × 0.01 = 13.00', 0, V));
content.push(createBullet('Result: 13.00 °C (Battery Temperature)', 0, V));

content.push(createHeading('5.4  Decoding a 16-bit Value (Load Voltage)', 3, V));
content.push(createBodyText('Applies to R5.a bytes at data offset 20–21.', V));
content.push(createBullet('Hexadecimal Bytes: 06 A4', 0, V));
content.push(createBullet('Combined 16-bit Value (Big-Endian): 0x06A4 = 1700', 0, V));
content.push(createBullet('Apply Coefficient (0.01): 1700 × 0.01 = 17.00', 0, V));
content.push(createBullet('Result: 17.00 V (Load Voltage)', 0, V));

content.push(createHeading('5.5  Decoding RTC Time', 3, V));
content.push(createBodyText('Applies to R6 bytes at data offset 24–25.', V));
content.push(createBullet('Hexadecimal Bytes: 0E 2D', 0, V));
content.push(createBullet('High Byte (Minutes): 0x0E = 14', 0, V));
content.push(createBullet('Low Byte (Seconds): 0x2D = 45', 0, V));
content.push(createBullet('Result: 14:45 (14 minutes, 45 seconds past the hour)', 0, V));

content.push(createCalloutBox('important',
  'Unlike the Weather Station (which uses 0x7FFF as a sentinel for disconnected sensors), the MPPT uses a bitmask to indicate unavailable data. If bitmask bit N = 0, the corresponding register\'s data bytes are zero-filled. The backend should treat these fields as NULL/unavailable — NOT as a reading of zero.', V
));

// ══════════════════════════════════════════════════════════════════════════════
// Section 6: Error Status Reporting
// ══════════════════════════════════════════════════════════════════════════════
content.push(new Paragraph({ children: [new PageBreak()] }));
content.push(createHeading('6. Error Status Reporting (Endpoint 65)', 2, V));

content.push(createHeading('6.1  Error Status MQTT Topic', 3, V));
content.push(...codeBlock([
  '<env>/gw-event/received_data/<gw-id>/<sink-id>/<net_id>/65/65'
]));

content.push(createHeading('6.2  Error Status Payload', 3, V));
content.push(createBodyText('The error status payload is a fixed 3-byte structure (no TLV wrapper):', V));
content.push(createSpecTable(
  ['Byte', 'Bytes', 'Description', 'Values'],
  [
    ['0', '1', 'LED State', '0=Normal, 1=Problem, 2=Critical'],
    ['1', '1', 'Recent Timeout Count', '0–255 (resets after each report)'],
    ['2', '1', 'Recent CRC Error Count', '0–255 (resets after each report)']
  ], V
));
content.push(createBodyText('LED State Interpretation:', V));
content.push(createBullet('0 (Normal): Device is communicating normally.', 0, V));
content.push(createBullet('1 (Problem): Response timeouts detected, but device is still functional.', 0, V));
content.push(createBullet('2 (Critical): Hardware initialization failure or persistent communication errors.', 0, V));

// ══════════════════════════════════════════════════════════════════════════════
// Section 7: Key Differences from Weather Station
// ══════════════════════════════════════════════════════════════════════════════
content.push(createHeading('7. Key Differences from Weather Station', 2, V));
content.push(createBodyText(
  'This section summarizes the differences between the MPPT and Weather Station parsing contracts for backend developers who support both.', V
));
content.push(createSpecTable(
  ['Aspect', 'Weather Station', 'MPPT'],
  [
    ['Tag',              '0x01',                           '0x02'],
    ['Length',           '0x20 (32 bytes)',                '0x1D (29 bytes) v1.1 / 0x1B (27) v1.0'],
    ['Discriminator',   'Length == 32',                   'Length == 29 (v1.1) or 27 (v1.0)'],
    ['Bitmask',         'None',                           '1st byte of Value'],
    ['Data fields',     '16 uniform 2-byte fields',       '7 variable-size groups (2–6 B)'],
    ['Data type',       'Signed 16-bit (Two\'s Comp.)',  'Unsigned 16-bit and 32-bit'],
    ['Scaling',         'Per-field (0.1, 0.001, 1)',     '0.01 for V/A/W, 1 for SOC'],
    ['Unavailable',     '0x7FFF sentinel',               'Bitmask bit=0, zero-filled'],
    ['Status fields',   'None (all measurements)',        'R0 has bitfield status regs'],
    ['Channel remap',   'Yes (4 remap configs)',          'No (fixed register order)']
  ], V
));

// ══════════════════════════════════════════════════════════════════════════════
// Section 8: Firmware Source References
// ══════════════════════════════════════════════════════════════════════════════
content.push(createHeading('8. Firmware Source References', 2, V));
content.push(createBodyText('For implementation verification, these are the authoritative source files:', V));
content.push(createSpecTable(
  ['File', 'Purpose'],
  [
    ['wc_addon_modbus_mppt.c', 'MPPT polling, TLV aggregation, packet construction'],
    ['wc_addon_modbus_mppt.h', 'Register config structures, constants'],
    ['wc_addon_modbus.c', 'Shared: CRC, auto-detect, LED, errors, data push'],
    ['wc_addon_modbus.h', 'Shared constants, endpoint defs, device type enum'],
    ['wakecap_config.h', 'Endpoint numbers (EP 61 data, EP 65 error)'],
    ['tools/mppt_parse.py', 'Reference Python parser for MPPT TLV packets']
  ], V
));

// ══════════════════════════════════════════════════════════════════════════════
// Appendix A: Complete Byte Map
// ══════════════════════════════════════════════════════════════════════════════
content.push(new Paragraph({ children: [new PageBreak()] }));
content.push(createHeading('A. Appendix: Complete Byte Map', 2, V));
content.push(createBodyText('Complete byte-by-byte map of the 31-byte MPPT TLV packet (v1.1):', V));
content.push(createSpecTable(
  ['Byte', 'Name', 'Field', 'Type', 'Notes'],
  [
    ['[0]',    'TAG',    'Tag',              'uint8',     'Always 0x02'],
    ['[1]',    'LEN',    'Length',           'uint8',     '0x1D (29) v1.1'],
    ['[2]',    'BM',     'Bitmask',          'uint8',     'Bit N = reg N success'],
    ['[3–4]',  'D+0,1',  'Battery Status',   'uint16 BE', 'Bitfield (R0.a)'],
    ['[5–6]',  'D+2,3',  'Charging Status',  'uint16 BE', 'Bitfield (R0.b)'],
    ['[7–8]',  'D+4,5',  'Dischg. Status',   'uint16 BE', 'Bitfield (R0.c)'],
    ['[9–10]', 'D+6,7',  'SOC',              'uint16 BE', '0–100 %'],
    ['[11–12]','D+8,9',  'Battery Voltage',  'uint16 BE', '× 0.01 V (0x331A)'],
    ['[13–14]','D+10,11', 'Battery Current L','uint16 BE', '× 0.01 A (0x331B)'],
    ['[15–16]','D+12,13', 'Battery Temp',    'uint16 BE', '× 0.01 °C (0x3110)'],
    ['[17–18]','D+14,15', 'Device Temp',     'uint16 BE', '× 0.01 °C (0x3111)'],
    ['[19–20]','D+16,17', 'PV Voltage',      'uint16 BE', '× 0.01 V (0x3100)'],
    ['[21–22]','D+18,19', 'PV Current',      'uint16 BE', '× 0.01 A (0x3101)'],
    ['[23–24]','D+20,21', 'Load Voltage',    'uint16 BE', '× 0.01 V (0x310C)'],
    ['[25–26]','D+22,23', 'Load Current',    'uint16 BE', '× 0.01 A (0x310D)'],
    ['[27]',   'D+24',   'RTC Minutes',      'uint8',     '0–59 (0x9013 D15:D8)'],
    ['[28]',   'D+25',   'RTC Seconds',      'uint8',     '0–59 (0x9013 D7:D0)'],
    ['[29]',   'D+26',   'RTC Day',          'uint8',     '1–31 (0x9014 D15:D8)'],
    ['[30]',   'D+27',   'RTC Hour',         'uint8',     '0–23 (0x9014 D7:D0)']
  ], V
));

// ══════════════════════════════════════════════════════════════════════════════
// Appendix B: Backend Pseudocode
// ══════════════════════════════════════════════════════════════════════════════
content.push(new Paragraph({ children: [new PageBreak()] }));
content.push(createHeading('B. Appendix: Backend Pseudocode (Python)', 2, V));

content.push(richBody([{ text: 'TLV Router', bold: true }]));
content.push(...codeBlock([
  'def parse_modbus_payload(payload: bytes):',
  '    """Parse one or more TLV blocks from an EP 61 MQTT payload."""',
  '    offset, results = 0, []',
  '    while offset < len(payload):',
  '        if offset + 2 > len(payload):',
  '            log_error("Incomplete TLV header"); break',
  '        tag, length = payload[offset], payload[offset + 1]',
  '        offset += 2',
  '        if offset + length > len(payload):',
  '            log_error("TLV value truncated"); break',
  '        value = payload[offset : offset + length]',
  '        offset += length',
  '        if   tag == 0x01 and length == 0x20:',
  '            results.append(parse_weather_station(value))',
  '        elif tag == 0x02 and length in (0x1B, 0x1D):',
  '            results.append(parse_mppt(value, length))',
  '        else:',
  '            log_warning(f"Unknown TLV: tag=0x{tag:02X}, len={length}")',
  '    return results',
]));

content.push(createSpacer(120));
content.push(richBody([{ text: 'MPPT Parser', bold: true }]));
content.push(...codeBlock([
  'def parse_mppt(value: bytes, length: int) -> dict:',
  '    """Parse MPPT TLV value. Supports v1.1 (31B) and v1.0 (27B)."""',
  '    bitmask, data = value[0], value[1:]',
  '    result = {"bitmask": bitmask, "version": "1.1" if length == 0x1D else "1.0"}',
  '    def u16(off):  return (data[off] << 8) | data[off + 1]',
  '    def u32c(off): return u16(off) | (u16(off + 2) << 16)',
  '',
  '    if bitmask & 0x01:                          # R0: Status',
  '        result["battery_status"]  = u16(0)',
  '        result["charging_status"] = u16(2)',
  '        result["discharging_status"] = u16(4)',
  '    if bitmask & 0x02:                          # R1: SOC',
  '        result["soc_percent"] = u16(6)',
  '    if bitmask & 0x04:                          # R2: Batt V/I',
  '        result["battery_voltage_v"] = u16(8) * 0.01',
  '        result["battery_current_a"] = u16(10) * 0.01',
  '    if bitmask & 0x08:                          # R3: Temps',
  '        result["battery_temp_c"] = u16(12) * 0.01',
  '        result["device_temp_c"] = u16(14) * 0.01',
  '    if bitmask & 0x10:                          # R4: PV V/I',
  '        result["pv_voltage_v"] = u16(16) * 0.01',
  '        result["pv_current_a"] = u16(18) * 0.01',
  '    if bitmask & 0x20:                          # R5: Load V/I',
  '        result["load_voltage_v"] = u16(20) * 0.01',
  '        result["load_current_a"] = u16(22) * 0.01',
  '    if bitmask & 0x40:                          # R6: RTC',
  '        result["rtc_minutes"] = data[24]',
  '        result["rtc_seconds"] = data[25]',
  '        if length == 0x1D:                      # v1.1: day + hour',
  '            result["rtc_day"]   = data[26]',
  '            result["rtc_hour"]  = data[27]',
  '    return result'
]));

// ─── Build and write ─────────────────────────────────────────────────────────

async function main() {
  const doc = buildDocument({
    docId: 'WC-MA-DPC-v1.1',
    productName: 'MPPT Modbus Addon',
    docType: 'Data Parsing Specification',
    version: 'B',
    revisionDate: '2026-03-30',
    subtitle: 'Add-On Data Contract between Firmware & Backend Teams (Updated)',
    content,
    includeCoverPage: true,
    includeTOC: true,
    metadata: {
      creator: 'WakeCap Technologies',
      title: 'MPPT Solar Charge Controller — Data Parsing Specification',
      subject: 'MPPT TLV payload parsing contract for EP 61',
      keywords: 'WakeCap, MPPT, Modbus, TLV, parsing, EP 61, contract'
    }
  });

  const buffer = await Packer.toBuffer(doc);
  const outPath = path.resolve(__dirname, 'WC-MA-DPC-v1.1.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Generated:', outPath);
  console.log('Size:', (buffer.length / 1024).toFixed(0), 'KB');
}

main().catch(err => { console.error(err); process.exit(1); });

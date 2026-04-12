/**
 * WC-MA-WO-v1.0 — MPPT Modbus Workflow Overview
 * Generates .docx using WakeCap docx-generator base template
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
} = require(path.resolve(__dirname, '../../templates/docx-generator.js'));

const V = 'B'; // Technical style
const sizes = FONT_SIZES.versionB;

// Helper: monospace code block (simulated with Roboto Mono)
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

// Helper: body text with inline bold segments
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
        color: COLORS.charcoal
      })
    )
  });
}

// ─── Build content ───────────────────────────────────────────────────────────

const content = [];

// ── Section 1: Purpose ──
content.push(createHeading('1. Purpose', 2, V));
content.push(createBodyText(
  'This document provides a concise end-to-end overview of how the WakeCap MODBUS Addon Board communicates with an EPEver MPPT solar charge controller, collects register data, assembles it into a compact TLV packet, and delivers it over the Wirepas mesh network.', V
));
content.push(createBodyText(
  'It is intended for firmware and backend engineers who need to understand the data pipeline without reading source code.', V
));

// ── Section 2: Modbus Basics ──
content.push(createHeading('2. Modbus Basics', 2, V));
content.push(createBodyText(
  'Modbus is an industrial serial protocol originally published by Modicon in 1979. The WakeCap addon uses Modbus RTU (binary-encoded) over an RS-485 physical layer.', V
));

content.push(createHeading('2.1 Key Concepts', 3, V));
content.push(createSpecTable(
  ['Concept', 'Description'],
  [
    ['Master / Slave', 'Addon board is the master (initiates). MPPT controller is the slave (responds).'],
    ['Device ID', 'Each slave has a unique address. EPEver uses Device ID = 0x01.'],
    ['Function Code 0x04', 'Read Input Registers — real-time measurements and status.'],
    ['Function Code 0x03', 'Read Holding Registers — configuration data (e.g., RTC).'],
    ['Register', '16-bit (2-byte) data unit addressed by a 16-bit number.'],
    ['CRC-16', 'Every frame ends with a 2-byte CRC for error detection (poly 0xA001).']
  ], V
));

content.push(createHeading('2.2 Frame Format', 3, V));
content.push(richBody([{ text: 'Request (Master → Slave), 8 bytes:', bold: true }]));
content.push(...codeBlock([
  '[DevID] [FuncCode] [AddrHi] [AddrLo] [CountHi] [CountLo] [CRC_Lo] [CRC_Hi]'
]));
content.push(createSpacer(80));
content.push(richBody([{ text: 'Response (Slave → Master), variable length:', bold: true }]));
content.push(...codeBlock([
  '[DevID] [FuncCode] [ByteCount] [Data ...] [CRC_Lo] [CRC_Hi]'
]));

content.push(createHeading('2.3 Physical Interface', 3, V));
content.push(createSpecTable(
  ['Parameter', 'Value'],
  [
    ['Standard', 'RS-485 (half-duplex, differential pair)'],
    ['Baud Rate', '115,200 bps'],
    ['Data Format', '8N1 (8 data bits, no parity, 1 stop bit)'],
    ['Transceiver', 'MAX485 (or equivalent)'],
    ['TX Pin', 'GPIO 15'],
    ['RX Pin', 'GPIO 14'],
    ['RE Pin', 'GPIO 16 (Receiver Enable — active low)']
  ], V
));

// ── Section 3: System Architecture ──
content.push(new Paragraph({ children: [new PageBreak()] }));
content.push(createHeading('3. System Architecture', 2, V));
content.push(createBodyText(
  'The addon board sits between the MPPT controller (RS-485 side) and the Wirepas mesh (radio side). It periodically polls the MPPT, packages the data, and transmits it wirelessly.', V
));
content.push(createSpacer(80));
content.push(...codeBlock([
  '┌─────────────┐    RS-485     ┌─────────────────┐',
  '│   EPEver     │◄────────────►│  WakeCap MODBUS  │',
  '│   MPPT       │   2-wire     │  Addon Board     │',
  '│  Controller  │  half-duplex │  (nRF52832)      │',
  '└─────────────┘               └────────┬─────────┘',
  '                                       │ Wirepas Mesh',
  '                                       │ (2.4 GHz)',
  '                                       ▼',
  '                              ┌─────────────────┐',
  '                              │  Wirepas Mesh    │',
  '                              │  Network         │',
  '                              └────────┬─────────┘',
  '                                       │',
  '                                       ▼',
  '                              ┌─────────────────┐',
  '                              │  Sink Node       │──► UART ──► Gateway ──► MQTT',
  '                              └─────────────────┘'
]));

// ── Section 4: Startup Sequence ──
content.push(createSpacer(200));
content.push(createHeading('4. Startup Sequence', 2, V));
content.push(createNumberedStep(1, 'Hardware init — UART and GPIO pins configured, RS-485 transceiver enabled.', V));
content.push(createNumberedStep(2, 'Auto-detection — Board probes the bus to detect MPPT or Weather Station:', V));
content.push(createBullet('Sends test read to register 0x311A (SOC) with function code 0x04.', 1, V));
content.push(createBullet('Response → MPPT detected. No response → probes 0x0000 with FC 0x03 for Weather Station.', 1, V));
content.push(createBullet('Timeout per probe: 500 ms, up to 3 retries per device type.', 1, V));
content.push(createNumberedStep(3, 'Scheduler start — Periodic polling task registered: 10 s initial delay, then every 60 seconds.', V));

// ── Section 5: Register Polling ──
content.push(new Paragraph({ children: [new PageBreak()] }));
content.push(createHeading('5. Register Polling Sequence', 2, V));
content.push(createBodyText(
  'Each poll cycle reads 7 register groups sequentially from the MPPT controller:', V
));
content.push(createSpecTable(
  ['#', 'Group', 'Address', 'FC', 'Regs', 'Bytes', 'Description'],
  [
    ['R0', 'Status',      '0x3200', '0x04', '3', '6', 'Battery / Charging / Discharging status'],
    ['R1', 'SOC',         '0x311A', '0x04', '1', '2', 'Battery state of charge (%)'],
    ['R2', 'Battery V/I', '0x331A', '0x04', '2', '4', 'Battery voltage and current'],
    ['R3', 'Temps',       '0x3110', '0x04', '2', '4', 'Battery temp and device temp'],
    ['R4', 'PV V/I',      '0x3100', '0x04', '2', '4', 'PV array voltage and current'],
    ['R5', 'Load V/I',    '0x310C', '0x04', '2', '4', 'Load output voltage and current'],
    ['R6', 'RTC',         '0x9013', '0x03', '1', '2', 'Real-time clock (minutes:seconds)']
  ], V
));

content.push(createHeading('5.1 Timing Per Register', 3, V));
content.push(createSpecTable(
  ['Parameter', 'Value'],
  [
    ['TX frame duration', '~0.7 ms (8 bytes at 115,200 baud)'],
    ['Response timeout', '150 ms per register'],
    ['Inter-register gap', '100 ms'],
    ['Time per register', '~250 ms (typical)'],
    ['Total poll time (7 registers)', '~1.75 seconds worst-case']
  ], V
));

content.push(createHeading('5.2 RS-485 Direction Switching', 3, V));
content.push(createNumberedStep(1, 'Assert RE high — enables transmitter, disables receiver.', V));
content.push(createNumberedStep(2, 'Send 8-byte request frame (IRQ disabled during TX for clean timing).', V));
content.push(createNumberedStep(3, 'Wait ~120 µs — transceiver settling time.', V));
content.push(createNumberedStep(4, 'Assert RE low — enables receiver, disables transmitter.', V));
content.push(createNumberedStep(5, 'Receive response bytes. Inter-frame gap (~2 ms idle) = end of frame.', V));
content.push(createNumberedStep(6, 'Validate CRC against last 2 bytes of received data.', V));

// ── Section 6: TLV Packet Construction ──
content.push(new Paragraph({ children: [new PageBreak()] }));
content.push(createHeading('6. TLV Packet Construction', 2, V));
content.push(createBodyText(
  'After all 7 registers are polled, their data is assembled into a single 29-byte TLV (Tag-Length-Value) packet:', V
));

content.push(createHeading('6.1 Packet Layout', 3, V));
content.push(createSpecTable(
  ['Byte', 'Field', 'Size', 'Value'],
  [
    ['0',     'TAG',       '1 B',  '0x02'],
    ['1',     'LENGTH',    '1 B',  '0x1B (27)'],
    ['2',     'BITMASK',   '1 B',  'Bit N = register N success'],
    ['3–8',   'R0 Status', '6 B',  'Battery + Charging + Discharging status'],
    ['9–10',  'R1 SOC',    '2 B',  'State of charge (%)'],
    ['11–14', 'R2 Batt V/I', '4 B', 'Battery voltage + current'],
    ['15–18', 'R3 Temps',  '4 B',  'Battery temp + device temp'],
    ['19–22', 'R4 PV V/I', '4 B',  'PV voltage + current'],
    ['23–26', 'R5 Load V/I', '4 B', 'Load voltage + current'],
    ['27–28', 'R6 RTC',    '2 B',  'Minutes (high byte) + Seconds (low byte)']
  ], V
));

content.push(createHeading('6.2 Bitmask', 3, V));
content.push(...codeBlock([
  'Bit:  7     6     5     4     3     2     1     0',
  '      Rsvd  R6    R5    R4    R3    R2    R1    R0',
  '            RTC   Load  PV    Temp  Batt  SOC   Status'
]));
content.push(createSpacer(80));
content.push(createCalloutBox('note',
  'Bit = 1 means register data is valid. Bit = 0 means the read failed and the data bytes are zero-filled. Always check the bitmask before interpreting values.', V
));

content.push(createHeading('6.3 Data Encoding', 3, V));
content.push(createBodyText('All 16-bit values are stored big-endian (MSB first). Scaling:', V));
content.push(createSpecTable(
  ['Field', 'Bytes', 'Scaling', 'Unit'],
  [
    ['Battery Status',    '3–4',   'Bitfield',     '—'],
    ['Charging Status',   '5–6',   'Bitfield',     '—'],
    ['Discharging Status','7–8',   'Bitfield',     '—'],
    ['SOC',               '9–10',  'Direct (×1)',   '%'],
    ['Battery Voltage',   '11–12', 'Raw × 0.01',   'V'],
    ['Battery Current',   '13–14', 'Raw × 0.01',   'A'],
    ['Battery Temp',      '15–16', 'Raw × 0.01',   '°C'],
    ['Device Temp',       '17–18', 'Raw × 0.01',   '°C'],
    ['PV Voltage',        '19–20', 'Raw × 0.01',   'V'],
    ['PV Current',        '21–22', 'Raw × 0.01',   'A'],
    ['Load Voltage',      '23–24', 'Raw × 0.01',   'V'],
    ['Load Current',      '25–26', 'Raw × 0.01',   'A'],
    ['RTC Minutes',       '27',    'Direct',        'min'],
    ['RTC Seconds',       '28',    'Direct',        'sec']
  ], V
));

// ── Section 7: Mesh Delivery ──
content.push(new Paragraph({ children: [new PageBreak()] }));
content.push(createHeading('7. Mesh Delivery', 2, V));

content.push(createHeading('7.1 Wirepas Endpoints', 3, V));
content.push(createSpecTable(
  ['Endpoint', 'Size', 'Content'],
  [
    ['EP 61 (Data)',  '29 bytes', 'TLV packet — Tag + Length + Bitmask + 26 data bytes'],
    ['EP 65 (Error)', '3 bytes',  'LED state + timeout count + CRC error count']
  ], V
));

content.push(createHeading('7.2 Error Status Packet (EP 65)', 3, V));
content.push(createSpecTable(
  ['Byte', 'Field', 'Range', 'Meaning'],
  [
    ['0', 'LED State',       '0–2',   '0 = Normal, 1 = Problem, 2 = Critical'],
    ['1', 'Timeout Count',   '0–255', 'Register timeouts since last report (resets after send)'],
    ['2', 'CRC Error Count', '0–255', 'CRC failures since last report (resets after send)']
  ], V
));

content.push(createHeading('7.3 Backend Path', 3, V));
content.push(...codeBlock([
  'Addon Board → Wirepas Mesh → Sink Node → UART/SLIP → Gateway → MQTT → Backend'
]));
content.push(createSpacer(60));
content.push(richBody([
  { text: 'MQTT Topic: ', bold: true },
  { text: '<env>/gw-event/received_data/<gw-id>/<sink-id>/<net_id>/61/61', mono: true }
]));

// ── Section 8: Error Handling ──
content.push(createHeading('8. Error Handling', 2, V));
content.push(createSpecTable(
  ['Error Type', 'Detection', 'Recovery'],
  [
    ['No response (timeout)', '150 ms timer expires', 'Zero-fill register, clear bitmask bit, increment counter'],
    ['CRC mismatch', 'Calculated ≠ received CRC', 'Discard response, zero-fill, increment CRC counter'],
    ['UART framing error', 'Hardware flags (overrun, break)', 'Treated as timeout'],
    ['Device not found', 'Auto-detect fails (3 retries)', 'Default to MPPT, LED = Critical']
  ], V
));

// ── Section 9: Timeline ──
content.push(createHeading('9. Complete Poll Cycle Timeline', 2, V));
content.push(createSpecTable(
  ['Phase', 'Duration'],
  [
    ['Boot + auto-detect', '~3 seconds'],
    ['Initial delay before first poll', '10 seconds'],
    ['Poll all 7 registers', '~1.75 seconds'],
    ['TLV assembly', '< 1 ms'],
    ['Wirepas mesh transmit (queuing)', '< 1 ms'],
    ['LED blink indication', '~300 ms'],
    ['Idle until next poll', '~58 seconds'],
    ['Total cycle interval', '60 seconds']
  ], V
));

// ── Section 10: Quick Reference ──
content.push(new Paragraph({ children: [new PageBreak()] }));
content.push(createHeading('10. Quick Reference', 2, V));
content.push(createSpecTable(
  ['Constant', 'Value'],
  [
    ['TLV Tag',           '0x02'],
    ['TLV Length',        '0x1B (27 bytes)'],
    ['Total Packet Size', '29 bytes'],
    ['Data Endpoint',     'EP 61'],
    ['Error Endpoint',    'EP 65'],
    ['Poll Interval',     '60 seconds'],
    ['Modbus Device ID',  '0x01'],
    ['Baud Rate',         '115,200 bps']
  ], V
));

content.push(createSpacer(200));
content.push(createHeading('Related Documents', 2, V));
content.push(createSpecTable(
  ['Document', 'ID'],
  [
    ['MPPT Data Parsing Contract', 'WC-MA-DPC-v1.0'],
    ['EPEver Solar Controller Protocol', 'Protocol v2.5 (manufacturer)'],
    ['Wirepas Mesh SDK Documentation', 'Wirepas SDK']
  ], V
));

// ─── Build and write ─────────────────────────────────────────────────────────

async function main() {
  const doc = buildDocument({
    docId: 'WC-MA-WO-v1.0',
    productName: 'MPPT Modbus Addon',
    docType: 'Workflow Overview',
    version: 'B',
    revisionDate: '2026-03-09',
    subtitle: 'End-to-End Data Pipeline Reference',
    content,
    includeCoverPage: true,
    includeTOC: true,
    metadata: {
      creator: 'WakeCap Technologies',
      title: 'MPPT Modbus Workflow Overview',
      subject: 'Modbus RTU to Wirepas Mesh data pipeline',
      keywords: 'WakeCap, MPPT, Modbus, TLV, Wirepas, EP 61, addon'
    }
  });

  const buffer = await Packer.toBuffer(doc);
  const outPath = path.resolve(__dirname, 'WC-MA-WO-v1.0.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Generated:', outPath);
}

main().catch(err => { console.error(err); process.exit(1); });

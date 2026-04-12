/**
 * WC-MA-SD-v1.0 — MPPT Modbus System Documentation
 * Generates .docx using WakeCap docx-generator base template
 * Content faithfully matches WC-MA-SD-v1.0.md (all 20 sections)
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

// --- Build content --------------------------------------------------------

const content = [];

// ==========================================================================
// Section 1: System Overview
// ==========================================================================
content.push(createHeading('1. System Overview', 2, V));
content.push(createBodyText(
  'The WakeCap Modbus addon board (wc_addon_v10) is an industrial IoT bridge that polls Modbus RTU devices over RS485 and forwards the data into a Wirepas mesh network.', V
));

content.push(richBody([{ text: 'Supported devices:', bold: true }]));
content.push(createBullet('MPPT Solar Charge Controllers: EPEver (Tracer/xtra), SRNE/Renogy/PowMr, Growatt SPF', 0, V));
content.push(createBullet('Weather Stations: Davis Vantage or similar (sequential register read + channel remap)', 0, V));

content.push(richBody([{ text: 'System Diagram:', bold: true }]));
content.push(...codeBlock([
  '+----------------+    RS485 (115200/9600)    +---------------------+',
  '| MPPT / WS      |<------------------------->| WakeCap Addon       |',
  '| Controller     |    Modbus RTU             | Board (nRF52832)    |',
  '|                |    2-wire half-duplex      | wc_addon_v10        |',
  '+----------------+                           +----------+----------+',
  '                                                        | Wirepas Mesh',
  '                                                        | (2.4 GHz)',
  '                                                        v',
  '                                              +-----------------+',
  '                                              | Wirepas Mesh    |',
  '                                              | Network         |',
  '                                              +--------+--------+',
  '                                                       |',
  '                                                       v',
  '                                              +-----------------+     USB      +----------+',
  '                                              | Sink Node       |------------>| Gateway  |',
  '                                              | (COM3)          |  DualMCU    |          |',
  '                                              +-----------------+  125000 bd  +-----+----+',
  '                                                                                    | MQTT',
  '                                                                                    v',
  '                                                                            +--------------+',
  '                                                                            |   Backend    |',
  '                                                                            |   (Cloud)    |',
  '                                                                            +--------------+',
]));
content.push(createSpacer(60));

content.push(richBody([{ text: 'Data endpoints:', bold: true }]));
content.push(createBullet('EP 61: Modbus register data (TLV-encoded)', 0, V));
content.push(createBullet('EP 65: Error status reports (3-byte fixed format)', 0, V));

content.push(richBody([{ text: 'MQTT topic:', bold: true }]));
content.push(...codeBlock([
  '<env>/gw-event/received_data/<gw-id>/<sink-id>/<net_id>/61/61'
]));

// ==========================================================================
// Section 2: Hardware Architecture
// ==========================================================================
content.push(new Paragraph({ children: [new PageBreak()] }));
content.push(createHeading('2. Hardware Architecture', 2, V));

content.push(createHeading('2.1  Board: wc_addon_v10', 3, V));
content.push(createSpecTable(
  ['Parameter', 'Value'],
  [
    ['MCU', 'nRF52832 (ARM Cortex-M4F, 64 MHz)'],
    ['Flash (app)', '40 KB (30.9 KB used, 75.5%)'],
    ['RAM (app)', '8,184 B (5,136 B used, 62.8%)'],
    ['Mesh Stack', 'Wirepas v5.x'],
    ['Radio', '2.4 GHz (Wirepas mesh)'],
    ['Power', '2-pin screw terminal (U+, GND)'],
  ], V
));

content.push(createHeading('2.2  RS485 Interface', 3, V));
content.push(createSpecTable(
  ['Pin', 'GPIO', 'Function'],
  [
    ['TX', '15', 'UART transmit to RS485 transceiver'],
    ['RX', '14', 'UART receive from RS485 transceiver'],
    ['RE', '16', 'Direction control: HIGH=TX mode, LOW=RX mode'],
  ], V
));
content.push(createSpacer(60));
content.push(createSpecTable(
  ['Parameter', 'Value'],
  [
    ['Transceiver', 'MAX485 or equivalent'],
    ['Mode', 'Half-duplex (2-wire)'],
    ['Baud rate', '115200 (EPEver) or 9600 (SRNE/Growatt)'],
    ['Data format', '8N1 (8 data, no parity, 1 stop)'],
    ['Flow control', 'Disabled'],
    ['TX/RX buffers', '256 bytes each'],
  ], V
));

content.push(createHeading('2.3  Status LED', 3, V));
content.push(createSpecTable(
  ['Pin', 'GPIO', 'Function'],
  [
    ['LED', '20', 'Active-low status indicator'],
  ], V
));
content.push(createSpacer(60));
content.push(createSpecTable(
  ['Pattern', 'Meaning'],
  [
    ['Single blink (100ms)', 'Normal -- poll cycle completed'],
    ['Double blink', 'Problem -- device timeout'],
    ['Rapid blink (5 sec)', 'Critical -- hardware/init failure'],
  ], V
));

// ==========================================================================
// Section 3: Firmware Architecture
// ==========================================================================
content.push(new Paragraph({ children: [new PageBreak()] }));
content.push(createHeading('3. Firmware Architecture', 2, V));

content.push(createHeading('3.1  Module Hierarchy', 3, V));
content.push(...codeBlock([
  '+----------------------------------------------------------------+',
  '|                    wakecap_app.c                                |',
  '|                    (Application entry point)                     |',
  '|                    calls modbus_addon_hybrid_init()              |',
  '+----------------------------+-----------------------------------+',
  '                             |',
  '+----------------------------v-----------------------------------+',
  '|              wc_addon_modbus.h / .c  (Core Layer)              |',
  '|                                                                |',
  '|  - modbus_build_request()     <- ONE shared request builder    |',
  '|  - modbus_crc16_calculate()   <- CRC-16/MODBUS                |',
  '|  - modbus_addon_hybrid_init() <- NFC override + auto-detect   |',
  '|  - modbus_addon_auto_detect() <- probe known registers         |',
  '|  - modbus_push_data()         <- send to EP 61                |',
  '|  - LED indication + error tracking                             |',
  '+---+----------------+----------------+-----------------+--------+',
  '    |                |                |                 |',
  '+---v------+   +----v------+   +----v----------+  +--v-----------+',
  '| MPPT     |   | Weather   |   | Vendor        |  | Modbus       |',
  '| mppt.h/c |   | Station   |   | Profiles      |  | Driver       |',
  '|          |   | ws.h/c    |   | profiles.h/c  |  | wc_modbus    |',
  '| Sync     |   |           |   |               |  | .h/.c        |',
  '| poll     |   | Async     |   | EPEver blob   |  |              |',
  '| task     |   | callback  |   | SRNE blob     |  | send_and_    |',
  '| TLV      |   | Remap     |   | Growatt blob  |  | receive()    |',
  '| bitmask  |   | 4 tables  |   | Decoder       |  | Legacy UART  |',
  '+----------+   +-----------+   +---------------+  | IRQ protect  |',
  '                                                   +-------------+',
]));

content.push(createHeading('3.2  Key Design Decisions', 3, V));
content.push(createSpecTable(
  ['Decision', 'Rationale'],
  [
    ['Unified modbus_build_request()', 'One function for WS, MPPT, and auto-detect -- eliminates 3 duplicates'],
    ['Vendor profile blobs in flash', 'Add new manufacturers without changing polling engine'],
    ['One-shot send/receive (MPPT)', 'Precise timing for 7 sequential register reads'],
    ['Async callback (WS)', 'Simpler for single bulk read'],
    ['Legacy UART during Modbus', '120us turnaround; Wirepas UARTE restored after'],
    ['Per-vendor TLV tags', 'Backend knows which parsing contract to apply'],
  ], V
));

// ==========================================================================
// Section 4: Boot & Initialization Sequence
// ==========================================================================
content.push(new Paragraph({ children: [new PageBreak()] }));
content.push(createHeading('4. Boot & Initialization Sequence', 2, V));

content.push(...codeBlock([
  'Power on',
  '  |',
  '  v',
  'Load NFC config from persistent storage',
  '  |  (storageData[1]: poll_interval, vendor_id, remap_id)',
  '  |',
  '  v',
  'modbus_addon_hybrid_init()',
  '  |',
  '  +-- vendor_id set via NFC?',
  '  |    +-- YES -> decode vendor profile blob -> set baud rate -> init',
  '  |',
  '  +-- NO -> auto_detect()',
  '             +-- Probe 0x311A (FC04) at 115200 -> EPEver?',
  '             +-- Probe 0x0000 (FC03) at 115200 -> Weather Station?',
  '             +-- No response -> default MPPT',
  '  |',
  '  v',
  'wc_modbus_set_baudrate(profile.baud_rate)',
  'wc_modbus_init()',
  '  |',
  '  v',
  'modbus_mppt_init(&config) or modbus_ws_init(&clients)',
  '  |',
  '  v',
  'App_Scheduler_addTask(poll_task, ASAP + 10 seconds)',
  '  |',
  '  v',
  'First poll cycle begins',
]));

// ==========================================================================
// Section 5: Modbus RTU Protocol
// ==========================================================================
content.push(new Paragraph({ children: [new PageBreak()] }));
content.push(createHeading('5. Modbus RTU Protocol', 2, V));

content.push(createHeading('5.1  Request Frame (8 bytes)', 3, V));
content.push(...codeBlock([
  '+----------+----------+----------+----------+----------+----------+----------+----------+',
  '| Byte 0   | Byte 1   | Byte 2   | Byte 3   | Byte 4   | Byte 5   | Byte 6   | Byte 7   |',
  '| Slave ID | Func Code| Addr Hi  | Addr Lo  | Count Hi | Count Lo | CRC Lo   | CRC Hi   |',
  '| 0x01     | 0x04     | 0x31     | 0x1A     | 0x00     | 0x01     | 0x69     | 0xFA     |',
  '+----------+----------+----------+----------+----------+----------+----------+----------+',
]));

content.push(createHeading('5.2  Response Frame (variable)', 3, V));
content.push(...codeBlock([
  '+----------+----------+----------+-----------------------+----------+----------+',
  '| Slave ID | Func Code| Byte Cnt | Data (N bytes)        | CRC Lo   | CRC Hi   |',
  '| 0x01     | 0x04     | 0x02     | 0x00 0x4B             | 0x10     | 0xA3     |',
  '+----------+----------+----------+-----------------------+----------+----------+',
  '                                  ^ 0x004B = 75 = SOC 75%',
]));

content.push(createHeading('5.3  CRC-16 Algorithm', 3, V));
content.push(createBullet('Polynomial: 0xA001 (reversed 0x8005)', 0, V));
content.push(createBullet('Initial value: 0xFFFF', 0, V));
content.push(createBullet('Byte order: Little-endian (low byte first in frame)', 0, V));

content.push(createHeading('5.4  Supported Function Codes', 3, V));
content.push(createSpecTable(
  ['Code', 'Name', 'Used By'],
  [
    ['0x03', 'Read Holding Registers', 'Weather Station, SRNE, Growatt (config)'],
    ['0x04', 'Read Input Registers', 'EPEver, Growatt (data)'],
  ], V
));

// ==========================================================================
// Section 6: RS485 Half-Duplex Communication
// ==========================================================================
content.push(new Paragraph({ children: [new PageBreak()] }));
content.push(createHeading('6. RS485 Half-Duplex Communication', 2, V));

content.push(createHeading('6.1  TX->RX Turnaround Timing', 3, V));
content.push(...codeBlock([
  'TX done -+- 100us -+- RS485_RE LOW -+- 10us -+- STARTRX',
  '         | shift   |                | settle  |',
  '         | out     |                |         |',
  '         v         v                v         v',
  'Time:   0us      100us           110us     120us',
  '                                            |',
  '         MPPT responds at ~1-50ms --------->| RECEIVER IS ON',
  '                                              | ALL BYTES CAPTURED',
]));
content.push(createSpacer(60));
content.push(createBodyText('Total turnaround: ~120us (was 2.1ms -- caused 4-byte truncation bug)', V));

content.push(createHeading('6.2  IRQ Protection Strategy', 3, V));
content.push(createSpecTable(
  ['Phase', 'IRQ State', 'Duration', 'Why'],
  [
    ['TX burst (8 bytes)', 'DISABLED', '~700us', 'Prevent inter-byte gaps from Wirepas radio'],
    ['TX->RX turnaround', 'DISABLED', '~120us', 'Atomic switch'],
    ['Response wait', 'ENABLED', '0-150ms', 'Wirepas stack runs freely'],
    ['RX burst (after 1st byte)', 'DISABLED', '~1-3ms', 'Prevent OVERRUN in single-byte register'],
    ['After frame', 'ENABLED', '--', 'Normal operation'],
  ], V
));

content.push(createHeading('6.3  UART Mode Switching', 3, V));
content.push(...codeBlock([
  'WIREPAS MODE (normal):     NRF_UARTE0 (DMA, ENABLE=8)',
  '                                  |',
  '                           Usart_receiverOff()',
  '                                  |',
  'MODBUS MODE (transaction): NRF_UART0 (Legacy, ENABLE=4)',
  '                                  |',
  '                           ... TX/RX ...',
  '                                  |',
  '                           NRF_UARTE0 restored',
  '                                  |',
  'WIREPAS MODE (restored):   Usart_receiverOn()',
]));

// ==========================================================================
// Section 7: MPPT Polling Engine
// ==========================================================================
content.push(new Paragraph({ children: [new PageBreak()] }));
content.push(createHeading('7. MPPT Polling Engine', 2, V));

content.push(createHeading('7.1  Poll Cycle', 3, V));
content.push(...codeBlock([
  'Every 60 seconds (configurable via NFC):',
  '',
  '  For i = 0 to num_registers-1:',
  '    +---------------------------------------------+',
  '    | modbus_build_request(slave_id,              |',
  '    |   registers[i].func_code,                    |',
  '    |   registers[i].address,                      |',
  '    |   registers[i].reg_count, req, &len)         |',
  '    +---------------------+-----------------------+',
  '                          |',
  '    +---------------------v-----------------------+',
  '    | wc_modbus_send_and_receive(req, len,         |',
  '    |   rx_buf, 64, 150ms)                         |',
  '    +---------------------+-----------------------+',
  '                          |',
  '                 rx_count > 0 && CRC valid?',
  '                 +--------+--------+',
  '                YES               NO',
  '                 |                 |',
  '       Copy data to TLV     Zero-fill TLV',
  '       Set bitmask bit      Clear bitmask bit',
  '                 |                 |',
  '                 +--------+--------+',
  '                          |',
  '                 nrf_delay_ms(100)  <- inter-register gap',
  '                 next register...',
  '',
  '  After all registers:',
  '    TLV packet -> modbus_push_data() -> EP 61 -> mesh',
  '    LED blink',
]));

content.push(createHeading('7.2  Timing Budget', 3, V));
content.push(createSpecTable(
  ['Phase', 'Duration'],
  [
    ['TX frame', '~0.7 ms (8 bytes @ 115200)'],
    ['Response wait', '150 ms (timeout)'],
    ['Inter-register gap', '100 ms'],
    ['Per register', '~250 ms typical'],
    ['Full cycle (7 registers)', '~1.75 seconds'],
    ['Idle until next poll', '~58 seconds'],
    ['Total cycle', '60 seconds'],
  ], V
));

// ==========================================================================
// Section 8: TLV Packet Structure
// ==========================================================================
content.push(new Paragraph({ children: [new PageBreak()] }));
content.push(createHeading('8. TLV Packet Structure', 2, V));

content.push(createHeading('8.1  Format', 3, V));
content.push(...codeBlock([
  '+--------+--------+----------+---------------------------------+',
  '| TAG    | LENGTH | BITMASK  | REGISTER DATA (variable)        |',
  '| 1 byte | 1 byte | 1 byte   | N bytes (sum of reg_count x 2)  |',
  '+--------+--------+----------+---------------------------------+',
]));

content.push(createHeading('8.2  Tags Per Device Type', 3, V));
content.push(createSpecTable(
  ['Device', 'Tag', 'Length', 'Total Packet'],
  [
    ['Weather Station', '0x01', '32 (0x20)', '34 bytes'],
    ['EPEver MPPT', '0x02', '29 (0x1D)', '31 bytes'],
    ['SRNE/Renogy MPPT', '0x03', 'variable', 'variable'],
    ['Growatt MPPT', '0x04', 'variable', 'variable'],
  ], V
));

content.push(createHeading('8.3  EPEver Byte Map (31 bytes)', 3, V));
content.push(createSpecTable(
  ['Byte', 'Field', 'Type', 'Notes'],
  [
    ['[0]', 'TAG', 'uint8', '0x02'],
    ['[1]', 'LEN', 'uint8', '0x1D (29)'],
    ['[2]', 'Bitmask', 'uint8', 'Bit N = reg N success'],
    ['[3-4]', 'Battery Status', 'uint16 BE', 'Bitfield (0x3200)'],
    ['[5-6]', 'Charging Status', 'uint16 BE', 'Bitfield (0x3201)'],
    ['[7-8]', 'Discharge Status', 'uint16 BE', 'Bitfield (0x3202)'],
    ['[9-10]', 'SOC', 'uint16 BE', '0-100 % (0x311A)'],
    ['[11-12]', 'Battery Voltage', 'uint16 BE', 'x0.01 V (0x331A)'],
    ['[13-14]', 'Battery Current L', 'uint16 BE', 'x0.01 A (0x331B)'],
    ['[15-16]', 'Battery Temp', 'uint16 BE', 'x0.01 C (0x3110)'],
    ['[17-18]', 'Device Temp', 'uint16 BE', 'x0.01 C (0x3111)'],
    ['[19-20]', 'PV Voltage', 'uint16 BE', 'x0.01 V (0x3100)'],
    ['[21-22]', 'PV Current', 'uint16 BE', 'x0.01 A (0x3101)'],
    ['[23-24]', 'Load Voltage', 'uint16 BE', 'x0.01 V (0x310C)'],
    ['[25-26]', 'Load Current', 'uint16 BE', 'x0.01 A (0x310D)'],
    ['[27]', 'RTC Minutes', 'uint8', '0-59 (0x9013 D15:D8)'],
    ['[28]', 'RTC Seconds', 'uint8', '0-59 (0x9013 D7:D0)'],
    ['[29]', 'RTC Day', 'uint8', '1-31 (0x9014 D15:D8)'],
    ['[30]', 'RTC Hour', 'uint8', '0-23 (0x9014 D7:D0)'],
  ], V
));

content.push(createHeading('8.4  Bitmask Encoding', 3, V));
content.push(...codeBlock([
  'Bit:  7     6     5     4     3     2     1     0',
  '      Rsvd  R6    R5    R4    R3    R2    R1    R0',
  '            RTC   Load  PV    Temp  Batt  SOC   Status',
]));

// ==========================================================================
// Section 9: Vendor Profile System
// ==========================================================================
content.push(new Paragraph({ children: [new PageBreak()] }));
content.push(createHeading('9. Vendor Profile System', 2, V));

content.push(createHeading('9.1  Binary Blob Format (12-byte header + 4 bytes per register)', 3, V));
content.push(...codeBlock([
  '+------+------+------+------+------+------+------+------+------+------+------+------+',
  '|  0   |  1   |  2   |  3   |  4   |  5   |  6   |  7   |  8   |  9   |  10  |  11  |',
  '| ver  |vendor|slave |baud  | tlv  | num  |detect_addr  |det_fc|det_n |flags |rsvd  |',
  '| 0x01 | ID   | ID   | code | tag  | regs | (big-endian)|      |      |      |      |',
  '+------+------+------+------+------+------+------+------+------+------+------+------+',
  '+----------------+------+------+',
  '| address (2B)   |  FC  |count |  x num_registers',
  '| (big-endian)   |      |      |',
  '+----------------+------+------+',
]));

content.push(createHeading('9.2  Compiled Profiles', 3, V));
content.push(createSpecTable(
  ['Vendor', 'ID', 'Baud', 'TLV Tag', 'Registers', 'Detect Reg', 'Blob Size'],
  [
    ['EPEver', '0', '115200', '0x02', '7', '0x311A (FC04)', '40 bytes'],
    ['SRNE/Renogy', '1', '9600', '0x03', '7', '0x0100 (FC03)', '40 bytes'],
    ['Growatt', '2', '9600', '0x04', '6', '0x0000 (FC04)', '36 bytes'],
  ], V
));

content.push(createHeading('9.3  Adding a New Vendor', 3, V));
content.push(createNumberedStep(1, 'Add static const uint8_t PROFILE_NEW[] blob to modbus_vendor_profiles.h', V));
content.push(createNumberedStep(2, 'Add entry to profile_table[] in .c', V));
content.push(createNumberedStep(3, 'Increment NUM_VENDOR_PROFILES', V));
content.push(createNumberedStep(4, 'Rebuild firmware', V));
content.push(createNumberedStep(5, 'Or use /modbus-add-manufacturer <name> skill to automate', V));

// ==========================================================================
// Section 10: EPEver Register Map
// ==========================================================================
content.push(new Paragraph({ children: [new PageBreak()] }));
content.push(createHeading('10. EPEver Register Map', 2, V));

content.push(createHeading('10.1  Register Groups (per MODBUS-Protocol-v25.pdf)', 3, V));
content.push(createSpecTable(
  ['Group', 'Address', 'FC', 'Regs', 'Bytes', 'Description', 'Scaling'],
  [
    ['R0', '0x3200', '0x04', '3', '6', 'Battery/Charge/Discharge status', 'Bitfield'],
    ['R1', '0x311A', '0x04', '1', '2', 'Battery SOC', 'Direct %'],
    ['R2', '0x331A', '0x04', '2', '4', 'Battery voltage + current', 'x0.01 V/A'],
    ['R3', '0x3110', '0x04', '2', '4', 'Battery temp + device temp', 'x0.01 C'],
    ['R4', '0x3100', '0x04', '2', '4', 'PV voltage + current', 'x0.01 V/A'],
    ['R5', '0x310C', '0x04', '2', '4', 'Load voltage + current', 'x0.01 V/A'],
    ['R6', '0x9013', '0x03', '2', '4', 'RTC (min:sec + day:hour)', 'Packed byte'],
  ], V
));

content.push(createHeading('10.2  Status Bit Definitions', 3, V));

content.push(richBody([{ text: 'R0.a -- Battery Status (0x3200):', bold: true }]));
content.push(createSpecTable(
  ['Bits', 'Meaning', 'Values'],
  [
    ['3:0', 'Voltage status', '0=Normal, 1=Over-V, 2=Under-V, 3=Over-discharge, 4=Fault'],
    ['7:4', 'Temperature status', '0=Normal, 1=Over Temp, 2=Low Temp'],
    ['8', 'Internal resistance', '0=Normal, 1=Abnormal'],
    ['15', 'Rated voltage ID', '0=Correct, 1=Wrong'],
  ], V
));

content.push(richBody([{ text: 'R0.b -- Charging Status (0x3201):', bold: true }]));
content.push(createSpecTable(
  ['Bits', 'Meaning', 'Values'],
  [
    ['0', 'Running', '0=Standby, 1=Running'],
    ['1', 'Fault', '0=Normal, 1=Fault'],
    ['3:2', 'Charge mode', '0=Not charging, 1=Float, 2=Boost, 3=Equalize'],
    ['15:14', 'Input voltage', '0=Normal, 1=No input, 2=High, 3=Error'],
  ], V
));

// ==========================================================================
// Section 11: Weather Station Implementation
// ==========================================================================
content.push(new Paragraph({ children: [new PageBreak()] }));
content.push(createHeading('11. Weather Station Implementation', 2, V));

content.push(createHeading('11.1  Configuration', 3, V));
content.push(createBullet('Function code: 0x03 (Read Holding Registers)', 0, V));
content.push(createBullet('Start register: 0x0000', 0, V));
content.push(createBullet('Register count: 16 (32 bytes of data)', 0, V));
content.push(createBullet('Polling: Async with callback + 5-second timeout monitor', 0, V));

content.push(createHeading('11.2  Channel Remapping', 3, V));
content.push(createBodyText(
  '4 remap configurations selectable via NFC (remap_id 0-3). Each maps 16 input channels to 16 output positions. Invalid channels encoded as 0x7FFF.', V
));

content.push(createHeading('11.3  TLV Output', 3, V));
content.push(...codeBlock([
  '[TAG=slave_id][LEN=32][CH1_HI][CH1_LO]...[CH16_HI][CH16_LO]',
]));

// ==========================================================================
// Section 12: NFC Configuration
// ==========================================================================
content.push(new Paragraph({ children: [new PageBreak()] }));
content.push(createHeading('12. NFC Configuration', 2, V));

content.push(createHeading('12.1  Format', 3, V));
content.push(...codeBlock([
  'modbus=PPPPRRV',
  '',
  '  PPPP = poll interval in seconds (4 digits, e.g., "0060" = 60s)',
  '  RR   = remap ID (2 digits, 0-3, WS only)',
  '  V    = vendor ID (1 digit: 0=EPEver, 1=SRNE, 2=Growatt)',
]));

content.push(createHeading('12.2  Examples', 3, V));
content.push(createSpecTable(
  ['NFC String', 'Poll', 'Remap', 'Vendor', 'Effect'],
  [
    ['modbus=0060000', '60s', '0', 'EPEver', 'Default EPEver at 115200'],
    ['modbus=0060001', '60s', '0', 'SRNE', 'SRNE/Renogy at 9600'],
    ['modbus=0030002', '30s', '0', 'Growatt', 'Growatt at 9600, fast poll'],
    ['modbus=00600', '60s', '0', 'EPEver', 'Backward compatible (no V)'],
  ], V
));

content.push(createHeading('12.3  Persistent Storage', 3, V));
content.push(createBodyText(
  'Stored in storageData[1] (32-bit word):', V
));
content.push(createBullet('Bits 31-8: poll_interval_ms (24 bits)', 0, V));
content.push(createBullet('Bits 7-4: vendor_id (4 bits, 0-15)', 0, V));
content.push(createBullet('Bits 3-0: remap_id (4 bits, 0-15)', 0, V));

// ==========================================================================
// Section 13: Error Handling & Diagnostics
// ==========================================================================
content.push(new Paragraph({ children: [new PageBreak()] }));
content.push(createHeading('13. Error Handling & Diagnostics', 2, V));

content.push(createHeading('13.1  Error Report (EP 65)', 3, V));
content.push(...codeBlock([
  '[LED_STATE(1)][TIMEOUT_COUNT(1)][CRC_ERROR_COUNT(1)]',
]));
content.push(createSpacer(60));
content.push(createSpecTable(
  ['Byte', 'Range', 'Meaning'],
  [
    ['0', '0-2', '0=Normal, 1=Problem, 2=Critical'],
    ['1', '0-255', 'Timeout count (resets after report)'],
    ['2', '0-255', 'CRC error count (resets after report)'],
  ], V
));

content.push(createHeading('13.2  UART Error Source', 3, V));
content.push(createBodyText(
  'wc_modbus_get_last_error() returns ERRORSRC register bits:', V
));
content.push(createBullet('Bit 0: OVERRUN (byte arrived before previous read)', 0, V));
content.push(createBullet('Bit 1: PARITY', 0, V));
content.push(createBullet('Bit 2: FRAMING', 0, V));
content.push(createBullet('Bit 3: BREAK', 0, V));

// ==========================================================================
// Section 14: Data Flow -- End to End
// ==========================================================================
content.push(new Paragraph({ children: [new PageBreak()] }));
content.push(createHeading('14. Data Flow -- End to End', 2, V));

content.push(...codeBlock([
  '+---------+  modbus_build_  +----------+  RS485   +------+',
  '| Profile  |--request()---->| UART TX  |--------->| MPPT |',
  '| blob     |                | (8 bytes)|          |      |',
  '+---------+                +----------+          |      |',
  '                                                  |      |',
  '                            +----------+  RS485   |      |',
  '                            | UART RX  |<---------|      |',
  '                            | (7-11 B) |          +------+',
  '                            +----+-----+',
  '                                 | validate CRC',
  '                                 | extract data bytes',
  '                                 v',
  '                            +----------+',
  '                            | TLV wrap |  [TAG][LEN][bitmask][data...]',
  '                            +----+-----+',
  '                                 | modbus_push_data()',
  '                                 v',
  '                            +----------+',
  '                            | EP 61    |  Wirepas Shared_Data_sendData()',
  '                            | mesh TX  |',
  '                            +----+-----+',
  '                                 | 2.4 GHz radio',
  '                                 v',
  '                            +----------+',
  '                            | Sink     |  COM3, 125000 baud',
  '                            | DualMCU  |  SLIP + CRC-16-CCITT',
  '                            +----+-----+',
  '                                 | USB serial',
  '                                 v',
  '                            +----------+',
  '                            | Gateway  |  Protobuf wrapping',
  '                            +----+-----+',
  '                                 | MQTT publish',
  '                                 v',
  '                            +----------+',
  '                            | Backend  |  Parse TLV by tag',
  '                            +----------+',
]));

// ==========================================================================
// Section 15: Debugging History (RCA Summary)
// ==========================================================================
content.push(new Paragraph({ children: [new PageBreak()] }));
content.push(createHeading('15. Debugging History (RCA Summary)', 2, V));

content.push(createHeading('15.1  The Problem', 3, V));
content.push(createBodyText(
  'Field testing showed MPPT responses truncated to exactly 4 bytes (expected 7-11). Direct USB-RS485 probe confirmed MPPT responds correctly.', V
));

content.push(createHeading('15.2  Debugging Attempts', 3, V));
content.push(createSpecTable(
  ['#', 'Hypothesis', 'Action', 'Result'],
  [
    ['1', 'Baud rate mismatch', 'Confirmed 115200', 'Already correct'],
    ['2', 'ISR LOG corruption', 'Removed LOG calls', 'No change'],
    ['3', 'DMA buffer wrap', 'Fixed usart_dma.c', 'No change'],
    ['4', 'APP_PRINTING stealing UART', 'Built with APP_PRINTING=no', 'No change'],
    ['5', 'Encryption key mismatch', 'Removed keys', 'No change'],
    ['6', 'nRF52 UARTE FIFO', 'Added TASKS_FLUSHRX', 'Still 4 bytes'],
    ['7', 'DMA fundamentally broken', 'Rewrote to legacy UART', 'Still 4 bytes'],
    ['8', 'Wirepas interrupts', 'Checked ERRORSRC', 'OVERRUN+BREAK confirmed'],
    ['9', 'TX->RX turnaround', '2.1ms -> 120us + IRQ guard', 'Fix applied'],
    ['10', 'Wrong network', 'Debug NWID != sink NWID', 'Rebuilt production'],
  ], V
));

content.push(createHeading('15.3  Root Causes', 3, V));
content.push(createNumberedStep(1, 'Turnaround delay (2.1ms): RS485 receiver turned on too late -- missed first 3 bytes', V));
content.push(createNumberedStep(2, 'IRQ byte drops: Wirepas radio interrupts caused OVERRUN in legacy UART', V));
content.push(createNumberedStep(3, 'Wrong Wirepas network: Debug build (NWID 0x7E5701) couldn\'t reach production sink (NWID 11111111)', V));

// ==========================================================================
// Section 16: Development Tools
// ==========================================================================
content.push(new Paragraph({ children: [new PageBreak()] }));
content.push(createHeading('16. Development Tools', 2, V));

content.push(createSpecTable(
  ['Tool', 'Command', 'Purpose'],
  [
    ['MPPT Simulator', 'py mppt_simulator.py COM22 --vendor epever', 'Emulate MPPT on USB-RS485'],
    ['Sink Monitor', 'py sink_monitor.py COM3', 'Read mesh data from sink'],
    ['Sink Query', 'py sink_query.py COM3', 'Query sink network config'],
    ['MPPT Parser', '/mppt-parse <hex>', 'Decode TLV packets'],
    ['Add Manufacturer', '/modbus-add-manufacturer <name>', 'Onboard new vendor'],
  ], V
));

// ==========================================================================
// Section 17: Build & Flash
// ==========================================================================
content.push(new Paragraph({ children: [new PageBreak()] }));
content.push(createHeading('17. Build & Flash', 2, V));

content.push(createHeading('17.1  Build', 3, V));
content.push(...codeBlock([
  '# Production network (matches sink)',
  'make app_name=wakecap-asset-nfc target_board=wc_addon_v10 stack_state=1 -j240',
]));
content.push(createSpacer(60));
content.push(richBody([{ text: 'Docker: ', bold: true }, { text: 'wirepas/sdk-builder:v1.2', mono: true }]));

content.push(createHeading('17.2  Flash', 3, V));
content.push(...codeBlock([
  'nrfjprog --recover        # Clear readback protection',
  'nrfjprog --program build/wc_addon_v10/wakecap-asset-nfc/final_image_wakecap-asset-nfc.hex --chiperase --verify',
  'nrfjprog --reset',
]));

content.push(createHeading('17.3  Network Configuration', 3, V));
content.push(createSpecTable(
  ['Setting', 'Production', 'Debug (testing only)'],
  [
    ['NWID', '11111111', '0x7E5701'],
    ['Channel', '11', '37'],
    ['Keys', 'None', 'Debug keys'],
  ], V
));

// ==========================================================================
// Section 18: Appendix A -- File Map
// ==========================================================================
content.push(new Paragraph({ children: [new PageBreak()] }));
content.push(createHeading('18. Appendix A: File Map', 2, V));

content.push(createSpecTable(
  ['File', 'Purpose'],
  [
    ['wc_addon_modbus.h', 'Core: enums, constants, shared API'],
    ['wc_addon_modbus.c', 'Core: CRC, LED, error tracking, hybrid_init, auto-detect, build_request'],
    ['wc_addon_modbus_mppt.h', 'MPPT: config structs, register types'],
    ['wc_addon_modbus_mppt.c', 'MPPT: poll task, TLV aggregation'],
    ['wc_addon_modbus_ws.h', 'WS: remap constants, API'],
    ['wc_addon_modbus_ws.c', 'WS: async poll, callback, remap, TLV'],
    ['modbus_vendor_profiles.h', 'Vendor blobs (EPEver/SRNE/Growatt), format spec'],
    ['modbus_vendor_profiles.c', 'Decoder, baud conversion, profile lookup'],
    ['wc_modbus.h', 'Driver API: init, send, receive'],
    ['wc_modbus.c', 'Driver: legacy UART, IRQ protection, turnaround'],
    ['board.h (wc_addon_v10)', 'Pin definitions, UART config'],
    ['nfc_node_config.c', 'NFC parsing: "modbus=PPPPRRV"'],
    ['wakecap_app.c', 'App entry, persistent storage, hybrid_init call'],
    ['makefile', 'Build config: UART, DMA, source files'],
  ], V
));

// ==========================================================================
// Section 19: Appendix B -- Constants Reference
// ==========================================================================
content.push(new Paragraph({ children: [new PageBreak()] }));
content.push(createHeading('19. Appendix B: Constants Reference', 2, V));

content.push(createSpecTable(
  ['Constant', 'Value', 'File'],
  [
    ['MB_FUNC_READ_HOLD', '0x03', 'wc_addon_modbus.h'],
    ['MB_FUNC_READ_IN', '0x04', 'wc_addon_modbus.h'],
    ['MB_POLL_INTERVAL_MS', '60000', 'wc_addon_modbus.h'],
    ['MODBUS_RESPONSE_TIMEOUT_MS', '5000', 'wc_addon_modbus.h'],
    ['MPPT_MAX_REGISTERS', '16', 'wc_addon_modbus_mppt.h'],
    ['MPPT_MAX_AGGREGATED_DATA', '128', 'wc_addon_modbus_mppt.h'],
    ['MPPT_INTER_REGISTER_DELAY_MS', '100', 'wc_addon_modbus_mppt.h'],
    ['WS_MAX_REMAP_ID', '4', 'wc_addon_modbus_ws.h'],
    ['WS_NUM_REMAP_CHANNELS', '16', 'wc_addon_modbus_ws.h'],
    ['WS_INVALID_CHANNEL', '-1 (0x7FFF)', 'wc_addon_modbus_ws.h'],
    ['VENDOR_ID_EPEVER', '0', 'modbus_vendor_profiles.h'],
    ['VENDOR_ID_SRNE', '1', 'modbus_vendor_profiles.h'],
    ['VENDOR_ID_GROWATT', '2', 'modbus_vendor_profiles.h'],
    ['NUM_VENDOR_PROFILES', '3', 'modbus_vendor_profiles.h'],
    ['BAUD_CODE_9600', '0', 'modbus_vendor_profiles.h'],
    ['BAUD_CODE_115200', '3', 'modbus_vendor_profiles.h'],
    ['AUTO_DETECT_TIMEOUT_MS', '500', 'wc_addon_modbus.c'],
    ['AUTO_DETECT_RETRIES', '3', 'wc_addon_modbus.c'],
  ], V
));

// ==========================================================================
// Section 20: Appendix C -- Git Commit History (Modbus)
// ==========================================================================
content.push(new Paragraph({ children: [new PageBreak()] }));
content.push(createHeading('20. Appendix C: Git Commit History (Modbus)', 2, V));

content.push(createSpecTable(
  ['Date', 'Commit', 'Description'],
  [
    ['2025-03-03', '--', 'Initial modbus addon module (sreejit-wc)'],
    ['2025-03-05', '--', 'UART DMA fix for 9600 baud'],
    ['2025-03-11', '--', 'Working: sends requests, pushes data'],
    ['2025-04-16', '--', 'Add TLV format to response'],
    ['2025-07-17', '--', 'NFC poll interval + remap ID'],
    ['2025-07-20', '--', 'Implement channel remap logic'],
    ['2025-08-07', '--', 'LED indication + EP 65 error reports'],
    ['2025-09-11', '--', 'Remap ID 3'],
    ['2026-03-03', '1456943', 'MPPT verified working -- all 7 registers'],
    ['2026-03-03', '593cfb4', 'TLV aggregated packet (7 packets -> 1)'],
    ['2026-03-09', '5cc2b1f', 'TLV tag 0x01 -> 0x02 (collision fix)'],
    ['2026-03-30', 'ca38f00', 'Dynamic vendor profiles -- multi-manufacturer'],
    ['2026-03-30', '0166ebe', 'Unify request builder -- eliminate 3 duplicates'],
  ], V
));

// --- Footer note ---
content.push(createSpacer(120));
content.push(richBody([
  { text: 'Document generated: 2026-03-31 | Firmware V4.0 | Board: wc_addon_v10', muted: true, italics: true },
]));
content.push(richBody([
  { text: 'WC-MA-SD-v1.0 | WakeCap Technologies', muted: true, italics: true },
]));

// --- Build and write --------------------------------------------------------

async function main() {
  const doc = buildDocument({
    docId: 'WC-MA-SD-v1.0',
    productName: 'MPPT Modbus Addon',
    docType: 'System Documentation',
    version: 'B',
    revisionDate: '2026-03-31',
    subtitle: 'Complete Technical Reference for Firmware & Backend Teams',
    content,
    includeCoverPage: true,
    includeTOC: true,
    metadata: {
      creator: 'WakeCap Technologies',
      title: 'MPPT Modbus Addon Board -- System Documentation',
      subject: 'Complete technical reference for the MPPT Modbus addon board',
      keywords: 'WakeCap, MPPT, Modbus, RS485, nRF52832, Wirepas, addon, system documentation'
    }
  });

  const buffer = await Packer.toBuffer(doc);
  const outPath = path.resolve(__dirname, 'WC-MA-SD-v1.0.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Generated:', outPath);
  console.log('Size:', (buffer.length / 1024).toFixed(0), 'KB');
}

main().catch(err => { console.error(err); process.exit(1); });

# Interface Control Document Template Instructions

This document defines the structure and content requirements for WakeCap Interface Control Documents.

---

## Purpose

Interface Control Documents (ICDs) provide complete integration specifications for each interface on a WakeCap product. They enable third-party integrators, OEMs, and internal teams to implement correct communication with WakeCap devices without guesswork, covering electrical details, protocol specifications, data models, and example transactions.

---

## Target Audience

- Integration engineers
- Firmware and software developers
- System architects
- Test and validation engineers
- Third-party OEM partners

---

## Document Characteristics

| Attribute | Specification |
|-----------|---------------|
| Typical Length | 10-30 pages |
| Orientation | Portrait (A4 or Letter) |
| Primary Content | Rigid tables, versioned interfaces, examples, test vectors |
| Layout | Rigid tables; versioned interfaces |
| Hero Content | Examples and test vectors |
| Image Ratio | 25% visual (sequence diagrams, message flows), 75% data |

---

## Document Structure

### Cover Page

```
┌──────────────────────────────────────────────────┐
│  [WakeCap Logo - top left, 20mm]                 │
│                                                  │
│  ─────────────────────────────────────────────── │
│                                                  │
│  INTERFACE CONTROL DOCUMENT             ← H2     │
│                                                  │
│  [Product Name]                         ← H1     │
│  [Interface Name / Scope]               ← H3     │
│                                                  │
│  Document: [DOC-ID]                              │
│  Revision: [VERSION]                             │
│  Date: [DATE]                                    │
│                                                  │
│  ─────────────────────────────────────────────── │
│  CONFIDENTIAL - INTERNAL USE ONLY                │
└──────────────────────────────────────────────────┘
```

---

### Required Sections

#### 1. Purpose and Scope

```
1. PURPOSE AND SCOPE

1.1 Purpose
This document defines the interface specification for
[interface name] on the [Product Name]. It provides all
information necessary for a qualified engineer to implement
correct communication with the device.

1.2 Scope
This ICD covers:
• [Interface 1 - e.g., RS485 / MODBUS RTU]
• [Interface 2 - e.g., BLE configuration]
• [Interface 3 - if applicable]

This ICD does NOT cover:
• [Out-of-scope item 1]
• [Out-of-scope item 2]

1.3 Applicable Documents

| # | Document | ID | Version |
|---|----------|----|---------|
| 1 | Product Manual | WC-[PRODUCT]-PM-vX.X | [TBD] |
| 2 | Technical Reference | WC-[PRODUCT]-TR-vX.X | [TBD] |
| 3 | [Protocol standard] | [TBD] | [TBD] |

1.4 Terminology

| Term | Definition |
|------|-----------|
| Master | The device initiating communication requests |
| Slave | The WakeCap device responding to requests |
| [Term] | [Definition] |
```

#### 2. Interface Summary Table

```
2. INTERFACE SUMMARY

| # | Interface | Type | Protocol | Direction | Connector | Section |
|---|-----------|------|----------|-----------|-----------|---------|
| 1 | [IF-1] | [TBD] | [TBD] | [TBD] | [TBD] | §3 |
| 2 | [IF-2] | [TBD] | [TBD] | [TBD] | [TBD] | §4 |
```

#### 3. Electrical Details

```
3. ELECTRICAL SPECIFICATION

3.1 [Interface 1] Electrical Characteristics

| Parameter | Symbol | Min | Typ | Max | Unit |
|-----------|--------|-----|-----|-----|------|
| Line Voltage (High) | VA | [TBD] | — | [TBD] | V |
| Line Voltage (Low) | VB | [TBD] | — | [TBD] | V |
| Differential Voltage | VAB | [TBD] | — | [TBD] | V |
| Input Impedance | ZIN | [TBD] | — | — | Ω |
| Max Cable Length | L | — | — | [TBD] | m |

3.2 Pinout

[IMAGE: Connector pinout diagram with pin numbering]

| Pin | Name | Direction | Description |
|-----|------|-----------|-------------|
| 1 | A / D+ | Bidirectional | Non-inverting data line |
| 2 | B / D- | Bidirectional | Inverting data line |
| 3 | GND | — | Signal ground |

3.3 Cable Requirements

| Parameter | Specification |
|-----------|---------------|
| Cable Type | [TBD] (e.g., shielded twisted pair) |
| Characteristic Impedance | [TBD] Ω |
| Max Length | [TBD] m |
| Shield Grounding | [TBD] (e.g., ground at one end only) |

3.4 Termination
[Bus termination requirements: resistor values, placement]
```

#### 4. Protocol Specification

```
4. PROTOCOL SPECIFICATION

4.1 Protocol Overview

| Parameter | Value |
|-----------|-------|
| Protocol | [TBD] (e.g., MODBUS RTU) |
| Physical Layer | [TBD] (e.g., RS485) |
| Baud Rate | [TBD] (e.g., 9600) |
| Data Bits | [TBD] |
| Parity | [TBD] |
| Stop Bits | [TBD] |
| Byte Order | [TBD] (e.g., Big-endian) |
| Word Order | [TBD] (e.g., High word first) |
| Default Address | [TBD] |
| Address Range | [TBD] to [TBD] |

4.2 Supported Functions

| Function Code | Name | Access | Description |
|---------------|------|--------|-------------|
| 0x03 | Read Holding Registers | Read | Read measurement data |
| 0x04 | Read Input Registers | Read | Read status data |
| 0x06 | Write Single Register | Write | Set configuration |
| 0x10 | Write Multiple Registers | Write | Set configuration |

4.3 Frame Format

REQUEST FRAME:
| Byte | Field | Length | Description |
|------|-------|--------|-------------|
| 0 | Slave Address | 1 | Device address |
| 1 | Function Code | 1 | Operation code |
| 2-3 | Start Register | 2 | First register address |
| 4-5 | Register Count | 2 | Number of registers |
| 6-7 | CRC | 2 | Error check (CRC-16) |

RESPONSE FRAME:
| Byte | Field | Length | Description |
|------|-------|--------|-------------|
| 0 | Slave Address | 1 | Device address |
| 1 | Function Code | 1 | Echo of request |
| 2 | Byte Count | 1 | Number of data bytes |
| 3-N | Data | Variable | Register values |
| N+1 - N+2 | CRC | 2 | Error check |

4.4 Timing

| Parameter | Min | Typ | Max | Unit |
|-----------|-----|-----|-----|------|
| Inter-frame gap | [TBD] | — | — | ms |
| Response timeout | — | — | [TBD] | ms |
| Retry delay | [TBD] | — | — | ms |
| Max retries | — | — | [TBD] | — |

[IMAGE: Timing diagram showing request-response cycle]
```

#### 5. Data Model

```
5. DATA MODEL

5.1 Register Map

| Address | Name | Type | Width | Scale | Unit | Access | Description |
|---------|------|------|-------|-------|------|--------|-------------|
| 0x0000 | [TBD] | UINT16 | 1 | ×0.1 | [unit] | R | [TBD] |
| 0x0001 | [TBD] | INT16 | 1 | ×0.01 | [unit] | R | [TBD] |
| 0x0002 | [TBD] | UINT32 | 2 | ×1 | [unit] | R | [TBD] |

TYPE DEFINITIONS:
• UINT16 = Unsigned 16-bit integer (1 register)
• INT16 = Signed 16-bit integer (1 register)
• UINT32 = Unsigned 32-bit integer (2 registers, high word first)
• FLOAT32 = IEEE 754 float (2 registers)

5.2 Scaling and Conversion

To convert a raw register value to engineering units:

  Engineering Value = Raw Value × Scale Factor

Example: Temperature register (0x0001) reads 0x00FA (250 decimal)
  Temperature = 250 × 0.1 = 25.0 °C

5.3 Status and Configuration Registers

| Address | Name | Bit | Description | Values |
|---------|------|-----|-------------|--------|
| 0x0010 | Status | 0 | Sensor 1 valid | 0=invalid, 1=valid |
| 0x0010 | Status | 1 | Sensor 2 valid | 0=invalid, 1=valid |
| 0x0010 | Status | 2 | Comm OK | 0=error, 1=OK |
| 0x0011 | Config | 0-7 | Device address | 1-247 |
| 0x0011 | Config | 8-15 | Baud rate code | See §5.4 |

5.4 Enumeration Tables

BAUD RATE CODES:
| Code | Baud Rate |
|------|-----------|
| 0 | 9600 |
| 1 | 19200 |
| 2 | 38400 |
| 3 | 115200 |
```

#### 6. Error Handling

```
6. ERROR HANDLING

6.1 Exception Responses

| Exception Code | Name | Cause |
|----------------|------|-------|
| 0x01 | Illegal Function | Function code not supported |
| 0x02 | Illegal Data Address | Register address out of range |
| 0x03 | Illegal Data Value | Write value out of range |
| 0x04 | Slave Device Failure | Internal device error |

EXCEPTION RESPONSE FRAME:
| Byte | Field | Value |
|------|-------|-------|
| 0 | Slave Address | [Address] |
| 1 | Function Code | Original + 0x80 |
| 2 | Exception Code | See table above |
| 3-4 | CRC | CRC-16 |

6.2 Communication Failures

| Failure | Detection | Recovery |
|---------|-----------|----------|
| No response | Timeout ([X] ms) | Retry up to [X] times |
| CRC error | CRC mismatch | Discard and retry |
| Framing error | Invalid frame | Discard and retry |
```

#### 7. Example Transactions and Test Vectors

```
7. EXAMPLES AND TEST VECTORS

7.1 Read Measurement Data

REQUEST (read 3 registers starting at 0x0000, device address 1):
  Hex: 01 03 00 00 00 03 05 CB

  | Field | Hex | Decimal |
  |-------|-----|---------|
  | Address | 01 | 1 |
  | Function | 03 | Read Holding Registers |
  | Start Reg | 00 00 | 0 |
  | Count | 00 03 | 3 |
  | CRC | 05 CB | — |

RESPONSE:
  Hex: 01 03 06 00 FA 01 2C 03 E8 [CRC]

  | Register | Hex | Raw | Scale | Value | Unit |
  |----------|-----|-----|-------|-------|------|
  | 0x0000 | 00 FA | 250 | ×0.1 | 25.0 | °C |
  | 0x0001 | 01 2C | 300 | ×0.1 | 30.0 | % RH |
  | 0x0002 | 03 E8 | 1000 | ×0.1 | 100.0 | [unit] |

7.2 Write Configuration

[Similar worked example for a write operation]

7.3 Error Response

[Worked example of an exception response]

7.4 Test Vectors

| Test | Request (Hex) | Expected Response (Hex) | Pass? |
|------|---------------|------------------------|-------|
| Read reg 0 | 01 03 00 00 00 01 [CRC] | 01 03 02 XX XX [CRC] | ☐ |
| Invalid addr | 01 03 FF FF 00 01 [CRC] | 01 83 02 [CRC] | ☐ |
| Write config | 01 06 00 11 XX XX [CRC] | Echo of request | ☐ |
```

#### 8. Compatibility and Versioning Rules

```
8. COMPATIBILITY AND VERSIONING

8.1 Interface Version History

| ICD Version | FW Version | Changes | Breaking? |
|-------------|------------|---------|-----------|
| 1.0 | [TBD] | Initial release | — |
| 1.1 | [TBD] | Added registers 0x00XX | No |
| 2.0 | [TBD] | Changed scaling on 0x0001 | Yes |

8.2 Backward Compatibility Rules

• New registers MAY be added without a major version bump
• Existing register addresses MUST NOT change meaning
• Scaling factor changes require a major version bump
• Removed registers MUST return exception code 0x02

8.3 Version Detection

To query the interface version:
  Read register 0x[TBD] → returns ICD version as UINT16
  (e.g., 0x0100 = version 1.0, 0x0101 = version 1.1)
```

---

## Image Strategy

| Image Type | Requirement |
|------------|-------------|
| Sequence diagrams | Request-response message flows |
| Timing diagrams | Signal timing and frame structure |
| Connector diagrams | Pinout with pin numbering |

```
[IMAGE: ICD - Sequence diagram showing typical read/write transaction]
[IMAGE: ICD - Timing diagram showing inter-frame gaps and response timeout]
[IMAGE: ICD - Connector pinout diagram]
[IMAGE: ICD - Bus topology diagram (if multi-drop)]
```

---

## Content Rules

1. **Unambiguous** - Every field, value, and behavior must be precisely defined
2. **Include edge cases** - Document what happens with invalid inputs
3. **Worked examples** - Every transaction type needs a hex-level example
4. **Test vectors** - Provide verifiable request/response pairs
5. **Versioned** - Track interface changes with breaking-change flags
6. **Byte-level precision** - Show exact byte positions, endianness, and CRC

---

## Quality Checklist

Before finalizing, verify:

- [ ] All interfaces in scope are listed in summary table
- [ ] Electrical characteristics include min/typ/max with units
- [ ] Pinout diagram matches physical connector
- [ ] Protocol parameters are fully specified (baud, parity, etc.)
- [ ] Complete register map with address, type, scale, and units
- [ ] Error handling covers all exception codes
- [ ] At least one worked example per transaction type
- [ ] Test vectors are provided and verifiable
- [ ] Compatibility rules are documented
- [ ] Interface version history is present
- [ ] Terminology section defines all protocol-specific terms
- [ ] Document ID and revision shown
- [ ] CRC calculations are shown in examples

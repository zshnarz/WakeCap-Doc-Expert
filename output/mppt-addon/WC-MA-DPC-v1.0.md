# MPPT Solar Charge Controller Add-On: Data Parsing Specification

**Version:** 1.1
**Date:** 2026-03-30
**Status:** Final (supersedes v1.0)
**Companion Document:** WeatherStation_DataParsingContractRevision.pdf (v1.0)

---

## 1. Overview

This document defines the contract between the **Firmware (FW)** team responsible for the MPPT solar charge controller add-on and the **Backend (BE)** team responsible for processing the data. It specifies the MQTT topic structure, payload format using a Tag-Length-Value (TLV) scheme, field definitions for the MPPT data block, and the required parsing logic.

The MPPT add-on reads 7 register groups from an EPEver-compatible solar charge controller over Modbus RTU (RS485) and aggregates them into a single TLV packet transmitted over the Wirepas mesh network.

---

## 2. Data Transmission via MQTT

### 2.1. MQTT Topic Structure

Sensor data is published to the following MQTT topic:

```
<env>/gw-event/received_data/<gw-id>/<sink-id>/<net_id>/61/61
```

Where:

- `<env>` : The deployment environment. Possible values: `production`, `test`, `local`.
- `<gw-id>` : The unique serial ID of the gateway device.
- `<sink-id>` : The unique serial ID of the sink device (often also used as the sink's mesh node address).
- `<net_id>` : The identifier for the Wirepas mesh network.
- `61/61` : Static identifiers indicating the source application endpoint (Source Endpoint 61, Destination Endpoint 61) related to the Modbus data in the firmware.

**Note:** Additional metadata, such as the originating node's source address within the mesh network, is provided within the accompanying Protobuf message structure wrapping the payload. This document focuses specifically on parsing the raw byte `payload` field within that structure.

### 2.2. MQTT Payload Format (TLV Structure)

The `payload` field within the Protobuf message contains one or more data blocks formatted using a Tag-Length-Value (TLV) structure. This allows both MPPT and Weather Station data to share the same endpoint.

Each TLV block has the following format:

- **Tag (T):** 1 byte. Uniquely identifies the type of data block that follows.
- **Length (L):** 1 byte. Specifies the length (in bytes) of the Value field only.
- **Value (V):** `L` bytes. The actual data payload for the specified Tag.

**Current Implementation:**

For this version, the payload will contain one TLV block representing the MPPT data.

- **MPPT Tag:** `0x02`
- **MPPT Value Length:** 31 bytes (1 byte bitmask + 30 bytes register data) = `0x1F`
- **Legacy (v1.0):** 27 bytes (`0x1B`). See backward compatibility note in Section 7.

**Example Payload Structure (MPPT Data Only):**

```
+---------+----------+------------------------------------------------------------+
| Tag     | Length   | Value (MPPT Data - 31 bytes)                               |
+---------+----------+------------------------------------------------------------+
| 02      | 1F       | 7F 00 00 00 04 00 00 00 64 04 CE 00 00 05 14 00 64 ...    |
+---------+----------+------------------------------------------------------------+
```

- `02` : Tag indicating MPPT Modbus Add-On Data.
- `1F` : Length of the Value field (31 bytes in hexadecimal).
- `7F` : Bitmask byte (see Section 2.3).
- Remaining 30 bytes: Register data as defined in Section 3.

### 2.3. Discriminating MPPT from Weather Station

MPPT and Weather Station use **different Tag values** on Endpoint 61. The backend can discriminate by **Tag** alone:

| Device Type     | Tag  | Length | Length (Hex) | Value Structure                     |
|-----------------|------|--------|--------------|-------------------------------------|
| Weather Station | 0x01 | 32     | 0x20         | 16 x 2-byte signed int16 fields    |
| MPPT (v1.1)     | 0x02 | 31     | 0x1F         | 1-byte bitmask + 30 bytes data     |
| MPPT (v1.0 legacy)| 0x02 | 27  | 0x1B         | 1-byte bitmask + 26 bytes data     |

**Parsing rule:**
- If `Tag == 0x01`: Parse as Weather Station (see companion document).
- If `Tag == 0x02` and `Length == 0x1F` (31): Parse as MPPT v1.1 (this document).
- If `Tag == 0x02` and `Length == 0x1B` (27): Parse as MPPT v1.0 legacy (RTC = 2 bytes only).
- Otherwise: Log unknown tag and skip.

### 2.4. Bitmask Field

The **first byte** of the MPPT Value field is a **register success bitmask**. Each bit indicates whether the corresponding register group was successfully read from the MPPT device.

```
Bit:    6       5       4       3       2       1       0
        |       |       |       |       |       |       |
        RTC   Load    PV V/I  Batt   Batt    SOC    Status
       0x9013  V/I    0x3100  Temp   Net I  0x311A  0x3200
               0x310C         0x3110 0x331A
```

- **Bit N = 1:** Register group N responded successfully; its data bytes contain valid readings.
- **Bit N = 0:** Register group N failed (timeout or CRC error); its data bytes are **zero-filled** (`0x00`).
- **Bits 7:** Reserved (always 0).

**Example:** Bitmask `0x7F` (binary `0111 1111`) = all 7 registers OK.
**Example:** Bitmask `0x5B` (binary `0101 1011`) = registers 0, 1, 3, 4, 6 OK; registers 2, 5 failed.

---

## 3. Field Definitions (for Tag 0x02 - MPPT, Length 0x1B)

The following table defines the fields contained within the **Value** part of the TLV structure when `Tag == 0x02` and `Length == 0x1B`. The first byte is the bitmask (Section 2.4). The remaining 26 bytes contain register data in the order shown.

**Byte Order:** Big-Endian (Most Significant Byte first) for all 16-bit values.
**32-bit Composites:** Low word first, high word second (see Section 3.2).

### 3.1. Register Data Layout

| Reg | Bitmask Bit | Byte Offset | Bytes | Modbus Address | Func Code | Description                  |
|-----|-------------|-------------|-------|----------------|-----------|------------------------------|
| R0  | Bit 0       | 0 - 5       | 6     | 0x3200         | 0x04      | Battery / Charging / Load Status |
| R1  | Bit 1       | 6 - 7       | 2     | 0x311A         | 0x04      | Battery SOC                  |
| R2  | Bit 2       | 8 - 11      | 4     | 0x331A         | 0x04      | Battery Voltage + Current (Low) |
| R3  | Bit 3       | 12 - 15     | 4     | 0x3110         | 0x04      | Battery Temp / Device Temp   |
| R4  | Bit 4       | 16 - 19     | 4     | 0x3100         | 0x04      | PV Array Voltage / Current   |
| R5  | Bit 5       | 20 - 23     | 4     | 0x310C         | 0x04      | Load Voltage / Current       |
| R6  | Bit 6       | 24 - 29     | 6     | 0x9013         | 0x03      | Real-Time Clock (full)       |

**Note:** "Byte Offset" is relative to the start of the register data (i.e., byte index within the 26-byte data portion, after the bitmask byte). In the full 29-byte packet: actual offset = 3 + byte offset above (3 = TAG + LEN + bitmask).

### 3.2. Detailed Field Definitions

#### R0: Status Registers (0x3200-0x3202) -- 6 bytes

| Sub-Field | Byte Offset | Bytes | Data Type       | Description        |
|-----------|-------------|-------|-----------------|--------------------|
| R0.a      | 0 - 1       | 2     | Unsigned 16-bit | Battery Status     |
| R0.b      | 2 - 3       | 2     | Unsigned 16-bit | Charging Equipment Status |
| R0.c      | 4 - 5       | 2     | Unsigned 16-bit | Load/Discharging Status |

**R0.a - Battery Status (0x3200) Bit Definitions:**

| Bits   | Meaning                          | Values                                                              |
|--------|----------------------------------|---------------------------------------------------------------------|
| 3:0    | Battery voltage status           | 0 = Normal, 1 = Over-voltage, 2 = Under-voltage, 3 = Over discharge, 4 = Fault |
| 7:4    | Battery temperature status       | 0 = Normal, 1 = Over Temp (above warning), 2 = Low Temp (below warning) |
| 8      | Battery internal resistance abnormal | 0 = Normal, 1 = Abnormal                                       |
| 15     | Wrong identification for rated voltage | 0 = Correct, 1 = Wrong                                      |

**R0.b - Charging Equipment Status (0x3201) Bit Definitions:**

| Bits   | Meaning                                    | Values                                                 |
|--------|------------------------------------------  |--------------------------------------------------------|
| 0      | Running                                    | 0 = Standby, 1 = Running                              |
| 1      | Fault                                      | 0 = Normal, 1 = Fault                                 |
| 3:2    | Charging status                            | 0 = Not Charging, 1 = Float, 2 = Boost, 3 = Equalize |
| 4      | PV input short circuit                     | 0 = Normal, 1 = Short                                 |
| 7      | Load MOSFET short circuit                  | 0 = Normal, 1 = Short                                 |
| 8      | Load short circuit                         | 0 = Normal, 1 = Short                                 |
| 9      | Load over-current                          | 0 = Normal, 1 = Over-current                          |
| 10     | Input over-current                         | 0 = Normal, 1 = Over-current                          |
| 11     | Anti-reverse MOSFET short circuit          | 0 = Normal, 1 = Short                                 |
| 12     | Charging / Anti-reverse MOSFET open circuit| 0 = Normal, 1 = Open                                  |
| 13     | Charging MOSFET short circuit              | 0 = Normal, 1 = Short                                 |
| 15:14  | Input voltage status                       | 0 = Normal, 1 = No input power, 2 = Higher input voltage, 3 = Input voltage error |

**R0.c - Discharging Equipment Status (0x3202) Bit Definitions:**

| Bits   | Meaning                         | Values                          |
|--------|----------------------------------|---------------------------------|
| 0      | Running / Standby               | 0 = Standby, 1 = Running       |
| 1      | Fault                           | 0 = Normal, 1 = Fault          |
| 4      | Output over-voltage             | 0 = Normal, 1 = Over-voltage   |
| 5      | Boost over-voltage              | 0 = Normal, 1 = Over-voltage   |
| 6      | Short circuit in high voltage side | 0 = Normal, 1 = Short       |
| 7      | Input over-voltage              | 0 = Normal, 1 = Over-voltage   |
| 8      | Output voltage abnormal         | 0 = Normal, 1 = Abnormal       |
| 9      | Unable to stop discharging      | 0 = Normal, 1 = Unable         |
| 10     | Unable to discharge             | 0 = Normal, 1 = Unable         |
| 11     | Short circuit                   | 0 = Normal, 1 = Short          |
| 13:12  | Output power level              | 0 = Light load, 1 = Moderate, 2 = Rated, 3 = Overload |
| 15:14  | Input voltage status            | 0 = Normal, 1 = Low, 2 = High, 3 = No access |

#### R1: Battery SOC (0x311A) -- 2 bytes

| Byte Offset | Bytes | Data Type       | Unit | Description            | Coefficient |
|-------------|-------|-----------------|------|------------------------|-------------|
| 6 - 7       | 2     | Unsigned 16-bit | %    | Battery State of Charge | 1 (direct)  |

Value range: 0-100 (percent). No scaling needed.

#### R2: Battery Voltage and Current (0x331A-0x331B) -- 4 bytes

| Sub-Field | Byte Offset | Bytes | Data Type       | Unit | Description                    | Coefficient |
|-----------|-------------|-------|-----------------|------|--------------------------------|-------------|
| R2.a      | 8 - 9       | 2     | Unsigned 16-bit | V    | Battery Voltage                | 0.01        |
| R2.b      | 10 - 11     | 2     | Unsigned 16-bit | A    | Battery Current (Low word)     | 0.01        |

**Correction (v1.1):** Previously documented as a 32-bit composite "Battery Net Current." Per EPEver MODBUS-Protocol-v25.pdf (A36-A37): register 0x331A is Battery Voltage (V ×100), register 0x331B is Battery Current low word (A ×100). These are two separate 16-bit values, NOT a 32-bit composite. The high word of battery current (0x331C) is not read by the firmware.

```
battery_voltage_V = R2.a * 0.01
battery_current_A = R2.b * 0.01
```

#### R3: Battery Temperature and Device Temperature (0x3110-0x3111) -- 4 bytes

| Sub-Field | Byte Offset | Bytes | Data Type       | Unit | Description            | Coefficient |
|-----------|-------------|-------|-----------------|------|------------------------|-------------|
| R3.a      | 12 - 13     | 2     | Unsigned 16-bit | °C   | Battery Temperature    | 0.01        |
| R3.b      | 14 - 15     | 2     | Unsigned 16-bit | °C   | Device Temperature     | 0.01        |

#### R4: PV Array Voltage and Current (0x3100-0x3101) -- 4 bytes

| Sub-Field | Byte Offset | Bytes | Data Type       | Unit | Description    | Coefficient |
|-----------|-------------|-------|-----------------|------|----------------|-------------|
| R4.a      | 16 - 17     | 2     | Unsigned 16-bit | V    | PV Voltage     | 0.01        |
| R4.b      | 18 - 19     | 2     | Unsigned 16-bit | A    | PV Current     | 0.01        |

#### R5: Load Voltage and Current (0x310C-0x310D) -- 4 bytes

| Sub-Field | Byte Offset | Bytes | Data Type       | Unit | Description      | Coefficient |
|-----------|-------------|-------|-----------------|------|------------------|-------------|
| R5.a      | 20 - 21     | 2     | Unsigned 16-bit | V    | Load Voltage     | 0.01        |
| R5.b      | 22 - 23     | 2     | Unsigned 16-bit | A    | Load Current     | 0.01        |

**Derived value:** Load Power (W) = Load Voltage * Load Current

#### R6: Real-Time Clock (0x9013-0x9015) -- 6 bytes

| Sub-Field | Byte Offset | Bytes | Data Type    | Description              |
|-----------|-------------|-------|--------------|--------------------------|
| R6.a      | 24 - 25     | 2     | Packed byte  | D15-D8=Minutes, D7-D0=Seconds |
| R6.b      | 26 - 27     | 2     | Packed byte  | D15-D8=Day, D7-D0=Hour   |
| R6.c      | 28 - 29     | 2     | Packed byte  | D15-D8=Year, D7-D0=Month |

**RTC Decoding (per EPEver MODBUS-Protocol-v25.pdf, registers 0x9013-0x9015):**
```
minutes = byte[24]     // 0-59
seconds = byte[25]     // 0-59
day     = byte[26]     // 1-31
hour    = byte[27]     // 0-23
year    = byte[28]     // 0-99 (offset from 2000)
month   = byte[29]     // 1-12

timestamp = sprintf("20%02d-%02d-%02d %02d:%02d:%02d",
                     year, month, day, hour, minutes, seconds)
```

**Change from v1.0:** Previously read only 0x9013 (1 register = Minutes:Seconds, no hour). Now reads 3 registers (0x9013-0x9015) for the full timestamp. This adds 4 bytes to the TLV packet.

---

## 4. Data Parsing Logic

The backend must first parse the overall TLV structure of the MQTT payload and then parse the content of recognized fields.

### Step 1: Parse TLV Blocks

Process the `payload` sequentially. For each block:
1. Read the `Tag` (1 byte).
2. Read the `Length` (1 byte).
3. Read `Length` bytes for the `Value`.
4. Verify that `Length` bytes were successfully read.

### Step 2: Identify Block Type

Check the `Tag` and `Length` values:

- If `Tag == 0x02` and `Length == 0x1F` (31): Proceed to **Step 3** to parse MPPT data (v1.1, full RTC).
- If `Tag == 0x02` and `Length == 0x1B` (27): Parse as MPPT v1.0 legacy (R6 = 2 bytes: MM:SS only).
- If `Tag == 0x01` and `Length == 0x20` (32): Parse as Weather Station (see companion document).
- If `Tag` is unknown/unsupported: Log the unknown tag and its length, then skip its `Value` section.
- If payload ends prematurely: Handle error appropriately (e.g., log incomplete data).

### Step 3: Parse MPPT Value Data (Tag 0x02, Length 0x1B)

Process the 27-byte `Value` data obtained in Step 1:

**3a. Read Bitmask:** Extract the first byte of the Value as the register success bitmask.

**3b. Iterate Through Register Groups:** For each register group R0 through R6:

  1. **Check bitmask:** If bit N is 0, skip this register (data is zero-filled, treat as NULL/unavailable).
  2. **Extract bytes:** Read the appropriate number of bytes from the data portion at the offset specified in Section 3.1.
  3. **Combine bytes:** Assemble into 16-bit or 32-bit integers respecting Big-Endian byte order.
  4. **Apply scaling:** Multiply by the Coefficient specified in Section 3.2.
  5. **Decode bitfields:** For status registers (R0), interpret individual bits per the tables in Section 3.2.
  6. **Assign units:** The resulting value is in the units specified in the Field Definitions table.

### Step 4: Repeat

If the end of the payload has not been reached after processing a TLV block's `Value`, return to Step 1 to parse the next TLV block.

---

## 5. Parsing Examples

### 5.1. Example: Full Successful Packet (All 7 Registers OK)

**Raw Hex (29 bytes):**
```
02 1B 7F 00 00 00 04 00 00 00 64 00 00 00 00 05 14 00 64 0D 48 00 32 00 00 00 00 0C 1E
```

**Step-by-step decode:**

| Field       | Hex Bytes      | Interpretation                                     |
|-------------|----------------|----------------------------------------------------|
| TAG         | `02`           | MPPT Modbus Add-On Data                                 |
| LEN         | `1B`           | 27 bytes                                           |
| Bitmask     | `7F`           | Binary `0111 1111` = all 7 registers OK            |
| R0 Batt Stat| `00 00`        | 0x0000 = Normal                                    |
| R0 Chg Stat | `00 04`        | 0x0004: bits 3:2 = 01 = Float charge mode      |
| R0 Load Stat| `00 00`        | 0x0000 = Standby, Normal                           |
| R1 SOC      | `00 64`        | 100 -> 100%                                        |
| R2 Curr (L) | `00 00`        | Low word = 0x0000 = 0                              |
| R2 Curr (H) | `00 00`        | High word = 0x0000; value = (0<<16)\|0 = 0 -> 0.00 A |
| R3 Batt Temp| `05 14`        | 0x0514 = 1300 -> 1300 * 0.01 = 13.00 °C            |
| R3 Dev Temp | `00 64`        | 0x0064 = 100 -> 100 * 0.01 = 1.00 °C               |
| R4 PV V     | `0D 48`        | 0x0D48 = 3400 -> 3400 * 0.01 = 34.00 V             |
| R4 PV I     | `00 32`        | 0x0032 = 50 -> 50 * 0.01 = 0.50 A                  |
| R5 Load V   | `00 00`        | 0x0000 = 0 -> 0 * 0.01 = 0.00 V                   |
| R5 Load I   | `00 00`        | 0x0000 = 0 -> 0 * 0.01 = 0.00 A                   |
| R6 RTC      | `0C 1E`        | Minutes=0x0C=12, Seconds=0x1E=30 -> 12:30          |

### 5.2. Example: Partial Data (Registers 2 and 5 Failed)

**Raw Hex (29 bytes):**
```
02 1B 5B 00 00 00 04 00 00 00 64 00 00 00 00 05 14 00 64 0D 48 00 32 00 00 00 00 0C 1E
```

**Bitmask:** `0x5B` = binary `0101 1011`

| Bit | Register    | Status | Action                             |
|-----|-------------|--------|------------------------------------|
| 0   | R0 Status   | 1 (OK) | Parse normally                     |
| 1   | R1 SOC      | 1 (OK) | Parse normally                     |
| 2   | R2 Batt I   | 0 (FAIL) | Skip -- data bytes are zero-filled, treat as NULL |
| 3   | R3 Temps    | 1 (OK) | Parse normally                     |
| 4   | R4 PV V/I   | 1 (OK) | Parse normally                     |
| 5   | R5 Load V/I | 0 (FAIL) | Skip -- treat as NULL             |
| 6   | R6 RTC      | 1 (OK) | Parse normally                     |

### 5.3. Example: Decoding a 16-bit Value (Battery Temperature)

Applies to R3.a bytes at data offset 12-13.

- **Hexadecimal Bytes:** `05 14`
- **Combined 16-bit Value (Big-Endian):** `0x0514`
- **As Unsigned Integer:** 1300
- **Apply Coefficient (0.01):** 1300 * 0.01 = **13.00**
- **Result:** 13.00 °C (Battery Temperature)

### 5.4. Example: Decoding a 16-bit Value (Load Voltage)

Applies to R5.a bytes at data offset 20-21.

- **Hexadecimal Bytes:** `06 A4`
- **Combined 16-bit Value (Big-Endian):** `0x06A4` = 1700
- **Apply Coefficient (0.01):** 1700 * 0.01 = **17.00**
- **Result:** 17.00 V (Load Voltage)

### 5.5. Example: Decoding RTC Time

Applies to R6 bytes at data offset 24-25.

- **Hexadecimal Bytes:** `0E 2D`
- **High Byte (Minutes):** `0x0E` = 14
- **Low Byte (Seconds):** `0x2D` = 45
- **Result:** **14:45** (14 minutes, 45 seconds past the hour)

---

## 6. Error Status Reporting (Endpoint 65)

In addition to data on Endpoint 61, the firmware sends error status reports on a separate endpoint.

### 6.1. Error Status MQTT Topic

```
<env>/gw-event/received_data/<gw-id>/<sink-id>/<net_id>/65/65
```

### 6.2. Error Status Payload

The error status payload is a fixed 3-byte structure (no TLV wrapper):

| Byte Offset | Bytes | Description              | Values                                  |
|-------------|-------|--------------------------|-----------------------------------------|
| 0           | 1     | LED State                | 0 = Normal, 1 = Problem, 2 = Critical  |
| 1           | 1     | Recent Timeout Count     | 0-255 (resets after each report)        |
| 2           | 1     | Recent CRC Error Count   | 0-255 (resets after each report)        |

**LED State Interpretation:**
- **0 (Normal):** Device is communicating normally.
- **1 (Problem):** Response timeouts detected, but device is still functional.
- **2 (Critical):** Hardware initialization failure or persistent communication errors.

---

## 7. Key Differences from Weather Station

This section summarizes the differences between the MPPT and Weather Station parsing contracts for backend developers who support both.

| Aspect                  | Weather Station                | MPPT                                    |
|-------------------------|--------------------------------|-----------------------------------------|
| Tag                     | 0x01                           | 0x02                                    |
| Length                   | 0x20 (32 bytes)                | 0x1F (31 bytes) v1.1 / 0x1B (27) v1.0  |
| Discriminator            | Length == 32                   | Length == 31 (v1.1) or 27 (v1.0)        |
| Bitmask                 | None                           | 1st byte of Value                        |
| Data fields             | 16 uniform 2-byte fields       | 7 variable-size register groups (2-6B)  |
| Data type               | Signed 16-bit (Two's Complement) | Unsigned 16-bit and 32-bit composites |
| Scaling                  | Per-field coefficient (0.1, 0.001, 1) | 0.01 for V/A/W/°C, 1 for SOC/status |
| Unavailable sensor       | `0x7FFF` sentinel              | Bitmask bit = 0, data zero-filled       |
| Status fields            | None (all are measurements)    | R0 contains bitfield status registers   |
| Channel remapping        | Yes (4 remap configs)          | No (fixed register order)               |

---

## 8. Firmware Source References

For implementation verification, these are the authoritative source files:

| File | Purpose |
|------|---------|
| `wc_addon_modbus_mppt.c` | MPPT polling, TLV aggregation, packet construction |
| `wc_addon_modbus_mppt.h` | Register configuration structures, constants |
| `wc_addon_modbus.c` | Shared utilities: CRC, auto-detection, LED, error tracking, data push |
| `wc_addon_modbus.h` | Shared constants, endpoint definitions, device type enum |
| `wakecap_config.h` | Endpoint numbers (EP 61 = data, EP 65 = error status) |
| `tools/mppt_parse.py` | Reference Python parser for MPPT TLV packets |

---

## Appendix A: Quick Reference - Complete Byte Map (33-byte packet, v1.1)

```
Byte   Offset    Field                   Type          Notes
-----  --------  ----------------------  ------------  -------------------------
[0]    TAG       Tag                     uint8         Always 0x02
[1]    LEN       Length                  uint8         0x1F (31) for v1.1
[2]    BM        Bitmask                 uint8         Bit N = reg N success
[3]    D+0       Battery Status (hi)     \             0x3200
[4]    D+1       Battery Status (lo)      > uint16 BE  Bitfield (see R0.a)
[5]    D+2       Charging Status (hi)    \
[6]    D+3       Charging Status (lo)     > uint16 BE  Bitfield (see R0.b)
[7]    D+4       Dischg. Status (hi)     \
[8]    D+5       Dischg. Status (lo)      > uint16 BE  Bitfield (see R0.c)
[9]    D+6       SOC (hi)               \
[10]   D+7       SOC (lo)                > uint16 BE   0-100 %
[11]   D+8       Battery Voltage (hi)    \
[12]   D+9       Battery Voltage (lo)     > uint16 BE  * 0.01 V  (0x331A)
[13]   D+10      Battery Current L (hi)  \
[14]   D+11      Battery Current L (lo)   > uint16 BE  * 0.01 A  (0x331B)
[15]   D+12      Battery Temp (hi)       \
[16]   D+13      Battery Temp (lo)        > uint16 BE  * 0.01 °C (0x3110)
[17]   D+14      Device Temp (hi)        \
[18]   D+15      Device Temp (lo)         > uint16 BE  * 0.01 °C (0x3111)
[19]   D+16      PV Voltage (hi)         \
[20]   D+17      PV Voltage (lo)          > uint16 BE  * 0.01 V  (0x3100)
[21]   D+18      PV Current (hi)         \
[22]   D+19      PV Current (lo)          > uint16 BE  * 0.01 A  (0x3101)
[23]   D+20      Load Voltage (hi)       \
[24]   D+21      Load Voltage (lo)        > uint16 BE  * 0.01 V  (0x310C)
[25]   D+22      Load Current (hi)       \
[26]   D+23      Load Current (lo)        > uint16 BE  * 0.01 A  (0x310D)
[27]   D+24      RTC Minutes             uint8         0-59      (0x9013 D15:D8)
[28]   D+25      RTC Seconds             uint8         0-59      (0x9013 D7:D0)
[29]   D+26      RTC Day                 uint8         1-31      (0x9014 D15:D8)
[30]   D+27      RTC Hour                uint8         0-23      (0x9014 D7:D0)
[31]   D+28      RTC Year                uint8         0-99      (0x9015 D15:D8)
[32]   D+29      RTC Month               uint8         1-12      (0x9015 D7:D0)
```

---

## Appendix B: Backend Pseudocode

```python
def parse_modbus_payload(payload: bytes):
    """Parse one or more TLV blocks from an EP 61 MQTT payload."""
    offset = 0
    results = []

    while offset < len(payload):
        if offset + 2 > len(payload):
            log_error("Incomplete TLV header")
            break

        tag = payload[offset]
        length = payload[offset + 1]
        offset += 2

        if offset + length > len(payload):
            log_error(f"TLV value truncated: need {length}, have {len(payload) - offset}")
            break

        value = payload[offset : offset + length]
        offset += length

        if tag == 0x01 and length == 0x20:
            results.append(parse_weather_station(value))
        elif tag == 0x02 and length in (0x1B, 0x1F):
            results.append(parse_mppt(value, length))
        else:
            log_warning(f"Unknown TLV: tag=0x{tag:02X}, length={length}")

    return results


def parse_mppt(value: bytes, length: int) -> dict:
    """Parse MPPT TLV value into structured data.
    Supports v1.1 (31 bytes) and v1.0 legacy (27 bytes)."""
    bitmask = value[0]
    data = value[1:]
    result = {"bitmask": bitmask, "registers_ok": bin(bitmask & 0x7F).count("1"),
              "version": "1.1" if length == 0x1F else "1.0"}

    def u16(off):
        return (data[off] << 8) | data[off + 1]

    def u32_composite(off):
        low_word = u16(off)
        high_word = u16(off + 2)
        return low_word | (high_word << 16)

    # R0: Status (bytes 0-5)
    if bitmask & 0x01:
        result["battery_status"] = u16(0)
        result["charging_status"] = u16(2)
        result["discharging_status"] = u16(4)

    # R1: SOC (bytes 6-7)
    if bitmask & 0x02:
        result["soc_percent"] = u16(6)

    # R2: Battery Voltage + Current (bytes 8-11) — 0x331A (voltage), 0x331B (current low word)
    if bitmask & 0x04:
        result["battery_voltage_v"] = u16(8) * 0.01
        result["battery_current_a"] = u16(10) * 0.01

    # R3: Temperatures (bytes 12-15) — 0x3110, 0x3111
    if bitmask & 0x08:
        result["battery_temp_c"] = u16(12) * 0.01
        result["device_temp_c"] = u16(14) * 0.01

    # R4: PV V/I (bytes 16-19)
    if bitmask & 0x10:
        result["pv_voltage_v"] = u16(16) * 0.01
        result["pv_current_a"] = u16(18) * 0.01

    # R5: Load V/I (bytes 20-23) — 0x310C, 0x310D
    if bitmask & 0x20:
        result["load_voltage_v"] = u16(20) * 0.01
        result["load_current_a"] = u16(22) * 0.01

    # R6: RTC (bytes 24-29) — 0x9013-0x9015: full timestamp
    if bitmask & 0x40:
        result["rtc_minutes"] = data[24]
        result["rtc_seconds"] = data[25]
        if length == 0x1F:  # v1.1: full RTC (6 bytes)
            result["rtc_day"]   = data[26]
            result["rtc_hour"]  = data[27]
            result["rtc_year"]  = 2000 + data[28]
            result["rtc_month"] = data[29]

    return result
```

# MPPT Modbus Workflow Overview

**Document ID:** WC-MA-WO-v1.0
**Version:** 1.0
**Date:** 2026-03-09
**Product:** WakeCap MODBUS Addon Board (wc_addon_v10)
**Firmware:** V4.0
**Classification:** Internal — Engineering Reference

---

## 1. Purpose

This document provides a concise end-to-end overview of how the WakeCap MODBUS Addon Board communicates with an EPEver MPPT solar charge controller, collects register data, assembles it into a compact TLV packet, and delivers it over the Wirepas mesh network. It is intended for firmware and backend engineers who need to understand the data pipeline without reading source code.

---

## 2. Modbus Basics

Modbus is an industrial serial protocol originally published by Modicon in 1979. The WakeCap addon uses **Modbus RTU** (Remote Terminal Unit), the binary-encoded variant, over an **RS-485** physical layer.

### 2.1 Key Concepts

| Concept | Description |
|---------|-------------|
| Master / Slave | The addon board is the **master** (initiates requests). The MPPT controller is the **slave** (responds). |
| Device ID | Each slave has a unique address on the bus. The EPEver controller uses **Device ID = 0x01**. |
| Function Code | Specifies the operation. Two are used: **0x04** (Read Input Registers) for real-time measurements and status, and **0x03** (Read Holding Registers) for configuration data like the RTC. |
| Register | A 16-bit (2-byte) data unit. Registers are addressed by a 16-bit number (e.g., `0x3100`). Multiple consecutive registers can be read in a single request. |
| CRC-16 | Every frame ends with a 2-byte CRC for error detection (polynomial 0xA001). |

### 2.2 Frame Format

**Request (Master → Slave), 8 bytes:**

```
[DevID] [FuncCode] [AddrHi] [AddrLo] [CountHi] [CountLo] [CRC_Lo] [CRC_Hi]
```

**Response (Slave → Master), variable length:**

```
[DevID] [FuncCode] [ByteCount] [Data ...] [CRC_Lo] [CRC_Hi]
```

### 2.3 Physical Interface

| Parameter | Value |
|-----------|-------|
| Standard | RS-485 (half-duplex, differential pair) |
| Baud Rate | 115,200 bps |
| Data Format | 8N1 (8 data bits, no parity, 1 stop bit) |
| Transceiver | MAX485 (or equivalent) |
| TX Pin | GPIO 15 |
| RX Pin | GPIO 14 |
| RE Pin | GPIO 16 (Receiver Enable — active low) |

---

## 3. System Architecture

```
┌─────────────┐    RS-485     ┌─────────────────┐
│   EPEver     │◄────────────►│  WakeCap MODBUS  │
│   MPPT       │   2-wire     │  Addon Board     │
│  Controller  │  half-duplex │  (nRF52832)      │
└─────────────┘               └────────┬─────────┘
                                       │ Wirepas Mesh
                                       │ (2.4 GHz)
                                       ▼
                              ┌─────────────────┐
                              │  Wirepas Mesh    │
                              │  Network         │
                              │  (Anchors/Nodes) │
                              └────────┬─────────┘
                                       │
                                       ▼
                              ┌─────────────────┐
                              │  Sink Node       │──► UART ──► Gateway ──► MQTT ──► Backend
                              └─────────────────┘
```

The addon board sits between the MPPT controller (RS-485 side) and the Wirepas mesh (radio side). It periodically polls the MPPT, packages the data, and transmits it wirelessly.

---

## 4. Startup Sequence

On power-up, the firmware follows this initialization flow:

1. **Hardware init** — UART and GPIO pins configured, RS-485 transceiver enabled.
2. **Auto-detection** — The board probes the bus to determine whether an MPPT controller or Weather Station is connected:
   - Sends a test read to register `0x311A` (SOC) using function code `0x04`.
   - If it responds → **MPPT detected**.
   - If not, probes `0x0000` with function code `0x03` → **Weather Station detected**.
   - If neither responds → defaults to MPPT mode.
   - Timeout per probe: 500 ms, up to 3 retries per device type.
3. **Scheduler start** — A periodic polling task is registered with a 10-second initial delay, then repeats every **60 seconds**.

---

## 5. Register Polling Sequence

Each poll cycle reads **7 register groups** sequentially. The registers, their Modbus addresses, and data sizes are:

| # | Register Group | Address | Func Code | Count | Bytes | Description |
|---|---------------|---------|-----------|-------|-------|-------------|
| R0 | Status | `0x3200` | `0x04` | 3 | 6 | Battery status, charging status, discharging status |
| R1 | SOC | `0x311A` | `0x04` | 1 | 2 | Battery state of charge (%) |
| R2 | Battery V/I | `0x331A` | `0x04` | 2 | 4 | Battery voltage and current |
| R3 | Temperatures | `0x3110` | `0x04` | 2 | 4 | Battery temperature and device temperature |
| R4 | PV V/I | `0x3100` | `0x04` | 2 | 4 | Photovoltaic array voltage and current |
| R5 | Load V/I | `0x310C` | `0x04` | 2 | 4 | Load output voltage and current |
| R6 | RTC | `0x9013` | `0x03` | 1 | 2 | Real-time clock (minutes and seconds) |

### 5.1 Timing Per Register

```
     ┌── TX Request ──┐  ┌─── Wait for Response ───┐  ┌─ Gap ─┐
     │   ~0.7 ms       │  │   up to 150 ms           │  │100 ms │
─────┤  (8 bytes @     ├──┤  (timeout if no reply)    ├──┤       ├─── next register
     │   115200 baud)  │  │                           │  │       │
     └─────────────────┘  └───────────────────────────┘  └───────┘
```

| Parameter | Value |
|-----------|-------|
| TX frame duration | ~0.7 ms (8 bytes at 115,200 baud) |
| Response timeout | 150 ms per register |
| Inter-register gap | 100 ms |
| Time per register | ~250 ms (typical, less if response arrives quickly) |
| Total poll time (7 registers) | ~1.75 seconds worst-case |

### 5.2 RS-485 Direction Switching

The RS-485 bus is half-duplex. The firmware controls direction via the RE pin:

1. **Assert RE high** — enables transmitter, disables receiver.
2. **Send 8-byte request frame** — IRQ disabled during TX burst for clean byte timing.
3. **Wait ~120 µs** — transceiver settling time.
4. **Assert RE low** — enables receiver, disables transmitter.
5. **Receive response** — byte-by-byte with inter-frame gap detection (~2 ms idle = end of frame).
6. **Validate CRC** — compare calculated CRC against last 2 bytes of response.

---

## 6. TLV Packet Construction

After all 7 registers are polled, their data is assembled into a single **TLV (Tag-Length-Value)** packet.

### 6.1 Packet Structure (29 bytes)

```
Byte:  [0]   [1]   [2]      [3-8]   [9-10]  [11-14]  [15-18]  [19-22]  [23-26]  [27-28]
Field: TAG   LEN   BITMASK  R0      R1      R2       R3       R4       R5       R6
Value: 0x02  0x1B  varies   Status  SOC     Batt V/I Temps    PV V/I   Load V/I RTC
Size:  1B    1B    1B       6B      2B      4B       4B       4B       4B       2B
```

**Total: 1 + 1 + 1 + 26 = 29 bytes**

### 6.2 Bitmask Field (Byte 2)

The bitmask indicates which register groups were read successfully. Each bit maps to one register group:

```
Bit:  7     6     5     4     3     2     1     0
      Rsvd  R6    R5    R4    R3    R2    R1    R0
            RTC   Load  PV    Temp  Batt  SOC   Status
```

- **Bit = 1** → Register data is valid.
- **Bit = 0** → Register read failed (timeout or CRC error). Data bytes are **zero-filled**.

Example: Bitmask `0x7F` (0111 1111) = all 7 registers succeeded.
Example: Bitmask `0x73` (0111 0011) = R2 and R3 failed (temperatures and battery V/I unavailable).

### 6.3 Data Encoding

All 16-bit values are stored **big-endian** (most significant byte first).

| Field | Bytes | Raw → Physical | Unit |
|-------|-------|----------------|------|
| Battery Status | 3–4 | Bitfield (see Data Parsing Contract) | — |
| Charging Status | 5–6 | Bitfield | — |
| Discharging Status | 7–8 | Bitfield | — |
| SOC | 9–10 | Direct (no scaling) | % |
| Battery Voltage | 11–12 | Raw × 0.01 | V |
| Battery Current | 13–14 | Raw × 0.01 | A |
| Battery Temp | 15–16 | Raw × 0.01 | °C |
| Device Temp | 17–18 | Raw × 0.01 | °C |
| PV Voltage | 19–20 | Raw × 0.01 | V |
| PV Current | 21–22 | Raw × 0.01 | A |
| Load Voltage | 23–24 | Raw × 0.01 | V |
| Load Current | 25–26 | Raw × 0.01 | A |
| RTC Minutes | 27 (high byte) | Direct | min |
| RTC Seconds | 28 (low byte) | Direct | sec |

### 6.4 Zero-Fill on Failure

When a register read fails (timeout or CRC mismatch), the corresponding data bytes are set to `0x00` and the bitmask bit is cleared. This allows the backend to:

- Detect partial data via the bitmask.
- Distinguish "real zero" from "missing data" by checking the bitmask before interpreting values.

---

## 7. Mesh Delivery

### 7.1 Wirepas Endpoints

The addon board sends data on two Wirepas endpoints:

| Endpoint | Direction | Size | Content |
|----------|-----------|------|---------|
| **EP 61** (Data) | Src: 61 → Dst: 61 | 29 bytes | TLV packet (Tag + Length + Bitmask + Data) |
| **EP 65** (Error) | Src: 65 → Dst: 65 | 3 bytes | LED state + timeout count + CRC error count |

### 7.2 Data Endpoint (EP 61)

After the TLV packet is assembled, it is handed to the Wirepas stack:

```c
CommonFunc_sendData(tlv_packet, 29, QOS_NORMAL, EP_61, EP_61);
```

- **QoS:** Normal (reliable mesh delivery with retries handled by Wirepas stack).
- **Frequency:** Once per poll cycle (default: every 60 seconds).
- The packet traverses the Wirepas mesh via multi-hop routing to the **sink node**.

### 7.3 Error Endpoint (EP 65)

A 3-byte error status packet is sent alongside or independently to report communication health:

| Byte | Field | Range | Meaning |
|------|-------|-------|---------|
| 0 | LED State | 0–2 | 0 = Normal, 1 = Problem (timeouts), 2 = Critical (init failure) |
| 1 | Timeout Count | 0–255 | Register timeouts since last report (resets after send) |
| 2 | CRC Error Count | 0–255 | CRC failures since last report (resets after send) |

### 7.4 Backend Path

```
Addon Board ──► Wirepas Mesh ──► Sink Node ──► UART/SLIP ──► Gateway ──► MQTT
```

**MQTT Topic:**
```
<env>/gw-event/received_data/<gw-id>/<sink-id>/<net_id>/61/61
```

The backend parser reads the 29-byte TLV payload from the MQTT message and decodes it using the bitmask and byte map described above.

---

## 8. Error Handling Summary

| Error Type | Detection | Recovery |
|------------|-----------|----------|
| No response (timeout) | 150 ms timer expires | Zero-fill register, clear bitmask bit, increment timeout counter |
| CRC mismatch | Calculated CRC ≠ received CRC | Discard response, zero-fill, increment CRC error counter |
| UART framing error | Hardware flags (overrun, parity, break) | Captured in error source register, treated as timeout |
| Device not found | Auto-detect fails after 3 retries | Default to MPPT mode, LED set to Critical |

---

## 9. Complete Poll Cycle Timeline

```
T=0s         T=10s                    T=~12s        T=~12s         T=70s
  │            │                        │              │              │
  ▼            ▼                        ▼              ▼              ▼
┌─────┐   ┌────────────────────────┐  ┌─────┐    ┌────────┐    ┌────────────
│BOOT │   │ POLL 7 REGISTERS       │  │BUILD│    │SEND    │    │ NEXT POLL
│+    │   │                        │  │TLV  │    │EP 61   │    │ CYCLE
│AUTO │   │ R0 ─► R1 ─► R2 ─► R3  │  │29B  │    │+ EP 65 │    │ ...
│DETCT│   │ ─► R4 ─► R5 ─► R6     │  │pkt  │    │via mesh│    │
└─────┘   └────────────────────────┘  └─────┘    └────────┘    └────────────
 ~3s         ~1.75s                    <1ms        <1ms           60s interval
```

**Timing Summary:**

| Phase | Duration |
|-------|----------|
| Boot + auto-detect | ~3 seconds |
| Initial delay before first poll | 10 seconds |
| Poll all 7 registers | ~1.75 seconds |
| TLV assembly | < 1 ms |
| Wirepas mesh transmit (queuing) | < 1 ms |
| LED blink indication | ~300 ms |
| Idle until next poll | ~58 seconds |
| **Total cycle interval** | **60 seconds** |

---

## 10. Quick Reference

### Packet at a Glance

```
02 1B [BM] [R0: 6B] [R1: 2B] [R2: 4B] [R3: 4B] [R4: 4B] [R5: 4B] [R6: 2B]
│  │   │     │         │        │        │        │        │        │
│  │   │     │         │        │        │        │        │        └─ MM:SS
│  │   │     │         │        │        │        │        └─ Load V/I
│  │   │     │         │        │        │        └─ PV V/I
│  │   │     │         │        │        └─ Battery/Device Temp
│  │   │     │         │        └─ Battery V/I
│  │   │     │         └─ SOC %
│  │   │     └─ Status bitfields (Batt + Chg + Dischg)
│  │   └─ Bitmask: bit N = register N OK
│  └─ Length: 0x1B (27)
└─ Tag: 0x02
```

### Key Constants

| Constant | Value |
|----------|-------|
| TLV Tag | `0x02` |
| TLV Length | `0x1B` (27 bytes) |
| Total Packet Size | 29 bytes |
| Data Endpoint | EP 61 |
| Error Endpoint | EP 65 |
| Poll Interval | 60 seconds |
| Modbus Device ID | `0x01` |
| Baud Rate | 115,200 bps |

---

## Related Documents

| Document | ID |
|----------|----|
| MPPT Data Parsing Contract | WC-MA-DPC-v1.0 |
| EPEver Solar Controller Protocol | Protocol v2.5 (manufacturer) |
| Wirepas Mesh SDK Documentation | Wirepas SDK |

---

*WC-MA-WO-v1.0 — 2026-03-09 — WakeCap Technologies*
*For any query, contact Zishan Shahzad, zishan.shahzad@wakecap.com*

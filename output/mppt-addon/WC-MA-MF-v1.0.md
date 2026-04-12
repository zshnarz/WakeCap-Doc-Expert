# Modbus MPPT Multi-Manufacturer Feasibility Assessment

**Document ID:** WC-MA-MF-v1.0
**Version:** 1.0
**Date:** 2026-04-02
**Author:** Zeeshan Arif
**Status:** Draft
**Classification:** Internal -- Engineering Assessment

---

## 1. Objective

Assess the feasibility of extending the WakeCap Modbus MPPT add-on firmware to support MPPT solar charge controllers from manufacturers beyond the currently supported set (EPEver, SRNE/Renogy, Growatt). The goal is to determine which additional manufacturers can be integrated, what the technical effort looks like, and whether the firmware architecture supports this without structural changes.

---

## 2. Current Firmware Architecture

### 2.1 Dynamic Vendor Profile System

The firmware already implements a **generic, vendor-agnostic polling engine**. The MPPT polling task (`wc_addon_modbus_mppt.c`) does not contain any vendor-specific logic. Instead, it reads a decoded `vendor_profile_t` struct at runtime and iterates through its register list.

Each vendor's register map is encoded as a **compact binary blob** (12-byte header + 4 bytes per register group) stored in flash. At boot, the blob is decoded into a runtime struct and passed to the polling engine.

**Key architectural files:**

| File | Role |
|------|------|
| `modbus_vendor_profiles.h` | Profile blobs (const flash arrays), vendor IDs, baud codes |
| `modbus_vendor_profiles.c` | Decoder (`decode_vendor_profile`), lookup table, baud conversion |
| `wc_addon_modbus_mppt.c` | Generic polling engine -- iterates register config, builds TLV |
| `wc_addon_modbus.c` | Init flow, auto-detection, baud switching, NFC config, error reporting |

### 2.2 Profile Blob Format

```
Header (12 bytes):
  [0]  version         (0x01)
  [1]  vendor_id       (0-15)
  [2]  slave_id        (typically 0x01)
  [3]  baud_code       (0=9600, 1=19200, 2=38400, 3=115200)
  [4]  tlv_tag         (unique per vendor, used by backend to identify data source)
  [5]  num_registers   (1-16)
  [6-7] detect_reg     (probe register for auto-detection, big-endian)
  [8]  detect_fc       (function code for probe)
  [9]  detect_reg_count
  [10-11] reserved

Register Descriptors (4 bytes x N):
  [addr_hi][addr_lo][func_code][reg_count]
```

**Cost per vendor:** ~40-50 bytes of flash. No RAM cost (decoded once into a single static struct).

### 2.3 Current Hard Limits

| Constant | Value | Expandable? |
|----------|-------|-------------|
| `NUM_VENDOR_PROFILES` | 3 | Yes -- just increment and add entry to `profile_table` |
| `MPPT_MAX_REGISTERS` | 16 | Per-vendor max register groups. Sufficient for all researched manufacturers |
| `MPPT_MAX_AGGREGATED_DATA` | 128 bytes | Max TLV payload data. Sufficient (largest vendor needs ~30 bytes) |
| Vendor ID field (NFC/storage) | 4 bits | Supports 0-15 vendors without storage layout changes |
| TLV tag space | 1 byte (0x00-0xFF) | 253 available tags (0x02-0xFF minus reserved) |
| Baud rates supported | 9600, 19200, 38400, 115200 | Already covers all researched manufacturers |

**Conclusion:** The firmware can support up to **16 vendors** with zero structural changes. The only work per vendor is: (1) define a profile blob, (2) register it in the lookup table, (3) update backend parser for the new TLV tag.

---

## 3. Currently Supported Manufacturers

### 3.1 EPEver (Tracer AN/BN/xtra) -- Vendor ID 0, TLV 0x02

| Parameter | Value |
|-----------|-------|
| Interface | RS-485 via RJ45 (pins 3/4) |
| Baud | 115200, 8N1 |
| Slave ID | 1 |
| Function codes | FC 0x04 (real-time data), FC 0x03 (RTC/config) |
| Registers polled | 7 groups, 26-30 data bytes |
| Scaling | x100 for V/A/W (coefficient 0.01) |
| Documentation | Public -- "MODBUS-Protocol-v25.pdf" |
| Status | **Complete, field-verified** |

### 3.2 SRNE / Renogy / PowMr SCC / Rich Solar / BougeRV / EASUN / MakeSkyBlue -- Vendor ID 1, TLV 0x03

| Parameter | Value |
|-----------|-------|
| Interface | RS-485 via RJ45 |
| Baud | 9600, 8N1 |
| Slave ID | 1 |
| Function codes | FC 0x03 (holding registers) |
| Registers polled | 7 groups |
| Scaling | x10 for voltages (coefficient 0.1). Temperatures packed into single register. |
| Documentation | Semi-public -- community-documented SRNE ML series protocol |
| Status | **Profile complete** |

All the listed brands are confirmed to use the identical SRNE Modbus register map. This single profile covers the largest number of brands of any vendor.

### 3.3 Growatt (SPF series) -- Vendor ID 2, TLV 0x04

| Parameter | Value |
|-----------|-------|
| Interface | RS-485 via screw terminal or DB9 |
| Baud | 9600, 8N1 |
| Slave ID | 1 |
| Function codes | FC 0x04 (input registers), FC 0x03 (holding registers) |
| Registers polled | 6 groups |
| Documentation | Public -- "Growatt PV Inverter Modbus RS485 RTU Protocol v3.04" |
| Status | **Profile defined, marked as placeholder -- needs device verification** |
| Note | Different Growatt product lines (SPF, SPH, MOD, MIN) have different register maps. Min 850ms between commands recommended. |

---

## 4. Candidate Manufacturers -- Feasibility Analysis

### 4.1 Morningstar (TriStar MPPT, ProStar MPPT)

| Parameter | Value |
|-----------|-------|
| Modbus RTU | Yes, native |
| Interface | RS-485 + RS-232 built-in (TriStar MPPT) |
| Baud | 9600, 8N1 |
| Slave ID | 1 (configurable 1-247) |
| Function codes | FC 0x04 (input registers for real-time data) |
| Key registers | 0x0008: battery V, 0x000B: charge current, 0x000C: battery temp, 0x0027: charge state |
| Documentation | Excellent -- official "TriStar MPPT MODBUS Specification V11" (MS-002582), publicly available |
| Auto-detect probe | FC 0x04, register 0x0008 (battery voltage -- always non-zero when powered) |

**Scaling quirk:** Morningstar uses a non-linear scaling formula:

```
voltage = raw_value * 96.667 / 32768
current = raw_value * 66.667 / 32768
```

This is NOT a simple multiply-by-coefficient. The backend parser must implement this formula. However, the firmware side is unaffected -- it copies raw bytes.

**Integration effort:** LOW (firmware) / MEDIUM (backend)
- Firmware: define profile blob (~40 bytes), add to table. Estimated 30 minutes.
- Backend: new TLV tag parser with Morningstar-specific scaling formulas.

**Market relevance:** HIGH for commercial/industrial off-grid (telecoms towers, remote monitoring stations, military installations). Premium product.

**Feasibility: HIGH**

---

### 4.2 Midnite Solar (Classic 150/200/250)

| Parameter | Value |
|-----------|-------|
| Modbus RTU | Yes, native |
| Interface | RS-232 (DE-9 connector). RS-485 via external converter. |
| Baud | 19200, 8N1 |
| Slave ID | 10 (non-standard default, configurable) |
| Function codes | FC 0x03 (holding registers) |
| Key registers | 4115: battery V, 4116: PV V, 4117: battery I, 4118: watts, 4119: charge state |
| Scaling | Simple /10 for V/A. Integer watts directly. |
| Documentation | Good -- "MidNite Solar MODBUS Network Spec Rev C.5", publicly available |
| Auto-detect probe | FC 0x03, register 4115 (battery voltage) |

**Physical interface caveat:** The Classic series has RS-232 natively, NOT RS-485. An RS-232-to-RS-485 level converter would be required between the WakeCap add-on board and the Classic controller. This is external hardware, not a firmware issue.

**Integration effort:** LOW (firmware) / LOW (backend)
- Firmware: profile blob with slave_id=10, baud_code=BAUD_CODE_19200. 19200 baud is already supported by the nRF52 UART driver.
- Backend: simple /10 scaling, straightforward parser.
- Hardware: external RS-232 to RS-485 converter required.

**Market relevance:** MEDIUM. Popular in North American off-grid community. Being discontinued by Midnite Solar (Classic line replaced by Rosie series).

**Feasibility: MEDIUM-HIGH** (firmware trivial, but RS-232 physical layer adds hardware complexity)

---

### 4.3 Schneider Electric (Conext MPPT 60-150, MPPT 80-600)

| Parameter | Value |
|-----------|-------|
| Modbus RTU | Via Conext Modbus Converter gateway (RNW865105x) |
| Native protocol | Xanbus (CAN-based) -- NOT Modbus |
| Interface | Xanbus to RS-485 via gateway device (~$200) |
| Baud | 9600 or 19200 (configurable on gateway) |
| Documentation | Good -- Schneider publishes Modbus Map PDFs per device |

**Blocker:** The charge controller itself does NOT speak Modbus. A separate Conext Modbus Converter must be purchased and wired between the Xanbus network and the RS-485 bus. This adds cost and physical complexity.

**If the gateway is present:** integration is straightforward. Standard FC 0x03/0x04, documented register maps, 9600 baud.

**Integration effort:** LOW (firmware, if gateway present) / HIGH (deployment -- requires gateway hardware)

**Market relevance:** HIGH in commercial solar. Schneider Conext is a tier-1 brand.

**Feasibility: MEDIUM** (technically easy, but gateway dependency makes deployment complex)

---

### 4.4 Studer Innotec (VarioTrack, VarioString)

| Parameter | Value |
|-----------|-------|
| Modbus RTU | Via Xcom-485i gateway module (~$300) |
| Native protocol | Studer proprietary internal bus |
| Interface | Xcom-485i converts to RS-485 |
| Baud | 9600 (default), configurable |
| Slave ID | Class-based: VarioTrack=21-35, VarioString=41-55 |
| Parity | **8E1 (even parity)** -- NOT the standard 8N1 |
| Documentation | Good -- official open-source Python library on GitHub |

**Blockers:**
1. Requires Xcom-485i gateway module (~$300).
2. Uses **even parity (8E1)** instead of 8N1. The firmware currently initializes UART with 8N1. Adding parity support requires a small UART configuration change (the nRF52 UARTE supports parity natively, so the change is minor).

**Integration effort:** MEDIUM (firmware -- add parity support) / HIGH (deployment -- requires gateway)

**Market relevance:** LOW-MEDIUM. Popular in European off-grid, particularly Switzerland/France.

**Feasibility: LOW-MEDIUM** (gateway + parity change)

---

### 4.5 Victron Energy (SmartSolar, BlueSolar MPPT)

| Parameter | Value |
|-----------|-------|
| Modbus RTU | **NOT SUPPORTED** on any MPPT product |
| Native protocol | VE.Direct (proprietary UART, 19200 baud, text/hex frames) |
| Modbus option | Modbus TCP only, via GX devices (Cerbo GX) over Ethernet |
| Interface | VE.Direct (JST-PH 4-pin, 3.3V UART) |

**Hard blocker:** Victron MPPTs do not support Modbus RTU at all. The VE.Direct protocol is a completely different, proprietary protocol that uses text-based frames, not Modbus register reads.

Supporting Victron would require:
- A separate firmware module implementing VE.Direct protocol parsing
- Different physical connector (JST-PH 4-pin, 3.3V logic -- NOT RS-485 differential)
- This is a fundamentally different integration, not an extension of the Modbus profile system

**Market relevance:** VERY HIGH. Victron is one of the most popular off-grid brands globally.

**Feasibility: NOT FEASIBLE via Modbus.** Requires a dedicated VE.Direct firmware module (separate project).

---

### 4.6 OutBack Power (FLEXmax 60/80)

| Parameter | Value |
|-----------|-------|
| Modbus RTU | NOT available directly |
| Native protocol | OutBack proprietary bus via HUB4/HUB10 |
| Modbus option | Modbus TCP only via AXS Port (~$300+), Ethernet only |

**Hard blocker:** No RS-485 Modbus RTU interface on any OutBack charge controller. The proprietary OutBack bus communicates through a HUB device and requires the AXS Port for Modbus TCP (Ethernet).

**Feasibility: NOT FEASIBLE**

---

### 4.7 SMA Solar

| Parameter | Value |
|-----------|-------|
| Products | Primarily grid-tie inverters, NOT standalone MPPT charge controllers |
| Modbus | SunSpec Modbus profile, primarily TCP-based |
| RS-485 | Available on some inverter models (Sunny Island) with SICOMM module |

SMA does not manufacture standalone MPPT solar charge controllers for battery-based off-grid systems. Their products are inverters with integrated MPPT for grid-tied applications.

**Feasibility: NOT APPLICABLE** (no standalone MPPT product)

---

### 4.8 Voltronic Power / Axpert / MPP Solar

| Parameter | Value |
|-----------|-------|
| Modbus RTU | Via optional Modbus Card accessory (not built-in) |
| Native protocol | Text-based query protocol (QPIGS, QPIRI commands over RS232/USB) |
| Baud | 9600 (Modbus Card) |
| Documentation | Poor -- semi-public, community reverse-engineered |

**Blockers:** Modbus is not the primary interface; most units use the text-based QPIGS protocol. The optional Modbus Card adds cost and is not always available. Documentation quality is low.

**Feasibility: LOW** (optional hardware, poor documentation)

---

### 4.9 PowMr Hybrid Inverters (Must Solar platform)

| Parameter | Value |
|-----------|-------|
| Modbus RTU | Yes, but poorly documented |
| Baud | **2400** (non-standard) |
| Slave ID | **5** (non-standard) |
| Documentation | Not officially public. PowMr states "code isn't open sourcing." |

**Note:** This refers to PowMr-branded hybrid **inverters**, NOT PowMr-branded SRNE charge controllers (those are already covered under the SRNE profile in Section 3.2).

**Blockers:** 2400 baud is not in the current baud code table (would need to be added). Documentation is incomplete and community-reverse-engineered.

**Feasibility: VERY LOW**

---

### 4.10 JNGE (JN-MPPT series)

| Parameter | Value |
|-----------|-------|
| Modbus RTU | Yes, native RS-485 |
| Baud | 9600, 8N1 |
| Slave ID | 1 |
| Function codes | FC 0x03 (holding registers) |
| Documentation | Semi-public -- protocol doc exists, ESPHome component provides register map |

Technically straightforward to add. Standard RS-485, 9600 baud, FC 0x03.

**Market relevance:** Very low outside China.

**Feasibility: MEDIUM** (easy technically, limited market demand)

---

## 5. Feasibility Summary Matrix

| # | Manufacturer | Modbus RTU | RS-485 Native | Baud | Doc Quality | FW Effort | HW Change | Backend Effort | Priority |
|---|---|---|---|---|---|---|---|---|---|
| 1 | EPEver | Yes | Yes | 115200 | Excellent | -- | -- | -- | **DONE** |
| 2 | SRNE + 6 clones | Yes | Yes | 9600 | Good | -- | -- | -- | **DONE** |
| 3 | Growatt | Yes | Yes | 9600 | Good | Verify | None | Low | **DONE (verify)** |
| 4 | **Morningstar** | Yes | Yes | 9600 | Excellent | **Low** | None | Medium | **HIGH** |
| 5 | **Midnite Solar** | Yes | RS-232 | 19200 | Good | **Low** | RS-232 adapter | Low | **MEDIUM** |
| 6 | Schneider | Via gateway | No | 9600 | Good | Low | Gateway ~$200 | Medium | LOW |
| 7 | Studer | Via gateway | No | 9600 | Good | Medium | Gateway ~$300 | Medium | LOW |
| 8 | Victron | **No** | No | -- | -- | **N/A** | Different HW | -- | **BLOCKED** |
| 9 | OutBack | **No** | No | -- | -- | **N/A** | Different HW | -- | **BLOCKED** |
| 10 | SMA | N/A | N/A | -- | -- | N/A | -- | -- | N/A |
| 11 | Voltronic | Optional | No | 9600 | Poor | Low | Modbus Card | High | VERY LOW |
| 12 | PowMr Hybrid | Yes | Varies | 2400 | Poor | Medium | None | High | VERY LOW |
| 13 | JNGE | Yes | Yes | 9600 | Fair | **Low** | None | Low | LOW |

---

## 6. Effort Estimates for Adding a New Vendor

Adding a new vendor to the firmware follows a repeatable process with no structural code changes:

### 6.1 Firmware Changes (Per Vendor)

| Step | Description | Effort |
|------|-------------|--------|
| 1 | Define `PROFILE_NEWVENDOR[]` blob in `modbus_vendor_profiles.h` | 15 min |
| 2 | Add `VENDOR_ID_NEWVENDOR` define, increment `NUM_VENDOR_PROFILES` | 5 min |
| 3 | Register in `profile_table[]` in `modbus_vendor_profiles.c` | 5 min |
| 4 | Test with actual device (or Modbus simulator) | 1-4 hours |
| **Total firmware** | | **~2-5 hours per vendor** |

### 6.2 Backend Changes (Per Vendor)

| Step | Description | Effort |
|------|-------------|--------|
| 1 | Add TLV tag parser for the new vendor's data layout | 2-4 hours |
| 2 | Implement vendor-specific scaling (most are simple x0.01 or x0.1) | 1-2 hours |
| 3 | Map parsed fields to database schema | 1-2 hours |
| 4 | Test end-to-end | 2-4 hours |
| **Total backend** | | **~6-12 hours per vendor** |

### 6.3 The Morningstar Exception

Morningstar uses a non-linear scaling formula that differs from other manufacturers:

```
voltage = raw_value * Vscale / 32768    (Vscale = 96.667 for 12V systems)
current = raw_value * Iscale / 32768    (Iscale = 66.667 or 316.667 depending on model)
```

The firmware side is unaffected (raw bytes are copied as-is). The backend parser needs to implement these formulas instead of simple coefficient multiplication. This adds ~2 hours to backend effort.

---

## 7. Recommendations

### 7.1 Immediate (Next Sprint)

**Morningstar TriStar/ProStar MPPT** -- Vendor ID 3, TLV 0x05
- Best-documented protocol of any candidate
- Native RS-485, 9600 baud, FC 0x04 -- fully compatible with existing hardware
- No firmware architecture changes needed
- Popular in commercial/industrial deployments (telecom towers, remote sites)
- Firmware effort: ~2 hours. Backend effort: ~8 hours (scaling formulas).

### 7.2 Near-Term (Next Quarter)

**Midnite Solar Classic** -- Vendor ID 4, TLV 0x06
- Good documentation, simple scaling (/10)
- Native RS-232 requires external level converter (minor BOM addition if offered as option)
- 19200 baud already supported by nRF52 driver
- Firmware effort: ~2 hours. Hardware note required for RS-232 adapter.

**JNGE** -- Vendor ID 5, TLV 0x07
- Only if there is customer demand from Chinese/Asian markets
- Standard 9600/FC03/RS485 -- trivially easy to add
- Firmware effort: ~2 hours.

### 7.3 Conditional (Customer-Driven)

**Schneider Conext** and **Studer** -- only pursue if specific customer deployments require them. Both need gateway hardware ($200-$300) which changes the deployment model.

### 7.4 Not Recommended for Modbus

| Manufacturer | Reason |
|---|---|
| Victron | No Modbus RTU support. Requires separate VE.Direct protocol module -- separate project scope. |
| OutBack | No direct RS-485 interface. Modbus TCP only via expensive gateway. |
| Voltronic/Axpert | Primary interface is non-Modbus text protocol. Optional Modbus Card poorly documented. |
| PowMr Hybrid Inverters | Non-standard 2400 baud, slave ID 5, poor documentation. |
| SMA | No standalone MPPT charge controller product. |

### 7.5 Future Consideration: Victron VE.Direct

Victron's market dominance in off-grid solar makes it a strategic gap. However, VE.Direct is NOT Modbus -- it requires:
- Different protocol parser (text/hex frame decoding)
- Different physical interface (3.3V UART, JST-PH connector, not RS-485)
- Potentially a hardware revision or separate adapter board

This should be scoped as a **separate project**, not an extension of the Modbus vendor profile system.

---

## 8. Architecture Assessment: Scalability

The current firmware architecture is well-designed for multi-vendor support:

| Aspect | Assessment |
|--------|------------|
| Adding a new vendor | ~40 bytes flash per profile, no code changes to polling engine |
| Max vendors supported | 16 (4-bit vendor_id in persistent storage) |
| Flash overhead for 16 vendors | ~640 bytes (negligible) |
| RAM overhead | Zero per-vendor (single decoded struct reused) |
| Auto-detection | Currently EPEver-only; should be extended to iterate all profiles' detect registers |
| Backend impact | Each vendor gets a unique TLV tag, requiring a new parser per vendor |
| NFC configuration | Single digit for vendor_id (0-9 via NFC, 0-15 via storage) |

**One improvement recommended:** Extend auto-detection in `modbus_addon_auto_detect()` to iterate through all vendor profiles' detection registers instead of only probing EPEver's 0x311A. This would allow the add-on to automatically identify any connected MPPT brand without NFC configuration. The vendor profile already contains `detect_reg_addr` and `detect_func_code` fields for this purpose -- the infrastructure is built but not yet utilized for multi-vendor probing.

---

## 9. Conclusion

The WakeCap Modbus MPPT firmware architecture is already built for multi-manufacturer support. Adding new vendors is a low-effort, repeatable process (define blob, register, test). Of the 10 candidate manufacturers researched:

- **1 is immediately actionable** (Morningstar -- excellent docs, native RS-485, high market value)
- **2 are near-term candidates** (Midnite Solar, JNGE -- with caveats)
- **2 require gateway hardware** (Schneider, Studer -- customer-driven only)
- **5 are not feasible** via Modbus RTU (Victron, OutBack, SMA, Voltronic, PowMr Hybrid)

The single highest-impact addition would be **Morningstar**, followed by considering **Victron VE.Direct as a separate project** given Victron's market dominance.

---

## Appendix A: Quick Reference -- Adding a New Vendor Profile

```c
/* Step 1: modbus_vendor_profiles.h -- define profile blob */
#define VENDOR_ID_MORNINGSTAR  3
#define NUM_VENDOR_PROFILES    4   /* was 3 */

static const uint8_t PROFILE_MORNINGSTAR[] = {
    0x01,                       /* version */
    VENDOR_ID_MORNINGSTAR,      /* vendor_id */
    0x01,                       /* slave_id */
    BAUD_CODE_9600,             /* baud = 9600 */
    0x05,                       /* tlv_tag (next available) */
    0x06,                       /* num_registers */
    0x00, 0x08,                 /* detect_reg = 0x0008 (battery V) */
    0x04,                       /* detect_fc = FC 0x04 */
    0x01,                       /* detect_reg_count = 1 */
    0x00, 0x00,                 /* flags + reserved */
    /* register descriptors */
    0x00, 0x08, 0x04, 0x02,    /* 0x0008, FC04, 2 regs -- battery V + sense V */
    0x00, 0x0B, 0x04, 0x02,    /* 0x000B, FC04, 2 regs -- charge I + battery temp */
    0x00, 0x0E, 0x04, 0x02,    /* 0x000E, FC04, 2 regs -- PV array V + sweep Vmp */
    0x00, 0x12, 0x04, 0x01,    /* 0x0012, FC04, 1 reg  -- charge state */
    0x00, 0x1C, 0x04, 0x02,    /* 0x001C, FC04, 2 regs -- daily Ah + daily Wh */
    0x00, 0x27, 0x04, 0x01,    /* 0x0027, FC04, 1 reg  -- load state */
};

/* Step 2: modbus_vendor_profiles.c -- register in lookup table */
[VENDOR_ID_MORNINGSTAR] = { PROFILE_MORNINGSTAR, sizeof(PROFILE_MORNINGSTAR) },

/* Step 3: NFC config -- vendor digit '3' selects Morningstar */
/* modbus=2006003 → MPPT, 60s poll, vendor 3 (Morningstar) */
```

No changes needed in `wc_addon_modbus_mppt.c`, `wc_addon_modbus.c`, or any other file. The generic polling engine handles the rest.

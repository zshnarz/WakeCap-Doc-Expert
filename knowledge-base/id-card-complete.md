# WakeCap Rechargeable ID Card - Product Knowledge

## 1. Product Identity

| Parameter | Value |
|-----------|-------|
| Product Name | WakeCap Rechargeable ID Card |
| Product Code | ID |
| Internal Designation | WC-ID |
| Model Number | [TBD] |
| Part Number | [TBD] |
| Hardware Revision | Rechargeable version (current); non-rechargeable (discontinued) |
| Firmware Versions | 3.5.2 (current production), 3.4.24 (previous) |
| Wirepas Stack Version | V5 (Wirepas Mesh) |
| OEM Manufacturer | Minew Technology (via Sally, China) |
| Equipment Classification | Wirepas Mesh Tag / Personnel Tracking Device |
| Primary Purpose | Real-time indoor/outdoor personnel tracking, attendance monitoring, and zone-based detection on construction and oil & gas sites |

### 1.1 Variants

| Variant | Description | Status |
|---------|-------------|--------|
| Rechargeable ID Card | USB-rechargeable, 365 mAh LiPo battery | Current production |
| Non-Rechargeable ID Card | Sealed, non-rechargeable battery | Discontinued |

**Non-rechargeable card notes:**
- Lifetime was approximately 9-12 months
- Sealed unit — programming pins not accessible after manufacture
- Once battery depleted, card must be discarded
- Discontinued in favor of rechargeable version

### 1.2 Package Contents

| Item | Quantity | Part Number |
|------|----------|-------------|
| WakeCap Rechargeable ID Card | 1 | [TBD] |
| USB Charging Cable | [TBD] | [TBD] |

### 1.3 Physical Component Identification

| # | Component | Description |
|---|-----------|-------------|
| 1 | Card body | Completely white plastic housing (no external markings per design spec) |
| 2 | USB charging port | Micro-USB / USB-C [TBD] port for recharging |
| 3 | LED indicator | Status LED for power, charging, and operational feedback |
| 4 | NFC area | NFC antenna zone for configuration and diagnostics via WakeCap mobile app |
| 5 | Power button | [TBD] — used for reboot/power cycle |

### 1.4 Ordering Information

| Parameter | Value |
|-----------|-------|
| Minimum Order Quantity (MOQ) | 3,000 pieces |
| Lead Time (production) | 4-7 weeks |
| Supplier Contact | Sally (Minew factory liaison, China) |
| Shipping | DHL international from China |
| R&D / Customization | WakeCap provides production firmware HEX file; factory flashes during production |

### 1.5 Accessories

| Item | Description |
|------|-------------|
| UV Flatbed Printer | Used on-site (SGS) to print employee photos, names, and details on both sides of the card |
| Ink Cartridges | UV ink compatible with card surface material; stock sufficient for ~6,000 cards per set |
| Lanyard / Card Holder | [TBD] — used for wearing the card on-site |

### 1.6 Related Documents

| Document | ID | Description |
|----------|----|-------------|
| Product Datasheet | WC-ID-DS-v1.0 | Summary specifications |
| Product Manual | WC-ID-PM-v1.0 | Comprehensive technical reference |
| Quick Reference | WC-ID-QR-v1.0 | Field reference / user guide for clients |
| Setup Guide | WC-ID-SG-v1.0 | Configuration and deployment |
| Troubleshooting Guide | WC-ID-TG-v1.0 | Symptom-based diagnostics |

### 1.7 Design Appearance

- Card is **completely white** with no markings (per Hassan's design requirement)
- Employee details (photo, name, ID number, contact info) are printed on-site using UV flatbed printer
- Both sides of the card are printable (requires manual flipping for second side)
- Cards are thicker than standard ID cards — standard card printers cannot be used; UV flatbed printer is required
- High-quality scans of existing card designs available from SGS team (Albaraa)

---

## 2. Specifications

### 2.1 Physical Specifications

| Parameter | Value |
|-----------|-------|
| Dimensions | 86 x 55 x 6 mm (credit card form factor) |
| Weight | [TBD] |
| Color | White (all-white body) |
| Material | Plastic [TBD] |
| IP Rating | [TBD] |

### 2.2 Electrical Specifications

| Parameter | Value |
|-----------|-------|
| Battery Type | Lithium Polymer (LiPo) |
| Battery Capacity (current batch) | 365 mAh |
| Battery Capacity (previous batch) | 290 mAh |
| Charging Interface | USB [TBD] |
| Charging Time | [TBD] |
| Average Current Consumption | ~60 uA (at 30 s scan interval) |
| Low Battery Voltage Threshold | [TBD] — triggers email notification via WCA-20278 |

### 2.3 Battery Life Estimates

| Scan Interval | Estimated Battery Life |
|---------------|----------------------|
| 30 seconds | ~1 month (rechargeable) |
| 3 minutes | ~3 months (rechargeable) |
| [TBD] | ~1.5 months (typical field recharge interval) |

**Note:** The 1.5-month recharge interval has been flagged by Trackfy/Brazil clients as a hurdle for adoption. Some clients prefer longer intervals without recharging.

### 2.4 Radio / Communication Specifications

| Parameter | Value |
|-----------|-------|
| Wireless Protocol | Wirepas Mesh V5 |
| Radio Frequency | 2.4 GHz ISM band [TBD] |
| Mesh Role | Leaf node (tag) |
| NFC | Supported — for configuration and diagnostics |
| Bluetooth | [TBD] |

### 2.5 Environmental Specifications

| Parameter | Value |
|-----------|-------|
| Operating Temperature | [TBD] |
| Storage Temperature | [TBD] |
| Humidity | [TBD] |

---

## 3. Interfaces

### 3.1 USB Charging Port

| Parameter | Value |
|-----------|-------|
| Connector Type | [TBD — Micro-USB or USB-C] |
| Purpose | Battery recharging only |
| Data Transfer | Not used for data [TBD] |

### 3.2 NFC Interface

| Parameter | Value |
|-----------|-------|
| NFC Standard | [TBD] |
| Purpose | Device configuration, firmware parameter read, diagnostics |
| Tool | WakeCap Mobile App (NFC read/write) |
| Capabilities | Read device parameters (project name, firmware version, battery voltage, scan interval); Write configuration changes |

### 3.3 Wirepas Mesh Radio

| Parameter | Value |
|-----------|-------|
| Protocol | Wirepas Mesh V5 |
| Role | Tag / Leaf Node |
| Communication Path | ID Card → Anchor(s) → Gateway → WakeCap Cloud |
| Data Transmitted | Device ID, RSSI, battery voltage, scan timestamp |
| Scan Interval | Configurable via NFC (typical: 30 s to 3 min) |

### 3.4 LED Indicator

| LED State | Meaning |
|-----------|---------|
| Green blink (single, on power button press) | Card is powered on / booting |
| [TBD] — charging state | Card is charging via USB |
| [TBD] — fully charged | Charging complete |
| No LED response | Card may be fully discharged or defective |

---

## 4. Procedures

### 4.1 Initial Setup / Provisioning

**Prerequisites:**
- WakeCap Mobile App installed on smartphone with NFC capability
- Card charged via USB cable
- WakeCap project created on the portal with network configured

**Steps:**
1. Charge the ID card fully using the USB cable before first use.
2. Open the WakeCap Mobile App on your smartphone.
3. Hold the card near the phone's NFC antenna area.
4. Tap "Read Device" to verify current configuration (project name, network ID, scan interval).
5. If configuration is needed, write the correct project parameters via NFC.
6. Verify the card appears as "Online" on the WakeCap Portal within 5-10 minutes.
7. Assign the card to a worker in the WakeCap Portal.

### 4.2 Printing Employee Details on Card

**Prerequisites:**
- UV flatbed printer (model 6050 or 6090 recommended)
- UV ink (compatible with card surface)
- Design files / high-quality employee photo

**Steps:**
1. Prepare the print design with employee photo, name, employee ID, and contact details.
2. Place the ID card face-up on the UV flatbed printer bed.
3. Align the card using the printer's positioning guides.
4. Print the front side of the card.
5. Manually flip the card to print the back side.
6. Allow UV ink to cure before handling.

**Note:** Standard card printers cannot be used because the WakeCap ID card is thicker than standard PVC cards (6 mm vs ~0.76 mm).

### 4.3 Charging the Card

**Steps:**
1. Connect the USB charging cable to the card's charging port.
2. Observe the LED indicator for charging status [TBD — color/pattern].
3. Charge until the LED indicates full charge [TBD — color/pattern].
4. Disconnect the cable.

**Recommended recharge schedule:** Every 1-1.5 months depending on scan interval configuration.

### 4.4 Firmware Update

Firmware updates are performed at the factory level (Minew, via Sally in China). Field firmware updates are not performed on ID cards.

**Factory firmware update process:**
1. WakeCap engineering team prepares the production firmware HEX file.
2. HEX file is shared with Sally along with a screenshot of NFC tapping test for verification.
3. Factory flashes firmware onto cards during production.
4. Sample cards are shipped (via DHL) for verification before bulk production.

**Important:** When ordering new batches, confirm that the PCB design/pinout has not changed. Firmware is designed based on the specific PCB pinout provided by the manufacturer. Any schematic change requires firmware adaptation.

### 4.5 Card Distribution to Workers

**Based on KSP Head Office deployment process:**
1. Register the card in the WakeCap Portal.
2. Assign the card to an employee with their details (name, employee ID).
3. Print employee details on the card using UV printer.
4. Provide the card to the employee along with a Standard Operating Procedure (SOP) document.
5. Instruct the employee on proper card wearing and charging procedures.

### 4.6 Rebooting a Card

1. Press the power button on the card.
2. Observe the LED — a green blink indicates the card is rebooting.
3. Wait 2-5 minutes for the card to rejoin the Wirepas mesh network.
4. Verify the card appears as "Online" on the WakeCap Portal.

---

## 5. Safety

### 5.1 Battery Safety

> **CAUTION:** The ID card contains a Lithium Polymer (LiPo) battery. Do not puncture, crush, or expose to extreme heat (above 60 deg C). Damaged batteries may swell, leak, or ignite.

> **WARNING:** Do not attempt to open the card housing to access or replace the battery. The device is sealed and not user-serviceable.

> **NOTICE:** Dispose of depleted or damaged cards in accordance with local electronic waste and lithium battery disposal regulations. Do not discard in general waste.

### 5.2 Charging Safety

> **CAUTION:** Use only the recommended USB cable for charging. Using incompatible chargers may damage the battery or the card.

> **NOTICE:** Do not charge cards in direct sunlight or in environments above [TBD] deg C. Excessive heat during charging may reduce battery lifespan.

### 5.3 Environmental Safety

> **NOTICE:** The ID card is designed for use in construction and industrial environments. However, it is not rated for use in hazardous (Ex/ATEX) zones unless specifically certified. Consult WakeCap engineering before deploying in classified areas.

### 5.4 Free Fall Detection

The rechargeable ID card supports **free fall detection** capability via its onboard accelerometer. However, there is a higher chance of false positives compared to helmet-mounted devices because the card is not rigidly fixed to the wearer's body.

> **NOTICE:** Free fall detection on ID cards may produce false positive alerts due to the card's non-fixed wearing position. Consider this when configuring alert thresholds and response procedures.

---

## 6. Troubleshooting

### 6.1 Common Issues

| Symptom | Possible Cause | Fix |
|---------|---------------|-----|
| Card does not appear as "Online" on portal | Card battery fully depleted | Charge the card via USB for at least 30 minutes, then reboot |
| Card does not appear as "Online" after reboot | Card is out of range of any anchor | Move to an area with known anchor coverage and wait 5 minutes |
| Card does not appear as "Online" after reboot | Wirepas network configuration mismatch | Use NFC via WakeCap app to verify project and network parameters |
| LED blinks on button press but card stays offline | Firmware or network issue | Verify via NFC that firmware version is 3.5.2 and network ID matches project |
| NFC read fails | Card not positioned correctly on phone | Ensure NFC antenna area of phone aligns with NFC zone on the card |
| NFC read fails (pre-production units) | Known issue with some early samples | Contact WakeCap engineering (Sreejit/Rami) for replacement |
| Detection delays / multiple consecutive detections in short intervals | System-level card reading delay | Report to WakeCap engineering with card ID and Detection History screenshot |
| Almost all cards showing detection delays on-site | Network congestion or anchor coverage gap | Review anchor placement and network capacity; contact WakeCap support |
| Card not detected by NFC reader after charging | Possible hardware defect | Verify LED blinks on power button press; if LED works but NFC fails, escalate to engineering |
| Low battery notifications not received | Email notification service issue (WCA-20278) | Verify email settings in portal; check with Venky/backend team for service status |
| Cards with "last seen" older than 24 hours not in low-battery email | Known limitation (WCA-20358) | These cards are excluded from the notification batch; physically locate and charge them |

### 6.2 Wirepas V4 to V5 Incompatibility

> **WARNING:** Cards running Wirepas V4 firmware are NOT compatible with Wirepas V5 networks (and vice versa). If upgrading a site's network from V4 to V5, all ID cards must also be updated. Contact WakeCap engineering for firmware migration support.

### 6.3 Detection Issues at SGS

At the SGS deployment (5,800+ cards), the following recurring issues have been observed:
- Detection delays where multiple consecutive detections occur within short time intervals
- Misreadings reported across "almost all cards" at times
- Investigation ongoing with WakeCap engineering (Sreejit, Rami)

---

## 7. Glossary and Definitions

| Term | Definition |
|------|-----------|
| WC-ID | WakeCap internal product designation for the ID Card |
| Wirepas | A wireless mesh networking protocol used by WakeCap devices for communication |
| Wirepas V5 | Current version of the Wirepas mesh stack used in production |
| NFC | Near Field Communication — short-range wireless technology used for card configuration |
| LiPo | Lithium Polymer — rechargeable battery chemistry used in the ID card |
| MOQ | Minimum Order Quantity — smallest production batch the manufacturer will produce (3,000 pcs for ID cards) |
| UV Flatbed Printer | Industrial printer that uses UV-curable ink to print directly on rigid/thick surfaces like ID cards |
| Anchor | WakeCap fixed infrastructure node that detects nearby tags (ID cards, helmets) via Wirepas mesh |
| Gateway | WakeCap device that bridges the Wirepas mesh network to the cloud via Ethernet or cellular |
| Scan Interval | Time between consecutive radio transmissions from the ID card; configurable via NFC |
| WCA-20278 | Jira ticket for the "low battery voltage email notification" feature for rechargeable ID cards |
| SOP | Standard Operating Procedure — document provided to workers explaining card usage |
| ERP Integration | Enterprise Resource Planning system integration — WakeCap cards integrated with client HR/attendance systems (e.g., KSP) |
| Free Fall Detection | Accelerometer-based feature that detects sudden drops, indicating a potential fall incident |
| RSSI | Received Signal Strength Indicator — radio signal strength used for proximity/location estimation |
| Minew | OEM hardware manufacturer (China) that produces the ID card PCBs and assembles the devices |
| Sally | WakeCap's procurement contact / liaison with Minew factory in China |
| ANATEL | Brazil's national telecommunications agency — certification required for devices sold in Brazil |

---

## 8. Deployment Reference

### 8.1 Active Deployments

| Project | Cards Deployed | Notes |
|---------|---------------|-------|
| SGS (Saudi Arabia) | 5,876+ printed (ongoing) | Largest deployment; UV printers on-site; daily printing operations |
| KSP Head Office (Saudi Arabia) | 100 deployed, expanding to 350 | ERP integration with KSP system; SOP distributed to employees |
| ARAMCO sites | [TBD] | Various ARAMCO project deployments |
| Trackfy / Brazil | Evaluating | Recharge interval (1.5 months) flagged as concern; exploring alternatives (FOB with lanyard, adapted asset board) |
| APEX (USA) | [TBD] | Free fall detection enabled on current ID cards |

### 8.2 KSP ERP Integration Details

- WakeCap ID cards integrated with KSP's ERP system for automated attendance tracking
- Data pushed to ERP includes: Employee Name, Employee ID, attendance times
- Feature request: "Inactive Hours" field to also be integrated
- UAT completed; production deployment confirmed operational
- Managed via Jira ticket and BRD document

### 8.3 Access Control Integration

- WakeCap ID cards can be used with Hikvision Access Control devices
- NFC card data syncs to Hikvision devices every 3 hours
- Integration supports: door access, face recognition, real-time event monitoring
- Access Controls portal released Feb-Mar 2026 with Hikvision integration

### 8.4 Low Battery Email Notification (WCA-20278)

- Feature deployed: sends email notifications when rechargeable ID card voltage drops below threshold
- Training provided to SGS field team (Albaraa) on threshold identification, backend setup, and response procedures
- Known limitations:
  - Email address validation was inaccurate (WCA-20333)
  - Battery percentage not yet included in email (WCA-20357)
  - Cards with "last seen" > 24 hours are excluded from notification (WCA-20358)

---

## 9. Manufacturing & Supply Chain Notes

### 9.1 Production Process

1. WakeCap provides production firmware HEX file to Minew (via Sally).
2. Minew manufactures PCBs according to their schematic design.
3. WakeCap firmware is flashed during production.
4. Sample cards shipped (DHL) for NFC verification before bulk order.
5. Bulk production runs after WakeCap approval.

### 9.2 Key Considerations

- **PCB pinout verification:** Before every new production run, confirm PCB pinout hasn't changed. WakeCap firmware is designed based on specific pinout from manufacturer.
- **Schematic changes:** Rechargeable version required a new schematic compared to the non-rechargeable version. Firmware had to be updated accordingly.
- **Testing firmware:** Manufacturer (Minew) should have their own testing firmware for PCB validation. WakeCap provides production firmware separately.
- **No local printer availability:** UV flatbed printers for card printing are not available locally in Saudi Arabia. Sourced from China (Sally) with 3-5 day shipping for printer delivery.

### 9.3 Printing Operations (SGS Reference)

| Metric | Value |
|--------|-------|
| Total cards printed (as of Sep 2026) | 5,876+ |
| Printers in use | 2 UV flatbed printers |
| Ink capacity | ~6,000 cards per ink set |
| Printer model | UV flatbed 6050/6090 |
| Printing capability | Single-side per pass (manual flip for back side) |
| Daily printing tracked via | Google Sheets (shared with management) |

### 9.4 ANATEL Certification (Brazil)

- Technical manuals for ANATEL certification completed by Carlos (Trackfy/Brazil team)
- Device designated as WC-ID (badge) in certification documentation
- Material sourced from Sally/Minew for certification package

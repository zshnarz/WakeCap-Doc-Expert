---
title: "WakeCap Rechargeable ID Card — Product Datasheet"
doc-id: WC-ID-DS-v1.1
product: Rechargeable ID Card
doc-type: Product Datasheet
revision-date: 2026-03-15
firmware-version: "3.5.2"
subtitle: "WC-ID | Wirepas Mesh V5 Personnel Tracking Tag"
author: "WakeCap Technologies"
---

# Product Summary

[IMAGE: Hero photo of the WakeCap Rechargeable ID Card — front view on white background, showing the completely white credit-card-sized device with USB charging port visible on the edge, professional product photography with soft shadow]

The WakeCap Rechargeable ID Card is a credit-card-form-factor Wirepas Mesh tag designed for real-time personnel tracking on construction and oil & gas sites. Each card is assigned to an individual worker, communicates wirelessly with WakeCap Anchors, and provides continuous attendance monitoring, zone-based detection, and free fall alerts through the WakeCap cloud platform.

## Applications

- Real-time personnel location tracking on construction mega-projects
- Automated attendance monitoring and time-on-site recording
- Zone-based entry/exit detection and restricted area alerts
- Worker fall detection and safety incident alerting
- Integration with client ERP and access control systems

# Key Specifications

| Parameter | Value | Unit |
|-----------|------:|:----:|
| Battery Type | Lithium Polymer (LiPo) | — |
| Battery Capacity | 365 | mAh |
| Average Current Consumption | ~60 (at 30 s scan) | uA |
| Battery Life (30 s scan) | ~1 | month |
| Battery Life (3 min scan) | ~3 | months |
| Charging Interface | USB [TBD] | — |
| Charging Time | [TBD] | — |
| Low Battery Threshold | [TBD] | V |

# Communication

| Parameter | Value |
|-----------|-------|
| Wireless Protocol | Wirepas Mesh V5 |
| Frequency Band | 2.4 GHz ISM |
| Mesh Role | Leaf node (tag) |
| Communication Path | Card → Anchor → Gateway → Cloud |
| Data Transmitted | Device ID, RSSI, battery voltage, timestamp |
| Scan Interval | Configurable via NFC (30 s to 3 min typical) |
| NFC | Supported — configuration and diagnostics |
| Bluetooth | [TBD] |

# Environmental Ratings

| Parameter | Min | Max | Unit |
|-----------|----:|----:|:----:|
| Operating Temperature | [TBD] | [TBD] | C |
| Storage Temperature | [TBD] | [TBD] | C |
| Operating Humidity | [TBD] | [TBD] | % RH |
| Ingress Protection | — | [TBD] | IP rating |

# Mechanical

| Parameter | Value | Unit |
|-----------|------:|:----:|
| Length | 86 | mm |
| Width | 55 | mm |
| Thickness | 6 | mm |
| Weight | [TBD] | g |
| Enclosure Material | Plastic [TBD] | — |
| Color | White (all-white body) | — |
| Carrying Method | Lanyard or card holder clip | — |

[IMAGE: Dimensioned outline drawing of the WakeCap ID Card showing front view with 86 mm width and 55 mm height, side view showing 6 mm thickness, and USB port location marked — clean technical line drawing on white background with dimension lines and arrows]

# Interfaces

| Interface | Type | Connector | Purpose |
|-----------|------|-----------|---------|
| USB | Power | [TBD] | Battery recharging |
| NFC | Wireless | Integrated antenna | Configuration, diagnostics |
| Wirepas Mesh | Wireless | Integrated antenna | Personnel tracking data |
| LED | Visual | Surface-mount | Power, charging, and status indication |

# LED Indicator

| State | Meaning |
|-------|---------|
| Green blink (on button press) | Card is powered on / rebooting |
| [TBD] | Charging in progress |
| [TBD] | Fully charged |
| No response | Battery depleted or card defective |

# Features

| Feature | Description |
|---------|-------------|
| Real-Time Tracking | Continuous location updates via Wirepas Mesh |
| Free Fall Detection | Onboard accelerometer detects potential fall incidents |
| NFC Configuration | Configure scan interval, network, and project via mobile app |
| Low Battery Alerts | Automated email notification when voltage drops below threshold |
| UV Printable Surface | Employee photo, name, and ID printed directly on card |
| Rechargeable Battery | USB-rechargeable LiPo, 365 mAh capacity |
| ERP Integration | Attendance data integrates with client HR/ERP systems |
| Access Control | Compatible with Hikvision access control via NFC sync |

# Certifications

| Standard | Status | Certificate # |
|----------|--------|---------------|
| ANATEL (Brazil) | Certified | [TBD] |
| CE | [TBD] | [TBD] |
| FCC | [TBD] | [TBD] |
| RoHS | [TBD] | [TBD] |

# Ordering Information

| Parameter | Value |
|-----------|-------|
| Product Name | WakeCap Rechargeable ID Card |
| Product Code | WC-ID |
| Part Number | [TBD] |
| Minimum Order Quantity | 3,000 pcs |
| Production Lead Time | 4-7 weeks |

## Accessories

| Item | Description | Part Number |
|------|-------------|-------------|
| USB Charging Cable | Charging cable for ID Card | [TBD] |
| Lanyard | Neck lanyard for card wearing | [TBD] |
| Card Holder | Clip-on holder for card | [TBD] |
| UV Flatbed Printer | For printing employee details on cards | [TBD] |
| UV Ink Cartridges | Compatible ink set (~6,000 cards per set) | [TBD] |

# System Requirements

The WakeCap Rechargeable ID Card operates as part of the WakeCap ecosystem:

| Component | Role |
|-----------|------|
| WakeCap Anchor | Detects ID Card radio signals and relays to gateway |
| WakeCap Gateway | Bridges mesh network data to the WakeCap cloud |
| WakeCap Portal | Web dashboard for monitoring, worker assignment, alerts |
| WakeCap Mobile App | NFC-based card configuration and diagnostics |

# Related Documents

| Document | ID |
|----------|----|
| User Guide and FAQ | WC-ID-UG-v1.0 |
| Product Manual | WC-ID-PM-v1.0 |
| Setup Guide | WC-ID-SG-v1.0 |
| Troubleshooting Guide | WC-ID-TG-v1.0 |

---
title: "WakeCap Rechargeable ID Card — User Guide & FAQ"
doc-id: WC-ID-UG-v1.1
product: Rechargeable ID Card
doc-type: User Guide
revision-date: 2026-03-15
firmware-version: "3.5.2"
subtitle: "For site workers, supervisors, and administrators"
author: "WakeCap Technologies"
---

# About Your WakeCap ID Card

The WakeCap Rechargeable ID Card is a wireless personnel tracking device designed for construction and industrial environments. The card communicates with WakeCap Anchors using Wirepas Mesh technology to provide real-time location tracking, attendance monitoring, and zone-based detection.

Each card is assigned to an individual worker and can be personalized with the employee's photo, name, and ID number using a UV flatbed printer.

## What the Card Does

- Transmits your location to the WakeCap system at regular intervals
- Reports battery voltage and device health to the WakeCap Portal
- Supports free fall detection to alert supervisors of potential fall incidents
- Enables zone-based attendance tracking and entry/exit monitoring

## What's on the Card

[IMAGE: Annotated diagram of the WakeCap Rechargeable ID Card showing all physical components — USB charging port, LED indicator, NFC area, and power button — with numbered callouts on a white card body, 86 x 55 mm credit card form factor]

| # | Component | Description |
|---|-----------|-------------|
| 1 | Card body | White plastic housing, 86 x 55 x 6 mm |
| 2 | USB charging port | Connect the charging cable here |
| 3 | LED indicator | Shows power, charging, and status |
| 4 | NFC area | Used by site administrators for configuration |
| 5 | Power button | Press to reboot the card |

# Wearing Your Card

::: {.notice}
Wear the card at all times while on-site. The card must be within range of WakeCap Anchors to record your attendance and location.
:::

- Attach the card to a lanyard and wear it around your neck, or place it in a card holder clipped to your clothing.
- Keep the card visible and accessible at all times.
- Do not place the card inside metal containers, tool boxes, or other shielded enclosures — this blocks the wireless signal.
- Avoid sitting or leaning on the card. Although designed for rugged environments, excessive pressure may damage the internal battery.

# Charging Your Card

## When to Charge

Charge your card **every 1 to 1.5 months**, depending on how your site administrator has configured the scan interval. Your site administrator or supervisor will notify you when cards need charging, either verbally or through the low-battery email notification system.

::: {.tip}
Establish a routine. For example, charge your card on the first working day of each month to avoid running out of battery mid-shift.
:::

## How to Charge

1. Connect the USB charging cable to the card's charging port.
2. Plug the other end into a USB power source (wall adapter, computer, or USB hub).
3. Observe the LED indicator:
   - [TBD] — Card is charging
   - [TBD] — Card is fully charged
4. Disconnect the cable when charging is complete.

[IMAGE: Step-by-step illustration showing USB cable being connected to the ID card charging port, with LED indicator highlighted and a USB wall adapter shown as the power source]

::: {.caution}
Use only the provided USB cable or a compatible replacement. Using damaged or incompatible cables may harm the battery.
:::

::: {.notice}
Do not charge cards in direct sunlight or in extremely hot environments. Excessive heat reduces battery lifespan.
:::

## Battery Life Reference

| Scan Interval | Approximate Battery Life |
|---------------|-------------------------|
| 30 seconds | ~1 month |
| 3 minutes | ~3 months |

Your site administrator can check the current scan interval via the WakeCap Mobile App using NFC.

# LED Indicator

The LED on the card communicates the card's status.

| What You See | What It Means |
|-------------|---------------|
| Green blink (single, when you press the power button) | Card is powered on and rebooting |
| [TBD] | Card is charging |
| [TBD] | Card is fully charged |
| No LED response when power button is pressed | Card battery is fully depleted — charge immediately |

::: {.note}
During normal operation, the LED does not stay on continuously. This is normal. The card is working even when no light is visible.
:::

# Checking Your Card Status

Workers can check their card status by asking their site supervisor or administrator to:

1. Open the **WakeCap Portal** on a computer or tablet.
2. Navigate to the worker's profile.
3. Verify the card shows as **"Online"** with a recent "Last Seen" timestamp.

Administrators can also use the **WakeCap Mobile App** with NFC to read detailed card parameters:

1. Open the WakeCap Mobile App on a smartphone with NFC.
2. Hold the ID card near the phone's NFC antenna area.
3. Tap **"Read Device"** to view:
   - Project name and network ID
   - Firmware version
   - Battery voltage
   - Scan interval

# Rebooting Your Card

If your card is not working as expected (e.g., not appearing as "Online" on the portal), try rebooting it:

1. Press the **power button** on the card.
2. Observe the LED — a **green blink** confirms the card is rebooting.
3. Wait **2 to 5 minutes** for the card to reconnect to the WakeCap network.
4. Ask your supervisor to verify the card appears as "Online" on the portal.

If the card still does not come online after rebooting, see the Troubleshooting section or contact your site administrator.

# Important Safety Information

::: {.warning}
Do not attempt to open the card housing. The card contains a sealed Lithium Polymer battery that is not user-serviceable. Opening the card may cause battery damage, swelling, or fire.
:::

::: {.caution}
Do not puncture, crush, bend excessively, or expose the card to extreme heat (above 60 C). Damaged batteries may swell, leak, or ignite.
:::

::: {.notice}
The card supports free fall detection. Because the card is not rigidly fixed to your body (unlike a helmet), occasional false alerts may occur. If you receive a fall alert in error, report it to your supervisor so the system can be adjusted.
:::

::: {.notice}
Dispose of damaged or end-of-life cards through your site's electronic waste disposal process. Do not discard in general waste. The card contains a lithium battery that must be handled according to local regulations.
:::

# Troubleshooting

| Problem | What to Do |
|---------|-----------|
| Card not showing as "Online" | Charge the card for at least 30 minutes, then press the power button to reboot. Wait 5 minutes and check again. |
| Card charged but still offline | Move to an area with known WakeCap anchor coverage. If still offline, ask your administrator to check the card's NFC configuration. |
| LED blinks on button press but card stays offline | Ask your site administrator to verify the firmware version (should be 3.5.2) and network ID using the WakeCap Mobile App. |
| NFC read fails on administrator's phone | Reposition the card — align the card's NFC area with the phone's NFC antenna. Try different orientations. |
| Card feels warm during charging | Disconnect immediately. Move the card away from heat sources. Retry charging in a cooler environment. If it happens again, report the card to your supervisor. |
| No LED at all, even after charging | The card may be defective. Report it to your site administrator for replacement. |
| You receive a false fall alert | Report it to your supervisor. The free fall sensitivity can be adjusted by WakeCap engineering. |

# Frequently Asked Questions

## General

**Q: What is the WakeCap ID Card?**

It is a wireless personnel tracking card that communicates with WakeCap infrastructure to record your attendance, location on-site, and zone entry/exit events in real time.

**Q: Do I need to do anything for the card to work?**

No. Once the card is charged and configured by your site administrator, it works automatically. Just wear it on-site.

**Q: Can the card track me outside the project site?**

No. The card only communicates with WakeCap Anchors installed on your project site. It does not use GPS and has no tracking capability beyond the site boundary.

## Charging

**Q: How often do I need to charge my card?**

Approximately every 1 to 1.5 months, depending on site configuration. Your supervisor will inform you of the schedule.

**Q: How long does it take to fully charge?**

[TBD]. Your administrator will provide charging time guidance.

**Q: Can I use any USB cable to charge?**

Use the cable provided or a compatible USB cable that fits the card's charging port. Do not force a connector that does not fit.

**Q: What happens if my card runs out of battery?**

The card stops transmitting. You will not appear on the WakeCap Portal. Charge the card as soon as possible and reboot it to resume operation.

**Q: Can I charge the card while wearing it?**

No. You must remove the card and connect it to a USB power source for charging.

## Daily Use

**Q: Is the card waterproof?**

The card is designed for construction environments but its exact IP rating is [TBD]. Avoid submerging it in water. Light rain and dust exposure are generally acceptable.

**Q: Can I write on the card or put stickers on it?**

Do not cover the NFC area or the LED indicator. Your employee details are printed by the site team using a specialized UV printer. Do not modify the card yourself.

**Q: What should I do if I lose my card?**

Report the loss to your supervisor immediately. They will deactivate the lost card on the portal and issue you a replacement.

**Q: What should I do if my card is physically damaged (cracked, bent, swollen)?**

Stop using the card immediately. Report it to your supervisor. Do not attempt to charge a damaged card.

**Q: I see multiple detections in a short time on my record. Is that normal?**

Occasional rapid detections can happen due to system timing. If it occurs frequently, report it to your supervisor — it may indicate a network issue that needs attention.

## Safety Features

**Q: Does the card detect falls?**

Yes. The card has a free fall detection feature. However, because the card hangs freely (unlike a helmet), it may occasionally trigger false alerts. Report any false alerts to your supervisor.

**Q: Will the card work in hazardous (explosive) areas?**

The standard ID card is not certified for use in hazardous (Ex/ATEX) zones. Consult your site safety officer and WakeCap engineering before using it in classified areas.

## Administration

**Q: Who configures the card?**

Your site administrator or WakeCap support engineer configures the card using the WakeCap Mobile App via NFC before distributing it.

**Q: Can I configure the card myself?**

No. Card configuration requires the WakeCap Mobile App with administrator access. Do not attempt to modify card settings.

**Q: How does the low-battery notification work?**

When your card's battery voltage drops below a set threshold, the system automatically sends an email to your site administrator. They will then schedule charging for affected cards.

# Contact and Support

For technical issues that cannot be resolved using this guide, contact your site administrator or WakeCap support:

| Resource | Details |
|----------|---------|
| Site Administrator | Contact your project's WakeCap coordinator |
| WakeCap Support | support@wakecap.com |
| WakeCap Portal | https://app.wakecap.com |

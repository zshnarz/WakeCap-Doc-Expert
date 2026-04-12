---
title: "WakeCap Rechargeable ID Card — User Guide & FAQ"
doc-id: WC-ID-UG-v2.0
product: Rechargeable ID Card
doc-type: User Guide & FAQ
revision-date: 2026-03-15
firmware-version: "3.5.2"
subtitle: "For card holders and site administrators"
author: "WakeCap Technologies"
---

# Document Information

| Field | Value |
|-------|-------|
| Document ID | WC-ID-UG-v2.0 |
| Product | WakeCap Rechargeable ID Card |
| Firmware Compatibility | v3.5.2 |
| Revision Date | 2026-03-15 |
| Classification | Client-Facing |

## Revision History

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-03-12 | Initial release |
| 2.0 | 2026-03-15 | Complete restructure: added Quick Start, system overview, admin section, field-tested FAQ, decision-tree troubleshooting |

## Purpose and Scope

This guide covers everything you need to use, maintain, and manage WakeCap Rechargeable ID Cards on your project site.

**This guide is for:**

- **Card holders** (workers and employees) — how to wear, charge, and care for your card
- **Site administrators** — how to set up, configure, manage, and troubleshoot cards

**This guide does NOT cover:**

- WakeCap Anchor or Gateway installation (see WC-AN-IG and WC-GW-IG)
- WakeCap Portal administration beyond card management
- Non-rechargeable ID cards (discontinued product)

## Related Documents

| Document | ID |
|----------|----|
| Product Datasheet | WC-ID-DS-v1.1 |
| Product Manual | WC-ID-PM-v1.0 |
| Setup Guide | WC-ID-SG-v1.0 |
| Troubleshooting Guide | WC-ID-TG-v1.0 |

# Quick Start

*Give this page to every card holder.*

[IMAGE: Annotated front-and-side view of the WakeCap Rechargeable ID Card with numbered callouts pointing to: (1) USB charging port on the bottom edge, (2) LED indicator near the top, (3) NFC zone in the center shown with a dashed circle, (4) power button on the side edge. White card on light gray background, clean technical illustration style.]

## Three Rules

1. **Wear your card** at all times while on-site — on a lanyard or clipped to your clothing.
2. **Charge it monthly** — plug in the USB cable, wait for a full charge, unplug.
3. **Report problems** to your supervisor — if your card isn't working, don't ignore it.

## Do's and Don'ts

| Do | Don't |
|----|-------|
| Wear the card visibly on a lanyard or clip | Don't put the card in a metal box, locker, or tool case |
| Charge when notified by your supervisor | Don't wait until the card is completely dead |
| Report a lost or damaged card immediately | Don't try to open, bend, or modify the card |
| Keep the card away from water and extreme heat | Don't charge a card that is cracked or swollen |

# How the System Works

Your WakeCap ID Card is part of a wireless tracking system that helps keep you safe and records your attendance automatically. Here is how it works:

[IMAGE: Simple system flow diagram showing: WakeCap ID Card (credit card icon) sends wireless signal to WakeCap Anchor (small box icon mounted on wall/pole), which sends data to WakeCap Gateway (larger box icon), which sends data via internet to WakeCap Portal (laptop/cloud icon showing a dashboard). Each step connected by arrows with labels: "wireless signal", "mesh network", "internet". Clean, minimal illustration with icons and arrows, no technical jargon.]

**Your card** sends out a short wireless signal at regular intervals.

**Anchors** installed around the site pick up that signal and forward it through the network.

**The WakeCap Portal** receives the data and shows your supervisor where you are, when you arrived, and which zones you entered.

## What the system tracks

- Your **location** on the project site (which zone you are in)
- Your **attendance** (time in, time out, time on-site)
- **Safety events** such as potential falls (free fall detection)

## What the system does NOT do

- It does **not** track you outside the project site — the card only works within range of WakeCap Anchors.
- It does **not** use GPS — your location is determined by which Anchors detect your signal.
- It does **not** record audio, video, or any personal data beyond your presence on-site.

# Card Overview

## Components

| # | Component | What It Does |
|---|-----------|-------------|
| 1 | USB charging port | Plug in the charging cable here to recharge the battery |
| 2 | LED indicator | Flashes to show power status, charging state, and errors |
| 3 | NFC zone | Your administrator uses this area to configure the card with a smartphone |
| 4 | Power button | Press once to reboot the card if it stops working |
| 5 | Card surface | Blank white — your site team prints your photo, name, and employee ID on it |

## Physical Specifications

| Parameter | Value |
|-----------|-------|
| Size | 86 x 55 x 6 mm (credit card width and height, slightly thicker) |
| Weight | [TBD] |
| Color | White (all sides) |
| Battery | Rechargeable lithium polymer, 365 mAh |

# For Card Holders

## Wearing Your Card

Wear the card **at all times** while you are on the project site. The system can only detect you when the card is within range of WakeCap Anchors.

**Recommended wearing methods:**

- **Lanyard** — hang the card around your neck, with the printed side facing outward.
- **Card holder clip** — attach the clip to your clothing at chest or waist level.

::: {.tip}
Keep the card on the outside of your clothing. Wearing it under a jacket or vest reduces signal strength and may cause gaps in your attendance record.
:::

**Avoid these common mistakes:**

| Mistake | Why It Matters |
|---------|---------------|
| Leaving the card in a metal tool box | Metal blocks the wireless signal — the system cannot detect you |
| Putting the card in a back pocket and sitting on it | Pressure can damage the battery or crack the housing |
| Leaving the card in a vehicle | You will not appear as present on-site |
| Sharing your card with another worker | Attendance records will be inaccurate and safety alerts unreliable |

## Charging Your Card

### When to charge

Charge your card **once a month**. Your supervisor or site administrator will tell you when cards are due for charging. Some sites use an automated email notification that alerts administrators when card batteries are running low.

::: {.important}
Do not wait until the card is completely dead. A fully discharged card takes longer to come back online and may miss attendance records until it reconnects.
:::

### How to charge

::: {.caution}
Before charging, inspect the card for physical damage. Do not charge a card that is cracked, swollen, or has a visible battery bulge.
:::

1. Connect the USB charging cable to the port on the bottom edge of the card.
2. Plug the other end into any USB power source — a wall adapter, computer USB port, or USB hub.
3. Check the LED indicator:
   - [TBD] — charging in progress
   - [TBD] — fully charged
4. Disconnect the cable when charging is complete.

::: {.notice}
Do not charge cards in direct sunlight, near heaters, or in environments above [TBD] C. Heat reduces battery lifespan.
:::

### Battery life

How long a single charge lasts depends on how frequently the card transmits its signal (the "scan interval," configured by your administrator):

| Scan Interval | Battery Life Per Charge |
|---------------|------------------------|
| Every 30 seconds | Approximately 1 month |
| Every 3 minutes | Approximately 3 months |

Most sites are configured for a **monthly recharge cycle**. Your administrator can confirm the exact schedule for your project.

### Field tips

- **Set a charging day.** Many sites designate the first working day of each month as "card charging day." Collect cards at shift start, charge during the workday, return at shift end.
- **Use multi-port USB hubs** to charge many cards at once. A standard 10-port USB hub can charge 10 cards simultaneously.
- **Label charging stations** so workers know where to drop off and pick up cards.

## Understanding the LED

The small LED on your card tells you what the card is doing. You do not need to check it regularly — it is mainly useful when troubleshooting.

| What You See | What It Means | What to Do |
|-------------|---------------|------------|
| Single green blink when you press the power button | Card is on and rebooting | Wait 2–5 minutes for it to connect |
| [TBD] | Card is charging | Leave it connected until fully charged |
| [TBD] | Card is fully charged | Disconnect the cable |
| No response when you press the power button | Battery is completely dead | Charge immediately for at least 30 minutes, then try again |

::: {.note}
During normal daily use, the LED is off. This is normal — the card is working silently in the background. The LED only activates when you press the button, plug in the charger, or during a reboot.
:::

## If Something Goes Wrong

Follow these steps in order. Stop as soon as the issue is resolved.

### Step 1 — Check the LED

Press the power button on the card. Do you see a green blink?

- **Yes** → The card has power. Go to Step 3.
- **No** → The battery is dead. Go to Step 2.

### Step 2 — Charge the card

Connect the card to a USB charger for at least **30 minutes**. Then press the power button again.

- **LED blinks** → Go to Step 3.
- **Still no response** → The card may be defective. Report it to your supervisor for replacement.

### Step 3 — Reboot the card

Press and release the power button. Wait **2 to 5 minutes** for the card to reconnect to the network.

- **Card appears online** on the portal → Problem solved.
- **Still offline** → Go to Step 4.

### Step 4 — Check your location

Move to an area where you know other workers' cards are working (near a known Anchor location). Wait 5 minutes.

- **Card comes online** → Your previous location was outside Anchor coverage. Report the coverage gap to your supervisor.
- **Still offline** → Go to Step 5.

### Step 5 — Contact your administrator

The issue may require NFC reconfiguration or a firmware check. Give your administrator:

- Your **name** and **employee ID**
- The **card's device ID** (printed on the card or visible via NFC)
- **What you tried** (Steps 1–4 above)
- **Where on-site** you were when the problem occurred

### Lost or damaged card

| Situation | Action |
|-----------|--------|
| Card lost | Report to your supervisor immediately. They will deactivate the card on the portal and issue a replacement. |
| Card cracked, bent, or swollen | Stop using it. Do not charge it. Hand it to your supervisor for safe disposal and replacement. |
| Card dropped in water | Remove it from water, dry it off, and report to your supervisor. Do not attempt to charge a wet card. |

### False fall alerts

The card has a built-in fall detection sensor. Because the card hangs freely on a lanyard (unlike a helmet), it may occasionally trigger false fall alerts — for example, if the card swings sharply or is dropped.

If you receive a false fall alert, simply report it to your supervisor. The system sensitivity can be adjusted by WakeCap engineering.

# For Site Administrators

## Card Setup and Configuration

### What you need

- A smartphone with **NFC capability** and the **WakeCap Mobile App** installed
- A fully charged ID card
- An active project on the **WakeCap Portal** with network configured

### Activating a new card

1. Charge the card fully before first use.
2. Open the WakeCap Mobile App on your phone.
3. Hold the card flat against the phone's NFC antenna area (usually the upper back of the phone).
4. Tap **"Read Device"** to see the card's current configuration.
5. Verify or update the following parameters:
   - **Project name** — must match your active project
   - **Network ID** — must match the project's Wirepas network
   - **Scan interval** — typically 30 seconds or 3 minutes
6. Tap **"Write"** to save the configuration to the card.
7. Wait 5–10 minutes, then verify the card appears as **"Online"** on the WakeCap Portal.
8. Assign the card to a worker in the portal (name, employee ID).

::: {.important}
If the NFC read fails, try repositioning the card. Different phone models have the NFC antenna in different locations. Rotate the card 90 degrees and try again. On some phones, removing the phone case improves NFC contact.
:::

### Card printing

Employee details (photo, name, ID number) are printed directly on the card surface using a **UV flatbed printer** (model 6050 or 6090).

::: {.notice}
Standard PVC card printers cannot print on WakeCap ID cards. The cards are 6 mm thick — significantly thicker than standard 0.76 mm PVC cards. A UV flatbed printer is required.
:::

**Printing steps:**

1. Prepare the design file with the employee's photo, name, and ID number.
2. Place the card face-up on the printer bed and align it.
3. Print the front side.
4. Flip the card manually and print the back side.
5. Allow the UV ink to cure before handling.

## Card Management

### Charging schedule for large deployments

For sites with hundreds or thousands of cards, establish a structured charging rotation:

- **Divide cards into weekly batches** — charge one batch per week so all cards are refreshed within a month.
- **Use multi-port USB hubs** — a 10-port hub charges 10 cards at once. Four hubs handle 40 cards per cycle.
- **Track charging via a shared log** (spreadsheet or shared document) so supervisors know which cards were charged and when.
- **Designate a charging station** — a secure, ventilated area with adequate power outlets.

### Low battery email notifications

The WakeCap system can automatically send email notifications when a card's battery voltage drops below a configured threshold.

**How it works:**

- The system checks battery voltage for all active rechargeable ID cards.
- When a card drops below the threshold, an email is sent to the configured administrator email addresses.
- The email lists the affected card IDs so you can pull them for charging.

**Known limitations:**

- Cards that have not been seen for more than 24 hours are excluded from the notification — these cards may already be out of battery. Physically locate and charge them.
- The email currently shows voltage, not battery percentage.

### Reassigning a card

To assign a card from one worker to another:

1. Open the WakeCap Portal.
2. Find the current worker's profile and unassign the card.
3. Find the new worker's profile and assign the card to them.
4. If the card has printed employee details, reprint using the UV printer with the new worker's information.

## Troubleshooting — Administrator Reference

| Symptom | Likely Cause | Action |
|---------|-------------|--------|
| Card not appearing online after setup | Network ID mismatch | Use NFC to read the card. Verify the network ID matches the project configuration. Rewrite if needed. |
| Card online but showing incorrect project | Wrong project written via NFC | Rewrite the correct project parameters via NFC. |
| NFC read fails repeatedly | Phone NFC antenna misaligned | Try rotating the card, removing phone case, or using a different NFC-capable phone. |
| Multiple cards going offline simultaneously | Anchor or Gateway offline | Check Anchor and Gateway status on the portal. Investigate power and network connectivity. |
| Cards showing detection delays | Network congestion or anchor coverage gap | Review anchor placement density. Consider adding anchors in affected zones. |
| Low battery emails not being received | Email configuration issue | Verify recipient email addresses in the portal. Check spam folders. Contact WakeCap backend support. |
| Card firmware version mismatch | Old firmware from previous batch | Contact WakeCap engineering for firmware verification. Do not attempt field firmware updates — firmware is factory-flashed only. |

**When to escalate to WakeCap support:**

- Firmware version does not match expected version (3.5.2)
- Multiple cards from the same batch show hardware defects (NFC failure, LED failure, no power)
- Detection delays persist after verifying anchor coverage
- Low battery notification system not functioning despite correct configuration

Provide WakeCap support with: card device IDs, firmware version (from NFC read), project name, and a description of the issue with screenshots from the portal.

# Frequently Asked Questions

## General

**What is the WakeCap ID Card?**
A rechargeable wireless card that automatically records your presence on-site, tracks which zones you enter, and detects potential fall incidents. It works without any action from you — just wear it.

**Do I need to press any buttons or open any apps?**
No. The card works automatically once it is charged and configured. You do not interact with it during normal use.

**Can the card track me when I leave the project site?**
No. The card communicates only with WakeCap Anchors installed on your site. Once you leave the site boundary, the card cannot be detected. It does not use GPS.

**Is my personal information stored on the card?**
The card stores a device ID and network configuration only. Your name and employee information are stored on the WakeCap Portal, not on the card itself.

## Charging and Battery

**How often do I need to charge?**
Most sites require a monthly recharge. Your supervisor will notify you when it is time.

**How long does a full charge take?**
[TBD]. Your administrator will provide specific guidance.

**What happens if my card battery dies completely?**
You will not appear on the WakeCap Portal, meaning your attendance will not be recorded and safety monitoring will stop for your card. Charge the card as soon as possible, reboot it, and wait a few minutes for it to reconnect.

**Can I use any USB cable?**
Use the provided cable or a compatible USB cable that fits the card's port. Do not force a connector that does not match.

**Can the recharge interval be extended beyond one month?**
Yes, by increasing the scan interval. A 3-minute scan interval extends battery life to approximately 3 months. However, this reduces location update frequency. Discuss with your WakeCap project coordinator if this trade-off is acceptable for your site.

**The card feels warm while charging. Is that normal?**
Slight warmth is normal during charging. If the card becomes hot to the touch, disconnect it immediately, move it away from heat sources, and report it to your supervisor. Do not continue using a card that overheats.

## Daily Use

**Is the card waterproof?**
The card is designed for outdoor construction environments and can handle light rain and dust. However, do not submerge it in water. The exact ingress protection rating is [TBD].

**Can I put stickers on the card or write on it?**
Do not cover the NFC zone (center of the card) or the LED indicator. Your employee details are printed on the card by the site team using a specialized UV printer.

**What should I do if I lose my card?**
Report the loss to your supervisor immediately. They will deactivate the lost card on the portal to prevent misuse and issue you a replacement.

**What should I do if my card is cracked, bent, or swollen?**
Stop using it immediately and do not attempt to charge it. A swollen card indicates battery damage. Hand it to your supervisor for safe disposal.

**I see multiple detections in a short time on my record. Is this normal?**
Occasional rapid detections can happen when you are near the boundary between two Anchor zones. If this occurs frequently in the same area, report it to your administrator — it may indicate an anchor placement issue.

## Safety

**Does the card detect falls?**
Yes. The card has a built-in accelerometer for free fall detection. However, because the card hangs on a lanyard (unlike a helmet-mounted sensor), it may occasionally trigger false alerts when the card swings sharply or is dropped.

**I received a fall alert but I didn't fall. What should I do?**
Report the false alert to your supervisor. WakeCap engineering can adjust the detection sensitivity to reduce false positives for your site.

**Can I use this card in explosive/hazardous (Ex/ATEX) zones?**
No. The standard rechargeable ID card is not certified for use in classified hazardous areas. Consult your site safety officer and WakeCap engineering before deploying cards in Ex/ATEX zones.

**How do I dispose of a card that no longer works?**
Do not throw it in general waste. The card contains a lithium polymer battery and must be disposed of through your site's electronic waste process in accordance with local regulations.

## For Administrators

**How do I configure a new card?**
Use the WakeCap Mobile App on an NFC-capable smartphone. Hold the card against the phone, read the current config, update the project and network parameters, and write the changes. See the "Card Setup and Configuration" section for detailed steps.

**How does the low-battery notification work?**
The WakeCap system monitors card battery voltages. When a card drops below the configured threshold, an email is automatically sent to the administrator email addresses set up in the portal. The email lists the affected card IDs.

**How do I print employee details on the card?**
You need a UV flatbed printer (model 6050 or 6090). Standard card printers will not work because WakeCap cards are 6 mm thick. See the "Card Printing" section for the procedure.

**What is the minimum order quantity for new cards?**
3,000 pieces per production run, with a lead time of 4–7 weeks.

**Can I update the card firmware in the field?**
No. Firmware is flashed at the factory during production. If you suspect a firmware issue, contact WakeCap engineering for guidance.

# Technical Specifications

## Physical

| Parameter | Value |
|-----------|-------|
| Dimensions | 86 x 55 x 6 mm |
| Weight | [TBD] |
| Material | Plastic [TBD] |
| Color | White |
| IP Rating | [TBD] |

## Electrical

| Parameter | Value |
|-----------|-------|
| Battery | Lithium polymer (LiPo), 365 mAh |
| Average current draw | ~60 uA at 30 s scan interval |
| Charging interface | USB [TBD] |
| Charging time | [TBD] |

## Communication

| Parameter | Value |
|-----------|-------|
| Wireless protocol | Wirepas Mesh V5 |
| Frequency | 2.4 GHz ISM band |
| NFC | Supported (configuration and diagnostics) |
| Scan interval | Configurable: 30 s to 3 min (typical) |

## Environmental

| Parameter | Value |
|-----------|-------|
| Operating temperature | [TBD] |
| Storage temperature | [TBD] |
| Humidity | [TBD] |

# Contact and Support

| Channel | Details |
|---------|---------|
| Your Site Administrator | First point of contact for all card issues |
| WakeCap Technical Support | support@wakecap.com |
| WakeCap Portal | https://app.wakecap.com |

**When contacting WakeCap support, please provide:**

- Project name and site location
- Card device ID(s) affected
- Firmware version (from NFC read, if available)
- Description of the issue with screenshots from the portal
- Steps already taken to troubleshoot

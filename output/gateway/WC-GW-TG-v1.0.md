# WakeCap Gateway

## Troubleshooting Guide

---

| Field | Value |
|-------|-------|
| **Document ID** | WC-GW-TG-v1.0 |
| **Version** | 1.0 |
| **Date** | 2026-02-09 |
| **Product** | WakeCap Gateway (GW) |
| **HW Compatibility** | [TBD] |
| **FW Compatibility** | [TBD] |

---

## Table of Contents

1. Before You Begin
2. Symptom Index
3. Triage Flowchart
4. Power Issues
5. Connectivity Issues
6. Mesh Network Issues
7. Data Issues
8. Cloud Issues
9. LED and Error Code Dictionary
10. Log Collection Procedures
11. Escalation Criteria
12. Known Issues by Firmware Version
13. Connection Verification Procedures
14. Appendix A: System Health Checklist
15. Appendix B: Related Documents

---

## 1. Before You Begin

### 1.1 How to Use This Guide

This guide is organized by symptom. Follow this approach to restore service as quickly as possible:

1. **Identify the symptom** -- what exactly is not working?
2. **Check the Symptom Index** (Section 2) -- find your symptom category
3. **Run the Triage Flowchart** (Section 3) -- narrow the root cause
4. **Go to the symptom-to-fix table** (Sections 4-8) -- perform quick checks and apply the fix
5. **Verify resolution** -- use the Connection Verification Procedures (Section 13)
6. **Escalate if needed** -- follow the criteria in Section 11

### 1.2 Required Tools

| Tool | Purpose |
|------|---------|
| Multimeter (DC voltage) | Power supply and polarity verification |
| Laptop with USB port | Gateway configuration utility access |
| Ethernet cable (known-good spare) | Network isolation testing |
| Smartphone / tablet | WakeCap Dashboard and Verify App access |
| SIM card ejector or paperclip | SIM card removal and reseating |
| Phillips screwdriver (#2) | Enclosure access |
| Flashlight | Visual inspection of connectors and LEDs |
| Signal strength meter or app | Cellular signal verification |

### 1.3 Safety Information

> **DANGER**
>
> **Lightning hazard.** Do not troubleshoot a Gateway mounted on an elevated mast during an electrical storm. Lightning strike can cause death.

> **WARNING**
>
> **Electrical hazard.** De-energize the power source before disconnecting or reconnecting any power cables. Verify zero voltage with a multimeter before touching terminals. Failure to do so may result in electrical shock or equipment damage.

> **WARNING**
>
> **Fall hazard.** If the Gateway is mounted at height, use appropriate fall-protection equipment and follow site safety procedures before accessing the unit.

> **CAUTION**
>
> **Antenna safety.** Do not power on the Gateway without the antenna connected. Transmitting without an antenna may damage the radio module.

> **NOTICE**
>
> **ESD precautions.** The Gateway contains static-sensitive components. Touch a grounded metal surface before handling internal components or connectors.

### 1.4 Conventions Used in This Guide

| Convention | Meaning |
|------------|---------|
| **Bold step numbers** | Action steps -- do these in order |
| `Code text` | Commands, file paths, or configuration values |
| [TBD] | Specification not yet confirmed -- placeholder |
| [IMAGE: description] | Placeholder for a diagram or photograph |

---

## 2. Symptom Index

Use this table to jump directly to the relevant troubleshooting section.

### 2.1 Power Issues (Section 4)

| Symptom | Go To |
|---------|-------|
| Gateway LED is off -- no signs of power | 4.1 |
| Gateway LED indicates fault on power-up | 4.2 |
| Gateway reboots or resets unexpectedly | 4.3 |

### 2.2 Connectivity Issues (Section 5)

| Symptom | Go To |
|---------|-------|
| No cloud connectivity (LED amber or no cloud icon) | 5.1 |
| Cellular connection not establishing | 5.2 |
| Ethernet link not establishing | 5.3 |
| Intermittent connectivity (connection drops and recovers) | 5.4 |
| Slow data throughput | 5.5 |

### 2.3 Mesh Network Issues (Section 6)

| Symptom | Go To |
|---------|-------|
| Mesh network not forming -- no devices associating | 6.1 |
| Specific device(s) not associating | 6.2 |
| Mesh devices dropping off intermittently | 6.3 |

### 2.4 Data Issues (Section 7)

| Symptom | Go To |
|---------|-------|
| Data gaps on Dashboard (missing time periods) | 7.1 |
| Firmware update failure | 7.2 |
| Configuration loss after reboot or power cycle | 7.3 |

### 2.5 Cloud Issues (Section 8)

| Symptom | Go To |
|---------|-------|
| Gateway online but data not appearing on Dashboard | 8.1 |
| Dashboard shows "Device Offline" despite Gateway LED green | 8.2 |
| Cloud platform errors or timeouts | 8.3 |

---

## 3. Triage Flowchart

Use this decision tree to quickly isolate the problem domain. Start at the top and follow the path.

```
START: Gateway not behaving as expected
|
|--- Is the Gateway LED illuminated?
|    |
|    +--- NO -------> POWER ISSUE
|    |                 Go to Section 4
|    |
|    +--- YES ------> What color/pattern is the LED?
|         |
|         +--- Solid RED or Blink RED -------> HARDWARE FAULT
|         |                                     Go to Section 4.2
|         |
|         +--- Solid GREEN -------> Gateway has cloud + mesh
|         |    |
|         |    +--- Are mesh devices visible on Dashboard?
|         |         |
|         |         +--- NO -------> MESH ISSUE
|         |         |                Go to Section 6
|         |         |
|         |         +--- YES ------> Is data current on Dashboard?
|         |              |
|         |              +--- NO -------> DATA ISSUE
|         |              |                Go to Section 7
|         |              |
|         |              +--- YES ------> System OK
|         |                               (Check specific sensor docs)
|         |
|         +--- Solid AMBER or Blink AMBER -------> CONNECTIVITY ISSUE
|         |    |                                     (No cloud uplink)
|         |    +--- Is Ethernet cable connected?
|         |         |
|         |         +--- YES ------> ETHERNET ISSUE
|         |         |                Go to Section 5.3
|         |         |
|         |         +--- NO (Cellular model) ---> CELLULAR ISSUE
|         |                                        Go to Section 5.2
|         |
|         +--- Slow blink GREEN (1/5s) -------> CONNECTING
|              |
|              +--- Has it been > [TBD] minutes?
|                   |
|                   +--- NO -------> Wait. First boot can take
|                   |                up to [TBD] minutes.
|                   |
|                   +--- YES ------> CONNECTIVITY ISSUE
|                                    Go to Section 5.1
```

[IMAGE: Printable triage flowchart -- full-color version of the above decision tree for laminated field cards]

---

## 4. Power Issues

### 4.1 No Power -- LED Off

> **WARNING**
>
> De-energize the power source before inspecting or reconnecting power cables. Verify zero voltage with a multimeter.

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|---------|-------------|--------------|-----|---------------|
| LED completely off, no signs of life | No power reaching Gateway | Measure voltage at Gateway power input terminals with a multimeter. Expected: [TBD] V DC | Reconnect power cable; ensure V+ to V+ and GND to GND | Correct voltage present at terminals but LED remains off |
| LED completely off | Power cable disconnected or damaged | Inspect cable from power source to Gateway for cuts, loose terminals, or disconnected plugs | Replace or re-terminate cable | Cable intact and connected but no power at Gateway |
| LED completely off | Blown fuse or tripped breaker upstream | Check fuse or breaker at the power distribution point | Replace fuse (same rating) or reset breaker | Fuse blows again immediately after replacement |
| LED completely off | Reversed polarity | Measure polarity at Gateway terminals. Positive on V+, negative on GND | Correct the wiring | Polarity correct but LED still off -- possible internal damage from prior reverse polarity event |
| LED completely off | Power supply failure | Measure output of power supply under load | Replace power supply unit | Multiple supplies tested, none power the Gateway |

### 4.2 LED Indicates Fault on Power-Up

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|---------|-------------|--------------|-----|---------------|
| LED solid red on boot | Boot failure -- firmware corrupt or hardware fault | Power cycle the Gateway (remove power for 10 seconds, reapply) | If repeated, attempt firmware recovery via USB (see Section 7.2) | Solid red persists after power cycle and firmware recovery attempt |
| LED blink red on boot | Hardware initialization failure | Verify antenna is connected. Check for visible damage to enclosure or connectors | Reconnect antenna; power cycle | Blink red persists after antenna connected and power cycle |
| LED solid red after previously working | Firmware update failed mid-write | Do not remove power. Wait [TBD] minutes for automatic recovery | If no recovery, connect USB and use recovery tool | Recovery tool cannot communicate with Gateway |

### 4.3 Unexpected Reboots or Resets

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|---------|-------------|--------------|-----|---------------|
| Gateway reboots periodically | Unstable power supply -- voltage sag or ripple | Monitor supply voltage under load over time with a multimeter. Must remain within [TBD] V DC to [TBD] V DC | Replace power supply or add filtering/regulation | Stable supply confirmed but reboots continue |
| Gateway reboots during high mesh traffic | Power supply undersized -- current draw exceeds supply capacity | Check supply wattage rating vs. Gateway peak consumption ([TBD] W max) | Upgrade to higher-capacity supply | Adequate supply but still reboots under load |
| Gateway reboots at specific times | Scheduled task or external switch on same circuit | Check for timers, contactors, or other devices on the same power circuit | Isolate Gateway on dedicated circuit | Dedicated circuit but reboots persist |
| Gateway resets to factory defaults spontaneously | Reset button held unintentionally (vibration or mounting issue) | Inspect reset button for mechanical interference | Reposition Gateway or add protective cover over reset button | No mechanical cause found |

---

## 5. Connectivity Issues

### 5.1 No Cloud Connectivity

```
NO CLOUD CONNECTIVITY -- Decision Tree
|
+--- Is LED solid amber or blink amber?
|    |
|    +--- YES --> Uplink path is the problem
|    |    |
|    |    +--- Using Ethernet? --> Go to 5.3
|    |    +--- Using Cellular? --> Go to 5.2
|    |    +--- Both configured? --> Check primary uplink first,
|    |                              then failover path
|    |
|    +--- NO (LED solid green but Dashboard says offline)
|         --> Go to Section 8.2
|
+--- Is LED slow blink green for > [TBD] min?
     |
     +--- YES --> Gateway is stuck in connecting state
     |            Power cycle. If persists, check uplink (5.2 / 5.3)
     |
     +--- NO --> Wait for connection to establish
```

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|---------|-------------|--------------|-----|---------------|
| LED amber, no cloud | Primary uplink (cellular or Ethernet) down | Identify which uplink is configured. Check physical connections | Restore uplink -- see 5.2 (cellular) or 5.3 (Ethernet) | Both uplinks verified but cloud still unreachable |
| LED amber, cloud was previously working | Network infrastructure change (firewall, VLAN, APN) | Confirm no recent network changes with site IT | Revert network changes or update Gateway config to match new settings | Network settings confirmed correct |
| LED amber after firmware update | New firmware requires updated cloud endpoint or certificate | Check release notes for connectivity requirements | Apply configuration update via USB utility | Configuration correct but still no cloud |
| Slow blink green for extended period | DNS resolution failure or cloud endpoint unreachable | Verify internet access from the same network (ping test from laptop on same LAN) | Correct DNS settings or firewall rules | Internet confirmed working but Gateway cannot connect |

### 5.2 Cellular Connection Not Establishing

> **NOTICE**
>
> Power off the Gateway before inserting or removing the SIM card.

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|---------|-------------|--------------|-----|---------------|
| No cellular connection | SIM card not inserted or not seated | Power off. Open SIM slot. Remove and reinsert SIM until it clicks | Reseat SIM card | SIM properly seated but no connection |
| No cellular connection | SIM card inactive or expired | Test SIM in a phone -- does it register on the network? | Activate SIM with carrier or replace | SIM active in phone but not in Gateway |
| No cellular connection | Incorrect APN configuration | Check APN via USB configuration utility. Compare to carrier-provided APN | Update APN setting to match carrier requirements | APN correct but still no data |
| No cellular connection | Insufficient cellular signal | Check signal strength at installation location (phone or signal app). Required: [TBD] dBm minimum | Relocate Gateway or add external antenna | Cannot achieve minimum signal at any practical location |
| No cellular connection | Antenna not connected or damaged | Verify antenna is firmly attached and oriented vertically. Inspect for physical damage | Reconnect or replace antenna | Antenna OK but no cellular |
| Cellular connects then drops | Data plan exhausted or throttled | Check data usage with carrier | Top up data plan or switch to unlimited | Data plan adequate but drops continue |
| Cellular connects then drops | Band incompatibility | Verify Gateway cellular bands vs. carrier bands at site. Supported bands: [TBD] | Switch to compatible carrier or SIM | No compatible carrier available |

### 5.3 Ethernet Connection Not Establishing

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|---------|-------------|--------------|-----|---------------|
| Ethernet link LED off on Gateway port | Cable disconnected or damaged | Inspect cable at both ends. Check for bent pins, damaged RJ45 clip | Reconnect or replace cable | Known-good cable still no link LED |
| Ethernet link LED off | Switch port down or disabled | Check switch port status (LED on switch, or switch admin console) | Enable port or try different port | Port enabled but no link |
| Ethernet link LED on but no IP address | DHCP server unavailable | Verify DHCP server is running on the network | Restore DHCP or assign static IP via USB configuration utility | DHCP confirmed but Gateway does not obtain address |
| Ethernet link LED on but no cloud | Firewall or proxy blocking traffic | Gateway requires outbound access to [TBD] on port [TBD]. Verify with site IT | Add firewall rule to permit Gateway traffic | Firewall rule in place but still blocked |
| Ethernet connected, IP obtained, no cloud | DNS failure | Verify DNS server is reachable from Gateway network. Check via USB utility | Correct DNS settings | DNS confirmed correct but cloud unreachable |
| Ethernet intermittent | Cable quality or length issue | Check cable run length (max 100 m for Cat5e/Cat6). Inspect for kinks or damage | Replace cable; ensure within spec length | Cable within spec but still intermittent |

### 5.4 Intermittent Connectivity

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|---------|-------------|--------------|-----|---------------|
| Connection drops and recovers periodically | Unstable power causing reboots | Monitor power supply voltage during drop events. Check Section 4.3 | Stabilize power supply | Power stable but drops continue |
| Connection drops at specific times | Network maintenance window or scheduled restarts | Correlate drop times with site IT maintenance schedule | Coordinate with IT to avoid Gateway disruption | No scheduled maintenance at drop times |
| Connection drops in high heat | Thermal throttling or shutdown | Check ambient temperature at Gateway. Max operating: [TBD] C | Improve ventilation or add shade | Temperature within spec but still drops |
| Cellular drops during peak hours | Network congestion | Test at off-peak hours -- does connection stabilize? | Contact carrier for priority QoS or switch to Ethernet fallback | Carrier unable to improve service |
| Random disconnects, no pattern | Firmware defect | Check current firmware version against known issues (Section 12) | Update firmware to latest stable release | Already on latest firmware |

### 5.5 Slow Data Throughput

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|---------|-------------|--------------|-----|---------------|
| Data reaching cloud slowly | Weak cellular signal | Check signal strength. Below [TBD] dBm degrades throughput | Improve antenna placement or add external high-gain antenna | Signal cannot be improved |
| Data reaching cloud slowly | Network congestion (Ethernet) | Check other traffic on the same LAN. High bandwidth usage by other devices? | Isolate Gateway on dedicated VLAN or subnet | Isolated but still slow |
| Data reaching cloud slowly | Gateway buffering backlog | Check if Gateway was recently offline -- it may be uploading buffered data | Wait for buffer to clear (up to [TBD] hours for full buffer) | Buffer does not clear within expected timeframe |
| Data reaching cloud slowly | Excessive mesh device count | Check number of associated mesh devices vs. Gateway maximum ([TBD] devices) | Reduce device count or add a second Gateway | Within device limit but still slow |

---

## 6. Mesh Network Issues

### 6.1 Mesh Network Not Forming -- No Devices Associating

```
MESH NOT FORMING -- Decision Tree
|
+--- Is Gateway LED solid green or solid amber?
|    |
|    +--- NO (LED off / red / blink red)
|    |    --> Gateway not operational. Fix power/boot first (Section 4)
|    |
|    +--- YES --> Gateway is running
|         |
|         +--- Is the antenna connected?
|              |
|              +--- NO --> Connect antenna. Power cycle Gateway.
|              |
|              +--- YES
|                   |
|                   +--- Are mesh devices powered and within range?
|                        |
|                        +--- NO --> Power on devices, move within range
|                        |          ([TBD] m line of sight)
|                        |
|                        +--- YES --> Check mesh radio channel/config
|                                     (Section 6.1 table)
```

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|---------|-------------|--------------|-----|---------------|
| No mesh devices visible | Antenna disconnected or damaged | Inspect antenna connector. Hand-tight plus [TBD] turn with wrench | Reconnect or replace antenna | Antenna connected but no mesh |
| No mesh devices visible | Mesh radio disabled in configuration | Check mesh radio status via USB configuration utility | Enable mesh radio; reboot Gateway | Enabled but still no mesh |
| No mesh devices visible | All mesh devices out of range | Verify at least one device is within [TBD] m with clear line of sight | Move Gateway or devices closer together | Within range but no association |
| No mesh devices visible | Mesh channel mismatch | Compare Gateway mesh channel setting to device mesh channel settings | Align all devices to the same channel via configuration utility | Channels match but still no association |
| No mesh devices visible after factory reset | Configuration wiped -- mesh settings lost | Check mesh configuration via USB utility | Reconfigure mesh parameters (channel, network ID) per commissioning guide | Configuration applied but mesh still not forming |

### 6.2 Specific Device(s) Not Associating

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|---------|-------------|--------------|-----|---------------|
| One device not associating, others OK | Device out of range or obstructed | Check distance and line of sight between device and nearest mesh node. Max range: [TBD] m | Move device closer or add an intermediate Anchor to extend mesh | Within range, clear line of sight, still not associating |
| One device not associating | Device not powered | Check device LED/status indicator | Power on the device | Device powered but not associating |
| One device not associating | Device on wrong mesh channel or network ID | Check device configuration | Reconfigure device to match Gateway mesh settings | Settings match but device still not associating |
| Device was associating, now is not | Device firmware incompatible with Gateway firmware | Compare device firmware version to Gateway firmware compatibility matrix | Update device or Gateway firmware to compatible versions | Firmware versions compatible but still not associating |
| Multiple devices in one area not associating | Local RF interference (co-channel, jamming) | Use RF scanner or check for new equipment in the area (WiFi APs, radios) | Remove interference source or change mesh channel | Interference cleared but devices still not associating |

### 6.3 Mesh Devices Dropping Off Intermittently

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|---------|-------------|--------------|-----|---------------|
| Devices drop and rejoin | Marginal signal strength -- at edge of range | Check RSSI values in Gateway diagnostics (USB utility). Minimum: [TBD] dBm | Add intermediate Anchor to strengthen mesh path | RSSI adequate but drops continue |
| Devices drop during certain hours | Environmental change (crane movement, vehicle parking, temporary structures) | Correlate drop times with site activity | Reposition mesh nodes to avoid temporary obstructions | Obstructions cannot be avoided |
| All mesh devices drop simultaneously | Gateway mesh radio reset or crash | Check Gateway logs for mesh radio restart events (Section 10) | Update firmware. If persists, contact support | Latest firmware, still happening |
| Devices drop after Gateway power cycle | Mesh re-association takes time | Wait [TBD] minutes for all devices to re-associate after Gateway boot | No action needed if devices return within expected time | Devices do not return within [TBD] minutes |

---

## 7. Data Issues

### 7.1 Data Gaps on Dashboard

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|---------|-------------|--------------|-----|---------------|
| Gap in data for a specific time period | Gateway lost connectivity during that period and buffer overflowed | Check Gateway uplink history in logs. Buffer capacity: [TBD] hours | Restore connectivity. Data within buffer window will upload automatically. Data beyond buffer is lost | Connectivity stable but gaps still appear |
| Gap in data, Gateway was online | Mesh device was offline during that period | Check device online/offline history on Dashboard | Troubleshoot specific device (see device troubleshooting guide) | Device was online but data still missing |
| Gap in data across all devices | Gateway rebooted or lost power during that period | Check Gateway uptime and boot log (Section 10) | Address root cause of reboot (Section 4.3) | No reboot detected but data still missing |
| Recurring gaps at regular intervals | Scheduled process or interference pattern | Check if gaps correlate with site activities or Gateway maintenance tasks | Adjust scheduling or eliminate interference | No pattern identified |

### 7.2 Firmware Update Failure

> **CAUTION**
>
> Do not remove power from the Gateway during a firmware update. Interrupting a write operation may corrupt the firmware and require USB recovery.

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|---------|-------------|--------------|-----|---------------|
| OTA firmware update fails to start | Insufficient connectivity bandwidth | Check uplink speed. Firmware package size: [TBD] MB | Switch to Ethernet for the update if on cellular | Adequate bandwidth but update still fails to start |
| OTA firmware update starts but fails midway | Connectivity interruption during download | Check uplink stability. Ensure no scheduled maintenance during update window | Retry the update. Gateway should resume from last checkpoint | Repeated failures at same point |
| OTA firmware update completes but Gateway does not reboot | Update pending reboot confirmation | Check if Gateway requires manual reboot after update | Power cycle the Gateway | Power cycle does not apply the update |
| Firmware update via USB fails | Incorrect firmware file or corrupt download | Verify file checksum matches published checksum. Re-download if mismatch | Use correct firmware file for Gateway hardware revision | Correct file, checksum matches, still fails |
| Gateway stuck in boot loop after update | Firmware incompatible with hardware revision | Record LED pattern (Section 9). Connect USB and check boot log | Use USB recovery tool to roll back to previous firmware | Recovery tool cannot communicate with Gateway |

### 7.3 Configuration Loss After Reboot

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|---------|-------------|--------------|-----|---------------|
| Settings revert to defaults after power cycle | Configuration not saved to persistent storage | After making changes via USB utility, confirm "Save" was executed (not just "Apply") | Reconfigure and explicitly save. Power cycle to verify persistence | Save confirmed but settings still lost |
| Settings revert after firmware update | Firmware update reset configuration (by design for major updates) | Check firmware release notes for "configuration reset" notice | Reconfigure per commissioning guide (WC-GW-CG-v1.0) | Not documented in release notes but settings still lost |
| Partial configuration loss (some settings retained, others lost) | Corrupt configuration file | Export current configuration via USB utility. Factory reset. Re-import | Factory reset and reconfigure from backup or commissioning guide | Repeated corruption after reconfiguration |
| Configuration changes not taking effect | Changes applied but not activated until reboot | Check if configuration utility prompts for reboot | Reboot the Gateway after applying changes | Reboot performed but changes still not active |

---

## 8. Cloud Issues

### 8.1 Gateway Online but Data Not on Dashboard

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|---------|-------------|--------------|-----|---------------|
| LED solid green, mesh devices visible, but Dashboard empty | Dashboard not configured to display this Gateway's data | Log in to Dashboard. Check site assignment and device configuration | Assign Gateway to the correct site and configure sensor display | Configuration correct but data still absent |
| LED solid green but Dashboard shows stale data | Cloud processing delay | Check timestamp of last data point on Dashboard. Check WakeCap service status page | Wait 5 minutes and refresh. If backlog, data will appear incrementally | Delay exceeds 30 minutes with no progress |
| LED solid green, data arriving for some devices but not others | Specific mesh devices not transmitting data | Check individual device status on Dashboard | Troubleshoot non-reporting devices per their respective guides | All devices reporting to Gateway but data not reaching Dashboard |

### 8.2 Dashboard Shows "Device Offline" Despite LED Green

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|---------|-------------|--------------|-----|---------------|
| LED green but Dashboard says offline | Gateway connected to wrong cloud environment (staging vs. production) | Verify cloud endpoint in Gateway configuration via USB utility | Correct endpoint to production URL: [TBD] | Endpoint correct but still shows offline |
| LED green but Dashboard says offline | Clock/time synchronization issue -- Gateway certificate validation failing | Check Gateway system time via USB utility | Correct time or enable NTP. Reboot Gateway | Time correct but still shows offline |
| LED green but Dashboard says offline | Account or subscription issue | Verify Gateway serial number is registered and subscription is active on Dashboard | Contact WakeCap to verify account status | Account confirmed active |

### 8.3 Cloud Platform Errors or Timeouts

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|---------|-------------|--------------|-----|---------------|
| Dashboard returns errors or timeouts | WakeCap Cloud Platform service disruption | Check WakeCap service status page: [TBD] | Wait for service restoration. Gateway will buffer data locally | Outage exceeds [TBD] hours |
| Dashboard loads but data queries fail | Browser cache or session issue | Clear browser cache (Ctrl+Shift+Delete). Try incognito/private window | Log out, clear cache, log back in | Cleared cache, still failing |
| API integration returning errors | API endpoint or authentication change | Check API documentation for recent changes. Verify API key validity | Update API key or endpoint per current documentation | Documentation followed but errors persist |

---

## 9. LED and Error Code Dictionary

### 9.1 Status LED Reference

| LED Pattern | Color | Name | Meaning | Required Action |
|-------------|-------|------|---------|-----------------|
| Solid | Green | NORMAL | Connected to cloud, mesh active | None |
| Slow blink (1 per [TBD] s) | Green | CONNECTING | Establishing cloud connection | Wait up to [TBD] minutes |
| Fast blink | Green | DATA TRANSFER | Active data upload in progress | None -- normal during bulk upload |
| Solid | Amber | WARNING | Mesh active, no cloud uplink | Check WAN connection (cellular/Ethernet) |
| Blink | Amber | MESH ONLY | Mesh operating, WAN connection lost | Check WAN connection; data is buffering locally |
| Solid | Red | FAULT | Hardware or critical software error | Power cycle. If persists, contact support |
| Blink | Red | BOOT ERROR | Failed to initialize | Check antenna. Power cycle. Attempt USB recovery |
| Off | -- | NO POWER | No power to Gateway | Check power supply and cabling |

### 9.2 Gateway Diagnostic Codes

These codes are visible in the Gateway log output (via USB configuration utility or cloud diagnostics).

| Code | Severity | Description | Resolution |
|------|----------|-------------|------------|
| GW-E001 | Critical | Power supply voltage out of range | Verify input voltage is within [TBD] V DC to [TBD] V DC |
| GW-E002 | Critical | Mesh radio initialization failure | Check antenna connection. Power cycle. If persists, hardware fault |
| GW-E003 | Critical | Firmware CRC check failed | Firmware corrupt. Perform USB recovery |
| GW-E010 | Error | Cellular modem not responding | Reseat SIM. Power cycle. Check antenna |
| GW-E011 | Error | SIM card not detected | Insert or reseat SIM card |
| GW-E012 | Error | Cellular registration failed | Check SIM activation, APN settings, signal strength |
| GW-E013 | Error | Cellular data connection timeout | Check carrier data plan, signal strength |
| GW-E020 | Error | Ethernet link down | Check cable and switch port |
| GW-E021 | Error | DHCP timeout -- no IP address obtained | Check DHCP server on network |
| GW-E022 | Error | DNS resolution failure | Check DNS configuration |
| GW-E023 | Error | Cloud endpoint unreachable | Check firewall rules, internet connectivity |
| GW-E030 | Warning | Mesh device association limit reached | Maximum [TBD] devices. Add second Gateway for additional capacity |
| GW-E031 | Warning | Mesh channel interference detected | Consider changing mesh channel |
| GW-E040 | Warning | Local data buffer [TBD]% full | Restore cloud connectivity to flush buffer |
| GW-E041 | Error | Local data buffer full -- oldest data being overwritten | Restore cloud connectivity immediately to prevent data loss |
| GW-E050 | Info | Firmware update available | Schedule firmware update |
| GW-E051 | Error | Firmware update download failed | Check connectivity. Retry update |
| GW-E052 | Error | Firmware update apply failed | Retry. If persists, use USB recovery |
| GW-E060 | Warning | System temperature high | Check ventilation. Ambient max: [TBD] C |
| GW-E061 | Critical | System temperature critical -- shutting down | Restore ventilation or shade. Gateway will restart when temperature drops |
| GW-E070 | Info | Configuration changed | Verify intended changes were applied |
| GW-E071 | Warning | Configuration reset to factory defaults | Reconfigure per commissioning guide |
| GW-E080 | Warning | Clock synchronization failed | Check NTP server accessibility. Time drift may cause certificate errors |

### 9.3 LED Diagnostic Mode

To enter LED diagnostic mode for field verification:

**1.** Press and hold the Reset button for [TBD] seconds (do NOT hold long enough for factory reset -- [TBD] seconds).

**2.** The LED will cycle through all colors and patterns: Green solid, Green blink, Amber solid, Amber blink, Red solid, Red blink.

**3.** Release the button. The Gateway returns to normal operation.

If any color does not display, the LED may be faulty. Contact support.

---

## 10. Log Collection Procedures

### 10.1 When to Collect Logs

Collect logs before contacting support when:

- The problem persists after completing troubleshooting steps in this guide
- The problem is intermittent and difficult to reproduce
- Support requests diagnostic data
- A firmware update has failed

### 10.2 Collecting Logs via USB

> **NOTICE**
>
> Log collection does not interrupt Gateway operation. The Gateway continues to function normally while logs are exported.

**1.** Connect a laptop to the Gateway USB port using a standard USB cable.

**2.** Open the Gateway configuration utility on the laptop.
   - URL/application: [TBD]

**3.** Navigate to **Diagnostics > Logs**.

**4.** Select the log types to export:

| Log Type | Contents | Typical Size |
|----------|----------|--------------|
| System log | Boot events, errors, warnings, configuration changes | [TBD] MB |
| Connectivity log | Uplink connect/disconnect events, signal strength history | [TBD] MB |
| Mesh log | Device association/disassociation, RSSI values, channel changes | [TBD] MB |
| Data log | Data transmission records, buffer status | [TBD] MB |

**5.** Click **Export**. Save the file to the laptop.

**6.** The exported file is a compressed archive: `GW-<serial>-<date>-logs.zip`

### 10.3 Collecting Logs via Cloud (if Gateway is Online)

**1.** Log in to the WakeCap Dashboard.

**2.** Navigate to **Devices > Gateways > [Select Gateway] > Diagnostics**.

**3.** Click **Download Logs**.

**4.** Select the date range and log types.

**5.** Download the archive.

### 10.4 Collecting Network Diagnostics

From the USB configuration utility:

**1.** Navigate to **Diagnostics > Network Test**.

**2.** Run the following tests and record results:

| Test | What It Checks | Expected Result |
|------|---------------|-----------------|
| Ping gateway IP | Local network connectivity | Response time < [TBD] ms |
| Ping DNS server | DNS reachability | Response time < [TBD] ms |
| DNS lookup | Name resolution | Resolves to IP address |
| Ping cloud endpoint | Cloud reachability | Response time < [TBD] ms |
| Traceroute to cloud | Network path | Completes within [TBD] hops |
| Cellular signal strength | RF signal quality | > [TBD] dBm |

**3.** Click **Export Network Diagnostics** to save results.

### 10.5 Information Checklist for Support

Before contacting support, gather the following:

| Item | How to Obtain | Collected? |
|------|---------------|------------|
| Gateway serial number | Label on unit or USB utility | ☐ |
| Gateway firmware version | USB utility > About | ☐ |
| Hardware revision | Label on unit | ☐ |
| Problem description | Written description with timeline | ☐ |
| LED state | Photo or video of LED | ☐ |
| System logs | Section 10.2 or 10.3 | ☐ |
| Network diagnostics | Section 10.4 | ☐ |
| Installation photos | Smartphone camera -- overall and close-up of connections | ☐ |
| Dashboard screenshots | Screen capture of relevant pages | ☐ |
| Power supply voltage reading | Multimeter at Gateway terminals | ☐ |
| Ambient temperature at Gateway | Thermometer or site weather data | ☐ |
| Site network details (IP, VLAN, firewall rules) | Site IT team | ☐ |

---

## 11. Escalation Criteria

### 11.1 When to Escalate

Escalate to WakeCap technical support when any of the following conditions apply:

| Condition | Example |
|-----------|---------|
| Troubleshooting in this guide does not resolve the problem | All steps in the relevant section completed, symptom persists |
| Hardware fault suspected | LED solid red after power cycle, visible physical damage, burn marks |
| Safety-related malfunction | Gateway overheating, unusual odors, sparking |
| Multiple Gateways affected simultaneously | Suggests cloud or firmware issue rather than local fault |
| Data integrity concern | Data appearing on Dashboard does not match expected values from field devices |
| Firmware recovery fails | USB recovery tool cannot communicate with Gateway |
| Repeated firmware update failures | Three consecutive OTA or USB update attempts fail |
| Configuration cannot be saved | Factory reset and reconfiguration does not persist |

### 11.2 Escalation Severity Levels

| Severity | Definition | Examples | Expected Response |
|----------|-----------|----------|-------------------|
| P1 -- Critical | Total loss of function; no workaround; safety impact | Gateway dead, data loss affecting safety decisions | [TBD] hours |
| P2 -- High | Major function lost; no workaround | No cloud connectivity, all mesh devices offline | [TBD] hours |
| P3 -- Medium | Partial function lost; workaround available | Intermittent connectivity, slow throughput | [TBD] business days |
| P4 -- Low | Minor issue; minimal operational impact | LED diagnostic mode not working, cosmetic issue | [TBD] business days |

### 11.3 How to Escalate

**1.** Gather all items from the Information Checklist (Section 10.5).

**2.** Contact WakeCap support:

| Channel | Details |
|---------|---------|
| Email | [TBD] |
| Phone | [TBD] |
| Support portal | [TBD] |
| Hours | [TBD] |

**3.** Provide the following in your initial contact:

- Gateway serial number
- Firmware version
- Site name and location
- Problem description with timeline
- Steps already taken from this guide (reference section numbers)
- Attached log files and photos

**4.** Record the support ticket number for follow-up.

---

## 12. Known Issues by Firmware Version

### 12.1 Current Known Issues

| Issue ID | Firmware Version(s) | Description | Workaround | Status |
|----------|---------------------|-------------|------------|--------|
| GW-KI-001 | [TBD] | [TBD] | [TBD] | Open |
| GW-KI-002 | [TBD] | [TBD] | [TBD] | Open |
| GW-KI-003 | [TBD] | [TBD] | [TBD] | Open |

### 12.2 Resolved Issues

| Issue ID | Firmware Version(s) Affected | Fixed In | Description | Notes |
|----------|------------------------------|----------|-------------|-------|
| — | — | — | No resolved issues to report at v1.0 | — |

### 12.3 Firmware Version History

| Version | Release Date | Key Changes | Known Issues Introduced | Known Issues Resolved |
|---------|-------------|-------------|------------------------|----------------------|
| [TBD] | [TBD] | Initial release | [TBD] | — |

> **NOTE**
>
> Always check the latest firmware release notes before troubleshooting. If your issue matches a known issue with a fix available in a newer firmware, update first.

---

## 13. Connection Verification Procedures

Use these procedures to confirm the Gateway is fully operational after troubleshooting.

### 13.1 Power Verification

| Step | Action | Expected Result | Pass? |
|------|--------|-----------------|-------|
| 1 | Measure DC voltage at Gateway power terminals | [TBD] V DC +/- [TBD]% | ☐ |
| 2 | Observe LED within [TBD] seconds of power-on | LED illuminates | ☐ |
| 3 | Wait [TBD] seconds for boot sequence | LED transitions from boot pattern to operational pattern | ☐ |

### 13.2 Uplink Verification (Ethernet)

| Step | Action | Expected Result | Pass? |
|------|--------|-----------------|-------|
| 1 | Inspect Ethernet cable at both ends | Secure connection, latch engaged | ☐ |
| 2 | Check link LED on Gateway Ethernet port | Link LED illuminated | ☐ |
| 3 | Check link LED on network switch port | Link LED illuminated | ☐ |
| 4 | Verify IP address via USB utility | Valid IP address obtained (DHCP or static) | ☐ |
| 5 | Run network ping test from USB utility | Cloud endpoint reachable, latency < [TBD] ms | ☐ |

### 13.3 Uplink Verification (Cellular)

| Step | Action | Expected Result | Pass? |
|------|--------|-----------------|-------|
| 1 | Verify SIM card seated (power off first) | SIM clicks into slot | ☐ |
| 2 | Check cellular signal strength via USB utility | Signal > [TBD] dBm | ☐ |
| 3 | Verify cellular registration | Registered on carrier network | ☐ |
| 4 | Verify data connection | Data connection active, IP assigned | ☐ |
| 5 | Run network ping test from USB utility | Cloud endpoint reachable | ☐ |

### 13.4 Mesh Verification

| Step | Action | Expected Result | Pass? |
|------|--------|-----------------|-------|
| 1 | Check antenna connection | Antenna firmly attached, vertical orientation | ☐ |
| 2 | Verify mesh radio status via USB utility | Mesh radio enabled, channel set correctly | ☐ |
| 3 | Check associated device count via USB utility or Dashboard | Expected number of devices associated (site-specific) | ☐ |
| 4 | Verify RSSI for associated devices | All devices > [TBD] dBm | ☐ |

### 13.5 Cloud Verification

| Step | Action | Expected Result | Pass? |
|------|--------|-----------------|-------|
| 1 | Check Gateway LED | Solid green | ☐ |
| 2 | Log in to WakeCap Dashboard | Gateway shows "Online" | ☐ |
| 3 | Check last data timestamp | Within last [TBD] minutes | ☐ |
| 4 | Verify data from mesh devices is populating | Sensor data visible and updating | ☐ |

### 13.6 End-to-End Verification

After completing all applicable verification steps above:

**1.** Confirm the Gateway LED is solid green.

**2.** Confirm the Dashboard shows the Gateway online.

**3.** Confirm data from at least one mesh device is current (timestamp within [TBD] minutes).

**4.** Monitor for [TBD] minutes to verify stability -- no disconnects or LED changes.

If all checks pass, the Gateway is verified operational.

---

## Appendix A: System Health Checklist

Print this checklist for routine site inspections. Perform monthly or per site maintenance schedule.

| # | Check Item | Method | Expected | Actual | OK? |
|---|-----------|--------|----------|--------|-----|
| 1 | Gateway LED state | Visual | Solid green | ______ | ☐ |
| 2 | Power supply voltage | Multimeter at terminals | [TBD] V DC | ______ V | ☐ |
| 3 | Antenna condition | Visual inspection | No damage, vertical, firmly attached | ______ | ☐ |
| 4 | Enclosure integrity | Visual inspection | Sealed, no cracks, glands tight | ______ | ☐ |
| 5 | Cable condition | Visual inspection | No damage, drip loops intact, ties secure | ______ | ☐ |
| 6 | Mounting security | Physical check | No movement, bolts tight | ______ | ☐ |
| 7 | Ethernet cable (if used) | Visual + link LED | Connected, link LED on | ______ | ☐ |
| 8 | Cellular signal strength | USB utility or Dashboard | > [TBD] dBm | ______ dBm | ☐ |
| 9 | Associated mesh device count | Dashboard or USB utility | [TBD] devices (site-specific) | ______ | ☐ |
| 10 | Dashboard data freshness | Dashboard timestamp | Data < [TBD] minutes old | ______ | ☐ |
| 11 | Firmware version | USB utility or Dashboard | [TBD] (latest) | ______ | ☐ |
| 12 | Ambient temperature | Thermometer | Within [TBD] C to [TBD] C | ______ C | ☐ |
| 13 | Ventilation clearance | Measure | Minimum [TBD] mm all sides | ______ mm | ☐ |
| 14 | Error codes in log | USB utility or Dashboard | No critical or error codes | ______ | ☐ |

**Inspector:** _______________
**Date:** _______________
**Site:** _______________
**Gateway Serial Number:** _______________
**Next Scheduled Inspection:** _______________

---

## Appendix B: Related Documents

| Document | Document ID | Description |
|----------|-------------|-------------|
| Product Manual | WC-GW-PM-v1.0 | Comprehensive technical reference for the WakeCap Gateway |
| Installation Guide | WC-GW-IG-v1.0 | Physical installation and initial power-up procedures |
| Quick Reference | WC-GW-QR-v1.0 | Field reference card with LED codes, key specs, and quick troubleshooting |
| Commissioning Guide | WC-GW-CG-v1.0 | Network configuration, mesh setup, and cloud registration procedures |

---

**Document:** WC-GW-TG-v1.0
**WakeCap Technologies**

(c) 2026 WakeCap Technologies. All rights reserved.

*End of Document*

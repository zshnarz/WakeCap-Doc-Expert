# WakeCap Weather Station
## Troubleshooting Guide

**Document ID:** WC-WS-TG-v1.0
**Revision Date:** February 2026
**Model:** PH-282-AIR

---

## Document Information

| Field | Value |
|-------|-------|
| Document Number | WC-WS-TG-v1.0 |
| Product | WakeCap Weather Station |
| Model | PH-282-AIR |
| Revision | 1.0 |
| Date | February 2026 |

---

## Table of Contents

1. How to Use This Guide
2. Quick Triage Flowchart
3. Power Issues
4. Communication Issues
5. Sensor Issues
6. Network Issues
7. Dashboard Issues
8. LED Status Reference
9. Error Code Dictionary
10. Log Collection Procedures
11. Escalation Criteria
12. Known Issues
13. Support Information

---

## 1. How to Use This Guide

### 1.1 Troubleshooting Approach

Follow this systematic approach:

1. **Identify Symptoms** - What exactly is not working?
2. **Use Triage Flowchart** - Section 2 for quick diagnosis
3. **Find Symptom Table** - Locate your symptom in Sections 3-7
4. **Perform Quick Checks** - Follow the checks in the table
5. **Apply Fix** - Implement the recommended fix
6. **Verify Resolution** - Confirm system is working
7. **Escalate if Needed** - Contact support if fix doesn't work

### 1.2 Required Tools

| Tool | Purpose |
|------|---------|
| Multimeter | Voltage and continuity checks |
| WakeCap Verify App | Network and device status |
| Smartphone/Tablet | Dashboard access |
| Screwdriver set | Connection access |
| Flashlight | Visual inspection |

### 1.3 Safety Reminder

**WARNING:** Before performing any troubleshooting involving electrical connections:
- De-energize equipment
- Verify zero voltage
- Use appropriate PPE

---

## 2. Quick Triage Flowchart

Use this flowchart to quickly identify the problem area.

```
START: What is the problem?
|
+---> No data on Dashboard?
|     |
|     +---> Is WS Box display ON?
|           |
|           +---> NO ---> Go to Section 3: POWER ISSUES
|           |
|           +---> YES ---> Does display show values (not zeros)?
|                 |
|                 +---> NO ---> Go to Section 5: SENSOR ISSUES
|                 |
|                 +---> YES ---> Is MODBUS LED blinking 1x/min?
|                       |
|                       +---> NO ---> Go to Section 4: COMMUNICATION ISSUES
|                       |
|                       +---> YES ---> Is MODBUS Asset ONLINE in App?
|                             |
|                             +---> NO ---> Go to Section 6: NETWORK ISSUES
|                             |
|                             +---> YES ---> Go to Section 7: DASHBOARD ISSUES
|
+---> Incorrect sensor readings?
|     |
|     +---> Go to Section 5: SENSOR ISSUES
|
+---> Intermittent data?
      |
      +---> Go to Section 4: COMMUNICATION ISSUES
           or Section 6: NETWORK ISSUES
```

---

## 3. Power Issues

### 3.1 WS Box Display Not On

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|---------|--------------|--------------|-----|---------------|
| Display completely dark | No power to WS Box | Check power cable connected, check barrel jack secure | Reconnect power cable, verify 12V at connector | Power present but display still off |
| Display completely dark | Dead battery | Measure battery voltage (should be 12V+) | Charge or replace battery | Battery won't hold charge |
| Display completely dark | Blown fuse | Check inline fuse if present | Replace fuse with same rating | Fuse blows again immediately |
| Display completely dark | Faulty power supply | Measure voltage at WS Box input (12-36V DC required) | Replace power cable or supply | Correct voltage but no display |
| Display completely dark | WS Box failure | Verified power OK at input | Contact support | - |

### 3.2 Battery Not Charging

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|---------|--------------|--------------|-----|---------------|
| Battery voltage dropping | Solar panel not connected | Check solar panel cable | Reconnect solar panel | Cable connected but no charging |
| Battery voltage dropping | Solar panel shaded/dirty | Inspect panel for shade, dirt, debris | Clean panel, remove shade source | Panel clean but not charging |
| Battery voltage dropping | MPPT controller fault | Check MPPT indicator lights | Reset MPPT or replace | Controller shows fault |
| Battery voltage dropping | Wrong solar panel angle | Check panel orientation | Adjust to face equator | Angle correct but low output |
| Battery voltage dropping | Defective battery | Load test battery | Replace battery | New battery same problem |

### 3.3 Power Fluctuations

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|---------|--------------|--------------|-----|---------------|
| Display flickers/resets | Loose power connection | Wiggle power cable while observing | Secure all power connections | Connections tight but still flickering |
| Display flickers/resets | Voltage out of range | Measure voltage (must be 12-36V) | Adjust power source | Voltage unstable |
| Display flickers/resets | Insufficient battery capacity | Check battery during night/cloud | Upgrade to larger battery | Adequate battery but still resets |

---

## 4. Communication Issues

### 4.1 MODBUS LED Blinking 2x/Minute (Communication Error)

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|---------|--------------|--------------|-----|---------------|
| LED blinks 2x/min | RS485 wires reversed | Verify A connects to A, B connects to B | Correct wiring: A-A, B-B | Wiring correct but error persists |
| LED blinks 2x/min | RS485 cable disconnected | Check both ends of cable | Reconnect cable securely | Connected but no communication |
| LED blinks 2x/min | RS485 cable damaged | Inspect cable for cuts, kinks, rodent damage | Replace cable | New cable same problem |
| LED blinks 2x/min | WS Box not transmitting | Verify WS Box display shows values | Check WS Box power and sensors | Display OK but MODBUS error |
| LED blinks 2x/min | Wrong protocol setting | Check WS Box communication settings | Set to MODBUS RTU | Settings correct but error persists |
| LED blinks 2x/min | Address mismatch | Check device address settings | Match addresses | Addresses match but error persists |

### 4.2 Intermittent Communication

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|---------|--------------|--------------|-----|---------------|
| Data drops occasionally | Loose RS485 connection | Pull-test all connections | Re-terminate connections | Connections tight but still dropping |
| Data drops occasionally | EMI interference | Check for nearby high-power equipment | Reroute cable, add shielding | Cannot eliminate interference |
| Data drops occasionally | Cable too long | Measure cable length (max 1200m) | Shorten cable or add repeater | Within length but still issues |
| Data drops occasionally | Ground loop | Check shield grounding | Ground shield at one end only | Grounding correct but issues persist |

### 4.3 WS Box Not Responding

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|---------|--------------|--------------|-----|---------------|
| No response to commands | WS Box frozen | Check if display is updating | Power cycle WS Box | Resets don't help |
| No response to commands | Wrong communication settings | Verify baud rate, address | Match settings to documentation | Settings correct but no response |

---

## 5. Sensor Issues

### 5.1 All Sensors Show Zero

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|---------|--------------|--------------|-----|---------------|
| All values = 0 | Sensors not connected | Check cables at T1-T6 terminals | Reconnect sensor cables | Connected but still zeros |
| All values = 0 | WS Box in wrong mode | Check display settings | Reset to factory defaults | Reset doesn't help |
| All values = 0 | WS Box fault | Power cycle and observe | Replace WS Box | Power cycle doesn't help |

### 5.2 Wind Speed Issues

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|---------|--------------|--------------|-----|---------------|
| Always reads 0 | Anemometer not spinning | Manually spin cups - do they rotate freely? | Free obstruction, replace bearings | Spins freely but no reading |
| Always reads 0 | Cable disconnected | Check cable at T1 terminal | Reconnect cable | Connected but no reading |
| Always reads 0 | Sensor fault | Measure sensor output with multimeter | Replace sensor | - |
| Reads too low | Obstruction affecting airflow | Check for structures within 2m | Relocate sensor | No obstructions |
| Reads too high | Electrical interference | Check cable routing | Reroute away from power cables | Interference eliminated but high |
| Erratic readings | Damaged bearings | Listen for grinding, check rotation | Replace sensor | - |

### 5.3 Wind Direction Issues

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|---------|--------------|--------------|-----|---------------|
| Wrong direction | Sensor misaligned | Check North alignment with compass | Realign sensor to True North | Aligned but still wrong |
| Stuck at one value | Vane jammed | Check if vane rotates freely | Free obstruction | Rotates but reading stuck |
| Erratic readings | Sensor in turbulent airflow | Check for nearby obstructions | Relocate to open area | Open area but still erratic |
| Always reads 0 | Cable disconnected | Check cable at T2 terminal | Reconnect cable | Connected but no reading |

### 5.4 Temperature Issues

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|---------|--------------|--------------|-----|---------------|
| Reads too high | Direct sunlight on sensor | Check Baiye Box installation | Ensure proper shading | Properly shaded but still high |
| Reads too high | Near heat source | Check for HVAC, equipment, exhaust | Relocate sensor | Cannot relocate |
| Reads too low | Sensor exposed to wind/rain | Check Baiye Box integrity | Repair or replace Baiye Box | Baiye Box OK but reads low |
| Stuck value | Sensor fault | Compare to reference thermometer | Replace sensor | - |
| Reads -50 or +100 | Sensor disconnected/shorted | Check cable at T3 terminal | Reconnect or replace cable | Cable OK but extreme reading |

### 5.5 Humidity Issues

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|---------|--------------|--------------|-----|---------------|
| Always reads 100% | Sensor contaminated | Inspect sensor element | Clean or replace sensor | Cleaned but still reads 100% |
| Always reads 0% | Sensor dried out | Check sensor condition | Replace sensor | - |
| Slow response | Contaminated sensor element | Inspect Baiye Box ventilation | Clean sensor, improve airflow | Clean with good airflow |
| Reads -5% or 105% | Sensor fault | Compare to reference hygrometer | Replace sensor | - |

### 5.6 Pressure Issues

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|---------|--------------|--------------|-----|---------------|
| Reading way off | Wrong units displayed | Check display units (hPa vs mbar) | Verify expected range 900-1100 hPa | Units correct but off |
| Stuck value | Sensor fault | Compare to reference barometer | Replace sensor | - |
| Erratic readings | Pressure port blocked | Check for debris in port | Clear port | Port clear but erratic |

### 5.7 Rainfall Issues

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|---------|--------------|--------------|-----|---------------|
| No accumulation during rain | Funnel blocked | Inspect funnel for debris | Clean funnel | Clean but no accumulation |
| No accumulation during rain | Tipping bucket stuck | Check if bucket tips freely | Free mechanism | Tips freely but no reading |
| No accumulation during rain | Cable disconnected | Check cable at T6 terminal | Reconnect cable | Connected but no reading |
| Over-reporting rainfall | Double-counting tips | Check tipping mechanism | Adjust or replace | - |
| Under-reporting rainfall | Gauge not level | Check with spirit level | Level the gauge | Level but under-reporting |
| Under-reporting rainfall | Splash interference | Check for nearby surfaces | Relocate or install splash guard | - |

### 5.8 Gas Sensor Issues

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|---------|--------------|--------------|-----|---------------|
| Always reads 0 | Sensor expired | Check sensor age (12 month life) | Replace sensor | New sensor reads 0 |
| Always reads 0 | Sensor not calibrated | Check last calibration date | Calibrate sensor | Calibration fails |
| False alarms | Cross-sensitivity | Check for interfering gases | Verify with calibration gas | Confirmed false alarms |
| Drifting readings | Sensor degradation | Compare to calibration gas | Recalibrate or replace | Cannot calibrate |

---

## 6. Network Issues

### 6.1 MODBUS Asset Shows Offline

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|---------|--------------|--------------|-----|---------------|
| Offline in app | No power to MODBUS Asset | Check power connections | Restore power | Power OK but offline |
| Offline in app | Out of wireless range | Check distance to nearest Anchor | Move MODBUS Asset closer or add Anchor | Cannot improve range |
| Offline in app | Mesh network down | Check if Anchors are online | Troubleshoot mesh network | Multiple devices offline |
| Offline in app | Device fault | Power cycle MODBUS Asset | Contact support if cycle doesn't help | Power cycle doesn't help |

### 6.2 Anchors Showing Offline

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|---------|--------------|--------------|-----|---------------|
| All Anchors offline | Gateway offline | Check Gateway status | Troubleshoot Gateway | Gateway online but Anchors offline |
| One Anchor offline | Anchor power loss | Check Anchor power source | Restore power | Power OK but offline |
| One Anchor offline | Anchor fault | Power cycle Anchor | Contact support if cycle doesn't help | Power cycle doesn't help |
| Intermittent Anchors | Poor wireless signal | Check for new obstructions | Remove obstructions or add Anchors | Cannot improve signal |

### 6.3 Gateway Showing Offline

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|---------|--------------|--------------|-----|---------------|
| Gateway offline | No power | Check power connections | Restore power | Power OK but offline |
| Gateway offline | No internet | Check cellular/WiFi/Ethernet | Restore internet connection | Connection present but offline |
| Gateway offline (Cellular) | SIM card issue | Check SIM card seated properly | Reseat or replace SIM | SIM OK but no data |
| Gateway offline (Cellular) | No cellular signal | Check signal strength | Relocate or add antenna | Cannot improve signal |
| Gateway offline (WiFi) | WiFi network down | Check router/AP | Restore WiFi network | WiFi OK but Gateway offline |
| Gateway offline (Ethernet) | Cable disconnected | Check Ethernet cable | Reconnect cable | Connected but offline |

---

## 7. Dashboard Issues

### 7.1 No Data on Dashboard

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|---------|--------------|--------------|-----|---------------|
| Dashboard empty | Not logged in | Verify login status | Login to dashboard | Logged in but no data |
| Dashboard empty | Wrong site selected | Check site selector | Select correct site | Correct site but no data |
| Dashboard empty | Gateway offline | Check Gateway status in app | See Section 6.3 | Gateway online but no data |
| Dashboard empty | Cloud service issue | Check service status page | Wait for service restoration | Extended outage |
| Dashboard empty | Data not configured | Check sensor assignments in dashboard | Configure sensors | Configuration correct but no data |

### 7.2 Stale Data (Not Updating)

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|---------|--------------|--------------|-----|---------------|
| Data frozen | Browser cache issue | Refresh browser (Ctrl+F5) | Clear cache and refresh | Refresh doesn't help |
| Data frozen | Network issue in chain | Check MODBUS LED, Gateway status | Identify and fix offline device | All devices online but frozen |
| Data frozen | Cloud processing delay | Check timestamp on dashboard | Wait 5 minutes, refresh | Delay exceeds 30 minutes |

### 7.3 Missing Sensors on Dashboard

| Symptom | Likely Cause | Quick Checks | Fix | Escalate When |
|---------|--------------|--------------|-----|---------------|
| Some sensors missing | Sensors not configured | Check dashboard configuration | Add sensors to display | Cannot add sensors |
| Some sensors missing | Sensors showing zero | Check sensor connections | See Section 5 | Sensors connected but missing |

---

## 8. LED Status Reference

### 8.1 MODBUS Asset LED

| Pattern | Status | Meaning | Action |
|---------|--------|---------|--------|
| 1 blink per minute | NORMAL | Receiving data from WS Box, transmitting wirelessly | None required |
| 2 blinks per minute | COMMUNICATION ERROR | Not receiving data from WS Box | Check RS485 wiring (A-A, B-B) |
| Continuous ON | Startup/Fault | Device initializing or fault | Wait 2 minutes, then check |
| OFF | No Power | Device not powered | Check power connections |

### 8.2 WS Box LCD Display States

| Display State | Status | Meaning | Action |
|---------------|--------|---------|--------|
| Date/Time + Values | NORMAL | System operating correctly | None required |
| Date/Time + All Zeros | SENSOR ERROR | Sensors not providing data | Check sensor connections T1-T6 |
| Blank/Dark | POWER ERROR | No power to WS Box | Check 12V DC power supply |
| Frozen/Unresponsive | SYSTEM HANG | Processor issue | Power cycle WS Box |

### 8.3 MPPT Controller Indicators

| Indicator | Status | Action |
|-----------|--------|--------|
| Charging LED ON | Normal charging | None required |
| Charging LED OFF (daytime) | Not charging | Check solar panel connection, panel shading |
| Fault LED ON | System fault | Check battery, panel, connections |
| Battery LOW LED ON | Low battery voltage | Check battery health, charging system |

---

## 9. Error Code Dictionary

### 9.1 WS Box Error Messages

| Error Code | Message | Meaning | Resolution |
|------------|---------|---------|------------|
| E001 | Sensor Timeout T1 | Wind speed sensor not responding | Check T1 connection |
| E002 | Sensor Timeout T2 | Wind direction sensor not responding | Check T2 connection |
| E003 | Sensor Timeout T3 | Temperature sensor not responding | Check T3 connection |
| E004 | Sensor Timeout T4 | Humidity sensor not responding | Check T4 connection |
| E005 | Sensor Timeout T5 | Pressure sensor not responding | Check T5 connection |
| E006 | Sensor Timeout T6 | Rain gauge not responding | Check T6 connection |
| E010 | Memory Full | Internal storage full | Export data, clear memory |
| E011 | Memory Error | Internal storage fault | Contact support |
| E020 | RS485 Error | Communication fault | Check RS485 connections |
| E030 | Clock Error | Real-time clock fault | Reset date/time |

### 9.2 Dashboard Error Messages

| Error | Meaning | Resolution |
|-------|---------|------------|
| "Device Offline" | Gateway not communicating with cloud | Check Gateway internet connection |
| "No Data Available" | Sensors not configured or not reporting | Check sensor configuration and device status |
| "Authentication Failed" | Invalid login credentials | Verify username and password |
| "Session Expired" | Login timeout | Login again |
| "Data Delayed" | Processing backlog | Wait and refresh |

---

## 10. Log Collection Procedures

### 10.1 When to Collect Logs

Collect logs before contacting support when:
- Problem persists after basic troubleshooting
- Intermittent issues that are hard to reproduce
- System behaves unexpectedly
- Support requests diagnostic information

### 10.2 WS Box Data Export

#### Step 1: Prepare USB Drive

1. Use USB drive formatted as FAT32
2. Ensure adequate free space (minimum 100MB)
3. Insert USB drive into WS Box USB port

#### Step 2: Export Data

1. Press **Confirm** to enter menu
2. Navigate to **Data Save**
3. Select **USB**
4. Wait for export complete indication
5. Remove USB drive

#### Step 3: Data File Contents

Exported data includes:
- Historical sensor readings
- System configuration
- Error log

### 10.3 Network Diagnostics via App

#### Step 1: Open WakeCap Verify App

1. Launch app
2. Login with credentials
3. Navigate to site

#### Step 2: Capture Device Status

Record for each device:
- Online/Offline status
- Last seen timestamp
- Signal strength (if available)
- Any error indicators

### 10.4 Information to Collect for Support

| Item | How to Obtain |
|------|---------------|
| Device serial numbers | Label on device |
| Firmware version | WS Box Settings > Version |
| Installation date | Installation records |
| Problem description | Detailed written description |
| Photos of installation | Smartphone camera |
| WS Box display state | Photo of screen |
| MODBUS LED pattern | Video of LED |
| Dashboard screenshots | Screen capture |
| Network device status | WakeCap Verify App |
| Exported data files | USB export from WS Box |

---

## 11. Escalation Criteria

### 11.1 When to Escalate

Escalate to technical support when:

| Situation | Example |
|-----------|---------|
| Basic troubleshooting fails | Checked all connections, power OK, but still not working |
| Hardware fault suspected | Physical damage visible, component not responding |
| Multiple devices affected | Several sensors or network devices failing simultaneously |
| Safety-related issue | Gas sensor giving false readings in critical application |
| Data integrity concern | Historical data missing or corrupted |
| Firmware issue suspected | Problem started after update |
| Cannot diagnose | Problem doesn't match any known issue |

### 11.2 How to Escalate

#### Step 1: Gather Information

Collect all items from Section 10.4 before calling.

#### Step 2: Contact Support

**Manufacturer:**
WUHAN XINPUHUI TECHNOLOGY CO., LTD
Technical Support: 027-82666096
Website: www.whxph.com

**Regional (Saudi Arabia):**
Saudi Wakecap Company for Information Systems Technologies
P.O. Box: 85540, Riyadh 11612

#### Step 3: Provide Information

When contacting support, provide:
1. Site name and location
2. Device serial numbers
3. Problem description
4. Troubleshooting steps already taken
5. Log files and photos

### 11.3 Escalation Response Expectations

| Severity | Description | Expected Response |
|----------|-------------|-------------------|
| Critical | System completely non-functional, safety impact | Same business day |
| High | Major functionality lost, workaround not available | 1 business day |
| Medium | Partial functionality loss, workaround available | 2-3 business days |
| Low | Minor issue, no significant impact | 5 business days |

---

## 12. Known Issues

### 12.1 Current Known Issues

| Issue ID | Description | Affected Versions | Workaround | Status |
|----------|-------------|-------------------|------------|--------|
| KI-001 | Rain gauge may under-report in very heavy rainfall (>4mm/min) | All | Accept limitation during extreme events | By design |
| KI-002 | Wind direction may show brief spikes during very low wind | All | Ignore readings when wind speed < 0.5 m/s | By design |
| KI-003 | Display may flicker briefly during temperature extremes | All | Normal operation, no action needed | By design |

### 12.2 Resolved Issues

| Issue ID | Description | Fixed in Version | Notes |
|----------|-------------|------------------|-------|
| - | No resolved issues to report | - | - |

---

## 13. Support Information

### 13.1 Technical Support Contacts

**Manufacturer:**
WUHAN XINPUHUI TECHNOLOGY CO., LTD
Technical Support: 027-82666096
Email: support@whxph.com
Website: www.whxph.com
Hours: Monday-Friday 8:00-17:00 (China Standard Time)

### 13.2 Regional Support

**Saudi Arabia:**
Saudi Wakecap Company for Information Systems Technologies
P.O. Box: 85540
Riyadh 11612, Saudi Arabia

### 13.3 Related Documentation

| Document | Number | Description |
|----------|--------|-------------|
| Product Manual | WC-WS-PM-v1.0 | Comprehensive technical documentation |
| Installation Guide | WC-WS-IG-v1.0 | Installation procedures |
| Quick Reference Guide | WC-WS-QR-v1.0 | Field reference card |
| Datasheet | WC-WS-DS-v1.0 | Product specifications |

### 13.4 Spare Parts

For replacement parts, contact your regional support with:
- Device serial number
- Part description
- Quantity needed

---

**Document:** WC-WS-TG-v1.0
**WakeCap Technologies**

*End of Document*

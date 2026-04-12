# WakeCap Gateway Commissioning Guide

| Field               | Value                                      |
|---------------------|--------------------------------------------|
| **Document ID**     | WC-GW-CG-v1.0                             |
| **Version**         | 1.0                                        |
| **Date**            | 2026-02-09                                 |
| **Product**         | WakeCap Gateway                            |
| **Product Code**    | GW                                         |
| **Document Type**   | Commissioning Guide (CG)                   |
| **Classification**  | Technical / Field                          |
| **HW Compatibility**| [TBD]                                      |
| **FW Compatibility**| [TBD]                                      |
| **Author**          | [TBD]                                      |
| **Approved By**     | [TBD]                                      |

---

## Revision History

| Version | Date       | Author | Description           |
|---------|------------|--------|-----------------------|
| 1.0     | 2026-02-09 | [TBD]  | Initial release       |

---

## Table of Contents

1. [Purpose and Scope](#1-purpose-and-scope)
2. [Preconditions](#2-preconditions)
3. [Calibration Steps with Expected Ranges](#3-calibration-steps-with-expected-ranges)
4. [Connectivity Validation](#4-connectivity-validation)
5. [Mesh and Device Validation Tests](#5-mesh-and-device-validation-tests)
6. [Alarm and Alert Tests](#6-alarm-and-alert-tests)
7. [Acceptance Criteria and Evidence Capture](#7-acceptance-criteria-and-evidence-capture)
8. [Handover Checklist and Sign-Off](#8-handover-checklist-and-sign-off)
9. [Related Documents](#9-related-documents)

---

## 1. Purpose and Scope

This Commissioning Guide provides a structured, checklist-driven procedure to verify that a WakeCap Gateway (GW) has been installed correctly, is fully operational, and meets all acceptance criteria before handover to the site operations team.

The commissioning process validates:

- Cloud connectivity and data uplink integrity
- Mesh network formation and stability
- Device association and registration
- Data throughput and latency performance
- Alert routing and notification delivery
- Overall system readiness for production use

All tests in this guide produce documented pass/fail evidence suitable for formal acceptance sign-off.

---

## 2. Preconditions

Complete every precondition check below before beginning commissioning. All items must show **PASS** to proceed.

### 2.1 Installation Verification

| # | Precondition                                                        | Pass | Fail | N/A | Initials |
|---|---------------------------------------------------------------------|------|------|-----|----------|
| 1 | Gateway physical installation completed per WC-GW-IG-v1.0          | [ ]  | [ ]  | [ ] |          |
| 2 | Gateway mounted at specified height: [TBD] m above ground level    | [ ]  | [ ]  | [ ] |          |
| 3 | Antenna installed and oriented per installation guide               | [ ]  | [ ]  | [ ] |          |
| 4 | All cable connections secured and weatherproofed                    | [ ]  | [ ]  | [ ] |          |
| 5 | Enclosure sealed, IP rating integrity confirmed: IP[TBD]           | [ ]  | [ ]  | [ ] |          |
| 6 | Power supply connected and output verified: [TBD] V DC +/- [TBD] V | [ ]  | [ ]  | [ ] |          |
| 7 | Grounding/bonding verified per local electrical code                | [ ]  | [ ]  | [ ] |          |

### 2.2 Firmware and Software Version

| # | Item                                          | Required Version | Actual Version | Pass | Fail |
|---|-----------------------------------------------|------------------|----------------|------|------|
| 1 | Gateway firmware                              | [TBD]            |                | [ ]  | [ ]  |
| 2 | Gateway bootloader                            | [TBD]            |                | [ ]  | [ ]  |
| 3 | WakeCap Cloud platform version                | [TBD]            |                | [ ]  | [ ]  |
| 4 | WakeCap mobile/commissioning app version      | [TBD]            |                | [ ]  | [ ]  |

### 2.3 Required Tools and Equipment

| # | Tool / Equipment                              | Specification          | Available | Initials |
|---|-----------------------------------------------|------------------------|-----------|----------|
| 1 | WakeCap commissioning application (mobile)    | Version [TBD]+         | [ ]       |          |
| 2 | Laptop with browser access to WakeCap Cloud   | Chrome [TBD]+          | [ ]       |          |
| 3 | Digital multimeter                            | Accuracy +/- [TBD] %   | [ ]       |          |
| 4 | RF spectrum analyzer or signal strength tool  | [TBD]                  | [ ]       |          |
| 5 | Network cable tester (if Ethernet backhaul)   | [TBD]                  | [ ]       |          |
| 6 | Stopwatch or timer                            | Resolution 1 s         | [ ]       |          |
| 7 | Camera (for evidence capture)                 | Min [TBD] MP           | [ ]       |          |
| 8 | Test WakeCap devices (helmets/tags)           | Qty: [TBD], FW [TBD]   | [ ]       |          |
| 9 | Site commissioning form (this document)       | Printed or digital      | [ ]       |          |

### 2.4 Environmental Conditions

| # | Parameter                   | Acceptable Range           | Measured Value | Pass | Fail |
|---|-----------------------------|----------------------------|----------------|------|------|
| 1 | Ambient temperature         | [TBD] C to [TBD] C        |                | [ ]  | [ ]  |
| 2 | Relative humidity           | [TBD] % to [TBD] %        |                | [ ]  | [ ]  |
| 3 | Wind speed                  | < [TBD] km/h               |                | [ ]  | [ ]  |
| 4 | Precipitation               | None during commissioning  |                | [ ]  | [ ]  |

> **NOTICE:** Do not proceed with commissioning if any precondition check shows FAIL. Resolve all failures before continuing. Refer to WC-GW-TG-v1.0 for troubleshooting guidance.

---

## 3. Calibration Steps with Expected Ranges

### 3.1 Power Supply Calibration

> **CAUTION:** Verify that all power sources are within rated specifications before energizing the Gateway. Out-of-range voltage may cause permanent hardware damage.

| Step | Action                                                         | Expected Range            | Measured Value | Tolerance     | Pass | Fail |
|------|----------------------------------------------------------------|---------------------------|----------------|---------------|------|------|
| 3.1.1 | Measure input voltage at Gateway power terminals             | [TBD] V DC                |                | +/- [TBD] V   | [ ]  | [ ]  |
| 3.1.2 | Measure input current at idle (no mesh devices)              | [TBD] mA                  |                | +/- [TBD] mA  | [ ]  | [ ]  |
| 3.1.3 | Measure input current under load ([TBD] mesh devices)        | [TBD] mA                  |                | +/- [TBD] mA  | [ ]  | [ ]  |
| 3.1.4 | Verify power LED status                                      | Solid [TBD] color         |                | N/A           | [ ]  | [ ]  |

[IMAGE: Photo showing correct power LED indication on an energized WakeCap Gateway]

### 3.2 Clock Synchronization

| Step | Action                                                         | Expected Range            | Measured Value | Tolerance     | Pass | Fail |
|------|----------------------------------------------------------------|---------------------------|----------------|---------------|------|------|
| 3.2.1 | Verify Gateway system clock against NTP reference            | UTC +/- [TBD] s           |                | +/- [TBD] s   | [ ]  | [ ]  |
| 3.2.2 | Confirm time zone configuration matches site setting         | [TBD]                     |                | Exact match   | [ ]  | [ ]  |
| 3.2.3 | Verify NTP server reachability                               | Response time < [TBD] ms  |                | N/A           | [ ]  | [ ]  |

### 3.3 Radio Frequency Calibration

> **WARNING:** RF transmission power must comply with local regulatory limits. Operating outside approved power levels may violate telecommunications law and cause interference with other systems.

| Step | Action                                                         | Expected Range            | Measured Value | Tolerance     | Pass | Fail |
|------|----------------------------------------------------------------|---------------------------|----------------|---------------|------|------|
| 3.3.1 | Verify mesh radio TX power setting                           | [TBD] dBm                 |                | +/- [TBD] dBm | [ ]  | [ ]  |
| 3.3.2 | Verify mesh radio operating frequency                        | [TBD] MHz                 |                | +/- [TBD] MHz | [ ]  | [ ]  |
| 3.3.3 | Measure RSSI at [TBD] m from Gateway (open-air reference)   | [TBD] dBm                 |                | +/- [TBD] dBm | [ ]  | [ ]  |
| 3.3.4 | Verify antenna VSWR (if test equipment available)            | < [TBD]:1                 |                | N/A           | [ ]  | [ ]  |

[IMAGE: Screenshot of RF calibration parameters displayed in the WakeCap commissioning application]

### 3.4 Sensor Input Calibration (if applicable)

| Step | Action                                                         | Expected Range            | Measured Value | Tolerance     | Pass | Fail |
|------|----------------------------------------------------------------|---------------------------|----------------|---------------|------|------|
| 3.4.1 | Verify onboard temperature sensor reading                    | Ambient +/- [TBD] C       |                | +/- [TBD] C   | [ ]  | [ ]  |
| 3.4.2 | Verify onboard humidity sensor reading (if equipped)         | Ambient +/- [TBD] %       |                | +/- [TBD] %   | [ ]  | [ ]  |

---

## 4. Connectivity Validation

### 4.1 Backhaul Connectivity (Gateway to Cloud)

> **NOTICE:** Ensure that all required firewall ports and DNS entries have been whitelisted prior to connectivity testing. Refer to WC-GW-IG-v1.0, network requirements section.

#### 4.1.1 Physical Layer

| Step | Action                                                              | Expected Result               | Actual Result | Pass | Fail |
|------|---------------------------------------------------------------------|-------------------------------|---------------|------|------|
| 1    | Verify Ethernet link status LED (if wired backhaul)                 | Solid [TBD] color             |               | [ ]  | [ ]  |
| 2    | Verify Ethernet negotiated speed                                    | [TBD] Mbps full duplex        |               | [ ]  | [ ]  |
| 3    | Verify cellular signal strength (if cellular backhaul)              | > [TBD] dBm RSSI              |               | [ ]  | [ ]  |
| 4    | Verify SIM card registration status (if cellular backhaul)          | Registered, home network      |               | [ ]  | [ ]  |
| 5    | Verify Wi-Fi signal strength (if Wi-Fi backhaul)                    | > [TBD] dBm RSSI              |               | [ ]  | [ ]  |

[IMAGE: Screenshot showing Gateway backhaul connection status in the WakeCap Cloud dashboard]

#### 4.1.2 Network Layer

| Step | Action                                                              | Expected Result               | Actual Result | Pass | Fail |
|------|---------------------------------------------------------------------|-------------------------------|---------------|------|------|
| 1    | Verify Gateway has obtained IP address (DHCP or static)             | Valid IP in site subnet       |               | [ ]  | [ ]  |
| 2    | Verify DNS resolution of WakeCap Cloud endpoint                     | Resolves to [TBD]             |               | [ ]  | [ ]  |
| 3    | Ping WakeCap Cloud endpoint                                        | RTT < [TBD] ms                |               | [ ]  | [ ]  |
| 4    | Verify packet loss over [TBD]-minute test window                   | < [TBD] % loss                |               | [ ]  | [ ]  |

#### 4.1.3 Application Layer (Cloud Registration)

| Step | Action                                                              | Expected Result               | Actual Result | Pass | Fail |
|------|---------------------------------------------------------------------|-------------------------------|---------------|------|------|
| 1    | Verify Gateway appears as "Online" in WakeCap Cloud                 | Status: Online                |               | [ ]  | [ ]  |
| 2    | Verify Gateway serial number matches physical label                 | Exact match                   |               | [ ]  | [ ]  |
| 3    | Verify Gateway assigned to correct site and zone                    | Site: ____________            |               | [ ]  | [ ]  |
| 4    | Verify TLS/SSL connection established to cloud                      | TLS [TBD]+ verified           |               | [ ]  | [ ]  |
| 5    | Verify MQTT broker connection (or applicable protocol)              | Connected, subscribed         |               | [ ]  | [ ]  |
| 6    | Verify last heartbeat timestamp in cloud dashboard                  | Within last [TBD] s           |               | [ ]  | [ ]  |

[IMAGE: Screenshot of WakeCap Cloud dashboard showing Gateway online status, serial number, and site assignment]

### 4.2 Backhaul Redundancy Test (if applicable)

| Step | Action                                                              | Expected Result               | Actual Result | Pass | Fail |
|------|---------------------------------------------------------------------|-------------------------------|---------------|------|------|
| 1    | Disconnect primary backhaul link                                    | Gateway switches to secondary |               | [ ]  | [ ]  |
| 2    | Verify Gateway remains "Online" in cloud after failover             | Status: Online                |               | [ ]  | [ ]  |
| 3    | Measure failover time                                               | < [TBD] s                     |               | [ ]  | [ ]  |
| 4    | Reconnect primary backhaul link                                     | Gateway reverts to primary    |               | [ ]  | [ ]  |
| 5    | Verify Gateway remains "Online" after failback                      | Status: Online                |               | [ ]  | [ ]  |

---

## 5. Mesh and Device Validation Tests

### 5.1 Mesh Network Formation

> **NOTICE:** Perform mesh network tests only after cloud connectivity has been validated (Section 4). Mesh data cannot be verified end-to-end without a confirmed cloud connection.

#### 5.1.1 Mesh Initialization

| Step | Action                                                              | Expected Result               | Actual Result | Pass | Fail |
|------|---------------------------------------------------------------------|-------------------------------|---------------|------|------|
| 1    | Verify mesh radio status LED on Gateway                             | Solid [TBD] color             |               | [ ]  | [ ]  |
| 2    | Verify mesh network ID (PAN ID) matches site configuration          | PAN ID: [TBD]                 |               | [ ]  | [ ]  |
| 3    | Verify mesh channel matches site configuration                      | Channel: [TBD]                |               | [ ]  | [ ]  |
| 4    | Verify Gateway is advertising as mesh coordinator/root              | Role: Coordinator             |               | [ ]  | [ ]  |

[IMAGE: Screenshot showing mesh network status and configuration in the WakeCap commissioning application]

#### 5.1.2 Device Association

Perform the following test with [TBD] test devices placed at the distances specified.

| Step | Action                                                              | Expected Result               | Actual Result | Pass | Fail |
|------|---------------------------------------------------------------------|-------------------------------|---------------|------|------|
| 1    | Power on test device #1 at [TBD] m from Gateway (near range)       | Device associates < [TBD] s   |               | [ ]  | [ ]  |
| 2    | Verify device #1 appears in cloud dashboard                         | Status: Online                |               | [ ]  | [ ]  |
| 3    | Record RSSI for device #1                                           | > [TBD] dBm                   |               | [ ]  | [ ]  |
| 4    | Power on test device #2 at [TBD] m from Gateway (mid range)        | Device associates < [TBD] s   |               | [ ]  | [ ]  |
| 5    | Verify device #2 appears in cloud dashboard                         | Status: Online                |               | [ ]  | [ ]  |
| 6    | Record RSSI for device #2                                           | > [TBD] dBm                   |               | [ ]  | [ ]  |
| 7    | Power on test device #3 at [TBD] m from Gateway (far range)        | Device associates < [TBD] s   |               | [ ]  | [ ]  |
| 8    | Verify device #3 appears in cloud dashboard                         | Status: Online                |               | [ ]  | [ ]  |
| 9    | Record RSSI for device #3                                           | > [TBD] dBm                   |               | [ ]  | [ ]  |
| 10   | Verify total associated device count in Gateway status              | [TBD] devices                 |               | [ ]  | [ ]  |

[IMAGE: Diagram showing recommended test device placement at near, mid, and far ranges from the Gateway]

#### 5.1.3 Device Disassociation and Reassociation

| Step | Action                                                              | Expected Result               | Actual Result | Pass | Fail |
|------|---------------------------------------------------------------------|-------------------------------|---------------|------|------|
| 1    | Power off test device #1                                            | Device state changes          |               | [ ]  | [ ]  |
| 2    | Verify device #1 status in cloud changes to "Offline"               | Status: Offline, < [TBD] s    |               | [ ]  | [ ]  |
| 3    | Power on test device #1                                             | Device reassociates           |               | [ ]  | [ ]  |
| 4    | Verify device #1 returns to "Online" status in cloud                | Status: Online, < [TBD] s     |               | [ ]  | [ ]  |
| 5    | Verify no duplicate device entries created                          | Single entry per device       |               | [ ]  | [ ]  |

### 5.2 Data Throughput Validation

#### 5.2.1 Uplink Data Integrity

| Step | Action                                                              | Expected Result               | Actual Result | Pass | Fail |
|------|---------------------------------------------------------------------|-------------------------------|---------------|------|------|
| 1    | Trigger known data payload from test device #1                      | Payload received in cloud     |               | [ ]  | [ ]  |
| 2    | Verify payload content matches transmitted data                     | 100% data integrity           |               | [ ]  | [ ]  |
| 3    | Measure end-to-end latency (device to cloud timestamp)              | < [TBD] s                     |               | [ ]  | [ ]  |
| 4    | Record Gateway uplink throughput (messages per minute)              | > [TBD] msg/min               |               | [ ]  | [ ]  |

#### 5.2.2 Sustained Throughput Test

| Step | Action                                                              | Expected Result               | Actual Result | Pass | Fail |
|------|---------------------------------------------------------------------|-------------------------------|---------------|------|------|
| 1    | Configure all [TBD] test devices to transmit at [TBD] s interval   | All devices transmitting      |               | [ ]  | [ ]  |
| 2    | Run sustained test for [TBD] minutes                                | Test completes                |               | [ ]  | [ ]  |
| 3    | Calculate message delivery rate                                     | > [TBD] %                     |               | [ ]  | [ ]  |
| 4    | Verify no Gateway buffer overflows or error logs                    | Zero overflow events          |               | [ ]  | [ ]  |
| 5    | Verify Gateway CPU utilization during sustained load                | < [TBD] %                     |               | [ ]  | [ ]  |
| 6    | Verify Gateway memory utilization during sustained load             | < [TBD] %                     |               | [ ]  | [ ]  |

[IMAGE: Screenshot of cloud dashboard showing data throughput graph during sustained test]

#### 5.2.3 Store-and-Forward Test (Backhaul Interruption)

> **CAUTION:** This test requires temporarily disconnecting the Gateway backhaul. Coordinate with site IT before proceeding.

| Step | Action                                                              | Expected Result               | Actual Result | Pass | Fail |
|------|---------------------------------------------------------------------|-------------------------------|---------------|------|------|
| 1    | Disconnect Gateway backhaul connection                              | Gateway goes offline in cloud |               | [ ]  | [ ]  |
| 2    | Verify Gateway continues to receive mesh device data (LED activity) | Mesh LED active               |               | [ ]  | [ ]  |
| 3    | Wait [TBD] minutes while devices continue transmitting              | Data buffered locally         |               | [ ]  | [ ]  |
| 4    | Reconnect Gateway backhaul connection                               | Gateway comes online          |               | [ ]  | [ ]  |
| 5    | Verify buffered data is uploaded to cloud                           | All buffered data received    |               | [ ]  | [ ]  |
| 6    | Verify no data loss during buffer period                            | 100% data recovery            |               | [ ]  | [ ]  |
| 7    | Record maximum buffer duration supported                            | [TBD] minutes                 |               | [ ]  | [ ]  |

---

## 6. Alarm and Alert Tests

### 6.1 Device Offline Alert

| Step | Action                                                              | Expected Result                  | Actual Result | Pass | Fail |
|------|---------------------------------------------------------------------|----------------------------------|---------------|------|------|
| 1    | Verify alert rule "Device Offline" is enabled in cloud              | Rule active                      |               | [ ]  | [ ]  |
| 2    | Power off test device #1                                            | Device goes offline              |               | [ ]  | [ ]  |
| 3    | Wait for offline detection timeout: [TBD] s                        | Alert generated in cloud         |               | [ ]  | [ ]  |
| 4    | Verify alert appears in cloud dashboard alerts panel                | Alert visible                    |               | [ ]  | [ ]  |
| 5    | Verify alert notification delivered via email                       | Email received within [TBD] s    |               | [ ]  | [ ]  |
| 6    | Verify alert notification delivered via SMS (if configured)         | SMS received within [TBD] s      |               | [ ]  | [ ]  |
| 7    | Verify alert notification delivered via push (if configured)        | Push received within [TBD] s     |               | [ ]  | [ ]  |
| 8    | Power on test device #1                                             | Device comes online              |               | [ ]  | [ ]  |
| 9    | Verify "Device Online" recovery alert generated                     | Recovery alert visible           |               | [ ]  | [ ]  |

### 6.2 Gateway Offline Alert

> **WARNING:** This test will temporarily take the Gateway offline. All mesh devices will lose cloud connectivity during the test. Notify site personnel before proceeding.

| Step | Action                                                              | Expected Result                  | Actual Result | Pass | Fail |
|------|---------------------------------------------------------------------|----------------------------------|---------------|------|------|
| 1    | Verify alert rule "Gateway Offline" is enabled in cloud             | Rule active                      |               | [ ]  | [ ]  |
| 2    | Disconnect Gateway power supply                                     | Gateway powers off               |               | [ ]  | [ ]  |
| 3    | Wait for Gateway offline detection timeout: [TBD] s                | Alert generated in cloud         |               | [ ]  | [ ]  |
| 4    | Verify "Gateway Offline" alert in cloud dashboard                   | Alert visible                    |               | [ ]  | [ ]  |
| 5    | Verify alert notification delivered to configured recipients        | Notifications received           |               | [ ]  | [ ]  |
| 6    | Reconnect Gateway power supply                                     | Gateway powers on                |               | [ ]  | [ ]  |
| 7    | Verify Gateway boot time                                            | Online within [TBD] s            |               | [ ]  | [ ]  |
| 8    | Verify "Gateway Online" recovery alert generated                    | Recovery alert visible           |               | [ ]  | [ ]  |
| 9    | Verify all mesh devices reassociate after Gateway restart           | All [TBD] devices online         |               | [ ]  | [ ]  |

### 6.3 Threshold-Based Alerts (if configured)

| Step | Action                                                              | Expected Result                  | Actual Result | Pass | Fail |
|------|---------------------------------------------------------------------|----------------------------------|---------------|------|------|
| 1    | Configure test threshold alert: [TBD] parameter > [TBD] value      | Rule saved                       |               | [ ]  | [ ]  |
| 2    | Trigger threshold condition using test device or simulation         | Threshold exceeded               |               | [ ]  | [ ]  |
| 3    | Verify alert generated within [TBD] s of threshold breach           | Alert visible in dashboard       |               | [ ]  | [ ]  |
| 4    | Verify alert contains correct severity level                        | Severity: [TBD]                  |               | [ ]  | [ ]  |
| 5    | Verify alert contains correct device/sensor identification          | Device ID matches                |               | [ ]  | [ ]  |
| 6    | Clear threshold condition                                           | Value returns to normal          |               | [ ]  | [ ]  |
| 7    | Verify recovery alert generated within [TBD] s                     | Recovery alert visible           |               | [ ]  | [ ]  |

### 6.4 Alert Routing Summary

Record the configured alert routing for this site:

| Alert Type           | Email Recipients | SMS Recipients | Push Recipients | Webhook URL | Verified |
|----------------------|------------------|----------------|-----------------|-------------|----------|
| Gateway Offline      |                  |                |                 |             | [ ]      |
| Device Offline       |                  |                |                 |             | [ ]      |
| Threshold Breach     |                  |                |                 |             | [ ]      |
| Low Battery          |                  |                |                 |             | [ ]      |
| [TBD]                |                  |                |                 |             | [ ]      |

---

## 7. Acceptance Criteria and Evidence Capture

### 7.1 Acceptance Criteria Summary

All of the following criteria must be met for commissioning acceptance. Each criterion references the test section where it is validated.

| # | Acceptance Criterion                                                          | Section | Required Result             | Actual Result | Pass | Fail |
|---|-------------------------------------------------------------------------------|---------|-----------------------------|---------------|------|------|
| 1 | Gateway power input within rated range                                        | 3.1     | [TBD] V DC +/- [TBD] V      |               | [ ]  | [ ]  |
| 2 | Gateway clock synchronized to NTP within tolerance                            | 3.2     | UTC +/- [TBD] s              |               | [ ]  | [ ]  |
| 3 | Mesh radio TX power within regulatory limits                                  | 3.3     | [TBD] dBm +/- [TBD] dBm     |               | [ ]  | [ ]  |
| 4 | Gateway registered and online in WakeCap Cloud                                | 4.1.3   | Status: Online               |               | [ ]  | [ ]  |
| 5 | Cloud heartbeat interval within specification                                 | 4.1.3   | < [TBD] s                    |               | [ ]  | [ ]  |
| 6 | Backhaul failover time within specification (if applicable)                   | 4.2     | < [TBD] s                    |               | [ ]  | [ ]  |
| 7 | All test devices associated and online                                        | 5.1.2   | [TBD] devices online         |               | [ ]  | [ ]  |
| 8 | Near-range device RSSI above minimum threshold                                | 5.1.2   | > [TBD] dBm                  |               | [ ]  | [ ]  |
| 9 | Far-range device RSSI above minimum threshold                                 | 5.1.2   | > [TBD] dBm                  |               | [ ]  | [ ]  |
| 10 | Device reassociation after power cycle successful                            | 5.1.3   | Online < [TBD] s             |               | [ ]  | [ ]  |
| 11 | End-to-end data latency within specification                                 | 5.2.1   | < [TBD] s                    |               | [ ]  | [ ]  |
| 12 | Sustained throughput message delivery rate                                    | 5.2.2   | > [TBD] %                    |               | [ ]  | [ ]  |
| 13 | Store-and-forward data recovery after backhaul interruption                   | 5.2.3   | 100% recovery                |               | [ ]  | [ ]  |
| 14 | Device Offline alert generated and routed correctly                           | 6.1     | Alert received               |               | [ ]  | [ ]  |
| 15 | Gateway Offline alert generated and routed correctly                          | 6.2     | Alert received               |               | [ ]  | [ ]  |
| 16 | Gateway boot and mesh recovery time after power cycle                         | 6.2     | < [TBD] s                    |               | [ ]  | [ ]  |
| 17 | All alert routing paths verified for configured recipients                    | 6.4     | All paths verified           |               | [ ]  | [ ]  |

### 7.2 Evidence Capture Checklist

Capture and archive the following evidence items. Each item must be labelled with the Gateway serial number, site name, and date.

| # | Evidence Item                                                    | Format       | Filename Convention                    | Captured | Initials |
|---|------------------------------------------------------------------|--------------|----------------------------------------|----------|----------|
| 1 | Photo: Gateway installed position (front)                        | JPEG/PNG     | GW-[serial]-install-front.jpg          | [ ]      |          |
| 2 | Photo: Gateway installed position (rear/cabling)                 | JPEG/PNG     | GW-[serial]-install-rear.jpg           | [ ]      |          |
| 3 | Photo: Gateway LED status during normal operation                | JPEG/PNG     | GW-[serial]-led-status.jpg             | [ ]      |          |
| 4 | Screenshot: Cloud dashboard - Gateway online status              | PNG          | GW-[serial]-cloud-online.png           | [ ]      |          |
| 5 | Screenshot: Cloud dashboard - Mesh device list                   | PNG          | GW-[serial]-mesh-devices.png           | [ ]      |          |
| 6 | Screenshot: Cloud dashboard - Data throughput graph              | PNG          | GW-[serial]-throughput.png             | [ ]      |          |
| 7 | Screenshot: Alert notification (email or SMS)                    | PNG          | GW-[serial]-alert-notification.png     | [ ]      |          |
| 8 | Export: Gateway event log for commissioning period               | CSV/JSON     | GW-[serial]-event-log.csv             | [ ]      |          |
| 9 | Export: Completed commissioning checklist (this document)        | PDF          | GW-[serial]-commissioning-form.pdf     | [ ]      |          |
| 10 | Photo: Power supply label showing rated output                  | JPEG/PNG     | GW-[serial]-psu-label.jpg             | [ ]      |          |

[IMAGE: Example of properly labelled evidence photo with serial number and date annotation]

### 7.3 Non-Conformance Record

Record any test failures, deviations, or observations that require follow-up. If no non-conformances exist, write "NONE" and initial.

| NCR # | Section | Description of Non-Conformance | Severity (Critical/Major/Minor) | Corrective Action | Target Date | Status   |
|-------|---------|--------------------------------|---------------------------------|-------------------|-------------|----------|
| 1     |         |                                |                                 |                   |             |          |
| 2     |         |                                |                                 |                   |             |          |
| 3     |         |                                |                                 |                   |             |          |

> **NOTICE:** Any **Critical** non-conformance must be resolved before handover sign-off. **Major** non-conformances may be accepted with a documented corrective action plan and customer approval. **Minor** non-conformances may be resolved post-handover.

---

## 8. Handover Checklist and Sign-Off

### 8.1 Documentation Handover

| # | Document / Deliverable                                          | Provided | Received | Initials |
|---|-----------------------------------------------------------------|----------|----------|----------|
| 1 | WakeCap Gateway Installation Guide (WC-GW-IG-v1.0)             | [ ]      | [ ]      |          |
| 2 | WakeCap Gateway Preventive Maintenance Guide (WC-GW-PM-v1.0)   | [ ]      | [ ]      |          |
| 3 | WakeCap Gateway Troubleshooting Guide (WC-GW-TG-v1.0)          | [ ]      | [ ]      |          |
| 4 | WakeCap Gateway Quick Reference Card (WC-GW-QR-v1.0)           | [ ]      | [ ]      |          |
| 5 | Completed commissioning form (this document, signed)            | [ ]      | [ ]      |          |
| 6 | Archived evidence package (photos, screenshots, logs)           | [ ]      | [ ]      |          |
| 7 | Site network configuration record (IPs, ports, credentials)     | [ ]      | [ ]      |          |
| 8 | Warranty terms and support contact information                  | [ ]      | [ ]      |          |

### 8.2 Knowledge Transfer

| # | Topic                                                           | Completed | Attendees | Initials |
|---|-----------------------------------------------------------------|-----------|-----------|----------|
| 1 | Gateway LED status codes and their meanings                     | [ ]       |           |          |
| 2 | WakeCap Cloud dashboard navigation and device monitoring        | [ ]       |           |          |
| 3 | Basic troubleshooting steps (power cycle, connectivity check)   | [ ]       |           |          |
| 4 | Alert configuration and notification management                 | [ ]       |           |          |
| 5 | Preventive maintenance schedule and procedures                  | [ ]       |           |          |
| 6 | Escalation path and WakeCap support contact procedure           | [ ]       |           |          |

### 8.3 System Configuration Record

Record the final as-commissioned configuration for this Gateway.

| Parameter                      | Value                |
|--------------------------------|----------------------|
| Gateway Serial Number          |                      |
| Gateway MAC Address            |                      |
| Gateway Firmware Version       |                      |
| Site Name                      |                      |
| Zone / Location                |                      |
| Mounting Height                |              m       |
| GPS Coordinates (if available) | Lat:       Long:     |
| Backhaul Type                  | Ethernet / Cellular / Wi-Fi |
| IP Address                     |                      |
| Subnet Mask                    |                      |
| Default Gateway                |                      |
| DNS Server                     |                      |
| Mesh PAN ID                    |                      |
| Mesh Channel                   |                      |
| Mesh TX Power                  |              dBm     |
| Number of Associated Devices   |                      |
| Cloud Account / Tenant         |                      |
| Power Supply Model             |                      |
| Power Supply Output            |              V DC    |

### 8.4 Formal Sign-Off

> **NOTICE:** By signing below, all parties confirm that the WakeCap Gateway has been commissioned in accordance with this guide, all acceptance criteria in Section 7.1 have been met (or non-conformances formally accepted), and the system is approved for operational use.

**Commissioning Engineer**

| Field              | Value |
|--------------------|-------|
| Name               |       |
| Company            |       |
| Signature          |       |
| Date               |       |

**Site Representative / Customer**

| Field              | Value |
|--------------------|-------|
| Name               |       |
| Company            |       |
| Signature          |       |
| Date               |       |

**WakeCap Project Manager (if applicable)**

| Field              | Value |
|--------------------|-------|
| Name               |       |
| Company            | WakeCap |
| Signature          |       |
| Date               |       |

---

## 9. Related Documents

| Document ID      | Title                                        | Version | Relationship                                  |
|------------------|----------------------------------------------|---------|-----------------------------------------------|
| WC-GW-IG-v1.0   | WakeCap Gateway Installation Guide           | 1.0     | Prerequisite: must be completed before commissioning |
| WC-GW-PM-v1.0   | WakeCap Gateway Preventive Maintenance Guide | 1.0     | Reference: post-commissioning maintenance schedule   |
| WC-GW-QR-v1.0   | WakeCap Gateway Quick Reference Card         | 1.0     | Reference: quick-access LED codes and procedures     |
| WC-GW-TG-v1.0   | WakeCap Gateway Troubleshooting Guide        | 1.0     | Reference: resolution of commissioning test failures |

---

*End of Document WC-GW-CG-v1.0*

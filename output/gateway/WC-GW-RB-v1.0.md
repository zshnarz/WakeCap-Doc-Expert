# WakeCap Gateway -- Runbook

| Field            | Value                  |
|------------------|------------------------|
| **Document ID**  | WC-GW-RB-v1.0         |
| **Product**      | WakeCap Gateway        |
| **Version**      | 1.0                    |
| **Date**         | 2026-02-09             |
| **Classification** | Technical / Field    |
| **Author**       | WakeCap Engineering    |

---

## Table of Contents

1. [How to Use This Runbook](#1-how-to-use-this-runbook)
2. [Alert Reference Table](#2-alert-reference-table)
3. [Playbooks](#3-playbooks)
   - 3.1 [Gateway Offline](#31-playbook-gateway-offline)
   - 3.2 [Gateway High CPU](#32-playbook-gateway-high-cpu)
   - 3.3 [Gateway Low Storage](#33-playbook-gateway-low-storage)
   - 3.4 [Gateway WAN Failover](#34-playbook-gateway-wan-failover)
   - 3.5 [Mesh Device Disconnection Spike](#35-playbook-mesh-device-disconnection-spike)
   - 3.6 [Data Delivery Delay](#36-playbook-data-delivery-delay)
   - 3.7 [Firmware Update Failed](#37-playbook-firmware-update-failed)
   - 3.8 [Certificate Expiry Warning](#38-playbook-certificate-expiry-warning)
4. [Escalation Matrix](#4-escalation-matrix)
5. [Post-Incident Review Template](#5-post-incident-review-template)

---

## 1. How to Use This Runbook

### 1.1 Purpose

This runbook provides structured, step-by-step playbooks for responding to WakeCap Gateway alerts. Each playbook maps an alert condition to a sequence of triage, diagnostic, resolution, and verification actions. The goal is to reduce mean time to recovery (MTTR) by enabling consistent, repeatable incident response.

### 1.2 Audience

- WakeCap NOC Operators (L1)
- WakeCap Field Engineers (L2)
- Site IT Administrators
- WakeCap Support Engineers (L3)

### 1.3 How to Navigate

1. When an alert fires, locate the alert name in the **Alert Reference Table** (Section 2)
2. Follow the **Playbook Reference** link to the corresponding playbook in Section 3
3. Execute steps sequentially within the playbook
4. If the issue is not resolved by the end of the playbook, follow the **Escalation Criteria** at the bottom of the playbook and refer to the **Escalation Matrix** (Section 4)
5. After resolution of any High or Critical incident, complete the **Post-Incident Review Template** (Section 5)

### 1.4 Conventions

| Convention               | Meaning                                                    |
|--------------------------|------------------------------------------------------------|
| **WARNING** block         | Safety or data-loss hazard -- read BEFORE proceeding       |
| `monospace text`          | CLI command, configuration value, or system output         |
| [TBD]                     | Specification not yet finalized -- pending product input   |
| [IMAGE: description]      | Placeholder for a diagram or screenshot                    |
| (L1), (L2), (L3)         | Skill level required for the step                          |

### 1.5 Prerequisites

Before executing any playbook, ensure you have:

- Access to the WakeCap Dashboard ([TBD]) with operator-level or higher permissions
- Gateway CLI access credentials (if remote shell is available)
- Access to the WakeCap ticketing system at [TBD]
- Contact information for the site IT administrator
- A copy of the WakeCap Gateway Operations Guide (WC-GW-OG-v1.0)

---

## 2. Alert Reference Table

| Alert Name                        | Severity | Category     | Trigger Condition                                  | SLA Response | Playbook             |
|-----------------------------------|----------|--------------|----------------------------------------------------|--------------|-----------------------|
| Gateway Offline                   | Critical | Connectivity | No heartbeat for > [TBD] min                       | [TBD] min    | [3.1](#31-playbook-gateway-offline) |
| Gateway High CPU                  | Warning  | Performance  | CPU > [TBD]% for > [TBD] min                       | [TBD] min    | [3.2](#32-playbook-gateway-high-cpu) |
| Gateway Low Storage               | Warning  | Capacity     | Storage utilization > [TBD]%                        | [TBD] hours  | [3.3](#33-playbook-gateway-low-storage) |
| Gateway WAN Failover              | Warning  | Connectivity | Primary WAN link down, failover to secondary active | [TBD] min    | [3.4](#34-playbook-gateway-wan-failover) |
| Mesh Device Disconnection Spike   | High     | Mesh         | > [TBD] mesh disconnects in [TBD] min window       | [TBD] min    | [3.5](#35-playbook-mesh-device-disconnection-spike) |
| Data Delivery Delay               | High     | Data         | Delivery queue > [TBD] messages or latency > [TBD] s | [TBD] min  | [3.6](#36-playbook-data-delivery-delay) |
| Firmware Update Failed            | High     | Maintenance  | Firmware update process returned error              | [TBD] min    | [3.7](#37-playbook-firmware-update-failed) |
| Certificate Expiry Warning        | Warning  | Security     | TLS certificate expires in < [TBD] days             | [TBD] hours  | [3.8](#38-playbook-certificate-expiry-warning) |

---

## 3. Playbooks

---

### 3.1 Playbook: Gateway Offline

#### Alert Details

| Field               | Value                                          |
|---------------------|------------------------------------------------|
| **Alert Name**      | Gateway Offline                                |
| **Trigger Condition** | No heartbeat received for > [TBD] minutes    |
| **Severity**        | Critical                                       |
| **SLA Response**    | [TBD] minutes                                  |
| **SLA Resolution**  | [TBD] hours                                    |
| **Impact**          | Total loss of data from all mesh devices connected to this gateway; safety tracking unavailable for site |

#### Immediate Actions (Triage)

1. **Acknowledge the alert** in the WakeCap Dashboard or ticketing system within [TBD] minutes
2. **Check for known maintenance** -- verify no planned maintenance window is active for this gateway
3. **Check for site-wide outage** -- determine if other gateways at the same site are also offline
   - If yes: suspect site-level power or network failure; escalate to Site IT Administrator immediately
   - If no: proceed to diagnostics
4. **Notify the site safety manager** that worker tracking is unavailable for the affected area

#### Diagnostic Steps

5. **Verify WAN connectivity** from the cloud side:
   - Dashboard: **Gateways > [Target Gateway] > Network > WAN Status**
   - Check last known IP address and connection type ([TBD])
6. **Attempt remote ping** (if infrastructure permits):
   ```
   [TBD]
   ```
7. **Check cloud-side logs** for the last heartbeat and any preceding error messages:
   - Dashboard: **Gateways > [Target Gateway] > Logs** -- filter for last [TBD] hours
8. **Review power supply status** (if gateway has remote power monitoring):
   - Check power supply voltage log for dropout below [TBD] VDC
9. **Contact site personnel** to perform physical inspection:
   - Is the gateway LED lit? (Power LED should be solid [TBD])
   - Is there visible damage, loose cables, or water ingress?
   - Is the power source (mains / solar / PoE) operational?
   - Is the Ethernet cable connected and link LED active on both ends?

[IMAGE: Gateway LED status interpretation chart for offline diagnosis]

#### Resolution Steps

> **WARNING: Before performing any physical interaction with the gateway, ensure you are wearing required site PPE and have authorization to access the installation location.**

10. **If power failure detected:**
    - Restore power supply
    - Verify input voltage is within [TBD] VDC +/- [TBD]%
    - Wait [TBD] seconds for gateway to boot

11. **If network failure detected:**
    - Check and reseat Ethernet cable at both ends
    - Verify network switch port is active
    - Check SIM card seating (if cellular gateway)
    - Restart the site router/switch if applicable (coordinate with Site IT)

12. **If gateway hardware fault suspected:**
    - Perform power cycle: hold power button for [TBD] seconds, wait [TBD] seconds, power on
    - If gateway does not boot after power cycle, prepare for hardware replacement
    - Contact WakeCap L2 Support for RMA process

13. **If software fault suspected (gateway was online but stopped responding):**
    - Attempt remote reboot via dashboard: **Gateways > [Target Gateway] > Actions > Reboot**
    - If remote reboot is unavailable, perform local power cycle
    - If issue recurs after reboot, escalate to L2 Support for firmware investigation

#### Verification Steps

14. Confirm heartbeat resumes in the WakeCap Dashboard (status changes from Gray to Green)
15. Verify connected mesh device count returns to expected value ([TBD] devices) within [TBD] minutes
16. Check data delivery rate returns to normal range ([TBD] msg/min)
17. Verify no buffered data was lost -- compare data timestamps for gaps
18. Monitor for [TBD] minutes to confirm stability

#### Escalation Criteria

Escalate to the next tier if:

- Gateway does not come online within [TBD] minutes of starting this playbook
- Physical inspection reveals hardware damage
- Issue recurs within [TBD] hours of resolution
- Multiple gateways at the same site are affected

---

### 3.2 Playbook: Gateway High CPU

#### Alert Details

| Field               | Value                                          |
|---------------------|------------------------------------------------|
| **Alert Name**      | Gateway High CPU                               |
| **Trigger Condition** | CPU utilization > [TBD]% for > [TBD] minutes |
| **Severity**        | Warning                                        |
| **SLA Response**    | [TBD] minutes                                  |
| **SLA Resolution**  | [TBD] hours                                    |
| **Impact**          | Potential data processing delays, mesh communication degradation, increased latency |

#### Immediate Actions (Triage)

1. **Acknowledge the alert** within [TBD] minutes
2. **Check current CPU value** in the dashboard: **Gateways > [Target Gateway] > Metrics > CPU**
3. **Determine if the condition is transient or sustained:**
   - View the CPU trend graph for the last [TBD] hours
   - If a brief spike that has already resolved: monitor for [TBD] minutes and close if stable
   - If sustained above [TBD]%: proceed to diagnostics

#### Diagnostic Steps

4. **Identify the top resource-consuming processes:**
   - Via CLI (if accessible):
     ```
     [TBD]
     ```
   - Via Dashboard: **Gateways > [Target Gateway] > Diagnostics > Process List**

5. **Check for correlated events:**
   - Was a firmware update recently initiated?
   - Did the mesh device count spike (mass reconnection event)?
   - Is the data buffer queue unusually large?
   - Were any configuration changes recently applied?

6. **Check mesh radio activity:**
   - Dashboard: **Gateways > [Target Gateway] > Mesh > Activity**
   - Look for abnormal device join/leave churn

7. **Review application logs for errors:**
   - Dashboard: **Gateways > [Target Gateway] > Logs > Application**
   - Filter for Error and Critical entries in the last [TBD] hours

#### Resolution Steps

8. **If caused by data buffer backlog:**
   - Check WAN connectivity -- resolve any network issues first (see Playbook 3.4)
   - The CPU should normalize as the buffer drains
   - Monitor buffer queue depth trending downward

9. **If caused by mesh device churn:**
   - Identify the source of mass reconnections (e.g., interference, mesh anchor failure)
   - Address the root cause (see Playbook 3.5 if applicable)
   - CPU should normalize once mesh stabilizes

10. **If caused by a runaway process:**
    - Via CLI: `[TBD]` to restart the specific service
    - Via Dashboard: **Gateways > [Target Gateway] > Actions > Restart Service > [TBD]**

11. **If no clear cause identified and CPU remains high:**
    - Perform a gateway reboot: **Gateways > [Target Gateway] > Actions > Reboot**

    > **WARNING: Rebooting the gateway will cause temporary loss of mesh connectivity (expected downtime: [TBD] seconds). Coordinate with site management before rebooting during active shifts.**

    - Monitor CPU after reboot for [TBD] minutes

#### Verification Steps

12. Confirm CPU utilization drops below [TBD]% and remains stable for [TBD] minutes
13. Verify data delivery rate is within normal range
14. Verify mesh device count is stable
15. Confirm no related alerts remain active

#### Escalation Criteria

Escalate to the next tier if:

- CPU remains above [TBD]% after reboot
- Issue recurs within [TBD] hours
- Root cause cannot be identified from available logs
- Suspected firmware defect

---

### 3.3 Playbook: Gateway Low Storage

#### Alert Details

| Field               | Value                                          |
|---------------------|------------------------------------------------|
| **Alert Name**      | Gateway Low Storage                            |
| **Trigger Condition** | Storage utilization > [TBD]%                  |
| **Severity**        | Warning                                        |
| **SLA Response**    | [TBD] hours                                    |
| **SLA Resolution**  | [TBD] hours                                    |
| **Impact**          | Risk of data loss if buffer cannot write; potential gateway instability at [TBD]% utilization |

#### Immediate Actions (Triage)

1. **Acknowledge the alert** within [TBD] hours
2. **Check current storage utilization** in the dashboard: **Gateways > [Target Gateway] > Metrics > Storage**
3. **Assess urgency:**
   - Below [TBD]%: Warning -- investigate within SLA
   - Above [TBD]%: High -- expedite investigation
   - Above [TBD]%: Critical -- immediate action required to prevent data loss

#### Diagnostic Steps

4. **Identify storage consumers:**
   - Via CLI:
     ```
     [TBD]
     ```
   - Via Dashboard: **Gateways > [Target Gateway] > Diagnostics > Storage Breakdown**

5. **Check for abnormal log accumulation:**
   - Was Debug logging recently enabled?
   - Check log sizes: **Gateways > [Target Gateway] > Logs > Storage Usage**

6. **Check data buffer queue:**
   - Is data being delivered to the cloud or is it accumulating locally?
   - If accumulating: check WAN connectivity (see Playbook 3.4)

7. **Check for stale firmware update cache:**
   - Failed firmware updates may leave residual files consuming [TBD] MB each

#### Resolution Steps

> **WARNING: Do not delete files manually via CLI without confirming the file purpose. Deleting system files can render the gateway inoperable.**

8. **If caused by excessive logs:**
   - Reset log level to default (Info or Warning):
     - Dashboard: **Gateways > [Target Gateway] > Settings > Logging**
   - Trigger manual log rotation:
     - CLI: `[TBD]`
   - Clear old log files:
     - CLI: `[TBD]`

9. **If caused by data buffer backlog:**
   - Resolve the WAN connectivity issue (see Playbook 3.4 or 3.6)
   - Buffer will drain automatically once connectivity is restored
   - If buffer is stale (data older than [TBD] hours), consider clearing:
     - CLI: `[TBD]`

     > **WARNING: Clearing the data buffer will permanently delete any unsent telemetry data. Only perform this step if the data is no longer needed or if storage is critically full (> [TBD]%).**

10. **If caused by stale firmware cache:**
    - Clear firmware cache:
      - CLI: `[TBD]`
      - Dashboard: **Gateways > [Target Gateway] > Settings > Storage > Clear Firmware Cache**

11. **If no single cause identified:**
    - Run the storage cleanup utility:
      - CLI: `[TBD]`
    - Schedule a maintenance window for a full storage audit

#### Verification Steps

12. Confirm storage utilization drops below [TBD]%
13. Monitor storage trend for [TBD] hours to confirm it is not rapidly increasing again
14. Verify data delivery is functioning normally
15. Confirm log rotation is configured to prevent recurrence

#### Escalation Criteria

Escalate to the next tier if:

- Storage exceeds [TBD]% and cannot be reduced with the above steps
- Storage fills up again within [TBD] hours after cleanup
- Root cause of storage consumption cannot be identified

---

### 3.4 Playbook: Gateway WAN Failover

#### Alert Details

| Field               | Value                                          |
|---------------------|------------------------------------------------|
| **Alert Name**      | Gateway WAN Failover                           |
| **Trigger Condition** | Primary WAN link down; traffic failed over to secondary |
| **Severity**        | Warning                                        |
| **SLA Response**    | [TBD] minutes                                  |
| **SLA Resolution**  | [TBD] hours                                    |
| **Impact**          | Gateway remains operational on secondary link; reduced bandwidth ([TBD] Mbps vs [TBD] Mbps); potential data delivery latency increase |

#### Immediate Actions (Triage)

1. **Acknowledge the alert** within [TBD] minutes
2. **Verify gateway is operational** on the secondary link:
   - Dashboard: **Gateways > [Target Gateway] > Network > WAN Status**
   - Confirm secondary link type: [TBD] (Cellular / Ethernet / Wi-Fi)
3. **Assess data flow:**
   - Confirm data delivery is continuing, even if at reduced rate
   - Check buffer queue depth -- it should not be growing rapidly

#### Diagnostic Steps

4. **Identify the primary link failure mode:**
   - Dashboard: **Gateways > [Target Gateway] > Network > Primary WAN > Event Log**
   - Common causes:
     - Physical cable disconnection
     - Switch/router port failure
     - ISP outage
     - DHCP lease failure
     - DNS resolution failure

5. **Check if other devices on the same network segment are affected:**
   - Contact Site IT Administrator to verify site network status

6. **If primary link is cellular:**
   - Check signal strength: **Gateways > [Target Gateway] > Network > Cellular > Signal**
   - Verify SIM card status (active, not expired, data plan not exhausted)
   - Check for reported carrier outages in the area

7. **If primary link is Ethernet:**
   - Verify link LED on the gateway Ethernet port
   - Check the upstream switch port status
   - Verify cable integrity

#### Resolution Steps

8. **If physical cable issue:**
   - Reseat or replace the Ethernet cable
   - Verify link LED comes active on both ends

9. **If switch/router issue:**
   - Restart the upstream switch port (coordinate with Site IT)
   - If switch is unresponsive, escalate to Site IT for hardware replacement

10. **If ISP outage:**
    - Confirm with the ISP and obtain estimated time to resolution
    - No local action possible -- gateway continues on secondary link
    - Monitor secondary link capacity to ensure it can sustain the load

11. **If DHCP/DNS issue:**
    - Via CLI: `[TBD]` to release and renew DHCP lease
    - Via CLI: `[TBD]` to test DNS resolution
    - If DNS fails, check DNS server configuration: `[TBD]`

12. **If cellular signal issue:**
    - Check antenna connection
    - Verify SIM card is properly seated
    - If signal is weak (< [TBD] dBm), consider antenna repositioning or external antenna

> **WARNING: If relocating or adjusting the cellular antenna, ensure the gateway is powered off and you are following site safety protocols for working at height (if applicable).**

#### Verification Steps

13. Confirm primary WAN link is restored:
    - Dashboard: **Gateways > [Target Gateway] > Network > Primary WAN** shows "Connected"
14. Verify traffic has failed back to primary link (automatic failback should occur within [TBD] minutes)
15. Confirm data delivery rate returns to normal ([TBD] msg/min)
16. Verify buffer queue depth returns to normal (< [TBD] messages)
17. Monitor for [TBD] hours to confirm primary link stability

#### Escalation Criteria

Escalate to the next tier if:

- Primary link does not recover within [TBD] hours
- Secondary link also shows signs of degradation
- Failback to primary link does not occur automatically
- Data delivery is impacted despite failover

---

### 3.5 Playbook: Mesh Device Disconnection Spike

#### Alert Details

| Field               | Value                                          |
|---------------------|------------------------------------------------|
| **Alert Name**      | Mesh Device Disconnection Spike                |
| **Trigger Condition** | > [TBD] mesh devices disconnected within [TBD] min window |
| **Severity**        | High                                           |
| **SLA Response**    | [TBD] minutes                                  |
| **SLA Resolution**  | [TBD] hours                                    |
| **Impact**          | Partial or total loss of worker tracking data; safety monitoring gaps for affected devices |

#### Immediate Actions (Triage)

1. **Acknowledge the alert** within [TBD] minutes
2. **Assess the scope:**
   - Dashboard: **Gateways > [Target Gateway] > Mesh > Connected Devices**
   - Note the current count vs. expected count
   - Determine if it is a total disconnection (all devices) or partial (subset)
3. **If total disconnection: treat as potential gateway issue** -- cross-reference with Gateway Offline alert (Playbook 3.1)
4. **Notify site safety manager** if disconnected devices represent active workers in hazardous areas

#### Diagnostic Steps

5. **Identify which devices disconnected:**
   - Dashboard: **Gateways > [Target Gateway] > Mesh > Device List** -- sort by "Last Seen"
   - Determine if disconnected devices are clustered in a specific zone or distributed

6. **Check gateway mesh radio status:**
   - Dashboard: **Gateways > [Target Gateway] > Mesh > Radio Status**
   - Verify radio is active and transmitting
   - Check mesh radio LED on the gateway (should be [TBD])

7. **Check for mesh anchor failures:**
   - Dashboard: **Infrastructure > Mesh Anchors** -- filter by site
   - If a mesh anchor is offline, devices in its coverage area will disconnect

8. **Check for RF interference:**
   - Review mesh radio channel utilization: **Gateways > [Target Gateway] > Mesh > RF Environment**
   - Look for unusual interference patterns or competing signals

9. **Check environmental factors:**
   - Recent construction changes (new metal structures, walls) that could block RF
   - Weather conditions affecting signal propagation ([TBD])
   - Nearby equipment startup that may cause electromagnetic interference

[IMAGE: Mesh network topology diagram showing gateway, anchors, and device zones]

#### Resolution Steps

10. **If mesh radio is down:**
    - Restart mesh radio service:
      - CLI: `[TBD]`
      - Dashboard: **Gateways > [Target Gateway] > Actions > Restart Service > Mesh Radio**
    - Wait [TBD] minutes for devices to re-associate

11. **If mesh anchor failure:**
    - Attempt to reboot the mesh anchor remotely (if supported)
    - If remote reboot fails, dispatch field engineer for physical inspection
    - Replace the mesh anchor if hardware fault confirmed

12. **If RF interference detected:**
    - Change the mesh radio channel:
      - Dashboard: **Gateways > [Target Gateway] > Mesh > Settings > Channel**
      - Select a channel with lower interference
    - Wait [TBD] minutes for devices to re-associate on the new channel

    > **WARNING: Changing the mesh radio channel will cause a temporary disconnection of all currently connected devices (expected reconnection time: [TBD] minutes). Coordinate with site management.**

13. **If environmental/structural cause:**
    - Deploy additional mesh anchors to provide alternative signal paths
    - Reposition existing mesh anchors to improve coverage
    - Consult WakeCap L2 Support for site RF survey if needed

#### Verification Steps

14. Confirm mesh device count returns to expected value ([TBD] devices) within [TBD] minutes
15. Verify no further disconnection spikes for [TBD] hours
16. Check signal strength distribution -- average RSSI should be above [TBD] dBm
17. Confirm data from reconnected devices is flowing (check data delivery rate)

#### Escalation Criteria

Escalate to the next tier if:

- Devices do not reconnect within [TBD] minutes
- Disconnection spikes recur more than [TBD] times in [TBD] hours
- Root cause cannot be identified
- Suspected gateway mesh radio hardware fault

---

### 3.6 Playbook: Data Delivery Delay

#### Alert Details

| Field               | Value                                          |
|---------------------|------------------------------------------------|
| **Alert Name**      | Data Delivery Delay                            |
| **Trigger Condition** | Data delivery queue > [TBD] messages or end-to-end latency > [TBD] seconds |
| **Severity**        | High                                           |
| **SLA Response**    | [TBD] minutes                                  |
| **SLA Resolution**  | [TBD] hours                                    |
| **Impact**          | Delayed visibility of worker location and safety data on the WakeCap Dashboard; potential SLA breach |

#### Immediate Actions (Triage)

1. **Acknowledge the alert** within [TBD] minutes
2. **Check current queue depth and latency:**
   - Dashboard: **Gateways > [Target Gateway] > Data Pipeline > Queue Status**
   - Note the current queue depth: [TBD] messages
   - Note the oldest message age in the queue: [TBD] minutes
3. **Determine if the queue is growing, stable, or draining:**
   - Growing: active delivery failure -- proceed urgently
   - Stable: partial delivery -- reduced throughput
   - Draining: transient issue resolving itself -- monitor

#### Diagnostic Steps

4. **Check WAN connectivity:**
   - Dashboard: **Gateways > [Target Gateway] > Network > WAN Status**
   - If WAN is down: follow Playbook 3.4 (WAN Failover)

5. **Check cloud endpoint reachability:**
   - Dashboard: **Gateways > [Target Gateway] > Data Pipeline > Cloud Endpoint Status**
   - Check for HTTP error codes:
     - 4xx: authentication or configuration issue
     - 5xx: cloud-side issue -- check WakeCap Cloud status page at [TBD]

6. **Check for TLS/certificate errors** in the data pipeline log:
   - Dashboard: **Gateways > [Target Gateway] > Logs > Data Pipeline**
   - If certificate errors: see Playbook 3.8

7. **Check bandwidth utilization:**
   - If bandwidth is saturated, data delivery will be throttled
   - Dashboard: **Gateways > [Target Gateway] > Network > Bandwidth**
   - Compare current utilization against available uplink capacity ([TBD] Mbps)

8. **Check gateway CPU and memory:**
   - If CPU is high, data pipeline processing may be throttled (see Playbook 3.2)

#### Resolution Steps

9. **If WAN issue:** Follow Playbook 3.4

10. **If cloud endpoint returning errors:**
    - 401/403 (authentication failure):
      - Verify API credentials: **Gateways > [Target Gateway] > Settings > Cloud Connection**
      - Re-authenticate if credentials have expired or been rotated
    - 5xx (server error):
      - Check WakeCap Cloud status page at [TBD]
      - If cloud outage confirmed: no local action; gateway will buffer data and deliver when cloud recovers
      - Monitor storage utilization to ensure buffer does not fill (see Playbook 3.3)

11. **If bandwidth saturation:**
    - Check for non-essential traffic consuming bandwidth
    - If on secondary (failover) link with reduced bandwidth: prioritize restoring primary link (Playbook 3.4)
    - Consider reducing data upload frequency temporarily:
      - Dashboard: **Gateways > [Target Gateway] > Settings > Data Pipeline > Upload Interval**
      - Change from [TBD] seconds to [TBD] seconds

    > **WARNING: Increasing the upload interval reduces the real-time accuracy of worker tracking data. Only use this as a temporary measure and revert after bandwidth is restored.**

12. **If no clear cause:**
    - Restart the data pipeline service:
      - CLI: `[TBD]`
      - Dashboard: **Gateways > [Target Gateway] > Actions > Restart Service > Data Pipeline**
    - Monitor queue drain rate after restart

#### Verification Steps

13. Confirm queue depth is decreasing and returns to < [TBD] messages within [TBD] minutes
14. Confirm end-to-end latency returns to < [TBD] seconds
15. Verify data timestamps on the dashboard show no gaps
16. Monitor for [TBD] hours to confirm sustained normal delivery

#### Escalation Criteria

Escalate to the next tier if:

- Queue continues to grow after [TBD] minutes of troubleshooting
- Cloud endpoint errors persist after credential refresh
- Suspected cloud platform issue not reflected on the status page
- Data loss confirmed (buffered data exceeded storage capacity)

---

### 3.7 Playbook: Firmware Update Failed

#### Alert Details

| Field               | Value                                          |
|---------------------|------------------------------------------------|
| **Alert Name**      | Firmware Update Failed                         |
| **Trigger Condition** | Firmware update process returned an error code |
| **Severity**        | High                                           |
| **SLA Response**    | [TBD] minutes                                  |
| **SLA Resolution**  | [TBD] hours                                    |
| **Impact**          | Gateway remains on previous firmware version; may miss security patches or feature updates |

#### Immediate Actions (Triage)

1. **Acknowledge the alert** within [TBD] minutes
2. **Verify the gateway is still operational** on the previous firmware:
   - Dashboard: **Gateways > [Target Gateway] > Info** -- confirm firmware version
   - If the gateway is offline after a failed update: follow Playbook 3.1 (Gateway Offline)
3. **Record the error code:**
   - Dashboard: **Gateways > [Target Gateway] > Firmware Management > Update History**
   - Note the error code and timestamp

#### Diagnostic Steps

4. **Identify the failure stage:**

   | Error Code | Stage                | Meaning                                | Common Cause               |
   |------------|----------------------|----------------------------------------|----------------------------|
   | [TBD]      | Download             | Failed to download firmware image       | Network issue              |
   | [TBD]      | Verification         | Checksum mismatch                       | Corrupted download         |
   | [TBD]      | Installation         | Write to flash failed                   | Storage issue              |
   | [TBD]      | Post-install boot    | Failed to boot new firmware             | Firmware incompatibility   |
   | [TBD]      | Rollback             | Automatic rollback was triggered        | Critical error on new FW   |

5. **Check available storage:**
   - Firmware update requires [TBD] MB free space
   - If storage is low: follow Playbook 3.3 first, then retry

6. **Check network stability during the update:**
   - Review network logs for connectivity drops during the update window
   - Dashboard: **Gateways > [Target Gateway] > Network > Event Log**

7. **Check firmware compatibility:**
   - Verify the firmware image is compatible with the gateway hardware revision
   - See Release Notes (WC-GW-RN-v1.0) Section 5 for compatibility matrix

#### Resolution Steps

> **WARNING: Do not attempt more than [TBD] consecutive firmware update retries. Repeated flash writes can degrade storage media. If the update fails [TBD] times, escalate to L2 Support.**

8. **If download failure (network issue):**
   - Verify WAN connectivity
   - Retry the OTA update: **Gateways > [Target Gateway] > Firmware Management > Retry**
   - If OTA retry fails, attempt manual update via USB (see Release Notes Section 6.3)

9. **If checksum mismatch:**
   - Clear firmware cache: **Gateways > [Target Gateway] > Settings > Storage > Clear Firmware Cache**
   - Re-download and retry the update
   - If checksum fails again, re-download the firmware image from the WakeCap portal and verify locally

10. **If installation failure (storage issue):**
    - Free storage space (see Playbook 3.3)
    - Retry the update

11. **If post-install boot failure or automatic rollback:**
    - The gateway should have automatically rolled back to the previous firmware
    - Verify the gateway is operational on the previous version
    - Do NOT retry the same firmware version -- escalate to L2 Support
    - Collect diagnostic logs: **Gateways > [Target Gateway] > Logs > Export** (last [TBD] hours)

12. **If hardware revision incompatibility:**
    - Do not retry -- the firmware is not compatible with this hardware revision
    - Contact WakeCap Support for a compatible firmware version

#### Verification Steps

13. If update succeeded on retry: confirm new firmware version in the dashboard
14. Verify all services are running normally (mesh, data pipeline, WAN)
15. Check that mesh devices remain connected
16. Monitor for [TBD] hours for stability on the new firmware

#### Escalation Criteria

Escalate to the next tier if:

- Update fails [TBD] or more times
- Gateway is stuck in a boot loop after update
- Automatic rollback did not occur and gateway is unresponsive
- Error code is undocumented

---

### 3.8 Playbook: Certificate Expiry Warning

#### Alert Details

| Field               | Value                                          |
|---------------------|------------------------------------------------|
| **Alert Name**      | Certificate Expiry Warning                     |
| **Trigger Condition** | TLS certificate expires in < [TBD] days       |
| **Severity**        | Warning                                        |
| **SLA Response**    | [TBD] hours                                    |
| **SLA Resolution**  | [TBD] business days (before expiry)            |
| **Impact**          | If certificate expires, gateway will be unable to establish secure connections to WakeCap Cloud; data delivery will stop |

#### Immediate Actions (Triage)

1. **Acknowledge the alert** within [TBD] hours
2. **Identify the certificate:**
   - Dashboard: **Gateways > [Target Gateway] > Security > Certificates**
   - Note:
     - Certificate type: [TBD] (device certificate, CA certificate, cloud endpoint certificate)
     - Expiry date: [TBD]
     - Days until expiry: [TBD]
3. **Assess urgency:**
   - More than [TBD] days until expiry: schedule renewal
   - Less than [TBD] days: expedite renewal
   - Less than [TBD] days: critical -- renew immediately

#### Diagnostic Steps

4. **Determine the certificate renewal method:**

   | Certificate Type        | Renewal Method                        | Responsible Party       |
   |-------------------------|---------------------------------------|-------------------------|
   | Device certificate      | Automatic via [TBD] / Manual renewal  | WakeCap Support         |
   | Cloud CA certificate    | Automatic via firmware update          | WakeCap Engineering     |
   | Custom enterprise cert  | Manual -- provided by customer IT     | Site IT Administrator   |

5. **Check if automatic renewal is configured:**
   - Dashboard: **Gateways > [Target Gateway] > Security > Auto-Renewal Status**
   - If enabled: verify the auto-renewal process is not blocked (network, permissions)
   - If disabled: manual renewal required

6. **Check for previous renewal attempts:**
   - Dashboard: **Gateways > [Target Gateway] > Security > Certificate Event Log**
   - Look for failed renewal attempts and error messages

#### Resolution Steps

> **WARNING: Certificate replacement will briefly interrupt the gateway's secure connection to the cloud (expected interruption: [TBD] seconds). Schedule during a low-activity period.**

7. **If automatic renewal is supported and configured:**
   - Trigger manual auto-renewal attempt:
     - Dashboard: **Gateways > [Target Gateway] > Security > Certificates > [Certificate] > Renew Now**
   - If renewal succeeds, proceed to verification
   - If renewal fails, check error log and proceed to manual renewal

8. **Manual certificate renewal (device certificate):**
   - Generate a Certificate Signing Request (CSR):
     - CLI: `[TBD]`
   - Submit the CSR to the WakeCap certificate authority at [TBD]
   - Receive the signed certificate
   - Install the certificate:
     - Dashboard: **Gateways > [Target Gateway] > Security > Certificates > Upload**
     - CLI: `[TBD]`

9. **Manual certificate renewal (enterprise certificate):**
   - Contact the Site IT Administrator to provide an updated certificate
   - Install the certificate using the steps in Step 8
   - Ensure the full certificate chain is included

10. **Cloud CA certificate update:**
    - This certificate is typically bundled with firmware updates
    - Check if a firmware update is available that includes the updated CA certificate
    - If no update available, contact WakeCap Support for a standalone CA certificate bundle

#### Verification Steps

11. Confirm the new certificate is installed:
    - Dashboard: **Gateways > [Target Gateway] > Security > Certificates**
    - Verify new expiry date is > [TBD] days from today
12. Confirm the gateway can establish a secure connection to the cloud:
    - Check data delivery status (should be active with no TLS errors)
13. Verify no certificate-related errors in the logs
14. Confirm the Certificate Expiry Warning alert has cleared

#### Escalation Criteria

Escalate to the next tier if:

- Certificate renewal fails after [TBD] attempts
- Certificate expires before renewal can be completed
- Unknown certificate type or renewal method
- Enterprise certificate requires coordination that cannot be completed within the SLA

---

## 4. Escalation Matrix

### 4.1 Escalation Tiers

| Tier | Role                        | Scope                                                        | Contact Method         | Response SLA      |
|------|-----------------------------|--------------------------------------------------------------|------------------------|--------------------|
| L1   | WakeCap NOC Operator        | Alert triage, runbook execution, basic troubleshooting        | Dashboard / Chat       | [TBD] minutes      |
| L2   | WakeCap Field Engineer      | Advanced diagnostics, on-site intervention, hardware swap     | Phone / Email          | [TBD] minutes      |
| L3   | WakeCap Support Engineer    | Firmware debugging, root cause analysis, platform escalation  | Ticketing System       | [TBD] hours        |
| L4   | WakeCap Engineering         | Code-level investigation, hotfix development                  | Internal Escalation    | [TBD] hours        |
| Site | Site IT Administrator       | Network infrastructure, power systems, physical access        | Phone / Email          | [TBD] minutes      |

### 4.2 Escalation Triggers

| Condition                                          | Escalate To | Notes                                    |
|----------------------------------------------------|-------------|------------------------------------------|
| Runbook steps exhausted without resolution          | L2          | Include all diagnostic data collected     |
| Hardware fault suspected or confirmed               | L2          | Request on-site dispatch                  |
| Issue requires firmware-level investigation          | L3          | Attach full log export                    |
| Site network/power infrastructure issue              | Site IT     | Provide gateway network requirements      |
| Multiple gateways affected simultaneously            | L3          | Potential platform-wide issue             |
| Safety system impact (tracking unavailable)          | L2 + Site   | Immediate notification required           |
| Issue recurs after resolution                        | L3          | Include previous incident IDs             |
| Suspected security incident                          | L3          | Do not modify system -- preserve evidence |

### 4.3 Escalation Contact Details

| Tier   | Contact                                     | Availability            |
|--------|---------------------------------------------|-------------------------|
| L1 NOC | [TBD]                                       | [TBD]                   |
| L2     | [TBD]                                       | [TBD]                   |
| L3     | [TBD]                                       | [TBD]                   |
| L4     | [TBD]                                       | [TBD]                   |
| Site IT| [TBD] (per-site contact list in Dashboard)   | [TBD]                   |

### 4.4 Escalation Communication Template

When escalating, include the following information:

```
Subject: [ESCALATION] [Alert Name] - [Site] - [Gateway ID]

Incident ID: [TBD]
Alert Name: [TBD]
Severity: [TBD]
Start Time: [TBD]
Duration: [TBD]
Affected Gateway(s): [TBD]
Impact: [TBD]

Actions Taken:
- [List all steps performed from the playbook]

Diagnostic Data:
- Current metric values: [TBD]
- Error messages observed: [TBD]
- Log export attached: Yes / No

Reason for Escalation:
- [TBD]

Requested Action:
- [TBD]
```

---

## 5. Post-Incident Review Template

Complete this template for all High and Critical severity incidents after resolution.

---

### Post-Incident Review

**Incident Information:**

| Field                    | Value     |
|--------------------------|-----------|
| Incident ID              |           |
| Alert Name               |           |
| Severity                 |           |
| Date/Time Detected       |           |
| Date/Time Resolved       |           |
| Total Duration           |           |
| Affected Gateway(s)      |           |
| Affected Site(s)         |           |
| Incident Commander       |           |
| Technical Lead           |           |

**Impact Assessment:**

| Metric                               | Value     |
|---------------------------------------|-----------|
| Downtime Duration                     |           |
| Data Loss (messages/time period)      |           |
| Mesh Devices Disconnected             |           |
| Workers Affected                      |           |
| SLA Breach (Yes/No)                   |           |
| Safety Impact (Yes/No)               |           |

**Timeline:**

| Time (UTC) | Event                                  | Actor        |
|------------|----------------------------------------|--------------|
|            | Alert triggered                        | System       |
|            | Alert acknowledged                     |              |
|            | Triage started                         |              |
|            | Root cause identified                  |              |
|            | Resolution action taken                |              |
|            | Service restored                       |              |
|            | Verification completed                 |              |
|            | Incident closed                        |              |

**Root Cause Analysis:**

- **What happened:**

- **Why it happened (5 Whys):**
  1. Why?
  2. Why?
  3. Why?
  4. Why?
  5. Why?

- **Contributing factors:**

**Resolution:**

- **Immediate fix applied:**

- **Was the runbook followed?** (Yes / No / Partially)

- **If not fully followed, why?**

**Action Items:**

| ID | Action                          | Owner  | Due Date | Status  |
|----|---------------------------------|--------|----------|---------|
| 1  |                                 |        |          | Open    |
| 2  |                                 |        |          | Open    |
| 3  |                                 |        |          | Open    |
| 4  |                                 |        |          | Open    |

**Lessons Learned:**

- **What went well:**

- **What could be improved:**

- **Runbook changes needed:**

**Approvals:**

| Role                    | Name | Signature | Date |
|-------------------------|------|-----------|------|
| Incident Commander      |      |           |      |
| Technical Lead          |      |           |      |
| Operations Manager      |      |           |      |

---

*Document ID: WC-GW-RB-v1.0 | Version: 1.0 | Date: 2026-02-09 | WakeCap Technologies*

# WakeCap Gateway -- Operations Guide

| Field            | Value                  |
|------------------|------------------------|
| **Document ID**  | WC-GW-OG-v1.0         |
| **Product**      | WakeCap Gateway        |
| **Version**      | 1.0                    |
| **Date**         | 2026-02-09             |
| **Classification** | Technical / Field    |
| **Author**       | WakeCap Engineering    |

---

## Table of Contents

1. [Operational Overview](#1-operational-overview)
2. [Monitoring via WakeCap Dashboard](#2-monitoring-via-wakecap-dashboard)
3. [Alert Configuration](#3-alert-configuration)
4. [Routine Operational Tasks](#4-routine-operational-tasks)
5. [Capacity Management](#5-capacity-management)
6. [Log Management](#6-log-management)
7. [Backup and Recovery](#7-backup-and-recovery)
8. [Incident Response Workflow](#8-incident-response-workflow)
9. [SLA and Uptime Monitoring](#9-sla-and-uptime-monitoring)
10. [Reporting](#10-reporting)

---

## 1. Operational Overview

### 1.1 Purpose

This Operations Guide provides day-to-day operational procedures for field engineers and site administrators responsible for maintaining WakeCap Gateway units in production environments. It covers monitoring, alerting, capacity management, incident response, and reporting.

### 1.2 Gateway Role in the WakeCap Architecture

The WakeCap Gateway serves as the central communication hub between field-deployed mesh devices (hardhat sensors, mesh anchors, MODBUS assets, WS Boxes) and the WakeCap Cloud platform. Each gateway:

- Aggregates data from up to [TBD] mesh-connected devices
- Maintains local data buffering of up to [TBD] GB for network outage resilience
- Forwards telemetry to the WakeCap Cloud via [TBD] (cellular / Ethernet / Wi-Fi)
- Receives firmware updates and configuration changes from the cloud
- Provides local diagnostic interfaces (LED indicators, CLI, service port)

[IMAGE: WakeCap Gateway high-level architecture diagram showing gateway, mesh devices, and cloud connectivity]

### 1.3 Operational Parameters

| Parameter                        | Value              |
|----------------------------------|--------------------|
| Operating Temperature Range      | [TBD] C to [TBD] C |
| Operating Humidity Range         | [TBD]% to [TBD]% RH (non-condensing) |
| Power Supply Voltage             | [TBD] VDC          |
| Power Consumption (typical)      | [TBD] W            |
| Power Consumption (peak)         | [TBD] W            |
| Max Mesh Devices per Gateway     | [TBD] devices      |
| Data Upload Bandwidth (min)      | [TBD] Mbps         |
| Local Storage Capacity           | [TBD] GB           |
| Expected Uptime SLA              | [TBD]%             |
| Firmware Version (current)       | [TBD]              |

### 1.4 Roles and Responsibilities

| Role                    | Responsibilities                                               |
|-------------------------|----------------------------------------------------------------|
| Site IT Administrator   | Network connectivity, firewall rules, WAN link monitoring       |
| WakeCap Field Engineer  | Physical installation, hardware maintenance, firmware upgrades  |
| WakeCap NOC Operator    | Remote monitoring, alert triage, first-line incident response   |
| WakeCap L2 Support      | Advanced diagnostics, escalation handling, root cause analysis  |
| Site Safety Manager     | Operational scheduling, maintenance window coordination         |

---

## 2. Monitoring via WakeCap Dashboard

### 2.1 Accessing the Dashboard

1. Navigate to [TBD] in a supported browser ([TBD])
2. Log in with your WakeCap credentials
3. Select the target site from the site selector dropdown
4. Navigate to **Infrastructure > Gateways**

[IMAGE: WakeCap Dashboard gateway list view with status indicators]

### 2.2 Key Metrics

The following metrics should be monitored for each gateway:

| Metric                     | Description                                     | Normal Range         | Warning Threshold    | Critical Threshold   |
|----------------------------|-------------------------------------------------|----------------------|----------------------|----------------------|
| CPU Utilization            | Gateway processor load                          | [TBD]% to [TBD]%    | > [TBD]%             | > [TBD]%             |
| Memory Utilization         | RAM usage                                       | [TBD]% to [TBD]%    | > [TBD]%             | > [TBD]%             |
| Storage Utilization        | Local flash/disk usage                          | [TBD]% to [TBD]%    | > [TBD]%             | > [TBD]%             |
| Internal Temperature       | SoC temperature                                 | [TBD] C to [TBD] C  | > [TBD] C            | > [TBD] C            |
| Uplink Latency             | Round-trip time to WakeCap Cloud                | < [TBD] ms           | > [TBD] ms           | > [TBD] ms           |
| Uplink Packet Loss         | Cloud connectivity packet loss rate             | < [TBD]%             | > [TBD]%             | > [TBD]%             |
| Connected Mesh Devices     | Count of active mesh device connections          | [TBD] to [TBD]       | < [TBD]              | < [TBD]              |
| Data Delivery Rate         | Messages successfully delivered per minute       | [TBD] msg/min        | < [TBD] msg/min      | < [TBD] msg/min      |
| Data Buffer Queue Depth    | Messages queued locally awaiting upload           | < [TBD] messages     | > [TBD] messages     | > [TBD] messages     |
| Mesh Radio Signal (avg)    | Average RSSI across connected mesh devices       | > [TBD] dBm          | < [TBD] dBm          | < [TBD] dBm          |
| Power Supply Voltage       | Input power voltage                              | [TBD] VDC +/- [TBD]% | Outside +/- [TBD]%  | Outside +/- [TBD]%  |
| Uptime                     | Time since last reboot                           | > [TBD] hours        | < [TBD] hours        | < [TBD] hours        |

### 2.3 Health Indicators

Each gateway displays a health status badge on the dashboard:

| Status    | Color  | Meaning                                                  |
|-----------|--------|----------------------------------------------------------|
| Healthy   | Green  | All metrics within normal range, no active alerts         |
| Degraded  | Yellow | One or more warning-level thresholds exceeded             |
| Critical  | Red    | One or more critical-level thresholds exceeded            |
| Offline   | Gray   | No heartbeat received for > [TBD] minutes                |
| Updating  | Blue   | Firmware update in progress                               |

[IMAGE: Gateway health status badge examples in WakeCap Dashboard]

### 2.4 Dashboard Views

#### 2.4.1 Gateway Overview

Displays all gateways for the selected site in a summary table with health status, device count, firmware version, and last heartbeat timestamp.

[IMAGE: Gateway overview dashboard panel]

#### 2.4.2 Gateway Detail

Accessed by clicking a specific gateway. Shows:

- Real-time metric graphs (CPU, memory, temperature, uplink latency)
- Connected mesh device list with individual signal strength
- Recent alert history
- Event log (last [TBD] entries)
- Configuration summary

[IMAGE: Gateway detail dashboard view with metric graphs]

#### 2.4.3 Fleet View

Aggregated view across all sites showing:

- Total gateway count by health status
- Geographic map of gateway locations
- Fleet-wide firmware version distribution
- Top alerts across all gateways

[IMAGE: Fleet-wide gateway monitoring dashboard]

### 2.5 Custom Dashboard Widgets

Operators can create custom dashboard layouts:

1. Click **Customize** on any dashboard view
2. Drag widgets from the widget library to the dashboard canvas
3. Configure widget data source and refresh interval (minimum: [TBD] seconds)
4. Click **Save Layout**

Available widget types: [TBD]

---

## 3. Alert Configuration

### 3.1 Alert Types

| Alert Name                    | Default Severity | Default Threshold          | Category       |
|-------------------------------|------------------|----------------------------|----------------|
| Gateway Offline               | Critical         | No heartbeat > [TBD] min   | Connectivity   |
| Gateway High CPU              | Warning          | CPU > [TBD]% for [TBD] min | Performance    |
| Gateway Low Storage           | Warning          | Storage > [TBD]% used      | Capacity       |
| Gateway WAN Failover          | Warning          | Primary WAN link down       | Connectivity   |
| Mesh Device Disconnection Spike | High           | > [TBD] disconnects in [TBD] min | Mesh      |
| Data Delivery Delay           | High             | Queue > [TBD] messages      | Data           |
| Firmware Update Failed        | High             | Update process returned error | Maintenance  |
| Certificate Expiry Warning    | Warning          | Certificate expires in < [TBD] days | Security |
| High Internal Temperature     | Warning          | Temperature > [TBD] C       | Environmental  |
| Power Supply Anomaly          | High             | Voltage outside [TBD] VDC +/- [TBD]% | Power  |

### 3.2 Configuring Alert Thresholds

1. Navigate to **Alerts > Gateway Alert Rules**
2. Select the alert rule to modify
3. Adjust threshold values and evaluation windows

   [IMAGE: Alert threshold configuration panel]

4. Set severity level: Info, Warning, High, or Critical
5. Click **Save Rule**

**Custom Alert Rules:**

Operators can define custom alert rules based on any monitored metric:

1. Navigate to **Alerts > Custom Rules > Create Rule**
2. Select the metric, comparison operator, and threshold value
3. Define the evaluation window (minimum: [TBD] seconds, maximum: [TBD] hours)
4. Assign severity and notification channels
5. Click **Activate Rule**

### 3.3 Notification Channels

| Channel       | Configuration Required                          | Latency        |
|---------------|--------------------------------------------------|----------------|
| Email         | Recipient address(es)                            | < [TBD] minutes |
| SMS           | Phone number(s), requires [TBD] integration      | < [TBD] seconds |
| Webhook       | Endpoint URL, authentication token                | < [TBD] seconds |
| Slack         | Workspace, channel, bot token                     | < [TBD] seconds |
| Microsoft Teams | Teams webhook URL                              | < [TBD] seconds |
| PagerDuty     | Service integration key                           | < [TBD] seconds |
| Dashboard     | Always enabled                                    | Real-time       |

#### 3.3.1 Configuring Email Notifications

1. Navigate to **Alerts > Notification Channels > Email**
2. Add recipient email addresses
3. Configure escalation delay: [TBD] minutes
4. Select alert severities to include
5. Click **Save**

#### 3.3.2 Configuring Webhook Notifications

1. Navigate to **Alerts > Notification Channels > Webhook**
2. Enter the endpoint URL
3. Configure authentication (Bearer token or Basic Auth)
4. Select payload format: [TBD]
5. Test the webhook with a sample alert
6. Click **Save**

### 3.4 Alert Suppression and Maintenance Windows

To suppress alerts during planned maintenance:

1. Navigate to **Alerts > Maintenance Windows > Create**
2. Select the gateway(s) or site(s)
3. Define the maintenance window start and end time
4. Select which alert types to suppress
5. Add a reason for the maintenance window
6. Click **Schedule**

> **WARNING: Suppressing critical alerts during non-maintenance periods can result in undetected outages. Use maintenance windows only for planned activities.**

---

## 4. Routine Operational Tasks

### 4.1 Daily Tasks

| Task                                   | Procedure                                                      | Duration     |
|----------------------------------------|----------------------------------------------------------------|--------------|
| Review gateway health dashboard        | Check fleet view for any non-green gateways                    | [TBD] min    |
| Check active alerts                    | Review and acknowledge any new alerts in the alert console      | [TBD] min    |
| Verify data delivery rates             | Confirm message delivery rates are within normal range          | [TBD] min    |
| Review overnight events                | Check event log for unexpected reboots or failovers             | [TBD] min    |

### 4.2 Weekly Tasks

| Task                                   | Procedure                                                      | Duration     |
|----------------------------------------|----------------------------------------------------------------|--------------|
| Review capacity trends                 | Check storage and device count trends for the past 7 days       | [TBD] min    |
| Verify backup integrity               | Confirm latest configuration backup was successful               | [TBD] min    |
| Review mesh device connectivity        | Check for persistently low-signal devices                       | [TBD] min    |
| Check uplink performance trends        | Review latency and packet loss 7-day graphs                     | [TBD] min    |
| Validate alert routing                 | Send a test alert to verify notification channels are functional | [TBD] min    |

### 4.3 Monthly Tasks

| Task                                   | Procedure                                                      | Duration     |
|----------------------------------------|----------------------------------------------------------------|--------------|
| Firmware currency review               | Compare deployed firmware against latest available release       | [TBD] min    |
| Certificate expiry audit               | Check all gateway TLS certificates for upcoming expiry           | [TBD] min    |
| Physical inspection (if accessible)    | Visual inspection of LED status, cable integrity, enclosure seal | [TBD] min per gateway |
| Performance baseline review            | Compare current month metrics against historical baselines       | [TBD] min    |
| Log retention review                   | Verify log rotation and archival policies are functioning        | [TBD] min    |
| SLA report generation                  | Generate and distribute monthly uptime report                    | [TBD] min    |
| Capacity planning review               | Project device count and bandwidth needs for next quarter        | [TBD] min    |

### 4.4 Physical Inspection Checklist

> **WARNING: Before performing physical inspection, ensure you are wearing appropriate PPE as required by the site safety plan. Coordinate with site safety management before accessing gateway installation locations.**

| Item                                | Expected State                     | Action if Abnormal               |
|-------------------------------------|-------------------------------------|----------------------------------|
| Power LED                           | Solid [TBD]                         | Check power supply               |
| Network LED                         | [TBD]                               | Check WAN connection              |
| Mesh Radio LED                      | [TBD]                               | Check antenna connection          |
| Enclosure seal                      | Intact, no visible damage           | Replace gasket or enclosure       |
| Cable glands                        | Tight, no moisture ingress          | Re-torque to [TBD] Nm            |
| Antenna(s)                          | Secure, no physical damage          | Replace antenna                   |
| Mounting hardware                   | Secure, no corrosion                | Re-tighten or replace             |
| Ambient temperature at location     | Within [TBD] C to [TBD] C           | Relocate or add thermal shielding |
| Ventilation (if applicable)         | Clear, no obstructions              | Clear debris                      |

[IMAGE: Gateway physical inspection points diagram with callouts]

---

## 5. Capacity Management

### 5.1 Device Count Capacity

| Parameter                          | Specification                          |
|------------------------------------|----------------------------------------|
| Max Mesh Devices per Gateway       | [TBD] devices                          |
| Recommended Operating Capacity     | [TBD]% of max ([TBD] devices)         |
| Device Count Warning Threshold     | [TBD] devices                          |
| Device Count Critical Threshold    | [TBD] devices                          |

**Scaling Actions:**

- At [TBD]% capacity: Plan additional gateway deployment
- At [TBD]% capacity: Deploy additional gateway within [TBD] days
- At 100% capacity: New devices will fail to associate; immediate gateway deployment required

### 5.2 Bandwidth Capacity

| Parameter                          | Specification                          |
|------------------------------------|----------------------------------------|
| Minimum Uplink Bandwidth           | [TBD] Mbps                            |
| Recommended Uplink Bandwidth       | [TBD] Mbps                            |
| Per-Device Bandwidth (average)     | [TBD] kbps                            |
| Per-Device Bandwidth (peak)        | [TBD] kbps                            |
| Bandwidth Overhead (management)    | [TBD] kbps                            |

**Bandwidth Calculation Formula:**

```
Required Bandwidth (kbps) = (Device Count x [TBD] kbps) + [TBD] kbps overhead
```

### 5.3 Storage Capacity

| Parameter                          | Specification                          |
|------------------------------------|----------------------------------------|
| Total Local Storage                | [TBD] GB                               |
| System Reserved                    | [TBD] GB                               |
| Available for Data Buffering       | [TBD] GB                               |
| Log Storage Allocation             | [TBD] GB                               |
| Firmware Update Cache              | [TBD] GB                               |

**Storage Consumption Rate:**

- Typical data buffering rate: [TBD] MB/hour with [TBD] devices
- Log generation rate: [TBD] MB/day under normal operations
- Maximum offline buffering duration at capacity: [TBD] hours

### 5.4 Capacity Monitoring Dashboard

Navigate to **Infrastructure > Gateways > [Target Gateway] > Capacity** to view:

- Device count trend (30-day graph)
- Bandwidth utilization trend (30-day graph)
- Storage utilization trend (30-day graph)
- Projected capacity exhaustion date (linear extrapolation)

[IMAGE: Gateway capacity management dashboard with trend graphs]

---

## 6. Log Management

### 6.1 Log Types

| Log Type              | Description                                        | Default Level | Location         |
|-----------------------|----------------------------------------------------|---------------|------------------|
| System Log            | OS-level events, boot, shutdown, errors             | Info          | [TBD]            |
| Application Log       | Gateway application events and errors               | Info          | [TBD]            |
| Mesh Radio Log        | Mesh device connections, disconnections, signal data | Warning       | [TBD]            |
| Network Log           | WAN events, failovers, DNS, connectivity            | Info          | [TBD]            |
| Security Log          | Authentication events, certificate operations       | Info          | [TBD]            |
| Data Pipeline Log     | Message queuing, delivery, cloud sync events        | Warning       | [TBD]            |
| Audit Log             | Configuration changes, user actions                 | Info          | [TBD]            |

### 6.2 Log Levels

| Level    | Numeric Value | Description                                     |
|----------|---------------|-------------------------------------------------|
| Debug    | 0             | Detailed diagnostic information                  |
| Info     | 1             | Normal operational events                        |
| Warning  | 2             | Potentially harmful conditions                   |
| Error    | 3             | Error conditions that do not halt operation      |
| Critical | 4             | Severe errors requiring immediate attention      |

**Changing Log Level:**

1. Via Dashboard: **Gateways > [Target Gateway] > Settings > Logging**
2. Via CLI: `[TBD]`

> **WARNING: Setting log level to Debug significantly increases storage consumption (up to [TBD]x normal). Only enable Debug logging for active troubleshooting and revert to Info/Warning after investigation is complete.**

### 6.3 Log Retention Policy

| Log Type              | On-Device Retention   | Cloud Retention        | Archive Retention      |
|-----------------------|-----------------------|------------------------|------------------------|
| System Log            | [TBD] days            | [TBD] days             | [TBD] days             |
| Application Log       | [TBD] days            | [TBD] days             | [TBD] days             |
| Mesh Radio Log        | [TBD] days            | [TBD] days             | [TBD] days             |
| Network Log           | [TBD] days            | [TBD] days             | [TBD] days             |
| Security Log          | [TBD] days            | [TBD] days             | [TBD] days             |
| Data Pipeline Log     | [TBD] days            | [TBD] days             | [TBD] days             |
| Audit Log             | [TBD] days            | [TBD] days             | [TBD] days             |

### 6.4 Log Export

#### 6.4.1 Dashboard Export

1. Navigate to **Gateways > [Target Gateway] > Logs**
2. Select the log type and date range
3. Apply any filters (severity, keyword)
4. Click **Export** and select the format ([TBD]: CSV, JSON, TXT)
5. Maximum export size: [TBD] MB per request

#### 6.4.2 CLI Export

```
[TBD]
```

#### 6.4.3 Automated Log Forwarding

The gateway supports forwarding logs to external systems:

| Protocol       | Configuration                                       |
|----------------|------------------------------------------------------|
| Syslog (UDP)   | Target IP, port (default: [TBD]), facility code      |
| Syslog (TCP)   | Target IP, port, TLS certificate (optional)          |
| HTTPS Webhook  | Endpoint URL, authentication token                   |
| MQTT           | Broker address, topic, QoS level                     |

Configure via **Gateways > [Target Gateway] > Settings > Log Forwarding**.

[IMAGE: Log forwarding configuration panel in WakeCap Dashboard]

---

## 7. Backup and Recovery

### 7.1 What Is Backed Up

| Item                        | Included in Backup | Backup Method         | Size (approx.)   |
|-----------------------------|--------------------|-----------------------|-------------------|
| Gateway Configuration       | Yes                | Automatic / Manual    | [TBD] KB          |
| Mesh Device Associations    | Yes                | Automatic             | [TBD] KB          |
| Alert Rules (custom)        | Yes                | Automatic             | [TBD] KB          |
| TLS Certificates            | Yes                | Automatic             | [TBD] KB          |
| Buffered Data               | No                 | N/A                   | N/A               |
| Local Logs                  | No                 | N/A                   | N/A               |
| Firmware Image              | No                 | N/A                   | N/A               |

### 7.2 Automatic Backup Schedule

| Backup Type          | Frequency        | Retention          | Storage Location     |
|----------------------|------------------|--------------------|----------------------|
| Configuration Backup | Every [TBD] hours | Last [TBD] backups | WakeCap Cloud        |
| Full System Snapshot | [TBD]            | Last [TBD] snapshots | WakeCap Cloud       |

### 7.3 Manual Backup

**Via Dashboard:**

1. Navigate to **Gateways > [Target Gateway] > Settings > Backup**
2. Click **Create Backup Now**
3. Wait for confirmation (expected duration: [TBD] seconds)
4. Optionally download the backup file to local storage

**Via CLI:**

```
[TBD]
```

### 7.4 Recovery Procedure

> **WARNING: Restoring a backup will overwrite the current gateway configuration. All changes made since the backup was taken will be lost. Ensure this is intentional before proceeding.**

**Via Dashboard:**

1. Navigate to **Gateways > [Target Gateway] > Settings > Backup**
2. Select the backup to restore from the list (sorted by date)
3. Review the backup contents summary
4. Click **Restore Backup**
5. The gateway will reboot (expected downtime: [TBD] seconds)
6. Verify gateway health after restore

**Via CLI:**

```
[TBD]
```

### 7.5 Factory Reset

> **WARNING: Factory reset erases all configuration, associations, and local data. This action is irreversible. Only perform a factory reset when directed by WakeCap support.**

1. Power off the gateway
2. Press and hold the reset button for [TBD] seconds while powering on
3. Release the button when the LED flashes [TBD]
4. The gateway will boot into factory default state (expected duration: [TBD] minutes)
5. Re-provision the gateway through the WakeCap Dashboard

[IMAGE: Gateway reset button location diagram]

---

## 8. Incident Response Workflow

### 8.1 Incident Classification

| Severity   | Definition                                                      | Response Time | Resolution Target |
|------------|-----------------------------------------------------------------|---------------|-------------------|
| Critical   | Gateway offline, total data loss, safety system impact           | [TBD] minutes | [TBD] hours       |
| High       | Significant degradation, data delivery delays, mesh instability  | [TBD] minutes | [TBD] hours       |
| Medium     | Minor degradation, single metric threshold breach                | [TBD] hours   | [TBD] hours       |
| Low        | Informational, non-impacting anomaly                             | [TBD] hours   | [TBD] business days |

### 8.2 Incident Response Process

```
Alert Triggered
      |
      v
[1. DETECT] -- Automated alert or manual observation
      |
      v
[2. TRIAGE] -- Classify severity, assign owner
      |
      v
[3. DIAGNOSE] -- Follow runbook playbook (see WC-GW-RB-v1.0)
      |
      v
[4. RESOLVE] -- Apply fix, verify resolution
      |
      v
[5. RECOVER] -- Confirm full service restoration
      |
      v
[6. REVIEW] -- Post-incident review (for High/Critical)
      |
      v
[7. CLOSE] -- Update ticket, document lessons learned
```

### 8.3 Incident Response Roles

| Role                | Responsibility                                                   |
|---------------------|------------------------------------------------------------------|
| Incident Commander  | Owns the incident, coordinates response, manages communication    |
| Technical Lead      | Performs diagnostics and resolution actions                        |
| Communications Lead | Updates stakeholders and site management                          |
| Scribe              | Documents timeline, actions taken, and outcomes                   |

### 8.4 Communication Templates

**Initial Notification:**

```
Subject: [SEVERITY] WakeCap Gateway Incident - [Site Name] - [Gateway ID]
Body:
- Incident ID: [TBD]
- Start Time: [TBD]
- Affected Gateway(s): [TBD]
- Impact: [TBD]
- Current Status: Investigating
- Next Update: [TBD]
```

**Resolution Notification:**

```
Subject: [RESOLVED] WakeCap Gateway Incident - [Site Name] - [Gateway ID]
Body:
- Incident ID: [TBD]
- Start Time: [TBD]
- Resolution Time: [TBD]
- Duration: [TBD]
- Root Cause: [TBD]
- Resolution: [TBD]
- Follow-up Actions: [TBD]
```

---

## 9. SLA and Uptime Monitoring

### 9.1 SLA Definitions

| SLA Metric                     | Target                | Measurement Window |
|--------------------------------|-----------------------|--------------------|
| Gateway Availability           | [TBD]%                | Monthly            |
| Data Delivery Latency (P95)    | < [TBD] seconds       | Monthly            |
| Data Delivery Success Rate     | [TBD]%                | Monthly            |
| Mean Time to Recovery (MTTR)   | < [TBD] hours         | Rolling 90 days    |
| Planned Downtime (max)         | [TBD] hours/month     | Monthly            |

### 9.2 SLA Calculation

**Gateway Availability Calculation:**

```
Availability (%) = ((Total Minutes - Unplanned Downtime Minutes) / Total Minutes) x 100
```

**Exclusions from downtime calculation:**

- Planned maintenance windows (pre-approved and communicated)
- Force majeure events ([TBD])
- Customer-caused outages (e.g., power disconnection by site personnel)

### 9.3 Uptime Monitoring Tools

#### 9.3.1 Heartbeat Monitoring

The gateway sends heartbeat signals to the WakeCap Cloud at intervals of [TBD] seconds. A missed heartbeat triggers the following escalation:

| Missed Heartbeats | Duration                | Action                                |
|--------------------|-------------------------|---------------------------------------|
| [TBD]              | [TBD] minutes           | Info-level event logged               |
| [TBD]              | [TBD] minutes           | Warning alert triggered               |
| [TBD]              | [TBD] minutes           | Critical alert triggered              |
| [TBD]              | [TBD] minutes           | Incident auto-created                 |

#### 9.3.2 Synthetic Monitoring

The WakeCap Cloud performs synthetic health checks against each gateway:

- **Frequency:** Every [TBD] minutes
- **Checks performed:** [TBD]
- **Timeout threshold:** [TBD] seconds

#### 9.3.3 SLA Dashboard

Navigate to **Reports > SLA Dashboard** to view:

- Current month availability for each gateway
- Rolling 90-day MTTR
- Data delivery success rate trend
- SLA breach count and details

[IMAGE: SLA monitoring dashboard with availability graphs]

---

## 10. Reporting

### 10.1 Standard Reports

| Report Name                   | Frequency     | Content                                                | Distribution      |
|-------------------------------|---------------|--------------------------------------------------------|-------------------|
| Gateway Health Summary        | Daily         | Health status, active alerts, device counts             | [TBD]             |
| Weekly Operations Summary     | Weekly        | Uptime, incident count, capacity trends                 | [TBD]             |
| Monthly SLA Report            | Monthly       | Availability, MTTR, SLA compliance                      | [TBD]             |
| Incident Summary Report       | Monthly       | Incident count by severity, resolution times, root causes | [TBD]          |
| Capacity Forecast Report      | Quarterly     | Device count projections, bandwidth forecasts            | [TBD]             |
| Firmware Compliance Report    | Monthly       | Firmware version distribution, out-of-date gateways     | [TBD]             |

### 10.2 Generating Standard Reports

1. Navigate to **Reports > Report Library**
2. Select the report type
3. Configure the date range and scope (specific gateways, sites, or fleet-wide)
4. Click **Generate Report**
5. Reports are generated in [TBD] format (PDF, CSV, Excel)
6. Download directly or schedule for automatic delivery via email

### 10.3 Scheduled Report Delivery

1. Navigate to **Reports > Scheduled Reports**
2. Click **Create Schedule**
3. Select the report type and generation frequency
4. Configure the recipient list (email addresses)
5. Set the delivery time (UTC)
6. Click **Activate Schedule**

### 10.4 Custom Reports

#### 10.4.1 Report Builder

1. Navigate to **Reports > Custom Reports > Report Builder**
2. Select data sources:
   - Gateway metrics (CPU, memory, storage, temperature)
   - Mesh device data (connection counts, signal strength)
   - Alert history
   - Incident records
   - SLA metrics
3. Choose visualization type: table, line chart, bar chart, pie chart
4. Apply filters and grouping
5. Preview the report
6. Save as a reusable template or export immediately

[IMAGE: Custom report builder interface]

#### 10.4.2 API-Based Reporting

For integration with external business intelligence tools:

| Endpoint                          | Description                                  | Authentication    |
|-----------------------------------|----------------------------------------------|-------------------|
| `GET /api/v[TBD]/gateways/metrics` | Raw gateway metric data                     | API Key / OAuth   |
| `GET /api/v[TBD]/gateways/alerts`  | Alert history                               | API Key / OAuth   |
| `GET /api/v[TBD]/reports/sla`      | SLA compliance data                         | API Key / OAuth   |
| `GET /api/v[TBD]/reports/incidents` | Incident records                           | API Key / OAuth   |

**Rate Limits:** [TBD] requests per minute per API key

**Data Export Formats:** JSON, CSV

Refer to the WakeCap API documentation at [TBD] for full endpoint specifications.

---

## Appendix A: Glossary

| Term              | Definition                                                           |
|-------------------|----------------------------------------------------------------------|
| Gateway           | WakeCap central hub connecting mesh field devices to the cloud        |
| Mesh Device       | Any device communicating via the WakeCap mesh radio network           |
| Heartbeat         | Periodic signal from gateway to cloud indicating operational status   |
| OTA               | Over-the-Air -- remote firmware or configuration update method        |
| MTTR              | Mean Time to Recovery -- average time to restore service after failure |
| SLA               | Service Level Agreement -- contracted service availability target     |
| NOC               | Network Operations Center                                             |
| WAN               | Wide Area Network -- gateway's upstream internet connectivity         |
| RSSI              | Received Signal Strength Indicator (measured in dBm)                  |

## Appendix B: Related Documents

| Document ID       | Title                              | Version |
|-------------------|------------------------------------|---------|
| WC-GW-RN-v1.0    | WakeCap Gateway Release Notes      | 1.0     |
| WC-GW-RB-v1.0    | WakeCap Gateway Runbook            | 1.0     |
| [TBD]             | WakeCap Gateway Installation Guide | [TBD]   |
| [TBD]             | WakeCap Gateway Hardware Manual    | [TBD]   |
| [TBD]             | WakeCap API Reference              | [TBD]   |

---

*Document ID: WC-GW-OG-v1.0 | Version: 1.0 | Date: 2026-02-09 | WakeCap Technologies*

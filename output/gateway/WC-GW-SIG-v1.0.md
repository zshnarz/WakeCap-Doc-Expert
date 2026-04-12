# WakeCap Gateway

## System Integration Guide

---

| Field | Value |
|-------|-------|
| **Document ID** | WC-GW-SIG-v1.0 |
| **Version** | 1.0 |
| **Date** | 2026-02-09 |
| **Product** | WakeCap Gateway |
| **Product Code** | GW |
| **Document Type** | System Integration Guide (SIG) |
| **Classification** | Technical / Field |
| **HW Compatibility** | [TBD] |
| **FW Compatibility** | [TBD] |
| **Author** | [TBD] |
| **Approved By** | [TBD] |

---

## Revision History

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | 2026-02-09 | [TBD] | Initial release |

---

## Table of Contents

1. [Integration Overview](#1-integration-overview)
2. [Reference Architecture Diagrams](#2-reference-architecture-diagrams)
3. [Network Design](#3-network-design)
4. [Gateway Placement and Coverage Planning](#4-gateway-placement-and-coverage-planning)
5. [Device Provisioning Workflow](#5-device-provisioning-workflow)
6. [Cloud Integration](#6-cloud-integration)
7. [Third-Party System Integration](#7-third-party-system-integration)
8. [Security Architecture](#8-security-architecture)
9. [Scalability Considerations](#9-scalability-considerations)
10. [Integration Testing Checklist](#10-integration-testing-checklist)
11. [Related Documents](#11-related-documents)

---

## 1. Integration Overview

### 1.1 Purpose

This System Integration Guide provides reference architectures, network design guidance, and integration procedures for deploying WakeCap Gateway infrastructure across sites of varying scale. It is the primary resource for systems integrators, IT network engineers, and project engineers responsible for planning and executing WakeCap deployments.

### 1.2 Scope

This document covers:

- Reference architectures for small, medium, and large site deployments
- Network topology design for mesh, LAN, and WAN segments
- Gateway placement and RF coverage planning
- Device provisioning and onboarding workflows
- Cloud platform API integration and data export
- Integration with third-party systems (SCADA, BMS, ERP)
- Security architecture and certificate management
- Scalability planning and capacity limits

### 1.3 System Context

The WakeCap system consists of four primary layers:

| Layer | Components | Function |
|-------|-----------|----------|
| **Field Layer** | Weather Stations, Smart Hats, Anchors, MODBUS Assets | Sensor data acquisition and worker safety monitoring |
| **Edge Layer** | WakeCap Gateway(s) | Mesh aggregation, store-and-forward, WAN uplink |
| **Transport Layer** | Cellular (4G LTE), Ethernet, Internet | Data transport to cloud |
| **Cloud Layer** | WakeCap Cloud Platform | Data storage, analytics, dashboards, API |

[IMAGE: Four-layer system context diagram showing field devices, Gateway edge layer, transport networks, and WakeCap Cloud Platform with data flow arrows]

### 1.4 Integration Roles

| Role | Responsibilities |
|------|-----------------|
| WakeCap Project Engineer | Solution design, Gateway count/placement, commissioning oversight |
| Site IT / Network Engineer | LAN/WAN provisioning, firewall rules, IP addressing |
| Systems Integrator | Third-party system connectivity, API integration, data mapping |
| Site Operations | Day-to-day monitoring, alert response, maintenance coordination |
| WakeCap Cloud Operations | Platform availability, API versioning, certificate issuance |

---

## 2. Reference Architecture Diagrams

### 2.1 Small Site (1-50 Field Devices)

**Profile:**

| Parameter | Value |
|-----------|-------|
| Site area | < [TBD] m2 |
| Number of field devices | 1 to 50 |
| Number of Gateways | 1 |
| Backhaul | Cellular (primary) |
| Redundancy | None (single Gateway) |
| Anchors (mesh relay) | 0 to [TBD] |

[IMAGE: Small site reference architecture — single Gateway with cellular backhaul, direct star connections to field devices, single antenna, cloud uplink via 4G LTE]

**Architecture notes:**

- A single Gateway provides coverage for up to [TBD] devices within a [TBD] m line-of-sight radius
- Cellular backhaul is preferred for small sites where Ethernet infrastructure is unavailable
- No mesh relay (Anchor) is required if all devices are within direct radio range of the Gateway
- Store-and-forward buffering handles temporary cellular outages up to [TBD] hours
- Power supply: site mains via DC adapter or solar panel with battery ([TBD] V DC, [TBD] W minimum)

**Typical deployment:**

```
                    [WakeCap Cloud]
                         |
                    [4G LTE WAN]
                         |
                   [WakeCap Gateway]
                    /    |    \
            [WS-01] [WS-02] ... [HAT-50]
```

### 2.2 Medium Site (50-200 Field Devices)

**Profile:**

| Parameter | Value |
|-----------|-------|
| Site area | [TBD] m2 to [TBD] m2 |
| Number of field devices | 50 to 200 |
| Number of Gateways | [TBD] to [TBD] |
| Backhaul | Ethernet (primary), Cellular (failover) |
| Redundancy | Gateway N+1 recommended |
| Anchors (mesh relay) | [TBD] to [TBD] |

[IMAGE: Medium site reference architecture — multiple Gateways connected to site LAN switch, Anchors extending mesh coverage to building interiors and far zones, Ethernet backhaul with cellular failover per Gateway]

**Architecture notes:**

- Multiple Gateways divide the site into coverage zones, each supporting up to [TBD] devices
- Anchors extend mesh coverage into areas without direct Gateway line-of-sight (e.g., inside buildings, below grade)
- Ethernet backhaul provides higher bandwidth and lower latency than cellular
- Cellular failover on each Gateway provides WAN redundancy
- An N+1 Gateway strategy means one spare Gateway covers the zone of any single failed unit
- All Gateways connect to a common site LAN switch with uplink to the Internet

**Typical deployment:**

```
                         [WakeCap Cloud]
                              |
                         [Internet]
                              |
                        [Site Router]
                              |
                  [Site LAN Switch (managed)]
                   /          |          \
           [Gateway-A]  [Gateway-B]  [Gateway-C]
            /   |   \      /  |  \      /  |  \
        [Devices] [Anchor] [Devices] [Anchor] [Devices]
                     |                   |
                 [Far-zone          [Far-zone
                  devices]           devices]
```

### 2.3 Large Site (200+ Field Devices)

**Profile:**

| Parameter | Value |
|-----------|-------|
| Site area | > [TBD] m2 |
| Number of field devices | 200 to [TBD] |
| Number of Gateways | [TBD] to [TBD] |
| Backhaul | Ethernet (primary), Cellular (failover), fiber backbone (optional) |
| Redundancy | Gateway N+1, WAN dual-path, power redundancy |
| Anchors (mesh relay) | [TBD] to [TBD] |

[IMAGE: Large site reference architecture — multiple Gateway clusters across site zones, fiber backbone interconnecting zone switches, dual-WAN (Ethernet + cellular) per Gateway, centralized network management, redundant Internet uplinks]

**Architecture notes:**

- The site is divided into zones, each with a dedicated Gateway cluster and LAN switch
- A fiber backbone or managed Ethernet infrastructure connects zone switches to the site core router
- Each Gateway has dual-WAN capability (Ethernet primary, cellular failover)
- N+1 redundancy per zone ensures continuity if a Gateway fails
- Anchors create a multi-hop mesh to cover large areas, obstructed zones, and vertical structures
- Centralized network monitoring (SNMP or [TBD]) provides visibility into all Gateway and switch health
- Power redundancy (UPS or dual-feed) is recommended for Gateway power supplies in critical zones
- Cloud integration may use a site-level aggregation server or direct Gateway-to-cloud connectivity

**Typical deployment:**

```
                              [WakeCap Cloud]
                                    |
                           [Dual Internet Uplinks]
                                    |
                             [Core Router / FW]
                                    |
                          [Fiber / Managed Backbone]
                        /           |            \
               [Zone A Switch] [Zone B Switch] [Zone C Switch]
                /       \        /       \        /       \
          [GW-A1] [GW-A2] [GW-B1] [GW-B2] [GW-C1] [GW-C2]
            |        |       |        |       |        |
         [Mesh    [Mesh   [Mesh    [Mesh   [Mesh    [Mesh
          zone]    zone]   zone]    zone]   zone]    zone]
```

### 2.4 Architecture Comparison Summary

| Parameter | Small | Medium | Large |
|-----------|-------|--------|-------|
| Gateways | 1 | [TBD]-[TBD] | [TBD]-[TBD] |
| Devices | 1-50 | 50-200 | 200-[TBD] |
| Anchors | 0-[TBD] | [TBD]-[TBD] | [TBD]-[TBD] |
| Primary backhaul | Cellular | Ethernet | Ethernet + fiber |
| Failover backhaul | None | Cellular | Cellular |
| Gateway redundancy | None | N+1 | N+1 per zone |
| Power redundancy | None | Recommended | Required |
| Network monitoring | Cloud dashboard | Cloud + site IT | Cloud + SNMP + site IT |
| Typical deployment time | [TBD] hours | [TBD] days | [TBD] days |

---

## 3. Network Design

### 3.1 Mesh Network Topology

#### 3.1.1 Mesh Overview

The WakeCap mesh network uses a proprietary protocol (WMP) operating on the [TBD] MHz ISM band. The Gateway acts as the mesh coordinator (root node). Anchors serve as relay nodes to extend coverage.

| Parameter | Value | Unit |
|-----------|-------|------|
| Frequency band | [TBD] | MHz |
| Channel width | [TBD] | kHz |
| Number of channels | [TBD] | — |
| Data rate (over-air) | [TBD] | kbps |
| Max devices per Gateway | [TBD] | — |
| Max mesh hops | [TBD] | hops |
| Range (line-of-sight) | [TBD] | m |
| Range (non-line-of-sight) | [TBD] | m |
| Range per Anchor hop | [TBD] | m |

#### 3.1.2 Topology Types

| Topology | Description | When to Use |
|----------|-------------|-------------|
| Star | All devices communicate directly with Gateway | Small sites, open areas, all devices within radio range |
| Star-of-stars | Devices communicate via Anchors to Gateway | Medium sites, obstructed areas, buildings |
| Multi-hop mesh | Devices relay through multiple Anchors | Large sites, complex terrain, vertical coverage |

[IMAGE: Comparison of star, star-of-stars, and multi-hop mesh topologies with Gateway, Anchors, and end devices]

#### 3.1.3 Channel Planning

| Scenario | Recommendation |
|----------|---------------|
| Single Gateway site | Use default channel [TBD] |
| Multi-Gateway site (non-overlapping coverage) | All Gateways may use the same channel |
| Multi-Gateway site (overlapping coverage) | Assign different channels to adjacent Gateways to avoid interference |
| Co-located with other ISM band equipment | Perform RF site survey; select channel with lowest noise floor |

### 3.2 WAN Design

#### 3.2.1 Ethernet WAN

| Parameter | Requirement |
|-----------|-------------|
| Speed | 10/100 Mbps (auto-negotiation) |
| Duplex | Full duplex preferred |
| Cable | Cat5e or better, shielded recommended for outdoor runs |
| Max cable length | 100 m (per IEEE 802.3) |
| IP addressing | DHCP (default) or static IP |
| DNS | Required for cloud endpoint resolution |
| VLAN | Recommended: isolate WakeCap traffic on dedicated VLAN |

#### 3.2.2 Cellular WAN

| Parameter | Requirement |
|-----------|-------------|
| Technology | 4G LTE Cat [TBD] |
| SIM card | Active data SIM with APN configured |
| Signal strength (minimum) | > [TBD] dBm RSSI |
| Signal strength (recommended) | > [TBD] dBm RSSI |
| Data plan | Minimum [TBD] MB/month per Gateway (typical usage: [TBD] MB/month) |
| Public or private APN | [TBD] |

#### 3.2.3 Bandwidth Requirements

| Traffic Type | Direction | Rate per Gateway | Notes |
|-------------|-----------|-----------------|-------|
| Telemetry (per device) | Upload | [TBD] bytes every [TBD] s | Scales with device count |
| Status heartbeat | Upload | [TBD] bytes every [TBD] s | Fixed per Gateway |
| Events | Upload | [TBD] bytes per event | Variable, bursty |
| Configuration updates | Download | [TBD] KB per update | Infrequent |
| Firmware OTA | Download | [TBD] MB per update | Infrequent, scheduled |
| **Total (50 devices, default interval)** | **Upload** | **[TBD] KB/min** | **[TBD] MB/day** |
| **Total (200 devices, default interval)** | **Upload** | **[TBD] KB/min** | **[TBD] MB/day** |

### 3.3 Firewall Rules

> **NOTICE**
>
> Provide this table to the site IT / network security team before deployment. All rules must be in place before Gateway commissioning.

#### 3.3.1 Outbound Rules (Gateway to Internet)

| # | Source | Destination | Protocol | Port | Direction | Purpose | Required |
|---|--------|-------------|----------|------|-----------|---------|----------|
| 1 | Gateway IP / VLAN | [TBD] (MQTT broker) | TCP | [TBD] | Outbound | MQTT over TLS (telemetry, commands) | Yes |
| 2 | Gateway IP / VLAN | [TBD] (NTP server) | UDP | 123 | Outbound | Time synchronization | Yes |
| 3 | Gateway IP / VLAN | [TBD] (DNS server) | UDP/TCP | 53 | Outbound | DNS resolution | Yes |
| 4 | Gateway IP / VLAN | [TBD] (OTA server) | TCP | [TBD] | Outbound | Firmware downloads | Yes |
| 5 | Gateway IP / VLAN | [TBD] (certificate endpoint) | TCP | [TBD] | Outbound | Certificate renewal / OCSP | Recommended |
| 6 | Gateway IP / VLAN | [TBD] (diagnostics) | TCP | [TBD] | Outbound | Remote diagnostics (if enabled) | Optional |

#### 3.3.2 Inbound Rules (Internet to Gateway)

| # | Source | Destination | Protocol | Port | Direction | Purpose | Required |
|---|--------|-------------|----------|------|-----------|---------|----------|
| — | — | — | — | — | — | No inbound connections required by default | — |

> **NOTICE**
>
> The Gateway initiates all connections outbound. No inbound ports need to be opened on the site firewall under normal operation. If remote diagnostic access is required, use the WakeCap Cloud reverse tunnel or VPN; do not expose Gateway ports directly to the Internet.

#### 3.3.3 Internal Network Rules

| # | Source | Destination | Protocol | Port | Direction | Purpose |
|---|--------|-------------|----------|------|-----------|---------|
| 1 | Gateway | DHCP server | UDP | 67/68 | Bidirectional | IP address assignment (if DHCP) |
| 2 | Gateway | DNS server (internal) | UDP/TCP | 53 | Outbound | Internal DNS resolution |
| 3 | Management station | Gateway | TCP | [TBD] | Inbound (LAN) | Local management (if enabled) |

### 3.4 Network Segmentation Recommendations

| Recommendation | Description |
|---------------|-------------|
| Dedicated VLAN | Place all Gateways on a dedicated VLAN (e.g., VLAN [TBD]) to isolate IoT traffic from corporate LAN |
| Firewall between VLANs | Apply strict rules between the Gateway VLAN and corporate/OT VLANs |
| No direct Internet routing for other VLANs | Gateway VLAN routes only to required cloud endpoints, not to general Internet |
| Network monitoring | Enable port mirroring or flow export on Gateway VLAN switch ports for security monitoring |

---

## 4. Gateway Placement and Coverage Planning

### 4.1 RF Coverage Fundamentals

| Parameter | Open Area | Light Obstruction | Heavy Obstruction | Unit |
|-----------|-----------|-------------------|-------------------|------|
| Gateway direct range | [TBD] | [TBD] | [TBD] | m |
| Anchor-extended range (per hop) | [TBD] | [TBD] | [TBD] | m |
| Maximum mesh hops | [TBD] | [TBD] | [TBD] | hops |
| Recommended overlap between zones | [TBD] | [TBD] | [TBD] | % |

### 4.2 Placement Guidelines

| Guideline | Specification |
|-----------|---------------|
| Mounting height | [TBD] m to [TBD] m above ground level |
| Antenna orientation | Vertical (omnidirectional pattern) |
| Clearance (obstructions) | Minimum [TBD] m clear radius around antenna |
| Separation from metal structures | Minimum [TBD] m from large metal surfaces |
| Co-location with other RF equipment | Minimum [TBD] m separation from other ISM-band transmitters |
| Line-of-sight to devices | Preferred; each obstruction reduces effective range by [TBD] % |
| Indoor vs. outdoor | Outdoor mounting preferred; indoor mounting reduces range by [TBD] % |

### 4.3 Coverage Planning Procedure

**Step 1 — Obtain site plan.**

Obtain a scaled site plan (PDF, CAD, or satellite image) showing buildings, structures, terrain, and planned device locations.

**Step 2 — Mark device locations.**

Plot all planned field device positions on the site plan. Note each device type and whether it is stationary or mobile.

**Step 3 — Identify obstructions.**

Classify areas as open, light obstruction (wood, drywall, vegetation), or heavy obstruction (concrete, steel, earth).

**Step 4 — Draft Gateway positions.**

Place Gateways to cover device clusters, respecting the range values in Section 4.1. Ensure overlap between adjacent Gateway coverage zones.

**Step 5 — Add Anchors.**

Place Anchors to extend coverage into obstructed areas. Each Anchor adds one mesh hop.

**Step 6 — Validate with RF survey (recommended).**

For medium and large sites, perform an RF site survey at the planned Gateway and Anchor locations to measure actual signal strength and noise floor.

| Survey Measurement | Acceptable | Marginal | Unacceptable | Unit |
|-------------------|-----------|----------|-------------|------|
| RSSI at device location | > [TBD] | [TBD] to [TBD] | < [TBD] | dBm |
| Noise floor | < [TBD] | [TBD] to [TBD] | > [TBD] | dBm |
| Signal-to-noise ratio | > [TBD] | [TBD] to [TBD] | < [TBD] | dB |

**Step 7 — Finalize and document.**

Finalize Gateway and Anchor positions. Document on the site plan with serial numbers, mounting heights, and channel assignments.

[IMAGE: Example site coverage plan showing Gateway positions, Anchor positions, coverage circles, overlap zones, and device locations on a construction site layout]

### 4.4 Coverage Calculation Worksheet

| Zone | Gateway | Mounting Height (m) | Terrain | Devices in Zone | Range Required (m) | Anchors Needed | Channel |
|------|---------|--------------------|---------|-----------------|--------------------|----------------|---------|
| A | GW-[serial] | | | | | | |
| B | GW-[serial] | | | | | | |
| C | GW-[serial] | | | | | | |
| D | GW-[serial] | | | | | | |

---

## 5. Device Provisioning Workflow

### 5.1 Provisioning Overview

Device provisioning is the process of registering field devices with the WakeCap Cloud Platform and associating them with a specific Gateway and site. Provisioning ensures that each device is authenticated, authorized, and correctly mapped in the system.

### 5.2 Provisioning Methods

| Method | Description | When to Use |
|--------|-------------|-------------|
| Cloud pre-provisioning | Devices registered in WakeCap Cloud before deployment | Preferred for planned deployments |
| Auto-provisioning | Devices automatically registered on first mesh association | Suitable for small sites with trusted environments |
| Mobile app provisioning | Devices scanned and registered via WakeCap Verify app | Field provisioning, device replacement |

### 5.3 Cloud Pre-Provisioning Workflow

**Step 1 — Create site in WakeCap Cloud.**

| Action | Detail |
|--------|--------|
| Navigate to | Sites > Add New Site |
| Enter | Site name, location (GPS coordinates), time zone |
| Define | Zones matching the coverage plan (Section 4) |

**Step 2 — Register Gateways.**

| Action | Detail |
|--------|--------|
| Navigate to | Devices > Gateways > Add Gateway |
| Enter | Gateway serial number (from label), site, zone |
| Configure | Backhaul type (Ethernet/cellular), mesh channel, TX power |
| Save | Gateway appears as "Pending" until it connects |

**Step 3 — Register field devices.**

| Action | Detail |
|--------|--------|
| Navigate to | Devices > Add Device |
| Enter | Device serial number, device type (WS/HAT/ANCHOR/MODBUS), assigned zone |
| Configure | Reporting interval, alert thresholds (if applicable) |
| Save | Device appears as "Pending" until it associates with a Gateway |

**Step 4 — Deploy and power on.**

| Action | Detail |
|--------|--------|
| Install Gateway | Per WC-GW-IG-v1.0 |
| Commission Gateway | Per WC-GW-CG-v1.0 |
| Deploy field devices | Install at planned locations, power on |
| Verify | Devices transition from "Pending" to "Online" in Cloud dashboard |

[IMAGE: Provisioning workflow diagram showing Cloud pre-registration, Gateway deployment, device deployment, and online verification steps]

### 5.4 Auto-Provisioning Workflow

| Step | Action | System Response |
|------|--------|----------------|
| 1 | Enable auto-provisioning in Cloud: Sites > Settings > Auto-provision: ON | Gateway accepts unregistered devices |
| 2 | Deploy and power on field device | Device sends association request to Gateway |
| 3 | Gateway forwards device ID and type to Cloud | Cloud creates device record automatically |
| 4 | Cloud assigns device to site and default zone | Device status: Online |
| 5 | Administrator reviews auto-provisioned devices | Assign correct zone, configure alerts |

> **NOTICE**
>
> Auto-provisioning should be disabled on sites where unauthorized device access is a concern. Any device within mesh radio range can associate if auto-provisioning is enabled.

### 5.5 Device Replacement Workflow

| Step | Action |
|------|--------|
| 1 | In WakeCap Cloud, mark the failed device as "Decommissioned" |
| 2 | Record the replacement device serial number |
| 3 | Register the replacement device in Cloud with the same zone and configuration as the original |
| 4 | Install the replacement device at the same physical location |
| 5 | Power on and verify the replacement device appears "Online" in Cloud |
| 6 | Verify data continuity on the Cloud dashboard |

### 5.6 Provisioning Data Requirements

| Data Item | Source | Required |
|-----------|--------|----------|
| Gateway serial number | Device label | Yes |
| Gateway MAC address | Device label / CLI | Yes |
| Field device serial number | Device label | Yes |
| Site name and GPS coordinates | Site plan | Yes |
| Zone assignment | Coverage plan | Yes |
| Mesh channel | Coverage plan | Yes |
| Backhaul configuration (IP/APN) | IT team | Yes |
| Alert thresholds | Project requirements | Optional |
| Reporting interval | Project requirements | Optional |

---

## 6. Cloud Integration

### 6.1 WakeCap Cloud Platform Overview

The WakeCap Cloud Platform provides:

- Real-time device monitoring and dashboards
- Historical data storage and retrieval
- Alert management and notification routing
- Device management (provisioning, configuration, OTA updates)
- REST API for programmatic access
- Webhook integration for event-driven workflows
- Data export (CSV, JSON, [TBD])

### 6.2 REST API

#### 6.2.1 API Base URL

| Environment | Base URL |
|-------------|---------|
| Production | `https://[TBD]/api/v[TBD]` |
| Staging | `https://[TBD]/api/v[TBD]` |

#### 6.2.2 Authentication

| Parameter | Value |
|-----------|-------|
| Method | [TBD] (API key / OAuth 2.0 / JWT) |
| Header | `Authorization: Bearer [token]` |
| Token lifetime | [TBD] hours |
| Rate limit | [TBD] requests per minute |

#### 6.2.3 Key API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/sites` | List all sites |
| GET | `/sites/{site_id}/gateways` | List Gateways for a site |
| GET | `/gateways/{gw_serial}/status` | Get Gateway current status |
| GET | `/gateways/{gw_serial}/devices` | List devices associated with Gateway |
| GET | `/devices/{dev_id}/telemetry` | Get device telemetry (paginated) |
| GET | `/devices/{dev_id}/telemetry?from={iso8601}&to={iso8601}` | Get telemetry in time range |
| GET | `/alerts` | List active alerts |
| POST | `/alerts/acknowledge` | Acknowledge an alert |
| GET | `/devices/{dev_id}/events` | Get device event history |
| POST | `/gateways/{gw_serial}/commands` | Send command to Gateway |
| GET | `/export/telemetry?site={site_id}&from={}&to={}` | Export telemetry data |

#### 6.2.4 API Response Format

All API responses use JSON format.

**Success response:**

```json
{
  "status": "ok",
  "data": { ... },
  "pagination": {
    "page": 1,
    "page_size": 100,
    "total": 1234
  }
}
```

**Error response:**

```json
{
  "status": "error",
  "error": {
    "code": "[TBD]",
    "message": "Human-readable error description"
  }
}
```

#### 6.2.5 API Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| AUTH_001 | 401 | Invalid or expired token |
| AUTH_002 | 403 | Insufficient permissions |
| RATE_001 | 429 | Rate limit exceeded |
| NOT_FOUND | 404 | Resource not found |
| VALIDATION | 400 | Invalid request parameters |
| SERVER | 500 | Internal server error |

### 6.3 Webhooks

#### 6.3.1 Webhook Configuration

| Parameter | Value |
|-----------|-------|
| Configure via | WakeCap Cloud > Settings > Webhooks |
| Delivery method | HTTPS POST to customer-provided URL |
| Content type | `application/json` |
| Authentication | [TBD] (HMAC signature / shared secret header) |
| Retry policy | [TBD] retries with [TBD] s backoff |
| Timeout | [TBD] s (customer endpoint must respond within this time) |

#### 6.3.2 Webhook Event Types

| Event | Trigger | Payload Summary |
|-------|---------|-----------------|
| `gateway.online` | Gateway connects to cloud | `{ gw_serial, timestamp }` |
| `gateway.offline` | Gateway disconnects from cloud | `{ gw_serial, timestamp, last_seen }` |
| `device.online` | Device associates with Gateway | `{ dev_id, dev_type, gw_serial, timestamp }` |
| `device.offline` | Device disassociates or times out | `{ dev_id, dev_type, gw_serial, timestamp }` |
| `alert.triggered` | Alert threshold breached | `{ alert_id, alert_type, dev_id, value, threshold, timestamp }` |
| `alert.resolved` | Alert condition cleared | `{ alert_id, alert_type, dev_id, timestamp }` |
| `telemetry.batch` | Batch telemetry available (configurable interval) | `{ site_id, device_count, record_count, timestamp }` |

#### 6.3.3 Webhook Security

| Security Measure | Description |
|-----------------|-------------|
| HTTPS required | Webhook URL must use HTTPS with a valid TLS certificate |
| Signature verification | Each webhook request includes an `X-WakeCap-Signature` header containing an HMAC-[TBD] signature of the payload using the shared secret |
| IP whitelist | WakeCap webhook origin IPs: [TBD] |
| Timestamp verification | Verify the `timestamp` field is within [TBD] s of current time to prevent replay attacks |

### 6.4 Data Export

| Export Method | Format | Trigger | Description |
|---------------|--------|---------|-------------|
| Manual export (dashboard) | CSV, JSON | On-demand | Download telemetry/event data from the Cloud dashboard |
| Scheduled export | CSV, JSON, [TBD] | Cron-style schedule | Automatic export to [TBD] (email / SFTP / S3 / Azure Blob) |
| API export | JSON | On-demand | Programmatic data retrieval via REST API (Section 6.2) |
| Streaming (MQTT) | JSON | Real-time | Subscribe to MQTT topics for real-time data feed (requires [TBD] plan) |

---

## 7. Third-Party System Integration

### 7.1 Integration Overview

The WakeCap platform supports integration with third-party systems through multiple mechanisms:

| Integration Path | Protocol | Direction | Latency | Use Case |
|-----------------|----------|-----------|---------|----------|
| REST API | HTTPS | Pull (polling) | Seconds to minutes | Dashboard integration, reporting |
| Webhooks | HTTPS | Push (event-driven) | Near real-time | Alert routing, workflow automation |
| MQTT bridge | MQTT/TLS | Push (streaming) | Real-time | SCADA, real-time displays |
| File export | SFTP / S3 / [TBD] | Push (batch) | Minutes to hours | Data warehousing, ERP |
| OPC UA adapter | OPC UA | Push/Pull | [TBD] | Industrial control systems |

### 7.2 SCADA Integration

#### 7.2.1 Architecture

[IMAGE: SCADA integration architecture showing WakeCap Cloud connected to a SCADA gateway/adapter via MQTT bridge or OPC UA, with data flowing to the SCADA master station and HMI]

| Component | Description |
|-----------|-------------|
| WakeCap Cloud | Source of telemetry, events, and alerts |
| MQTT Bridge / OPC UA Adapter | Middleware component that translates WakeCap data to SCADA protocol |
| SCADA Master Station | Receives and displays WakeCap data alongside other process data |
| HMI | Operator visualization |

#### 7.2.2 Data Mapping (SCADA)

| WakeCap Data | SCADA Tag (example) | Data Type | Unit | Update Rate |
|-------------|---------------------|-----------|------|-------------|
| Weather Station - Air Temperature | `WCAP.WS001.TEMP_AIR` | FLOAT32 | C | [TBD] s |
| Weather Station - Wind Speed | `WCAP.WS001.WIND_SPD` | FLOAT32 | m/s | [TBD] s |
| Weather Station - Humidity | `WCAP.WS001.HUMIDITY` | FLOAT32 | % RH | [TBD] s |
| Gateway - Status | `WCAP.GW001.STATUS` | INT16 | — | [TBD] s |
| Gateway - Device Count | `WCAP.GW001.DEV_COUNT` | INT16 | — | [TBD] s |
| Alert - Active | `WCAP.ALERTS.ACTIVE` | BOOL | — | Event-driven |

#### 7.2.3 SCADA Integration Checklist

- [ ] SCADA tag database created with WakeCap data mapping
- [ ] MQTT bridge or OPC UA adapter deployed and configured
- [ ] Network connectivity verified between adapter and WakeCap Cloud
- [ ] Network connectivity verified between adapter and SCADA master
- [ ] Data point mapping validated (values, units, scaling)
- [ ] Alert mapping configured (SCADA alarm priorities match WakeCap severity)
- [ ] Historical data archiving configured
- [ ] Failover behavior tested (what happens when WakeCap data is unavailable)

### 7.3 BMS Integration

#### 7.3.1 Architecture

[IMAGE: BMS integration architecture showing WakeCap Cloud providing weather and environmental data to a BMS via REST API or webhooks, BMS using data for HVAC optimization and safety interlocks]

| Integration Method | Description |
|-------------------|-------------|
| REST API polling | BMS polls WakeCap API at configurable intervals for latest telemetry |
| Webhook push | WakeCap pushes alerts and threshold events to BMS endpoint |
| BACnet adapter (if required) | Middleware translates WakeCap API data to BACnet objects |

#### 7.3.2 BMS Data Points

| WakeCap Data | BMS Object (example) | BACnet Type | Unit | Notes |
|-------------|---------------------|-------------|------|-------|
| Air Temperature | AV:WCAP_TEMP | Analog Value | C | Outdoor conditions |
| Wind Speed | AV:WCAP_WIND | Analog Value | m/s | Crane safety interlock |
| Humidity | AV:WCAP_RH | Analog Value | % RH | HVAC optimization |
| Rain Rate | AV:WCAP_RAIN | Analog Value | mm/h | Site drainage management |
| Wind Alert | BV:WCAP_WIND_ALERT | Binary Value | — | High-wind safety alarm |

### 7.4 Integration Data Flow Security

| Control | Description |
|---------|-------------|
| API authentication | All API calls require authentication token (Section 6.2.2) |
| Webhook signature | All webhooks include HMAC signature for payload verification |
| TLS encryption | All integration paths use TLS [TBD]+ encryption |
| IP restrictions | API and webhook sources can be restricted by IP whitelist |
| Data minimization | API responses include only requested fields; use query parameters to limit scope |
| Audit logging | All API access is logged with timestamp, client ID, and endpoint |

---

## 8. Security Architecture

### 8.1 Security Overview

The WakeCap security architecture provides defense-in-depth across all system layers.

[IMAGE: Security architecture diagram showing encryption at each layer: mesh encryption (device-to-Gateway), TLS (Gateway-to-Cloud), API authentication (Cloud-to-integrator), with certificate management and key storage highlighted]

### 8.2 Mesh Network Security

| Security Control | Description |
|-----------------|-------------|
| Encryption | [TBD] (AES-128 / AES-256 / [TBD]) |
| Authentication | [TBD] (pre-shared key / device certificate / [TBD]) |
| Key provisioning | [TBD] (factory-provisioned / cloud-provisioned / [TBD]) |
| Key rotation | [TBD] (frequency and mechanism) |
| Replay protection | Sequence number and timestamp validation |
| Device allow-list | Gateway accepts only pre-registered device IDs (when auto-provisioning is disabled) |

### 8.3 WAN Transport Security (TLS)

| Parameter | Value |
|-----------|-------|
| TLS version (minimum) | [TBD] (TLS 1.2 / TLS 1.3) |
| Cipher suites | [TBD] |
| Server certificate validation | Yes (WakeCap Cloud certificate verified against trusted CA) |
| Client certificate (mutual TLS) | [TBD] (Yes / No) |
| Certificate Authority | [TBD] (WakeCap private CA / public CA) |
| Certificate format | [TBD] (X.509 v3) |
| Key length (RSA) | [TBD] bits |
| Key length (ECC) | [TBD] bits |
| Certificate lifetime | [TBD] months |
| OCSP / CRL checking | [TBD] |

### 8.4 Certificate Management

#### 8.4.1 Certificate Lifecycle

| Phase | Description | Responsibility |
|-------|-------------|---------------|
| Issuance | Device certificate generated and installed during manufacturing or provisioning | WakeCap / manufacturing partner |
| Storage | Certificate and private key stored in [TBD] (secure element / encrypted flash / TPM) on Gateway | Gateway hardware |
| Renewal | Certificate renewed via [TBD] (OTA / EST protocol / manual) before expiry | WakeCap Cloud / Gateway firmware |
| Revocation | Compromised certificates revoked via [TBD] (CRL / OCSP) | WakeCap Cloud Operations |
| Expiry handling | Gateway logs warning [TBD] days before certificate expiry; blocks connection if expired | Gateway firmware |

#### 8.4.2 Certificate Pinning

| Parameter | Value |
|-----------|-------|
| Pinning enabled | [TBD] (Yes / No) |
| Pinned entity | [TBD] (root CA / intermediate CA / leaf certificate) |
| Pin update mechanism | [TBD] (OTA firmware update / [TBD]) |

### 8.5 Authentication and Authorization

| Layer | Authentication Method | Authorization |
|-------|----------------------|---------------|
| Mesh (device to Gateway) | [TBD] (PSK / certificate) | Device allow-list per Gateway |
| MQTT (Gateway to Cloud) | [TBD] (username/password / client certificate / token) | Per-Gateway topic ACL |
| REST API (integrator to Cloud) | [TBD] (API key / OAuth 2.0 / JWT) | Role-based access control (RBAC) |
| USB CLI (local) | [TBD] (password) | Full local access (physical security assumed) |
| Cloud Dashboard (user) | [TBD] (email/password + MFA) | RBAC per site/zone |

### 8.6 Data Protection

| Control | Description |
|---------|-------------|
| Data in transit | Encrypted via TLS (WAN) and [TBD] (mesh) |
| Data at rest (Gateway buffer) | [TBD] (encrypted / unencrypted) |
| Data at rest (Cloud) | [TBD] (encryption method and key management) |
| Data retention | [TBD] days (configurable per site) |
| Data deletion | [TBD] (automatic after retention period / manual / on request) |
| PII handling | [TBD] (Gateway does not process PII by default; Smart Hat data may include worker ID) |

### 8.7 Security Hardening Checklist

- [ ] Gateway firmware is at latest version
- [ ] Default credentials changed (USB CLI password)
- [ ] Auto-provisioning disabled (unless explicitly required)
- [ ] Mesh encryption enabled with strong key
- [ ] TLS 1.2 or higher enforced
- [ ] Firewall rules restrict Gateway to required endpoints only
- [ ] Gateway VLAN isolated from corporate network
- [ ] API keys rotated on schedule ([TBD] days)
- [ ] Cloud user accounts have MFA enabled
- [ ] Webhook shared secrets configured and verified
- [ ] Certificate expiry monitoring enabled
- [ ] Security audit log review scheduled ([TBD] frequency)

---

## 9. Scalability Considerations

### 9.1 Capacity Limits

| Parameter | Per Gateway | Per Site | Per Cloud Tenant | Unit |
|-----------|-------------|----------|------------------|------|
| Max field devices | [TBD] | [TBD] | [TBD] | devices |
| Max Gateways | N/A | [TBD] | [TBD] | Gateways |
| Max Anchors | [TBD] | [TBD] | [TBD] | Anchors |
| Max mesh hops | [TBD] | N/A | N/A | hops |
| Max telemetry messages (upload) | [TBD] | [TBD] | [TBD] | msg/min |
| Max data buffer (offline) | [TBD] | N/A | N/A | hours |
| Max API calls | N/A | N/A | [TBD] | requests/min |
| Max webhook deliveries | N/A | N/A | [TBD] | events/min |

### 9.2 Scaling Strategies

| Scaling Need | Strategy | Notes |
|-------------|----------|-------|
| More devices in same area | Add Gateways, divide into zones | Each Gateway handles up to [TBD] devices |
| Larger site area | Add Gateways and Anchors per coverage plan | Use multi-hop mesh to extend range |
| Higher data resolution | Decrease reporting interval | Increases bandwidth; verify capacity (Section 3.2.3) |
| More sites | Replicate architecture per site | Each site independent; Cloud aggregates all |
| Higher API throughput | Contact WakeCap for enterprise rate limits | [TBD] |
| Historical data volume | Configure retention policy; use export for long-term archival | [TBD] |

### 9.3 Performance Considerations

| Consideration | Impact | Mitigation |
|---------------|--------|------------|
| Device count approaching Gateway limit | Increased latency, potential message loss | Add Gateway, redistribute devices |
| Mesh hop count > [TBD] | Increased latency, reduced reliability | Reposition Gateway or add Anchor closer to devices |
| Cellular bandwidth saturation | Delayed telemetry upload | Switch to Ethernet; reduce reporting interval; compress payloads |
| Cloud API rate limit exceeded | HTTP 429 responses, data gaps in integration | Implement exponential backoff; request rate limit increase |
| Store-and-forward buffer > [TBD] % | Risk of data loss if buffer fills before reconnection | Investigate and resolve WAN issue; increase upload priority |

### 9.4 Growth Planning Worksheet

| Current State | Value | Planned Growth (12 months) | Value | Action Required |
|---------------|-------|---------------------------|-------|-----------------|
| Field devices | | | | |
| Gateways | | | | |
| Anchors | | | | |
| Data volume (MB/day) | | | | |
| API integrations | | | | |
| Sites | | | | |

---

## 10. Integration Testing Checklist

### 10.1 Pre-Integration Testing

| # | Test | Method | Expected Result | Pass | Fail | N/A |
|---|------|--------|----------------|------|------|-----|
| 1 | Verify Gateway firmware version matches integration spec | USB CLI: `firmware version` | Version [TBD] or later | [ ] | [ ] | [ ] |
| 2 | Verify Cloud platform API version | `GET /api/version` | Version [TBD] or later | [ ] | [ ] | [ ] |
| 3 | Verify network connectivity: Gateway to Cloud | Gateway LED solid green | Cloud status: Online | [ ] | [ ] | [ ] |
| 4 | Verify firewall rules in place | Attempt outbound connections per Section 3.3 | All required ports open | [ ] | [ ] | [ ] |
| 5 | Verify DNS resolution from Gateway VLAN | `nslookup [TBD]` from VLAN host | Resolves correctly | [ ] | [ ] | [ ] |
| 6 | Verify NTP synchronization | Gateway clock vs. NTP reference | Within [TBD] s | [ ] | [ ] | [ ] |

### 10.2 Mesh Network Testing

| # | Test | Method | Expected Result | Pass | Fail | N/A |
|---|------|--------|----------------|------|------|-----|
| 1 | Device association (near range) | Power on device at [TBD] m | Associates < [TBD] s, RSSI > [TBD] dBm | [ ] | [ ] | [ ] |
| 2 | Device association (far range) | Power on device at [TBD] m | Associates < [TBD] s, RSSI > [TBD] dBm | [ ] | [ ] | [ ] |
| 3 | Multi-hop via Anchor | Power on device beyond direct range | Associates via Anchor, hops = [TBD] | [ ] | [ ] | [ ] |
| 4 | Device count at capacity | Associate [TBD] devices simultaneously | All devices online, no errors | [ ] | [ ] | [ ] |
| 5 | Mesh channel interference | Operate alongside other ISM equipment | No degradation > [TBD] % message loss | [ ] | [ ] | [ ] |

### 10.3 Cloud Connectivity Testing

| # | Test | Method | Expected Result | Pass | Fail | N/A |
|---|------|--------|----------------|------|------|-----|
| 1 | Telemetry end-to-end | Trigger known reading, verify in Cloud | Value matches within [TBD] s | [ ] | [ ] | [ ] |
| 2 | Status heartbeat | Monitor Cloud dashboard | Heartbeat every [TBD] s +/- [TBD] s | [ ] | [ ] | [ ] |
| 3 | Event delivery | Trigger device offline event | Event visible in Cloud < [TBD] s | [ ] | [ ] | [ ] |
| 4 | Command delivery | Send config update from Cloud | Gateway applies within [TBD] s | [ ] | [ ] | [ ] |
| 5 | WAN failover (Ethernet to cellular) | Disconnect Ethernet cable | Gateway reconnects via cellular < [TBD] s | [ ] | [ ] | [ ] |
| 6 | WAN failback (cellular to Ethernet) | Reconnect Ethernet cable | Gateway reverts to Ethernet < [TBD] s | [ ] | [ ] | [ ] |
| 7 | Store-and-forward | Disconnect WAN for [TBD] min, reconnect | All buffered data delivered, 0% loss | [ ] | [ ] | [ ] |

### 10.4 API Integration Testing

| # | Test | Method | Expected Result | Pass | Fail | N/A |
|---|------|--------|----------------|------|------|-----|
| 1 | Authentication | `GET /sites` with valid token | HTTP 200, site list returned | [ ] | [ ] | [ ] |
| 2 | Authentication failure | `GET /sites` with invalid token | HTTP 401, error response | [ ] | [ ] | [ ] |
| 3 | Telemetry retrieval | `GET /devices/{id}/telemetry?from=...&to=...` | Correct data in time range | [ ] | [ ] | [ ] |
| 4 | Gateway status | `GET /gateways/{serial}/status` | Current status JSON | [ ] | [ ] | [ ] |
| 5 | Command send | `POST /gateways/{serial}/commands` | HTTP 202, command accepted | [ ] | [ ] | [ ] |
| 6 | Rate limiting | Exceed [TBD] requests/min | HTTP 429 with retry-after header | [ ] | [ ] | [ ] |
| 7 | Pagination | `GET /devices/{id}/telemetry?page=2&page_size=10` | Correct page of results | [ ] | [ ] | [ ] |

### 10.5 Webhook Testing

| # | Test | Method | Expected Result | Pass | Fail | N/A |
|---|------|--------|----------------|------|------|-----|
| 1 | Webhook delivery | Trigger gateway.online event | HTTPS POST received at endpoint | [ ] | [ ] | [ ] |
| 2 | Signature verification | Validate X-WakeCap-Signature header | Signature matches computed HMAC | [ ] | [ ] | [ ] |
| 3 | Retry on failure | Return HTTP 500 from endpoint | Webhook retried [TBD] times | [ ] | [ ] | [ ] |
| 4 | Alert webhook | Trigger threshold alert | Alert payload received with correct data | [ ] | [ ] | [ ] |

### 10.6 Third-Party Integration Testing

| # | Test | Method | Expected Result | Pass | Fail | N/A |
|---|------|--------|----------------|------|------|-----|
| 1 | SCADA data point mapping | Verify mapped tags in SCADA | All tags updating with correct values and units | [ ] | [ ] | [ ] |
| 2 | SCADA alarm routing | Trigger WakeCap alert | Corresponding SCADA alarm raised | [ ] | [ ] | [ ] |
| 3 | BMS data feed | Verify BMS receives weather data | Temperature, wind, humidity values correct | [ ] | [ ] | [ ] |
| 4 | Data export (SFTP) | Trigger scheduled export | File received at SFTP server with correct data | [ ] | [ ] | [ ] |
| 5 | Integration failover | Disconnect integration middleware | SCADA/BMS shows stale data indicator, no crash | [ ] | [ ] | [ ] |

### 10.7 Security Testing

| # | Test | Method | Expected Result | Pass | Fail | N/A |
|---|------|--------|----------------|------|------|-----|
| 1 | TLS version enforcement | Attempt connection with TLS 1.0/1.1 | Connection rejected | [ ] | [ ] | [ ] |
| 2 | Certificate validation | Present invalid certificate to Gateway | Connection rejected | [ ] | [ ] | [ ] |
| 3 | Mesh device allow-list | Attempt association with unregistered device (auto-prov off) | Association rejected | [ ] | [ ] | [ ] |
| 4 | USB CLI lockout | Enter wrong password [TBD] times | Account locked for [TBD] s | [ ] | [ ] | [ ] |
| 5 | API access control | Attempt cross-site data access | HTTP 403, access denied | [ ] | [ ] | [ ] |

### 10.8 Integration Test Sign-Off

| Field | Value |
|-------|-------|
| Site Name | |
| Integration Engineer | |
| Date | |
| Total Tests Passed | / |
| Total Tests Failed | |
| Total Tests N/A | |
| Non-conformances | |
| Approved for Production | [ ] Yes [ ] No |
| Signature | |

---

## 11. Related Documents

| Document ID | Title | Version | Relationship |
|-------------|-------|---------|-------------|
| WC-GW-DS-v1.0 | WakeCap Gateway Product Datasheet | 1.0 | Reference: specifications summary |
| WC-GW-PM-v1.0 | WakeCap Gateway Product Manual | 1.0 | Reference: full product documentation |
| WC-GW-IG-v1.0 | WakeCap Gateway Installation Guide | 1.0 | Prerequisite: physical installation |
| WC-GW-CG-v1.0 | WakeCap Gateway Commissioning Guide | 1.0 | Prerequisite: system commissioning |
| WC-GW-ICD-v1.0 | WakeCap Gateway Interface Control Document | 1.0 | Reference: detailed interface specifications |
| WC-GW-SM-v1.0 | WakeCap Gateway Safety Manual | 1.0 | Reference: safety requirements |
| WC-GW-TG-v1.0 | WakeCap Gateway Troubleshooting Guide | 1.0 | Reference: fault diagnosis |
| WC-GW-QR-v1.0 | WakeCap Gateway Quick Reference | 1.0 | Reference: field quick-reference |

---

*End of Document WC-GW-SIG-v1.0*

---

**WakeCap Technologies**
[TBD - Address]
[TBD - Website]
Support: [TBD - Email] | [TBD - Phone]

(c) 2026 WakeCap Technologies. All rights reserved.

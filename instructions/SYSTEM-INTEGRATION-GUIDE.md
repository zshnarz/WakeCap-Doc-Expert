# System Integration Guide Template Instructions

This document defines the structure and content requirements for WakeCap System Integration Guides.

---

## Purpose

System Integration Guides provide reference architectures, network design guidance, and integration patterns for deploying WakeCap products within larger site infrastructure. They help solution architects and integration engineers design correct, scalable, and reliable deployments.

---

## Target Audience

- Solution architects
- Systems integration engineers
- Network engineers
- IT infrastructure teams
- Project engineers planning large-scale deployments

---

## Document Characteristics

| Attribute | Specification |
|-----------|---------------|
| Typical Length | 15-30 pages |
| Orientation | Portrait (A4 or Letter) |
| Primary Content | Architecture diagrams, network topologies, sizing tables |
| Layout | Architecture-driven; diagram-first sections |
| Hero Content | Reference architectures, network design, capacity planning |
| Image Ratio | 40% visual (architecture diagrams), 60% text |

---

## Document Structure

### Cover Page

```
┌──────────────────────────────────────────────────┐
│  [WakeCap Logo - top left, 20mm]                 │
│                                                  │
│  ─────────────────────────────────────────────── │
│                                                  │
│  SYSTEM INTEGRATION GUIDE               ← H2     │
│                                                  │
│  [Product Name / Solution Name]         ← H1     │
│  Reference Architectures & Network Design        │
│                                                  │
│  Document: [DOC-ID]                              │
│  Revision: [VERSION]                             │
│  Date: [DATE]                                    │
│                                                  │
│  ─────────────────────────────────────────────── │
│  CONFIDENTIAL - INTERNAL USE ONLY                │
└──────────────────────────────────────────────────┘
```

---

### Required Sections

#### 1. Integration Overview

```
1. INTEGRATION OVERVIEW

1.1 Purpose
This guide provides reference architectures and integration
guidance for deploying [Product/Solution Name] within
construction and oil & gas site infrastructure.

1.2 System Components

| Component | Role | Quantity (Typical) |
|-----------|------|-------------------|
| [Component 1] | [Role] | [TBD] |
| [Component 2] | [Role] | [TBD] |
| [Component 3] | [Role] | [TBD] |
| [Platform] | [Role] | 1 |

1.3 Integration Touchpoints

| Touchpoint | Protocol | Direction | Section |
|------------|----------|-----------|---------|
| [System A ↔ System B] | [TBD] | [TBD] | §X |
| [System B ↔ Platform] | [TBD] | [TBD] | §X |
| [Platform ↔ Customer System] | [TBD] | [TBD] | §X |

1.4 Prerequisites

• [Prerequisite 1 - e.g., network infrastructure]
• [Prerequisite 2 - e.g., API credentials]
• [Prerequisite 3 - e.g., site survey complete]
```

#### 2. Reference Architectures

```
2. REFERENCE ARCHITECTURES

2.1 Small Site Architecture (< [X] devices)

[IMAGE: Small site reference architecture diagram]

| Parameter | Value |
|-----------|-------|
| Coverage area | [TBD] |
| Device count | [TBD] |
| Gateways | [TBD] |
| Network type | [TBD] |
| Backhaul | [TBD] |

2.2 Medium Site Architecture ([X]-[Y] devices)

[IMAGE: Medium site reference architecture diagram]

| Parameter | Value |
|-----------|-------|
| Coverage area | [TBD] |
| Device count | [TBD] |
| Gateways | [TBD] |
| Network type | [TBD] |
| Backhaul | [TBD] |

2.3 Large Site Architecture (> [Y] devices)

[IMAGE: Large site reference architecture diagram]

| Parameter | Value |
|-----------|-------|
| Coverage area | [TBD] |
| Device count | [TBD] |
| Gateways | [TBD] |
| Network type | [TBD] |
| Backhaul | [TBD] |
| Redundancy | [TBD] |
```

#### 3. Network Design

```
3. NETWORK DESIGN

3.1 Network Topology

[IMAGE: Network topology diagram showing all layers]

LAYERS:
• Edge layer: [Sensors, end devices]
• Mesh/relay layer: [Anchors, repeaters]
• Gateway layer: [Gateways, concentrators]
• Backhaul layer: [Cellular, Ethernet, satellite]
• Cloud layer: [Platform, API endpoints]

3.2 Mesh Network Design

| Parameter | Guideline |
|-----------|-----------|
| Max hop count | [TBD] |
| Node spacing | [TBD] m (indoor) / [TBD] m (outdoor) |
| Line of sight required | [TBD] |
| Minimum RSSI | [TBD] dBm |
| Max nodes per gateway | [TBD] |

3.3 Gateway Placement

[IMAGE: Gateway placement guidelines with coverage overlay]

PLACEMENT RULES:
• [Rule 1 - e.g., central to coverage area]
• [Rule 2 - e.g., minimum height above ground]
• [Rule 3 - e.g., avoid metal obstructions]
• [Rule 4 - e.g., maximum distance to nearest node]

3.4 Backhaul Requirements

| Backhaul Type | Bandwidth | Latency | Availability |
|---------------|-----------|---------|--------------|
| Cellular (4G/LTE) | [TBD] | [TBD] | [TBD] |
| Ethernet | [TBD] | [TBD] | [TBD] |
| Satellite | [TBD] | [TBD] | [TBD] |
| Wi-Fi | [TBD] | [TBD] | [TBD] |

3.5 Firewall and Security

| Port | Protocol | Direction | Purpose |
|------|----------|-----------|---------|
| [TBD] | [TBD] | Outbound | Data upload |
| [TBD] | [TBD] | Outbound | Firmware updates |
| [TBD] | [TBD] | Outbound | NTP time sync |
```

#### 4. Capacity Planning

```
4. CAPACITY PLANNING

4.1 Sizing Calculator

| Input Parameter | Value |
|----------------|-------|
| Total coverage area | _______ m² |
| Number of zones | _______ |
| Workers per zone (peak) | _______ |
| Update interval required | _______ seconds |

CALCULATED REQUIREMENTS:
| Component | Formula | Result |
|-----------|---------|--------|
| End devices | [TBD] | _______ |
| Anchors/relays | Area ÷ [coverage per anchor] | _______ |
| Gateways | Nodes ÷ [max per gateway] | _______ |
| Backhaul bandwidth | Devices × [data rate] | _______ kbps |

4.2 Scalability Limits

| Parameter | Limit | Notes |
|-----------|-------|-------|
| Max devices per gateway | [TBD] | [TBD] |
| Max gateways per site | [TBD] | [TBD] |
| Max mesh depth | [TBD] hops | [TBD] |
| Max data rate per device | [TBD] | [TBD] |
```

#### 5. Third-Party Integration

```
5. THIRD-PARTY INTEGRATION

5.1 API Integration

| Parameter | Value |
|-----------|-------|
| API type | [TBD] (e.g., REST, MQTT) |
| Authentication | [TBD] |
| Base URL | [TBD] |
| Rate limits | [TBD] requests/min |
| Documentation | [URL] |

5.2 Data Export

| Format | Method | Frequency | Content |
|--------|--------|-----------|---------|
| [CSV/JSON] | [API/SFTP] | [TBD] | [TBD] |

5.3 Common Integrations

| System | Integration Method | Status | Notes |
|--------|-------------------|--------|-------|
| [BMS/SCADA] | [MODBUS/BACnet] | [TBD] | [TBD] |
| [ERP] | [API] | [TBD] | [TBD] |
| [Safety Platform] | [Webhook] | [TBD] | [TBD] |
```

#### 6. Deployment Checklist

```
6. DEPLOYMENT CHECKLIST

PRE-DEPLOYMENT
☐ Site survey completed
☐ Reference architecture selected (§2)
☐ Capacity planning completed (§4)
☐ Network infrastructure verified (§3)
☐ Firewall rules configured (§3.5)
☐ API credentials obtained (§5)

DEPLOYMENT
☐ Gateway(s) installed and connected
☐ Mesh nodes deployed per placement plan
☐ End devices installed per installation guide
☐ Network connectivity verified
☐ Cloud platform connectivity verified

POST-DEPLOYMENT
☐ All devices reporting to dashboard
☐ Data quality verified
☐ Alarms and alerts configured
☐ Third-party integrations tested
☐ Handover documentation provided
```

---

## Image Strategy

| Image Type | Requirement |
|------------|-------------|
| Reference architecture diagrams | One per deployment size (small/medium/large) |
| Network topology diagrams | Layer-by-layer network structure |
| Gateway placement diagrams | Coverage area overlays |
| Integration flow diagrams | Data flow between systems |

```
[IMAGE: SIG - Small site reference architecture]
[IMAGE: SIG - Medium site reference architecture]
[IMAGE: SIG - Large site reference architecture]
[IMAGE: SIG - Network topology with all layers]
[IMAGE: SIG - Gateway placement guidelines with coverage overlay]
[IMAGE: SIG - Third-party integration data flow]
```

---

## Content Rules

1. **Architecture-first** - Lead with diagrams, then explain in text
2. **Scalable designs** - Show small, medium, and large deployment options
3. **Quantify limits** - State maximum capacities and coverage areas
4. **Practical guidance** - Include placement rules and sizing formulas
5. **Security included** - Cover firewall rules and authentication
6. **Checklist driven** - Provide actionable deployment checklists

---

## Quality Checklist

Before finalizing, verify:

- [ ] Reference architectures cover small, medium, and large sites
- [ ] Network design includes mesh guidelines and gateway placement
- [ ] Capacity planning includes sizing formulas
- [ ] Scalability limits are documented
- [ ] Firewall and security requirements are listed
- [ ] Third-party integration methods are described
- [ ] Deployment checklist is complete and actionable
- [ ] All architecture diagrams have placeholders or images
- [ ] Prerequisites are clearly stated
- [ ] Document ID and revision shown

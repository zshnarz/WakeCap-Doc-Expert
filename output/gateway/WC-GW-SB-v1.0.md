# WakeCap Gateway -- Solution Brief

| Field             | Value                          |
|-------------------|--------------------------------|
| Document ID       | WC-GW-SB-v1.0                 |
| Document Type     | Solution Brief (SB)            |
| Product           | WakeCap Gateway                |
| Style             | Version B -- Technical/Field   |
| Classification    | [TBD]                          |
| Date              | 2026-02-09                     |
| Revision          | 1.0                            |
| Author            | [TBD]                          |
| Approved By       | [TBD]                          |

---

## 1. Industry Challenge

### 1.1 Construction Sites

Construction projects operate in dynamic, geographically dispersed environments where real-time visibility into workforce location, environmental conditions, and equipment status is critical for safety and productivity. Existing manual processes -- paper-based muster rolls, periodic safety walkthroughs, and disconnected sensor readings -- fail to scale with the pace and complexity of modern construction.

Key pain points:

- **Limited real-time visibility:** Site managers lack a unified, live view of personnel locations and environmental hazards across multi-hectare sites.
- **Delayed incident response:** Without automated alerts, unsafe conditions (extreme heat, gas leaks, unauthorized zone entry) may go undetected for minutes or hours.
- **Compliance burden:** Regulatory requirements for personnel tracking, work-hour logging, and environmental monitoring demand meticulous record-keeping that manual methods struggle to deliver.
- **Connectivity gaps:** Remote or greenfield construction sites often lack reliable wired network infrastructure, leaving sensor and tracking data stranded on-site.

### 1.2 Oil and Gas Operations

Oil and gas facilities face similar challenges amplified by hazardous atmospheres, strict regulatory regimes, and the extreme cost of unplanned downtime:

- **Safety-critical monitoring:** Continuous environmental and personnel monitoring is mandated in classified hazardous areas, yet legacy wired sensor networks are expensive to install and inflexible to relocate.
- **Remote site access:** Offshore platforms, pipeline corridors, and desert-based facilities operate far from reliable IT infrastructure.
- **Asset utilization:** Lack of real-time equipment telemetry leads to conservative maintenance schedules and reduced asset availability.
- **Multi-contractor coordination:** Large sites host multiple contractors with separate safety and reporting systems, creating blind spots.

---

## 2. Solution Overview

### 2.1 The WakeCap Gateway at the Center

The WakeCap Gateway is the communications backbone of every WakeCap deployment. It bridges the gap between the field-level mesh network -- where sensors, smart helmets, and anchors generate data -- and the WakeCap Cloud Platform, where that data is transformed into actionable insights.

[IMAGE: Solution architecture diagram showing the WakeCap Gateway at the center of a site deployment. On the left: WakeCap Smart Helmets on workers, WakeCap Sensors (environmental), WakeCap Mesh Anchors on structures, and MODBUS Assets. All connected via mesh radio lines to the Gateway. On the right: the Gateway connected via cellular (LTE-M/NB-IoT) or Ethernet to the WakeCap Cloud. From the cloud, arrows to a web dashboard on a laptop and a mobile app on a phone. Label the mesh coverage area and indicate approximate range.]

### 2.2 Key Technical Capabilities

| Capability                        | Description                                                                                  |
|-----------------------------------|----------------------------------------------------------------------------------------------|
| Dual Backhaul (Cellular + Ethernet) | Maintains cloud connectivity via LTE-M/NB-IoT cellular or wired Ethernet, with automatic failover. |
| Mesh Network Coordination         | Manages a proprietary mesh network supporting [TBD] nodes across [TBD] m^2 of site coverage.   |
| Store-and-Forward Buffering       | Buffers up to [TBD] hours of data locally during connectivity outages, uploading automatically when the link restores. |
| Over-the-Air Updates              | Firmware for the Gateway and connected mesh devices is updated remotely from the WakeCap Cloud, eliminating manual site visits. |
| Ruggedized for Field Deployment   | IP[TBD]-rated enclosure operates from [TBD] deg C to [TBD] deg C, designed for permanent outdoor installation on construction sites and industrial facilities. |
| Rapid Deployment                  | Pre-provisioned SIM and zero-touch cloud registration allow a single technician to install and commission a Gateway in under [TBD] minutes. |

---

## 3. Use Case Scenarios

### 3.1 Real-Time Site Monitoring

**Scenario:** A construction site manager needs continuous awareness of workforce distribution, environmental conditions (temperature, humidity, wind speed), and zone compliance across a [TBD] m^2 site.

**How the Gateway delivers:**

1. WakeCap Smart Helmets and environmental sensors transmit data over the mesh network to the Gateway every [TBD] seconds.
2. The Gateway aggregates, timestamps, and compresses this data, then forwards it to the WakeCap Cloud over cellular or Ethernet.
3. The cloud platform processes incoming telemetry and updates the live site dashboard within [TBD] seconds end-to-end.
4. Site managers view real-time heat maps, zone occupancy counts, and environmental readings on the WakeCap web dashboard or mobile app.
5. Automated alerts trigger when environmental thresholds are breached (e.g., heat index exceeds [TBD] deg C) or when personnel enter restricted zones.

**Outcome:** The site manager has a continuous, up-to-the-second view of site conditions, enabling faster decisions and proactive hazard mitigation.

### 3.2 Remote Oversight and Multi-Site Management

**Scenario:** A regional safety director oversees [TBD] sites spread across [TBD] km, with limited ability to visit each site regularly.

**How the Gateway delivers:**

1. Each site operates one or more Gateways, each independently maintaining its mesh network and cloud backhaul.
2. All Gateways report to the centralized WakeCap Cloud Platform, providing a single pane of glass across all sites.
3. The safety director monitors aggregated dashboards showing site-level KPIs: headcount, compliance percentage, environmental alerts, and equipment status.
4. Drill-down views allow inspection of individual site details, worker locations, and sensor readings without traveling to the site.
5. Gateway health telemetry (signal strength, battery status, mesh node count) is visible in the cloud, enabling proactive maintenance.

**Outcome:** Centralized oversight reduces travel costs and ensures consistent safety standards across the portfolio without requiring on-site presence.

### 3.3 Regulatory Compliance and Audit Readiness

**Scenario:** An oil and gas operator must demonstrate continuous environmental monitoring and personnel tracking records for regulatory audit.

**How the Gateway delivers:**

1. The Gateway's store-and-forward capability ensures no data gaps during transient connectivity losses, preserving a complete timeline.
2. All sensor readings and personnel location events are timestamped and logged in the WakeCap Cloud with tamper-evident audit trails.
3. Compliance reports (daily headcount, exposure duration, environmental exceedance events) are generated automatically.
4. Historical data is retained in the cloud for [TBD] months, meeting or exceeding typical regulatory retention requirements.
5. Export functionality provides data in standard formats (CSV, PDF) for submission to regulatory bodies.

**Outcome:** The operator maintains a continuous, auditable record of site safety conditions, reducing audit preparation effort and regulatory risk.

---

## 4. Integration with WakeCap Ecosystem

### 4.1 Ecosystem Components

The WakeCap Gateway integrates with the full WakeCap product family:

| Component              | Role                                                         | Gateway Interaction                          |
|------------------------|--------------------------------------------------------------|----------------------------------------------|
| WakeCap Smart Helmet   | Personnel location and safety monitoring                     | Receives tag data via mesh                   |
| WakeCap Mesh Anchor    | Fixed infrastructure for mesh relay and localization          | Manages anchor timing and data relay         |
| WakeCap Sensor         | Environmental monitoring (temperature, humidity, etc.)        | Aggregates sensor readings via mesh          |
| WakeCap WS Box         | Weather station for wind, rain, solar radiation               | Receives weather data via mesh               |
| MODBUS Asset           | Bridge for third-party MODBUS sensors                        | Ingests MODBUS data via mesh bridge          |
| WakeCap Cloud Platform | Data storage, analytics, dashboards, alerting                | Transmits all data via cellular/Ethernet     |
| WakeCap Mobile App     | Field technician configuration and monitoring                | Indirect (via cloud); direct BLE for config  |

### 4.2 System Scalability

| Deployment Size | Gateways per Site | Mesh Nodes per Gateway | Typical Site Area |
|-----------------|-------------------|------------------------|-------------------|
| Small           | [TBD]             | [TBD]                  | [TBD] m^2        |
| Medium          | [TBD]             | [TBD]                  | [TBD] m^2        |
| Large           | [TBD]             | [TBD]                  | [TBD] m^2        |
| Enterprise      | [TBD]             | [TBD]                  | [TBD] m^2        |

[IMAGE: Scalability diagram showing three site sizes (small, medium, large) with increasing numbers of Gateways and mesh nodes. Small site shows 1 Gateway with a handful of anchors and sensors. Medium site shows 2-3 Gateways with overlapping mesh coverage. Large site shows multiple Gateways in a grid pattern with dense anchor and sensor coverage. All connected to a single WakeCap Cloud instance.]

### 4.3 Third-Party Integration

| Integration Point       | Method              | Description                                       |
|-------------------------|---------------------|---------------------------------------------------|
| BMS / SCADA             | MODBUS Asset bridge | Ingest data from existing building/industrial systems via the MODBUS Asset node. |
| ERP / HR Systems        | Cloud API (REST)    | Export personnel tracking and work-hour data to enterprise systems. |
| Emergency Response      | Cloud Webhooks      | Push real-time alerts to third-party notification and dispatch platforms. |
| GIS / Mapping           | Cloud API (REST)    | Overlay WakeCap location data on enterprise GIS platforms. |

---

## 5. ROI Indicators and Proof Points

### 5.1 Quantifiable Benefits

| Benefit Area                 | Metric                                | Typical Improvement      |
|------------------------------|---------------------------------------|--------------------------|
| Incident Response Time       | Time from hazard detection to action  | [TBD]% reduction         |
| Safety Compliance            | Audit non-conformance findings        | [TBD]% reduction         |
| Muster / Headcount           | Time to complete site headcount       | [TBD] min vs. [TBD] min  |
| Environmental Monitoring     | Data coverage (% of site, % of time)  | [TBD]% vs. [TBD]%       |
| Downtime (Connectivity Loss) | Data gap duration per month           | [TBD] min with store-and-forward |
| Site Visit Reduction         | Remote diagnostic resolution rate     | [TBD]% of issues resolved remotely |

### 5.2 Operational Proof Points

- **Rapid deployment:** A single technician can install, power, and commission a WakeCap Gateway in under [TBD] minutes with zero on-site IT infrastructure.
- **Connectivity resilience:** Store-and-forward buffering ensures zero data loss during cellular outages lasting up to [TBD] hours.
- **Low maintenance:** The Gateway operates autonomously with no scheduled field maintenance beyond [TBD]-monthly visual inspections.
- **Scalable coverage:** Additional Gateways and mesh nodes can be added incrementally as the site expands, without redesigning the network.

### 5.3 Total Cost of Ownership Considerations

| Cost Factor                     | WakeCap Gateway Solution          | Traditional Wired Solution     |
|---------------------------------|-----------------------------------|-------------------------------|
| Infrastructure Cabling          | None (wireless mesh)              | [TBD] USD/m for conduit + cable |
| Installation Labor              | [TBD] h per Gateway               | [TBD] h per sensor point       |
| Network Equipment               | Gateway + anchors                 | Switches, routers, access points |
| Ongoing Connectivity            | Cellular data plan: [TBD] USD/mo  | Leased line: [TBD] USD/mo      |
| Relocation Cost (site change)   | [TBD] h to decommission + redeploy | Full re-cabling required       |
| Maintenance (Annual)            | [TBD] USD/year                    | [TBD] USD/year                 |

---

## 6. Getting Started / Next Steps

### 6.1 Engagement Process

| Step | Action                                                    | WakeCap Contact          |
|------|-----------------------------------------------------------|--------------------------|
| 1    | **Site Assessment** -- Provide site dimensions, node count estimate, connectivity availability. | [TBD] (Sales Engineering) |
| 2    | **Solution Design** -- WakeCap engineers design the mesh layout, Gateway placement, and backhaul strategy. | [TBD] (Solutions Architect) |
| 3    | **Pilot Deployment** -- Deploy a single Gateway with a subset of mesh nodes for validation. | [TBD] (Field Engineering) |
| 4    | **Full Deployment** -- Scale to full site coverage based on pilot results. | [TBD] (Project Manager) |
| 5    | **Ongoing Support** -- Cloud monitoring, firmware updates, and technical support. | [TBD] (Customer Success) |

### 6.2 Pre-Deployment Checklist

- [ ] Site survey completed (dimensions, obstructions, hazardous zones identified)
- [ ] Cellular coverage verified at planned Gateway locations (signal strength > [TBD] dBm)
- [ ] Power source identified for each Gateway location (DC supply or PoE availability)
- [ ] Mounting locations selected (height: [TBD] m above ground, clear of metallic obstructions)
- [ ] WakeCap Cloud tenant provisioned and admin accounts created
- [ ] SIM cards activated (if customer-supplied) or WakeCap-managed SIM confirmed
- [ ] Site network policies reviewed (firewall rules for cloud endpoint: [TBD])

### 6.3 Contact Information

| Contact Type           | Details                    |
|------------------------|----------------------------|
| Sales Inquiries        | [TBD]                      |
| Technical Support      | [TBD]                      |
| Partner Program        | [TBD]                      |
| Documentation Portal   | [TBD]                      |
| Emergency Support      | [TBD]                      |

### 6.4 Related Documents

| Document ID     | Title                                      |
|-----------------|--------------------------------------------|
| WC-GW-TR-v1.0  | WakeCap Gateway Technical Reference        |
| WC-GW-CS-v1.0  | WakeCap Gateway Compliance Summary         |
| [TBD]           | WakeCap Gateway Installation Guide         |
| [TBD]           | WakeCap Gateway Quick Start Guide          |
| [TBD]           | WakeCap Cloud Platform User Guide          |

---

*End of Document -- WC-GW-SB-v1.0*

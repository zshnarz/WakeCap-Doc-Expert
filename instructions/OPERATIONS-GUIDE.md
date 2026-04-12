# Operations Guide Template Instructions

This document defines the structure and content requirements for WakeCap Operations Guides.

---

## Purpose

Operations Guides provide day-2 monitoring, management, and operational procedures for deployed WakeCap systems. They enable operations teams to maintain system health, respond to alerts, and optimize performance after initial deployment.

---

## Target Audience

- Operations center staff
- NOC (Network Operations Center) engineers
- Site operations managers
- Remote monitoring teams
- On-call support engineers

---

## Document Characteristics

| Attribute | Specification |
|-----------|---------------|
| Typical Length | 10-20 pages |
| Orientation | Portrait (A4) |
| Primary Content | Monitoring procedures, alert responses, KPIs |
| Layout | Single column with reference tables |
| Image Ratio | 30% visual (dashboards, diagrams), 70% procedures/tables |
| Document Code | OG |

---

## Required Sections

### Section 1: System Overview (Concept)

| Element | Content |
|---------|---------|
| Deployment context | Where and how the system is deployed |
| System architecture | High-level block diagram of monitored components |
| Normal operating parameters | Baseline values for healthy operation |
| Key performance indicators | Metrics that define system health |

### Section 2: Monitoring Dashboard (Reference)

| Element | Content |
|---------|---------|
| Dashboard access | URLs, credentials (reference only), access procedures |
| Key metrics | What each metric means and its normal range |
| Refresh intervals | How often data updates |
| Data retention | How long historical data is available |

### Section 3: Alert Management (Reference)

| Column | Content |
|--------|---------|
| Alert name | Descriptive alert identifier |
| Severity | Critical / Warning / Info |
| Trigger condition | What causes the alert |
| Normal range | Expected values |
| Response action | What to do when triggered |
| Escalation | When and to whom to escalate |

### Section 4: Routine Operations (Task)

| Element | Content |
|---------|---------|
| Daily checks | What to verify each day |
| Weekly tasks | Scheduled weekly activities |
| Monthly reviews | Monthly performance and health reviews |
| Quarterly maintenance | Scheduled maintenance windows |

### Section 5: Performance Optimization (Task)

| Element | Content |
|---------|---------|
| Capacity monitoring | How to track resource utilization |
| Performance tuning | Adjustable parameters and their effects |
| Seasonal adjustments | Changes needed for weather/season variations |

### Section 6: Incident Response (Task)

| Element | Content |
|---------|---------|
| Incident classification | Severity levels and definitions |
| Initial response | First actions for each severity |
| Communication | Who to notify and when |
| Resolution tracking | How to document and close incidents |
| Post-incident review | Lessons learned process |

### Section 7: Reporting (Reference)

| Element | Content |
|---------|---------|
| Standard reports | Available report types and schedules |
| Custom reports | How to create ad-hoc reports |
| SLA metrics | Service level tracking |

---

## Version A vs Version B

| Aspect | Version A (Marketing) | Version B (Technical) |
|--------|----------------------|----------------------|
| Tone | High-level operational overview | Detailed step-by-step procedures |
| Alert detail | Summary of alert categories | Complete alert dictionary with thresholds |
| Procedures | Overview of operational workflow | Exact CLI commands and configuration steps |
| Audience emphasis | Management and stakeholders | Operations engineers and NOC staff |

---

## Image Strategy

| Image Type | Usage |
|------------|-------|
| Dashboard screenshots | Monitoring interface reference |
| System architecture diagrams | Component relationship overview |
| Alert flow diagrams | Escalation and response workflows |
| Performance charts | Baseline performance curves |

---

## Quality Checklist

- [ ] All alerts documented with trigger conditions and responses
- [ ] Routine operations organized by frequency (daily/weekly/monthly)
- [ ] Escalation contacts and procedures defined
- [ ] Normal operating ranges specified with units
- [ ] Incident response procedures include severity classification
- [ ] Document ID and version number in footer

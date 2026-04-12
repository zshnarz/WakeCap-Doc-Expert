# Runbook Template Instructions

This document defines the structure and content requirements for WakeCap Runbooks.

---

## Purpose

Runbooks provide alert-to-action playbooks for operations teams. Each entry maps a specific alert, symptom, or operational scenario to an exact resolution procedure. Runbooks are designed for speed — an on-call engineer should be able to follow any procedure without prior knowledge of the system.

---

## Target Audience

- On-call engineers
- NOC (Network Operations Center) operators
- L1/L2 support engineers
- Field service technicians responding to remote alerts

---

## Document Characteristics

| Attribute | Specification |
|-----------|---------------|
| Typical Length | 5-15 pages |
| Orientation | Portrait (A4) |
| Primary Content | Alert-to-action procedures, decision trees |
| Layout | Single column, highly structured, quick-scan format |
| Image Ratio | 15% visual (decision trees), 85% procedures |
| Document Code | RB |

---

## Required Sections

### Section 1: How to Use This Runbook (Concept)

| Element | Content |
|---------|---------|
| Lookup method | How to find the right procedure (by alert name, symptom, or category) |
| Severity definitions | What Critical / Warning / Info mean operationally |
| Escalation policy | When and how to escalate beyond this runbook |
| Tools required | Remote access tools, CLI utilities, monitoring dashboards |

### Section 2: Alert Index (Reference)

| Column | Content |
|--------|---------|
| Alert ID | Unique identifier |
| Alert Name | Human-readable name |
| Severity | Critical / Warning / Info |
| Category | Power / Network / Sensor / System |
| Procedure Link | Section reference for resolution |

### Section 3: Playbooks (Task)

Each playbook follows this structure:

| Element | Content |
|---------|---------|
| **Alert/Scenario** | Alert name and ID |
| **Severity** | Critical / Warning / Info |
| **Symptoms** | What the operator observes |
| **Likely Cause** | Most common root cause |
| **Prerequisites** | Access, tools, permissions needed |
| **Resolution Steps** | Numbered step-by-step procedure |
| **Verification** | How to confirm the issue is resolved |
| **Escalation** | When to escalate and to whom |
| **Time Estimate** | Expected resolution time |

#### Playbook Categories:

1. **Power System Alerts** — Battery low, solar failure, output loss, charge controller faults
2. **Network/Communication Alerts** — Connection loss, high latency, authentication failures
3. **Sensor Alerts** — Out-of-range readings, sensor offline, calibration drift
4. **System Alerts** — Device offline, firmware errors, memory/storage issues
5. **Environmental Alerts** — Temperature extremes, weather events, physical damage

### Section 4: Decision Trees (Reference)

| Element | Content |
|---------|---------|
| Triage flowchart | First-response decision tree for unknown issues |
| Category-specific trees | Detailed trees for power, network, sensor subsystems |

### Section 5: Quick Commands Reference (Reference)

| Column | Content |
|--------|---------|
| Action | What you want to do |
| Command/Procedure | Exact command or steps |
| Expected Output | What success looks like |
| Notes | Caveats or prerequisites |

### Section 6: Contacts and Escalation (Reference)

| Column | Content |
|--------|---------|
| Role | Engineering, Field Support, Management |
| Contact | Name, phone, email |
| Availability | Hours, timezone |
| Escalation trigger | When to contact this person |

---

## Version A vs Version B

| Aspect | Version A (Marketing) | Version B (Technical) |
|--------|----------------------|----------------------|
| Tone | N/A — Runbooks are always Version B | Direct, imperative, no explanatory context |
| Detail | N/A | Exact commands, expected outputs, time estimates |
| Format | N/A | Highly structured, quick-scan optimized |

> **Note:** Runbooks are inherently technical documents. Version A is not applicable. Always generate as Version B.

---

## Image Strategy

| Image Type | Usage |
|------------|-------|
| Decision tree flowcharts | Triage and diagnosis workflows |
| Dashboard screenshots | Where to find relevant metrics |
| LED status diagrams | Physical device status indicators |

---

## Quality Checklist

- [ ] Every known alert has a corresponding playbook
- [ ] All procedures start with action verbs
- [ ] Escalation criteria defined for each playbook
- [ ] Decision trees cover all major failure categories
- [ ] Resolution steps include verification
- [ ] Time estimates provided for each procedure
- [ ] Contact information current and complete
- [ ] Document ID and version number in footer

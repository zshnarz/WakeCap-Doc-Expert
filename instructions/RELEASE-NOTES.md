# Release Notes Template Instructions

This document defines the structure and content requirements for WakeCap Release Notes.

---

## Purpose

Release Notes communicate firmware, hardware, and software changes between product versions. They enable engineers to assess upgrade impact, verify compatibility, and plan deployment of new versions.

---

## Target Audience

- Field engineers performing firmware updates
- System integrators verifying compatibility
- QA teams tracking defect resolution
- Operations teams planning upgrade windows
- Technical support referencing known issues

---

## Document Characteristics

| Attribute | Specification |
|-----------|---------------|
| Typical Length | 2-4 pages |
| Orientation | Portrait (A4) |
| Primary Content | Change lists, compatibility tables, known issues |
| Layout | Single column, list-heavy |
| Image Ratio | 5% visual, 95% text/tables |
| Document Code | RN |

---

## Required Sections

### Section 1: Release Summary (Concept)

| Element | Content |
|---------|---------|
| Product name and version | Full product identifier and version number |
| Release date | Exact release date |
| Release type | Major / Minor / Patch / Hotfix |
| Compatibility matrix | Hardware revisions, firmware versions, platform versions supported |
| Upgrade urgency | Critical / Recommended / Optional with rationale |

### Section 2: What's New (Reference)

| Element | Content |
|---------|---------|
| New features | Numbered list with brief description of each new feature |
| Enhancements | Improvements to existing functionality |
| Performance changes | Any measurable performance differences |

### Section 3: Bug Fixes (Reference)

| Column | Content |
|--------|---------|
| Issue ID | Internal tracking reference |
| Symptom | What the user observed |
| Fix | What was changed |
| Affected versions | Which versions had this bug |

### Section 4: Known Issues (Reference)

| Column | Content |
|--------|---------|
| Issue ID | Internal tracking reference |
| Symptom | Observable problem |
| Workaround | Temporary mitigation if available |
| Target fix | Planned resolution version |

### Section 5: Upgrade Procedure (Task)

| Element | Content |
|---------|---------|
| Prerequisites | Required tools, current version, backup steps |
| Procedure | Numbered steps for upgrade |
| Verification | How to confirm successful upgrade |
| Rollback | Steps to revert if upgrade fails |

### Section 6: Compatibility Notes (Reference)

| Element | Content |
|---------|---------|
| Hardware compatibility | Supported hardware revisions |
| Firmware dependencies | Required companion firmware versions |
| Breaking changes | API, protocol, or configuration changes that require action |
| Deprecations | Features scheduled for removal in future versions |

---

## Version A vs Version B

| Aspect | Version A (Marketing) | Version B (Technical) |
|--------|----------------------|----------------------|
| Tone | Benefit-focused, highlights improvements | Precise, includes all technical details |
| Detail level | Summary of key changes | Full change list with issue IDs |
| Known issues | Omitted or summarized | Complete list with workarounds |
| Audience emphasis | Customer-facing release announcement | Engineering and support reference |

---

## Image Strategy

| Image Type | Usage |
|------------|-------|
| Screenshots | Before/after UI changes (if applicable) |
| Configuration diagrams | New configuration options |

---

## Quality Checklist

- [ ] All changes categorized (feature, enhancement, fix, known issue)
- [ ] Compatibility matrix complete for all supported hardware
- [ ] Upgrade procedure tested and verified
- [ ] Rollback procedure documented
- [ ] Known issues include workarounds where available
- [ ] Breaking changes clearly highlighted
- [ ] Document ID and version number in footer

---
title: "AETHER-Q1"
subtitle: "Quantum-Secured Hyperlink Communication Node"
doc-id: AQ1-DS-v1.0
product: AETHER-Q1
doc-type: Marketing Datasheet
revision-date: 2026-05-09
author: "AETHER Communications · Concept Datasheet"
---

> ## *Communication beyond the horizon.*
>
> One node. Four spectra. Quantum-secured. Self-healing.
> Built for the places connectivity has never reached.

---

## At a Glance

Throughput
:   **1.2 Tbps** terahertz fronthaul · **224 Gbps** LiFi · **multi-orbit LEO** uplink

Security
:   Hardware **QKD co-processor** · NIST **post-quantum cryptography** · per-flow attestation

Latency
:   **< 50 ms** mesh self-heal · **< 8 ms** inter-satellite handover · sub-millisecond air interface

Reach
:   Operates from **-40 °C to +75 °C** · IP68 · ATEX Zone 2 option · MIL-STD-810H

Intelligence
:   **256 TOPS** edge AI · on-device 7B-parameter LLM · digital-twin synchronised

---

## Why AETHER-Q1

The places that matter most — the deepest mines, the furthest platforms, the hardest disaster zones — are also the places radio struggles to reach. **AETHER-Q1** was engineered as an answer.

It is not another radio. It is the **convergence point** of four communication worlds, fused into a single weather-sealed node and orchestrated by an on-board AI that learns the spectrum around it. Where one band fails, another takes over. Where the network is attacked, quantum keys keep the channel honest.

::: {.tip}
**One node replaces a tower of compromise.** Operators who deploy AETHER-Q1 retire — on average — a base station, a satellite VSAT, a Wi-Fi backhaul, a SCADA radio, and a key-management appliance. *(Target reference architecture, Q1 2029.)*
:::

---

## Four Worlds, One Node

### Terahertz Fronthaul

The 0.30–0.45 THz band carries more data in a single beam than an entire 5G cell. AETHER-Q1 uses **holographic beamforming** assisted by intelligent reconfigurable surfaces, so the beam doesn't just point — it bends around obstacles. Target throughput: **1.2 Tbps**, line-of-sight, 100 m.

### Non-Terrestrial Uplink

A flat, electronically-steered phased array tracks **multi-orbit LEO constellations** across Ku, Ka, and V bands. No moving parts. No alignment drift. Inter-satellite handover **under 8 ms** — fast enough for closed-loop industrial control from anywhere on the planet.

### Optical Wireless (LiFi 2.0)

In hospitals, refineries, and secure facilities where RF is restricted, **light becomes the medium**. Visible-light and 850 nm IR backup deliver up to **224 Gbps** in a single emitter footprint — silent on the spectrum analyser, invisible to anyone outside the room.

### Self-Healing Mesh

Below the headline numbers, a **sub-6 GHz mesh** quietly knits together up to 4,096 nodes per cluster. AI-orchestrated routing reroutes around failure in **under 50 ms** — fast enough that a robot arm never notices the path it's using has just changed.

---

## Quantum Security, Out of the Box

::: {.important}
Tomorrow's adversary harvests today's traffic. AETHER-Q1 is built for the day quantum computers break the ciphers we trust now.
:::

| Layer | Mechanism | Standard |
|:------|:----------|:---------|
| Key exchange | QKD co-processor (BB84 / E91) | ETSI TS 103 744 |
| Symmetric crypto | ML-KEM-1024 | NIST FIPS 203 |
| Signatures | ML-DSA-87 | NIST FIPS 204 |
| Root of trust | Tamper-reactive HSM | FIPS 140-3 Level 4 *(target)* |
| Refresh rate | 1 kHz key rotation | — |
| Architecture | Zero-trust, per-flow attestation | NIST SP 800-207 |

---

## Performance

| Parameter | Value | Unit |
|:----------|------:|:----:|
| THz aggregate downlink | 1.2 | Tbps |
| LiFi single-emitter | 224 | Gbps |
| Mesh nodes per cluster | 4,096 | — |
| Mesh convergence (failure) | < 50 | ms |
| LEO inter-sat handover | < 8 | ms |
| Edge AI compute | 256 | TOPS |
| Edge AI compute (FP16) | 64 | TFLOPS |
| Concurrent flows | 1 M+ | — |

---

## Form & Function

| Parameter | Value |
|:----------|:------|
| Dimensions | 1,200 × 400 × 400 mm |
| Weight | 28 kg (BASE) · 34 kg (EX) |
| Mounting | pole · mast · wall · vehicle roof |
| Power input | 24–60 V DC / 100–240 V AC |
| Power draw | 180 W typical · 420 W peak |
| Operating temp | -40 °C to +75 °C |
| Storage temp | -55 °C to +85 °C |
| Ingress protection | IP68 / NEMA 4X |
| Shock / vibration | MIL-STD-810H |
| Altitude | up to 5,000 m |
| EMI/EMC | MIL-STD-461G · EN 55032 Class A |
| Hazardous area | ATEX Zone 2 / Class I Div 2 *(EX variant)* |

---

## Interfaces

| Port | Count | Notes |
|:-----|:-----:|:------|
| QSFP-DD (400 GbE optical) | 2 | Fronthaul / data plane |
| RJ45 10 GbE PoE++ | 4 | 90 W per port output |
| USB-C 4 | 1 | Service & local console |
| M12 X-coded | 1 | Industrial Ethernet |
| CAN-FD | 1 | Vehicular variant only |
| SMA (GNSS / 1 PPS) | 1 | External time reference |
| Holographic ID | 1 | NFC + optical pairing |

::: {.note}
A single hybrid fibre-and-power cable supports runs up to 1 km from the network edge — no separate copper, no roadside cabinets.
:::

---

## Built for the Frontier

**Mega-construction.** A Tbps backbone for autonomous earthmovers, drone surveys, and AR-guided crews — across sites measured in square kilometres.

**Offshore energy.** Quantum-secure SCADA back to shore, over LEO, with no exposed control plane on the public RF spectrum.

**Mines & tunnels.** Where radio dies, light keeps working. LiFi 2.0 carries traffic through galleries that have never seen a network bar.

**Disaster response.** Drop the node. Ninety seconds later, the mesh is alive. Rescue teams have a usable network before the dust settles.

**Defence & contested theatres.** Low-probability-of-intercept terahertz hops, anti-jam mesh routing, and one-time-pad-class key rotation — purpose-built for environments where the spectrum is the battlefield.

**Smart ports.** Deterministic networking from gantry to gate. AGVs, cranes, and customs systems on a single fabric, secured to a single root of trust.

---

## Configurations

| Model | Built for |
|:------|:----------|
| **AETHER-Q1-BASE** | Standard industrial deployment |
| **AETHER-Q1-EX** | ATEX Zone 2 / IECEx hazardous area |
| **AETHER-Q1-MIL** | MIL-STD ruggedization, anti-jam firmware, classified-key option |
| **AETHER-Q1-MED** | Healthcare — EMI-quiet, LiFi-emphasised |
| **AETHER-Q1-VEH** | Vehicular roof-mount, CAN-FD bus, mobile mesh |

---

## Standards Targeted

3GPP Release 21+ · ITU-R IMT-2030 · ETSI TS 103 744 (QKD) · IEC 62443-4-2 · ISO 27001 · SOC 2 Type II · ANSI/ISA-95 · FCC Part 15 · ETSI EN 300 328

---

## Roadmap

- [x] **2027** — Engineering samples to lighthouse customers
- [ ] **2028** — Field trials: oil & gas · mining · smart ports
- [ ] **2029** — General availability · 1.0 THz extension module
- [ ] **2030** — Quantum-repeater integration for metro-scale entanglement

---

## Reserve the Future

> AETHER-Q1 will not be sold by the rack-unit. It will be sold by the mission.
> Tell us yours.

**Engineering enquiries** · engineering@aether.example
**Reservation programme** · reserve@aether.example
**Press & analysts** · press@aether.example

---

::: {.note}
**Concept document.** AETHER-Q1 is a forward-looking product concept aligned with publicly announced ITU-R IMT-2030 (6G) targets and current research in terahertz, LiFi, QKD, and post-quantum cryptography. Specifications are target performance for the indicated launch windows and may evolve. Items marked *(target)* are subject to certification at GA. Document AQ1-DS-v1.0 · 2026-05-09.
:::

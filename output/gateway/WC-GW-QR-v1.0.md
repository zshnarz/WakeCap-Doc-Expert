# QUICK REFERENCE: WakeCap Gateway

| Doc ID | WC-GW-QR-v1.0 | Rev | 1.0 | Date | 2026-02-09 |
|--------|----------------|-----|-----|------|------------|

---

## COMPONENT OVERVIEW

[IMAGE: WakeCap Gateway with numbered callouts to: 1-Antenna connector, 2-Status LED, 3-Ethernet port, 4-Power input, 5-SIM slot, 6-USB port, 7-Mounting bracket, 8-Reset button]

1. **Antenna connector** — External antenna for mesh radio
2. **Status LED** — System health indicator
3. **Ethernet port** — LAN / WAN uplink (RJ45)
4. **Power input** — DC power connector
5. **SIM slot** — Cellular data SIM card
6. **USB port** — Configuration and diagnostics
7. **Mounting bracket** — Wall / pole mounting
8. **Reset button** — Factory reset (hold [TBD] sec)

---

## KEY SPECIFICATIONS

| Parameter | Value |
|-----------|-------|
| Input Power | [TBD] V DC |
| Power Consumption | [TBD] W typ |
| Uplink | Cellular (4G LTE) / Ethernet |
| Mesh Protocol | [TBD] |
| Max Mesh Devices | [TBD] |
| Mesh Range | [TBD] m |
| IP Rating | [TBD] |
| Operating Temp | [TBD] to [TBD] C |
| Dimensions | [TBD] x [TBD] x [TBD] mm |
| Weight | [TBD] g |

---

## LED STATUS

| Pattern | Status | Meaning |
|---------|--------|---------|
| ● Solid green | Normal | Connected to cloud, mesh active |
| ● Slow blink green (1/5s) | Connecting | Establishing cloud connection |
| ● Fast blink green | Data transfer | Active data upload in progress |
| ● Solid amber | Warning | Connected locally, no cloud uplink |
| ● Blink amber | Mesh only | Mesh active, no WAN connection |
| ● Solid red | Fault | Hardware or critical software error |
| ● Blink red | Boot error | Failed to initialize |
| ○ Off | No power | Check power supply |

---

## WIRING / CONNECTIONS

```
[Power Supply] ──────── [Power Input]
[Ethernet/LAN] ──────── [RJ45 Port]
[SIM Card]     ──────── [SIM Slot]
[Antenna]      ──────── [Antenna Connector]
```

---

## QUICK TROUBLESHOOTING

| Symptom | Solution |
|---------|----------|
| LED off | Check power supply voltage ([TBD] V DC); verify connector seated |
| LED solid red | Power cycle; if persists, contact support |
| LED amber (no cloud) | Check SIM card / Ethernet cable; verify network availability |
| Devices not connecting | Verify antenna attached; check mesh radio range; reboot Gateway |
| Data not on Dashboard | Check uplink (cellular/Ethernet); verify cloud subscription active |

---

## RESET PROCEDURE

1. Press and hold **Reset** button for [TBD] seconds
2. LED blinks [TBD] rapidly
3. Release button — Gateway restarts with factory defaults

> **NOTICE:** Factory reset erases all local configuration. Mesh devices must re-associate.

---

**Support:** [TBD - email] | [TBD - phone]
**Full documentation:** WC-GW-PM-v1.0

(c) 2026 WakeCap Technologies

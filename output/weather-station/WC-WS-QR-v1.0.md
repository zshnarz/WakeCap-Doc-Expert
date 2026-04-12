# WakeCap Weather Station
## Quick Reference Guide

**Document ID:** WC-WS-QR-v1.0 | **Model:** PH-282-AIR

---

## SAFETY WARNINGS

**WARNING: ELECTRICAL HAZARD**
- De-energize all equipment before connecting or disconnecting wires
- Verify voltage with multimeter before touching terminals
- Use appropriate PPE per site requirements

**CAUTION: MOUNTING HAZARD**
- Secure all mounting hardware before releasing equipment
- Wind sensors must be mounted with clear airflow - no obstructions within 2m

---

## WHAT'S IN THE BOX

[IMAGE: Annotated photo of box contents with numbered callouts]

| Item | Qty | Check |
|------|-----|-------|
| WS Box (Data Acquisition Terminal) | 1 | [ ] |
| Wind Speed Sensor | 1 | [ ] |
| Wind Direction Sensor | 1 | [ ] |
| Temperature/Humidity Sensor with Baiye Box | 1 | [ ] |
| Atmospheric Pressure Sensor | 1 | [ ] |
| Rain Gauge (Stainless Steel) | 1 | [ ] |
| RS485 Cable | 1 | [ ] |
| Power Cable (12V DC) | 1 | [ ] |
| Mounting Hardware Kit | 1 | [ ] |

---

## REQUIRED TOOLS

- Multimeter
- Screwdriver set (Phillips, flathead)
- Wire strippers
- Cable ties
- Compass (for wind direction alignment)
- WakeCap Verify App (on smartphone)

---

## PREREQUISITES

Before starting:
- [ ] MODBUS Asset installed and powered
- [ ] Mesh network configured (Anchors + Gateway online)
- [ ] Solar panel / power source ready
- [ ] Site survey completed for sensor placement

---

## SETUP STEPS

[IMAGE: Simplified wiring diagram showing WS Box to MODBUS Asset connection]

### 1. MOUNT SENSORS

Mount all sensors on mast/tripod:
- Wind sensors at TOP (minimum 2m clearance)
- Baiye Box in shaded area
- Rain gauge LEVEL and unobstructed

### 2. CONNECT SENSORS TO WS BOX

| Sensor | Terminal |
|--------|----------|
| Wind Speed | T1 |
| Wind Direction | T2 |
| Temperature | T3 |
| Humidity | T4 |
| Pressure | T5 |
| Rainfall | T6 |

### 3. CONNECT RS485 TO MODBUS ASSET

**CRITICAL: Match terminals exactly**

| WS Box | MODBUS Asset |
|--------|--------------|
| A | A |
| B | B |

*Reversed wiring = communication failure*

### 4. CONNECT POWER

Connect 12V DC barrel jack to WS Box.
Power source: Solar panel via MPPT controller + battery.

### 5. VERIFY WS BOX DISPLAY

LCD should show:
- Current date/time
- Live sensor values (not zeros)

### 6. VERIFY MODBUS LED

Count blinks per minute:
- **1 blink/min** = NORMAL
- **2 blinks/min** = ERROR (check RS485 wiring)

### 7. VERIFY IN APP

Open WakeCap Verify App:
- [ ] MODBUS Asset shows ONLINE
- [ ] Gateway shows ONLINE
- [ ] Data appearing on dashboard

### 8. ALIGN WIND DIRECTION

Use compass to align wind direction sensor:
- North arrow on sensor = True North

---

## LED STATUS REFERENCE

### MODBUS Asset LED

| Blinks/Min | Status | Action |
|------------|--------|--------|
| 1 | NORMAL | None required |
| 2 | COMM ERROR | Check RS485 wiring A-A, B-B |

### WS Box Display

| Display | Status | Action |
|---------|--------|--------|
| Values shown | NORMAL | None required |
| All zeros | SENSOR ERROR | Check sensor cables at T1-T6 |
| Screen OFF | POWER ERROR | Check 12V DC connection |

### MPPT Controller

| Indicator | Status |
|-----------|--------|
| Charging LED ON | Solar charging battery |
| Fault LED ON | Check battery/panel connections |

---

## VERIFY SUCCESS CHECKLIST

Before leaving site:

- [ ] All sensors securely mounted
- [ ] WS Box LCD showing live values
- [ ] MODBUS LED: 1 blink per minute
- [ ] WakeCap Verify App: All devices ONLINE
- [ ] Dashboard: Data appearing correctly
- [ ] All cables secured with cable ties
- [ ] Enclosures sealed (weatherproof)
- [ ] Photos taken for documentation

---

## QUICK TROUBLESHOOTING

| Problem | Check |
|---------|-------|
| No display | 12V power connection |
| Display shows zeros | Sensor cable at terminal |
| LED blinks 2x/min | RS485 wiring (A-A, B-B) |
| No data on dashboard | Gateway connectivity |

---

## QR CODES

[QR: Full Installation Guide - WC-WS-IG-v1.0]

[QR: Troubleshooting Guide - WC-WS-TG-v1.0]

[QR: WakeCap Support Portal]

---

## SUPPORT CONTACT

**Technical Support:** 027-82666096
**Website:** www.whxph.com

**WakeCap Saudi Arabia**
P.O. Box: 85540, Riyadh 11612

---

*Print on waterproof paper or laminate for field use*

**Document:** WC-WS-QR-v1.0 | **WakeCap Technologies**

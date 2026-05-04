# Sample Product - Product Knowledge

## Product Identity

- **Product name:** Sample Sensor
- **Model numbers:** SP-1000-A
- **Variants:** SP-1000-B (extended range)
- Manufacturer: WakeCap Technologies

## Specifications

| Parameter | Value | Unit |
|:----------|------:|:----:|
| Supply voltage | 12 | V |
| Operating temperature | -40 to +60 | deg C |
| Power consumption | 1.5 | W |

## Interfaces

- RS485 (Modbus RTU)
- USB-C (configuration only)
- 4-pin M12 connector — pinout: 1=V+, 2=GND, 3=A, 4=B

## Procedures

### Installation

1. Install bracket on a flat surface using M6 fasteners.
2. Connect the 4-pin M12 cable observing pinout.
3. Apply 12 V supply voltage.
4. Verify the green LED is steady.

### Maintenance

1. Inspect cable seals every 6 months.
2. Clean optical surfaces with isopropyl alcohol.

## Safety

- DANGER: H~2~S exposure above 10 ppm — evacuate the area.
- WARNING: Electrical hazard — de-energize before servicing.
- Safe-use conditions: -40 to +60 deg C, 0 to 100 % RH.

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| LED off | No supply voltage | Verify 12 V at terminals |
| RS485 no response | Wrong baud rate | Set master to 9600 8N1 |

## Glossary

- **PPE** - Personal Protective Equipment
- **RTU** - Remote Terminal Unit (Modbus protocol variant)

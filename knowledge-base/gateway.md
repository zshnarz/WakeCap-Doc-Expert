# WakeCap Gateway - Product Knowledge

## 1. Product Identity

| Parameter | Value |
|-----------|-------|
| Product Name | WakeCap Gateway |
| Product Code | GW |
| Model Number | [TBD] |
| Part Number | [TBD] |
| Hardware Revision | [TBD] |
| Firmware Version (Base) | [TBD] |
| OEM Module References | [TBD] |

### 1.1 Variants

| Model | Description | Connectivity |
|-------|-------------|-------------|
| [TBD] | Standard Gateway | Ethernet |
| [TBD] | Cellular Gateway | 4G LTE + Ethernet |
| [TBD] | Solar-Ready Gateway | 4G LTE + Ethernet |

### 1.2 Package Contents

| Item | Quantity | Part Number |
|------|----------|-------------|
| WakeCap Gateway unit | 1 | [TBD] |
| External antenna | [TBD] | [TBD] |
| Mounting bracket | 1 | [TBD] |
| Mounting hardware set (bolts, nuts, washers) | 1 | [TBD] |
| Power cable | 1 | [TBD] |
| Ethernet patch cable ([TBD] m) | 1 | [TBD] |
| Quick Start card | 1 | [TBD] |

### 1.3 Physical Component Identification

| # | Component | Description |
|---|-----------|-------------|
| 1 | Antenna connector | SMA female connector for external mesh antenna |
| 2 | Status LED | Multi-color LED indicating system status |
| 3 | Ethernet port | RJ45 10/100 Ethernet for LAN/WAN uplink |
| 4 | Power input | DC power connector ([TBD] V DC) |
| 5 | SIM slot | Nano/Micro SIM card slot for cellular connectivity |
| 6 | USB port | USB [TBD] for local configuration and diagnostics |
| 7 | Mounting bracket points | [TBD] mounting holes for bracket attachment |
| 8 | Reset button | Recessed button for factory reset |
| 9 | Serial number label | Unique device identifier and manufacturing info |
| 10 | Regulatory markings | CE, FCC, and other compliance marks |

### 1.4 Ordering Information

| Part Number | Description | Notes |
|-------------|-------------|-------|
| [TBD] | WakeCap Gateway, standard | [TBD] |
| [TBD] | WakeCap Gateway, cellular variant | [TBD] |
| [TBD] | Mounting kit | [TBD] |
| [TBD] | Antenna kit | [TBD] |
| [TBD] | Power supply unit | [TBD] |

### 1.5 Accessories

| Part Number | Description |
|-------------|-------------|
| [TBD] | Replacement antenna |
| [TBD] | DIN-rail mounting bracket |
| [TBD] | Surge protector |
| [TBD] | Outdoor enclosure upgrade kit |

### 1.6 Related Documents

| Document | ID | Description |
|----------|----|-------------|
| Product Datasheet | WC-GW-DS-v1.0 | Summary specifications |
| Product Manual | WC-GW-PM-v1.0 | Comprehensive technical reference |
| Installation Guide | WC-GW-IG-v1.0 | Physical installation and initial power-up |
| Commissioning Guide | WC-GW-CG-v1.0 | Network configuration, mesh setup, cloud registration |
| Quick Reference | WC-GW-QR-v1.0 | Field reference card |
| Troubleshooting Guide | WC-GW-TG-v1.0 | Symptom-based diagnostics |
| Technical Reference | WC-GW-TR-v1.0 | Deep technical specifications |
| Interface Control Document | WC-GW-ICD-v1.0 | Interface-level specifications for integration |
| System Integration Guide | WC-GW-SIG-v1.0 | Deployment architectures and third-party integration |
| Maintenance Manual | WC-GW-MG-v1.0 | Preventive maintenance procedures |
| Safety Manual | WC-GW-SM-v1.0 | Electrical and RF safety |
| Compliance Summary | WC-GW-CS-v1.0 | Regulatory compliance details |
| Solution Brief | WC-GW-SB-v1.0 | High-level product overview |

---

## 2. System Architecture

### 2.1 Role in the WakeCap Ecosystem

The WakeCap Gateway is the central communications hub in the WakeCap IoT monitoring ecosystem. It operates as a bridge between two network domains:

- **Mesh domain (downstream):** Communicates with field devices (Weather Stations, Smart Hats, Anchors, MODBUS Assets) over the WakeCap proprietary wireless mesh protocol (WMP).
- **WAN domain (upstream):** Transmits aggregated data to the WakeCap Cloud Platform via cellular (4G LTE) or Ethernet uplink.
- **Local management:** Provides a local configuration and diagnostic interface accessible over USB.

### 2.2 Four-Layer System Context

| Layer | Components | Function |
|-------|-----------|----------|
| Field Layer | Weather Stations, Smart Hats, Anchors, MODBUS Assets | Sensor data acquisition and worker safety monitoring |
| Edge Layer | WakeCap Gateway(s) | Mesh aggregation, store-and-forward, WAN uplink |
| Transport Layer | Cellular (4G LTE), Ethernet, Internet | Data transport to cloud |
| Cloud Layer | WakeCap Cloud Platform | Data storage, analytics, dashboards, API |

### 2.3 Data Flow

```
Field Devices --> Mesh Radio --> Gateway Processor --> Data Buffer --> WAN Uplink --> WakeCap Cloud
                                       |
                                 Local Storage
                             (store-and-forward)
```

1. Field devices transmit sensor readings and status messages over the mesh network.
2. The Gateway mesh radio receives and demodulates incoming packets.
3. The Gateway processor validates, timestamps, and queues data for transmission.
4. Data is transmitted to the WakeCap Cloud via the active WAN uplink (cellular or Ethernet).
5. If the WAN uplink is unavailable, data is stored locally and transmitted when connectivity is restored.

### 2.4 Communication Protocols

| Connection | Protocol | Direction | Data Rate | Notes |
|------------|----------|-----------|-----------|-------|
| Mesh devices to Gateway | WakeCap Mesh Protocol (WMP), proprietary | Bidirectional | [TBD] kbps | Star/multi-hop mesh topology |
| Gateway to Cloud (cellular) | MQTT over TLS | Bidirectional | Varies | 4G LTE Cat [TBD] |
| Gateway to Cloud (Ethernet) | MQTT over TLS | Bidirectional | 10/100 Mbps | TCP/IP |
| USB configuration | [TBD] (CDC ACM / virtual COM port) | Bidirectional | [TBD] | Local only |

### 2.5 Network Topology

The Gateway supports the following mesh topologies:

| Topology | Description | When to Use |
|----------|-------------|-------------|
| Star | All devices communicate directly with Gateway | Small sites, open areas, all devices within radio range |
| Star-of-stars | Devices communicate via Anchors to Gateway | Medium sites, obstructed areas, buildings |
| Multi-hop mesh | Devices relay through multiple Anchors | Large sites, complex terrain, vertical coverage |

Maximum mesh hops: [TBD] hops between end device and Gateway.

### 2.6 Internal Modules

| Module | Function | Notes |
|--------|----------|-------|
| Processor Board | Main CPU, memory, storage | [TBD] processor, [TBD] MB RAM |
| Mesh Radio Module | WakeCap mesh transceiver | [TBD] MHz band |
| Cellular Module | 4G LTE modem (cellular models) | [TBD] chipset |
| Power Management | Voltage regulation, protection | Input: [TBD] V DC |
| Local Storage | Non-volatile data buffer | [TBD] MB flash |

### 2.7 MQTT Topic Structure (Cloud Communication)

| Topic Pattern | QoS | Direction | Description |
|---------------|-----|-----------|-------------|
| `wakecap/gw/[serial]/telemetry` | [TBD] | GW to Cloud | Aggregated device telemetry |
| `wakecap/gw/[serial]/status` | [TBD] | GW to Cloud | Gateway heartbeat and status |
| `wakecap/gw/[serial]/event` | [TBD] | GW to Cloud | Events (association, alerts, errors) |
| `wakecap/gw/[serial]/buffered` | [TBD] | GW to Cloud | Store-and-forward backlog data |
| `wakecap/gw/[serial]/cmd` | [TBD] | Cloud to GW | Commands (config update, reboot, OTA) |
| `wakecap/gw/[serial]/cmd/resp` | [TBD] | GW to Cloud | Command acknowledgement/response |
| `wakecap/gw/[serial]/ota` | [TBD] | Cloud to GW | Firmware update delivery |
| `wakecap/gw/[serial]/ota/status` | [TBD] | GW to Cloud | OTA update progress and result |
| `wakecap/gw/[serial]/diag` | [TBD] | GW to Cloud | Diagnostic logs |

### 2.8 Deployment Architectures

#### Small Site (1-50 Field Devices)

- 1 Gateway, cellular backhaul, no redundancy
- 0 to [TBD] Anchors
- Direct star connections to field devices

#### Medium Site (50-200 Field Devices)

- [TBD] to [TBD] Gateways, Ethernet primary with cellular failover
- N+1 Gateway redundancy recommended
- [TBD] to [TBD] Anchors extending mesh coverage

#### Large Site (200+ Field Devices)

- [TBD] to [TBD] Gateways, Ethernet + fiber backbone, dual-WAN per Gateway
- N+1 per zone, power redundancy required
- [TBD] to [TBD] Anchors, multi-hop mesh

---

## 3. Technical Specifications

### 3.1 Electrical Specifications

| Parameter | Symbol | Min | Typ | Max | Unit |
|-----------|--------|-----|-----|-----|------|
| Input Voltage | V_IN | [TBD] | [TBD] | [TBD] | V DC |
| Current Draw (idle) | I_IDLE | -- | [TBD] | -- | mA |
| Current Draw (active) | I_ACT | -- | [TBD] | [TBD] | mA |
| Current Draw (peak TX) | I_PEAK | -- | -- | [TBD] | mA |
| Power Consumption (idle) | P_IDLE | -- | [TBD] | -- | W |
| Power Consumption (active) | P_ACT | -- | [TBD] | [TBD] | W |
| Reverse Polarity Protection | -- | -- | Yes (limited) | -- | -- |
| Overvoltage Protection | V_OVP | -- | -- | [TBD] | V DC |
| Undervoltage Lockout | V_UVLO | [TBD] | -- | -- | V DC |
| Inrush Current (at power-on) | I_INRUSH | -- | -- | [TBD] | mA |
| Ripple (max, peak-to-peak) | V_RIPPLE | -- | -- | [TBD] | mV pp |

#### Absolute Maximum Ratings

| Parameter | Min | Max | Unit |
|-----------|-----|-----|------|
| DC Input Voltage | [TBD] | [TBD] | V |
| ESD (HBM, all pins) | -- | [TBD] | kV |
| ESD (CDM, all pins) | -- | [TBD] | kV |

#### Power Consumption Profiles

| Operating Mode | Min | Typ | Max | Unit |
|----------------|-----|-----|-----|------|
| Full Active (Cell + Mesh TX) | [TBD] | [TBD] | [TBD] | W |
| Active (Mesh Only) | [TBD] | [TBD] | [TBD] | W |
| Active (Ethernet Backhaul) | [TBD] | [TBD] | [TBD] | W |
| Idle (Connected, No Traffic) | [TBD] | [TBD] | [TBD] | W |
| Low Power / Sleep | [TBD] | [TBD] | [TBD] | mW |

#### Internal Voltage Rails

| Rail Name | Voltage (V) | Max Current (mA) | Regulator Type | Supplies |
|-----------|-------------|-------------------|----------------|----------|
| VCC_CORE | [TBD] | [TBD] | [TBD] | Processor core |
| VCC_IO | [TBD] | [TBD] | [TBD] | Processor I/O |
| VCC_RADIO | [TBD] | [TBD] | [TBD] | Mesh radio module |
| VCC_CELL | [TBD] | [TBD] | [TBD] | Cellular module |
| VCC_ETH | [TBD] | [TBD] | [TBD] | Ethernet PHY |
| VCC_PERIPH | [TBD] | [TBD] | [TBD] | LEDs, sensors, misc. |

#### Battery Backup (if equipped)

| Parameter | Min | Typ | Max | Unit |
|-----------|-----|-----|-----|------|
| Battery Chemistry | [TBD] | -- | -- | -- |
| Nominal Voltage | [TBD] | [TBD] | [TBD] | V |
| Capacity | [TBD] | [TBD] | [TBD] | mAh |
| Battery Runtime | [TBD] | [TBD] | [TBD] | h |

### 3.2 Communication / Networking Specifications

#### Mesh Radio (WakeCap Mesh Protocol)

| Parameter | Value | Unit |
|-----------|-------|------|
| Protocol Name | WakeCap Mesh Protocol (WMP) | -- |
| Frequency Band | [TBD] | MHz |
| Channel Bandwidth | [TBD] | kHz |
| Number of Channels | [TBD] |-- |
| Transmit Power | [TBD] | dBm |
| Receiver Sensitivity | [TBD] | dBm |
| Modulation | [TBD] | -- |
| Data Rate (over-air) | [TBD] | kbps |
| Range (line of sight) | [TBD] | m |
| Range (non-line of sight) | [TBD] | m |
| Max Connected Devices | [TBD] | -- |
| Max Mesh Hops | [TBD] | -- |
| Antenna Connector | SMA female | -- |
| Antenna Gain | [TBD] | dBi |
| Antenna Type | Omnidirectional whip | -- |
| Antenna Impedance | 50 | ohm |
| Topology | Star / Multi-hop mesh | -- |
| Encryption | [TBD] | -- |
| Authentication | [TBD] | -- |

#### Mesh Capacity

| Parameter | Min | Typ | Max | Unit |
|-----------|-----|-----|-----|------|
| Supported Anchors per Gateway | [TBD] | [TBD] | [TBD] | nodes |
| Supported Sensors per Gateway | [TBD] | [TBD] | [TBD] | nodes |
| Supported Tags per Gateway | [TBD] | [TBD] | [TBD] | nodes |
| Total Mesh Nodes per Gateway | [TBD] | [TBD] | [TBD] | nodes |
| Mesh Join Time (single node) | [TBD] | [TBD] | [TBD] | s |
| Mesh Recovery Time (anchor loss) | [TBD] | [TBD] | [TBD] | s |

#### Cellular Specifications (Cellular Models)

| Parameter | Value | Unit |
|-----------|-------|------|
| Technology | 4G LTE Cat [TBD] | -- |
| Supported Technologies | LTE-M / NB-IoT / [TBD] | -- |
| Frequency Bands (LTE) | [TBD] | -- |
| Frequency Bands (NB-IoT) | [TBD] | -- |
| Frequency Bands (LTE-M) | [TBD] | -- |
| Fallback (2G/3G) | [TBD] | -- |
| SIM Type | [TBD] (Nano / Micro) | -- |
| SIM Slot Count | [TBD] | -- |
| Data Rate (downlink) | [TBD] | Mbps |
| Data Rate (uplink) | [TBD] | Mbps |
| Antenna Connector | [TBD] | -- |
| Antenna Impedance | 50 | ohm |

#### Ethernet Specifications

| Parameter | Value | Unit |
|-----------|-------|------|
| Standard | IEEE 802.3, 802.3u | -- |
| Speed | 10/100 (auto-negotiation) | Mbps |
| Duplex | Full / Half (auto-negotiation) | -- |
| Connector | RJ45 (8P8C), shielded | -- |
| Cable Requirement | Cat5e or better, shielded recommended | -- |
| Max Cable Length | 100 | m |
| MDI/MDI-X | Auto | -- |
| PoE Support | [TBD] | -- |

#### Ethernet Pinout (T-568B)

| Pin | Signal | Color (T-568B) | Direction |
|-----|--------|----------------|-----------|
| 1 | TX+ | White/Orange | Output |
| 2 | TX- | Orange | Output |
| 3 | RX+ | White/Green | Input |
| 4 | -- | Blue | Reserved |
| 5 | -- | White/Blue | Reserved |
| 6 | RX- | Green | Input |
| 7 | -- | White/Brown | Reserved |
| 8 | -- | Brown | Reserved |

#### Data Buffering (Store-and-Forward)

| Parameter | Value | Unit |
|-----------|-------|------|
| Local Storage Capacity | [TBD] | MB |
| Buffer Duration (typical load) | [TBD] | hours |
| Buffer Duration (max load) | [TBD] | hours |
| Data Retention on Power Loss | [TBD] | -- |
| Max Buffered Messages | [TBD] | -- |
| Buffer Full Policy | [TBD] (FIFO overwrite oldest) | -- |
| Buffer Flush Rate (on reconnect) | [TBD] | msg/s |

#### WAN Failover Behavior

| Parameter | Value | Unit |
|-----------|-------|------|
| Primary WAN | [TBD] (Cellular / Ethernet, configurable) | -- |
| Secondary WAN | [TBD] | -- |
| Failover Detection Time | [TBD] | s |
| Failover Trigger | [TBD] (MQTT disconnect / ICMP timeout / link loss) | -- |
| Failback Behavior | [TBD] (automatic / manual) | -- |
| Failback Detection Time | [TBD] | s |

### 3.3 Environmental Specifications

| Parameter | Min | Max | Unit |
|-----------|-----|-----|------|
| Operating Temperature | [TBD] | [TBD] | C |
| Storage Temperature | [TBD] | [TBD] | C |
| Storage Temperature (with battery) | [TBD] | [TBD] | C |
| Operating Humidity | [TBD] | [TBD] | % RH (non-condensing) |
| Storage Humidity | [TBD] | [TBD] | % RH (non-condensing) |
| Operating Altitude | 0 | [TBD] | m |
| Ingress Protection | -- | [TBD] | IP rating (IEC 60529) |
| Shock | -- | [TBD] | g (half-sine, 11 ms) |
| Vibration (random, 3-axis) | -- | [TBD] | g RMS |
| UV Resistance | -- | [TBD] | UV-stabilized |
| Salt Fog Resistance | -- | [TBD] | h (IEC 60068-2-52) |

#### Thermal Management

| Parameter | Value | Unit |
|-----------|-------|------|
| Max Junction Temperature | [TBD] | C |
| Thermal Resistance (junction-case) | [TBD] | C/W |
| Thermal Resistance (case-ambient) | [TBD] | C/W |
| Cooling Method | [TBD] (passive convection) | -- |
| Thermal Shutdown Threshold | [TBD] | C |
| Thermal Shutdown Hysteresis | [TBD] | C |

### 3.4 Mechanical Specifications

| Parameter | Value | Unit |
|-----------|-------|------|
| Dimensions (L x W x H) | [TBD] x [TBD] x [TBD] | mm |
| Weight (without antenna) | [TBD] | g |
| Weight (with antenna) | [TBD] | g |
| Weight (with battery) | [TBD] | g |
| Enclosure Material | [TBD] | -- |
| Enclosure Color | [TBD] | -- |
| Cable Entry | [TBD] | -- |
| Cable Gland Size | [TBD] | -- |
| Mounting | Wall, pole, DIN-rail | -- |
| Supported Pole Diameters | [TBD] to [TBD] | mm |
| Mounting Hole Pattern | [TBD] x [TBD] | mm |
| Weight Capacity (bracket) | [TBD] | kg |

### 3.5 Processor Subsystem

| Parameter | Value |
|-----------|-------|
| Manufacturer | [TBD] |
| Part Number | [TBD] |
| Architecture | [TBD] |
| Core Count | [TBD] |
| Clock Frequency | [TBD] MHz |
| Flash (Internal) | [TBD] MB |
| RAM (Internal) | [TBD] MB |
| Operating Voltage | [TBD] V |

### 3.6 Local Storage

| Parameter | Value |
|-----------|-------|
| Storage Type | [TBD] |
| Capacity | [TBD] MB |
| Interface | [TBD] |
| Read Speed | [TBD] MB/s |
| Write Speed | [TBD] MB/s |
| Wear Leveling | [TBD] |
| Data Retention | [TBD] years |
| Write Endurance | [TBD] cycles |

#### Storage Partitions

| Partition | Size (MB) | Purpose |
|-----------|-----------|---------|
| Bootloader | [TBD] | Primary and backup bootloader images |
| Firmware A | [TBD] | Active firmware image |
| Firmware B | [TBD] | Backup/rollback firmware image |
| Configuration | [TBD] | Device config, certificates, keys |
| Data Buffer | [TBD] | Offline data store-and-forward |
| Logs | [TBD] | System and diagnostic logs |

### 3.7 Reliability Data

| Parameter | Value | Unit |
|-----------|-------|------|
| MTBF (Predicted, Telcordia SR-332) | [TBD] | h |
| MTBF (Predicted, MIL-HDBK-217F) | [TBD] | h |
| Design Life | [TBD] | years |
| Warranty Period | [TBD] | years |
| Firmware Update Cycles | [TBD] | cycles |
| Power Cycle Endurance | [TBD] | cycles |
| Connector Mate/Unmate Cycles | [TBD] | cycles |

### 3.8 Certifications and Compliance

| Certification | Status | Certificate Number |
|---------------|--------|--------------------|
| CE (RED 2014/53/EU) | [TBD] | [TBD] |
| FCC Part 15, Subpart C | [TBD] | [TBD] |
| IC RSS-247 | [TBD] | [TBD] |
| RoHS (2011/65/EU) | [TBD] | [TBD] |
| REACH | [TBD] | [TBD] |

---

## 4. Interfaces

### 4.1 Interface Summary

| # | Interface | Type | Direction | Connector | Protocol | Data Rate | Notes |
|---|-----------|------|-----------|-----------|----------|-----------|-------|
| IF-01 | Mesh Radio | Wireless RF | Bidirectional | Internal (antenna via SMA) | WakeCap Mesh Protocol (WMP) | [TBD] kbps | Proprietary mesh network |
| IF-02 | Ethernet | Wired, copper | Bidirectional | RJ45 (8P8C) | TCP/IP, MQTT over TLS | 10/100 Mbps | IEEE 802.3 |
| IF-03 | Cellular | Wireless RF | Bidirectional | Internal (antenna via [TBD]) | TCP/IP, MQTT over TLS | [TBD] Mbps | 4G LTE Cat [TBD] |
| IF-04 | USB | Wired | Bidirectional | USB Type [TBD] | [TBD] serial / CLI | [TBD] kbps | Local configuration only |
| IF-05 | DC Power Input | Wired | Input only | [TBD] barrel / terminal | N/A (electrical) | N/A | [TBD] V DC |
| IF-06 | SIM Card Slot | Contact-based | Bidirectional | [TBD] SIM tray | ISO 7816 / ETSI TS 102.221 | N/A | Nano or Micro SIM |
| IF-07 | Antenna Port | RF coaxial | N/A (passive) | SMA female | N/A (RF feed) | N/A | 50 ohm impedance |

### 4.2 DC Power Input

| Pin / Terminal | Signal | Description |
|----------------|--------|-------------|
| V+ (center / positive) | V_IN | Positive DC input |
| V- / GND (sleeve / negative) | GND | DC ground / return |
| Shield (if applicable) | PE | Protective earth / chassis ground |

Connector type: [TBD] barrel connector / [TBD] terminal block

### 4.3 Ethernet Port

- RJ45 pinout: T-568B (see Section 3.2)
- Link LED: Green solid = link established; Off = no link
- Activity LED: Amber blinking = data traffic; Off = no traffic

### 4.4 SIM Card Slot

| Parameter | Value |
|-----------|-------|
| SIM Form Factor | [TBD] (Nano / Micro / Mini) |
| Standard | ISO 7816, ETSI TS 102.221 |
| Voltage | [TBD] V DC |
| Insertion Method | Push-push (push to insert, push to eject) |
| Hot-Swap | No (power off required) |

#### SIM Pinout (per ISO 7816)

| Pin | Signal | Description |
|-----|--------|-------------|
| C1 | VCC | Supply voltage ([TBD] V DC) |
| C2 | RST | Reset |
| C3 | CLK | Clock |
| C5 | GND | Ground |
| C6 | VPP | Programming voltage (not used) |
| C7 | I/O | Data input/output |

### 4.5 USB Port

| Parameter | Value |
|-----------|-------|
| USB Standard | USB [TBD] |
| Connector (device side) | [TBD] |
| Connector (host side) | USB Type-A (standard) |
| Data Rate | [TBD] kbps |
| Power Output (to host) | None |
| ESD Protection | [TBD] kV |

The USB port is intended for local configuration and diagnostics only.

#### USB CLI Commands

| Command | Description |
|---------|-------------|
| `status` | Display Gateway status summary |
| `config show` | Display current configuration |
| `config set [key] [value]` | Set a configuration parameter |
| `config save` | Save configuration to non-volatile storage |
| `network status` | Display WAN and mesh network status |
| `mesh devices` | List associated mesh devices |
| `diag log` | Display recent diagnostic log entries |
| `firmware version` | Display firmware and bootloader versions |
| `reboot` | Reboot the Gateway |
| `factory-reset` | Reset Gateway to factory defaults (requires confirmation) |

### 4.6 Antenna Port (SMA)

| Parameter | Value | Unit |
|-----------|-------|------|
| Connector Type | SMA female (jack) | -- |
| Impedance | 50 | ohm |
| Frequency Range | [TBD] to [TBD] | MHz |
| Max Input Power | [TBD] | dBm |
| VSWR (with supplied antenna) | < [TBD]:1 | -- |
| Mating Cycles | [TBD] | cycles |
| Torque (max) | [TBD] | N m |

### 4.7 Reset Button

| Parameter | Value |
|-----------|-------|
| Button Type | [TBD] |
| Recessed (tool required) | [TBD] |
| Short Press (< [TBD] s) | [TBD] (Action) |
| Long Press ([TBD]-[TBD] s) | [TBD] (Action) |
| Very Long Press (> [TBD] s) | Factory reset |

### 4.8 Status LED

| LED Pattern | Color | Status | Meaning |
|-------------|-------|--------|---------|
| Solid | Green | Normal | Connected to cloud, mesh active |
| Slow blink (1 per 5 s) | Green | Connecting | Establishing cloud connection |
| Fast blink | Green | Data transfer | Active data upload in progress |
| Solid | Amber | Warning | Connected locally, no cloud uplink |
| Blink | Amber | Mesh only | Mesh active, no WAN connection |
| Solid | Red | Fault | Hardware or critical software error |
| Blink | Red | Boot error | Failed to initialize |
| Off | -- | No power | No power supply to device |

#### Detailed LED States (Technical Reference)

| LED | State | Pattern | Meaning |
|-----|-------|---------|---------|
| Power | Solid Green | Continuous ON | DC power OK |
| Power | Solid Amber | Continuous ON | Running on battery backup |
| Power | Blinking Red | [TBD] Hz | Low battery / power fault |
| Power | Off | -- | No power |
| Mesh | Solid Green | Continuous ON | Mesh active, nodes connected |
| Mesh | Blinking Green | [TBD] Hz | Mesh initializing/scanning |
| Mesh | Blinking Amber | [TBD] Hz | Mesh degraded (node loss) |
| Mesh | Off | -- | Mesh radio disabled |
| Cell | Solid Green | Continuous ON | Cellular connected |
| Cell | Blinking Green | [TBD] Hz | Cellular registering |
| Cell | Blinking Red | [TBD] Hz | Cellular connection failed |
| Cell | Off | -- | Cellular disabled/not equipped |
| Cloud | Solid Green | Continuous ON | Cloud connected, data flowing |
| Cloud | Blinking Green | [TBD] Hz | Cloud connecting / authenticating |
| Cloud | Blinking Amber | [TBD] Hz | Cloud connected, data buffered |
| Cloud | Solid Red | Continuous ON | Cloud authentication failure |
| Cloud | Off | -- | No backhaul available |
| Status | Solid Green | Continuous ON | Normal operation |
| Status | Blinking Green | [TBD] Hz | Firmware update in progress |
| Status | Solid Red | Continuous ON | Critical fault |
| Status | Blinking Red/Green | [TBD] Hz alternating | Factory reset in progress |

---

## 5. Installation & Deployment

### 5.1 Pre-Installation Requirements

| Requirement | Specification |
|-------------|---------------|
| Power supply | [TBD] V DC, [TBD] W minimum |
| Network | Ethernet LAN or cellular coverage at installation point |
| Mounting surface | Structural surface capable of supporting [TBD] kg |
| Ambient temperature | [TBD] C to [TBD] C |
| Ventilation | Minimum [TBD] mm clearance on all sides |
| Line of sight | Clear path to mesh device antennas preferred |
| Elevation | Mount [TBD] m above ground level for optimal mesh coverage |

### 5.2 Required Tools

- Phillips screwdriver (#2)
- Adjustable wrench or [TBD] mm socket
- Cable ties
- Multimeter (DC voltage measurement)
- Drill with [TBD] mm bit (if wall mounting)
- Level
- Laptop with USB port (for initial configuration, if required)

### 5.3 Required Qualifications

- Basic knowledge of DC electrical wiring
- Familiarity with network equipment (Ethernet, SIM cards)
- Authorization to work at the installation site

### 5.4 Mounting Options

| Method | Description | When to Use |
|--------|-------------|-------------|
| Wall mount | Bracket fixed to vertical surface | Indoor / sheltered outdoor |
| Pole mount | Bracket clamped to vertical pole (U-bolt) | Outdoor, elevated position |
| DIN rail | DIN-rail clip (accessory) | Electrical cabinet installation |

#### Mounting Orientation

- Mount with antenna connector pointing **upward**
- Ensure status LED is visible from the ground
- Maintain minimum [TBD] mm clearance around the enclosure for ventilation

### 5.5 Wall Mounting Procedure

1. Position the mounting bracket at the desired location. Use a level to ensure plumb.
2. Mark the hole positions. Hole spacing: [TBD] mm x [TBD] mm.
3. Drill holes using a [TBD] mm drill bit.
4. Insert wall anchors (if required).
5. Secure the mounting bracket using provided screws. Torque: [TBD] N m.
6. Attach the Gateway to the bracket (engage top hooks first, then secure bottom latch).

### 5.6 Pole Mounting Procedure

1. Position the pole mounting bracket around the pole. Supported diameters: [TBD] mm to [TBD] mm.
2. Insert the U-bolt through the bracket holes and around the pole.
3. Tighten U-bolt nuts evenly to [TBD] N m.
4. Attach the Gateway to the mounting bracket.

### 5.7 Antenna Installation

1. Thread the antenna connector onto the Gateway antenna port.
2. Hand-tighten, then snug with [TBD] turn using a wrench. Torque: [TBD] N m maximum.
3. Orient the antenna vertically for optimal omnidirectional coverage.

### 5.8 Power Connection

1. Route the power cable from the power source to the Gateway.
2. Connect the positive (+) lead to the V+ terminal.
3. Connect the negative (-) lead to the V-/GND terminal.
4. Verify correct polarity with a multimeter before energizing.

### 5.9 Network Connection

- **Ethernet:** Insert RJ45 connector into the Ethernet port until the latch clicks.
- **Cellular:** Power off the Gateway. Open SIM slot cover. Insert SIM card with contacts facing [TBD], notched corner oriented [TBD]. Push until it clicks. Close and seal slot cover.

### 5.10 Cable Management

- Secure all cables using cable ties at [TBD] mm intervals
- Ensure cables have drip loops before entering the enclosure
- Do not exceed minimum bend radius of [TBD] mm for Ethernet cables

### 5.11 Power-Up and Verification

1. Apply power. Status LED illuminates within [TBD] seconds.
2. Wait [TBD] seconds for initialization. LED transitions to slow blink green.
3. Wait for cloud connection. LED changes to solid green.
4. First boot may take up to [TBD] minutes for initial configuration download.

### 5.12 Network Configuration

- **Ethernet (DHCP, default):** Connect to a network with a DHCP server. IP address obtained automatically.
- **Ethernet (Static IP):** Connect via USB, open configuration utility, set static IP/subnet/gateway/DNS, save and reboot.
- **Cellular:** Ensure SIM installed. Verify APN via USB utility. Default APN: [TBD]. Auto-connects on power-up.

### 5.13 Configurable Parameters

| Parameter | Default | Range | Notes |
|-----------|---------|-------|-------|
| Device name | [TBD] | 1-32 characters | Displayed on Dashboard |
| Mesh channel | [TBD] | [TBD] | Must match all mesh devices |
| Mesh TX power | [TBD] | [TBD] to [TBD] dBm | Higher = more range, more power |
| Data upload interval | [TBD] | [TBD] to [TBD] s | Lower = more responsive, more data |
| WAN priority | Cellular | Cellular / Ethernet | Primary uplink selection |
| APN | [TBD] | -- | Cellular APN setting |
| Static IP | DHCP | -- | Ethernet IP configuration |
| NTP server | [TBD] | -- | Time synchronization |

### 5.14 Operating Modes

| Mode | Description | LED | Trigger |
|------|-------------|-----|---------|
| Normal | Full operation, cloud connected | Solid green | Default |
| Connecting | Establishing WAN connection | Slow blink green | Power-up / reconnect |
| Mesh Only | Mesh active, no WAN | Blink amber | WAN failure |
| Local Only | No mesh, no WAN | Solid amber | Antenna / radio issue |
| Firmware Update | Applying OTA update | [TBD] | Cloud command |
| Safe Mode | Minimal operation, diagnostics only | [TBD] | Boot failure recovery |

### 5.15 Firmware Updates

Firmware updates are delivered OTA from the WakeCap Cloud Platform or locally via USB:

| Method | Trigger | Max Image Size | Duration |
|--------|---------|---------------|----------|
| OTA (Cloud-pushed) | Cloud command | [TBD] MB | [TBD] min |
| USB (Local) | USB tool + file | [TBD] MB | [TBD] min |
| Ethernet (Local) | [TBD] | [TBD] MB | [TBD] min |

The Gateway supports dual-bank (A/B) firmware with rollback capability.

### 5.16 Maintenance Schedule

| Task | Frequency |
|------|-----------|
| Visual inspection | Monthly |
| Connection integrity check | Quarterly |
| Enclosure seal inspection | Every 6 months |
| Antenna inspection | Every 6 months |
| Full system health check | Annually |
| Firmware review | As released |

### 5.17 Spare Parts

| Part | Part Number | Compatible Revisions |
|------|-------------|---------------------|
| External antenna | [TBD] | [TBD] |
| Mounting bracket | [TBD] | [TBD] |
| Mounting hardware set | [TBD] | [TBD] |
| Power cable | [TBD] | [TBD] |
| Enclosure seal kit | [TBD] | [TBD] |
| Ethernet patch cable | [TBD] | [TBD] |

---

## 6. Safety Information

### 6.1 General Safety

Read all safety information before installing, operating, or servicing the Gateway. Failure to follow safety instructions may result in equipment damage, personal injury, or death.

The WakeCap Gateway is NOT classified as a safety-critical device. It must not be used as the sole means of personnel safety monitoring in hazardous environments.

### 6.2 Electrical Safety

- **DANGER:** Do not troubleshoot a Gateway mounted on an elevated mast during an electrical storm. Lightning strike can cause death.
- **WARNING:** The Gateway operates on DC power. De-energize the power source and verify zero voltage before connecting, disconnecting, or servicing electrical connections. Contact with energized conductors can cause electrical shock.
- **CAUTION:** Reversed polarity may permanently damage internal components. While the Gateway includes basic reverse polarity protection, sustained reverse voltage may cause damage. Always verify polarity before applying power.

### 6.3 Radio Frequency Safety

- **CAUTION:** The Gateway transmits radio frequency energy. Maintain a minimum separation distance of [TBD] mm between the antenna and persons during operation. Do not operate the device with the antenna removed or damaged.
- **CAUTION:** Do not power on the Gateway without the antenna connected. Transmitting without an antenna may damage the radio module.

### 6.4 Installation Safety

- **WARNING:** If the Gateway is mounted at an elevated position, use appropriate fall-protection equipment and follow site safety procedures. Falls from height can cause serious injury or death.
- **WARNING:** Verify there are no concealed electrical cables or pipes behind the mounting surface before drilling.
- **NOTICE:** Handle internal components with ESD precautions. Touch a grounded metal surface before handling the processor board or radio modules.
- **NOTICE:** The Gateway enclosure must remain sealed during operation. Opening the enclosure in the field voids the IP rating and may expose internal components to moisture and dust damage.

### 6.5 Battery Safety

- **CAUTION:** Battery replacement must be performed only by qualified personnel. Use only WakeCap-approved replacement batteries. Incorrect battery type may result in fire or explosion risk.

### 6.6 Firmware Update Safety

- **NOTICE:** Do not remove power during a firmware update. Interrupting an update may require a factory reset or RMA.

### 6.7 Operating Conditions

- **NOTICE:** The Gateway is rated for outdoor use within specified environmental limits. Operating outside these limits may cause malfunction or permanent damage not covered by warranty.

### 6.8 Safety-Related Firmware Behaviors

| Behavior | Description |
|----------|-------------|
| Thermal Shutdown | Processor halts and enters safe state at [TBD] C |
| Battery Over-Temperature | Charging suspended at [TBD] C |
| Overvoltage Lockout | Input power disconnected above [TBD] V |
| Watchdog Reset | System resets if firmware hangs for > [TBD] s |
| Graceful Shutdown (Low Battery) | Buffers flushed and state saved at [TBD] V |
| Tamper Alert | [TBD] notification sent on enclosure breach detection |

### 6.9 PPE Requirements

- Safety helmet (mandatory on construction sites)
- Safety footwear
- High-visibility vest (if working near traffic or machinery)
- Fall-protection harness (if working at height)
- ESD wrist strap (if accessing internal components)

---

## 7. Troubleshooting

### 7.1 Triage Flowchart

```
START: Gateway not behaving as expected
|
|--- Is the Gateway LED illuminated?
|    |
|    +--- NO -------> POWER ISSUE (Section 7.2)
|    |
|    +--- YES ------> What color/pattern is the LED?
|         |
|         +--- Solid RED or Blink RED -------> HARDWARE FAULT (Section 7.2)
|         +--- Solid GREEN -------> Check mesh and data issues (Section 7.4, 7.5)
|         +--- Solid AMBER or Blink AMBER -------> CONNECTIVITY ISSUE (Section 7.3)
|         +--- Slow blink GREEN (1/5s) -------> CONNECTING (wait or Section 7.3)
```

### 7.2 Power Issues

| Symptom | Possible Cause | Solution |
|---------|----------------|----------|
| LED off | No power | Check power supply voltage ([TBD] V DC); verify connector and polarity |
| LED off | Power cable disconnected or damaged | Inspect cable for cuts, loose terminals; replace or re-terminate |
| LED off | Blown fuse or tripped breaker upstream | Check fuse/breaker at distribution point; replace/reset |
| LED off | Reversed polarity | Measure polarity at terminals; correct wiring |
| LED solid red | Boot failure / firmware corrupt | Power cycle (remove power 10s, reapply); attempt firmware recovery via USB |
| LED blink red | Hardware initialization failure | Verify antenna connected; check for visible damage; power cycle |
| Gateway reboots periodically | Unstable power supply (voltage sag/ripple) | Monitor supply voltage; must remain within [TBD] V DC; replace supply or add filtering |
| Gateway reboots during high mesh traffic | Power supply undersized | Check supply wattage vs. Gateway peak ([TBD] W max); upgrade supply |
| Gateway resets to factory defaults | Reset button held unintentionally (vibration) | Reposition or add protective cover over reset button |

### 7.3 Connectivity Issues

| Symptom | Possible Cause | Solution |
|---------|----------------|----------|
| LED amber, no cloud | Primary uplink (cellular or Ethernet) down | Check physical connections; restore uplink |
| LED amber after firmware update | New firmware requires updated endpoint/certificate | Check release notes; apply config update via USB |
| No cellular connection | SIM card not seated | Power off; remove and reinsert SIM until it clicks |
| No cellular connection | SIM card inactive/expired | Test SIM in a phone; activate with carrier or replace |
| No cellular connection | Incorrect APN | Check/update APN via USB configuration utility |
| No cellular connection | Insufficient signal | Required: [TBD] dBm minimum; relocate Gateway or add external antenna |
| Ethernet link LED off | Cable disconnected or damaged | Inspect cable; replace if needed; try different switch port |
| Ethernet link LED on, no IP | DHCP server unavailable | Restore DHCP or assign static IP via USB |
| Ethernet link LED on, no cloud | Firewall blocking traffic | Gateway requires outbound access to [TBD] on port [TBD]; add firewall rule |
| Intermittent connectivity | Unstable power, thermal throttling, network congestion | Stabilize power; check ambient temp; check carrier service |
| Slow data throughput | Weak cellular signal, network congestion, buffer backlog | Improve antenna; isolate on dedicated VLAN; wait for buffer to clear |

### 7.4 Mesh Network Issues

| Symptom | Possible Cause | Solution |
|---------|----------------|----------|
| No mesh devices visible | Antenna disconnected or damaged | Reconnect or replace antenna |
| No mesh devices visible | Mesh radio disabled | Enable via USB configuration utility; reboot |
| No mesh devices visible | All devices out of range | Verify at least one device within [TBD] m with line of sight |
| No mesh devices visible | Mesh channel mismatch | Align all devices to the same channel |
| Specific device not associating | Out of range or obstructed | Move closer or add intermediate Anchor |
| Specific device not associating | Device firmware incompatible | Update device or Gateway firmware to compatible versions |
| Devices dropping intermittently | Marginal signal (edge of range) | Check RSSI (min: [TBD] dBm); add Anchor to strengthen path |
| Devices dropping at certain hours | Environmental change (cranes, vehicles) | Reposition mesh nodes to avoid temporary obstructions |
| All mesh devices drop simultaneously | Gateway mesh radio crash | Check logs; update firmware |
| Devices drop after Gateway power cycle | Normal re-association delay | Wait [TBD] minutes for all devices to re-associate |

### 7.5 Data Issues

| Symptom | Possible Cause | Solution |
|---------|----------------|----------|
| Data gaps on Dashboard | Gateway lost connectivity; buffer overflowed | Restore connectivity; data within buffer window uploads automatically |
| Data gaps, Gateway online | Mesh device was offline during that period | Troubleshoot specific device |
| OTA firmware update fails | Insufficient bandwidth or connectivity interruption | Switch to Ethernet; retry; Gateway should resume from checkpoint |
| Configuration lost after reboot | Configuration not saved ("Save" not executed) | Reconfigure and explicitly save; power cycle to verify |

### 7.6 Cloud Issues

| Symptom | Possible Cause | Solution |
|---------|----------------|----------|
| LED green, Dashboard empty | Dashboard not configured to display this Gateway | Assign Gateway to correct site; configure sensor display |
| LED green, Dashboard says "Offline" | Wrong cloud environment (staging vs. production) | Correct endpoint via USB utility |
| LED green, Dashboard says "Offline" | Clock/time sync issue (certificate validation failing) | Correct time or enable NTP; reboot |
| Dashboard errors/timeouts | WakeCap Cloud service disruption | Check service status page; Gateway buffers locally |

### 7.7 Diagnostic Codes

| Code | Severity | Description |
|------|----------|-------------|
| GW-E001 | Critical | Power supply voltage out of range |
| GW-E002 | Critical | Mesh radio initialization failure |
| GW-E003 | Critical | Firmware CRC check failed |
| GW-E010 | Error | Cellular modem not responding |
| GW-E011 | Error | SIM card not detected |
| GW-E012 | Error | Cellular registration failed |
| GW-E013 | Error | Cellular data connection timeout |
| GW-E020 | Error | Ethernet link down |
| GW-E021 | Error | DHCP timeout |
| GW-E022 | Error | DNS resolution failure |
| GW-E023 | Error | Cloud endpoint unreachable |
| GW-E030 | Warning | Mesh device association limit reached |
| GW-E031 | Warning | Mesh channel interference detected |
| GW-E040 | Warning | Local data buffer [TBD]% full |
| GW-E041 | Error | Local data buffer full -- oldest data being overwritten |
| GW-E050 | Info | Firmware update available |
| GW-E051 | Error | Firmware update download failed |
| GW-E052 | Error | Firmware update apply failed |
| GW-E060 | Warning | System temperature high |
| GW-E061 | Critical | System temperature critical -- shutting down |
| GW-E070 | Info | Configuration changed |
| GW-E071 | Warning | Configuration reset to factory defaults |
| GW-E080 | Warning | Clock synchronization failed |

### 7.8 Escalation Severity Levels

| Severity | Definition | Expected Response |
|----------|-----------|-------------------|
| P1 -- Critical | Total loss of function; no workaround; safety impact | [TBD] hours |
| P2 -- High | Major function lost; no workaround | [TBD] hours |
| P3 -- Medium | Partial function lost; workaround available | [TBD] business days |
| P4 -- Low | Minor issue; minimal operational impact | [TBD] business days |

### 7.9 When to Contact Support

- Issue persists after following troubleshooting procedures
- LED solid red after power cycle
- Physical damage to the enclosure or components
- Repeated connectivity failures without identifiable cause
- Firmware update failure (three consecutive attempts)
- Hardware fault suspected (burn marks, unusual odors, sparking)
- Multiple Gateways affected simultaneously

**Provide to support:** Gateway serial number, firmware version, symptom description, LED pattern, diagnostic steps completed, log files, Dashboard screenshots, installation photos.

### 7.10 Factory Reset Procedure

1. Press and hold the Reset button for [TBD] seconds.
2. LED blinks [TBD] rapidly.
3. Release button -- Gateway restarts with factory defaults.

Factory reset erases all local configuration. Mesh devices must re-associate.

---

## 8. Glossary

| Term | Definition |
|------|------------|
| Anchor | WakeCap Mesh Anchor -- a fixed-position mesh relay and localization node |
| APN | Access Point Name -- cellular network configuration parameter |
| Backhaul | The communication link between Gateway and cloud (cellular or Ethernet) |
| BMS | Building Management System |
| CEP50 | Circular Error Probable, 50th percentile |
| DHCP | Dynamic Host Configuration Protocol -- automatic IP address assignment |
| DIN rail | Standard metal rail for mounting industrial control equipment |
| ESD | Electrostatic Discharge -- sudden flow of static electricity |
| eSIM | Embedded SIM -- soldered to PCB and remotely provisionable |
| Gateway | WakeCap Gateway -- the central hub aggregating mesh data and providing backhaul |
| HBM | Human Body Model -- an ESD test model |
| LOS | Line of Sight -- unobstructed radio propagation path |
| LTE-M | Long Term Evolution for Machines -- low-power wide-area cellular standard |
| Mesh | WakeCap proprietary mesh network connecting field devices to the Gateway |
| MODBUS Asset | A WakeCap device bridging MODBUS-compatible industrial sensors into the mesh |
| MQTT | Message Queuing Telemetry Transport -- lightweight messaging protocol |
| MTBF | Mean Time Between Failures |
| NB-IoT | Narrowband Internet of Things -- low-power wide-area cellular standard |
| NLOS | Non-Line of Sight -- obstructed radio propagation path |
| NTP | Network Time Protocol -- clock synchronization protocol |
| OTA | Over-the-Air -- wireless delivery of firmware or configuration |
| PAN | Personal Area Network |
| PoE | Power over Ethernet -- delivering electrical power over Ethernet cabling |
| RMA | Return Merchandise Authorization -- process for returning defective hardware |
| RTOS | Real-Time Operating System |
| SCADA | Supervisory Control and Data Acquisition |
| SMA | SubMiniature version A -- coaxial RF connector type |
| SoC | System on Chip |
| Store-and-Forward | Local buffering of data when backhaul is unavailable, with automatic upload on reconnect |
| Superframe | The repeating time-division structure of the mesh radio protocol |
| Tag | WakeCap Smart Helmet tag -- a wearable device for personnel tracking |
| TLS | Transport Layer Security -- cryptographic protocol for secure communication |
| TPM | Trusted Platform Module |
| VSWR | Voltage Standing Wave Ratio -- a measure of antenna impedance match quality |
| WAN | Wide Area Network -- network connecting to external/cloud services |
| WMP | WakeCap Mesh Protocol -- proprietary wireless mesh protocol |
| WS Box | WakeCap Weather Station Box -- an environmental sensor enclosure |

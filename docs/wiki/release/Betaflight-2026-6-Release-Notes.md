---
sidebar_position: 1
sidebar_label: 2026.6 Release Notes
---

# 2026.6 Release Notes

Welcome to Betaflight 2026.6! This release introduces autonomous flight planning, new platform support for ESP32 and STM32H5/N6/C5 processors, switchable battery profiles, optical flow position hold, a fully modernised app with progressive adoption of the Nuxt UI component library, foundational CAN peripheral support, and a wide range of sensor, protocol, and hardware additions.

We have tried to make this release as bug-free as possible. If you still find a **bug**, please report it by opening an **issue on our [GitHub tracker](https://github.com/betaflight/betaflight/issues)**.

Always remember there is a dedicated [Discord](https://discord.gg/n4E6ak4u3c) server for help, support and general community.

## 1. The App

:::note
Please use the Progressive Web App (PWA) located [online](https://app.betaflight.com).
:::

The app continues to use the same release version as the compatible firmware (2026.6) and updates automatically online.

### 1.1 Complete Vue 3 and Pinia Migration

The entire app has been rebuilt on **Vue 3** with **Pinia** state management, replacing the legacy jQuery framework. Every tab has been rewritten as a modern Vue Single File Component. This delivers faster load times, smoother interactions, and a more consistent experience across the app. jQuery and all legacy plugins have been fully removed.

### 1.2 Nuxt UI Component Library Migration

Building on the Vue 3 migration, the app is progressively adopting the **Nuxt UI** component library for a more consistent, modern, and accessible interface. Nuxt UI's theming is synchronised with the app's light/dark themes, and responsive breakpoints are improved throughout.

The following tabs and components have been converted so far:

* **App shell** -- connection/flasher buttons, port selection, and firmware virtual options
* **Options** tab
* **Documentation & Support** tab
* **Blackbox** tab (with improved search)
* **Firmware Flasher** tab
* **Power** tab
* **Flight Plan** tab
* **Autotune** tab
* **Login** dialog
* PID Tuning number inputs

Additional tabs will continue to be migrated to Nuxt UI in follow-up releases.

### 1.3 Flight Planning UI (Experimental)

A new **Flight Plan** tab lets you visually plan autonomous missions on an interactive map. You can add, edit, and reorder waypoints, view elevation profiles, and save or load flight plans directly from the flight controller. Note that the underlying autopilot firmware is experimental and currently only tested in SITL simulation -- it is not yet flight-ready.

### 1.4 Battery Profile Support

The app now supports switching between **multiple battery profiles** configured on the flight controller, making it easy to swap between different battery types without reconfiguring.

### 1.5 Autotune Tab (Experimental)

A new **Autotune** tab provides a file-based workflow for analysing flight-controller tuning from a blackbox log. It imports a log containing chirp sweep data, computes the closed-loop frequency response using Welch's method, and recommends **Simplified Tuning** slider values based on bandwidth, phase margin, resonant peak, and noise floor.

The tab works without a flight controller connected. When connected, the **Apply Gains** button writes the recommended simplified-tuning values back via MSP. Segmentation of chirp data is driven by the `BOXCHIRP` flight-mode bit.

### 1.6 User Accounts, Backups, and Cloud Sync

A new **WebAuthn-based login** system lets you securely save and manage configuration backups in the cloud, organised by aircraft. Backups can be downloaded, edited, and deleted. Includes avatar editing and automatic backup functionality.

An **email-code login** option is also available as an alternative to passkeys, for browsers where WebAuthn is unreliable (for example, Safari). The redesigned login dialog offers a primary passkey button, a passkey-setup link, and a toggle to switch into email request/verify steps.

### 1.7 Colour Themes

Three new colour themes are available in the Options tab: **Yellow** (default), **Amber**, and **High Contrast**, giving you more control over the app's appearance.

### 1.8 Preflight Environment Check

A new **Preflight** tab displays real-time conditions critical for safe flying: weather (temperature, wind, visibility, precipitation), solar activity (Kp index), battery status, density altitude, civil twilight window, fog probability, and location elevation. Supports geolocation and saved favourite flying spots.

### 1.9 Board Qualification

The Firmware Flasher now shows **board qualification status** -- whether a target is officially verified (Verified Partner), community-supported (Vendor/Community), or legacy -- helping you understand support levels before flashing.

### 1.10 Responsive and Mobile Improvements

* Responsive header bar that adapts to different screen sizes
* Improved landscape mobile layouts
* Responsive GPS tab with flexible grid layout
* Overall better usability on tablets and phones

### 1.11 Other App Changes

* **Sensor hardware display** separated from GPS protocols in the Sensors tab
* **Simplified Master Slider** and **adjCenter/adjScale** added to the Adjustments tab
* **OSD time variant** element support
* **sslip.io** support for local network development with Android devices
* Adaptive launcher icons for Android (light/dark mode support)
* Updated to Capacitor 8.0.2 for improved Android compatibility

### 1.12 App Bug Fixes

* Fixed DFU flashing stalling after Vue migration
* Fixed motor testing not working
* Fixed CLI console issues
* Fixed dynamic notch filter setting when switching bidirectional DShot
* Fixed preset warning dialog being hidden
* Fixed beeper config initial load and bulk toggle refresh
* Fixed GNSS feature enabling in Ports tab
* Fixed servo index display order
* Fixed reconnection progress and DFU waiting issues
* Fixed race conditions in reboot timestamp tracking and compass availability
* Fixed GPS and blackbox tabs not loading due to undefined references
* Security fix for CVE-2026-39315

## 2. The Firmware

### 2.1 Key New Features

#### Autopilot Mode and Flight Plans (Experimental -- SITL Only)

:::danger
Autopilot is **experimental** and currently only tested in SITL (Software In The Loop) simulation. It is **not flight-ready** and must not be used on real aircraft. This feature is included for development and testing purposes only.
:::

Betaflight now includes an experimental **autopilot with GPS waypoint navigation** for both multirotors and fixed-wing aircraft. Define flight plans with up to 30 waypoints, and the craft will autonomously navigate between them with configurable speed, altitude, and hold behaviour.

**Setup (SITL testing only):**
* Assign the `AUTOPILOT` flight mode to a switch in the Modes tab
* Use the `waypoint` CLI command to add, edit, or dump waypoints
* Configure behaviour with `set ap_hover_throttle`, `set ap_landing_altitude_m`, velocity PID terms, and geofence limits
* Set an RX loss policy: disable autopilot, continue the mission, or land

The system supports velocity-based position control, spiral landing descent, configurable waypoint arrival and hold radii, and multiple yaw modes (velocity, bearing, hybrid, fixed, or dampener for wings).

#### Switchable Battery Profiles

Store **multiple battery profiles** with independent voltage thresholds, cell counts, and capacity settings. Switch profiles from the CLI or over MSP when swapping between different battery types.

**Setup:**
* Use `battery_profile <index>` in the CLI to switch profiles
* Each profile has its own `vbatmaxcellvoltage`, `vbatmincellvoltage`, `batteryCapacity`, `forceBatteryCellCount`, and warning thresholds
* Profiles can be named (up to 8 characters) for easy identification
* Optional auto-switching based on detected cell count

#### Optical Flow Position and Altitude Hold

Support for the **Upixel UP-T1-001-Plus** combined optical flow and laser rangefinder sensor enables position and altitude hold without GPS, ideal for indoor flying.

**Setup:**
* Connect the Upixel sensor to a spare UART at 115200 baud
* Set `set poshold_position_source = AUTO` to auto-select between GPS and optical flow, or force one with `GPS_ONLY` or `OPTICALFLOW_ONLY`
* Tune thresholds with `poshold_opticalflow_quality_min` and `poshold_opticalflow_max_range`
* Range: 2.5 cm to 12 m

#### CAN Peripheral Support (Foundation)

A foundational **FDCAN peripheral driver** has been added for STM32G4 targets, gated by the new `ENABLE_CAN` build option. Built on direct register access (no HAL), the driver provides a message-oriented TX/RX API (`canInit`, `canTransmit`, `canRegisterRxCallback`) over FDCAN1/2/3 with RX dispatch via FIFO 0 and interrupt callbacks, plus pin configuration via a parameter group.

This is infrastructure on which higher-level protocols such as **DroneCAN** can be built in future releases. STM32H7 support is planned to follow.

:::note
CAN support is foundational in this release. No DroneCAN or other higher-level CAN protocols are shipped yet; the driver is currently available to developers integrating custom CAN functionality.
:::

### 2.2 New Platform Support

#### ESP32 (Experimental)

Betaflight now runs on ESP32 microcontrollers. Both the **ESP32-S3** and the original **ESP32-WROOM** are supported as build targets.

**ESP32-S3 features:**
* DShot 150/300 with command support and frame overlap prevention
* GDMA-backed SPI transfers
* Serial RX (CRSF, S.BUS, GHST, IBUS, FPORT), telemetry, and MSP over UART
* I2C with error recovery, ADC, USB VCP with connection detection
* SD card blackbox via SPI

**ESP32-WROOM** runs in polled mode (no DMA) with serial RX, telemetry, I2C, SPI, ADC, and SD card blackbox.

:::warning
ESP32 support is experimental. Expect ongoing development and possible breaking changes.
:::

#### STM32H5

Full support for **STM32H562** and **STM32H563** processors, bringing a modern Cortex-M33 (ARMv8-M) option to Betaflight.

**Supported peripherals:** UART, SPI (GPDMA-backed), I2C, ADC with DMA, USB VCP, SDIO/SD card, DShot, PWM output, LED strip, transponder, camera control, config flash storage, and hardware MPU memory protection.

#### STM32N6 (Developer Preview)

Initial support for **STM32N657** with most core peripherals working: UART, SPI, I2C, ADC, USB VCP, DShot bitbang, and PWM output. SDIO/SD card support is pending hardware validation.

:::warning
STM32N6 is suitable for developers and early adopters only.
:::

#### STM32C591 (Developer Preview)

Initial build infrastructure and target support for the **STM32C5** series (Cortex-M33 @ 144 MHz, 1 MB flash, 256 KB SRAM, LPDMA). The build system, linker script, startup code, and HAL2 compatibility layer are in place, and the binary links and boots to `main()`. Peripheral drivers (timer, UART, SPI, I2C, ADC, DMA reqmap, DShot, USB VCP, LED strip) are currently stubbed and will be filled in over subsequent releases. The STM32C591 target is excluded from CI until driver implementations land.

:::warning
STM32C591 support is an experimental developer preview. No peripheral functionality is available yet -- the target is intended for platform bring-up work only.
:::

#### RP2350 / PICO Improvements

* **Bidirectional DShot telemetry** now fully working with GCR-encoded edge detection, enabling RPM filtering, dynamic idle, and dynamic notch filters
* Fixed erratic motor movement when disarmed due to DShot timing issues
* Enabled magnetometer, MSP/UART, and VTX support
* Both RP2350A and RP2350B targets supported

### 2.3 New Hardware Support

#### Sensors

| Type | Sensor | Notes |
|------|--------|-------|
| IMU | ICM-42686P | 6-axis, SPI |
| IMU | ICM-42622P | 6-axis, SPI |
| IMU | LSM6DSK320X | 6-axis, SPI |
| Barometer | BMP580 / BMP581 | I2C |
| Magnetometer | MMC5603 | I2C |
| Rangefinder | Nooploop TOFSense family | F, FP, F2, F2P, F2PH, F2MINI variants; 115200 baud UART |
| Optical Flow | Upixel UP-T1-001-Plus | Combined optical flow + laser rangefinder |

#### Flash Chips

* GD25Q16E (16 Mbit), GD25Q128 (128 Mbit), Zetta ZD25WQ32CE (32 Mbit) NOR flash
* **MT29F NAND flash** (MT29F1G01ABAFDWB, 1 Gbit) -- significantly more blackbox storage capacity

### 2.4 Protocol and Connectivity

#### ExpressLRS 4.0 SPI Support

Full SPI-based **ExpressLRS V4** protocol support with automatic version detection (V3/V4), updated channel mapping, and telemetry nonce handling. Binding and FHSS hop tables are compatible across versions.

#### CRSF AHRS Telemetry

CRSF telemetry now includes full-resolution IMU data (accelerometer and gyroscope), barometric altitude and vertical speed, magnetic heading, and GPS NED velocity vectors. This provides richer real-time data on CRSFv3-capable transmitters.

#### MSP Enhancements

* **MSP2_CLI_SETTING** (0x3010): Get and set any CLI setting by name over MSP, enabling full remote configuration without a serial terminal
* **MSP2_CLI_SETTING_INFO** (0x3011): Query setting metadata including type, min/max, options, and defaults
* **Attitude quaternions**: Attitude data now available as quaternions over MSP for 3D applications
* **OSD custom text**: Send up to 4 custom text messages to the OSD via `MSP2_SET_TEXT` and `MSP2_GET_TEXT`

#### Strengthened MSP/CRSF Packet Validation

Improved input validation for MSP and CRSF packets to guard against malformed data.

### 2.5 Flight Controller Changes

* **Servo channel forwarding**: Individual servo channels can forward RC input directly, bypassing the servo mixer. Configure per-servo with `set servo_<N>_forward_from_channel = <1-16>` (0 = disabled)
* **Simplified Master Slider**: New `ADJUSTMENT_SIMPLIFIED_MASTER_MULTIPLIER` scales all PID values simultaneously from a single potentiometer or switch
* **Airmode LPF removed**: Low-pass filter on airmode removed for more direct control response
* **Faster trigonometry**: Optimised sine and cosine calculations improve scheduler headroom

### 2.6 GPS Improvements

* **AssistNow Autonomous**: Enable with `set gps_ublox_enable_ana = ON` for faster GPS fix acquisition using UBLOX predicted satellite data
* **Blackbox GPS timestamps**: GPS epoch time now logged in H-frames and milliseconds-to-week in G-frames for precise post-flight time correlation
* **UBLOX message priority**: NAV_PVT and NAV_SAT messages processed first for faster position updates
* Improved GPS message handling and deduplication

### 2.7 CLI Changes

* New `options` command displays build configuration (equivalent to MSP_BUILD_INFO)
* New `sensor_hardware` command replaces the deprecated `gyro_hardware` command
* New `waypoint` command for flight plan management
* New `battery_profile` command for switching battery profiles
* `GYRO_CLKIN` now constrained to supported IMU sensors only

### 2.8 Bug Fixes

* **ICM-40609D accelerometer** reading 0.5g instead of 1.0g due to incorrect full-scale register values
* **LSM6DSV16X** FS_G_4000DPS register encoding corrected
* **DShot beacon** no longer sounds when the configurator is connected, and a 35-minute arming lockout from timestamp overflow is fixed
* **Motor output** now properly restored after exiting ESC passthrough
* **CRSF subset frame** race condition where frame data could be read before copy completed
* **Battery percentage** integer underflow when capacity is set to 0
* **Magnetometer yaw alignment** configuration now applied correctly
* **VTX table power labels** buffer corruption with exactly 3-character labels
* **RX_MSP** missing CLI feature name and RX rate always showing 0
* **CLI help** NULL pointer crash when searching commands without descriptions
* **Post-flight statistics** max current now displayed with decimal precision

## Thank You

Betaflight 2026.6 is the work of a passionate community. We want to thank every contributor who made this release possible.

### Firmware Contributors

Andy Piper, A. Pelicho, blckmn, Bryan Mayland, Dominic Clifton, gintaris, Hannes Kaufler, HGLRC, Jim Florrick, Jozef Woloch, Jury D'Ambros, katerica, ke deng, Kevin Plaizier, Manwe, Mark Haslinghuis, Michael De Backer, mjs1441, nerdCopter, Osiris Inferi, PD45-46, qqqlab, Radu, Remenby31, Robolightning, Sergey Tsypanov, Steve Evans, Thomas Stibor, UAV Tech, VoodooChild99, zebulon-86

### App Contributors

blckmn, Eric, Hannes Kaufler, jikanos, Jury D'Ambros, ke deng, Mark Haslinghuis, nerdCopter, ot0tot, UAV Tech, Vitroid, Vlad, Yaros

### And Everyone Else

From the core developers who write the code, to the tireless testers who ensure stability, and to everyone who provides documentation, translations, and support -- your efforts have made this release possible.

Happy flying!

---
sidebar_position: 1
sidebar_label: 2026.6 Release Notes
---

# 2026.6 Release Notes

Welcome to Betaflight 2026.6! This release lays the **first foundations for autonomous flight** -- a brand-new Flight Plan tab and the underlying autopilot, both currently simulation-only and intended to mature over the coming releases. Alongside that, 2026.6 brings new platform support for ESP32 and STM32H5/N6/C5 processors (including the first viable C5 development board, NUCLEOC562RE), STM32H757 dual-core MCUs, and the new X-CORE Labs X32M7 platform, switchable battery profiles, optical flow position hold, a fully modernised app now built almost entirely on the Nuxt UI component library, a brand-new pixel-based OSD for Raspberry Pi Pico 2 (RP2350) flight controllers, the first DroneCAN GPS support, expanded MAVLink telemetry for QGroundControl compatibility (now including waypoint mission transfer), native Android firmware flashing over USB, a new in-app Blackbox log viewer, a dedicated iOS app, and a brand-new **Betaflight Bridge** companion that lets iOS and other Wi-Fi-only devices connect to a flight controller wirelessly, plus a wide range of sensor, protocol, and hardware additions.

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

Almost every tab has now been converted. Landed in this release:

* **App shell** -- connection/flasher buttons, port selection, and firmware virtual options
* **Sidebar** navigation (Nuxt UI `UNavigationMenu`)
* **Options** tab
* **Documentation & Support** tab
* **Setup** tab
* **Ports** tab
* **Configuration** tab
* **Receiver** tab
* **PID Tuning** tab
* **Adjustments** tab
* **FailSafe** tab
* **OSD** tab
* **Motors** tab
* **Sensors** tab
* **GPS** tab
* **Modes** tab
* **Presets** tab
* **LED Strip** tab
* **CLI** tab
* **Blackbox** tab (with improved search)
* **Flight Plan** tab
* **Autotune** tab
* **Firmware Flasher** tab (with a refreshed facelift)
* **Power** tab
* **User Profile** tab
* **Backups** tab (plus cloud backup/user-profile tables and the login modal)
* **Servo** tab
* **Tethered Logging** tab
* **VTX** tab

The shared dialogs across the app (copy-profile, reboot, problem-report, profile-selection, wait, yes/no, and the per-tab dialogs in Backups, CLI, Flasher, Motors, OSD, Presets, Setup, and User Profile) have also been migrated to Nuxt UI's `UModal`, for consistent look-and-feel and behaviour.

Any remaining legacy tabs will follow in subsequent releases.

### 1.3 Layout Overhaul

The top header bar has been retired; connection status, firmware/virtual options and utility actions now live in the sidebar and each tab's own toolbar. This gives every tab more vertical space and makes the overall layout more consistent across desktop and mobile.

### 1.4 Flight Planning UI (First Steps)

This release introduces the **first version** of a new **Flight Plan** tab -- the user-facing groundwork for autonomous missions in Betaflight. You can lay out waypoints visually on an interactive map, edit and reorder them, view their elevation profile, and save or load plans directly from the flight controller. Alongside basic position waypoints, the editor now supports **TAKEOFF** waypoints and **modifier** waypoint types so that take-off behaviour and per-segment modifiers can be expressed directly in the plan.

Think of this as the **foundation**: the tab is in place, the workflow is wired through, and we'll be steadily filling in functionality release after release.

:::warning
The underlying autopilot firmware is **experimental and not flight-ready**. It is currently only tested in simulation (SITL). Do not arm a real aircraft with autopilot enabled. The Flight Plan tab is intended for early experimentation in simulation while the feature matures in future releases.
:::

### 1.5 Battery Profile Support

The app now supports switching between **multiple battery profiles** configured on the flight controller, making it easy to swap between different battery types without reconfiguring.

### 1.6 Autotune Tab (Experimental)

A new **Autotune** tab provides a file-based workflow for analysing flight-controller tuning from a blackbox log. It imports a log containing chirp sweep data, computes the closed-loop frequency response using Welch's method, and recommends **Simplified Tuning** slider values based on bandwidth, phase margin, resonant peak, and noise floor.

The tab works without a flight controller connected. When connected, the **Apply Gains** button writes the recommended simplified-tuning values back via MSP. Segmentation of chirp data is driven by the `BOXCHIRP` flight-mode bit. Autotune is now **gated behind Expert Mode** in the Options tab and lives in the sidebar alongside Blackbox, keeping the standard sidebar uncluttered for everyday users.

### 1.7 User Accounts, Backups, and Cloud Sync

A new **WebAuthn-based login** system lets you securely save and manage configuration backups in the cloud, organised by aircraft. Backups can be downloaded, edited, and deleted. Includes avatar editing and automatic backup functionality.

An **email-code login** option is also available as an alternative to passkeys, for browsers where WebAuthn is unreliable (for example, Safari). The redesigned login dialog offers a primary passkey button, a passkey-setup link, and a toggle to switch into email request/verify steps.

### 1.8 Colour Themes

Three new colour themes are available in the Options tab: **Yellow** (default), **Amber**, and **High Contrast**, giving you more control over the app's appearance.

### 1.9 Preflight Environment Check

A new **Preflight** tab displays real-time conditions critical for safe flying: weather (temperature, wind, visibility, precipitation), solar activity (Kp index), battery status, density altitude, civil twilight window, fog probability, and location elevation. Supports geolocation and saved favourite flying spots.

The tab also includes an **Airspace & No-Fly Zones** section that fetches NOTAMs and airspace data for your location, parsing NOTAM, TFR, special-use-airspace, SNOWTAM, and ASHTAM entries with their active windows and altitude limits, plus a SkyVector airspace-chart link. The NOTAM source is selectable -- the **FAA NOTAM API** (US) or **OpenAIP** (global), each requiring a user-supplied API key, alongside EUROCONTROL NOTAMs for Europe.

### 1.10 Board Qualification

The Firmware Flasher now shows **board qualification status** -- whether a target is officially verified (Verified Partner), community-supported (Vendor/Community), or legacy -- helping you understand support levels before flashing.

The Flasher has also been restructured: the previous four sub-tabs are consolidated into just two -- **Board & Build** (board selection plus build configuration) and **Flash** (release/build info plus the flashing terminal) -- with a tab-style layout, sidebar icons, and collapsible info boxes. Cloud-build and flashing status are surfaced with a persistent **progress ring**, and the flash outcome stays visible after completion so you can review results without rerunning the flow.

Two further flasher additions in this release:

* **ESP32 firmware flashing** -- the flasher can now write a merged ESP32 `.bin` directly over the serial bootloader (chip auto-detection and reset handling included), complementing the new firmware-side ESP32 platform support. This path is **Web Serial only** for now (it relies on DTR/RTS control that the desktop and mobile serial layers don't yet expose)
* **Post-flash backup restore** -- when a backup was captured before flashing, the flasher can now restore it in place straight after a successful flash, without reconnecting and visiting the Backups or Presets tab. The backup-on-flash option has moved into the flasher's advanced settings

### 1.11 Responsive and Mobile Improvements

* Responsive header bar that adapts to different screen sizes
* Improved landscape mobile layouts
* Responsive GPS tab with flexible grid layout
* Overall better usability on tablets and phones

### 1.12 Android and Desktop

* **DFU over USB on Android** -- native firmware flashing directly from the Android build, no extra tooling required
* **Android file access** -- full file-picker support for opening and saving configuration backups and logs on-device
* **Tauri desktop scaffold** -- initial groundwork for a lightweight Tauri-based desktop build alongside the PWA
* **iOS app (TestFlight)** -- a native **Tauri-based iOS app** is now built and signed in CI and distributed via **TestFlight**. Because iOS has no USB serial, the iOS app connects over **TCP to the [Betaflight Bridge](#3-betaflight-bridge-experimental)** -- making it the first practical way to use the Betaflight app on an iPhone or iPad
* **Tauri Android build** -- in addition to the existing Capacitor Android build, a Tauri-based Android target with a Google Play CI pipeline has been added
* **Embedded WebSocket deployments** -- the compatibility gate and service worker are skipped when the app is served from an embedded WebSocket (e.g. running directly off a flight controller or companion device), avoiding reload loops in that mode

### 1.13 Restore Backups Directly to Your Aircraft

The **Backups** tab now has a **Restore** button that writes a backup straight back to a connected flight controller. Under the hood, the app no longer needs to open an interactive CLI session to apply a backup -- it sends each setting one at a time and shows live progress in the dialog. The classic CLI tab is unchanged and remains available as a manual fallback.

### 1.14 Desktop App and Nightly Downloads

Desktop installers for the new Tauri-based Betaflight app -- Windows, macOS, and Linux -- are now published at **[downloads.betaflight.com](https://downloads.betaflight.com)**, alongside the Android APK. The same site also hosts **nightly builds** of the desktop app and the Android APK, making it easy to try the very latest changes between releases without waiting for a tagged release.

The desktop bundles are now named `betaflight-app` for consistency across platforms.

### 1.15 Expert Mode for Advanced Connections

The **Virtual Connect** and **Manual Connect** options are now hidden unless **Expert Mode** is enabled in the Options tab, reducing clutter for everyday users while still keeping these tools available to power users and developers.

### 1.16 Tuning UI Refinements

* The **Yaw Low-Pass Filter** switch on the PID Filters page has been restored, alongside on/off switches built directly into each filter slider (Low / Default / High labels)
* The **PID tab** has been rearranged and the active profile names now sit in the tab header, making it clearer which profile you are editing
* The `dyn_notch_q` slider tooltip now states clearly that the value shown is divided by 100
* **RPM filter settings** are now exposed in the PID Filters page, so the harmonic count, Q factor, and minimum frequency can be tweaked directly from the app instead of via CLI

### 1.17 Blackbox Log Viewer

A full **Blackbox log viewer and analyser** is now built into the app as its own **Blackbox Viewer** tab -- the standalone Blackbox Explorer brought directly into the Betaflight app. Open a recorded blackbox log and inspect it with configurable graphs, a spectrum analyser, a 2D/3D craft attitude view, a GPS map, time-line playback, and CSV export, all without leaving the app. Multi-log files let you pick which log's header to view, and graph panels can be reordered by drag-and-drop.

This is distinct from the existing tabs that share the "blackbox" name: the **Blackbox** tab configures on-board logging and downloads logs from the flight controller, **Tethered Logging** captures a live log over the connection, and the new **Blackbox Viewer** is for analysing recorded logs offline.

### 1.18 Other App Changes

* **Transponder tab removed** -- the feature has been retired in the configurator; transponder provider and data are now managed via CLI on the firmware side
* **Firefox 151+ supported** -- now that Firefox 151 ships WebSerial, the Chromium-only browser check has been removed and the app runs natively on Firefox
* **CH340 USB-to-Serial adapters** are now recognised by the connection list, including CH340 variants, CH341, and CH340S; the Android USB filter includes the WCH vendor entries so adapters work on mobile as well
* **Sensor hardware display** separated from GPS protocols in the Sensors tab
* **Magnetometer calibration overhaul** in the Sensors tab. Beyond the basic guided calibration, two new modes are available: a **Guided (Client)** mode that fits the calibration sphere on the client side, and a one-pass **Full Cal (auto-align)** tumble that solves hard-iron and soft-iron correction *and* the sensor-to-flight-controller mounting alignment from a single tumble. Coverage is tracked across 20 icosahedral zones with an 8-step guided choreography, the craft icon and field-vector arrow are drawn from a **quaternion attitude** feed (`MSP_ATTITUDE_QUATERNION`) so the sphere view never gimbal-locks, and the compass cardinal markers have been enlarged for clarity
* **Sidebar and UserSession redesign** -- the log moves into its own modal, user-session UI is rebuilt on Nuxt UI, and the sidebar restores click-outside dismissal and improves mobile/accessibility behaviour
* **Absolute Control hidden** in the PID tab when connected to firmware on MSP API >= 1.48 (which no longer supports the feature)
* **Simplified Master Slider** and **adjCenter/adjScale** added to the Adjustments tab, now with an explicit **Step / Absolute mode selector** per adjustment -- the Center and Scale inputs are shown only when the selected mode uses them, instead of being inferred from non-zero values
* **Power tab battery state** now shows live **power draw** (watts) and **voltage drop** alongside the existing battery readings
* **Receiver failsafe warning** -- when the flight controller is in failsafe, the Receiver tab shows a banner and tints the channel bars, so failsafe output values are not mistaken for a broken receiver
* **Virtual Mode quality-of-life** -- sensible default PID/Rate/Filter values, CRSF and SBUS added as virtual-mode receiver options, simplified-tuning support ported from firmware, and Virtual Mode now shown as a device in the status bar
* **X32M7 boards recognised** -- USB serial and DFU filters added for the new X-CORE Labs X32M7 platform, on both desktop and Android
* **Georgian** added to the UI language list
* **Relative drag-and-drop on OSD elements** -- elements now move by the actual cursor delta instead of snapping to the drop cell, making fine adjustments much more predictable, including for large elements
* **OSD time variant** element support
* **POSHOLD_FAILED OSD warning** element for indicating position-hold failures
* **Only one UART can be assigned as the Serial RX input** in the Ports tab, preventing an invalid multi-port configuration that previously had to be untangled by hand
* **Icon set migrated** from Font Awesome to **Lucide** (via `UIcon`), removing the Font Awesome dependency entirely
* **sslip.io** support for local network development with Android devices
* Adaptive launcher icons for Android (light/dark mode support)
* Updated to Capacitor 8.0.2 for improved Android compatibility
* Status bar restored on mobile

### 1.19 App Bug Fixes

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
* Fixed throttle curve preview not updating
* Fixed OSD tab losing its dirty state after edits
* Fixed number inputs and numeric formatting across the new Nuxt UI tabs
* Fixed CLI tab copy-and-paste behaviour
* Fixed semver comparison for `itermThrottleThreshold` and `antiGravity`
* Fixed a forced-reflow performance issue in the UI
* Fixed Adjustments tab tooltip being clipped under the sticky page header
* Fixed firmware-upgrade-required prompt not using the modern dialog store, so the warning now renders consistently with the rest of the app
* Fixed OSD alarm ranges and dirty-state tracking so changes are accurately reflected in the Save state
* Fixed Motors tab ESC sensor handling, dirty-state propagation, and numeric formatting
* Fixed Receiver tab dirty-state and stale reboot-state handling on refresh
* Fixed DFU flashing crash when flashing without a full chip erase
* Fixed Options-dialog `USelect` dropdowns being unclickable, and resynced theme/expert/colour state when the dialog opens so it no longer shows stale values
* Fixed the Presets tab sticky filter bar overlaying the Options dialog
* Fixed the Failsafe tab not loading mode data on first visit, and replaced raw-HTML badges with `UBadge`
* Fixed the WebSerial port not being closed on page unload, which had been causing replug-required errors on reload
* Fixed CLI paste slowdown, forced reflow on large pastes, and unreliable autoscroll
* Fixed the D-Term Lowpass 1 dynamic max-cutoff slider constraints, which disagreed with the firmware range and caused default values to snap upward
* Security fix for [CVE-2026-39315](https://github.com/advisories/GHSA-95h2-gj7x-gx9w)

## 2. The Firmware

### 2.1 Key New Features

#### Autopilot and Waypoint Missions (First Steps -- Simulation Only)

This release lays the **foundation** for autonomous flight in Betaflight. The first version of an autopilot with **GPS waypoint navigation** for both multirotors and fixed-wing aircraft is included, supporting up to 30 waypoints with configurable speed, altitude, and hold behaviour at each.

What's in place today: the flight-mode plumbing, the in-firmware waypoint store, an `AUTOPILOT` mode bit, the navigation maths (waypoint following, spiral landing, multiple yaw modes for multirotors and wings), and the RX-loss policy. A thin **flight-plan guidance executor** sits on top of this, driving the position-navigation outer loop directly from the stored flight plan when `AUTOPILOT` is engaged -- `FLYOVER`, `FLYBY`, and `HOLD` (with duration) waypoint behaviours are wired through, with `LAND`, `ORBIT`, and `FIGURE8` patterns still to come.

The underlying **3D position estimator** that drives it all -- fusing GPS, accelerometer, optical flow, and rangefinder data into a single smooth position fix -- is also new in this release, and is what makes both the autopilot and the GPS-free Position Hold feature possible.

The intention is to keep building on this foundation across the next few releases until the feature is **fully ready for real-world use**.

:::danger
Autopilot is **experimental and only tested in simulation (SITL)**. It is **not flight-ready** and must not be armed on a real aircraft. This first version is included so developers and early testers can start exercising the workflow end-to-end while the feature matures.
:::

**Trying it (in simulation):**
* Assign the `AUTOPILOT` flight mode to a switch in the Modes tab
* Use the `waypoint` CLI command to add, edit, or dump waypoints
* Configure behaviour with `set ap_hover_throttle`, `set ap_landing_altitude_m`, velocity PID terms, and geofence limits
* Tune approach/stop behaviour with the new `ap_stop_threshold` setting -- the autopilot now brakes more cleanly into the next waypoint, and the legacy `ap_position_a` term has been removed in favour of the new braking math
* Set an RX-loss policy (disable autopilot, continue the mission, or land)

The **Upixel UP-T1** rangefinder is now handled directly by the optical-flow code path, removing the need for a separate driver.

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

#### CAN Bus Support and First DroneCAN GPS

Betaflight now supports the **CAN bus** -- a long-distance, noise-resistant communication standard widely used for connecting peripherals such as GPS modules, electronic speed controllers, gimbals, and airspeed sensors. Hardware support is enabled on **STM32G4**, **STM32H7**, and the new **STM32C5** family.

Built on top of the CAN driver, this release also ships the first piece of **DroneCAN** -- the open-standard protocol used by many modern UAV peripherals:

* A core **DroneCAN protocol stack** with node-status announcements and node-info responses, so a DroneCAN GPS or other device can see the flight controller on the bus and identify it
* A **DroneCAN GPS provider** that consumes the standard `Fix2` GPS message and feeds it into Betaflight's normal GPS pipeline -- meaning GPS Rescue, position hold, OSD coordinates, and blackbox logs all work with a DroneCAN GPS just like they do with a serial GPS

Configure the CAN pins with `resource CAN_TX <n> <pin>` and `resource CAN_RX <n> <pin>`, and set the bus speed with `set can_bitrate` (default 1 Mbit/s).

:::note
DroneCAN support is initial. Many peripheral types are not yet supported, and only a subset of common GPS modules has been tested. STM32H5 and STM32N6 CAN support is planned for a future release.
:::

#### Pixel OSD for Raspberry Pi Pico 2 (RP2350)

Betaflight 2026.6 introduces a **brand-new on-screen display system** for flight controllers built around the Raspberry Pi Pico 2 (RP2350). Where every previous Betaflight OSD has relied on a separate dedicated chip (such as the MAX7456) to overlay text and symbols on a video signal, **Pico 2 boards now do this entirely inside the main microcontroller** -- no extra OSD chip required.

This is what makes it different:

* **Native analogue video output** -- the OSD is overlaid directly onto a standard analogue video signal, ready to be sent to any FPV video transmitter that accepts composite video. Both **PAL and NTSC** are supported.
* **Auto-detects PAL or NTSC** -- when the flight controller boots, it samples the incoming video sync and chooses the right mode automatically. If you have a video format set in the OSD profile that does not match the camera, you'll see a warning and the OSD will follow what's actually on the wire.
* **Pixel-defined OSD elements** -- alongside the classic character-grid elements, the **artificial horizon, horizon sidebars, and stick-overlay graphics** are now drawn pixel-by-pixel. The result is much smoother lines, finer angles, and graphics that aren't restricted to a 12 × 18 pixel character cell.
* **Custom font upload** -- the standard Betaflight OSD font is built in by default, and you can upload your own fonts from the configurator app's OSD tab, exactly as you would on a MAX7456-based flight controller.
* **Standard SD layout** -- the screen still uses the familiar 30-column layout (16 rows on PAL, 13 rows on NTSC), so existing OSD layouts and warnings move across without changes.
* **Smooth, tear-free updates** -- the OSD draws into a back buffer and swaps it onto the screen between video frames, so the picture never tears or flickers, even with busy elements like the artificial horizon.
* **Doesn't slow down the flight loop** -- rendering uses the Pico 2's specialised on-chip hardware to push pixel data out independently of the processor, leaving the gyro loop unaffected.

To use it, your flight controller needs three signal pins wired to the video circuit: a **white pin**, a **black pin**, and a **sync-detect input**. Hardware vendors will publish board-specific wiring as their Pico 2 designs become available.

:::note
The Pixel OSD is only available on RP2350 (Raspberry Pi Pico 2) flight controllers. MAX7456 and other character-based OSD hardware continues to work as before on every other supported platform.
:::

### 2.2 New Platform Support

#### ESP32 (Experimental)

Betaflight now runs on ESP32 microcontrollers. Both the **ESP32-S3** and the original **ESP32-WROOM** are supported as build targets.

**ESP32-S3 features:**
* DShot 150/300 motor output with command support
* All major receiver protocols (CRSF, S.BUS, GHST, IBUS, FPORT), telemetry, and MSP over USB or serial
* I2C with automatic error recovery, ADC, and USB with connection detection
* SD card blackbox

**ESP32-WROOM** (the original ESP32) is also supported, with all of the above except higher-speed bulk transfers; suitable for lower-end use cases.

Build-target skeletons for the **ESP32-C5** and **ESP32-P4** have also been added (alongside an update to ESP-IDF 5.4), laying the groundwork for future support on those parts.

:::warning
ESP32 support is experimental. Expect ongoing development and possible breaking changes.
:::

#### STM32H5

Full support for **STM32H562** and **STM32H563** processors, opening up another modern, mid-range option for flight controller manufacturers. ST's **NUCLEO-H563ZI** development board is brought up as a reference target, making it easy for developers to start working with the H5 family.

Working peripherals include: serial ports (UART), SPI, I2C, ADC, USB, SD card via SDIO, DShot motor output, regular PWM output, LED strips, transponder, camera control, on-chip config storage, and hardware memory protection.

#### STM32N6 (Developer Preview)

Initial support for **STM32N657** with most core peripherals working: UART, SPI, I2C, ADC, USB, DShot, PWM output, and SD card via SDIO. Flash storage and execution from external memory is also supported. ST's **STM32N6570-DK** development board has been brought up as the reference target, with an **LTDC** display backend, an **SSD1306** I2C OLED backend, and a CLI `dump` command for inspecting on-board state. A second N6 board, **OPENN657V1**, now runs Betaflight execute-in-place from XSPI flash with persistent on-chip configuration (eeprom save/load, VCP enumeration, and reboot all working end-to-end).

Follow-up N6 work in this release also corrects a large number of pin/AF table entries that had been carried over verbatim from H7 -- the timer, SPI, I2C, UART, and ADC tables are now audited against ST's N6 datasheet, RIFSC/GPDMA secure-alias paths have been fixed, and **DShot motor output** is now functional on N6.

:::warning
STM32N6 is suitable for developers and early adopters only.
:::

#### STM32C5 with NUCLEOC562RE Development Board (Developer Preview)

The new **STM32C5 family** is a low-cost Cortex-M33 line from ST that runs at 144 MHz. Betaflight 2026.6 introduces support for three members of the family:

* **STM32C591** -- the original C5 chip (1 MB flash, 256 KB SRAM)
* **STM32C562** -- a smaller variant (512 KB flash, 128 KB SRAM); the **NUCLEOC562RE** development board from ST is the **first viable Betaflight target** on the C5 family and a great low-cost board for developers and early adopters wanting to bring their own hardware up
* **STM32C593** -- the variant with built-in CAN bus

What's working on NUCLEOC562RE today: serial ports (UART), SPI, I2C, ADC, USB, DShot motor output (bit-banged), WS2811 LED strips, on-chip config storage, EXTI interrupts, and a 144 MHz system clock. SD card is not yet implemented.

:::warning
STM32C5 support is a developer preview intended for platform bring-up. The NUCLEOC562RE makes a good development board, but no production STM32C5 flight controllers are available yet. Some peripheral types are still being filled in and the targets are currently excluded from CI.
:::

#### Xcore32m7 (X-CORE Labs, Experimental)

Betaflight now runs on the **X32M7**, a Cortex-M7 microcontroller from **X-CORE Labs**. The reference target is the **X32M7B** board, brought up against the vendor's X32M7 SDK.

Working peripherals include: serial ports (UART), SPI, I2C, ADC, DAC, USB (high-speed VCP plus USB mass-storage), SD card via SDMMC/SDIO blackbox, DShot motor output (bit-banged), WS2811 LED strips, FDCAN, EXTI interrupts, RTC, external gyro clock input (`GYRO_CLKIN`), execute-in-place from XSPI flash, and persistent on-chip config storage.

:::warning
X32M7 support is experimental and new in this release. Expect ongoing development and possible breaking changes.
:::

#### RP2350 (Raspberry Pi Pico 2) Improvements

* **Pixel OSD** -- a brand-new on-screen display that overlays directly onto an analogue video signal, with no separate OSD chip. See [Pixel OSD for Raspberry Pi Pico 2](#pixel-osd-for-raspberry-pi-pico-2-rp2350) above for details
* **Bidirectional DShot telemetry** is now fully working, which means **RPM filtering, dynamic idle, and dynamic notch filters** are all available on Pico 2 boards
* **SBUS receiver protocol** is now supported on RP2350A and RP2350B
* **Magnetometer**, **MSP over UART**, and **VTX** support added
* Fixed erratic motor twitching while disarmed, caused by motor-timing issues
* Various serial-port reliability fixes
* Both RP2350A and RP2350B variants are supported

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

New blackbox / config storage flash chips supported in this release:

* GD25Q16E (16 Mbit), GD25Q128 (128 Mbit), BY25Q64 (64 Mbit), BY25Q128ES (128 Mbit), Zetta ZD25WQ32CE (32 Mbit), Macronix MX25L12845G (128 Mbit), XTX XT25F128F (128 Mbit) NOR flash
* **OctoSPI multichip support** with the **Macronix MX66UW1G45G** (1 Gbit) OctoSPI NOR flash driver -- a much higher-capacity, higher-bandwidth option for blackbox storage on platforms with an OctoSPI bus
* **MT29F NAND flash** (MT29F1G01ABAFDWB, 1 Gbit) with improved block management -- significantly more blackbox storage capacity

#### Additional Microcontroller Families

Beyond the new STM32 platforms above, manufacturers also have access to:

* **STM32H757** -- a new **dual-core** member of the H7 family (Cortex-M7 + Cortex-M4); Betaflight runs on the M7 core, while the M4 is only released from reset if a valid M4 image is flashed at `0x08180000` (otherwise it stays halted). USB clock setup races have also been tightened so OTG enumerates reliably on H757 boards
* **GD32H7** -- GigaDevice's H7 family is now supported, broadening the range of high-performance flight controllers that can run Betaflight
* **APM32F4** (F425/F427) -- additional APM32 variants alongside existing F4 support, giving manufacturers more sourcing flexibility

### 2.4 Protocol and Connectivity

#### ExpressLRS 4.0 SPI Support

Full SPI-based **ExpressLRS V4** protocol support with automatic version detection (V3/V4), updated channel mapping, and telemetry nonce handling. Binding and FHSS hop tables are compatible across versions.

ELRS V3 is now the **default protocol** in the build system -- targets get V3 with no extra flags. V4 is enabled by opting in with `USE_ELRSV4`, which lets manufacturers ship V3-only firmware images that fit on smaller targets without dragging in the V4 code path.

#### CRSF AHRS Telemetry

CRSF telemetry has been expanded to include full-resolution motion data (accelerometer and gyroscope), barometric altitude and vertical speed, magnetic heading, and 3-axis GPS velocity. The result is much richer real-time data on the screen of CRSF-capable transmitters.

A dedicated **CRSF GPS Time message (0x03)** is also now emitted, allowing CRSF transmitters and downstream tools to align logs and overlays with precise GPS time.

#### MAVLink Telemetry -- QGroundControl Compatibility

The MAVLink telemetry path has been expanded with the specific goal of making Betaflight aircraft behave correctly in **[QGroundControl](https://qgroundcontrol.com/)** -- the open-source MAVLink ground control station. Previous releases sent enough MAVLink to be detected by a GCS, but the heading arrow misbehaved, there was no home position, no time sync, no human-readable arming feedback, and no way for QGC to identify or unlock the vehicle. 2026.6 closes those gaps:

* **Correct heading arrow** -- `GLOBAL_POSITION_INT.hdg` is now sent in centidegrees as required by the MAVLink common dialect, fixing a 100x under-scale that previously confined QGC's heading arrow to the first ~3.6 degrees of compass
* **Home position on the map** -- `HOME_POSITION` is sent alongside `GPS_GLOBAL_ORIGIN` whenever a home fix is set, so QGC can draw the home marker with lat/lon/AMSL altitude
* **Time sync** -- `SYSTEM_TIME` is sent at the extended-status stream rate, populated from RTC when available so QGC can line wall time up with the aircraft
* **Arming feedback** -- `STATUSTEXT` is emitted whenever the arming-disable flags change, giving QGC a human-readable reason on screen whenever the aircraft refuses to arm

To enable two-way conversation with QGC, the telemetry port now opens in `MODE_RXTX` with a MAVLink **receive dispatcher**. Three handshake responders ship today so QGC's standard connection sequence completes cleanly: **HEARTBEAT** (stub), **PING** (echoes time/seq back), and **TIMESYNC** (replies with the firmware's time in nanoseconds). The MAVLink **vehicle-setup unlock** flow and `custom_mode` discovery are also wired up so QGC can identify the vehicle and unlock it for configuration. RX drain is bounded per call so a flooded link cannot starve the telemetry task.

Building on that dispatcher, GCS-initiated traffic now lands in this release rather than being deferred:

* **Waypoint mission transfer** -- the full MAVLink **MISSION protocol** is implemented, so QGC can **upload and download missions** to and from the flight controller's in-firmware flight-plan store. Missions planned in QGC can be written to the aircraft, and the stored plan read back, over the standard mission-transfer sequence
* **GCS-controlled message rates** -- handlers for `MAV_CMD_SET_MESSAGE_INTERVAL` and the `MESSAGE_INTERVAL` message let the ground station set, disable, or reset the send interval of individual telemetry messages; each message is now streamed independently with its requested interval validated

:::note
MAVLink mission transfer and GCS message-rate control are new and primarily exercised against QGroundControl. They share the same simulation-first maturity caveat as the autopilot and Flight Plan workflow they feed into.
:::

#### MSP Enhancements

* **Read and write any CLI setting over MSP**: the configurator app (and any third-party tool) can now read and change any CLI setting by name, without needing to open an interactive CLI session. This is what enables the new direct-restore in the Backups tab
* **Setting metadata**: tools can also query a setting's type, allowed range, options, and default
* **Attitude as quaternions**: aircraft attitude is now also available in quaternion form for 3D and external visualisation tools
* **OSD custom text**: external apps can push up to four custom messages onto the OSD
* **Additional RPM fields**: motor RPM telemetry is now exposed over MSP with extra per-motor fields for richer external monitoring

#### Strengthened MSP/CRSF Packet Validation

Improved input validation for MSP and CRSF packets to guard against malformed data.

### 2.5 Flight Controller Changes

* **Servo channel forwarding**: any individual servo can be set to follow a chosen RC channel directly, bypassing the servo mixer -- handy for plain pass-through outputs like flaps or gimbal control. Configure per-servo with `set servo_<N>_forward_from_channel = <1-16>` (0 = disabled)
* **Simplified Master Slider**: a new in-flight adjustment that scales all PID values together from a single switch or knob, so you can tune all axes up or down at once
* **Altitude hold rework**: the altitude-hold controller has been simplified, with corrected feed-forward scaling and vertical-acceleration sign handling for steadier altitude tracking. The `altitude_lpf` and `altitude_d_lpf` filter ranges have been widened (maximum raised from 1000 to 5000)
* **Absolute control removed**: the experimental Absolute Control feature and its `abs_control_*` settings have been retired -- the iterm-relax / iterm-rotation path is the long-term direction for yaw/roll handling
* **OSD VTX status on non-factory bands**: when an MSP-controlled VTX (e.g. HDZERO) is on a non-factory band, the OSD now displays its current band/channel/power status correctly; SmartAudio behaviour is unchanged
* **LED strip colour by VTX frequency**: a new LED-strip overlay colours the strip according to the current VTX channel -- white below R1, sweeping red through magenta up to R8, and off when no channel is set -- making it easy to identify the VTX channel at a glance
* **Airmode response**: the small filter on airmode has been removed, giving a more direct feel
* **State Variable Filters**: the internal biquad (Direct Form 1) filter implementation has been replaced throughout the gyro, PID, RPM, dynamic-notch, and servo paths with **State Variable Filters (SVF)** -- a more numerically stable, lower-overhead topology. Functionally the filtering behaves as before; the practical change is that the filter-type option that previously read `BIQUAD` now reads `SVF`
* **Thrust linearization rescaled**: the thrust-linearization curve has been re-derived to match ArduPilot's `MOT_THST_EXPO` model, so per-propeller recommendations port across directly (roughly 55 for 5", 65 for 10", 75 for 20"+). Existing `thrust_linear` values will produce a slightly different curve shape after upgrading
* **Faster maths**: sine and cosine calculations have been sped up, freeing a little headroom in the flight loop

### 2.6 GPS Improvements

* **AssistNow Autonomous**: Enable with `set gps_ublox_enable_ana = ON` for faster GPS fix acquisition using UBLOX predicted satellite data
* **DroneCAN GPS support**: GPS modules connected via DroneCAN now work end-to-end -- see the new CAN section above
* **Faster serial GPS decoding**: The serial GPS message parser has been sped up, freeing scheduler headroom on slower flight controllers
* **Blackbox GPS timestamps**: precise time information is now written to blackbox logs so flight tracks can be lined up exactly with external data
* **UBLOX message priority**: position-update messages are processed first for faster position updates
* **Heading required before GPS position hold**: GPS-based position hold now waits until a valid heading is known before engaging, and the `poshold_without_mag` setting has been removed (any saved diff referencing it will be rejected on load)
* Improved GPS message handling and deduplication

### 2.7 CLI Changes

* New `options` command displays the firmware build configuration
* New `sensor_hardware` command replaces the deprecated `gyro_hardware` command
* New `waypoint` command for flight plan management
* New `battery_profile` command for switching battery profiles
* New `resource CAN_TX / CAN_RX` and `set can_bitrate` for configuring the CAN bus on supported processors
* New `env` command for inspecting the runtime build environment, replacing the older compiled-in MCU type identifier
* **Transponder** provider and data are now exposed via the CLI (replacing the removed app tab)
* Expanded **chirp debug channels** for the analysis workflow used by the new Autotune tab
* The external gyro clock-input feature (`GYRO_CLKIN`) is now restricted to gyro sensors that actually support it

### 2.8 Bug Fixes

:::warning
**IIM-42652 gyro full-scale-range fix (breaking).** The IIM-42652 was previously mis-configured at ±4000 DPS and has been corrected to its silicon-correct ±2000 DPS. This effectively doubles your existing PID gains, so if you fly an IIM-42652-equipped board you **must reset and re-tune your PIDs** after upgrading -- do not arm on your old tune. (The related IIM-42653 anti-alias filter placement has also been corrected.)
:::

:::warning
**IST8310 compass default I2C address (changed in 2025.12).** The default I2C address for the **IST8310** magnetometer changed from `0x0C` (12) to `0x0E` (14) ([#13995](https://github.com/betaflight/betaflight/pull/13995)) to match most IST8310 modules. If you upgrade from 4.5 (skipping 2025.12) and your IST8310 compass is no longer detected, restore the previous address from the CLI with `set mag_i2c_address = 12` (then `save`), or set the I2C address to `12` in the Magnetometer configuration in the app. Some IST8310 modules sit at a different address, so if `12` does not work try `13` or `15`.
:::

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
* **escprog `ki 255` (KISSALL)** no longer broken on DShot builds
* **Altitude** is now displayed in the sensors tab even when not armed
* **QMC5883P magnetometer** initialisation fixed so the sensor is detected and read correctly
* **Failsafe procedure** is now unconditionally clamped to the valid range on load, preventing an invalid stored value from putting the aircraft in an undefined failsafe state
* **MSP serial processing** race condition fixed where an MSP frame arriving exactly as the CLI was being entered could leave the port in an inconsistent state
* **busBusy()** now NULL-checks `dev->bus`, removing a crash path when a driver queries a partially initialised bus device
* **Position estimator** GPS distance calculation and the sign of the east acceleration term corrected (including an east-west inversion in the linear-acceleration computation), improving position-hold and autopilot accuracy
* **OSD clock** RTC date/time elements now apply the configured timezone offset and show local time instead of UTC
* **Bidirectional DShot telemetry** reads on the bit-bang path no longer busy-wait -- the DMA is aborted asynchronously, reducing flight-loop stalls on STM32, AT32, and APM32

### 2.9 Build System and Developer Notes

This section is for anyone **building Betaflight from source**; it does not affect flashing released firmware.

#### Vendor MCU SDKs Moved to Submodules (`lib/modules/`)

The submodule-backed **vendor MCU/SDK source** -- APM32F4, GD32H7, STM32C5, STM32H5, STM32N6, X32M7, ESP-IDF, pico-sdk, and DroneCAN's libcanard -- has moved out of `lib/main/` into a dedicated **`lib/modules/`** directory. The embedded (in-tree) vendor sources that are *not* submodules stay under `lib/main/` as before.

The motivation is to cleanly separate hydrated git submodules from embedded vendor trees. Previously a path could be embedded files on one branch and a populated submodule on another, which caused collisions and stray files when switching branches.

What this means for contributors:

* After pulling this change (or switching branches across it), refresh your submodules -- e.g. `git submodule update --init --recursive --checkout`. The `--recursive` flag matters because some SDKs (pico-sdk, STM32Cube H5/N6) contain nested submodules of their own
* A new **`check-stale-submodule-paths`** target is wired into the `checks` goal, so CI (and `make checks` locally) flags any submodule path left holding stray files -- the usual symptom of crossing the move without cleaning the worktree. The check output includes the recovery command
* If you build a platform from a clean checkout, the platform SDK cache key now includes the submodule path, so the move correctly invalidates any pre-existing build caches rooted at the old `lib/main/` location

## 3. Betaflight Bridge (Experimental)

Betaflight 2026.6 introduces **[Betaflight Bridge](https://github.com/betaflight/bridge)**, a brand-new companion product that turns an inexpensive **ESP32-S3** board into a **USB-host-to-Wi-Fi bridge**. The ESP32-S3 acts as a USB host, connects to a flight controller's USB **virtual COM port (VCP)**, and bridges that serial link over **TCP/IP** -- so any Wi-Fi-capable device can talk to the flight controller wirelessly.

The main motivation is **iOS and other devices that cannot use USB serial**. iPhones and iPads (and many other platforms) have no practical way to open a flight controller's USB VCP directly, which has long kept them away from the Betaflight App. Betaflight Bridge removes that barrier: the bridge handles the USB side, and the device connects over the network instead.

How it works:

* **Plug the flight controller into the ESP32-S3** -- the bridge enumerates the FC's VCP as a USB host
* **Connect over Wi-Fi** -- the bridge can either host its **own access point (AP)** or join an **existing Wi-Fi network (station/STA)** mode, so it fits both field use (no infrastructure) and bench use (your home network)
* **The Betaflight app connects over TCP/IP** -- the bridge listens on **port 5761**, the same TCP port the app already uses to connect to SITL today, so no new app support is required. Point the app's TCP connection at the bridge's address and the flight controller's VCP is presented transparently, exactly as if it were connected by cable. The bridge serves **one app client at a time**
* **Built-in web UI** -- the bridge also hosts a small web interface on **port 80** for checking status, scanning for and joining a Wi-Fi network, and uploading bridge firmware

Because the bridge is fully transparent, everything that normally runs over the VCP -- such as MSP and the CLI -- works through it.

:::warning
Betaflight Bridge is **experimental** and new in this release. Expect ongoing development and possible breaking changes. See the **[Betaflight Bridge repository](https://github.com/betaflight/bridge)** for supported boards, build/flash instructions, and setup.
:::

## Thank You

Betaflight 2026.6 is the work of a passionate community. We want to thank every contributor who made this release possible.

### Firmware Contributors

Andy Piper, A. Pelicho, blckmn, Bryan Mayland, ctzsnooze, Dominic Clifton, gintaris, Hannes Kaufler, HGLRC, Jacob Dahl, jianpingwu1, Jim Florrick, Jozef Woloch, Jury D'Ambros, katerica, ke deng, Kevin Plaizier, luckk, LYNHQQ, Manwe, Mark Haslinghuis, MatviiG, Michael De Backer, mjs1441, nerdCopter, Osiris Inferi, Oskars Selis, PD45-46, qqqlab, Radu, Remenby31, Robolightning, Sergey Tsypanov, Steve Evans, Thomas Stibor, UAV Tech, Vladimir Demidov, VoodooChild99, zebulon-86

### App Contributors

blckmn, ChrisRosser, Eric, Hannes Kaufler, jikanos, Jury D'Ambros, ke deng, Mark Haslinghuis, MikeNomatter, nerdCopter, Nicholas Young, ot0tot, UAV Tech, Vitroid, Vlad, Yaros

### And Everyone Else

From the core developers who write the code, to the tireless testers who ensure stability, and to everyone who provides documentation, translations, and support -- your efforts have made this release possible.

Happy flying!

---
sidebar_position: 1
sidebar_label: 2026.12 Release Notes
---

# 2026.12 Release Notes

Welcome to Betaflight 2026.12! This release changes how you assign serial ports: each feature now has its own port setting. It adds a new Kalman filter position estimator, heading hold in Position Hold, and a faster, more accurate GPS Rescue. Fixed-wing aircraft get navigation, a launch mode and pitot airspeed sensors, all experimental. Other additions are GD32H7 and STM32H753 support, more DroneCAN and MAVLink features, and new sensors. The app gets global settings search, a wing tuning page, a 3D flight path view and video export in the Blackbox Viewer, and right-to-left languages. iOS users get a new native app. Betaflight Bridge now has its first final release and can flash a flight controller.

We tried to make this release as free of bugs as possible. If you find a **bug**, open an **issue on our [GitHub tracker](https://github.com/betaflight/betaflight/issues)**.

There is a dedicated [Discord](https://discord.gg/n4E6ak4u3c) server for help, support and the community.

## Before You Upgrade

:::danger
**Many settings go back to their defaults when you upgrade to 2026.12.** The storage format of these settings groups has changed, so the firmware does not load the values that 2026.6 saved:

* PID profiles
* Serial port assignments
* Telemetry
* OSD element positions
* Barometer, rangefinder and optical flow
* Autopilot and flight plan (the firmware deletes stored waypoints)
* On wing builds only: Altitude Hold, Position Hold and GPS Rescue

Do these steps:

1. Before you flash, save a backup. Use `diff all` in the CLI, or make a backup in the app.
2. Flash 2026.12.
3. Remove any `set trust_mag = ...` line from the backup (see [Compass](#compass-trust_mag-removed)).
4. Paste the backup into the CLI, or restore it in the app.
5. Use `peripherals` in the CLI, or the Ports tab, to make sure that each port is correct.
6. Examine your OSD layout and PIDs before you fly.
:::

## 1. The App

:::note
Use the Progressive Web App (PWA) [online](https://app.betaflight.com).
:::

The app uses the same release version as the compatible firmware (2026.12). It updates automatically online. It supports MSP API 1.49, which 2026.12 firmware uses. Some changes below (port assignment, the wing settings page, DroneCAN selection) need API 1.49. With older firmware, the app operates as before.

### 1.1 Ports: Each Feature Assigns Its Own Port

2026.12 firmware has a new serial port model. Each feature now has its own port setting (for example `rx_uart`, `gps_uart`, `vtx_uart`). The firmware no longer accepts the MSP messages that the old Ports tab used to write. The app now uses the new model:

* **The Ports tab is an overview on API 1.49.** You cannot edit ports there. Each port has a tile that shows the features that use it, with a link to the tab that sets it. A green tick shows the feature that has the port. An amber caution shows a feature that did not get the port, or that waits for a reboot. Tiles also show DroneCAN nodes and the detected gyro, accelerometer, barometer and magnetometer. With firmware before API 1.49, the Ports tab is the same as before
* **Set each port on the tab of its feature:**
  * **Receiver:** serial RX, telemetry 1 to 3, camera control
  * **GPS:** GPS port, or the CAN bus for a DroneCAN GPS
  * **Blackbox:** blackbox port
  * **OSD:** OSD and OSD custom text
  * **VTX:** video transmitter
  * **Motors:** ESC telemetry
  * **Sensors:** rangefinder and optical flow
* **Port lists show what uses each port**, for example `UART1 (Video transmitter)` or `UART3 (free)`
* **Soft serial ports** are in every port list. A port shows "(inactive)" if the SOFTSERIAL feature is off or the pins are not set
* **Conflict warning:** if Expert Mode is off and you select a UART that has a different assignment, the app asks you to confirm
* **OSD display port:** you select the display port protocol (`osd_displayport_device`) on the OSD tab. DJI, HDZero and Walksnail users do not have to set up a VTX to get an OSD. An MSP VTX uses the same port as the OSD
* **VTX tab:** the VTX protocol and port show before a VTX replies, so you can set up a new board
* When you change only a port, the save button shows **Save and Reboot**, because a port change starts after a reboot

:::note
MSP port assignments (`msp_1_uart` to `msp_3_uart`) and the gimbal port (`gimbal_uart`) are CLI only.
:::

### 1.2 Wing Tuning and Pitot Airspeed

On wing builds with API 1.49 firmware, the PID Tuning tab has a new **Wing Settings** page:

* **S term**, next to P, I, D and FF
* **SPA:** mode (Off, I Freeze, I, PID, PD I Freeze), centre and width
* **TPA:** basic or advanced speed estimation, and classic, hyperbolic or reference-speed curves, with a curve chart
* **Miscellaneous:** yaw type (rudder or differential thrust) and pitch offset

The app supports **pitot (airspeed) sensors**. The Sensors tab shows airspeed. The Blackbox tab can log it. The OSD tab has an airspeed element.

The Blackbox Viewer header panels show the wing configuration: the Wing group, the S term, SPA, TPA and the speed curve. The header table also shows the RPM filter weights.

### 1.3 DroneCAN Setup Without the CLI

* When you save the GPS or Sensors tab with a DroneCAN device selected, the app enables DroneCAN. The app does not disable DroneCAN, because a different device can use the bus
* The Sensors tab has a magnetometer driver list. It shows `DRONECAN` when the firmware build includes it
* The GPS tab has a CAN bus selector
* Each DroneCAN node tile on the Ports tab has a **Configure** link for each sensor that the node supplies

### 1.4 Connectivity

* **Browsers without Web Serial:** the app now opens in browsers that do not have Web Serial, Web Bluetooth or WebUSB. In these browsers, the app connects only through the network. A page served over HTTPS can only open a secure `wss://` connection, which [Betaflight Bridge](#3-betaflight-bridge) supplies
* **Bridge discovery:** the desktop app finds Betaflight Bridges on the local network (mDNS). Each bridge shows in the connect menu. You do not have to type an IP address
* **Connection links:** a link such as `https://app.betaflight.com/?connect=wss://<host>:<port>/...` opens a network connection when the app starts. You can use a bookmark, a chat message or a QR code. The app accepts only `ws://`, `wss://` and `tcp://` addresses
* **Saved connections:** you can save a manual network address with a name and select it from the connect menu. A built-in **Betaflight SITL** entry connects to the simulator. This needs Expert Mode
* **Faster desktop serial:** the desktop app receives serial data when it arrives. It no longer polls every 20 ms. Tabs load faster
* **Bluetooth:** the macOS desktop app now supports Bluetooth LE. Modules that use one characteristic for both directions (HM-10 firmware, MLT-BT05, T-Motor Velox F7 SE) now connect
* **USB-UART bridge chips:** a flight controller behind a USB-UART chip (for example CP210x) now reconnects after **Save and Reboot**. The app supports more bridge chips

### 1.5 Mobile Apps: iOS and Android

2026.6 had a Tauri-based iOS app on TestFlight and a Tauri-based Android build. **Both Tauri mobile builds are removed.** The desktop app does not change.

**iOS** has a new **native iOS app**, written in Swift and SwiftUI. It is a field companion. It shows pre-flight checks (battery, receiver channels, arming-disable reasons in plain language) and live attitude. You can change simplified tuning, rates, filters, VTX, GPS and flight plans. It also gives cloud backups and the CLI. It connects through Bluetooth, through [Betaflight Bridge](#3-betaflight-bridge), or to an ExpressLRS receiver in Wi-Fi mode. It needs iOS 17 or later and **Betaflight 2026.12 firmware**. Use the desktop or web app to flash firmware and for full setup.

:::warning
The Tauri-based iOS TestFlight build from 2026.6 will not get updates. To use the new native app, [join the public beta on TestFlight](https://testflight.apple.com/join/E6bH9Rcf).
:::

**Android** has one app, built on Capacitor, with the application ID `com.betaflight.android`. It will be available on **Google Play** after the release. The signed APK is on each GitHub release and on [downloads.betaflight.com](https://downloads.betaflight.com). The new app does not replace an old Android install. Install the new app, then remove the old app.

On Android, the app has a new **phone layout**. The sidebar and status bar float over a full-screen view, and the layout stays clear of the system bars.

### 1.6 Desktop App and Downloads

* **macOS:** the DMG files are signed and notarised. They open without a Gatekeeper warning
* **Native file dialogs:** the desktop app uses native save and open dialogs. File export now operates on macOS and Linux. The app writes large blackbox files to disk in parts
* **Folder memory:** each save and open dialog remembers its last folder. This includes firmware, CLI, backups, VTX tables, blackbox logs, exports, OSD fonts and boot logos
* **Linux:** the WebKitGTK DMA-BUF renderer is off by default. This stops buttons (for example **Save**) from disappearing on some GPUs. To change it, use `WEBKIT_DISABLE_DMABUF_RENDERER`
* **Downloads page:** nightly builds are grouped in the same way as release downloads

### 1.7 Blackbox Viewer

The Blackbox Viewer is now fully part of the app. The standalone Blackbox Explorer is retired. The [blackbox-log-viewer](https://github.com/betaflight/blackbox-log-viewer) repository is frozen and will be archived on 1 December 2026.

* **3D flight path:** a 3D panel shows the GPS track over OpenStreetMap or satellite tiles. The colour of the track shows altitude. Click the path to go to that point in the log. Follow mode keeps the craft at the centre. This needs GPS. Barometer, attitude and magnetometer data make it better
* **Export Video:** make an MP4 or WebM video of the selected range or the full log. The video includes the graph, sticks, craft and analyser
* **Full screen:** press `F` to show the viewer over the sidebar and status bar. Press `Esc` to go back
* **Logs stay loaded** when you go to a different tab and come back
* **Drag and drop** a log file onto the tab. This also operates in the desktop app
* **Debug modes from the firmware:** the app makes its debug mode names, field labels, units and scales from the firmware source for each API version. When a log contains its own debug mode and field names, the app uses them
* **Workspaces:** exported workspaces include the header panel layout
* **Curve min/max:** you can set min/max for the selected curves from a selected time interval. The spinner step changes with the range of the curve
* **Trace smoothing** can go above 100% again (to 10000%)
* **Download from FC** stays available when a log is loaded
* The viewer reads rcCommand correctly from 2026.12 logs, which use the new `rc_command_scale` header
* The viewer shows names for the disarm reasons added after 4.5 (ez-landing, crashflip, launch abort), and for PARALYZE

### 1.8 Find Settings Faster

* **Global settings search:** press `Ctrl+K` (`Cmd+K` on macOS) to search for settings in all visible tabs. Select a result to go to the setting
* **Modes search:** type in "Search modes" on the Modes tab to filter the list
* **AUX channels:** on the Receiver tab, unused AUX channels are grey. Channels used by a mode range are cyan. A channel that is in an active range is bright cyan
* **CPU temperature** shows in the status bar (MSP API 1.46 and later)
* **Battery profile capacity:** with battery profiles, the OSD capacity alarm uses the capacity of the active battery profile

### 1.9 Autotune

* **Phase margin:** the app now calculates phase margin, crossover and loop delay from the open-loop response. Before, it used the closed loop, and the result was too much D reduction
* **Margin target:** select **Aggressive**, **Normal** or **Conservative** (50, 60 or 72.5 degrees). The app sets P and FF to get that margin. It also limits the gain if the craft is close to instability
* **Confirmation:** **Apply Gains** asks you to confirm before it writes to the flight controller
* **I-frame only logs:** the app uses the correct sample rate for these logs

### 1.10 Flight Plan

* **Units:** select metric (m, km/h, km) or imperial (ft, knots, nautical miles). The stored waypoints do not change
* **Location consent:** if the browser cannot give a location, the app asks before it finds your location from your IP address

### 1.11 Account Deletion

You can delete your Betaflight account from the User Profile tab, or at [app.betaflight.com/delete](https://app.betaflight.com/delete). This deletes your profile, passkeys, sign-in tokens and cloud backups.

### 1.12 Languages and Right-to-Left Layout

* The app now shows right-to-left languages correctly
* New languages: **Arabic**, **Hebrew**, **Serbian** (Latin and Cyrillic) and **Kazakh**
* The "System default" language entry shows in the system language

### 1.13 Firmware Flasher and Board Support

* **Board support labels** follow the new [hardware support policy](https://betaflight.com/blog/who-supports-what-betaflights-hardware-policy). Each target is **Betaflight Supported**, **Manufacturer supported** or **Legacy**. A banner tells you where to get help
* **Withdrawn releases** do not show for a board
* **Local firmware** from a file shows that it is not from the Betaflight cloud build
* **Release options:** "early releases" (releases less than 14 days old) replace release candidates. The options are "Show releases", "Show all releases" and "Show development releases"
* **New USB IDs:** UnicMicro **UM32** (VCP and DFU) and **GD32H7** DFU
* **RP2350 pixel OSD:** the OSD tab can load and preview the small font for the Pico framebuffer OSD

### 1.14 Saves

* **Failed saves:** when a save fails, the app shows one message that tells you which step failed. Before, the error went only to the console
* **Long flash erase:** the app waits for the full erase time of the flash chip. A 16 MB chip can need more than three minutes. The app no longer shows "Connection lost" during an erase

### 1.15 TypeScript and One Source of Truth

Almost all of the app source is now **TypeScript**, and CI does a type check. All flight controller state is in one **Pinia** store. This work found and fixed many old bugs. You will see no other change.

### 1.16 Other App Changes

* **Magnetometer calibration:** the tool now uses the full auto-align tumble only. The magnetic model can get its location from GPS, a cached location, IP lookup, the device or pasted coordinates. Zone coverage agrees with the sphere view. "Finish calibration" operates on a compass that has no calibration. On older firmware, you can calibrate more than once, and a countdown shows
* **Integrated Yaw** does not show on API 1.49 and later, because the firmware no longer has it
* **OSD:** compact CRSF link quality variant and the airspeed element. The preview updates when you change an element variant
* **WP CAPTURE** mode has help text on the Modes tab
* **Radio emulator:** the sticks popup on the Receiver tab follows the app theme
* **Light mode:** soft buttons have more contrast (WCAG AA). Theme colours are the same in all tabs
* **Tab layout:** sections, buttons and scales are the same in all tabs
* **Custom mixers** show a 3D model on the Setup tab
* **Virtual Mode** reports build options that the app recognises

### 1.17 App Bug Fixes

* Fixed motor stop with 3D mode. Motors could stay at high reverse throttle after the motor direction wizard, the reorder wizard, or when you left the Motors tab
* Fixed the Octo Flat + motor order diagram. The motor numbers were 45 degrees out
* Fixed the Modes tab, which showed "255" for a range saved on Auto
* Fixed the drag of channel ranges in right-to-left layouts
* Fixed the legacy 3D renderer, which did not show the model
* Fixed the GPS map, which went outside its box after you opened the Blackbox Viewer
* Fixed the Blackbox Viewer debug-mode curve scale for ALTITUDE, GPS Rescue and autopilot traces
* Fixed the dynamic filter curves on the spectrum chart
* Fixed the Pitot switch in the live sensor panel
* Fixed the packet error count in the status bar
* Fixed graph axis labels in right-to-left layouts

## 2. The Firmware

### 2.1 Key New Features

#### Per-Feature Serial Port Assignment

The serial port configuration is new. Before, each UART had one "function mask" (the long number on a `serial` line) and four shared baud rates. Now **each feature has its own port setting**, and where necessary its own baud rate:

| Feature | Settings |
|---------|----------|
| Serial receiver | `rx_uart` |
| GPS | `gps_uart`, `gps_baud` |
| MSP | `msp_1_uart` to `msp_3_uart`, `msp_1_baud` to `msp_3_baud` |
| Telemetry | `telemetry_N_protocol`, `telemetry_N_uart`, `telemetry_N_baud` (up to three slots, as the build permits) |
| Blackbox to serial | `blackbox_uart`, `blackbox_baud` |
| OSD / display port | `osd_uart` |
| OSD custom text | `osd_custom_text_uart`, `osd_custom_text_baud` |
| VTX | `vtx_type`, `vtx_uart` |
| ESC sensor | `esc_sensor_uart` |
| Rangefinder | `rangefinder_uart` |
| Optical flow | `opticalflow_uart` |
| RunCam device | `rcdevice_uart` |
| Gimbal | `gimbal_uart` |

You set ports by name, for example:

```
set gps_uart = UART3
set gps_baud = 115200
set telemetry_1_protocol = SMARTPORT
set telemetry_1_uart = UART2
save
```

Important points:

* **CRSF and GHST telemetry** use the receiver port. They do not need a telemetry slot. When the serial receiver is **MAVLink**, telemetry also uses the receiver port (the `TELEMETRY` feature must be on)
* **MSP display ports and MSP VTX** (DJI, HDZero, Walksnail): set `osd_uart` and `vtx_type = MSP`. If you do not set `vtx_uart`, the VTX uses the OSD port. This MSP link does not use one of the three `msp_N_uart` slots
* **Serial sensors** use `rangefinder_uart` or `opticalflow_uart`. If the sensor uses MSP, the firmware opens an MSP port on it automatically
* **All serial rangefinders use one port function.** `rangefinder_hardware` selects the driver
* **Conflicts:** if two features cannot share a port, the firmware removes only those claims at boot. It does not reset all ports. It records the reason (see [CLI Changes](#25-cli-changes))
* A soft serial port with a baud rate that is too high for soft serial does not open. Before, the firmware changed the rate to 19200

The new **`peripherals`** CLI command shows all connected devices: each serial port and the features that claim it, soft serial ports and why they cannot open, DroneCAN nodes, and the detected sensors and their bus. A star shows the feature that has the port.

The `serial` command is still available:

* With no arguments, it shows each port claim as a `set` command
* The **legacy line form** (`serial <port> <mask> <msp baud> <gps baud> <telemetry baud> <blackbox baud>`) still operates, so you can restore a `diff` from older firmware. The firmware changes it to the new settings and shows a deprecation warning
* `dump` and `diff` no longer contain `serial` lines

:::note
The MSP messages `MSP_SET_CF_SERIAL_CONFIG` and `MSP2_COMMON_SET_SERIAL_CONFIG` are retired. The read messages now report a zero function mask. Use the 2026.12 app to configure ports. Older apps show all ports as unassigned.
:::

#### Kalman Filter Position Estimator

A new **Kalman filter** now calculates altitude and position for Altitude Hold, Position Hold, GPS Rescue, the OSD altitude and the vario. It combines GPS, barometer, rangefinder, optical flow and accelerometer data. It has one filter each for east, north and up. Each filter tracks position, velocity and acceleration.

* **Steadier altitude hold:** in indoor tests with baro, rangefinder and optical flow (no GPS), the Altitude Hold error decreased from approximately 52 cm to approximately 4 cm
* **Ground effect:** prop wash makes the baro incorrect near the ground. With a rangefinder, the filter uses less baro data from 50 cm down to 20 cm
* **Terrain following:** when the rangefinder is the best height source, altitude follows the terrain. When the craft climbs out of rangefinder range, the baro takes over smoothly
* **Fault rejection:** the filter ignores a sudden jump in a sensor value if the craft could not move that far. It accepts a real fast climb
* **GPS quality:** when the GPS accuracy decreases, GPS data has less effect
* **Baro and GPS balance:** `altitude_prefer_baro` now has a default of **50** (was 100). 100 is full trust in the baro. 50 doubles the assumed baro noise. Below 50, the firmware also slowly calibrates the baro against GPS altitude. Use this for a baro that drifts
* **Altitude feed-forward:** the new `ap_altitude_a` setting (default 30) adds acceleration feed-forward to the altitude controller

:::note
`altitude_prefer_baro` keeps its stored value when you upgrade. A stored value of 100 stays at 100. To use the new default, enter `set altitude_prefer_baro = 50`.
:::

**Baro temperature drift:** many barometers drift with temperature. The new `baro_drift` setting corrects this. The unit is cm of altitude change for each 10 °C increase in baro temperature (range -500 to 500, default 0). To measure it:

1. Enter `set debug_mode = BARO`. Let the flight controller cool to room temperature.
2. Open the Sensors tab in the app. Show the debug values. Record the baro temperature.
3. Record the altitude change, in cm, when the baro temperature is 10 °C higher.
4. Enter `set baro_drift = <value>`, then `save`. If altitude increases as temperature increases, the value is positive.

Each flight controller needs its own value. You measure it one time only.

**Lower latency:** Altitude Hold and Position Hold now run immediately when the estimator has new data. Before, they could use data up to 10 ms old. In the `tasks` output, the `ALTITUDE` task is now `POSITION`. With the UP-T1 optical flow sensor, Position Hold runs at 100 Hz.

**Optical flow only:** Position Hold now operates on a craft that has optical flow and no baro or GPS. The firmware now enables tasks by feature, not by sensor detection. A rangefinder or optical flow sensor with its feature off does not enable ALTHOLD or POSHOLD.

New debug modes: `POSITION_EST` and `VELOCITY_EST`. The `ALTITUDE` debug mode now also logs the rangefinder, baro and GPS altitudes.

#### Compass: `trust_mag` Removed

:::warning
**`trust_mag` is removed. The firmware now uses a compass that is enabled and calibrated.** The 2026.6 notes told compass users to set `trust_mag = ON`. You no longer do this. The firmware uses the compass for heading (IMU, Position Hold, GPS Rescue and MAG mode) when all these conditions are true:

* The magnetometer is enabled (detected, and not set to `NONE`)
* It is **calibrated, and the calibration is saved** (`mag_calibration` is not `0,0,0`)
* It gives valid data

What to do:

* **To use the compass:** calibrate it and save. The firmware ignores a compass that is not calibrated
* **To not use the compass:** enter `set mag_hardware = NONE`, then `save`. If you had a calibrated compass and `trust_mag = OFF`, the firmware **will use the compass after the upgrade** unless you do this
* Remove `set trust_mag = ...` from a saved diff before you restore it
:::

A related fix: the firmware no longer marks the compass as unhealthy when one axis reads exactly zero. This caused random jumps in heading error.

#### Heading Hold in Position Hold

Position Hold now holds the **heading** and the position. The craft no longer turns slowly in yaw. This needs a compass, or a heading that the firmware learned from GPS. The yaw stick still turns the craft. **MAG mode** operates again and uses the same heading hold.

The autopilot, Position Hold and GPS Rescue now use the same heading control. `ap_yaw_p` and `ap_max_yaw_rate` are now on all multirotor builds. The new defaults are 30 and 150 deg/s (were 50 and 30 deg/s), so the craft turns to a new heading much faster. `ap_yaw_d` is removed. The new `AUTOPILOT_HEADING` debug mode logs the target and measured heading.

#### GPS Rescue Improvements

These changes apply to the standard GPS Rescue in all GPS builds:

* **Near home:** if a rescue starts above or very near home, the craft climbs straight up. It does not fly away first
* **Smoother return:** the craft accelerates smoothly at the start of the return. It starts to slow down at two times `gps_rescue_descent_dist` from home. In flight tests, heading errors were one or two degrees. Landings were typically 1.5 m to 2 m from the take-off point (this depends on the GPS)
* **Faster rotation:** the rescue uses the shared yaw controller (`ap_yaw_p`, `ap_max_yaw_rate`), so it turns toward home much faster. `gps_rescue_yaw_p` had no effect and is removed
* **Heading recovery:** on a craft with no trusted heading, the rescue now pitches forward to learn its heading. Before, it could stay stopped until it timed out
* **Long flights:** a rescue that starts more than approximately 36 minutes after power-up no longer fails a timing check
* The `GPS_RESCUE_TRACKING` debug mode has new fields: 0 ground speed, 1 target speed, 2 current altitude, 3 target altitude, 4 heading, 5 heading error, 6 distance to home, 7 rescue phase

#### Autopilot and Flight Plan (Experimental)

:::danger
Autopilot and flight plan missions are still **experimental**. Most of this work was tested in the SITL simulator. Early field tests (mostly GPS Rescue flown as a mission) found the problems fixed below. The feature is **not ready for general use**. Fly it only for tests, and be ready to take control.
:::

When the build includes Flight Plan, the autopilot flies GPS Rescue (from the switch or from failsafe) as a mission. The OSD shows **N-RESC**. Builds without Flight Plan use the standard GPS Rescue. When you select Flight Plan in a cloud build, the build also includes GPS, Altitude Hold and Position Hold.

Changes:

* **Climb rate and nose direction per waypoint:** each waypoint has a vertical rate and a yaw behaviour. The `waypoint` CLI command shows them. The altitude command now changes at the rate of the leg. A `FACE_TARGET` leg waits until the nose is within 30 degrees of the leg before it moves. A `FACE_NEXT` leg turns toward the next waypoint while it climbs
* **Speed and braking:** legs fly at the commanded speed. Braking uses the full `ap_max_angle`. Speed continues smoothly through a corner
* **Climbs:** short climbs are now completed. A climb leg does not end before the climb is complete
* **Heading:** a leg with no heading to follow holds its start heading. The yaw stick can still change it
* **Rescue as a mission:**
  * The rescue uses `gps_rescue_descent_dist` again
  * The return slows at a steady 1 m/s² and stops approximately 0.3 m from home. Before, it landed 1 m to 4 m short
  * A rescue that starts at high speed brakes and returns. It does not trigger its own fence
  * A rescue that stops inside `gps_rescue_min_start_dist` lands where it stops
  * A rescue with no compass and no learned heading climbs level, learns its heading, then flies home. Before, it landed where it lost RC
* **Landing:** a landing that starts more than 200 m above the ground no longer stops and disarms in the air
* **Long holds:** a waypoint hold longer than approximately 36 minutes no longer ends early
* **RX loss:** a craft that flies a mission no longer disarms approximately 1 s after RC loss because the throttle stick is low. The firmware uses `ap_rx_loss_policy` (`CONTINUE` or `LAND`)
* **MAVLink:** the firmware accepts uploaded waypoints with no yaw value (NaN)
* **Climb rate limits:** `gps_rescue_ascend_rate` and `alt_hold_climb_rate` now limit the climb rate correctly. Before, a 1 m/s setting gave 3.6 m/s. Altitude Hold now recovers more slowly from a large altitude error
* New debug modes: `FLIGHT_PLAN`, `AUTOPILOT_CLIMB`, `AUTOPILOT_GUIDANCE` and `AUTOPILOT_LANDING`

#### Fixed-Wing Navigation, Launch and Autoland (Experimental)

:::danger
Fixed-wing navigation and launch mode are **experimental**. They were developed with a fixed-wing model in the SITL simulator and some early test flights. The launch mode has only unit tests. Use them for tests only, and keep your hands on the sticks.
:::

Wing (`USE_WING`) builds get autopilot flight modes. They do not need an airspeed sensor:

* **ALTHOLD** (needs the Altitude Hold build option)
* **POS HOLD**, which flies a loiter circle (needs the Position Hold build option)
* **AUTOPILOT missions, GPS Rescue and an approach autoland** (need the Flight Plan build option). Without Flight Plan, a wing has no GPS Rescue
* **Coordinated turns:** when the autopilot controls roll, it adds the yaw rate of a level turn at the current bank. Twin-motor wings with differential-thrust yaw can fly loiters and rescues. `ap_wing_turn_yaw_ff` sets the amount (percent, default 100, 0 is off). Without a pitot, the firmware estimates airspeed from the TPA speed model
* **Rescue retry:** if a wing rescue stops because of a flyaway or stall, and the position is valid, it tries again one time. It flies straight home and climbs on the way

Setup:

* Trim `angle_pitch_offset` so that the wing flies level at `ap_wing_cruise_speed` (dm/s, default 150) with `ap_wing_cruise_throttle` (percent, default 50)
* The altitude of a wing `LAND` waypoint is the ground elevation at that point. For a wing that you arm on the ground (not thrown), enter `set ap_wing_land_launch_height = 0`
* Set the loiter with `ap_wing_loiter_radius` (m, default 60) and `ap_wing_loiter_direction` (`RIGHT` or `LEFT`). Set the bank limit with `ap_wing_max_bank` (default 35)
* On wing builds, some autopilot defaults are different: `ap_waypoint_arrival_radius` 1000 (10 m), `ap_geofence_action` = `RTH`, `ap_landing_descent_rate` 200, `ap_landing_detection_time` 20

All wing autopilot settings start with `ap_wing_`. See the [settings table](#29-settings-changes).

#### Wing Launch Mode (Experimental)

A new **LAUNCH** mode helps with hand, bungee and rolling launches. It is on all wing builds.

1. Select LAUNCH **before you arm**. You cannot engage it in flight.
2. Increase the throttle. The motor goes to `launch_idle_throttle` after `launch_idle_delay`.
3. Throw the wing. The firmware detects the throw from acceleration (`launch_detect_accel`, unit 0.1 g, default 19), speed (`launch_detect_velocity`, cm/s) and time (`launch_detect_time`, ms), within `launch_max_angle`.
4. After `launch_motor_delay` (ms, default 500), the motor increases to `launch_throttle` (percent, default 80) during `launch_spinup_time`. The wing climbs at `launch_climb_angle` (degrees, default 18).
5. The launch ends at `launch_timeout`, at `launch_max_altitude` (0 is off), or when you move a stick more than `launch_abort_deadband`. Control goes back to you during `launch_end_time` (ms, default 3000).

Safety:

* If the wing banks or dives more than `launch_abort_angle` (default 60, 0 is off) after detection, control goes back to you
* If you switch LAUNCH off before the throw, the firmware **disarms** (disarm reason `LAUNCH_ABORT`). You must move the arm switch off and on again. This prevents a high throttle stick from going directly to the motor

OSD warnings: `RAISE THROTTLE`, `LAUNCH IDLE`, `READY TO LAUNCH`, `LAUNCHING`, `LAUNCH FINISHING`. The `LAUNCH` debug mode logs the state and the exit reason.

#### Wing TPA: Reference-Speed Curve

Advanced TPA on wings has a third curve: `set tpa_curve_type = VREF`. Tune P, I, D and S at a comfortable middle speed. Set that speed as `speed_curve_vref` (m/s, default 20). The firmware then scales the PID gains by `(vref / speed) ^ power`:

* `speed_curve_power`: curve power, unit 0.1 (5 to 30, default 20, a square law)
* `speed_curve_min`: lowest scale at high speed, unit 0.01 (5 to 99, default 25)
* `speed_curve_max`: highest scale at low speed, unit 0.01 (100 to 1000, default 200)

The TPA speed model now uses full voltage when there is no battery voltage reading. Wings without a voltage sensor now get a live speed estimate.

#### Pitot Tube Airspeed Sensor

Betaflight now supports a **pitot tube airspeed sensor** for fixed-wing aircraft. There are two sources:

* **MS4525** differential pressure sensor on I2C
* **DroneCAN** airspeed nodes (`RawAirData` message)

`pitot_hardware` selects the primary source. If both are installed, the other source is a fallback. The sensor sets its zero at power-up. Set the I2C location with `pitot_bustype`, `pitot_i2c_device` and `pitot_i2c_address`.

Airspeed is available in:

* **OSD:** new **Airspeed** element (`osd_airspeed`)
* **Blackbox:** airspeed and differential pressure, as signed values (a reversed or blocked tube shows negative airspeed). To disable, enter `set blackbox_disable_pitot = ON`
* **MSP:** new `MSP_PITOT` (170) message
* **Debug:** new `PITOT` debug mode
* **`status`:** now shows detected optical flow and pitot sensors

:::note
Pitot support is not in the standard builds. To include it, select **Pitot** in the build options on the Firmware Flasher tab. This includes the MS4525 driver on boards with I2C. For a DroneCAN airspeed sensor, also select **DroneCAN**.
:::

#### DroneCAN Improvements

* **DroneCAN is a build option.** Before, every H7, G4 and C593 build included it (approximately 12 KB of flash and 2.5 KB of RAM on an H743). To include it, select **DRONECAN** in the build options. **DRONECAN_ESC** also includes the stack
* **Bus list in `status`:** shows each node with its name, health and data. A node that stops shows the time since it was last heard:
  ```
  DroneCAN: node 10, device 1
    node 123: org.ardupilot.MatekG474-GPS (OK) GPS MAG
    node 125: org.ardupilot.TBS-L431-Airspeed (OK) AIRSPEED
  ```
* `status` shows `DroneCAN: DISABLED (set dronecan_enabled = ON)` when the stack is in the build but off
* **Satellite count:** a DroneCAN GPS now reports satellites while it gets a fix. It also reports satellites in view, HDOP and VDOP
* **Bus-off recovery:** after a CAN fault (for example, when you connect a node to a live bus), the FDCAN peripheral now recovers automatically. Before, DroneCAN stopped until a reboot
* **FDCAN on STM32C562 and STM32C5A3**, with full pin tables

### 2.2 New Platform Support

#### GD32H7 (Initial)

2026.6 added the GigaDevice GD32H7 vendor SDK. 2026.12 adds the **Betaflight platform layer**, with a **GD32H757VI** reference target. It supports UART, SPI, I2C, ADC, USB VCP, DShot, PWM output, LED strip, SD card, EXTI, beeper and on-chip config storage.

:::warning
GD32H7 support is a base for manufacturers to bring up new hardware. There are no production GD32H7 flight controllers yet.
:::

#### STM32H753

The **STM32H753** is now a build target, with 2 MB flash.

#### STM32C5

* **SD card** in SPI mode for blackbox (the C5 family has no SDMMC peripheral)
* **USB mass storage** to read blackbox logs from the SD card
* **FDCAN** on STM32C562 and STM32C5A3
* **Camera control** on C5 and N6 boards with a camera-control pin
* Correct SPI clock for the 144 MHz bus clock

#### STM32N6

These fixes come from STMicroelectronics:

* `micros()` jumped by approximately 10 seconds during part of each millisecond. The timer scale now uses the CPU clock
* SPI now uses polled mode on N6. The DMA path was not complete, and the gyro could stop
* The firmware now correctly uses external octal flash in octal DTR mode
* Timer options that the STM32N657 does not have are removed

#### Raspberry Pi Pico 2 (RP2350)

* A PIO UART now uses a PIO state machine only for the directions that the port uses. Boards with many PIO UARTs and an LED strip no longer run out of state machines
* Larger SD card blackbox cache, so fewer frames are lost on slow cards
* Correct inter-byte timing for PIO UART
* Hardware UART options stay the same after a baud rate change
* Approximately 5.5 KB of RAM saved on non-trace builds
* Board configs can make the framebuffer OSD the default display port

#### ESP32-S3

* The ESP32-S3 now runs at its full **240 MHz**. Before, it stayed at 80 MHz
* Interrupt-safe critical sections now operate (before, they did nothing)
* PID, mixer, filter and interrupt code runs from internal IRAM
* Faster SPI and DMA transfers
* Fixes for SPI mode 3, GPIO open-drain and pull-ups, servo and beeper output, DShot motor count, system reset and `micros()` reads

#### Other Platform Changes

* **ExpressLRS SPI receivers on AT32F435** boards
* **X32M7:** removing the SD card no longer causes long delays
* **USB device name:** all platforms now show as **`Betaflight (<board name>)`**, and USB mass storage as `Betaflight (<board name>) MSC`. If a script or udev rule uses the old USB product name, update it

### 2.3 New Hardware Support

#### Sensors

| Type | Sensor | Notes |
|------|--------|-------|
| IMU | Bosch BMI423 | 6-axis, SPI, 6.4 kHz gyro |
| IMU | ST LSM6DSV32X | 6-axis, SPI, ±32 g / ±4000 dps |
| Magnetometer | Bosch BMM350 | I2C |
| Magnetometer | AKM AK09916 (`AK9916`) | I2C. The compass in ICM-20948 GPS modules (for example Here2 and Here3 in I2C mode) |
| Airspeed | TE MS4525 | I2C pitot sensor |
| Airspeed | DroneCAN airspeed node | `RawAirData` |

Sensor fixes:

* **ICM-45686:** the anti-alias filter and the gyro low-pass filter were not enabled. They are now enabled, and noise is near the ICM-42688-P level. The default gyro hardware low-pass is now 200 Hz
* **LSM6DSV16X and LSM6DSK320X:** now run at the correct 1 kHz and 8 kHz rates (were 960 Hz and 7.68 kHz). The accelerometer low-pass is on
* **ICM-56686:** filter and interrupt setup follows the datasheet

#### Flash and Storage

* **Infineon/Cypress FM25V02A** SPI FRAM (256 Kbit)

### 2.4 Protocol and Connectivity

#### MAVLink

* **Ground station commands:** a GCS can change the flight mode (`DO_SET_MODE`), start return to launch (`NAV_RETURN_TO_LAUNCH`, which starts GPS Rescue), set home (`DO_SET_HOME`), reboot (`PREFLIGHT_REBOOT_SHUTDOWN`, not when armed) and disarm (`COMPONENT_ARM_DISARM`). The firmware replies with `COMMAND_ACK`
* **Missions:** `MISSION_SET_CURRENT` goes to a selected waypoint. The firmware accepts geofence upload and download (in RAM only; it does not save or apply the geofence yet)
* The firmware accepts waypoints with no yaw value (NaN). QGroundControl sends this by default
* Betaflight now identifies as **`MAV_AUTOPILOT_BETAFLIGHT`** in `HEARTBEAT`. It now uses the upstream MAVLink library
* The firmware rejects `MAV_CMD_NAV_FOLLOW` mission items (removed from the MAVLink standard)
* Telemetry runs on the port of a MAVLink receiver automatically

:::note
Standard builds **cannot arm through MAVLink**. A GCS can disarm, change mode, return to launch and reboot. To arm through MAVLink, the build must include `ENABLE_REMOTE_ARM`. All normal arming checks still apply.
:::

#### MSP

* **API version 1.49**
* **GPS:** `MSP_RAW_GPS` now also reports HDOP, VDOP and satellites in view (added at the end, so older readers are not affected)
* **Airspeed:** new `MSP_PITOT` message
* **CLI over MSP:** the new `MSP2_CLI_COMMAND` runs a CLI command through packet links such as MSP over CRSF. It does not run commands that reboot or take the port. It is on SITL builds only for now (`USE_MSP_CLI_COMMAND`)
* **Range checks:** MSP writes now use the same limits as the CLI. The firmware rejects incorrect indexes and values that do not agree (mode ranges, adjustment ranges, RX map, servo rules, `rx_min_usec` higher than `rx_max_usec`). It limits other values to their range. Some CMS ranges are also corrected to agree with the CLI
* **No reboot when armed:** the firmware rejects `MSP_REBOOT` when armed
* Serial port configuration through MSP has changed (see [Per-Feature Serial Port Assignment](#per-feature-serial-port-assignment))

#### MSP over CRSF, S.Port and F.Port

* MSP over CRSF no longer stops after a burst of requests
* A new MSP reply, sent while a long reply is in progress, now starts with a start frame. This fixes failed reads on S.Port and F.Port after one lost frame
* Fixed a hard fault in MSP over telemetry on processors that cannot read unaligned memory (ESP32-C5 and other RISC-V parts)

#### OSD

* **Compact link quality:** a new variant of the Link Quality element shows only the LQ value for CRSF receivers. It does not show the RF mode. Select it as the element variant on the OSD tab
* **Airspeed** element for pitot sensors
* The **current draw** element shows a minus sign for negative current
* The RSSI alarm now operates correctly when `osd_rssi_alarm = 100`
* CMS: timer precision **Tenths** shows correctly. The failsafe landing time shows in seconds

### 2.5 CLI Changes

* New **`peripherals`** command (see [Per-Feature Serial Port Assignment](#per-feature-serial-port-assignment))
* **`serial`** shows port claims as `set` commands. The legacy line form is deprecated, but still operates
* **Config reset reason:** after a configuration reset, the reason shows as `# config reset: <reason>` in `version`, `diff`, `dump`, `status` and `env`. The reasons are `EMPTY`, `CORRUPT`, `VERSION`, `PG_MISSING`, `PG_VERSION`, `BOARD`, `CLI`, `MSP`, `BUTTON` and `SERIAL`. Support IDs and backups include it
* **`status`** now shows:
  * The DShot bitbang failure cause, for example `DSHOT_BBANG: MOTOR_PIN_CONFLICT`, `NO_PACER` or `TOO_MANY_PORTS`
  * The SPI error count
  * DroneCAN nodes, or `DroneCAN: DISABLED`
* New settings: see the [settings table](#29-settings-changes)

:::warning
**`dma TIMUP` lines are rejected.** The timer-update DMA setting is removed from STM32 targets that did not use it. If an old diff has `dma TIMUP ...` lines, ignore the errors. The `dma` command now shows UART, LPUART and SDIO DMA correctly.
:::

### 2.6 Flight Controller Changes

* **Integrated yaw removed:** the integrated yaw feature, and its `use_integrated_yaw` and `integrated_yaw_relax` settings, are removed
* **CRSF feed-forward interpolation:** before, CRSF and ELRS setups got feed-forward interpolation after every boot until a save or profile change. Now CRSF flies without interpolation from boot, as intended. The first flight after power-up can feel slightly different
* **Dynamic notch at low frequencies:** with `dyn_notch_min_hz` below approximately 60 Hz, notches could stop in place for some seconds. The firmware now calculates the noise floor from 60 Hz up. The search range does not change. The default (100 Hz) is not affected
* **Chirp in Angle mode:** in Angle mode, the firmware now injects the chirp before the angle controller. One chirp log can tune both the angle loop and the rate loop. Acro mode does not change. The new `chirp_repeat` setting (1 to 9, default 1) repeats the chirp on the current axis while you hold the CHIRP switch, with 750 ms between runs. The OSD shows the axis and progress (for example `R2/5`)
* **Motor test safety:** if the USB link stops while motors spin disarmed (for example in a motor test), the motors stop in approximately 10 ms. This applies to all disarmed motor tests, also through UART or wireless. It does not affect armed flight. USB disconnect detection on F4 is fixed
* **`min_check`:** the maximum is now 1999. A value of 2000 caused a division by zero
* **Smoother throttle:** the throttle curve and `min_check` now use floating point. Before, up to 3 µs of throttle was lost
* **Blackbox rcCommand:** the firmware now logs rcCommand as normalised stick deflection: roll, pitch and yaw are -1000 to 1000, and throttle is 0 to 1000. A new `rc_command_scale` header identifies this format. `DEBUG_FEEDFORWARD[3]` now has a unit of 0.001

### 2.7 Blackbox

* **Build key and release name** are in the log header of cloud builds
* **Debug mode name** (`debug_mode_name`) is in the log header with the debug mode number
* **Each debug field has one meaning and a label.** The app and the log viewer get the labels from the firmware. Fields that had two meanings are now separate:
  * Battery sag compensation moves from `BATTERY` to the new `SAG_COMPENSATION` mode
  * The UPT1 optical flow and rangefinder move from `LIDAR_TF` to the new `UPT1` mode
  * The Redpine receiver moves from `RX_FRSKY_SPI` to the new `RX_REDPINE_SPI` mode
* **`RPM_FILTER`** logs the filtered motor frequencies again
* New debug modes are added at the end of the list. Existing `debug_mode` numbers do not change
* `blackbox_disable_servos` now disables servo logging
* Fixed a division by zero when the logging rate gives only I-frames
* Pitot sensor values are logged (see [Pitot Tube Airspeed Sensor](#pitot-tube-airspeed-sensor))

### 2.8 Bug Fixes

:::warning
**Wing builds with Altitude Hold or GPS Rescue in 2026.6 could stop the motor.** On 2026.6 wing builds, ALTHOLD or GPS Rescue (from a switch or from failsafe) could engage a placeholder controller with zero throttle. Now these modes engage only when the controller is available.
:::

**Flight**

* **Timer wrap:** these failed after approximately 36 minutes of uptime, and are fixed:
  * Crash recovery was off from minute 35.8 to 71.6 of each 71.6 minutes
  * After 36 minutes disarmed, dynamic low-pass cut-offs did not update for 36 minutes after arming
  * In 3D mode, the I-term could reset on each motor reversal
* **Continuous adjustments:** with receivers that send fractional channel values (CRSF, SBUS, GHST), the firmware applied continuous adjustments again in each loop. Fixed
* **Horizon strength adjustment:** as a select adjustment, it went back to a low value above approximately 1924 µs. Full stick now gives 200
* **Servo throttle with DShot:** on airplane and flying-wing mixers, a servo on the stabilised throttle input stayed at minimum until approximately half throttle. Fixed
* **IMU heading from GPS course:** the attitude initialisation from the GPS course used the wrong sign. Fixed
* **GPS Rescue descent distance:** a value of 0 through MSP made the rescue hover above home. The firmware now limits it to 5 m to 500 m

**Buses, DMA and motors**

* **SPI DMA recovery:** a DMA error or lost byte could lock the SPI bus. The gyro then stopped, and the PID loop flew on old data. The firmware now stops and restarts a failed transfer, and `status` shows SPI errors
* **DShot bitbang:** the firmware ignores the completion that occurs when it stops a running stream
* **H7 gyro DMA buffer:** on some H7 builds, the gyro DMA buffer was in cached memory, and the gyro updated only approximately 100 times each second. The firmware now finds the uncached memory range from the MPU at boot
* **H723, H725, H730 and H735 ADC:** ADC DMA now runs in circular mode
* **UART reconfiguration** cannot be interrupted. Before, this could lock the flight controller (GPS baud scan, HoTT, SRXL2, CRSF)
* **STM32G4 LPUART1** operates again (for example a GPS on the GEPRC TAKERG4AIO)
* The firmware now applies the default UART6 to UART8 DMA options from board configs
* The `dma` CLI shows the correct peripheral mappings

**Sensors and receivers**

* **BMP280:** a failed read no longer gives an old pressure as new data
* **LSM6DSO:** a failed read no longer gives incorrect samples
* Builds with only IIM-42652, only BMP580/581 on SPI, or only 2SMPB-02B on SPI are fixed
* **GPS:** the baud scan is limited, so it no longer re-initialises the UART again and again. The firmware no longer configures the GPS when no GPS port is open
* **XBus RJ01** receivers decode correctly
* **SX1280 (ELRS SPI)** no longer misses a frequency hop
* **Parallel PWM receivers** (`RX_PARALLEL_PWM`) can be enabled again
* `USE_ESC_SENSOR` is gated correctly

**Storage**

* The firmware rejects blackbox download requests past the end of the flash
* SD card initialisation gets the full 1 second that the SD specification permits

### 2.9 Settings Changes

Settings with a changed or new default, range or name, compared to 2026.6. For the per-feature port settings, see [Per-Feature Serial Port Assignment](#per-feature-serial-port-assignment).

#### Removed

| Setting | Notes |
|---|---|
| `trust_mag` | The compass is used when it is enabled, calibrated and healthy |
| `use_integrated_yaw` | Integrated yaw is removed |
| `integrated_yaw_relax` | Integrated yaw is removed |
| `ap_yaw_d` | Removed with the shared yaw controller |
| `gps_rescue_yaw_p` | GPS Rescue uses `ap_yaw_p`. Also removed from the OSD menu |
| `opticalflow_lpf` | Removed with the Kalman estimator |

#### Changed

| Setting | 2026.6 | 2026.12 |
|---|---|---|
| `altitude_prefer_baro` | default 100 | default **50** (stored values are kept) |
| `ap_yaw_p` | default 50, range 0 to 500 | default **30**, range **0 to 200**, now on all multirotor builds |
| `ap_max_yaw_rate` | default 30, range 10 to 360 | default **150**, range **10 to 250**, now on all multirotor builds |
| `ap_stop_threshold` | range 0 to 100 | range **5 to 50** (default 10) |
| `min_check` | range 750 to 2250 | range **750 to 1999** |
| `tpa_curve_type` | CLASSIC, HYPERBOLIC | adds **VREF** (wing) |
| `vtx_power` | maximum one less than the VTX table power levels | maximum is the number of VTX table power levels |

#### Added (all builds)

| Setting | Default | Range | Notes |
|---|---|---|---|
| `ap_altitude_a` | 30 | 0 to 200 | Altitude acceleration feed-forward |
| `baro_drift` | 0 | -500 to 500 | cm for each 10 °C baro temperature increase |
| `chirp_repeat` | 1 | 1 to 9 | Chirp repeats for each axis (profile) |
| `pitot_hardware` | NONE | DEFAULT, NONE, MS4525, DRONECAN | Pitot builds |
| `pitot_bustype`, `pitot_i2c_device`, `pitot_i2c_address` | | | Pitot builds |
| `blackbox_disable_pitot` | OFF | | Pitot builds |
| `osd_airspeed` | | | OSD element, pitot builds |

#### Added (wing builds)

| Setting | Default | Range | Unit or notes |
|---|---|---|---|
| `speed_curve_vref` | 20 | 1 to 85 | m/s (profile) |
| `speed_curve_power` | 20 | 5 to 30 | 0.1 (profile) |
| `speed_curve_min` | 25 | 5 to 99 | 0.01 (profile) |
| `speed_curve_max` | 200 | 100 to 1000 | 0.01 (profile) |
| `launch_climb_angle` | 18 | 0 to 45 | deg |
| `launch_max_angle` | 45 | 5 to 80 | deg, tilt limit for throw detection |
| `launch_detect_accel` | 19 | 5 to 50 | 0.1 g |
| `launch_detect_velocity` | 300 | 100 to 1000 | cm/s |
| `launch_detect_time` | 40 | 10 to 1000 | ms |
| `launch_idle_throttle` | 5 | 0 to 50 | % |
| `launch_idle_delay` | 0 | 0 to 60000 | ms |
| `launch_throttle` | 80 | 0 to 100 | % |
| `launch_motor_delay` | 500 | 0 to 5000 | ms |
| `launch_spinup_time` | 100 | 0 to 1000 | ms |
| `launch_min_time` | 0 | 0 to 60000 | ms, from detection to stick abort |
| `launch_timeout` | 5000 | 0 to 60000 | ms |
| `launch_max_altitude` | 0 | 0 to 1000 | m above ground, 0 is off |
| `launch_end_time` | 3000 | 0 to 5000 | ms |
| `launch_abort_deadband` | 20 | 5 to 50 | % stick |
| `launch_abort_angle` | 60 | 0 to 90 | deg, 0 is off |
| `ap_wing_cruise_throttle` | 50 | 0 to 100 | % |
| `ap_wing_min_throttle` | 25 | 0 to 100 | % |
| `ap_wing_max_throttle` | 90 | 0 to 100 | % |
| `ap_wing_bank_throttle` | 10 | 0 to 100 | % added at 45 degrees bank |
| `ap_wing_max_climb_angle` | 15 | 5 to 45 | deg |
| `ap_wing_max_dive_angle` | 12 | 5 to 45 | deg |
| `ap_wing_max_climb_rate` | 30 | 5 to 200 | dm/s |
| `ap_wing_max_sink_rate` | 30 | 10 to 200 | dm/s |
| `ap_wing_alt_time_constant` | 40 | 10 to 200 | ds |
| `ap_wing_climb_p` | 10 | 0 to 200 | |
| `ap_wing_climb_i` | 10 | 0 to 200 | |
| `ap_wing_vert_accel` | 50 | 10 to 200 | dm/s² |
| `ap_wing_cruise_speed` | 150 | 50 to 500 | dm/s |
| `ap_wing_turn_pitch_ff` | 100 | 0 to 200 | % |
| `ap_wing_turn_yaw_ff` | 100 | 0 to 200 | %, 0 is off |
| `ap_wing_max_bank` | 35 | 10 to 60 | deg |
| `ap_wing_l1_period` | 130 | 50 to 400 | ds |
| `ap_wing_l1_damping` | 75 | 50 to 100 | 0.01 |
| `ap_wing_loiter_radius` | 60 | 20 to 2000 | m |
| `ap_wing_loiter_direction` | RIGHT | RIGHT, LEFT | |
| `ap_wing_land_heading` | -1 | -1 to 359 | deg, -1 lets the firmware select |
| `ap_wing_land_side` | LEFT | RIGHT, LEFT | pattern turn direction |
| `ap_wing_land_final_length` | 150 | 50 to 1000 | m |
| `ap_wing_land_glide_angle` | 8 | 2 to 15 | deg |
| `ap_wing_land_approach_alt` | 30 | 10 to 200 | m |
| `ap_wing_land_flare_height` | 300 | 50 to 1500 | cm |
| `ap_wing_land_flare_pitch` | 5 | 0 to 20 | deg |
| `ap_wing_land_flare_sink` | 5 | 1 to 30 | dm/s |
| `ap_wing_land_final_bank` | 15 | 5 to 35 | deg |
| `ap_wing_land_slope_tolerance` | 10 | 3 to 50 | m off the slope before go-around |
| `ap_wing_land_attempts` | 3 | 1 to 10 | |
| `ap_wing_land_max_tailwind` | 30 | 0 to 150 | dm/s, 0 never turns round |
| `ap_wing_land_launch_height` | 150 | 0 to 500 | cm, 0 for wings armed on the ground |

These settings are now also on wing builds (with the related build option): `alt_hold_climb_rate`, `alt_hold_deadband`, `pos_hold_deadband`, the `gps_rescue_*` settings, `ap_rx_loss_policy`, `ap_geofence_action`, `ap_max_distance_from_home`, `ap_waypoint_arrival_radius` and `ap_landing_detection_time`.

New hardware values: `acc_hardware` adds `BMI423` and `LSM6DSV32X`. `mag_hardware` adds `BMM350` and `AK9916`.

### 2.10 Build System and Developer Notes

This section is for persons who **build Betaflight from source**. It does not affect released firmware.

* **Version numbers:** `version.h` stays at `YYYY.MM.0`. The build gets the patch level from a `YYYY.MM.N` release tag on `HEAD`. The `-alpha` suffix is removed. `.0` is the development version
* **MAVLink** is now the upstream `mavlink/c_library_v2`, as a submodule in `lib/modules/mavlink`. After you pull, run `git submodule update --init --recursive`
* **DroneCAN** is no longer included with CAN. Add `USE_DRONECAN` (or `USE_DRONECAN_ESC`) to include it
* **Flight Plan** (`USE_FLIGHT_PLAN`) now includes `USE_GPS`, `USE_ALTITUDE_HOLD` and `USE_POSITION_HOLD`. `USE_LAUNCH_WING` is on by default with `USE_WING`
* **Parallel builds** use the number of available processors by default
* **Linking uses an arguments file.** This fixes command line length errors on Windows. GNU make 3.81 (the macOS system make) links directly and shows a warning
* **Platform ELF linking:** a platform can supply its own link command (`ELF_LINK_CMD`) and output the ELF directly (`DEFAULT_OUTPUT := elf`)
* `USE_ESC_SENSOR` no longer needs DShot, for targets with UART ESCs
* **linux-aarch64 toolchain** download added. This fixes Docker builds on Apple Silicon
* Fixes for newer GCC versions
* Config-less builds on 512 KB parts no longer include SD card support or rarely used sensors by default
* **RC values are normalised:** `rcData` holds channels as -1 to 1. `rcCommand` holds roll, pitch and yaw as -1 to 1 and throttle as 0 to 1. The helpers are in `rx/rx.h`. Settings, MSP, MAVLink and telemetry still use microseconds
* **Debug field labels:** each `DEBUG_SET()` has a `//!<` label and unit. Unit tests make sure that a debug index has only one meaning. The grammar is in `src/main/build/debug.h`
* **Tasks:** `TASK_ALTITUDE` is now `TASK_POSITION`. The estimator triggers `TASK_ALTHOLD` and `TASK_POSHOLD`
* **SITL harness:** `src/test/sitl/sitl_harness.py` has a fixed-wing model (`--binary-wing`, build with `-DUSE_WING`) and wing, rescue and heading recovery scenarios
* **Hardware support policy:** the README gives the purpose of Betaflight and its hardware support policy (manufacturers support their hardware). It sends support questions to Discord. The release schedule is now on the [Betaflight GitHub organisation profile](https://github.com/betaflight). There is no beta phase (Alpha, then Release Candidate, then Release)
* The old STM32F1 USB VCP stack is removed

## 3. Betaflight Bridge

**[Betaflight Bridge](https://github.com/betaflight/bridge)** came with 2026.6. It changes an ESP32-S3 board into a USB-host-to-Wi-Fi bridge for the USB VCP of a flight controller. It now has network discovery, secure WebSockets for browsers, flight controller flashing, new boards and its first final release.

The bridge has its own release cycle. It uses **CalVer** (`YEAR.MONTH.PATCH`), but its version numbers are not related to Betaflight versions. The first final release is **2026.9.1**. Get it from the [bridge releases page](https://github.com/betaflight/bridge/releases).

### 3.1 Use With the App

* **mDNS discovery:** each bridge announces itself as `betaflight-bridge-<id>.local`, with a `_betaflight._tcp` service. The **desktop app** shows each bridge in the connect menu
* **Raw TCP on port 5761:** for the desktop and Android apps
* **WebSocket for browsers:** a browser cannot open a raw TCP socket. The bridge supplies `ws://<ip>/serial` on port 80 and `wss://<ip>/serial` on port 443. The hosted app at app.betaflight.com needs `wss://`. The bridge status page shows its mDNS name, TCP address and `wss://` address
* **Newest connection wins:** a new client takes the bridge from the current client. The status page has buttons to disconnect the client and to restart the bridge

:::note
The `wss://` endpoint uses a self-signed certificate that the bridge makes at first boot. Before the app can connect over `wss://`, go to `https://<bridge-ip>/` one time in the same browser and accept the certificate warning. Do this again if the bridge address changes or its settings are erased.
:::

### 3.2 Flash the Flight Controller From the Bridge

The bridge web page can now **flash the flight controller over USB DFU**. You do not need a computer cable or the app. Upload a Betaflight `.hex` file. The bridge then:

1. Makes a backup of the configuration through the CLI.
2. Reboots the flight controller into its bootloader.
3. Writes and verifies the firmware.
4. Restores the configuration.

The bridge shows the progress and any failure for each step. During flashing, the bridge disconnects app clients. If the erase, write or verify fails, the board stays in DFU, and you can flash it again.

The web page now has **Status**, **WiFi**, **Bridge firmware** and **Flash FC** tabs.

:::note
The bridge accepts only Intel HEX files. It cannot flash `.bin` or `.uf2` files, or boards that show their bootloader as mass storage. It reports read protection, but does not clear it.
:::

### 3.3 Boards and Touch Displays

* **HGLRC ESP32-S3 A1:** 1.47" status display (Wi-Fi and flight controller status, connection data and a QR code), input voltage monitor and status LED
* **Waveshare ESP32-S3-Touch-AMOLED-1.75C:** new **round touch UI** for its 466 x 466 display, with Status and Wi-Fi pages
* **Status bar** on the touch UIs: Wi-Fi signal and, on boards with an AXP2101 power chip (Waveshare 1.75C and 4B), battery level, voltage and charge state. The web page shows a Battery row on these boards

Supported boards: `esp32s3-zero`, `esp32s3-wroom-freenove`, `esp32s3-touch-lcd-4b`, `esp32s3-hglrc-a1` and `esp32s3-touch-amoled-1-75c`. See the [bridge repository](https://github.com/betaflight/bridge) for details.

### 3.4 Install and Update

Each release has two images for each board:

* `betaflight-bridge-<board>-<version>-factory.bin`: a **complete factory image** for the first flash of a new board, at offset `0x0`. You do not need a toolchain. You can flash it from a browser with Espressif [esptool-js](https://espressif.github.io/esptool-js/)
* `betaflight-bridge-<board>-<version>.bin`: the **OTA image**. Upload it from the bridge web page to update over Wi-Fi. The bridge rejects an image for a different board

:::warning
A factory flash erases the bridge settings, including the saved Wi-Fi network and the certificate. The bridge starts in setup (access point) mode. You must accept the certificate in your browser again.
:::

### 3.5 Wi-Fi Fixes

* If the bridge starts before the router (for example after a power failure), it now tries the saved network again every 10 seconds, with its setup access point on. The status LED pulses blue while it is offline
* The setup access point stops 30 seconds after the bridge connects to a network
* When the bridge has no network address, the status page shows the access point address
* Wi-Fi power saving is off, so the bridge replies to discovery quickly

## Thank You

Betaflight 2026.12 is the work of a dedicated community. We thank every contributor who made this release possible.

### Firmware Contributors

Adarsh D, Alex Klimaj, Anatol Pomozov, blckmn, ctzsnooze, doggiecode0707, Dominic Clifton, Eric Katzfey, Firat Hajiyev, g945643frankie, Houston Sasseen, Jan Post, Janick Dort, jianpingwu1, Jordan Peck, Jury D'Ambros, JustStan, Kevin Plaizier, Kyrylo Yakovenko, limiez, Mark Haslinghuis, Matthias A. Eckhart, mjs1441, Mohamed A.Taha, msli-dev, nerdCopter, Oskar Neumann, Qutibah Ananzeh, Rami Kronbi, Rob Thomson, RunnyCow, Shiro, Soorya_, Steve Evans, Supafly FPV, Thomas Vestergaard, tianrking, Vladimir Demidov, Yaros, Yves

### App Contributors

Adarsh D, Albert Tumanov, Alexander Brevig, Anatol Pomozov, Atpark, avboivin, BaderFPV, Benjamin Collingwood, blckmn, ChrisRosser, ctzsnooze, GyroGhost, jianpingwu1, Jordan Peck, JosephShortt, Jury D'Ambros, Lukasz Grzella, Mark Haslinghuis, Matt Van Horn, Míguel Ángel Mulero Martínez, mjs1441, nerdCopter, Qutibah Ananzeh, rtlopez, Sam Bai, Supafly FPV, Vladimir Demidov, Vladimir Sobolev, Yaros

### Bridge Contributors

blckmn, HGLRC, Marvv90, Peter Feerick, Yaros

### And Everyone Else

Thank you to the core developers who write the code, the testers who keep it stable, and everyone who gives documentation, translations and support. You made this release possible.

Happy flying!

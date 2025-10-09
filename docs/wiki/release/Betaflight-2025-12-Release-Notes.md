---
sidebar_position: 1
sidebar_label: 2025.12 Release Notes
---

# 2025.12 Release Notes

:::warning
IMPORTANT: Check your board alignment

If your quad does not respond correctly, i.e. flips or similar, after updating check your board alignment is correct. This version removes the "non-user serviceable" gyro alignment in favour of simplifying the board alignment. Gyro alignment is the placement of the IMU on the flight controller PCB, and cannot be changed by you, so ensure the board alignment is correct for your setup. There should be an arrow on your PCB indicating the forward position on the board. If that is facing forward (to the front of the quad) then your board alignment should be 0 (ZERO). 
:::

Welcome to the Betaflight 2025.12 release. Please note we have a new calendar based release versioning convention. It will take the format YYYY.M.PATCH going forward, and we expect a release cadence of every 6 months. 

We have tried to make this release as bug free as possible. If you still find a **bug**, please report it back to us by opening an **issue [here](https://github.com/betaflight/betaflight/issues)**.

Always remember there is a dedicated [Discord](https://discord.gg/n4E6ak4u3c) server for help, support and general community.

## 1. The App

:::note
Please use the new Progressive Web App (PWA) located [online](https://app.betaflight.com).
:::

Our app is now using the same release version as the compatible firmware, i.e. 2025.12, so the app and firmware are released together.

The app has received a huge lift-up in lots of modules. 

It is now a Progressive Web App (PWA), meaning that will be changed and enhanced with the approved PR (Pull Request on Github) online. No hassle to download a new version, it will update automatically for you online (you will get a notification if it wants to update).

### 1.1 Top Bar
		
Icons for: Battery Level(if connected) Arming warning, Failsafe Mode, Serial Link Status, Gyro, Accelerometer, Magnetometer, Barometer, GPS, Sonar, Firmware, Connect/Disconnect. Each Icon is color based, changing on action, warning or simply if element is present and connected. Additional fields for Firmware version and an implemented drop down list box for "find my device" including usb, bluetooth, dfu, uart, network and more.
		
### 1.2 Main window tabs

#### Welcome:
A brief introduction to Betaflight, that includes links to BlackBox viewer, Lua script, device drivers to connect your board Facebook and Discord to post your question or get help WIKI and Github to follow Betaflight features and progress A simple clik to select your configurator preferred language.
		
#### Privacy and Policy:
Updated to 1 Sep 2025, just read it!

#### Documentation and Support:
Links to Documentation online, release notes, Devs discord, Youtubers and great forums.
		
#### Options: 
A complete setup options list for your app. Just as reminder there has been a huge implementation for the backup of configuration while flashing firmware, users will get a warning (unless disabled forcibly) to save a backup of the old configuration present on you flight controller.
		
#### Firmware Flasher: 
Once the most common flash drop down box are selected like Expert mode, Select Release Candidates or an easy detect version button, a complete new box for configuration, will allow you to select a wide range of protocols Radio, Telemetry, OSD, Motor and in other options a list of the latest features including Altitude and Position hold. Last not least a custom defines field for non-common features you may want to include in your build.

### 1.3 Setup Tabs

#### Setup: 
Graphic enahanced for any type of end user device. Even old computers with low graphic card will show an enhanced image of your aircraft model(see option tab for rendering). On the right side a complete list of stylish boxes will identify and list features for your aircraft model. 
- Instruments: position and direction windows
- Sonar: if present indicating altitude
- System Info: Arming disable flags, Battery voltage, capacity and current drawn, RSSI value, CPU temperature.
- Sensor Info: Gyro, Accelerator, Magnetometer, Barometer, Sonar and Optical Flow, all elements listed if present on your aircraft model.
- Firmware Info: MSP API (version), Build date, Build type, Build Info, Firmware with a press options button (to list option defined in the build)
				
#### Configuration tab:
Added selectable Sensors box like Sonar, Optical Flow, as well as an easy to read, editable box for board and gps alignment RPY (Roll, Pitch, Yaw). 
Simplified reading on general setting. Features not present on the FC will be hided in view.
		
#### BlackBox:
BlackbBox has been enhanced to reduce size on FC with small memory, thru selectable fields. You can now select with an easy on/off visual type switch, the features you need.
Features not present on flight controller will be hided.
		
#### GPS:
All GPS informations have been grouped in four main blocks. 
- GPS Configuration allow enable of GPS, protocol and switch type icon for autoconfig, use Galileo, Home point set up.
- GPS Info, enhanced style for easy read of 3Dfix, number of satellites, included now imu heading, positional PDOP, latitude and Longitude,distance from home and mag declination.
- GPS Signal, a wonderful colored list for locaked satellites 
- GPS Location, implemented three map view satellite style, satellite with details and road map style.

## 2. The Firmware

### 2.1 🚀 Key New Features

* **Autonomous & Safety Features:** New capabilities include **Altitude Hold**, **Position Hold**, **Collision Detection**, and an **auto-disarm** function that triggers on landing impact.
* **Fixed-Wing Enhancements:** A major focus of this release, with many new tools for wings, such as an **S-term** for smoother flight, **Throttle and PID Attenuation (TPA)** modes based on airspeed, and specialized PID multiplier curves.
* **Flight & User Experience:**
    * **Updated Turtle/Crashflip Mode:** Improvements to the mode that helps you flip your drone back over after a crash.
    * **Launch Timer:** A new timer specifically for launches.
    * **LED Dimmer & Functions:** Added an LED dimmer and new LED bar indicators for GPS, battery, and altitude.

### 2.2 ✨ Improvements & Optimizations

* **Hardware Support:** Support has been added for new gyros (like IIM42653, ICM456xx), flash memory chips, rangefinders, and a CADDX camera gimbal.
* **Protocols & Communication:** Enhancements have been made to various communication protocols, including CRSF (vario and barometer support), ELRS (FLRC F-modes, Model Match ID), and MAVLink. MSP has been expanded to support more commands and pass-through CLI commands.
* **Blackbox & OSD:** Blackbox logging is now more comprehensive, with the ability to log servo data, GPS home altitude, IMU attitude, and MCU ID. The On-Screen Display (OSD) also gains new elements and display options.
* **Code Refactoring:** A massive effort was undertaken to clean up and reorganize the codebase. This involves moving platform-specific code (for different microcontrollers) into dedicated directories, which simplifies future development and improves maintainability.

### 2.3 🛠️ Bug Fixes

This release addresses a vast number of bugs. Check the full [change log](https://github.com/betaflight/betaflight/compare/4.5.0...2025.12.0-RC1) for a comprehensive list.

### 2.4 🎯 New Hardware Targets

Support has been added for new microcontrollers, significantly expanding the range of compatible flight controllers. This release now includes support for:
* **Raspberry Pi PICO (RP2350)**
* **APM32F40X series**

There has been significant refactoring of the code base to seperate platform specific code from the Betaflight core code, and this will allow faster adoption of new technologies in the future.

# Thank you all

With the launch of Betaflight 2025.12, we want to extend our deepest gratitude to every contributor, both past and present.

This project's success is a direct result of your collective passion and dedication. From the core developers who write the code, to the tireless testers who ensure its stability, and to everyone who provides documentation and support – your efforts have made this incredible release possible.

Betaflight 2025.12 is a milestone that belongs to all of you. Thank you for your unwavering commitment to making FPV flight better for everyone.

Happy flying!

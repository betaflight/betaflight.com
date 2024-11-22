# ESC firmware

An ESC is the Electronic Speed Controller which supplies power to the craft's motors.

- ESCs can support brushed or brushless motors, although brushed motors tend to only be seen in older, very lightweight quadcopters.
- The ESC takes motor commands from the Flight Controller and outputs pulses of power to accelerate or decelerate each motor.
- DShot is the preferred, one-wire, two-way, fully digital protocol for communication between a flight controller and the ESCs connected to it. DShot requires no calibration. DShot is the only way to get RPM and other extended telemetry data back from the ESC to the FC.
- Older ESCs support analog protocols like PWM, Oneshot, and Multishot, or hybrid protocols like Proshot. Analog protocols require two-point calibration, are susceptible to noise, and can only provide telemetry over an additional serial connection. This is not suitable for RPM filtering.
- Betaflight is enhanced by the ability of modern ESCs to supply in-band telemetry back to the Flight Controller via the DShot protocol.
- Using telemetry from ESC to FC in addition to the normal motor commands from FC to ESC is referred to as Bidirectional DShot.
- Bidirectional DShot is different from bidirectional motor control. Bidirectional motor control allows the ESC to actively rotate the motors forward and backwards, with the 'off' position at center stick, as in 3D Flight Mode. Bidirectional motor control is not required for Bidirectional DShot telemetry.

## Bidirectional DShot Firmware

The Bidirectional DShot protocol can be enabled in the [Configurator Motors Tab](/docs/wiki/configurator/motors-tab#escmotor-features). Modern Bidirectional DShot is different (and more robust) in BetaFlight 4.5 than BetaFlight 4.0. The ESC firmware must be correct to ensure support for DShot Telemetry and provide the best Betaflight performance. We strongly recommend the use of DShot in conjunction with RPM filtering for the benefits in handling and smooth flight.

### Bidirectional DShot Versions

Bidirectional DShot has evolved from simple RPM telemetry using the ESC signal wire to return data from MCUs without requiring a UART dedicated to ESC_SENSOR. EDT expands the remit of Bidirectional DShot to enable MCUs without a dedicated telemetry wire to report voltage and temperature.

| Version       | Features                                                                                                                                       |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| RPM telemetry | Sends RPM data from ESC to FC using ESC signal wires.                                                                                          |
| EDTv1         | Adds voltage, current, temperature to RPM data returned over the ESC signal wires.                                                             |
| EDTv2         | Adds ESC status events (stress level, stall, desync). ESC detects the demag/no-cross/cross sequence and reports when sequence is not followed. |

Note - Current telemetry is not usually available via EDT on 4in1 ESCs because there is usually only a single current sensor, not a sensor connected to each ESC.

## 32bit ESC firmwares

**For 32bit ESCs**, options include the following

| Option    | Model       | Link                                                                                      |
| --------- | ----------- | ----------------------------------------------------------------------------------------- |
| AM32      | Free/Open   | https://github.com/AlkaMotors/AM32_MULTI_MCU compatible with https://esc-configurator.com |
| BLHeli_32 | Paid/Closed | https://github.com/bitdump/BLHeli/blob/master/BLHeli_32%20ARM/README.md                   |

### AM32

AM32 fully supports RPM filtering and EDT telemetry and is recommended for 32bit ESCs. AM32 is a fully Open Source 32bit ESC firmware under active development. AM32 is compatible with all major 32bit MCUs including SMT32F051, STM32G071, STM32L432, GD32E230, AT32F421, AT32F415 and AT32F4A. The last few years have seen new features appear in AM32 and then some make their way into BLHeli_32. For these reasons BetaFlight recommends AM32 on your 32bit ESCs.
Developers note - prior to 2.00 the AM32 project used a repo for each family of MCUs. 2.00 unified these repos under https://github.com/AlkaMotors/AM32_MULTI_MCU.

| Version | Recommended | Comment                                                                                                                                                                 |
| ------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2.00    | `N`         | Cleanup of target structure, unify projects                                                                                                                             |
| 2.01    | `N`         | Increase 10khz timer to 20khz, increase max duty cycle change.                                                                                                          |
| 2.02    | `N`         | Increase startup power for inverted output targets.                                                                                                                     |
| 2.03    | `N`         | Move chime from DShot direction change commands to save command.                                                                                                        |
| 2.04    | `Y`         | Fix current protection, max duty cycle not increasing. Fix double startup chime. Change current averaging method for more precision. Fix startup ramp speed adjustment. |
| 2.05    | `Y`         | Fix ramp tied to input frequency                                                                                                                                        |

### BLHeli_32

:::warning
Stuck motors, hot motors and unexpected behavior have been observed in BLHeli_32 releases after 32.7. Betaflight recommends avoiding newer releases until a well-tested BLHeli_32 release is available.
:::

BLHeli_32 is only available pre-installed on ESCs, the cost of BLHeli_32 licenses are included in the hardware cost of each ESC. BLHeli_32 was a continuation of the original BLHeli project which introduced support for 32bit ESCs. Bidirectional DShot is now a fully supported feature in version 32.7.0. Just upgrade using blheli32 configurator.

| Version | Recommended | Comment                                                                                                                      |
| ------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 32.7    | `Y`         | RPM filtering available, recommended stable version for fixed-PWM output                                                     |
| 32.8    | `N`         | Reports of DShot communication errors, stuck/hot motors. Introduced variable PWM, 32.8.3 added ByRPM support similar to AM32 |
| 32.9    | `N`         | Reports of DShot communication errors, stuck/hot motors. EDT telemetry added                                                 |
| 32.10   | `N`         | Potential fix for stuck motor issues, initial reports indicate 32.10 still has errors                                        |

## 8bit ESC firmwares

**For 8bit BLHeli-S ESCs**, options for the BusyBee family of MCUs BB1 (L), BB21 (H) and BB51 (X) include:

| Option       | Model | Link                                                                               |
| ------------ | ----- | ---------------------------------------------------------------------------------- |
| BlueJay      | Free  | https://github.com/bird-sanctuary/bluejay using https://esc-configurator.com       |
| JFlight      | Paid  | https://jflight.net/                                                               |
| JazzMaverick | Free  | https://github.com/JazzMaverick/BLHeli/tree/JazzMaverick-patch-1/BLHeli_S%20SiLabs |

### BlueJay

BlueJay fully supports RPM filtering and EDT telemetry and is the recommended ESC firmware for 8bit ESCs. Originally developed by Mathias, a Betaflight developer, more recently BlueJay has been transferred to the BirdSanctuary team and is maintained by Damosvil and Stylesuxx in close partnership with the esc-configurator project.

BlueJay is easily flashed with an elegant online flashing tool [ESC Configurator](https://esc-configurator.com/). An older offline configurator (https://github.com/mathiasvr/bluejay-configurator/releases) is available but not recommended for current releases. The firmware supports both L and H type ESCs as well as newer Z type, with a range of options, and has been tested on various ESC models.

[Extended DShot Telemetry (EDT)](https://github.com/bird-sanctuary/extended-DShot-telemetry) was created by the BlueJay team and allows ESCs without a separate telemetry UART to send additional telemetry alongside RPM data. EDT enables BlueJay ESCs to report voltage, current and temperature as well as signalling error events.

| Version    | Recommended | Comment                                                                                                |
| ---------- | ----------- | ------------------------------------------------------------------------------------------------------ |
| 0.17       | `N`         | EDTv1, 3D mode broken.                                                                                 |
| 0.18       | `N`         | EDTv1, 3D mode broken.                                                                                 |
| 0.19.2     | `Y`         | Current stable version, supports RPM filtering & EDTv2. Upgrade to this version unless you fly 3D mode |
| 0.20       | `N`         | Old testing version, withdrawn from release due to problems.                                           |
| 0.20.1-RC2 | `N`\*       | Latest test code. Includes EDT v2 support. 3D mode working                                             |

_\*Recommended if you fly 3D as this fixes 3D mode transitions. Please read [Configurator Guide notes on 3D Mode](/docs/wiki/configurator/motors-tab#3d-escmotor-features) before enabling._

### JFlight

This is the original BlHeli-S RPM firmware, from the developer of the underlying RPM filtering and DShot telemetry code. JFlight requires a license purchased for each ESC you wish to enable RPM telemetry on. Go to [jflight.net](https://jflight.net), check that your ESC and FC are supported, purchase enough licences, and follow the install instructions - download the custom JESC BLHeli-S configurator, select your ESC, select the correct hex, click the blue 'flash all' button, then flash the telemetry code over that by clicking 'flash all telemetry'. Use the flash version at the top of the list. JESC requires Betaflight 4.1+.

Only supports L and H MCUs, not recommended for new installs.

### JazzMaverick

JazzMaverick is a fork of the original BLHeli-S codebase with patches to enable RPM telemetry amongst other features.

:::warning
JazzMaverick firmware should be avoided. For reliable flight performance you should replace JazzMaverick with BlueJay.

JazzMaverick was poorly documented and has not been maintained for years.
:::

The current build of JazzMaverick's BLHeli fork is 16.9, often referred to as [BlHeli-M](https://www.rcgroups.com/forums/showthread.php?3621257-BLHeli_M-Maverick-version). The easiest way to flash 16.9 is with Asizon's Configurator.
For earlier versions, go to [JazzMaverick](https://github.com/JazzMaverick/BLHeli/tree/JazzMaverick-patch-1/BLHeli_S%20SiLabs)'s code on github. Flash as usual with the conventional [BlHeli-S Configurator](https://github.com/blheli-configurator/blheli-configurator/releases) or use the convenient browser-based [ESC Configurator](https://esc-configurator.com/). Take a look which version you have to flash correctly. Use either version 16.73 or 16.9.

Betaflight strongly recommends that users avoid JazzMaverick due to the lack of maintenance and the author's experimental approach. This ESC firmware included versions with non-linear throttle response and other features that surprised or confused users.

### BLHeli-S

[BLHeli-S](https://www.rcgroups.com/forums/showthread.php?2640796-BLHeli_S-Smooth-as-Silk) introduced support for the BusyBee line of 8bit MCUs for ESC use. These MCUs featured hardware PWM generation unlike the earlier [BLHeli](https://www.rcgroups.com/forums/showthread.php?2136895-BLHeli-for-Atmel-and-Silabs-united-by-BLHeliSuite) hardware, synchronising the motor PWM tyo the MCU clock and supporting higher eRPM speed output. Damped light mode was also standard, allowing all ESCs to decelerate as well as accelerate the motor.

Whilst these features may sound great these are now standard features and available in all other ESC firmware on this page. Note that DShot support was only added in revision 16.5 and turtle mode and DShot beeper only arrived in the last official 16.7 release. If you receive an ESC with BLHeli-S we recommend connecting to [ESC Configurator](https://esc-configurator.com/) and flashing BlueJay, you can check a box to copy over the reversed/forward settings from BLHeli-S to BlueJay.

:::info
These versions are for informational purposes only. Always upgrade BLHeli-S equipment to use BlueJay.
:::

| Version | Recommended | Comment                                                                                                                                                                                                                                                                                                            |
| ------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 16.0    | `N`         | Built upon rev 14.5 of base code. Using hardware pwm for very smooth throttle response, silent running and support of very high rpms. Implemented reverse bidirectional mode. Implemented separate throttle gains fwd and rev in bidirectional mode. Implemented support for Oneshot42 and Multishot               |
| 16.1    | `N`         | Made low rpm power limiting programmable through the startup power parameter                                                                                                                                                                                                                                       |
| 16.2    | `N`         | Fixed bug that prevented temperature protection. Improved robustness to very high input signal rates. Beeps can be turned off by programming beep strength to 1. Throttle cal difference is checked to be above required minimum before storing. Throttle cal max is not stored until successful min throttle cal. |
| 16.3    | `N`         | Implemented programmable temperature protection. Improved protection of bootloader and generally reduced risk of flash corruption. Some small changes for improved sync hold.                                                                                                                                      |
| 16.4    | `N`         | Fixed bug where bootloader operation could be blocked by a defective "eeprom" signature.                                                                                                                                                                                                                           |
| 16.5    | `N`         | Added support for DShot150, DShot300 and DShot600.                                                                                                                                                                                                                                                                 |
| 16.6    | `N`         | Fixed signal detection issue of multishot at 32kHz. Improved bidirectional mode for high input signal rates.                                                                                                                                                                                                       |
| 16.7    | `N`         | Addition of DShot commands for beeps and temporary reverse direction (largely by bycedjohnson)                                                                                                                                                                                                                     |

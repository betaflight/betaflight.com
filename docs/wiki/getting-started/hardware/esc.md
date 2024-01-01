# ESC

An ESC is the Electronic Speed Controller which supplies power to the craft's motors.

- ESCs can support brushed or brushless motors, although brushed motors tend to only be seen in older, very lightweight quadcopters.
- The ESC takes motor commands from the Flight Controller and outputs pulses of power to accelerate or decelerate each motor.
- Dshot is the preferred protocol for the FC to control ESCs. Dshot variants are named by update speed - dshot150, dshot300 and dshot600.
- Older ESCs may use alternative protocols like PWM, oneshot, and proshot. Only Dshot supports the telemetry needed for RPM filtering.
- Betaflight is enhanced by the ability of modern ESCs to supply in-band telemetry back to the Flight Controller via the dshot protocol.
- Using telemetry from ESC to FC in addition to the normal motor commands from FC to ESC is referred to as Bidirectional Dshot.
- Bidirectional Dshot is different from the bidirectional motors settings. Bidirectional motor setting is used to enable the propellers to spin backwards and is used in the 3D Flight Mode, it is a separate feature and not required for Dshot Telemetry.

## Bidirectional DShot Firmware

The Bidirectional DShot protocol can be enabled in the [Configurator Motors Tab](/docs/wiki/configurator/motors-tab#escmotor-features). Modern Bidirectional Dshot is different (and more robust) in BetaFlight 4.5 than BetaFlight 4.0. The ESC firmware must be correct to ensure support for Dshot Telemetry and provide the best Betaflight performance. We strongly recommend the use of dshot in conjunection with RPM filtering for the benefits in handling and smooth flight.

**For 32bit ESCs**, various options exist

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
| 2.01    | `N`         | Increase 10khztimer to 20khz, increase max duty cycle change.                                                                                                           |
| 2.02    | `N`         | Increase startup power for inverted output targets.                                                                                                                     |
| 2.03    | `N`         | Move chime from dshot direction change commands to save command.                                                                                                        |
| 2.04    | `Y`         | Fix current protection, max duty cycle not increasing. Fix double startup chime. Change current averaging method for more precision. Fix startup ramp speed adjustment. |
| 2.05    | `Y`         | Fix ramp tied to input frequency                                                                                                                                        |

### BLHeli_32

:::warning
Stuck motors, hot motors and unexpected behaviour have been observed in BLHeli_32 releases after 32.7. Betaflight recommends avoiding newer releases until a well-tested BLHeli_32 release is available.
:::

BLHeli_32 is only available pre-installed on ESCs, the cost of BLHeli_32 licenses are included in the hardware cost of each ESC. BLHeli_32 was a continuation of the original BLHeli project which introduced support for 32bit ESCs. Bidirectional DShot is now a fully supported feature in version 32.7.0. Just upgrade using blheli32 configurator.

| Version | Recommended | Comment                                                                                                                      |
| ------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 32.7    | `Y`         | RPM filtering available, recommended stable version for fixed-PWM output                                                     |
| 32.8    | `N`         | Reports of dshot communication errors, stuck/hot motors. Introduced variable PWM, 32.8.3 added ByRPM support similar to AM32 |
| 32.9    | `N`         | Reports of dshot communication errors, stuck/hot motors. EDT telemetry added                                                 |
| 32.10   | `N`         | Potential fix for stuck motor issues, initial reports indicate 32.10 still has errors                                        |

**For 8bit BLHeli-S ESCs**, various options exist for the BusyBee family of MCUs including BB1 (L), BB21 (H) and BB51 (X)

| Option       | Model | Link                                                                               |
| ------------ | ----- | ---------------------------------------------------------------------------------- |
| BlueJay      | Free  | https://github.com/bird-sanctuary/bluejay using https://esc-configurator.com       |
| JFlight      | Paid  | https://jflight.net/                                                               |
| JazzMaverick | Free  | https://github.com/JazzMaverick/BLHeli/tree/JazzMaverick-patch-1/BLHeli_S%20SiLabs |

### BlueJay

BlueJay fully supports RPM filtering and EDT telementry and is the recommended ESC firmware for 8bit ESCs. Orginally developed by Mathias, a Betaflight developer, more recently BlueJay has been transferred to the BirdSanctuary team and is maintained by Damosvil and Stylesuxx in close partnership with the esc-configurator project. BlueJay is easily flashed with an elegant online flashing tool [ESC Configurator](https://esc-configurator.com/). Custom offline configurator (https://github.com/mathiasvr/bluejay-configurator/releases) is available but not recommended for current releases. The firmware supports both L and H type ESCs as well as newer Z type, with a range of options, and has been tested on various ESC models. [Extended Dshot Telementry (EDT)](https://github.com/bird-sanctuary/extended-dshot-telemetry) was created by the BlueJay team and allows ESCs without a separate telemetry UART to send additional telemetry alongside RPM data. EDT enables BlueJay ESCs to report voltage, current and temperature as well as signalling error events.

| Version    | Recommended | Comment                                                                                                |
| ---------- | ----------- | ------------------------------------------------------------------------------------------------------ |
| 0.19.2     | `Y`         | Current stable version, supports RPM filtering and EDT. Upgrade to this version unless you fly 3D mode |
| 0.20       | `N`         | Old testing version, withdrawn from release due to problems.                                           |
| 0.20.1-RC2 | `N`\*       | Latest test code. Includes EDT support.                                                                |

_\*Recommended if you fly 3D as this fixes 3D mode transitions. Please read [Configurator Guide notes on 3D Mode](/docs/wiki/configurator/motors-tab#3d-escmotor-features) before enabling._

### JFlight

This is the original BlHeli-S RPM firmware, from the developer of the underlying RPM filtering and DShot telemetry code. JFlight requires a license purchased for each ESC you wish to enable RPM telemetry on. Go to [jflight.net](https://jflight.net), check that your ESC and FC are supported, purchase enough licences, and follow the install instructions - download the custom JESC BLHeli-S configurator, select your ESC, select the correct hex, click the blue 'flash all' button, then then flash the telemetry code over that by clicking 'flash all telemetry'. Use the flash version at the top of the list. JESC requires Betaflight 4.1+.
Only supports L and H MCUs, not recommended for new installs.

### JazzMaverick

JazzMaverick is a fork of the original BLHeli-S codebase with patches to enable RPM telemetry amongst other features.

:::warning
JazzMaverick firmware should be avoided. For reliable flight performance you should replace JazzMaverick with BlueJay. JazzMaverick was poorly documented and has not been maintained for years.
:::

The current build of JazzMaverick's BLHeli fork is 16.9, often referred to as [BlHeli-M](https://www.rcgroups.com/forums/showthread.php?3621257-BLHeli_M-Maverick-version). The easiest way to flash 16.9 is with Asizon's Configurator.
For earlier versions, go to [JazzMaverick](https://github.com/JazzMaverick/BLHeli/tree/JazzMaverick-patch-1/BLHeli_S%20SiLabs)'s code on github. Flash as usual with the conventional [BlHeli-S Configurator](https://github.com/blheli-configurator/blheli-configurator/releases) or use the convenient browser-based [ESC Configurator](https://esc-configurator.com/). Take a look wich version you have to flash correctly. Use either version 16.73 or 16.9.
Betaflight strongly recommends that users avoid JazzMaverick due to the lack of maintenance and the author's experimental approach. This ESC firmware included versions with non-linear throttle response and other features that surprised or confused users.

### BLHeli-S

[BLHeli-S](https://www.rcgroups.com/forums/showthread.php?2640796-BLHeli_S-Smooth-as-Silk) introduced support for the BusyBee line of 8bit MCUs for ESC use. These MCUs featured hardware PWM generation unlike the earlier [BLHeli](https://www.rcgroups.com/forums/showthread.php?2136895-BLHeli-for-Atmel-and-Silabs-united-by-BLHeliSuite) hardware, synchronising the motor PWM tyo the MCU clock and supporting higher eRPM speed output. Damped light mode was also standard, allowing all ESCs to decelerate as well as accelerate the motor.
Whilst these features may sound great these are now standard features and available in all other ESC firmware on this page. If you recieve an ESC with BLHeli-S we recommend connecting to [ESC Configurator](https://esc-configurator.com/) and flashing BlueJay, you can check a box to copy over the reversed/forward settings from BLHeli-S to BlueJay.

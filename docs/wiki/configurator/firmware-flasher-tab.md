---
sidebar_position: 21
---

# Firmware Flasher Tab

This tab is used to update the flight controller's Firmware.

Since Betaflight 4.4, firmware updating is by an online build process. The user selects their flight controller, the code version to flash, and enables the features they want, then a custom firmware will be built online, downloaded, and installed onto the flight controller.

Since Betaflight 4.4, updating the firmware is done via an online building process. The user selects their flight controller, the code version to flash, and enables the features they want. A custom firmware will then be built online, downloaded, and installed onto the flight controller.

:::info

The Firmware provides hardware-level support only.

:::

![Firmware Flasher tab](/img/betaflight_configurator_firmware_flasher_tab.png)

## Preparation

- Upgrade to the latest Betaflight Configurator.
- Before upgrading, choose either `save backup` from the Presets Tab, or save a <b>diff</b> file via the CLI. This will store the configuration as used by your old firmware, in case you have to revert back to the old firmware. The CLI <b>status</b> command provides info about the hardware currently being used.
- Settings other than those in the <b>master</b> and <b>profile</b> sections settings (eg, VTX, modes, etc) can usually be transferred via CLI copy and paste.
- When updating to a new point version, it's best to rebuild your other settings carefully, from scratch.

:::caution

To revert to previous firmware, the same online process would apply, but you would choose the older version when building, and then apply your saved `diff` file. <br/><br/>
Configurator only supports Betaflight version 4.0 and newer. Older versions of Configurator may be needed to flash older firmware.

:::

## Basic Flashing Procedure

:::caution

This will _always_ erase all previous configuration data from the flight controller!

:::

To flash a final release version of the firmware:

- leave `Enable Expert Mode` OFF
- leave `Show Release candidates` OFF
- Click 'auto-detect' and ensure the correct board name appears in the list
- Choose the firmware version to flash

The Build Configuration area then appears:

- Choose the Radio Protocol... include telemetry if not automatically included
- Enable other hardware options, eg OSD, VTX, GPS, LEDStrip etc

The screen should look something like this, for a JHEF411 with ELRS, GPS, LEDstrip, Mag, OSD (SD) and VTx included:

![Firmware Flasher basic](/img/betaflight_configurator_firmware_flasher_basic.png)

If you're happy that everything is OK, then, down the bottom, click `Load Firmware [Online]`, and wait for the firmware to be built and downloaded.

Then click `Flash Firmware`. Before flashing starts, an option to save the current configuration as a `diff` file will be provided in case you didn't do this already.

Once the firmware is flashed, re-connect, calibrate your accelerometer, and re-configure your settings.

Generally, we recommend full manual re-configuration. When the flash is from the same point version, usually it's OK to import a saved Preset, or paste a Diff. Parts of a diff can also be selectively pasted into the CLI, eg the VTX Table, or the modes and aux settings.

:::caution

After flashing, always check that every setting is 'as it should be', before test flying. Your first test flights should be cautious and in a safe environment.

:::

## Flashing Release Candidate firmware builds

Release Candidates are special firmware builds that are provided to test 'nearly completed' firmware, late in the development of a new firmware version. For example, `4.5.0-RC2` is the second RC version of Betaflight; it was released for testing on 08-Jan-2024. Usually these builds are stable and are only made available for testing close to the time of the final release. Developers are always grateful for public testing of PR builds.

To see Release Candidates in the firmware build list:

- Enable Expert Mode
- Enable 'Show release candidates'
- Choose `Release and Release Candidate` from the new dropdown
- Auto-detect to select the correct flight controller
- Choose the Release Candidate version that you'd like to flash
- Proceed as for basic flashing, above.

## Flashing Development builds

Development builds are firmware derived from the most recent version of the code on Github. This will contain the most recent changes made to the firmware.

This option lets you test out a new feature, or try out a significant change to the code, as the code is being developed. If, for example, Betaflight 4.5 is the current release version, the development versions available in the list will be 4.6, and 4.5.1.

To see Development versions in the firmware build list:

- Enable Expert Mode
- Enable 'Show release candidates'
- Choose `Development` from the new dropdown
- Auto-detect to select the correct flight controller
- Choose the Development version that you'd like to flash (RC's are there too)
- Proceed as for basic flashing, above.

## Other 'Expert Mode' options

| Setting            | Meaning                                                                                                             |
| :----------------- | :------------------------------------------------------------------------------------------------------------------ |
| No Reboot sequence | Use this if your board is already in DFU mode                                                                       |
| Flash on connect   | (Hazardous) Immediately flashes the next board you plug in, without checking it's type or offering to make a backup |
| Full chip erase    | Default is ON, and for good reason. See notes below                                                                 |
| Manual Baud Rate   | Default is good, but sometimes slower is more reliable                                                              |

:::note

`Full chip erase` completely wipes the NVRAM, deleting all your saved configuration data, replacing it with new default values and the new data structure for the new firmware.<br/><br/>

`Full chip erase` should only be disabled when you are 100% certain that the configuration data structure has not changed since the last flash, otherwise incorrect configuration values may be retrieved by the new firmware, with potentially disastrous results.

:::

## Build Configuration

In the Build Configuration section, the user selects the hardware support code that will be included in their firmware build.

There are four basic configuration groupings:

### Radio Protocol

Select the receiver protocol used. The most common are:

| Protocol | Receiver                    |
| :------- | :-------------------------- |
| CRSF     | TBS Crossfire or ExpressLRS |
| GHST     | Immersion RC Ghost          |
| SBUS     | FrSky or Futaba             |

:::note

EXPRESSLRS SPI receivers use the CRSF protocol and the main version number must match (eg an ELRS SPI receiver in Betaflight 4.4 and 4.5 will only work with ELRS 3.x in the Transmitter).<br/><br/>

FrSky SPI receivers use SBUS or FPORT protocol depending on the receiver firmware used.<br/><br/>

SPI configuration details are resolved via software (part of the configuration data). Some of the required information may be included in the flash via the board definition file.

:::

### Telemetry Protocol

Select the telemetry protocol you need.
For CRSF, ELRS, FPORT or GHST protocols, this is included by default to simplify configuraton.

### Other Options

These are custom functions or features that you can add to the firmware.

| Option                    | Description                                                                                                   |
| :------------------------ | :------------------------------------------------------------------------------------------------------------ |
| AKK (SA Fix)              | SmartAudio patch for AKK hardware                                                                             |
| Acro Trainer              | Enable Acro Trainer support                                                                                   |
| Batt. Continue            | See [#11084](https://github.com/betaflight/betaflight/pull/11084)                                             |
| Cam. Control              | Enable Camera Control                                                                                         |
| Dashboard                 | Enable external i2c Oled Display device (to be deprecated)                                                    |
| EMFAT (AutoRun, Icon)     | Enable FAT emulation and icon for onboard flash or MSC                                                        |
| ESC Serial (SK) Inc. 4way | Enable SimonK and ESC Serial support for flashing via 4way interface                                          |
| Flash Storage             | Auto-included in 4.5, enables Blackbox Flash Storage before 4.5                                               |
| FrSky OSD                 | Auto-included in 4.5, enables FrSky OSD support before 4.5                                                    |
| GPS                       | Enable GPS and GPS_PLUS_CODES                                                                                 |
| LED Strip                 | Enable 32 LEDs                                                                                                |
| LED Strip 64              | Enable 64 LEDs                                                                                                |
| Magnetometers             | Enable magnetometer (compass)                                                                                 |
| OSD (SD)                  | Enable SD OSD (onboard MAX7456 required)                                                                      |
| OSD (HD)                  | Enable HD OSD (eg DJI, HDZero, Walksnail)                                                                     |
| PIN IO                    | Enable PINIO                                                                                                  |
| RACE PRO                  | see [Betaflight 4.5 Release notes](/docs/wiki/release/betaflight-4-5-release-notes#161-race-pro-build-option) |
| Servos                    | Enable Servo support                                                                                          |
| VTX                       | Enable VTX                                                                                                    |

### Motor Protocol

Select the Motor control (ESC) protocol to use. DShot is default.

### Custom Defines

This field is only available in expert mode, and is intended for development and testing.

It allows the user to enter the coded 'name' for a 'hardware define', forcing that code to be included in the build. More than one define can be included, separated by spaces.

For example, the local build options `-DUSE_RANGEFINDER -DUSE_ACCGYRO_LSM6DSO` can be included as Custom Defines when making a cloud build with `RANGEFINDER ACCGYRO_LSM6DSO`.

This is a full listing of [Custom Defines](https://hackmd.io/@nerdCopter/H11rvS8Lh), current as of early 2025. Most hardware defines are already included in the board config. Some relate to archaic code that may not function properly and is not currently included in normal builds; test these at your own risk.

### Select Pull Request or Commit

This field is only available in expert mode, and is intended for development and testing of yet to be merged code that is in 'Pull Request' status. This happens when a developer has proposed a change to the code base, and has put it up for testing.

It defaults to the latest commit (master), meaning the most recent commit of the selected firmware branch. The dropdown includes some recent commits if you want to go back a bit.

Each GitHub pull request has a uniqe ID. The user can include a specific, yet to be merged, `Pull Request`, over the top of master, by typing the number of the pull request, preceded by the `#` character. For example, to include Pull Request #13605, just enter `#13605` in the Custom Defines field.

It is also possible to make a build from any previous point in time by entering the sha of the commit.

## Troubeshooting

:::tip

- Use a good quality data cable, not a power cable.
- USB hubs or OTG cables are sometimes needed with recent computers and in other cases they can cause issues.
- Try disconnecting all cables from your PC first, try rebooting, other ports, upgrade system drivers. Remove other USB connections.
- Try DFU mode (use boot button on FC while plugging in, use <b>Activate Boot Loader / DFU</b> button in setup tab or use <b>bl</b> command in CLI.
- Sometimes peripherals on the flight controller such as receivers or GPS devices can hijack port communication, preventing entering DFU mode. These may require de-soldering.
- Linux needs configuration to allow flashing.
- MacOS or Windows do not need any drivers.
- If it still doesn't work try IRC Driver Fix or Zadig on Windows platform.

:::

:::info

If your board pheriperals are not recognized after flashing, please help us add the required configuration details. Some boards have inadequate file definitions, or the manufacturer has changed something on the board.

<br/>
Reach out to us on our [Discord server](https://discord.betaflight.com/invite) or create an issue in the Betaflight unified targets repo.
<br/>
To get the required information follow this procedure:
<br/>
<br/>
1. Flash your board with the <b>Core Only</b> switch enabled
<br/>
2. Go to the CLI tab and click the <b>Submit Support Data</b> button.
<br/>
3. With this generated support <b>ID</b> we should have all the required information, but we would then need your help to confirm a fix..

:::

## Checking the Build

The `Show Log` link will open the build log and show the defines being applied to the build, the code build outcome, and the file size details.

A full string for use when flashing the same build locally is provided, both for Docker and Make.

### Local Flashing

If you have a local build environment and can make hex files, or you just have a hex file to flash, it can be flashed directly.

For 4.4 and 4.5, the hex file must be custom-built or pre-built with all the hardware options already included. There is no need to choose a board in the drop-down, or set any options, because all the required defaults and options exists in the custom hex file. Note that the configuration file only contains the default configuration values; the user will have to check and update the settings before flying.

Hovering your mouse over 'Loaded Online Firmware' in the Flashing Tab, before actually flashing the code, allows downloading the firmware hex file to your computer for local flashing later on, if needed.

Previously an MPU-specific hex file was used, and the user had to ensure that the board was selected, so that the board-specific hardware details would be flashed after the hex.

To flash local development firmware with optional custom configuration use the <b>Load Firmware local</b> button to load board configuration or click `Auto-detect` or when in `DFU` mode select a board manually.

:::note

If, when flashing older MCU-generic firmware, and if you have a local configuration file, load it first, then use the same button again to load the local hex file.
:::

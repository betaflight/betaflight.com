---
sidebar_position: 21
---

# Firmware Flasher Tab

Here you update your firmware and select the features you require for you build.

:::info

The Firmware contains only hardware support. Board configuration defines board specific hardware. With the Build Configuration you can add or remove features you need.

:::

![Firmware Flasher tab](/img/betaflight_configurator_firmware_flasher_tab.png)

## Preparation

- Upgrade to the latest Betaflight Configurator.

- Before upgrading always save a <b>diff</b> of the current configuration. Using <b>status</b> command you get some info about hardware being used.
- You can also save a <b>diff</b> using Presets tab using the <b>save backup</b> button.
- Except <b>master</b> and <b>profile</b> most settings should be able to migrate from a previous version.

:::caution

Please follow these steps in order to be able to restore in the event something is not supported.<br/><br/>
Configurator only supports Betaflight version 4.0 and newer. Older versions only have access to the firmware flasher tab or CLI.

:::

## Flashing

| Type        | Version |
| :---------- | :------ |
| Release     | Stable  |
| Candidate   | Preview |
| Development | Test    |

- After selecting a build type select the board using the list or use the <b>Auto-detect</b> button.
- Always use <b>Full Chip Erase</b> unless instructed otherwise.

:::note

Using <b>Show Release Candidates</b> with <b>Expert Mode</b> enabled gives access to development builds.

:::

### Board Defines

We have defines for <b>ACC</b>, <b>BARO</b>, <b>FLASH</b>, <b>GYRO</b>, <b>MAX7456</b>, <b>FLASH</b> or <b>SDCARD</b> in the board configuration.

:::info

If your board pheriperals are not recognized please help us add the required configuration details.

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
3. With this generated support <b>ID</b> we have all required information to update board configuration files.

:::

### Radio Protocols

Select the receiver wire protocol used. The most common are:

| Protocol | Receiver                    |
| :------- | :-------------------------- |
| CRSF     | TBS Crossfire or ExpressLRS |
| GHST     | Immersion RC Ghost          |
| SBUS     | FrSky or Futaba             |

:::note

EXPRESSLRS (SPI) receivers uses CRSF protocol.<br/>
FrSky (SPI) receivers uses SBUS or FPORT protocol depending on the receiver firmware used.

:::

### Telemetry Protocols

Select the telemetry protocol used. For CRSF, ELRS or GHST protocols this is included by default to ease configuraton.

:::note

ExpressLRS uses CRSF protocol. SPI configuration is done in the board configuration.

:::

### Motor Protocol

Select ESC protocol being used. DShot is default.

:::tip

When needed additional protocols like <b>PWM</b> or <b>SERVOS</b> please add them using Custom Defines.

:::

### Other Options

| Option                    | Description                                                         |
| :------------------------ | :------------------------------------------------------------------ |
| AKK (SA Fix)              | Smartaudio patch for AKK hardware                                   |
| Acro Trainer              | Enable Acro Trainer support                                         |
| Batt. Continue            | See [#11084](https://github.com/betaflight/betaflight/pull/11084)   |
| Cam. Control              | Enable Camera Control                                               |
| Dashboard                 | Enable Post-flight overview screen                                  |
| EMFAT (AutoRun, Icon)     | Enable FAT emulation and icon for onboard flash or MSC              |
| ESC Serial (SK) Inc. 4way | Enable SimonK and ESC Serial support for flasing via 4way interface |
| Flash Storage             | Enable blackbox Flash Tools                                         |
| FrSky OSD                 | Enable FrSky OSD support                                            |
| GPS                       | Enable GPS and GPS_PLUS_CODES                                       |
| LED Strip                 | Enable 32 LEDs                                                      |
| LED Strip 64              | Enable 64 LEDs                                                      |
| Magnetometers             | Enable magnetometer                                                 |
| OSD (SD)                  | Enable SD OSD (onboard MAX7456 required)                            |
| OSD (HD)                  | Enable HD OSD                                                       |
| PIN IO                    | Enable PINIO                                                        |
| Servos                    | Enable Servo support                                                |
| VTX                       | Enable VTX                                                          |

## Troubeshooting

:::tip

- Use a good quality data cable not a power cable.
- USB hubs or OTG cables are sometimes needed with recent computers and in other cases they can cause issues.
- Try disconnecting all cables from your PC first, try rebooting, other ports, upgrade system drivers. Remove other USB connections.
- Try DFU mode (use boot button on FC while plugging in, use <b>Activate Boot Loader / DFU</b> button in setup tab or use <b>bl</b> command in CLI.
- Sometimes peripherals on the flight controller such as receivers or GPS devices can hijack port communication requiring de-soldering.
- Linux needs configuration to allow flashing.
- MacOS or Windows do not need any drivers.
- If it still doesn't work try IRC Driver Fix or Zadig on Windows platform.

:::

## Expert Options

### Custom Defines

This is mostly for development as you can add a custom defines to bake a feature into the build. Please omit the **USE\_** part of a #define.
To remove a feature simple add the minus sign before it.

### Commit Field

For development we can choose a specific PR from the list or even build a PR by adding the firmware PR number into the field. Prepend the number with the number **#** sign.

### Local Flashing

To flash local development firmware with optional custom configuration use the <b>Load Firmware local</b> button to load board configuration or click `Auto-detect` or when in `DFU` mode select a board manually.

:::note

If using a local configuration file use the same button again to load a local hex file.

:::

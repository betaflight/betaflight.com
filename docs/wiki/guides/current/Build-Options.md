# Build Options

Betaflight firmware has many optional parts. A build option adds one part to the firmware when the firmware is built. Each build option is a `USE_` flag in the firmware source code.

Flash memory on a flight controller is limited. Thus, the firmware does not contain all parts at the same time. You select the parts that you need before you flash the firmware.

There are two types of build options that a user can select:

- **Selectable build options**: These options show in the [Firmware Flasher tab](/docs/wiki/app/firmware-flasher-tab) of the Betaflight App. You select them from the lists.
- **Manual build options**: These options do not show in a list. You type them in the `Custom Defines` field. This field shows only in expert mode.

The board configuration adds the hardware drivers for the parts on the flight controller (for example the gyro, the flash chip and the OSD chip). You do not add these. The [Defines](/docs/development/Defines) page in the development section gives the full list of flags, which includes the flags that a user cannot set.

## How To Read the Tables

- **Flag**: The name of the option without the `USE_` prefix. Type this name in `Custom Defines`. You do not have to type the `USE_` prefix, because the build server adds it.
- **Default**: "Yes" if the app selects the option by default.
- **Also adds**: The build server adds these flags automatically when you select the option.
- **Introduced**: The first firmware release that has the flag. "&lt; 2025.12" means that the flag was in Betaflight 4.5 or earlier. "2026.12" means that the flag is only in the development (master) version at this time. "(app X)" means that the app shows the option in its list from release X.

## Selectable Build Options

The Betaflight App shows these options in the Firmware Flasher tab. The list comes from the cloud build server, so it can change between releases.

### Radio Receiver

Select the protocol that your receiver uses. Most protocols also add their telemetry.

| Option    | Flag                 | Default | Also adds                                      | Description                                                                                                                                                             | Introduced   |
| :-------- | :------------------- | :------ | :--------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------- |
| CRSF      | `SERIALRX_CRSF`      | Yes     | `TELEMETRY_CRSF`, `TELEMETRY`, `SERIALRX`      | Adds the TBS Crossfire (CRSF) serial receiver protocol. ExpressLRS receivers also use it. The build server also adds CRSF telemetry.                                    | &lt; 2025.12 |
| FPORT     | `SERIALRX_FPORT`     | No      | `TELEMETRY_SMARTPORT`, `TELEMETRY`, `SERIALRX` | Adds the FrSky FPort serial receiver protocol, which carries RC and telemetry on one wire. The build server also adds SmartPort telemetry. RP2350 targets remove it.    | &lt; 2025.12 |
| GHOST     | `SERIALRX_GHST`      | No      | `TELEMETRY_GHST`, `TELEMETRY`, `SERIALRX`      | Adds the ImmersionRC Ghost (GHST) serial receiver protocol. The build server also adds Ghost telemetry. RP2350 targets remove it.                                       | &lt; 2025.12 |
| IBUS      | `SERIALRX_IBUS`      | No      | `SERIALRX`                                     | Adds the FlySky iBUS serial receiver protocol. RP2350 targets remove it.                                                                                                | &lt; 2025.12 |
| JETIEXBUS | `SERIALRX_JETIEXBUS` | No      | `TELEMETRY_JETIEXBUS`, `TELEMETRY`, `SERIALRX` | Adds the Jeti EX Bus serial receiver protocol. The build server also adds Jeti EX Bus telemetry. ESP32 and RP2350 targets remove it.                                    | &lt; 2025.12 |
| MAVLINK   | `SERIALRX_MAVLINK`   | No      | `SERIALRX`                                     | Adds the MAVLink serial receiver protocol, which reads RC channels from MAVLink messages. The firmware also turns on MAVLink telemetry, because this protocol needs it. | 2025.12      |
| PPM       | `RX_PPM`             | No      | `PPM`                                          | Adds support for a PPM receiver, which sends all channels on one wire.                                                                                                  | &lt; 2025.12 |
| SBUS      | `SERIALRX_SBUS`      | No      | `SERIALRX`                                     | Adds the SBUS serial receiver protocol for FrSky and Futaba receivers.                                                                                                  | &lt; 2025.12 |
| SPEKTRUM  | `SERIALRX_SPEKTRUM`  | No      | `SERIALRX`                                     | Adds the Spektrum DSM2, DSMX and SRXL serial receiver protocols. The firmware also turns it on when `USE_TELEMETRY_SRXL` is set. ESP32 and RP2350 targets remove it.    | &lt; 2025.12 |
| SRXL2     | `SERIALRX_SRXL2`     | No      | `SERIALRX`                                     | Adds the Spektrum SRXL2 serial receiver protocol.                                                                                                                       | &lt; 2025.12 |
| SUMD      | `SERIALRX_SUMD`      | No      | `SERIALRX`                                     | Adds the Graupner HoTT SUMD serial receiver protocol. ESP32 and RP2350 targets remove it.                                                                               | &lt; 2025.12 |
| SUMH      | `SERIALRX_SUMH`      | No      | `SERIALRX`                                     | Adds the old Graupner SUMH serial receiver protocol. ESP32 and RP2350 targets remove it.                                                                                | &lt; 2025.12 |
| XBUS      | `SERIALRX_XBUS`      | No      | `SERIALRX`                                     | Adds the JR XBUS serial receiver protocol. ESP32 and RP2350 targets remove it.                                                                                          | &lt; 2025.12 |

### Telemetry

Select a telemetry protocol if your receiver protocol does not add telemetry.

| Option        | Flag                      | Default | Also adds   | Description                                                                                                                                                                                             | Introduced   |
| :------------ | :------------------------ | :------ | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :----------- |
| FRSKY_HUB     | `TELEMETRY_FRSKY_HUB`     | No      | `TELEMETRY` | Adds FrSky Hub telemetry for older FrSky D-series receivers. Not available on ESP32 and RP2350 targets.                                                                                                 | &lt; 2025.12 |
| HOTT          | `TELEMETRY_HOTT`          | No      | `TELEMETRY` | Adds Graupner HoTT telemetry. Not available on ESP32 and RP2350 targets.                                                                                                                                | &lt; 2025.12 |
| IBUS EXTENDED | `TELEMETRY_IBUS_EXTENDED` | No      | `TELEMETRY` | Adds FlySky iBUS telemetry with extended sensor types, for example GPS data. It also turns on `USE_TELEMETRY_IBUS`. Not available on ESP32 and RP2350 targets.                                          | &lt; 2025.12 |
| LTM           | `TELEMETRY_LTM`           | No      | `TELEMETRY` | Adds Light Telemetry (LTM) output for ground stations and antenna trackers. Not available on ESP32 and RP2350 targets.                                                                                  | &lt; 2025.12 |
| MAVLINK       | `TELEMETRY_MAVLINK`       | No      | `TELEMETRY` | Adds MAVLink telemetry output for ground stations and long range radio links. The MAVLINK receiver protocol turns it on automatically. Not available on ESP32 and RP2350 targets.                       | &lt; 2025.12 |
| SMARTPORT     | `TELEMETRY_SMARTPORT`     | No      | `TELEMETRY` | Adds FrSky SmartPort telemetry for FrSky X-series and ACCESS receivers. The FPORT receiver protocol turns it on automatically. Not available on ESP32 and RP2350 targets.                               | &lt; 2025.12 |
| SRXL          | `TELEMETRY_SRXL`          | No      | `TELEMETRY` | Adds Spektrum SRXL telemetry. It also turns on `USE_SERIALRX_SPEKTRUM`. The firmware removes it when neither SPEKTRUM nor SRXL2 receiver support is present. Not available on ESP32 and RP2350 targets. | &lt; 2025.12 |

### Motor Protocol

Select the protocol that your ESCs use. DShot is the default.

| Option    | Flag           | Default | Also adds  | Description                                                                                                                                             | Introduced   |
| :-------- | :------------- | :------ | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ | :----------- |
| BRUSHED   | `BRUSHED`      | No      |            | Adds support for brushed motors on small brushed quads.                                                                                                 | &lt; 2025.12 |
| DRONECAN  | `DRONECAN_ESC` | No      | `DRONECAN` | Adds motor control of DroneCAN ESCs over the CAN bus. The build adds `USE_DRONECAN` automatically. Only MCUs with a CAN peripheral get it.              | 2026.12      |
| DSHOT     | `DSHOT`        | Yes     |            | Adds the DShot digital motor protocol. Most ESCs use DShot. Without it, the build also removes DShot telemetry, bidirectional DShot and the RPM filter. | &lt; 2025.12 |
| MULTISHOT | `MULTISHOT`    | No      |            | Adds the Multishot motor protocol for older analogue ESCs.                                                                                              | &lt; 2025.12 |
| ONESHOT   | `ONESHOT`      | No      |            | Adds the Oneshot125 and Oneshot42 motor protocols for older analogue ESCs.                                                                              | &lt; 2025.12 |
| PROSHOT   | `PROSHOT`      | No      |            | Adds the ProShot1000 motor protocol.                                                                                                                    | &lt; 2025.12 |
| PWM       | `PWM_OUTPUT`   | No      |            | Adds standard PWM motor output for older ESCs and servos. Most builds get it automatically through DShot or the beeper.                                 | &lt; 2025.12 |

### Other Options

These options add functions to the firmware.

| Option                    | Flag               | Default | Also adds                     | Description                                                                                                                                                                                                                            | Introduced                 |
| :------------------------ | :----------------- | :------ | :---------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------- |
| Acro Trainer              | `ACRO_TRAINER`     | Yes     |                               | Adds Acro Trainer. This feature limits the angle of the quad in Acro mode to help new pilots learn. The firmware removes this feature when the build has no accelerometer.                                                             | &lt; 2025.12               |
| AKK (SA FIX)              | `AKK_SMARTAUDIO`   | No      |                               | Adds a fix for AKK and RDQ video transmitters that expect one extra byte in each SmartAudio packet. Use it only when your AKK or RDQ VTX does not respond to SmartAudio commands.                                                      | &lt; 2025.12               |
| Altitude Hold             | `ALTITUDE_HOLD`    | No      |                               | Adds Altitude Hold mode. The quad or wing keeps its current altitude with the barometer or GPS. A barometer or a GPS is necessary for this mode to work.                                                                               | 2025.12                    |
| Batt. Continue            | `BATTERY_CONTINUE` | No      |                               | Adds Battery Continue. If you reconnect the same battery, the mAh used count continues from the last value. A current sensor is necessary for a correct mAh count.                                                                     | &lt; 2025.12               |
| Cam. Control              | `CAMERA_CONTROL`   | No      |                               | Lets you control the menu of an FPV camera from the radio sticks through a camera control pin. The board must have a camera control pin, or you must set one with the CLI resource command.                                            | &lt; 2025.12               |
| Chirp                     | `CHIRP`            | No      |                               | Adds a chirp signal generator flight mode for system identification and tuning analysis.                                                                                                                                               | 2025.12                    |
| Dashboard                 | `DASHBOARD`        | No      |                               | Adds support for a small I2C OLED display that shows flight controller status. The board must have an I2C bus. Not available on SITL.                                                                                                  | &lt; 2025.12               |
| DroneCAN                  | `DRONECAN`         | No      |                               | Adds the DroneCAN protocol stack on the CAN bus. Use it to connect DroneCAN devices to the flight controller. Only MCUs with a CAN peripheral get it (STM32H7, STM32G4, some STM32C5, X32). The build removes it on other MCUs.        | 2026.12                    |
| EMFAT (AutoRun, Icon)     | `EMFAT_TOOLS`      | No      | `EMFAT_AUTORUN`, `EMFAT_ICON` | Adds an icon and a drive label to the USB mass storage drive that shows the Blackbox flash contents. The build server adds `USE_EMFAT_AUTORUN` and `USE_EMFAT_ICON`. It has an effect only on boards with USB mass storage support.    | &lt; 2025.12               |
| ESC Serial (SK) inc. 4way | `ESCSERIAL_SIMONK` | No      | `SERIAL_4WAY_SK_BOOTLOADER`   | Adds ESC passthrough for SimonK ESCs, with the SimonK bootloader in the 4way interface. Use it only for old ESCs with SimonK firmware. BLHeli and Bluejay ESCs do not need it.                                                         | &lt; 2025.12               |
| FLIGHT PLAN               | `FLIGHT_PLAN`      | No      |                               | Adds the flight plan, which flies the quad through a list of GPS waypoints. The build adds `USE_GPS`, altitude hold and position hold automatically.                                                                                   | 2026.6                     |
| GPS                       | `GPS`              | Yes     | `GPS_PLUS_CODES`              | Adds support for a GPS module. It adds GPS rescue, GPS OSD elements and GPS telemetry. The build server adds `USE_GPS_PLUS_CODES`. The build adds the NMEA and u-blox drivers and GPS rescue.                                          | &lt; 2025.12               |
| LED Strip                 | `LED_STRIP`        | Yes     |                               | Adds support for addressable RGB LED strips (WS2812), with up to 32 LEDs. Local builds on MCUs with 1 MB or more flash add it automatically.                                                                                           | &lt; 2025.12               |
| LED Strip (64)            | `LED_STRIP_64`     | No      |                               | Adds support for addressable RGB LED strips with up to 64 LEDs. It also adds `USE_LED_STRIP`.                                                                                                                                          | &lt; 2025.12               |
| Magnetometers             | `MAG`              | No      |                               | Adds magnetometer (compass) support and all the compass drivers. Board configs also set it for on-board compass chips.                                                                                                                 | &lt; 2025.12               |
| Optical Flow              | `OPTICALFLOW`      | Yes     |                               | Adds optical flow sensor support. Use it for position hold without GPS. It also turns on the MTF-01 and UP-T1 optical flow drivers.                                                                                                    | 2025.12                    |
| OSD (Analog)              | `OSD_SD`           | Yes     | `OSD`                         | Adds OSD support for analogue video through the MAX7456 OSD chip. The build server adds `USE_OSD` with it. Without it, the build server removes `USE_MAX7456`.                                                                         | &lt; 2025.12               |
| OSD (Digital)             | `OSD_HD`           | Yes     |                               | Adds OSD support for digital HD video systems through MSP DisplayPort. Some ESP32 platform headers remove it.                                                                                                                          | &lt; 2025.12               |
| OSD (FrSky)               | `FRSKYOSD`         | No      |                               | Adds support for the FrSky OSD module, which connects through a serial port. The build adds `USE_OSD` automatically.                                                                                                                   | &lt; 2025.12               |
| Pin IO                    | `PINIO`            | Yes     |                               | Adds PINIO outputs. These let a switch turn external devices on and off, such as a VTX power switch. The board config must give the PINIO pins, or you set them with the CLI resource command.                                         | &lt; 2025.12               |
| Position Hold             | `POSITION_HOLD`    | No      |                               | Adds the Position Hold flight mode. The quad holds its position with GPS or optical flow. The build stops with an error if `USE_GPS` and `USE_OPTICALFLOW` are both missing.                                                           | 2025.12                    |
| Race Pro                  | `RACE_PRO`         | No      |                               | Adds a race feature pack: RPM limit, OSD quick menu, RC stats and the spec prearm screen. Some parts need `USE_DSHOT_TELEMETRY` or `USE_OSD`.                                                                                          | &lt; 2025.12               |
| Range Finder              | `RANGEFINDER`      | Yes     |                               | Adds rangefinder support to measure the distance to the ground. It also turns on all rangefinder drivers. One board config also sets it.                                                                                               | &lt; 2025.12               |
| Soft Serial               | `SOFTSERIAL`       | No      |                               | Adds software serial ports. These let you use extra serial devices on pins that have no hardware UART. Software serial uses timer pins and CPU time. Use it only for low baud rate devices. Not available on ESP32 and RP2350 targets. | &lt; 2025.12 (app 2025.12) |
| Servos                    | `SERVOS`           | No      |                               | Adds servo outputs and servo mixer support. Use it for wings, tricopters, gimbals and other aircraft that use servos. The Wing option turns it on automatically.                                                                       | &lt; 2025.12               |
| VTX                       | `VTX`              | Yes     |                               | Adds video transmitter control. You can change VTX band, channel and power from the radio, OSD or the app. ESP32 targets do not support it.                                                                                            | &lt; 2025.12               |
| Wing                      | `WING`             | No      |                               | Makes the firmware a fixed wing build. It adds wing features and removes some multirotor features. It removes yaw spin recovery, launch control and runaway takeoff prevention. Some wing board configs set it.                        | 2025.12                    |

## Manual Build Options

You can add these options in the `Custom Defines` field of the Firmware Flasher tab:

1. Set the app to expert mode.
2. In `Custom Defines`, type the flag names. Put a space between each name. For example: `RANGEFINDER TRANSPONDER`. You do not have to type the `USE_` prefix, because the build server adds it.
3. Build and flash the firmware.

The build server does not add a prefix to `ENABLE_` flags. Type each `ENABLE_` flag in full, with its value. For example: `ENABLE_OSD_CUSTOM_TEXT=0`.

For a local build, add each flag with the `USE_` prefix in `OPTIONS`. For example: `make SPEEDYBEEF405V4 OPTIONS="USE_RANGEFINDER USE_TRANSPONDER"`. A local build does not use `CLOUD_BUILD`, so it already has many of these options.

:::caution

Manual build options are not tested on all boards. Each option uses flash memory. If the firmware is too large, the build fails. If an option needs a pin, set the pin with the CLI `resource` command.

:::

### Sensors

| Flag             | Description                                                                                                                                                                                                            | Requires                         | Introduced   |
| :--------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------- | :----------- |
| `BARO`           | Adds the barometer subsystem. Altitude Hold, GPS Rescue and the variometer use barometer data. Board configs set it when the board has a barometer. For an external barometer, also add the driver flag for that part. | the matching `BARO_` driver flag | &lt; 2025.12 |
| `BARO_2SMBP_02B` | Adds the driver for the Omron 2SMPB-02B barometer on the I2C bus. Board configs also set it for barometers on the flight controller.                                                                                   | `BARO`                           | &lt; 2025.12 |
| `BARO_BMP085`    | Adds the driver for the Bosch BMP085 barometer on the I2C bus. Board configs also set it for barometers on the flight controller.                                                                                      | `BARO`                           | &lt; 2025.12 |
| `BARO_BMP280`    | Adds the driver for the Bosch BMP280 barometer on the I2C bus. Board configs also set it for barometers on the flight controller. The firmware removes it when the build has no I2C.                                   | `BARO`                           | &lt; 2025.12 |
| `BARO_BMP388`    | Adds the driver for the Bosch BMP388 barometer on the I2C bus. Board configs also set it for barometers on the flight controller.                                                                                      | `BARO`                           | &lt; 2025.12 |
| `BARO_BMP580`    | Adds the driver for the Bosch BMP580 barometer on the I2C bus. Board configs also set it for barometers on the flight controller.                                                                                      | `BARO`                           | 2026.6       |
| `BARO_BMP581`    | Adds the driver for the Bosch BMP581 barometer on the I2C bus. Board configs also set it for barometers on the flight controller.                                                                                      | `BARO`                           | 2026.6       |
| `BARO_DPS310`    | Adds the driver for the Infineon DPS310 barometer on the I2C bus. This driver also reads the SPL07-003 and SPA06-003. Board configs also set it for barometers on the flight controller.                               | `BARO`                           | &lt; 2025.12 |
| `BARO_LPS22DF`   | Adds the driver for the ST LPS22DF barometer on the I2C bus. Board configs also set it for barometers on the flight controller.                                                                                        | `BARO`                           | &lt; 2025.12 |
| `BARO_MS5611`    | Adds the driver for the TE MS5611 barometer on the I2C bus. Board configs also set it for barometers on the flight controller. The firmware removes it when the build has no I2C.                                      | `BARO`                           | &lt; 2025.12 |
| `BARO_QMP6988`   | Adds the driver for the QST QMP6988 barometer on the I2C bus. Board configs also set it for barometers on the flight controller.                                                                                       | `BARO`                           | &lt; 2025.12 |
| `BARO_SPA06_003` | Adds support for the Goertek SPA06-003 barometer. It uses the DPS310 driver and shows the part name as SPA06_003. This flag turns on `USE_BARO_DPS310` automatically. No board config uses it at this time.            | `BARO`                           | 2026.6       |
| `PITOT`          | Adds pitot tube airspeed sensor support for wings. The sensor connects through I2C or DroneCAN. For an I2C sensor, also add `PITOT_MS4525`.                                                                            |                                  | 2026.12      |
| `PITOT_MS4525`   | Adds the driver for the TE MS4525DO I2C differential pressure sensor, used as a pitot airspeed sensor.                                                                                                                 | `PITOT`                          | 2026.12      |

### GPS and Navigation

| Flag            | Description                                                                                                                                          | Requires | Introduced   |
| :-------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- | :------- | :----------- |
| `GPS_LAP_TIMER` | Adds the GPS lap timer, which measures lap times when the quad passes a saved GPS gate position. The build removes it when `USE_GPS` is not present. | `GPS`    | &lt; 2025.12 |

### Receivers and Telemetry

| Flag                 | Description                                                                                                                                                                                                                                                                | Requires        | Introduced   |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------- | :----------- |
| `CRSF_OFFICIAL_SPEC` | Sets the CRSF serial speed to 416666 baud, as the TBS Rev10 specification gives. The default is 420000 baud. Do not use with ExpressLRS STM32 receivers.                                                                                                                   | `SERIALRX_CRSF` | 2025.12      |
| `RX_PWM`             | Adds support for a PWM receiver, which uses one wire for each channel. Each channel needs one timer pin. Set the pins with the CLI resource command. A firmware fault stops the RX_PARALLEL_PWM feature at this time. The feature list checks `USE_PWM`, not `USE_RX_PWM`. |                 | &lt; 2025.12 |
| `TELEMETRY_IBUS`     | Adds FlySky iBUS telemetry. The IBUS EXTENDED telemetry option also adds it. Not available on ESP32 and RP2350 targets.                                                                                                                                                    |                 | &lt; 2025.12 |

### OSD, VTX and Displays

| Flag                 | Description                                                                                                                                                           | Requires | Introduced   |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- | :----------- |
| `OSD_QUICK_MENU`     | Adds the CMS quick menu for fast access to common settings. The Race Pro option also adds it.                                                                         | `OSD`    | &lt; 2025.12 |
| `SPEC_PREARM_SCREEN` | Adds an OSD screen that shows the spec settings before you arm. Race organisers use it to check that the quad obeys the race rules. The Race Pro option also adds it. | `OSD`    | &lt; 2025.12 |

### Motors, ESCs and Servos

| Flag        | Description                                                                                                                                                                           | Requires          | Introduced   |
| :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------- | :----------- |
| `RPM_LIMIT` | Adds an RPM limiter that uses DShot motor telemetry to limit the maximum motor RPM. Spec racing classes use it. The Race Pro option also adds it. RP2350 and ESP32 targets remove it. | `DSHOT_TELEMETRY` | &lt; 2025.12 |

### Peripherals and Storage

| Flag          | Description                                                                                                                                                                                                                                   | Requires | Introduced   |
| :------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- | :----------- |
| `BLACKBOX`    | Adds Blackbox flight data logging to on-board flash, an SD card or a serial port. Boards with a flash chip or an SD card already have it. On other boards, add it to log to a serial device such as OpenLog.                                  |          | &lt; 2025.12 |
| `TRANSPONDER` | Adds an infrared race transponder. It supports the I-Lap, Arcitimer and ERLT systems. You must connect an IR LED to a timer pin. Set the pin with the CLI resource command. Not available on ESP32, RP2350, STM32N6, STM32C5 and X32 targets. |          | &lt; 2025.12 |

### Flight Features and Other

| Flag       | Description                                                                                                                                                                                                                                                                    | Requires        | Introduced   |
| :--------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------- | :----------- |
| `ELRSV4`   | Changes the on-board SPI ExpressLRS receiver to the ExpressLRS 4 radio protocol. The default protocol is ExpressLRS 3. Use it only on boards with an on-board SPI ExpressLRS receiver. The transmitter must also use ExpressLRS 4. Serial ExpressLRS receivers do not need it. | `RX_EXPRESSLRS` | 2026.6       |
| `GIMBAL`   | Adds control of the Caddx GM3 camera gimbal through a serial port. Stick inputs and quad attitude move the gimbal. Set the gimbal function on a UART with the CLI serial command, function value 262144.                                                                       |                 | 2025.12      |
| `RC_STATS` | Adds RC statistics, for example time at full throttle and average throttle, to the OSD post-flight statistics. The Race Pro option also adds it.                                                                                                                               | `OSD`           | &lt; 2025.12 |

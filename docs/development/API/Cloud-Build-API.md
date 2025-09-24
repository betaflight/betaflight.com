# Betaflight Cloud Build API

Cloud build API was introduced in firmware version 4.4.

## API

Avoiding EOL on 512K targets we have introduced a cloud build API saving around 25% of firmware flash usage.
The build log has information about the build in case of any failure.

### Firmware 4.4

Firmware 4.4 uses unified targets to define which hardware drivers are included in the firmware, as described in the [Unified Targets doc](/docs/wiki/guides/archive/Unified-Targets). No new Unified Targets will be merged

### Firmware 4.5

Firmware 4.5 and later use the config repository for targets defined via preprocessor defines. For more information, see [How to Create a Flight Controller Configuration File for Betaflight](/docs/development/manufacturer/creating-configuration).

## Usage

For optimal results, select only the appropriate hardware for your flight controller after selecting the correct target (you can use the auto‑detect button).

### How to Install Additional Build Options

When using the cloud build system (via the Configurator or API), you can customize your firmware by selecting additional build options. This allows you to enable extra features, protocols, or telemetry support as needed.

**To install additional build options:**

1. **Select your target**: Use the auto-detect button or manually choose your flight controller target.
2. **Choose build options**: In the firmware flasher or build interface, look for checkboxes, dropdowns, or multi-select lists for features such as radio protocols, telemetry, OSD, and other options. You can select multiple options if supported (e.g., enable both CRSF and FPORT protocols, or multiple telemetry systems).
3. **Custom defines**: Add compile‑time defines (macros) to customize your build. Enter them as space‑separated tokens (for example: `FRSKYOSD SMARTAUDIO_NOPULLDOWN`).
4. **Build and flash**: Click the build or flash button. The cloud build system will generate firmware with your selected options included.

:::info
For more details, see the [wiki/Firmware Flasher page](/docs/wiki/configurator/firmware-flasher-tab) and the complete listing of [build options](/docs/development/Defines).
:::

:::note
Selecting many options increases firmware size and may exceed flash limits on 512K targets.
:::

### Radio Protocols

```c
SERIALRX_CRSF       // Team BlackSheep Crossfire protocol
SERIALRX_GHST       // ImmersionRC Ghost Protocol
SERIALRX_IBUS       // FlySky and Turnigy receivers
SERIALRX_SBUS       // FrSky and Futaba receivers
SERIALRX_SPEKTRUM   // DSM2/DSMX (Spektrum)
SERIALRX_FPORT      // FrSky FPort
SERIALRX_XBUS       // JR
SERIALRX_SRXL2      // Spektrum SRXL2 protocol
SERIALRX_JETIEXBUS  // Jeti EX Bus Communication protocol
SERIALRX_SUMD       // Graupner Hott protocol
SERIALRX_SUMH       // Graupner legacy protocol
```

### Telemetry Protocols

```c
TELEMETRY_FRSKY_HUB
TELEMETRY_SMARTPORT
TELEMETRY_CRSF
TELEMETRY_GHST
TELEMETRY_SRXL
TELEMETRY_IBUS
TELEMETRY_IBUS_EXTENDED
TELEMETRY_JETIEXBUS
TELEMETRY_MAVLINK
TELEMETRY_HOTT
TELEMETRY_LTM
```

:::note
Telemetry for CRSF (including ELRS), FPORT, and GHST is included during the build.
:::

### OSD Options

```c
FRSKYOSD
OSD_SD
OSD_HD
```

### Other Options

```c
ACRO_TRAINER
AKK_SMARTAUDIO
ALTITUDE_HOLD
BATTERY_CONTINUE
CAMERA_CONTROL
DASHBOARD
EMFAT_TOOLS
GPS
LED_STRIP
LED_STRIP_64
MAG
PINIO
POSITION_HOLD
RACE_PRO
SERVOS
SOFTSERIAL
VTX
WING
```

### Motor Protocols

```c
BRUSHED
DSHOT
MULTISHOT
ONESHOT
PROSHOT
PWM
```

### Custom Defines

```c
CRSF_OFFICIAL_SPEC
EMFAT_AUTORUN
EMFAT_ICON
ESCSERIAL_SIMONK
GIMBAL
OPTICALFLOW
OPTICALFLOW_MT
OSD_QUICK_MENU
RANGEFINDER
RANGEFINDER_MT
RC_STATS
RPM_LIMIT
SPEC_PREARM_SCREEN
```

### RACE_PRO Define

There is a special `RACE_PRO` define which combines the following defines as one feature pack:

```c
OSD_QUICK_MENU
RC_STATS
RPM_LIMIT
SPEC_PREARM_SCREEN
```

### WING Define

There is a special `WING` define which combines the following defines as one feature pack:

```c
ADVANCED_TPA
SERVOS
```

Note this define will remove the following defines:

```c
ABSOLUTE_CONTROL
INTEGRATED_YAW_CONTROL
LAUNCH_CONTROL
RUNAWAY_TAKEOFF
YAW_SPIN_RECOVERY
```

### SmartAudio Bug

This workaround applies only to some targets on firmware 4.5.2.

```c
NONCOMPLIANT_SMARTAUDIO
```

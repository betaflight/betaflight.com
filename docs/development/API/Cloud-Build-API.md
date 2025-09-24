# Betaflight Cloud Build API

Cloud build API was introduced in firmware version 4.4.

## API

Avoiding EOL on 512K targets we have introduced a cloud build API saving around 25% of firmware flash usage.
The build log has information about the build in case of any failure.

### Firmware 4.4

Uses unified targets defined hardware drivers to be included in the firmware as described in the [Hardware specification](/docs/development/manufacturer/manufacturer-design-guidelines#42-definitions-for-unified-targets)

### Firmware 4.5

Firmware 4.5 or later releases uses config repo for targets using defines only. For more information see [How to Create a Flight Controller Configuration File for Betaflight](/docs/development/manufacturer/creating-configuration)

## Usage

For optimal use, please select ONLY the appropriate hardware for the flight controller after selecting the correct target (using the auto-detect button).

### How to Install Additional Build Options

When using the cloud build system (via the Configurator or API), you can customize your firmware by selecting additional build options. This allows you to enable extra features, protocols, or telemetry support as needed.

**To install additional build options:**

1. **Select your target**: Use the auto-detect button or manually choose your flight controller target.
2. **Choose build options**: In the firmware flasher or build interface, look for checkboxes, dropdowns, or multi-select lists for features such as radio protocols, telemetry, OSD, and other options. You can select multiple options if supported (e.g., enable both CRSF and FPORT protocols, or multiple telemetry systems).
3. **Custom Defines**: For advanced users, you can add custom defines (macros) to further customize your build. Enter these in the provided field, separated by spaces or commas.
4. **Build and flash**: Click the build or flash button. The cloud build system will generate firmware with your selected options included.

For more details, see the [wiki/Firmware Flasher page](/docs/wiki/configurator/firmware-flasher-tab) and the complete listing of [build options](/docs/development/Defines).

### Radio Protocols

```
SERIALRX_CRSF       // Team Black Sheep Crossfire protocol
SERIALRX_GHST       // ImmersionRC Ghost Protocol
SERIALRX_IBUS       // FlySky and Turnigy receivers
SERIALRX_SBUS       // Frsky and Futaba receivers
SERIALRX_SPEKTRUM   // SRXL, DSM2 and DSMX protocol
SERIALRX_FPORT      // FrSky FPort
SERIALRX_XBUS       // JR
SERIALRX_SRXL2      // Spektrum SRXL2 protocol
SERIALRX_JETIEXBUS
SERIALRX_SUMD       // Graupner Hott protocol
SERIALRX_SUMH       // Graupner legacy protocol
```

### Telemetry Protocols

```
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

Note: telemetry for CRSF, ELRS, FPORT and GHOST are included during the build.

### OSD Options

```
FRSKYOSD
OSD_SD
OSD_HD
```

### Other Options

```
ACRO_TRAINER
AKK (SA FIX)
ALTITUDE_HOLD
BATTERY_CONTINUE
CAMERA_CONTROL
DASHBOARD
EMFAT_TOOLS
ESCSERIAL_SIMONK
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

```
BRUSHED
DSHOT
MULTISHOT
ONESHOT
PROSHOT
PWM
```

### Custom Defines

```
CRSF_OFFICIAL_SPEC
EMFAT_AUTORUN
EMFAT_ICON
EMFAT_TOOLS
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

```
OSD_QUICK_MENU
RC_STATS
RPM_LIMIT
SPEC_PREARM_SCREEN
```

### WING Define

There is a special `WING` define which combines the following defines as one feature pack:

```
ADVANCED_TPA
SERVOS
```

Note this define will remove the following defines:

```
ABSOLUTE_CONTROL
INTEGRATED_YAW_CONTROL
LAUNCH_CONTROL
RUNAWAY_TAKEOFF
YAW_SPIN_RECOVERY
```

### Defines for non compliant Smart Audio

This workaround is only needed for firmware 4.5.2 and is no longer needed for 2025.12.0

```
SMARTAUDIO_NOPULLDOWN (STM32F4)
```

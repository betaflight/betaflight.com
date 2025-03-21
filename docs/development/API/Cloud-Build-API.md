# Betaflight Cloud Build API

Cloud build API was introduced in firmware version 4.4.

## API

Avoiding EOL on 512K targets we have introduced a cloud build API saving around 25% of firmware flash usage.
The build log has information about the build in case of any failure.

### Firmware 4.4

Uses unified targets defined hardware drivers to be included in the firmware as described in the [Hardware specification](/docs/development/manufacturer/manufacturer-design-guidelines#42-definitions-for-unified-targets)

### Firmware 4.5

Uses config repo for targets using defines only. For more information see [How to Create a Flight Controller Configuration File for Betaflight 4.5](/docs/development/manufacturer/creating-configuration)

## Usage

For optimal use please select ONLY the appropriate hardware for the flight controller after selecting the correct target (using auto-detect button).
The options below are further described in the [wiki/Firmware Flasher page](/docs/wiki/configurator/firmware-flasher-tab). We also have a complete listing of [build options](/docs/development/Defines).

### Radio Protocols

```
CRSF
EXPRESSLRS
FPORT
GHOST
IBUS
JETIEXBUS
PPM
SBUS
SPECTRUM
SRXL2
SUMD
SUMH
XBUS
```

### Telemetry Protocols

```
FRSKY_HUB
GHST
HOTT
IBUS_EXTENDED
JETIEXBUS
LTM
MAVLINK
SMARTPORT
SRXL
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

```
SMARTAUDIO_NOPULLDOWN (STM32F4)
```

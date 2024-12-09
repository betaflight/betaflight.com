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
GHOST
HOTT
IBUS_EXTENDED
JETIEXBUS
LTM
MAVLINK
SMARTPORT
SRXL
```

Note: telemetry for CRSF, ELRS, FPORT and GHST are included during the build.

### Other Options

```
ACRO_TRAINER
AKK (SA FIX)
ALTITUDE_HOLD
BATTERY_CONTINUE
CAMERA_CONTROL
DASHBOARD
EMFAT
ESC_SERIAL
GPS
LED
LED64
MAG
OSD
OSD (HD)
PINIO
POSITION_HOLD
RACE_PRO
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
OSD_QUICK_MENU
RC_STATS
RPM_LIMIT
SPEC_PREARM_SCREEN
```

### RACE_PRO Define

There is a special RACE_PRO define which combines the following defines as one feature pack:

```
OSD_QUICK_MENU
RC_STATS
RPM_LIMIT
SPEC_PREARM_SCREEN
```

### WING Define

There is a special USE_WING define which combines the following defines as one feature pack:

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

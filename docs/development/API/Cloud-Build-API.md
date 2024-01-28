# Betaflight 4.4 Cloud Build API

## API

Avoiding EOL on 512K targets we have introduced a cloud build API saving around 25% of firmware flash usage.
The build log has information about the build in case of any failure.

### Firmware 4.4

Uses unified targets defined hardware drivers to be included in the firmware as described in the [Hardware specification](/docs/development/manufacturer/manufacturer-design-guidelines#42-definitions-for-unified-targets)

### Firmware 4.5

Uses config repo for targets using defines only. For more information see [How to Create a Flight Controller Configuration File for Betaflight 4.5](/docs/development/manufacturer/creating-configuration)

## Usage

For optimal use please select ONLY the appropiate hardware for the flight controller after selecting the right target (using auto-detect button).
Choices below are further described in the [wiki/Firmware Flasher page](/docs/wiki/configurator/firmware-flasher-tab)

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
AKK (SA FIX)
FLASH
GPS
LED
LED64
MAG
OSD
OSD (HD)
PINIO
VTX
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
ACRO_TRAINER
BATTERY_CONTINUE
DASHBOARD
EMFAT_AUTORUN
EMFAT_ICON
ESCSERIAL_SIMONK
GPS
GPS_PLUS_CODES
LED_STRIP
OSD_QUICK_MENU
RC_STATS
RPM_LIMIT
SERIAL_4WAY_SK_BOOTLOADER
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

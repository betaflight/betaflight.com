# MSP Protocol Reference for Developers

This page lists all MSP (MultiWii Serial Protocol) commands defined in Betaflight firmware master, intended as a quick lookup for firmware and configurator contributors.

**Direction key:**

- `from FC` — FC sends this message in response to a request (outbound from flight controller)
- `to FC` — Configurator/GCS sends this message to the FC (inbound to flight controller)
- `both` — Command works in both directions
- `system` — Internal framing or reserved code
- `unknown` — Direction not annotated in source; inferred from naming convention for MSP v2

**Protocol versions:**

- MSP v1 codes are decimal (0–255); defined in `msp_protocol.h`
- MSP v2 codes are hex (`0x1000`+); defined in `msp_protocol_v2_common.h` and `msp_protocol_v2_betaflight.h`
- MSP v2 framing is indicated by `MSP_V2_FRAME` (255) in a v1 stream

:::info
This page is generated from firmware source by `scripts/extract-pg-msp.js`. To regenerate after a firmware update:

```bash
node scripts/extract-pg-msp.js --firmware-path <path-to-betaflight-repo>
```

The summary table below lists all MSP codes. The **Command Parameters** section further down provides per-command payload field details (byte offsets, C types, min/max values) extracted from `msp.c` handler implementations.
:::

## All MSP Commands

<!-- MSP_TABLE_START -->

_Generated from firmware commit: `c925d4f68202d5882af011b3b33bb3afee9a54e3`_

| Command                          | Msg Id | Direction | Fields | Notes                                                                                         |
| -------------------------------- | ------ | --------- | ------ | --------------------------------------------------------------------------------------------- |
| MSP_PROTOCOL_VERSION             | 0      | system    | —      |                                                                                               |
| MSP_API_VERSION                  | 1      | from FC   | 3      | Get API version                                                                               |
| MSP_FC_VARIANT                   | 2      | from FC   | 1      | Get flight controller variant                                                                 |
| MSP_FC_VERSION                   | 3      | from FC   | 4      | Get flight controller version                                                                 |
| MSP_BOARD_INFO                   | 4      | from FC   | 21     | Get board information                                                                         |
| MSP_BUILD_INFO                   | 5      | from FC   | 3      | Get build information                                                                         |
| MSP_NAME                         | 10     | from FC   | 1      | Returns user set board name - betaflight                                                      |
| MSP_SET_NAME                     | 11     | to FC     | —      | Sets board name - betaflight                                                                  |
| MSP_BATTERY_CONFIG               | 32     | from FC   | 9      | Get battery configuration                                                                     |
| MSP_SET_BATTERY_CONFIG           | 33     | to FC     | 9      | Set battery configuration                                                                     |
| MSP_MODE_RANGES                  | 34     | from FC   | 4      | Returns all mode ranges                                                                       |
| MSP_SET_MODE_RANGE               | 35     | to FC     | 7      | Sets a single mode range                                                                      |
| MSP_FEATURE_CONFIG               | 36     | from FC   | 1      | Get feature configuration                                                                     |
| MSP_SET_FEATURE_CONFIG           | 37     | to FC     | 1      | Set feature configuration                                                                     |
| MSP_BOARD_ALIGNMENT_CONFIG       | 38     | from FC   | 3      | Get board alignment configuration                                                             |
| MSP_SET_BOARD_ALIGNMENT_CONFIG   | 39     | to FC     | 3      | Set board alignment configuration                                                             |
| MSP_CURRENT_METER_CONFIG         | 40     | from FC   | 11     | Get current meter configuration                                                               |
| MSP_SET_CURRENT_METER_CONFIG     | 41     | to FC     | 7      | Set current meter configuration                                                               |
| MSP_MIXER_CONFIG                 | 42     | from FC   | 2      | Get mixer configuration                                                                       |
| MSP_SET_MIXER_CONFIG             | 43     | to FC     | 3      | Set mixer configuration                                                                       |
| MSP_RX_CONFIG                    | 44     | from FC   | 38     | Get RX configuration                                                                          |
| MSP_SET_RX_CONFIG                | 45     | to FC     | 36     | Set RX configuration                                                                          |
| MSP_LED_COLORS                   | 46     | from FC   | 3      | Get LED colors                                                                                |
| MSP_SET_LED_COLORS               | 47     | to FC     | 3      | Set LED colors                                                                                |
| MSP_LED_STRIP_CONFIG             | 48     | from FC   | 5      | Get LED strip configuration                                                                   |
| MSP_SET_LED_STRIP_CONFIG         | 49     | to FC     | 4      | Set LED strip configuration                                                                   |
| MSP_RSSI_CONFIG                  | 50     | from FC   | 1      | Get RSSI configuration                                                                        |
| MSP_SET_RSSI_CONFIG              | 51     | to FC     | 1      | Set RSSI configuration                                                                        |
| MSP_ADJUSTMENT_RANGES            | 52     | from FC   | 8      | Get adjustment ranges                                                                         |
| MSP_SET_ADJUSTMENT_RANGE         | 53     | to FC     | 9      | Set adjustment range                                                                          |
| MSP_CF_SERIAL_CONFIG             | 54     | from FC   | 6      | Get Cleanflight serial configuration                                                          |
| MSP_SET_CF_SERIAL_CONFIG         | 55     | to FC     | 6      | Set Cleanflight serial configuration                                                          |
| MSP_VOLTAGE_METER_CONFIG         | 56     | from FC   | 7      | Get voltage meter configuration                                                               |
| MSP_SET_VOLTAGE_METER_CONFIG     | 57     | to FC     | 7      | Set voltage meter configuration                                                               |
| MSP_SONAR_ALTITUDE               | 58     | from FC   | 2      | Get sonar altitude [cm]                                                                       |
| MSP_PID_CONTROLLER               | 59     | from FC   | 1      | Get PID controller                                                                            |
| MSP_SET_PID_CONTROLLER           | 60     | to FC     | —      | Set PID controller                                                                            |
| MSP_ARMING_CONFIG                | 61     | from FC   | 4      | Get arming configuration                                                                      |
| MSP_SET_ARMING_CONFIG            | 62     | to FC     | 4      | Set arming configuration                                                                      |
| MSP_RX_MAP                       | 64     | from FC   | 1      | Get RX map (also returns number of channels total)                                            |
| MSP_SET_RX_MAP                   | 65     | to FC     | 1      | Set RX map, numchannels to set comes from MSP_RX_MAP                                          |
| MSP_REBOOT                       | 68     | to FC     | 3      | Reboot settings                                                                               |
| MSP_DATAFLASH_SUMMARY            | 70     | from FC   | —      | Get description of dataflash chip                                                             |
| MSP_DATAFLASH_READ               | 71     | from FC   | —      | Get content of dataflash chip                                                                 |
| MSP_DATAFLASH_ERASE              | 72     | to FC     | —      | Erase dataflash chip                                                                          |
| MSP_FAILSAFE_CONFIG              | 75     | from FC   | 6      | Get failsafe settings                                                                         |
| MSP_SET_FAILSAFE_CONFIG          | 76     | to FC     | 6      | Set failsafe settings                                                                         |
| MSP_RXFAIL_CONFIG                | 77     | from FC   | 2      | Get RX failsafe settings                                                                      |
| MSP_SET_RXFAIL_CONFIG            | 78     | to FC     | 3      | Set RX failsafe settings                                                                      |
| MSP_SDCARD_SUMMARY               | 79     | from FC   | —      | Get SD card state                                                                             |
| MSP_BLACKBOX_CONFIG              | 80     | from FC   | 14     | Get blackbox settings                                                                         |
| MSP_SET_BLACKBOX_CONFIG          | 81     | to FC     | 6      | Set blackbox settings                                                                         |
| MSP_TRANSPONDER_CONFIG           | 82     | from FC   | 6      | Get transponder settings                                                                      |
| MSP_SET_TRANSPONDER_CONFIG       | 83     | to FC     | 2      | Set transponder settings                                                                      |
| MSP_OSD_CONFIG                   | 84     | from FC   | 27     | Get OSD settings                                                                              |
| MSP_SET_OSD_CONFIG               | 85     | to FC     | 21     | Set OSD settings                                                                              |
| MSP_OSD_CHAR_READ                | 86     | from FC   | —      | Get OSD characters                                                                            |
| MSP_OSD_CHAR_WRITE               | 87     | to FC     | 5      | Set OSD characters                                                                            |
| MSP_VTX_CONFIG                   | 88     | from FC   | 17     | Get VTX settings                                                                              |
| MSP_SET_VTX_CONFIG               | 89     | to FC     | 16     | Set VTX settings                                                                              |
| MSP_ADVANCED_CONFIG              | 90     | from FC   | 16     | Get advanced configuration                                                                    |
| MSP_SET_ADVANCED_CONFIG          | 91     | to FC     | 15     | Set advanced configuration                                                                    |
| MSP_FILTER_CONFIG                | 92     | from FC   | 50     | Get filter configuration                                                                      |
| MSP_SET_FILTER_CONFIG            | 93     | to FC     | 50     | Set filter configuration                                                                      |
| MSP_PID_ADVANCED                 | 94     | from FC   | 70     | Get advanced PID settings                                                                     |
| MSP_SET_PID_ADVANCED             | 95     | to FC     | 70     | Set advanced PID settings                                                                     |
| MSP_SENSOR_CONFIG                | 96     | from FC   | 10     | Get sensor configuration                                                                      |
| MSP_SET_SENSOR_CONFIG            | 97     | to FC     | 10     | Set sensor configuration                                                                      |
| MSP_CAMERA_CONTROL               | 98     | both      | 1      | Camera control                                                                                |
| MSP_SET_ARMING_DISABLED          | 99     | to FC     | 2      | Enable/disable arming                                                                         |
| MSP_STATUS                       | 101    | from FC   | 20     | Cycletime & errors_count & sensor present & box activation & current setting number           |
| MSP_RAW_IMU                      | 102    | from FC   | 5      | 9 DOF                                                                                         |
| MSP_SERVO                        | 103    | from FC   | 1      | Servos                                                                                        |
| MSP_MOTOR                        | 104    | from FC   | 3      | Motors                                                                                        |
| MSP_RC                           | 105    | from FC   | 1      | RC channels and more                                                                          |
| MSP_RAW_GPS                      | 106    | from FC   | 8      | Fix, numsat, lat, lon, alt, speed, ground course                                              |
| MSP_COMP_GPS                     | 107    | from FC   | 3      | Distance home, direction home                                                                 |
| MSP_ATTITUDE                     | 108    | from FC   | 3      | 2 angles 1 heading                                                                            |
| MSP_ALTITUDE                     | 109    | from FC   | 3      | Altitude, variometer                                                                          |
| MSP_ANALOG                       | 110    | from FC   | 5      | Vbat, powermetersum, rssi if available on RX                                                  |
| MSP_RC_TUNING                    | 111    | from FC   | 18     | RC rate, rc expo, rollpitch rate, yaw rate, dyn throttle PID                                  |
| MSP_PID                          | 112    | from FC   | 3      | P I D coeff (9 are used currently)                                                            |
| MSP_BOXNAMES                     | 116    | from FC   | —      | The aux switch names                                                                          |
| MSP_PIDNAMES                     | 117    | from FC   | 1      | The PID names                                                                                 |
| MSP_WP                           | 118    | from FC   | —      | Get a WP, WP# is in the payload, returns (WP#, lat, lon, alt, flags) WP#0-home, WP#16-poshold |
| MSP_BOXIDS                       | 119    | from FC   | —      | Get the permanent IDs associated to BOXes                                                     |
| MSP_SERVO_CONFIGURATIONS         | 120    | from FC   | 6      | All servo configurations                                                                      |
| MSP_NAV_STATUS                   | 121    | from FC   | —      | Returns navigation status                                                                     |
| MSP_NAV_CONFIG                   | 122    | from FC   | —      | Returns navigation parameters                                                                 |
| MSP_MOTOR_3D_CONFIG              | 124    | from FC   | 3      | Settings needed for reversible ESCs                                                           |
| MSP_RC_DEADBAND                  | 125    | from FC   | 5      | Deadbands for yaw alt pitch roll                                                              |
| MSP_SENSOR_ALIGNMENT             | 126    | from FC   | 12     | Orientation of acc,gyro,mag                                                                   |
| MSP_LED_STRIP_MODECOLOR          | 127    | from FC   | 9      | Get LED strip mode_color settings                                                             |
| MSP_VOLTAGE_METERS               | 128    | from FC   | 2      | Voltage (per meter)                                                                           |
| MSP_CURRENT_METERS               | 129    | from FC   | 3      | Amperage (per meter)                                                                          |
| MSP_BATTERY_STATE                | 130    | from FC   | 7      | Connected/Disconnected, Voltage, Current Used                                                 |
| MSP_MOTOR_CONFIG                 | 131    | from FC   | 9      | Motor configuration (min/max throttle, etc)                                                   |
| MSP_GPS_CONFIG                   | 132    | from FC   | 6      | GPS configuration                                                                             |
| MSP_COMPASS_CONFIG               | 133    | from FC   | 1      | Compass configuration                                                                         |
| MSP_ESC_SENSOR_DATA              | 134    | from FC   | 6      | Extra ESC data from 32-Bit ESCs (Temperature, RPM)                                            |
| MSP_GPS_RESCUE                   | 135    | from FC   | 15     | GPS Rescue angle, returnAltitude, descentDistance, groundSpeed, sanityChecks and minSats      |
| MSP_GPS_RESCUE_PIDS              | 136    | from FC   | 7      | GPS Rescue throttleP and velocity PIDS + yaw P                                                |
| MSP_VTXTABLE_BAND                | 137    | from FC   | 7      | VTX table band/channel data                                                                   |
| MSP_VTXTABLE_POWERLEVEL          | 138    | from FC   | 4      | VTX table powerLevel data                                                                     |
| MSP_MOTOR_TELEMETRY              | 139    | from FC   | 7      | Per-motor telemetry data (RPM, packet stats, ESC temp, etc.)                                  |
| MSP_SIMPLIFIED_TUNING            | 140    | from FC   | —      | Get simplified tuning values and enabled state                                                |
| MSP_SET_SIMPLIFIED_TUNING        | 141    | to FC     | —      | Set simplified tuning positions and apply calculated tuning                                   |
| MSP_CALCULATE_SIMPLIFIED_PID     | 142    | from FC   | —      | Calculate PID values based on sliders without saving                                          |
| MSP_CALCULATE_SIMPLIFIED_GYRO    | 143    | from FC   | —      | Calculate gyro filter values based on sliders without saving                                  |
| MSP_CALCULATE_SIMPLIFIED_DTERM   | 144    | from FC   | —      | Calculate D term filter values based on sliders without saving                                |
| MSP_VALIDATE_SIMPLIFIED_TUNING   | 145    | from FC   | 3      | Returns array of true/false showing which simplified tuning groups match values               |
| MSP_STATUS_EX                    | 150    | from FC   | —      | Cycletime, errors_count, CPU load, sensor present etc                                         |
| MSP_UID                          | 160    | from FC   | 3      | Unique device ID                                                                              |
| MSP_GPSSVINFO                    | 164    | from FC   | 5      | Get Signal Strength (only U-Blox)                                                             |
| MSP_GPSSTATISTICS                | 166    | from FC   | —      | Get GPS debugging data                                                                        |
| MSP_ATTITUDE_QUATERNION          | 167    | from FC   | 4      | Orientation quaternion components (w, x, y, z)                                                |
| MSP_OSD_VIDEO_CONFIG             | 180    | from FC   | —      | Get OSD video settings                                                                        |
| MSP_SET_OSD_VIDEO_CONFIG         | 181    | to FC     | —      | Set OSD video settings                                                                        |
| MSP_DISPLAYPORT                  | 182    | from FC   | —      | External OSD displayport mode                                                                 |
| MSP_COPY_PROFILE                 | 183    | to FC     | 3      | Copy settings between profiles                                                                |
| MSP_BEEPER_CONFIG                | 184    | from FC   | 3      | Get beeper configuration                                                                      |
| MSP_SET_BEEPER_CONFIG            | 185    | to FC     | 3      | Set beeper configuration                                                                      |
| MSP_SET_TX_INFO                  | 186    | to FC     | 1      | Set runtime information from TX lua scripts                                                   |
| MSP_TX_INFO                      | 187    | from FC   | 2      | Get runtime information for TX lua scripts                                                    |
| MSP_SET_OSD_CANVAS               | 188    | to FC     | 2      | Set OSD canvas size COLSxROWS                                                                 |
| MSP_OSD_CANVAS                   | 189    | from FC   | 2      | Get OSD canvas size COLSxROWS                                                                 |
| MSP_SET_RAW_RC                   | 200    | to FC     | 1      | 8 rc chan                                                                                     |
| MSP_SET_RAW_GPS                  | 201    | to FC     | 6      | Fix, numsat, lat, lon, alt, speed                                                             |
| MSP_SET_PID                      | 202    | to FC     | 3      | P I D coeff (9 are used currently)                                                            |
| MSP_SET_RC_TUNING                | 204    | to FC     | 18     | RC rate, rc expo, rollpitch rate, yaw rate, dyn throttle PID, yaw expo                        |
| MSP_ACC_CALIBRATION              | 205    | to FC     | —      | No param - calibrate accelerometer                                                            |
| MSP_MAG_CALIBRATION              | 206    | to FC     | —      | No param - calibrate magnetometer                                                             |
| MSP_RESET_CONF                   | 208    | to FC     | 1      | No param - reset settings                                                                     |
| MSP_SET_WP                       | 209    | to FC     | —      | Sets a given WP (WP#,lat, lon, alt, flags)                                                    |
| MSP_SELECT_SETTING               | 210    | to FC     | 1      | Select setting number (0-2)                                                                   |
| MSP_SET_HEADING                  | 211    | to FC     | 1      | Define a new heading hold direction                                                           |
| MSP_SET_SERVO_CONFIGURATION      | 212    | to FC     | 7      | Servo settings                                                                                |
| MSP_SET_MOTOR                    | 214    | to FC     | 1      | PropBalance function                                                                          |
| MSP_SET_NAV_CONFIG               | 215    | to FC     | —      | Sets nav config parameters                                                                    |
| MSP_SET_MOTOR_3D_CONFIG          | 217    | to FC     | 3      | Settings needed for reversible ESCs                                                           |
| MSP_SET_RC_DEADBAND              | 218    | to FC     | 5      | Deadbands for yaw alt pitch roll                                                              |
| MSP_SET_RESET_CURR_PID           | 219    | to FC     | —      | Reset current PID profile to defaults                                                         |
| MSP_SET_SENSOR_ALIGNMENT         | 220    | to FC     | 11     | Set the orientation of acc,gyro,mag                                                           |
| MSP_SET_LED_STRIP_MODECOLOR      | 221    | to FC     | 3      | Set LED strip mode_color settings                                                             |
| MSP_SET_MOTOR_CONFIG             | 222    | to FC     | 6      | Motor configuration (min/max throttle, etc)                                                   |
| MSP_SET_GPS_CONFIG               | 223    | to FC     | 6      | GPS configuration                                                                             |
| MSP_SET_COMPASS_CONFIG           | 224    | to FC     | 1      | Compass configuration                                                                         |
| MSP_SET_GPS_RESCUE               | 225    | to FC     | 15     | Set GPS Rescue parameters                                                                     |
| MSP_SET_GPS_RESCUE_PIDS          | 226    | to FC     | 7      | Set GPS Rescue PID values                                                                     |
| MSP_SET_VTXTABLE_BAND            | 227    | to FC     | 7      | Set vtxTable band/channel data                                                                |
| MSP_SET_VTXTABLE_POWERLEVEL      | 228    | to FC     | 4      | Set vtxTable powerLevel data                                                                  |
| MSP_MULTIPLE_MSP                 | 230    | from FC   | —      | Request multiple MSPs in one request                                                          |
| MSP_MODE_RANGES_EXTRA            | 238    | from FC   | 4      | Extra mode range data                                                                         |
| MSP_SET_ACC_TRIM                 | 239    | to FC     | 2      | Set acc angle trim values                                                                     |
| MSP_ACC_TRIM                     | 240    | from FC   | 2      | Get acc angle trim values                                                                     |
| MSP_SERVO_MIX_RULES              | 241    | from FC   | 7      | Get servo mixer configuration                                                                 |
| MSP_SET_SERVO_MIX_RULE           | 242    | to FC     | 8      | Set servo mixer configuration                                                                 |
| MSP_SET_PASSTHROUGH              | 245    | to FC     | —      | Set passthrough to peripherals                                                                |
| MSP_SET_RTC                      | 246    | to FC     | 2      | Set the RTC clock                                                                             |
| MSP_RTC                          | 247    | from FC   | 7      | Get the RTC clock                                                                             |
| MSP_SET_BOARD_INFO               | 248    | to FC     | 2      | Set the board information                                                                     |
| MSP_SET_SIGNATURE                | 249    | to FC     | —      | Set the signature of the board and serial number                                              |
| MSP_EEPROM_WRITE                 | 250    | to FC     | —      | Write settings to EEPROM                                                                      |
| MSP_RESERVE_1                    | 251    | system    | —      | reserved for system usage                                                                     |
| MSP_RESERVE_2                    | 252    | system    | —      | reserved for system usage                                                                     |
| MSP_DEBUGMSG                     | 253    | from FC   | —      | debug string buffer                                                                           |
| MSP_DEBUG                        | 254    | from FC   | 1      | debug1,debug2,debug3,debug4                                                                   |
| MSP_V2_FRAME                     | 255    | system    | —      | MSPv2 payload indicator                                                                       |
| MSP2_COMMON_SERIAL_CONFIG        | 0x1009 | from FC   | 7      |                                                                                               |
| MSP2_COMMON_SET_SERIAL_CONFIG    | 0x100a | to FC     | 8      |                                                                                               |
| MSP2_SENSOR_GPS                  | 0x1f03 | to FC     | 23     |                                                                                               |
| MSP2_SENSOR_RANGEFINDER_LIDARMT  | 0x1f01 | to FC     | —      |                                                                                               |
| MSP2_SENSOR_OPTICALFLOW_MT       | 0x1f02 | to FC     | —      |                                                                                               |
| MSP2_BETAFLIGHT_BIND             | 0x3000 | to FC     | —      |                                                                                               |
| MSP2_MOTOR_OUTPUT_REORDERING     | 0x3001 | from FC   | 2      |                                                                                               |
| MSP2_SET_MOTOR_OUTPUT_REORDERING | 0x3002 | to FC     | 2      |                                                                                               |
| MSP2_SEND_DSHOT_COMMAND          | 0x3003 | to FC     | 4      |                                                                                               |
| MSP2_GET_VTX_DEVICE_STATUS       | 0x3004 | from FC   | —      |                                                                                               |
| MSP2_GET_OSD_WARNINGS            | 0x3005 | from FC   | 2      | returns active OSD warning message text                                                       |
| MSP2_GET_TEXT                    | 0x3006 | from FC   | 2      |                                                                                               |
| MSP2_SET_TEXT                    | 0x3007 | to FC     | 2      |                                                                                               |
| MSP2_GET_LED_STRIP_CONFIG_VALUES | 0x3008 | from FC   | 3      |                                                                                               |
| MSP2_SET_LED_STRIP_CONFIG_VALUES | 0x3009 | to FC     | 3      |                                                                                               |
| MSP2_SENSOR_CONFIG_ACTIVE        | 0x300a | from FC   | 12     |                                                                                               |
| MSP2_SENSOR_OPTICALFLOW          | 0x300b | unknown   | —      |                                                                                               |
| MSP2_MCU_INFO                    | 0x300c | from FC   | 2      |                                                                                               |
| MSP2_GYRO_SENSOR_ACTIVE          | 0x300d | from FC   | 2      |                                                                                               |
| MSP2_BATTERY_PROFILE             | 0x300e | from FC   | 8      |                                                                                               |
| MSP2_SET_BATTERY_PROFILE         | 0x300f | to FC     | 8      |                                                                                               |
| MSP2_CLI_SETTING                 | 0x3010 | from FC   | 1      |                                                                                               |
| MSP2_CLI_SETTING_INFO            | 0x3011 | from FC   | 1      |                                                                                               |

<!-- MSP_TABLE_END -->

## Command Parameters

Per-command payload field tables: byte offset, field name, C type, size, and min/max where known. Fields are extracted from `msp.c` handler implementations; only commands with parseable handlers appear here.

<!-- MSP_DETAIL_START -->

### MSP_API_VERSION — 1 — from FC

_Get API version_

| Offset | Field   | Type | Bytes | Default | Min | Max | Notes |
| ------ | ------- | ---- | ----- | ------- | --- | --- | ----- |
| 0      | (value) | U8   | 1     |         |     |     |       |
| 1      | (value) | U8   | 1     |         |     |     |       |
| 2      | (value) | U8   | 1     |         |     |     |       |

### MSP_FC_VARIANT — 2 — from FC

_Get flight controller variant_

| Offset | Field           | Type  | Bytes | Default | Min | Max | Notes                |
| ------ | --------------- | ----- | ----- | ------- | --- | --- | -------------------- |
| 0      | (variable data) | bytes | ?     |         |     |     | variable-length data |

### MSP_FC_VERSION — 3 — from FC

_Get flight controller version_

| Offset | Field    | Type | Bytes | Default | Min | Max | Notes           |
| ------ | -------- | ---- | ----- | ------- | --- | --- | --------------- |
| 0      | (value)  | U8   | 1     |         |     |     | year since 2000 |
| 1      | (value)  | U8   | 1     |         |     |     |                 |
| 2      | (value)  | U8   | 1     |         |     |     |                 |
| 3      | (string) | str  | ?     |         |     |     | string data     |

### MSP_BOARD_INFO — 4 — from FC

_Get board information_

| Offset | Field              | Type  | Bytes | Default                          | Min | Max | Notes                                                                                           |
| ------ | ------------------ | ----- | ----- | -------------------------------- | --- | --- | ----------------------------------------------------------------------------------------------- |
| 0      | (variable data)    | bytes | ?     |                                  |     |     | variable-length data                                                                            |
| ?      | (value)            | U16   | 2     |                                  |     |     |                                                                                                 |
| ?      | (value)            | U16   | 2     |                                  |     |     | No other build targets currently have hardware revision detection.                              |
| ?      | (value)            | U8    | 1     |                                  |     |     | 2 == FC with MAX7456                                                                            |
| ?      | (value)            | U8    | 1     |                                  |     |     | 0 == FC                                                                                         |
| ?      | (value)            | U8    | 1     |                                  |     |     |                                                                                                 |
| ?      | (string)           | str   | ?     |                                  |     |     | string data                                                                                     |
| ?      | (string)           | str   | ?     |                                  |     |     | string data                                                                                     |
| ?      | (string)           | str   | ?     |                                  |     |     | string data                                                                                     |
| ?      | (value)            | U8    | 1     |                                  |     |     | deprecated/padding                                                                              |
| ?      | (value)            | U8    | 1     |                                  |     |     | deprecated/padding                                                                              |
| ?      | (variable data)    | bytes | ?     |                                  |     |     | variable-length data                                                                            |
| ?      | (variable data)    | bytes | ?     |                                  |     |     | variable-length data                                                                            |
| ?      | (value)            | U8    | 1     |                                  |     |     |                                                                                                 |
| ?      | configurationState | U8    | 1     | CONFIGURATION_STATE_UNCONFIGURED |     |     |                                                                                                 |
| ?      | sampleRateHz       | U16   | 2     |                                  |     |     | informational so the configurator can display the correct gyro/pid frequencies in the drop-down |
| ?      | (value)            | U32   | 4     |                                  |     |     |                                                                                                 |
| ?      | (value)            | U8    | 1     |                                  |     |     |                                                                                                 |
| ?      | (value)            | U8    | 1     |                                  |     |     | deprecated/padding                                                                              |
| ?      | (value)            | U8    | 1     |                                  |     |     |                                                                                                 |
| ?      | (value)            | U8    | 1     |                                  |     |     | deprecated/padding                                                                              |

### MSP_BUILD_INFO — 5 — from FC

_Get build information_

| Offset | Field           | Type  | Bytes | Default | Min | Max | Notes                |
| ------ | --------------- | ----- | ----- | ------- | --- | --- | -------------------- |
| 0      | (variable data) | bytes | ?     |         |     |     | variable-length data |
| ?      | (variable data) | bytes | ?     |         |     |     | variable-length data |
| ?      | (variable data) | bytes | ?     |         |     |     | variable-length data |

### MSP_NAME — 10 — from FC

_Returns user set board name - betaflight_

| Offset | Field    | Type | Bytes | Default | Min | Max | Notes       |
| ------ | -------- | ---- | ----- | ------- | --- | --- | ----------- |
| 0      | (string) | str  | ?     |         |     |     | string data |

### MSP_BATTERY_CONFIG — 32 — from FC

_Get battery configuration_

| Offset | Field                  | Type | Bytes | Default                      | Min                        | Max                        | Notes                       |
| ------ | ---------------------- | ---- | ----- | ---------------------------- | -------------------------- | -------------------------- | --------------------------- |
| 0      | (value)                | U8   | 1     |                              |                            |                            |                             |
| 1      | (value)                | U8   | 1     |                              |                            |                            |                             |
| 2      | (value)                | U8   | 1     |                              |                            |                            |                             |
| 3      | batteryCapacity        | U16  | 2     |                              | 0                          | 20000                      |                             |
| 5      | voltageMeterSource     | U8   | 1     | DEFAULT_VOLTAGE_METER_SOURCE |                            |                            | lookup: TABLE_VOLTAGE_METER |
| 6      | currentMeterSource     | U8   | 1     | DEFAULT_CURRENT_METER_SOURCE |                            |                            | lookup: TABLE_CURRENT_METER |
| 7      | vbatmincellvoltage     | U16  | 2     |                              | VBAT_CELL_VOTAGE_RANGE_MIN | VBAT_CELL_VOTAGE_RANGE_MAX |                             |
| 9      | vbatmaxcellvoltage     | U16  | 2     |                              | VBAT_CELL_VOTAGE_RANGE_MIN | VBAT_CELL_VOTAGE_RANGE_MAX |                             |
| 11     | vbatwarningcellvoltage | U16  | 2     |                              | VBAT_CELL_VOTAGE_RANGE_MIN | VBAT_CELL_VOTAGE_RANGE_MAX |                             |

### MSP_SET_BATTERY_CONFIG — 33 — to FC

_Set battery configuration_

| Offset | Field              | Type | Bytes | Default                      | Min | Max | Notes                                 |
| ------ | ------------------ | ---- | ----- | ---------------------------- | --- | --- | ------------------------------------- |
| 0      | (read)             | U8   | 1     |                              |     |     | vbatlevel_warn1 in MWC2.3 GUI         |
| 1      | (read)             | U8   | 1     |                              |     |     | vbatlevel_warn2 in MWC2.3 GUI         |
| 2      | (read)             | U8   | 1     |                              |     |     | vbatlevel when buzzer starts to alert |
| 3      | (read)             | U16  | 2     |                              |     |     |                                       |
| 5      | voltageMeterSource | U8   | 1     | DEFAULT_VOLTAGE_METER_SOURCE |     |     | lookup: TABLE_VOLTAGE_METER           |
| 6      | currentMeterSource | U8   | 1     | DEFAULT_CURRENT_METER_SOURCE |     |     | lookup: TABLE_CURRENT_METER           |
| 7      | (read)             | U16  | 2     |                              |     |     |                                       |
| 9      | (read)             | U16  | 2     |                              |     |     |                                       |
| 11     | (read)             | U16  | 2     |                              |     |     |                                       |

### MSP_MODE_RANGES — 34 — from FC

_Returns all mode ranges_

| Offset | Field           | Type | Bytes | Default | Min | Max | Notes |
| ------ | --------------- | ---- | ----- | ------- | --- | --- | ----- |
| 0      | permanentId     | U8   | 1     |         |     |     |       |
| 1      | auxChannelIndex | U8   | 1     |         |     |     |       |
| 2      | startStep       | U8   | 1     |         |     |     |       |
| 3      | endStep         | U8   | 1     |         |     |     |       |

### MSP_SET_MODE_RANGE — 35 — to FC

_Sets a single mode range_

| Offset | Field           | Type | Bytes | Default | Min | Max | Notes              |
| ------ | --------------- | ---- | ----- | ------- | --- | --- | ------------------ |
| 0      | (read)          | U8   | 1     |         |     |     | deprecated/ignored |
| 1      | (read)          | U8   | 1     |         |     |     | deprecated/ignored |
| 2      | auxChannelIndex | U8   | 1     |         |     |     |                    |
| 3      | (read)          | U8   | 1     |         |     |     | deprecated/ignored |
| 4      | (read)          | U8   | 1     |         |     |     | deprecated/ignored |
| 5      | modeLogic       | U8   | 1     |         |     |     |                    |
| 6      | (read)          | U8   | 1     |         |     |     | deprecated/ignored |

### MSP_FEATURE_CONFIG — 36 — from FC

_Get feature configuration_

| Offset | Field           | Type | Bytes | Default          | Min                | Max                  | Notes           |
| ------ | --------------- | ---- | ----- | ---------------- | ------------------ | -------------------- | --------------- | --- | --- | --- |
| 0      | enabledFeatures | U32  | 4     | DEFAULT_FEATURES | DEFAULT_RX_FEATURE | FEATURE_ANTI_GRAVITY | FEATURE_AIRMODE |     |     |     |

### MSP_SET_FEATURE_CONFIG — 37 — to FC

_Set feature configuration_

| Offset | Field  | Type | Bytes | Default | Min | Max | Notes |
| ------ | ------ | ---- | ----- | ------- | --- | --- | ----- |
| 0      | (read) | U32  | 4     |         |     |     |       |

### MSP_BOARD_ALIGNMENT_CONFIG — 38 — from FC

_Get board alignment configuration_

| Offset | Field        | Type | Bytes | Default                   | Min  | Max | Notes |
| ------ | ------------ | ---- | ----- | ------------------------- | ---- | --- | ----- |
| 0      | rollDegrees  | U16  | 2     | DEFAULT_ALIGN_BOARD_ROLL  | -180 | 360 |       |
| 2      | pitchDegrees | U16  | 2     | DEFAULT_ALIGN_BOARD_PITCH | -180 | 360 |       |
| 4      | yawDegrees   | U16  | 2     | DEFAULT_ALIGN_BOARD_YAW   | -180 | 360 |       |

### MSP_SET_BOARD_ALIGNMENT_CONFIG — 39 — to FC

_Set board alignment configuration_

| Offset | Field        | Type | Bytes | Default                   | Min  | Max | Notes |
| ------ | ------------ | ---- | ----- | ------------------------- | ---- | --- | ----- |
| 0      | rollDegrees  | U16  | 2     | DEFAULT_ALIGN_BOARD_ROLL  | -180 | 360 |       |
| 2      | pitchDegrees | U16  | 2     | DEFAULT_ALIGN_BOARD_PITCH | -180 | 360 |       |
| 4      | yawDegrees   | U16  | 2     | DEFAULT_ALIGN_BOARD_YAW   | -180 | 360 |       |

### MSP_CURRENT_METER_CONFIG — 40 — from FC

_Get current meter configuration_

| Offset | Field   | Type | Bytes | Default                      | Min    | Max   | Notes                                                                |
| ------ | ------- | ---- | ----- | ---------------------------- | ------ | ----- | -------------------------------------------------------------------- |
| 0      | (value) | U8   | 1     |                              |        |       |                                                                      |
| 1      | (value) | U8   | 1     |                              |        |       |                                                                      |
| 2      | (value) | U8   | 1     |                              |        |       | the id of the meter                                                  |
| 3      | (value) | U8   | 1     |                              |        |       | indicate the type of sensor that the next part of the payload is for |
| 4      | scale   | U16  | 2     | DEFAULT_CURRENT_METER_SCALE  | -16000 | 16000 |                                                                      |
| 6      | offset  | U16  | 2     | DEFAULT_CURRENT_METER_OFFSET | -32000 | 32000 |                                                                      |
| 8      | (value) | U8   | 1     |                              |        |       |                                                                      |
| 9      | (value) | U8   | 1     |                              |        |       | the id of the meter                                                  |
| 10     | (value) | U8   | 1     |                              |        |       | indicate the type of sensor that the next part of the payload is for |
| 11     | scale   | U16  | 2     | DEFAULT_CURRENT_METER_SCALE  | -16000 | 16000 |                                                                      |
| 13     | offset  | U16  | 2     | DEFAULT_CURRENT_METER_OFFSET | -32000 | 32000 |                                                                      |

### MSP_SET_CURRENT_METER_CONFIG — 41 — to FC

_Set current meter configuration_

| Offset | Field  | Type | Bytes | Default                      | Min    | Max   | Notes              |
| ------ | ------ | ---- | ----- | ---------------------------- | ------ | ----- | ------------------ |
| 0      | (read) | U8   | 1     |                              |        |       | deprecated/ignored |
| 1      | scale  | U16  | 2     | DEFAULT_CURRENT_METER_SCALE  | -16000 | 16000 |                    |
| 3      | offset | U16  | 2     | DEFAULT_CURRENT_METER_OFFSET | -32000 | 32000 |                    |
| 5      | scale  | U16  | 2     | DEFAULT_CURRENT_METER_SCALE  | -16000 | 16000 |                    |
| 7      | offset | U16  | 2     | DEFAULT_CURRENT_METER_OFFSET | -32000 | 32000 |                    |
| 9      | (read) | U16  | 2     |                              |        |       |                    |
| 11     | (read) | U16  | 2     |                              |        |       |                    |

### MSP_MIXER_CONFIG — 42 — from FC

_Get mixer configuration_

| Offset | Field               | Type | Bytes | Default             | Min | Max | Notes                |
| ------ | ------------------- | ---- | ----- | ------------------- | --- | --- | -------------------- |
| 0      | mixerMode           | U8   | 1     | DEFAULT_MIXER       |     |     |                      |
| 1      | yaw_motors_reversed | U8   | 1     | YAW_MOTORS_REVERSED |     |     | lookup: TABLE_OFF_ON |

### MSP_SET_MIXER_CONFIG — 43 — to FC

_Set mixer configuration_

| Offset | Field               | Type | Bytes | Default             | Min | Max | Notes                |
| ------ | ------------------- | ---- | ----- | ------------------- | --- | --- | -------------------- |
| 0      | mixerMode           | U8   | 1     | DEFAULT_MIXER       |     |     |                      |
| 1      | (read)              | U8   | 1     |                     |     |     | deprecated/ignored   |
| 2      | yaw_motors_reversed | U8   | 1     | YAW_MOTORS_REVERSED |     |     | lookup: TABLE_OFF_ON |

### MSP_RX_CONFIG — 44 — from FC

_Get RX configuration_

| Offset | Field                             | Type  | Bytes | Default | Min                          | Max                          | Notes                                                                  |
| ------ | --------------------------------- | ----- | ----- | ------- | ---------------------------- | ---------------------------- | ---------------------------------------------------------------------- |
| 0      | serialrx_provider                 | U8    | 1     |         |                              |                              | lookup: TABLE_SERIAL_RX                                                |
| 1      | maxcheck                          | U16   | 2     |         | PWM_PULSE_MIN                | PWM_PULSE_MAX                |                                                                        |
| 3      | midrc                             | U16   | 2     |         | 1200                         | 1700                         |                                                                        |
| 5      | mincheck                          | U16   | 2     |         | PWM_PULSE_MIN                | PWM_PULSE_MAX                |                                                                        |
| 7      | spektrum_sat_bind                 | U8    | 1     |         | SPEKTRUM_SAT_BIND_DISABLED   | SPEKTRUM_SAT_BIND_MAX        |                                                                        |
| 8      | rx_min_usec                       | U16   | 2     |         | PWM_PULSE_MIN                | PWM_PULSE_MAX                |                                                                        |
| 10     | rx_max_usec                       | U16   | 2     |         | PWM_PULSE_MIN                | PWM_PULSE_MAX                |                                                                        |
| 12     | (value)                           | U8    | 1     |         |                              |                              | not required in API 1.44, was rxConfig()->rcInterpolation              |
| 13     | (value)                           | U8    | 1     |         |                              |                              | not required in API 1.44, was rxConfig()->rcInterpolationInterval      |
| 14     | (value)                           | U16   | 2     |         |                              |                              |                                                                        |
| 16     | rx_spi_protocol                   | U8    | 1     | 0       |                              |                              | lookup: TABLE_RX_SPI                                                   |
| 17     | rx_spi_id                         | U32   | 4     |         |                              |                              |                                                                        |
| 21     | rx_spi_rf_channel_count           | U8    | 1     |         |                              |                              |                                                                        |
| 22     | (value)                           | U8    | 1     |         |                              |                              | deprecated/padding                                                     |
| 23     | (value)                           | U32   | 4     |         |                              |                              | deprecated/padding                                                     |
| 27     | (value)                           | U8    | 1     |         |                              |                              | deprecated/padding                                                     |
| 28     | fpvCamAngleDegrees                | U8    | 1     |         | 0                            | 90                           |                                                                        |
| 29     | (value)                           | U8    | 1     |         |                              |                              | not required in API 1.44, was rxConfig()->rcSmoothingChannels          |
| 30     | (value)                           | U8    | 1     |         |                              |                              | not required in API 1.44, was rxConfig()->rc_smoothing_type            |
| 31     | rc_smoothing_setpoint_cutoff      | U8    | 1     |         | 0                            | UINT8_MAX                    |                                                                        |
| 32     | rc_smoothing_throttle_cutoff      | U8    | 1     |         | 0                            | UINT8_MAX                    | was rc_smoothing_feedforward_cutoff                                    |
| 33     | rc_smoothing_auto_factor_throttle | U8    | 1     |         | RC_SMOOTHING_AUTO_FACTOR_MIN | RC_SMOOTHING_AUTO_FACTOR_MAX | , was rxConfig()->rc_smoothing_input_type                              |
| 34     | (value)                           | U8    | 1     |         |                              |                              | not required in API 1.44, was rxConfig()->rc_smoothing_derivative_type |
| 35     | (value)                           | U8    | 1     |         |                              |                              | deprecated/padding                                                     |
| 36     | (value)                           | U8    | 1     |         |                              |                              | deprecated/padding                                                     |
| 37     | (value)                           | U8    | 1     |         |                              |                              | deprecated/padding                                                     |
| 38     | (value)                           | U8    | 1     |         |                              |                              | deprecated/padding                                                     |
| 39     | (value)                           | U8    | 1     |         |                              |                              | deprecated/padding                                                     |
| 40     | type                              | U8    | 1     | DEFAULT |                              |                              | lookup: TABLE_OFF_ON                                                   |
| 41     | (value)                           | U8    | 1     |         |                              |                              | deprecated/padding                                                     |
| 42     | rc_smoothing_auto_factor_rpy      | U8    | 1     |         | RC_SMOOTHING_AUTO_FACTOR_MIN | RC_SMOOTHING_AUTO_FACTOR_MAX |                                                                        |
| 43     | (value)                           | U8    | 1     |         |                              |                              | deprecated/padding                                                     |
| 44     | rc_smoothing                      | U8    | 1     |         |                              |                              | lookup: TABLE_OFF_ON                                                   |
| 45     | (value)                           | U8    | 1     |         |                              |                              | deprecated/padding                                                     |
| 46     | (variable data)                   | bytes | ?     |         |                              |                              | variable-length data                                                   |
| ?      | (variable data)                   | bytes | ?     |         |                              |                              | variable-length data                                                   |
| ?      | modelId                           | U8    | 1     | 0xFF    | 0                            | UINT8_MAX                    |                                                                        |
| ?      | (value)                           | U8    | 1     |         |                              |                              | deprecated/padding                                                     |

### MSP_SET_RX_CONFIG — 45 — to FC

_Set RX configuration_

| Offset | Field                   | Type | Bytes | Default | Min                        | Max                   | Notes                                                                    |
| ------ | ----------------------- | ---- | ----- | ------- | -------------------------- | --------------------- | ------------------------------------------------------------------------ |
| 0      | serialrx_provider       | U8   | 1     |         |                            |                       | lookup: TABLE_SERIAL_RX                                                  |
| 1      | maxcheck                | U16  | 2     |         | PWM_PULSE_MIN              | PWM_PULSE_MAX         |                                                                          |
| 3      | midrc                   | U16  | 2     |         | 1200                       | 1700                  |                                                                          |
| 5      | mincheck                | U16  | 2     |         | PWM_PULSE_MIN              | PWM_PULSE_MAX         |                                                                          |
| 7      | spektrum_sat_bind       | U8   | 1     |         | SPEKTRUM_SAT_BIND_DISABLED | SPEKTRUM_SAT_BIND_MAX |                                                                          |
| 8      | rx_min_usec             | U16  | 2     |         | PWM_PULSE_MIN              | PWM_PULSE_MAX         |                                                                          |
| 10     | rx_max_usec             | U16  | 2     |         | PWM_PULSE_MIN              | PWM_PULSE_MAX         |                                                                          |
| 12     | (read)                  | U8   | 1     |         |                            |                       | not required in API 1.44, was rxConfigMutable()->rcInterpolation         |
| 13     | (read)                  | U8   | 1     |         |                            |                       | not required in API 1.44, was rxConfigMutable()->rcInterpolationInterval |
| 14     | (read)                  | U16  | 2     |         |                            |                       |                                                                          |
| 16     | rx_spi_protocol         | U8   | 1     | 0       |                            |                       | lookup: TABLE_RX_SPI                                                     |
| 17     | rx_spi_id               | U32  | 4     |         |                            |                       |                                                                          |
| 21     | rx_spi_rf_channel_count | U8   | 1     |         |                            |                       |                                                                          |
| 22     | (read)                  | U8   | 1     |         |                            |                       | deprecated/ignored                                                       |
| 23     | (read)                  | U32  | 4     |         |                            |                       |                                                                          |
| 27     | (read)                  | U8   | 1     |         |                            |                       | deprecated/ignored                                                       |
| 28     | fpvCamAngleDegrees      | U8   | 1     |         | 0                          | 90                    |                                                                          |
| 29     | (read)                  | U8   | 1     |         |                            |                       | not required in API 1.44, was rxConfigMutable()->rcSmoothingChannels     |
| 30     | (read)                  | U8   | 1     |         |                            |                       | not required in API 1.44, was rc_smoothing_type                          |
| 31     | (read)                  | U8   | 1     |         |                            |                       | deprecated/ignored                                                       |
| 32     | (read)                  | U8   | 1     |         |                            |                       | was rc_smoothing_feedforward_cutoff                                      |
| 33     | (read)                  | U8   | 1     |         |                            |                       | was rc_smoothing_input_type                                              |
| 34     | (read)                  | U8   | 1     |         |                            |                       | not required in API 1.44, was rc_smoothing_derivative_type               |
| 35     | (read)                  | U8   | 1     |         |                            |                       | deprecated/ignored                                                       |
| 36     | (read)                  | U8   | 1     |         |                            |                       | deprecated/ignored                                                       |
| 37     | (read)                  | U8   | 1     |         |                            |                       | deprecated/ignored                                                       |
| 38     | (read)                  | U8   | 1     |         |                            |                       | deprecated/ignored                                                       |
| 39     | (read)                  | U8   | 1     |         |                            |                       | deprecated/ignored                                                       |
| 40     | type                    | U8   | 1     | DEFAULT |                            |                       | lookup: TABLE_OFF_ON                                                     |
| 41     | (read)                  | U8   | 1     |         |                            |                       | deprecated/ignored                                                       |
| 42     | (read)                  | U8   | 1     |         |                            |                       | deprecated/ignored                                                       |
| 43     | (read)                  | U8   | 1     |         |                            |                       | deprecated/ignored                                                       |
| 44     | (read)                  | U8   | 1     |         |                            |                       | deprecated/ignored                                                       |
| 45     | (read)                  | U8   | 1     |         |                            |                       | deprecated/ignored                                                       |
| 46     | modelId                 | U8   | 1     | 0xFF    | 0                          | UINT8_MAX             |                                                                          |
| 47     | (read)                  | U8   | 1     |         |                            |                       | deprecated/ignored                                                       |

### MSP_LED_COLORS — 46 — from FC

_Get LED colors_

| Offset | Field | Type | Bytes | Default | Min | Max | Notes |
| ------ | ----- | ---- | ----- | ------- | --- | --- | ----- |
| 0      | h     | U16  | 2     |         |     |     |       |
| 2      | s     | U8   | 1     |         |     |     |       |
| 3      | v     | U8   | 1     |         |     |     |       |

### MSP_SET_LED_COLORS — 47 — to FC

_Set LED colors_

| Offset | Field | Type | Bytes | Default | Min | Max | Notes |
| ------ | ----- | ---- | ----- | ------- | --- | --- | ----- |
| 0      | h     | U16  | 2     |         |     |     |       |
| 2      | s     | U8   | 1     |         |     |     |       |
| 3      | v     | U8   | 1     |         |     |     |       |

### MSP_LED_STRIP_CONFIG — 48 — from FC

_Get LED strip configuration_

| Offset | Field            | Type | Bytes | Default            | Min | Max | Notes                          |
| ------ | ---------------- | ---- | ----- | ------------------ | --- | --- | ------------------------------ |
| 0      | (value)          | U32  | 4     |                    |     |     |                                |
| 4      | (value)          | U32  | 4     |                    |     |     | deprecated/padding             |
| 8      | (value)          | U8   | 1     |                    |     |     | advanced ledstrip available    |
| 9      | (value)          | U8   | 1     |                    |     |     | only simple ledstrip available |
| 10     | ledstrip_profile | U8   | 1     | LED_PROFILE_STATUS |     |     | lookup: TABLE_LED_PROFILE      |

### MSP_SET_LED_STRIP_CONFIG — 49 — to FC

_Set LED strip configuration_

| Offset | Field            | Type | Bytes | Default            | Min | Max | Notes                     |
| ------ | ---------------- | ---- | ----- | ------------------ | --- | --- | ------------------------- |
| 0      | (read)           | U8   | 1     |                    |     |     | deprecated/ignored        |
| 1      | (read)           | U32  | 4     |                    |     |     |                           |
| 5      | (read)           | U32  | 4     |                    |     |     |                           |
| 9      | ledstrip_profile | U8   | 1     | LED_PROFILE_STATUS |     |     | lookup: TABLE_LED_PROFILE |

### MSP_RSSI_CONFIG — 50 — from FC

_Get RSSI configuration_

| Offset | Field        | Type | Bytes | Default | Min | Max                            | Notes |
| ------ | ------------ | ---- | ----- | ------- | --- | ------------------------------ | ----- |
| 0      | rssi_channel | U8   | 1     |         | 0   | MAX_SUPPORTED_RC_CHANNEL_COUNT |       |

### MSP_SET_RSSI_CONFIG — 51 — to FC

_Set RSSI configuration_

| Offset | Field        | Type | Bytes | Default | Min | Max                            | Notes |
| ------ | ------------ | ---- | ----- | ------- | --- | ------------------------------ | ----- |
| 0      | rssi_channel | U8   | 1     |         | 0   | MAX_SUPPORTED_RC_CHANNEL_COUNT |       |

### MSP_ADJUSTMENT_RANGES — 52 — from FC

_Get adjustment ranges_

| Offset | Field                 | Type | Bytes | Default | Min | Max | Notes                         |
| ------ | --------------------- | ---- | ----- | ------- | --- | --- | ----------------------------- |
| 0      | (value)               | U8   | 1     |         |     |     | was adjRange->adjustmentIndex |
| 1      | auxChannelIndex       | U8   | 1     |         |     |     |                               |
| 2      | startStep             | U8   | 1     |         |     |     |                               |
| 3      | endStep               | U8   | 1     |         |     |     |                               |
| 4      | adjustmentConfig      | U8   | 1     |         |     |     |                               |
| 5      | auxSwitchChannelIndex | U8   | 1     |         |     |     |                               |
| 6      | adjustmentCenter      | U16  | 2     |         |     |     |                               |
| 8      | adjustmentScale       | U16  | 2     |         |     |     |                               |

### MSP_SET_ADJUSTMENT_RANGE — 53 — to FC

_Set adjustment range_

| Offset | Field                 | Type | Bytes | Default | Min | Max | Notes                         |
| ------ | --------------------- | ---- | ----- | ------- | --- | --- | ----------------------------- |
| 0      | (read)                | U8   | 1     |         |     |     | deprecated/ignored            |
| 1      | (read)                | U8   | 1     |         |     |     | was adjRange->adjustmentIndex |
| 2      | auxChannelIndex       | U8   | 1     |         |     |     |                               |
| 3      | (read)                | U8   | 1     |         |     |     | deprecated/ignored            |
| 4      | (read)                | U8   | 1     |         |     |     | deprecated/ignored            |
| 5      | adjustmentConfig      | U8   | 1     |         |     |     |                               |
| 6      | auxSwitchChannelIndex | U8   | 1     |         |     |     |                               |
| 7      | adjustmentCenter      | U16  | 2     |         |     |     |                               |
| 9      | adjustmentScale       | U16  | 2     |         |     |     |                               |

### MSP_CF_SERIAL_CONFIG — 54 — from FC

_Get Cleanflight serial configuration_

| Offset | Field                   | Type | Bytes | Default | Min | Max | Notes |
| ------ | ----------------------- | ---- | ----- | ------- | --- | --- | ----- |
| 0      | identifier              | U8   | 1     |         |     |     |       |
| 1      | functionMask            | U16  | 2     |         |     |     |       |
| 3      | msp_baudrateIndex       | U8   | 1     |         |     |     |       |
| 4      | gps_baudrateIndex       | U8   | 1     |         |     |     |       |
| 5      | telemetry_baudrateIndex | U8   | 1     |         |     |     |       |
| 6      | blackbox_baudrateIndex  | U8   | 1     |         |     |     |       |

### MSP_SET_CF_SERIAL_CONFIG — 55 — to FC

_Set Cleanflight serial configuration_

| Offset | Field                   | Type | Bytes | Default | Min | Max | Notes              |
| ------ | ----------------------- | ---- | ----- | ------- | --- | --- | ------------------ |
| 0      | (read)                  | U8   | 1     |         |     |     | deprecated/ignored |
| 1      | functionMask            | U16  | 2     |         |     |     |                    |
| 3      | msp_baudrateIndex       | U8   | 1     |         |     |     |                    |
| 4      | gps_baudrateIndex       | U8   | 1     |         |     |     |                    |
| 5      | telemetry_baudrateIndex | U8   | 1     |         |     |     |                    |
| 6      | blackbox_baudrateIndex  | U8   | 1     |         |     |     |                    |

### MSP_VOLTAGE_METER_CONFIG — 56 — from FC

_Get voltage meter configuration_

| Offset | Field                | Type | Bytes | Default | Min                 | Max                 | Notes                                                                |
| ------ | -------------------- | ---- | ----- | ------- | ------------------- | ------------------- | -------------------------------------------------------------------- |
| 0      | (value)              | U8   | 1     |         |                     |                     | voltage meters in payload                                            |
| 1      | (value)              | U8   | 1     |         |                     |                     | ADC sensor sub-frame length                                          |
| 2      | (value)              | U8   | 1     |         |                     |                     | id of the sensor                                                     |
| 3      | (value)              | U8   | 1     |         |                     |                     | indicate the type of sensor that the next part of the payload is for |
| 4      | vbatscale            | U8   | 1     |         | VBAT_SCALE_MIN      | VBAT_SCALE_MAX      |                                                                      |
| 5      | vbatresdivval        | U8   | 1     |         | VBAT_DIVIDER_MIN    | VBAT_DIVIDER_MAX    |                                                                      |
| 6      | vbatresdivmultiplier | U8   | 1     |         | VBAT_MULTIPLIER_MIN | VBAT_MULTIPLIER_MAX |                                                                      |

### MSP_SET_VOLTAGE_METER_CONFIG — 57 — to FC

_Set voltage meter configuration_

| Offset | Field  | Type | Bytes | Default | Min | Max | Notes              |
| ------ | ------ | ---- | ----- | ------- | --- | --- | ------------------ |
| 0      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 1      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 2      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 3      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 4      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 5      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 6      | (read) | U8   | 1     |         |     |     | deprecated/ignored |

### MSP_SONAR_ALTITUDE — 58 — from FC

_Get sonar altitude [cm]_

| Offset | Field   | Type | Bytes | Default | Min | Max | Notes              |
| ------ | ------- | ---- | ----- | ------- | --- | --- | ------------------ |
| 0      | (value) | U32  | 4     |         |     |     |                    |
| 4      | (value) | U32  | 4     |         |     |     | deprecated/padding |

### MSP_PID_CONTROLLER — 59 — from FC

_Get PID controller_

| Offset | Field   | Type | Bytes | Default | Min | Max | Notes |
| ------ | ------- | ---- | ----- | ------- | --- | --- | ----- |
| 0      | (value) | U8   | 1     |         |     |     |       |

### MSP_ARMING_CONFIG — 61 — from FC

_Get arming configuration_

| Offset | Field                 | Type | Bytes | Default             | Min | Max | Notes                |
| ------ | --------------------- | ---- | ----- | ------------------- | --- | --- | -------------------- |
| 0      | auto_disarm_delay     | U8   | 1     | 5                   | 0   | 60  |                      |
| 1      | (value)               | U8   | 1     |                     |     |     | deprecated/padding   |
| 2      | small_angle           | U8   | 1     | DEFAULT_SMALL_ANGLE | 0   | 180 |                      |
| 3      | gyro_cal_on_first_arm | U8   | 1     | 0                   |     |     | lookup: TABLE_OFF_ON |

### MSP_SET_ARMING_CONFIG — 62 — to FC

_Set arming configuration_

| Offset | Field                 | Type | Bytes | Default             | Min | Max | Notes                                             |
| ------ | --------------------- | ---- | ----- | ------------------- | --- | --- | ------------------------------------------------- |
| 0      | auto_disarm_delay     | U8   | 1     | 5                   | 0   | 60  |                                                   |
| 1      | (read)                | U8   | 1     |                     |     |     | reserved. disarm_kill_switch was removed in #5073 |
| 2      | small_angle           | U8   | 1     | DEFAULT_SMALL_ANGLE | 0   | 180 |                                                   |
| 3      | gyro_cal_on_first_arm | U8   | 1     | 0                   |     |     | lookup: TABLE_OFF_ON                              |

### MSP_RX_MAP — 64 — from FC

_Get RX map (also returns number of channels total)_

| Offset | Field           | Type  | Bytes | Default | Min | Max | Notes                |
| ------ | --------------- | ----- | ----- | ------- | --- | --- | -------------------- |
| 0      | (variable data) | bytes | ?     |         |     |     | variable-length data |

### MSP_SET_RX_MAP — 65 — to FC

_Set RX map, numchannels to set comes from MSP_RX_MAP_

| Offset | Field  | Type | Bytes | Default | Min | Max | Notes              |
| ------ | ------ | ---- | ----- | ------- | --- | --- | ------------------ |
| 0      | (read) | U8   | 1     |         |     |     | deprecated/ignored |

### MSP_REBOOT — 68 — to FC

_Reboot settings_

| Offset | Field   | Type | Bytes | Default | Min | Max | Notes              |
| ------ | ------- | ---- | ----- | ------- | --- | --- | ------------------ |
| 0      | (value) | U8   | 1     |         |     |     |                    |
| 1      | (value) | U8   | 1     |         |     |     |                    |
| 2      | (value) | U8   | 1     |         |     |     | deprecated/padding |

### MSP_FAILSAFE_CONFIG — 75 — from FC

_Get failsafe settings_

| Offset | Field                       | Type | Bytes | Default                     | Min           | Max           | Notes                              |
| ------ | --------------------------- | ---- | ----- | --------------------------- | ------------- | ------------- | ---------------------------------- |
| 0      | failsafe_delay              | U8   | 1     | 15                          |               |               |                                    |
| 1      | failsafe_landing_time       | U8   | 1     | 60                          | 0             | 250           |                                    |
| 2      | failsafe_throttle           | U16  | 2     | 1000                        | PWM_PULSE_MIN | PWM_PULSE_MAX |                                    |
| 4      | failsafe_switch_mode        | U8   | 1     | FAILSAFE_SWITCH_MODE_STAGE1 |               |               | lookup: TABLE_FAILSAFE_SWITCH_MODE |
| 5      | failsafe_throttle_low_delay | U16  | 2     | 100                         | 0             | 300           |                                    |
| 7      | failsafe_procedure          | U8   | 1     | FAILSAFE_PROCEDURE_DROP_IT  |               |               | lookup: TABLE_FAILSAFE             |

### MSP_SET_FAILSAFE_CONFIG — 76 — to FC

_Set failsafe settings_

| Offset | Field                       | Type | Bytes | Default                     | Min           | Max           | Notes                              |
| ------ | --------------------------- | ---- | ----- | --------------------------- | ------------- | ------------- | ---------------------------------- |
| 0      | failsafe_delay              | U8   | 1     | 15                          |               |               |                                    |
| 1      | failsafe_landing_time       | U8   | 1     | 60                          | 0             | 250           |                                    |
| 2      | failsafe_throttle           | U16  | 2     | 1000                        | PWM_PULSE_MIN | PWM_PULSE_MAX |                                    |
| 4      | failsafe_switch_mode        | U8   | 1     | FAILSAFE_SWITCH_MODE_STAGE1 |               |               | lookup: TABLE_FAILSAFE_SWITCH_MODE |
| 5      | failsafe_throttle_low_delay | U16  | 2     | 100                         | 0             | 300           |                                    |
| 7      | failsafe_procedure          | U8   | 1     | FAILSAFE_PROCEDURE_DROP_IT  |               |               | lookup: TABLE_FAILSAFE             |

### MSP_RXFAIL_CONFIG — 77 — from FC

_Get RX failsafe settings_

| Offset | Field   | Type | Bytes | Default              | Min | Max | Notes                       |
| ------ | ------- | ---- | ----- | -------------------- | --- | --- | --------------------------- |
| 0      | mode    | U8   | 1     | BLACKBOX_MODE_NORMAL |     |     | lookup: TABLE_BLACKBOX_MODE |
| 1      | (value) | U16  | 2     |                      |     |     |                             |

### MSP_SET_RXFAIL_CONFIG — 78 — to FC

_Set RX failsafe settings_

| Offset | Field  | Type | Bytes | Default | Min | Max | Notes              |
| ------ | ------ | ---- | ----- | ------- | --- | --- | ------------------ |
| 0      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 1      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 2      | (read) | U16  | 2     |         |     |     |                    |

### MSP_BLACKBOX_CONFIG — 80 — from FC

_Get blackbox settings_

| Offset | Field                | Type | Bytes | Default                 | Min | Max          | Notes                              |
| ------ | -------------------- | ---- | ----- | ----------------------- | --- | ------------ | ---------------------------------- |
| 0      | (value)              | U8   | 1     |                         |     |              | Blackbox supported                 |
| 1      | device               | U8   | 1     | DEFAULT_BLACKBOX_DEVICE | 0   | ADCDEV_COUNT |                                    |
| 2      | (value)              | U8   | 1     |                         |     |              | Rate numerator, not used anymore   |
| 3      | (value)              | U8   | 1     |                         |     |              |                                    |
| 4      | (value)              | U16  | 2     |                         |     |              |                                    |
| 6      | sample_rate          | U8   | 1     | BLACKBOX_RATE_QUARTER   |     |              | lookup: TABLE_BLACKBOX_SAMPLE_RATE |
| 7      | fields_disabled_mask | U32  | 4     | 0                       |     |              |                                    |
| 11     | (value)              | U8   | 1     |                         |     |              | Blackbox not supported             |
| 12     | (value)              | U8   | 1     |                         |     |              | deprecated/padding                 |
| 13     | (value)              | U8   | 1     |                         |     |              | deprecated/padding                 |
| 14     | (value)              | U8   | 1     |                         |     |              | deprecated/padding                 |
| 15     | (value)              | U16  | 2     |                         |     |              | deprecated/padding                 |
| 17     | (value)              | U8   | 1     |                         |     |              | deprecated/padding                 |
| 18     | (value)              | U32  | 4     |                         |     |              | deprecated/padding                 |

### MSP_SET_BLACKBOX_CONFIG — 81 — to FC

_Set blackbox settings_

| Offset | Field                | Type | Bytes | Default                 | Min | Max          | Notes                              |
| ------ | -------------------- | ---- | ----- | ----------------------- | --- | ------------ | ---------------------------------- |
| 0      | device               | U8   | 1     | DEFAULT_BLACKBOX_DEVICE | 0   | ADCDEV_COUNT |                                    |
| 1      | (read)               | U8   | 1     |                         |     |              | was rate_num                       |
| 2      | (read)               | U8   | 1     |                         |     |              | was rate_denom                     |
| 3      | (read)               | U16  | 2     |                         |     |              |                                    |
| 5      | sample_rate          | U8   | 1     | BLACKBOX_RATE_QUARTER   |     |              | lookup: TABLE_BLACKBOX_SAMPLE_RATE |
| 6      | fields_disabled_mask | U32  | 4     | 0                       |     |              |                                    |

### MSP_TRANSPONDER_CONFIG — 82 — from FC

_Get transponder settings_

| Offset | Field      | Type | Bytes | Default     | Min | Max | Notes                      |
| ------ | ---------- | ---- | ----- | ----------- | --- | --- | -------------------------- |
| 0      | (value)    | U8   | 1     |             |     |     |                            |
| 1      | provider   | U8   | 1     | GPS_VIRTUAL |     |     | lookup: TABLE_GPS_PROVIDER |
| 2      | dataLength | U8   | 1     |             |     |     |                            |
| 3      | (value)    | U8   | 1     |             |     |     |                            |
| 4      | (value)    | U8   | 1     |             |     |     |                            |
| 5      | (value)    | U8   | 1     |             |     |     | no providers               |

### MSP_SET_TRANSPONDER_CONFIG — 83 — to FC

_Set transponder settings_

| Offset | Field  | Type | Bytes | Default | Min | Max | Notes              |
| ------ | ------ | ---- | ----- | ------- | --- | --- | ------------------ |
| 0      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 1      | (read) | U8   | 1     |         |     |     | deprecated/ignored |

### MSP_OSD_CONFIG — 84 — from FC

_Get OSD settings_

| Offset | Field               | Type | Bytes | Default         | Min                         | Max                         | Notes                      |
| ------ | ------------------- | ---- | ----- | --------------- | --------------------------- | --------------------------- | -------------------------- |
| 0      | (value)             | U8   | 1     |                 |                             |                             |                            |
| 1      | video_system        | U8   | 1     | VIDEO_SYSTEM_HD |                             |                             | lookup: TABLE_VIDEO_SYSTEM |
| 2      | (value)             | U8   | 1     |                 |                             |                             |                            |
| 3      | units               | U8   | 1     | UNIT_METRIC     |                             |                             | lookup: TABLE_UNIT         |
| 4      | rssi_alarm          | U8   | 1     | 20              | 0                           | 100                         |                            |
| 5      | cap_alarm           | U16  | 2     | 2200            | 0                           | 20000                       |                            |
| 7      | (value)             | U8   | 1     |                 |                             |                             | deprecated/padding         |
| 8      | (value)             | U8   | 1     |                 |                             |                             |                            |
| 9      | alt_alarm           | U16  | 2     | 100             | 0                           | 10000                       |                            |
| 11     | (value)             | U16  | 2     |                 |                             |                             |                            |
| 13     | (value)             | U8   | 1     |                 |                             |                             |                            |
| 14     | (value)             | U8   | 1     |                 |                             |                             |                            |
| 15     | (value)             | U8   | 1     |                 |                             |                             |                            |
| 16     | (value)             | U16  | 2     |                 |                             |                             |                            |
| 18     | (value)             | U16  | 2     |                 |                             |                             |                            |
| 20     | (value)             | U8   | 1     |                 |                             |                             |                            |
| 21     | enabledWarnings     | U32  | 4     |                 |                             |                             |                            |
| 25     | (value)             | U8   | 1     |                 |                             |                             | available profiles         |
| 26     | osdProfileIndex     | U8   | 1     | 1               | 1                           | OSD_PROFILE_COUNT           | selected profile           |
| 27     | (value)             | U8   | 1     |                 |                             |                             |                            |
| 28     | (value)             | U8   | 1     |                 |                             |                             |                            |
| 29     | overlay_radio_mode  | U8   | 1     | 2               | 1                           | 4                           |                            |
| 30     | (value)             | U8   | 1     |                 |                             |                             | deprecated/padding         |
| 31     | camera_frame_width  | U8   | 1     | 24              | OSD_CAMERA_FRAME_MIN_WIDTH  | OSD_CAMERA_FRAME_MAX_WIDTH  |                            |
| 32     | camera_frame_height | U8   | 1     | 11              | OSD_CAMERA_FRAME_MIN_HEIGHT | OSD_CAMERA_FRAME_MAX_HEIGHT |                            |
| 33     | link_quality_alarm  | U16  | 2     | 80              | 0                           | 100                         |                            |
| 35     | rssi_dbm_alarm      | U16  | 2     | -60             | CRSF_RSSI_MIN               | CRSF_RSSI_MAX               |                            |

### MSP_SET_OSD_CONFIG — 85 — to FC

_Set OSD settings_

| Offset | Field               | Type | Bytes | Default     | Min                         | Max                         | Notes                              |
| ------ | ------------------- | ---- | ----- | ----------- | --------------------------- | --------------------------- | ---------------------------------- |
| 0      | (read)              | U8   | 1     |             |                             |                             | deprecated/ignored                 |
| 1      | (read)              | U8   | 1     |             |                             |                             | deprecated/ignored                 |
| 2      | units               | U8   | 1     | UNIT_METRIC |                             |                             | lookup: TABLE_UNIT                 |
| 3      | rssi_alarm          | U8   | 1     | 20          | 0                           | 100                         |                                    |
| 4      | cap_alarm           | U16  | 2     | 2200        | 0                           | 20000                       |                                    |
| 6      | (read)              | U16  | 2     |             |                             |                             | Skip unused (previously fly timer) |
| 8      | alt_alarm           | U16  | 2     | 100         | 0                           | 10000                       |                                    |
| 10     | enabledWarnings     | U16  | 2     |             |                             |                             |                                    |
| 12     | enabledWarnings     | U32  | 4     |             |                             |                             |                                    |
| 16     | (read)              | U8   | 1     |             |                             |                             | deprecated/ignored                 |
| 17     | (read)              | U8   | 1     |             |                             |                             | deprecated/ignored                 |
| 18     | overlay_radio_mode  | U8   | 1     | 2           | 1                           | 4                           |                                    |
| 19     | (read)              | U8   | 1     |             |                             |                             | deprecated/ignored                 |
| 20     | camera_frame_width  | U8   | 1     | 24          | OSD_CAMERA_FRAME_MIN_WIDTH  | OSD_CAMERA_FRAME_MAX_WIDTH  |                                    |
| 21     | camera_frame_height | U8   | 1     | 11          | OSD_CAMERA_FRAME_MIN_HEIGHT | OSD_CAMERA_FRAME_MAX_HEIGHT |                                    |
| 22     | link_quality_alarm  | U16  | 2     | 80          | 0                           | 100                         |                                    |
| 24     | rssi_dbm_alarm      | U16  | 2     | -60         | CRSF_RSSI_MIN               | CRSF_RSSI_MAX               |                                    |
| 26     | (read)              | U8   | 1     |             |                             |                             | deprecated/ignored                 |
| 27     | (read)              | U16  | 2     |             |                             |                             |                                    |
| 29     | (read)              | U16  | 2     |             |                             |                             |                                    |
| 31     | (read)              | U8   | 1     |             |                             |                             | deprecated/ignored                 |

### MSP_OSD_CHAR_WRITE — 87 — to FC

_Set OSD characters_

| Offset | Field  | Type | Bytes | Default | Min | Max | Notes              |
| ------ | ------ | ---- | ----- | ------- | --- | --- | ------------------ |
| 0      | (read) | U16  | 2     |         |     |     |                    |
| 2      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 3      | (read) | U16  | 2     |         |     |     |                    |
| 5      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 6      | (read) | U8   | 1     |         |     |     | deprecated/ignored |

### MSP_VTX_CONFIG — 88 — from FC

_Get VTX settings_

| Offset | Field          | Type | Bytes | Default                  | Min | Max                            | Notes                              |
| ------ | -------------- | ---- | ----- | ------------------------ | --- | ------------------------------ | ---------------------------------- |
| 0      | (value)        | U8   | 1     |                          |     |                                |                                    |
| 1      | band           | U8   | 1     | 0                        | 0   | VTX_TABLE_MAX_BANDS            |                                    |
| 2      | channel        | U8   | 1     | 0                        | 0   | VTX_TABLE_MAX_CHANNELS         |                                    |
| 3      | power          | U8   | 1     | 0                        |     |                                |                                    |
| 4      | (value)        | U8   | 1     |                          |     |                                |                                    |
| 5      | freq           | U16  | 2     | 0                        | 0   | VTX_SETTINGS_MAX_FREQUENCY_MHZ |                                    |
| 7      | (value)        | U8   | 1     |                          |     |                                |                                    |
| 8      | lowPowerDisarm | U8   | 1     | VTX_LOW_POWER_DISARM_OFF |     |                                | lookup: TABLE_VTX_LOW_POWER_DISARM |
| 9      | pitModeFreq    | U16  | 2     | 0                        | 0   | VTX_SETTINGS_MAX_FREQUENCY_MHZ |                                    |
| 11     | (value)        | U8   | 1     |                          |     |                                | vtxtable is available              |
| 12     | bands          | U8   | 1     | 0                        |     |                                |                                    |
| 13     | channels       | U8   | 1     | 0                        |     |                                |                                    |
| 14     | powerLevels    | U8   | 1     | 0                        |     |                                |                                    |
| 15     | (value)        | U8   | 1     |                          |     |                                | deprecated/padding                 |
| 16     | (value)        | U8   | 1     |                          |     |                                | deprecated/padding                 |
| 17     | (value)        | U8   | 1     |                          |     |                                | deprecated/padding                 |
| 18     | (value)        | U8   | 1     |                          |     |                                | deprecated/padding                 |

### MSP_SET_VTX_CONFIG — 89 — to FC

_Set VTX settings_

| Offset | Field          | Type | Bytes | Default                  | Min | Max                            | Notes                              |
| ------ | -------------- | ---- | ----- | ------------------------ | --- | ------------------------------ | ---------------------------------- |
| 0      | (read)         | U16  | 2     |                          |     |                                |                                    |
| 2      | power          | U8   | 1     | 0                        |     |                                |                                    |
| 3      | (read)         | U8   | 1     |                          |     |                                | deprecated/ignored                 |
| 4      | lowPowerDisarm | U8   | 1     | VTX_LOW_POWER_DISARM_OFF |     |                                | lookup: TABLE_VTX_LOW_POWER_DISARM |
| 5      | pitModeFreq    | U16  | 2     | 0                        | 0   | VTX_SETTINGS_MAX_FREQUENCY_MHZ |                                    |
| 7      | (read)         | U8   | 1     |                          |     |                                | deprecated/ignored                 |
| 8      | (read)         | U8   | 1     |                          |     |                                | deprecated/ignored                 |
| 9      | (read)         | U16  | 2     |                          |     |                                |                                    |
| 11     | (read)         | U8   | 1     |                          |     |                                | deprecated/ignored                 |
| 12     | (read)         | U8   | 1     |                          |     |                                | deprecated/ignored                 |
| 13     | (read)         | U8   | 1     |                          |     |                                | deprecated/ignored                 |
| 14     | (read)         | U8   | 1     |                          |     |                                | deprecated/ignored                 |
| 15     | (read)         | U8   | 1     |                          |     |                                | deprecated/ignored                 |
| 16     | (read)         | U8   | 1     |                          |     |                                | deprecated/ignored                 |
| 17     | (read)         | U8   | 1     |                          |     |                                | deprecated/ignored                 |
| 18     | (read)         | U8   | 1     |                          |     |                                | deprecated/ignored                 |

### MSP_ADVANCED_CONFIG — 90 — from FC

_Get advanced configuration_

| Offset | Field                            | Type | Bytes | Default                      | Min   | Max                   | Notes                                                   |
| ------ | -------------------------------- | ---- | ----- | ---------------------------- | ----- | --------------------- | ------------------------------------------------------- |
| 0      | (value)                          | U8   | 1     |                              |       |                       | was gyroConfig()->gyro_sync_denom - removed in API 1.43 |
| 1      | pid_process_denom                | U8   | 1     | DEFAULT_PID_PROCESS_DENOM    | 1     | MAX_PID_PROCESS_DENOM |                                                         |
| 2      | useContinuousUpdate              | U8   | 1     |                              |       |                       |                                                         |
| 3      | motorProtocol                    | U8   | 1     |                              |       |                       |                                                         |
| 4      | motorPwmRate                     | U16  | 2     |                              |       |                       |                                                         |
| 6      | motorIdle                        | U16  | 2     | 700                          | 0     | 2000                  |                                                         |
| 8      | (value)                          | U8   | 1     |                              |       |                       | DEPRECATED: gyro_use_32kHz                              |
| 9      | motorInversion                   | U8   | 1     |                              |       |                       |                                                         |
| 10     | (value)                          | U8   | 1     |                              |       |                       | deprecated gyro_to_use                                  |
| 11     | gyro_high_fsr                    | U8   | 1     | 0                            |       |                       | lookup: TABLE_OFF_ON                                    |
| 12     | gyroMovementCalibrationThreshold | U8   | 1     | 48                           | 0     | 200                   |                                                         |
| 13     | gyroCalibrationDuration          | U16  | 2     | 125                          | 50    | 3000                  |                                                         |
| 15     | gyro_offset_yaw                  | U16  | 2     | 0                            | -1000 | 1000                  |                                                         |
| 17     | checkOverflow                    | U8   | 1     | GYRO_OVERFLOW_CHECK_ALL_AXES |       |                       | lookup: TABLE_GYRO_OVERFLOW_CHECK                       |
| 18     | debug_mode                       | U8   | 1     | DEBUG_MODE                   |       |                       | lookup: TABLE_DEBUG                                     |
| 19     | (value)                          | U8   | 1     |                              |       |                       |                                                         |

### MSP_SET_ADVANCED_CONFIG — 91 — to FC

_Set advanced configuration_

| Offset | Field                            | Type | Bytes | Default                      | Min   | Max                   | Notes                                                          |
| ------ | -------------------------------- | ---- | ----- | ---------------------------- | ----- | --------------------- | -------------------------------------------------------------- |
| 0      | (read)                           | U8   | 1     |                              |       |                       | was gyroConfigMutable()->gyro_sync_denom - removed in API 1.43 |
| 1      | pid_process_denom                | U8   | 1     | DEFAULT_PID_PROCESS_DENOM    | 1     | MAX_PID_PROCESS_DENOM |                                                                |
| 2      | (read)                           | U8   | 1     |                              |       |                       | deprecated/ignored                                             |
| 3      | (read)                           | U8   | 1     |                              |       |                       | deprecated/ignored                                             |
| 4      | (read)                           | U16  | 2     |                              |       |                       |                                                                |
| 6      | motorIdle                        | U16  | 2     | 700                          | 0     | 2000                  |                                                                |
| 8      | (read)                           | U8   | 1     |                              |       |                       | DEPRECATED: gyro_use_32khz                                     |
| 9      | (read)                           | U8   | 1     |                              |       |                       | deprecated/ignored                                             |
| 10     | (read)                           | U8   | 1     |                              |       |                       | deprecated gyro_to_use                                         |
| 11     | gyro_high_fsr                    | U8   | 1     | 0                            |       |                       | lookup: TABLE_OFF_ON                                           |
| 12     | gyroMovementCalibrationThreshold | U8   | 1     | 48                           | 0     | 200                   |                                                                |
| 13     | gyroCalibrationDuration          | U16  | 2     | 125                          | 50    | 3000                  |                                                                |
| 15     | gyro_offset_yaw                  | U16  | 2     | 0                            | -1000 | 1000                  |                                                                |
| 17     | checkOverflow                    | U8   | 1     | GYRO_OVERFLOW_CHECK_ALL_AXES |       |                       | lookup: TABLE_GYRO_OVERFLOW_CHECK                              |
| 18     | debug_mode                       | U8   | 1     | DEBUG_MODE                   |       |                       | lookup: TABLE_DEBUG                                            |

### MSP_FILTER_CONFIG — 92 — from FC

_Get filter configuration_

| Offset | Field                    | Type | Bytes | Default                  | Min | Max                 | Notes                                    |
| ------ | ------------------------ | ---- | ----- | ------------------------ | --- | ------------------- | ---------------------------------------- |
| 0      | gyro_lpf1_static_hz      | U8   | 1     | 250                      | 0   | LPF_MAX_HZ          |                                          |
| 1      | dterm_lpf1_static_hz     | U16  | 2     |                          | 0   | LPF_MAX_HZ          |                                          |
| 3      | yaw_lowpass_hz           | U16  | 2     |                          | 0   | 500                 |                                          |
| 5      | gyro_soft_notch_hz_1     | U16  | 2     | 0                        | 0   | LPF_MAX_HZ          |                                          |
| 7      | gyro_soft_notch_cutoff_1 | U16  | 2     | 0                        | 0   | LPF_MAX_HZ          |                                          |
| 9      | dterm_notch_hz           | U16  | 2     |                          | 0   | LPF_MAX_HZ          |                                          |
| 11     | dterm_notch_cutoff       | U16  | 2     |                          | 0   | LPF_MAX_HZ          |                                          |
| 13     | gyro_soft_notch_hz_2     | U16  | 2     | 0                        | 0   | LPF_MAX_HZ          |                                          |
| 15     | gyro_soft_notch_cutoff_2 | U16  | 2     | 0                        | 0   | LPF_MAX_HZ          |                                          |
| 17     | dterm_lpf1_type          | U8   | 1     |                          |     |                     | lookup: TABLE_DTERM_LPF_TYPE             |
| 18     | gyro_hardware_lpf        | U8   | 1     | GYRO_HARDWARE_LPF_NORMAL |     |                     | lookup: TABLE_GYRO_HARDWARE_LPF          |
| 19     | (value)                  | U8   | 1     |                          |     |                     | DEPRECATED: gyro_32khz_hardware_lpf      |
| 20     | gyro_lpf1_static_hz      | U16  | 2     | 250                      | 0   | LPF_MAX_HZ          |                                          |
| 22     | gyro_lpf2_static_hz      | U16  | 2     | 500                      | 0   | LPF_MAX_HZ          |                                          |
| 24     | gyro_lpf1_type           | U8   | 1     | FILTER_PT1               |     |                     | lookup: TABLE_GYRO_LPF_TYPE              |
| 25     | gyro_lpf2_type           | U8   | 1     | FILTER_PT1               |     |                     | lookup: TABLE_GYRO_LPF_TYPE              |
| 26     | dterm_lpf2_static_hz     | U16  | 2     |                          | 0   | LPF_MAX_HZ          |                                          |
| 28     | dterm_lpf2_type          | U8   | 1     |                          |     |                     | lookup: TABLE_DTERM_LPF_TYPE             |
| 29     | gyro_lpf1_dyn_min_hz     | U16  | 2     | 250                      | 0   | DYN_LPF_MAX_HZ      |                                          |
| 31     | gyro_lpf1_dyn_max_hz     | U16  | 2     | 500                      | 0   | DYN_LPF_MAX_HZ      |                                          |
| 33     | dterm_lpf1_dyn_min_hz    | U16  | 2     |                          | 0   | DYN_LPF_MAX_HZ      |                                          |
| 35     | dterm_lpf1_dyn_max_hz    | U16  | 2     |                          | 0   | DYN_LPF_MAX_HZ      |                                          |
| 37     | (value)                  | U16  | 2     |                          |     |                     | deprecated/padding                       |
| 39     | (value)                  | U16  | 2     |                          |     |                     | deprecated/padding                       |
| 41     | (value)                  | U16  | 2     |                          |     |                     | deprecated/padding                       |
| 43     | (value)                  | U16  | 2     |                          |     |                     | deprecated/padding                       |
| 45     | (value)                  | U8   | 1     |                          |     |                     | DEPRECATED 1.43: dyn_notch_range         |
| 46     | (value)                  | U8   | 1     |                          |     |                     | DEPRECATED 1.44: dyn_notch_width_percent |
| 47     | dyn_notch_q              | U16  | 2     | 300                      | 1   | 1000                |                                          |
| 49     | dyn_notch_min_hz         | U16  | 2     | 100                      | 20  | 250                 |                                          |
| 51     | (value)                  | U8   | 1     |                          |     |                     | deprecated/padding                       |
| 52     | (value)                  | U8   | 1     |                          |     |                     | deprecated/padding                       |
| 53     | (value)                  | U16  | 2     |                          |     |                     | deprecated/padding                       |
| 55     | (value)                  | U16  | 2     |                          |     |                     | deprecated/padding                       |
| 57     | rpm_filter_harmonics     | U8   | 1     | 3                        | 0   | 3                   |                                          |
| 58     | rpm_filter_min_hz        | U8   | 1     | 100                      | 30  | 200                 |                                          |
| 59     | (value)                  | U8   | 1     |                          |     |                     | deprecated/padding                       |
| 60     | (value)                  | U8   | 1     |                          |     |                     | deprecated/padding                       |
| 61     | dyn_notch_max_hz         | U16  | 2     | 600                      | 200 | 1000                |                                          |
| 63     | (value)                  | U16  | 2     |                          |     |                     | deprecated/padding                       |
| 65     | dterm_lpf1_dyn_expo      | U8   | 1     |                          | 0   | 10                  |                                          |
| 66     | (value)                  | U8   | 1     |                          |     |                     | deprecated/padding                       |
| 67     | dyn_notch_count          | U8   | 1     | 3                        | 0   | DYN_NOTCH_COUNT_MAX |                                          |
| 68     | (value)                  | U8   | 1     |                          |     |                     | deprecated/padding                       |
| 69     | rpm_filter_fade_range_hz | U16  | 2     | 50                       | 0   | 1000                |                                          |
| 71     | rpm_filter_q             | U16  | 2     | 500                      | 250 | 3000                |                                          |
| 73     | (value)                  | U8   | 1     |                          |     |                     |                                          |
| 74     | (value)                  | U16  | 2     |                          |     |                     | deprecated/padding                       |
| 76     | (value)                  | U16  | 2     |                          |     |                     | deprecated/padding                       |
| 78     | (value)                  | U8   | 1     |                          |     |                     | deprecated/padding                       |

### MSP_SET_FILTER_CONFIG — 93 — to FC

_Set filter configuration_

| Offset | Field                    | Type | Bytes | Default                  | Min | Max            | Notes                                    |
| ------ | ------------------------ | ---- | ----- | ------------------------ | --- | -------------- | ---------------------------------------- |
| 0      | gyro_lpf1_static_hz      | U8   | 1     | 250                      | 0   | LPF_MAX_HZ     |                                          |
| 1      | dterm_lpf1_static_hz     | U16  | 2     |                          | 0   | LPF_MAX_HZ     |                                          |
| 3      | yaw_lowpass_hz           | U16  | 2     |                          | 0   | 500            |                                          |
| 5      | gyro_soft_notch_hz_1     | U16  | 2     | 0                        | 0   | LPF_MAX_HZ     |                                          |
| 7      | gyro_soft_notch_cutoff_1 | U16  | 2     | 0                        | 0   | LPF_MAX_HZ     |                                          |
| 9      | dterm_notch_hz           | U16  | 2     |                          | 0   | LPF_MAX_HZ     |                                          |
| 11     | dterm_notch_cutoff       | U16  | 2     |                          | 0   | LPF_MAX_HZ     |                                          |
| 13     | gyro_soft_notch_hz_2     | U16  | 2     | 0                        | 0   | LPF_MAX_HZ     |                                          |
| 15     | gyro_soft_notch_cutoff_2 | U16  | 2     | 0                        | 0   | LPF_MAX_HZ     |                                          |
| 17     | dterm_lpf1_type          | U8   | 1     |                          |     |                | lookup: TABLE_DTERM_LPF_TYPE             |
| 18     | gyro_hardware_lpf        | U8   | 1     | GYRO_HARDWARE_LPF_NORMAL |     |                | lookup: TABLE_GYRO_HARDWARE_LPF          |
| 19     | (read)                   | U8   | 1     |                          |     |                | DEPRECATED: gyro_32khz_hardware_lpf      |
| 20     | gyro_lpf1_static_hz      | U16  | 2     | 250                      | 0   | LPF_MAX_HZ     |                                          |
| 22     | gyro_lpf2_static_hz      | U16  | 2     | 500                      | 0   | LPF_MAX_HZ     |                                          |
| 24     | gyro_lpf1_type           | U8   | 1     | FILTER_PT1               |     |                | lookup: TABLE_GYRO_LPF_TYPE              |
| 25     | gyro_lpf2_type           | U8   | 1     | FILTER_PT1               |     |                | lookup: TABLE_GYRO_LPF_TYPE              |
| 26     | dterm_lpf2_static_hz     | U16  | 2     |                          | 0   | LPF_MAX_HZ     |                                          |
| 28     | dterm_lpf2_type          | U8   | 1     |                          |     |                | lookup: TABLE_DTERM_LPF_TYPE             |
| 29     | gyro_lpf1_dyn_min_hz     | U16  | 2     | 250                      | 0   | DYN_LPF_MAX_HZ |                                          |
| 31     | gyro_lpf1_dyn_max_hz     | U16  | 2     | 500                      | 0   | DYN_LPF_MAX_HZ |                                          |
| 33     | dterm_lpf1_dyn_min_hz    | U16  | 2     |                          | 0   | DYN_LPF_MAX_HZ |                                          |
| 35     | dterm_lpf1_dyn_max_hz    | U16  | 2     |                          | 0   | DYN_LPF_MAX_HZ |                                          |
| 37     | (read)                   | U16  | 2     |                          |     |                |                                          |
| 39     | (read)                   | U16  | 2     |                          |     |                |                                          |
| 41     | (read)                   | U16  | 2     |                          |     |                |                                          |
| 43     | (read)                   | U16  | 2     |                          |     |                |                                          |
| 45     | (read)                   | U8   | 1     |                          |     |                | DEPRECATED 1.43: dyn_notch_range         |
| 46     | (read)                   | U8   | 1     |                          |     |                | DEPRECATED 1.44: dyn_notch_width_percent |
| 47     | dyn_notch_q              | U16  | 2     | 300                      | 1   | 1000           |                                          |
| 49     | dyn_notch_min_hz         | U16  | 2     | 100                      | 20  | 250            |                                          |
| 51     | (read)                   | U8   | 1     |                          |     |                | deprecated/ignored                       |
| 52     | (read)                   | U8   | 1     |                          |     |                | deprecated/ignored                       |
| 53     | (read)                   | U16  | 2     |                          |     |                |                                          |
| 55     | (read)                   | U16  | 2     |                          |     |                |                                          |
| 57     | rpm_filter_harmonics     | U8   | 1     | 3                        | 0   | 3              |                                          |
| 58     | rpm_filter_min_hz        | U8   | 1     | 100                      | 30  | 200            |                                          |
| 59     | (read)                   | U8   | 1     |                          |     |                | deprecated/ignored                       |
| 60     | (read)                   | U8   | 1     |                          |     |                | deprecated/ignored                       |
| 61     | dyn_notch_max_hz         | U16  | 2     | 600                      | 200 | 1000           |                                          |
| 63     | (read)                   | U16  | 2     |                          |     |                |                                          |
| 65     | dterm_lpf1_dyn_expo      | U8   | 1     |                          | 0   | 10             |                                          |
| 66     | (read)                   | U8   | 1     |                          |     |                | deprecated/ignored                       |
| 67     | (read)                   | U8   | 1     |                          |     |                | deprecated/ignored                       |
| 68     | (read)                   | U8   | 1     |                          |     |                | deprecated/ignored                       |
| 69     | (read)                   | U16  | 2     |                          |     |                |                                          |
| 71     | (read)                   | U16  | 2     |                          |     |                |                                          |
| 73     | (read)                   | U8   | 1     |                          |     |                | deprecated/ignored                       |
| 74     | (read)                   | U16  | 2     |                          |     |                |                                          |
| 76     | (read)                   | U16  | 2     |                          |     |                |                                          |
| 78     | (read)                   | U8   | 1     |                          |     |                | deprecated/ignored                       |

### MSP_PID_ADVANCED — 94 — from FC

_Get advanced PID settings_

| Offset | Field                      | Type | Bytes | Default | Min                            | Max                            | Notes                                                  |
| ------ | -------------------------- | ---- | ----- | ------- | ------------------------------ | ------------------------------ | ------------------------------------------------------ |
| 0      | (value)                    | U16  | 2     |         |                                |                                | deprecated/padding                                     |
| 2      | (value)                    | U16  | 2     |         |                                |                                | deprecated/padding                                     |
| 4      | (value)                    | U16  | 2     |         |                                |                                | was pidProfile.yaw_p_limit                             |
| 6      | (value)                    | U8   | 1     |         |                                |                                | reserved                                               |
| 7      | (value)                    | U8   | 1     |         |                                |                                | was vbatPidCompensation                                |
| 8      | feedforward_transition     | U8   | 1     |         | 0                              | 100                            |                                                        |
| 9      | (value)                    | U8   | 1     |         |                                |                                | deprecated/padding                                     |
| 10     | (value)                    | U8   | 1     |         |                                |                                | was low byte of currentPidProfile->dtermSetpointWeight |
| 11     | (value)                    | U8   | 1     |         |                                |                                | reserved                                               |
| 12     | (value)                    | U8   | 1     |         |                                |                                | reserved                                               |
| 13     | (value)                    | U8   | 1     |         |                                |                                | reserved                                               |
| 14     | rateAccelLimit             | U16  | 2     |         | 0                              | 500                            |                                                        |
| 16     | yawRateAccelLimit          | U16  | 2     |         | 0                              | 500                            |                                                        |
| 18     | angle_limit                | U8   | 1     |         | 10                             | 80                             |                                                        |
| 19     | (value)                    | U8   | 1     |         |                                |                                | was pidProfile.levelSensitivity                        |
| 20     | (value)                    | U16  | 2     |         |                                |                                | was currentPidProfile->itermThrottleThreshold          |
| 22     | anti_gravity_gain          | U16  | 2     |         | ITERM_ACCELERATOR_GAIN_OFF     | ITERM_ACCELERATOR_GAIN_MAX     |                                                        |
| 24     | (value)                    | U16  | 2     |         |                                |                                | was currentPidProfile->dtermSetpointWeight             |
| 26     | iterm_rotation             | U8   | 1     |         |                                |                                | lookup: TABLE_OFF_ON                                   |
| 27     | (value)                    | U8   | 1     |         |                                |                                | was currentPidProfile->smart_feedforward               |
| 28     | iterm_relax                | U8   | 1     |         |                                |                                | lookup: TABLE_ITERM_RELAX                              |
| 29     | iterm_relax_type           | U8   | 1     |         |                                |                                | lookup: TABLE_ITERM_RELAX_TYPE                         |
| 30     | (value)                    | U8   | 1     |         |                                |                                | deprecated/padding                                     |
| 31     | (value)                    | U8   | 1     |         |                                |                                | deprecated/padding                                     |
| 32     | (value)                    | U8   | 1     |         |                                |                                | was abs_control_gain                                   |
| 33     | throttle_boost             | U8   | 1     |         | 0                              | 100                            |                                                        |
| 34     | (value)                    | U8   | 1     |         |                                |                                | deprecated/padding                                     |
| 35     | acro_trainer_angle_limit   | U8   | 1     |         | 10                             | 80                             |                                                        |
| 36     | (value)                    | U8   | 1     |         |                                |                                | deprecated/padding                                     |
| 37     | F                          | U16  | 2     |         |                                |                                |                                                        |
| 39     | F                          | U16  | 2     |         |                                |                                |                                                        |
| 41     | F                          | U16  | 2     |         |                                |                                |                                                        |
| 43     | (value)                    | U8   | 1     |         |                                |                                | was currentPidProfile->antiGravityMode                 |
| 44     | (value)                    | U8   | 1     |         |                                |                                |                                                        |
| 45     | (value)                    | U8   | 1     |         |                                |                                |                                                        |
| 46     | (value)                    | U8   | 1     |         |                                |                                |                                                        |
| 47     | d_max_gain                 | U8   | 1     |         | 0                              | 100                            |                                                        |
| 48     | d_max_advance              | U8   | 1     |         | 0                              | 200                            |                                                        |
| 49     | (value)                    | U8   | 1     |         |                                |                                | deprecated/padding                                     |
| 50     | (value)                    | U8   | 1     |         |                                |                                | deprecated/padding                                     |
| 51     | (value)                    | U8   | 1     |         |                                |                                | deprecated/padding                                     |
| 52     | (value)                    | U8   | 1     |         |                                |                                | deprecated/padding                                     |
| 53     | (value)                    | U8   | 1     |         |                                |                                | deprecated/padding                                     |
| 54     | use_integrated_yaw         | U8   | 1     |         |                                |                                | lookup: TABLE_OFF_ON                                   |
| 55     | integrated_yaw_relax       | U8   | 1     |         | 0                              | 255                            |                                                        |
| 56     | (value)                    | U8   | 1     |         |                                |                                | deprecated/padding                                     |
| 57     | (value)                    | U8   | 1     |         |                                |                                | deprecated/padding                                     |
| 58     | iterm_relax_cutoff         | U8   | 1     |         | 1                              | 50                             |                                                        |
| 59     | (value)                    | U8   | 1     |         |                                |                                | deprecated/padding                                     |
| 60     | motor_output_limit         | U8   | 1     |         | MOTOR_OUTPUT_LIMIT_PERCENT_MIN | MOTOR_OUTPUT_LIMIT_PERCENT_MAX |                                                        |
| 61     | auto_profile_cell_count    | U8   | 1     |         | AUTO_PROFILE_CELL_COUNT_CHANGE | MAX_AUTO_DETECT_CELL_COUNT     |                                                        |
| 62     | dyn_idle_min_rpm           | U8   | 1     |         | 0                              | 200                            |                                                        |
| 63     | (value)                    | U8   | 1     |         |                                |                                | deprecated/padding                                     |
| 64     | feedforward_averaging      | U8   | 1     |         |                                |                                | lookup: TABLE_FEEDFORWARD_AVERAGING                    |
| 65     | feedforward_smooth_factor  | U8   | 1     |         | 0                              | 95                             |                                                        |
| 66     | feedforward_boost          | U8   | 1     |         | 0                              | 50                             |                                                        |
| 67     | feedforward_max_rate_limit | U8   | 1     |         | 0                              | 200                            |                                                        |
| 68     | feedforward_jitter_factor  | U8   | 1     |         | 0                              | 20                             |                                                        |
| 69     | (value)                    | U8   | 1     |         |                                |                                | deprecated/padding                                     |
| 70     | (value)                    | U8   | 1     |         |                                |                                | deprecated/padding                                     |
| 71     | (value)                    | U8   | 1     |         |                                |                                | deprecated/padding                                     |
| 72     | (value)                    | U8   | 1     |         |                                |                                | deprecated/padding                                     |
| 73     | (value)                    | U8   | 1     |         |                                |                                | deprecated/padding                                     |
| 74     | vbat_sag_compensation      | U8   | 1     |         | 0                              | 150                            |                                                        |
| 75     | (value)                    | U8   | 1     |         |                                |                                | deprecated/padding                                     |
| 76     | thrustLinearization        | U8   | 1     |         | 0                              | 150                            |                                                        |
| 77     | (value)                    | U8   | 1     |         |                                |                                | deprecated/padding                                     |
| 78     | tpa_mode                   | U8   | 1     |         |                                |                                | lookup: TABLE_TPA_MODE                                 |
| 79     | tpa_rate                   | U8   | 1     |         | 0                              | TPA_MAX                        |                                                        |
| 80     | tpa_breakpoint             | U16  | 2     |         | PWM_RANGE_MIN                  | PWM_RANGE_MAX                  | was currentControlRateProfile->tpa_breakpoint          |

### MSP_SET_PID_ADVANCED — 95 — to FC

_Set advanced PID settings_

| Offset | Field                      | Type | Bytes | Default | Min                            | Max                            | Notes                                                  |
| ------ | -------------------------- | ---- | ----- | ------- | ------------------------------ | ------------------------------ | ------------------------------------------------------ |
| 0      | (read)                     | U16  | 2     |         |                                |                                |                                                        |
| 2      | (read)                     | U16  | 2     |         |                                |                                |                                                        |
| 4      | (read)                     | U16  | 2     |         |                                |                                | was pidProfile.yaw_p_limit                             |
| 6      | (read)                     | U8   | 1     |         |                                |                                | reserved                                               |
| 7      | (read)                     | U8   | 1     |         |                                |                                | was vbatPidCompensation                                |
| 8      | feedforward_transition     | U8   | 1     |         | 0                              | 100                            |                                                        |
| 9      | (read)                     | U8   | 1     |         |                                |                                | deprecated/ignored                                     |
| 10     | (read)                     | U8   | 1     |         |                                |                                | was low byte of currentPidProfile->dtermSetpointWeight |
| 11     | (read)                     | U8   | 1     |         |                                |                                | reserved                                               |
| 12     | (read)                     | U8   | 1     |         |                                |                                | reserved                                               |
| 13     | (read)                     | U8   | 1     |         |                                |                                | reserved                                               |
| 14     | rateAccelLimit             | U16  | 2     |         | 0                              | 500                            |                                                        |
| 16     | yawRateAccelLimit          | U16  | 2     |         | 0                              | 500                            |                                                        |
| 18     | angle_limit                | U8   | 1     |         | 10                             | 80                             |                                                        |
| 19     | (read)                     | U8   | 1     |         |                                |                                | was pidProfile.levelSensitivity                        |
| 20     | (read)                     | U16  | 2     |         |                                |                                | was currentPidProfile->itermThrottleThreshold          |
| 22     | anti_gravity_gain          | U16  | 2     |         | ITERM_ACCELERATOR_GAIN_OFF     | ITERM_ACCELERATOR_GAIN_MAX     |                                                        |
| 24     | (read)                     | U16  | 2     |         |                                |                                | was currentPidProfile->dtermSetpointWeight             |
| 26     | iterm_rotation             | U8   | 1     |         |                                |                                | lookup: TABLE_OFF_ON                                   |
| 27     | (read)                     | U8   | 1     |         |                                |                                | was currentPidProfile->smart_feedforward               |
| 28     | iterm_relax                | U8   | 1     |         |                                |                                | lookup: TABLE_ITERM_RELAX                              |
| 29     | iterm_relax_type           | U8   | 1     |         |                                |                                | lookup: TABLE_ITERM_RELAX_TYPE                         |
| 30     | (read)                     | U8   | 1     |         |                                |                                | deprecated/ignored                                     |
| 31     | (read)                     | U8   | 1     |         |                                |                                | deprecated/ignored                                     |
| 32     | (read)                     | U8   | 1     |         |                                |                                | was abs_control_gain                                   |
| 33     | throttle_boost             | U8   | 1     |         | 0                              | 100                            |                                                        |
| 34     | (read)                     | U8   | 1     |         |                                |                                | deprecated/ignored                                     |
| 35     | acro_trainer_angle_limit   | U8   | 1     |         | 10                             | 80                             |                                                        |
| 36     | (read)                     | U8   | 1     |         |                                |                                | deprecated/ignored                                     |
| 37     | (read)                     | U16  | 2     |         |                                |                                |                                                        |
| 39     | (read)                     | U16  | 2     |         |                                |                                |                                                        |
| 41     | (read)                     | U16  | 2     |         |                                |                                |                                                        |
| 43     | (read)                     | U8   | 1     |         |                                |                                | was currentPidProfile->antiGravityMode                 |
| 44     | (read)                     | U8   | 1     |         |                                |                                | deprecated/ignored                                     |
| 45     | (read)                     | U8   | 1     |         |                                |                                | deprecated/ignored                                     |
| 46     | (read)                     | U8   | 1     |         |                                |                                | deprecated/ignored                                     |
| 47     | d_max_gain                 | U8   | 1     |         | 0                              | 100                            |                                                        |
| 48     | d_max_advance              | U8   | 1     |         | 0                              | 200                            |                                                        |
| 49     | (read)                     | U8   | 1     |         |                                |                                | deprecated/ignored                                     |
| 50     | (read)                     | U8   | 1     |         |                                |                                | deprecated/ignored                                     |
| 51     | (read)                     | U8   | 1     |         |                                |                                | deprecated/ignored                                     |
| 52     | (read)                     | U8   | 1     |         |                                |                                | deprecated/ignored                                     |
| 53     | (read)                     | U8   | 1     |         |                                |                                | deprecated/ignored                                     |
| 54     | use_integrated_yaw         | U8   | 1     |         |                                |                                | lookup: TABLE_OFF_ON                                   |
| 55     | integrated_yaw_relax       | U8   | 1     |         | 0                              | 255                            |                                                        |
| 56     | (read)                     | U8   | 1     |         |                                |                                | deprecated/ignored                                     |
| 57     | (read)                     | U8   | 1     |         |                                |                                | deprecated/ignored                                     |
| 58     | iterm_relax_cutoff         | U8   | 1     |         | 1                              | 50                             |                                                        |
| 59     | (read)                     | U8   | 1     |         |                                |                                | deprecated/ignored                                     |
| 60     | motor_output_limit         | U8   | 1     |         | MOTOR_OUTPUT_LIMIT_PERCENT_MIN | MOTOR_OUTPUT_LIMIT_PERCENT_MAX |                                                        |
| 61     | auto_profile_cell_count    | U8   | 1     |         | AUTO_PROFILE_CELL_COUNT_CHANGE | MAX_AUTO_DETECT_CELL_COUNT     |                                                        |
| 62     | dyn_idle_min_rpm           | U8   | 1     |         | 0                              | 200                            |                                                        |
| 63     | (read)                     | U8   | 1     |         |                                |                                | deprecated/ignored                                     |
| 64     | (read)                     | U8   | 1     |         |                                |                                | deprecated/ignored                                     |
| 65     | feedforward_smooth_factor  | U8   | 1     |         | 0                              | 95                             |                                                        |
| 66     | feedforward_boost          | U8   | 1     |         | 0                              | 50                             |                                                        |
| 67     | feedforward_max_rate_limit | U8   | 1     |         | 0                              | 200                            |                                                        |
| 68     | feedforward_jitter_factor  | U8   | 1     |         | 0                              | 20                             |                                                        |
| 69     | (read)                     | U8   | 1     |         |                                |                                | deprecated/ignored                                     |
| 70     | (read)                     | U8   | 1     |         |                                |                                | deprecated/ignored                                     |
| 71     | (read)                     | U8   | 1     |         |                                |                                | deprecated/ignored                                     |
| 72     | (read)                     | U8   | 1     |         |                                |                                | deprecated/ignored                                     |
| 73     | (read)                     | U8   | 1     |         |                                |                                | deprecated/ignored                                     |
| 74     | vbat_sag_compensation      | U8   | 1     |         | 0                              | 150                            |                                                        |
| 75     | (read)                     | U8   | 1     |         |                                |                                | deprecated/ignored                                     |
| 76     | thrustLinearization        | U8   | 1     |         | 0                              | 150                            |                                                        |
| 77     | (read)                     | U8   | 1     |         |                                |                                | deprecated/ignored                                     |
| 78     | tpa_mode                   | U8   | 1     |         |                                |                                | lookup: TABLE_TPA_MODE                                 |
| 79     | (read)                     | U8   | 1     |         |                                |                                | deprecated/ignored                                     |
| 80     | tpa_breakpoint             | U16  | 2     |         | PWM_RANGE_MIN                  | PWM_RANGE_MAX                  |                                                        |

### MSP_SENSOR_CONFIG — 96 — from FC

_Get sensor configuration_

| Offset | Field                | Type | Bytes | Default             | Min | Max | Notes                                                            |
| ------ | -------------------- | ---- | ----- | ------------------- | --- | --- | ---------------------------------------------------------------- |
| 0      | acc_hardware         | U8   | 1     |                     |     |     | lookup: TABLE_ACC_HARDWARE                                       |
| 1      | (value)              | U8   | 1     |                     |     |     |                                                                  |
| 2      | baro_hardware        | U8   | 1     | DEFAULT_BARO_DEVICE |     |     | lookup: TABLE_BARO_HARDWARE                                      |
| 3      | (value)              | U8   | 1     |                     |     |     |                                                                  |
| 4      | mag_hardware         | U8   | 1     | MAG_DEFAULT         |     |     | lookup: TABLE_MAG_HARDWARE                                       |
| 5      | (value)              | U8   | 1     |                     |     |     |                                                                  |
| 6      | rangefinder_hardware | U8   | 1     | RANGEFINDER_NONE    |     |     | lookup: TABLE_RANGEFINDER_HARDWARE; no RANGEFINDER_DEFAULT value |
| 7      | (value)              | U8   | 1     |                     |     |     |                                                                  |
| 8      | opticalflow_hardware | U8   | 1     | OPTICALFLOW_NONE    |     |     | lookup: TABLE_OPTICALFLOW_HARDWARE                               |
| 9      | (value)              | U8   | 1     |                     |     |     |                                                                  |

### MSP_SET_SENSOR_CONFIG — 97 — to FC

_Set sensor configuration_

| Offset | Field                | Type | Bytes | Default             | Min | Max | Notes                              |
| ------ | -------------------- | ---- | ----- | ------------------- | --- | --- | ---------------------------------- |
| 0      | acc_hardware         | U8   | 1     |                     |     |     | lookup: TABLE_ACC_HARDWARE         |
| 1      | (read)               | U8   | 1     |                     |     |     | deprecated/ignored                 |
| 2      | baro_hardware        | U8   | 1     | DEFAULT_BARO_DEVICE |     |     | lookup: TABLE_BARO_HARDWARE        |
| 3      | (read)               | U8   | 1     |                     |     |     | deprecated/ignored                 |
| 4      | mag_hardware         | U8   | 1     | MAG_DEFAULT         |     |     | lookup: TABLE_MAG_HARDWARE         |
| 5      | (read)               | U8   | 1     |                     |     |     | deprecated/ignored                 |
| 6      | rangefinder_hardware | U8   | 1     | RANGEFINDER_NONE    |     |     | lookup: TABLE_RANGEFINDER_HARDWARE |
| 7      | (read)               | U8   | 1     |                     |     |     | deprecated/ignored                 |
| 8      | opticalflow_hardware | U8   | 1     | OPTICALFLOW_NONE    |     |     | lookup: TABLE_OPTICALFLOW_HARDWARE |
| 9      | (read)               | U8   | 1     |                     |     |     | deprecated/ignored                 |

### MSP_CAMERA_CONTROL — 98 — both

_Camera control_

| Offset | Field  | Type | Bytes | Default | Min | Max | Notes              |
| ------ | ------ | ---- | ----- | ------- | --- | --- | ------------------ |
| 0      | (read) | U8   | 1     |         |     |     | deprecated/ignored |

### MSP_SET_ARMING_DISABLED — 99 — to FC

_Enable/disable arming_

| Offset | Field  | Type | Bytes | Default | Min | Max | Notes              |
| ------ | ------ | ---- | ----- | ------- | --- | --- | ------------------ |
| 0      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 1      | (read) | U8   | 1     |         |     |     | deprecated/ignored |

### MSP_STATUS — 101 — from FC

_Cycletime & errors_count & sensor present & box activation & current setting number_

| Offset | Field           | Type  | Bytes | Default | Min | Max | Notes                                      |
| ------ | --------------- | ----- | ----- | ------- | --- | --- | ------------------------------------------ |
| 0      | (value)         | U16   | 2     |         |     |     |                                            |
| 2      | (value)         | U16   | 2     |         |     |     |                                            |
| 4      | (value)         | U16   | 2     |         |     |     | deprecated/padding                         |
| 6      | (value)         | U16   | 2     |         |     |     |                                            |
| 8      | (variable data) | bytes | ?     |         |     |     | unconditional part of flags, first 32 bits |
| ?      | (value)         | U8    | 1     |         |     |     |                                            |
| ?      | (value)         | U16   | 2     |         |     |     |                                            |
| ?      | (value)         | U8    | 1     |         |     |     |                                            |
| ?      | (value)         | U8    | 1     |         |     |     |                                            |
| ?      | (value)         | U16   | 2     |         |     |     | gyro cycle time                            |
| ?      | (value)         | U8    | 1     |         |     |     |                                            |
| ?      | (variable data) | bytes | ?     |         |     |     | variable-length data                       |
| ?      | (value)         | U8    | 1     |         |     |     |                                            |
| ?      | (value)         | U32   | 4     |         |     |     |                                            |
| ?      | (value)         | U8    | 1     |         |     |     |                                            |
| ?      | (value)         | U16   | 2     |         |     |     |                                            |
| ?      | (value)         | U16   | 2     |         |     |     | deprecated/padding                         |
| ?      | (value)         | U8    | 1     |         |     |     |                                            |
| ?      | (value)         | U8    | 1     |         |     |     |                                            |
| ?      | (value)         | U8    | 1     |         |     |     |                                            |

### MSP_RAW_IMU — 102 — from FC

_9 DOF_

| Offset | Field   | Type | Bytes | Default | Min | Max | Notes              |
| ------ | ------- | ---- | ----- | ------- | --- | --- | ------------------ |
| 0      | (value) | U16  | 2     |         |     |     |                    |
| 2      | (value) | U16  | 2     |         |     |     | deprecated/padding |
| 4      | (value) | U16  | 2     |         |     |     |                    |
| 6      | (value) | U16  | 2     |         |     |     |                    |
| 8      | (value) | U16  | 2     |         |     |     | deprecated/padding |

### MSP_SERVO — 103 — from FC

_Servos_

| Offset | Field           | Type  | Bytes | Default | Min | Max | Notes                |
| ------ | --------------- | ----- | ----- | ------- | --- | --- | -------------------- |
| 0      | (variable data) | bytes | ?     |         |     |     | variable-length data |

### MSP_MOTOR — 104 — from FC

_Motors_

| Offset | Field   | Type | Bytes | Default | Min | Max | Notes              |
| ------ | ------- | ---- | ----- | ------- | --- | --- | ------------------ |
| 0      | (value) | U16  | 2     |         |     |     | deprecated/padding |
| 2      | (value) | U16  | 2     |         |     |     |                    |
| 4      | (value) | U16  | 2     |         |     |     | deprecated/padding |

### MSP_RC — 105 — from FC

_RC channels and more_

| Offset | Field   | Type | Bytes | Default | Min | Max | Notes |
| ------ | ------- | ---- | ----- | ------- | --- | --- | ----- |
| 0      | (value) | U16  | 2     |         |     |     |       |

### MSP_RAW_GPS — 106 — from FC

_Fix, numsat, lat, lon, alt, speed, ground course_

| Offset | Field        | Type | Bytes | Default | Min | Max | Notes                                                                                                                                      |
| ------ | ------------ | ---- | ----- | ------- | --- | --- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 0      | (value)      | U8   | 1     |         |     |     |                                                                                                                                            |
| 1      | numSat       | U8   | 1     |         |     |     |                                                                                                                                            |
| 2      | lat          | U32  | 4     |         |     |     |                                                                                                                                            |
| 6      | lon          | U32  | 4     |         |     |     |                                                                                                                                            |
| 10     | (value)      | U16  | 2     |         |     |     | alt changed from 1m to 0.01m per lsb since MSP API 1.39 by RTH. To maintain backwards compatibility compensate to 1m per lsb in MSP again. |
| 12     | groundSpeed  | U16  | 2     |         |     |     |                                                                                                                                            |
| 14     | groundCourse | U16  | 2     |         |     |     |                                                                                                                                            |
| 16     | pdop         | U16  | 2     |         |     |     |                                                                                                                                            |

### MSP_COMP_GPS — 107 — from FC

_Distance home, direction home_

| Offset | Field   | Type | Bytes | Default | Min | Max | Notes                                                                                                      |
| ------ | ------- | ---- | ----- | ------- | --- | --- | ---------------------------------------------------------------------------------------------------------- |
| 0      | (value) | U16  | 2     |         |     |     |                                                                                                            |
| 2      | (value) | U16  | 2     |         |     |     | resolution increased in Betaflight 4.4 by factor of 10, this maintains backwards compatibility for DJI OSD |
| 4      | (value) | U8   | 1     |         |     |     |                                                                                                            |

### MSP_ATTITUDE — 108 — from FC

_2 angles 1 heading_

| Offset | Field   | Type | Bytes | Default | Min | Max | Notes |
| ------ | ------- | ---- | ----- | ------- | --- | --- | ----- |
| 0      | roll    | U16  | 2     |         |     |     |       |
| 2      | pitch   | U16  | 2     |         |     |     |       |
| 4      | (value) | U16  | 2     |         |     |     |       |

### MSP_ALTITUDE — 109 — from FC

_Altitude, variometer_

| Offset | Field   | Type | Bytes | Default | Min | Max | Notes              |
| ------ | ------- | ---- | ----- | ------- | --- | --- | ------------------ |
| 0      | (value) | U32  | 4     |         |     |     |                    |
| 4      | (value) | U16  | 2     |         |     |     |                    |
| 6      | (value) | U16  | 2     |         |     |     | deprecated/padding |

### MSP_ANALOG — 110 — from FC

_Vbat, powermetersum, rssi if available on RX_

| Offset | Field   | Type | Bytes | Default | Min | Max | Notes                                                |
| ------ | ------- | ---- | ----- | ------- | --- | --- | ---------------------------------------------------- |
| 0      | (value) | U8   | 1     |         |     |     |                                                      |
| 1      | (value) | U16  | 2     |         |     |     | milliamp hours drawn from battery                    |
| 3      | (value) | U16  | 2     |         |     |     |                                                      |
| 5      | (value) | U16  | 2     |         |     |     | send current in 0.01 A steps, range is -320A to 320A |
| 7      | (value) | U16  | 2     |         |     |     |                                                      |

### MSP_RC_TUNING — 111 — from FC

_RC rate, rc expo, rollpitch rate, yaw rate, dyn throttle PID_

| Offset | Field                  | Type | Bytes | Default | Min | Max | Notes                                         |
| ------ | ---------------------- | ---- | ----- | ------- | --- | --- | --------------------------------------------- |
| 0      | (value)                | U8   | 1     |         |     |     |                                               |
| 1      | (value)                | U8   | 1     |         |     |     |                                               |
| 2      | (value)                | U8   | 1     |         |     |     | R,P,Y see flight_dynamics_index_t             |
| 3      | (value)                | U8   | 1     |         |     |     | was currentControlRateProfile->tpa_rate       |
| 4      | thrMid8                | U8   | 1     |         | 0   | 100 |                                               |
| 5      | thrExpo8               | U8   | 1     |         | 0   | 100 |                                               |
| 6      | (value)                | U16  | 2     |         |     |     | was currentControlRateProfile->tpa_breakpoint |
| 8      | (value)                | U8   | 1     |         |     |     |                                               |
| 9      | (value)                | U8   | 1     |         |     |     |                                               |
| 10     | (value)                | U8   | 1     |         |     |     |                                               |
| 11     | (value)                | U8   | 1     |         |     |     |                                               |
| 12     | throttle_limit_type    | U8   | 1     |         |     |     | lookup: TABLE_THROTTLE_LIMIT_TYPE             |
| 13     | throttle_limit_percent | U8   | 1     |         | 25  | 100 |                                               |
| 14     | (value)                | U16  | 2     |         |     |     |                                               |
| 16     | (value)                | U16  | 2     |         |     |     |                                               |
| 18     | (value)                | U16  | 2     |         |     |     |                                               |
| 20     | rates_type             | U8   | 1     |         |     |     | lookup: TABLE_RATES_TYPE                      |
| 21     | thrHover8              | U8   | 1     |         | 0   | 100 |                                               |

### MSP_PID — 112 — from FC

_P I D coeff (9 are used currently)_

| Offset | Field | Type | Bytes | Default | Min | Max | Notes |
| ------ | ----- | ---- | ----- | ------- | --- | --- | ----- |
| 0      | P     | U8   | 1     |         |     |     |       |
| 1      | I     | U8   | 1     |         |     |     |       |
| 2      | D     | U8   | 1     |         |     |     |       |

### MSP_PIDNAMES — 117 — from FC

_The PID names_

| Offset | Field   | Type | Bytes | Default | Min | Max | Notes |
| ------ | ------- | ---- | ----- | ------- | --- | --- | ----- |
| 0      | (value) | U8   | 1     |         |     |     |       |

### MSP_SERVO_CONFIGURATIONS — 120 — from FC

_All servo configurations_

| Offset | Field              | Type | Bytes | Default | Min | Max | Notes |
| ------ | ------------------ | ---- | ----- | ------- | --- | --- | ----- |
| 0      | min                | U16  | 2     |         |     |     |       |
| 2      | max                | U16  | 2     |         |     |     |       |
| 4      | middle             | U16  | 2     |         |     |     |       |
| 6      | rate               | U8   | 1     |         |     |     |       |
| 7      | forwardFromChannel | U8   | 1     |         |     |     |       |
| 8      | reversedSources    | U32  | 4     |         |     |     |       |

### MSP_MOTOR_3D_CONFIG — 124 — from FC

_Settings needed for reversible ESCs_

| Offset | Field           | Type | Bytes | Default | Min              | Max              | Notes |
| ------ | --------------- | ---- | ----- | ------- | ---------------- | ---------------- | ----- |
| 0      | deadband3d_low  | U16  | 2     | 1406    | PWM_PULSE_MIN    | PWM_RANGE_MIDDLE |       |
| 2      | deadband3d_high | U16  | 2     | 1514    | PWM_RANGE_MIDDLE | PWM_PULSE_MAX    |       |
| 4      | neutral3d       | U16  | 2     | 1460    | PWM_PULSE_MIN    | PWM_PULSE_MAX    |       |

### MSP_RC_DEADBAND — 125 — from FC

_Deadbands for yaw alt pitch roll_

| Offset | Field               | Type | Bytes | Default | Min | Max | Notes              |
| ------ | ------------------- | ---- | ----- | ------- | --- | --- | ------------------ |
| 0      | deadband            | U8   | 1     | 0       | 0   | 32  |                    |
| 1      | yaw_deadband        | U8   | 1     | 0       | 0   | 100 |                    |
| 2      | deadband            | U8   | 1     | 0       | 0   | 32  |                    |
| 3      | (value)             | U8   | 1     |         |     |     | deprecated/padding |
| 4      | deadband3d_throttle | U16  | 2     | 50      | 1   | 100 |                    |

### MSP_SENSOR_ALIGNMENT — 126 — from FC

_Orientation of acc,gyro,mag_

| Offset | Field                | Type | Bytes | Default              | Min | Max | Notes                                                 |
| ------ | -------------------- | ---- | ----- | -------------------- | --- | --- | ----------------------------------------------------- |
| 0      | (value)              | U8   | 1     |                      |     |     |                                                       |
| 1      | (value)              | U8   | 1     |                      |     |     | Starting with 4.0 gyro and acc alignment are the same |
| 2      | mag_alignment        | U8   | 1     | MAG_ALIGN            |     |     | lookup: TABLE_ALIGNMENT                               |
| 3      | (value)              | U8   | 1     |                      |     |     | deprecated/padding                                    |
| 4      | (value)              | U8   | 1     |                      |     |     |                                                       |
| 5      | gyro_enabled_bitmask | U8   | 1     | DEFAULT_GYRO_ENABLED |     |     | deprecates gyro_to_use                                |
| 6      | roll                 | U16  | 2     |                      |     |     |                                                       |
| 8      | pitch                | U16  | 2     |                      |     |     |                                                       |
| 10     | yaw                  | U16  | 2     |                      |     |     |                                                       |
| 12     | (value)              | U16  | 2     |                      |     |     | deprecated/padding                                    |
| 14     | (value)              | U16  | 2     |                      |     |     | deprecated/padding                                    |
| 16     | (value)              | U16  | 2     |                      |     |     | deprecated/padding                                    |

### MSP_LED_STRIP_MODECOLOR — 127 — from FC

_Get LED strip mode_color settings_

| Offset | Field                | Type | Bytes | Default  | Min | Max | Notes              |
| ------ | -------------------- | ---- | ----- | -------- | --- | --- | ------------------ |
| 0      | (value)              | U8   | 1     |          |     |     |                    |
| 1      | (value)              | U8   | 1     |          |     |     |                    |
| 2      | (value)              | U8   | 1     |          |     |     |                    |
| 3      | (value)              | U8   | 1     |          |     |     |                    |
| 4      | (value)              | U8   | 1     |          |     |     |                    |
| 5      | (value)              | U8   | 1     |          |     |     |                    |
| 6      | (value)              | U8   | 1     |          |     |     |                    |
| 7      | (value)              | U8   | 1     |          |     |     | deprecated/padding |
| 8      | ledstrip_aux_channel | U8   | 1     | THROTTLE |     |     |                    |

### MSP_VOLTAGE_METERS — 128 — from FC

_Voltage (per meter)_

| Offset | Field   | Type | Bytes | Default | Min | Max | Notes |
| ------ | ------- | ---- | ----- | ------- | --- | --- | ----- |
| 0      | (value) | U8   | 1     |         |     |     |       |
| 1      | (value) | U8   | 1     |         |     |     |       |

### MSP_CURRENT_METERS — 129 — from FC

_Amperage (per meter)_

| Offset | Field   | Type | Bytes | Default | Min | Max | Notes                                                                    |
| ------ | ------- | ---- | ----- | ------- | --- | --- | ------------------------------------------------------------------------ |
| 0      | (value) | U8   | 1     |         |     |     |                                                                          |
| 1      | (value) | U16  | 2     |         |     |     | milliamp hours drawn from battery                                        |
| 3      | (value) | U16  | 2     |         |     |     | send amperage in 0.001 A steps (mA). Negative range is truncated to zero |

### MSP_BATTERY_STATE — 130 — from FC

_Connected/Disconnected, Voltage, Current Used_

| Offset | Field           | Type | Bytes | Default | Min | Max   | Notes                                                |
| ------ | --------------- | ---- | ----- | ------- | --- | ----- | ---------------------------------------------------- |
| 0      | (value)         | U8   | 1     |         |     |       | 0 indicates battery not detected.                    |
| 1      | batteryCapacity | U16  | 2     |         | 0   | 20000 | in mAh                                               |
| 3      | (value)         | U8   | 1     |         |     |       | in 0.1V steps                                        |
| 4      | (value)         | U16  | 2     |         |     |       | milliamp hours drawn from battery                    |
| 6      | (value)         | U16  | 2     |         |     |       | send current in 0.01 A steps, range is -320A to 320A |
| 8      | (value)         | U8   | 1     |         |     |       |                                                      |
| 9      | (value)         | U16  | 2     |         |     |       | in 0.01V steps                                       |

### MSP_MOTOR_CONFIG — 131 — from FC

_Motor configuration (min/max throttle, etc)_

| Offset | Field          | Type | Bytes | Default | Min           | Max           | Notes                           |
| ------ | -------------- | ---- | ----- | ------- | ------------- | ------------- | ------------------------------- |
| 0      | (value)        | U16  | 2     |         |               |               | was minthrottle until after 4.5 |
| 2      | maxthrottle    | U16  | 2     | 2000    | PWM_PULSE_MIN | PWM_PULSE_MAX |                                 |
| 4      | mincommand     | U16  | 2     | 1000    | PWM_PULSE_MIN | PWM_PULSE_MAX |                                 |
| 6      | (value)        | U8   | 1     |         |               |               |                                 |
| 7      | motorPoleCount | U8   | 1     | 14      | 4             | UINT8_MAX     |                                 |
| 8      | (value)        | U8   | 1     |         |               |               |                                 |
| 9      | (value)        | U8   | 1     |         |               |               | deprecated/padding              |
| 10     | (value)        | U8   | 1     |         |               |               | ESC sensor available            |
| 11     | (value)        | U8   | 1     |         |               |               | deprecated/padding              |

### MSP_GPS_CONFIG — 132 — from FC

_GPS configuration_

| Offset | Field                   | Type | Bytes | Default           | Min | Max | Notes                       |
| ------ | ----------------------- | ---- | ----- | ----------------- | --- | --- | --------------------------- |
| 0      | provider                | U8   | 1     | GPS_VIRTUAL       |     |     | lookup: TABLE_GPS_PROVIDER  |
| 1      | sbasMode                | U8   | 1     | SBAS_NONE         |     |     | lookup: TABLE_GPS_SBAS_MODE |
| 2      | autoConfig              | U8   | 1     | GPS_AUTOCONFIG_ON |     |     | lookup: TABLE_OFF_ON        |
| 3      | autoBaud                | U8   | 1     | GPS_AUTOBAUD_OFF  |     |     | lookup: TABLE_OFF_ON        |
| 4      | gps_set_home_point_once | U8   | 1     | 0                 |     |     | lookup: TABLE_OFF_ON        |
| 5      | gps_ublox_use_galileo   | U8   | 1     | 0                 |     |     | lookup: TABLE_OFF_ON        |

### MSP_COMPASS_CONFIG — 133 — from FC

_Compass configuration_

| Offset | Field           | Type | Bytes | Default | Min  | Max | Notes |
| ------ | --------------- | ---- | ----- | ------- | ---- | --- | ----- |
| 0      | mag_declination | U16  | 2     | 0       | -300 | 300 |       |

### MSP_ESC_SENSOR_DATA — 134 — from FC

_Extra ESC data from 32-Bit ESCs (Temperature, RPM)_

| Offset | Field       | Type | Bytes | Default | Min | Max | Notes |
| ------ | ----------- | ---- | ----- | ------- | --- | --- | ----- |
| 0      | (value)     | U8   | 1     |         |     |     |       |
| 1      | temperature | U8   | 1     |         |     |     |       |
| 2      | rpm         | U16  | 2     |         |     |     |       |
| 4      | (value)     | U8   | 1     |         |     |     |       |
| 5      | (value)     | U8   | 1     |         |     |     |       |
| 6      | (value)     | U16  | 2     |         |     |     |       |

### MSP_GPS_RESCUE — 135 — from FC

_GPS Rescue angle, returnAltitude, descentDistance, groundSpeed, sanityChecks and minSats_

| Offset | Field                 | Type | Bytes | Default                 | Min  | Max  | Notes                                 |
| ------ | --------------------- | ---- | ----- | ----------------------- | ---- | ---- | ------------------------------------- |
| 0      | maxRescueAngle        | U16  | 2     | 45                      | 30   | 60   |                                       |
| 2      | returnAltitudeM       | U16  | 2     | 30                      | 5    | 1000 |                                       |
| 4      | descentDistanceM      | U16  | 2     | 20                      | 10   | 500  |                                       |
| 6      | groundSpeedCmS        | U16  | 2     | 750                     | 0    | 3000 |                                       |
| 8      | throttleMin           | U16  | 2     | 1100                    | 1050 | 1400 |                                       |
| 10     | throttleMax           | U16  | 2     | 1900                    | 1400 | 2000 |                                       |
| 12     | hoverThrottle         | U16  | 2     | 1275                    | 0    | 1700 |                                       |
| 14     | sanityChecks          | U8   | 1     | RESCUE_SANITY_FS_ONLY   |      |      | lookup: TABLE_GPS_RESCUE_SANITY_CHECK |
| 15     | minSats               | U8   | 1     | 8                       | 5    | 50   |                                       |
| 16     | ascendRate            | U16  | 2     | 750                     | 50   | 2500 |                                       |
| 18     | descendRate           | U16  | 2     | 150                     | 25   | 500  |                                       |
| 20     | allowArmingWithoutFix | U8   | 1     | 0                       |      |      | lookup: TABLE_OFF_ON                  |
| 21     | altitudeMode          | U8   | 1     | GPS_RESCUE_ALT_MODE_MAX |      |      | lookup: TABLE_GPS_RESCUE_ALT_MODE     |
| 22     | minStartDistM         | U16  | 2     | 15                      | 10   | 30   |                                       |
| 24     | initialClimbM         | U16  | 2     | 10                      | 0    | 100  |                                       |

### MSP_GPS_RESCUE_PIDS — 136 — from FC

_GPS Rescue throttleP and velocity PIDS + yaw P_

| Offset | Field     | Type | Bytes | Default | Min | Max | Notes |
| ------ | --------- | ---- | ----- | ------- | --- | --- | ----- |
| 0      | altitudeP | U16  | 2     | 15      | 0   | 200 |       |
| 2      | altitudeI | U16  | 2     | 15      | 0   | 200 |       |
| 4      | altitudeD | U16  | 2     | 15      | 0   | 200 |       |
| 6      | velP      | U16  | 2     | 8       | 0   | 200 |       |
| 8      | velI      | U16  | 2     | 40      | 0   | 200 |       |
| 10     | velD      | U16  | 2     | 12      | 0   | 200 |       |
| 12     | yawP      | U16  | 2     | 50      | 0   | 200 |       |

### MSP_VTXTABLE_BAND — 137 — from FC

_VTX table band/channel data_

| Offset | Field    | Type | Bytes | Default | Min | Max | Notes                                   |
| ------ | -------- | ---- | ----- | ------- | --- | --- | --------------------------------------- |
| 0      | (value)  | U8   | 1     |         |     |     | band number (same as request)           |
| 1      | (value)  | U8   | 1     |         |     |     | band name length                        |
| 2      | (value)  | U8   | 1     |         |     |     |                                         |
| 3      | (value)  | U8   | 1     |         |     |     | band letter                             |
| 4      | (value)  | U8   | 1     |         |     |     | CUSTOM = 0; FACTORY = 1                 |
| 5      | channels | U8   | 1     | 0       |     |     | number of channel frequencies to follow |
| 6      | (value)  | U16  | 2     |         |     |     |                                         |

### MSP_VTXTABLE_POWERLEVEL — 138 — from FC

_VTX table powerLevel data_

| Offset | Field   | Type | Bytes | Default | Min | Max | Notes                               |
| ------ | ------- | ---- | ----- | ------- | --- | --- | ----------------------------------- |
| 0      | (value) | U8   | 1     |         |     |     | powerLevel number (same as request) |
| 1      | (value) | U16  | 2     |         |     |     |                                     |
| 3      | (value) | U8   | 1     |         |     |     | powerLevel label length             |
| 4      | (value) | U8   | 1     |         |     |     |                                     |

### MSP_MOTOR_TELEMETRY — 139 — from FC

_Per-motor telemetry data (RPM, packet stats, ESC temp, etc.)_

| Offset | Field   | Type | Bytes | Default | Min | Max | Notes |
| ------ | ------- | ---- | ----- | ------- | --- | --- | ----- |
| 0      | (value) | U8   | 1     |         |     |     |       |
| 1      | (value) | U32  | 4     |         |     |     |       |
| 5      | (value) | U16  | 2     |         |     |     |       |
| 7      | (value) | U8   | 1     |         |     |     |       |
| 8      | (value) | U16  | 2     |         |     |     |       |
| 10     | (value) | U16  | 2     |         |     |     |       |
| 12     | (value) | U16  | 2     |         |     |     |       |

### MSP_VALIDATE_SIMPLIFIED_TUNING — 145 — from FC

_Returns array of true/false showing which simplified tuning groups match values_

| Offset | Field   | Type | Bytes | Default | Min | Max | Notes |
| ------ | ------- | ---- | ----- | ------- | --- | --- | ----- |
| 0      | (value) | U8   | 1     |         |     |     |       |
| 1      | (value) | U8   | 1     |         |     |     |       |
| 2      | (value) | U8   | 1     |         |     |     |       |

### MSP_UID — 160 — from FC

_Unique device ID_

| Offset | Field   | Type | Bytes | Default | Min | Max | Notes |
| ------ | ------- | ---- | ----- | ------- | --- | --- | ----- |
| 0      | (value) | U32  | 4     |         |     |     |       |
| 4      | (value) | U32  | 4     |         |     |     |       |
| 8      | (value) | U32  | 4     |         |     |     |       |

### MSP_GPSSVINFO — 164 — from FC

_Get Signal Strength (only U-Blox)_

| Offset | Field   | Type | Bytes | Default | Min | Max | Notes |
| ------ | ------- | ---- | ----- | ------- | --- | --- | ----- |
| 0      | (value) | U8   | 1     |         |     |     |       |
| 1      | chn     | U8   | 1     |         |     |     |       |
| 2      | svid    | U8   | 1     |         |     |     |       |
| 3      | quality | U8   | 1     |         |     |     |       |
| 4      | cno     | U8   | 1     |         |     |     |       |

### MSP_ATTITUDE_QUATERNION — 167 — from FC

_Orientation quaternion components (w, x, y, z)_

| Offset | Field   | Type | Bytes | Default | Min | Max | Notes |
| ------ | ------- | ---- | ----- | ------- | --- | --- | ----- |
| 0      | (value) | U16  | 2     |         |     |     |       |
| 2      | (value) | U16  | 2     |         |     |     |       |
| 4      | (value) | U16  | 2     |         |     |     |       |
| 6      | (value) | U16  | 2     |         |     |     |       |

### MSP_COPY_PROFILE — 183 — to FC

_Copy settings between profiles_

| Offset | Field  | Type | Bytes | Default | Min | Max | Notes                                     |
| ------ | ------ | ---- | ----- | ------- | --- | --- | ----------------------------------------- |
| 0      | (read) | U8   | 1     |         |     |     | 0 = pid profile, 1 = control rate profile |
| 1      | (read) | U8   | 1     |         |     |     | deprecated/ignored                        |
| 2      | (read) | U8   | 1     |         |     |     | deprecated/ignored                        |

### MSP_BEEPER_CONFIG — 184 — from FC

_Get beeper configuration_

| Offset | Field               | Type | Bytes | Default                        | Min | Max               | Notes |
| ------ | ------------------- | ---- | ----- | ------------------------------ | --- | ----------------- | ----- |
| 0      | beeper_off_flags    | U32  | 4     | DEFAULT_BEEPER_OFF_FLAGS       |     |                   |       |
| 4      | dshotBeaconTone     | U8   | 1     | 1                              | 1   | DSHOT_CMD_BEACON5 |       |
| 5      | dshotBeaconOffFlags | U32  | 4     | DEFAULT_DSHOT_BEACON_OFF_FLAGS |     |                   |       |

### MSP_SET_BEEPER_CONFIG — 185 — to FC

_Set beeper configuration_

| Offset | Field               | Type | Bytes | Default                        | Min | Max               | Notes |
| ------ | ------------------- | ---- | ----- | ------------------------------ | --- | ----------------- | ----- |
| 0      | beeper_off_flags    | U32  | 4     | DEFAULT_BEEPER_OFF_FLAGS       |     |                   |       |
| 4      | dshotBeaconTone     | U8   | 1     | 1                              | 1   | DSHOT_CMD_BEACON5 |       |
| 5      | dshotBeaconOffFlags | U32  | 4     | DEFAULT_DSHOT_BEACON_OFF_FLAGS |     |                   |       |

### MSP_SET_TX_INFO — 186 — to FC

_Set runtime information from TX lua scripts_

| Offset | Field  | Type | Bytes | Default | Min | Max | Notes              |
| ------ | ------ | ---- | ----- | ------- | --- | --- | ------------------ |
| 0      | (read) | U8   | 1     |         |     |     | deprecated/ignored |

### MSP_TX_INFO — 187 — from FC

_Get runtime information for TX lua scripts_

| Offset | Field   | Type | Bytes | Default | Min | Max | Notes |
| ------ | ------- | ---- | ----- | ------- | --- | --- | ----- |
| 0      | (value) | U8   | 1     |         |     |     |       |
| 1      | (value) | U8   | 1     |         |     |     |       |

### MSP_SET_OSD_CANVAS — 188 — to FC

_Set OSD canvas size COLSxROWS_

| Offset | Field       | Type | Bytes | Default | Min | Max | Notes |
| ------ | ----------- | ---- | ----- | ------- | --- | --- | ----- |
| 0      | canvas_cols | U8   | 1     | 53      | 0   | 63  |       |
| 1      | canvas_rows | U8   | 1     | 20      | 0   | 31  |       |

### MSP_OSD_CANVAS — 189 — from FC

_Get OSD canvas size COLSxROWS_

| Offset | Field       | Type | Bytes | Default | Min | Max | Notes |
| ------ | ----------- | ---- | ----- | ------- | --- | --- | ----- |
| 0      | canvas_cols | U8   | 1     | 53      | 0   | 63  |       |
| 1      | canvas_rows | U8   | 1     | 20      | 0   | 31  |       |

### MSP_SET_RAW_RC — 200 — to FC

_8 rc chan_

| Offset | Field  | Type | Bytes | Default | Min | Max | Notes |
| ------ | ------ | ---- | ----- | ------- | --- | --- | ----- |
| 0      | (read) | U16  | 2     |         |     |     |       |

### MSP_SET_RAW_GPS — 201 — to FC

_Fix, numsat, lat, lon, alt, speed_

| Offset | Field  | Type | Bytes | Default | Min | Max | Notes                                                                                                                  |
| ------ | ------ | ---- | ----- | ------- | --- | --- | ---------------------------------------------------------------------------------------------------------------------- |
| 0      | (read) | U8   | 1     |         |     |     | deprecated/ignored                                                                                                     |
| 1      | (read) | U8   | 1     |         |     |     | deprecated/ignored                                                                                                     |
| 2      | (read) | U32  | 4     |         |     |     |                                                                                                                        |
| 6      | (read) | U32  | 4     |         |     |     |                                                                                                                        |
| 10     | (read) | U16  | 2     |         |     |     | alt changed from 1m to 0.01m per lsb since MSP API 1.39 by RTH. Received MSP altitudes in 1m per lsb have to upscaled. |
| 12     | (read) | U16  | 2     |         |     |     |                                                                                                                        |

### MSP_SET_PID — 202 — to FC

_P I D coeff (9 are used currently)_

| Offset | Field  | Type | Bytes | Default | Min | Max | Notes              |
| ------ | ------ | ---- | ----- | ------- | --- | --- | ------------------ |
| 0      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 1      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 2      | (read) | U8   | 1     |         |     |     | deprecated/ignored |

### MSP_SET_RC_TUNING — 204 — to FC

_RC rate, rc expo, rollpitch rate, yaw rate, dyn throttle PID, yaw expo_

| Offset | Field                  | Type | Bytes | Default | Min | Max | Notes                                  |
| ------ | ---------------------- | ---- | ----- | ------- | --- | --- | -------------------------------------- |
| 0      | (read)                 | U8   | 1     |         |     |     | deprecated/ignored                     |
| 1      | (read)                 | U8   | 1     |         |     |     | deprecated/ignored                     |
| 2      | (read)                 | U8   | 1     |         |     |     | deprecated/ignored                     |
| 3      | (read)                 | U8   | 1     |         |     |     | tpa_rate is moved to PID profile       |
| 4      | thrMid8                | U8   | 1     |         | 0   | 100 |                                        |
| 5      | thrExpo8               | U8   | 1     |         | 0   | 100 |                                        |
| 6      | (read)                 | U16  | 2     |         |     |     | tpa_breakpoint is moved to PID profile |
| 8      | (read)                 | U8   | 1     |         |     |     | deprecated/ignored                     |
| 9      | (read)                 | U8   | 1     |         |     |     | deprecated/ignored                     |
| 10     | (read)                 | U8   | 1     |         |     |     | deprecated/ignored                     |
| 11     | (read)                 | U8   | 1     |         |     |     | deprecated/ignored                     |
| 12     | throttle_limit_type    | U8   | 1     |         |     |     | lookup: TABLE_THROTTLE_LIMIT_TYPE      |
| 13     | throttle_limit_percent | U8   | 1     |         | 25  | 100 |                                        |
| 14     | (read)                 | U16  | 2     |         |     |     |                                        |
| 16     | (read)                 | U16  | 2     |         |     |     |                                        |
| 18     | (read)                 | U16  | 2     |         |     |     |                                        |
| 20     | rates_type             | U8   | 1     |         |     |     | lookup: TABLE_RATES_TYPE               |
| 21     | thrHover8              | U8   | 1     |         | 0   | 100 |                                        |

### MSP_RESET_CONF — 208 — to FC

_No param - reset settings_

| Offset | Field   | Type | Bytes | Default | Min | Max | Notes |
| ------ | ------- | ---- | ----- | ------- | --- | --- | ----- |
| 0      | (value) | U8   | 1     |         |     |     |       |

### MSP_SELECT_SETTING — 210 — to FC

_Select setting number (0-2)_

| Offset | Field  | Type | Bytes | Default | Min | Max | Notes              |
| ------ | ------ | ---- | ----- | ------- | --- | --- | ------------------ |
| 0      | (read) | U8   | 1     |         |     |     | deprecated/ignored |

### MSP_SET_HEADING — 211 — to FC

_Define a new heading hold direction_

| Offset | Field  | Type | Bytes | Default | Min | Max | Notes |
| ------ | ------ | ---- | ----- | ------- | --- | --- | ----- |
| 0      | (read) | U16  | 2     |         |     |     |       |

### MSP_SET_SERVO_CONFIGURATION — 212 — to FC

_Servo settings_

| Offset | Field  | Type | Bytes | Default | Min | Max | Notes              |
| ------ | ------ | ---- | ----- | ------- | --- | --- | ------------------ |
| 0      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 1      | (read) | U16  | 2     |         |     |     |                    |
| 3      | (read) | U16  | 2     |         |     |     |                    |
| 5      | (read) | U16  | 2     |         |     |     |                    |
| 7      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 8      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 9      | (read) | U32  | 4     |         |     |     |                    |

### MSP_SET_MOTOR — 214 — to FC

_PropBalance function_

| Offset | Field  | Type | Bytes | Default | Min | Max | Notes |
| ------ | ------ | ---- | ----- | ------- | --- | --- | ----- |
| 0      | (read) | U16  | 2     |         |     |     |       |

### MSP_SET_MOTOR_3D_CONFIG — 217 — to FC

_Settings needed for reversible ESCs_

| Offset | Field           | Type | Bytes | Default | Min              | Max              | Notes |
| ------ | --------------- | ---- | ----- | ------- | ---------------- | ---------------- | ----- |
| 0      | deadband3d_low  | U16  | 2     | 1406    | PWM_PULSE_MIN    | PWM_RANGE_MIDDLE |       |
| 2      | deadband3d_high | U16  | 2     | 1514    | PWM_RANGE_MIDDLE | PWM_PULSE_MAX    |       |
| 4      | neutral3d       | U16  | 2     | 1460    | PWM_PULSE_MIN    | PWM_PULSE_MAX    |       |

### MSP_SET_RC_DEADBAND — 218 — to FC

_Deadbands for yaw alt pitch roll_

| Offset | Field               | Type | Bytes | Default | Min | Max | Notes              |
| ------ | ------------------- | ---- | ----- | ------- | --- | --- | ------------------ |
| 0      | deadband            | U8   | 1     | 0       | 0   | 32  |                    |
| 1      | yaw_deadband        | U8   | 1     | 0       | 0   | 100 |                    |
| 2      | deadband            | U8   | 1     | 0       | 0   | 32  |                    |
| 3      | (read)              | U8   | 1     |         |     |     | deprecated/ignored |
| 4      | deadband3d_throttle | U16  | 2     | 50      | 1   | 100 |                    |

### MSP_SET_SENSOR_ALIGNMENT — 220 — to FC

_Set the orientation of acc,gyro,mag_

| Offset | Field                | Type | Bytes | Default              | Min | Max | Notes                        |
| ------ | -------------------- | ---- | ----- | -------------------- | --- | --- | ---------------------------- |
| 0      | (read)               | U8   | 1     |                      |     |     | deprecated/ignored           |
| 1      | (read)               | U8   | 1     |                      |     |     | discard deprecated acc_align |
| 2      | mag_alignment        | U8   | 1     | MAG_ALIGN            |     |     | lookup: TABLE_ALIGNMENT      |
| 3      | (read)               | U8   | 1     |                      |     |     | deprecated/ignored           |
| 4      | gyro_enabled_bitmask | U8   | 1     | DEFAULT_GYRO_ENABLED |     |     |                              |
| 5      | (read)               | U16  | 2     |                      |     |     |                              |
| 7      | (read)               | U16  | 2     |                      |     |     |                              |
| 9      | (read)               | U16  | 2     |                      |     |     |                              |
| 11     | (read)               | U16  | 2     |                      |     |     |                              |
| 13     | (read)               | U16  | 2     |                      |     |     |                              |
| 15     | (read)               | U16  | 2     |                      |     |     |                              |

### MSP_SET_LED_STRIP_MODECOLOR — 221 — to FC

_Set LED strip mode_color settings_

| Offset | Field  | Type | Bytes | Default | Min | Max | Notes              |
| ------ | ------ | ---- | ----- | ------- | --- | --- | ------------------ |
| 0      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 1      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 2      | (read) | U8   | 1     |         |     |     | deprecated/ignored |

### MSP_SET_MOTOR_CONFIG — 222 — to FC

_Motor configuration (min/max throttle, etc)_

| Offset | Field          | Type | Bytes | Default | Min           | Max           | Notes                         |
| ------ | -------------- | ---- | ----- | ------- | ------------- | ------------- | ----------------------------- |
| 0      | (read)         | U16  | 2     |         |               |               | minthrottle deprecated in 4.6 |
| 2      | maxthrottle    | U16  | 2     | 2000    | PWM_PULSE_MIN | PWM_PULSE_MAX |                               |
| 4      | mincommand     | U16  | 2     | 1000    | PWM_PULSE_MIN | PWM_PULSE_MAX |                               |
| 6      | motorPoleCount | U8   | 1     | 14      | 4             | UINT8_MAX     |                               |
| 7      | (read)         | U8   | 1     |         |               |               | deprecated/ignored            |
| 8      | (read)         | U8   | 1     |         |               |               | deprecated/ignored            |

### MSP_SET_GPS_CONFIG — 223 — to FC

_GPS configuration_

| Offset | Field                   | Type | Bytes | Default           | Min | Max | Notes                       |
| ------ | ----------------------- | ---- | ----- | ----------------- | --- | --- | --------------------------- |
| 0      | provider                | U8   | 1     | GPS_VIRTUAL       |     |     | lookup: TABLE_GPS_PROVIDER  |
| 1      | sbasMode                | U8   | 1     | SBAS_NONE         |     |     | lookup: TABLE_GPS_SBAS_MODE |
| 2      | autoConfig              | U8   | 1     | GPS_AUTOCONFIG_ON |     |     | lookup: TABLE_OFF_ON        |
| 3      | autoBaud                | U8   | 1     | GPS_AUTOBAUD_OFF  |     |     | lookup: TABLE_OFF_ON        |
| 4      | gps_set_home_point_once | U8   | 1     | 0                 |     |     | lookup: TABLE_OFF_ON        |
| 5      | gps_ublox_use_galileo   | U8   | 1     | 0                 |     |     | lookup: TABLE_OFF_ON        |

### MSP_SET_COMPASS_CONFIG — 224 — to FC

_Compass configuration_

| Offset | Field           | Type | Bytes | Default | Min  | Max | Notes |
| ------ | --------------- | ---- | ----- | ------- | ---- | --- | ----- |
| 0      | mag_declination | U16  | 2     | 0       | -300 | 300 |       |

### MSP_SET_GPS_RESCUE — 225 — to FC

_Set GPS Rescue parameters_

| Offset | Field                 | Type | Bytes | Default                 | Min  | Max  | Notes                                 |
| ------ | --------------------- | ---- | ----- | ----------------------- | ---- | ---- | ------------------------------------- |
| 0      | maxRescueAngle        | U16  | 2     | 45                      | 30   | 60   |                                       |
| 2      | returnAltitudeM       | U16  | 2     | 30                      | 5    | 1000 |                                       |
| 4      | descentDistanceM      | U16  | 2     | 20                      | 10   | 500  |                                       |
| 6      | groundSpeedCmS        | U16  | 2     | 750                     | 0    | 3000 |                                       |
| 8      | throttleMin           | U16  | 2     | 1100                    | 1050 | 1400 |                                       |
| 10     | throttleMax           | U16  | 2     | 1900                    | 1400 | 2000 |                                       |
| 12     | hoverThrottle         | U16  | 2     | 1275                    | 0    | 1700 |                                       |
| 14     | sanityChecks          | U8   | 1     | RESCUE_SANITY_FS_ONLY   |      |      | lookup: TABLE_GPS_RESCUE_SANITY_CHECK |
| 15     | minSats               | U8   | 1     | 8                       | 5    | 50   |                                       |
| 16     | ascendRate            | U16  | 2     | 750                     | 50   | 2500 |                                       |
| 18     | descendRate           | U16  | 2     | 150                     | 25   | 500  |                                       |
| 20     | allowArmingWithoutFix | U8   | 1     | 0                       |      |      | lookup: TABLE_OFF_ON                  |
| 21     | altitudeMode          | U8   | 1     | GPS_RESCUE_ALT_MODE_MAX |      |      | lookup: TABLE_GPS_RESCUE_ALT_MODE     |
| 22     | minStartDistM         | U16  | 2     | 15                      | 10   | 30   |                                       |
| 24     | initialClimbM         | U16  | 2     | 10                      | 0    | 100  |                                       |

### MSP_SET_GPS_RESCUE_PIDS — 226 — to FC

_Set GPS Rescue PID values_

| Offset | Field     | Type | Bytes | Default | Min | Max | Notes |
| ------ | --------- | ---- | ----- | ------- | --- | --- | ----- |
| 0      | altitudeP | U16  | 2     | 15      | 0   | 200 |       |
| 2      | altitudeI | U16  | 2     | 15      | 0   | 200 |       |
| 4      | altitudeD | U16  | 2     | 15      | 0   | 200 |       |
| 6      | velP      | U16  | 2     | 8       | 0   | 200 |       |
| 8      | velI      | U16  | 2     | 40      | 0   | 200 |       |
| 10     | velD      | U16  | 2     | 12      | 0   | 200 |       |
| 12     | yawP      | U16  | 2     | 50      | 0   | 200 |       |

### MSP_SET_VTXTABLE_BAND — 227 — to FC

_Set vtxTable band/channel data_

| Offset | Field  | Type | Bytes | Default | Min | Max | Notes              |
| ------ | ------ | ---- | ----- | ------- | --- | --- | ------------------ |
| 0      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 1      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 2      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 3      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 4      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 5      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 6      | (read) | U16  | 2     |         |     |     |                    |

### MSP_SET_VTXTABLE_POWERLEVEL — 228 — to FC

_Set vtxTable powerLevel data_

| Offset | Field  | Type | Bytes | Default | Min | Max | Notes              |
| ------ | ------ | ---- | ----- | ------- | --- | --- | ------------------ |
| 0      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 1      | (read) | U16  | 2     |         |     |     |                    |
| 3      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 4      | (read) | U8   | 1     |         |     |     | deprecated/ignored |

### MSP_MODE_RANGES_EXTRA — 238 — from FC

_Extra mode range data_

| Offset | Field       | Type | Bytes | Default | Min | Max | Notes                                                       |
| ------ | ----------- | ---- | ----- | ------- | --- | --- | ----------------------------------------------------------- |
| 0      | (value)     | U8   | 1     |         |     |     | prepend number of EXTRAs array elements                     |
| 1      | permanentId | U8   | 1     |         |     |     | each element is aligned with MODE_RANGES by the permanentId |
| 2      | modeLogic   | U8   | 1     |         |     |     |                                                             |
| 3      | permanentId | U8   | 1     |         |     |     |                                                             |

### MSP_SET_ACC_TRIM — 239 — to FC

_Set acc angle trim values_

| Offset | Field  | Type | Bytes | Default | Min | Max | Notes |
| ------ | ------ | ---- | ----- | ------- | --- | --- | ----- |
| 0      | (read) | U16  | 2     |         |     |     |       |
| 2      | (read) | U16  | 2     |         |     |     |       |

### MSP_ACC_TRIM — 240 — from FC

_Get acc angle trim values_

| Offset | Field | Type | Bytes | Default | Min | Max | Notes |
| ------ | ----- | ---- | ----- | ------- | --- | --- | ----- |
| 0      | pitch | U16  | 2     |         |     |     |       |
| 2      | roll  | U16  | 2     |         |     |     |       |

### MSP_SERVO_MIX_RULES — 241 — from FC

_Get servo mixer configuration_

| Offset | Field         | Type | Bytes | Default | Min | Max | Notes |
| ------ | ------------- | ---- | ----- | ------- | --- | --- | ----- |
| 0      | targetChannel | U8   | 1     |         |     |     |       |
| 1      | inputSource   | U8   | 1     |         |     |     |       |
| 2      | rate          | U8   | 1     |         |     |     |       |
| 3      | speed         | U8   | 1     |         |     |     |       |
| 4      | min           | U8   | 1     |         |     |     |       |
| 5      | max           | U8   | 1     |         |     |     |       |
| 6      | box           | U8   | 1     |         |     |     |       |

### MSP_SET_SERVO_MIX_RULE — 242 — to FC

_Set servo mixer configuration_

| Offset | Field  | Type | Bytes | Default | Min | Max | Notes              |
| ------ | ------ | ---- | ----- | ------- | --- | --- | ------------------ |
| 0      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 1      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 2      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 3      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 4      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 5      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 6      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 7      | (read) | U8   | 1     |         |     |     | deprecated/ignored |

### MSP_SET_RTC — 246 — to FC

_Set the RTC clock_

| Offset | Field  | Type | Bytes | Default | Min | Max | Notes |
| ------ | ------ | ---- | ----- | ------- | --- | --- | ----- |
| 0      | (read) | U32  | 4     |         |     |     |       |
| 4      | (read) | U16  | 2     |         |     |     |       |

### MSP_RTC — 247 — from FC

_Get the RTC clock_

| Offset | Field   | Type | Bytes | Default | Min | Max | Notes |
| ------ | ------- | ---- | ----- | ------- | --- | --- | ----- |
| 0      | year    | U16  | 2     |         |     |     |       |
| 2      | month   | U8   | 1     |         |     |     |       |
| 3      | day     | U8   | 1     |         |     |     |       |
| 4      | hours   | U8   | 1     |         |     |     |       |
| 5      | minutes | U8   | 1     |         |     |     |       |
| 6      | seconds | U8   | 1     |         |     |     |       |
| 7      | millis  | U16  | 2     |         |     |     |       |

### MSP_SET_BOARD_INFO — 248 — to FC

_Set the board information_

| Offset | Field  | Type | Bytes | Default | Min | Max | Notes              |
| ------ | ------ | ---- | ----- | ------- | --- | --- | ------------------ |
| 0      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 1      | (read) | U8   | 1     |         |     |     | deprecated/ignored |

### MSP_DEBUG — 254 — from FC

_debug1,debug2,debug3,debug4_

| Offset | Field   | Type | Bytes | Default | Min | Max | Notes                                               |
| ------ | ------- | ---- | ----- | ------- | --- | --- | --------------------------------------------------- |
| 0      | (value) | U16  | 2     |         |     |     | 4 variables are here for general monitoring purpose |

### MSP2_COMMON_SERIAL_CONFIG — 0x1009 — from FC

| Offset | Field                   | Type | Bytes | Default | Min | Max | Notes |
| ------ | ----------------------- | ---- | ----- | ------- | --- | --- | ----- |
| 0      | (value)                 | U8   | 1     |         |     |     |       |
| 1      | identifier              | U8   | 1     |         |     |     |       |
| 2      | functionMask            | U32  | 4     |         |     |     |       |
| 6      | msp_baudrateIndex       | U8   | 1     |         |     |     |       |
| 7      | gps_baudrateIndex       | U8   | 1     |         |     |     |       |
| 8      | telemetry_baudrateIndex | U8   | 1     |         |     |     |       |
| 9      | blackbox_baudrateIndex  | U8   | 1     |         |     |     |       |

### MSP2_COMMON_SET_SERIAL_CONFIG — 0x100a — to FC

| Offset | Field                   | Type | Bytes | Default | Min | Max | Notes              |
| ------ | ----------------------- | ---- | ----- | ------- | --- | --- | ------------------ |
| 0      | (read)                  | U8   | 1     |         |     |     | deprecated/ignored |
| 1      | (read)                  | U8   | 1     |         |     |     | deprecated/ignored |
| 2      | functionMask            | U32  | 4     |         |     |     |                    |
| 6      | msp_baudrateIndex       | U8   | 1     |         |     |     |                    |
| 7      | gps_baudrateIndex       | U8   | 1     |         |     |     |                    |
| 8      | telemetry_baudrateIndex | U8   | 1     |         |     |     |                    |
| 9      | blackbox_baudrateIndex  | U8   | 1     |         |     |     |                    |
| 10     | (read)                  | U8   | 1     |         |     |     | deprecated/ignored |

### MSP2_SENSOR_GPS — 0x1f03 — to FC

| Offset | Field  | Type | Bytes | Default | Min | Max | Notes                                                                      |
| ------ | ------ | ---- | ----- | ------- | --- | --- | -------------------------------------------------------------------------- |
| 0      | (read) | U8   | 1     |         |     |     | instance                                                                   |
| 1      | (read) | U16  | 2     |         |     |     | gps_week                                                                   |
| 3      | (read) | U32  | 4     |         |     |     | ms_tow                                                                     |
| 7      | (read) | U8   | 1     |         |     |     | fix_type                                                                   |
| 8      | (read) | U8   | 1     |         |     |     | satellites_in_view                                                         |
| 9      | (read) | U16  | 2     |         |     |     | horizontal_pos_accuracy - convert cm to mm                                 |
| 11     | (read) | U16  | 2     |         |     |     | vertical_pos_accuracy - convert cm to mm                                   |
| 13     | (read) | U16  | 2     |         |     |     | horizontal_vel_accuracy - convert cm to mm                                 |
| 15     | (read) | U16  | 2     |         |     |     | hdop in 4.4 and earlier, pdop in 4.5 and above                             |
| 17     | (read) | U32  | 4     |         |     |     |                                                                            |
| 21     | (read) | U32  | 4     |         |     |     |                                                                            |
| 25     | (read) | U32  | 4     |         |     |     | alt                                                                        |
| 29     | (read) | U32  | 4     |         |     |     | ned_vel_north                                                              |
| 33     | (read) | U32  | 4     |         |     |     | ned_vel_east                                                               |
| 37     | (read) | U32  | 4     |         |     |     | ned_vel_down                                                               |
| 41     | (read) | U16  | 2     |         |     |     | incoming value expected to be in centidegrees, output value in decidegrees |
| 43     | (read) | U16  | 2     |         |     |     | true_yaw                                                                   |
| 45     | (read) | U16  | 2     |         |     |     | year                                                                       |
| 47     | (read) | U8   | 1     |         |     |     | month                                                                      |
| 48     | (read) | U8   | 1     |         |     |     | day                                                                        |
| 49     | (read) | U8   | 1     |         |     |     | hour                                                                       |
| 50     | (read) | U8   | 1     |         |     |     | min                                                                        |
| 51     | (read) | U8   | 1     |         |     |     | sec                                                                        |

### MSP2_MOTOR_OUTPUT_REORDERING — 0x3001 — from FC

| Offset | Field   | Type | Bytes | Default | Min | Max | Notes |
| ------ | ------- | ---- | ----- | ------- | --- | --- | ----- |
| 0      | (value) | U8   | 1     |         |     |     |       |
| 1      | (value) | U8   | 1     |         |     |     |       |

### MSP2_SET_MOTOR_OUTPUT_REORDERING — 0x3002 — to FC

| Offset | Field  | Type | Bytes | Default | Min | Max | Notes              |
| ------ | ------ | ---- | ----- | ------- | --- | --- | ------------------ |
| 0      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 1      | (read) | U8   | 1     |         |     |     | deprecated/ignored |

### MSP2_SEND_DSHOT_COMMAND — 0x3003 — to FC

| Offset | Field  | Type | Bytes | Default | Min | Max | Notes              |
| ------ | ------ | ---- | ----- | ------- | --- | --- | ------------------ |
| 0      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 1      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 2      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 3      | (read) | U8   | 1     |         |     |     | deprecated/ignored |

### MSP2_GET_OSD_WARNINGS — 0x3005 — from FC

_returns active OSD warning message text_

| Offset | Field    | Type | Bytes | Default | Min | Max | Notes                     |
| ------ | -------- | ---- | ----- | ------- | --- | --- | ------------------------- |
| 0      | (value)  | U8   | 1     |         |     |     | see displayPortSeverity_e |
| 1      | (string) | str  | ?     |         |     |     | string data               |

### MSP2_GET_TEXT — 0x3006 — from FC

| Offset | Field    | Type | Bytes | Default | Min | Max | Notes       |
| ------ | -------- | ---- | ----- | ------- | --- | --- | ----------- |
| 0      | (value)  | U8   | 1     |         |     |     |             |
| 1      | (string) | str  | ?     |         |     |     | string data |

### MSP2_SET_TEXT — 0x3007 — to FC

| Offset | Field  | Type | Bytes | Default | Min | Max | Notes              |
| ------ | ------ | ---- | ----- | ------- | --- | --- | ------------------ |
| 0      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 1      | (read) | U8   | 1     |         |     |     | deprecated/ignored |

### MSP2_GET_LED_STRIP_CONFIG_VALUES — 0x3008 — from FC

| Offset | Field                  | Type | Bytes | Default | Min | Max         | Notes |
| ------ | ---------------------- | ---- | ----- | ------- | --- | ----------- | ----- |
| 0      | ledstrip_brightness    | U8   | 1     | 100     | 5   | 100         |       |
| 1      | ledstrip_rainbow_delta | U16  | 2     | 0       | 0   | HSV_HUE_MAX |       |
| 3      | ledstrip_rainbow_freq  | U16  | 2     | 120     | 1   | 2000        |       |

### MSP2_SET_LED_STRIP_CONFIG_VALUES — 0x3009 — to FC

| Offset | Field                  | Type | Bytes | Default | Min | Max         | Notes |
| ------ | ---------------------- | ---- | ----- | ------- | --- | ----------- | ----- |
| 0      | ledstrip_brightness    | U8   | 1     | 100     | 5   | 100         |       |
| 1      | ledstrip_rainbow_delta | U16  | 2     | 0       | 0   | HSV_HUE_MAX |       |
| 3      | ledstrip_rainbow_freq  | U16  | 2     | 120     | 1   | 2000        |       |

### MSP2_SENSOR_CONFIG_ACTIVE — 0x300a — from FC

| Offset | Field   | Type | Bytes | Default | Min | Max | Notes |
| ------ | ------- | ---- | ----- | ------- | --- | --- | ----- |
| 0      | (value) | U8   | 1     |         |     |     |       |
| 1      | (value) | U8   | 1     |         |     |     |       |
| 2      | (value) | U8   | 1     |         |     |     |       |
| 3      | (value) | U8   | 1     |         |     |     |       |
| 4      | (value) | U8   | 1     |         |     |     |       |
| 5      | (value) | U8   | 1     |         |     |     |       |
| 6      | (value) | U8   | 1     |         |     |     |       |
| 7      | (value) | U8   | 1     |         |     |     |       |
| 8      | (value) | U8   | 1     |         |     |     |       |
| 9      | (value) | U8   | 1     |         |     |     |       |
| 10     | (value) | U8   | 1     |         |     |     |       |
| 11     | (value) | U8   | 1     |         |     |     |       |

### MSP2_MCU_INFO — 0x300c — from FC

| Offset | Field    | Type | Bytes | Default | Min | Max | Notes       |
| ------ | -------- | ---- | ----- | ------- | --- | --- | ----------- |
| 0      | (value)  | U8   | 1     |         |     |     |             |
| 1      | (string) | str  | ?     |         |     |     | string data |

### MSP2_GYRO_SENSOR_ACTIVE — 0x300d — from FC

| Offset | Field   | Type | Bytes | Default | Min | Max | Notes |
| ------ | ------- | ---- | ----- | ------- | --- | --- | ----- |
| 0      | (value) | U8   | 1     |         |     |     |       |
| 1      | (value) | U8   | 1     |         |     |     |       |

### MSP2_BATTERY_PROFILE — 0x300e — from FC

| Offset | Field                        | Type | Bytes | Default | Min                        | Max                        | Notes |
| ------ | ---------------------------- | ---- | ----- | ------- | -------------------------- | -------------------------- | ----- |
| 0      | (value)                      | U8   | 1     |         |                            |                            |       |
| 1      | vbatmincellvoltage           | U16  | 2     |         | VBAT_CELL_VOTAGE_RANGE_MIN | VBAT_CELL_VOTAGE_RANGE_MAX |       |
| 3      | vbatmaxcellvoltage           | U16  | 2     |         | VBAT_CELL_VOTAGE_RANGE_MIN | VBAT_CELL_VOTAGE_RANGE_MAX |       |
| 5      | vbatwarningcellvoltage       | U16  | 2     |         | VBAT_CELL_VOTAGE_RANGE_MIN | VBAT_CELL_VOTAGE_RANGE_MAX |       |
| 7      | vbatfullcellvoltage          | U16  | 2     |         | VBAT_CELL_VOTAGE_RANGE_MIN | VBAT_CELL_VOTAGE_RANGE_MAX |       |
| 9      | batteryCapacity              | U16  | 2     |         | 0                          | 20000                      |       |
| 11     | forceBatteryCellCount        | U8   | 1     |         | 0                          | 24                         |       |
| 12     | consumptionWarningPercentage | U8   | 1     |         | 0                          | 100                        |       |

### MSP2_SET_BATTERY_PROFILE — 0x300f — to FC

| Offset | Field  | Type | Bytes | Default | Min | Max | Notes              |
| ------ | ------ | ---- | ----- | ------- | --- | --- | ------------------ |
| 0      | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 1      | (read) | U16  | 2     |         |     |     |                    |
| 3      | (read) | U16  | 2     |         |     |     |                    |
| 5      | (read) | U16  | 2     |         |     |     |                    |
| 7      | (read) | U16  | 2     |         |     |     |                    |
| 9      | (read) | U16  | 2     |         |     |     |                    |
| 11     | (read) | U8   | 1     |         |     |     | deprecated/ignored |
| 12     | (read) | U8   | 1     |         |     |     | deprecated/ignored |

### MSP2_CLI_SETTING — 0x3010 — from FC

| Offset | Field           | Type  | Bytes | Default | Min | Max | Notes                |
| ------ | --------------- | ----- | ----- | ------- | --- | --- | -------------------- |
| 0      | (variable data) | bytes | ?     |         |     |     | variable-length data |

### MSP2_CLI_SETTING_INFO — 0x3011 — from FC

| Offset | Field   | Type | Bytes | Default | Min | Max | Notes                     |
| ------ | ------- | ---- | ----- | ------- | --- | --- | ------------------------- |
| 0      | (value) | U16  | 2     |         |     |     | placeholder, filled below |

<!-- MSP_DETAIL_END -->

## Implementation Notes

- For each `MSP_<NAME>` (read) there is usually a corresponding `MSP_SET_<NAME>` (write)
- API version is negotiated via `MSP_API_VERSION` (code 1) at connection time
- MSP v2 Betaflight-specific commands start at `0x3000`; cross-firmware common commands at `0x1000`
- For complete payload documentation see [MSP Extensions](/docs/development/API/MSP-Extensions) and the firmware source

## Further Reading

- [MSP Extensions](/docs/development/API/MSP-Extensions) — detailed payload documentation for selected commands
- `src/main/msp/msp.c` — all MSP handler implementations
- `src/main/msp/msp_protocol.h` — v1 code definitions
- `src/main/msp/msp_protocol_v2_betaflight.h` — Betaflight v2 extensions

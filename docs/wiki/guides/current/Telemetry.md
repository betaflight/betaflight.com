# Telemetry

_Last updated: 2026-07-01_

Telemetry is information sent back to your RC transmitter via the RC data link. For example, telemetry allows for your RC transmitter to read out your main battery voltage or RSSI. For telemetry to work your RC receiver and transmitter must support it. The specific data that Betaflight will send via telemetry depends on the telemetry protocol being used.

Telemetry can be either always on, or enabled when armed. If a serial port for telemetry is shared with other functionality then telemetry will only be enabled when armed on that port.

## Crossfire (CRSF)

Here is the set of telemetry fields sent via the Crossfire protocol.

| Datapoint | Description                                           | Data unit                     | Data Source Id | SubId |
| --------- | ----------------------------------------------------- | ----------------------------- | -------------- | ----- |
| 1RSS      | Uplink - received signal strength antenna 1 (RSSI)    | db                            | LINK ID        | 0     |
| 2RSS      | Uplink - received signal strength antenna 2 (RSSI)    | db                            | LINK ID        | 1     |
| RQLY      | Uplink - link quality (valid packets)                 | %                             | LINK ID        | 2     |
| RSNR      | Uplink - signal-to-noise ratio                        | db                            | LINK ID        | 3     |
| ANT       | Antenna                                               | raw                           | LINK ID        | 4     |
| RFMD      | Uplink - update rate; 0 = 4Hz; 1 = 50Hz; 2 = 150Hz    | raw                           | LINK ID        | 5     |
| TPWR      | Uplink - transmitting power                           | mW                            | LINK ID        | 6     |
| TRSS      | Downlink - signal strength antenna (radio controller) | db                            | LINK ID        | 7     |
| TQLY      | Downlink - link quality (valid packets)               | %                             | LINK ID        | 8     |
| TSNR      | Downlink - signal-to-noise ratio                      | db                            | LINK ID        | 9     |
| GPS       | GPS Coordinates                                       | lat + lon                     | GPS_ID         | 0     |
| GSpd      | GPS ground speed                                      | kmh                           | GPS_ID         | 2     |
| Hdg       | Magnetic orientation / heading                        | deg                           | GPS_ID         | 3     |
| Alt       | GPS Altitudes                                         | m                             | GPS_ID         | 4     |
| Sats      | GPS Satellites acquired                               | raw                           | GPS_ID         | 5     |
| RxBt      | Battery voltage (or average cell voltage, see below)  | V                             | BATTERY_ID     | 0     |
| Curr      | Current draw                                          | A                             | BATTERY_ID     | 1     |
| Capa      | Current consumption                                   | mAh                           | BATTERY_ID     | 2     |
| Bat%      | Battery remaining                                     | %                             | BATTERY_ID     | 3     |
| Ptch      | FC pitch angle                                        | radians                       | ATTITUDE_ID    | 0     |
| Roll      | FC roll angle                                         | radians                       | ATTITUDE_ID    | 1     |
| Yaw       | FC yaw angle                                          | radians                       | ATTITUDE_ID    | 2     |
| FM        | Flight mode                                           | [See below](#crsf-flightmode) | FLIGHT_MODE_ID | 0     |

RxBt normally reports total pack voltage, but if the `report_cell_voltage` CLI setting is enabled it instead reports the average per-cell voltage.

In addition to the datapoints above, Betaflight sends a **Vario Sensor** frame (vertical speed) when vario telemetry is enabled with a barometer or GPS fitted, and a **Baro Altitude** frame (barometric altitude + vertical speed) when a barometer is fitted and altitude telemetry is enabled. Both are part of the original CRSF sensor set and, like the datapoints above, are decoded and displayed by CRSF-capable radios.

### CRSF flightmode

| Flight Mode | Meaning                          |
| ----------- | -------------------------------- |
| !FS!        | Failsafe mode                    |
| RTH         | GPS Rescue (Return To Home) mode |
| PASS        | Passthru mode                    |
| ANGL        | Angle mode                       |
| POSH        | Position Hold mode               |
| ALTH        | Altitude Hold mode               |
| HOR         | Horizon mode                     |
| CHIR        | Chirp mode                       |
| AIR         | Air mode                         |
| ACRO        | Acro mode (default)              |

While disarmed (and not in failsafe), one of the following characters is appended to the flight mode string:

| Suffix | Meaning                                             |
| ------ | --------------------------------------------------- |
| \*     | Ready to arm                                        |
| !      | Arming disabled                                     |
| ?      | GPS Rescue configured but not enough satellites/fix |

### AHRS / companion-computer telemetry frames

Betaflight can also send the following [CRSF spec](https://github.com/tbs-fpv/tbs-crsf-spec/blob/main/crsf.md) frames, see [`crsf.c`](https://github.com/betaflight/betaflight/blob/master/src/main/telemetry/crsf.c) for the exact payloads. These were added to feed full-resolution flight data to companion computers and AHRS consumers (e.g. an ArduPilot bridge) rather than for the pilot to read directly, and as newer additions to the CRSF spec are not currently decoded into named sensors by most radios.

| Frame        | Description                                         | Sent when                                                                    |
| ------------ | --------------------------------------------------- | ---------------------------------------------------------------------------- |
| Baro         | Raw barometer pressure and temperature              | Barometer fitted (CRSF v3 sends this on its own timed schedule)              |
| Mag          | Raw compass field strength on the X/Y/Z axes        | Compass fitted                                                               |
| GPS Time     | UTC date/time from the GPS receiver                 | GPS fitted and disarmed (CRSF v3 only, resent every 30s)                     |
| GPS Extended | GPS fix type, NED velocity, and accuracy/DOP data   | GPS fitted (CRSF v3 only)                                                    |
| AccGyro      | Raw gyro/accelerometer samples and gyro temperature | `crsf_tlm_accgyro` enabled, CRSF v3 running, and a gyro/accelerometer fitted |

## Using MAVLink telemetry to connect Betaflight to Mission Planner ground control station

[MAVLink-ELRS mode](/docs/wiki/guides/current/MAVLinkELRS)

### Other protocols

## Smartport protocol

SmartPort is a telemetry system used by FrSky transmitters and receivers such as the Taranis/XJR and X8R, X6R, X4R(SB).

For the full set of SmartPort sensor IDs transmitted by Betaflight, see the [firmware source](https://github.com/betaflight/betaflight/blob/master/src/main/telemetry/smartport.c).

All telemetry protocols can be inspected here : https://github.com/betaflight/betaflight/tree/master/src/main/telemetry

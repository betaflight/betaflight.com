# Telemetry

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
| RxBt      | Battery voltage                                       | V                             | BATTERY_ID     | 0     |
| Curr      | Current draw                                          | A                             | BATTERY_ID     | 1     |
| Capa      | Current consumption                                   | mAh                           | BATTERY_ID     | 2     |
| Bat%      | Battery remaining                                     | %                             | BATTERY_ID     | 3     |
| Ptch      | FC pitch angle                                        | radians                       | ATTITUDE_ID    | 0     |
| Roll      | FC roll angle                                         | radians                       | ATTITUDE_ID    | 1     |
| Yaw       | FC yaw angle                                          | radians                       | ATTITUDE_ID    | 2     |
| FM        | Flight mode                                           | [See below](#crsf-flightmode) | FLIGHT_MODE_ID | 0     |

#### CRSF flightmode

| Flight Mode | Meaning             |
| ----------- | ------------------- |
| !FS         | Failsafe mode       |
| RTH         | Return To Home mode |
| MANU        | Passthru mode       |
| ACRO        | ACRO mode           |
| STAB        | Angle mode          |
| HOR         | Horizon mode        |
| AIR         | Air mode            |
| WAIT        | Wait for GPS lock   |
| appended \* | FC is not ARMED     |

### Smartport protocol

SmartPort is a telemetry system used by FrSky transmitters and receivers such as the Taranis/XJR and X8R, X6R, X4R(SB).

For the full set of SmartPort sensor IDs transmitted by Betaflight, see the [firmware source](https://github.com/betaflight/betaflight/blob/master/src/main/telemetry/smartport.c).

### Using MAVLink telemetry to connect Betaflight to Mission Planner ground control station

[MAVLink-ELRS mode](/docs/wiki/guides/current/MAVLinkELRS)

### Other protocols

All telemetry protocols can be inspected here : https://github.com/betaflight/betaflight/tree/master/src/main/telemetry

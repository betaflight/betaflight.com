---
id: MATEKF405CTR
---

# Matek F405-CTR

Full details on the Matek Sys F405-CTR can be found on the Matek Website: [mateksys.com/?portfolio=f405-ctr](http://www.mateksys.com/?portfolio=f405-ctr). Betaflight Target: `MATEKF405`

## Hardware Specs

- _Mass:_ ~10g
- _PCB Size:_ 36x46mm
  - 30x30mm Hole pattern (M4 size, M3 size with rubber isolators)

### FC Specs

- Processors and Sensors
  - _MCU:_ [STM32F405RGT6](http://www.st.com/content/ccc/resource/technical/document/datasheet/ef/92/76/6d/bb/c2/4f/f7/DM00037051.pdf/files/DM00037051.pdf/jcr:content/translations/en.DM00037051.pdf)
  - _IMU:_ [MPU6000](https://www.invensense.com/wp-content/uploads/2015/02/MPU-6000-Datasheet1.pdf) (connected via SPI)
  - _Baro:_ [BMP280](https://ae-bst.resource.bosch.com/media/_tech/media/datasheets/BST-BMP280-DS001-19.pdf) (connected via I2C)
  - _OSD:_ BetaFlight OSD (AT7456E IC)
- _Blackbox:_ MicroSD card slot (SD/SDHC)
- 5 UARTs

### Integrated PDB Specs

- _Input:_ 6-30v (3-6S LiPo) w/TVS protection
- _ESC Pads:_ Rated 4x30A per ESC pad set (4x46A burst)
- Voltage Regulators:
  - _5v BEC:_ 2A continuous load (3A burst)
  - _3.3v LDO:_ max load: 300mA
- Power Sense:
  - _Current Sensor:_ Rated for 184A (_Suggested scale value `179`_)
  - _Voltage Sensor:_ 1:10 signal output ratio (_Suggested scale value `110`_)

## Status LEDs

|           LED | Color | Color Codes                                                                                                                                                                                                             |
| ------------: | ----- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     FC Status | Blue  | **Unlit:** USB disconnected and disarmed, <br/> **Lit:** USB disconnected and armed, <br/> **Flashing:** USB connected and disarmed, <br/> **5x Rapid Flash then Flashing:** USB connected and arming command prevented |
| Accelerometer | Red   | Accelerometer status (Lit: active, Unlit: inactive)                                                                                                                                                                     |
|    3v3 Status | Red   | Red: active, Unlit: inactive                                                                                                                                                                                            |

## Pinout

Pads are organised into two large banks of pads on left and right sides of board with a couple sets of pads on the underside of the board and ESC related connections near the board corners.

```
          __________
         /  U    U  \
/-----------------------------\
|oE                         Eo|
|SC                         SC|
|                             |
| P                        P  |
| A                        A  |
| D                        D  |
| S                        S  |
|                             |
|ES                         ES|
|oC                         Co|
\------------[USB]------------/
```

> **NOTE:** Pads `TX2`, `S5` and `S6` support `softserial` and may be configured as such

> **NOTE:** Under normal operation, the use of the Barometer `I2C1` bus (internal) and the WS2812 `LED` signal pad are mutually exclusive due to a pad mapping conflict. However, the `LED_STRIP` feature may be remapped to the `S5` (`PA15`) pad to avoid this conflict.
>
> _I.e._ Type `resource LED_STRIP 1 A15` into the CLI.

| Pad Silkscreen Label | Function      | Notes                                                                                         |
| -------------------: | ------------- | :-------------------------------------------------------------------------------------------- |
|              `+ / -` | Battery In    | 6-30vDC LiPo Power input (_Battery +/- and 4-in-1 ESC +/- pads_)                              |
|              `S1-S6` | ESC Out       | (_1-4 near ESC power connections, 5-6 on front_) Supports PWM, Oneshot, Multishot, DSHOT      |
|     `5V, GND, S1-S4` | ESC Out       | (_Rear of board_) 4-in-1 ESC Out                                                              |
|           `VBT, GND` | VBT Out       | VBAT power pad (_marked for VTX, but could be used for whatever_)                             |
|               `CURR` | Current Sense | Current Sensor I/O pin (_output from onboard sensor or input from external sensor_)           |
|                 `5V` |               | Out from internal 5v BEC (_rated 2A continuous, 3A burst_)                                    |
|                `3V3` |               | Out from 3v3 regulator (_rated 300mA_)                                                        |
|                `4V5` |               | Out from 4v4~4v8 regulator (_unknown rating, power is also supplied when connected via USB_)  |
|                  `G` | GND           |                                                                                               |
|                `LED` | WS2812 Signal |                                                                                               |
|            `Bz-, 5V` | Buzzer        |                                                                                               |
|               `Rssi` | RSSI          | FrSky RSSI input from RX                                                                      |
|   `G, 3V3, SDA, SLC` | I2C           | (_Rear of board_) I2C connection marked for a magnetometer but could be used for whatever     |
|      `VTX, Cam, DAC` | VTX/CAM       | VTX: Video out, Cam: Video in, DAC: Cam control pin (_since BF3.3, may be resourced to `S6`_) |
|           `RX1, TX1` | UART1         |                                                                                               |
|                `TX2` | UART2-TX      | May be reassigned to `softserial1` for use as FrSky SmartPort pad                             |
|                `RX2` | UART2-RX      | RX connection for Spektrum DSMX or DSM2, FlySky iBUS, or PPM (_Disable `UART2` for PPM_)      |
|               `Sbus` | SBUS (UART2)  | Dedicated pad for SBUS (_duplicate pad of `RX2` with signal inverter_)                        |
|           `RX3, TX3` | UART3         |                                                                                               |
|           `RX4, TX4` | UART4         |                                                                                               |
|           `RX5, TX5` | UART5         |                                                                                               |
|                `RX5` | UART5-RX      | (_One per board corner_) Duplicates of RX5 pad for ESC Telemetry                              |

### UARTs + VCP

|  Port | Default Assigned Role |
| ----: | --------------------- |
|   VCP | microUSB Port         |
| UART1 | _Unassigned_          |
| UART2 | RX Connection         |
| UART3 | _Unassigned_          |
| UART4 | _Unassigned_          |
| UART5 | ESC Telemetry         |

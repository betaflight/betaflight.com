# MATEKSYS F722-SE

Full details on the MATEKSYS F722-SE can be found on the Matek Website: [mateksys.com/?portfolio=f722-se](http://www.mateksys.com/?portfolio=f722-se). Betaflight Target: `MATEKF722SE`

## Hardware Specs

- _Mass:_ ~10g
- _PCB Size:_ 36x46mm
  - 30x30mm Hole pattern (M4 size, M3 size with rubber isolators)

### FC Specs

- Processors and Sensors
  - _MCU:_ STM32F722RET6
  - _IMU:_ MPU6000(Gyro1) & ICM20602(Gyro2) connected via SPI1
  - _Baro:_ BMP280 (connected via I2C1)
  - _OSD:_ BetaFlight OSD (AT7456E connected via SPI2)
- _Blackbox:_ MicroSD card slot (connected via SPI3)
- 5 UARTs (1,2,3,4,6)
- 8 DShot outputs
- 2 PINIO (VTX power switcher/user1 and 2 camera switcher/user2)

### Integrated PDB Specs

- _Input:_ 6-36v (3-8S LiPo)
- _ESC Pads:_ Rated 4x35A per ESC pad set (4x46A burst)
- Voltage Regulators:
  - _5v BEC:_ 2A continuous load (3A burst)
  - _3.3v LDO:_ max load: 200mA
- Power Sense:
  - _Current Sensor:_ Rated for 184A (_Suggested scale value `179`_)
  - _Voltage Sensor:_ 1:10 signal output ratio (_Suggested scale value `110`_)

## Status LEDs

|    LED | Color | Color Codes |
| -----: | ----- | :---------- |
|   LED0 | Blue  | FC Status   |
|   LED1 | Green | FC Status   |
| LED3.3 | Red   | 3v3 Status  |

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

| Pad Silkscreen Label | Function      | Notes                                                                                         |
| -------------------: | ------------- | :-------------------------------------------------------------------------------------------- |
|              `+ / -` | Battery In    | 6-36vDC LiPo Power input (_Battery +/- and 4-in-1 ESC +/- pads_)                              |
|              `S1-S8` | ESC Out       | (_1-4 near ESC power connections, 5-8 on right side_) Supports PWM, Oneshot, Multishot, DSHOT |
|         `GND, S1-S4` | ESC Out       | (_Rear of board_) 4-in-1 ESC Out                                                              |
|           `VBat GND` | VBAT Out      | VBAT power pad (_marked for VTX_), power ON/OFF can be switched via PINIO1(PC8)               |
|               `CURR` | Current Sense | Current Sensor I/O pin (_output from onboard sensor or input from external sensor_)           |
|                 `5V` |               | Out from internal 5v BEC (_rated 2A continuous, 3A burst_)                                    |
|                `3V3` |               | Out from 3v3 regulator (_rated 200mA_)                                                        |
|                `4V5` |               | Out from 4v4~4v8, 0.5A (_power is also supplied when connected via USB_)                      |
|                  `G` | GND           |                                                                                               |
|                `LED` | WS2812 Signal |                                                                                               |
|            `Bz-, 5V` | Buzzer        |                                                                                               |
|             `CL, DA` | I2C1          | I2C connection marked for a magnetometer but could be used for whatever                       |
|                `VTX` | VTX           | VTX: Video out                                                                                |
|              `C1/C2` | Camera        | C1: camera-1 IN, C1: camera-2 IN, 2 camera video can be switched via PINIO2(PC9)              |
|           `RX1, TX1` | UART1         |                                                                                               |
|                `TX2` | UART2-TX      |                                                                                               |
|                `RX2` | UART2-RX      | RX connection for Spektrum DSMX or DSM2, FlySky iBUS, or PPM (_Disable `UART2` for PPM_)      |
|           `RX3, TX3` | UART3         | TX3 can be used for VTX control                                                               |
|           `RX4, TX4` | UART4         | RX4 pin `PA1` can be remapped for camera control(PWM)                                         |
|                `TX6` | UART6-TX      |                                                                                               |
|                `RX6` | UART6-RX      | (_One per board corner_) Duplicates of RX6 pad for ESC Telemetry                              |
|               `Rssi` | RSSI          | FrSky RSSI input from RX (_Rear of board_)                                                    |
|               `PA4 ` | ADC/DAC       | EXTERNAL1*ADC_PIN (\_Rear of board*)                                                          |
|       `D+, D-. VBus` | USB pins      | (_Rear of board_)                                                                             |

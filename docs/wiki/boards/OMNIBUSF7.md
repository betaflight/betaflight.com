# OMNIBUS F7

### V2 support

#### Firmware target

For OMNIBUS F7 V2, please use **OMNIBUSF7V2** target, available in 3.2RC-4 and later.

#### ESC Mid Rail and ESC Telemetry Jumper Block

- ESC Mid Rail can be configured either as (a) 5V INPUT rail or (b) ESC telemetry input to UART7_RX(RX7).
- Current sensing uses pin7 of J3 connector. This pin can be used as (c) voltage (0-3V3) encoded current sensor output suitable for input to ADC, or (d) ESC telemetry input to UART7_RX(RX7).
- These functions should be selected with two jumper blocks, as described in the drawing below.

![](https://user-images.githubusercontent.com/14850998/29853571-abed2e8c-8d7b-11e7-81ac-2eaf86052bda.jpg)

---

## Features

F7 + OSD

- OSD
- SPI Gyro ICM-20608-G (SPI1)
- SPI Gyro MPU6000 (SPI3)
- STM32 F745 MCU
  - F7 MCUs have an integrated inverter, like the STM32F3
- SBUS/PPM input
- 4PWM output, DSHOT enabled
- BMP280 BARO
- VBAT sensor (voltage divider)
- External current sensor and RSSI ADC ready
- SDCARD

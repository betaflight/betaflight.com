---
id: AIRBOTF4
---

# AirBotF4 and FLIP32F4

Flip32F4 and AirBotF4 are essentially the same. Both are based on the OP Revolution design, with some changes and addons.

## Firmware targets

For boards with a SDCARD holder, use AIRBOTF4SD. Otherwise, use AIRBOTF4.

## Board specific 3.2 changes

LED strip has been changed to MCU pin PB6, which is connected to designated LED signal pin on most Airbot/FLIP32 F4 boards. Try rewiring your LEDs to the pin.

If you choose to keep the current wiring, you can do so by entering the CLI command

```
resource motor 5 none
resource led_strip a1
```

## Dual gyro boards

With dual gyro variant of the AirbotF4 and FLIP32F4 (e.g. FLIP32-F4-DUAL GYRO EDITION), gyro to use can be selected by CLI variable `gyro_to_use`.

```
set gyro_to_use = 0 # Selects MPU6000
set gyro_to_use = 1 # Selects ICM2060x
```

## Serial RX UART and programmable inverters on Airbot F4 variants

Applicable to post-3.1.7 builds

| Board               | Serial RX | Inverter CLI Command                                       |
| ------------------- | --------- | ---------------------------------------------------------- |
| Airbot F4 MPU9250   | UART1     | `resource inverter 1 a10`                                  |
| Airbot F4 Nano      | UART3     | `resource inverter 3 a8`                                   |
| Airbot F4 Dual Gyro | UART6     | `resource inverter 6 d2` (default for `AIRBOTF4SD` target) |

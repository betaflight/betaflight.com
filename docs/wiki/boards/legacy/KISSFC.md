# KISSFC

_Keep It Simple Stupid._

## Description

KISSFC is a STM32F3 based flight controller with integrated voltage regulator, brushed motor drivers and a shared PPM/UART RX input pin.

## MCU, Sensors and Features

### Hardware

- MCU: STM32F3
- IMU: MPU6050
- IMU Interrupt: Yes
- BARO: No
- VCP: Yes
- Hardware UARTS: 3
- Soft-serials: 2
- OSD: No
- Blackbox: Yes, External blackbox device connected to UART1 (use PORT2 connector or TX/RX pads)
- PPM/UART Shared: UART2
- Battery Voltage Sensor: Yes, directly connected, no wiring necessary
- Integrated Voltage Regulator: Yes, unknown voltage limit
- Brushed Motor Mosfets: Yes
- Buttons: 1 - DFU

### Features

- Current Sensor: Yes (as of BF 3.1.6)
- BlHeli passthrough: No (due to buffered outputs)
- WS2811 Led Strip: Yes (as of BF 3.1)
- Transponder: No

### KISS FC Betaflight additional features pad assigments

| PAD ON KISS FC | PIN ON MCU | BF FEATURE     |
| -------------- | ---------- | -------------- |
| PITCH          | A02        | Current sensor |
| PWM5 (Motor 5) | A06        | LED strip      |
| AUX1           | A13        | Softserial 1   |
| ROLL           | A15        | Softserial 2   |

Softserial pad assignment can be changed with the `resource` command. Current sensor and LED strip assignments are hard-coded and can not be changed runtime at the moment.
By default the pads are assigned to their original function (see pad name) and need to be freed to be able to assign one of the alternate features shown in the table above.

First free all (or some) resources:

`resource PWM 2 NONE`

`resource PWM 3 NONE`

`resource PWM 4 NONE`

`resource PWM 5 NONE`

Assign resources for soft-serial:

`resource SERIAL_TX 11 A13`

`resource SERIAL_TX 12 A15`

## Hardware Designs (if available)

## Manufacturers and Distributors

[Flyduino.net](https://flyduino.net)

Available here: http://flyduino.net/KISS-FC-32bit-Flight-Controller-V103_1

## Designers

_(add your name here if you conributed to the design of this board)_

[fedorcomander](https://github.com/fedorcomander)

## Maintainers

_(add your name here if you help test or contribute code for this board)_

## Similar Targets

_(add links board descriptions here that are similar in features or function, but have a separate target)_

## Variants

_(add links to boards here that are similar in features or function, but use this target when flashing)_

## FAQ & Known Issues

_(add FAQs, known issues and workarounds specifically related to this board. please link work in progress issues to the related github issue or pull request)_

### Maximum gyro update / PID loop frequency

The KISS FC features an onboard MPU6050 gyro that is connected with I2C and is thereby limited to 4kHz gyro update frequency and 4kHz PID loop frequency.

### ESC Telemetry (ESC Sensor)

When using KISS 24RE ESCs, you use the ESC telemetry by connecting the ESC telemetry wire to the TLM pads on the KISS FC board.
To get ESC telemetry working with the TLM pads when using pre-BF 3.2, you will need to solder-bridge the TX3/RX3 pads on the bottom of the KISS FC board. In BF 3.2 the solder-bridge is not needed any more, with CLI command is `set esc_sensor_halfduplex = ON` you can set the UART to except TX and RX signals on the same pad.

How to enable/use ESC Telemetry:

1. Create solder-brigde between TX3/RX3 on the bottom of the KISS FC board.
2. Connect ESC telemetry wires to the TLM pads
3. Start the Betaflight App
4. Open Ports Tab
5. Select `ESC` for `Sensor Input` on `UART3`.
6. Hit Save & Reboot.
7. Open Configuration Tab
8. Enable `VBAT_SENSOR` feature. Select `ESC Sensor` for `Voltage Meter Type`
9. Enable `CURRENT_SENSOR` feature. Select `ESC Sensor` for `Current Meter Type`.
10. Hit Save & Reboot.

### Motor order

KISS original firmware uses another motor layout pattern than Betaflight uses. There is no need to resolder the motors anymore. Betaflight has an build-in mixer to assign the right motor to the right pad, just solder the motors to the correspondig pads (Motor 1 -> PWM1, Motor 2 -> PWM2, ...). Betaflight will do the rest.

## Other Resources

Pinouts, schematics and RX wiring: http://nathan.vertile.com/blog/2016/07/29/betaflight-kiss-flight-controller/#pinout

Rcgroups Thread: http://www.rcgroups.com/forums/showthread.php?t=2555204

## Image

![](https://cdn3.volusion.com/zzpvf.kmsuu/v/vspfiles/photos/elec-fc-kiss103-4.jpg)

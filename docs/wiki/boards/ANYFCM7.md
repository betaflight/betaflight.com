## Description

Opensource (CC BY-SA 3.0) STM32F7 based flightcontroller designed for BetaFlight and InavFlight usage.
Source: https://github.com/sambas/hw/tree/master/AnyFCM7

## MCU, Sensors and Features

### Hardware

- Size: 36x36mm (30.5x30.5 mounting holes)
- MCU: STM32F722RET6 64lqfp 216MHz
- IMU: MPU6000 SPI
- IMU Interrupt: Yes
- Baro: MS5611
- VCP: Yes
- Hardware UARTS: 4
- 10-pwm outputs
- 6-pwm inputs (PPM on input 1 and UART6 on input 3/4)
- Blackbox: 128MB DataFlash
- Battery Voltage Sensor: Yes, 10k/1k divider
- Solder pads for DFU boot
- External I2C for compass, pitot etc.
- External SPI shared on UART4/5 connector for future upgrades (osd, imu)

### Features

- BlHeli passthrough: Yes
- WS2811 Led Strip: Yes (mapped to output 4)

## Manufacturers and Distributors

## Designers

Sambas

## Maintainers

Sambas

## FAQ & Known Issues

## Other Resources

RC Groups Thread: https://www.rcgroups.com/forums/showpost.php?p=37189186&postcount=2

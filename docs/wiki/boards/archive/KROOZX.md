#KroozX

## Description

The KroozX combo is a combination of flight controller and 4in1 Blheli_S(BB2) ESC boards with a lot of useful features, like onboard OSD with 2 video channel switch, micro-SD card slot, 2 powerful BECs, LC filter for clear picture transmission and many more. It utilizes powerful SMT32F4 processor and two inertial sensors: MPU6000 (SPI bus) and ICM20608 (I2C bus), which gives an opportunity to build a highly responsible quadcopter with redundand IMU for more safety in flight. Proper wiring and schematics decreases the GYRO and GPS noise level, increasing the flight performance. An optional onboard HM-TRP or HC-12 (2 different board versions) transceiver enables wireless setup and control during flight.

## MCU, Sensors and Features

### Hardware

- MCU: STM32F4RGT6
- IMU: MPU6000 (SPI bus), ICM20608 (I2C bus)
- BARO: MS5611
- VCP: Yes
- Hardware UARTS: 5 (RX6, RX1/TX1 with onboard inverter)
- PWM outputs: 10
- OSD: MAX7456 with a switch for 2 video channel
- Blackbox: MicroSD card slot (SD/SDHC, up to 64GB)
- PPM/SBUS: RX6 with onboard inverter
- Wireless: optional HM-TRP or HC-12 onboard transceiver
- Battery Voltage Sensor: Yes, up to 6S input
- Current Sensor: Yes
- Integrated Voltage Regulator: 5V 2000mA, 10V 2000mA with LC filter
- Buttons: No (powering the board with plugged USB starts STM DFU bootloader)
- Buzzer driver: Yes
- RSSI Analog/PWM port: Yes
- SWD port: Yes (SWIO, SWCLK, RST pins)

### Features

- STM32F4 flight controller stacked with 4in1 20A Blheli_S(BB2) ESC combo
- Double gyro sensors
- 2 powerful integrated BECs
- 2 channel video switch
- Up to 6S input
- Dimension: 85x28x20mm / fixing hole spacing 32x18mm.
- Supports DShot.

## Manufacturers and Distributors

softsr (softsr@yahoo.de)

## Designers

softsr (softsr@yahoo.de)

## Maintainers

softsr

mikeller

#Images:

- KroozX

![](https://farm1.staticflickr.com/276/31024530144_e479538825_h.jpg)

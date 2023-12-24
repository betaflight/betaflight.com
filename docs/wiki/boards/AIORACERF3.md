# AIORACERF3

![AIORACERF3 Front](/img/boards/aioracerf3/aioracerf3_front.jpg)

![AIORACERF3 Back](/img/boards/aioracerf3/aioracerf3_back.jpg)

## Hardware

- MCU: STM32F303CCT6
- IMU: MPU9250(SPI)
- IMU interrupt: Yes
- BARO: BMP280(I2C)
- VCP: Yes
- Hardware UARTS: 3
- PWM input: No
- PWM outputs: 8
- OSD: Yes, Minim-OSD, connected to UART1
- Blackbox: MicroSD card slot (SD/SDHC, upto 64GB)
- PPM/UART Shared: UART2
- Serial-RX: selectable UART2/UART3
- Battery Voltage Sensor: Yes, onboard voltage divider
- Current Sensor: Provided by ARPDB (optional)
- Voltage converter: 3.3V/500mA buck converter
- IR-LED driver for ransponder: Yes
- Buzzer driver: Yes
- Buttons: 1/DFU
- RSSI Analog/PWM port: Yes
- SWD port: Yes

## Features

- The PWM solder pads close to the four corners, making it easier to connect the ESC signal lines.
- Gyro via SPI and 8K ready.
- Integrated Minim-OSD and FTDI debug socket.
- ZH 1.5-3P socket used for DSM/S.BUS. and others SRX receivers, it can be selected voltage 3.3V/5V on backside solder pads.
- WS2811 LED-strip supported.
- Optimized solder pads for optional ARPDB.
- Dimension: 35x35x7.4mm / fixing hole spacing 30mm.
- Supports DShot.
- ARPDB designed for ARF3 FC.
- Two types, Type-A with XT60 mounting holes and suitable for X-frame, Type-B is classic version.
- 3 oz copper for high current.
- Max input voltage / current sensing: 28V/90A.
- Back converter outputs: 5.3V/3.5A.

## Hardware Designs

- GPIO
- TX1:PA9/RX1:PA10
- TX2:PA14/RX2:PA15
- TX3:PB10/RX3:PB11
- MPU_CS:PB9
- MPU_SCK:PB3
- MPU_SDO:PB4
- MPU_SDI:PB5
- MPU_INT:PC13
- SCL:PB6
- SDA:PB7
- SD_CS:PB12
- SD_SCK:PB13
- SD_SDO:PB14
- SD_SDI:PB15
- SENS_I:PA4
- SENS_V:PA5
- RSSI:PB2
- PWM1:PB1
- PWM2:PA7
- PWM3:PA2
- PWM4:PA1
- PWM5:PB0
- PWM6:PA6
- PWM7:PA3
- PWM8:PA0

## Manufacturers and Distributors

- CRIUS
- [Available here](https://www.aliexpress.com/store/product/Crius-AIO-RACER-F3-Flight-Controller-with-OSD-for-Betaflight-firmware-ARPDB-Power-Distribution-Board-Output/604349_32729982152.html?spm=2114.12010608.0.0.TuYtnD)
- [And here](http://www.ebay.com/itm/AIO-RACER-F3-Flight-Controller-with-OSD-for-Betaflight-firmware-ARPDB-B-Board-/322266398060)

## Designers

CRIUS

## Maintainers

- Hardware: Eric Liang
- Software: tianbin4279 / lijingwei0710 / Michael Keller

## Similar Targets

- SPRACINGF3EVO

## Other Resources

- [Manual](https://dl.dropboxusercontent.com/u/584481/AIO_RACER_F3_Manual_D20160909.pdf)

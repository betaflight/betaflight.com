---
id: MATEKF405STD
---

# MATEKSYS F405-STD

## Description

F405+ICM20602, w/ Betaflight OSD & SD Card Slot

## MCU, Sensors and Features

### Hardware

- MCU: 168MHz STM32F405RGT6
- IMU: 32K ICM20602 gyro/accelerometer (SPI)
- Baro: BMP280 (I2C)
- OSD: BetaFlight OSD w/ AT7456E chip
- Blackbox: MicroSD card slot (SD/SDHC)
- VCP, UART1, UART2, UART3, UART4, UART5
- Built in inverter for SBUS input (UART2-RX)
- PPM/UART Shared: UART2-RX
- SoftSerial on TX2, S5 or S6 optional
- Camera control on S6 or DAC optional
- SmartAudio & Tramp VTX protocol supported
- Battery Voltage Sensor: 1:10
- Current Sensor: No (FCHUB-6S, FCHUB-VTX, FCHUB-W option)
- BEC 5V: No (FCHUB-6S, FCHUB-VTX, FCHUB-W option)
- LDO 3.3V: Max.300mA
- I2C1 SDA & SCL: Yes
- WS2812 Led Strip : Yes
- Beeper : Yes
- RSSI: Yes

### Features

- 3x LEDs for FC STATUS (Blue, Red) and 3.3V indicator(Red)
- 6x PWM / DShot outputs without conflict
- 2x 2812LED outputs option
- 5x UARTs
- 1x Group of 5V/G/S1/S2/S3/S4 pads for 4in1 ESC Signal/GND
- 4x pairs of corner pads for ESC Signal/GND connections (DSHOT compatible)
- 1x pair I2C1 pads
- 1x Side-press button for BOOT(DFU) mode
- 1x 16pin bottom mounted FFC Slot for FCHUB-6S, FCHUB-VTX or FCHUB-W connection
- 36x36mm PCB with 30.5mm mounting holes

w/ 2x 0.5mm\*16Pin 5cm Flexible Flat Cable and 4pcs M3 Anti-vibration Standoffs

## Manufacturers and Distributors

- Matek Systems
  - [F405-STD (NEW)](http://www.mateksys.com/?portfolio=f405-std)
  - [F405-CTR](http://www.mateksys.com/?portfolio=f405-ctr)
- Discontinued:
  - [F405-OSD](http://www.mateksys.com/?portfolio=f405-osd)
  - [F405-AIO](http://www.mateksys.com/?portfolio=f405-aio)
- BANGGOOD
  - [F405-STD (NEW)](https://www.banggood.com/Matek-F405-OSD-BetaFlight-STM32F405-Flight-Controller-Built-in-OSD-Inverter-for-RC-Multirotor-FPV-Racing-Drone-p-1141282.html)
  - [F405-CTR](http://www.banggood.com/Matek-Systems-BetaFlight-F405-AIO-STM32F405-Flight-Controller-Built-in-PDB-5V2A-9V2A-Dual-BEC-p-1165338.html)

## Designers

Matek Systems www.mateksys.com

## Maintainers

- Hardware: Matek Systems

## Tips

- Included rubber anti-vibration standoffs are necessary to avoid vibration issues.
- 2812LED_Strip share I2C1_SCL pad as default. Either enable LED_Strip, or enable Baro.
- 2812LED can be resourced to S7 (PB8) if using Baro the same time.
- Put a piece of sponge on the barometer to reduce the impact of airflow.

## FAQ & Known Issues

Setup Guide Matek F405-STD: http://www.mateksys.com/?portfolio=f405-std

Rcgroups Thread Matek F405: https://www.rcgroups.com/forums/showthread.php?2889298-MATEKSYS-Flight-Controller-F405-OSD-32K-Gyro-5xUARTs-SD-Slot

Matek FC Facebook Group: https://www.facebook.com/groups/1882519175321708/

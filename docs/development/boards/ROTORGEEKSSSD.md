# RG SSD

## Description

The Rotorgeeks SSD is an F3 based flight controller with best-in-class components, an intelligent layout and a great price.

It features native DSHOT support, MPU6000 (SPI), 5 UARTs, Onboard low-profile IR LEDs for integration into lap timing systems, high current 5V supply, direct battery connection up to 6S, MicroSD slot for blackbox.

## MCU, Sensors and Features

### Hardware

- MCU: STM32F303RCT6
- IMU: MPU6000 (SPI)
- IMU Interrupt: Yes
- BARO: No
- VCP: Yes
- Hardware UARTS: 5
- OSD: No
- Blackbox: Yes, micro SD
- PPM/UART Shared: UART2
- Battery Voltage Sensor: Yes, integrated
- Integrated Voltage Regulator: Yes, up to 6S
- Buttons: no

### Features

- IR LEDs for lap timing sytem
- Current Sensor: has input pin
- BlHeli passthrough: Yes
- WS2811 Led Strip: Yes, with 5V supply
- Transponder: see IR LEDs

## Hardware Designs (if available)

## Manufacturers and Distributors

[Rotorgeeks](http://rotorgeeks.com)

Available here: http://rotorgeeks.com/index.php?route=product/product&product_id=676

## FAQ & Known Issues

_(add FAQs, known issues and workarounds specifically related to this board. please link work in progress issues to the related github issue or pull request)_

- Voltage scale needs to be set to 119

- RCGroup post on Beeper connection: https://www.rcgroups.com/forums/showpost.php?p=36610466&postcount=14

- iLap and Easy Race Lap Timer
  Some progress is being made on the IR transponder. One of the guys we know has it running on a test board and is working to get it implemented. Looking at multi-protocol support.
  iLap and Easy Race Lap Timer (and another one I can't find much info about). ERLT is the one I really wanted to get going.
  https://github.com/betaflight/betaflight/issues/2131

It's working its way through github now. I think it might appear on Cleanflight first.
https://github.com/cleanflight/cleanflight/blob/master/docs/Transponder.md

## Other Resources

[Manual](http://rotorgeeks.com/download/RG_SSD_Manual.pdf)

RCG Thread:
https://www.rcgroups.com/forums/showthread.php?2805794-Rotorgeeks-SSD-F3-flight-controller

## Image

![](http://rotorgeeks.com/image/cache/data/electronics/FC/RG-SSD-top.800-800x600.jpg)
![](http://rotorgeeks.com/image/cache/data/electronics/FC/RG-SSD-bottom.800-800x600.jpg)
![](http://rotorgeeks.com/image/cache/data/electronics/FC/RG-SSD-top.labels.800-800x600.jpg)
![](http://rotorgeeks.com/image/cache/data/electronics/FC/RG-SSD-bottom.labels.800-800x600.jpg)

# AIO Betaflight F3 Flight controller

## Updates

### Timer mapping is modified (3.2) 2017-07-16

- Software serial no longer interfere with motors 1-4.
- Software serial pads/TH can be used for motors 5-6 (dshot enabled; hexa-dshot).
- In the hexa-dshot configuration, LED strip has DMA conflict with motor 5. Use of other timer resource, presumably PPM, is advised.

## Description

- OSD + PDB + SD card adapter

## MCU, Sensors and Features

### Hardware

_(Fill in hardware specs and add any not listed)_

- MCU: STM32F303CCT6
- IMU: MPU-6000
- IMU Interrupt:
- BARO: no
- USB: STM32 VCP
- Hardware UARTS: 3
- OSD: uses a AB7456 chip
- Blackbox: SD Card
- PPM/UART Shared:
- Battery Voltage Sensor: Yes
- Current sensor: 0.5 mOhm
- Integrated Voltage Regulator: 3A, 5V or 3V for RX and VBAT or 5V for VTX/camera with filtered AGND
- Buttons: BOOT button
- Software Serial broken out
- Weight: 5.4 grams

### Features

_(add list of features)_

## Manufacturers and Distributors

http://www.fpvmodel.com/-pre-order-betaflight-f3-flight-controller_g1231.html
https://strictlyracingdrones.com/shop/electronics/betaflightf3-flight-controller/

## Designers

- FPVModel
- Boris B

## Maintainers

_(add your name here if you help test or contribute code for this board)_

## Similar Targets

_(add links board descriptions here that are similar in features or function, but have a separate target)_

## Variants

## FAQ & Known Issues

_(add FAQs, known issues and workarounds specifically related to this board. please link work in progress issues to the related github issue or pull request)_

_format is reporter [name], (status): issue contents_

- The DSM2/SBUS pad is connected to RX2
- LED_STRIP conflicts with motor 2 in Betaflight 3.1.0. Upgrade to version 3.1.6+ to fix it.
- The ground plane acts as a heatsink, making the ground (-) pads difficult to solder to. Preheat the area you're working on with a hot air station at 100°C - 150°C (200°F - 300°F) to make soldering faster and easier
- SD card needs to be formatted to specific parameters
- Current sensor needs to be calibrated in BF software
- Filtered power rail(RAM) is weak
- osd and 16/9 cameras do produce flickers in the osd
- USB 5V power is connected to main 5V rail. If you have a lot of devices connected, e.g. buzzer, LED strip, Rx etc, USB might shut down. Power up on battery before connecting to USB in such cases.
- Status LED is inverted and connected in parallel with the beeper (PC15). So the light is on when beeper is quiet, and visa verse. A bit odd.

## Other Resources

## Issue fixes

### SD card:

Samsung Evo class 10 series, 16GB or 32GB seem to work better than others
(this may or may not work)

1. Format card in SDcardformatter v4
2. Insert card, flash BF 3.1.3 (on usb only no extra power)
3. Straight to CLI and set sdcard_dma=on
4. Card should initialize and the icon in the blackbox tab under the BF GUI should show it green
5. back to CLI and set sdcard_dma=off

### Current sensor:

There is a resistor that can be measured and scaling number can be calculated from that value.

picture of resistor in link below
it may be in a different place but should be around there
https://static.rcgroups.net/forums/attachments/5/9/3/2/6/3/a9650746-128-EDB2C10E-33D3-40BA-988A-6029EA696B4F.jpg

here is the procedure for calculating the value
https://www.rcgroups.com/forums/showthread.php?2798055-Understanding-Current-Meters

### Driver related problems

Some people have been complaining about computer(windows pc's) not being able to see the board.
In boot loader mode, the default STM USB-dfu driver needs to be replaced with the generic WinUSB driver the Firmware Flasher in configurator can use. Zadig or IRCDF does this job for you.
Zadig http://zadig.akeo.ie/
impulserc driver fixer https://impulserc.blob.core.windows.net/utilities/ImpulseRC_Driver_Fixer.exe (link to official irc site)
In normal mode, the STM VCP driver needs to be installed. http://www.st.com/en/development-tools/stsw-stm32102.html

This is in no way special or specific for this board. All FC's with a STM USB-VCP port behave like this. Read Installing-Betaflight

### remapping for motors

http://i.imgur.com/Mh41SmG.jpg

## Setup Guide:

Example:
Tramp HV or Unify Pro HV:
Telemitry to UART 3 TX pin
Video to video out
Power from VBAT and AGND

Camera:
Video to video in
power from VBAT and AGND

X4R-SB:
Smartport telemitry to UART 1 TX pin
SBUS to UART 2
Power from 5v rail

Rcgroups Thread: https://www.rcgroups.com/forums/showthread.php?2795213-NEW-Betaflight-F3-Flight-Controller-OSD-PDB-SD-card-BEC-current-sensor

Probably the first video about the BFF3: https://www.youtube.com/watch?v=kr16b45Lhw4

helpful for someone who is starting a build with the Betaflight F3 FC...(Note: this is a ARMATTAN CHAMELEON Build using the BFF3 FC). https://www.youtube.com/watch?v=wmbRVg3stoE

https://www.rcgroups.com/forums/showthread.php?2795213-NEW-Betaflight-F3-Flight-Controller-OSD-PDB-SD-card-BEC-current-sensor

## Image

http://www.fpvmodel.com/-pre-order-betaflight-f3-flight-controller_g1231.html

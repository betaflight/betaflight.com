# OMNIBUS Fireworks v2

![Flight Controller](https://image.ibb.co/gxmWGd/fireworksv2_1.jpg)

## Description

The Omnibus Fireworks flight controller uses the ICM20608
over SPI mounted inside of an onboard damping box.
Also on-board is a barometer, an AB7456 OSD chip for the BetaFlight integrated OSD, and 16 megabytes of data-flash (blackbox).

Omnibus Fireworks supports 3-6s LIPO direct input, contains a built-in hall effect Current Sensor, and provides on board power filtering.

## MCU, Sensors and Features

### Hardware

| Hardware | Part Number                                                                                    | Notes                 |
| -------- | ---------------------------------------------------------------------------------------------- | --------------------- |
| MCU      | [STM32F405RGT6](http://www.mouser.com/ds/2/389/DM00037051-492832.pdf)                          |                       |
| IMU      | [ICM-20608](https://store.invensense.com/datasheets/invensense/ICM-20608-G-ProductSpec-V1.pdf) |                       |
| OSD      | [AB7456](https://www.unmannedtechshop.co.uk/micro-osd-v2-3-ab7456/)                            | Need actual datasheet |

| Features       | Yes/No |
| -------------- | ------ |
| Barometer      | Yes    |
| VCP            | Yes    |
| OSD            | Yes    |
| SD Card        | No     |
| Onboard flash  | Yes    |
| Voltage Sensor | Yes    |
| Current Sensor | Yes    |
| Boot Button    | Yes    |

## Manufacturers and Distributors

[Airbot](https://store.myairbot.com/omnibusfireworksv2.html)

## Contributors

[MiddleMan5](https://github.com/MiddleMan5) - Documentation

## Variants

### Fireworks V1

Changes since V1:

- Footprints for (approx 8.9mm(L) x 4.2mm(W)) ESC output capacitors. Airbot recommends a TMJE106K050RCQXC.
- Solder pads for SmartAudio (UART2/GPIO PA2) and Camera Control (GPIO PB9)
- IMU reoriented
- Ribbon cable fully contained within IMU cage
- 8V@1A (buck) switching regulator and LC filter added for camera and VTX
- Smartport uses software serial on GPIO PA9. Airbot claims this increases the quantity of UARTs to 5.

(More information will need to be provided on Betaflight's support of software serial on PA9)

### Omnibus F4 V6

Features:

- STM32 F405 MCU
- SBUS/PPM input (Pinheaders)
- 6PWM output (1-4Pinheaders and Sh1.0 Plug, 5-6 as Pinheaders)
- INCL. BARO BMP280
- SPI Sensor MPU6000
- Flash

## FAQ & Known Issues

### Troubles Entering Bootloader Mode (DFU):

Some devices (e.g. receivers connected to SBUS/IBUS port or devices connected to one of the UARTS) can inhibit the FC from entering USB bootloader mode. In this case the FC will not be detected by Windows/MacOS. Windows detects the FC as "Unknown Device", MacOS reports "enumeration errors". If you see some of these errors unplug all devices from the FC and flash the FC standalone.

## Voltage and Current Scaling:

** From Betaflight 3.3 **

#### Voltage:

- Scale: 110
- Divider: 10
- Multiplier: 1

#### Current:

- Scale: 176
- Offset: -18500

## Resource mapping

## Other Resources

### Note on Capacitors

Airbot recommends the usage of TMJE106K050RCQXC capacitors, however images from prior models show 107C (100uF size-C) capacitors being placed on these pads:
![Omnibus Fireworks Public Test Version](https://image.ibb.co/iSd2wd/OFW_PTV.png)

#### [MiddleMan5](https://github.com/MiddleMan5) says:

Don't let Airbot's website, or the countless videos and forum posts, fool you; the capacitors really are missing. This is directly related to the [growing MLCC shortage](https://www.ttiinc.com/content/ttiinc/en/resources/marketeye/categories/passives/me-zogbi-20180302.html) that has been affecting many industries, specifically PCB manufacturing. Not only has this made ceramic and tantalum capacitors significantly more expensive, but it's made lead time's significantly longer as well. I'm not suggesting Airbot is cheating anyone out of a couple of dollars, but I have first hand experience with this issue; the company I work for has had many major issues with ceramic and tantalum capacitor shortages.

### Setup Guide:

![Pinout Top](https://image.ibb.co/j9uq9y/Fire_Works_Pinout2_51557_1528920698.jpg)

![Pinout Bottom](https://image.ibb.co/jTZwhJ/Fire_Works_Pinout1_70404_1528920698.jpg)

### Dimensions:

Volume: 41.9mm(L) x 46mm(W) x 10mm(H)
(Where width is measured from battery input, across USB port, to board corner)

### Tips

#### Current sensor ADC on RX4

(A note originally written for Omnibus F4 Nano V6, but it should work for Fireworks V2, too.)

Current sensor source of Omnibus F4 Nano V6 is limited to telemetry from ESC, available as input to RX4 (UART4_RX). However the MCU pin PA1 which is the pin for the UART4_RX, is also capable of being assigned to ADC input.

The pin can still be accessed as RX4 (either as one of 4-in-1 ESC socket J3 or a small pad marked RX4 next to J3).

```
resource SERIAL_RX 4 none  # Release PA1 from RX4
resource ADC_CURR a1       # Assign PA1 as ADC input (ADC123_IN1)
current_meter = adc        # Can be done in battery tab
set ibata_scale = 367      # Ditto. Calibration required.
set ibata_offset = 0       # Ditto
```

#### Use these CLI instructions for FrSky Omnibus versions with Rxsr-Fc connected via FPC:

```
resource SERIAL_TX 11 C08
resource SERIAL_RX 11 C09
feature SOFTSERIAL
feature TELEMETRY
serial 0 0 115200 57600 0 115200
serial 30 64 115200 57600 0 115200
set serialrx_provider = FPORT
set serialrx_inverted = OFF
set serialrx_halfduplex = ON
```

# KIWI F4

## Description

## MCU, Sensors and Features

### Hardware

_(Fill in hardware specs and add any not listed)_

- MCU: STM32F405RGT6
- IMU: MPU6000
- IMU Interrupt:
- BARO: no
- VCP: yes
- Hardware UARTS: 4
- OSD: yes
- Blackbox: flash chip
- PPM/UART Shared:
- Battery Voltage Sensor: yes
- Integrated Voltage Regulator: yes
- Brushed Motor Mosfets: no
- Buttons: BOOT

### Features

_(add list of features)_

## Manufacturers and Distributors

[https://flyinglemon.eu/flight-controllers/39-kiwif4-flight-controller.html](https://flyinglemon.eu/flight-controllers/39-kiwif4-flight-controller.html)
[https://beaverfpv.com/collections/new-arrivals/products/kiwi-f4-flight-controller-kiwi-pdb](https://beaverfpv.com/collections/new-arrivals/products/kiwi-f4-flight-controller-kiwi-pdb)

## Designers

- JohnLemon
- Flyinglemon

## Maintainers

_(add your name here if you help test or contribute code for this board)_

## Similar Targets

_(add links board descriptions here that are similar in features or function, but have a separate target)_

## Variants

Differences:

## FAQ & Known Issues

_(add FAQs, known issues and workarounds specifically related to this board. please link work in progress issues to the related github issue or pull request)_

_format is reporter [name], (status): issue contents_

###Telemetry to FrSky XSR:
As far telemetry you have to do the "un-inverted XSR hack" which isn't a big deal at all.
[Link to the X4r/XSR hack](https://blck.mn/2016/06/smartport-the-frsky-xsr-and-betaflight/)
The telemetry works with this XSR hack on UART6 only (doesn't work on UART3)

###Blackbox logs download corruption fix for MAC users:
If you have issues downloading blackbox logs (probably affects only BF3.1 and later), this will fix the problem :
https://www.rcgroups.com/forums/showpost.php?p=36811734&postcount=44503
more details here :
https://github.com/betaflight/betaflight-configurator/issues/411
It's a temporary solution requiring you to manually install patched up version of BF configurator, next release of official BF configurator is going to fix that.

###LED signal wire
This is undocumented in the wiring diagram but the RGB LED signal wire goes to the DATA pin on the reversed side of the FC, you need to take 5v and ground wire elsewhere on the board (ie. from the UART3/6 ports) but please keep in mind that PSU on KIWI is 600mA current capacity where FC and OSD need around 280mA.

###Troubles Entering Bootloader Mode (DFU):
Some devices (e.g. receivers connected to SBUS/IBUS port or devices connected to one of the UARTS) can inhibit the FC from entering USB bootloader mode. In this case the FC will not be detected by Windows/MacOS. Windows detects the FC as "Unknown Device", MacOS reports "enumeration errors". If you see some of these errors unplug all devices from the FC and flash the FC standalone.

###Voltage and Current Scaling:
Flying Lemon said to use the following for scale:
voltage 57, current 320. If this reads reverse current at idle and reads way too high when flying try Voltage 57 current 444 offset 11.

For KIWIF4V2 with PDB: set ibata_scale = 411 and set ibata_offset = -7

## Other Resources

Setup Guide:

[http://flyinglemon.eu/ext_images/kiwif4_wiring_s.pdf](http://flyinglemon.eu/ext_images/kiwif4_wiring_s.pdf)

Rcgroups Thread:

## Image

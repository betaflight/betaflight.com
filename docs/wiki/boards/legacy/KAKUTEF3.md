# KAKUTE F3

## Target Hex code: SPRACINGF3

## Description

## MCU, Sensors and Features

### Hardware

- STM32F303CCT6(256kB flash) 32-bit processor
- MPU6050 Gyro/Accelerometer
- High quality, gold plated PCB
- Micro USB connector for programming
- Dimensions: 36x36x6mm (includes USB in height)
- Mounting Holes: 30.5mm square to center of holes
- Weight: 4.2g

### Features

- Recessed, sideways pin headers. Also enables soldering of all wires directly to pads without use of any pin headers.
- Dedicated Boot button for easy firmware flashing.
- Reinforced solder pads for trouble-free direct soldering.
- Extremely low profile design.
- Input voltage 7v to 42v. Power the board directly from flight pack up to 6S (on 'BAT' pad only!).
- VIN + VBAT merged -A single wire to power the board will provide voltage input and Telemetry/OSD voltage data.
- Filtered voltage output -output 5v 800mA (and 3.3v 150mA where applicable) to power peripherals such as GPS, RX, BLACKBOX, OSD. 5v/3.3v RX selectable.
- Cleanflight support (RACE target).
- BLHeli flashing supported by hardware
- Raceflight ready
- Betaflight ready

### Kakute FC Betaflight additional features pad assignments

| PAD ON Kakute FC | FUNCTION     |
| ---------------- | ------------ |
| PPM              | Softserial 1 |
| LED              | Softserial 2 |

Softserial pad assignment can be enabled with the resource command.
You can use these pads to connect to SmartAudio on a unify or telemetry on a tramp.
**Note: you must be using Betaflight 3.1.6 or later.**
In cli type these commands:
resource ppm none
resource serial_tx 11 a00
resource led 1 none
resource serial_tx 12 A08
save

## Manufacturers and Distributors

https://www.nextfpv.com.au/products/full-metal-racing-kakute-f3-flight-controller-v1-0

## Manual

https://cdn.shopify.com/s/files/1/0412/2761/files/FMR_Kakute_Flight_Controller_Manual_v2.pdf?2155904968756041300

## Maintainers

## Similar Targets

## Variants

Differences:

## FAQ & Known Issues

## Other Resources

Setup Guide:

Rcgroups Thread:

## Image

![](http://www.fpvwarehouse.com.au/image/cache/product_images/fmr/kakute/KAKUTE-BOT_large-1008x800.png)

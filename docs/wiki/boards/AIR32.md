#AIR32

## Description

The AIR32 flight controller uses SMT32F3 processor and low noise MPU6000 gyro on SPI bus for faster acquisition of gyro data. Board have 3 fully usable UART ports without interference in USB port (VCP) but it still compatible with BLHELI passtrough.

## MCU, Sensors and Features

### Hardware

- MCU: STM32F3
- IMU: MPU6000
- BARO: No
- VCP: Yes
- Hardware UARTS: 3
- OSD: No
- Blackbox: No
- PPM: Yes
- Battery Voltage Sensor: Yes
- Integrated Voltage Regulator: 5V 600mA (up to 6S input)
- Brushed Motor Mosfets: No
- Buttons: BOOT button

### Features

(add list of features)

## Manufacturers and Distributors

Flyinglemon - https://flyinglemon.eu

## Designers

Flyinglemon - https://flyinglemon.eu

## Maintainers

(add your name here if you help test or contribute code for this board)

## Similar Targets

(add links board descriptions here that are similar in features or function, but have a separate target)

## Variants

Differences:

## FAQ and Known Issues

**Wiring:**
Use wiring only from PDF file https://flyinglemon.eu/index.php?controller=attachment&id_attachment=5
On website graphics has mistake with GND and Vcc for UART1 - they are swapped.

**DSHOT:**
Working for now only with test version from master branch. Be careful with using test versions!
If you are in to it you will need to make some adjustments:

1. Solder motor 1 to motor 5 pin on FC.
2. Leave motor 2 and 3 on their pins.
3. Solder motor 4 to motor 6 pin on FC.
4. Remap by using following commands:

`resource MOTOR 5 free`
`resource MOTOR 6 free`
`resource MOTOR 1 A01`
`resource MOTOR 4 A02`
`save`

LED strip output should work - its sharing DMA with motor 4 pad. This is the main reason why 4th motor should be remaped to other pin.
PPM pad sharing same DMA channel like MOT6 so taking PPM pad for one of motors doesn't make sense. Better is to use motor 6 pad just to keep all motors on dedicated pads - MOT1-6.

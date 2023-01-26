# KakuteF7

## Features

The Holybro Kakute F7 flight controller integrates flight controller (FC) and on-screen display (OSD) in one. The Kakute F7’s layout makes it easy to wire up the other components of the multirotor while keeping the build neat and tidy.
IMU updated to MPU6000,Re-designed and more reliable damping structure

• Supports Betaflight.
• Betaflight OSD. Change PIDs, adjust common configuration parameters, and change video transmitter channel and power level, all using your transmitter sticks and goggles.
• Soft-mounting built in. The IMU (“gyro”) chip on this board is mounted on vibration-isolating foam. This means that there is no need to soft-mount the board itself.
• High-performance / low-noise / high sensitivity IMU. MPU6000 with 6-axis gyro and accelerometer.
• Ready for autonomous flight: Integrated BMP280 barometer and SCL/SDA pads for use with external GPS/magnetometer units.
• Dedicated bootloader button for easy firmware flashing.
• Low-profile design fits into even very compact frames.
• Input voltage 7v to 42v. Power the board directly from the flight pack, up to 6S (on “B+” pad only).
• Automatic voltage monitoring. No need to run a separate vBat wire for voltage monitoring; the Kakute F7 monitors voltage directly from the power supply.
• Filtered voltage output for clean, noise-free video. On-board regulators output 5v at up to 2 amps and 3.3v at up to 200 mA to power peripherals such as receiver, video transmitter, FPV camera, or LED strip.
• Supports BLHeli pass-through for easy ESC upgrade and configuration.

## Image

Top View
![](/img/boards/kakutef7/kakutef7_top.jpg?raw=true)

Bottom View
![](/img/boards/kakutef7/kakutef7_bottom.jpg?raw=true)

## Specifications

• MCU: STM32F745 32-bit processor
• IMU: MPU6000 (SPI)
• Barometer: BMP280
• Current Sensor: Approximately 130 amps maximum measurable value
• USB VCP Driver (all UARTs usable simultaneously; USB does not take up a UART)
• 6 hardware UARTS (UART1,2,3,4,6,7)
• All UARTS support hardware inversion. SBUS, SmartPort, and other inverted protocols work on any UART without “uninvert hack”.
• Supports serial receivers (SBUS, iBus, Spektrum, Crossfire) only. PPM and PWM receivers are not supported.
• TF card for Blackbox logging
• Dimensions: 35x41x7mm (includes foam-mounted gyro board in height)
• Mounting Holes: Standard 30.5mm square to center of holes
• Weight: 8g

## Pinout Diagram

`Top View`
![](/img/boards/kakutef7/kakutef7_pin_diagram.jpg?raw=true)

## Target Code

`KAKUTEF7`

## Manufacturers and Distributors

www.holybro.com (Manufacturer & Designer)

Distributors:

## FAQ & Known Issues

`“Board Align” Feature Documentation`

## Other Resources

`Contact us at:`

`•Email: productservice@holybro.com`

`•Facebook Page: Holybro`

`•Facebook Group: Holybro Hobby Official Group`

## KAKUTE F4 FLIGHT CONTROLLER V2

### Descriptions:

The Holybro Kakute F4 flight controller supports important features of Betaflight/Cleanflight, such as OSD and DShot. The faster F4 processor gives room for future feature development: run all features at the fast 8 kHz PID loop rate, at single-digit CPU utilization! Because of issues with serial inversion, other F4 boards struggle to support protocols such as FrSky SBUS and SmartPort at the same time. The Kakute F4 is designed to support all serial protocols at once.

### New V2 Features

- Additional UART (UART 4) added to support serial camera communication such as to RunCam Split. Please note this is NOT the same as Betaflight Camera Control feature, which controls the menu of FPV cameras like Swift, Monster, etc.
- Additional UART (UART 5) added to support ESC telemetry such as from BLHeli_32 and KISS.
- Through-hole solder pads instead of flat pads for more secure soldering especially for beginners.
- Barometer sensor on board allows altitude hold mode.
- I2C pad available for certain external sensors.

### Features

- Supports Betaflight and Cleanflight.
- Betaflight OSD. Change PIDs, adjust common configuration parameters, and change video transmitter channel and power level, all using your transmitter sticks and goggles.
- Soft-mounting built in. The IMU (“gyro”) chip on this board is mounted on vibration-isolating foam. This means that there is no need to soft-mount the board itself.
- New high-performance / low-noise / high sensitivity IMU. ICM20689 with 6-axis gyro and accelerometer. Can run at up to 32 kHz.
- 2 oz. copper PCB allows up to 120A maximum continuous current.
- Dedicated bootloader button for easy firmware flashing.
- Low-profile design fits into even very compact frames.
- Input voltage 7v to 42v. Power the board directly from the flight pack, up to 6S (on “B+” pad only).
- Automatic voltage monitoring. No need to run a separate vBat wire for voltage monitoring; the Kakute F4 AIO monitors voltage directly from the battery power lead.
- Filtered voltage output for clean, noise-free video. On-board regulators output 5v at up to 1.5 amps and 3.3v at up to 200 mA to power peripherals such as receiver, video transmitter, FPV camera, or LED strip.
- Supports BLHeli pass-through for easy ESC upgrade and configuration.

### Specifications

- MCU: STM32F405RGT6 32-bit processor
- IMU: ICM20689 (SPI)
- Barometer: BMP280
- USB VCP Driver (all UARTs usable simultaneously; USB does not take up a UART)
- 5 hardware UARTS (UART1,3,4, 5, 6)
- Supports serial receivers (SBUS, iBus, Spektrum, Crossfire) only. PPM and PWM receivers are not supported.
- 128 Mbit Dataflash chip for Blackbox logging
- Dimensions: 35x30x8mm (includes USB in height)
- Mounting Holes: Standard 30.5mm square to center of holes
- Weight: 7g

### Image

- KakuteF4 V2
  ![](https://github.com/jamming/image/blob/master/IMG_6809.JPG)
  ![](https://github.com/jamming/image/blob/master/IMG_6808.JPG)

- KakuteF4 All-In-One V2
  ![](https://github.com/jamming/image/blob/master/kakuteF4aio-V2-TOP.jpg)
  ![](https://github.com/jamming/image/blob/master/kakuteF4aio-V2-bottom.jpg)

### Manufacturers and Distributors

- www.holybro.com (Manufacturer & Designer)
- www.facebook.com/holybrohobby/

### Distributors:

- www.banggood.com
- www.getfpv.com
- www.unmannedtechshop.co.uk
- www.gearbest.com
- www.hobbyking.com

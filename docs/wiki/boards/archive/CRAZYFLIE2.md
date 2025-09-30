## Description

The [Crazyflie 2.0](https://www.bitcraze.io/crazyflie-2/) is a brushed nanocopter development kit sold by [Bitcraze AB](https://www.bitcraze.io/) out of Sweden. The flight controller board is the copter itself - the PCB is X-Shaped and plastic motor mounts slide on to the arms. It features an integrated NRF51822 SoC for Rx.

The Crazyflie 2.0 has an extensive [expansion deck](https://wiki.bitcraze.io/projects:crazyflie2:expansionboards:index) system with various decks that plug in to the expansion headers to enable various additional functions like buzzers, LEDs, indoor localization, and even an ESC breakout designed for mounting the board on a larger brushless build.

The board has its own operating system and set of client side tools which enable all the functionality of these decks and the copter. This Betaflight/Cleanflight port is designed to enable the core flying scenarios, and is not necessarily intended to enable the features of all the various decks.

## MCU, Sensors and Features

### Hardware

- MCU: STM32F405RG (flight control) + NRF51822 (Bluetooth and Nordic ESB Rx)
- IMU: Invensense MPU9250
- IMU Interrupt: Yes
- BARO: STM LPS25H (no driver in betaflight yet)
- Compass: Onboard in MPU9250
- USB: STM32 VCP
- Hardware UARTS: 0 (1 internal bridge from the NRF51822 to the STM32)
- Software UARTS: 0
- OSD: No
- RC Rx: NRF51822 - Bluetooth or Nordic ESB. Custom defined Rx protocol.
- FPV Tx: No
- Blackbox: No
- PPM/UART Shared: No
- Battery Voltage Sensor: No
- Brushed Motor Mosfets: Yes
- Buttons: Power button connected to NRF51822. Can be used to [Boot into DFU mode](https://wiki.bitcraze.io/projects:crazyflie2:development:dfu)
- Number of ESC/Motor outputs: 4 Brushed motors
- Unbuffered Bidirectional ESC out/in-puts: No
- Status LEDs: LED0/LED1/LED2
- Active Beeper output: No
- Passive Beeper output: No
- LED-strip output:No
- Sbus inverter: No
- PDB: Yes, accepts 1S battery
- Voltage regulator: Yes max 1S input.
- Filtered power output: No

### Software

- Firmware target: CRAZYFLIE2

## Manufacturers and Distributors

[Bitcraze AB Online Store](https://store.bitcraze.io/)

[SeeedStudio](https://www.seeedstudio.com/Crazyflie-2.0-p-2103.html)

## Designers

[Arnaud Taffanel, Marcus Eliasson, Tobias Antonsson](https://www.bitcraze.io/team/)

## Maintainers

[Sean Kelly](https://github.com/theseankelly)

## Similar Targets

_(add links board descriptions here that are similar in features or function, but have a separate target)_

## Variants

Differences:

## FAQ & Known Issues

## Other Resources

[Schematics](https://wiki.bitcraze.io/_media/projects:crazyflie2:hardware:crazyflie_2.0_rev.c_schematics.pdf)

[Setup Guide on Bitcraze Wiki](https://wiki.bitcraze.io/projects:crazyflie2:development:dfu)

## Image

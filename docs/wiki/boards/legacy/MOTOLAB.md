# MotoLab

The MOTOLAB build target supports the STM32F3-based boards provided by MotoLab.

At present this includes the TornadoFC, CycloneFC and MotoF3.

The CycloneFC and TornadoFC are described here:

http://www.rcgroups.com/forums/showpost.php?p=32330479&postcount=2

The MotoF3 is described here:

http://www.rcgroups.com/forums/showpost.php?p=28508139&postcount=3

All boards use the STM32F303 microcontroller and have the following features:

- 256K bytes of flash memory
- Floating point math coprocessor
- Three hardware serial port UARTs
- USB using the built-in USB phy that does not interfere with any hardware UART
- Stable voltage regulation
- High-voltage/high-current buzzer/LED output
- Serial LED interface
- Low-pass filtered VBAT input with 1/10 divider ratio
- Low-pass filtered PWM or analog RSSI input
- 8 short-circuit protected PWM outputs, with 5V buffering on the TornadoFC
- On-board 4S-compatible switching regulator (CycloneFC and MotoF3)
- Direct mounting option for a Pololu switching regulator for up to 6S lipo operation (TornadoFC)
- Pass-through programming and configuration of BLHeli-based ESCs using Cleanflight Configurator

The MotoF3 also provides built-in power distribution for four ESCs, an on-board buzzer, and 2Mbyte SPI flash for data logging.

# Flashing

MotoLab boards all use the built-in USB interface on the STM32F3 microcontroller. New versions of Cleanflight can be installed using Cleanflight Configurator through the USB interface. Installation of new firmware is described here:

[USB Flashing](/docs/development/USB-Flashing)

Firmware installation using Windows operating system is complicated because the default device driver for the STM32 USB interface in DFU programming mode is not compatible with the Configurator flash tool. The required DFU mode driver must be manually installed. The default driver for the USB port in normal (VCP) mode is also required for connection to Configurator. Additional details on the drivers and their installion is provided here:

http://www.rcgroups.com/forums/showthread.php?t=2537379

## CONTENT FROM SAME FILE IN OTHER FOLDER

## Description

Four FCs that all use the same Target HEX

- MotoF3 - Board shape designed for the ImpulseRC Warp Quads as part of the frame.
- Tornado - Does not allow BLHeli Pass-through due to have 5V uni-directional drivers on the motor output pins.
  Requires a Pololu 5V regulator mounted on the board.
- Cyclone - Like the Tornado but supports BLHeli pass-through and has the 5V regulator built onto the board.
- Tempest (F3 version) - Has PDB built into the board as well as a 5V regulator to power accessories.

## MCU, Sensors and Features

### Hardware

- MCU: STM32F3
- IMU: MPU6000, SPI (Cyclone, Tempest)
  : MPU6050, IIC (MotoF3, Tornado)
- IMU Interrupt:
- BARO: No
- VCP: Yes
- Hardware UARTS: 3
- OSD: No
- Blackbox: Serial
- PPM/UART Shared: UART2
- Battery Voltage Sensor: Yes
- Integrated Voltage Regulator: Yes (MotoF3, Cyclone, Tempest)
  : Pololu 5V (Tornado)
- Brushed Motor Mosfets: No
- Buttons: None. Solder BOOT pads

### Features

_(add list of features)_

## Manufacturers and Distributors

_(add links to Manufacturers and Distributors)_

## Designers

## Maintainers

_(add your name here if you help test or contribute code for this board)_

## Similar Targets

_(add links board descriptions here that are similar in features or function, but have a separate target)_

## Variants

Differences:

## FAQ & Known Issues

- The BF developers removed flash support from the MotoLab target in 3.1.x. The other MotoLab boards use the same target but don't have flash, so apparently they overlooked the MotoF3 and thought the flash code wasn't needed.

- To use DSHOT ESC protocol with ßF3.1 Motor1 needs to be re-mapped to the PPM pin.

- Tornado has output driver chips so can not add a wire to the output pin header to use DSHOT. So just wire Motor #1's ESC directly to the PPM pin and re-map.

- The Cyclone and Tempest boards can have the PPM pin wired to the motor #1 output pin.

See the [DSHOT & Betaflight](/docs/wiki/guides/archive/DSHOT-ESC-Protocol-3-1) page.

For Cyclone & Tempest -
A wire can be soldered from the PPM pin to the motor 1 header pin or just connect ESC#1 directly to the PPM pin.
Note: Adding this wire is not required if you connect signal wire from ESC #1 directly to the PPM pin.
Move motor 1 from Output #1 header pin to the PPM input header pin.

Follow above and to re-map output type in CLI:
`resource ppm none  `
`resource motor 1 A07 `
`save  `

- Photo of wire added to a Cyclone.
  https://www.rcgroups.com/forums/showpost.php?p=36589146&postcount=2787

- Photo and post on modifying the MotorF3 (Warp Quad) board to use DShot. Note this is an alternet method that wires the PPM to Motor #7 output since the #7 output is very close to the PPM pin.

The CLI re-mapping is:
`resource motor 7 none `
`resource ppm none `
`resource motor 1 A07 `
`save `
https://www.rcgroups.com/forums/showthread.php?2537379-MotoLab-Board-Setup-and-Troubleshooting/page197#post37314713

- Report that with the Mod and remapping to run DSHOT there is a conflict with DMA for LEDs with Motor #4.
  Currently LEDs need to be disabled to run DSHOT.
  ctzsnooze reported a fix:
  The solution, for versions of betaflight before 3.3, is to solder the ESC signal wire for motor 4 to the motor 5 pad, and in the CLI save:
  `resource MOTOR 4 A01`
  `resource MOTOR 5 NONE`

### Servo_tilt with DSHOT on BF3.1:

Do mod and setup for DSHOT as above.
Outputs 7 & 8 on the Cyclone (Tornado & Tempest) have timers available for servos (Outputs 5 & 6 might also be available but not tested).
In CLI type:

`resource motor 7 none`
`resource motor 8 none`
`resource servo 1 A03`
`resource servo 2 A08`
`save`

Reconnect USB and reopen configurator.
On Config Tab Enable 'Servo_tilt' and click "SAVE and REBOOT".
On Servo Tab check CH1 (Roll) for Servo 0 (servo 0 here is Servo 1 in CLI) and check CH2 (Pitch) for Servo 1.
Click Save. Outputs 7 & 8 should now be 1000 to 2000usec servo pulses. Use the Motors Tab to check or an O'scope on the output pins. Adjust the MIN & MAX to get the movement desired.

### Tri-copter with DShot ESCs on BF3.1:

Must add wire from PPM to output1 for DShot.
Servo must be on output 5 or 6 (Timer restriction: see SERVO_TILT wiki page). Do NOT enable SERVO_TILT, selecting TRICOPTER directs Yaw stick to Servo 1.
Re-map motor 5 to Servo 1 with the following CLI commands (servo on output 5):

`resource MOTOR 5 none  `
`resource servo 1 A01  `
`save  `

### Hex-copter with DShot ESCs on BF3.1:

This did not seem to work. No DSHOT output on motor 1 (No DMA assignment) and bad output on motor 6.

## Other Resources

Setup Guides:

Tornado and Cyclone
https://www.rcgroups.com/forums/showthread.php?t=2537379

Tempest
https://www.rcgroups.com/forums/showthread.php?t=2715556

## Image

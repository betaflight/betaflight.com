## Description

Beautifully simple STM32F7 based flightcontroller. A F7 replacement for the Naze.

![NERO (TOP) - rev1](/img/boards/nero/nero-rev1-top.jpg)
![NERO (BOTTOM) - rev1](/img/boards/nero/nero-rev1-bottom.jpg)

## MCU, Sensors and Features

### Hardware

- Size: 36x36mm (30.5x30.5 mounting holes)
- MCU: STM32F722RET6
- IMU: ICM-20602 (SPI)
- IMU Interrupt: Yes
- VCP: Yes
- Hardware UARTS: 3
- OSD: Compatible pin-outs for MinimOSD on UART3 (stackable)
- Blackbox: SD card
- PPM/UART Shared: UART6
- Battery Voltage Sensor: Yes, directly connected, no wiring necessary (if using pololu on full size)
- Integrated Voltage Regulator: Pololu piggy back option
- Button for putting board into DFU mode

### Features

- Current Sensor: available as ADC input, but requires shunt circuit on PDB or battery cable.
- BlHeli passthrough: Yes
- WS2811 Led Strip: Yes (on motor output Pin 5)
- Transponder: No
- SPI (2) is broken out for adding an SPI peripheral, e.g. another GYRO.

## Manufacturers and Distributors

These boards are now currently available. Shipping of pre-orders is occurring now.

Available here:

- [fpvgame.eu](https://www.fpvgame.eu/product-page/fc-f7-nero)
- [electricwingman.com](https://www.electricwingman.com/nero-f7-flight-controller)
- [readytoflyquads.com](http://www.readytoflyquads.com/nero-f7-flight-controller)

More information available here:

- [nerofc.com](https://nerofc.com)

## Configuration Information

### Wiring Diagrams

Main wiring details:

![Wiring Diagram - rev1](/img/boards/nero/nero-rev1-wiring.png)

Micro pin details:

![Micro pins - rev1](/img/boards/nero/nero-rev1-micro-pins.png)

### Schematics

The pin out for the MCU is provided here, so that it can be used as a reference for others considering developing a board using the same target. This is so targets can be minimised going forward. Hopefully the info will also assist other developers in adding features.

![MCU Output Schematic - rev1](/img/boards/nero/nero-rev1-mcu-schematic.png)

# Other Resources

RC Groups Thread: https://www.rcgroups.com/forums/showthread.php?2734745-NERO-STM32F7-based-FC

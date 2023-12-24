# Demon Soul F4

## Description

Derived from REVO, has inverters for SBUS and SPORT, only one full-fledged UART3 broken out.

## MCU, Sensors and Features

### Hardware

- MCU: STM32F405
- IMU: MPU-6000
- Motor outputs: 4
- IMU Interrupt:
- BARO: No
- VCP: Yes
- Hardware UARTS: UART1 for SBUS with Rx only, UART6 for SPORT, UART3 available for general use
- OSD: No
- Blackbox: SPI 2MB
- PPM/UART Shared: Yes
- Battery Voltage Sensor: Yes
- Integrated Voltage Regulator: No
- Brushed Motor Mosfets: No
- Buttons: No

### Features

SmartPort telemetry inversion. This board uses the following schematic to perform SmartPort inversion and split the signal into Rx and Tx components:

![S.Port inverter](/img/boards/soulf4/smartport-inverter-schematic.png)

To set SmartPort up correctly, connect corresponding wire from your receiver to the pad labeled `S.Port` on the FC, then head into CLI and type:

```
set tlm_inverted = off
set tlm_halfduplex = off
save
```

Don't forget to enable SmartPort telemetry feature for UART6 (3rd UART on the **Ports** tab).

## Manufacturers and Distributors

http://demonrc.eu/product/demon-soul-f4-high-performance-flight-controller/

## Designers

Adam Tusk (?)

## Maintainers

Andrey Mironov (@DieHertz)

## Similar Targets

REVO F4

## FAQ & Known Issues

- PB2/BOOT1 pin is not grounded on this board (with gratitude to [Dominic Clifton aka hydra](https://github.com/hydra) for pointing this out!), therefore it may refuse to go into DFU mode even with the boot pads shorted. You can solve this issue by running a small jumper wire from PB2 to GND like shown in the image below.
  ![Ground BOOT1](/img/boards/soulf4/soulf4-dfu-boot1-fix.png)
- SWD connector pinout: GND SWCLK SWD NRST VDD

## Image

![Front Face](http://demonrc.eu/wp-content/uploads/2017/01/Demon-Soul-F4-Flight-Controller-Connection-Diagram.jpg)
![Back Face](/img/boards/soulf4/soulf4-back-face.png)

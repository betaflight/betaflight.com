# Aikon F4

## Description
FC with no PDB aimed at multi-rotor and fixed wing use, Aikon F4 features a carefully-chosen timer design which allowed to run 4-6 motors with burst DSHOT with maximum efficiency. On board are dedicated pads for ESC telemetry, VTX and camera control. Boards also features an 11-pin connector for plug-and-play connection with Aikon AK32 4in1 ESC, providing voltage, current and ESC telemetry reading with no additional wires.

## MCU, Sensors and Features

### Hardware
  - MCU: STM32F405
  - IMU: MPU-6000 or ICM-20602 depending on revision
  - Motor outputs: 4-6
  - IMU Interrupt: Yes
  - BARO: Optionally
  - VCP: Yes
  - Hardware UARTS: UART1 for SerialRX, UART4 for SPORT, UART2 and UART3 available for general use
  - Software serial: SOFTSERIAL1 for VTX control, SOFTSERIAL2 for ESC telemetry
  - OSD: Yes
  - Blackbox: SPI 16MB or 32MB depending on revision
  - PPM/LED_STRIP Shared: Yes
  - Battery Voltage Sensor: Yes
  - Integrated Voltage Regulator: Yes
  - Buttons: Boot

### Features
Software serial is preconfigured by default, all you have to do is enable SOFTSERIAL1 for VTX control and SOFTSERIAL2 for ESC sensor on the Ports tab in Configurator.

## Manufacturers and Distributors

https://www.aikon-electronics.com/

## Designers

AIKON Electronics
Avi Jang

## Maintainers

Andrey Mironov (@DieHertz)

## FAQ & Known Issues
* First revision has no diode protecting the 5V input on the 11-pin ESC connector, make sure to pull the 5V wire coming from our ESC in order to avoid two regulators fighting against each other

## Image

@todo DieHertz

<!-- test -->

# RC Explorer F3 FC Racing

Designed with 2 things in mind; Performance and cost

## Description

The RCExplorer F3FC Racing is a cheap STM32F3 FC with integrated voltage regulator, voltage monitoring, current sensor input, 3 UARTS, LED port, Servo feedback/RSSI and MPU6000 gyro

Target HEX name: RCEXPLORERF3

## MCU, Sensors and Features

### Hardware

- MCU: STM32F303CC
- IMU: MPU6000 (SPI)
- IMU Interrupt: Yes
- BARO: No
- VCP: Yes
- Hardware UARTS: 3
- OSD: No
- Blackbox: No
- PPM/UART Shared: No - PWM6 is used for PPM
- Battery Voltage Sensor: Yes, directly connected, no wiring necessary
- Integrated Voltage Regulator: Yes, 6S maximum
- Brushed Motor Mosfets: No
- Buttons: 1 - DFU

### Features

- Current Sensor: Yes, input accepts 0-3.3V
- BlHeli passthrough: Yes
- WS2811 Led Strip: Yes, on dedicated LED output
- Transponder: No

## Hardware Designs

Not public

## Manufacturers and Distributors

RCExplorer.se
Available here: http://rcexplorer.se/product/f3fc-racing/

## Designers

David Windestål

## Maintainers

Jaakko Laurikainen

## Similar Targets

LUX_RACE
SPARKY

## Variants

None known

## FAQ & Known Issues

No known issues yet.

The default resource mappings on all boards are for use on a quadcopter. If you want to use the board for a tricopter, you will have to manually remap the resources so you get a resource for the tail servo. This should work for the F3FC (Rcexplorer FC)

```
resource MOTOR 1 A08
resource MOTOR 2 B00
resource MOTOR 3 A04
resource MOTOR 4 NONE
resource MOTOR 5 NONE
resource SERVO 1 A07
```

## Other Resources

Setup guide and such available here: http://rcexplorer.se/product/f3fc-racing/

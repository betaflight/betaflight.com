## ALIENWHOOP Board

![IMAGE AlienWhoop F7 Flight Controller Welcome](https://cdn.shopify.com/s/files/1/2371/1335/products/IMG_20170922_213059_8cee69cc-6f5e-48d7-9d72-639ff104019a_1024x1024.jpg?v=1511621625)

AlienWhoop flight controller for Tiny Whoop, Blade Inductrix, Eachine, BetaFPV, and other micro brushed quadcopter frames. Best in class flight controller running BetaFlight.

- Choice of the top performing ARM processors:
  - High-performance ST Microelectronics ARM Cortex-M4 core F4 168 MHz CPU
  - High-performance ST Microelectronics ARM Cortex-M7 core F7 216 MHz CPU
  - Highest-performer ST Microelectronics ARM Cortex-M4 core F4 _OVERCLOCKED to 240 MHz!!_
- Choice of top performing motion processors:
  - Invensense MPU-6500 Six-Axis (Gyro + Accelerometer) low power consumption MEMS MotionTracking™ Device
  - Invensense MPU-9250 Nine-Axis (Gyro + Accelerometer + Compass) low power consumption MEMS MotionTracking™ Device
- Capable of 32kHz gyro sampling and 32kHz PID loop with overclocked F4 (_32kHz gyro sampling rate might not be optimal depending on features selected 16/16 or 16/8 might be preferable_).
- Extreme power. Choice of either (1) Fairchild Semiconductor FDMA410NZ MOSFET with 9.5A continuous and 24A burst brushed motor insanity (8.5mm coreless scream), (2) FDMA410NZT MOSFET with 9.5A continuous and 63A burst, or (3) _Infineon Technologies IRFHS8342 MOSFET_
- UART4 solder pads for programmable LED strip (SUPER COOL) using WS2812B RGB or RX/TX for Micro MinimOSD
- Supports most serial external receivers. Officially supporting FrSky XM, XM+, R-XSR (SBUS/Fport), LemonRX DSM2 and DSMX (SBUS), and FlySky FS-A8S (iBUS) satellites.

## MCU, Sensors and Features

## Hardware

- MCU: STM32F405RGT6 or STM32F722RET6
- Brushed Motor Mosfets: Fairchild Semiconductor FDMA410NZ (9.5A/23A pulsed), FDMA410NZT (9.5A/63A pulsed), or Infineon IRFHS8342 MOSFET up to 75A pulsed
- IMU: MPU-6500 or MPU-9250 (both SPI)
- BARO: N/A
- USB: STM32 VCP
- Hardware UARTS: UART4 solder pads for Micro MinimOSD, LED strip, etc.
- OSD: N/A
- Blackbox: N/A on V2; via onboard flash V2.1
- PPM/UART Shared: N/A
- Battery Voltage Sensor: N/A
- Current sensor: N/A
- Integrated Voltage Regulator: 3.3V
- Buttons: 2 jumpers (1: DFU, 2:Receiver Bind)

## Manufacturers and Distributors

AlienWhoop (Manufacturers)

- AlienWhoop Shop: [https://shop.alienwhoop.us/products/alienwhoop-v2-1-f4-brushed-flight-controller](https://shop.alienwhoop.us/products/alienwhoop-v2-1-f4-brushed-flight-controller)
- BetaFPV: [https://betafpv.com/products/alienwhoop-f4-brushed-flight-controller](https://betafpv.com/products/alienwhoop-f4-brushed-flight-controller)
- Drone Junkie: https://www.dronejunkie.co.uk/alienwhoop-f4-brushed-flight-controller-v2
- TinyWhoop: https://www.tinywhoop.com/collections/electronics/products/alien-whoop-v2-1-f4-brushed-flight-controller
- DIY files here: [https://oshpark.com/shared_projects/p4hs6DbI](https://oshpark.com/shared_projects/p4hs6DbI)

## Designers

AlienWhoop

## Maintainers

@brucesdad13 (https://github.com/brucesdad13)

## Acknowledgements

\*Acknowledgements: AlienWhoop V2 and 2.1 are remixes of [AlienFlight F3 Quad Brushed V1](https://github.com/brucesdad13/AlienFlightArchive/tree/master/Flight-Controllers/F3-V1/F3-Quad)

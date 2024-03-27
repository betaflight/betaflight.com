# KakuteH7

## Description

The Holybro Kakute H7 Flight Controller is full of features including integrated Bluetooth, dual plug-and-play 4in1 ESC ports, HD camera plug, barometer, OSD, 6x UARTs, full Blackbox MicroSD card slot, 5V and 9V BEC, easy soldering layout and much more.

The Kakute H7 builds upon the best features of its F7 predecessor and further improves on hardware components and layout. With the additional integrated Bluetooth chip onboard, you can perform Betaflight configuration and tuning wirelessly on your phone with the SpeedyBee Android & IOS App. The Kakute H7 is DJI HD ready. It has an easy plug-and-play port with an on-board 9V regulator designed to power your HD video transmitter like DJI/Caddx FPV Air Unit & Caddx Vista while supporting analog system.

It has 6x dedicated UART ports with built-in inversion for peripherals (UART2 is used for Bluetooth telemetry), along with a full MicroSD Card slot for virtually unlimited Blackbox data logging. Dual plug-and-play 4in1 ESC connectors, allowing easy plug-and-play support for x8 Octocopter configuration and keeping it simple and clean. The integrated BetaFlight OSD makes it easy to display important information on your FPV display like battery voltage, flight time, warnings, RSSI, SmartAudio features and more. It is also ready for autonomous flight with the on-board barometer. There are LED & buzzer pad, I2C pad (SDA & SCL) for external GPS/Magnetometers

## Benefits of KakuteH7 Compared to KakuteF7

`•H7 is a faster processor (400Mhz vs 216MHz F7), the faster speed H7 processor allows for faster looptime`

`•H7 offers Bluetooth onboard, given ability to configure with connected to pc`

`•H7 offers more UART’s with built-in hardware inversion`

`•H7 has superscalar pipeline and DSP capabilities – basically that means the H7 is a even better platform for future development that allows the developers to further optimize the flight controller algorithms`

`•Onboard Baro BMP280, Support more flight mode`

`•Support SD card for Blackbox logging`

`•I2C1 Pads for external compass connection`

## Image

Top View
![](/img/boards/kakuteh7/kakuteh7_top.jpg?raw=true)

Bottom View
![](/img/boards/kakuteh7/kakuteh7_bottom.jpg?raw=true)

## Specifications

• MCU - STM32H743 32-bit processor running at 480 MHz
• IMU - MPU6000
• Barometer - BMP280
• OSD - AT7456E
• Onboard Bluetooth chip - ESP32-C3
o SpeedyBee IOS & Android App Compatible
o Note: The Bluetooth onboard is set to automatically turn off when the flight controller is unlocked (arm) and turn on automatically when the flight controller is locked (disarm).
• 6x UARTs (1,2,3,4,6,7; UART2 is used for Bluetooth telemetry)
• 9x PWM Outputs (8 Motor Output, 1 LED)
• 2x JST-SH1.0_8pin port (4in1 ESCs, x8/Octocopter compatible)
• 1x JST-GH1.25_6pin port (For HD System like Caddx Vista & Air Unit)
• Battery input voltage: 7V to 42V
• BEC 5V 2A Cont.
• BEC 9V 1.5A Cont.
• Mounting - 30.5 x 30.5mm/Φ4mm hole with Φ3mm Grommets
• Dimension - 35x35mm
• Weight - 8g

## Pinout Diagram

`Top View`
![](/img/boards/kakuteh7/kakuteh7_pin_diagram.jpg?raw=true)

## Target Code

`KAKUTEH7`

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

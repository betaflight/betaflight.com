# KakuteH7V2

## Description

The Holybro Kakute H7 v2 Flight Controller is full of features including integrated Bluetooth, HD camera plug, dual plug-and-play 4in1 ESC ports, 9V VTX ON/OFF Pit Switch, barometer, OSD, 6x UARTs, 128MB Flash for Logging, 5V and 9V BEC, and bigger soldering pad with easy layout and much more.

The Kakute H7 v2 builds upon the best features of its F7 predecessor and further improves on hardware components and layout. With the additional integrated Bluetooth chip onboard, you can perform configuration and tuning wirelessly on your phone with the SpeedyBee Android & IOS App. The Kakute H7 is DJI HD ready. It has an easy plug-and-play port with an on-board 9V regulator designed to power your HD video transmitter such as the DJI/Caddx FPV Air Unit & Caddx Vista while supporting analog system.

It features an onboard “VTX ON/OFF Pit Switch” that allows you to completely power off the video transmitter using a switch on your RC transmitter. Great if you are working on your drone, waiting for the GPS to get a fix, getting ready for a race while preventing it from overheating or interfering with others flying. It has 6x dedicated UART ports with built-in inversion for peripherals (UART2 is used for Bluetooth telemetry), a 128 MB Flash for logging, Dual plug-and-play 4in1 ESC connectors, allowing easy plug-and-play support for x8 & Octocopter configuration and keeping it simple and clean.
The integrated BetaFlight OSD makes it easy to display important information on your FPV display like battery voltage, flight time, warnings, RSSI, SmartAudio features and more. It is also ready for autonomous flight with the on-board barometer. There are LED & buzzer pad, I2C pad (SDA & SCL) for external GPS/Magnetometers. The integrated BetaFlight OSD makes it easy to display important information on your FPV display like battery voltage, flight time, warnings, RSSI, SmartAudio features and more. It is also ready for autonomous flight with the on-board barometer. There are LED & buzzer pad, I2C pad (SDA & SCL) for external GPS/Magnetometers.

## Benefits of KakuteH7v2 Compared to KakuteH7

• Onboard flash
• VTX ON/OFF Pit Switch

## Image

Top View
![](/img/boards/kakuteh7v2/kakuteh7v2_top.jpg?raw=true)

Bottom View
![](/img/boards/kakuteh7v2/kakuteh7v2_bottom.jpg?raw=true)

## Specifications

• MCU - STM32H743 32-bit processor running at 480 MHz
• IMU – BMI270
• Barometer - BMP280
• OSD - AT7456E
• Onboard Bluetooth chip - ESP32-C3
• Note: The Bluetooth onboard is set to automatically turn off when the flight controller is unlocked (arm) and turn on automatically when the flight controller is locked (disarm).
• VTX ON/OFF Pit Switch – Switch can be enable using USER1 in Betaflight Mode tab. (Warning: Do not enable this pit switch if you are using DJI FPV Remote Controller)
• 6x UARTs (1,2,3,4,6,7; UART2 is used for Bluetooth telemetry)
• 9x PWM Outputs (8 Motor Output, 1 LED)
• Battery input voltage: 2S-8S
• BEC 5V 2A Cont.
• BEC 9V 1.5A Cont.
• Mounting - 30.5 x 30.5mm/Φ4mm hole with Φ3mm Grommets
• Dimension - 35x35mm
• Weight - 8g
• 2x JST-SH1.0_8pin port (4in1 ESCs, x8/Octocopter compatible)
• 1x JST-GH1.5_6pin port (For HD System like Caddx Vista, Air Unit, or other VTX)

## Pinout Diagram

Top View
![](/img/boards/kakuteh7v2/kakuteh7v2_pinout.jpg?raw=true)

Pin
![](https://docs.holybro.com/fpv-flight-controller/kakute-h7-v2/pinout?raw=true)

## Target Code

`KAKUTEH7V2`

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

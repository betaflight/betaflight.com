## FRSKYF4 Board

The FrSky F4 flight controller integrated FrSky's X8R Receiver,OSD and SD Card in one board. This board use MPU6050.This board has no problem running fast loop times and ESC protocols. There is an On Screen Display (OSD) chip directly connected to the main processor (MCU). And the FC connect to the Receiver with SBUS and S.Port inner. You no longer need to mount another Reciver,and you can transimit FC's messages to Remote by Betaflight.
For maximum ease of use, some FrSkyF4's board has an onboard PDB up to 6s with a battery XT60 JACK.Just plug your battery straight into the flight controller and you're ready to go!

## MCU, Sensors and Features

## Hardware

- MCU: STM32F4
- IMU: MPU6000 (SPI)
- IMU Interrupt: Yes
- VCP: Yes
- Hardware UARTS: 3(UART1-->SBUS UART6-->S.PORT)
- OSD: BFOSD
- Blackbox: SD Card
- Battery Voltage Sensor: yes
- Integrated Voltage Regulator: Yes, supports up to 6S, 1AMP
- Brushed Motor Mosfets: No
- Buttons: 2 (1: DFU, 2:Receiver Bind)

## Features

- Current Sensor: PC1
- BlHeli passthrough: Yes
- WS2811 Led Strip: Yes
- Transponder: Yes
- Beeper: Inverted
- Receiver: FrSky X8R
- RSSI: SBUS CHANNEL 8

## Manufacturers and Distributors

FrSky(Manufacturers)

Available here soon:http://www.frsky-rc.com

## Designers

FrSky Co.Lt

## Maintainers

shang2017

## Differences:

add Receiver with FC on one board

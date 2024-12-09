# OMNIBUS

_Omnibus is Latin for "for all"._

## Description

The Omnibus F3 flight controller is an integrated flight controller and OSD specifically designed for ease of use and outstanding flight performance. The SPI-connected MPU6000 inertial motion sensor was chosen for it's high reliability, accuracy and update speed. This board has no problem running fast loop times and ESC protocols. There is an onboard barometer for altitude sensing along with an On Screen Display (OSD) chip directly connected to the main processor (MCU). This tight integration between the MCU and the OSD enables fast updates to the display and easy configuration of the OSD, which is managed straight from the BetaFlight configuration tool. You no longer need to worry about the extra hassle of configuring your OSD with a USB/UART adapter and 3rd party configuration tool, it's all built into the flight control software.

For maximum ease of use, the OmnibusF3 has an onboard voltage regulator that can easily handle up to a 5s battery. No need to mess with a PDB, just plug your battery straight into the flight controller and you're ready to go! Along with the robustly engineered power management system on the OmnibusF3, special precautions have been taken to ensure that the sensitive OSD chip is well protected, so you don't have to worry about any problems with your OSD. No need to use a spark arrestor, even on 5s!

## MCU, Sensors and Features

### Hardware

- MCU: STM32F3
- IMU: MPU6000 (SPI)
- IMU Interrupt: Yes
- BARO: BMP280 (SPI)
- VCP: Yes
- Hardware UARTS: 3
- OSD: Yes, BetaFlight OSD (BFOSD)
- Blackbox: SD Card
- PPM/UART Shared: UART3 (optionally)
- Battery Voltage Sensor: Yes, directly connected, no wiring necessary
- Integrated Voltage Regulator: Yes, supports up to 5S, 1.5AMP
- Brushed Motor Mosfets: No
- Buttons: 2 (1: DFU, 2: unassigned)

### Features

- Current Sensor: PA1
- BlHeli passthrough: Yes
- WS2811 Led Strip: Yes
- Transponder: Yes
- Beeper: Inverted

## Manufacturers and Distributors

[Airbot](https://myairbot.com) (manufacturer)

Available here: http://shop.myairbot.com/index.php/flight-control/cleanflight-baseflight/omnibusv11.html

#### Distributors

- http://www.readytoflyquads.com/
- https://www.pitchrollyaw.net
- https://www.fpv303.com

## Designers

[Airbot](https://myairbot.com) and [Nathan](https://github.com/nathantsoi)

## Maintainers

_(add your name here if you help test or contribute code for this board)_

[Nathan](https://github.com/nathantsoi)

## Similar Targets

_(add links board descriptions here that are similar in features or function, but have a separate target)_

- [SirinFPV](/docs/wiki/boards/legacy/SIRINFPV)

## Variants

OMNIBUS AIO F3 PRO - http://shop.myairbot.com/index.php/omnibus-prov1-72.html

Diffrences:

- Added Current Sensor
- Added Power Filter
- SBEC instead of LDO

## FAQ & Known Issues

_(add FAQs, known issues and workarounds specifically related to this board. please link work in progress issues to the related github issue or pull request)_

_format is reporter [name], (status): issue contents_

#### REMAP SERVOS AIRPLANE / FLYING WING

You will need to remap the pins currently assigned from the motors to servos in the CLI to get servo functionality!!!

The resources dump from my CLI looks like this for my flying wing, it remaps motors 3 and 4 to servos 1 and 2.

`resource MOTOR 1 B08`
`resource MOTOR 2 B09`
`resource MOTOR 3 NONE`
`resource MOTOR 4 NONE`
`resource MOTOR 5 B07`
`resource MOTOR 6 B06`
`resource MOTOR 7 NONE`
`resource MOTOR 8 NONE`
`resource SERVO 1 A02`
`resource SERVO 2 A03`
`resource SERVO 3 NONE`
`resource SERVO 4 NONE`
`resource SERVO 5 NONE`
`resource SERVO 6 NONE`
`resource SERVO 7 NONE`
`resource SERVO 8 NONE`

### Setup TRICOPTER in ßF 3.1.x

This setup is for the Flip32 F3 omnibus board using Betaflight 3.1.6
The Servo needs an external 5V source with enough current to power the servo. The Omnibus' on-board 5V will not power a servo.
First you need to setup the output motor # 4 to use as the servo controller.
In the Cli command you want the final results to look like the following for a F3 omnibus, others just substitute you motor assignments.

CLI

`# resource`
`resource BEEPER 1 C15`
`resource MOTOR 1 B08`
`resource MOTOR 2 B09`
`resource MOTOR 3 A03`
`resource MOTOR 5 B07`
`resource MOTOR 6 B06`
`resource SERVO 1 A02`
`resource PPM 1 B04`
`resource LED_STRIP 1 A08`

To get to the above, use the following commands in CLI

`Resource`

Record what motor 4 xx ( I.E. the xx assignment, in this case it was A02)

`Resource Motor 4 none`
`Resource Servo 1 A02`
`Save`

Enable the expert mode, on main page of CleanFlight top right.
Go to the Servo Tab (which will show up when you enable expert mode).

On the Servo Tab
Select the line that has Servo 0 and go across and put a "tick Mark under CH4"

`Save`

Connect your Tail servo to Motor 4 output.
(I just used the signal wire attached to signal out on Motor 4)
Make sure your servo has 5vdc and a ground from your PDB or whatever source you wish to use.

My tail servo is working correctly for the Flip F3 Omnibus.

Couple of other pointers:

1. If the servo is moving in the wrong direction, make the change in your transmitter.
2. It appears from what I can figure out on the Servo Tab selection vs the resource of a given Servo number,
   I.E. Servo1 cli, uses Servo 0 on the Servo Tab page So on the Servo Tab page it is Servo # (resource) -1 for Servo Tab.
3. If you wish to assign a servo to a Aux function.. Then the tick mark would be used in the A1-Axx box. So if you wished to assign a Say Aux 4, put the tick mark in A4.
4. Use the save button....on each change.

Regards BobFlyer

### Extra timer pin

If you are using S.BUS or other Serial RX receivers, then you can move your receiver input from SBUS/PPM header (J8) to UART3 RX (F3: J22/PWM6, F3 Pro: J12/PWM6), and make the SBUS/PPM header dedicated for PPM signal.

![](https://static.rcgroups.net/forums/attachments/5/9/3/2/6/3/t9770685-40-thumb-6547DA9F-A6FA-4217-BCB0-3355A92A6AC1.jpg?d=1486736891)

The PPM signal is connected to MCU pin PB4, and you can use this for single-wire software serial available in BF3.1.6 and later.
(taken from here : https://www.rcgroups.com/forums/showthread.php?2831228-OMNIBUS-F3-F3-Pro-PPM-An-extra-timer-pin)

`feature -RX_PPM` //disable the rx-pwm
`feature RX_SERIAL` //switch to serial receiver
`feature SOFTSERIAL` // enable soft serial
`resource SERIAL_TX 11 B04` // enable softSerial1 tx on pin B04(PPM on J8)
and/or `resource SERIAL_TX 12 B07` // enable softSerial2 tx on pin B07(PWM5 on J12)
`Save`

### Club 24A VCC-RAM Bypass Hack

if you experience incorrect current reading when using the VCC-RAM jumper then this is the suggested fix.
![](https://static.rcgroups.net/forums/attachments/5/9/3/2/6/3/a9529383-153-OMNIBUS_F3_PRO_VCC-RAM_Bypass_0.jpg)
![](https://static.rcgroups.net/forums/attachments/5/9/3/2/6/3/a9529390-246-OMNIBUS_F3_PRO_VCC-RAM_Bypass_1.jpg)
![](https://static.rcgroups.net/forums/attachments/5/9/3/2/6/3/a9529395-59-OMNIBUS_F3_PRO_VCC-RAM_Bypass_3.jpg)

(taken from here : https://www.rcgroups.com/forums/showpost.php?p=36217140&postcount=640)

## Other Resources

Setup Guide: https://nathan.vertile.com/blog/2016/07/07/omnibus-typhoon-miniquad/

Rcgroups Thread: http://www.rcgroups.com/forums/showthread.php?t=2711617

## Image

OMNIBUS AIO F3
![](http://shop.myairbot.com/media/catalog/product/cache/1/image/54b2359dd2430bcca06ee462d488eb40/o/m/omnibusf3-v1.1-3.jpg)
OMNIBUS AIO F3 PRO
![](http://shop.myairbot.com/media/catalog/product/cache/1/image/54b2359dd2430bcca06ee462d488eb40/o/m/omnibusf3-pro-4_1.jpg)
![](https://nathan.vertile.com/assets/images/blog/airbot/180/omnibusf3-pro-top-a0c107c7.png)
![](https://nathan.vertile.com/assets/images/blog/airbot/180/omnibusf3-pro-bottom-c19f8aea.png)

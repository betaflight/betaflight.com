# SP RACING™ F3 EVO

AFFORDABLE RACE-READY NEXT-GENERATION HARDWARE

## Description

The Seriously Pro Racing F3 EVO Flight Controller (SPRacingF3EVO) was designed to give awesome flight performance in a stackable race-ready package. It has the latest sensors, race timing & logging technology backed by excellent connectivity options at a wallet-friendly price.

## MCU, Sensors and Features

### Hardware
  - MCU: STM32F3
  - IMU: MPU9250 accelerometer/gyro/compass (SPI)
  - IMU Interrupt: Yes
  - BARO: BMP280
  - VCP: Yes
  - Hardware UARTS: 3
  - OSD: No
  - Blackbox: MicroSD card slot (SD/SDHC, upto 32GB)
  - PPM/UART Shared: UART2
  - Battery Voltage Sensor: Yes
  - Integrated Voltage Regulator: Yes (3.3V 100mA max. / 5.0V is also supplied when powering via USB)
  - Brushed Motor Mosfets: No
  - Buttons: No

### Features
  - PPM only: Yes
  - RSSI: Yes (Analog/PWM)
  - Buzzer: Yes
  - Telemetry port: Yes
  - Spektrum Satellite Receivers: Yes (Connector supplied)
  - Current Sensor: Yes
  - BlHeli passthrough: Yes
  - WS2811 Led Strip: Yes**
  - Transponder: Yes**

** You can only use Led Strip or Transponder, but not both together.

## Hardware Designs (if available)

## Manufacturers and Distributors

 [Seriously Pro](http://seriouslypro.com/)

Available here: [Seriously Pro Shop](http://shop.seriouslypro.com/sp-racing-f3-evo)

## Designers

Hardware design by [Dominic Clifton](https://github.com/hydra).

## Maintainers

[Cleanflight firmware](https://github.com/cleanflight/cleanflight/releases) and [GUI tools](https://chrome.google.com/webstore/detail/cleanflight-configurator/enacoimjcgeinfnnnpajinjgmkahmfgb) are maintained by [Dominic Clifton](https://github.com/hydra).

[Betaflight firmware](https://github.com/betaflight/betaflight/releases) and [GUI tools](https://chrome.google.com/webstore/detail/betaflight-configurator/kdaghagfopacdngbohiknlhcocjccjao) are maintained by [Boris B](https://github.com/borisbstyle).

## Similar Targets
_(add links board descriptions here that are similar in features or function, but have a separate target)_

## Variants
_(add links to boards here that are similar in features or function, but use this target when flashing)_

## FAQ & Known Issues
* Softserial is disabled for this target in bf 3.1.7 but works in nightly build 3.2.0 as of today (2017-05-13).
* DSHot does not work out of the box, due to DMA limitations. The solution to enable DSHOT on this board is to remap motor 4 to motor pin 5 (A06), this can be done through CLI as follows:

`resource MOTOR 5 NONE`

`resource MOTOR 4 A06`

`save`

Note that, if you wish to use SDCARD Blackbox logging with DSHOT, you will have to disable SDCARD DMA. This will negatively impact SDCARD logging rate. As of BF 3.2.0-RC3 there is no other solution. This can be done as follows:

`set sdcard_dma = OFF`

`save`

Source: https://github.com/betaflight/betaflight/issues/2162

## Other Resources

Manual: [SPRacingF3EVO PDF manual](http://seriouslypro.com/files/SPRacingF3EVO-Manual-latest.pdf)

Rcgroups Thread: [SPRacingF3EVO flight controller - CHEAP! F3/SDCard Socket/Race Transponder](http://www.rcgroups.com/forums/showthread.php?t=2641205)

## Image

![](http://shop.seriouslypro.com/pub/media/catalog/product/cache/1/image/e9c3970ab036de70892d86c6d221abfe/i/m/img_9310-web.jpg)

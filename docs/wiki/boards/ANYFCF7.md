## Description

Opensource (CC BY-SA 3.0) STM32F7 based flightcontroller designed for BetaFlight and InavFlight usage.
Source: https://github.com/sambas/hw/tree/master/AnyFCF7

## MCU, Sensors and Features

### Hardware

- Size: 36x36mm (30.5x30.5 mounting holes)
- MCU: STM32F745VGT 100pin lqfp
- IMU: MPU6000 SPI
- IMU Interrupt: Yes
- Baro: MS5611
- VCP: Yes
- Hardware UARTS: 8
- 10-pwm outputs (DSHOT supported six of them)
- 6-pwm inputs (PPM on input 1 and UART6 on input 3/4)
- Blackbox: SD card
- Battery Voltage Sensor: Yes, 10k/1k divider
- Current sensor input: Yes, 1k series resistor protection
- Analog RSSI input: Yes, 1k series resistor protection
- Solder pads for DFU boot
- Dedicated external I2C for compass, pitot etc.
- External SPI shared on UART4/5 connector for future upgrades (osd, imu)
- CAN-bus ready

### Features

- BlHeli passthrough: Yes
- WS2811 Led Strip: Yes (mapped to output 4)

## Manufacturers and Distributors

MXK? started to produce these, but used cheaply sourced parts. Currently known sources for these boards:

- https://www.banggood.com/STM32F745-100lqfp-216MHz-MPU6000-SPI-F7-Flight-Controller-for-FPV-Racing-Support-Betaflight-p-1137386.html
- http://www.buzzhobbies.com.au/anyfc-f7-flight-controller
- http://www.readytoflyquads.com/anyf7-fc

## Designers

Sambas

## Maintainers

Sambas

## FAQ & Known Issues

SDcard detect not working correctly on chinaboards

### Output pinout

| Output number | MCU Pin | Default motor |    DSHOT     |      Other       |
| ------------- | :-----: | :-----------: | :----------: | :--------------: |
| 1             |   A03   |       4       | YES DMA1_ST6 |                  |
| 2             |   A01   |       3       | YES DMA1_ST4 |                  |
| 3             |   E06   |               |      NO      |                  |
| 4             |   B05   |               | YES DMA1_ST5 | Default LEDSTRIP |
| 5             |   B09   |               |      NO      |                  |
| 6             |   A02   |       2       | YES DMA1_ST1 |                  |
| 7             |   A00   |               | YES DMA1_ST2 |                  |
| 8             |   B03   |               | YES DMA1_ST6 |                  |
| 9             |   B04   |               | YES DMA1_ST4 |                  |
| 10            |   B08   |       1       | YES DMA1_ST7 |                  |

## Other Resources

RC Groups Thread: https://www.rcgroups.com/forums/showthread.php?2847666-Next-generation-flight-controller-AnyFC-F7

# How to Create a Flight Controller Configuration File for Betaflight

Under construction.

This document describes how to create a flight controller configuration file for Betaflight 4.5 and is a work in progress.

## Introduction

Firmware 4.5 no longer uses unified-targets but instead uses a configuration file for each flight controller.
This guide will walk you through the process of creating a configuration file.

## Overview

1. Create a new configuration file in the [config repository](https://github.com/betaflight/config).
2. The configuration file consists of defines and is independent from using CLI commands. All defines are in the format `#define <setting> [value]`.
3. Other directives can be used in the configuration file, e.g. `#ifdef`, `#else` and `#endif`.

## Configuration

### License Information

The license information is used to identify the license of the firmware. The configuration file needs to start with:

```
/*
 * This file is part of Betaflight.
 *
 * Betaflight is free software. You can redistribute this software
 * and/or modify this software under the terms of the GNU General
 * Public License as published by the Free Software Foundation,
 * either version 3 of the License, or (at your option) any later
 * version.
 *
 * Betaflight is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public
 * License along with this software.
 *
 * If not, see <http://www.gnu.org/licenses/>.
 */

#pragma once

```

### Board Configuration

```
#define FC_TARGET_MCU ATF435M
#define BOARD_NAME AIRBOTF435
#define MANUFACTURER_ID AIRB
```

### Hardware Defines

For a list of hardware defines please see [Definitions for Targets](manufacturer-design-guidelines.md#42-definitions-for-targets).

### Pin Resources

The pin resources are used to configure the pins on the flight controller.

### Timer and Dma Resources

The timer and DMA resources are used to configure the timers and DMA on the flight controller.
Configure the timer in CLI:

Example using a STM32F722:

```
#timer
timer A00 AF2
# pin A00: TIM5 CH1 (AF2)
timer A01 AF2
# pin A01: TIM5 CH2 (AF2)
timer A02 AF2
# pin A02: TIM5 CH3 (AF2)
timer A03 AF2
# pin A03: TIM5 CH4 (AF2)
timer B00 AF2
# pin B00: TIM3 CH3 (AF2)
timer B01 AF2
# pin B01: TIM3 CH4 (AF2)
timer C07 AF3
# pin C07: TIM8 CH2 (AF3)
timer C08 AF3
# pin C08: TIM8 CH3 (AF3)
timer C09 AF3
# pin C09: TIM8 CH4 (AF3)
```

Also set the DMA options, so the command `timer map` outputs the right values, else they will be `-1` for `dmaopt` (which is unused).

e.g.

```
dma pin A01 0
# pin A01: DMA1 Stream 4 Channel 6
dma pin A00 0
# pin A00: DMA1 Stream 2 Channel 6
```

The below is an example of the output after running timer map in CLI:

```
#timer map

Timer Mapping:
    TIMER_PIN_MAP(0, PA0, 2, 0)
    TIMER_PIN_MAP(1, PA1, 2, 0)
    TIMER_PIN_MAP(2, PA2, 2, -1)
    TIMER_PIN_MAP(3, PA3, 2, -1)
    TIMER_PIN_MAP(4, PB0, 2, 0)
    TIMER_PIN_MAP(5, PB1, 2, 0)
    TIMER_PIN_MAP(6, PC7, 2, -1)
    TIMER_PIN_MAP(7, PC8, 2, -1)
    TIMER_PIN_MAP(8, PC9, 2, -1)
```

To enable the `timer map` command you need to add the define `USE_TIMER_MAP_PRINT` so use either:

```
make TARGET EXTRA_FLAGS="-DUSE_TIMER_MAP_PRINT"
```

The `TIMER_PIN_MAP` config statement is broken down as follows:

`TIMER_PIN_MAP(WW, XX, YY, ZZ)`

- WW - zero-indexed counter, increment by 1 for each line in the timer map
- XX - pin number to set the timer on
- YY - selected instance of the timer configuration where multiple options are available. See your MCU's target timer code for the list of options. For example F772 should reference [this timer file](https://github.com/betaflight/betaflight/blob/master/src/platform/STM32/timer_stm32f7xx.c).
- ZZ - DMA setting for that timer, same number as used in the `dma pin <pin number> <dma>` command.

### Serial Configuration

The serial configuration is used to configure the serial ports on the flight controller. The following defines are available:

|  Value | Function define      |
| -----: | -------------------- |
|      1 | MSP_UART             |
|      2 | GPS_UART             |
|     64 | SERIALRX_UART        |
|     32 | SBUS_TELEMETRY_UART  |
|   1024 | ESC_SENSOR_UART      |
|   2048 | VTX_SMARTAUDIO_UART  |
|   8192 | VTX_TRAMP_UART       |
| 131072 | VTX_MSP_UART         |
| 131073 | MSP_DISPLAYPORT_UART |

The following example shows how to configure the serial ports for receiver, GPS and SmartAudio VTX.

```
#define SERIALRX_UART SERIAL_PORT_USART1
#define VTX_SMARTAUDIO_UART SERIAL_PORT_USART3
#define GPS_UART SERIAL_PORT_USART4
```

:::note

Serial command is zero index based, so the first serial port is `SERIAL_PORT_USART1` and not `SERIAL_PORT_USART0`.
<br />
The USART is meant to do all of the “heavy lifting” serial communication during periods of “high” energy consumption.
<br />
When the microcontroller is asleep and in a low power mode, though, the UART peripheral can handle low speed communications while offering a reduced energy footprint. Betaflight has UART4, UART5 and UART9. Other serial ports are USUART as some boards provide LPUART1

:::

### Gyro Alignment Settings

Gyro alignment configuration is mutual exclusive.

Default we use #define `USE_GYRO_1_ALIGN` `ALIGNMENT`

where `ALIGNMENT` preset is one of
```bash
CW0_DEG
CW90_DEG
CW180_DEG
CW270_DEG
CW0_DEG_FLIP
CW90_DEG_FLIP
CW180_DEG_FLIP
CW270_DEG_FLIP
ALIGN_CUSTOM
```

When using `ALIGN_CUSTOM` specify orientation in `DECIDEGREES` ranging from -3600-3600:

```
#define ALIGN_1_GYRO_ROLL DECIDEGREES
#define ALIGN_1_GYRO_PITCH DECIDEGREES
#define ALIGN_1_GYRO_YAW DECIDEGREES
```

### Serial Receiver Provider

BNF boards may want to configure the serial receiver provider on the flight controller. Example:

```
#define SERIALRX_PROVIDER CRSF
```

### ADC Configuration

The ADC configuration is used to configure the ADC on the flight controller.

### Bus Configuration

The bus configuration is used to configure the I2C and SPI buses on the flight controller.

### LED Configuration

The LED configuration is used to configure the LED on the flight controller.

### OSD Configuration

The OSD configuration is used to configure the OSD on the flight controller.

### VTX Configuration

The VTX configuration is used to configure the VTX on the flight controller.

# How to Create a Flight Controller Configuration File for Betaflight

This document describes how to create a flight controller configuration file (`config.h`) for Betaflight 4.5 and later.

## Introduction

From Betaflight 4.5 onwards, unified targets are deprecated and each flight controller is described by a configuration file in the [config repository](https://github.com/betaflight/config) instead.
This guide will walk you through the process of creating a configuration file.

## Overview

1. Create a new configuration file in the [config repository](https://github.com/betaflight/config).
2. The configuration file consists of defines and is independent from using CLI commands. All defines are in the format `#define <setting> [value]`.
3. Other directives can be used in the configuration file, e.g. `#ifdef`, `#else` and `#endif`.

## Directory Layout

Configs are grouped by manufacturer. A board's configuration lives at:

```
configs/<MANUFACTURER_ID>/<BOARD_NAME>/config.h
```

where `<MANUFACTURER_ID>` is the four-letter manufacturer code declared by the config itself (see the [manufacturers list](https://github.com/betaflight/config/blob/master/Manufacturers.md)), and `<BOARD_NAME>` is the config's board name. Any optional `config.c` or `config.mk` for the target sits in that same directory.

The build selects a target by board name alone and locates the manufacturer directory for you:

```
make configs
make <BOARD_NAME>
```

Because the manufacturer directory is not part of the target selection, **board names must be unique across the whole repository**. If the same board name exists under two manufacturers, the build fails with an `Ambiguous CONFIG` error.

Four manufacturer IDs are reserved for configs that do not belong to a registered vendor:

| ID     | Used for                                                 |
| :----- | :------------------------------------------------------- |
| `CUST` | Homebrew and custom targets                              |
| `FOSS` | Free open source target definitions                      |
| `COMM` | Community provided definitions for closed source targets |
| `LEGA` | Closed source legacy targets without a maintainer        |

Every other ID belongs to a registered manufacturer. The manufacturer ID is also what the Configurator uses to decide whether it may load a board configuration, so it must be registered in [Manufacturers.md](https://github.com/betaflight/config/blob/master/Manufacturers.md) before the first target is submitted.

:::note

Configurations were previously stored flat, as `configs/<BOARD_NAME>/config.h`. The build still accepts that layout — a flat match takes precedence — but all configurations in the repository are now grouped by manufacturer, and new submissions must follow the grouped layout. If you are working from an older fork, rebase onto current `master` before adding a target.

:::

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
#define FC_TARGET_MCU AT32F435M
#define BOARD_NAME ATSTARTF435
#define MANUFACTURER_ID ATRY
```

`FC_TARGET_MCU` must be one of the target names the firmware provides — see [Supported MCU Platforms and Targets](manufacturer-design-guidelines#44-supported-mcu-platforms-and-targets) for the full list. A value that does not match a target fails the build.

These three defines are mandatory — both the firmware build and the cloud build API derive the target's identity from them:

| Define            | Purpose                                                                                                     |
| :---------------- | :---------------------------------------------------------------------------------------------------------- |
| `FC_TARGET_MCU`   | MCU family/type. The build derives `TARGET` from this and fails if it is missing or cannot be parsed.       |
| `BOARD_NAME`      | Unique board name. Must match the config's leaf directory name (`configs/<MANUFACTURER_ID>/<BOARD_NAME>/`). |
| `MANUFACTURER_ID` | Four-letter manufacturer code. Must match the parent directory the config lives under.                      |

Commonly used optional defines:

| Define              | Purpose                                                                                                                                                         |
| :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SYSTEM_HSE_MHZ`    | External oscillator frequency in MHz; sets `HSE_VALUE` for the clock tree. Required on boards with an HSE crystal, omit if running off the internal oscillator. |
| `FC_VMA_ADDRESS`    | Sets the load/run (VMA) address. Its presence switches the build to an EXST (bootloader-relocated) image. Rare.                                                 |
| `TIMER_PIN_MAPPING` | Per-pin timer/DMA assignment, see [Timer and Dma Resources](#timer-and-dma-resources) below.                                                                    |

### Hardware Defines

For a list of hardware defines please see [Definitions for Targets](manufacturer-design-guidelines#42-definitions-for-targets).

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

### Gyro Wiring

Each gyro slot needs its bus and pins declared. The slot number also determines how many gyros the firmware expects: the gyro count is derived from how many `GYRO_<n>_CS_PIN` defines are present, and up to four slots are available.

```
#define GYRO_1_SPI_INSTANCE SPI1
#define GYRO_1_CS_PIN       PB2
#define GYRO_1_EXTI_PIN     PC4
```

:::warning

Always provide an interrupt (EXTI) pin for every gyro. Without `GYRO_<n>_EXTI_PIN` the driver falls back to polled SPI reads — no interrupt-synchronised sampling and no DMA — which costs flight performance. Practically every current config defines it.

:::

On a dual-gyro board, add the second slot and select which gyro is used by default:

```
#define GYRO_2_SPI_INSTANCE SPI2
#define GYRO_2_CS_PIN       PB12
#define GYRO_2_EXTI_PIN     PC5
#define DEFAULT_GYRO_TO_USE GYRO_CONFIG_USE_GYRO_1
```

`DEFAULT_GYRO_TO_USE` accepts `GYRO_CONFIG_USE_GYRO_1`, `GYRO_CONFIG_USE_GYRO_2` or `GYRO_CONFIG_USE_GYRO_BOTH`. Note that the I2C gyro path is disabled whenever more than one gyro is present.

Where an ICM-42688-P is fitted with an external clock source, declare it as well:

```
#define USE_GYRO_CLKIN
#define GYRO_1_CLKIN_PIN PB9
```

The external clock is only applied to the ICM-42688-P, at a fixed 32 kHz, even though other parts in the family have the same capability.

### Gyro Alignment Settings

Gyro alignment is set per gyro slot with `GYRO_1_ALIGN` (and `GYRO_2_ALIGN` for a second gyro):

```
#define GYRO_1_ALIGN CW180_DEG
```

where the alignment preset is one of

```bash
ALIGN_DEFAULT
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

For an orientation the presets cannot express, give the rotation in decidegrees (range -3600 to 3600):

```
#define GYRO_1_ALIGN_ROLL  0
#define GYRO_1_ALIGN_PITCH 0
#define GYRO_1_ALIGN_YAW   1350
```

The per-axis defines set the alignment to `ALIGN_CUSTOM` on their own, so `GYRO_1_ALIGN` can be left out. If it is given, it must be `ALIGN_CUSTOM` — combining a preset such as `CW180_DEG` with per-axis values fails the build. `GYRO_1_CUSTOM_ALIGN` is the alternative, pre-composed form of the same setting, and is mutually exclusive with the per-axis defines.

Where the whole board is rotated relative to the airframe, use `DEFAULT_ALIGN_BOARD_YAW` rather than baking the rotation into the gyro alignment. Magnetometer alignment follows the same pattern with `MAG_ALIGN` and `MAG_ALIGN_ROLL` / `MAG_ALIGN_PITCH` / `MAG_ALIGN_YAW`.

### Serial Receiver Provider

BNF boards may want to configure the serial receiver provider on the flight controller. Example:

```
#define SERIALRX_PROVIDER CRSF
```

### ADC Configuration

The ADC configuration is used to configure the ADC on the flight controller.

### Bus Configuration

The bus configuration is used to configure the I2C and SPI buses on the flight controller, and to tell each peripheral which bus it sits on.

Sensors on a bus other than the board default must say so — the barometer and magnetometer default to `I2C_DEVICE`, so a baro on a second I2C bus will not be found unless its instance is declared:

```
#define BARO_I2C_INSTANCE I2CDEV_2
#define MAG_I2C_INSTANCE  I2CDEV_1
```

Blackbox flash needs its chip select and bus:

```
#define FLASH_CS_PIN       PB3
#define FLASH_SPI_INSTANCE SPI3
```

Use `FLASH_QUADSPI_INSTANCE` or `FLASH_OCTOSPI_INSTANCE` instead where the chip is on a QuadSPI or OctoSPI peripheral.

Where a sensor cannot use its default I2C address, or the board ships with a specific part fitted, the defaults can be pinned:

```
#define DEFAULT_BARO_DEVICE      BARO_DPS310
#define DEFAULT_BARO_I2C_ADDRESS 118
#define MAG_I2C_ADDRESS          13
```

Note that these address defines take a decimal value (118 is 0x76). Prefer leaving a sensor at its default address so that Betaflight can detect it automatically.

### LED Configuration

The LED configuration is used to configure the LED on the flight controller.

### OSD Configuration

The OSD configuration is used to configure the OSD on the flight controller.

### VTX Configuration

The VTX configuration is used to configure the VTX on the flight controller.

## Supported Target Header

The cloud build API reads a comment block placed after the GPL header and before `#pragma once`. It marks a target as officially supported and gates which firmware releases the target is offered for. The directive lines are parsed by splitting on whitespace, so the first non-whitespace token on each line must be the keyword — do not prefix these lines with `*`:

```
/*
    SUPPORTED TARGET - THANK YOU
    REFERENCE: sha256_98b7e664d2f1544c315aec575140e68e4d89bebde9ec11222c8eaf63b018d4fa
    DATE: 2025-01-01
    VERSION: 4.6.0
*/
```

| Field        | Meaning                                                                                                                                                                                                                                                                                |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REFERENCE:` | A `sha256_…` value marking the target as reviewed and supported by the Betaflight team, as opposed to community-supported. The Betaflight team provides this value once a target has been reviewed; it cannot be self-generated. It is validated against the upper-cased `BOARD_NAME`. |
| `DATE:`      | Reference date (`YYYY-MM-DD`). The target is excluded from any release published before this date, so a new board does not appear against older releases that never supported it.                                                                                                      |
| `VERSION:`   | The first firmware version the target is valid for. Earlier releases are never offered for the target, irrespective of `DATE:`.                                                                                                                                                        |
| `GROUP:`     | Categorises the target. `SUPPORTED` is the implicit default; `LEGACY` flags an older board so it is grouped and sorted separately in the configurator's target list. A legacy target is not team-supported, so it carries no `REFERENCE:`.                                             |

`REFERENCE:` together with a non-empty `BOARD_NAME` are required for the supported marking to take effect; `DATE:`, `VERSION:` and `GROUP:` are optional. `WIKI:` and `URL:` directives are recognised in the same block.

:::warning

The cloud build API takes the target's identity from the `BOARD_NAME` define, not from the directory the config sits in, while a local build finds the config by directory name. If the two disagree, the board builds locally under one name and registers with the cloud build under another. Always keep `BOARD_NAME` identical to the leaf directory name, and `MANUFACTURER_ID` identical to the parent directory name.

:::

## Optional Files

### config.c

If a `config.c` sits alongside `config.h` it is compiled into the build and `USE_CONFIG_SOURCE` is defined. Use it for configuration logic that cannot be expressed as plain `#define`s.

### config.mk

A per-config `config.mk` lets a target inject build-system (make) variables that a `config.h` cannot express. It is `-include`d by the firmware build when present, before the target makefiles, so it can set or override build flags. Only a small number of targets need one — most boards are fully described by `config.h` alone.

The currently recognised setting is `OCTOSPI_FLASH_CHIP`, which selects the boot/config flash chip wired to the OCTOSPI/XSPI peripheral. It emits both `-DUSE_FLASH_<chip>` (driver gating) and `-DOCTOSPI_FLASH_CHIP_<chip>` (build-time chip selection). The build-time selection is needed for chips that cannot be probed via JEDEC RDID at runtime — for example a chip left in 8-line OPI mode by the bootloader.

```
# Boot flash chip on OPENN657V1 is Macronix MX66UW1G45G (1 Gbit octal NOR).
# The OpenBootloader leaves it in 1S-1S-1S mode for BF; flash.c uses
# build-time selection (OCTOSPI_FLASH_CHIP_<chip>) because the chip
# cannot answer 1/4-line JEDEC RDID while configured for OPI.
OCTOSPI_FLASH_CHIP := MX66UW1G45G
```

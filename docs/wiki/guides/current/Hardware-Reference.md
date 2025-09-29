# Hardware Reference

## Introduction

This page provides details for hardware developers for future boards to ensure maximum compatibility with Betaflight.

## Target Maintenance

A hardware developer is responsible for developing, and maintaining, their target within Betaflight. Target files are being separated as much as possible to the main code so as to facilitate this.

## Adding new targets

If you are adding a new flight controller then:

1. Make any PRs against the `master`.
2. Don't change the `travis.yml` or `fake_travis_build.sh` files - these are just for a subset off all builds to check PRs
3. Add page to board section in support describing the flight controller and giving a link to at least one supplier.

## Hardware

### MPU (SPI versus I2C)

### MPU Interrupt

### Blackbox Flash

### MCU

Excerpts from the data sheets / reference manuals that cover possible pin / timer / DMA assignments:

- [STM32F3](/reference/stm/stm32f3_pins_timers_dma.pdf)
- [STM32F405](/reference/stm/stm32f405_pins_timers_dma.pdf)
- [STM32F411](/reference/stm/stm32f411_pins_timers_dma.pdf)
- [STM32F722](/reference/stm/stm32f722_pins_timers_dma.pdf)
- [STM32F745](/reference/stm/stm32f745_pins_timers_dma.pdf)
- [STM32H743](/reference/stm/stm32h743_pins.pdf) (pins only)

## Protocols

### Telemetry

#### IBus

[IBus telemetry specification](/docs/wiki/guides/current/IBus-telemetry)

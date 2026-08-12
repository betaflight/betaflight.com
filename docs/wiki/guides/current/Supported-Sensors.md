# Supported Sensors

## Introduction

This page lists the sensors Betaflight has drivers for. It reflects firmware master; older releases may not include the most recently added parts.

The authoritative source is always the firmware itself — see the driver directories `src/main/drivers/accgyro`, `barometer`, `compass`, `rangefinder`, `opticalflow` and `flash`. Board manufacturers should use the exact define names listed in the [Manufacturer Design Guidelines](/docs/development/manufacturer/manufacturer-design-guidelines#42-definitions-for-targets).

:::note

Having a driver does not make a part a good choice. Recommendations for new hardware designs are in the [Manufacturer Design Guidelines](/docs/development/manufacturer/manufacturer-design-guidelines), and parts that are no longer accepted for new designs are called out there.

:::

## Gyroscope and Accelerometer

Gyroscopes must be connected over SPI. I2C gyros are not supported for new designs.

| Chip                               | Bus | Notes                                                                       |
| :--------------------------------- | :-- | :-------------------------------------------------------------------------- |
| ICM-42688-P                        | SPI | Recommended for new designs; 8 kHz sampling, external clock input supported |
| LSM6DSK320X                        | SPI | Supported alternative where the ICM-42688-P cannot be sourced               |
| LSM6DSV16X                         | SPI |                                                                             |
| LSM6DSO / LSM6DSOX                 | SPI |                                                                             |
| ICM-42605                          | SPI |                                                                             |
| ICM-42622-P                        | SPI |                                                                             |
| ICM-42686-P                        | SPI |                                                                             |
| ICM-45605                          | SPI | 6.4 kHz gyro sampling                                                       |
| ICM-45686                          | SPI | 6.4 kHz gyro sampling                                                       |
| ICM-56686                          | SPI | 6.4 kHz gyro sampling                                                       |
| ICM-40609D                         | SPI |                                                                             |
| IIM-42652                          | SPI |                                                                             |
| IIM-42653                          | SPI |                                                                             |
| ICM-20649                          | SPI |                                                                             |
| ICM-20689                          | SPI |                                                                             |
| ICM-20601 / ICM-20602 / ICM-20608G | SPI | Handled by the MPU6500 driver                                               |
| MPU-6000                           | SPI | End-of-life; still the most common part in existing configs                 |
| MPU-6500                           | SPI | Legacy, not accepted for new designs                                        |
| MPU-9250                           | SPI | Legacy; includes an AK8963 magnetometer                                     |
| BMI270                             | SPI | Not recommended (uncalibrated gyro, 3.2 kHz maximum sample rate)            |
| BMI160                             | SPI | Legacy                                                                      |
| MPU-6050                           | I2C | Legacy only; I2C gyros are not accepted for new designs                     |
| L3GD20                             | SPI | Obsolete gyro-only part                                                     |

The BMI323 is **not** supported.

## Barometer

Betaflight strongly recommends connecting barometers over I2C.

| Chip                          | Bus       | Notes                                                                                                |
| :---------------------------- | :-------- | :--------------------------------------------------------------------------------------------------- |
| DPS310 / DPS368               | I2C / SPI | One driver covers DPS310, DPS368, SPL07-003 and SPA06-003. DPS368 is the most accurate of the family |
| BMP280                        | I2C / SPI | Very common; beware clones that report as a BMP280                                                   |
| BMP388                        | I2C / SPI |                                                                                                      |
| BMP580 / BMP581               | I2C       | Default I2C address 0x47 (0x46 with SDO low), unlike the 0x76/0x77 used by most barometers           |
| MS5611                        | I2C / SPI |                                                                                                      |
| QMP6988                       | I2C / SPI |                                                                                                      |
| LPS22DF                       | I2C / SPI |                                                                                                      |
| LPS22 / LPS25 / LPS33 / LPS35 | SPI       | STMicroelectronics LPS family, SPI only (`USE_BARO_SPI_LPS`)                                         |
| 2SMPB-02B                     | I2C / SPI |                                                                                                      |
| BMP085                        | I2C       | Legacy, not recommended for new designs                                                              |

There is no separate DPS368 or BMP390 driver — use the DPS310 and BMP388 drivers respectively.

## Magnetometer

Betaflight strongly recommends connecting magnetometers over I2C, and using each part's default I2C address so that it can be detected automatically.

| Chip     | Bus       | Notes                                                                       |
| :------- | :-------- | :-------------------------------------------------------------------------- |
| QMC5883L | I2C       | Normal axis orientation, works well; default address 0x0D                   |
| QMC5883P | I2C       | Default address 0x2C                                                        |
| HMC5883L | I2C / SPI |                                                                             |
| LIS2MDL  | I2C       |                                                                             |
| LIS3MDL  | I2C       |                                                                             |
| MMC560X  | I2C       |                                                                             |
| AK8963   | I2C / SPI | Also reachable through the MPU925X pass-through                             |
| AK8975   | I2C       | Legacy                                                                      |
| IST8310  | I2C       | Not recommended — non-standard axis orientation requires a custom alignment |

## Rangefinder and Optical Flow

| Device                          | Interface | Notes                          |
| :------------------------------ | :-------- | :----------------------------- |
| Benewake TFmini / TF02 / TFnova | UART      | Rangefinder                    |
| Micoair MTF-01 / MTF-02         | UART, MSP | Rangefinder and optical flow   |
| UPT1                            | UART      | Rangefinder and optical flow   |
| Nooploop TOFSense               | UART      | Rangefinder                    |
| HC-SR04                         | GPIO      | Ultrasonic rangefinder, legacy |

## Blackbox Flash

| Chip family                             | Interface               | Notes                                                              |
| :-------------------------------------- | :---------------------- | :----------------------------------------------------------------- |
| Winbond W25Qxx and JEDEC-compatible NOR | SPI                     | Covered by the M25P16 driver's JEDEC ID table                      |
| Winbond W25Q128FV                       | SPI / QuadSPI / OctoSPI |                                                                    |
| PUYA PY25Q128HA                         | SPI                     | Uses the M25P16 driver                                             |
| Winbond W25N01G / W25N02K               | SPI                     | NAND                                                               |
| Winbond W25M512 / W25M02G               | SPI                     | Stacked die                                                        |
| Micron MT29F                            | SPI                     | NAND, 3.3 V and 1.8 V variants                                     |
| Macronix MX66UW1G45G                    | OctoSPI                 | Selected through the target's `config.mk`, not a `config.h` define |

An SD card can be used instead of flash where the board provides one.

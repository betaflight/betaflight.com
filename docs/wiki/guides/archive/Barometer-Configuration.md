# Barometer Configuration

With 3.2, barometer driver was converted to be fully configurable / reconfigurable.

As a side effect, how related definitions in target.h are interpreted has been changed in large. Measures to keep backward compatibility has been taken, but there might be cases in which working setups with barometer fail to work with 3.2.

This page explains CLI variables/command to configure barometers at runtime to bring barometers back in the working state, as well as changes in default configuration determination for target maintainers.

### Barometer configuration with CLI

- Barometer related CLI variables

| Variable           | Range                                                                                              | Description                                                                                                                                                                             |
| ------------------ | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `baro_bustype`     | `NONE`, `I2C`, `SPI`                                                                               | Specifies a type of bus a selected barometer device is connected.                                                                                                                       |
| `baro_i2c_device`  | `0` ~ Max I2C bus ordinate for MCU type (1 origin, same as `x` in `I2Cx` expression in `target.h`) | Specifies a bus ordinate of the I2C bus the device is connected when `baro_bustype` is `I2C`. `0` means "none".                                                                        |
| `baro_i2c_address` | `0` ~ `119` (0x77)                                                                                 | Specifies an I2C address of the device in 7-bit representation. `0` is a special value to specify "_driver default address_". Values `1`~`7` are invalid and behavior is unpredictable. |
| `baro_spi_device`  | `0` ~ Max SPI bus ordinate for MCU type (1 origin, same as `x` in `SPIx` expression in `target.h`) | Specifies a bus ordinate of the SPI bus the device is connected when `baro_bustype` is `SPI`. `0` means "none".                                                                         |
| `baro_hardware`    | `NONE`, `AUTO`, `BMP280`, `MS5611`, `BMP085`                                                       | `NONE` = Barometer support disabled. `AUTO` = Firmware will determine device to use under pre-defined rule. `BMP280`, `MS5611` and `BMP085` = Explicitly specifies device to use.       |

- If the device is SPI connected, CS (Chip Select) pin can be specified with the `resource` CLI command

| Resource name | Description                                                                  |
| ------------- | ---------------------------------------------------------------------------- |
| `BARO_CS`     | Specifies CS (Chip Select) pin to enable the SPI connected barometer device. |

- Note that not all combination of bus type and devices are built-in for a particular target.

- A combination of `baro_hardware = AUTO`, `baro_bustype = I2C` and `baro_i2c_address = 0` will cause all built-in I2C devices types to be scanned on the specified `baro_i2c_device`, in the order of `BMP280`, `MS5611` and `BMP085`.

### Target definition changes

This section is intended for target maintainers and developers.

#### `USE_BARO_xxx` and `USE_BARO_SPI_xxx` are now independent.

Prior to 3.2, to configure a device `xxx` on SPI required both `USE_BARO_xxx` and `USE_BARO_SPI_xxx` defined (and this combination disabled I2C support for the device `xxx`). With 3.2, this dependency/relationship has been removed. `USE_BARO_xxx` configures an I2C variant of the `xxx` and `USE_BARO_SPI_xxx` configures an SPI variant of `xxx`. If both specified, both I2C and SPI variants are configured.

Right now, as inherited from 3.1.7, targets that use SPI connected barometer defines both `USE_BARO_xxx` and `USE_BARO_SPI_xxx`, so they are configured for both I2C and SPI variants, in which case, a run time selection will be the SPI variant as explained next.

#### Default device determination (compile time)

When a single barometer device is configured in the target definition, then the device will be the default device.

When multiple barometer devices are configured in the target definition, then the following rule are applied sequentially to determine the default device.

1. In an order of pre-defined precedence: BMP280, MS5611 then BMP085; the order was decided based on popularity.
2. When both I2C and SPI variants are configured, then SPI is selected; it is assumed that the SPI variant is more likely to be onboard.
3. Note that when `baro_bustype = I2C` and `baro_i2c_address = 0` and `baro_hardware = AUTO`, then I2C devices on specified I2C bus will be scanned in the order of precedence described in 1 (this is a run time behavior).

#### Overriding default configuration

If above rule does not bring intended default configuration, macro names `DEFAULT_BARO_bbb_xxx` can be used to override the rule. See beginning of the `sensors/barometer.c` for specific macro names.

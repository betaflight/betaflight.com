# Unified Targets for 4.2

## instructions

### 1. Determine the target to use.

![Image that shows where to find the target name](/img/identify_target.png)

The CLI is another method to get the target name.

```
# version
# Betaflight / STM32F411 (S411) 4.2.0 Jun 14 2020 / 03:04:43 (8f2d21460) MSP API: 1.43
# config: manufacturer_id: MTKS, board_name: MATEKF411, version: be0c9205, date: 2020-01-15T19:44:32Z
# board: manufacturer_id: MTKS, board_name: MATEKF411
```

The MCU target is `STM32F411` and unified target config is `MATEKF411` as the board_name describes the board type config.
The manufacturer is required to maintain a unified target configuration file.

### 2. Choose your target

```
MATEKF411 <-- Unified target
```

- After you hit load firmware on the Firmware Flasher tab you will get the following release info:

```
Target: MATEKF411
Manufacturer ID: MTKS
Version: 4.2.0
Binary: betaflight_4.2.0_STM32F411.hex
Date: 14-06-2020 08:40
Unified Target: MTKS-MATEKF411.config
Date: 2020-01-15T19:44:32Z
```

**FAQ**:
What is Manufacturer ID: `MTKS`
What do these four letters mean? They refer to the manufacturer of the board. The list is available in [Manufacturers.md](https://github.com/betaflight/unified-targets/blob/master/Manufacturers)

Tip: remember to save a backup of your config, like as a `diff`, _before_ you flash a new version of betaflight.
**Please note** it is only save to import certain settings back. If unsure please start with a fresh configuration.

### 3. `Load Firmware [Online]` then `Flash Firmware`

### 4. Connect to configurator, click on `Apply Custom Defaults` when prompted:

![Picture of a notice that asks the user to apply custom defaults](/img/apply_custom_defaults_prompt.png)

If you are having an issue with the unified target, try the legacy target for now, and file an issue on the [Issue Tracker](https://github.com/betaflight/betaflight/issues) if the unified target is missing anything that it should have.

Todo: which target for example?, also needs some images.

# Tips for working with Unified targets

## Working on firmware

Save a copy of the unified target to your computer from [the repository](https://github.com/betaflight/unified-targets/tree/master/configs/default), lets use `MTKS-MATEKF411.config` as an example.

Open up the file in a text editor and take a look at the first line.

> \# Betaflight / **STM32F411** (S411) 4.1.0 Jun 25 2019 / 10:27:57 (2a6e94d03) MSP API: 1.42

In this case, `STM32F411` is the processor target used, so when you compile a target you'll want to use `make TARGET=STM32F411`

### Combine and flash with the configurator

In the configurator load the `.config` file first, and then load the `betaflight_4.x.x_STM32F411.hex`, now flash the firmware. On the first connect you will be prompted to `Apply Custom Defaults` just like the regular flashing procedure

### make_config_hex.sh

`make_config_hex.sh` is a script in `src/utils` that can be used to combine a unified target configuration with a firmware image. The combined .hex may be useful to share with other users of the same flight controller. Users of the combined .hex will be prompted to `Apply Custom Defaults`, just like the regular flashing procedure.

The `srec_cat` program is part of [srecord](http://srecord.sourceforge.net/), which is available in ubuntu under universe. `apt install srecord`

Windows binaries to not seem available, but they do have [instructions](http://srecord.sourceforge.net/windows.html)

Take a look at [src/utils/make_config_hex.sh](https://github.com/betaflight/betaflight/blob/master/src/utils/make_config_hex.sh) for more information.

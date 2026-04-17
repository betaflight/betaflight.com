# Configuration

Betaflight is configured primarily using the [Betaflight App](https://app.betaflight.com).

Both the command line interface and the Betaflight App are accessible by connecting to a serial port on the target, be it a USB virtual serial port, physical hardware UART port or a SoftSerial port.

See the Serial section for more information and see the Board specific sections for details of the serial ports available on the board you are using.

The Betaflight App cannot currently configure all aspects of the system, the CLI must be used to enable or configure some features and settings.

**Due to ongoing development it is highly advisable to backup your settings (using the CLI) so that when a new version of the app or firmware is released you can re-apply your settings.**

## Betaflight App

![Betaflight App](/img/betaflight_configurator_welcome.png)

The [Betaflight App](https://app.betaflight.com) is the preferred way of configuration. The app also includes a terminal which can be used to interact with the CLI.

If you cannot use the latest version of the app to access the FC due to firmware compatibility issues you can still access the FC via the CLI to backup your settings, or you can install an old version of the app.

Old versions of the app (formerly the configurator) can be downloaded from the [releases page](https://github.com/betaflight/betaflight-configurator/releases).

See the README file that comes with the release for installation instructions.

## CLI

Betaflight can also be configured by a command line interface.

See the [CLI section](Cli) of the documentation for more details.

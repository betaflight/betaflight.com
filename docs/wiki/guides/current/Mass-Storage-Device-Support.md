# Mass Storage Device Support

Mass storage device support allows the micro SD card or the flash chip of your flight controller to be mounted as an external storage device on your PC. This allows for easy drag / drop download of log files.
For onboard flash chips, downloading this way is a lot faster than the 'legacy' way of downloading logs through the configurator.

Mass storage device support is currently only available on F4 / G4 / F7 / H7 boards.

To enable mass storage device support, the flight controller has to be rebooted into mass storage device mode by typing `msc` into the CLI and hitting enter. After this, normal operation of the flight controller will be stopped until it is rebooted by power cycling it.

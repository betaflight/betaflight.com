# Installation

## Using the Betaflight App

This is a generic procedure to flash a board using the app.

Make sure you have the [Betaflight App](https://app.betaflight.com) either installed or opened in a browser, then:

- Connect the flight controller to the PC.
- Open the betaflight App.
- Click on "Disconnect" if the app connected to the board automatically.
- Click on the "Firmware Flasher" tab.
- Make sure you have internet connectivity.
- Click on the "Choose a Firmware / Board" dropdown menu, and select the latest stable version for your flight controller.
- Select the build options relevant to you (e.g. make sure you choose an OSD protocol - you will be asked!).
- Click on the "Load Firmware [Online]" button (the firmware will build)
- IMPORTANT: Read and understand the release notes that are displayed. When upgrading review all release notes since your current firmware.
- If this is the first time Betaflight is flashed to the board, tick the "Full Chip Erase" checkbox.
- Connect the flight controller board to the PC. Ensure the correct serial port is selected.
- Click on the "Flash Firmware" button and hold still (do not breathe, too).
- When the progress bar becomes green and reads "Programming: SUCCESSFUL" you are done!

## Manually

See the board specific flashing instructions.

# Upgrading

When upgrading be sure to backup / dump your existing settings. Some firmware releases are not backwards compatible and default settings are restored when the FC detects an out of date configuration.

## Backup/Restore process

See the CLI section of the docs for details on how to backup and restore your configuration via the CLI.

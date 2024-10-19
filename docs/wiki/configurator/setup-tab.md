---
sidebar_position: 1
---

# Setup Tab

A place for basic settings and flight controller information. The setup tab is the first tab you see
when you connect to your flight controller. You can calibrate the various sensors and check the gyroscope
live preview, view the arming prevention flags and other FC information

![Setup tab](/img/betaflight_configurator_setup_tab.png)

## Basic Setup

### Calibrate Accelerometer

The accelerometer is used to determine the orientation of the flight controller. It is used to determine
the pitch, roll and yaw angles. You can calibrate it here, following the instructions

:::info

The accelerometer is used for self stabilization features, like angle, horizon, acro trainer, and even GPS rescue. If you do
not intend to use these features, you can skip this step, or even disable the accelerometer entirely

:::

### Calibrate Magnetometer

The magnetometer (compass) is used to determine the heading of the flight controller in 3d space. This is
useful for more accurate information for GPS rescue. Calibrate it following the instructions

The magnetometer calibration process is time limited, you only have 30 seconds to do the movements

### Reset Settings

:::danger

This will reset **ALL** settings to default, leading to an empty config. This is not a "Factory Reset" for your drone or flight
controller, nor will it reset your just-changed settings. It's to be used as a hard reset, and can lead to
unpredictable results, or you may even need to re-flash in order to even be able to connect again

:::

### Activate Bootloader/DFU

A manual way to put the flight controller into DFU (Device Firmware Update) mode without having to hold
down the physical boot button. This is useful if you're having issues when flashing. Board will remain in DFU mode until cycled
or a flash is completed

## FC Information

### Live Gyro Preview

A live preview of the gyroscope data. This is useful to check if the gyroscope is aligned correctly, and if
it isn't getting/giving noisy data

:::info

You can set the gyroscope alignment in the `Configuration` tab

:::

### Info

Shows some basic data from the flight controller. This includes:

- **Arming Disable Flags** - Shows all of the "errors" that prevent the flight controller from arming.
  This is useful to check if you're having issues arming
- **Battery Voltage** - Shows the current battery voltage if the settings for it are set correctly
- **Current Drawn** - Shows the current drawn from the battery if the settings for it are set correctly
- **Current Draw** - Shows the current that the drone is drawing from the battery if the settings for it are set correctly
- **RSSI** - Shows the current RSSI value (used as a rough estimate of the signal strength) if the settings for it are set correctly

### GPS

Shows the GPS data if the flight controller has a GPS module connected and set up. This includes:

- **3D Fix** - Shows if the GPS has a 3D fix or not, a fix is needed for proper GPS functionality
- **Sats** - Shows the current amount of satellites the GPS has a lock on. The more the better, usually 6 or more is needed for a good fix
- **Latitude/Longitude** - Shows the current lat/long coordinates of the drone

### Instruments

A graphic replica of real aircraft instruments

### Experimental Backup and Restore

Allows you to back up the configuration that can be changed in the configurator itself, you cannot back up
CLI-only settings

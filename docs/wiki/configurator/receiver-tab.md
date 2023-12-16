---
sidebar_position: 8
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Receiver Tab

A receiver is a device that (as its name suggests) receives data from a transmitter, usually your
radio controller. The receiver tab is used to configure the FC such that it can read the receiver data.
The receiver tab is divided into two sections: the receiver output preview and the receiver configuration.

![Receiver Tab](/img/betaflight_configurator_receiver_tab.png)

## Output Preview

The receiver output preview shows the current state of the receiver channels, both in channel value and graph forms, and how those affect the drone movement.

## Receiver Configuration

Used to configure all of the settings that are specific to your receiver

### Receiver

Select the communication protocol used by your receiver. The options are:

- **PPM/CPPM** - Legacy protocol, unlikely to be used in modern setups
- **Serial-based** - Most modern receivers communicate over serial, using different protocols like CRSF or SBUS
- **PWM** - Legacy protocol, unlikely to be used in modern setups
- **MSP** - An advanced option, using the MSP protocol to communicate with the receiver
- **SPI** - Used for most integrated receivers, like ExpressLRS on tinywhoop AIO boards

:::caution

Selecting the incorrect protocol will lead to no signal being detected, or the signal being interpreted incorrectly. You have to pick the correct one for your receiver

:::

### Telemetry

Toggle the telemetry output on or off. Also required for VTX control from ELRS receivers

### RSSI

Mostly a legacy option, used to configure a separate analogue 0-3.3V RSSI input. Most modern receivers communicate
RSSI (along with other telemetry data) over the same serial connection as the control data.

Do not enable this option with a modern receiver

### Channel Map

Different receivers output the four main control channels:

- **Aileron** - Roll (left/right)
- **Elevator** - Pitch (forward/backward)
- **Throttle** - Throttle (up/down)
- **Rudder** - Yaw (left/right)

:::caution

If your radio input does not match up to what you see in the preview, you need to change the channel map.
There are also preset options for some of the more common systems:

- **FrSky/Futaba/Hitec** - FrSky, Futaba, and Hitec receivers output the channels in the same order as the
  Betaflight default (AETR1234)
- **Spektrum/Graupned/JR** - Spektrum receivers output the channels in a different order than the Betaflight default
  (TAER1234)

:::

### RSSI Channel

Some older receivers only had RSSI output on a single channel. If you have an older receiver, you can set
which channel is used to read the RSSI value. This is usually AUX 4 or 12.
Leave this setting disabled if you have a modern receiver such one using the CRSF or GHST protocols

One use case for this setting on modern equipment is to view LQ on DJI FPV goggles, which do not include a native LQ
field. In this case you can set this channel to the channel used for LQ - AUX11 on ELRS. A better solution is to
enable the `osd_craftname_msgs` CLI option or install WTFOS on your DJI FPV system for a full customisable OSD

### "Stick" Settings

Minimum/Center/Maximum values for the four main control channels. These are used to set the range of the
stick values, usually for safety and calibration purposes

### Deadband Settings

Deadband is the range of stick movement that is ignored. Some radios/receivers may have a small amount of
jitter, and this setting can be used to ignore that. You also have options to set it specifically for Yaw
and 3d mode throttle

### RC Smoothing

Toggle the RC smoothing filter on or off

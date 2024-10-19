# IRC Tramp

## Prerequisite

You own a IRC Tramp HV which has at least firmware version 1.26. Units distributed during summer 2016 at several FPV events do not have support yet for the serial interface. Units produced and shipped directly from china after the official launch should have version 1.26. For the serial interface to work on firmware 1.26, the TNR tag should be disconnected, otherwise, the tag is actively preventing the serial interface to work. This limitation will be discarded in the next batch starting mid february and including firmware version 1.27.

So basically, here is the checklist:

- firmware >= 1.26
- disconnect TNR tag on firmware == 1.26

**_Please note:_** the firmware version included is not necessarily the one on the label. Mine reads "Batch 01" and "1.22". However, after reading the firmware version (through the serial interface), it turns out to be "1.26".

## Setup

- Wiring
  Just wire the Tramp T (telemetry) wire to a free hardware UART (TX) port.

- Configuration
  The up to date configurator supports easy configuration of the SmartAudio on the selected port.

1. Goto Ports tab
2. Select IRC Tramp from Peripherals drop down menu
3. Speed can be left at AUTO.

![Select IRC Tramp from peripherals](https://cloud.githubusercontent.com/assets/14850998/22005847/ddc6641a-dca9-11e6-8de3-64dc39ecb5cf.png)

## IRC Tramp CMS guide

The top menu for IRC Tramp VTX looks like this.
![IRC Tramp CMS menu](https://cloud.githubusercontent.com/assets/14850998/21991074/8bd7c464-dc54-11e6-822c-53defecdc915.jpg)
While most of the entries are intuitive, there are several things that need additional explanation.

### Status Line

The status line on the top menu page of Tramp VTX menu indicates current status of the vtx in the following format:

```
* bc ffff tppp
```

where

`b` : Current transmitting band, `A` (BOSCAM A), `B` (BOSCAM B), `E` (BOSCAM E), `F` (FatShark/NexWave) or 'R' (Raceband).

`c` : Current transmitting channel, `1` through `8`.

`ffff`: Current transmitting frequency.

`t`: Current thermal protection status. If thermal protection is in effect, this field is '`*`', otherwise space ('` `').

`ppp`: Current transmitting RF power, numeric value in mW (milli-Watt).

Note that the status line indicates "running" status of the VTX device, and values may be different from band, channel and power setting entries below the status line.

### Thermal Protection

When the thermal protection is in effect, the device will automatically regulate the RF power. Therefore, value set by `POWER` entry will not be displayed on the status line.

## Modify VTX Settings (TBS Unify / TrampHV) using FrSky TARANIS Betaflight LUA script

https://github.com/betaflight/betaflight-tx-lua-scripts/releases

## Modify VTX Settings (TBS Unify / Tramp HV / RTC6705 ) using Spektrum VTX Setup Menu

Any VTX that is configurable from CMS and CLI can also be controlled using a Spektrum TX with VTX Setup menus, introduced in betaflight 3.3.0.

![Spektrum VTX Setup menu](/img/Spektrum_VTX_Control_menu.jpg)

If you are using telemetry and a SPM4649T receiver, you can also see the current VTX status on the same VTX Setup screen. This can be very useful if VTX settings are changed in some other way than from the Transmitter VTX Setup menu.

![Spektrum VTX Status and Setup menu](/img/Spektrum_VTX_Control_status_menu_1.21exp.jpg)

## Modify VTX Configuration (TBS Unify / TrampHV) using CLI Settings

As of Betaflight version 3.3.0, CLI settings to modify the VTX configuration are supported. See the [VTX CLI Settings](VTX-CLI-Settings) page for more information.

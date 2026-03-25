# VTX

Betaflight supports control of VTX modules.

## VTX Systems

Current support includes:

1. RTC6705 directly connected to the CPU (maybe via a PCB board interconnect, e.g. SPRACINGF3NEO)
2. IRC Tramp
3. TBS SmartAudio

## VTX Button

If your FC has a button, excluding a BOOT button, then it can be used for VTX control.

Some boards like the SPRacingF3NEO have both a VTX module and a button.
Other boards like the SPRacingF3MINI have multiple buttons.

### VTX Button Usage

While the VTX button is held the STATUS 2 LED will flash N times per second indicating the action that will be taken when
the button is released. The flashing starts as soon as the button is held. e.g. You press the button, count flashes and
then release as appropriate.

| Duration   | Function                 | Flashes |
| ---------- | ------------------------ | ------- |
| 25ms to 1s | Cycle Channel            | 4       |
| 1s to 3s   | Cycle Band               | 3       |
| 3s to 5s   | Cycle Power and RF Power | 2       |
| 5s or more | Save FC settings         | 1       |

Example to cycle VTX power:

```
| 0 seconds      | 1 second      | 2 seconds    | 3 seconds     | 4 seconds     | 5 seconds     | 6 seconds or more |
|-HOLD BUTTON-----------------------------------|-RELEASE BUTTON-NOW------------|-RELEASED TOO LATE TO CHANGE POWER-|
| 4 Flashes      | 3 flashes     | 3 flashes    | 2 flashes     | 2 flashes     | 1 flash       | 1 flash           |
```

The VTX button works with ALL VTX systems including onboard RTC6705, Tramp and SmartAudio.

If the VTX can be turned off then POWER 0 will turn off the VTX and POWER 1 will set the VTX into its lowest power output.
If the VTX cannot be turned off then POWER 0 will set the VTX into its lowest power output.

## VTX Tables

### Download VTX Tables for Configurator

Pre-built VTX table files are available for download and direct use in the Betaflight Configurator:

- Right-click on the file link and choose **Save link as**.
- In Configurator, go to the **Video Transmitter** tab and use **Load from file** to load the saved file.
- Click **Save** to write the VTX table to the flight controller.

For a quick video on how to determine your SmartAudio version: https://youtu.be/eaSmoOPk9KY?t=65

SmartAudio `Debug[0]` key:

| Value | Meaning         |
| ----- | --------------- |
| 100   | SA 1.0          |
| 116   | SA 1.0 unlocked |
| 200   | SA 2.0          |
| 216   | SA 2.0 unlocked |
| 300   | SA 2.1          |
| 316   | SA 2.1 unlocked |

:::note
The SmartAudio tables for the EU were updated on 30 Oct 2019 to fix incorrect frequencies for the F and R bands. Re-install the tables if you are using an older version.
:::

| Manufacturers / Models to Use this File with                                                                         | File                                                                                                                                      |
| -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **IRC Tramp Protocol:**                                                                                              |                                                                                                                                           |
| IRC Tramp                                                                                                            | [IRC Tramp (USA)](/resources/vtx_tables/vtx_table_irc_tramp_us.json)                                                                      |
|                                                                                                                      | [IRC Tramp (EU)](/resources/vtx_tables/vtx_table_irc_tramp_eu.json)                                                                       |
| [MATEKSYS VTX-MINI](http://www.mateksys.com/?portfolio=vtx-mini#tab-id-6)                                            | [VTX-MINI (INT)](http://www.mateksys.com//Downloads/VTX/MATEK_VTX-mini.json)                                                              |
| [iFlight The Force Long Range](https://www.iflight-rc.com/index.php?route=product/product&path=24_75&product_id=732) | [Force LR (USA)](https://raw.githubusercontent.com/Maizzer/Betaflight-VTX-Tables/master/BTFL_vtxtable_iFlight_Force_Long_Range_-_US.json) |
| [RunCam TX200U](https://shop.runcam.com/runcam-tx200u/)                                                              | [IRC Tramp (USA)](https://runcamfcfiles.s3-us-west-2.amazonaws.com/vtxtable/betaflight/TX200U/runcam_tx200u_vtx_table_irc_tramp_us.json)  |
|                                                                                                                      | [IRC Tramp (EU)](https://runcamfcfiles.s3-us-west-2.amazonaws.com/vtxtable/betaflight/TX200U/runcam_tx200u_vtx_table_irc_tramp_eu.json)   |
| [RunCam TX100](https://shop.runcam.com/runcam-tx100-nano/)                                                           | [IRC Tramp (USA)](https://runcamfcfiles.s3-us-west-2.amazonaws.com/vtxtable/betaflight/TX100/runcam_tx100_vtx_table_irc_tramp_us.json)    |
|                                                                                                                      | [IRC Tramp (EU)](https://runcamfcfiles.s3-us-west-2.amazonaws.com/vtxtable/betaflight/TX100/runcam_tx100_vtx_table_irc_tramp_eu.json)     |
| [Speedy Bee TX800](https://www.speedybee.com/speedybee-tx800/)                                                       | [IRC Tramp (USA)](<https://speedybee.s3.amazonaws.com/vtxtable/betaflight/TX800/SpeedyBee-TX800(USA).json>)                               |
|                                                                                                                      | [IRC Tramp (EU)](<https://speedybee.s3.amazonaws.com/vtxtable/betaflight/TX800/SpeedyBee-TX800(EU).json>)                                 |
| [Speedy Bee TX500](https://www.speedybee.com/tx500/)                                                                 | [IRC Tramp (USA)](https://speedybee.s3.amazonaws.com/vtxtable/betaflight/TX500/speedybee_tx500_vtx_table_irc_tramp_us.json)               |
|                                                                                                                      | [IRC Tramp (EU)](https://speedybee.s3.amazonaws.com/vtxtable/betaflight/TX500/speedybee_tx500_vtx_table_irc_tramp_eu.json)                |
| **TBS SmartAudio Protocol:**                                                                                         |                                                                                                                                           |
| TBS (SA 1.0 was only used on first-generation TBS devices)                                                           | [SmartAudio 1.0 (USA)](/resources/vtx_tables/vtx_table_smart_audio_1_0_us.json)                                                           |
|                                                                                                                      | [SmartAudio 1.0 (EU)](/resources/vtx_tables/vtx_table_smart_audio_1_0_eu.json)                                                            |
| TBS (used on most VTX that support SmartAudio)                                                                       | [SmartAudio 2.0 (USA)](/resources/vtx_tables/vtx_table_smart_audio_2_0_us.json)                                                           |
|                                                                                                                      | [SmartAudio 2.0 (EU)](/resources/vtx_tables/vtx_table_smart_audio_2_0_eu.json)                                                            |
| TBS (currently only applicable to latest TBS models like EVO or Pro32)                                               | [SmartAudio 2.1 (USA)](/resources/vtx_tables/vtx_table_smart_audio_2_1_us.json)                                                           |
|                                                                                                                      | [SmartAudio 2.1 (EU)](/resources/vtx_tables/vtx_table_smart_audio_2_1_eu.json)                                                            |
| **On-Board VTX:**                                                                                                    |                                                                                                                                           |
| Flight controllers with on-board VTX                                                                                 | [RTC6705 (USA)](/resources/vtx_tables/vtx_table_rtc6705_us.json)                                                                          |
|                                                                                                                      | [RTC6705 (EU)](/resources/vtx_tables/vtx_table_rtc6705_eu.json)                                                                           |

### Setting Up VTX Tables via CLI

As of Betaflight 4.1.0, band/channel and power level information needed to control video transmitters is no longer hardcoded,
but stored in a new facility called `vtxTable`.

The contents of the `vtxTable` need to be set up manually. They need to match the hardware, local laws and regulations, as
well as user preferences.

The contents of the table can be examined by typing the command `vtxtable` into the CLI.
Example:

```
# vtxtable
vtxtable bands 5
vtxtable channels 8
vtxtable band 1 BOSCAM_A A FACTORY    0 5845 5825 5805 5785 5765 5745    0
vtxtable band 2 BOSCAM_B B FACTORY    0 5752 5771 5790 5809 5828 5847    0
vtxtable band 3 BOSCAM_E E FACTORY    0    0    0    0    0    0    0    0
vtxtable band 4 MYBAND   M CUSTOM  5745 5769    0 5806    0 5843    0    0
vtxtable band 5 RACEBAND R FACTORY    0    0    0 5769 5806 5843    0    0
vtxtable powerlevels 3
vtxtable powervalues  14 20 26
vtxtable powerlabels 25 100 400
```

#### Bands and Channels

The example above contains 5 bands, **each with a name, a single-letter abbreviation, a factory flag and eight frequencies.**

The factory flag controls how Betaflight communicates with the VTX.

**When the flag is set to `FACTORY`, Betaflight sends the VTX a band and channel number.**
The VTX will then use its built-in frequency table.
In this mode, the actual contents of the vtxtable are **not** sent to the VTX. They are only used for display in the OSD and similar places.
As such, bands with the flag set to `FACTORY` should be set to match the built-in frequency table of the VTX.

**When the flag is set to `CUSTOM`, Betaflight sends the VTX the frequency it should use.**
This mode utilizes the contents of the table and allows the user to create custom bands with whatever frequencies they like.
**Video transmitters without a built-in table, such as IRC Tramp or rtc6705, only support `CUSTOM`.**

Entries of the vtxtable can be blocked by setting their frequency to 0. This is especially useful for bands set to `FACTORY`: the slots of
unwanted entries of the video transmitter's built-in table can be set to 0, effectively disabling them.
In the example above this was used to only allow frequencies between 5725 and 5875 MHz, as a German pilot would want to comply with
German laws. Additionally, the Fatshark band was replaced with a new custom one.

As a starting point, the following table contains the commonly used frequencies:

```
# This table should not be used as-is, but trimmed down according to local laws and regulations.
vtxtable band 1 BOSCAM_A A FACTORY 5865 5845 5825 5805 5785 5765 5745 5725
vtxtable band 2 BOSCAM_B B FACTORY 5733 5752 5771 5790 5809 5828 5847 5866
vtxtable band 3 BOSCAM_E E FACTORY 5705 5685 5665 5645 5885 5905 5925 5945
vtxtable band 4 FATSHARK F FACTORY 5740 5760 5780 5800 5820 5840 5860 5880
vtxtable band 5 RACEBAND R FACTORY 5658 5695 5732 5769 5806 5843 5880 5917
```

#### Power Levels

In addition to the frequency, video transmitters also need to know how much power they should use for transmission.
The example shown previously contains three power levels, **each with a value and a label.** The label is shown to the user in the OSD,
while the value is sent to the VTX.

Power levels should be set up to match the hardware in use.

##### IRC Tramp devices should use:

```
vtxtable powerlevels 5
vtxtable powervalues 25 100 200 400 600
vtxtable powerlabels 25 100 200 400 600
```

##### rtc6705 should use:

```
vtxtable powerlevels 2
vtxtable powervalues 1 2
vtxtable powerlabels MIN MAX
```

Please note that turning off rtc6705 devices is not possible using powervalues. Use pitmode instead.

##### SmartAudio V1.0 devices should use:

```
vtxtable powerlevels 4
vtxtable powervalues 7 16 25 40
vtxtable powerlabels 25 200 500 800
```

##### SmartAudio V2.0 devices should use:

```
vtxtable powerlevels 4
vtxtable powervalues 0 1 2 3
vtxtable powerlabels 25 200 500 800
```

##### SmartAudio V2.1 devices vary depending on their model. Check the manufacturer's website.

For these devices the `powervalues` are the output power in dBm.

To query the available power levels from a SmartAudio 2.1 VTX enter the `vtx_info` command with no parameters. This will report the available power settings:

```
# vtx_info
level 14 dBm, power 25 mW
level 20 dBm, power 100 mW
level 26 dBm, power 400 mW
```

For example:

[TBS Unify Pro32 Nano 5G8](https://www.team-blacksheep.com/products/prod:unifypro32_nano):

```
vtxtable powerlevels 3
vtxtable powervalues 14 20 26
vtxtable powerlabels 25 100 400
```

[TBS Unify Pro 5G8 HV - Race 2 (MMCX)](https://www.team-blacksheep.com/products/prod:unify_pro_hv_race2_m):

```
vtxtable powerlevels 3
vtxtable powervalues 13 20 26
vtxtable powerlabels 25 100 400
```

[TBS Unify Pro32 HV (MMCX)](https://www.team-blacksheep.com/products/prod:unifypro32_hv):

```
vtxtable powerlevels 4
vtxtable powervalues 14 20 26 30
vtxtable powerlabels 25 100 400 1W
```

[TBS Unify EVO](https://www.team-blacksheep.com/products/prod:tbs_unify_evo):

```
vtxtable powerlevels 4
vtxtable powervalues 14 20 26 29
vtxtable powerlabels 25 100 400 800
```

Power levels may be omitted. This is useful for compliance with local laws and regulations.
Additionally, powerlabels (but not values!) can be set to anything three characters long.
For example a TBS Unify EVO will also work with this config:

```
vtxtable powerlevels 2
vtxtable powervalues 20 26
vtxtable powerlabels .1W .4W
```

#### Complete Examples

##### IRC Tramp device

```
# This example enables a lot of power levels and channels.
# Almost nobody will be able to legally use this without modification.
# Check your local laws and regulations before use!
vtxtable bands 5
vtxtable channels 8
vtxtable band 1 BOSCAM_A A CUSTOM 5865 5845 5825 5805 5785 5765 5745 5725
vtxtable band 2 BOSCAM_B B CUSTOM 5733 5752 5771 5790 5809 5828 5847 5866
vtxtable band 3 BOSCAM_E E CUSTOM 5705 5685 5665 5645 5885 5905 5925 5945
vtxtable band 4 FATSHARK F CUSTOM 5740 5760 5780 5800 5820 5840 5860 5880
vtxtable band 5 RACEBAND R CUSTOM 5658 5695 5732 5769 5806 5843 5880 5917
vtxtable powerlevels 5
vtxtable powervalues 25 100 200 400 600
vtxtable powerlabels 25 100 200 400 600
```

##### SmartAudio 1.0 device

```
# This example enables a lot of power levels and channels.
# Almost nobody will be able to legally use this without modification.
# Check your local laws and regulations before use!
vtxtable bands 5
vtxtable channels 8
vtxtable band 1 BOSCAM_A A FACTORY 5865 5845 5825 5805 5785 5765 5745 5725
vtxtable band 2 BOSCAM_B B FACTORY 5733 5752 5771 5790 5809 5828 5847 5866
vtxtable band 3 BOSCAM_E E FACTORY 5705 5685 5665 5645 5885 5905 5925 5945
vtxtable band 4 FATSHARK F FACTORY 5740 5760 5780 5800 5820 5840 5860 5880
vtxtable band 5 RACEBAND R FACTORY 5658 5695 5732 5769 5806 5843 5880 5917
vtxtable powerlevels 4
vtxtable powervalues 7 16 25 40
vtxtable powerlabels 25 200 500 800
```

##### SmartAudio 2.0 device

```
# This example enables a lot of power levels and channels.
# Almost nobody will be able to legally use this without modification.
# Check your local laws and regulations before use!
vtxtable bands 5
vtxtable channels 8
vtxtable band 1 BOSCAM_A A FACTORY 5865 5845 5825 5805 5785 5765 5745 5725
vtxtable band 2 BOSCAM_B B FACTORY 5733 5752 5771 5790 5809 5828 5847 5866
vtxtable band 3 BOSCAM_E E FACTORY 5705 5685 5665 5645 5885 5905 5925 5945
vtxtable band 4 FATSHARK F FACTORY 5740 5760 5780 5800 5820 5840 5860 5880
vtxtable band 5 RACEBAND R FACTORY 5658 5695 5732 5769 5806 5843 5880 5917
vtxtable powerlevels 4
vtxtable powervalues 0 1 2 3
vtxtable powerlabels 25 200 500 800
```

##### SmartAudio 2.1 device

```
# This example enables a lot of power levels and channels.
# Almost nobody will be able to legally use this without modification.
# Check your local laws and regulations before use!
vtxtable bands 5
vtxtable channels 8
vtxtable band 1 BOSCAM_A A FACTORY 5865 5845 5825 5805 5785 5765 5745 5725
vtxtable band 2 BOSCAM_B B FACTORY 5733 5752 5771 5790 5809 5828 5847 5866
vtxtable band 3 BOSCAM_E E FACTORY 5705 5685 5665 5645 5885 5905 5925 5945
vtxtable band 4 FATSHARK F FACTORY 5740 5760 5780 5800 5820 5840 5860 5880
vtxtable band 5 RACEBAND R FACTORY 5658 5695 5732 5769 5806 5843 5880 5917
vtxtable powerlevels 4
vtxtable powervalues 14 20 26 30
vtxtable powerlabels 25 100 400 1W
```

##### rtc6705

```
# This example enables a lot of power levels and channels.
# Almost nobody will be able to legally use this without modification.
# Check your local laws and regulations before use!
vtxtable bands 5
vtxtable channels 8
vtxtable band 1 BOSCAM_A A CUSTOM 5865 5845 5825 5805 5785 5765 5745 5725
vtxtable band 2 BOSCAM_B B CUSTOM 5733 5752 5771 5790 5809 5828 5847 5866
vtxtable band 3 BOSCAM_E E CUSTOM 5705 5685 5665 5645 5885 5905 5925 5945
vtxtable band 4 FATSHARK F CUSTOM 5740 5760 5780 5800 5820 5840 5860 5880
vtxtable band 5 RACEBAND R CUSTOM 5658 5695 5732 5769 5806 5843 5880 5917
vtxtable powerlevels 2
vtxtable powervalues 1 2
vtxtable powerlabels MIN MAX
```

#### Pitmode

Pitmode is separate from vtxTable. No power level should be created for pitmode.
Pitmode can be controlled in a variety of ways including OSD, AUX switches and lua scripts.

Some video transmitters have restrictions on its usage. For example, SmartAudio V1.0 and V2.0 devices can only enter pitmode on power-up.
Betaflight can make these devices leave pitmode, but not enter it.

rtc6705 devices do not support a proper ultra-low power pitmode. Instead, if the board supports it, pitmode turns off rtc6705 devices completely.

## VTX CLI Settings

As of Betaflight 3.3.0, the CLI settings below can be used to configure addressable video transmitters (such as
[TBS SmartAudio](/docs/wiki/guides/current/SmartAudio) and [IRC Tramp](/docs/wiki/guides/current/IRC-Tramp))
connected to the flight controller.

At startup the settings are applied to the transmitter. If the video configuration is modified via the
[CMS OSD menu](/docs/wiki/guides/current/SmartAudio) or via MSP (Taranis/OpenTX smartport
[lua scripts](https://github.com/betaflight/betaflight-tx-lua-scripts)), the settings are updated.

One useful application of these settings is configuring a frequency via USB/CLI while the video transmitter is not powered up.
After a save and power cycle, the system will start up at the new frequency.

There is a `vtx_freq` setting that operates as follows: if `vtx_band=0` and `vtx_freq!=0` then the `vtx_freq` value (in MHz) will be
configured on the transmitter at startup. If both are zero, the settings will be ignored. If `vtx_band!=0` and a video transmitter is
connected, `vtx_freq` will be set to the current frequency value (in MHz) at startup.

:::note
Settings like `vtx_band`, `vtx_channel`, and `vtx_power` are relevant for Betaflight versions prior to 4.1, which had these default values built in. In Betaflight 4.1 and newer, you must configure a [VTX Table](#vtx-tables) to control your VTX, defining your own bands, channels, and power settings based on local regulations.
:::

**`vtx_band = #`**
Allowed range: 0 - 5
0=user, 1=A, 2=B, 3=E, 4=F(Airwaves/Fatshark), 5=Raceband

**`vtx_channel = #`**
Allowed range: 1 - 8

**`vtx_power = #`**
Allowed range: 0 - 5
for SmartAudio: 0=25mW, 1=25mW, 2=200mW, 3=500mW, 4=800mW
for TBS Unify Nano: 0=25mW, 1=25mW, 2=50mW
for IRC-Tramp: 0=25mW, 1=25mW, 2=100mW, 3=200mW, 4=400mW, 5=600mW

**`vtx_low_power_disarm = ON|OFF`**
If ON and the flight controller is disarmed, the video transmitter output power will be set to its lowest value (`vtx_power=1`).
Otherwise, the video transmitter output power will be set to the configured `vtx_power` value.
Note: if a receiver failsafe has occurred, the output power will not be lowered.

**`vtx_freq = ####`**
Allowed range: 0 - 5999
if `vtx_band!=0` and VTX connected, shows current frequency in MHz
if `vtx_band==0`, sets frequency in MHz
if `vtx_band==0` and `vtx_freq==0`, the settings will not be sent to the VTX

For example, to configure the VTX to use band F and channel 6 (5840 MHz), enter the CLI and input:

```
set vtx_band = 4
set vtx_channel = 6
save
```

The VTX configuration will not be changed until after the `save` and restart. If successful, entering `get vtx_freq` will show the current frequency in MHz.

**Frequency table:**

| Band                               | Ch 1 | Ch 2 | Ch 3 | Ch 4 | Ch 5 | Ch 6 | Ch 7 | Ch 8 |
| ---------------------------------- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| Band 1 (A: Boscam A / TBS / RC305) | 5865 | 5845 | 5825 | 5805 | 5785 | 5765 | 5745 | 5725 |
| Band 2 (B: Boscam B)               | 5733 | 5752 | 5771 | 5790 | 5809 | 5828 | 5847 | 5866 |
| Band 3 (E: Boscam E / DJI)         | 5705 | 5685 | 5665 | 5645 | 5885 | 5905 | 5925 | 5945 |
| Band 4 (F: IRC NexWave / Fatshark) | 5740 | 5760 | 5780 | 5800 | 5820 | 5840 | 5860 | 5880 |
| Band 5 (R: Raceband)               | 5658 | 5695 | 5732 | 5769 | 5806 | 5843 | 5880 | 5917 |

### Changing VTX Power with an AUX Channel

The `vtx` CLI command maps AUX channels to VTX band, channel, and power settings:

```
vtx <index> <aux_channel> <vtx_band> <vtx_channel> <vtx_power> <start_range> <end_range>
```

The `aux_channel` value is zero-based (0 = Aux1, 1 = Aux2, etc.).

For example, the following configures a 3-position switch on Aux3 to switch between power levels 1, 2, and 3:

```
vtx 0 2 0 0 1 900 1200
vtx 1 2 0 0 2 1300 1700
vtx 2 2 0 0 3 1800 2100
```

When `vtx_band`, `vtx_channel`, or `vtx_power` are set to 0, the current setting is left unchanged — in the example above only power changes, not band or channel.

If Low Power Disarm is enabled, it will override changes made by the `vtx` command.

Enable the **VTX Channel** OSD element on the OSD tab to display the current VTX channel and power level.

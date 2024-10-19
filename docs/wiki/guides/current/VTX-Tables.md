# VTX Tables

## VTX Tables for Use in Configurator

Instructions for use:

- right click on the file, 'Save link as';
- in configurator, go to the 'Video Transmitter' tab, use 'Load from file' to load the file saved in the previous step;
- **click 'Save'** to save the VTX table on the flight controller.

For a quick video on how to determine your SmartAudio version: https://youtu.be/eaSmoOPk9KY?t=65

SmartAudio Debug[0] key:

100 = SA 1.0

116 = SA 1.0 unlocked

200 = SA 2.0

216 = SA 2.0 unlocked

300 = SA 2.1

316 = SA 2.1 unlocked

**Update:** 30 Oct 2019: The SmartAudio tables for the EU had a bug that caused the F and R bands to have the wrong frequencies. They have been fixed, please re-install the updated tables.

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
| TBS (SA 1.0 was only used the first generation TBS devices)                                                          | [SmartAudio 1.0 (USA)](/resources/vtx_tables/vtx_table_smart_audio_1_0_us.json)                                                           |
|                                                                                                                      | [SmartAudio 1.0 (EU)](/resources/vtx_tables/vtx_table_smart_audio_1_0_eu.json)                                                            |
| TBS (used on most VTX that support SmartAudio)                                                                       | [SmartAudio 2.0 (USA)](/resources/vtx_tables/vtx_table_smart_audio_2_0_us.json)                                                           |
|                                                                                                                      | [SmartAudio 2.0 (EU)](/resources/vtx_tables/vtx_table_smart_audio_2_0_eu.json)                                                            |
| TBS (currently only applicable to latest TBS models like EVO or Pro32)                                               | [SmartAudio 2.1 (USA)](/resources/vtx_tables/vtx_table_smart_audio_2_1_us.json)                                                           |
|                                                                                                                      | [SmartAudio 2.1 (EU)](/resources/vtx_tables/vtx_table_smart_audio_2_1_eu.json)                                                            |
|                                                                                                                      |                                                                                                                                           |
| **On-Board VTX:**                                                                                                    |                                                                                                                                           |
| Flight controllers with on-board VTX                                                                                 | [RTC6705 (USA)](/resources/vtx_tables/vtx_table_rtc6705_us.json)                                                                          |
|                                                                                                                      | [RTC6705 (EU)](/resources/vtx_tables/vtx_table_rtc6705_eu.json)                                                                           |

## Setting up VTX Tables in CLI

See the [developer VTX page](/docs/development/VTX#vtx-table)

## VTX Button Usage

While the VTX button is held the STATUS 2 LED will flash N times per second indicating the action that will be taken when the button is released. The flashing starts as soon as the button is held. e.g. You press the button, count flashes and then release as appropriate.

| Duration | Function | Flashes |
| -------- | -------- | ------- |

Example to cycle VTX power

```
| 0 seconds     | 1 second     | 2 seconds    | 3 seconds    | 4 seconds    | 5 seconds    | 6 seconds or more|
|-HOLD BUTTON------------------------------|-RELEASE BUTTON-NOW------------|-RELEASED TO LATE TO CHANGE POWER |
| 4 Flashes     | 3 flashes    | 3 flashes   | 2 flashes    | 2 flashes    | 1 flash      | 1 flash           |
| 0 seconds     | 1 second     | 2 seconds   | 3 seconds    | 4 seconds    | 5 seconds    | 6 seconds or more |
|-HOLD BUTTON------------------------------|-RELEASE BUTTON-NOW------------|-RELEASED TOO LATE TO CHANGE POWER|
| 4 Flashes     | 3 flashes    | 3 flashes   | 2 flashes    | 2 flashes    | 1 flash      | 1 flash           |
```

The VTX button works with ALL VTX systems including onboard RTC6705, Tramp and SmartAudio.

If the VTX can be turned off then POWER 0 will turn off the VTX and POWER 1 will set the VTX into it's lowest power output.
If the VTX cannot be turned off then POWER 0 will set the VTX into it's lowest power output.

Some video transmitters have restrictions on their usage. For example, SmartAudio V1.0 and V2.0 devices can only enter pitmode on power-up.
Betaflight can make the these devices leave pitmode, but not enter it.

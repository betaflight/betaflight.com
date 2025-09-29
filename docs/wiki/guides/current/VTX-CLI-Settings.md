# VTX CLI Settings

As of Betaflight version 3.3.0, the CLI settings below can be used to
configure addressable video transmitters (such as
TBS-[SmartAudio](/docs/wiki/guides/current/SmartAudio)
and
IRC-[Tramp](IRC-Tramp))
that are connected to the flight controller.\
 \
 At startup the settings are applied to the transmitter. If the video
configuration is modified via the [CMS OSD
menu](/docs/wiki/guides/current/SmartAudio)
or via MSP (Taranis/OpenTX smartport
'[lua](https://github.com/betaflight/betaflight-tx-lua-scripts)'), the
settings are updated.\
 \
 One nice thing the settings can provide is a way to configure a
frequency (via USB / CLI) while the video transmitter is not powered
up. After a save and power cycle, the system will startup at the new
frequency.\
 \
 There is a 'vtx_freq' setting that operates as follows: If
vtx_band=0 and vtx_freq!=0 then the 'vtx_freq' value (in MHz) will be
configured on the transmitter at startup. If both are zero then the
settings will be ignored. If vtx_band!=0 and a video transmitter is
connected then 'vtx_freq' will be set to the current frequency value
(in MHz) at startup.\

:::note
Values for settings like vtx_band, vtx_channel, vtx_power are relevant for Betaflight versions prior to 4.1 which had these default values built in. In Betaflight 4.1 and newer to control your VTX you must configure a [VTX Table](VTX-Tables) in which you define your own bands, channels and power settings based on local regulations.
:::

**vtx_band = \#**\
 Allowed range: 0 - 5\
 0=user, 1=A, 2=B, 3=E, 4=F(Airwaves/Fatshark), 5=Raceband\
 \
**vtx_channel = \#**\
 Allowed range: 1 - 8\
 \
**vtx_power = \#**\
 Allowed range: 0 - 5\
 for SmartAudio: 0=25mW, 1=25mW, 2=200mW, 3=500mW, 4=800mW\
 for TBS Unify Nano: 0=25mW, 1=25mW, 2=50mW\
 for IRC-Tramp: 0=25mW, 1=25mW, 2=100mW, 3=200mW, 4=400mW, 5=600mW\
 \
**vtx_low_power_disarm = ON|OFF**\
If ON and the flight controller is disarmed, the video transmitter output power will be set to its lowest value (vtx_power=1). Otherwise, the video transmitter output power will be set to the configured 'vtx_power' value. (Note one exception: If a receiver failsafe has occurred then the output power will not be lowered.)\
 \
**vtx_freq = \#\#\#\#**\
 Allowed range: 0 - 5999\
 if vtx_band!=0 and VTX connected then shows freq in MHz\
 if vtx_band==0 then sets frequency in MHz\
 \
 if vtx_band==0 and vtx_freq==0 then the settings will not be sent out
to the VTX\
 \
 For example, to configure the VTX to use band 'F' and channel '6' (5840
MHz), enter the CLI and input:\
 \
 set vtx_band = 4\
 set vtx_channel = 6\
 save\
 \
 The VTX configuration will not be changed until after the 'save' and
restart. If it is successful then entering 'get vtx_freq' will show
the current frequency value in MHz.\
 \
 **Frequency table**:\
 Channel\
 1 2 3 4 5 6 7 8\
 Band 1: 5865 5845 5825 5805 5785 5765 5745 5725 (A: Boscam A / TBS /
RC305)\
 Band 2: 5733 5752 5771 5790 5809 5828 5847 5866 (B: Boscam B)\
 Band 3: 5705 5685 5665 5645 5885 5905 5925 5945 (E: Boscam E / DJI)\
 Band 4: 5740 5760 5780 5800 5820 5840 5860 5880 (F: IRC NexWave /
Fatshark)\
 Band 5: 5658 5695 5732 5769 5806 5843 5880 5917 (R: Raceband)\
 \
 See [here for a 5.8GHz FPV "Visual" Frequency
Chart](http://www.etheli.com/freq/FPV_5.8GHz_Freqs.jpg)

### Change vtx power level using aux channel

```
vtx - vtx channels on switch
	<index> <aux_channel> <vtx_band> <vtx_channel> <vtx_power> <start_range> <end_range>
```

For example the following will configure a 3-position switch on Aux3 to switch power levels 1/2/3.

```
vtx 0 2 0 0 1 900 1200
vtx 1 2 0 0 2 1300 1700
vtx 2 2 0 0 3 1800 2100
```

Note that the aux channel value supplied to the `vtx` command is zero-based. This means 0 = Aux1, 1 = Aux2, and so on. So in the example `2` represents Aux3.

This can also be used to switch to specific band/channels based on a switch but since the band/channel in the example above are 0 it won't change channels - only power. Whenever the `vtx_band`, `vtx_channel`, or `vtx_power` values are 0 it means to leave the current setting unchanged. See the help for the vtx command.

If Low Power Disarm is enabled, it will override changes made by the `vtx` command.

And for the OSD element:

Enable the vtx Channel element on the OSD tab to display vtx channel and power.

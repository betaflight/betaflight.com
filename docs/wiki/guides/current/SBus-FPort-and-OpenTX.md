# SBus FPort and Open Tx

OpenTX has the problem that it fails to fully utilise the hardware that FrSky sells for SBus and FPort (called 'D16' in OpenTX terminology). As a consequence, on FrSky hardware that is perfectly capable of supporting 4 RC channels and up to 12 switch channels with an update rate of 9 ms, OpenTX (up to and including version 2.2.3 at least) only supports an update rate of 18 ms for the RC channels. To make matters worse, it does this by sending RC frames to the flight controller at intervals of 9 ms, but sends identical RC data for each pair of consecutive frames.

For this reason, in order to get the performance that the FrSky hardware is capable of, it is highly recommended to use alternatives or derivatives of OpenTX that are not affected by the shortcomings of OpenTX:

- [Ersky9x](http://www.er9x.com/);
- [Fork of OpenTX supporting 16 channels at 9 ms](https://github.com/mikeller/opentx/releases).

# When using OpenTX despite its shortcomings: Set RF channels to 8 for 9ms

SBus and FPort, in FrSky X mode (called 'D16 mode' by OpenTX), send data packets every 9ms, but the maximum number of channels per packet is 8.

If you only need 8 data channels - four control channels (roll, pitch, yaw and throttle) and four aux switches, **be sure to set the number of channels in the Model Setup page to 8** as per the image below:

![How to set an SBus Rx link to 8 channels for 9ms latency](/img/D16_8_Channels.jpg)

This will ensure each channel of data is sent every 9ms and ensure proper RC smoothing performance.

## Why is setting the number of channels important?

If a FrSky X link is set to more than 8 channels, some channels will only get sent every second packet, i.e. will have a latency of 18ms. Other channels will be sent every 9ms. It's not clear which channels will be affected, and which won't. This delay is noticeable and has a negative impact on flight control. It will also cause unwanted ripples in the motor signals when sticks are moved.

## Why is this relevant to RC smoothing settings in Betaflight?

Derivative or feed-forward components in the PIDs, such as D setpoint weight or throttle boost, require smooth changes in the RC signal. Without any smoothing, the signal going to the motors will be sharp and spiky. Lots of stick movement will then then make motors unnecessarily hot and waste battery power, without achieving anything useful. By appropriately smoothing the RC setpoint changes, these spikes can be rounded off, so the motors sound smoother and don't get so hot.

To provide optimal smoothing, the flight controller needs to know the time interval between new data elements.

When automatically determining the RC smoothing configuration, Betaflight measures the time between data packets, but does not know how the user has configured the radio link itself. So it currently assumes that SBus and FPort users will have set it to 9ms data intervals, as above, by limiting the number of channels in FrSky X mode to only 8.

If users have configured more than 8 channels, they should manually configure the RC smoothing settings and not use the automatic values.

## Can I just use the automatic / default settings if I limit the channel count to 8?

Yes. Everything will work fine like that.

Betaflight 3.4 sets the optimal filter values automatically if interpolation is set to AUTO:

`set rc_interp = AUTO`

## When should I override the default settings?

In auto mode, Betaflight assumes the user has limited the FrSky X mode channel count to 8 or less, and that the incoming data interval is 9ms. On that basis it will typically set the filter frequency to 50Hz and the older interpolation window to 11ms.

Manually setting a lower filter frequency will smooth out the RC input ripple that goes to the motor. Usually this is not necessary. If the user runs a lot of D weight or throttle boost, greater than normal smoothing can make the motor traces smoother. Unfortunately this smoothing will add latency, delay, and diminish the feed forward effect, which isn't a good thing. Usually it is better to accept some degree of noise in the motor signal and keep using the defaults. If SBus data is at 9ms intervals, the automatic settings are at 50Hz. The lowest I would recommend overriding to, when attempting to reduce RC ripple, would be 30Hz.

## What if I need more than 8 channels of data?

If more than 8 SBus or FPort channels are needed in FrSky X mode, it's best to set the number of channels to 16 so that all will have the same 18ms step interval, and manually configure both smoothing filters to 25Hz, and set the interpolation time to 19ms.

If the number of channels is set to a number between 8 and 16, for example, 11, data will be received at 9ms intervals on 13 channels, and 18ms intervals on 3. Logging is needed to identify which are fast and which are slow. If all dynamic control signals are put on the fast channels, and switches are only set on the slow channels, the default values for smoothing and interpolation are fine and will optimise performance.

## Why use filter based RC smoothing over the older interpolation method?

It's faster, has less delay, keeps motor traces smoother, is much less badly affected by looptime jitter, and handles packet loss in the Rx link better.

that's it - enjoy!

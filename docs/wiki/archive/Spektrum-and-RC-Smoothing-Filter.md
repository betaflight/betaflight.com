# Spektrum and RC Smooting Filter

### A little background.

Spektrum has two basic RC protocols, but they can operate at different frame rates:

- DSMX 22ms
- DSMX 11ms (preferred)
- DSM2 22ms
- DSM2 11ms (uncommon)

Most people will be using DSMX, and most of the Spektrum transmitters support DSMX 11ms. However a few do not.

When you bind, always bind in 11ms mode if it is available.

### Transmitters that do not support 11ms:

- DX6i
- DXe
- DX6e

If you own one of these transmitters and use DSMX protocol, you may need to manually set your Rc smoothing cutoffs to:

```
set rc_smoothing_input_hz = 21
set rc_smoothing_derivative_hz = 21
```

These are the default values for 22ms (if auto detect was able to detect it).

If you don't own one of those transmitters, you can probably stop reading now. Auto detect cutoffs (set to zero in cli) will most likely work. To double check (with transmitter and receiver powered and connected) type `rc_smoothing_info` in CLI and check the detected frame rate. It seems since 3.4.0 release that 22ms is at least sometimes auto detected, have yet to confirm if it is 100%.

Basically what happens is with DSMX (Spek2048), the receiver always outputs 11ms frames to the FC. So RC Smoothing Filter correctly detects 11ms frame interval and sets the Input and Derivative filters accordingly (41hz for both). But if the transmitter is sending frames at 22ms the cutoffs of 41hz are not low enough, and will cause large spikes in RC command, Dterm, and Motor outputs. The FC can't tell what frame interval the TX-RX link is using, only what the receiver is putting out.

### DSM2 Protocol

For DSM2 (Spek1024), I don't have DSM2 hardware to verify. It could be a problem here too. The best way to know is look at a log, or post the log in Slack/Facebook/RCgroups for someone to look at.

### Charts from Spektrum showing what transmitters support DSMX 11ms and which do not:

https://www.dropbox.com/s/3nkaonks1uimvrb/Spektrum%20transmitter%20comparison%20charts.zip?dl=0

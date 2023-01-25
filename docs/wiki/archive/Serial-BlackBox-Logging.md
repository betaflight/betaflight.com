# Serial Blackbox Logging

## OpenLog is not a suitable serial blackbox logging device for Betaflight 4.0 and beyond

As a result of never ending demands for different log items for better and more diverse flight characteristics analysis, output bandwidth requirement for serial blackbox output finally exceeded 230.4Kbps which is the fastest supported by **_OpenLog_**.

For 4.0 and beyond, serial blackbox users must use logging devices with faster communication speed such as _**OpenLager**_ instead, and configure baudrate at 1.5Mbps at least for stable recording.

See https://github.com/betaflight/betaflight/issues/9043#issuecomment-544333986 for bandwidth requirement for varying logging rates.

### Additional info from the future (Betaflight 4.3):

We can now [disable blackbox headers](https://github.com/betaflight/betaflight/pull/9726) to save logging overhead. This can make OpenLog work again because it doesn't need to handle as much data. We have presets to disable blackbox headers (see the [blackbox_disable](https://github.com/betaflight/firmware-presets/blob/master/presets/4.3/other/blackbox_disable.txt) preset).

Try it and see if slower loggers will work again with less data to log!

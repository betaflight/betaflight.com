Telemetry is information sent back to your RC transmitter via the RC data link. For example, telemetry allows for your RC transmitter to read out your main battery voltage or RSSI. For telemetry to work your RC receiver and transmitter must support it. The specific data that Betaflight will send via telemetry depends on the telemetry protocol being used. For example, FRSky Smartport will send a certain set of information while Crossfire will send another set.

Here is the set of telemetry fields send via the Crossfire protocol.
https://github.com/betaflight/betaflight/blob/daa6df80248c9a806b7d77c402d415a15f4e2667/src/main/telemetry/crsf.c#L168

Here is the set of telemtry fields sent via Smartport can be seen here : https://github.com/betaflight/betaflight/blob/daa6df80248c9a806b7d77c402d415a15f4e2667/src/main/telemetry/smartport.c#L89

All telemetry protocols can be inspected here : https://github.com/betaflight/betaflight/tree/master/src/main/telemetry

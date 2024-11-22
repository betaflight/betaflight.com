# RSSI with Spektrum

In Betaflight 3.3.0 there will be a possibility to get a Received Signal Strength Indicator (RSSI) in OSD in a couple of different ways.

- True RSSI as reported by SPM4649T receivers. Preconditions:
  - Rx is connected and setup for Telemetry, as described here: [Spektrum-SPM4649T-SRXL-Telemetry-setup.](Spektrum-SPM4649T-SRXL-Telemetry-setup)
  - Rx firmware is updated to at least version 1.1.9
- Fake RSSI based on radio link fades reported by any Spektrum Satellite Rx. No preconditions.

All you have to do is to

- Select any free RC channel for RSSI in the BFC Receiver Tab. AUX8 for example.
- Enable RSSI in the OSD tab of BFC.

Done.

The Betaflight and Spektrum RSSI % values are not the same. Currently not user adjustable in Betaflight. In your Tx you should however be able to select three different units. "%", "dBm" or "%R". None of those scales in the same way as BetaFlight. Spektrum "%" and "dBm" drops too fast close up and "%R" to fast at range end. The scaling in Betaflight is a compromise between the two, the green line below.

![RSSI vs Distancel menu](/img/ideal_rssi_to_range.jpg)

The Betaflight fake RSSI values are not scaling too well to distance either, looks more like the red "%R" curve above. This is because it is based on fades and frame losses. And fades start to occur close to range limit. Currently the fake RSSI scaling is not configurable, 40 lost frames/s are regarded as 0% RSSI, and 0 lost frames/s is 100% .

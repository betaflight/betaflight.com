### Inverter Configuration on ASGARD (2017-06-10)

#### Firmware

ASGARD V1 and V2 do have a programmable inverter on RX6, and the firmware supporting this should be used to stably operate anything on RX6. The firmware is OMNIBUSF4SD target release 3.2, or post-3.1.7 dev builds.

TX6 has another inverter in place, but it is not used as an inverter, but an (unstable) uni-directional buffer.
The uni-directional nature of the buffer prevents half-duplex (bi-directional) protocol such as SmartPort, SmartAudio and Tramp from working.

#### Inverter Pin Configuration

V1 and V2 have different inverter configuration. V2's inverter control is PC8, which is different from that of V1, which is PC9. As a matter of fact, PC8 is same as the pin used by OMNIBUS F4 V3.

This derives following instruction regarding inverter configuration for RX6, for BF post-3.1.7 (3.2).

##### ASGARD V1

Use OMNIBUSF4SD target.
Since default value for the inverter is PC8, users must explicitly change this to PC9 using the following CLI command.

```
resource inverter 6 c9
```

##### ASGARD V2

Use OMNIBUSF4SD target.
Since default value for the inverter is PC8, it works with this version of the board without any reassignment.

Inversion control will be handled correctly by each protocol handler for V1 and V2 once the pin is configured correctly.

### For other related information, please refer to OMNIBUS F4 board wiki

[OMNIBUSF4](OMNIBUSF4)

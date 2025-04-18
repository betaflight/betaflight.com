# MSP Extensions

Cleanflight includes a number of extensions to the MultiWii Serial Protocol (MSP). This document describes
those extensions in order that 3rd party tools may identify cleanflight firmware and react appropriately.

Issue the MSP_API_VERSION command to find out if the firmware supports them.

## Mode Ranges

### MSP_MODE_RANGES

The MSP_MODE_RANGES returns the current auxiliary mode settings from the flight controller. It should be invoked
before any modification is made to the configuration.

The message returns a group of 4 unsigned bytes for each 'slot' available in the flight controller. The number of
slots should be calculated from the size of the returned message.

| Command         | Msg Id | Direction | Notes                                                                                    |
| --------------- | ------ | --------- | ---------------------------------------------------------------------------------------- |
| MSP_MODE_RANGES | 34     | to FC     | Following this command, the FC returns a block of 4 bytes for each auxiliary mode 'slot' |

Unassigned slots have rangeStartStep == rangeEndStep. Each element contains the following fields.

| Data            | Type  | Notes                                                                            |
| --------------- | ----- | -------------------------------------------------------------------------------- |
| permanentId     | uint8 | See Modes.md for a definition of the permanent ids                               |
| auxChannelIndex | uint8 | The Aux switch number (indexed from 0)                                           |
| rangeStartStep  | uint8 | The start value for this element in 'blocks' of 25 where 0 == 900 and 48 == 2100 |
| rangeEndStep    | uint8 | The end value for this element in 'blocks' of 25 where 0 == 900 and 48 == 2100   |

Thus, for a cleanflight firmware with 40 slots 160 bytes would be returned in response to MSP_MODE_RANGES.

### MSP_MODE_RANGES_EXTRA

The MSP_MODE_RANGES_EXTRA returns the extra mode setting parameters from the flight controller. It should be invoked
in conjunction with MSP_MODE_RANGES before any modification is made to the configuration.

The message returns the number of extra elements followed by a group of bytes for each 'slot' available in the flight
controller. The number of slots should be the same as for MSP_MODE_RANGES, calculated from the size of the returned
message and the number of bytes per group.

| Command               | Msg Id | Direction | Notes                                                                                  |
| --------------------- | ------ | --------- | -------------------------------------------------------------------------------------- |
| MSP_MODE_RANGES_EXTRA | 238    | to FC     | Following this command, the FC returns a block of bytes for each auxiliary mode 'slot' |

The return message is prepended with the number of bytes per element (3 bytes). Each element contains the
following fields:

| Data        | Type  | Notes                                              |
| ----------- | ----- | -------------------------------------------------- |
| permanentId | uint8 | See Modes.md for a definition of the permanent ids |
| modeLogic   | uint8 | 0 = Logic AND; 1 = Logic OR                        |
| linkedTo    | uint8 | Permanent id to which this mode is linked.         |

Thus, for a cleanflight firmware with 20 slots, 61 bytes (including prepended size) would be returned in response to
MSP_MODE_RANGES_EXTRA.

### MSP_SET_MODE_RANGE

The MSP*SET_MODE_RANGE is used to inform the flight controller of
auxiliary mode settings. The client \_must* return all auxiliary
elements, including those that have been disabled or are undefined, by
sending this message for all auxiliary slots.

| Command            | Msg Id | Direction |
| ------------------ | ------ | --------- |
| MSP_SET_MODE_RANGE | 35     | to FC     |

| Data            | Type  | Notes                                                                            |
| --------------- | ----- | -------------------------------------------------------------------------------- |
| sequence id     | uint8 | A monotonically increasing ID, from 0 to the number of slots -1                  |
| permanentId     | uint8 | See Modes.md for a definition of the permanent ids                               |
| auxChannelIndex | uint8 | The Aux channel number (indexed from 0)                                          |
| rangeStartStep  | uint8 | The start value for this element in 'blocks' of 25 where 0 == 900 and 48 == 2100 |
| rangeEndStep    | uint8 | The end value for this element in 'blocks' of 25 where 0 == 900 and 48 == 2100   |

### Implementation Notes

- The client should make no assumptions about the number of slots available. Rather, the number should be computed
  from the size of the MSP_MODE_RANGES message divided by the size of the returned data element (4 bytes);
- The client should ensure that all changed items are returned to the flight controller, including those where a
  switch or range has been disabled;
- A 'null' return, with all values other than the sequence id set to 0, must be made for all unused slots, up to
  the maximum number of slots calculated from the initial message.

## Adjustment Ranges

### MSP_ADJUSTMENT_RANGES

The MSP_ADJUSTMENT_RANGES returns the current adjustment range settings from
the flight controller. It should be invoked before any modification is
made to the configuration.

The message returns a group of 6 unsigned bytes for each 'slot'
available in the flight controller. The number of slots should be
calculated from the size of the returned message.

| Command               | Msg Id | Direction | Notes                                                                                      |
| --------------------- | ------ | --------- | ------------------------------------------------------------------------------------------ |
| MSP_ADJUSTMENT_RANGES | 52     | to FC     | Following this command, the FC returns a block of 6 bytes for each adjustment range 'slot' |

Unassigned slots have rangeStartStep == rangeEndStep. Each element contains the following fields.

| Data                  | Type  | Notes                                                                            |
| --------------------- | ----- | -------------------------------------------------------------------------------- |
| adjustmentStateIndex  | uint8 | See below                                                                        |
| auxChannelIndex       | uint8 | The Aux channel number (indexed from 0) used to activate the adjustment          |
| rangeStartStep        | uint8 | The start value for this element in 'blocks' of 25 where 0 == 900 and 48 == 2100 |
| rangeEndStep          | uint8 | The end value for this element in 'blocks' of 25 where 0 == 900 and 48 == 2100   |
| adjustmentFunction    | uint8 | See below                                                                        |
| auxSwitchChannelIndex | uint8 | The Aux channel number used to perform the function (indexed from 0)             |

Thus, for a cleanflight firmware with 12 slots 72 bytes would be returned in response to MSP_ADJUSTMENT_RANGES,

### MSP_SET_ADJUSTMENT_RANGE

The MSP*SET_ADJUSTMENT_RANGE is used to inform the flight controller of
adjustment range settings. The client \_must* return all adjustment range
elements, including those that have been disabled or are undefined, by
sending this message for all adjustment range slots.

| Command                  | Msg Id | Direction |
| ------------------------ | ------ | --------- |
| MSP_SET_ADJUSTMENT_RANGE | 53     | to FC     |

| Data                  | Type  | Notes                                                                            |
| --------------------- | ----- | -------------------------------------------------------------------------------- |
| sequence id           | uint8 | A monotonically increasing ID, from 0 to the number of slots -1                  |
| adjustmentStateIndex  | uint8 | See below                                                                        |
| auxChannelIndex       | uint8 | The Aux channel number (indexed from 0)                                          |
| rangeStartStep        | uint8 | The start value for this element in 'blocks' of 25 where 0 == 900 and 48 == 2100 |
| rangeEndStep          | uint8 | The end value for this element in 'blocks' of 25 where 0 == 900 and 48 == 2100   |
| adjustmentFunction    | uint8 | See below                                                                        |
| auxSwitchChannelIndex | uint8 | The Aux channel number used to perform the function (indexed from 0)             |

### MSP_SET_1WIRE

The MSP_SET_1WIRE is used to enable serial1wire passthrough
note: it would be ideal to disable this when armed

| Command       | Msg Id | Direction |
| ------------- | ------ | --------- |
| MSP_SET_1WIRE | 243    | to FC     |

| Data   | Type  | Notes                                                          |
| ------ | ----- | -------------------------------------------------------------- |
| esc id | uint8 | A monotonically increasing ID, from 0 to the number of escs -1 |

#### AdjustmentIndex

The FC maintains internal state for each adjustmentStateIndex, currently 4 simultaneous adjustment states are maintained. Multiple adjustment ranges
can be configured to use the same state but care should be taken not to send multiple adjustment ranges that when active would conflict.

e.g. Configuring two identical adjustment ranges using the same slot would conflict, but configuring two adjustment ranges that used
only one half of the possible channel range each but used the same adjustmentStateIndex would not conflict.

The FC does NOT check for conflicts.

#### AdjustmentFunction

There are many adjustments that can be made, the numbers of them and their use is found in the documentation of the cli `adjrange` command in the 'Inflight Adjustments' section.

### Implementation Notes

- The client should make no assumptions about the number of slots available. Rather, the number should be computed
  from the size of the MSP_ADJUSTMENT_RANGES message divided by the size of the returned data element (6 bytes);
- The client should ensure that all changed items are returned to the flight controller, including those where a
  switch or range has been disabled;
- A 'null' return, with all values except for the sequence id set to 0, must be made for all unused slots,
  up to the maximum number of slots calculated from the initial message.

## Deprecated MSP

The following MSP commands are replaced by the MSP_MODE_RANGES and
MSP_SET_MODE_RANGE extensions, and are not recognised by
cleanflight.

- MSP_BOX
- MSP_SET_BOX

## See Also

[Modes](/docs/development/Modes) describes the user visible implementation for the cleanflight
modes extension.

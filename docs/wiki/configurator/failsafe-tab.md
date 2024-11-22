---
sidebar_position: 5
---

# Failsafe Tab

Failsafe is the action your craft takes when it loses connection to the transmitter.
This tab allows you to configure what your craft does in an event of a failsafe.

:::danger
It is very important to set up your failsafe correctly to prevent your craft from flying away or crashing when you lose connection.
:::

![Failsafe tab](/img/betaflight_configurator_failsafe_tab.png)

## Failsafe Stages

There are two stages of failsafe:

- **Stage 1** - entered when a flight channel has an invalid pulse length, the receiver reports failsafe mode or
  there is no signal from the receiver for 150ms, the channel fallback settings are applied. If valid data is received,
  Stage 1 failsafe will terminate automatically. Stage 1 duration is configured using the `failsafe_delay` duration, and defaults to 1.5s.

- **Stage 2** - entered when radio link is lost for more than the configured Stage 1 duration, and the quad is armed.
  Stage 2 Failsafe Mode will be activated. Channels that are not controlled by the failsafe mode remain at their fallback setting.

:::note
Prior to entering **stage 1**, channel fallback settings are also applied to individual AUX channels that have invalid pulses.
:::

## Valid Pulse Range Settings

**Minimum length** - The minimum length of the valid pulse range. If a channel goes below this value, the FC will be put into failsafe mode.

**Maximum length** - The maximum length of the valid pulse range. If a channel goes above this value, the FC will be put into failsafe mode.

:::info
For most cases, leave these settings at their default values.
:::

## Failsafe Switch

This setting determines which stage of failsafe will be activated when manually engaging the Failsafe mode from your
controller using the `Failsafe` Aux Mode.

- **Stage 1** - activates both Stage 1 and then Stage 2 failsafe, in their normal sequence.
  This is useful if you want to simulate the exact signal loss failsafe behavior.
- **Stage 2** - skips Stage 1 and activates the Stage 2 procedure immediately
- **Kill** - disarms instantly (your craft will crash)

## Stage 1 - Channel Fallback Settings

These settings are applied to invalid individual AUX channels or to all channels when entering **stage 1**.

:::note
Values are saved in steps of 25usec, so small changes disappear
:::

You can set the channel fallback settings for each channel individually.

The available options for each channel are:

- **Auto** - Roll, Pitch and Yaw will be set to the center position, Throttle will be set to the minimum value (the quad will drop, fast).
  _This is only available for the first 4 channels_
- **Hold** - The channel will hold its last valid value.
- **Set** - You can set a custom value for the channel.

## Stage 2 - Failsafe Procedure

There are three options for the failsafe procedure:

- **Drop** (default) - The craft will disarm and fall out of the sky.
- **Land** - The craft will attempt to land.
- **GPS Rescue** - The craft will attempt to return to the home position.

### Land options

- **Throttle value used while landing** - The throttle value the craft will use while landing, unless the firmware includes
  Altitude Hold, in which case the throttle will be automatically adjusted to provide a controlled descent.
- **Delay for turning off the motors during Failsafe [seconds]** - Time to stay in landing mode until the motors turn off.

:::note
If Altitude Hold is included in the firmware, and Failsafe Landing Mode is activated, the quad will enter a controlled descent and will automatically disarm on landing.
:::

:::warning
If Altitude Hold is not included in the firmware:

- the quad will not disarm automatically, and will only disarm after the Landing Delay period has expired, which by default is 60s;
- If the Failsafe Landing Throttle value is too high, the craft will ascend instead of landing;
- If the Failsafe Landing Throttle value is too low, the craft will descend rapidly and may crash badly;
  :::

### GPS Rescue options

Here’s the revised table with the sublists formatted in one row:

| **Option**                              | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Altitude mode**                       | <li>**Maximum Altitude** - The craft will ascend to the maximum altitude during that flight plus `GPS_RESCUE_INITAL_CLIMB`.</li><li>**Fixed Altitude** - The craft will ascend to the configured Return Altitude.</li><li>**Current Altitude** - The craft will fly back at the altitude it was at when the failsafe occurred, plus the Initial Climb altitude, or at the Initial Climb Altitude if the failsafe occurred below the Home Altitude.</li> |
| **Initial climb (meters)**              | The distance the quad will climb, above the current altitude, when a rescue is initiated and the altitude mode is set to **Current Altitude**; also added when in **Maximum Altitude** mode.                                                                                                                                                                                                                                                            |
| **Return altitude (meters)**            | The altitude the craft will fly back at when the altitude mode is set to **Fixed Altitude**.                                                                                                                                                                                                                                                                                                                                                            |
| **Ascent rate (meter/second)**          | The rate at which the craft will ascend to the necessary altitude.                                                                                                                                                                                                                                                                                                                                                                                      |
| **Return ground speed (meters/second)** | The speed at which the craft will return to the home position.                                                                                                                                                                                                                                                                                                                                                                                          |
| **Maximum pitch angle**                 | The maximum pitch angle the craft will use to return to the home position. Rescue throttle usually needs to be increased if the pitch angle is increased. If pitch angle is too low, the craft might not be able to return in high winds.                                                                                                                                                                                                               |
| **Descent rate (meters/second)**        | The rate at which the craft will descend to the ground when it reaches the home position.                                                                                                                                                                                                                                                                                                                                                               |
| **Throttle minimum**                    | The **minimum** throttle value the craft will use to return to the home position.                                                                                                                                                                                                                                                                                                                                                                       |
| **Throttle maximum**                    | The **maximum** throttle value the craft will use to return to the home position. Make sure that the craft has enough Throttle Maximum to be capable of achieving the set return velocity, and maintaining altitude at high pitch angles, into any expected headwind!                                                                                                                                                                                   |
| **Throttle hover**                      | The initial throttle value that is applied when the rescue first starts. It is important to set this value accurately. If the quad drops every time the rescue starts, this value is probably too low.                                                                                                                                                                                                                                                  |
| **Minimum distance to home (meters)**   | The minimum distance that the craft has to be from the home position for a 'clean' GPS Rescue. If the rescue starts within the minimum distance, the craft will fly away until at least this distance is reached, before starting the normal rescue behavior. The craft may travel a considerable distance in a random direction before returning to Home, so it is best to avoid initiating within the minimum distance.                               |
| **Minimum satellites**                  | The minimum number of satellites required to activate GPS Rescue. If the number of satellites is below this value, GPS Rescue will not be activated.                                                                                                                                                                                                                                                                                                    |
| **Allow arming without fix**            | Allows arming without a GPS fix. If this option is enabled, the quad may be armed without a GPS Home location being determined. If there is no GPS Home location, and a GPS Rescue is initiated, the quad will immediately disarm and crash. The (much safer) default is for this option to be off, so that if GPS Rescue is set for Failsafe, arming is not possible until a Home location has been acquired.                                          |
| **Sanity checks**                       | <li>**On (highly recommended)**: The craft will perform sanity checks before starting the rescue; if the checks fail, the craft will disarm.</li><li>**Off**: The craft will not perform sanity checks before starting the rescue, potentially leading to flying away or crashing.</li><li>**Failsafe only**: Sanity checks will only be performed on an actual loss of signal, not triggered if GPS Rescue is activated using the Aux mode.</li>       |

For more information about GPS Rescue on 4.5+, see this [Wiki document](/docs/wiki/guides/current/GPS-Rescue-v4-5).

## Testing Failsafe

:::danger
It is very important to make sure your failsafe works as expected

Failure to do so can result in lost or damaged equipment, or even injury to yourself or others.
:::

- When using the **Drop** failsafe, the easiest way to test it is to arm your craft **with your props off**,
  then turn off your transmitter. The motors should stop after the configured failsafe delay time.
- When using other failsafe procedures, you can test them by settings up the **failsafe** mode on a switch,
  and carefully activating it in an open area. If something goes wrong, you can revert the position of the switch
  to stop the failsafe procedure.
- For GPS Rescue, there is a **GPS Rescue** mode that can be activated independently of the failsafe mode.
  This mode will immediately activate Stage 2 GPS Rescue, bypassing Stage 1.

:::tip
If a switch-induced Landing or Rescue test has a problem, or seems to float around, DO NOT DISARM IN PANIC!
Undo the Rescue switch promptly and you'll get full control back immediately. Do not wait more than 15s or it may disarm and crash.
:::

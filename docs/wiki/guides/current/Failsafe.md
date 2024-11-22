# Failsafe

If the radio link is lost, or the receiver fails or becomes disconnected, the pilot will have no control over their aircraft.

Betaflight provides a Failsafe system to safely manage this potential hazard. The flight controller can be programmed to either

- disarm and drop
- to apply a fixed throttle value, and other specific values, with the intent of descending in a controlled manner
- to activate GPS Rescue and autonomously fly home (requires a working GPS module)

:::danger
Always confirm that your failsafe system is working properly before flying!
:::

## Introduction

There are two types of failsafe:

**Receiver based failsafe** is where the receiver is configured to send specific values on specific channels to the flight controller when the radio link is lost. Normally the values are configured so that the aircraft either cuts motors and falls, or descends in a controlled manner. See your receiver's documentation for this method. Since the data received appears 'normal', the flight controller will be unaware that the link is down. The failsafe settings in the firmware will not be triggered, and you will not see anything in the OSD.

**Flight Controller based failsafe** is where the receiver is configured to send 'no data', or for a PPM Rx to send invalid values (ie a value below `rx_min_usec`), when the link is lost. Some receivers may send a 'link lost' packet in the data stream to the FC at the same time. The flight controller always monitors for the absence of incoming data, 'link lost' packets or bad PPM values. When the flight controller determines that the link is lost, it will respond according to the failsafe settings as set in Configurator. If warnings in the OSD are enabled, a link loss warning will appear.

:::danger
**We do NOT recommend using receiver based failsafe!**

Always ensure that the receiver is configured to 'send no data' on signal loss!
:::

## Flight Controller based failsafe overview

Flight Controller failsafe continuously monitors the integrity of the radio link.

It is essential that the Receiver is configured to send **no data** (no packets at all) on signal loss, otherwise Flight Controller based failsafe will never realize that anything is wrong.

Flight Controller failsafe will work if the wires connecting the FC to the Receiver come loose, or break, or your receiver locks up.

### Flight Controller failsafe has three stages:

**Signal Validation** is a short (100ms) period in which the absence of incoming data is noted, the last received values are 'held'.

If signal validation fails, i.e. no signal for more than 100ms:

- the flight controller holds the last known good values for a further 300ms, and then activates failsafe stage 1 values, and
- an arming block will be initiated, and `RXLOSS` will shown in the OSD while that block is active; these will persist for at least the `failsafe_recovery_delay` period.

**Failsafe Stage 1**, or the 'Guard' period, applies the Stage 1 **Channel Fallback Settings** for up to the `failsafe_delay` period (1.5s by default in 4.5, 1.0s in 4.4), counted from the time of the last valid packet. If any valid data arrives while in Stage 1, the flight controller will respond to it immediately, and the failsafe process stops. During stage 1, he pilot may notice jerky or intermittent stick responsiveness if the signal comes and goes.

**Failsafe Stage 2** is entered if the **Failsafe Stage 1** or "Guard" period is exceeded. The user decides what will happen in Stage 2. By default, the craft immediately disarms and drops. Alternatively, it can enter `Landing Mode` or `GPS Rescue`.

When signal returns, after Stage 2 has started, it must be continuously good for at least the `failsafe_recovery_delay` period before the signal can be considered 'fully recovered'. Only then will the `RXLOSS` message be cleared, and control inputs considered 'real'. In Betaflight 4.5 the `failsafe_recovery_delay` period is 500ms, but if built with the `RACE_PRO` option, it is only 100ms; in 4.4 it was 1.0s.

:::note

When signal fully recovers after a Stage 2 Failsafe:

- `RXLOSS` will go away,
- if Stage 2 was a GPS Rescue, the quad will start checking the inputs for stick movements that are needed to return control to the pilot; when they are detected, and only then, will full control will be returned to the pilot, as if nothing had happened.
- in other Stage 2 modes, if the quad has disarmed, the pilot **must disarm before they can re-arm**, and the`NOT_DISARMED` warning will be shown in the OSD until the arm switch is put in the disarmed position.

:::

A transmitter switch may be configured to immediately activate Flight Controller failsafe. This is useful for field testing the failsafe system and as a **_`PANIC`_** switch when you lose orientation. Reversing that switch immediately returns full control to the pilot.

### Signal Validation

**Signal loss** means:

- **no incoming data packets**, or that the receiver is sending **failsafe mode** or **frame dropped** packets, for more than 100ms, or
- **_invalid pulse length_** data on any flight channel for more than 300ms (PPM receivers only)

`RXLOSS` should be displayed in the warnings field of the OSD when signal loss is detected. This is an 'early warning' of significant packet loss - an indicator that the link is in a bad way. The `RXLOSS` message will be held for half a second (100ms in `RACE_PRO` builds, one second in 4.4), even if the signal loss is brief. During this time, the quad will not respond to arming commands, for safety reasons.

When the FC decides that signal loss has occurred, the values on the bad channels, or on all channels for total packet loss, will be held at their last received value for 300ms from the last known good data.

If valid incoming data is detected during the signal validation period, the signal is considered 'normal' again, the signal loss detection timers are reset.

After 300ms with no valid data, the previously held values are replaced with Stage 1 Failsafe values, and we enter Stage 1 Failsafe.

When a failsafe switch is enabled, and Failsafe is set to use Stage 1, the flight channels (Roll, Pitch, Yaw and Throttle), but not the auxiliary channels, are immediately set to Stage 1 values, without any delay.

### Stage 1 Failsafe

**Stage 1** applies fixed values after confirmed signal loss.

**The default Stage 1 duration**, or 'guard time' is 1.5 seconds in 4.5 (1.0s in 4.4), with a minimum of 200ms. The countdown to Stage 2 starts from the time of the last good packet. The Stage 1 duration may be customised via the "Guard time for stage 2 activation" parameter in Configurator (`failsafe_delay` in the CLI).

**During Stage 1 Failsafe from signal loss**, by default, all stick positions are set to the 'fallback' values (centered, throttle zero), and the current switch positions are held. These settings can be customised in Configurator's 'Channel fallback settings' panel in the failsafe tab, or with the CLI command `rxfail` (see the [rxfail](/docs/development/Rx#rx-loss-configuration) section in the Rx documentation). For example, the pilot may choose a hover throttle value, or to activate Level mode, in Stage 1, by configuring the relevant fallback switch or aux channel values.

The PID system remains active in Stage 1.

If signal returns during the Signal Validation or Stage 1 periods, control is immediately returned to the pilot, and the failsafe timers are reset.

:::danger
Because Stage 1 cuts throttle to zero by default, the craft may immediately start to fall from the sky. It may be better to set this to a throttle value where the quad descends slowly, or just hovers. It is essential to do this when GPS Rescue is enabled for Stage 2 Failsafe, or the quad may crash in Stage 1 before the Rescue has time to start.
:::

**Stage 1 may be activated by a transmitter switch**. The switch should be configured in Configurator's Modes Tab to enable failsafe, and the `failsafe_switch_mode` should be set to `STAGE1`. Note that:

- the effect is immediate,
- the aux channels remain active, and
- returning the switch to normal terminates the failsafe behavior immediately.

:::caution
If the switch is held ON for longer than the `failsafe_delay` period, the flight controller will enter Stage 2 (see below), and, depending on how Stage 2 is configured, may immediately drop, or disarm.
:::

There is no dedicated 'Stage 1' indicator in the OSD. The flight mode field in the OSD does _not_ show `!FS!` during stage 1.

### Stage 2 Failsafe

Stage 2 Failsafe is entered when signal loss persists longer then the configured Stage 1 period. Stage 2 may also be entered with a failsafe switch. Once active:

- the selected `Stage 2 Failsafe_procedure` applies.
- `!FS!` will be shown in the Flight Mode field of the OSD.
- `RUNAWAY_TAKEOFF` protection is enabled in failsafe before 4.3, but later versions disable it, to avoid unwanted mid-air disarms that could occur in GPS Rescue.

Entering Stage 2 is not possible until 5 seconds after the flight controller boots up. This is to prevent unwanted activation, as in the case of TX/RX gear with long bind procedures, before the Rx sends out valid data.

Stage 2 Failsafe can be activated by an aux channel switch. If the switch behavior is set to `STAGE2` (`failsafe_switch_mode` in the CLI), Stage 2 activates immediately. Otherwise it waits until Stage 1 is complete.

When the flight controller enters Stage 2, it implements one of three (actually, four) possible Stage 2 Failsafe procedures::

- **Drop**, the default, causing immediate disarm and motor stop. There is a time delay before re-arming is possible
- **Landing Mode**, where the sticks are centered, throttle is held at a defined value, and the aux channels are set as configured for Stage 1 (which could include configuring an aux channel to enable Level mode). These settings will apply for the Landing Time (`failsafe_off_delay` period), which defaults to 1 second, but can be longer. At the end of this period, the quad will disarm (and crash). Landing Mode can be hazardous, since the motors and PIDs are active, and you cannot control where the quad goes. If the machine crashes and the props get stuck, they can burn out, though if the PID errors are bad enough, the runaway takeoff system may disarm the quad.
- **GPS Rescue**, where, with a GPS module, the quad will transfer stick and throttle control to the GPS controller, and it will fly home and land.
- **Just Disarm**, a 'fourth' internal mode, which applies if the throttle has been held low for at least 10 seconds before entering Stage 2 (unless the mode is set to GPS Return). This can sometimes cause confusion when testing failsafe. Always test with throttle up at some point before the test. Its primary purpose is to force a disarm if the user powers down their radio after landing, but has forgotten to remove the lipo. This prevents the quad entering Landing Mode, for example, spinning the props up unintentionally.

If the link is restored, control will be returned to the pilot:

- in Landing Mode, when the RC signal has recovered for longer than the `failsafe_recovery_delay` period, or
- in GPS Rescue Mode, when the link has returned for `failsafe_recovery_delay` and the pilot has moved the sticks more than 30 degrees out from center.

:::warning
**There is no way to instantly recover from Stage 2 Failsafe caused by signal loss, or from a disarm at the end of Stage 2**.
:::

At the end of the stage 2 procedure, the flight controller will disarm. The word `FAILSAFE` will alternate with `RXLOSS` in the warnings field.

The pilot cannot re-arm until after the `failsafe_recovery_delay` period expires. All the usual arming checks apply; arming switches must be off, throttle must be zero, and if the accelerometer is enabled, the quad must be within `small_angle` range.

After a failsafe disarm, if the link is restored while the Arming switch is active, the quad will not automatically re-arm itself. The OSD message `NOT_DISARMED` will be shown (`BAD_RX` before 4.5). The user must drop the arm switch to 'disarm' before it can be re-armed.

When Stage 2 is initiated by aux switch, recovery is immediate when the switch is reversed, unless the `failsafe_switch_mode` is set to `KILL`.

### Drop Mode

The default signal loss behavior with 1.5 seconds of stage 1 'guard time' is:

- 300ms holding last values
- the next 1200ms at idle throttle with sticks centered (the default Stage 1 or fallback settings)
- followed by disarm and drop.

Recovery within the Stage 1 time is immediate, but if Stage 2 completes, and the quad disarms, the `failsafe_recovery_delay` time must expire before re-arming is possible.

Drop Mode is typically used by racers and park fliers. Racers often reduce the `failsafe_recovery_delay` to a short time so they can re-arm quickly.

In Drop Mode, the `failsafe_delay`, or guard time, should be long enough that a brief Rx loss will be tolerated without leading to a disarm. Shorter guard times will stop the motors more quickly when signal is lost. In practice the minimum safe guard time is 200ms. Any shorter and you are vulnerable to false failsafes from brief signal loss.

The `failsafe_recovery_delay` is how long the signal must be 'good' for before you're allowed to re-arm after being disarmed by the Drop procedure. By default this is 0.5 seconds in 4.5, 0.1 seconds in 4.5 if built with the `RACE_PRO` option, and is 1.0s in 4.4. The reason is that some radio links can be erratic when they recover, so don't make the duration too short without first checking that the quad doesn't go bezerk when the signal recovers. Remember that to recover from Stage 2, the pilot must toggle disarm - re-arm. The OSD message `NOT_DISARMED` will be shown (`BAD_RX` before 4.5) if the arm switch is in the armed position and signal has recovered. If you see this, you can re-arm by disarming, then re-arming.

### Landing Mode

This can be used to apply a defined set of Aux switch settings and stick values for a set period of time after the Stage 1 or Guard period expires.

Historically, this was used to enable Level mode, and apply sufficient throttle for a gradual fall from a typical flight altitude. It had a role when people would hover at a consistent altitude and not do much else, potentially minimising the damage from a crash from altitude.

However, it is s a potentially hazardous thing to do, and not generally recommended, because the quad will fall with active PIDs and will drift with the breeze. The motors may be active when it hits the ground, and could burn them out, and the quad could land on top of people with throttle on and fully active PIDs.

Currently there is no impact detection like in GPS Rescue, but if `RUNAWAY_TAKEOFF` protection is enabled, it may disarm if there are sustained high PID levels in the absence of stick inputs.

We do not recommend enabling this mode, other than for testing failsafe switches and figuring out suitable hover values for GPS Rescue.

You will only regain normal flight control during Landing Mode after the signal is restored for more than the `failsafe_recovery_delay` period.

**Configuring Landing Mode.**

1.  Enable Landing Mode as opposed to Drop as the failsafe procedure
2.  Set `failsafe_off_delay` to an appropriate value based on how high you fly (how long you think it will take to land at the set throttle value).
3.  Set `failsafe_throttle` to a value that allows the aircraft to descend at approximately one meter per second (default is 1000 which should be throttle off).

The behavior with default one second of stage 1 'guard time' and a 10s Landing time is:

- 300ms holding last values
- the next 1,200ms at idle throttle with sticks centered (the default fallback settings)
- 10s of landing throttle
- your Stage 1 Aux switch values applied

### GPS Rescue Mode

The full details of GPS Rescue are covered in the wiki, and elsewhere.

You will regain during GPS Rescue Mode only after signal restores for more than the `failsafe_recovery_delay` period AND you move the sticks more than 30 degrees out from center.

:::danger
Do not forget to wiggle the sticks when attempting to recover from a true signal-loss GPS Rescue!
:::

You will regain the ability to re-arm after GPS Return terminates and disarms and the signal has been restored for more than the `failsafe_recovery_delay` period.

### "Just Drop" Mode

This is an 'invisible' mode that is always present.

It is intended to 'catch' the possibility that the pilot has landed, forgotten to disarm, and powered off their transmitter. This would result in a failsafe, and if Landing Mode was active, the motors could spin up.

"Just Drop" looks at the throttle position, and if it has been down for 10s before turning the transmitter off, the failsafe system will immediately disarm the quad, and not enter Landing Mode. This protects the pilot, so long as they have throttle low for 10s before switching the radio off.

### General Stage 2 SAFETY Considerations

- Keep the radio on, and the sticks in the disarmed position, until the quad is powered down.
- When signal is restored while in Stage 2 Landing Mode, or when restoring normal control after a stick test of failsafe, the current throttle and stick positions will be applied to the craft. Take care not to have sticks in extreme positions when terminating a failsafe test, or in Stage 2 Landing Mode.
- If `MOTOR_STOP` is active, the props may not be spinning while disarmed. If the radio is then switched off, the pilot may think that it is safe to pick up the quad. If Stage 2 is set to `Landing Mode`, **the props may spin up without warning at the end of Stage 1**.
- Since 4.3, re-arming is possible, after a failsafe, without needing to power cycle the quad, so that if you crash after failsafe in an inaccessible area, and you can get close enough to regain signal, you can re-arm and fly out.

## Failsafe Settings

Failsafe delays are configured in 0.1 second steps.
1 step = 0.1sec
1 second = 10 steps

#### `failsafe_delay`

Guard time, or Failsafe Stage 1 period; the time before for failsafe Stage 2 activation after a lost signal. This is the amount of time the flight controller waits, after a signal loss, before activating Stage 2 Failsafe.

#### `failsafe_off_delay`

In Landing Mode, the time from Stage 2 initiation until the motors finally turn off. Throttle will be at 'failsafe_throttle' for this period of time. If you fly at higher altitudes you may need more time to descend safely.

#### `failsafe_throttle`

Throttle level used wile in Stage 2 Landing Mode. Specify a value that causes the aircraft to descend at about 1M/sec (relatively slowly).

:::warning
Default is set to 1000 which means throttle off, and will cause the quad to descend very rapidly
:::

#### `failsafe_switch_mode`

Configure the RC switched failsafe action. It can be one of:

- `STAGE1` - activates Stage 1 Failsafe immediately. RC controls are applied as configured for Stage 1, but aux channels remain active. After the `failsafe_delay` guard time, Stage 2 is activated. This is useful if you want to simulate signal loss failsafe behavior. Recovery of signal immediately restores full pilot control.
- `STAGE2` - skips Stage 1 and immediately activates the selected Stage 2 procedure. Useful if you want to assign instant auto-landing, GPS Return, or Drop, to a switch.
- `KILL` - immediately disarms the quad with no delay. Your craft will crash. Note that a single glitch on the failsafe channel will immediately crash the quad. Re-arming is blocked for 1 second after signal is restored. A similar, but safer effect can be achieved by:
  - setting `failsafe_switch_mode` to `STAGE2`, `failsafe_procedure` to `DROP`, and `failsafe delay` to 2. This gives a 200ms delay signal validation period, the shortest allowed, so that transient glitches on the failsafe channel will not falsely trigger a disarm. Drop recovery can be made faster than Kill by configuring a short `failsafe_recovery_delay` time (which can be as short as 200ms).
  - using the arm switch. This does not introduce re-arming locking.

#### `failsafe_throttle_low_delay`

Time throttle level must have been below `min_throttle` to prevent false failsafe initiation when the link is established after powering up the quad.

See [Rx documentation](/docs/development/Rx).

#### `failsafe_procedure`

- `DROP`: Just kill the motors and disarm (crash the craft). Re-arming is locked until RC link is available for at least 3 seconds and the arm switch (if used) is in the OFF position.
- `AUTO-LAND`: Enable an auto-level mode, center the flight sticks and set the throttle to a predefined value (`failsafe_throttle`) for a predefined time (`failsafe_off_delay`). This should allow the craft to come to a safer landing. Re-arming is locked until RC link is available for at least 30 seconds and the arm switch (if used) is in the OFF position.
  = `GPS_RESCUE` : Enable GPS Rescue.

#### `failsafe_recovery_delay`

Time for a recovered signal to be considered valid while in Stage 2 Failsafe. The signal must be 'good' for at least this time before control is returned to the pilot; the pilot cannot re-arm during this period. In GPS Return mode, this is the time required before the pilot's stick inputs will be assessed for the restoration of control. In Betaflight 4.5, this period is 0.5s by default, unless the `RACE_PRO` option was built into the firmware, when it is 0.1s by default. In Betaflight 4.4, this period is 1.0s. `RXLOSS` will still be shown in the OSD during the `failsafe_recovery_delay` period, since technically the signal is not yet considered OK.

Note that during the `failsafe_recovery_delay` period, the quad cannot be re-armed. To be re-armed, the quad must first be disarmed. If the arm stick is in the armed position when the `failsafe_recovery_delay` expires, the warning `NOT_DISARMED` will be shown. It means that you need to toggle the arm switch back to the disarm position, and then you can re-arm.

#### `failsafe_stick_threshold`

For GPS Return, the angle in degrees that the sticks must be 'wiggled' away from center in order to return control to the pilot, assuming the signal has already recovered.

The idea is that as the quad flies home, the pilot leaves the sticks centered. Once they get video back, and see that Rx signal has returned, moving the sticks allows the pilot to regain control at a time that suits them, rather than just immediately signal returns.

#### `rx_min_usec`

The lowest channel value considered valid. e.g. PWM/PPM pulse length

#### `rx_max_usec`

The highest channel value considered valid. e.g. PWM/PPM pulse length

The `rx_min_usec` and `rx_max_usec` settings helps detect when your RX stops sending any data, enters failsafe mode or when the RX looses signal.

With a Graupner GR-24 configured for PWM output with failsafe on channels 1-4 set to OFF in the receiver settings then this setting, at its default value, will allow failsafe to be activated.

## Testing Failsafe

**A transient Rx failure can emulated on the bench** by:

- Powering down the radio transmitter. This can take several button presses, and the radio may not power up unless all unless all switches are 'off'. That may not be helpful since the arm switch would need to be off.
- Disabling the active Tx module in the radio transmitter. On most radios, this immediately stops sending any data to the receiver, and is the quickest and most effective way to emulate losing the Rx signal. Typically, when the Tx module is re-enabled, the transmitter immediately starts sending data again. This method is recommended.
- Interrupting the power to the Rx module

Before testing failsafe, confirm what your radio does in Configurator's Rx tab in response to the actions above.

**Bench test of Stage 1 - _remove the props!_.**

1. Set the Guard, or stage 1 time, to 10s (100)
1. Set the Stage 2 procedure to Drop and a 'hover' value for the Stage 1 throttle value
1. Arm the craft and throttle up briefly
1. While wiggling the sticks, listen to the motors, and cause a loss of Rx link.
1. Confirm that motors hold RPM for 300ms after the signal is lost, then drop to the configured Stage 1 throttle value, and stay there for 10s, until the quad disarms.
1. Confirm that RXLOSS appears in the OSD while the link is down
1. Re-arm the quad, and repeat the test, emulating a link failure.
1. Within the stage 1 period, restore the link while wiggling the sticks with some throttle active.
1. Confirm that immediately the link is restored, the motors start responding to the sticks
1. Restore the Stage 1 time to your preferred value (default is 15, or 1.5s)

**Bench test of Stage 2 Drop Mode - _remove the props!_.**

1. Configure Failsafe Stage 2 to Drop
1. Arm the craft and throttle up briefly
1. Emulate a link failure while wiggling throttle up and down
1. Confirm the normal Stage 1 behavior, which should last 1.5s by default
1. Confirm that the motors turn off and the quad disarms at the end of Stage 1.

**Bench test of Stage 2 Landing Mode - _remove the props!_.**

1. Configure Failsafe Stage 2 to Landing Mode, with a suitable Landing Mode throttle value
1. Arm the craft and throttle up briefly
1. Emulate a link failure while wiggling throttle up and down
1. Confirm the normal Stage 1 behavior, which should last 1.5s by default
1. Confirm that the motors then receive a fixed throttle value for the Stage 2 duration. Note that if the quad is in Angle mode, the PIDs will cause the motors to spool up.
1. Confirm that the motors turn off and the quad disarms at the completion of the Landing duration.
1. Repeat the above, restoring the link while in Landing Mode.
1. Confirm that control is returned to the pilot shortly after the link is restored

**Field test Landing Mode.**

Using a configured transmitter switch is good way to directly enter and exit Stage 2 Failsafe modes.

1. Perform bench testing first!
1. Find a place where you can hover at low altitude above something soft (long grass, ferns, heather, foam, etc.) in an unpopulated area away from buildings or people.
1. Before testing Landing Mode, test Drop Mode, confirming that the Stage 1 value for throttle doesn't cause a flyaway, and that the quad disarms at the end of stage 1.
1. Configure Stage 2 to Landing Mode, and enable Angle Mode using the relevant Stage 1 Aux channel.
1. Check that both the Stage 1 and the Stage 2 Landing Mode throttle values are set to a value that should result in a slow descent. If in doubt, start with a LOW value.
1. Plan how to emulate the link loss, and plan how to restore the link immediately if the quad starts to fly away (eg if the failsafe throttle is set too high), since you will not be able to disarm until the link is restored.
1. Arm and hover only a meter or so above ground.
1. Emulate the link loss.
1. Confirm that the quad descends. Confirm that the motors continue to spin for the configured duration, then disarm. If `RUNAWAY_TAKEOFF` is enabled, the motors may disarm earlier if the PIDs wind up.
1. Remove flight battery.

If the quad descends too quickly, increase failsafe Landing throttle setting.

Ensure that the Landing duration is long enough for your craft to reach the ground from the altitudes you normally fly at.

**Set up, configure and test GPS Rescue**

Using a configured transmitter switch is good way to directly enter and exit Stage 2 Failsafe modes such as GPS Rescue.

Always perform true emulated Rx loss testing before relying on GPS Rescue.

See the GPS Rescue Wiki page for your firmware:

- [GPS Rescue 4.5](GPS-Rescue-v4-5)
- [GPS Rescue 4.4](GPS-Rescue-v4-4)
- [GPS Rescue 4.1-4.3](GPS-Rescue-Mode-v4-1-to-v4-3)
- [GPS Rescue before 4.1](/docs/wiki/guides/archive/GPS-Rescue-Mode)

## Firmware code change history

Betaflight 4.5

- Do not permit arming until the `failsafe_recovery_delay` period has expired
- Set the `failsafe_recovery_delay`period to 500ms by default
- The `RACE PRO` build option sets the default `failsafe_recovery_delay`period to 100ms, allowing faster re-arming after a failsafe.
- Change the `BAD_RX` OSD message to `NOT_DISARMED`
- GPS Rescue performance improvements
- Fixes to minimise risk of GPS Rescue activation when armed immediately the link becomes active
- `DEBUG_FAILSAFE` added

Betaflight 4.4

- Dedicated task control for GPS Rescue
- Many GPS Rescue changes, including automatically enter Level Mode even if switch not set
- Many failsafe fixes, making the timing more accurate
- `RX_LOSS` less frequently shown on OSD by requiring at least 100ms signal loss.
- Immediate responses to stick initiated failsafe

# Position Hold 4.6

Betaflight 4.6 introduces Altitude Hold and Position Hold

When used together, these features allow the pilot to hit a switch and the aircraft will hover at a fixed location and constant altitude, in Angle Mode. The sticks can then be used to ajust altitude and location. A GPS is essential, and a Magnetometer is strongly recommended.

## Quick-Start

- Include `ALT_HOLD_MODE` and `POS_HOLD_MODE` in your firmware build.
- Ensure your GPS is working properly
- Ideally, include a Magnetometer and verify that it is working properly
- Set the hover throttle value accurately
- Enable both Altitude Hold and Position Hold on the same Mode switch
- Hover the quad and test carefully; the aircraft will be in Angle mode and stick responses will be different from usual.

## Altitude Hold

Altitude Hold can be installed and tested independently of Position Hold.

Altitude Hold is intended to keep the quad at a constant altitude, automatically adjusting the throttle as required. The throttle must either be set to zero, or put somewhere within a deadband either side of the normal hover point, for the altitude to be kept stable. The target altitude can be adjusted up or down by putting the throttle above, or below, the deadband.

The accuracy of the altitude hold depends on a number of factors - the accuracy and stability of the altitude data, whether the PID values are optimal particular build, and how strong and gusty the wind is. In good conditions, with decent PIDs, altitude stability within half to one meter can be expected.

If used 'alone' - i.e. without Position Hold, the aircraft's altitude should be stable, but there will be NO position stability; roll, pitch and yaw controls will work as they 'normally' do, and the craft will always be in Angle mode.

Reliable altitude hold requires a good altitude source. A GPS alone is sufficient, but needs lot of satellites, and some of them must be low to the horizon. Sometimes enabling a Barometer will improve altitude estimation. The accuracy and stability of the Altitude estimate can be checked in the Congfigurator Sensors tab. The default PIDs are intended for GPS only configurations, and may be a bit aggressive if a fast Barometer is added.

The pilot must configure a mode switch to enable Altitude Hold in Configurator's Modes tab.

When active, if the throttle is kept within a deadband around the normal hover throttle stick position, the aircraft should maintain constant altitude.

If the pilot wants to adjust the altitude to a higher value, they should bring the throttle above the deadband zone, and vice versa. The aircraft responds by climbing at a velocity that is proportional to stick position. At full throttle, the aircraft will climb at a steady rate of only 5m/s. If throttle is below the deadband, the aircraft will descend at a steady rate.

When Altitude Hold is initiated, it first sets throttle to the CLI `hover_throttle` value, and a PID controller then adjusts the throttle, either side of the hover value, to maintain altitude.

If the `hover_throttle` value is too low, the quad will immediately drop every time Altitude Hold starts, and if it is too high, the quad will immediately climb at the start. The response at the start should be used to fine-tune the correct value. When set correctly, there will be no sudden altitude change at the start. At the field, the hover throttle value can be adjusted via the GPS Rescue OSD sub-menu.

To keep the aircraft at constant height, throttle must be set either to:

- a position within the deadband zone either side of the hover throttle value, or
- zero (throttle all the way down)

If Altitude Hold is enabled as an emergency response to a rapid drop, or if the quad is climbing really fast, there will likely be overshoot. The code cannot stop the quad instantly, but it should get to the initiation point within a few seconds. It's wise to check behaviour in situations like these, before relying on it.

Altitude Hold can be enabled while inverted, the quad just flips over and should stay at that height.

While in Altitude Hold mode, the aircraft will enter Angle Mode. If Position Hold is not simultaneously enabled, Roll, Pitch and Yaw work normally - only the altitude is controlled.

** CLI OPTIONS **

- `hover_throttle` : the initial value sent to throttle at the start of altitude hold. Too low and the quad drops every time you initiated altitude hold.
- `alt_hold_adjust_rate` : Altitude responsiveness to throttle. This is intentionally a bit weak. Default is +5m/s at full throttle, and -5m/s on zero throttle.
- `alt_hold_deadband` : the deadband either side of hover throttle in which altitude will automatically be held constant. Default is 20, or 20%. If, for example, hover throttle was 1400, a 20% deadband means hover with throttle anyhere in the range from 1320 to 1520

## Position Hold

Position Hold should be enabled at the same time as Altitude Hold, by configuring both to the same Mode Switch.

When enabled together, both the altitude, and the position of the quad, should be held constant. The aircraft will enter Angle Mode, and should quickly stop, then hover at the location it stops at.

Typically the aircraft should hover within 1-2m of the target location, depending mostly on the consistency of the GPS signal, how windy it is, and how the PIDs are optimised. More aggressive PIDs will hold position better, but will result in lots of rapid small responses. Less aggressive PIDs will be smoother, but slower in response.

Position Hold requires a good GPS signal, and works best when an accurately calibrated and fully working Magnetometer is enabled.

With a Magnetometer, accurate Position Hold is available immediately after takeoff. In contrast, when there is no Magnetometer, Position Hold **will not work** until the aircraft has been flown in a straight line, pitched forward, at a decent speed, for at least several seconds. The warning message `POSHOLD FAIL` will appear in the OSD in this case.

:::caution
If the Magnetometer returns false heading information, or if the GPS heading has become messed up, enabling Position Hold may cause the aircraft to tilt a lot, and fly away at speed!
:::

:::note
For information on setting up a Magnetometer, see the [Betaflght.com wiki](https://betaflight.com/docs/wiki/guides/current/magnetometer).
:::

While in Position Hold, the target position can be adjusted using Roll and Pitch inputs that exceed `pos_hold_deadband`. The quad can then be moved around, and even flown, using the sticks, a bit like normal Angle Mode, especially if the deadband is set to a low value. However it will always stop quite hard when the sticks are re-centered. The deadband can be adjusted in the CLI with the `pos_hold_deadband` value, in percent stick distance out from centre, to suite your requirements. If `pos_hold_deadband` is set to zero, pitch and roll inputs will be completely ignored; the quad's location will be locked until the switch is reverted.

If the quad is carrying speed when Position Hold is initiated by returning sticks quickly to centre, there will be a strong pitch or roll response to stop the aircraft's movement as quickly as possible. To get a smoother stop from speed, slow the aircraft down using the sticks before recentering them.

If both Position Hold and Altitude Hold are working, and failsafe is set to `landing mode`, the quad will enter a controlled descent phase at the current position, without drifting or falling. This is much nicer than the old method. GPS Rescue mode is still preferred over `landing mode`, for failsafe, and will take precedence over Position Hold.

### User CLI options\*\*

- `pos_hold_without_mag = true` : permits Position Hold without a Magnetometer
- `pos_hold_deadband` : the deadband around center stick position, default is 5%. If set to zero, sticks will be ignored. Smaller deadbands are nicer for adjusting position or flying around.
- `autopilot_position_P` : the P value for position hold. THere are also values for pid D, I and A values, where A is 'Acceleration'. Defaults are all 30. When too high, the quad will oscillate. When too low, control is loose. Take care when adjusting these, adjust them one at a time to learn what they do.
- `autopilot_position_cutoff` : a smoothing filter applied to the PID D and A values. Default is 80, or 0.8Hz. There is still some jittering around like this. 50 is a lot smoother, but leads to vagueness in position control. 200 is very jittery. You choose.
- `gyro_filter_debug_axis` : selects whether Pitch or Roll distances and PIDs are logged to the `autopilot_position` debug.

### Pre-flight checks

- If using a Magnetometer, validate the heading carefully with Configurator's home screen. It doesn't have to be perfect, but must show heading correctly, within an error of about 20 degrees, at pitch angles +/- 60 degrees. Check vs a mobile phone that it reads close to zero when the aircraft points North, near 90 when East, 180 when South, etc.
- Hover in Angle mode and confirm that the Acc is calibrated and the hover is stable. Sticks can be used to fine-tune a dead flat hover.
- First test Altitude Hold alone, and check that there is no immediate drop, or climb in height, the moment you engage Altitude Hold. Adjust `hover_throttle` until altitude doesn't abruptly change when Altitude Hold is engaged. Check that you can adjust altitude while in Altitude Hold using throttle, up or down.
- Make sure you have lots of GPS sats, arm, go to Angle mode, hover a couple of meters in the air, LOS and engage both Altitude Hold and Position Hold at the same time. Be ready to undo the Position Hold switch or disarm immediately. The aircraft should just stay where it is. Expect that it may drift around a bit, and go up and down a bit, within about a 1m radius.
- If it immediately flys off at a bad angle, or circles around vaguely, then the heading information from either Mag or GPS is bad.
- If it shakes a lot or oscillates, the PIDs are too high.
- Confirm that you can adjust the position using the Roll and Pitch sticks. Do this cautiously and gently. It will not feel 'normal'. When you want to slow down, do so 'gently', or manually wash the speed off by reversing your pitch input before entering the sticks. Otherwise, sudden stops at high speed will cause abrupt pitch changes, because the quad will try to stop as quickly as possible.
- Get a good feel for the 'control' over position hold with LOS flying before using it FPV.

### Safety functions

- The aircraft cannot be armed in Position Hold or Altitude Hold.
- Position Hold will not work:
  - if there is no GPS 3D fix.
  - when a Mag is required, but the Mag is 'not healthy', ie broken, or has never been calibrated.
  - a Mag is not required, but the GPS has not yet provided a workable heading because the aircraft has not been flown cleanly pitched forward for long enough, or not fast enough
- A `POS HOLD FAIL` message will appear in the OSD if Position Hold is attempted but any of the above checks fail.
- By default, Mag is required. The pilot can permit Pos Hold without Mag only with `set pos_hold_without_mag = true`
- If `pos_hold_without_mag` is set to true, and there is no Mag, Position Hold will not be available immediately after takeoff, and will not be permitted until the GPS has provided a useful heading. The user must fly in a straight line with a solid pitch forward angle, and no yaw or roll, for several seconds at least, to orient the IMU to the GPS. Until that orientation takes place, Position Hold will not initiate, and show the failure warning, when the switch is set.
- If the craft is armed, and then Position Hold is enabled, the OSD flight mode will show `POSH`, the quad will start Angle Mode and wait for throttle to be raised. Once the throttle is raised, the aircraft should lift off, and once it is about 1m up in the air, Position Hold will engage.
- There is a simple sanity check that will terminate Position Hold if it cannot stay within 10m of the start point. The distance is increased if the quad is moving fast when initiated.
- GPS Rescue will override Position Hold.

:::caution
If Position Hold is enabled quickly after power up, when the GPS fix is poor, both altitude and position control can be erratic. A good GPS position fix, with stable altitude and position values, is essential for Position Hold.
:::

### Debugging - checking PIDs etc

In CLI, go `set debug_mode = autopilot_position` to log position hold target, distance and PIDs.

Basic testing is easiest by flying the aircraft directly Northwards, making only Pitch adjustments, and logging pitch values with `set gyro_debug_axis = pitch`. If set to Pitch, the log will contain North-South (latitude) PIDs. When set to Roll, East-West (longitude) earth frame axis values will be logged.

| Channel | Notes                                                     |
| ------- | --------------------------------------------------------- |
| 0       | absolute distance from target, cm                         |
| 1       | distance from target in selected earth frame axis         |
| 2       | pidSum in selected earth frame axis, units in degrees\*10 |
| 3       | Pitch or Roll Angle requested in degrees \* 10            |
| 4       | P for selected earth frame axis in degrees\*10            |
| 5       | I for selected earth frame axis in degrees\*10            |
| 6       | D for selected earth frame axis in degrees\*10            |
| 7       | A for selected earth frame axis in degrees\*10            |

Notes:

- There are separate PID controllers for North-South and East-West movements of the quad.
- A means 'Acceleration', or change in velocity of the quad
- the raw GPS information will also be in the log, as usual, eg GPS Speed, Sat count, etc.

### How does Position Hold work?

When initiated, the target location is set to the current GPS location. Each time the GPS updates the position of the quad, the 'error' distance from the target is calculated in both North-South (latitude) and East-West (longitude) directions, accurate to the nearest cm. We apply a PIDA controller independently to the error in each direction. For each of the two earth frame axes, the P factor responds to the magnitude of that error, the D and A factors oppose velocity and velocity change, and the I factor responds to an accumulated error over time, such as an offset from steady wind; from these we get a latitude and a longitude pidSum value.

These pidSums are converted to a single vector pointing in the direction needed to return the quad to the target point. The quad needs to tilt in that direction to correct the current deviation from the target. To figure out how to tilt the craft, the code gets the heading angle of nose of the quad in degrees from North, and compares that angle to the required correction angle, also from North, in the Earth Frame of reference. Appropriate Pitch and Roll corrections can then be made. If the pilot yaws the quad, we update the pitch and roll axes as required. If, for example, a quad is pitching forward hard into a headwind, then when yawed 90 degrees, all the pitch angle is transferred seamlessly to roll.

When the sticks are outside deadband, control is passed to the normal Angle Mode controller, and the pilot flies completely in Angle Mode, which feels pretty good. The location, velocity and acceleration values are checked while you fly around. When the sticks return inside deadband, Position Hold is restored with a temporary target at that point, in a special 'stopping' phase, with greater D than normal. The PIDs then actively stop the movement. When the quad finally comes to a stop, we re-set the location at the stop point for that axis, and the quad stays there.

draft v1

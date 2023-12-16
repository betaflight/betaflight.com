# Acro Trainer

Adds a new angle limiting mode for pilots who are learning to fly in acro mode. Primarily targeted at new LOS acro pilots, but can be used with FPV as well.

The feature is activated with a new mode named "ACRO TRAINER". When the feature is active, the craft will fly in normal acro mode but will limit roll/pitch axes so that they don't exceed the configured angle limit. New pilots can start with a small angle limit and progressively increase as their skills improve.

**The accelerometer must be enabled for the feature to be configured and function.**

Also the feature will only be active while in acro flight and will disable if ANGLE or HORIZON modes are selected.

For most users all they need to do is simply configure the new mode to be active as desired on the "Modes" tab in the configurator and configure the desired angle limit in the cli.

Configuration parameters:

`acro_trainer_angle_limit`: (range 10-80) Angle limit in degrees.

`acro_trainer_lookahead_ms`: (range 10-200) Time in milliseconds that the logic will "look ahead" to help minimize overshoot and bounce-back if the limit is approached at high gyro rates. The default value of 50 should be good for most users. For low powered or unresponsive craft (micros or brushed) it may be helpful to increase this setting if you're seeing substantial overshoot.

`acro_trainer_debug_axis`: (ROLL, PITCH) The axis that will log information if debugging is active.

`acro_trainer_gain`: (range 25-255) The angle limiting strength. Higher numbers can reduce overshoot, but can also lead to oscillation around the angle limit. The default value of 75 seems to work well for most situations.

To enable debugging:
`set debug_mode = ACRO_TRAINER`

- debug(0) - Current angle
- debug(1) - The internal logic state
- debug(2) - Modified setpoint
- debug(3) - Projected angle based gyro rate and look-ahead period

Note that there are no changes to the functioning or calculations in the PID controller. This feature simply intercepts the pilot input on the roll and pitch axes and adjusts to prevent exceeding the configured angle limit.

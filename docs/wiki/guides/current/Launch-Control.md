# Launch Control

## Description

Adds a race start assistance system that allows the pilot to pitch forward and then release the sticks with the quad holding position for the race start. Available starting with Betaflight 4.0.

## Safety

While the quad is actively in Launch Control it may appear to be docile and safe. In reality it's anything but. You should treat it as if it's a powerful beast ready to leap ferociously at any point. Never take your hands off the controls and be prepared to disarm. Never stand close or allow others to. Follow all normal safety considerations.

## Launch procedure:

- Launch Control mode switch is enabled
- Arm
- Leave throttle at minimum
- Pitch quad forward to desired angle
- Recenter sticks
- Advance throttle to launch

Example video: https://youtu.be/_S0rn3zcN0Q

## Mode switch configuration:

For Launch Control to be enabled the mode must be configured. The state of the mode is captured at arming so the pilot has multiple options on how he wishes to set it up. Options include a dedicated switch, a momentary toggle held when arming, tied directly to the arming switch, or even always active.

## Parameters:

**`launch_control_mode`**: Allows `NORMAL` (default), `PITCHONLY`, and `FULL`.

- `NORMAL`: designed for launching off the ground balanced on a bottom-mount battery. Roll and pitch will hold position. Yaw control is available but the PID controller will not attempt to hold yaw position.
- `PITCHONLY`: for use with race launch stands or possibly off the ground with top-mount batteries. Disables roll and yaw completely. Also the front motors are kept at idle to minimize chances of falling off the stand. Do not use this mode if trying to balance off a battery as the quad will fall forward since the front motors will not react.
- `FULL`: Like `NORMAL` but adds position holding for yaw as well. Use care with this option as yaw tends to windup if left too long.

**`launch_trigger_allow_reset`**: Allows `OFF` and `ON` (default).

Determines the launch triggering reset behavior. After a launch is triggered we want to disable the feature so that if the pilot crashes and then re-arms Launch Control will not be active.

- `ON`: Allows the pilot to reset the Launch Control trigger by turning the mode switch off and back on again while disarmed. Use this method if you've configured your mode switch in such a way that you can optionally enable it.
- `OFF`: Launch Control cannot be reset and will be disabled until a power cycle or flight controller reboot. This method should be used if you can't independently disable the mode like if it's enabled all the time or tied to the arming switch.

As long as the launch has not been triggered the pilot can arm/disarm multiple times and the feature will still be available. So if the quad was to fall off the blocks for example the pilot can reposition and simply re-arm.

**`launch_trigger_throttle_percent`**: Allows 0 - 90 (default 20).

Adds a throttle deadband below which Launch Control will be active. The launch will be triggered once throttle exceeds the configured percent. Higher values provide a more aggressive launch as the throttle will "jump" to the configured percentage. Setting to 0 will cause the trigger to be `min_check`. The default value of 20 provides a good initial deadband to prevent accidental triggering while still providing a good "jump" off the blocks. Be careful with higher values as the quad can be quite aggressive when launching.

**`launch_control_gain`**: Allows 0 - 200 (default 40).

Determines the Iterm gain used to hold position. If the quad has difficulty holding position then increase this value. Be careful with high values as windup can occur. If you hear the motors continuing to speed up while position is being held then the gain is likely too high. Basically you want to use the lowest value that works acceptably. While raised up in the launch position it's normal for the quad to move around a little. In this position it's very susceptible to wind in particular. Normally a little motion won't be a problem and it's not necessary to try to tune this with increased gain.

## Accelerometer Integration

If the accelerometer is enabled then additional feedback will be presented in the OSD that indicates the current pitch angle. The pilot can use this to fine tune their launch angle for consistency.

**`launch_angle_limit`**: Allows 0 - 80 (default 0)

Allows the pilot to optionally set an angle limit that will limit the forward pitch. Provides an assist to help the pilot attain a consistent launch angle. It is simply a limit that prevents any more forward pitch when reached. The quad will not actively or automatically go to this angle. Pilot can still adjust the angle lower if desired. Setting to 0 disables the limit.

## OSD Integration

If the warnings element is enabled then when Launch Control is active a `LAUNCH` indicator will be displayed. Also make sure that the Launch Control warning option is enabled (`osd_warn_launch_control = ON`). Additionally if the accelerometer is enabled the current pitch angle will be appended like `LAUNCH 25`.

**Added in 4.2:** The OSD warning will start to blink when the throttle gets within 10% of the trigger percentage. Provides a visual indication that the throttle is close to triggering a launch.

All of the Launch Control parameters can be adjusted in the OSD menus. They're under PROFILE -> MISC PP -> LAUNCH CONTROL.

## NOTES

Launch Control will not activate if any of the following are true:

- Arming while in a flight mode other than acro
- MOTOR_STOP is enabled and the motors are not spinning when armed (airmode is off)
- 3D feature is enabled
- Using stick arming

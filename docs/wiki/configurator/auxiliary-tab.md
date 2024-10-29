---
sidebar_position: 9
---

# Modes Tab

Modes are used to enable or disable features and trigger FC actions using AUX channels switches. Modes are enabled
when Ranges or Links are active.

| Setting | Description                                                                                                                                                    |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ranges  | Activate when the receiver channel matches the specified input values. A receiver channel that gives a reading between a range min/max will activate the mode. |
| Links   | Activate when another linked Mode is active.                                                                                                                   |

Multiple Ranges, Links can be matched, combined using boolean AND or OR operators to combine activation conditions for a Mode.

### Mode Types

| Option                   | Description                                                                                                                                              |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ARM                      | Enables motor output and allows the craft to fly.                                                                                                        |
| ANGLE                    | Flight mode that remains level using the accelerometer; stick input affects the angle of the craft.                                                      |
| HORIZON                  | Flight mode that remains level using the accelerometer; stick input affects angle, but at extremes, the craft will flip upside down and back to level.   |
| ANTI GRAVITY             | Increases P and I terms during fast throttle movements to improve stick tracking and avoid nose drift.                                                   |
| MAG                      | Activates heading lock via the magnetometer (compass).                                                                                                   |
| HEADFREE                 | Flight mode where yaw is aligned with an external reference (often where the pilot is facing); designed for beginners but rarely used—advise ANGLE mode. |
| HEADADJ                  | Sets a new yaw origin for HEADFREE mode.                                                                                                                 |
| CAMSTAB                  | Engages servo(s) to respond to the craft's movements and auto-level a gimbal for camera stabilization.                                                   |
| PASSTHRU                 | Skips PID loop and passes roll, yaw, and pitch directly to servos for airplane mixer.                                                                    |
| BEEPER                   | Activates the beeper (dshot motor beeper if not armed) or external buzzer; useful for locating crashed craft.                                            |
| LEDLOW                   | Turns LED strip off.                                                                                                                                     |
| CALIB                    | Calibrates roll/pitch offsets for the accelerometer in-flight; recommended to do this on the bench before flying.                                        |
| OSD                      | Enables/disables the OSD overlay feature.                                                                                                                |
| TELEMETRY                | Enables/disables the sending of FC telemetry to the control link receiver or other output port.                                                          |
| SERVO1                   | Enables/disables the first servo output.                                                                                                                 |
| SERVO2                   | Enables/disables the second servo output.                                                                                                                |
| SERVO3                   | Enables/disables the third servo output.                                                                                                                 |
| BLACKBOX                 | Enables/disables blackbox log recording; useful to log only required data when storage is limited.                                                       |
| FAILSAFE                 | Replicates a control-link failure event to allow for thorough testing of GPS Return To Home.                                                             |
| AIRMODE                  | Enables/disables air mode, which allows full PID correction at zero throttle to maintain authority.                                                      |
| 3D                       | Enables reversible motor direction for negative thrust, allowing inverted flight; throttle range becomes -100 to +100 instead of 0 to 100.               |
| FPV ANGLE MIX            | Flight mode that applies yaw rotation relative to the angle of the camera; designed for beginners but generally not recommended.                         |
| BLACKBOX_ERASE           | Clears all data from the blackbox flash/microSD storage device.                                                                                          |
| CAMERA CONTROL 1         | Custom action to configure a Runcam-compatible camera device; used to control some Runcam/Caddx HD recorders.                                            |
| CAMERA CONTROL 2         | Custom action to configure a Runcam-compatible camera device; used to control some Runcam/Caddx HD recorders.                                            |
| CAMERA CONTROL 3         | Custom action to configure a Runcam-compatible camera device; used to control some Runcam/Caddx HD recorders.                                            |
| FLIP OVER AFTER CRASH    | Activates Turtle Mode where the quad spins props on one side only in reverse to flip over if crashed upside down; DShot required.                        |
| BOXPREARM                | If enabled, provides a 2-stage arming method; PREARM switch must be activated before ARM for additional safety.                                          |
| BEEP GPS SATELLITE COUNT | Indicates the number of locked GPS satellites by beeping this number of times.                                                                           |
| VTX PIT MODE             | Enables low-power output mode on VTX to prevent interference with pilots in the air; requires VTX support.                                               |
| USER1                    | User-defined switch 1; controls arbitrary output via PINIO.                                                                                              |
| USER2                    | User-defined switch 2; controls arbitrary output via PINIO.                                                                                              |
| USER3                    | User-defined switch 3; controls arbitrary output via PINIO.                                                                                              |
| PID AUDIO                | Enables output of PID controller state as audio.                                                                                                         |
| PARALYZE                 | Permanently disables a downed craft until it is power cycled.                                                                                            |
| GPS RESCUE               | Enables GPS Return To Home to autonomously return the craft to the home point and land.                                                                  |
| ACRO TRAINER             | Flight mode that limits craft angle when flying in acro mode.                                                                                            |
| DISABLE VTX CONTROL      | Disables control of the VTX settings through the OSD.                                                                                                    |
| LAUNCH CONTROL           | Race assistance start system; spins motors and tilts craft forward to the desired angle without taking off.                                              |
| MSP OVERRIDE             | Enables MSP Override mode.                                                                                                                               |
| STICK COMMANDS DISABLE   | Disables/enables stick commands.                                                                                                                         |
| BEEPER MUTE              | Disables/enables beeper, including warning, status, and beeper mode.                                                                                     |
| READY                    | Shows 'READY' in the OSD using a switch.                                                                                                                 |
| LAP TIMER RESET          | Resets the lap timer.                                                                                                                                    |

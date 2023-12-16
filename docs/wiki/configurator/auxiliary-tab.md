---
sidebar_position: 9
---

# Modes Tab

Modes are used to enable or disable features and trigger FC actions using AUX channels switches. Modes are enabled
when Ranges or Links are active.

- **Ranges** - activate when the receiver channel matches the specified input values.

- **Links** - activate when another linked Mode is active.

Multiple Ranges, Links can be matched, combined using boolean AND or OR operators to combine activation conditions for a Mode.

### Mode Types

- **ARM** enables motor output and allows the craft to fly

- **ANGLE** flight mode which remains level using accelerometer. Stick input affects the angle of the craft

- **HORIZON** flight mode which remains level using accelerometer. Stick input affects the angle of the craft but at extremes of pitch and roll the craft will flip upside down and then back to level

- **ANTI GRAVITY** flight mode increases P and I term during fast throttle movements to improve stick tracking and avoid nose drift

- **MAG** activates heading lock via magnetometer (compass)

- **HEADFREE** flight mode where yaw is aligned with an external frame of reference (often where the pilot is facing) instead of the craft's. Designed for beginners but rarely used, advise ANGLE mode

- **HEADADJ** set a new yaw origin for HEADFREE mode

- **CAMSTAB** engages servo(s) to respond to the craft's movements and auto-level a gimbal for camera stabilisation

- **PASSTHRU** skip PID loop and pass roll, yaw and pitch directly to servos for airplane mixer

- **BEEPER** activates the beeper, either dshot motor beeper (if not armed) or external buzzer and flashing OSD beeper element. Useful for locating crashed craft

- **LEDLOW** turn LED strip off

- **CALIB** calibrates roll/pitch offsets for the accelerometer in-flight. An older mode and it is instead recommended to do this on the bench before flying

- **OSD** enable/disable the OSD overlay feature

- **TELEMETRY** enable/disable the sending of FC telemetry to the control link receiver or other output port

- **SERVO1** enable/disable the first servo output

- **SERVO2** enable/disable the second servo output

- **SERVO3** enable/disable the third servo output

- **BLACKBOX** enable/disable blackbox log recording. Useful to log only required data when blackbox storage is limited

- **FAILSAFE** replicates a control-link failure event to allow for thorough testing of GPS Return To Home

- **AIRMODE** enable/disable the air mode feature which enables full PID correction at zero throttle to maintain authority. See tuning notes for more details

- **3D** enables reversible motor direction to provide negative thrust and allow inverted flight. Throttle becomes -100 to +100 instead of 0 to 100

- **FPV ANGLE MIX** flight mode that applies yaw rotation relative to the angle of the camera instead of the angle of the flight controller. Designed to allow beginners to turn without inadvertent rolling. Generally not recommended

- **BLACKBOX_ERASE** clears all data from the blackbox flash/microSD storage device

- **CAMERA CONTROL 1** custom action to configure a Runcam compatible camera device. Used to control some Runcam/Caddx HD recorders

- **CAMERA CONTROL 2** custom action to configure a Runcam compatible camera device. Used to control some Runcam/Caddx HD recorders

- **CAMERA CONTROL 3** custom action to configure a Runcam compatible camera device. Used to control some Runcam/Caddx HD recorders

- **FLIP OVER AFTER CRASH** activates Turtle Mode where the quad will spin props on one side only in reverse to flip over if crashed upside down. Dshot required

- **BOXPREARM** if enabled provides a 2-stage arming method. PREARM switch must be activated before ARM can be used for additional safety

- **BEEP GPS SATELLITE COUNT** indicates the number of locked GPS satellites by beeping this number of times

- **VTX PIT MODE** enables low-power output mode on VTX to prevent interfering with pilots in the air. Requires VTX support

- **USER1** User defined switch 1. Controls arbitrary output via PINIO

- **USER2** User defined switch 2. Controls arbitrary output via PINIO

- **USER3** User defined switch 3. Controls arbitrary output via PINIO

- **PID AUDIO** enable output of PID controller state as audio

- **PARALYZE** permanently disable a downed craft until it is power cycled

- **GPS RESCUE** enable GPS Return To Home to autonomously return the craft to the home point and land

- **ACRO TRAINER** flight mode which limits craft angle when flying in acro mode

- **DISABLE VTX CONTROL** disable control of the VTX settings through the OSD

- **LAUNCH CONTROL** race assistance start system. Spins motors and tilts craft forward to the desired angle without taking off

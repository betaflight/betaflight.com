# 3D Setup

This page is under construction and will be used to outline how to set up 3D mode on a multirotor and should list out the important and easily missed steps in order to avoid incidents.

**For DShot specific information see the bottom section.**

I have taken my information from this post by Hwurzburg: https://github.com/cleanflight/cleanflight/issues/1032
As well as this pull request containing the same information: https://github.com/cleanflight/cleanflight/pull/1034

**Step one:**
Acquire multirotor and fit ESCs with reversing/bi-directional capability.

**Step two:**
Read the required information and setup, understand what is happening and test/prove everything on the bench BEFORE INSTALLING PROPS. There is twice as much potential for a user setup error to occur in 3D mode and cause an incident.

**Step three:**
Practice practice practice and more importantly, have fun!

## **Required information:**

When FEATURE 3D is enabled, either by the configuration GUI or CLI command, it allows operation with bi-directional ESCs to provide inverted as well as normal, upright operation by allowing bi-directional operation of the motors to produce positive or negative thrust. You may need to set the proper rotation for each motor by wiring order for the motor, check the ESC manual to confirm.

Full power negative will be at low stick and full power positive will be at full high stick. Center stick will be zero throttle.

Switch arming is a must for 3D flight and can be set up in the Mode tab of the configuration GUI, motor_stop and stick arming do NOT work in 3D mode for obvious reasons.

Arming will only occur when the throttle stick is centered (+/- 3d_deadband_throttle) and the arming switch is active. The motors will immediately spin at 3d_deadband_low or \_high, depending on throttle position above or below mid_rc.

De-activating the arming switch will stop the motors immediately independent of throttle stick position providing disarm_kill_switch is enabled. disarm_kill_switch is enabled by default. (This needs to be tested to confirm it causes disarm when entering mid_rc +- 3d_deadband_throttle.

3D props are highly recommended to get reasonable and equal power inverted or upright.

ONESHOT option works in this mode, transparently if the ESC supports it.

## **Setup:**

**Enable FEATURE 3D in the firmware:**

This can be done via the checkbox on the config page of the configurator or via the CLI.

**Setup ESC to BIDIRECTIONAL MODE:**

Consult your ESC manual for how to enable bi-directional mode on your ESC.

**Set both max_throttle and min_command before calibrating the ESC.**

- **BL Heli ESC:**

(norm/reverse/birectional slider in BLHeli GUI) and set max pwm in the ESC GUI to the maximum your transmitter outputs on the throttle channel (normally 2000us) and min pwm to the minimum (normally 1000us) and the midpoint to halfway between (normally 1500us). The ESC will not output to the motors if its input is at the midpoint +/- a small deadband.

- **Kiss 24A ESC:**

To teach the transmitter path (throttle path) the ESC / controller must be connected to a receiver

or FC, set the throttle signal at full throttle (peak throttle).Connect the LiPo to the ESC / controller.
A beep indicates the confirmation that the programming mode is activated. Now reduce the throttle
signal to minimum (normally 1000μs,), and wait for the restart of the speed controller (audible
signal high-low-high). The throttle pas is now programmed and the ESC/controller is ready for use.
Caution: The loads, that arise for the ESC in the 3D mode, are up to 3 times higher!

3D mode: After the throttle travel has been programmed as described, the 3D mode can be activated

as follows: Disconnect the power supply, put the transmitter signal at full throttle, connect power
again, wait for beep. Adjusting the throttle to the middle position (half throttle path) and wait for
restart of the ECS/ speed controller (signal: high-low-high). The 3D mode is now active. Important!
speed controller now s tarts only at the throttle center position. Deactivation: Teach new master
travel.

- **Simon K ESC:**
  Unlike BLHeli, SimonK firmware must be compiled specifically to support 3D mode.

To program a SimonK ESC to support 3D mode, one must edit the appropriate firmware configuration file to enable the following feature :

RC_PULS_REVERSE = 1

It is also recommended to disable stick calibration, as there is no way to reconfigure the mid_point at runtime.

RC_CALIBRATION = 0

By default, SimonK sets the neutral throttle point (MID_RC_PULS) to halfway between minimum (STOP_RC_PULS, set to 1060), and maximum, (FULL_RC_PULSE, set to 1860) - so a value of 1460. You can change these values as you desire, but these defaults work well.

MID_RC_PULS = = (STOP_RC_PULS + FULL_RC_PULS) / 2

The most common way to configure, compile, and flash SimonK esc's is using the KKFlash tool or the Chrome App "RapidFlash". Both remove the complexity of building a compile environment for the Atmel MCU on the ESC. The RapidFlash tool is a bit easier to use than the KKFLash tool.

**Setup the following parameters in the CLI:**

**3d_deadband_high:** This is the lowest value for positive throttle output from the flight controller to the ESC when armed, the highest value for positive throttle output from the flight controller to the ESC when armed is max_throttle. The range between 3d_deadband_high and max_throttle is the total positive throttle output range.

**3d_deadband_low:** This is the lowest value for negative throttle output from the flight controller to the ESC when armed, the highest value for negative throttle output from the flight controller to the ESC when armed is min_command. The range between 3d_deadband_low and min_command is the total negative throttle output range.

**NOTE:** To find values for 3d_deadband_high and 3d_deadband_low the motors tab in the configurator can be used to find the value closest to mid_rc which spins all motors consistently in each direction. These numbers should be fairly evenly spaced from mid_rc and should be set as close to mid_rc as possible with mid_rc being centered between the values for 3d_deadband_high and 3d_deadband_low in order to rotate the motors at identical speed in either direction while the throttle is centered.

**3d_neutral:** This is the output value from the flight controller to the ESC when disarmed. This is similar to how min_command works in normal mode, but for 3d operation. Unless you have a specific reason not to, failsafe_throttle should also be set to the same value as 3d_neutral.

**failsafe_throttle:** This is the output value from the flight controller to the ESC once the failsafe conditions have been met. This should be set to the same value as 3d_neutral to cause the ESC to stop the motors under failsafe conditions.

**3d_deadband_throttle:** This is the throttle stick range around mid_rc which allows arming to occur, within this deadband the flight controller will output either 3d_deadband_high or 3d_deadband_low to the ESC. The value output (3d_deadband_high or 3d_deadband_low) is dependent on whether the throttle stick entered the deadband from a higher or lower value than mid_rc.

**max_throttle:** This is the maximum value the flight controller will output to the ESC. ESC calibration should be performed after changing max_throttle.

**min_command:** This is the minimum value the flight controller will output to the ESC. ESC calibration should be performed after changing min_command.

### DShot Section:

Currently DShot is working with 3D and according to Boris B still requires some serious flight testing as of 01-01-2017. Updates will be here as we get a greater understanding of 3D with DShot.

DShot is definitely different with regards to behavior in the configurator, I'm not sure if the calibration process is still required e.t.c. but for now I'm setting up as before and then doing DShot specific tasks on top of the original setup. (30-04-2017EDIT: It has come to my attention that calibration is not required being that DShot is a digital signal, I should have realized this earlier, Teracis)

Be aware that when using DShot and having 3D mode activated in the configurator if you go to the motor tab and then un-check the "I understand the risks..." box the configurator will tell the FC to send 1500us (the equivalent digital signal) to the ESCs which will spin the motors forward whilst running the DShot protocol. **As always, props off on the bench!**

Some flight testing with Kiss 24A ESCs using Build #861 on a CC3D Revo F4 has been completed and no issues regarding flight performance were found as of 05-01-2017.

30-04-2017:
Additional information for BLHeli*S is that there's currently an issue where the motors \_may* spin a different way using DShot to using oneshot/pwm and therefore motor direction MUST be checked when switching to DShot with 3D, you may need to set some motors to Bi-Directional and others to Bi-Directional reverse.

DShot has an inverted lower section when compared to standard 3D. This means that full negative thrust in DShot3D is 1499 and minimum negative thrust is 1000 (as opposed to standard/oneshot 3D where full negative thrust would be 1000 and minimum would be 1499). Positive thrust has it's minimum at 1501 and maximum at 2000 _Positive values are a guess, needs confirmation_ You will notice this in the configurator.

Idle Percent is used for idle speed in BOTH directions.

TODO: Clean up this whole section and add more thorough DShot information.

## ESC Tuning:

### BL Heli_S Tuning

**For ALL tests, safety glasses on (props will be on for step 4 onward), quad held in hand or locked in vice and pointed away from everything, Airmode DISABLED, monitor motor temperature. Take notes for each test to compare.**

1. Get all motors spinning in correct directions and 3D mode enabled on FC with default BL Heli_S settings other than direction.
2. Set idle values to not stall in either direction when touched lightly, this is the same process for 2D setups but needs to be done in BOTH directions for 3D.
3. Enable brake on stop.
4. Fit props and safety equipment. Use props intended for flight, or heaviest props intended for flight.
5. Disable Airmode or any similar function.
6. Change motor timing and test which has the smoothest direction changing. This can be subtle and it's worth testing all options (Low, Med/Low, Med, Med/High, High) confirm the final selection by going back and forwards between the other options and the selected best.
7. Change startup power to determine the smoothest direction changing. This can also be subtle, however initial testing has indicated that higher startup power has been the smoothest and quickest to recover from a desync.
8. Check the idle values again, lift these if direction changing is still problematic.
9. Tune PID values (if not already complete) and test hover to confirm no motor heating issues.
10. Test fly and confirm motor direction changes are satisfactory, if not, start at step 4 again, potentially with lighter props.

If a single motor is lagging severely, consider swapping motors around to see if the problem follows the motor (motor issue) or stays on that arm (esc issue) or even swapping the motor bells around or the entire motor for a spare.

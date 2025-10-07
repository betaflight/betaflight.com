# GPS Rescue 4.4

Betaflight 4.4 brings huge improvements in the altitude, velocity, flightpath accuracy and landing behavior of the GPS Rescue code. The Sanity Checks that monitor the status of the Rescue are less likely to disarm the quad or falsely declare a failure of the rescue.

## About GPS Rescue

GPS Rescue is an advanced safety feature that can autonomously fly the craft home, after loss of the RC or video link, until it is close enough to re-gain control. It can also land and disarm with reasonable precision.

When activated, the craft should, sequentially:

- enable level mode and climb to a user-configured altitude, at a configurable rate,
- rotate at 180 deg/s until pointing towards home,
- pitch forward and fly towards home at a user-configurable speed (note: the nose of the quad will jump up and down in pitch during the rescue in order to keep the forward speed accurately controlled),
- correct the attitude of the quad to keep it pointing to home if it drifts off-course due to wind, and will mix in some roll to minimise lateral drift
- when at a user-defined distance from home, start to descend at a configurable rate,
- reduce forward velocity as it approaches home, and reduce descent rate as it approaches ground
- enable impact detection when below the set landing altitude
- automatically disarm on touching down

Typical applications include

- flying back until a lost radio link is restored (requires failsafe stage 2 to be set to GPS Rescue for automatic activation)
- climbing and flying back until a lost FPV video link is restored (requires manual switch activation by the pilot)
- a 'panic' switch for LOS pilots who lose orientation (requires manual switch activation by the pilot)

## Important:

:::danger

Only use the 10.9 Configurator GUI. For earlier Configurator versions, only make changes to GPS Rescue parameters in the CLI!

Test GPS Rescue very carefully before relying on it. Initial testing should be done at close range, with defaults, over soft grass.

If a switch-induced Rescue test has a problem, or seems to do nothing, DO NOT DISARM IN PANIC! Undo the Rescue switch promptly and you'll get full control back.

Even if you do everything right, GPS Rescue may not bring the craft home!

Do NOT enable a compass/mag unless you have confirmed by logging that it correctly represents the attitude of the quad - mostly they DO NOT.

Level mode must provide a stable hover, after careful acc trimming. The throttle value required for a stable hover should be set as the GPS Rescue Hover throttle value, and a slightly higher value must be set as the Stage 1 failsafe Throttle channel value..

3D mode is not supported! There will be no rescue if the quad is in 3D mode at the time of the failsafe.

:::

**Remember: During a real failsafe, the sticks MUST be wobbled by more than 30%, after the link is restored (and after FPV video is restored), to regain control over the quad.** Otherwise it will fly all the way home and land. Stick wobbling is not required during a switch induced rescue; control is immediately returned once the switch is reset.

## Known issues

- **Heading** may be wrong, right at the start. Check the arrow in the OSD! Sometimes it takes several seconds to point directly to home. Do not immediately yaw heavily or rotate the quad a great deal on arming or immediately after takeoff. Be 100% sure you have a valid Home Point before takeoff. Do a clean, straight, medium speed forward flight directly away from home, soon after takeoff. This helps the IMU correctly determine the heading of the quad from the GPS data, and lets you that the Home Arrow is pointing the right way.
- **Do not enable the Compass** _unless_ it has been properly calibrated and the data confirmed, by logging, to be useful and accurate.
- **Use UBlox**. GPS units configured to use NMEA often update only once per second, or even slower. This makes GPS Rescue very jerky, and almost unusable. It's better to use UBlox, which by default return data regularly at 5 times a second.
- **SBAS** mode may cause problems with reliable GPS data, and may not function in some regions; if so, try setting SBAS mode off.
- **Steps** in flight are normal, and due to the large time intervals between GPS data points.

## Hardware requirements

- A properly trimmed accelerometer

- A working GPS module. Modern UBlox units work well. Check that they support UBlox, 10hz updates, and that they have a backup battery, so that it will regain satellites during repeated power cycles much more quickly.
- `set GPS_PROVIDER = GPS_UBLOX` enables `UBLOX` mode. This is recommended and is now the default.
- if the GPS doesn't support `UBLOX`, try `NMEA`. Some, but not all, NMEA-only units will provide 10Hz data updates, and can work really well. NMEA at 1Hz makes it very difficult for the quad to fly home; it will jerk and jump every second, with very erratic rescue flight behavior.
- test the accuracy of your GPS by watching it in Configurator while stable on a desk outdoors. Zoom in on the map and see how the position moves around, especially if the quad is put on an angle and some satellites are lost. Note that altitude estimation is quite unstable. It can take a long time for the GPS to really settle down.

- If a Baro is present, enabling it will improve IMU altitude estimations significantly. We recommend enabling Baro by default, especially for short flights (eg up to 10-15min). Usually this results in better altitude control and more reliable landings. Check the Baro data in the sensors tab after enabling the `ALTITUDE` debug. It should be reasonably smooth after arming. Whether or not Baro is helpful is readily seen by doing some LOS rescues at low altitude over flat ground. For longer flights, and some Baro hardware, Baro drift can be more of a problem than GPS drift. Hence do some testing with it on or off and then set your Baro trust value appropriately for the kind of flying you intend to do.

- If a Compass (mag, or magnetometer) is available, and if it has been properly calibrated, and the data is noise free, it may improve heading estimation. Compasses must be positioned well away from magnetic fields, including those from current flowing through wires. This is very difficult even on a 7" setup. Using an incorrectly calibrated or noisy compass will adversely affect the rescue. Be sure to log your compass data and check that it is accurate and clean before enabling it. In most 5" or smaller drones, Mag is too noisy to be useful.

## GPS hardware

This table lists GPS modules that we have first hand experience with.  
We recommend getting one that works with UBlox at 10hz and has hot start capability.
A magnetometer is useful only if the GPS unit can be mounted well away from any other electronics.

| Module              | UBlox | 10hz | Hot Start | Mag      | Notes                                                                       |
| ------------------- | ----- | ---- | --------- | -------- | --------------------------------------------------------------------------- |
| Matek SAM-M8Q       | yes   | yes  | yes       | No       | works well                                                                  |
| Matek M8Q-5883      | yes   | yes  | yes       | QMC5883L | works well, mag noisy unless placed carefully                               |
| iFlight M8Q-5883 V2 | yes   | yes  | yes       | QMC5883L | works well, minor spikes in GPS position, mag noisy unless placed carefully |

## Software settings

The defaults should be good for initial tests, but there are some important things to set that depend on your quad and how it behaves:

- Calibrate your accelerometer so the quad hovers level
- Set the Stage 1 Failsafe fallback throttle value (the value on the throttle channel) to a value that will make the quad climb steadily. This is the value that will be applied when the quad initially loses signal. If it is too low, and you're flying over water, before the GPS Rescue code kicks in - one second after signal loss - you may descend enough to end up in the water
- Set the GPS Rescue throttle value to a value that is close to a hover. This is the initial value that gets applied once the rescue kicks in. The PIDs that control throttle will take over at this point, by adding or subtracting from this value. It should be a value that is close to the hover value.

Otherwise, read all the software settings below, and make sure they are suitable for what you want to do. Do not change anything a long way off defaults quickly; take your time.

## Ways to initiate a GPS Rescue

**1. RC Link Loss**

Here we want the quad to enter Stage 1 Failsafe for the Stage 1 duration, just for long enough to be sure the link really is lost, then enter Stage 2 failsafe, which should be set to GPS Rescue and fly home. Once the link is restored, control can be restored by wiggling the sticks more than 30 degrees out from center. WARNING: Do NOT wiggle the sticks until you've got an FPV video signal back, otherwise you may regain control but not know where you're going! Wait until your signal strength indicator is good and you have a decent FPV feed, **then** wiggle the sticks.

If the radio or FPV link never recover, let it fly home and it will land itself.

Basic necessities

- enable GPS, check its settings, check in Configurator that it shows correct position
- set Failsafe Stage 1 to manually enable level mode, and configure a manual throttle value that will make the quad climb steadily
- set GPS Rescue as the Failsafe Stage 2 mode, set the GPS hover throttle to a value that hovers or climbs a little, check all the GPS Rescue settings
- if you have a Baro, check it using the ALTITUDE debug (see debug info at the end), and enable it provided it works well and improves altitude control

**2. Stick-induced Failsafe emulation**

Here we want the quad to emulate a link loss. As soon as the switch is hit, the quad should enter Stage 1 and then Stage 2 failsafe.
To regain control, just undo the Failsafe Switch. DO NOT PANIC AND DISARM BY MISTAKE - just undo the failsafe switch!!!  
This is great for testing.

Basic setup:

- configure all settings as above
- configure a Mode switch to activate Failsafe
- test carefully

**3. Directly enter GPS Rescue with the GPS Rescue Mode switch**

Here we want the quad to immediately level out, climb and start to fly home - no waiting. It makes sense when used as an emergency 'safety return' switch, perhaps, in cases where you're long-ranging and lose FPV signal, or in Acro and lose control in the distance. Just hit the GPS Rescue Mode switch and it should level out, climb, and head back to home. Undo the switch, and you're immediately back in control.

This option does not require Failsafe to be enabled at all.

Basic setup:

- configure the GPS Rescue hover throttle value, and other GPS settings on the right side of the Failsafe panel
- don't worry about the other Failsafe settings (unless you want Failsafe on true signal loss to work, in which case, set them up as above)
- configure a Mode switch to activate GPS Rescue
- test carefully

## Important notes:

- **Do a LOT of GPS Rescue tests with switch initiation at close range over soft grass!** Then do them with true failsafe, by turning the radio off, and do these tests initially up close! Before doing radio-off tests, ensure that your radio link can re-establish itself if the radio is power-cycled when GPS Rescue is not enabled. Otherwise it can't re-establish when it needs to.

- **Remember to set the GPS Rescue Hover throttle value accurately!** The correct value makes the quad hover, or very slowly ascend, while in level mode with the heaviest battery you plan to use. The best value can be estimated by setting Failsafe Stage 1 to Level mode, and then set the throttle value to a value that gets it to climb while in stage 1. The GPS Hover value is the value that the quad will first apply to throttle on signal loss. If too low, it will tend to drop at that point; if too high, it will climb. It is better to 'err on the high side'; climbing too fast is usually less of a problem, than dropping like a stone, when you have signal loss.

- **Remember to set the Stage 1 throttle value manually to a hover value!** (See below). When entering a true RF loss failsafe, the quad will use the Stage 1 settings for throttle during the Stage 1 period while hoping to recover signal. If the Stage 1 throttle channel value is set to 'Auto' you will immediately fall from the sky. Set it to a hover value so that it won't do anything bad before starting the rescue.

- **Always ensure that level mode hovers flat and true before taking off**. If the quad drifts sideways during return, it's usually because the accelerometer has a roll offset.

- **When adding a GPS module and setting it up, it should always be checked functionally, outdoors, with a laptop and an internet connection.** You can visualise X-Y drift on the map in Configurator (zoom in) and altitude drift is shown numerically. Find out how long it takes to acquire the satellites, how many satellites are found at your location, and whether enabling Galileo with `set GPS_UBLOX_USE_GALILEO = ON` improves the number of satellites found or the quality of the position lock. Check how long it takes for the altitude reading to stabilise after the sat count stabilises.

- **Before takeoff, always ensure the GPS unit returns solid position readings**. At least 8 satellites are needed to arm. 10 is preferable, as seen in the OSD. Then wait another 30-60s before arming while watching altitude estimate. It should stabilise before takeoff. Do not rely on the blue light on the OSD. It will flash on a position lock, but that is not the same as having a home lock.

- **Ensure you have a Home Lock before takeoff, and that the Home Arrow points to Home!**. After arming, make sure the OSD shows the home icon, distance to home, and the home arrow points to home. Optionally, display the `osd_gps_sats_show_hdop` value in the OSD; if this gets close to, or below, 1.0, it's a good indicator of a solid fix (thanks @zzyzx).

- **At the start of a mission-critical flight, confirm normal GPS Rescue behavior a by doing a close-range test rescue with a switch**. Once you know that it turns and points to home, revert the test switch. You can enter and leave GPS Rescue with a switch with immediate effect anytime. This makes field checking easy.

- **Think carefully about the `GPS_SET_HOME_POINT_ONCE` option**. Resetting the home point on every new arm is OK for testing and normal use. Each time you arm, your home position is updated. The home position accuracy improves over time, so you're sure to get the best home position estimate when you finally do take off. The downside is that if you disarm during the flight, GPS rescue will take you back to that new arm point, not to home. If your craft disarms in a bad spot, even if you get signal back, it will never fly home. In contrast, if you choose to only set the home position once, at first arm, it's important to not arm until you are sure you have a solid home position estimate. Be patient when using the first arm only method.

- The **Stage 1 Failsafe configuration is very important**, The defaults are not suitable. Choose either:

- **Hold last values**: Configure stage 1 to hold all current channel values, including holding throttle, on signal loss. A transient dropout of less than Stage 1 duration will let the craft keep flying straight, or at whatever values it had just before the signal loss. For long-range cruising this keeps the flight smooth during brief dropouts. The pilot must monitor the Rx link in the OSD or they may not realize they getting dropouts.

- **Manually enable Level (Angle) mode, set throttle to climb a bit, and center the sticks**: Probably the safer option. This will provide the cleanest initiation of the Rescue process.

- NOTE: without a compass, the quad 'learns' the heading of the quad from the direction of travel over ground from data provided by the GPS. **The craft must be traveling at least 2m/s, in clean nose-forward flight, for at least several seconds, for its attitude to be correctly set by the GPS data.** Try to fly dead-straight and without side-wind, so that no roll correction is needed when the course over ground matches simple pitch-only flight-path of the quad. It's important fly straight and at least 2m/s before testing GPS Rescue at close range, or the IMU may be confused about the direction home. Check the Home Arrow before initiating the rescue. The default GPS_RESCUE_GROUND_SPEED value is 5m/s, and cannot be set under 2.5m/s, so that the quad will update the IMU heading during the rescue, even if the initial heading is incorrect, but may fly quite fast in the wrong direction beforehand. Hence it is really important to validate the Home Arrow early in the flight. The arrow in the OSD should be pointing to home, and the altitude and distance should be about right, soon after takeoff.

- **The GPS Rescue 'mode' switch will immediately initiate GPS Rescue when activated**. It doesn't use the failsafe system. This can be used as an 'emergency' rescue for loss of FPV signal or for disorientation when flying LOS. If a failsafe switch is configured, a similar outcome can be achieved by setting the switch mode to immediately action Stage 2. There will be only a short delay before the quad should level out and climb. In both cases, after hitting the switch, the quad's momentum will keep it moving as it was for at least a few seconds, so don't expect miracles.

- In strong winds the maximum allowed angle of the craft during a rescue, `GPS_RESCUE_ANGLE`, may need to be increased enough that the quad can make forward speed into a headwind. The craft may overshoot or land roughly if the wind is very strong, especially a strong tailwind.

- During a rescue, the built-in Betaflight Crash Detection code is automatically activated (even if you disabled it in your settings). If the quad has a hard crash or impact at any time on the way home, it may disarm immediately. This mechanism is quite different from the much more sensitive landing impact detection, which is only activated late in the Rescue once the altitude of the quad falls below the `GPS_RESCUE_LANDING_ALT` height.

## Phases of the Rescue

There are five "normal" phases in a Rescue: `ASCEND`,`ROTATE`, `FLY HOME`, `DESCEND`, `LAND`. They follow sequentially. Normally the phase is `IDLE`.

Each phase has different targets. Specific exit criteria must be met to enter the next phase.

`Sanity checks` monitor performance during each phase, and will disarm with prolonged failure.

| Phase      | Controlled axes      | Functionality                                                                | Termination                                   |
| ---------- | -------------------- | ---------------------------------------------------------------------------- | --------------------------------------------- |
| `ASCEND`   | Yaw and pitch        | Ascend or descend at set rate, yaw quickly to reduce heading error           | Fly home altitude attained                    |
| `ROTATE`   | All axes except roll | Continue to yaw to reduce heading error                                      | Heading to home error to less than 15 degrees |
| `FLY HOME` | All axes             | Fly home at set altitude and velocity, keep adjusting yaw                    | Within `GPS_RESCUE_DESCENT_DIST` of home      |
| `DESCEND`  | All axes             | Altitude and velocity reduced steadily, keep adjusting yaw                   | Altitude below `GPS_RESCUE_LANDING_ALT`       |
| `LAND`     | All axes except roll | Descend at set rate, with a zero forward velocity target, keep adjusting yaw | Impact with ground                            |

Notes:

- Sanity check failure or a bad crash during the rescue can also terminate a rescue
- Yaw control is active in all phases, starting during the `ASCEND` phase. Yaw tries to keep the nose pointing towards the home point relative to the current estimated position of the craft, using a simple P controller. The maximum rotation rate to control yaw/heading error is 90 deg/s.
- Throttle is adjusted either side of the set `GPS_RESCUE_THROTTLE_HOVER` value, within limits set by `GPS_RESCUE_THROTTLE_MIN` and `GPS_RESCUE_THROTTLE_MAX`, at all phases of the rescue, to control altitude using PID controller that includes an acceleration element. Throttle is dynamically adjusted according to the angle of the craft (the angle away from horizontal).
- Pitch angle controls forward velocity, and becomes active, at half max rate, during the `ASCEND` phase, is fully active once the error angle to home is less than 45 degrees in `ROTATE` phase, and stays fully active until `LANDING` phase, when it again is reduced to half rate.
- Roll is added to yaw only at lower yaw rates, and is essential to deal with heading drift due to wind. It is active only during `FLY HOME` and `DESCEND` phases.
- During `DESCEND` phase, the craft tries to stay on the edge of a cylinder that is 2m away from the estimated landing point. It will point towards home while attempting to stay 2m out. The 2m distance is intended to minimise the risk of overshooting home, which then requires a 180 degree turn. In windy situations the craft will typically descend on the down-wind side of the 2m cylinder, and may sit on an equilibrium point further than 2m out.
- During landing mode, the quad can rotate, and will pitch forward and backward to try to land 2m out from the home point. If the GPS has drifted, the final distance to home and direction to home indicate where the GPS thinks 'home' is at the time of landing.
- Auto-Disarm is triggered by the accelerometer spike associated with touch-down with the ground. The threshold is not user-adjustable. It is only active after the altitude falls below the `GPS_RESCUE_LANDING_ALT` value in `DESCEND` mode. If the altitude has drifted high, so that the craft hits the ground but the GPS thinks it is still high in the sky, it will not disarm on impact. If that happens, the landing sanity check should disarm the craft after about 10s (if the pilot has not done so).
- A `DO_NOTHING` phase, which is flat Level Mode with throttle 100 steps below the GPS Rescue hover throttle value, with a 20s limit, is applied in switch induced rescues that experience a fatal sanity check error, to give time for the pilot to reverse the switch rather than immediately disarming. Should a pilot notice a failure to follow the above sequence during a stick induced Rescue, they should immediately recover control, by reversing the switch, to avoid the disarm that will otherwise occur.

## Altitude control options

The `GPS_RESCUE_ALT_MODE` setting, in association with the `GPS_RESCUE_RETURN_ALT` and `GPS_RESCUE_INITIAL_CLIMB` values, determine the target altitude for the flight home, as follows:

| GPS_RESCUE_ALT_MODE | Notes                                                                                                                                                                                                                                               |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MAX_ALT`           | The default. Craft will climb to the highest altitude previously attained since arming, plus the `GPS_RESCUE_INITAL_CLIMB` height, in metres. Useful when the pilot climbs over the highest objects in the flight path before risking the failsafe. |
| `FIXED_ALT`         | Craft will return at the exact height above Home Point as configured by the `GPS_RESCUE_RETURN_ALT` value in metres. If flying low, around trees or buildings, `FIXED_ALT` can be set to a known height that will clear them.                       |
| `CURRENT_ALT`       | Craft will climb `GPS_RESCUE_INITAL_CLIMB` higher than the current altitude at the time the rescue starts. Useful for testing or for emergency 'panic' switch applications.                                                                         |

## Settings

| Item                                  | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GPS_RESCUE_MIN_START_DIST`           | The minimum distance from home required before a GPS Rescue can be initiated, in metres.                                                                                                                                                                                                                                                                                                                                                           |
| `GPS_RESCUE_ALT_MODE `                | The return altitude mode, which determines the altitude settings to use for the return flight.                                                                                                                                                                                                                                                                                                                                                     |
| `GPS_RESCUE_INITAL_CLIMB`             | The amount of height to climb, above either current or max altitude (as set by `GPS_RESCUE_ALT_MODE`), in metres.                                                                                                                                                                                                                                                                                                                                  |
| `GPS_RESCUE_ASCEND_RATE `             | Target climb rate in cm/s during the `ASCEND` phase. Can be increased to speed up the climb, if desired.                                                                                                                                                                                                                                                                                                                                           |
| `GPS_RESCUE_RETURN_ALT`               | When in `FIXED_ALT` mode, the altitude to return at, in metres above take-off altitude.                                                                                                                                                                                                                                                                                                                                                            |
| `GPS_RESCUE_GROUND_SPEED`             | The target velocity (in the direction of home) for the return flight, in cm/s.                                                                                                                                                                                                                                                                                                                                                                     |
| `GPS_RESCUE_PITCH_ANGLE_MAX`          | Maximum allowed pitch (and roll) angle, in degrees, during a rescue. May need to be increased above default value if the craft has difficulty maintaining forward velocity against strong winds.                                                                                                                                                                                                                                                   |
| `GPS_RESCUE_ROLL_MIX`                 | The relative amount of roll included when the quad yaws during the return flight. 100 means the normal amount, zero means none.                                                                                                                                                                                                                                                                                                                    |
| `GPS_RESCUE_DESCENT_DIST`             | The distance from home at which the craft starts to descend, in metres.                                                                                                                                                                                                                                                                                                                                                                            |
| `GPS_RESCUE_DESCEND_RATE `            | Target descend rate in cm/s during the `DESCEND` and `LANDING` phases. The descent rate at the start of the `DESCEND` phase can be up to twice this value, reducing to equal the set value by the time the craft is landing.                                                                                                                                                                                                                   |
| `GPS_RESCUE_LANDING_ALT`              | The altitude above take-off point when auto-disarming is activated during descent, in metres.                                                                                                                                                                                                                                                                                                                                                      |
| `GPS_RESCUE_THROTTLE_MIN`             | The lowest throttle value that can be applied by the GPS Rescue code. This usually does not require any modification.                                                                                                                                                                                                                                                                                                                              |
| `GPS_RESCUE_THROTTLE_MAX`             | The highest throttle value that can be applied by the GPS Rescue code. This is unlikely to need increasing unless the quad is very heavy.                                                                                                                                                                                                                                                                                                          |
| `GPS_RESCUE_THROTTLE_HOVER `          | **Important** The hover throttle value that approximates the value required during the fly home phase, or will result in a steady slow climb in level mode. This is the basic throttle value about which the throttle PIDs vary throttle (within limits). It is important to set this value correctly, to ensure that the craft climbs, rather than drops, right at the start of a rescue, and descends in 'DO NOTHING' mode.                      |
| `GPS_RESCUE_SANITY_CHECKS`            | Sets what happens if the Rescue fails. See the Sanity checks section                                                                                                                                                                                                                                                                                                                                                                               |
| `GPS_RESCUE_USE_MAG`                  | Use magnetometer (compass) data to improve heading accuracy. Do not enable this unless the mag is calibrated and a log shows high-quality noise free compass data.                                                                                                                                                                                                                                                                                 |
| `GPS_RESCUE_ALLOW_ARMING_WITHOUT_FIX` | Option that permits arming without a home fix (never do this, see below)                                                                                                                                                                                                                                                                                                                                                                           |
| `GPS_RESCUE_MIN_SATS`                 | Value 5 - 50. The number of satellites required, as well as a 3D fix, for the Home point to be set, and to permit arming when GPS Rescue is configured. Setting this to lower values risks poor GPS control. Default is 8 and with less than 5 we have no 3D fix and cannot control altitude from GPS alone. With a Baro this could be set to 5, since Baro can provide altitude with only a 2D GPS fix, but this possibility has not been tested. |
| `ALTITUDE_LPF`                        | The cutoff value in Hz \* 100 that will be used to smooth the altitude value                                                                                                                                                                                                                                                                                                                                                                       |
| `ALTITUDE_D_LPF`                      | The cutoff value in Hz \* 100 that will be used to smooth the altitude derivative (vertical velocity) value. This also smooths the Vario signal at present.                                                                                                                                                                                                                                                                                        |

## PID Tuning suggestions:

- `GPS_RESCUE_YAW_P` should be high enough that the quad rotates well enough at the chosen speed to track to home properly. If too high, the nose of the quad will wander left to right as you return. Default is pretty good.
- `GPS_RESCUE_ROLL_MIX` at 100 gives approximately the correct amount of roll to make 'co-ordinated' turns in level mode. A higher value increases the relative amount of roll:yaw and may be needed for higher speed returns. Zero means no roll at all. Use the debug `GPS_RESCUE_HEADING` to see the amount of yaw and roll applied, while comparing the attitude of the quad to the angle to home.
- Altitude PIDs (`GPS_RESCUE_THROTTLE_P`, `GPS_RESCUE_THROTTLE_I`, and `GPS_RESCUE_THROTTLE_D`) are best adjusted with a very low set groundspeed (eg 50 cm/s), the quad pointing to home when initiating GPS Return, and a relatively steep climb rate at the start. PIDs too high lead to vertical oscillations after the initial climb. D gives faster oscillations than P. Try to minimise them using classical PID control methods. There is a very big delay from pushing the motors to gaining altitude. The debug DEBUG_GPS_RESCUE_THROTTLE_PID will be most useful. It shows throttle P and D, with the measured altitude vs the altitude target.
- Velocity PIDs (`GPS_RESCUE_VELOCITY_P`, `GPS_RESCUE_VELOCITY_I`, and `GPS_RESCUE_VELOCITY_D`)are best adjusted after setting the altitude PIDs. They directly control the pitch angle of the quad. Too much P and/or D may cause slow oscillations on pitch. Too much I may cause overshoot. `DEBUG_GPS_RESCUE_VELOCITY` shows P and D with the speed to home and velocity targets. Tune these with zero I. Then add I until any residual over- or under- shoot is eliminated. Too much I will cause slow ongoing wobble.
- The defaults should be 'about right' for a typical 5" freestyle quad.
- The quad targets velocity in the direction of home. If it must fly into wind, the maximum angle (set by `GPS_RESCUE_ANGLE`), must be sufficient for the quad to overcome the wind. Provided the angle is sufficient, the return home velocity should be reasonably accurately maintained. `GPS_RESCUE_VELOCITY_I` is important when flying into the wind. On windy days, always confirm that the quad can overcome the wind. A lot of battery power can be consumed flying into the wind, always consider this when thinking about how far you fly out with the wind behind you.

## Expected Behaviors

- The disarm with remains active during switch-induced failsafe, including GPS Rescue. Take care with disarm if the craft is configured to reset the home point after a disarm.
- To prevent flyaways, the low satellite sanity check will abort the rescue if satellite count falls below half the set GPS Rescue minimum sats for a cumulative increment/decrement period exceeding 10s.
- At the point of initiation of a rescue, if the basic initial sanity checks fail (eg not enough satellites), there is a 20s 'do nothing but hover' period, before the craft disarms. This applies, for example, in video loss scenarios where the pilot hits the switch and perhaps there were not enough satellites at the time. The craft should level out at the hover throttle value and wait for pilot input or for the sanity check to get corrected.
- Even if all sanity checks are disabled, there is now an incremental up/down limit of 20s of sanity failure before the quad will be disarmed. In other words, the quad will disarm itself, even if all sanity checks are 'off', in extreme failures of this kind. If you don't like this, speak up. It is a safety feature to prevent otherwise indefinite flyaways that could occur if sanity checks are disabled by the user. The all sanity checks off option is intended only for testing, not for actual use.
- The minimum velocity required for IMU orientation from a GPS over-ground path is 2m/s
- When GPS Rescue is switch-initiated via a failsafe switch, there is no need to move the sticks more than 30% to regain control. Control is regained immediately the switch is reversed.
- Minimum initiation distances of 20m, and altitudes as low as 2m allow closer range LOS setup, testing and tuning. Closer distances may be useful when GPS Rescue is used as a emergency safety switch for LOS beginners.
- The default minimum initiation distance of 30m and minimum initiation altitude of 5m allow easier setup and testing in a small park.
- GPS distance from home is measured and logged in cm (not metres) and angle in tenths of a degrees (not degrees) to improve accuracy and smoothness.
- If the user initiates GPS Rescue on a switch, the Aux channels are still "live". This allows disarming, starting or stopping logging, etc, during a switch induced failsafe. Flight channels (RPTY) will be set or held according to failsafe settings, and are live stick values are never passed during a failsafe, though the stick position is monitored since 30% stick wiggling is needed to exit GPS Rescue by stick movement.
- For all switch initiated rescues, if the pilot realises the rescue is failing, the switch should be reverted, and the pilot should regain control before the situation becomes irrecoverable.
- pitch angle change is limited to 25 deg/s.
- ascent and descent rates are user-configurable.
- max descent rate, when dropping from considerable height, is 2x the configured descent rate, reducing proportionally to the set descent rate as the craft gets closer to ground level.
- roll is mixed with the yaw correction to better maintain the intended path to home, especially in wind
- the default amount of roll is set as a percentage of the yaw value, with the default at 100 resulting in equal roll and yaw for small yaw rates, linearly reducing to no roll component at high yaw values
- GPS Rescue settings are now included in the blackbox log header fields.
- Debugs to compare set altitude and velocity are provided

## Problems and solutions

| Problem                                     | Solution                                                                                                                   |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Can't arm                                   | GPS hasn't enough satellites. 10 is best. Be patient.                                                                      |
| Floats around on switch initiation          | In "Do nothing" mode due to failure to initialise, reverse the switch                                                      |
| Doesn't level out for 1 second              | Wasn't set to enter level mode in Stage 1 failsafe                                                                         |
| Suddenly drops on initiation, but recovers  | Stage 1 throttle value set too low, or not set                                                                             |
| Drops 1s after initiation, stays low        | GPS Rescue hover throttle value set too low                                                                                |
| Tracks to one side during return            | Level mode not calibrated properly, or calibration lost during flight                                                      |
| Drifts in final landing phase               | Level mode not calibrated properly, or lost calibration during flight                                                      |
| Disarms while flying home                   | Not within 50% of target velocity or altitude for 20s or more in fly home phase                                            |
| Altitude on return consistently low or high | Hover value not set correctly, not enough throttle I                                                                       |
| Altitude on return randomly low or high     | GPS Altitude drift - check its stability before takeoff                                                                    |
| Altitude overshoots at start                | Normal behavior                                                                                                            |
| Altitude droops below target at start       | Set a higher altitude buffer if using current altitude `gps_rescue_alt_buffer`                                             |
| Altitude droops below target at start       | Throttle P and D too low                                                                                                   |
| Altitude wobbles quickly during return      | Throttle P and D too high                                                                                                  |
| Altitude wobbles slowly during return       | Throttle I too high                                                                                                        |
| Long delay before turning                   | Delay reaching target altitude - large climb distance with ascent rate too slow                                            |
| Long delay before turning                   | Delay reaching target altitude - hover value too low                                                                       |
| Goes in wrong direction on initiation       | Didn't fly forward at > 2m/s long enough for IMU to calibrate to GPS                                                       |
| Goes in wrong direction on initiation       | Random unknown longstanding bug causing incorrect IMU heading value                                                        |
| Goes in wrong direction on initiation       | Mag is used but is reporting bad information                                                                               |
| Pitch wobbles up/down quickly during return | Normally present; Pitch P and D may be too high                                                                            |
| Pitch wobbles up/down slowly return         | Pitch P and D are too low, or pitch I is too high                                                                          |
| Overshoots target on landing                | Pitch I is too high, descent too fast or short                                                                             |
| Yaw wobbles left/right all the time         | Yaw P too high (unusual)                                                                                                   |
| Yaw control is loose                        | Yaw P too low (likely only on large machines)                                                                              |
| Landing is hard and doesn't disarm          | GPS Altitude drift downwards, hits ground before landing altitude is reached - check GPS altitude stability before takeoff |
| Large control jumps every second            | GPS unit is reporting values only once a second. If NMEA, use UBlox mode                                                   |

## Sanity Check Options

Sanity checks monitor the rescue. They do this for both switch-induced, and real loss, GPS Rescues. They are last ditch responses to a failure of the rescue process. They validate that:

- the Rescue system has a Home Point to aim at
- the craft is outside the minimum distance at the start of the rescue
- satellite count is OK at the start of the rescue
- the satellite count stays OK during the rescue
- during the `ASCEND` phase, the quad is not stuck in a tree or otherwise can't climb
- during the `FLY_HOME` phase, that velocity to home is at least half the set velocity during the fly home phase
- during the `LANDING` phase and descent phase, that the descent rate is at least half the set descent rate (not stuck in a tree)

When a sanity check fails, it means that the craft cannot complete the rescue successfully. It either has no idea where to go, or is already going in the wrong direction, or is stuck in a tree or something. After some reasonable time, the craft should be disarmed so that it will fall without travelling much further, climbing too high, flattening the battery or burning the motors. Each possible failure has a 'grace period' before the quad will disarm.

Sanity checks do not cover every failure possibility. There is no check on absolute altitude during the fly home phase, for example. If sanity checks are too aggressive, they can cause false or premature termination of the rescue, leading to an unnecessary disarm and crash. It is very difficult to find the right balance.

Note that 'performance based' sanity checks rely on GPS data. False or erratic data may not only send the craft the wrong way (without us having any way of knowing), it may also falsely trigger a sanity check, or may prevent sanity checks from identifying a true failure.

A sanity check failure due to GPS signal loss will inevitably be a disarm the craft, to prevent indefinite flyaways. For switch-induced failsafe, sanity checks have an extra delay period, to allow the pilot time to reverse the switch.

There are three sanity check modes:

- `RESCUE_SANITY_ON` - this gives the strongest sanity check behavior, with immediate disarm for hard errors like loss of GPS communication, flyaway, low sat count, and no home point on initiating the rescue. These responses will be the same whether the rescue is 'real' or if it was initiated by a switch.
- `RESCUE_SANITY_FS_ONLY`- this is the default mode, giving strong sanity check behavior for true RC link loss, but additional time to reverse the switch for switch-induced failsafe. For example, the quad will enter "Do Nothing" mode for 20s if a rescue is initiated by switch and there is no Home Point.
- `RESCUE_SANITY_OFF` - this is intended for testing only. When in this mode, the quad will immediately disarm only if arming without a Home Fix was permitted, there is no Home Fix, and there is a hard (Rx Link Lost) failsafe. In all other cases a failed sanity check results in "Do Nothing" mode for 20s and then a disarm. For safety reasons - to prevent indefinite flyaways - it does not not turn "all sanity checks off" anymore.

For sanity checks with a time element, we use a cumulative up/down counter. Starting from zero, the counter increases by 1 every second the value is 'bad', and decreases by 1 every second it is 'good'. Once the accumulator reaches the sanity check time-out, the sanity check fails.

This table explains the currently implemented sanity checks.

| Mode                                | `SANITY_ON`, or true failsafe in `SANITY_FS_ONLY` | Stick induced `SANITY_FS_ONLY`, or `SANITY_OFF` | Notes                                                                                         |
| ----------------------------------- | ------------------------------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------- |
| No Home Fix on initiation           | Immediate disarm                                  | `Do_Nothing` for 20s then disarm                | Usually it is impossible to arm with no home fix.                                             |
| Initiate inside min DTH             | immediately enters landing mode                   | immediately enters landing mode                 | Craft should slowly land itself and disarm on touch-down                                      |
| GPS hardware failure                | immediate disarm                                  | disarm after 10s                                | Should never occur mid-flight                                                                 |
| Initiate but in crash recovery mode | immediate disarm                                  | disarm after 10s                                | GPS Rescue cannot function while in crash recovery mode                                       |
| Climb Phase failure                 | disarm after 10s                                  | disarm after 10s                                | climb rate less than half the set rate for cumulative 10s                                     |
| Low Sats                            | disarm after 10s                                  | 10s, `Do Nothing` for 20s, then disarm          | sat count less than half the GPS Rescue minimum number for cumulative 10s                     |
| FlyHome failure                     | 15s then disarm                                   | 15s, `Do Nothing` for 20s, then disarm          | can't maintain at at least half the set velocity in the direction of home for cumulative 15s. |
| Landing Phase failure               | 10s then disarm                                   | 10s then disarm                                 | descend rate less than half the set rate for cumulative 10s                                   |

- 'Do Nothing' centers sticks and hovers to give the user time to reverse the failsafe switch, if used, or in case you just get lucky and signal comes back.

\*\* In `SANITY_OFF` mode, the craft can be armed with no home fix, but the rescue will fail, and the craft will disarm and crash after 10s of hovering, whenever the pilot attempts to enable a GPS Rescue.

Switch initiated GPS rescue may be helpful when FPV video is lost. The quad should quickly climb high enough to get video back. If something prevents the climb, the craft could be flying away in a weird direction, or stuck in a tree, or almost anything. Hence, if the video has not come back within 20-30s, it's best to undo the failsafe switch, disarm, and start searching. This will keep the quad relatively close to the point of video loss, and retain battery capacity by turning the motors off.

## GPS_RESCUE_ALLOW_ARMING_WITHOUT_FIX

When GPS Rescue is enabled, arming is not permitted unless there is a GPS position fix and we have at least the required minimum number of satellites, set by `gps_rescue_min_sats`. This check can be bypassed by enabling `allow_arming_without_fix`.

When arming is permitted without a fix, and the machine is armed without a Home Point being set, and a GPS rescue is initiated, the craft will go into 'do nothing' mode (slow descent with landing detection enabled) for 20s then disarm. This will happen both for true RC Link loss failsafe, and for switch-initiated failsafe tests. It will not fly home under any circumstances, because it has no clue where home is. The 'do nothing' period of 20s exists only to give the pilot time to undo the switch if they realize that the quad is not going to return.

Never allow arming without a home point fix if you want GPS Rescue to get you home!

This option exists only for testing purposes.

## DEBUGS

There are 4 debugs for GPS Rescue, of which the `GPS_RESCUE_TRACKING` debug gives a good overview of set vs achieved altitude and velocity. When checking out the altitude PIDs, use the `GPS_RESCUE_THROTTLE` debug, and for velocity home (pitch control) PIDs, use the `GPS_RESCUE_VELOCITY` debug. The `GPS_RESCUE_HEADING` debug is useful for checking heading related information, and can be used to compare GPS headings to magnetometer headings. Compass/Mag headings are always logged whenever a Mag is active.

All the GPS configuration settings are included in the Blackbox Log Header.

| Name                | Debug0                      | Debug1                                        | Debug2                                    | Debug3                                                                            |
| ------------------- | --------------------------- | --------------------------------------------- | ----------------------------------------- | --------------------------------------------------------------------------------- |
| GPS_RESCUE_THROTTLE | Throttle P                  | Throttle D                                    | Current craft altitude, cm                | Target altitude cm                                                                |
| GPS_RESCUE_VELOCITY | Velocity P                  | Velocity D                                    | Current craft velocity cm/s               | Target velocity cm/s                                                              |
| GPS_RESCUE_TRACKING | Velocity to home cm/s       | Target velocity cm/s                          | Current craft altitude cm                 | Target altitude cm                                                                |
| GPS_RESCUE_HEADING  | Yaw rescue rate deg/s \* 10 | Roll angle degrees \* 1000                    | Estimated craft heading deg \* 10         | Estimated angle to home                                                           |
| RTH                 | Max Altitude                | Current Altitude                              | Rescue failure code (\*10) + Rescue Phase | Seconds failing sanity (\*100) + Seconds low sats                                 |
| ATTITUDE            | GPS Trust                   | Baro Altitude (zeroed and smoothed on arming) | GPS Altitude (zeroed on arming)           | Vario (smoothed only while armed, only present if Vario is enabled for the build) |

**Normal RTH Debug 2 progression**

| Code seen | Name                | Notes                                                            |
| --------- | ------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------ |
| 0         | `RESCUE_IDLE`       | Rescue Phase and failure codes should be 0 while flying normally |
| 1         | `RESCUE_INITIALIZE` | usually too brief to be seen in OSD or log                       |
| 2         | `RESCUE_ATTAIN_ALT` | climbing phase, no yaw                                           |
| 3         | `RESCUE_ROTATE`     | rotating (yawing)                                                |
| 4         | `RESCUE_FLY_HOME`   | pitches forward to fly home                                      |
| 5         | `RESCUE_DESCENT`    | slows down and descends                                          |
| 6         | `RESCUE_LANDING`    | below landing altitude, waiting to hit ground                    |
| 8         | `RESCUE_COMPLETE`   | too brief to be seen in OSD                                      |
| 0         | `RESCUE_IDLE`       | returns to idle                                                  |
| 11        | `RESCUE_FLYAWAY`    | failure while flying home                                        | failure code for flyaway followed by phase code for fly home |
| 19        | `RESCUE_FLYAWAY`    | failure while flying home, within do nothing period              | failure code for flyaway in tens column, do nothing phase    |
| 39        | `RESCUE_GPSLOST`    | failure while climbing, within do nothing period                 | climb failure code in tens column, do nothing phase          |

There should never be a failure code in the 'tens' column of Debug 2; the failure code should always be zero, meaning `RESCUE_HEALTHY`.
An active failure code will trigger either `RESCUE_DO_NOTHING`, `9`, or `RESCUE_LANDING`, `6`, or `RESCUE_ABORT`, `7`, depending on the settings (see the sanity check table, above).
NB: some events will be too transient to visualise in OSD or even to be logged.

**RTH Debug 3 examples**

Debug 3 should be zero. If the sanity check time-out counter is non-zero, the value will be shown in the hundreds column.
When a sanity check isn't correcting itself, the value in the hundreds column just keeps incrementing until it hits its limit.

| Code seen | Notes                                                                        |
| --------- | ---------------------------------------------------------------------------- |
| 0         | Normal state = sanity check timers are zero, sats are more than half minimum |
| 100       | a sanity check has failed for 1s, satellite count is good                    |
| 200       | a sanity check has failed for 2s, satellite count is good                    |
| 1203      | a sanity check has failed for 12s, satellite count has been low for 3s       |

**Rescue Phase codes**

```
0    RESCUE_IDLE,
1    RESCUE_INITIALIZE,
2    RESCUE_ATTAIN_ALT,
3    RESCUE_ROTATE,
4    RESCUE_FLY_HOME,
5    RESCUE_DESCENT,
6    RESCUE_LANDING,
7    RESCUE_ABORT,
8    RESCUE_COMPLETE,
9    RESCUE_DO_NOTHING
```

**Rescue Failure codes**

```
0    RESCUE_HEALTHY,
1    RESCUE_FLYAWAY,
2    RESCUE_GPSLOST,
3    RESCUE_LOWSATS,
4    RESCUE_CRASH_FLIP_DETECTED,
5    RESCUE_STALLED,
6    RESCUE_TOO_CLOSE,
7    RESCUE_NO_HOME_POINT
```

Seconds failing is calculated so that:

- values in the hundreds indicate the time in seconds that the sanity timer accumulated
- values in digits indicate the accumulated low sat timer values

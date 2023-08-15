# GPS Rescue 4.5

Betaflight 4.5 makes the following significant improvements to GPS rescue:
- greatly improved support for UBlox GPS modules, particularly M9 and M10, improving rescue reliability and smoothness.  
- Flyaways due to heading errors are now much less likely, due to major improvements in IMU heading determination code.
- Angle mode with earth referencing gives more effective roll during a rescue.  
- Rescues can be initiated closer to home than previously without disarming.  
- Immediate disarm on rescue initiation close to home will now only occur when the quad is within 5m radius of home _and_ below less than landing altitude.
- Safety following accidental initiation of a rescue on the ground soon after arming has been improved.  
- The sanity check time-out for failures during switch-initiated failsafe testing is now 30s, giving more time to reverse the switch before disarming.
- New CLI settings to fine-tune the disarm threshold, adjust the smoothing of the velocity D factor, and adjust how aggressively the IMU will handle a heading IMU error
- Some CLI settings have been re-named to be more consistent.
- A new `GPS_CONNECTION` debug to help resolve technical issues relating to the connection with the module and the CPU usage of the GPS code
- the Status CLI menu now reports the status of the connection to the GPS unit, including baud rate and the detected type of module
- Numerous bugfixes and tweaks for both safety and performance

With these changes, GPS Rescue is now far more reliable than ever before.

:::caution
The user **must** configure the Stage 1 settings correctly, as described below, or the quad will drop and may crash in a true signal loss failsafe.
:::

For technical information about changes since 4.4, please see:
- [PR12799, module hardware support](https://github.com/betaflight/betaflight/pull/12799): thanks to unit (Freasy), ctznooze, zzyzx and ledvinap
- [PR12900, IMU heading fixes, bugfixes](https://github.com/betaflight/betaflight/pull/12900): thanks to ctznooze, ledvinap
- [PR12859, IMU Yaw CoG gain](https://github.com/betaflight/betaflight/pull/12792]: thanks to ledvinap


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

Typical applications include:

- automatically and autonomously flying home when the radio link is lost (requires failsafe stage 2 to be set to GPS Rescue)
- climbing and flying back on a lost FPV video link is restored (requires manual mode switch activation by the pilot)
- a 'panic' switch for LOS pilots who lose orientation (requires manual mode switch activation by the pilot)

## Important:

:::danger

- Only use the 10.10 Configurator GUI. For earlier Configurator versions, only make changes to GPS Rescue parameters in the CLI!

- Test GPS Rescue *very carefully** before relying on it. Initial testing should be done at close range, with defaults, over soft grass.

- **Remember: During a real failsafe, the sticks MUST be wobbled by more than 30%, after the link is restored (and after FPV video is restored), before you can regain control over the quad.**  Otherwise it will fly all the way home and land. 

- If a switch-induced Rescue test has a problem, or seems to float around, DO NOT DISARM IN PANIC! Undo the Rescue switch *promptly* and you'll get full control back immediately.  Do not wait more than 15s or it may disarm and crash.  Stick wobbling is *not* required during a switch induced rescue; control is immediately returned immediately the switch is reset.

- **Be 100% sure you have a valid Home Point before arming** or the quad will disarm and crash when a true failsafe occurs.  

- Do *NOT* enable a compass/mag unless you have confirmed by logging that it correctly represents the attitude of the quad - mostly they DO NOT.

- Level mode must be trimmed to provide a stable, level, hover, for a rescue to work.

- The throttle value required for a stable hover should be set to the GPS Rescue Hover throttle value, and a slightly higher value must be set as the Stage 1 failsafe Throttle channel value.

- 3D mode is not supported! There will be no rescue if the quad is in 3D mode at the time of the failsafe.

:::

## Known issues

- **8k8k is not recommended - use 8k4k.**  The GPS task is CPU intensive, when configured at 10hz with GPS Rescue enabled, and requires Angle mode, attitude estimation, and relatively complex OSD displays . To avoid transient processor overload during a rescue, we recommend using 8k4k, not 8k8k.  If the GPS data is not to be used for a rescue, 1Hz 9600 baud or 2Hz 19200 baud will reduce the CPU load and may permit 8k8k on faster boards.  
- **Heading** will be wrong, right at the start.  After takeoff, the GPS requires at least several seconds of clean straight pitch forward speed in order to determine the heading of the quad from the course over ground.  Check the arrow in the OSD! It must point correctly to home within 5-10s (50-80m) after taking off.  If you are going to rely on the rescue, and the arrow isn't right after 10s, return to home, land and try again.
- **High head-winds in the return leg may cause rescue failure**.  High winds can cause sideways drift during the rescue, IMU disorientation if the course over ground does not match the pitch forward direction of the quad, and simply blow the quad backwards.  The quad must be configured with sufficient max pitch angle and sufficient max throttle to defeat a headwind.  Before taking on high winds, do a test rescue and check that the quad can over come the wind.
- **Do not enable the Compass** _unless_ it has been properly calibrated and the data confirmed, by logging, to be useful and accurate.
- **Use UBlox; don't use NMEA**. GPS units configured to use NMEA often update only once per second, or even slower. This makes GPS Rescue very jerky, and almost unusuable. It's better to use UBlox, which by default return data regularly 10 times a second.
- **SBAS** mode may cause problems with reliable GPS data, and may not function in some regions; if so, try setting SBAS mode off.
- **Unreliable GPS Modules**.  GPS modules vary greatly in performance and reliability.  Don't use unreliable modules, meaning those where you do not quickly get at least 10 solid sats, and modules that lose sats readily when the quad is put at an angle.
- **Using `GPS_RESCUE_ALLOW_ARMING_WITHOUT_FIX` is NOT recommended!**  While you can take off without the long wait for the GPS fix... if you do need a rescue, due to Rx loss, the quad will immediately disarm and crash.  This option should only be used when the pilot only needs to record basic GPS info to the log, or their radio, to help them find it after they crash.
- **DO NOT share the Failsafe switch aux channel activation range with any other flight mode!**


## Hardware requirements

- A properly trimmed accelerometer, and a solid stable level hover.  At the field, fine tuning can be done by hovering in angle mode, then using sticks to trim any drift.  Stick trimming means:
-- disarm
-- staying disarmed, set the mode switch to level mode
-- set throttle full up
-- use taps of the pitch/roll stick to trim the acc.  eg tap left 5-10 times to fix a tendency to drift right.

- A working GPS module that supports UBlox commands. `set GPS_PROVIDER = GPS_UBLOX` enables `UBLOX` mode. This is recommended and is now the default.  We support M6 through M10 UBlox hardware.

:::note
Modules with a backup battery will regain satellites more quickly during repeated power cycles.
:::

- if the GPS doesn't support `UBLOX`, NMEA at 1Hz can be used to provide basic latitude, longitude, height and speed information.  NMEA should not be relied on for a rescue unless it has been configured (using uCenter or pyGPSclient) to send position data at 5hz and to connect at 38400 baud or higher.  Our support for NMEA is currently very limited.

- When checking a new GPS unit, connect up in Configurator and check how quickly satellites are gained, while stable on a desk outdoors. 

:::tip
A good GPS will, from a cold start, get around 20 sats within a couple of minutes, and have 10-12 involved in the 3D 'fix', each showing a good signal level.  The module should acquire each satellite progressively and not chop and change between them.  Angling the quad should not cause loss of satellites involved in the fix.  Zoom in on the map and see how the position moves around, especially if the quad is put on an angle and some satellites are lost.  The position on the map should be stable.  If it wanders around by many meters, that's not good.  Since the module is 'still' on the table, the 'speed' should be zero.  It never is, of course, but with a solid fix, the 'speed' should not exceed 10-20 cm/s and should mostly be under 10cm/s when it has a good 'fix'.  Do not use a module that shows speeds > 25cm/s persistently while still, takes a long time to acquire satellites, doesn't have strong signal strength, moves around on the map, and loses position information when angled 45 degrees.  Generally, physically larger GPS modules work better than smaller units.  Note that the quality and speed of the fix has nothing to do with Betaflight; it is intrinsic to the performance of the module itself.
:::

- If a Baro is present, enabling it will improve altitude estimations significantly, especially for short duration flights (5-10 minutes).  Usually this results in better altitude control and more reliable landings. Check the baro data in the sensors tab after enabling the `ALTITUDE` debug. It should be reasonably smooth after arming. Whether or not Baro is helpful is readily seen by doing some LOS rescues at low altitude over flat ground. For longer flights, and with some Baro hardware, Baro drift can be more of a problem than GPS drift. Hence long-range pilots may prefer to not use Baro; they should do some testing with it on or off and then set the Baro trust value appropriately for the kind of flying you intend to do.

- If a Compass (mag, or magnetometer) is available, and if it has been properly calibrated, and the data is noise free, it may improve heading estimation. Compasses must be positioned well away from magnetic fields, including those from current flowing through wires. This is very difficult even on a 7" setup. Using an incorrectly calibrated or noisy compass will adversely affect the rescue. Be sure to log your compass data and check that it is accurate and clean before enabling it. In most 5" or smaller drones, Mag is too noisy to be useful.  Do not use the mag unless you log its information after flying a known 'square' course very accurately.  The log should show clean 90 degree heading changes in the mag data.  If not, don't use it.  If in doubt, don't use it.  We will be improving Mag integration in coming firmware releases.


## Software settings

The defaults should be good for initial tests, but there are some important things that you must set for each quad:

- Calibrate your accelerometer so the quad hovers level
- Set the Stage 1 Failsafe fallback throttle value (the value on the throttle channel) to a value that will make the quad climb steadily. This is the value that will be applied when the quad initially loses signal. If it is too low, and you're flying over water, before the GPS Rescue code kicks in - one second after signal loss - you may descend enough to end up in the water
- Set the GPS Rescue throttle value to a value that is close to a hover. This is the initial value that gets applied once the rescue kicks in. The PIDs that control throttle will take over at this point, by adding or subtracting from this value. It should be a value that is close to the hover value.

**The recommended baud rate is 57600**.  There is little to be gained by using 115200 with the recommended 10hz data rate. Lower baud rates reduce the CPU time required for parsing the incoming data and are more resistant to electrical noise.

**The recommended data rate is 10Hz for GPS Rescue purposes**.  5Hz or less is recommended if the GPS is only for fixes on the radio in case the quad is lost.  **If an M8 module is set at 20Hz, it will revert to its own internal default rate, which could be very slow.**  20Hz requires 115200 and M9 or higher, and is not recommended as it may be susceptible to electrical interference.

| Data Rate | Baud Rate | CPU cost | Comments |
| -------- | ------- | ------- | ------- |
| 20hz | 11500 | Highest | M10 only; test carefully! |
| 10hz | 38400 or higher | Medium | 57600 and 10hz is recommended for GPS Rescue |
| 5hz | 19200 or higher | Medium | For GPS Rescue or general use |
| 1-2Hz | 9600 or higher | Leasts | Too slow for smooth GPS rescue, OK for simple position/speed info |

Otherwise, read all the software settings below, and make sure they are suitable for what you want to do. Do not change anything a long way off defaults quickly; take your time.

## Ways to initiate a GPS Rescue

**1. RC Link Loss**

Here we want the quad to enter Stage 1 Failsafe for the Stage 1 duration, for long enough to be sure the link really is lost, then enter Stage 2 failsafe, which should be set to GPS Rescue and fly home. Once the link is restored, control can be restored by wiggling the sticks more than 30 degrees out from centre. 

:::danger
Do NOT wiggle the sticks until you've got an FPV video signal back, otherwise you may regain control but not know where you're going! Wait until your signal strength indicator is good and you have a decent FPV feed, **then** wiggle the sticks.
:::
If the radio or FPV link never recover, let it fly home and it will land itself.

**Setup**

- enable GPS
- check in Configurator that the module gains satellites and position reliably
- enable a Mode switch that will activate level mode, for calibration of level mode, and to be enabled during State 1 failsafe.
- enable a Mode switch to activate failsafe, for testing purposes
:::CAUTION
DO NOT use share Failsafe Mode switch with any other mode!
:::
- in the Failsafe tab, set failsafe mode to `GPS rescue`
- on the left side of the failsafe tab, configure the Failsafe Stage 1 settings so that the mode switch for Level will enable level mode, and set the Stage 1 throttle value so that the quad will hover, or climb steadily and slowly during stage 1.
- set GPS Rescue as the Failsafe Stage 2 mode, set the GPS hover throttle to a value that hovers.
- Check all the GPS Rescue settings for setting home point once etc (see below)
- if you have a Baro, check it using the ALTITUDE debug (see debug info at the end), and enable it only if it works well and improves altitude control.
- do initial tests using stick-induced failsafe as below
- then, once you are 100% sure it will fly home reliably, test by powering the radio down, and back up again, to confirm that stick wiggling regains control when the link is restored.

**2. Switch-initiated Failsafe emulation**

Here we want the quad to emulate a link loss. As soon as the switch is hit, the quad should enter Stage 1 and then Stage 2 failsafe.  
Stage 1 can be bypassed to go to Stage 2 directly, but it is important to ensure that Stage 1 is configured correctly if you ever were to require a true Rescue.
To regain control after a switch-initiated failsafe, just undo the Failsafe switch. DO NOT PANIC AND DISARM BY MISTAKE - just revert the failsafe switch!!!  
This is great for testing.

**Setup**:

- basic config as above, including setting Mode switches for level mode and to enable failsafe
- test carefully using the switch
- once you are sure it will fly home reliably, test by powering the radio down, and back up again, to confirm that stick wiggling regains control

**3. Directly enter GPS Rescue with the GPS Rescue Mode swith**

Here we want the quad to immediately level out, climb and start to fly home - no waiting. It makes sense when used as an emergency 'safety return' switch, perhaps, in cases where you're long-ranging and lose FPV signal, or in Acro and lose control in the distance. Just hit the GPS Rescue Mode switch and it should level out, climb, and head back to home. Undo the switch, and you're immediately back in control.

This option does not require Failsafe to be enabled at all.

**Setup**:

- configure the GPS Rescue hover throttle value, and other GPS settings on the right side of the Failsafe panel, as above
- don't worry about the other Stage 1 Failsafe settings on the left; they won't be used, because you'll bypass Stage 1 (unless you want Failsafe on true signal loss to work, in which case, set them up as above)
- configure a Mode switch to activate GPS Rescue (not failsafe)
- test carefully

## Tips:

- **Do a LOT of GPS Rescue tests with switch initiation at close range over soft grass!** Do these tests initially up close! You need to be 100% confident that every rescue works properly before relying on it.  

- **Before doing radio-off tests, ensure that your radio link can re-establish itself when powered back up**.  Otherwise it can't re-establish when it needs to.  Some radios let you enable or disable the internal Tx module on their setup page.  You may need a buddy to power the radio on or off for these tests.  Alternatively your buddy can go to the setup menu and disable the module in use.

- **Remember to set the GPS Rescue Hover throttle value accurately!** The correct value makes the quad hover, or very slowly ascend, while in level mode with the heaviest battery you plan to use. The value can be estimated by setting Failsafe Stage 1 to Level mode, and then try different Stage 1 throttle values to find a value that gets it to climb while in stage 1. The GPS Hover value is the value that the quad will first apply to throttle on signal loss. If too low, the may lose altitude right at the start at that point; if too high, it will climb too much. It is better to 'err slightly on the high side', because climbing too fast is usually less of a problem in a failsafe, compared to dropping like a stone.

- **Remember to set the Stage 1 throttle value manually to a hover value!**  When entering a true RF loss failsafe, the quad will use the Stage 1 settings for throttle during the Stage 1 period (the first second of the signal loss period) while hoping to recover signal. If the Stage 1 throttle channel value is set to 'Auto' you will immediately fall from the sky. Set it to a hover value so that it won't do anything bad before starting the rescue.

- **Always ensure that level mode hovers flat and true before taking off**. If the quad drifts sideways during return, it's usually because the accelerometer had an accelerometer trim error on roll.

- **When setting up a new GPS module, check it functionally, outdoors, with a laptop and an internet connection.**  The process is described above.

- Test whether `set GPS_UBLOX_USE_GALILEO = ON` improves the number of satellites found or the quality of the position lock. 

- **Before takeoff, always check in the OSD that the GPS unit returns solid position readings**. At least 8 satellites are needed to arm. 10 is preferable. After getting the sats, observe the speed and altitude values in the OSD.  They should not be jumping all over the place  Sometimes you need to wait another 30-60s before they stabilise. It should stabilise before takeoff. Do not rely on the blue light on the OSD. It will flash on a position lock, but that is not the same as having a home lock.

- **Ensure you have a Home Lock before takeoff, and that the Home Arrow points to Home when flying away!**. After arming, make sure the OSD shows the home icon, distance to home; after takeoff, ensure that the home arrow points to home. 

- Display the `osd_gps_sats_show_hdop` value in the OSD; if this gets close to, or below, 1.0, it's a good indicator of a solid fix (thanks @zzyzx).

- **At the start of a mission-critical flight, confirm normal GPS Rescue behaviour a by doing a close-range test rescue with a switch, before heading out into the distance**. Once you know that it turns and points to home, revert the test switch. You can enter and leave GPS Rescue with a switch with immediate effect anytime. This makes field checking easy.

- **Think carefully about the `GPS_SET_HOME_POINT_ONCE` option**. Resetting the home point on every new arm is OK for testing and normal use. Each time you arm, your home position is updated. The home position accuracy improves over time, so you're sure to get the best home position estimate when you finally do take off. The downside is that if you disarm during the flight, GPS rescue will take you back to that new arm point, not to home. If your craft disarms in a bad spot, even if you get signal back, it will will never fly home. In contrast, if you choose to only set the home position once, at first arm, it's important to not arm until you are sure you have a solid home position estimate. Be patient when using the first arm only method.

- **Decide whether or not to enter Angle Mode in Stage 1 Failsafe**. Assuming you have Angle mode on a switch, you can automatically enable Angle Mode for Stage 1 Failsafe on that aux channel.  Pitch, roll and yaw Stage 1 values can be left on auto (sticks will be 'centred', but throttle must be configured, as noted above, to a fixed value.  When done correctly, entering Stage 1 Failsafe will cause the quad to level out, slow down, and hold its current altitude, provided that a suitable stage 1 throttle value has been set.  Frequent 'twitches' into Angle mode during dropouts will alert the pilot to an impending failsafe.  Long-range pilots sometimes want to set their aux channels, and indeed all stage 1 channels to `Hold last values`, rather then entering Angle mode, so that their craft just keeps going 'as if nothing happened' during dropouts, and even extend the stage 1 period to several seconds, but this is not recommended.

- NOTE: without a compass, the quad 'learns' the heading of the quad from the direction of travel over ground from data provided by the GPS. **The craft must be travelling at least 1-2m/s, in clean nose-forward flight, for at least several seconds, for its attitude to be correctly set by the GPS data.** Try to fly dead-straight with clean pitch forward, directly into or with the wind, so that the flight path over ground matches the orientation of the quad. Check that the arrow rotates and points to home after short period of straight flying, eg once about 30-50m out.  If not, return, power cycle and try again.

- In 4.5, a rescue can be initiated at very close range, even without proper heading information, immediately after takeoff.  In these cases, the quad will fly itself in a random direction, pitched forward, and at a decent speed, until the IMU figures out what direction the nose of the quad is pointing.  This can take some time; it can fly 50 or even 80m away before looping back towards home.  That's why it's important to check the arrow.

- **The GPS Rescue 'mode' switch will immediately initiate GPS Rescue when activated**. It doesn't use the failsafe system. This can be used as an 'emergency' rescue for loss of FPV signal or for disorientation when flying LOS. If a failsafe switch is configured, a similar outcome can be achieved by setting the switch mode to immediately action Stage 2. There will be only a short delay before the quad should level out and climb. In both cases, after hitting the switch, the quad's momentum will keep it moving as it was for at least a few seconds, so don't expect miracles.

- In strong winds the maximum allowed angle of the craft during a rescue, `GPS_RESCUE_ANGLE`, may need to be increased enough that the quad can make forward speed into a headwind. The the craft may overshoot or land roughly if the wind is very strong, especially a strong tailwind.  The max throttle value should be sufficient to overcome a strong headwind.

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

| `GPS_RESCUE_ALT_MODE` | Notes                                                                                                                                                                                                                                               |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MAX_ALT`           | The default. Craft will climb to the highest altitude previously attained since arming, plus the `GPS_RESCUE_INITAL_CLIMB` height, in metres. Useful when the pilot climbs over the highest objects in the flight path before risking the failsafe. |
| `FIXED_ALT`         | Craft will return at the exact height above Home Point as configured by the `GPS_RESCUE_RETURN_ALT` value in metres. If flying low, around trees or buildings, `FIXED_ALT` can be set to a known height that will clear them.                       |
| `CURRENT_ALT`       | Craft will climb `GPS_RESCUE_INITAL_CLIMB` higher than the current altitude at the time the rescue starts. Useful for testing or for emergency 'panic' switch applications.                                                                         |

## Settings

| Item                                  | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GPS_RESCUE_MIN_START_DIST`           | The minimum distance from home required before a "normal" GPS Rescue can be initiated, in metres.  Inside this distance, the rescue may not be as well-controlled as usual.                                                                                                                                                                                                                                                                                                                                                         |
| `GPS_RESCUE_ALT_MODE `                | The return altitude mode.  `FIXED` returns at the set `RETURN_ALT` value, `MAX` will return just above the maximum height attained during the flight, ` and `CURRENT` returns at the height the rescue started, plus the climb amount                                                                                                                                                                                                                                                                                                                |
| `GPS_RESCUE_INITAL_CLIMB`             | The amount of height to climb, above either current or max altitude (as set by `GPS_RESCUE_ALT_MODE`), in metres.                                                                                                                                                                                                                                                                                                                                  |
| `GPS_RESCUE_ASCEND_RATE `             | Target climb rate in cm/s during the `ASCEND` phase. Can be increased to speed up the climb, if desired.                                                                                                                                                                                                                                                                                                                                           |
| `GPS_RESCUE_RETURN_ALT`               | When in `FIXED_ALT` mode, the altitude to return at, in metres above take-off altitude.                                                                                                                                                                                                                                                                                                                                                            |
| `GPS_RESCUE_GROUND_SPEED`             | The target velocity (in the direction of home) for the return flight, in cm/s.                                                                                                                                                                                                                                                                                                                                                                     |
| `GPS_RESCUE_MAX_RESCUE_ANGLE`         | Maximum allowed pitch (and roll) angle, in degrees, during a rescue. May need to be increased above default value if the craft has difficulty maintaining forward velocity against strong winds.                                                                                                                                                                                                                                                   |
| `GPS_RESCUE_ROLL_MIX`                 | The relative amount of roll included when the quad yaws during the return flight. 100 means the normal amount, zero means none.  Don't turn it off, or the quad just slides sideways when there is wind drift.                                                                                                                                                                                                                                                                                                                  |
| `GPS_RESCUE_PITCH_CUTOFF`             | First order lowpass filter cutoff that is applied to the velocity D factor, to smooth out pitch jitters.  Default of 75 means 0.75Hz.  Slower is smoother but can result in slow wobble and poor control.                                                                                                                                                                                                                                          |
| `GPS_RESCUE_IMU_YAW_GAIN`             | Sets the aggressiveness of the IMU adaptation to heading error in high wind situations.  Default is 10, with the range 5-20. Larger numbers result in a wider, slower correction for IMU heading errors.  Too high may lead to endless circling.                                                                                                                                                                                                   |
| `GPS_RESCUE_DESCENT_DIST`             | The distance from home at which the craft starts to descend, in metres.  Shorter distances make for a more vertical descent, which can lead to an overshoot when returning quickly                                                                                                                                                                                                                                                                                                                                                                         |
| `GPS_RESCUE_DESCEND_RATE `            | Target descend rate in cm/s during the `DESCEND` and `LANDING` phases. The descent rate at the start of the the `DESCEND` phase can be up to twice this value, reducing to equal the set value by the time the craft is landing.                                                                                                                                                                                                                   |
| `GPS_RESCUE_LANDING_ALT`              | The altitude above take-off point when auto-disarming is activated during descent, in metres. Also, will disarm if initiated below this altitude and within 5m of home.                                                                                                                                                                                                                                                                                                                                                      |
| `GPS_RESCUE_DISARM_THRESHOLD`         | Sensitivity of the auto-disarm on impact feature. If the quad is noisy, and disarming early, try increasing the threshold.  If too high, the quad may bounce around and fail to disarm on landing.                                                                                                                                                                                                                                                        |
| `GPS_RESCUE_THROTTLE_MIN`             | The lowest throttle value that can be applied by the GPS Rescue code. This usually does not require any modification. Heavy quads with a high throttle requirement just to hover should increase this a bit.                                                                                                                                                                                                                                                                                                                           |
| `GPS_RESCUE_THROTTLE_MAX`             | The highest throttle value that can be applied by the GPS Rescue code. This is unlikely to need increasing unless the quad is very heavy, or has high drag and needs to be flown in high wind.                                                                                                                                                                                                                                                                                                          |
| `GPS_RESCUE_THROTTLE_HOVER `          | **Important** The hover throttle value that approximates the value required during the fly home phase, or will result in a steady slow climb in level mode. This is the basic throttle value about which the throttle PIDs vary throttle (within limits). It is important to set this value correctly, to ensure that the craft climbs, rather than drops, right at the start of a rescue, and descends in 'DO NOTHING' mode.                      |
| `GPS_RESCUE_SANITY_CHECKS`            | Sets what happens if the Rescue fails. See the Sanity checks section                                                                                                                                                                                                                                                                                                                                                                               |
| `GPS_RESCUE_MIN_SATS`                 | Value 5 - 50. The number of satellites required, as well as a 3D fix, for the Home point to be set, and to permit arming when GPS Rescue is configured. Setting this to lower values risks poor GPS control and mid-air disarms. Default is 8.  With less than 5 we have no 3D fix and cannot control altitude from GPS alone. With a Baro this could be set to 5, since Baro can provide altitude with only a 2D GPS fix. |
| `GPS_RESCUE_ALLOW_ARMING_WITHOUT_FIX` | Option that permits arming without a home fix (never do this, see below)                                                                                                                                                                                                                                                                                                                                                                           |
| `GPS_RESCUE_THROTTLE_P`               | P gain value that increases throttle when the altitude is less than it should be, and vice versa.  Too high will cause oscillation, too low leaves more work for I, causing slow oscillations / poor control.                                                                                                                                                                                                                                      |
| `GPS_RESCUE_THROTTLE_I`               | I gain value that increases throttle when altitude is persistently less than it should be.  Too high will cause slow oscillation, too low will lead to persisting altitude error.                                                                                                                                                                                                                                                                  |
| `GPS_RESCUE_THROTTLE_D`               | D gain value that increases throttle when the quad is descending rapidly, and vice versa.  Too high will cause oscillation and/or jittery altitude control, most noticeable early in the descent phase.  Too slow and altitude control will be slow.                                                                                                                                                                                               |
| `GPS_RESCUE_VELOCITY_P`               | P gain value that increases pitch angle when forward velocity is too low.                                                                                                                                                                                                                                                                                                                                                                          |
| `GPS_RESCUE_VELOCITY_I`               | I gain value that increases pitch angle when forward velocity is too low over a sustained period of time.    |
| `GPS_RESCUE_VELOCITY_D`               | D gain value that increases pitch angle when the quad decelerates (loses velocity to home)                                                                                                                                                                                                                                                                                                                                                         |
| `ALTITUDE_LPF`                        | The cutoff value in Hz \* 100 that will be used to smooth the altitude value.  Too much smoothing leads to wobble.                                                                                                                                                                                                                                                                                                                                                                       |
| `ALTITUDE_D_LPF`                      | The cutoff value in Hz \* 100 that will be used to smooth the altitude derivative (vertical velocity) value. This also smooths the Vario signal at present.                                                                                                                                                                                                                                                                                        |
| `GPS_RESCUE_USE_MAG`                  | Use magmetometer (compass) data to improve heading accuracy. Do not enable this unless the mag is calibrated and a log shows high-quality noise free compass data.                                                                                                                                                                                                                                                                                 |

## PID Tuning suggestions:

- `GPS_RESCUE_YAW_P` should be high enough that the quad rotates well enough at the chosen speed to track to home properly. If too high, the nose of the quad will wander left to right as you return. Default is pretty good.
- `GPS_RESCUE_ROLL_MIX` at 100 gives approximately the correct amount of roll to make 'co-ordinated' turns in level mode. A higher value increases the relative amount of roll:yaw and may be needed for higher speed returns. Zero means no roll at all. Use the debug `GPS_RESCUE_HEADING` to see the amount of yaw and roll applied, while comparing the attitude of the quad to the angle to home.
- Altitude PIDs (`GPS_RESCUE_THROTTLE_P`, `GPS_RESCUE_THROTTLE_I`, and `GPS_RESCUE_THROTTLE_D`) are best adjusted with a very low set groundspeed (eg 50 cm/s), the quad pointing to home when initiating GPS Return, and a relatively steep climb rate at the start. PIDs too high lead to vertical oscillations after the initial climb. D gives faster oscillations than P. Try to minimise them using classical PID control methods. There is a very big delay from pushing the motors to gaining altitude. The debug DEBUG_GPS_RESCUE_THROTTLE_PID will be most useful. It shows throttle P and D, with the measured altitude vs the altitude target.
- Velocity PIDs (`GPS_RESCUE_VELOCITY_P`, `GPS_RESCUE_VELOCITY_I`, and `GPS_RESCUE_VELOCITY_D`)are best adjusted after setting the altitude PIDs. They directly control the pitch angle of the quad. Too much P and/or D may cause slow oscillations on pitch. Too much I may cause overshoot. `DEBUG_GPS_RESCUE_VELOCITY` shows P and D with the speed to home and velocity targets. Tune these with zero I. Then add I until any residual over- or under- shoot is eliminated. Too much I will cause slow ongoing wobble.
- The defaults should be 'about right' for a typical 5" freestyle quad.
- The quad targets velocity in the direction of home. If it must fly into wind, the maximum angle (set by `GPS_RESCUE_ANGLE`), must be sufficient for the quad to overcome the wind. Provided the angle is sufficient, the return home velocity should be reasonably accurately maintained. `GPS_RESCUE_VELOCITY_I` is important when flying into the wind. On windy days, always confirm that the quad can overcome the wind. A lot of battery power can be consumed flying into the wind, always consider this when thinking about how far you fly out with the wind behind you.

## Expected behaviours

- The disarm switch should remain active during switch-induced failsafe, including GPS Rescue. Take care with disarm if the craft is configured to reset the home point after a disarm.
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
| Altitude overshoots at start                | Normal behaviour                                                                                                           |
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

- `RESCUE_SANITY_ON` - this gives the strongest sanity check behaviour, with immediate disarm for hard errors like loss of GPS communication, flyaway, low sat count, and no home point on initiating the rescue. These responses will be the same whether the rescue is 'real' or if it was initiated by a switch.
- `RESCUE_SANITY_FS_ONLY`- this is the default mode, giving strong sanity check behaviour for true RC link loss, but additional time to reverse the switch for switch-induced failsafe. For example, the quad will enter "Do Nothing" mode for 20s if a rescue is initiated by switch and there is no Home Point.
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

- 'Do Nothing' centres sticks and hovers to give the user time to reverse the failsafe switch, if used, or in case you just get lucky and signal comes back.

\*\* In `SANITY_OFF` mode, the craft can be armed with no home fix, but the rescue will fail, and the craft will disarm and crash after 10s of hovering, whenever the pilot attempts to enable a GPS Rescue.

Switch initiated GPS rescue may be helpful when FPV video is lost. The quad should quickly climb high enough to get video back. If something prevents the climb, the craft could be flying away in a weird direction, or stuck in a tree, or almost anything. Hence, if the video has not come back within 20-30s, it's best to undo the failsafe switch, disarm, and start searching. This will keep the quad relatively close to the point of video loss, and retain battery capacity by turning the motors off.

## GPS_RESCUE_ALLOW_ARMING_WITHOUT_FIX

When GPS Rescue is enabled, arming is not permitted unless there is a GPS position fix and we have at least the required minimum number of satellites, set by `gps_rescue_min_sats`. This check can be bypassed by enabling `allow_arming_without_fix`.

When arming is permitted without a fix, and the machine is armed without a Home Point being set, and a GPS rescue is initiated, the craft will go into 'do nothing' mode (slow descent with landing detection enabled) for 20s then disarm. This will happen both for true RC Link loss failsafe, and for switch-initiated failsafe tests. It will not fly home under any circumstances, because it has no clue where home is. The 'do nothing' period of 20s exists only to give the pilot time to undo the switch if they realise that the quad is not going to return.

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

**RTH Debug 3 (sanity check counter) examples**

Debug 3 should normally be zero. If the sanity check time-out counter is non-zero, the value will be shown in the hundreds column.
When a sanity check isn't correcting itself, the value in the hundreds column just keeps incrementing until it hits its limit.
Seconds failing is calculated so that:
- values in the hundreds indicate the time in seconds that the sanity timer accumulated
- values in digits indicate the accumulated low sat time

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

## Modified Attitude debug

4.5 modifies the `ATTITUDE` debug to track a number of internal IMU variables of relevance to GPS Rescue.
Note that GPS groundspeed and course over ground are available in every log.
```
0    accADC[X] // X axis attitude, as per original debug
1    accADC[Y] // Y axis attitude, as per original debug
2    IMU CogYaw gain value * 100 // dynamically altered by groundspeedErrorRatio and pitchForwardAngle in a rescue
3    ez_ef value * 100 (after multiplication by IMU CogYaw gain when in a rescue)
4    velocity to home in cm/s
5    groundspeedErrorRatio * 100 (200 means the error between groundspeed and speed to home is 20ms)
6    pitchForwardAngle * 100 (value of 100 means 30 degree pitch forward, 200 means 60 degrees)
7    dcmKpGain * 100 // for testing dcmKpGain refactor or dcmKpGain code changes
```

## The GPS Module Hardware debug

This new debug mode is `GPS_CONNECTION`, and can be viewed with this [Blackbox Log viewer PR](https://github.com/betaflight/blackbox-log-viewer/pull/645).  The values can be seen 'live' in the sensors tab of Configurator.  It currently displays:

| Debug    | While connecting | While receiving data | Comments |
| -------- | ------- | ------- | ------- |
| 0     | GPS din model  |  GPS dyn model    | 1 at the start (acquire model ID), 7 once 3D fix arrives (flight model ID) |
| 1     |  GPS Nav data interval  |  GPS Nav data interval   | GPS module interval between nav data packets |
| 2    |  time since last Nav data   |   time since last Nav data  |  each GPS iteration, 100 or 500Hz, resets on new Nav data |
| 3    |  Baud rate  |  GPS data calculated, interval   |  FC time interval between Nav data output  |
| 4    | gpsData.state    |  gpsData.state   |  main State * 100 + sub-State, eg 413 is `CONFIGURE` at step 13 |
| 5   | executeTimeUs  |  executeTimeUs   | CPU time required for code to run |
| 6    | gpsData.ackState    |   gpsData.ackState  | 0 = idle, 1 = waiting, 2 = ack, 3 = mack |
| 7    | serialRxBytesWaiting  |  serialRxBytesWaiting   | incoming serial buffer size in bytes |


# GPS Rescue before V4.1

**WHAT THIS IS:**

GPS Rescue Mode is intended to bring your quad back autonomously in case of an emergency such as loss of video or radio link. **The only purpose is to bring the quad back into range so you can retake control as soon as possible.** It is not meant to be a reliable Return to Home mode. Keep this in mind, and (other than for initial testing) only activate it to avoid losing your quad. In order to increase the probability of GPS Rescue's successful operation, please read this document and configure your system as best as possible for your particular environment and flying style.

**WHAT THIS IS NOT:**

GPS Rescue is not a full "Return To Home" (RTH) function. It is not meant to be a tool to autonomously fly your quad home and you should not try and use it this way. It has no ability to auto-land and will intentionally "soft-crash" when it approaches the home point. Its entire purpose is to return the quad closer to home **so the pilot can resume control** in the event of signal loss. The pilot should resume control as soon as possible and not rely on GPS Rescue to fly home.

**REQUIREMENTS**

- GPS is required. The recommended models are Ublox m8n variants. This has been tested with 18x18mm m8n units, the Beitian BN 880 and other similar models.
- **Accelerometer must be enabled and properly calibrated**, Rescue Mode needs it to keep the quad leveled. Set up `ANGLE` mode, test fly, and confirm the hover is level and stable. GPS Rescue uses angle mode. If this is not working properly GPS Rescue will be unable to recover, and your quad may fly in the wrong direction.
- Barometer is optional but recommended. We have tested with both on-board and external (i2c) units.
- **This mode does not require a compass but will use one if available.**
- **3D mode is not supported.** If you have the 3D feature enabled GPS Rescue will be disabled.

**DISCLAIMER**:

- This is an experimental feature.
- Use with extreme caution.
- This documentation WILL change so check this page often.
- Unless stated otherwise, this documentation refers to the last stable release (currently BF4.0)
- If you plan on using this as a failsafe method you should ABSOLUTELY enable sanity checks!

## Setting up GPS Rescue

In order to set up GPS Rescue on your quad, it is highly recommended that you follow the complete setup procedure from scratch. This procedure is meant for practicing in a controlled environment and fully understanding the behavior and limitations of GPS Rescue. Using GPS Rescue out of the box (copying someone else's configuration) will diminish the chances of success.

### Go to the Betaflight Modes tab and add a switch for GPS Rescue Mode. Verify that the mode actually gets activated (of course no props).

Then configure the following parameters in the cli:

`set gps_rescue_initial_alt=[number] (default is 50)`

This is the most important parameter. When Rescue Mode is activated, your quad will point home and try to climb to a safe altitude relative to your takeoff point. This altitude will either be this parameter, or the maximum altitude recorded during flight +15m, whichever is highest. I personally like to make it 70 or 80 meters.

`set gps_rescue_ground_speed=[number] (default is 2000)`

This is the speed at which your quad will try to come back, in centimeters per second. I like 1500 (about 35 mph), but this setting depends on how and where you fly.

`set gps_rescue_angle=[number] (default is 32)`

This is the maximum allowed tilt angle for your quad when coming home. This setting may prevent it to reaching full speed, so you may have to experiment with it if you change the defaults. Note that the higher the angle, the harder it will be for the altitude controller to keep a stable altitude. When there is a chance of returning into head winds I like to set this parameter to 45 degrees.

`set gps_rescue_descent_dist =[number] (default is 200)`

This is the distance, in meters, at which your quad will start descending towards home.

`set gps_rescue_ascend_rate = [number] (default is 500)` (added in betaflight 4.1)

This is the vertical speed at which your quad will climb, expressed in centimeters for second

`set gps_rescue_descend_rate = [number] (default is 150)` (added in betaflight 4.1)

This is the vertical speed at which your quad will descend, expressed in centimeters for second

`gps_rescue_throttle_min` and `gps_rescue_throttle_max` in betaflight 4.1 only limit the excursion of the new pid controller(https://github.com/betaflight/betaflight/pull/8015)

`gps_rescue_alt_mode = [MAX_ALT, FIXED_ALT, CURRENT_ALT]` (added in betaflight 4.1)

now we can set the altitude of gps rescue

**MAX_ALT** is the old setting, the altitude will be `gps_rescue_initial_alt`, or the maximum altitude recorded during flight +15m

**FIXED_ALT**, the quad will always try to return to the height set (`gps_rescue_initial_alt`)

**CURRENT_ALT**, the quad will return maintaining the altitude read during the rescue activation (not suggested)

### At this point you are ready to test Rescue Mode.

Wait for your gps to get a good fix.
By default your quad will not arm if you have less than `gps_rescue_min_sats` (default is 8) satellites.

## We suggest the following procedure:

Fly in a straight line for at least 100 meters past your descent distance. For example, if your descent distance setting is 150 meters, fly to 250 meters. As you keep flying in a straight line, the home arrow should adjust to point towards home.

### VERY IMPORTANT: if your arrow does not point towards home, **DO NOT** activate GPS Rescue. Your quad will try to fly in the direction of the arrow if you do.

Activate GPS Rescue.

### IMPORTANT: be ready to deactivate the mode and take back control if your quad does not point towards you and starts making its way home.

If everything goes well, your quad will come back towards you and start descending. Do not let it get too close to the ground or to yourself because the landing functionality is not included in current builds. Your quad may just crash near you or overshoot you.

You may have noticed that the quad had a hard time keeping a stable altitude. Sometimes this happens when the GPS altitude reading is unstable, so the controller is aiming for a moving target. If you had a very stable altitude reading and the quad still could not stabilize within ten meters of your desired target altitude, you may have to adjust the altitude throttle PID gains. These are the parameters:

`gps_rescue_throttle_P`
`gps_rescue_throttle_I `
`gps_rescue_throttle_D`

We do not expect that most people will have to fine tune the navigation speed gains, but just in case the PID gains are:

`gps_rescue_velocity_P = 80`
`gps_rescue_velocity_I = 10`
`gps_rescue_velocity_D = 20`

After your quad reliably returns home once, you may want to test it at progressively larger distances and directions. When you have a reasonable level of trust in the feature, you may want to set your failsafe to GPS_RESCUE:

`set failsafe_procedure = GPS-RESCUE`

With this setting, GPS Rescue will activate in the event of a failsafe.

v4.0.x notes - However, it will return control to the user as soon as the radio link comes back. During this time the user should either activate Rescue Mode manually on the radio, just so that there cannot be an unexpected transition to manual control, or be ready to take over control at any moment. Our recommended approach is the first one, which requires having Rescue Mode on a switch if you want to use it for failsafe as well.

v4.1 and beyond - After the RC link is restored, Betaflight now requires that any combination of roll/pitch/yaw inputs be moved beyond the `failsafe_stick_threshold` percentage value before failsafe will be exited and control returned to the pilot. The default for this setting is 30 which means you need to move roll, pitch, or yaw at least 30% off center before it will cancel Failsafe and return control. You may choose to reduce that setting value if you need a less abrupt transition from failsafe to full control.

Additionally the failsafe procedure can be activated in the Failsafe tab of the configurator, or by using the OSD menus (`FEATURES > FAILSAFE`). The OSD menus setting is also convenient to disable GPS Rescue on failsafe in the field if you are flying in restricted or limited airspace (like indoors or among trees). Be sure to re-enable when appropriate.

## DEALING WITH FAILURES / SANITY CHECKS (VERY IMPORTANT):

If you're using rescue mode in a supervised fashion (as a switch only with video), or in a place with no danger to surroundings (over water, etc), sanity checks are entirely optional. If you plan on setting this as a failsafe (and most of the time even if you do not) you should highly consider enabling these.

`set gps_rescue_sanity_checks = RESCUE_SANITY_ON`

You can also set this to `RESCUE_SANITY_FS_ONLY` if you want it to only matter in a failsafe (unsupervised) condition.

Sanity checks will ensure that:

- GPS receiver is still connected to the FC
- GPS receiver is sending a valid GPS Fix
- Quad has not experienced a big shake (probably due to a crash)
- Number of Sats is equal or above gps_min_sats
- Quad gets closer to the home point after reaching initial altitude

If any of the conditions is not met, the Rescue operation will be aborted, meaning the quad will be dropped. However, the last two conditions have a few seconds of tolerance before getting triggered. Also, if the quad is not getting closer and a magnetometer is being used, Rescue will attempt to use GPS orientation as a second chance, but if a flyaway is still detected, the operation will be definitely aborted.

## Arm without a GPS Fix

By default, Betaflight will not let arm without a GPS Fix if you have GPS Rescue configured in a switch or as a failsafe procedure. Sometimes you might want to fly without a GPS Fix (maybe you're in a zone with poor coverage, or want to do a quick reconnaissance flight meanwhile sats are acquired) at the expense of GPS Rescue being deactivated. You can achieve this by setting:

`set gps_rescue_allow_arming_without_fix = ON`

With this value, you can take off without a GPS Fix, but **the GPS Rescue will not be available during the flight**. A warning (RESCUE OFF) will appear in the OSD to make you aware of that.
If a proper number of satellites are acquired while flying, to enable GPS Rescue you must land, disarm and arm again.

## Rescue not available

If GPS Rescue is mapped to a switch and/or set as a failsafe procedure, a minimum set of conditions will be continuously checked (GPS receiver connected, valid GPS fix, min sats). In the event of any condition not being met, a warning (RESCUE N/A) will be shown on the OSD. This is only a warning, if Rescue is activated while the warning is on screen, a grace period will still be taken into account for the sanity checks. This warning is shown regardless of the sanity checks being enabled.

## Common pitfalls

- Ensure that you are flying further than the minimum distance to home (100m by default) before testing GPS Rescue. The minimum distance can be set in the CLI using `set gps_rescue_min_dth = <meters>`. At distances less than this, GPS rescue will cause the quad to drop.
- In some particular setups, the accelerometer can drift over time and this can avoid GPS Rescue to work properly. This can be checked by flying for a long time and then activating angle mode, if the quad does not get to a nearly perfect stable orientation please do not use GPS Rescue on this quad.
- some GPS units need configuration with U-Center to work. Use [this video](https://www.youtube.com/watch?v=8FIi_xuH4Vo) by Painless360 for setup.
- GPS Rescue is still actively maintained/developed, so if you're not using the last stable Betaflight release, chances are you could hit a known issue. Please be sure to use the last stable release (currently 4.0).
- GPS Rescue is not and will never be completely reliable, so it should never be used as the only recovery measure. Showing lat/lon GPS Coordinates on the OSD (and recording the flight with a DVR), logging the telemetry (including GPS coordinates) in the Radio TX or using an autonomous beeper are some measures that should be in place even before testing GPS Rescue.

### Common pitfalls for old versions

- For Betaflight versions prior to 4.0, it's highly encouraged to enable Air Mode, and optionally to fine tune failsafe Stage1 settings, as a workaround for the crash detection issue immediately after activating Rescue Mode. Basically, ensure your settings will avoid the quad to be free-falling when entering into Stage2.
- When changing failsafe parameters with Betaflight Configurator 10.4 or lower, the failsafe procedure will be silently reset. Ensure that you set the failsafe procedure manually on CLI after saving modifications on the failsafe tab.
- Every time the quad is armed, the home point is updated. Prior to BF 4.0, home point was updated on disarm but could be missed if switching rapidly. Best practice for launching in all versions is to arm, wait a few seconds until home point shows up in osd with 0 distance, and then start flying. Otherwise, disarm, wait a few seconds and repeat. Since Betaflight 4.0 you can use this cli command `set gps_set_home_point_once = ON` in this way only the first arm after the battery is connected will be used as home point.
- If you're using Crossfire, make sure to configure the Failsafe parameter as "Cut" on your "CROSSFIRE RX" menu.

## Version History

**Betaflight 4.1**

- When GPS Rescue is engaged after a Failsafe, use sticks to recover control (https://github.com/betaflight/betaflight/pull/7936)

**Betaflight 4.0**

- Prevent crash detection immediately after entering GPS Rescue mode (https://github.com/betaflight/betaflight/pull/7034)
- Allow minimum distance to home to be configurable (https://github.com/betaflight/betaflight/pull/6404)
- Fixed a problem with Sanity Check misreporting STALLED/FLYAWAY during the initial phase (https://github.com/betaflight/betaflight/pull/7254)
- Added warning indication for GPS Rescue unreliable (https://github.com/betaflight/betaflight/pull/7256)
- Added explicit parameter for arming without fix or low sats: gps_rescue_allow_arming_without_fix (https://github.com/betaflight/betaflight/pull/7320)

**Betaflight 3.5.5**

- Fixed a problem with Sanity Check misreporting STALLED during the initial phase (https://github.com/betaflight/betaflight/pull/7254)

**Betaflight 3.5.3**

- Fixed problem with MOTOR_STOP and auto-disarm activating when GPS Rescue is active (https://github.com/betaflight/betaflight/pull/6979);

**Betaflight 3.5**

- GPS Rescue activated on failsafe will check the quad to be at least 100m away from home, regardless of the Sanity check setting. If it's closer, it will drop. Non-failsafe activated GPS Rescue works as in 3.4.

**Betaflight 3.4**

- The Sanity check includes a test for the quad to be farther away than 100m from target home for the Rescue mode to be activated. When Sanity check is enabled, if GPS Rescue is activated (either manually or by failsafe) when the quad is closer than 100m from home, it will drop.

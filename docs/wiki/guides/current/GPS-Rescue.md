# GPS Rescue

GPS Rescue is an advanced safety feature that can autonomously fly the craft home after loss of the RC or video link, until it is close enough to re-gain control. It can also land and disarm with reasonable precision.

:::note
This guide covers GPS Rescue in Betaflight 4.4 and later. For Betaflight 4.1–4.3, see the [GPS Rescue Mode v4-1 to v4-3](GPS-Rescue-Mode-v4-1-to-v4-3) guide.
:::

## About GPS Rescue

When activated, the craft should, sequentially:

- Enable level mode and climb to a user-configured altitude, at the configured ascend rate
- Rotate at 180 deg/s until pointing towards home
- Pitch forward and fly towards home at a user-configurable speed (note: the nose of the quad will move up and down in pitch during the rescue in order to keep the forward speed accurately controlled)
- Correct the attitude of the quad to keep it pointing to home if it drifts off-course due to wind, and will mix in some roll to minimise sideways drift
- When at a user-defined distance from home, start to descend at a configurable rate
- Reduce forward velocity as it approaches home, and reduce descent rate as it approaches ground
- Enable impact detection when below the set landing altitude
- Automatically disarm on touching down

Typical applications include:

- Automatically and autonomously flying home, landing, and disarming when the radio link is lost (requires failsafe stage 2 to be set to GPS Rescue, and appropriate Stage 1 settings)
- Climbing and flying back when the FPV video link is lost; the pilot must activate a mode switch that either triggers failsafe (and set failsafe mode to GPS Rescue) or directly enables GPS Rescue
- A 'panic' switch for LOS pilots who lose orientation (requires mode switch activation by the pilot, set up as above)

## Important

:::caution

- Always use the latest Configurator version.

- Test GPS Rescue **very carefully** before relying on it. Initial testing should be done at close range, with defaults, over soft grass.

- **Remember: During a real failsafe, after the link is restored, the sticks MUST be wobbled by more than 30% before you can regain control over the quad.** Control does not return to the pilot automatically! If you touch the sticks before video is returned, you may terminate the rescue. Hence, **during a real failsafe, DO NOT TOUCH THE STICKS**, at least not until:

  - your video has returned and is solid,
  - the `RXLOSS` indicator has gone,
  - the signal strength indicator is OK.

- If a switch-induced Rescue test has a problem, or seems to float around, DO NOT DISARM IN PANIC! Undo the Rescue switch _promptly_ and you'll get full control back immediately. Do not wait more than 15s or it may disarm and crash.

- Stick wobbling is _not_ required during a switch-induced rescue; control is immediately returned once the switch is reset.

- **Be 100% sure you have a valid Home Point before arming** or the quad will disarm and crash when a true failsafe occurs.

- Do _NOT_ enable a Magnetometer unless you have absolutely confirmed that the heading of the quad is correct. Compare the compass value in your phone (set to show True North, not Magnetic North), with the heading on Configurator's main opening screen, the GPS tab in Configurator, or the Sensors tab debug line 5 in debug mode `GPS_RESCUE_HEADING`, and check that both are within 10 degrees of each other. If the heading always starts at North and follows fast movements quickly but then jumps to some other value, the Mag is not right.

- Level mode MUST be trimmed to provide a stable, level hover for a rescue to work properly. Check, using a level mode switch, before flying out. Sticks can be used to calibrate the Acc at the field.

- The GPS Rescue **Hover Throttle** value and the **Stage 1 Failsafe Throttle** channel value should both be set to return a stable hover. A reliable method to determine this value:

  - Set the Failsafe switch action to `Stage 2`, and the `Stage 2 Failsafe Procedure` to `Land`.
  - Adjust the `Throttle value used while landing` until the quad descends gently.
  - Set the `GPS Rescue Throttle Hover`, and the `Stage 1 Channel Fallback value` for throttle, to this value.
  - Return the `Stage 2 Failsafe Procedure` to `GPS Rescue`.

- Even if you do everything right, GPS Rescue may not bring the craft home!

- 3D mode is not supported! There will be no rescue if the quad is in 3D mode at the time of the failsafe.

:::

## Known Issues

- **8k8k is not recommended — use 8k4k.** The GPS task is CPU-intensive when configured at 10Hz with GPS Rescue enabled, combined with Angle mode, attitude estimation, and OSD display updates. To avoid transient processor overload during a rescue, use 8k4k. If GPS data is not used for a rescue, 1Hz/9600 baud or 2Hz/19200 baud will reduce CPU load and may permit 8k8k on faster boards.
- **Heading** will be wrong right at the start if there is no Mag. After takeoff, the GPS requires at least several seconds of clean straight forward flight in order to determine the heading of the quad from the course over ground. Check the arrow in the OSD! It must point correctly to home within 5–10s (50–80m) of take-off. If you are going to rely on the rescue and the arrow isn't right after 10s, return to home, land, power cycle, and try again.
- **High headwinds in the return leg may cause rescue failure.** High winds can cause sideways drift during the rescue, IMU disorientation if the course over ground does not match the direction of the nose of the quad, and may simply blow the quad backwards. The quad must be configured with sufficient max pitch angle and max throttle to defeat a headwind. Before taking on high winds, do a test rescue and check that the quad can overcome the wind.
- **Do not enable the Compass _unless_ it has been properly calibrated and the data confirmed, by logging, to be useful and accurate.**
- **Use UBlox; avoid NMEA.** GPS units configured to use NMEA often update only once per second or slower. This makes GPS Rescue very jerky and almost unusable. UBlox is strongly preferred — see the NMEA note below.
- **SBAS** mode may cause problems getting reliable GPS data and may not function in some regions; if so, try setting SBAS mode off.
- **Unreliable GPS Modules.** GPS modules vary greatly in performance and reliability. Don't use unreliable modules — meaning those where you do not quickly get at least 10 solid sats, or modules that lose sats readily when the quad is put at an angle.
- **Steps in flight** (sudden position jumps) are expected behavior due to the time intervals between GPS data updates.
- **Using `GPS_RESCUE_ALLOW_ARMING_WITHOUT_FIX` is NOT recommended!** While you can take off without waiting for a GPS fix, if you need a rescue due to Rx loss, the quad will immediately disarm and crash. This option should only be used when the pilot only needs to record basic GPS info to the log or radio to help locate a crashed quad.
- **Do not use GPS Rescue with a 1Hz data update rate.** The minimum for smooth operation is 5Hz, although 2Hz can be used and should be successful despite a jerky return. 1Hz and 2Hz are only suitable for showing latitude and longitude in the log or OSD.
- **DO NOT share the Failsafe switch aux channel activation range with any other flight mode!**

:::note NMEA Support

NMEA support is limited. Do not use NMEA if the module supports UBlox protocols. Some limitations:

- 4800 baud is not supported.
- An NMEA GPS will only connect if the GPS Ports tab is set to a matching baud rate.
- Excessive data from some NMEA modules may choke the serial buffer.
- Do not use an NMEA module for GPS Rescue unless it sends data at 5Hz or more.

If you must use an NMEA module, ensure it is configured to power up with appropriate settings, and verify its output rate before relying on it for rescue purposes.

:::

## Hardware Requirements

- A properly trimmed accelerometer and a solid, stable level hover. At the field, fine tuning can be done by hovering in Angle mode, then using sticks to trim any drift:

  - Disarm
  - Staying disarmed, set the mode switch to level mode
  - Set throttle full up
  - Use taps of the pitch/roll stick to trim the acc (e.g. tap left 5–10 times to fix a tendency to drift right)

- A working GPS module that supports UBlox commands. UBlox is recommended and is the default. UBlox M6 through M10 modules are supported. If the GPS module doesn't support UBlox, NMEA can be used but is not recommended — see the NMEA note above.

:::tip
Modules with a backup battery will regain satellites more quickly during subsequent power cycles.
:::

- The GPS module must be powered up at the same time as the flight controller to be detected properly.

- When checking a new GPS unit, connect it in Configurator and check how quickly satellites are gained while stable on a desk outdoors. The `status` CLI command reports the baud rate set and returned, and (for UBlox) the module type.

:::tip
A good GPS will, from a cold start, get around 20 sats within a couple of minutes, and have 10–12 involved in the 3D 'fix', each showing a good signal level. The module should acquire each satellite progressively and not chop and change between them. Angling the quad should not cause loss of satellites involved in the fix. Zoom in on the map and see how the position moves around — the position on the map should be stable. If it wanders around by many meters, that's not good. Since the module is 'still' on the table, the 'speed' should be zero; with a solid fix, speed should not exceed 10–20 cm/s. Do not use a module that shows speeds > 25 cm/s persistently while still, takes a long time to acquire satellites, moves around on the map, or loses position information when angled 45 degrees. Generally, physically larger GPS modules work better than smaller units.
:::

### Known-Working GPS Hardware

The table below lists modules with confirmed first-hand experience. A module that works with UBlox at 10Hz and has hot-start capability is recommended. A magnetometer is useful only if the GPS unit can be mounted well away from any other electronics and wiring.

| Module              | UBlox | 10Hz | Hot Start | Mag      | Notes                                                                       |
| ------------------- | ----- | ---- | --------- | -------- | --------------------------------------------------------------------------- |
| Matek SAM-M8Q       | Yes   | Yes  | Yes       | No       | Works well                                                                  |
| Matek M8Q-5883      | Yes   | Yes  | Yes       | QMC5883L | Works well; mag noisy unless placed carefully                               |
| iFlight M8Q-5883 V2 | Yes   | Yes  | Yes       | QMC5883L | Works well; minor spikes in GPS position; mag noisy unless placed carefully |

### Barometer

If a Baro is present, enabling it will improve altitude estimations significantly, especially for short flights (5–10 minutes). Usually this results in better altitude control and more reliable landings. Check the Baro data in the sensors tab after enabling the `ALTITUDE` debug — it should be reasonably smooth after arming. For longer flights, and with some Baro hardware, Baro drift can be more of a problem than GPS drift. Test with Baro on and off and set the Baro trust value appropriately for your intended use.

### Compass (Magnetometer)

If a Compass (mag) is available and has been properly calibrated with clean, noise-free data, it may improve heading estimation. Compasses must be positioned well away from magnetic fields, including those from current flowing through wires — which is very difficult even on a 7" setup. Using an incorrectly calibrated or noisy compass will adversely affect the rescue. In most 5" or smaller drones, Mag is too noisy to be useful.

Do not use the Mag unless you log its information after flying a known 'square' course very accurately. The log should show clean 90-degree heading changes in the Mag data. If not, don't use it. If in doubt, don't use it.

## Software Settings

The defaults should be good for initial tests, but these must be configured for each quad:

- Calibrate your accelerometer so the quad hovers level.
- Set the **Stage 1 Failsafe fallback throttle value** to a value that will make the quad climb steadily. This is the value applied when the quad initially loses signal. If set too low over water, the quad may descend enough to end up in the water in the one second before GPS Rescue kicks in.
- Set the **GPS Rescue Hover Throttle** to a value close to hover. This is the initial value applied once the rescue kicks in; the PIDs adjust throttle from this starting point.

**Recommended baud rate: 57600.** There is little to be gained by using 115200 with the recommended 10Hz data rate. Lower baud rates reduce CPU time for parsing and are more resistant to electrical noise.

**Recommended GPS data rate: 10Hz for GPS Rescue.** 5Hz or less is recommended if the GPS is only used for position logging or radio telemetry. Note: M8 modules set to 20Hz will revert to their internal default rate. 20Hz requires 115200 baud and an M9 or higher module, and is not recommended due to susceptibility to electrical interference.

| Data Rate | Baud Rate       | CPU Cost | Comments                                                          |
| --------- | --------------- | -------- | ----------------------------------------------------------------- |
| 20Hz      | 115200          | Highest  | M10 only; test carefully!                                         |
| 10Hz      | 38400 or higher | Medium   | 57600 + 10Hz is recommended for GPS Rescue                        |
| 5Hz       | 19200 or higher | Medium   | For GPS Rescue or general use                                     |
| 1–2Hz     | 9600 or higher  | Least    | Too slow for smooth GPS Rescue; OK for simple position/speed info |

Otherwise, read all the software settings below and make sure they are suitable for your quad. Do not change anything far from defaults quickly; take your time.

## Ways to Initiate a GPS Rescue

### 1. RC Link Loss

Here we want the quad to enter Stage 1 Failsafe for the Stage 1 duration — long enough to confirm the link really is lost — then enter Stage 2 failsafe, which should be set to GPS Rescue and fly home. Once the link is restored, control can be restored by wiggling the sticks more than 30 degrees out from center.

:::danger
Do NOT wiggle the sticks until you've got an FPV video signal back, otherwise you may regain control but not know where you're going! Wait until your signal strength indicator is good and you have a decent FPV feed, **then** wiggle the sticks.
:::

If the radio or FPV link never recover, let it fly home and it will land itself.

**Setup**

- Ensure the firmware is cloud built with GPS support
- Enable GPS and GPS Rescue
- Check in Configurator that the module gains satellites and position reliably
- Enable a Mode switch that will activate level mode
- In the Failsafe tab, set your Level Mode channel to activate Level 1 when in Stage 1. This will slow the quad down and level it out in preparation for the rescue.
- Set the Stage 1 Throttle value so that the quad will hover during Stage 1
- Set the GPS Rescue Hover Throttle value to the same hover value
- Enable a Mode switch to activate failsafe, for testing purposes

:::caution
DO NOT use or share the Failsafe Mode switch with any other mode!
:::

- Test your failsafe switch by setting Failsafe Mode to `Land` mode and the failsafe mode to enter Stage 2 directly. The `Throttle value used while landing` should be set to lose altitude slowly. There is no auto-disarm on landing; we just check that the failsafe switch initiates landing mode. Then set Failsafe to go through Stage 1 first, after configuring Stage 1 settings as above. Now when you hit the switch, you'll get 1.5s (by default) of Stage 1, which should put the quad into level mode and hover for that time, then go to Stage 2.
- Finally, in the Failsafe tab, set failsafe mode to `GPS Rescue`
- If you have a Baro, check it using the `ALTITUDE` debug and enable it only if it works well and improves altitude control
- Do initial tests using switch-induced failsafe (below), confirming that it reliably flies home and lands. Cancel the test any time you think the rescue is failing.
- Only when you are 100% sure it will fly home reliably, test with a hard radio link loss. **Don't power down the radio to test this!** Most radios require all switches to be 'off' before they power up, which would lead to a disarm on re-connection. Instead, disable the Tx module in the radio's setup menu. **Remember to wiggle the sticks to regain control after the link is restored.**

### 2. Switch-Initiated Failsafe Emulation

When testing the Rescue configuration, we want the quad to emulate a real link loss. Set Failsafe mode so that when the switch is hit, the quad enters Stage 1 until it times out, then enters Stage 2 and starts the rescue, climbing and heading home. This is a direct emulation of exactly what will happen in a real rescue, but you can exit anytime.

Stage 1 can be bypassed to go directly to Stage 2. This allows the failsafe switch to start the Rescue without the Stage 1 delay — useful for dealing with FPV video loss or returning home when disoriented while flying LOS.

To regain control after a switch-initiated failsafe, just undo the Failsafe switch.

:::tip
DO NOT PANIC AND DISARM BY MISTAKE — just revert the failsafe switch!
:::

**Setup**

- Basic config as above, including setting Mode switches for level mode and to enable failsafe
- Test carefully using the failsafe switch

### 3. Directly Enter GPS Rescue with the GPS Rescue Mode Switch

This makes sense when you need an emergency 'safety return' function — for example, when you're long-ranging and lose FPV signal, or in Acro and lose control in the distance. Hit the switch and the quad immediately levels out, climbs, and starts to fly home; undo the switch, and you immediately get back in control.

There is a specific 'GPS Rescue Mode' option in the Modes tab to provide this functionality on a given Mode channel.

The main benefit over the failsafe switch approach is that Failsafe itself can be configured to include the Stage 1 delay before initiating a rescue, allowing short dropouts to show `RXLOSS` in the OSD without immediately initiating a rescue, while the GPS Rescue Mode switch provides immediate rescue initiation without any Stage 1 delay.

**Setup**

- If you do not need GPS Rescue for signal loss, you can set the quad to drop on failsafe and leave the Stage 1 settings at default.
- Otherwise, configure and test GPS Rescue failsafe including Stage 1 as described above.
- Configure the GPS settings on the right side of the Failsafe panel, including the hover throttle value.
- Configure the Mode switch to activate `GPS Rescue` (not failsafe).
- Test to confirm immediate climb on activating the GPS Rescue switch, and immediate return of control when the switch is reversed.

## Tips

- **Do a LOT of GPS Rescue tests with switch initiation at close range over soft grass!** You need to be 100% confident that every rescue works properly before relying on it.

- **Test for loss and restoration of signal by disabling the Rx module, not by powering the radio off!** Most radios require all switches to be 'off' before they power up — if you power the radio off and back on during a test, the arming switch position would trigger an immediate disarm and crash. Use the radio's internal Tx module enable/disable. You should see `RXLOSS` in the OSD when the signal is lost. **Remember to wiggle the sticks to regain control after a signal loss episode!**

- **Remember to set the GPS Rescue Hover throttle value accurately!** The GPS Rescue Hover value is the starting point for throttle once the rescue starts. The GPS Rescue PIDs adjust throttle either side of the Hover value within the min and max limits. If set too low, the quad may lose altitude right at the start while the PIDs 'catch up'. It is better to err slightly on the high side — climbing too fast is usually less of a problem than dropping like a stone.

- **Remember to set the Stage 1 throttle value manually to a hover value!** If the Stage 1 throttle channel value is set to `Auto`, the quad will immediately fall (`Auto` means 'throttle off'). Set it to a hover value.

- **Always ensure that level mode hovers flat and true before taking off.** If the quad drifts sideways during return, it's usually because the accelerometer has a roll offset. Trimming can and should be done with sticks at the field.

- **When setting up a new GPS module, check it functionally, outdoors, with a laptop and internet connection.** Visualise X-Y drift on the map in Configurator (zoom in) and altitude drift numerically. Find out how long it takes to acquire satellites, how many are found at your location, and whether enabling Galileo with `set GPS_UBLOX_USE_GALILEO = ON` improves satellite count or position lock quality.

- **Before takeoff, always check in the OSD that the GPS unit returns solid position readings.** At least 8 satellites are needed to arm (10 is preferable). After getting the sats, observe the speed and altitude values in the OSD — they should not be jumping around. Sometimes you need to wait another 30–60s before they stabilize. Do not rely on the blue light on the OSD; it will flash on a position lock, but that is not the same as having a home lock.

- **Ensure you have a Home Lock before takeoff, and that the Home Arrow points to Home when flying away!** After arming, make sure the OSD shows the home icon and distance to home; after takeoff, confirm the home arrow points correctly to home.

- Display the `osd_gps_sats_show_pdop` value in the OSD; if this gets close to or below 1.0, it's a good indicator of a solid, accurate fix.

- Once you have a decent set of sats, and before arming, **tilt the quad to 45 degrees in all directions and confirm that you don't lose a lot of sats.** With marginal GPS modules, the quad may lose satellites when it pitches forward to fly home, leading to a very erratic or failed rescue.

- **At the start of a mission-critical flight, confirm normal GPS Rescue behavior by doing a close-range test rescue with a switch, before heading out into the distance.** Once you know that it turns and points to home, revert the test switch. You can enter and leave GPS Rescue with a switch with immediate effect anytime.

- **Think carefully about the `GPS_SET_HOME_POINT_ONCE` option.** Resetting the home point on every new arm is OK for testing and normal use — each time you arm, your home position is updated. The downside is that if you disarm during the flight, GPS Rescue will take you back to that new arm point, not your original home. If the craft accidentally disarms in a bad spot, it will never fly home. If you choose to only set the home position once, do not arm until you are sure you have a solid home position estimate, and arm for the first time when the quad is at the physical location you want it to return to.

- **The Stage 1 Failsafe configuration is very important.** The defaults are not suitable. Choose either:

  - **Hold last values**: Configure Stage 1 to hold all current channel values on signal loss. A transient dropout of less than Stage 1 duration will let the craft keep flying straight. Long-range pilots sometimes prefer this, but the pilot must monitor Rx link in the OSD.
  - **Manually enable Level (Angle) mode, set throttle to climb a bit, and center the sticks**: Probably the safer option. This will provide the cleanest initiation of the Rescue process.

- **NOTE: Without a compass, the quad 'learns' its heading from the direction of travel over ground from GPS data.** The craft must be traveling at least 1–2m/s, in clean nose-forward flight, for at least several seconds before its attitude can be correctly determined from GPS data alone. Always fly dead-straight after take-off. If it is windy, fly directly into or directly with the wind, so that the flight path over ground matches the orientation of the quad. Check that the arrow rotates and points to home after a short period of straight flying. Typically 30–50m of distance is required. If not, return, power cycle, and try again.

- **A rescue can be initiated at very close range, even without proper heading information, shortly after takeoff.** In these cases, the quad will fly in whatever heading it was at until the IMU figures out the direction the nose is pointing — this can take some time and the quad may fly 50 or even 80m away before looping back towards home. That's why it's important to check the home arrow before takeoff.

- **The GPS Rescue 'mode' switch will immediately initiate GPS Rescue when activated.** It doesn't use the failsafe system and can be used as an 'emergency' rescue for loss of FPV signal or for disorientation when flying LOS. Note that the quad's momentum will keep it moving for at least a few seconds, so don't expect miracles.

- In strong winds, the maximum allowed angle of the craft during a rescue (`GPS_RESCUE_MAX_RESCUE_ANGLE`) may need to be increased enough that the quad can make forward speed into a headwind. The max throttle value should be sufficient to overcome a strong headwind. The craft may overshoot or land roughly if the wind is very strong, especially a strong tailwind.

- During a rescue, the built-in Betaflight Crash Detection code is automatically activated (even if you disabled it in your settings). If the quad has a hard crash or impact at any time on the way home, it may disarm immediately. This mechanism is quite different from the much more sensitive landing impact detection, which is only activated late in the Rescue once the altitude falls below the `GPS_RESCUE_LANDING_ALT` height.

## Phases of the Rescue

There are five "normal" phases in a Rescue: `ASCEND`, `ROTATE`, `FLY HOME`, `DESCEND`, `LAND`. They follow sequentially. Normally the phase is `IDLE`.

Each phase has different targets. Specific exit criteria must be met to enter the next phase.

`Sanity checks` monitor performance during each phase, and will disarm after prolonged failure.

| Phase      | Controlled Axes      | Functionality                                                                | Termination                                |
| ---------- | -------------------- | ---------------------------------------------------------------------------- | ------------------------------------------ |
| `ASCEND`   | Yaw and pitch        | Ascend or descend at set rate, yaw quickly to reduce heading error           | Fly-home altitude attained                 |
| `ROTATE`   | All axes except roll | Continue to yaw to reduce heading error                                      | Heading-to-home error less than 15 degrees |
| `FLY HOME` | All axes             | Fly home at set altitude and velocity, keep adjusting yaw                    | Within `GPS_RESCUE_DESCENT_DIST` of home   |
| `DESCEND`  | All axes             | Altitude and velocity reduced steadily, keep adjusting yaw                   | Altitude below `GPS_RESCUE_LANDING_ALT`    |
| `LAND`     | All axes except roll | Descend at set rate, with a zero forward velocity target, keep adjusting yaw | Impact with ground                         |

Notes:

- Sanity check failure or a bad crash during the rescue can also terminate a rescue.
- Yaw control is active in all phases, starting during the `ASCEND` phase. Yaw tries to keep the nose pointing towards the home point relative to the current estimated position of the craft, using a simple P controller. The maximum rotation rate to control yaw/heading error is 90 deg/s.
- Throttle is adjusted either side of the set `GPS_RESCUE_THROTTLE_HOVER` value, within limits set by `GPS_RESCUE_THROTTLE_MIN` and `GPS_RESCUE_THROTTLE_MAX`, at all phases of the rescue, to control altitude using a PID controller that includes an acceleration element. Throttle is dynamically adjusted according to the angle of the craft (the angle away from horizontal).
- Pitch angle controls forward velocity, and becomes active at half max rate during the `ASCEND` phase, is fully active once the error angle to home is less than 45 degrees in `ROTATE` phase, and stays fully active until `LAND` phase, when it is again reduced to half rate.
- Roll is added to yaw only at lower yaw rates, and is essential to deal with heading drift due to wind. It is active only during `FLY HOME` and `DESCEND` phases.
- During `DESCEND` phase, the craft tries to stay on the edge of a cylinder that is 2m away from the estimated landing point. It will point towards home while attempting to stay 2m out. The 2m distance is intended to minimise the risk of overshooting home. In windy situations the craft will typically descend on the down-wind side of the 2m cylinder.
- During landing mode, the quad can rotate, and will pitch forward and backward to try to land 2m out from the home point. If the GPS has drifted, the final distance to home and direction to home indicate where the GPS thinks 'home' is at the time of landing.
- Auto-Disarm is triggered by the accelerometer spike associated with touch-down with the ground. It is only active after the altitude falls below the `GPS_RESCUE_LANDING_ALT` value in `DESCEND` mode. If the altitude has drifted high so that the craft hits the ground but the GPS thinks it is still high in the sky, it will not disarm on impact. If that happens, the landing sanity check should disarm the craft after about 10s.
- A `DO_NOTHING` phase, which is flat Level Mode with throttle 100 steps below the GPS Rescue hover throttle value, with a 20s limit, is applied in switch-induced rescues that experience a fatal sanity check error. This gives time for the pilot to reverse the switch rather than immediately disarming. Should a pilot notice a failure to follow the above sequence during a switch-induced Rescue, they should immediately recover control by reversing the switch.

## Altitude Control Options

The `GPS_RESCUE_ALT_MODE` setting, in association with the `GPS_RESCUE_RETURN_ALT` and `GPS_RESCUE_INITIAL_CLIMB` values, determines the target altitude for the flight home:

| `GPS_RESCUE_ALT_MODE` | Notes                                                                                                                                                                                                                                                |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MAX_ALT`             | The default. Craft will climb to the highest altitude previously attained since arming, plus the `GPS_RESCUE_INITIAL_CLIMB` height, in metres. Useful when the pilot climbs over the highest objects in the flight path before risking the failsafe. |
| `FIXED_ALT`           | Craft will return at the exact height above the Home Point as configured by the `GPS_RESCUE_RETURN_ALT` value in metres. If flying low, around trees or buildings, `FIXED_ALT` can be set to a known height that will clear them.                    |
| `CURRENT_ALT`         | Craft will climb `GPS_RESCUE_INITIAL_CLIMB` higher than the current altitude at the time the rescue starts. Useful for testing or for emergency 'panic' switch applications.                                                                         |

## Settings

| Item                                  | Notes                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GPS_RESCUE_MIN_START_DIST`           | The minimum distance from home required before a "normal" GPS Rescue can be initiated, in metres. Inside this distance, the rescue may not be as well-controlled as usual.                                                                                                                                                                                                                                                   |
| `GPS_RESCUE_ALT_MODE`                 | The return altitude mode. `FIXED_ALT` returns at the set `RETURN_ALT` value, `MAX_ALT` returns just above the maximum height attained during the flight, and `CURRENT_ALT` returns at the height the rescue started plus the initial climb amount.                                                                                                                                                                           |
| `GPS_RESCUE_INITIAL_CLIMB`            | The amount of height to climb, above either current or max altitude (as set by `GPS_RESCUE_ALT_MODE`), in metres.                                                                                                                                                                                                                                                                                                            |
| `GPS_RESCUE_ASCEND_RATE`              | Target climb rate in cm/s during the `ASCEND` phase. Can be increased to speed up the climb if desired.                                                                                                                                                                                                                                                                                                                      |
| `GPS_RESCUE_RETURN_ALT`               | When in `FIXED_ALT` mode, the altitude to return at, in metres above take-off altitude.                                                                                                                                                                                                                                                                                                                                      |
| `GPS_RESCUE_GROUND_SPEED`             | The target velocity (in the direction of home) for the return flight, in cm/s.                                                                                                                                                                                                                                                                                                                                               |
| `GPS_RESCUE_MAX_RESCUE_ANGLE`         | Maximum allowed pitch (and roll) angle, in degrees, during a rescue. May need to be increased above the default value if the craft has difficulty maintaining forward velocity against strong winds.                                                                                                                                                                                                                         |
| `GPS_RESCUE_ROLL_MIX`                 | The relative amount of roll included when the quad yaws during the return flight. 100 means the normal amount, zero means none. Don't turn it off, or the quad will slide sideways when there is wind drift.                                                                                                                                                                                                                 |
| `GPS_RESCUE_PITCH_CUTOFF`             | First-order lowpass filter cutoff applied to the velocity D factor, to smooth out pitch jitters. Default of 75 means 0.75Hz. Slower is smoother but can result in slow wobble and poor control.                                                                                                                                                                                                                              |
| `GPS_RESCUE_IMU_YAW_GAIN`             | Sets the aggressiveness of the IMU adaptation to heading error in high-wind situations. Default is 10 (range: 5–20). Larger numbers result in a wider, slower correction for IMU heading errors. Too high may lead to endless circling.                                                                                                                                                                                      |
| `GPS_RESCUE_DESCENT_DIST`             | The distance from home at which the craft starts to descend, in metres. Shorter distances make for a more vertical descent, which can lead to an overshoot when returning quickly.                                                                                                                                                                                                                                           |
| `GPS_RESCUE_DESCEND_RATE`             | Target descend rate in cm/s during the `DESCEND` and `LANDING` phases. The descent rate at the start of the `DESCEND` phase can be up to twice this value, reducing to equal the set value by the time the craft is landing.                                                                                                                                                                                                 |
| `GPS_RESCUE_LANDING_ALT`              | The altitude above take-off point when auto-disarming is activated during descent, in metres. Also, will disarm if initiated below this altitude and within 5m of home.                                                                                                                                                                                                                                                      |
| `GPS_RESCUE_DISARM_THRESHOLD`         | Sensitivity of the auto-disarm on impact feature. If the quad is noisy and disarming early, try increasing the threshold. If too high, the quad may bounce around and fail to disarm on landing.                                                                                                                                                                                                                             |
| `GPS_RESCUE_THROTTLE_MIN`             | The lowest throttle value that can be applied by the GPS Rescue code. Heavy quads with a high throttle requirement to hover should increase this slightly.                                                                                                                                                                                                                                                                   |
| `GPS_RESCUE_THROTTLE_MAX`             | The highest throttle value that can be applied by the GPS Rescue code. Unlikely to need increasing unless the quad is very heavy or has high drag in strong wind.                                                                                                                                                                                                                                                            |
| `GPS_RESCUE_THROTTLE_HOVER`           | **Important.** The hover throttle value that approximates the value required during the fly-home phase, or will result in a steady slow climb in level mode. This is the basic throttle value about which the throttle PIDs vary throttle (within limits). It is important to set this value correctly, to ensure that the craft climbs rather than drops right at the start of a rescue, and descends in 'DO NOTHING' mode. |
| `GPS_RESCUE_SANITY_CHECKS`            | Sets what happens if the Rescue fails. See the Sanity Checks section.                                                                                                                                                                                                                                                                                                                                                        |
| `GPS_RESCUE_MIN_SATS`                 | Value 5–50. The number of satellites required, as well as a 3D fix, for the Home point to be set and to permit arming when GPS Rescue is configured. Setting this to lower values risks poor GPS control and mid-air disarms. Default is 8. With fewer than 5 satellites there is no 3D fix and altitude cannot be controlled from GPS alone.                                                                                |
| `GPS_RESCUE_ALLOW_ARMING_WITHOUT_FIX` | Option that permits arming without a home fix. See warning above — do not use for actual flights.                                                                                                                                                                                                                                                                                                                            |
| `GPS_RESCUE_THROTTLE_P`               | P gain value that increases throttle when the altitude is less than it should be, and vice versa. Too high will cause oscillation; too low leaves more work for I, causing slow oscillations / poor control.                                                                                                                                                                                                                 |
| `GPS_RESCUE_THROTTLE_I`               | I gain that increases throttle when altitude is persistently less than it should be. Too high will cause slow oscillation; too low will lead to persisting altitude error.                                                                                                                                                                                                                                                   |
| `GPS_RESCUE_THROTTLE_D`               | D gain that increases throttle when the quad is descending rapidly, and vice versa. Too high will cause oscillation and/or jittery altitude control, most noticeable early in the descent phase.                                                                                                                                                                                                                             |
| `GPS_RESCUE_VELOCITY_P`               | P gain that increases pitch angle when forward velocity is too low.                                                                                                                                                                                                                                                                                                                                                          |
| `GPS_RESCUE_VELOCITY_I`               | I gain that increases pitch angle when forward velocity is too low over a sustained period of time.                                                                                                                                                                                                                                                                                                                          |
| `GPS_RESCUE_VELOCITY_D`               | D gain that increases pitch angle when the quad decelerates (loses velocity to home).                                                                                                                                                                                                                                                                                                                                        |
| `GPS_RESCUE_USE_MAG`                  | Use magnetometer (compass) data to improve heading accuracy. Do not enable this unless the mag is calibrated and a log shows high-quality noise-free compass data.                                                                                                                                                                                                                                                           |
| `ALTITUDE_LPF`                        | The cutoff value in Hz × 100 used to smooth the altitude value. Too much smoothing leads to wobble.                                                                                                                                                                                                                                                                                                                          |
| `ALTITUDE_D_LPF`                      | The cutoff value in Hz × 100 used to smooth the altitude derivative (vertical velocity) value. This also smooths the Vario signal.                                                                                                                                                                                                                                                                                           |

## PID Tuning Suggestions

- `GPS_RESCUE_YAW_P` should be high enough that the quad rotates well enough at the chosen speed to track to home properly. If too high, the nose of the quad will wander left to right as you return. Default is pretty good.
- `GPS_RESCUE_ROLL_MIX` at 100 gives approximately the correct amount of roll to make 'co-ordinated' turns in level mode. A higher value increases the relative amount of roll:yaw and may be needed for higher speed returns. Zero means no roll at all. Use the debug `GPS_RESCUE_HEADING` to see the amount of yaw and roll applied, while comparing the attitude of the quad to the angle to home.
- **Altitude PIDs** (`GPS_RESCUE_THROTTLE_P`, `GPS_RESCUE_THROTTLE_I`, and `GPS_RESCUE_THROTTLE_D`) are best adjusted with a very low set groundspeed (e.g. 50 cm/s), the quad pointing to home when initiating GPS Return, and a relatively steep climb rate at the start. PIDs too high lead to vertical oscillations after the initial climb. D gives faster oscillations than P. There is a very big delay from pushing the motors to gaining altitude. The `GPS_RESCUE_THROTTLE` debug will be most useful — it shows throttle P and D, with the measured altitude vs. the altitude target.
- **Velocity PIDs** (`GPS_RESCUE_VELOCITY_P`, `GPS_RESCUE_VELOCITY_I`, and `GPS_RESCUE_VELOCITY_D`) are best adjusted after setting the altitude PIDs. They directly control the pitch angle of the quad. Too much P and/or D may cause slow oscillations on pitch. Too much I may cause overshoot. `GPS_RESCUE_VELOCITY` debug shows P and D with the speed to home and velocity targets. Tune these with zero I, then add I until any residual over- or under-shoot is eliminated. Too much I will cause slow ongoing wobble.
- The defaults should be 'about right' for a typical 5" freestyle quad.
- The quad targets velocity in the direction of home. If it must fly into wind, the maximum angle (set by `GPS_RESCUE_MAX_RESCUE_ANGLE`) must be sufficient for the quad to overcome the wind. `GPS_RESCUE_VELOCITY_I` is important when flying into the wind. On windy days, always confirm that the quad can overcome the wind. A lot of battery power can be consumed flying into the wind — always consider this when thinking about how far you fly out with the wind behind you.

## Expected Behaviors

- The disarm switch remains active during switch-induced failsafe, including GPS Rescue. Take care with disarm if the craft is configured to reset the home point after a disarm.
- To prevent flyaways, the low satellite sanity check will abort the rescue if the satellite count falls below half the set GPS Rescue minimum sats for a cumulative increment/decrement period exceeding 10s.
- At the point of initiation of a rescue, if basic initial sanity checks fail (e.g. not enough satellites), there is a 20s 'do nothing but hover' period before the craft disarms. This applies, for example, in video loss scenarios where the pilot hits the switch and perhaps there were not enough satellites at the time.
- Even if all sanity checks are disabled, there is an incremental up/down limit of 20s of sanity failure before the quad will be disarmed. This is a safety feature to prevent indefinite flyaways. The 'all sanity checks off' option is intended only for testing.
- The minimum velocity required for IMU orientation from a GPS over-ground path is 2m/s.
- When GPS Rescue is switch-initiated via a failsafe switch, there is no need to move the sticks more than 30% to regain control. Control is regained immediately the switch is reversed.
- GPS distance from home is measured and logged in cm (not metres) and angle in tenths of a degree (not degrees) to improve accuracy and smoothness.
- If the user initiates GPS Rescue on a switch, the Aux channels are still "live". This allows disarming, starting or stopping logging, etc., during a switch-induced failsafe. Flight channels (RPTY) will be set or held according to failsafe settings; live stick values are never passed during a failsafe, though the stick position is monitored since 30% stick wiggling is needed to exit GPS Rescue by stick movement.
- For all switch-initiated rescues, if the pilot realises the rescue is failing, the switch should be reverted and the pilot should regain control before the situation becomes irrecoverable.
- Pitch angle change is limited to 25 deg/s.
- Ascent and descent rates are user-configurable.
- Max descent rate, when dropping from considerable height, is 2× the configured descent rate, reducing proportionally to the set descent rate as the craft gets closer to ground level.
- Roll is mixed with the yaw correction to better maintain the intended path to home, especially in wind.
- The default amount of roll is set as a percentage of the yaw value, with the default at 100 resulting in equal roll and yaw for small yaw rates, linearly reducing to no roll component at high yaw values.
- GPS Rescue settings are included in the Blackbox log header fields.

## Problems and Solutions

| Problem                                     | Solution                                                                                                                   |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Can't arm                                   | GPS hasn't enough satellites. 10 is best. Be patient.                                                                      |
| Floats around on switch initiation          | In "Do nothing" mode due to failure to initialise; reverse the switch                                                      |
| Doesn't level out for 1 second              | Wasn't set to enter level mode in Stage 1 failsafe                                                                         |
| Suddenly drops on initiation, but recovers  | Stage 1 throttle value set too low, or not set                                                                             |
| Drops 1s after initiation, stays low        | GPS Rescue hover throttle value set too low                                                                                |
| Tracks to one side during return            | Level mode not calibrated properly, or calibration lost during flight                                                      |
| Drifts in final landing phase               | Level mode not calibrated properly, or lost calibration during flight                                                      |
| Disarms while flying home                   | Not within 50% of target velocity or altitude for 20s or more in fly-home phase                                            |
| Altitude on return consistently low or high | Hover value not set correctly, not enough throttle I                                                                       |
| Altitude on return randomly low or high     | GPS altitude drift — check its stability before takeoff                                                                    |
| Altitude overshoots at start                | Normal behavior                                                                                                            |
| Altitude droops below target at start       | Set a higher altitude buffer if using current altitude (`gps_rescue_alt_buffer`); or throttle P and D too low              |
| Altitude wobbles quickly during return      | Throttle P and D too high                                                                                                  |
| Altitude wobbles slowly during return       | Throttle I too high                                                                                                        |
| Long delay before turning                   | Delay reaching target altitude — large climb distance with ascent rate too slow, or hover value too low                    |
| Goes in wrong direction on initiation       | Didn't fly forward at > 2m/s long enough for IMU to calibrate to GPS; or Mag is reporting bad information                  |
| Pitch wobbles up/down quickly during return | Normally present; Pitch P and D may be too high                                                                            |
| Pitch wobbles up/down slowly during return  | Pitch P and D are too low, or pitch I is too high                                                                          |
| Overshoots target on landing                | Pitch I is too high; descent too fast or short                                                                             |
| Yaw wobbles left/right all the time         | Yaw P too high (unusual)                                                                                                   |
| Yaw control is loose                        | Yaw P too low (likely only on large machines)                                                                              |
| Landing is hard and doesn't disarm          | GPS altitude drift downwards; hits ground before landing altitude is reached — check GPS altitude stability before takeoff |
| Large control jumps every second            | GPS unit is reporting values only once a second; if NMEA, switch to UBlox mode                                             |

## Sanity Check Options

Sanity checks monitor the rescue for both switch-induced and real loss GPS Rescues. They are last-ditch responses to a failure of the rescue process, validating that:

- The Rescue system has a Home Point to aim at
- The craft is outside the minimum distance at the start of the rescue
- Satellite count is OK at the start of the rescue
- The satellite count stays OK during the rescue
- During the `ASCEND` phase, the quad is not stuck in a tree or otherwise can't climb
- During the `FLY_HOME` phase, that velocity to home is at least half the set velocity
- During the `LANDING` and `DESCEND` phases, that the descent rate is at least half the set descent rate (not stuck in a tree)

When a sanity check fails, it means that the craft cannot complete the rescue successfully. After some reasonable time, the craft will be disarmed so that it will fall without travelling much further, climbing too high, flattening the battery, or burning the motors. Each possible failure has a 'grace period' before the quad will disarm.

Sanity checks do not cover every failure possibility — there is no check on absolute altitude during the fly-home phase, for example. False or erratic GPS data may send the craft the wrong way without any way of knowing, and may also falsely trigger a sanity check or prevent it from identifying a true failure.

There are three sanity check modes:

- `RESCUE_SANITY_ON` — Strongest sanity check behavior, with immediate disarm for hard errors like loss of GPS communication, flyaway, low sat count, and no home point on initiating the rescue. Same behavior whether the rescue is 'real' or switch-initiated.
- `RESCUE_SANITY_FS_ONLY` — **Default mode.** Strong sanity check behavior for true RC link loss, but additional time to reverse the switch for switch-initiated failsafe. For example, the quad will enter "Do Nothing" mode for 20s if a rescue is initiated by switch and there is no Home Point.
- `RESCUE_SANITY_OFF` — Intended for testing only. The quad will immediately disarm only if arming without a Home Fix was permitted, there is no Home Fix, and there is a hard (Rx Link Lost) failsafe. In all other cases a failed sanity check results in "Do Nothing" mode for 20s and then a disarm. Does not turn all sanity checks completely off — this is a safety feature to prevent indefinite flyaways.

For sanity checks with a time element, a cumulative up/down counter is used: the counter increases by 1 every second the value is 'bad', and decreases by 1 every second it is 'good'. Once the accumulator reaches the timeout, the sanity check fails.

| Mode                                | `SANITY_ON`, or true failsafe in `SANITY_FS_ONLY` | Stick-induced `SANITY_FS_ONLY`, or `SANITY_OFF` | Notes                                                                                     |
| ----------------------------------- | ------------------------------------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------- |
| No Home Fix on initiation           | Immediate disarm                                  | `Do_Nothing` for 20s then disarm                | Usually it is impossible to arm with no home fix.                                         |
| Initiate inside min DTH             | Immediately enters landing mode                   | Immediately enters landing mode                 | Craft should slowly land itself and disarm on touch-down                                  |
| GPS hardware failure                | Immediate disarm                                  | Disarm after 10s                                | Should never occur mid-flight                                                             |
| Initiate but in crash recovery mode | Immediate disarm                                  | Disarm after 10s                                | GPS Rescue cannot function while in crash recovery mode                                   |
| Climb Phase failure                 | Disarm after 10s                                  | Disarm after 10s                                | Climb rate less than half the set rate for cumulative 10s                                 |
| Low Sats                            | Disarm after 10s                                  | 10s, `Do Nothing` for 20s, then disarm          | Sat count less than half the GPS Rescue minimum number for cumulative 10s                 |
| FlyHome failure                     | 15s then disarm                                   | 15s, `Do Nothing` for 20s, then disarm          | Can't maintain at least half the set velocity in the direction of home for cumulative 15s |
| Landing Phase failure               | 10s then disarm                                   | 10s then disarm                                 | Descend rate less than half the set rate for cumulative 10s                               |

- 'Do Nothing' centers sticks and hovers to give the user time to reverse the failsafe switch, or in case you get lucky and signal comes back.

Switch-initiated GPS Rescue may be helpful when FPV video is lost — the quad should quickly climb high enough to get video back. If the video has not come back within 20–30s, it's best to undo the failsafe switch, disarm, and start searching. This will keep the quad relatively close to the point of video loss, and retain battery capacity.

## GPS_RESCUE_ALLOW_ARMING_WITHOUT_FIX

When GPS Rescue is enabled, arming is not permitted unless there is a GPS position fix and at least the required minimum number of satellites (set by `gps_rescue_min_sats`). This check can be bypassed by enabling `allow_arming_without_fix`.

When arming is permitted without a fix, and the machine is armed without a Home Point being set, and a GPS Rescue is initiated, the craft will go into 'do nothing' mode (slow descent with landing detection enabled) for 20s then disarm. This will happen both for true RC Link loss failsafe and for switch-initiated failsafe tests. It will not fly home under any circumstances, because it has no clue where home is.

**Never allow arming without a home point fix if you want GPS Rescue to get you home!**

This option exists only for testing purposes.

## Debugs

There are several debugs for GPS Rescue. The `GPS_RESCUE_TRACKING` debug gives a good overview of set vs. achieved altitude and velocity. For altitude PID tuning, use `GPS_RESCUE_THROTTLE`; for velocity PID tuning, use `GPS_RESCUE_VELOCITY`. The `GPS_RESCUE_HEADING` debug is useful for checking heading-related information and comparing GPS headings to magnetometer headings.

All GPS configuration settings are included in the Blackbox log header.

| Name                  | Debug0                     | Debug1                    | Debug2                                   | Debug3                                           | Debug4         | Debug5          | Debug6               | Debug7               |
| --------------------- | -------------------------- | ------------------------- | ---------------------------------------- | ------------------------------------------------ | -------------- | --------------- | -------------------- | -------------------- |
| GPS_RESCUE_THROTTLE   | Throttle P                 | Throttle D                | Current craft altitude, cm               | Target altitude cm                               | Throttle I     | Tilt adjustment | Un-smoothed D        | Throttle adjustment  |
| GPS_RESCUE_VELOCITY   | Velocity P                 | Velocity D                | Current craft velocity cm/s              | Target velocity cm/s                             | Velocity I     | Un-smoothed D   | iTerm Relax          | Pitch Angle cmd      |
| GPS_RESCUE_TRACKING   | Velocity to home cm/s      | Target velocity cm/s      | Current craft altitude cm                | Target altitude cm                               | Attitude (deg) | Angle to Home   | Throttle value       | Roll added (deg×100) |
| GPS_RESCUE_HEADING    | Yaw rescue rate deg/s × 10 | Roll angle degrees × 1000 | Estimated craft heading deg × 10         | Estimated angle to home                          | (not used)     | Roll attenuator | Roll added (deg×100) | Yaw rate (deg/s)     |
| GPS_RESCUE_CONNECTION | GPS dyn model requested    | GPS Nav Data interval ms  | Time since last Nav data ms              | Baud rate requested                              | Conn. State    | Execute time us | Ack state            | Rx buffer size       |
| RTH                   | Max Altitude               | Current Altitude          | Rescue failure code (×10) + Rescue Phase | Seconds failing sanity (×100) + Seconds low sats | (not used)     | (not used)      | (not used)           | (not used)           |
| ALTITUDE              | GPS Trust × 100            | Baro Altitude cm          | GPS Altitude cm (zeroed on arming)       | Vario                                            | (not used)     | (not used)      | (not used)           | (not used)           |
| ATTITUDE              | AccADC Roll                | AccADC Pitch              | cogYawGain × 100                         | ez_ef × 100                                      | Craft velocity | Groundspeed err | pitch angle × 100    | dcmKpGain × 100      |

Notes:

- Baro Altitude is zeroed and smoothed on arming
- Vario is smoothed only while armed, and is only present if Vario is enabled in the firmware build
- GPS connection Nav Data interval is the time between GPS packets by comparing their timestamps
- GPS connection time since last Nav data is a stepped ramp, stepping up each time the GPS code runs, and resetting when new Nav data arrives
- GPS connection dynamic model requested is normally 1 (default acquire model) at the start and 7 (default flight model) when we gain a 3D fix
- GPS connection state is calculated as main State × 100 + step, e.g. 413 is in the `CONFIGURE` main state, at step 13
- GPS connection Ack state is calculated as 0 = `IDLE`, 1 = `WAITING`, 2 = `ACK`, 3 = `NACK`

**Rescue Phase Codes**

```text
0    RESCUE_IDLE
1    RESCUE_INITIALIZE
2    RESCUE_ATTAIN_ALT
3    RESCUE_ROTATE
4    RESCUE_FLY_HOME
5    RESCUE_DESCENT
6    RESCUE_LANDING
7    RESCUE_ABORT
8    RESCUE_COMPLETE
9    RESCUE_DO_NOTHING
```

**Rescue Failure Codes**

```text
0    RESCUE_HEALTHY
1    RESCUE_FLYAWAY
2    RESCUE_GPSLOST
3    RESCUE_LOWSATS
4    RESCUE_CRASH_FLIP_DETECTED
5    RESCUE_STALLED
6    RESCUE_TOO_CLOSE
7    RESCUE_NO_HOME_POINT
```

**Normal RTH Debug 2 Progression**

| Code | Phase               | Notes                                          |
| ---- | ------------------- | ---------------------------------------------- |
| 0    | `RESCUE_IDLE`       | Normal phase when no rescue is active          |
| 1    | `RESCUE_INITIALIZE` | Usually too brief to be seen in OSD or log     |
| 2    | `RESCUE_ATTAIN_ALT` | Climbing phase, no yaw                         |
| 3    | `RESCUE_ROTATE`     | Rotating (yawing)                              |
| 4    | `RESCUE_FLY_HOME`   | Pitches forward and flies home at set altitude |
| 5    | `RESCUE_DESCENT`    | Slows down and descends                        |
| 6    | `RESCUE_LANDING`    | Below landing altitude, waiting to hit ground  |
| 8    | `RESCUE_COMPLETE`   | Too brief to be seen in OSD                    |
| 0    | `RESCUE_IDLE`       | Returns to idle                                |

There should never be a failure code in the 'tens' column of Debug 2; the failure code should always be zero, meaning `RESCUE_HEALTHY`. An active failure code will trigger either `RESCUE_DO_NOTHING` (9), `RESCUE_LANDING` (6), or `RESCUE_ABORT` (7), depending on the settings.

**Some RTH Debug 2 Error Examples**

| Code | Failure            | Phase               | Notes                                                  |
| ---- | ------------------ | ------------------- | ------------------------------------------------------ |
| 17   | `RESCUE_FLYAWAY`   | `RESCUE_ABORT`      | Aborted the rescue due to a fly-home failure           |
| 19   | `RESCUE_FLYAWAY`   | `RESCUE_DO_NOTHING` | Entered a `DO_NOTHING` state due to fly-home failure   |
| 39   | `RESCUE_LOWSATS`   | `RESCUE_DO_NOTHING` | Entered a `DO_NOTHING` state due to low sat count      |
| 69   | `RESCUE_TOO_CLOSE` | `RESCUE_DO_NOTHING` | Entered `DO_NOTHING` phase due to initiation too close |

**RTH Debug 3 (Sanity Check Counter)**

Debug 3 should normally be zero. If the sanity check timeout counter is non-zero, the value will be shown in the hundreds column:

- Values in the hundreds indicate the time in seconds that the sanity timer has accumulated
- Values in the units digits indicate the accumulated low-sat time

| Code | Notes                                                                        |
| ---- | ---------------------------------------------------------------------------- |
| 0    | Normal state — sanity check timers are zero, sats are more than half minimum |
| 100  | A sanity check has failed for 1s; satellite count is good                    |
| 200  | A sanity check has failed for 2s; satellite count is good                    |
| 1203 | A sanity check has failed for 12s; satellite count has been low for 3s       |

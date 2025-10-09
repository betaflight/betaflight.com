---
sidebar_position: 2
sidebar_label: 4.5 Release Notes
---

# 4.5 Release Notes

Betaflight 4.5 is an incremental release. The basic flight parameters have not changed from 4.4 to 4.5, although iTerm is slightly better suppressed.  Previous filters, PID settings, and other tuning values should not need to change.

:::note
IMPORTANT: use Configurator 10.10!  The most recent release version is available [here](https://github.com/betaflight/betaflight-configurator/tags), or use the [online app](https://app.betaflight.com).
:::

As usual, Full Chip Erase is mandatory when flashing. Re-configuring from scratch is safer than importing a CLI dump or a saved Preset.  Users of GPS Rescue, Angle and Horizon modes shold NOT use their old values.  Otherwise, most flight, Rx, Mode, OSD, and GPS parameters have not changed since 4.4.  Any new or re-named parameters will get default values, so importing a 4.4 save file (Presets>Save) is, in most cases, OK.

If the `OSD_HD` option is included in the build, after a clean flash, all relevant OSD setups values will suit HD video.  Analog users should visit Configurator's OSD tab and change the Video Format to either Auto, NTSC or PAL, and save.  If only `OSD_SD` is included in the build, a clean flash will default to Analog OSD settings.

:::note
If you are using a digital VTX with HD OSD and are having issues with OSD elements or the entire OSD not showing up, enter `set displayport_msp_fonts = 0,0,0,0` in the CLI followed by `save` to disable multi-page fonts until support is added for your VTX.
:::

:::warning
Angle, Horizon and GPS Rescue users should NOT use previous values in 4.5.  Start out with the new 4.5 defaults!
Do not use 4.3 or earlier dumps or Presets in 4.5!
Always test new firmware carefully and in a controlled environment!
:::
 
## Contents

- [Cloud build](#1-cloud-build) is simpler, more reliable, and more polished.
- [GPS Hardware connections](#2-gps) are far better, with rock solid M10 support.
- [GPS Return to Home](#3-gps-return-to-home-improvements) has been made more reliable, smoother, can be initiated earlier, is more tolerant of user error, and uses Mag data more effectively.
- [Magnetometers](#4-magnetometer-update) now work much better than before, with improved information in the wiki, better calibration methods, declination support, and improved display in Configurator.  It now contributes effectively during climb, rotate and descent phases of a GPS Rescue.
- [GPS Mapping in Blackbox](#5-mapping-of-gps-flights-within-blackbox-explorer-and-with-export-gpx) Map your GPS flights directly within the BlackBox application, or by exporting the flight data into a GPX file for use in online mapping software.
- [Colour font support for HD VTx](#6-colour-fonts-in-supported-hd-vx) This applies to Walksnail HD Vtx only at present
- [LED Strip improvements](#7-led-strip-improvements) including automatic colour selection based on the VTx channel, more Rainbow options, and more efficient use of CPU time for complex LED options.
- [Angle and Horizon updates](#8-angle-and-horizon-mode-update) Really big changes here.  Angle mode is now much more responsive. The new 'Earth referencing' option keeps automatically adds just the right amount of 'co-ordinated' roll to keep the image stable while yawing. Horizon mode is a lot more fun to fly, and is an excellent introduction to Acro.
- [Failsafe changes](#9-failsafe-changes) Minor changes only, mostly to improve safety in edge cases, with a minor change to the `RX_LOSS` message and with `NOT_DISARMED` replacing `BADRX` when the radio link becomes active while the arm switch is enabled.
- [Dimmable RPM harmonics](#10-dimmable-rpm-harmonics) Allows attenuation of individual RPM harmonics if one of the three RPM filters isn't needed as much as the other two.  This can slightly reduce overall filter lag, especially in triblade setups.
- [Adjustable initial dynamic idle value](#11-customisable-initial-dynamic-idle-percentage) This allows the user to modify the initial motor drive percentage when dynamic idle is enabled but you haven't yet taken off, in case the default of 5% is too low or too high.
- [EzLanding](#12-ezlanding) Limit PID response when throttle is low and sticks are centered, calming aggressive reactions when landing.
- [Low throttle TPA](#13-low-throttle-tpa) Allows TPA mediated inhibition at the very low end of the throttle range, for quads that are really excitable while waiting on the ground.  Optionally can be applied throughout the flight.
- [CLI binding for TBS Rx](#14-crsf-binding-via-cli-for-tbs-receivers) - Useful when you can't get to the Bind button easily.
- [Improved landings for wings](#19-other-changes-and-fixes) iTerm is now kept active for wings while gliding into land, at zero throttle.
- [Changed Soft Serial pin assignment command](#15-changed-soft-serial-pin-assignment-cli-command) Use `RESOURCE SOFTSERIALTX 1 <pin>` instead of `RESOURCE SERIALTX11 <pin>`.
- [Custom Build Options](#16-custom-build-options):
	- [RACE_PRO](#161-race-pro-build-option) Includes RPM Limiter, Quick OSD, RC Stats, Pre-arm page, and changes a few default settings.
    - [RPM Limiter](#162-rpm-limiter-build-option) Limits the maximum average RPM, for Spec racing.
    - [Quick OSD](#163-quick-osd-menu-build-option) Adds an OSD page that allows the user to make most race-related changes in one place.
    - [RC Stats](#164-rc-stats-osd-build-option) Modified Stats screen including throttle summary data. 
    - [Pre-Arm page](#165-pre-arm-spec-race-settings-osd-build-option) Pre-arm screen that displays values of relevance to spec racing
    - [GPS Lap Timer](#166-gps-lap-timer) Ever wanted to fly laps at a park and time yourself, without complicated extra hardware?  Add a GPS module and you can do exactly that.
- [Blackbox Updates](#17-blackbox-and-logging-updates) RPM and pre-filter gyro included by default, 8 channels of debug data, awesome GPS mapping options.
- [Other changes](#19-other-changes-and-fixes) RSSI now shows `dBm:channel` in diversity setups, Launch Control included always, DShot Telemetry independent of RPM filtering, Extended DShot Telementry, kaaak, many other small changes and fixes.

## 1. Cloud Build

The cloud build system [introduced in 4.4](/docs/wiki/release/Betaflight-4-4-Release-Notes#1-cloud-build) retains the same user interface, but with lots of improvements.  Updates to board configurations should result in more reliable functionality after flashing.

Most basic build options are included in the default group in the `Other Options box`, including AcroTrainer and both HD and SD OSD setups.

The default Radio Protocol is CRSF, which automatically includes RF telementry (even though the Telemetry drop-down says 'none').

Typically a user would de-select the SD OSD option if they used only HD, and vice versa.

Most users will not require Acro Trainer or Pin IO, so these can be de-selected.

To add other build options, such as other radio protocols, LED Strip, Magnetometers, etc, click somewhere in the `Other Options` box and choose from the drop-down.

Thanks to: @blckmn, unit, haslinghuis, many others

## 2. GPS

The code connecting Betaflight to a GPS Module has been thoroughly overhauled.  For the majority of users, the data from the module will be more reliable, because we reconfigure the module to send exactly what we want, when we want it, and nothing else.  This loads the MPU less and improves reliability.

:::note

Some GPS modules that 'worked' in 4.4 may not work at all in 4.5.  This is typically because the module is not responding to standard UBLox auto-configuration requests.  Such a module may 'work' in 4.5 if auto-configuration is disabled, but is not likely to be as reliable as a configurable module.  We recommend either getting a newer (and better) M10 GPS module, or using uCenter or pyGpsClient to reset the module to defaults (which should accept external configuration requests).

:::

When the FC boots, the auto-configuration code cycles the GPS Serial Port through the allowed baud rates until a successful connection is made.  Then we instruct the module to change its baud rate to match the user-requested baud rate, which defaults to 57600, and we re-connect at that baud rate.  We then detect the 'class' of GPS module (M10, M8 etc) so that we know what kind of configuration requests it will respond to, and re-configure it to send only the values we need (nav_pvt messages), and to not send any other data. This ensures that the traffic on the serial port is the absolute minimum required for our purposes.

If the FC is connected to Configurator, the full satellite information list is also requested, so that we can populate the detailed satellite information list on the left side of Configurator's GPS tab.  Otherwise this information is not requested, because we do not require it while in flight, and it adds a lot of serial port traffic when enabled.

The CPU cost and task timing for GPS data has been extensively reviewed and optimised.  Even so, GPS Rescue puts a huge load on a CPU.  For reliability it is best to use a 4k PID loop on most processors, especially at 57600 baud.  More information about CPU load vs Baud Rate is available in the [GPS Rescue 4.5 documentation](/docs/wiki/guides/current/GPS-Rescue-v4-5).  The CLI `tasks` command may be used to check CPU usage and task over-runs when evaluating the impact of baud rate in relation to PID loop frequency.

The UBlox module 'class', and the baud rate it is actually connected at, may be checked with the CLI `status` command.

The `GPS_CONNECTION` debug has been added, including a number of fields to help debug GPS task baud rates during the connection process, CPU cost, and ongoing execution times and intervals.

Note that the GPS module must be powered up at the same time as the FC for it to be correctly configured.

NMEA support is now very limited.  Using NMEA is not recommended.  Modern M10 GPS modules with a backup battery are highly recommended.

There should be no need for a user with an M8 or higher UBlox module to customise it in any way, e.g. with uCenter, unless it is somehow strangely locked and unresponsive to normal UBlox configuration commands.  They should essentially all work 'out of the box'.

The Configurator GPS has been improved a lot with a much more clear map, and a simplified and more relevant satellite information display.

Thanks to: unit(freasy), ctzsnooze, ledvinap, SteveCEvans, rabbitAmbulance, haslinghuis

## 3. GPS Return to Home Improvements

In 4.5 there was a determined effort to make GPS Rescue even more reliable and precise than in 4.4.  Many significant changes and improvements were implemented.

Task timing was carefully optimised.

Note: for most standard F4xx GPS Rescue builds, looptime should not exceed 4k, to provide enough clock cycles for all the required sensor data to be analyzed and handled properly.

In 4.4, if there was significant drift, due to wind, when initiating GPS Rescue, and a long climb period, the quad could think that it was flying nose-forward in the direction of the drift.  This caused the initial yaw correction to be wrong, and the quad would then fly off in the wrong direction, often at high speed.  After a few seconds, it would correct, but take a wide arc to return to the correct heading.  4.5 improves this considerably, with special code to avoid drift-based errors.

In 4.4, wings would have difficulty determining the correct arrow position, and this has been considerably improved in 4.5.

A lot of checking and optimising the Mag code has been done (see later), and it now integrates really well with GPS Rescue.

In 4.5, if Mag is properly oriented, configured, and calibrated, and is confirmed to return reliable heading information, the quad should rotate correctly at the start of a rescue, and point directly to home every time, regardless of drift.  This significantly improves safety of a rescue on windy days.

In 4.4, if there was a long descent phase on windy day, the quad could overshoot home and then need to turn 180 degrees to get back against the wind, which could result in a fast spiral descent with a rough landing.  In 4.5, this should be much less of a problem, because we don't start to pitch forward after an overshoot until the yaw heading is largely corrected.  In 4.5, a properly oriented, configured and validated Mag will improve heading control on windy days during the descent phase.

GPS Rescue can now be initiated directly overhead, in an emergency, eg when flying LOS, so long as the machine is more than the minimum allowed initiation height.  In this situation, the quad will climb, fly out to the minimum distance, turn back to home, and enter a normal rescue at that point.  This should only be used in an emergency, because the heading the quad will initially take is quite unpredictable, depending mostly on prior drift direction and velocity.

The sanity checks are now a bit less intrusive and should be less likely to trigger except when they absolutely are required.  In particular, initiating too close will let it descend slowly in 'do nothing' mode until it lands or the user regains control.

The GPS tab in Configurator has been updated to include a more useful satellite list and to show the Mag heading information.

An edge case issue where the motors could spin up if the Rx link initiated at a vulnerable time, and when GPS Rescue was set to ignore home point, was fixed.

Please carefully read the [GPS Rescue 4.5 documentation](/docs/wiki/guides/current/GPS-Rescue-v4-5) for more information.

Thanks to: ctzsnooze, ledvinap, SteveCEvans, Zzyzx, haslinghuis

## 4. Magnetometer update

Magentometers now work really well.  However, it's fair to say that they are absolutely NOT plug and play.  The user will need to carefully read the documentation and absolutely must get the orientation and calibration of the mag right, and must validate that correct headings are returned (eg by comparing to a compass on a phone), regardless of the orientation of the quad.  It is quite challenging to do, but rewarding when completed.

This code was extensively revised, with a lot of improvement in compass task scheduling and driver support.

Previously, the compass task ran at 10Hz, but its state engine meant that new mag data arrived at half or a third of that rate.

In 4.5 we receive compass data values at the highest rate supported by the chip.  In the case of the QMC5883L, this is 200Hz, and for the older HMC5883L, it is 80Hz.  This greatly improves the accuracy of the calibration process, and reduces data lag issues.

The biggest improvement is in our calibration process.  It now works much better, giving consistent results, when the previous code was almost a random number generator.

We can now use `set mag_declination` in the CLI to enter our local Magnetic Declination value and better correct Magnetic to True North.

The Configurator now displays Mag Heading in the GPS Rescue tab, and rotates the icon in the map to reflect the Mag Heading (note that the map only appears after we get a 3D fix).

A [detailed note](https://betaflight.com/docs/wiki/guides/current/Magnetometer) now explains how magnetometers work, how to orient the mag and check that the orientation is correct, how to calibrate the mag and how to check the calibration, how to set the correct declination value in the CLI etc.

Users can now set up a Mag and be sure that it works.

Note that Mag units must be mounted as far as possible away from motors and high-current wires or the data will be extremely noisy, almost unusably so.  Getting clean data from a Mag on a 5in quad is quite difficult.

Important: note that after initiating a calibration, the frame of the quad must be 
'tapped' hard to start the 30s data acquisition period.  This was introduced to give the user time to get ready to start collecting data.  This tap must be done within 15s of initiating the calibration.  If no tap is detected, the old values will not be updated.

The `MAG_CALIB` and `MAG_TASK_RATE` debugs have been added to investigate calibration and scheduling issues.

Please read the [note](/docs/wiki/guides/current/Magnetometer) carefully, and test it thoroughly, before using the Mag in a GPS Rescue.  Note that the current default for GPS Rescue is to use the Mag.  If you are not 100% sure that your Mag is working, don't use it.

Thanks to: pichim, ctzsnooze, SteveCEvans, ledvinap

## 5. Mapping of GPS flights within Blackbox Explorer and with Export GPX

Two awesome mapping features for GPS users who have made a log file that contains GPS data.

`Export GPX` enables the `Export GPX` button at the top of the BBE window when a log file with GPS data is opened.  The exported `.gpx` file can be imported into online mapping software, such as [gpxStudio](https://gpx.studio), drawing your flights over a map.

Detailed explanatory video [here](https://www.youtube.com/watch?v=dhgQ8aPUq_U).
For more information see [PR 614](https://github.com/betaflight/blackbox-log-viewer/pull/614)

`Within BBE GPS Mapping` shows a smaller, simple map within Blackbox explorer itself.  To open the map, user only has to click the view/hide map icon from the `Overlay` group of menu icons (at the top of the normal blackbox screen).

The position of the quad moves over the map as the cursor moves through the file.  The colour trail can show altitude (see the 'cog' for BBE settings to configure this).

For more information see [PR 613](https://github.com/betaflight/blackbox-log-viewer/pull/613)

Thanks for both to: bonchan

## 6. Colour fonts in supported HD Vx

White, green, orange or red colours can now be used for text and symbols are now supported for compatible HD Vtx modules, eg Walksnail.

See: [PR 13005](https://github.com/betaflight/betaflight/pull/13005)

Thanks to: SteveCEvans

## 7. LED Strip improvements

### 7.1 Set RACE mode LED Strip colour automatically, based on VTx channel

The RACE LED Strip mode is a simple way to set all LEDs to a set colour.

In 4.5 the LED Strip colour can now be automatically set according to the user's VTx channel. Enter `set ledstrip_profile = RACE` and `set ledstrip_race_color = BLACK` (disabled) to activate.  The VTx should use RaceBand frequencies.  Resulting colours should be Whilte, Red, Orange, Yellow, Green, Blue, Violet, Pink for R1-R8 respectively.

The LED control page settings are ignored when the RACE `ledstrip_profile` is active.  Normal functionality is returned with `set ledstrip_profile = STATUS`.

For more information see [PR 13096](https://github.com/betaflight/betaflight/pull/13096)

Thanks to: cruwaller

### 7.2. LED Strip rainbow colour effect updates

Configurator support were added for Rainbow LED Strip effect. It can be used now at the same time with the Larson/Blink effect.
Brightness of the strip, colour delta and frequency of the Rainbow effect can be changed with sliders now.

See: [PR 12323](https://github.com/betaflight/betaflight/pull/12323), [PR 12995](https://github.com/betaflight/betaflight/pull/12995)

Thanks to: ASDosjani

### 7.3. Reduced CPU impact when using complex LED Strip effects

Complex effects like Rainbow and Larson scanner effects can require a lot of CPU time, especially when may LEDs are involved.  Mr. Steve C Evans has again helped out by limiting the task time per CPU cycle to a max of approximately 20uS.  Previously, the Rainbow effect could cost more than 100uS, causing issues at 8k8k and some 8k4k builds.

Always check your `Tasks` command in the CLI before, and after, enabling complex LED modes, to confirm that they do not require too much CPU or cause task over-runs.

Simple LED Strip functions like RACE or BEACON modes require only 5-6uS.

See: [PR 13218](https://github.com/betaflight/betaflight/pull/13218)

Thanks to: Mr. Steve

## 8. Angle and Horizon Mode update

Angle and Horizon modes are completely different from 4.4.

Angle mode is a lot snappier, due to `angle_feedforward`.  High angle P values, which used to cause oscillation, are no longer needed.  At P values which do not oscillate, the responsiveness to stick inputs is much quicker, so there's no need for high angle P anymore.

Angle mode now uses the user's RC Rate settings to determine stick feel, facilitating the transition to Acro or Horizon.  Angle no longer has its own specific stick configuration via the old angle expo commands.  Angle mode users can use Rates Profiles to store up to four different Rates configurations for use in angle mode, and swap in-flight.  The center sensitivity value in Angle Mode is shown in the lower right corner of Configurator's  Rates Graph. For more information about setting Rates, see [PR 12231](https://github.com/betaflight/betaflight/pull/12231).

Angle Mode will feel very different from before, partly because the stick response is so much quicker, and partly because the rates curve method is very different.  Once re-configured, the new method makes the transition to Horizon and Acro much smoother.

Angle Mode is now 'earth referenced' by default.  This means that a pure yaw stick input, while pitched forward, will result in a perfectly coordinated turn.  This code, by Chris Rosser, mixes in exactly the right amount of roll so that the horizon stays 'level' in the camera.  It also helps stabilise the quad during fast yaw inputs in Angle mode and improves GPS Rescue.

Roll inputs in angle mode will always add extra roll, and the 'horizon' in the camera will respond accordingly, if that's what the pilot wants to achieve.

The earth referencing behavior can be disabled with `set angle_earth_ref = 0`, or its strength halved with `set angle_earth_ref = 50`.  Whoop racers may well prefer to disable it, however most beginners, and anyone doing cinematic shooting in Angle mode, should find it really nice.

Angle and Horizon mode motor control is now significantly smoother, due to filtering refactoring and optimisation.  This reduces motor heat and camera jello.

Horizon mode has been changed a lot.  Horizon mode provides self-levelling when the sticks are centered and the quad is close to being flat, but flies like acro at higher stick angles or when the quad is steeply angled.  The 'self-levelling' strength, when the sticks are in the center region and the quad is nearly flat, can be as strong, or as gentle, as the pilot likes.  The angle of the frame at which there is no self-levelling can als be adjusted.  With the default settings, flips and rolls to be performed, and even inverted hangs, because by default there is a 'null' or 'no-levelling' zone while fully inverted (just like acro).  Take care... and have fun!

For more information, and sample configuration snippets, see [PR 12231](https://github.com/betaflight/betaflight/pull/12231)

Thanks to: ChrisRosser, ctzsnooze, ledvinap, haslinghuis

## 9. Failsafe changes

Failsafe indicators at the time on Rx loss are slightly different, and some safety related issues have been fixed.

If `RXLOSS` is triggered by 100ms of no valid data, the message will appear in the OSD for a minimum period of 1.0s, instead of clearing immediately.  This is consistent with the arming block after Rx loss, which persists for 1.0s by default, even a brief loss of signal.

The change prevents a potentially dangerous arming conditions which could arise if GPS Rescue was active and the Rx signal at arm time was unreliable, or the user armed then quickly disarmed.

Additionally, on restoration of signal, the `failsafe_recovery_delay` period is now 500ms, recovering twice as fast as before after signal is restored.

Finally, the `BADRX` OSD message now says `NOT_DISARMED`.  This occurs when the Rx signal has recovered, or has just been detected, but the arming switch has been left in the Armed position.  The new message provides a better explanation to the user that they must Disarm before attempting to re-arm after signal loss.

For more information, see [PR 13033](https://github.com/betaflight/betaflight/pull/13033).

Thanks to: ctzsnooze

## 10. Dimmable RPM Harmonics

With this feature, the user can adjust the 'strength' or 'weight' of each of the three RPM filters, individually.  A weight of 100 applies the filter at full strength, while 0 means 'completely off'.  The Q factor of the RPM filter still sets the 'width' of each filter.

With a triblade prop, there are typically three harmonics of the motor frequency that generate RPM-dependent noise:
- the first harmonic of the motor frequency is at the same frequency as the motors, in Hz, and typically is the strongest,
- the second harmonic, which is at twice the motor frequency, and
- the third harmonic, which is at three times the motor frequency.

In many tri-blade situations, we usually see three harmonics.  Typically the first is strongest, the second almost invisible, and the third is a bit less than the first.

The relative strength of each harmonic may be visualised if a blackbox log is recorded.  A throttle vs frequency or rpm vs frequency spectrum graph, from un-filtered gyro, can be compared to 'filtered' gyro.  Typically, with the default filtering, we see very strong attenuation of all three harmonics.

With tri-blade pops, the second harmonic often needs very little filtering to reduce its noise contribution to acceptable levels.  The third harmonic may need less filtering than the first.

With this feature, we could, for example, use `set rpm_filter_weights = 100, 0, 80`.  This effectively disables the second harmonic and applies 80% of the normal filter strength to the third harmonic.  Previously it was not possible to selectively remove the second harmonic filter, but now we can.  By checking the end result in a log, we can now use only just as much RPM filtering as we need.

The main benefit of this is reduced filter delay, compared to running all three filters at full strength, and this may improve propwash.

With bi-blade props, we typically only see a first harmonic and a weaker second harmonic.  We may find that `set rpm_filter_weights = 100, 80, 0` gives acceptable results.

Note that the Q factor sets the 'width' of the RPM filter, with the same value being applied to each filter.

This is an advanced tuning option because sometimes the motor noise in a spectrum from un-filtered gyro can seem acceptable, but those small amounts of residual motor noise in the post filter gyro can cause a large effect downstream in Dterm. Hence we recommend using the frequency PSD spectrogram in PID toolbox, or making a spectrum from the D value or a motor trace in Blackbox Log viewer.  It's best to have only just enough RPM filtering that the motor harmonic lines are only just not visible in a D or motor trace spectrum.

If in doubt, when fine-tuning RPM filters with tri-blades, we recommend enabling all 3 RPM RPM filters, and start by making all three RPM filters narrower, by stepwise increasing the Q from the default of 500 up to a max of 1000, and checking the noise at each step. After this we can use this feature to reduce the weight of the 2nd and 3rd harmonic individually, and assess the impact on overall noise.

For more information, see [PR 12838](https://github.com/betaflight/betaflight/pull/12838).

Thanks to: karatebrot, mikeNomatter, SupaflyFPV, bw1129

## 11. Customisable initial Dynamic Idle percentage

After arming, but before airmode activates, dynamic idle is active but the maximum allowed throttle increase is limited.  Previously that limit was 5%.  In 4.5 we still default to the original 5%, but the limit can now be customised in the CLI, to a higher or lower value, using the `dyn_idle_start_increase` parameter.  A value of 50 means 5%.

A higher value can be useful if the motors need a higher idle value to spin properly on arming when Dynamic Idle is active, and conversely if large motors spin well at low idle percentage, it can be reduced.

For more information, see [PR 12432](https://github.com/betaflight/betaflight/pull/12432).

Thanks to: tbolin

## 12. EzLanding

This is a newly developed feature, CLI only, that makes landings less bouncy, even when airmode is on.  This is achieved by restricting the amount to which airmode can increase throttle, and by attenuating iTerm, when throttle is low and sticks are centered.

EzLanding is disabled by default.

- To enable, go `set mixer_type = EZLANDING` in CLI.
- To return to normal behavior, go `set mixer_type = LEGACY` in CLI.

There are two tuning parameters:
- `ez_landing_limit`: Default: 5, Range: 0-75. Allowed maximum percentage throttle increase via airmode, with sticks centered and throttle at zero. Higher values provide a bit more stability when perching or in flat drops. Lower values make landings less bouncy.
- `ez_landing_threshold`: Default: 25, Range: 0-200. Percentage stick deflection at which airmode is given full authority to adjust the throttle, with linear attenuation towards the center

The EzLanding effect is strongest when the sticks are centered and throttle is at zero.  Under these conditions there will be a small reduction in PID stabilisation. To retain a bit more stability, eg when trying to 'perch' on an object, or during flat or inverted zero throttle drops, retain a tiny bit of throttle during the move.

For more information, see [PR 12094](https://github.com/betaflight/betaflight/pull/12094).
Debug: `set debug_mode = EZLANDING`

Thanks to: : tbolin

## 13. Low throttle TPA

Allows the user to apply TPA attenuation in the low end of the throttle range.  In highly tuned quads, this may help avoid excessive D shaking at low throttle values.

The threshold or break point is set by `tpa_low_breakpoint`, and the magnitude of the attenuation at zero throttle is set by `tpa_low_rate`.  The default value for `tpa_low_rate` is 20, which means a reduction in D of 20%, or that the D effect in the PIDs  will be 80% of normal, at zero throttle.

By default, the default behavior is to apply the reduction only briefly after arming.  Once until the throttle is raised above `tpa_low_breakpoint`, TPA lower is inactivated for the rest of the armed period.

Hence, by default, there will be only a minimal effect on arming, and no effect in flight..

If the user wants TPA reduction to be active at low throttle during the flight, use `set tpa_low_always = ON`.  TPA will now attenuate whenever throttle is low.

For more information, see [PR 13006](https://github.com/betaflight/betaflight/pull/13006).

Renaming of the TPA low CLI variables [PR 13206](https://github.com/betaflight/betaflight/pull/13206).

Thanks to: pichim

## 14. CRSF binding via CLI for TBS Receivers

Allows the user to initiate binding on their TBS receiver by entering `bind_rx` in the CLI, rather than pulling the quad apart to get to the bind button.  If successful, the CLI outputs `binding...` and the Rx starts blinking a green LED, indicating that has entered binding mode

For more information see [PR 13119](https://github.com/betaflight/betaflight/pull/13119).

Thanks to: @Auster

## 15. Changed Soft Serial Pin assignment CLI command

For Betaflight 4.5 and higher, Soft Serial pin assignment must be made using CLI commands in the form `RESOURCE SOFTSERIALTX 1 <pin>`

| New Command | Old Command |
| ------- | -------- |
| `RESOURCE SOFTSERIALRX 1 <pin>` | `RESOURCE SERIALRX11 <pin>` |
| `RESOURCE SOFTSERIALTX 1 <pin>` | `RESOURCE SERIALTX11 <pin>` |
| `RESOURCE SOFTSERIALRX 2 <pin>` | `RESOURCE SERIALRX12 <pin>` |
| `RESOURCE SOFTSERIALTX 2 <pin>` | `RESOURCE SERIALTX12 <pin>` |

A maximum of two Soft Serial ports can be enabled. For more information, see the [SoftSerial guide](/docs/wiki/guides/current/SoftSerial).

:::note

Copying a diff file from 4.4 or earlier into 4.5, with defined Soft Serial pins, will generate an error.  You'll need to re-define those pins in the CLI with the new commands.

:::

Thanks to: DieHertz

## 16. Custom build options

These are additional code blocks that will only be available if they are built into the firmware that is flashed onto the FC. They are optional because either they are still in development, or cater for the requirements of a small group of users.  At some point, if they become popular, we may merge them into the master code; for now, they are custom build options.

When making an online build, the user includes the name of the build option in the Custom Defines field.  More than one such option can be included, separated by spaces, eg `OSD_QUICK_MENU RC_STATS`.

:::note
When making a build in a Terminal on your local computer, the build option must be preceded by `DUSE_`.  This is not necessary for a cloud build.
:::

The following build options were added in 4.5: 

### 16.1 RACE PRO build option

The `RACE_PRO` option can be selected from the "Other Options" dropdown or typed into the "Custom Defines" field on the Firmware Flasher tab. This option includes the following features (described in details further in this document):
- RPM Limiter
- Quick OSD Menu
- RC Stats
- Pre-Arm Spec Screen
- Some firmware default settings changes

![RACE_PRO option](/img/race_pro.png)

`RACE_PRO` modifies some default settings, making it more convenient for racers by eliminating the need for manual adjustments:
- `small_angle` is set to 180 (instead of the default 25), allowing a drone to be armed at any angle or orientation.
- Activates the DShot motor beeper when set on a switch.
- `failsafe_recovery_delay` is reduced to 1 (from the default 5), enabling quicker recovery after a failsafe (100ms), which is particularly useful in team racing scenarios.
- Alters the post-flight statistics screen defaults.

:::warning
`RACE_PRO` is not recommended for beginners, as some of the `RACE_PRO` default settings are generally less safe. It is advised to fully understand all the `RACE_PRO` changes before including in the firmware build.
:::

### 16.2 RPM Limiter build option

This limits the max average RPM to a user-specified value, and is primarily intended to help standardise quad behavior for Spec Racing.  

RPM Limiter actively limits the average rpms across all active motors.  For example, `set rpm_limit_value = 13000` will limit average RPM to 13000.

When racing with matching props and weight, the rpm limiter is designed to level the playing field. 

It can also be used to compare propellers and current consumption, e.g. by checking GPS speed at full throttle, or lap time (for expert racers).

:::note
RPM_LIMIT is *not* a substitute for motor limit, because it does not limit motors individually. But RPM limit can be combined with motor limit for high KV high voltage builds.
:::

To use:
- include `RPM_LIMIT` to Custom Defines when building
- set `motor_kv` correctly.
- ensure the motor magnet count is correct
- ensure that DShot telemetry is active
- set a suitable rpm limit value in CLI
- enable or disable with `set RPM_LIMIT` to on or off, in CLI, or with Quick menu

The accuracy of the RPM limit control function can be modified by tuning the RPM_LIMIT PIDs (advanced users only).

For more information see [PR 12977](https://github.com/betaflight/betaflight/pull/12054)

This feature is included with `RACE_PRO` option.

Thanks to: Tdogb, Limonspb, karatebrot

### 16.3 Quick OSD Menu build option
 
This is a custom build option which adds a 'quick menu' to the OSD.  It is particularly useful for spec racers who need to easily configure and display throttle and RPM limits.

To use: include `OSD_QUICK_MENU` in Custom Defines when building, and enter `set osd_use_quick_menu = ON` in the CLI

For more information see [PR 12977](https://github.com/betaflight/betaflight/pull/12977)

This feature is included with `RACE_PRO` option.

Thanks to: limonspb

### 16.4 RC Stats OSD build option
 
This is a custom build option which adds flight throttle statistics, such as time on 100% throttle and average throttle, to the post-flight stats pages.

To use: include `RC_STATS` in Custom Defines, when building.

For more information, see [PR 12978](https://github.com/betaflight/betaflight/pull/12978)

This feature is included with `RACE_PRO` option.

Thanks to: limonspb

### 16.5 Pre-arm Spec Race settings OSD build option
 
This is a custom build option which adds a special "prearm" OSD screen for racers, particularly spec class racers, where both pilot and race organisers can verify the settings. 

The OSD will show:
- RPM limit settings, 
- throttle limit, 
- motor limit, 
- current &voltage, and
- Betaflight version.

The screen disappears upon arming. It is helpful especially for spec racers and race organizers to verify the settings.

To use: include `SPEC_PREARM_SCREEN` in Custom Defines, when building, and then enable with `set osd_show_spec_prearm = ON`.

For more information, see [PR 13210](https://github.com/betaflight/betaflight/pull/13210)

This feature is included with `RACE_PRO` option.

Thanks to: limonspb

### 16.6 GPS Lap Timer

This is a custom build option that allows the user to define a starting gate, fly a 'track' and return through the 'gate' and see the current lap time, the previous lap, and fastest three, in the OSD.  At the end of the flight, the best lap and time of the best three laps is shown in the OSD.  See this [video](https://www.youtube.com/watch?v=TA5cWwFafY4).

Requires GPS in the firmware build, and a GPS module with good enough signal reception to track location even when the quad at a steep angle.  Basic configuration is to add the relevant fields to the OSD display, and in Modes, enable 'Lap Timer Reset' on a switch.  At the field, the quad is placed at the start/finish gate, and `MISC/GPS LAP TIMER/SET POSITION` is activated until the gate is known.  The gate 'tolerance' or 'size' can be adjusted, and the minimum lap time can be used to avoid false triggers when some other gate is close to the main start-finish gate.  Go `Save Exit` to store the settings and do some laps!  

The minimum lap time and the gate size are saved between batteries (?), but the start/finish gate must be re-set each battery(?).  With M10 battery-backed up GPS the new location should be detected quickly, but for best results wait a while until the GPS position is stable before locking in the gate position.  

To use: include `GPS_LAP_TIMER` in Custom Defines, when building, and watch the [video](https://www.youtube.com/watch?v=TA5cWwFafY4). for detailed setup and usage instructions and tips.

For more information see [PR 11856](https://github.com/betaflight/betaflight/pull/11856)

Thanks to: SpencerGraffunder

## 17. Blackbox and logging updates

Un-filtered gyro and RPM data are now logged by default.  Enabling the `gyro_scaled` debug isn't needed any more for basic spectral analysis of pre- and post- filter noise in Blackbox Log Explorer.  The latest version of PID Toolbox can read this un-filtered gyro directly, but if you're using software that expects `gyro_scaled`, then set it as usual.

Blackbox now supports 8 channels of data per debug.  Not all debugs have been updated to take advantage of this, but it is extremely helpful when developing.

All eight Debug values also can be shown graphically, and named correctly, in Configurator's Sensors Tab.

A number of new debugs have been added, and their display in Blackbox should be correct.

Blackbox GPS Map display, and GPX export to enable external GPS mapping, provide awesome mapping options.

Thanks to: Zoggbarr (tbolin), bw1129, ctzsnooze, karatebrot, McGiverGim, bonchan

## 18. Hardware support

As a result of our improving engagement with manufacturers, we were able to respond to user feedback and improve the target configs for many boards.  We are actively encouraging good design principles and working to ensure that new configurations will work reliably.

Support for the following hardware has been added:
- AT32 CPU : note only one ADC pin can be defined at present, other minor bugs may exist
- ICM-42688-P IMU
- LSM6DSV16X IMU
- LPS22DF Baro
- H725 CPU (test with caution)

ICM-42688-P and ICM-42605 were added to the list of gyros with overflow detection.

A number of H7 improvements and fixes were implemented.

Thanks to: SteveCEvans, unit(freasy), blckmn, karatebrot, sugark, haslinghuis, tbolin, belrik, bkleiner

## 19. Other Changes and fixes

- configurator: haslinghuis (our Configurator guru), nerdCopter, HThuren,  VitroidFPV, McGiverGim, chmelevskij, ASDosjani, stoneman, flaviopinzarrone, lipskij, blckmn, limonspb, asizon, atomgomba, andygfpv, Benky, shanggl, benlumley, rumpelst1lzk1n
- liaison with manufacturers: sugark, unit
- discord: unit, rabbitAmbulance, vitroid, limonspb
- user support: Vitroid, nerdCopter, BrandonBakedBeans, V-22, HRoll, hypOdermic, TechNinja, Darkmann, ctzsnooze, Sek101, Zoggbarr (tbolin), Steve Fisher, PIDToolBoxGuy, ASDojani, haslinghuis
- documentation: ctzsnooze, Vitroid, SupaflyFPV, haslinghuis, belrik
- extra testing: rabbitAmbulance, xxXyz, sek101
- all the really tough stuff: SteveCEvans, ledvinap, karatebrot

- RSSI for diversity setups now appears as `<dBm>:<channel>`.  eg -33:2 means -33dBm signal strength on diversity channel 2.
- User can now configure HD OSD reliably from Configurator
- if `OSD_HD` is defined in the build, the OSD configuration will default to HD
- Launch Control is now a standard option.
- fixed an issue where a sensor that was not enabled on power was incorrectly saved as not being enabled by the user
- DShot Telemetry is now independent of RPM Filtering, fixing minor related issues including dynamic idle: ctzsnooze, 
- Extended DShot telemetry: danielMosquera, belrik, haslinghuis
- ICM42605 added to list of gyros with overflow protection: tbolin
- DShot code stability improvements and fixes: many people
- kaaak: Limonspb
- improved support for higher ESC telemetry voltage readings
- less likely to have issues where a connected radio Tx could affect DFU
- stops softSerial adversely affecting USB on F411
- target defines updated for many boards
- best of 3 laps in the GPS lap timer fixed
- OSD VTx band/channel info fix when direct frequency is used
- Accelerometer scaling in MSP could sometimes be incorrect
- improved F7 UART behavior on boot, LED Strip fixes, 
- improved F4xx UART enable/disable
- ESC Serial fixes for HAL targets
- Improved USART pull-down behavior
- Fix for sag compensation when RPM limiting is active
- Improved at32 support: UARTs, i2c code, SITL port number, SRAM configuration, camera control, evaluation order. additional timers
- fix for USB comp port failures on some hosts
- code optimisation: karatebrot, SteveCEvans,ctzsnooze, tbolin, haslinghuis
- RPM limiter bugfixes
- sending commands to motors improved
- improved handling of invalid baro readings
- Ghost Rx code fixed on F4xx
- fixes to many board config files
- improved filter code efficiency
- refactoring of feedforward and RC smoothing to improve efficiency
- fixes for DShot beacon, ensuring DSHot 0 between beacon commands
- default the F411 to DShot300 and 4k if DShot Telemetry is enabled
- multiple cloud build fixes
- improved FF smoothing for 1000Hz Rx rates
- cleaner MPU6000 reset
- dynamic idle won't now fail if RPM filtering is turned off
- RPM Limiter fixes
- Keep i-term at zero throttle for fixed wings: Limonspb
- many other bugfixes, target updates, driver updates and fixes: valeriyvan

This is the [full list](https://github.com/betaflight/betaflight/pulls?q=is%3Apr+milestone%3A4.5) of every firmware PR considered during the development of 4.5.

Wow!  A huge THANK YOU to all our developers, testers and support people!

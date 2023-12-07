# Betaflight 4.5 Release Notes

Betaflight 4.5 is an incremental release, focusing mostly on bugfixes, optimisations, GPS Rescue improvement, Magnetometer support, and many small, useful improvements and options.

The basic flight parameters have not changed from 4.4 to 4.5.  Previous filters, PID settings, and other tuning values should not need to change.

:::note
IMPORTANT: use Configurator 10.10!  The most recent release version is available [here](https://github.com/betaflight/betaflight-configurator/tags), or you could use the [latest nightly build](https://github.com/betaflight/betaflight-configurator-nightlies).
:::

As usual, Full Chip Erase is mandatory, and re-configuring from scratch safer than importing a CLI dump or a saved Preset.  Users of GPS Rescue, Angle and Horizon modes shold NOT use their old values.  Otherwise, most flight, Rx, Mode, OSD, and GPS parameters have not changed since 4.4, and new / re-named parameters will get default values, so importing a 4.4 save file (Presets>Save) is in most cases, OK.  

:::warning
Angle, Horizon and GPS Rescue users should NOT use previous values in 4.5.  Start out with the new 4.5 defaults!
Always test new firmware carefully and in a controlled environment.
:::
 
Do not use 4.3 or earlier dumps or Presets in 4.5.

## 1. Cloud Build

The cloud build system [introduced in 4.4](https://betaflight.com/docs/release/Betaflight-4.4-Release-Notes#1-cloud-build) retains the same user interface.  Updated board configurations should result in correct default hardware assignment.

## 2. GPS

The code connecting Betaflight to a GPS Module has been thoroughly overhauled.

When the FC boots, our UBLox code cycles through all available baud rates on the GPS Port until we connect to the module.  Then we instruct the module to change its baud rate to match the requested baud rate, which defaults to 57600, and we re-connect at that baud rate.  We then detect the 'class' of GPS module (M10, M8 etc) so that we know what kind of configuration requests it will respond to, and we re-configure it to send only the values we need, and stop it sending any other data. This ensures that the traffic on the serial port is the absolute minimum required for our purposes, and reduces CPU time.

If the FC is connected to Configurator at boot time, we request the full satellite information list, so that we can populate the detailed satellite information list on the left side of Configurator's GPS tab.  Otherwise this information is not requested, because we do not require it while in flight, and it adds a lot of serial port traffic when enabled.

The CPU cost and task timing for GPS data has been extensively reviewed and optimised.  Even so, GPS Rescue puts a huge load on a CPU.  For reliability it is best to use a 4k PID loop on most processors, especially at 57600 baud.  More information about CPU load vs Baud Rate is available in the [GPS Rescue 4.5 documentation](https://betaflight.com/docs/wiki/archive/GPS-Rescue-v4-5).  The CLI `tasks` command may be used to check CPU usage and task over-runs when evaluating the impact of baud rate in relation to PID loop frequency. 

The UBlox module 'class', and the baud rate it is actually connected at, may be checked with the CLI `status` command.

The `GPS_CONNECTION` debug has been added, including a number of fields to help debug GPS task baud rates during the connection process, CPU cost, and ongoing execution times and intervals.

Note that the GPS module must be powered up at the same time as the FC for it to be correctly configured.

NMEA support is now very limited.  Using NMEA is not recommended.  Modern M10 GPS modules with a backup battery are highly recommended.  

There should be no need for a user with an M8 or higher UBlox module to customise it in any way, e.g. with uCenter, unless it is somehow strangely locked and unresponsive to normal UBlox configuration commands.  They should essentially all work 'out of the box'.

Thanks to unit(freasy), ctzsnooze, ledvinap, SteveCEvans and rabbitAmbulance for this epic effort.

## 3. GPS Return to Home Improvements

In 4.5 there was a determined effort to make GPS Rescue even more reliable and precise than in 4.4.  Many significant changes and improvements were implemented.

Task timing was carefully optimised.  

Note: for most standard F4xx GPS Rescue builds, looptime should not exceed 4k, to provide enough clock cycles for all the required sensor data to be analysed and handled properly. 

In 4.4, if there was significant drift, due to wind, when initiating GPS Rescue, and a long climb period, the quad could think that it was flying nose-forward in the direction of the drift.  This caused the initial yaw correction to be wrong, and the quad would then fly off in the wrong direction, often at high speed.  After a few seconds, it would correct, but take a wide arc to return to the correct heading.  4.5 improves this considerably, but without a Mag, it still can happen, to some extent.

Hence we also put a lot of effort into checking and optimising the Mag code (see later), and optimising its integration with GPS Rescue.

In 4.5, if Mag is properly oriented, configured, and calibrated, and is confirmed to return reliable heading information, the quad should rotate correctly at the start of a rescue, and point directly to home every time, regardless of drift.  This significantly improves safety of a rescue on windy days.

In 4.4, if there was a long descent phase on windy day, the quad could overshoot home and then need to turn 180 degrees to get back against the wind, which could result in a fast spiral descent with a rough landing.  In 4.5, this should be less of a problem, because we don't start to pitch forward after an overshoot until the yaw heading is largely corrected.  In 4.5, a properly validated Mag will improve heading control on windy days during the descent phase.

GPS Rescue can now be initiated directly overhead, in an emergency, eg when flying LOS, so long as the machine is more than the minimum allowed initiation height.  In this situation, the quad will climb, fly out to the minimum distance, turn back to home, and enter a normal rescue at that point.  This should only be used in an emergency, because the heading the quad will initially take is quite unpredictable, depending mostly on prior drift direction and velocity.

The sanity checks are now a bit less intrusive and should be less likely to trigger except when they absolutely are required.  In particular, initiating too close will let it descend slowly in 'do nothing' mode until it lands or the user regains control.

The GPS tab in Configurator has been updated to include a more useful satellite list and to show the Mag heading information.

An edge case issue where the motors could spin up if the Rx link initiated at a vulnerable time, and when GPS Rescue was set to ignore home point, was fixed.

Please carefully read the [GPS Rescue 4.5 documentation](https://betaflight.com/docs/wiki/archive/GPS-Rescue-v4-5) for more information.  

thanks to ctzsnooze, ledvinap, SteveCEvans haslinghuis

## 4. Magnetometer update

This code was extensively revised, with a lot of improvement in compass task scheduling and driver support.

Previously, the compass task ran at 10Hz, and its state engine could mean that new data points arrived at half or a third of that rate.

In 4.5 we receive compass data values at the highest rate supported by the chip.  In the case of the QMC5883L, this is 200Hz, and for the older HMC5883L, it is 80Hz.  This greatly improves the accuracy of the calibration process, and reduces data lag issues.

The biggest improvement is in our calibration process.  This now works much better, giving consistent results, when the previous code was almost a random number generator.

We can now use `set mag_declination` in the CLI to enter our local Magnetic Declination value and better correct Magnetic to True North.

A [detailed wiki note](https://betaflight.com/docs/wiki/archive/Magnetometer) now explains how magnetometers work, how to orient the mag and check that the orientation is correct, how to calibrate the mag and how to check the calibration, how to set the correct declination value in the CLI etc.  

Users can now set up a Mag and be sure that it works.

Note that Mag units must be mounted as far as possible away from motors and high-current wires or the data will be extremely noisy, almost unusably so.  Getting clean data from a Mag on a 5in quad is quite difficult.

Important: note that after initiating a calibration, the frame of the quad must be 
'tapped' hard to start the 30s data acquisition period.  This was introduced to give the user time to get ready to start collecting data.  This tap must be done within 15s of initiating the calibration.  If no tap is detected, the old values will not be updated.

The `MAG_CALIB` and `MAG_TASK_RATE` debugs have been added to investigate calibration and scheduling issues.

Please read the [wiki note](https://betaflight.com/docs/wiki/archive/Magnetometer) carefully, and test it thoroughly, before using the Mag in a GPS Rescue.  Note that the current default for GPS Rescue is to use the Mag.  If you are not 100% sure that your Mag is working, don't use it.

thanks to pichim, ctzsnooze, SteveCEvans, ledvinap

## 5. Automatic LEDstrip colour based on VTx channel

Ledstrip colour can now be automatically set according to VTx channel. Enter `set ledstrip_profile = RACE` and `set ledstrip_race_color = BLACK` (disabled) to activate.  The VTx should use RaceBand frequencies.  Resulting colours should be Whilte, Red, Orange, Yellow, Green, Blue, Violet, Pink for R1-R8 respectively.

Thanks cruwaller

## 6. Rainbow colour effect for LEDstrip

See: [PR12323](https://github.com/betaflight/betaflight/pull/12323/files)

Thanks ASDosjani

## 7. Angle and Horizon Mode update

Angle and Horizon modes are completely different from 4.4.

Angle mode is a lot snappier, due to `angle_feedforward`.  High angle P values, which used to cause oscillation, are no longer needed.  At P values which do not oscillate, the responsiveness to stick inputs is much quicker.

It also now uses the user's RC Rate settings to determine stick feel, facilitating the transition to Acro or Horizon.  Angle no longer has its own specific stick configuration.

Angle Mode is now 'earth referenced' by default.  This means that a pure yaw stick input, while pitched forward, will result in a perfectly coordinated turn.  The code by Chris Rosser mixes in exactly the right amount of roll so that the horizon stays 'level' in the camera.  It also helps stabilise the quad during fast yaw inputs in Angle mode.  

Roll inputs in angle mode will always add extra roll, and the 'horizon' in the camera will respond accordingly, if that's what the pilot wants to achieve.  

The earth referencing behaviour can be disabled with `set angle_earth_ref = 0`, or its strength halved with `set angle_earth_ref = 50`.  Whoop racers may well prefer to disable it, however most beginners, and anyone doing cinematic shooting in Angle mode, should find it really nice.

Angle and Horizon mode motor control is now significantly smoother, due to filtering refactoring and optimisation, reducing motor heat and minimising camera jello.

Horizon mode has been changed a lot.  Horizon mode provides self-levelling when the sticks are centered and the quad is close to being flat, but flies like acro at higher stick angles or when the quad is steeply angled.  The 'self-levelling' strength, when the sticks are in the center region and the quad is nearly flat, can be as strong, or as gentle, as the pilot likes.  The angle of the frame at which there is no self-levelling can als be adjusted.  With the default settings, flips and rolls to be performed, and with a bit of tweaking, inverted hangs are possible.

For more information, and sample configuration snippets, see [PR 12231](https://github.com/betaflight/betaflight/pull/12231)

Thanks ChrisRosser, ctzsnooze, ledvinap

## 8. Failsafe changes

Failsafe indicators at the time on Rx loss are slightly different, and some safety related issues have been fixed.

If `RXLOSS` is triggered by 100ms of no valid data, the message will appear in the OSD for a minimum period of 1.0s, instead of clearing immediately.  This is consistent with the arming block after Rx loss, which persists for 1.0s by default, even a brief loss of signal.  

The change prevents a potentially dangerous arming conditions which could arise if GPS Rescue was active and the Rx signal at arm time was unreliable, or the user armed then quickly disarmed.  

Additionally, on restoration of signal, the `failsafe_recovery_delay` period is now 500ms, recovering twice as fast as before after signal is restored.

Finally, the `BADRX` OSD message now says `NOT_DISARMED`.  This occurs when the Rx signal has recovered, or has just been detected, wbut the arming switch has been left in the Armed position.  The new message provides a better explanation to the user that they must Disarm before attempting to re-arm after signal loss.

thanks ctzsnooze

## 9. Dimmable RPM Harmonics

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

thanks karatebrot for the code; @SupaflyFPV and @bw1129 for testing and encouragement

## 10. Customisable initial Dynamic Idle percentage

After arming, but before airmode activates, the motors receive a fixed idle value.  

This value can now be customised in the CLI, instead of being always 5%.  Use the `dyn_idle_start_increase` value, which defaults to 50, meaning 5%.  

A higher value can be useful if the motors need a higher idle value to spin properly on arming when Dynamic Idle is active, and conversely if large motors spin well at low idle percentage, it can be reduced.

Thanks: tbolin

## 11. Low throttle TPA

Allows the user to apply TPA attenuation in the low end of the throttle range.  In highly tuned quads, this may help avoid excessive D shaking at low throttle values.

The threshold or break point is set by `tpa_breakpoint_lower`, and the magnitude of the attenuation at zero throttle is set by `tpa_rate_lower`.  The default value for `tpa_rate_lower` is 20, which means a reduction in D of 20%, or that the D effect in the PIDs  will be 80% of normal, at zero throttle.

By default, the default behaviour is to apply the reduction only briefly after arming.  Once until the throttle is raised above `tpa_breakpoint_lower`, TPA lower is inactivated for the rest of the armed period. 

Hence, by default, there will be only a minimal effect on arming, and no effect in flight..  

If the user wants TPA reduction to be active at low throttle during the flight, use `set tpa_breakpoint_lower_fade = OFF`.  TPA will now attenuate whenever throttle is low.

For more information see [13006](https://github.com/betaflight/betaflight/pull/13006)

Thanks: pichim, 

## 12. Keep i-term at zero for fixed wings at zero throttle

Improves handling of fixed wings when throttle is zero, by maintaining iTerm even if throttle is at zero, for example while gliding in to land.

thanks Limonspb

## 13. Mapping of GPS flights with Export GPX

Awesome feature that adds an `Export GPX` button to the top of a log file which contains GPS data.  The exported `.gpx` file can be imported into online mapping software, such as [gpxStudio](https://gpx.studio), drawing your flights over a map.  

Detailed explanatory video [here](https://www.youtube.com/watch?v=dhgQ8aPUq_U).  

Thanks: bonchan

## 14. Custom build options

These are additional code blocks that will only be available if they are built into the firmware that is flashed onto the FC. They are optional because either they are still in development, or cater for the requirements of a small group of users.  At some point, if they become popular, we may merge them into the master code; for now, they are custom build options.

When making an online build, the user includes the name of the build option in the Custom Defines field.  More than one such option can be included, separated by spaces, eg `OSD_QUICK_MENU RC_STATS`.

:::note
When making a build in a Terminal on your local computer, the build option must be preceded by `DUSE_`.  This is not necessary for a cloud build.
:::

The following build options were added in 4.5: 

### 14.1 RPM Limiter build option

This limits the max average RPM to a user-specified value, and is primarily intended to help standardise quad behaviour for Spec Racing.

To use: include `RPM_LIMIT` to Custom Defines when building.

Thanks Tdogb, Limonspb, karatebrot

### 14.2 Quick OSD Menu build option
 
This is a custom build option which adds a 'quick menu' to the OSD.  It is particularly useful for spec racers who need to easily configure and display throttle and RPM limits.

To use: include `QUICK_MENU` in Custom Defines when building, and enter `set osd_use_quick_menu = ON` in the CLI

For more information see [PR 12977](https://github.com/betaflight/betaflight/pull/12977)

thanks Limonspb

### 14.3 RC Stats OSD build option
 
This is a custom build option which adds flight throttle statistics, such as time on 100% throttle and average throttle, to the post-flight stats pages.

To use: include `RC_STATS` in Custom Defines, when building.

For more information, see [PR 12978](https://github.com/betaflight/betaflight/pull/12978)

### 14.4 USE_GPS_LAP_TIMER

Allows the user to define a starting gate, fly a 'track' and return through the 'gate' and see the current lap time, the previous lap, and fastest three, in the OSD.  At the end of the flight, the best lap and time of the best three laps is shown in the OSD.  See this [video](https://www.youtube.com/watch?v=TA5cWwFafY4).  

Requires GPS in the build, and a GPS module with good signal reception even when the quad at a steep angle.  The video above explains how to set it up.  Basic configration is to add the relevant fields to the OSD, and in Modes, enable 'Lap Timer Reset' on a switch.  At the field, the quad is placed at the start/finish gate, and `MISC/GPS LAP TIMER/SET POSITION` is activated until the gate is known.  The gate 'tolerance' or 'size' can be adjusted, and the minimum lap time can be used to avoid false triggers when some other gate is close to the main start-finish gate.  Go `Save Exit` to store the settings and do some laps!  

I think the minimum lap time and the gate size are saved between batteries, but the start/finish gate must be re-set each battery.  With M10 battery-backed up GPS the new location should be detected quickly, but for best results wait a while until the GPS position is stable before locking in the gate position.

To use: include `GPS_LAP_TIMER` in Custom Defines, when building, and watch the video

For more information see [PR 11856](https://github.com/betaflight/betaflight/pull/11856)

thanks SpencerGraffunder

## 15. Blackbox and logging updates

Un-filtered gyro and RPM data are now logged by default.  Enabling the `gyro_scaled` debug isn't needed any more for basic spectral analysis of pre- and post- filter noise in Blackbox Log Explorer.  The latest version of PID Toolbox can read this un-filtered gyro directly, but if you're using software that expects `gyro_scaled` as usual.  

Blackbox now supports 8 channels of data per debug.  Not all debugs have been updated to take advantage of this, but it is extremely helpful when developing.

All eight values can be seen in Sensors

A number of new debugs have been added, and their display in Blackbox should be correct.

Blackbox GPX export to enable GPS mapping.

thanks bw1129, ctzsnooze, karatebrot, McGiverGim, bonchon

## 16. Hardware support

As a result of our improving engagement with manufacturers, we were able to respond to user feedback and improve the target configs for many boards.  We are actively encouraging good design principles and working to ensure that new configurations will work reliably.

Support for the following hardware has been added:
- AT32 CPU
- ICM4268x IMU
- LSM6DSV16X IMU
- LPS22DF Baro
- H725 CPU (test carefully)

A number of H7 improvements and fixes were implemented.

Thanks: SteveCEvans, unit(freasy), blckmn, karatebrot, sugark, haslinghuis, tbolin, bkleiner

## 17 Other Changes and fixes

- configurator: haslinghuis (our Configurator guru), nerdCopter, HThuren,  VitroidFPV, McGiverGim, chmelevskij, ASDosjani, stoneman, flaviopinzarrone, lipskij, blckmn, limonspb, asizon, atomgomba, andygfpv, Benky, shanggl, benlumley, rumpelst1lzk1n
- liaison with manufacturers: sugark, unit
- discord: unit, rabbitAmbulance, vitroid, limonspb
- user support: Vitroid, nerdCopter, BrandonBakedBeans, V-22, HRoll, hypOdermic, TechNinja, Darkmann, ctzsnooze, Sek101, ZogBarr, Steve Fisher, PIDToolBoxGuy, ASDojani, haslinghuis
- extra testing: rabbitAmbulance, xxXyz, sek101
- all the really tough stuff: SteveCEvans, ledvinap, karatebrot
- Launch Control now a standard option
- an issue where a sensor that was not enabled on power was incorrectly saved as not being enabled by the user
- DShot Telemetry now independent of RPM Filtering, fixing minor related issues including dynamic idle: ctzsnooze, 
- Extended DShot telemetry: danielMosquera, haslinghuis
- ICM42605 added to list of gyros with overflow protection: tbolin
- DShot code stability improvements
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
- Improved USART pull-down behaviour
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
- many other bugfixes, target updates, driver updates and fixes: valeriyvan

Wow!  A huge THANK YOU to all our developers, testers and support people!
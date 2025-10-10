---
sidebar_position: 12
sidebar_label: 3.1 Release Notes
---

# 3.1 Release Notes

## Betaflight 3.1.7 Release Notes

Maintenance Release 3.1.7
https://github.com/betaflight/betaflight/releases/tag/v3.1.7

For full release info see 3.1:
https://github.com/betaflight/betaflight/releases/tag/v3.1.0

Mixer Support: Mixer-Support-in-3.1.7-(and-later)

### New:
- Airmode is now fully disabled when feature or mode not engaged. Before airmode was always active and it was just the iterm not being active on low throttle.
- Digital idle percent added to OSD
- Anti Gravity can now be disabled via feature or mode switch
- RSSI inversion added
- Added KROOZX , CL_RACINGF4 and SPRACINGF4EVO target
- Readjusted default config
- Added transponder driver for F4

### Fixes:
- Improved safety of DSHOT on very high loop speeds
- Improve validation of dterm notch settings
- Fix spektrum bind stuck bug
- Fix AK8975 MAG detection
- Fix broken Softserial SPRACINGF3EVO
- Fix "deathswitch" bug with SD and onboard blackbox on the same board (BLUEJAYF4)
- Fix angletrim bug
- Fix "escprog" feature for some boards. KISS ESC passthrough should now work better
- Fix wrong flash sector for F4
- Fix some broken targets like COLIBRI_RACE

### Known bugs:
-  with airmode disabled copter does not hold at Full Throttle  https://github.com/betaflight/betaflight/issues/3016

#### What Defaults changed?
Boris's answer:
Basically people kept complaining that betaflight default D was too conservative and therefore changed.
Setpoint transition has been disabled (1.0) to give more linearity over the entire stick.
I still recommend that you slowly remove default filtering as well if your setup allows you for best results. Nowadays most do softmounting so removing of filters can easily improve performance. The defaults are optimized for hard mounted medium noisy environment for safety. The best tuning performance is achieved with as less Du.

See the [Gyro & Filters](/docs/wiki/guides/archive/Gyro-And-Dterm-Filtering-Recommendations-3-1) for much more.

#### Air mode feature and failsafe issue

This is with regards to the issue raised in RCGroups (https://www.rcgroups.com/forums/showpost.php?p=37535627&postcount=48369) and in issue #3108 (https://github.com/betaflight/betaflight/issues/3108).

The issue that was being faced was due to misconfiguration of the failsafe function, specifically failsafe stage 2 had been disabled. It is failsafe stage 2 that is responsible for putting the craft into a safe state after a failure, stage 1 is still regarded as a potentially recoverable state (if the RX link is recovered).

It is an issue that the firmware allows you to disable stage 2, therefore the ability to do so has been removed (https://github.com/betaflight/betaflight/pull/3562).

It is unlikely you'd face an issue with motors starting if you plug in the quad before powering on the radio (the exception being if the default AUX channel positions are close to the ARM or AIRMODE box ranges, which in itself is an unsafe configuration).

Even in the worst case given that throttle position is at minimum in failsafe the maximum motor speed is determined by min_command, the motors could not run at full throttle.

There is no safety issue with airmode as a feature when failsafe is configured correctly.

A few tips for minimizing the potential for injury when building, flying and testing:
- Always perform tests with props removed
- Always test your failsafe before ever putting props on
- Always set the arm range slider to be activated well away from the default channel value (typically the high end of the channel is adequate, e.g. 1800-2000)
- Try to keep your radio more than a foot away from your quad to ensure a good radio link at close range
- Plug in the battery with a firm grip of the quad (all being well this is unnecessary but is a good belt and  braces approach)

## Betaflight 3.1.6 -
https://github.com/betaflight/betaflight/releases

New:
- Thanks to @jflyper Dynamic bidirectional softserial. Assigned through resource command. (NAZE users dont have to short TX and RX now to get Smartport working)
- Updated SDK to 6.2.1 2016q4

Fixes:
- Fixed limited max_aux for F1 and F3 to 6
- Added 6 motor DSHOT support to XRACER target
- Added Led Strip for KISSFC
- Added current sensor pin for KISSFC
- Enabled softserial for all targets
- Fixed activation for HEADFREE mode
- Fixed Led strip orientation for indicators
- Fix artificial Horizon for rolling wrong way
- Fix for 3D DShot conversion in configurator
- Fix led strip for KAKUTEF4
- Fix targeted looptime
- Fix inverted polarity DSHOT timers on F4
- Disable DMA for SDcard for SPRACINGF3EVO
- Softer dterm setpoint default
- Fix filter bug for trying to filter over nyquist frequency (Not working 500hz mode)
- Less restrictive on F1 looptime
- Fix Spektrum bind for OmnibusF4

Known issues/bugs:
- There is no check for the D Term Notch Filter to ensure that the cutoff frequency ('D Term Notch Filter Cutoff') is not higher than the mid frequency ('D Term Notch Filter Frequency'). WARNING: If a cutoff frequency that is higher than the mid frequency is configured, this can result in a runaway motor acceleration. (Applies to versions prior to 3.1.6 too.)

- If your board has SDCARD blackbox and onboard Flash both available and you want to use onboard flash without inserted SDCARD you need to disable feature SDCARD, which is available from Configurator 1.9.3. Only BluejayF4 has both blackbox options available as far as it is known. (This is not just in 3.1.6, but also in previous versions)

- Colibri Race target 3.1.6 on a Powercube V1 (always used that target, it's the one to use). Unfortunately after flashing no way I can connect. It doesn't boot up and the device is suddenly not being detected anymore.
Boris: This will be addressed in 3.1.7

- On a CC3D the receiver goes into bind mode every time. Fixed in 3.1.7 alpha.
http://andwho.sytes.net:8080/job/BorisB_BetaFlight_Maint/

- Use Configurator 1.9.3

## Betaflight 3.1.5 - Maintenance Release
Link to Release: https://github.com/betaflight/betaflight/releases/tag/v3.1.5

- Restore multiwii throttle expo
- Fix Motor 6 for SIRINFPV
- `VTX SmartAudio` Fix status string for user frequency mode
- Fix broken standard PWM
- Change default current meter scale for BFF3 // Enable Serial RX by default on UART2
- Register SDCard DMA in resource list
- Configurable starting AUX channel for CHANNEL_FOWARDING
- Fixed for Tramp Power menu
- Simplify anti gravity gain parameters (disabled by default)
- Fix multiple changes through MSP for tramp
- Fix Tramp display issue for Raceband Channel 7 (was showing F8)
- Decouple min_throttle and max_throttle from altitude hold

#### Known Bugs/Issues::
 - limit of 6 aux channels. Scheduled to be fixed in next release on 1 March 2017.
 - 1 softserial is enough. But in 3.1.6 you will be able to assign it manually through resource command.
Also it will not be required to short TX and RX anymore for smartport on softserial.
 - Configurator 1.9.2 has a Spek Sat setting bug which is fixed in 1.9.3

## Betaflight 3.1.4 - patch
- No hex files, just source code: https://github.com/betaflight/betaflight/releases/tag/v3.1.4
- Simplify anti gravity
- with throttle expo fixes

## Betaflight 3.1.3 - Maintenance Release
Link to Release: https://github.com/betaflight/betaflight/releases/tag/v3.1.3

- Minor optimalisations to PID code
- Fix for iterm anti_windup_gain axis coupling

Note from Boris:
3.1.2 would have been latest, but as we find more things that are worth releasing we bring out the new patch.
Update to patches keeps your settings btw. You don't have to erase it.

## Betaflight 3.1.2 - Maintenance Release
Link to Release: https://github.com/betaflight/betaflight/releases/tag/v3.1.2

- Fixed scaling issue where `min_throttle` would affect rcCommand Throttle
- Replaced old multiwii throttle expo by new floating point version
- Simplified few CLI commands (see list below for CLI name changes)
- Lowered strength for some default settings like the new anti_gravity_gain

Note from Boris:
Ok here this one should be the last one. Lets move to 3.2 now!

I know they still maybe be some target related issues, but there is not much to do about.
Soon there will be a list of targets divided in 2 categories. There will be a list of FULLY supported FC's where devs spend time to make it all work and there will be the list of best effort supported targets there from those we don't own or where the manufacturers don't provide enough support for it. That doesn't mean that targets will get removed, just less guaranteed support of features ! So if someone reports dshot or blackbox not working on targets he or she will have to complain to the actual shop where they got it from.

##### Note: Throttle expo works as regular expo now without even throttle mid involved.
This is actually a temporary situation until custom throttle curve is finished (expected in 3.2).
The reason for current temporary situation is because this part of code was mixing min_throttle into throttle value.
Maybe its best to not use it for now.

## Betaflight 3.1.1 - Maintenance Release
Link to Release: https://github.com/betaflight/betaflight/releases/tag/v3.1.1

#### New:
- Resource remapping command doesn't require to set it to NONE first. (you can paste your diff output now) @blckmn
- Added KISSCC target @borisbstyle @ronlix
- Added more OSD configurable features and warnings @jflyper @DanNixon
- Added IBUS Telemetry @mikeller
- Added Blackbox to CMS @DanNixon
- Added VTX config over MSP @raphaelcoeffic

#### Fixed:
- Improved Iterm windup handling @borisbstyle @martinbudden
- Fixed "diff" output for few OSD parameters @DanNixon
- Simplified cli on F1 and F3 targets for more flash space @mikeller
- Fixed REVONANO target @blckmn
- Minor Code optimalisations @borisbstyle
- Improved default configuration (higher default idle offset and new anti windup parameters) @borisbstyle
- Fixed OSD switch @DanNixon
- Fixed motor mapping on RCExplorer target @blckmn
- Improved boot issues on wrong resource mappings @blckmn

NOTE- For the features in this release you will need to use the following Versions or Higher:
- Configurator 1.9.1

## Betaflight 3.1.0-Release

Link to Releases: https://github.com/betaflight/betaflight/releases
Note: Embedded links to Videos are in the Github Release Notes.

Read here to Learn exactly what firmware issues and features are being worked on:
https://github.com/betaflight/betaflight/issues?q=is%3Aissue+is%3Aclosed+sort%3Aupdated-desc

### Betaflight 3.1.0 (Release)

Betaflight firmware has undergone some major changes under the hood. Hardware drivers have been optimized to improve future maintainability, but also easier target and hardware support. The efficiency of the code has also been improved by a lot as Betaflight team reviewed each line of the code to squeeze every possible performance win out of it for flight performance purposes. The difference between the current release and previous one is over 1800 code commits by various developers. Only release notes highlights are represented. For full change history github commit history can be reviewed.

#### Release note highlights:

- Added F7 support with already few supported targets - @sambas
- Dynamic IO / pin allocation - @blckmn
- [DSHOT Support](DSHOT ESC Protocol) for F3 and F4. DSHOT150, 300, 600, and 1200 supported (see board section in support for supported hardware) - @blckmn
- Full Floating Point Logic for flight behavior - @borisbstyle
- Many new dynamic configurations (filters, setpoint weights etc.) - @borisbstyle
- Many code optimizations (faster pid speeds possible on F3 and F4) - @martinbudden and @borisbstyle
- Support for KISS ESC telemetry (only with DSHOT) - @basdelfos
- Added temperature and RPM to KISS ESC telemetry - @mikeller
- Added [Serial ESC Pass-through](/docs/wiki/guides/archive/ESC-pass-through-3-1) for KISS24 and CASTLE esc's - @sambas
- New target support (now 72 targets on 4 MCU types)
- Added CMS display support - @jflyper
- Added CRSF support for TBS receivers and associated telemetry - @martinbudden and @blckmn
- Added additional OSD parameters like pids and power - @martinbudden and @rafl
- Added [Unify SmartAudio](/docs/wiki/guides/current/SmartAudio) support - @jflyper
- Added MSP over Smartport - @raphaelcoeffic
- Auto Video Format support for OSD
- Configurator enhancements - @mikeller
- Speeded up build system, needed now there are so many targets - @AndersHoglund
- Fixed JUMBO frame handling on VCP targets, so blackbox logs can be downloaded more quickly - @AndersHoglund
- New "anti_gravity_threshold" parameter in CLI - @borisbstyle
- Protection against too fast motor speeds (When ONESHOT125 selected for example, max allowed pid and motor speed will be 2khz) and many more..  - @borisbstyle
- Added experimental 32khz support for gyros that support it - @martinbudden.
- Blackbox enhancements (use 2.5.8 blackbox-viewer) @GaryKeeble
- Added new level sensitivity and level limit parameters in degrees. level_limit is the maximum allowed angle. Level_sensitivity is the max deflection on full stick @borisbstyle
- Added IRC Tramp VTX support. Changeable channel, band, power and pitmode @jflyper
- and many more: https://github.com/betaflight/betaflight/commits/master
- Only one PIDC the 2DOF or Betaflight now (see the 3.0.x release notes for details)

NOTE- For the features in this release you will need to use the following Versions or Higher:
- Configurator 1.9.0
- BlackBox Viewer 2.5.9

### Warning: It is NOT recommended to use any Save/Restore or even CLI Dump/Diff copy paste between firmware Versions.
Always use the Config GUI to setup and manually type into the CLI after doing a "get 'name'" to be sure of new spelling and options.

### Bugs and fixes:
- RC2 - Fix in rc expo symmetry // fix missing baro on some targets
- RC3 - Enable experimental 32khz support
- RC4 - Fix non MPU INT supporting targets // Added MPU Int NAZE // Fix adjustment for setpoint // Some cleanups
- RC5 - Fix more non MPU INT supporting targets // fixed RACEBASE and some SPRACINGF3 variants // Fix ledstrip on BETAFLIGHTF3 and IMPULSERCF3 // DSHOT900 and DSHOT1200 added for testing (only to be enable through cli for now)
- RC6 - Fix ledstrip IMPULSERCF3 // Fix DSHOT for SIRINFPV // Add PODIUMF4 // Improved CPU usage // Optimised RC interpolation // Improve DSHOT speed // Add more safety in DSHOT limits (DSHOT150 is limited to 4khz)
- RC7 - Fix gyro detection handling for 32k mode // Improved target limitation
- RC8 - Fix FPV angle mix // Added RG_SSD_F3 target // SPRACINGF3NEO DSHOT optimizations // CC3D_OPBL fix // Remove MSP from UART1 by default // Added debug for gyro calibration noise // Minor optimizations
- RC9 (Build #959 - 16Jan2017)- Fix servo mixer scaling for tricopters // Add softserial for NAZE // Add IRC Tramp VTX support // Fix FPV angle mix
- RC10 (Build #965 - 19Jan2017)- Added anti_gravity_gain // KISSFC dshot support motor 5 and 6 // CC3D startup issue solved // new defaults for level and PID's
- RC11 - Fix spectrum bind PIN on BFF3 // Fix connection to some targets // Restore missing blackbox log fields
- RC12 ( -25Jan2017)- FPV angle mix applied to actual rates (also a fix) // Fix truncated blackbox logs // Redefined OSD defaults to not have PIDs by default on screen // Increased configurable filter range
- RC13 - reported bug where blackbox would disable itself is now resolved

-  Save blackbox file from dataflash freezes mid-download in recent versions of configurator. Configurator Issue #411 - https://github.com/betaflight/betaflight-configurator/issues/411
  Fixed in Configurator 1.9.3

- Configurator seems to have a Bug when setting Spektrum Sat RX protocol. Update the Config Version 1.9.3 to fix this.

- Everyone having issues with weird freakouts,  make sure that this isn't the culprit. I have no idea if it would be the cause but just throwing this out there, as I know a lot of people don't read the changelog. Adamtfc
There is no check for the D Term Notch Filter to ensure that the cutoff frequency ('D Term Notch Filter Cutoff') is not higher than the mid frequency ('D Term Notch Filter Frequency'). WARNING: If a cutoff frequency that is higher than the mid frequency is configured, this can result in a runaway motor acceleration. (Applies to versions prior to 3.1.6 too.)

- Some are reporting issue with copter shaking or oscillating with BB logging directly to and SD card. This is in [Github Issue #2631](https://github.com/betaflight/betaflight/issues/2631).

##### Note: With v3.1 and later, servos must be configured manually by resource cli command.Do NOT use  CHANNEL_FORWARDING. It does something really nasty.
[See Teralift's post here](https://www.rcgroups.com/forums/showpost.php?p=36792606&postcount=44331)
[Servo mapping on a Naze32 to use Servo_tilt by TeraLift](https://www.rcgroups.com/forums/showpost.php?p=36821753&postcount=44612)

##### Notes from Boris:
DSHOT1200 does work now but only on kiss24 that I know.
We decided to add a lot of new stuff available from cli for testing purposes and try to only add proven things in the configurator.

### Questions and Answers about 3.1 from Boris' BetaFlight thread.
#### question by Woody_99:
I've been flying a Naze32 on BF (3.01) for a while, and seems to be working fine for me.
With all the code optimizations, is the Naze still a viable option to continue with, or should I swap it out for a newer FC?
Answer from Boris:
No NAZE32 and other F1s actually got slower in 3.1. 3.1 is the first version where everything is floating point math. F1 lacks of floating point processor unit so it gets a lot of more to work.
Besides that it only has 128k flash what prevents a lot of new optimizing we applied.
All optimizations only affect f3, f4 and f7 boards.
Instead of running new versions of betaflight or reforking it you can simply stick to the version you use now for example. There is no solution for F1 boards in the future unfortunately and every new feature will NOT be included to it. You are for example willing to give up acc, but 100 others may not. So that's not a solution.
I see that Softserial does fit again since latest cleanups (RC9?). There is only like 1kb left on Naze now.

#### question by fftunes:
If i run 8k/1k, will the PID loop be calculated from an average of the 8 gyro samples, or will it only use 1 sample out of 8?
Answer from Boris:
There is no averaging. There is IIR filtering, what works faster than averaging. Every sample it's information is taken to the next sample a bit. Btw you can enable simple averaging with choosing FIR filter style. Averaging gives a lot of delay typically.
It seems that a lot of guys really missed the early betaflights where all this was discussed a lot. All i can say is to read about the way how filtering works and look up about aliasing. (Filtering is explained here)

#### Question by spikerspike97:
But why do my throttle and yaw rccommands have so much steps and the pitch and roll are super smooth as seen in the BB log?
Answer from Boris:
Because only roll and pitch have Derivative kick affect. Therefore only those are smoothed by default. You can enable the full smoothing in cli, but I suggest fly it like this.
Only reason for smoothed rc inputs is Derivative kick symptom where PIDsum can get very jerky.
Note: See the new "rc_interpolation_channels" CLI command below to smooth all channels.

#### question by Ede2016:
Can you please say a word about average CPU load for BF3.1.
Do you suggest less than 50% in the configurator disarmed or armed or what's the best way to analyze which frequency is the maximum recommended?
Answer from Boris:
Well 50% is a good guideline, but honestly as long as it arms without issues it is fine.
As long as every feature works there is enough CPU power.
Usually on high CPU usage more less prioritized things will stop working. For example telemetry, BlackBox, current sensor or VBAT would fail first before PID loop or RX code would not be executed.
The only true danger with too high cpu before was that motor commands may overlap, but there is a lot of spacing in between all motor commands and it is protected as well with looptime limitations on different protocols.
I personally fly everything enabled except accelerometer on my rigs.

#### Question by Jerm357:
Can anyone suggest some settings for "Angle Limit" and "Sensitivity" in 3.1.3 to get Angle mode to feel like it did in 3.0.1?
Answer from Boris:
Sensitivity 100
Limit 70

#### Someone mentioning that 3.1 was a bit more "bumpy" than 3.0.1. Is this true and what to adjust?
Boris' answer:
3.1 is indeed more "from error" based. Reduce your setpoint weight to make it smoother. I think the current defaults are a bit to much for some setups. Especially on end of fast flips or rolls.
In case some don't remember what the setpoint weight was doing. Just a quick explanation in easy language.
More to the right (higher)-> More stick acceleration and more sharpy on stick. Your quad reaches faster its target and the rates feel faster, but the motors work harder and have to break faster.
More to the left (lower)-> The accelerating and deaccelerating movements of your quad get more dampened. This results in really smoothed motion and pretty much never bouncebacks. Maybe better for freestyle.
Weight transition is basically gradual transition of setpoint weight from center stick to full stick.
But the effect of it is not really small at the moment.
Comment from QuadMcFly:
Also worth noting your set-point will likely shift depending on your specific setup, so you can't assume it will be the same on every quad. Heavy, slow transitioning props will need a lower set-point than light fast changing props. For instance I had to run quite low on 5x4.5x3HBN props, but on the Lumenier ButterCutter I'm running almost all the way to the right. Basically I just turn it down till I stop getting bounce-back or "slaps" on hard flips and rolls.

#### More on SetPoint Posted by joshuabardwell
For setpoint transition, this has a good explanation:
[Reference PIDC and Setpoint discussion](Betaflight-3-0-Release-Notes)
So:
Delta from error (high D term setpoint weight) has very sharp, immediate stick response. But may have problems with bounceback at the end of flips and rolls, and may provide less smooth flight (especially bad for some freestyle flyers). With high D term setpoint weight, the quad feels very connected and immediate, but also every. tiny. little. finger. motion. is translated instantly to quadcopter motion, which is not necessarily what every pilot wants.
Delta from measurement (low D term setpoint weight) has smoother and slower stick response. Quad feels less connected and immediate, but is smoother. Also, measurement is best at stopping bounceback/oscillation at the end of flips and rolls.
Think of entering a flip or roll as "positive" stick input, and exiting a flip or roll as "negative" stick input. When the stick is moving away from center, that's positive. When it is moving towards center, that's negative. Delta from error (high D term setpoint weight) is just as likely to cause bounce on positive stick input, in theory, but in practice, we seldom make sharp stick movements when making positive stick input. When re-centering the stick (negative stick input), the crossbar helps the stick come to a sharp stop. When making positive stick input, even when our fingers make very sharp moves, the stick does not come to as abrupt a stop (for most pilots). For some pilots, this will not be true. If you experience ringing oscillation or bounce when doing positive stick inputs, such as if you are doing a four point roll, then you may be the exception to this rule.
So then what is setpoint transition. Setpoint transition tries to give you the best of both worlds. When setpoint transition = 1, then NO SETPOINT TRANSITION OCCURS. The D term is calculated based on the setpoint weight, period. When setpoint transition is raised, what happens is that on positive stick input, the D term is calculated based on setpoint weight, and on negative stick input, the setpoint weight is relaxed (reduced) and the D term transitions from error to measurement. The goal here is to give you sharp, "error style" control on positive stick input, and soft, "measurement style" control on negative stick input. This means you get the advantage of error style control but without bounceback at the end of flips and rolls.
Here is how I think of it:
 1. Set the setpoint weight based on how much error vs measurement feel you want.
 2. Lower setpoint transition to fix bounceback at the end of flips and rolls (remember, default is low, and basically nobody complained about stops, ever, in 3.0.1)
 3. Raise setpoint transition to increase stability at center stick (especially when running low P and/or low setpoint weight)

If setpoint weight is low, then setpoint transition won't do anything because the setpoint can't really be reduced.
Also, bear in mind that you should DEFINITELY be tuning P and D when playing with these numbers. P and D interact strongly, and setpoint weight interacts strongly with D, so these three parameters are all interlinked and tuning them is NOT for amateurs. What I would suggest is starting with the default values then tuning P and D as perfectly as possible. Then adjust setpoint weight to extreme values and feel the difference. If you like the softer or sharper feel of a higher/lower setpoint weight, try re-tuning P and D around that value. Finally, adjust setpointn transition to try to tune out bounce at the end of flips and rolls (or other negative stick input.
#### AILERON8 comment:
I've been raising the setpoint transition to reduce roll/flip bounceback in general. Even if your PIDs are at default this setting has a very pronounced effect on bounce back reduction. Before utilizing this feature I left bounce back removal at the tail-end of tuning. Where as now it's the first thing I do and is easily accomplished.
#### Another use of SetPoint to get a better Tune from fftunes:
The main issue was, it was too soft/unstable at midstick, but at the same time i could not really increase P much more or it would become excessively noisy. The result was i-term going all over the place to a degree where it caused very unreliable stick feel and even drifting.
By increasing transition setpoint from 0.35 to 0.50 it became very solid and reliable around mid-stick and small quick moves, as well as in fast turns where i hold sticks with relatively small inputs.
I think after I "fixed it" with transition setpoint, I could even back off with the P's a bit again.

#### To check for DMA conflicts do the following (thanks teralift):
(1) Disable DShot, enable LED_STRIP, save & reboot.
(2) Goto CLI.
(3) Type "resource list".
(4) At the end of the list, there is DMA section. Record which DMA resource the LED_STRIP is using.
(5) Type "exit".
(6) Enable DShot, disable LED_STRIP, save & reboot.
(7) Goto CLI.
(8) Type "resource list".
(9) Check if any of DMA resource assigned to motors is same as the one LED_STRIP is using.

### New CLI commands for 3.1:

Note: See the [3.0.Release Notes](Betaflight-3-0-Release-Notes) 

for CLI commands plus other features that were new in 3.0.x

#### Resource Remapping
From betaflight v3.1 there is a new command to map resources. No more custom motor mixes just to move a motor pin.
[Resource Mapping](/docs/wiki/guides/current/Resource-remapping) goes into further details on how to use this new command.

#### set digital_idle_percent = 3.000
*[0..20]*
Only used when a DSHOT ESC protocol is selected.
See [Setting Min Throttle with DShot](DSHOT ESC Protocol)

#### set anti_gravity_threshold = 350   - per Profile
*[20..1000]*
 To improve stability in fast changing G forces during flight. This applies to quick throttle jumps where multirotor can go through weightless transitions. In these cases the iterm can cause unwanted effects like pitching up or yawing due to strong changes in accumulation polarities.
To disable anti_gravity set anti_gravity_threshold = 1000.
See Discussion on Anti_gravity below.

#### set yaw_accel_limit =  20.000 - per Profile
*[0..50]*
Note from Boris: The old value was upscaled. This is the real value now in float representation.
Its representing deg/sec/ms. A bit easier to swallow for human.
posted by AILERON8:
Yaw_accel_limit helps by limiting the rate of change of speed of your motors. The lower this value the less the rate of change of speed your quad is able to Yaw.  Yaw_accel_limit prevents your props from spooling-up too quickly. This feature can be used to reduce fast yaw jumps or other rapid increases in the yaw direction. However, this feature will not prevent i-term windup, so it may not prevent yaw jumping, but it will be less severe.

### set yaw_p_limit
This not longer has any effect since it is Not used with the 2DOF PIDC.
This was only used in the Legacy PIDC (available in 3.0).

#### set gyro_isr_update = OFF
*[OFF..ON]*
From mjbudden:
gyro_isr_update is an experimental feature I have added. When set on, the gyro is read and filtered in the ISR (interrupt service routine). This is "unconventional" programming practice (many would frown upon doing this), which is why the default is off.
Theoretically setting it on should produce some small performance improvements, but that needs to be confirmed by flight testing. This setting should be used with caution.
From Boris:
Might be useful on slower i2c targets like NAZE etc. Its for testing purposes. Things not mentioned in release notes and manuals are not meant to be changed generally unless you really want to be a "tester".

### New RC3 CLI commands:

#### set gyro_use_32khz = OFF
*[OFF..ON]*
Only available on F4 & F7 targets.
Usually F4 board will run fine on 32kHz gyro and 16kHz pid loop. 32/32 is slightly too much for CPU. F7 target is now the only one able to run 32kHz/32kHz flawlessly with even accelerometer enabled. To enable 32kHz mode use CLI setting gyro_use_32khz = ON. (Configurator will not display correct speed until the next configurator update, but you will see the real cycletime). NOTE - only flight controllers with MPU6500, MPU9250, and ICM-series (eg ICM20689) gyro support 32kHz mode.
32khz is added just because it can, but no new harder filtering will be defaulted to that. If you want to fly 32khz you will have to try to optimise your filters by yourself.
Default filtering is good enough for 8k gyro sampling, but 32khz requires more filtering depending of setup.
I did find out that old blheli esc's for example perform well under 32khz as those are less responsive, while blheli_s and other responsive esc's with better braking really suffer from micros on 32khz.
##### Note from Ksyrium:
I have two BlueJay F4 rev 3. Initially they flew really wonky, until I learned how to properly soft mount the FC, a fully soft stack did not help to put it mildly.
Then one of them refused to arm on 32khz and had 50% CPU instead of 40% on the other. The fix was to set moron threshold to 100.
##### Note from arcaine25:
I want to run 32k/32k on that revolt V2, but the CPU is at 50%ish.. I know Boris said that would be fine, but I am a little OCD about things, and just don't feel like risking it. 32k/16k flies great as it is, so I couldn't imagine TOO much difference between now and 32/32.
While I didn't have to modify moron_threshold at all on the Revolt V2, I absolutely do have to on a Flip32 F4 with an MPU 9250. I have to set it to around 110 - 120 (i'd have to check) in order for it to work, otherwise the Gyro never cal's and it won't arm. Once I set the moron threshold, it works like a charm now that I soft mounted it correctly (previous post about it, as well as in the wiki :-) ). those M3 bobbins from RMRC are absolutely wonderful, and I ordered a bunch of them to keep on hand! Default in 3.1.5 is 48 for moron_threshold.

##### Question from  fftunes:
Did someone compare mpu6500 vs ICM20x at 32k? In Felix' tests the ICM20x did not look so well...
Boris' answer:
Yes I did. Zero difference.....absolutely zero difference.
I fact ICM208601 seemed slightly more prone to motor frequencies hitting its resonant frequency.

I also did some more investigation about the new vs old gyros and talked even to invenesense about it.
This is the story:
The old gyros like MPU60x0 had 3 separate internal gyros. Each axis had its own gyro. That had too high power consumption for mobile phones and there was a demand for more power efficient gyro. So what did they do? They removed 2 gyros from it and made one gyro for all 3 axis to reach this low power demand and succeeded in that! They are selling millions of gyros installed on pretty much every mobile phone. But they did remove some robustness and hardware, which seems crucial for drone applications! The new gyros are also cheaper than the old ones as well, because of that.
What we need in drone industry is better gyros and not cheaper less power hungry ones as that's not relevant for us!
If you ask me they could make a more expensive gyro with better quality targeted for drones.

### New RC6 CLI commands:

Level mode has changed in 3.1 a bit. It got more parameters.
In the Configurator pid tab you can find 2 new level parameters.
It is level sensitivity and level limit.
Both are in degrees.
Level sensitivity is the max angle on full stick and level limit is the limited angle.
So for example sensitivity of 100 means that full stick would give you tilt of 100 degrees, but if the limit is just 70 degrees last 30% of your stick will be thrown away.
Lowering your sensitivity will give you smoother stick control. Maybe the defaults are a bit aggressive perhaps.
Rc rate or any other rate or expo parameter doesn't do anything for level modes.

#### set level_limit = 70
*[10..120]*
 the maximum allowed angle in degrees

#### set Level_sensitivity = 100
*[10..200]*
the max deflection on full stick in degrees

### New RC10 CLI commands:

#### anti_gravity_gain = 4.000 - per Profile
*[1..30]*
Gain is the temporary iterm acceleration on rapid throttle moves.
Boris: Well fly and see how it goes on defaults and post some logs if you can.
To disable anti_gravity set anti_gravity_threshold = 1000.
See Discussion on Anti_gravity below.

### Misc CLI commands that seem to be new in 3.1
Note: Many have no information of how to use.

#### rc_interpolation_channels = RP
Allowed values: RP, RPY, RPYT
Smoothing of RX inputs for Roll, Pitch, Yaw, Throttle.

#### consumption_warning_percentage = 10
Allowed range: 0 - 100

#### displayport_msp_col_adjust = 0
Allowed range: -6 - 0

#### displayport_msp_row_adjust = 0
Allowed range: -3 - 0

#### sdcard_dma = ON
Allowed values: OFF, ON
A report of setting this to OFF fix a BB logging issue on the BFF3 board. Boris has stated that this does not need to be done and an SDcard will work better with DMA on the BFF3.

#### blackbox_on_motor_test = OFF
Allowed values: OFF, ON

#### task_statistics = ON
Allowed values: OFF, ON

#### beeper_inversion = ON
Allowed values: OFF, ON

#### beeper_od = OFF
Allowed values: OFF, ON

#### ledstrip_visual_beeper = OFF
Allowed values: OFF, ON

#### debug_mode = NONE (added in 3.0)
Allowed values: NONE, CYCLETIME, BATTERY, GYRO, ACCELEROMETER, MIXER, AIRMODE, PIDLOOP, NOTCH, RC_INTERPOLATION, VELOCITY, DFILTER, ANGLERATE, ESC_SENSOR, SCHEDULER, STACK
Enable additional value to be sent to a BlackBox Log which is useful to measure frequency of noise before filters and other debugging. See [BB logging page](/docs/wiki/guides/current/Black-Box-logging-and-usage) for measuring noise and filter.

#### pidsum_limit = 0.500
Allowed range: 0 - 1
Mjbudden & Boris suggested reducing pidsum_limit to reduce impact spins and make for a softer yaw.

### CLI Changes between 3.1.2 & 3.1.3:

#### dump
no longer outputs section name.

#### CLI name changes:
##### rc_interpolation  => rc_interp
##### rc_interpolation_channels => rc_interp_ch
##### rc_interpolation_interval => rc_interp_int
##### roll_yaw_cam_mix_degrees => fpv_mix_degrees
##### telemetry_switch => tlm_switch
##### telemetry_inversion => tlm_inversion
##### frsky_default_lattitude => frsky_default_lat
##### frsky_default_longitude => frsky_default_long
##### frsky_coordinates_format => frsky_gps_format
##### hott_alarm_sound_interval => hott_alarm_int
##### pid_values_as_telemetry => pid_in_tlm
##### battery_capacity => bat_capacity
##### current_meter_scale => ibat_scale
##### current_meter_offset => ibat_offset
##### multiwii_current_meter_output => mwii_ibat_output
##### battery_notpresent_level => bat_detect_thresh
##### use_consumption_alerts => use_cbat_alerts
##### consumption_warning_percentage => cbat_alert_percent
##### throttle_correction_value => thr_corr_value
##### set throttle_correction_angle => thr_corr_angle
##### servo_lowpass_freq => servo_lowpass_hz
##### servo_lowpass_enable => servo_lowpass
##### airmode_activate_throttle => airmode_start_throttle
##### dterm_lowpass_type => d_lowpass_type
##### dterm_lowpass => d_lowpass
##### dterm_notch_hz => d_notch_hz
##### dterm_notch_cutoff => d_notch_cut
##### vbat_pid_compensation => vbat_pid_gain
##### anti_gravity_threshold => anti_gravity_thresh
##### dterm_setpoint_weight => d_setpoint_weight
##### level_stick_sensitivity => level_sensitivity
##### level_angle_limit => level_limit

### New in 3.1.3

#### set anti_gravity_rate_max = 80
Allowed range: 0 - 2000
See Discussion on Anti_gravity below.

#### set iterm_windup = 50
Allowed range: 30 - 100
Boris' explanation:
Just a limit for how high i-term can grow, its threshold to prevent iterm to go nuts on high dynamic cases for example like fast stick inputs or some other scenarios.
I think the default value is pretty good from what I have seen from many setups I analyzed. I don't think you need to tune it unless you really suffer from high iterm windups.

#### fpv_mix_degrees = 0
Allowed range: 0 - 50
Note: Same command as "set roll_yaw_cam_mix_degrees" in V2.x. See the 2.x CLI coommand page for more ino and video links.

Note that in newer BF versions, you need to enable a flight mode for 'FPV ANGLE MIX' on the modes tab to make the mixing work. You can either define a switch to switch FPV cam angle mixing on and off OR you can set the full range of any switch to keep it permanently on.

### Removed from 3.1.3
#### accum_threshold = 200
#### set yaw_accum_threshold

## Discussions of new features:

### Anti_gravity:

#### Posted by Vaflius:
I have played with anti_gravity values a bit, but it is still very confusing. There are 3 values:
set anti_gravity_thresh = 350
set anti_gravity_gain = 3.000
set anti_gravity_rate_max = 80

thresh is simple - it's the sensitivity (when/if the antigravity should kick in, as maxing out thresh means to turn off the antigravity)

What's the difference between gain and rate_max?

In my testing so far (I've had quite huge pitching on throttle blips), the biggest improvement was upping gain to 5. I could not see any difference between gain=5 and gain=6, other antigravity parameters defaulted. Lowering thresh to 200 did not seem to have positive impact, nor raising rate_max to 90.

On my setup I now have:
set anti_gravity_thresh = 200
set anti_gravity_gain = 6.000
set anti_gravity_rate_max = 90

It's much better, however, there is little pitching up on throttle and after lowering thresh to 200 it added something like propwash on throttle punchouts/blips.
Has anyone tested these parameters on their quads?

this from my notes, Boris B talking:
Dont use that low threshold. I think 300 or 350 should be fine.
What does the value mean?
350 for example means 35% of throttle. Once the throttle has been increased or decreased with 35% within 100ms of time than it means that there might be a high gravitational change going on and iterm needs to be accelerated to go to its new value faster. The gain is Ki multiplier. So your igain gets a temporarily nitro boost to prevent pitch up / down behavior caused by too slow iterm. Default value of 2 is really mellow and is done for safety reasons as I found out a lot of folks were running pretty high igains and with this value iterm might just get pushed easier over the edge.

Rate max is the rate where this feature completaly gets ignored.

[Anit-gravity Video by Joshua Bardwell](https://www.youtube.com/watch?v=SmSWZFjXBGM)

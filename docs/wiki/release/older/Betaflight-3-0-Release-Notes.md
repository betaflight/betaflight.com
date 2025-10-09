---
sidebar_position: 13
sidebar_label: 3.0 Release Notes
---

# 3.0 Release Notes

This is really a major release. The full detailed change list can be found in the commit history.
[https://github.com/betaflight/betaflight/commits/master]

Here is a 3.0.0 Release overview video by joshuabardwell:
[https://www.youtube.com/watch?v=Fz1IcxWpZfg]

Betaflight is a genuine Open Source project with people all over the entire world contributing to the code. It is not just me!
This 3.0 release had about 15-25 very talented developers involved working day and night for last 2 months.
I really want to thank everyone who was involved and help me and others to learn more and to make this all happen.
So many great ideas were born during last week that we can keep developing for upcoming months.
Boris

This version has many changes in the under laying code so has its own section.

Plan here to list and explain only the differences from the previous 2.x versions.

From Boris for those just trying 3.0:
Just use things available in the configurator and leave the rest on default.

Betaflight has 2 different goals.

1) have super stable firmware with solid defaults to just be able to fly when you want

2) from scientific point of view it is good to keep improving and introduce new features where those who like to experiment can play with ans give valuable feedback. These are mostly burried in the cli

### Betaflight 3.0.1 (3.0 patch 1)

- Finalized OSD Code. (More OSD configuration options)
- Changed Relaxation Parameter to act as transition (Helps better against bounce backs on higher rates with high setpoint weight). Config's two sliders are now Dterm Setpoint and Dterm Transition. See addition to the 2DOF PIDC description.
- Fixed non working Baro for some boards
- Added second notch for gyro (set gyro_notch1_hz and set gyro_notch2_hz, also available in the new 1.8.3 configurator)
- Added configurable pidSum limit
- New filter defaults (notch filters enabled by default)
- Added BEEBRAIN target

## Betaflight 3.0.0-RC14 (F4 Support)

#### Final Release

This is really a major release. The full detailed change list can be found in the commit history.
[https://github.com/betaflight/betaflight/commits/master]

Short Summary of changes:

- STM32 F4 support (working blheli passthrough)
- Full IO rework
- Major target separations. Easy implementation for new targets
- PWM code rework
- Added OSD integration
- Major code cleanups and rewrites
- More configurator integration
- New Betaflight PID controller based on deg/sec. All of the future development will all happen in this single pid controller. There is still a Legacy PID controller, which is pretty much evolved rewrite. That one will stay the same.
- The new Betaflight 2DOF PID controller has some additional extra parameters for configuring. Check out the config options in the configurator. This PID controller allowes less overshoot percentage and less Derivative needed to get the same affect.
- RC Interpolation added back with multiple options. (Use Auto for automatic rx rate configuration)
- Added "diff" cli command for easier backuping of config.
- Removed Super expo as it is a part of Super Rates and enabled by default.
- Increased linear rate range. rc_rate higher than 2.0 will become stronger and 255 will give full linear 2000deg/sec. Use configurator rate tool to see visual representation of rates.
- Smoother RC EXPO curve (Use rate tool in configurator for optimal rate tuning)

RC2 - Changed defaults / cleanup ONESHOT125 feature
RC3 - Defaults based on feedback // yaw_axis added to interpolation // add additional config parameters // FIX PPM on KISS
RC4 - Defaults based on new public tests // Fixed some wrong denom defaults for SPI targets
RC5 - Defaults based on new public tests // Fix for higher CPU due to filter reinitialisations // Add Sparky2 // Fixes for various targets
RC6 - Defaults // rename zero throttle stabilisation to pid_at_min_throttle // CLI cleanups
RC7 - Fix F4 diff/dump crashes // Fix for Sparky2 // Fix for d filter coefficients bug with higher pid denoms // Add new blackbox headers
RC8 - Defaults (notch filter 260hz) // add "diff showdefaults" command // change some cli names // more MSP parameters // higher gpio speed for i2c gyro targets // added blackbox motor test // Improved FPV angle mix feature // Reduced PID loop busy wait // Added new Target ISHAPEDF3 // Fix PPM for Revo //
RC9 - Support all targets (ignore int pin on pid loop)
RC10 - Defaults // Cleanups // Drop betaflight PIDc from OPBL CC3D target (use hex for full support)
RC11 - Fix for dterm setpoint range // sparky i2c fix
RC12 - Removed Sonar for naze32 to free some flash space // Removed feature super expo. Super expo is active when srates are set // Increased linear rate range. `rc_rate` higher than 2.0 will become stronger and 255 will give full linear 2000deg/sec // Redefined EXPO like in 2.8.0 RC4 rc_expo is now power expo! // Improved efficiency in rate code // rate cleanup // BlHeli passthrough fixes for F4 // New target RCEXPLORER
RC13 - Fix drastically rc expo curve around center // Fix anglemix mode in configurator // added forcing into DFU mode for F1 and F3 through cli command dfu // Fix faulty baro detection // Fix broken LEDSTRIP west indicator
RC14 - disable yaw filter by default // repurpose pterm setpoint weight to apply only on super rates // improve gyro debugging // fix beeper for sparky2

New 1.8.0 configurator (RC14) supports some additional tuning parameters. Don't forget to check tool tips for explanations!
New blackbox 2.5.6 supports all new parameters

1.7.8 configurator (RC12)
1.7.7 configurator (RC11)
1.7.6 configurator (RC10) supports some additional tuning parameters. Don't forget to check tooltips for explanations!
1.7.5 configurator for RC 8 and up supports some additional tuning parameters. Don't forget to check tooltips for explanations!
The ones who are trying a notch filter on pre RC7 releases and using separate gyro ans pid rate/denom you must upgrade to RC7 as there was a bug in coefficient calculation.

Use 1.7.2 configurator for up to RC 7.

1.7.1 configurator supports some additional tuning parameters. Don't forget to check tooltips for explanations!

The PID from 2.x versions can transfer to 3.0 as the scaling is the same, but you may expect that it should be possible to get higher PID's despite the same PID scaling due to new PID controller functionalities.

### New CLI commands

Note that most are better to set using the new BetaFlight Config GUI.
If a CLI command is not listed here then it is most likely not changed so look in the 'CLI command' page.
If in error, missing, etc then post a note about what is wrong in Boris' thread.
Be sure you type 'help' in the CLI to see all commands.

#### diff

To see what differs from default. This is handy to learn what the config GUI does with CLI settings.
This is also a better output for posting your CLI since then you post only setting that are different from the defaults instead of a 'dump' which outputs everything.

#### diff all

shows differences in all profiles and rate profiles

#### diff all commented

to see defaults

#### feature SUPEREXPO_RATES or feature -SUPEREXPO_RATES

Enables or disables the SuperExpo. If disabled as a Feature it can still be enable from a AUX (Mode tab) switch.

RC12- Removed feature super expo. Super expo is active when srates are set
This means that if you used rc expo you may need to readjust it. Just lower it.
Super expo feature is removed. Needs some cleanups though in the cli, but it is actually not there anymore. Superexpo is automatically active when you use srates (old rate). When 0 it is disabled.
The ones who like to have linear rates without super expo can now increase rc rate. All rc rates above 2.0 are now having much higher incremental. 2.18 is I believe already 1000deg/sec and 2.55 is 2000deg/sec.
Than you can add some rc expo.
This new solution offers more flexible rate behavior for everyone.
Also when you don't use rc expo now cpu usage will be lower as it the calculation is not performed anymore. Same for srates. If you don't use them than super expo calculations are not performed.

The current configurator doesn't display these rates properly, but that will happen soon when configurator gets an update. Probably next week.

#### set rc_interpolation = AUTO

*[OFF, PRESET, AUTO, MANUAL]*

This feature can cause the CPU to work harder to be able to run higher d setpoint weights and get cleaner motor outputs. Set to OFF if CPU loading is too high.
Note: Auto rc interpolation detects rx speed based on the reported speed by rx itself. But some receivers like also X4RS can report 9ms interval while it is actually 18ms on roll and pitch when using more channels than 8.

#### set rc_interpolation_interval = 19

*[1..50]*

#### set motor_pwm_protocol = OFF

*[OFF, ONESHOT125, ONESHOT42, MULTISHOT, BRUSHED]*

#### set zero_throttle_stabilisation = OFF

*[ON, OFF]*

NOTE: this is only in versions up to RC5. In RC6 and up it is changed to:

#### pid_at_min_throttle = OFF

*[ON, OFF]*

With this OFF the PIDC does NOT respond to Sticks when Throttle values in below min_check, just like in the original MultiWii, BaseFlight or CleanFlight.

#### set airmode_activate_throttle = 1350

*[1000..2000]*

That is the THRESHOLD (ACTIVATION) at which Airmode gets turned on the FIRST time the throttle hits this value. Airmode is then ON until DisArmed. This is to keep AirMode OFF while still on the ground. Once throttle goes above this setting AirMode is enabled through the entire throttle range.

#### set yaw_rate_acceleration_limit = 50?

*[0..200?]*
 Changed to rate_accel_limit in RC12

Yaw rate accel limit is the betaflight (2DOF) PIDC replacement for yaw jump prevention. It works differently and much better. It prevents quick accelerations and decelerations of yaw axis, what were actually causing jumps. For the Legacy PIDC use "d_yaw".

What we do with sticks is pushing the multirotors beyond their limits, but pid controller still wants to correct that and ramps up the motors what causes jerky behavior. With accel limits the pid controller has a protection to limit the acceleration and make it smoother what also helps against iterm windups we have seen getting worse on yaw axis.
Same can also be done for roll and pitch axis what is disabled by default. It can give much smoother flight characteristics.

#### set gyro_lowpass_level = HIGH

*[NORMAL, HIGH]*

 Sets how aggressive/steep the cutoff is. Steeper cutoff adds more delay compared to less steep one.
Boris states: "The gyro doesn't need a very steep cut if you ask me on a descent setup, while dterm is the one what needs more filtering".

### The following CLI commands are Per PROFILE so can be different in each Profile.

#### set pid_tolerance_band = 0

*[0..200]*

#### set tolerance_band_min_reduction = 40

*[0..100]*

Reduces "hunting" effect from pid controller.
What does the pid controller do? It hunts for error all the time. Its mainly P and D what are the quickest ones. The problem is that when error is very small like in forward flight or hover where not much error needs to be corrected the pid controller gets more "relaxed" to not keep looking for perfection. The amount of pid relaxation is determined in percentage in tolerance_band_min_reduction.
You can for example remove yaw noise on this way till certain level, but you may need to retune.

#### set pid_controller = BETAFLIGHT

*[LEGACY, BETAFLIGHT]*

#### set dterm_lowpass_level = HIGH

*[NORMAL, HIGH]*

 Sets how aggressive/steep the cutoff is. Steeper cutoff adds more delay compared to less steep one.

#### set dterm_lowpass = 100

*[0..500]*

#### set dterm_notch_hz = 0

Set to zero disables the filter.

*[0..500]*

#### set dterm_notch_cutoff = 150

*[1..500]*

#### set dterm_setpoint_weight = 120

*[1..200]*

### Changes in RC8 CLI
 New settings

#### set blackbox_on_motor_test = OFF

*[OFF,ON]*

#### diff showdefaults

 New Defaults
#### set dterm_notch_hz = 260

#### set dterm_not
off = 160

#### set pid_at_min_throttle = ON

#### set failsafe_procedure = DROP

*[AUTO-LAND,DROP]*

### Changes in RC12 CLI

Rc rate will be represented in deg/sec on the new configurator. That is your max stick reflection.
Also expo and other stuff will eventually be showed correctly with proper naming.

#### set rate_accel_limit = 0

*[0..1000]*
Increasing can help decrease Bounce back on low power copters.

#### set yaw_rate_accel_limit = 220

*[0..1000]*
Name changed.  See "yaw_rate_acceleration_limit" above for description.

#### set accum_threshold = 130

*[15..1000]*
#### set yaw_accum_threshold = 32

*[15..1000]*

#### set iterm_throttle_gain = 0

*[0..200]*
Joshua Bardwell's comment:
iterm_throttle_gain came from a suggestion I made to increase I gain roughly as the derivative of the throttle position. I noticed that I was having to increase I gain significantly higher--maybe 20 points or so--to keep pitch consistent on throttle punch and chops. So I proposed that the I term be artificially boosted when the throttle was moving quickly. iterm_throttle_gain controls the strength of this parameter.

#### set zero_cross_allowance = 2

*[0..50]*

#### rc_rate, rc_rate_yaw

linear rate without curves. Configurable up to 2000deg/sec
#### roll_srate, pitch_srate, yaw_srate

super expo rate like it was already, but now doesnt need a feature for being activated. Set it to 0 and super expo is disabled. You can now even have super expo on one axis and not on another for example
#### rc expo

new expo what needs lower numbers with smoother curve and more center feel configurability. Useful particularly for linear rates.

Note: The Srates replace the old rates for Roll, Pitch & Yaw so still can be adjusted with Apps that use MSP like MWOSD.

A tip of tuning super expo rates.

Configure rc rate for how you want your mid stick to feel and than just add more or less srates to change transition and max stick reflection.
Good thing about srates is that it kind of tries to keep the same mid stick while the extremes do change. Its like inverted expo idea.

Post by ctzsnooze explaining these settings:
[http://www.rcgroups.com/forums/showpost.php?p=35602942&postcount=37292]

Post by Boris showing Old verse New rates with and without using SRATE settings:
[http://www.rcgroups.com/forums/showpost.php?p=35704903&postcount=38205]

Note: See the FAQ "What is the story on the different Rates and Expos?" for an in depth explanation on the history of Rates and Expos.

### Changes & new in RC13 CLI

command dfu
forcing into DFU mode for F1 and F3

### Changes & new in RC14 CLI

repurpose pterm setpoint weight to apply only on super rates

## Discussions on using the new features:

### Legacy PID controller

This is a rewritten MWREWRITE PID controller that uses integer math instead of Floating point math.
Some may like this one better and it is also recommended to run faster PID loop rates on F1 processors.

### Betaflight 2DOF PID controller

This is a NEW PIDC controller.
All components P, I and D work completely independent from each other. That means it is a parallel PID controller.
On top of that also the setpoint weight from 2DOF architecture is used for Derivative component. So technically it is a Kp, Ki, Kd, c from pid2 in [here.](https://www.mathworks.com/help/control/ug/two-degree-of-freedom-2-dof-pid-controllers.html?s_tid=gn_loc_drop)

Post from Boris about this differences between the Legacy and 2DOF PIDC:
[http://www.rcgroups.com/forums/showpost.php?p=35460572&postcount=35822]

Post from Joshua explaining 2DOF PIDC and setpoint weight:

Betaflight 3.0's new 2 degree-of-freedom PID controller is one of its most exciting features. Let's learn what the new "setpoint weight" sliders do! I also discuss the new RC interpolation feature.

Error in a PID controller can be separated into externally-induced error and error caused by moving the set-point. The 2DOF PID controller allows you to distinguish between these two types of error. In other words, it allows you to control how aggressively the PID controller responds to your stick movements.

P term setpoint weight basically controls overshoot. Higher P term setpoint weight results in sharper stick response, lower P gains, and more overshoot and oscillation. Lower P term setpoint weight results in softer stick response, higher P gains, and less overshoot and oscillation.

D term setpoint weight is harder to describe. Higher D term setpoint weight results in an overall much sharper and more precise flight feel. But it also makes the copter fly less smoothly, since it is responding exactly to every little wiggle and jiggle of the stick. Lower D term setpoint weight results in a smoother, more "organic feeling" flight experience, but also a softer and less precise one.

A very critical point to understand is that these characteristics ONLY come into play when the PID controller is responding to your stick movements. When the sticks are not moving, or are moving slowly, the effect is less pronounced or nonexistent, and the PID controller works exactly like it used to. So you can think of P, I, and D as tuning the overall response of the copter to all inputs, including external ones like wind blowing on the copter, and the setpoint weight sliders as tuning the way the copter responds specifically to stick movements.

A video by Joshua about this (note: for 3.0):
[https://www.youtube.com/watch?v=4zncyYdAZPU]

### V3.0.1

Dterm setpoint: 0 = Measurement, 1 = error. Everything above 1 is more error / more stick derivative. 2 = 2 times error.
Second slider used to be P setpoint as originally described in 2DOF pid controllers and in release candidates, but I didn't find it as useful as I would like so it has been repurposed to be transition for the first slider.
When going into the roll its error and when returning from roll back to center stick it will be transitioned more into measurement to smooth it out.
Here it means D setpoint transition of 1 means no transition at all. Its fully error from setpoint weight. When lower than 1 it will soften the transition on returning stick slowly to measurement.

For example if you liked the smoothness of measurement on quick stick inputs etc, but you also like the responsitivity of error, which makes it more robotic than you can find a middle way now. Still high stick response, but without losing the smoothness on stick returns.
I personally fly 2.0 setpoint with 0.3 transition. 0.3 is like exponential curve on stick returns. It will help slow down the rotational rate faster instead at the last moment to prevent bumpyness.

#### Not sure where new info on using the "setpoint weight" sliders and Tuning the newest BetaFlight PIDC (2DOF) should go but for now adding it here. These are Posts from people that have successfully used these to 'tune' out bad behavior.

Maybe this should go into a New FAQ. Post in Boris' thread suggestions.

##### General explanation from ctzsnooze:

When flying through turbulent air the quad gets lots of external inputs. If the buffeting effect results in errors between your set roll rate and what the gyros report, then the PID system has to make corrections. Most PID systems 'under-correct' external influences simply because 'over-correction' will cause oscillation. When tuning, we aim to get the magnitude of the under-correction to be as small as possible. A very highly tuned quad sits just under the point of self-oscillation all the time. Mostly we don't tune as high as that because it won't tolerate dodgy props and we might get hot motors - however with the new filtering options we can sometimes up-tune without such a problem.

I takes time to build up and let go. So when flying at medium speed through slightly bumpy air and noticing you have a 'wandering line', more I will usually help. But too much I may mean that once you leave one bank of moving air and enter the next, the accumulated iTerm correction will be going the opposite way and will take some time - about half a second - to 'let go'. So adding more iTerm won't always solve the problem. I certainly won't fix fast buffeting, it is too slow, and 'too much' I may not be helpful even for slow wandering lines.

D on the other hand responds immediately to sudden changes, and responds faster as the buffeting becomes faster. It does very little or nothing for slow drifting behaviors (that's what I is for).

P is good for any speed of buffeting but mostly when the angular deviations are larger, rather than small fast deviations for which D is more effective.

If the quad is well tuned and has crisp roll stops, it should fly well in wind as well.

If your filtering is heavy, the props are relatively heavy for the motors, and the quad already has issues in prop wash or with wobble, then it probably won't handle wind buffeting very well either.

If you fly very fast through very turbulent air you need super responsive P and D and responsive lightweight props. The more 'aerodynamic' the quad the better. You may want to push P and D higher than 'normal', and maybe see if you can run with slightly higher filters - i.e. re-tune more aggressively. That tune might put you at risk of hotter motors or other oscillations and demand clean props, so it might not be your 'everyday' tune, but it should generally handle wind that little bit better than a less highly tuned machine.

##### Post from QuadMcFly:

Well I had an interesting experience trying to tune these silly 5x4.5x3HBN props on my primary acro quad. Mostly I just wanted to see if I could. The key ended up being kind of counter-intuitive.

Basically I had to screw with the set-point sliders in 3.0.1 to compensate for the slow transition speed of the props, but it was exactly backwards from what I thought. The D set-point slider had to get put almost all the way to the left, and the Transition set-point slider all the way to the right, so essentially that basically equals almost the old "measurement" D calculation method. Then I was able to get my P gains back up to make up for the smoothing of the measurement method and get some snap back. I had to jack D way up too, to get rid of prop wash and it's still not gone entirely, but it's looking pretty darn good! Oh, also my I gains are quite high on both roll and pitch.﻿ I'm pretty pleased with the results! Still a tiny bit of prop wash at high throttle, but I think I can get rid of it with a tiny bit of TPA without sacrificing too much stick feel. Right now my TPA is at 0.

#### Posts from the "BB log video response" thread by Woody_99:

- problem: Need just a little help with fine tuning a couple of my X quads.
(130 and 250 size. BF 3.01)
On a hard, high throttle 180 turn, I get some shaking on both of them.
Been raising D, and it seems to be helping, but is that the direction I should be going? Motors aren't hot.
From what I've been able to comprehend, that seems to be right, but wanted to double check that I'm on the right track.
- suggestion: Yes, raising 'D's should be correct to suppress prop wash as long as motors do not get hot.
Do run a BB Log to check for oscillations and other bad things.

ßF 3.0.x is still quite new but in Boris' thread there is discussion on the two sliders in the PID Tab. Seems adjusting these can really help eliminate prop wash and help a copter fly the best. Not many people have posted about these so not much is known on how to adjust them.

- Result: Raised D just a couple more points on both quads. Propwash was better, but still there.
Instead or raising D any further, I thought I would give the top slider (Setpoint Weight) a try. 1st adjustment on the 130 and the propwash is totally gone at a Setpoint Weight of 2.36.
250 quad, I made the same 1st adjustment. Better still, but still slightly present. Made a second adjustment, and now the shakes are gone from the 2nd quad too. Setpoint Weight at 2.46.
Both have the Setpoint transition at 0.3.

Could be just a placebo effect, because I have no clue what the slider does, but both quads are better than ever.
Motors are slightly above ambient temp, so I think I'm set.
Wish I could say the same for my batteries. Flies so nice I was really pushing them today.

##### Boris' comment of the Dterm Sliders:


The sliders are pretty easy. Just use extremes and feel difference.
Upper slider determines the stick sharpness (acceleration of stick input).
The lower slider determines how smooth it acts on stick returns.

Upper slider high: Sharpest response
Lower slider high: sharpest response on stick returns, but also chance to most jerkiness. So smooth this out by higher transition deacceleration.

##### Slider Tuning Tip from Tesseract1984:
My freestyle setting was top slider down to 1.7 and bottom slider adjusted until bounceback is eliminated. I ended up with 0.8 (correction)

Note: for my method, you quad needs to be well tuned already. No noise issues, minimal propwash (i have virtually zero since moving to dshot). If you don't sort your tune out first, you'll be chasing these sliders around trying to make sense of what it's actually doing to your tune.

Tune first. Sliders last. This may be me speaking for myself and there might be a better method but this is what works for me. Oh, also, when you're tuning, don't be so afraid of using D. Keep jacking it up while maintaining motor temps until your prop wash is under control. My numbers ended up a lot higher in 3.1 over any other release.
And Boris' reply:
Yeah that's a valid statement. The sliders can even differ per prop. On bullnose props which seem a bit more bouncy in general I tend to run lower setpoint transition. On that way I don't have to sacrifice much sharpness on my tune.

A Joshua Bardwell video on [Betaflight 3.0 Setpoint Weight (2DOF PID Controller)](https://www.youtube.com/watch?v=4zncyYdAZPU)

##### MoreTuning Tip from Tesseract1984:

Ya...I almost feel like there needs to be a blurb somewhere that post 3.0.1 you should rethink your paradigms around what are acceptable value ranges.

I remember in 2.9.1 if i had D over 26 i had screwed up and usually meant starting from scratch. My D in 3.1 is now at 46 and 50 for R and P respectively and motors still come down cold. My P is also a lot higher than other releases on this same powertrain. I basically stopped pushing D up with my propwash handling was good.

Yes lower the transition slider also helps with this if you are getting bounceback on move completion.

So scenario 1: Propwash

- Crank the D, keeping an eye on motor temps
- Motor temps high and still have propwash? Back off on P and try working D up again

Scenario 2: Behavior on stick return

- Play with sliders
- Transition slider specifically introduces some deceleration on stick return so that stops are not as abrupt.

### PID control at Zero Throttle

Originally Posted by MasterZap View Post
Let me try to explain this in a clear way:

As boris say, you have three things:

Motor Stop (nobody should use that in 2016, so forget it)
Air mode (everyone should use that )
Pid_at_zero_throttle

!! BORIS - CORRECT ME IF I AM WRONG !!

pid_at_zero throttle kills PID's COMPLETELY for after you just arm. The moment you spool the motors up above zero, PID's start working. Now I'm not sure if they continue to work until you disarm or not I don't know, but as you see below, that doesn't matter.

I think the motivation for this "feature" is to stop people whining about motors revving on the bench, or I dunno. For me, who run an underslung battery that barely lets the quad stand, I actually WANT pid at zero throttle, or it surely tips over when I arm it. Me, I *need* stabilization on the ground!!

Airmode also has a threshold for starting, and again, the moment you come over this threshold, it is on until you disarm. Plus, airmode overrides "Pid_at_zero_throttle". So even if "pid_at_zero_throttle" isn't sticky, airmode IS sticky, and since it overrides.... it makes pid_at_zero_throttle "effectively sticky". So the moment you've revved up, you will have full authority until you disarm.

Clear as mud?

/Z

### Notch Filters

See: [Black-Box logging and usage](/docs/wiki/guides/current/Black-Box-logging-and-usage)

notch filter explanations

A Video from Joshua Bardwell on Notch filtering:
[https://www.youtube.com/watch?v=UQOqYOBSCc8]

A short video demonstrating with and without Notch filter from Robogenisis
[https://youtu.be/ic6Np86Jsrs]

A discussion of how to and when to setup LPF & Notch filters:
[What filters should we add when?](http://www.rcgroups.com/forums/showpost.php?p=35727622&postcount=38376)
[... when trying to reduce dterm vibrations, how do you decide when to i) increasing dterm filtering, and ii) simply reducing dterm gains somewhat?](http://www.rcgroups.com/forums/showpost.php?p=35728426&postcount=38380)

Explained by R.A.V.
Here's an explanation for the new notch filter in 3.0 with the new PR in mind. Maybe waltr knows best where to put something from it into the wiki.

From wikipedia:

Quote:
In signal processing, a band-stop filter or band-rejection filter is a filter that passes most frequencies unaltered, but attenuates those in a specific range to very low levels. It is the opposite of a band-pass filter. A notch filter is a band-stop filter with a narrow stopband (high Q factor).

The pid loop calculates an error from the current gyro rate and a set point and will command the motors to correct this error. There is a limit to how fast motors can react and it makes no sense to try to correct anything at high frequencies above 200Hz.
This is why the lowpass filter was introduced. It will leave most frequencies below the cutoff value intact but it will already attenuate the cutoff frequency by -3dB. The attenuation will increase with higher frequency.
Unfortunately some setups are so noisy that the attenuation will not be enough and the filter cutoff has to be set very low to 70Hz or 60Hz simply to get rid of the noise above 200Hz.
This means that useful information between cutoff and 100Hz is lost. A lower cutoff also means a higher delay caused by the filter which is especially bad for dTerm and can cause more propwash.

The notch filter is an additional filter which can be enabled for gyro data and dTerm data and will remove a lot of noise from the signal before feeding it into the lowpass filter.
This way the cutoff value of the lowpass filter does not need to be lowered too much.
A notch filter with a low bandwidth in combination with a lowpass filter with high cutoff will have less delay and less noise than a lowpass filter alone with low cutoff.

By default the filter is disabled. It will be enabled when the center frequency is set.
This can be adjusted with gyro_notch_hz while the cutoff frequency at the lower side can be adjusted with gyro_notch_cutoff
For dTerm the settings are dterm_notch_hz and dterm_notch_cutoff.

Center frequency should be the mean frequency of your motors, most likely somewhere between 200Hz and 300Hz.
When setting the cutoff value you should avoid getting the filter's range below 100Hz. Keep in mind that the attenuation at this frequency is already -3dB.

My very noisy copter with mean motor frequency at 250Hz runs very well with these settings:
```
gyro_notch_hz = 250
gyro_notch_cutoff = 130

dterm_notch_hz = 250
dterm_notch_cutoff = 130

gyro_lowpass = 110
dterm_lowpass = 0
yaw_lowpass = 0
```
This means that the notch filter will remove noise from gyro before the lowpass filter will improve the signal further.
Because there is still some noise left in dTerm, another filter is needed. The notch filter alone is enough to remove the remaining noise in my case. It causes less latency than a lowpass filter and keeps the dTerm more in phase with pTerm.
No filtering is required for yaw for my copter with filtered gyro.

The notch filter requires some additional floating point math on each axis for gyro and dTerm so F1 targets might get slower with it enabled.
In my opinion a properly setup notch filter can also help noise free copters, especially on dTerm.

Without blackbox it will be very hard to determine the center motor frequency. I already looked into the current spectrum implementation of the viewer and will add an option to get the frequency easier. It does not need to be very precise though. I'd recommend to start with a center frequency of 200 - 250. Higher kv motors on 4s will create higher frequency noise than low kv on 3s.

Cutoff describes the lower end of the filter response and should not be too low in order to reduce latency. I don't think anyone would need it to be lower than ~130.

### roll/yaw cam mix

from FieserKiller
Note that its not active permanently in this version of BF any more. You have to configure it in modes tab. I've bound it to a switch so I can finally let my buddys fly my quad without crashing due to unfamiliar controls.

### Tuning Tips

#### How high can I go with D on pitch?

 Got some HQ Durables today and found out that my 5x4x3 tune doesn't work out for them. Using KISS24 escs and the KISSFC running BF 3.0. I can lower my P on Pitch but than it doesn't lock as good as it does with a higher P gain. But with a high P gain I nearly have to set my Ds to like 40. Is this good? and btw also using lumenier rx2206s. Thanks Thomas.
Boris' Answer:
If its just the bounce:
You could try lower p setpoint weight.
But you could also try test dterm setpoint of 0.
See if the above 2 can remove the need for more D.
But high D is not an issue at all if the motors don't heat up and if it all still sounds smooth.
Thomas' Reply:
Set dterm setpoint to 0 and no bounce back at all. Gonna try to go higher on P on Pitch and lower the D on pitch to get the feel I want!

## Discussions on using the New configurator

#### There are ? marks next to many of the setting Fields. Mouse Over these for a short Explanation of what they do.

- measurement and error is now the d term slider thingy.
all the way to the right is error, all the way to the left is measurement. can vary.
scroll down under your PIDS.
BF PIDC does not use the dropdown for PID_DELTA_METHOD (or the CLI variable) but the slider instead.
0 is like 2.9 measurement and 1 is like 2.9 Error.
See the 2DOF PIDC details above.

- Also my blackbox logging rate is off may be a bug in running 4k/2k and on blackbox it's saying 1k is 50% when it's really 25%.
Not a bug. BB Rate is a percentage of the PID loop speed, since that's where the important data comes from.

- The OSD Tab is ONLY for FC boards that have a integrated OSD chips. One such FC is the omnibus.

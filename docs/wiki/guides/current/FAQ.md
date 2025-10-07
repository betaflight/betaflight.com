# FAQ

The following FAQs are common questions that were asked in Boris' ßF or other RCG threads.
Many of these do cover Basics but be Aware that some cover specific Versions of ßF Firmware and may be Obsolete for the later Versions of the firmware.
Therefore be sure to Read the Release Notes to know what commands or features are currently supported.

## Contents

1. [I'm a Newbie, how do I start ?](#im-a-newbie-how-do-i-start-)
1. [How do I install Betaflight ?](#how-do-i-install-betaflight-)
1. [What's the history of Betaflight and it's relationship to Cleanflight ?](#whats-the-history-of-betaflight-and-its-relationship-to-cleanflight-)
1. [What is the difference between Min_check Min_command and Min_throttle and stick inputs ?](#what-is-the-difference-between-min_check-min_command-and-min_throttle-and-stick-inputs-)
1. [Why wont my FC board arm after upgrading the firmware ?](#why-wont-my-fc-board-arm-after-upgrading-the-firmware-)
1. [Why is the Gyro light turned off and the 3D Model not moving ?](#why-is-the-gyro-light-turned-off-and-the-3d-model-not-moving-)
1. [What is Air Mode ?](#what-is-air-mode-)
1. [How do I enable Air Mode ?](#how-do-i-enable-air-mode-)
1. [What is Acro Plus ?](#what-is-acro-plus-)
1. [What is 2khz mode ?](#what-is-2khz-mode-)
1. [How do I activate 2khz mode ?](#how-do-i-activate-2khz-mode-)
1. [What Flight Controllers are recommended to get the best out of BetaFlight ?](#what-flight-controllers-are-recommended-to-get-the-best-out-of-betaflight-)
1. [What are the differences between LuxFloat and Rewrite PID Controllers ?](#what-are-the-differences-between-luxfloat-and-rewrite-pid-controllers-)
1. [What PIDs do and how do they do it ?](#what-pids-do-and-how-do-they-do-it-)
1. [Is there a good resource for learning how to tune using Black Box ?](#is-there-a-good-resource-for-learning-how-to-tune-using-black-box-)
1. [Why does my copter behave erratic after a crash ?](#why-does-my-copter-behave-erratic-after-a-crash-)
1. [How does yaw_jump_prevention_limit work ?](#how-does-yaw_jump_prevention_limit-work-)
1. [How should I configure the FailSafe system ?](#how-should-i-configure-the-failsafe-system-)
1. [What is the best practice for configuring the Throttle end points ?](#what-is-the-best-practice-for-configuring-the-throttle-end-points-)
1. [How do I configure BLHeli ESCs via BetaFlight ?](#how-do-i-configure-blheli-escs-via-betaflight-)
1. [Why does my copter flip when trying to takeoff ?](#why-does-my-copter-flip-when-trying-to-takeoff-)
1. [Will the PIDs change significantly when switching from two-blades to tri-blades ?](#will-the-pids-change-significantly-when-switching-from-two-blades-to-tri-blades-)
1. [Why do I have issues flashing my new F3 Flight Controller ?](#why-do-i-have-issues-flashing-my-new-f3-flight-controller-)
1. [Will Betaflight code be merged back into Cleanflight ?](#will-betaflight-code-be-merged-back-into-cleanflight-)
1. [When I update to the latest version of BetaFlight do I need to recalibrate my ESCs ?](#when-i-update-to-the-latest-version-of-betaflight-do-i-need-to-recalibrate-my-escs-)
1. [Why do my motors keep accelerating on the bench when I arm without props ?](#why-do-my-motors-keep-accelerating-on-the-bench-when-i-arm-without-props-)
1. [Why do my motors spin briefly when rebooting the Flight Controller ?](#why-do-my-motors-spin-briefly-when-rebooting-the-flight-controller-)
1. [If the accelerometer is disabled and FailSafe Activates what happens to the copter ?](#if-the-accelerometer-is-disabled-and-failsafe-activates-what-happens-to-the-copter-)
1. [Why does my Flight Controller blink/beep lots of times when powering up ?](#why-does-my-flight-controller-blinkbeep-lots-of-times-when-powering-up-)
1. [My PID D gain value is small after tuning in 2khz mode is that normal ?](#my-pid-d-gain-value-is-small-after-tuning-in-2khz-mode-is-that-normal-)
1. [Why are the accelerometer Black Box traces so bad in 2KHz mode ?](#why-are-the-accelerometer-black-box-traces-so-bad-in-2khz-mode-)
1. [How do I get vbat_pid_compensation system working ?](#how-do-i-get-vbat_pid_compensation-system-working-)
1. [With vbat_pid_compensation are there issues moving from 3S to 4S batteries ?](#with-vbat_pid_compensation-are-there-issues-moving-from-3s-to-4s-batteries-)
1. [How can I run the PID controller faster than 2kHz ?](#how-can-i-run-the-pid-controller-faster-than-2khz-)
1. [What is OneShot125, OneShot42 and MultiShot and how do these relate to max_throttle and Looptime ?](#what-is-oneshot125-oneshot42-and-multishot-and-how-do-these-relate-to-max_throttle-and-looptime-)
1. [How do I go about suggesting Betaflight App enhancements ?](#how-do-i-go-about-suggesting-betaflight-app-enhancements-)
1. [How do I lower the chance of my copter producing Magic Smoke when powering on ?](#how-do-i-lower-the-chance-of-my-copter-producing-magic-smoke-when-powering-on-)
1. [Why do we have RC Rate and also Yaw Pitch Roll Rates ?](#why-do-we-have-rc-rate-and-also-yaw-pitch-roll-rates-)
1. [Why does it matter to prevent motor jitter ?](#why-does-it-matter-to-prevent-motor-jitter-)
1. [Why when I change something using CLI board crashes ?](#why-when-i-change-something-using-cli-board-crashes-)
1. [Will MW2.3 PID controller work on default PIDS ?](#will-mw23-pid-controller-work-on-default-pids-)
1. [How do I keep and then restore my Betaflight Settings each time I upgrade ?](#how-do-i-keep-and-then-restore-my-betaflight-settings-each-time-i-upgrade-)
1. [What is yaw_jump_prevention_limit and what does it do ?](#what-is-yaw_jump_prevention_limit-and-what-does-it-do-)
1. [What is yaw_iterm_reset_degrees and what does it do ?](#what-is-yaw_iterm_reset_degrees-and-what-does-it-do-)
1. [How does Super Expo work ?](#how-does-super-expo-work-)
1. [How do rates relate to pitch roll & yaw degrees/s ?](#how-do-rates-relate-to-pitch-roll--yaw-degreess-)
1. [Which Flight Controllers currently use SPI ?](#which-flight-controllers-currently-use-spi-)
1. [Which HEX target do I download and flash to my Flight Controller ?](#which-hex-target-do-i-download-and-flash-to-my-flight-controller-)
1. [How do I setup for reversed prop rotation ?](#how-do-i-setup-for-reversed-prop-rotation-)
1. [What is a recommended FC and esc setup to run at 8khz, also i see reference to 4/4 or 4/4/32 or 8/8, what are these referring to?](#what-is-a-recommended-fc-and-esc-setup-to-run-at-8khz-also-i-see-reference-to-44-or-4432-or-88-what-are-these-referring-to-)
1. [Is PID tuning any different at different PIDC rates ?](#is-pid-tuning-any-different-at-different-pidc-rates-)
1. [What is the difference in PIDC Iterm in bF versions ?](#what-is-the-difference-in-pidc-iterm-in-bf-versions-)
1. [How to setup blackbox record rate with onboard dataflash ?](#how-to-setup-blackbox-record-rate-with-onboard-dataflash-)
1. [How to setup the rates and SuperExpo ?](#how-to-setup-the-rates-and-superexpo-)
1. [What is the story on the different Rates and Expos ?](#what-is-the-story-on-the-different-rates-and-expos-)
1. [How do I solve Yaw twitches or mid throttle oscillations ?](#how-do-i-solve-yaw-twitches-or-mid-throttle-oscillations-)
1. [Is there a way to download blackbox logs through a terminal client ?](#is-there-a-way-to-download-blackbox-logs-through-a-terminal-client-)
1. [Why do LED strips not work ?](#why-do-led-strips-not-work-)
1. [Recently with the temps dropping, my quad has started to develop a random twitch. Anyone else experience random issues when it's 20'ish degree's F outside ?](#recently-with-the-temps-dropping-my-quad-has-started-to-develop-a-random-twitch-anyone-else-experience-random-issues-when-its-20ish-degrees-f-outside-)
1. [Why can't I connect to my flight controller using MSP over UART1?](#why-cant-i-connect-to-my-flight-controller-using-msp-over-uart1-broken-usb)
1. [Is it possible that we can flash the FrSky receivers thru the flight controller like we now flash the ESC?](#is-it-possible-that-we-can-flash-the-frsky-receivers-thru-the-flight-controller-like-we-now-flash-the-esc)
1. [Is there a way to dismiss the OSD post flight statistics screen?](#is-there-a-way-to-dismiss-the-osd-post-flight-statistics-screen)

**If your question is not listed above then please check the following pages:**

http://github.com/borisbstyle/betaflight/wiki/Betaflight-specific-CLI-commands

http://github.com/borisbstyle/betaflight/wiki/BetaFlight-Deep-Dive

---

## Im a Newbie how do I start ?

Start with the following video that gives a very comprehensive guide on Betaflight and the best practice approach for it's configuration:
http://www.youtube.com/watch?v=xSzO6HP6yzs

Also take a look at the **[MultiWii Wiki](http://www.multiwii.com/wiki/?title=Main_Page)**, then the **[Naze32 Manual](http://www.abusemark.com/downloads/naze32_rev2.pdf)**, the CF docs in Github an finally the ßF Github docs and this Wiki.

Fast and easy configuration tutorial: https://youtu.be/tlfBlgcpink

Videos on Cleanflight throttle parameter configuration (RC input verse outputs to ESCs):
http://www.rcgroups.com/forums/showpost.php?p=34144329&postcount=20469

See the next FAQ topic ("How do I install Betaflight") when you are ready.

## How do I install Betaflight ?

Read the [Installing BetaFlight ](Installing-Betaflight) support page.

## What's the history of Betaflight and it's relationship to Cleanflight ?

A little history. This all started with OpenSource MultiWii code based on Arduino 8-bit boards. When the 32-bit STM32 processors become available the MultiWii code was ported to the STM32 and was called BaseFlight. Due to politics others forked the BaseFlight code to CleanFlight. More recently Boris decided that he could possibly make improvements on the way the PID control loop works and forked an Experimental version as BetaFlight.
Therefore documentation on ßF and CF tends to only show what is new or changed and the documentation of previous Firmware must be read.

## What is the difference between Min_Check Min_command and Min_throttle and stick inputs ?

From MasterZap

min_check has nothing to do with ESC's ....

min_command is the value sent when disarmed (or when armed and motor stop is on, i.e. when we want the motors not to spin).
min_throttle is the value sent when armed (with motor stop off)

min_check is about stick command and only matters towards your actual throttle stick. It has no effect on what is sent to the ESC.

The misunderstanding of this comes from the fact that your throttle stick doesn't even begin "working" until you are above min_check. People try explaining this with sentences like "the FC will map min_check to min_throttle", which while true, makes people believe there is this relation. There is no relation. All that is being said is "the flight controller only cares about the range above min_check up to full throttle, and will remap that range into the 0%-100% input to the flight controller, which then outputs whatever it wants to the motors"

From waltr

In general (all channels) min_check & max_check are only for Stick commands. then ONLY on throttle channel min_check is used in the code for Arming and PID controller depending on other settings (pid_at_min_throttle, AirMode, etc).
mid_rc (Note: this is incorrectly label throttle middle in the CF config GUI) is telling the FC what your Stick Center value is, typically 1500 but may be 1520 on some radios. mid_rc is NOT used on throttle channel.

The default max_throttle of 1850 comes from MultiWii and is a SAFE max value for ALL ESCs.
Code from MW2.3 config.h file

/\***\*\*\*\*\*\*\***\*\*\*\*\***\*\*\*\*\*\*\*** Motor maxthrottle **\*\***\*\***\*\***\*\*\***\*\***\*\***\*\***/
/_ this is the maximum value for the ESCs at full power, this value can be increased up to 2000 _/
#define MAXTHROTTLE 1850

DEADBAND is only removing stick center value (all channels except throttle) to eliminate stick center jitter and non-returning to exactly 1500. no more, no less. Do not use this term for anything else.

Reading the MultiWii WIKI and even the MultiWii code config.h file will help to understand what these values are. A link is in the ßF Wiki, FAQ: getting started.

In CF and ßF the expected stick end point values are set with (I don't know in what versions these came about but were not in the original port of MW to BF code):
Code:

# rxrange

rxrange 0 1000 2000
rxrange 1 1000 2000
rxrange 2 1000 2000
rxrange 3 1000 2000

These can be adjusted for radios that can not meet the standard values. These can also be used to Reverse a Stick's direction by swapping the End Point values: Example- rxrange 0 2000 1000 reverses the Roll stick.
The FC firmware uses the mid_rc and these to calculate a stick value to hand off to the PIDC code. max_check is NOT used here.

If a channel does not get to these end points then the FC will simply not see full movement, either on one side or both. This is one reason I and others and the MW Wiki and CF docs state to adjust the radios stick end points to these defaults. The other is ensuring the stick exceed the min_check, max_check thresholds so stick commands work.

Another explanation from Joshua Bardwell:
Max and min channel values are determined by the rxrange command. They default to 1000 and 2000. Max_check and min_check are used to decide if you are entering a stick command. Here is the kicker--how do you disarm the copter if yaw is active? You would have to go full deflection and the copter would yaw like crazy. In order to address this, when the throttle is below min_check, and when stick arming is used (vs. switch arming), the yaw input is disabled. If you are using motor_stop, the motors also stop running when the throttle is below min_check. Sometimes, this behavior is referred to as a deadzone at the bottom of the throttle stick travel. Many people refer to this as Deadband but causes much confusion with stick center DEADBAND CLI settings, therefore DEADZONE is preferred

You can see that there is no need for a corresponding disabling of inputs at the top of the throttle range, because you never input any stick commands that require the top of the range when you are flying. The only stick command that is input when you are flying is disarm, and that is low yaw and low throttle. So there is a dead space at the bottom of the throttle range (below min_check) but no dead space at the top of any channel range.

Videos by Joshua Bardwell:
Cleanflight throttle parameter configuration -
Part 1: http://www.youtube.com/watch?v=WFU3VewGbbA
Part 2: http://www.youtube.com/watch?v=YNRl0OTKRGA

## Why wont my FC board arm after upgrading the firmware ?

Check the following:

- Perform a full chip erase while flashing the firmware.
- You can't arm the FC while in the CLI. The status light flashes rapidly.
- Try calibrating the accelerometer.
- Check RX basics (see below)
- Reduce the amount of aux channels to reduce time for task RX
- If the status light flashes slowly then the CPU could be over-taxed (see below).
- Gyro didn't CAL upon FC boot-up due to the copter moving. Copter MUST NOT move to cal gyro. An LED (and beeper if connected) will flash three times when Gyro Cals. If it did not cal then do a Gyro CAL stick command or increase the Moron_threshold or enable cal gyro upon Arming (new is 3.0).
- Copter Tilted more than the 'small_angle' setting. Increase small_angle. To Arm at any angle set this to 180.

There is a new task scheduler present in firmware versions greater than 2.2.0 If upgrading from a version prior to this, then check to see if the FC status light is flashing. If it is then this indicates that there is not enough processing time to complete all the features that have been enabled.
On newer versions on the ßF Configurator the CPU loading is displayed in the Status bar and MUST be less then 100%, preferably less than 50%. If at 100% then decrease the LOOP Rates (Gyro and/or PID), click Save and Reboot and recheck CPU loading.

In the CLI type the _tasks_ command and check the results:

```
# tasks
Task list:
0 - SYSTEM, max = 10 us, avg = 0 us, total = 2 ms
1 - GYRO/PID, max = 934 us, avg = 667 us, total = 26004 ms
2 - ACCEL, max = 153 us, avg = 122 us, total = 974 ms
3 - SERIAL, max = 67 us, avg = 2 us, total = 12 ms
4 - BEEPER, max = 8 us, avg = 0 us, total = 3 ms
5 - BATTERY, max = 40173 us, avg = 1 us, total = 47 ms
6 - RX, max = 180 us, avg = 130 us, total = 483 ms
7 - COMPASS, max = 156 us, avg = 125 us, total = 41 ms
8 - BARO, max = 137 us, avg = 106 us, total = 273 ms
10 - ALTITUDE, max = 264 us, avg = 152 us, total = 165 ms
11 - DISPLAY, max = 130302 us, avg = 26263 us, total = 5115 ms
```

This shows that the copter has Display, Magnetometer, Barometer & Accelerometer systems enabled.
Try disabling **each one in turn** until the CPU loading is under 100%.

The list of CLI commands to achieve this are (this can be done in the newer Configurator):

```
feature -DISPLAY
set mag_hardware = NONE
set baro_hardware = NONE
set acc_hardware = NONE
```

Disabling the Accelerometer will force the copter into Acro mode (no self-leveling in Level and Horizon modes).

**Important:** Remember to save the CLI settings and exit the CLI (otherwise the board will not arm!)

One other method to free-up the CPU is to:

- Move from PID controller LuxFloat to MWREWRITE (Pre-ßF3.0)as the later requires less CPU power.
- Move from PID controller BetaFlight to Legacy (ßF3.0)as the later requires less CPU power.
- Disable soft serial.

Do not forget to check the Basics.
Use the Receiver Tab and check that each stick moves the correct channel slider and the slider moves in the correct direction. If the wrong channel slider moves, then check the channel MAP (eg AETR instead of TAER).
Also check that the stick End Point values are still correct. Min/max stick ends points should be 1000/2000. For more information take a look at the Question called "What is the best practice for configuring the Throttle end points".
Make sure your throttle stick's minimum value is lower than min_check! If in the modes tab you see that the quad should be arming but isn't, use "set min_check" and make sure that it is greater than the lowest throttle value in the receiver tab.

Is the Accelerometer Calibrated? Needs to be done once to allow arming.

To determine if the ACC or other sensor enabled is causing problems use the "status" command in the CLI. The "System load" must be less than 100%. If greater than 100% then the processor has too many things to do.

```
	# status
	System Uptime: 40 seconds, Voltage: 0 * 0.1V (3S battery - OK), CPU:8%
	CPU Clock=72MHz, GYRO=MPU6050, ACC=MPU6050.n, BARO=BMP280
	Cycle Time: 491, I2C Errors: 0, config size: 1308
```

## Why is the Gyro light turned off and the 3D Model not moving ?

This is a side effect of the accelerometer being disabled. When connected to the Flight Controller via USB, the 3D model in Cleanflight Configurator depends on the accelerometer to rotate properly when the multirotor is moved around. The gyro light being off is just a glitch in the Configurator. Neither of these are anything to worry about, it is perfectly normal.

When you change your looptime in the Configurator (or via CLI command) to a faster speed than the defaults, Betaflight will automatically disable the accelerometer on some targets to free up processing power and allow the faster looptime.

## What is Air Mode ?

Some users were mailing Boris about the fact their radios couldn't be configured to have Idle up switch and asking him to implement something similar in the software. Boris initially thought that this could simply just be achieved with activating the "Iterm" from zero throttle together with P and D which were already done with "pid_at_min_throttle" feature. Somehow this wasn't giving the satisfying results. It still felt weak and unresponsive. Boris was trying to wrap his head around why this was the case ! We got our P, I and D on the ground....so why isn't fully stabilizing?

After some readings in other open source projects and some of the older discussions, he realized that the key for this was in the mixer logic as someone already had a proof of concept code to improve it, which is pretty much scaling the PID's to our throttle level and stopping the stabilization when one motor reaches min throttle. Now Boris understood why folks always preferred this Idle up switch as it was automatically gaining a little bit more stabilization. But this is just a workaround where you loose some throttle below! The current mixer logic sounds reasonable as the early developers were always considering the low throttle values as a NON flying situation. Guess what? In 2015 we fly a lot with 0 or low throttle and especially in the mini quad scene! This has to be changed! The real answer lies in smarter mixer approach where the calculated PID output would always consider the maximum available motor output range to be able to get the desired correction.

With AIR mode the copter will always think it's in the "AIR" and will always try to correct as fast as possible and never become weak. We of course need this stabilization once in AIR! This has it's consequences for our ground situations which you have to be aware of. With Air mode it would mean that the motors could be spooling up after arming, but there is some protection built for that. When you arm and keep throttle stick low (below min check) it will know it is on the ground and the motors will not spool up. Once you move your throttle to higher position for more than 1 second and pitch and roll are not centered anymore it will fully activate the stabilization with 0 throttle! So you have to be aware that if you would land very quickly after first take off that the motors now are able to spool up as the copter thinks its flying and has max ability to correct. Don't worry you can disarm now or you can keep throttle low with roll + pitch stick centered and it will still spool down or at least it will not spool up anymore.

### A quicky explanation from ctzsnooze:

Let's say you have PID_at_min_throttle enabled, pull throttle back to zero, so that all motors are at min_throttle, and pull the roll stick to the right quickly. The left two motors will speed up, but the right two can't go any slower. So only the left two, in speeding up, contribute to getting the roll going.
Contrast this to a right roll at hover throttle. The PID requested is the same as for the roll above, and the left two motors speed up to the same extent. But the right two can go slower than hover rpm, and they do.
That's why, before airmode, even if idle up was enabled, or PID_at_min_throttle enabled, a roll at hover throttle would always be quicker than a roll at zero throttle.
What airmode does is to compensate for the motors that can't slow down. With airmode enabled, as soon as the mixer determines that some motors have to go to min_throttle, the other motors are sped up accordingly, so that the differential required to generate the turn is the same as it would be hat hover throttle.
Hence airmode maintains roll rate when any of the contributing motors hit zero (or max) throttle. It ensures consistency of roll rate at extreme throttle values.
That's how airmode is different from pId-at-min-throttle.

The feature might still be optimized based on experiences of the Beta Testers, but is looking good already.

### Visual demonstrations of how to use air mode and enjoy more in air

http://www.youtube.com/watch?v=mlEJFMNWyvQ

http://www.youtube.com/watch?v=b0qVUa4AeDQ

### A Joshua Bardwell video on Air mode

https://www.youtube.com/watch?v=d2nRrVENEYM

### Black Box analysis video of Air Mode

Part 1: http://www.youtube.com/watch?v=PP_De47io18

Part 2: http://www.youtube.com/watch?v=goYT3PcA-dE

Part 3: http://www.youtube.com/watch?v=z0ZUsdUD9iw

## How do I enable Air Mode ?

One method is to use a 3 way switch as follows:
Pos 1: Disarm (motors do not spin)
Pos 2: Arm (motors start spinning at **min_throttle** value)
Pos 3: Arm + Air Mode (motors keep spinning at **min_throttle** value but use the new Air Mode Mixer)

The Motor Stop Feature can be enabled or disabled, and it will behave as it normally does when Air Mode is not active. However, once Air Mode is activated, Motor Stop will be overridden, and the motors will spin at min_throttle or above.

Air Mode min_throttle value recommendation: "As low as possible min_throttle where motors do not stop spinning at all times is the most recommended one. I do recommend using as high as possible range for throttle like 1000-2000." - Boris comment

\*\*You do want min_throttle as low as possible, but a good rule of thumb is to find the throttle value (in the motors tab) at which all 4 motors spin reliably and without twitches. Then add 10 to that number and set that as min_throttle. For smaller motors (1306 3100kv motors for example), you may need to add 15 or 20 because they have less torque at very low throttle values. As you do a low throttle flip or drop, you DON'T want the air resistance on your props to overcome the power provided at min throttle and cause the motor to bog down and stop.
Note: some ESCs can desync on very low min_throttle values when throttle is raised from zero rapidly. If this occurs then increase the min_throttle value another 20-40sec or until the ESCs do not desync on rapid throttle increase from zero.

From a Post by teracis:
To get airmode working all you need to do is go to the modes tab in configurator and set it to activate the same way you would with an arming switch. This is something you will need to learn so check out a tutorial rather than one of us spelling it out for you here, it will be quicker.
I suggest arming on a switch, if you want to stick arm you do so at your own peril.

If you want Airmode on permanently, tick the box and then drag the slider so it covers all the way from 1000 to 2000 and it will be on permanently.

**Using a 3-position switch, the flight procedure could be:**

1. Connect Battery and ensure the copter DOES NO MOVE while the FC boots and does a Gyro Cal. The beeper will beep three times once the Gyro is cal'ed.
2. Arm motors (motors start spinning)
3. Enable AirMode (no 'I' windup on ground)
4. Lift off & fly around (motors will never stop in flight even at lowest throttle)
5. Land and disarm motors

There are some people saying or complaining about their minimum throttle in airmode.

Your min_check determines your lowest possible throttle value out of your TX! The lower your min_check is configured the lower throttle you can get out of your quad in air mode.

If your min_check is set to 1100 and your TX goes down to 1000 that would mean that it is already giving some throttle. I use min_check a bit higher than 1000. I believe something like 1015 or 1020

## What is Acro Plus ?

1. Any value of AcroPlus above 0 causes any accumulated iTerm to be reset to zero (and kept at zero) whenever your sticks are at more than 70% of full throw. When restored to less than 70% of full stick travel, iTerm is only allowed to return to 'normal' slowly, actually at 0.1% per processor loop. ITerm therefore takes about 0.5s to return to 'normal' after a flip or roll on 2kHz targets. This improves immediate post-roll/flip stability.

2. AcroPlus changes stick responsiveness by modifying the way in which the PIDs affect the motors, more so at the extreme of stick movement.

Individual PID values are calculated as usual, so the PID sum value (the sum of pTerm, dTerm and iTerm) is calculated exactly the same. The maximum possible allowed limit for PID sum is unchanged at 1000.

The actual PID sum value can be thought of as the actual final value sent to drive the motors.

Acro Plus modifies the PID sum value, essentially in linear proportion to acroPlus/100, and in square proportion to the angle of the sticks, up to the maximum possible total PID value of 1000.

If the AcroPlus value is low, i.e. 1, there is almost no change in PID sum, regardless of stick angle. Basically the PIDs work like normal, its just that the iTerm effects described above are now fully active. As usual, stick sensitivity at 100% stick travel (i.e. maximum roll rate) is set by RC and pitch/roll rates, while center sensitivity is set by these and the amount of applied expo.

As AcroPlus values are increased, two things happen. First, the PIDsum values that normally control the motors get progressively reduced in linear proportion to stick angle. Second, and in place of the lost PIDsum values, a simple squared multiple of stick angle goes direct to the motors.

Lets consider the numeric outcomes of the current code - I hope I've got this right:

If AcroPlus is 100, and you are at 100% stick travel, you PID calculations keep happening but are completely ignored. Output to motors is simply set to the maximum allowed value for PID sum, i.e. 1000. So if you held your stick full right like this, the two left motors would basically go full on and the two right would go to min_throttle. PID loop would not constrain or control this at all. Your quad will rotate as fast as it possibly can. i.e. basically direct motor control around full sticks.

If AcroPlus is 100, and you are at 50% sticks, it's a curious combination of the two. The normal PID sum calculation is still active, but the amount driving the motors is halved, while 25% of the maximum allowed output to the motors is added. So if your PID sum calculation at some instant was 350, the amount going to the motors would be 350 + 250 = 600, or 60% of maximum possible. The '250' part is fixed by the stick angle but the PID part will vary according to usual PID processes.

If AcroPlus is 100, and you are at 10% sticks, it's again a combination of the two, but at lower stick values the normal PID control mechanisms very much dominate. The drive to motors will be 90% from normal PID calculations, and only 1% of the maximum allowed output to the motors will be added to that (i.e. basically normal PID operation around center sticks).

The amount of the 'direct' motor control to stick angle is stick angle % squared. Since 0.1 \* 0.1 = 0.01, 10% stick angle generates only 1% of the 'direct stick control' proportion available at full stick angle. 20% stick angle generates 4% direct control, 30% -> 9%, 40% -> 16%, 50% -> 25%. Basically exponentially greater proportion of direct vs PID control.

When AcroPlus is at a number less than 100, the 'direct control' effects are linearly proportionally reduced, though you always get the full iTerm benefit.

For example, if you set AcroPlus to 10, you get 10% of the maximum possible AcroPlus effect. That means, at 100% stick, PID sum will only get a stick angle related contribution of 100, and the rest will be determined as 90% of the normal PID sum value. At 10% stick, the stick angle related contribution to PID sum will be only 1 (1/1000th of the maximum possible) and 99% will come from normal PID processes.

Therefore you can see at higher AcroPlus values and higher stick angles, the PIDs themselves become a bit less relevant because the motors are being more directly controlled by the angles of the sticks alone. This makes motor control more direct but also much more extreme.

Note that near or very near center sticks, AcroPlus has markedly less effect on normal PID control outputs. Hence, AcroPlus values in the 20's will have relatively little effect on center stick sensitivity, but most likely will significantly increase full stick roll rates over and above your rate settings.

Hence Acro Plus can be considered a form of exponential rate multiplier, outside of the normal PID mechanisms, that should, in most quads, increase roll rates at high stick angles quite significantly. The iTerm coding changes prevent iTerm windup problems that would otherwise inevitably cause loss of control or serious bounce-back at the end of such extremely high rate rolls or flips.

### Note: Acro Plus was removed in V3.0 and replaced by Srates. Read the 3.0.x Wiki page.

## What is 2kHz mode ?

See the "Gyro based loop implementation" description on the support page.
2kHz mode is simply a faster Gyro based loop that runs at an update rate of 2000 times a second or every 500usec.

Here is a great analogy:
You are driving a car. You run on 1khz so you are only allowed to open your eyes once per second. In this time you must not only look at the road ahead but also the wheel, speedo, RPM, radio, and so on. Now close your eyes until the next time.
2khz lets you open your eyes and make decisions twice in the same timeframe as 1khz.

So you are heading for a collision at 60kph. 1khz will let you adjust over that distance by a factor of one. 2khz let's you adjust by a factor of two (Yea I know, but I am explaining basics). So to make a one meter horizontal adjustment in 1K would take you 6 meters the equivalent in 2k would take you 3 meters.
This is not gospel, just a way to explain the difference.

1KHz mode equals a LoopTime of 1000uSec
2KHz mode equals a LoopTime of 500uSec

Have a look at this video form more information: http://www.youtube.com/watch?v=j2YtpeHGafs

## How do I activate 2kHz mode ?

For Betaflight 2.4.0 and later you should NOT use CLI; set looptime to 500 in the Configuration tab. Note: on legacy firmware/configurator versions, UI labels may differ from the current Betaflight App. CAUTION: Appropriate sensors will automatically be disabled on F1 boards.

For Betaflight versions prior to 2.4.0 you can use the CLI and execute the following commands, dependent on the Flight Controller type:

**For F3 boards**

```shell
set gyro_lpf = OFF
```

**For F1 boards**

```shell
set acc_hardware = 1
set baro_hardware = 1
set mag_hardware = 1
set gyro_lpf = OFF
```

### NOTE: 2k mode was removed in V3.0 and up.

## Limitations of 2kHz mode

Note that there is a restriction on the number of available AUX channels in 2kHz mode (actually on any loop frequency greater than 1kHz).

**For F3 boards**

6 AUX channels are available

**For F1 boards**

4 AUX channels are available

For Betaflight 2.4.1 onwards the number of Aux channels is selectable with the set max_aux_channels (see the CLI commands section).

**Note:**
Some ESCs will not calibrate at 2kHz and faster Loop Rates, KISS ESCs have been reported to have this issue. The fix is to simply set Loop rate to 1kHz (1000usec looptime) then calibrate the ESCs and change back to the desired looptime.

## What Flight Controllers are recommended to get the best out of BetaFlight ?

### NOTE: This list is old since there are just too many new FC's now on the market. Check the Boards in the support menu and the Released hex files.

Here is a list of FCs compiled around the end of January 2016. The opinions regarding Pros and Cons are also shown.

| Flight Controller                                                                                                       | Processor/Sensor | 2KHz mode                                          | Ports                                 | Opinion                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------- | ---------------- | -------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Naze32 rev. 5                                                                                                           | F1 MPU6050-I2C   | Y (disable Accelerometer, Barometer, Magnetometer) | UARTs 1 and 2. UART 1 shared with USB | Comes in acro and full. Full version has a barometer, magnetometer and dataflash for Blackbox. Uses relatively inconvenient pads for the receiver. A tried and tested board but now superseded by the rev. 6.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **[Naze32 rev. 6](http://www.getfpv.com/acro-naze32-flight-controller-rev6-w-pin-headers.html)**                        | F1 MPU6500-SPI   | Y (disable Accelerometer, Barometer, Magnetometer) | UARTs 1 and 2. UART 1 shared with USB | Now even the acro version has a barometer and datafash. Uses through-hole instead of pads. USB connector moved to the right. Also has an SBus inverter. 6a fixes the issue with ESC calibration and 6b fixes the Spektrum sat issue. The F1 processor is starting to reach its limits and an F3 board is advised. Several users are reporting erratic behavior and strange issues with this board that could be due to the use of the MPU6500 gyro that has a worse noise spec than the 6050. There is also a [compelling theory](https://www.youtube.com/watch?v=dRyOS9TvIV4) that the MPU6500 does not like high vibration environments. |
| **[SPRacing F3](http://seriouslypro.com/spracingf3)**                                                                   | F3               | Y                                                  |                                       | Hardware issues resulting in seemingly-high failure rate. Micro-connectors suck.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **Flip32/Flip32+** **[DragonFly32/DF32+](http://www.rcgroups.com/forums/showthread.php?t=2320471&highlight=dragonfly)** | F1 MPU6050-I2C   | Y (disable Accelerometer, Barometer, Magnetometer) | UARTs 1 and 2. UART 1 shared with USB | Comes in acro and plus. Plusversion has a barometer, magnetometer. This is a Clone of the Nase32 but with Through Hole connector pads.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **[TBS PowerCube](http://www.team-blacksheep.com/products/prod:powercube_colibri)**                                     | F3               | Y                                                  |                                       | Super expensive, like all TBS gear. The ESC is listed as able to run SimonK, which means it's Atmel, which means it's probably got mediocre performance.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **[Dodo](http://www.rcgroups.com/forums/showthread.php?t=2439777)**                                                     | F3 MPU6050-I2C   | Y                                                  | CP21xx on UART1                       | No complaints personally. Now that they fixed the ESC back-feeding issue, that is on V3. Also has 2MB SPI Flash on board for BB logging. So this seems to be a great option at the moment.                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **[MotoLab Tornado](http://www.rcgroups.com/forums/showthread.php?t=2473157#post32330479)**                             | F3               | Y                                                  | VCP USB, UARTs 1,2,3                  | 5v buffers on motor outputs mean no BLHeli passthrough. Uses the STM's Virtual Com Port which requires special procedures. Other than that, awesome FC at a good price. **[Detailed instructions](http://www.rcgroups.com/forums/showthread.php?t=2537379)**                                                                                                                                                                                                                                                                                                                                                                               |
| **[MotoLab Cyclone](http://dronehitech.com/motolab-cyclone-flight-controller-announced/)**                              | F3 MPU6000-SPI   | Y                                                  | VCP USB, UARTs 1,2,3                  | Built in 5V switching regulator. Bi-directional ESC pins for HLBeli pass-through. Uses a VCP which means an external USB to Serial device must be connected to use BLHeli passthrough until passthrough over VCP is added. Does not have on board dataflash                                                                                                                                                                                                                                                                                                                                                                                |
| **[XRacer F3](http://www.fpvmodel.com/x-racer-f303-flight-controller_g1106.html?u=8D1D164861E0E506)**                   | F3 MPU6050-I2C   | Y                                                  |                                       | One of the cheapest F3 boards available. Nice design and board layout though it lacks pins for VBat and RSSI. VBat can be added by soldering a voltage divider directly to the processor. Has more dataflash than any other board. See **[here](http://intofpv.com/t-x-racer-f3-fc-adding-vbat-hack)**. v2 of the board has VBat and RSSI solder pads.                                                                                                                                                                                                                                                                                     |
| **[LUX](http://www.rcgroups.com/forums/showthread.php?t=2554204)**                                                      | F3 MPU6500-SPI   | Y                                                  | VCP USB, UARTs 1,2,3                  | Looks good. Doesn't have a dataflash chip. Uses the STM's Virtual Com Port which requires special procedures. Uses MPU6500 which is not ideal.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **[KISS](http://www.rcgroups.com/forums/showthread.php?t=2555204)**                                                     | F3 MPU6050-I2C   | Y                                                  | VCP USB                               | Doesn't run Betaflight (yet) LOL.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **[SPRacingF3Mini board](http://www.rcgroups.com/forums/showthread.php?t=2592215)**                                     | F3               | Y                                                  | VCP USB                               | Now supported in 2.4.0-RC6. With SD Card Socket, Race Transponder and 5V BEC. Looks good for Racing copters.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **[MotoLab Tempest](http://www.rcgroups.com/forums/showthread.php?t=2715556)**                                          | F3 MPU600-SPI    | Y                                                  | VCP USB, UARTs 1,2,3                  | Built in 5V switching regulator. Bi-directional ESC pins for BLHeli pass-through. Plus a PDB                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

### Additional Information:

Roundup of F1 based boards: http://www.youtube.com/watch?v=7u1PcvDosBM

Roundup of F3 based boards: http://www.youtube.com/watch?v=StnC9Q_O1Fw

Recommended CleanFlight/BetaFlight boards: http://www.youtube.com/watch?v=SJa_LgbwwMk

## What are the differences between LuxFloat and Rewrite PID Controllers ?

### NOTE: Both of these PIDCs have been removed in V3.0 and up.

According to Boris, there is literally no difference between Lux and Rewrite any more (from a flight characteristics point of view), except that they scale the numbers differently. So the actual PID gains and rates will vary between them, but the processing of gyro data is identical. The main problem with Luxfloat is that the CleanFlight Configurator GUI by default only gives you 0.1 precision, which is too big of a step for Luxfloat. It would be like trying to tune Rewrite, and only being able to use whole integers like 4.0, 5.0, 6.0.

LuxFloat uses Floating Point maths whereas Rewrite uses Integer maths. What does this mean ? Floating Point maths needs more processing power from the Flight Controller, and so F3 (and above) CPU based FCs will have a much easier time calculating the values in the PID loop since it has a dedicated Floating Point Unit (FPU) for these calculations.
Why should this matter ? The longer the PID controller takes to process the Gyro/Accelerometer data the slower the "loop time". Faster loop times are desirable as it makes the copter more responsive to pilot commands, and also (more importantly) the ability to correct to external disturbances to the copter (like wind and propwash).

From a development point of view, LuxFloat is easier to understand since ReWrite has to emulate mathematical functions using complicated routines rather than simple commands that a dedicated FPU can handle.

People like Rewrite nowadays simply because it is easier to tune because it offers more functional precision in the gains. The days when Luxfloat and Rewrite flew differently (like before Luxfloat had error-seeking D term, or whatever) are gone.

Level mode angle control and stick sensitivity is different in Luxfloat from Rewrite in BetaFlight

In Luxfloat level/horizon modes, full max angle is reached at full stick. This means very low stick sensitivity in level/horizon modes at rates that are quite snappy in acro, especially if max_angle is set to a low value, like 45 degrees. The stick sensitivity does not change with changing rates. I personally can't fly level/horizon like this.

In rewrite, stick sensitivity is managed differently; sensitivity depends on rates and is closer to acro sensitivity. This may result in reaching max angle before the sticks reach their full travel. I personally prefer this (it was my coding hack, I think, that made it like this). It's good both for teaching and for experienced pilots.

Boris posted this in the thread about Tuning Rewrite to feel the same as Luxfloat:

I was saying that if you would take some time and work out the math that you could produce same numbers with both
Just an example to show you. You don't have to understand the code to understand this part.

Luxfloat P
Code:

```
	// -----calculate P component
	PTerm = RateError * P * TPA;
```

rewrite P
Code:

```
	// -----calculate P component
	PTerm = (RateError * P * TPA) / 128;
```

The difference above is that P gain number on rewrite is higher, but is being divided by 128 in the PTerm calculation, while Luxfloat uses directly the number you entered from cli. Note that RateError number is using degrees/sec in Luxfloat and in rewrite its abstraction from the original gyro output, but both can produce same PTerm when right P is selected.

So if you can find P component what can produce the same PTerm result you will get same behavior.

Practical translation:
1.0 in Luxfloat means exactly 4.0 in rewrite just for Pterm.

This same translation formula can be done on all numbers like rates, Dterm and Iterm.

New in V2.5.4

The 'P' and 'D' Terms in Luxfloat are now shown as 4 times higher to allow better resolution when tuning. The actual PID scaling stays the same and can be seen in the CLI.

Additional comment from Boris on MW-rewrite verse Luxfloat:
There should not be any difference between both in terms of PID's and rates. Well there is one slight difference actually, which I forgot to mention and even I forgot about it.
rewrite still has a bit higher D range. To be exact rewrite has 2x higher delta for Dterm due to averaging summing instead of average dividing the sum. I would rather like to remove this, but don't want to cause people having to retune their rewrite. But even though with this Dterm rewrite should in theory handle bounces better....right? But that isn't the case.

I know why. Rewrite has a Dterm deadband integrated in the integer logic, which helps keeping some noise away. But the lower numbers can cause some aliasing in Dterm and some lower frequencies which aren't there may be thrown into pid controller.
There will be some more data about this soon to confirm, but Luxfloat may now become a winner certainly now where it became better tunable.

New in ßF 2.8 and above: the PIDC names LUXFLOAT & MWREWRITE are no longer used since Boris has rewritten the code and they not longer use the same algorithm as before. The new names are FLOAT & INTEGER.

## What PIDs do and how do they do it ?

Here a good basic PID explanation by Bruce for those who want to learn about it.
https://www.youtube.com/watch?v=0vqWyramGy8

## Is there a good resource for learning how to tune using Black Box ?

a. "I would check out Joshua Bardwell's youtube channel. I haven't watched all these videos... I just picked them from his channel.

Quote:
http://www.youtube.com/watch?v=FH_m5rI6MKY

http://www.youtube.com/watch?v=hzm6H9WnCgQ

http://www.youtube.com/watch?v=Neqzeh9f-uk

http://www.youtube.com/watch?v=7UNg8fkV6zQ

Also he has at least 100 blackbox log analysis videos where he was gracious enough to help other people out. Check out those and you can learn a lot just from him reviewing peoples footage and pointing things out. There is kind of an 'art' to it so to speak ... (and goes on to mention he doesn't really use Black Box to tune) " - from powdermnky007 reply

b. More info: Joshua Bardwells's Blackbox Log Video Responses link: http://www.rcgroups.com/forums/showthread.php?t=2484202

c. But: "I think that even without blackbox you can get a great tune.

People don't realize that there are 2 separate things. There are rates and there are pids. The rates is something we feel even more than PIDs. There is no auto-tuning what can know what rates your brains like.
The rates are actually directly being interpreted in our brains to certain stick feel.

Good tuning just makes that feel tighter and helps removing unnecessary oscillations. But even with oscillations it doesn't mean that it will feel bad." - Boris comment

"This is the same as my experience. PIDs Parameters are one thing, and Rate Parameters are another. Take a car as an analogy. "PID" would be like tuning the engine, so that fuel, air, timing are correct (things in the Flight Controller). "Rates" are like tuning the steering wheel, pedals, gear (stuff you directly touch like the Transmitter Sticks) so that the 'feel' is correct. And adjustment of the Rates itself made a huge difference on how 'sensitive' the aircraft feels, especially to a noob like me"- Kuson comment

d. Battery Factor: "A while ago someone took over my pids to his quad with same setup and he said it didn't feel good. So I flew his setup and it indeed felt like PIDs were twice as low as they should be! It appeared he was using almost 2 years old (Turnigy) Nanotechs completely lost their power. Even I feel huge difference between different batteries I have." - Boris comment

Also Read the [PID Tuning Guide](PID-Tuning-Guide) the [Black Box logging and usage](/docs/wiki/guides/current/Black-Box-logging-and-usage) support pages.

## Why does my copter behave erratic after a crash ?

Some people have experienced erratic behavior (jitters etc) after a crash, as if P went up significantly.

"When you crash your gyro can get upset. It has always been like that even from Baseflight days.
Some gyros are more sensitive than others.
To Recalibrate Gyros: " Disarm. Perform gyro calibration (left stick down left....right stick down) and it will be fine. You will see leds blinking and it will beep. Also when plugging your lipo in your quad, _ your quad should not be moved_." - Boris comment

If you fly in Auto-level modes (Angle or Horizon) then the Accelerometer can easily get upset and gives False readings. The Accelerometer can also get upset if there are excessive vibrations or during fast Aerobatic moves.
Not much you can do except wait for the accelerometer readings to settle down. This is easily seen if you raun a minimOSD with the Artificial Horizon displayed.

## How does yaw_jump_prevention_limit work ?

"First you need to know the basics of a mixer function on multirotors.
Mixer gets PIDsum of all 3 axis and translates that into motor output.
There is obviously a certain power available there, which is a range of max_throttle - min_throttle for each motor.
Lets say it is typically a range of 1000 (2000-1000).

So we have 4 motors determining the behavior of quadcopter with power range of 1000 for all 3 axis mixed up scaled to the throttle.
The yaw axis is the one what requires quite a lot of power on quadcopters but also depends of setup used. The ratio of power used for yaw to get the same rotational rate is more than one for pitch and roll.
This means that hard yaw corrections could use too much of the entire available throttle range in each motor so the roll and pitch would not have enough of it. But also the way of how yaw works can create a lot of thrust where the quad would gain height to get a desired yaw correction during yaw stops what generate the most power.

Therefore the yaw_jump_prevention_limit was introduced to give a maximum of yaw PIDsum with centered sticks. That means that during yaw correction, the yaw is not able to use too much of available motor power so the roll and pitch would not be affected as much and that also the hard yaw stops would not create a lot of jump.

Lowering yaw_jump_prevention_limit will result in less motor power spilled for yaw during gate clipping for example as well.

You still have the full yaw control when using stick input.

But anyway I am still surprised that your gear suffers from jump. I would say that small...and powerful x quads would typically not suffer from jumps." - Boris B

## How should I configure the FailSafe system ?

FailSafe is something that needs to be configured in the radio receiver and the Flight Controller.
Take a look at this overview as it describes how this should be done: http://www.youtube.com/watch?v=dikr9oDzQqc

Some additional information can be found from 6:20 onwards in this video: http://www.youtube.com/watch?v=htkw7d97bOo

NOTE: Failsafe configuration has changed in Betaflight 2.4.0 onwards and CF Configurator 1.2.0. The relevant documentation can be found [here](/docs/wiki/guides/current/Failsafe).

A good method for RX's that do NOT have a FailSafe output (no Pulses):
[Setting Up Failsafe on FrSky BeeBrain](http://fpvobsession.com/setting-up-failsafe-on-frsky-beebrain/)

## What is the best practice for configuring the Throttle end points ?

For KISS ESCs:
Just cal with max_throttle at 2000 and min_command at 1000 from the CF config Motor tabs.

Joshua's method for BLHeli 14.4 and lower.
This can be a difficult and confusing concept to grasp at first. The best way to describe the correct method is by way of the following tutorial video.

Part 1: http://www.youtube.com/watch?v=WFU3VewGbbA

Part 2: http://www.youtube.com/watch?v=YNRl0OTKRGA

New information concerning BLHeli Max_throttle calibration.

Watch these Videos from Joshua Bardwell
Cleanflight BLHeli Top-End Throttle Calibration : https://www.youtube.com/watch?v=spegUYF8Dxk
The Effect of Top-End CleanFlight BLHeli Throttle Calibration : https://www.youtube.com/watch?v=RW2XalNPpQk

The new BLHeli Firmware v14.5 has some differences in calibration from 14.4. Joshua B recommends:
Calibration procedure I currently recommend for BLHeli 14.5 is min_command=1000, max_throttle=1980, run calibration. Done. Top-end calibration may not be needed since BLHeli 14.5 seems to have much less or almost no dead band at the top.

Using max_throttle=1980 is because everybody seems to be getting 2020 as the calibrated value if they use max_throttle=2000. So the goal of using 1980 is to ensure that you calibrate below the top of the scale.

Another approach I have seen suggested is to set min_command=1000, max_throttle=2000, and then manually use the Motors tab to determine the spin-up point and max rpm point for each motor, then manually set those values into the ESCs. This is a fine approach too, but a little more intensive.
Then compudaze posted:
I've had some ESCs still hit 2020 using 1980. Been using 1970 as it doesn't hit the max. Tested with LB20, RG20, UBAD30, XM20.

New Video from Joshua Bardwell titled "BLHeli - 100% Explained".
https://www.youtube.com/watch?v=0Bi1XcdpnQI

## How do I configure BLHeli ESCs via BetaFlight ?

If running at 1kHz and faster BLHeli 14.2 or later is required and disable PWM in the BLHeli configuration. This is to ensure the BLHeli Firmware recognizes the OneShot125 pulses properly.

If you are running BetaFlight, you can program and flash your BLHeli ESCs (that have BLHeli bootloader only!) directly through the flight controller, without disconnecting the signal wires or disassembling the copter at all.

As a rough guide to determine if your ESCs can be flashed via BetaFlight:

| ESC MCU manufacturer | ESC Firmware | Bootloader Type | Flash via BetaFlight |
| -------------------- | ------------ | --------------- | -------------------- |
| ATMEL                | SimonK       | SimonK          | N                    |
| ATMEL                | BLHeli       | SimonK          | N                    |
| ATMEL                | BLHeli       | BLHeli          | Y                    |
| Silabs               | SimonK       | SimonK          | N                    |
| Silabs               | BLHeli       | SimonK          | N                    |
| Silabs               | BLHeli       | BLHeli          | Y                    |

In general, it's all down to the ESC having BLHeli Bootloader so that ESC flashing can be done via Betaflight.

Follow this guide to learn more: http://www.youtube.com/watch?v=YWLk4qcQcvw

PLEASE NOTE: This does not work on the following boards:

| Flight Controller | Failure Reason                                                                                                                                                                                                                                                                                                                              |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Moto Tornado      | Since the 5v buffers on the motor outputs are uni-directional and do not support bi-directional communication. These buffers make the motor outputs more stable, but prevent passthrough. There is no software fix for this. The only fix would be a re-design of the board to remove the buffers or change them to bi-directional buffers. |
| Naze32 **Rev6**   | The Naze back-fed the ESCs from the USB port. So the ESCs would power up, see the throttle signal, initialize, and then they wouldn't go into programming mode after that. The Rev6a has fixed this issue since it was released in November 2015                                                                                            |

## Why does my copter flip when trying to takeoff ?

Here are the most common causes:

- Motors plugged in to the wrong FC headers.
- Custom mix is incorrect.
- Motor spinning the wrong direction.
- Props on the wrong motor.
- Flight control board mounted facing the wrong direction (e.g. yaw 90 degrees left but the board_align has not been configured to reflect this).

## Will the PIDs change significantly when switching from two-blades to tri-blades ?

Some have found they need a small reduction in P gains when going from two-blade to tris.
The copter was still flyable with no changes, but some have experiences increased prop-wash oscillation.

## Why do I have issues flashing my new F3 Flight Controller ?

Some of the new F3 boards come with a Virtual COM Port (VCP) that is used to communicate with a PC or MAC over the USB interface. Take a look at this video that talks about flashing the Lumenier LUX board that has a VCP port:
http://www.youtube.com/watch?v=b8fMsazyxDw

Within this FAQ, check the answer to "What Flight Controllers are recommended to get the best out of BetaFlight" for more details on which FC has VCP ports.

The [Installing Betaflight](Installing-Betaflight) has more details on USB Drivers, etc.

## Will Betaflight code be merged back into Cleanflight ?

Yes, it is the intention that this will happen gradually over time. Sometimes features from CleanFlight also get merged into BetaFlight too. This code merge (in both directions) has already started happening from BetaFlight V2.4.0 and CleanFlight V1.12 onwards.

#### Question posted and Boris' answer after the 3.0.0 Released:

Q by Ede2016- Does this mean from now on BetaFlight and CleanFlight are independent from each other?
I thought the idea was that BetaFlight is for all the Beta testers (a lot by now) and CleanFlight should be for "normal" pilots who can wait a few months for updates - after they are beta tested and stable.
A from Boris- That was the initial scope of this project, but you can understand that this all is done in free time. And maintaining multiple versions is really time consuming and not efficient....well actually impossible.

Due to a lot of changes in betaflight it is not that easy to just merge things back easily. Betaflight is completaly open source and all code is available for other open source projects like cleanflight. There are actually some developers who are continuously working on merging things back and forth, but even those are struggling as divergion is getting bigger and bigger.

Also the scope of cleanflight is very wide and betaflight primary only focuses on acro and level performance.

Three main open source branches and their focus:

- Cleanflight (wide focus area)
- iNav (Autonomous modes like GPS etc)
- Betaflight (Mainly Acro and level performance)

But they all work together and share things.

But you can imagine also other aspects of merging things back is that you cant simply tell the users after upgrade "your multirotor will fly completaly different and you have to fully change your rates / pids"

## When I update to the latest version of BetaFlight do I need to recalibrate my ESCs ?

ESCs shouldn't need recalibration unless you changed the min/max throttle values in BetaFlight.
For more information about ESC Calibration see this video: http://www.youtube.com/watch?v=o3Mg-9M0l24

## Why do my motors keep accelerating on the bench when I arm without props ?

With props off on the bench, I arm the quad and the motors start. After increasing throttle a small amount then back to minimum I notice the motors keep increasing in speed. They don't go to max or anything, but they climb noticeably. Now if I was in Angle/Horizon with the accelerometer enabled I could understand that the quad was tying to level itself. But in Acro mode why should the throttle change on its own ? I'm guessing this is an Airmode effect. But just wanted to understand a little more about why.

Answer: That is the flight controller trying to correct for changes in aspect, mainly due to fact your quad shakes slightly when the motors spin, the sensors pick it up and then the flight controller tries to correct, it can't because you don't have props on. All perfectly normal.

Additional explanation:

Originally Posted by MasterZap View Post
Sorry, but this sounds like a fundamental misunderstanding of how the I term works.

Or conversely, the behavior you see on the bench is exactly expected of the I term.

Why? Because the copter isn't moving. If there is no movement, you have no gyro input. With no gyro input, there will be no positive (or negative) error signal to add to the I term.

The I term is additive. As error is measured, that error is added to I. If error persists, I grows. If error STOPS, I STAYS. Only at NEGATIVE error does I shrink back down again.

Since your copter isn't flying, you are only giving it half of the error (your stick input tells the copter to rotate x degrees a second, the copter is rotating no degrees per second at all, hence you have an x degrees per second "error" measurement) and I will grow. In the air, the copter would start rotating, error would shrink, and eventually become negative and decrease the I term back.

So perfectly normal.

You simply cannot make judgments on an I terms behavior without letting that I term act the way it wants. With props off, on the bench, you just get meaninglessness.

/Z

A quick way to test that there isn't some other issue causing it is use the motor test page to remove the PIDs from the equation.

## Why do my motors spin briefly when rebooting the Flight Controller ?

Since flashing 2.4.0 and rebooting from Configurator with a battery plugged in spins up the motors briefly. I'm fairly sure that didn't happen in 2.1.6, not sure about 2.3.5.

Answer: This can happen in any firmware with battery plugged in. It can happen in 1 out of 100 times or every time. That's not a bug....that's how OneShot works. The ESC would interpret a small pulse during power up and down as a signal and spin motors. It is really a short pulse what couldn't really harm anything but still can scare the s\*\*t out of you !

It is also highly recommended to always use a Current Limiter when the LiPo is connected and the Config Gui is opened. This can prevent burning ESCs and motors. See: http://www.rcgroups.com/forums/showthread.php?t=2327875

## If the accelerometer is disabled and FailSafe Activates what happens to the copter ?

It cannot do self-leveling without the accelerometer sensor activated, so it won't Self-Level it will just tumble to the ground.

It is recommended to setup Fail Safe to disarm (shut off motors) immediately upon entering Stage 2 and allow copter to Drop if the Accelerometer is disabled.

## Why does my Flight Controller blink/beep lots of times when powering up ?

During Firmware Boot-up the Gyro is Calibrated and should give three Beeps/Blinks. This indicates the Firmware is ready.
Upon Arming there is one Beep which is from Syncing Video to a BB log.

If gives repeated 2 Beeps this means NO Valid RX - This could be a bad wire to RX, or RX not binding to TX, or TX not yet sending data.

5 short blink/beeps followed by any number of long blinks/beeps indicates an error code.
Number of long blinks indicates the following error:

1. **_FAILURE_DEVELOPER_**: External interrupt of sensor failed to initialize.
2. **_FAILURE_MISSING_ACC_**: Accelerometer/gyro sensor is missing
3. **_FAILURE_ACC_INIT_**: Accelerometer/gyro sensor failed to initialize
4. **_FAILURE_ACC_INCOMPATIBLE_**: The found accelerometer/gyro sensor is not compatible/not the expected one
5. **_FAILURE_INVALID_EEPROM_CONTENTS_**: EEPROM/FLASH configuration content is invalid
6. **_FAILURE_FLASH_WRITE_FAILED_**: Write of configuration to EEPROM/FLASH failed
7. **_FAILURE_GYRO_INIT_FAILED_**: Gyro initialization of SPI MPU6000 accelerometer/gyro failed

The most common one seem to be error 2 where the accelerometer/gyro sensor can't be found, this is caused by a bad sensor or bad connections to the sensor, could happen because of a bad crash. On most boards gyro and accelerometer is the same chip so acro flying isn't possible when the accelerometer isn't found, it's not just the accelerometer that's bad but the whole chip.

Error 3, 4 and 7 could also be caused by a bad accelerometer/gyro sensor.
Error 5 and 6 indicates memory read/write problem of the MCU (main processor).
In most cases a new flight controller board will be needed if the user isn't for example able to re-solder the sensor.

Above are Hard Faults the Processor detects upon boot-up and initialization. Additional reasons for flashing LED and/or beeping are:
No signal from RX. This could be simply the TX is off or the wrong Model/binding selected or a hard fault of the RX like no power or bad cable.
Accelerometer Not calibrated if the ACC is enabled (check the CLI). If acc is enabled then it must be cal'ed once and typically done in the config GUI.
Copter titled too far if the Acc is enabled.

## My PID D gain value is small after tuning in 2khz mode is that normal ?

The latest 2KHz versions of Betaflight seem to be enhancing the influence of P, to the point where you can fly with good P gains and very little D. It's also good practice to keep the D gains low so that the motors don't get too hot with all the rapid speed changes.

## Why are the accelerometer Black Box traces so bad in 2KHz mode ?

With my quad on the ground, 1Khz, no props, motor-stop, the accelerometer traces are smooth x=0 y=0 z=1. There is just the tiny amount of noise you would expect from the chip itself.
On 2Khz, the data in BlackBox is nonsense, eratic X=7G, 3G, 5G all over the place. The quad is stationary on the ground, the motors aren't spinning, is this aliasing ?

Answer: Yes, this is really effects of aliasing what you are seeing there. Acc has nothing to do with 2khz....it is same with any gyro rate. We are just undersampling it on 2khz.
If you use Level/Horizon modes then just stick with 1khz or get some very fast F3 target....one that will do full sampled acc even on faster rates.

## How do I get vbat_pid_compensation system working ?

```
set vbat_pid_compensation = ON
```

Tune your quad with a full lipo....your PIDs will then be scaled to that reference voltage.
Voltage scaling from full lipo to empty is limited to 25%. Should be enough as we fly to 3.3v usually.

Also good when you have old and new lipos. The old ones with more voltage droop will automatically get more PID adjustments.
It also disables itself when voltage completely drops below 2 cells

Forum Question from eL_Verde:

I tried your PID voltage compensation. It felt good, but I think for me, and my setup, that 25% plus over gain when the voltage is low is a little high.. Can I mod this value for 20% or 15%??
Boris' Answer:

voltage gain is adjustable

- max voltage = 1
- min voltage (default 3,3) = min adjustment. It is even more than 25%!
- When you raise min voltage up you will get less compensation
  I also think that vbat compensations helps against prop wash as the motor gives more constant power during power dips. Those are the main reason of prop wash weird oscillations besides air effect

**Note:** This requires VBAT connection on the FC (LiPo pack voltage) and VBAT Feature Enabled.

## With vbat_pid_compensation are there issues moving from 3S to 4S batteries ?

There won't be a problem, the cell count is calculated and the PID adjustments are based on the Cell voltage.

## How can I run the PID controller faster than 2kHz ?

### Instructions for ßF V2.5.0 RC6 and later but before V3.0

Set looptime (microSeconds) in config GUI.
OneShot42 and MultiShot now supported

2 examples of auto config

looptime 125

- always 8khz gyro sampling (gyro_sync_denom = 1)
- when just oneshot125:
- pid_process_denom =3
- when use_oneshot42 or use_multishot
- pid_process_denom = 2

looptime 250

- always 4k gyro sampling (gyro_sync_denom = 2)
- pid_process_denom = 2
- on f1 boards with luxfloat
- pid_process_denom = 3

etc....

motor update speed = pid speed
calculation of motor speed: motor update interval us= 125 _ gyro_sync_denom _ pid_process_denom

PID is always synced to motors! PID speed is immediately your motor update speed. Gyro can run faster than PID. The benefit of that is the higher sampling reduces filtering delays and helps catching up all higher frequencies that may fold down into lower frequencies when undersampled. Even when GYRO runs faster than PID it is still in sync, but every (pid_process_denom)th sample.

### Instructions for ßF versions up to 2.4.1

TODO

- FC Settings?
  to change the refresh rate, one way is go into the CLI and change the Gyro denominator setting.
  For 2khz (500usec), set it = 4
  for 2.6khz (375usec), set it = 3
  for 4 khz (250usec), set it = 2 (iffy depending on ESCs)
  for 8 khz (125usec) set it = 1 (not recommended)
  Or just set the Looptime in the Config GUI. Note that only 5 looptimes are supported, 1000, 500, 375, 250 & 125usec.

- Which FCs does this work on and how fast can they run the PID controller/Gyro readings?

- Which ESCs and on which Motors?

Not all ESCs can accept a faster refresh rate. This can also depend on the motor kv rating. Since not many have run looptimes this fast it is best to read threads in RCG on the ESCs you are using to see what refresh rates and motor kv may work.

- Running Looptime at 250usec (4kHz loop rate) and OneShot125. How to prevent 'no pulses' at max throttle.

Since OneShot125 has a maximum pulse width or 250usec this will not work if the looptime is also 250usec. The FC will never set a logic low to have a gap between pulses if max_throttle = 2000usec (OneShot pulse width = throttle output/8). One way to get around this is set the max_throttle to a lower value and Cal the ESCs to this value. Max_throttle = 1850usec should work (one person used this and it works). This allows 150/8 = 18.75usec gap between pulse at max_throttle. This is being called the "Short Cal" of ESCs in the forum threads.

So far OneShot42 is not supported in ßF YET but would allow 4kHz refresh rates. Check MultiShot, RaceFlight & BLHeli_S firmware.

**Important Note: With fast Loop rates there have been reports of the Gyro Caling during Bootup much sooner and the copter could be moving due to connecting the battery. If the copter is moving during Gyro Cal then the bad things can happen. Do observe the LEDs for very fast blinking or the three beeps. If you think the copter was moving during the Gyro Cal then just do a manual gyro cal with the Stick command, Hold minimum throttle and YAW then cent Roll and minimum Pitch.**

## What is OneShot125 OneShot42 and MultiShot and how do these relate to max_throttle and Looptime ?

TODO
With the Standard ESC calibration to min_command = 1000 and max_throttle = 2000.
OneShot125 will send pulses to the ESCs that are 1/8th the Standard values of 1000 to 2000 or 125 to 250usec.

Originally Posted by HIGHOCTANE32
Once you wrap your head around and think about looptimes and ESC pulses(whether the be 1000-2000us pwm, or 125-250uS oneshot or whatever as time(which they are) it all makes a lot more sense. Trying to sync a gyro rate that updates every 125us (8khz) or even 250uS with a ESC signal pulse that can be 250uS long..you can see the problem. Oneshot 42 and multi shot further shorten the ESC signal pulses, like oneshot 125 did, but even shorter, so the signal pulse can be completed faster than the gyro/PID update. Not a scientific explanation but hopefully that makes sense.
But I agree if josh doesn't already have a video on it he needs one

Some info here on Oscar Liang's excellent Blog site regarding MultiShot technique:
http://blog.oscarliang.net/raceflight-multishot/

## How do I go about suggesting Betaflight App enhancements ?

1. On GitHub, open the Betaflight App repository.
2. Click “Issues” and search for existing requests first.
3. If none match, open a new issue using the feature request template with a clear, concise summary.
4. Describe the enhancement, user benefit, and any screenshots/mockups.

## How do I lower the chance of my copter producing Magic Smoke when powering on ?

Start by doing a continuity check with a multimeter if you have one. A quick test for a short between the negative and positive pads on your power distribution board can save a lot of headaches.

But ALWAYS use a Current Limiter when having the LiPo connected on the bench and Testing new setups. This has saved a few ESCs and Motors for many people. Build and use this Limiter with a Switch in-line for easy powering On/OFF.
http://www.rcgroups.com/forums/showthread.php?t=2327875

## Why do we have RC Rate and also Yaw Pitch Roll Rates ?

Deeper Question: There is still some confusion about RC rate, Pitch, Roll, Yaw rate, and Expo. I understand that P/R/Y rates are how fast the quadcopter will rotate, and i know about expos too, but what is really RC rate? I can't really gain a full understanding of it. Some say it does the same as P/R/Y, some say it's different from it, some say it's stick sensitivity. But what is stick sensitivity really? Is it like expo?

Answer: Think of it as fine tuning for RC Rate. It does the same thing just smaller increments and splits the axis up.

Some people leave the RC Rate set to 1.0 and adjust the P/R/Y rates until the quad handles how they like (speed of flips/rolls etc). Once this has been set, the Expo values should be increased to allow for less sensitivity of the sticks nearer their center positions. This will make for smoother flight experience, and have the ability to perform fast rolls etc when the sticks move further away from the center. This is the best way to do it at the moment.

## Why does it matter to prevent motor jitter ?

Two reasons:

- The motor is stop starting, this will generate heat and potentially damage/wear out components.
- As above your motor is stop starting, it isn't providing the thrust it is supposed to, your quad will shake/oscillate/crash and generally be unflyable. See the Deep Dive page for a more in-depth explanation.

## Why when I change something using CLI board crashes ?

If the FC uses the STM32's VCP then when leaving the CLI the config GUI does a "save" which re-boots the FC. Then Windows does not reestablish the USB. Check in the Device Manager to see if the Port has returned. If not then a work around is to disconnect and reconnect the USB. On some PCs/FCs this doesn't work so plug the USB into a different USB port on the PC. I keep two USB cables plugged into a Powered USB hub and just swap the USB cable to the FC and the Port comes back in the Device Manger and the Config GUI now sees to port.
This is NOT and FC or Firmware issue but a Windows USB issues.

## Will MW23 PID controller work on default PIDS ?

No! Even though Boris believes this is now the best flying PID controller, it will not fly correctly on default PIDs much like rewrite and Lux will. You need to manually tune this like the good old days.
In BorisB's words from Regroups

"Guys I read a lot of comments about bad defaults for MW23 pid controller. I will say it once more......there are NO defaults for MW23. The defaults are made for rewrite actually. It is not possible to have defaults for both....rewrite and MW23.
You really have to tune that one by yourself."

Reports show that default PIDS are too high. Be careful when first arming as it might have serious oscillations.

The key takeaway is:

- P gains need to be less than on MWREWRITE
- YAW Rate needs to be lower than on MWREWRITE
- Roll & Pitch Rates needs to be higher than on MWREWRITE

**Originally Posted by Boris B**

D is quite tolerant it appears. I scaled it to the looptime which wasn't there in the first place.

The first time I started testing the lower looptime was getting the lower I and D was needed. Now it is normalized to looptime ~2000 to give values close to original multiwii..

Iterm is more aggressive though. It can even cause oscillations, which finally makes Iterm tuning easier.

These are my PIDs. Not fully tuned though as I focused more on firmware testing:
Roll 3.0 0.025 22
Pitch 3.5 0.035 35
Yaw 5.8 0.045 0
RC Rate 1.0
Rates 0.7 0.8 0.8
RC Expo 0.2
Rc Yaw expo 0.3

Level (I don't really fly level but had to test it as level also has I and D):
Level P 9.0 I 0.005 D 0

Additionally:
Rates about .7 as a start
yaw rate 0.8
RC Rate 1
rc yaw expo 0.3
rc expo 0.3

Angle and Horizon modes still need some work

Don't forget to follow this good approach to tuning your multi-rotor:
http://github.com/borisbstyle/betaflight/wiki/PID-Tuning-Guide

## How do I keep and then restore my Betaflight Settings each time I upgrade ?

First of all it is important to note that uploading a **full** settings Dump from a previous Betaflight version will likely result in your copter not flying properly, not flying at all or even damage to the components.

It's also worth noting that the method of flashing Betaflight **can** be dependent of the FC board. So best to refer to the thread on the FC board you are using. The list of Boards in the FAQ have links to these threads.
Any issues/differences in updating are typically listed in the Release Notes which are a MUST READ.

Having said all this, one approach worth considering for ensuring your settings are migrated from one Betaflight version to another is described in these videos:

http://www.youtube.com/watch?v=HsxTqp76Brs
http://www.youtube.com/watch?v=F1sjC5l0ywM

In summary, the key takeaways from this video are:

- Keep a separate custom config file that just has the settings that you have invested time in getting correct for the flying experience you want (PIDs, rates, AUX switch settings etc).
- Upgrade the FC to the desired Betaflight version then uploaded your custom config file.
- Ensure the custom config file is up-to-date with PID & Rate values during and after tuning. This way you can compare tuning and/or restore a tune if you changed firmware versions and need to go back.

Here are a few tools that are useful for making comparisons between config files:

1. Notepad++ with the Compare PlugIn
1. https://www.diffchecker.com/

## What is yaw_jump_prevention_limit and what does it do ?

From Joshua Bardwell

Yaw jump prevention limit puts an upper cap on the yaw P term when the yaw stick is centered. There is a problem when you do a big yaw move and then suddenly snap to a stop where the copter has low yaw authority, so the copter cannot respond as quick as it wants to, so error grows large and the P term grows large and the motors surge like crazy at the end of the sharp yaw move. Lowering yaw_jump_prevention_limit will soften the end of sharp yaw moves, but will prevent the motors from surging and the copter from jumping. Raising yaw_jump_prevention_limit will sharpen the end of yaw moves, but will result in the motors surging if you don't have enough yaw authority. If you have a high-performance copter with great yaw authority, and if you want snappier endings to your yaw moves, raise this value as high as 500 (disabled). Remember that this only affects the end of yaw moves, because it only applies when the stick is centered.

Addition from Adam Pyschny

A to low yaw_jump_prevention_limit can prevent yaw P from getting enough authority to prevent the quad from breaking out in tight, high speed, roll-only turns.

## What is yaw_iterm_reset_degrees and what does it do ?

From Joshua Bardwell

yaw_iterm_reset_degrees determines the number of degrees above which the Iterm will reset to zero and stay there. the units are degrees per second rotation and they go from 25 to 1000. The issue here is that, on extreme acro moves like flips and rolls, the I term can accrue error, and then at the end of the move, the I term trying to unwind that error can result in rebound or overshoot, instead of sharply stopping the move. This parameter causes the I term to zero out when the rotational rate goes over a certain value. The idea is that, in a flip or roll, you don't care about correcting for persistent bias on that axis. You just want to flip or roll close to the targeted angular rate.

## How does Super Expo work ?

From BorisB

Super expo is similar to acro plus, but acro plus was adding more rotation rate outside the pid controller and the pid controller would fight against that. That didnt really feel natural somehow.
Super expo manipulates the pid controller so it does expo for you.
It actually works as an acceleration to P based on higher stick input and deacceleration with lower stick input. That also provides more clean acro and less need for D in general.
If you have your quad tuned for mid stick you have now....that pretty much stays the same and maybe even a bit softer, but it accelerates towards the full stick.
Its like multiwii implementation but with your current rates so you still can have snappy mid stick that what multiwii is lacking a bit.

Besides that, betaflight 2.6 allows much higher D without noise so you can get it smooth easier anyway.

Another explanation from Joshua Bardwell

super_expo_factor works like this. Normally, the way the PID controller works is that the stick position commands a certain angular rate, and then the difference between the actual angular rate and the target angular rate is used to calculate an error value. The P term is proportional to the error value. The larger the P term, the stronger the motors' output to achieve the commanded change in angular rate. Got all that?
But with super expo, the way it works is that, the more deflected your stick is, the more the P term is directly proportional to the stick position, instead of the error value. So as you deflect the stick, the PID controller says, "I don't care what the current angular rate is, or what the error is, just push so hard."
Here is an analogy. Normally when you drive a car, you are looking at your target speed. Say it is 55 mph. And if you are going faster than that, you back off the gas pedal, and if you are going slower than that, you push on the gas pedal. That's the way the PID controller works. But super expo is like saying, "I don't care how fast I'm going. Push the throttle to 75% and just keep it there."
As with the I term reset, the idea here is that, when you're commanding extreme maneuvers, you don't care about hitting an EXACT angular rate, like 1234 degrees per second. As long as the copter's behavior is reasonably predictable, you would rather let it "loosen up" a bit and just spin. If you look at Blackbox during a flip or roll, the P term is often switching signs several times. So it is trying to slow down the roll and then speed it up and then slow it down, and that's a bit silly to all be happening in the course of 0.2 seconds while you're flipping around.

A Boris comment:
Just one additional thing about iterm reset.
In super expo mode the iterm is also being reset on roll and pitch above certain deg/sec (default 200)
That is really necessary as super expo gives some P acceleration and Iterm would start to windup even more as it would think that Pterm is doing a bad job.
The iterm again becomes active below the threshold rate and gets to normal levels in time without you notice anything.
Removal of iterm during faster acro manouvres provides more connected feel as all stickyness from Iterm is removed.

Video explanation:
https://www.youtube.com/watch?v=HGAa8J1Ihac

## How do rates relate to pitch roll & yaw degrees/s ?

MadmanK has written a spreadsheet to show you pitch roll and yaw rate in Rewrite and Luxfloat to show how it relates to your rates in degrees per second.
Only change the values in the grey boxes, and it will adjust the graphs and tables.

[Rewrite/Lux rates](https://dl.dropboxusercontent.com/u/31537757/Betaflight%20Rates%20v1_4.xlsx)

## Which Flight Controllers currently use SPI ?

As of 11th Oct 2016
Colibri Race
Lux Race
Motolab Cyclone & Tempest
SPRACINGF3EVO
DOGE
CC3D (this is F1 board though......performs slightly better than i2c F3 board on rewrite)
Alienflight F3 V2, F4
XRacer F303 (v3.1 only, prior versions use I2C)

Note: there are many more new FC's on the market. Check the Seller's specs.

## Which HEX target do I download and flash to my Flight Controller ?

The cloud build is now available to assist all our users. You either compile your own firmware or use cloud build for its simplicity.

## How do I setup for reversed prop rotation ?

Just change props and motor rotation in your ESC management tool. Then in the CLI: `set yaw_motors_reversed = ON`; `save`. Power-cycle the FC to ensure the setting takes effect.

## What is a recommended FC and esc setup to run at 8khz also i see reference to 4/4 or 4/4/32 or 8/8, what are these referring to ?

First number is gyro freq (set by looptime, 1000=1K, 500=2K, 250=4K, 125=8K),

Second number is PID calc freq, this is set with regards to looptime, pid denom 1=same freq as gyro,
pid denom 2=half speed of gyro,
and so on.

Third number, its esc update rate, if no number, its the same as pid calc freq (in sync).

In BF v2.7.0, you need to:
set unsynced_fast_pwm=ON
set fast_pwm_protocol = MULTISHOT
Set motor_pwm_rate = 32000

With the New BF Configurator 1.6.4, you can make the above changes in the "Configuration Tab" and in the "ESC/Motor Features" section. You can still use the CLI commands as well.

Oneshot125 up to 4K (125-250μs)
Oneshot42 up to 12K (42-84μs)
Multishot up to 32K (5-25μs)

Generally, depending on pidc, serial ports used, number of Rx aux channels, etc. The acc is disabled in most scenarios below.
F1's mostly run between 2.6K - 2K, if you get a $9 cc3d they run 4K/4K, ccd3d-F3 run 8K/8K.
F3's mostly run 4K/2K but can run lux pidc and has more serial ports.
F3's with spi gyro (LUX, etc) can run 8K/8K.
F4's (revo/etc) on raceflight can run 8K/8K, if using the 6500 or 9250 gyro(sparky2/etc), they are just now starting to run 32K/32K/32K.

All these FC can run esc up to 32K esc update rate at no extra penalty. Always check cpu usage via cli command "status", I prefer to stay under 30% cpu on BF, some get away with more.

## Is PID tuning any different at different PIDC rates ?

#### From Boris (31 July 2016)

But here is the thing. There was a discussion before about whether P needs to be readjusted on higher looptimes. Some claimed to feel the difference 1k vs 8k for example and claimed retuning was needed. Were those feeling a placebo?
The answer is not conclusive yet, but from my tests there seems to be a difference what can be explained.

We already saw improved response between 1k and 8k for example. Exactly the difference you would expect around 800-1000us. Of course PID loop faster means seeing change in rotation faster.
How does this translate to different feel or even tune?
I was surprised to see that 8k tests showed slightly slower setpoint times vs 1k tests, while the acceleration times were pretty much same. I literally felt more loose quad on 8k.
This can be explained by following. Due to faster PID loop the PID controller can see faster that setpoint is being reached and it will start "slowing down" slightly earlier. That's exactly why the setpoint time was faster on 1k. Is this good or bad?
Well yes it is an advantage that 8k can start slowing down earlier and therefore you would possibly be able to increase P more with less overshoot like on 1k.
Just wanted to point out that some who experienced slightly higher P were not crazy after all .

But still these differences were extremely marginal and still nothing compared to different props or motors on same PID loop speed.

Next tests would be synced vs unsynced and also 32k as some wanted to know that and also blheli tests. I think from what I have seen i can expect synced winning, but lets wait the results.

## What is the difference in PIDC Iterm in bF versions ?

By ctzsnooze:
Any slow pitch back type thing is iTerm related. Pitching back means that P alone was unable to retain the intended angle in FFF, and iTerm accumulated in an attempt to get there. When dropping throttle, the need for that amount of iTerm changes, and it takes a short time for the iTerm to drop back. In that sense this is a symptom of P not being quite enough, or I being too much.

However in some situations ITerm accumulation is inevitable and the challenge is how best to deal with it.

In 2.6 code was introduced that set iTerm to zero once gyros indicated a certain level of rotation. ITerm didn't start accumulating again until gyro rate fell back below the threshold. This controlled excessive iTerm gain but caused a small but unwanted step change in pitch at the time of returning back past the threshold.

In 2.7 this was changed to not reset to zero but to hold the value iTerm was at when the threshold was crossed. That also caused similar issues on return to normal as it abruptly changed whatever the newly required iTerm value would be.
Boris: No in 2.6 and 2.7 there was still iterm reset like in 2.6 actually, but only in super expo mode or when forced in cli. It wasn't in the normal scenario!

2.8 has code that reduces iTerm accumulation the higher the roll rate, but never arbitrarily cuts it to zero. If the threshold is lowered, high roll rate events have less impact on iTerm, but iTerm keeps working normally at low roll rate periods eg in FFF.

Could I suggest that people with this issue first try a bit more P, if that's possible, but if more P isn't ideal, maybe try reducing the iTerm ignore threshold to say 50 or maybe even 25. This has the effect of reducing iTerm during high roll events and may improve the situation without reducing iTerm's ability to otherwise keep the quad stable. If dropping the threshold means an overall inadequate I level, try increasing I at the same time.

These parameters can be varied quite a lot in attempting to find the best value. But the best solution is to have a quad where P is enough to get the angle you want mostly by itself.

## How to setup blackbox record rate with onboard dataflash ?

Be carefull when setting up blackbox record rate with onboard dataflash.
When running at the edge of the board (like 4khz/4khz/4khz on sp3 board), there is a risk of overunning the cpu with too high rate like 1/1, even 1/2.
You need to test on the ground without props and check cpu usage, so just arm, activate blackbox, and check status on the cli command.
Keep a safe value and leave some room for cpu usage.
1/4 should be a correct value for sp3 board at 4khz/4khz/4khz.

## How to setup the rates and SuperExpo ?

- First see the Rate calculator in the 2.8.1 Release notes and Watch Joshia's video on ßF 2.8

Originally Posted by Boris B View Post
I have explained it many times in this thread.
RC Rate / RC yaw rate = Mid stick feel
Rates = Far stick feel
Rc expo / yaw expo is actually not necessary at all.
Just adjust till it feels good.

#### Boris:

Didn't I explain already 3 times that he just needs to enter one command to disable the feature and have old fashioned linear rate between 0 to 2000deg/sec
The choice is there for everybody and different styles. There are no assumptions.

Note: Super Expo uses floating point math and when enabled uses much more CPU cycles. This mean on F1 and F3 with IIC gyros targets the looptime might need to be reduced.
Boris states: There is more than just super expo.
Just lower the looptime on F1 boards. 4k doesn't make it fly better.

#### compudaze's method:

what I did for 2.8 was adjust rates until my deg/sec at 2000us matched what it was for 2.7 with super expo. Then I adjusted rc rate until my deg/sec at 1750us matched what it was for 2.7 with super expo. It's not that simple though as you'll need to keep playing with the number to get it exact. just keep in mind rates more effects end stick while rc rare more effects center stick.

#### More from Boris:

Those steps really depend on chosen rc rate. Smaller rc rate = smaller rate steps.

Besides that do you really feel difference of 20-50deg/sec that much?

Actually everything you ask is in there.
Rc rate + rc expo added keeps the top rates, but only changes curve
On top of that there are rates what act as super rates where you tune mid stick and than the top rates.
I prefer the last one. It is the mid stick what is most important. That is what you tune / configure and use mostly. The top rates are not a "regular" flying scenario.

The configurator is the limit at the moment as it is not all clear.
Eventually in the Betaflight App or next cleanflight configurator each axis will have 3 parameters. Rc rate, super rate and rc expo. That will make all scenarios possible for anyone.

Quick summary:
Rc rate: linear increase of rates
rc expo: add expo curve to existing rate
(sexpo) rate: Keep same liniearity on mid stick as it is now, but curve the extremes.

Old rates:
rc rate and rates = equal....bot liniear. How confusing was that?

#### Another explanation from RC Slater:

Everyone should set everything that has the word Expo in it to 0. I know by default it is set to .10, but Boris himself has said it's unnecessary, and you should remove it.

ONE caveat: if you disable superexpo_rates to get the old linear control back, then you may still want to use some expo parameters to change the curve. Other than that, leave all expos at 0 when using super expo rates. (super expo is active by default)

With superexpo_rates, the rotation rate at extreme or full stick deflection is controlled by Pitch rate, roll rate, yaw rate. If you want your max flip/roll rate faster, then adjust those accordingly.

If you want to adjust how sensitive your copter feels on small corrections (around mid stick) then just adjust RC Rate. NOTE that Yaw has it's own RC rate because we sometimes want to adjust that mid stick feel on yaw separately from pitch and roll.

Example:
Stock Rates are :
Pitch Roll and Yaw Rates = .7
RC Rate = 1.0
RC Rate Yaw = 1.0

I decide I want to roughly keep maximum rotation rate the same but make mid stick more sensitive on ALL axes (including yaw)

Pitch Roll and Yaw Rates = .7
RC Rate = 1.10
RC Yaw Rate = 1.10

Now I like my mid-stick sensitivity on pitch and roll, but want more on yaw. So...

Pitch Roll and Yaw Rates = .7
RC Rate = 1.10
RC Rate Yaw = 1.20

Now I just want to increase the maximum pitch and roll rate, but leave Yaw and all my mid-stick feel the same:

Pitch Rate = .8
Roll Rate = .8
Yaw Rate = .7
RC Rate = 1.10
RC Rate Yaw = 1.20
RC Slater is online now Send a private message to RC Slater Find More Posts by RC Slater

Video from Joshua Bardwell:
https://www.youtube.com/watch?v=cttFDHkec0c

## What is the story on the different Rates and Expos ?

Thanks to joshuabardwell for this write up.

Let's have a little history lesson.

There used to be MultiWii. MultiWii had RC rate and Expo. That was it. RC rate set the speed of rotation for stick travel. Expo adjusted the center-stick softeness vs. full-stick speed.

MultiWii didn't spin fast enough at full stick deflection for the new breed of crazy LOS Aerobatic pilots (Warthox), so the Pitch/Roll rate was added. In MW2.3 PID controller, the P/R rate relaxed the PIDs as stick deflection increased, allowing the copter to spin much faster. So P/R rates were kind of like a "super expo" on top of the normal RC and Expo functions. The effect of P/R rates was to increase the maximum rotation rate at extreme stick deflection.

Fast forward to CleanFlight. Cleanflight had several PID controllers. It had the MW2.3 PID controller, so Cleanflight also had the RC Rate, P/R rate, and Expo functions. But Cleanflight also had Luxfloat and Rewrite, and those PID controllers didn't have the "super expo" like function. They simply used a linear rate curve with expo function, like the original MW PID controller. So what are they supposed to do with the P/R rate parameter in the Betaflight App? Well... they just added it to RC rate, basically. The actual effect was not quite linear, because the scaling factor for P/R rate was not the same as RC rate. So adding, say, 0.5 of P/R rate did not result in the same degrees per second as adding 0.5 of RC rate. But the key thing to know is that, in Luxfloat and Rewrite, the P/R rate parameters had no special "super expo" like effect. They simply linearly increased the rate "curve", which was actually a line. And then the expo curve was applied on top of that.

Now we move to Betaflight. Betaflight continued to play with the PID controllers, as Boris' attention shifted around. For a while, Luxfloat was Boris' favorite, and then Rewrite. Eventually, Boris realized that the "super expo" effect of MW2.3 was actually pretty cool in some circumstances. Possibly this realization was the result of Boris playing with KISS--the timing would be correct for that. That's when Boris implemented "super expo" in Betaflight.

At this time, there was some inconsistency in the Betaflight App parameters. If you were using feature super-expo, then the P/R rate parameters worked like in MW2.3, with a big increase in full-stick rate. If you were NOT using feature super-expo, then the P/R parameters worked like in Luxfloat and Rewrite, with a linear increase in rates. And all of this was still interacting with the original Expo function of course.

You can see that this arrangement is both confusing and unnecessary. If you want a linear rate function, there is no need to have two parameters (RC and P/R). You can just use RC and Expo and be done. The only reason why both RC and P/R ever affected the linear rate function is because Cleanflight had several PID controllers, and some of them (Luxfloat and Rewrite) had a linear rate function and others (MW2.3) had a super-expo rate function. But in Betaflight 3.0, MW2.3 PID controller is now gone, so there is no need for a duplicate, conflicting definition of the P/R rate function.

So the Betaflight 3.0 RC12 rates really represents the ultimate resolution of all this nonsense. There is no more "super expo" function. There is just three parameters.

1. RC rate affects the linear rate multiplier. The rate "curve" is a straight line, and the slope of the line is determined by RC rate. RC rate makes the base line steeper.

2. Expo applies a bicubic (standard expo curve) function to the rate curve.
   Expo changes the line by making the center-stick less responsive, but leaves the end-points alone.

3. P/R rate (now known as S.Rate) performs the "super expo" function similar to how MW2.3 did it, although a lot has changed under the hood in the way the rates are actually implemented.
   S.Rates changes the line by leaving the center-stick alone, and makes the end-points steeper.

You can achieve more or less the same curve with both expo and s.rates, it just depends whether you would prefer to think about tuning the center-stick first, and then pushing out the full-deflection rates from there, or whether you would prefer to think about tuning the full-deflection rates, and then softening the center-stick from there.

## How do I solve Yaw twitches or mid throttle oscillations ?

#### A Very Short Overview of the issue and cures:

- Gyro issues can happen on any of the Gyro chips used. If you see either Yaw Twitches or excessive noise on any axis (A BlackBox Log is a definitive method to see these) then first try proper Soft Mounting of the FC.
- Soft mounting the FC must be done properly to ensure No vibrations get to the FC board (Gyro) through the mounting.
- Modern ESCs (active Braking) and modern high power motors can put a lot of noise into the electrical system. Adding a high value (1000uF seems common), low ESR capacitor helps to prevent this noise from getting into the Gyro chip on the FC (also helps with cleaner video and preventing damaging other electronics from high Voltage spikes).
- There is NO one cure for any copter. Each copter build is different and requires trying the various solutions. Some only need a large cap added, other only soft mounting the FC while some require both.

- There is a NEW [Soft Mounting and Noise Reduction](Soft-Mounting-and-Noise-Reduction) support page. Details on Soft Mounting will be moved to this new page so check back.

The following are extracted from posts about this issues with Observations, Theories, Discussions and suggested solutions. Read through all the discussion and follow the links to learn almost all there is about the issue and solutions.

##### First reports of issue:

Many people have yaw twitches or oscillations at mid-throttle and many do not. All that have this issue seem to be running FCs that use the MPU6500 gyro chip (Naze32 rev6, LUX, others) and newer motors. Boris B was one that did not have this issue with the 6500 gyro until he upgraded to newer, stronger motors. Many have cured this by soft mounting the FC board but this has not worked in all cases.

Link to a thread with data on the MPU9250 gyro:
http://www.rcgroups.com/forums/showthread.php?t=2718308#post35460394

Much discussion and experimenting is showing that this is an issue with both mechanical and electrical noise getting into the gyro and effecting the Yaw. Following is some of the discussion.

#### Post from Boris

Anyway something I want to share with you. As you all know I have been flying MPU6500 on several quads without any significant issues for a while. I knew those were a bit more sensitive, but didnt really bother me. I never had any twitches and problems like some had....until this week!
So what happened. I was flying with my trusty CM2204 2300kv cobras on pretty much all my setups till recently. Since I swapped to 5S I experienced that those motors were not ideal for that power so I went searching for new alternative motors. That's exactly where the issues started.
Once I replaced the motors my 2 MPU6500 quads and even my DOGE fc went completaly nuts. Totally untunable and twitchy as hell. Exact the issues that have been reported in the past. I had to detune my quads to mask the vibrations and twitches.
Than I swapped them by cyclone (mpu6000) board and boom.....double as high pids and smooth and locked in as butter.

No news. But really funny to experience these issues by myself for once the first time.

#### Originally Posted by Cheredanine

Interesting it happened on all three FC,
Assume you didn't try soft mounting, what motors were you using?

#### Originally Posted by Boris

2 of them were soft mounted my DOGE was not. The new cobra motors I was trying out were absolutely smooth on the bench. But somehow at certain RPM the gyro would go nuts. Would love to understand that better. Just random yaw twitches etc like we have seen many times reported on those gyros.
After putting cyclone on the exact same quads above with everything else just same absolutely smooth like on the bench. O yeah and cyclone was hardmounted!
I actually even tried 2 different motors. Cobra Champion serie 2205 2300kv and Brotherhobby 2205 2300 kv. There is certainly nothing wrong with the motors. There is just some kind of resonant frequency what upsets the MPU6500. And yes I switched back and fourth between my old CM2204's and CM2206 motors, which were smooth at all times.

#### Originally Posted by prokreat

My money is on the stronger magnets messing with the 6500.

#### Originally Posted by Boris

It really seems like that! The better the motor quality it seems to affect it more. I really wonder if this is all related to electric noise rather than vibration noise.

Perhaps due to smaller factor of mpu6500 it is missing some crucial power filtering circuit.
I know invenesense was under pressure few years ago to produce gyros with smaller form factor due to the constant huge demand from mobile phone manufacturers

#### Originally Posted by waltr

There was a very short discussion about this twitch issue and adding low ESR caps and while ago in this thread. Theory here is that it is the Noise Spikes from the motors/ESCs disturbing the Gyro readings.

We know soft mounting can help a lot but what about added caps to the ESC power.
Maybe this would be good for you to try Boris now that you have a setup that causes this issue

Another may be adding good caps right on the MPU6500 power/ground pins. From what I have seen on the schematics and PCB layout these de-coupling caps do not seem to be properly designed on many FC boards.
They don't seem important but actually are very important for modern electronic devices to operate.
It could be not a direct issue with the MPU6500 chip but with schematic and PCB layout design not done properly.

#### Originally Posted by joshuabardwell

I hate to say this because I know vendors with good products who have a 6500 or a 9250, but I personally would not recommend that anyone buy an FC with a 6500 or 9250, because it is just a crap-shoot whether you are going to run into these problems. Many people fly with no problem at all. Many people who have problems are able to soft mount and fix them. But some people have problems and simply cannot fix them, and that just seems like a chance that nobody should have to take, in a world where there are very good FC's using the 6000 or 6050. If there is a "glitchy" FC that you absolutely love, such as the DTFc because of its built in PDB, or the SP3 Evo because of its transponder and built in SD card reader, then buy it with the knowledge that you might be unlucky and have glitching that you can't fix. But if you are just searching around for an FC, and you have no particular love for any board, then absolutely buy one with a 6000 or 6050 chip only.

#### Post from QuadMcFly

To chime in on the 6500/9250 issue, there appears to be a couple things going on here. As Boris mentioned, there seems to be an electrical noise issue here that compounds things. The MPU 6500 is extremely sensitive to voltage fluctuations on the 3.3v supply line, which raises the noise floor of the IMU. Extra power filtering will definitely help with the problem.

### A Case:

#### Originally Posted by gunadeau

Maybe my story can help some people. I had very bad twitch issue on the yaw axis. It was untunable. I tried to softmount the FC, it helped but was not perfect. What really cured my issue was putting a 1000uf capacitor 35v 105 deg on the PDB at the battery connector.
My gyro is now super clean and it fly incredibly well.

Setup:
Zmx v2 2300kv
Aikon blheli_s
Xracer v2.2 multishot sync 4/4

#### RCG thread on Capacitors

http://www.rcgroups.com/forums/showthread.php?t=2657808

#### Post by Cheredanine

General recommendation is a low esr 1000uf with a voltage rating of 35v if you are using on the battery connection, if you put a cap on each esc then a lower spec can be used

Soft mounting can be done in a number of ways, traditionally hard mounting means nylon standoffs
To soft mount one can use rubber or silicon o rings on the standoffs
Or one can use rubber vibration isolation standoffs
Or double sided sticky foam

#### Post by ctzsnooze (30 july 2016)

Here's my thoughts about gyro issues.

The characteristic of a primary gyro problem is an anomaly in the gyro data exclusively on one axis that cannot be explained by other means.

The original descriptions were of abrupt onset jerks, twitches and spikes on yaw only on 6500 gyros. They were so fast in rise and fall that they could not be generated by the motors. Motors and PIDs respond to these spikes symmetrically and normally, clarifying that they were not the cause. Typically the spikes happened only in a very tight throttle range, like within 100 throttle points. There is no doubt this comes from the gyro.

While these twitches are much more common on the yaw axis, I have seen logs with solitary gyro twitches purely in the pitch axis, and on one occasion the user changed motors, the pitch axis spiking stopped, but then they went to the roll axis!

There is a separate issue with 6000 / 6050 gyros where they get episodes of large amplitude single axis resonant oscillation - pure yaw oscillation, nothing at all on the other axes - at certain throttle points.

I had this happen to me with a quad which was flying perfectly for a long time then suddenly it became unflyable due to out of control yaw oscillation.

What made me suspect the gyro was that the oscillation was exclusively in the yaw axis, was absolutely huge, at a frequency very different from the underlying noise of the quad, could not have been yaw P feedback since it remained present even if yaw P was set to zero, did not get better despite changing ESCs and motors, was not present on testing in the motors tab, and was fixed by replacing the gyro chip on the board.

Until then I would never had believed that a gyro chip could cause oscillation like problems, but now I know for sure that they can, and this has been reported by several people as well as me.

Whether something like this can happen on _all_ axes, not just yaw, at certain throttle points, I don't know. So far I guess I've always considered that some noise at mid-throttle on all axes is just the gyro's picking up frame vibrations with associated PID response overlay making them worse than they might otherwise be.

I never considered the possibility that intrinsic gyro problems may be exaggerating that mid-throttle shake.

I do a lot of hand held testing in the motors tab, and most frames do shake around mid throttle. Mid-throttle frame shake will be picked up in a normal gyro and the PID system will try to fix it.

But how do we know if mid-throttle oscillation in black box is just the actual frame shake being detected by the gyro and modulated by the PID loop, or if the gyro itself has some tendency to resonate and oscillate and thereby amplify or exaggerate that stuff?

A possible approach is to first find out how much shaking there is inherently in the frame. Using the motors tab and hand holding (with care) you can feel what the props and motors do to the frame at certain throttle points. You then know what you get when the gyro and PID are NOT active.

You can then throttle up with the Tx, with gyro and PID active. If it feels the same, your shaking is not made much worse by the gyro or the PIDs. If it seems worse, repeating the test with P and D set to 1 on all axes will remove the PID loop and any gyro input from what the motors will do - sort of like running the motors tab via the radio.

One could blackbox the quad with all PIDs set to 1 like that and blackbox will record the gyro output. This will show what the gyro determines the shaking to be PLUS any false data generated by the gyro.

The problem is that we have no 'reference' gyro to know actually what is really happening. How do we know if our gyro is being faithful in how it reports the quad to the FC, or if it is exaggerating certain things? We'd need to mount a second 'known good' FC above the 'problem' gyro, and log both at the same time....

So... unless the log is very characteristic of a gyro problem (e.g. twitches or extreme single axis oscillation) it would be exceptionally difficult to be certain what is going on without comparing gyro to a known good one. If replacing the FC or gyro chip fixes it, then that kind of points the finger at the gyro.

We are flying these things on the basis that the gyro data presented to the FC is a clean and accurate representation of the true movement of the frame. The possibility that gyros have some tendency to falsely resonate and make false oscillation data at certain throttle points is not a nice thing to contemplate.

#### A report of fixing this Yaw twitch/oscillation issue:

http://www.rcgroups.com/forums/showpost.php?p=35385057&postcount=34964

#### Example of Cap:

http://www.rcgroups.com/forums/showthread.php?t=2464844&page=2332

#### Post by Swing3r

I had issues with yaw oscillation at mid throttle with Aikons + Lumenier 2206-2350KV-motors. Soft mounting helped but not fully so I also added a low ESR 1000uF 63V capacitor to my PDB (cycolone FC is powered by lipo directly) and viola, all traces of the yaw-oscillation is gone.

Logs for hardmount, softmount and softmount + 1000uF cap.
https://www.dropbox.com/sh/a4kvsilpi...h56ocCO1a?dl=0

#### Post by AliB

I'm starting to believe the mid throttle oscillations is on more than the 6500 gyros.

Both me and a friend have both had mid throttle oscillations using an Xracer f303 v3.
He is using aikon esc, and his was completely unflyable until he soft mounted flight controller.

I'm using KISS esc and mine is flyable, but there is noticeable mid level oscillations. full throttle is fine. its just around 1300-1400
get it still even with P's down around 2.

both of us are running GTINpower 2205. nice motors but powerrrr hungry

#### Post by Tony Leyland

On my Alien build I also experience mid-throttle "vibrations" and have tried extensive tuning on BF 2.9.0 and also soft mounting the FC with no luck.

I run the following:
EMAX 2205 2300KV
HQ 5" Tri-blades
KISS 24A ESCs V1.1
Dodo V3a FC
RC filter to the FC & RX
Turnigy Graphene 1300

I see it in the Black Box traces in particular on the Yaw axis.

At first I wondered if it was the KISS ESC firmware, but have not flashed them yet - awaiting V1.3 to come out.

People are saying this occurs at mid throttle but in my case I believe it to be when the copter's power system is stressed the most. That is when the copter undergoes rapid acceleration and current consumption is at it's highest amount. I can hover at high altitude at mid throttle but don't see the vibrations in the FPV feed or HD footage.

I'm going to try the capacitor near the batter lead next and update you guys.

#### Post by fftunes

Just another small report of electrical noise: Friend built another all new quad with naze r6 which produced a weird high frequency hum, no matter what filters/PID etc were set to.

A single cap (35v 470uf) to the pdb fixed it.

#### Post by jubifly

Had similar problems on my build. I tried both, limiting possible electrical noise with capacitors and mechanical vibrations by softmounting the FC with some rubber o-rings. Both with no luck. I then tried to remove the FC completely from fixed parts at the frame and left it hanging in the air (just the motor and rx wires) and the yaw twitches disappeared. My thoughts on that were that the rubber rings were not applicable (maybe too hard?!) for softmounting...
Maybe try leave the FC dangling in the air and see if it still happens - just to definitely eliminate the possibility of mechaninacal noise being the issue.

#### Here is a post from ctzsnooze on a better soft-mounting method.

http://www.rcgroups.com/forums/showpost.php?p=35486733&postcount=36111

#### A nice conclusion on this issue from ctzsnooze

Lots of us have seen exactly this behavior. I am surprised that you seem so astonished now that you find it happens to you. It happens randomly. It could happen to anyone. It just happened to happen to you. :-)

It goes away with replacing the gyro chip, replacing the FC, or soft mounting the FC; these fixes work whether or not capacitors are added. Sometimes it goes away by just adding capacitors.

Since soft mounting is a reliable fix, external vibration seems the likely culprit, difficult otherwise to explain how soft mounting often causes it to just disappear. Blheli-s ESCs are more commonly implicated than non-BLHeli-s ESC's and in some cases capacitors help so there may be an electrical contribution. It is far more common on yaw than the other axes. The yaw sensor within the chip must be physically different from pitch/roll since the axes relative to the layer of silicon for yaw vs pitch/roll are quite different.

That's all we know for sure. How these factors actually cause the oscillation, and why it is yaw exclusive, is completely speculative.

When soft mounting doesn't work it's usually because it isn't done in such a way as to effectively isolate the FC.

I've seen such extreme examples as to render the quad un-flyable, and also much milder examples, so it is not an all or none thing.

Although the magnitude is increased by higher yaw P it is not simple feedback oscillation, there is no threshold value of P below which it disappears. The actual oscillation frequencies are so low as to not be attenuated by the o-rings. Exactly what the o-rings block is not clear.

It cannot be eliminated by filtering the gyro data - as has been pointed out before, out the primary oscillation frequency is within the range we need for to fly the quad normally.

It is not a software issue in blheli or betaflight, we can be sure of that. Replacing the gyro chip doesn't change that software yet it does fix the problem.

My gut feeling is that this is an inherent issue in these gyro chip themselves, and that some individual examples of these chips get it much worse than others. That's why I recommend replacing the gyro chip or the whole FC if simple soft mounting fails to solve the problem.

#### another post by ctzsnooze (22 Sept 2016)

When you guys say you are soft mounting, be aware you need to over drill the holes to 4mm and ideally bevel the top and bottom of the hole so that the FC 'floats' in all axes. You need to check for free movement. If you don't drill out the holes the bolt holes will stick on yaw on the bolts and transmit vibrations directly. Also you can't have anything stiff pushing on the FC, ideally all wires to/from it need to be very fine silicone.

You should revisit that mounting and check it does work like you can freely wiggle the board in all three movements. Do that before doing anything else. That is the most likely thing to fix it.

I have seen this problem twice (two separate quads, both 6000's, out of maybe 15 machines) and exhaustively tested solutions on those two with the problem. It is pointless trying to filter it out. It is a hardware gyro issue where it is sensitive to noise generated by motors powered by BLHeli-s ESCs. It will be affected by changing yaw P but typically not eliminated.

In both cases, proper soft mounting fixed it. Without the soft mounting I also could eliminate it on one by desoldering the gyro chip and replacing it with a brand new one. I didn't try that on the other.

My conceptual model is that the hardware PWM system in BLHeli-S ESCs causes some kind of very specific noise at certain throttle points that deeply affects the yaw sensor part of some gyro chips.

It is also possible that there is an issue in BLHeli-S code that causes the problem. By that I mean there may be a throttle point where output is not linear. I have noticed that by spooling motors in motors tab very slowly and listening carefully there are some throttle points where the motors lose their smoothness. This non smoothness at certain points is also the case on non BLHeli-s ESCs. It could be that all four motors together at these points somehow encourage positive feedback. To rule this out someone needs to thrust test in such a way to validate linear proportional motor output in the affected range. But to date no-one has done that test or identified any specific ESC firmware issue. FWIW, I disable all dithering in BLHeli-S. Maybe give that a try.

#### But the most important thing is a truly functional soft mounting. Not some half-hearted bunch of o rings

MotoLab Cyclone boards have plenty of space around the holes, intentionally, no problem there. It's a totally different situation with a Dodo, which has components very close to the holes. Especially tough if the FC bolts need to keep going up for structural reasons like on many small frames, in which case you have no option but to enlarge the holes.

I can't stress enough that just over drilling isn't enough. The board can and will slide on the o ring until one hole stops with the edge of that hole wedged on a bolt. Beveling the top and bottom of the hole allows re-centering and is essential with a yaw issue of his kind. I use a cheap conical grinding stone to make the bevel.

#### A solution by airmaxx23

http://www.rcgroups.com/forums/showpost.php?p=35785741&postcount=38781
So, great news, this completely took care of my yaw shake. I didn't change anything else prior to trying it either. Just in case someone wants to print up some of these standoffs I can put them on Thingiverse or if you want to draw them up they're 6mm outer diameter and 2.9mm inner.
Here you go, 8mm, 10mm and 12mm. I can print them in orange, red, black, blue or clear if anyone needs them.
http://www.thingiverse.com/thing:1785455

Another possible solution:
http://www.rcgroups.com/forums/showpost.php?p=35786828&postcount=38790

#### Post by scripto23:

I've got another data point to add to the gyro noise/twitching debate. I have the Spracingf3 evo with the 9250 gyro. On a brand new build it was literally unflyable, I don't mean it flew like crap, I mean I couldn't get it off the ground because it was twitching like a stuck pig.

Read through the relevant part in the amazing wiki (thanks waltr) tried soft mounting (already had a capacitor on the pdb) and managed to get it in the air, but still had very bad micro oscillations at anything above 1/3 throttle on ALL axis; visible on FPV and blackbox logs. I tried every combination of PIDs, nothing helped. I finally changed the FC to the spracingf3 with the 6050 gyro and all traces of micro oscillations were completely gone.

It seems some people have no problems, some people have mild problems, and some like me are left with severe issues. The boards with these gyros are completely hit or miss. I sincerely doubt the quality control (or lack thereof) for this part.

#### More from Boris's thread (7 Oct 2016):

Posted by mikenxzz:
I have a problem with strong magnet motors (Tornado T2 2206), where straight after arming, at idle, the motors vibrate a lot.
Reply by ctzsnooze:
Yeah I have a build that does this exact same thing with Tornado T2 2206 2600 motors, but not with SunnySky 2204 2300's on the same frame. It only happens briefly while waiting for me to take off, then I never see it in flight. Odd, never seen it before. Haven't blackboxed it yet doesn't trouble me enough. Suspect some BLHeli setting like startup power needs to be changed a fraction.
Boris's reply:
It happens I have been analyzing several different motor /prop combos and their vibration to determine some better general default filters. I do see a lot of variance in there especially on light and torquee setups.
The differences are vibrations over different throttle ranges.
For tornado motor default 3.0 causes some low throttle vibrations between 100hz and 230hz. But the most vibration comes around 400hz on upper throttle section.
The lowpass filters are not strong enough to completely remove that noise even when cascaded. The only thing what helps is the notch filter on gyro as that one can cut really deep on that specific range.
I use double gyro notch with really great results with practically almost no delay penalty. Just some information loss.
Notch 1 180hz and cutoff 80hz
Notch 2 400hz and cutoff 300hz

Dterm notch is default values.

That's why I will add second notch option in 3.0.1 patch.

But I also have great success with several different de-noising filters i have been experimenting with.
Savitzky golay does an excellent job, but its too expensive in terms of cpu.

Its the nowadays motors what really cause more microvibrations than the older ones
Certain escs will pronounce this noise more.
Not sure why blheli_s seems most sensitive of all at the moment.

#### Another solution by Race Miata (posted in the BLHeli_S thread):

Regarding mid-throttle twitch, I tried all sorts of tuning, filters, FC mounting methods without much luck because of those super torquey 2306 motors. So far what works best for me is to

1. meticulously spin-balance each entire rotor assembly (motor plus prop). I'm talking about less than 0.002g of imbalance with the entire rotor assembly,

2. hard-mount FC (not surprised because just like for onboard vids soft-mounting the cam never works for me to reduce jello but instead hard-mounting the cam works the best once I balance the props, AND

3. sandwich electrical tape between motors and frame to absorb high frequency vibes from the motors after rotor assemblies have been meticulously balanced. The reason for the meticulous balancing is that if motor is not super-hard mounted to the frame then vibes may be amplified.

Hard-mount-FC with shock-isolating motors work much more effectively to isolate high frequency vibes from the motors to the FC than soft-mounting FC because high frequency vibes travel thru' hard body (hint: entire frame) very well. By the time it gets to the FC, no amount of soft-mounting the FC can work effectively. There's just not enough mass with the FC for soft-mounting it to work effectively. OTOH, when the vibe-isolating means is further upstream towards the source the whole frame adds to the mass downstream of the vibe-isolating means to effectively absorb the vibes. If you're a race car tuning geek like I do, think sprung weight vs unsprung weight. It's always desirable to have the most of the car's weight as sprung weight as opposed to unsprung weight for the suspension to work best.

At this point there's still some mid-throttle twitch as shown in the following vid but with it toned down I don't have to dumb down my PID/filter tuning to compromise responsiveness and prop-wash handling. At least it's much more pleasant to cruise around near mid-throttle now. Before (see my earlier Multistar 250 vids), I hated to use mid-throttle so much I just tried my best to do 0-1 throttle just to avoid using part-throttle.

My Multistar250 with Spin-Balancing and Vibration-Absorption Motor Mounts (2 min 40 sec)
https://www.youtube.com/watch?v=rXB9Rl7vLDI

#### Comments on this by AILERON8:

Isolating vibration at its source before it's amplified is standard practice in just about every mechanical and aeronautical engineering handbook that's ever been written. Yet for some reason most folks in this hobby are so laser focused on a software-based filter or FC enhancement of some sort they're blinded to what should be an obvious solution. Dampening the motor vibration, stiffening the frame, or even placing a sensor near or on the motors (utilizing the active feedback signal within the FC software for an automated/enhanced filter) are going to have a much more pronounced effect on noise reduction than all the software filtering in the world.
I'd also just like to mention that I am in no way trying to imply that software-based filters in the flight controller are ineffective. Only that reducing motor vibration has great and untapped potential in my opinion

#### Continued Discussion (13 Feb 2017):

##### AILERON8:

The same goes for motor soft mounting, the bolts must be isolated for the method to reach its full potential. I have yet to see a quad with fully soft-mounted motors, but I suspect it would make for the smoothest, most oscillation-free quad ever. So oscillation-free these 32khz gyro's should be all set for takeoff. Floating motors should eliminate the opportunity for resonance to develop and propagate towards the sensitive gyros. Unlike soft-mounting the FC, for motor dampening to be effective it doesn't need to eliminate frame oscillation. The goal for motor dampening is to decouple the frames' natural resonant frequency from the motor as its oscillations vary in frequency and amplitude. All motors oscillate, regardless of balancing. The frame won't oscillate if it's detached from the motors. The motor must completely float in order to achieve this effect however. Which is why I think folks will be in for a surprise when they see how well motor soft mounting can be if fully implemented. I honestly think FC soft mounting will be a thing of the past when the results start pouring-in...

##### Tesseract1984:

Agreed.
Having tried it all (soft mount FC, caps on mains, caps on ESCs, soft mounting motors), this seems to be the ticket. I've had varying levels of success with each option. The most useless of them all being a cap on the mains.
Soft-mounting motors makes the most sense. In my opinion doing it to the FC is a band-aid while doing the motors attacks the source and doesn't introduce any delay.
A little anecdotal story; i once went overboard with soft mounting a LUX v1 and it actually caused problems. I not only had those rubber bobbins, but also O-rings and the lower standoffs resting on a tpu printed plate with screw holes. What this caused was a very slow wobbling oscillation akin to when I-term is too high (at least in older BetaFlight versions).
While multi-rotor flight is still in it's infancy and we are trying new things, yes there are a lot of hype trains. As you can see I've been on them all, but truly, this is the first one that has conclusively solved a plethora of issues including:

- FPV video interference
- HD cam jello
- Sporadic yaw twitch
- Un-tuneable D-term
- etc etc
  Would love to see frames come out that have motor soft mounting built into the frame. IMO this should become an industry standard. Also had an idea a few months ago for FC screw holes to have silicon material with a hole big enough for screws.
  Anyway, just my 2 cents. Just converted my whole fleet using tpu soft mounts and it has literally changed my quadcopter experience. My HD footage actually starting to look like I might know what I'm doing.
  All aboard, the hype train is leaving the station!

##### AILERON8:

I agree, too much dampening can make for a sloppy ride. I've over-dampened my FC before using an SPracingF3 board strapped to a giant piece of foam. Sure, no oscillations, but no matter how high I cranked the PIDs it felt loose and sloppy. We want the motors to float, but still let-in those low frequencies untouched. It's definitely a fine balance. One thing I don't believe motor soft mounting will solve though is electrical noise. Most of that is coming from the ESCs via damped light. Although recently Aargh80 came-up with a novel approach to minimize the latter noise using a small 270uF cap in parallel with a tiny MLCC board that can be remotely tucked anywhere in your stack or fuselage. I'd like to see a production version, even though it's not that hard to make it would be nice to have one all set to go for expediency's sake.

##### QuadMcFly:

Obviously removing the vibrations at the source is much more effective than trying to remove them once they've picked up all kinds of harmonics from the frame I have put together the idea of how to do this, but small volume is too expensive to make it worth it. It involves shoulder bolts 1mm-1.5mm taller than the frame, holes for the screws 1mm-1.5mm wider than the shoulder bolts, and ninja-flex printed grommets to fit the holes. The shoulder bolts tighten against the base of the motor to prevent backing out, but still "float" on the ninja-flex grommets in the arms. there's enough tightness to prevent misalignment of the motors, but enough isolation to be very effective against high frequency vibrations. To make it even cheaper one could simply use the correct diameter heat shrink over the shoulder part of the shoulder bolts and then isolate the motors the old fashioned way. Unfortunately shoulder bolts are super expensive in small quantities.

#### Another post of fixing mid-throttle oscillations by ghall05

I've had this qav210 for a while now that's had mid throttle oscillations. Changed escs and fc and also tried some different soft mounting methods with no luck. However adding a 25v 1000uf low ESR cap on the main battery connection has solved it! And this is with a hard mounted FC too.

Just another data point! I'm putting caps on all my builds from now on.

Edit: I should add that I was using a kiss fc first and then a cyclone (which I'm still using now). So mid throttle oscillations can definitely happen on setups without the 6500 gyro.

#### Good before and after BB example of soft mounting:

https://www.rcgroups.com/forums/showpost.php?p=36091829&postcount=2453

#### Another Discussion on Oscillation issues:

vini3019:
Just want to share with you guys some of my thinks...

Recently I was fighting very hard against mid throttle "side effects" like mid throttle oscillations and yaw twitches (not talking about cases where the issue remains with zero PIDs). I realized that all those issues started when I switched to "over powered " builds where the motors were stronger, props lighter, frames lighter and smaller (with less inertia). I remember that when I was running Sunnysky 2204 for example, it was very easy to tune. I was able to push P and D very high without any problems. Yes, those motors are relatively weak with lower torque and slow acceleration. Then I switched to Cobra 2204/2206 and here it started (mid throttle oscillations) but it still was tunable. Today I am running Cobra Champion 2205 2300 and it becomes really hard to deal with those side effects with just try to tune them out. Trying several ways to solve this issue I realized that there are two most effective ways:

1. Slightly heavier props but still efficient like HQ5x4x4 instead of HQ5x4x3
2. Mechanical damping for FC (soft mounting). And I found it useful not only for sensitive gyros.
   Assuming usage of low ESR capacitors as a good practics any way.

So if I try to analyze all this inputs, I can see that increased mid range torque and higher acceleration speed of the motors combined with the light props, more precise, air mode mid throttle authority and power full ESCs and high discharge batteries can provide destabilization in existing PID controller not only at high throttle but also in mid throttle and fast throttle transitions.

Now how heavier props and soft mounting helps to prevent those issues?
From my point of view they act as a mechanical damper in close loop system like PID controller.

So if our build has good matching between motors benefits and frame inertia/weight, there will be good chance that we will not get side effects. But what happens when we have over powered build where there is not enough "built in" mechanical damping factor? As I can see the existing PID controller not always can deals with it adequately.

I think it is possible to add an optional dynamic software damper to the PID controller.
We already have one called TPA , but this one acts only at high throttle and it very simple and linear.

My suggestion is to think about some configurable, non linear P attenuator for desirable throttle range. The user can be able to define the start and stop throttle points to apply P attenuator and also the attenuation factor. Some similar to how the notch filter works.
By this way we will be able to control mid throttle side effects without detuning our quads and possibly deal better with prop wash.
That do you think?

Boris' Answer:
I am not sure what you already tried, but if you use low noise gyro like MPU6000/MPU6050 the noise is really easy to solve.
There is really no need of lowering your P's as you suggest just for that. You technically don't even need TPA in that case.
The notch default filters in 3.0.1 should deal with low and mid throttle vibrations in most cases.
On few of my quads I also have the Cobra champion serie motors like you and had terrible time tuning those without notch filters before.

#### Another Post on curing oscillations from linklemming:

https://www.rcgroups.com/forums/showpost.php?p=36220137&postcount=41113
Later comment:
I just stuck three squarish (~15mm) pieces of electrical tape on the frame underneath the motors, used an exacto knife to cut holes in the tape for the screws and remounted the motors making sure not to tighten them down too much.

I really doubted it would be as effective as it was since vibes can still come thru the mounting screws but it fixed the issue.

##### Motor Vibration Isolators. Printed in extra flexible NinjaFlex (softer than TPU)

https://www.rcgroups.com/forums/showpost.php?p=36698872&postcount=2693

##### A short thread on the Frustrations of Curing Mid-throttle Oscillations.

https://www.rcgroups.com/forums/showthread.php?2787839-AHHAHAHA-Trouble-shooting-over-a-month-Mid-Throttle-oscillations-Finaly-Solved
Moral: It may not be what you think. In this case is was very probably a loose FPV camera. This is a good reason to confirm the oscillation with a BB log.

##### Successful curing of Oscillation:

The problem: https://www.rcgroups.com/forums/showpost.php?p=36310032&postcount=249
Fixed: https://www.rcgroups.com/forums/showpost.php?p=36326501&postcount=253
Broken: https://www.rcgroups.com/forums/showpost.php?p=36330372&postcount=255

https://www.rcgroups.com/forums/showpost.php?p=36857612&postcount=2746

##### Successful curing of yaw twitches:

https://www.rcgroups.com/forums/showpost.php?p=36692751&postcount=916

##### Testing of the new ICM20602 Gyros:

Boris: Oh.....for the record its not just ICM20602, but MPU6500, MPU9250 and all other ICM2xxxx devices that show exactly the same behavior. Pretty much every 32khz supported gyro out there.
https://www.rcgroups.com/forums/showpost.php?p=36622960&postcount=43273
More discussion: https://www.rcgroups.com/forums/showpost.php?p=36623357&postcount=43282
https://www.rcgroups.com/forums/showpost.php?p=36623562&postcount=43287
https://www.rcgroups.com/forums/showpost.php?p=36630278&postcount=43337
https://www.rcgroups.com/forums/showpost.php?p=36630822&postcount=43348

##### Posted by KagedMayhem:

I see the comments about notch filters helping with the noise issues, and the comparisons between the mpu6000 and the new icm20602 but not seeing anything about if the current iterations of Betaflight helped solve the noise problems. Is that what the notch filters are for?
Boris:
You can of course make the filtering more aggressive, but readings from ICM20xxx gyros can be too messy on hardmounted solutions so softmounting to make them less sensitive seems like the only solution on those, where on mpu60x0 you would mostly get away on standard mounting.

##### Post on testing DShot before and after adding Large, low ESR caps to power system:

https://www.rcgroups.com/forums/showpost.php?p=36713066&postcount=3133
https://www.rcgroups.com/forums/showpost.php?p=36718584&postcount=3144
https://www.rcgroups.com/forums/showpost.php?p=36720323&postcount=3157

##### Post on Proper Soft Mounting by arcaine25:

I had an issue with a 9250 gyro and enabling 32khz mode, setting 16 / 16, but discovered that the issue was the way I was "soft mounting". I tend to be a little OVER OCD, and I tightened it too much, as well as a couple other mounting mistakes made in haste. When correcting those, and mounting a little "looser" the yaw twitch went away. I am going to dedicate a 32khz mode quad today and test it all over the place... haha

##### Thread about Caps for Noise reduction:

https://www.rcgroups.com/forums/showthread.php?2830948-Capacitors-for-noise-reduction

##### Links to Soft Mounting hardware:

OZ -- I am using these, $4.30 for 8 shipped. They are rubber 8mm x 8mm with standard M3 male/female mounting.
http://www.ebay.com/itm/151873404692?_trksid=p2057872.m2749.l2649&ssPageName=STRK%3AMEBIDX%3AIT&rmvSB=true
These are the only ones I have tried and all yaw twitches are gone, they are stiffer than I would think would work, but working well on my revolts (SSG) and sparky2's (9250) flight controllers @ 32/16, motors are hard mounted.

These were just posted and look to be red silicon (softer?)
http://rotorgeeks.com/index.php?route=product/product&product_id=599&search=damp

Gozz -- These are the ones I recently started using too, they work very well for the size.
https://www.readymaderc.com/store/index.php?main_page=product_info&cPath=53_777&products_id=6306

What is considered the proper way to soft motors?
Answer from AILERON8:
There are many different ways of doing it, but what I do is make sure I'm using truly "soft" mounts, either rubber or low-infill TPU, and place one under each motor and under the arms so the motor screws are floating as well. You want the motors to decouple from the frame without becoming loose in the process. It's a fine balance that results in the best tune ever if executed properly.
http://pirofliprc.com/1mm-Medium-density-motor-soft-mounting-pad-10-pcs_p_3852.html

List of Soft mounting parts from SadLeprechaun-
I use this stuff for soft mounting/vibrations:
[Motors](http://www.getfpv.com/motor-soft-mount-silicone-pad-w-3m-backing-set-of-4.html)
[stand offs](http://www.getfpv.com/anti-vibration-flight-controller-standoff-7mm.html)
[o-rings (on top of standoffs)](http://www.getfpv.com/multipurpose-o-ring-set-of-8.html)
[HD cam / escs:](http://www.getfpv.com/rtom-anti-vibration-moongel.html)
[Cap for battery lead:](https://www.amazon.com/dp/B00T2IA7MM?tag=viglink20264-20)
[Caps for ESCs: ](https://www.amazon.com/Panasonic-470uF-Radial-Electrolytic-Capacitor/dp/B00WOQ0ILE?tag=viglink20264-20)
It took all that and removing gyro notch filters / PT1 fix to get the F60 Pro quad to run without mid-throttle jitters. Each thing reduced them more and more.

### Can Filter tuning help?

The newer filters in 3.0 & 3.1 have pretty aggressive defaults. A number of fliers have reduced oscillation issue be reducing the use of the filters. See the [Gyro & Filters 3.1](/docs/wiki/guides/archive/Gyro-And-Dterm-Filtering-Recommendations-3-1) support page for details and discussions.

## Is there a way to download blackbox logs through a terminal client ?

Thanks to dropax for asking this and working out the answer.

Some code digging reveals a CLI command "flash_read" which is only enabled for sparky2:
added "#define USE_FLASH_TOOLS" in spracingF3/target.h, compiled and flashed board.
Set PuTTY to log all session output to file, connect, type "#" to enter CLI, "flash_info" to get usedSize, "flash_read 0 'usedSize'" and the show begins. 11 minutes later close PuTTY and find a nice 8MB log on the harddrive.
Blackbox viewer is robust enough to not care about the initial "talk" in the logfile.

One thing that caught me at first was the flow control setting in PuTTY, has to be "none", got truncated logs with the default.
Not as convenient like hitting some buttons in configurator but it will save me sooo much time, big thanks to whoever added this handy piece of code.

I think [this](https://github.com/cleanflight/cleanflight/commit/3eb28f16eaa5d4f4a085bcb87f334ba85d3ace84) is the initial commit to cleanflight and [this](https://github.com/betaflight/betaflight/commit/3eb28f16eaa5d4f4a085bcb87f334ba85d3ace84#diff-34076ed1dbe02400da4a39189fe5c250) to betaflight, date is 01/28/2015 for both. So my thanks go to thenickdude, the flash and blackbox guru.

Since it's only enabled for the "brand new" sparky2 target (08/06/2016) I think it is only meant for debugging purpose. After the download the serial port seems to hang up and I have to reboot the FC but the time savings are totally worth the hassle.

## Why do LED strips not work ?

One possible reason:
Many LED strips do NOT work when power at over 5V since the FC's serial output is only 3.3V logic and the LED chips never see a valid logic high. Lowering the LED Voltage by at least a diode drop makes them work.
Two working solutions are:
Add a silicon diode, 1N4002, in series with the 5V to the LED strip.
Power the LED strip from a regulator adjusted to about 4.7V. May need to adjust a little lower if still not working.

## Recently with the temps dropping, my quad has started to develop a random twitch. Anyone else experience random issues when it's 20'ish degree's F outside ?

Excellent answer by AILERON8:
Not twitches, but glitches in general, you bet! I used to run a mobile DJ business for 15 years, and I've performed hundreds of gigs in cold climates living and working primarily in coastal Maine. Today it's a balmy 5 deg F for example, but from all those years of experience I can tell you there are three major things that happen to electronics and hardware due to the cold, and they're not good I'm afraid to say.

- Shrinking & Expanding: Microelectronics are designed to withstand a wide variety of ambient temperatures, particularly the types we're using in our hobby such as FET's, low ESR caps, and large integrated circuit boards. These devices are specifically engineered to dissipate heat, mostly by utilizing the plentiful airflow quadcopters can deliver as a byproduct of their basic functional design. Unlucky for us though, is that the same ability for the circuits to effectively dissipate heat works against us and can overcool certain components on the board. The overcooling will cause the many different types of raw materials the components are fabricated from to shrink at various rates. Although some of this "play" is often accounted for in their construction, when temperatures are severely low the shrinking can be equally severe and cause components to electrically short, crack, become brittle, and break. Damage can vary from temporary to permanent depending on what occurred.

- Condensation: While in the cold your components will not condensate water, but your goggles will certainly fog-up. If you're running Fatsharks with the little fans then you're pretty much all set, but for those who have no way to get rid of the fog without using your hands, I don't know what to tell you. When you bring your rig back into a warm house quickly after being in sub-freezing temps for an extended period of time, the condensation can be severe enough to permanently destroy things that shouldn't get wet. It doesn't matter how much Corrosion-X your squirt on your ESC's, FC, or PDB, they are going to get sopping wet if you don't gradually raise their temps to room temperature. Trust me on this folks… If you aren't slowly raising your temps then all it takes are a few flights before your quads start shorting, buzzing, and catching fire…

- Slow Decay due to the Cold: Okay, here comes the main point. If you are flying your quads in the freezing cold on a semi-regular basis you will be shortening the life of every single component considerably. I'm not complaining to you, I'm just delivering the facts. Even if you are gradually raising the temps on your equipment when moving them from the cold, every single component and circuit is being stressed to the max from all the contraction and expansion, and you can't completely stop condensation from building. Here's the nail in the coffin! Sadly, your LiPo is already being strained due to the cold for reasons I won't go into for brevities sake. Your pack really doesn't want to give the extra juice even though it's being forced to do so… It's a bad recipe for sure, and ironically, what happens is you will land with MUCH hotter ESC's, motors, and worst of all, LiPo's. Really watch-out, because your packs can get so hot they catch fire. Magnets… Magnets do like the moderate cold fortunately and [actually increase increases in strength by a small amount down to around -125°C. ](https://www.kjmagnetics.com/blog.asp?p=temperature-and-neodymium-magnets)

## Why can't I connect to my flight controller using MSP over UART1 (broken USB)?

Since Betaflight 4.5, MSP over UART can be added using a define to flash firmware using for example a FTDI adapter on USART1

```
make [TARGET] EXTRA_FLAGS="-DMSP_UART=SERIAL_PORT_USART1"
```

Configurator cloud build also works with custom define `MSP_UART=SERIAL_PORT_USART1`

:::note
`MSP_UART` can be assigned to another port as well.
:::

## Is it possible that we can flash the FrSky receivers thru the flight controller like we now flash the ESC?

That's done by Fishpepper;
[OpenSky / tinyFISH](http://fishpepper.de/2017/02/24/opensky-tinyfish-how-to-update-the-opensky-receiver-firmware-through-betaflight/)

## Is there a way to dismiss the OSD post flight statistics screen?

Yes, move either the throttle or pitch stick high to dismiss the statistics screen and return to the "main" OSD screen.

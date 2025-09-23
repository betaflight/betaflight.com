---
sidebar_position: 11
---

# Betaflight 4.2 Tuning Notes

[Betaflight 4.2](https://github.com/betaflight/betaflight/releases) brings:

- [More accurate loop times](#more-accurate-loop-times) - improved RPM filter performance
- [Improved feed forward](#improved-feed-forward) - smoother flight, with snippets to optimise averaging and smoothing settings for [race to cinematic purposes](#quick-settings)
- [Dynamic D filter expo curve](#dynamic-d-filtering-expo) - improved propwash by raising D filter cutoffs faster as you throttle up
- [Dynamic battery sag compensation](#dynamic-battery-sag-compensation) - consistent responsive throttle and PID 'feel' through the entire flight
- [New rates modes](#new-rates-modes) - more intuitive adjustment of the parameters that matter, and ultra low expo possibilities for race and cinematic use
- [Improved dynamic notch filter](#improved-dynamic-notch-filter) - better noise rejection, simplified min/max configuration.
- [Automatic anti-yaw spin configuration](#automatic-anti-yaw-spin-configuration) - stops yaw spins more quickly
- [Antigravity gain independent of I values](#antigravity-gain-independent-of-i-values) - if you change I, the strength of the anti-gravity effect will not change
- [Simpler and better RC smoothing](#rc-smoothing-improvements) - careful optimisation of the default auto smoothing method means that manual smoothing should almost never be required
- [Iterm Relax works properly in setpoint mode](#iterm-relax-works-properly-in-setpoint-mode) - fixes a bug in 4.0 and 4.1 where lowering the cutoff in setpoint mode achieved very little. Now that setpoint mode works properly (at last), users who moved to gyro mode should go back to setpoint mode. Default iterm_relax_cutoff reduced to 15 to give better bounce back suppression on lower authority quads.
- [NFE Race Mode](#nfe-race-mode) - an interesting flight mode with acro on pitch, self-levelling on roll
- [Configurator 10.7](#configurator-improvements) - many improvements, notably displaying the graphics of the different rates types properly
- [OSD Improvements](#osd-improvements) - the logo can now be shown briefly every time you arm, CRSF displays both mode and strength; camera frame, distance from home, and efficiency added.

**4.2 should fly really well on defaults, with no modifications, with most quads.** If you know your quad requires special or unusual PIDs, please re-tune, because with the new 4.2 features, you may get you an even better result with different PIDs. For instance, if you wanted to be able to add more D but were limited by noise, it may be possible now.

**Some low authority quads (under-powered whoops, ducted HD whoops, 7" and larger quads, endurance quads, etc) may require [specific settings to minimise bounce-back](#settings-to-minimise-bounceback).**

If you're new to 4.2, please read the 4.0 and 4.1 tuning notes.

**Configurator version 10.7 or higher is mandatory. Get it from [Configurator Releases.](https://github.com/betaflight/betaflight-configurator/releases). Earlier versions are not going to work properly.**

**NOTE 1**: DO NOT paste a diff or dump from any prior build into the 4.2 CLI. See if you can use the sliders to approximate your old PIDs and filter settings, to make it easier, in future, to use sliders for tuning.

**NOTE 2**: If you previously set `dyn_notch_range` to `LOW`, change `dyn_notch_max_hz` to 350, and for `HIGH` to 700. Default of 500 for most quads is fine otherwise. Read more about setting the range [here](#improved-dynamic-notch-filter).

**NOTE 3**:If your previous PID `I` values were changed from default, the anti-gravity gain values in 4.2 may need changing a little to get the same outcome. We recommend flying the default antigravity value and re-tuning it to the optimal value. Details [here](#antigravity-gain-independent-of-i-values).

**NOTE 4**: If using the Accelerometer, arming will fail unless it has been calibrated.

**NOTE 5**: We recommend using eRPM based filtering. Read about [enabling and configuring rpm filtering here.](/docs/wiki/guides/current/DSHOT-RPM-Filtering)

## Quick settings

These snippets are suggestions for how some of the less common settings might be adjusted to suit a certain type of flying. The defaults should be fine for fast freestyle and general racing requirements. I can't say that they will be perfect on your quad, and they do not include PID tuning or filter values, but they might show the kind of ranges for some of these numbers.

**ProRace** (aggressive feed forward, requires a _really clean_ RC signal or might jitter from RC steps and get hot motors)

```
set iterm_relax_cutoff = 30
set rc_smoothing_auto_smoothness = 5
set ff_interpolate_sp = ON
set ff_smooth_factor = 0
set ff_spike_limit = 60
set ff_boost = 20
set feedforward_transition = 0
set yaw_lowpass_hz = 100
set throttle_boost = 7
set throttle_boost_cutoff = 25
set dyn_lpf_dterm_curve_expo = 7
set gyro_rpm_notch_q = 600
```

(enable sag compensation, as high as suits you, and D expo also)

**Race/Fast Freestyle** (strong feed forward, tolerates a typical RC signal, very responsive)

```
set iterm_relax_cutoff = 20
set rc_smoothing_auto_smoothness = 7
set ff_interpolate_sp = AVERAGED_2
set ff_smooth_factor = 20
set ff_spike_limit = 70
set ff_boost = 15
set feedforward_transition = 0
set yaw_lowpass_hz = 100
set throttle_boost = 7
set throttle_boost_cutoff = 25
set dyn_lpf_dterm_curve_expo = 7
set gyro_rpm_notch_q = 700
```

**HD** (smoothed FF for HD cameras, strong low turn rate smoothness, low iterm relax to minimise bounce back)

```
set iterm_relax_cutoff = 10
set rc_smoothing_auto_smoothness = 20
set ff_interpolate_sp = AVERAGED_3
set ff_smooth_factor = 40
set ff_spike_limit = 55
set ff_boost = 0
set feedforward_transition = 40
set yaw_lowpass_hz = 70
set throttle_boost = 5
set throttle_boost_cutoff = 10
set dyn_lpf_dterm_curve_expo = 7
set gyro_rpm_notch_q = 800
```

**Cinematic** (For slow rate turns only, may feel a bit 'dull' otherwise)

```
set iterm_relax_cutoff = 5
set rc_smoothing_auto_smoothness = 40
set ff_interpolate_sp = AVERAGED_4
set ff_smooth_factor = 50
set ff_spike_limit = 50
set ff_boost = 0
set feedforward_transition = 70
set yaw_lowpass_hz = 50
set throttle_boost = 2
set throttle_boost_cutoff = 10
set dyn_lpf_dterm_curve_expo = 8
set gyro_rpm_notch_q = 900
set iterm_windup = 75
```

The following tuning suggestions may help minimise minor random wobbles in HD footage:

- disable D_min,
- set D about 20% above P, using the P:D ratio slider
- set TPA to D only, to start at your cruising throttle value, and increase the cut percentage a little
- set the D lowpass expo value as high as possible (you'll be limited by mid-throttle D noise)
  (with the extra D, you may need more D filtering, e.g. 2 clicks left on the D filter slider)
- use about 20% less P than your normal freestyle tune, just barely enough to provide basic P stability.
- and about half the default I on pitch and roll
- high FF transition eg 0.7
- make sure the ADC is not ticked in the hardware settings of OpenTx
- use Actual Rates with center set to 10-50, expo to 0, and your usual max rate. Actual with zero expo gives a soft center with quicker return to normal responsiveness out of center. Transition and/or deadband may not be required when the center sensitivity is very low.

For zero throttle instability

- go back to 24kHZ PWM if you've set the ESc to 48kHz
- raise DShot idle progressively until it becomes floaty, and tune dynamic idle appropriately
- try thrust linear at 25
- try disabling Dmin and slightly higher overall PIDs

**Return to defaults** (zero values mean 'off')

```
set iterm_relax_cutoff = 15
set rc_smoothing_auto_smoothness = 10
set ff_interpolate_sp = AVERAGED_2
set ff_smooth_factor = 37
set ff_spike_limit = 60
set ff_boost = 15
set feedforward_transition = 0
set yaw_lowpass_hz = 0
set throttle_boost = 5
set throttle_boost_cutoff = 15
set dyn_lpf_dterm_curve_expo = 5
set gyro_rpm_notch_q = 500
set iterm_windup = 100
```

**To enable all the other recommended new features all in one go:**

```
set dyn_lpf_dterm_curve_expo = 6
set vbat_sag_compensation = 100
set vbat_pid_gain = OFF
set rc_smoothing_type = FILTER
set rc_smoothing_input_hz = 0
set rc_smoothing_derivative_hz = 0
set rc_smoothing_input_type = BIQUAD
set rc_smoothing_derivative_type = PT1
set rc_smoothing_auto_smoothness = 10
```

To enable dynamic battery sag compensation:

```
set vbat_sag_compensation = 100
set vbat_pid_gain = OFF
```

## Settings to minimise bounceback

Betaflight defaults currently are intended to fly great on medium high performance quads - most lightweight, responsive 5" and smaller machines.

'Low-authority' quads, such as low-power whoops, ducted HD quads, heavy 4S freestyle builds, and many 7" and larger builds, and endurance builds, all share the common problem of being slower to respond to quick inputs than 'normal' quads. They tend to get bounce-back after quick flips or rolls, and after quick yaw inputs.

This paragraph explains why these kinds of quads get bounce-back, and how to fix it.

The PID `I` term, in Betaflight, provides precision in tight turns, pitch accuracy in fast forward flight, stability on windy days, stability in drops and mid-flip, controls asymmetric aero drag effects, and generally cleans up the myriad small persistent residual errors that P can't entirely deal with. It accumulates a correction for small residual errors over time, and that correction keeps the quad exactly on track. Higher `I` values will do this faster and more completely, especially in tight turns and on windy days, where there are small persistent residual errors that P, D or FF are unable to control. Relatively high I is one of the reasons that Betaflight 4.x tracks so accurately in tight turns and on long straights.

If the pilot requests a change in turn rate that is too quick for the quad to deliver, the gyro signal will lag setpoint, and will be a large error signal. `I` will start to accumulate to help correct this. `iTerm_relax` will try to control this accumulation. If iterm relax is inadequate for the amount of error, a large amount of I may accumulate, and when the pilot stops the flip, all that accumulated I will drives a movement in the reverse direction, which slowly fades away, until it gets back to zero. That's the single, fairly slow, 'bounce-back' event that the pilot sees when they terminate the flip.

This phenomenon is called 'iterm windup'.

We use the `iterm_relax` and `iterm_windup` settings to control iTerm related bounce back. The defaults for these parameters work very well in 4.2 for 'normal authority' builds. `iterm_relax`, at default of 15, strongly suppresses I accumulation during normal flip and roll inputs. `iterm_windup` works for yaw problems, and since it usually isn't needed at all, it is off by default.

'Low-authority' quads, however, will tend to get bounce-back after quick flips or rolls, and after quick yaw inputs, because they have much more delay and error than normal in relation to the stick input. Betaflight's `iterm_relax` and `iterm_windup` values will need to be adjusted for these machines.

You know you have a low authority quad when you get an annoying bounce-back after a 600 degree/s flip or roll, and/or a bounce-back after a quick yaw input. Other clues are that you require a higher than normal hover throttle value (ie your hover throttle is more than 25%), or you get slow wobbles in drops or at low throttle.

For yaw, any machine with longer arms - anything bigger than 6" - will lose yaw authority and typically have issues with yaw bounce-back and yaw jump.

Bounce-back problems due to iTerm windup can be addressed in three ways.

1.  **The best way is to change the tune or modify the hardware of the quad to make it more responsive.** Ideally the quad gets a tune that responds so quickly that the defaults work properly. This will have the added benefit of improving the overall handling of the machine as well. Let's think about how we could do this.

Low-authority machines typically require higher P and FF. Maybe up to double the default P and triple the default FF in some cases. There is a limit to how high you can go, but you need to go high. Most likely D needs to go up as well as P, or you'll get P wobbles, and D noise may be the limiting factor on how high you can go. You should push FF hard, and move the 'P and D gain' slider progressively to the right. These changes should reduce the wobble and the bounce back because it will get the machine turning more quickly and reduce error magnitude and duration. Note that very high D will delay responsiveness and make bounce-back worse. Getting the right P and D values is really important on these quads.

If you still have wobble and bounce-back despite tuning P and FF, you should then try reducing I, trying half of normal or a third of normal. Very low I will make the quad less stable overall, so don't go too low.

On the hardware side, over-propped quads will have difficulty changing thrust quickly. Always try smaller or lighter props that the motors can spin up more readily. Optimising the prop to the motors can make a huge difference to authority related issues such as bounce-back.

On very large quads, beast or X-class, rotating the motors inwards will improve yaw authority.

Any change that improves bounce-back means that you've got the quad responding more quickly and precisely, and that's a good metric of the success - or otherwise - of your tuning efforts.

2.  **The next best way is to reduce your maximum pitch, roll or yaw rate, or just fly more smoothly**, entering or leaving the flips or yaws a little more slowly. By not pushing harder than your hardware can deliver, you'll get a good overall performance envelope without extreme tuning.

3.  **Tuning the provided `iterm_relax` and `iterm_windup` functions.**

`iterm_relax` is what Betaflight uses to prevent unwanted I accumulation for really fast pitch and roll inputs.

The associated `iterm_relax_cutoff` value determines the strength of the suppression effect and how long it lasts for. Lower values suppress `I` accumulation more strongly and for longer, and are what you need to control iTerm related bounce-back.

Try stepwise reducing `iterm_relax_cutoff` from the default of 15 to 10, then 7, then 5, noting the improvement in bounce-back each time. Settle on the highest value that 'works'. The lower you go, the less accurate your tighter turns will become. So there is a bit of a trade-off to consider. You want the highest number that controls your bounce-back.

We strongly recommend keeping iterm relax in the default setpoint mode. There is no need to change to gyro mode in 4.2. Iterm relax will likely perform better in setpoint mode than gyro mode in 4.2.

For yaw bounce-back, optimising yaw PIDs can improve matters, and should be attempted first. On yaw, FF will provide the initial push as the sticks move, P a kind of boost soon after, and I does most of the work. For good yaw performance, all three elements are needed.

Ideally you get a log and adjust yaw P, FF and I so that for small to medium yaw inputs you get responsiveness that matches your pitch and roll lag.

You will see that for big, fast yaw inputs, the motors quickly get driven to a very high differential, with one pair at 100% and the other at zero. This means the quad cannot deliver what you are asking it to do. iterm windup and bounce back are inevitable when this happens.

`iterm_windup` is what fixes this problem on yaw. In 4.2 `iterm_windup` applies exclusively to yaw, previously it applied on all axes. It suppresses `I` accumulation whenever the motor differential exceeds the set percentage. Default is 100, meaning 'off'. 70 is good value to prevent yaw bounce back on low authority quads.

By stopping yaw accumulation at 70% motor differential, iterm windup won't happen whenever we command yaws that the quad cannot achieve, and I mediated yaw bounce-back won't be a problem. The great thing about `iterm_windup` is that it doesn't impair reactions to smaller inputs - they will be completely unaffected.

`acc_limit` and `acc_limit_yaw` are settings that selectively suppress I accumulation when the pilot is requesting a rate of change of setpoint (ie, an acceleration) that is too high for the quad to achieve. By default they are off. They only suppress `I` only while the setpoint is changing rapidly, and that is only briefly. Since bad iterm windup can happen over a prolonged period, including after the sticks stop moving, they are not recommended.

## That's all you really need to know... go fly!

**For hard-core tuners, here are the technical details:**

## More accurate loop times

Gyro and PID loop scheduling has been completely rewritten, resulting in less PID loop jitter and reduced CPU utilisation. No special configuration is required; it just works. You get improved filter accuracy, cooler motors, longer flights; RPM Q factor can usually be set higher without problems.

The RC input handling code has also been improved and is significantly more precise, leading to smoother FF traces than before.

**The gyro loop rate is now locked at the 'native' gyro sampling rate and cannot be adjusted by the user.** Usually this is 8k.

The PID loop rate can, and should, be adjusted to suit the capabilities of the processor. The PID loop time is displayed at the bottom of the Configurator. The most important thing for rpm filtered setups is stability of that loop time. One percent loop time error means that the rpm notch filters will be 1% away from their correct positions.

Without RPM filtering, most F4 and F7 boards will run perfectly fine with 8k PID loops.

WIth RPM filtering, F405 and F7xx boards should also be OK with 8k PID loops, but F405's are more accurate at 4k. We recommend 4k, then try 8k; only stay with 8k if it seems at least as stable as 4k.

F411's should be set to 4k and typically will require overclocking to get optimal results.

To keep jitter at the lowest possible value, disable blackbox logging. While logging, use 1k unless higher rates are essential, and disable debugging unless a debug is needed.

When running 4k or 2k PID loops, aliasing artefacts can arise from the down-sampling process. These are usually prevented by the gyro lowpass 2 filter, which runs in the gyro loop. It is the only lowpass filter running at gyro loop speed. If it is disabled, a simple 2-point averaging filter is automatically enabled in its place when 4k or lower PID loop rates are selected. 2-point averaging reduces aliasing artefacts reasonably well for 4k PID loops, though not as well as a lowpass 2 at 1000hz, but does not fully prevent aliasing at 2k. Hence **gyro lowpass 2 should not be disabled with 2k PID loops**.

8k PID loops have no aliasing issues, so gyro lowpass 2 can be freely configured for noise reduction, or disabled if it's not needed, without concerns relating to aliasing.

With a 4k PID loop, if you don't need gyro lowpass 2 for noise reduction purposes, set it as high as it can go (currently to 1000Hz), or turn it off.

With a 2k PID loop, don't disable gyro lowpass 2.

## DShot settings:

With rpm enabled, use DShot300 with 4k PID loops and DShot600 with 8k PIDloops.

With bidirectional / rpm filtering enabled:

- dshot150 -> 2k max pidloop
- dshot300 -> 4k max pidloop (at 8k, DShot 300 data only gets sent every second PID loop)
- dshot600 -> 8k max pidloop

Without bidirectional enabled:

- dshot150 -> 4k max pidloop
- dshot300 -> 8k max pidlopp
- dshot600 -> up to 16k max pidloop (8k is the max configurable PID loop rate in 4.2)

## Improved Feed Forward

4.2 provides feed forward optimisations to suit everything from hard-core racing to cinematic HD.

When configured aggressively, Feed Forward reacts immediately to any stick input. The basic feed forward component is proportional to the speed with which the sticks move, and the boost component is proportional to the instantaneous acceleration of the sticks. Aggressive feed forward can reduce setpoint to gyro delay to zero for most inputs, leading the high levels of control and immediacy required by the very best racers. Softer feed forward, including with Feed Forward Transition of 30, can make for a very smooth center feel with quick responses to flick inputs, ideal for modern freestyle or cinematic purposes.

The primary downside of aggressive feed forward is jitter when trying to fly smooth lines. Most radios have some jitter in their signal, many drop packets or send duplicate packets, and we all have some finger/thumb shake. If the quad reacts immediately to the tiniest input, it may 'tremble' or be a bit nervous when it should be in smooth forward flight or during gentle long radius turns.

The needs of the race pilot differ greatly from those of a person wanting super smooth HD footage, so in 4.2 we've put a lot of thought into how best address these differing requirements.

Feed forward depends greatly on the stability of the RC link, and the smoothness of the steps between incoming packets. We strongly recommend that Crossfire users update to the latest CRSF_Shot software (including the update to OpenTx that provides external module sync for CRSF). FrSky Tx users should upgrade to OpenTx 2.3 and disable ADC.

### Mode: ff_interpolate_sp

The most important feed forward parameter is the 'mode' in which feed forward operates, which can be set as follows using the `set ff_interpolate_sp` command in the CLI as follows:

- `OFF`: the older linear interpolation method, with no boost or glitch reduction
- `ON`: the newer setpoint based interpolation mode, with immediate response to every change in RC, with boost and glitch reduction, intended for racing
- `AVERAGED_2`: as above, but with two point moving averaging for glitch reduction and for elimination of alternating up/down FF jitter, but with reduced jitter when flying straight ahead or in smooth arcs. For general purpose use, including racing and modern freestyle (default)
- `AVERAGED_3`: three point moving average glitch reduction, providing strong jitter reduction in smooth arcs or when flying straight ahead. Intended for freestyle with HD cameras. Effectively reduces 3-step (20ms) jitter in locked 150hz Crossfire setups that haven't been upgraded to CRSF shot.
- `AVERAGED_4`: four point moving average smoothing and strongest jitter reduction, best for smooth cinematic HD recordings. Can also be effective in smoothing jittery R9 traces.

### Smoothness: ff_smooth_factor

Next most important is the 'smoothness' factor, which limits the amount of change that any one incoming radio step can make. It acts like an exponential or lowpass type smoothing function. The cli parameter is `ff_smooth_factor`. Default is 37, max is 75.

With`set ff_smooth_factor = 0`, there is no smoothing of outgoing FF steps. The full FF and boost amount for any given incoming RC step will be applied immediately. This is probably what a racer with a clean radio setup would prefer.

At the default of 37, 63% of the incoming feed forward step will be applied immediately. The response is like a first order lowpass filter with a time constant of one RC interval, i.e. a cutoff of (1000 / 2 _ pi _ RCinterval) Hz, or about 24Hz for 6.66ms RC steps. This parameter smooths out sharp steps in the FF signal, reducing some of the jitter component that is common with many radios.

Values above default will provide a smoother FF signal, but may cause so much delay as to make feed forward a bit useless. Not recommended except on perhaps slow cinematic HD rigs.

### Boost: ff_boost

This hasn't changed since 4.1; please read the [4.1 tuning notes](4-1-Tuning-Notes#feed-forward-boost)

To summarise, boost responds to stick acceleration, and helps overcome motor lag with quick stick inputs. It also generates RC jitter and glitch artefact better than anything else. The default settings in 4.2 attempt to strike a good balance.

Default boost is 15, and that works for nearly all quads. Racers may prefer 20. Higher values are likely to cause micro overshoots, jitter and excessive sensitivity on normal quads, but up to 30 may be useful on low authority quads.

### Spike limiting: ff_spike_limit

`ff_spike_limit` provides simple soft clipping method, to chop the tops off large FF spikes. The default should be acceptable for most radios. Most people should leave this value at defaults.

Higher numbers will allow progressively bigger spikes through. Racers or people with clean radios who want full feed forward aggression can increase this value, but should look closely at their feed forward trace to see what happens.

The biggest normal single FF step change that a pilot ever generates is when they suddenly return from full stick deflection, ie on terminating a fast flip. If having the least possible delay at this point is important, maybe try shifting the spike limit higher.

### Overshoot limiting: ff_max_rate_limit

`ff_max_rate_limit` also hasn't changed since 4.1, please read the [4.1 tuning notes ](4-1-Tuning-Notes#feed-forward-limiting).

Leave this at 100.

## RC smoothing improvements

Following extensive testing, the default RC smoothing values were simplified and optimised. Usually no changes from defaults are needed.

The default auto smoothing method will dynamically calculate RC smoothing time constants from the identified RC packet intervals. This works really well with most radio systems and with interpolated feed forward. The default input filter type is `BIQUAD`, it smooths setpoint and P. The derivative filter type is `PT1`, which smooths the sharp corners off the interpolated feed forward trace.

Most pilots should stick with the defaults.

`rc_smoothing_auto_smoothness` sets how 'smooth' the RC traces will be. Higher values result in greater smoothness, but add RC delay. 10 is optimal for most general purpose flying. Racers may prefer 8, or even 5, but will get more jumpy motor traces as a result, often not improving performance much if at all; for old jittery radios, 20 or even 40 may smooth out things a bit.

These are the new default settings:

```
set rc_smoothing_type = FILTER
set rc_smoothing_input_hz = 0
set rc_smoothing_derivative_hz = 0
set rc_smoothing_input_type = BIQUAD
set rc_smoothing_derivative_type = PT1
set rc_smoothing_auto_smoothness = 10
```

## Dynamic D filtering expo

`dyn_lpf_dterm_curve_expo` now makes the D lowpass filter cutoff value rise more quickly with throttle increases than it used to. The rise in D lowpass now starts from the moment the throttle is increased. Values of 5 or above may improve propwash control.

The end-points, `dyn_lpf_dterm_min_hz` and `dyn_lpf_dterm_max_hz`, remain the same, the difference is that we get closer to max more quickly.

- Default is a useful rise (6).
- A value of 1 provides a very gentle curve - nearly linear - from min to max Hz over the full throttle range.
- A value of 6 results in a curved increase with throttle with a more rapid rise from min by mid-throttle.
- The maximum of 10 results in a very quick rise.

For graphs see [PR9486](https://github.com/betaflight/betaflight/pull/9486).

## Dynamic battery sag compensation

This PR applies an initial motor output reduction when the battery is full, and boosts motor output upwards during the flight, to quickly compensate for sagging battery voltage as it happens.

This gives a more consistent stick feel, both for throttle and PID, over the usable battery voltage range, compensating for the usual loss of performance as the battery sags. The quad will not feel super aggressive at the start of a flight, or dull at the end.

It is best enabled with:

```
set vbat_sag_compensation = 100
set vbat_pid_gain = OFF
```

This means '100% compensation for voltage sag'.

**NOTE 1:** The quad must have an on-board battery voltage sensor. It can't be enabled with ESC based serial voltage telemetry, because the voltage values change too slowly.

**NOTE 2:** The older `vbat_pid_gain` method of battery sag compensation should not be used at the same time.

**NOTE 3:** Only use this if you have active battery monitoring via telemetry or OSD!\*\* You will get no loss of 'stick feel' until the battery starts falling below 3.5V.

**NOTE 4:** It won't work in 3D mode.

The code compensates for voltage changes from 4.2V down to the user's configured warning voltage of 3.5V.

A fall from 4.2V to 3.5V is about a 16% reduction in voltage. With 100% compensation, a motor output reduction of about 16% will be applied when the battery is full. As the battery voltage falls, motor output is dynamically boosted back towards normal, canceling out the effect of the sag. Once the battery falls to 3.5V or lower, motor output will be normal, or back to 100%, and no further compensation is possible.

Both throttle and motor limits may need to be adjusted after enabling sag compensation. If you already have a static `motor_output_limit` value below 100, this code further reduces motor output below that value. You may want to lift `motor_output_limit` by about 10 for similar overall performance. If you have a throttle limit, there is usually no need to change it.

To keep a bit more aggression at the start, at the cost of having a bit more 'sag' during the flight, apply less than full compensation, eg 50% compensation is `set vbat_sag_compensation = 50`.

Setting more than 100% compensation can help whoops that sag really badly, but usually isn't needed.

There are two kinds of battery sags:

- Slow falls, over minutes, as the battery loses overall voltage and capacity
- Quick sags due to transient high current loads during throttle blips

To only cover the slow fall, set `vbat_sag_lpf_period` to 200 (20 seconds period, or a time constant of about 3.3 seconds). This **will not** compensate for quick transient drops. High values make sense for slow flyers or cinematic type flying.

To respond quickly, stick with the default `vbat_sag_lpf_period` of 2, or 200ms. This has a time constant of about 33ms, fast enough to respond very quickly to fast throttle blips and quick split-S turn type sags.

Whoops tend to be flown at lower voltages than mini quads, so the warning voltage is often set lower, eg 3.3V. The attenuation range, and the initial maximum motor output suppression value, will be a bit bigger. In this case, slightly reducing the compensation amount, eg to say 80%, will stop it feeling very dull at the start. However, some whoops sag a lot, and on some a value above 100 may be useful to get a constant feeling across the battery range.

No adjustments are required when using HV cells.

Enabling the `BATTERY` debug will show the compensation amounts, as they happen, in the OSD, or in a log.

Battery debug 2 is 'compensationStrength, a value between 0 and 100. Zero means you're at the low end of the battery range, and no further compensation is available. 100 means you've got a fresh battery and your maximum configured compensation is active. It can be used as a simple 0-100 battery status indicator, if you like.

Battery debug 3 carries the actual percentage reduction applied to motor output. A normal value for a full battery would be about 160 (16%). If you were to apply only 50% compensation, your would see only about 8% attenuation when full.

## New Rates modes

We've introduced two new Rates configuration modes, and have updated the Configurator to graphically display the results of all Rates configurations. Using the latest Configurator is essential. Actual rates with zero expo and a low center sensitivity is strongly recommended for cinematic or freestyle flying.

The two new rates modes are named `ACTUAL` and `QUICK`.

They allow direct and completely independent configuration of center stick feel, expo, and max roll rate.

Center stick 'feel' or 'sensitivity' is determined by the angle of the rates curve around the center stick position. In both new methods, this is set directly and not affected by any other rate parameter.

`QUICK` rates retains the traditional rcRate value as used in previous Betaflight versions to set center sensitivity; you can keep the same value you've always used.

`ACTUAL` rates lets you set your target center rate is set in degrees/second. To convert your old rcRate value to degrees/second, multiply it by 200. For example, an rcRate of 1.0 would be entered as a center sensitivity of 200 in `ACTUAL` rates. In `ACTUAL` rates, the center and max numbers have the same units, and are directly comparable in terms of 'how it feels' in the center compared to further out.

In both the new models, expo shifts the curve further out, but doesn't change either the center sensitivity (slope of the RC rate curve at center), or the max rate. Higher expo extends the center rate further out, so the quad won't spin fast until your sticks are a long way out. This is often favoured for freestyle or LOS acro. Lower expo keeps your low-sensitivity range more to the center, and gives you more predictable reactions across the stick travel range once you leave center. This is favoured by racers, with relatively high center sensitivity, and by cinematic HD pilots, who want extremely low center sensitivity without losing too much authority when they bring the sticks further out.

In `ACTUAL` rates, the amount of expo can be reduced below what was previously possible. This is really good for cinematic freestyle, where we want strong softness at center, but a fairly early transition to strong authority.

For LOS acro, high expo in Actual mode gives a more linear stick feel over a wider range, then a sudden increase for high-speed flips only when the sticks are pushed well out.

In `QUICK` rates, expo has a more traditional curve. The different curves can be visualised in Configurator.

Finally, maximum rate now will be unchanged when the user adds deadband.

This online calculator allows [visualisation of Betaflight vs Actual Rates](https://www.desmos.com/calculator/r5pkxlxhtb), making it easy to convert your old rates.
This online calculator helps with [Quick Rates](https://illusionfpv.github.io/).

## Automatic anti-yaw spin configuration

Betaflight 4.2 now defaults to auto configure the `yaw_spin_threshold` to a value a small amount above the maximum configured yaw rate. For most users this will allow yaw spin corrections to activate more quickly after hitting a gate and spinning. Also, a user can now switch profiles from race (low rates) to freestyle (higher rates) to LOS (very high yaw rates) and the `yaw_spin_threshold` will always be appropriate.

The mode configuration is set in the CLI by `yaw_spin_recovery`. This can be `OFF`, `ON`, or `AUTO`, with default to `AUTO`. To manually configure the threshold, choose `ON` and set the value you want in `yaw_spin_threshold`.

We hope that AUTO to be best for all users. More info [here](https://github.com/betaflight/betaflight/pull/9455)

## Antigravity gain independent of I values

Previously, the anti-gravity gain value acted as a multiplier of the PID `I` value. This means that when PID `I` was increased, the strength of the anti-gravity effect also increased, and vice versa. This could lead to I mediated wobbles on rapid changes of throttle if the user increased their PID `I` to high values, or, lead to inadequate anti-gravity effect if the user decreased PID `I`.

In 4.2, the anti-gravity effect is independent of the user's PID `I` value, and is modified by anti-gravity gain alone.

If a user previously ran higher PID `I` values than default, they will need to increase their anti-gravity gain value, and vice versa, if they want the same anti-gravity effect as before. The change should be in proportion to the ratio of their previous I value to the 4.1 and 4.2 default value.

## Improved Dynamic Notch filter

The dynamic notch filter has been extensively revised. It now identifies and tracks peaks more accurately, and over a wider frequency range. Performance will be better on most quads. It will also be more accurate with non-standard gyro rates.

Instead of choosing a range using `AUTO`, `LOW`, `MEDIUM` or `HIGH`, the user now sets the actual maximum frequency that they want the dynamic notch to cover, using `dyn_notch_max_hz`. The dynamic notch will then help control noise between its minimum and maximum frequency values.

The default `dyn_notch_max_hz` value of 600Hz works best for most quads, but can be tweaked. The optimal value depends on whether or not you're using rpm filtering, and the rpm range of the quad.

If you were using `LOW`, `dyn_notch_max_hz` around 350hz should be roughly equivalent. If you were using `HIGH`, probably around 700hz will be enough, I've not seen many quads actually get much higher in rpm that that.

When rpm filtering isn't being used, the dynamic notch needs to cover the full range of possible motor generated frequencies. The value required can be determined accurately by logging with debug GYRO*SCALED and looking at the highest frequency reported in spectral analysis. Alternatively it can be estimated as 70% of the peak theoretical no-load rpm. For example, a 2000KV motor with 6S has no load rpm of 2000 * 6 \_ 4 = 48000 rpm. 70% of that is 33,600rpm, divide by 60 and you get 560hz.

Slow fliers and X-class quads should use `dyn_notch_max_hz` at say 350-400hz, and a lower `dyn_notch_min_hz` than defaults. Lower maximum values will improve resolution over defaults.

With rpm filtering, the motor noise lines usually get removed completely, and the dynamic notch has little to do. In many cases it can be turned off. However, it can be useful for attenuating residual noise or frame resonance. If there is no particular frame resonance, it will sort of hover around the middle of its range. With the defaults, this keeps it out of the way, causing relatively little delay.

If there is a specific resonance at some particular frequency, the min and max values can be centered either side of the resonance line. For example, if you have 150hz resonance, try setting minimum to 100 and max to 200.

No matter how low you set the max value, the value used internally will never be less than twice the minimum value. This is necessary to ensure the code works properly.

The 4.1 tuning guide notes about notch width and Q factor still apply... in short, when using the rpm filter:

```
set dyn_notch_width_percent = 0
set dyn_notch_q = 250
```

And this restores the default values for use without RPM filtering

```
set dyn_notch_width_percent = 8
set dyn_notch_q = 120
```

## Iterm Relax works properly in setpoint mode

There was a bug in 4.0 and 4.1 that affected of iterm relax setpoint mode. Setpoint mode worked fine with defaults, but changing the `iterm_relax_cutoff` had almost no effect. Gyro mode of iterm_relax was not affected.

That's why bounce back seemed to be better controlled by lowering `iterm_relax_cutoff` in gyro mode only. Now, setpoint mode works correctly for all `iterm_relax_cutoff` values.

We recommend that most users go back to setpoint mode in 4.2.

When tuning `iterm_relax_cutoff`, to reduce I mediated bounce back after a flip or roll, aim for highest value consistent with adequate bounce back control.

To be sure that bounce-back in a freestyle quad is I related, and not due to something else, temporarily set `iterm_relax_cutoff` to a high value, eg 40, and make a test flight. If the bounce-back definitely worsens, reduce the `iterm_relax_cutoff` value until it is adequately controlled.

For most GoPro carrying modern freestyle quads, lowering `iterm_relax_cutoff` to around 10 should be enough. For 7" builds perhaps 5-7. X Class may need 5 or less.

## NFE Race Mode

This feature is active only in self-levelling modes.

When active, the self-levelling occurs only on the Roll axis. The Pitch axis behaves like it is in acro mode.

To enable, use this CLI command `set level_race_mode = ON`.

## OSD improvements

Your custom logo can now appear each time you arm.
Show it on race days :-) with `set osd_logo_on_arming = ON`
Options are OFF, ON, FIRST_ARMING.

CRSF link quality now displayed as A:BB where A is the RF mode (2=150hz, 1 = 50hz), and BB is link quality.
This change allows link quality alarms to work properly.

The following new elements have been added to the OSD:

- camera frame (#9261)
- distance from home alarm, blinks the distance. NB: distance is in metres. (#8862)
- efficiency in mAh/km or mAh/mi (#9601)

## Configurator improvements

The RC Rates configuration tab now fully supports graphical display of the shape of the curve for all supported rates method, with cool icons.

The P:D balance slider now changes D, not P, making it easier to test out how small changes in D.

Dynamic idle can be enabled and adjusted via the PIDs tab.

When Dmin is enabled, the D column is re-named to Dmax to better indicate what it does.

Yaw P changes in the same way as pitch and roll. The default is a little higher.

---

---

Credits:

- Looptime, scheduler, RC timing - eTracer
- RC smoothing - eTracer and ctzsnooze
- Interpolated setpoint, feed forward improvements - JoeLucid and ctzsnooze
- Dynamic notch improvements - ctzsnooze
- Expo on DLPF, independent anti-gravity gain - IllusionFPV
- Quick rates method - IllusionFPV
- Actual rates method - ctzsnooze
- Rates models configurables - fgiudice98
- Battery sag compensation - ctzsnooze
- Auto yaw spin threshold - eTracer and ctzsnooze
- NFE Race mode port - Phobos, NotFastEnuf
- OSD Logo on arming, distance from home - eTracer
- OSD battery efficiency - DavidBoone
- H7 and G4 mcu implementation - jflyper
- Configurator brilliance - mikeller, McGiverGim, Asizon
- LUA Script - klutvott123

Bugfixes - eTracer, jFlyper, mikeller, many, many others

Keeping everyone and everything on track - mikeller

Encouragement and testing - bizmar, iCr4sh, SugarK, BigRuss, BMSThomas, many others : thank you!

---
sidebar_position: 13
---

# Betaflight 4.0 Tuning Notes

- [RPM controlled multiple dynamic notch filtering over bi-directional DShot](/docs/wiki/guides/current/DSHOT-RPM-Filtering), to markedly improve motor noise suppression, reducing filter delay time
- [Launch Control](/docs/wiki/guides/current/Launch-Control), allows a pilot to hold a specified angle precisely and accurately for the perfect race launch
- [D_min](/docs/wiki/guides/current/DMIN), which dynamically adjusts the PID D parameter according to stick movement
- [Dynamic lowpass filtering](#dynamic-lowpass-filtering), to improve noise control at low rpm and reduce filter delay time at high rpm
- [Improved dynamic notch code](#improved-dynamic-notch-code), with better tracking and better noise rejection with less delay,
- [D-only TPA](#d-only-tpa), to selectively reduce D related noise at high throttle and maintain normal P responsiveness
- [Integrated yaw](/docs/wiki/guides/current/Integrated-Yaw), an experimental option which mathematically integrates the yaw PID values, potentially simplifying yaw tuning
- [Improved setpoint mode iterm_relax](#improved-setpoint-mode-iterm_relax), intended to improve turn accuracy during spirals and slaloms - for racers
- [Transient throttle limit](#transient-throttle-limit), which improves noise behavior at low and high throttle by preventing reflected noise from doubling up and becoming distorted
- [Improved yaw PIDs](#improved-yaw-pids), with a better understanding of how to tune yaw
- [Improved dynamic notch code](#improved-dynamic-notch-code) has been improved to better track and suppress motor noise with less delay, using two closely spaced, narrower notches

Other flight-related changes include:

- Absolute control has been improved but is not enabled by default. It can produce some wobbles if not tuned right.
- Iterm_rotation is disabled by default
- PID defaults have been changed slightly

:::warning
Set 4.0 up from scratch!
DO NOT PASTE OLD DUMPS INTO THE CLI!
:::

:::caution
4.0 is sensitive to high P and D values!
The defaults are OK for a normal 4S 2400-2600kV 5" quad. For high thrust to weight ratio quads, eg 6S or ultralight builds, cut all the PID values by at least a third for your first flights.
:::

### What should I notice if I fly defaults?

- Cooler motors
- Similar propwash at low rpm, improved propwash control when throttle is maintained through turns
- A wider tuning envelope across a range of different types of quads.
- Greater precision in tight, fast turns
- A 'smoother' feel and cleaner sound to the motors

### I'm a freestyle pilot, what should I paste into the CLI?

The goal is smoothness. Using your old PID's is fine, set D_MIN to about 75% of your previous D value, and take a bit off your old P and D values.

**Warning**: default PIDs assume the slightly heavy 4S type freestyle quads (heavy GoPro, heavy battery). If used with 6S quads or lighter weight freestyle quads, cut the PIDs by about a third before trying to take off. It may otherwise shake and head to the moon!

If starting from defaults, on a normal 4S freestyle quad, try:

```
set dterm_lowpass2_type = PT1
set dterm_lowpass2_hz = 200
set feedforward_transition = 30
set iterm_relax_type = gyro
set iterm_relax_cutoff = 10
set transient_throttle_limit = 15
set i_pitch = 85
set i_roll = 80
set d_min_roll = 25
set d_min_pitch = 28
set d_min_boost_gain = 30
set d_min_advance = 50
set d_pitch = 38
set d_roll = 30
set tpa_rate = 50
set tpa_breakpoint = 1500
set tpa_mode = D
set p_yaw = 35
set i_yaw = 100
set d_yaw = 0
set f_yaw = 35
set iterm_rotation = OFF
```

### My freestyle quad has a single slow bounce-back after a flip...

This is usually caused by the `iterm_relax_cutoff` value being too high for your quad. Test by increasing the value in the CLI to confirm that a higher value makes it worse, then try progressively lower values until it no longer bothers you. The optimal value is the highest value that doesn't give you the bounce-back. If it's a freestyle quad, also `set iterm_relax_type = gyro`, which prolongs the I inhibition and is better for freestyle quads with this particular issue. The snippet above should be sufficient for most freestyle machines.

The downside of using gyro type iterm_relax, and low cutoff values, is that the quad will tend to run wide and not keep a clean turn radius during very tight sustained turns, eg pirouettes around trees etc. This isn't usually an issue for cruisy freestyle flying, but is a big problem for race pilots or people who push the freestyle envelope a bit. Race pilots usually prefer setpoint with the cutoff at 30-35, and accept some bounce back.

The defaults are a bit of a compromise; use the snippets as starting points.

### I'm more of a race pilot... or 6S/lightweight responsive machines

Here the goal is responsiveness, lots of I, the least D possible to better handle bent props, with propwash and flip control of lesser importance.

```
set dterm_lowpass2_type = BIQUAD
set dterm_lowpass2_hz = 150
set feedforward_transition = 0
set iterm_relax_type = setpoint
set iterm_relax_cutoff = 35
set transient_throttle_limit = 10
set p_pitch = 30
set p_roll = 28
set i_pitch = 90
set i_roll = 84
set d_pitch = 27
set d_min_pitch = 18
set d_roll = 25
set d_min_roll = 16
set d_min_boost_gain = 27
set d_min_advance = 0
set f_pitch = 90
set f_roll = 84
set tpa_rate = 75
set tpa_breakpoint = 1400
set tpa_mode = D
set p_yaw = 30
set i_yaw = 90
set d_yaw = 0
set f_yaw = 30
set iterm_rotation = OFF
set thrust_linear = 0
```

### Help! It just took off straight up when I armed!

This is hypersensitivity to D that has as the underlying cause either flexy arms, high power to weight ratio, faulty gyros or other prop/frame resonance issues.
For 6S quads you should first cut PIDs by about a third.
The settings below **cut D a lot and P a bit, and filter D a bit more strongly lower down**. They may get you in the air without drama, from which point you can sort out the underlying problem/s:

```
set d_min_roll = 14
set d_roll = 20
set d_min_pitch = 15
set d_pitch = 22
set d_min_boost_gain = 20
set tpa_rate = 75
set tpa_breakpoint = 1400
set tpa_mode = D
set p_roll = 30
set p_pitch = 30
set d_yaw = 0
set dterm_lowpass2_type = PT1
set dterm_lowpass2_hz = 100
```

#3# I'm flying large props - 7" or bigger to X class

Betaflight 4.0 filter settings will typically be too high for quads with larger props. Try the following, which allows the dynamic notches and low passes to go low enough for these lower rpm setups:

```
set dyn_lpf_gyro_min_hz = 70
set dyn_lpf_gyro_max_hz = 350
set dyn_notch_range = LOW
set iterm_relax_type = gyro
set iterm_relax_cutoff = 7
set dyn_notch_min_hz = 100
set dyn_lpf_dterm_min_hz = 70
set dyn_lpf_dterm_max_hz = 150
set dterm_lowpass2_hz = 120
set d_yaw = 0
```

Sometimes prop / arm resonance requires a fixed D notch as well, but usually not. RPM based multiple notch filtering should be great for these machines.

### I've already got a perfect tune on 3.5, I just want it to fly the same

The snippet below configures the 4.0 filtering to match 3.5. Provided you have a really good tune in 3.5, these settings should have your quad flying almost exactly the same in 4.0. Latency will be slightly reduced at higher rpm and motors may be a little bit cooler, but overall it should be much the same. Try these settings if you're having trouble getting a good result in 4.0 and know it was good in 3.5.

Do not just paste a 3.5 diff or dump into 4.0!

**YAW** I-term is 2.5x stronger in 4.0. To exactly match 3.5 PIDs, the 3.5 I value for Yaw should be divided by 2.5.

```
set gyro_lowpass_type = PT1
set gyro_lowpass_hz = 300
set gyro_lowpass2_type = PT1
set gyro_lowpass2_hz = 100

set dyn_lpf_gyro_min_hz = 300
set dyn_lpf_gyro_max_hz = 450

set gyro_notch1_hz = 0
set gyro_notch1_cutoff = 0
set gyro_notch2_hz = 0
set gyro_notch2_cutoff = 0

set dyn_notch_range = AUTO
set dyn_notch_width_percent = 0
set dyn_notch_q = 70
set dyn_notch_min_hz = 130

set dterm_lowpass_type = PT1
set dterm_lowpass_hz = 200
set dterm_lowpass2_type = PT1
set dterm_lowpass2_hz = 100

set dyn_lpf_dterm_min_hz = 200
set dyn_lpf_dterm_max_hz = 250

set dterm_notch_hz = 0
set dterm_notch_cutoff = 0

set d_min_roll = 0
set d_min_pitch = 0
set d_min_yaw = 0

set abs_control_gain = 0
set use_integrated_yaw = OFF
set d_yaw = 0
```

## Tuning 4.0 for propwash minimisation

The short answer is:

- fly smoother lines
- keep throttle on during turns
- more D (increase D itself, d_min, d_min_gain, some or all of those)
- reduce filter delay
- greater turn authority / responsiveness
- sometimes add a bit more P

The long answer is more complex:

Propwash happens when, after throttling down and turning very fast, the pilot then throttles up, and the quad falls backwards/downwards into dirty air. Reversed airflow generates tip vortexes that greatly reduce thrust. 'Dirty' air is turbulent and may buffet the quad as we fly out through it.

Whenever we cut throttle in a 180 reversal, any motors that start at zero throttle will be much slower to spin up than the others, leading to very unequal thrust development, crosstalk between axes, secondary PID reactions, and worsening the instability. Hence the need to always keep throttle on during propwash, avoid dropping to zero as much as possible.

The end result is highly non-linear motor responses, rendering normal PID control relatively ineffective.

The best solution for propwash is flying style. A good pilot can fly a quad with terrible propwash so smoothly that it looks perfect. The key piloting factors are:

- **keep the props moving forward in clean air**
- **avoid sharp 180 degree flight reversals**
- **keep some throttle on at all times**
- _never cut throttle to zero_ (except during flips, inverted drops and the like)
- fly smooth arcing turns

During propwash, the quad shakes at relatively low frequencies that are easily seen in video, eg 20-30hz. These shakes cannot be filtered out. Quads that deal best with propwash have the following characteristics:

- able to rapidly change thrust on demand, ie high turn authority, from:
  -- higher cell count, eg 6S is better than 4S
  -- lighter, easily spun props (don't over-prop)
- heavier center mass (more stable)
- battery on top (less wobble momentum)

From the software perspective:

- _minimise filter delay_ (warning: less filter delay = less noise filtering = hotter motors)
- _more D is usually better_ (lots of D can cause hotter motors)
  -- D_min is the parameter to increase, and/or d_min_gain
- there is a 'sweet spot' for P, neither too low nor too high = experiment
- improving PID responsiveness at very low rpm can be useful on some quads (thrust linear)
- _D_min will only make propwash worse, not better_

  4.0 has been focused on stronger low rpm filtering to avoid jello on HD setups and to keep motors cool. Compared to 3.5, it has less high rpm filter delay, but more low rpm filter delay.

**In 4.0, D is running at a much lower value - the D_min value - most of the time**. The `D_min` value is active when you are flying smoothly. D_min will only rise to the normal D value during active stick inputs. D will also rise some of the way towards the full D value during propwash events, but not completely. From a propwash perspective, the D_Min value is more important than the D value.

Note that although the default 'max' D value is higher in 4.0, this value is only active during flips and rolls and other quick inputs. Hence for propwash, which typically happens at low stick inputs, d_min is what matters most.

Overall, in 4.0, propwash is typically less than 3.5 if throttle is sustained, especially above one-third to one-half throttle. Pilots who drop throttle to zero and fly with reverse 180's are likely to get more propwash in 4.0 than 3.5, but pilots who keep throttle up during turns are likely to find it better.

If you find that 4.0 has more propwash than before, these are the kinds of changes that may help:

- use a D value from your old tune, plus about 20%
- set D_mins to 20% below the D values from your old tune (get min and max D closer together)
- increase d_min_boost_gain say to 30

Once D is as good as you can get it,

- try higher or lower P to find the optimal P value
- try adding some thrust_linear (10-20 on a 5", and look out for wobbles on idle)
- to reduce filter delay, move the filter minimums a bit higher, carefully.

Now to filtering.

The default minimum filter minimums are all around 150hz. eg:

- `dyn_lpf_gyro_min_hz`, the dynamic gyro lowpass minimum
- `dyn_notch_min_hz`, the dynamic notch minimum
- `dyn_lpf_dterm_min_hz`, the dynamic D minimum, and
- `dterm_lowpass_hz`, the second D lowpass (not a dynamic, but also can go up)

_If the motors are cool, try increasing all those values say to 170, say, and fly again_. Pushing them higher should be done slowly, in small steps, cautiously. Note that on a typical 5", 250hz equals mid-throttle rpm. Be aware that the higher you go, the more likely the quad is to burn your motors if you fly with a bent prop or as your motors get bearing wobble. Carefully check motor temps on moving these filter values. You may also find that jello suddenly gets worse, or that motor temps abruptly get worse, as you increase these values.

RPM based filtering is likely to give less delay and should be considered. Note that this is still experimental at this point.

Be aware that the root cause of propwash is flight style. Of the technical causes, the biggest factor, by far, is the delay arising from motor/prop thrust generation delay. Only 10% of the problem is filter delay related. Even if there was zero filter delay, there would still be propwash. Most people will notice some improvement in propwash by lifting D, increasing D_min and pushing the filters higher, or turning some off. At some point, however, the 'returns' get less and less, and the risks of burning motors, and lost power, efficiency, and flight time, get greater. Everybody's situation will be slightly different, and the optimal compromise depends very much on what is most important to us, and what we want to use the quad for.

## Dynamic lowpass filtering

### Introduction

Stick inputs for a quadcopter, and the required motor responses, all happen at low frequencies, typically less than 50 times a second (50hz). However the noise generated by the motors extends well above 500Hz, and can be 'louder' than our stick inputs. This noise is detected by the gyros, amplified by the PIDs, D in particular, and fed back to the motors. Since the motors cannot spin as quickly as the noise frequencies, the electricity going backwards and forwards from noise just generates heat. The goal with filtering is to remove the noise and ensure the motors are sent only noise-free clean inputs.

All filters induce some delay, and the greater the delay, the greater the tendency for the quad to oscillate in propwash worse and dulling handling.

The challenge with filtering is to remove as much noise as possible above the cutoff frequency, retain as much signal as possible below the cutoff frequency, and cause the least delay. But all filters add delay, and the stronger the filtering, the greater the delay.

Most noise arises from the rotation of each motor, which shakes the frame a little bit every rotation. This generates an rpm-dependent noise signal at the fundamental frequency of the motor (rpm \* 60 in hz), and secondary integral multiples of that frequency (harmonics). All propeller blades also have natural resonant frequencies, and can abruptly and suddenly generate bad oscillations at their resonant frequency when it matches the motor rotation frequency. All this noise is directly related to motor rpm. Although there is some non-rpm related broad band random noise from air turbulence and bearing rattle, the vast majority of the noise is directly rpm related.

Using bi-directional DShot, and a BLHeli32 ESC with suitable code, the new [betaflight rpm notch filters](/docs/wiki/guides/current/DSHOT-RPM-Filtering) identify the fundamental and harmonic frequencies of every motor, and target the related noise peaks with very narrow notch filters that almost totally remove motor-frequency-related noise. Usually less filtering is required, resulting in about half to two-thirds the filter delay of 'standard' filtering. credit: JoeLucid.

For those of us who can't use rpm filtering, the dynamic notch and the lowpass filtering have been improved so that both work better and with less delay.

### Changes to noise filtering in 4.0

Betaflight 4.0 now provides a means to smoothly shift the lowpass filter cutoff to a higher value at full throttle, compared to low throttle. The cutoff frequency assigned to the first gyro and D lowpass filter now dynamically increases, with increasing throttle, along a curve that effectively emulates motor rpm. This reduces delay at higher throttle, and allows the dynamic notch to better track the motor peak.

At low throttle the dynamic notch can now go lower than before, to assist with removal of fundamental motor oscillations that sometimes cause jello on freestyle quads. The new dynamic lowpass defaults let the dynamic notch can now track motor noise more precisely and over a wider range of frequencies, and clean up noise above the motor fundamental frequency much more cleanly than before.

Delay, and propwash, may be no better than 3.4 at low rpm, but typically is significantly improved at higher rpm. Noise suppression across the board will be signficiantly improved.

### Enabling / disabling dynamic lowpass filtering

The dynamic lowpass filter min and max values are configured independently of the classical static gyro lowpass 1 value. When active, the dynamic lowpass filter settings override the value of the static lowpass 1 filter. The static lowpass 2 filter, and the static notch filters, remain available and work as before.

Not all boards have the flash size to support dynamic lowpass filtering; if your board doesn't show CLI entries for `dyn_lpf_gyro_min_hz` and the like, it's not supported.

Dynamic lowpass filtering becomes active, and the static lowpass 1 value is ignored, when the dynamic maximum is greater than the dynamic minimum, and when the dynamic minimum is greater than zero.

For example, these settings will ignore the value in `gyro_lowpass_hz` and enable dynamic lowpass filtering with a minimum of 150 and maximum of 600hz:

```
set dyn_lpf_gyro_min_hz = 150
set dyn_lpf_gyro_max_hz = 600
```

The following will disable dynamic lowpass filtering and return the quad to a static lowpass at whatever value is set in `gyro_lowpass_hz`:

```
set dyn_lpf_gyro_min_hz = 0
set dyn_lpf_gyro_max_hz = 600
```

Dynamic lowpass filtering works best when configured as a biquad. That single dynamic biquad will provide all the filtering done previously by both static PT1's of 3.5. Typically static secondary gyro lowpass 2 filter, and no static notches, are required. It is strongly recommended to use defaults for the lowpass filtering in 4.0.

### Dynamic lowpass filter settings

`dyn_lpf_gyro_min_hz ` sets the lowest frequency below which the dynamic lowpass filter cannot pass. It doesn't shift the throttle to cutoff curve upwards, rather it puts a 'floor' below which the cutoff cannot go as rpm falls.

`dyn_lpf_gyro_max_hz`, sets the highest frequency the lowpass can rise to, following a smooth curve from zero throttle. Ideally `dyn_lpf_gyro_max_hz` should be set close to the quad's actual max rpm in hz. For a typical 5" this is about 450-500hz, equivalent to 27,000 to 30,000 rpm. Smaller props typically rev faster, eg 600-650hz for 3"-4", and larger quads rev slower, eg 300-350hz. Max frequency can be determined by displaying an rpm debug in the OSD as you fly, or making a log and performing blackbox or plasmatree analysis. Displaying the max value in the stats screen after disarming can be enabled via `set osd_stat_max_fft = ON`, make sure to set `dyn_lpf_gyro_max_hz` to at least 610 however as otherwise the dynamic notch will not be able to go high enough and the max FFT reading will be bogus.

If on full throttle, the dynamic lowpass doesn't go high enough, it attenuates the motor peak so much that the dynamic notch FFT can't track the motor peak properly, which makes for worse noise overall. Likewise, if the lowpass doesn't go low enough, the FFT may jump up to the first harmonic, leaving a large fundamental frequency to get through. Logging with `set debug_mode = DYN_LPF` will show the center frequency of the FFT that drives the dynamic notch (recorded into debug 0). The FFT value should smoothly track the motor frequency from low to high. If the FFT cannot stay stable on the high throttle motor peak, dyn_lpf_gyro_max_hz might be able to go a bit higher. If the FFT jumps around a lot at low throttle, you can help it track the primary motor peak better by adjusting dyn_lpf_gyro_min_hz.

Betaflight 4.0 uses a single dynamic biquad lowpass on gyro by default, rather than the two fixed PT1's of 3.5, because the biquad has a cleaner pass-band and much steeper cut above the cutoff point. It very effectively attenuates all noise above the anticipated motor peak and allows the dynamic notch to remove that. The end result should be very clean noise spectrum, with the fundamental motor peak, the harmonics, and most ordinary noise removed. Delay is about the same as 3.5 at low rpm but reduced above mid rpm. The default settings pass a lot more gyro data through below cutoff than in 3.5, leading to sharper responses generally, but particularly so at higher rpm.

### Dynamic D filtering

The same dynamic approach is used on D, but in a slightly different way.

D actively amplifies higher frequency noise, but we need as much D as possible to help control un-commanded events like overshoot and propwash. Propwash happens in a range around 30-80hz on a well-tuned quad. So we need as much D as possible up to 100hz, and as little as possible above that. At the same time, delay on D really reduces its effectiveness, so we want the least D delay possible. This is almost an impossible challenge!

After extensive emulation, we found that the default 4.0 biquad dynamic lowpass settings provide the best outcome. We filter D quite hard, with a dynamic biquad lowpass ranging from 150 - 250hz, and a second fixed static lowpass higher up at 250hz. This setup maximizes D at propwash frequencies around 40-80hz and attenuates D hard above that point. This is the main reason for the cool motors seen with betaflight 4.0, despite functionally less gyro filtering. The second static D filter doesn't absolutely have to be a biquad, a PT1 works well and is preferred if the quad is fairly clean and there's not a lot of high-frequency D noise.

The first dynamic D lowpass filter should always be left as a biquad.

### Tuning the dynamic lowpass filters

Making sensible changes to these complex filters isn't easy. A blackbox log in `set debug_mode = FFT_FREQ` mode is the only practical way. We need to check that the FFT is tracking well, analyze the amount of noise and its frequency content at different throttle points, think about where it might be coming from, and how best to deal with it. PID-Analyzer and the Blackbox spectrum analyzer are two very useful tools.

In principle:

- set dyn_lpf_gyro_max_hz to your approximate maximum motor rpm expressed in hz
- set dyn_lpf_gyro_min_hz no higher than 200hz in practice, varying it up and down depending on motor temps at low throttle
- if motors are warm and bearings not so good, add a static PT1 filter on gyro
- always retain the dynamic biquad on D, and only cautiously move the minimum higher, or you may suddenly get very hot motors if the D cut point is high enough that it cannot control prop resonance
- the second static lowpass on D is very useful; only move it higher if a log shows not much D noise up high.

In practice: just stick with the defaults; if the motors are cool, bring all filters up by about the same percentage, leaving the dynamic maximum for gyro always around the max rpm.

credit: ctzsnooze, iCr4sh, gvhLaw and the skunkworks team

## Improved dynamic notch code

The FFT based dynamic notch we've been using cannot track every motor individually. The FFT algorithm gives us only one single notch frequency to suppress, even if the motors diverge and make noise on multiple slightly different frequencies. The 3.5 dynamic notch had a Q factor of 0.7 (70 in CLI), which was very wide, resulting in significant filter delay when low.

During the 4.0 development period, we found that two, closely spaced, narrower notches, would achieve better noise results with less delay, than one single wider notch.

The value `dyn_notch_width_percent` sets how far apart, in percentage either side of the center frequency, these paired notches will be. The `dyn_notch_q` factor of 120 sets them to almost half the width of the dynamic notch in 3.5.

For clean quads, or where filter delay is critical, setting `dyn_notch_width_percent` to 0 runs only one single narrow notch. Motor temperatures are likely to be higher, but filter delay, and probably propwash, will be less. This is not recommended for normal quads but can be helpful on high-performance machines that are flown smoothly with clean props. Another approach for clean quads flown smoothly is to narrow the percentage width and increase the Q factor. For instance, setting width to 4% and Q to 200 results in a very narrow notch with much less delay.

Conversely, if the quad is to be flown aggressively with motor speeds all over the place, and if it is noisy, the width percentage can be increased and the Q factor reduced. Any changes should be proportional, eg if the width is increased by a factor of 50%, the Q factor should be 50% lower also, to avoid a big 'gap in the middle' between the pair of notches.

The dynamic notch has three frequency ranges in which it can operate, `LOW`, `MEDIUM` and `HIGH`. An `AUTO` option selects the range depending on the value of `dyn_lpf_gyro_max_hz`, as follows:

- When `dyn_lpf_gyro_max_hz` is set to zero (disabled), or below 334hz, `LOW` is selected.
- When `dyn_lpf_gyro_max_hz` is set from 334 to 610hz, `MEDIUM` is selected.
- When `dyn_lpf_gyro_max_hz` is set above 610hz, `HIGH` is selected.

The approximate real world frequency ranges of these modes are:

- LOW: 80-330hz (best for lower revving machines, or when low frequency resonance is an issue)
- MEDIUM: 140-550hz (well suited to 5" quads)
- HIGH: 230-800hz (for very high revving 2.5 - 3" quads)

In addition, 4.0 provides a `dyn_notch_min_hz` value below which the dynamic notch cannot go, regardless of the selected range. The default of 150hz. To hit 100hz resonance peaks, the `LOW` range option must be active, and `dyn_notch_min_hz` must be set below 100hz, eg 80hz. This may be useful to avoid jello on some quads. Targeting resonance much below 80hz is unlikely to be successful with the dynamic notch, a fixed notch probably will need to be used.

Without rpm filtering, `dyn_lpf_gyro_max_hz` should be set to that frequency expressed in hz, and if the mode is left in `AUTO`, an appropriate range will be automatically selected. The user can override this by manually choosing the range. It should be high enough to include the maximum motor rpm frequency. The defaults work well with most mini quads.

When rpm filtering is active, the dynamic notch and the dynamic lowpass don't need to track and remove motor noise. Typically only one fixed 250hz PT1 gyro lowpass filter is required to remove the small amount of residual high frequency noise once the motor noise is removed by the rpm notches. To disable the first gyro lowpass, `gyro_lowpass_hz` must be zero, and `dyn_lpf_gyro_max_hz` must also be zero. As noted before, if the dynamic lowpass mode is `AUTO`, and `dyn_lpf_gyro_max_hz` is zero, the dynamic notch will be forced into `LOW` mode automatically. If the dynamic notch range needs to range higher than `LOW` mode's upper limit of 330hz, the dynamic notch mode must be manually set to either `MEDIUM` or `HIGH`.

Typically, in rpm mode, the rpm filter removes the motor noise very effectively, allowing the dynamic filter to deal with frame resonances, which are not uncommon in well used quads.

Very clean quads often don't have significant resonant noise peaks, and won't need or benefit from having the dynamic notch active. Turning the dynamic notch off saves CPU usage and reduces overall filter delay.

The only way to know if you do, or don't, have resonant noise peaks, is to perform spectral analysis of a blackbox log using PID Toolbox or equivalent. The log should be recorded with dynamic notch off with `set debug_mode = gyro_scaled` so the incoming gyro noise picture, resonance and all, can be clearly seen.

If resonant peaks are present, and you want to configure the dynamic notch to deal with them, but otherwise stop it going low and adding delay, choose the highest range that includes the resonant peak line, and set `dyn_notch_min_hz` to about 10% below that peak. Some examples:

- for a single resonant peak at 300hz: `LOW` range with `dyn_notch_min_hz` at 270hz,
- for a single resonant peak at 400hz, choose `MEDIUM` with `dyn_notch_min_hz` at 370hz,
- for a low frequency resonant peak of 100hz, choose `LOW` with `dyn_notch_min_hz` at 80hz.

If the resonance peak is narrow, a highish Q value (120 to 200) with width = 0 will minimise delay.

When the dynamic notch tracks into very low frequencies, its associated delay becomes significant, particularly if Q is wide. Sometimes for very low, very fixed frequency resonances, a single fixed notch can be a better solution. Certainly that is the only way to deal with resonant peaks below about 70hz.

The 3.4 dynamic notch was a single Q=0.7 notch that moved in a relative frequency band between about 220hz and 300hz. The 4.0 notch can be similarly configured if desired, but it won't work as well as the default settings.

Tuning the dynamic notch is best done with the aid of logging.

credit: iCr4sh, ctzsnooze, the skunkworks team

## D Only TPA

Throttle PID Attenuation (TPA) has been around a long time. It attenuates the PIDs linearly start at the threshold throttle value, reaching the set percentage attenuation at full throttle. The original purpose was to reduce wobble on full throttle in highly tuned quads. I was removed from TPA around 2.9, and since then TPA operated on both P and D. In 3.5, D was split into D and FF, and we then started wondering about what TPA should do to those individual factors. We noted that D mediated noise was often much worse at high throttle, and, a bit to our surprise, that we could cut D as much as 70-80% D cut on full throttle without P wobbles. By not attenuating P or FF with throttle, TPA on D alone maintain stick responsiveness at high throttle, and markedly reduce full-throttle noise and motor heat.

Hence, TPA has been configured by default to be active only on D in 4.0. These are my current settings:

```
set tpa_rate = 75
set tpa_breakpoint = 1400
set tpa_mode = D
```

To return TPA to classic P and D attenuation, as in 3.5 and earlier, paste into the CLI:

```
set tpa_rate = 10
set tpa_breakpoint = 1650
set tpa_mode = PD
```

Typically a freestyle quad might use less 'TPA on D' and a race quad say 75% from 1400.

Credit: ctzsnooze and the skunkworks team, eTracer

## Improved setpoint mode iterm_relax

`iterm_relax` cuts the rate of growth of I during very fast moves. This reduces I related bounce-back or overshoot after fast inputs. We now use high I values on pitch and roll to enhance stability on windy days, so setting iterm_relax properly is more important than before.

The `iterm_relax_cutoff` frequency determines how quickly iterm relax will start, and how quickly it will unwind. For racing we want quick, responsive I accumulation, with faster release, so that I will be sustained and strong in very tight turns, yet release quickly. This will help the quad hold the set radius in tight, fast spiral turns or slaloms. We would set the cutoff to higher frequencies, eg 30-40hz. Higher frequencies suit more responsive machines and tracks with many sustained turns. The downside of setpoint mode with high cutoff values is that there probably will be some I mediated overshoot with flips and rolls, but that's not usually a concern while racing.

The more freestyle / LOS oriented `GYRO` type of `iterm_relax` has not changed. It comes on a bit later and lasts longer, controlling bounce-back after hard flips and rolls better than setpoint mode. In gyro mode, `iterm_relax_cutoff` should be set according to the authority of the quad. 20hz is good for a reasonably strong 5" freestyle setup, 10hz for a 6" or lower authority machine, and 5hz for larger props and heavier machines. Gyro mode with excessively low cutoff frequencies aren't ideal for racing, or very tight spiral turns around flags or gates, because the quad will become a bit unpredictable in how it handles tight turns.

Credit: ctzsnooze

## Transient throttle limit

When airmode is active, if any single motor trace would exceed either 0 or 100%, airmode will automatically adjust throttle to maintain motor differential. For example, if the flight controller required a 40% motor differential to make a turn, but at low throttle, this would need one motor to go 10% below zero, airmode will increase throttle by by 10%, retaining normal responsiveness.

Airmode works great like that, at low and high throttle. But, if there are noise spikes superimposed on any one motor trace, big enough to make that motor to exceed 100%, airmode will cut the peaks off the noise and 'reflect' the chopped off spikes into the other three motors, upside down. This causes sharp downing spikes on the other motor signals and harsh digital clipping of the 'overshooting' motor signal. Which adds to the frequency content and amount of the noise. That's the last thing you want on full throttle.

This is a problem at both ends of the throttle range, contributing to hot motors on full throttle, and bad grinding noises or instability on arming.

By measuring the amount of noise in the motor signals, an additional throttle lift (or cut) can be dynamically provided, based on the magnitude of the noise, and hence only as much as needed, to stop the noise reflection problem.

There is one CLI adjustment, `transient_throttle_limit`, which sets the maximum amount of throttle boost or cut allowed in percent. 15% is quite generous and rarely needed in most quads. As far as I know, there's no downside to having it this high under normal conditions. Having it set this high may, however, help you fly home with a bent prop and not cook the motors.

credit: JoeLucid

## Improved yaw PIDs

:::note
The following notes apply ONLY to un-integrated yaw configuration! If you're flying [integrated yaw](/docs/wiki/guides/current/Integrated-Yaw), the tuning process is completely different!
:::

Yaw is primarily driven by the rate of acceleration of the motor, especially at lower rpm. As the motors accelerate, a counter-force is applied to the frame. This gives instant, un-delayed yaw acceleration. The driving force for yaw from acceleration is greater the higher the rate of change of rpm, and is greater with heavier motors and props. Acceleration is reduced linearly by motor/arm inertial mass and the square of arm length. Acceleration-driven yaw rate of change can be very quick, since changes in motor acceleration are near-instant.

At higher rpm a simple rpm dependent air-drag yaw factor becomes relevant and sustains the yaw at a steady rate.

This is very different from pitch and roll, where thrust is basically linearly related to rpm, and is always a bit delayed since it takes a while to change rpm. And our standard PID controller assumes a linear relationship between rpm and thrust, which is very definitely not the case with yaw.

Hence tuning yaw for optimal performance using classical PIDs is very different from pitch and roll. That's why JoeLucid developed the experimental integrated yaw concept, which is intended to permit a more traditional method of tuning yaw.

When tuning classical PIDs on yaw, keep these things in mind:

- D must always be zero. Non-zero D values are unhelpful and cause oscillation.

- `iterm_relax` should not be enabled on yaw; it should be `set iterm_relax = RP`

- P provides rapid changes to motor signals but rarely overshoots. P is a quick responder to stick inputs, and also responds quickly to overshoots, wind shear, collisions etc. The main problem with P on yaw is that it readily generates noise on the yaw axis, and yaw oscillation from P is quite common, both of which limit how much P can be used. Typically it's not a great plan to use more than 35 of yaw P on a standard quad.

- FF acts very much like P, in that it adds push to stick inputs. But that's all it does. It does not add noise to the motor traces, and it does not stabilize the quad against un-commanded inputs. Adding FF reduces reliance on P and I during yaw spin initiation. Too much FF will cause a fast overshoot at peak input rate, and sudden under-shoot the moment the sticks go still. That's been the typical appearance in 3.5 yaw logs.

- The value entered for 'I' in the PIDs changes only how quickly I accumulates. It doesn't change the amount of I you get in the PID traces, it only changes how quickly you get to that amount. The amount depends only on how much sustained error there is for it to fix. We have found that the amount of I that works best on yaw is very, very high. Hence Betaflight 4.0 now multiplies yaw I internally by 2.5 times. If you set yaw I to 100, you will get yaw I of 250 internally. This greatly improves yaw performance, with less overshoot because less FF is needed.

The 4.0 yaw defaults, with zero FF, will work extremely well for most typical yaw moves, with smooth noise-free accurate rendition of setpoint to response.

For higher rate yaw spins, some tuning may be required.

If the amount of P and I isn't enough to achieve the yaw rate during the move, the sustained error will result in a high accumulated I signal, leading to some overshoot. If the motors are not maxing out, increasing I further, and adding more FF may help track the yaw input more closely, reducing the amount error during the move, and thereby reducing the amount of I overshoot. If the motors are maxing out during rapid yaw changes, the best solution is to just target a lower peak yaw rate, or be a bit more gentle in acquiring that rate. The alternative solution is to enable iterm_relax on yaw, which will block most of the I accumulation, and push the yaw move with a lot of FF. Typically this won't provide as good yaw control for slower rate moves, though.

## Bonus Section: Note about the OpenTx ADC filter

OpenTx has a specialised way of filtering stick inputs, that only transmits changes that are above a certain size, the ADC filter. It sends no data for variable periods of time when the sticks move slowly, until the amount of stick movement becomes big enough to send a new value. This is intended to reduce jitter. Unfortunately, anytime no data is sent, FF drops abruptly to zero. The result is a very steppy FF trace during small inputs, and a reduction in fine control. Disabling the ADC filter will force the radio to transmit whatever data it has, new data every packet, no matter how small the change. This means transmitting some jitter but improves fine control and cleans up the FF trace a lot. The Hall effect gimbals have very little jitter and the ADC can be turned off without problems. Potentiometer based gimbals may be OK but old ones often have a lot of jitter.

If you have a FrSky radio with Hall gimbals:

- In the hardware tab of the radio configuration menu, uncheck the `ADC filter` box. **Note:** The special edition radios often come with a firmware build that has the ADC filter off already.
- In the Betaflight App `Receiver` tab, set `RC Deadband` and `Yaw Deadband` to `0`. This will keep quad control smooth as you cross through the deadband.

## Bonus Section: For Filter Noobs

Filters in BF4.0 have become quite complex, so for some less experienced users it's hard to really discriminate between all available options. Here is a little summary writeup on the available filters and how/where to configure them, including the new dynamic rpm notch filters:

- DYNAMIC_FILTER feature in the Betaflight App (BFC) GUI switches dynamic NOTCH on or off, settings are configured via CLI dyn_notch... commands. No associated BFC GUI fields to edit values yet.
- Dynamic LOWPASS needs no further feature switch, it is enabled by entering numbers into the last screenshot's fields OR configuring via CLI dyn_lpf... commands
- rpm filter (with its 36 filter banks) is completely independent of both dynamic notch and dynamic lowpass filters and is configured via CLI rpm_notch... commands. No associated BFC GUI edit fields yet.
- Static glpf and dlpf and static gyro and dterm notches: Parametrized via BFC GUI edit fields OR CLI dterm_lowpass/notch..., gyro_lowpass/notch... commands

Note: Lowpass1 for gyro or dterm can be either dynamic or static, Lowpass2 is always static (reflected in the BFC GUI)

---

## THANK YOU to all the amazing ideas people, testers and programmers who helped make this release so amazing!

---

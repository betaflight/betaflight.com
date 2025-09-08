# PID tuning

Every aspect of flight dynamics is controlled by the selected "PID controller". This is an algorithm which is responsible for reacting to your stick inputs and keeping the craft stable in the air by using the gyroscopes and/or accelerometers (depending on your flight mode).

The "PIDs" are a set of tuning parameters that control the operation of the PID controller. The optimal PID settings are different on every craft, so if you can't find someone with your exact setup who will share their settings with you, some trial and error is required to find the best performing PID settings.

A video on how to recognise and correct different flight problems caused by PID settings is [available here](https://www.youtube.com/watch?v=YNzqTGEl2xQ).

Basically, the goal of the PID controller is to bring the craft's rotation rate in all three axes to the rate that you're commanding with your sticks. An error is computed, which is the difference between your target rotation rate and the actual one measured by the gyroscopes, and the controller tries to bring this error to zero.

## PIDs

**The P term** controls the strength of the correction that is applied to bring the craft toward the target angle or rotation rate. If the P term is too low, the craft will be difficult to control as it won't respond quickly enough to keep itself stable. If it is set too high, the craft will rapidly oscillate/shake as it continually overshoots its target.

**The I term** corrects small, long term errors. If it is set too low, the craft's attitude will slowly drift. If it is set too high, the craft will oscillate (but with slower oscillations than with P being set too high).

**The D term** attempts to increase system stability by monitoring the rate of change in the error. If the error is rapidly converging to zero, the D term causes the strength of the correction to be backed off in order to avoid overshooting the target.

## TPA and TPA Breakpoint

_TPA_ stands for Throttle PID Attenuation and according to [AlexYork.net](http://blog.alexyorke.net/what-is-tpa/):

> "TPA basically allows an aggressively tuned multi-rotor (one that feels very locked in) to reduce its PID gains when throttle is applied beyond the TPA threshold/breakpoint in order to eliminate fast oscillations.."

Note that TPA can be set via the CLI or in the PID Tuning tab of the Betaflight App. The `tpa_breakpoint` parameter is set via the CLI.

Also, note that TPA and `tpa_breakpoint` may not be used with certain PID controllers. Check the description on the individual controller.

TPA applies a gain reduction relative to throttle. In current Betaflight, TPA attenuates P and D (not I) as full throttle is approached.

**TPA** = % of damping that will occur at full throttle.

**tpa_breakpoint** = the point in the throttle curve at which TPA will begin to be applied.

Example: With TPA = 50% (or 0.5 in the Betaflight App) and `tpa_breakpoint` = 1500 (assuming throttle range 1000–2000).

- At 1500 on the throttle channel, the PIDs will begin to be damped.
- At 3/4 throttle (1750), PIDs are reduced by approximately 25% (half way between 1500 and 2000 the damping will be 50% of the total TPA value of 50% in this example)
- At full throttle (2000) the full amount of damping set in TPA is applied. (50% reduction in this example)
- TPA can lead to an increase in rotation rate as throttle rises. You may see faster flips and rolls at higher throttle due to coupling between PIDs and rates. 

![tpa example chart](https://user-images.githubusercontent.com/15355893/165317342-9639a7f8-1a05-4584-9b80-3faa2da565cb.png 'TPA Example Chart')

**How and Why to use this?**

If you are getting oscillations starting at say 3/4 throttle, set `tpa_breakpoint` = 1750 or lower (remember, this is assuming your throttle range is 1000-2000), and then slowly increase TPA until your oscillations are gone. Usually, you will want `tpa_breakpoint` to start a little sooner than when your oscillations start so you'll want to experiment with the values to reduce/remove the oscillations.

## RC rate, Pitch and Roll Rates (P/R rate before they were separated), and Yaw rate

### RC Rate

An overall multiplier on the RC stick inputs for pitch, roll, and yaw.

This basically sets the baseline stick sensitivity.

### Pitch and Roll rates

This is an multiplier on overall stick sensitivity, like RC rate, but for roll and pitch independently. Stability (to outside factors like turbulence) is not reduced at stick extremes. A zero value is no increase in stick sensitivity over that set by RC rate above. Higher values increases stick sensitivity across the entire stick movement range.

### Yaw Rate

It acts as a stick sensitivity multiplier, as explained above.

### Filters

`gyro_lpf` sets the hardware gyro low pass filter value. If 0 or 256 the gyro uses the least hardware filtering available (256Hz) and the internal sampling rate is the fastest possible (8kHz) with the least possible delay. The lower the number the stronger the filtering. Stronger filtering reduces noise in the gyro signal before that data gets into the PID calculations. Stronger filtering adds delays that can be associated with wobble and reduced responsiveness. Filtering is needed because motor/frame noise can cause overheating of motors especially when amplified by Dterm in quads with low mass and fast braking ESCs. If 188 or lower are chosen, the gyro sampling is internally at 1kHz and delays are greater. Faster sampling is good because things are slightly more responsive but can cause aliasing noise. Setting to 188 allows syncing of the FC to the gyro at 1kHz (if `gyro_sync` is enabled and available in the code) which reduces aliasing a lot.

`gyro_soft_lpf` is an IIR (Infinite Impulse Response) software low-pass filter that can be configured to any desired frequency. If set to a value above zero it is active. It works after the hardware filter on the gyro (in the FC code) and further reduces noise. The two filters in series have twice the cut rate of one alone. There's not a lot of sense running `gyro_soft_lpf` at a value above `gyro_lpf`. If used, it is typically set about half the hardware filter rate to enhance the cut of higher frequencies before the PID calculations. Frequencies above 100Hz are of no interest to us from a flight control perspective - they can and should be removed from the signal before it gets to the PID calculation stage.

`dterm_cut_hz` is an IIR software low-pass filter that can be configured to any desired frequency. It works after the gyro_cut filters and specifically filters only the D term data. D term data is frequency dependent, the higher the frequency, the greater the computed D term value. This filter is required if despite the gyro filtering there remains excessive D term noise. Typically it needs to be set quite low because D term noise is a major problem with typical IIR filters. If set too low the phase shift in D term reduces the effectiveness of D term in controlling stop wobble, so this value needs some care when varying it. Again blackbox recording is needed to properly optimise the value for this filter.

### Horizon Mode Commands

The CLI commands `horizon_tilt_effect` and `horizon_tilt_mode` control the effect the current inclination has on self-leveling in the Horizon flight mode. (The current inclination is the number of degrees of pitch or roll that the vehicle is away from level, whichever is greater).

`horizon_tilt_effect`: Controls the effect the current inclination (tilt) has on self-leveling in the Horizon flight mode. Larger values result in less self-leveling (more "acro") as the tilt of the vehicle increases. The default value of 75 provides good performance when doing large loops and fast-forward flight. With a value of 0 the strength of the self-leveling would be solely dependent on the stick position.

`horizon_tilt_mode` SAFE|EXPERT: Sets the performance mode for 'horizon_tilt_effect'

SAFE = leveling always active when sticks centered:
This is the "safer" range because the self-leveling is always active when the sticks are centered. So, when the vehicle is upside down (180 degrees) and the sticks are then centered, the vehicle will immediately be self-leveled to upright and flat. (Note that after this kind of very-fast 180-degree self-leveling, the heading of the vehicle can be unpredictable.)

EXPERT = leveling can be totally off when inverted:
In this range, the inclination (tilt) of the vehicle can fully "override" the self-leveling. In this mode, when the 'horizon_tilt_effect' parameter is set to around 75, and the vehicle is upside down (180 degrees) and the sticks are then centered, the vehicle is not self-leveled. This can be desirable for performing more-acrobatic maneuvers and potentially for 3D-mode flying.

The 'horizon_tilt_effect' and 'horizon_tilt_mode' values are separate for each profile.

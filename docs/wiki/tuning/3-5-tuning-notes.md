---
sidebar_position: 14
---

# Betaflight 3.5 Tuning Notes

- [A new Feed Forward PID system](#goodbye-d-setpoint-weight-hello-feed-forward)
- [Anti Gravity improvements](#smoother-anti_gravity)
- [Dynamic Notch filter optimisation options](#tuning-the-dynamic-filter---for-clean-quads)
- bug fixes and optimisations

In practical terms these changes should:

- [significantly improve yaw performance](#feed-forward-on-yaw) and make tuning easier
- [improve nose up/down wobble when changing throttle quickly](#smoother-anti_gravity)
- [allow more focused noise reception, and/or less delay](#dynamic-notch-filter-tuning) especially on clean quads.

**3.5 RC1 is experimental.** Please confirm all PID changes in the CLI before flying. Full configurator, Lua, Blackbox and OSD support will happen but won't be there yet.

Configurator 10.4 and Log Viewer 3.2 or higher will be available soon for use with 3.5.

## Can I just update and go fly?

Yes, especially if moving from defaults... but:

- If you are updating from pre-3.4, please read the [Betaflight 3.4 Tuning Notes](older/3-4-tuning-notes) because they apply to 3.5 also.

- If you had customised D weight and transition, your sensitivity to quick stick inputs may be different. You may need to modify the new Feed Forward and Feed Forward Transition values to reflect your old settings.

- The new Anti Gravity code defaults to `SMOOTH`, and should be better than before, but if you hate it, you can go back to the old `STEP` method.

- You will get slightly better dynamic notch functionality than before, but to really improve things on cleaner quads, the settings should be modified from defaults.

- D weight settings, including changes via OSD or Lua, will be ignored.

## Goodbye D Setpoint Weight: Hello Feed Forward!

This is perhaps the biggest change in recent years: **No more D Setpoint Weight**.

Feed Forward now takes over the role of D setpoint weight, and can be configured independently for each axis (pitch, roll and yaw).

```
set f_pitch = 60,
set f_roll = 60,
set f_yaw = 60,
Allowed range: 0 - 2000
```

The default values (60) for FF are comparable to the previous 3.4 defaults.

**NOTE: Your old D weight settings will be lost, in each PID profile, on updating from previous versions**.

To start using 3.5 with exactly the same Feed Forward behavior as you had with the old D weight method, calculate FF as `(D/26)*D_Weight`, where D is your PID 'D' value, and D_Weight is 100 times your D_Weight slider value, or your exact dterm_setpoint_weight value from the CLI. For example, if your D was 26, and your D weight slider was 1.0, the equivalent FF would be 100. If your D was 52, and D weight was 100, an FF of 200 would fly the same on that axis. Yaw FF is covered further down.

You may have to update your transition value manually also, but the units, and behavior, are the same.

Feed Forward provides 'dynamic stick boost' or 'dynamic stick responsiveness'. It pushes the quad quicker into turns when the sticks are moved quickly. With Feed Forward, the faster the sticks are moved, the bigger the push. And it doesn't wait for any error to develop, the response is instantaneous.

The Feed Forward effect is attenuated around center sticks by the transition parameter, so the quad can be made more damped (less twitchy) around center for freestyle type flying by setting transition to 0.5 or 0.1 as usual, but for racing and for direct responses it's best to leave transition at 0.

Zero Feed Forward allows D to dampen the quad all the time, even when the quad is instructed to turn quickly. Too much Feed Forward may make the quad too twitchy, and may cause overshoot.

**The default FF values of 60 are 'mid-range' values.**

Typically an FF value around 100 is a reasonable amount for a responsive race oriented quad.

Overall responsiveness to stick input depends on both P and FF. It is no longer necessary, or desirable, to keep increasing P to improve transient stick responsiveness. Adding FF is a much better way to achieve stick responsiveness than adding P.

## Feed Forward on Yaw

Yaw performance has historically been weaker than pitch and roll, leading people to run high levels of yaw P, leading to noise and wobble on yaw, overshoot and bounce back.

Not any more! **In 3.5, yaw will typically be just as responsive and precise as pitch and roll.**

At least 50 of FF on yaw is recommended on all quads. The default is 60.

P should not need to be more than 40-60 for great yaw responsiveness, in fact lower P reduces yaw noise and bounce back.

Really high yaw I works great on most quads, and (strangely enough) actually reduces bounce back, when combined with yaw feed forward.

With those changes, yaw responsiveness will be as good, or better, than pitch and roll. With Feed Forward and high I on yaw, bounce back will be minimal, and there is no need to run iTerm_Relax on these settings.

** Yaw D is experimental. For normal quads, do not add any D to yaw, or you'll likely get mad yaw oscillation.** Yaw D _may_ be useful for tricopters.

These are the yaw related values I'd personally recommend for a typical quad:

```
set iterm_relax = RP
set p_yaw = 40
set i_yaw = 120
set d_yaw = 0
set f_yaw = 100
```

## Smoother Anti_Gravity

Quadcopters, particularly battery on the bottom designs where the center of gravity is below the center of thrust, or those where increasing airflow would tend to rotate the quad backwards, need to accumulate I as forward speed increases to maintain the set pitch angle. When the throttle is moved up and down quickly in forward flight, these kinds of quads may pitch their nose up and down. Anti-Gravity is the Betaflight function that helps I adapt more quickly to the new value required after a quick change in airspeed.

Before 3.5, Anti_Gravity used an 'all or none' method. Each time a new throttle value arrived, if that step change in throttle exceeded the threshold value, I was multiplied by the Anti_Gravity_Gain amount. But if the next step was just less than the threshold, nothing would happen.

Because the time intervals between RC steps vary significantly from radio to radio, the throttle change amount per step could change a lot. Hence it was a bit of a lottery as to whether or not the anti-gravity effect actually worked or not.

The new default `set anti_gravity_mode = SMOOTH` mode increases I in smooth proportion to the rate of change of throttle. There are no sudden steps and no threshold values to worry about - the old threshold is ignored.

The overall strength of the effect can be altered by increasing or decreasing the anti_gravity_gain parameter. Your old values should be a good starting point, but the default of 5000 is recommended.

Note: When chopping throttle hard to zero, inflow to the props can get reversed, causing marked pitch and roll instability, so don't expect the quad to stay rock solid under those conditions.

The old method can be selected by choosing `set anti_gravity_mode = STEP`.

## Dynamic Notch Filter tuning

The Dynamic Notch has been a vital factor in effective noise management.

3.5 improves the algorithms and allows tuning via the CLI. Appropriate changes can, on many setups, result in less delay and/or even better noise control.

Using the defaults preserves the old behavior.

Quadcopters with relatively stiff frames, good motors and new props typically have a clean noise profile, apart from one noise peak that increases as the motor noise goes up.

On these quads, the old dynamic notch code tended to go too low during high throttle periods, adding significantly to delay without removing the noise.

For noisy quads, the old dynamic notch ended up staying tightly in a range between 200 and 300Hz, acting more like a fixed notch.

The code was changed to:

- operate on post-filter, post-notch input data, so that if you added a notch, the dynamic would not end up on the same point
- ignore low frequency inputs that sometimes pushed it too low
- better track peaks
- go up to the highest value if there was no peak, to minimise delay
- allow the user to configure the quality factor so that it could to track a wider range of input data
- allow the user to set how wide the notch would be, narrower causing less delay.

**IMPORTANT NOTE: Noisy quads with warm motors should be left at the defaults.**

## Tuning the dynamic filter - for clean quads

`dyn_notch_quality` is the CLI value that sets how widely the notch filter is allowed to move. Technically, this sets the Q factor of the input bandpass filter.

The old dynamic notch Q factor, and the current default, was 70. This restricted the range of movement of the dynamic to relatively narrow band, typically between 240 and 300 Hz. Setting dyn_notch_quality to 5 opens the bandwidth up to a range between 150 and 600Hz. This works really well on clean quads with a dominant well defined motor speed related peak that runs up to 600Hz.

`dyn_notch_width_percent` sets how wide the dynamic notch will be. If set to 20, the notch will be +/- 20% of center frequency. If the algorithm would have set center frequency to 300, a 20% wide notch would cover the range 240 to 360.

The current default is 50%, which is about how wide the old dynamic filter was. Given the typical center values of the old filter, this resulted in a wide notch, which caused meaningful additional delay.

On clean quads, the dynamic can be narrowed to say 20% and still work really well.

For medium clean quads, try:

```
set dyn_notch_quality = 15
set dyn_notch_width_percent = 30
```

For really clean quads, try:

```
set dyn_notch_quality = 5
set dyn_notch_width_percent = 20
```

To see what the center frequency of the notch is doing on each axis in blackbox, and log raw gyro:

```
set debug_mode = FFT_FREQ
```

## More detail about Feed Forward in 3.5

Prior to 3.5, the feed forward factor was included within the D calculation, and increased whenever you added D.

The old D weight approach was undesirable for the following reasons:

- Conceptually, it was confusing. We were linking a factor that improved stick responsiveness to a factor that was supposed to dampen reactions. There were good reasons for this, but it sure complicated things.

- Previously, when adding D to tune out wobble after quick stick inputs, there was a simultaneous increase in turn rate, so it was not possible to 'just add more D'. Now, when adding more D, all you get is... more D. So D can be tuned in the classical method of adding it to control P wobble much more easily.

- Previously, any change in D would change how much feed forward or stick responsiveness you got. Now they are entirely independent.

We can now plot the Feed Forward and D elements independently in the Blackbox Log Viewer, showing exactly what D does, and how much D and FF contribute, independently, to pidSum. This simplifies blackbox-assisted tuning.

Feed Forward requires RC smoothing to be enabled (the Filter method is best). Without RC smoothing, Feed Forward will generate spikes in the motor traces and to prevent this the firmware will disable Feed Forward on any channels not smoothed. So the default has been changed to enable smoothing on all channels (`rc_interp_ch = RPYT`).

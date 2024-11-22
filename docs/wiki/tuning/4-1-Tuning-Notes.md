---
sidebar_position: 12
---

# Betaflight 4.1 Tuning Notes

- [Simpler RPM filter configuration](#simpler-rpm-filter-configuration)
- [Improved default lowpass filter settings](#new-filter-settings)
- [Changes to the dynamic notch filter](#changes-to-the-dynamic-notch-filter)
- [Feed forward interpolation](#feed-forward-interpolation), to reduce the spiky nature of the feed forward signal
- [Feed forward boost](#feed-forward-boost) to improve transient stick response and reduce overshoot
- [Feed forward limiting](#feed-forward-limiting), to stop overshoot with max rate outgoing moves
- [Dynamic Idle](/docs/wiki/guides/current/Dynamic-Idle), to improve handling at low rpm
- [Optimised PID and TPA defaults, with adjustment sliders in a new Configurator](#optimised-pid-and-tpa-defaults)

Betaflight 4.1 significantly improves default filters and PIDs and has better feed-forward capabilities, all of which help make your quad fly better than ever, out of the box.

And we have a new, improved, 10.6 Configurator!

The defaults should fly really well on the vast majority of builds, including those which had issues with 4.0x. Some re-tuning may be required on whoops and 7" or larger quads, but we strongly recommend trying the stock defaults first on most quads.

:::caution
**DO NOT paste in a diff from any prior software build** into the 4.1 CLI. Not even 4.0.x. **Doing so WILL carry over inappropriate settings!**
:::

:::caution
**Please start with stock filters and PIDs**, unless you know for sure that your quad really needs something unusual. The default PIDs are really, really good.
:::

The 4.1 lowpass filters are now all PT1's. They have been configured to reduce delay and reduce the likelihood of flyaways on arming. They are very effective, but are probably stronger than needed for most good builds. Configurator 10.6 provides a simple way to reduce filter delay.

We strongly recommend enabling RPM based filtering. This is now easier than ever. RPM filtering almost completely removes motor-dependent noise from the PID loop. The dynamic notch can then seek out and remove any remaining resonant noise peaks. The lowpass filters then have very little left to do, and usually can be shifted, as a group, to cutoff values 1.5 to 2 times higher than usual, reducing filter delay in the same proportion, resulting in better propwash handling than ever.The new feed forward features are described in detail later, but the defaults are very solid and should not require any tuning.

In most cases 4.1 should be a flash and fly upgrade, the defaults are seriously good in all respects.

For a VTX to be controlled by betaflight, [a suitable VTX table must be configured by the user](/docs/development/VTX.md#vtx-table) in a way that complies with local regulations.

Bitbanged DShot is very new; please report bugs during the RC phase to GitHub. If you have an issue with your ESC, try `set dshot_bitbang = OFF` rather than AUTO. For more information see the [rpm telemetry page](/docs/wiki/guides/current/DSHOT-RPM-Filtering)

## Simpler RPM Filter Configuration

Enabling [rpm based filtering](/docs/wiki/guides/current/DSHOT-RPM-Filtering) is now easier than before. With the default `dshot_bitbang = AUTO`, there is no need for custom timer and DMA changes on F4 and F7 boards. RPM telemetry will be automatically activated when `dshot_bidir` is enabled, and this can be done in the 10.6 Configurator. The older method is active when `dshot_bitbang = OFF`. For more information check the updated rpm_telemetry page.

We still recommend keeping the dynamic notch filter active after enabling the rpm filtering. See the next section for how to adjust filters after activating the rpm filter.

## New Filter Settings

Betaflight 4.1 returns to the 3.5.x proven dual PT1 lowpass filters on gyro and dual PT1's on D.

On gyro, the default filtering is relatively light. Gyro lowpass1 is dynamic, ranging from 200 to 500hz. Gyro lowpass2 is static at 250hz.

D filtering, in contrast, is quite strong. D lowpass1 is dynamic, ranging from 70-170hz. D lowpass 2 is static at 150hz.

The reason for strong, low-throttle, D lowpass filtering is to prevent D related 'fly to the moon' events that occasionally happened in 4.0.x with quads that were highly susceptible to D resonance. With 4.1 filters this should be far less likely.

Even though the default filtering is quite strong, resulting in cool motors on any reasonable build, propwash suppression should be alright, especially if throttle is maintained in the turns. This is because PT1 filters have less delay than biquad fiters for the same cutoff frequency, and because the filter cutoffs rise quickly as throttle increases.

If your quad flies well with cool motors on the default filter settings, propwash can be reduced by shifting the lowpass filtering higher.

Configurator version 10.6 makes it really easy to do this. Just move both filter sliders to the right, and the cutoffs will move higher, reducing delay, and improving propwash.

:::note
We do not recommend turning entire filters off to reduce filter delay. We strongly recommend using the sliders and keeping all four filters on at all times.
:::

Without RPM filtering, shifting the lowpass filters higher should be done cautiously. Most good quads should fly really well, with cool motors, up to 1.5x higher filters, but only very clean quads will be happy at 2x, unless the rpm filtering is enabled.

With RPM filtering, most quads will still have cool motors with filters at 2x normal. At 2x, the delay attributable to lowpass filtering is halved compared to normal, so long as the dynamic is kept on (see below), and propwash will be noticeably better compared to defaults. Some clean quads may tolerate up to 3x filtering with dynamic and rpm on. The sliders stop at 2x so to go higher you have to enter the numbers yourself.

To revert to default filtering, just put the filter sliders back to the center.

## Changes to the Dynamic Notch filter

The dynamic notch filter now defaults to MEDIUM range.

When rpm filtering is enabled, the dynamic notch filter has a different role. It no longer has to track and remove the motor peaks - rpm filtering does that. Instead, it can focus on whatever residual resonant peaks exist on the quad. Not all quads have resonance issues, but many do.

We recommend keeping the dynamic notch filter enabled on all quads, even those with rpm filtering.

When the rpm filter is in use, the dynamic notch can be a single, narrower, notch, rather than the usual wider, dual notches that are needed when the rpm filter isn't active. The following snippet makes those changes, and cuts delay arising from the dynamic notch to about 1.4 of normal. It should be applied when using the rpm filter:

```
set dyn_notch_width_percent = 0
set dyn_notch_q = 250
```

And this restores the default values for use without RPM filtering

```
set dyn_notch_width_percent = 8
set dyn_notch_q = 120
```

If RPM filtering is being used, and a narrower notch works well without hot motors, you can try turning it off altogether. Be sure to make a cautious test flight and check motor temperatures! If the quad later develops frame resonances from carbon flex, or from soft / bent props, you may get burnt motors when the dynamic filter completely off. Don't do this unless you are confident about your build integrity and are sure the RPM filtering is working well.

If you have logging capabilities, a log made with the dynamic notch on vs off can show whether it is contributing usefully to the overall noise control situation.

To reduce delay, or to focus on specific resonance bands, the dynamic notch can be configured to operate over a limited range of frequencies. Three ranges are possible, LOW, MEDIUM and HIGH. In 4.0.x, the default range setting was AUTO, in which the code chose a range based on the user-configured value of dyn_lpf_gyro_max_hz. The idea was that high max values would only be used on high rpm quads. But now high max values may be used on normal quads, when moving the sliders up, for example.

In 4.1, the dynamic notch now defaults to MEDIUM mode, and it stays there regardless of dyn_lpf_gyro_max_hz. In MEDIUM mode it can deal with resonance bands from about 140hz to about 600hz. This is appropriate for most normal quads.

For large quads - 7" or greater - with lower than 150hz resonance lines, LOW may be more appropriate.

HIGH can be useful on high-rpm quads, in combination with a higher than normal dyn_notch_min_hz value, to keep the dynamic notch tracking a specific and relatively high resonant peak, and not going any lower than needed. This can reduce its delay contribution.

## Feed Forward Interpolation

Until now, the feed forward factor was derived from the slope of the setpoint line. Each new RC step would cause a sharp step up in the setpoint, which would result in a sharper feed forward spike. To attenuate these spikes, a carefully adjusted low-pass filter on the incoming setpoint data, using `rc_smoothing_input_hz`, was followed by a second low-pass on the feed-forward value, using `rc_smoothing_derivative_hz`.

In 4.0x, with `rc_smoothing` in auto mode (`set rc_smoothing_input_hz = 0` and `set rc_smoothing_derivative_hz = 0` ), these filter values were set dynamically according to the step intervals between successive incoming RC data points.

In 4.1, the feed forward amount is calculated from the change in successive setpoint values, using an interpolation method, and outputs a clean step up in feed forward without spiking. This doesn't need a lot of filtering.

The new command is `ff_interpolate_sp` and it has three options:

- `OFF` : normal 4.0x lowpass RC filtering
- `ON` : new 4.1 interpolated feed forward, 4.0 style lowpass filtering on setpoint
- `AVERAGED` : same as `ON` but with two-point moving average over the feed forward signal. This is the new default.

With non OpenTx radios or OpenTx 2.3+ with systems that do not dynamically change the transmission rate, a good low-delay set of RC smoothing values for interpolated feed forward in 4.1 would be:

```
set rc_smoothing_input_hz = 40
set rc_smoothing_derivative_hz = 100
set rc_smoothing_input_type = PT1
set rc_smoothing_derivative_type = PT1
```

When using with TBS Crossfire or FrSky R9 on OpenTx radios these settings will dampen aliasing artifacts that currently happen with those systems (and probably any external module on OpenTx radios).

```
set rc_smoothing_derivative_hz = 20
set rc_smoothing_derivative_type = PT1
```

The following will return to the default 4.0 auto lowpass settings:

```
set rc_smoothing_input_hz = 0
set rc_smoothing_derivative_hz = 0
set rc_smoothing_input_type = BIQUAD
set rc_smoothing_derivative_type = BIQUAD
```

These changes were originally described in the [Feedforward 2.0 documentation](/docs/wiki/guides/current/Feed-Forward-2-0). There we explained the basics of what feed-forward and ff_boost are.

### Feed forward interpolation averaging

A very effective method of smoothing out feed forward with an erratic RC trace is to apply a simple two-point moving average over the entire feed forward signal. This is particularly effective in reducing sudden up/down movements when single RC steps are missed. FF averaging is enabled by default, with the line

```
set ff_interpolate_sp = AVERAGED
```

Although averaging attenuates single spikes by about half, and eliminates spikes from alternating missed steps, it adds a delay equal to half the current RC step interval to the FF signal. This slight extra delay is very small and is only noticeable in very fast direction reversals.

While some Rx systems are better than others, the majority lose data packets frequently. The amount of FF jitter from these erratic Rx signals is so bad that we strongly recommend keeping the averaging active.

If you know your Rx signal is stable with few dropped packets, the averaging delay can be avoided by disabling it with:

```
set ff_interpolate_sp = ON
```

To return to the older low-pass filter method of smoothing feed forward, use:

```
set ff_interpolate_sp = OFF
```

## Feed Forward Boost

This provides an extra feed forward component, based on stick acceleration, which helps the motors spin up more quickly, the moment you change stick speed.

When commencing a move, stick acceleration is positive. We now provide positive 'boost' that gets added to the feed forward signal, proportional to that acceleration. At the end of a move, as soon as the sticks decelerate, we will actively reduce the amount of feed forward, reducing overshoot.

The default `ff_boost` amount is 15. This amplifies the strength of the normal feed forward overall, but particularly early on, reducing lag when making quick turns. It backs off the feed forward when the sticks slow down, reducing overshoot. Overall the effect is of greater accuracy when making fast direction changes.

If the quad is tracking well, overall, but still has a bit of lag at the beginning of fast inputs, and if the RC signal is quite good, up to 30 of ff_boost may be used.

The main limiting factor with boost is when RC input packets are delayed, absent, or too early. This can cause large steps in the RC setpoint, leading to even greater steps in the boost component of FF. We have two ways of attenuating these spikes.

The first is a very effective, zero-delay attenuation method, based on inhibiting peak boost values due to spikes, and letting smaller 'real' stick-related boost values through. So long as the boost element is well below the `ff_spike_limit` threshold, it passes through largely unchanged; the larger boost signals arising from spikes are attenuated very strongly.

The default `ff_spike_limit` threshold of 50 works well in most cases.

If the Rx trace is clean with mostly regular steps, a higher threshold, eg 60-80, will allow a quicker response to fast stick inputs. However if the Rx signal has many steps, moving the threshold higher may result in an unacceptably noisy FF and/or motor trace.

The second method is by averaging successive feed forward data points. This has been described above in the section on feed forward interpolation. It does add delay equal to half the normal RC interval.

## Feed Forward Limiting

`ff_max_rate_limit` is a CLI variable, enabled by default at 100, that cuts feed forward when outgoing stick speed is likely to hit the mechanical limit of its travel. This minimises the overshoot we often see at the start of a flip.

The default value of 100 works well.

The value may be tweaked to perfection. Get the quad tuned properly first, with whatever FF and boost works best. Look at the start of a hard flip in BlackBox Explorer and see if there is any overshoot. If with `ff_max_rate_limit = 100` there is still too much overshoot, try `ff_max_rate_limit = 95`. If the overshoot is too well controlled, try 105 to 110. The range of adjustment is quite tight.

`ff_max_rate_limit` does not deal with overshoot when the sticks return to center.

It can be useful for racers who have such low rates that they often hit max travel when making tight turns.

## Optimised PID and TPA defaults

The primary PIDs are largely unchanged from 4.0.x. **Stick responsiveness has been improved** with slightly **higher default I and feed forward (FF) values** on pitch and roll. `ff_boost` is enabled by default, and in combination with the higher default feed-forward value and the reduced delay from feed forward interpolation, stick responsiveness should be significantly stronger. If your quad seems too twitchy, lower FF using the stick responsiveness slider.

**Throttle PID Attenuation (TPA)** now defaults to 0.65 starting at 1250 throttle units. This means more TPA at full throttle, but with a smoother range of D reduction. Combined with the changes to PT1 filtering, this seems to improve mid throttle oscillations compared to 4.0.x in most cases.

The biggest change is the provision of **sliders to simplify tuning the PID values**.

Quads with low authority (heavy 4S GoPro machines or 7" with slightly over-propped motors) will usually do better with the master PID slider moved to the right a bit, maybe as high as 1.5x. High-authority machines, eg lightweight LOS quads, will usually do better with the master PID slider to the left, say 0.7 - 0.8.

The amount of feed forward is easily adjusted with the 'stick responsiveness' slider. Cinematic type HD quads may prefer a lower amount of feed forward especially if their long-range radio makes frequent large glitches. Racers may prefer a higher amount of feed forward.

To get more D damping of P, move the PD balance slider to the left. You might do this if you get P wobbles on tight turns. Generally I wouldn't change this other than in exceptional circumstances, normally the defaults are best.

A 6S racing quad typically needs the default amounts of I and FF, the only slider change needed is usually to drop the P and D gain slider back to 0.7.

A 4S racing quad can be quite good with the master slider at 1.2 and the P and D gain slider at 0.7.

The sliders greatly simplify tuning the PIDs. To go back to defaults, put them all back in the middle.

DO NOT move them all the way to the right to see if it flies great, you'll likely just melt the motors :-)

---

Credits:
myriad improvements, fixes, advice, and all the underlying code - mikeller, eTracer, and multiple contributors
dynamic idle, rpm telemetry, bit banged DShot, feed forward limiting - JoeLucid
configurator sliders - IvoFPV
feed forward boost, filter and PID changes - ctzsnooze

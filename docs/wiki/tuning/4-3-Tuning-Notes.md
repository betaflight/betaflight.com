---
sidebar_position: 10
---

# Betaflight 4.3 Tuning Notes

### Introduction

Welcome to a comprehensive guide to the Betaflight 4.3 update.

**Please read these important introductory notes**:

1.  After updating to Betaflight 4.3, you MUST use the [**latest 10.8 Betaflight Configurator.**](https://github.com/betaflight/betaflight-configurator/releases) Earlier 10.8 and 10.7 configurator versions **will not** work properly with 4.3.

1.  F4 processors should run a 4k PID loop. F411 users should use DShot300, not DShot600, and are blocked from an 8k PID loop. Most F411's should be overclocked to 120Mhz, though some will only tolerate 108Mhz.

1.  4.3 has a **new Slider tuning approach and Presets.** Due to parameter changes, **do not paste in CLI ‘diff’ or ‘dumps’ from previous versions**. A suitable Preset should give great results. The Sliders simplify making final 'tweaks' to your tune.

1.  **Experienced users** who want to use numeric data entry for tuning and filters MUST first disable their sliders. It's easiest to do that in Configurator.

1.  **Check all your settings carefully** before arming for the first time. Check PIDs, Filters, Rates, motor configuration and motor rotation. For the first flights, arm in a safe place, fly gently, and look out for any setup or build issues.

1.  **We recommend using RPM based filtering** for best performance. Read about [enabling and configuring rpm filtering here.](/docs/wiki/guides/current/DSHOT-RPM-Filtering)

1.  **250hz or 500hz radio link users MUST choose a suitable Preset**. 500hz radio links must have `feedforward_smoothing` set to 65-70 with 2 point averaging. 250hz radio links need `feedforward_smoothing` set to 35-40 with 2 point averaging.

1.  **CPU Usage is now reported as a much higher value than previously**. This is OK, it's just a change to how we display it. Don't be concerned until it gets around 75%.

## [Betaflight 4.3](https://github.com/betaflight/betaflight/releases) features

**A smoother, more precise flight experience with better propwash perfomance** 'and' also **an easier setup and tuning experience** - to release the full potential of Betaflight 4.

4.3 is a **significant evolutionary step** thanks to a slew of diligently coded and carefully tested updates representing thousands of hours of work from the voluntary development and test team. Credits at the end of the page.

- [New PID based tuning sliders](#new-tuning-sliders) - Whether you need to tweak the tune or build it from scratch, we now have simpler, more comprehensive, firmware based tuning sliders in the Configurator. These are _active by default_. Slider positions are stored with the quad, and can be modified via the OSD or LUA. New expert sliders allow fine-tuning of Pitch:Roll balance, DMax:Dmin, and I relative to P.

- [Presets](#presets) - A fantastic, comprehensive new preset system! Whether a whoop, a twig, a 5" racer, a freestyle setup, or an X-class, you can now easily apply a great tune for your quad, out of the box. Presets also exist for radio setups, vtx configurations, and so on. Users can choose from 'official' Betaflight Presets and 'community' presets. Both are checked by Betaflight developers. Access to external Preset repositories is also provided, but take care when using these, since Betaflight has no control over their content.

- **Less gyro filtering with higher P and D**, providing better 'out of the box' performance.

- **We've changed how D is configured**. We now have Derivative and D_Max settings. The Derivative value is what sets the D value in smooth flying. When you turn fast, D rises to Dmax, providing more effective damping for fast movements, and when going straight, D back to Derivative and reduce D noise and motor heat. The difference between the two values has been reduced, and the Derivative value is significantly higher. Unlike 4.2, you usually won't need to push the D slider higher, unless you are seeking stronger straight-line stability in a clean HD or cinematic build.

  - [More accurate loop times](#more-accurate-loop-times) - We've made massive scheduler and DMA code improvements, including EXTI triggered SPI gyro reads (on supported boards), giving super stable looptimes, smoother filter performance, faster logging and improved CPU efficiency. NOTE: The CPU load reported in 4.3 is higher than reported in 4.2 due to a change in the way it is calculated. It now reports the % of time that the processor is busy running tasks, rather than a figure based on load average.

- [Multi dynamic notch](#multi-dynamic-notch) - We have a completely rewritten, much improved, SDFT based multi-dynamic notches. More than one resonant peak can be tracked at the same time, more accurately and more quickly than before, with low latency cost. This allows for lower overall low pass filtering and better performance.

- The above two changes have significantly improved incoming 'gyro noise'. This has allowed us to push the default gyro filtering higher than before. Coupled with higher D, this improves propwash. Many quads can now fly with the gyro filter slider hard right.

- [PT3 based RC smoothing](#pt3-based-rc-smoothing) - RC smoothing has been completely revised, and is now entirely filter based, using optimised PT3 (third order) smoothing. RC Smoothing now has the ideal filter shape applied with no overshoot and very smooth response. The auto smoothing value provides anything from low-latency to exceptional buttery cinematic smoothness.

- [RPM crossfading](#rpm-crossfading) - we now can smoothly disable overlapping RPM filtering notches entirely at low RPM. This greatly reduces filter delay at low throttle. You’ll hear an immediate difference in the sound of the motors, and experience less propwash around low throttle.

- [PT2 and PT3 lowpass filtering options](#pt2-and-pt3-lowpass-filtering-options) - The old biquad lowpass filter option is no longer available on Gyro, due to delay, overshoot and resonance issues. Previous Gyro biquad lowpass users should change to PT2, but more likely will find that, in 4.3, single or dual first order filtering is optimal for Gyro. Biquad filtering is still available for D, where a harder cut than PT2 can be useful.

- [Feedforward jitter reduction](#feedforward-jitter-reduction) - 4.3 introduces **feedforward jitter reduction**, which is an improvement on feedforward transition. It delivers a ‘dynamic transition’ effect to the feedforward, where you can get silky smooth responses while making slow stick inputs, and immediate, snappy feedforward responses to quick inputs. Usually, Transition is not required any more. Jitter reduction provides the Transition type effect, but at any stick angle. Jitter reduction also attenuates RC link noise during slow movements, especially for the newer higher rate Rx links. Racers will tend to use lower jitter reduction values than Freestylers, since that will attenuate link noise without delaying stick responses.

- [Other feedforward improvements](#other-feedforward-changes) - We now have second order smoothing on boost, soft interpolation during slow stick moves, and more accurate duplicate packet interpolation. Most slower radio links won't need averaging, which is now off by default. High speed radio links (250hz and higher) will typically benefit from 2 point averaging and stronger smoothing. Presets to suit most common link types make Radio link configuration easy.

- [AntiGravity improvements](#antigravity-improvements) - P boost has been added, along with I boost timing optimisation to peak when it is most needed. This provides greater stability during rapid throttle changes. **The default value of 3.5 should not be increased without careful testing.**

- [Dynamic gyro filter expo curve](#dynamic-gyro-filter-expo-curve) - Adjusting filter expo curves improves propwash by raising dynamic gyro filter cutoff values more quickly as you throttle up.

- [Improved dynamic idle](#improved-dynamic-idle) - The dynamic idle code has been heavily revised, and can now keep RPM at a more stable value, more quickly and more precisely than before, and can be fine-tuned with its new single sided PID controller. It is now much simpler to set up. There is no need to measure RPM or change your D_Shot idle percentage value - leave that value at your normal setting. Just enable DShot Telemetry (and check it is working), and set a suitable idle RPM value in the PID Tuning page. Typically 3000-4000 rpm works great. This improves motor spin-up-from-low-rpm behavior, enhancing low throttle input responsiveness, and reduces the risk of desyncs, while allowing motor drive to go all the way to zero for enhanced braking when appropriate and for longer inverted hang times.

- [Linear and Dynamic mixer options](#linear-and-dynamic-mixer-options) - These are alternatives to the stock Betaflight mixer code. The dynamic option may result in less aggressive bump and landing responses for level mode or cinematic flights.

- [Feedforward in Level and Horizon Modes](#feedforward-in-level-and-horizon-modes) - Feedforward is now active in Horizon, Level, and Level Race modes, leading to quicker level mode angle changes, and making Horizon mode as responsive as Acro for flips and other fast moves. The amount of feedforward in these modes can be adjusted and saved in the profile, like for the other PID parameters.

- [Actual Rates is the new Betaflight default](#actual-rates-as-the-new-betaflight-default) - Actual rates provide a simpler and more intuitive way to set your Rates, and **are now the default**. Default rates are less aggressive in the center, but more progressive around mid-stick, than the previous defaults. Full-stick default max roll rate is the same as before. Betaflight rates are optional and can still be used. _Take care when updating! If you copy and paste your old rates values, be sure to copy and paste the rates type also!_ Use this calculator to [convert your old rates to Actual rates](https://www.desmos.com/calculator/r5pkxlxhtb).

- [CrossfireV3 and Ghost RC link improvements](#crossfirev3-and-ghost-rc-link-improvements) - As well as support for the latest Crossfire, ELRS and Ghost protocols, the internal betaflight RC code now supports 12bit or higher RC data in a float data path, handles very low RC Links (down to 16hz) better than before, fully supports high speed links to 1000hz, and better attenuates feedforward glitches when the RC link returns after dropouts.

- **ELRS over SPI support for ELRS V2 on-board receivers**. Many thanks to Phobos and the other ELRS devs for helping make this happen.

- **Lua script updates** - we now have RSSI in your OSD via LUA, Slider control from the radio, and lots of other changes.

- Changed CLI command names - many CLI parameters are re-named. As a result, a lot of copy and paste efforts will fail to make all the changes you intended. Using the CLI 'get' command now finds related values more easily. For example, `get gyro_lp` will find all gyro lowpass filter settings, `get feed` will find all feedforward values, etc.

\*\*4.3 should fly really well on defaults. Start there, or with a Preset that suits your purposes. Most likely if there is a good match for your hardware, the Preset will fly great, with no additional adjustments. Advanced tuners can experiment with the easy slider tuning, and use sliders at the field via OSD or LUA.

If you're new to Betaflight, please read the previous tuning notes ([4.2](4-2-Tuning-Notes), [4.1](4-1-Tuning-Notes) for any topic that isn't covered here.

---

## Problem Solving

### Bounceback

Please refer to the [4.2 tuning guide](4-2-Tuning-Notes#settings-to-minimise-bounceback). Most bounce-back is due to too much I on a low authority quad, and is usually best fixed by lowering the iterm_relax cutoff value, and increasing tracking and D values. Random wobbles at the end of some, but not all, flip or rolls, especially the faster ones towards the end of the flight, are usually caused by delayed motor start-up from excessively low idle, being over-propped, or weak ESC startup from low RPM (48kHz or dynamic ESC modes). These are best dealt with by enabling dynamic idle with a reasonably high minimum RPM value (eg 3500-4000 RPM).

### Random wobbles in HD footage

This is typically an issue for cinematic HD applications. There is low level, random instability of the horizon when flying straight forward. Usually the frame is too soft or flexy, or it is being shaken by slightly out of balance props or worn bearings. The following suggestions may help minimise this problem:

- get a really rigid frame, check bearings and shaft play, balance the props, don't let anything wobble around
- tune for the highest possible D that the setup will tolerate, and avoid setting P too high
- get the Derivative value close to P, or up to 20% above P. You may need more D filtering than usual - check the motor temperatures and listen for idle grinding or other signs of D resonance.
- set TPA to start just below the cruising throttle value, so you don't have too much D at higher throttle values.
- once you have D as high as you can get it, experiment with more vs less P. Too much P will cause wobbling and audible fluttering in fast turns, and may make the random wobble issue worse. If you never turn fast, you may be able to get higher P than otherwise.
- if the quad lacks authority, attenuate I using the expert mode I adjustment slider
- make sure the ADC is not ticked in the hardware settings of OpenTx!!
- make sure the frame is super stiff and nothing is able to wobble or flap around
- be sure your capacitor is big
- sometimes the gyro chip isn't working properly, and some ESCs just don't play nice, if all else fails, try changing these parts from a quad that does fly perfectly.
- use a jitter reduction factor of 10-12. To test if feed-forward is making it worse, do a test flight with feedforward at zero. If there is no change, feed-forward isn't the problem, and can be used at normal settings.
- high level RC smoothing (auto smoothing of 90 or higher) will attenuate the erratic behavior of old gimbals or 'thumb shake'. To test whether your RC link is the problem, temporarily set a wide deadband. We don't recommend deadband much, but a high deadband test will eliminate all random noise on the RC link, when sticks are centered. If that makes no difference, your RC link isn't the cause of the problem.
- use very soft mounting for the camera.

### Zero throttle instability

- go back to 24kHZ PWM if you've set the ESC to 48kHz
- enable dynamic idle at 3500- 4000 RPM
- try thrust linear at 25
- try slightly higher overall PIDs

---

## Presets

The new Preset tab is probably the most useful improvement to Configurator in a long time.

Betaflight's defaults originally were made to suit 5" freestyle machines for fun flying in the park. These days there are huge performance differences between 5" race, freestyle and cinematic builds, and even greater differences between whoops, twigs, heavy camera builds, 7-10" and X-class builds. They all have very different performance envelopes.

The 4.3 Configurator release (10.8) now provides a Preset system, make it easy to find one or more sets of CLI commands that make it easy to find a tune that suits your quad, your flying 'style', your Radio or VTx setup, and so on. Once you've applied those Presets, hit Save and go fly!

Presets often include 'options', and can be used to reset parts of the machine to defaults. Read the instructions carefully before applying.

The Preset page also provides an easy way to backup and restore your configuration.

WARNING: Always backup your quad's default configuration BEFORE changing anything, and again before 'saving' a Preset! Once you've saved a Preset, the changes are permanent. There is no 'easy way' to reverse saved changes! Feel free to check out as many different Presets as you like, but once you save one, there is not going back if you failed to backup the previous configuration!

Presets are 'approved' after evaluation via the GitHub 'pull request' method, and are not included in Configurator unless we are confident that they are 'good enough'.

To add a new Preset to Betaflight, open a [pull request](https://github.com/betaflight/firmware-presets/pulls).

External Preset repositories are supported, but are not checked or validated by Betaflight.

Comments or feedback on any given preset should be provided via the [originating pull request](https://github.com/betaflight/firmware-presets/pulls). A link button is provided in the Preset manager.

## New tuning sliders

We've completely overhauled the PID tuning sliders! They provide a very quick and simple way to tune the quad, whether at the field or at your computer.

- Slider positions are now stored in the flight controller, and can be updated via the OSD or Lua, at the field.

- P and D are now set independently with their own specific sliders. No more P:D ratio and P&D gain.

- Basic mode users only see the three most important sliders (PI, D and Feedforward), with limited adjustment range.

- Expert mode shows additional allow fine-tuning sliders for I, Dmax, and pitch:roll ratio for D and P, and overall master gain.

- When an Expert mode slider is not at its default position, or a Basic slider is outside the basic adjustment range, it is visible, but greyed out, in basic view. To adjust a 'greyed out' slider, switch to Expert view.

- P:D ratio can, approximately, be retained by moving both PI and D sliders together, keeping similar relative positions

- The master gain slider can be used to increase or decrease overall PID strength, keeping everything in exact proportions

- Sliders are `ON` by default. Numeric parameter entry is blocked in Configurator when Sliders are controlling a value. If you want to use the older non-slider method of direct number entry, you MUST first disable the Sliders by setting them `OFF`.

- The normal PID slider `ON` mode is `RPY`. This means all three axes, Roll, Pitch and Yaw, are controlled. If the quad requires special Yaw settings, you can choose `RP` mode, and use direct numeric entry for yaw alone.

The balance and overall strength of P and D is now visually obvious from their respective slider positions.

WARNING: Do not make manual changes to the PID or lowpass numbers when Sliders are enabled! Turn the Slider/s `OFF` first (most easily done in Configurator.

CAUTION: When using Sliders in Configurator, be sure to make your on-field tuning changes using Sliders also! If you change numeric values using the CLI, OSD or LUA, while Sliders are active, you can create conflicting slider and number setups. If you save numbers, you can fly those numbers - they won't go away. But, if you save PIDs or Filters from a screen where Sliders are ON, your custom values will be over-written by those calculated from the Sliders. They will just vanish. Hence, it's really important to avoid these conflicts. If you use Sliders, stick with them, tune with them at the field, and don't use the numbers. If you want to use numbers, disable the sliders.

We're confident that these sliders will work effectively for both beginners and experienced tuners. They simplify the transition from 'basic' to 'expert' tuning methods. Most people, experienced tuners included, should now be able to use the sliders for nearly all their tuning requirements, both on and off the field.

## Tuning methods

The new PID Sliders support whatever tuning 'method' the user prefers, including most of the familiar YouTube tuning methods.

### Simple tuning

The quickest, simplest way to tune with the new sliders, is to move both the P and D sliders together to the right until something 'bad' happens. This retains P:D ratio, roughly. Stop, or pull back slightly, when either the motors get hot or you hear bad noises in high-speed turns, or on arming, then back off a bit. For quick and simple tuning, this is very likely to give you a really good result.

Then adjust the Stick Response (feedforward) slider to your liking.

Alternatively, we can quickly get our gains 'in the ballpark' with the Expert-mode 'Master Slider'. This increases or decreases all PID in strict proportion. Once we have it about right, individual sliders can fine-tune the result.

### The "D-first" tuning method

The 'D first' tuning method involves stepwise increases in D until something bad happens, then easing back a click or two, and not going higher. After that, the process is repeated for P, then you're done.

This is based on two fundamental concepts:

- the more D you can apply, the more P you can use;
- generally, a quad will track best with the highest P and D it can tolerate.

The following are common indications, while increasing D, that it's time to drop back a bit:

- motors getting hot,
- we hear grinding or humming sounds on arming
- the quad noisily 'flies to the moon' on arming
- bent props make the motors really hot really quickly

We know that the primary limit on how much D you can run is how clean the build is. Builds with good bearings, well balanced and well centered motors, stiff frames, stiff props, etc, will accept more D. Different props or ESC settings can have an influence.

Once you've set D as high as it can reasonably go, bring P up until something bad happens, e.g.:

- a fluttering sound from P oscillation in hard mid to high throttle turns, or
- under-damped short duration overshoots or resonances in step responses, or
- straight out P oscillation.

Usually most quads end up with P around the D value, or a bit higher.

### The 'classical' tuning method

In this method, the user pushes P upwards, in steps, to its limit, with the D slider set a bit lower than usual for the build (eg, ⅔ of P). Typically we stop when the quad starts to 'wobble', 'flutter' or 'shake' at the end of flips or rolls, or on hard fast turns. We then bring P back until there is a bare hint of that wobble, and gradually bring D up, stepwise, as much as we can, but usually not higher than P, in an attempt to block that residual wobble. We may be limited in how much D we can apply, by motor heat or noise. If we do control the wobble, we can sometimes bring P one click higher, and again add a click or two of D to see if we can control that.

The goal is to get both parameters as high as you can without the unwanted issues of flutter, resonance or excessive motor heat.

## More accurate loop times

Steve C Evans has made massive changes that almost completely eliminate PID loop jitter and improve the overall efficiency of the scheduler. No special configuration is required in most cases; it just works. You'll get better filter accuracy, cooler motors and longer flights.

### Scheduler and task changes for more accurate timing

Betaflight uses a cooperative multi-tasking scheme, which means that the scheduler needs to know how long a task will take to run, so it will call it only when there is time before a vital operation such as running the gyro/filter/pid tasks. If a task takes longer to execute than predicted, then other vital tasks will be late. This was frequently the case in 4.2 especially for the RX and OSD tasks. Tasks in 4.3 are restructured to increase the probability of them completing within the expected time, so that the scheduler can make better scheduling decisions.

**In 4.3 it's best to run F405 and F411 boards at 4k, not 8k, if RPM filtering is enabled**. For F411 processors this is enforced.

**F411's may be overclocked to 120Mhz.**. They don't run hot like F405's, most run perfectly well at 120Mhz. Some may be erratic at 120Mhz, but OK at 108Mhz, perhaps depending on the grade of the chip used on the board or other board related factors; if they are more stable at 108Mhz, use that. Let us know via GitHub and we may be able to update the Target info for the board.

**DShot300 should be always used at 4K**. While there may be no errors reported, using DShot600 can cause loop instability at 4k.

### Gyro Sync and DMA Gyro data transfers

In 4.2 there were a number of issues in reading data from the gyro.

1. The processor read data from the gyro in the gyro task using polled access, which means it had to wait for the read to complete, unable to do anything else.
2. The MPU6000 gyro has irregular updates. Every 8th update takes not 125us, but 170us, followed by another of 80us. As a result the gyro task would occasionally read two samples, 125us apart, within the 170us interval and miss the update in the 80us cycle completely.
3. Because the gyro update rate and the gyro loop were asynchronous, there was a random delay of up to 125us between the gyro data being updated (in the gyro) and the data being received and read/processed by the flight controller.

In 4.3, these issues are fixed, by:

1.  Transferring data using Direct Memory Access (DMA), where the processor initiates the transfer and can do other things while waiting for the data transfer to complete. This will reduce CPU load.
2.  Syncing the scheduler to gyro updates, using a hardware interrupt line from the gyro to the flight controller. This FC pin used is set by the `GYRO1_EXTI` resource. When this sync is active, we reliably capture every single gyro update.
3.  Reading data from the gyro immediately after being notified by EXTI that an update is available, and processing the data a consistent amount of time afterwards.

A hardware external interrupt line from gyro to FC is required to synchronise the gyro updates to the FC. Not all boards have this.
Not all boards can use DMA for gyro data requests.

The `status` CLI command reports `dma` in the `Gyros detected` line if DMA is being used (benefit 1 above), and if the gyro is locked to the FC by EXTI (benefits 2 and 3 above), it will show `locked`. For example, with both DMA and locked you will see:

```text
Gyros detected: gyro 1 locked dma
```

For more details see [PR #10525](https://github.com/betaflight/betaflight/pull/10525), [PR #10573](https://github.com/betaflight/betaflight/pull/10573), [PR #10813](https://github.com/betaflight/betaflight/pull/10813) and [PR #11033](https://github.com/betaflight/betaflight/pull/11033).

### Blackbox logging over SPI is now much more efficient

Higher logging rates will work with fewer gaps. Logging is now handled using DMA rather than polled access as described above. In 4.2 the processor would have to wait up to 90us for a block of data to be written to FLASH memory. In 4.3, it takes under 5us to kick off the write, then the transfer completes in the background whilst the processor gets on with other tasks.

Even so, logging is a significant time consumer, so turn it off if you don't need it, and only log as fast as is needed, eg 1kHz for normal purposes, 2Khz for filter tuning.

### Technical notes

In order for the above gyro and FLASH improvements to work, SPI DMA is needed. In the following example from an F745 FC it can be seen that `SPI_MOSI`/`SPI_MISO` are both defined for SPI bus 3 (both are required for FLASH access) and for SPI bus 1 (both are required for gyro access). Only `SPI_MOSI` is defined for bus 4, but that's OK as that's only used for the OSD which doesn't use `SPI_MISO`.

```text
# dma show

Currently active DMA:
--------------------
DMA1 Stream 0: LED_STRIP
DMA1 Stream 1: FREE
DMA1 Stream 2: SPI_MISO 3
DMA1 Stream 3: FREE
DMA1 Stream 4: FREE
DMA1 Stream 5: SPI_MOSI 3
DMA1 Stream 6: FREE
DMA1 Stream 7: FREE
DMA2 Stream 0: SPI_MISO 1
DMA2 Stream 1: SPI_MOSI 4
DMA2 Stream 2: DSHOT_BITBANG 2
DMA2 Stream 3: SPI_MOSI 1
DMA2 Stream 4: ADC
DMA2 Stream 5: FREE
DMA2 Stream 6: DSHOT_BITBANG 5
DMA2 Stream 7: FREE
```

Unfortunately, due to an errata in the F4 processors ONLY (see [https://www.st.com/resource/en/errata_sheet/dm00037591-stm32f405407xx-and-stm32f415417xx-device-limitations-stmicroelectronics.pdf], section 2.1.10) it is not possible to use DMA on SPI bus 1 and bit-banged DSHOT at the same time. Therefore, if bit-banged DSHOT is enabled, you may see `locked` in the `status` output, but not `dma`. If you try disabling bit-banged DSHOT, to enable DMA, you may get DMA resource conflicts due to the `MOTOR 1` through `MOTOR 4` DMA descriptors conflicting with the SPI used for FLASH, OSD and sometimes LED functions. RPM filtering, Flash, LEDs or OSD may then not work.

When DMA is not available for OSD, a very simple OSD configuration is recommended, to minimise the time taken for the data transfer.

The following give examples of how an advanced user can optimise their setup.

For example, on a MATEKF411 with bit-banged DSHOT enabled we see SPI bus 1 and 2 enabled, but no gyro DMA.

```text
# status
MCU F411 Clock=108MHz (PLLP-HSE), Vref=3.30V, Core temp=30degC
...
Gyros detected: gyro 1 locked
GYRO=MPU6000, ACC=MPU6000
...

# dma show

Currently active DMA:
--------------------
DMA1 Stream 0: FREE
DMA1 Stream 1: FREE
DMA1 Stream 2: FREE
DMA1 Stream 3: SPI_MISO 2
DMA1 Stream 4: SPI_MOSI 2
DMA1 Stream 5: FREE
DMA1 Stream 6: FREE
DMA1 Stream 7: FREE
DMA2 Stream 0: SPI_MISO 1
DMA2 Stream 1: DSHOT_BITBANG 2
DMA2 Stream 2: FREE
DMA2 Stream 3: SPI_MOSI 1
DMA2 Stream 4: ADC 1
DMA2 Stream 5: FREE
DMA2 Stream 6: FREE
DMA2 Stream 7: FREE
```

With bit-banged DSHOT enabled we see only SPI bus 1 enabled, with gyro DMA. SPI bus 2, used for the OSD can't use DMA as the necessary resources are being used for `MOTOR 4` and `MOTOR 1`. Thus, whilst flight performance will improve in this configuration, the OSD updates won't run as fast, so only a simple OSD display should be used.

```text
# status
MCU F411 Clock=108MHz (PLLP-HSE), Vref=3.30V, Core temp=30degC
...
Gyros detected: gyro 1 locked dma
GYRO=MPU6000, ACC=MPU6000
...

# dma show

Currently active DMA:
--------------------
DMA1 Stream 0: MOTOR 3
DMA1 Stream 1: FREE
DMA1 Stream 2: FREE
DMA1 Stream 3: MOTOR 4
DMA1 Stream 4: MOTOR 1
DMA1 Stream 5: MOTOR 2
DMA1 Stream 6: FREE
DMA1 Stream 7: FREE
DMA2 Stream 0: SPI_MISO 1
DMA2 Stream 1: FREE
DMA2 Stream 2: FREE
DMA2 Stream 3: SPI_MOSI 1
DMA2 Stream 4: ADC 1
DMA2 Stream 5: FREE
DMA2 Stream 6: FREE
DMA2 Stream 7: FREE
```

On a FURYF4OSD if bit-banged DSHOT is enabled then gyro DMA won't be available, but both busses 2 and 3, used for OSD and FLASH respectively are available.

```text
# status
MCU F40X Clock=168MHz (PLLP-HSE), Vref=3.26V, Core temp=51degC
...
Gyros detected: gyro 1 locked
GYRO=MPU6000, ACC=MPU6000
...

# dma show

Currently active DMA:
--------------------
DMA1 Stream 0: SPI_MISO 3
DMA1 Stream 1: FREE
DMA1 Stream 2: LED_STRIP
DMA1 Stream 3: SPI_MISO 2
DMA1 Stream 4: SPI_MOSI 2
DMA1 Stream 5: SPI_MOSI 3
DMA1 Stream 6: FREE
DMA1 Stream 7: FREE
DMA2 Stream 0: SPI_MISO 1
DMA2 Stream 1: DSHOT_BITBANG 1
DMA2 Stream 2: DSHOT_BITBANG 2
DMA2 Stream 3: SPI_MOSI 1
DMA2 Stream 4: ADC 1
DMA2 Stream 5: FREE
DMA2 Stream 6: FREE
DMA2 Stream 7: FREE
```

If it is disabled, thanks to the careful consideration of which pins are used for the motor outputs, all SPI busses support DMA giving optimal flight performance. Note though that `LED_STRIP` can no longer be allocated `DMA1 Stream 2` as it is used by `MOTOR 3`. Given the choice between flashing LEDs and optimal flight performance this is an easy decision to make, but it illustrates some compromises
which may need to be made for the best flight performance.

```text
# status
MCU F40X Clock=168MHz (PLLP-HSE), Vref=3.26V, Core temp=51degC
...
Gyros detected: gyro 1 locked dma
GYRO=MPU6000, ACC=MPU6000
...

# dma show

Currently active DMA:
--------------------
DMA1 Stream 0: SPI_MISO 3
DMA1 Stream 1: MOTOR 4
DMA1 Stream 2: MOTOR 3
DMA1 Stream 3: SPI_MISO 2
DMA1 Stream 4: SPI_MOSI 2
DMA1 Stream 5: SPI_MOSI 3
DMA1 Stream 6: MOTOR 1
DMA1 Stream 7: MOTOR 2
DMA2 Stream 0: SPI_MISO 1
DMA2 Stream 1: FREE
DMA2 Stream 2: FREE
DMA2 Stream 3: SPI_MOSI 1
DMA2 Stream 4: ADC 1
DMA2 Stream 5: FREE
DMA2 Stream 6: FREE
DMA2 Stream 7: FREE
```

## Anti-aliasing of gyro data for 4k PID loops

When running a 4k PID loop, we strongly recommend keeping the gyro lowpass 2 filter active. If you want to drop to a single gyro lowpass filter, keep lowpass 2.

The reason is that lowpass 2 is a very effective anti-aliasing filter, when downsampling the gyro from 8k to 4k. If gyro lowpass 2 is disabled, and the board is running at 4k, a simple 2-point averaging filter will be enabled in its place. This is not as good an anti-aliasing filter as a PT1 filter at 1000hz, and nowhere near as good as 500hz.

For 2k PID loops, a 500hz PT1 lowpass 2 gyro filter is absolutely essential.

Most clean 4k quads will run great with gyro lowpass 1 turned off, and just a single gyro lowpass 2 filter at 500hz.

8k PID loops have no aliasing issues, so gyro lowpass 2 can be disabled without aliasing concerns, however the quad must be 'clean' to turn off all gyro filtering.

## Multi dynamic notch

The new SDFT (Sliding Discrete Fourier Transform) based dynamic notch filter can track multiple independent noise peaks, and will assign an independent notch filter to each peak. The user can specify up to 5 notches per axis. Usually no more than two or three are needed, depending on the build, and often only one.

The SDFT tracks noise sources much more effectively than before. The code is completely different. It has been optimised to control resonance problems when used in association with RPM filtering. The RPM filter is still best for RPM related noise.

Q values around 300-450 work well for freestyle applications. Keeping the minimum value as high as practical (eg 200hz), and only using the minimum number of notches, will minimise notch related filter 'delay'.

To tune the dynamic notch properly, make a log with the dynamic notch off, do a spectrum analysis and see if there is resonance that needs to be controlled, and what the resonant frequencies are. Set the dynamic notch range to include the resonant peaks including 20hz additional range each side of the noise so as to be sure to fully filter the necessary frequencies. Then fly again, and check that the incoming resonance lines have gone from your gyro traces. Then repeat with higher Q values to find the highest Q value that adequately control those resonances.

For quads that cannot run RPM filtering, the SDFT code will work reasonably effectively if configured with three or four notches and Q values around 120-150. These wider notches help account for rapidly changing center frequencies of motor frequency driven oscillations observed by the gyro, as the multi dynamic notch cannot respond as quickly as the bidirectional DShot driven RPM filter notches, but do perform remarkably well on a wide variety of craft.

The multi dynamic notch can still be used alongside static notches applied to gyro and D-Term values. Static notches work best at targeting constant frequency resonance. If you find you have a strong constant frequency resonance you may be required to apply a narrow static notch over the frequency resonance in the gyro or D Term to capture any residue noise left over from SDFT. For craft with specific known static frequencies, such as frame resonance, a manually added static notch with the correct cutoff should outperform the multi-dynamic notch, and also allow for using the multi dynamic notch frequency range of regard to be larger. If a craft has a specific resonance that is present at exactly one frequency across the entire throttle and flight condition envelope, adding static notch and reducing the multi dynamic notch count by one is a recommendation.

Adjusting the range of the multi dynamic notch _does_ result in adjusting the bin sizes that the SDFT algorithm uses, although as second quadratic estimation step is included that centers each dynamic notch on the most accurate estimate of center frequency using data from both adjacent bins. Increasing the range between the MinHz value and MaxHz value will trade off some resolution for a wider frequency range of regard, and can have the dynamic notch system respond faster to changes in frequency, which can be helpful in suppressing quickly changing resonances at higher frequency.

For more detail see [PR #10554](https://github.com/betaflight/betaflight/pull/10554)

## PT3 based RC smoothing

The RC smoothing system has been simplified and improved. Cinematic or HD pilots can now get amazingly smooth results that were impossible before.

The old linear interpolation method has been removed because the PT3 filter-based method works better (no overshooting, lower latency, better tunability).

We very strongly recommend keeping rc smoothing 'on' at all times - ie with `set rc_smoothing = ON`. If you turn it off, your motors will get very notchy drive signals, run hotter and noisier, and lower link speeds will shake the quad at link frequency.

The auto smoothing algorithm hasn't changed, It detects your RC link speed on arming, sets the RC smoothing cutoffs automatically, and changes their values if the link speed changes in-flight (though it takes a while to do so).

The default auto smoothing value is now 30, which gives a reasonably well-smoothed setpoint line and very little delay when compared to the un-smoothed signal.

For HD freestyle, an auto value of 60 will provide greater smoothness and not a whole lot of extra delay.

For cinematic video, where absolute smoothness is needed, auto values around 90-120 will give that silky effortless smoothness you are after, at the cost of obvious stick delay. In association with jitter reduction and feedforward smoothing, most cinematic footage will be incredibly smooth.

The auto smoothing function adjusts the filters to give the least delay for the given link speed. At higher link speeds, the smoothing filters run faster, and give quicker stick responses.

For cinematic flying with a fast radio link, and for crossfire in a non-locked mode, it may be best to manually over-ride the auto smoothing, to get a consistent amount of smoothness throughout the flight, and across builds with different radio links. This can be done by setting fixed, non-auto, values in the CLI. For cinematic purposes, 10-15hz works well, regardless of link speeds. This snippet should work:

```text
set rc_smoothing_setpoint_cutoff = 10
set rc_smoothing_feedforward_cutoff = 10
```

The same applies to non-locked crossfire, which can swap between 50Hz and 150Hz, randomly. Here a value of 20-30hz will give reasonably consistent stick feel and reasonable smoothness even in 50hz mode:

```text
set rc_smoothing_setpoint_cutoff = 25
set rc_smoothing_feedforward_cutoff = 25
```

We generally don't advise going below 30 for auto smoothness, though at high link speeds, eg 250 or 500hz, a value of 20 may be good for racing, by keeping delay to the absolute minimum. There will be some transfer of the RC link frequencies into your motors, but not much. If you can hear a difference, or your motors run warmer, go back to 30.

In most cases, stick with the default auto smoothing, and once you've decided on your radio link speed, or after changing radios, adjust the auto smoothing value to get the result your after.

RC smoothing value for throttle is independently adjustable, automatically or manually. Its best left at 30, unless you are a high link speed racer and want to try 20. To avoid throttle jumps on a cinematic build, go higher, but be wary of throttle lag when you need to pull up from a dive :-)

RC smoothing is now applied equally to setpoint and feedforward in Auto mode. The log header will show the actual frequencies being used with your link. In the CLI you can manually configure the amount of smoothing on feedforward relative to setpoint. Testing to date has not shown this option to be clearly useful, in any practical sense, and likely it will be removed down the track. It makes more sense to control stepping in feedforward by using feedforward smoothing (feedforward_smooth_factor); heavy RC smoothing on feedforward is ineffective against link jitter and will add a lot of delay.

For more detail see [PR #10650](https://github.com/betaflight/betaflight/pull/10650)

## RPM crossfading

This is a brilliant improvement over normal RPM filtering, which gives much cleaner motor signals at low to mid-throttle, and improves propwash considerably. Basically we now can have the RPM filtering benefits when we need them, with none of the drawbacks when they are not needed.

We discovered that notch filters operate by generating an 'anti-noise' signal at their specified cutoff frequency. They don't generate 'delay' in the conventional sense. Not in the same way that a lowpass filter does. They make a signal which, when mixed with the original, 'cancels out' the noise in the original signal.

This means that we can attenuate a notch filter in a linear fashion, by 'cross-fading', or 'mixing', it's 'anti-noise' signal in, or out, like an audio mixer.

This is extremely useful for RPM filtering. Previously, when any motor went below the minimum RPM frequency, its three RPM notches would all remain active, but be held at their minimum frequency. While there was no noise to remove, they generated 'delay' and reacted to nearby frequencies, and causing a form of intermodulation distortion, and worsening propwash.

Now, we can essentially 'turn the RPM filters off' when they aren't needed, and bring them back on smoothly over a 'cross-fade' range above the minimum rpm value.

Once the rpm filters are completely 'off', they cause no delay or interference of any kind, resulting in cleaner and better gyro traces than before.

In most builds, significant RPM related noise doesn't start to happen until about 100hz (6000 rpm). So we can start the RPM filtering at say 80hz and cross-fade it over 50hz, so that by 130hz, or 10,000 rpm, you have full RPM filtering active again. eg:

```text
set rpm_filter_min_hz = 80
set rpm_filter_fade_range_hz = 50
```

We have found a cross-fade range of 50hz to be optimal in most cases.

The default minimum RPM value, where RPM first starts to 'switch on', at 80hz, also works well for most quads. Machines with very clean props and very little intrinsic RPM noise can have this value shifted higher, eg

```text
set rpm_filter_min_hz = 100
set rpm_filter_fade_range_hz = 70
```

Very large quads with low RPM we would choose proportionally lower values since they operate at low RPM.

Tuning for Crossfade requires enabling the dshot_telemetry debug, doing some smooth steady throttle-ups, from zero to 50%, with no other stick inputs, and then add throttle cuts. It's best to set PIDs low with heavy filtering on D to take out D noise. Using the debug traces, look at the point where the motor RPM falls into the cross-fade region, and see if motor RPM related noise is getting into the gyro trace. If the minimum rpm is set too high, you'll get significant motor noise leaking through the crossfade region. If you're not sure what you're seeing, set the cross-fade minimum very high. This will effectively disable RPM filtering at lower RPM and let the noise through. If you set the minimum with a very low crossfade value, eg 10; there will be a sudden change when the rpm filtering kicks in. The minimum should be set to a point below where rpm noise becomes an issue, and the crossfade range can be extended upwards until it too allows some, but not too much bleed-through, in the upper cross-over region. The goal is the highest values consistent with reasonable attenuation of the motor noise.

For more detail see [PR #10757](https://github.com/betaflight/betaflight/pull/10757)

## Feedforward jitter reduction

This is a really exciting change that gives real smoothness when you want it, while giving as much feedforward 'snap' as you could want with quick stick inputs. Perfect for smooth fast racing and for 'flick' freestyle inputs.

It completely removes the need to use the old Dterm/feedforward 'transition' function, which provided feedforward attenuation only when sticks are centered. This provides similar attenuation at any position while the sticks are still, or moving slowly.

Feedforward, especially with boost, is known as the 'stick responsiveness' parameter, and for good reason. It provides a strong and immediate reaction to stick inputs. A good amount of feedforward (say 120-130) will make the quad super responsive, without adding overshoot. It gives those 'snap' freestyle inputs extra zing, and gives race pilots near-zero setpoint-to-gyro lag.

However, it accentuates even the tiniest of RC inputs, and can make for twitchy flight and jerkiness in HD video. It doesn't matter if those RC twitches come from nervousness, slightly sticky or noisy gimbals, RC link connection problems, they all get exaggerated by feedforward... Until now.

The 'old' way to handle these 'jitters' was to use feedforward transition, which linearly attenuated feedforward down to zero when your sticks were close to the center position. This solved the problem of 'too much feedforward' at center stick position - but nowhere else.

Transition has a number of limitations. It only works when the sticks are centered; if you are in a smooth turn, with sticks off-center, but still, you want smooth flight also. However transition is much less effective in this setting. Also, when moving the sticks across the center, in a smooth move, transition will cut the feedforward out abruptly at center, causing a wobble, worst with narrow transition ranges. If you do make the transition range wide, all feedforward benefit is lost in the middle, and 'snap flicks' become hard to achieve.

Jitter reduction attenuates feedforward strongly when the sticks are moving slowly, regardless of their absolute position.

Think of it as a kind of 'dynamic transition' function.

The default `jitter_reduction_factor` of 7 works best for most quads with normal radio links, and is suitable for racing, ensuring that tight turns, and high-speed straights, are both smooth and responsive.

Experienced race pilots with higher speed links will find that the straight-line sensitivity will be a bit less than normal, because for very small inputs, their feedforward 'push' is attenuated. They may prefer a value of 5. After a few flights we find that the quad 'stays on the intended line' a fair bit better than before, especially during tighter turns, which feel more 'on rails' than before.

A value of 12-15 pretty much removes all feedforward from slow smooth inputs, and is what we suggest for freestyle/cinematic. The quad will be equally smooth in straight centered flight and in a sustained tight turns. However, if you flick the sticks, the response will be immediate.

How it does this magic is simple, in principle. We look at how much the RC command values change from packet to packet, average the two most recent change amounts, and compare that average to a user-configured threshold. We then fade out the feedforward values when the recent rate of RC change is below the threshold. But when the RC command changes are bigger than the threshold, we let feedforward through, unchanged and without any delay, to give immediate snap responses when we move the sticks quickly.

The `jitter_reduction_factor` value is the threshold for the RC Command change, in tenths of a percent of stick travel, below which feed-forward is attenuated. A value of 10 means feedforward will be attenuated progressively for RC command changes of less than 1% per step. Attenuation below the threshold follows a kind of exponential curve, so that with a value of 10, there will be barely 10-20% of the normal feedforward for rcCommand change steps of 0.1% to 0.2% of the full RC range.

Both link frequency and link bit depth have an impact on a suitable jitter reduction value. At low link frequencies, eg 50hz, most RC steps are large, and there really isn't much of a jitter issue to worry about. So the defaults and the suggested freestyle values actually do OK for 50hz to 150hz.

Higher link speeds, 250Hz and above, run into a problem where there is only a limited number of steps available, and not much time for a change to be detected. Crossfire and FrSky protocols only provide 800 steps across the full RC range, or only 400 steps from center to max position. If the pilot moves the stick slowly over one second to max, some RC steps will be one, and others two, packets high. Small steps like that vary by 100% from step to step, leading to a lot of jitter in feedforward, which thinks that the sticks are shaking massively. The person's intrinsic jitter and the gimbal itself makes jitter noise of at least this magnitude, and feedforward would ordinarily amplify it - just like D amplifies gyro noise.

This is where the jitter reduction code helps remove that residual noise in higher speed links; its kind of like a dynamic, zero delay filter, applied to feedforward when the signal to noise ratio would be bad. It applies first order filtering to the simple setpoint derivative and second order filtering to the boost element.

Hence the jitter reduction system markedly reduces gimbal jitter on all systems, but is most effective, and important, in higher link rate systems with only 800 steps. For that reason we suggest keeping it at the default value on all RC links, increasing it for freestyle and cinematic, and maybe dropping back to 5 but only on clean RC links for race purposes.

The newer 11 and 12 bit RC link protocols with 2000 steps will provide better resolution, however gimbal noise will remain a problem, and hence the jitter reduction code is likely to remain needed for the foreseeable future.

For more detail see [PR #10670](https://github.com/betaflight/betaflight/pull/10670)

## Feedforward smoothing settings for faster Rx links

The old `ff_smooth_factor` code has been updated, and it is now named `feedforward_smooth_factor`. It provides second order step height smoothing for boost, as well as the usual first order smoothing to the simple derivative. This gives more effective smoothing of the boost signal with less delay to the simple derivative.

A suitable starting value of 25 is adequate for most builds.

For 250hz RC links, you should set `feedforward_smooth_factor` to 40-50, and `feedforward_averaging` to `2_point`.

For 500hx RC links, you **must** set `feedforward_smooth_factor` to 65-70, and `feedforward_averaging` to `2_point`.

### Other Feedforward changes

A number of small, but significant, feedforward changes result in a smoother signal with less delay.

All parameters in the CLI that relate to feedforward now start with `feedforward`, not `ff_`. Go `get feed` to list them all.

`feedforward_averaging` is now set to 'off' by default, since most builds won't require it. It should be set to `3_POINT` to provide three point moving averaging for old Crossfire 150 links. All 500hz RC links and nearly all 250hz RC links benefit from `2_POINT` feedforward averaging, but the new jitter reduction code means that most links running below 250hz (FrSky, Crossfire, etc) do not require any feedforward averaging.

`feedforward_max_rate_limit` replaces `ff_max_rate_limit` and is the value that pulls back on feedforward as the sticks approach their maximum rate, minimising overshoot when hitting max stick position. A bug that limited its usefulness has been fixed. The default value of 90 works best for most quads. Under-powered quads may need 100.

Duplicate packet interpolation has been improved. Since duplicates occur frequently at slow stick movement speeds, we now use the jitter reduction value to attenuate the interpolation process, so that we interpolate very little when the sticks are moving very slowly.

These changes give us a much smoother but super responsive feedforward system.

## AntiGravity improvements

Antigravity now increases P during hard throttle chops, since the abrupt change in pitch angle needs more than I term response to control it. Additionally, the timing of the I boost has been changed to better match the timing of the wobble.

The default is now only 3.5, reflecting the greater efficiency of the new code.

CAUTION: it is unwise to run very high AntiGravity values in 4.3, because you run the risk of significant P and I wobble during throttle chops.

Stick to values close to defaults.

If you do want to increase AntiGravity, test it methodically. High values, eg 5 or more, may not achieve much more than normal values; use the lowest value consistent with reasonable control.

See [#10163](https://github.com/betaflight/betaflight/pull/10163) for more detail.

## Dynamic gyro filter expo curve

`dyn_lpf_gyro_curve_expo` allows the dynamic lowpass filter cutoff value to rise more quickly with throttle increases than it used to. It works much the same as the D lowpass expo.

This reduces delay at higher throttle positions. If you get significantly more high frequency noise at higher throttle, reduce the amount of expo, or reduce the upper value of the dynamic lowpass cutoff.

For graphs see [PR9486](https://github.com/betaflight/betaflight/pull/9486).

## Improved dynamic idle

The new dynamic idle code now uses a full PID controller, and is much simpler to configure. It improves desync resistance and low throttle authority.

Do not follow the old 4.2 instructions. You don't need to measure RPM in the motors tab any more. All you have to do is:

- enable DShot Telemetry
- go to the PID tuning tab and set Dynamic Idle Min RPM to a value between 30 and 40 (ie, a minimum idle speed of 3000 to 4000 RPM).

NOTES:

- If DShot Telemetry is enabled, but it isn't working properly, you won't be able to arm.
- DShot Telemetry must be enabled for RPM filtering or Dynamic Idle to work.
- If DShot Telemetry is not enabled, Dynamic Idle will be disabled, and the 'static' DShot Idle percentage will be used.
- When Dynamic Idle is active, DShot Idle is rendered inactive, and is greyed out.
- There is no need to adjust DShot Idle to use Dynamic Idle. Leave it at whatever value you find works best.
- If the ESC supports DShot telemetry, you can now use Dynamic Idle even if you prefer not to use RPM filtering

The new code in 4.3 does not require any special adjustments to the DShot Idle percent value; just leave it at whatever value works best in the non-dynamic idle setting.

On arming, and until airmode is active, you will not get the full Dynamic Idle minimum RPM. Your motors won't spin super fast on first arming, because there is a limit on the drive to the motors until Airmode activates. Dynamic Idle therefore acts as a kind of sophisticated 'idle up' function that provides all the benefits of the old manual in-flight idle-up switches, but without the drawbacks.

With high minimum RPM, the motors retain RPM at all times, leading to more responsiveness at zero throttle, cleaner flips and rolls, and neater turns. At high values, the slowest motors will provide thrust during flips, rather than almost stalling, and the quad will tend to perform a kind of circle in the sky. The same happens on 180 degree turns, which become little arcs.

Also, with high minimum RPM high, the quad will be slower to lose altitude in 'right-side-up' flat throttle chops, because the motors will generate some upwards thrust all the time. This isn't all that bad, and will also enhance stability and authority in these moves, which can otherwise suffer badly from propwash.

In both cases, high minimum RPM helps avoid propwash since you tend to always move through clean air; this make a lot of sense when flying freestyle or fast racing.

With high minimum RPM, a big punch upwards followed by a 180 turn to inverted, and a hard throttle cut, will not float upwards quite as high, because the motors will deliver more downwards thrust because RPM will be higher than otherwise. However, when the quad starts falling downwards, and the airflow into to the props allows dynamic idle to cut drive to the motors, the motor drive can fall to zero, and the inverted hang should be not much different from usual.

For maximum inverted hang time, and probably for Line Of Sight flying, use the lowest minimum RPM value that avoids desyncs.

Most users with desync-prone setups will find that Dynamic Idle solves their problems. As you move the minimum RPM upwards, the chance of a desync decreases, and vice versa.

If Dynamic Idle doesn't work for you, set it to zero and you will revert to the static DShot Idle Percent method.

The new code is so good that many of my quads can fly with only 1000 rpm as a minimum dynamic idle RPM. The prop blades are visible turning slowly during LOS flips and rolls, but they don't desync. I wouldn't recommend going that low unless you had a particular curiosity to see how low you can go.

For most general freestyle or racing applications, a minimum RPM of 4000 usually works really well.

Tuning:

In place of the `idle_adjustment_speed` and `idle_p` tuning settings, we now have a PID controller. This provides more precise RPM control.

Typically higher power quads will need lower P values, eg 40 for a strong 6S build, and those with lower authority may benefit from higher PID values.

The best way to check RPM control stability is to log with the appropriate Debug, and do some flat drops at zero throttle. If the RPM value oscillates, try less P. If it is stable during the drop, but transiently drops below target on the chop, add more D and/or more P.

For more detail see [PR #10294](https://github.com/betaflight/betaflight/pull/10294)

## Linear and Dynamic mixer options

When airmode is active, the default betaflight mixer prioritises PID authority over throttle. Anytime a motor might need to be driven 'below zero' in order to maintain authority, throttle is increased by airmode so that the requested motor differential can be achieved.

This airmode-driven throttle increase is the only reason why we can flip and roll 'normally' at zero throttle.

However, there are downsides. Airmode leads to strong reactions on impacts; the quad will get more throttle and climb. There is a fairly abrupt change in authority once the limits that Airmode can provide are reached.

These alternate mixer models change the relative emphasis between throttle authority and PID control.

They may have some use in smooth cinematic flying styles, providing a kind of partial airmode effect with less bounce on landing at the expense of limited low throttle PID performance in quicker moves. If interested, just fly and see if you like them or not.

For more detail see [PR #10370](https://github.com/betaflight/betaflight/pull/10370)

## Feedforward in Level and Horizon Modes

In 4.3, feedforward now is available in Level, Level Race, and Horizon modes.

In Level Mode, this results in a more immediate response when moving the sticks to change the angle of the quad. The quad should more promptly assume your new intended angle.

In Horizon Mode, while flying aggressively, the behavior is now nearly exactly the same as acro, with all the benefits that feedforward brings in terms of immediate stick response and reduced overshoot. It feels great!

If you're a beginner and you find Level too twitchy, reduce the feedforward value in the PIDs.

For more detail see [PR #10778](https://github.com/betaflight/betaflight/pull/10778)

## Actual Rates as the new Betaflight default

Starting from 4.3, Actual Rates will be the new Betaflight default. See PR #10724 for graphs and more information.

`ACTUAL` rates lets you set both the target center sensitivity and the maximum roll rate in degrees/second.

The two values are independent of each other.

Expo shifts the transition point between the two rates to be closer to center (at zero) or further out (at max).

This online calculator allows visualisation of Betaflight rates vs Actual Rates.

The new defaults are NOT exactly the same as the old Betaflight rates. Although the max rate is the same (670 deg/s), the new defaults are softer in the center (center sensitivity of 70, compared to about 200 in Betaflight's old defaults), and more responsive further out. See the [image in the pull request](https://github.com/betaflight/betaflight/pull/10724).

It is hoped that these will be easier to learn on and better suited to freestyle.

Some experienced race pilots use 200deg/s center sensitivity and 620 max, with no expo. With the jitter reduction code, 200deg/s gives very quick turn-in but remains smooth and controllable in tight turns. Others prefer lower values.

Betaflight rates users can use this [rates calculator](https://www.desmos.com/calculator/r5pkxlxhtb) to find an Actual rates equivalent to what they currently fly. For instance, center of 200, max 670, and expo of 0.58 results in the original default Betaflight rates curve.

If a user pastes in their Betaflight rates numbers from say a 'diff all', the `rates_type` information will not be included. The result will be that Actual Rates will be active, but with Betaflight CLI numbers. The quad will be un-flyable! That's why its a bad idea to copy and paste diff all's. Be sure to recreate your Rates manually, or, if you do a copy and paste, be sure to include the `rates_type` line from the CLI dump command when pasting your rates in.

For more detail see [PR #10724](https://github.com/betaflight/betaflight/pull/10724)

## PT2 and PT3 lowpass filtering options

In the past, the second-order Biquad filter was available as an option for gyro and D smoothing, when first-order filtering wasn't enough. Sometimes this was the case with Bosch gyros. However, we have learned that the Biquad can oscillate with step inputs and will overshoot some inputs with frequency content near cutoff. 4.3 no longer uses the Biquad for any lowpass filtering. Biquad filtering is still an option for both gyro and D lowpass filtering for those who feel it has specific benefit there.

If your craft needed second order gyro filtering, we recommend the PT2 option, which works much the same as stacked PT1 filters, but with the cutoff adjusted to be correct. The PT2 filtering option provides less delay than the equivalent Biquad filter, though a bit less filtering, and is recommended to be used instead of the Biquad filter. PT3 filtering provides more filtering and delay than the equivalent Biquad filter and is not normally needed for gyro or D filtering.

Compared to a PT1, filter delay increases by about 60% with a PT2 and doubles with a PT3.

For more detail see [PR #10727](https://github.com/betaflight/betaflight/pull/10727)

## CrossfireV3 and Ghost RC link improvements

4.3 has a fully float based internal RC data path, resulting in no aliasing or loss of resolution regardless of RC packet contents. We also support Crossfire V3 and 11bit Ghost protocols.

We also better support very low frequency link rates - down to 16hz - by constraining the RC smoothing, and avoiding false packet timeout errors which would otherwise trash feedforward And we support up to 1000hz links by allowing deviations to 950ns without declaring an error.

Blackbox logs now show un-smoothed rcCommand, and the RC and feedforward debugs show un-smoothed Roll setpoint and other useful data for RC link quality and resolution checking.

## Improved altitude estimation with baro and gps

When you have both GPS and baro and fly without waiting for GPS fix, there was wrong altitude estimation (up to 100 meters error). Now it's fixed. Baro is used until GPS captures required number of sats. New cli options introduced to configure behavior:

`position_alt_gps_min_sats` - the required number of sats to start using both GPS and baro.
`position_alt_baro_fallback_sats` - the required number of sats to stop using GPS and switch back to baro.

You can increase those values if you have a good GPS receiver that quickly receives many sats. Or decrease them if you have not so good hardware / zone. Also you should lower values if you have a bad baro and want to switch to GPS as early as possible.

## Configurator improvements

Configurator has been overhauled with support for the new Sliders and the new Presets tab.

New motor mapping and motor rotation functions in the Motors tab make those frustrating tasks much easier.

Before flashing, we have a new "Auto-Detect" function that selects the correct firmware for your board, with the ability to re-check

The interface itself has been tidied up, and a bunch of bugs have been fixed.

---

### Credits

**- Firmware PR management - Mikeller**

**- Configurator and Blackbox - Haslinghuis, Limon, Asizon, ctzsnooze, McGiverGim, Mikeller, Blckmn **

**- Presets - Limon, Mikeller, ctzsnooze**

**- Sliders - Haslinghuis, UAVTech/spatzengr, IllusionFPV, Asizon, ctzsnooze**

**- Looptime, scheduler, DMA, Gyro EXTI, improved logging and OSD efficiency - Steve C Evans, many massive PR's :-)**

**- Multi dynamic SDFT notch, filters - Karatebrot #10554**

**- RPM crossfading - Karatebrot #10757**

**- RC smoothing - ctzsnooze #10629, #10650**

**- Feedforward jitter reduction - ctzsnooze #10670**

**- Feedforward smoothing - ctzsnooze - #10164**

**- Antigravity - ctzsnooze #10163**

**- Expo on Gyro LPF - IllusionFPV #10239**

**- Linear and Dynamic mixer options - TylerCorleone, BorisB #10370**

**- Dynamic idle improvements - ctzsnooze #10294**

\*\*- ELRS over SPI - Phobos, Joe, Alessandro

**- Configurator brilliance - Haslinghuis, McGiverGim, Limon, Asizon**

**- LUA Script - klutvott123, kristjanbjarni, codecae**

**- Feedforward in level and horizon - ctzsnooze #10778**

**- PT2 and PT3 lowpass filter options - ctzsnooze #10727**

**- RC Link improvements - TBS #10675, Stepan Dalecky #10801**

**- default to Actual rates - ctzsnooze #10724**

**- 4.3 Tuning Notes - ctzsnooze, editing by SupaflyFPV**

**- Bugfixes - lots of people!**

**- Keeping everyone and everything on track - blckmn, mikeller**

- Encouragement and testing - **Brian White, James, SugarK, Cory Ibanez, Tehllama42, SupaflyFPV, UAVTech, QuadMcFly, Limon, bizmar**, and so many others : **thank you!**

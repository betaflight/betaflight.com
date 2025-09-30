# Freestyle Tuning Principles

## This is a work in progress and not a final document.

> Authors: Elia Palme, Daniel Appel, Hugo Chiang(DusKing1), Mark Spatz and co.

## Motivation

Provide easy and simple guidelines to set-up Betaflight for freestyle.

While Betaflight benefits from a large and vivid developers community
with frequent updates and new features releases, it has often been
criticized by freestyle pilots for being too complicated to use and hard
to keep up with.

This guide aims to provide simple guiding principles and tune
suggestions to make the best out of Betaflight for freestyle purposes.

Note: before editing this guide consider discussing changes on the original [document](https://docs.google.com/document/d/1ki5_OdsD6xIo6t1pZLV04wH0uaplabWEtOenDJmnYX4).

## Principles and Attributes

Freestyle is mainly about the footage of a smooth and precise acrobatic
flight.

To achieve such goals a freestyle quad should be tuned with the
following principles in mind:

1.  Optimized for smoothness over low latency and sharp control.

> Freestyle pilots tend to prefer a smoother and "looser"
> quad over an extremely reactive (brain reading feeling) one. Mainly
> because it helps to smooth out micro correction and makes the footage
> look more organic and fluid.

2.  Optimized to behave predictively and with consistency.

> Consistency helps pilots to build muscle memory and get a feel of the
> quad, hence gain confidence and precision. One among the best pilots,
> Mr. Steel is known for running the same setup for several years and he
> very rarely makes changes to it.

With the above principles in mind we can distill three attributes we
should optimize for:

|                    |                                                                                                                                                                                                                                                                                                                                        |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Consistency**    | Consistency is the ability of the craft to behave based in a consistent and predictable manner given the provided stick inputs. The more predictable is the quad behaving the more **precision and confidence the pilot will gain**.                                                                                                   |
| **Attitude Hold**  | Attitude hold is the ability of the craft to keep it’s trajectory and behave as expected. A quadcopter with good attitude resists changes in orientation from outside forces, and responds only to user stick inputs. These outside forces can include wind, propwash, vibrations, and other forces. Attitude provides **smoothness**. |
| **Responsiveness** | Responsiveness is the ability of the craft to track setpoint (stick inputs) as close as possible. A responsive quad has very **low latency and feels connected**.                                                                                                                                                                      |

In theory all three attributes are equally important in practice an
increase of responsiveness might affect the pilot ability to fly
smoothly and consistently.

Therefore it is advised to compromise on responsiveness to keep the
quad behaving in a predictive and consistent manner

## Betaflight Tune

**Important note:** the suggested tuning values are intended for a typical 5" setup either 6S with [1600 to 1800] KV motors or 4S with [2400-2600] KV motors.

### VBat Sag Compensation

This feature aims to provide motor response consistency across the
entire flight ([BF doc ref](/docs/wiki/tuning/4-2-Tuning-Notes#dynamic-battery-sag-compensation).
By enabling VBat Sag Compensation the craft will fly more consistently
and predictively.

If you plan to use this feature it's crucial to enable it before
performing the PID tuning.

#### Suggested setting: values for a 5"

|                                           | **Value**       |
| ----------------------------------------- | --------------- |
| **VBat Sag Period (vbat_sag_lpf_period)** | 200 (20 second) |
| **VBat compensation**                     | 40-70           |

#### :bulb: Advanced Considerations

<details>
  <summary>Click to expand!</summary>

VBatSagCompensation works by adjusting the overall motor outputs depending on battery voltage. Using higher values of VBatSagCompensation, such as 100, will attempt to completely eliminate reduction in power from battery response down to the 3.3V/cell threshold. This will reduce opportunities for a pilot to perceive battery sag .While a very consistent response for the same throttle inputs from the start of a flight towards the end of the flight is great, the inherent risk with this approach is that flight performance will go from nominal to battery dropping below 3.0V/cell very quickly if all the battery capacity is used. For this reason, many pilots would prefer to run lower values if they are accustomed to using the battery sag response to gauge when it is prudent to land.

Due to the chemistry of Lithium Polymer batteries, operating them below 3.0V/cell results in plating lithium onto the anode, which permanently reduces both the capacity and to a peak discharge capability of the battery. This is to be avoided if at all possible.

</details>

## PID

PID are at the core of a quad tuning, with PID tuning we can achieve a
good quadcopter attitude.

D is the most important PID term to achieve smooth flying, D helps to
minimize propwash as well as dampening any quads movement. Freestyle
quads tend to use higher D gains.

To counterbalance a higher than usual D gain P needs to be increased as
well.

A simple approach to tune P and D is to set a desired D gain (e.g. 45)
and slowly increase P as high as possible without producing any bounce
back on flips and rolls (see [UAV Tech video](https://www.youtube.com/watch?v=qK5APBg76AU)).

The I term is generally good enough on default, however if the quad
feels sloppy increasing the gain could improve the overall attitude.

### Suggested settings: values for a 5"

|           | **P** | **I**  | **D** |
| --------- | ----- | ------ | ----- |
| **Roll**  | 60-70 | 90-100 | 40-50 |
| **Pitch** | 60-70 | 90-100 | 40-50 |
| **Yaw**   | 30-40 | 90-100 | 0     |

### :bulb: Advanced Considerations

<details>
  <summary>Click to expand!</summary>

**Equal setpoint tracking latency across axes**

To further improve consistency it's important to properly tune all axes
(Roll, Pitch and Yaw) this will ensure that the setpoint tracking
latency is equal for each axe.
Yaw can tolerate some additional tracking latency, just because of how differently it produces torque about the yaw axis. This is likely a very minor note, but why increasing Yaw P values can very frequently improve performance, particularly with larger frames or other designs that have more frame mass farther from the CG.

**Motor max out**

Another big factor for consistency is that when the craft is commanded
to make a move, the motors should not max out. If that happens you'll
get completely different responsiveness, and somewhat unpredictably.
This is again a key factor in consistency: having enough power and
authority on all axes.

</details>

## Feed Forward

Feed Forward is used to help the quad copter tracking the setpoint
(stick inputs) closer. In other words it reduces the latency between
stick movement and quadcopter movement.

Feed Forward is intended to increase responsiveness by more directly applying stick inputs into the mixer ahead of other PID inputs, reducing the need for the PID controller to respond to setpoint error in order to respond to inputs
Feed Forward is great to increase responsiveness by anticipating a soon expected PID error based on stick movement.

### Suggested setting: values for a 5"

|                             |       |
| --------------------------- | ----- |
| **Feed Forward Transition** | 0.9-1 |

|           | **Feed Forward** |
| --------- | ---------------- |
| **Roll**  | 90-100           |
| **Pitch** | 90-100           |
| **Yaw**   | 90-100           |

## D Min

D Min allows to run higher D gain on not so clean builds by dynamically
increasing D on sharp moves.It has been introduced to run cooler motors,
and have faster stick responsiveness.

D Min can negatively affect consistency as D is no longer constant but
varies depending on how quick the move is. Also, running a lower D
during shallow flight will reduce smoothness.

### Suggested setting: off

**If your quad allows it (clean build with low noise) disabling D Min
increases the quad flight consistency by keeping D constant and at a
generally higher value.**

## TPA

TPA lowers the D and P gain after a certain throttle threshold. It has
been introduced to address fast oscillations induced by high throttle
motor noises on quads running high PID gains.

Similar to D Min this settings could negatively affect consistency
leading to an increase of rotation rate when more throttle applied
[BF doc ref](/docs/development/PID-tuning#tpa-and-tpa-breakpoint)

**Increasing the default breakpoint value allows to keep D constant also
around mid throttle .**

### Suggested setting: values for a 5"

|         | **Rate**  | **Breakpoint** |
| ------- | --------- | -------------- |
| **TPA** | 0.40-0.50 | 1600- 1750     |

Lower rate and higher breakpoint will increase consistency but
eventually introduce oscillations, carefully tune the settings to
minimize the impact of TPA while avoiding oscillations.

## Thrust Linear

If a unusually large TPA is required to avoid high-throttle oscillations whilst good performance is observed at low and mid throttle then consider reducing TPA and employing thrust_linear. Thrust linearization is designed to account for situations where a linear throttle input produces an exponential throttle output. This can happen on builds which fall outside of the normal power/weight ratio. In these cases thrust_linear can be used to PID boost response at low throttle and reduce PID response at high throttle.

thrust_linear defaults to 0. If you experience oscillations which TPA cannot sufficiently correct then thrust_linear is a good next step.

Because thrust_linear will boost PID response at low throttle the master PID values should be reduced one or two notches on the slider before introducing thrust_linear.
Set thrust_linear initially at a value around 25 and then increase in increments of 5 whilst observing the effect on high-throttle oscillations.

## I term relax and iterm_windup

I term relax aims to inhibit I during fast manoeuvres by preventing it
from further accumulating avoiding I term induced bounce back on flips
and rolls ([BF doc ref](I-Term-Relax-Explained)).

### Suggested setting: values for a 5"

|                 | **Axes**            | **Type** | **Cutoff** |
| --------------- | ------------------- | -------- | ---------- |
| **Iterm Relax** | RP (Increment only) | Setpoint | 7-12       |

## Anti gravity

Anti Gravity boosts the I term when fast throttle changes are detected.
It has been introduced to mitigate the craft nose tilt on throttle
changes ([BF doc ref](/docs/wiki/guides/current/PID-Tuning-Guide#antigravity)).

Anti gravity helps to increase smoothness and hold the attitude on
maneuvers with fast throttle changes like boosts, powerloops, etc.

### Suggested setting: values for a 5"

|                  | **Gain** |
| ---------------- | -------- |
| **Anti gravity** | 3.5 - 5  |

## Motor Idle Throttle Value, Dynamic Idle Value & Thrust Linear

Lower than default Motor Idle Throttle Value allows for greater hang
time and cleaner dives. However it comes at the cost of a weaker
attitude hold at zero throttle and increased risk of de-sync.

Dynamic Idle Value and Thrust Linear will help to mitigate those
collateral effects.

Dynamic Idle Value allows to define minimum motor RPM, if set at a
reasonable amount it avoids de-sync due to too low motor RPM.

Thrust Linear helps to boost the PID gains low throttle helping to offset reduced motor responsiveness in low RPM operation compared to higher RPM responsiveness of motors. This can have some interactions with D gains at higher throttle values, which may require use of higher TPA_rate to offset.

### Suggested setting: values for a 5"

|                               | **Value**                                                                                                      |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Motor Idle Throttle Value** | 3% - 4%                                                                                                        |
| **Dynamic Idle**              | Needs to be computed according to [doc](/docs/wiki/guides/current/Dynamic-Idle#setup---enabling-dynamic-idle). |
| **Thrust Linear**             | 20-25                                                                                                          |

## RC smoothing

Higher than default RC smoothing helps reducing stick input glitches caused by noise in the RC link.

### Suggested setting:

|                  | **Value** |
| ---------------- | --------- |
| **RC smoothing** | 20        |

# Betaflight Filtering

Generally speaking the less the better as filtering introduces latency, for freestyling a more conservative approach with enough amount of filtering is advised.
Not enough filtering can negatively affect smoothness and in some cases even burn motors.

Via incremental tuning effort try minimizing Gyro LPF filtering (biggest drain on phase delay that makes propwash response poor) followed by minimizing how much delay is coming from dynamic notch filtering (ideally single notch with smaller DFT bins - W=0, Q=250, MinHz 105, MaxHz 465).

Lastly, try reducing the D-term filtering, slider values up to 1.4 range, still attenuates most D_term noise very well but reduces phase latency.

# ESC Settings

## PWM Frequency

Increasing PWM frequency helps to run smoother motors, and provide greater control at the cost of losing some thrust.

> **Warning:** Increasing PWM frequency can introduce wobbles at zero or low throttle. Such undesired effect can be mitigated by increasing Thrust Linear or Dynamic Idle values.

### Suggested setting: values for a 5"

|                   | **Value**                                   |
| ----------------- | ------------------------------------------- |
| **PWM Frequency** | 48kHz - 96kHz or use Variable PWM Frequency |

### :bulb: Advanced Considerations

<details>
  <summary>Click to expand!</summary>
  
 Increasing PWM frequency tends to result in smoother running motors and may mitigate issues with aliasing that results in some mid-throttle oscillations, however higher PWM frequencies have downside. As the PWM frequency increases, the PWM resolution is bound to decrease, and depending on ESC deadtime required in switching, lower throttle responsiveness may also be reduced.
</details>

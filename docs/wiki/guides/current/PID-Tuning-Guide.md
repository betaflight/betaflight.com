# PID Tuning Guide

## Quadcopter and Betaflight cheat sheet

## Introduction

On my journey, though hundreds of videos, tutorials and manuals (Bardwell, UAV Tech, JohnnyFPV, Mr. Steele, Le Drib, RotorRiot (sorry, for the missed ones) and wrote down their suggestions). This is the result of my notes. It should provide the least necessary but most compressed information to start tuning and setting your Quadcopter.
In my case I use the widely spread `Taranis X7` remote control.

I am a **freestyle pilot**, so keep in mind, that these settings are in this scope (more smooth, softer flight behavior).

# Remote Control (Taranis X7)

## Channel Mapping

`TAER Throttle/Aileron(Roll)/Elevator(Pit)/Rudder(Yaw)`
`TRPY`

| Short | Name     | Heli     | Plane    | German      | Chinese | Channel |
| ----- | -------- | -------- | -------- | ----------- | ------- | ------- |
| A     | Ailerons | Roll     | Roll     | Querruder   | 横滚    | CH1     |
| E     | Elevator | Pitch    | Nick     | Höhenruder  | 俯仰    | CH2     |
| T     | Throttle | Throttle | Throttle | Gas         | 油门    | CH3     |
| R     | Rudder   | Yaw      | Gear     | Seitenruder | 偏航    | CH4     |

# Betaflight

## Default startoff settings

- **Gyro update** freq 8k
- **PID Loop freq** 8k sampling
- **Airmode** ALWAYS ON
- **Antigravity** gain ON
- **Dynamic Filter** ON
- **Filter** (turn notch filters off)
- **PID:** Add "your" rates as a reference
- **Blackbox:** 2-4k sampling
- **Bardwell's starting rates (mostly 5" copters):**

|       | P   | I   | D   | FF  | RC   | SR   | RCexpo |
| ----- | --- | --- | --- | --- | ---- | ---- | ------ |
| Roll  | 46  | 45  | 25  | 100 | 1.55 | 0.73 | 0.3    |
| Pitch | 50  | 50  | 27  | 100 | 1.55 | 0.73 | 0.3    |
| yawD  | 65  | 45  | 0   | 100 | 1.0  | 0.73 | 0.3    |

# Batteries / Lipo values

Here are some suggested ranges based on tests.

For your radio:

| Cells          | mAh     | Volt           | Desc                                                      |
| -------------- | ------- | -------------- | --------------------------------------------------------- |
| _NiMh_ 6 cells | 800mAh  | 7 to 8 volts   | About 1 hour remaining at 7 volts, 4 hours at 8 volts.    |
| _NiMh_ 6 cells | 2400mAh | 7 to 8 volts   | About 2 hour remaining at 7 volts, 12.5 hours at 8 volts. |
| _Lipo_ 3 cell  | 800mAh  | 11 to 12 volts | About 1 hour remaining at 11 volts, 6 hours at 12 volts.  |

## Under Load

**_The voltage of a discharged LiPo cell is 3.00V, and discharging below this will definitely damage the cell._**

| Cells | min           | average | max   | Desc |
| ----- | ------------- | ------- | ----- | ---- |
| 1     | 3.2V - 3.3V   | 3.7V    | 4.2V  |      |
| 2     | 6.4V - 6.6V   | 7.4V    | 8.4V  |      |
| 3     | 9.6V - 9.9V   | 11.1V   | 12.6V |      |
| 4     | 12.8V - 13.2V | 14.8V   | 16.8V |      |
| 5     | 16.0V - 16.5V | 18.5V   | 21.0V |      |
| 6     | 19.2V - 19.8V | 22.2V   | 25.2V |      |

## C (constantly discharge)

`2600mAh (2.6Ah) and a C rating of 55C
55 * 2.6 = max constant output, which is 143A.`

`5C 1300mAh: 5 * 1.3A == 5.6A`

## Cell capacity / percentage

voltage chart vs remaining capacity.

| Cell Voltage | Percentage |
| ------------ | ---------- |
| 4.00V        | 84%        |
| 3.96         | 77%        |
| 3.93         | 70%        |
| 3.90         | 63%        |
| 3.86         | 56%        |
| 3.83         | 48%        |
| 3.80         | 43%        |
| 3.76         | 35%        |
| 3.73         | 27%        |
| 3.70         | 21%        |
| 3.67         | 14%        |

# PID

![PID animation](https://github.com/bw1129/PIDtoolbox/raw/master/images/PID_Compensation_Animated.gif)

- **P** = The Present (proportional)
- **I** = The Past (integral)
- **D** = The Future (derivative / damping) !Dangerous

[Community Presets](Community-Presets?fbclid=IwAR10HqBt_ZjxHivCQ8Os55f1TzKGcTH9vdOiiuNWeWOKA_IlLX4JYaDLoJY#2---3-quad---11xx-12xx-motors)

## P-term

Controls the strength of how tightly the machine tracks the sticks (the Setpoint).

Higher value (gains) provide tighter tracking, but can cause overshoot if too high in proportion to the Derivative (D-term). Think of the P-term as the spring on a car.

P gain determines **how hard the flight controller works to correct error to achieve the desired flight path** (i.e. where the pilot wants the quad to go by moving the transmitter sticks).

Think of it as a sensitivity and responsiveness setting. The snappy response provided with a high P gain can even make it feel like you have increased your rates.

**Generally speaking, higher P gain means sharper control while low P gain means softer control.**

**If P is too high, the quadcopter becomes too sensitive and tends to over-correct**, eventually it will cause overshoots, and you will have **high frequency oscillations**.

You can lower P to reduce the oscillations, but reduce it too much and your quadcopter will start to feel sloppy.

- It is proportional to the magnitude of error (setpoint and gyro).
- **Bigger error** means push harder to get to the setpoint
- **Smaller error** means keep trying but don't push as hard
- **zero error** means do nothing

- The primary determinant of your copter's flight-feel and handling
- **High P-gain** means the copter accelerates harder to reach the target rotational rate
- **Higher P-gain** feels `sharper`
- **Lower P-gain** feels `softer`
- **Too high P-gain** results in more (slow, sluggish) oscillation

## I-Term (integral)

I term determines **how hard the FC works to hold the drone’s attitude against external forces**, such as wind and off-centered CG.

Think of it as the stiffness setting in the stall motion of your quadcopter, and how well it holds its attitude.

**if you notice some drifting without user command, then increase it**

When **I-gain gets too high, your quadcopter will be overly constrained by this, and start to feel stiff and unresponsive**. It’s similar to having a slower reaction and a decreased P gain. Excessive I gain in extreme cases can create a low frequency oscillation.

You can increase I-gain to “fix” these tiny details in the flight performance. To avoid undesired “stiffness” with high I-gain use “Anti Gravity“. It allows to have lower I-gain when cruising, and only increase your I-gain when doing throttle punches.

- Proportional to magnitude and duration of error
- corrects for accumulated, un-corrected error
- corrects for steady-state error and persist bias
- **If too low**, quad is slipping, skating, like on ice
- Raise I-gain until the copter holds attitude on all three axes in response to strong throttle moves (the rest will be done by `anti_gravity_gain`)
- in betaflight, raise I-gain just until the copter holds attitude during normal flight, then add `anti_gravity_gain` to control throttle coupling

## D-term (dangerous) (dampening)

Controls the strength of dampening to ANY motion on the craft. For stick moves, the D-term dampens the command. For an outside influence (prop wash OR wind gust) the D-term dampens the influence.

Higher gains provide more dampening and reduce overshoot by P-term and FF.
However, the D-term is VERY sensitive to gyro high frequency vibrations (noise | magnifies by 10x to 100x).

High frequency noise can cause motor heat and burn out motors if D-gains are too high or the gyro noise is not filtered well (see Filters tab).

Think of the D-term as the shock absorber on your car, but with the negative inherent property of magnifying high frequency gyro noise.

**Too high D-gain can burn your motors!**
D-gain works as a **damper and reduces the over-correcting and overshoots caused by P-term**. Like a shock absorber stops the suspension from being bouncy, **adding D-gain can “soften” and counteract the oscillations caused by excessive P-gain, as well as minimizing propwash oscillations.**

When **D-term is too low, your quad will have bad bounce-backs** at the end of a flip or roll, and you will also experience the worst propwash oscillations in vertical descents.
Increasing D-gain can improve these problems, however, an excessive D-gain value can introduce vibration in your quadcopter because it amplifies the noise in the system. Eventually this will lead to motor overheat and quad oscillation.

Another side effect of **excessive D-term is the decrease in the quad’s response, this effect is often described as “mushy”**.

`set debug_mode=d_min`

- Proportional to the _change in magnitude_ of error
- Anticipates the _future state_ of the system based on its current movement
- It reduces the P-term overshoot and oscillation (_damping effect_)
- But accelerates the P term too!

- _Amplifies noise_ (vibration) in the system
  1.  motors make vibrations
  2.  vibration comes to gyro
  3.  D-Term amplifies the vibrations
  4.  motors burn up
- **low-pass filter on the D-term** is _mandatory_ to remove high-frequency noise

- reduces the effect of P-term oscillations
- **allows higher P-gain** (for sharper handling) without excess oscillation
- The only PID-term that can respond quickly enough to handle fast-changing situations like propwash oscillation
- Is the only PID-term that can and will smoke motors if you are not careful
- always to raise D-gain in relatively small increments
- **always do a short test flight and check for hot motors after raising D gain!**

## d min

Set the lowest D-term, it then get dynamically increased (to PID's maximum D-term) on sharper stick movements

D Min provides a way to have a lower level of D in normal flight and a higher level for quick maneuvers that might cause overshoot, like flips and rolls. It also brings D up during prop wash. Gain adjusts how fast D gets up to its maximum value and is based on gyro to determine sharp moves and propwash events. Advance makes D go up earlier by using setpoint instead of gyro to determine sharp moves.

## PID-tuning in a nutshell

- Raise P till quad is "sharp"
- Raise D till it's soft enough
- Raise I till (too much looses control (slow response))
- if oscillation is fast, reduce D
- if oscillation is slow, raise D (or lower P)

**If you try to explore errors in a Blackbox Tool, set FF (FeedForward) to zero (disable it)!**

```
P -> Higher makes Quad more sharp (oscillates if too high or low)
I -> High Makes the quad more digital / mechanical (measures errors) holds the attitude better if raised
D -> High values dampen the P (works against P, flattens the curve) D-term relates on the gyro measurements
```

### Solve

- high D / Low P = Low PD ratio = Bounces back
- Low D / High P = High PD ratio =

### Yaw PID

- `P -> too low, too sloppy, like on ice` turn it up to 60, 90, 100
- `I maybe 120`
- `D could be 0`
- then use FeedForward to get sharpness back (100?)

## Tuning for Freestyle

- my tuning approach focuses on:
  - minimizing propwash
  - eliminating bouncebacks after flips and rolls
  - solid attitude hold on throttle change
- the main maneuvers I use to tune are sharp turns, flips and rolls, and throttle punches

## PID Tuning (borrowed from Betaflight's manual)

[Guide](PID-Tuning-Guide)

Start with slightly lower than default P gains as provided by the installed BetaFlight firmware. P of 4.0 on Pitch and Roll are good starting points. Also lower the I and D gains on pitch and roll in order to tune P with minimal interference from I and D. I of 20 and D of 5 are good starting points. For yaw, it is prudent to decrease default P by HALF and reduce I just a bit, to eliminate that axis as a source of oscillations. Yaw will be tuned last.

Over a series of flights, increase P gain on Roll axis until you see oscillations when you approach full throttle and you get very rapid visible and audible shakes. Then set P term to roughly 70% of the value that caused the oscillations.

Test to see if the quad holds the desired roll angle and does not drift by rolling the copter to a specific angle, and then punch and drop throttle several times. The angle you gave it relative to the horizon should not change significantly. If the angle appears to drift, increase I gain. If you don't see drift, don't change I. You can change the "feel" of your copter by raising or lowering I after you achieve a good tune. (I does not really affect final P and D values.

Increase D gain on each axis ONLY to the extent that it helps reduce bounceback after flips/rolls or prop-wash oscillations after an abrupt descent. If neither is a problem, then LEAVE D LOW. At this point the Copter should be around 80-90% tuned.

Note: Too high of D term can cause motors to get hot. Do a short flight, 10-30 seconds, land and check motors. If you can hold your finger on the motors then they are not too hot.

Yaw often requires the least tuning, but it may still introduce significant oscillation if you ignore it. Start with the Yaw P that you chopped in half in step one and verify that you do not get significant vibrations when you do a long punch-out or fast forward flight. Start pushing up Yaw P by .5 increments until you start to see roughness through your fpv camera when in fast forward flight or punches. Then decrease a bit. Fine tune by looking at Yaw P term in blackbox. It MAY be oscillating a bit, but pull up the Yaw gyro trace to see if those P oscillations actually make it to the Gyro. If the yaw gyro looks relatively smooth, you're ok.

**Note:** Because yaw inherently has less positive control (a.k.a. authority), than pitch and roll, a wider range of values are acceptable. Relatively higher P and I values and relatively low D values are the norm because of the inherent lack of authority compared to pitch and roll. A blackbox log is usually necessary to fine-tune. Most excess P oscillation comes from either roll or pitch, but if any roughness at full throttle remains, look at a blackbox log to see if yaw P starts to oscillate on full throttle. If so, decrease yaw P.

Finally, refine the relationship between P and I by looking for a tendency to resist or "fall into" strong turns. Very low I values will result in an axis that drifts over time. Low I values on an axis will allow that axis to change attitude more freely but may still hold attitude. Higher I values on an axis will hold attitude very well, but may tend to resist movement and can add a feeling of inertia. Very high I values can create an overly "robotic" feeling and even oscillations. Can also refine P by analyzing Blackbox Logs. This may get you closer to a perfect tune.

**Notes:** The undesirable flight characteristic called **bounce-back oscillation** occurs when you abruptly return the pitch/roll stick to center, and the copter rotation does not make a "clean" stop. It could be the result of:

1. D that is too low
2. P that is too high
3. or even P that is too low (a low P gain can cause slow, sloppy oscillations because it's not providing enough authority to get to the intended end-state).

##### Trashcan PIDs

|       | P   | I   | D   | FF  | RC   | SR   | RCexpo |
| ----- | --- | --- | --- | --- | ---- | ---- | ------ |
| Roll  | 45  | 45  | 25  | 100 | 1.20 | 0.75 | 0.0    |
| Pitch | 50  | 50  | 27  | 100 | 1.20 | 0.75 | 0.0    |
| yawD  | 45  | 100 | 0   | 100 | 1.30 | 0.80 | 0.0    |

### PID Masterclass

#### Autoselect Profile depending on your Battery Voltage

This selects profile 1 if you connect a 3S battery and
selects profile 2 if you connect a 4S battery
`profile 0` to select Profile 1
`set auto_profile_cell_count=3` for 3S Profile
`profile 1` to select Profile 2
`set auto_profile_cell_count=4` for 4S Profile

# Filter

If your quad "bumps" or "flip out" or fly away, you may have too less filtering

1. Reduce Filtering for better propwash handling
2. Raise D-Gain about 5 points
3. Each filter introduces delay/lag

#### Default / Optimal flight performance:

gyro_lowpass = 100
dterm_lowpass = 110
gyro_lpf = OFF

#### Slightly noisy setup:

gyro_lowpass = 80
dterm_lowpass = 100
gyro_lpf = OFF

#### Very noisy setup

gyro_lowpass = 50
dterm_lowpass = 100
gyro_lpf = 188HZ

## Dynamic Notch Filter ON

**You can always switch it on**
(mid 100 - 400Hz) Motor noise filter / READS the ESC motor speed and let follow the filter to it (it is not "static", it "moves" with the speed of the motors)

(Gyro Low pass < 90Hz)

Width could be 20-40 (suggested by UAV-Tech)

## Dynamic Filter (mostly off)

If you have use Dynamic Filter on, then (UAV Tech suggests) turn off Gyro Notch Filter 1 and 2 (they got "replaced" by the dynamic filter")

### dyn_filter_range

- Low (1kHz sampling)
  - 83Hz to 500Hz
  - lower min = 67 Hz | Ctr Min 83Hz
  - bigger Low RPM QUads (6" + props or low KV quads)
- Medium (1.3KHz sampling)
  - 110Hz to 660Hz
  - lower min = 89Hz | Ctr min = 110Hz
  - normal 4s 5" quads"
- High (2KHz sampling)
  - 166Hz to 900Hz
  - lower min = 133Hz | Ctr min = 166Hz
  - smaller \<3" Quads | High KV | 5 on 6S

### Always check motors temperature after changing any filter

- You have to add filters because you get hot motors (Too much noise)
- Each filter delays, they more filter, the more muddy

## D-Term Lowpass

- Most in need of filtering
- Too low makes more delay

- _PT1_ = at least one (faster, better propwash handling)
- (you should not use BIQUAD - Bardwell said, UAF-Tech said PT1 is not good enough, BIQUAD has more lag but is stronger)

## Gyro Notch Filters

- Mostly everyone does not need Gyro notch filters.
- Could be switched off if motors not getting hot after disabled them.

## Gyro Lowpass

- Look in Betaflight-Blackbox-Explorer or PID-Toolbox where to set the Lowpass frequency

## D-Term Notch

- If your motors get hot after 30s - 1m flight, then you maybe need a D-term notch.
- **When hardware condition is not good** (propeller and motor vibrations) you can switch on.
- Disable it if you wanna tune till the end

## Yaw Lowpass

Most often noisier than other axis

# Oscillations

- Regular to the fixed frequency = P-term issue
- Randomly / irregular Vibration could be D-term (amplifies noise)
- Props (punch throttle) oscillation higher frequency

# Propwash

Prop wash happens when changing speed or if you suddenly accelerate from a dead stop.
These sudden movements cause the prop's spin to create turbulence, causing instability while steering..

- change ratio between P/D
- Lower P and Raise De (raise d makes motors hotter)
- Or use feedforward

## RC Smoothing

- Smoothing Type = Filter
- Ch Smoothed = RPYT
- If you don't smooth on Y then you cant have ff on yaw
- Input cutoffType = AUTO
- Input FilterType = BIQUAD
- Derivative CutoffType = AUTO
- Derivative FilterType = BIQUAD

# Throttle boost

Boosts throttle faster than you command

# Absolute control

Good for windy days
1-5 (10) may best experience

# FeedForward

**F-gain is only active during stick movements** and is responsible for the responsiveness of the craft.
To put it simply, **if you want sharper response, increase F gain. If you want smoother ending of a rapid movement, increase D gain. The more D, the smoother everything will be, the more F, the more control you will have.**

If you have **oscillation in Yaw, you can try higher F and I values**, then drop P to maintain the responsiveness while keeping oscillations caused by P gain to a minimum.

The faster the sticks are moving, the more FeedForward we get. FeedForward helps P drive the quad into turns. Unlike P, FeedForward cannot cause oscillation, no matter how much FF is added.

With FeedForward, we get better stick responsiveness without pushing P so high as to cause wobbles. It also reduces the delay time between input and response. Less delay means less error and less I windup/overshoot. It is great for racing, LOS and radical freestyle flying. It isn't great for cinematic HD.

Too much causes:

- overshoot at the start of a flip, particularly when the sticks hit 100% travel
- exaggerated responsiveness to RC steps
- amplification of shaking when the pilot is cold or nervous
- spikes in the motor traces and brief shakes with big RC steps
- gyro getting ahead of setpoint

## advantages:

- adjustable per axis
- directly calculates off RC-Rate
  - (derivative = magnitude of slope)
- no gyro noise influence
- no additional D-term latency
- works on yaw (w/o d-term)
- provides a better fundamental for future development (cleaner)

## Smart feedforward

- makes FF and P-term NOT sum
- can be used to have FF push moves
- can be used to have moves based on measurement (old setpoint weight = 0) BUT then also have FF value for sharp stick inputs
- requires higher FF values (>200) to have FF values be of any affect

### feedforward transition / OLD way: Setpoint Weight

- _feedforward_ == Setpoint Weight
- low is more smoother / sluggish
- Raise FF if it feels to stiff / decrease cutoff
- Add more sharp movement when stick is changing fast
- otherwise it is more soft
- 70 - 200 for example

**Freestyle pilots love more smooth movements, so lower it.**
**it could be very helpful on yaw axis**

_0.15 means the center 15% of my stick travel are softer._

FeedForward provides 'dynamic stick boost' or 'dynamic stick responsiveness'. It pushes the quad quicker into turns when the sticks are moved quickly. With feedforward, the faster the sticks are moved, the bigger the push. And it doesn't wait for any error to develop, the response is instantaneous.

The feedforward effect is attenuated around center sticks by the transition parameter, so the quad can be made more damped (less twitchy) around center for freestyle type flying by setting transition to 0.5 or 0.1 as usual, but for racing and for direct responses it's best to leave transition at 0.

Zero FeedForward allows D-term to dampen the quad all the time, even when the quad is instructed to turn quickly.

**Too much FeedForward may make the quad too twitchy**, and may cause overshoot.

**[D-gain]/26 x [setpoint] x 100 = FF gain**

```

set f_pitch = 100
set f_roll = 100

beacon RX_SET
set small_angle = 180
set pid_process_denom = 1
set vbat_pid_gain = ON
feature ANTI_GRAVITY

set gyro_lowpass2_hz = 0
set dyn_filter_range = HIGH
set dshot_idle_value = 250

```

## ff_boost

This is a fantastic new feature that markedly reduces delay in fast setpoint changes.

Most motors take time to spin up / slow down. They need to be pushed harder at the very start of a move than in the middle. FF and P both ramp up slowly at the start of a move because initially our fingers move slowly and most pilots use Expo in their Rates setup. So until now, the motors haven't got that immediate push needed unless really high FF gains were used (250+). But with FF gains of that magnitude, overshoot is hard to control, especially because of SuperRate being applied at the end of the stick travel, really casing FF to boost the move right when we need the quad to start to slow down to not overshoot.

'ff_boost' is a PID parameter that is proportional to the stick acceleration. Technically it is the second derivative of Setpoint.

### Setpoint weight (is outdated > 4.x, new one: is FeedForward)

- setpoint is _degrees-per-second_ of rotational rate, as commanded by _stick position_
- Measurement is _degrees-per-second_ of rotational rate as reported by the _gyro_
- We are talking only about Acro/Rate Mode here, not autolevel

* 0.5 is may too sluggish
* 2.0
* D26/26 SW1 == FF 100

* _HIGH_ -> more aggressive, each stick move is copied instantly - 255
* _LOW_ -> more smushier / Smoother, good for freestyle - 0 (then you need more D)

### Setpoint (deprecated) / FeedForward-transition

- Reduces the weight when the stick is returning to center
- 0.15 = 15% of stick travel is smooth

- When nose is raising/lowering when giving throttle punch raise AG.
- Is a virtual `I` booster if changed.

## I-term rotation

Rotates the current I Term vector properly to other axes as the quad rotates when yawing continuously during rolls and when performing funnels and other tricks. Very appreciated by LOS acro pilots.

## I-term Relax

Reduces I accumulation on fast stick movements. It markedly reduces I bounce-back after flips or rolls, and allows higher levels of I than before. **Typically I can be increased by 50% or more, which improves directional stability** while flying in turbulent air or when approaching gates at high speed.

- _LOW_ -> more looser feeling (10) (even without feedforward)
- _HIGH_ -> more stiff (especially for freestyle tracking moves)
- **I-term relax on** = less bounce backs at the end of flips and rolls
- you feel it on racing type settings

Freestyle:

- Cutoff: 10
- Type: Gyro

Race:

- Cutoff: 20
- Type: Setpoint

## Integrated Yaw

Integrated Yaw is a feature which corrects a fundamental issue with quad control: while the pitch and roll axis are controlled by the thrust differentials the props generate yaw is different. Integrated Yaw fixes this by integrating the output of the yaw pid before applying them to the mixer. This normalizes the way the pids work. You can now tune as any other axis. It requires use of absolute control since no I is needed with Integrated Yaw.

## I-term relax Type

Limits the accumulation of I Term when fast movements happen. This helps specially to reduce the bounceback at the end of rolls and other fast movements. You can choose the axes in which this is active, and if the fast movement is detected using the Gyro or the Setpoint (stick).

- **Gyro** = more for Freestyle pilots (good at bouncebacks, bad in turns)
  - uses a high-pass filter based on rate of change stick movements
  -
- **Setpoint** = more better for racers and all around (bad in bouncebacks, better in turns) (but try for yourself)
  - better landing after flips
  -

### I-term relax cutoff

- lower for looser stick-feel instead of high feedforward
- it's not stiff anymore
- 20 default, 15 - 10

## Antigravity

Fixes the problem when you move throttle stick rapidly, to tilt the quad up or down the nose.
`0 - 30`

Anti Gravity boosts the I term when fast throttle changes are detected. Higher gain values provide stability and better attitude hold when you pump the throttle.

- Throttle Mid 0.5
- Throttle expo 0

# TPA (Throttle PID Attenuation)

TPA is a setting to reduce the effectiveness of PD gains as throttle increases(only D-term by default).

TPA basically allows an aggressively tuned multi-rotor (one that feels very locked in) to reduce its PID gains when throttle is applied beyond the TPA threshold/breakpoint in order to eliminate fast oscillations

- tpa_mode: PD/D (Only acts on D-term by default)
- tpa_rate: TPA 0.6 means 60% PIDs decrease on full throttle
- tpa_breakpoint: TPA breakpoint 1250(25%) - throttle value at which TPA starts to work

![TPA](https://user-images.githubusercontent.com/15355893/165534786-978e3129-04e6-4943-9be0-bcc79ed3d622.png)

Better propwash (before move D gain up, move TPA up)

# Throttle Limit

never get up to 100% Throttle

- scale / clip
- throttle limit (percentage)

# Radio Frequencies and Systems

- Taranis 2,4Ghz (factory standard)
- Crossfire 900MHz (longer range / more expensive)

# Analysis Tools

- Blackbox Explorer
- PID Toolbox
- Plasmatree
- blackbox-tools

## BLACKBOX EXPLORER

Use UAV-Tech's JSON File to have the most important views available
https://drive.google.com/drive/folders/1hWgcADCI3Aa4XLUiGsGQbPHxdkE94taP

1. Holistic Flight performance
2. PID Operations
3. Prop wash eval. \*

- How gyro is following setpoint

4. SAND BOX
5. Smoothing
6. SAND BOX
7. Yaw evaluation

- bounce backs

8. Pitch evaluation

- bounce backs

9. Roll evaluation

- bounce backs

0. Noise analysis

- noise trails

# Debug mode (to log filter on logger)

Mostly `set debug_mode = GYRO_SCALED` could be used.

- get debug
- set gyro_filter_debug_axis = ROLL
- set rc_smoothing_debug_axis = ROLL
- set acro_trainer_debug_axis = ROLL
- set osd_debug_pos = 2049
- set debug_mode = GYRO_SCALED
- `set debug_mode=gyro_raw`
- `set debug_mode=notch`
- `set debug_mode=fft`
- `set debug_mode=gyro`
- `set debug_mode=dfilter`

- If PID-error is Zero, you have a perfectly tuned quad (also if in windy condition)
- D-term should be soft (not noisy), otherwise you cant handle Propwash

### I-term

- below zero your quad is more heavy to the right
- above zero your quad is more heavy to the left
- could also occur on windy days (force from outside)
- is your gyro multiplied by a gain

### PID error

- is the offset of your setpoint and gyro
- the "perfect tuned quad" always has zero PID error
- gyro should exactly track setpoint
- biggest errors occur if you start a sharp pitch or roll
- propwash also generates PID error
- drives the PID

### PID SUM

- is the Setpoint minus Gyro

# Tuning tricks

TL;TR from https://oscarliang.com/quadcopter-pid-explained-tuning/

Tune one axis at a time: first roll, then pitch, and finally yaw
Every time you change a value, you should ask yourself: “is it getting better or worse?” Try to find the peak where the quad has the best flight characteristics before performance starts to degrade again.

When P-gain is too low: slow oscillation.
When P-gain is too high: very fast oscillations.

Fine tune it until you get to a point where the quad feels very responsive and nimble, making sure there is no excessive amount of vibration. Also listen to your motors, twitching motors are a sign of excess P gain which might not be visible in the camera.

If your quad flies fine in low to mid throttle, but only gets oscillations with high throttle, then increasing TPA will help.

Do a punch out and see if there is any fast oscillations, if so, increase TPA. Good TPA will give you a relatively smooth punch out. I personally wouldn’t use TPA higher than 0.4, otherwise your quad might feel “loose” at high throttle.

When you do aggressive maneuvers like flips and rolls, and your quad overshoots at the end of the move then bounce back, increase D for the affected axis.

Increasing D-gain can also help reduce prop wash (oscillation when you descent).

Be careful because excessive D-gain can introduce oscillations to your quad, and also make motors run hot, so use just enough to minimize propwash. Another sign of too much D-term is fast oscillations at the end of a roll or flip.

Note that to eliminate bounces at the end of a flip or roll, you can also use Setpoint Transition which we will talk about next.

Bank your quad to the left and right to see if it’s holding the angle well. Ideally it should just stay at the same attitude as you release the roll stick. If the quad can’t hold the angle then it’s an indication that I gain is probably too low.

Your quad can drift with the wind, so you might want to increase I a bit more on a windy day depending how bad it is.

I recommend setting I-term just high enough to stay level, excessively high I gain can result in a stiff, robotic feeling, and even oscillations.

**Setpoint** is the commanded Roll rate.
**Gyro** is tracking Setpoint as good as possible (windy days...)

## Tiny PID process explained

D-term always works against P-term:

- If P raises, D goes high
- If P goes low, D goes high again

## PID Toolbox

https://github.com/bw1129/PIDtoolbox/wiki/PIDtoolbox-user-guide

PID-error = Setpoint - Gyro

## Pins / Resource

- `resource`
- `resource show` `resource list (bf 3.x)` then it shows which Pins are used (Example: LedStrip, I2C)
- `resource i2c_scl 1 none` unassign current I2C
- `resource led_strip 1 none` unassign current LedStrip
- `resource camera_control B06` Whatever your PIN ID you have
- `resource list` check if your change is applied
- `set camera_control_key_delay = 125`
- `save`

# Listing your settings

# Difference to regular settings

`diff`

# CameraControl

### Mamba F405 (FURYF4OSD)

- 1kohm resistor
- `resource LED_STRIP 1 NONE`
- `resource CAMERA_CONTROL 1 A00`
- `set camera_control_ref_voltage = 300`
- `set camera_control_key_delay = 150`
- `set camera_control_internal_resistance = 100`

camera_control_button_resistance = 450,270,150,68,0
->>> measured 450,270,150,68,0

# Crossfire

CF Nano RX:

- Ch1 - RX
- Ch2 - TX
- Ch4 - LQ (for RSSI)

# SmartAudio

SmartAudio uses a UART

SBUS - RX
Smart Port - TX

## Protocols

# Radio Setup

**1RSS** - Antenna 1 Signal Strength Uplink - received signal strength antenna 1 (RSSI)

**2RSS** - Antenna 2 Signal Strength Uplink - received signal strength antenna 2 (RSSI)

**TRSS** - TX Radio Signal Strength (downlink signal strength)

**RQly** - Uplink - link quality (valid packets) (receiver link quality)

**RSNR** - Uplink - signal-to-noise ratio - RX Uplink SNR - Uplink - signal-to-noise ratio

**TQly** - Downlink - link quality (transmitter link quality)

**TPWR** - TX Power (transmit power)

**TSNR** - TX Downlink SNR - Downlink - signal-to-noise ratio

**FM** - Flight mode

**RFMD** - Update rate 0 = 4Hz; 1 = 50Hz; 2 = 150Hz

**GPS** - GPS Coordinates

**GSpd** - GPS Speed

**Hdg** - GPS Heading

**Alt** - GPS Altitude

**Sats** - Number of satellites

**Ptch** - Pitch angle of MFD

**Roll** - Roll angle of MFD

**Yaw** - Yaw angle of MFD (relative to north?)

**RXBt** - Receiver battery voltage

**Curr** - Current (0.00 A)

**Capa** - Capacity (0 mAh) (battery capacity)

**VFAS** - Voltage of flight controller

# BLHeli settings

Basically, this is it!

- _PWM Frequency: 48KHz for freestyle_; Default (or higher) for racing
- _Motor Timing: 22 or Auto for freestyle_; 25 (or higher) for racing
- ESC Protocol: DShot1200 or Multishot

# Motors

2200KV == 2200 rpm per Volt
KV == *V*elocity *C*onstant (K in science)

## Remap Motors

type `resource`

Example: Lets say 1 and 4 are wrong

```text
resource MOTOR 1 B01
resource MOTOR 2 A02
resource MOTOR 3 A03
resource MOTOR 4 B00
```

then unset 1 and 4
and remap them by:

```text
resource MOTOR 1 none
resource MOTOR 4 none
resource MOTOR 1 B00
resource MOTOR 4 B01
save
```

Done

## Super Mario as startup sound

### Motor 1

```text
Set Music On
Set Gen. Length 5
Set Gen. Interval 0
Paste these notes:
C6 8 G5 8 C6 8 E6 8 G6 8 C7 8 G6 8 G#5 8 C6 8 D#6 8 G#6 8 D#6 8 G#6 8 C7 8 D#7 8 G#7 8 D#7 8 D6 8 F6 8 A#6 8 F6 8 A#6 8 D7 8 F7 8 D7 8 F7 8 A#7 8 F7 8
```

### Motor 2

```text
Set Music On
Set Gen. Length 5
Set Gen. Interval 0
Paste these notes:
C6 8 G5 8 C6 8 E6 8 G6 8 C7 8 G6 8 G#5 8 C6 8 D#6 8 G#6 8 D#6 8 G#6 8 C7 8 D#7 8 G#7 8 D#7 8 D6 8 F6 8 A#6 8 F6 8 A#6 8 D7 8 F7 8 D7 8 F7 8 A#7 8 F7 8
```

### Motor 3

```text
Set Music On
Set Gen. Length 5
Set Gen. Interval 0
Paste these notes:
C6 8 G5 8 C6 8 E6 8 G6 8 C7 8 G6 8 G#5 8 C6 8 D#6 8 G#6 8 D#6 8 G#6 8 C7 8 D#7 8 G#7 8 D#7 8 D6 8 F6 8 A#6 8 F6 8 A#6 8 D7 8 F7 8 D7 8 F7 8 A#7 8 F7 8
```

### Motor 4

```text
Set Music On
Set Gen. Length 5
Set Gen. Interval 0
Paste these notes:
C6 8 G5 8 C6 8 E6 8 G6 8 C7 8 G6 8 G#5 8 C6 8 D#6 8 G#6 8 D#6 8 G#6 8 C7 8 D#7 8 G#7 8 D#7 8 D6 8 F6 8 A#6 8 F6 8 A#6 8 D7 8 F7 8 D7 8 F7 8 A#7 8 F7 8
```

# BiDirectional DShot

Update BLHeli && Upgrade to latest Firmware
Count your Magnets on motors and type that in the Betaflight App
Set Dshot 300/600
go to Motors tab, connect your Battery and look that error rate (percentage) MUST be 0% (100% if Batt not connected)
OG to Filter settings and Switch on Gyro RPM Filter
Harmonics 1 (most cases) (BUT YOU SHOULD SET IT TO 3 )

you can now use dynamic notch to watch something else (noise) than the motors (loose cables, screws,...)
Set Dyn filter range to "low"
Q to 200

Make a slight test flight, if motors cool or slightly warm you can reduce filter by move "Gyro Filter Multiplier" and "D term Filter multiplier" to the right (less filtering)
Do not use very new props (to prevent too less filtering)

##### you can use this too

remove other filers (only Version == 4.0)
d-term lp 1 dyn min cutoff 60
d-term lp 1 dyn max cutoff 175

# VTX

Just based on my past experience in VTX testing, lower frequency channels usually have higher output power. For example, on Raceband, R1 usually has higher output power than R8.

Another thing to take into account is the tuning of your transmitter antenna and receiver antenna. Assuming they are both tuned to 5800MHz, then the performance is going to be better on channel F4 (Fatshark 4) or R5 (Raceband). If they are tuned to 5700MHz, then the best channels would be E1 or R2.

# VTX TABLES

See [VTX Tables](/docs/wiki/guides/current/VTX-Tables).

### TBS UNIFY PRO 5G8 HV

### vtx

```text
vtxtable bands 5
vtxtable channels 8
vtxtable band 1 BOSCAM_A A FACTORY 5865 5845 5825 5805 5785 5765 5745 5725
vtxtable band 2 BOSCAM_B B FACTORY 5733 5752 5771 5790 5809 5828 5847 5866
vtxtable band 3 BOSCAM_E E FACTORY 5705 5685 5665 5645 5885 5905 5925 5945
vtxtable band 4 FATSHARK F FACTORY 5740 5760 5780 5800 5820 5840 5860 5880
vtxtable band 5 RACEBAND R FACTORY 5658 5695 5732 5769 5806 5843 5880 5917
vtxtable powerlevels 4
vtxtable powervalues 0 1 2 3
vtxtable powerlabels 25 200 500 800
```

### master

```text
set vtx_power = 3
set vtx_band = 3
set vtx_channel = 3
set vtx_freq = 5665
```

# Personal PID Tunes

#### Trashcan

- `set dshot_idle_value = 250` (instead of 450, was too floaty)
- `set throttle_limit_type = SCALE`
- `set throttle_limit_percent = 80` // or 70 or 50

##### Throttle

`set thr_mid = 0`
`set thr_expo = 25`

# Cinewhoop

## Motors

3800 is fine.
Sweet spot for these whoops is 1407 or 1507 and 3600/3800kv on 4s.
2800-3100kv if going 6s.

# Banggood Parcel / Shipping

_Priority Direct_ seems to get imported to Europe legally and then re-shipped from .nl. Very fast. It _bypasses any tax charges_ for parcels from outside EU.

_European Direct_ is the same as Priority Direct, it ships with a parcel company instead of regular mail, I have personally had some trouble getting these packages.

_Default Shipping_ everything that's non taxable (shipments \<E21 over here) and I can wait for, I do with the default free shipping.
_Air Parcel Register_ Chinese airmail, will not always taxed.

_EMS_ will get taxed but the service charge for the tax handling should be included in the shipping price.

_Expedited Shipping_ parcel service that charges a fairly high service charge for customs and tax handling.

# BF 4.2

set ff_interpolate_sp = AVERAGED_3 for Freestyle

# in a nutshell

1 - Bounce back on rolls or flip. If the quad overshoot and then bounce back, Increases D for the affect axis.

2 - If you are pitched and going forward and the angle of your pitch changes, Increase I on pitch. If the angle of the tilt is not holding, then increase I for roll.

3 - Slow oscillations is too low P term

4 - Punch throttle and cut. If there is movement then add anti-gravity gain.

5 - If nose wanders without increase in throttle then increase I gain. Similar to #2

6 - If nose wanders with throttle then increase anti-gravity gain

7 - Propwash on hard turn. Increase D or Lower P. You will have to try it with both pitch and roll

8 - Sliding out in turn. Increase Yaw I gain

9 - Oscillations with high throttle only. Increase TPA

10 - If you want a more robotic feel to your quad, Increase I for pitch and roll.

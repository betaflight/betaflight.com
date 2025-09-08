# Community Presets

### The below presets are _**by the community, for the community**_. You will see the BF version the preset is targeted toward and the pilot's name who published their recommended preset(s). We encourage community members to provide their own presets on this page. To do so, you simply need a Github account. Enjoy!

### IMPORTANT: These settings are NOT provided or endorsed by the Betaflight project. They are examples that others have found helpful for their particular quad. THEY MAY NOT BE SUITABLE FOR YOUR QUAD! A better use might be to examine similar configurations to yours and get ideas on possible tuning directions rather than blindly copy/pasting someone else's settings. Always test carefully and safely.

To use, simply copy and paste the preset CLI commands into the CLI tab in the Betaflight App. After the paste, type "save" and hit [enter]. That will load the settings of the preset which you can see (mostly) through the Betaflight App tabs.

# BF 4.2

Betaflight 4.2 with configurator 10.7 introduces significant and helpful features for tuning, many of which are highly recommended.

These features include VBat Sag Compensation, Feed Forward Interpolation, fixed I-Term Relax operation on Setpoint, and looptime improvements that allow for more stable filtering calculations.
Existing features can also be leveraged to produce better performing and more robust tunes, including DMin/Boost Gain & Advance, TPA, and Thrust Linearization

VBat Sag Compensation is a feature which aims to produce consistent motor response across the entire flyable voltage profile of a battery pack, and does this by slightly reducing peak motor outputs from the mixer at high voltage, and increases these values as battery sag comes into play. This is a highly recommended feature, although if you rely on 'feeling sag' as an indicator to land shortly, or are concerned about damaging batteries, particularly 6-Cell batteries on relatively efficient rigs, you can use values lower than 100 to receive most of the benefits, and also receive a small amount of extra initial 'punch' on fully charged batteries with values such as vbat_sag_comp = 70.

Feed Forward (FF) Interpolation has been improved, which uses a trailing average of 2-4 radio control setpoint samples to set feed-forward input values (which are then multiplied by the FF Gains). For noisier or less consistent RC signals (e.g. FrSky R9), using ff_interpolate_sp = 4 is a significant improvement, while more consistent signals (CRSFShot, AFHDS2A-IBUS, Futaba FASSTer) produce smooth enough traces to use ff_interpolate_sp = 2 (default) values with lower automatic RC_Smoothness values (around 8 is still stable enough for long range capable 7" craft).

I Term Relax now works correctly on Setpoint mode at values below 20. Particularly for large craft, lower values result in reduction or complete elimination of I-Term driven bounceback on flips and rolls.

DMin/Boost tools such as the DMin-Gain and DMin-Advance can be leveraged to increase effective D gains during stick movements (dMin Advance mostly) and propwash (dMin Gain mostly). Values of Gain = 44-55 and Advance values of 80-100 can result in much higher and more consistent D-Term response to damp P-term step responses, while still allowing for lower DMin values during normal flight that does not amplify higher frequency noise.

Thrust_Linear is intended to linearize aspects of thrust delivery (which is typically a quadratic response to throttle position) in order to produce more consistent PID response across the range of throttle inputs. In practical implementations, it is most frequently used as a way to increase PID gains at low throttle to compensate for lower authority craft (low voltage 65mm and 3" lightweight quadcopters, as well as 6-8" quadcopters on smaller motors can benefit from values of thrust_linear from 20-30 in order to remove low-RPM bobbles and instability. Quite often, best results are achieved by simultaneously increasing the TPA (Throttle PID Attenuation - most practically this is a throttle-DTerm-attenuation factor at default) value, and moving the breakpoint higher (e.g. TPA = 0.72-0.78, TPA_Breakpoint = 1270-1420). This combined effect allows for boosted PID response at low throttle values, but does not result in excessive motor heat from amplified D gains at high throttle.

Preferred tuning methods can lean heavily on the Slider functionality in the 10.7 configurator, with many archetypes of copters being fairly quick to tune quickly with sliders based on quick information, following a standard procedure of determining the correct P:D gain ratio, incrementing the P&D Gains until oscillations or trilling sounds are observed (then reducing 1-2 clicks), then finally adjusting FeedForward through gain sliders and FeedForward Transition (which reduces effective feed forward gain from center point out to the specified value linearly) until desired stick feel is achieved.

Note: The D Ratio tuning slider in the 10.7 Configurator is different from previous versions - moving the slider to the right increases D gains while leaving the P gains as-is. Values of 1.2 on the P:D Balance slider produce gains of P≈D, while 1.0 produces a P:D ratio where D gains are roughly 0.8x of P gains.

Dynamic Notch Filter ranges are specified by minimum and maximum Hz - if you transport a tune from BF4.1.X to BF4.2, you will need to change the dyn_notch_max_hz value to an actual value in Hertz - recommend setting this value to dyn_notch_max_hz = 350 for most applications.

## Pilot: Krunked

About: This is my base tune that i give everyone to try. slight adjustments might be needed but this works GREAT for 99% of pilots. you must be using the below highlighted esc settings and RPM filtering!!
F7 = DShot600 8k8k, F4= DShot300 8k4k..  
Lots of people complain about 4.2 'wobbles' -- THRUST_LINEAR = 25 is what solves this with the right PD gain... it BOOSTS the PIDs' at 0 throttle, giving low-end authority back, due to the loss of torque from 48khz. but 48khz markedly flies better all around in all of my quads and in all of the people ive had use these settings.

### 5inch quad base tune. 48khz, 23 timing, demag high, thrust_linear = 25

<details>
    <summary>Krunked's Universal CLI Settings 5inch - Copy/Paste</summary>

```python
# ESC SETTINGS
# 48khz, 23 motor timing, demag high *this is important for this tune*

#Settings for 5inch quads
set feedforward_transition = 100 #this just makes FF attenuated across the stick, reducing its effect near center stick and being 100% engaged at full deflection
set iterm_relax_cutoff = 10
set ff_spike_limit = 55
set ff_smooth_factor = 50
set ff_boost = 0
set vbat_sag_compensation = 100
set anti_gravity_gain = 7000
set iterm_windup = 30
set pidsum_limit = 1000
set thrust_linear = 25 # this is the golden setting for wobbles and 48khz
set rc_smoothing_derivative_type = PT1
set rc_smoothing_auto_smoothness = 20

# PID settings for 5 inch quads 48khz 23 timing
# sliders = 1.0 master, 1.3 pd balance, 1.2 pd gain, 1.5 stick response, DMIN OFF.
set p_pitch = 55
set d_pitch = 50
set f_pitch = 143
set p_roll = 50
set d_roll = 46
set f_roll = 135
set p_yaw = 54
set f_yaw = 135
set d_min_roll = 0
set d_min_pitch = 0

#FILTER settings (these are safe for any quad, you can get more aggressive based on your gyro logs and noise profiles, but these are good to start)
# set gyro_rpm_notch_q = 800 # use this if u want to reduce delay further, but only if you have noise free using 800.
set gyro_lowpass_hz = 300
set gyro_lowpass2_hz = 0
set dyn_notch_width_percent = 8 # feel free to use 0 here, if you don't have noise....
set dyn_notch_q = 200 # this can go to 250, if 250 is sufficient and crushing any resonance/peak noise bleeding around the rpm notches
set dyn_notch_min_hz = 90
set dyn_notch_max_hz = 450
set dyn_lpf_gyro_min_hz = 0
set dyn_lpf_dterm_min_hz = 105
set dyn_lpf_dterm_max_hz = 225
set dyn_lpf_dterm_curve_expo = 10 # this setting makes the dyn lpf on D shoot up must faster in the throttle range, reducing delay
set dterm_lowpass2_hz = 250

# krunked freestyle rates
set rates_type = KISS
set roll_rc_rate = 145
set pitch_rc_rate = 145
set yaw_rc_rate = 143
set roll_expo = 22
set pitch_expo = 22
set yaw_expo = 18
set roll_srate = 75
set pitch_srate = 75
set yaw_srate = 74

save
```

</details>

## Pilot: Tehllama

About: Tehllama prefers a racing feel, set up for racing rates that achieves minimum step response latency and maximizes motor temperature overhead.
While a sharper tune is possible, for racing setups these carry lots of margin for completing heats on damaged props.

<details>
    <summary>Tehllama's Universal CLI Settings - Copy/Paste</summary>

```python
# Settings for All Quadcopters
set debug_mode = GYRO_SCALED
set iterm_relax = RPY
set vbat_pid_gain = OFF
set vbat_sag_compensation = 70
set yaw_motors_reversed = ON
set small_angle = 180

# LlamaRates - 360°/s on Roll/Pitch, 270°/s on Yaw
set roll_rc_rate = 72
set pitch_rc_rate = 72
set yaw_rc_rate = 54
set roll_expo = 0
set pitch_expo = 0
set yaw_expo = 0
set roll_srate = 60
set pitch_srate = 60
set yaw_srate = 60

#LaunchControl_Preferred
set launch_control_mode = PITCHONLY
set launch_trigger_allow_reset = OFF
set launch_angle_limit = 60

save
```

</details>

### Racing Configurations - RotorBuild Description Links and CLI Copy/Paste Tunes

---

#### 3" 1105 5500KV 3S on Gemfan 3016-3 (Diatone GTB-339) [F411 on DShot300]

<details>
<summary>
CLI Copy/Paste
</summary>

```python

# For these lightweight 3" Craft, 48kHz PWM, Bidirectional DShot, MedHigh/23° Timing, 0.25 Startup Power, and DemagComp=Low

# Settings for All Quadcopters - Motors Reversed
set debug_mode = GYRO_SCALED
set iterm_relax = RPY
set vbat_pid_gain = OFF
set vbat_sag_compensation = 70
set small_angle = 180

# Filters
set gyro_lowpass_hz = 275
set gyro_lowpass2_hz = 425
set dyn_notch_width_percent = 0
set dyn_notch_q = 250
set dyn_notch_min_hz = 115
set dyn_notch_max_hz = 444
set dyn_lpf_gyro_min_hz = 0

# Configuration - 1105/1106/1204 Motors
set dshot_bidir = ON
set motor_pwm_protocol = DSHOT300
set motor_poles = 12
set dshot_idle_value = 475  # Dynamic Idle Set Below

set tpa_rate = 72
set tpa_breakpoint = 1370

# Profiles 3S and 2S - Uses Thrust_Linear
set thrust_linear = 20
profile 0
# profile 0 - 3S for 450-550 mAh batteries
set dyn_lpf_dterm_min_hz = 98
set dyn_lpf_dterm_max_hz = 333
set dterm_lowpass2_hz = 225
set vbat_sag_compensation = 70
set anti_gravity_gain = 4400
set iterm_rotation = ON
set iterm_relax = RPY
set iterm_relax_cutoff = 33
set yaw_lowpass_hz = 115
set throttle_boost = 8
set p_pitch = 51
set i_pitch = 72
set d_pitch = 44
set f_pitch = 238
set p_roll = 47
set i_roll = 68
set d_roll = 40
set f_roll = 222
set p_yaw = 50
set i_yaw = 72
set f_yaw = 222
set d_min_roll = 28
set d_min_pitch = 30
set d_min_boost_gain = 33
set d_min_advance = 0
set auto_profile_cell_count = 3
set launch_control_mode = PITCHONLY
set launch_trigger_allow_reset = OFF
set launch_angle_limit = 60
set ff_max_rate_limit = 102
set ff_smooth_factor = 33
set ff_boost = 20
set dyn_idle_min_rpm = 16

profile 1
# profile 1 - 2S for 450-650mAh batteries
set dyn_lpf_dterm_min_hz = 98
set dyn_lpf_dterm_max_hz = 288
set dterm_lowpass2_hz = 240
set anti_gravity_gain = 4400
set iterm_rotation = ON
set iterm_relax = RPY
set iterm_relax_cutoff = 33
set yaw_lowpass_hz = 115
set throttle_boost = 10
set p_pitch = 67
set i_pitch = 81
set d_pitch = 55
set f_pitch = 238
set p_roll = 60
set i_roll = 77
set d_roll = 50
set f_roll = 222
set p_yaw = 65
set i_yaw = 81
set f_yaw = 222
set d_min_roll = 38
set d_min_pitch = 35
set d_min_boost_gain = 33
set d_min_advance = 0
set auto_profile_cell_count = 2
set ff_max_rate_limit = 102
set ff_smooth_factor = 33
set ff_boost = 25
set dyn_idle_min_rpm = 16

save
```

</details>

---

#### 3" 1408 4100KV 4S on Gemfan 3052-3

Build Link: [https://rotorbuilds.com/build/18675]

<details>
<summary>
CLI Copy/Paste
</summary>

```python

# For these lightweight 3" Craft, 48kHz PWM, Bidirectional DShot, MedHigh/23° Timing, 0.25 Startup Power, and DemagComp=Low

# Settings for All Quadcopters - Motors Reversed
set debug_mode = GYRO_SCALED
set iterm_relax = RPY
set vbat_pid_gain = OFF
set vbat_sag_compensation = 70
set small_angle = 180

# Filters
set gyro_lowpass2_hz = 500
set dyn_notch_width_percent = 0
set dyn_notch_q = 250
set dyn_notch_min_hz = 115
set dyn_notch_max_hz = 333
set dyn_lpf_gyro_min_hz = 400
set dyn_lpf_gyro_max_hz = 1000

# Configuration - 1407/1408 Motors
# Users of 1507 motors should verify by counting magnets
set dshot_bidir = ON
set motor_pwm_protocol = DSHOT300
set motor_poles = 12

# Profiles - Aggressive Props
set thrust_linear = 20

set gyro_rpm_notch_harmonics = 2
set gyro_rpm_notch_q = 750


profile 0
# profile 0 - 3S 650-1000mAh batteries
set dyn_lpf_dterm_min_hz = 112
set dyn_lpf_dterm_max_hz = 272
set dterm_lowpass2_hz = 240
set vbat_sag_compensation = 88
set anti_gravity_gain = 5000
set iterm_rotation = ON
set iterm_relax = RPY
set iterm_relax_cutoff = 33
set yaw_lowpass_hz = 111
set throttle_boost = 10
set p_pitch = 64
set d_pitch = 56
set f_pitch = 190
set p_roll = 59
set d_roll = 52
set f_roll = 180
set p_yaw = 63
set f_yaw = 180
set d_min_roll = 39
set d_min_pitch = 42
set d_min_boost_gain = 33
set d_min_advance = 0
set auto_profile_cell_count = 3
# Launch Stand Mode
set launch_control_mode = PITCHONLY
set launch_trigger_allow_reset = OFF
set launch_angle_limit = 60
set ff_max_rate_limit = 102
set ff_smooth_factor = 33
set ff_boost = 22
set dyn_idle_min_rpm = 16

profile 1
# profile 1 - 4S for 520-850mAh batteries
set dyn_lpf_dterm_min_hz = 112
set dyn_lpf_dterm_max_hz = 320
set dyn_lpf_dterm_curve_expo = 8
set dterm_lowpass2_hz = 240
set vbat_sag_compensation = 70
set anti_gravity_gain = 4400
set iterm_rotation = ON
set iterm_relax = RPY
set iterm_relax_cutoff = 33
set yaw_lowpass_hz = 111
set i_pitch = 81
set f_pitch = 190
set p_roll = 41
set i_roll = 77
set f_roll = 180
set i_yaw = 81
set f_yaw = 180
set d_min_roll = 25
set d_min_pitch = 27
set d_min_boost_gain = 33
set d_min_advance = 0
set auto_profile_cell_count = 4
# Launch Stand Mode
set launch_control_mode = PITCHONLY
set launch_trigger_allow_reset = OFF
set launch_angle_limit = 60
set ff_max_rate_limit = 102
set ff_smooth_factor = 33
set dyn_idle_min_rpm = 16

save
```

</details>

---

#### 5" Neutron-R Hybrid-SX :: 2150KV 6S // 2650KV 5S on Gemfan 51433/51466/51477

Build Link: [https://rotorbuilds.com/build/18676]

Build Link: [https://rotorbuilds.com/build/21176]

<details>
<summary>
CLI Copy/Paste
</summary>

```python

# For racing 5" craft, preferred ESC settings are 48kHz PWM, 23° Timing, 0.25 Rampup Power, DemagComp=Low

# Settings for All Quadcopters - Motors Reversed
set debug_mode = GYRO_SCALED
set iterm_relax = RPY
set vbat_pid_gain = OFF
set vbat_sag_compensation = 70
set small_angle = 180

# Filters - Aggressive
set gyro_lowpass_hz = 222
set gyro_lowpass2_hz = 500
set dyn_notch_width_percent = 0
set dyn_notch_q = 333
set dyn_notch_min_hz = 115
set dyn_notch_max_hz = 444
set dyn_lpf_gyro_min_hz = 0
set dshot_idle_value = 440
set dshot_bidir = ON

# Profiles - Aggressive
set gyro_rpm_notch_harmonics = 2
set gyro_rpm_notch_q = 750

# Default PID/Filter profile - 6S
profile 0
set auto_profile_cell_count = 6
set dyn_lpf_dterm_min_hz = 105
set dyn_lpf_dterm_max_hz = 288
set dyn_lpf_dterm_curve_expo = 8
set dterm_lowpass2_hz = 210
set vbat_sag_compensation = 70
set anti_gravity_gain = 5000
set iterm_rotation = ON
set iterm_relax = RPY
set yaw_lowpass_hz = 105
set p_pitch = 41
set i_pitch = 72
set d_pitch = 40
set p_roll = 37
set i_roll = 68
set d_roll = 37
set p_yaw = 40
set i_yaw = 72
set d_min_roll = 24
set d_min_pitch = 26
set f_pitch = 190
set f_roll = 180
set f_yaw = 180
set d_min_boost_gain = 33
set d_min_advance = 0
set ff_max_rate_limit = 102
set ff_smooth_factor = 33
set ff_boost = 15
# Launch Stand Operations - First Arm Only
set launch_control_mode = PITCHONLY
set launch_trigger_allow_reset = OFF
set launch_angle_limit = 60

# Auto-Applies for 5S
profile 1
set auto_profile_cell_count = 5
set dyn_lpf_dterm_min_hz = 105
set dyn_lpf_dterm_max_hz = 266
set dyn_lpf_dterm_curve_expo = 9
set dterm_lowpass2_hz = 210
set vbat_sag_compensation = 75
set anti_gravity_gain = 5000
set iterm_rotation = ON
set iterm_relax = RPY
set yaw_lowpass_hz = 105
set i_pitch = 81
set d_pitch = 45
set p_roll = 41
set i_roll = 77
set d_roll = 41
set i_yaw = 81
set d_min_roll = 27
set d_min_pitch = 30
set f_pitch = 190
set f_roll = 180
set f_yaw = 180
set d_min_boost_gain = 33
set d_min_advance = 0
set ff_max_rate_limit = 102
set ff_smooth_factor = 33
set ff_boost = 18
# Launch Stand Operations - First Arm Only
set launch_control_mode = PITCHONLY
set launch_trigger_allow_reset = OFF
set launch_angle_limit = 60

# Auto-Applies for 4S
profile 2
set auto_profile_cell_count = 4
set dyn_lpf_dterm_min_hz = 98
set dyn_lpf_dterm_max_hz = 238
set dyn_lpf_dterm_curve_expo = 10
set dterm_lowpass2_hz = 210
set vbat_sag_compensation = 80
set anti_gravity_gain = 5000
set iterm_rotation = ON
set iterm_relax = RPY
set yaw_lowpass_hz = 105
set p_pitch = 55
set d_pitch = 55
set p_roll = 50
set d_roll = 50
set p_yaw = 54
set d_min_roll = 33
set d_min_pitch = 36
set f_pitch = 190
set f_roll = 180
set f_yaw = 180
set d_min_boost_gain = 33
set d_min_advance = 0
set ff_max_rate_limit = 102
set ff_smooth_factor = 33
set ff_boost = 21
# Launch Stand Operations - First Arm Only
set launch_control_mode = PITCHONLY
set launch_trigger_allow_reset = OFF
set launch_angle_limit = 60

# restore default profile selection
profile 0

save
```

</details>

---

#### 7" 2408 1622KV 6S // 7" 2507 1500KV 6S // 7" 2408 1900KV 5S

Build Link: [https://rotorbuilds.com/build/21178]

Build Link: [https://rotorbuilds.com/build/10199]

<details>
<summary>
CLI Copy/Paste
</summary>

```python

# For these 7" Craft, I use 48kHz PWM, Med/19° Timing, 0.125 Startup Power, and DemagComp=Low

# Settings for All Quadcopters - Motors Reversed
set debug_mode = GYRO_SCALED
set iterm_relax = RPY
set vbat_pid_gain = OFF
set vbat_sag_compensation = 70
set yaw_lowpass_hz = 100
set yaw_motors_reversed = ON
set small_angle = 180

# Filters - 7" Biblade, 7" Triblade, F7 Folding Compatible
set gyro_lowpass2_hz = 500
set dyn_notch_width_percent = 0
set dyn_notch_q = 333
set dyn_notch_min_hz = 80
set dyn_notch_max_hz = 270
set dyn_lpf_gyro_min_hz = 400
set dyn_lpf_gyro_max_hz = 1000

# Configuration - Racing, Mountain Surfing, Cinematic Cruising, and Chasing Fast Cars
set dshot_bidir = ON
set motor_pwm_protocol = DSHOT300
set rc_smoothing_auto_smoothness = 20
set ff_interpolate_sp = AVERAGED_3
set feedforward_transition = 33

# Profile - Low-Throttle Smoothness Enhanced
set dyn_lpf_dterm_min_hz = 91
set dyn_lpf_dterm_max_hz = 221
set dterm_lowpass2_hz = 150
set iterm_rotation = ON
set thrust_linear = 33 # This is a fairly high thrust_linear value, but for lower authority (2408, 2507) this is what I've found works
set tpa_rate = 75
set tpa_breakpoint = 1350
set iterm_relax_type = SETPOINT
set iterm_relax_cutoff = 7
set throttle_boost = 15
set p_pitch = 72
set i_pitch = 117
set d_pitch = 72
set f_pitch = 148
set p_roll = 65
set i_roll = 111
set d_roll = 65
set f_roll = 140
set p_yaw = 70
set i_yaw = 117
set f_yaw = 140
set d_min_roll = 43
set d_min_pitch = 47
set d_min_boost_gain = 44
set d_min_advance = 100
set dshot_idle_value = 399
set idle_min_rpm = 12

# LaunchControl_Preferred - Yes, I do actually use launch mode on my Long Range rigs
set launch_control_mode = PITCHONLY
set launch_trigger_allow_reset = OFF
set launch_angle_limit = 60

save
```

</details>

## Pilot: Furadi

<details>
<summary>
Furadi 5" NBD Infinity CLI Settings - Copy/Paste
</summary>

Quad - (not affiliate links)

- RR CL1 [https://tinyurl.com/trq8dat]
- NBD Infinity 20x20 [https://tinyurl.com/wgatgat]
- Hypetrain Vanover [https://tinyurl.com/rdoaxpb]
- Caddx Vista [https://tinyurl.com/rebl4xy]
- Hero Mount - [https://tinyurl.com/ycblvodd]
- Pyrodrone 1100 6s - [https://tinyurl.com/wtd7jph]
- Gemfan 51466 - [https://tinyurl.com/ycjn76ag]

```python
# DIFF for Furadi 5" NBD Infinity Build

# name: INFINITY

# master
set gyro_lowpass2_hz = 500
set dyn_notch_width_percent = 0
set dyn_notch_q = 250
set dyn_lpf_gyro_min_hz = 400
set dyn_lpf_gyro_max_hz = 1000
set dshot_bidir = ON
set yaw_motors_reversed = OFF
set yaw_deadband = 10

profile 0

# profile 0
set dyn_lpf_dterm_min_hz = 140
set dyn_lpf_dterm_max_hz = 340
set dyn_lpf_dterm_curve_expo = 7
set dterm_lowpass2_hz = 300
set vbat_sag_compensation = 50
set throttle_boost = 0
set p_pitch = 90
set i_pitch = 117
set d_pitch = 60
set f_pitch = 112
set p_roll = 82
set i_roll = 111
set d_roll = 55
set f_roll = 105
set p_yaw = 88
set i_yaw = 117
set f_yaw = 105
set d_min_roll = 36
set d_min_pitch = 39
set d_min_advance = 32

rateprofile 0

# rateprofile 0 - Furadi Rates
set rates_type = KISS
set roll_rc_rate = 90
set pitch_rc_rate = 90
set yaw_rc_rate = 90
set roll_srate = 77
set pitch_srate = 75
save
```

</details>

<details>
<summary>
Furadi 7" FR-7 NBD Infinity CLI Settings - Copy/Paste
</summary>

FR7 -

Frame files - [https://www.thingiverse.com/thing:359...]
Print Files - [https://www.thingiverse.com/thing:360...]

Newbeedrone Infinity Stack - [https://tinyurl.com/ulqey7j]
Hyperlite 2408.5 1922kv - [https://tinyurl.com/r7jkk3m]
Dynogy 6s 3700 65c - [https://tinyurl.com/w5wmtf7]
HQ 7x4x3 - [https://tinyurl.com/uvvdu96]
Lumenier AXII 2 LR - [https://tinyurl.com/u9la6zg]

```python
# DIFF for Furadi 7" NBD Infinity Build

# master
set gyro_lowpass2_hz = 500
set dyn_notch_width_percent = 0
set dyn_notch_q = 250
set dyn_lpf_gyro_min_hz = 400
set dyn_lpf_gyro_max_hz = 1000
set dshot_bidir = ON

# GPS Setup (Optional)
set failsafe_procedure = GPS-RESCUE
set yaw_motors_reversed = OFF
set gps_provider = UBLOX
set gps_sbas_mode = AUTO
set gps_ublox_use_galileo = ON
set gps_set_home_point_once = ON
set gps_rescue_initial_alt = 60
set gps_rescue_descent_dist = 120
set gps_rescue_min_sats = 6
set gps_rescue_allow_arming_without_fix = ON
set gps_rescue_alt_mode = FIXED_ALT
set yaw_deadband = 10
set pid_process_denom = 2

profile 0

# profile 0
set dyn_lpf_dterm_min_hz = 140
set dyn_lpf_dterm_max_hz = 340
set dterm_lowpass2_hz = 300
set vbat_sag_compensation = 80
set throttle_boost = 0
set p_pitch = 77
set i_pitch = 108
set d_pitch = 58
set f_pitch = 114
set p_roll = 71
set i_roll = 102
set d_roll = 53
set f_roll = 108
set p_yaw = 76
set i_yaw = 108
set f_yaw = 108
set d_min_roll = 35
set d_min_pitch = 38
set d_min_advance = 27

# rateprofile 0 - Furadi Rates
set rates_type = KISS
set roll_rc_rate = 90
set pitch_rc_rate = 90
set yaw_rc_rate = 90
set roll_srate = 77
set pitch_srate = 75
save
```

</details>

## Pilot: JJang FPV

About: 'Responsive but Smooth' feel, set up for 5" normal freestyle(cinematic, juicy and more) with Gopro 6/7/8, 4S battery. There is no propwash at all.

Caution: You should activate 'Bidirectional DShot' for rpm filter and adjust 'idle_min_rpm' about 70% of dshot_idle_rpm or start with '21'.

<details>
<summary>
JJang's PIDs: 5" 4S Normal Freestyle CLI Settings - Copy/Paste
</summary>

```python
set gyro_lowpass2_hz = 300
set dyn_notch_width_percent = 0
set dyn_notch_q = 250
set dyn_notch_min_hz = 90
set dyn_notch_max_hz = 515
set dyn_lpf_gyro_min_hz = 240
set dyn_lpf_gyro_max_hz = 600
set min_check = 1020
set max_check = 1995
set rc_smoothing_auto_smoothness = 7
set blackbox_device = NONE
set min_throttle = 1020
set dshot_idle_value = 500
set dshot_bidir = ON
set use_unsynced_pwm = OFF
set motor_pwm_protocol = DSHOT300
set deadband = 2
set yaw_deadband = 2
set pid_process_denom = 2
set gyro_rpm_notch_q = 700
set dyn_lpf_dterm_min_hz = 84
set dyn_lpf_dterm_max_hz = 204
set dyn_lpf_dterm_curve_expo = 7
set dterm_lowpass2_hz = 180
set vbat_sag_compensation = 100
set anti_gravity_gain = 3900
set feedforward_transition = 40
set iterm_relax_type = GYRO
set iterm_relax_cutoff = 20
set yaw_lowpass_hz = 100
set throttle_boost = 7
set throttle_boost_cutoff = 25
set p_pitch = 65
set i_pitch = 104
set d_pitch = 58
set f_pitch = 116
set p_roll = 60
set i_roll = 99
set d_roll = 54
set f_roll = 109
set p_yaw = 69
set i_yaw = 99
set f_yaw = 109
set d_min_roll = 35
set d_min_pitch = 39
set ff_interpolate_sp = AVERAGED_3
set ff_spike_limit = 70
set ff_smooth_factor = 40
set idle_min_rpm = 21
set roll_rc_rate = 120
set pitch_rc_rate = 120
set yaw_rc_rate = 175
set roll_expo = 15
set pitch_expo = 15
set yaw_expo = 20
set roll_srate = 72
set pitch_srate = 75
set yaw_srate = 41
set tpa_rate = 70
set tpa_breakpoint = 1150
set throttle_limit_type = CLIP
set throttle_limit_percent = 98

save
```

</details>

# BF 4.1.X

Betaflight 4.1.X with configurator 10.6

Note: the P:D Ratio slider in the 10.6 Configurator is reversed from the later releases - in 10.6 moving the slider to right increases P gains while decreasing D gains, which is not the behavior in the 10.7 Configurator. A value of 0.8 on the PD Balance slider produce gains of P≈D, while 1.0 produces a P:D ratio where D gains are roughly 0.8x of P gains.

There are added features, and a couple of noteworthy bugs present in 4.1.X.

Setup for enabling bidirectional DShot features (RPM filtering, dynamic idle) is simpler in BF4.1.X, as is configuring RC Smoothing using the configurator parameters. With utilizing RPM Notch filters for attenuation of motor noise bands, changes in lowpass filtering (particularly dynamic lowpass filtering) are typically required in order to achieve the substantial improvements possible with RPM filtering.

Feed Forward (FF) Interpolation has been introduced, which uses a trailing average of 2 radio control setpoint samples to set feed-forward input values (which are then multiplied by the FF Gains). For noisier or less consistent RC signals (e.g. FrSky R9), using ff_interpolate_sp = averaged is an improvement, though BF4.2 and later allows for higher numbers of samples to be required (up to 4).

The I-Term Relax mode in Setpoint does not achieve any effective values below 20 - for larger craft where lower iTermRelax values are needed or tuning strategies that rely on removing I term involvement to tune P/D Ratios and gain, shift this to Gyro (in 4.2 and later, you can use Setpoint again).

VBat PID Compensation is often helpful for tuning flights, and is a recommended setting when conducting blackbox logging, or if craft authority as battery voltage approaches sag points is important. This has been effectively replaced by VBAT Sag compensation in BF4.2 releases.

Preferred tuning methods can lean heavily on the Slider functionality in the 10.6 configurator, with many archetypes of copters being fairly quick to tune quickly with sliders based on quick information, following a standard procedure of determining the correct P:D gain ratio, incrementing the P&D Gains until oscillations or trilling sounds are observed (then reducing 1-2 clicks), then finally adjusting FeedForward through gain sliders and FeedForward Transition (which reduces effective feed forward gain from center point out to the specified value linearly) until desired stick feel is achieved.

Running higher Yaw P gains is entirely possible, although sliders do not allow this behavior - the defaults in BF4.2 (using the same effective PID gains) allow for running Yaw P Gains equal to Roll P gains, and works very well for most craft, so do not be concerned if during the tuning process higher Yaw P gains are required, you should proceed to increase those gains until matching Roll P gains without concerns.

# BF 4.0.X

---

#### Back to 4.0.x Defaults

This will take your setup back to BF 4.0.x defaults

<details>
<summary>
CLI Copy\Paste
</summary>

```python
#Filter Settings
set dyn_notch_min_hz = 150

set dyn_lpf_gyro_min_hz = 150
set dyn_lpf_gyro_max_hz = 450
set gyro_lowpass_hz = 0
set gyro_lowpass_type = BiQUAD
set gyro_lowpass2_hz = 150
set gyro_lowpass2_type = PT1

set dyn_lpf_dterm_min_hz = 150
set dyn_lpf_dterm_max_hz = 250
set dterm_lowpass_type = BiQUAD
set dterm_lowpass_hz = 0
set dterm_lowpass2_type = PT1
set dterm_lowpass2_hz = 100

set dyn_notch_width_percent = 8 #Dual Dynamic Notches is as default; 8% spread from center to center.

#PID Gains Settings
set vbat_pid_gain = OFF
set anti_gravity_gain = 5000
set p_pitch = 46
set i_pitch = 70
set d_pitch = 38
set f_pitch = 75

set p_roll = 42
set i_roll = 60
set d_roll = 35
set f_roll = 70

set p_yaw = 35
set i_yaw = 100
set d_yaw = 0
set f_yaw = 0

set d_min_pitch = 20
set d_min_roll = 22
set d_min_boost_gain = 27
set d_min_advance = 20

set pidsum_limit = 500 #restricted to 50% by default

#For racing use "Setpoint" and cutoff = 20
set iterm_relax_type = Setpoint
set iterm_relax_cutoff = 20

#TPA Settings (which is D-term only by default)
set tpa_rate = 50
set tpa_breakpoint = 1500
save
```

</details>

---

## Pilot: UAV TECH

**ALWAYS CHECK YOUR MOTOR TEMPS AFTER A SHORT 15 SECOND FORWARD FLIGHT**

**WARNING: If your mechanical/electrical issues are not addressed (most of the time those are the issues folks have), the below settings may require heavier filtering and lower PID gains (the BF default).** Heavier filtering and lower PID gains can provide for cooler motors, but also has worse flight performance.

A clean build is when a spectrograph of the RAW gyro noise trace (Debug_Mode=Gyro_Scaled) on a FULL & HARD flight looks like the below or better:

![https://github.com/spatzengr/UAVtech-Resources/blob/master/Gyro_Raw%20Noise%20Profiles/Clean/Nova%20on%20BF4.0.png]

"Better" means the spektrograph lines are lower or have more well defined peaks. An important factor is the dip in raw motor vibrations ("noise") from 80 to 200hz.

---

#### Brushless Whoop Class (based on Mobula 7 w/ 2s)

<details>
<summary>
CLI Copy\Paste
</summary>

```python
#Filter Settings
set dyn_notch_min_hz = 100

set dyn_lpf_gyro_min_hz = 100
set dyn_lpf_gyro_max_hz = 300
set gyro_lowpass_type = PT1
set gyro_lowpass_hz = 0
set gyro_lowpass2_type = PT1
set gyro_lowpass2_hz = 0

set dyn_lpf_dterm_min_hz = 70
set dyn_lpf_dterm_max_hz = 170
set dterm_lowpass_type = BiQUAD
set dterm_lowpass_hz = 0
set dterm_lowpass2_type = PT1
set dterm_lowpass2_hz = 0

#PID Gains Settings
set vbat_pid_gain = ON
set anti_gravity_gain = 5000

set p_pitch = 80
set i_pitch = 25
set d_pitch = 80
set f_pitch = 100

set p_roll = 80
set i_roll = 25
set d_roll = 80
set f_roll = 100

set p_yaw = 90
set i_yaw = 90
set d_yaw = 0
set f_yaw = 100

set d_min_pitch = 0
set d_min_roll = 0
set d_min_boost_gain = 30
set d_min_advance = 0

set pidsum_limit = 1000 #unleashes PID Sum to be 100% (not restricted to 50% by default)

#Assumes Freestyle | For racing use "Setpoint" and cutoff = 20
set iterm_relax_type = GYRO
set iterm_relax_cutoff = 10

#TPA Settings (which is D-term only by default)
set tpa_rate = 80
set tpa_breakpoint = 1750
save

```

</details>

---

#### 2" - 3" Quad - 11xx-12xx Motors

`(in coordination with George Hartmann)`

<details>
<summary>
CLI Copy\Paste
</summary>

```python
#Filter Settings
set gyro_lowpass_type = BiQUAD
set dyn_notch_min_hz = 150
set dyn_lpf_gyro_min_hz = 150
set dyn_lpf_gyro_max_hz = 700
set dyn_lpf_dterm_min_hz = 150
set dyn_lpf_dterm_max_hz = 250
set dterm_lowpass_type = BiQUAD
set dterm_lowpass2_hz = 150

#PID Gains Settings
set vbat_pid_gain = ON
set anti_gravity_gain = 5000

set p_pitch = 33
set i_pitch = 85
set d_pitch = 35

set p_roll = 28
set i_roll = 78
set d_roll = 32

set d_min_pitch = 18
set d_min_roll = 16
set d_min_boost_gain = 30
set d_min_advance = 0

set pidsum_limit = 1000 #unleashes PID Sum to be 100% (not restricted to 50% by default)

#Assumes Freestyle | For racing use "Setpoint" and cutoff = 20
set iterm_relax_type = GYRO
set iterm_relax_cutoff = 10

#TPA Settings (which is D-term only by default)
set tpa_rate = 80
set tpa_breakpoint = 1800
save

```

</details>

---

#### 3" Quad - 14xx-15xx Motors

`(in coordination with George Hartmann)`

<details>
<summary>
CLI Copy\Paste
</summary>

```python
#Filter Settings
set gyro_lowpass_type = BiQUAD
set dyn_notch_min_hz = 150
set dyn_lpf_gyro_min_hz = 150
set dyn_lpf_gyro_max_hz = 650
set dyn_lpf_dterm_min_hz = 150
set dyn_lpf_dterm_max_hz = 250
set dterm_lowpass_type = BiQUAD
set dterm_lowpass2_hz = 150

#PID Gains Settings
set vbat_pid_gain = ON
set anti_gravity_gain = 5000

set p_pitch = 38
set i_pitch = 85
set d_pitch = 35

set p_roll = 35
set i_roll = 78
set d_roll = 32

set d_min_pitch = 18
set d_min_roll = 16
set d_min_boost_gain = 30
set d_min_advance = 0

set pidsum_limit = 1000 #unleashes PID Sum to be 100% (not restricted to 50% by default)

#Assumes Freestyle | For racing use "Setpoint" and cutoff = 20
set iterm_relax_type = GYRO
set iterm_relax_cutoff = 10

#TPA Settings (which is D-term only by default)
set tpa_rate = 80
set tpa_breakpoint = 1800
save

```

</details>

#### 5" Quad - Setpoint Tracker - Lower Cutoffs Filters (more filtering)

For: 650g to 725g AUW Kwads | 1000 to 1100 deg/sec rates.

Kwads with Noise between 50hz and 200hz

<details>
<summary>
CLI Copy\Paste
</summary>

```python
#Filter Settings
set dyn_notch_min_hz = 80

set dyn_lpf_gyro_min_hz = 0
set dyn_lpf_gyro_max_hz = 0
set gyro_lowpass_hz = 0
set gyro_lowpass_type = PT1
set gyro_lowpass2_hz = 200
set gyro_lowpass2_type = PT1


set dyn_lpf_dterm_min_hz = 0
set dyn_lpf_dterm_max_hz = 0
set dterm_lowpass_type = PT1
set dterm_lowpass_hz = 0
set dterm_lowpass2_type = BiQUAD
set dterm_lowpass2_hz = 125

#For RPM Filter: Without RPM leave at = 8 (default)
#Set to 0 if you can afford less Dynamic Notch filtering because RPM is added (reduces to one notch instead of two on DN)
#set dyn_notch_width_percent = 8

#PID Gains Settings
set vbat_pid_gain = ON
set anti_gravity_gain = 10000
set p_pitch = 60
set i_pitch = 70
set d_pitch = 60
set f_pitch = 350

set p_roll = 65
set i_roll = 60
set d_roll = 65
set f_roll = 325

set p_yaw = 100
set i_yaw = 100
set d_yaw = 0
set f_yaw = 125

set d_min_pitch = 45
set d_min_roll = 45
set d_min_boost_gain = 30
set d_min_advance = 0
set pidsum_limit = 1000 #unleashes PID Sum to be 100% (not restricted to 50% by default)

#Assumes Freestyle | For racing use "Setpoint" and cutoff = 20
set iterm_relax_type = GYRO
set iterm_relax_cutoff = 10

#TPA Settings (which is D-term only by default)
set tpa_rate = 80
set tpa_breakpoint = 1750
save

```

</details>

---

#### 5" Quad - Setpoint Tracker - Higher Cutoffs Filters (less filtering)

For: 650g to 725g AUW Kwads | 1000 to 1100 deg/sec rates.

Kwads with NO Noise between 50hz and 200hz

**Requires a quad with NO noise issues from 50hz to 200hz! So, if you are not sure, use the above first and if that goes well try these settings next.**

<details>
<summary>
CLI Copy\Paste
</summary>

```python
#Filter Settings
set dyn_notch_min_hz = 80

set dyn_lpf_gyro_min_hz = 0
set dyn_lpf_gyro_max_hz = 0
set gyro_lowpass_hz = 0
set gyro_lowpass_type = PT1
set gyro_lowpass2_hz = 0
set gyro_lowpass2_type = PT1

set dyn_lpf_dterm_min_hz = 80
set dyn_lpf_dterm_max_hz = 175
set dterm_lowpass_type = BiQUAD
set dterm_lowpass_hz = 0
set dterm_lowpass2_type = PT1
set dterm_lowpass2_hz = 0

#For RPM Filter: Without RPM leave at = 8 (default)
#Set to 0 if you can afford less Dynamic Notch filtering because RPM is added (reduces to one notch instead of two on DN)
#set dyn_notch_width_percent = 8

#PID Gains Settings
set vbat_pid_gain = ON
set anti_gravity_gain = 10000
set p_pitch = 60
set i_pitch = 70
set d_pitch = 60
set f_pitch = 350

set p_roll = 65
set i_roll = 60
set d_roll = 65
set f_roll = 325

set p_yaw = 100
set i_yaw = 100
set d_yaw = 0
set f_yaw = 125

set d_min_pitch = 45
set d_min_roll = 45
set d_min_boost_gain = 30
set d_min_advance = 0

set pidsum_limit = 1000 #unleashes PID Sum to be 100% (not restricted to 50% by default)

#Assumes Freestyle | For racing use "Setpoint" and cutoff = 20
set iterm_relax_type = GYRO
set iterm_relax_cutoff = 10

#TPA Settings (which is D-term only by default)
set tpa_rate = 80
set tpa_breakpoint = 1750
save

```

</details>

---

#### 6"/7" Quads

<details>
<summary>
CLI Copy\Paste
</summary>

```python
#Filter Settings
set gyro_lowpass_type = PT1
set dyn_notch_min_hz = 100
set dyn_lpf_gyro_min_hz = 100
set dyn_lpf_gyro_max_hz = 300
set dyn_lpf_dterm_min_hz = 100
set dyn_lpf_dterm_max_hz = 200
set dterm_lowpass_type = PT1
set dterm_lowpass2_hz = 0

#For RPM Filter: Without RPM leave at = 8 (default)
#Set to 0 if you can afford less Dynamic Notch filtering because RPM is added (reduces to one notch instead of two on DN)
#set dyn_notch_width_percent = 8

#PID Gains Settings
set vbat_pid_gain = ON
set anti_gravity_gain = 10000

set d_pitch = 58
set d_roll = 55

set d_min_pitch = 28
set d_min_roll = 25
set d_min_boost_gain = 45
set d_min_advance = 0

set pidsum_limit = 1000 #unleashes PID Sum to be 100% (not restricted to 50% by default)

#Assumes Freestyle | For racing use "Setpoint" and cutoff = 20
set iterm_relax_type = GYRO
set iterm_relax_cutoff = 10

#TPA Settings (which is D-term only by default)
set tpa_rate = 80
set tpa_breakpoint = 1800
save

```

</details>

---

#### X-Class [IN PROGRESS!!!]

<details>
<summary>
CLI Copy\Paste
</summary>

```python
#Filter Settings
set gyro_lowpass_type = PT1
set dyn_notch_min_hz = 50
set dyn_lpf_gyro_min_hz = 50
set dyn_lpf_gyro_max_hz = 200
set dyn_lpf_dterm_min_hz = 60
set dyn_lpf_dterm_max_hz = 150
set dterm_lowpass_type = BIQUAD
set dterm_lowpass2_hz = 0

#PID Gains Settings
set vbat_pid_gain = ON
set anti_gravity_gain = 10000
set d_pitch = ??
set d_roll = ??
set d_min_pitch = ??
set d_min_roll = ??
set d_min_boost_gain = 45
set d_min_advance = 0

#Assumes Freestyle | For racing use "Setpoint" and cutoff = 20
set iterm_relax_type = GYRO
set iterm_relax_cutoff = 10

#TPA Settings (which is D-term only by default)
set tpa_rate = 80
set tpa_breakpoint = 1750
save

```

</details>

---

#### PID Tuning Preset

<details>
<summary>
CLI Copy\Paste
</summary>

```python
#Filter Settings
set dyn_notch_min_hz = 80
set gyro_lowpass_type = PT1
set dyn_lpf_gyro_min_hz = 100
set dyn_lpf_gyro_max_hz = 350
set gyro_lowpass2_hz = 0
set dterm_lowpass_type = BiQUAD
set dyn_lpf_dterm_min_hz = 80
set dyn_lpf_dterm_max_hz = 175
set dterm_lowpass2_hz = 0

#PID Gains Settings
set vbat_pid_gain = ON
set anti_gravity_gain = 10000

set f_pitch = 0
set f_roll = 0
set f_yaw = 0

set d_min_pitch = 0
set d_min_roll = 0

set pidsum_limit = 1000 #unleashes PID Sum to be 100% (not restricted to 50% by default)

#PID Controller Settings
set feedforward_transition = 0
set abs_control_gain = 0
set use_integrated_yaw = OFF
set iterm_relax_type = GYRO
set iterm_relax_cutoff = 10

#TPA Settings (which is D-term only by default)
set tpa_rate = 80
set tpa_breakpoint = 1800
save

```

</details>

---

## Pilot: RipperDrone

#### 5" Quad (5s-6s)

<details>
<summary>
CLI Copy\Paste
</summary>

```python
#Filter Settings
set gyro_lowpass_type = PT1
set dyn_notch_min_hz = 100
set dyn_lpf_gyro_max_hz = 510
set dterm_lowpass_type = PT1
set dterm_lowpass2_hz = 0

#PID Gains Settings
set vbat_pid_gain = ON
set anti_gravity_gain = 10000
set p_pitch = 35
set d_pitch = 25
set f_pitch = 32
set p_roll = 33
set d_roll = 23
set f_roll = 30
set p_yaw = 30
set i_yaw = 90
set d_min_roll = 0
set d_min_pitch = 0

```

</details>

---

## Pilot: CUDA KEER

#### [3" toothfairy with Emax RS1306b BF4.2](https://github.com/cudakeer808/betaflight/wiki/3%22-toothfairy-with-Emax-1306-4000kv-BF4.2)

#### [Floss 2.1 hybrid with Hyperlite 2207 1922kv BF4.2 race rig](https://github.com/cudakeer808/betaflight/wiki/floss-2.1-2207-1922-BF4.2)

#### [6" Floss 2.1 with Hyperlite 2207 1922kv BF4.0 race rig](https://github.com/cudakeer808/betaflight/wiki/floss-2.1-2207-1922-rpm_filter)

#### [5" Massive Droner with T-Motor F60pro II](https://github.com/cudakeer808/betaflight/wiki/Massive-Droner-2207-1750kv)

---

## Pilot: TehLlama

#### 6" Neutron-R with BrotherHobby R6 2207 Race Rig

##### [Build Details](https://rotorbuilds.com/build/18676)

<details>
<summary>
CLI Copy\Paste
</summary>

```python
# Filter Settings
set dyn_lpf_dterm_min_hz = 91
set dyn_lpf_dterm_max_hz = 221
set dterm_lowpass_type = PT1
set dterm_lowpass_hz = 150
set dterm_lowpass2_type = PT1
set dterm_lowpass2_hz = 225

#PID Gains Settings
set vbat_pid_gain = ON
set anti_gravity_gain = 3000
set p_pitch = 53
set i_pitch = 70
set d_pitch = 37
set f_pitch = 180
set p_roll = 48
set i_roll = 68
set d_roll = 34
set f_roll = 170
set p_yaw = 40
set i_yaw = 80
set d_yaw = 0
set f_yaw = 100
set d_min_pitch = 24
set d_min_roll = 27

# This is my preferred, but unconventional iTermRelax Setup - relies on FF to push Yaw axis around
set iterm_relax = RPY
set iterm_relax_type = SETPOINT
set iterm_relax_cutoff = 12

# Rates - These are good novice racer rates
# Max stick deflection values are 375°/375°/275° rates (R/P/Y)
set rates_type = BETAFLIGHT
set roll_rc_rate = 75
set pitch_rc_rate = 75
set yaw_rc_rate = 55
set roll_expo = 0
set pitch_expo = 0
set yaw_expo = 0
set roll_srate = 60
set pitch_srate = 60
set yaw_srate = 60


```

</details>

---

## REVERT 4.0.x DEFAULTS TO AN OLDER VERSION OF BETAFLIGHT DEFAULTS

These are presets to apply to BF 4.0.x to get the defaults of an older versions of Betaflight. This WILL give you the same flight experience as an older release if that is what you like, but want the new features of BF 4.0.x.

#### Revert to BF 3.5.X

<details>
<summary>
CLI Copy\Paste
</summary>

```python
#Features to be off by Default
feature -AIRMODE

# Filter Settings
set gyro_lowpass_type = PT1
set gyro_lowpass_hz = 100
set gyro_lowpass2_type = PT1
set gyro_lowpass2_hz = 300

set dyn_lpf_gyro_min_hz = 0
set dyn_lpf_dterm_min_hz = 0

set dyn_notch_range = Auto
set dyn_notch_width_percent = 0
set dyn_notch_q = 70
set dyn_notch_min_hz = 130

set dterm_lowpass_type = PT1
set dterm_lowpass_hz = 100
set dterm_lowpass2_type = PT1
set dterm_lowpass2_hz = 200

set d_min_roll = 0
set d_min_pitch = 0
set d_min_yaw = 0

# Default PIDs
set p_pitch = 50
set i_pitch = 50
set d_pitch = 27
set f_pitch = 60
set p_roll = 46
set i_roll = 45
set d_roll = 25
set f_roll = 60
set p_yaw = 65
set i_yaw = 45
set d_yaw = 0
set f_yaw = 60

#PID Controller Settings
set iterm_relax_type = GYRO
set iterm_relax_cutoff = 11
set abs_control_gain = 0
set use_integrated_yaw = OFF

set tpa_mode = PD
set tpa_rate = 10
set tpa_breakpoint = 1650

#RC smoothing settings
set rc_smoothing_type = INTERPOLATION
save

```

</details>

---

#### Revert to BF 3.4.X

<details>
<summary>
CLI Copy\Paste
</summary>

```python
#Features to be off by Default
feature -AIRMODE

# Filter Settings
set gyro_lowpass_type = PT1
set gyro_lowpass_hz = 100
set gyro_lowpass2_type = PT1
set gyro_lowpass2_hz = 300

set dyn_lpf_gyro_min_hz = 0
set dyn_lpf_dterm_min_hz = 0

set dyn_notch_range = Low
set dyn_notch_width_percent = 0
set dyn_notch_q = 70
set dyn_notch_min_hz = 125

set dterm_lowpass_type = PT1
set dterm_lowpass_hz = 100
set dterm_lowpass2_type = PT1
set dterm_lowpass2_hz = 200

set d_min_roll = 0
set d_min_pitch = 0
set d_min_yaw = 0

# Default PIDs
set p_pitch = 50
set i_pitch = 50
set d_pitch = 27
set f_pitch = 150
set p_roll = 46
set i_roll = 45
set d_roll = 25
set f_roll = 150
set p_yaw = 70
set i_yaw = 45
set d_yaw = 0
set f_yaw = 0

#PID Controller Settings
set feedforward_transition = 0
set abs_control_gain = 0
set use_integrated_yaw = OFF
set anti_gravity_gain = 5000

#I-term Relax is OFF by Default
set iterm_relax_type = Setpoint
set iterm_relax_cutoff = 100
#if you turn on i-Term Relax, 3.4 defaults are below (take "#" off front)
#set iterm_relax_type = Gyro
#set iterm_relax_cutoff = 11

set tpa_mode = PD
set tpa_rate = 10
set tpa_breakpoint = 1650

#RC smoothing settings
set rc_smoothing_type = INTERPOLATION
save

```

</details>

---

#### Revert to BF 3.2.x & 3.3.X (they were the same)

<details>
<summary>
CLI Copy\Paste
</summary>

```python
#Features to be off by Default
feature -AIRMODE
feature -DYNAMIC_FILTER
feature -ANTI_GRAVITY

# Filter Settings
set gyro_lowpass_type = PT1
set gyro_lowpass_hz = 90
set gyro_lowpass2_type = PT1
set gyro_lowpass2_hz = 0

set dyn_lpf_gyro_min_hz = 0
set dyn_lpf_dterm_min_hz = 0

set gyro_notch1_hz = 400
set gyro_notch1_cutoff = 300
set gyro_notch2_hz = 200
set gyro_notch2_cutoff = 100

set dyn_notch_range = Low
set dyn_notch_width_percent = 0
set dyn_notch_q = 70
set dyn_notch_min_hz = 125

set dterm_lowpass_type = BIQUAD
set dterm_lowpass_hz = 100
set dterm_lowpass2_type = PT1
set dterm_lowpass2_hz = 0
set dterm_notch_hz = 260
set dterm_notch_cutoff = 160

set d_min_roll = 0
set d_min_pitch = 0
set d_min_yaw = 0

# Default PIDs
set p_pitch = 58
set i_pitch = 50
set d_pitch = 35
set f_pitch = 0
set p_roll = 40
set i_roll = 40
set d_roll = 30
set f_roll = 0
set p_yaw = 70
set i_yaw = 45
set d_yaw = 0
set f_yaw = 0

#PID Controller Settings
set feedforward_transition = 0
set iterm_relax = OFF
set abs_control_gain = 0
set use_integrated_yaw = OFF
set anti_gravity_gain = 1000

set tpa_mode = PD
set tpa_rate = 10
set tpa_breakpoint = 1650

#RC smoothing settings
set rc_smoothing_type = INTERPOLATION
save

```

</details>

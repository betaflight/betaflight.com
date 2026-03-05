# Command Line Interface (CLI)

Betaflight has a command line interface (CLI) that can be used to change settings and configure the FC.

This document is a comprehensive reference for **all flight tuning-relevant CLI variables** in Betaflight **2025.12**. It covers gyro/filter tuning, PID configuration, rates, failsafe, GPS, battery monitoring, and logging — everything needed for flight dynamics setup and optimization. All defaults and ranges below are accurate for **Betaflight 2025.12** only; they may differ in older versions.

## Important version differences

- Dynamic damping naming changed: in **4.5** `d_roll` is D_max and `d_min_roll` is D_min; in **2025.12** `d_roll` is the base D and `d_max_roll` is the peak — `d_min_roll` no longer exists.
- GPS rescue: `gps_rescue_*` variables exist in **4.5** only; redesigned in 2025.12.
- Failsafe landing duration: `failsafe_off_delay` (4.5) → `failsafe_landing_time` (2025.12).

---

## CLI Access & Usage

### Accessing the CLI

Send `#` over the serial port (or use the CLI tab in Betaflight Configurator). Enter `save` to write settings and reboot. Enter `exit` or `exit noreboot` to leave without saving.

### Key CLI Commands

| Command | Description |
|---------|-------------|
| `get [name]` | Show current value of one or all variables (partial name works: `get acc`) |
| `set name=value` | Set a variable. Must `save` afterward. |
| `save` | Write settings to flash and reboot FC |
| `save noreboot` | Write settings without rebooting (2025.12+) |
| `diff` | Show all non-default settings for current profile/rateprofile |
| `diff all` | Show non-default settings across all profiles |
| `dump` | Full configuration dump (all values, including defaults) |
| `dump all` | Full dump across all profiles |
| `defaults` | Factory reset and reboot |
| `defaults nosave` | Reset to defaults without rebooting |
| `status` | Show FC status: gyro type, loop time, CPU load, arming flags |
| `version` | Show firmware version string |
| `tasks` | Show task scheduler stats (CPU usage per task) |
| `profile [0-5]` | Switch active PID profile |
| `rateprofile [0-5]` | Switch active rate profile |
| `feature list` | List all available features |
| `feature FEATURE_NAME` | Enable a feature |
| `feature -FEATURE_NAME` | Disable a feature |
| `aux <index> <mode> <channel> <start> <end> <logic>` | Configure AUX mode switch |
| `rxfail` | Show/set per-channel failsafe fallback values |
| `resource` | Show/set pin assignments |
| `dma` | Show/set DMA channel assignments |
| `serial` | Configure serial port functions and baud rates |
| `map` | Show/set RC channel order mapping |
| `adjrange` | Configure in-flight adjustment ranges |
| `motor <index> [value]` | Read or drive a motor (use with caution — props off) |
| `dshot_telemetry_info` | Show DSHOT telemetry statistics |
| `dshotprog <index> <cmd>` | Send DSHOT ESC programming commands |
| `gyroregisters` | Dump raw gyro hardware register contents |
| `simplified_tuning apply\| disable` | Apply or clear simplified tuning slider values |
| `bind_rx` | Initiate RX binding (SRXL2, CRSF, SPI RX) |
| `bl` | Reboot into bootloader |
| `msc` | Switch to USB mass-storage mode (SD card or flash) |
| `rc_smoothing_info` | Show computed RC smoothing cutoff frequencies |
| `vtx_info` | Show VTX power configuration |
| `flash_info` | Show onboard flash chip info |
| `flash_read <address> <length>` | Read from flash at specified address and length |
| `flash_erase` | Erase blackbox flash (also: `flash_scan`) |

### Backup and Restore

Always back up before firmware updates. **Never paste a `diff` or `dump` from one firmware version into a different version** — variable names and valid ranges change between releases and will silently corrupt the configuration.

```
# Backup
diff all         # preferred — only changed settings, all profiles

# Restore
defaults         # full chip erase first
# paste diff output line by line (not too fast over USART)
save
```

---

## Variable Reference

Column headers: **Variable** | **Default** (2025.12 / 4.5 if different) | **Range / Values** | **Description**

Scope annotations in the raw dump: `profile N` = per-PID-profile, `rateprofile N` = per-rate-profile, no annotation = master (global).

---

### Gyro & IMU

| Variable | Default | Range / Values | Description |
|----------|---------|----------------|-------------|
| `gyro_hardware_lpf` | NORMAL | NORMAL, OPTION_1, OPTION_2, EXPERIMENTAL | Hardware low-pass filter mode built into the gyro chip. NORMAL is correct for almost all builds. OPTION_1/2/EXPERIMENTAL select alternative hardware bandwidth settings where supported by the sensor. |
| `gyro_calib_duration` | 125 | 50–3000 | Gyro calibration duration in 0.1s steps (125 = 12.5s). Longer = more accurate offset measurement. |
| `gyro_calib_noise_limit` | 48 | 0–200 | Noise threshold during calibration. If movement exceeds this, calibration restarts. Increase if it won't calibrate in a noisy environment. |
| `gyro_offset_yaw` | 0 | −1000 – 1000 | Manual yaw gyro trim (tenths of degrees/s). Use to correct persistent yaw drift if trim sticks or acc trim are not sufficient. |
| `gyro_overflow_detect` | ALL | NONE, YAW, ALL | Detects gyro ADC saturation (sensor hitting its limit) and disarms. Recommended: ALL. |

| `imu_dcm_kp` | 2500 | 0–20000 | Complementary filter proportional gain. Controls how aggressively acc data is blended with gyro integration. Default is suitable for all normal use. |
| `imu_dcm_ki` | 0 | 0–20000 | Complementary filter integral gain. Non-zero allows slow acc-based yaw correction. Rarely changed. |
| `imu_process_denom` | 2 | 1–4 | IMU attitude update rate divisor relative to gyro task rate. 2 = update every second gyro cycle. Higher values reduce CPU load at the cost of attitude accuracy. |
| `small_angle` | 25 | 0–180 | Maximum tilt angle (degrees) to permit arming. Set to 180 to arm at any angle (not recommended). During PID tuning set to 30 for safe angle-mode indoor flights. |
| `pid_process_denom` | 1 | 1–16 | PID loop rate divisor relative to gyro rate. 1 = PID runs every gyro sample. For 8kHz gyro with denom=2 → 4kHz PID rate. Target: BMI270 → 3.2kHz (tune with denom accordingly); ICM-42688P/MPU-6000 → 8kHz. |
| `gyro_cal_on_first_arm` | OFF | OFF, ON | Recalibrates gyro on first arm after power-up. Useful if the FC warms up and gyro drifts before the first arm. |
| `prearm_allow_rearm` | OFF | OFF, ON | Allow re-arm without toggling the prearm switch between flights. |
| `auto_disarm_delay` | 5 | 0–60 | Seconds of throttle-zero before auto-disarm. 0 = disabled. |

---

### Gyro Filters

Gyro LPF1 is the main gyro low-pass. In most modern builds with RPM filtering, **disable LPF1** (`gyro_lpf1_static_hz = 0`) as it adds unnecessary delay. LPF2 is an anti-aliasing filter; raise its cutoff or disable if the gyro and PID rates are equal.

| Variable | Default (2025.12) | Range / Values | Description |
|----------|------------------|----------------|-------------|
| `gyro_lpf1_type` | PT1 | PT1, BIQUAD, PT2, PT3 | Filter type for gyro LPF1. PT1 = first-order, least delay. |
| `gyro_lpf1_static_hz` | 250 | 0–1000 | Static cutoff for LPF1. Set to **0 to disable** (recommended with RPM filtering). |
| `gyro_lpf1_dyn_min_hz` | 250 | 0–1000 | Dynamic LPF1 minimum cutoff (at low throttle). Set equal to `gyro_lpf1_static_hz` to use static mode. |
| `gyro_lpf1_dyn_max_hz` | 500 | 0–1000 | Dynamic LPF1 maximum cutoff (at full throttle). |
| `gyro_lpf1_dyn_expo` | 5 | 0–10 | Expo curve shaping for dynamic LPF1 cutoff vs throttle. Higher = faster rise. |
| `gyro_lpf2_type` | PT1 | PT1, BIQUAD, PT2, PT3 | Filter type for gyro LPF2 (anti-aliasing). |
| `gyro_lpf2_static_hz` | 500 | 0–1000 | LPF2 cutoff. Raise toward 1000 Hz to reduce phase delay. Set to 0 if gyro rate = PID rate (aliasing not possible). |
| `gyro_notch1_hz` | 0 | 0–1000 | Centre frequency of static gyro notch 1. 0 = disabled. Use for specific persistent resonances not handled by dynamic notch. |
| `gyro_notch1_cutoff` | 0 | 0–1000 | Bandwidth of gyro notch 1. Must be less than `gyro_notch1_hz`. |
| `gyro_notch2_hz` | 0 | 0–1000 | Centre frequency of static gyro notch 2. 0 = disabled. |
| `gyro_notch2_cutoff` | 0 | 0–1000 | Bandwidth of gyro notch 2. |


---

### RPM Filter (Bidirectional DSHOT)

Requires bidirectional DSHOT (`dshot_bidir = ON`) and ESC firmware that supports it (BLHeli_32, AM32, BlueJay). Motor noise typically starts around 100 Hz and increases with throttle. Harmonics occur at 2× and 3× the fundamental.

| Variable | Default | Range / Values | Description |
|----------|---------|----------------|-------------|
| `rpm_filter_harmonics` | 3 | 0–3 | Number of RPM harmonics to filter per motor. 3 = fundamental + 2nd + 3rd. 0 disables RPM filtering. |
| `rpm_filter_weights` | 100,100,100 | Array of 3, 0–100 each | Per-harmonic notch depth percentage. Tri-blade props: try `100,0,80` (2nd harmonic absent). Bi-blade: `100,80,0` or `100,50,0`. Lower each as far as possible without motor noise appearing in filtered gyro. |
| `rpm_filter_q` | 500 | 250–3000 | Q factor (notch sharpness). **Target 1000 on well-configured 5" builds** — default 500 is a starting point, not a goal. Higher Q = narrower notch = less phase delay. Back off only if motor noise bleeds through. |
| `rpm_filter_min_hz` | 100 | 30–200 | Below this frequency, notches are not applied. Lower on larger quads with slower-spinning motors (7"+ reduce to 60–80 Hz). |
| `rpm_filter_fade_range_hz` | 50 | 0–1000 | Frequency band over which notches fade in at low throttle, reducing delay at idle. |
| `rpm_filter_lpf_hz` | 150 | 100–500 | Post-notch smoothing LPF applied to the RPM signal used for notch tracking. |

---

### Dynamic Notch Filter

Tracks and eliminates frame resonances — visible as vertical stripes (fixed frequency, amplitude varies with throttle) in the blackbox spectrum.

| Variable | Default | Range / Values | Description |
|----------|---------|----------------|-------------|
| `dyn_notch_count` | 3 | 0–7 | Number of independently tracked dynamic notches. **Set to 0 to disable** if no frame resonances are visible in the spectrum (eliminates delay). With RPM filtering active, 1–2 notches are sufficient for most frame resonances. Without RPM filtering, use 4–5. |
| `dyn_notch_q` | 300 | 1–1000 | Q factor — narrowness of each notch. Increase until the resonance just stays within the notch, then stop. Max useful value ~1000. |
| `dyn_notch_min_hz` | 100 | 20–250 | Minimum frequency any notch will track. Set ~25 Hz below the lowest resonance you need to catch. **Never set below 150 Hz** without reason (ideally ≥200 Hz) — tracking low frequencies causes unwanted filtering of PID-relevant signals. |
| `dyn_notch_max_hz` | 600 | 200–1000 | Maximum frequency any notch will track. Default 600 is fine for most builds. Narrowing the range improves notch resolution. |

---

### D-term Filters

Two-stage D-term filter chain reduces motor noise heating caused by high-frequency D-term content. Use the Karate approach (slider-based) or the AOS approach (manual dyn cutoff) — not both simultaneously.

| Variable | Default (2025.12) | Range / Values | Description |
|----------|------------------|----------------|-------------|
| `dterm_lpf1_type` | PT1 | PT1, BIQUAD, PT2, PT3 | Type for D-term LPF1. BIQUAD gives sharper roll-off; PT1 is less phase. |
| `dterm_lpf1_static_hz` | 75 | 0–1000 (profile) | Static cutoff for D-term LPF1. Used when `dterm_lpf1_dyn_min_hz == dterm_lpf1_dyn_max_hz`. |
| `dterm_lpf1_dyn_min_hz` | 75 | 0–1000 (profile) | Dynamic D-term LPF1 minimum cutoff (at idle throttle). AOS tune: 80 Hz. |
| `dterm_lpf1_dyn_max_hz` | 150 | 0–1000 (profile) | Dynamic D-term LPF1 maximum cutoff (at full throttle). AOS tune: 110 Hz. |
| `dterm_lpf1_dyn_expo` | 5 | 0–10 (profile) | Expo curve for dynamic D-term LPF1 vs throttle. Push as high as possible without mid-throttle oscillations. |
| `dterm_lpf2_type` | PT1 | PT1, BIQUAD, PT2, PT3 | Type for D-term LPF2. |
| `dterm_lpf2_static_hz` | 150 | 0–1000 (profile) | Cutoff for D-term LPF2 (always static). Use as a secondary anti-noise stage. |
| `dterm_notch_hz` | 0 | 0–500 (profile) | Static D-term notch centre frequency. 0 = disabled. Rarely needed when dynamic notch is active. |
| `dterm_notch_cutoff` | 0 | 0–500 (profile) | Static D-term notch bandwidth. |

---

### PID Gains

All gains are per-profile. Scope shown in the raw dump as `profile N`. The simplified tuning sliders scale these values — after applying simplified tuning, the raw values reflect the result.

**Version note on D-term / Dynamic Damping:**
- **Betaflight 4.5**: `d_roll` = D_max (ceiling during sharp moves), `d_min_roll` = D_min (floor at rest).
- **Betaflight 2025.12**: `d_roll` = base D (floor), `d_max_roll` = D_max (ceiling). `d_min_roll` no longer exists.

| Variable | Default (2025.12 / 4.5) | Range | Description |
|----------|------------------------|-------|-------------|
| `p_roll` | 45 / 45 | 0–250 | Roll P gain. Reacts to angle error. Too high → fast oscillations on sharp moves. |
| `i_roll` | 80 / 80 | 0–250 | Roll I gain. Corrects accumulated angle error and maintains attitude. Too low → drift; too high → slow post-flip wobble. |
| `d_roll` | 30 / 40 | 0–250 |**2025.12**: base/floor D (D_min). **4.5**: D_max (ceiling — used during sharp moves). Damps rate of change, counters P overshoot and propwash. |
| `d_max_roll` | 40 | 0–250 | Dynamic damping ceiling — D value used during fast moves. **2025.12 only.** Must be ≥ `d_roll`. |
| `d_min_roll` | 30 | 0–250 | Dynamic damping floor — D value during calm flight. **4.5 only.** Must be < `d_roll`. |
| `f_roll` | 120 / 120 | 0–1000 | Feed forward for roll. Compensates for stick input lag. Scaled by the `simplified_feedforward_gain` slider. |
| `s_roll` | 0 | 0–250 | S-term (stability term) for roll. New in 2025.12 — provides additional stability control. |
| `p_pitch` | 47 / 47 | 0–250 | Pitch P gain. Pitch typically needs slightly higher P than roll due to greater inertia. |
| `i_pitch` | 84 / 84 | 0–250 | Pitch I gain. |
| `d_pitch` | 34 / 46 | 0–250 |**2025.12**: base D. **4.5**: D_max. |
| `d_max_pitch` | 46 | 0–250 | D_max for pitch. **2025.12 only.** |
| `d_min_pitch` | 34 | 0–250 | D_min for pitch. **4.5 only.** |
| `f_pitch` | 125 / 125 | 0–1000 | Feed forward for pitch. |
| `s_pitch` | 0 | 0–250 | S-term for pitch. |
| `p_yaw` | 45 / 45 | 0–250 | Yaw P gain. |
| `i_yaw` | 80 / 80 | 0–250 | Yaw I gain. |
| `d_yaw` | 0 / 0 | 0–250 | Yaw D gain. Usually left at 0 — yaw is torque-based and inherently slower; D adds noise. |
| `d_max_yaw` | 0 | 0–250 | D_max for yaw. |
| `f_yaw` | 120 / 120 | 0–1000 | Feed forward for yaw. |
| `s_yaw` | 0 | 0–250 | S-term for yaw. |
| `pidsum_limit` | 500 | 100–1000 (profile) | Clamps total P+I+D output. Set to 1000 (remove clamp) during initial PID tuning; restore default after. |
| `pidsum_limit_yaw` | 400 | 100–1000 (profile) | Clamps total yaw PID output. Set to 1000 during initial tuning; default 400 limits yaw authority. |
| `yaw_lowpass_hz` | 100 | 0–500 (profile) | Yaw PID output low-pass filter. Set to 0 for maximum yaw responsiveness. Default 100 Hz reduces yaw noise. |
| `yaw_motors_reversed` | OFF | OFF, ON | Reverses the sign of the yaw PID output. Use when motor spin direction is swapped from normal props-out configuration. |
| `vbat_sag_compensation` | 0 | 0–150 (profile) | Compensates for battery voltage sag to maintain consistent PID authority across a pack. **90% is a good target** — avoids stressing the pack at low voltage while still providing consistency. Requires cell voltage monitoring; configure a low-voltage OSD warning when enabled. |
| `pid_at_min_throttle` | ON | OFF, ON | Keeps PIDs active at minimum throttle (idle). Required for airmode to function correctly; normally left ON. |
| `anti_gravity_gain` | 80 | 0–250 (profile) | Boosts I-term on rapid throttle changes to prevent yaw/pitch dip on punch. Reduce if throttle-punch wobbles appear. |
| `anti_gravity_p_gain` | 100 | 0–250 (profile) | Boosts P-term (in addition to I) on rapid throttle changes. Reduce if punches cause P-induced oscillations. |
| `anti_gravity_cutoff_hz` | 5 | 2–50 (profile) | LPF cutoff for throttle derivative used by anti-gravity. Adjust for very large or small builds (larger = faster, smaller = slower response). |
| `iterm_rotation` | OFF | OFF, ON (profile) | Rotates I-term vector with the aircraft during yaw to reduce cross-axis coupling. Primarily useful for 3D flying. |
| `iterm_relax` | RP | OFF, RP, RPY, RP_INC, RPY_INC (profile) | Axes on which I-term relaxation (anti-windup during fast moves) is active. RP = roll and pitch. RPY includes yaw. |
| `iterm_relax_type` | SETPOINT | GYRO, SETPOINT (profile) | Signal used to detect a fast move. SETPOINT uses stick input signal; GYRO uses actual gyro rate. SETPOINT is default and works well for most cases. |
| `iterm_relax_cutoff` | 15 | 1–50 (profile) | Cutoff frequency for the I-term relax HP filter. Higher = reacts faster (better for racing). Lower = smoother (better for large/slow builds). Typical ranges: Racing: 30–40, Freestyle 5": 15, 7"+: 10, X-Class: 3–5. If bounce-back or post-flip oscillation persists, step this down: 15→10→7→5. |
| `iterm_windup` | 80 | 20–100 (profile) | Suppresses I accumulation (in %) when motors are near saturation. Default 80 is sensible. **Note**: default changed to 80 in 2025.12 from 85 in 4.4/4.5. |

---

### Dynamic Damping (D-min / D-max)

Dynamically increases D on sharp moves while keeping it low during calm flight (to reduce motor heat and noise). Requires setting up both a floor D and a ceiling D — see version notes in the PID Gains section above.

| Variable | Default (2025.12 / 4.5) | Range | Description |
|----------|------------------------|-------|-------------|
| `d_max_gain` | 37 | 0–100 (profile) | Controls how aggressively D rises from D_min floor toward D_max ceiling on sharp moves. Default is suitable; reduce if D boost causes propwash on move initiation. |
| `d_max_advance` | 20 / 0 | 0–200 (profile) | Allows D boost to start before the gyro rate peaks, using feedforward signal. **Set to 0 during baseline tuning** — rarely beneficial and can cause premature D oscillation. Only explore once the baseline is stable. |

**Setup (2025.12):** Set `d_roll` = floor D (e.g. 15), `d_max_roll` = ceiling D (e.g. 30). Calm flight uses `d_roll`; sharp moves boost toward `d_max_roll`. Debug with `set debug_mode = D_MAX`.

**Setup (4.5):** Set `d_roll` = D_max (ceiling), `d_min_roll` = D_min (floor, ~50% of D_max). Same behaviour.

---

### Feed Forward

Feed forward adds a stick-input derivative term — it anticipates moves rather than reacting to error. Requires clean stick input; apply the appropriate RC link preset first.

**Note:** Feed forward is bypassed in angle mode in Betaflight 4.5+. Test FF in acro/rate mode only.

| Variable | Default | Range / Values | Description |
|----------|---------|----------------|-------------|
| `feedforward_transition` | 0 | 0–100 (profile) | Blends FF toward zero near stick center. 0 = full FF throughout (racing). 40 = freestyle/HD. 70 = cinematic. **Set to 0 when `feedforward_jitter_factor` is active** — they serve overlapping purposes and must not be combined. |
| `feedforward_averaging` | 2_POINT | OFF, 2_POINT, 3_POINT, 4_POINT (profile) | Averages stick input samples before FF calculation to smooth out RC link quantization. OFF = no averaging (snappiest); 4_POINT = heaviest smoothing. |
| `feedforward_smooth_factor` | 65 | 0–95 (profile) | Additional smoothing applied to the FF signal. Higher = smoother FF output. |
| `feedforward_jitter_factor` | 7 | 0–20 (profile) | Suppresses FF on very slow or jittery stick inputs. Higher = smoother center feel during slow moves (freestyle/HD). Lower = snappier (racing). |
| `feedforward_boost` | 15 | 0–50 (profile) | Adds an acceleration component to FF (second derivative of stick). Increase if gyro lags at the start of a move. Decrease if gyro overshoots at move entry (bounce-back at start). |
| `feedforward_max_rate_limit` | 90 | 0–200 (profile) | Reduces FF as sticks approach maximum deflection. 90 = cut FF when stick is at 90% travel. Raise to 92–95 for crisper move entry on responsive builds. |
| `feedforward_yaw_hold_gain` | 15 | 0–100 (profile) | Sustains a residual FF signal in yaw after the stick is released, counteracting I-term under-yaw. |
| `feedforward_yaw_hold_time` | 100 | 10–250 (profile) | Duration (ms) of the yaw FF hold after stick release. |

---

### Simplified Tuning Sliders

When simplified tuning is active, these intermediate values drive the actual PID/filter gains. Use `simplified_tuning apply` in CLI to compute and write the raw values. `simplified_tuning disable` zeroes the simplified system and leaves the raw values in place for manual editing.

| Variable | Default | Range | Description |
|----------|---------|-------|-------------|
| `simplified_pids_mode` | RPY | OFF, RP, RPY (profile) | Which axes the simplified PID sliders control. RPY = all axes. |
| `simplified_master_multiplier` | 100 | 0–200 (profile) | Master gain slider — scales all P, I, D and D_max together. Equivalent to PIDtoolbox "Master Multiplier". 100 = default gains. |
| `simplified_pi_gain` | 100 | 0–200 (profile) | P and I scaling slider (relative to master). |
| `simplified_d_gain` | 100 | 0–200 (profile) | D scaling slider. |
| `simplified_d_max_gain` | 100 | 0–200 (profile) | D_max scaling slider (dynamic damping ceiling). |
| `simplified_i_gain` | 100 | 0–200 (profile) | I scaling slider (independent of P). |
| `simplified_feedforward_gain` | 100 | 0–200 (profile) | Feedforward scaling slider. |
| `simplified_pitch_pi_gain` | 100 | 0–200 (profile) | Additional P and I multiplier for pitch only (relative compensation for pitch inertia). |
| `simplified_pitch_d_gain` | 100 | 0–200 (profile) | Additional D multiplier for pitch only. |
| `simplified_gyro_filter` | ON | OFF, ON | Whether simplified slider controls gyro filter cutoffs. |
| `simplified_gyro_filter_multiplier` | 100 | 10–200 | Gyro filter cutoff scaling slider. 100 = current static values. Raise to reduce gyro filtering (faster). |
| `simplified_dterm_filter` | ON | OFF, ON (profile) | Whether simplified slider controls D-term filter cutoffs. |
| `simplified_dterm_filter_multiplier` | 100 | 10–200 (profile) | D-term filter cutoff scaling slider. |

---

### TPA (Throttle PID Attenuation)

Attenuates PID gains at high throttle to counteract the increased responsiveness of motors at full power. Use only if oscillations appear at high throttle after filters and PIDs are otherwise tuned.

| Variable | Default (2025.12) | Range / Values | Description |
|----------|------------------|----------------|-------------|
| `tpa_mode` | D | PD, D, PDS (profile) | Which terms TPA attenuates. `D` = D only (default, safest). `PD` = P and D. `PDS` = P, D, and S-term. |
| `tpa_rate` | 65 | 0–100 (profile) | Maximum attenuation percentage at full throttle. 65 = PIDs are at 35% above the breakpoint. |
| `tpa_breakpoint` | 1350 | 1000–2000 (profile) | Throttle level (1000–2000 scale) where TPA begins. Attenuation is proportional from here to full throttle. |
| `tpa_low_rate` | 20 | −128–100 (profile) | D attenuation at minimum throttle (TPA Low). Reduces D-term shaking during throttle chops. |
| `tpa_low_breakpoint` | 1050 | 1000–2000 (profile) | Throttle level below which TPA Low applies. |
| `tpa_low_always` | OFF | OFF, ON (profile) | OFF = TPA Low is only active before Airmode activates; ON = active throughout the flight. |
| `tpa_curve_type` | CLASSIC | CLASSIC, … | TPA curve shape. CLASSIC matches legacy TPA behaviour. |
| `tpa_speed_type` | BASIC | BASIC, ADVANCED | Speed-based TPA. BASIC uses GPS-derived speed for attenuation. ADVANCED uses physics model. |

---

### Rates

Betaflight 2025.12 defaults to the ACTUAL rates system. In ACTUAL: RC_Rate = degrees/sec at stick center, Expo = transition sharpness, Super Rate = max rate. In BETAFLIGHT legacy system: RC_Rate, Expo, and RC_Rate interact differently.

| Variable | Default | Range | Description |
|----------|---------|-------|-------------|
| `rates_type` | ACTUAL | BETAFLIGHT, RACEFLIGHT, KISS, ACTUAL, QUICK (rateprofile) | Rate calculation system. ACTUAL is the most intuitive (center sens and max rate are directly set). |
| `roll_rc_rate` | 7 | 1–255 (rateprofile) | Roll rate at stick center in deg/s×10 (ACTUAL) or RC multiplier (legacy). |
| `pitch_rc_rate` | 7 | 1–255 (rateprofile) | Pitch rate at stick center. |
| `yaw_rc_rate` | 7 | 1–255 (rateprofile) | Yaw rate at stick center. |
| `roll_expo` | 0 | 0–100 (rateprofile) | Roll expo — transition between center sensitivity and max rate. Higher = more expo, slower center, faster edges. |
| `pitch_expo` | 0 | 0–100 (rateprofile) | Pitch expo. |
| `yaw_expo` | 0 | 0–100 (rateprofile) | Yaw expo. |
| `roll_srate` | 67 | 0–255 (rateprofile) | Roll super rate — max rate at full stick deflection (ACTUAL system). |
| `pitch_srate` | 67 | 0–255 (rateprofile) | Pitch super rate. |
| `yaw_srate` | 67 | 0–255 (rateprofile) | Yaw super rate. |
| `quickrates_rc_expo` | OFF | OFF, ON (rateprofile) | In QUICK rates mode, applies expo globally. |
| `thr_mid` | 50 | 0–100 (rateprofile) | Throttle curve mid-point — sets the thrust at 50% stick. |
| `thr_expo` | 0 | 0–100 (rateprofile) | Throttle expo. |
| `thr_hover` | 50 | 10–90 (rateprofile) | Estimated hover throttle percentage. Used by alt-hold and some internal calculations. |
| `throttle_limit_type` | OFF | OFF, SCALE, CLIP (rateprofile) | Limits maximum throttle output. SCALE = proportionally scales all outputs; CLIP = hard ceiling. |
| `throttle_limit_percent` | 100 | 25–100 (rateprofile) | Maximum throttle percentage when `throttle_limit_type` is active. |
| `roll_rate_limit` | 1998 | 200–1998 (rateprofile) | Hard cap on roll rate in deg/s, applied after the rates curve. |
| `pitch_rate_limit` | 1998 | 200–1998 (rateprofile) | Hard cap on pitch rate. |
| `yaw_rate_limit` | 1998 | 200–1998 (rateprofile) | Hard cap on yaw rate. |
| `deadband` | 0 | 0–32 | RC deadband around stick center (microseconds). Increase if sticks don't return to exact center. |
| `yaw_deadband` | 0 | 0–100 | Yaw-specific deadband around center. |
| `yaw_control_reversed` | OFF | OFF, ON | Reverses the direction of yaw stick. |
| `fpv_mix_degrees` | 0 | 0–50 | FPV camera tilt angle for tilt-compensated yaw mixing. |

---

### Angle & Horizon Mode

| Variable | Default | Range | Description |
|----------|---------|-------|-------------|
| `angle_p_gain` | 50 | 0–200 (profile) | P gain for angle mode self-leveling. Higher = stronger return to level. |
| `angle_feedforward` | 50 | 0–200 (profile) | Feedforward in angle mode — reduces lag when moving the angle setpoint. |
| `angle_feedforward_smoothing_ms` | 80 | 10–250 (profile) | Smoothing applied to angle feedforward signal. |
| `angle_limit` | 60 | 10–80 (profile) | Maximum tilt angle in angle mode (degrees). |
| `angle_earth_ref` | 100 | 0–100 (profile) | Proportion of earth-frame reference used in angle mode (0 = body frame, 100 = full earth frame). 100 is recommended for GPS rescue compatibility. |
| `angle_pitch_offset` | 0 | −450–450 (profile) | Pitch trim offset in tenths of degrees for angle mode. Use to adjust the level hover point without reflying. |
| `horizon_level_strength` | 50 | 0–100 | Level mode strength at stick center in horizon mode. |
| `horizon_limit_sticks` | 75 | 10–200 | Stick deflection (%) at which horizon mode gives full acro authority. |
| `horizon_limit_degrees` | 135 | 10–250 | Maximum attitude angle before horizon mode enforces leveling. |
| `acc_trim_pitch` | 0 | −300–300 | Accelerometer pitch trim for level calibration. |
| `acc_trim_roll` | 0 | −300–300 | Accelerometer roll trim for level calibration. |
| `acc_lpf_hz` | 25 | 0–500 | Accelerometer low-pass filter cutoff. Smooths acc readings used for attitude estimation. |

---

### Motor & ESC

| Variable | Default | Range / Values | Description |
|----------|---------|----------------|-------------|
| `motor_pwm_protocol` | DSHOT600 | PWM, ONESHOT125, ONESHOT42, MULTISHOT, BRUSHED, DSHOT150, DSHOT300, DSHOT600, PROSHOT1000, DISABLED | ESC communication protocol. DSHOT600 for ICM-42688P/MPU-6000 at 8kHz; **DSHOT300 for BMI270 at 3.2kHz** (DSHOT600 at 3.2kHz is marginal). |
| `dshot_bidir` | OFF | OFF, ON | Enables bidirectional DSHOT for RPM telemetry. Required for RPM filtering. ESC firmware must support it. |
| `dshot_burst` | AUTO | OFF, ON, AUTO | DSHOT burst transmission mode. AUTO selects based on hardware capability. |
| `dshot_edt` | OFF | OFF, ON | Extended DSHOT Telemetry — provides additional ESC data beyond RPM. |
| `dshot_bitbang` | AUTO | OFF, ON, AUTO | DSHOT bitbang implementation (software DSHOT). AUTO selects automatically. |
| `dshot_bitbang_timer` | AUTO | AUTO, TIM1, TIM8 | Timer used for bitbang DSHOT. |
| `motor_poles` | 14 | 4–255 | Number of magnetic poles on the motor bell (magnet count, **not** stator count). **Critical for RPM filter accuracy.** Most 5" motors have 14 magnets; verify on your specific motors. Wrong value → filters tracking wrong frequencies. |
| `motor_kv` | 1960 | 1–40000 | Motor KV rating. Used in some internal calculations. Set to your actual motor KV for accurate RPM limit and dynamic idle features. |
| `motor_idle` | 550 | 0–2000 | Idle throttle value sent to ESCs when armed (units depend on protocol). Used as the minimum non-zero motor command. |
| `min_command` | 1000 | 750–2250 | PWM value sent to ESCs when disarmed or at zero throttle (for PWM-based protocols). For DSHOT, this is overridden by the protocol. |
| `max_throttle` | 2000 | 750–2250 | Maximum PWM value sent to ESCs (for PWM-based protocols). |
| `motor_output_limit` | 100 | 1–100 (profile) | Caps per-motor output as a percentage. Use when running higher cell count than motors are rated for (e.g. 6S on a 4S build → set to ~66%). |
| `motor_output_reordering` | 0,1,2,3 (default order) | array | Reorders motor output channels without rewiring. Specify the output index for each motor position. |
| `motor_pwm_rate` | — | 50–32000 | PWM frequency for brushed motor mode. Not relevant for DSHOT protocols. |
| `motor_pwm_inversion` | OFF | OFF, ON | Invert PWM output polarity. For ESCs that require inverted signal. |
| `use_unsynced_pwm` | OFF | OFF, ON | Send motor PWM unsynchronised to the PID loop. Primarily for brushed motors. |
| `thrust_linear` | 0 | 0–150 (profile) | Linearises the thrust curve at low throttle. Improves low-throttle authority and responsiveness, especially for whoops and 48kHz ESCs. **20–40% is typically enough**; no effect above mid-throttle. |
| `throttle_boost` | 5 | 0–100 | Transiently boosts throttle output on fast throttle stick changes for immediate throttle feel. |
| `throttle_boost_cutoff` | 15 | 5–50 | LPF cutoff for throttle derivative used by `throttle_boost`. |
| `yaw_motors_reversed` | OFF | OFF, ON | Reverse yaw PID output sign. Use when motor spin direction is swapped from normal. |
| `rpm_limit` | OFF | OFF, ON | Enables per-motor RPM limit. |
| `rpm_limit_value` | 18000 | — | Maximum motor RPM when `rpm_limit` is ON. |
| `rpm_limit_p` | 25 | — | P gain for RPM limiter controller. |
| `rpm_limit_i` | 10 | — | I gain for RPM limiter controller. |
| `rpm_limit_d` | 8 | — | D gain for RPM limiter controller. |

---

### Dynamic Idle

Prevents motor stall during flips/rolls and throttle chops. Any non-zero `dyn_idle_min_rpm` enables it. **Always set `transient_throttle_limit = 0` when enabling dynamic idle.**

| Variable | Default | Range | Description |
|----------|---------|-------|-------------|
| `dyn_idle_min_rpm` | 0 | 0–200 (profile) | Minimum motor RPM maintained by dynamic idle. **Set non-zero to enable.** Target by prop size. |
| `dyn_idle_p_gain` | 50 | 1–250 (profile) | P gain of the dynamic idle RPM controller. Reduce if idle causes oscillation. |
| `dyn_idle_i_gain` | 50 | 1–250 (profile) | I gain of the dynamic idle RPM controller. |
| `dyn_idle_d_gain` | 50 | 0–250 (profile) | D gain of the dynamic idle RPM controller. |
| `dyn_idle_max_increase` | 150 | 10–255 (profile) | Maximum throttle increase (in motor units) the dynamic idle controller can command above the static idle value. |
| `transient_throttle_limit` | 0 | 0–30 (profile) | Limits rapid throttle-up transients. **Must be set to 0 when dynamic idle is enabled.** Non-zero values were used before dynamic idle existed. |

---

### RC Input & Smoothing

| Variable | Default | Range / Values | Description |
|----------|---------|----------------|-------------|
| `serialrx_provider` | CRSF | SPEK1024, SPEK2048, SBUS, SUMD, IBUS, JETIEXBUS, CRSF, SRXL, SRXL2, … | Serial RX protocol. Must match the receiver's output format. |
| `serialrx_inverted` | OFF | OFF, ON | Invert the serial RX signal. Required for some receivers on certain FC designs. |
| `serialrx_halfduplex` | OFF | OFF, ON | Use single-wire half-duplex UART for serial RX (some CRSF implementations). |
| `sbus_baud_fast` | OFF | OFF, ON | Enable fast (200kbps) SBUS mode. For SBUS receivers that support it. |
| `srxl2_baud_fast` | ON | OFF, ON | Fast baud mode for SRXL2 (Spektrum). |
| `crsf_use_negotiated_baud` | OFF | OFF, ON | Allow CRSF to negotiate baud rate. Enable when using faster CRSF rates (e.g. ELRS negotiated speed). |
| `rx_min_usec` | 885 | 750–2250 | Shortest channel pulse width considered valid. Values below this trigger signal-loss detection (PPM/PWM). |
| `rx_max_usec` | 2115 | 750–2250 | Longest channel pulse width considered valid. |
| `mid_rc` | 1500 | 1200–1700 | RC mid-point. Match to your transmitter's stick center value. Futaba radios often need 1520. |
| `min_check` | 1100 | 0–2000 | RC channel value below which arm/disarm and stick commands are recognized. |
| `max_check` | 1900 | 0–2000 | RC channel value above which arm/disarm and stick commands are recognized. |
| `rc_smoothing` | ON | OFF, ON | Enables RC input interpolation and smoothing between received frames. |
| `rc_smoothing_auto_factor` | 30 | 0–250 | Auto-smoothing aggressiveness for setpoint channels. Higher = smoother but more lag. Preset applies the correct value for your RC link. |
| `rc_smoothing_auto_factor_throttle` | 30 | 0–250 | Auto-smoothing aggressiveness for throttle channel. |
| `rc_smoothing_setpoint_cutoff` | 0 | 0–250 | Manual setpoint smoothing cutoff. 0 = use auto. |
| `rc_smoothing_throttle_cutoff` | 0 | 0–250 | Manual throttle smoothing cutoff. 0 = use auto. |
| `airmode_start_throttle_percent` | 25 | 0–100 | Throttle percentage above which airmode activates. At higher values, motors begin to idle before airmode engages. |
| `rssi_channel` | 0 | 0–18 | AUX channel carrying RSSI signal. 0 = not using channel RSSI. |
| `rssi_scale` | 100 | 1–255 | Scales the RSSI input. |
| `rssi_offset` | 0 | −100–100 | Offsets the RSSI reading. |
| `rssi_invert` | OFF | OFF, ON | Invert the RSSI signal (some receivers send inverted RSSI). |
| `max_aux_channels` | 14 | 0–14 | Maximum number of AUX channels processed. |

---

### Battery & Current Sensing

| Variable | Default | Range / Values | Description |
|----------|---------|----------------|-------------|
| `battery_meter` | ADC | NONE, ADC, ESC | Source for battery voltage reading. ADC = onboard voltage divider. ESC = from ESC telemetry. |
| `vbat_scale` | 110 | 0–255 | Voltage divider calibration. Adjust until reported voltage matches a multimeter. |
| `vbat_divider` | 10 | 1–255 | Voltage divider ratio numerator. |
| `vbat_multiplier` | 1 | 1–255 | Voltage divider ratio multiplier. |
| `vbat_max_cell_voltage` | 430 | 100–500 | Maximum per-cell voltage for auto cell-count detection (×0.01V). Default 430 = 4.30V. |
| `vbat_full_cell_voltage` | 410 | 100–500 |"Full" cell voltage for capacity display. Default 410 = 4.10V. |
| `vbat_min_cell_voltage` | 330 | 100–500 | Minimum cell voltage — triggers battery-critical alarm (×0.01V). Default 330 = 3.30V. |
| `vbat_warning_cell_voltage` | 350 | 100–500 | Warning threshold voltage per cell (×0.01V). Default 350 = 3.50V. |
| `vbat_hysteresis` | 1 | 0–250 | Hysteresis on voltage warnings to prevent flicker (×0.01V). |
| `vbat_detect_cell_voltage` | 300 | 100–900 | Voltage above which a battery is considered connected (×0.01V per cell). |
| `bat_capacity` | 0 | 0–20000 | Battery capacity in mAh. Used with current meter to estimate remaining charge. |
| `force_battery_cell_count` | 0 | 0–24 | Override auto cell-count detection. 0 = auto-detect from `vbat_max_cell_voltage`. |
| `use_vbat_alerts` | ON | OFF, ON | Enable voltage-based OSD/beeper warnings. |
| `use_cbat_alerts` | OFF | OFF, ON | Enable capacity-based OSD/beeper warnings. |
| `cbat_alert_percent` | 10 | 0–100 | Remaining capacity percentage to trigger a battery alert. |
| `vbat_cutoff_percent` | 100 | 0–150 | Percentage of `vbat_sag_compensation` to apply at critically low voltage. |
| `battery_continue` | OFF | OFF, ON | Continue logging/flying after battery disconnect/reconnect (for hot-swap builds). |
| `current_meter` | ADC | NONE, ADC, VIRTUAL, ESC, MSP | Current sensor source. ADC = onboard shunt. ESC = ESC telemetry current. |
| `ibata_scale` | 558 | −16000–16000 | ADC current sensor scale factor (mV/A × 10). Calibrate against a known load. |
| `ibata_offset` | 0 | −32000–32000 | ADC current sensor offset in millivolts. |
| `ibatv_scale` | 0 | −16000–16000 | Virtual current sensor scale. |
| `ibatv_offset` | 0 | −32000–32000 | Virtual current sensor offset. |
| `report_cell_voltage` | OFF | OFF, ON | Report per-cell voltage (total / cell count) instead of pack voltage in telemetry. |

---

### Blackbox

| Variable | Default | Range / Values | Description |
|----------|---------|----------------|-------------|
| `blackbox_device` | SPIFLASH | NONE, SPIFLASH, SDCARD, SERIAL | Logging destination. SPIFLASH = onboard flash. SDCARD = SD card. SERIAL = via serial port (high baud rate required). |
| `blackbox_sample_rate` | 1/4 | 1/1, 1/2, 1/4, 1/8, 1/16 | Fraction of gyro samples logged. **Target: half the gyro update frequency, minimum 1kHz.** At 8kHz gyro: use 1/8 → 1kHz. At 3.2kHz gyro: use 1/2 → 1.6kHz. Finer = larger logs. |
| `blackbox_mode` | NORMAL | NORMAL, MOTOR_TEST, ALWAYS | NORMAL = log only when armed. ALWAYS = log even when disarmed. MOTOR_TEST = motor test mode. |
| `blackbox_high_resolution` | OFF | OFF, ON | Double the data precision for gyro and setpoint fields. Increases log size. |
| `blackbox_disable_pids` | OFF | OFF, ON | Exclude PID data from logs. Reduces log size. |
| `blackbox_disable_rc` | OFF | OFF, ON | Exclude RC channel data from logs. |
| `blackbox_disable_setpoint` | OFF | OFF, ON | Exclude setpoint data. |
| `blackbox_disable_bat` | OFF | OFF, ON | Exclude battery data. |
| `blackbox_disable_mag` | OFF | OFF, ON | Exclude magnetometer data. Magnetometer logging removed in 2025.12. |
| `blackbox_disable_alt` | OFF | OFF, ON | Exclude altitude data. |
| `blackbox_disable_rssi` | OFF | OFF, ON | Exclude RSSI data. |
| `blackbox_disable_gyro` | OFF | OFF, ON | Exclude filtered gyro data. |
| `blackbox_disable_gyrounfilt` | OFF | OFF, ON | Exclude unfiltered gyro data. |
| `blackbox_disable_acc` | OFF | OFF, ON | Exclude accelerometer data. |
| `blackbox_disable_debug` | OFF | OFF, ON | Exclude debug fields. |
| `blackbox_disable_motors` | OFF | OFF, ON | Exclude motor output data. |
| `blackbox_disable_rpm` | OFF | OFF, ON | Exclude RPM telemetry data. |
| `blackbox_disable_gps` | OFF | OFF, ON | Exclude GPS data. |

---

### Failsafe

Always use FC-based failsafe (configure receiver to send **no data** on signal loss — not fixed values). Receiver-based failsafe is not recommended; the FC cannot detect it.

| Variable | Default (2025.12 / 4.5) | Range / Values | Description |
|----------|------------------------|----------------|-------------|
| `failsafe_procedure` | DROP | AUTO-LAND, DROP, GPS-RESCUE | Stage 2 procedure. **DROP** = immediate motor cut and disarm (default, safest for racing). **AUTO-LAND** = fixed throttle + centered sticks for `failsafe_landing_time`/`failsafe_off_delay` then disarm. **GPS-RESCUE** = autonomous return-to-home. |
| `failsafe_delay` | 15 (1.5 s) | 1–200 (deciseconds) | Stage 1 guard duration — time from confirmed signal loss to Stage 2 activation. Default 15 = 1.5 s. Minimum safe value is 2 (200 ms). |
| `failsafe_landing_time` | 60 (6 s) | 0–250 (deciseconds) | Duration of Landing Mode (AUTO-LAND) Stage 2. Replaces `failsafe_off_delay` from 4.5. |
| `failsafe_off_delay` | 10 (1 s) | 0–200 (deciseconds) | Duration of Landing Mode Stage 2. Renamed to `failsafe_landing_time` in 2025.12. |
| `failsafe_throttle` | 1000 | 750–2250 | Throttle value applied during Landing Mode Stage 2 AND used as the Stage 1 fallback throttle if configured. **Default 1000 = motors off.** For GPS Rescue: must be set to a hover throttle value, or the quad drops in Stage 1 before Rescue can activate. |
| `failsafe_switch_mode` | STAGE1 | STAGE1, KILL, STAGE2 | Aux switch behavior: STAGE1 = simulates signal loss (useful for testing and as a panic switch), STAGE2 = skips Stage 1 (instant GPS rescue / drop), KILL = instant disarm (dangerous, any glitch crashes the quad). |
| `failsafe_recovery_delay` | 5 (0.5 s) / — | 1–200 (deciseconds) | Duration the signal must be stable after Stage 2 before the pilot can re-arm or (for GPS Rescue) before stick inputs are assessed. |
| `failsafe_stick_threshold` | 30 | 0–50 | Stick deflection (degrees from center) required to exit GPS Rescue Stage 2 after signal recovery. Move sticks to this threshold once video returns and RXLOSS clears. |
| `failsafe_throttle_low_delay` | 100 (10 s) | 0–300 (deciseconds) | If throttle has been low for this duration before Stage 2 triggers, the FC immediately disarms instead of activating Landing Mode (the "Just Drop" override). Protects pilots who power off their transmitter after landing without disarming. |

---

### GPS Rescue (Betaflight 4.5)

**Note:** `gps_rescue_*` variables exist in Betaflight 4.5. In 2025.12, GPS Rescue has been redesigned; the variables below apply to 4.5 only.

Prerequisites: GPS module (UBlox M8N minimum, M10 recommended), calibrated accelerometer, verified angle mode leveling, minimum satellites before arming, home point established before flight.

| Variable | Default (4.5) | Range / Values | Description |
|----------|--------------|----------------|-------------|
| `gps_rescue_initial_climb` | 10 | 0–100 m | Altitude to climb from current position before heading home. Set high enough to clear local obstacles. |
| `gps_rescue_return_alt` | 30 | 0–150 m | Target return cruise altitude. If the quad is already above this, it maintains current altitude. |
| `gps_rescue_alt_mode` | MAX_ALT | MAX_ALT, FIXED_ALT, CURRENT_ALT | MAX_ALT = use the higher of `gps_rescue_initial_climb` or max altitude recorded + 15 m. FIXED_ALT = always return to `gps_rescue_initial_climb`. CURRENT_ALT = hold current altitude (not recommended). |
| `gps_rescue_ascend_rate` | 750 | 100–2500 cm/s | Climb rate during initial climb phase. |
| `gps_rescue_descend_rate` | 150 | 100–500 cm/s | Descent rate when approaching home. |
| `gps_rescue_ground_speed` | 750 | 10–3000 cm/s | Forward speed during return (cm/s). 750 ≈ 27 km/h. Reduce for reliability in windy conditions. |
| `gps_rescue_max_angle` | 45 | 0–60 deg | Maximum tilt angle allowed during return. Higher allows faster flight but makes altitude control harder. Raise for headwinds. |
| `gps_rescue_descent_dist` | 20 | 5–200 m | Distance from home at which descent begins. |
| `gps_rescue_min_start_dist` | 15 | 10–3000 m | Minimum distance from home to activate rescue. Closer than this → disarm and drop (prevents accidental rescue activation nearby). |
| `gps_rescue_min_sats` | 8 | 5–50 | Minimum satellite count required to arm with GPS rescue configured. OSD shows `RESCUE N/A` if below this. |
| `gps_rescue_sanity_checks` | RESCUE_SANITY_FS_ONLY | RESCUE_SANITY_ON, RESCUE_SANITY_FS_ONLY, OFF | **Strongly recommended: RESCUE_SANITY_ON.** Aborts rescue (disarms) if: GPS lost, fix invalid, quad crashed, sat count drops, or quad not approaching home. |
| `gps_rescue_allow_arming_without_fix` | OFF | OFF, ON | Allow arming without a GPS fix. GPS rescue is unavailable during such a flight — OSD shows `RESCUE OFF`. |
| `gps_rescue_use_mag` | ON | OFF, ON | Use magnetometer for heading during rescue. **Only enable if the mag reading has been verified accurate** (compare with phone compass; both must agree within 10°). An incorrect mag causes flyaways. |
| `gps_rescue_velocity_p` | 8 | 0–250 | Velocity controller P gain (forward speed regulation). |
| `gps_rescue_velocity_i` | 40 | 0–250 | Velocity controller I gain. |
| `gps_rescue_velocity_d` | 12 | 0–250 | Velocity controller D gain. |
| `gps_rescue_yaw_p` | 20 | 0–250 | Yaw P gain during rescue (heading correction). |
| `gps_rescue_throttle_hover` | 1275 | 1000–2000 | Estimated hover throttle value. **Set this accurately** using the Landing Mode test method — it directly affects rescue altitude stability. |
| `gps_rescue_throttle_min` | 1100 | 1000–2000 | Minimum throttle the rescue altitude controller can command. |
| `gps_rescue_throttle_max` | 1700 | 1000–2000 | Maximum throttle the rescue altitude controller can command. |
| `gps_rescue_throttle_p` | 15 | 0–250 | Altitude controller P gain. Adjust if altitude oscillates during rescue. |
| `gps_rescue_throttle_i` | 15 | 0–250 | Altitude controller I gain. |
| `gps_rescue_throttle_d` | 20 | 0–250 | Altitude controller D gain. |
| `gps_rescue_imu_yaw_gain` | 10 | 0–250 | Aggressiveness of IMU heading correction during rescue. Reduce if heading oscillates. |
| `gps_rescue_roll_mix` | 150 | 0–250 | Mix of roll vs yaw for lateral correction during approach. |
| `gps_rescue_pitch_cutoff` | 75 | 10–250 | Smoothing cutoff for pitch D term during rescue. |
| `gps_rescue_disarm_threshold` | 20 | 0–100 | Impact detection threshold for auto-disarm on landing. Lower = more sensitive. |
| `gps_rescue_landing_alt` | 4 | 0–15 m | Altitude below which impact detection is enabled for auto-disarm. |

---

### GPS Settings

| Variable | Default | Range / Values | Description |
|----------|---------|----------------|-------------|
| `gps_provider` | UBLOX | NMEA, UBLOX, MSP, VIRTUAL | GPS protocol. Prefer UBLOX for UBlox modules — significantly more reliable than NMEA. |
| `gps_auto_config` | ON | OFF, ON | Automatically configure UBlox modules on connection (baud rate, update rate, message types). Leave ON unless you pre-configure the module with uCenter. |
| `gps_auto_baud` | OFF | OFF, ON | Automatically detect GPS baud rate. |
| `gps_update_rate_hz` | 10 | 1–20 | Target GPS update rate. 10 Hz recommended for GPS rescue. Reduce to 1–2 Hz if not using GPS rescue (reduces CPU load, may allow 8k8k on some boards). |
| `gps_sbas_mode` | NONE | AUTO, EGNOS, WAAS, MSAS, GAGAN, NONE | SBAS (satellite correction) system for the region. |
| `gps_ublox_use_galileo` | OFF | OFF, ON | Enable Galileo constellation on UBlox modules. |
| `gps_ublox_acquire_model` | — | — | UBlox dynamic model used while acquiring fix. |
| `gps_ublox_flight_model` | — | — | UBlox dynamic model used during flight. |
| `gps_set_home_point_once` | OFF | OFF, ON | Only set the home point on the first arm after battery connect. Prevents home being reset if you disarm and re-arm mid-field. |
| `gps_use_3d_speed` | OFF | OFF, ON | Use 3D speed (including vertical) for GPS speed display. |

---

### System & Debug

| Variable | Default | Range / Values | Description |
|----------|---------|----------------|-------------|
| `debug_mode` | NONE | NONE, GYRO_SCALED, FFT_FRQ, GYRO_FILTERED, D_MAX, DYN_IDLE, ITERM_RELAX, FEEDFORWARD, RC_SMOOTHING, DSHOT_RPM_TELEMETRY, RPM_FILTER, GPS_RESCUE_VELOCITY, GPS_RESCUE_HEADING, FAILSAFE, … (many more) | Select which internal signals are exposed in blackbox debug fields. Key modes: **FFT_FRQ** (BF 4.5+, filter frequency analysis), **GYRO_SCALED** (raw gyro, filter tuning), **D_MAX** (dynamic damping), **DYN_IDLE** (dynamic idle), **ITERM_RELAX** (I-term relax), **FEEDFORWARD** (FF signals), **FAILSAFE** (failsafe state). |
| `task_statistics` | ON | OFF, ON | Enables CPU task profiling visible via `tasks` CLI command. Turn OFF to reduce overhead on heavily loaded systems. |
| `cpu_overclock` | OFF | OFF, 192MHZ, 216MHZ, 240MHZ | Overclock the STM32 F7 processor. Use only if CPU load is too high and the board supports it. |
| `pwr_on_arm_grace` | 5 | 0–30 s | Grace period after power-on during which arming is blocked (prevents arming before receiver binds). |
| `serial_update_rate_hz` | 100 | 100–2000 | Rate at which MSP/CLI serial output is processed. |
| `reboot_character` | 82 | 48–126 | ASCII character that triggers a reboot when sent to the FC (default: 'R'). |
| `scheduler_relax_rx` | 25 | 0–250 μs | Scheduler relaxation time for RX task. Controls how much other tasks can run during RX processing. |
| `scheduler_relax_osd` | 25 | 0–250 μs | Scheduler relaxation time for OSD task. |
| `align_board_roll` | 0 | −180–360 | Board rotation offset in roll (degrees). For non-standard FC mounting orientations. |
| `align_board_pitch` | 0 | −180–360 | Board rotation offset in pitch. |
| `align_board_yaw` | 45 | −180–360 | Board rotation offset in yaw. |
| `mag_declination` | 0 | −18000–18000 (hundredths of degrees) | Magnetic declination correction for your location. Find at ngdc.noaa.gov/geomag/calculators. Removed in 2025.12. |
| `rate_6pos_switch` | OFF | OFF, ON | Enable 6-position rate profile selection via an AUX channel. |
| `enable_stick_arming` | OFF | OFF, ON | Enable stick-combination arming (throttle-down/yaw-right). Disable if using a dedicated arm switch. |
| `runaway_takeoff_prevention` | ON | OFF, ON | Detects uncommanded throttle-up on arm and disarms to prevent injury. Removed in 2025.12. |
| `runaway_takeoff_deactivate_delay` | 500 | 100–1000 ms | Time after arming before runaway takeoff protection stops monitoring. Removed in 2025.12. |
| `runaway_takeoff_deactivate_throttle_percent` | 20 | 0–100 | Throttle percentage above which the pilot's intent is clear and runaway protection deactivates. Removed in 2025.12. |

---

### Board & Hardware

| Variable | Default | Range / Values | Description |
|----------|---------|----------------|-------------|
| `acc_hardware` | AUTO | AUTO, NONE, MPU6050, MPU6000, MPU6500, … (see `get acc_hardware` for full list) | Force accelerometer driver or AUTO-detect. |
| `baro_hardware` | AUTO | AUTO, NONE, BMP085, MS5611, BMP280, BMP388, DPS310, … | Force barometer driver or AUTO-detect. Not present in 4.5 dump. |
| `baro_bustype` | SPI | NONE, I2C, SPI, SLAVE | Barometer bus type. Not present in 4.5 dump. |
| `mag_hardware` | NONE | NONE, AUTO, HMC5883, QMC5883, … | Magnetometer hardware selection. NONE = disabled. Removed in 2025.12. |
| `align_mag` | DEFAULT | DEFAULT, CW0, CW90, CW180, CW270, CW0FLIP, … | Magnetometer orientation. Removed in 2025.12. |
| `adc_device` | 2 | 0–3 | ADC device used for voltage/current sensing. |
| `altitude_source` | DEFAULT | DEFAULT, BARO_ONLY, GPS_ONLY | Override altitude data source for autopilot and OSD altitude display. |
| `altitude_prefer_baro` | 100 | 0–100 | Weight given to barometer vs GPS altitude when both are available (0 = GPS only, 100 = baro only). |

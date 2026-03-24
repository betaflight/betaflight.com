---
slug: /development/Cli
---

# Command Line Interface (CLI)

Betaflight has a command line interface (CLI) that can be used to change settings and configure the FC.

This document is a **complete reference for all CLI commands and variables** in Betaflight **2025.12**. It covers every configurable parameter: gyro/filter tuning, PID configuration, rates, failsafe, GPS, battery monitoring, OSD, LED strip, VTX, telemetry, hardware configuration, and more. All defaults and ranges below are accurate for **Betaflight 2025.12** only; they may differ in older versions.

## Important version differences

- Dynamic damping naming and calculation have changed: in **4.5** `d_roll` is D_max and `d_min_roll` is base D; in **2025.12** `d_roll` is the base D and `d_max_roll` is the peak — `d_min_roll` no longer exists.
- GPS rescue: `gps_rescue_*` variables exist in **4.5** only; redesigned in 2025.12.
- Failsafe landing duration: `failsafe_off_delay` (4.5) → `failsafe_landing_time` (2025.12).

---

## CLI Access & Usage

### Accessing the CLI

Send `#` over the serial port (or use the CLI tab in Betaflight Configurator). Enter `save` to write settings and reboot. Enter `exit` or `exit noreboot` to leave without saving.

### Key CLI Commands

Betaflight CLI displays useful commands when the `help` command is entered. Below is a curated list of the most important commands for tuning and configuration. For the full list, refer to the `help` output of your specific Betaflight version.

| Command                                                                                                | Description                                                                |
| ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| `batch start\|end`                                                                                     | Start or end a batch of commands                                           |
| `get [name]`                                                                                           | Show current value of one or all variables (partial name works: `get acc`) |
| `set name=value`                                                                                       | Set a variable. Must `save` afterward.                                     |
| `save`                                                                                                 | Write settings to flash and reboot FC                                      |
| `save noreboot`                                                                                        | Write settings without rebooting (2025.12+)                                |
| `exit`                                                                                                 | Exit CLI without saving and reboot                                         |
| `exit noreboot`                                                                                        | Exit CLI without saving and without rebooting                              |
| `diff [master\|profile\|rates\|hardware\|all] {defaults\|bare}`                                        | List configuration changes from default                                    |
| `diff all`                                                                                             | Show all non-default settings across all profiles                          |
| `dump [master\|profile\|rates\|hardware\|all] {defaults\|bare}`                                        | Full configuration dump (all values, including defaults)                   |
| `dump all`                                                                                             | Full dump across all profiles                                              |
| `defaults`                                                                                             | Reset to defaults and reboot                                               |
| `defaults nosave`                                                                                      | Reset to defaults without rebooting                                        |
| `status`                                                                                               | Show FC status: gyro type, loop time, CPU load, arming flags               |
| `version`                                                                                              | Show firmware version string                                               |
| `tasks`                                                                                                | Show task scheduler stats (CPU usage per task)                             |
| [`profile [0-5]`](/docs/development/Profiles)                                                          | Change active PID profile                                                  |
| [`rateprofile [0-5]`](/docs/development/Profiles)                                                      | Change active rate profile                                                 |
| `feature list`                                                                                         | List all available features                                                |
| `feature <feature_name>`                                                                               | Enable a feature                                                           |
| `feature -<feature_name>`                                                                              | Disable a feature                                                          |
| [`aux <index> <mode> <channel> <start> <end> <logic>`](/docs/development/Modes)                        | Configure AUX mode switch                                                  |
| [`mixer list\|<name>`](/docs/development/Mixer)                                                        | Mixer name or list                                                         |
| [`mmix`](/docs/development/Mixer)                                                                      | Design custom motor mixer                                                  |
| [`smix`](/docs/development/Mixer)                                                                      | Design custom servo mixer                                                  |
| [`servo`](/docs/development/Mixer)                                                                     | Configure servos                                                           |
| [`led`](/docs/wiki/guides/current/LED-Strip-Functionality)                                             | Configure leds                                                             |
| [`color`](/docs/wiki/guides/current/LED-Strip-Functionality)                                           | Configure colors                                                           |
| [`mode_color`](/docs/wiki/guides/current/LED-Strip-Functionality)                                      | Configure mode and special colors                                          |
| [`play_sound [<index>]`](/docs/development/Buzzer)                                                     | Play a sound for given index, or none for next                             |
| [`map`](/docs/development/Rx)                                                                          | Show/set RC channel order mapping                                          |
| [`rxrange`](/docs/development/Rx)                                                                      | configure rx channel ranges (end-points)                                   |
| [`rxfail`](/docs/development/Rx)                                                                       | Show/set per-channel failsafe fallback values                              |
| `resource <> \| <resource name> <index> [<pin>\|none] \| show [all]`                                   | Show/set pin assignments                                                   |
| `dma`                                                                                                  | Show/set DMA channel assignments                                           |
| [`serial`](/docs/development/Serial)                                                                   | Configure serial ports and baud rates                                      |
| `serialpassthrough <id1> [<baud1>] [<mode1>] [none\|<dtr pinio>\|reset] [<id2>] [<baud2>] [<mode2>]`   | Passthrough serial data data from port 1 to VCP / port 2                   |
| [`adjrange`](/docs/development/Inflight-Adjustments)                                                   | Configure in-flight adjustment ranges                                      |
| `motor <index> [value]`                                                                                | Read or drive a motor (use with caution — props off)                       |
| `dshot_telemetry_info`                                                                                 | Show DSHOT telemetry info and statistics                                   |
| `dshotprog <index> <cmd>+`                                                                             | Send DSHOT ESC programming commands                                        |
| `escprog <mode [sk/bl/ki/cc]> <index>`                                                                 | Passthrough ESC to serial                                                  |
| [`gpspassthrough`](/docs/development/Gps)                                                              | Passthrough GPS to serial                                                  |
| `gyroregisters`                                                                                        | Dump raw gyro hardware register contents                                   |
| `simplified_tuning apply\|disable`                                                                     | Apply or clear simplified tuning slider values                             |
| `bind_rx`                                                                                              | Initiate RX binding (SRXL2, CRSF, SPI RX)                                  |
| `bl [rom]`                                                                                             | Reboot into bootloader                                                     |
| `msc`                                                                                                  | Switch to USB mass-storage mode (SD card or flash)                         |
| `rc_smoothing_info`                                                                                    | Show RC smoothing operational settings                                     |
| `vtx_info`                                                                                             | Show VTX power configuration                                               |
| `flash_info`                                                                                           | Show flash chip info                                                       |
| `flash_scan`                                                                                           | Scan flash device for errors                                               |
| `flash_erase`                                                                                          | Erase flash chip (deletes blackboxes)                                      |
| `tasks`                                                                                                | Show task stats                                                            |
| `timer <> \| <pin> list \| <pin> [af<alternate function>\|none\|<option(deprecated)>] \| list \| show` | Show/set timers                                                            |

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

Column headers: **Variable** | **Default** | **Range / Values** | **Description**

Scope annotations in the raw dump: `profile N` = per-PID-profile, `rateprofile N` = per-rate-profile, no annotation = master (global).

---

### Gyro & IMU

| Variable                 | Default | Range / Values                           | Description                                                                                                                                                                                                 |
| ------------------------ | ------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `gyro_hardware_lpf`      | NORMAL  | NORMAL, OPTION_1, OPTION_2, EXPERIMENTAL | Hardware low-pass filter mode built into the gyro chip. NORMAL is correct for almost all builds. OPTION_1/2/EXPERIMENTAL select alternative hardware bandwidth settings where supported by the sensor.      |
| `gyro_calib_duration`    | 125     | 50–3000                                  | Gyro calibration duration in 0.1s steps (125 = 12.5s). Longer = more accurate offset measurement.                                                                                                           |
| `gyro_calib_noise_limit` | 48      | 0–200                                    | Noise threshold during calibration. If movement exceeds this, calibration restarts. Increase if it won't calibrate in a noisy environment.                                                                  |
| `gyro_offset_yaw`        | 0       | −1000 – 1000                             | Manual yaw gyro trim (tenths of degrees/s). Use to correct persistent yaw drift if trim sticks or acc trim are not sufficient.                                                                              |
| `gyro_overflow_detect`   | ALL     | OFF, YAW, ALL                            | Detects gyro ADC saturation (sensor hitting its limit) and disarms. Recommended: ALL.                                                                                                                       |
| `imu_dcm_kp`             | 2500    | 0–32000                                  | Complementary filter proportional gain. Controls how aggressively acc data is blended with gyro integration. Default is suitable for all normal use.                                                        |
| `imu_dcm_ki`             | 0       | 0–32000                                  | Complementary filter integral gain. Non-zero allows slow acc-based yaw correction. Rarely changed.                                                                                                          |
| `imu_process_denom`      | 2       | 1–4                                      | IMU attitude update rate divisor relative to gyro task rate. 2 = update every second gyro cycle. Higher values reduce CPU load at the cost of attitude accuracy.                                            |
| `small_angle`            | 25      | 0–180                                    | Maximum tilt angle (degrees) to permit arming. Set to 180 to arm at any angle (not recommended). During PID tuning set to 30 for safe angle-mode indoor flights.                                            |
| `pid_process_denom`      | 1       | 1–16                                     | PID loop rate divisor relative to gyro rate. 1 = PID runs every gyro sample. For 8kHz gyro with denom=2 → 4kHz PID rate. Target: BMI270 → 3.2kHz (tune with denom accordingly); ICM-42688P/MPU-6000 → 8kHz. |
| `gyro_cal_on_first_arm`  | OFF     | OFF, ON                                  | Recalibrates gyro on first arm after power-up. Useful if the FC warms up and gyro drifts before the first arm.                                                                                              |
| `prearm_allow_rearm`     | OFF     | OFF, ON                                  | Allow re-arm without toggling the prearm switch between flights.                                                                                                                                            |
| `auto_disarm_delay`      | 5       | 0–60                                     | Seconds of throttle-zero before auto-disarm. 0 = disabled.                                                                                                                                                  |
| `gyro_filter_debug_axis` | ROLL    | ROLL, PITCH, YAW                         | Which axis is exposed in debug fields for gyro filter analysis.                                                                                                                                             |
| `acc_calibration`        | 0,0,0,0 | Array of 4                               | Raw accelerometer calibration offsets written by the calibration routine. Do not edit manually.                                                                                                             |
| `acc_limit`              | 0       | 0–500 (profile)                          | Limits the accelerometer correction applied to the attitude estimate in angle/horizon mode. 0 = no limit.                                                                                                   |
| `acc_limit_yaw`          | 0       | 0–500 (profile)                          | Same as `acc_limit` but applied to the yaw axis. 0 = no limit.                                                                                                                                              |
| `acc_high_range`         | OFF     | OFF, ON                                  | Enable high-range accelerometer mode for sensors that support it.                                                                                                                                           |

---

### Gyro Filters

Gyro LPF1 is the main gyro low-pass. In most modern builds with RPM filtering, **disable LPF1** (`gyro_lpf1_static_hz = 0`) as it adds unnecessary delay. LPF2 is an anti-aliasing filter; raise its cutoff or disable if the gyro and PID rates are equal.

| Variable               | Default | Range / Values        | Description                                                                                                                 |
| ---------------------- | ------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `gyro_lpf1_type`       | PT1     | PT1, BIQUAD, PT2, PT3 | Filter type for gyro LPF1. PT1 = first-order, least delay.                                                                  |
| `gyro_lpf1_static_hz`  | 250     | 0–1000                | Static cutoff for LPF1. Set to **0 to disable** (recommended with RPM filtering).                                           |
| `gyro_lpf1_dyn_min_hz` | 250     | 0–1000                | Dynamic LPF1 minimum cutoff (at low throttle). Set equal to `gyro_lpf1_static_hz` to use static mode.                       |
| `gyro_lpf1_dyn_max_hz` | 500     | 0–1000                | Dynamic LPF1 maximum cutoff (at full throttle).                                                                             |
| `gyro_lpf1_dyn_expo`   | 5       | 0–10                  | Expo curve shaping for dynamic LPF1 cutoff vs throttle. Higher = faster rise.                                               |
| `gyro_lpf2_type`       | PT1     | PT1, BIQUAD, PT2, PT3 | Filter type for gyro LPF2 (anti-aliasing).                                                                                  |
| `gyro_lpf2_static_hz`  | 500     | 0–1000                | LPF2 cutoff. Raise toward 1000 Hz to reduce phase delay. Set to 0 if gyro rate = PID rate (aliasing not possible).          |
| `gyro_notch1_hz`       | 0       | 0–1000                | Centre frequency of static gyro notch 1. 0 = disabled. Use for specific persistent resonances not handled by dynamic notch. |
| `gyro_notch1_cutoff`   | 0       | 0–1000                | Bandwidth of gyro notch 1. Must be less than `gyro_notch1_hz`.                                                              |
| `gyro_notch2_hz`       | 0       | 0–1000                | Centre frequency of static gyro notch 2. 0 = disabled.                                                                      |
| `gyro_notch2_cutoff`   | 0       | 0–1000                | Bandwidth of gyro notch 2.                                                                                                  |

Also see:

- [PID tuning](/docs/wiki/guides/current/PID-Tuning-Guide)
- [PID tuning guide](/docs/wiki/guides/current/PID-Tuning-Guide)

---

### Dynamic Notch Filter

Tracks and eliminates frame resonances — visible as vertical stripes (fixed frequency, amplitude varies with throttle) in the blackbox spectrum.

| Variable           | Default | Range / Values | Description                                                                                                                                                                                                                                                      |
| ------------------ | ------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dyn_notch_count`  | 3       | 0–7            | Number of independently tracked dynamic notches. **Set to 0 to disable** if no frame resonances are visible in the spectrum (eliminates delay). With RPM filtering active, 1–2 notches are sufficient for most frame resonances. Without RPM filtering, use 4–5. |
| `dyn_notch_q`      | 300     | 1–1000         | Q factor — narrowness of each notch. Increase until the resonance just stays within the notch, then stop. Max useful value ~1000.                                                                                                                                |
| `dyn_notch_min_hz` | 100     | 20–250         | Minimum frequency any notch will track. Set ~25 Hz below the lowest resonance you need to catch. **Never set below 150 Hz** without reason (ideally ≥200 Hz) — tracking low frequencies causes unwanted filtering of PID-relevant signals.                       |
| `dyn_notch_max_hz` | 600     | 200–1000       | Maximum frequency any notch will track. Default 600 is fine for most builds. Narrowing the range improves notch resolution.                                                                                                                                      |

Also see:

- [PID tuning](/docs/wiki/guides/current/PID-Tuning-Guide)
- [PID tuning guide](/docs/wiki/guides/current/PID-Tuning-Guide)

---

### D-term & PID Output Filters

Two-stage D-term filter chain reduces motor noise heating caused by high-frequency D-term content. Use the Karate approach (slider-based) or the AOS approach (manual dyn cutoff) — not both simultaneously.

| Variable                | Default | Range / Values        | Description                                                                                                                                                      |
| ----------------------- | ------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dterm_lpf1_type`       | PT1     | PT1, BIQUAD, PT2, PT3 | Type for D-term LPF1. BIQUAD gives sharper roll-off; PT1 is less phase.                                                                                          |
| `dterm_lpf1_static_hz`  | 75      | 0–1000 (profile)      | Static cutoff for D-term LPF1. Used when `dterm_lpf1_dyn_min_hz == dterm_lpf1_dyn_max_hz`.                                                                       |
| `dterm_lpf1_dyn_min_hz` | 75      | 0–1000 (profile)      | Dynamic D-term LPF1 minimum cutoff (at idle throttle). AOS tune: 80 Hz.                                                                                          |
| `dterm_lpf1_dyn_max_hz` | 150     | 0–1000 (profile)      | Dynamic D-term LPF1 maximum cutoff (at full throttle). AOS tune: 110 Hz.                                                                                         |
| `dterm_lpf1_dyn_expo`   | 5       | 0–10 (profile)        | Expo curve for dynamic D-term LPF1 vs throttle. Push as high as possible without mid-throttle oscillations.                                                      |
| `dterm_lpf2_type`       | PT1     | PT1, BIQUAD, PT2, PT3 | Type for D-term LPF2.                                                                                                                                            |
| `dterm_lpf2_static_hz`  | 150     | 0–1000 (profile)      | Cutoff for D-term LPF2 (always static). Use as a secondary anti-noise stage.                                                                                     |
| `dterm_notch_hz`        | 0       | 0–1000 (profile)      | Static D-term notch centre frequency. 0 = disabled. Rarely needed when dynamic notch is active.                                                                  |
| `dterm_notch_cutoff`    | 0       | 0–1000 (profile)      | Static D-term notch bandwidth.                                                                                                                                   |
| `yaw_lowpass_hz`        | 100     | 0–500 (profile)       | Low-pass filter applied to the final yaw PID output (post-summation). Reduces yaw noise feeding into motors. Set to 0 to disable for maximum yaw responsiveness. |

Also see:

- [PID tuning](/docs/wiki/guides/current/PID-Tuning-Guide)
- [PID tuning guide](/docs/wiki/guides/current/PID-Tuning-Guide)

---

### PID Gains

All gains are per-profile. Scope shown in the raw dump as `profile N`. The simplified tuning sliders scale these values — after applying simplified tuning, the raw values reflect the result.

| Variable                 | Default  | Range                                   | Description                                                                                                                                                                                                                                                                                        |
| ------------------------ | -------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `p_roll`                 | 45       | 0–250                                   | Roll P gain. Reacts to angle error. Too high → fast oscillations on sharp moves.                                                                                                                                                                                                                   |
| `i_roll`                 | 80       | 0–250                                   | Roll I gain. Corrects accumulated angle error and maintains attitude. Too low → drift; too high → slow post-flip wobble.                                                                                                                                                                           |
| `d_roll`                 | 30       | 0–250                                   | Base D — active in smooth flight. Damps rate of change, counters P overshoot and propwash. Boosted toward `d_max_roll` on fast moves.                                                                                                                                                              |
| `d_max_roll`             | 40       | 0–250                                   | Dynamic damping ceiling — D value used during fast moves. Must be ≥ `d_roll`.                                                                                                                                                                                                                      |
| `f_roll`                 | 120      | 0–1000                                  | Feed forward for roll. Compensates for stick input lag. Scaled by the `simplified_feedforward_gain` slider.                                                                                                                                                                                        |
| `s_roll`                 | 0        | 0–250                                   | S-term (stability term) for roll. New in 2025.12 — provides additional stability control. _(Requires: `USE_WING`)_                                                                                                                                                                                 |
| `p_pitch`                | 47       | 0–250                                   | Pitch P gain. Pitch typically needs slightly higher P than roll due to greater inertia.                                                                                                                                                                                                            |
| `i_pitch`                | 84       | 0–250                                   | Pitch I gain.                                                                                                                                                                                                                                                                                      |
| `d_pitch`                | 34       | 0–250                                   | Base D — active in smooth flight. Boosted toward `d_max_pitch` on fast moves.                                                                                                                                                                                                                      |
| `d_max_pitch`            | 46       | 0–250                                   | D_max for pitch.                                                                                                                                                                                                                                                                                   |
| `f_pitch`                | 125      | 0–1000                                  | Feed forward for pitch.                                                                                                                                                                                                                                                                            |
| `s_pitch`                | 0        | 0–250                                   | S-term for pitch. _(Requires: `USE_WING`)_                                                                                                                                                                                                                                                         |
| `p_yaw`                  | 45       | 0–250                                   | Yaw P gain.                                                                                                                                                                                                                                                                                        |
| `i_yaw`                  | 80       | 0–250                                   | Yaw I gain.                                                                                                                                                                                                                                                                                        |
| `d_yaw`                  | 0        | 0–250                                   | Yaw D gain. Usually left at 0 — yaw is torque-based and inherently slower; D adds noise.                                                                                                                                                                                                           |
| `d_max_yaw`              | 0        | 0–250                                   | D_max for yaw.                                                                                                                                                                                                                                                                                     |
| `f_yaw`                  | 120      | 0–1000                                  | Feed forward for yaw.                                                                                                                                                                                                                                                                              |
| `s_yaw`                  | 0        | 0–250                                   | S-term for yaw. _(Requires: `USE_WING`)_                                                                                                                                                                                                                                                           |
| `pidsum_limit`           | 500      | 100–1000 (profile)                      | Clamps total P+I+D output. Set to 1000 (remove clamp) during initial PID tuning; restore default after.                                                                                                                                                                                            |
| `pidsum_limit_yaw`       | 400      | 100–1000 (profile)                      | Clamps total yaw PID output. Set to 1000 during initial tuning; default 400 limits yaw authority.                                                                                                                                                                                                  |
| `anti_gravity_gain`      | 80       | 0–250 (profile)                         | Boosts I-term on rapid throttle changes to prevent yaw/pitch dip on punch. Reduce if throttle-punch wobbles appear.                                                                                                                                                                                |
| `anti_gravity_p_gain`    | 100      | 0–250 (profile)                         | Boosts P-term (in addition to I) on rapid throttle changes. Reduce if punches cause P-induced oscillations.                                                                                                                                                                                        |
| `anti_gravity_cutoff_hz` | 5        | 2–50 (profile)                          | LPF cutoff for throttle derivative used by anti-gravity. Adjust for very large or small builds (larger = faster, smaller = slower response).                                                                                                                                                       |
| `iterm_rotation`         | OFF      | OFF, ON (profile)                       | Rotates I-term vector with the aircraft during yaw to reduce cross-axis coupling. Primarily useful for 3D flying.                                                                                                                                                                                  |
| `iterm_relax`            | RP       | OFF, RP, RPY, RP_INC, RPY_INC (profile) | Axes on which I-term relaxation (anti-windup during fast moves) is active. RP = roll and pitch. RPY includes yaw.                                                                                                                                                                                  |
| `iterm_relax_type`       | SETPOINT | GYRO, SETPOINT (profile)                | Signal used to detect a fast move. SETPOINT uses stick input signal; GYRO uses actual gyro rate. SETPOINT is default and works well for most cases.                                                                                                                                                |
| `iterm_relax_cutoff`     | 15       | 1–50 (profile)                          | Cutoff frequency for the I-term relax HP filter. Higher = reacts faster (better for racing). Lower = smoother (better for large/slow builds). Typical ranges: Racing: 30–40, Freestyle 5": 15, 7"+: 10, X-Class: 3–5. If bounce-back or post-flip oscillation persists, step this down: 15→10→7→5. |
| `iterm_windup`           | 80       | 20–100 (profile)                        | Suppresses I accumulation (in %) when motors are near saturation. Default 80 is sensible.                                                                                                                                                                                                          |

Also see:

- [PID tuning](/docs/wiki/guides/current/PID-Tuning-Guide)
- [PID tuning guide](/docs/wiki/guides/current/PID-Tuning-Guide)

---

### Dynamic Damping

Dynamically increases D on sharp moves while keeping it low during calm flight (to reduce motor heat and noise). Requires setting up both a floor D and a ceiling D — see version notes in the PID Gains section above.

| Variable        | Default | Range           | Description                                                                                                                                                                                                            |
| --------------- | ------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `d_max_gain`    | 37      | 0–100 (profile) | Controls how aggressively D rises from base D toward `d_max` on sharp moves. Default is suitable; reduce if D boost causes propwash on move initiation.                                                                |
| `d_max_advance` | 20      | 0–200 (profile) | Allows D boost to start before the gyro rate peaks, using feedforward signal. **Set to 0 during baseline tuning** — rarely beneficial and can cause premature D oscillation. Only explore once the baseline is stable. |

**Setup:** Set `d_roll` = floor D (e.g. 15), `d_max_roll` = ceiling D (e.g. 30). Calm flight uses `d_roll`; sharp moves boost toward `d_max_roll`. Debug with `set debug_mode = D_MAX`.

Also see:

- [PID tuning](/docs/wiki/guides/current/PID-Tuning-Guide)
- [PID tuning guide](/docs/wiki/guides/current/PID-Tuning-Guide)
- [D min](/docs/wiki/guides/archive/DMIN) _(archived — variables renamed in 2025.12)_

---

### Feed Forward

Feed forward adds a stick-input derivative term — it anticipates moves rather than reacting to error. Requires clean stick input; apply the appropriate RC link preset first.

**Note:** Feed forward is bypassed in angle mode. Test FF in acro/rate mode only.

| Variable                     | Default | Range / Values                           | Description                                                                                                                                                                                                                      |
| ---------------------------- | ------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `feedforward_transition`     | 0       | 0–100 (profile)                          | Blends FF toward zero near stick center. 0 = full FF throughout (racing). 40 = freestyle/HD. 70 = cinematic. **Set to 0 when `feedforward_jitter_factor` is active** — they serve overlapping purposes and must not be combined. |
| `feedforward_averaging`      | 2_POINT | OFF, 2_POINT, 3_POINT, 4_POINT (profile) | Averages stick input samples before FF calculation to smooth out RC link quantization. OFF = no averaging (snappiest); 4_POINT = heaviest smoothing.                                                                             |
| `feedforward_smooth_factor`  | 65      | 0–95 (profile)                           | Additional smoothing applied to the FF signal. Higher = smoother FF output.                                                                                                                                                      |
| `feedforward_jitter_factor`  | 7       | 0–20 (profile)                           | Suppresses FF on very slow or jittery stick inputs. Higher = smoother center feel during slow moves (freestyle/HD). Lower = snappier (racing).                                                                                   |
| `feedforward_boost`          | 15      | 0–50 (profile)                           | Adds an acceleration component to FF (second derivative of stick). Increase if gyro lags at the start of a move. Decrease if gyro overshoots at move entry (bounce-back at start).                                               |
| `feedforward_max_rate_limit` | 90      | 0–200 (profile)                          | Reduces FF as sticks approach maximum deflection. 90 = cut FF when stick is at 90% travel. Raise to 92–95 for crisper move entry on responsive builds.                                                                           |
| `feedforward_yaw_hold_gain`  | 15      | 0–100 (profile)                          | Sustains a residual FF signal in yaw after the stick is released, counteracting I-term under-yaw.                                                                                                                                |
| `feedforward_yaw_hold_time`  | 100     | 10–250 (profile)                         | Duration (ms) of the yaw FF hold after stick release.                                                                                                                                                                            |

Also see:

- [Feed forward](/docs/wiki/guides/current/Feed-Forward-2-0)

---

### Simplified Tuning Sliders

When simplified tuning is active, these intermediate values drive the actual PID/filter gains. Use `simplified_tuning apply` in CLI to compute and write the raw values. `simplified_tuning disable` zeroes the simplified system and leaves the raw values in place for manual editing.

| Variable                             | Default | Range                  | Description                                                                                                                    |
| ------------------------------------ | ------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `simplified_pids_mode`               | RPY     | OFF, RP, RPY (profile) | Which axes the simplified PID sliders control. RPY = all axes.                                                                 |
| `simplified_master_multiplier`       | 100     | 0–200 (profile)        | Master gain slider — scales all P, I, D and D_max together. Equivalent to PIDtoolbox "Master Multiplier". 100 = default gains. |
| `simplified_pi_gain`                 | 100     | 0–200 (profile)        | P and I scaling slider (relative to master).                                                                                   |
| `simplified_d_gain`                  | 100     | 0–200 (profile)        | D scaling slider.                                                                                                              |
| `simplified_d_max_gain`              | 100     | 0–200 (profile)        | D_max scaling slider (dynamic damping ceiling).                                                                                |
| `simplified_i_gain`                  | 100     | 0–200 (profile)        | I scaling slider (independent of P).                                                                                           |
| `simplified_feedforward_gain`        | 100     | 0–200 (profile)        | Feedforward scaling slider.                                                                                                    |
| `simplified_pitch_pi_gain`           | 100     | 0–200 (profile)        | Additional P and I multiplier for pitch only (relative compensation for pitch inertia).                                        |
| `simplified_pitch_d_gain`            | 100     | 0–200 (profile)        | Additional D multiplier for pitch only.                                                                                        |
| `simplified_gyro_filter`             | ON      | OFF, ON                | Whether simplified slider controls gyro filter cutoffs.                                                                        |
| `simplified_gyro_filter_multiplier`  | 100     | 10–200                 | Gyro filter cutoff scaling slider. 100 = current static values. Raise to reduce gyro filtering (faster).                       |
| `simplified_dterm_filter`            | ON      | OFF, ON (profile)      | Whether simplified slider controls D-term filter cutoffs.                                                                      |
| `simplified_dterm_filter_multiplier` | 100     | 10–200 (profile)       | D-term filter cutoff scaling slider.                                                                                           |

Also see:

- [PID tuning](/docs/wiki/guides/current/PID-Tuning-Guide)
- [PID tuning guide](/docs/wiki/guides/current/PID-Tuning-Guide)

---

### TPA (Throttle PID Attenuation)

Attenuates PID gains at high throttle to counteract the increased responsiveness of motors at full power. Use only if oscillations appear at high throttle after filters and PIDs are otherwise tuned.

| Variable                   | Default | Range / Values                | Description                                                                                                                                    |
| -------------------------- | ------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `tpa_mode`                 | D       | PD, D, PDS (profile)          | Which terms TPA attenuates. `D` = D only (default, safest). `PD` = P and D. `PDS` = P, D, and S-term.                                          |
| `tpa_rate`                 | 65      | 0–100 (profile)               | Maximum attenuation percentage at full throttle. 65 = PIDs are at 35% above the breakpoint.                                                    |
| `tpa_breakpoint`           | 1350    | 1000–2000 (profile)           | Throttle level (1000–2000 scale) where TPA begins. Attenuation is proportional from here to full throttle.                                     |
| `tpa_low_rate`             | 20      | −128–100 (profile)            | D attenuation at minimum throttle (TPA Low). Reduces D-term shaking during throttle chops.                                                     |
| `tpa_low_breakpoint`       | 1050    | 1000–2000 (profile)           | Throttle level below which TPA Low applies.                                                                                                    |
| `tpa_low_always`           | OFF     | OFF, ON (profile)             | OFF = TPA Low is only active before Airmode activates; ON = active throughout the flight.                                                      |
| `tpa_curve_type`           | CLASSIC | CLASSIC, HYPERBOLIC (profile) | TPA curve shape. CLASSIC matches legacy TPA behaviour. HYPERBOLIC applies a hyperbolic attenuation curve. _(Requires: `USE_ADVANCED_TPA`)_     |
| `tpa_curve_expo`           | 20      | −100–100 (profile)            | Expo applied to the TPA curve. Negative = more attenuation at low throttle; positive = more at high throttle. _(Requires: `USE_ADVANCED_TPA`)_ |
| `tpa_curve_pid_thr0`       | 200     | 0–1000 (profile)              | PID value (×0.1%) at zero throttle for the TPA curve. Default 200 = 20% of full PID at idle. _(Requires: `USE_ADVANCED_TPA`)_                  |
| `tpa_curve_pid_thr100`     | 70      | 0–1000 (profile)              | PID value (×0.1%) at full throttle for the TPA curve. Default 70 = 7% of full PID at max throttle. _(Requires: `USE_ADVANCED_TPA`)_            |
| `tpa_curve_stall_throttle` | 30      | 0–100 (profile)               | Throttle % below which the craft is considered stalled (for wing/fixed-wing TPA). _(Requires: `USE_ADVANCED_TPA`)_                             |
| `tpa_speed_type`           | BASIC   | BASIC, ADVANCED (profile)     | Speed-based TPA. BASIC uses GPS-derived speed. ADVANCED uses a physics model based on motor/prop parameters. _(Requires: `USE_WING`)_          |
| `tpa_speed_basic_delay`    | 1000    | 1–65535 (profile)             | Delay (ms) before speed-based TPA updates after a speed change. Prevents rapid gain changes during maneuvers. _(Requires: `USE_WING`)_         |
| `tpa_speed_basic_gravity`  | 50      | 1–65535 (profile)             | Gravity factor for BASIC speed TPA. Affects TPA response curve vs airspeed. _(Requires: `USE_WING`)_                                           |
| `tpa_speed_max_voltage`    | 2520    | 0–65535 (profile)             | Maximum pack voltage (in mV×0.1) used to normalize motor speed in BASIC speed TPA. _(Requires: `USE_WING`)_                                    |
| `tpa_speed_pitch_offset`   | 0       | −32768–32767 (profile)        | Pitch offset correction for speed TPA (wing/fixed-wing trim). _(Requires: `USE_WING`)_                                                         |
| `tpa_speed_adv_drag_k`     | 1000    | 1–65535 (profile)             | Aerodynamic drag coefficient for ADVANCED speed TPA physics model. _(Requires: `USE_WING`)_                                                    |
| `tpa_speed_adv_mass`       | 1000    | 1–65535 (profile)             | Craft mass (g×0.1) for ADVANCED speed TPA physics model. _(Requires: `USE_WING`)_                                                              |
| `tpa_speed_adv_prop_pitch` | 370     | 0–65535 (profile)             | Propeller pitch (mm) for ADVANCED speed TPA physics model. _(Requires: `USE_WING`)_                                                            |
| `tpa_speed_adv_thrust`     | 2000    | 1–65535 (profile)             | Maximum thrust (g) for ADVANCED speed TPA physics model. _(Requires: `USE_WING`)_                                                              |

---

### Rates

Betaflight 2025.12 defaults to the ACTUAL rates system. In ACTUAL: RC_Rate = degrees/sec at stick center, Expo = transition sharpness, Super Rate = max rate. In BETAFLIGHT legacy system: RC_Rate, Expo, and RC_Rate interact differently.

| Variable                 | Default | Range                                                     | Description                                                                                                      |
| ------------------------ | ------- | --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `rates_type`             | ACTUAL  | BETAFLIGHT, RACEFLIGHT, KISS, ACTUAL, QUICK (rateprofile) | Rate calculation system. ACTUAL is the most intuitive (center sens and max rate are directly set).               |
| `roll_rc_rate`           | 7       | 1–255 (rateprofile)                                       | Roll rate at stick center in deg/s×10 (ACTUAL) or RC multiplier (legacy).                                        |
| `pitch_rc_rate`          | 7       | 1–255 (rateprofile)                                       | Pitch rate at stick center.                                                                                      |
| `yaw_rc_rate`            | 7       | 1–255 (rateprofile)                                       | Yaw rate at stick center.                                                                                        |
| `roll_expo`              | 0       | 0–100 (rateprofile)                                       | Roll expo — transition between center sensitivity and max rate. Higher = more expo, slower center, faster edges. |
| `pitch_expo`             | 0       | 0–100 (rateprofile)                                       | Pitch expo.                                                                                                      |
| `yaw_expo`               | 0       | 0–100 (rateprofile)                                       | Yaw expo.                                                                                                        |
| `roll_srate`             | 67      | 0–255 (rateprofile)                                       | Roll super rate — max rate at full stick deflection (ACTUAL system).                                             |
| `pitch_srate`            | 67      | 0–255 (rateprofile)                                       | Pitch super rate.                                                                                                |
| `yaw_srate`              | 67      | 0–255 (rateprofile)                                       | Yaw super rate.                                                                                                  |
| `quickrates_rc_expo`     | OFF     | OFF, ON (rateprofile)                                     | In QUICK rates mode, applies expo globally.                                                                      |
| `thr_mid`                | 50      | 0–100 (rateprofile)                                       | Throttle curve mid-point — sets the thrust at 50% stick.                                                         |
| `thr_expo`               | 0       | 0–100 (rateprofile)                                       | Throttle expo.                                                                                                   |
| `thr_hover`              | 50      | 0–100 (rateprofile)                                       | Estimated hover throttle percentage. Used by alt-hold and some internal calculations.                            |
| `throttle_limit_type`    | OFF     | OFF, SCALE, CLIP (rateprofile)                            | Limits maximum throttle output. SCALE = proportionally scales all outputs; CLIP = hard ceiling.                  |
| `throttle_limit_percent` | 100     | 25–100 (rateprofile)                                      | Maximum throttle percentage when `throttle_limit_type` is active.                                                |
| `roll_rate_limit`        | 1998    | 200–1998 (rateprofile)                                    | Hard cap on roll rate in deg/s, applied after the rates curve.                                                   |
| `pitch_rate_limit`       | 1998    | 200–1998 (rateprofile)                                    | Hard cap on pitch rate.                                                                                          |
| `yaw_rate_limit`         | 1998    | 200–1998 (rateprofile)                                    | Hard cap on yaw rate.                                                                                            |
| `yaw_control_reversed`   | OFF     | OFF, ON                                                   | Reverses the direction of yaw stick.                                                                             |
| `fpv_mix_degrees`        | 0       | 0–90                                                      | FPV camera tilt angle for tilt-compensated yaw mixing.                                                           |

Also see:

- [Profiles](/docs/development/Profiles)
- [Rate Calculator](/docs/wiki/guides/current/Rate-Calculator)

---

### Angle & Horizon Mode

| Variable                         | Default | Range              | Description                                                                                                                                       |
| -------------------------------- | ------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `angle_p_gain`                   | 50      | 0–200 (profile)    | P gain for angle mode self-leveling. Higher = stronger return to level.                                                                           |
| `angle_feedforward`              | 50      | 0–200 (profile)    | Feedforward in angle mode — reduces lag when moving the angle setpoint.                                                                           |
| `angle_feedforward_smoothing_ms` | 80      | 10–250 (profile)   | Smoothing applied to angle feedforward signal.                                                                                                    |
| `angle_limit`                    | 60      | 10–80 (profile)    | Maximum tilt angle in angle mode (degrees).                                                                                                       |
| `angle_earth_ref`                | 100     | 0–100 (profile)    | Proportion of earth-frame reference used in angle mode (0 = body frame, 100 = full earth frame). 100 is recommended for GPS rescue compatibility. |
| `angle_pitch_offset`             | 0       | −450–450 (profile) | Pitch trim offset in tenths of degrees for angle mode. Use to adjust the level hover point without reflying. _(Requires: `USE_WING`)_             |
| `horizon_level_strength`         | 75      | 0–100              | Level mode strength at stick center in horizon mode.                                                                                              |
| `horizon_limit_sticks`           | 75      | 10–200             | Stick deflection (%) at which horizon mode gives full acro authority.                                                                             |
| `horizon_limit_degrees`          | 135     | 10–250             | Maximum attitude angle before horizon mode enforces leveling.                                                                                     |
| `acc_trim_pitch`                 | 0       | −300–300           | Accelerometer pitch trim for level calibration.                                                                                                   |
| `acc_trim_roll`                  | 0       | −300–300           | Accelerometer roll trim for level calibration.                                                                                                    |
| `acc_lpf_hz`                     | 25      | 0–500              | Accelerometer low-pass filter cutoff. Smooths acc readings used for attitude estimation.                                                          |
| `horizon_delay_ms`               | 500     | 10–5000 (profile)  | Time (ms) before horizon mode re-applies leveling after sticks return to center. Delays return-to-level for a more acro-like feel.                |
| `horizon_ignore_sticks`          | OFF     | OFF, ON (profile)  | When ON, horizon mode ignores stick input for the leveling transition — governed by `horizon_delay_ms` only.                                      |
| `level_race_mode`                | OFF     | OFF, ON (profile)  | When ON, angle mode holds the current angle as the setpoint rather than actively leveling. For racing use of angle mode.                          |
| `landing_disarm_threshold`       | 0       | 0–250 (profile)    | Accelerometer impact threshold for auto-disarm on landing (used by GPS Rescue and EZ Landing). 0 = disabled.                                      |

Also see:

- [Modes](/docs/development/Modes)

---

### Motor & ESC

| Variable                    | Default         | Range / Values                                                                                      | Description                                                                                                                                                                                                                              |
| --------------------------- | --------------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `motor_pwm_protocol`        | DSHOT600        | PWM, ONESHOT125, ONESHOT42, MULTISHOT, BRUSHED, DSHOT150, DSHOT300, DSHOT600, PROSHOT1000, DISABLED | ESC communication protocol. DSHOT600 for ICM-42688P/MPU-6000 at 8kHz; **DSHOT300 for BMI270 at 3.2kHz** (DSHOT600 at 3.2kHz is marginal).                                                                                                |
| `dshot_bidir`               | OFF             | OFF, ON                                                                                             | Enables bidirectional DSHOT for RPM telemetry. Required for RPM filtering. ESC firmware must support it. _(Requires: `USE_DSHOT` + `USE_DSHOT_TELEMETRY`)_                                                                               |
| `dshot_burst`               | AUTO            | OFF, ON, AUTO                                                                                       | DSHOT burst transmission mode. AUTO selects based on hardware capability. _(Requires: `USE_DSHOT` + `USE_DSHOT_DMAR`)_                                                                                                                   |
| `dshot_edt`                 | OFF             | OFF, ON, FORCE                                                                                      | Extended DSHOT Telemetry — provides additional ESC data beyond RPM. FORCE enables EDT even when bidir is off. _(Requires: `USE_DSHOT` + `USE_DSHOT_TELEMETRY`)_                                                                          |
| `dshot_bitbang`             | AUTO            | OFF, ON, AUTO                                                                                       | DSHOT bitbang implementation (software DSHOT). AUTO selects automatically. _(Requires: `USE_DSHOT` + `USE_DSHOT_BITBANG`)_                                                                                                               |
| `dshot_bitbang_timer`       | AUTO            | AUTO, TIM1, TIM8                                                                                    | Timer used for bitbang DSHOT. _(Requires: `USE_DSHOT` + `USE_DSHOT_BITBANG`)_                                                                                                                                                            |
| `motor_poles`               | 14              | 4–255                                                                                               | Number of magnetic poles on the motor bell (magnet count, **not** stator count). **Critical for RPM filter accuracy.** Most 5" motors have 14 magnets; verify on your specific motors. Wrong value → filters tracking wrong frequencies. |
| `motor_kv`                  | 1960            | 1–40000                                                                                             | Motor KV rating. Used in some internal calculations. Set to your actual motor KV for accurate RPM limit and dynamic idle features.                                                                                                       |
| `motor_idle`                | 550             | 0–2000                                                                                              | Idle throttle value sent to ESCs when armed (units depend on protocol). Used as the minimum non-zero motor command.                                                                                                                      |
| `min_command`               | 1000            | 750–2250                                                                                            | PWM value sent to ESCs when disarmed or at zero throttle (for PWM-based protocols). For DSHOT, this is overridden by the protocol.                                                                                                       |
| `max_throttle`              | 2000            | 750–2250                                                                                            | Maximum PWM value sent to ESCs (for PWM-based protocols).                                                                                                                                                                                |
| `motor_output_limit`        | 100             | 1–100 (profile)                                                                                     | Caps per-motor output as a percentage. Use when running higher cell count than motors are rated for (e.g. 6S on a 4S build → set to ~66%).                                                                                               |
| `motor_output_reordering`   | 0,1,2,3,4,5,6,7 | array                                                                                               | Reorders motor output channels without rewiring. Specify the output index for each motor position.                                                                                                                                       |
| `motor_pwm_rate`            | 480             | 200–32000                                                                                           | PWM frequency for brushed motor mode. Not relevant for DSHOT protocols.                                                                                                                                                                  |
| `motor_pwm_inversion`       | OFF             | OFF, ON                                                                                             | Invert PWM output polarity. For ESCs that require inverted signal.                                                                                                                                                                       |
| `use_unsynced_pwm`          | OFF             | OFF, ON                                                                                             | Send motor PWM unsynchronised to the PID loop. Primarily for brushed motors.                                                                                                                                                             |
| `thrust_linear`             | 0               | 0–150 (profile)                                                                                     | Linearises the thrust curve at low throttle. Improves low-throttle authority and responsiveness, especially for whoops and 48kHz ESCs. **20–40% is typically enough**; no effect above mid-throttle.                                     |
| `throttle_boost`            | 5               | 0–100                                                                                               | Transiently boosts throttle output on fast throttle stick changes for immediate throttle feel.                                                                                                                                           |
| `throttle_boost_cutoff`     | 15              | 5–50                                                                                                | LPF cutoff for throttle derivative used by `throttle_boost`.                                                                                                                                                                             |
| `yaw_motors_reversed`       | OFF             | OFF, ON                                                                                             | Reverse yaw PID output sign. Use when motor spin direction is swapped from normal.                                                                                                                                                       |
| `rpm_limit`                 | OFF             | OFF, ON                                                                                             | Enables per-motor RPM limit. _(Requires: `USE_RPM_LIMIT`)_                                                                                                                                                                               |
| `rpm_limit_value`           | 18000           | 1–65535                                                                                             | Maximum motor RPM when `rpm_limit` is ON. _(Requires: `USE_RPM_LIMIT`)_                                                                                                                                                                  |
| `rpm_limit_p`               | 25              | 0–100                                                                                               | P gain for RPM limiter controller. _(Requires: `USE_RPM_LIMIT`)_                                                                                                                                                                         |
| `rpm_limit_i`               | 10              | 0–1000                                                                                              | I gain for RPM limiter controller. _(Requires: `USE_RPM_LIMIT`)_                                                                                                                                                                         |
| `rpm_limit_d`               | 8               | 0–100                                                                                               | D gain for RPM limiter controller. _(Requires: `USE_RPM_LIMIT`)_                                                                                                                                                                         |
| `esc_sensor_current_offset` | 0               | 0–16000                                                                                             | Current offset applied to ESC sensor current reading in mA. Use to zero-calibrate ESC current reporting. _(Requires: `USE_ESC_SENSOR`)_                                                                                                  |
| `esc_sensor_halfduplex`     | OFF             | OFF, ON                                                                                             | Enable half-duplex UART for ESC sensor (BLHeli32/AM32 telemetry on a single wire). _(Requires: `USE_ESC_SENSOR`)_                                                                                                                        |
| `mixer_type`                | LEGACY          | LEGACY, LINEAR, DYNAMIC, EZLANDING                                                                  | Motor mixer output mode. LEGACY = classic mixer. LINEAR = linear output scaling. DYNAMIC = dynamic output scaling. EZLANDING = enables EZ Landing soft-landing feature.                                                                  |

Also see:

- [ESC telemetry](/docs/wiki/guides/current/ESC-Telemetry)
- [DShot RPM Filtering](/docs/wiki/guides/current/DSHOT-RPM-Filtering)

---

### RPM Filter (Bidirectional DSHOT)

Requires bidirectional DSHOT (`dshot_bidir = ON`) and ESC firmware that supports it (BLHeli_32, AM32, BlueJay). Motor noise typically starts around 100 Hz and increases with throttle. Harmonics occur at 2× and 3× the fundamental.

| Variable                   | Default     | Range / Values         | Description                                                                                                                                                                                                        |
| -------------------------- | ----------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `rpm_filter_harmonics`     | 3           | 0–3                    | Number of RPM harmonics to filter per motor. 3 = fundamental + 2nd + 3rd. 0 disables RPM filtering.                                                                                                                |
| `rpm_filter_weights`       | 100,100,100 | Array of 3, 0–100 each | Per-harmonic notch depth percentage. Tri-blade props: try `100,0,80` (2nd harmonic absent). Bi-blade: `100,80,0` or `100,50,0`. Lower each as far as possible without motor noise appearing in filtered gyro.      |
| `rpm_filter_q`             | 500         | 250–3000               | Q factor (notch sharpness). **Target 1000 on well-configured 5" builds** — default 500 is a starting point, not a goal. Higher Q = narrower notch = less phase delay. Back off only if motor noise bleeds through. |
| `rpm_filter_min_hz`        | 100         | 30–200                 | Below this frequency, notches are not applied. Lower on larger quads with slower-spinning motors (7"+ reduce to 60–80 Hz).                                                                                         |
| `rpm_filter_fade_range_hz` | 50          | 0–1000                 | Frequency band over which notches fade in at low throttle, reducing delay at idle.                                                                                                                                 |
| `rpm_filter_lpf_hz`        | 150         | 100–500                | Post-notch smoothing LPF applied to the RPM signal used for notch tracking.                                                                                                                                        |

Also see:

- [PID tuning](/docs/wiki/guides/current/PID-Tuning-Guide)
- [PID tuning guide](/docs/wiki/guides/current/PID-Tuning-Guide)
- [DShot RPM Filtering](/docs/wiki/guides/current/DSHOT-RPM-Filtering)

---

### Dynamic Idle

Prevents motor stall during flips/rolls and throttle chops. Any non-zero `dyn_idle_min_rpm` enables it. **Always set `transient_throttle_limit = 0` when enabling dynamic idle.**

| Variable                   | Default | Range            | Description                                                                                                                                                                    |
| -------------------------- | ------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `pid_at_min_throttle`      | ON      | OFF, ON          | Keeps PIDs active at minimum throttle (idle). Required for airmode to function correctly; normally left ON.                                                                    |
| `dyn_idle_min_rpm`         | 0       | 0–200 (profile)  | Minimum motor RPM maintained by dynamic idle. **Set non-zero to enable.** Target by prop size.                                                                                 |
| `dyn_idle_p_gain`          | 50      | 1–250 (profile)  | P gain of the dynamic idle RPM controller. Reduce if idle causes oscillation.                                                                                                  |
| `dyn_idle_i_gain`          | 50      | 1–250 (profile)  | I gain of the dynamic idle RPM controller.                                                                                                                                     |
| `dyn_idle_d_gain`          | 50      | 0–250 (profile)  | D gain of the dynamic idle RPM controller.                                                                                                                                     |
| `dyn_idle_max_increase`    | 150     | 10–255 (profile) | Maximum throttle increase (in motor units) the dynamic idle controller can command above the static idle value.                                                                |
| `transient_throttle_limit` | 0       | 0–30 (profile)   | Limits rapid throttle-up transients. **Must be set to 0 when dynamic idle is enabled.** Non-zero values were used before dynamic idle existed. _(Requires: `USE_AIRMODE_LPF`)_ |

Also see:

- [Dynamic Idle](/docs/wiki/guides/current/Dynamic-Idle)

---

### RC Input & Smoothing

| Variable                            | Default | Range / Values                                                        | Description                                                                                                                             |
| ----------------------------------- | ------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `serialrx_provider`                 | CRSF    | SPEK1024, SPEK2048, SBUS, SUMD, IBUS, JETIEXBUS, CRSF, SRXL, SRXL2, … | Serial RX protocol. Must match the receiver's output format.                                                                            |
| `serialrx_inverted`                 | OFF     | OFF, ON                                                               | Invert the serial RX signal. Required for some receivers on certain FC designs.                                                         |
| `serialrx_halfduplex`               | OFF     | OFF, ON                                                               | Use single-wire half-duplex UART for serial RX (some CRSF implementations).                                                             |
| `sbus_baud_fast`                    | OFF     | OFF, ON                                                               | Enable fast (200kbps) SBUS mode. For SBUS receivers that support it.                                                                    |
| `crsf_use_negotiated_baud`          | OFF     | OFF, ON                                                               | Allow CRSF to negotiate baud rate. Enable when using faster CRSF rates (e.g. ELRS negotiated speed).                                    |
| `rx_min_usec`                       | 885     | 750–2250                                                              | Shortest channel pulse width considered valid. Values below this trigger signal-loss detection (PPM/PWM).                               |
| `rx_max_usec`                       | 2115    | 750–2250                                                              | Longest channel pulse width considered valid.                                                                                           |
| `mid_rc`                            | 1500    | 1200–1700                                                             | RC mid-point. Match to your transmitter's stick center value. Futaba radios often need 1520.                                            |
| `min_check`                         | 1050    | 750–2250                                                              | RC channel value below which arm/disarm and stick commands are recognized.                                                              |
| `max_check`                         | 1900    | 750–2250                                                              | RC channel value above which arm/disarm and stick commands are recognized.                                                              |
| `deadband`                          | 0       | 0–32                                                                  | RC deadband around stick center (microseconds). Increase if sticks don't return to exact center.                                        |
| `yaw_deadband`                      | 0       | 0–100                                                                 | Yaw-specific deadband around center.                                                                                                    |
| `max_aux_channels`                  | 14      | 0–14                                                                  | Maximum number of AUX channels processed.                                                                                               |
| `rc_smoothing`                      | ON      | OFF, ON                                                               | Enables RC input interpolation and smoothing between received frames.                                                                   |
| `rc_smoothing_auto_factor`          | 30      | 0–250                                                                 | Auto-smoothing aggressiveness for setpoint channels. Higher = smoother but more lag. Preset applies the correct value for your RC link. |
| `rc_smoothing_auto_factor_throttle` | 30      | 0–250                                                                 | Auto-smoothing aggressiveness for throttle channel.                                                                                     |
| `rc_smoothing_setpoint_cutoff`      | 0       | 0–255                                                                 | Manual setpoint smoothing cutoff. 0 = use auto.                                                                                         |
| `rc_smoothing_throttle_cutoff`      | 0       | 0–255                                                                 | Manual throttle smoothing cutoff. 0 = use auto.                                                                                         |
| `rc_smoothing_debug_axis`           | ROLL    | ROLL, PITCH, YAW, THROTTLE                                            | Which axis to expose in the RC smoothing debug fields (visible in blackbox when `debug_mode = RC_SMOOTHING`).                           |
| `airmode_start_throttle_percent`    | 25      | 0–100                                                                 | Throttle percentage above which airmode activates. At higher values, motors begin to idle before airmode engages.                       |
| `rssi_channel`                      | 0       | 0–18                                                                  | AUX channel carrying RSSI signal. 0 = not using channel RSSI.                                                                           |
| `rssi_scale`                        | 100     | 1–255                                                                 | Scales the RSSI input.                                                                                                                  |
| `rssi_offset`                       | 0       | −100–100                                                              | Offsets the RSSI reading.                                                                                                               |
| `rssi_invert`                       | OFF     | OFF, ON                                                               | Invert the RSSI signal (some receivers send inverted RSSI).                                                                             |
| `rssi_smoothing`                    | 125     | 0–255                                                                 | LPF period for RSSI smoothing. Higher = smoother but slower response to signal changes.                                                 |
| `rssi_src_frame_errors`             | OFF     | OFF, ON                                                               | Derive RSSI from frame error rate (for receivers that do not report RSSI directly).                                                     |
| `rssi_src_frame_lpf_period`         | 30      | 0–255                                                                 | LPF period for frame-error-based RSSI smoothing.                                                                                        |
| `pid_in_tlm`                        | OFF     | OFF, ON                                                               | Include PID data in telemetry output (where supported by the telemetry protocol).                                                       |
| `channel_forwarding_start`          | 4       | 4–18                                                                  | First AUX channel to forward to servo outputs (for channel forwarding to servos). _(Requires: `USE_SERVOS`)_                            |
| `input_filtering_mode`              | OFF     | OFF, ON                                                               | Enable hardware-level RC input filtering. Required on some F1 targets; leave OFF on modern hardware.                                    |

Also see:

- [Controls](/docs/development/Controls)
- [Receivers (RX)](/docs/development/Rx)
- [RSSI](/docs/development/Rssi)
- [Spektrum Bind Support](/docs/development/Spektrum-bind)

---

### Battery & Current Sensing

| Variable                     | Default | Range / Values               | Description                                                                                                                                                                                                                                                                                            |
| ---------------------------- | ------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `battery_meter`              | ADC     | NONE, ADC, ESC               | Source for battery voltage reading. ADC = onboard voltage divider. ESC = from ESC telemetry.                                                                                                                                                                                                           |
| `battery_continue`           | OFF     | OFF, ON                      | Continue logging/flying after battery disconnect/reconnect (for hot-swap builds). _(Requires: `USE_BATTERY_CONTINUE`)_                                                                                                                                                                                 |
| `vbat_scale`                 | 110     | 0–255                        | Voltage divider calibration. Adjust until reported voltage matches a multimeter.                                                                                                                                                                                                                       |
| `vbat_divider`               | 10      | 1–255                        | Voltage divider ratio numerator.                                                                                                                                                                                                                                                                       |
| `vbat_multiplier`            | 1       | 1–255                        | Voltage divider ratio multiplier.                                                                                                                                                                                                                                                                      |
| `vbat_detect_cell_voltage`   | 300     | 0–2000                       | Voltage above which a battery is considered connected (×0.01V per cell).                                                                                                                                                                                                                               |
| `force_battery_cell_count`   | 0       | 0–24                         | Override auto cell-count detection. 0 = auto-detect from `vbat_max_cell_voltage`.                                                                                                                                                                                                                      |
| `vbat_max_cell_voltage`      | 430     | 100–500                      | Maximum per-cell voltage for auto cell-count detection (×0.01V). Default 430 = 4.30V.                                                                                                                                                                                                                  |
| `vbat_full_cell_voltage`     | 410     | 100–500                      | "Full" cell voltage for capacity display. Default 410 = 4.10V.                                                                                                                                                                                                                                         |
| `vbat_warning_cell_voltage`  | 350     | 100–500                      | Warning threshold voltage per cell (×0.01V). Default 350 = 3.50V.                                                                                                                                                                                                                                      |
| `vbat_min_cell_voltage`      | 330     | 100–500                      | Minimum cell voltage — triggers battery-critical alarm (×0.01V). Default 330 = 3.30V.                                                                                                                                                                                                                  |
| `vbat_hysteresis`            | 1       | 0–250                        | Hysteresis on voltage warnings to prevent flicker (×0.01V).                                                                                                                                                                                                                                            |
| `vbat_duration_for_warning`  | 0       | 0–150                        | Consecutive tenths-of-seconds the voltage must remain below the warning threshold before the warning alarm fires. Prevents brief-spike false alarms.                                                                                                                                                   |
| `vbat_duration_for_critical` | 0       | 0–150                        | Same as above but for the critical threshold.                                                                                                                                                                                                                                                          |
| `vbat_display_lpf_period`    | 30      | 1–255                        | LPF period for the voltage shown on the OSD (smooths display flickering). Does not affect alarm thresholds.                                                                                                                                                                                            |
| `vbat_sag_lpf_period`        | 2       | 1–255                        | LPF period for battery sag compensation voltage measurement. Lower = faster response to sag.                                                                                                                                                                                                           |
| `vbat_cutoff_percent`        | 100     | 0–100                        | Percentage of `vbat_sag_compensation` to apply at critically low voltage.                                                                                                                                                                                                                              |
| `vbat_sag_compensation`      | 0       | 0–150 (profile)              | Compensates for battery voltage sag to maintain consistent PID authority and throttle output across a pack. **90% is a good target** — avoids stressing the pack at low voltage while still providing consistency. Requires cell voltage monitoring; configure a low-voltage OSD warning when enabled. |
| `bat_capacity`               | 0       | 0–20000                      | Battery capacity in mAh. Used with current meter to estimate remaining charge.                                                                                                                                                                                                                         |
| `use_vbat_alerts`            | ON      | OFF, ON                      | Enable voltage-based OSD/beeper warnings.                                                                                                                                                                                                                                                              |
| `use_cbat_alerts`            | OFF     | OFF, ON                      | Enable capacity-based OSD/beeper warnings.                                                                                                                                                                                                                                                             |
| `cbat_alert_percent`         | 10      | 0–100                        | Remaining capacity percentage to trigger a battery alert.                                                                                                                                                                                                                                              |
| `report_cell_voltage`        | OFF     | OFF, ON                      | Report per-cell voltage (total / cell count) instead of pack voltage in telemetry.                                                                                                                                                                                                                     |
| `current_meter`              | ADC     | NONE, ADC, VIRTUAL, ESC, MSP | Current sensor source. ADC = onboard shunt. ESC = ESC telemetry current.                                                                                                                                                                                                                               |
| `ibata_scale`                | 558     | −16000–16000                 | ADC current sensor scale factor (mV/A × 10). Calibrate against a known load.                                                                                                                                                                                                                           |
| `ibata_offset`               | 0       | −32000–32000                 | ADC current sensor offset in millivolts.                                                                                                                                                                                                                                                               |
| `ibatv_scale`                | 0       | −16000–16000                 | Virtual current sensor scale. _(Requires: `USE_VIRTUAL_CURRENT_METER`)_                                                                                                                                                                                                                                |
| `ibatv_offset`               | 0       | 0–16000                      | Virtual current sensor voltage offset. _(Requires: `USE_VIRTUAL_CURRENT_METER`)_                                                                                                                                                                                                                       |
| `ibat_lpf_period`            | 10      | 0–255                        | LPF period for the displayed current reading. Higher = smoother OSD current display.                                                                                                                                                                                                                   |

Also see:

- [Telemetry](/docs/wiki/guides/current/Telemetry)
- [ESC telemetry](/docs/wiki/guides/current/ESC-Telemetry)
- [Battery](/docs/wiki/guides/current/Battery)

---

### Blackbox

| Variable                      | Default  | Range / Values                 | Description                                                                                                                                                                     |
| ----------------------------- | -------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `blackbox_device`             | SPIFLASH | NONE, SPIFLASH, SDCARD, SERIAL | Logging destination. SPIFLASH = onboard flash. SDCARD = SD card. SERIAL = via serial port (high baud rate required).                                                            |
| `blackbox_sample_rate`        | 1/4      | 1/1, 1/2, 1/4, 1/8, 1/16       | Fraction of gyro samples logged. **Target: half the gyro update frequency, minimum 1kHz.** At 8kHz gyro: use 1/8 → 1kHz. At 3.2kHz gyro: use 1/2 → 1.6kHz. Finer = larger logs. |
| `blackbox_mode`               | NORMAL   | NORMAL, MOTOR_TEST, ALWAYS     | NORMAL = log only when armed. ALWAYS = log even when disarmed. MOTOR_TEST = motor test mode.                                                                                    |
| `blackbox_high_resolution`    | OFF      | OFF, ON                        | Double the data precision for gyro and setpoint fields. Increases log size.                                                                                                     |
| `blackbox_disable_pids`       | OFF      | OFF, ON                        | Exclude PID data from logs. Reduces log size.                                                                                                                                   |
| `blackbox_disable_rc`         | OFF      | OFF, ON                        | Exclude RC channel data from logs.                                                                                                                                              |
| `blackbox_disable_setpoint`   | OFF      | OFF, ON                        | Exclude setpoint data.                                                                                                                                                          |
| `blackbox_disable_bat`        | OFF      | OFF, ON                        | Exclude battery data.                                                                                                                                                           |
| `blackbox_disable_alt`        | OFF      | OFF, ON                        | Exclude altitude data.                                                                                                                                                          |
| `blackbox_disable_rssi`       | OFF      | OFF, ON                        | Exclude RSSI data.                                                                                                                                                              |
| `blackbox_disable_gyro`       | OFF      | OFF, ON                        | Exclude filtered gyro data.                                                                                                                                                     |
| `blackbox_disable_gyrounfilt` | OFF      | OFF, ON                        | Exclude unfiltered gyro data.                                                                                                                                                   |
| `blackbox_disable_acc`        | OFF      | OFF, ON                        | Exclude accelerometer data.                                                                                                                                                     |
| `blackbox_disable_debug`      | OFF      | OFF, ON                        | Exclude debug fields.                                                                                                                                                           |
| `blackbox_disable_motors`     | OFF      | OFF, ON                        | Exclude motor output data.                                                                                                                                                      |
| `blackbox_disable_rpm`        | OFF      | OFF, ON                        | Exclude RPM telemetry data. _(Requires: `USE_DSHOT_TELEMETRY`)_                                                                                                                 |
| `blackbox_disable_gps`        | OFF      | OFF, ON                        | Exclude GPS data. _(Requires: `USE_GPS`)_                                                                                                                                       |
| `blackbox_disable_attitude`   | OFF      | OFF, ON                        | Exclude attitude (roll/pitch/yaw angle) data from logs.                                                                                                                         |
| `blackbox_disable_servos`     | OFF      | OFF, ON                        | Exclude servo output data from logs. _(Requires: `USE_SERVOS`)_                                                                                                                 |

Also see:

- [Blackbox](/docs/wiki/guides/current/Black-Box-logging-and-usage)

---

### Failsafe

Always use FC-based failsafe (configure receiver to send **no data** on signal loss — not fixed values). Receiver-based failsafe is not recommended; the FC cannot detect it.

| Variable                      | Default    | Range / Values              | Description                                                                                                                                                                                                                                                |
| ----------------------------- | ---------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `failsafe_procedure`          | DROP       | AUTO-LAND, DROP, GPS-RESCUE | Stage 2 procedure. **DROP** = immediate motor cut and disarm (default, safest for racing). **AUTO-LAND** = fixed throttle + centered sticks for `failsafe_landing_time` then disarm. **GPS-RESCUE** = autonomous return-to-home.                           |
| `failsafe_delay`              | 15 (1.5 s) | 1–200 (deciseconds)         | Stage 1 guard duration — time from confirmed signal loss to Stage 2 activation. Default 15 = 1.5 s. Minimum safe value is 2 (200 ms).                                                                                                                      |
| `failsafe_landing_time`       | 60 (6 s)   | 0–250 (deciseconds)         | Duration of Landing Mode (AUTO-LAND) Stage 2.                                                                                                                                                                                                              |
| `failsafe_throttle`           | 1000       | 750–2250                    | Throttle value applied during Landing Mode Stage 2 AND used as the Stage 1 fallback throttle if configured. **Default 1000 = motors off.** For GPS Rescue: must be set to a hover throttle value, or the quad drops in Stage 1 before Rescue can activate. |
| `failsafe_switch_mode`        | STAGE1     | STAGE1, KILL, STAGE2        | Aux switch behavior: STAGE1 = simulates signal loss (useful for testing and as a panic switch), STAGE2 = skips Stage 1 (instant GPS rescue / drop), KILL = instant disarm (dangerous, any glitch crashes the quad).                                        |
| `failsafe_recovery_delay`     | 5 (0.5 s)  | 1–200 (deciseconds)         | Duration the signal must be stable after Stage 2 before the pilot can re-arm or (for GPS Rescue) before stick inputs are assessed.                                                                                                                         |
| `failsafe_stick_threshold`    | 30         | 0–50                        | Stick deflection (degrees from center) required to exit GPS Rescue Stage 2 after signal recovery. Move sticks to this threshold once video returns and RXLOSS clears.                                                                                      |
| `failsafe_throttle_low_delay` | 100 (10 s) | 0–300 (deciseconds)         | If throttle has been low for this duration before Stage 2 triggers, the FC immediately disarms instead of activating Landing Mode (the "Just Drop" override). Protects pilots who power off their transmitter after landing without disarming.             |

Also see:

- [Failsafe](/docs/wiki/guides/current/Failsafe)

---

### GPS Rescue

Prerequisites: GPS module (UBlox M8N minimum, M10 recommended), calibrated accelerometer, verified angle mode leveling, minimum satellites before arming, home point established before flight.

| Variable                              | Default               | Range / Values                               | Description                                                                                                                                                                                                                                                  |
| ------------------------------------- | --------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `gps_rescue_initial_climb`            | 10                    | 0–100 m                                      | Altitude to climb from current position before heading home. Set high enough to clear local obstacles.                                                                                                                                                       |
| `gps_rescue_return_alt`               | 30                    | 0–150 m                                      | Target return cruise altitude. If the quad is already above this, it maintains current altitude.                                                                                                                                                             |
| `gps_rescue_alt_mode`                 | MAX_ALT               | MAX_ALT, FIXED_ALT, CURRENT_ALT              | MAX_ALT = use the higher of `gps_rescue_initial_climb` or max altitude recorded + 15 m. FIXED_ALT = always return to `gps_rescue_initial_climb`. CURRENT_ALT = hold current altitude (not recommended).                                                      |
| `gps_rescue_ascend_rate`              | 750                   | 100–2500 cm/s                                | Climb rate during initial climb phase.                                                                                                                                                                                                                       |
| `gps_rescue_descend_rate`             | 150                   | 100–500 cm/s                                 | Descent rate when approaching home.                                                                                                                                                                                                                          |
| `gps_rescue_ground_speed`             | 750                   | 10–3000 cm/s                                 | Forward speed during return (cm/s). 750 ≈ 27 km/h. Reduce for reliability in windy conditions.                                                                                                                                                               |
| `gps_rescue_max_angle`                | 45                    | 0–60 deg                                     | Maximum tilt angle allowed during return. Higher allows faster flight but makes altitude control harder. Raise for headwinds.                                                                                                                                |
| `gps_rescue_descent_dist`             | 20                    | 5–200 m                                      | Distance from home at which descent begins.                                                                                                                                                                                                                  |
| `gps_rescue_min_start_dist`           | 15                    | 10–3000 m                                    | Minimum distance from home to activate rescue. Closer than this → disarm and drop (prevents accidental rescue activation nearby).                                                                                                                            |
| `gps_rescue_min_sats`                 | 8                     | 5–50                                         | Minimum satellite count required to arm with GPS rescue configured. OSD shows `RESCUE N/A` if below this.                                                                                                                                                    |
| `gps_rescue_sanity_checks`            | RESCUE_SANITY_FS_ONLY | RESCUE_SANITY_ON, RESCUE_SANITY_FS_ONLY, OFF | **Strongly recommended: RESCUE_SANITY_ON.** Aborts rescue (disarms) if: GPS lost, fix invalid, quad crashed, sat count drops, or quad not approaching home.                                                                                                  |
| `gps_rescue_allow_arming_without_fix` | OFF                   | OFF, ON                                      | Allow arming without a GPS fix. GPS rescue is unavailable during such a flight — OSD shows `RESCUE OFF`.                                                                                                                                                     |
| `gps_rescue_use_mag`                  | ON                    | OFF, ON                                      | Use magnetometer for heading during rescue. **Only enable if the mag reading has been verified accurate** (compare with phone compass; both must agree within 10°). An incorrect mag causes flyaways. _(Requires: `USE_GPS` + `USE_GPS_RESCUE` + `USE_MAG`)_ |
| `gps_rescue_velocity_p`               | 8                     | 0–250                                        | Velocity controller P gain (forward speed regulation).                                                                                                                                                                                                       |
| `gps_rescue_velocity_i`               | 40                    | 0–250                                        | Velocity controller I gain.                                                                                                                                                                                                                                  |
| `gps_rescue_velocity_d`               | 12                    | 0–250                                        | Velocity controller D gain.                                                                                                                                                                                                                                  |
| `gps_rescue_yaw_p`                    | 20                    | 0–250                                        | Yaw P gain during rescue (heading correction).                                                                                                                                                                                                               |
| `gps_rescue_imu_yaw_gain`             | 10                    | 0–250                                        | Aggressiveness of IMU heading correction during rescue. Reduce if heading oscillates.                                                                                                                                                                        |
| `gps_rescue_roll_mix`                 | 150                   | 0–250                                        | Mix of roll vs yaw for lateral correction during approach.                                                                                                                                                                                                   |
| `gps_rescue_pitch_cutoff`             | 75                    | 10–250                                       | Smoothing cutoff for pitch D term during rescue.                                                                                                                                                                                                             |
| `gps_rescue_disarm_threshold`         | 20                    | 0–100                                        | Impact detection threshold for auto-disarm on landing. Lower = more sensitive.                                                                                                                                                                               |

Also see:

- [GPS](/docs/development/Gps)
- [GPS Rescue](/docs/wiki/guides/current/GPS-Rescue-v4-5)

---

### GPS Settings

| Variable                   | Default     | Range / Values                                                                              | Description                                                                                                                                             |
| -------------------------- | ----------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `gps_provider`             | UBLOX       | NMEA, UBLOX, MSP, VIRTUAL                                                                   | GPS protocol. Prefer UBLOX for UBlox modules — significantly more reliable than NMEA.                                                                   |
| `gps_auto_config`          | ON          | OFF, ON                                                                                     | Automatically configure UBlox modules on connection (baud rate, update rate, message types). Leave ON unless you pre-configure the module with uCenter. |
| `gps_auto_baud`            | OFF         | OFF, ON                                                                                     | Automatically detect GPS baud rate.                                                                                                                     |
| `gps_update_rate_hz`       | 10          | 1–20                                                                                        | Target GPS update rate. 10 Hz recommended for GPS rescue. Reduce to 1–2 Hz if not using GPS rescue (reduces CPU load, may allow 8k8k on some boards).   |
| `gps_sbas_mode`            | NONE        | AUTO, EGNOS, WAAS, MSAS, GAGAN, NONE                                                        | SBAS (satellite correction) system for the region.                                                                                                      |
| `gps_ublox_use_galileo`    | OFF         | OFF, ON                                                                                     | Enable Galileo constellation on UBlox modules.                                                                                                          |
| `gps_ublox_acquire_model`  | STATIONARY  | PORTABLE, STATIONARY, PEDESTRIAN, AUTOMOTIVE, AT_SEA, AIRBORNE_1G, AIRBORNE_2G, AIRBORNE_4G | UBlox dynamic model used while acquiring fix.                                                                                                           |
| `gps_ublox_flight_model`   | AIRBORNE_4G | PORTABLE, STATIONARY, PEDESTRIAN, AUTOMOTIVE, AT_SEA, AIRBORNE_1G, AIRBORNE_2G, AIRBORNE_4G | UBlox dynamic model used during flight. AIRBORNE_4G handles high-dynamics FPV.                                                                          |
| `gps_set_home_point_once`  | OFF         | OFF, ON                                                                                     | Only set the home point on the first arm after battery connect. Prevents home being reset if you disarm and re-arm mid-field.                           |
| `gps_use_3d_speed`         | OFF         | OFF, ON                                                                                     | Use 3D speed (including vertical) for GPS speed display.                                                                                                |
| `gps_sbas_integrity`       | OFF         | OFF, ON                                                                                     | Require SBAS integrity data before using SBAS corrections.                                                                                              |
| `gps_nmea_custom_commands` | —           | string (1–64)                                                                               | Custom NMEA sentences to send to the GPS module on init (NMEA provider only).                                                                           |
| `gps_ublox_utc_standard`   | AUTO        | AUTO, USNO, EU, SU, NTSC                                                                    | UTC time standard to configure on UBlox modules.                                                                                                        |

Also see:

- [GPS](/docs/development/Gps)

---

### System & Debug

| Variable                                      | Default | Range / Values                                                                                                                                                                                                        | Description                                                                                                                                                                                                                                                                                                                                                                       |
| --------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `debug_mode`                                  | NONE    | NONE, GYRO_SCALED, FFT, FFT_TIME, FFT_FREQ, GYRO_FILTERED, D_MAX, DYN_IDLE, ITERM_RELAX, FEEDFORWARD, RC_SMOOTHING, DSHOT_RPM_TELEMETRY, RPM_FILTER, GPS_RESCUE_VELOCITY, GPS_RESCUE_HEADING, FAILSAFE, … (many more) | Select which internal signals are exposed in blackbox debug fields. Key modes: **FFT_FREQ** (filter frequency analysis), **FFT_TIME** (FFT time-domain), **FFT** (general FFT), **GYRO_SCALED** (raw gyro, filter tuning), **D_MAX** (dynamic damping), **DYN_IDLE** (dynamic idle), **ITERM_RELAX** (I-term relax), **FEEDFORWARD** (FF signals), **FAILSAFE** (failsafe state). |
| `task_statistics`                             | ON      | OFF, ON                                                                                                                                                                                                               | Enables CPU task profiling visible via `tasks` CLI command. Turn OFF to reduce overhead on heavily loaded systems.                                                                                                                                                                                                                                                                |
| `cpu_overclock`                               | OFF     | OFF, 192MHZ, 216MHZ, 240MHZ                                                                                                                                                                                           | Overclock the STM32 F7 processor. Use only if CPU load is too high and the board supports it.                                                                                                                                                                                                                                                                                     |
| `pwr_on_arm_grace`                            | 5       | 0–30 s                                                                                                                                                                                                                | Grace period after power-on during which arming is blocked (prevents arming before receiver binds).                                                                                                                                                                                                                                                                               |
| `serial_update_rate_hz`                       | 100     | 100–2000                                                                                                                                                                                                              | Rate at which MSP/CLI serial output is processed.                                                                                                                                                                                                                                                                                                                                 |
| `reboot_character`                            | 82      | 48–126                                                                                                                                                                                                                | ASCII character that triggers a reboot when sent to the FC (default: 'R').                                                                                                                                                                                                                                                                                                        |
| `scheduler_relax_rx`                          | 25      | 0–500 μs                                                                                                                                                                                                              | Scheduler relaxation time for RX task. Controls how much other tasks can run during RX processing.                                                                                                                                                                                                                                                                                |
| `scheduler_relax_osd`                         | 25      | 0–500 μs                                                                                                                                                                                                              | Scheduler relaxation time for OSD task.                                                                                                                                                                                                                                                                                                                                           |
| `align_board_roll`                            | 0       | −180–360                                                                                                                                                                                                              | Board rotation offset in roll (degrees). For non-standard FC mounting orientations.                                                                                                                                                                                                                                                                                               |
| `align_board_pitch`                           | 0       | −180–360                                                                                                                                                                                                              | Board rotation offset in pitch.                                                                                                                                                                                                                                                                                                                                                   |
| `align_board_yaw`                             | 45      | −180–360                                                                                                                                                                                                              | Board rotation offset in yaw (degrees). For non-standard FC mounting orientations.                                                                                                                                                                                                                                                                                                |
| `mag_declination`                             | 0       | −18000–18000 (hundredths of degrees)                                                                                                                                                                                  | Magnetic declination correction for your location. Find at ngdc.noaa.gov/geomag/calculators. _(Requires: `USE_MAG`)_                                                                                                                                                                                                                                                              |
| `rate_6pos_switch`                            | OFF     | OFF, ON                                                                                                                                                                                                               | Enable 6-position rate profile selection via an AUX channel.                                                                                                                                                                                                                                                                                                                      |
| `enable_stick_arming`                         | OFF     | OFF, ON                                                                                                                                                                                                               | Enable stick-combination arming (throttle-down/yaw-right). Disable if using a dedicated arm switch.                                                                                                                                                                                                                                                                               |
| `runaway_takeoff_prevention`                  | ON      | OFF, ON                                                                                                                                                                                                               | Detects uncommanded throttle-up on arm and disarms to prevent injury.                                                                                                                                                                                                                                                                                                             |
| `runaway_takeoff_deactivate_delay`            | 500     | 100–1000 ms                                                                                                                                                                                                           | Time after arming before runaway takeoff protection stops monitoring.                                                                                                                                                                                                                                                                                                             |
| `runaway_takeoff_deactivate_throttle_percent` | 20      | 0–100                                                                                                                                                                                                                 | Throttle percentage above which the pilot's intent is clear and runaway protection deactivates.                                                                                                                                                                                                                                                                                   |
| `cpu_late_limit_permille`                     | 10      | 0–100                                                                                                                                                                                                                 | CPU late task limit in permille (per-thousand). Controls scheduler behaviour when tasks are running late. _(Requires: `USE_LATE_TASK_STATISTICS`)_                                                                                                                                                                                                                                |
| `scheduler_debug_task`                        | 0       | 0–36                                                                                                                                                                                                                  | Task index to expose in scheduler debug output. Used for per-task timing analysis.                                                                                                                                                                                                                                                                                                |
| `mco2_on_pc9`                                 | OFF     | OFF, ON                                                                                                                                                                                                               | Output MCO2 clock signal on PC9 pin (STM32 specific). Advanced hardware debugging only.                                                                                                                                                                                                                                                                                           |
| `system_hse_mhz`                              | 0       | 0–30                                                                                                                                                                                                                  | External crystal frequency in MHz. Set to 0 for auto-detect. Required for some non-standard clock speeds.                                                                                                                                                                                                                                                                         |

---

### Board & Hardware

| Variable                        | Default         | Range / Values                                                                  | Description                                                                                        |
| ------------------------------- | --------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `acc_hardware`                  | AUTO            | AUTO, NONE, MPU6050, MPU6000, MPU6500, … (see `get acc_hardware` for full list) | Force accelerometer driver or AUTO-detect.                                                         |
| `baro_hardware`                 | AUTO            | AUTO, NONE, BMP085, MS5611, BMP280, BMP388, DPS310, …                           | Force barometer driver or AUTO-detect. _(Requires: `USE_BARO`)_                                    |
| `baro_bustype`                  | SPI             | NONE, I2C, SPI, SLAVE                                                           | Barometer bus type. _(Requires: `USE_BARO`)_                                                       |
| `baro_spi_device`               | 2               | 0–5                                                                             | SPI bus number for barometer. _(Requires: `USE_BARO`)_                                             |
| `baro_i2c_device`               | 0               | 0–5                                                                             | I2C bus number for barometer (0 = default). _(Requires: `USE_BARO`)_                               |
| `baro_i2c_address`              | 0               | 0–119                                                                           | I2C address override for barometer (0 = default auto-detect). _(Requires: `USE_BARO`)_             |
| `mag_hardware`                  | NONE            | NONE, AUTO, HMC5883, QMC5883, …                                                 | Magnetometer hardware selection. NONE = disabled. _(Requires: `USE_MAG`)_                          |
| `align_mag`                     | DEFAULT         | DEFAULT, CW0, CW90, CW180, CW270, CW0FLIP, …                                    | Magnetometer orientation. _(Requires: `USE_MAG`)_                                                  |
| `altitude_source`               | DEFAULT         | DEFAULT, BARO_ONLY, GPS_ONLY                                                    | Override altitude data source for autopilot and OSD altitude display.                              |
| `altitude_prefer_baro`          | 100             | 0–100                                                                           | Weight given to barometer vs GPS altitude when both are available (0 = GPS only, 100 = baro only). |
| `altitude_lpf`                  | 300             | 10–1000                                                                         | Low-pass filter cutoff (Hz×10) for altitude estimate. Lower = smoother but laggier altitude.       |
| `altitude_d_lpf`                | 100             | 10–1000                                                                         | Low-pass filter cutoff (Hz×10) for altitude derivative (vertical speed).                           |
| `adc_device`                    | 2               | 0–3                                                                             | ADC device used for voltage/current sensing.                                                       |
| `adc_tempsensor_calibration30`  | 0               | 0–2000                                                                          | ADC temperature sensor calibration value at 30°C (factory calibration).                            |
| `adc_tempsensor_calibration110` | 0               | 0–2000                                                                          | ADC temperature sensor calibration value at 110°C (factory calibration).                           |
| `adc_vrefint_calibration`       | 0               | 0–2000                                                                          | ADC internal voltage reference calibration (factory).                                              |
| `flash_spi_bus`                 | 3               | 0–3                                                                             | SPI bus number for onboard flash (blackbox storage). _(Requires: `USE_FLASH_SPI`)_                 |
| `i2c1_clockspeed_khz`           | 800             | 100–1300                                                                        | I2C bus 1 clock speed in kHz. _(Requires: `USE_I2C_DEVICE_1`)_                                     |
| `i2c1_pullup`                   | OFF             | OFF, ON                                                                         | Enable internal pull-up resistors on I2C bus 1. _(Requires: `USE_I2C_DEVICE_1`)_                   |
| `i2c2_clockspeed_khz`           | 800             | 100–1300                                                                        | I2C bus 2 clock speed in kHz. _(Requires: `USE_I2C_DEVICE_2`)_                                     |
| `i2c2_pullup`                   | OFF             | OFF, ON                                                                         | Enable internal pull-up resistors on I2C bus 2. _(Requires: `USE_I2C_DEVICE_2`)_                   |
| `i2c3_clockspeed_khz`           | 800             | 100–1300                                                                        | I2C bus 3 clock speed in kHz. _(Requires: `USE_I2C_DEVICE_3`)_                                     |
| `i2c3_pullup`                   | OFF             | OFF, ON                                                                         | Enable internal pull-up resistors on I2C bus 3. _(Requires: `USE_I2C_DEVICE_3`)_                   |
| `usb_hid_cdc`                   | OFF             | OFF, ON                                                                         | Use USB HID (combined HID + CDC) instead of pure CDC. Required for some OTG hosts.                 |
| `usb_msc_pin_pullup`            | ON              | OFF, ON                                                                         | Enable pull-up on USB MSC detect pin.                                                              |
| `pinio_box`                     | 255,255,255,255 | Array of 4                                                                      | AUX box assignments for the 4 PINIO outputs (255 = disabled).                                      |
| `pinio_config`                  | 1,1,1,1         | Array of 4                                                                      | PINIO output configuration (active-high/low, open-drain, etc.).                                    |
| `serialmsp_halfduplex`          | OFF             | OFF, ON                                                                         | Enable half-duplex operation on MSP serial ports.                                                  |

---

### Identity & Profile Names

| Variable                  | Default         | Range / Values                | Description                                                                                                 |
| ------------------------- | --------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `craft_name`              | —               | string (1–16)                 | Display name of the craft shown in OSD and Configurator.                                                    |
| `pilot_name`              | —               | string (1–16)                 | Pilot name shown in OSD.                                                                                    |
| `profile_name`            | —               | string (1–8, per profile)     | Name for the active PID profile. Shown in OSD profile display.                                              |
| `rateprofile_name`        | —               | string (1–8, per rateprofile) | Name for the active rate profile.                                                                           |
| `box_user_1_name`         | —               | string (1–16)                 | Name for user-defined AUX box 1 (USER1).                                                                    |
| `box_user_2_name`         | —               | string (1–16)                 | Name for user-defined AUX box 2 (USER2).                                                                    |
| `box_user_3_name`         | —               | string (1–16)                 | Name for user-defined AUX box 3 (USER3).                                                                    |
| `box_user_4_name`         | —               | string (1–16)                 | Name for user-defined AUX box 4 (USER4).                                                                    |
| `auto_profile_cell_count` | 0 (per profile) | -1–8                          | Automatically activate this PID profile when the detected cell count matches. 0 = disabled. -1 = match any. |

---

### Crash Recovery

Crash recovery detects an uncontrolled crash and attempts to recover. Disabled by default.

| Variable                   | Default           | Range / Values        | Description                                                                   |
| -------------------------- | ----------------- | --------------------- | ----------------------------------------------------------------------------- |
| `crash_recovery`           | OFF (per profile) | OFF, ON, BEEP, DISARM | Enable crash recovery. BEEP = recover and beep; DISARM = recover then disarm. |
| `crash_delay`              | 0 (per profile)   | 0–500 ms              | Delay after arm before crash detection is armed.                              |
| `crash_time`               | 500 (per profile) | 100–5000 ms           | Minimum crash duration before recovery triggers.                              |
| `crash_dthreshold`         | 50 (per profile)  | 10–2000               | D-term threshold above which crash is detected (deg/s2).                      |
| `crash_gthreshold`         | 400 (per profile) | 100–2000              | Gyro rate threshold for crash detection (deg/s).                              |
| `crash_setpoint_threshold` | 350 (per profile) | 50–2000               | Setpoint threshold for crash detection.                                       |
| `crash_limit_yaw`          | 200 (per profile) | 0–1000                | Yaw rate limit during crash recovery (deg/s).                                 |
| `crash_recovery_angle`     | 10 (per profile)  | 5–30 deg              | Maximum recovery correction angle (degrees).                                  |
| `crash_recovery_rate`      | 100 (per profile) | 50–255 deg/s          | Rate at which the FC tries to recover from a crash.                           |
| `crashflip_motor_percent`  | 0                 | 0–100                 | Motor output percentage during crash flip / turtle mode. 0 = full power.      |
| `crashflip_rate`           | 0                 | 0–250                 | Rotation rate limit during crash flip mode (degrees/s). 0 = unlimited.        |
| `crashflip_auto_rearm`     | OFF               | OFF, ON               | Automatically re-arm after a successful crash flip recovery.                  |

---

### EZ Landing

EZ Landing provides a simple automatic landing assist that gradually reduces throttle as the craft descends.

| Variable               | Default          | Range / Values | Description                                           |
| ---------------------- | ---------------- | -------------- | ----------------------------------------------------- |
| `ez_landing_threshold` | 25 (per profile) | 0–200          | Throttle percentage below which EZ landing activates. |
| `ez_landing_limit`     | 15 (per profile) | 0–75           | Minimum throttle floor enforced by EZ landing (%).    |
| `ez_landing_speed`     | 50 (per profile) | 0–250          | Rate at which throttle is reduced during EZ landing.  |

---

### SPA — Setpoint Process Attenuation

SPA reduces P and D gains based on the magnitude of the setpoint (stick input), preventing oscillations during fast flips while maintaining full authority at stick centre. Profile-scoped.

| Variable           | Default           | Range / Values                     | Description                                                                                                                  |
| ------------------ | ----------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `spa_roll_mode`    | OFF (per profile) | OFF, I_FREEZE, I, PID, PD_I_FREEZE | SPA mode for roll. I = scale I term; PID = scale all terms; PD*I_FREEZE = scale P and D, freeze I. *(Requires: `USE_WING`)\_ |
| `spa_roll_center`  | 0 (per profile)   | 0–65535                            | Setpoint centre value at which no attenuation is applied (roll). _(Requires: `USE_WING`)_                                    |
| `spa_roll_width`   | 0 (per profile)   | 0–65535                            | Setpoint range over which attenuation ramps from 0 to full (roll). _(Requires: `USE_WING`)_                                  |
| `spa_pitch_mode`   | OFF (per profile) | OFF, I_FREEZE, I, PID, PD_I_FREEZE | SPA mode for pitch. _(Requires: `USE_WING`)_                                                                                 |
| `spa_pitch_center` | 0 (per profile)   | 0–65535                            | Setpoint centre value for pitch SPA. _(Requires: `USE_WING`)_                                                                |
| `spa_pitch_width`  | 0 (per profile)   | 0–65535                            | Setpoint width for pitch SPA attenuation ramp. _(Requires: `USE_WING`)_                                                      |
| `spa_yaw_mode`     | OFF (per profile) | OFF, I_FREEZE, I, PID, PD_I_FREEZE | SPA mode for yaw. _(Requires: `USE_WING`)_                                                                                   |
| `spa_yaw_center`   | 0 (per profile)   | 0–65535                            | Setpoint centre value for yaw SPA. _(Requires: `USE_WING`)_                                                                  |
| `spa_yaw_width`    | 0 (per profile)   | 0–65535                            | Setpoint width for yaw SPA attenuation ramp. _(Requires: `USE_WING`)_                                                        |

---

### Beeper

| Variable                   | Default | Range / Values | Description                                                                                                      |
| -------------------------- | ------- | -------------- | ---------------------------------------------------------------------------------------------------------------- |
| `beeper_inversion`         | OFF     | OFF, ON        | Invert beeper signal (active-low vs active-high). _(Requires: `USE_BEEPER`)_                                     |
| `beeper_od`                | ON      | OFF, ON        | Open-drain beeper output mode. ON = open-drain (requires external pull-up). _(Requires: `USE_BEEPER`)_           |
| `beeper_frequency`         | 0       | 0–16000 Hz     | PWM frequency for brushless beeper. 0 = use default ESC beep tone. _(Requires: `USE_BEEPER`)_                    |
| `beeper_dshot_beacon_tone` | 1       | 1–5            | DSHOT ESC beacon tone index for motor-based beeper (arming/lost model). _(Requires: `USE_BEEPER` + `USE_DSHOT`)_ |

---

### VTX (Video Transmitter)

| Variable               | Default | Range / Values           | Description                                                                                            |
| ---------------------- | ------- | ------------------------ | ------------------------------------------------------------------------------------------------------ |
| `vtx_band`             | 0       | 0–8                      | VTX frequency band (0 = unset/use vtx_freq).                                                           |
| `vtx_channel`          | 0       | 0–8                      | VTX channel within the selected band.                                                                  |
| `vtx_freq`             | 0       | 0–5999 MHz               | VTX frequency in MHz. Used when vtx_band = 0.                                                          |
| `vtx_power`            | 0       | 0–7                      | VTX power level index (0 = minimum). Actual power depends on VTX table.                                |
| `vtx_low_power_disarm` | OFF     | OFF, ON, UNTIL_FIRST_ARM | Switch to lowest power level when disarmed. UNTIL_FIRST_ARM = low power until first arm after connect. |
| `vtx_pit_mode_freq`    | 0       | 0–5999 MHz               | Frequency to use in pit mode.                                                                          |
| `vtx_halfduplex`       | ON      | OFF, ON                  | VTX communication in half-duplex (SmartAudio/Tramp).                                                   |
| `vtx_softserial_alt`   | OFF     | OFF, ON                  | Use alternate pin assignment for soft-serial VTX.                                                      |
| `vtx_spi_bus`          | 0       | 0–3                      | SPI bus for SPI-connected VTX (e.g. RTC6705).                                                          |
| `vcd_video_system`     | HD      | AUTO, PAL, NTSC, HD      | OSD video format. HD = digital systems (DJI, Walksnail, HDZero). AUTO detects analog.                  |
| `vcd_h_offset`         | 0       | -32–31                   | Horizontal offset for analog OSD character rendering.                                                  |
| `vcd_v_offset`         | 0       | -15–16                   | Vertical offset for analog OSD character rendering.                                                    |

---

### LED Strip

| Variable                       | Default | Range / Values                                                                                                            | Description                                                                                      |
| ------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `led_inversion`                | 0       | 0–7 (bitmask)                                                                                                             | Invert LED strip output signals (bitmask per-channel).                                           |
| `ledstrip_profile`             | STATUS  | RACE, BEACON, STATUS                                                                                                      | LED strip operating mode. STATUS = function-based; RACE = fixed color; BEACON = flashing beacon. |
| `ledstrip_race_color`          | ORANGE  | BLACK, WHITE, RED, ORANGE, YELLOW, LIME_GREEN, GREEN, MINT_GREEN, CYAN, LIGHT_BLUE, BLUE, DARK_VIOLET, MAGENTA, DEEP_PINK | Solid color used in RACE profile.                                                                |
| `ledstrip_beacon_color`        | WHITE   | (same color list)                                                                                                         | Color used for beacon flashes.                                                                   |
| `ledstrip_beacon_period_ms`    | 500     | 50–10000 ms                                                                                                               | Beacon flash period in milliseconds.                                                             |
| `ledstrip_beacon_percent`      | 50      | 0–100                                                                                                                     | Duty cycle (on-time percentage) of the beacon flash.                                             |
| `ledstrip_beacon_armed_only`   | OFF     | OFF, ON                                                                                                                   | Only activate beacon when armed.                                                                 |
| `ledstrip_visual_beeper`       | OFF     | OFF, ON                                                                                                                   | Flash LEDs in sync with the beeper (visual alert).                                               |
| `ledstrip_visual_beeper_color` | WHITE   | (same color list)                                                                                                         | Color used for visual beeper flashes.                                                            |
| `ledstrip_grb_rgb`             | GRB     | GRB, RGB, GRBW                                                                                                            | LED strip color byte order. GRB is standard WS2812B; GRBW for RGBW strips.                       |
| `ledstrip_brightness`          | 100     | 5–100                                                                                                                     | Global brightness percentage for all LED modes.                                                  |
| `ledstrip_rainbow_delta`       | 0       | 0–359                                                                                                                     | Hue offset between consecutive LEDs in rainbow mode.                                             |
| `ledstrip_rainbow_freq`        | 120     | 1–2000                                                                                                                    | Rainbow animation speed (updates/second).                                                        |

Also see:

- [LED Strip](/docs/wiki/guides/current/LED-Strip-Functionality)

---

### Displayport & OSD Hardware

| Variable                           | Default | Range / Values        | Description                                                     |
| ---------------------------------- | ------- | --------------------- | --------------------------------------------------------------- |
| `displayport_max7456_blk`          | 0       | 0–3                   | MAX7456 black level (0 = darkest).                              |
| `displayport_max7456_wht`          | 2       | 0–3                   | MAX7456 white level (2 = standard).                             |
| `displayport_max7456_inv`          | OFF     | OFF, ON               | Invert MAX7456 video output.                                    |
| `displayport_max7456_row_adjust`   | 0       | -3–0                  | Row offset adjustment for MAX7456 character display.            |
| `displayport_max7456_col_adjust`   | 0       | -6–0                  | Column offset adjustment for MAX7456 character display.         |
| `displayport_msp_row_adjust`       | 0       | -3–0                  | Row offset for MSP displayport (DJI/HD OSD).                    |
| `displayport_msp_col_adjust`       | 0       | -6–0                  | Column offset for MSP displayport.                              |
| `displayport_msp_fonts`            | 0,1,2,3 | Array of 4            | Font indices for the 4 OSD profiles on MSP displayport systems. |
| `displayport_msp_use_device_blink` | OFF     | OFF, ON               | Use device-native blink for MSP OSD elements (DJI).             |
| `max7456_spi_bus`                  | 2       | 0–3                   | SPI bus for MAX7456 OSD chip.                                   |
| `max7456_clock`                    | NOMINAL | HALF, NOMINAL, DOUBLE | MAX7456 SPI clock speed. Use HALF if video glitches occur.      |
| `max7456_preinit_opu`              | OFF     | OFF, ON               | Pre-initialize MAX7456 OSD pixel output before flight.          |
| `dashboard_i2c_bus`                | 0       | 0–3                   | I2C bus for OLED dashboard display.                             |
| `dashboard_i2c_addr`               | 60      | 8–119                 | I2C address for OLED dashboard (default 0x3C = 60).             |

---

### OSD

OSD position variables encode the x/y position and enabled state in a single 16-bit value (bit 11 = enabled, bits 5–0 = column, bits 10–6 = row). Default 341 = disabled (bit pattern 0b0000000101010101). Use Betaflight Configurator OSD tab to set positions visually.

**OSD Settings**

| Variable                      | Default     | Range / Values                       | Description                                                                                      |
| ----------------------------- | ----------- | ------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `osd_displayport_device`      | MSP         | NONE, AUTO, MAX7456, MSP, FRSKYOSD   | OSD output device. MSP = digital HD systems (DJI, Walksnail, HDZero). MAX7456 = analog OSD chip. |
| `osd_units`                   | METRIC      | IMPERIAL, METRIC, BRITISH            | Unit system for OSD values (speed, distance, altitude).                                          |
| `osd_framerate_hz`            | 12          | 1–60 Hz                              | OSD update rate. Higher = smoother but more CPU load.                                            |
| `osd_profile`                 | 1           | 1–3                                  | Active OSD profile (layout). Switch profiles via AUX channel.                                    |
| `osd_profile_1_name`          | —           | string (1–16)                        | Name for OSD profile 1.                                                                          |
| `osd_profile_2_name`          | —           | string (1–16)                        | Name for OSD profile 2.                                                                          |
| `osd_profile_3_name`          | —           | string (1–16)                        | Name for OSD profile 3.                                                                          |
| `osd_use_quick_menu`          | ON          | OFF, ON                              | Enable quick-access OSD menu (single-click).                                                     |
| `osd_menu_background`         | TRANSPARENT | TRANSPARENT, BLACK, GRAY, LIGHT_GRAY | OSD menu background style.                                                                       |
| `osd_arming_logo`             | 0           | 0–3                                  | Logo displayed on arm. 0 = Betaflight logo.                                                      |
| `osd_craftname_msgs`          | OFF         | OFF, ON                              | Show craft name messages in OSD.                                                                 |
| `osd_logo_on_arming`          | OFF         | OFF, ON, FIRST_ARMING                | Display logo animation on arm. FIRST_ARMING = only on first arm after connect.                   |
| `osd_logo_on_arming_duration` | 5           | 5–50 (x0.1s)                         | Duration of arming logo animation.                                                               |
| `osd_show_spec_prearm`        | OFF         | OFF, ON                              | Show motor specs in pre-arm screen.                                                              |

**OSD Alarms**

| Variable                  | Default    | Range / Values | Description                                                                 |
| ------------------------- | ---------- | -------------- | --------------------------------------------------------------------------- |
| `osd_rssi_alarm`          | 20         | 0–100 %        | RSSI alarm threshold (%). Alert when RSSI drops below this.                 |
| `osd_rssi_dbm_alarm`      | -60        | -130–0 dBm     | RSSI dBm alarm threshold.                                                   |
| `osd_rsnr_alarm`          | 4          | -30–20 dB      | RSNR (RF signal-to-noise ratio) alarm threshold.                            |
| `osd_link_quality_alarm`  | 80         | 0–100 %        | Link quality alarm threshold (ELRS/CRSF).                                   |
| `osd_alt_alarm`           | 100        | 0–10000 m      | Altitude alarm threshold.                                                   |
| `osd_cap_alarm`           | 2200       | 0–20000 mAh    | Battery capacity consumed alarm threshold.                                  |
| `osd_distance_alarm`      | 0          | 0–65535 m      | Distance from home alarm (0 = disabled).                                    |
| `osd_esc_rpm_alarm`       | -1         | -1–32767 RPM   | ESC RPM alarm (-1 = disabled).                                              |
| `osd_esc_current_alarm`   | -1         | -1–32767 A     | ESC current alarm (-1 = disabled).                                          |
| `osd_esc_temp_alarm`      | 0          | 0–255 C        | ESC temperature alarm.                                                      |
| `osd_core_temp_alarm`     | 70         | 0–255 C        | FC core temperature alarm.                                                  |
| `osd_stat_bitmask`        | 1879062316 | 0–4294967295   | Bitmask of statistics shown on post-flight stats screen.                    |
| `osd_stat_avg_cell_value` | OFF        | OFF, ON        | Show average cell voltage (vs total pack) in post-flight stats.             |
| `osd_warn_bitmask`        | 397311     | 0–4294967295   | Bitmask of OSD warnings enabled (ARMING, FAIL_SAFE, BATTERY_WARNING, etc.). |

**OSD Timer Configuration**

| Variable   | Default | Range / Values | Description                                           |
| ---------- | ------- | -------------- | ----------------------------------------------------- |
| `osd_tim1` | 2560    | 0–32767        | Timer 1 configuration (source and precision encoded). |
| `osd_tim2` | 2561    | 0–32767        | Timer 2 configuration.                                |

**OSD Auxiliary & Camera**

| Variable                       | Default     | Range / Values                  | Description                                                        |
| ------------------------------ | ----------- | ------------------------------- | ------------------------------------------------------------------ |
| `osd_aux_channel`              | 1           | 1–18                            | RC channel to display as auxiliary OSD value.                      |
| `osd_aux_scale`                | 200         | 1–1000                          | Scale factor for AUX channel display.                              |
| `osd_aux_symbol`               | 65          | ASCII code                      | Symbol character used for AUX display (65 = A).                    |
| `osd_rcchannels`               | -1,-1,-1,-1 | Array of 4 (channel 1–18 or -1) | RC channels to display in OSD RC channels element (-1 = disabled). |
| `osd_stick_overlay_radio_mode` | 2           | 1–4                             | Radio mode for stick overlay display (Mode 1–4).                   |
| `osd_camera_frame_width`       | 24          | 2–30                            | Camera frame overlay width in characters.                          |
| `osd_camera_frame_height`      | 11          | 2–16                            | Camera frame overlay height in characters.                         |
| `osd_gps_sats_show_pdop`       | OFF         | OFF, ON                         | Show PDOP (position dilution of precision) next to sat count.      |
| `osd_ah_invert`                | OFF         | OFF, ON                         | Invert artificial horizon direction.                               |
| `osd_ah_max_pit`               | 20          | 0–90 deg                        | Maximum pitch shown on artificial horizon (degrees).               |
| `osd_ah_max_rol`               | 40          | 0–90 deg                        | Maximum roll shown on artificial horizon (degrees).                |

**OSD Position Variables** (all default 341 = disabled, range 0–65535)

| Variable                          | Description                     |
| --------------------------------- | ------------------------------- |
| `osd_rssi_pos`                    | RSSI (%)                        |
| `osd_rssi_dbm_pos`                | RSSI dBm                        |
| `osd_rsnr_pos`                    | RSNR                            |
| `osd_link_quality_pos`            | Link quality                    |
| `osd_link_tx_power_pos`           | TX power                        |
| `osd_vbat_pos`                    | Battery voltage                 |
| `osd_avg_cell_voltage_pos`        | Average cell voltage            |
| `osd_current_pos`                 | Current draw                    |
| `osd_power_pos`                   | Power (watts)                   |
| `osd_mah_drawn_pos`               | mAh consumed                    |
| `osd_wh_drawn_pos`                | Wh consumed                     |
| `osd_battery_usage_pos`           | Battery usage bar               |
| `osd_remaining_time_estimate_pos` | Estimated remaining flight time |
| `osd_efficiency_pos`              | Flight efficiency (mAh/km)      |
| `osd_altitude_pos`                | Altitude                        |
| `osd_nvario_pos`                  | Vertical speed (vario)          |
| `osd_nheading_pos`                | Compass heading                 |
| `osd_compass_bar_pos`             | Compass bar                     |
| `osd_gps_speed_pos`               | GPS speed                       |
| `osd_gps_sats_pos`                | GPS satellite count             |
| `osd_gps_lat_pos`                 | GPS latitude                    |
| `osd_gps_lon_pos`                 | GPS longitude                   |
| `osd_home_dist_pos`               | Distance to home                |
| `osd_home_dir_pos`                | Direction to home               |
| `osd_flight_dist_pos`             | Total flight distance           |
| `osd_lidar_dist_pos`              | Lidar distance                  |
| `osd_throttle_pos`                | Throttle percentage             |
| `osd_flymode_pos`                 | Flight mode                     |
| `osd_disarmed_pos`                | DISARMED indicator              |
| `osd_ready_mode_pos`              | Ready mode indicator            |
| `osd_crosshairs_pos`              | Crosshairs                      |
| `osd_ah_pos`                      | Artificial horizon              |
| `osd_ah_sbar_pos`                 | AH sidebars                     |
| `osd_up_down_reference_pos`       | Up/down reference               |
| `osd_pit_ang_pos`                 | Pitch angle                     |
| `osd_rol_ang_pos`                 | Roll angle                      |
| `osd_g_force_pos`                 | G-force                         |
| `osd_tim_1_pos`                   | Timer 1                         |
| `osd_tim_2_pos`                   | Timer 2                         |
| `osd_craft_name_pos`              | Craft name                      |
| `osd_pilot_name_pos`              | Pilot name                      |
| `osd_pid_roll_pos`                | Roll PID values                 |
| `osd_pid_pitch_pos`               | Pitch PID values                |
| `osd_pid_yaw_pos`                 | Yaw PID values                  |
| `osd_pidrate_profile_pos`         | PID/rate profile indicator      |
| `osd_pid_profile_name_pos`        | PID profile name                |
| `osd_rate_profile_name_pos`       | Rate profile name               |
| `osd_profile_name_pos`            | OSD profile name                |
| `osd_anti_gravity_pos`            | Anti-gravity indicator          |
| `osd_debug_pos`                   | Debug value 1                   |
| `osd_debug2_pos`                  | Debug value 2                   |
| `osd_esc_tmp_pos`                 | ESC temperature                 |
| `osd_esc_rpm_pos`                 | ESC RPM                         |
| `osd_esc_rpm_freq_pos`            | ESC RPM frequency               |
| `osd_core_temp_pos`               | FC core temperature             |
| `osd_vtx_channel_pos`             | VTX channel                     |
| `osd_flip_arrow_pos`              | Crash flip arrow                |
| `osd_log_status_pos`              | Blackbox log status             |
| `osd_motor_diag_pos`              | Motor diagnostics               |
| `osd_adjustment_range_pos`        | Adjustment range indicator      |
| `osd_rcchannels_pos`              | RC channels                     |
| `osd_stick_overlay_left_pos`      | Left stick overlay              |
| `osd_stick_overlay_right_pos`     | Right stick overlay             |
| `osd_aux_pos`                     | AUX channel value               |
| `osd_total_flights_pos`           | Total flight count              |
| `osd_rtc_date_time_pos`           | RTC date/time                   |
| `osd_warnings_pos`                | Warnings (default 14772)        |
| `osd_camera_frame_pos`            | Camera frame overlay            |
| `osd_sys_warnings_pos`            | System warnings                 |
| `osd_sys_lq_pos`                  | System link quality             |
| `osd_sys_bitrate_pos`             | System bitrate                  |
| `osd_sys_delay_pos`               | System delay                    |
| `osd_sys_distance_pos`            | System distance                 |
| `osd_sys_goggle_voltage_pos`      | Goggle voltage                  |
| `osd_sys_vtx_voltage_pos`         | VTX voltage                     |
| `osd_sys_vtx_temp_pos`            | VTX temperature                 |
| `osd_sys_fan_speed_pos`           | Fan speed                       |
| `osd_sys_goggle_dvr_pos`          | Goggle DVR indicator            |
| `osd_sys_vtx_dvr_pos`             | VTX DVR indicator               |

---

### Servo & Gimbal

| Variable             | Default | Range / Values            | Description                                                                                                    |
| -------------------- | ------- | ------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `servo_center_pulse` | 1500    | 750–2250 us               | Servo center pulse width. _(Requires: `USE_SERVOS`)_                                                           |
| `servo_pwm_rate`     | 50      | 50–498 Hz                 | Servo PWM update rate. 50 Hz = standard analog; 333+ Hz = digital. _(Requires: `USE_SERVOS`)_                  |
| `servo_lowpass_hz`   | 0       | 0–400 Hz                  | Low-pass filter cutoff for servo output smoothing (0 = disabled). _(Requires: `USE_SERVOS`)_                   |
| `tri_unarmed_servo`  | ON      | OFF, ON                   | Keep tail servo active when disarmed (tricopter). Prevents mechanical noise on arm. _(Requires: `USE_SERVOS`)_ |
| `thr_corr_angle`     | 800     | 1–900 (tenths of degrees) | Angle above which throttle correction activates (compensates for tilt-induced lift loss).                      |
| `thr_corr_value`     | 0       | 0–150                     | Throttle correction amount at maximum tilt. 0 = disabled.                                                      |
| `gimbal_mode`        | NORMAL  | NORMAL, MIXTILT           | Gimbal control mode for tricopter tail. _(Requires: `USE_SERVOS`)_                                             |
| `yaw_type`           | RUDDER  | RUDDER, DIFF_THRUST       | Yaw control type. DIFF*THRUST uses differential thrust (bicopter/differential). *(Requires: `USE_WING`)\_      |

---

### Telemetry

Telemetry is transmitted to the ground station/transmitter over a serial port. Each `telemetry_disabled_*` flag suppresses a specific sensor type from the telemetry stream.

Also see:

- [Telemetry](/docs/wiki/guides/current/Telemetry)
- [ESC telemetry](/docs/wiki/guides/current/ESC-Telemetry)

**Telemetry Serial Settings**

| Variable         | Default   | Range / Values | Description                                                                             |
| ---------------- | --------- | -------------- | --------------------------------------------------------------------------------------- |
| `tlm_halfduplex` | ON        | OFF, ON        | Telemetry in half-duplex mode (shared TX/RX pin). Required for FrSky S.Port and HoTT.   |
| `tlm_inverted`   | OFF       | OFF, ON        | Invert telemetry signal logic. Required for some protocols (e.g. FrSky on some wiring). |
| `hott_alarm_int` | 5         | 0–120 s        | HoTT alarm interval (seconds between repeated alerts). 0 = disabled.                    |
| `ibus_sensor`    | 1,2,3,0,… | Array of 15    | iBus sensor type assignments for 15 slots.                                              |

**FrSky Telemetry**

| Variable               | Default | Range / Values                       | Description                                                     |
| ---------------------- | ------- | ------------------------------------ | --------------------------------------------------------------- |
| `frsky_default_lat`    | 0       | -9000–9000 (hundredths of degrees)   | Default GPS latitude when no fix (for FrSky GPS display).       |
| `frsky_default_long`   | 0       | -18000–18000 (hundredths of degrees) | Default GPS longitude when no fix.                              |
| `frsky_gps_format`     | 0       | 0–1                                  | GPS coordinate format for FrSky (0 = decimal degrees, 1 = DMS). |
| `frsky_unit`           | METRIC  | IMPERIAL, METRIC, BRITISH            | Unit system for FrSky telemetry values.                         |
| `frsky_vfas_precision` | 0       | 0–1                                  | FrSky VFAS voltage precision (0 = 0.2V, 1 = 0.1V).              |

**MAVLink Telemetry**

| Variable                         | Default | Range / Values | Description                                                                        |
| -------------------------------- | ------- | -------------- | ---------------------------------------------------------------------------------- |
| `mavlink_min_txbuff`             | 35      | 1–100 %        | Minimum TX buffer level required before sending MAVLink messages.                  |
| `mavlink_mah_as_heading_divisor` | 0       | 0–30000        | Encode mAh as heading by dividing by this value. 0 = disabled (send real heading). |

**Disabled Telemetry Sensors** (each ON flag suppresses that data from the telemetry stream)

| Variable                             | Default | Description            |
| ------------------------------------ | ------- | ---------------------- |
| `telemetry_disabled_voltage`         | OFF     | Battery voltage        |
| `telemetry_disabled_current`         | OFF     | Current draw           |
| `telemetry_disabled_fuel`            | OFF     | Fuel (capacity used)   |
| `telemetry_disabled_cap_used`        | ON      | Capacity used          |
| `telemetry_disabled_mode`            | OFF     | Flight mode            |
| `telemetry_disabled_acc_x`           | OFF     | Accelerometer X        |
| `telemetry_disabled_acc_y`           | OFF     | Accelerometer Y        |
| `telemetry_disabled_acc_z`           | OFF     | Accelerometer Z        |
| `telemetry_disabled_pitch`           | OFF     | Pitch angle            |
| `telemetry_disabled_roll`            | OFF     | Roll angle             |
| `telemetry_disabled_heading`         | OFF     | Heading                |
| `telemetry_disabled_altitude`        | OFF     | Altitude               |
| `telemetry_disabled_lat_long`        | OFF     | GPS latitude/longitude |
| `telemetry_disabled_ground_speed`    | OFF     | GPS ground speed       |
| `telemetry_disabled_distance`        | OFF     | Distance from home     |
| `telemetry_disabled_vario`           | OFF     | Vertical speed         |
| `telemetry_disabled_temperature`     | OFF     | Temperature            |
| `telemetry_disabled_esc_current`     | ON      | ESC current            |
| `telemetry_disabled_esc_voltage`     | ON      | ESC voltage            |
| `telemetry_disabled_esc_rpm`         | ON      | ESC RPM                |
| `telemetry_disabled_esc_temperature` | ON      | ESC temperature        |

---

### Camera Control

Camera control drives an analog voltage divider to simulate button presses on cameras with a single-wire control interface.

| Variable                             | Default          | Range / Values                          | Description                                                              |
| ------------------------------------ | ---------------- | --------------------------------------- | ------------------------------------------------------------------------ |
| `camera_control_mode`                | HARDWARE_PWM     | HARDWARE_PWM, SOFTWARE_PWM, DAC         | Output mode for camera control signal.                                   |
| `camera_control_ref_voltage`         | 330              | 200–400 (centi-volts, e.g. 330 = 3.30V) | Reference voltage of the camera control circuit.                         |
| `camera_control_key_delay`           | 180              | 100–500 ms                              | Duration of simulated button press.                                      |
| `camera_control_internal_resistance` | 470              | 10–1000 ohm                             | Internal resistance of the voltage divider.                              |
| `camera_control_button_resistance`   | 450,270,150,68,0 | Array of 5 (ohm)                        | Resistance values for each camera button (ENTER, LEFT, UP, RIGHT, DOWN). |
| `camera_control_inverted`            | OFF              | OFF, ON                                 | Invert camera control signal logic.                                      |

---

### Receiver Protocols

**SRXL2 / Spektrum**

| Variable                      | Default | Range / Values | Description                                                                                                       |
| ----------------------------- | ------- | -------------- | ----------------------------------------------------------------------------------------------------------------- |
| `srxl2_unit_id`               | 1       | 0–15           | SRXL2 unit ID (must be unique on the SRXL2 bus). _(Requires: `USE_SERIALRX_SRXL2`)_                               |
| `srxl2_baud_fast`             | ON      | OFF, ON        | Use 400000 baud for SRXL2. OFF uses 115200. _(Requires: `USE_SERIALRX_SRXL2`)_                                    |
| `spektrum_sat_bind`           | 0       | 0–10           | Number of satellite bind pulses. 0 = normal operation; 3–10 to enter bind mode. _(Requires: `USE_SPEKTRUM_BIND`)_ |
| `spektrum_sat_bind_autoreset` | ON      | OFF, ON        | Automatically reset spektrum*sat_bind to 0 after binding. *(Requires: `USE_SPEKTRUM_BIND`)\_                      |

**RC Device (RunCam, etc.)**

| Variable                             | Default | Range / Values    | Description                                                                          |
| ------------------------------------ | ------- | ----------------- | ------------------------------------------------------------------------------------ |
| `rcdevice_protocol_version`          | 0       | 0–1               | RC device protocol version (0 = auto, 1 = v1). _(Requires: `USE_RCDEVICE`)_          |
| `rcdevice_init_dev_attempts`         | 6       | 0–10              | Number of initialization attempts for the RC device. _(Requires: `USE_RCDEVICE`)_    |
| `rcdevice_init_dev_attempt_interval` | 1000    | 0–5000 ms         | Interval between initialization attempts. _(Requires: `USE_RCDEVICE`)_               |
| `rcdevice_feature`                   | 0       | 0–65535 (bitmask) | RC device features bitmask (camera control, OSD, etc.). _(Requires: `USE_RCDEVICE`)_ |

---

### MSP Override

MSP channel override allows an external device (companion computer, goggles) to override RC channels via MSP.

| Variable                     | Default | Range / Values     | Description                                                              |
| ---------------------------- | ------- | ------------------ | ------------------------------------------------------------------------ |
| `msp_override_channels_mask` | 0       | 0–262143 (bitmask) | Bitmask of RC channels that can be overridden by MSP. Bit 0 = channel 1. |
| `msp_override_failsafe`      | OFF     | OFF, ON            | Use MSP override values as failsafe when signal is lost.                 |

---

### Statistics

Betaflight accumulates flight statistics across power cycles in EEPROM.

| Variable                 | Default | Range / Values   | Description                                                                                         |
| ------------------------ | ------- | ---------------- | --------------------------------------------------------------------------------------------------- |
| `stats_total_flights`    | 0       | 0–4294967295     | Total number of arming events logged. _(Requires: `USE_PERSISTENT_STATS`)_                          |
| `stats_total_time_s`     | 0       | 0–4294967295 s   | Total armed time in seconds. _(Requires: `USE_PERSISTENT_STATS`)_                                   |
| `stats_total_dist_m`     | 0       | 0–4294967295 m   | Total distance flown (meters). _(Requires: `USE_PERSISTENT_STATS`)_                                 |
| `stats_mah_used`         | 0       | 0–4294967295 mAh | Total battery capacity consumed. _(Requires: `USE_PERSISTENT_STATS` + `USE_BATTERY_CONTINUE`)_      |
| `stats_min_armed_time_s` | -1      | -1–127 s         | Minimum arm duration to count a flight (-1 = count all). _(Requires: `USE_PERSISTENT_STATS`)_       |
| `stats_save_move_limit`  | 20      | 0–255            | Minimum movement (cm) required before GPS distance is counted. _(Requires: `USE_PERSISTENT_STATS`)_ |

---

### Optical Flow & Rangefinder

| Variable               | Default | Range / Values                                                   | Description                                                                                         |
| ---------------------- | ------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `rangefinder_hardware` | NONE    | NONE, HCSR04, TFMINI, TF02, MTF01, MTF02, MTF01P, MTF02P, TFNOVA | Rangefinder (lidar) hardware selection. _(Requires: `USE_RANGEFINDER`)_                             |
| `opticalflow_hardware` | NONE    | NONE, MT                                                         | Optical flow sensor hardware. _(Requires: `USE_OPTICALFLOW`)_                                       |
| `opticalflow_flip_x`   | OFF     | OFF, ON                                                          | Flip optical flow X axis (correct for physical sensor orientation). _(Requires: `USE_OPTICALFLOW`)_ |
| `opticalflow_rotation` | 0       | 0–359 deg                                                        | Rotational offset of the optical flow sensor. _(Requires: `USE_OPTICALFLOW`)_                       |
| `opticalflow_lpf`      | 0       | 0–10000                                                          | Low-pass filter cutoff for optical flow data. 0 = disabled. _(Requires: `USE_OPTICALFLOW`)_         |

---

### Miscellaneous

| Variable                  | Default | Range / Values | Description                                                                       |
| ------------------------- | ------- | -------------- | --------------------------------------------------------------------------------- |
| `timezone_offset_minutes` | 0       | -780–780 min   | Timezone offset from UTC in minutes for RTC display. _(Requires: `USE_RTC_TIME`)_ |

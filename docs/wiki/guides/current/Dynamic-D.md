# Dynamic D

Dynamic D varies the D-term between a base **D** value (active during calm, smooth flight) and a higher **D Max** value (active during fast moves and propwash). It lets you keep D low enough to avoid motor heat and noise in cruise, while still having strong damping available when the quad needs it, e.g., during hard flips or in propwash.

Dynamic D has been available since Betaflight 4.3. It is enabled by default.

## How It Works

In calm flight, D stays at the **D** value. When the quad detects fast movement, D rises toward **D Max**. Two signals independently trigger the boost — whichever is stronger wins:

1. **Gyro signal** — detects actual quad movement: fast flips/rolls, propwash oscillations, vibration from a bent prop. Sensitivity is set by **D Max Gain**.
2. **Setpoint signal** — detects stick input before the quad has moved, allowing D to rise earlier and anticipate the move. Contribution is set by **D Max Advance**.

A 10 Hz low-pass filter is applied to the gyro signal before boost calculation. This introduces a brief delay, which is intentional — the boost ramps up toward the _end_ of a flip rather than immediately, so it doesn't dampen the quad's initial responsiveness to your input.

When **D Max** is set to 0, Dynamic D is effectively disabled and D stays constant at the base **D** value.

## Tuning in the Configurator

Dynamic D settings are on the **PID Tuning** tab. The PID sliders show **Damping (D Gains)** (base) and **Dynamic Damping (D Max)** (peak) for each axis. In the **PID Controller Settings** section, **D Max Gain** and **D Max Advance** control the boost response.

### Step-by-step approach

1. **Disable Dynamic D first.** Set **D Max** for roll and pitch to 0 in the PID table. Fly and find your optimal **D** with constant damping — this is your baseline.

2. **Re-enable and set D Max.** Once you have a good base D, set **D Max** to 20–30% above **D** as a starting point (e.g. D = 30 → D Max = 38–40).

3. **Adjust D Max Gain.** Default (37) is conservative and safe for most builds. Raise toward 45 on very clean freestyle builds; lower toward 20–25 for racing or noisier setups.

4. **Check D Max Advance.** Default (20) is intentionally low — enough to take the edge off overshoot on hard moves without adding noticeable delay. Set to 0 for racing. Higher values (up to 60–80) cause D to rise earlier but introduce more delay; only explore this if gyro-triggered boost alone doesn't control overshoot on very responsive builds.

5. **Verify with logs or motor temperature.** After any change, do a short hover and check motor temperature. If motors are significantly hotter, reduce **D Max Gain** or lower **D Max**.

## When to Use Dynamic D

**Freestyle / cinematic** — Great for propwash control. Set **D** to your comfortable cruising value and **D Max** 20–40% higher to absorb propwash. **D Max Gain** of 35–45 works well on clean builds.

**Racing** — Responsiveness matters more than propwash control. Keep **D Max Gain** at or below the default (37) so **D** stays near the base value during normal flying and only peaks on hard moves. Some racers disable Dynamic D entirely for predictable, constant D.

**Hot motors / noisy build** — Set **D** lower than you otherwise would (reducing noise and heat in cruise), then set **D Max** higher proportionally to recover damping during fast moves where it's most needed.

## When Not to Use Dynamic D

If your build is noisy (bent props, loose hardware, dirty motors), a high **D Max Gain** will cause D to spike whenever there is vibration, pushing toward **D Max** continuously. Either lower **D Max Gain** significantly or disable **Dynamic D** until the build is cleaned up.

## CLI Reference (2025.12)

| Variable        | Default | Range | Configurator label | Description                                                                                              |
| --------------- | ------- | ----- | ------------------ | -------------------------------------------------------------------------------------------------------- |
| `d_roll`        | 30      | 0–250 | D (roll)           | Base D on roll — active in smooth flight                                                                 |
| `d_pitch`       | 34      | 0–250 | D (pitch)          | Base D on pitch                                                                                          |
| `d_yaw`         | 0       | 0–250 | D (yaw)            | Base D on yaw                                                                                            |
| `d_max_roll`    | 40      | 0–250 | D Max (roll)       | Peak D on roll — reached during fast moves and propwash                                                  |
| `d_max_pitch`   | 46      | 0–250 | D Max (pitch)      | Peak D on pitch                                                                                          |
| `d_max_yaw`     | 0       | 0–250 | D Max (yaw)        | Peak D on yaw                                                                                            |
| `d_max_gain`    | 37      | 0–100 | D Max Gain         | Boost sensitivity — higher values push D toward D Max more quickly and aggressively                      |
| `d_max_advance` | 20      | 0–200 | D Max Advance      | Setpoint contribution to the boost trigger — higher values cause D to rise earlier when sticks are moved |

These are profile-specific settings.

## Debug Logging

To inspect Dynamic D in Blackbox:

```text
set debug_mode = D_MAX
```

| Channel | Content                                                                                                                                 |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| [0]     | Gyro factor — contribution of gyro to boost (%, relative to **D Max Gain**)                                                             |
| [1]     | Setpoint factor — contribution of sticks to boost (%, relative to **D Max Advance**). The larger of [0] and [1] determines boost level. |
| [2]     | Actual active D gain on roll (instantaneous)                                                                                            |
| [3]     | Actual active D gain on pitch (instantaneous)                                                                                           |

A well-tuned Dynamic D setup shows [2] and [3] sitting near **D** in smooth flight, rising to near **D Max** during hard flips and propwash, and returning quickly.

## Version History

The variable naming has changed significantly across firmware versions. If you are migrating from an older tune, note the following:

| Firmware        | Configurator "D" label | Configurator "D Max" label | CLI base D variable | CLI peak D variable |
| --------------- | ---------------------- | -------------------------- | ------------------- | ------------------- |
| 4.2 and earlier | D (constant)           | —                          | `d_roll`            | —                   |
| 4.3–4.5         | D (base)               | D Max (peak)               | `d_min_roll`        | `d_roll`            |
| 2025.12+        | D (base)               | D Max (peak)               | `d_roll`            | `d_max_roll`        |

The Configurator's labels ("D" for base, "D Max" for peak) were consistent from 4.3 onward. However, the underlying CLI variable names were swapped relative to the labels until 2025.12, when the firmware was updated to align with the Configurator's mental model.

**Migrating a 4.5 tune to 2025.12:**

- Your old `d_roll` value (which was peak D) becomes `d_max_roll`
- Your old `d_min_roll` value (which was base D) becomes `d_roll`
- `d_min_boost_gain` → `d_max_gain`
- `d_min_advance` → `d_max_advance`

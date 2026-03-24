# Dynamic D

Dynamic D varies the D-term between a lower **base value** (active during calm, smooth flight) and a higher **peak value** (active during fast moves and propwash). It lets you keep base D low enough to avoid motor heat and noise, while still having strong damping available when the quad needs it.

Dynamic D has been available since Betaflight 4.3. It is enabled by default.

## How It Works

In calm flight, D stays at the base value (`d_roll`, `d_pitch`). When the quad detects fast movement, D rises toward the peak value (`d_max_roll`, `d_max_pitch`). Two signals independently trigger the boost — whichever is stronger wins:

1. **Gyro signal** — detects actual quad movement: fast flips/rolls, propwash oscillations, vibration from a bent prop. Scaled by `d_max_gain`.
2. **Setpoint signal** — detects stick input before the quad has moved. Allows D to rise earlier, anticipating the move. Scaled by `d_max_advance`.

A 10 Hz low-pass filter is applied to the gyro signal before boost calculation. This introduces a brief delay, which is intentional — the boost ramps up toward the _end_ of a flip rather than immediately, so it doesn't dampen the quad's initial responsiveness to your input.

When `d_max_roll` equals `d_roll` (or is set to 0), Dynamic D is effectively disabled and D stays constant.

## CLI Variables (2025.12)

| Variable        | Default | Range | Description                                                                                              |
| --------------- | ------- | ----- | -------------------------------------------------------------------------------------------------------- |
| `d_roll`        | 30      | 0–250 | Base D on roll — active in smooth flight                                                                 |
| `d_pitch`       | 34      | 0–250 | Base D on pitch                                                                                          |
| `d_yaw`         | 0       | 0–250 | Base D on yaw                                                                                            |
| `d_max_roll`    | 40      | 0–250 | Peak D on roll — reached during fast moves and propwash                                                  |
| `d_max_pitch`   | 46      | 0–250 | Peak D on pitch                                                                                          |
| `d_max_yaw`     | 0       | 0–250 | Peak D on yaw                                                                                            |
| `d_max_gain`    | 37      | 0–100 | Boost sensitivity — higher values push D toward peak more quickly and aggressively                       |
| `d_max_advance` | 20      | 0–200 | Setpoint contribution to the boost trigger — higher values cause D to rise earlier when sticks are moved |

These are profile-specific settings.

## When to Use Dynamic D

**Freestyle / cinematic** — Boost from propwash control. Set base D to your comfortable cruising value and peak D 20–40% higher to help absorb propwash. `d_max_gain` of 35–45 works well on clean builds.

**Racing** — Responsiveness matters more than propwash control. Keep `d_max_gain` at or below the default (37) so D stays near the base value during normal flying and only peaks on hard moves. Some racers disable Dynamic D entirely for predictable, constant D.

**Hot motors / noisy build** — Set base D lower than you otherwise would (reducing noise and heat in cruise), then set peak D higher to recover damping during fast moves where it's most needed.

## When Not to Use Dynamic D

If your build is noisy (bent props, loose hardware, dirty motors), a high `d_max_gain` will cause D to spike whenever there is vibration, pushing motors toward `d_max` continuously. In this case either lower `d_max_gain` significantly or disable Dynamic D until the build is cleaned up.

## Recommended Tuning Approach

1. **Disable Dynamic D first.** Set `d_max_roll` and `d_max_pitch` to 0 (or match your base D) in the Configurator, or via CLI: `set d_max_roll = 0`, `set d_max_pitch = 0`. Find your optimal base D with constant D.

2. **Re-enable and set peak D.** Once you have a good base D, set `d_max_roll` and `d_max_pitch` to 20–30% above base as a starting point.

3. **Adjust `d_max_gain`.** Default (37) is conservative and safe for most builds. Raise toward 45 on very clean freestyle builds; lower toward 20–25 for racing or noisier setups.

4. **Check `d_max_advance`.** Default (20) is low — enough to take the edge off overshoot on hard moves without adding noticeable delay. Set to 0 for racing. Higher values (up to 60–80) add earlier D boost but also introduce more delay; use only if gyro-triggered boost alone doesn't control overshoot on very responsive builds.

5. **Verify with logs or motor temperature.** After any D_max change, do a short hover and check motor temperature. If motors are significantly hotter, reduce `d_max_gain` or lower `d_max_roll`/`d_max_pitch`.

## Debug Logging

To inspect Dynamic D in real time:

```text
set debug_mode = D_MAX
```

In Blackbox Explorer or the OSD debug display:

| Channel | Content                                                                                                                               |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [0]     | Gyro factor — contribution of gyro to boost (%, relative to `d_max_gain`)                                                             |
| [1]     | Setpoint factor — contribution of sticks to boost (%, relative to `d_max_advance`). The larger of [0] and [1] determines boost level. |
| [2]     | Actual active D gain on roll (instantaneous)                                                                                          |
| [3]     | Actual active D gain on pitch (instantaneous)                                                                                         |

A well-tuned Dynamic D setup shows [2] and [3] sitting near base D in smooth flight, rising to near `d_max` during hard flips and propwash, and returning quickly.

## Version History

The variable naming has changed significantly across firmware versions. If you are migrating from an older tune, note the following:

| Firmware        | `d_roll` meaning           | Peak D variable | Base D variable |
| --------------- | -------------------------- | --------------- | --------------- |
| 4.2 and earlier | D (constant, no Dynamic D) | —               | —               |
| 4.3–4.5         | **Peak D** (`d_max`)       | `d_roll`        | `d_min_roll`    |
| 2025.12+        | **Base D**                 | `d_max_roll`    | `d_roll`        |

**Important**: In Betaflight 4.3, the Configurator changed its UI labels so that the "D" slider mapped to base D and "D Max" mapped to peak D — matching the current user-facing names. However, the underlying CLI variables remained swapped until 2025.12, when the firmware was updated to align with the Configurator's mental model.

**Migrating a 4.5 tune to 2025.12:**

- Your old `d_roll` value (which was peak D) becomes `d_max_roll`
- Your old `d_min_roll` value (which was base D) becomes `d_roll`
- `d_min_boost_gain` → `d_max_gain`
- `d_min_advance` → `d_max_advance`

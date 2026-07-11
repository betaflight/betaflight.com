# ADRC (Active Disturbance Rejection Control)

ADRC is an experimental, opt-in alternative to classic PID rate control, selected per PID profile via `pid_type`. Instead of proportional/integral/derivative gains acting on error, ADRC runs a second-order **Extended State Observer (ESO)** that continuously estimates the craft's rotation rate, its derivative, and a lumped "everything else" disturbance term (motor/prop mismatch, wind, payload imbalance, CG offset), then drives a virtual PD law to cancel it. In principle this rejects disturbances faster and needs less per-craft tuning than classic PID.

:::caution
Experimental. Classic PID is untouched and remains the default (`pid_type = CLASSIC`) — ADRC is opt-in per profile, so you can keep a known-good classic tune on one profile and try ADRC on another without risk to the first. Read the [Testing Notes](#testing-notes-read-before-flying) section before flying it.
:::

## Origins

- **[Boyyt357/ADRC-betaflight](https://github.com/Boyyt357/ADRC-betaflight)** — original proof-of-concept, ADRC replacing classic PID entirely.
- **[danusha2345/ADRC-betaflight](https://github.com/danusha2345/ADRC-betaflight)** — a series of independent robustness fixes on top of the PoC (anti-windup, saturated-observer feedback, a liftoff gate, throttle-scaled plant gain, leaky disturbance decay, blackbox logging of the observer states), validated by real flight testers across several airframes. **This is the best place for in-depth theory, the full fix-by-fix rationale, and ongoing flight-test reports** — see its `README.md` and `ADRC_FIXES.md`.
- **This implementation** ports those fixes into a dedicated, opt-in module (`src/main/flight/adrc.c`/`.h`) rather than inline PID code, with dedicated `uint16_t` CLI fields instead of repurposing the legacy P/I/D sliders, plus a dedicated pre-ESO gyro filter and an optional tracking differentiator (see below).
- Upstream tracking PR: **[betaflight/betaflight#15400](https://github.com/betaflight/betaflight/pull/15400)**.

## How It Works

Per axis, the ESO maintains three states from the (filtered) gyro reading and the previous control output:

- **z1** — estimated rotation rate (tracks the gyro)
- **z2** — estimated rate-of-change of rotation (a D-like term)
- **z3** — estimated lumped disturbance (an I-like term)

The control output is a virtual PD law: `u = (kp·(setpoint − z1) − kd·z2 − z3) / b0`, where `kp = wc²`, `kd = 2·wc`. Output is logged into the standard P/I/D blackbox fields for mixer/tooling compatibility, but the values don't carry their classic-PID meaning.

Three tunables set the whole thing per axis:

- **`adrc_wc`** — controller bandwidth (ωc). Higher = faster/crisper correction. Has a **practical ceiling set by gyro noise** (`kp = wc²` amplifies whatever noise reaches it), not by stability — if throttle-up produces a "singing"/chatter noise that gets louder with RPM, `wc` is too high for your filtering.
- **`adrc_wo`** — observer bandwidth (ωo). How fast the ESO tracks/estimates. Community rule of thumb: `wo ≈ 3–5× wc`.
- **`adrc_b0`** — control-input gain estimate: how much rotational acceleration one unit of output produces. Roughly scales with motor KV × thrust ÷ mass. Under-estimating causes instability; over-estimating is comparatively harmless (softer response).

On top of the ported core, this implementation adds a few extra mechanisms:

- **Liftoff gate** — while the craft is ground-constrained, the plant doesn't respond to output the way the model expects, so the ESO's `b0·u` feedback is held at zero until liftoff is detected (`adrc_liftoff_throttle`, default 40%; or sustained rotation above `adrc_liftoff_gyro_dps`, default 20°/s, held for `adrc_liftoff_hold_ms`, default 25 ms — a toss launch opens it almost instantly). Without this, the observer winds up while grounded and has to unwind violently at liftoff. **`adrc_liftoff_throttle` has no built-in relationship to `adrc_hover_throttle`** below — they answer different questions ("how sure am I this throttle means I'm off the ground" vs. "where do I actually hover"). Set `adrc_liftoff_throttle` a bit _above_ your actual hover throttle, and `adrc_liftoff_idle_throttle` comfortably _below_ it, rather than assuming the defaults fit your craft.
- **Mid-air re-arm is opt-in, off by default** (`adrc_liftoff_idle_hold_ms = 0`). With the default, once the gate opens at first liftoff it stays open until disarm — disarm is the only ground signal that can't false-trigger mid-flight. Setting `adrc_liftoff_idle_hold_ms` above 0 (floored to 100 ms) re-enables the ported heuristic — re-arm after throttle stays below `adrc_liftoff_idle_throttle` (default 5%) and the craft is still for that hold — for bench testing / repeated ground reps within one arm cycle. Don't enable it for real flight: a smooth ballistic float (zero throttle, a few °/s, held past the hold time — ordinary in freestyle) satisfies the same throttle+gyro stillness test a landing does, so a mid-air re-gate can dump the live z3 estimate through the fast gated decay and blind the observer to its own `b0·u` right as airmode keeps flying the craft — observed closing the gate mid-air three times in early flight testing on ballistic floats.
- **Gated z3 decay** (`adrc_gated_z3_decay`, default 20/s) — even with the gate above, z3 is still a leaky integrator of the observer error regardless of gate state; while grounded it decays at this rate (always faster than the airborne `adrc_sigma_decay`) so it can't quietly wind up during a long armed-idle period even without exceeding the gate's rotation threshold.
- **Throttle-scaled b0** — motor authority roughly scales with throttle², so `b0` is scaled by `(throttle / adrc_hover_throttle)²` above hover, clamped to `adrc_b0_scale_max` (default 3×), keeping the plant model calibrated away from hover. The quadratic law is only community-validated up to ~x3; an early flight test that extrapolated past it (hover set low, punches pushing the scale toward ~x7-8) produced a severely under-gained control law and an uncommanded pitch excursion, so the default ceiling was pulled back to where validation actually ends. The CLI range still allows raising it for experiments.
- **z3 leaky decay** (`adrc_sigma_decay`) — while airborne, z3 bleeds a transient disturbance bump back toward zero at a configurable rate instead of holding it indefinitely. Set to 0 for a classic pure integrator.
- **Dedicated pre-ESO gyro low-pass** (`adrc_gyro_lpf_hz`) — classic PID's D-term has its own dedicated filter stage on top of the shared base gyro filter; ADRC's control law has no equivalent, and `kp = wc²` makes it more sensitive to whatever noise gets through than classic's linear gain is. This filter runs ahead of the ESO's error calculation only — it doesn't affect the shared dynamic notch / RPM filtering, which still runs as normal upstream of both control laws.
- **Tracking differentiator** (`adrc_td_hz`, off by default) — smooths the setpoint feeding the control law's P term before it drives the ESO, instead of feeding it through directly. Only affects what the controller steers toward, not the ESO's own gyro-tracking error. Ported from an independent third ADRC implementation ([SeverinBitterli/betaflight](https://github.com/SeverinBitterli/betaflight/tree/ADRC-Implementation)), not danusha2345's fork — unvalidated, left opt-in for testers.

## Enabling ADRC

```
set pid_type = ADRC
```

This is per-profile — other profiles keep `pid_type = CLASSIC` (the default) untouched. TPA, anti-gravity, and D Max are all classic-PID mechanisms with no ADRC equivalent and are inert/disabled under `pid_type = ADRC` (the throttle-scaled `b0` above is ADRC's equivalent of TPA).

## CLI Reference

| Variable                           | Default            | Range             | Description                                                                                                                                                                                                                                                       |
| ---------------------------------- | ------------------ | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pid_type`                         | `CLASSIC`          | `CLASSIC`, `ADRC` | Selects the rate control law for this profile                                                                                                                                                                                                                     |
| `adrc_wc_roll` / `_pitch` / `_yaw` | 60 / 60 / 60       | 5–300             | Controller bandwidth ωc per axis                                                                                                                                                                                                                                  |
| `adrc_wo_roll` / `_pitch` / `_yaw` | 100 / 100 / 80     | 10–600            | Observer bandwidth ωo per axis (yaw defaults lower)                                                                                                                                                                                                               |
| `adrc_b0_roll` / `_pitch` / `_yaw` | 2000 / 2000 / 2000 | 100–65535         | Control-input gain estimate per axis                                                                                                                                                                                                                              |
| `adrc_gyro_lpf_hz`                 | 150                | 0–LPF_MAX_HZ      | Pre-ESO gyro low-pass cutoff (0 = disabled, pass-through)                                                                                                                                                                                                         |
| `adrc_hover_throttle`              | 35                 | 5–100             | Throttle % at hover, for throttle-scaled `b0`                                                                                                                                                                                                                     |
| `adrc_sigma_decay`                 | 3                  | 0–100             | z3 leaky-decay rate ×0.1 (0 = pure integrator) while airborne                                                                                                                                                                                                     |
| `adrc_td_hz`                       | 0                  | 0–LPF_MAX_HZ      | Tracking-differentiator corner frequency (0 = disabled)                                                                                                                                                                                                           |
| `adrc_liftoff_throttle`            | 40                 | 1–100             | Throttle % that alone confirms liftoff. See cross-reference note above — not derived from `adrc_hover_throttle`                                                                                                                                                   |
| `adrc_liftoff_gyro_dps`            | 20                 | 1–255             | Sustained rotation (°/s, any axis) that alone confirms liftoff (toss-launch path)                                                                                                                                                                                 |
| `adrc_liftoff_hold_ms`             | 25                 | 0–5000            | How long the rotation above must sustain before it counts                                                                                                                                                                                                         |
| `adrc_liftoff_idle_throttle`       | 5                  | 0–100             | Throttle % the craft must drop below before the gate can re-arm (only relevant when `adrc_liftoff_idle_hold_ms` > 0). Keep below both `adrc_liftoff_throttle` and your actual hover throttle                                                                      |
| `adrc_liftoff_idle_hold_ms`        | 0                  | 0–10000           | Mid-air gate re-arm hold, **opt-in** (0 = disabled, the default — gate stays open from first liftoff until disarm). Nonzero is floored to 100 ms and re-enables the idle-throttle-and-stillness re-arm heuristic; not recommended for real flight, see note above |
| `adrc_gated_z3_decay`              | 200 (=20.0)        | 0–2000            | z3 decay rate ×0.1 while the gate is closed (grounded) — always faster than `adrc_sigma_decay`                                                                                                                                                                    |
| `adrc_b0_scale_max`                | 3                  | 1–50              | Ceiling on the throttle-scaled `b0` multiplier (community-validated only up to ~x3; CLI range allows raising it for experiments)                                                                                                                                  |

All are profile-specific and show up in `diff`/`dump`.

## Tuning

There's no dedicated Configurator screen yet — set values via CLI. A sensible starting order, adapted from the community procedure on danusha2345's fork:

1. **`adrc_b0`** — raise until the craft takes off stably and responds crisply; keep raising until you hear stuttering/chatter in hover, then back off ~20%. Over-estimating is fairly harmless; under-estimating causes instability.
2. **`adrc_wo`** — raise until chatter appears in hover (the observer starting to track gyro noise), then back off ~20%.
3. **`adrc_wc`** — start around `wo ÷ 3` to `wo ÷ 5`, then treat it as a master responsiveness knob. Raise for a crisper feel until motors "sing" on throttle-up (chatter that gets _louder_ with RPM) — that's the noise ceiling, back off from there. Too low feels floaty/sluggish.

The shipped defaults (`60/100/2000`, yaw `wo=80`) trace to a real 5" control-bandwidth sweep on danusha2345's fork — see `ADRC_FIXES.md` there for the full derivation. Still airframe-dependent, especially `b0` (motor/prop/weight response).

**Bench validation tip:** rather than judging a tune by feel alone, log the same maneuver (e.g. a takeoff) under a few candidate tunes and compare tracking-error RMS from the blackbox — the difference between tunes that "feel fine" separates clearly this way. See danusha2345's `docs/flight-test-analysis/` scripts for a ready-made version of this.

**Liftoff gate thresholds** are a separate tuning pass from `wc`/`wo`/`b0` above — they're about _when_ the ESO trusts its own feedback, not the control response itself. The shipped defaults are one community-validated craft's values, not universal. At minimum, check `adrc_liftoff_throttle` against your actual hover throttle (`adrc_hover_throttle`) once you know it — set the former comfortably above the latter — and `adrc_liftoff_idle_throttle` comfortably below both.

## Debug Logging

```
set debug_mode = ADRC
```

| Channel | Content                                                                                                                |
| ------- | ---------------------------------------------------------------------------------------------------------------------- |
| [0]–[2] | roll z1, z2, z3 (z3 ÷ 16 to fit int16)                                                                                 |
| [3]–[5] | pitch z1, z2, z3 (z3 ÷ 16)                                                                                             |
| [6]     | yaw z3 (÷ 16)                                                                                                          |
| [7]     | throttle-scaled `b0` multiplier ×100, sign-tagged by the liftoff gate (positive = airborne, negative = grounded/gated) |

Blackbox headers also log `pid_type` and every `adrc_*` tunable, so a log is self-describing — no need to infer from debug channels whether ADRC was even active.

## Testing Notes (read before flying)

:::caution
**Props-off bench testing runs ADRC noticeably hotter than classic PID for the same hand disturbance — this is expected, not a bug.** Hand-tilting the craft with props off produced motor commands well above idle (and audibly/thermally hotter motors) under ADRC where classic PID stayed calm under equivalent tilt intensity. The cause: ADRC's control gains (`kp = wc²`) are high-bandwidth by design and give full, uncapped corrective authority to any tracking error — necessary for a real flight snap/flip to have full authority, but with props off there's no real thrust to correct against, so the correction just fights an unloaded motor for as long as you keep disturbing it, instead of a brief spike. In real flight, the same authority is doing real aerodynamic work rather than spinning against nothing. Keep props-off hand-tilt tests brief; don't extrapolate motor warmth from a props-off test to real flight risk.
:::

- **First real freestyle flight test** (SpeedyBee F7 Mini, ACRO, before the `adrc_b0_scale_max` default was pulled back to 3 and the mid-air gate re-arm was made opt-in) surfaced two real defects, both now defaulted-away but worth understanding if you raise `adrc_b0_scale_max` or opt into `adrc_liftoff_idle_hold_ms > 0`: (1) at a low configured hover throttle, aggressive punches pushed the throttle-scaled `b0` multiplier into the extrapolated region well past the community-validated ~x3, severely under-gaining the control law and producing an uncommanded pitch excursion; (2) with the old always-on mid-air re-arm, smooth ballistic floats (near-zero throttle and rotation, ordinary in freestyle) were indistinguishable from a landing and re-armed the gate mid-air, dumping the live z3 estimate through the fast gated decay while airmode kept flying the craft. Both are exactly the regime freestyle throttle chops/catches exercise, hence the safer defaults.
- **`pid_at_min_throttle = OFF`** disables the controller entirely below the arming throttle threshold — sticks/tilts produce zero motor response until throttle is raised. The default `ON` is safe under ADRC because the liftoff gate already provides ground protection; only turn it off if you specifically want the "fully asleep at idle" behavior and understand the trade-off.
- **`dshot_bidir = ON`** has been observed to cause hard gyro freezes (thousands of identical gyro samples, momentarily uncontrollable) on at least one board/firmware-base combination. If your craft flies erratically or "acts possessed," try `set dshot_bidir = OFF` (you lose the RPM filter; the dynamic notch still works). Root cause not yet fixed upstream.
- Efficiency (current draw) versus classic PID for equivalent real flight has not been measured or documented anywhere — the props-off finding above doesn't generalize to real flight either way. If you want to compare, blackbox logs `energyCumulative` per flight; fly matched maneuvers on both `pid_type`s and compare.
- Mid-air profile switches (aux-channel-bound `pid_type`) into ADRC re-seed the observer from the current gyro reading to avoid a handover kick — a genuine profile-switch transition, not an in-flight retune, triggers this.

## More Information

For the full theory-vs-implementation review, fix-by-fix rationale, and ongoing real-flight test reports across multiple airframes, see danusha2345's fork:

- [`README.md`](https://github.com/danusha2345/ADRC-betaflight/blob/master/README.md)
- [`ADRC_FIXES.md`](https://github.com/danusha2345/ADRC-betaflight/blob/master/ADRC_FIXES.md)
- [Issue #1 — call for flight testers](https://github.com/danusha2345/ADRC-betaflight/issues/1)

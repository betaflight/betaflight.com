# ADRC (Active Disturbance Rejection Control)

ADRC is an experimental, opt-in alternative to classic PID rate control, selected per PID profile via `pid_type`. Instead of proportional/integral/derivative gains acting on error, ADRC runs a third-order **Extended State Observer (ESO)** that continuously estimates the craft's rotation rate, its derivative, and a lumped "everything else" disturbance term (motor/prop mismatch, wind, payload imbalance, CG offset), then drives a virtual PD law to cancel it. In principle this rejects disturbances faster and needs less per-craft tuning than classic PID.

:::info
**Not yet in an official Betaflight release.** This page documents an open pull request, [betaflight/betaflight#15400](https://github.com/betaflight/betaflight/pull/15400) — `pid_type = ADRC` does not exist in any stock Betaflight build (Configurator releases, official `master`) until that PR merges; `set pid_type = ADRC` will simply error out on a normal build — the CLI rejects `pid_type` as an unknown setting name, since the variable itself doesn't exist there. To try it now, flash one of the PR's [prebuilt hex releases](https://github.com/danusha2345/ADRC-betaflight/releases).
:::

:::caution
Experimental. Classic PID is untouched and remains the default (`pid_type = CLASSIC`) — ADRC is opt-in per profile, so you can keep a known-good classic tune on one profile and try ADRC on another without risk to the first. Read the [Testing Notes](#testing-notes-read-before-flying) section before flying it.
:::

:::tip Test pilots welcome
Progress here depends on real flight-test data across a spread of typical builds, not just the handful of crafts validated so far — the shipped defaults and several open items (`ADRC-021`, `ADRC-022` in the [remediation tracker](https://github.com/danusha2345/ADRC-betaflight/blob/master/docs/ADRC_REMEDIATION_TRACKER.md#open-items)) are explicitly waiting on more of it. This is why this guide is published now, ahead of the PR merging. If you fly it, enable `debug_mode = ADRC` and blackbox logging — a log from a normal flight or a few matched maneuvers is useful, good or bad result alike. Read [Testing Notes](#testing-notes-read-before-flying) first, then share logs on [PR #15400](https://github.com/betaflight/betaflight/pull/15400) or danusha2345's [flight-testing thread](https://github.com/danusha2345/ADRC-betaflight/issues/2).
:::

## Origins

- **[Boyyt357/ADRC-betaflight](https://github.com/Boyyt357/ADRC-betaflight)** — original proof-of-concept, ADRC replacing classic PID entirely.
- **[danusha2345/ADRC-betaflight](https://github.com/danusha2345/ADRC-betaflight)** — a series of independent robustness fixes on top of the PoC (anti-windup, saturated-observer feedback, a liftoff gate, throttle-scaled plant gain, leaky disturbance decay, blackbox logging of the observer states), validated by real flight testers across several airframes. **This is the best place for in-depth theory, the full fix-by-fix rationale, and ongoing flight-test reports** — see its `README.md` and `ADRC_FIXES.md`.
- **This implementation** ports those fixes into a dedicated, opt-in module (`src/main/flight/adrc.c`/`.h`) rather than inline PID code, with dedicated `uint16_t` CLI fields instead of repurposing the legacy P/I/D sliders, plus a dedicated pre-ESO gyro filter and an optional tracking differentiator (see below). All ADRC-specific logic — control law, state, tuning fields — lives in `adrc.c`/`adrc.h` by design; `pid.c`/`pid.h` only branch into it (a `pid_type` check or a plain-value `adrc*()` call), so classic PID's code path is unaffected in substance, not just by convention.
- Upstream tracking PR: **[betaflight/betaflight#15400](https://github.com/betaflight/betaflight/pull/15400)** — danusha2345 has since joined as a direct collaborator and driven a substantial line-by-line review and hardening pass on top of the initial port; see the PR thread for the full, ongoing development process. The full finding-by-finding record (status, evidence, open items, fixes, rationales) lives in a dedicated [remediation tracker](https://github.com/danusha2345/ADRC-betaflight/blob/master/docs/ADRC_REMEDIATION_TRACKER.md) rather than in this page, so this guide stays accurate without having to track the PR's day-to-day progress.

## How It Works

Per axis, the ESO maintains three states from the (filtered) gyro reading and the previous control output:

- **z1** — estimated rotation rate (tracks the gyro)
- **z2** — estimated rate-of-change of rotation (a D-like term)
- **z3** — estimated lumped disturbance (an I-like term)

The control output is a virtual PD law: `u = (kp·(setpoint − z1) − kd·z2 − z3) / b0`, where `kp = wc²`, `kd = 2·wc`. Output is logged into the standard P/I/D blackbox fields for mixer/tooling compatibility, but the values don't carry their classic-PID meaning.

Three tunables set the whole thing per axis:

- **`adrc_wc`** — controller bandwidth (ωc). Higher = faster/crisper correction. Has a **practical ceiling set by gyro noise** (`kp = wc²` amplifies whatever noise reaches it), not by stability — if throttle-up produces a "singing"/chatter noise that gets louder with RPM, `wc` is too high for your filtering.
- **`adrc_wo`** — observer bandwidth (ωo). How fast the ESO tracks/estimates. Community rule of thumb for picking a fresh pair: `wo ≈ 3–5× wc` — note the shipped defaults below intentionally sit outside that range; see [Tuning](#tuning) for why.
- **`adrc_b0`** — control-input gain estimate: how much rotational acceleration one unit of output produces. Roughly scales with motor KV × thrust ÷ mass. Under-estimating causes instability; over-estimating is comparatively harmless (softer response).

On top of the ported core, this implementation adds a few extra mechanisms:

- **Liftoff gate** — while the craft is ground-constrained, the plant doesn't respond to output the way the model expects, so the ESO's `b0·u` feedback is held at zero until liftoff is detected (`adrc_liftoff_throttle`, default 40%; or sustained rotation above `adrc_liftoff_gyro_dps`, default 20°/s, held for `adrc_liftoff_hold_ms`, default 25 ms — a toss launch opens it almost instantly). Without this, the observer winds up while grounded and has to unwind violently at liftoff. Once open, **the gate stays open until disarm — there is no mid-air re-arm.** A repeated ground test (e.g. bench reps) needs an actual disarm/re-arm cycle, not just a return to idle throttle: an earlier opt-in re-arm heuristic was removed rather than kept, because throttle+gyro alone can't reliably distinguish a real landing from a calm mid-air float — see `ADRC-020` in the [remediation tracker](https://github.com/danusha2345/ADRC-betaflight/blob/master/docs/ADRC_REMEDIATION_TRACKER.md) for the full reasoning. **`adrc_liftoff_throttle` has no built-in relationship to `adrc_hover_throttle`** below — they answer different questions ("how sure am I this throttle means I'm off the ground" vs. "where do I actually hover"). Set `adrc_liftoff_throttle` a bit _above_ your actual hover throttle rather than assuming the default fits your craft.
- **Gated z3 decay** (`adrc_gated_z3_decay`, default 20/s) — even with the gate above, z3 is still a leaky integrator of the observer error regardless of gate state; while grounded it decays at this rate (never slower than the airborne `adrc_sigma_decay` — a low or zero `adrc_gated_z3_decay` is floored up to match it, rather than actually applied) so it can't quietly wind up during a long armed-idle period even without exceeding the gate's rotation threshold.
- **Throttle-scaled b0** — motor authority roughly scales with throttle², so `b0` is scaled by `(throttle / adrc_hover_throttle)²` above hover, clamped to `adrc_b0_scale_max` (default 3×, community-validated only up to that point — see the [remediation tracker](https://github.com/danusha2345/ADRC-betaflight/blob/master/docs/ADRC_REMEDIATION_TRACKER.md) for the ongoing curve-identification work). The CLI range still allows raising it for experiments. With `thrust_linear > 0`, both this schedule and the liftoff-throttle gate read the forward-linearized collective rather than the mixer's raw inverse-compensated value, so the throttle they see matches actual thrust either way.
- **Crash and yaw-spin recovery hygiene** — Crash Flip and Crash Recovery both fully reset the ESO/gate state around the recovery episode instead of leaving stale estimates to re-enter control afterward (Crash Flip in particular used to let the ESO learn the turtle-mode command and could open the liftoff gate from it). Yaw-spin recovery suppresses the disturbance estimate through its exit loop so the transition back to normal control doesn't kick a hidden `z3` back in as a sudden I-term jump.
- **z3 leaky decay** (`adrc_sigma_decay`) — while airborne, z3 bleeds a transient disturbance bump back toward zero at a configurable rate instead of holding it indefinitely. Set to 0 for a classic pure integrator.
- **Dedicated pre-ESO gyro low-pass** (`adrc_gyro_lpf_hz`) — classic PID's D-term has its own dedicated filter stage on top of the shared base gyro filter; ADRC's control law has no equivalent, and `kp = wc²` makes it more sensitive to whatever noise gets through than classic's linear gain is. This filter runs ahead of the ESO's error calculation only — the shared gyro filter chain upstream of it (dynamic notch, RPM filter, `gyro_lpf1`/`lpf2` static and dynamic lowpass) is untouched by `pid_type` entirely — it lives in the gyro-sampling task, not the PID loop, and runs identically for both control laws.
- **Tracking differentiator** (`adrc_td_hz`, off by default) — smooths the setpoint feeding the control law's P term before it drives the ESO, instead of feeding it through directly. Only affects what the controller steers toward, not the ESO's own gyro-tracking error. Ported from an independent third ADRC implementation ([SeverinBitterli/betaflight](https://github.com/SeverinBitterli/betaflight/tree/ADRC-Implementation)), not danusha2345's fork — unvalidated, left opt-in for testers.
- **Actually-applied output feedback** — the observer's `b0·u` feedback term is fed the control output that actually reached the plant (post mixer-normalization, saturation, thrust-linearization, and automatic-mode throttle overrides), not the raw pre-mixer PID sum, so mixer clipping/normalization doesn't get misread as plant disturbance. Mixer authority scaling is consumed as a binary "was anything applied at all" signal (zero only when nothing was applied at all — motor-stop, Crash Flip), not as a proportional multiplier — see `ADRC-018` in the [remediation tracker](https://github.com/danusha2345/ADRC-betaflight/blob/master/docs/ADRC_REMEDIATION_TRACKER.md) for why that distinction matters.
- **Numerical hardening** — the ESO's effective observer bandwidth is capped at runtime (`wo · dT ≤ 0.5`) so a high `adrc_wo` on a slow loop rate can't be pushed into an unstable discretization; `z1`/`z2` carry generous physical bounds purely to stop numerical divergence, wide enough that an ordinary snap/flip never approaches them (unlike `z3`, which is clamped to keep `|I| = |z3/b0|` from exceeding `pidsum_limit` — the ADRC equivalent of classic PID's I-term windup limit, and the only one of the three states that actually accumulates); and any non-finite state (NaN/Inf, possible under `-ffast-math`) is detected and the affected axis reset from the current gyro reading rather than propagating garbage.
- **Bumpless liftoff-gate handover** — opening the gate (at first liftoff) drops exactly one stale ground-epoch control-output sample instead of feeding it to the observer as `b0·u`, removing a transient that otherwise showed up as a brief oscillation bout right at the moment of takeoff.
- **Fresh ESO epoch every arm cycle** — the per-axis ESO state and the liftoff gate unconditionally reset on every disarm→arm transition, independent of `pid_at_min_throttle`. (With the stock default `pid_at_min_throttle = ON`, the only other reset path is dead code while disarmed, so without this a wound-up `z3` and an open gate could silently survive a power-cycle-internal disarm/re-arm.)

## Enabling ADRC

```
set pid_type = ADRC
```

This is per-profile — other profiles keep `pid_type = CLASSIC` (the default) untouched.

**ADRC is CLI-only, and every classic-PID Configurator control turns into a zombie on an ADRC profile.** There's no dedicated GUI screen for `adrc_*` tunables yet — you read and set all of them (`adrc_wc`/`adrc_wo`/`adrc_b0`, the gyro filter, the liftoff-gate thresholds, everything in the [CLI Reference](#cli-reference) below) through the CLI tab, `set`/`get`, or `diff`/`dump`. Meanwhile the Configurator's **PID Tuning tab** (P/I/D/F sliders, D Max, TPA) and the D-term-specific rows on the **Filter tab** (`dterm_lpf1`/`lpf2`) don't grey out, don't hide, and don't warn you — they keep computing and displaying numbers exactly as if you were still on classic PID. None of that computation reaches the mixer: `pid.c` runs the classic P/I/D/D-term-filter/TPA calculation unconditionally regardless of `pid_type` (to keep classic PID's code path byte-identical), then simply overwrites the result with ADRC's output before it's used, on an ADRC profile. Anti-gravity and the zero-throttle I-term reset heuristic are the exceptions — they're explicitly skipped rather than computed-then-discarded — but the practical effect is the same: **drag any of those sliders on an ADRC profile and the craft won't respond, with nothing in the UI telling you why.** (The throttle-scaled `b0` — `adrc_hover_throttle`/`adrc_b0_scale_max` — is ADRC's own equivalent of TPA, set via CLI like everything else.)

**The rest of the Filter tab is not a zombie — it's fully live for ADRC too.** The dynamic notch, RPM filter, and `gyro_lpf1`/`lpf2` static/dynamic lowpass all run in the gyro-sampling task, upstream of and completely independent from the PID loop (`gyro.c` has no knowledge of `pid_type` at all), so they affect ADRC's ESO input exactly as they affect classic PID's. Only the D-term-specific rows above are dead; everything else on that tab still matters and should be tuned as normal.

**Simplified Tuning's PID sliders are actually harmless, not just inert-and-silent, and it's worth knowing why — but its gyro-filter slider is live.** danusha2345's fork repurposes the classic `p`/`i`/`d` sliders as its ADRC gains, so on that fork Simplified Tuning (which recalculates those same fields) has to be manually disabled or it silently overwrites the tune on save. This implementation uses dedicated `adrc_wc`/`adrc_wo`/`adrc_b0` fields instead specifically to avoid that trap: Simplified Tuning only ever recalculates `pid[axis].P/I/D/F` and `d_max[axis]` — the same already-zombie fields described above — so on an ADRC profile it's just recomputing numbers nobody reads, never the `adrc_*` fields themselves.

**`pid_type` is a disarmed-only configuration change**, exactly like editing any other field in a PID profile — it is not a supported in-flight handover between control laws. Switching a profile's `pid_type` (or switching to a different profile with a different `pid_type`) clears both the classic I-term and the full ADRC state (observer + gate) on the transition, so don't rely on toggling into or out of ADRC while armed.

**Not available on STM32F446-based targets** — that MCU's flash is within ~3 KB of full with the default feature set and ADRC doesn't fit, so `USE_ADRC` is excluded there at compile time; those boards run classic PID only. The persisted profile layout is unaffected on every target either way.

**F411 boards running an 8 kHz PID loop have an unproven cycle budget.** ADRC's extra per-loop math has been measured to fit within F405/F411 flash comfortably; timing headroom at F411's fastest supported loop rate is tracked separately (`ADRC-012` in the [remediation tracker](https://github.com/danusha2345/ADRC-betaflight/blob/master/docs/ADRC_REMEDIATION_TRACKER.md)). If you're on an F411 board at 8 kHz, watch for scheduler overruns / loop-time warnings particularly closely, or stay at a lower `pid_process_denom` until that's confirmed.

## CLI Reference

| Variable                           | Default            | Range             | Description                                                                                                                      |
| ---------------------------------- | ------------------ | ----------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `pid_type`                         | `CLASSIC`          | `CLASSIC`, `ADRC` | Selects the rate control law for this profile                                                                                    |
| `adrc_wc_roll` / `_pitch` / `_yaw` | 60 / 60 / 60       | 5–300             | Controller bandwidth ωc per axis                                                                                                 |
| `adrc_wo_roll` / `_pitch` / `_yaw` | 100 / 100 / 80     | 10–600            | Observer bandwidth ωo per axis (yaw defaults lower)                                                                              |
| `adrc_b0_roll` / `_pitch` / `_yaw` | 2000 / 2000 / 2000 | 100–65535         | Control-input gain estimate per axis                                                                                             |
| `adrc_gyro_lpf_hz`                 | 150                | 0–LPF_MAX_HZ      | Pre-ESO gyro low-pass cutoff (0 = disabled, pass-through)                                                                        |
| `adrc_hover_throttle`              | 35                 | 5–100             | Throttle % at hover, for throttle-scaled `b0`                                                                                    |
| `adrc_sigma_decay`                 | 3                  | 0–100             | z3 leaky-decay rate ×0.1 (0 = pure integrator) while airborne                                                                    |
| `adrc_td_hz`                       | 0                  | 0–LPF_MAX_HZ      | Tracking-differentiator corner frequency (0 = disabled)                                                                          |
| `adrc_liftoff_throttle`            | 40                 | 1–100             | Throttle % that alone confirms liftoff. See cross-reference note above — not derived from `adrc_hover_throttle`                  |
| `adrc_liftoff_gyro_dps`            | 20                 | 1–255             | Sustained rotation (°/s, any axis) that alone confirms liftoff (toss-launch path)                                                |
| `adrc_liftoff_hold_ms`             | 25                 | 0–5000            | How long the rotation above must sustain before it counts                                                                        |
| `adrc_gated_z3_decay`              | 200 (=20.0)        | 0–2000            | z3 decay rate ×0.1 while the gate is closed (grounded) — never slower than `adrc_sigma_decay` (floored up to match if set lower) |
| `adrc_b0_scale_max`                | 3                  | 1–50              | Ceiling on the throttle-scaled `b0` multiplier (community-validated only up to ~x3; CLI range allows raising it for experiments) |

All are profile-specific and show up in `diff`/`dump`.

## Tuning

There's no dedicated Configurator screen yet — set values via CLI.

### If you're coming from classic PID

Classic PID gives you three independently adjustable knobs. ADRC's three CLI fields don't map onto them one-to-one, but here's the closest correspondence, useful for building intuition rather than as an exact rule:

| Classic PID concept                                                        | Closest ADRC field                      | Raising it                                                            | Too high                                               | Too low                               |
| -------------------------------------------------------------------------- | --------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------- |
| P and D, raised together (locked ratio, can't trade one against the other) | `adrc_wc` — controller bandwidth        | Crisper, faster correction, shorter settling time                     | Oscillation/overshoot, motors "singing" on throttle-up | Floaty, sluggish                      |
| I (continuously estimated by the observer, optionally self-decaying) fused with the D-term filter cutoff        | `adrc_wo` — observer bandwidth          | Faster rejection of wind/prop-wash/CG-offset disturbance              | Gyro noise amplification — hover chatter/heat          | Laggy, "soft" recovery from bumps     |
| No classic equivalent — a model-calibration input, not a feel knob         | `adrc_b0` — control-input gain estimate | N/A (calibrates assumed motor authority, doesn't shape response feel) | Comparatively harmless: soft/underwhelming correction  | Can fight the loop toward instability |

_(Compare with [danusha2345's own P/I/D table](https://github.com/danusha2345/ADRC-betaflight/blob/master/README.md#how-it-works-repurposing-the-pid-fields) — that fork repurposes the classic `p`/`i`/`d` CLI fields directly to carry `wc`/`wo`/`b0`. **This implementation does not** — `adrc_wc`/`adrc_wo`/`adrc_b0` are dedicated fields, and the classic P/I/D cells stay inert zombies on an ADRC profile (see [Enabling ADRC](#enabling-adrc) above) — don't type ADRC values into them here.)_

Two mechanisms behind that table worth understanding, not just memorizing: the `wc` lock is a direct consequence of the control law `kp = wc²`, `kd = 2·wc` placing both closed-loop poles at the same repeated location `-wc` — the standard "critically damped" bandwidth simplification, not a coincidence. And `b0`'s asymmetry follows from the ESO's disturbance state `z3` silently absorbing whatever `b0` gets wrong: underestimating it makes the observer misattribute your own control action as "disturbance" (can fight the loop toward instability, like accidentally-too-high P); overestimating just leaves the correction slightly weak (like slightly-too-low P) — stable, just underwhelming. That's why "round up if unsure" is the safe default direction, not superstition.

One structural consequence worth internalizing: because `wc` locks P:D together and `wo` fuses I-and-filter into one number, ADRC has one fewer independently-tunable "feel" degree of freedom than classic 3-term PID, for a given axis. That's an intentional simplification (Gao's standard bandwidth-parameterized ADRC), not an oversight — the tradeoff for fewer, less-interacting knobs.

### Tuning procedure

A sensible starting order, adapted from the community procedure on danusha2345's fork:

1. **`adrc_b0`** — raise until the craft takes off stably and responds crisply; keep raising until you hear stuttering/chatter in hover, then back off ~20%. Over-estimating is fairly harmless; under-estimating causes instability.
2. **`adrc_wo`** — raise until chatter appears in hover (the observer starting to track gyro noise), then back off ~20%.
3. **`adrc_wc`** — if picking values from scratch, start around `wo ÷ 3` to `wo ÷ 5`, then treat it as a master responsiveness knob. Raise for a crisper feel until motors "sing" on throttle-up (chatter that gets _louder_ with RPM) — that's the noise ceiling, back off from there. Too low feels floaty/sluggish.

The shipped defaults (`60/100/2000`, yaw `wo=80`) trace to a real 5" control-bandwidth sweep on danusha2345's fork — see `ADRC_FIXES.md` there for the full derivation — and deliberately don't follow the `wo ≈ 3–5× wc` rule of thumb above (`100/60 ≈ 1.7×` for roll/pitch, `80/60 ≈ 1.3×` for yaw). That ratio is a starting point for picking a fresh pair when you have no other data; the shipped numbers came directly from the flight-tested sweep instead, which is a stronger anchor than the general heuristic where the two disagree. Still airframe-dependent, especially `b0` (motor/prop/weight response). A 65 mm whoop on the same fork's testing landed around `wc=33` / `wo=65` / `b0=3200` (`wo/wc ≈ 2.0×`, also below the 3–5× range) — a second real data point if your craft is nothing like a 5".

**Treat these as a flight-validated starting point, not a settled conservative default.** The goal, mirroring classic PID's own deliberately conservative 5" stock tune, is a default that sits on the conservative/safe edge of a _typical_ 5" freestyle quad's tuning range, so `pid_type = ADRC` is a credible drop-in rather than something that demands a retune before it's safe to arm — see `ADRC-022` in the [remediation tracker](https://github.com/danusha2345/ADRC-betaflight/blob/master/docs/ADRC_REMEDIATION_TRACKER.md) for current validation status. If you're tuning past the defaults, a shared blackbox log from matched maneuvers is directly useful — see the tracker for how to contribute one.

**Bench validation tip:** rather than judging a tune by feel alone, log the same maneuver (e.g. a takeoff) under a few candidate tunes and compare tracking-error RMS from the blackbox — the difference between tunes that "feel fine" separates clearly this way. danusha2345's fork has ready-made scripts for this: `docs/flight-test-analysis/adrc_tune_score.py` (ranks candidate tunes by takeoff pitch-error RMS) and `adrc_log_plot.py` (plots tracking error, disturbance estimate, motors, and ESO/gate state together).

**Liftoff gate thresholds** are a separate tuning pass from `wc`/`wo`/`b0` above — they're about _when_ the ESO trusts its own feedback, not the control response itself. The shipped defaults are one community-validated craft's values, not universal. At minimum, check `adrc_liftoff_throttle` against your actual hover throttle (`adrc_hover_throttle`) once you know it — set the former comfortably above the latter.

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

- **Flight-test history for this branch — every defect found, how it was root-caused, and its fix — is tracked externally rather than narrated here**, so this page doesn't need rewriting after every flight round. See the [remediation tracker](https://github.com/danusha2345/ADRC-betaflight/blob/master/docs/ADRC_REMEDIATION_TRACKER.md) for the full finding-by-finding record and current status, and [PR #15400](https://github.com/betaflight/betaflight/pull/15400) for the live thread. The rest of this section covers standing operational caveats that apply regardless of where testing currently stands.

- **`pid_at_min_throttle = OFF`** disables the controller entirely below the arming throttle threshold — sticks/tilts produce zero motor response until throttle is raised. The default `ON` is safe under ADRC because the liftoff gate already provides ground protection; only turn it off if you specifically want the "fully asleep at idle" behavior and understand the trade-off.
- **`dshot_bidir = ON`** has been observed to cause hard gyro freezes (thousands of identical gyro samples, momentarily uncontrollable) on at least one board/firmware-base combination. If your craft flies erratically or "acts possessed," try `set dshot_bidir = OFF` (you lose the RPM filter; the dynamic notch still works). Root cause not yet fixed upstream.
- Efficiency (current draw) versus classic PID for equivalent real flight has not been measured or documented anywhere — the props-off finding above doesn't generalize to real flight either way. If you want to compare, blackbox logs `energyCumulative` per flight; fly matched maneuvers on both `pid_type`s and compare.

### Known limitations

Open, not-yet-root-caused items — the b0 throttle-curve law itself (`ADRC-021`) and default-tune conservatism across typical 5" builds (`ADRC-022`) — are tracked with their current status and decision options in the [remediation tracker](https://github.com/danusha2345/ADRC-betaflight/blob/master/docs/ADRC_REMEDIATION_TRACKER.md#open-items) rather than duplicated here.

## More Information

**Live development status for this PR** — every review finding, its fix, test/flight evidence, and open items — is tracked separately from this page so it can be published without going stale as work continues:

- [ADRC review & remediation tracker](https://github.com/danusha2345/ADRC-betaflight/blob/master/docs/ADRC_REMEDIATION_TRACKER.md) — full finding-by-finding record, status, and open items
- [PR #15400](https://github.com/betaflight/betaflight/pull/15400) — the live upstream thread

For the full theory-vs-implementation review, fix-by-fix rationale, and ongoing real-flight test reports across multiple airframes, see danusha2345's fork:

- [`README.md`](https://github.com/danusha2345/ADRC-betaflight/blob/master/README.md)
- [`ADRC_FIXES.md`](https://github.com/danusha2345/ADRC-betaflight/blob/master/ADRC_FIXES.md)
- [Issue #1 — call for flight testers](https://github.com/danusha2345/ADRC-betaflight/issues/1)
- [Issue #2 — flight testing round 2 (ADRC v0.2.0)](https://github.com/danusha2345/ADRC-betaflight/issues/2), the current active thread for reporting logs and results

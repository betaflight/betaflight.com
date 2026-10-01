# ADRC (Active Disturbance Rejection Control)

ADRC is an experimental, opt-in alternative to classic PID rate control, selected per PID profile via `pid_type`. Instead of proportional/integral/derivative gains acting on error, ADRC runs a third-order **Extended State Observer (ESO)** that continuously estimates the craft's rotation rate, its derivative, and a lumped "everything else" disturbance term (motor/prop mismatch, wind, payload imbalance, CG offset), then drives a virtual PD law to cancel it. In principle this rejects disturbances faster and needs less per-craft tuning than classic PID.

:::info
**Not yet in an official Betaflight release.** This page documents an open pull request, [betaflight/betaflight#15400](https://github.com/betaflight/betaflight/pull/15400) — `pid_type = ADRC` does not exist in any stock Betaflight build (Configurator releases, official `master`) until that PR merges; `set pid_type = ADRC` will simply error out on a normal build — the CLI rejects `pid_type` as an unknown setting name, since the variable itself doesn't exist there. To try it now, flash one of the PR's [prebuilt hex releases](https://github.com/danusha2345/ADRC-betaflight/releases) — tester builds can run ahead of this page, so check the one you pick against this page's [CLI Reference](#cli-reference) before assuming full tunable parity; a newer build may add fields this page doesn't document yet. **Flashing a new build over an existing install can silently reset your PID profiles if the persisted-config version changed between builds — run `diff all` first if you want to keep your existing tune.**
:::

:::caution
Experimental. Classic PID is untouched and remains the default (`pid_type = CLASSIC`) — ADRC is opt-in per profile, so you can keep a known-good classic tune on one profile and try ADRC on another without risk to the first. Read the [Testing Notes](#testing-notes-read-before-flying) section before flying it.
:::

:::tip Test pilots welcome
Progress here depends on real flight-test data across a spread of typical builds — this guide is published ahead of the PR merging, for exactly that reason. Read [Testing Notes](#testing-notes-read-before-flying) first, then see **[How to help test](https://github.com/danusha2345/ADRC-betaflight/blob/master/docs/ADRC_REMEDIATION_TRACKER.md#how-to-help-test)** in the remediation tracker for the full finding-by-finding record, current state, test protocol and where to share logs.
:::

## What is ADRC, and why use it? {#what-is-adrc}

ADRC is an experimental, optional, complete replacement for PID. Instead of relying on static parameters or complicated aerodynamic models, it continuously estimates everything that is pushing on your quad and cancels it out in real time. External forces include things like wind, drag and prop wash, while internal dynamics include things like frame flex, battery voltage sag, a shifting center of gravity and unexpected propeller damage. ADRC lumps all of these into a single fictitious force called "disturbance" rather than trying to model each one separately. Because the controller is always adjusting for these forces, there are a few practical benefits:

- **Fewer re-tunes.** With PID, changes like mounting a heavy camera on top, carrying an unbalanced load or swapping propellers usually mean retuning. With ADRC, the craft handles the same way as long as your motors have enough power to make up the difference. Once it is tuned, it generally never needs re-tuning unless you make a very major hardware change.
- **Better resistance to being knocked off course.** A sudden gust or a bump is corrected automatically, so the pilot never has to respond. There are limits: the motors still need enough power, and a tiny whoop can't fly in a hurricane — it will just be noticeably harder to push around. This is probably most useful for something like a cinematic drone, where smooth flight matters most.
- **Forgiveness when things go wrong.** ADRC compensates for basically anything that makes the craft behave differently than expected. A crash that snaps off part of a propeller blade can still fly normally. This has happened a couple of times in testing, and the damage wasn't noticed until the drone was close enough to hear.

**Simpler tuning.** The tuning parameters are also a little easier to understand than PID's. The main one is a physical value specific to your craft — essentially how hard and how quickly it accelerates on each axis. The other two simply control how fast you want the craft to respond.

:::tip Coming from PID?
Early ADRC research describes it as an extension of PID, and you can think of it as a PID controller that constantly re-tunes itself. That is a simplification, but it is a somewhat reasonable way to think about how ADRC works.
:::

**A note on filters.** ADRC can interact in unexpected ways with some of the default filters. It is recommended to disable any filters that are not directly related to something physical on the craft: disable everything in the filter settings tab other than the gyro RPM filter and any notch filters that have been previously set to account for a frame resonance. See [Disable unnecessary filters](#disable-filters).

## Origins

- **[Boyyt357/ADRC-betaflight](https://github.com/Boyyt357/ADRC-betaflight)** — original proof-of-concept, ADRC replacing classic PID entirely.
- **This implementation** builds on the proof-of-concept as a dedicated, opt-in module (`src/main/flight/adrc.c`/`.h`) rather than inline PID code, with dedicated `uint16_t` CLI fields instead of repurposing the legacy P/I/D sliders, plus a dedicated pre-ESO gyro filter and an optional tracking differentiator (see below). All ADRC-specific logic — control law, state, tuning fields — lives in `adrc.c`/`adrc.h` by design; `pid.c`/`pid.h` only branch into it (a `pid_type` check or a plain-value `adrc*()` call), so classic PID's code path is unaffected in substance, not just by convention.
- Upstream tracking PR: **[betaflight/betaflight#15400](https://github.com/betaflight/betaflight/pull/15400)** — @danusha2345 has since joined as a direct collaborator and driven a substantial line-by-line review and hardening pass on top of the initial port; see the PR thread for the full, ongoing development process. The full finding-by-finding record (status, evidence, open items, fixes, rationales) lives in a dedicated [remediation tracker](https://github.com/danusha2345/ADRC-betaflight/blob/master/docs/ADRC_REMEDIATION_TRACKER.md) rather than in this page, so this guide stays accurate without having to track the PR's day-to-day progress.

## How It Works

Per axis, the ESO maintains three states from the (filtered) gyro reading and the previous control output:

- **z1** — estimated rotation rate (tracks the gyro)
- **z2** — estimated rate-of-change of rotation (a D-like term)
- **z3** — estimated lumped disturbance (an I-like term)

The control output is a virtual PD law: `u = (kp·(setpoint − z1) − kd·z2 − z3) / b0`, where `kp = wc²`, `kd = 2·wc`. Output is logged into the standard P/I/D blackbox fields for mixer/tooling compatibility, but the values don't carry their classic-PID meaning.

Three tunables set the whole thing per axis:

- **`adrc_wc`** — controller bandwidth (ωc). Higher = faster/crisper correction. The hard stability ceiling comes from motor lag — roughly `wc·τ ≈ 2`, where τ is the motor time constant — not from the `wc`/`wo` ratio. In most cases **`wc` should still stay below `wo`** (the firmware doesn't enforce it): pushing `wc` up to or past `wo` doesn't cause a sudden instability, but it reduces stability margins, adds overshoot and gives up disturbance rejection. Because `wc` normally sits below `wo`, and `wo` is limited by gyro noise (below), that noise ceiling effectively limits `wc` as well.
- **`adrc_wo`** — observer bandwidth (ωo). How fast the ESO tracks/estimates. Has a **practical ceiling set by gyro noise**, not by stability — set it as high as the craft's noise floor allows. If throttle-up produces a "singing"/chatter noise that gets louder with RPM, `wo` (and with it `wc`) is too high for your filtering. The `wc`/`wo` ratio trades disturbance rejection (lower ratio) against stick responsiveness (higher ratio) — see [Bandwidth ratio](#wc-wo-ratio).
- **`adrc_b0`** — control-input gain estimate: how hard and how quickly the craft accelerates per unit of command. In the second-order model the ESO uses, `b0` = (angular acceleration per unit of command) ÷ (motor time constant), so how quickly the motors respond matters as much as how hard they push — which is why whoops, with the fastest motors, have the largest `b0` values. Under-estimating causes instability; over-estimating is comparatively harmless (softer response).

On top of the core ADRC controller, this implementation adds a few extra mechanisms:

- **Liftoff gate** — while the craft is ground-constrained, the plant doesn't respond to output the way the model expects, so while the gate is closed the ESO's `b0·u` feedback is held at zero and the disturbance estimate z3 is only allowed to move toward zero, never grow. Without this, the observer winds up while grounded and has to unwind violently at liftoff. The gate opens on any one of three conditions:
  - **Commanded throttle** at or above `adrc_liftoff_throttle` (default 40%). This is the throttle the pilot — or an automatic mode such as ALT_HOLD or GPS Rescue — asked for, measured _before_ the mixer adds airmode headroom, so airmode raising the motors on the ground can't open the gate by itself.
  - **Sustained rotation** above `adrc_liftoff_gyro_dps` (default 20°/s, any axis) held for `adrc_liftoff_hold_ms` (default 25 ms) — the toss-launch path. This path also requires commanded throttle of at least half of `adrc_liftoff_throttle`; at idle the hold timer resets, so rotation on the ground can't be banked and completed by a later throttle blip. A toss launch at literally zero throttle therefore opens the gate once the throttle comes up, not on rotation alone.
  - **Applied throttle** (including airmode headroom) at or above `adrc_liftoff_throttle`, held for 250 ms or `adrc_liftoff_hold_ms`, whichever is longer — with the same requirement that commanded throttle is off idle.

   Once open, **the gate stays open until disarm — there is no mid-air re-arm**, because throttle+gyro alone can't reliably distinguish a real landing from a calm mid-air float. A repeated ground test (e.g. bench reps) needs an actual disarm/re-arm cycle, not just a return to idle throttle. See the [remediation tracker](https://github.com/danusha2345/ADRC-betaflight/blob/master/docs/ADRC_REMEDIATION_TRACKER.md) for the full reasoning. **`adrc_liftoff_throttle` has no built-in relationship to `adrc_hover_throttle`** below — they answer different questions ("how sure am I this throttle means I'm off the ground" vs. "where do I actually hover"). Set `adrc_liftoff_throttle` a bit _above_ your actual hover throttle rather than assuming the default fits your craft.
- **Gated z3 decay** (`adrc_gated_z3_decay`, default 200 = 20/s) — z3 remains a leaky integrator in either latch state. While the liftoff latch is closed, its decay rate is `max(adrc_gated_z3_decay × 0.1, adrc_sigma_decay × 0.1, 1.0/s)`. At the default `200` this is 20/s (τ ≈ 0.05 s), so the 1.0/s floor does not bind; with `adrc_gated_z3_decay = 0` and the default `adrc_sigma_decay = 3`, it is 1.0/s (τ ≈ 1 s). The decay works alongside the closed-gate z3 growth inhibit above: the inhibit stops z3 charging while grounded, and the decay pulls any remaining estimate back toward zero. Once the latch opens — even if it false-opens while the craft remains physically grounded — the inhibit lifts and the observer switches to `adrc_sigma_decay`.
- **Throttle-scaled b0** — thrust isn't linear in throttle, so the craft's real control gain changes with throttle. `b0` is scaled by `throttle / adrc_hover_throttle` above hover, using the curve selected by `adrc_b0_law` (`SQRT` by default; also `LINEAR`, `QUADRATIC`, or `FIXED` to turn scaling off), clamped to `adrc_b0_scale_max` (default 3×). `SQRT` or `LINEAR` have worked well on most hardware tested so far. The throttle feeding the schedule is low-passed at 2 Hz (~80 ms), so the scale doesn't modulate with the loop's own axis activity and doesn't collapse in the instant of a throttle chop. Below hover, `b0` is held at 100% by default; `adrc_b0_scale_min` (opt-in) lowers that floor so the observer sees the lower plant gain at low throttle, applied only after liftoff. The CLI range still allows raising the cap for experiments — see the [remediation tracker](https://github.com/danusha2345/ADRC-betaflight/blob/master/docs/ADRC_REMEDIATION_TRACKER.md) if you want the reasoning behind that curve and cap. With `thrust_linear > 0`, both this schedule and the liftoff-throttle gate read the forward-linearized collective rather than the mixer's raw inverse-compensated value, so the throttle they see matches actual thrust either way.
- **Crash and yaw-spin recovery hygiene** — crash detection (and with it GPS Rescue's crash handling) runs under ADRC even though the classic D gains it used to depend on aren't used. Crash Flip and Crash Recovery both fully reset the ESO/gate state around the recovery episode instead of leaving stale estimates to re-enter control afterward (Crash Flip in particular used to let the ESO learn the turtle-mode command and could open the liftoff gate from it). Yaw-spin recovery suppresses the disturbance estimate through its exit loop so the transition back to normal control doesn't kick a hidden `z3` back in as a sudden I-term jump.
- **z3 leaky decay** (`adrc_sigma_decay`) — while airborne, z3 bleeds a transient disturbance bump back toward zero at a configurable rate instead of holding it indefinitely. Set to 0 for a classic pure integrator.
- **Dedicated pre-ESO gyro low-pass** (`adrc_gyro_lpf_hz`) — classic PID's D-term has its own dedicated filter stage on top of the shared base gyro filter; ADRC's control law has no equivalent, and `kp = wc²` makes it more sensitive to whatever noise gets through than classic's linear gain is. This filter runs ahead of the ESO's error calculation only — the shared gyro filter chain upstream of it (dynamic notch, RPM filter, `gyro_lpf1`/`lpf2` static and dynamic lowpass) is untouched by `pid_type` entirely — it lives in the gyro-sampling task, not the PID loop, and runs identically for both control laws.
- **Tracking differentiator** (`adrc_td_hz`, off by default) — smooths the setpoint feeding the control law's P term before it drives the ESO, instead of feeding it through directly. Only affects what the controller steers toward, not the ESO's own gyro-tracking error. Ported from a separate, independent ADRC implementation ([SeverinBitterli/betaflight](https://github.com/SeverinBitterli/betaflight/tree/ADRC-Implementation)).
- **Actually-applied output feedback** — the observer's `b0·u` feedback term is fed the control output that actually reached the plant (post mixer-normalization, saturation, thrust-linearization, and automatic-mode throttle overrides), not the raw pre-mixer PID sum, so mixer clipping/normalization doesn't get misread as plant disturbance. Mixer authority scaling is consumed as a binary "was anything applied at all" signal (zero only when nothing was applied at all — motor-stop, Crash Flip), not as a proportional multiplier — see the [remediation tracker](https://github.com/danusha2345/ADRC-betaflight/blob/master/docs/ADRC_REMEDIATION_TRACKER.md) for why that distinction matters.
- **Numerical hardening** — the ESO's effective observer bandwidth is capped at runtime (`wo · dT ≤ 0.5`) so a high `adrc_wo` on a slow loop rate can't be pushed into an unstable discretization; `z1`/`z2` carry generous physical bounds purely to stop numerical divergence, wide enough that an ordinary snap/flip never approaches them (unlike `z3`, which is clamped to keep `|I| = |z3/b0|` from exceeding `pidsum_limit` — the ADRC equivalent of classic PID's I-term windup limit, and the only one of the three states that actually accumulates); and any non-finite state (NaN/Inf, possible under `-ffast-math`) is detected and the affected axis reset from the current gyro reading rather than propagating garbage.
- **Bumpless liftoff-gate handover** — opening the gate (at first liftoff) drops exactly one stale ground-epoch control-output sample instead of feeding it to the observer as `b0·u`, removing a transient that otherwise showed up as a brief oscillation bout right at the moment of takeoff.
- **Fresh ESO epoch every arm cycle** — the per-axis ESO state and the liftoff gate unconditionally reset on every disarm→arm transition, independent of `pid_at_min_throttle`. (With the stock default `pid_at_min_throttle = ON`, the only other reset path is dead code while disarmed, so without this a wound-up `z3` and an open gate could silently survive a power-cycle-internal disarm/re-arm.)
- **Ground controller bandwidth** (`adrc_ground_wc`, default 10) — with airmode, the control loop can close through the airframe and the ground contact on arm, with a loop gain of `2·wc·wo/b0`, and a small craft can hop or lift itself off with no throttle commanded. While the liftoff gate is closed, all axes use `adrc_ground_wc` instead of the flight `wc`, then ramp to the flight value over `adrc_wc_ramp_ms` (default 100 ms) once the gate opens. `adrc_ground_dgain` (default 40 = 4.0) additionally caps the ground `wc` at `adrc_ground_dgain × 0.1 × b0 / (2·wo)`, which lowers it automatically on tunes where `adrc_ground_wc` alone would still be too lively; on most tunes flown so far the cap doesn't bind. See [Perform ground arm tap test](#ground-tap-test).
- **z3 growth inhibit during mixer saturation** (`adrc_sat_z3_inhibit`, opt-in, default `OFF`) — when the mixer can't deliver the commanded moment (a motor pinned at the floor and one at the ceiling), the ESO books the undelivered moment as disturbance on all three axes, and sustained clipping can wind z3 up to its limit in a fraction of a second — seen as a "yaw washout" excursion, mostly on whoops. With this on, z3 may only move toward zero while the mixer clipped on the previous loop, the same rule the liftoff gate applies on the ground. It has no effect on a craft whose mixer never clips; the trade-off is that a real disturbance during saturation isn't learned until the mixer frees up.

## Enabling ADRC

```
set pid_type = ADRC
```

This is per-profile — other profiles keep `pid_type = CLASSIC` (the default) untouched.

**ADRC is CLI-only, and every classic-PID Configurator control turns into a zombie on an ADRC profile.** There's no dedicated GUI screen for `adrc_*` tunables yet — you read and set all of them (`adrc_wc`/`adrc_wo`/`adrc_b0`, the gyro filter, the liftoff-gate thresholds, everything in the [CLI Reference](#cli-reference) below) through the CLI tab, `set`/`get`, or `diff`/`dump`. Meanwhile the Configurator's **PID Tuning tab** (P/I/D/F sliders, D Max, TPA) and the D-term-specific rows on the **Filter tab** (`dterm_lpf1`/`lpf2`) don't grey out, don't hide, and don't warn you — they keep computing and displaying numbers exactly as if you were still on classic PID. None of that computation reaches the mixer: `pid.c` runs the classic P/I/D/D-term-filter/TPA calculation unconditionally regardless of `pid_type` (to keep classic PID's code path byte-identical), then simply overwrites the result with ADRC's output before it's used, on an ADRC profile. Anti-gravity and the zero-throttle I-term reset heuristic are the exceptions — they're explicitly skipped rather than computed-then-discarded — but the practical effect is the same: **drag any of those sliders on an ADRC profile and the craft won't respond, with nothing in the UI telling you why.** (The throttle-scaled `b0` — `adrc_b0_law`/`adrc_hover_throttle`/`adrc_b0_scale_max` — is ADRC's own equivalent of TPA, set via CLI like everything else.)

**The rest of the Filter tab is not a zombie — it's fully live for ADRC too.** The dynamic notch, RPM filter, and `gyro_lpf1`/`lpf2` static/dynamic lowpass all run in the gyro-sampling task, upstream of and completely independent from the PID loop (`gyro.c` has no knowledge of `pid_type` at all), so they affect ADRC's ESO input exactly as they affect classic PID's. Only the D-term-specific rows above are dead; everything else on that tab still reaches the observer. Because every filter adds delay to what the observer sees, the recommended setup is to disable all of them except the ones tied to something physical on the craft — the gyro RPM filter and any notches placed on a known frame resonance. See [Quick Start — Step 3](#disable-filters).

**Simplified Tuning's PID sliders are actually harmless, not just inert-and-silent, and it's worth knowing why — but its gyro-filter slider is live.** If ADRC's gains were stored in the classic `p`/`i`/`d` fields, Simplified Tuning (which recalculates those same fields) would silently overwrite the tune on save. This implementation uses dedicated `adrc_wc`/`adrc_wo`/`adrc_b0` fields specifically to avoid that trap: Simplified Tuning only ever recalculates `pid[axis].P/I/D/F` and `d_max[axis]` — the same already-zombie fields described above — so on an ADRC profile it's just recomputing numbers nobody reads, never the `adrc_*` fields themselves.

**`pid_type` is a disarmed-only configuration change**, exactly like editing any other field in a PID profile — it is not a supported in-flight handover between control laws. Switching a profile's `pid_type` (or switching to a different profile with a different `pid_type`) while disarmed clears both the classic I-term and the full ADRC state (observer + gate). If the transition happens while armed — some adjustment ranges legitimately re-run the init path in flight — the classic I-term still clears unconditionally, but the liftoff gate/latch is deliberately left alone rather than reset, since there's no safe way to re-validate ground contact mid-air. Either way, don't rely on toggling into or out of ADRC while armed.

**Not available on STM32F446-based targets** — that MCU's flash is within ~3 KB of full with the default feature set and ADRC doesn't fit, so `USE_ADRC` is excluded there at compile time; those boards run classic PID only. The persisted profile layout is unaffected on every target either way.

**F411 boards running an 8 kHz PID loop have an unproven cycle budget.** ADRC's extra per-loop math has been measured to fit within F405/F411 flash comfortably; timing headroom at F411's fastest supported loop rate is tracked as an [external acceptance criterion](https://github.com/danusha2345/ADRC-betaflight/blob/master/docs/ADRC_REMEDIATION_TRACKER.md#external-acceptance-criteria-still-pending) in the remediation tracker. If you're on an F411 board at 8 kHz, watch for scheduler overruns / loop-time warnings particularly closely, or stay at a lower `pid_process_denom` until that's confirmed.

## Quick Start {#quick-start}

This section covers setting up ADRC and getting a first tune flying. It uses two browser-based tools from [ADRC utils](https://jmsweng.github.io/ADRC-utils/):

- **[Plant fit](https://jmsweng.github.io/ADRC-utils/Plant%20fitting/)** — upload a Betaflight blackbox CSV from a chirp flight to identify the roll, pitch and yaw plant and get `b0` estimates as a starting point for tuning.
- **[Tuning sandbox](https://jmsweng.github.io/ADRC-utils/ADRC%20demo/)** — an interactive step-response simulator. Drag sliders to see how the control parameters influence step response and disturbance recovery, and adjust dynamics such as disturbance magnitude, sensor noise and motor lag.

:::info Firmware version
This procedure uses `adrc_b0_law` and `adrc_ground_wc`, which were added in the **b11** tester builds. Check that your build has them (`get adrc_ground_wc`) before starting — see the [CLI Reference](#cli-reference).
:::

### TL;DR: I just want to get flying {#tldr}

- ADRC has three parameters: nominal control gain (`b0`), observer bandwidth (`wo`) and control bandwidth (`wc`). The `b0` parameter is hardware dependent. The ratio between observer and controller bandwidth represents a trade-off between disturbance rejection and control responsiveness.
- Perform a flight using PID controls, note the % throttle needed to hover, and execute a chirp command on each axis — or just fly around and make sure there are a fair number of oscillations on each axis.
- Switch to ADRC and set the hover throttle % using the Betaflight CLI:

  ```
  set adrc_hover_throttle = <your_hover_throttle>
  set pid_type = ADRC
  save
  ```

- Disable all PID filters except for motor RPM (see [Disable unnecessary filters](#disable-filters)).
- Use the [plant fit](https://jmsweng.github.io/ADRC-utils/Plant%20fitting/) tool to obtain `b0` values. Make sure the _ctrl-free_ and _eRPM_ values are reasonably close to one another. Multiply these by two and use them as the `adrc_b0` parameters for each axis. Set `wc` to 80 and `wo` to 90 on each axis:

  ```
  set adrc_b0_roll = <calculated_roll_b0>
  set adrc_b0_pitch = <calculated_pitch_b0>
  set adrc_b0_yaw = <calculated_yaw_b0>
  set adrc_wc_roll = 80
  set adrc_wc_pitch = 80
  set adrc_wc_yaw = 80
  set adrc_wo_roll = 90
  set adrc_wo_pitch = 90
  set adrc_wo_yaw = 90
  save
  ```

- If flying with `pid_at_min_throttle = ON` (Betaflight default), the first time you arm, physically tap on the craft a few times using a stick. If it starts hopping, lifting, or tries to fly away, **immediately disarm** and reduce `adrc_ground_wc` to a lower value (the default is 10) using the Betaflight CLI:

  ```
  set adrc_ground_wc = <lower_value>
  save
  ```

  Repeat the tap test, and keep reducing this value until the craft no longer hops or lifts. **Do not** set it to 0 if the craft bounces on the ground, as that disables the oscillation prevention entirely. See [Perform ground arm tap test](#ground-tap-test).

### The control parameters {#parameter-reference}

#### `b0` — nominal control gain

_Set per axis._

This is the most important parameter, as it gives the controller an estimate of how each axis responds for a given input. Think of it as how hard and how quickly the controller expects the craft to accelerate per unit of command. Both parts matter: how hard the motors push and how quickly they respond. That's why whoops, with the fastest motors, have the largest `b0` values.

It only needs to be a reasonably close ballpark estimate, as a gap between the craft's actual gain (_b_) and the control gain is lumped into the disturbance estimate. However, if `b0` is too far off the actual _b_, the mismatch can exceed what the controller is able to correct, resulting in motor oscillations, tracking lag and instability. This value can be determined by fitting a blackbox log with the [plant fit](https://jmsweng.github.io/ADRC-utils/Plant%20fitting/) tool.

#### `wo` — observer bandwidth

_Set per axis. Units: rad/s._

This governs how fast the observer is able to detect and estimate disturbances. It is limited by gyro noise and frame vibrations: setting it too high will eventually cause the observer to pick up sensor noise and normal vibrations, leading to excessive erroneous corrections, wasted battery, motor heating and oscillations. If it is too low, the craft will respond slowly to disturbances. As a rule of thumb, set it as high as the craft's noise floor allows.

#### `wc` — controller bandwidth

_Set per axis. Units: rad/s._

This governs how fast the controller attempts to adjust the craft. If it is too low, the craft will be sluggish and respond slowly to inputs. If it is too high, the craft will feel twitchy and can overshoot commanded movements. This is _similar_ but not exactly the same as the P gain in a PID controller. In most cases **it should stay below the observer bandwidth** — the firmware doesn't enforce this. Going above it doesn't cause a sudden instability, but it reduces stability margins and increases overshoot.

#### `adrc_b0_law` — scaling for `b0`

_Accepted values: `QUADRATIC`, `LINEAR`, `SQRT`, `FIXED`. Default: `SQRT`._

This scales the nominal control gain (`b0`) based on throttle. Because thrust is slightly nonlinear with throttle, the craft's actual gain varies with throttle position. The optimal scaling law depends on the specific hardware configuration; for most tested configurations, either `SQRT` or `LINEAR` performs well. `FIXED` disables this function.

#### `adrc_hover_throttle` — throttle % at which the craft hovers

_Default: 35%._ This is the throttle % at which the `b0` scaling law kicks in. It does nothing if `adrc_b0_law` is `FIXED`.

:::important
The `wc`/`wo` ratio represents a trade-off between disturbance rejection and responsiveness. Setting `wc` much lower than `wo` (around 30–50%) results in a slower response to control inputs, but better rejects disturbances. A higher `wc`/`wo` ratio (around 90%) results in a faster response, but rejects disturbances more slowly and may overshoot more. A 5" craft at a `wc`/`wo` ratio of 0.9 (low disturbance rejection) is still able to fly with missing propeller blades. See [Bandwidth ratio](#wc-wo-ratio).
:::

### Tuning procedure overview

The step-by-step procedure — baseline PID flight, calculating `b0`, filter setup, applying the parameters and the ground arm tap test — is in [Tuning procedure](#tuning-procedure) below. Once initial setup is done, refine the tune with the tables that follow.

### Parameter tuning table

| Setting | What it does | If it's too high | If it's too low | Rule of thumb |
| --- | --- | --- | --- | --- |
| Observer bandwidth (`wo`) | How quickly the craft notices things like wind gusts or extra weight. | The craft overreacts to tiny vibrations. The motors buzz and twitch, run hot, and drain the battery faster. | The craft is slow to notice wind or changes, so it drifts and wobbles before correcting. | Increase it until the motors start sounding rough, then turn it back down a bit. |
| Controller bandwidth (`wc`) | How quickly and firmly the craft responds to commands and corrections. | The craft is twitchy and overshoots its target. It can start oscillating and potentially lose stability. | The craft feels sluggish to respond to commanded movements and hold position. | Start low and increase gradually until the craft feels crisp but not twitchy. |
| Nominal control gain (`b0`) | The controller's estimate of how hard and how quickly the craft accelerates per unit of command. | The controller doesn't request motor power quickly enough, so the craft feels sluggish and soft. | The controller requests motor power too quickly, so the craft overshoots or oscillates. This causes instability. | If unsure, guess a little high. Sluggish and stable is safer than twitchy and unstable. |

### Bandwidth ratio {#wc-wo-ratio}

| State / range | Ratio value (`wc / wo`) | Flight behavior & primary effect | Potential risks / downsides |
| --- | --- | --- | --- |
| Too low | &lt; 0.30 | Highly damped and sluggish stick response; observer runs much faster than control action. | The craft feels unresponsive and delayed on stick inputs. |
| High rejection (conservative) | ≈ 0.30 – 0.50 | Prioritizes rejecting external forces, wind, prop wash and frame anomalies. | Slower response to pilot control inputs. |
| High responsiveness (aggressive) | ≈ 0.80 – 0.90 | Fast tracking to stick inputs with minimal lag. | Slower disturbance rejection (though a 0.9 ratio on a 5" craft can still fly with damaged or missing prop blades). |
| Too high (marginal) | &gt; 0.90 – 0.95 | Extremely reactive, twitchy feel; can feel over-sensitive to stick inputs. | Prone to overshoot on aggressive maneuvers; disturbance rejection becomes sluggish. |
| At or above `wo` | ≥ 1.0 (`wc` ≥ `wo`) | Controller attempts to make physical adjustments faster than the observer can detect and estimate disturbances. | Reduced stability margins and more overshoot. The firmware doesn't enforce `wc` < `wo`. |

:::tip Try it
The [interactive tuning sandbox](https://jmsweng.github.io/ADRC-utils/ADRC%20demo/) lets you drag `wc`, `wo` and `b0` on a simulated rate loop and watch the step response and disturbance recovery change.
:::

## CLI Reference

| Variable                           | Default            | Range                                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------------------------------- | ------------------ | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pid_type`                         | `CLASSIC`          | `CLASSIC`, `ADRC`                      | Selects the rate control law for this PID profile. `CLASSIC` is the standard P/I/D/F loop. `ADRC` is an experimental alternative that replaces the classic P/I/D/F, D-term filter, D Max and TPA computation with an Extended State Observer and virtual PD law, tuned via `wc`/`wo`/`b0` instead                                                                                                                                                                                                                                                                                            |
| `adrc_wc_roll` / `_pitch` / `_yaw` | 60 / 60 / 60       | 5–300                                  | Controller bandwidth ωc per axis. Raising it gives a crisper, faster response. Too high: oscillation/overshoot. Too low: floaty, sluggish. In most cases, keep it below `wo`. The `wc`/`wo` ratio is a trade-off between disturbance rejection and control responsiveness: a lower ratio prioritizes disturbance rejection, a higher ratio prioritizes responsiveness (see [Bandwidth ratio](#wc-wo-ratio))                                                                                                                                                                                  |
| `adrc_wo_roll` / `_pitch` / `_yaw` | 100 / 100 / 80     | 10–600                                 | Extended State Observer bandwidth ωo per axis (yaw defaults lower) — how fast the ESO tracks/estimates the state. Too high: gyro noise amplification — hover chatter/heat. Too low: laggy, 'soft' recovery from bumps. Set it as high as possible for a given hardware setup                                                                                                                                                                                                                                                                                                                 |
| `adrc_b0_roll` / `_pitch` / `_yaw` | 2000 / 2000 / 2000 | 100–65535                              | Control-input gain estimate per axis: how much acceleration the controller expects for a given input. A physical property, not a control-feel knob; roughly scales with motor KV × thrust ÷ mass. The [plant fit](https://jmsweng.github.io/ADRC-utils/Plant%20fitting/) tool is recommended for determining it. Only needs to be a ballpark estimate, but if it's too far off the craft's actual gain (_b_), the observer treats the difference as a disturbance and can create oscillations. Under-estimation is more likely to cause oscillation and instability, so err on the high side |
| `adrc_gyro_lpf_hz`                 | 150                | 0–LPF_MAX_HZ                           | Pre-ESO gyro low-pass cutoff, applied to the gyro signal feeding the ESO's error calculation only (0 = disabled, pass-through). Reduces sensor noise passed to the controller. The shared gyro filters on the Filter tab (dynamic notch, RPM filter, gyro lowpass 1/2) are untouched by this and run identically for both control laws                                                                                                                                                                                                                                                       |
| `adrc_hover_throttle`              | 35                 | 5–100                                  | Throttle % at hover. Motor authority scales with throttle, so `b0` is scaled above this value using `adrc_b0_law`, clamped to `adrc_b0_scale_max`                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `adrc_sigma_decay`                 | 3 (=0.3/s)         | 0–100                                  | Airborne z3 decay ×0.1. While airborne, z3 (the ESO's estimated disturbance) bleeds a transient bump back toward zero at this rate instead of holding it indefinitely. 0 = classic pure integrator — default 0.3/s, τ ≈ 3 s                                                                                                                                                                                                                                                                                                                                                                  |
| `adrc_td_hz`                       | 0                  | 0–LPF_MAX_HZ                           | Tracking-differentiator corner frequency. Smooths inputs before the controller reacts to them, so the motors get a smooth ramp rather than a sharp kick. 0 = disabled. Unvalidated, ported from a third-party ADRC implementation                                                                                                                                                                                                                                                                                                                                                            |
| `adrc_liftoff_throttle`            | 40                 | 1–100                                  | Throttle % that alone confirms liftoff (opens the gate). Has no built-in relationship to `adrc_hover_throttle` — set it comfortably above your actual hover throttle once you know it, rather than assuming the default fits your craft. See the liftoff gate note in [How It Works](#how-it-works)                                                                                                                                                                                                                                                                                          |
| `adrc_liftoff_gyro_dps`            | 20                 | 1–255                                  | Sustained rotation (°/s, any axis) that alone confirms liftoff — the toss-launch path, for when throttle alone hasn't crossed `adrc_liftoff_throttle` yet                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `adrc_liftoff_hold_ms`             | 25                 | 0–5000                                 | How long the sustained rotation above must hold before it counts as confirming liftoff — filters out brief bumps and handling from being mistaken for a toss launch                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `adrc_gated_z3_decay`              | 200 (=20.0/s)      | 0–2000                                 | Grounded z3 decay ×0.1. z3 is still a leaky integrator of the observer error regardless of gate state; while grounded it decays at this rate so it can't quietly wind up during a long armed-idle period. Never applied slower than `adrc_sigma_decay` — a low or zero value here is floored up to match it. Effective decay is `max(adrc_gated_z3_decay × 0.1, adrc_sigma_decay × 0.1, 1.0/s)`                                                                                                                                                                                              |
| `adrc_b0_scale_max`                | 3                  | 1–50                                   | Ceiling on the `b0` scaling law — ADRC's own equivalent of TPA. The default sits on the conservative side. CLI range allows raising it for experiments                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `adrc_b0_scale_min`                | 100                | 20–100                                 | Floor of `b0` below hover, in percent. Changes behavior when throttle is below hover. 100 = `b0` never goes below 100% (off). Lower values let the observer see the lower plant gain at low throttle. Applies only after liftoff                                                                                                                                                                                                                                                                                                                                                             |
| `adrc_b0_law`                      | `SQRT`             | `QUADRATIC`, `SQRT`, `LINEAR`, `FIXED` | Shape of the throttle-to-`b0` schedule above hover: `QUADRATIC` (throttle/hover)², `LINEAR`, `SQRT`, or `FIXED` (no scheduling). The optimal law varies by craft; `SQRT` or `LINEAR` generally work best                                                                                                                                                                                                                                                                                                                                                                                     |
| `adrc_ground_wc`                   | 10                 | 0–255                                  | `wc` used on all axes while the liftoff gate is closed, ramped to the flight `wc` after liftoff. Prevents unintended lifting or hopping on arm in airmode, which can lead to a flyaway while the control loop is still closed through ground contact. 0 = off (not recommended). Lower it if the craft bounces in the tap test. See [Perform ground arm tap test](#ground-tap-test)                                                                                                                                                                                                          |
| `adrc_wc_ramp_ms`                  | 100                | 0–5000                                 | Time (ms) to ramp from `adrc_ground_wc` to the flight `wc` after the liftoff gate opens. 0 = switch immediately                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `adrc_ground_dgain`                | 40 (=4.0)          | 0–100                                  | Ground D gain cap ×0.1. Keeps the quad calm on the ground by limiting reactions to small movements before takeoff. On tunes where `adrc_ground_wc` alone would still be too twitchy, this lowers ground `wc` automatically. 0 = off. On most tunes tested so far it has no effect                                                                                                                                                                                                                                                                                                            |
| `adrc_sat_z3_inhibit`              | `OFF`              | `OFF`, `ON`                            | `ON`: while the mixer clipped on the previous loop (a motor pinned at the floor and one at the ceiling), the disturbance estimate z3 may only move toward zero — the same rule the liftoff gate applies on the ground. Sustained clipping winds z3 up on all axes, which shows up as a 'yaw washout' (seen mostly on whoops). No effect on a craft whose mixer never clips                                                                                                                                                                                                                   |

All are profile-specific and show up in `diff`/`dump`.

## Tuning

There's no dedicated Configurator screen yet — set values via CLI.

:::note More detailed tuning procedure in progress
A more detailed, advanced tuning procedure is being worked on. Until it's published, the [tuning procedure](#tuning-procedure) below is the recommended way to tune ADRC.
:::

### If you're coming from classic PID

Classic PID gives you three independently adjustable knobs. ADRC's three CLI fields don't map onto them one-to-one, but here's the closest correspondence, useful for building intuition rather than as an exact rule:

| Classic PID concept                                                                                      | Closest ADRC field                      | Raising it                                                            | Too high                                               | Too low                               |
| -------------------------------------------------------------------------------------------------------- | --------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------- |
| P and D, raised together (locked ratio, can't trade one against the other)                               | `adrc_wc` — controller bandwidth        | Crisper, faster correction, shorter settling time                     | Oscillation/overshoot, motors "singing" on throttle-up | Floaty, sluggish                      |
| I (continuously estimated by the observer, optionally self-decaying) fused with the D-term filter cutoff | `adrc_wo` — observer bandwidth          | Faster rejection of wind/prop-wash/CG-offset disturbance              | Gyro noise amplification — hover chatter/heat          | Laggy, "soft" recovery from bumps     |
| No classic equivalent — a model-calibration input, not a feel knob                                       | `adrc_b0` — control-input gain estimate | N/A (calibrates assumed motor authority, doesn't shape response feel) | Comparatively harmless: soft/underwhelming correction  | Can fight the loop toward instability |

_(`adrc_wc`/`adrc_wo`/`adrc_b0` are dedicated fields, and the classic P/I/D cells stay inert zombies on an ADRC profile (see [Enabling ADRC](#enabling-adrc) above) — don't type ADRC values into them.)_

Two mechanisms behind that table worth understanding: the `wc` lock is a direct consequence of the control law `kp = wc²`, `kd = 2·wc` placing both closed-loop poles at the same repeated location `-wc` — the standard "critically damped" bandwidth simplification, not a coincidence. And `b0`'s asymmetry follows from the ESO's disturbance state `z3` silently absorbing whatever `b0` gets wrong: underestimating it makes the observer misattribute your own control action as "disturbance" (can fight the loop toward instability, like accidentally-too-high P); overestimating just leaves the correction slightly weak (like slightly-too-low P) — stable, just underwhelming. That's why "round up if unsure" is the safe default direction, not superstition.

One structural consequence worth internalizing: because `wc` locks P:D together and `wo` fuses I-and-filter into one number, ADRC has one fewer independently-tunable "feel" degree of freedom than classic 3-term PID, for a given axis. That's an intentional simplification (Gao's standard bandwidth-parameterized ADRC), not an oversight — the tradeoff for fewer, less-interacting knobs.

### Tuning procedure {#tuning-procedure}

For what each parameter does, see [The control parameters](#parameter-reference); use the [parameter tuning table](#parameter-tuning-table) and [bandwidth ratio](#wc-wo-ratio) table to refine from here.

Because the gain of a particular craft is specific to its hardware configuration (mostly the motors and propellers), there is no universal setting that works reasonably well across all builds, unlike the stock PID settings. The easiest way to determine these values is from a blackbox log recorded during a test flight on the stock PID settings.

#### Record baseline PID flight & gather data

Fly the craft using standard PID controls. Note the throttle percentage required to maintain a hover. During the flight, execute the chirp command used for PID autotune on each axis, or fly around with a fair number of movements on each axis. The baseline flight should basically be a hover with some wobbles commanded on each axis.

#### Calculate `b0` values from the recorded baseline flight

Run the recorded blackbox log through the [plant fit](https://jmsweng.github.io/ADRC-utils/Plant%20fitting/) tool to determine the nominal control gain (`b0`). The output includes several plots showing the points used for the fit along with the fit itself. Below is an example of a fit performed on the baseline flight from a 5" craft.

![Plant fitting output for roll, pitch and yaw: recovered gain against frequency, with the controller-free fit band, controller-free fit and eRPM path.](/img/adrc/plant-fit-example.png)

_Example plant-fitting output from a 5" drone baseline flight._

Make sure the fit output looks reasonable: the fit curves should overlap reasonably with the points used for the fit. Also check that the calculated _ctrl-free_ and _eRPM_ values are reasonably close to each other. If the fits on the plot don't line up well, or the ctrl-free and eRPM values are very far apart, redo the baseline PID flight with more movement on each axis.

These output values correspond to fairly conservative control parameters for use with an observer bandwidth (`wo`) around 50–60. **Multiply each value by two** — these are your initial values for `b0`.

:::note Fit warnings
Occasionally the output includes a warning like:

```
[WARNING: yaw] 2nd pole above the excited band
```

This most frequently occurs on the yaw axis. It means the axis was not excited enough for a proper fit — in the example plots above, the controller-free and eRPM fits diverge slightly at lower frequency. It may be corrected by adjusting the chirp parameters or including more yaw movement in the test flight. Because `b0` does not need to be exact, in most cases the value can still be used and the baseline flight does not need to be repeated. This has not been found to matter so far in testing.
:::

#### Disable unnecessary filters (optional) {#disable-filters}

Filters used by PID control can interact in unexpected ways with ADRC, because they introduce a slight delay to what the observer sees and can cause the controller to correct for disturbances too slowly. Navigate to the **PID Tuning → Filter Settings** tab and disable all PID filters (lowpass filters, dynamic notch, D-term filters). Keep only physical, hardware-related filters enabled, such as the **motor / gyro RPM filter** and any manual notch filters tuned for known structural frame resonances. Leave `adrc_gyro_lpf_hz` at its default.

#### Switch controller and apply parameters

Open the Betaflight CLI and run the following commands, substituting your calculated `b0` values and measured hover throttle:

```
set pid_type = ADRC
set adrc_hover_throttle = <your_hover_throttle>
set adrc_b0_roll = <calculated_roll_b0>
set adrc_b0_pitch = <calculated_pitch_b0>
set adrc_b0_yaw = <calculated_yaw_b0>
set adrc_wc_roll = 80
set adrc_wc_pitch = 80
set adrc_wc_yaw = 80
set adrc_wo_roll = 90
set adrc_wo_pitch = 90
set adrc_wo_yaw = 90
save
```

The `wc`/`wo` values of 80/90 provide fairly responsive controls and are a good starting place for further tuning if desired.

#### Perform ground arm tap test {#ground-tap-test}

This is only necessary if the control loop is active on the ground (Betaflight default). If `pid_at_min_throttle = OFF`, this step isn't needed.

If the control loop is active on the ground, the craft can lift or hop by itself right after arming in airmode. This mostly occurs on smaller craft. It shows up as the craft bouncing or hopping on the ground and then abruptly flying away when no throttle is commanded. `adrc_ground_wc` sets the controller bandwidth to a low value while on the ground. It prevents unintended lifting or hopping on arm in airmode, which can lead to a flyaway while the control loop is still closed through ground contact. By default `adrc_ground_wc = 10`, which should prevent this from occurring.

To make sure this can't happen on your craft, arm it and, with no throttle commanded, physically tap on it a couple of times **using a stick**. Lifting the back slightly and letting it drop also works. If the craft starts bouncing on the ground during this test, reduce `adrc_ground_wc` until it stops, for example:

```
set adrc_ground_wc = 5
save
```

:::danger
Setting `adrc_ground_wc` to 0 disables this protection. **Do not set this value to 0** if the craft bounces on the ground during this test, as it will unpredictably fly away when armed.
:::

:::tip Done
Initial ADRC setup is now complete.
:::

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

- **Flight-test history for this branch — every defect found, how it was root-caused, and its fix — is tracked externally rather than narrated here**, so this page doesn't need rewriting after every flight round. See the [remediation tracker](https://github.com/danusha2345/ADRC-betaflight/blob/master/docs/ADRC_REMEDIATION_TRACKER.md) for the full finding-by-finding record and current state, and [PR #15400](https://github.com/betaflight/betaflight/pull/15400) for the live thread. The rest of this section covers standing operational caveats that apply regardless of where testing currently stands.
- **Want to help test?** See **[How to help test](https://github.com/danusha2345/ADRC-betaflight/blob/master/docs/ADRC_REMEDIATION_TRACKER.md#how-to-help-test)** in the remediation tracker for the current test protocol and where to share logs.
- **`pid_at_min_throttle = OFF`** disables the controller entirely below the arming throttle threshold — sticks/tilts produce zero motor response until throttle is raised. The default `ON` provides additional ground protection under ADRC via the liftoff gate and `adrc_ground_wc`. Only turn it off if you specifically want the "fully asleep at idle" behavior and understand the trade-off. With it `ON`, run the [ground tap test](#ground-tap-test) before your first flight on a new tune.
- **`dshot_bidir = ON`** has been observed to cause hard gyro freezes (thousands of identical gyro samples, momentarily uncontrollable) on at least one board/firmware-base combination. If your craft flies erratically or "acts possessed," try `set dshot_bidir = OFF` (you lose the RPM filter; the dynamic notch still works).
- **If the motors are audibly oscillating at idle right after arming, disarm immediately.** Earlier builds could self-oscillate on the ground at idle with a high `adrc_wo`, and the liftoff gate could misread that oscillation as a real liftoff. This has been resolved: the gate no longer opens on airmode headroom or on rotation at idle throttle, z3 can't grow while the gate is closed, and `adrc_ground_wc` keeps the controller bandwidth low on the ground (see the liftoff gate and ground controller bandwidth in [How It Works](#how-it-works)). If a craft still bounces or oscillates on arm, lower `adrc_ground_wc` as described in the [ground arm tap test](#ground-tap-test).
- **Prefer arming an ADRC profile in ACRO, especially when using airmode.** If the craft is resting tilted, ANGLE commands a non-zero rate immediately. With `pid_at_min_throttle = ON`, the motors can answer at idle and make the craft skid or bounce even though stick throttle remains at 0%. If the liftoff latch is already open or false-opens during that motion, ADRC uses the configured airborne z3 decay while ground contact constrains the plant, so the observer can accumulate a disturbance estimate and compound the bounce. In one same-craft, one-arm-per-condition comparison, ADRC with permanent airmode reached motor saturation while CLASSIC with permanent airmode settled; however, the CLASSIC box-airmode arm also bounced and BOXAIRMODE state is not logged, so this comparison does not quantify the ADRC-specific share. Arm on level ground in ACRO and disarm immediately if the craft moves or oscillates at idle.
- If you want to compare efficiency (current draw) against classic PID, blackbox logs `energyCumulative` per flight — fly matched maneuvers on both `pid_type`s and compare. The props-off heat finding above doesn't generalize to real flight either way.

### Known limitations

- **Choosing the `b0` throttle-curve law** (`adrc_b0_law`) — the best law depends on the craft, and there's currently no good systematic way to determine it other than test flying each option and comparing. `SQRT` (the default) or `LINEAR` have worked well on most setups tested so far.
- For the current development status, see the remediation tracker's [open items](https://github.com/danusha2345/ADRC-betaflight/blob/master/docs/ADRC_REMEDIATION_TRACKER.md#open-items).

## More Information

**Live development status for this PR** — every review finding, its fix, test/flight evidence, and open items — is tracked separately from this page so it can be published without going stale as work continues:

- [ADRC review & remediation tracker](https://github.com/danusha2345/ADRC-betaflight/blob/master/docs/ADRC_REMEDIATION_TRACKER.md) — full finding-by-finding record, status, and open items
- [PR #15400](https://github.com/betaflight/betaflight/pull/15400) — the live upstream thread


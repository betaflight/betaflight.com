# Mixer

Betaflight supports a number of mixing configurations as well as custom mixing. Mixer configurations determine how the servos and motors work together to control the aircraft.

## Airframe Type

To select a built-in airframe mixer, use the [Betaflight App](https://app.betaflight.com). It includes diagrams of mixer types to assist with correct wiring.

You can also use the CLI:

1. Use `mixer list` to see all supported types
2. Select a type — e.g. `mixer TRI`
3. Run `save` to apply

### Supported Airframe Types

| Name             | Description               | Motors | Servos         |
| ---------------- | ------------------------- | ------ | -------------- |
| TRI              | Tricopter                 | M1-M3  | S1             |
| QUADP            | Quadcopter-Plus           | M1-M4  | None           |
| QUADX            | Quadcopter-X              | M1-M4  | None           |
| BI               | Bicopter (left/right)     | M1-M2  | S1, S2         |
| GIMBAL           | Gimbal control            | N/A    | S1, S2         |
| Y6               | Y6-copter                 | M1-M6  | None           |
| HEX6             | Hexacopter-Plus           | M1-M6  | None           |
| FLYING_WING      | Fixed wing; elevons       | M1     | S1, S2         |
| Y4               | Y4-copter                 | M1-M4  | None           |
| HEX6X            | Hexacopter-X              | M1-M6  | None           |
| OCTOX8           | Octocopter-X (over/under) | M1-M8  | None           |
| OCTOFLATP        | Octocopter-FlatPlus       | M1-M8  | None           |
| OCTOFLATX        | Octocopter-FlatX          | M1-M8  | None           |
| AIRPLANE         | Fixed wing; Ax2, R, E     | M1     | S1, S2, S3, S4 |
| HELI_120_CCPM    | 3D-capable Helicopter     | M1     | S1, S2, S3, S4 |
| HELI_90_DEG      |                           |        |                |
| VTAIL4           | Quadcopter with V-Tail    | M1-M4  | N/A            |
| HEX6H            | Hexacopter-H              | M1-M6  | None           |
| PPM_TO_SERVO     |                           |        |                |
| DUALCOPTER       | Dualcopter                | M1-M2  | S1, S2         |
| SINGLECOPTER     | Conventional helicopter   | M1     | S1             |
| ATAIL4           | Quadcopter with A-Tail    | M1-M4  | N/A            |
| CUSTOM           | User-defined              |        |                |
| CUSTOM AIRPLANE  | User-defined airplane     | M1-M2  | S1-S8          |
| CUSTOM TRICOPTER | User-defined tricopter    |        |                |

:::note
In firmware 2025.12, the `CUSTOM AIRPLANE` mixer model now requires at least one motor.
:::

---

## Mixer Algorithm (`mixer_type`)

The `mixer_type` setting controls how the PID outputs and throttle are combined when a motor is at its authority limit. All graphs below show scenarios with AIRMODE enabled; with AIRMODE disabled, standard mixer clipping occurs at low throttle.

### LEGACY

**`set mixer_type = LEGACY`** — enabled by default

![Mixer Type: LEGACY graph showing throttle vs motor output with sharp clipping at authority limits](https://user-images.githubusercontent.com/10757508/100614257-294ad800-3316-11eb-9ccf-d260d03e541e.png)

### LINEAR

**`set mixer_type = LINEAR`**

![Mixer Type: LINEAR graph showing gradual throttle adjustment to prevent steep transitions at authority limits](https://user-images.githubusercontent.com/10757508/100615013-49c76200-3317-11eb-877d-f0f181dcb204.png)

### DYNAMIC

**`set mixer_type = DYNAMIC`**

![Mixer Type: DYNAMIC graph showing adaptive throttle response based on combined PIDsum from multiple axes](https://user-images.githubusercontent.com/10757508/100614211-120bea80-3316-11eb-8510-8d58d0c69c38.png)

_Note: The above graph shows the ideal scenario. Actual behaviour depends on PIDsum contributions from all axes; if only one axis requests full authority, the result is identical to LINEAR. Optimal results occur when multiple axes request authority simultaneously._

### EZLANDING

**`set mixer_type = EZLANDING`**

See the [Betaflight 4.5 Release Notes](https://betaflight.com/docs/wiki/release/betaflight-4-5-release-notes#12-ezlanding) for EzLanding settings.

### Summary

| Type        | Behaviour                                                                                                                                                                                          |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **LEGACY**  | Keeps requested throttle position as long as possible, then drastically changes throttle to maintain authority. Causes a sharper transition at the limit.                                          |
| **LINEAR**  | Starts changing throttle earlier to prevent steep transitions at the end, smoothing out thrust increase/decrease for the desired correction.                                                       |
| **DYNAMIC** | Similar to LINEAR but adaptive. When PIDsum comes from a single axis it behaves like LINEAR; when PIDsum is combined from multiple axes, it adapts to stay closer to the requested throttle level. |

---

## Servo Configuration

The `servo` CLI command defines settings for servo outputs. The `smix` command controls how the mixer maps FC data (RC input, PID output, channel forwarding) to those outputs.

### Channel Forwarding

Channel Forwarding lets you forward AUX channels to servos over PWM pins. Enable it in the Betaflight App (Features), or via CLI: `feature CHANNEL_FORWARDING`.

### `servo` Command

`servo <min> <max> <middle> <angleMin> <angleMax> <rate> <forwardFromChannel>`

| Parameter                  | Description                                                                                                                                                               |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<min>`, `<max>`           | Limit servo travel in µs                                                                                                                                                  |
| `<middle>`                 | Mid value when not forwarding; servo mixer value is added to this                                                                                                         |
| `<angleMin>`, `<angleMax>` | Unused                                                                                                                                                                    |
| `<rate>`                   | Scale for value from servo mixer or gimbal input, -100% to 100%                                                                                                           |
| `<forwardFromChannel>`     | Use an RC channel value as reference instead of `<middle>`. Servo follows that RC channel with possible correction from servo mixer. `<min>` / `<max>` are still honored. |

### Servo Filtering

A low-pass filter can be enabled to avoid exciting structural modes in the airframe (e.g. tail boom resonance on a tricopter).

**Configuration (CLI only):**

1. `set servo_lowpass_freq = nnn` — cutoff frequency, valid range 10–400 Hz (second-order filter)
2. `set servo_lowpass_enable = ON`

**Tuning the cutoff:**

1. Allow the vehicle to move freely in the affected axis (e.g. support a tricopter so it can yaw).
2. Tap the vehicle or command the servo directly.
3. If oscillations persist for several seconds, halve `servo_lowpass_freq` and repeat.
4. Stop when oscillations damp within roughly one second. Run `save`.

---

## Custom Motor Mixing

Custom motor mixing allows completely customised motor configurations. Each motor is defined with its contribution to throttle, roll, pitch, and yaw.

**Setup:**

1. `mixer custom` — enable custom mixing
2. `mmix reset` — erase existing custom mix
3. Optionally `mmix load <name>` — load a built-in mix as a starting point
4. Issue one `mmix` statement per motor

**Syntax:** `mmix n THROTTLE ROLL PITCH YAW`

| Parameter  | Description                                                                 |
| ---------- | --------------------------------------------------------------------------- |
| `n`        | Motor index (0-based)                                                       |
| `THROTTLE` | Throttle contribution. Typically 1.0 for all active motors; 0.0 for unused. |
| `ROLL`     | Roll authority, nominally -1.0 to 1.0                                       |
| `PITCH`    | Pitch authority, nominally -1.0 to 1.0                                      |
| `YAW`      | Rotation direction: 1.0 = CCW, -1.0 = CW                                    |

:::note
`mmix` may display a mix that is not currently active — custom motor mixes only apply when a custom mixer is selected. Motor indices must be defined consecutively starting from 0; the table stops at the first entry with THROTTLE = 0.
:::

---

## Custom Servo Mixing

Custom servo mixing rules map FC data sources to servo outputs. Rules are applied in definition order.

### `smix` Commands

| Command            | Description                                                       |
| ------------------ | ----------------------------------------------------------------- |
| `smix`             | Print current servo mixer                                         |
| `smix reset`       | Erase custom servo mix and servo reversals in the current profile |
| `smix load <name>` | Load servo portion of a named configuration                       |

**Rule syntax:** `smix <rule> <servo> <source> <rate> <speed> <min> <max> <box>`

**`<servo>` IDs:**

| ID  | Servo slot                                                             |
| --- | ---------------------------------------------------------------------- |
| 0   | GIMBAL PITCH                                                           |
| 1   | GIMBAL ROLL                                                            |
| 2   | ELEVATOR / SINGLECOPTER_4                                              |
| 3   | FLAPPERON 1 (LEFT) / SINGLECOPTER_1                                    |
| 4   | FLAPPERON 2 (RIGHT) / BICOPTER_LEFT / DUALCOPTER_LEFT / SINGLECOPTER_2 |
| 5   | RUDDER / BICOPTER_RIGHT / DUALCOPTER_RIGHT / SINGLECOPTER_3            |
| 6   | THROTTLE (first motor output only)                                     |
| 7   | FLAPS                                                                  |

Only some servo channels are connected to output based on mixer mode. For custom modes: RUDDER for CUSTOM_TRI; ELEVATOR through FLAPS for CUSTOM_AIRPLANE; no servos for CUSTOM. GIMBAL handling is hard-coded and ignores `mmix` rules.

**`<source>` IDs:**

| ID  | Source                                        |
| --- | --------------------------------------------- |
| 0   | Stabilized ROLL                               |
| 1   | Stabilized PITCH                              |
| 2   | Stabilized YAW                                |
| 3   | Stabilized THROTTLE (first motor output only) |
| 4   | RC ROLL                                       |
| 5   | RC PITCH                                      |
| 6   | RC YAW                                        |
| 7   | RC THROTTLE                                   |
| 8   | RC AUX 1                                      |
| 9   | RC AUX 2                                      |
| 10  | RC AUX 3                                      |
| 11  | RC AUX 4                                      |
| 12  | GIMBAL PITCH                                  |
| 13  | GIMBAL ROLL                                   |

Stabilized ROLL/PITCH/YAW is taken directly from RC command in PASSTHRU mode.

**Other parameters:**

- `<rate>` — scale the source, -100% to 100%. Zero terminates the smix table.
- `<speed>` — limit source change rate per loop (1 ms default). Zero = unlimited.
- `<min>`, `<max>` — value range as a percentage of full servo travel (0% = min, 50% = center, 100% = max).
- `<box>` — rule only applies when this is 0 or the corresponding SERVOx mode is enabled.

### Servo Reversal

`smix reverse` — print current reversal configuration

`smix reverse <servo> <source> r|n` — reverse (`r`) or normalise (`n`) a source for a given servo. Nearly equivalent to a negative `<rate>`, but `<min>`/`<max>` limits are applied before reversing.

`smix reverse` is a per-profile setting — configure it for each profile as needed.

**Example — reverse tail servo on a tricopter (TRI mixer):**

```
smix reverse 5 2 r
```

---

## Examples

### Example 1: KK2.0 Wired Motor Setup

X-configuration quad with KK board motor numbering:

```
  1CW      2CCW
     \    /
       KK
     /    \
  4CCW     3CW
```

```
mixer custom
mmix reset
mmix 0 1.0,  1.0, -1.0, -1.0   # Front Left  — positive roll, negative pitch, CW
mmix 1 1.0, -1.0, -1.0,  1.0   # Front Right — negative roll, negative pitch, CCW
mmix 2 1.0, -1.0,  1.0, -1.0   # Rear Right  — negative roll, positive pitch, CW
mmix 3 1.0,  1.0,  1.0,  1.0   # Rear Left   — positive roll, positive pitch, CCW
```

### Example 2: HEX-U Copter

U-shaped hex. Motors 1 and 6 are closer to the roll axis so they have half the roll authority of the outer motors.

```
.4........3.
............
.5...FC...2.
............
...6....1...
```

```
mixer custom
mmix reset
mmix 0 1.0, -0.5,  1.0, -1.0   # half negative roll, full positive pitch, CW
mmix 1 1.0, -1.0,  0.0,  1.0   # full negative roll, no pitch, CCW
mmix 2 1.0, -1.0, -1.0, -1.0   # full negative roll, full negative pitch, CW
mmix 3 1.0,  1.0, -1.0,  1.0   # full positive roll, full negative pitch, CCW
mmix 4 1.0,  1.0,  0.0, -1.0   # full positive roll, no pitch, CW
mmix 5 1.0,  0.5,  1.0,  1.0   # half positive roll, full positive pitch, CCW
```

### Example 3: Custom Tricopter

```
mixer CUSTOMTRI
mmix reset
mmix 0 1.000 0.000 1.333 0.000
mmix 1 1.000 -1.000 -0.667 0.000
mmix 2 1.000 1.000 -0.667 0.000
smix reset
smix 0 5 2 100 0 0 100 0
profile 0
smix reverse 5 2 r
profile 1
smix reverse 5 2 r
profile 2
smix reverse 5 2 r
```

### Example 4: Custom Airplane with Differential Thrust

Twin-engine plane with differential thrust. Motors on outputs 1–2; servos on the slots defined in the servo ID table above. Yaw influence is set to 0.3 — adjust for more or less differential.

| Pin | Output           |
| --- | ---------------- |
| 1   | Left Engine      |
| 2   | Right Engine     |
| 3   | Pitch / Elevator |
| 4   | Roll / Aileron   |
| 5   | Roll / Aileron   |
| 6   | Yaw / Rudder     |

```
mixer CUSTOMAIRPLANE
mmix reset
mmix 0 1.0 0.0 0.0  0.3   # Left Engine
mmix 1 1.0 0.0 0.0 -0.3   # Right Engine

smix reset
# Rule  Servo  Source  Rate  Speed  Min  Max  Box
smix 0  3      0       100   0      0    100  0   # Roll / Aileron
smix 1  4      0       100   0      0    100  0   # Roll / Aileron
smix 2  5      2       100   0      0    100  0   # Yaw / Rudder
smix 3  2      1       100   0      0    100  0   # Pitch / Elevator
```

### Example 5: Skip a Broken Motor Output

To use outputs 0, 1, 2, 4 (skipping broken output 3), add a dummy `mmix` entry for motor 3 with zero PID contributions so the table doesn't terminate early.

```
mixer custom
mmix reset
mmix 0 1.0, -1.0,  1.0, -1.0
mmix 1 1.0, -1.0, -1.0,  1.0
mmix 2 1.0,  1.0,  1.0,  1.0
mmix 3 1.0,  0.0,  0.0,  0.0   # dummy — keeps table alive for motor 4
mmix 4 1.0,  1.0, -1.0, -1.0
save
```

### Octo X8 Emulation

```
mixer custom
mmix reset
mmix 0  1.000 -1.000  1.000 -1.000
mmix 1  1.000 -1.000 -1.000  1.000
mmix 2  1.000  1.000  1.000  1.000
mmix 3  1.000  1.000 -1.000 -1.000
mmix 4  1.000 -1.000  1.000  1.000
mmix 5  1.000 -1.000 -1.000 -1.000
mmix 6  1.000  1.000  1.000 -1.000
mmix 7  1.000  1.000 -1.000  1.000
```

### PPM to SERVO Emulation

Direct channel mapping example:

```
mixer customairplane
smix reset
smix 0 0 4 100 0 0 100 0
smix 1 1 5 100 0 0 100 0
smix 2 2 6 100 0 0 100 0
smix 3 3 7 100 0 0 100 0
smix 4 4 8 100 0 0 100 0
smix 5 5 9 100 0 0 100 0
smix 6 6 10 100 0 0 100 0
smix 7 7 11 100 0 0 100 0
```

To create an `mmix`/`smix` for any built-in mixer configuration, refer to the corresponding lines in `src/main/flight/mixer.c` and `src/main/flight/servos.c` in the firmware source.

---

## Legacy Support Matrix

:::note
This matrix reflects firmware versions 3.x. F1 and F3 targets are no longer supported in current firmware. Provided for historical reference only.
:::

| Mixer            | F1  | F3  | F4 & F7 | Note                                     |
| ---------------- | --- | --- | ------- | ---------------------------------------- |
| QUADX            | o   | o   | o       |                                          |
| QUADX 1234       | o   | o   | o       |                                          |
| QUAD+            | o   | o   | o       |                                          |
| Tricopter        | o   | o   | o       |                                          |
| Gimbal           | o   | o   | o       |                                          |
| Hex +            | x   | x   | o       |                                          |
| Hex X            | o   | o   | o       |                                          |
| Hex H            | x   | x   | o       |                                          |
| Octo Flat +      | x   | x   | o       |                                          |
| Octo Flat X      | x   | x   | o       |                                          |
| Flying Wing      | o   | o   | o       |                                          |
| Airplane         | o   | o   | o       | Single prop                              |
| Heli 120         | x   | x   | x       | No code                                  |
| Heli 90          | x   | x   | x       | No code                                  |
| Single Copter    | x   | x   | x       | Insufficient code (no mmix)              |
| Dual Copter      | x   | x   | o       |                                          |
| Bicopter         | x   | x   | o       |                                          |
| V-tail Quad      | o   | o   | o       |                                          |
| A-tail Quad      | o   | o   | o       |                                          |
| Y4               | o   | o   | o       |                                          |
| Y6               | x   | x   | o       |                                          |
| Octo X8          | x   | x   | o       | Can be emulated with mmix (see Examples) |
| PPM to SERVO     | x   | x   | x       | Can be emulated with smix (see Examples) |
| Custom           | o   | o   | o       |                                          |
| Custom Airplane  | o   | o   | o       |                                          |
| Custom Tricopter | o   | o   | o       |                                          |

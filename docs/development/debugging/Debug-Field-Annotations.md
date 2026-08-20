# Debug Field Annotations

Betaflight's firmware is the single source of truth for debug modes. `debugType_e` in `src/main/build/debug.h` fixes the number stored in every blackbox log header and reported over MSP, and the `DEBUG_SET()` call sites fix which `debug[n]` each mode writes.

What the firmware did **not** record, until now, is what each field _means_. Every tool that displays debug data — the configurator, the blackbox log viewer, this documentation — kept its own copy of the field labels, written by reading firmware diffs, and drifted whenever a mode was reworked. One field kept the label "Frame Jitter" for two years after the firmware started writing a boolean into it.

A `//!<` annotation on the call site fixes that: the meaning lives next to the value, so a change to what a field holds and a change to its label are the same diff.

```c
DEBUG_SET(DEBUG_CYCLETIME, 0, getTaskDeltaTimeUs(TASK_SELF));  //!< Cycle Time [us]
DEBUG_SET(DEBUG_CYCLETIME, 1, getAverageSystemLoadPercent());  //!< CPU Load [%]
```

It is a comment, so it costs no flash. A firmware-side string table would have cost every target flash for data only tooling needs.

## The Grammar

The annotation goes on the line the call **ends** on, which matters for a call spanning several lines:

```
//!< [<indices>] <label> [<unit>]
```

The canonical specification lives above the `DEBUG_SET` macro in [`src/main/build/debug.h`](https://github.com/betaflight/betaflight/blob/master/src/main/build/debug.h). This page is the guide to writing one.

### Label

What the value **is**, in the words a pilot reads — not the name of the variable holding it. `taskDeltaTimeUs` is the implementation; `Cycle Time` is the field.

Brackets delimit the index spec and the unit, so a label may not contain `[` or `]`. Use parentheses for a qualifier:

```c
DEBUG_SET(DEBUG_ITERM_RELAX, 0, lrintf(setpointHpf));  //!< Setpoint HPF (roll) [dps]
```

### Indices

Omit the index spec when the index argument is a compile-time constant — a literal, an `enum` member or a `#define`. Tooling resolves all three, including constants defined in a header the file includes.

Give it when the index is computed at run time, because no static scan can evaluate `axis` or `motorIndex`:

```c
DEBUG_SET(DEBUG_CURRENT_ANGLE, axis, lrintf(currentAngle * 10.0f));  //!< [0..2] Current Angle ({roll|pitch|yaw}) [0.1deg]
```

`[2]`, `[0..2]` and `[0,2,4,6]` are all accepted. A single `{a|b|c}` group in the label then spells out one label per index, in index order, and the number of alternatives has to match the number of indices.

Say what the code actually writes, not what the mode could hold. `DEBUG_ESC_SENSOR_RPM` sits behind `if (escSensorMotor < 4)`, so it is `[0..3]` with four motors, not `[0..7]`.

### Unit

The unit of **one LSB** of the stored value, which is what lets tooling scale an axis and label it. An optional decimal factor precedes the symbol:

| Firmware writes         | Annotation | Reads as                         |
| ----------------------- | ---------- | -------------------------------- |
| `lrintf(angleDeg * 10)` | `[0.1deg]` | one count is a tenth of a degree |
| `baro.pressure / 100`   | `[100Pa]`  | one count is a hundred pascals   |
| `lrintf(ratio * 1000)`  | `[0.001]`  | scaled, but dimensionless        |
| `stats.uplink_RSSI_1`   | `[-1dBm]`  | the magnitude of a negative dBm  |

Omit the unit entirely for a plain count, a flag or an enumeration.

The factor is the most common thing to get wrong, and the sign is the subtle one: CRSF sends RSSI as a positive count of dBm _below_ zero, so `[-1dBm]` is what makes a decoder plot it as the negative number it is.

#### Symbols

```
s ms us  Hz kHz MHz kbit/s  rad rad/s  deg dps dps2
m cm m/s cm/s  g g/s  V A mAh  degC Pa hPa  rpm % dB dBm  bytes ticks
```

A few more are device-native: the firmware stores the raw sensor value, and only the flight controller's own configuration can convert it.

| Symbol               | Holds                       | Tooling shows                        |
| -------------------- | --------------------------- | ------------------------------------ |
| `gyroADC`            | gyro ADC counts             | °/s, using the configured gyro scale |
| `accADC`, `accADC/s` | accelerometer ADC counts    | g, g/s                               |
| `rcCommand`          | throttle in rcCommand units | %                                    |
| `eRPM`               | Dshot electrical RPM        | rpm, using the motor pole count      |

A symbol outside this list fails the generator rather than reaching an app that would not know how to display it. If a field genuinely needs a new unit, add it to the list in `debug.h` and to the display map in the configurator's `src/js/utils/debugModes.js` in the same change.

### Enumerations

A field holding an enumerator names the enum instead of a unit, and tooling reads the enumerator names from the firmware:

```c
DEBUG_SET(DEBUG_FAILSAFE, 3, failsafeState.phase);  //!< Failsafe Phase [enum:failsafePhase_e]
```

The enum has to be visible in the file or in a header it includes, and its enumerators have to be plain — an initialiser the parser cannot evaluate, or entries behind an `#ifdef`, mean the values would depend on the build, so such a block is skipped and the annotation fails.

This is worth reaching for: the configurator's list of dynamic-notch calculation steps still named the CMSIS FFT steps that the firmware dropped years earlier, and nobody noticed because a stale enum still decodes to plausible-looking names.

## Fields Two Subsystems Write

A logged `debug[n]` records only the number, never which code wrote it. So an index has to mean one thing in a given build, and annotations that share an index must agree.

Where they disagree, annotate each call site truthfully. The generator reports the clash instead of picking one:

```
WARNING BATTERY[3] has 2 meanings: "Sag Compensation Attenuation" [0.001] at
src/main/flight/mixer.c:262 vs "Voltage Stable Bits" at src/main/sensors/battery.c:179
```

Those are firmware bugs, not annotation problems, and the report is the point — see [issue 15594](https://github.com/betaflight/betaflight/issues/15594). Tooling names both meanings and drops the unit, since a unit that belongs to one of them would scale the other's samples wrongly.

A field multiplexed by state is a milder case of the same thing: `DEBUG_GPS_CONNECTION[3]` carries the baud rate while the GPS baud is being detected and the age of the last nav message afterwards. Name both in the label — there is no unit that covers both.

## How Tooling Reads It

`scripts/generate-debug-modes.mjs` in the configurator walks the firmware's git history, reads the annotations at each MSP API version, and writes:

| File                                    | Purpose                                                         |
| --------------------------------------- | --------------------------------------------------------------- |
| `src/js/debug_modes_table.js`           | the ordered `debugType_e` names per API version                 |
| `src/js/debug_fields_table.js`          | the label, unit, scale and enum values of every annotated field |
| `test/generated/debug_field_usage.json` | which `debug[n]` each mode writes, for the consistency test     |

```bash
npm run generate:debug-modes   # regenerate from a firmware checkout
npm run check:debug-modes      # exit 1 if the committed tables are stale
```

For an annotated mode the generated labels **replace** the configurator's hand-written ones rather than merging with them, so a label left behind by a rework cannot go on naming a field the firmware no longer writes. Firmware older than the annotations keeps using the hand-written table.

A malformed annotation fails the generator. It is the only record of what a field means, so a typo has to be loud rather than leaving the field silently unlabelled.

## Checklist

When you add or change a `DEBUG_SET()`:

- [ ] The annotation is on the line the call ends on.
- [ ] The label says what the value is, not which variable holds it, and contains no brackets.
- [ ] An index spec is present if and only if the index is computed at run time, and it lists what the code really writes.
- [ ] The unit is the value of one LSB, with the factor and the sign that the expression implies.
- [ ] A field holding an enumerator names its enum.
- [ ] If another call site writes the same index, the two annotations agree — or the disagreement is a bug worth fixing first.
- [ ] `npm run check:debug-modes` in the configurator, against your firmware checkout, reports no problems.

## See Also

- [`src/main/build/debug.h`](https://github.com/betaflight/betaflight/blob/master/src/main/build/debug.h) — the canonical grammar, next to the macro
- [Blackbox Internals](../Blackbox-Internals.md) — how debug fields reach a log
- [Coding Style](../CodingStyle.md)

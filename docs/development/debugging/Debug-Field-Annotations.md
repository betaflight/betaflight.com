# Debug Field Annotations

Betaflight's firmware is the single source of truth for debug modes. `debugType_e` in `src/main/build/debug.h` fixes the number stored in every blackbox log header and reported over MSP, and the `DEBUG_SET()` call sites fix which `debug[n]` each mode writes.

What the firmware did **not** record, until now, is what each field _means_. Every tool that displays debug data — the configurator, the blackbox log viewer, this documentation — kept its own copy of the field labels, written by reading firmware diffs, and drifted whenever a mode was reworked. One field kept the label "Frame Jitter" for two years after the firmware started writing a boolean into it.

A `//!<` annotation on the call site fixes that: the meaning lives next to the value, so a change to what a field holds and a change to its label are the same diff.

```c
DEBUG_SET(DEBUG_CYCLETIME, 0, getTaskDeltaTimeUs(TASK_SELF));  //!< Cycle Time [unit:us]
DEBUG_SET(DEBUG_CYCLETIME, 1, getAverageSystemLoadPercent());  //!< CPU Load [unit:%]
```

It is a comment, so it costs no flash. A firmware-side string table would have cost flash on every target for tooling-only data.

## The Grammar

The annotation goes on the line the call **ends** on, which matters for a call spanning several lines:

```text
//!< [index:<indices>] <label> [<shape>]
```

The canonical specification lives above the `DEBUG_SET` macro in [`src/main/build/debug.h`](https://github.com/betaflight/betaflight/blob/master/src/main/build/debug.h). This page is the guide to writing one.

### Shapes

Every bracket names what it is, so nothing about an annotation depends on where it sits. Between them the two parts are all a tool needs: the label supplies the text it prints, and the shape bracket says what **kind** of value the field holds, from which it derives how to format a sample and how to scale a graph axis. Four shapes cover every field, so nothing has to be decided per field in an app.

| Shape         | Written as                                              | A tool shows              | Graph axis                 |
| ------------- | ------------------------------------------------------- | ------------------------- | -------------------------- |
| Quantity      | `[unit:us]`, `[unit:0.1deg]`, `[unit:-1dBm]`            | the value in that unit    | scaled by the unit         |
| Enumerator    | `[enum:failsafePhase_e]`                                | the enumerator's name     | `0` to the last enumerator |
| Bit flags     | `[flags:Channel 17\|Channel 18\|Signal Loss\|Failsafe]` | the names of the set bits | `0` to all bits set        |
| Plain integer | nothing at all                                          | the number                | fitted to the logged data  |

A field is a plain integer when it is none of the others — a count, a state number with no enum to name it, a packed value. That is a legitimate shape, not a gap: the tool shows the number and fits the axis to the data.

Note what the shapes do **not** carry: a minimum and maximum for the graph. That is deliberate. A unit almost never implies a range — across the annotated fields, `us` takes six different ranges and `%` takes six — and the ranges that matter most follow the craft rather than the field: a gyro axis follows the configured rates, an accelerometer axis the configured full scale. So a range is derived from the shape instead. An enumerator spans its values, bit flags span their bits, a unit bounded by definition uses that bound, a device-native unit follows the flight controller's own configuration, and everything else is fitted to the logged data, over the fields that share a unit and scaling. Annotating a range would be a constant that is wrong more often than right.

### Label

What the value **is**, in the words a pilot reads — not the name of the variable holding it. `taskDeltaTimeUs` is the implementation; `Cycle Time` is the field.

The label is the one part with no key, being the only prose. Brackets delimit the keyed parts around it, so a label may not contain `[` or `]` — use parentheses for a qualifier:

```c
DEBUG_SET(DEBUG_ITERM_RELAX, 0, lrintf(setpointHpf));  //!< Setpoint HPF (roll) [unit:dps]
```

### Indices

Omit the index spec when the index argument is a compile-time constant — a literal, an `enum` member or a `#define`. Tooling resolves all three, including constants defined in a header the file includes.

Give it when the index is computed at run time, because no static scan can evaluate `axis` or `motorIndex`:

```c
DEBUG_SET(DEBUG_CURRENT_ANGLE, axis, lrintf(currentAngle * 10.0f));  //!< [index:0..2] Current Angle ({roll|pitch|yaw}) [unit:0.1deg]
```

`[index:2]`, `[index:0..2]` and `[index:0,2,4,6]` are all accepted. A single `{a|b|c}` group in the label then spells out one label per index, in index order, and the number of alternatives has to match the number of indices.

Say what the code actually writes, not what the mode could hold. `DEBUG_ESC_SENSOR_RPM` sits behind `if (escSensorMotor < 4)`, so it is `[index:0..3]` with four motors, not `[index:0..7]`.

### Unit

`[unit:…]` is the unit of **one LSB** of the stored value, which is what lets tooling scale an axis and label it. A numeric factor may precede the symbol — whole or decimal, and negative for a field that stores the magnitude of a negative quantity — and the symbol itself may be left out when the value is scaled but dimensionless:

| Firmware writes         | Annotation      | Reads as                         |
| ----------------------- | --------------- | -------------------------------- |
| `lrintf(angleDeg * 10)` | `[unit:0.1deg]` | one count is a tenth of a degree |
| `baro.pressure / 100`   | `[unit:100Pa]`  | one count is a hundred pascals   |
| `lrintf(ratio * 1000)`  | `[unit:0.001]`  | scaled, but dimensionless        |
| `stats.uplink_RSSI_1`   | `[unit:-1dBm]`  | the magnitude of a negative dBm  |

Omit the bracket entirely for a plain count — a flag and an enumeration each have a shape of their own, below.

The factor is the most common thing to get wrong, and the sign is the subtle one: CRSF sends RSSI as a positive count of dBm _below_ zero, so `[unit:-1dBm]` is what makes a decoder plot it as the negative number it is.

#### Symbols

```text
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

A symbol outside this list, or a bracket with no key at all, fails the generator rather than reaching an app that would not know how to display it. That is enforced rather than conventional: the generator takes its accepted vocabulary from the keys of the configurator's `src/js/debug_units.ts`, so a unit with no display rule cannot be generated at all. If a field genuinely needs a new unit, add it to the list in `debug.h` and to that table in the same change.

### Enumerations

A field holding an enumerator names the enum instead of a unit, and tooling reads the enumerator names from the firmware:

```c
DEBUG_SET(DEBUG_FAILSAFE, 3, failsafeState.phase);  //!< Failsafe Phase [enum:failsafePhase_e]
```

The enum has to be visible in the file or in a header it includes, and its enumerators have to be plain — an initializer the parser cannot evaluate, or entries behind an `#ifdef`, mean the values would depend on the build, so such a block is skipped and the annotation fails.

Pinning values is fine, gaps included: `{ A, B = 3 }` names 0 and 3 and leaves 1 and 2 unnamed, and a sample landing on an unnamed value shows as the number. An enum whose values are pinned by a shift or a mask is not an enumeration in this sense — it is bit flags, and has a shape of its own below.

This is worth reaching for: the configurator's list of dynamic-notch calculation steps still named the CMSIS FFT steps that the firmware dropped years earlier, and nobody noticed because a stale enum still decodes to plausible-looking names.

### Bit Flags

A field holding bit flags names them, lowest bit first, with `-` for a bit the field does not use:

```c
DEBUG_SET(DEBUG_SBUS, DEBUG_SBUS_FRAME_FLAGS, frame.channels.flags);  //!< Frame Flags [flags:Channel 17|Channel 18|Signal Loss|Failsafe]
```

A tool then shows `Signal Loss | Failsafe` instead of `12`, and a bit no name was given for shows as its bit number rather than being dropped — an unexpected bit is worth seeing.

The names go in the annotation rather than being read from the source, because flag bits are `#define`s (`SBUS_FLAG_SIGNAL_LOSS (1 << 2)`) rather than an enum, so there is no type for a generator to follow.

## Fields That Cannot Be Described

Some fields cram two values into one index, or use a sentinel:

```c
DEBUG_SET(DEBUG_GPS_CONNECTION, 4, gpsData.state * 100 + gpsData.state_position);
DEBUG_SET(DEBUG_AUTOPILOT_PID, 7, 100);   // a marker for "reached this branch"
DEBUG_SET(DEBUG_LIDAR_TF, 6, -99);        // out of range
```

No annotation makes `412` readable, and no shape describes it, so any tool reading the annotations shows a plain integer — a purpose-built decoder can of course unpack it, which is the point: it has to be told how. If you are writing one, **split it across two indices instead** — a debug mode has eight, and two fields a pilot can read are worth more than one that needs a decoder ring. Where an existing field does this, fixing the firmware is the way forward, not a richer annotation.

## Fields Two Subsystems Write

A logged `debug[n]` records only the number, never which code wrote it. So an index has to mean one thing in a given build, and annotations that share an index must agree.

Where they disagree, annotate each call site truthfully. The generator reports the clash instead of picking one:

```text
generate-debug-modes: WARNING BATTERY[3] has 2 meanings: "Sag Compensation
Attenuation" at src/main/flight/mixer.c:262 vs "Voltage Stable Bits" at
src/main/sensors/battery.c:179
```

Those are firmware bugs, not annotation problems, and the report is the point — see [issue 15594](https://github.com/betaflight/betaflight/issues/15594). Tooling names both meanings and drops the unit, since a unit that belongs to one of them would scale the other's samples wrongly.

A field multiplexed by state is a milder case of the same thing: `DEBUG_GPS_CONNECTION[3]` carries the baud rate while the GPS baud is being detected and the age of the last nav message afterward. Name both in the label — there is no unit that covers both.

## How Tooling Reads It

`scripts/generate-debug-modes.mjs` in the configurator walks the firmware's git history, reads the annotations at each MSP API version, and writes:

| File                                    | Purpose                                                                                     |
| --------------------------------------- | ------------------------------------------------------------------------------------------- |
| `src/js/debug_modes_table.js`           | the ordered `debugType_e` names per API version                                             |
| `src/js/debug_fields_table.js`          | the label and shape — unit and scale, enum values, or flag names — of every annotated field |
| `generated/debug-fields.json`           | all of the above as one schema-validated document, published for other tools                |
| `generated/debug-fields.schema.json`    | its JSON Schema, generated alongside it                                                     |
| `test/generated/debug_field_usage.json` | which `debug[n]` each mode writes, for the consistency test                                 |

The first two are the configurator's own source. The published pair exists so that
nothing outside that repository has to parse the firmware's C or scrape its
JavaScript to label a debug field — which is how the blackbox log viewer and every
third-party log tool came to keep a copy of these labels in the first place. A
mode's position in `versions[api].modes` is its numeric `debug_mode`, and each
version records the firmware commit it was read from.

It reads one table that is not generated: `src/js/debug_units.ts`, which holds every unit symbol and what it means to a consumer — the suffix to print, the factor to the displayed unit, the hardware conversion a device-native unit needs, and the graph axis the unit implies. The generator's vocabulary is that table's keys, so the units firmware may write and the units an app can display are the same list by construction.

Only live code is read. A commented-out `DEBUG_SET()` is not a field the mode
writes, and an annotation inside a block comment is not an annotation — so a call
left commented out for later costs nothing, and does not have to be tidied away
before the tables are regenerated.

```bash
npm run generate:debug-modes   # regenerate from a firmware checkout
npm run check:debug-modes      # exit 1 if the committed tables are stale
```

### Seeing Your Annotation

You do not have to commit an annotation, let alone merge it, to see what it does.
Point the generator at the firmware you are working on and run the configurator:

```bash
# the checkout as it sits on disk — uncommitted edits and untracked files included
npm run generate:debug-modes:dev -- --repo /path/to/your/betaflight

# a pull request, fetched by number from the upstream project
npm run generate:debug-modes -- --repo /path/to/betaflight --pr 15596
```

Both read the newest API version from the firmware you named; older versions still
come from committed history, since only the newest can be the one you are changing.
Discard the regenerated files with `git checkout` when you are done: they describe
the firmware in front of you, not what the configurator ships.

Output built from a working tree describes firmware nobody else has, so every file
it writes opens with a `NOT FOR COMMIT` banner and the published JSON marks that
version `"worktree": true`.

Getting this wrong is the easy mistake: run with no firmware named and the
generator reads plain `master`, which has none of your annotations, and quietly
regenerates a table without them.

For an annotated mode the generated labels **replace** the configurator's hand-written ones rather than merging with them, so a label left behind by a rework cannot go on naming a field the firmware no longer writes. Firmware older than the annotations keeps using the hand-written table.

A malformed annotation fails the generator. It is the only record of what a field means, so a typo has to be loud rather than leaving the field silently unlabelled.

## Checklist

When you add or change a `DEBUG_SET()`:

- [ ] The annotation is on the line the call ends on.
- [ ] The label says what the value is, not which variable holds it, and contains no brackets.
- [ ] An index spec is present if and only if the index is computed at run time, and it lists what the code really writes.
- [ ] Every bracket carries its key — `index:`, `unit:`, `enum:` or `flags:`.
- [ ] The unit is the value of one LSB, with the factor and the sign that the expression implies.
- [ ] A field holding an enumerator names its enum, and one holding bit flags names its bits.
- [ ] A field that packs two values into one index is split, not annotated around.
- [ ] If another call site writes the same index, the two annotations agree — or the disagreement is a bug worth fixing first.
- [ ] `npm run generate:debug-modes:dev -- --repo <your firmware>` in the configurator reports no problems, and the field reads the way you meant it to in the app.

## See Also

- [`src/main/build/debug.h`](https://github.com/betaflight/betaflight/blob/master/src/main/build/debug.h) — the canonical grammar, next to the macro
- [Blackbox Internals](../Blackbox-Internals) — how debug fields reach a log
- [Coding Style](../CodingStyle)

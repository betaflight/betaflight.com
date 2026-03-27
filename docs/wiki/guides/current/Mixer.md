# Mixer

## Mixer Types

All graphs below show scenarios with AIRMODE enabled; with AIRMODE disabled, standard mixer clipping occurs at low throttle.

### Mixer Type: LEGACY (Current Mixer)

**set mixer_type = LEGACY** \<--- enabled by default

![Mixer Type: LEGACY graph showing throttle vs motor output with sharp clipping at authority limits](https://user-images.githubusercontent.com/10757508/100614257-294ad800-3316-11eb-9ccf-d260d03e541e.png)

### Mixer Type: LINEAR

**set mixer_type = LINEAR** \<--- to enable

![Mixer Type: LINEAR graph showing gradual throttle adjustment to prevent steep transitions at authority limits](https://user-images.githubusercontent.com/10757508/100615013-49c76200-3317-11eb-877d-f0f181dcb204.png)

### Mixer Type: DYNAMIC

**set mixer_type = DYNAMIC** \<--- to enable

![Mixer Type: DYNAMIC graph showing adaptive throttle response based on combined PIDsum from multiple axes](https://user-images.githubusercontent.com/10757508/100614211-120bea80-3316-11eb-8510-8d58d0c69c38.png)

_Note: The above graph is the ideal scenario of the dynamic mixer, but the actual result depends on the PIDsum contribution from other axes; if only one axis requests full authority the result will be identical to the LINEAR mixer. The optimal results are achieved when multiple axes are requesting authority._

### Mixer Type: EZLANDING

**set mixer_type = EZLANDING** \<--- to enable

Please reference Betaflight 4.5 Release Notes for [EzLanding settings](https://betaflight.com/docs/wiki/release/betaflight-4-5-release-notes#12-ezlanding).

### Summary

| Type        | Behavior                                                                                                                                                                                           |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **LEGACY**  | Keeps requested throttle position as long as possible, then drastically changes throttle to maintain authority. Causes a sharper transition at the limit.                                          |
| **LINEAR**  | Starts changing throttle earlier to prevent steep transitions at the end, smoothing out thrust increase/decrease for the desired correction.                                                       |
| **DYNAMIC** | Similar to LINEAR but adaptive. When PIDsum comes from a single axis it behaves like LINEAR; when PIDsum is combined from multiple axes, it adapts to stay closer to the requested throttle level. |

---

## Mixer Support

- Beginning with 3.1.7, some rarely used mixers have been dropped from F1 and F3 firmwares due to flash space limitations.
- In addition, some mixers are not supported from the beginning (or at least there are no remains of the code).
- On 3.2 and later, an unsupported mixer is detected and reset to default (mixers without servos reset to "Custom" and mixers with servos reset to "Custom Airplane").

### The Future

Ultimately, motor and servo mixes will be dynamically loaded by configurator, and rarely used mixers are likely to resurface (if devs find them useful enough).

### Support Matrix (x = not included, o = included)

| Mixer            | F1 (\*1) | F3  | F4 & F7 | Note                                         |
| ---------------- | -------- | --- | ------- | -------------------------------------------- |
| QUADX            | o        | o   | o       |                                              |
| QUADX 1234       | o        | o   | o       |                                              |
| QUAD+            | o        | o   | o       |                                              |
| Tricopter        | o        | o   | o       |                                              |
| Gimbal           | o        | o   | o       |                                              |
| Hex +            | x        | x   | o       |                                              |
| Hex X            | o        | o   | o       |                                              |
| Hex H            | x        | x   | o       |                                              |
| Octo Flat +      | x        | x   | o       |                                              |
| Octo Flat X      | x        | x   | o       |                                              |
| Flying Wing      | o        | o   | o       |                                              |
| Airplane         | o        | o   | o       | Single prop (inconsistent with graphic)      |
| Heli 120         | x        | x   | x       | No code                                      |
| Heli 90          | x        | x   | x       | No code                                      |
| Single Copter    | x        | x   | x       | Insufficient code (no mmix)                  |
| Dual Copter      | x        | x   | o       | Doesn't reset without #3178                  |
| Bicopter         | x        | x   | o       | Doesn't reset without #3178                  |
| V-tail Quad      | o        | o   | o       |                                              |
| A-tail Quad      | o        | o   | o       |                                              |
| Y4               | o        | o   | o       |                                              |
| Y6               | x        | x   | o       |                                              |
| Octo X8          | x        | x   | o       | Can be emulated by mmix (see below)          |
| PPM to SERVO     | x        | x   | x       | No code, can be emulated by smix (see below) |
| Custom           | o        | o   | o       |                                              |
| Custom Airplane  | o        | o   | o       |                                              |
| Custom Tricopter | o        | o   | o       |                                              |

\*1: CJMCU and MICROSCISKY only supports QUAD mixer.

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

An example of direct channel mapping.

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

### Other Emulations

It is easy to create a set of mmix/smix for a given mixer configuration; take corresponding lines from the source `src/main/flight/{mixer,servos}.c` and convert them to CLI format.

# Mixer Support

- Beginning with 3.1.7, some rarely used mixers have being dropped from F1 and F3 firmwares due to flash space limitation.
- In addition, some mixers are not supported from the beginning (or at least I couldn't find any remains of the code).
- On 3.2 and later, unsupported mixer is detected and reset to default (mixers without servos to "Custom" and mixers with servos to "Custom Airplane").

### The future

Ultimately, motor and servo mixes will be dynamically loaded by configurator, and rarely used mixers are likely to resurrect (if devs find them useful enough).

### The support matrix (x = not included, o = included)

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

#### Octo X8 emulation

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

#### PPM to SERVO emulation

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

#### Other emulations

It is easy to create a set of mmix/smix for a given mixer configuration; take corresponding lines from the source `src/main/flight/{mixer,servos}.c` and convert them to CLI format.

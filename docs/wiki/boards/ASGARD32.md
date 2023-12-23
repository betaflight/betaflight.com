### Firmware targets

- For Asgard32 F4, use `AG3XF4`.
- For Asgard32 F7, use `AG3XF7`.

### Known problems and workarounds of Asgard32 F4 and Asgard32 F7.

1. The pad for LED strip (PB6) does not work due to timer collision with Motor 4.
   There is a very little choice of pads for workaround;
   PA2 (TX2, labelled S/A for SmartAudio) is a descent choice.
   SmartAudio can be moved to one of available timer channels.
   This workaround configuration is implemented in official releases.

2. The buzzer function is overloaded with status LED function, and there is no dedicated pad for buzzers.
   (The BUZ- pad is switched to ground by the status LED signal.)
   If a buzzer is connected the BUZ-, then beeper beeps on events that normal beeper doesn't beep (like attitude on ground).
   Workaround is described below
   ([Adding a (real) beeper function](#adding-a-real-beeper-function).

### Pad/Pin function map for Asgard32 F4

![https://user-images.githubusercontent.com/14850998/43266681-f9381526-9126-11e8-974e-eaa5d4129487.png]

[https://github.com/betaflight/betaflight/files/2232258/AG3XF4-function_map-20180626.pdf]

### Adding a (real) beeper function

The beeper feature is configured but no pin is assigned by default for v3.4.1 and later.

To use this facility to drive an actual beeper, you will need one of the followings.

1. External MOSFET switch for self activating beeper/buzzer (the one that beeps only by applying an appropriate voltage at + and -.

2. A buzzer unit, such as http://www.mateksys.com/?portfolio=dbuz5v or similar level triggered buzzer.

To activate it as a level I/O, pick a pin and assign it as a beeper resource. For example, M7 pad (PB14) is a good candidate.

```text
resource beeper b14
```

Connect selected pad to buzzer's signal pad. For Mateksys unit mentioned above, "B-" is the signal pad.

You may need to adjust the polarity of the signal.

```text
set beeper_inversion = OFF # if your beeper beeps when it supposed to be silent
set beeper_inversion = ON # default
```

This is the circuit used for testing.

![https://user-images.githubusercontent.com/14850998/36553159-f7805d12-183e-11e8-8e22-8cd2740a53b8.png]

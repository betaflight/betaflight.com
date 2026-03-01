# LED Strip

Betaflight supports the use of addressable LED strips. Addressable LED strips allow each LED in the strip to be programmed with a unique and independent color. This is far more advanced than the normal RGB strips which require that all the LEDs in the strip show the same color.

## Basics

IMPORTANT: The Flight Controller must be flashed with the `LED strip` option enabled!

Every programmable LED strip has a digital control input marked `D in` at one end, and a digital control output marked `D out` at the other.
The `Din` of the first strip should be connected the LED pad on the FC. One strip can be connected to another, in series, if the `Dout`of the first is connected to the `D in` of the next.

Each LED in a strip gets an ID number, from 0 to however many there are along the digital line, when they are powered up. Betaflight commands each LED individually, by number.

Strips can be connected in parallel, sharing a common `D in` connection, but then each LED in each strip will do the same thing.

NOTE: Betaflight disables all LEDs on a strip by default, to conserve CPU usage.

Unless you first tell Betaflight how many LEDs you have on your strip, nothing will happen.

That's why the first thing to do is to go to the `LED Strip` Tab in Betaflight's Configurator, and:

1. Select `Wire Ordering Mode`
2. Drag from the top left corner towards the right, selecting however many LED's you have in your strip. If there are only 4 LEDs in the strip, drag across the top left four of them. They will be numbered 0,1,2,3.
3. Drag again across the same four, confirming they are numbered 0,1,2,3, and choose `Color` from the `Function` dropdown. Click on any colour, say Red.
4. Click Save.

Now Betaflight knows you have 4 LEDs in your strip, and that they display solid red when the `STATUS`, or default, Led*strip* Profile is active.

If you were to now choose the Beacon Profile, or the Race Profile (see below), their commands will be sent to the first four LEDs on the your strip, because they are now active.
Note: To get back to the starting point, click the `clear All Wiring` and `Clear All` buttons, and save.
Sometimes the wiring order you select doesn't get remembered. The key thing is to 'wire up' each LED and assign at least a basic colour function to it.

Pasting this snippet into the CLI should reliably set LEDs 0, 1, 2 and 3 to red:

```
led 0 0,0::C:2
led 1 1,0::C:2
led 2 2,0::C:2
led 3 3,0::C:2
```

## Supported hardware

Only strips of 32 WS2811/WS2812 LEDs are supported currently. If the strip is longer than 32 LEDs it does not matter, but only the first 32 are used.

WS2812 LEDs require an 800khz signal and precise timings and thus requires the use of a dedicated hardware timer.

Note: Not all WS2812 ICs use the same timings, some batches use different timings.

It could be possible to be able to specify the timings required via CLI if users request it.

### Tested Hardware

- [Adafruit NeoPixel Jewel 7](https://www.adafruit.com/products/2226) (preliminary testing)
  - Measured current consumption in all white mode ~ 350 mA.
  - Fits well under motors on mini 250 quads.
- [Adafruit NeoPixel Stick](https://www.adafruit.com/products/1426) (works well)
  - Measured current consumption in all white mode ~ 350 mA.
- [Aliexpress SK6812 RBGWW strip](https://www.aliexpress.com/wholesale?SearchText=rgbw+sk6812) (works well)
  - Alternative [Adafruit NeoPixel Stick RGBW](https://www.adafruit.com/product/2869)

### WS2811 vs WS2812

The [WS2811](https://cdn-shop.adafruit.com/datasheets/WS2811.pdf) is a LED driver IC which is connected to an RGB LED. It accepts data in the form of 8 bits each of Red-Green-Blue.

The [WS2812](https://cdn-shop.adafruit.com/datasheets/WS2812.pdf) is integrated into the package of a 50:50 LED rather than as a separate device. It accepts data in the form of 8 bits each of Green-Red-Blue.

With the [SK6812](https://cdn-shop.adafruit.com/product-files/1138/SK6812+LED+datasheet+.pdf) also GRBW variants are supported, which have a fourth (white) channel and such provide a much cleaner white color.

It is thus possible, depending on the LED board/strip being used that either Red-Green-Blue or Green-Red-Blue encoding may be required. This may be controlled by setting the following.

```
set ledstrip_grb_rgb = RGB

```

or

```
set ledstrip_grb_rgb = GRB

```

or

```
set ledstrip_grb_rgb = GRBW

```

Then confirm the required setting by simply setting an LED to be green. If it lights up red, you have the wrong setting.
Afterwards check if the second LED also lights up red - if not, you might have 4-color SK6812 LEDs and would have to select GRBW.

## Connections

WS2812 LED strips generally require a single data line, 5V and GND.

WS2812 LEDs on full brightness can consume quite a bit of current. It is recommended to verify the current draw and ensure your supply can cope with the load. On a multirotor that uses multiple BEC ESC's you can try use a different BEC to the one the FC uses. e.g. ESC1/BEC1 -> FC, ESC2/BEC2 -> LED strip. It's also possible to power one half of the strip from one BEC and the other half from another BEC. Just ensure that the GROUND is the same for all BEC outputs and LEDs.

| Target                | Pin  | LED Strip | Signal |
| --------------------- | ---- | --------- | ------ |
| Naze                  | RC5  | Data In   | PA6    |
| CC3D                  | RCO5 | Data In   | PB4    |
| ChebuzzF3/F3Discovery | PB8  | Data In   | PB8    |
| Sparky                | PWM5 | Data In   | PA6    |

Since RC5 is also used for SoftSerial on the Naze it means that you cannot use SoftSerial and LED strips at the same time. Additionally, since RC5 is also used for Parallel PWM RC input on both the Naze, Chebuzz and STM32F3Discovery targets, LED strips can not be used at the same time at Parallel PWM.

If you have LEDs that are intermittent, flicker or show the wrong colors then drop the VIN to less than 4.7v, e.g. by using an inline diode on the VIN to the LED strip. The problem occurs because of the difference in voltage between the data signal and the power signal. The WS2811 LED's require the data signal (Din) to be between 0.3 _ Vin (Max) and 0.7 _ VIN (Min) to register valid logic low/high signals. The LED pin on the CPU will always be between 0v to ~3.3v, so the Vin should be 4.7v (3.3v / 0.7 = 4.71v). Some LEDs are more tolerant of this than others.

The datasheet can be found here: http://www.adafruit.com/datasheets/WS2812.pdf

## Configuration

First, read the Basics above, and make sure your FC has been flashed with support for LED_STRip.

Then enable the LED strip feature, either by:

checking LED Strip in the Configuration tab of Betaflight Configurator, or,
by typing into the CLI:

```
feature LED_STRIP
```

If you try to enable LED_STRIP feature, but find that the feature keeps getting turned off again after a reboot, then check your config does not conflict with other features, as above.

## Initial setup

By default, all LEDs in the strip are 'disabled'. Before any of them will do anything, and before the RACE or BEACON profiles will work, Betaflight needs to know how many LEDs exist in your LED Strip

## Betaflight LED strip Profiles

Betaflight provides three LED strip 'Profiles', or operating modes: STATUS, RACE and BEACON.
Only one of these may be active at a time.

### Selecting the Profile to use

The profile may be selected using the CLI, the OSD LED strip menu, or from an adjustment channel, i.e. switch on your radio. Note that the adjustment channel from your radio overrides all other LED strip profile selection options.

###### OPTION 1: Use the CLI to select the LED strip profile.

1. Open the CLI.
2. Type `get ledstrip_profile` followed by enter to display the currently selected LED strip profile.
3. Type `set ledstrip_profile=x` where x is the profile STATUS, RACE or BEACON and press enter.
4. Type `save` followed by enter to save the selected LED strip profile.

###### OPTION 2: By using the OSD

1. Open the OSD menu by yawing left and pitching forward on your radio.
2. Using the pitch stick, move down to the LED Strip menu and roll right to enter the menu.
3. The profile and race color can be configured using the left stick to go back and the right stick to navigate up/down and to change the selected value.
4. Use the left stick to go to the top level menu and select save & reboot to complete.

###### OPTION 3: Choose the LED strip Profile from your radio using an adjustment range.

1. Turn on Expert mode at the top right of Configurator, "Enable Expert Mode".
2. Go to the Configurator Adjustments tab.
   - Enable an adjustment. ("If enabled")
   - Select the AUX channel to be used to change the LED strip profile. ("when channel")
   - Set the range to cover the entire range of the selected AUX channel. ("is in ranges")
   - For the action select "RC Rate Adjustment". ("then apply") This will be configured in the CLI since LED strip profiles is not supported by Configurator 10.4.0 and earlier. "RC Rate Adjustment" is only selected to make the configuration in the CLI a little easier below.
   - Select the "via channel" to match the selected AUX channel of above. ("when channel").
   - Save
3. Open the CLI and type `adjrange` followed by enter.
4. Copy the adjrange configured in step 2. above and paste it in the command window. Change the '1' following the range of the channel to '30' and press enter. Type `save` and press enter. The configured adjrange will now be saved and the FC will reboot.
5. Configure the AUX channel on your radio. When this channel is changed the selected LED strip profile will change between STATUS, RACE and BEACON, you should see the LED function change as you do this.

### The RACE Profile

The RACE profile sets all LEDs to one single color, either the colour selected by the user, or to a colour that reflects the currently active VTx channel.

While the RACE profile is active, no other information is displayed by the LEDs, and all settings in Configurator's LED Configuration Tab, other than the brightness of the whole strip, are ignored.
It must be configured via the CLI:

Type `get ledstrip_race_color` followed by enter to display the currently selected race color.

Type `set ledstrip_race_color= abc` where abc is the name of the required color from the color table below. 4. Type `save` followed by enter to save.

#### Setting LED color to the VTx Frequency

The profile must be RACE, the race_color must be black, and the VTx must be communicating with the FC with SmartAudio or IRC Tramp.
It can be activated with these CLI commands:

```

set ledstrip_profile = RACE
set ledstrip_race_color = BLACK

```

The color will then be set according to VTx frequency, as per the following table:

| Frequency range | Channels   | Color        | Color index |
| --------------- | ---------- | ------------ | ----------- |
| \<= 5672        | R1         | WHITE        | 1           |
| > 5672 \<= 5711 | R2         | RED          | 2           |
| > 5711 \<= 5750 | R3, F1     | ORANGE       | 3           |
| > 5750 \<= 5789 | F2, F3     | YELLOW       | 4           |
| > 5789 \<= 5829 | R5, F4, F5 | GREEN        | 6           |
| > 5829 \<= 5867 | R6, F6, F7 | BLUE         | 10          |
| > 5867 \<= 5906 | R7, F8     | DARK_VIOLET  | 11          |
| > 5906          | R8         | DEEP_PINK 13 |

The only way change the color assigned to a given frequency range is to edit the HSV values for the color itself, but this will change how that color appears in all modes and profiles.

### The BEACON Profile

This flashes all LEDs white once per second. It is typically enabled via the radio or OSD to help find a lost quad. When in this profile, no other information is displayed on the LEDs.

### The STATUS Profile

The STATUS profile is the default profile, and the most complex.

It is used to configure LEDs individually, or in groups.
Each LED must be set up via the LED strip tab in Configurator. Typically the user first numbers their LEDs in sequence, in 'wiring mode', and then applies their requested functions to each LED.

The current implementation supports the following:

- Up to 32 LEDs. (Support for more than 32 LEDs is possible, it just requires additional development.)
- solid colours
- Indicators showing pitch/roll/throttle stick positions.
- Heading/Orientation lights.
- Flight mode specific color schemes.
- Low battery warning and other warnings
- AUX operated on/off switch.
- GPS state.
- RSSI level.
- Battery level.
- Larson scanner, rainbow, and similar effects.

#### BRIGHTNESS:

The overall brightness of the LED Strip can be configured using the slider on the LED Strip tab or using the CLI:

1. Open the CLI.
2. Type `get ledstrip_brightness` followed by enter to display the current brightness.
3. Type `set ledstrip_brightness=x` where x is the brightness in percentage between 5 and 100.
4. Type `save` followed by enter to save the brightness level to be used.

Configure the LEDs from the Led Strip tab in the Betaflight GUI.
First setup how the LEDs are laid out so that you can visualize it later as you configure and so the flight controller knows how many LEDs there are available.

There is a step by step guide on how to use the Betaflight App to configure the Led Strip feature using the Betaflight App https://oscarliang.com/setup-led-betaflight/ which was published early 2015 by Oscar Liang which may or may not be up-to-date by the time you read this.

#### Advanced LED configuration

The configuration values for each LED can be displayed in the CLI using the `led` command.

The `led` command with no arguments prints out the current LED configuration, which can be copied for future reference.

Otherwise, `led` expects two arguments - a zero-based LED index number, a space, and then a sequence of parameters in the form:
` index ,y:ddd:mmm:cc`, where:

an `index` value of 0 refers to the first LED in the strip, 14 to the 1th LED, etc
`x` and `y` are grid coordinates of a 0 based 16x16 grid,
`ddd ` is the direction that the LED is pointing in
`mmm` is the operating mode of the LED,

For the `x,y` grid directions, north west (top left) is 0,0; the next one to the right is 1,0; south east is 15,15
`ddd` specifies the direction in which the LED is pointing; since an LED can face in any direction it can have multiple directions. Directions are:

`N` - North
`E` - East
`S` - South
`W` - West
`U` - Up
`D` - Down

An LED that faces South-east at a 45 degree downwards angle could be configured as `SED`.

Note: No direction, or direction of 0 is un-specified. It is possible to configure an LED to have all directions using `NESWUD` but probably doesn't make sense.

`mmm` specifies the functions to apply to the LED.
Each LED may have up to three of the following base functions or overlays applied:
Base functions:

- `C` - `C`olor.
- `F` - `F`light mode & Orientation
- `A` - `A`rmed state.
- `R` - `R`ing thrust state.
- `G` - `G`PS state.
- `S` - R`S`SSI level.
- `L` - Battery `L`evel.

Overlays:

- `W` - `W`arnings.
- `I` - `I`ndicator.
- `T` - `T`hrust state.
- `B` - `B`link (flash twice) mode.
- `O` - Lars`O`n Scanner (Cylon Effect).
- `Y` - Rainbow effect.
- `V` - `V`TX Frequency.

`cc` specifies the color number (0 based index).

Examples:

```
led 0 0,15:SD:AWI:0
led 1 15,0:ND:AWI:0
led 2 0,0:ND:AWI:0
led 3 0,15:SD:AWI:0
led 4 7,7::C:1
led 5 8,8::C:2
led 6 8,9::B:1
```

```
led 0 0,0::CW:2
# sets the first LED on the strip to a Red `C`olor with a `W`arnings overlay; it will be configured to the top left of the Configurator LED array, and has no direction information.
To erase an led, and to mark the end of the chain, use `0,0::` as the second argument, like this:

```

It is best to erase all LEDs that you do not have connected. This can be done for LEDs 3-8 with

```
led 3 0,0::C:0
led 4 0,0::C:0
led 5 0,0::C:0
led 6 0,0::C:0
led 7 0,0::C:0
led 8 0,0::C:0

```

It seems that the mode is always set to `C` for col

### Modes

#### Warning

This mode simply uses the LEDs to flash when warnings occur.

| Warning          | LED Pattern                         | Notes                                                                                               |
| ---------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------- |
| Arm-lock enabled | flash between green and off         | occurs during calibration or when unarmed and the aircraft is tilted too much                       |
| Low Battery      | flash red and off                   | battery monitoring must be enabled. May trigger temporarily under high-throttle due to voltage drop |
| Failsafe         | flash between light blue and yellow | Failsafe must be enabled                                                                            |

Flash patterns appear in order, so that it's clear which warnings are enabled.

#### GPS state

This mode shows the GPS state and satellite count.

No fix = red LED
3D fix = green LED

The LEDs will blink as many times as the satellite count, then pause and start again.

#### RSSI level

This mode binds the LED color to RSSI level.

| Color      | RSSI |
| ---------- | ---- |
| GREEN      | 100% |
| LIME_GREEN | 80%  |
| YELLOW     | 60%  |
| ORANGE     | 40%  |
| RED        | 20%  |
| DEEP_PINK  | 0%   |

When RSSI is below 50% is reached, LEDs will blink slowly, and they will blink fast when under 20%.

#### Battery level

This mode binds the LED color to remaining battery capacity.

| Color      | Capacity |
| ---------- | -------- |
| GREEN      | 100%     |
| LIME_GREEN | 80%      |
| YELLOW     | 60%      |
| ORANGE     | 40%      |
| RED        | 20%      |
| DEEP_PINK  | 0%       |

When Warning or Critical voltage is reached, LEDs will blink slowly or fast.
Note: this mode requires a current sensor. If you don't have the actual device you can set up a virtual current sensor (see [Battery](Battery)).

#### Blink

This mode blinks the current LED, alternatively from black to the current active color.

#### Larson Scanner (Cylon Effect)

The Larson Scanner replicates the scanning "eye" effect seen on the mechanical Cylons and on Kitt from Knight Rider.
This overlay dims all of the LEDs it is assigned to and brightens certain ones at certain times in accordance with the animation. The animation is active regardless of arm state.

#### Rainbow Effect

This mode is cycling through HSV colors periodically. Animation frequency and delta can be changed from the LED Strip tab with sliders.

Alternatively you can use CLI:

1. `set ledstrip_rainbow_freq = x` where x is the frequency in Hz between 1 and 2000.
2. `set ledstrip_rainbow_delta = y` where y is the HSV color difference between adjacent LEDs (from 0 to 359).

:::info

Can also be used with [Larson Scanner](#larson-scanner-cylon-effect) or [Blink](#blink).

:::

#### Flight Mode & Orientation

This mode shows the flight mode and orientation.

When flight modes are active then the LEDs are updated to show different colors depending on the mode, placement on the grid and direction.

LEDs are set in a specific order:

- LEDs that marked as facing up or down.
- LEDs that marked as facing west or east AND are on the west or east side of the grid.
- LEDs that marked as facing north or south AND are on the north or south side of the grid.

That is, south facing LEDs have priority.

The mapping between modes LED placement and colors is currently fixed and cannot be changed.

#### Indicator

This mode flashes LEDs that correspond to roll and pitch stick positions. i.e. they indicate the direction the craft is going to turn.

| Mode        | Direction | LED Color   |
| ----------- | --------- | ----------- |
| Orientation | North     | WHITE       |
| Orientation | East      | DARK_VIOLET |
| Orientation | South     | RED         |
| Orientation | West      | DEEP_PINK   |
| Orientation | Up        | BLUE        |
| Orientation | Down      | ORANGE      |
|             |           |             |
| Head Free   | North     | LIME_GREEN  |
| Head Free   | East      | DARK_VIOLET |
| Head Free   | South     | ORANGE      |
| Head Free   | West      | DEEP_PINK   |
| Head Free   | Up        | BLUE        |
| Head Free   | Down      | ORANGE      |
|             |           |             |
| Horizon     | North     | BLUE        |
| Horizon     | East      | DARK_VIOLET |
| Horizon     | South     | YELLOW      |
| Horizon     | West      | DEEP_PINK   |
| Horizon     | Up        | BLUE        |
| Horizon     | Down      | ORANGE      |
|             |           |             |
| Angle       | North     | CYAN        |
| Angle       | East      | DARK_VIOLET |
| Angle       | South     | YELLOW      |
| Angle       | West      | DEEP_PINK   |
| Angle       | Up        | BLUE        |
| Angle       | Down      | ORANGE      |
|             |           |             |
| Mag         | North     | MINT_GREEN  |
| Mag         | East      | DARK_VIOLET |
| Mag         | South     | ORANGE      |
| Mag         | West      | DEEP_PINK   |
| Mag         | Up        | BLUE        |
| Mag         | Down      | ORANGE      |
|             |           |             |
| Baro        | North     | LIGHT_BLUE  |
| Baro        | East      | DARK_VIOLET |
| Baro        | South     | RED         |
| Baro        | West      | DEEP_PINK   |
| Baro        | Up        | BLUE        |
| Baro        | Down      | ORANGE      |

#### Armed state

This mode toggles LEDs between green and blue when disarmed and armed, respectively.

Note: Armed State cannot be used with Flight Mode.

#### Thrust state

This mode fades the current LED color to the previous/next color in the HSB color space depending on throttle stick position. When the throttle is in the middle position the color is unaffected, thus it can be mixed with orientation colors to indicate orientation and throttle at the same time. Thrust should normally be combined with Color or Mode/Orientation.

#### Thrust ring state

This mode is allows you to use one or multiple LED rings (e.g. NeoPixel ring) for an afterburner effect. LEDs with this mode will light up with their assigned color in a repeating sequence. Assigning the color black to an LED with the ring mode will prevent the LED from lighting up.

A better effect is achieved when LEDs configured for thrust ring have no other functions.

LED direction and X/Y positions are irrelevant for thrust ring LED state. The order of the LEDs that have the state determines how the LED behaves, and the throttle value determines the animation rate. The animation is only active while armed.

Each LED of the ring can be a different color. The color can be selected between the 16 colors available.

For example, LED 0 is set as a `R`ing thrust state LED in color 13 as follow.

```
led 0 2,2::R:13
```

LED strips and rings can be combined.

#### Solid Color

The mode allows you to set an LED to be permanently on and set to a specific color.

x,y position and directions are ignored when using this mode.

Other modes will override or combine with the color mode.

For example, to set LED 0 to always use color 10 you would issue this command.

```
led 0 0,0::C:10
```

### Colors

Colors can be configured using the cli `color` command.

If no arguments are provided, `color` prints out the current
color configuration, which can be copied for future reference.

If two arguments are provided, they must be separated by a space.
The first is a zero-based color identifier number between 0 and 14.
The second contains the three HSV values that define that color, separated by commas.
Hue is in the range 0-359 (degrees) where 0 is red, 60 is yellow, 120 is green, 180 is cyan, returning to red at 359.
S is color saturation, from 0-255, where 0 means fully saturated and 255 means no saturation (no colour). This is the reverse of 'normal' HSV formats where 100 means fully saturated.
V means Brightness Value. It is a value from 0-255, where 0 always means black, and 255 means 100% bright. Zero brightness always returns black.

See http://en.wikipedia.org/wiki/HSL_and_HSV, noting that Betaflight handles saturation differently.

The default color configuration is as follows:

| Index | Color Name  | Betaflight HSV |
| ----- | ----------- | -------------- |
| 0     | BLACK       | 0,0,0          |
| 1     | WHITE       | 0,255,255      |
| 2     | RED         | 0,0,255        |
| 3     | ORANGE      | 30,0,255       |
| 4     | YELLOW      | 60,0,255       |
| 5     | LIME_GREEN  | 90,0,255       |
| 6     | GREEN       | 120,0,255      |
| 7     | MINT GREEN  | 150,0,255      |
| 8     | CYAN        | 180,0,255      |
| 9     | LIGHT_BLUE  | 210,0,255      |
| 10    | BLUE        | 240,0,255      |
| 11    | DARK_VIOLET | 270,0,255      |
| 12    | MAGENTA     | 300,0,255      |
| 13    | DEEP_PINK   | 330,0,255      |
| 14    | NOT USED    | -              |
| 15    | NOT USED    | -              |

The following snippet will reset colors to defaults"

```
color 0 0,0,0
color 1 0,255,255
color 2 0,0,255
color 3 30,0,255
color 4 60,0,255
color 5 90,0,255
color 6 120,0,255
color 7 150,0,255
color 8 180,0,255
color 9 210,0,255
color 10 240,0,255
color 11 270,0,255
color 12 300,0,255
color 13 330,0,255
color 14 0,0,0
color 15 0,0,0
```

### Mode Colors Assignment

Mode Colors can be configured using the cli `mode_color` command.

- No arguments: lists all mode colors
- arguments: mode, function, color

First 8 groups of ModeIndexes are :

| mode | name        |
| ---- | ----------- |
| 0    | orientation |
| 1    | headfree    |
| 2    | horizon     |
| 3    | angle       |
| 4    | mag         |
| 5    | baro        |
| 6    | special     |
| 7    | channel     |

Modes 0 to 5 functions:

| function | name  |
| -------- | ----- |
| 0        | north |
| 1        | east  |
| 2        | south |
| 3        | west  |
| 4        | up    |
| 5        | down  |

Mode 6 use these functions:

| function | name               |
| -------- | ------------------ |
| 0        | disarmed           |
| 1        | armed              |
| 2        | animation          |
| 3        | background         |
| 4        | blink background   |
| 5        | gps: no satellites |
| 6        | gps: no fix        |
| 7        | gps: 3D fix        |

The ColorIndex is picked from the colors array ("palette").

Mode 7 is used along with Thrust state to make the LED color dependent on a channel different from the throttle.

Examples (using the default colors):

- set armed color to red: `mode_color 6 1 2`
- set disarmed color to yellow: `mode_color 6 0 4`
- set Headfree mode 'south' to CYAN: `mode_color 1 2 8`
- set color dependent on AUX 1 in Thrust state: `mode_color 7 0 4`

## Positioning

Cut the strip into sections as per diagrams below. When the strips are cut ensure you reconnect each output to each input with cable where the break is made. e.g. connect 5V out to 5V in, GND to GND and Data Out to Data In.

Orientation is when viewed with the front of the aircraft facing away from you and viewed from above.

### Example 12 LED config

The default configuration is as follows

```
led 0 15,15:ES:IA:0
led 1 15,8:E:WF:0
led 2 15,7:E:WF:0
led 3 15,0:NE:IA:0
led 4 8,0:N:F:0
led 5 7,0:N:F:0
led 6 0,0:NW:IA:0
led 7 0,7:W:WF:0
led 8 0,8:W:WF:0
led 9 0,15:SW:IA:0
led 10 7,15:S:WF:0
led 11 8,15:S:WF:0
led 12 7,7:U:WF:0
led 13 8,7:U:WF:0
led 14 7,8:D:WF:0
led 15 8,8:D:WF:0
led 16 8,9::R:3
led 17 9,10::R:3
led 18 10,11::R:3
led 19 10,12::R:3
led 20 9,13::R:3
led 21 8,14::R:3
led 22 7,14::R:3
led 23 6,13::R:3
led 24 5,12::R:3
led 25 5,11::R:3
led 26 6,10::R:3
led 27 7,9::R:3
led 28 0,0:::0
led 29 0,0:::0
led 30 0,0:::0
led 31 0,0:::0
```

Which translates into the following positions:

```
     6             3
      \           /
       \   5-4   /
        \ FRONT /
    7,8 | 12-15 | 1,2
        /  BACK \
       /  10,11  \
      /           \
     9             0
       RING 16-27
```

LEDs 0,3,6 and 9 should be placed underneath the quad, facing downwards.
LEDs 1-2, 4-5, 7-8 and 10-11 should be positioned so the face east/north/west/south, respectively.
LEDs 12-13 should be placed facing down, in the middle
LEDs 14-15 should be placed facing up, in the middle
LEDs 16-27 should be placed in a ring and positioned at the rear facing south.

This is the default so that if you don't want to place LEDs top and bottom in the middle just connect the first 12 LEDs.

### Example 16 LED config

```
led 0 15,15:SD:IA:0
led 1 8,8:E:FW:0
led 2 8,7:E:FW:0
led 3 15,0:ND:IA:0
led 4 7,7:N:FW:0
led 5 8,7:N:FW:0
led 6 0,0:ND:IA:0
led 7 7,7:W:FW:0
led 8 7,8:W:FW:0
led 9 0,15:SD:IA:0
led 10 7,8:S:FW:0
led 11 8,8:S:FW:0
led 12 7,7:D:FW:0
led 13 8,7:D:FW:0
led 14 7,7:U:FW:0
led 15 8,7:U:FW:0
```

Which translates into the following positions:

```
     6             3
      \           /
       \   5-4   /
      7 \ FRONT / 2
        | 12-15 |
      8 /  BACK \ 1
       /  10-11  \
      /           \
     9             0
```

LEDs 0,3,6 and 9 should be placed underneath the quad, facing downwards.
LEDs 1-2, 4-5, 7-8 and 10-11 should be positioned so the face east/north/west/south, respectively.
LEDs 12-13 should be placed facing down, in the middle
LEDs 14-15 should be placed facing up, in the middle

### Example 28 LED config

```
#right rear cluster
led 0 9,9:S:FWT:0
led 1 10,10:S:FWT:0
led 2 11,11:S:IA:0
led 3 11,11:E:IA:0
led 4 10,10:E:AT:0
led 5 9,9:E:AT:0
# right front cluster
led 6 10,5:S:F:0
led 7 11,4:S:F:0
led 8 12,3:S:IA:0
led 9 12,2:N:IA:0
led 10 11,1:N:F:0
led 11 10,0:N:F:0
# center front cluster
led 12 7,0:N:FW:0
led 13 6,0:N:FW:0
led 14 5,0:N:FW:0
led 15 4,0:N:FW:0
# left front cluster
led 16 2,0:N:F:0
led 17 1,1:N:F:0
led 18 0,2:N:IA:0
led 19 0,3:W:IA:0
led 20 1,4:S:F:0
led 21 2,5:S:F:0
# left rear cluster
led 22 2,9:W:AT:0
led 23 1,10:W:AT:0
led 24 0,11:W:IA:0
led 25 0,11:S:IA:0
led 26 1,10:S:FWT:0
led 27 2,9:S:FWT:0
```

```
       16-18  9-11
19-21 \           / 6-8
       \  12-15  /
        \ FRONT /
        /  BACK \
       /         \
22-24 /           \ 3-5
       25-27   0-2
```

All LEDs should face outwards from the chassis in this configuration.

## Troubleshooting

On initial power up the LEDs on the strip will be set to WHITE. This means you can attach a current meter to verify the current draw if your measurement equipment is fast enough. Most 5050 LEDs will draw 0.3 Watts a piece.
This also means that you can make sure that each R,G and B LED in each LED module on the strip is also functioning. After a short delay the LEDs will show the unarmed color sequence and or low-battery warning sequence.

Also check that the feature `LED_STRIP` was correctly enabled and that it does not conflict with other features, as above.
Some LED configurations can be CPU intensive, check 'TASKS' in CLI to review this. RACE mode uses very little CPU.

## Resource remapping

If your board does not have a physical LED_STRIP pin you still can use this feature but configuration is dependent on target resources.

An example for a Foxeer F745V3_AIO board using SERIAL_RX 1 as LED_STRIP:

```
resource SERIAL_RX 1 A10
resource SERIAL_RX 1 NONE
resource LED_STRIP 1 A10
timer show # show current timer list
timer A10 list # check available timers for next command
timer A10 AF1
dma show # show current dma list
dma pin A10 list # check available dma pins for next command
dma pin A10 0
feature LED_STRIP
save
```

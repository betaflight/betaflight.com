# Led Strip Functionality

## Betaflight 4.0

Add crash flip recovery_led_warning, this can be used instead of a buzzer

when crash flip recovery is active (AKA Turtle MODE). Added on the list of warnings to be shown on LED_STRIP.

@watageek Please don't change the page title, as it is part of the URL that already have a reference to.

## LED color by AUX channel

Some race events require each craft to be identified by LED colors, and it is convenient to have an AUX channel to change the color.

For example, the first FAI drone event in Shenzhen requests one of Red, Blue, Yellow, Green, Purple and White for this purpose.

https://github.com/betaflight/betaflight/issues/6896#issuecomment-427647756 gives a solution based on available LED strip facility.

## LED color based on VTX frequency

When using TBS SmartAudio or IRC Tramp you can have the LEDs change color based on your VTX channel by enabling the VTX overlay in the LED strip tab.

**_Betaflight 3.3_**

The following table shows what color each frequency is assigned to.

| Frequency range | Default color | Color index |
| --------------- | ------------- | ----------- |
| \<= 5672        | White         | 1           |
| > 5672 \<= 5711 | Red           | 2           |
| > 5711 \<= 5750 | Orange        | 3           |
| > 5750 \<= 5789 | Yellow        | 4           |
| > 5789 \<= 5829 | Green         | 6           |
| > 5829 \<= 5867 | Blue          | 10          |
| > 5867 \<= 5906 | Dark violet   | 11          |
| > 5906          | Deep pink     | 13          |

The default color can be changed by double-clicking the color and moving the Hue slider or by using the color command in the CLI.

### Example

```
color 3 10,0,255
color 4 38,0,255
```

```
color "color_index" "Hue", "Saturation", "Value"
```

## How to set up Throttle functionality with LEDs

For the selected LED, select function Color, then activate the Color Modifier that's labeled Throttle by default. After that, it's possible to select another channel which will control the fading of the selected LED (drop-down menu).

After that, choose one of the 16 colors. This is the color which is shown when the chosen channel is at its Middle value. The color with the previous number is shown when the chosen channel is at its Minimum value, and the color with the next number is shown when the channel is at its Maximum value. The colors loop around if using channel 0 or 15.

The fade is linear of all HSV values, so it's easy to fade from completely black to bright yellow or red.

## Change LED color with an aux channel.

By using an aux channel instead of throttle as the color modifier you can use an aux channel on your radio to adjust the LED color. When using the Color function the aux channel will only fade through the previous color to the next color with the selected color being at the center position of the aux channel.

By changing the LED Function to Arm State the aux channel will fade through all possible colors.

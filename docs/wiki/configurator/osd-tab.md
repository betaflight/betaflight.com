---
sidebar_position: 14
---

# OSD Tab

Betaflight OSD allows the pilot to view in-flight information and telemetry data overlaid onto their FPV camera feed.
This is where you can configure the OSD elements and their layout, as well as the alarms and warnings which will be
displayed.

![OSD Tab](/img/betaflight_configurator_osd_tab.png)

OSD requires a supported device. Supported devices include the onboard MAX7456 featured in many flight controllers, the
FrSky OSD board and digital VTXs which support the MSP Displayport protocol.

OSD elements enabled by toggling the checkbox next to the element. Elements can then be moved by dragging them around
the Preview pane, changes are reflected in real-time and viewable via the VTX and goggles. Three profiles are available
and can be swapped to provide different elements and layouts.

## Active OSD profiles

Selects the OSD profile which will be overlaid on the camera data.

## Video Format

- **Auto** - attempts to guess the appropriate output type

- **PAL** - Uses a 30 columns x 16 row grid of OSD elements. If the MAX7456 chip is used then this must match the
  camera signal

- **NTSC** - Uses a 30 columns x 13 row grid of OSD elements. If the MAX7456 chip is used then this must match the
  camera signal

- **HD** - Used by Digital VTXs which accept OSD commands via MSP Displayport

:::info

HD OSD defaults to a 53 column x 20 row grid of
OSD elements. When the VTX is online BetaFlight will query via MSP Displayport to determine the optimum grid size and
may update the grid to match what is supported by the digital VTX system

:::

## Units

Set the system of Units to use when rendering OSD data.

| System   | Speed               | Distance   | Temperature |
| -------- | ------------------- | ---------- | ----------- |
| Metric   | Kilometers per hour | Kilometers | Celsius     |
| Imperial | Miles per hour      | Miles      | Fahrenheit  |
| British  | Miles per hour      | Kilometers | Celsius     |

## Timers

Three timer alarms are available to show and OSD alarm when one of the selected timer Sources reaches the Alarm value.

## Alarms

Show an OSD alarm when one of the values reaches the number input here.

## Warnings

The OSD Warnings element can show error conditions from a number of different sources. If the pilot wishes they can
disable some of these warnings.

## Post Flight Statistics

When the craft disarms the OSD will show a post-flight screen including the statistics selected here

## Font Manager

When using a MAX7456 chip the font glyphs are uploaded from the Font Manager

![OSD Font Manager](/img/betaflight_configurator_font_manager.png)

### Font Presets

This can be used to select different font styles which heavier or lighter lettering and different styles. Use Upload
Font to save changes

### Boot Logo

A custom boot logo can be uploaded. The image must be 288x72 pixels, and green/white/black. Green areas are rendered as
transparent. Use Upload Font to save changes

### Upload Font

Font upload max be required when upgrading from older versions of Betaflight as font symbols have been added and
changed over time. In particular if your crosshair looks wrong or if your display appears garbled or using incorrect
characters you should try uploading the font again.

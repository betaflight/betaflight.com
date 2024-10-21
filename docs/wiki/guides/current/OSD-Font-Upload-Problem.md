# OSD Font Upload Problem

## Description

Betaflight-configurator font upload function via USB doesn't seem to work on some flight controllers.

![OscarLiang](https://oscarliang.com/ctt/uploads/2017/07/betaflight-osd-font-manager.jpg)

No matter how many times you upload the font, the OSD still display the default font.

## Resolution

You need the battery to be **plugged in** so the function works properly (**PROPS REMOVED!**). Plug the battery in **FIRST**, then connect to USB.

## Most probable Cause

Some flight controller designed don't power the OSD chip properly (or at all) when connected only to USB. The OSD font is stored inside the OSD chip so it must be powered and communicating with the rest of the flight controller so that the font can be updated.

# Concerned Board

The following board/FC are known to have font upload problem

| Board Name                 | Target        | OSD chip | Lipo in fix issue ? | Product URL                                                                                                                                       |
| -------------------------- | ------------- | -------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| DAL RC F405 AIO            | DALRCF405     | N/A      | yes                 | [dalrc](http://www.dalrc.cn/DALRC/plus/view.php?aid=186)                                                                                          |
| DAL RC F722Dual            | DALRCF722DUAL | N/A      | yes                 |                                                                                                                                                   |
| Speedy Bee F7 AIO          | SPEEDYBEEF7   | N/A      | yes                 | [Speedy Bee F7](https://www.speedybee.com/f7-aio-flight-controller/)                                                                              |
| Diatone Mamba F405 Mini FC | FURYF4OSD     | N/A      | yes                 | [diatone](https://www.diatoneusa.com/store/p574/MAMBA_F405_Mini_Betaflight_Flight_Controller_F25_25A_2_4S_DSHOT600_FPV_Racing_Brushless_ESC.html) |

# Source

[Issue link](https://github.com/betaflight/betaflight-configurator/issues/1301)

# ESC pass-through

## Betaflight BLHeli ESC pass-through

1- Connect FC to computer and note COMM port number.
2- Open BLHeli Suite. Select Comm Port and click Connect.
3- In 'Select ATEM/SILABS Interface' menu select 'SILABS BLHeli Bootloader (CleanFlight)'.
4- Apply power the ESCs (through a Current Limiter).
5- Click 'Read Setup'.

Now ready to change ESC settings or Flash new firmware.

## Betaflight KISS ESC pass-through

New feature for 3.1 allows to flash kiss escs with a pass-through and KISS flash loader app.
Note: it is apparently not yet active on all targets.
The FLASH LOADER is a Chrome App and must be 'installed' in Extensions with 'Developer Mode' enabled.

For now you have to enable passthrough in the cli and than flash through flash loader app. Later it might be done from the app directly.

KISSESC_flashloader also attached to [First Post of DShot Thread](https://www.rcgroups.com/forums/showthread.php?2756129-DShot-testing-a-new-digital-parallel-ESC-throttle-signal) in the "Files" section.

[Flydiuno Down Loads](http://kiss.flyduino.net/downloads/)

Command for esc #1:
escprog ki 1

Command for esc #2:
escprog ki 2

Command for all 4 escs at the same time:
escprog ki 255

Procedure is easy:

- Enter above commands in the cli and disconnect from configurator by clicking disconnect button.
- Go to kiss flash loader app and select com port to connect.
- Select USB-uart
- Select dshot hex file to flash
- You can enable fast bootloader for faster flashing. Some report Fast not working so disable if fails.
- Connect lipo (through a Current Limiter). Do not connect before this step.
- Press flash and you will see LED blinking on the escs.
- Disconnect lipo and usb cable and you are now able to use dshot

If the above command doesn't work escserial flash passthrough is not enabled yet.
Btw also castle escs can be flashed on the same way.

[KISS Flashing Tips](https://www.rcgroups.com/forums/showthread.php?2864933-Another-Kiss-24a-ESC-flashing-question%21%21-need-some-tips)

## Current Limiter

### Always use a Current Limiter when ever a LiPo is connected on the Bench for Testing or ESC Flashing, Calibrating or any time the Configurator is open.

Light Bulb Current Limiter Build thread, ie: The Smoke Stopper:
[https://www.rcgroups.com/forums/showthread.php?2327875-DIY-SAVE-YOUR-ELECTRONICS!-BUILD-A-SmokeStopper%C2%99-!]

# Serial Passthrough

## Update FrSky XSR RX Firmware

I was unable to replicate due to issues with the FrSky tool not loading COM ports. If you are familiar with this procedure, please update if necessary.

UPDATE: Joshua Bardwell has posted a video on this process. See
[https://www.youtube.com/watch?v=Hzf-EuQZYsE](https://www.youtube.com/watch?v=Hzf-EuQZYsE)

### FrSky Tool

[https://www.frsky-rc.com/stk/](https://www.frsky-rc.com/stk/)

- Expand **Tool-FrSky update sport**
- Click the **Download** button
- Extract the contents (it's a .zip) and remember the location

### FrSky Rx Firmware

[https://www.frsky-rc.com/download/](https://www.frsky-rc.com/download/)

Download the firmware for your Rx (if you don't see your Rx, below, go to the download page (above) and find the correct firmware for your model Rx). Extract and remember the location:

- [https://www.frsky-rc.com/xsr/](https://www.frsky-rc.com/xsr/)
- [https://www.frsky-rc.com/r-xsr/](https://www.frsky-rc.com/r-xsr/)
- [https://www.frsky-rc.com/xm-plus-mini-sbus-non-telemetry-full-range/](https://www.frsky-rc.com/xm-plus-mini-sbus-non-telemetry-full-range/)
- [https://www.frsky-rc.com/x4rsb/](https://www.frsky-rc.com/x4rsb/)
- [https://www.frsky-rc.com/r9-mini/](https://www.frsky-rc.com/r9-mini/)
- https://www.frsky-rc.com/r9-slim-plus/

### The Process

NOTE: This might not work in every case. To increase success rate, it's important to power the Rx from a 5 volt source other than a dedicated Rx power pad, _as you do not want the Rx to be powered by USB_. On some flight controllers, there is a set of dedicated pads for Rx, i.e., Ground, 5V, and Signal. The 5V pad is sometimes powered when connecting USB. You want to _avoid_ this 5V source and tap into any other 5V source on the FC.

ALSO, this works best if you know SmartPort is working, as you will use this UART. It's much easier to deal with an F4 flight controller that has a dedicated SmartPort pad. If no dedicated pad, then you'll need to understand inversion, which is beyond this scope. F3's and F7's natively support UART inversion, so almost any UART Tx pad will do, so it's a non-issue on those.

**IMPORTANT!** Don't disconnect power while flashing/upgrading your Rx!

- Connect the copter to your computer via USB (if the Rx powers up, might as well stop - it should not power up), and note the COM port
- Go to **Ports** tab and note the UART SmartPort is on, and subtract 1 (e.g., if SmartPort is on UART 3, then 2 is the number you want)
- Open the Betaflight App, connect your copter, access CLI
- Enter and send command `serialpassthrough 2 57600` (where '2' is the UART ID; remember, UART 3 is actually ID 2, UART 2 would be 1, and UART 1 would be 0), then press **ENTER**.

If all went well, you should see:

`Port 2 opened, baud = 57600`

`Forwarding, power cycle to exit`

- Close the Betaflight App (but do not power cycle the FC)
- Start the **FrSky_Update_sport_rev**... tool (this will be found in the folder where the contents of _Tool-FrSky update sport_ were extracted to)
- Select the COM port (whatever the Betaflight App was using).
- Then click the **File** button and navigate to where you extracted the firmware update for your Rx. The tool is now waiting to find a device; the bottom of the tool window will show "_Finding device..."_
- Apply power to the copter (LiPo), which will power the Rx.

If that went well, you should see the firmware version at the bottom of the tool window, instead of "Finding device". If this is not the case, then it didn't work.

- If okay up to this point, click the **Download** button...the status message at the bottom should now read "Please wait, in progressing" (their typo, not mine)

## If the Rx is powered up by USB

It happens in some cases. If you have such a setup, you will need some way to disconnect the receiver, i.e. use a plug. Reconnect it once the tool window shows "_Finding device..."_ and flashing will commence. Try at own risk.

## NOTES

From BryceJ:
On my Spracingf3 board with a CP210x it would only work if I had my MSP changed to 57600 as well. Not sure what is the issue there. (If you change the MSP speed make sure you reconnect to the configurator at 57600 as well)

If you use the PID/VTx adjustment on the taranis, make sure that still works. There was a couple versions that it didn't.

For disconnecting the XSR, if you have the plug still on there you can plug and unplug that. On a x4r it would be a little more annoying if you direct soldered it.

## minimOSD Serial Pass-through

Allows use of the MW OSD Configurator to adjust settings and load fonts.

[Video](https://www.youtube.com/watch?v=5ABd0gz3ckI)

# MotoLab Typhoon F4

![](http://gdurl.com/GGSY)
![](http://gdurl.com/9Idm)
![](https://static.rcgroups.net/forums/attachments/4/5/2/0/2/8/a10021635-46-IMG_20170507_155528.jpg)

[MotoLab Typhoon F4 & VTX Video](https://www.youtube.com/watch?v=h0VcUPcgi8A)

## Description

A complete FC, PDB, VTX, OSD and MicroSD system with F4 CPU on two boards with minimal cabling.

## Hardware

### Typhoon F4 Flight Controller:

- 168MHz STM32F4 version of Tempest
- 100+A PDB with 200A motor current sensor
- MPU6000 gyro/acc on SPI bus
- Up to 4 serial ports plus USB
- Up to 6 DShot motor outputs
- Serial inverters for SBUS and S.PORT
- 1.5A 5V regulator with LC filtered 5V for VTX and camera
- Plug-in connection to VTX board
- 38x40mm board size with 30.5mm mounting hole spacing
- 2S to 6S lipo compatible

- The Typhoon F4 is compatible with Betaflight using the new MLTYPHF4 board target.
- The F4 board mates directly with the VTX board with no external wiring between the two.

### Typhoon VTX:

- 25/200/500mW switchable, 40-ch video transmitter
- Betaflight OSD
- MicroSD slot for Blackbox
- Direct plug-in connection to camera and antenna with available custom cables
- Pass-through connector for camera joystick
- 38x38mm board with 30.5mm mounting hole spacing

- The Typhoon VTX is a self-contained video system, operating on filtered 5V provided by the Typhoon F4. The video is isolated from the PDB power distribution and delivers cleaner video.

- The VTX board mates directly with the F4 controller board with no external wiring between the two.

- Note: The VTX board is not powered from the USB input. The board should NOT be powered from lipo without an antenna connected.

- The VTX will display a screen full of the letter "V" until a font is uploaded. Use the "Upload Font" button on the Configurator VTX tab and select a font. The VTX must be powered from lipo during upload.

The VTX controls are through the BetaFlight OSD functions using the RC transmitter. The VTX requires uploading a font through the Font Manager in the Betaflight App. The only other control is the power selection switches. The settings for that are:

- SW1 ON, SW2 ON 25mW
- SW1 OFF, SW2 ON 200mW
- SW1 OFF, SW2 OFF 500mW

The VTX can also be configured while on USB power (the VTX is not powered) with Configurator using CLI commands vtx_band and vtx_channel.

The values (1-5) for vtx_band in CLI are:

- 1: Boscam A
- 2: Boscam B
- 3: Boscam E
- 4: Fatshark
- 5: Raceband

vtx_channel values are 1-8 for channel 1-8.

### Sources

- [RocketCityFPV](http://www.rocketcityfpv.com/Motolab-TyphoonF4-Flight-Controller_p_77.html)
- [DefianceRC](https://www.defiancerc.com/collections/flight-controller/products/motolab-typhoon-f4-flight-controller-vtx-combo)
- [65Drones](https://www.65drones.com/products/motolab-typhoon-f4-flight-controller-and-typhoon-vtx)
- [Multicopter Builders](https://multicopterbuilders.com/products/motolab-tempest-f4-flight-controller-fc)

### Firmware

- Firmware target: MLTYPHF4

The MLTYPHF4 target is included in Betaflight 3.2 and later releases.

### Pinout

https://www.rcgroups.com/forums/showatt.php?attachmentid=10039116&d=1494799003

## Manufacturers and Distributors

Manufactured by MotoLab.

## Designers

Moto Moto

## Maintainers

Moto Moto
_(add your name here if you help test or contribute code for this board)_

## Similar Targets

[MotoLab Tempest F4](MLTEMPF4)

## FAQ & Known Issues

#### I can't get it to connect properly in DFU mode!

There are two reason the board might not appear as the correct device:

1. The firmware is corrupted or wrong file loaded. The red led should flash at startup, and then flash if the board is rotated from level if the firmware is running. If not, force DFU mode with the boot pins and reflash with "No reboot sequence" enabled.

2. The wrong drivers are installed. Zadig should be used to install only the DFU mode driver. Connect in DFU mode with the boot pins, and then install the driver listed in post #1. The default Windows drivers should work for VCP mode.

#### how do I configure the vtx like change channels?

Stick commands are shown on the OSD startup screen. Mid throttle, yaw left and roll centered, pitch up.

#### Can the Typhoon's stackable Vtx's power, band, and channel be controlled/adjusted via the radio/goggles? Asking because I'm trying to decide between it and a tbs Unify, which has SmartAudio. Could only see reference to controlling the power via dipswitches and band/channel via CLI commands.

The Typhoon band and channel can be selected through the Betaflight OSD or CLI. Power selection is on the switches, although there is a power setting in the OSD that affects the RF preamp gain and not the power amp gain.

The Typhoon FC is intended for use with the VTX specifically. It won't connect easily to other VTXs. The Tempest F4 is designed specifically for use with a Unify Pro and comes with a custom cable for that. The Tempest has the OSD and SD card on the FC board also. If you want to use a Unify, get the Tempest F4.

## Other Resources

Setup Guides:
See Post #2 of this thread:
https://www.rcgroups.com/forums/showthread.php?2537379-MotoLab-Board-Setup-and-Troubleshooting
More in this thread:
https://www.rcgroups.com/forums/showthread.php?2715556-MotoLab-Flight-Controllers

Board stuck in 'unknown device' mode? Check out this post:
https://www.rcgroups.com/forums/showpost.php?p=37567682&postcount=3053

Joshua Bardwell Video [Review](https://www.youtube.com/watch?v=dD7Hla63Xho)

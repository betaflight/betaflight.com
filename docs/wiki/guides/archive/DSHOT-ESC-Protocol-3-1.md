# DShot & BetaFlight 3.1

:::note
This is an out of data note describing the early introduction of DShot in 3.1.

DShot is new and currently code is being developed and tested. Since there are many dependencies and not all current hardware works this is to help keep track.

The Official Thread for DShot is: https://www.rcgroups.com/forums/showthread.php?t=2756129
Please Read this thread for details of how it works and up to date info. The First Post of this thread has all the needed Links to code and other info. A good article on DShot and ESC protocols is here:
https://blck.mn/2016/11/dshot-the-new-kid-on-the-block/

ESC Protocol videos by Joshua Bardwell:
https://www.rcgroups.com/forums/showpost.php?p=36552970&postcount=2765

In the DShot thread is this post on how to re-Flash ESCs & FC:
https://www.rcgroups.com/forums/showpost.php?p=36200950&postcount=1468

For KISS FC's and ESCs see the KISS DShot thread:
https://www.rcgroups.com/forums/showthread.php?t=2780055

[BetaFlight V3.1 released](/docs/wiki/release/older/Betaflight-3-1-Release-Notes)
Just remember that this is still Experimental code and may have serious limitations.
Read here to Learn exactly what firmware issues and features are being worked on:
https://github.com/betaflight/betaflight/issues?q=is%3Aissue+is%3Aclosed+sort%3Aupdated-desc

The Latest Development version of the Configurator is recommended.

### Some known limitations are:

3.1 seems most issues are fixed. Any issues discovered should be in the 3.1.X wiki page now.

- All STM32F1 Target do not support DSHOT
- Some ESCs that have a signal filter cap may not work until the cap is removed.
- Some targets have a DMA conflict between a motor and the LEDs. Some have work-arounds but some do not. If no work-around is listed then disable LEDs and contact the FC designer/support.
- No reports of DShot working for HEX copter.

### A quick way to determine IF the Firmware flashed into the FC supports DShot:

Go to the CLI and type "get pwm". All settings with 'pwm' in the name will be shown with all options.
If DSHOT150, DSHOT300, DSHOT600 is NOT in the list for the "motor_pwm_protocol" then this firmware does NOT support DShot.
Example for a target that does NOT support DShot:

motor_pwm_protocol = ONESHOT42
Allowed values: OFF, ONESHOT125, ONESHOT42, MULTISHOT, BRUSHED

### Setting Minimum Throttle

Note: In Firmware 3.1.1 and earlier min_check and min_throttle are affecting the DShot idle value so adjusting the motor idle speed is not straight forward. If running these earlier versions of firmware try defaults and then adjust 'digital_idle_percent' until the motors ilde at the desired speed.
This got fixed in 3.1.2 and up so now digital_idle_percent Only sets the DShot idle speed.
Be aware that DShot ESCs can run motors at much slower speeds but if idle speed is too low the motor may Stall in flight during hard maneuvers and you get a 'death roll'. If this happens increase the value of digital_idle_percent.

##### Post by Cheredanine on setting up IDLE in ßF 3.1.2 and up:

Ok first Point - dshot does not use min and max throttle, you don't need to do that.
Second point - when not using min and max throttle you should calibrate from bf, not manually set in blheli.
Could someone please explain if I need to type the "digital_idle_offset" command?
So let's deal with your question.
To check what value digital idle should be set to, connect to configurator, go to the motor tab, take your props off. Click the little check box half way down the page that says you have taken your props off, you know what you are doing, you take full responsibility for your actions and you consider fingers pointless appendages anyway.

Then plug in the LiPo to the quad (USE a Current Limiter Always). Click on the master slider and use the up arrow on the keyboard to increase the master slider one point at a time until you reach a point where all 4 motors have just started to spin, I don't mean twitch, stutter or start stop, I mean the lowest value where they are spinning, it is probably about 1010, don't worry if it isn't, but I am going to use that number as an example.

You can now take the master slider back to zero and unplug the LiPo.

Take the number (for example purposes 1010) and add thirty points to it (so in the example we are now at 1040).
Not we need work out what percentage of the throttle range this is, I don't know your math skills so sorry if this is a little hand to mouth.
Subtract 1000 from it, then divide by 10

So in the example:
1040-1000=40
40/10=4

Go to the cli tab in configurator
Click in the box at the bottom and type:

set digital_idle_percent = 4

(Replace 4 with whatever digital idle you arrived at in the calculation)
Hit return, you will see the command processed in the back bit above,
Then click in the box again and type

save

Hit return and done

### ESC Cal and min/max throttle

ßF firmware with DShot does Not use the min_throttle or max_throttle setting, these are ignored.
Just ensure that in the ESCs (BLHeli Suite) that PPM_MIN_THROTTLE is set to 1000 and PPM_MAX_THROTTLE is set to 2000.
Note: This is not needed in BLHeli_S 16.43 and up since the PPM_MIN & MAX values are not used for DShot.

**This means that when DSHOT is use NO ESC Calibration is required. Just Select DSHOT.**

#### Max ESC update speed supported by different dshot versions:

##### WARNING: due to processor tasks, FC and/or ESC, the maximum update rate may not work-

##### TEST without props and a Current Limiter.

Theoretical speeds are a lot higher. The speed is limited in firmware to give more spreading between signals.

- DSHOT150: 4kHz max
- DSHOT300: 10,6kHz max (10,6khz is only available on 32khz gyro boards)
- DSHOT600: 16kHz max
- DSHOT1200: >32khz max (Currently only KISS24 supports DSHOT1200)

Note: When DSHOT is enabled Unsyced PWM is disabled. DSHOT always runs at the PID loop rate.

#### DShot digital Values:

0 = disarmed.
1 to 47 = Reserved for special commands.
48 to 2047 = Active throttle control.

### Originally Posted by airmaxx23

I recently finished building a new quad with the BFF3 controller and Armattan 20a ESCs with DShot 300 enabled. The first thing I've noticed is that the ESCs tones are out of sync when I plug a battery in and I'm having a flip/roll of death once in a while. What should I check first?

#### Answer from AILERON8

I've been reloading the BLHeli configurator and reflashing the ESCs, then setting the ESCs to MS, syncing my FC/ESC loop, and calibrating. Then I've been going back to DShot and setting things up normally. Don't ask me why or how it works, but I've had to do this on more than one occasion now or I get a distant ESC song or two playing out of sequence in the background like you have now. This worked each time, but not saying it will work for you with certainty.

### Does DShot work on other models besides the Quad-X, like hex and tri-copters?

They should surely work if the FC was designed for them.
You will need to re-map a motor to a Servo for a Tri-copter. See the SERVO_TILT wiki page for help.
There is also info for Tri-copter setup on the MOTOLAB page.

### It all start with the DShot thread (link above):

The information posted herein is all provided on an AS-IS basis.
It has been derived from posts on this forum (RCGroups/Boris' Betaflight, FC, DSHOT and ESC threads), and direct correspondences with users.

USE THE FOLLOWING INFORMATION AT YOUR OWN RISK

BETAFLIGHT AND DSHOT -

Betaflight may not be able to support all Targets ( or specific boards) due to the design of each one differing on the DMA pinout. Look below to find what may or may not be working.

### Flight Controllers Tested to Support DShot on Betaflight 3.1 without Mods or remapping:

- AIORACERF3
- Airbot F3 (SPRACINGF3)
- ALIENFLIGHTF3
- ALIENFLIGHTNGF7
- BETAFLIGHTF3
- BLUEJAYF4
- BrainFPV RE1 (needs build from BrainFPV repo)
- Colibri Race v2.0
- Dodo (RMDO)
- Dodo (SPRACINGF3)
- DTFc - Build #389 - working on the bench
- DTFC (DOGE)
- FLIP32F4
- FURY F3
- FURY F4
- HGLRC AIO F3 v3 (SPRACINGF3)
- IMPULSERCF3
- KISSFC
  Note from sskaug: KISS FCs use a resistor to drive the throttle signal high (pull-up). So it is quite sensitive to capacitance on the ESC signal.
- LUX_RACE
- LUXV2_RACE
- MRM Mantis F3 (SPRACINGF3) - DShot300
- OMNIBUS (What about Omnibus F4? Are F3 & F4 the same thing with different processor?)
- OMNIBUSPRO (Blheli Configurator Hangs on read in 3.1, failed flash in 3.01)
- RACEBASE FC
- REVO (and clones)
- Rotorgeeks RG SSD
- SIRINFPV
- SOULF4 - (SOULF4) - works with REVO.hex
- SPRacingF3 (Acro/Deluxe)
- SPRacingF3NEO - Full hardware support on all the standard motor outputs - tested by the designer of the board.
- YuPi F4
- X-Racer V2.1 (SPRACINGF3)
- X-Racer F303 (X_RACERSPI) -

### FC Targets that work with DShot but require hardware mods and re-mapping pins with the Resource command:

Boris' comment:
I had many requests for MOTOLAB (and other FCs) but that one doesn't have DMA available on all motors. It may be that we will assign one of the motors to PPM pin so you can resolder it. Not great, but better than nothing I guess?

##### General instructions for re-mapping pins:

1- All FCs that require using the FC's PPM input pin as a motor output therefore can NOT use a PPM RX. Any of the Serial RXs that use a UART do work. Set-up Serial RX normally as needed for the FC board.
2- Check pins for the FC board below on which STM32 pins need to be re-mapped. It is a Good Idea to first type in the CLI:

```
resource
resource list
```

and copy/paste these into a Text file and save for reference of the Default pin Mappings.
3- In the config tab select OneShot(42 or 125). Click Save. Leave this select until pins are re-mapped.
4- In the CLI type (x = motor #, yyy = STM32 pin #):

```
resource ppm none
resource motor x yyy
save
```

5- Now select the DSHOT protocol of your choice.

See: [CLI resource command](/docs/wiki/guides/current/Resource-remapping)

##### ALIENFLIGHTF4

Move the motor 2 wire to the PPM pad at the bottom of the board. You can also directly connect the motor 2 signal pad with the PPM pad. There are updated board designs available with an added DSHOT solder jumper at the bottom which is making this connection. In this case, you can leave the motor 2 soldered output #2. Note: a PPM receiver can not be used in this configuration.
If your controller has an SDCard slot (V2.0) you also need to use the following command in addition to get motor 4 working with DSHOT: `set sdcard_dma=off `.
Enter the following commands into the CLI window to re-map output:

```
resource ppm none
resource motor 2 A08
save
```

See: [AlienFlightNG Support](https://www.alienflightng.com/wiki/)

##### MOTOLAB - (MotoF3, Cyclone & Tempest)

Move motor 1 from Output #1 header pin to the PPM input header pin.
[See MOTOLAB board for wiring detail ](/docs/wiki/boards/legacy/MOTOLAB)
Follow above and to re-map output type in CLI:

```
resource ppm none
resource motor 1 A07
save
```

See the [MOTOLAB](/docs/wiki/boards/legacy/MOTOLAB) Wiki page for other Remapping info.

##### PIKOBLX - Re-map motor 1 to the PPM pin (same as MotoLab). Solder motor 1 signal to the PPM pad leaving the SBUS jumper 'shorted'.

To allow the use of the LED pin Re-map motor 4 to motor 5 signal out a01, which must also be soldered as such.

Note: RX must use SBUS since PPM pin is now reassigned to motor 1.

Link to modification details: https://www.rcgroups.com/forums/showpost.php?p=36608148&postcount=43149
Follow above and to re-map output type in CLI:

```
resource ppm none
resource motor 1 A07
save
```

Starting with BetaFlight 3.3 no hardware mode or remap is needed anymore.

##### SPRACINGF3EVO - Must move MOTOR 4 to new pin assignment (CLI = resource MOTOR 4 A06). Then solder ESC for motor #4 to motor output #5, fixes DMA conflict with motor outputs 2 and 4.

Follow above and to re-map output type in CLI:

```
resource ppm none
resource motor 1 A06
save
```

There also seems to be a DMA conflict with BB logging. [see Github issue #2162](https://github.com/betaflight/betaflight/issues/2162) the fix seems to be disable BB logging DMA in the CLI:
`set sdcard_dma = OFF  `
Note: SD card DMA is set to OFF on 3.1.6+ by default

Since Betaflight 3.3.x with enabled DMA burst on F3 chips we have one more DMA conflict with the ledstrip if dshot are enabled.
Move ledstrip to motor #8 output then enter following in the CLI to re-map ledstrip output:

```
resource ppm none
resource motor 1 B01
save
```

##### SPRACINGF3MINI - Move motor #4 to the PPM pin. Then use resource command to disable PPM and map motor 4 output to B04.

Follow above and to re-map output type in CLI:

```
resource ppm none
resource motor 1 B04
save
```

Limitation: BlackBox on the internal SDCard works with MultiShot but not with DShot.

##### KOMBINI V1 - Move motor #1 from Output #1 header pin to the PPM input header pin.

Follow above and to re-map output type in CLI:

```
resource ppm none
resource motor 1 A07
save
```

Limitation: no LED functionality with DShot is allowed.
Video on getting this FC working: https://www.rcgroups.com/forums/showpost.php?p=36269451&postcount=1966

Starting with BetaFlight 3.3 no hardware mode or remap is needed anymore. LED stripe will also work.

##### AIORACERF3

Move MOTOR 2 to new pin assignment since it has a DMA conflict with MOTOR 1:

Connect ESC for motor 2 to 'LED' pin on the board.
Then re-map motor 2 output: type in CLI:

```
resource motor 1 A08
save
```

The new mapping for motor 2 conflicts wit `LED_STRIP` and `TRANSPONDER`, so make sure these two features are disabled in the configurator.

##### EMAX FEMTO F3

Motor 4 needs to be moved to the LED pad on the underside of the fc.

`LED_STRIP` needs disabled and then motor 4 gets remapped to that pad.

```
resource LED_STRIP none
resource motor 4 A08
save
```

Daryoon got DShot outputs & the LED Strip to both work:

Connect motor 4 to PPM pad and enter following in the CLI.
`resource ppm none  `
`resource motor 4 A15 `
`save  `

See Github Issue #2282 [Emax Femto (SPRACING F3EVO) - DSHOT 600 Motor 4 not spinning BF 3.1](https://github.com/betaflight/betaflight/issues/2282) for more details.

##### BeeRotor F4 - (for use with a Hexacopter) Motor 6 needs to be moved to the LED pin on the 'SC' connector.

`LED_STRIP` needs to be disabled, and then motor 6 gets remapped to this pin:
`feature -LED_STRIP`
`resource motor 6 B08`
`save`

##### AIR32 - [instructions](/docs/wiki/boards/legacy/AIR32#faq-and-known-issues)

#### FC Target reported NOT working

- SPARKY2 - Oz reports: I tried DS600 and only motors 2 & 4 will spin, 1 & 3 will not spin, I am guessing motor output 1 & 3 don't have dma's or ?

#### FC Targets with DSHOT code added but in need of testing:

- All other targets not listed above.

### ESCs supporting DShot:

#### BLHeli_32

Announced on 3 April 2017:
https://www.rcgroups.com/forums/showthread.php?2864611-BLHeli_32-Power-to-perform#post37240208

#### KISS 24

https://www.rcgroups.com/forums/showthread.php?2555162-KISS-ESC-24A-Race-Edition-Flyduino-32bit-ESC

- 150, 300, 600, 900, 1200 See the DShot thread (link above) for ESC code.
  KISS24 ESC Beep Codes:
- 1beep/second = too many dshot errors (more then 10% are bad) but it doesn't disarm it just tells
- 2beep/second = no valid signal for at last 1/3 second, it disarmed and stopped the motor (ESC failsave)
- 3beep/second = it couldn't start the motor or the motor stopped because it was blocked

- NOTE: There Seems to be an Issue with the KISS24 Firmware when running faster Loop Rates.
  Rossbow reports: We have been doing some testing of the Kiss 24a esc's on BF and it appears the they will not run safely at 4 or 8 khz with DShot.
  If you want to test it take the props off and arm the quad in air mode and just let it run at idle on the bench.
  At 8khz we are seeing between 1 and 6 mins before the esc's start shutting down, it seems they may be getting too many crc errors at 8khz.
  At 1 and 2 khz we can get 15mins or more, So be warned as you most likely will get dead ducks at 8khz.
  I have tested 1.08a, 1.08f and 110b RC7 all with the same issue. Oneshot 42 and 125 are fine.
  BTW its not Betaflight related, it seems the reason the Kiss FC works with the 24a esc's is because it only runs on 1khz with Kiss fw and up to 4 khz on Betaflight. The higher you go in khz the shorter the time before the esc's start to shutdown.
  So the Kiss FC on BF fw may not show the issue because in the cold weather the flight times are short and at 4khz you may get a full 2 to 2.5min flight with no issue.
  My advice for using these 24a esc's on BF is either run oneshot42 or run no more than 2khz on DShot. This is not a guarantee but the best solution until a permanent fix can be found. The Kiss hardware is more than capable of running 8 + khz so I would say its just an esc fw issue.
  juuuut: No haste I'm on it. I talked with Boris and i have a 8k setup here where I can reproduce it. seems to be some watchdog misbehavior in some throttle situations. but I think i will have a new version soon that fixes it!
  regards, Felix
  Alpha fix: https://www.rcgroups.com/forums/showpost.php?p=37048819&postcount=3510

#### BLheli-S:

DSHOT on BLHELI_S ESCs is supported starting with v16.43 and Offically supported in v16.5 and Up.
Older ESCs with BB1 processor will likely only support DShot150 & 300.
Here is why: https://www.rcgroups.com/forums/showpost.php?p=36025232&postcount=376
Now found that all BLHeli_S ESCs will run on DSHOT150, 300 & 600 if using a BB2 processor and any input signal filtering is Removed. See list below for details on removing filter cap.
[DSHOT O'scope captures](https://www.rcgroups.com/forums/showpost.php?p=36490579&postcount=2631) before and after the typical RC filter.

BLHeli_S Rev16.6 posted on github (10Jan2017).
[Get Firmware from Github here](https://github.com/bitdump/BLHeli). Check for the latest ESC firmware in BLHeli Github and BLHlei Suite and Documents.

See [BLHeli_S Knowledge Base](https://github.com/blheli-configurator/blheli-configurator/wiki/BLHeli_S-Firmware-Knowledge-Base) for Which HEX to use.

Note: Many of these ESC have an RC filter on the control input signal line. The cap of this RC filter must be removed to use DShot as per the list below. It is recommended to remove the cap from any ESC even if DShot seems to work. All other protocols will still work without this filter cap.
Many ESCs are now being built and shipped without the signal filter Cap but it is best to check yourself to ensure the cap is not installed.

Post on testing DShot before and after adding Large, low ESR caps to power system:
https://www.rcgroups.com/forums/showpost.php?p=36713066&postcount=3133
https://www.rcgroups.com/forums/showpost.php?p=36718584&postcount=3144
https://www.rcgroups.com/forums/showpost.php?p=36720323&postcount=3157

#### An Over View from Cheredanine:

Folks there are various people posting stuff that clearly don't understand or haven't read the wiki. So to straighten stuff out:
Min and max throttle
D shot does not use it. "I changed min throttle" - well that's nice but pointless

##### Calibration

You don't need to do it, it doesn't make any difference to dshot, claibration is about calibrating PWM pulse length, dshot is a serial protocol, not PWM, don't waste your time

And the most important -

##### Caps on or off and the wiki

Caps on the signal line smooth the signal, removing jitter. DShot is a rapid change of signal, it looks like jitter, the faster the signal, the more chance the caps will smooth it out, obliterating the signal. Because dshot is 16bits, some signal,values look more like jitter than others. The signal is also effected by other factors than just the caps

So removing caps makes dshot more likely to work BUT the records in the wiki are not black and white, they are a record of what people have claimed to work, your quad with the same escs may not react the same. (I have 2 quads with exactly the same escs, one works fine up to dshot300 with caps on, the other needs caps off for dshot at all)

##### What if the ESC I have is not listed or the Picture does not match?

You are then the Experimental Tester for this ESC. Here is a link to Generic instructions on how to find signal input and cap on any BLHeli ESC:
https://www.rcgroups.com/forums/showpost.php?p=36216745&postcount=1645
Another Post on finding the signal filter cap:
https://www.rcgroups.com/forums/showpost.php?p=36897835&postcount=3488

##### with caps off Motors are smooth from the motor tab but I get jitter on sticks

So dshot is fine, when you use your sticks the radio, the receiver, the wiring to the receiver, the gyro, the physical components of the quad and the PID loops are all combining, something somewhere is causing the flight controller to command the shakes you are seeing, fix the problem and stop worrying about dshot

##### Will dshot work with these escs ......

DShot will work on blheli_s escs (and of course kiss but there is now a separate thread for kiss) if the escs are flashed with a version of blheli_s that supports it and the caps don't interfere with the signal. Bb1 processors will not do faster speeds, but bb2 will do up to dshot600. Just because the esc doesn't overtly say it on the literature - dshot came out after many blheli_s escs - or because it is 4 in 1 or 2 in 1 or 0.5 in 1 , well perhaps not the last, but if it is blheli_s bb2 make sure the caps are removed from the signal line and it will run dshot

So if you want to run dshot - TAKE THE CAPS OFF (manufacturers are starting to ship with out the caps on)
If you don't and you have problems, then guess what?

#### Tested BLheli ESC:s

**Note: there are ESCs that are exactly the Same sold by different names.
It is good to check the pictures in the Cap removal links and compare to the ESC you have in your hand.**

- Aikon 20A/Spedix 20A
  Cap removal for both: https://www.rcgroups.com/forums/showpost.php?p=36182572&postcount=1319
- Aikon SEFM v2 30A - (C-H-25)
  Cap removal: https://www.rcgroups.com/forums/showpost.php?p=36214609&postcount=1614
- Aikon SEFM v1 30A - (C-H-15)
  Cap removal: https://www.rcgroups.com/forums/showpost.php?p=36213821&postcount=1611
  Cap removal: https://www.rcgroups.com/forums/showpost.php?p=36214609&postcount=1614
- AIKON SEFM 20A - with cap removed
  Cap removal: https://www.rcgroups.com/forums/showpost.php?p=36214609&postcount=1614
- Armattan 20A and 30A - 2v1 need cap removal, v2 (now shipping from Armattan) work without modification
  Cap removal: https://www.rcgroups.com/forums/showpost.php?p=36416316&postcount=2432
- BeeRotor BLS20A - with cap removed
  Cap removal: https://www.rcgroups.com/forums/showpost.php?p=36217144&postcount=1654
- BumpBee_S - with cap removed
  Cap removal: https://nathan.vertile.com/blog/2016/11/14/flash-blheli_s-with-dshot/#flashing
- Cicada BB2 10A -
- Cicada v1 20A -
- Cicada v2 20A -
- Cicada v1 30A -
- Cicada v2 30A - with cap removed
  Cap removal: https://www.electricwingman.com/guides/building-fpv-racing-quadcopter.aspx
- Cicada 4n1 20a V2 - with caps removed
  Cap removal: https://www.rcgroups.com/forums/showpost.php?p=36286446&postcount=2036
- Cicada 35Ax4 35A - with caps removed
  Cap removal: https://www.rcgroups.com/forums/showpost.php?p=36384215&postcount=2337
- Cobra CP30A ESC 30A BLheli_S -
- DALRC BS25A 16.5 - with cap removed
  Cap removal: https://www.rcgroups.com/forums/showthread.php?t=2777858#post36223562
  https://www.rcgroups.com/forums/showthread.php?t=2777858
- DYS XS20 v1.x
  Cap removal: https://www.rcgroups.com/forums/showpost.php?p=36297135&postcount=2068
- DYS XS20A v2 or XSC20A
  Cap removal: https://www.rcgroups.com/forums/showpost.php?p=36253268&postcount=1878
- DYS XS30A - with cap removed
  Cap removal: https://www.rcgroups.com/forums/showpost.php?p=36133930&postcount=836
  https://www.rcgroups.com/forums/showpost.php?p=36245544&postcount=1848
- DYS XSD20A | XSD30A - New product announcement:
  https://www.rcgroups.com/forums/showthread.php?t=2784634#post36278564
- Emax Lightning S 35A -
- Flycolor Raptor BLS-02 -
  Cap removal: https://www.rcgroups.com/forums/showpost.php?p=37070719&postcount=10
- FVT Littlebee 20A-S
- FVT LittleBee-Spring 20Ax4 - Claims DShot but Unknown
  Thread: https://www.rcgroups.com/forums/showthread.php?2800280-Favourite-FVT-LittleBee-Spring-20Ax4-4-in-1-Blheli_S-ESC-w-built-in-5V-12V-BEC
- LB30a 4 in 1 spring edition - works with dshot600 out of the box.
- LittleBee_S 20A (A-H-15)-
  Cap removal: https://www.rcgroups.com/forums/showpost.php?p=36181966&postcount=40934
- Littlebee_S 30A
  Cap removal: https://www.rcgroups.com/forums/showpost.php?p=36230015&postcount=1745
- Lumenier 30A
- Maverick 24A - New product announcement:
  https://www.rcgroups.com/forums/showthread.php?2795245-Fully-compatible-with-DShot-New-upgraded-32-bit-Maverick-24A-ESC#post36408093
- MRM ZEUS-S 20A - with CAP removed (see FVT littlebee-s 20a cap removal)
- Multistar BLHeli_S 20A - shipped without the signal filter cap
- Multistar BLHeli_S 30A -
- Racerstar v2 6a -
  Cap removal: https://www.rcgroups.com/forums/showpost.php?p=36268041&postcount=1961
- Racerstar v1 20A -
- Racerstar v1 30A -
- Racerstar v2 30a -
  Cap removal: https://www.rcgroups.com/forums/showpost.php?p=36209787&postcount=1569
- Racerstar v2 12A -
- Racerstar v2 20A -
- Racerstar 25a -
- Racerstar v2 35A -
  Cap removal: https://www.rcgroups.com/forums/showpost.php?p=36654973&postcount=3006
- Racerstar MS15A -
  Cap removal: https://www.rcgroups.com/forums/showpost.php?p=36426101&postcount=336
- Racerstar MS25A - (A_H_20) - need signal cap removed, same cap as Racerstar MS35A
- Racerstar MS35A -
  Cap removal with before and after O'scope traces: https://www.rcgroups.com/forums/showpost.php?p=36588994&postcount=2834
- Racerstar 4in1 20A V1 - need the signal cap(s) removed.
  Cap removal: https://www.rcgroups.com/forums/showpost.php?p=36550495&postcount=178
- Racerstar RS20Ax4 V2 Blheli_S 20A 2-4S 4 in 1 ESC -
  Link: https://www.rcgroups.com/forums/showthread.php?t=2782732#post36254434
  Cap removal:https://www.rcgroups.com/forums/showpost.php?p=36654973&postcount=3006
- Racerstar RS20A v2 - with cap removed
  Cap removal: https://www.rcgroups.com/forums/showpost.php?p=36503849&postcount=2672
- Racerstar RS30A LiteS - with cap removed.
  Cap removal: https://www.rcgroups.com/forums/showthread.php?2690769-Racerstar-Blheli_S-ESCs-%28v2-just-released%29-10-for-20a-12-for-30a-30-4in1-20a/page38
- Racerstar RS30Ax4 v2 (4in1) -
  More info: https://www.rcgroups.com/forums/showthread.php?2790572-DShot-bench-test-super-smooth-motor-spining-at-1011-REVO-and-Racerstar-BLHeli_S
- Schubkraft 35A 4in1 (SCHUBKRAFT X4 BB21, 45A Burst) V2 - works out of the box
- Spedix ES 20 lite - with cap removed
  Cap removal: https://www.rcgroups.com/forums/showpost.php?p=36203466&postcount=1509
- Spedix 25a - with signal cap removed
  Cap removal: https://www.rcgroups.com/forums/showpost.php?p=36324412&postcount=2157
- Spedix ES30 HV 16.43 - with signal cap removed
  Cap removal: https://www.rcgroups.com/forums/showpost.php?p=36205800&postcount=1527
- TBS 25 - with cap removed
  Cap removal: https://www.rcgroups.com/forums/showpost.php?p=36209076&postcount=1548
- Xrotor mini 30A BL_S - need signal cap removed
- XRotor Micro BLHeli-S 30A - need signal cap removed
- ZTW polaris 30A (A_H_20 16.42) -

#### Cap Removal Methods:

**Caution - if improper done can render the ESC unusable and have the possibility to burning the ESC upon applying power.**

- Method 1. Clippers - used this when there is enough room, just clipped the cap in half the clipped each end off the board
- Method 2. Craft knife - used when other components are too close to use clippers, for example tbs escs - slide the blade so that it is sliding along the surface of the board and in a direction away from other components and apply force, cutting the cap off the esc
- Method 3. Soldering iron - Heat both ends of the cap with a tinned iron. Then wipe the cap off the pads with the iron's tip. Be Careful NOT to unsolder any other parts and examine the board with a good magnifier for any solder splashes.
- BeeRotor BS20A video- http://scontent.cdninstagram.com/t50.2886-16/15378420_376830535984172_2316137375807307776_n.mp4

#### Components tried and are not currently working:

None To Report

#### Components that will NOT likely ever work:

- Naze32 and clones
- All FCs with STM32F1 processor
- All ESCs that can not run BLHeli_S firmware (except KISS24A)

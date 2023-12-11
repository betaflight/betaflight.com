![BetaFlight](https://betaflight.com/assets/img/betaflight/bf_logo.png)

# Welcome to the BetaFlight Wiki!

**New to Betaflight and just want to get started? See the [installation](Installing-Betaflight) section.**

## News

### Betaflight 4.0

As you might have learned from the [Betaflight GitHub page](https://github.com/betaflight/betaflight), our next release will be 4.0. Betaflight 4.0 will be the culmination of years of work that started in 2016 with the introduction of remappable resources, and it will drastically change the way how Betaflight is built and distributed. To you as the user, not much in how you download and install the Betaflight firmware will change, but you will get some noticeable improvements:

- we’ll have to spend less time on maintaining and releasing the firmware, meaning that we’ll have more time to work on new and exciting features;
- manufacturers will have an easy way to release custom configurations for all of their boards and ready-to-fly (including RX setup and tuning) craft based on original Betaflight firmware - you will no longer be stuck on using old firmware, or recreating your configuration from scratch;
- the tinkerers amongst you will be able to share Betaflight firmware with your home built improvements amongst your friends without having to build and distribute separate targets for everybody’s board.

_(These changes are planned for F4 and F7, F3’s flash space limitations mean we won’t be able to fit all of this in.)_

We are almost there with the implementation of these changes, but since they are quite complex, and getting ‘almost there’ doesn’t buy us much, we have decided that we need to take more time to complete them, make sure the way users can use the firmware still works as expected, and properly test the new firmware. For this reason we have decided to **postpone the planned release date for Betaflight to 01 April 2019**. We will keep doing monthly releases of Betaflight 3.5 with bugfixes and new / updated targets in the meantime.

To get the latest update from us, you can now also visit our webpage at https://betaflight.com/

In addition to the drastic changes mentioned above, Betaflight 4.0 will have a number of other exciting new features and improvements:

- yet again improved flight performance;
- 'Launch control' mode;
- switchable profiles for the OSD layout.

## Events

| Date          | Event                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------ |
| 01 March 2019 | Start of feature freeze / Release Candidate window for Betaflight 4.0                            |
| 01 April 2019 | Planned [release](https://github.com/betaflight/betaflight/milestone/20) date for Betaflight 4.0 |

## Merchandise:

**For a limited time only:** Buy a [Betaflight Shirt or Hoodie](Betaflight-merchandise)!

## Wiki Tips:

- Searching the Wiki-
  Type in URL bar of the Web Browser:
  "site:github.com/betaflight/betaflight/wiki PT1" (wiki search for term 'PT1')
  or
  "site:github.com/betaflight/betaflight PT1" (broader search for term 'PT1')

- Note that Default settings as well as CLI commands may change from one Version to the next. We try to list these under the Version Release Notes but not always get them all. a method to use to keep track of changes and to check these yourself is:
  After Flashing but before configuring do the CLI Dump then Copy/paste this into a Text file named with V#. Then on next update do this again to a new text file.
  This allows you to check for differences by either manually compared the two text files or by using an Difference option in a text editor. NotePad++ is one such editor with a good difference feature.

- If not in this Wiki then it is probably not a feature new to BetaFlight and you need to look in the CleanFlight Docs.

- All BASICs and alternate methods to config and flash are in the NAZE32 Manual here: http://www.abusemark.com/downloads/naze32_rev2.pdf

- New [Docs](https://github.com/martinbudden/betaflight/tree/master/docs) for BetaFlight 2.x. Note: These are NOT fully covering all Versions of BetaFlight, particularly the CLI commands. Always also read the Wiki Release Note pages for changes and then a "get" CLI command to check spelling and valid options.

## Introduction

Betaflight is software that is open source and is available free of charge without warranty to all users.

Betaflight is a Cleanflight fork started by BorisB. It used to work as a beta test platform for Cleanflight and kept pushing the envelope in terms of performance, but it eventually evolved into a fully grown up, stable and well maintained firmware by various developers. In fact it looks like it is the number 1 open source multi-rotor firmware according to Google Trends analysis around January 2017.

The name "Beta" comes from the fact it started with a goal to keep trying new things out and have quick and easy test distributions available. The name "Beta" has stuck as the brand name was strong at the moment where it transitioned from beta to stable and there was already a lot of documentation around.

"This project also helps by contributing to other open source projects like iNav." - says Boris B ([lead developer](http://www.youtube.com/user/bozic1982/featured))

3Min video of Betaflight Evolution from Baseflight->Cleanflight->Betaflight
[![Betaflight Evolution](http://img.youtube.com/vi/gJ4z48BRsh8/0.jpg)](https://www.youtube.com/watch?v=gJ4z48BRsh8)

## Tools

Betaflight is also always being adjusted to support most current Cleanflight tools like Configurator and EzGui devices and many other MSP tools. There is no special tool needed just for Betaflight.

## Firmware Releases

Releases can be found here: https://github.com/betaflight/betaflight/releases or downloaded from configurator.
Also check the Upgrading List to the Right for Release Notes and other Details on the various Versions.

_BETA TESTING (WARNING)_

_If you want to contribute to better development you can download the latest beta build directly from:_ *https://ci.betaflight.tech/job/Betaflight/lastBuild/artifact/obj/*

You can find release planning here:
https://github.com/betaflight/betaflight/milestones

## Configuration Tool

To configure Betaflight you should use the latest stable Betaflight-configurator GUI tool (Windows/OSX/Linux) that can be found in google chrome store:
https://chrome.google.com/webstore/detail/betaflight-configurator/kdaghagfopacdngbohiknlhcocjccjao

_BETA TESTING_

_If you want to contribute to better development you can download the latest or any of the older BetaFlight configurator from:_
*https://github.com/betaflight/betaflight-configurator*
_The following method also allows more than one Version of the configurator to be installed._

_Instructions (the README.MD file in the download is NOT correct):_
_Note: these instruction work for Chrome version 59.0. Other versions and Chromium may have different Menus so Use the Help to learn how to install Extensions)_

_1. Clone the repo to any local directory or download source as zip, click the GREEN "Clone or download" button, Select "Download ZIP_
_2. Unzip on your PC, remember the location_
_3. Start Chromium or Google Chrome_
_4. Click the 3-dots on the far right of the URL bar_
_5. Select "More Tools" then "extensions_
_6. Check the "Developer mode" checkbox_
_7. Click on load unpacked extension and point it to the Betaflight Configurator directory (for example D:/betaflight-configurator)_
_Then you'll see the new configurator in your Chrome extensions._

## Mobile Flight for iPhone and iPad

[thread: ](https://www.rcgroups.com/forums/showthread.php?2601895-Mobile-Flight-Configuration-and-ground-control-app-for-Cleanflight-on-iPhone)
v2.0 is in Beta Testing- See post: https://www.rcgroups.com/forums/showpost.php?p=37815161&postcount=49332

## BlackBox Viewer

Viewer Releases are here:
https://github.com/betaflight/blackbox-log-viewer/releases

The Latest Viewer source is here:
https://github.com/betaflight/blackbox-log-viewer
See [BB Logging and Usage](Black-Box-logging-and-usage) Wiki page on using the BB logger.

## BetaFlight Logos

Links to logos (Note: The bee/wasp in the logo is different from the one that was finally adopted):
https://www.rcgroups.com/forums/showpost.php?p=34909081&postcount=29679

Here the original ones designed by skaman82:
https://www.dropbox.com/s/viczizbjz0fwod4/Betaflight.Logos.zip?dl=0

Or The logo bf uses is at the top of this wiki page, just mouse right and save image as, cut the writing if you don't want it

## Other Firmware that runs on same hardware as BF and has related source code:

Official CleanFlight documentation: http://github.com/cleanflight/cleanflight/wiki

Check out the INAV project. It's focused on GPS/Alt Hold/Autonomous flight.
http://inavflight.com

## Providing feedback and contributing to this project

Visit this RC Groups Forum to join the discussion: http://www.rcgroups.com/forums/showthread.php?t=2464844

Financial support to the Betaflight Team by PayPal donation:

[![Donate](https://www.paypalobjects.com/en_US/NL/i/btn/btn_donateCC_LG.gif)](https://paypal.me/betaflight)

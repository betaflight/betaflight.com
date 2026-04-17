# Transponder

Betaflight supports the generation of race transponder signals on compatible targets.

IR LED connections is target specific. Please consult the reference manual for your FC.

Betaflight supports multiple transponder protocol providers.

## iLap Provider

### Links:

Website: http://www.rclapcounter.com/
Contact: cs@rclapcounter.com

### Description:

iLap is a commercial system that uses 6 byte transponder codes and a 460kHz carrier.

Transponder codes are entered in the Betaflight App > Transponder tab as 12 hex digits.

Codes are theoretically unique. Codes are obtained for iLap or come with some flight controllers.

![Provider iLap](Screenshots/Provider%20iLap.png)

## ArcTimer Provider

### Links:

[Web](http://www.arcitimer.com)
contact: info@arcitimer.com

### Description:

Arctimer is a commercial system that uses 9 byte transponder codes and a 42kHz carrier.

There are only 9 unique Arctimer codes. Codes are picked from a list on Betaflight App > Transponder tab.

![Provider ArcTimer](Screenshots/Provider%20ArcTimer.png)

## EasyRaceLapTimer (ERLT) Provider

### Links:

[Web](http://www.easyracelaptimer.com/)
[Facebook](https://www.facebook.com/groups/1015588161838713/)
[RCGroups](https://www.rcgroups.com/forums/showthread.php?2538917-EasyRaceLapTimer-open-source-and-open-hardware-FPV-racing-lap-time-tracking-system)
[GitHub](https://github.com/polyvision/EasyRaceLapTimer)

### Description

EasyRaceLapTimer is a open source system that uses 6bit transponder codes and a 38kHz carrier.

There are 64 unique ERLT codes. Codes are picked from a list on the Betaflight App > Transponder tab.

![Provider ELRT](Screenshots/Provider%20ERLT.png)

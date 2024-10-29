# Failsafe notes (Old)

:::warning
**This document is deprecated, and is not being updated**

It is kept for historical reasons only.

Do not rely on any information presented here.
:::

**Test failsafe without propellers.**
Arm the Quadcopter and shut the radio off.
Full range receiver and Satellite behave differently from brand to brand, read the operator's manual.

What is a failsafe?

Failsafe is a safety feature, it can be triggered by a switch, the loss of radio link or an unexpected RCcommand pulse. The flight controller will behave as set in the failsafe tab of the configurator. (Betaflight's default = Drop). Once configured, specific Failsafe behavior can be changed before flight. See the Betaflight GPS Rescue Mode page.

---

Why should I set my Failsafe?

Failsafe places the flight controller in a "safer" state. Typically, a small quadcopter can fall without severe damage but with bigger quads, it might be better to land. The basic rule: it is better to drop from the sky unarmed than have a flyaway, randomly chasing people.

You might want to set the RCcommand on failsafe for each channel. I usually set throttle to hold leaving pitch, roll and yaw to "auto". Auxiliary 1 switch to "unarmed", for me it is "set 1000" and AUX 2 "set 2000" ( I have a mini-Quad with a beeper which makes it easier to locate).

-Enable Expert Mode
![Failsafe Tab](https://user-images.githubusercontent.com/25552059/44224354-2a14cb80-a158-11e8-884a-c9abeca80c3f.PNG)

![Mode Tab](https://user-images.githubusercontent.com/25552059/44224487-8a0b7200-a158-11e8-9a97-ae17a388c297.PNG)

I leave throttle to "hold" for 0.4 second in the configurator tab, I can live with that. After 0.4s, the FC will put the RCcommand to the rx failsafe set value. **This is why it is so important on binding process to have the correct stick position**. You might feel anxious about it and uses auto, in this case the RCcommand set will be the one stored on binding of the receiver with no delay.

---

What can cause failsafes?

- RX Signal out of range
- Broken, damaged or not the right length antenna on RX and or TX
- shadowing, multipathing, antenna conductor touching carbon fiber or signal blocked by carbon fiber
- Too close of the VTX
- With satelite, 3.3v regulator problem on FC
- Broken or loose wire
- Cold solder joint

---

Stage 1 and Stage 2

---

Basic Setups and Knowledge + Different Failsafe behavior

---

Quick and dirty troubleshoot:

---

Notes:
http://www.warms.com.au/news/2016/1/20/radio-failsafe

https://oscarliang.com/setup-failsafe/

http://ardupilot.org/copter/docs/radio-failsafe.html

Arming-Sequence-&-Safety

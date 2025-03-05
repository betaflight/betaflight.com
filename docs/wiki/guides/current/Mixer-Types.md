# Mixer Types

All graphs below are representing AIRMODE enabled scenarios. When AIRMODE is disabled, regular mixer clipping on low throttle range will happen.

Added in this PR: https://github.com/betaflight/betaflight/pull/10370

### **Mixer type: LEGACY (Current mixer)**

**set mixer_type = LEGACY** \<--- enabled by default

![image](https://user-images.githubusercontent.com/10757508/100614257-294ad800-3316-11eb-9ccf-d260d03e541e.png)

### **Mixer type: LINEAR**

**set mixer_type = LINEAR** \<--- to enable

![image](https://user-images.githubusercontent.com/10757508/100615013-49c76200-3317-11eb-877d-f0f181dcb204.png)

### **Mixer type DYNAMIC:**

**set mixer_type = DYNAMIC** \<--- to enable

![image](https://user-images.githubusercontent.com/10757508/100614211-120bea80-3316-11eb-8510-8d58d0c69c38.png)

_Note: The above graph is the ideal scenario of dynamic mixer, but the actual result depends of PIDsum contribution from other axes. If only 1 axis asks for full authority the result will be exactly same like with LINEAR mixer. The optimal results are achieved, when multiple axes are requesting authority._

**Short summary of differences between mixers:**

**LEGACY** tries to keep requested throttle position as long as possible, till the point where it cannot maintain current throttle position it will drastically start to change throttle to still get desired authority. That is also the reason of sharper transition.

**LINEAR** will start changing throttle earlier in order to prevent these steep transitions at the end. In other words it smooths out the thrust increase/decrease for desired correction.

**DYNAMIC** This is another experimental mixer variation of mixer from tylercorleone. It behaves very similar to linear mixer, but much smarter. When all of the PIDsum comes from single axis it will behave exactly same as linear mixer, but when PIDsum to mixer is combined from other axes the mixer will adapt itself to stay closer to requested throttle level.

### **Mixer type EZLANDING:**

**set mixer_type = EZLANDING** \<--- to enable

Please reference Betaflight 4.5 Release Notes for [EzLanding settings](https://betaflight.com/docs/wiki/release/betaflight-4-5-release-notes#12-ezlanding).

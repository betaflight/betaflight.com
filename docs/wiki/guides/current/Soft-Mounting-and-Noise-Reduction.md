# Soft Mounting and Noise Reduction

FAQ #56 has been where all the info has been put. We will be editing FAQ #56 to put information on this page.
Please check often as this page gets built.

See [FAQ #56 ](/docs/wiki/guides/current/FAQ) for Discussion on Yaw Twitches and Mid-throttle Oscillations. This covers Gyros and other possible causes.

Also be sure to read:
[Gyro & Filters](/docs/wiki/guides/archive/Gyro-And-Dterm-Filtering-Recommendations-3-1)
[BB logging & Filters](/docs/wiki/guides/current/Black-Box-logging-and-usage)

### Damping Theory by ctzsnooze:

Regarding so-called 'maximum damped frequency'...

Ideal hardware damping results in a physical effect comparable to that of an electronic low pass filter. We want is full transmission without delay of frequencies below a cut point, and attenuation above that; the higher we go in frequency above the cut point, the less gets transmitted through the damping material.

Real world hardware damping usually has the unfortunate result of also generating a resonant peak at the frequency where the damping ought to start. At frequencies above that resonant peak, there is a progressive cut.

In principle, therefore, there is no 'maximal damping frequency'. There is just a cutoff point above which damping / attenuation gets progressively greater.

The classical physical 'damper' is the shock absorber on a car.

Electronic low pass filters (eg PT1 or biquad) do not resonate around cutoff. But most real world hardware damping methods do.

The typical damping method we use involves some soft, vibration absorbent material that has a bit of 'give', isolating one part of the system from another.

The ideal damping material is a viscoelastic substance that absorbs high frequencies and does not act like a spring.

Real world damping materials _all_ act like springs. The springier they are, the more resonance you will get.

Adding mass to an object on a spring will _lower_ the cut / resonant peak frequency but will also _increase_ the magnitude of the resonance.

For a flight controller, we want to reduce transmission of high frequency noise, but not cause resonance around the peak. The isolating materials should be viscoelastic, not springy. 'Hard' rubber foam and silicone are not viscoelastic. They will minimize transmission of noise but will result in a resonant peak.

Adding mass to the FC will lower the cut point and attenuate noise. Very light FC's on relatively hard foam will not be damped much and may resonate at exactly the point we want to cut.

If an arm has flex, it will have a resonant peak at a certain frequency and dampen out noise above that. Adding mass to the end of the arm eg with heavier motors will lower that frequency and enhance resonance. Making the arm stiffer will shift the resonant peak higher and attenuate the magnitude of the resonance.

The two main problems with 'soft mounting' methods are:

1. they all can induce resonance at or around their cutoff point, and

2. it is difficult to know what the actual cutoff point will be.

It is possible to test performance of soft mounting systems is to push noise through them and see how much gets through. For an FC we have the recorder built in - the gyro. So if we were to hard attach the FC to a loudspeaker cone, and drive noise into the loudspeaker, we could get the frequency response of that system (the loudspeaker itself would be non-linear especially with the mass of the FC attached). If we put a soft mount _between the loudspeaker cone and the FC_, we could see exactly how that soft mount altered noise transmission to the FC; we would have scientific evidence of what kind of attenuation / resonance was actually happening.

To do it properly, the mass of the soft mount parts would be included in the first part of the test by attaching them to the loudspeaker cone but not in the attenuation pathway.

I did something like this about 30 years ago when testing frequency response of arterial pressure monitoring systems. It takes quite a bit of time to do. Until someone gets hard data on it, we really have no idea if our soft mounts are too soft, too hard, causing resonance, etc.

## Soft Mounting the FC board

#### A nice overview of the Yaw Twitch and/or throttle oscillations from ctzsnooze

Lots of us have seen exactly this behavior. I am surprised that you seem so astonished now that you find it happens to you. It happens randomly. It could happen to anyone. It just happened to happen to you. :-)
It goes away with replacing the gyro chip, replacing the FC, or soft mounting the FC; these fixes work whether or not capacitors are added. Sometimes it goes away by just adding capacitors.

Since soft mounting is a reliable fix, external vibration seems the likely culprit, difficult otherwise to explain how soft mounting often causes it to just disappear. BLHeli-s ESCs are more commonly implicated than non-BLHeli-s ESC's and in some cases capacitors help so there may be an electrical contribution. It is far more common on yaw than the other axes. The yaw sensor within the chip must be physically different from pitch/roll since the axes relative to the layer of silicon for yaw vs pitch/roll are quite different.

That's all we know for sure. How these factors actually cause the oscillation, and why it is yaw exclusive, is completely speculative.
When soft mounting doesn't work it's usually because it isn't done in such a way as to effectively isolate the FC.
I've seen such extreme examples as to render the quad un-flyable, and also much milder examples, so it is not an all or none thing.

Although the magnitude is increased by higher yaw P it is not simple feedback oscillation, there is no threshold value of P below which it disappears. The actual oscillation frequencies are so low as to not be attenuated by the o-rings. Exactly what the o-rings block is not clear.
It cannot be eliminated by filtering the gyro data - as has been pointed out before, out the primary oscillation frequency is within the range we need for to fly the quad normally.

It is not a software issue in BLHeli or Betaflight, we can be sure of that. Replacing the gyro chip doesn't change that software yet it does fix the problem.
My gut feeling is that this is an inherent issue in these gyro chip themselves, and that some individual examples of these chips get it much worse than others. That's why I recommend replacing the gyro chip or the whole FC if simple soft mounting fails to solve the problem.

When you guys say you are soft mounting, be aware you need to over drill the holes to 4mm and ideally bevel the top and bottom of the hole so that the FC 'floats' in all axes. You need to check for free movement. If you don't drill out the holes the bolt holes will stick on yaw on the bolts and transmit vibrations directly. Also you can't have anything stiff pushing on the FC, ideally all wires to/from it need to be very fine silicone.

You should revisit that mounting and check it does work like you can freely wiggle the board in all three movements. Do that before doing anything else. That is the most likely thing to fix it.

I have seen this problem twice (two separate quads, both 6000's, out of maybe 15 machines) and exhaustively tested solutions on those two with the problem. It is pointless trying to filter it out. It is a hardware gyro issue where it is sensitive to noise generated by motors powered by BLHeli-s ESCs. It will be affected by changing yaw P but typically not eliminated.

In both cases, proper soft mounting fixed it. Without the soft mounting I also could eliminate it on one by desoldering the gyro chip and replacing it with a brand new one. I didn't try that on the other.

My conceptual model is that the hardware PWM system in BLHeli-S ESCs causes some kind of very specific noise at certain throttle points that deeply affects the yaw sensor part of some gyro chips.

It is also possible that there is an issue in BLHeli-S code that causes the problem. By that I mean there may be a throttle point where output is not linear. I have noticed that by spooling motors in motors tab very slowly and listening carefully there are some throttle points where the motors lose their smoothness. This non smoothness at certain points is also the case on non BLHeli-s ESCs. It could be that all four motors together at these points somehow encourage positive feedback. To rule this out someone needs to thrust test in such a way to validate linear proportional motor output in the affected range. But to date no-one has done that test or identified any specific ESC firmware issue. FWIW, I disable all dithering in BLHeli-S. Maybe give that a try.

#### But the most important thing is a truly functional soft mounting. Not some half-hearted bunch of o rings

MotoLab Cyclone boards have plenty of space around the holes, intentionally, no problem there. It's a totally different situation with a Dodo, which has components very close to the holes. Especially tough if the FC bolts need to keep going up for structural reasons like on many small frames, in which case you have no option but to enlarge the holes.

I can't stress enough that just over drilling isn't enough. The board can and will slide on the o ring until one hole stops with the edge of that hole wedged on a bolt. Beveling the top and bottom of the hole allows re-centering and is essential with a yaw issue of his kind. I use a cheap conical grinding stone to make the bevel.

#### Post by jubifly

Had similar problems on my build. I tried both, limiting possible electrical noise with capacitors and mechanical vibrations by soft mounting the FC with some rubber o-rings. Both with no luck. I then tried to remove the FC completely from fixed parts at the frame and left it hanging in the air (just the motor and rx wires) and the yaw twitches disappeared. My thoughts on that were that the rubber rings were not applicable (maybe too hard?!) for soft mounting...
Maybe try leave the FC dangling in the air and see if it still happens - just to definitely eliminate the possibility of mechanical noise being the issue.

#### Here is a post from ctzsnooze on a better soft-mounting method.

http://www.rcgroups.com/forums/showpost.php?p=35486733&postcount=36111

#### Post from deekon on Soft Mounting:

https://www.rcgroups.com/forums/showpost.php?p=38103439&postcount=50944

### Links to Soft Mounting hardware:

OZ -- I am using these, $4.30 for 8 shipped. They are rubber 8mm x 8mm with standard M3 male/female mounting.
http://www.ebay.com/itm/151873404692?_trksid=p2057872.m2749.l2649&ssPageName=STRK%3AMEBIDX%3AIT&rmvSB=true
These are the only ones I have tried and all yaw twitches are gone, they are stiffer than I would think would work, but working well on my revolts (SSG) and sparky2's (9250) flight controllers @ 32/16, motors are hard mounted.

These were just posted and look to be red silicon (softer?)
http://rotorgeeks.com/index.php?route=product/product&product_id=599&search=damp

Gozz -- These are the ones I recently started using too, they work very well for the size.
https://www.readymaderc.com/store/index.php?main_page=product_info&cPath=53_777&products_id=6306

## Soft Mounting Motors

#### Comments on this by AILERON8:

Isolating vibration at its source before it's amplified is standard practice in just about every mechanical and aeronautical engineering handbook that's ever been written. Yet for some reason most folks in this hobby are so laser focused on a software-based filter or FC enhancement of some sort they're blinded to what should be an obvious solution. Dampening the motor vibration, stiffening the frame, or even placing a sensor near or on the motors (utilizing the active feedback signal within the FC software for an automated/enhanced filter) are going to have a much more pronounced effect on noise reduction than all the software filtering in the world.
I'd also just like to mention that I am in no way trying to imply that software-based filters in the flight controller are ineffective. Only that reducing motor vibration has great and untapped potential in my opinion.

#### AILERON8:

The same goes for motor soft mounting, the bolts must be isolated for the method to reach its full potential. I have yet to see a quad with fully soft-mounted motors, but I suspect it would make for the smoothest, most oscillation-free quad ever. So oscillation-free these 32khz gyro's should be all set for takeoff. Floating motors should eliminate the opportunity for resonance to develop and propagate towards the sensitive gyros. Unlike soft-mounting the FC, for motor dampening to be effective it doesn't need to eliminate frame oscillation. The goal for motor dampening is to decouple the frames' natural resonant frequency from the motor as its oscillations vary in frequency and amplitude. All motors oscillate, regardless of balancing. The frame won't oscillate if it's detached from the motors. The motor must completely float in order to achieve this effect however. Which is why I think folks will be in for a surprise when they see how well motor soft mounting can be if fully implemented. I honestly think FC soft mounting will be a thing of the past when the results start pouring-in...
Using [these wiggly jiggly ones from BG: ](https://m.banggood.com/10-PCS-Silica-Gel-Anti-vibration-Pad-in-for-22XX-23XX-Motor-p-1147595.html?rmmds=orderdetail&utm_source=tradetracker&utm_medium=tradetracker_SE&utm_campaign=tradetracker&utm_content=227736)

#### Tesseract1984:

Agreed.
Having tried it all (soft mount FC, caps on mains, caps on ESCs, soft mounting motors), this seems to be the ticket. I've had varying levels of success with each option. The most useless of them all being a cap on the mains.
Soft-mounting motors makes the most sense. In my opinion doing it to the FC is a band-aid while doing the motors attacks the source and doesn't introduce any delay.
A little anecdotal story; i once went overboard with soft mounting a LUX v1 and it actually caused problems. I not only had those rubber bobbins, but also O-rings and the lower standoffs resting on a tpu printed plate with screw holes. What this caused was a very slow wobbling oscillation akin to when I-term is too high (at least in older BetaFlight versions).
While multi-rotor flight is still in it's infancy and we are trying new things, yes there are a lot of hype trains. As you can see I've been on them all, but truly, this is the first one that has conclusively solved a plethora of issues including:

- FPV video interference
- HD cam jello
- Sporadic yaw twitch
- Un-tuneable D-term
- etc etc
  Would love to see frames come out that have motor soft mounting built into the frame. IMO this should become an industry standard. Also had an idea a few months ago for FC screw holes to have silicon material with a hole big enough for screws.
  Anyway, just my 2 cents. Just converted my whole fleet using tpu soft mounts and it has literally changed my quadcopter experience. My HD footage actually starting to look like I might know what I'm doing.
  All aboard, the hype train is leaving the station!

#### Another Post on curing oscillations from linklemming:

https://www.rcgroups.com/forums/showpost.php?p=36220137&postcount=41113
Later comment:
I just stuck three squarish (~15mm) pieces of electrical tape on the frame underneath the motors, used an exacto knife to cut holes in the tape for the screws and remounted the motors making sure not to tighten them down too much.
I really doubted it would be as effective as it was since vibes can still come thru the mounting screws but it fixed the issue.

### Motor Vibration Isolators. Printed in extra flexible NinjaFlex (softer than TPU)

https://www.rcgroups.com/forums/showpost.php?p=36698872&postcount=2693

#### [Motor soft mount idea:](https://www.rcgroups.com/forums/showpost.php?p=37447636&postcount=48105)

#### Some experiments and observations from AILERON8:

I've found it's these lower frequencies where the soft motor mounts work best. Sometimes shifting the noise upward, but often eliminating it altogether. In addition to trying-out the dynamic notch filter on two quads I spent last weekend playing with my motor soft mounts. Empirical testing only, e.g., quads with busted BB's at the moment unfortunately. I also noticed how the higher sounding prop resonance from one of my quads didn't change (as much) with motor soft mounting. My FC soft mounts seemed to be more effective at alleviating the mid-to-high frequencies of the singing unbalanced butter cutters I was testing. It was far from an exhaustive design of experiment, but there was definitely a trend where my silicone and/or rubber soft mounts helped to get rid of the lower motor and frame resonance without having to place additional BF filters. Using the same butters I also noticed how removing my gyro notches had a noticeable impact on mid throttle oscillation reduction as it related to the noisy props. At least on the one quad I was testing, and that's not the first time I've experienced this effect. I'm hoping to do more testing this upcoming weekend and finally get some BB logs to show cause & effect.

Let me clarify on my first statement: not actually "shifting" the frequencies higher, but reducing the amplitude of the lower frequencies, leaving the higher frequency noise alone.

## Adding Cap(s)

#### Thread about Caps for Noise reduction (has links to recommended Caps):

https://www.rcgroups.com/forums/showthread.php?2830948-Capacitors-for-noise-reduction

#### Post by Swing3r

I had issues with yaw oscillation at mid throttle with Aikons + Lumenier 2206-2350KV-motors. Soft mounting helped but not fully so I also added a low ESR 1000uF 63V capacitor to my PDB (cycolone FC is powered by lipo directly) and viola, all traces of the yaw-oscillation is gone.

#### Post by fftunes

Just another small report of electrical noise: Friend built another all new quad with naze r6 which produced a weird high frequency hum, no matter what filters/PID etc were set to.
A single cap (35v 470uf) to the pdb fixed it.

### Originally Posted by mnemennth: ad nauseum

Today's high-speed high-current ESCs are the electronic equivalent of a chainsaw running WOT, and your entire power supply has to juggle 4 of them at once. They used to have 330-470uF capacitors right on the ESC to clean up this noise, but everybody bitched that the ESCs were too big/long/fat/lumpy, so they started designing with big banks of tiny ceramic caps right on the ESC as a substitute.

What they didn't realize was that ceramic caps are not the same as equivalent electrolytic caps due to a factor known as derating. At around the same time, we started demanding massive increases in both speed and current capacity from our ESCs... Ironically, we needed those big caps on the ESCs more than ever just at the time we got rid of them. We need to put that capacitance back on there one way or another.

I recommend still installing a 1000uF 35V Low-ESR cap even if you are using a regulator to power your video equipment. Linear regulators can pass some very fast-acting spikes right through to the load they power, while switching regulators are prone to being themselves damaged by such voltage spikes; enough so that Pololu warns about the issue at the bottom of every one of their regulator listings.

This search returns only capacitors advertised as Low ESR, and only US vendors.
https://www.ebay.com/sch/i.html?_from=R40&_sacat=0&_nkw=1000uf+25v+low+ESR&LH_PrefLoc=1&_sop=15

Look for name brands like Panasonic, Sanyo, Nichicon or Rubycon. Pick a vendor with a price and ETA you like. To be sure you get low ESR you need to check the part # against the MFR website; Low-ESR/High Ripple current rated is what we want.

There simply is no better way to spend 3 grams on a build.

### List of Soft mounting parts from SadLeprechaun-

I use this stuff for soft mounting/vibrations:
[Motors](http://www.getfpv.com/motor-soft-mount-silicone-pad-w-3m-backing-set-of-4.html)
[stand offs](http://www.getfpv.com/anti-vibration-flight-controller-standoff-7mm.html)
[o-rings (on top of standoffs)](http://www.getfpv.com/multipurpose-o-ring-set-of-8.html)
[HD cam / escs:](http://www.getfpv.com/rtom-anti-vibration-moongel.html)
[Cap for battery lead:](https://www.amazon.com/dp/B00T2IA7MM?tag=viglink20264-20)
[Caps for ESCs: ](https://www.amazon.com/Panasonic-470uF-Radial-Electrolytic-Capacitor/dp/B00WOQ0ILE?tag=viglink20264-20)
It took all that and removing gyro notch filters / PT1 fix to get the F60 Pro quad to run without mid-throttle jitters. Each thing reduced them more and more.

### Soft mounting parts from AILERON8

[motor mounts](http://pirofliprc.com/1mm-Medium-density-motor-soft-mounting-pad-10-pcs_p_3852.html)
What I also like about the sticky rubber mounts is they're effective without having to stack them in multiples. Just one on top of the arm and a TPU soft mount underneath is enough to improve the noise profile. Especially for really powerful motors.
[Pictures](https://www.rcgroups.com/forums/showpost.php?p=37806019&postcount=550)

### Post on soft motor mounts:

https://www.rcgroups.com/forums/showpost.php?p=37788454&postcount=49263

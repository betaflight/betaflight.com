# Gyro and Dterm Filtering Recommendations 3.1

:::caution
These notes apply to betaflight 3.1. There are some interesting filter discussions at the end.
:::

## Changes in Default Filter settings

From version 2.7 onward, the default filtering strength settings are _reduced_ in order to provide the best possible flight characteristics. You may find that after upgrading, your aircraft becomes very twitchy or uncontrollable. This can be caused if you have a noisy quad because the vibrations are now making it past the filter into the PID loop.

##### Note: Defaults values can be different across minor and major firmware versions. Always do a CLI DUMP (or a get 'partial name') to see what the default values are before making changes.

### From Boris:

In case your setup is too noisy you need to adjust the filters. Here are some of the recommendations. The more filtering you use the less noise will be let into the system, but that will reduce the overall responsitivity of the pid controller and provide less stability in prop wash scenarios for example. Using as low as possible Dterm can help too.

- Default / Optimal flight performance:
  - gyro_lowpass = 100
  - dterm_lowpass = 110
  - gyro_lpf = OFF
- Slightly noisy setup:
  - gyro_lowpass = 80
  - dterm_lowpass = 100
  - gyro_lpf = OFF
- Very noisy setup
  - gyro_lowpass = 50
  - dterm_lowpass = 100
  - gyro_lpf = 188HZ
- 2.6.1 defaults:
  - gyro_lowpass = 80
  - dterm_lowpass = 70
  - gyro_lpf = OFF

### Example

Below is a snapshot of the Gyros (top) and PID sum (bottom) using default betaflight 2.8 PID settings. The Blackbox log viewer is zoomed out to 10% which helps to visualize the noise (thick gyro lines = noisy). Before changing the filter settings the quad was nearly unflyable.

Blackbox Gyro reading with Default 2.8 settings
![No filter](http://i.imgur.com/mMkDETV.png)

Blackbox Gyro reading with _Very Noisy_ settings from above
![Filtered](http://i.imgur.com/oOlGGtv.png)

### From ctzsnooze's posts:

The ideal value for filters is as high as you can go without getting hot motors etc. I don't think anyone can tell you how high you can go.

But your particular concern was that your motors still felt a bit warm. So I'd map out what dterm cut does while leaving gyro cut where it is. The only way to find out is to do the testing. Once you know the best value for Dterm cut, ie the value where motors are coolest, keep dterm cut and gyro cut in the same proportion from then on. If, despite finding the coolest value for dterm cut, they are still warmer than you'd like, try say reducing both by 20%. If they are cool and you want crisper performance, try increasing both by 20%, and keep going up until they become clearly warmer than with a lower value.

If you really want to optimise things you need blackbox. Your motors might just be warm because you fly hard! :-) There may be no PID oscillation at all. If that's the case, and you don't have blackbox, you can keep going up on the filters, both in a fixed proportion, keeping dterm cut above gyro cut to the same percentage - until the motors get obviously hotter or noisier, then back off a step. Then if you could be bothered, repeat the dterm cut optimisation until you have the filters set as best they can be.

Note that if you change P or D upwards or change props you may have to modify the settings.

On my setups 70 for gyro and 90 for dterm keep motors cool even with the most beat up props, flexy frames and oldest motors.

See [BB logging page](/docs/wiki/guides/current/Black-Box-logging-and-usage) for measuring noise and filter.

The sequence in disabling notch filters isn't certain.

The best approach is to blackbox the quad with both gyro notch filters off and look at the spectrum of the gyro trace. If there is a big peak there, and that peak is resulting in noise that is visible in the motors trace, then it should be filtered out by a gyro notch. If there is diffusely too much gyro noise, but no specific peak, then either use the biquad filter or lower the gyro cut low pass filter.

Not removing a prominent spike in gyro noise will just not be a good idea.

Once the gyro trace is relatively clean, then look at Dterm noise spectrum to decide how much filtering it needs; if it has a spike that is causing problems, it should have a notch. But if you already have controlled the same spike in the gyro trace, you may need no notch on D.

If you can control a spike with a notch in either the gyro trace or the D trace, which approach is better?

Well, it depends. A big spike in gyro that is not filtered out will cause noise on the P trace that will get into the motors. Notches on D will not get this out of P. The only way is a notch on gyro. On the other hand, if the spike is not very prominent in the gyro spectrum, but Dterm exaggerates it and makes it a problem only in D, then put the notch in D and don't worry about a gyro notch for that particular problem.

Without a black box there is no reliable way to know what to do. Certainly you can just disable the notches randomly, listen to the sound of the motors, see that they don't get hot, etc, and keep only the filters that are needed. But as to setting the ideal values, you need to get a black box log for that.

Recently helped review a noisy log. Quad had PT1 on both gyro and D, and only one single notch, on Dterm.
Log showed _no_ peak in noise at the center point of the Dterm notch when looking at debug notch or the incoming gyro data! That notch was achieving absolutely nothing! :-)

Take home message: you cannot guess where to put notch filters!
Notch filters really need a black box log to get them focused exactly on a peak. Otherwise they are useless and counterproductive.
If you are going to blindly remove a notch to 'see how it goes', try removing the _lowest_ frequency notch before any others.
That's the one that is most likely to mess with frequencies relevant to flight dynamics.

A notch filter set very high up (eg 300 center 200 cut) will have much less effect on flight dynamics than a lower notch filter (eg 200 center 140 cut).

Did a heap of testing today... interesting stuff.

I realized that if you put P, I and D all to 2 (ie, almost totally off), what you the blackbox the gyro trace (quad safely hand held or in a restraint) shows gyro data without amplification by PIDs. If you zoom in on gyro (say 1000 times, with no expo on the trace), you can see the 'input' noise as would go into the PID loop.

If we then add P alone, and test while (safely) hand held, it becomes apparent that the amount of noise added by the 'P' part of the PID calculations is small. Even with PT1 and no notch filters, P itself doesn't seem to be much affected by motor noise, nor contribute to feedback resonance in a big way. If it wasn't for D, all we'd need is a PT1 on gyro.

But when you add D - that's when it gets interesting. With only a PT1 on gyro, D carries a heap of amplified noise back to the motors - even if D lowpass is a biquad.

This is a cunning way to identify what P or D individually add to the noise sent back to the motors.

Overall I get the impression that we need more D filtering than Gyro filtering. We can drop back on gyro, but when we do, more noise gets through to D, making a worse overall noise picture. A but more D filtering would allow less gyro filtering, and probably better handling.

PS - I too had many occurrences of 'prop resonance' where the frame shakes and the prop blades flex like crazy, starting really abruptly at just above idle throttle, and easing off with more throttle. It starts abruptly, sounds really bad, the quad shakes violently, and if you're on the ground it adds thrust and tries to fly away. If you throttle past it, all comes good again. Motors quickly get hot! I recorded it. In my case it was a very narrow peak at exactly 145 Hz, put a single gyro notch filter there and it disappeared. Interestingly this shaking was entirely in pitch and roll, yaw was flat and smooth. Also the D component was three times larger than the P component. Once a carefully placed notch filter eliminated the problem, flight was entirely normal all the time. I don't really understand what's causing this, it is definitely a feedback process driven mostly by D, but why it should be so powerful at such low rpm has me beat.

[NO MORE PROPWASH OSCILLATION ](https://www.youtube.com/watch?v=PHkofDq_JxU) A Joshua Bardwell Video.

## Version 3.2.X filter\debug sequence:

![](https://static.rcgroups.net/forums/attachments/6/8/2/3/6/4/a10687440-175-Debug_Mode%20Process%20Flow%20Diagram_1.png)

## Filters were changed in Version 3.0

### What Defaults changed in 3.1.7?

Boris's answer:
Basically people kept complaining that betaflight default D was too conservative and therefore changed.
Setpoint transition has been disabled (1.0) to give more linearity over the entire stick.
I still recommend that you slowly remove default filtering as well if your setup allows you for best results. Nowadays most do softmounting so removing of filters can easily improve performance. The defaults are optimized for hard mounted medium noisy environment for safety. The best tuning performance is achieved with as less Du.

#### I think best filter removal steps would be.

set d_lowpass_type = PT1 (in the CLI) should always be done first and I think possible on every setup.
If it is still fine than:
Remove notch 1 (set Gyro Notch Filter 1 Frequency[Hz] = 0 in the config GUI or in CLI type "set gyro_notch1_hz = 0" to disable Notch filter)
Then if its still fine
Remove notch 2 (set Gyro Notch Filter 2 Frequency[Hz] = 0 in the config GUI or in CLI type "set gyro_notch2_hz = 0" to disable Notch filter)
Now if your setup is still clean you could even remove the dterm notch (set D Term Notch Filter Frequency[Hz] = 0 in the config GUI or in CLI type "set d_notch_hz = 0" to disable Notch filter).
That will give you the best results. Sharpest response, easiest tuning and literally no prop wash on good setups.

Note that default betaflight filters are made so every beginner can put a quad in air without burning his gear.

Dterm lowpass is always needed. Never remove that! Even on the cleanest setup.

I think if you really put some effort to build a clean setup you easily can get away without most of other filter settings.
To test that I was able to repeat it on 3 of my builds. Hardware softmounting is always filtering without extra penalty.

The most difference with and with filtering comes from the steep gyro changes. The more filtering there is the slower P will react on high gyro changes and translates itself to more prop wash and less direct feel.
As I said defaults are meant to be safe and protect against most common vibrations shown across many hardmounted 4 / 5inch setups. But more and more people care about clean setup nowadays than lets say 1 year ago and that means you may get much better running setup with some filter removals.

#### question from linklemming:

From BB analysis with debug notch on, I have determined that D lowpass of PT1 is fine and that I only really 1 notch filter (300Hz center, 200Hz low). I have a softmounted FC.
I can see the spike in the frequency range both in P and D.

Boris mentions removing gyro notches first, I'm wondering what the trade-offs would be in selecting gyro notch vs D notch. Obviously if using only gyro notch, I get noise reductions in P and D and it seems to me this is better than using D notch unless there is some flight behaviors that would be better suited to using D notch only. The noise I believe is low enough that any P noise from using just D notch would be minimal.

Interestingly all the quads I did testing on this weekend show the same noise spike around 300Hz (+/- 30Hz).
This includes:
F1-4B 3mm with DYS 1806-2700kv motors, dal 4045V2 tri blades on 4s
My own design sub250g 180 quad(3mm) with rcx1306-3100kv, dal 4045 dual blades on 4s
My own design sub250g 150 quad(3mm) with dys1306-4000kv, dal 4045 dual blades cut to 3" on 4s

Im guessing this is just frame resonance? All are 3mm single baseplate designs.

Answer from ctzsnooze:
To be honest, no-one really knows.

If you compare D trace (zoom in, smoothing off, expo off) to P trace (same zoom), and if most of the noise is in D, then there are two ways of dealing with it.
First way of thinking about it, just filter what is bad - ie just filter D only. This fixes the noise problem and delays P the least.
Second, put the notch on gyro, that's where the noise is coming, this way both P and D will have less noise, and the relative phase lag between P and D won't change.

Frankly I doubt it makes any difference..
I do like the idea of only adding filtering where it is necessary; in this case, just putting the notch on D. Sure there will be slightly more phase delay between P and D, but D is already phase delayed because of the D lowpass filter, and the extra phase delay from a 300/200 notch filter on D alone may have no adverse effect.
If you had time to try both and compare logs, that would be great. If possible make your flight testing 'blind', ie get someone else to make the change in the firmware so you don't know which you are flying.
Be surprised if it makes the slightest difference. If you had to enable the notch filter lower down, eg center 145 cut 90, for example, it might matter a lot. But high up probably either way is fine, gyro should end up slightly smoother and fly just as well.

#### Testimonials

Redtail2426:
So I ended up switching to pt1, removing both notch filters, and removed the d term notch filter, and the prop wash is pretty much 99% gone, much much better than it was with the default 3.1.7 filtering. Awesome job guys

kevinpratt823:
I got rid of the Dterm notch and went PT1 yesterday as well, and it was a considerable improvement on a high power to weight build that was struggling with that last bit of oscillation, opened my tuning window up, raised PIDs a bit.

Hattrickmwf:
Going to PT1 and removing all the notch filters made a huge difference in my quad too. Almost Zero prop wash. I also noticed it handles impacts with gates or ground touches much better too. No Tasmanian Devil quad after impact. May be placebo effect, but it seems to handle a lot better too.

Cheredanine:
Some interesting stuff:
I removed filters on f3 flight controller, by the time I removed first notch filter flight performance was much improved (perceptively) when I removed second notch didn't make much difference (or none that I noticed subjectively) although bb gyro traces remained clean, clearly there was a sort of milestone I passed in terms of latency.

I repeated on an almost identical quad running f4, this is where it got interesting, the improvement was similar but les marked, subjectively the most noticeable thing was prop wash vanished.
BUT,
On a whim I switched from 8khz/4khz to 32khz/16khz the change in speed had a dramatic effect, gyro traces were noisy as hell, but motor noise was at values like 400kz which 8khz should find easily. Front two motors got warm and audibly screamed over about 15-20% throttle. Quad actually flew quite well.
Got both set of bb logs and not particularly worried as I usually fly8/4 but thought the result was quite interesting.

Oz asked:
You find 8/4 flies better than 32/16? (Properly soft mounted)
Cheredanine's answer:
Subjective but I don't find improvement over 8/4, probably less than that. I have 5 quads with bluejay f4s in them, i gave 32/16 a good test since it became available. Provided you tune it properly, 8/4 is as good as 32/16 as far as I can tell, I am 100% sure I would not be able to tell the difference in a blind test. (The quads I mentioned above are both dquad obsessions with returner r4, 25a blheli_s 16.6 escs, one uses an rg-ssd, the other has a bluejay., no noticeable difference in flight apart from:
Normally (with filters) 32/16khz has motor noise above 4khz, this is not apparent on spectrographs at 8/4 but then given the scale of the graph and Nyquist limit I wouldn't expect it to.
But strip back the filtering and 32/16 is far messier, flies ok, but the heat and noise from the motor was worrying.
All quads have vibration isolation on the fc, where possible using rubber standoffs (exceptions being shrike and tokio-x prototype, the former has to use rubber o rings and the latter has a unique vibrations isolation mount).
32/16 has so far not flown any better than 8/4 and in some cases flown considerably worse.

Boris provided the following info:
There is additional filtering present when running at 8khz gyro or lower, this is not present when running 32khz. Therefore changing d low-pass to pt1 and removing notch filters when running 32khz will produce much messier gyros.
In summary I found quad flew fantastic on 8khz gyro with filters stripped back but on 32khz gryo I had to leave them in place to get similar performance and no heat in motors.

Posted by QuadMcFly:
So here's my experience with PT1 and the notch filters, as well as some other general thoughts. I gave RF1 a shot for about a month, because I like to try things so I can actually speak from experience. Something about my rig really hated RF1. I had some pretty significant issues with low throttle noise, and the stick handling never felt right. Kind of felt unpredictable like I was having to fight it instead of flowing with it. I don't necessarily think that is reflective of everyone's experience on RF1, I just think there are some setups that it doesn't like at all, and mine happened to be one of them. Anyway I got tired of fighting it, so I put BF 3.1.7 on the revolt, 8k/8k PT1 Dterm, lower gyro notch removed. Got it flying a few days ago and I have been totally blown away. The difference was stunning. Like going from PPM to S.Bus all over again. I don't think I've ever flown anything that flew this well, and I've flown a lot of stuff! It still needs a bit of adjustment to clean up that last bit of prop wash, but man alive! Amazing for a totally blind tune, just thrown in based on the power train. The stick feel is utterly amazing in terms of precision and crispness.

As I mentioned a few days ago, DO NOT run PT1 dterm on 32khz! It is quite likely to launch your quad at full throttle! Found that out on my first attempt 8k/8k on the other hand is absolutely stunning! 10/10 would recommend!

Here's a boring few clips from about the only spot I really get a chance to fly, feel free to skip it:
https://youtu.be/3KZlI8F0ER8

Boris' response:
Looking great indeed!

It basically all comes down to filter interaction. There is no 32k magic at all.
Any kind of bench test didn't show any performance gain going to 32khz update speed for motors.
But 32k mode fully disables any kind of internal gyro filtering, while 8k mode still has a 256hz lo-wpass active.
The 256hz low-pass is kind of just not enough filtering by itself so it needs a tiny bit of software assistance like pt1 ans you get the best balance of filtering without much signal damage.
32k mode, which essentially only has internal 3600hz low-pass active needs a lot of software assistance to make it useful.
The betaflight philosophy has been more to make every-bodies quad fly without damaging their gear and that meant filter protection against any common oscillation scenarios.
So with all default soft filters on top of it you were still able to fly 32k mode and it felt a bit better than 8k modes as there was simply less filtering.
It is not just delays we are here talking about. What is more important is the amount of signal deformation on sharp changes like what you can get in propwash cases or other very quick changing frequencies.

#### What is the difference between PT1 vs BIQUAD filters

Answer by pete_oz:
A biquad filter is more aggressive (it can filter the noise better at the cost of extra delay). I have no technical expertise to explain how each filter works (perhaps others can explain it for us) but basically based on latest Boris's recommendation we should be using PT1 unless there is too much noise on your copter.

Answer by ctzsnooze:
PT1 is a standard -6db/octave 'infinite impluse type' IIR type low pass filter. Signal amplitude is halved at the set frequency and then is reduced by a factor of four times each time frequency doubles above that. Delay is approximately 1ms at 100Hz (2ms at 50Hz etc). Phase shift is 45 degrees at cutoff frequency. This filter is the digital equivalent of a simple analog low pass RC filter.

BiQuad is a steeper -12dB/octave low pass filter. Signal amplitude is halved at the set frequency and then is reduced by a factor of 8 times each time frequency doubles above that. The 'cost' is that delay and phase shift is doubled. Delay is approximately 2ms at 100Hz (4ms at 50Hz etc). Phase shift is 90 degrees at cutoff frequency (I think that's correct). Basically twice as steep a cut, but more delay.

Answer by Boris:
Ctznooze explained it already, but here a very easy explanation for those who don't understand how filters work.
PT1 is a less good filter, but therefore much faster than BIQUAD. Dterm speed of reaction gets greatly improved with PT1 therefore and the pid controller gets a faster reaction in quick disturbance cases.
The main performance difference comes into play during very rapid accelerations and decelerations of gyro changes.
You could say that rising and falling edge scenarios from gyro changes are better followed with PT1 than with any other higher order filter.
Though BIQUAD coefficients also can be modified to be same to PT1.

#### What is the difference between the gyro notch and the D-term notch?

Answer by Boris:
Gyro notch is applies to gyro input and dterm notch on dterm output.
But those are in line. Gyro noise at 300hz will also result to dterm noise at 300hz
Loop:
Gyro->PID->motors
And again

#### How should I set Dterm Notch Filter? Do I set it to the same value as Gyro Notch Filter e.g. 285Hz?

Answer by pete_oz:
It's difficult to answer this question because in BB spectro analysis we are unable to produce spectro graph that would show us state of noise after gyro notch filters were applied but before D notch filter is applied.
We can see spectro graph before gyro notches are removed ("pre-notch") and can only compare it gyro spectrum graph after all filters (incl. D notch) are applied.
In order to be able to identify this better the developers would have to implement debug mode that would allow us to see state of noise after gyro notch filters but before d notch filter is applied.
I remember someone was requesting this functionality on Github but the request was dismissed with explanation given (please don't quote me this) that D term noise pattern is identical to that of gyro noise except for the magnitude of the noise.

When asking same question in the past (how to set my D notch filtering) I believe I was given the answer to set my D notch filtering for example between my 2 gyro notches (if I have a gap there) or otherwise set it to where I have most noise.

Answer by ctzsnooze:
Well, first get the noise level under control with basic filtering (no notch filters at all). By that I mean, configure the basic gyro filter appropriately, either BiQuad or PT1, until your P trace on blackbox is 'smooth enough'.

If the P trace has a prominent noise peak, apply a gyro notch filter to specifically block that out - but only if the amplitude is big enough that you can see it in the P trace itself. If the noise is less than 1% of signal, like if you can't really see it in P trace compared to signal, ignore the spectrum and don't use any notch.

If you need two gyro notch filters for specific gyro peaks, use them.

After doing all this, then look at the Dterm trace. You must have some basic Dterm filtering. If the Dterm trace appears to have less than a few percent noise, you don't need to do anything, you could conceivably use less filtering an get better performance. If you have a broad band of noise on D, then you may need to lower the overall D lowpass or use a BiQuad on D.

Only then would you think about adding a D notch filter, and only to deal with a very specific peak that had got through the gyro notch filters.

Finally check the motor traces at different stages in a typical flight. Provided that oscillations are less than a couple of percent, they can basically be ignored. We are not trying to get a flat spectrum, just to make it so that signal to motors is 'clean enough'. If we filter super hard, we may get rid of high frequency noise, but may end up exaggerating low frequency wobbles. There is some 'sweet spot', and it differs according to what you want to achieve.

Full optimization simply can't be done without a blackbox, quite a lot of time, and knowing what you're doing. Think of it like you are reprogramming the ECU of your car.

Also be aware that if you change your props, if they get some nicks or bends, or if you get a little bearing wear, or even if you just change ESCs, all your careful optimizations done with clean new original gear won't work so well.

Reducing filtering to the bare minimum, keeping motors perfect, and only flying clean props = fantastic performance and hardly any propwash wobble (assuming light props, low rotational mass, and free-revving powerful motors).

For me, I'd rather fly. I set my filters relatively quite low, and don't care much about a little propwash. Motors stay cool, tolerate bent props really well, don't get burning hot at the drop of the hat. Turn P down on more powerful setups. But yeah, I get propwash on hard 180 stops, so I just live with it and learn to fly smoother arcs :-)

No one should use motor signal as the input source in blackbox when modifying filters.

Pterm noise is the same as gyro noise multiplied by your P factor. In BlackBox, gyro or P traces should be used as the input source for tuning gyro filters.

Dterm noise can only be evaluated using the Dterm trace in BlackBox logs. Be aware that Dterm is calculated _after_ all the gyro filtering, so always first optimise the gyro filters, then worry about Dterm filtering independently. A Dterm notch should only be used when there remains a peak in Dterm _and_ where that peak is of such magnitude to be a significant contributor in terms of your final result. Otherwise don't use it at all. Just randomly setting the Dterm notch in-between the gyro notches is not likely to work well.

By comparing noise levels and spectrum between P and D in blackbox, it's actually quite easy to visualise what the Dterm filtering is doing. And of course you can turn it off and do a short test run :-) just not for long or you may overheat.

The only role that the motor traces have is to look at your overall 'end result' - to visually quantify the amount of energy in oscillations of any kind, with the goal of keeping the total oscillation energy low enough to be not a practical issue. They should not be used as a blackbox input when tuning filters.

Comment by zenkinsw:
I'm not too technical but once I switched D lowpass to Pt1 it does handle windy days much better, P hunts much less, and less prop wash too, basically less bumpy fly, but trade off with some more D noises motor get hotter.
I think people want to try PT1 need to lower down D back to around 24 first, tune it like the old days, actually I found much better as I know when to stop adding numbers lol, also with dshot much easy to see over Dgains symptoms so you know when to back down.
For racing I think Biquad still best if don't mind a touch of prop wash but benefits will more efficient and faster motors.

#### How do I see the dterm trace? Roll/pitch D graph in BB log??

Answer by ctzsnooze:
Yep, click on the icon at the right near the parameter to select that one.
For Dterm just graph it, select either roll or pitch (they can be different).
Remember that you can scroll to a 'start' point in the log, press 'i' on the keyboard, then scroll a bit further on, press 'o' on the keyboard... now your graph only shows that region of the log.
Very, very useful. Allows you to look at hover throttle, mid throttle, high throttle independently, often the peaks are different at different RPM. Looking at noise throughout the entire trace is OK but it can be more productive to focus on the throttle range you care about most (or the range with the most noise).
Be sure to edit your BBLog settings to disable all expo and set all gains to 100% in the first instance. Expo on BBLog traces is very confusing, much better disabled. (S & X keys)

Finally, use the spectrum only to determine the _relative_ distribution of the frequencies, not the absolute magnitude of the noise. In other words, do not worry about the absolute 'height' of the spectrum. It is always bigger if you include more data. For the same included amount of time, a bigger spectrum means more noise, but you must select the same length range to do valid comparisons.
To evaluate the overall magnitude of noise, look at the Motors traces - the wiggly lines themselves - with no expo and 100% scale. Eyeball how much noise you reckon there is, as a proportion of the total motor signal itself.

Post by ctzsnooze on using the Filters available in 3.x
http://www.rcgroups.com/forums/showpost.php?p=35764414&postcount=38600

### Additional discussion on Filter Usage

#### Post by Boris

I still recommend that you slowly remove default filtering as well if your setup allows you for best results. Nowadays most do soft mounting so removing of filters can easily improve performance. The defaults are optimized for hard mounted medium noisy environment for safety. The best tuning performance is achieved with as less Du.

I think best filter removal steps would be.
set d_lowpass_type = PT1 should always be done first and I think possible on every setup.

If it is still fine then:
Remove notch 1
Than if still fine remove notch 2

Now if your setup is still clean you could even remove dterm notch.
That will give you the best results. Sharpest response, easiest tuning and literally no prop wash on good setups.
Note that default betaflight filters are made so every beginner can put a quad in air without burning his gear.

Post by ctzsnooze
When Boris was first putting notch filters into betaflight they were intended as narrow, specific point filters, to block tight peaks of noise - and for this they are really, really good.
However, when set wide, and particularly if set wide with a low cutoff, they do have a 'tail' that causes both delay and phase shift. Those negative effects can extend some way below the lower cutoff point, especially if the filter is 'wide', ie there is a big difference between center point and low point.
For example, setting a notch center point to 200 and its low point at 100 will have significant effects below 100, whereas setting it to center of 200 and low point of 160 won't be nearly as much of a problem.
Notch filters should be used primarily to control tall, discrete 'peaks' of noise, and only made just wide enough to control the peak.

#### post by r.a.v.

As explained earlier PT1 is a first order filter and biquad is a second order filter.

A main difference is also how steep the cutoff of the filter is.
Here's a graph that shows the difference between the two. (X is frequency in Hz, Y is magnitude in dB).
You can see that the biquad does not influence frequencies below the cutoff as much as the pt1 filter, but much stronger above.
Keep in mind that changes in rx input come in at 9ms = 111Hz and influence the D-term based on setpoint rate which is calculated before the filter is applied, so that could explain why pt1 feels better than biquad.

If we combine the filters on gyro with the filters on D, we get something like a 2-3 order filter but with weird behavior on magnitude below the cutoff value. (The coefficients should be changed to get a proper behavior when cascading filters.)
So there is not only a phase shift between P and D, but also a large difference in magnitude.

Instead of disabling notch filters. I'd recommend raising the cutoff of the D low pass filter.
By moving the pt1 cutoff higher and using notches, noise is reduced a lot without influencing lower frequencies.

As an example this is what I use on my super noisy noise-o-copter and get cool motors:
gyro filter: biquad at 110Hz
gyro notch1: 330, cut 250
gyro notch2: 250, cut 170
dterm: pt1 170Hz
dterm notch: 280, cut 160
![PT1 vs BiQuad](https://static.rcgroups.net/forums/attachments/6/5/0/4/8/6/a9947852-19-pt1-biquad.png)

All the filters and signal sources interact with each other and it's difficult to find the perfect setting.
Here's my point of view.

We have:
`< 110Hz: Useful, important signals `
`> 200Hz: Motor noise / frame resonance / unwanted signals `

Gyro filters:
lpf, notch1, notch2

Dterm filters:
lpfD, notchD

Signal path is like this:

gyro -> lpf -> notch1 -> notch2 -> P term -> motor
gyro -> lpf -> notch1 -> notch2 -> D term -> lpfD -> notchD -> motor

Each filter creates more delay the stronger it is.

We want to:
keep total delay as low as possible
keep delay between P->motor and D->motor as low as possible
filter out as much noise as possible

lpf of second order (biquad) creates most delay but has a steep curve and does not influence frequencies below cutoff too much.
lpf of first order (PT1) creates less delay than biquad, but has a strong influence on lower frequencies.
Notches are great to remove certain frequencies created by motors and have a delay based on filter width but less than lpf.

In my opinion it's best to use biquad and notches for gyro. This does a great job at removing noise but keeping the useful data.
The dterm needs still additional filtering so a PT1 at high cutoff and another notch take care of noise without touching low frequency data. This also keeps the delay between D and P low.

The default setting of a biquad for D with quite low cutoff creates a lot of delay and also lower magnitude of useful data.

post by ctzsnooze on Evaluating and setting Filter:
Summary:

- Raw gyro spectrum shows what is happening without any filtering at all.
- Normal gyro spectrum shows what happens after gyro LPF and the gyro notch filters.
- Spectrum from D trace shows how the D calculation adds noise on top of the filtered gyro data. To see what D is 'adding', we compare the spectrum from the D trace (in any given axis) with the gyro spectrum on that axis. We look to see what the D calculation 'adds on'. It usually amplifies noise, progressively more at higher frequencies. That's why D MUST have at least a PT1 low pass filter, and why if there is any high frequency peak creeping through gyro, it will be even bigger in D. The D notch should be applied to that final remaining notch after your gyro notches, or if you have no gyro notches, to deal with whatever is the biggest notch getting through the gyro filtering into D. That's why I say, _always, always always get the gyro filters right first, then look at the D filters_.
- finally, PIDsum and motor trace spectrums shows what the motors finally receive; this is the sum of the gyro->P and gyro->D pathways added together and modified by your P and D weightings.

Remember that we are not 'trying to fix a spectrum'.
Our goal is to reduce the relative amount of noise in the signal going to the motors - say as a percentage of total signal to the motors - to a reasonable level.

Therefore the final step is to visually examine the motors trace (with scaling at 100% and no expo in the blackbox config), and check that overall the noise contribution is small. It does not have to be zero, just small enough to not be more than say a few percent, ideally. 5% noise costs 5% power and gives you 5% heat. The less noise, the better, all things being equal.

You can look at the motors spectrum to see, if there remains a bit more noise present than you want, what its frequency range is. Then you can go back through the pathway to find where best to deal with it.

The purpose of the spectrum and the filtering options is to identify the frequencies that contribute to the noise, so that you can then then to set the cut points on the LPF's to get rid of most of it, then add, if needed, the notch filters to remove any stubborn remaining peaks. But you don't need to put a notch on a peak if the actual amount of noise from that peak that is actually present on the motor trace - the waveform itself - is so small as to be irrelevant. We aren't fixing a spectrum!

Note that as you reduce filtering, the quad will become 'twitchier'. Reducing filtering means that P and D now are active in higher frequencies that they never 'saw' before. So the quad may fly a bit better perhaps, but may also resonate or go insane from feedback when it didn't used to.

The whole goal of filtering is to allow more P and more D than you other wise could use without filtering. And we want more P and more D, if possible, because they are good for propwash. We want the highest P and D possible without overheating motors.

But, reducing filtering may limit how much P and D you can safely run without overheating.

It's just not true to suggest that 'less filtering means better performance', especially if it limits how much P and D you can run. If you have beat up old machines and dodgy props, you will be able to safely run them on quite high P and D with solid filtering.

Somewhere there is a good balance between too much and not enough filtering. Finding the balance that works best for you is what its about.

### Frame and Prop Resonance

Posted by ctzsnooze:
There is a lot of confusion about resonance.

Frame resonance is completely independent of props. It’s an intrinsic characteristic of the frame.

All frames have a natural resonant frequency. At that point, the frame starts to exaggerate how much it shakes in response to the input.

Let's say you have a source of shaking that varies in frequency - for instance, an out of balance prop. As the motors go faster, the frequency of the shaking gets higher. That’s our ‘input’. At the frame’s resonant frequency, the frame will shake much more than at any other rpm. Even though the ‘input’ itself hasn’t changed in magnitude, the frame resonance makes it seem like it has.

A very hard frame won't resonate until the frequencies are very high, but a softer frame with heavier motors will have a lower resonant frequency.

Resonant frame problems will be exaggerated if the arm can flex, ie it is loose at the bolts, or is beginning to fail, or is thin.

However you get real issues when the resonant point of the frame coincides with the resonant point of the prop - and then when the PID loop amplifies the whole thing even more.

That’s because prop blades have their own resonant frequency, independent of the frame. Hold a prop hard on a table-top and 'pluck' the blade, and you will hear it. Stiffer props make a higher pitched sound, the frequency you hear is approximately the resonant frequency of the prop. You can also pluck the arms of the quad in the same way to hear their natural resonant frequency.

If the prop resonant frequency and the frame resonant frequency happen to be very similar, then you can get sudden severe resonance problems.

A good way to determine if this is happening is to hand hold the quad and run the motors with props on in the motors tab. Take care. You can then feel (and hear and see if the accelerometer is on) how each motor individually shakes the frame, and if there is some point where the whole thing shakes much more than any other, that’s the resonant point of the system. By testing individual motors you can tell which motor or motors are providing the greatest input stimulus (i.e. has the biggest problem. You can also test with all motors on at once, which tells you the overall smoothness of the whole frame. Note that in the motors tab the PID loop will not amplify anything; what you feel there is purely mechanical without PID amplification.

The whole idea of notch filtering is to precisely match the center of the notch filter exactly to a specific resonant point, and make it only wide enough to cover the width of the resonant peak.

To do this we have to precisely know what the resonant points are, so we need a blackbox, and to look at the various traces carefully. As I explained before, a resonant peak on P needs a gyro notch, then re-log and check if D is still a problem.

Usually D is the main resonance amplifier. Without blackbox or notches, it is simpler to just put a steeper low pass on D i.e. biquad at a low frequency (70) rather than worrying about D notches. Also, If gyro is filtered properly with suitable gyro notches, you won’t need a D notch since nothing is coming into D at the resonant point.

Unfortunately there is no way to predict the resonant points for your frame, since they differ from prop to prop and frame to frame. The only way is to blackbox it and individualize the filters.

In the case we are discussing, the only notch filter that was in use was a D filter, and it was achieving nothing because there was no resonant point at its center frequency.

Notch filters have to be tuned specifically prop by prop and frame by frame.

Note that the notch filters do not stop the shaking or the resonance. What they do is stop the PID loop from positively feeding back and amplifying that resonance. The result is less overall shaking. When done properly, the quad itself will shake just as much as it did when driven from the motors tab, but not more.

Then if you have a minor prop imbalance, the frame will still shake and resonate, maybe badly, but you should be able to keep flying and your motors won't get hot or sound bad. It would still be good to fix the bearings or replace the bent prop, but at least you can keep flying in the meantime.

That’s the whole idea behind notch filtering; blackbox logs are the only way to do them properly, the defaults most likely are wrong, and it absolutely must be individualized per prop and per frame.

PS - also there are certain points in BLHeli where the motors are not controlled as smoothly as other points. If you spool motors slowly up without props in the motors tab you will hear them - it just sounds gritty. You can feel it (and see it if the accelerometer is enabled). Sometimes these points provide another trigger for resonance. If the rotational speed of the motors at these points coincides with other resonances you then get issues at those throttle points that aren't apparent elsewhere.

#### continued experiments and discussion from ctzsnooze:

Spent half the day messing with filters and logging stuff. Bluejay F4 board, O ring mounted with beveled overdrilled holes (not a super soft mount, but not hard either), Tornado T2's.

I'd previously optimised P and D, was trying a 'from the very basics' test of a range of filter strategies.

I tried arming with only PT1 both at 130 on Gyro and D, and with no notches at all. Terrible grinding noise at idle! Log shows massive but really tightly defined sine wave peak at 180Hz. Looking at the props I can see them flexing like crazy, with so much energy that the frame flex makes the prop nuts are a little blurry. At slightly lower lowpass settings, but still with no notches at all, I can throttle up past this and the motors run smoothly...

So I was sitting there, wondering what to try next, flicking the ends of the props (stiff 50403's), and I noticed that they have a musical 'note'. A fundamental frequency. I wondered what frequency that was? Recorded the plucked prop sound, checked its frequency - guess what, nearly exactly 180Hz. Hmm!

Got some cyclones, which I use sometimes, they 'pluck' at 300Hz (stiffer).

So I stuck a gyro filter with midpoint 180 and low point at 140 and _bingo_ no more shaking - able to bring the lowpass values up quite high now. So I made another profile for cyclones with the notch centered around 300. Same outcome!

I also noticed that with PT1 on both gyro and D, the proportion of noise on D compared to P becomes progressively greater as frequency increases. To keep the two in a constant relationship, a biquad on D works much better. Once the amplitudes of P and D sort of are the same, we only need to put notches in the right place on gyro, and none are needed on D.

So I ended up with PT1 on gyro, biquad on D, and just a single gyro notch to suit the exact prop resonance point, nothing else. Flew great!

I set both lowpass points at the same frequency, and tested higher and lower. Too high (with high PIDs), and the shakes would reappear either side of the gyro notch! Clearly there was some upper value where there was so little filtering that even good props would feedback and shake, and there also was a lower bound were bad props were happily tolerated.

Since I often re-use not so great props, and 'fly home' with bent ones often enough, I went for lower filters. I ended up with both lowpass filters cutting from 80, PT1 on gyro and biquad on Dterm, a single gyro notch at 140/180 (for light but stiff 50403's), P around 40-50 and D around 25. I'd recommend this as a basic starting 'recipe' from which one could lift the lowpass values later.

At least one notch needs to match the prop resonance, so go pluck your prop! :-)

Quick description by ctzsnooze of measuring Prop Resonance:
Get a representative prop, hold the hub hard onto a firm table, with one blade poking out over the edge. Try to dull the other blades so they don't rattle.
Plucking the blade itself takes some practice to get a good sound, a clean flick up from below should make a smooth clean tone.
There are quite a few Audio FFT apps that record a short sample and present a 3D FFT with the noise peak highlighted; ideally one where you can scroll back looking for the peak. Usually quite easy to identify, there will be one big sine wave peak that fades out like a guitar string being plucked.
iAnalyzer Lite on iOS for example.
The predominant sine-wave like frequency is the fundamental resonant frequency of the prop, and works really well as the main notch filter value. Completely stops grinding on idle on all my quads that had it, first time.

#### [Video- How to Quickly Find Natural Resonant Frequency of a Propeller. Uses the app: FFT spectrum analyzer ](https://www.youtube.com/watch?v=xFcfES2qAB8)

#### More from ctzsnooze:

True motor noise (bearings, out of balance bells, loose bolts, out of balance props, etc) is typically a sort of random junk broadly spread over a range of frequencies from low to high, occasionally with some small peaks, but basically a smooth spread. The actual frequency of this noise at any point in time correlates with motor rpm. A single out of balance bell or prop will induce sine wave shaking of the frame and the frequency will increase as rpm increases. Obviously all motors make some shaking and noise, and the frequency obviously changes during the flight. The key thing is that noise from bearings or out of balance props / motor bells will be rpm dependent and will vary in frequency. Low pass filters deal very well with noise over a broad spread of frequencies going from low to high. A notch only takes out a tiny piece of it, leaving the rest untouched. If out of balance motor noise coincides with the natural resonant frequency of a prop, arm or other frame component, it will become greatly exaggerated...

Resonance is a definite 'noise' peak at a specific frequency. It really isn't random noise at all, it's a sine wave type pattern in the black box traces, and a definite tall peak in the spectrum. Generally it is at prop resonance frequency, or less commonly at the natural resonant frequency of (say) a loose or flexy arm or excessively soft motor mount. The resonant frequency does not change much with motor rpm, but may be triggered at specific rpm. The more aggressive your PIDs, the faster responding the ESCs and motors, the flexier the frame and the motor mounts, the bigger and stronger this resonance will be.

Resonant peaks are best dealt with using a notch filter at the exact resonant point. When prop resonance is triggered, the frequency is relatively focused around the natural resonant frequency of the props. This can happen at idle, or at certain rpm points, or just be there all the time randomly. The props can resonate at nearby frequencies too, just not as well as the dead center of their resonant point, so the peak can be wide or narrow.

If there is a dominant peak, the auto setting filters being developed for 3.2 may be able to find that automatically.

In the meantime, for people without blackbox, a single gyro notch set at your prop resonant point (with the low point about 25% lower) is a very good starting point for a single notch / PT1 setup.

If you are experimenting with PT1 only low pass and minimal notch setups, this is what I would do:

Set both gyro and D to PT1 at about 100, disable all notch filters except just one. Measure your prop resonance, and set that single gyro notch at the prop resonance point, low side 25% below center point, and check that the quad flies OK.

If the motors are too hot, my next step, rather than adding notches, would be to shift to biquad on D, since in nearly every log I've seen with broad motor noise, heat is mostly generated by D amplification at higher frequencies, and a biquad on D is the most effective method for dealing with this problem.

That's my starting point, anyway.

#### Posted by ctzsnooze

There are a number of formulas that calculate phase shift vs frequency for various filters, including notches.

For lowpass filters, the delay in ms is intrinsically linked to the cutoff frequency and is more commonly expressed in terms of phase shift.

For our PT1 (one pole) type lowpass filters, phase shift is 45 degrees or 1/8th of the wavelength at cutoff frequency. If we set the cutoff frequency to 125Hz, where the wavelength is 8ms, our delay will be 1ms; if we set a PT1 to 62.5Hz, delay will be 2ms.

For biquads we just double the delay, ie 2ms at 125Hz and 4ms at 62.5Hz.

For notch filters, the delay is more complex, and is especially troublesome if set wide and low. I think that our notch filters cause phase shift of 45 degrees at their -3dB low point and 90 degrees at center. Because the center is not always twice the low point, there is no simple numerical 'delay' equivalent. However, if we have the low point of a notch at 125hz and center at 250, the implied delay for both points is 1ms. But if the center point is closer to the low point, the delay is no longer a simple time but is frequency dependent. Notch filters carry their phase shift / delay effect lower and deeper than simple low pass filters.

Note that in both cases, the higher the filter frequencies can go, the less delay we get. And that each filter adds its own delay, in series; they add up.

We can very easily accumulate 7-8ms delay from strong filtering (especially on D). That delay is simply massive when compared to gyro update and PID recalculation rates happening more than 50 times faster, ie every 0.125ms at 8k/8k. It's why a machine with lots of filtering has problems with propwash, and in terms of propwash actually won't handle any better than 2k2k. For D to work properly, the phase relationship between P and D must be preserved. When we filter D with a biquad + notch we offset D significantly and wreck those phase relationships.

Softmounting the FC will make it harder for noise to be transmitted via the bolts to the gyro chip, hopefully so that less software filtering is required. For this to work, a mechanical equivalent of whatever electronic filtering you took away is needed, and that's difficult to achieve in a controllable fashion. In any case, if the FC mounting was soft enough to cut high frequencies as effectively as our low pass filters, it will inevitably incur delays of comparable magnitude.

Soft mounting motors if done effectively can result in reduced noise transmission into the frame without significantly negatively impacting the time taken for the motor to generate thrust. In principle this is very appealing. However if too soft the motor can process and wobble in the mounts, causing larger scale low frequency shaking than would otherwise happen. This limits how soft they can be. And the entire bolt needs to be isolated from the frame to be effective.

If most of the noise can pushed upwards into a range well above the frequencies we care about, the filtering we apply can be less intensive, causing less delay.

Super stiff frames, effective motor soft mounts, stiff props, high rpm setups, tight bearings, no shaft travel, perfectly balanced props, exactly equal thrust per blade, and perfect ESCs all play a part in shifting the noise spectrum higher and higher and reducing the amount of noise to be filtered.

For my race quads I've largely given up on getting rid of propwash. I filter heavily so I can fly with beat up props and smashed up motors and light-weight arms that have a bit of flex, that gives me heaps of propwash. But if I wanted a super smooth freestyle quad, or spent more money on new props and motors all the time, I'd set up a stiff quad as above and would get a very different propwash experience.

### Filter Delays

Post by ctzsnooze
All filters add delay. Doubling slope on an IIR LPF doubles delay since the same 1st order filter is simply applied twice. None currently are FIR. FIR were evaluated and not as good as simple IIR. Dterm is IIR, gyro cut was biquad (i think it still is). There is a recent post about the notch filter that linked to the GitHub page where the Notch was discussed before implementation. Diagrams there show delay for different filter combinations. Lots of thought has gone into current filter design.

Posted by ctzsnooze:
Switching from biquad to PT1 , while leaving frequency the same, say at 100Hz, will do the following:
Twice as much noise at 200hz
Four times as much noise at 400hz
Almost no change in phase delay at 10hz
About 15 degrees _less_ phase delay at 50hz
45 degrees _less_ phase delay at 100hz

The improvement in phase delay at 100hz can be thought of as about 1.5ms less absolute delay.

#### Post by r.a.v. showing Filter delays:

Here's an overview of the delay between 90Hz and 170Hz:
biquad: 2.75ms vs 2.5ms at 100Hz
pt1: 0.88ms vs 0.8ms
![BiQuad Delay verse Cut-off frequency](https://static.rcgroups.net/forums/attachments/6/5/0/4/8/6/a9950155-145-phasedelayBiquad90-170.png)

![PT1 Delay verse Cut-off frequency](https://static.rcgroups.net/forums/attachments/6/5/0/4/8/6/a9950156-96-phasedelayPT190-170.png)

I'll just throw in some notch delays for notches with cutoff 80Hz below each center.
As you can see the delay is very low but the strong filtering allows higher cutoff for lpf filters.
So total delay of notch + high cutoff lpf is lower than lpf alone with low cutoff while the noise is still reduced significantly.

![Notch Delay verse Cut-off frequency](https://static.rcgroups.net/forums/attachments/6/5/0/4/8/6/a9950217-164-notch220Hz-300Hz-80cut.png)

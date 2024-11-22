# Yaw Spin Recovery and Gyro Overflow Detect

## Yaw Spin Recovery Notes

This new feature, enabled by default in betaflight 3.4, reduces the severity and duration of un-commanded severe yaw spins.

For example, if a quadcopter clips a gate, tree, branch or other object and causes a high rate yaw spin, it may go into a 'never-ending' uncontrollable spin. Typically it makes a distinctive warbling noise and climbs rapidly - the so-called Yaw Spin To The Moon (YSTTM) problem. 3.4 introduces two code features that should bring such spins under control more quickly and cleanly.

Yaw Spin Recovery is intended primarily for FPV pilots, and works best with MPU gyros.

LOS acro pilots who use high yaw rates may prefer to disable this function.

### Usage

yaw_spin_recovery can be enabled or disabled in the CLI:

`set yaw_spin_recovery = ON` or `set yaw_spin_recovery = OFF`

The 'threshold' value is the spin rate, in degrees per second, at which the spin protection kicks in. The default threshold of 1950 was chosen to minimise false triggering. For FPV, a lower value, e.g. 100-200 above your maximum configured yaw rate, is recommended. For example, a quad with a maximum configured yaw rate of 700 degrees/sec:

`set yaw_spin_threshold = 850`

Too low a threshold may cause false triggering, and delay return to normal control.

### How does it work?

Once triggered, yaw*spin_recovery assigns full motor authority to the correction of the spin, and stops all unrelated PID and throttle activity. One pair of motors goes full on, the others go to minimum rpm. Once the yaw spin rate falls \_below* threshold by 100 degrees per second, and stays below threshold for 20ms, full control is returned to the pilot.

Without this feature active, it is possible for any quad to get indefinite spins when the spin rate confuses the gyro. See "What is the underlying cause" below...

### Should I lower the threshold?

A threshold of 1000 will reduce the total time spent in a typical out of control yaw spin by about half, compared to a threshold of 1950.

For quads configured with a maximum yaw rate of about 800 degrees/sec, a threshold of 1000 works well, and should result in a return to normal control in about a quarter of a second after clipping a gate.

False triggering will occur if the quad's yaw rate exceeds the threshold during normal flying. It is very unusual for FPV pilots to exceed 500 degrees/sec in normal racing, even during very quick turns. Exceeding 500 degrees/sec usually only happens if the pilot performs 'tricks' involving sustained commanded yaw spins.

Personally, I run 850 and find that works very well for me. My maximum yaw rate is configured to 800 but even if I do a deliberate full yaw spin, I don't see anything suggesting that I hit the limit.

### What happens if the threshold is too low?

If the maximum yaw rate is configured to be greater than the threshold, a sustained yaw spin will cause the quad to 'stutter' in yaw. The motors will push past threshold, then the PIDs will be disabled and the quad's spin will be slowed down, then the motors will push past threshold, again and again. The solution is to reduce the maximum commanded yaw rate, or set the threshold higher.

### What should I do if I clip a gate and spin?

No specific actions are required by the pilot. The safest thing to do is to cut throttle, center sticks, and mentally prepare for either re-gaining control, or disarming.

When yaw spin protection is triggered, the quad gets driven with 50% effective throttle. It will accelerate briefly, perpendicular to the spin axis, but control should be returned to the pilot quickly, and should not climb much. There is no need to increase throttle manually.

Control will be returned to the pilot 20ms after the spin rate falls 100 degrees/sec below threshold. Although the quad will still be spinning, the PIDs will become fully active, and will quickly stabilise the quad. By the time the pilot can see which way the quad is pointing, it should be easy to control.

If the spin is prolonged, for example more than half a second, there may be a gyro overflow, a badly bent prop or some other hardware problem, and the pilot should disarm.

### I have an ICM gyro, will this work with gyro_overflow_detect active?

Gyro_overflow_detect is special code intended to deal with overflow issues on ICM gyros. The default is to be on, for all axes. It is unwise to disable this if your quad has an ICM gyro. It is not needed or helpful for MPU gyros.

ICM gyros are susceptible to overflow-inversion problems if exposed to very high turn rates. If enabled and set to ALL, overflow protection will kick in and disable all PIDs whenever any axis exceeds 1950 degrees/second. Because the FC then won't know the actual direction of the spin, it slows down all motors to their minimum / idle throttle value, until all axes fall below 1850 degrees per second. This can take a long time, since the quad does not actively oppose the spin. 1850 degrees/second is still a very fast spin. If yaw spin recovery is active at a lower threshold (say 800), recovery to below 800 will be faster and cleaner than otherwise.

So the answer is yes, yaw_spin_recovery is useful for ICM gyros even if Gyro_overflow_detect is enabled.

### Why can't the quad re-orient itself to the original heading and attitude?

That would require valid accelerometer and mag sensor data, which could be inaccurate immediately after a crash. In any case, any such recovery would take some time, may interfere with more accurate pilot inputs, might glitch at the point of transfer back to acro mode and may fly away the wrong way.

### What would happen if I set the threshold too low?

Yaw will jitter around whenever commanded yaw rate is held long enough for the quad to hit the yaw spin protection threshold, and normal pitch and roll control would get a bit messed up.

In normal FPV flying and racing, actual yaw rates more than 500 degrees/sec are unusual even in the fastest turns. However, some FPV freestyle pilots like to do fast yaw spins, and may set a maximum yaw spin rate (in the rates part of the configurator) as high as 1000, and actually achieve that sometimes.

If, say, the quad was configured for yaw rates of 1000 degrees/second and the yaw spin protection threshold was set at 800, and if the pilot then did a flat yaw spin by holding yaw at 100% with pitch and roll centered... the quad would rotate faster and faster, using one pair of motors to generate the yaw. When the quad hit the yaw spin protection point of 800, the _opposite_ pair of motors would spin maximally, quickly slowing the yaw rate down to 700 degrees/second. This would probably take only 100ms. The quad might climb momentarily and wobble a bit, and for this short time there would be zero pitch and roll authority. This would quickly terminate, and if the higher yaw spin rate was still being commanded, the quad would again speed up to 800 degrees per second. An FPV pilot would see the yaw rate jittering between 700 and 800, there may be some pitch and roll artefacts, and the quad would make a strange noise.

If this happens just turn the threshold up a bit.

### What does it look like in a blackbox log?

Here is a real log of clipping the ground during an arcing turn with an MPU gyro. It's only a small impact. Peak yaw rate of about -1800 degrees/sec is attained within 2ms, exceeding the threshold of 800 and initiating yaw_spin_protection. At that point, two motors get 100% drive and the opposing pair 0% drive, resulting in maximum authority to slow the spin. During this time the roll and yaw components passively rotate the quad (it does a kind of axle roll around one arm at the same time). After about 120ms yaw rate drops below 700, then there is a 20ms delay period, and about 140ms after impact, normal PID control is returned to the pilot. The quad still is rolling in excess of 2000 degrees per second but now that the quad is not spinning, the PID system corrects this within about another 140ms. The quad becomes flyable again about ¼ second after impact. Note that if the threshold was set at default value of 1950, the yaw_spin_protection code would not be activated with this impact.

![betaflight yaw spin protection small spin example blackbox log image](https://user-images.githubusercontent.com/11737748/39326254-b72d6d02-49d7-11e8-95e2-62a01f78e6c6.jpg)

This is a log of a much more significant impact. The peak yaw spin rate probably exceeded 8000 degrees per second, judging by rate of return to normal, and involved bent props. The total time in full yaw_spin_recovery mode (one pair of motors full on) is about 600ms. This is the longest spin yet recorded with yaw spin protection. The vast majority resolve in under 400ms. Note that there is also significant pitch and roll wobble from the impact, as well as yaw spin. The instant of impact there is more than 2000 degrees/sec in pitch and, soon after, more than 2000 deg/sec in roll. If this was an ICM gyro, all PIDs would have been zeroed and there would be no active suppression of these spins - it would most likely take more than 3-4 seconds to passively slow down enough for control to be returned to the pilot, if this was an ICM gyro. This was an MPU6000 gyro, so yaw_spin_protection could actively stop the spin with full motor authority regardless of the magnitude of the spin. During the yaw spin correction period, all pitch and roll wobbles died out without any active PID involvement. By the time the spin had resolved, there was no meaningful pitch and roll problem. Most likely the reasonably rapid passive attenuation of pitch and roll wobble is because of the gyroscopic stabilisation effect of having two motors running full on in opposite directions, and the substantial air resistance in the pitch and roll axis of a quad that is actively suppressing a yaw spin.

![betaflight yaw spin protection massive yaw spin example blackbox log image](https://user-images.githubusercontent.com/11737748/39326261-be444840-49d7-11e8-887f-a1b86e988311.jpg)

With yaw_spin_protection, this massive spin stopped relatively quickly.

### What is the underlying cause of these indefinite yaw spins - how does this code work?

A spin of this magnitude rotates the frame so fast that motors swap position (move 180 degrees opposite to their previous position) in 40ms or less. This is as fast as a motor can speed up or slow down. The normal PID responses to pitch and roll wobbles will not actually make any difference to motor speed until it has rotated to the opposite location from where it should have been. This means that pitch and roll PID responses in a rapidly rotating spin will feed back positively on themselves, maintaining or worsening the pitch and roll wobbles as long as the quad keeps spinning. Additionally, because the PID system is switching motors on and off randomly to deal with the massive swings in gyro values on pitch and roll, it does not put full authority into suppressing the spin. As a result the spin persists for a very long time. It is possible that at some point the motor speed changes may feed back positively into the spin. This bizarre combination of factors is what causes yaw spin to the moon events on MPU gyros. The key factor is having an extremely high yaw spin component. Very high rate pure pitch spins do not have this problem, nor do high rate axle rolls involving high rates of pitch and roll at the same time. But when pitch and roll is combined with high spin rates, logs show the gyros and PIDs going all over the place on all axes in a chaotic manner. By focusing the quad on actively suppressing the yaw spin component, these kinds of long duration flyways are prevented. That's what this code does.

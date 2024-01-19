3.1.7 : this target should be back to normal with DSHOT support on motors 1-4.

Originally Posted by jdrotor:
Ok, I figured out the issue today and wasn't sure who to share what I found. The default Resource Mapping for the Singularity FC in BF3.0.1 changed in BF3.1.+. I'm not sure if the board I was working on is an "old" version.

In any case, I remapped the Motor resources back to the mapping in 3.0.1 and the motors arm , etc..

You should check your mappings to be sure it the same issue; if it is the CLI commands below is what I entered into FC:

`Resource PWM 2 None`
`Resource PWM 3 None`
`Resource PWM 4 None`
`Resource PWM 5 None`
`Resource Motor 1 B04`
`Resource Motor 2 B05`
`Resource Motor 3 B00`
`Resource Motor 4 B01`
`Resource Motor 5 B08`
`Resource PWM 2 A11`
`Resource PWM 3 A12`
`Resource PWM 4 A13`
`Resource PWM 5 A14`

I wasn't sure if the PWM's needed to be remapped but I had to free them to remap the Motors 1-4. Hope that helps.

Posted by mixblast:
I can also confirm that this fixed motors not spinning on 3.1.6 on my Singularity. Apparently it will be fixed in the next betaflight revision https://github.com/betaflight/betaflight/pull/2530

I have also submitted a pull request which lets us use DShot on this target (not for motors 5-6 though). So hopefully that will also be included in 3.2.0 https://github.com/betaflight/betaflight/pull/2657

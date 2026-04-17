# Flight Controller Orientation

There are many videos available on the internet explaining how to align a flight controller (FC) to a model aircraft frame, e.g. [Flight Controller Orientation Settings in BetaFlight from Cyclone FPV](https://youtu.be/W-a7qCkV8SE).

Usually, the gyro orientation on the FC is ink-marked by an arrow pointing forward.

In rare cases or due to space limitations, the flight controller needs to be positioned on the frame in awkward alignment, i.e. pivoted around multiple axes, NOT lining up with the main axes of the frame anymore.

The FC firmware NEEDS to know how the FC axes are oriented with respect to the frame axes, otherwise the PID controller will misinterpret flight attitude and corrective actions — this will lead to unstable behavior and flyaways. To keep all controls working as usual, you need to set the matching angle values in the Betaflight App Configuration tab. These angles tell the FC how to rotate the frame around multiple axes to fall in line with the alignment of the FC.

## Rotation Convention

The alignment uses a sequence of so-called Euler angles (axes of rotation in space, perpendicular to each other): yaw-pitch-roll, also known as 3-2-1 Euler angles.

The internal rotation convention Betaflight uses to represent the FC orientation is R = Rz(-Yaw) _ Ry(-Pitch) _ Rx(-Roll). The rotation matrix R describes both how the FC is rotated with respect to the origin of the quad, and the transformation of sensor readings as they were measured with a flight controller aligned with the quad's frame (arrow pointing forward / x axis).

For the alignment process it is easier to think in the inverse transform R^T = Rx^T(-Roll) _ Ry^T(-Pitch) _ Rz^T(-Yaw): yaw first around the z axis, then pitch the yawed frame around its new y axis, and finally roll the yawed and pitched frame around its new x axis. Due to the minus sign, positive angle direction follows the left-hand rule — e.g. to yaw positive, grab the z axis with your left hand and rotate towards the direction of your fingers.

You can use the following interactive tool to figure out your board alignment angles: https://www.geogebra.org/3d/sj5aeucn

## Determining the Alignment Angles

Think of a frame mounted to your quad and a frame mounted to your FC. The question to answer is: how to rotate the quad's frame (x pointing forward, y left, z upwards) so that it aligns with the flight controller frame (x pointing forward on the FC — mind the arrow — y to the left, z upwards).

1. Yaw the quad frame around its z axis
2. Pitch the already yawed frame around its new y axis
3. Roll the already yawed and pitched frame around its new x axis

## Testing Before Mounting

To verify your alignment before mounting the FC to the frame, hold the FC pointing towards your monitor and open the Setup page in the Betaflight App:

1. Yaw the FC, hit **Reset Z axis**, check the quad visualisation — if correct, proceed
2. Pitch the yawed FC, hit **Reset Z axis**, check — if correct, proceed
3. Roll the yawed and pitched FC, hit **Reset Z axis**, check — if correct, proceed
4. Double check!

After determining the 3 correction angles needed to rotate the quad frame into the FC frame, enter the yaw, pitch and roll values into the respective fields in the Betaflight App.

# Flight Controller Orientation

Usually, the gyro orientation on the FC is ink-marked by an arrow pointing forward.

In rare cases or due to space limitations, the flight controller needs to be positioned on the frame in awkward alignment, i.e. pivoted around multiple axes, NOT lining up with the main axes of the frame anymore.

The FC firmware NEEDS to know how the FC axes are oriented with respect to the frame axes, otherwise the PID controller will misinterpret flight attitude and corrective actions, this will lead to unstable behavior and flyaways. To keep all controls working as usual, you need to set the matching angle values in the Betaflight App Configuration tab. These angles will tell the FC how to rotate the frame around multiple axes to fall in line with the alignment of the FC.

It is important to note that there is a sequence of so-called Euler angles (axes of rotation in space, perpendicular to each other) for board/gyro alignment: yaw-pitch-roll or 3-2-1 Euler angles.

The internal rotation convention bf uses to represent the FC orientation is R = Rz(-Yaw) _ Ry(-Pitch) _ Rx(-Roll). On one hand the rotation matrix R describes how the FC with respect to the origin of the quad is rotated. On the other hand R describes the transformation of sensor readings of the FC as they were measured with a flight controller aligned with the quads frame (arrow pointing forward / x axis).

For the alignment process its easier to think in the inverse transform R^T = Rx^T(-Roll) _ Ry^T(-Pitch) _ Rz^T(-Yaw). So we yaw first around the z axis, then pitch the yawed frame around its new y axis and finally roll the yawed and pitched frame around its new x axis. Due to the minus sign positive angle direction is described by the left hand rule, e.g. to yaw positive you grab the z axis with your left hand and rotate towards the direction of your fingers.

You can use the following link to figure out your board alignment angles: https://www.geogebra.org/3d/sj5aeucn

For the alignment process think of a frame mounted to your quad and a frame mounted to your FC. The question that then needs to be answered is how to rotate the quads frame (x pointing forward, y left, z upwards) so that the quads frame is aligned to the flight controller frame (x pointing forward on your flight controller (mind the arrow), y to the left, z upwards).

1. Yaw the quad frame around its z axis
2. Pitch the already yawed frame around its new y axis
3. Roll the already yawed and pitched frame around its new x axis

To test your alignment process before you mount it to your frame use the FC only pointing towards your monitor and the Setup page of the Betaflight App and simply start with:

1. Yaw the FC, hit Reset Z axis, check the visualisation of the quad, if ok proceed
2. Pitch the yawed FC, reset Z axis, check, if ok proceed
3. Roll the yawed and pitched FC, reset Z axis, check, if ok proceed
4. Double check!

After determining these 3 correction angles needed to rotate the quad frame into the FC frame, the values for yaw, pitch and roll can be entered into the respective fields in the Betaflight App.

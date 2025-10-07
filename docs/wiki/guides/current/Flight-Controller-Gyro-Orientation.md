# Flight Controller Gyro Orientation

There are tons of videos available on the internet how to align a flight controller (FC) to a model aircraft frame, e.g. [Flight Controller Orientation Settings in BetaFlight from Cyclone FPV](https://youtu.be/W-a7qCkV8SE)

Usually, the gyro orientation on the FC is ink-marked by an arrow pointing forward.

In rare cases or due to space limitations, the flight controller needs to be positioned on the frame in awkward alignment, i.e. pivoted around multiple axes, NOT lining up with the main axes of the frame anymore.

The FC firmware NEEDS to know how the FC axes are oriented with respect to the frame axes, otherwise the PID controller will misinterpret flight attitude and corrective actions. To keep all controls working as usual, you need to set "Gyro Offset" values in the Betaflight App. These offsets will tell the FC how to rotate the frame around multiple axes to fall in line with the alignment of the FC.

It is important to note that there is a sequence of so-called Euler angles (axes of rotation in space, perpendicular to each other) for board/gyro alignment: yaw-pitch-roll

Assuming that the board alignment is in the usual yaw roll pitch euler angles parametrization (R = RzRyRx) you actually have to think in the inverse transform R' = (Rz*Ry*Rx)' = Rx'*Ry'*Rz' to obtain the Gyro Offset angles to enter into the Betaflight App.

Here we have to think how to rotate the frame so that the frame is oriented like the flight controller in the following order:

- rotate the frame around z-axis (yaw)
- rotate the already yawed frame around y-axis (pitch)
- rotate the already yawed and pitched frame around x-axis (roll)

After determining these 3 correction angles needed to rotate the frame into the FC alignment, the values for yaw, pitch and roll can be entered into the respective fields for Gyro Offset in the Betaflight App.

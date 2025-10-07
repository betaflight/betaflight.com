# Multicopter Spazzing Out?

**Since I've run into this issue so often on various facebook threads and /r/multicopter posts, I decided it would be worthwhile to compile a (written) checklist for to diagnose your quad**

**This is prior to Anti-taz (Runaway takeoff prevention) being implemented**

When you attempt to arm your multirotor, does it?....

- Spin around
- Flip itself around
- Attack you and your family
- Behave in an unexpected manner

Then this guide might be for you.

---

# 4 main items to check:

## Flight Controller Orientation.

1. **Remove your props!**
2. Plug your multirotor into your computer
3. Navigate to the Betaflight App
4. In the _Setup_ tab, you should see a 3D model of a quadcopter
5. Move your model around in your hand, verifying that each movement correctly corresponds to whats shown on the screen (with the arrow aligning with what is supposed to be the front of your quad)
6. If this is **NOT** correct:
   - Navigate to the _Configuration_ tab
   - Depending on which way the board was misaligned, offset the angle under "Board and Sensor Alignment"
   - Normally this means, "Yaw Degrees" gets set to "-90" or "90", or whatever angle your board is offset by
   - Save and reboot, verify direction in _Setup_ and repeat as needed

**Notes:**

- Board alignment should be indicated by an silkscreen arrow, but always use BF for reference.
- There is no need to plug in the battery for this check, and if you do, make sure to remove props

## Prop Direction.

1. According to the motor direction reference image at the bottom, look at each individual prop
2. If you spin the appropriate motor in the correct direction, the higher (leading edge) of the prop should be forwards in the direction of travel.
3. Opposing motor corners in a quad must have the same direction propeller.
4. If this is **NOT** correct:
   - Change the props to be appropriate, verify once again before powering.

**Notes:**

- NEVER ATTEMPT TO CHECK PROP DIRECTION WHILE PLUGGED IN
- In normal configuration, this means the front two motors should spin inside towards the front and vice versa
- Once again, running reversed props, everything should spin in the opposite direction (Towards the sides)

---

##### YOU MUST REMOVE PROPELLERS BEFORE FOLLOWING ANY OF THE INSTRUCTIONS BELOW!

## Motor Direction.

1. **Remove your props!**
1. Plug your multirotor into your computer
1. Navigate to the Betaflight App
1. Plug in your LiPo (PROPS OFF)
1. Navigate to the _Motors_ tab
1. Click the checkbox verifying that you've taken off your props
1. Slowly raise the master slider until all 4 motors are just barely spinning smoothly
1. Take your finger and make sure that they follow the direction indicated by the reference image at the bottom
1. If this is **NOT** correct:
   - Make note of the corresponding motor numbers that are spinning the wrong way
   - _Option 1_:
     - Disconnect from betaflight and open the BLHeli configurator (Must have supported ESCs)
     - Click "Read Setup"
     - For "Motor Direction" select "Reversed" for the motor numbers that need it
     - Click "Write Setup"
   - _Option 2_:
     - Reverse any 2 of the 3 motor wires on your ESC by resoldering them

**Notes:**

- If you are running reversed props, everything should spin in the opposite direction and you must have turned it on in the configuration tab)

## Motor Order.

1. **Remove your props**
2. Plug your multirotor into your computer
3. Navigate to the Betaflight App
4. Plug in your LiPo (PROPS OFF)
5. Navigate to the _Motors_ tab
6. Click the checkbox verifying that you've taken off your props
7. Raise each slider one by one
8. The number on the slider should be the same as the motor that it is spinning, according to the reference image below (or the image in the configurator)
9. If this is **NOT** correct
   - Grab a piece of paper and make a chart for any that differ
   - || Slider that's being moved ||VS|| The motor number that actually spins ||
   - Open CLI
     - Type `resource`
     - Scroll up find the list that looks like `resource MOTOR 1 ___`
     - type `resource MOTOR "The motor number that actually spins" "the letter-number combo next to the original slider #"`
     - For example, if I moved slider 1 and motor 2 spun up, then when I typed resource, I saw:
     - `resource MOTOR 1 A03`
     - `resource MOTOR 2 B00`
     - I'd type `resource MOTOR 2 A03` and hit enter
     - Continue this until all motors are remaped, than type `save` to save the configuration

**Notes:**

- https://www.youtube.com/watch?v=z5aO-3_n-Hs

_Reference Image (this is the Betaflight default):_

![Motor Direction](/img/betaflight/quad_x.svg)

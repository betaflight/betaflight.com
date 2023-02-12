# Running with reversed motors

### Spinning outwards at the front and back

This page is primarily for myself since I always forget which command it is.

Reversed motors would be spinning outwards (contrary to the standard inwards), that is the front left spins counterclockwise, front right clockwise:

      ^    ^
     4|    |2
       \   /
         x
    ^  /   \ ^
    |3      1|

To make betaflight understand this change, the command given is (as of betaflight 3.2):

    set YAW_MOTORS_REVERSED=ON

For older betaflight:

    set YAW_MOTOR_DIRECTION=-1

Note - setting these values _will not make the motors spin the other direction_. It simply tells betaflight that the motors are reversed so it can control the yaw accordingly. Motor direction has to either be changed in blheli or by swapping motor wires.

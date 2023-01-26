## Flashing Cleanflight/BetaFlight to CC3D with Mainport and FTDI Video:

https://www.youtube.com/watch?v=5wjvJAMEMz0

## Beeper setup

Posted by handsomejackuk:
so i have figured out that I need to configure resources separately in betaflight 3.16 and so far on cc3d have setup my buzzer on pin 6 as confirmed working with older versions of betaflight...

`# resource`
`resource BEEPER 1 A02`
`resource MOTOR 1 B09`
`resource MOTOR 2 B08`
`resource MOTOR 3 B07`
`resource MOTOR 4 A08`
`resource MOTOR 5 B04`
`resource PPM 1 A01`
`resource PWM 2 B05`
`resource PWM 3 B00`
`resource PWM 4 B01`
`resource PWM 5 A00`
`resource PWM 6 A01`
`resource SERIAL_TX 3 B10`
`resource SERIAL_TX 11 B05`
`resource SERIAL_RX 3 B11`
`resource SERIAL_RX 11 B00`

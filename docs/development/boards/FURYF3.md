# **Overview**

The Fury F3 Flight controller has been designed from the ground up by quad pilots & builders
who want a better flight controller. We have taken into account all of the things that we like
about other flight controller hardware and wish that other flight controllers featured and
combined them into a board that is well designed for ease of installation and use.

Good soldering skills are required to use the Fury F3 Flight controller. We recommend that if
you do not have proficient soldering skills that you find someone in your area to help you with
your build. MultiGP is a good place to find like-minded quad builders. Go to MultiGP.com for
more info

**Available here: http://www.2dogrc.com/furyf3-board.html**

**RCGroups Thread: https://www.rcgroups.com/forums/showthread.php?t=2628430**

**Facebook Group: https://www.facebook.com/groups/1391468950869052/**

**Website: http://www.furyflightcontrol.com/**

# **Board Features**

- F3 processor (allows you to run high loop times and gives you 3x dedicated UART outputs
  for things such as GPS, OSDs, Telemetry, etc.)
- MPU6000 gyro- This is a favorite gyro amongst many FPV pilots at the time of writing. It’s
  low noise floor and high reliability rate makes it a top choice which is why it is on this flight
  controller.
- Large Solder Pads on edge of board
- USB connector
- Spektrum Receiver connector port (additional connector is recommended but not required
  if using Spektrum Hardware.
- 3v3 output for I2C connections
- Buzzer connection availability
- Led connection availability
- Current sensor connections av

# **Board Specifications:**

- 5V input
- Standard 36x36 Board (30.5x30.5 mounting)
- STM32F303CCT6: 32-Bit, 72MHz, 256K Processor (floating point arithmetic, lots of I/O)
- 3 hardware serial ports.
- USB VCP (can be used at the same time as the serial ports).
- 4 PWM outputs (dedicated for quads).
- Dedicated 3.3v regulator for external devices/Spektrum (up to 500mA)
- Dedicated PPM/SerialRX input header pins.
- Dedicated SPEKTRUM adapter port.
- Dedicated I2C headers.
- MPU6000 Mems Gyro/Accelerometer (the 6000 gyro is less sensitive to noise then the 9250
  or 6500. There is no need to soft mount the controller, and it is known as the “gold
  standard”
- SPI Gyro connection (this is a faster communication protocol then SP (which most other F3
  boards have)
- Optional MS561 Barometer on bottom of board for easy foam covering isolation.
- On-Board MicroSD Card Support for blackbox data logging (no fuss easy Data logging so that you can get the perfect tune.
- Voltage monitoring (built in Voltage divider)
- Current monitoring (with external current sensor)
- RSSI monitoring (if your receiver of choice has an output)
- Buzzer Connector
- LED Strip Connector
- SWD Port
- Direct mounting option for a Pololu switching regulator for up to 6S lipo operation.
- Thoughtful, easy-to-build layout
- Edge launch pins for a low profile build, also better for direct soldering.

# **Manual**

https://quadquestions.com/uploads/furyf3manual.pdf

# **Board Layout**

![](http://i.imgur.com/MJ3Oibe.jpg)

![](http://i.imgur.com/nale6a2.jpg)

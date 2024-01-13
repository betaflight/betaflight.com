# FuryF4

The FuryF4 is the next iteration in the Fury line of flight controllers. Designed around the STM32F4 MCU, it features a simple layout that makes connecting components convenient and easy to accomplish. The FuryF4 utilizes an SPI gyro (MPU-6000 or ICM-20689) for super fast communication with the MCU. Flight logging can be easily done by writing to the onboard data flash or SDCard slot.

**RCGroups Thread: https://www.rcgroups.com/forums/showthread.php?t=2628430**

# **Board Features**

- F4 processor (allows you to run high loop times and gives you 3x dedicated UART outputs
  for things such as GPS, OSDs, Telemetry, etc.)
- MPU6000 or ICM20689 gyro- The MPU-6000 is a favorite gyro amongst many FPV pilots at the time of writing. It’s
  low noise floor and high reliability rate makes it a top choice which is why it is on this flight
  controller. The ICM20689 is the new gyro designed by Invensense to replace the MPU-6000.
- Large Solder Pads on edge of board
- USB connector
- Spektrum Receiver connector port (additional connector is recommended but not required
  if using Spektrum Hardware.
- 3v3 output for I2C connections
- Buzzer connection availability
- Led connection availability
- Current sensor connections available

# **Board Specifications:**

- 5V input or On-board 5v, 2A Switching Regulator
- Standard 36x36 Board (30.5x30.5 mounting)
- STM32F4: 32-Bit, 168MHz, 1MB Processor (floating point arithmetic, lots of I/O)
- 3 hardware serial ports.
- USB VCP (can be used at the same time as the serial ports).
- 4 PWM outputs (dedicated for quads).
- 3.3v regulator output for external devices/Spektrum (up to 500mA)
- Dedicated PPM/SerialRX input header pins.
- Dedicated SPEKTRUM adapter port.
- Dedicated I2C headers.
- MPU6000 or ICM20689 Mems Gyro/Accelerometer (these gyros are less sensitive to noise then the 9250
  or 6500. There is no need to soft mount the controller, and it is known as the “gold
  standard”
- SPI Gyro connection (this is a faster communication protocol then SP
- Optional MS561 Barometer on bottom of board for easy foam covering isolation.
- On-Board MicroSD Card Support for blackbox data logging (no fuss easy Data logging so that you can get the perfect tune.
- On-Board 16MB Flash for blackbox data logging
- Voltage monitoring (built in Voltage divider)
- Current monitoring (with external current sensor)
- RSSI monitoring (if your receiver of choice has an output)
- Buzzer Connector
- LED Strip Connector
- SWD Port
- Direct mounting option for a Pololu switching regulator for up to 6S lipo operation (if no onboard 5v Regulator).
- Thoughtful, easy-to-build layout
- Edge launch pins for a low profile build, also better for direct soldering.

# **Board Layout**

![](http://i.imgur.com/oTEpDBK.jpg)

![](http://i.imgur.com/25HUK2C.jpg)

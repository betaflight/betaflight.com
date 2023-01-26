## Hardware overview

- STM32F405RGT6 ARM Cortex-M4 microcontroller.
- Invensense MPU6000 digital MEMS Gyro/Accelerometer
- Measurement Specialties MS5611 Barometer
- Honeywell HMC5883L Magnetometer
- Integrated HopeRF RFM22B 100mW 433MHz radio can be used with an OPLink modem for wireless telemetry, configuration and control... `No support in betaFlight`

### Hardware Designs and much more info

[See the OpenPilot Revolution wiki page.](https://librepilot.atlassian.net/wiki/display/LPDOC/OpenPilot+Revolution)

## FAQ & Known Issues

- No support for integrated HopeRF RFM22B 100mW 433MHz radio.

## Configuration

In the **Hardware Configuration** tab you can enable the Accelerometer, Barometer and Magnetometer under System Configuration.

### CPPM receiver

- Attach the receiver CPPM output to pin **5** of the Flex-IO header.
- Enable **RX_PPM**

### Battery voltage monitoring

Assuming you have physically connected a voltage divider (Basic voltage sensor) as per the instructions on the [LibrePilot wiki](https://librepilot.atlassian.net/wiki/display/LPDOC/Configure+a+Current-Voltage+sensor).

- Enable **VBAT**
- **Battery Voltage Scale** should be set to 55. _Note: this value will vary depending on resistor tolerances etc..._

This configuration is suitable for 3/4S

## Other Resources

Rcgroups Thread: _couldn't find a link! I'm sure there is one somewhere._

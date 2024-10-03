---
sidebar_position: 3
---

# Configuration Tab

This is where most of the main configuration of your flight controller will be done. This includes things
like setting up your PID Loop and gyro frequencies, enabling sensors not set in the ports tab, and many others

![Ports tab](/img/betaflight_configurator_configuration_tab.png)

## System Configuration

### Gyro Update Frequency

The rate at which the gyro is sampled. In most recent versions of Betaflight, it will default and lock to the frequency
that the gyro runs best at (8KHz for the MPU6000, 3.2KHz for the BMI270, etc...)

### PID Loop Frequency

The frequency at which the PID loop computations are done. This is basically all of the math that goes into actual
flight control. When using dshot300 you may see the PID loop reset to 4K if you manually attempt to set 8K, dshot300
does not send updates fast enough to make use of 8K PID loop so 4K is selected to save CPU time.

Recommended PID loop and motor output combinations, With RPM filtering enabled, are 2K/dshot150, 4K/dshot300 and
8K/dshot600. Exception is when using the BMI270 gyro in which case the rates are 3.2K/1.6K

:::info

Usually it's best to have it set to the same frequency as the gyro, or a half of it if you are using a slower MCU
and a high gyro frequency (8KHz gyro would be 4KHz PID loop on an F411)

:::

### Sensor Toggles

| Sensor        | Description                                                                                  |
| :------------ | :------------------------------------------------------------------------------------------- |
| Accelerometer | Enable or disable the accelerometer, which is used for self-stabilization features           |
| Barometer     | Enable or disable the barometer. If present, it's used for altitude measurement              |
| Magnetometer  | Enable or disable the magnetometer. If present, it's used to tell the real world orientation |

## Accelerometer Trim

Trim the accelerometer to compensate for any errors in the accelerometer readings. Only visible when the
accelerometer option is enabled

## Camera

Used to set the camera angle to be used for things like FPV angle mix mode and artificial horizon. Only visible
when the accelerometer option is enabled

## Arming

Set a maximum angle that the craft can be tilted at while arming, to prevent arming the craft when it's in an unsafe
position

:::info

Unless you specifically need a failsafe like this, setting it to 180 degrees will disable the check, and you can arm
the craft in any position, useful for flip over after crash

:::

## Board and Sensor Alignment

Allows you to virtually offset the FC and other sensors if they're mounted in a non-standard way

:::tip

If the 3d model preview is not responding correctly to real world movement, it's most likely because the board
alignment is incorrect. Use the alignment options to fix it. Go in increments of 90 degrees (45 if it's a diagonally mounted FC)
and test the preview after each change

:::

## Personalization

Allows you to set a craft and pilot name to be shown in the OSD, blackbox logs and diff/dump outputs

## DShot Beacon Configuration

Running a high frequency signal on the motor output to make the motors resonate and make a sound. A good alternative
for an actual buzzer, but it cannot be activated in flight (as the motors are spinning), isn't as loud, and can't be
used for a long time as the motors may draw excessive current and overheat

| Setting     | Description                                             |
| :---------- | :------------------------------------------------------ |
| Beacon Tone | You can pick from 5 different tones                     |
| RX_LOST     | Enable or disable the tone when the RX signal is lost   |
| RX_SET      | Enable or disable the tone when the `BEEPER` mode is on |

## Other features

A list of various different features that can be enabled or disabled, and may or may not be present on your flight
controller

| Setting            | Description                                                                                                                                                                                                                    |
| :----------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AIRMODE            | Permanently enable airmode, which will give the craft more control authority in the air when at 0 throttle                                                                                                                     |
| CHANNEL_FORWARDING | Allows you to forward an aux channel to a motor/servo output                                                                                                                                                                   |
| DISPLAY            | Enables the display feature, which allows you to use a small OLED display to show various information. If enabled and no display is connected, the FC will take about 10s longer to boot. It's not recommended to use nowadays |
| GPS                | Enable GPS support, do not enable when there is no GNSS unit attached                                                                                                                                                          |
| INFLIGHT_ACC_CAL   | Allows you to calibrate the accelerometer in flight                                                                                                                                                                            |
| LED_STRIP          | Enables the LED strip feature, which allows you to control WS2812B RGB LEDs                                                                                                                                                    |
| OSD                | Enables the OSD, you can configure it in the OSD tab that will appear when you enable this                                                                                                                                     |
| SERVO_TILT         | Enables the `CAMSTAB` mode, which will stabilize the camera angle by up to two servos set in a gimbal configuration                                                                                                            |
| SOFTSERIAL         | Emulates a serial port on a different output, or splits an RX-TX UART pair. Allows you to use it as an extra UART                                                                                                              |
| SONAR              | Enables sonar support, but this feature is not recommended for use nowadays                                                                                                                                                    |
| TRANSPONDER        | Enables the race transponder feature if your hardware supports it                                                                                                                                                              |

:::info

Softserial is useful for FCs that don't have enough UARTs to support all of the features you want to use. However,
there are some limitations.

- It runs at a lower baud rate. Works well at 9600, but not so well on higher rates
- Consumes more CPU resources, and puts an extra load on the CPU. So not ideal for lower performance MCUs
- It's not ideal to run a receiver on a softserial port due to duty cycle limitations
- Some ports may work better than others. `LED_STRIP` usually works all the time, but you may need to experiment with others
- And lastly, you cannot have more than two softserial ports active at the same time

:::

## Beeper Configuration

Toggle different triggers when the beeper should be active

| Setting                | Description                                                                                                            |
| :--------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| GYRO_CALIBRATED        | Beeps when the gyroscope has been calibrated                                                                           |
| RX_LOST                | Beeps when the RX signal is lost (repeats until the signal is regained)                                                |
| RX_LOST_LANDING        | Beeps when the RX signal is lost, and the craft is in a landing phase                                                  |
| DISARMING              | Beeps when the craft is disarmed                                                                                       |
| ARMING                 | Beeps when the craft is armed                                                                                          |
| ARMING_GPS_FIX         | Beeps when the craft is armed, and the GPS has a fix                                                                   |
| BAT_CRIT_LOW           | Beeps when the battery is critically low according to the value set in the Battery tab (repeats)                       |
| BAT_LOW                | Beeps when the battery is low according to the value set in the Battery tab (repeats)                                  |
| GPS_STATUS             | Beeps x amount of times depending on the amount of satellites found                                                    |
| RX_SET                 | Beeps when the `BEEPER` mode is on                                                                                     |
| ACC_CALIBRATION        | Beeps when the inflight accelerometer calibration is successful                                                        |
| ACC_CALIBRATION_FAIL   | Beeps when the inflight accelerometer calibration fails                                                                |
| READY_BEEP             | Beeps when the craft has a GPS fix and is ready to be armed                                                            |
| DISARM_REPEAT          | Beeps when the sticks are in a disarm position                                                                         |
| ARMED                  | Beeps when the craft is armed and motors are not spinning (repeats until throttle is raised, or the craft is disarmed) |
| SYSTEM_INIT            | Beeps when the FC has been powered on                                                                                  |
| USB                    | Beeps when the FC is powered by USB, disable this to prevent beeping when configuring on the bench                     |
| BLACKBOX_ERASE         | Beeps when the blackbox has been erased                                                                                |
| CRASH_FLIP             | Beeps when the crash flip mode is active                                                                               |
| CAM_CONNECTION_OPEN    | Beeps when the 5 key OSD menu is opened                                                                                |
| CAM_CONNECTION_CLOSE   | Beeps when the 5 key OSD menu is closed                                                                                |
| RC_SMOOTHING_INIT_FAIL | Beeps when the craft is armed and RC smoothing has not been initialized                                                |

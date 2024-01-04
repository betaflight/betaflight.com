import MagOrientation from '/img/MagOrientationDiagram.png'

# Magnetometer / Compass

:::warning

These notes only apply to Magnetometers in Betaflight 4.5 or higher

Do **NOT** use a magnetometer unless you have confirmed that:

- the magnetometer's axes are correctly oriented
- the calibration is accurate
- the returned values are clean and noise-free
- the correct local declination angle is entered in the CLI
- the heading returned by the mag is correct
- Acc is enabled, correctly oriented, and calibrated
- GPS is included in the firmware, and enabled, to see the heading data

:::

## Introduction

The purpose of a magnetometer is to return the 'heading' of the quad, meaning the direction the nose of the quad is pointing in. More precisely, we want the angle in degrees between the nose of the quad and "true North". When set up correctly, the returned value should, for example, be 90 degrees when the nose of the quad is pointing due East, 180 degrees when pointing due South, etc.

Mag information is essential for position hold, which we intend to support, and improves behaviour in GPS Rescue.

GPS Rescue will have improved heading control if reliable, accurate Mag information is available, especially during ascents and descents on windy days.

## Summary

- please read _all_ of this document before using a magnetometer (3D compass)
- the firmware must be custom built to include Mag support
- the magnetometer must power up at the same time as the flight controller
- the CLI `status` command must show the correct hardware as being connected
- the magnetometer must be oriented correctly, and the orientation must be checked
- the magnetometer must be calibrated accurately
- the user must set the local declination angle in the CLI
- the user must confirm that the reported heading is correct while in flight, from mag alone
- the user must get GPS Rescue working properly, without Mag, before enabling the Mag
- the user must make careful tests of GPS Rescue when adding Mag. With Mag, the initial rotation/climb phase, and the descent phase, should show more accurate heading control, especially in windy conditions. If it makes no difference to the rescue, or causes problems, don't use it.

:::danger
DO NOT enable Mag if you rely on GPS rescue, until you are ABSOLUTELY CERTAIN that the Mag data is accurate and reliable!
:::

## What is a Magnetometer? {#magnetometer-explanation}

A magnetometer is a three-axis device that detects the local strength and direction of the [earth's magnetic field](https://en.wikipedia.org/wiki/Earth%27s_magnetic_field)[^1].

Magnetometer sensors output data on three mutually perpendicular axes: X, Y and Z. The relative relationship between the three axes is typically as follows: if Z is up, and X is forward, Y points left. This is true for the popular QMC5883L. However, some magnetometers orient the axes differently.

For most Mag modules, if the magnetometer has arrows indicating the direction of the X and Y axes on the board, the direction of the Z axis most likely will be:

- upwards, if the Y axis is 90° to the left of X axis, or
- downwards, if the Y axis is 90° to the right of the X axis

When one of the Mag sensor's three axes points directly parallel to a magnetic field line, that axis returns its most positive value, and the other two axes return zero. Conversely, when pointing into the opposite direction, the axis returns its most negative value, and the other two axes return zero. This is how the user can determine the orietnation of the axes in their module.

:::caution
The orientation of the magnetometer on the quad is very important. In Betaflight, the data from the magnetometer must be returned as follows:

- X must point **forward**
- Y must point **left**
- Z must point **up**

Always use the Sensors tab to confirm that the sensor orientation is correct. If the Mag is an IST8310, its non-compliant Y axis orientation must be corrected with a custom configuration that rotates the Y axis by 180 degrees.
:::

<div align="center">
![Betaflight Configurator](/img/MagOrientationDiagram.png)
**Fig. 1** - Magnetometer axes and orientation in relation to the drone as expected by Betaflight.
<br></br>
</div>

In most standalone modules, such as the GY-271 board, the sensor is soldered on the top of the board, and typically the Z axis points upwards. In most GPS modules, the sensor is mounted upside-down, and the Z axis points downwards. The sensor can be soldered with it's X axis faces forward, or 180 degrees backwards, or left, or right. Hence the orientation of the axes varies greatly from module to module.

The orientation of the axis also varies according to the orientation of the module when it is attached to the quadcopter.

If the magnetometer cannot be physically positioned so that its axes are aligned as per the diagram above, the `Mag alignment` setting in Configurator (`align_mag` in the [CLI](/docs/wiki/configurator/cli-tab) may be used to correct for other mag orientations. Standard corrections (e.g. `CW90` to rotate the axes 90 degrees clockwise) are provided for common alignment problems. If the module is tilted backwards, or at an unusual angle, a `custom` orientation correction will be required.

The correct orientation of a given axis should be confirmed by checking the Magnetometer data in the Sensors tab.

## About the Earth's Magnetic Field

[The earth's magnetic field](https://en.wikipedia.org/wiki/Earth%27s_magnetic_field)[^1] is not uniform. Its field lines usually point a few degrees away from geographic North and either down (in the Northern Hemisphere) or up (in the Southern Hemisphere). Both the field direction and strength vary from place to place.

The earth's magnetic field is usually represented in a **NED** (north-east-down) frame of reference. This means that the X axis of the earth's field points North, the Y axis points East, and the Z axis points Down. This representation is not at all relevant for Betaflight's mag orientation, but may be useful when interpreting the magnetic field strength and direction values reported for your location.

The absolute strength of the field is measured in Gauss, or milliTeslas, where 1.0 Gauss = 0.1 milliTesla. In my location, the field strength is approximately 0.57 Gauss. Betaflight's sensors tab shows the values reported by the sensor, and these depend on the sensor gain, which can be found in the specification sheet. For example, the QMC5883L returns a value of 3000 for a field strength of 1 Gauss, so that in Sydney I would expect to get a value 1710 when that sensor, after calibration, was aligned directly into the field.

When we measure the magnetic field at a particular point on earth, we are measuring a local field vector which usually points a few degrees away from geographic North, and either down into the ground in the Northern Hemisphere, or up out of the ground in the Southern Hemisphere. There are considerable angular deviations, especially in the up or down angle, depending upon where you are on the surface of the Earth.

The sideways deviation of the Earth's magnetic field from the geographic north is called the **magnetic declination**. It is measured in degrees, with positive values meaning that the magnetic North is to the East of the geographic North.

The angle at which the field points into (or out of) the Earth's surface is called the **magnetic inclination**, or **magnetic dip**. See [physicsmax.com](https://physicsmax.com/inclination-dip-7371)[^2] for a nice explanation and graphic. Inclination is measured in degrees 'into' the ground. In the Northern Hemisphere the Earth's magnetic field points down into the ground (positive inclination values), and in the Southern Hemisphere it points up into the sky (negative inclination values).

Local declination and inclination values are available from online sources such as [NOAA](https://www.ngdc.noaa.gov/geomag/calculators/magcalc.shtml)[^3], or via clickable map at sites like [magnetic-declination.com](https://www.magnetic-declination.com)[^4].

As an example, in Sydney, Australia, 34 degrees South and 151 degrees East, the Earth's magnetic field is 13 degrees east of the geographic North, and points out of the ground, steeply upwards, at 65 degrees. With a properly calibrated and correctly oriented Mag, a maximallly positive value on the Mag X axis should be seen in the Sensors tab, and close to zero on the Y and Z axes, when the nose of my quad is pointed 13 degrees East of North, and 65 degrees up.

## Setting local declination in the CLI

In Betaflight 4.5, the CLI variable `mag_declination` was introduced, to correct for declination offsets. When correctly set, Betaflight will return "true North", not "magnetic North", and will match the GPS course over ground values, which are returned relative to true North. Declination values should be entered in decidegrees; in the above example, `set mag_declination = 130` would correct for a 13 degree positive declination. A negative local declination, eg -3 degrees, should be entered as `set mag_declination = 3570`.

## Hardware and Connection

Betaflight's build system must include `Magnetometers`, from the dropdown in the cloud build, or `-DUSE_MAG` for local builds, otherwise there will be no Mag support in the firmware. Additionally, GPS firmware should be included in the build, because we display the Mag heading on Configurator's GPS tab, and use GPS debugs to display the Mag heading information.

Betaflight provides drivers for the following magnetometers, but not all have been validated to work with Betaflight 4.5 at the time of writing:

- [QMC5883L](https://datasheet.lcsc.com/szlcsc/QST-QMC5883L-TR_C192585.pdf)[^8]. The QMC5883L is provided on the common, and cheap, GY-217 module, and many GPS units. It provides a 200Hz data update rate, 8x sample averaging and 3000 LSB/Gauss sensitivity. Standard axis orientation. We recommend using this mag if it is an option for your build, because it's performance has been validated during testing - we know it works well.
- [IST8310](https://intofpv.com/attachment.php?aid=8104)[^9] Note that this gyro has a highly unusual axis orientation, with Y to the _right_ when X is forward and Z is up, and will _always_ require a custom axis orientation in the CLI. Data update rate is 160Hz with 16x sample averaging and 330 LSB/Gauss sensitivity.
- [STM's LIS3MDL](https://www.st.com/resource/en/datasheet/lis3mdl.pdf)[^10] This mag is integral to a combined Gyro, Acc and Mag '9 axis' chip from STM. Standard axis orientation.
- [HMC5883L](https://cdn-shop.adafruit.com/datasheets/HMC5883L_3-Axis_Digital_Compass_IC.pdf)[^7] ODR is 75Hz with 1090 LSB/Gauss sensitivity; discontinued and replaced by the QMC6883L. Standard axis orientation. Validated.
- Deprecated: [AK8963](https://www.alldatasheet.com/datasheet-pdf/pdf/535561/AKM/AK8963.html)[^5] and [AK8975](https://www.alldatasheet.com/datasheet-pdf/pdf/535562/AKM/AK8975.html)[^6], (both discontinued; some versions have Z up, others down, all return standard axis orientation when mounted with X forward).

:::caution
The AK8963 and AK8975 driver code is deprecated in Betaflight 4.5, and will be removed at some point. These Mags, or may not, work with Betaflight 4.5. No developers have these units, so we can't test them. Please take particular care when using 4.5 with these Mag units. Confirm that the Mag task does not cause issues with other i2c devices, and that the data from these units is usable. We strongly recommend using a current Mag like the QMC5883L.
:::

The user can use`set mag_hardware = AUTO` in CLI, which is the default, and Betaflight will automatically identify a connected and supported Mag.

:::warning
Magnetometer detection takes place on power up. Make sure that the Mag powers up at the same time as the FC.

:::

The magnetometer is usually connected via i2C. Wire up the SCL and SDA pins on the module to the pins of the same name on the FC, and power the module with either 5V or 3.3V depending its requirements.

When connected by i2C, the following CLI settings are needed:

- `set mag_bustype = I2C`
- `set mag_i2c_address = 0` (automatically determine from the connected Mag)
- `set mag_i2c_device = 1` (always 1, not sure why)

When the firmware is built with Mag support, the Accelerometer enabled, and a supported Magnetometer is wired up properly, Mag can be enabled in the Configurator's System Configuration tab, and saved. From that point:

- the Mag hardware icon at the top (N with triangle above it) will illuminate
- Mag Alignment settings are available in the top right of the Configuration tab in Configurator
- in the Sensors tab, enabling Magnetometer at the top will display the current X, Y and Z magnetometer values
- the `status` command in CLI will show the detected Mag hardware

:::tip
The Accelerometer must always be enabled when using a Mag, to correct the heading estimate for pitch or roll variations!
:::

## Magnetometer Mounting and Orientation

As noted previously, Betaflight expects that, with respect to _both_ the Accelerometer, and the frame of the quad, the magnetic field information matches the following requirements:

- X axis functionally points forward,
- Y axis functionally points left, and
- Z axis functionally points up.

If this is not the case, the Mag data will be useless, and could cause a GPS rescue to fail. Software adjustments may be required to get the 'orientation-corrected' Mag axes and 'orientation-corrected' Accelerometer axes to match the orientation of the frame.

A stand-alone external Mag module that can be mounted anywhere on the quad, eg a GY-271, is best mounted:

- centrally
- in the same plane of the FC, usually meaning both are 'flat to the quad'
- as far as possible, away from motors and other metallic onjects, or high-current wires
- with the X axis pointing forward, directly to the nose of the quad, Y left and Z up

If the Mag is part of your GPS module, the above requirements also apply. It's definitely easier if the GPS is flat to the quad, otherwise you'll need to figure how to enter the correct custom alignment settings. Also note that the Mag sensor may be inverted, or in an unknown orientation, as explained [above](#magnetometer-explanation).

No matter how it is mounted, is absolutely essential to confirm proper orientation of the Mag before using it!

:::tip
When the Mag orientation (alignment) is correct, the 'quad' icon in the Home screen of Configurator should move smoothly and appropriately as the quad is rotated, pitched and rolled. Note that when the quad's attitude is changed very quickly, the heading will initially react quickly on the basis of Gyro and Acc data, and then over the next half second it will be adjusted by the Mag. If the orientation of the Mag data axes is wrong, or the calibration is way off, then these movements will be jerky or completely wrong.
:::

If the orientation is known to be correct, ie X forward etc, because you can see the orientation markings on the board or have confirmed them by checking the little dot on the sensor, then the default or `CW0` alignment should be correct. Even so, do the checks noted below.

If you're unsure of the axis orientation, or if you know the Mag is rotated, or upside down, the `Mag alignment` setting in Configurator (`align_mag` in CLI) will need to be configured properly:

- if the mag is upright but rotated 90 degrees right, choose `CW90`, etc
- if the mag is inverted, choose one of the 'flip' options.
- if the mag is at a custom angle, choose `CUSTOM` orientation, and enter adjustment values in decidegrees in the CLI.

Note that 'flip' functionally rotates the Mag 180 degrees around the Y axis. You pretty much have to experiment with each possible orientation and check each of them until you find one that works. For the HMC5883L/QMC5883L, [this post](https://intofpv.com/t-betaflight-internals-coordinate-system?pid=55575#pid55575)[^11] shows a 'cheat sheet' that may help, but only if the chip itself is visible.

### Checking Magnetometer Orientation using Configurator's Sensors Tab

The Sensors Tab shows the current X, Y and Z Mag field strength values as detected by the sensor. This information can be used to confirm the correct orientation of the Mag sensor, and to confirm the calibration.

:::note
Before checking orientation, the sensor must first be calibrated!  
This initial calibration does not have to be perfect, but it must be done.
:::

When a particular axis is perfectly aligned with the local magnetic field, the other two axes will show zero, or very close to zero. If the value shown is positive, that axis is pointing towards the North of the magnetic field. If negative, it's pointing South.

We can use this fact to check the orientation of the Mag after it is attached to the quadcopter. It's best to do this well away from large ferrous metal objects, eg out in an open field or something like that.

We need to know the 'north' direction of the Earth's magnetic field, approximately, at our location, so that we can point the nose of the quad kind of directly parallel to that magnetic field line when we go looking at the data returned by our Mag.

First, get your phone out, open the Compass settings, and configure it to return Magnetic North (not "true" North). Then open the Compass app, and mark a line on the bench or ground that points to Magnetic North/South.

Then look up your local Inclination value. If you're in the Northern Hemisphere, you'll be pointing the nose of the quad downwards at that angle into the ground, along the North/South magnetic line, when testing the X axis of your sensor. If you're in the Southern Hemisphere, you'll be pointing at that angle up into the sky.

Then hook the quad up to Configurator, check the Sensors tab, point the nose of the quad as best possible directly into the magnetic field.

If everything is perfect, you should see a large, positive value in the X axis, and smaller, close to zero values in the Y and Z axes. With a bit of adjustment of the angle of the quad, you should be able to get the Y and Z axes really close to zero. If you figure that the nose of the quad looks like it's pointing North, and at the correct angle to the Horizon, and if X is by far the biggest number, then the X axis is aligned correctly!

Then turn the quad 90 degrees right, pointing the 'left side' of the quad, where the Y axis of the sensor should be, directly to Magnetic North. If all is good, the Y axis data will be a big number and X and Z close to zero.

Finally, hold the quad so that the top of it is pointing directly into the magnetic field vector. By now you should have a good idea where that is. Z should then have a strongly positive value while X and Y should be close to zero.

Complex as this process seems, it is the only way to be 100% sure that the Mag is oriented correctly.

If you do not get the expected outcome, a software correction for the orientation of the Magnetometer will be required. Keep trying until it works properly.

### Software Corrections for Unusual Magnetometer Orientations

To get these corrections right, you must know the direction of the magnetic field lines in your test environment. The mag must have been calibrated at some point before fixing the orientation.

The goal is to achieve the following result in the Sensors tab, when the specified part of the quad is pointed directly parallel to the field lines:

---

| Frame part parallel to field lines | X axis  | Y axis  | Z axis  |
| ---------------------------------- | ------- | ------- | ------- |
| Nose                               | Maximum | 0       | 0       |
| Left side                          | 0       | Maximum | 0       |
| Top                                | 0       | 0       | Maximum |

---

Usually it's best to do initial tests with the mag mounted flat and square to the frame, in the position you'd like it to be. If the mag is in a GPS, and you plan to pitch the GPS back a bit, worry about the tilt later; keep it flat for now.

A good plan is to first check the Z axis. Confirm that it returns a strongly positive number when the top of the quad points directly into to the 'North' of the local field lines. If you get a strongly negative value, the sensor is mounted upside down. You should apply the `CW0_DEG_FLIP` correction at this point, and then move on to check X and Y.

To check X, move the quad around until you get a positive value on X, and then make smaller adjustments until you see a maximum on X and a zero on Y and Z. Let's say this happens when the right side of the quad is pointing directly parallel to the field lines. That means the X axis is pointing to the right of the quad, i.e. that the sensor is rotated 90 degrees clockwise. The appropriate correction, assuming Z pointed UP, would be `CW90`. If the Z axis pointed down, you'd need `CW90_FLIP`.

Each time you try a different software orientation, re-test by pointing the nose into to the field lines, looking for a max on X, then check that Y is max when the left side points parallel to the field lines, and finally check that Z is max when the top of the quad points parallel to the field lines. Once you get that, you're done. Unless you intend to tilt the Mag a bit, that is.

If the Mag is a separate module, it is definitely easiest if it is mounted flat on the quad, with X forward and Z up, if at all possible.

If the Mag is in a GPS, and you want to pitch the GPS backwards at say 30 degrees an additional 30 degree correction will be required, that will also pitch the Mag backwards at 30 degrees.

Unfortunately, this means that the simple, standard `CW0` type corrections cannot be used. You will need to enable custom mag alignment, with `set align_mag = custom` in CLI. Then a value must be entered for each axis that requires correction, using, for example, `set mag_align_pitch = 300`, which compensates for a 30 degree pitch alignment problem.

It's probably best to:

- first determine the standard correction that works when the module is flat to the frame
- convert that to a set of custom corrections, in degrees, for each axis
- figure out what final change is required to correct for the pitch offset of the module.

Here are some examples:

If the module requires no correction, i.e. it works perfectly, with X forward and Z up as expected in the CW0 or default orientation while flat, and then if it is pitched backwards 30 degrees, `set align_mag = custom` and `set mag_align_pitch = 300` should fix it.

If the module requires a `CW90` correction while flat, then the combination of `set align_mag = custom`, `set mag_align_yaw = 900` and `set mag_align_roll = -300` will fix the module being pitched backwards 90 degrees. The correction is required on roll since the sensor is logically rotated 90 degrees.

A module which requires a `CW90FLIP` correction, and is then pitched back 30 degrees, would require `set align_mag = custom`, `set mag_align_pitch = 1800`, `set mag_align_yaw = 900` and `set mag_align_roll = 300`.

Note that if the board is rotated 90 degrees, corrections for pitch must be done using roll.

## Magnetometer Calibration

For accurate heading readings, accurate calibration is essential.

Calibration 'zeroes out' local magnetic fields arising from nearby ferrous objects on the quad, such as nearby circuit board components, and any inherent offsets in the sensor.

The calibration process can be initiated while connected to Configurator, or by using stick commands.

:::note
In Betaflight 4.5, the frame must be 'tapped' quite hard, within 15s of initiating the calibration process, to start acquiring data. Once the data acquisition phase commences, the LED stops flashing. Data will be acquired over the next 30s and used to calibrate the sensor.
:::

The 'centre' or 'cal' value for an axis is typically a value midway between the min and max values detected for that axis. It is then is subtracted from every reading, centering all readings on that axis around zero. Once the cal value is applied, the reported maximum (most positive) and minimum (most negative) values, for each axis, should be equal in value, but opposite in sign.

Cal values are saved in the `mag_calibration` CLI parameter. For example, `set mag_calibration = 35,-130,-75` will cause the heading code to subtract 35 from every X reading, add 130 to every Y reading, and add 75 ro every Z reading.

For the most accurate calibration results:

- calibrate the quad at, or close to, the intended flight location
- while calibrating, keep well away from external metallic or magnetic objects
- do several runs, and confirm that the cal values are consistent each time
- (expert only) validate that absolute min and max readings are equal on each axis
- consider removing the motors

:::note
Magnetic interference from nearby motors can affect calibration very badly. If the motors are turned slowly, and you see twitching of the quad icon on the main Configurator page, significant changes in the Mag heading value, or twitches in the Mag data in the sensors tab, you may have a problem. In flight, these offsets should average out, but during calibration, they will not, and it's likely that you'll bump the motors while twisting it around during the cal process. This can lead to strangely different cal values on repeated testing, no matter how careful you are. The further away the motors are, and the further above or below the plane of the motors, the less of a problem this is. On some quads the only way to get an accurate Mag cal is to remove the motors.
:::

Calibration values, once acquired, typically do not need to be changed much within your local area. They may require updating or checking if you intend to fly a long way from home.

:::note
Calibration itself **DOES NOT** check that the orientation of the sensor is correct!
:::

### Calibration Initiation

The quad must be disarmed. There are two ways to initiate the calibration process:

- clicking the `Calibrate Magnetometer` button in Configurator, keeping connected with a long USB cable.
- using stick commands on a mode 2 radio (be absolutely sure that the quad is disarmed!):
  - right stick straight down (pitch low with roll centered)
  - left stick in the top right corner (throttle high and yaw fully right)
- you then have 15s in which to 'tap the frame' hard, which starts the calibration process itself

Once the calibration process is activated, the LED on the FC stops flashing.

### Calibration Technique

It's best to record your previous calibration values before re-calibrating, especially if they were OK. This can be done with a Preset>Save command.

After initiating a calibration you have 15s to get ready to move the quad around. When you're ready to start moving the frame, tap the arm of the frame quite hard, to make a big spike in the gyro signal. The calibration count-down commences, and the status LED stops flashing. You now have 30s in which to move the quad so that all the magnetometer axes point to all the possible points of the magnetic field.

A good way to cover every possible angle is to:

- hold the quad by the battery
- swing your arm around in a big circle, eg forwards -> up ->over -> backwards -> downwards, and keep swinging it around like this
- yaw the quad, randomly, left and right, at the same time
- slowly rotate your whole body about its vertical axis by taking small steps, so that in 30s you have completed a full 360 degree rotation.

If you know the local field direction, you may start and finish facing North, though this is not necessary.

Smoothly completing full rotations about every 1.5-2 seconds works best, but keep in mind that you only have 30s.

Check the `mag_calibration` CLI numbers after each run to see how consistent the values are. If each value is within 50 units of the last couple of runs, that's pretty good. Also check in the Sensors Tab that the Min and Max for each axis are approximately the same number.

:::warning
Take great care not to initiate a Mag Cal accidentally! If you 'tap' the frame, but fail to rotate the quad properly after a Cal starts, your old cal values will be lost, and the Mag data will be useless!
:::

### Single-axis calibration

It's possible to do a 'manual' calibration 'one axis at a time'. This is not the normal or recommended method, but can be used to check the cal value for a particular axis.

For example, if we want to get an accurate cal value for the X axis, we can point the nose in the general direction of Magnetic North, and move it randomly around while keeping it generally pointing in the North field vector. Note that both the inclination and declination angles must be considered. This requires knowing the local declination and inclination angles. The idea is to get lots of values that are close to magnetic North, so that at least some are 'spot on'. The nose should be pointed directly North for some 12-13s, then the quad should be reversed 180 degrees, pointing the tail of the quad directly into the field, and moving it around a bit, for the same period of time.

If we are connected to the Sensors tab, we should see the X axis being close to maximum, and the other two axes close to zero, when the nose is pointing directly into the field. Conversely, it should show the most negative value when the tail points directly into the field.

The resulting cal value for X can be returned with `get mag_calibration` the CLI; the first value is the X cal value. Record that value. Repeat the process to be sure the X cal value is reliable. Then repeat separately for the Y and Z axes, until you have all three cal values. Then you can type in the cal value for each axis into the CLI in the form `set mag_calibration = X,Y,Z`.

Normally the method of swinging the arm as it rotates works very well, returning a calibration value for all three axes in one calibration run.

### Validating the Heading using a mobile phone.

The heading value can be checked against a mobile phone. Ensure that the mobile phone is set to display true North, not magnetic north, and be sure that your local declination value has been entered into the CLI. Point the quad due North, using your phone to determine North. The heading value on the front page of Configurator, or in the goggles, should read close to 0 / 360 when pointing due North.

### Fine-tuning Calibration in Sensors Tab.

For a well-calibrated Mag, the highest and lowest values, for any individual axis, when the values on the other two axes are close to zero, should be numerically equal.

Using the sensors tab to check max and min values for each axis can also validate the accuracy of the existing calibration when flying in a new location. If max and min are very similar, when the other two axes are zero, you don't need to recalibrate.

## Where is heading information displayed?

Heading information is provided to the quad by the GPS unit (course over ground), the IMU (gyro information while turning quickly), and the Mag unit. The IMU code uses 'sensor fusion' methods to integrate the available data to a final 'attitude' or 'heading' value for the quad.

The current Heading is shown shown on the main front screen of Configurator, at the top left of the quad icon area. If Mag is enabled, the heading shown reflects Mag data, and will return a value indicating the angle of the nose of the quad relative to North. Without a mag, the heading value always starts at 0 or 359 degrees, and only changes because integral of the gyro data can be used to indicate a relative change in yaw since arming.

If the code is built with GPS support, both the current Mag heading and the GPS course over ground heading are shown in Configurator's GPS tab.

In the OSD, heading can be shown as numerical values in degrees, or indicated graphically.

:::tip
If everything is working properly, the quad's icon, as shown in the main page of Configurator, should move without sudden jumps, once Mag is enabled. Sudden jumps after quick movements usually mean that the orientation is not correct.  
:::

If GPS working properly, and GPS Rescue enabled in the Failsafe tab, heading information from Mag can be logged in Debug 4 of the `GPS_RESCUE_HEADING` debug.

MagADC X, Y and Z values are always logged to Blackbox, and should be examined after an initial flight to ensure they are not really noisy. The noise should be much less than the signal. If noise is obviously an issue, mount the mag further away from the motors, and away from high-current wires, ensuring that the sensor is equidistant from pairs of motors, and check that there is adequate filtering on the power supply to the Mag module.

_Drafted by **ctzsnooze** in 2023-09 for Betaflight 4.5. Huge shout out to **ledvinap** and **pichim** for their help and guidance._

## External Links

[^1]: [Earth's Magnetic Field - Wikipedia](https://en.wikipedia.org/wiki/Earth%27s_magnetic_field)
[^2]: [Inclination or Dip - PhysicsMax](https://physicsmax.com/inclination-dip-7371)
[^3]: [Magnetic Field Calculators - NOAA](https://www.ngdc.noaa.gov/geomag/calculators/magcalc.shtml)
[^4]: [Inclination and Declination map](https://www.magnetic-declination.com)
[^5]: [AK8963 datasheet (disccontinued)](https://www.alldatasheet.com/datasheet-pdf/pdf/535561/AKM/AK8963.html)
[^6]: [AK8975 datasheet (discontinued)](https://www.alldatasheet.com/datasheet-pdf/pdf/535562/AKM/AK8975.html)
[^7]: [HMC5883L datasheet](https://cdn-shop.adafruit.com/datasheets/HMC5883L_3-Axis_Digital_Compass_IC.pdf)
[^8]: [QMC5883L datasheet](https://datasheet.lcsc.com/szlcsc/QST-QMC5883L-TR_C192585.pdf)
[^9]: [IST8310 datasheet](https://intofpv.com/attachment.php?aid=8104)
[^10]: [LIS3MDL datasheet](https://www.st.com/resource/en/datasheet/lis3mdl.pdf)
[^11]: [HMC5883L/QMC5883L cheat sheet](https://intofpv.com/t-betaflight-internals-coordinate-system?pid=55575#pid55575)

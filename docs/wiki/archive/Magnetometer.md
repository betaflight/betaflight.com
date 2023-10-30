import MagOrientation from '/img/MagOrientationDiagram.png'

# Magnetometer / Compass

:::warning

Do **NOT** use a magnetometer unless you have confirmed that:

- the calibration is accurate
- its output is correctly oriented
- the returned values are clean and noise-free
- the correct local declination angle is entered in the CLI
- the heading returned by the mag is correct
- Acc is enabled, correctly oriented, and calibrated
- GPS is included in the firmware and enabled, to see the heading data

:::

## Introduction

The purpose of a magnetometer is to return the 'heading' of the quad, meaning the direction the nose of the quad is pointing in. More precisely, we want the angle in degrees between the nose of the quad and "true North". When set up correctly, the returned value should, for example, be 90 degrees when the nose of the quad is pointing due East, 180 degrees when pointing due South, etc.

Mag information is essential for position hold, which we intend to support, and improves behaviour in GPS Rescue.

GPS Rescue will have improved eading control if reliable, accurate Mag information is available, especially during ascents and descents on windy days.

:::danger
DO NOT enable Mag if you rely on GPS rescue, unless you are ABSOLUTELY CERTAIN that the Mag data is accurate and reliable!
:::

## What is a Magenetometer? {#magnetometer-explanation}

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

<figure className="align-center">
  <img src={MagOrientation} alt="Figure of magnetometer axes and orientation" className="no-effect " />
  <figcaption>
    <b>Fig. 1</b> - Magnetometer axes and orientation in relation to the drone as expected by Betaflight
  </figcaption>
  <br />
</figure>

In most standalone modules, such as the GY-271 board, the sensor is soldered on the top of the board, and typically the Z axis points upwards. In most GPS modules, the sensor is mounted upside-down, and the Z axis points downwards. The sensor can be soldered with it's X axis faces forward, or 180 degrees backwards, or left, or right. Hence the orientation of the axes varies greatly from module to module.

The orientation of the axis also varies according to the orientation of the module when it is attached to the quadcopter.

If the magnetometer cannot be physically positioned so that its axes are aligned as per the diagram above, the `Mag alignment` setting in Configurator (`align_mag` in the [CLI](../configurator/cli-tab)) may be used to correct for other mag orientations. Standard corrections (e.g. `CW90` to rotate the axes 90 degrees clockwise) are provided for common alignment problems. If the module is tilted backwards, or at an unusual angle, a `custom` orientation correction will be required.

The correct orientation of a given axis should be confirmed by checking the Magnetometer data in the Sensors tab.

## About the Earth's Magnetic Vector Field

[The earth's magnetic field](https://en.wikipedia.org/wiki/Earth%27s_magnetic_field)[^1] is not uniform. Its field lines usually point a few degrees away from geographic North and point either slightly down or up in most places around the world. In other words: both the field direction and field strength vary from place to place.

If you check the earth's magnetic field at your location, it usually gets represented in a **NED** (north-east-down) frame of reference. This means that the X axis points North, the Y axis points East, and the Z axis points Down. This is not at all relevant for Betaflight's mag orientation on the quad, but it's useful to know for interpreting the magnetic field strength and direction at your location.

The absolute strength of the field is measured in Gauss, or milliTeslas, where 1.0 Gauss = 0.1 milliTesla. In my location, the field strength is approximately 0.57 Gauss. Betaflight's sensors tab shows the values reported by the sensor, and these depend on the sensor gain, which can be found in the specification sheet. For example, the QMC5883L returns a value of 3000 for a field strength of 1 Gauss, so that in Sydney I would expect to get a value 1710 when that sensor, after calibration, was aligned directly into the field.

When we measure the magnetic field at a particular point on earth, we are measuring a local field vector which usually points a few degrees away from geographic North, and either down into the ground in the Northern Hemisphere, or up out of the ground in the Southern Hemisphere. There are considerable angular deviations, depending upon where you are on the surface of the Earth.

The sideways deviation of the Earth's magnetic field from the geographic north is called the **magnetic declination**. It is measured in degrees, with positive values meaning that the magnetic North is to the East of the geographic North.

The angle at which the field points into (or out of) the Earth's surface is called the **magnetic inclination**, or **magnetic dip**. See [physicsmax.com](https://physicsmax.com/inclination-dip-7371)[^2] for a nice explanation and graphic. Inclination is measured in degrees 'into' the ground. In the Northern Hemisphere the Earth's magnetic field points down into the ground (positive inclination values), and in the Southern Hemisphere it points up into the sky (negative inclination values).

Local declination and inclination values are available from online sources such as [NOAA](https://www.ngdc.noaa.gov/geomag/calculators/magcalc.shtml)[^3], or via clickable map at sites like [magnetic-declination.com](https://www.magnetic-declination.com)[^4].

As an example, in Sydney, Australia, 34 degrees South and 151 degrees East, the Earth's magnetic field is 13 degrees east of the geographic North, and points out of the ground, steeply upwards, at 65 degrees. With a properly calibrated and correctly oriented Mag, a maximallly positive value on the Mag X axis should be seen in the Sensors tab, and close to zero on the Y and Z axes, when the nose of my quad is pointed 13 degrees East of North, and 65 degrees up.

## Setting local declination in the CLI

In Betaflight 4.5, the CLI variable `mag_declination` was introduced, to correct for declination offsets. When correctly set, the Mag will return "true North", not "magnetic North", and will match the GPS course over ground values, which are returned relative to true North. Declination values should be entered in decidegrees; in the above example, `set mag_declination = 130` would correct for a 13 degree positive declination. A negative local declination, eg -3 degrees, should be entered as `set mag_declination = 3570`.

## Hardware and Connection

Flight / FC firmware must be specially built to include `Magnetometers` for the cloud build, or `-DUSE_MAG` for local builds, otherwise there will be no Mag support in the firmware on the FC. Additionally, GPS firmware should be included in the build, because we display the Mag heading on Configurator's GPS tab, and use GPS debugs to display the Mag heading information.

Betaflight supports the following magnetometers:

- [QMC5883L](https://datasheet.lcsc.com/szlcsc/QST-QMC5883L-TR_C192585.pdf)[^8]. The QMC5883L is provided on the common, and cheap, GY-217 module, and many GPS units. It provides a 200Hz data update rate, 8x sample averaging and 3000 LSB/Gauss sensitivity. Standard axis orientation.
- [IST8310](https://intofpv.com/attachment.php?aid=8104)[^9] Note that this gyro has a highly unusual axis orientation, with Y to the _right_ when X is forward and Z is up, and will _always_ require a custom axis orientation in the CLI. Data update rate is 160Hz with 16x sample averaging and 330 LSB/Gauss sensitivity.
- [STM's LIS3MDL](https://www.st.com/resource/en/datasheet/lis3mdl.pdf)[^10] This mag is integral to a combined Gyro, Acc and Mag '9 axis' chip from STM. Standard axis orientation.
- [HMC5883L](https://cdn-shop.adafruit.com/datasheets/HMC5883L_3-Axis_Digital_Compass_IC.pdf)[^7] ODR is 75Hz with 1090 LSB/Gauss sensitivity; discontinued and replaced by the QMC6883L. Standard axis orientation.
- [AK8963](https://www.alldatasheet.com/datasheet-pdf/pdf/535561/AKM/AK8963.html)[^5] and [AK8975](https://www.alldatasheet.com/datasheet-pdf/pdf/535562/AKM/AK8975.html)[^6], (both discontinued; some versions have Z up, others down, all return standard axis orientation when mounted with X forward).

The user can use`set mag_hardware = AUTO` in CLI, which is the default, and Betaflight will automatically identify a connected and supported Mag.

The magnetometer is usually connected via i2C. Wire up the SCL and SDA pins on the module to the pins of the same name on the FC, and power the module with either 5V or 3.3V depending what it needs.

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

As noted previously, Betaflight expects that, with respect to the Accelerometer, the magnetic field information matches the following requirements:

- X axis functionally points forward,
- Y axis functionally points left, and
- Z axis functionally points up.

If this is not the case, the Mag data will be useless, and could cause a GPS rescue to fail. The key orientation requirement is that the Mag axes exactly match those of the Accelerometer.

If you have an external Mag module that can be mounted anywhere you like, eg a GY-271, mount it:

- centrally
- in the same plane of the FC, usually meaning both are 'flat to the quad'
- as far as possible, away from motors and other metallic onjects, or high-current wires
- with the X axis pointing forward, directly to the nose of the quad, Y left and Z up

If the Mag is part of your GPS module, the above requirements also apply. It's definitely easier if the GPS is flat to the quad, otherwise you'll need to figure how to enter the correct custom alignment settings. Also note that the Mag sensor may be inverted, or in an unknown orientation, as explained [above](#magnetometer-explanation). It is absolutely essential to confirm proper alignment before using the Mag!

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

For accurate heading readings, an accurate calibration is needed.

Calibration 'zeroes out' offsets in the local magnetic field, typically caused by nearby ferrous objects on the quad, including nearby circuit board components.

The 'centre' or 'cal' value for an axis is the value midway between the min and max values detected for a given axis. This 'cal' value is subtracted from every reading, centring all readings on that axis around zero. Once the cal value is applied, the reported maximum (most positive) and minimum (most negative) values, for each axis, should then be equal in value, but opposite in sign.

Cal values are saved in the `mag_calibration` CLI parameter. For example, `set mag_calibration = 35,-130,-75` will cause the heading code to subtract 35 from every X reading, add 130 to every Y reading, and add 75 ro every Z reading.

For the most accurate calibration results:

- calibrate the quad at, or close to, the intended flight location
- keep well away from external metallic or magnetic objects
- get a long USB cable and don't have magnetic objects on your body or in your pockets
- do several runs, and confirm that the cal values are consistent each time
- (expert only) validate that absolute min and max readings are equal on each axis
- consider removing the motors

:::note
Magnetic interference from nearby motors can affect calibration very badly. If the motors are turned slowly, and you see twitching of the quad icon on the main Configurator page, or significant changes in the Mag data in the sensors tab, you have a problem. In flight, these offsets should average out, but during calibration, they will not, and it's likely that you'll bump the motors while twisting it around during the cal process. This can lead to strangely different cal values on repeated testing, no matter how careful you are. The further away the motors are, and the further above or below the plane of the motors, the less of a problem this is. On some quads the only way to get an accurate Mag cal is to remove the motors.
:::

Calibration values, once acquired, typically do not need to be changed much within your local area. They may require updating or checking if you intend to fly a long way from home.

:::note
Calibration itself **DOES NOT** check that the orientation of the sensor is correct!
:::

### Calibration Using the 'Calibrate Magnetometer` Button in Configurator.

This method is the quickest and easiest way to calibrate the sensor. It's best to do several runs and to check that the Cal values are consistent.

The quad should be rotated on its axis, ideally so that each of the three axes of the magnetometer point directly into, and directly away from, the earth's local magnetic field, during the rotation process.

Samples will be analysed for 30s after initiating the cal process.

Best results are likely if you are aware of the the local field direction, and spin the quad in the plane of the field.

To know the local field direction, we need to know where North is, and what our local Declination angle is. The compass on your mobile phone can locate magnetic North, so long as the phone is configured to return Magnetic North (by default, they usually return 'true' North). Also, google the local Magnetic Inclination for your locality. Once you know where the field is pointing, rotating the quad relative to that frame of reference is likely to give consistent, accurate calibration values.

Assuming that the mag is physically mounted flat to the frame:

- orient the quad with the nose pointing to North, upwards at the declination angle, and the roll axis in the horizontal plane.
- Click the "Calibrate Magnetometer" button in Configurator.
- Rotate the quad on the roll axis 5-6 times (e.g. three times forward, three times back), so that the nose and tail, and the top and bottom of the quad, point straight into the field at some point.
- Yaw the quad 90 degrees, and rotate around the pitch axis three times forward, three times back.

Smoothly completing full rotations about every 1.5-2 seconds works best, but keep in mind that you only have 30s. A QMC5883L takes samples at 200hz and can be rotated fairly quickly, but some older mag units sample at only 10Hz, and calibration results using this method can be unreliable.

Check the `mag_calibration` CLI numbers after each run to see how consistent the values are. If each value is within 50 units of the last couple of runs, that's pretty good. Also check in the Sensors Tab that the Min and Max for each axis are approximately the same number.

:::tip
**CALIBRATING WITH STICKS:**
While disarmed, a Mag Calibration can be initiated with the following stick inputs:

- right stick straight dowm (pitch low with roll centred)
- left stick in the top right corner (throttle high and yaw fully right)

:::

:::warning
Take great care not to initiate a Mag Cal accidentally! If you fail to rotate the quad properly after a Cal starts, your old cal values will be lost, and the Mag data will be useless!
:::

It's also possible to do the calibration 'one axis at a time'. For example, if we want to get an accurate cal value for the X axis, wiggling the nose around in the general direction of Magnetic field North for some 12-13s, then rotating the quad 180 degrees, and wigging the tail into the field for the same period of time, should return an accurate Cal value for the X axis. The process must be repeated separately for Y and Z. Then you can type in the cal value for each axis into the CLI.

You'll only get accurate values if, while wiggling it around, if you truly point the axis directly into the field at some point. To be certain, switch to the Sensors tab while calibrating. You'll know that you've included the max positive and max negative X values when Y and Z are zero.

### Validating and Fine-Tuning the Mag Cal in Sensors Tab.

The accuracy of the calibration values can be validated by checking the absolute minimum and maximum values, for each axis, using Configurator's Sensors tab. With a 'perfect' calibration, the min and max for any individual axis should be numerically equal.

Start by pointing the nose of the quad directly into the magnetic field, at the correct declination angle (up into the sky in the Southern Hemisphere, downwards in the Northern hemisphere). Check the X axis numbers in the sensors tab. When the Y and Z values are zero, or close to zero, the X value will be biggest. This should happen when the nose of the quad is pointing directly North at the exact local declination angle. Write down the biggest positive value that you get. Then, rotate the quad 180 degrees, tail into the field and note the most negative value that you get. If the cal factor is 'perfect', these values will be equal, but opposite. Small differences can be ignored. If you are a perfectionist, you can adjust the cal value for X in the CLI, manually, and try again. This process can be repeated for each of the three axes.

Using the sensors tab in this manner to check max and min for each axis can also validate the accuracy of the existing calibration when flying in a new location. If max and min are very similar, you don't need to recalibrate.

This method also confirms that the orientation of the Mag is correct, by confirming max positive:

- on X, when the nose points into the field,
- on Y, when the left of the quad points into the field, and
- on Z, when the top of the quad points into the field

## What About My Heading Information and Signal Noise?

Heading information is provided to the quad by the GPS unit (course over ground), the IMU (gyro information while turning quickly), and the Mag unit. The IMU code uses 'sensor fusion' methods to integrate this data to a final 'attitude' or 'heading' value for the quad.

The current Heading is shown shown on the main front screen of Configurator, at the top left of the quad icon area. If Mag is enabled, the heading shown reflects Mag data. Otherwise it starts at 0 or 359 degrees, and changes when the frame is yawed.

If the code is built with GPS support, both the current Mag heading and the GPS course over ground heading are shown in Configurator's GPS tab.

In the OSD, heading can be shown as numerical values in degrees, or indicated graphically.

:::tip
If everything is working properly, the quad's icon, as shown in the main page of Configurator, should move without sudden jumps, once Mag is enabled. Sudden jumps after quick movements usually mean that the orientation is not correct.  
:::

If GPS working properly, and GPS Rescue enabled in the Failsafe tab, heading information from Mag can be logged in Debug 4 of the `GPS_RESCUE_HEADING` debug.

MagADC X, Y and Z values are always logged to Blackbox, and should be examined to ensure they are not really noisy. The noise should be much less than the signal. If noise is obviously an issue, mount the mag further away from the motors, and away from high-current wires, ensuring that the sensor is equidistant from pairs of motors, and check that there is adequate filtering on the power supply to the Mag module.

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

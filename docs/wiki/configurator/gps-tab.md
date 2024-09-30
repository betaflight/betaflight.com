---
sidebar_position: 12
---

# GPS Tab

Set up your GPS settings here. GPS is used in Betaflight for GPS Rescue and showing GPS Coordinates in the OSD.

![GPS tab](/img/betaflight_configurator_gps_tab.png)

## GPS Configuration

Here’s the revised table with the protocol options combined:

| **Option**                   | **Description**                                                                                                                                                                                                                                        |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Protocol**                 | The GPS protocol to use.<li>**UBLOX** - The most common GPS protocol; most GPS modules use this protocol.</li><li>**NMEA** - Use this for GPS modules that don't support UBLOX.</li><li>**MSP** - Use this for GPS modules that use MSP protocol.</li> |
| **Auto Config**              | Automatically configures the GPS settings; it is recommended to keep this enabled. Requires Betaflight 4.5 or newer for M10 GPS modules.                                                                                                               |
| **Use Galileo**              | Enable this if you want to use Galileo satellites; for most users, this should be enabled.                                                                                                                                                             |
| **Set Home Point Once**      | When enabled, only the first arm after the battery is connected will be used as the home point; if not enabled, every time the quad is armed, the home point will be updated.                                                                          |
| **Ground Assistance Type**   | The type of ground assistance to use; this should be set depending on your region.                                                                                                                                                                     |
| **Magnetometer Declination** | The declination of the magnetometer; only useful if you are using a GPS module with a magnetometer.                                                                                                                                                    |

## GPS Info

| **Option**                       | **Description**                                                                                                                   |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **3D Fix**                       | Whether the GPS has a 3D fix; required for GPS Rescue and showing GPS coordinates in the OSD.                                     |
| **Satellites**                   | The number of satellites the GPS is connected to.                                                                                 |
| **Altitude**                     | The altitude the GPS is reporting.                                                                                                |
| **Speed**                        | The speed the GPS is reporting.                                                                                                   |
| **Heading IMU / GPS**            | The heading the GPS is reporting.                                                                                                 |
| **Current Latitude / Longitude** | The current latitude and longitude the GPS is reporting.                                                                          |
| **Dist to home**                 | The distance to the home point.                                                                                                   |
| **Positional PDOP**              | The current [Dilution of Precision](<https://en.wikipedia.org/wiki/Dilution_of_precision_(navigation)>); a lower value is better. |

## GPS Signal Strength

In this section you can see the signal strength of the GPS satellites.

| **Option**          | **Description**                                                  |
| ------------------- | ---------------------------------------------------------------- |
| **Gnss ID**         | The GNSS ID of the satellite.                                    |
| **Sat ID**          | The Satellite ID of the satellite.                               |
| **Signal Strength** | A visual representation of the signal strength of the satellite. |
| **Status**          | Whether the satellite is used for the GPS fix.                   |
| **Quality**         | The quality of the signal.                                       |

## Current GPS location

This section shows a map with the current GPS location of the craft.

## Setting up GPS Rescue for Betaflight 4.5+

For more information about GPS changes in 4.5, see the [Wiki document](/docs/wiki/guides/current/Failsafe).

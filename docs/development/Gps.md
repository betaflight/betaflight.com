# GPS

GPS works best if the GPS receiver is mounted above and away from other sources of interference.

The compass/mag sensor should be well away from sources of magnetic interference, e.g. keep it away from power wires, motors, ESCs.

Two GPS protocols are supported. NMEA text and UBLOX binary.

## Enable GPS in BF Configurator

Enable the GPS from the CLI as follows:

1. [configure a serial port to use for GPS.](Serial)
1. set your GPS baud rate (leave it on AUTO if you are not sure)
1. enable the `feature GPS`
1. set the `gps_provider`
1. connect your GPS to the serial port configured for GPS.
1. save and reboot.

:::note

GPS packet loss has been observed at 115200. Try using 57600 if you experience this.

:::

For the connections step check the Board documentation for pins and port numbers.

### GPS Provider

Set the `gps_provider` appropriately, for example `set gps_provider=UBLOX`

| Value |
| ----- |
| NMEA  |
| UBLOX |

### GPS Auto configuration

When using UBLOX it is a good idea to use GPS auto configuration so your FC gets the GPS messages it needs.

Enable GPS auto configuration as follows `set gps_auto_config=ON`.

:::info

In Betaflight 4.5, Auto Config has been rewritten and it is recommended to use. It will work for most pilots.

:::

If you are not using GPS auto configuration then ensure your GPS receiver sends out the correct messages at the right frequency. See below for manual UBlox settings.

### SBAS

When using a UBLOX GPS the SBAS mode can be configured using `gps_sbas_mode`.

The default is AUTO.

| Value             | Region        |
| ----------------- | ------------- |
| AUTO              | Global        |
| EGNOS             | Europe        |
| WAAS              | North America |
| MSAS              | Asia          |
| GAGAN             | India         |
| SouthPAN (SPAN)\* | Australia     |

\*NOTE: Currently being rolled out, usable in beta mode (safety-of-life certification planned in 2028). SBAS is region specific, make sure to check if your area is covered by an SBAS, and your receiver is capable of processing the area-sepcific signal (not all SBAS receivers can work with all SBAS satellites).

If you use a regional specific setting you may achieve a faster GPS lock than using AUTO.

This setting only works when `gps_auto_config=ON`

## GPS Receiver Configuration

GPS units can either be configured using BF or manually.

### u-blox GPS automatic (BF) configuration

If `gps_auto_config=ON`, BF will go through several steps to automatically set up your GPS, taking into account whether it is connected to the configurator (enabling satellite view messages), and whether the module supports newer message types. If not, it will fall back to older message models automatically. Have a look in `gps.c`, in the `gpsInitUblox`method, in section `GPS_STATE_CONFIGURE`.

### u-blox GPS manual configuration

Modern GPS receivers can use the binary UBX protocol to communicate back and forth (in contrast to the old, plain-text NMEA protocol). They can also be configured what to do exactly - how often send a position signal, to include or not to include what satellites are in view, whether to calculate speed, and so on.

For our purposes, we want to receive the right amount of data (message types) frequently enough (rate) reliably (baud) using the right protocol (UBX) so we can calculate home-distance, our speed, altitude and so on.

#### Connecting the GPS module for configuration

Use the CLI `gpspassthrough` to enable connecting the GPS module through the FC. If you see random code being dumped to your console, it's working, close BF configurator and open the GPS software (below).

Note that some older boards will not provide +5V from USB to the GPS module, such as the SPRacingF3; if you are using `gpspassthrough` you may need to connect a BEC to the controller if your board permits it, or use a standalone UART adapter. Check your board documentation to see if your GPS port is powered from USB.

#### Configuring using u-blox u-center

You will need [u-blox u-center](https://www.u-blox.com/en/product/u-center) (Windows only). You can use either v1 or v2, their configuration view is a bit different, but they do essentially the same (we will use the old u-center here).

Once you enabled `gpspassthrough` and closed BF configurator, open u-center and connect to the FC (same port - but now the GPS module is directly routed through, BF is not active).

Display the View/Packet Console, which will display what type of messages are being received. We will need to both remove some (to spare resources), and add some. You can pause it using the lock icon to have a look at the incoming messages.

Display View/Configuration View.

Navigate to CFG (Configuration)

Select `Revert to default configuration`.
Click `Send`.

#### Port speed

At this point you might need to disconnect and reconnect at the default baudrate - probably 9600 baud.

Navigate to PRT (Ports)

Set `Target` to `1 - Uart 1`
Set `Protocol In` to `0+1` (NMEA and UBX)
Set `Protocol Out` to `0+1` (NMEA and UBX)
Set `Buadrate` to `57600` `115200` (NOTE: 115200 will often have intermittent connection problems)
Press `Send`

This will immediately "break" communication to the GPS. Since you haven't saved the new baudrate setting to the non-volatile memory you need to change the baudrate you communicate to the GPS without resetting the GPS. So `Disconnect`, Change baud rate to match, then `Connect`.

Click on `PRT` in the Configuration view again and inspect the packet console to make sure messages are being sent and acknowledged.

#### Message types to enable

Next, to ensure the FC doesn't waste time processing unneeded messages. Click on `MSG` and enable the following on UART1 alone with a rate of 1 (our rate will be set later to 10Hz, 10 messages / sec; rate 1 means for every tick, so every 100ms).

When changing message target and rates remember to click `Send` after changing each message:

| Message type | Rate | Description                                                                                                                                          |
| ------------ | ---: | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| NAV-PVT      |    1 | Navigation position velocity time solution, combines position, velocity and time solution, including accuracy figures.                               |
| NAV-DOP      |    1 | Dilution of precision, a dimensionless number that accounts for the contribution of relative satellite geometry to errors in position determination. |
| NAV-SAT      |   10 | Displays information about satellites that are either known to be visible or currently tracked by the receiver.                                      |

##### Fallback-only option if you GPS module does not support the above message types:

~~NAV-POSLLH NAV-DOP NAV-SOL NAV-VELNED~~
~~With the rate of 10, enable NAV-SVINFO to see what satellites are in view~~

Double check with the Packet View that you are only receiving the messages we wanted (if more, disable those you don't need; if less, make sure you enabled the ones above).

#### Rate of messages

Next change the global update rate, click `Rate (Rates)` in the Configuration view.

Set `Measurement period` to `100` ms.
Set `Navigation rate` to `1`.
Click `Send`.

This will cause the GPS receive to send the require messages out 10 times a second (10Hz). If your GPS receiver cannot be set to use `100`ms try `200`ms (5Hz) - this is less precise.

#### Dynamic Platform Model

:::info

After Betaflight 4.5 if Auto Config is enabled Dynamic Platform Models can be selected with
`set gps_ublox_acquire_model` and `set gps_ublox_flight_model` commands.

:::

Next change the mode, click `NAV5 (Navigation 5)` in the Configuration View.

Set to `Dynamic Model` to `Airborne <1g` and click `Send`.

This enables sanity checks for a maximum altitude of 50,000m, maximum vertical or horizontal speed of 100m/s. Any measurement outside these would invalidate the fix as they are not plausible.

Betaflight on auto-config will use `Stationary` before arming and `Airborne <4g` after arming.

It is recommended to use Airborne \<1g (see note), but consult the u-blox documentation for sanity checks.

From the [u-blox protocol specification](https://www.u-blox.com/en/product-resources?query=protocol&legacy=Current):

- Pedestrian - Applications with low acceleration and speed, e.g. how a pedestrian would move. Low acceleration assumed. MAX Altitude [m]: 9000, MAX Velocity [m/s]: 30, MAX Vertical, Velocity [m/s]: 20, Sanity check type: Altitude and Velocity, Max Position Deviation: Small.
- Portable - Applications with low acceleration, e.g. portable devices. Suitable for most situations. MAX Altitude [m]: 12000, MAX Velocity [m/s]: 310, MAX Vertical Velocity [m/s]: 50, Sanity check type: Altitude and Velocity, Max Position Deviation: Medium.
- Airborne < 1G - Used for applications with a higher dynamic range and vertical acceleration than a passenger car. No 2D position fixes supported. MAX Altitude [m]: 50000, MAX Velocity [m/s]: 100, MAX Vertical Velocity [m/s]: 100, Sanity check type: Altitude, Max Position Deviation: Large

:::note
The flight modes of 1G, 2G, 4G control the amount and type of filtering the module applies.

- 1G has a lot less filtering, and seemed generally fine for long range cruising. 1G would theoretically have more accurate position updates. But it would be more succeptible to rapid or jerky position changes.
Testing has shown that in this situation the module stops reporting a position if the amount of change exceeds the threshold.

- 4G has a lot more filtering. Opposite plus/minus, more accurate at high speeds or rapid position changes. More resistent to position changing all over the place, like when doing acrobatics. Less accurate at smooth flight.

- If 1G is the desired default to accommodate the probably more common long range use case with less dynamic flight, users should be advised to try 2G then 4G if they fly more dynamic as described.
:::

#### Satellite-Based Augmentation System (SBAS) settings

Click `SBAS (SBAS Settings)` in the Configuration View.

Set `Subsystem` to `Enabled`.
Set `PRN Codes` to `Auto-Scan` or select the specific PRN code for your region. [For instance, the PRN for SPAN is 122](https://www.gps.gov/technical/prn-codes/L1-CA-PRN-code-assignments-2019-Oct.pdf).

Click `Send`.

#### Enabling Global Navigation Satellite Systems (GNSS)

Click `GNSS (GNSS config)` in the Configuration View.

Most GPS modules support up to 3 concurrent GNSS systems.

Usually it is a good idea to enable GPS (Tick Configure, Enable, Signals).

If you live in Oceania (Japan/Australia line), the [Quasi-Zenith Satellite System (QZSS)](https://qzss.go.jp/en/overview/services/sv01_what.html) can help you to obtain higher accuracy, if your receiver supports it.

It is typically a good combination to enable GPS, Galileo, BeiDou, and either SBAS or QZSS. Check what satellites are mostly available where you live using a [GNSS View](https://app.qzss.go.jp/GNSSView/gnssview.html).

Click `Send`. Make sure your configuration was saved (the checkboxes are ticked as needed). The module might reject certain combinations.

#### Save (persist) the configuration

So far all changes are in the RAM only, we want to save them to permanent storage on the GPS module.

Click `CFG (Configuration` in the Configuration View.

Select `Save current configuration` and click `Send`.

## Hardware

There are many GPS receivers available on the market.
Below are some examples of user-tested hardware.

### Ublox

#### NEO-M8

| Module                   | Comments                                                                                                                                                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| U-blox Neo-M8N w/Compass | Pinout can be found in Pixfalcon manual. SDA and SCL can be attached to I2C bus for compass, TX and RX can be attached to UART for GPS. Power must be applied for either to function.                              |
| Reyax RY825AI            | NEO-M8N, 18Hz UART USB interface GPS Glonass BeiDou QZSS antenna module flash. [eBay](http://www.ebay.com/itm/RY825AI-18Hz-UART-USB-interface-GPS-Glonass-BeiDou-QZSS-antenna-module-flash/181566850426)           |
| mRo uGPS w/ LIS3MDL      | Ultra compact and weights just 7.7 grams. Multiple constellation capabilities (GPS and GLONASS). Includes JST-GH pigtail. Available from [mRobotics](https://store.mrobotics.io/product-p/mro-ugps-samm8q-01.htm). |

#### NEO-7

| Module                  | Comments                                                                                                                                                                                                                                             |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| U-blox Neo-7M w/Compass | [HobbyKing](http://www.hobbyking.com/hobbyking/store/__55558__Ublox_Neo_7M_GPS_with_Compass_and_Pedestal_Mount.html) You have to set align_mag in the CLI to get the magnetometer working correctly: `set align_mag = 8` and don't forget to `save`. |

#### NEO-6

| Module                        | Comments                                     |
| ----------------------------- | -------------------------------------------- |
| Ublox NEO-6M GPS with Compass | [eBay](http://www.ebay.com/itm/111585855757) |

### Serial NMEA

#### MediaTek

| Module   | Comments                                                                                                                                                                                                                                                                                                         |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MTK 3329 | Tested on hardware serial at 115200 baud (default) and on softserial at 19200 baud. The baudrate and refresh rate can be adjusted using the MiniGPS software (recommended if you lower the baudrate). The software will estimate the percentage of UART bandwidth used for your chosen baudrate and update rate. |

# SoftSerial

Softserial provides a means to add another 'virtual' UART on MCU's with a limited number of pinned-out true UART ports, eg F411's.

Softserial is most useful for providing a single extra Tx pin on the FC for single-wire data streams, eg:

- Analog VTx control (SmartAudio, Tramp etc).
- S.Port Telemetry (FrSky), a bi-directional single-wire interface.
- Serial ESC Telemetry.

Softserial can also be used to assign one of a hardware UART's pins to a separate function.

:::note

**Changes in Betaflight 4.5**

- in the CLI, use `RESOURCE SOFTSERIAL_TX1 <pin>` to configure Softserial 1's Tx line.
- Softserial can no longer be used for MSP connections.
- Softerial now has a hard limit of 19200 baud.

:::

When using Softserial, please note the following:

- Softserial should not be used above 19200 baud (not possible in Betaflight 4.5)
- Softserial should not be used for MSP connections such as HD OSDs (not possible in Betaflight 4.5)
- Softserial may not work with some serial devices.
- Only two Softserial UARTs may be used at any one time.
- The baud rate on all Softserial ports must be the same.
- It is always better to use a hardware UART if one is available.

:::warning

Softserial must not be used for serial Radio Control receivers.

Softserial typically requires a 4k PID loop even on high performance MCU's.

:::

This table summarises possible usage situations:

| Purpose                                                   | Notes                                                                                  |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Serial Radio Control Receiver                             | Do not use Softserial, use a real UART                                                 |
| MSP Configuration using Bluetooth                         | Do not use Softserial, use a real UART; not permitted in 4.5                           |
| HD OSD over MSP (displayport)                             | Do not use Softserial, use a real UART; not permitted in 4.5                           |
| GPS Rescue or GPS for position hold                       | Do not use Softserial, use a real UART                                                 |
| GPS for position data at 1-2 Hz                           | See notes below                                                                        |
| Blackbox over serial port                                 | Do not use Softserial, use a real UART                                                 |
| Analog Vtx Control (SmartAudio, Tramp)                    | Assign a Softserial Tx pin; one-way data from FC to VTx                                |
| HD Vtx Control/OSD over MSP                               | Assign a Softserial Tx pin, keep the OSD simple, use 4k PID loop; not permitted in 4.5 |
| Single-wire communication protocols like S.Port telemetry | Assign a Softserial Tx pin, should be OK provided that the data rate is not excessive  |
| ESC serial telemetry                                      | Assign a Softserial Rx pin, should be OK provided that the data rate is not excessive  |
| Camera control                                            | Assign a Softserial Tx pin; may require hardware resistor to work                      |

:::info

Smartport does not work over Softserial on 19200 baudrate.
<br />
With all limitation mentioned before we have provided a define to override the limitation using `OVERRIDE_SOFTSERIAL_BAUDRATE` custom define to be used when flashing firmware 4.5 or beyond. Note that the new `LOAD` flag arming disable flag would prevent arming when it surpasses the threshold.
<br />
**ANY ISSUES WHILE USING THIS DEFINE WILL NOT BE SUPPORTED.**

:::

### Softserial with GPS

GPS modules can be used for two quite different purposes:

- to collect data such as latitude, longitude, altitude, speed etc, at low data rates, eg 1-2 Hz, to assist with finding the quad if it is lost, or to log flight paths.
- for GPS Rescue and position hold purposes, where data is typically received at 10Hz.

For simple position data, if the GPS module has been pre-configured, in uCenter or pyGpsClient, to power up at a low baud rate, eg 19200 baud, or 9600 baud, and to send position data values alone at 1Hz, then Betaflight only needs a single Rx pin to receive that data. This can be a softserial pin. In the GPS tab, auto-configuration _must_ be disabled. The baud rate for the softserial port must be set to match the GPS's power up baud rate. Test first with a real Rx pin and be absolutely certain you are not sending unwanted data, eg satellite position information. You should not expect to see a satellite list in Configurator, only Latitude, Longitude, Altitude, etc. If this works on a real Rx pin, then test it on on a Softserial pin.

For GPS Rescue purposes, Softserial cannot successfully handle auto-configuration of the GPS Module. To auto-configure the GPS, Betaflight requires both an Rx and a Tx line to the GPS module.The default baud rate of many modern GPS modules is 57600, which is too high for Softserial. Hence auto-configuration is likely to fail.

If auto-configuration is disabled, the GPS must be manually configured to boot up with the following settings:

- baud rate 19200
- send Nav_PVT data, nothing else, at 2 Hz.
  It can then be connected to a single Softserial Rx pin on the FC at 19200 baud. With only 2Hz data rates, rescues may be very jerky and unreliable. Don't take chances, use a real UART.

### Softserial with HD OSD (displayport) over MSP

In 4.5, the use of softserial for MSP connections, including for HD OSD's is not permitted.

It is possible, but not recommended, to use softserial for MSP ports in 4.4 and earlier. Both a Tx and an Rx pin must be defined. The data rate with anything but the simplest OSD would likely overwhelm the connection. Note that softserial is limited to 19200 baud so don't use rates above that.

### Enabling Softserial

Softserial requires custom CLI commands. An unused pin with an associated timer must be found. The most common are PPM or LED_STRIP pins. Not all such pins will work on all boards, and you may need to do some research about using softserial on your board before you can make it work.

First go to the CLI and type `resource`, to get a list of the currently assigned pin numbers for each of the currently available pads on the device.

If, for instance, a `LED_STRIP 1` pin is assigned to `A15`, and there is a LedStrip pad on the board, and you are not using it, you could de-assign that pin from `LED_STRIP 1` with the CLI command:

`resource led_strip 1 none`

Then the pin can be assigned to the Softserial Port 1 Tx pin. The commands have changed:

- in Betaflight 4.5 and higher: `RESOURCE SOFTSERIAL_TX 1 A15`
- in Betaflight 4.4 and lower: `RESOURCE SERIALTX 11 A15`

If the resource reassignment is successful, a `diff` command in CLI for 4.5 will show:

```
resource LED_STRIP 1 NONE
resource SOFTSERIAL_TX 1 A15
```

Note:

- a `diff` command in CLI will show changes from the default resource configuration
- `resource show all` in CLI will provide a full list of all serial ports, timers etc.
- just because the resources are re-assigned, it does not mean that the Softserial port will work properly.

Oscar Liang provides a good summary of [how to set up softserial](https://oscarliang.com/betaflight-soft-serial/). Remember that the commands have changed in Betaflight 4.5.

### The CLI Serial command.

When Softserial is active, the `serial` CLI command will show all configured serial ports. A line starting with 30 refers to Softserial port 1, and one starting with 31 refers to Softserial port 2.

For example, if Softserial is configured for SmartAudio on Softserial port 1 Tx pin, a line like this should appear when the `serial` command is sent:

```
serial 30 2048 115200 57600 0 115200
```

For more information, see the [Serial page](/docs/development/Serial) in the Development section.

### Historical notes:

For historical information about Softserial is available in the [Wiki Guides Archive](/docs/wiki/guides/archive/Single-Wire-Software-Serial).

# SoftSerial

Softserial provides a means to add another 'virtual' UART on MCU's with a limited number of pinned-out true UART ports, eg F411's.

When using Softserial, keep in mind that:

- Softserial is limited to 19200 baud and works best at 9600baud
- Softserial cannot be used with all serial devices
- Only two Softserial UARTs may be used at any one time
- The baud rate on all Softserial ports must be the same
- It is always better to use a hardware UART if one is available

Softserial is effective for providing a single extra Tx pin on the FC for single-wire data streams, eg :

- Analog VTx control (SmartAudio, Tramp etc)
- S.Port Telemetry (FrSky), a bi-directional single-wire interface.

Softserial can also be used to assign one of hardware UART's pins to a separate function.

:::warning

Softserial must not be used for:

- serial RC control receivers
- MSP connections such as bluetooth dongles, MSP HD OSD connections; these are not permitted in 4.5.

Softserial typically requires a 4k PID loop even on high performance MCU's.

:::

This table summarises possible usage situations:

| Purpose                                                   | Notes                                                                                  |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Serial RC Receiver                                        | Do not use Softserial, use a real UART                                                 |
| MSP Configuration using Bluetooth                         | Do not use Softserial, use a real UART; not permitted in 4.5                           |
| GPS Rescue or GPS for position hold                       | Do not use Softserial, use a real UART                                                 |
| Blackbox over serial port                                 | Do not use Softserial, use a real UART                                                 |
| Analog Vtx Control                                        | Assign a Softserial Tx pin; one-way data from FC to VTx                                |
| HD Vtx Control/OSD over MSP                               | Assign a Softserial Tx pin, keep the OSD simple, use 4k PID loop; not permitted in 4.5 |
| Single-wire communication protocols like S.Port telemetry | Assign a Softserial Tx pin, should be OK provided that the data rate is not excessive  |
| GPS for position data at 1Hz                              | See notes below                                                                        |
| Camera control                                            | Assign a Softserial Tx pin; may require hardware resistor to work                      |

### Softserial with GPS

Generally, softserial is not recommended for GPS connections.

GPS modules can be used for two quite different purposes:

- to collect data such as latitude, longitude, altitude, speed etc, at low data rates, eg 1-2 Hz, to assist with finding the quad if it is lost, or to log flight paths.
- to get data at higher data rates, eg 10hz, for GPS Rescue and position hold purposes.

For simple position data, if the GPS module has been pre-configured, in uCenter or pyGpsClient, to power up at a low baud rate, eg 19200 baud, or 9600 baud, and to send position data values alone at 1Hz, then Betaflight only needs a single Rx pin to receive that data. This can be a softserial pin. In the GPS tab, auto-configuration _must_ be disabled. The baud rate for the softserial port must be set to match the GPS's power up baud rate. Test first with a real Rx pin and be absolutely certain you are not sending unwanted data, eg satellite position information. You should not expect to see a satellite list in Configurator, only Latitude, Longitude, Altitude, etc. If this works on a real Rx pin, then test it on on a Softserial pin.

We strongly discourage the use of SoftSerial for GPS Rescue purposes.

When the GPS is for GPS Rescue purposes, Betaflight requires bi-directional communication with the GPS module during the auto-configuration phase, so that we can set the module's baud rate, data rate, and request only the data we need. To auto-configure the GPS requires both Rx and Tx lines. For most modern GPS modules, the defdault baud rate is 57600, which is too high for a two-wire Softserial setup to work with. As a result, auto-configuration is likely to fail. With auto-configuration disabled, a manually-configured GPS, connected to a single Softserial Rx pin on the FC at 19200 baud and 2Hz may work, but the rescues would very jerky and unreliable. Don't take chances, use a real UART.

### Softserial with HD OSD (displayport) over MSP

In 4.5, the user of softserial for MSP connections is not permitted.

It is possible, but not recommended, to use softserial for MSP ports in 4.4 and earlier. Both a SoftserialTx and an Softserial Rx pin must be defined. The data rate with anything but the simplest OSD would likely overwhelm the connection. Note that softserial is limited to 19200 baud so don't use rates above that.

### Enabling Softserial

:::note

The new command for assigning a pin to Softserial 1 in Betaflight 4.5 and higher is:
`RESOURCE SOFTSERIAL_TX 1 <pin>`

For Betaflight 4.4 and earlier the equivalent command would be:
`RESOURCE SERIALTX 11 <pin>`

:::

Softserial requires custom CLI commands. An unused pin with an associated timer must be found, where the original purpose no longer is needed. The most common are PPM or LED_STRIP pins. Not all such pins will work on all boards, and you may need to do some reseach about using softserial on your board before you can make it work.

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

- `serialTx` and `serialRx` settings of 11 and 12 are used to configure pins to Softserial ports 1 and 2 respectively.
- a `diff` command in CLI will show changes from the default resource configuration
- `resource show all` in CLI will provide a full list of all serial ports, timers etc.
- just because the resources are re-assigned, it does not mean that the Softserial port will work properly.

Oscarliang provides a good summary of [how to set up softserial](https://oscarliang.com/betaflight-soft-serial/).

### The CLI Serial command.

When Softserial is active, the `serial` CLI command will show the configured serial ports, and a line starting with 30, for Softserial port 1, or 31, for Softserial port 2, will appear.

For example, if Softserial is configured for smartAudio on port 1, a line like this should appear when the `serial` command is sent:

```
serial 30 2048 115200 57600 0 115200
```

For more information, see the 'Serial' page in the Development section.

### Historical notes:

The following notes are quite old, and may not be relevant to current versions of Betaflight. They illustrate commands for versions 4.4 and earlier.

CLI commands to assign softserial ports 1 and 2:

`resource serial_tx 11 <pin>`
`resource serial_rx 11 <pin>`

`resource serial_tx 12 <pin>`
`resource serial_rx 12 <pin>`

Example; if motors 5 and 6 are not used:

`resource MOTOR 5 NONE`

`resource MOTOR 6 NONE`

:::note

- When assigning softserial pins, the OK means it is compatible, and does not warrant it will work when it is configured as a part of a complete system.

:::

### Software Serial List of compatible pins

OMNIBUS(F3) (by @jflyper)

| Pin | Label     | S.Audio | Tramp | S.Port | Note                                            |
| --- | --------- | ------- | ----- | ------ | ----------------------------------------------- |
| A8  | LED strip | NG      | NG    | NG     |                                                 |
| B4  | PPM (\*1) | OK      | ?     | OK     | When PPM not in use                             |
| B6  | PWM8/SCL  | OK      | OK    | OK     | I2C must be de-configured? Need furthe testing. |
| B7  | PWM7/SDA  | OK      | ?     | ?      | Ditto                                           |

@olexs: B07 (PWM7/SDA) works with S.Audio on 3.2, no extra config needed (I2C resources aren't mapped per default).

---

OMNIBUSF4 (by @jflyper)

| Pin | Label | S.Audio | Tramp | S.Port | Note                      |
| --- | ----- | ------- | ----- | ------ | ------------------------- |
| A1  | PWM5  | OK      | ?     | OK     |                           |
| A8  | PWM6  | OK      | OK    | ?      | Tramp report by @llambkin |
| B14 | PPM   | OK      | ?     | ?      |                           |
| B15 | CH2   | OK      | ?     | ?      |                           |
| C8  | CH5   | OK      | ?     | ?      |                           |
| C9  | CH6   | OK      | ?     | ?      |                           |

---

OMNIBUSF4SD (by @jflyper, @antonig)

| Pin | Label | S.Audio       | Tramp      | S.Port        | Note                                                                                             |
| --- | ----- | ------------- | ---------- | ------------- | ------------------------------------------------------------------------------------------------ |
| A9  | TX1   | OK            | ?          | OK @stsa64    | @stsa64: Smartport does not work if running Tramp on A8 (PWM6) via softserial (timer conflict??) |
| A1  | PWM5  | OK @basdelfos | OK @stsa64 | OK @basdelfos |                                                                                                  |
| A8  | PWM6  | OK            | OK         | OK            |                                                                                                  |
| B14 | PPM   | ?             | ?          | ?             |                                                                                                  |
| B15 | CH2   | ?             | ?          | ?             |                                                                                                  |
| C8  | CH5   | ?             | ?          | ?             |                                                                                                  |
| C9  | CH6   | ?             | ?          | ?             |                                                                                                  |

---

SPRACINGF3 (by @jflyper)

| Pin | Label             | S.Audio | Tramp | S.Port | Notes                  |
| --- | ----------------- | ------- | ----- | ------ | ---------------------- |
| A0  | IO_1[3] PPM/CH1   | OK      | ?     | ?      | When PPM is not in use |
| A1  | IO_1[4] CH2       | OK      | ?     | ?      | When PPM is not in use |
| B4  | IO_1[5] CH5       | OK      | OK    | ?      |                        |
| B5  | IO_1[6] CH6       | OK      | ?     | ?      |                        |
| A8  | IO_1[7] LED strip | OK      | ?     | ?      |                        |
| B0  | IO_2[5] CH7       | OK      | ?     | ?      |                        |
| B1  | IO_2[6] CH8       | OK      | ?     | ?      |                        |
| B8  | M5                | NG      | ?     | NG     | TIM4 crash with M3&M4  |
| B9  | M6                | NG      | ?     | ?      | TIM4 crash with M3&M4  |
| A2  | M7                | OK      | OK    | ?      |                        |
| A3  | M8                | OK      | OK    | ?      |                        |

Note: Some reports CH1 and CH2 not working: (https://github.com/betaflight/betaflight/issues/2532#issuecomment-284669276)

---

SPRACINGF3EVO

| Pin | Label     | S.Audio | Tramp | S.Port | Notes     |
| --- | --------- | ------- | ----- | ------ | --------- |
| A8  | LED strip | NG      | NG    | ?      | @pafleraf |
| B1  | M8        | OK      | OK    | OK     | @pafleraf |

Note: Soft Serial for this target is disabled in bf 3.1.7. However, it works with bf 3.2.0 nightly as of today (2017-05-13)

---

REVOLT

| Pin | Label | S.Audio | Tramp | S.Port | Notes                                    |
| --- | ----- | ------- | ----- | ------ | ---------------------------------------- |
| B6  | LED   | ?       | ?     | NG     | @alenl2; Need further testing            |
| C1  | CRNT  | ?       | ?     | NG     | @alenl2; No timer?                       |
| A9  | TX1   | ?       | ?     | NG     | @alenl2; Timer conflict? (need checking) |
| A10 | RX1   | ?       | ?     | NG     | @alenl2; Timer conflict? (need checking) |
| B10 | TX3   | ?       | ?     | NG     | @alenl2; Timer conflict? (need checking) |
| B11 | RX3   | ?       | ?     | NG     | @alenl2; Timer conflict? (need checking) |
| C6  | TX6   | ?       | ?     | OK     | @alenl2                                  |
| C7  | RX6   | ?       | ?     | OK     | @alenl2                                  |

---

KISS (KISSFC)

| Pin | Label | S.Audio      | Tramp | S.Port                | Notes      |
| --- | ----- | ------------ | ----- | --------------------- | ---------- |
| A13 | PWM5  | OK (@alenl2) | ?     | NG @basdelfos/@alenl2 |            |
| A02 | PITCH | NG (@alenl2) | ?     | OK @basdelfos/@alenl2 |            |
| A15 | ROLL  | ?            | ?     | OK                    | @basdelfos |

---

BLUEJAYF4

| Pin | Label | S.Audio | Tramp | S.Port | Notes      |
| --- | ----- | ------- | ----- | ------ | ---------- |
| B00 | ?     | NG (v1) | ?     | NG     | staryk@rcg |
| B01 | ?     | NG (v1) | ?     | NG     | staryk@rcg |

---

IRCFUSIONF3

| Pin | Label | S.Audio | Tramp | S.Port | Notes                  |
| --- | ----- | ------- | ----- | ------ | ---------------------- |
| A00 | PPM   | ?       | ?     | OK     | When PPM is not in use |

---

BETAFLIGHTF3

| Pin | Label           | S.Audio | Tramp | S.Port | Notes  |
| --- | --------------- | ------- | ----- | ------ | ------ |
| B01 | Soft Serial TX1 | OK (v1) | ?     | ?      | @iwarp |
| A02 | Soft Serial TX2 | NG (v1) | ?     | ?      | @iwarp |
| B07 | PPM             | OK (v1) | ?     | ?      | @iwarp |

http://i.imgur.com/Mh41SmG.jpg

Note (2017-07-27) by @jflyper: BETAFLIGHTF3 had a timer assignment problem with pre-3.2 firmware. It is fixed with 3.2, and PB01 and A02 should work as software serial --- need to be verified
(29/10/17) by @iwarp B01 confirmed working on 3.2.1

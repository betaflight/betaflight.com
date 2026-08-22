# Serial

Betaflight has enhanced serial port flexibility but configuration is slightly more complex as a result.

Betaflight has the concept of a function (MSP, GPS, Serial RX, etc) and a port (VCP, UARTx, SoftSerial x, LPUART1).
Not all functions can be used on all ports due to hardware pin mapping, conflicting features, hardware, and software constraints.

## Serial Port Types

- USB Virtual Com Port (VCP) - USB pins on a USB port connected directly to the processor without requiring
  a dedicated USB to UART adapter. VCP does not 'use' a physical UART port.
- UART - A pair of dedicated hardware transmit and receive pins with signal detection and generation done in hardware.
- SoftSerial - A pair of hardware transmit and receive pins with signal detection and generation done in software.
- PIOUART - A UART implemented on the RP2350's programmable IO (PIO) blocks. Like a hardware UART from the configuration point of view, but it consumes PIO state machines rather than a dedicated UART peripheral.
- LPUART - A "Low Power" UART format available on G4 and other MCU's is supported by Betaflight 4.5 and higher. By default, LPUARTs are limited to 9600 Baud, but Betaflight reconfigures them to work just like a normal UART. Typically there is only one LPUART, LPUART1. It's pin assignment can be configured using `RESOURCE SERIAL_TX 11 <pin>` and `RESOURCE SERIAL_TX 11 <pin>` in the CLI.

A "real" UART is the most efficient in terms of CPU usage.
SoftSerial is the least efficient and slowest. SoftSerial should only be used for low-bandwidth, low-priority applications, such as sending or receiving telemetry data.

If the flight controller does not have an on-board USB to UART converter and doesn't support VCP, connecting a computer to the board will not be possible unless a UART is set to MSP. A USB to UART adapter may then be used with that UART to connect to Configurator.

USB to serial adapter boards are sometimes referred to as FTDI boards. FTDI is just a common manufacturer of a chip (the FT232RL) used on many USB to UART boards.

When selecting a USB to UART adapter, choose one that has DTR exposed as well as a selector for 3.3v and 5v since they are more useful.

Drivers will usually need to be installed to suit the adapter's chipset.

Examples:

- [FT232RL FTDI USB To TTL Serial Converter Adapter](https://www.google.com/search?q=FT232RL+FTDI+USB+To+TTL+Serial+Converter+Adapter)
- [USB To TTL / COM Converter Module CP2102](https://www.google.com/search?q=USB+To+TTL+%2F+COM+Converter+Module++CP2102)

Both SoftSerial and UART ports can be connected to your computer via USB to UART converter boards. In general, SoftSerial ports should not be used for this purpose, and Betaflight 4.5 and higher will not allow SoftSerial ports to be used for MSP connections.

## Serial Configuration

Serial port configuration is best done via the configurator.

Configure serial ports first, then enable/disable features that use the ports. To configure SoftSerial ports the SOFTSERIAL feature must be enabled.

### Per-Feature Port Assignment (Firmware 2026.12 / MSP API 1.49) {#per-feature-port-assignment}

Up to and including firmware 2025.12, serial configuration was stored **per port**: every port carried a function bitmask plus four baud rates, and the `serial` CLI command wrote it.

From firmware 2026.12 (MSP API 1.49) that relationship is inverted. Every **feature** stores the port it uses in its own setting, together with its own baud rate where the protocol does not fix one. Ports themselves no longer store anything.

What this changes in practice:

- `serial` is now a **read-only** command. It still prints the familiar six-column view, but that view is synthesised on the fly from the per-feature settings.
- `diff` and `dump` no longer emit `serial` lines. Port assignments appear as ordinary `set` lines instead.
- Pasting a `serial` line from an older diff is rejected with `###ERROR IN serial: READ ONLY, ASSIGN PORTS WITH THE <FEATURE>_UART SETTINGS###`. Port assignments from an older configuration have to be re-created with the settings below.
- The MSP write commands `MSP_SET_CF_SERIAL_CONFIG` (55) and `MSP2_COMMON_SET_SERIAL_CONFIG` (0x100A) have been **removed**, as has the `MSP_PASSTHROUGH_SERIAL_FUNCTION_ID` (`0xFE`) mode of `MSP_SET_PASSTHROUGH` (245), which selected a passthrough port by function rather than by identifier. The read commands `MSP_CF_SERIAL_CONFIG` (54) and `MSP2_COMMON_SERIAL_CONFIG` (0x1009) remain and synthesise their reply from the feature settings, so existing tools can still read the port layout. Writing is done through the CLI over MSP.

#### Port Names

Every `*_uart` setting takes a port **name**, not a number:

`NONE`, `VCP`, `UART0` … `UART15`, `LPUART1`, `SOFT1`, `SOFT2`, `PIOUART0` … `PIOUART9`

Note the SoftSerial ports are named `SOFT1` and `SOFT2` — `SOFTSERIAL1` is not accepted.

Only ports the target actually has are accepted — `get <setting>` lists the valid names for the board in front of you. `NONE` leaves the feature unassigned.

#### Feature Settings

| Setting                                  | Assigns                                                     | Baud rate setting                                     |
| ---------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------- |
| `msp_uart_1`, `msp_uart_2`, `msp_uart_3` | MSP / CLI ports                                             | `msp_baud_1` … `msp_baud_3` (default `115200`)        |
| `rx_uart`                                | Serial RX                                                   | fixed by `serialrx_provider`                          |
| `gps_uart`                               | GPS                                                         | `gps_baud` (default `57600`), or `gps_auto_baud = ON` |
| `blackbox_uart`                          | Blackbox serial logging                                     | `blackbox_baud` (default `115200`)                    |
| `telemetry_1_uart` … `telemetry_3_uart`  | Telemetry slot, protocol chosen by `telemetry_<n>_protocol` | `telemetry_1_baud` … `telemetry_3_baud`               |
| `esc_sensor_uart`                        | ESC telemetry                                               | fixed at `115200`                                     |
| `vtx_uart`                               | VTX control (SmartAudio / Tramp / MSP VTX)                  | fixed by the VTX protocol                             |
| `osd_uart`                               | FrSky OSD, when `osd_displayport_device = FRSKYOSD`         | fixed by the protocol                                 |
| `osd_custom_text_uart`                   | OSD custom serial text                                      | `osd_custom_text_baud` (default `115200`)             |
| `rangefinder_uart`                       | Serial rangefinder, driver chosen by `rangefinder_hardware` | fixed by the driver                                   |
| `opticalflow_uart`                       | Optical flow, driver chosen by `opticalflow_hardware`       | fixed by the driver                                   |
| `rcdevice_uart`                          | RCDevice / FPV camera control                               | fixed by the protocol                                 |
| `gimbal_uart`                            | Gimbal control                                              | fixed by the protocol                                 |

:::note

Assigning the port and selecting the device are two separate settings. `rangefinder_uart` only says _where_ the rangefinder is; `rangefinder_hardware` says _what_ it is. The same applies to `opticalflow_uart` / `opticalflow_hardware`, and to `osd_uart` / `osd_displayport_device`. Clearing a port does not change the hardware selection.

:::

#### Telemetry Slots

Telemetry is configured as a set of slots, three by default. Each slot is a protocol, a port and a baud rate:

```
set telemetry_1_protocol = SMARTPORT
set telemetry_1_uart = UART6
```

- `telemetry_<n>_protocol` accepts `NONE`, `FRSKY_HUB`, `HOTT`, `LTM`, `SMARTPORT`, `MAVLINK` and `IBUS`. The list is not filtered per build: selecting a protocol the firmware was not built with is accepted, but nothing claims the port and the slot silently does nothing.
- The number of slots is capped at the number of telemetry protocols the build actually contains, so a cut-down build may expose fewer than three.
- CRSF and GHST telemetry ride the receiver's own port and never occupy a slot.
- A protocol may only be used once. If two slots name the same protocol and the earlier one has a port assigned, the later one is cleared on boot. Two slots naming the same protocol with the earlier one left at `NONE` both survive.
- Only LTM and MAVLink honour `telemetry_<n>_baud`. FrSky Hub, HoTT, SmartPort and iBus run at rates fixed by the protocol. `AUTO` means "let the protocol pick", which is `19200` for LTM and `57600` for MAVLink.

#### MSP Slots

MSP works the same way, with `msp_uart_1` … `msp_uart_3` and matching `msp_baud_<n>`. On a freshly flashed board the first available port — VCP where the board has one — always claims slot 1, so the flight controller stays reachable.

There are exactly **three** slots. The `MAX_MSP_PORT_COUNT` custom define still sizes the internal array, but the CLI only defines settings for slots 1 to 3, so raising it above 3 no longer gives you extra assignable MSP ports the way it did before 2026.12.

`AUTO` is not a valid MSP baud rate; a slot left at `AUTO` opens at `115200`.

A rangefinder or optical flow module that reports over MSP (the MTF01/MTF02 family) needs an MSP port on the UART it is assigned to, even though no MSP slot names that port. The firmware opens one automatically, outside the `msp_uart_<n>` budget, so declaring such a sensor can never cost you a Configurator link.

#### Validation and Recovery

On boot the stored assignment is checked:

- The VCP port, where the board has one, must carry MSP.
- There must be at least one, and at most `MAX_MSP_PORT_COUNT`, MSP ports.
- The functions landing on any one port must be able to coexist.

If that check fails, the firmware first clears only the claims on the ports that actually conflict, sparing MSP so the board stays reachable, and re-checks. Only if the configuration is still invalid does it clear every feature's port assignment and put MSP back on the first port. One bad assignment therefore costs you that port rather than every port on the board.

Functions on one port are rejected as conflicting when:

- MSP or serial RX is placed on a SoftSerial port.
- MSP VTX is alone on a port — it has to share with MSP or with serial RX.
- Two or more functions share a port in any combination other than the two permitted ones below.

The permitted combinations are:

- **MSP** together with any of blackbox, telemetry, MSP VTX or a serial rangefinder.
- **Serial RX** together with FrSky Hub, LTM or MAVLink telemetry, and only when `serialrx_provider` is one of `SPEKTRUM1024`, `SPEKTRUM2048`, `SBUS`, `SUMD`, `SUMH`, `XBUS_MODE_B`, `XBUS_MODE_B_RJ01`, `IBUS` or `MAVLINK`. iBus telemetry may also share with an iBus receiver, and MSP VTX with any serial RX. CRSF, GHST and F.Port receivers cannot share their port with a telemetry slot — they carry telemetry over the receiver protocol itself.

#### Examples

```
# receiver on UART2
set rx_uart = UART2

# GPS on UART4 at 115200
set gps_uart = UART4
set gps_baud = 115200

# SmartPort telemetry on UART6
set telemetry_1_protocol = SMARTPORT
set telemetry_1_uart = UART6

# a second MSP port on UART1, e.g. for MSP DisplayPort goggles
set msp_uart_2 = UART1
set msp_baud_2 = 115200

# free a port again
set gps_uart = NONE

save
```

### Constraints

If the configuration is invalid the serial port configuration will reset to its defaults and features may be disabled. From firmware 2026.12 only the conflicting ports are cleared first — see [Validation and Recovery](#validation-and-recovery) above.

- There must always be a port available to use for MSP/CLI.
- The default number of MSP ports is 3. Starting with firmware 2025.12, you can use a custom define to add additional msp ports.
  e.g. When flashing, in the Build Configuration section, add a custom define of "MAX_MSP_PORT_COUNT=n" where n equals the number of ports, not to exceed 6.
- To use a port for a function, the function's corresponding feature must be also be enabled.
  e.g. after configuring a port for GPS enable the GPS feature.
- If SoftSerial is used, then all SoftSerial ports must use the same baudrate.
- Softserial is limited to 19200 baud.
- Most telemetry protocols run at a rate fixed by the protocol and ignore the configured baud rate. Only LTM and MAVLink honour it — `telemetry_<n>_baud` from firmware 2026.12, the telemetry baud column before that.
- MSP/CLI can be shared with blackbox, telemetry, MSP VTX or a serial rangefinder. In shared mode blackbox or telemetry will be output only when armed.
- Serial RX can be shared with telemetry, subject to the receiver protocol restrictions listed under [Validation and Recovery](#validation-and-recovery).
- No other serial port sharing combinations are valid.
- You can use as many different telemetry systems as you like at the same time.
- You can only use each telemetry system once. e.g. FrSky telemetry cannot be used on two port, but MSP Telemetry + FrSky on different ports is fine.

### The Legacy `serial` View

:::warning

From firmware 2026.12 (MSP API 1.49) `serial` is read-only and takes no arguments. The layout below describes what it prints, and what MSP API 1.48 and earlier accepted as input. To change port assignments, use the [per-feature settings](#per-feature-port-assignment) above.

:::

On firmware 2025.12 and earlier (MSP API 1.48 and earlier) the `serial` command wrote the configuration and took 6 arguments. The syntax and the examples in this section describe that historical behaviour — on 2026.12 and later they are rejected. They are documented here because `serial` still **prints** in this format, and because older diffs and guides use it.

The `serial` CLI command takes 6 arguments (write support: firmware 2025.12 and earlier only):

```
serial <port identifier> <port function> <msp baudrate> <gps baudrate> <telemetry baudrate> <blackbox baudrate>
```

| Serial cli command arguments |
| ---------------------------- |
| 1. Serial Port Identifier    |
| 2. Serial Port Function      |
| 3. MSP baud rate             |
| 4. GPS baud rate             |
| 5. Telemetry baud rate       |
| 6. Blackbox baudrate         |

Note: for Identifier see serialPortIdentifier_e in the source; for Function bitmask see serialPortFunction_e in the source code.

### 1. Serial Port Identifier

| Identifier              | Value |
| ----------------------- | ----: |
| SERIAL_PORT_NONE        |    -1 |
| SERIAL_PORT_USART1      |     0 |
| SERIAL_PORT_USART2      |     1 |
| SERIAL_PORT_USART3      |     2 |
| SERIAL_PORT_UART4       |     3 |
| SERIAL_PORT_UART5       |     4 |
| SERIAL_PORT_USART6      |     5 |
| SERIAL_PORT_USART7      |     6 |
| SERIAL_PORT_USART8      |     7 |
| SERIAL_PORT_UART9       |     8 |
| SERIAL_PORT_USART10     |     9 |
| SERIAL_PORT_USB_VCP     |    20 |
| SERIAL_PORT_SOFTSERIAL1 |    30 |
| SERIAL_PORT_SOFTSERIAL2 |    31 |
| SERIAL_PORT_LPUART1     |    40 |
| SERIAL_PORT_UART0       |    50 |
| SERIAL_PORT_USART1      |    51 |
| SERIAL_PORT_USART2      |    52 |
| SERIAL_PORT_USART3      |    53 |
| SERIAL_PORT_UART4       |    54 |
| SERIAL_PORT_UART5       |    55 |
| SERIAL_PORT_USART6      |    56 |
| SERIAL_PORT_USART7      |    57 |
| SERIAL_PORT_USART8      |    58 |
| SERIAL_PORT_UART9       |    59 |
| SERIAL_PORT_USART10     |    60 |
| SERIAL_PORT_UART11      |    61 |
| SERIAL_PORT_UART12      |    62 |
| SERIAL_PORT_UART13      |    63 |
| SERIAL_PORT_UART14      |    64 |
| SERIAL_PORT_UART15      |    65 |
| SERIAL_PORT_PIOUART0    |    70 |
| SERIAL_PORT_PIOUART1    |    71 |
| SERIAL_PORT_PIOUART2    |    72 |
| SERIAL_PORT_PIOUART3    |    73 |
| SERIAL_PORT_PIOUART4    |    74 |
| SERIAL_PORT_PIOUART5    |    75 |
| SERIAL_PORT_PIOUART6    |    76 |
| SERIAL_PORT_PIOUART7    |    77 |
| SERIAL_PORT_PIOUART8    |    78 |
| SERIAL_PORT_PIOUART9    |    79 |

Firmware 2025.12 changes the way CLI handles serial configuration as it uses serial port name instead of identifier.

```
serial VCP 1 115200 57600 0 115200
serial UART1 2048 115200 57600 0 115200
serial UART2 64 115200 57600 0 115200
serial UART3 0 115200 57600 0 115200
serial UART4 0 115200 57600 0 115200
serial UART6 2 115200 57600 0 115200
```

:::note

- ID's 0-19 reserved for UART 1-20 (legacy in firmware 2025.12)
- ID's 20-29 reserved for USB VCP
- ID's 30-39 reserved for SoftSerial 1 and 2
- ID's 40-49 reserved for LPUART 1
- ID's 50-65 reserved for UART 0-15 (added in firmware 2025.12, extended to UART15 in 2026.12)
- ID's 70-79 reserved for PIOUART 0-9 (RP2350 PIO UARTs)
- Port 0, 4, 5, 9 use `UART` designator
- Port 1, 2, 3, 6, 7, 8, 10 use `USART` designator

:::

In firmware 4.5 for SOFTSERIAL or LPUART we use the following resources:

```
resource SOFTSERIAL_TX 1 <PIN>
resource SOFTSERIAL_RX 1 <PIN>
resource SOFTSERIAL_TX 2 <PIN>
resource SOFTSERIAL_RX 2 <PIN>
resource LPUART_TX 1 <PIN>
resource LPUART_RX 1 <PIN>
```

### 2. Serial Port Function

| Function                     |  Value |       Bit |
| ---------------------------- | -----: | --------: |
| FUNCTION_NONE                |      0 |         0 |
| FUNCTION_MSP                 |      1 |  1 \<\< 0 |
| FUNCTION_GPS                 |      2 |  1 \<\< 1 |
| FUNCTION_TELEMETRY_FRSKY_HUB |      4 |  1 \<\< 2 |
| FUNCTION_TELEMETRY_HOTT      |      8 |  1 \<\< 3 |
| FUNCTION_TELEMETRY_LTM       |     16 |  1 \<\< 4 |
| FUNCTION_TELEMETRY_SMARTPORT |     32 |  1 \<\< 5 |
| FUNCTION_RX_SERIAL           |     64 |  1 \<\< 6 |
| FUNCTION_BLACKBOX            |    128 |  1 \<\< 7 |
| NOT USED                     |    256 |  1 \<\< 8 |
| FUNCTION_TELEMETRY_MAVLINK   |    512 |  1 \<\< 9 |
| FUNCTION_ESC_SENSOR          |   1024 | 1 \<\< 10 |
| FUNCTION_VTX_SMARTAUDIO      |   2048 | 1 \<\< 11 |
| FUNCTION_TELEMETRY_IBUS      |   4096 | 1 \<\< 12 |
| FUNCTION_VTX_TRAMP           |   8192 | 1 \<\< 13 |
| FUNCTION_RCDEVICE            |  16384 | 1 \<\< 14 |
| FUNCTION_LIDAR               |  32768 | 1 \<\< 15 |
| FUNCTION_FRSKY_OSD           |  65536 | 1 \<\< 16 |
| FUNCTION_VTX_MSP             | 131072 | 1 \<\< 17 |
| FUNCTION_GIMBAL              | 262144 | 1 \<\< 18 |
| FUNCTION_OSD_CUSTOM_TEXT     | 524288 | 1 \<\< 19 |

Notes:

`FUNCTION_FRSKY_OSD` = `(1\<\<16)` requires 17 bits. The mask is a 32-bit value, so the highest usable bit is `1 \<\< 31`.

Only `MSP2_COMMON_SERIAL_CONFIG` (0x1009) carries the full 32 bits. The legacy `MSP_CF_SERIAL_CONFIG` (54) sends the mask as a 16-bit value, so `FUNCTION_FRSKY_OSD` and everything above it is truncated on that command — tools that need those bits must use the MSP2 variant.

To configure `MSP_DISPLAYPORT` use the combination `FUNCTION_VTX_MSP | FUNCTION_MSP`.

`FUNCTION_GIMBAL` has existed since firmware 2025.12 and `FUNCTION_OSD_CUSTOM_TEXT` since 2026.6; neither was listed here before.

Changes in firmware 2026.12 (MSP API 1.49):

- `FUNCTION_LIDAR_TF` was renamed to `FUNCTION_LIDAR` and now covers every serial rangefinder; the driver is selected with `rangefinder_hardware` rather than by the bit.
- `FUNCTION_OSD_CUSTOM_TEXT` moved from `1 \<\< 20` down to `1 \<\< 19`, the bit freed when `FUNCTION_LIDAR_NL` was folded into `FUNCTION_LIDAR`.

### 3. MSP Baudrates

| Baudrate |
| -------: |
|     9600 |
|    19200 |
|    38400 |
|    57600 |
|   115200 |
|   230400 |
|   250000 |
|   500000 |
|  1000000 |

### 4 GPS Baudrates

| Baudrate |
| -------: |
|     9600 |
|    19200 |
|    38400 |
|    57600 |
|   115200 |

Note: Also has a boolean AUTOBAUD. It is recommended to use a fixed baudrate. Configure GPS baudrate according to device documentation.

### 5. Telemetry Baudrates

| Baudrate |
| -------: |
|     AUTO |
|     9600 |
|    19200 |
|    38400 |
|    57600 |
|   115200 |

### 6. Blackbox Baudrates

| Baudrate |
| -------: |
|    19200 |
|    38400 |
|    57600 |
|   115200 |
|   230400 |
|   250000 |
|   400000 |
|   460800 |
|   500000 |
|   921600 |
|  1000000 |
|  1500000 |
|  2000000 |
|  2470000 |

### Serial Port Baud Rates

The Serial Port baudrates are defined as follows:

| ID  | Baudrate |
| --- | -------: |
| 0   |     Auto |
| 1   |     9600 |
| 2   |    19200 |
| 3   |    38400 |
| 4   |    57600 |
| 5   |   115200 |
| 6   |   230400 |
| 7   |   250000 |
| 8   |   400000 |
| 9   |   460800 |
| 10  |   500000 |
| 11  |   921600 |
| 12  |  1000000 |
| 13  |  1500000 |
| 14  |  2000000 |
| 15  |  2470000 |

### Passthrough

Betaflight can enter a special passthrough mode whereby it passes serial data through to a device connected to a UART/SoftSerial port. This is useful to change the configuration of a Betaflight peripheral such as an OSD, bluetooth dongle, serial RX etc.

To initiate passthrough mode, use the CLI command `serialpassthrough` This command takes four arguments.

    serialpassthrough \<port1 id> [port1 baud] [port1 mode] [port1 DTR PINIO] [port2 id] [port2 baud] [port2 mode]

`PortX ID` is the internal identifier of the serial port from Betaflight source code (see serialPortIdentifier_e in the source). For instance UART1-UART4 are 0-3 and SoftSerial1/SoftSerial2 are 30/31 respectively. Since firmware 2025.12 the port name may be given instead of the number, e.g. `serialpassthrough UART2`. PortX Baud is the desired baud rate, and portX mode is a combination of the keywords rx and tx (rxtx is full duplex). The baud and mode parameters can be used to override the configured values for the specified port. `port1 DTR PINIO` identifies the PINIO resource which is optionally connected to a DTR line of the attached device.

If port2 config(the last three arguments) is not specified, the passthrough will run between port1 and VCP. The last three arguments are used for `Passthrough between UARTs`, see that section to get detail.

For example. If you have your MWOSD connected to UART 2, you could enable communicaton to this device using the following command. This command does not specify the baud rate or mode, using the one configured for the port (see above).

```
serialpassthrough 1
```

If a baud rate is not specified, or is set to 0, then `serialpassthrough` supports changing of the baud rate over USB. This allows tools such as the MWOSD GUI to dynamically set the baud rate to, for example 57600 for reflashing the MWOSD firmware and then 115200 for adjusting settings without having to powercycle your flight control board between the two.

_To use a tool such as the MWOSD GUI, it is necessary to disconnect or exit Betaflight App._

**To exit serial passthrough mode, power cycle your flight control board.**

In order to reflash an Arduino based device such as a MWOSD via `serialpassthrough` if is necessary to connect the DTR line in addition to the RX and TX serial lines. The DTR is used as a reset line to invoke the bootloader. The DTR line may be connected to any GPIO pin on the flight control board. This pin must then be associated with a PINIO resource, the instance of which is then passed to the serialpassthrough command. If you don't need it, you can ignore it or set it to `none`. The DTR line associated with any given UART may be set using the CLI command `resource` specifying it as a PINIO resource.

For example, the following configuration for an OpenPilot Revolution shows the UART6 serial port to be configured with TX on pin C06, RX on pin C07 and a DTR connection using PINIO on pin C08.

```
resource SERIAL_TX 1 A09
resource SERIAL_TX 3 B10
resource SERIAL_TX 4 A00
resource SERIAL_TX 6 C06
resource SERIAL_RX 1 A10
resource SERIAL_RX 3 B11
resource SERIAL_RX 6 C07

resource PINIO 1 C08
```

To assign the DTR line to another pin use the following command.

```
resource PINIO 1 c05
```

To disassociate DTR from a pin use the following command.

```
resource PINIO 1 none
```

Having configured a PINIO resource assocaited with a DTR line as per the above example, connection to an MWOSD attached to an Openpilot Revolution could be achieved using the following command.

`serialpassthrough 5 0 rxtx 1`

This will connect using UART 6, with the baud rate set over USB, full duplex, and with DTR driven on PINIO resource 1.

A (desirable) side effect of configuring the DTR line to be associated with a PINIO resource, is that when the FC is reset, the attached Arduino device will also be reset.

Note that if DTR is left configured on a port being used with a standard build of MWOSD firmware, the display will break-up when the flight controller is reset. This is because, by default, the MWOSD does not correctly handle resets from DTR. There are two solutions to this:

1. Assign the DTR pin using the resource command above prior to reflashing MWOSD, and then disassociate DTR from the pin.
2. Rebuild MWOSD with MAX_SOFTRESET defined. The MWOSD will then be reset correctly every time the flight controller is reset.

### Passthrough between UARTs

in BetaFlight 4.1 or later, you can make a serial passthrough between UARTs.

the last three arguments of `serialpassthrough` are used to the passthrough between UARTs: `[port2 id]` `[port2 baud]` `[port2 mode]`, if you don't need passthrough between UARTs, just ignore them, and use `serialpassthrough` according to above description.
if you want passthrough between UARTs, `[port2 id]` is a required argument, the value range is same with `port1 ID` argument, it is the internal identifier of the serial port. `[port2 baud]`and`[port2 mode]` is optional argument, the default of them are `57600` and `MODE_RXTX`.

For example. If you using a filght controller built-in BLE chip, and the BLE chip was inner connected to a UART, you can use the following command to let the UART to talk with other UART:

```
serialpassthrough 0 115200 rxtx none 4 19200
```

the command will run a serial passthrough between UART1 and UART5, UART1 baud is 115200, mode is MODE_RXTX, DTR is none, UART5 baud is 19200, mode is not specific, it will take default value MODE_RXTX.

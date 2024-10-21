---
sidebar_position: 2
---

# Ports Tab

You will have multiple different devices and peripherals connected to your flight controller UART ports,
like a GPS, VTX control, or even a wireless adapter. This is where you tell the flight controller how to
read, and what to do with the data it receives from these ports

![Ports tab](/img/betaflight_configurator_ports_tab.png)

## Identifier

The label of the port. Usually `UART[x]`, `SOFTSERIAL`, or `USB`. The UART number responds to the RX-TX
pairs on the FC

## Configuration/MSP

As the name suggests, usually only used for lower-level communication using the MSP (MultiWii Serial Protocol)
for configuration done by external devices, or to allow a more direct way of control. You can also set a specific
baud rate

:::caution

This is not to be used as a "toggle" for the current UART when setting it (for example) for Serial RX. It's
a relatively common mistake to make, and then cause your config to not save to prevent unwanted behavior
when conflicting options are set

:::

## Serial RX

Used to set the UART to receive serial data from a receiver. This is the most common use of a UART port.
If you toggle this on, you likely do not need to touch any other options for this port

## Telemetry Output

Used for older radio systems that would require telemetry data to be sent back to the receiver over a UART
separate from the one used for control. You may also need to set the baud rate for your device. This is
not used for most modern radio systems like ELRS. Modern receivers use 2-way communication with the FC by
default which allows for telemetry to be sent over the same port used for Serial Rx link.

Ensure that you have toggled Telemetry output to On in the Receiver tab to make the FC send telemetry to the
Receiver

## Sensor Input

When you want the port to receive data from a sensor. This is used for things like BLHeli_32 ESC telemetry,
or GPS. To get GPS working, you may need to manually assign a baud rate as well

## Peripherals

Multiple options to allow the FC to control peripherals like VTXs, cameras, external OSDs, or even digital VTXs
along with MSP. Similar to `Telemetry Output` and `Sensor Input`, you may need to set a baud rate for your
device although common devices like SmartAudio, Tramp and MSP VTXs should work well with the default baud rates

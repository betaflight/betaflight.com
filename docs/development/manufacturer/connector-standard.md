import ConnectorLogo from '/img/betaflight/connector_logo.svg'

# Betaflight Connector Standard

Draft Proposal for Standardized Drone Connectors

## Version Change Register

| Version # | Revision Date | Changes, Reasons, and Notes      |
| :-------- | :------------ | :------------------------------- |
| Draft 0.1 | 27 April 2023 | Initial Draft Format             |
| Draft 0.2 | 08 May 2023   | Added Logo and pinout correction |

## Introduction

The use of drones has increased significantly in recent years. The drone community has grown rapidly and there are now many different types of drones available on the market.
The drone community is also very active and there are many different manufacturers of drones and components. This has led to a wide variety of drones and components that are not compatible with each other.
This makes it difficult for users to build and maintain multi-rotor drones. With this increase comes the need for standardization.
Standardization will help reduce confusion and ensure compatibility between components from different manufacturers, making it easier for users to build and maintain multi-rotor drones.
Standardization would enable easier compatibility between components from different manufacturers, leading to more efficient and cost-effective and cost-effective industry.
This proposal aims to establish a standard for drone connectors that will be wildly adopted by manufacturers and users.

## Connector Standards

### Availability

Any harness should be widely available and easy to obtain.
The harness should be available from multiple sources and should be easy to obtain from any source.

### JST SH Series as Standard for Connectors.

JST-SH is wildly used and reliable connector that proven to be a robust choice for drone applications.
The connector should be the standard for all drone manufacturers, ensuring compatibility between components from different manufacturers.

### JST GH Series as Optional Component.

Some manufacturers also use other firmware, such as Ardupilot or Pixhawk, which have their own [standard](https://github.com/pixhawk/Pixhawk-Standards).
This connector type is optional for drone manufacturers, allowing them to choose the connector type that best suits their needs as long they provide a harness for both platforms.

### ESC Pin Configuration

An additional 2-pin connector for power (ext. power) can be used for high-powered devices or if the user wants to use an external power source.

We recommend using twisted wires to eliminate any confusion about the mirroring of the connector and to ensure that the same wiring order is used on both sides of the connection.

V+ connection from the ESC to FC will typically carry VBAT voltage direct from the battery connection. The ESC V+ connection is an Input Voltage to the FC whilst RX, GPS and other connectors'
V+ pads carry output from the FC's onboard voltage regulators.

In some cases VTX or camera connectors may offer VBAT voltage directly but due to voltage fluctuations induced by the motors the use of VBAT direct to VTXs or cameras is discouraged.
To minimise the risk to sensitive VTX hardware it is advisable to provide an additional high voltage regulator for such components.
Recommended continuous power draw for this high voltage VTX regulator is ~18W, tranlating to at least a 9V/2A part, and output voltage should be between 8-12V.

The pin configuration for the JST SH connector is as follows:

| Pin # | Signal Name | Description |
| :---- | :---------- | :---------- |
| 1     | V+          | Power       |
| 2     | GND         | Ground      |
| 3     | Current     | Current     |
| 4     | Telemetry   | Telemetry   |
| 5     | Signal 1    | Motor 1     |
| 6     | Signal 2    | Motor 2     |
| 7     | Signal 3    | Motor 3     |
| 8     | Signal 4    | Motor 4     |

### RX Pin Configuration

The pin configuration for the JST SH connector is as follows:

| Pin # | Signal Name | Description |
| :---- | :---------- | :---------- |
| 1     | V+          | Power       |
| 2     | GND         | Ground      |
| 3     | Signal 1    | RX          |
| 4     | Signal 2    | TX          |

:::note
This connector could also be used for other serial devices
:::

### GPS Pin Configuration

The pin configuration for the JST SH connector is as follows:

| Pin # | Signal Name | Description    |
| :---- | :---------- | :------------- |
| 1     | V+          | Power          |
| 2     | GND         | Ground         |
| 3     | Signal 1    | RX             |
| 4     | Signal 2    | TX             |
| 5     | Signal 3    | SDA (optional) |
| 6     | Signal 4    | SCL (optional) |

### I2C Pin Configuration

The pin configuration for the JST SH connector is as follows:

| Pin # | Signal Name | Description |
| :---- | :---------- | :---------- |
| 1     | V+          | Power       |
| 2     | GND         | Ground      |
| 3     | Signal 1    | SDA         |
| 4     | Signal 2    | SCL         |

:::note
The I2C connector should be used for all I2C devices, including compasses, barometers, and other sensors.
Pins are shared with PB10 and PB11 for TX3 and RX3 so please keep this in mind when using onboard I2C device such as compasses and barometers.
:::

### Analog Camera Pin Configuration

The pin configuration for the JST SH connector is as follows:

| Pin # | Signal Name | Description |
| :---- | :---------- | :---------- |
| 1     | V+          | Power       |
| 2     | GND         | Ground      |
| 3     | Signal 1    | Video       |
| 4     | Signal 2    | RX          |
| 5     | Signal 3    | TX          |

### VTX Pin Configuration

The pin configuration for the JST SH connector is as follows:

| Pin # | Signal Name | Description |
| :---- | :---------- | :---------- |
| 1     | V+          | Power       |
| 2     | GND         | Ground      |
| 3     | Signal 1    | Video       |
| 4     | Signal 2    | RX          |
| 5     | Signal 3    | TX          |

### Digital Video Transmitter Pin Configuration

The current pin configuration for the JST SH connector is as follows:

| Pin # | Signal Name | Description  |
| :---- | :---------- | :----------- |
| 1     | V+          | Power        |
| 2     | GND         | Ground       |
| 3     | Signal 1    | TX           |
| 4     | Signal 2    | RX           |
| 5     | GND         | Ground (DJI) |
| 6     | Signal 3    | SBUS (DJI)   |

## Logo

The provided logo should be used to identify the connector as a Betaflight standardized connector.
The logo should be used on all components that use the standardized connector system and can be used on PCBs, packaging, and other marketing materials.
This way users know that the component is compatible with other components that use the standardized connector system.

<ConnectorLogo className="themeInvert mb-2" />

[**Download**](/img/betaflight/connector_logo.svg)

## Betaflight Configurator

The Betaflight configurator firmware flasher tab provides a link to each board in our documentation.
This link will take users to the documentation for the board they have selected.

Each boards documentation section should include a list of components that are compatible with the standardized connector system.
Documentation should include schematics, pinouts, and other information that will help users build and maintain their drones.

## Conclusion

The standardized connector system proposed in this document will help reduce confusion and ensure compatibility between components from different manufacturers, making it easier for users to build and maintain multi-rotor drones.
We recommend that drone manufacturers and component manufacturers adopt the Betaflight standardized connector system to benefit the entire drone community.

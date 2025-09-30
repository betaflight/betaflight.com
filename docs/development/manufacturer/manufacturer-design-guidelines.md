import ThemedImage from '@theme/ThemedImage'
import useBaseUrl from '@docusaurus/useBaseUrl'

# Betaflight Flight Controller Manufacturer Design Guidelines

<p className="flex flex-col">
  <ThemedImage 
    alt="Betaflight"
    className="no-effect h-40 mt-4"
    sources={{
      light: useBaseUrl('/img/betaflight/logo_light.svg'),
      dark: useBaseUrl('/img/betaflight/logo_dark.svg'),
    }}
  />
</p>

## Version Change Register

| Version # | Revision Date     | Changes, Reasons, and Notes       |
| :-------- | :---------------- | :-------------------------------- |
| Draft 0.1 | 14 May 2022       | Initial Draft Format              |
| Draft 0.2 | 04 June 2022      | Revise format to Final Format     |
| Draft 0.3 | 12 June 2022      | Update Visual Media and Tables    |
| Draft 0.4 | 21 October 2022   | Update format, add information    |
| Draft 0.5 | 24 October 2022   | Add additional information        |
| Draft 0.6 | 06 November 2022  | Add cloud build information       |
| Draft 0.7 | 17 November 2022  | Remove off-board hardware defines |
| Draft 0.8 | 01 January 2023   | Update Baro and CC2500            |
| Draft 0.9 | 14 January 2023   | Add FC LEDs                       |
| Draft 1.0 | 26 January 2023   | Add Signal Rules                  |
| Draft 1.1 | 10 December 2023  | Add LSM6DSV16X and LPS22DF        |
| Draft 1.2 | 13 January 2024   | Add Mag and Baro hardware note    |
| Draft 1.3 | 23 October 2024   | Update MCU recommendations        |
| Draft 1.4 | 06 November 2024  | Add LED pin resource warning      |
| Draft 1.5 | 13 January 2025   | Update ADC/gyro recommendations   |
| Draft 1.6 | 18 February 2025  | Add W25N02K flash define          |
| Draft 1.7 | 27 March 2025     | Update FC review policy           |
| Draft 1.8 | 01 April 2025     | Update I2C Device Info            |
| Draft 1.9 | 12 September 2025 | Update motor requirements         |

Thank you for considering or continuing your development of Betaflight capable flight control hardware.

Betaflight is an open source project that is free to use and does not incur a license cost, however for the most successful release of a new flight controller or complete ready-to-fly product that is using Betaflight, it remains immensely beneficial to provide representative production samples or pre-production testing units to the Betaflight development team for testing and development feedback.

In order to have hardware added to the Betaflight approved hardware list, hardware samples representative of the final configuration must be provided to designated members of the Betaflight development team. It is strongly recommended that samples of development hardware or production-representative examples are evaluated positively before accepting pre-orders or releasing products. Many of the same benefits can be provided for inclusive hardware packages, including flight control stacks, or ready-to-fly craft.

Sharing schematics/layouts with the reviewers will also be beneficial and improve the quality of the review.

This provides the Betaflight team with an opportunity to ensure that the hardware and firmware behave 100% as expected in the representative configuration, as well as support verification of custom defaults required for firmware operation. After-sales support to customers from members of the Betaflight team are also made possible for reproducing end user issues.

Additional benefits are also present in the form of allowing experienced active pilots with backgrounds in engineering of these systems to assist with aspects of the development process particularly in respect to real world use the products will be subjected to.

Note: Manufacturers may use the same target for multiple flight controller designs; however, **all new flight controllers must undergo the review process**, regardless of whether they use an existing target.

Finally, we will offer a ’Betaflight approved’ product list on the Betaflight GitHub to advise the userbase on electronics which both follow our ‘best practice’ guidance, and which have been tested by our development team. This will be available for flight controller hardware, as well as electronic speed controller stacks, AIOs, and ready-to-fly craft. This strategy is designed to help both developers optimize their hardware and our user base get directed to optimal hardware, and reduce support requests for the Betaflight team who serve a user base of over a hundred thousand users.

# 1 Important Terms and Conditions

## 1.1 Intent

The goal of achieving a certified hardware ecosystem for Betaflight Flight Controller hardware and firmware targets is to ensure that hardware design supports correct operation of Betaflight features and supports an improved user experience for ‘connecting’, flashing, programming, and flying.

The cutting edge flight performance achieved by Betaflight relies on proper hardware design, microcontroller resource allocation, and the ability of end users to correctly configure the software with Betaflight.

Achieving state of the art performance requires minimizing latency in craft response to perturbations and command inputs, efficient filtering to remove oscillations from flight control calculations, and leveraging the capabilities of peripheral components to enhance the flight experience. For example, features such as advanced RPM filtering, RPM Dynamic Idle and Multi-Dynamic Notch rely on achieving microsecond scale timing jitter for best performance while simultaneously communicating with electronic speed controllers using bidirectional DShot, determining craft attitude and calculating optimal mixer outputs, as well as operating the myriad of desired user peripherals. This symphony of delicately scheduled operations can be achieved reliably with proper flight controller design.

## 1.2 Important Terms and Glossary

| Term                | Definition                                                                                                                                                                                      | Reference                                                                                                                                                                                                                                          |
| :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ADC                 | Analog to Digital Converter                                                                                                                                                                     |
| BEC                 | Battery Elimination Circuit                                                                                                                                                                     | Electronic voltage regulator circuit that provides a specified voltage to a single output power rail                                                                                                                                               |
| Bidirectional DSHOT | Two-Way DSHOT communication protocol to enable Electronic Speed Controller telemetry to be sent back to the flight controller                                                                   | [wiki](/docs/wiki/guides/current/DSHOT-RPM-Filtering)                                                                                                                                                                                              |
| Bit Bang            | Bit-banging refers to any instance of utilizing GPIO functionality to digitally create signals in place of dedicated hardware. This can alleviate some specific data buffer timing requirements |
| DSHOT               | Digital Shot Communication Protocol used for Flight Controller to Electronic Speed Controller                                                                                                   | [wiki](/docs/wiki/guides/archive/DSHOT-ESC-Protocol-3-1)                                                                                                                                                                                           |
| ESC                 | Electronic Speed Controller                                                                                                                                                                     | https://us.aspina-group.com/en/learning-zone/columns/what-is/021/                                                                                                                                                                                  |
| FPV                 | First Person View                                                                                                                                                                               | This can also refer to the complete avionics-telemetry supplied via a camera & video transmission system                                                                                                                                           |
| GPIO                | General Purpose Input/Output                                                                                                                                                                    | Reconfigurable digital signal pin that can be selected from an MCU pin                                                                                                                                                                             |
| IMU                 | Inertial Measurement Unit                                                                                                                                                                       | Inertial Navigation hardware systems using combined gyroscope and accelerometer unit intended to provide accurate estimates of angular rates, acceleration, and orientation. These can also incorporate magnetometers, barometers, and GPS signals |
| I2C                 | Inter-Integrated Circuit synchronous serial communication protocol used for connecting microcontroller CPU to peripheral devices                                                                |
| MCU                 | Micro Controller Unit                                                                                                                                                                           | Single integrated circuit microprocessor with integrated processor, memory, and programmable input/output modules                                                                                                                                  |
| SPI Bus             | Serial Peripheral Interface that enables MCU to interface with ADC, DAC, registers, RAM storage, and GPIO                                                                                       | https://www.analog.com/en/analog-dialogue/articles/introduction-to-spi-interface.html                                                                                                                                                              |
| PCB                 | Printed Circuit Board                                                                                                                                                                           | May also refer to a populated PCB with components                                                                                                                                                                                                  |
| PDB                 | Power Distribution Board                                                                                                                                                                        | A PCB intended to provide power distribution to electronic speed controller, flight controller, and other peripheral elements                                                                                                                      |
| VDD                 | Voltage - Operating Voltage for a particular chip                                                                                                                                               |
| VDD_IO              | Voltage range permissible as I/O Supply voltage (Typically 3.3V or less)                                                                                                                        |

# 2 Engaging with the Betaflight Development Team

## 2.1 Hardware Approval Process - Example

- Manufacturer initiates contact with Betaflight developer(s) at hardware@betaflight.com

- Betaflight team will establish a closed Discord channel for ongoing private discussion between key members of the development team and manufacturer designees
  Work in progress schematics, PCB renders, and similar documentation prior to initial production provides opportunities for early feedback

- Initial Submission

  - This will require key information to be available, such as specific MCU arrangement (e.g. SPI Bus allocations) may be required in order to support complete feature sets.

  - Desired Target name, MCU type, and which target architecture to be used required.

    - Optionally, if any Official Betaflight Presets are to be requested with this hardware, what specific configurations will be used, and a rough plan of what complete system hardware will be provided to support these efforts.

  - Initial PR for target implementation will need to also include a maintainer, with the intention of providing permission to make future edits on the target.

- Request for specific targets

  - If the flight controller design is intended to have a dedicated Betaflight target, then a new target submission can accompany the process
    - For additional information, see [here](requirements-for-submission-of-targets)

- Production Representative Samples

  - To complete hardware certification, representative hardware samples of initial production run, or pre-production batches which are representative of the final release design must be furnished to designated Betaflight development team member(s) to conduct final validation and certification operations.

  - This will indirectly provide access to the adjacent benefits of leveraging Betaflight developer expertise by using this hardware in complete systems, including flight testing as desired and comprehensive blackbox log analysis. For configurations requiring specific hardware to be tested (e.g. a Bind & Fly or Plug & Play UAS), providing complete representative hardware systems is best.

- Reporting of performance

  - With sufficient test time using the final product, developers can agree to recommend products which meet our guidelines and performance expectations. Products will be noted on Betaflight GitHub.

- Submission

  - Once hardware has been approved, it will be added to the list of Betaflight approved hardware
    - If new target(s) and/or presets have been added, pull requests will be evaluated, completed, and merged for inclusion in subsequent Betaflight releases

- Target Maintenance
  - After approval and release, the designated contact is expected to provide any continuing support that may be required in order to keep the approved hardware working well for end users

## 2.2 Adjacent Benefits and Opportunities

Betaflight developers are likely to provide significant indirect benefits for manufacturers adhering to this program. These benefits could include reviews of board designs, pad location recommendations, evaluation of EMI behaviors in builds, analysis of Blackbox logging outputs, and even insights into forward compatibility with other subsystems used in complete builds.

Improved customer experience with software interactions, development of presets for BNF multicopter configurations, and validation with specific FPV and RC segments of craft to ensure customer experience will be positive. The key integration aspects of supporting various remote control and video combinations can only be fully validated with testing hardware samples.

This thorough testing by expert team members, will help verify and then allow recommendation from the Betaflight development team. Betaflight official recommendation will be highly valuable promotion for the manufacturer so we urge manufacturers to take up this opportunity and work with us.

# 3.0 Flight Controller Design Guidelines

These guidelines provide best practices for physical, electrical, and documentation support of flight controllers. These recommendations are provided as guidelines, however deviating from these provided suggestions should only be undertaken through a collaborative effort with Betaflight developers during the design and prototyping process.

## 3.1 Best Practices for Flight Controller Design and Performance

When asked to review hardware our first action will be to review schematics/layouts against the application notes for the applicable data sheets. The specifics of how the hardware is interconnected is of course going to be driven by a number of constraints, such as recommended pinouts, as outlined below, but is it essential that good design practices are followed with respect to providing good quality power regulation, appropriate use of ground/power planes, decoupling component positioning etc.

### 3.1.1 Physical Configuration

Primary configurations that place the inertial motion unit and other EMI-sensitive components on the side of the PCB that should be mounted away from the electronic speed controller performs best in vertically stacked configurations. Similarly, physically larger components such as inverters in more protected locations from impacts or adjacent PCB boards in stacked build configurations is recommended.

The commonly accepted and used board layouts include 16x16mm for M2 hardware (perpendicularly aligned), 25.4x25.4mm for M2 hardware (typically diagonally aligned), 20x20mm for M2 or M3 hardware (perpendicularly aligned), and 30.5x30.5mm for M3 hardware (perpendicularly aligned). In the case of 20x20 boards, selecting a hardware mounting size should be informed by the ability to use threaded inserts and shock-absorbing grommets in oversized holes, while dedicated M2 mounting limits mounting options if hardware is capable of being used in larger craft that tend to utilize M3 mounting.

Boards with oversized holes (e.g. M4 holes and silicone inserts for M3 stack mounting) experience longer service life and experience fewer failures due to PCB deformation during impacts. For standalone flight controllers, integrated ‘AIO’ flight controllers, and even adjacent configurations provided as ‘stacks’ with additional PCBs, this architecture has been proven to be the most robust over time.

Board layouts should provide redundancy for all critical functions. For example, solder locations with identical pin arrangements to JST connector located adjacent to the JST header mounting is strongly recommended, providing end users significant added value and opportunities to produce more robust craft.
Castellations and use of mounting pads with through holes or edge continuity are also strongly recommended, especially with more compact flight controller designs.

For board layouts implementing transistor PINIO functionality for ‘pit switch’ or similar behaviors, solder bridge options are strongly recommended to enable users to select output voltage, or physically bypass the switching functionality by connecting to voltage sources. Particularly for video systems, it is strongly recommended to avoid performing this switching on the ground, due to interference concerns demonstrated with inconsistent ground planes.

If providing direct mounting support for receivers, the following specification should be followed: the pin sequence must be GND, 5V, UART RX, UART TX with a 2.54mm pin pitch, and permit receivers sized up to 12x20mm. This mirrors the standard mounting (Gnd/5V/Tx/Rx) of CRSF Nano and ELRS Nano receivers, with mirrored UART communication allowing for Tx and Rx to be paired to the same UART.

**Rules:**

- GND should be as close to a signal as possible.
- High speed signals should be away from power.
- Keep similar signals next to each other.
- Always minimize current flow path.

:::info

For connector pinout please refer to the [Betaflight Connector Standard](connector-standard)

:::

### 3.1.2 Inertial Measurement Unit (IMU) Selection

Selecting the right IMU for a flight controller is crucial for optimal flight performance. The InvenSense MPU-6000, the long-time standard, has reached end-of-life. As a replacement, we strongly recommend the ICM-42688-P (see below). Note that gyroscopes must communicate via SPI; I2C gyros are not supported. Legacy models such as the MPU-6500 will not be accepted.

:::note

We do not recommend using the Bosch BMI-270 IMU, because its gyroscope is uncalibrated. As a result, when gyro is integrated to return a change in attitude, the new attitude estimate can be in error, sometimes as much as 5% or 10%. This causes an angle offset until the accelerometer data can be used. New designs using this gyro will not be approved.

:::

### 3.1.2.1 Future IMU Options and How to Select Preferred Options

As the MPU-6000 is EOL, the currently recommended IMU for most applications is the TDK InvenSense ICM-42688-P. This gyro has been proven in many designs to provide excellent performance with low noise and good durability. In all cases, it is strongly recommended that the gyro be powered from its own LDO. For the ICM-42688-P, this is _required_. See below for more on electrical noise considerations.

The ICM-42688-P also supports an external clock input, which can yield increased stability and performance. If your design allows, consider adding external clock support. See the following PR for more info: https://github.com/betaflight/betaflight/pull/13912

:::note

Using a single timer with 4 channels dedicated to dual gyro FSYNC/INT pins for such a timer would be ideal 

:::

Future IMU selection should be carried out with close involvement of the Betaflight development group. Early hardware validation samples should be explored in collaboration with Betaflight developers to determine the suitability of these IMU units in relevant environments.
The ability to customize IMU lowpass filtering and operate within the same GRMS/Shock environment allows for maximum portability of existing filtering and tune schemes, but this development must occur with complete hardware samples and flown in representative flight regimes in order to replicate the EMI environment end users will experience.

The IMU sensors, designed for applications outside of sUAS, are typically subjected to very harsh electromagnetic environments. Ensuring electromagnetic compatibility when using these immediately adjacent to ultrasonically switched power MOSFET devices, constantly operational radio frequency devices (such as remote control and FPV video systems), under thermal stresses of moving over 1kW through the complete flight stack, are a nontrivial operation. In order to minimize risks of flyaway and brownout behaviors which can be observed if IMU data filtering and power delivery are inadequate, proper circuit design and validation testing must be performed.

:::note

#### Advised power supply design for ICM-42xxx IMU. (also applies to others)

These IMU require a stable and clean power supply to function correctly, provided with this they are very capable IMU for flight controller use. Refer to the datasheets for recommended power filtering / bypass caps.
Peak to peak noise of under 50uV on the supply should be the ideal goal.  
Considerations for a suitable LDO are at least 500mA rated output allowing for extra capacitors on the output, two 20nF.  
A PSRR >70dB down as low as 1Hz is preferred.  
Where space allows, a dedicated LDO and circuit is advised for the IMU. For ICM-42688-P this is _required_.

:::

### 3.1.3 Other Sensors

#### 3.1.4.1 I2C Devices and I2C Buses

Barometers and magnetometers should use I2C, not SPI. Betaflight operates with a fast (800 kHz) I2C bus speed by default, making proper pull-up resistor selection critical to prevent signal loss. The optimal pull-up values depend on bus capacitance, but 4.7kΩ is a recommended starting point.
I2C is a shared bus, meaning multiple devices can communicate over the same two-wire interface (SCL and SDA). However, for reliable communication, careful attention must be given to signal integrity and noise immunity. Excessive bus capacitance, improper PCB layout, or insufficient pull-up resistance can lead to communication errors or device malfunctions.

When designing a flight controller with I2C sensors, manufacturers should:

- Keep I2C traces as short as possible to minimize capacitance and signal degradation.

- Use a ground plane beneath I2C traces to reduce noise and improve signal integrity.

- Avoid routing I2C traces near high-noise sources such as motor drivers and power regulation circuits.

- Select appropriate pull-up resistor values based on the number of devices and overall bus capacitance. In cases where multiple devices share the bus, adjusting pull-up values (e.g., lowering to 2.2kΩ or raising to 10kΩ) may be necessary to achieve optimal signal quality.

Additionally, manufacturers should test the stability of the I2C bus under realistic operating conditions, including different temperature and voltage scenarios, to ensure robustness and reliability in flight.

**Barometer selection**

The Bosch BMP280 is a commonly used barometer. The 'real' unit is marked "Bosch BMP280" on the metal case. Sometimes it is replaced with a 'clone' which mimic the BMP280 in appearance, and reports the same I2C address and data structures, so that they show up as being a BMP280 in Betaflight. Manufacturers should only say that a board has a BMP280 barometer if it is a 'real' Bosch manufactured barometer. If a clone of the BMP280 is used, the name of the barometer used must be shown, e.g. A7L01, ASK03, and the manufacturer must confirm that the clone is as accurate as the original Bosch BMP280.

The recommended I2C address for the BMP280 is 0x76, with SDO grounded, permitting automatic address identification by Betaflight.

:::note

If only one I2C bus is available and shared between an onboard barometer and an external connector for a magnetometer or other device, it is advisable to include a method for changing the barometer’s I2C address in case of conflicts. This can be achieved by incorporating jumper pads or a zero-ohm resistor, allowing for easy reconfiguration. Providing this flexibility ensures broader compatibility with external sensors and prevents address conflicts that could disrupt communication.

:::

The plastic-cased, individually calibrated Infineon DPS310 provides a significant improvement in absolute and relative altitude accuracy, and much lower noise levels, compared to the BMP280. Each individual Infineon DPS310 is programmed with custom temperature correction coefficients at the time of its manufacture, ensuring exceptionally accurate temperature measurement, and thereby very accurate pressure measurement in response to temperature changes.

Unfortunately, we note that many manufacturers are using 'clones' of the DPS310, typically with an integral metal case that has a small hole. Because these devices report the same I2C ID as the 'real' DPS310, and use the same control and data registers, Betaflight reports them as being DPS310's, and will return pressure values. However, unlike the real DPS310, logging has shown that these clones typically report incorrect temperature readings, most likely because the custom temperature coefficients for the chip are not written individually at production time. Incorrect temperature readings may lead to altitude errors. A number users have reported inappropriate barometer readings with these clones.

The Infineon DPS310 was replaced with the Infineon DPS368 in late 2019, and the DPS368 has even greater accuracy than the DPS310.

:::note

Metal-cased clones of the DPS310 barometer should NOT be used unless they report temperature accurately. Manufacturers who use clones of the Infineon DPS310 barometer MUST NOT claim that their barometer is a DPS310. We strongly recommend the latest Infineon DPS368 barometer, or the earlier Infineon DPS310, both of which are marked 'Infineon' and are supplied in a plastic case.

:::

**Magnetometer selection**

The IST8310 magnetometer has an unusual axis orientation, where the Y axis is 180 degrees rotated compared to all the other commonly used magnetometers. The user must use custom mag orientation values for correct functioning of the IST8310. It is not possible for the user to just apply a simple rotation to correct the IST8310. For this reason we do not recommend using the IST8310 magnetometer with Betaflight.

:::note

The use of magnetometers with non-standard axis orientations is not recommended.

:::

Note also that the IST8310 magnetometer can be configured with any one of four I2C addresses. Betaflight will only connect to the IST8310 automatically if the default I2C address of 0x0E is used. If any of the other three I2C addresses (0x0C, 0x0D, 0x0F) are used, the user will need to custom enter either 12, 13 or 15 as the `mag_i2c_address` value, or it will not work.

The QMC5883L has 'normal' axis orientation and works well.

:::note

Where a barometer or magnetometer has a configurable I2C address, always use the default address, so that it can be automatically detected in Betaflight

:::

### 3.1.4 Electrical Isolation for Sensor Components

Separate VDD from VDD_IO
Implement additional filtering on VDD if using a single 3v reg for MCU and Sensor

#### 3.1.4.1 Regulated Power and LDO Power Configurations

A key aspect of flight controller performance and longevity is design of the low powered rails that supply power to inertial motion units and the STM microcontroller. Providing robust low-ripple power to these devices provides the maximum performance potential and hardware longevity for operation in the challenging EMI environments present on these craft.

Similarly, 3.3V, 5V, and 9-12V BEC power needs to provide consistent power at the intended current draw. For example, 3.3V 500mA is a recommended minimum current. ‘4.5V’ (5V USB supplied power) should be capable of powering a receiver and GPS unit, which may require over 700mA.

Standard battery powered 5V rails should provide at least 1A, preferably 1.5A to 2A in order to provide higher current if anticipated to be used with a large number of peripherals (such as LED strips, 5V powered FPV Video Systems, or as source power to HD cameras).

Providing a 10V 2A BEC is also strongly recommended with flight controller designs, as this supports high definition video systems, and even enables better analog video system power options.
Each of these can be optionally connected to PINIO driven pit switches, and/or jumper pad setups that enable end users to select constant-on or transistor switched behavior, particularly if located to support video transmission systems.

Such 10V regulators should function at full rated current down to 10V input voltage to support the BEC output from some ESCs.

Again, providing robust low-ripple power to these devices provides the maximum performance potential and hardware longevity for operation in the challenging EMI environments present on these craft.

#### 3.1.4.2 ADC Circuitry (e.g. for Vbat and Current Sensors)

All ADC inputs (e.g. VBAT, CURR, RSSI) should be equipped with 100nF bypass caps to minimize noise.

The recommended Vbat voltage divider for most designs is 100K/10K. Note the tolerance of the resistors used here affects the accuracy of the voltage scale set in the config file.

#### 3.1.4.3 Supporting Additional Features

Numerous standard features have become common with flight controller design, for example chips such as MAX7456 to enable monochrome On-Screen Display (OSD) functionality, including Barometers to supplement IMU functionality to provide more accurate altitude estimates, PINIO transistor switched output pads, LED pads, or additional PWM/Motor outputs.

In order to fully support these additional features, it remains strongly recommended that hardware manufacturers incorporate early developer feedback to ensure complete functionality.

#### 3.1.4.4 SWD Debug Support

In order to aid development of Betaflight firmware, and to debug FC specific issues, it is highly beneficial to have test points for the SWDIO/SWCLK lines together with 3V3 and ground connections to enable connection of a debugger such as a Segger JLink or ST-Link. This speeds up resolution of issues hugely, so if at all possible do not use those pins (PA13/PA14) for other purposes.

#### 3.1.4.5 Blackbox Support

Black box of at least 8mb should also be standard on all fcs as it’s literally impossible to problem solve a tune or flight issues with out black box.

#### 3.1.4.6 LEDs

FCs should implement at least one LED to indicate activity. The second is preferable, and the third optional. Having at least one LED is essential for users to help diagnose basic faults. More LEDs are beneficial to developers as we can build custom images to help diagnose user reported issues.

Each LED should be connected to a GPIO line. Polarity of the output does not matter.

| LED Number | Color | Required   |
| :--------- | :---- | :--------- |
| 0          | Blue  | Yes        |
| 1          | Green | Preferably |
| 2          | Amber | No         |

For details of the use of these LEDs, please see the [FC LEDs](/docs/development/FC-LEDs) documentation

:::warning

Pin PC13, PC14 and PC15 are supplied through the power switch. Since the switch only sinks a limited amount of current (3 mA), the use of GPIOs PC13 to PC15 in output mode is limited:

- The speed should not exceed 2 MHz with a maximum load of 30 pF
- These GPIOs must not be used as current sources (e.g. to drive an LED).

:::

## 3.2 Resource Selection Considerations

:::warning

Betaflight does not support sharing devices on the SPI bus which is blocking execution and results in bad performance. Mainly sharing MAX7456 and blackbox generates support issues.

:::

:::warning

Effective immediately, new flight controller designs that use the STM F4 and F7 series MCUs will be limited to 4 motor outputs. For designs requiring more than 4 motor outputs, it is highly recommended to use the STM32 H7 series MCUs.

:::

BITBANG is the new default on non-F4 and FC designers should use as few GPIO PORTS as possible to avoid needing a DMA stream per GPIO port. i.e.

- 8 motors on 1 GPIO port is optimal.
- first 4 motors are required to use a 1 GPIO and one 4-channel timer.
- 8 motors spread across 2 GPIO ports is OK where both use 4-channel timers.
- 8 motors spread across more than 2 GPIO ports is BAD practice and will be rejected.

Similarly, it is optimal to use two 4-channel timers for 8 motors for when BITBANG is disabled.

There is also a choice between using advanced timers or not, TIM1/TIM8 are advanced and get used by DSHOT BITBANG.

It may be optimal to use TIM1 + TIM8 for all motors so that the other timers are always free.
Or it may be optimal to use timers other than TIM1/TIM8 for motors so that TIM1/TIM8 are free for other uses when DSHOT BITBANG is NOT used.

:::note

When DSHOT BITBANG is used, the advanced timers (TIM1/TIM8 on H7) use DMA to drive the GPIO signals directly, the GPIO pins' timer AF modes are NOT used.  The timer(s) used by DSHOT BITBANG can drive GPIO signals on any GPIO pins, even if they do not have timer AF signals.
TIM1 has inter-peripheral connectivity that other timers do not have.

:::

### 3.2.1 Assigning Resource by Priority

Appropriate resource allocation ensures maximum flexibility in the selection of the modes available to users (for example with DSHOT) and also minimizes conflicts in timer and DMA stream allocation.

Assign motor channels with highest priority.

Note: As of December 2024, STM32F4 and STM32F7 MCUs are limited to 4 motor outputs.

#### 3.2.1.1 F4 Resource Selection

As F4 MCUs do not support UART inversion, a hardware inverter must be added in order to support inverted serial protocols such as SBUS, SmartPort, and F.Port. This functionality is not required for Betaflight approval, but if included any pins that implement inversion should be clearly marked, and ideally not result in reduced capability of that UART when used with non-inverted peripherals.

For Betaflight 4.4 and later versions, the expected default configuration will take advantage of Bidirectional DShot, therefore default PID loop rates and motor protocol of 4kHz and DSHOT300 are anticipated to be the stock configuration. This requires proper Motor Resource allocation to enable bidirectional DShot communication.

If using Bitbanged DShot, when SPI Bus #1 is to be used for the gyro, care must be taken to ensure that motor pins are assigned to appropriate timers. This is because Bitbanged DSHOT uses DMA2 to write to GPIO ports. If this is enabled, it is not possible to enable DMA on an SPI bus using DMA2.
Practically speaking this means that we can’t support DMA on SPI bus 1 (which uses DMA2) on F405 and F411 processors. It is better to put multiple devices on other SPI busses that use SPI bus 1, which is typically used for the gyro.
Bitbanged DShot communication protocol will always use Timer 1 and Timer 8 - do NOT use these pins for any other functions.

Further reading: Section 2.1.10 of the errata at
https://www.st.com/resource/en/errata_sheet/dm00037591-stm32f405407xx-and-stm32f415417xx-device-limitations-stmicroelectronics.pdf

Corruption may occur on DMA2 if AHB peripherals (e.g. GPIO ports) are accessed concurrently with APB peripherals (e.g. SPI busses).
Practically, this means that all pins should be on the same port, or at most two ports, so that only one (or two) DMA streams are required for bitbanged operation.

As an additional reference design, see the Fenix F405: https://oshwlab.com/jyesmith/fenix-f405

#### 3.2.1.2 F7 Resource Selection

F7 series MCUs provide greater flexibility in resource assignments and do not require hardware inverters in order to support inverted serial protocols. They also do not exhibit the SPI 1 DMA limitations of F4 processors.

Bitbanged DShot communication protocol will always use Timer 1 and Timer 8 - Do NOT use these timers for any other functions.

#### 3.2.1.3 G4, H7, and AT32F435 Resource Selection

G4 and H7 series MCUs include a DMAMUX, which allows for flexible DMA stream allocation. Therefore, only timer conflicts between motor outputs and other outputs need to be avoided.

:::note

STM32 F4 MCUs should use PWM-based DShot by default, due to a chip errata that prevents peripherals on DMA2 (usually gyro on SPI1) from using DMA when bitbanged DShot is used. All other MCUs (F7, H7, G4, AT32F435) should use bitbanged DShot by default for the best performance and most efficient use of timer and DMA resources.

:::

### 3.2.2 Select appropriate default UARTs to avoid hijacking USB DFU

When selecting UARTs, for the default RX connection or to route to JST sockets, care should be taken to avoid those MCU pins which may interfere with USB DFU.

The DFU protocol will attach to any MCU UART which is sending traffic, not only the USB DFU connection. This is a design feature of STM32 F4 MCUs and cannot be disabled.

Meaning that any receiver or GPS unit attached to UART1 or UART3 (by default on F405 boards) can "hijack" DFU and make the MCU think that the serial UART should be used for DFU traffic instead of USB.

Avoiding this means selecting appropriate UARTs for default connectors so the pilot will be unlikely to connect receivers or GPS units to these ports. This is mainly a problem for peripherals which are powered from the 4v5 pads and so are powered on when USB is attached.

More details on STM32 Bootloaders can be found in Application Node 2606
https://www.st.com/resource/en/application_note/an2606-stm32-microcontroller-system-memory-boot-mode-stmicroelectronics.pdf

AT32 Bootloaders are described in section 2.5 at
https://www.arterychip.com/download/DS/DS_AT32F435_437_V2.02-EN.pdf

| MCU       | Pins                                                   |
| :-------- | :----------------------------------------------------- |
| STM32F411 | (PA09, PA10), (PD05, PD06)                             |
| STM32F405 | (PA09, PA10), (PB10, PB11), (PC10, PC11)               |
| STM32F7xx | (PA09, PA10), (PB10, PB11), (PC10, PC11)               |
| STM32G47x | (PA09, PA10), (PA02, PA03), (PC10, PC11)               |
| STM32H56x | (PA09, PA10), (PA02, PA03), (PD08, PD09)               |
| STM32H72x | (PA09, PA10), (PA02, PA03), (PB10, PB11), (PD08, PD09) |
| STM32H73x | (PA09, PA10), (PA02, PA03), (PB10, PB11), (PD08, PD09) |
| STM32H74x | (PA09, PA10), (PB14, PB15), (PA02, PA03), (PB10, PB11) |
| AT32F435  | (PA09, PA10), (PA02, PA03), (PB10, PB11)               |

## 3.3 Markings, Version Numbers, and Documentation

It is highly recommended that the flight controller Manufacturer Name, Board Name, and Board Design Revision be marked clearly on the flight controller itself. Where possible, indicating the firmware target name, or selecting a firmware target name to minimize confusion reduces the likelihood of an end user attempting to configure the flight controller with an incorrect target.

### 3.3.1 Creating Design Revisions and Communicating Changes

Providing sufficient marking and documentation will be required for hardware approval. Screen printing on the flight controller critical information - pin identifiers, board name, revision, and manufacturer will be necessary, with sufficient detail to enable end users to properly connect devices to the flight controller.

When creating flight controller revisions and improvements, it is strongly recommended that indications and documentations are made available, particularly when pinout changes, output rating changes, or hardware bill of material changes. Any board configuration change requiring a user to change configuration behavior must have an accompanying change in marking to indicate (e.g. changing an IMU, or altering the pinout of solder pads).

Following standard marking practices (e.g. V, VCC, or VBAT for battery voltage, G or GND for ground, T for ESC Telemetry, C for Current Sensing ADC, etc.) is also strongly recommended. Similarly, providing consistent color selections for pin header JST wiring looms, and consistent marking on the PCB is always preferable for robust building and troubleshooting.

Providing a CLI dump file that enables users to reset their flight controller to stock configuration is needed if a dedicated target is not provided. This is particularly relevant if multiple versions of a board which share targets but have significant hardware changes are present, a CLI dump file for each flight controller revision must be made available to users.

### 3.3.2 Implementing Flight Controller Designs for Ready-To-Fly Craft

#### 3.3.2.1 General Recommendations and Documentation

// A good example of properly documenting and supporting ready-to-fly craft would be the way EMAX makes entire CLI dumps of every craft which enables users to revert systems to the as-shipped software configuration

#### 3.3.2.2 Leveraging the Betaflight Preset System

One of the most powerful tools for end users that can save significant time and reduce the likelihood of misconfiguration is the Preset system. Developing an Official Betaflight preset and generating a pull request with the assistance of the Betaflight development team allows for end users to quickly and easily configure their craft. The versatility of selectable options, RC Link presets, and even Tune & Filter presets allow for diverse configurations of RTF craft products to be supported.
Applying and using presets not only saves users significant time, but reduces the likelihood of data entry errors or incorrect configurations to be applied, which can be of particular importance for products aimed at less experienced users.

For manufacturers providing configuration presets for flight controllers (strongly recommended), providing documentation of suggested locations to connect peripheral devices, match the provided preset menu selections can greatly assist end users with proper configuration of their craft. These should include selecting appropriate PID loop rates, DShot data rates, IMU-specific Gyro Lowpass Filtering, Receiver installation (including options with the correct Port, protocol, SerialRX_Inversion, and SerialRX_HalfDuplex), HD FPV MSP port installation, VTX control (including protocol(s), port, and optional pit mode states), GPS (port and protocols), LEDs, and any PINIO type peripheral connections where applicable.

Working with the Betaflight development team provides opportunities to develop presets that can bring RTF craft back to stock configuration, enable users to rapidly configure ‘Plug & Play’ systems based on selected RC link hardware installed per documentation, and even permit Betaflight developers with extensive experience developing precise tunes for craft to generate a range of tunes for that specific product.

## 3.4 Electronic Speed Controller Compatibility

A significant amount of the added performance available in Betaflight 4.X and beyond is based on leveraging ESC RPM telemetry data in order to use RPM Notch Filters and Dynamic Idle features.

### 3.4.1 For 32 Bit ESCs (BLHeli_32 and AM32)

Betaflight supports all 32-bit ESCs currently available, with BLHeli_32 and AM32 configurations, as well as APD configurations being capable of supporting bidirectional DShot, and user-configured operation with bidirectional DShot disabled.
Additional DShot extended telemetry will be implemented over time as demonstrated stable, however current extended telemetry options will only be enabled by user selection.

Providing 32b ESCs with firmware prior to 32.66 will require end users to reflash ESCs. Craft will not arm due to the RPMFILTER error that will be present due to a lack of RPM Telemetry. The required solution will be disabling Bidirectional DShot (not recommended) or reflashing ESC (strongly recommended).

### 3.4.2 For 8 Bit ESCs (BLHeli_S)

Betaflight will continue to support all current 8-bit ESC configurations, however these will rely on bidirectional DShot enabled by default.

For Betaflight 4.4 and subsequent releases, the Betaflight team will NO LONGER support BLHeli_S as a default configuration. The enhanced flight performance made possible by operating with Bidirectional DShot features enabled will become the default behavior for all Betaflight craft..

8-bit ESCs can run **BlueJay**, **JESC**.

For hardware, such as AIO boards which incorporate ESC and FC, the expectation will be that hardware comes with installed firmware meeting these requirements. The preferred option in this case is **BlueJay**, due to the ability to adjust PWM frequencies and ease of end user support for other functionality across MCU layouts.

Failure to comply with this requirement will require end users to perform firmware reflash of ESCs, and without reflashing craft will not arm due to the RPMFILTER error that will be present due to a lack of RPM Telemetry.
The required solution will be disabling Bidirectional DShot (not recommended) or reflashing ESC (strongly recommended).

### 3.4.3 For Legacy ESCs

For legacy ESCs that are only capable of OneShot and Multishot utilization, end users will be required to disable DShot in order to continue with operations. This situation only applies to pre-BLHeli_S ESC architectures, and is not anticipated to be an issue for the vast majority of users. The lack of DShot capability has been part of Betaflight operation since 3.2 (in 2017), therefore legacy support for this obsolescent hardware will require additional end user configuration, however these are still indirectly supported and may exhibit improved performance with the most recent Betaflight versions despite being unable to take advantage of bidirectional DShot features.

# 4 Reference Tables

## 4.1 Rated Looptime and Performance

Rated Performance of specific MCU, IMU, and ESC DShot Protocol Combinations

These are the **strongly recommended** default configurations

For stock configurations, and implementations of ready-to-fly craft, the following configurations are the officially recommended configurations.

Importantly, although the Bidirectional DShot ENABLED may require lower PID Loop Rates for F411 and F405 flight controllers, the difference in loop time is 125us or 250us. These are microseconds. The improvements in filtering using RPM Notches alongside Sliding-DFT Multi-Dynamic notches can provide improvements on the scale of milliseconds for phase latency when processing IMU signals to post-filter information that can be used for PID/Mixer calculations. The flight performance of using bidirectional DShot is absolutely worth the PID Looptime Tradeoff, due to that order of magnitude improvement in cumulative signal pathway delay enabled with more targeted notch filtering schema.

Looptime and Performance Recommendation Table:

| MCU                          | IMU                          | Sampling Rate | Bidirectional DShot Status | PID Loop Rate | DShot Protocol |
| :--------------------------- | :--------------------------- | :------------ | :------------------------- | :------------ | :------------- |
| H7XX                         | MPU60X0, ICM2060X, ICM42688P | 8 kHz         | Enabled or Disabled        | 8 kHz         | DShot 600      |
|                              | BMI-270                      | 3.2 kHz       | Enabled or Disabled        | 3.2 kHz       | DShot 300      |
| F7X2, G4XX, AT32 and similar | MPU60X0, ICM2060X, ICM42688P | 8 kHz         | Enabled or Disabled        | 4 kHz         | DShot 300      |
|                              | BMI-270                      | 3.2 kHz       | Enabled or Disabled        | 3.2 kHz       | DShot 300      |
| F405                         | MPU60X0, ICM2060X, ICM42688P | 8 kHz         | Enabled                    | 4 kHz         | DShot 300      |
|                              | MPU60X0, ICM2060X, ICM42688P | 8 kHz         | Disabled (not recommended) | 8 kHz         | DShot 600      |
|                              | BMI-270                      | 3.2 kHz       | Enabled or Disabled        | 3.2 kHz       | DShot 300      |
| F411 UART Rx \*\*            | MPU60X0, ICM2060X            | 8 kHz         | Enabled                    | 4 kHz         | DShot 300      |
|                              | MPU60X0, ICM2060X            | 8 kHz         | Disabled (not recommended) | 8 kHz         | DShot 600      |
|                              | BMI-270                      | 3.2 kHz       | Enabled                    | 3.2 kHz       | DShot 300      |
| F411 SPI Rx \*\*\*           | MPU60X0, ICM2060X            | 8 kHz         | Enabled                    | 2 kHz         | DShot 300      |
|                              | MPU60X0, ICM2060X            | 8 kHz         | Disabled (not recommended) | 4 kHz         | DShot 300      |
|                              | BMI-270                      | 3.2 kHz       | Enabled                    | 1.6 kHz       | DShot 300      |
|                              | BMI-270                      | 3.2 kHz       | Disabled (not recommended) | 3.2 kHz       | DShot 300      |

\*\* For F411 UART Rx applications, using both available UARTs AND enabling SoftSerial, Accelerometer, large numbers of OSD elements, and using a larger number of filters, stability may require lowering looprate to 2kHz

\*\*\* There are no SPI Rx solutions that are strongly recommended for future development due to challenges in resource allocation and scheduler inconsistency that consistently emerge with SPI Rx designs.
Additionally, there are no RC ecosystems that are actively developing a supported SPI Rx solution (ExpressLRS 3.0 and later do not support SPI; FrSky does not support SPI Rx over any protocol, and other SPI Rx solutions have been fully deprecated).

Note that the use of gyros such as the BMI270 lowers the gyro loop rate from 8kHz to 3.2kHz and is therefore advantageous for F411 designs.

:::warning

Betaflight has deprecated implementation of new STM32F411 designs.

BMI270 is no longer recommended.

:::

## 4.2 Definitions for Targets

As reference please choose the defines for your target from this list as applicable for the target to select appropriate hardware for the cloud build.

### 4.2.1 Defines for GYRO and ACC

Define at least one gyro and one accelerometer.

```
#define USE_GYRO_SPI_MPU6000
#define USE_ACC_SPI_MPU6000
#define USE_GYRO_SPI_MPU6500
#define USE_ACC_SPI_MPU6500
#define USE_GYRO_SPI_MPU9250
#define USE_ACC_SPI_MPU9250
#define USE_GYRO_SPI_ICM20602
#define USE_ACC_SPI_ICM20602
#define USE_GYRO_SPI_ICM20689
#define USE_ACC_SPI_ICM20689
#define USE_ACCGYRO_BMI270
#define USE_GYRO_SPI_ICM42605
#define USE_ACC_SPI_ICM42605
#define USE_GYRO_SPI_ICM42688P
#define USE_ACC_SPI_ICM42688P
#define USE_ACCGYRO_LSM6DSO
#define USE_ACCGYRO_LSM6DSV16X
```

### 4.2.2 Defines for FLASH

Define correct flash driver(s) only if physical present on the board.

```
#define USE_FLASH_M25P16           // 16Mb (2MB) Micron M25P16 and many others (https://github.com/betaflight/betaflight/blob/master/src/main/drivers/flash/flash_m25p16.c#L68)
#define USE_FLASH_PY25Q128HA       // 128Mb (16MB) PUYA semi 25Q128
#define USE_FLASH_W25N01G          // 1Gb (128MB) NAND flash support
#define USE_FLASH_W25N02K          // 2Gb (256MB) NAND flash support
#define USE_FLASH_W25M             // 16, 32, 64 or 128MB Winbond stacked die support
#define USE_FLASH_W25M512          // 512Mb (64 MB, 256Mb x 2 stacked) NOR flash support
#define USE_FLASH_W25M02G          // 2Gb (256MB, 1Gb x 2 stacked) NAND flash support
#define USE_FLASH_W25Q128FV        // 128Mb (16MB) Winbond 25Q128 and 16 Mb (2MB) 25Q16 support (for quad and octo SPI support, for standard SPI use USE_FLASH_M25P16)
```

### 4.2.3 Defines for BARO

Define a barometer only if physical present on the board.

```
#define USE_BARO_MS5611
#define USE_BARO_SPI_MS5611
#define USE_BARO_BMP280
#define USE_BARO_SPI_BMP280
#define USE_BARO_BMP388
#define USE_BARO_SPI_BMP388
#define USE_BARO_LPS
#define USE_BARO_SPI_LPS
#define USE_BARO_QMP6988
#define USE_BARO_SPI_QMP6988
#define USE_BARO_DPS310
#define USE_BARO_SPI_DPS310
#define USE_BARO_2SMBP_02B
#define USE_BARO_SPI_2SMBP_02B
#define USE_BARO_LPS22DF
#define USE_BARO_SPI_LPS22DF
```

### 4.2.4 Defines for MAG

Define a magnetometer only if physical present on the board.

```
#define USE_MAG_DATA_READY_SIGNAL
#define USE_MAG_HMC5883
#define USE_MAG_SPI_HMC5883
#define USE_MAG_QMC5883
#define USE_MAG_LIS3MDL
#define USE_MAG_AK8963
#define USE_MAG_MPU925X_AK8963
#define USE_MAG_SPI_AK8963
#define USE_MAG_AK8975
#define USE_MAG_IST8310
```

### 4.2.5 Defines for SX1280

For SPI based SX1280 target designs add the following defines:

```
#define USE_RX_EXPRESSLRS
#define USE_RX_EXPRESSLRS_TELEMETRY
#define USE_RX_SX1280
#define RX_CHANNELS_AETR
```

### 4.2.6 Defines for OSD

```
#define USE_MAX7456
```

### 4.2.7 Defines for SDCARD

```
#define USE_SDCARD
```

### 4.2.8 Defines for CC2500

For SPI based CC2500 target designs add the following define:

```
#define USE_RX_CC2500
```

## 4.3 Usage of the Cloud Build API

See reference to [cloud build API](/docs/development/API/Cloud-Build-API)

# 5 Information for Marketing Purposes

- Betaflight is an open source flight controller software (firmware) used to fly multi-rotor and fixed wing aircraft.

- The Betaflight name and logos are registered trademarks and may not be used in any commercial products or services without prior approval from the project.

- Betaflight is a fork of Baseflight and Cleanflight, with an emphasis focused on flight performance, leading-edge feature additions, and wide target support. Combining cutting edge flight performance with diverse hardware support, Betaflight is the leading solution for high performance small unmanned aircraft.

- This project is operated and maintained by volunteers, with community support from pilots with a diverse range of flight goals.

- Pilots flying Betaflight have won every major FAI, MultiGP, and other major FPV multirotor racing event since 2019.

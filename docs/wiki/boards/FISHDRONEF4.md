### Description

The FishDroneTeam F4 Tower Flight Controller is an integrated flight controller and OSD and VTX specifically designed for ease of use and outstanding flight performance. The SPI-connected ICM20602 inertial motion sensor was chosen for it's high reliability, accuracy and update speed. This board has no problem running fast loop times and ESC protocols. There is an onboard barometer for altitude sensing along with an On Screen Display (OSD) chip directly connected to the main processor (MCU). This tight integration between the MCU and the OSD enables fast updates to the display and easy configuration of the OSD, which is managed straight from the BetaFlight configuration tool. You no longer need to worry about the extra hassle of configuring your OSD with a USB/UART adapter and 3rd party configuration tool, it's all built into the flight control software.

---

### Hardware

- MCU : STM32F405RGT6
- IMU : ICM-20602 (SPI)
- IMU Interrupt : Yes
- Compass & Baro : no support it (only designed for fpv)
- VCP : Yes
- OSD : Yes, BetaFlight OSD (BFOSD)
- VTX : Yes
- Blackbox : Yes ( 16MB Flash or TF support )
- Battery Voltage Sensor: Yes, directly connected, no wiring necessary
- Integrated Voltage Regulator: Yes, support for 2S-6S battery
- Buttons : 1 - DFU
- Brushed Motor Mosfets : No
- UART : UART1 & UART3 & UART6

---

### Features

- All in one design
- STM32F405 32-bit processor at 168MHz, 1Mb flash, 192kb ram
- ICM-20602 MPU connected via SPI
- Micro USB connectivity using STM Virtual Communications Port
- Serial or PPM input (does not support individual PWM channel input)
- Has outputs for up to 4 ESCs
- Tactile button for booting to STM boot loader
- Built in inverter for SmartPort (UART3)
- Built in inverter for SBUS input (UART6)
- Onboard 16mb Flash
- Current Sensor : Not implemented
- BlHeli passthrough : Yes
- WS2811 Led Strip : Yes
- Beeper : Yes
- Transponder: No

---

### Manufacturers and Distributors

---

### Hardware Designs

The hardware is currently closed source. It may be in the future that older revisions will be made publicly available.

---

### Other Resources

Rcgroups Thread :

---

### FAQ

---

### Images

#### (This is a test version, the official version is coming soon.)

![Top](https://cloud.githubusercontent.com/assets/10217966/20665049/fa097b0e-b598-11e6-9ddc-8f1ef4cedafd.png)
![bottom](https://cloud.githubusercontent.com/assets/10217966/20665058/019f9bf0-b599-11e6-8658-aea17a6b8e72.png)

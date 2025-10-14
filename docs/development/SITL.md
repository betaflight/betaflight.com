# SITL

## SITL in Gazebo

SITL (software in the loop) simulator allows you to run Betaflight without any hardware.

### Install Gazebo

Official [Installation](https://gazebosim.org/docs)

:::info

https://ubuntu.com/blog/install-gazebo-for-ros-2-in-under-a-minute

:::

Please also check [Vehicle Gateway](https://github.com/osrf/vehicle_gateway)

### Build Betaflight

Run `make TARGET=SITL`

### Betaflight Web App

Starting from Betaflight 2025.12 online configurator is required which uses websockets for communication with SITL.

To setup and configure a proxy use the following instructions in a new terminal session:

```
git clone git@github.com:novnc/websockify-other.git
cd websockify-other/c
make
./websockify 127.0.0.1:6761 127.0.0.1:5761
```

Open the Betaflight Online Configurator, and in Options enable "manual connection mode"

Then establish a connection by using address `ws://127.0.0.1:6761` in the Port field and clicking Connect.

### Settings

To avoid the simulation speed slowing down, it is suggested to set some settings, shown below:

In `configuration` page:

1. `ESC/Motor`: `PWM`, disable `Motor PWM speed Sparted from PID speed`
2. `PID loop frequency` as high as it can.

### Start and Run

1. Start Betaflight: `./obj/main/betaflight_SITL.elf`
2. Start Gazebo: `gazebo --verbose ./iris_arducopter_demo.world`
3. Connect your transmitter and fly/test, used app to send `MSP_SET_RAW_RC`, see [code](https://github.com/cs8425/msp-controller).

:::note

Betaflight -> Gazebo `udp://127.0.0.1:9002`
Gazebo -> Betaflight `udp://127.0.0.1:9003`

UARTx will bind on `tcp://127.0.0.1:576x` when the port has been opened.

`eeprom.bin`, size 8192 Byte, is for config saving.
Size can be changed in `src/main/target/SITL/pg.ld` >> `__FLASH_CONFIG_Size`

:::

## SITL in RealFlight 9

[RealFlight](https://www.realflight.com/) is one of the best commercial RC simulators with accurate airplane, helicopter, and multirotor simulations.
ArduPilot also offers [RealFlight SITL](https://ardupilot.org/dev/docs/sitl-with-realflight.html).
To use it you may need to purchase it on [Steam](https://store.steampowered.com/app/1070820/RealFlight_95S/) or [official website](https://www.realflight.com/).

### Setup

To let Betaflight SITL work with RealFlight, you need Windows 10 or Windows 11 with WSL.
Ubuntu 20.04 in WSL2 on Windows 11 x64 is tested.
[RealFlightBridge](https://github.com/xuhao1/RealFlightBridge) is also required.

On WSL2, you need to configure the Betaflight following [document here](/docs/development/building/Building-in-Windows).

Build Betaflight with

```bash
$ make TARGET=SITL
```

On Windows, download RealFlightBridge by

```bash
$ git clone https://github.com/xuhao1/RealFlightBridge.git
```

Import the quadcopter for RealFlight and Betaflight at **models/Quadcopter X Betaflight - flightaxis_AV.RFX** in RealFlightBridge. A detailed guide for improtanting can be found [here](https://ardupilot.org/dev/docs/sitl-with-realflight.html).
Moreover, update the setting of RealFlight to allow API.
![](/img/sitl/rf_settings.jpg)

You also need to prepare a controller for running SITL.
We recommend to use transmitter with OpenTX/EdgeTX as a game controller. In addition, mixers of channel 5 and 6 should be mapped to two switches for arming and changing mode.
![](/img/sitl/transmitter.jpg)

### SITL

To running SITL, you may need to:

1. Open and select the newly improted model **Quadcopter X Betaflight - flightaxis** in RealFlight.
   ![](/img/sitl/select.jpg)

   You need to restart RealFlight after you _edit_ the model in RealFlight!

2. Starting the RealFlightBridge in **Windows** by

   ```bash
   $ python betaflight_bridge.py
   ```

   You must start RealFlightBridge in Windows **before** start the Betaflight SITL.

3. Start the Betaflight SITL.
   First you need to get the Windows' IP in WSL.
   In WSL enter

   ```bash
   $ (ipconfig.exe | grep 'vEthernet (WSL)' -A4 | cut -d":" -f 2 | tail -n1 | sed -e 's/\s*//g')
   172.19.32.1
   $ ifconfig
   eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
       inet 172.19.41.192 netmask 255.255.240.0  broadcast 172.19.47.255
       inet6 fe80::215:5dff:fea4:215d  prefixlen 64  scopeid 0x20<link>
       ether 00:15:5d:a4:21:5d  txqueuelen 1000  (Ethernet)
       RX packets 219079  bytes 32440158 (32.4 MB)
       RX errors 0  dropped 0  overruns 0  frame 0
       TX packets 145744  bytes 10533796 (10.5 MB)
       TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
   ```

   172.19.32.1 is the example output of your Windows IP and 172.19.41.192 is your WSL IP. **These IPs change every time you reboot the computer.**

   Then go to the Betaflight root and start the SITL with this IP.

   ```bash
   $ cd ~/develop/betaflight/
   $ ./obj/main/betaflight_SITL.elf 172.19.32.1
   The SITL will output to IP 172.19.32.1:9002 (Gazebo) and 172.19.32.1:9001 (RealFlightBridge)
   [system]Init...
   init PwmOut UDP link to gazebo 172.19.32.1:9002...0
   init PwmOut UDP link to RF9 172.19.32.1:9001...0
   start UDP server @9003...0
   start UDP server for RC input @9004...0
   [FLASH_Unlock] loaded 'eeprom.bin', size = 32768 / 32768
   [timer]Init...
   [data]new fdm 136 t:182.834571 from 0.0.0.0:0
   [data]new rc 40: t:182.834571 AETR: 1498 1501 1105 1501 AUX1-4: 1100 1899 1899 1100
   bind port 5761 for UART1
   unusedPinsInit
   ```

   Then you can open the Betaflight App on **Windows** to connect to RealFlight via **WSL IP**.
   ![](/img/sitl/betaflight.jpg)

   After connect to Betaflight you need to apply this [DIFF file](/sitl/BTFL_quadcopter_rf9.txt) and set the arming switch with your controller.

4. Finally, you can arm and take-off the Quadcopter with Betaflight SITL in RealFlight with your controller.

![](/img/sitl/SITL_RF.jpg)

### Customize

If you want to create your own model and extend the SITL, please refer to this [document](https://github.com/xuhao1/RealFlightBridge/blob/main/docs/realflight_protocol.md).

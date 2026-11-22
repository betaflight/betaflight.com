# Testing the Autopilot in SITL

This guide tells you how to test the autopilot and flight plan in SITL (Software In The Loop). SITL compiles the firmware as a Linux program. A simulator sends sensor data to SITL over UDP. SITL sends motor outputs back.

You can use two simulators:

- **The SITL harness.** A Python script in the firmware repository. It has a simple flight model and runs automatic test scenarios. It does not need a 3D simulator.
- **Gazebo Harmonic.** A full 3D physics simulator.

For the autopilot functions and settings, refer to [Flight Plan and Autopilot](/docs/wiki/guides/current/Flight-Plan-and-Autopilot).

## Build SITL

The SITL target includes the flight plan (`USE_FLIGHT_PLAN`), GPS (`USE_VIRTUAL_GPS`), altitude hold and position hold. You do not need extra flags.

```bash
cd /path/to/betaflight
make TARGET=SITL
```

The output is `obj/main/betaflight_SITL.elf`.

To test the wing autopilot, build a wing SITL:

```bash
make TARGET=SITL EXTRA_FLAGS="-DUSE_WING"
```

A wing build and a multirotor build have the same output file name. To keep both, copy each build to a different name after you make it:

```bash
make TARGET=SITL
cp obj/main/betaflight_SITL.elf betaflight_SITL_quad.elf
make TARGET=SITL EXTRA_FLAGS="-DUSE_WING"
cp obj/main/betaflight_SITL.elf betaflight_SITL_wing.elf
```

SITL has these command line options:

| Option            | Description                                                          |
| ----------------- | -------------------------------------------------------------------- |
| `--ip <address>`  | IP address of the simulator. The default is `127.0.0.1`.             |
| `--config <file>` | Applies the CLI commands in the file, saves `eeprom.bin`, and exits. |
| `--gpx`           | Writes the flight track and the waypoints to `sitl_track.gpx`.       |

SITL keeps its configuration in `eeprom.bin` in the current directory.

## Ports

| Port     | Direction          | Content                                        |
| -------- | ------------------ | ---------------------------------------------- |
| UDP 9001 | SITL to RealFlight | Raw PWM outputs.                               |
| UDP 9002 | SITL to Gazebo     | Motor speeds, 0.0 to 1.0.                      |
| UDP 9003 | Simulator to SITL  | FDM state (IMU, position, velocity, pressure). |
| UDP 9004 | Simulator to SITL  | RC channels.                                   |
| TCP 5761 | Both               | UART1 (MSP and CLI). UART*n* is TCP 5760+_n_.  |

### FDM Packet (UDP 9003)

```c
typedef struct {
    double timestamp;                       // seconds
    double imu_angular_velocity_rpy[3];     // rad/s, body frame
    double imu_linear_acceleration_xyz[3];  // m/s², body frame
    double imu_orientation_quat[4];         // w, x, y, z
    double velocity_xyz[3];                 // m/s, ENU (east, north, up)
    double position_xyz[3];                 // longitude, latitude, altitude (m)
    double pressure;                        // Pa
} fdm_packet;
```

With virtual GPS, `position_xyz` holds longitude, latitude and altitude. The altitude is AMSL. The Gazebo bridge mirrors latitude and longitude around the first packet. SITL removes this mirror. If the latitude or longitude is out of range, SITL sets the GPS to no fix.

### RC Packet (UDP 9004)

```c
typedef struct {
    double timestamp;       // seconds
    uint16_t channels[16];  // 1000 to 2000
} rc_packet;
```

## Test With the SITL Harness

The harness is `src/test/sitl/sitl_harness.py`. It does these steps for each scenario:

1. Writes a configuration with `--config`. ARM is on AUX1, AUTOPILOT is on AUX2 and ANGLE is on AUX3.
2. Starts SITL.
3. Sends RC and FDM packets from a simple quad or wing model.
4. Reads the flight modes and arming flags over MSP on TCP 5761.
5. Flies the scenario and checks the result.

Run one scenario:

```bash
python3 src/test/sitl/sitl_harness.py --binary obj/main/betaflight_SITL.elf --scenario mission_flight -v
```

Run one wing scenario. The harness uses the `--binary-wing` file for the wing scenarios:

```bash
python3 src/test/sitl/sitl_harness.py --binary betaflight_SITL_quad.elf --binary-wing betaflight_SITL_wing.elf --scenario wing_mission -v
```

Run all scenarios:

```bash
python3 src/test/sitl/sitl_harness.py --binary obj/main/betaflight_SITL.elf --scenario all
```

This command does not run the A/B rescue scenarios or the wing scenarios. The harness shows them as `SKIP`. To run them, also give `--binary-b` and `--binary-wing`. Refer to the table below.

The harness writes a log for each scenario to `--workdir` (the default is `/tmp/sitl_harness`). If `blackbox_decode` is on your `PATH`, the harness also tries to decode each `.BFL` blackbox file in the scenario directory. The harness ignores decode errors, and decoding does not change the PASS or FAIL result.

| Scenarios                                                                                           | What they test                                                                                                                         |
| --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `mission_flight`, `mission_corner`, `mission_engage_backwards`                                      | Legs, corners and engagement.                                                                                                          |
| `mission_takeoff`, `mission_land`, `mission_vert_rate`                                              | Take off, landing with disarm, and vertical rate.                                                                                      |
| `mission_orbit`, `mission_figure8`                                                                  | Hold patterns.                                                                                                                         |
| `mission_yaw`, `mission_face_target`, `mission_face_next`                                           | Yaw behaviour.                                                                                                                         |
| `rx_disable`, `rx_continue`, `rx_land`                                                              | `ap_rx_loss_policy`.                                                                                                                   |
| `geofence_land`, `geofence_rth`, `geofence_rth_rxloss`                                              | `ap_max_distance_from_home` and `ap_geofence_action`.                                                                                  |
| `rescue*`                                                                                           | GPS Rescue flown as a flight plan. Some scenarios need `--binary-b`.                                                                   |
| `wing_mission`, `wing_mission_wind`, `wing_mission_land`                                            | Wing missions: lines, corners, loiter holds and a landing at a `LAND` waypoint. These and all `wing_*` scenarios need `--binary-wing`. |
| `wing_autoland`, `wing_autoland_crosswind`, `wing_autoland_headwind`, `wing_autoland_tailwind_flip` | Wing landing circuit, flare and touchdown, also in wind.                                                                               |
| `wing_go_around_stick`, `wing_go_around_baro`, `wing_go_around_gps`                                 | Wing go around.                                                                                                                        |
| `wing_launch_into_althold`, `wing_launch_into_poshold`                                              | Hand launch, then the hold takes control.                                                                                              |
| `wing_loiter*`, `wing_althold`, `wing_turn*`                                                        | Wing position hold (loiter), altitude hold and turns.                                                                                  |
| `wing_rx_loss_*`, `wing_rescue*`                                                                    | Wing receiver signal loss and GPS Rescue.                                                                                              |

The harness uses TCP 5761. While the harness runs, the Betaflight App cannot connect to UART1.

## Test With Gazebo Harmonic

### Install Gazebo

The [aeroloop_gazebo](https://github.com/betaflight/aeroloop_gazebo) repository has the models, the worlds and the Betaflight bridge plugin. Use the `gz` branch.

```bash
git clone -b gz https://github.com/betaflight/aeroloop_gazebo.git ~/aeroloop_gazebo
cd ~/aeroloop_gazebo
./install_gazebo_harmonic.sh
./build_plugin.sh
```

The install script adds the OSRF package repository and installs `gz-harmonic`. It supports Ubuntu 22.04 to 24.04. You cannot install `gz-harmonic` together with Gazebo Classic (`gazebo11`).

`build_plugin.sh` builds `libBetaflightPlugin.so` in `plugins/build/`. The plugin reads motor speeds from UDP 9002 and sends FDM packets to UDP 9003.

The main world is `betaloop_iris_betaflight_demo_harmonic.sdf`. Its origin is 40.46350, -79.51825 at an elevation of 0 m. Thus in this world, the altitude AMSL is the height above the ground.

### Start the Simulation

The [Betaloop](https://github.com/betaflight/betaloop) launcher (`gz` branch) starts Gazebo and SITL together:

```bash
git clone -b gz https://github.com/betaflight/betaloop.git ~/betaloop
cd ~/betaloop
python3 start.py --gazebo-assets ~/aeroloop_gazebo --world betaloop_iris_betaflight_demo_harmonic.sdf --elf /path/to/betaflight/obj/main/betaflight_SITL.elf --gazebo
```

Betaloop also starts websockify on port 6761 for the Betaflight App. Thus websockify must be on your `PATH` before you start Betaloop. If you installed websockify in a virtual environment (refer to [Connect the Betaflight App](#connect-the-betaflight-app)), activate it first with `source ~/.venv/websockify/bin/activate`. If you do not want Betaloop to start websockify, add `--disable-websockify` and start websockify yourself.

Betaloop starts SITL in the directory of the ELF file (`obj/main`). Thus SITL keeps `eeprom.bin` in that directory.

To start the parts manually, use two terminals:

```bash
# Terminal 1
cd /path/to/betaflight
./obj/main/betaflight_SITL.elf
```

```bash
# Terminal 2
cd ~/aeroloop_gazebo
./start_gazebo.sh betaloop_iris_betaflight_demo_harmonic.sdf
```

Gazebo does not send RC packets. Send them to UDP 9004 with your own script, or use the `RcFeed` class in the SITL harness.

### Physics Settings

- Keep `max_step_size` at 0.0025 s or less.
- If the computer cannot run in real time, decrease `real_time_update_rate`.

## Connect the Betaflight App

The browser cannot open a TCP port. Use websockify to connect the app to UART1. If Betaloop already started websockify, do not start a second one.

```bash
python3 -m venv ~/.venv/websockify
~/.venv/websockify/bin/pip install websockify
~/.venv/websockify/bin/websockify 127.0.0.1:6761 127.0.0.1:5761
```

In the app options, turn on **Expert Mode** and **Enable manual connection mode**. Then select **Betaflight SITL** (`ws://127.0.0.1:6761`) and click **Connect**. The desktop app connects to `tcp://127.0.0.1:5761` directly.

On SITL, `save` and `exit` stop the SITL program. Thus after you click **Save** in a tab (for example the Flight Plan tab), start SITL again from the same directory. SITL reads `eeprom.bin` from the current directory. If you start it from a different directory, it does not find your configuration and flight plan.

## Configure SITL

Use the CLI:

```
feature GPS
set gps_provider = VIRTUAL
aux 0 0 0 1700 2100 0 0
aux 1 56 1 1700 2100 0 0
aux 2 1 2 1700 2100 0 0
set mag_calibration = 1,1,1
set ap_max_distance_from_home = 500
set ap_geofence_action = LAND
set ap_rx_loss_policy = LAND
set debug_mode = FLIGHT_PLAN
save
```

- The `aux` lines put ARM on AUX1, AUTOPILOT (mode 56) on AUX2 and ANGLE on AUX3.
- The virtual magnetometer has no calibration. `mag_calibration = 1,1,1` marks it as calibrated, so that the autopilot trusts the heading.

Then add a flight plan with the `waypoint` command, or with the Flight Plan tab. Refer to [The waypoint Command](/docs/wiki/guides/current/Flight-Plan-and-Autopilot#the-waypoint-command).

## Fly a Mission

1. Wait for a GPS fix and no arming disable flags.
2. Set AUX3 (ANGLE) and AUX1 (ARM) high. The throttle must be low.
3. Increase the throttle above `airmode_start_throttle_percent`.
4. Set AUX2 (AUTOPILOT) high.
5. Set the throttle to mid stick. The autopilot ignores the throttle during a leg.

You cannot open the CLI while the aircraft is armed. To monitor the mission, record a blackbox log with `debug_mode = FLIGHT_PLAN`, or use the `--gpx` track.

## Things to Check

| Test                                                                  | Expected result                                                                                                              |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Engage the AUTOPILOT switch before you arm.                           | Arming is not possible. The arming disable flag is AUTOPILOT.                                                                |
| Fly a plan of `FLYOVER` and `FLYBY` waypoints.                        | The aircraft flies through the middle waypoints without a stop. `FLYBY` corners are smoother. It stops on the last waypoint. |
| Fly a `HOLD` with a duration and `ORBIT` or `FIGURE8`.                | The aircraft slows, flies the pattern with radius `ap_waypoint_hold_radius`, then continues.                                 |
| End the plan with `LAND`.                                             | The aircraft descends at `ap_landing_descent_rate`, detects touchdown and disarms.                                           |
| Set `ap_max_distance_from_home` less than the distance to a waypoint. | When the aircraft goes outside the limit, it lands (`LAND`) or flies home and lands (`RTH`).                                 |
| Stop the RC packets during a mission.                                 | The result agrees with `ap_rx_loss_policy`.                                                                                  |
| Stop the GPS (send an out of range latitude).                         | The AUTOPILOT mode disengages.                                                                                               |
| Set the AUTOPILOT switch off and on again.                            | The mission starts again at waypoint 1.                                                                                      |

## Troubleshooting

### SITL Gets No FDM Data

- Make sure that the simulator sends to `127.0.0.1:9003`.
- Monitor the traffic with `sudo tcpdump -i lo udp port 9003`.

### No GPS Fix

- Make sure that `position_xyz` holds longitude, latitude and altitude, in that order.
- Make sure that `gps_provider` is `VIRTUAL` and the GPS feature is on.

### The AUTOPILOT Mode Does Not Engage

- Make sure that the aircraft is armed and the GPS has a 3D fix.
- Make sure that you increased the throttle after you armed.
- Make sure that GPS Rescue is not active.
- Make sure that the AUTOPILOT mode is on an AUX channel and the channel is in the range.

### The Mission Stops

Set `debug_mode = FLIGHT_PLAN` and look at `debug[1]` in the blackbox log. Refer to [Mission Stops](/docs/wiki/guides/current/Flight-Plan-and-Autopilot#mission-stops). In SITL, if the magnetometer is not marked as calibrated, the autopilot does not trust the heading. Set `mag_calibration = 1,1,1`.

### Websockify Does Not Connect

- Make sure that SITL runs and TCP 5761 is open.
- Make sure that no other program (for example the SITL harness) uses TCP 5761.
- Test the port with `nc 127.0.0.1 5761`.

## Repositories

| Repository                                                                  | Branch   | Purpose                                           |
| --------------------------------------------------------------------------- | -------- | ------------------------------------------------- |
| [betaflight/betaflight](https://github.com/betaflight/betaflight)           | `master` | Firmware, SITL target and the SITL harness.       |
| [betaflight/aeroloop_gazebo](https://github.com/betaflight/aeroloop_gazebo) | `gz`     | Gazebo Harmonic models, worlds and bridge plugin. |
| [betaflight/betaloop](https://github.com/betaflight/betaloop)               | `gz`     | Simulation launcher.                              |

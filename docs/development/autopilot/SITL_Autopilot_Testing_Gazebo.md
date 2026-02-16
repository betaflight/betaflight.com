# Testing Betaflight Autopilot with SITL and Gazebo on Ubuntu 24.04

This guide covers how to build, configure, and test the Betaflight autopilot waypoint navigation system using the SITL (Software In The Loop) simulator with Gazebo Harmonic as the physics/world model on Ubuntu 24.04 LTS.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Step 1: Install Gazebo Harmonic](#step-1-install-gazebo-harmonic)
- [Step 2: Build Betaflight SITL](#step-2-build-betaflight-sitl)
- [Step 3: Gazebo World and Quadcopter Model](#step-3-gazebo-world-and-quadcopter-model)
- [Step 4: Install the Betaloop Launcher](#step-4-install-the-betaloop-launcher)
- [Step 5: Configure Betaflight for Autopilot](#step-5-configure-betaflight-for-autopilot)
- [Step 6: Run the Simulation](#step-6-run-the-simulation)
- [Step 7: Upload a Flight Plan and Test](#step-7-upload-a-flight-plan-and-test)
- [Testing Scenarios](#testing-scenarios)
- [Troubleshooting](#troubleshooting)
- [Unit Tests](#unit-tests)
- [Reference](#reference)

---

## Overview

Betaflight SITL compiles the flight controller firmware as a native Linux x86_64 executable. Instead of reading real sensors and driving real motors, it communicates over UDP with an external physics simulator that provides sensor data (IMU, GPS, barometer) and consumes motor outputs.

The autopilot waypoint system (`src/main/flight/autopilot_waypoint.c`) implements a full waypoint navigation state machine supporting:

- **FLYOVER** waypoints (precision path, cross perpendicular plane)
- **FLYBY** waypoints (smooth corner cutting at turn radius)
- **HOLD** waypoints (station keeping with optional orbit/figure-8 patterns)
- **LAND** waypoints (autonomous descent with touchdown detection)
- **Geofencing** (max distance from home with configurable RTH or land actions)
- **Emergency landing** (immediate descent at current position)
- **L1 nonlinear guidance** (smooth path following between waypoints)

## Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                        Ubuntu 24.04 Host                            │
│                                                                      │
│  ┌────────────────────┐       UDP        ┌────────────────────────┐  │
│  │  Betaflight SITL   │◄────────────────►│   Gazebo Harmonic      │  │
│  │  (betaflight_SITL  │  9002: PWM out   │                        │  │
│  │       .elf)        │  9003: FDM in    │  ┌──────────────────┐  │  │
│  │                    │  9004: RC in     │  │  Quadcopter      │  │  │
│  │ ┌────────────────┐ │                  │  │  Model + Plugin  │  │  │
│  │ │ Autopilot      │ │                  │  └──────────────────┘  │  │
│  │ │ - Waypoints    │ │                  │                        │  │
│  │ │ - Pos Control  │ │                  │  ┌──────────────────┐  │  │
│  │ │ - L1 Guidance  │ │                  │  │  World Physics   │  │  │
│  │ │ - Landing      │ │                  │  │  (ODE/Bullet)    │  │  │
│  │ └────────────────┘ │                  │  └──────────────────┘  │  │
│  └──────┬─────────────┘                  └────────────────────────┘  │
│         │ TCP :5761                                                   │
│  ┌──────▼─────────────┐                                              │
│  │  Betaflight App    │                                              │
│  │  (Configurator)    │                                              │
│  └────────────────────┘                                              │
└──────────────────────────────────────────────────────────────────────┘
```

### UDP Port Map

| Port | Direction         | Content                        |
|------|-------------------|--------------------------------|
| 9001 | SITL → RealFlight | Raw PWM output (1100-1900 μs)  |
| 9002 | SITL → Gazebo     | Motor speeds [0.0 - 1.0]       |
| 9003 | Gazebo → SITL     | FDM state (IMU, position, etc) |
| 9004 | External → SITL   | RC channel input               |

### FDM Packet Format (port 9003, Gazebo → Betaflight)

```c
typedef struct {
    double timestamp;                       // seconds
    double imu_angular_velocity_rpy[3];     // rad/s (body frame)
    double imu_linear_acceleration_xyz[3];  // m/s² (NED, body frame)
    double imu_orientation_quat[4];         // quaternion [w, x, y, z]
    double velocity_xyz[3];                 // m/s (ENU for GPS mode)
    double position_xyz[3];                 // Lon, Lat, Alt (for GPS mode)
    double pressure;                        // Pa (barometer)
} fdm_packet;
```

> **Important**: When `USE_VIRTUAL_GPS` is enabled (default for SITL), position fields are interpreted as **Longitude, Latitude, Altitude** in ENU convention. Velocity fields are **Ve, Vn, Vup** (East, North, Up).

### Servo Packet Format (port 9002, Betaflight → Gazebo)

```c
typedef struct {
    float motor_speed[4];   // normalised [0.0, 1.0], 3D mode: [-1.0, 1.0]
} servo_packet;
```

## Prerequisites

- Ubuntu 24.04 LTS (Noble Numbat)
- GCC toolchain (`build-essential`)
- Git
- A web browser (for Betaflight App configurator)
- Python 3 (for websockify proxy)

Install build essentials:

```bash
sudo apt-get update
sudo apt-get install -y build-essential git curl wget lsb-release gnupg python3 python3-pip
```

## Step 1: Install Gazebo Harmonic

Gazebo Harmonic is the current LTS release and the recommended version for Ubuntu 24.04.

### Clone the Aeroloop Gazebo resources

The [aeroloop_gazebo](https://github.com/betaflight/aeroloop_gazebo) repository provides Gazebo models, world files, and the Betaflight bridge plugin. Clone it using the `gz` branch:

```bash
git clone -b gz https://github.com/betaflight/aeroloop_gazebo.git ~/aeroloop_gazebo
```

### Run the install script

The repository includes an automated installation script that handles adding the OSRF repository, GPG keys, and installing Gazebo Harmonic with all required development dependencies:

```bash
cd ~/aeroloop_gazebo
./install_gazebo_harmonic.sh
```

The script supports Ubuntu 22.04, 23.04, 23.10, and 24.04. It will install `gz-harmonic` along with the development libraries needed to build plugins (`libgz-sim8-dev`, `libgz-plugin2-dev`, `libgz-math7-dev`, etc.).

Verify the installation:

```bash
gz sim --version
```

> **Note**: `gz-harmonic` cannot be installed alongside `gazebo-classic` (gazebo11). If you have the old Gazebo installed, remove it first with `sudo apt remove gazebo11`.

## Step 2: Build Betaflight SITL

```bash
cd /path/to/betaflight

# Clean any previous build
make clean

# Build the SITL target (with flight planning enabled)
make TARGET=SITL EXTRA_FLAGS="-DENABLE_FLIGHT_PLANNING=1"
```

The output binary will be at `obj/main/betaflight_SITL.elf`.

### Verify the build

```bash
./obj/main/betaflight_SITL.elf &
# Should print:
#   [SITL] The SITL will output to IP 127.0.0.1:9002 (Gazebo) and 127.0.0.1:9001 (RealFlightBridge)
kill %1
```

## Step 3: Gazebo World and Quadcopter Model

Gazebo Harmonic uses the new `gz sim` command (not the classic `gazebo` command) and SDF format world files. The [aeroloop_gazebo](https://github.com/betaflight/aeroloop_gazebo) repository (cloned in Step 1) provides ready-made models and worlds.

### Available Models

The `models/` directory includes several quadcopter configurations:

- **betaloop_iris_with_standoffs** — Iris quadcopter (primary test model)
- **betaloop_iris_with_standoffs_demo** — Demo variant with gimbal
- **quadcopter_model** — Generic quadcopter
- Component models: motors (`motor_emax_rs2306`), camera (`camera_runcam_micro_swift`), battery (`battery_tattu_1300`), gimbal (`betaloop_gimbal_2d`)

### Available Worlds

The `worlds/` directory includes several SDF world files for Gazebo Harmonic:

- `betaloop_iris_betaflight_demo_harmonic.sdf` — Main demo world for Betaflight SITL
- `test_harmonic.sdf` — Basic test world
- `test_betaflight.sdf` — Betaflight-specific test world
- `quadcopter_test_harmonic.sdf` — Quadcopter testing world

### Build the Betaflight Bridge Plugin

The bridge plugin handles the UDP communication between Gazebo and Betaflight SITL. Build it using the provided script:

```bash
cd ~/aeroloop_gazebo
./build_plugin.sh
```

This runs CMake and compiles `libBetaflightPlugin.so` into the `plugins/build/` directory. The plugin:

1. Reads motor commands from Betaflight via UDP port 9002
2. Applies motor forces to the Gazebo quadcopter model using PID-based velocity control
3. Reads sensor data (IMU, GPS, barometer) from the Gazebo simulation
4. Packs and sends FDM packets to Betaflight via UDP port 9003

**Physics tuning notes** (in the world SDF files):
- `max_step_size` should not exceed `0.0025` (2.5 ms) for stability
- `real_time_update_rate` of `400` requires a reasonably fast CPU
- Lower to `100` if your machine cannot keep up with real-time
- The ratio of `real_time_update_rate × max_step_size` determines simulation speed factor

## Step 4: Install the Betaloop Launcher

The [Betaloop](https://github.com/betaflight/betaloop) project provides a launcher that orchestrates the full simulation environment — starting Gazebo, Betaflight SITL, and optional components (virtual radio, video receiver) in a single command.

```bash
git clone -b gz https://github.com/betaflight/betaloop.git ~/betaloop
```

### Configure Betaloop

Create a `config.txt` file in the `betaloop` directory:

```ini
[Betaloop]
AeroloopGazeboHome=~/aeroloop_gazebo
World=betaloop_iris_betaflight_demo_harmonic.sdf
BetaflightElf=/path/to/betaflight/obj/main/betaflight_SITL.elf
```

Alternatively, pass paths as command-line arguments (see Step 6).

## Step 5: Configure Betaflight for Autopilot

### Connect to the SITL

Betaflight 2025.12+ uses websockets for the configurator connection. Set up the proxy:

```bash
# Install websockify
pip3 install websockify

# Run the proxy (UART1 is at TCP port 5761)
websockify 127.0.0.1:6761 127.0.0.1:5761 &
```

Open the [Betaflight App](https://app.betaflight.com), enable manual connection mode, and connect to `ws://127.0.0.1:6761`.

### Essential SITL Settings

In the Betaflight configurator:

1. **Configuration tab**:
   - ESC/Motor Protocol: `PWM`
   - Disable "Motor PWM speed separated from PID speed"
   - Set PID loop frequency as high as possible

2. **Modes tab**:
   - Assign `AUTOPILOT` mode to an AUX channel (e.g., AUX1 > 1700)
   - Assign `ARM` to an AUX channel

### Autopilot Configuration via CLI

Connect to the CLI (via configurator or TCP) and set autopilot parameters:

```
# Position control gains
set ap_position_p = 40
set ap_position_i = 10
set ap_position_d = 30
set ap_position_a = 20
set ap_position_cutoff = 5

# Altitude control
set ap_altitude_p = 50
set ap_altitude_i = 30
set ap_altitude_d = 20
set ap_altitude_f = 10
set ap_hover_throttle = 1500

# Waypoint navigation
set ap_waypoint_arrival_radius = 500
set ap_waypoint_hold_radius = 200
set ap_max_angle = 25

# L1 guidance (smooth path following)
set ap_l1_enable = ON
set ap_l1_period = 20
set ap_l1_min_lookahead = 1000
set ap_l1_max_lookahead = 10000

# Landing
set ap_landing_descent_rate = 50
set ap_landing_detection_time = 10
set ap_landing_velocity_threshold = 50

# Yaw mode (velocity = nose follows direction of travel)
set ap_yaw_mode = VELOCITY
set ap_max_yaw_rate = 90

# Safety: Geofence
set ap_max_distance_from_home = 500
set ap_geofence_action = LAND

# Save
save
```

## Step 6: Run the Simulation

### Option A: Use the Betaloop Launcher (recommended)

The betaloop launcher starts Gazebo and Betaflight SITL together:

```bash
cd ~/betaloop
python3 start.py --gazebo-assets ~/aeroloop_gazebo \
                  --elf /path/to/betaflight/obj/main/betaflight_SITL.elf \
                  --gazebo
```

Use the `--gazebo` flag to launch with the Gazebo GUI. Without it, the simulation runs headless (useful for FPV mode with a video receiver). Use `-l` to interactively select from available world files.

If you have configured `config.txt` (see Step 4), simply run:

```bash
python3 start.py --gazebo
```

### Option B: Start Components Manually

#### Terminal 1: Start Betaflight SITL

```bash
cd /path/to/betaflight
./obj/main/betaflight_SITL.elf
```

You should see:
```
[SITL] The SITL will output to IP 127.0.0.1:9002 (Gazebo) and 127.0.0.1:9001 (RealFlightBridge)
[SITL] init PwmOut UDP link to gazebo 127.0.0.1:9002...0
[SITL] init PwmOut UDP link to RF9 127.0.0.1:9001...0
[SITL] start UDP server @9003...0
[SITL] start UDP server @9004...0
```

#### Terminal 2: Start Gazebo

Using the aeroloop_gazebo start script:

```bash
cd ~/aeroloop_gazebo
./start_gazebo.sh betaloop_iris_betaflight_demo_harmonic.sdf
```

Or manually set the environment variables and launch:

```bash
export SDF_PATH=~/aeroloop_gazebo/models:${SDF_PATH}
export GZ_SIM_RESOURCE_PATH=~/aeroloop_gazebo/worlds:${GZ_SIM_RESOURCE_PATH}
export GZ_SIM_SYSTEM_PLUGIN_PATH=~/aeroloop_gazebo/plugins/build:${GZ_SIM_SYSTEM_PLUGIN_PATH}

gz sim -r ~/aeroloop_gazebo/worlds/betaloop_iris_betaflight_demo_harmonic.sdf
```

#### Terminal 3: Start the Websockify Proxy (for configurator)

```bash
websockify 127.0.0.1:6761 127.0.0.1:5761
```

### Terminal 4: Send RC Input (optional, for manual override testing)

You can inject RC commands via UDP port 9004 or use an MSP controller application. The RC packet format is:

```c
typedef struct {
    double timestamp;       // seconds
    uint16_t channels[16];  // RC values (typically 1000-2000)
} rc_packet;
```

A minimal Python script to arm and activate autopilot mode:

```python
#!/usr/bin/env python3
"""Send RC commands to Betaflight SITL via UDP port 9004."""

import socket
import struct
import time

SITL_RC_PORT = 9004
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

def send_rc(channels):
    timestamp = time.time()
    # Pack: double timestamp + 16 x uint16_t channels
    data = struct.pack('<d', timestamp)
    for ch in channels:
        data += struct.pack('<H', ch)
    sock.sendto(data, ('127.0.0.1', SITL_RC_PORT))

# Channel mapping (adjust to match your mode assignments):
#   CH1=Roll, CH2=Pitch, CH3=Throttle, CH4=Yaw, CH5=ARM, CH6=AUTOPILOT
MID = 1500
channels = [MID] * 16

# Arm the craft (CH5 high)
channels[4] = 2000   # ARM
channels[2] = 1100   # Throttle low for arming

print("Arming...")
for _ in range(100):
    send_rc(channels)
    time.sleep(0.02)

# Raise throttle to hover
channels[2] = 1500
print("Hovering...")
for _ in range(200):
    send_rc(channels)
    time.sleep(0.02)

# Enable autopilot mode (CH6 high)
channels[5] = 2000
print("Autopilot engaged!")
while True:
    send_rc(channels)
    time.sleep(0.02)
```

## Step 7: Upload a Flight Plan and Test

Flight plans are stored as waypoints in the Betaflight configuration. Upload via CLI.

### Upload via CLI

The `waypoint` command manages the flight plan. The syntax is:

```
waypoint insert <idx> <lat> <lon> <alt> <spd> <type> <dur> <pat>
waypoint update <idx> <lat> <lon> <alt> <spd> <type> <dur> <pat>
waypoint remove <idx>
waypoint list
waypoint status
waypoint clear
```

Where:
- `idx` — waypoint index (0-based)
- `lat` / `lon` — decimal degrees (e.g., `40.4640000`, `-79.5175000`)
- `alt` — altitude in centimetres above home
- `spd` — speed in cm/s (0 = default)
- `type` — `FLYOVER`, `FLYBY`, `HOLD`, or `LAND`
- `dur` — duration in deciseconds (0 = infinite)
- `pat` — hold pattern: `ORBIT` or `FIGURE8`

Example: a square pattern around 40.4635°N, 79.5182°W at 50 m altitude:

```
# Clear any existing waypoints
waypoint clear

# WP0: Fly to north-east corner (FLYOVER)
waypoint insert 0 40.4640000 -79.5175000 5000 0 FLYOVER 0 ORBIT

# WP1: Fly to south-east corner (FLYBY - smooth turn)
waypoint insert 1 40.4630000 -79.5175000 5000 0 FLYBY 0 ORBIT

# WP2: Hold at south-west corner with orbit pattern for 30 seconds
waypoint insert 2 40.4630000 -79.5190000 5000 0 HOLD 300 ORBIT

# WP3: Return and land at start position
waypoint insert 3 40.4640000 -79.5190000 5000 0 LAND 0 ORBIT

# Verify the flight plan
waypoint list

save
```

### Waypoint Coordinate System

| Field       | CLI Format              | Internal Storage      | Example               |
|-------------|-------------------------|-----------------------|-----------------------|
| `latitude`  | decimal degrees         | degrees × 10^7       | `40.4635100` → 404635100 |
| `longitude` | decimal degrees         | degrees × 10^7       | `-79.5181700` → -795181700 |
| `altitude`  | centimetres above home  | int32 cm              | `5000` = 50 m         |
| `speed`     | cm/s                    | uint16 cm/s           | `500` = 5 m/s         |
| `duration`  | deciseconds (0.1s)      | uint16 deciseconds    | `300` = 30 seconds    |

### Waypoint Types

| Type       | Behaviour                                                |
|------------|----------------------------------------------------------|
| `FLYOVER`  | Crosses perpendicular plane through waypoint (precision) |
| `FLYBY`    | Begins turn at computed turn radius (smooth)             |
| `HOLD`     | Maintains position; optional orbit/figure-8 pattern      |
| `LAND`     | Descends at configured rate with touchdown detection      |

### Hold Patterns

| Pattern    | Behaviour                                  |
|------------|--------------------------------------------|
| `ORBIT`    | Circle around waypoint at configured radius |
| `FIGURE8`  | Figure-8 pattern centred on waypoint        |

## Testing Scenarios

### Scenario 1: Basic Waypoint Navigation

**Objective**: Verify the state machine transitions through APPROACHING → ARRIVED → next waypoint.

1. Upload a 3-waypoint FLYOVER mission
2. Arm and activate autopilot mode
3. Observe state transitions in blackbox log or OSD
4. Verify the craft visits each waypoint in order
5. Confirm final state is `WP_STATE_COMPLETE`

**What to monitor**:
- Distance to current waypoint decreasing
- State transitions at correct distances (arrival radius = 5 m default)
- Target coordinates updating when advancing waypoints

### Scenario 2: FLYBY vs FLYOVER Comparison

**Objective**: Verify smooth turns for FLYBY and precise tracking for FLYOVER.

1. Upload a zigzag mission with alternating FLYBY and FLYOVER waypoints
2. Compare ground tracks in blackbox log
3. FLYBY waypoints should show smooth curves
4. FLYOVER waypoints should show overshoot and correction

**Turn radius formula** (FLYBY):
```
R = V² / (g × tan(maxAngle))
```
At 5 m/s with maxAngle=25°: R ≈ 5.5 m

### Scenario 3: Hold with Orbit Pattern

**Objective**: Verify the craft enters and maintains an orbit pattern.

1. Upload a single HOLD waypoint with the pattern set to `ORBIT`
2. Set orbit radius to 10 m, turn rate to 3°/s
3. Observe state transitions: APPROACHING → ARRIVED → HOLDING → ORBITING
4. Verify the craft follows a circular path around the waypoint
5. If duration is set, verify the craft advances after timeout

### Scenario 4: Landing Sequence

**Objective**: Verify autonomous landing with touchdown detection.

1. Upload a single LAND waypoint at the current position
2. Observe descent at the configured rate (default 50 cm/s)
3. Monitor altitude decreasing steadily
4. Verify touchdown detection triggers when:
   - Below landing altitude
   - Ground speed < velocity threshold (50 cm/s)
   - Throttle below hover - threshold
5. Confirm the craft disarms after detection time (1 s default)

### Scenario 5: Geofence Violation

**Objective**: Verify geofence enforcement during mission.

1. Set `ap_max_distance_from_home = 100` (100 m limit)
2. Upload a waypoint at 150 m from home
3. Verify the mission is **rejected** at startup (`WP_STATE_IDLE`)
4. Upload a valid mission, then manually move the craft beyond 100 m
5. Verify emergency landing or RTH triggers depending on `ap_geofence_action`

### Scenario 6: Emergency Landing (RX Loss)

**Objective**: Verify behaviour when RC signal is lost.

1. Set `ap_rx_loss_policy = LAND`
2. Begin a multi-waypoint mission
3. Stop sending RC packets (kill the RC sender script)
4. Verify the craft enters emergency landing at current position
5. Confirm `WP_STATE_LANDING` with a LAND waypoint at current GPS coordinates

### Scenario 7: L1 Guidance Path Following

**Objective**: Verify smooth path following between waypoints.

1. Enable L1 guidance (`ap_l1_enable = ON`)
2. Upload a long straight-line mission (2 waypoints, 200 m apart)
3. Introduce a crosswind in Gazebo (wind plugin)
4. Observe cross-track error correction
5. Verify the craft follows the line between waypoints, not just pointing at each one

### Scenario 8: Return to Home

**Objective**: Verify the RTH function creates correct waypoints.

1. Fly to a location away from home
2. Trigger RTH (via MSP command or geofence)
3. Verify 2 waypoints are created: FLYOVER at home + LAND at home
4. Observe the craft fly home and land

## Troubleshooting

### SITL not receiving FDM data

- Check that Gazebo is sending UDP packets to `127.0.0.1:9003`
- Verify the bridge plugin is loaded: `gz sim --list-plugins`
- Check for firewall rules blocking UDP: `sudo ufw status`
- Monitor traffic: `sudo tcpdump -i lo udp port 9003`

### Simulation runs too slowly

- Reduce `real_time_update_rate` in the world file (try 100)
- Simplify the world (remove complex visual meshes)
- Check CPU usage — SITL and Gazebo are CPU-intensive
- Ensure `max_step_size` ≤ 0.0025

### GPS not acquiring fix in SITL

- The Gazebo bridge must send valid position data in the FDM packet
- Position format is [Longitude, Latitude, Altitude] in degrees/metres
- Betaflight needs at least a few seconds of valid GPS data before reporting a fix
- Check the virtual GPS is enabled: `USE_VIRTUAL_GPS` (default ON for SITL)

### Autopilot mode won't activate

- Ensure GPS has a fix (stateFlags includes `GPS_FIX`)
- Ensure the craft is armed
- Ensure the AUTOPILOT mode is mapped to an AUX channel and that channel is active
- Ensure waypoints have been uploaded (use `waypoint list` to verify)

### Waypoints rejected (state stays IDLE)

- Check geofence: if `ap_max_distance_from_home > 0`, all waypoints must be within range
- Check waypoint count does not exceed MAX_WAYPOINTS (30)
- Ensure GPS fix is available when calling `waypointReset()`

### Websockify connection fails

- Ensure the SITL is running (TCP port 5761 must be listening)
- Check websockify is running: `netstat -tlnp | grep 6761`
- Try connecting directly via TCP first: `nc 127.0.0.1 5761`

## Reference

### Waypoint State Machine

```
                    waypointReset()
                         │
                         ▼
    ┌──────────────► APPROACHING ◄──────────────────┐
    │                    │                           │
    │            arrival condition met               │
    │                    │                           │
    │                    ▼                           │
    │               ARRIVED                          │
    │              /    |     \                       │
    │             /     |      \                      │
    │            ▼      ▼       ▼                     │
    │        HOLDING  advance  LANDING                │
    │        /    \     to       │                    │
    │       ▼      ▼   next     ▼                    │
    │   ORBITING  FIGURE8  ─────┘              COMPLETE
    │       │        │                           ▲
    │       └────────┤  (duration expires)       │
    │                └──────────► advance ────────┘
    │                             to next
    │  (duration expires)            │
    └────────────────────────────────┘

    GPS loss at any point → IDLE
    Geofence violation → Emergency Land / RTH
```

### Repositories

| Repository | Branch | Purpose |
|------------|--------|---------|
| [betaflight/betaflight](https://github.com/betaflight/betaflight) | `master` | Flight controller firmware (SITL target) |
| [betaflight/aeroloop_gazebo](https://github.com/betaflight/aeroloop_gazebo) | `gz` | Gazebo Harmonic models, worlds, and bridge plugin |
| [betaflight/betaloop](https://github.com/betaflight/betaloop) | `gz` | Simulation launcher / orchestrator |

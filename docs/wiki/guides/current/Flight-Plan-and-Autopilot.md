# Flight Plan and Autopilot

The autopilot flies the aircraft through a list of GPS waypoints. This list is the flight plan. The flight controller keeps the flight plan in its configuration. You make the flight plan in the [Flight Plan tab](/docs/wiki/app/flight-plan-tab) of the Betaflight App, with the `waypoint` CLI command, or with a MAVLink ground station.

:::danger Simulation only

The autopilot is experimental. We test it only in simulation (SITL). Do not fly it on a real aircraft. Do not arm a real aircraft with the AUTOPILOT mode on a switch.

:::

This guide is for multirotors. Wing builds use a different mission executor with `ap_wing_*` settings. This guide does not include it.

## Requirements

- Firmware 2026.6 or later, built with the **FLIGHT PLAN** build option (`FLIGHT_PLAN`). This option also adds GPS, altitude hold and position hold. Refer to [Build Options](/docs/wiki/guides/current/Build-Options).
- A GPS with a 3D fix.
- A calibrated accelerometer.
- A magnetometer. It is strongly recommended. Without a good heading, the autopilot can stop the mission.
- A correct hover throttle (`ap_hover_throttle`). Refer to [Position Hold](/docs/wiki/guides/current/Position-Hold-2025-12).

The SITL target has the flight plan in its default build.

## Set Up the Autopilot

1. Make sure that altitude hold and position hold work correctly. The autopilot uses the same controllers.
2. In the **Modes** tab, put **AUTOPILOT** on a switch.
3. Optionally, put **WP CAPTURE** on a momentary switch. Refer to [Capture Waypoints in Flight](#capture-waypoints-in-flight).
4. Set the safety settings. Refer to [Safety](#safety).
5. Make a flight plan. Save it to the flight controller.

![AUTOPILOT mode on AUX 2 in the Modes tab](/img/betaflight_app_flight_plan_modes.png)

## Make a Flight Plan

You can make a flight plan in three ways:

- **Betaflight App.** Use the [Flight Plan tab](/docs/wiki/app/flight-plan-tab). Click the map to add waypoints, then click **Save**.
- **CLI.** Use the `waypoint` command. Refer to [The waypoint Command](#the-waypoint-command).
- **MAVLink.** Upload a mission from QGroundControl. Refer to [MAVLink Missions](#mavlink-missions).

The flight plan holds a maximum of 30 waypoints.

### Altitude

All waypoint altitudes are **above mean sea level (AMSL)**. They are not relative to home. To fly 30 m above the ground, add 30 m to the ground elevation at that point. The elevation profile in the Flight Plan tab shows the ground elevation.

### Speed

Each waypoint has a speed. The aircraft flies the leg to a waypoint at the speed of that waypoint. A speed of 0 uses `ap_max_velocity` (default 5 m/s). The minimum speed is 1 m/s.

## Waypoint Types

| Type         | App name        | What the aircraft does                                                                                                                                                                                       |
| ------------ | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `FLYOVER`    | Fly Over        | Flies to the point. If the waypoint is in the middle of the plan and its duration is 0, the aircraft flies through it and does not stop. It turns when it is in `ap_waypoint_arrival_radius` (maximum 12 m). |
| `FLYBY`      | Fly By          | Same as `FLYOVER`, but the aircraft starts the turn farther from the point. This distance increases with the corner speed, to a maximum of 12 m. This gives a smoother corner.                               |
| `HOLD`       | Fly Hold        | Flies to the point and stops. It holds there for the duration, then it continues. A duration of 0 gives no hold. Arrival uses `ap_waypoint_hold_radius` and the altitude.                                    |
| `LAND`       | Land            | Flies to the point, waits for the duration, then descends. When it detects touchdown, it disarms. A `LAND` waypoint always ends the mission.                                                                 |
| `TAKEOFF`    | Take Off        | Climbs in place to the waypoint altitude. The aircraft ignores the latitude and longitude. After the climb, it waits for the duration.                                                                       |
| `ALT_CHANGE` | Change Altitude | Modifier. The next waypoint with a position uses this altitude, not its own altitude.                                                                                                                        |
| `DELAY`      | Delay           | Modifier. The aircraft flies the next leg more slowly, so that the leg takes approximately the duration. It does not stop and wait.                                                                          |
| `YAW_RATE`   | Yaw Rate Cap    | Modifier. Sets the maximum yaw rate. The speed field holds the rate in degrees per second.                                                                                                                   |

A modifier has no position. The aircraft does not fly to it. The map in the Betaflight App does not show modifiers.

If the last waypoint with a position is `FLYOVER` or `FLYBY`, the aircraft stops on that point. If a `FLYOVER` or `FLYBY` waypoint has a duration more than 0, the aircraft stops and holds on that point for the duration.

### Hold Patterns

A `HOLD` waypoint can fly a pattern for its duration:

| Pattern   | What the aircraft does                             |
| --------- | -------------------------------------------------- |
| `NONE`    | Holds position on the point.                       |
| `ORBIT`   | Flies a circle around the point.                   |
| `FIGURE8` | Flies a figure eight that is centred on the point. |

The pattern starts only when the duration is more than 0. The pattern radius is `ap_waypoint_hold_radius`. The pattern is slow. The maximum turn rate is approximately 14 degrees per second.

### Vertical Rate and Yaw

Each waypoint has two optional values. Only the CLI can set them:

- **Vertical rate** in cm/s. A value of 0 uses `alt_hold_climb_rate`, which is in units of 0.1 m/s (the default 50 is 5 m/s). On a `LAND` waypoint, 0 uses `ap_landing_descent_rate`.
- **Yaw** behaviour:

| Yaw           | What the nose does                                                                                                                            |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `DEFAULT`     | Uses `ap_yaw_mode`.                                                                                                                           |
| `FACE_TARGET` | Points at this waypoint. The aircraft turns first. It starts to move when the nose is within 30 degrees of the waypoint, or after 10 seconds. |
| `FACE_NEXT`   | Points at the next waypoint that has a position.                                                                                              |
| `HOLD`        | Keeps the heading that the aircraft had at the start of the leg.                                                                              |

:::caution

When you click **Save** in the Flight Plan tab, the Betaflight App sets the vertical rate of all waypoints to 0 and the yaw of all waypoints to `DEFAULT`. If you use these values, set them with the CLI after you save in the app.

:::

## Fly a Mission

You cannot arm when the AUTOPILOT switch is on. The arming disable flag **AUTOPILOT** shows in the Setup tab.

![AUTOPILOT arming disable flag in the Setup tab](/img/betaflight_app_flight_plan_arming_flag.png)

1. Set the AUTOPILOT switch to off.
2. Arm.
3. Increase the throttle.
4. Set the AUTOPILOT switch to on. The mission starts at waypoint 1.

The autopilot engages only when all of these conditions are true:

- The aircraft is armed.
- GPS Rescue is not active.
- The accelerometer is available.
- The GPS has a 3D fix.
- An altitude is available.
- Since arming, the throttle went above `airmode_start_throttle_percent`.

If one of these conditions becomes false, the autopilot disengages. The AUTOPILOT mode also turns on altitude hold and position hold.

![The aircraft on its mission in the GPS tab](/img/betaflight_app_flight_plan_gps_in_flight.webp)

### Sticks During a Mission

- The autopilot ignores the roll, pitch and throttle sticks while it flies a leg.
- If you move the yaw stick more than `ap_stick_deadband`, you control the yaw.
- When the mission is complete or stopped, the sticks operate as in position hold.

To get full control, set the AUTOPILOT switch to off. If you set the switch to on again, the mission starts again at waypoint 1.

### End of the Mission

- If the last waypoint is `LAND`, the aircraft lands and disarms.
- If not, the aircraft holds position at the last waypoint. The OSD shows `WP COMPLETE`.

## Safety

### Mission Stops

The autopilot stops the mission and holds position if:

| OSD warning    | Cause                                                                                                                                                                                                                 |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `WP GPS LOST`  | The position estimate is not valid.                                                                                                                                                                                   |
| `WP STALLED`   | The aircraft made no progress for 30 seconds.                                                                                                                                                                         |
| `WP FLYAWAY`   | The distance to the waypoint increases too much.                                                                                                                                                                      |
| `WP MAG FAULT` | The course and the heading are more than 70 degrees apart for 2 seconds, at more than 3 m/s. The heading is not correct, usually because of a magnetometer fault. The aircraft levels and does not use position hold. |
| `WP HEADING`   | GPS Rescue only. The heading did not become valid in time.                                                                                                                                                            |

After a stop, set the AUTOPILOT switch to off to get control.

If the GPS 3D fix is lost, the AUTOPILOT mode disengages fully.

### Geofence

Set `ap_max_distance_from_home` to the maximum distance from home, in metres. A value of 0 turns the geofence off. The geofence needs a home position. It operates only in flight.

When the aircraft goes too far, `ap_geofence_action` sets what it does:

- `LAND`: lands at its current position.
- `RTH`: flies home, then lands at home. It flies at the higher of the current altitude and `gps_rescue_return_alt` above home. It flies at `gps_rescue_ground_speed`.

### Receiver Signal Loss

`ap_rx_loss_policy` sets what the aircraft does when it loses the receiver signal during a mission:

| Value      | What the aircraft does                                                                                                     |
| ---------- | -------------------------------------------------------------------------------------------------------------------------- |
| `DISABLE`  | Uses the normal failsafe procedure (`failsafe_procedure`). This is the default.                                            |
| `CONTINUE` | Continues the mission. When the mission ends or stops, it uses the normal failsafe procedure. To recover, move the sticks. |
| `LAND`     | Stops the mission and lands at its current position.                                                                       |

Refer to [Failsafe](/docs/wiki/guides/current/Failsafe).

## Capture Waypoints in Flight

The **WP CAPTURE** mode adds waypoints while you fly:

- Push the switch once to add a `FLYBY` waypoint at the current position and GPS altitude. The OSD shows `WP3 SET` (for example).
- Hold the switch for 1.5 seconds to delete the last waypoint. The OSD shows `WP2 DELETED`.
- If the plan is full, the OSD shows `WP FULL`.

WP CAPTURE does not operate during a mission. To keep the waypoints, disarm and save (`save` in the CLI).

## OSD

Add these elements in the OSD tab:

| Element                                                  | Shows                                                   |
| -------------------------------------------------------- | ------------------------------------------------------- |
| Waypoint number                                          | The active waypoint and the total, for example `WP2/6`. |
| Next waypoint number                                     | The waypoint after the active waypoint.                 |
| Waypoint latitude, Waypoint longitude, Waypoint altitude | The position of the active waypoint.                    |
| Waypoint distance, Waypoint direction                    | The distance and direction to the active waypoint.      |
| Waypoint ETA                                             | The time to the active waypoint.                        |
| Navigation map                                           | A map of the plan. HD and SD OSD only.                  |

The warning **Autopilot mission aborted** shows the mission stop warnings. The OSD also shows `WP LANDING` and `WP COMPLETE`. During a mission, the flight mode element shows `POSH`.

## The waypoint Command

You cannot use the CLI while the aircraft is armed. To monitor a mission in flight, use the OSD.

```
waypoint list
waypoint status
waypoint insert <idx> <lat> <lon> <alt> <spd> <type> <dur> <pat> [<vrate> <yaw>]
waypoint update <idx> <lat> <lon> <alt> <spd> <type> <dur> <pat> [<vrate> <yaw>]
waypoint remove <idx>
waypoint clear
```

| Argument     | Unit and values                                                                       |
| ------------ | ------------------------------------------------------------------------------------- |
| `idx`        | Index, starting at 0. `insert` moves the next waypoints up. `remove` moves them down. |
| `lat`, `lon` | Decimal degrees, up to 7 decimal places.                                              |
| `alt`        | Centimetres AMSL. For example, `39800` is 398 m AMSL.                                 |
| `spd`        | cm/s. 0 uses `ap_max_velocity`. For `YAW_RATE`, degrees per second.                   |
| `type`       | `FLYOVER`, `FLYBY`, `HOLD`, `LAND`, `TAKEOFF`, `ALT_CHANGE`, `DELAY`, `YAW_RATE`.     |
| `dur`        | Deciseconds. For example, `200` is 20 seconds.                                        |
| `pat`        | `NONE`, `ORBIT`, `FIGURE8`.                                                           |
| `vrate`      | Optional. cm/s. 0 uses the default.                                                   |
| `yaw`        | Optional. `DEFAULT`, `FACE_TARGET`, `FACE_NEXT`, `HOLD`.                              |

The changes stay in memory until you type `save`. `diff` and `dump` show the flight plan under `# waypoint`. They start with `waypoint clear`, so when you paste a diff, it replaces the flight plan.

### Example

This plan takes off, flies a rectangle at 30 m above the ground (ground is at 368 m), holds for 20 seconds with an orbit, and lands at home:

```
waypoint clear
waypoint insert 0 40.4635000 -79.5182500 39800 0 TAKEOFF 0 NONE
waypoint insert 1 40.4645780 -79.5182500 39800 600 FLYBY 0 NONE
waypoint insert 2 40.4645780 -79.5164789 39800 600 FLYBY 0 NONE
waypoint insert 3 40.4638593 -79.5164789 40800 500 HOLD 200 ORBIT
waypoint insert 4 40.4635000 -79.5175416 39800 600 FLYOVER 0 NONE
waypoint insert 5 40.4635000 -79.5182500 39800 400 LAND 0 NONE
save
```

`waypoint list` shows the plan with all arguments:

```
# waypoint list
waypoint clear
waypoint insert 0 40.4635000 -79.5182500 39800 0 TAKEOFF 0 NONE 0 DEFAULT
waypoint insert 1 40.4645780 -79.5182500 39800 600 FLYBY 0 NONE 0 DEFAULT
waypoint insert 2 40.4645780 -79.5164789 39800 600 FLYBY 0 NONE 0 DEFAULT
waypoint insert 3 40.4638593 -79.5164789 40800 500 HOLD 200 ORBIT 0 DEFAULT
waypoint insert 4 40.4635000 -79.5175416 39800 600 FLYOVER 0 NONE 0 DEFAULT
waypoint insert 5 40.4635000 -79.5182500 39800 400 LAND 0 NONE 0 DEFAULT
```

`waypoint status` shows the plan with altitudes in metres:

```
# waypoint status
Waypoint count: 6

Configured waypoints:
  [0] 40.4635000 -79.5182500 398.00m TAKEOFF
  [1] 40.4645780 -79.5182500 398.00m FLYBY
  [2] 40.4645780 -79.5164789 398.00m FLYBY
  [3] 40.4638593 -79.5164789 408.00m HOLD
  [4] 40.4635000 -79.5175416 398.00m FLYOVER
  [5] 40.4635000 -79.5182500 398.00m LAND

Runtime status:
  inactive
```

## Settings

### Navigation

| Setting                         | Default | Range       | Unit    | Description                                                                                                        |
| ------------------------------- | ------- | ----------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| `ap_max_velocity`               | 500     | 100 to 5000 | cm/s    | Speed for a waypoint with speed 0. Also the full stick speed in position hold.                                     |
| `ap_waypoint_arrival_radius`    | 500     | 100 to 5000 | cm      | Arrival radius for `FLYOVER` and `FLYBY`.                                                                          |
| `ap_waypoint_hold_radius`       | 200     | 50 to 1000  | cm      | Arrival radius for `HOLD`, `LAND`, `TAKEOFF` and waypoints with a duration. Also the radius of the hold patterns.  |
| `ap_nav_corner_speed`           | 220     | 50 to 2000  | cm/s    | Minimum speed through a waypoint that the aircraft flies through.                                                  |
| `ap_nav_corner_delta_v`         | 440     | 100 to 4000 | cm/s    | Speed change permitted at each corner.                                                                             |
| `ap_nav_accel`                  | 250     | 20 to 1000  | cm/s²   | Acceleration on a leg.                                                                                             |
| `ap_nav_decel`                  | 250     | 20 to 1000  | cm/s²   | Deceleration on a leg.                                                                                             |
| `ap_nav_carrot_lead_time`       | 12      | 2 to 40     | ds      | How far ahead on the leg the aircraft aims, as a time.                                                             |
| `ap_nav_carrot_lead_max`        | 2500    | 600 to 6000 | cm      | Maximum distance ahead on the leg that the aircraft aims.                                                          |
| `ap_nav_preturn_dist`           | 1500    | 500 to 5000 | cm      | Distance before a corner where the nose starts to turn to the next leg.                                            |
| `ap_stop_threshold`             | 10      | 5 to 50     | %       | When the aircraft brakes and its speed is less than this percentage of its initial speed, it holds the stop point. |
| `ap_velocity_buildup_max_pitch` | 8       | 0 to 20     | degrees | Maximum pitch from the speed controller when the aircraft accelerates.                                             |
| `ap_velocity_drag_coeff`        | 50      | 0 to 100    |         | Extra tilt to compensate for drag at speed.                                                                        |

### Yaw

| Setting                   | Default  | Range                            | Unit  | Description                                                                                                                                                                                                             |
| ------------------------- | -------- | -------------------------------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ap_yaw_mode`             | VELOCITY | VELOCITY, BEARING, HYBRID, FIXED |       | `VELOCITY`: the nose follows the course. `BEARING`: the nose points at the active waypoint. `HYBRID`: course, or bearing when the aircraft is slow. `FIXED`: the heading does not change. `DAMPENER` is for wings only. |
| `ap_max_yaw_rate`         | 150      | 10 to 250                        | deg/s | Maximum yaw rate.                                                                                                                                                                                                       |
| `ap_yaw_p`                | 30       | 0 to 200                         |       | Yaw gain.                                                                                                                                                                                                               |
| `ap_min_forward_velocity` | 300      | 10 to 500                        | cm/s  | The `VELOCITY` yaw mode uses the course only above this speed.                                                                                                                                                          |
| `ap_stick_deadband`       | 50       | 0 to 500                         |       | Yaw stick movement that gives yaw control to the pilot.                                                                                                                                                                 |

### Landing

| Setting                         | Default | Range     | Unit | Description                                                                      |
| ------------------------------- | ------- | --------- | ---- | -------------------------------------------------------------------------------- |
| `ap_landing_descent_rate`       | 50      | 10 to 200 | cm/s | Descent rate for a `LAND` waypoint with vertical rate 0. The minimum is 30 cm/s. |
| `ap_landing_altitude_m`         | 7       | 5 to 200  | m    | Touchdown detection starts below this height.                                    |
| `ap_landing_velocity_threshold` | 50      | 10 to 200 | cm/s | Maximum vertical speed for touchdown.                                            |
| `ap_landing_detection_time`     | 10      | 5 to 50   | ds   | Time the touchdown conditions must stay true before the aircraft disarms.        |

### Safety

| Setting                     | Default | Range                   | Unit | Description                                               |
| --------------------------- | ------- | ----------------------- | ---- | --------------------------------------------------------- |
| `ap_max_distance_from_home` | 0       | 0 to 10000              | m    | Geofence distance. 0 turns the geofence off.              |
| `ap_geofence_action`        | LAND    | LAND, RTH               |      | Action when the aircraft goes outside the geofence.       |
| `ap_rx_loss_policy`         | DISABLE | DISABLE, CONTINUE, LAND |      | Action when the receiver signal is lost during a mission. |

### Position and Altitude Control

The autopilot uses the position hold and altitude hold controllers. These settings are the same for position hold. Refer to [Position Hold](/docs/wiki/guides/current/Position-Hold-2025-12).

| Setting                                                                             | Default | Range        | Description                                             |
| ----------------------------------------------------------------------------------- | ------- | ------------ | ------------------------------------------------------- |
| `ap_position_p`, `ap_position_i`, `ap_position_d`, `ap_position_a`, `ap_position_f` | 30      | 0 to 200     | Position controller gains.                              |
| `ap_position_cutoff`                                                                | 30      | 10 to 50     | Position filter cutoff, in units of 0.1 Hz. 30 is 3 Hz. |
| `ap_altitude_p`, `ap_altitude_i`, `ap_altitude_d`, `ap_altitude_a`, `ap_altitude_f` | 30      | 0 to 200     | Altitude controller gains.                              |
| `ap_hover_throttle`                                                                 | 1275    | 0 to 1700    | Throttle to hover.                                      |
| `ap_throttle_min`                                                                   | 1100    | 1050 to 1400 | Minimum throttle.                                       |
| `ap_throttle_max`                                                                   | 1900    | 1400 to 2000 | Maximum throttle.                                       |
| `ap_max_angle`                                                                      | 50      | 10 to 70     | Maximum tilt angle, in degrees.                         |
| `alt_hold_climb_rate`                                                               | 50      | 0 to 200     | Climb rate, in units of 0.1 m/s. 50 is 5 m/s.           |

### Settings With No Effect

These settings are in the CLI, but they have no effect in this version. Do not change them:

`ap_throttle_deadband`, `ap_max_turn_rate`, `ap_hold_orbit_radius`, `ap_hold_figure8_width`, `ap_landing_spiral_enable`, `ap_landing_spiral_radius`, `ap_landing_spiral_rate`, `ap_landing_throttle_threshold`, `ap_l1_enable`, `ap_l1_period`, `ap_l1_min_lookahead`, `ap_l1_max_lookahead`, `ap_l1_max_cross_track_error`, `ap_l1_turn_rate`, `ap_min_nav_altitude_m`.

## Debug and Blackbox

Set `debug_mode = FLIGHT_PLAN` to record the mission in the blackbox log:

| Field      | Value                                                                             |
| ---------- | --------------------------------------------------------------------------------- |
| `debug[0]` | Executor state: 0 IDLE, 1 TARGETING, 2 HOLDING, 3 COMPLETE, 4 LANDING, 5 ABORTED. |
| `debug[1]` | Stop reason: 0 NONE, 1 ESTIMATOR, 2 STALLED, 3 FLYAWAY, 4 HEADING, 5 MAG FAULT.   |
| `debug[2]` | Index of the active waypoint.                                                     |

The Blackbox Viewer in the Betaflight App shows these names. Other debug modes for the autopilot are `AUTOPILOT_PID`, `AUTOPILOT_STOP`, `AUTOPILOT_HEADING`, `AUTOPILOT_ALTITUDE`, `AUTOPILOT_CLIMB`, `AUTOPILOT_GUIDANCE`, `AUTOPILOT_LANDING`, `POSITION_NAV` and `POSITION_EST`.

## MAVLink Missions

If the build has MAVLink telemetry, QGroundControl can upload and download the flight plan. The flight controller saves an uploaded plan. You cannot upload a plan while the AUTOPILOT mode is on.

| MAVLink command                                  | Waypoint type                      |
| ------------------------------------------------ | ---------------------------------- |
| `NAV_WAYPOINT`, `NAV_SPLINE_WAYPOINT`            | `FLYBY` (param 1 is the hold time) |
| `NAV_LOITER_TIME`, `NAV_LOITER_TO_ALT`           | `HOLD`                             |
| `NAV_LOITER_TURNS`                               | `HOLD` with `ORBIT`                |
| `NAV_LOITER_UNLIM`                               | `HOLD` with the maximum duration   |
| `NAV_LAND`, `NAV_VTOL_LAND`, `NAV_PAYLOAD_PLACE` | `LAND`                             |
| `NAV_TAKEOFF`, `NAV_VTOL_TAKEOFF`                | `TAKEOFF`                          |
| `NAV_CONTINUE_AND_CHANGE_ALT`                    | `ALT_CHANGE`                       |
| `NAV_DELAY`                                      | `DELAY`                            |
| `SET_YAW_SPEED`                                  | `YAW_RATE`                         |

The flight controller does not accept `NAV_RETURN_TO_LAUNCH`. It does not use geofence items. Refer to [MAVLink and ELRS](/docs/wiki/guides/current/MAVLinkELRS).

## Test in Simulation

Refer to [Testing the Autopilot in SITL](/docs/development/autopilot/SITL_Autopilot_Testing_Gazebo).

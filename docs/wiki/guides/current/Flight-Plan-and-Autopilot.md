# Flight Plan and Autopilot

The autopilot flies the aircraft through a list of GPS waypoints. This list is the flight plan. The flight controller keeps the flight plan in its configuration. You make the flight plan in the [Flight Plan tab](/docs/wiki/app/flight-plan-tab) of the Betaflight App, with the `waypoint` CLI command, or with a MAVLink ground station.

:::danger Simulation only

The autopilot is experimental. We test it only in simulation (SITL). Do not fly it on a real aircraft. Do not arm a real aircraft with the AUTOPILOT mode on a switch.

:::

The autopilot operates on multirotors and on wings. The flight plan is the same for the two types of aircraft, but the aircraft fly it differently. A firmware built with the **WING** build option uses the wing autopilot. This guide tells you where a wing is different.

## Requirements

- Firmware 2026.6 or later, built with the **FLIGHT PLAN** build option (`FLIGHT_PLAN`). This option also adds GPS, altitude hold and position hold. Refer to [Build Options](/docs/wiki/guides/current/Build-Options).
- For a wing, also the **WING** build option (`WING`).
- A GPS with a 3D fix.
- A calibrated accelerometer.

For a multirotor, also:

- A magnetometer. It is strongly recommended. Without a good heading, the autopilot can stop the mission.
- A correct hover throttle (`ap_hover_throttle`). Refer to [Position Hold](/docs/wiki/guides/current/Position-Hold-2025-12).

For a wing, also:

- A fixed wing mixer, for example `FLYING_WING`.
- A correct cruise speed (`ap_wing_cruise_speed`) and cruise throttle (`ap_wing_cruise_throttle`). Refer to [Wing Settings](#wing-settings).

A wing does not need a magnetometer. It steers with the GPS course.

The SITL target has the flight plan in its default build.

## Set Up the Autopilot

1. Make sure that altitude hold and position hold work correctly. The autopilot uses the same controllers.
2. In the **Modes** tab, put **AUTOPILOT** on a switch.
3. For a wing, put **LAUNCH** on a switch. Refer to [Fly a Mission on a Wing](#fly-a-mission-on-a-wing).
4. For a multirotor, you can put **WP CAPTURE** on a momentary switch. Refer to [Capture Waypoints in Flight](#capture-waypoints-in-flight).
5. Set the safety settings. Refer to [Safety](#safety).
6. Make a flight plan. Save it to the flight controller.

![AUTOPILOT mode on AUX 2 in the Modes tab](/img/betaflight_app_flight_plan_modes.png)

## Make a Flight Plan

You can make a flight plan in three ways:

- **Betaflight App.** Use the [Flight Plan tab](/docs/wiki/app/flight-plan-tab). Click the map to add waypoints, then click **Save**.
- **CLI.** Use the `waypoint` command. Refer to [The waypoint Command](#the-waypoint-command).
- **MAVLink.** Upload a mission from QGroundControl. Refer to [MAVLink Missions](#mavlink-missions).

The flight plan holds a maximum of 30 waypoints.

### Altitude

All waypoint altitudes are **above mean sea level (AMSL)**. They are not relative to home. To fly 30 m above the ground, add 30 m to the ground elevation at that point. The elevation profile in the Flight Plan tab shows the ground elevation.

On a wing, the altitude of a `LAND` waypoint is the ground elevation at the touchdown point.

### Speed

- **Multirotor.** Each waypoint has a speed. The aircraft flies the leg to a waypoint at the speed of that waypoint. A speed of 0 uses `ap_max_velocity` (default 5 m/s). The minimum speed is 1 m/s.
- **Wing.** The wing flies all legs at `ap_wing_cruise_speed` (default 15 m/s). It ignores the speed of the waypoint.

## Waypoint Types

| Type         | App name        | Multirotor                                                                                                                                                                                                   | Wing                                                                                                                                                                                                             |
| ------------ | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `FLYOVER`    | Fly Over        | Flies to the point. If the waypoint is in the middle of the plan and its duration is 0, the aircraft flies through it and does not stop. It turns when it is in `ap_waypoint_arrival_radius` (maximum 12 m). | Flies along the line to the point. It turns when it is level with the point or in `ap_waypoint_arrival_radius`.                                                                                                  |
| `FLYBY`      | Fly By          | Same as `FLYOVER`, but the aircraft starts the turn farther from the point. This distance increases with the corner speed, to a maximum of 12 m. This gives a smoother corner.                               | Same as `FLYOVER`, but the wing starts the turn before the point. The distance increases with the turn angle. This gives a smoother corner.                                                                      |
| `HOLD`       | Fly Hold        | Flies to the point and stops. It holds there for the duration, then it continues. Arrival uses `ap_waypoint_hold_radius` and the altitude.                                                                   | Flies a circle (a loiter) around the point for the duration, then it continues. The radius is `ap_wing_loiter_radius`. The direction is `ap_wing_loiter_direction`. The wing climbs or descends to the altitude. |
| `LAND`       | Land            | Flies to the point, waits for the duration, then descends. When it detects touchdown, it disarms.                                                                                                            | Flies to the point, waits for the duration, then lands with a circuit. Refer to [Wing Landing](#wing-landing). When it detects touchdown, it disarms.                                                            |
| `TAKEOFF`    | Take Off        | Climbs in place to the waypoint altitude. The aircraft ignores the latitude and longitude. After the climb, it waits for the duration.                                                                       | Flies a straight line on its current course, with a maximum bank of 15 degrees, and climbs to the waypoint altitude. It ignores the latitude and longitude. After the climb, it loiters for the duration.        |
| `ALT_CHANGE` | Change Altitude | Modifier. The next waypoint with a position uses this altitude, not its own altitude.                                                                                                                        | Same as multirotor.                                                                                                                                                                                              |
| `DELAY`      | Delay           | Modifier. The aircraft flies the next leg more slowly, so that the leg takes approximately the duration. It does not stop and wait.                                                                          | Modifier. If the wing gets to the next waypoint before the duration ends, it loiters there until the duration ends.                                                                                              |
| `YAW_RATE`   | Yaw Rate Cap    | Modifier. Sets the maximum yaw rate. The speed field holds the rate in degrees per second.                                                                                                                   | No effect.                                                                                                                                                                                                       |

A modifier has no position. The aircraft does not fly to it. The map in the Betaflight App does not show modifiers.

For all types, a duration of 0 on a `HOLD` gives no hold. The aircraft continues when it gets to the point.

A `LAND` waypoint always ends the mission.

On a multirotor, if the last waypoint with a position is `FLYOVER` or `FLYBY`, the aircraft stops on that point. On a multirotor or a wing, if a `FLYOVER` or `FLYBY` waypoint has a duration more than 0, the aircraft holds on that point for the duration.

### Hold Patterns

On a multirotor, a `HOLD` waypoint can fly a pattern for its duration:

| Pattern   | What the aircraft does                             |
| --------- | -------------------------------------------------- |
| `NONE`    | Holds position on the point.                       |
| `ORBIT`   | Flies a circle around the point.                   |
| `FIGURE8` | Flies a figure eight that is centred on the point. |

The pattern starts only when the duration is more than 0. The pattern radius is `ap_waypoint_hold_radius`. The pattern is slow. The maximum turn rate is approximately 14 degrees per second.

A wing ignores the pattern. It always flies a loiter circle.

### Vertical Rate and Yaw

Each waypoint has two optional values. Only the CLI can set them:

- **Vertical rate** in cm/s. The multirotor and the wing use it. A value of 0 uses `alt_hold_climb_rate`, which is in units of 0.1 m/s. The default is 5 m/s on a multirotor and 2 m/s on a wing. On a `LAND` waypoint, 0 uses `ap_landing_descent_rate` (default 50 cm/s on a multirotor and 200 cm/s on a wing).
- **Yaw** behaviour. Only the multirotor uses it:

| Yaw           | What the nose does                                                                                                                            |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `DEFAULT`     | Uses `ap_yaw_mode`.                                                                                                                           |
| `FACE_TARGET` | Points at this waypoint. The aircraft turns first. It starts to move when the nose is within 30 degrees of the waypoint, or after 10 seconds. |
| `FACE_NEXT`   | Points at the next waypoint that has a position.                                                                                              |
| `HOLD`        | Keeps the heading that the aircraft had at the start of the leg.                                                                              |

On a wing, the CLI does not show `ap_landing_descent_rate`. To change the descent rate of a wing landing, set the vertical rate of the `LAND` waypoint.

:::caution

When you click **Save** in the Flight Plan tab, the Betaflight App sets the vertical rate of all waypoints to 0 and the yaw of all waypoints to `DEFAULT`. If you use these values, set them with the CLI after you save in the app.

:::

## Fly a Mission on a Multirotor

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

![A multirotor on its mission in the GPS tab](/img/betaflight_app_flight_plan_gps_in_flight.webp)

### Multirotor Sticks During a Mission

- The autopilot ignores the roll, pitch and throttle sticks while it flies a leg.
- If you move the yaw stick more than `ap_stick_deadband`, you control the yaw.
- When the mission is complete or stopped, the sticks operate as in position hold.

To get full control, set the AUTOPILOT switch to off. If you set the switch to on again, the mission starts again at waypoint 1.

### End of a Multirotor Mission

- If the last waypoint is `LAND`, the aircraft lands and disarms.
- If not, the aircraft holds position at the last waypoint. The OSD shows `WP COMPLETE`.

## Fly a Mission on a Wing

A wing usually starts the mission from a hand launch or a bungee launch. The **LAUNCH** mode controls the launch. Then the mission takes control.

1. Put the wing on the ground and keep it still.
2. Set the LAUNCH switch and the AUTOPILOT switch to on.
3. Arm. With LAUNCH on, you can arm with the AUTOPILOT switch on.
4. Increase the throttle. The motor turns at `launch_idle_throttle`. The OSD shows `READY TO LAUNCH`.
5. Throw the wing. The wing climbs at `launch_throttle` and `launch_climb_angle`.
6. When the climb ends, the mission starts at waypoint 1. You do not touch the sticks.

During the launch, the Modes tab shows ARM, ANGLE and LAUNCH as active. AUTOPILOT is on but waits for the end of the climb.

![Wing modes during the launch: LAUNCH active, AUTOPILOT waiting](/img/betaflight_app_flight_plan_wing_modes.png)

The climb ends after `launch_timeout`, or at `launch_max_altitude` if it is more than 0.

To stop the launch, move the roll or pitch stick more than `launch_abort_deadband`. You then fly the wing manually. To start the mission after an abort, set the AUTOPILOT switch to off and on again.

If you set the LAUNCH switch to off before the throw, the wing disarms.

You can also fly the wing manually and then set the AUTOPILOT switch to on. The engage conditions are the same as on a multirotor. But after the wing engages, it does not disengage if the GPS fix is lost. Refer to [Safety](#safety).

![A wing on its mission in the GPS tab](/img/betaflight_app_flight_plan_wing_gps_in_flight.webp)

### Wing Sticks During a Mission

- Move the roll stick more than `pos_hold_deadband` to steer the wing. When you release the stick, the wing goes back to the leg.
- The autopilot ignores the pitch and throttle sticks while it flies a leg.
- On the final approach of a landing, move the roll or pitch stick more than 30% to go around.

To get full control, set the AUTOPILOT switch to off. If you set the switch to on again, the mission starts again at waypoint 1.

### End of a Wing Mission

- If the last waypoint is `LAND`, the wing lands and disarms.
- If not, the wing loiters around the last waypoint. The OSD shows `WP COMPLETE`.

## Wing Landing

A wing lands with a circuit, as a pilot does:

1. **Loiter down.** The wing flies circles over the touchdown point. It descends to `ap_wing_land_approach_alt` above the ground, at the vertical rate of the `LAND` waypoint. It flies one full circle at that height.
2. **Landing direction.** The wing uses the first of these that is available:
   1. `ap_wing_land_heading`, if it is not -1.
   2. The course that the wing flew to the `LAND` waypoint.
   3. The course at the end of the launch.
   4. The course just after takeoff.
   5. The course at the end of the loiter.
3. **Wind.** If the tailwind is more than `ap_wing_land_max_tailwind`, the wing lands in the opposite direction.
4. **Circuit.** The wing flies downwind, base and final. `ap_wing_land_side` sets the side of the circuit. `ap_wing_land_final_length` sets the length of the final.
5. **Final.** The wing descends on a glide slope of `ap_wing_land_glide_angle`. The bank is limited to `ap_wing_land_final_bank`.
6. **Flare.** Below `ap_wing_land_flare_height`, the motor stops. The wing raises the nose up to `ap_wing_land_flare_pitch` and keeps the wings level.
7. **Touchdown.** When the wing stays on the ground for `ap_landing_detection_time`, it disarms.

### Go Around

The wing goes around (climbs and flies the circuit again) if one of these occurs:

| Cause       | Condition                                                                                                         |
| ----------- | ----------------------------------------------------------------------------------------------------------------- |
| Stick       | You move the roll or pitch stick more than 30% on the final or in the flare.                                      |
| Position    | The position estimate is lost on the final, above two times the flare height.                                     |
| Overshoot   | The wing is past the touchdown point and still above the flare height.                                            |
| Glide slope | The wing is more than `ap_wing_land_slope_tolerance` off the glide slope, or the altitude jumps by that distance. |
| Track       | The wing is more than 15 m to the side of the final, below 15 m height.                                           |

After `ap_wing_land_attempts` go arounds, only the stick can start a go around. The OSD shows `GO AROUND`.

### Landing Away From Home

A geofence `LAND`, a geofence `RTH` or a GPS Rescue also lands the wing. If the touchdown point is far from home (more than `gps_rescue_min_start_dist`), the wing does not know the ground height. It then circles down at a low bank angle and does not fly a circuit. It flares with the motor on, and it stops the motor at contact.

## Safety

### Mission Stops

The autopilot stops the mission if one of these occurs. A multirotor holds position. A wing loiters where it is.

| OSD warning    | Cause                                                                                                                                                                                                                                  |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `WP GPS LOST`  | The position estimate is not valid. A wing waits 30 seconds before it stops the mission.                                                                                                                                               |
| `WP STALLED`   | The aircraft made no progress for 30 seconds (60 seconds on a wing).                                                                                                                                                                   |
| `WP FLYAWAY`   | The distance to the waypoint increases too much. The limit is 20 m to 100 m on a multirotor and 60 m to 300 m on a wing.                                                                                                               |
| `WP MAG FAULT` | Multirotor only. The course and the heading are more than 70 degrees apart for 2 seconds, at more than 3 m/s. The heading is not correct, usually because of a magnetometer fault. The aircraft levels and does not use position hold. |
| `WP HEADING`   | Multirotor GPS Rescue only. The heading did not become valid in time.                                                                                                                                                                  |

After a stop, set the AUTOPILOT switch to off to get control.

### GPS Loss

- **Multirotor.** If the GPS 3D fix is lost, the AUTOPILOT mode disengages fully.
- **Wing.** The wing flies a circle in `ap_wing_loiter_direction` and holds its altitude. If the position comes back in 30 seconds, the wing continues the mission. If not, the mission stops.

### Geofence

Set `ap_max_distance_from_home` to the maximum distance from home, in metres. A value of 0 turns the geofence off. The geofence needs a home position. It operates only in flight.

When the aircraft goes too far, `ap_geofence_action` sets what it does. The default is `LAND` on a multirotor and `RTH` on a wing.

- `LAND`: lands at its current position.
- `RTH`: flies home, then lands at home. It flies at the higher of the current altitude and `gps_rescue_return_alt` above home. A multirotor flies at `gps_rescue_ground_speed`. A wing flies at `ap_wing_cruise_speed` and lands with a circuit.

### Receiver Signal Loss

`ap_rx_loss_policy` sets what the aircraft does when it loses the receiver signal during a mission:

| Value      | What the aircraft does                                                                                                                                                                               |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DISABLE`  | Uses the normal failsafe procedure (`failsafe_procedure`). This is the default.                                                                                                                      |
| `CONTINUE` | Continues the mission. To recover, move the sticks. When the mission ends or stops, the aircraft uses the normal failsafe procedure. But when a wing completes the mission, it flies home and lands. |
| `LAND`     | Stops the mission and lands at its current position. A wing circles down.                                                                                                                            |

Refer to [Failsafe](/docs/wiki/guides/current/Failsafe).

## Capture Waypoints in Flight

The **WP CAPTURE** mode adds waypoints while you fly. It is for multirotors only.

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
| Navigation map                                           | A map of the plan. Multirotor with HD or SD OSD only.   |

The warning **Autopilot mission aborted** shows the mission stop warnings. The OSD also shows `WP LANDING` and `WP COMPLETE`. A wing also shows `GO AROUND` and the launch messages (`READY TO LAUNCH`, `LAUNCHING`). During a mission, the flight mode element shows `POSH`.

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

| Argument     | Unit and values                                                                        |
| ------------ | -------------------------------------------------------------------------------------- |
| `idx`        | Index, starting at 0. `insert` moves the next waypoints up. `remove` moves them down.  |
| `lat`, `lon` | Decimal degrees, up to 7 decimal places.                                               |
| `alt`        | Centimetres AMSL. For example, `39800` is 398 m AMSL.                                  |
| `spd`        | cm/s. 0 uses `ap_max_velocity`. For `YAW_RATE`, degrees per second. A wing ignores it. |
| `type`       | `FLYOVER`, `FLYBY`, `HOLD`, `LAND`, `TAKEOFF`, `ALT_CHANGE`, `DELAY`, `YAW_RATE`.      |
| `dur`        | Deciseconds. For example, `200` is 20 seconds.                                         |
| `pat`        | `NONE`, `ORBIT`, `FIGURE8`. A wing ignores it.                                         |
| `vrate`      | Optional. cm/s. 0 uses the default.                                                    |
| `yaw`        | Optional. `DEFAULT`, `FACE_TARGET`, `FACE_NEXT`, `HOLD`. A wing ignores it.            |

The changes stay in memory until you type `save`. `diff` and `dump` show the flight plan under `# waypoint`. They start with `waypoint clear`, so when you paste a diff, it replaces the flight plan.

### Multirotor Example

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

### Wing Example

This plan flies out 300 m north at 40 m above the ground, turns east, and lands 300 m east of home. The `LAND` altitude is the ground elevation (368 m):

```
waypoint clear
waypoint insert 0 40.4661949 -79.5182500 40800 0 FLYBY 0 NONE
waypoint insert 1 40.4661949 -79.5147078 40800 0 FLYOVER 0 NONE
waypoint insert 2 40.4635000 -79.5147078 36800 0 LAND 0 NONE
save
```

![The wing flight plan in the Flight Plan tab](/img/betaflight_app_flight_plan_wing_tab.webp)

## Settings

### Shared Settings

| Setting                      | Multirotor default | Wing default | Range                   | Unit    | Description                                                               |
| ---------------------------- | ------------------ | ------------ | ----------------------- | ------- | ------------------------------------------------------------------------- |
| `ap_waypoint_arrival_radius` | 500                | 1000         | 100 to 5000             | cm      | Arrival radius for `FLYOVER` and `FLYBY`.                                 |
| `ap_landing_detection_time`  | 10                 | 20           | 5 to 50                 | ds      | Time the touchdown conditions must stay true before the aircraft disarms. |
| `ap_max_distance_from_home`  | 0                  | 0            | 0 to 10000              | m       | Geofence distance. 0 turns the geofence off.                              |
| `ap_geofence_action`         | LAND               | RTH          | LAND, RTH               |         | Action when the aircraft goes outside the geofence.                       |
| `ap_rx_loss_policy`          | DISABLE            | DISABLE      | DISABLE, CONTINUE, LAND |         | Action when the receiver signal is lost during a mission.                 |
| `alt_hold_climb_rate`        | 50                 | 20           | 0 to 200                | 0.1 m/s | Default climb and descent rate.                                           |

### Multirotor Settings

A wing build does not show these settings.

#### Navigation

| Setting                         | Default | Range       | Unit    | Description                                                                                                        |
| ------------------------------- | ------- | ----------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| `ap_max_velocity`               | 500     | 100 to 5000 | cm/s    | Speed for a waypoint with speed 0. Also the full stick speed in position hold.                                     |
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

#### Yaw

| Setting                   | Default  | Range                            | Unit  | Description                                                                                                                                                                                                             |
| ------------------------- | -------- | -------------------------------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ap_yaw_mode`             | VELOCITY | VELOCITY, BEARING, HYBRID, FIXED |       | `VELOCITY`: the nose follows the course. `BEARING`: the nose points at the active waypoint. `HYBRID`: course, or bearing when the aircraft is slow. `FIXED`: the heading does not change. `DAMPENER` is for wings only. |
| `ap_max_yaw_rate`         | 150      | 10 to 250                        | deg/s | Maximum yaw rate.                                                                                                                                                                                                       |
| `ap_yaw_p`                | 30       | 0 to 200                         |       | Yaw gain.                                                                                                                                                                                                               |
| `ap_min_forward_velocity` | 300      | 10 to 500                        | cm/s  | The `VELOCITY` yaw mode uses the course only above this speed.                                                                                                                                                          |
| `ap_stick_deadband`       | 50       | 0 to 500                         |       | Yaw stick movement that gives yaw control to the pilot.                                                                                                                                                                 |

#### Landing

| Setting                         | Default | Range     | Unit | Description                                                                      |
| ------------------------------- | ------- | --------- | ---- | -------------------------------------------------------------------------------- |
| `ap_landing_descent_rate`       | 50      | 10 to 200 | cm/s | Descent rate for a `LAND` waypoint with vertical rate 0. The minimum is 30 cm/s. |
| `ap_landing_altitude_m`         | 7       | 5 to 200  | m    | Touchdown detection starts below this height.                                    |
| `ap_landing_velocity_threshold` | 50      | 10 to 200 | cm/s | Maximum vertical speed for touchdown.                                            |

#### Position and Altitude Control

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

#### Settings With No Effect

These multirotor settings are in the CLI, but they have no effect in this version. Do not change them:

`ap_throttle_deadband`, `ap_max_turn_rate`, `ap_hold_orbit_radius`, `ap_hold_figure8_width`, `ap_landing_spiral_enable`, `ap_landing_spiral_radius`, `ap_landing_spiral_rate`, `ap_landing_throttle_threshold`, `ap_l1_enable`, `ap_l1_period`, `ap_l1_min_lookahead`, `ap_l1_max_lookahead`, `ap_l1_max_cross_track_error`, `ap_l1_turn_rate`, `ap_min_nav_altitude_m`.

### Wing Settings

Only a wing build shows these settings.

#### Speed and Throttle

| Setting                   | Default | Range     | Unit | Description                                                               |
| ------------------------- | ------- | --------- | ---- | ------------------------------------------------------------------------- |
| `ap_wing_cruise_speed`    | 150     | 50 to 500 | dm/s | Speed on all legs. Also used for turn radius, look ahead and glide slope. |
| `ap_wing_cruise_throttle` | 50      | 0 to 100  | %    | Throttle in level flight.                                                 |
| `ap_wing_min_throttle`    | 25      | 0 to 100  | %    | Throttle at the maximum dive angle. Also the minimum throttle.            |
| `ap_wing_max_throttle`    | 90      | 0 to 100  | %    | Throttle at the maximum climb angle. Also the maximum throttle.           |
| `ap_wing_bank_throttle`   | 10      | 0 to 100  | %    | Throttle added in a turn. The full value is added at 45 degrees of bank.  |

#### Altitude and Pitch

| Setting                     | Default | Range     | Unit         | Description                                             |
| --------------------------- | ------- | --------- | ------------ | ------------------------------------------------------- |
| `ap_wing_max_climb_angle`   | 15      | 5 to 45   | degrees      | Maximum nose up pitch.                                  |
| `ap_wing_max_dive_angle`    | 12      | 5 to 45   | degrees      | Maximum nose down pitch.                                |
| `ap_wing_max_climb_rate`    | 30      | 5 to 200  | dm/s         | Maximum climb rate. Also the climb rate of a go around. |
| `ap_wing_max_sink_rate`     | 30      | 10 to 200 | dm/s         | Maximum sink rate.                                      |
| `ap_wing_alt_time_constant` | 40      | 10 to 200 | ds           | How fast the wing corrects an altitude error.           |
| `ap_wing_climb_p`           | 10      | 0 to 200  | 0.1° per m/s | Pitch gain on the climb rate error.                     |
| `ap_wing_climb_i`           | 10      | 0 to 200  |              | Pitch integral gain.                                    |
| `ap_wing_vert_accel`        | 50      | 10 to 200 | dm/s²        | Limits how fast the pitch demand changes.               |
| `ap_wing_turn_pitch_ff`     | 100     | 0 to 200  | %            | Extra pitch in a turn, to keep the altitude.            |

#### Turns and Guidance

| Setting                    | Default | Range       | Unit    | Description                                                                             |
| -------------------------- | ------- | ----------- | ------- | --------------------------------------------------------------------------------------- |
| `ap_wing_max_bank`         | 35      | 10 to 60    | degrees | Maximum bank angle. Planned turns use 80% of this value.                                |
| `ap_wing_turn_yaw_ff`      | 100     | 0 to 200    | %       | Yaw in a turn, to keep the turn coordinated. 0 turns off yaw control.                   |
| `ap_wing_l1_period`        | 130     | 50 to 400   | ds      | How fast the wing goes back to the line. A larger value gives a smoother path.          |
| `ap_wing_l1_damping`       | 75      | 50 to 100   | 0.01    | Damping of the line guidance.                                                           |
| `ap_wing_loiter_radius`    | 60      | 20 to 2000  | m       | Radius of a loiter, a `HOLD` and position hold. The minimum is the minimum turn radius. |
| `ap_wing_loiter_direction` | RIGHT   | RIGHT, LEFT |         | Direction of all loiters.                                                               |

#### Landing

| Setting                        | Default | Range       | Unit    | Description                                                                                  |
| ------------------------------ | ------- | ----------- | ------- | -------------------------------------------------------------------------------------------- |
| `ap_wing_land_heading`         | -1      | -1 to 359   | degrees | Landing direction. -1 lets the wing select the direction.                                    |
| `ap_wing_land_side`            | LEFT    | RIGHT, LEFT |         | Side of the circuit. LEFT gives a left hand circuit.                                         |
| `ap_wing_land_final_length`    | 150     | 50 to 1000  | m       | Length of the final.                                                                         |
| `ap_wing_land_glide_angle`     | 8       | 2 to 15     | degrees | Glide slope.                                                                                 |
| `ap_wing_land_approach_alt`    | 30      | 10 to 200   | m       | Height above the touchdown point for the loiter down and the circuit.                        |
| `ap_wing_land_flare_height`    | 300     | 50 to 1500  | cm      | Height where the flare starts.                                                               |
| `ap_wing_land_flare_pitch`     | 5       | 0 to 20     | degrees | Maximum nose up pitch in the flare.                                                          |
| `ap_wing_land_flare_sink`      | 5       | 1 to 30     | dm/s    | Sink rate in the flare.                                                                      |
| `ap_wing_land_final_bank`      | 15      | 5 to 35     | degrees | Maximum bank on the final.                                                                   |
| `ap_wing_land_slope_tolerance` | 10      | 3 to 50     | m       | Distance off the glide slope that starts a go around.                                        |
| `ap_wing_land_attempts`        | 3       | 1 to 10     |         | Number of automatic go arounds. After this number, the wing lands.                           |
| `ap_wing_land_max_tailwind`    | 30      | 0 to 150    | dm/s    | If the tailwind is more than this, the wing lands in the opposite direction. 0 turns it off. |
| `ap_wing_land_launch_height`   | 150     | 0 to 500    | cm      | After a hand launch, the ground at home is this distance below the arming point.             |

#### Launch

| Setting                  | Default | Range       | Unit    | Description                                                           |
| ------------------------ | ------- | ----------- | ------- | --------------------------------------------------------------------- |
| `launch_climb_angle`     | 18      | 0 to 45     | degrees | Nose up pitch during the launch.                                      |
| `launch_throttle`        | 80      | 0 to 100    | %       | Throttle during the climb.                                            |
| `launch_idle_throttle`   | 5       | 0 to 50     | %       | Throttle before the throw.                                            |
| `launch_idle_delay`      | 0       | 0 to 60000  | ms      | Time the throttle stick must be up before the motor turns.            |
| `launch_detect_accel`    | 19      | 5 to 50     | 0.1 g   | Forward acceleration that detects a throw or a bungee launch.         |
| `launch_detect_velocity` | 300     | 100 to 1000 | cm/s    | Speed that detects a swing launch or a GPS launch.                    |
| `launch_detect_time`     | 40      | 10 to 1000  | ms      | Time the detection must stay true.                                    |
| `launch_max_angle`       | 45      | 5 to 80     | degrees | Maximum tilt for a throw detection.                                   |
| `launch_motor_delay`     | 500     | 0 to 5000   | ms      | Time from the detection to the motor start.                           |
| `launch_spinup_time`     | 100     | 0 to 1000   | ms      | Time for the motor to go from idle to launch throttle.                |
| `launch_timeout`         | 5000    | 0 to 60000  | ms      | Length of the climb. 0 gives no limit.                                |
| `launch_max_altitude`    | 0       | 0 to 1000   | m       | Altitude that ends the climb. 0 turns it off.                         |
| `launch_end_time`        | 3000    | 0 to 5000   | ms      | Time to give control back to the pilot, if no hold or mission is on.  |
| `launch_min_time`        | 0       | 0 to 60000  | ms      | After the detection, the sticks cannot stop the launch for this time. |
| `launch_abort_deadband`  | 20      | 5 to 50     | %       | Roll or pitch stick movement that stops the launch.                   |
| `launch_abort_angle`     | 60      | 0 to 90     | degrees | Bank or nose down angle that stops the launch. 0 turns it off.        |

## Debug and Blackbox

Set `debug_mode = FLIGHT_PLAN` to record the mission in the blackbox log:

| Field      | Value                                                                              |
| ---------- | ---------------------------------------------------------------------------------- |
| `debug[0]` | Executor state: 0 IDLE, 1 TARGETING, 2 HOLDING, 3 COMPLETE, 4 LANDING, 5 ABORTED.  |
| `debug[1]` | Stop reason: 0 NONE, 1 ESTIMATOR, 2 STALLED, 3 FLYAWAY, 4 HEADING, 5 MAG FAULT.    |
| `debug[2]` | Index of the active waypoint.                                                      |
| `debug[3]` | Wing only. Distance to go along the line, in metres.                               |
| `debug[4]` | Wing only. Distance to the side of the line, in units of 0.1 m. Right is positive. |
| `debug[5]` | Wing only. Turn distance of a `FLYBY` waypoint, in metres.                         |

The Blackbox Viewer in the Betaflight App shows these names. Other debug modes for the autopilot are:

- Multirotor: `AUTOPILOT_PID`, `AUTOPILOT_STOP`, `AUTOPILOT_HEADING`, `AUTOPILOT_ALTITUDE`, `POSITION_NAV` and `POSITION_EST`.
- Wing: `AUTOPILOT_CLIMB`, `AUTOPILOT_GUIDANCE`, `AUTOPILOT_LANDING` and `LAUNCH`.

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

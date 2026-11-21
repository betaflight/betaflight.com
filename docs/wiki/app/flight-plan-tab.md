---
sidebar_position: 12.5
---

# Flight Plan Tab

Use the Flight Plan tab to make a list of GPS waypoints for the autopilot. You can save the list to the flight controller and load it from the flight controller.

:::danger Simulation only

The autopilot is experimental. We test it only in simulation (SITL). Do not fly it on a real aircraft.

:::

For the autopilot, the waypoint types, the settings and the CLI, refer to [Flight Plan and Autopilot](/docs/wiki/guides/current/Flight-Plan-and-Autopilot).

![Flight Plan tab with a six waypoint mission](/img/betaflight_app_flight_plan_tab.webp)

## When the Tab Shows

- **Connected:** the tab shows when the firmware has the **FLIGHT PLAN** build option.
- **Not connected:** the tab shows when **Expert Mode** is on. You can make a plan, but you cannot save it to a flight controller.

## Units

Use **Units** at the top of the tab to select **Metric (m, km/h, km)** or **Imperial (ft, kts, nm)**. The default is imperial. The units change only the display. All altitudes are above mean sea level (AMSL).

## Flight Plan Map

- Click the map to add a waypoint at that point. A new waypoint is **Fly Over**, at 400 ft (122 m) AMSL and 10 kts (18.5 km/h). Change the altitude after you add the waypoint.
- Drag a waypoint marker to move it.
- Click a waypoint marker to select it. The map moves to the selected waypoint.
- Use the mouse wheel to zoom. Drag the map to move it.

The magenta line shows the route. The map does not show modifier waypoints (**Change Altitude**, **Delay** and **Yaw Rate Cap**). Thus the numbers on the map can skip a number.

The yellow marker shows the start location of the map. It is not the position of the aircraft. To see the aircraft position, use the [GPS tab](/docs/wiki/app/gps-tab).

## Waypoint List

The list shows all waypoints in the order that the aircraft flies them.

- Click **+** to add a waypoint with the waypoint editor.
- Click a row to select the waypoint.
- Drag a row to change the order.
- Click the pencil to edit the waypoint.
- Click the bin to delete the waypoint.

## Waypoint Editor

![Waypoint editor for a Fly Hold waypoint](/img/betaflight_app_flight_plan_waypoint_editor.png)

The editor shows only the fields for the selected type:

| Field                       | Types                                          | Description                                                                   |
| --------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------- |
| **Waypoint Type**           | All                                            | Refer to the table below.                                                     |
| **Latitude**, **Longitude** | Waypoints with a position                      | Decimal degrees.                                                              |
| **Altitude**                | Waypoints with a position, **Change Altitude** | Altitude AMSL.                                                                |
| **Speed**                   | Waypoints with a position                      | Speed on the leg to this waypoint. 0 uses `ap_max_velocity`.                  |
| **Hold Duration**           | **Fly Hold**                                   | Minutes. 0 gives no hold.                                                     |
| **Delay Duration**          | **Delay**                                      | Minutes.                                                                      |
| **Hold Pattern**            | **Fly Hold**                                   | **Circle**, **Figure-8** or **Orbit**. **Circle** and **Orbit** are the same. |
| **Yaw Rate**                | **Yaw Rate Cap**                               | Maximum yaw rate, in degrees per second.                                      |

![Waypoint types](/img/betaflight_app_flight_plan_waypoint_types.png)

| Type                | Description                                               |
| ------------------- | --------------------------------------------------------- |
| **Fly Over**        | Flies to the point.                                       |
| **Fly By**          | Flies to the point, with a smoother corner.               |
| **Fly Hold**        | Flies to the point and holds there for the duration.      |
| **Land**            | Flies to the point, lands and disarms.                    |
| **Take Off**        | Climbs in place to the altitude.                          |
| **Change Altitude** | Modifier. The next waypoint uses this altitude.           |
| **Delay**           | Modifier. The next leg takes approximately this duration. |
| **Yaw Rate Cap**    | Modifier. Sets the maximum yaw rate.                      |

The flight controller holds a maximum of 30 waypoints. The app does not stop you when you add more. The flight controller does not keep the extra waypoints.

## Elevation Profile

The elevation profile shows the altitude of the route and the ground elevation below it. Click a waypoint label (for example **WP4**) to select that waypoint.

| Value                              | Description                                                                             |
| ---------------------------------- | --------------------------------------------------------------------------------------- |
| **Total Distance**                 | Length of the route.                                                                    |
| **Flight Time**                    | Approximate flight time, in hours and minutes. It does not include hold and delay time. |
| **Min Altitude**, **Max Altitude** | Lowest and highest waypoint altitude.                                                   |
| **Ground Elev**                    | Average ground elevation below the route.                                               |
| **Max Ground Elev**                | Highest ground elevation below the route.                                               |

Make sure that all waypoints are well above the **Max Ground** line. Also look for trees, buildings and power lines. The elevation data does not include them.

## Save, Load and Clear

- **Save** writes the plan to the flight controller. The flight controller then restarts.
- **Load** reads the plan from the flight controller.
- **Clear** deletes all waypoints. If a flight controller is connected, Clear also deletes the plan on the flight controller.

When you open the tab with a plan in the app and a flight controller is connected, the app asks which plan to use:

- **Load from FC** replaces the plan in the app with the plan on the flight controller.
- **Keep current** keeps the plan in the app. Click **Save** to write it to the flight controller.

The app does not set the vertical rate and yaw values for each waypoint. When you save, it sets them to their defaults. To use them, set them with the `waypoint` CLI command after you save.

## Privacy

- To find the start location of the map, the app uses the location from your browser. If that is not available, the app asks you before it uses your IP address with ipapi.co. If you do not agree, or if internet access is off, the map starts at Sydney.
- The map uses satellite images from Google.
- To get the elevation profile, the app sends the route coordinates to open-elevation.com.

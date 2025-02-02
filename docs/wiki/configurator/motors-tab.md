---
sidebar_position: 13
---

# Motors Tab

Configure motor and ESC settings. Change motor direction and mixing, and set up advanced telemetry and flight features

![Motors Tab](/img/betaflight_configurator_motors_tab.png)

## Mixer

Mixer controls motor layout and how the FC will use the motors to maintain stable flight. Typical quadcopters use the
"QUAD X" setting so set this if you are unsure.

- **Motor direction is reversed** - The normal setting
  assumes your props will spin in towards the camera at the front of your quad "props in", reversed means that props
  spin away from the camera "props out".

:::info

Pilots use "props out" to prevent debris from being pushed into the camera at the cost of pushing it
into the body of the quad instead. It also helps against prop wash on smaller crafts

:::

- **Motor direction** - opens a motor direction test tool which allows you to gently spin motors and easily reverse
  motors so that they match the appropriate spin direction for your Mixer. Remove props and take care

## ESC/Motor features

- **ESC/Motor Protocol** - DShot is standard for modern builds and provides the best flight performance and features.

:::info

Speed of DShot depends on your chosen PID loop frequency, as slower DShot speeds cannot send updates fast enough to
fully utilise faster PID loop rates. Because of this it is recommended to pair 8K with DShot600, 4K with DShot300 and
2K with DShot150. Other options such as Oneshot125 are only needed on very old ESCs such as original BLHELI, newer
BLHeli_S, BLHeli_32, BlueJay or AM32 ESCs should all use DShot

:::

- **MOTOR_STOP** - Prevent motors spinning at idle when armed. Not normally required and it is considered safer to spin
  motors so bystanders can see that your quad is armed

| **Scenario**                         | **Motors Behavior When Armed**                      |
|--------------------------------------|----------------------------------------------------|
| **AIRMODE Disabled & Motor Stop Enabled**  | Motors stay **off** until throttle is raised. |
| **AIRMODE Disabled & Motor Stop Disabled** | Motors **spin at idle speed** when armed. |
| **AIRMODE Enabled**                  | Motors **always spin** when armed, even at zero throttle. |

- **ESC_SENSOR** - Prefer ESC telemetry data from a UART connection to the ESC as configured in the Ports tab

- **Bidirectional DShot** - Required for RPM filtering. Instead of only sending DShot commands to the ESC on the motor
  output connections the FC will also listen for return data from the ESC on the same wire

:::note

By default includes only RPM
data but can be expanded with the `dshot_edt` CLI command to also enable ESC voltage, current and temperature
data via DShot telemetry (requires newer BlueJay/AM32/BLHELI32 ESC firmware).
[Extended DShot Telemetry (EDT)](https://github.com/bird-sanctuary/extended-dshot-telemetry) allows ESCs to return
telemetry data over the signal wire without requiring additional UART connections. EDT allows for telemetry from 8-bit
ESCs running BlueJay as well as 32bit ESCs running AM32 or BLHELI32. This simplifies wiring and FC configuration for
pilots.

:::

- **Motor Poles** - Number of permanent magnets stuck inside the motor bell

:::info

Larger motors such as 2207 or 2306 have 14
whilst 1103 and smaller motors have 12 magnets. Magnet numbers typically change from 12 to 14 in the 14xx/15xx size of
motor

:::

- **Motor idle ( % static)** - Sets a minimum motor output value to ensure the motor is able to smoothly speed up from
  idle without a delay and without loosing control.

:::info

Generally this speed is increased to improve smoothness when coming
out of dives and decreased to avoid unwanted downward thrust during inverted manuevers

:::

## 3D ESC/Motor features

- **3D** Enables motors to run in both directions which permits inverted flight. Zero throttle is now the 50% stick
  position and the lowest stick position now produces maximum negative throttle, with maximum positive throttle at the
  highest stick position

:::info

Air mode does not work properly when using 3D mode, you should disable permanent Air Mode in the
[Configuration Tab](/docs/wiki/configurator/configuration-tab#other-features) and configure Air
Mode on a switch in the [Modes Tab](/docs/wiki/configurator/auxiliary-tab) so that Air Mode is
disabled when 3D mode is activated. Simply set the "Air Mode" mode range to be the same switch channel and values as
the "Disable 3D Mode" mode range.

:::

:::danger

GPS Rescue and Failsafe Landing Mode are not implemented in 3D mode and will not function correctly. Be extremely careful.

:::

- **3D Deadband low** - Start of the zero-throttle band in 3D mode where no thrust is wanted

- **3D Deadband high** - End of the zero-throttle band in 3D mode where no thrust is wanted

- **3D Deadband neutral** - Midpoint of the zero-throttle band in 3D mode where no thrust is wanted

## Motors Test Mode

Be careful when bench testing your motors and read this section thoroughly if you are unsure. Always be careful when
using lipo batteries. If you are in doubt you may wish to investigate safety options such as Smoke Stoppers which limit
current from the battery

:::danger

Always remove props before connecting a battery and testing motors. You will hear this repeated for a good reason.
Please be careful!

:::

Visualisation of the current motor signalling. Props should be removed before testing motors. Once a battery is
connected and the ESC is online the motors can be spun using the sliders.

- **R** - RPM telemetry from the ESC

- **E** - DShot telemetry error rate. Will show errors if the ESC is not powered. A powered ESC should show 0% or very
  close to 0% errors. Error rates of 1% or more usually indicate a hardware problem. DShot telemetry requires a modern
  ESC firmware such as BlueJay, AM32 or BLHELI32

- **T** - Temperature telemetry from the ESC

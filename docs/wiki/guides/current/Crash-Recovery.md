# Crash Recovery

When a crash is detected, the flight controller will attempt to recover the craft to a level attitude, then give the control back.

:::note
This feature is disabled by default.
It can only be enabled and configured via the CLI.
:::

## Configuration

List of parameters for configuring the crash recovery feature:

| Parameter                  | Description                                                                                                                                          | Allowed Values                | Default |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------- |
| `crash_recovery`           | Enable or disable the crash recovery feature.                                                                                                        | `OFF`, `ON`, `BEEP`, `DISARM` | `OFF`   |
| `crash_dthreshold`         | Sensitivity threshold based on D-term values                                                                                                         | `10` to `2000`                | `50`    |
| `crash_gthreshold`         | Sensitivity threshold based on gyro readings                                                                                                         | `100` to `2000`               | `400`   |
| `crash_setpoint_threshold` | Sensitivity threshold based on stick position                                                                                                        | `50` to `2000`                | `350`   |
| `crash_recovery_angle `    | Defines the angle to which the craft will try to recover.                                                                                            | `5` to `30`                   | `10`    |
| `crash_recovery_rate`      | How aggressively the craft attempts to recover. Higher values mean faster recovery but can lead to oscillations if set too high.                     | `50` to `255`                 | `100`   |
| `crash_limit_yaw`          | Limits the yaw rate during recovery to prevent yaw spins. If during crash recovery the yaw rate exceeds this value, crash recovery will be cancelled | `0` to `1000`                 | `200`   |
| `crash_time`               | Maximum duration in milliseconds for which recovery attempts will be made.                                                                           | `100` to `5000`               | `500`   |
| `crash_delay`              | Time in milliseconds to wait before starting recovery.                                                                                               | `0` to `500`                  | `0`     |

## Crash Recovery Modes

- `OFF`: Do not use crash recovery
- `ON`: Upon detecting a crash, level the craft and give back control
- `BEEP`: Upon detecting a crash, beep the external beeper, do not affect the craft's flying. Useful for testing
- `DISARM`: Upon detecting a crash, disarm the craft.

:::warning
This feature is designed for whoops and smaller craft. Please test it carefully on big and open-propped quads.
:::

---
sidebar_position: 4
title: Hardware Support and Getting Help
---

Betaflight is free, open-source flight control software for every kind of drone, from racing and freestyle to cinematic filming, long range, micros and wings. It runs on flight controllers from around 140 manufacturers, and pilots build and fly an endless variety of machines with it. No small team could support every one of those boards and builds, so support is shared:

**We fix Betaflight. Manufacturers support their hardware. Pilots own their builds.**

## Where to Go

| Problem                                                                                                                        | Where to go                                                                                                                                                          |
| :----------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The board or a component is faulty, damaged or not working as advertised                                                       | The manufacturer or the shop you bought it from. They handle faults and warranty.                                                                                    |
| A feature, pad or pin on the board does not work, or the board is missing from the firmware flasher                            | The manufacturer. They maintain the board's config and documentation.                                                                                                |
| Wiring, setup, receivers, video, GPS, tuning or presets                                                                        | The community on [Discord](https://discord.betaflight.com/invite), plus the [setup guide](setup-guide), [troubleshooting](troubleshooting) and the rest of the wiki. |
| Betaflight itself misbehaves in a way you can reproduce: the firmware, the [Betaflight App](/docs/wiki/app) or the cloud build | A [bug report](#reporting-a-betaflight-bug) to the Betaflight team.                                                                                                  |

Not sure whether it is the hardware or Betaflight? Start with the manufacturer. If they confirm a firmware bug, they can raise it with us and we will work on it with them.

## Board Status in the Firmware Flasher

Every board in the [firmware flasher](/docs/wiki/app/firmware-flasher-tab) carries one of three statuses. Whatever the status, support for the board itself comes from its manufacturer.

- **✅ Betaflight Supported**: the Betaflight team has reviewed the design, and the manufacturer has committed to support it. Firmware regressions on these boards are fixed before release.
- **⚠️ Manufacturer supported**: included as the manufacturer supplied it, after basic checks. The team has not reviewed the design. If a release turns out not to work on the board, the board is withdrawn from that release.
- **Legacy**: can still be flashed, but nobody maintains it any more. Use at your own discretion.

If you are choosing a new flight controller and want the most thoroughly checked option, look for Betaflight Supported, and check that the manufacturer offers a support channel you can reach. Manufacturers can find what we recommend in the [Hardware Policy](/docs/development/manufacturer/hardware-policy).

## Reporting a Betaflight Bug

The GitHub issue trackers are for bugs in Betaflight, not for help with a board or a build. Before opening an issue, check that the problem happens on the current release and is not already reported.

- Firmware: [github.com/betaflight/betaflight/issues](https://github.com/betaflight/betaflight/issues)
- Betaflight App: [github.com/betaflight/betaflight-configurator/issues](https://github.com/betaflight/betaflight-configurator/issues)

Include:

- the Betaflight and Betaflight App versions, and the board;
- the output of `diff all` from the [CLI](/docs/wiki/app/cli-tab);
- the steps that reproduce the problem;
- a [blackbox log](/docs/wiki/guides/current/Black-Box-logging-and-usage) if it happens in flight.

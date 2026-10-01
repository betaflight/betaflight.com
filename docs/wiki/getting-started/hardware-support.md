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
| A feature, pad or pin on the board does not work, or the board is missing from the firmware flasher                            | The manufacturer, who maintains the board's config and documentation, or the named maintainer for community and homebrew boards.                                     |
| Wiring, setup, receivers, video, GPS, tuning or presets                                                                        | The community on [Discord](https://discord.betaflight.com/invite), plus the [setup guide](setup-guide), [troubleshooting](troubleshooting) and the rest of the wiki. |
| Betaflight itself misbehaves in a way you can reproduce: the firmware, the [Betaflight App](/docs/wiki/app) or the cloud build | A [bug report](#reporting-a-betaflight-bug) to the Betaflight team.                                                                                                  |

Not sure whether it is the hardware or Betaflight? Start with the manufacturer. If they confirm a firmware bug, they can raise it with us and we will work on it with them.

## Board Status in the Firmware Flasher

Every board in the [firmware flasher](/docs/wiki/app/firmware-flasher-tab) carries one of three statuses. Whatever the status, hardware faults and warranty go to the manufacturer. The board's config is maintained by its manufacturer, or by the named maintainer for community and homebrew boards. Legacy boards have no active maintainer, although the community may help.

- **✅ Betaflight Supported**: the Betaflight team has reviewed the design, and the manufacturer has committed to support it. Firmware regressions on these boards are fixed before release.
- **⚠️ Manufacturer supported**: the Betaflight team has reviewed and accepted the board's config, but not its design in depth, and the manufacturer supports it. If a release turns out not to work on the board, the board is withdrawn from that release.
- **Legacy**: can still be flashed, but nobody maintains it any more. Use at your own discretion.

## Firmware From a Manufacturer's Website

Some manufacturers distribute their own Betaflight firmware, for example for a board that is not in the firmware flasher, or with their own defaults. You flash it with "Load Firmware [Local]". The manufacturer built it and supports it; the Betaflight team has not reviewed the board or the build, and cannot help with it. If you think you have found a Betaflight bug and the board is in the firmware flasher, check that it also happens with firmware from there before reporting it. If the board is not in the flasher, ask the manufacturer to confirm the bug first, and they can raise it with us.

## Choosing a Board

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

---
sidebar_position: 0
sidebar_label: Hardware Policy
title: Hardware Policy
---

This page sets out what the Betaflight project prefers, supports, permits and warns against in flight controller hardware, and who supports a board once it is in a pilot's hands. It applies to new designs from 28 September 2026. Existing boards are not affected, see [Existing Boards](#existing-boards).

## Why Betaflight Exists

Betaflight is free, open-source flight control software for every kind of drone, from racing and freestyle to cinematic filming, long range, micros and wings. It exists so that every pilot, whatever they fly and whoever made their hardware, gets precise, predictable and reliable flight, and so that the knowledge behind it stays open to everyone.

We build the firmware, the Betaflight App and the cloud build. We publish the standards that let hardware from many manufacturers work together: the [Connector Standard](connector-standard), the [config format](creating-configuration) and the [Manufacturer Design Guidelines](manufacturer-design-guidelines). We do not make, sell or warrant hardware.

## Who Looks After What

**We fix Betaflight. Manufacturers support their hardware. Pilots own their builds.**

| Who             | Looks after                                                                                                                                                | Where pilots go                                                             |
| :-------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------- |
| Betaflight team | Bugs in the firmware, the Betaflight App and the cloud build. The standards and guidelines.                                                                | GitHub issues                                                               |
| Manufacturer    | Their hardware: its design, config and documentation, faults, warranty and customer support, and keeping their target working as Betaflight moves forward. | The manufacturer's own support channel                                      |
| Pilot           | Their build: wiring, setup, tuning and peripherals.                                                                                                        | The community on [Discord](https://discord.betaflight.com/invite), the wiki |

The team does not provide end-user hardware support for any board, including Betaflight Supported boards. When a manufacturer finds that a problem reported by their customers is a firmware bug, they raise it with us and we work on it with them.

## Why Support Is Shared

The [Betaflight config repository](https://github.com/betaflight/config) holds 630 boards from around 140 manufacturers. The team is small and largely volunteer, and our automated builds exercise only a handful of those boards on every change. We cannot test, diagnose or support hundreds of boards and many thousands of individual builds, and it would not be fair to ask volunteers to.

What we can do is keep the door open to as much hardware as possible, be clear about who supports what, and spend our own time where it improves Betaflight for every pilot.

## Board Status

Every board in the firmware flasher carries one of three statuses.

|                             | Betaflight Supported                                  | Manufacturer supported                                             | Legacy                             |
| :-------------------------- | :---------------------------------------------------- | :----------------------------------------------------------------- | :--------------------------------- |
| Review                      | Design review against the guidelines, with schematics | Basic checks: it builds and its motor outputs do not conflict      | None                               |
| Support for pilots          | The manufacturer                                      | The manufacturer, or the named maintainer for community boards     | None, the community may help       |
| Firmware regressions        | Fixed by the team before release                      | The board is withdrawn from the affected release onwards           | Not tested                         |
| New boards and fixes        | Between releases                                      | With the next release                                              | None                               |
| Cloud build                 | Priority queue                                        | Standard queue, subject to availability                            | Standard queue, where still built  |
| Shown in the Betaflight App | ✅ Betaflight Supported, no warning                   | ⚠️ Manufacturer supported, with a note to contact the manufacturer | Legacy, use at your own discretion |

### Betaflight Supported

The team has reviewed the design against the [Manufacturer Design Guidelines](manufacturer-design-guidelines), and the manufacturer has committed to support it. In return, we treat a firmware regression on a Betaflight Supported board as ours to fix before release, and fixes and new boards can reach the cloud build between releases.

The manufacturer commits to:

- supply schematics for review, and samples when we ask for them;
- name a maintainer for the config;
- give pilots a support contact;
- publish [board documentation](fc_documentation/how-to-create-board-documentation) on the wiki.

A new design that uses anything listed under [Warned Against](#warned-against), or that copies an existing design rather than improving on it, is not eligible. See [Betaflight Supported](betaflight-supported) for how to apply and for the target fee, which does not apply to hobbyists or to [Betaflight Partners](partner-program).

### Manufacturer Supported

The board is included as supplied, after basic checks. The manufacturer, or the named maintainer for community and homebrew boards, is the source of support, and the Betaflight App says so. If a release is reported not to work on the board, we withdraw the board from that release and later ones. It stays available in the releases known to work.

### Legacy

Hardware the firmware can still run but that nobody actively maintains: boards no longer sold, experimental and developer-preview MCUs, and custom builds flashed with Load Local.

## Design Guidance

For manufacturers and designers. Anything not listed here is fine. Only the short [Not Accepted](#not-accepted) list keeps a board out of the cloud build altogether. The reasons and the detail behind each point are in the [Manufacturer Design Guidelines](manufacturer-design-guidelines), and we would much rather talk a design through early at [hardware@betaflight.com](mailto:hardware@betaflight.com) than find a problem after production.

### Preferred

What we recommend for new designs and develop against first.

- MCU: STM32H7 (H743) for high IO and more than four motors. STM32G4, AT32F435 or RP2350 for small and budget boards.
- Gyro: ICM-42688-P on SPI with its own LDO. LSM6DSK320X as a second source.
- Barometer and magnetometer on I2C: DPS368, genuine DPS310 or genuine BMP280, and QMC5883L.
- Serial receivers such as ExpressLRS and Crossfire.
- The [Connector Standard](connector-standard).
- ESC firmware with bidirectional DShot, such as Bluejay and AM32.
- Onboard blackbox flash, SWD test points, a status LED and a switchable 10V BEC.

### Warned Against

These work, and a board using them can be included as Manufacturer supported. They have known drawbacks, pilots are told what they are, and new designs using them are not eligible for Betaflight Supported.

- STM32F4 or F7 with more than four motor outputs: not enough timers and DMA to go round.
- STM32F411 on new designs: limited IO and flash.
- BMI270 gyro: calibration and drift.
- Legacy gyros (the MPU6000 and MPU6500 family, ICM2060x) on new designs: end of life.
- SPI receivers: serial receivers are more capable and are where receiver development is heading.
- A gyro sharing its SPI bus with other devices: it costs gyro timing.
- Eight motors spread over more than two GPIO ports: bitbanged DShot needs them grouped.
- Clone barometers and magnetometers, when correctly named: accuracy varies.
- The 6-pin GPS connector, and 2-pin power on JST SH: easy to plug into the wrong socket.
- BLHeli_S without bidirectional DShot, and BLHeli_32, on new products: no RPM filtering, or no longer maintained.

### Not Accepted

A board is not added to the cloud build if:

- it does not build;
- its motor outputs conflict on timers or DMA;
- its gyro is not on SPI, which the firmware requires;
- it names a component it does not use, such as a clone sold as a DPS310, or uses the Betaflight name or logo without permission;
- its manufacturer is not registered in the [manufacturers list](https://github.com/betaflight/config/blob/master/Manufacturers.md).

## Existing Boards

Nothing here removes a board that works today. The design guidance applies to new designs submitted from 28 September 2026, and existing boards keep their current status. A Manufacturer supported board that stops working in a release is withdrawn from that release onwards, as it always has been, and stays available in the releases known to work.

## Next Steps

- Read the [Manufacturer Design Guidelines](manufacturer-design-guidelines) and the [Connector Standard](connector-standard).
- Talk to us early, at [hardware@betaflight.com](mailto:hardware@betaflight.com).
- Submit the config as set out in [Requirements for Submission of Targets](requirements-for-submission-of-targets).
- Apply for [Betaflight Supported](betaflight-supported), or join the [Betaflight Partners](partner-program) programme.

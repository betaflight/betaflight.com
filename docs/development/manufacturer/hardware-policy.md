---
sidebar_position: 0
sidebar_label: Hardware Policy
title: Hardware Policy
---

This page sets out what the Betaflight project prefers, what it supports, what it accepts into the cloud build, what it does not recommend or warns against, and what simply works, together with who supports a board once it is in a pilot's hands. It applies to new designs from 28 September 2026. Existing boards are not affected, see [Existing Boards](#existing-boards).

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

The [Betaflight config repository](https://github.com/betaflight/config) holds a large and growing range of boards from many manufacturers. The team is small and largely volunteer, and our automated builds exercise only a handful of those boards on every change. We cannot test, diagnose or support every one of those boards and the individual builds they go into, and it would not be fair to ask volunteers to.

What we can do is keep the door open to as much hardware as possible, be clear about who supports what, and spend our own time where it improves Betaflight for every pilot.

## Two Routes to Pilots

There are two separate ways Betaflight firmware reaches a pilot, and they are not mutually exclusive.

**The Betaflight cloud build.** The config repository and the cloud build carry designs that the Betaflight team has reviewed and accepted. Pilots find these boards in the firmware flasher of the Betaflight App, which builds firmware for them on demand. Getting a board in is covered by [Cloud Build Acceptance](#cloud-build-acceptance) below.

**The manufacturer's own distribution.** Betaflight is free software under the GPLv3, and any manufacturer is free to build firmware themselves and distribute it on their own terms, for example from their website, for pilots to flash with "Load Firmware [Local]" in the Betaflight App. This is how a design that is not in the cloud build, including one we do not accept, reaches pilots. We cannot stop it and do not try to. The GPL does ask something in return: distributing firmware means making its corresponding source, including the board config, available to those who receive it. The Betaflight name and logo still need the project's permission, see section 5 of the [Manufacturer Design Guidelines](manufacturer-design-guidelines).

A board accepted into the cloud build can also be distributed by its manufacturer, for example with their own defaults. Acceptance into the cloud build is about what Betaflight hosts and vouches for. It does not limit what a manufacturer may ship themselves.

|                             | Betaflight Supported                          | Manufacturer supported                                             | Legacy                             | Manufacturer's own distribution                  |
| :-------------------------- | :-------------------------------------------- | :----------------------------------------------------------------- | :--------------------------------- | :----------------------------------------------- |
| Route                       | Cloud build                                   | Cloud build                                                        | Cloud build                        | The manufacturer's website or other channel      |
| Betaflight review           | Design review with schematics, and the config | The config, against the guidance and acceptance criteria           | Accepted in the past               | None                                             |
| Support for pilots          | The manufacturer                              | The manufacturer, or the named maintainer for community boards     | None, the community may help       | The manufacturer, entirely                       |
| Firmware regressions        | Fixed by the team before release              | The board is withdrawn from the affected release onwards           | Not tested                         | The manufacturer rebuilds and redistributes      |
| New boards and fixes        | Between releases                              | With the next release                                              | None                               | Whenever the manufacturer publishes              |
| Shown in the Betaflight App | ✅ Betaflight Supported, no warning           | ⚠️ Manufacturer supported, with a note to contact the manufacturer | Legacy, use at your own discretion | Not listed; flashed with "Load Firmware [Local]" |

### Betaflight Supported

The team has reviewed the design, schematics included, against the [Manufacturer Design Guidelines](manufacturer-design-guidelines), and the manufacturer has committed to support it. In return, we treat a firmware regression on a Betaflight Supported board as ours to fix before release, and fixes and new boards can reach the cloud build between releases.

The manufacturer commits to:

- supply schematics for review, and samples when we ask for them;
- name a maintainer for the config;
- give pilots a support contact;
- publish [board documentation](fc_documentation/how-to-create-board-documentation) on the wiki.

A design that copies an existing design rather than improving on it is not eligible. See [Betaflight Supported](betaflight-supported) for how to apply and for the target fee, which does not apply to hobbyists or to [Betaflight Partners](partner-program).

### Manufacturer Supported

The team has reviewed the board's config and accepted it into the cloud build, but has not reviewed the design in depth. The manufacturer, or the named maintainer for community and homebrew boards, is the source of support, and the Betaflight App says so. If a release is reported not to work on the board, we withdraw the board from that release and later ones. It stays available in the releases known to work.

### Legacy

Boards that were accepted in the past and are still built, but that nobody actively maintains, such as boards no longer sold.

## Design Guidance

For manufacturers and designers. The reasons and the detail behind each point are in the [Manufacturer Design Guidelines](manufacturer-design-guidelines), and we would much rather talk a design through early at [hardware@betaflight.com](mailto:hardware@betaflight.com) than find a problem after production.

### Preferred

What we recommend for new designs and develop against first.

- MCU: STM32H7 (H743) for high IO and more than four motors. STM32G4, AT32F435 or RP2350 for small and budget boards.
- Gyro: ICM-42688-P on SPI with its own LDO. LSM6DSK320X as a second source.
- Barometer and magnetometer on I2C: DPS368, genuine DPS310 or genuine BMP280, and QMC5883L.
- Serial receivers such as ExpressLRS and Crossfire.
- The [Connector Standard](connector-standard).
- ESC firmware with bidirectional DShot, such as Bluejay and AM32.
- Onboard blackbox flash, SWD test points, a status LED and a switchable 10V BEC.

Anything not listed on this page is fine for the cloud build.

### Not Accepted for New Designs

New designs using any of these are not accepted into the cloud build.

- STM32F4 or F7 with more than four motor outputs: not enough timers and DMA to go round.
- STM32F411: limited IO and flash.
- MPU6500 gyro: end of life.
- SPI receivers: serial receivers are more capable and are where receiver development is heading.
- A gyro sharing its SPI bus with other devices: it costs gyro timing.
- Motors M1 to M4 spread over more than one GPIO port: bitbanged DShot needs them grouped. M5 to M8 may be split across ports, for example on wing flight controllers or boards also designed for ArduPilot or INAV.

### Not Recommended

Accepted within the limits given for each, but a current part is the better choice.

- BMI270 gyro: calibration and drift. Accepted only as a second source on an ICM-42688-P footprint.
- MPU6000 gyro: end of life. Accepted only when the part is genuine.
- ICM2060x gyros: end of life. Accepted.

### Warned Against

We advise against these, but a review of the board's config cannot tell whether a board uses them, so they are guidance rather than conditions of acceptance.

- Clone barometers and magnetometers: accuracy varies. They should not be used, and must never be advertised as the part they imitate. They use the same drivers as the originals, so the target cannot tell them apart.
- BLHeli_S without bidirectional DShot, and BLHeli_32, on new products: no RPM filtering, or no longer maintained. ESC firmware is not part of the target.

### The Betaflight Name and Logo

Using the Betaflight name or logo on a product needs the project's permission, and using the Betaflight logo requires the board to follow the [Connector Standard](connector-standard). The standard is what keeps a pilot from plugging a harness into the wrong socket, which is why it retired the 6-pin GPS connector and moved 2-pin power off JST SH.

### Cloud Build Acceptance

The team accepts a new board into the cloud build when:

- it builds;
- its motor outputs do not conflict on timers or DMA;
- its gyro is on SPI, which the firmware requires;
- it uses nothing listed under [Not Accepted for New Designs](#not-accepted-for-new-designs), and anything [Not Recommended](#not-recommended) stays within its limits;
- its manufacturer is registered in the [manufacturers list](https://github.com/betaflight/config/blob/master/Manufacturers.md).

## Existing Boards

Nothing here removes a board that works today. The design guidance applies to new designs submitted from 28 September 2026, and boards already in the cloud build keep their current status, including those that use something now not accepted for new designs. A Manufacturer supported board that stops working in a release is withdrawn from that release onwards, as it always has been, and stays available in the releases known to work.

## Next Steps

- Read the [Manufacturer Design Guidelines](manufacturer-design-guidelines) and the [Connector Standard](connector-standard).
- Talk to us early, at [hardware@betaflight.com](mailto:hardware@betaflight.com).
- Submit the config as set out in [Requirements for Submission of Targets](requirements-for-submission-of-targets).
- Apply for [Betaflight Supported](betaflight-supported), or join the [Betaflight Partners](partner-program) programme.

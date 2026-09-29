---
title: "Who Supports What: Betaflight's Hardware Policy"
date: 2026-09-28
authors: ['blckmn']
---

Betaflight is free, open-source flight control software for every kind of drone, from racing and freestyle to cinematic filming, long range, micros and wings. It runs on flight controllers from around 140 manufacturers, and we want to keep it that way. Today we are publishing a [Hardware Policy](/docs/development/manufacturer/hardware-policy) that sets out how we keep that breadth sustainable, in one sentence:

**We fix Betaflight. Manufacturers support their hardware. Pilots own their builds.**

<!--truncate-->

## Why

The config repository now holds 630 boards. The Betaflight team is small and largely volunteer, and our automated builds exercise only a handful of those boards on every change. We cannot test, diagnose or support every board and every build, and pretending otherwise helps nobody: pilots wait for answers we cannot give, and our time goes into hardware questions instead of Betaflight.

## For Pilots

The firmware flasher shows each board as **Betaflight Supported** (reviewed by the team), **Manufacturer supported** (config reviewed and accepted) or **Legacy** (no longer maintained). Whatever the status, hardware faults and warranty go to the manufacturer, and a board's config is maintained by its manufacturer or, for community and homebrew boards, its named maintainer. [Hardware Support and Getting Help](/docs/wiki/getting-started/hardware-support) says where to take each kind of problem, and how to report a genuine Betaflight bug so that we can fix it.

## For Manufacturers

There are two routes to pilots, and they are not mutually exclusive. The **cloud build** carries designs the Betaflight team has reviewed and accepted. Some choices are **not accepted** on new designs (such as F4/F7 with more than four motors, a new F411, an SPI receiver or a gyro sharing its SPI bus), some are **not recommended** and need agreeing with us first (such as a BMI270), and some we simply **warn against** (such as clone barometers). The Betaflight logo on a product requires the [Connector Standard](/docs/development/manufacturer/connector-standard). A manufacturer's **own distribution** is theirs: Betaflight is free software under the GPLv3, and any manufacturer can build firmware for any board and publish it on their website, where we neither review nor support it. Accepted designs that follow our **preferred** guidance, and whose manufacturer commits to supporting them, can become Betaflight Supported, and we fix firmware regressions on those boards before release.

The guidance applies to new designs from today. Existing boards keep their status, and nothing that works today is being removed. If you are designing a board, talk to us early at [hardware@betaflight.com](mailto:hardware@betaflight.com).

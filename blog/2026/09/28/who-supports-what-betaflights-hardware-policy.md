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

The firmware flasher shows each board as **Betaflight Supported** (reviewed by the team), **Manufacturer supported** (included as supplied) or **Legacy** (no longer maintained). Whatever the status, support for the board itself comes from its manufacturer. [Hardware Support and Getting Help](/docs/wiki/getting-started/hardware-support) says where to take each kind of problem, and how to report a genuine Betaflight bug so that we can fix it.

## For Manufacturers

The door stays open. Almost any board can be included as Manufacturer supported, and only a short list of problems (a board that does not build, conflicting motor outputs, a misnamed component) keeps one out of the cloud build. The design guidance is now in three plain levels: what we **prefer** for new designs, what we **warn against** and tell pilots about, and what we do **not accept**. Designs that follow the guidance, and whose manufacturer commits to supporting them, can become Betaflight Supported, and we fix firmware regressions on those boards before release.

The guidance applies to new designs from today. Existing boards keep their status, and nothing that works today is being removed. If you are designing a board, talk to us early at [hardware@betaflight.com](mailto:hardware@betaflight.com).

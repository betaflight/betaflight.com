---
date: 2025-09-01
author: blckmn
title: Calendar Versioning & Release Cadence
---

:mega: **Announcement: New Versioning Scheme & Release Cadence** :mega:

### Introduction

To create a more predictable release schedule, we're moving to a new versioning system and development cycle, starting with the next release. The versioning scheme we will be moving to is known as [CalVer](https://calver.org/) or Calendar Versioning.

This style of versioning works well when there is a predictable release cadence, and that is something we are going to establish for the Betaflight project. Our release cadence will move to two major releases per year, with patch releases in between. Our target months for a major release will be June and December each year.

### Our CalVer Format

The **New Format** will be: `YYYY.M.PATCH` (e.g., `2025.12.0`)

This means the successor to our current `4.x` series will be Betaflight `2025.12.0`, followed by Betaflight `2026.6.0`. We will also align the Betaflight App and Firmware to the same `YYYY.M` releases (and cadence). 

You can expect the major release version of the App and the Firmware to work together seamlessly and without issues.

### Our New Release Cycle

To support this schedule, our development phases will be structured as follows:

**Alpha:** For new feature development. Alpha builds for the next version will be available shortly after a stable release is published. This will be the `master` branch, and will always be available.

This will be available in the App firmware flasher tab when **Development** is selected. :warning: Expert mode required.

**Beta:** A one-month feature freeze for bug fixes only, starting approximately two months before a major release. This will be the beginning of the `*-maintenance` branch. Fixes placed into the `master` branch will be periodically merged to the `*-maintenance` branch during this period. 

This will be available in the App firmware flasher tab when **Development** is selected. :warning: Expert mode required.

**Release Candidate (RC):** A one-month period (still feature frozen) for final stabilization and testing before the official release. Fixes placed into the `master` branch will continue to be periodically merged to the `*-maintenance` branch during this period.

This will be available in the App firmware flasher tab when **Release and Release Candidates** is selected. :warning: Show release candidates required.

**Final:** The suffixes are removed from the version, the code is tagged, the release prepared and then announced.

This will be available in the App firmware flasher tab when the default of **Release** is selected.

**Patch:** Periodically we will make a patch release (incrementing the patch number) for any notable bugs that need resolving. These will generally be placed into `master` and backported to the `*-maintenance` branch.

These will be available in the App firmware flasher tab when the default of **Release** is selected.

### 2025.12 Special Mention

:warning: **Important Note for the `2025.12.0` Release** :warning:

For this first cycle, due to the timing since the last release, we are extending the RC period to two months. The Release Candidate phase will begin in October and run through November. 

The `2025.12.0-beta` pre-release will be made available today around 1200 UTC. Once in `beta` only bug fix pull requests will be merged, with all other items held over to the next `alpha` pre-release.

### Questions

If you have any questions please feel free to ask on the Betaflight [Discord](https://discord.gg/n4E6ak4u3c).

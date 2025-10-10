---
title: RP2350 Lands in Betaflight!
date: 2025-10-10T17:00
author: blckmn
---

**A New Challenger Enters the Ring: RP2350 Lands in Betaflight!**

Get ready for a game-changer! 🚀 The Betaflight **2025.12** release officially introduces support for a powerful new target: the **Raspberry Pi RP2350** aka **PICO 2**. This impressive little chip is set to shake up the FPV world, offering a unique blend of smart features, solid performance, and incredible value.

<!-- truncate -->

**Smart Performance Over Raw Speed**

While the core clock speed of the **RP2350** may not top the charts when compared to some rivals, it delivers a serious punch where it counts. This processor is all about working smarter, not just harder. Its architecture is designed for efficiency, ensuring a smooth and locked-in flight experience without needing the absolute highest clock rates.

**The PIO Advantage: Offloading the CPU**

One of the **RP2350's** standout features is its Programmable I/O (PIO). Think of PIO as a set of small, dedicated co-processors that can be programmed to handle I/O tasks independently.

This is a massive advantage for Betaflight. It means that complex, timing-sensitive tasks like running ESC protocols (like DSHOT) or receiver protocols (like CRSF) can be completely offloaded from the main CPU cores. This frees up the CPU to dedicate 100% of its resources to what matters most: executing the flight control loop as quickly and precisely as possible.

**Future-Proofed with Multicore Capability**

The **RP2350** is a dual-core beast. While this initial release lays the crucial groundwork for the new target, future Betaflight versions will be built to take full advantage of this multicore architecture. This opens up exciting possibilities for dividing tasks between cores, leading to even greater performance, lower latency, and the ability to run more complex features without breaking a sweat.

**Watch This Space!**

Perhaps the most compelling aspect of the **RP2350** is its fantastic price point. This combination of smart performance, the PIO advantage, and future-proof multicore design makes it an incredibly attractive option for hardware manufacturers.

Keep your eyes peeled! You can expect to see a new wave of innovative and affordable flight controllers featuring this great little chip hitting the market very soon. The future of flight controllers is looking bright and budget-friendly!

For more details on the **RP2350** you can check out the Raspberry Pi [Pico series](https://www.raspberrypi.com/documentation/microcontrollers/pico-series.html).

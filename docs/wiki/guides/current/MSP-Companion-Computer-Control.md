# Controlling Betaflight From a Companion Computer Over MSP

Betaflight can accept RC input over MSP (MultiWii Serial Protocol) from a companion computer such as a Raspberry Pi or NVIDIA Jetson connected over USB or UART. This enables autonomous flight, computer-assisted control, and hardware-in-the-loop testing. Both configurations below use the same `MSP_SET_RAW_RC` message (MSP v1 code 200), but they differ in who holds arming authority and in what happens when the link fails. Choosing the wrong one has real safety consequences.

## The two configurations

### 1. MSP as the sole receiver: bench use only

```text
feature RX_MSP
save
```

Note that this is a receiver feature, not a serial receiver provider: `MSP` is not an allowed `serialrx_provider` value. Betaflight then treats `MSP_SET_RAW_RC` as its only RC source. There is no receiver, so the companion process owns everything, including arming (map ARM to an AUX channel it sends, for example AUX1).

:::warning

If the companion process stops sending (crash, USB disconnect, scheduling stall), the flight controller drops into failsafe. Nobody can catch the aircraft, because there are no other sticks. This configuration is appropriate for bench testing and props-off development, not for flight.

:::

### 2. MSP override: the one to fly

A real receiver supplies every channel. Betaflight substitutes MSP values for only the channels named by a bitmask, and only while the MSP OVERRIDE flight mode is active (a switch the pilot holds).

```text
# assumes a serial receiver is already working (feature RX_SERIAL plus a UART assigned to Serial RX)
set serialrx_provider = CRSF        # or whatever your real receiver uses
set msp_override_channels_mask = 15
save
```

`msp_override_failsafe` defaults to `OFF`, which means losing the RC receiver link still triggers normal failsafe even while the override is active. Leave it `OFF` unless you specifically intend to fly on MSP without an RC link, which forfeits the safety properties this section is about.

`15` is binary `1111`, meaning channels 1 to 4 (roll/pitch/throttle/yaw). The companion computer flies the aircraft; every AUX channel stays with the receiver, so ARM and the kill switch remain physical. Then, in the Modes tab, put ARM and MSP OVERRIDE on two real (receiver-driven) switches.

Two rules, only one of which the firmware protects you from:

- **ARM must not sit on an MSP-driven channel.** Nothing in the firmware prevents this, and if you allow it the companion process can arm the aircraft itself. Keep ARM on a receiver channel that the mask excludes.
- **The mask on the flight controller and the mask your companion software assumes must be equal.** A mismatch produces no error; it silently changes who controls which channel. Note that Betaflight adjusts the mask itself when you save: the bit for whichever AUX channel MSP OVERRIDE is assigned to is cleared automatically, so you cannot trap yourself in override, and if that leaves the mask at zero the MSP OVERRIDE mode is removed. Read the mask back after saving rather than assuming the value you set.

When the pilot flips MSP OVERRIDE off, control returns to the receiver's live channels instantly. That switch is the pilot-takeover mechanism for the MSP-controlled channels (the ARM switch separately remains the kill authority), and what happens when the companion process stops sending depends on the firmware version:

- Betaflight 4.5.x and 2025.12.x: the last received MSP values are held indefinitely. Verified on 4.5.2: no timeout, values still held minutes after the sender died. The aircraft keeps flying the last command until the pilot flips the switch.
- Betaflight 2026.6 and later (MSP RC freshness check, `RX_MSP_RC_FRAME_FRESH_MS = 300`): overridden channels fall back to the receiver 300 ms after MSP frames stop.

Either way the pilot briefing is the same: on anything unexpected, flip MSP OVERRIDE off first, and do not rely on the firmware to hand control back for you on 4.5.x or 2025.12.x.

:::note

MSP override is compiled into every standard Betaflight build: `USE_RX_MSP_OVERRIDE` is defined unconditionally in `src/main/target/common_pre.h`, and there is no cloud build option to select for it. If `msp_override_channels_mask` is missing from your CLI, you are on a cut-down or custom build.

:::

## Sending MSP_SET_RAW_RC

The message payload is N uint16 little-endian channel values in microseconds, in your configured channel order (AETR by default: roll, pitch, throttle, yaw, then AUX1 and up). Use 1000 to 2000 with 1500 as center. Up to 18 channels are accepted; a longer payload is rejected with an MSP error. Values outside `rx_min_usec` to `rx_max_usec` (885 to 2115 by default) are silently clamped in override mode rather than rejected.

`MSP_SET_RAW_RC` and `MSP_RC` are documented in the [MSP Protocol Reference](/docs/development/MSP-Protocol-Reference-Dev).

Practical points:

- Send continuously at a steady rate (25 to 50 Hz works well). In configuration 1, frames must keep arriving or the source is considered lost and the aircraft failsafes. In configuration 2, stopped frames mean held values on 4.5.x and 2025.12.x, or a 300 ms fallback on 2026.6 and later, per the section above.
- Every frame must include every channel up to and including the highest-numbered channel your mask selects. MSP channel values are positional, so a mask that selects only channel 8 still needs an eight-value payload; it is the highest channel that sets the length, not the number of masked channels. Betaflight resets every channel past the end of your payload to zero. On 4.5.x and 2025.12.x that zero is then clamped to `rx_min_usec` (885 by default) and used, so a short frame, or enabling MSP OVERRIDE before your process has sent its first frame, drops the masked channels including throttle to minimum. On 2026.6 and later a channel beyond the last frame's length counts as stale and stays with the receiver.
- Beyond that, send meaningful values only on the overridden channels and keep the rest at center. The flight controller ignores non-masked channels from MSP, but your own software should not rely on values it does not control.
- Never let your software simply stop sending in override mode: on 4.5.x and 2025.12.x going silent freezes the last command indefinitely, and even on 2026.6 and later the aircraft flies your stale command for 300 ms. On any internal failure (planner hung, camera stalled), send neutral attitude values with reduced throttle and keep sending them until the pilot takes over.
- Any MSP implementation works, for example YAMSPy (Python), or raw struct packing over a serial library.

## Verifying the setup before flight (props off)

1. `MSP_RC` readback: send a distinctive pattern via `MSP_SET_RAW_RC` and read `MSP_RC` back. In configuration 1 you should see your values verbatim. In configuration 2 you should see the receiver's values until the pilot enables MSP OVERRIDE, then your values on the masked channels only.
2. Confirm what a dead sender does on your firmware: with MSP OVERRIDE active, kill the companion process and read `MSP_RC` back. On 4.5.x and 2025.12.x the flight controller keeps the last MSP values until the pilot flips MSP OVERRIDE off; on 2026.6 and later the overridden channels should return to the receiver after 300 ms. Flipping MSP OVERRIDE off must return the channels to the receiver instantly in both cases. In configuration 1, a dead sender means failsafe.
3. On 4.5.x and 2025.12.x, confirm the short-frame behaviour before you ever fly it: with the companion process NOT sending, enable MSP OVERRIDE and read `MSP_RC` back. The masked channels should sit at `rx_min_usec` rather than at the receiver's values. This is why the companion must be streaming before the switch goes in.
4. Confirm ARM authority: attempt to change the ARM channel over MSP in configuration 2. It must have no effect.

A configuration mismatch here does not fail loudly. It fails by the aircraft not responding, or responding when it should not. Check the settings programmatically at startup if your companion software supports it, or use a preflight checklist.

## Choosing between them

|                           | `feature RX_MSP`                  | MSP override                                                                                                 |
| ------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Receiver needed           | no                                | yes                                                                                                          |
| Who arms                  | companion computer                | pilot (physical switch)                                                                                      |
| Companion-death behavior  | failsafe                          | 4.5.x and 2025.12.x: holds last values until pilot flips the switch; 2026.6 and later: receiver after 300 ms |
| Pilot can reclaim control | no                                | instantly (switch)                                                                                           |
| Appropriate for           | bench, HIL, props-off development | autonomous flight                                                                                            |

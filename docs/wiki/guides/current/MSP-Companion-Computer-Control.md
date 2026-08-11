# Controlling Betaflight from a Companion Computer over MSP

Betaflight can accept RC input over MSP (MultiWii Serial Protocol) from a companion computer such as a Raspberry Pi or NVIDIA Jetson connected over USB or UART. This enables autonomous flight, computer-assisted control, and hardware-in-the-loop testing. Both configurations below use the same `MSP_SET_RAW_RC` message (MSP v1 code 200), but they differ in who holds arming authority and in what happens when the link fails. Choosing the wrong one has real safety consequences.

## The two configurations

### 1. MSP as the sole receiver: bench use only

```
set serialrx_provider = MSP
save
```

Betaflight treats `MSP_SET_RAW_RC` as its only RC source. There is no receiver, so the companion process owns everything, including arming (map ARM to an AUX channel it sends, for example AUX1).

:::warning

If the companion process stops sending (crash, USB disconnect, scheduling stall), the flight controller drops into failsafe. Nobody can catch the aircraft, because there are no other sticks. This configuration is appropriate for bench testing and props-off development, not for flight.

:::

### 2. MSP override: the one to fly

A real receiver supplies every channel. Betaflight substitutes MSP values for only the channels named by a bitmask, and only while the MSP OVERRIDE flight mode is active (a switch the pilot holds).

```
set serialrx_provider = CRSF        # or whatever your real receiver uses
set msp_override_channels_mask = 15
save
```

`15` is binary `1111`, meaning channels 1 to 4 (roll/pitch/throttle/yaw). The companion computer flies the aircraft; every AUX channel stays with the receiver, so ARM and the kill switch remain physical. Then, in the Modes tab, put ARM and MSP OVERRIDE on two real (receiver-driven) switches.

Two rules that fail silently if violated:

- Neither ARM nor MSP OVERRIDE may sit on an MSP-driven channel. Otherwise the companion process could arm itself, or trap itself in override with no way for the pilot to reclaim the sticks.
- The mask on the flight controller and the mask the companion software assumes must be equal. A mismatch does not produce an error; it silently changes who controls which channel.

When the pilot flips MSP OVERRIDE off, control returns to the receiver's live channels instantly. That switch is the safety mechanism, and it is the only one: if the companion process stops sending while the switch stays on, Betaflight holds the last received MSP values indefinitely (verified on 4.5.2: no timeout, values still held minutes after the sender died). The aircraft keeps flying the last command until the pilot flips the switch. Brief the pilot accordingly: on anything unexpected, flip MSP OVERRIDE off first.

:::note

MSP override is gated behind a build define (`USE_RX_MSP_OVERRIDE`). If `msp_override_channels_mask` is missing from your CLI, your target's default build does not include it. Use the cloud build system with the feature selected, or build with the define added.

:::

## Sending MSP_SET_RAW_RC

The message payload is N uint16 little-endian channel values in microseconds (1000 to 2000, center 1500), in your configured channel order (AETR by default: roll, pitch, throttle, yaw, then AUX1 and up).

Practical points:

- Send continuously at a steady rate (25 to 50 Hz works well). In configuration 1, frames must keep arriving or the source is considered lost and the aircraft failsafes. In configuration 2, stopped frames mean the last values are held, per the section above.
- In override mode, send meaningful values only on the overridden channels and keep the rest at center. The flight controller ignores non-masked channels from MSP, but your own software should not rely on values it does not control.
- Never let your software simply stop sending in override mode: the flight controller holds your last values, so going silent freezes the last command. On any internal failure (planner hung, camera stalled), send neutral attitude values with reduced throttle and keep sending them until the pilot takes over.
- Any MSP implementation works, for example YAMSPy (Python), or raw struct packing over a serial library.

## Verifying the setup before flight (props off)

1. `MSP_RC` readback: send a distinctive pattern via `MSP_SET_RAW_RC` and read `MSP_RC` back. In configuration 1 you should see your values verbatim. In configuration 2 you should see the receiver's values until the pilot enables MSP OVERRIDE, then your values on the masked channels only.
2. Confirm the hold behavior: with MSP OVERRIDE active, kill the companion process and read `MSP_RC` back. In configuration 2 the flight controller keeps the last MSP values (it does not revert on its own); flipping MSP OVERRIDE off must return the channels to the receiver instantly. In configuration 1, a dead sender means failsafe.
3. Confirm ARM authority: attempt to change the ARM channel over MSP in configuration 2. It must have no effect.

A configuration mismatch here does not fail loudly. It fails by the aircraft not responding, or responding when it should not. Check the settings programmatically at startup if your companion software supports it, or use a preflight checklist.

## Choosing between them

| | `serialrx_provider = MSP` | MSP override |
| --- | --- | --- |
| Receiver needed | no | yes |
| Who arms | companion computer | pilot (physical switch) |
| Companion-death behavior | failsafe | holds last MSP values until pilot flips the switch |
| Pilot can reclaim control | no | instantly (switch) |
| Appropriate for | bench, HIL, props-off development | autonomous flight |

# Paralyze For Team Races

During team relay races it's unsafe to retrieve crashed quads because the course is continuously hot. In order to safely fly a backup quad with the primary quad crashed in the field (but powered up) it's necessary to:

- Disable arming, so that the crashed quad doesn't unintentionally arm when taking off with the backup. This is specifically a problem when a transmitter can send signals to all powered up receivers (like FrSky ACCST D8/D16 and others)
- and change the VTX to an unused (graveyard) channel with low power output so it doesn't interfere with the backup quad.

Betaflight 3.5 introduced a new mode called paralyze which disables arming. It can only be invoked while the quad isn't armed. Paralyze is a sticky mode, so once it's active, the FC has to be power cycled.

In order to invoke it, the mode needs to be in a disengaged state at least once, so that forgetting to flip the switch back after crashing doesn't immediately invoke paralyze on the backup quad.

Paralyze itself only takes care of preventing arming. To also put the VTX into pit mode and keep it there, you can link it to Paralyze in the CLI:

```
aux 2 39 2 1700 2100 0 45
```

The aux channel (2 in this case) and the range (1700-2100 here) doesn't matter as 45 at the end of the command means mode 39 (VTX Pit mode) is linked to 45 (Paralyze). Whenever 45 is active, 39 is activated as well and therefore sticky like Paralyze.

Make sure that VTX Pit mode is set up correctly by specifying a pit mode frequency in CLI:

```
set vtx_pit_mode_freq = 5917
```

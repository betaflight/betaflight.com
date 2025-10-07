# External OSD - MWOSD - CMS

This guide is intended for users who do not have an embedded OSD and / or wish to use an external OSD

---

## Typical MWOSD installation and configuration

### About this mode:

- MWOSD requests raw data from FC, manipulates into human readable format and display
- Screen layouts and displayed items are determined by MWOSD GUI configurator

### MWOSD configuration

- MWOSD install guides etc. are available via [MWOSD wiki](https://github.com/ShikOfTheRa/scarab-osd/wiki).
- Installing the latest firmware from MWOSD GUI configurator is recommended.
- Versions 1.7 onward have CMS support enabled for Betaflight.
- If you are building your own MWOSD firmware, ensure `CANVAS_SUPPORT` is enabled in config.

### FC configuration

- BetaFlight v3.1.0 onwards for most pre-built targets F3, F4 and F7 have CMS support enabled.
- Use OSD should be disabled in the FC GUI configurator.
- MSP must be enabled on the serial port the OSD is attached to.
- Baud rate must match the OSD. Typically this is 115k

If you are building your own Betaflight FC firmware:

- It must be built with `CMS` and `USE_MSP_DISPLAYPORT` or equivalent options.
- Corresponding features should be turned on in configuration if they are controlled via features.

### Menu activation

- BetaFlight CMS menu activation is `Thr MID + Yaw LEFT + Pitch UP`.
- MWOSD menu activation is `Thr MID + Yaw RIGHT + Pitch UP`.

---

## Non typical DISPLAYPORT installation and configuration.

### About this mode:

- MWOSD acts dumb and displays screen sent from FC.
- OSD layouts are configured in the Betaflight App OSD tab.

Limitations:

- Screen update speed is slower than a typical installation.
- If this mode is required, raise a request with MWOSD team. A small amount of development is required to resolve issues with flickering display.

To use with DISPLAYPORT:

- Install latest MWOSD firmware on the OSD.
- READ CAREFULLY - Install the `FC fonts` onto the OSD using MWOSD gui configurator. Using MWOSD fonts may display strange characters.
- Use OSD should be enabled in the FC GUI configurator.

If you are building your own Betaflight FC firmware:

- Build FC firmware with added options. E.g. make `OPTIONS=USE_OSD USE_OSD_OVER_MSP_DISPLAYPORT REVOLT`
- This will enable the OSD tab and full DISPLAYPORT support from the FC.

See also: [CMS adjustment](OSD-and-CMS-Adjusting-Screen)

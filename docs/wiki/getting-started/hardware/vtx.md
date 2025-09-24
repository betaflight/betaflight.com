# VTX

Video Transmitters are commonly referred to as VTX units. These are typically analogue or digital systems transmitting on the 5.8GHz band, although other frequency bands are sometimes used for specialist long-range craft.

## Analog FPV Video

Analogue video systems transmit a CVBS signal in either PAL or NTSC using channels in the 5.8GHz band.

- Originally the FPV hardware in quadcopters was based on analogue security cameras and the associated transmission equipment.
  - Early boards required manual channel selection using physical switches on the transmitter which was inconvenient for pilots
  - Pilots could easily power on and interrupt video for pilots already flying.
- Cameras improved over time and VTX hardware has become more tightly integrated into the overall FPV experience.
  - [SmartAudio from TBS](/docs/wiki/guides/current/SmartAudio) and [Tramp from ImmersionRC](/docs/wiki/guides/current/IRC-Tramp) - allow users to change their video channel, band and power output from the FC. Pilots must supply a list of valid channels, bands and power levels to the FC called a [VTX Table](/docs/wiki/guides/current/VTX-Tables)
  - [OpenVTX](https://github.com/OpenVTx/OpenVTx) introduced MSP VTX control. MSP VTXs can announce available channel, band and power information so VTX Tables are not required.
  - [ExpressLRS backpack](https://github.com/ExpressLRS/Backpack/wiki) combines the ability to control any SmartAudio, Tramp or MSP VTX whilst simultaneously setting the same channel on the goggles.

Originally the OSD for these systems was a separate add-in board such as Minim OSD, these have been replaced by OSD chips onboard the FC. This AT7456 is used on many FCs for this purpose and combines a black/white text-based OSD onto a video feed from the camera before sending the video signal to the VTX for transmission.

## Digital FPV Video

- [HDZero](https://www.hd-zero.com/) is a unidirectional digital video system seen as the continuation of prior analogue video techniques
  - Uses the same frequency bands and analogue Raceband inter-operates with pilots flying analogue video without disruption to other channels.
  - Allows MSP VTX control of band and channel from the FC
  - Integrates with eLRS backpacks for seamless VTX and Goggles integration
  - MSP Displayport is implemented and working.
- [DJI FPV](https://www.dji.com/fpv) v1 was launched in 2019 as the first widely available digital FPV system suitable for installation in 5" quadcopters.
  - DJI FPV v1 consisted of the Goggles v1 (and later Goggles v2)
  - 2 VTXs were available - a large dual-antenna "air unit" with no mounting holes and a smaller single-antenna "air unit lite" with 20x20 M2 mounting holes
  - Larger VTX claimed 1080p onboard microSD DVR recording. Recording on air unit was unreliable and recordings would often stop after several seconds.
  - Digital video performance is adequate but the OSD is poorly implemented and lacks support for critical elements like Warnings
  - WTFOS is an after-market system enabling full OSD support for the original DJI FPV system
  - Several models of non-DJI camera have been available from Caddx and Runcam.
- [DJI O3](https://www.dji.com/newsroom/news/dji-launches-o3-air-unit) launched in 2022 as the successor to the v1 system.
  - New Goggles were launched called the Goggles 2 (different from the Goggles v2)
  - New VTX and camera was launched called the O3 Air Unit. Image quality and range are improved from v1.
  - Goggles 2 can work with previous generation Air Unit Lite with a firmware update (will stop the air unit working on Goggles v1 and v2)
  - Goggles v2 can switch to a mode that works with O3 Air Units, but this can erase pairings with previous generation Air Units
  - Onboard 4K DVR is available comparable to the DJI Action 2, and compatible with free [GyroFlow stabilisation](https://gyroflow.xyz/).
  - MSP Displayport is partially implemented but some characters are not drawn correctly and bugs exist.
- [Caddx WalkSnail Avatar](https://caddxfpv.com/collections/walksnail-avatar-system) launched in 2022 as a new digital VTX.

  - Variety of goggles, standalone VRX, VTX and cameras are available.
  - Goggles initially based on FatShark partnership, new models produced by Caddx.
  - Similar performance to DJI v1 but smaller VTXs
  - Onboard DVR at 1080p to internal flash - 8GB or 32GB
  - v2 and newer cameras feature onboard gyros and can record data for use in free [GyroFlow stabilisation](https://gyroflow.xyz/).
  - MSP displayport is fully implemented and supports coloured fonts with Betaflight 4.5.

  Digital video systems typically render the OSD in the FPV goggles instead of prior to transmitting. This is due to a number of factors, including the processing cost of overlaying OSD onto high resolution digital video in the low-power VTX and also the tendency of digital video compression algorithms to deal poorly with sharp text characters. Rendering the OSD on the goggles is a compromise that provides low latency video with clear OSD text. OSD data is sent via a UART from the FC to the VTX using the [MSP Displayport protocol](/docs/development/API/DisplayPort) and sent a separate OSD data feed is sent alongside the video stream to the goggles.

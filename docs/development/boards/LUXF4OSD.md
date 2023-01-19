# LUXF4OSD

This is an AIO Flight Controller F4 FC with OSD and 30A BLHeli_32 ESC.
More information on this FC can be found here:
http://www.multirotorguide.com/news/lumenier-alpha-aio-flight-controller-f4-fc-with-osd-and-30a-blheli_32-esc/

## iBus and SmartAudio

As this FC has only one UART (UART6) provided as pins, it can be tricky to get iBus (that needs a UART RX) and SmartAudio working at the same time. Here is a solution to get this accomplished:

1. Solder iBus to the Pad labled RX6 and SmartAudio to the Pad labeled TX6.
2. Configure iBus in Betaflight as usual for Port 6
3. Run the following commands in CLI:

`resource PWM 3 NONE`

`resource SERIAL_TX 6 NONE`

`resource SERIAL_TX 11 C06`

`feature SOFTSERIAL`

`save`

4. Now you should find another soft-serial on your ports-tab that you can use to configure SmartAudio

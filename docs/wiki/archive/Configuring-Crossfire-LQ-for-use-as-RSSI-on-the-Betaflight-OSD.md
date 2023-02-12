# Configuring Crossfire

Betaflight has the ability to display on your OSD a measurement of Crossfire LQ (Link Quality). This measurement is based on a ratio of successful packets transmitted and received. This is the recommended performance indicator to use instead of RSSI, due to the overall signal strength of the Crossfire hardware.

### Betaflight 4.1 and later, with native Crossfire LQ and RSSI dbm support:

1. Configure your flight controller to use the CRSF protocol
2. On the Configuration page select the serial-based receiver and the CRSF protocol, make sure RSSI_ADC is disabled.
3. On the Receiver page, make sure RSSI Channel is disabled.
4. Select LQ in the osd menu.

### Betaflight 4.0 and earlier:

1. Configure your Crossfire RX to transmit LQ on an unused RC channel, by using the Crossfire OLED menu or Lua Script.
2. On the Configuration page select the serial-based receiver and the CRSF protocol, make sure RSSI_ADC is disabled.
3. On the Receiver page, set the RSSI Channel to the correct AUX (channel number - 4).
4. Enable and place the RSSI element on your OSD.

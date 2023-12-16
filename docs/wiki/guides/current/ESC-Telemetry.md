# ESC Telemetry

**As of Version 3.1.0 RC1 the ability to read ESC telemetry from KISS 24A ESCs exists in Betaflight.**

This page is intended to be a quick guide on how to set up ESC telemetry and will require a basic understanding of terms and equipment which can be found elsewhere within the wiki or through researching each term separately. This version of the guide won't cover how to get telemetry set up from the flight controller to the RC receiver and back to the RC Transmitter, that is part of the prerequisites and is currently listed as optional.

### Requirements:

- Supported flight controller with Betaflight version 3.1.0 RC1 or later.
- Betaflight configurator version 1.8.5 or later.
- Kiss 24A ESCs with Dshot capable firmware.
- One spare hardware UART on the flight controller.
- (Optional) Telemetry from flight controller to RC receiver.

### Procedure:

**Install the ESCs** to the quad and run a wire from all four telemetry pads on the ESCs to the RX pin of the spare hardware UART on the flight controller. It may be easier to make a loom to split a single wire from the RX pin of the UART into four wires (one for each ESC).

**Open the Betaflight configurator (V 1.8.5 or later) and go to the Ports tab.**

Find the UART that the ESC telemetry is connected to and in the column marked "Sensor Input", select ESC in the left box and leave AUTO in the right box. Don't forget to hit the "save and reboot" button.

**Still in Betaflight configurator, switch to the Configuration tab.**

_**Make sure you are using the Dshot protocol for ESC communication!**_

Under "Other Features", make sure that "ESC_SENSOR" is enabled.

On the Battery Voltage section enable "VBAT" and select ESC Sensor from the drop down menu below. Configure the cell voltages as required. (Defaults should be fine)

On the Current Sensor section enable "CURRENT_METER" and select ESC Sensor from the drop down menu below. Configure the scale and offset as required. (Defaults should be fine)

_To test, set it all up then plug in the flight controller as well as the battery, open the configurator to the configuration tab and arm via the tx within a few seconds of powering on the flight controller. PROPS OFF ON THE BENCH!_

**Confirm that telemetry is being received by the transmitter.**

If using a Taranis, don't forget to arm the quad when you "Discover Sensors" or the ESC telemetry won't be discovered.

Taranis users may want to change the "FUEL" sensor from % to mAh for an accurate reading.

## OMNIBUS F4 Pro Corners

## Notes

- 3.2.0: Programmable inverter on UART3 (controlled by PC9) is configured, but not activated by default as it interfere with other usages of PC9; users must activate it by `resource INVERTER 3 C09` (see example below).

## Hardware

- Variant of OMNIBUS F4 Pro (OMNIBUSF4SD target). Please refer to OMNIBUS F4 wiki page for additional information.
- Still uses OMNIBUSF4SD target.
- Two dual inverters, on UART3 (controlled by PC9) and UART6 (controlled by PC8); supports SBUS and native SmartPort (requires a diode for SmartPort).
- UART1_RX can be connected to ESC telemetry via jumper.

## Configuration Example 1

- UART1 ESC Telemetry
- UART3 SBUS
- UART6 SmartPort (Inverted, TX-Inline-Diode)
- SOFTSERIAL1 SmartAudio

![](https://user-images.githubusercontent.com/14850998/29904533-3ec5c1f6-8e44-11e7-879f-e1b433b4d8f1.jpg)

```
# Betaflight / OMNIBUSF4SD (OBSD) 3.2.0 Aug 28 2017 / 12:02:37 (b2cd7294e)

# resources
resource SERIAL_TX 1 NONE
resource SERIAL_TX 11 A09
resource INVERTER 3 C09

# feature
feature SOFTSERIAL
feature TELEMETRY
feature ESC_SENSOR

# serial
serial 0 1024 115200 57600 0 115200
serial 2 64 115200 57600 0 115200
serial 5 32 115200 57600 0 115200
serial 30 2048 115200 57600 0 115200

# master
set serialrx_provider = SBUS
set current_meter = ESC
set battery_meter = ADC
set tlm_halfduplex = OFF
```

## Configuration Example 2

- UART1 ESC Telemetry
- UART3 SBUS
- UART6 Free (for e.g. GPS)
- SOFTSERIAL1 Smartport (UART TX1 pad)
- SOFTSERIAL2 IRC Tramp (M5 pad)

![Omnibus F4 Pro Corner wiring diagram](https://github.com/stsa64/Quadcopter/blob/master/Omnibus%20F4%20pro%20corner%20diagram.jpg)

```
# Betaflight / OMNIBUSF4SD (OBSD) 3.2.5 Feb 11 2018 / 00:49:36 (6e69ff00c) MSP API: 1.36

# resources
resource MOTOR 5 NONE
resource SERIAL_TX 1 NONE
resource SERIAL_TX 11 A09
resource SERIAL_TX 12 A01

# feature
feature MOTOR_STOP
feature SOFTSERIAL
feature TELEMETRY
feature ESC_SENSOR

# serial
serial 0 1024 115200 57600 0 115200
serial 2 64 115200 57600 0 115200
serial 30 32 115200 57600 0 115200
serial 31 8192 115200 57600 0 115200

# master
set serialrx_provider = SBUS
```

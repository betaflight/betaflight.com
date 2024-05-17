# Broken USB Rescue

It is possible to flash FCs via UART without further requirements, this can be useful to continue using FCs with a broken USB port.

> ## Important
>
> Only for STM32 processors! A similar procedure is also possible for AT32 (via IAP_Programmer for AT32), but not tested.

## Prerequisites

- USB/UART adapter (FT232, CP2102, etc.)
- STM32CubeProgrammer (https://www.st.com/en/development-tools/stm32cubeprog.html)

To gain access to the FC via Configurator, MSP must be activated on a UART as standard.

## Custom firmware

A custom "rescue" firmware must be built on which MSP is activated on a UART. If MSP is already activated on a UART (not VCP) in the standard firmware, this step can be skipped.

### Manual build

Read [Building](/docs/category/building) and follow the instructions.
As EXTRA_FLAG add `-DMSP_UART=[UART]`.
Replace `[UART]` with a value from the table below.

### Cloud build

In the Configurator go to the Firmware Flasher, enable Expert mode, select your Board and Version and add following Custom define: `MSP_UART=[UART]`
Replace `[UART]` with a value from the table below.

After the firmware is build, click on 'Loaded Online Firmware [filename]' to save the hex file on your computer.

Values for `[UART]`
| UART | Value |
|-----------| ----------- |
| 1 | SERIAL_PORT_USART1 |
| 2 | SERIAL_PORT_USART2 |
| 3 | SERIAL_PORT_USART3 |
| 4 | SERIAL_PORT_UART4 |
| 5 | SERIAL_PORT_UART5 |
| 6 | SERIAL_PORT_USART6 |
| 7 | SERIAL_PORT_USART7 |
| 8 | SERIAL_PORT_USART8 |
| 9 | SERIAL_PORT_UART9 |
| 10 | SERIAL_PORT_USART10 |

Example for UART 3:

- Manual Build: `-DMSP_UART=SERIAL_PORT_USART3`
- Cloud Build: `MSP_UART=SERIAL_PORT_USART3`

## Flashing via Uart

1. Disconnect ALL peripherals and the USB Cable from the FC. To power the FC use a battery or use the 5V provided from the USB/Serial Converter.
2. Connect UART 1 or 3 (other UARTS will not work) and GND to the USB/Serial converter (RX -> TX, TX -> RX)
3. Keep the boot/dfu button pressed
4. Switch on the FC / supply with power
5. Start STM32 CubeProgrammer and go to "Erasing & Programming", second option in the menu.
6. Select UART (blue dropdown field) and select the COM port of the USB/Serial adapter and press "Connect". The corresponding processor should now be displayed below.
7. Click on "Full flash erase". This is also necessary if you are flashing the same firmware version that was previously on the FC, otherwise MSP may not be activated on the UART.
8. Under "Download" load the previously created firmware (`betaflight_X.X.X_[PROCESSOR]_[TARGET].hex`). The option "Verify programming" is optional but recommended. Make sure that "Skip flash erase while programming" is NOT activated.
9. Click "Start Programming"

After the process is completed, switch the FC off and on again and then the Configurator can connect to the FC via USB/serial adapter and the previously configured UART.

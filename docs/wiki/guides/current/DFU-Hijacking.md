# DFU Hijacking

## Introduction

If your board is not going into DFU mode

- even if you are 120% sure that you have a right set of drivers installed for flashing and a healthy set of computer hardwares including USB cable, or
- even if you can flash other boards with the host computer environment, or
- the board goes into DFU intermittently under some special conditions,

then this page may explain why and provide you with a work around.

## What is DFU Hijacking?

STM32 family of MCUs, when in boot loader mode, look for input from several different peripherals, including USB VCP and UARTs. If there is a chatty device connected a UART and sends something looks valid, then the boot loader _**focus**_ es on the UART port and try to load a firmware from the UART port. In other words, the chatty device _**hijack**_ s the boot loader.

## Possible Workarounds

Workarounds against DFU hijacking by chatty devices are as follow.

1. Shut the chatty device up by powering them down or physically disconnecting while flashing. Using a power supply pad not powered when only USB is connected is an alternative way of doing this.

2. Many receivers does not send valid output until they are first bound (connected) to a transmitter after power cycle. Turning off your transmitter before powering up such receiver prevents the hijacking in this case.

3. Use half-duplex protocol and use TX pin to connect the chatty devices. Since the boot loader does not turn on half-duplex and only listens to RX pin, something received on TX pin does not induce the hijacking.

4. Avoid connecting chatty devices to boot loader sensitive UART ports. The boot loader sensitive UART ports on F4 are PA10, PB11 and PC11. For CLRACINGF4 (and JBF4), UART1 (PA10) and UART3 (PB11) falls into this category. Well designed FCs avoids assigning default receiver port the boot loader sensitive pins.

### Note:

If none of the above solves the problem you need to look at your [udev](https://opensource.com/article/18/11/udev) rules.

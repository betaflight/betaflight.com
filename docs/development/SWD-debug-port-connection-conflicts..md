When debugging via J-link and GDB there may be a problem with the SWD port I/O pins being shared with other functions. This may block the J-link SWD connection and result in error messages like:

> WARNING: RESET (pin 15) high, but should be low. Please check target hardware

- On SMT32F303 UART2 TX is shared with SWDCLK on PA14. Enabling any function on UART2 will block SWD. Problem seen with SPRACINGF3 when using UART2 for Tramp VTX control. Disabling UART2 solved the problem.
- On STM32F405 the SWDIO and SWDCLK are not shared and I have not seen any problems like above.
- The MatekF722-SE uses PA14/PA15 for the LEDS, but if the LEDs are removed this at least gives pads to solder to as shown below in which a JST-SH 4 pin connector is used for SWDIO, SWDCK, 3V3 and GND.
  ![](https://user-images.githubusercontent.com/11480839/63185119-0fb64c00-c051-11e9-9bdb-56a7244bf62e.jpeg)

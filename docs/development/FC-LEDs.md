# Betaflight Flight Controller LED usage

Betaflight Flight Controllers typically have two LEDs, possibly three which indicate the conditions below.

FCs implement at least one LED to indicate activity. The second is preferable, and the third optional.

| LED Number | Colour | Required   | Function                                                                                                                                                                                                                                                                                                                 |
| :--------- | :----- | :--------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0          | Blue   | Yes        | Flashes 5 times on startup<br/>On whilst armed<br/>Flashes to indicate warning<br/>Flashes during ESC passthough<br/>Flashes during USB MSC activity<br/>Indicates activity for serial passthrough<br/>Indicates Rx activity for serial 4way<br/>Flashes during Spektrum binding<br/>Flashes during Hard Fault conditions |
| 1          | Green  | Preferably | Flashes 5 times on startup<br/>Indicates Tx activity for serial 4way<br/>Flashes during Hard Fault conditions                                                                                                                                                                                                            |
| 2          | Amber  | No         | Normally on<br/>Flashes during Spektrum binding<br/>Flashes during Hard Fault conditions                                                                                                                                                                                                                                  |

Error codes indicated by a brief 100 ms flash and then a count of 250 ms flashes as per the table below.

| Error                                | Flash count |
| :----------------------------------- | :---------- |
| FAILURE_MISSING_ACC                  | 1           |
| FAILURE_ACC_INIT                     | 2           |
| FAILURE_ACC_INCOMPATIBLE             | 3           |
| FAILURE_INVALID_EEPROM_CONTENTS      | 4           |
| FAILURE_CONFIG_STORE_FAILURE         | 5           |
| FAILURE_GYRO_INIT_FAILED             | 6           |
| FAILURE_FLASH_READ_FAILED            | 7           |
| FAILURE_FLASH_WRITE_FAILED           | 8           |
| FAILURE_FLASH_INIT_FAILED            | 9           |
| FAILURE_EXTERNAL_FLASH_READ_FAILED   | 10          |
| FAILURE_EXTERNAL_FLASH_WRITE_FAILED  | 11          |
| FAILURE_EXTERNAL_FLASH_INIT_FAILED   | 12          |
| FAILURE_SDCARD_READ_FAILED           | 13          |
| FAILURE_SDCARD_WRITE_FAILED          | 14          |
| FAILURE_SDCARD_INITIALISATION_FAILED | 15          |
| FAILURE_SDCARD_REQUIRED              | 16          |

# Parameter Group Reference

This page lists all Parameter Groups (PGs) registered in Betaflight firmware master. PGs are Betaflight's configuration storage system — each group maps a C struct to a persistent ID stored in EEPROM.

For the full rules on PG design and versioning see [Parameter Groups](/docs/development/ParameterGroups).

:::info
This table is generated from firmware source by `scripts/extract-pg-msp.js`. To regenerate after a firmware update:

```bash
node scripts/extract-pg-msp.js --firmware-path <path-to-betaflight-repo>
```

:::

## Parameter Group Table

<!-- PG_TABLE_START -->

_Generated from firmware commit: `c925d4f68202d5882af011b3b33bb3afee9a54e3`_

| ID   | Name                             | Struct Type                  | PG Version | Source File                          |
| ---- | -------------------------------- | ---------------------------- | ---------- | ------------------------------------ |
| 1    | PG_FAILSAFE_CONFIG               | failsafeConfig_t             | 2          | src/main/flight/failsafe.c           |
| 2    | PG_BOARD_ALIGNMENT               | boardAlignment_t             | 1          | src/main/sensors/boardalignment.c    |
| 3    | PG_GIMBAL_CONFIG                 | gimbalConfig_t               | 0          | src/main/flight/servos.c             |
| 4    | PG_MOTOR_MIXER                   | motorMixer_t                 | 0          | src/main/flight/mixer_init.c         |
| 5    | PG_BLACKBOX_CONFIG               | blackboxConfig_t             | 4          | src/main/blackbox/blackbox.c         |
| 6    | PG_MOTOR_CONFIG                  | motorConfig_t                | 3          | src/main/pg/motor.c                  |
| 7    | PG_SENSOR_SELECTION_CONFIG       | —                            | —          | —                                    |
| 8    | PG_SENSOR_ALIGNMENT_CONFIG       | —                            | —          | —                                    |
| 9    | PG_SENSOR_TRIMS                  | —                            | —          | —                                    |
| 10   | PG_GYRO_CONFIG                   | gyroConfig_t                 | 10         | src/main/sensors/gyro.c              |
| 11   | PG_BATTERY_CONFIG                | batteryConfig_t              | 4          | src/main/sensors/battery.c           |
| 12   | PG_CONTROL_RATE_PROFILES         | controlRateConfig_t          | 7          | src/main/fc/controlrate_profile.c    |
| 13   | PG_SERIAL_CONFIG                 | serialConfig_t               | 1          | src/main/io/serial.c                 |
| 14   | PG_PID_PROFILE                   | pidProfile_t                 | 11         | src/main/flight/pid.c                |
| 16   | PG_ARMING_CONFIG                 | armingConfig_t               | 2          | src/main/fc/rc_controls.c            |
| 17   | PG_TRANSPONDER_CONFIG            | transponderConfig_t          | 0          | src/main/io/transponder_ir.c         |
| 18   | PG_SYSTEM_CONFIG                 | systemConfig_t               | 4          | src/main/config/config.c             |
| 19   | PG_FEATURE_CONFIG                | featureConfig_t              | 1          | src/main/config/feature.c            |
| 20   | PG_MIXER_CONFIG                  | mixerConfig_t                | 2          | src/main/flight/mixer_init.c         |
| 21   | PG_SERVO_MIXER                   | servoMixer_t                 | 0          | src/main/flight/servos.c             |
| 22   | PG_IMU_CONFIG                    | imuConfig_t                  | 3          | src/main/flight/imu.c                |
| 23   | PG_PROFILE_SELECTION             | —                            | —          | —                                    |
| 24   | PG_RX_CONFIG                     | rxConfig_t                   | 4          | src/main/pg/rx.c                     |
| 25   | PG_RC_CONTROLS_CONFIG            | rcControlsConfig_t           | 1          | src/main/fc/rc_controls.c            |
| 26   | PG_MOTOR_3D_CONFIG               | flight3DConfig_t             | 0          | src/main/fc/rc_controls.c            |
| 27   | PG_LED_STRIP_CONFIG              | ledStripConfig_t             | 3          | src/main/io/ledstrip.c               |
| 28   | PG_COLOR_CONFIG                  | —                            | —          | —                                    |
| 29   | PG_AIRPLANE_CONFIG               | —                            | —          | —                                    |
| 30   | PG_GPS_CONFIG                    | gpsConfig_t                  | 4          | src/main/pg/gps.c                    |
| 31   | PG_TELEMETRY_CONFIG              | telemetryConfig_t            | 6          | src/main/telemetry/telemetry.c       |
| 32   | PG_FRSKY_TELEMETRY_CONFIG        | —                            | —          | —                                    |
| 33   | PG_HOTT_TELEMETRY_CONFIG         | —                            | —          | —                                    |
| 34   | PG_NAVIGATION_CONFIG             | —                            | —          | —                                    |
| 35   | PG_ACCELEROMETER_CONFIG          | accelerometerConfig_t        | 2          | src/main/sensors/acceleration_init.c |
| 36   | PG_RATE_PROFILE_SELECTION        | —                            | —          | —                                    |
| 37   | PG_ADJUSTMENT_RANGE_CONFIG       | adjustmentRange_t            | 2          | src/main/fc/rc_adjustments.c         |
| 38   | PG_BAROMETER_CONFIG              | barometerConfig_t            | 3          | src/main/sensors/barometer.c         |
| 39   | PG_THROTTLE_CORRECTION_CONFIG    | throttleCorrectionConfig_t   | 0          | src/main/fc/core.c                   |
| 40   | PG_COMPASS_CONFIG                | compassConfig_t              | 4          | src/main/sensors/compass.c           |
| 41   | PG_MODE_ACTIVATION_PROFILE       | modeActivationCondition_t    | 5          | src/main/fc/rc_modes.c               |
| 42   | PG_SERVO_PARAMS                  | servoParam_t                 | 0          | src/main/flight/servos.c             |
| 43   | PG_RX_FAILSAFE_CHANNEL_CONFIG    | rxFailsafeChannelConfig_t    | 0          | src/main/rx/rx.c                     |
| 44   | PG_RX_CHANNEL_RANGE_CONFIG       | rxChannelRangeConfig_t       | 0          | src/main/rx/rx.c                     |
| 45   | PG_MODE_COLOR_CONFIG             | —                            | —          | —                                    |
| 46   | PG_SPECIAL_COLOR_CONFIG          | —                            | —          | —                                    |
| 47   | PG_PILOT_CONFIG                  | pilotConfig_t                | 2          | src/main/pg/pilot.c                  |
| 48   | PG_MSP_SERVER_CONFIG             | —                            | —          | —                                    |
| 49   | PG_VOLTAGE_METER_CONFIG          | —                            | —          | —                                    |
| 50   | PG_AMPERAGE_METER_CONFIG         | —                            | —          | —                                    |
| 51   | PG_DEBUG_CONFIG                  | —                            | —          | —                                    |
| 52   | PG_SERVO_CONFIG                  | servoConfig_t                | 0          | src/main/flight/servos.c             |
| 53   | PG_IBUS_TELEMETRY_CONFIG         | —                            | —          | —                                    |
| 55   | PG_GPS_RESCUE                    | gpsRescueConfig_t            | 7          | src/main/pg/gps_rescue_multirotor.c  |
| 56   | PG_POSITION                      | positionConfig_t             | 7          | src/main/flight/position.c           |
| 57   | PG_VTX_IO_CONFIG                 | vtxIOConfig_t                | 0          | src/main/pg/vtx_io.c                 |
| 58   | PG_GPS_LAP_TIMER                 | gpsLapTimerConfig_t          | 1          | src/main/pg/gps_lap_timer.c          |
| 59   | PG_ALTHOLD_CONFIG                | altHoldConfig_t              | 4          | src/main/pg/alt_hold_multirotor.c    |
| 60   | PG_AUTOPILOT                     | autopilotConfig_t            | 6          | src/main/pg/autopilot.c              |
| 61   | PG_POSHOLD_CONFIG                | posHoldConfig_t              | 1          | src/main/pg/pos_hold_multirotor.c    |
| 100  | PG_DRIVER_PWM_RX_CONFIG          | —                            | —          | —                                    |
| 101  | PG_DRIVER_FLASHCHIP_CONFIG       | —                            | —          | —                                    |
| 256  | PG_CURRENT_SENSOR_ADC_CONFIG     | currentSensorADCConfig_t     | 0          | src/main/sensors/current.c           |
| 257  | PG_CURRENT_SENSOR_VIRTUAL_CONFIG | currentSensorVirtualConfig_t | 0          | src/main/sensors/current.c           |
| 258  | PG_VOLTAGE_SENSOR_ADC_CONFIG     | voltageSensorADCConfig_t     | 0          | src/main/sensors/voltage.c           |
| 259  | PG_VTX_SETTINGS_CONFIG           | vtxSettingsConfig_t          | 1          | src/main/io/vtx.c                    |
| 500  | PG_BETAFLIGHT_START              | —                            | —          | —                                    |
| 501  | PG_OSD_CONFIG                    | osdConfig_t                  | 13         | src/main/osd/osd.c                   |
| 502  | PG_BEEPER_CONFIG                 | beeperConfig_t               | 3          | src/main/pg/beeper.c                 |
| 503  | PG_BEEPER_DEV_CONFIG             | beeperDevConfig_t            | 0          | src/main/pg/beeper_dev.c             |
| 504  | PG_PID_CONFIG                    | pidConfig_t                  | 4          | src/main/flight/pid.c                |
| 505  | PG_STATUS_LED_CONFIG             | statusLedConfig_t            | 0          | src/main/drivers/light_led.c         |
| 506  | PG_FLASH_CONFIG                  | flashConfig_t                | 0          | src/main/pg/flash.c                  |
| 507  | PG_PPM_CONFIG                    | ppmConfig_t                  | 0          | src/main/pg/rx_pwm.c                 |
| 508  | PG_PWM_CONFIG                    | pwmConfig_t                  | 0          | src/main/pg/rx_pwm.c                 |
| 509  | PG_SERIAL_PIN_CONFIG             | serialPinConfig_t            | 0          | src/main/drivers/serial_pinconfig.c  |
| 510  | PG_ADC_CONFIG                    | adcConfig_t                  | 0          | src/main/pg/adc.c                    |
| 511  | PG_SDCARD_CONFIG                 | sdcardConfig_t               | 2          | src/main/pg/sdcard.c                 |
| 512  | PG_DISPLAY_PORT_MSP_CONFIG       | displayPortProfile_t         | 1          | src/main/pg/displayport_profiles.c   |
| 513  | PG_DISPLAY_PORT_MAX7456_CONFIG   | displayPortProfile_t         | 0          | src/main/pg/displayport_profiles.c   |
| 514  | PG_VCD_CONFIG                    | vcdProfile_t                 | 0          | src/main/pg/vcd.c                    |
| 515  | PG_VTX_CONFIG                    | vtxConfig_t                  | 1          | src/main/io/vtx_control.c            |
| 516  | PG_SONAR_CONFIG                  | sonarConfig_t                | 1          | src/main/sensors/rangefinder.c       |
| 517  | PG_ESC_SENSOR_CONFIG             | escSensorConfig_t            | 0          | src/main/sensors/esc_sensor.c        |
| 518  | PG_I2C_CONFIG                    | i2cConfig_t                  | 1          | src/main/pg/bus_i2c.c                |
| 519  | PG_DASHBOARD_CONFIG              | dashboardConfig_t            | 0          | src/main/pg/dashboard.c              |
| 520  | PG_SPI_PIN_CONFIG                | spiPinConfig_t               | 1          | src/main/pg/bus_spi.c                |
| 521  | PG_ESCSERIAL_CONFIG              | escSerialConfig_t            | 0          | src/main/drivers/serial_escserial.c  |
| 522  | PG_CAMERA_CONTROL_CONFIG         | cameraControlConfig_t        | 0          | src/main/drivers/camera_control.c    |
| 523  | PG_RX_CC2500_SPI_CONFIG          | rxCc2500SpiConfig_t          | 2          | src/main/pg/rx_spi_cc2500.c          |
| 524  | PG_MAX7456_CONFIG                | max7456Config_t              | 0          | src/main/pg/max7456.c                |
| 525  | PG_FLYSKY_CONFIG                 | flySkyConfig_t               | 1          | src/main/rx/a7105_flysky.c           |
| 526  | PG_TIME_CONFIG                   | timeConfig_t                 | 0          | src/main/common/time.c               |
| 527  | PG_RANGEFINDER_CONFIG            | rangefinderConfig_t          | 0          | src/main/sensors/rangefinder.c       |
| 528  | PG_TRICOPTER_CONFIG              | tricopterMixerConfig_t       | 0          | src/main/flight/mixer_tricopter.c    |
| 529  | PG_PINIO_CONFIG                  | pinioConfig_t                | 0          | src/main/pg/pinio.c                  |
| 530  | PG_PINIOBOX_CONFIG               | pinioBoxConfig_t             | 1          | src/main/pg/piniobox.c               |
| 531  | PG_USB_CONFIG                    | usbDev_t                     | 0          | src/main/pg/usb.c                    |
| 532  | PG_SDIO_CONFIG                   | sdioConfig_t                 | 0          | src/main/pg/sdio.c                   |
| 533  | PG_DISPLAY_PORT_CRSF_CONFIG      | —                            | —          | —                                    |
| 534  | PG_TIMER_IO_CONFIG               | timerIOConfig_t              | 0          | src/main/pg/timerio.c                |
| 535  | PG_SPI_PREINIT_IPU_CONFIG        | —                            | —          | —                                    |
| 536  | PG_SPI_PREINIT_OPU_CONFIG        | —                            | —          | —                                    |
| 537  | PG_RX_SPI_CONFIG                 | rxSpiConfig_t                | 0          | src/main/pg/rx_spi.c                 |
| 538  | PG_BOARD_CONFIG                  | boardConfig_t                | 0          | src/main/pg/board.c                  |
| 539  | PG_RCDEVICE_CONFIG               | rcdeviceConfig_t             | 0          | src/main/pg/rcdevice.c               |
| 540  | PG_GYRO_DEVICE_CONFIG            | gyroDeviceConfig_t           | 1          | src/main/pg/gyrodev.c                |
| 541  | PG_MCO_CONFIG                    | mcoConfig_t                  | 0          | src/main/pg/mco.c                    |
| 542  | PG_RX_SPEKTRUM_SPI_CONFIG        | spektrumConfig_t             | 0          | src/main/rx/cyrf6936_spektrum.c      |
| 543  | PG_SERIAL_UART_CONFIG            | serialUartConfig_t           | 0          | src/main/pg/serial_uart.c            |
| 544  | PG_RPM_FILTER_CONFIG             | rpmFilterConfig_t            | 6          | src/main/pg/rpm_filter.c             |
| 545  | PG_LED_STRIP_STATUS_MODE_CONFIG  | ledStripStatusModeConfig_t   | 0          | src/main/io/ledstrip.c               |
| 546  | PG_VTX_TABLE_CONFIG              | vtxTableConfig_t             | 0          | src/main/pg/vtx_table.c              |
| 547  | PG_STATS_CONFIG                  | statsConfig_t                | 4          | src/main/pg/stats.c                  |
| 548  | PG_QUADSPI_CONFIG                | quadSpiConfig_t              | 1          | src/main/pg/bus_quadspi.c            |
| 549  | PG_TIMER_UP_CONFIG               | timerUpConfig_t              | 0          | src/main/pg/timerup.c                |
| 550  | PG_SDIO_PIN_CONFIG               | sdioPinConfig_t              | 0          | src/main/pg/sdio.c                   |
| 551  | PG_PULLUP_CONFIG                 | pinPullUpDownConfig_t        | 0          | src/main/pg/pin_pull_up_down.c       |
| 552  | PG_PULLDOWN_CONFIG               | pinPullUpDownConfig_t        | 0          | src/main/pg/pin_pull_up_down.c       |
| 553  | PG_MODE_ACTIVATION_CONFIG        | modeActivationConfig_t       | 0          | src/main/fc/rc_modes.c               |
| 554  | PG_DYN_NOTCH_CONFIG              | dynNotchConfig_t             | 1          | src/main/pg/dyn_notch.c              |
| 555  | PG_RX_EXPRESSLRS_SPI_CONFIG      | rxExpressLrsSpiConfig_t      | 0          | src/main/pg/rx_spi_expresslrs.c      |
| 556  | PG_SCHEDULER_CONFIG              | schedulerConfig_t            | 2          | src/main/pg/scheduler.c              |
| 557  | PG_MSP_CONFIG                    | mspConfig_t                  | 0          | src/main/pg/msp.c                    |
| 559  | PG_GIMBAL_TRACK_CONFIG           | gimbalTrackConfig_t          | 0          | src/main/pg/gimbal.c                 |
| 560  | PG_OPTICALFLOW_CONFIG            | opticalflowConfig_t          | 1          | src/main/sensors/opticalflow.c       |
| 561  | PG_BATTERY_PROFILES              | batteryProfile_t             | 1          | src/main/sensors/battery.c           |
| 561  | PG_DISPLAY_PORT_FBOSD_CONFIG     | displayPortProfile_t         | 0          | src/main/pg/displayport_profiles.c   |
| 562  | PG_FLIGHT_PLAN_CONFIG            | flightPlanConfig_t           | 0          | src/main/pg/flight_plan.c            |
| 563  | PG_CAN_PIN_CONFIG                | canPinConfig_t               | 0          | src/main/pg/can.c                    |
| 564  | PG_CAN_CONFIG                    | canConfig_t                  | 0          | src/main/pg/can.c                    |
| 565  | PG_DRONECAN_CONFIG               | dronecanConfig_t             | 0          | src/main/pg/dronecan.c               |
| 2044 | PG_OSD_CUSTOM_TEXT_CONFIG        | osdCustomTextConfig_t        | 0          | src/main/osd/osd_custom_text.c       |
| 2045 | PG_OSD_ELEMENT_CONFIG            | osdElementConfig_t           | 3          | src/main/osd/osd.c                   |
| 2046 | PG_OSD_VIDEO_CONFIG              | —                            | —          | —                                    |
| 2047 | PG_OSD_FONT_CONFIG               | —                            | —          | —                                    |
| 4093 | PG_RESERVED_FOR_TESTING_3        | —                            | —          | —                                    |
| 4094 | PG_RESERVED_FOR_TESTING_2        | —                            | —          | —                                    |
| 4095 | PG_RESERVED_FOR_TESTING_1        | —                            | —          | —                                    |

<!-- PG_TABLE_END -->

## How to Add a New Parameter Group

Follow these steps when adding new persistent configuration to firmware:

### 1. Reserve a PG ID

Add a `#define` to `src/main/pg/pg_ids.h`. Choose a value in the appropriate range:

- `1–255` — legacy Cleanflight/Betaflight core (avoid; range is mostly full)
- `256–499` — Cleanflight v2 specific
- `500–2044` — Betaflight specific (use this range for new groups)
- `2045–4095` — OSD configuration

```c
// In src/main/pg/pg_ids.h
#define PG_MY_NEW_CONFIG  562  // example only — choose an unallocated ID from the table above
```

### 2. Define the Struct

Add the struct type and its default values in your feature's header file:

```c
// In src/main/feature/my_feature.h
typedef struct myNewConfig_s {
    uint8_t  someValue;
    uint16_t anotherValue;
} myNewConfig_t;

PG_DECLARE(myNewConfig_t, myNewConfig)
```

### 3. Register the PG

Register the PG in the corresponding `.c` file using the appropriate macro:

```c
// In src/main/feature/my_feature.c
#include "pg/pg.h"
#include "pg/pg_ids.h"

PG_REGISTER_WITH_RESET_TEMPLATE(myNewConfig_t, myNewConfig, PG_MY_NEW_CONFIG, 0);

static const myNewConfig_t pgResetTemplate_myNewConfig = {
    .someValue    = 42,
    .anotherValue = 1000,
};
```

Use `PG_REGISTER_WITH_RESET_FN` if the defaults require runtime computation:

```c
PG_REGISTER_WITH_RESET_FN(myNewConfig_t, myNewConfig, PG_MY_NEW_CONFIG, 0);

void pgResetFn_myNewConfig(myNewConfig_t *config) {
    config->someValue    = 42;
    config->anotherValue = 1000;
}
```

### 4. Bump the PG Version on Breaking Changes

If you change the struct layout (add, remove, or reorder fields), increment the PG version:

```c
PG_REGISTER_WITH_RESET_TEMPLATE(myNewConfig_t, myNewConfig, PG_MY_NEW_CONFIG, 1);
//                                                                              ^ bumped from 0
```

Betaflight will reset the PG to defaults when the stored version does not match. For backwards-compatible additions (adding fields at the end), version bumping is optional but recommended.

### 5. Add CLI Settings

Expose settings via CLI by adding entries to `src/main/cli/settings.c` using the `LOOKUP_TABLE_ENTRY` / `DEFINE_SETTING` macros. See existing entries in that file for examples.

### Further Reading

See [Parameter Groups](/docs/development/ParameterGroups) for the complete specification and design rules.

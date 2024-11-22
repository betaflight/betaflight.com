# 4.0 CLI Command Line Reference

**For best results use Control F on your keyboard and paste the CLI command in question from your dump into the box that pops up. **

## GET command

Type a "get" and part of a CLI command name (example: "get acc"). The cli will return all CLI commands that have the name part with the current value plus what the valid value range or valid Names.
This is a very handy feature and allows easy to find variable names that can then be copy/pasted from the CLI display to the command line entry box.

## dump

**align_gyro** = DEFAULT
Allowed values: DEFAULT, CW0, CW90, CW180, CW270, CW0FLIP, CW90FLIP, CW180FLIP, CW270FLIP
Used to orient the gyro chip in the direction of flight. (less CPU load than Board orientation)

**gyro_hardware_lpf = NORMAL**
Allowed values: NORMAL, 1KHZ_SAMPLING, EXPERIMENTAL
Gyro Low pass filter setting

**gyro_32khz_hardware_lpf = NORMAL**
Allowed values: NORMAL, EXPERIMENTAL
32K gyro low pass filter setting

**gyro_sync_denom = 1**
Allowed range: 1 - 32
gyro sync denominator used for blackbox. _example_ Gyro_sync_denom = 8 means blackbox records 1/8th of the gyro data.

**gyro_lowpass_type = BIQUAD**
Allowed values: PT1, BIQUAD

**gyro_lowpass_hz = 150**
Allowed range: 0 - 16000

**gyro_lowpass2_type = PT1**
Allowed values: PT1, BIQUAD

**gyro_lowpass2_hz = 0**
Allowed range: 0 - 16000

**gyro_notch1_hz = 0**
Allowed range: 0 - 16000

**gyro_notch1_cutoff = 0**
Allowed range: 0 - 16000

**gyro_notch2_hz = 0**
Allowed range: 0 - 16000

**gyro_notch2_cutoff = 0**
Allowed range: 0 - 16000

**gyro_calib_duration = 125**
Allowed range: 50 - 3000

**gyro_calib_noise_limit = 48**
Allowed range: 0 - 200

**gyro_overflow_detect = ALL**
Allowed values: OFF, YAW, ALL
Axis where gyro overflow detection applies
Gyro_overflow_detect is special code intended to deal with overflow issues on ICM gyros. The default is to be on, for all axes. It is unwise to disable this if your quad has an ICM gyro. It is not needed or helpful for MPU gyros.

ICM gyros are susceptible to overflow-inversion problems if exposed to very high turn rates. If enabled and set to ALL, overflow protection will kick in and disable all PIDs whenever any axis exceeds 1950 degrees/second.

**yaw_spin_recovery = ON**
Allowed values: OFF, ON
Yaw-Spin-Recovery-and-Gyro-Overflow-Detect
This new feature, enabled by default in betaflight 3.4, reduces the severity and duration of un-commanded severe yaw spins.
For example, if a quadcopter clips a gate, tree, branch or other object and causes a high rate yaw spin, it may go into a 'never-ending' uncontrollable spin.
Typically it makes a distinctive warbling noise and climbs rapidly - the so-called Yaw Spin To The Moon (YSTTM) problem. 3.4 introduces two code features that should bring such spins under control more quickly and cleanly.
Yaw Spin Recovery is intended primarily for FPV pilots, and works best with MPU gyros.
LOS acro pilots who use high yaw rates may prefer to disable this function.

**yaw_spin_threshold = 1950**
Allowed range: 500 - 1950
The 'threshold' value is the spin rate, in degrees per second, at which the spin protection kicks in.
The default threshold of 1950 was chosen to minimise false triggering. For FPV, a lower value, e.g. 100-200 above your maximum configured yaw rate, is recommended.
For example, a quad with a maximum configured yaw rate of 700 degrees/sec:
Too low a threshold may cause false triggering, and delay return to normal control.

**gyro_use_32khz = OFF**
Allowed values: OFF, ON

**gyro_to_use = FIRST**
Allowed values: FIRST, SECOND, BOTH

**dyn_notch_range = AUTO**
Allowed values: HIGH, MEDIUM, LOW, AUTO

**dyn_notch_width_percent = 8**
Allowed range: 0 - 20

**dyn_notch_q = 120**
Allowed range: 1 - 1000

**dyn_notch_min_hz = 150**
Allowed range: 1 - 1000

**dyn_lpf_gyro_min_hz = 150**
Allowed range: 0 - 1000

**dyn_lpf_gyro_max_hz = 450**
Allowed range: 0 - 1000

**align_acc = DEFAULT**
Allowed values: DEFAULT, CW0, CW90, CW180, CW270, CW0FLIP, CW90FLIP, CW180FLIP, CW270FLIP

**acc_hardware = AUTO**
Allowed values: AUTO, NONE, ADXL345, MPU6050, MMA8452, BMA280, LSM303DLHC, MPU6000, MPU6500, MPU9250, ICM20601, ICM20602, ICM20608G, ICM20649, ICM20689, BMI160, FAKE

**acc_lpf_hz = 10**
Allowed range: 0 - 400

**acc_trim_pitch = 0**
Allowed range: -300 - 300

**acc_trim_roll = 0**
Allowed range: -300 - 300

**acc_calibration = 0,0,0**
Array length: 3

**mid_rc = 1500**
Allowed range: 1200 - 1700

**min_check = 1050**
Allowed range: 750 - 2250

**max_check = 1900**
Allowed range: 750 - 2250

**rssi_channel = 0**
Allowed range: 0 - 18

**rssi_src_frame_errors = OFF**
Allowed values: OFF, ON

**rssi_scale = 100**
Allowed range: 1 - 255

**rssi_invert = OFF**
Allowed values: OFF, ON

**rc_interp = AUTO**
Allowed values: OFF, PRESET, AUTO, MANUAL

**rc_interp_ch = RPYT**
Allowed values: RP, RPY, RPYT, T, RPT

**rc_interp_int = 19**
Allowed range: 1 - 50

**rc_interp_ch = RPYT**
Allowed values: RP, RPY, RPYT, T, RPT

**rc_interp_int = 19**
Allowed range: 1 - 50

**rc_smoothing_type = FILTER**
Allowed values: INTERPOLATION, FILTER
[see 3.4 tuning notes](/docs/wiki/tuning/older/3-4-tuning-notes)

**rc_smoothing_input_hz = 0**
Allowed range: 0 - 255
Spektrum-and-RC-Smoothing-Filter

**rc_smoothing_derivative_hz = 0**
Allowed range: 0 - 255
Spektrum-and-RC-Smoothing-Filter

**rc_smoothing_debug_axis = ROLL**
Allowed values: ROLL, PITCH, YAW, THROTTLE

**rc_smoothing_input_type = BIQUAD**
Allowed values: PT1, BIQUAD

**rc_smoothing_derivative_type = BIQUAD**
Allowed values: OFF, PT1, BIQUAD

**rc_smoothing_auto_smoothness = 10**
Allowed range: 0 - 50

**fpv_mix_degrees = 0**
Allowed range: 0 - 90

**max_aux_channels = 14**
Allowed range: 0 - 14

**serialrx_provider = SPEK1024**
Allowed values: SPEK1024, SPEK2048, SBUS, SUMD, SUMH, XB-B, XB-B-RJ01, IBUS, JETIEXBUS, CRSF, SRXL, CUSTOM, FPORT

**serialrx_inverted = OFF**
Allowed values: OFF, ON

**spektrum_sat_bind = 0**
Allowed range: 0 - 10

**spektrum_sat_bind_autoreset = ON**
Allowed values: OFF, ON

**airmode_start_throttle_percent = 32**
Allowed range: 0 - 100
This keeps AirMode OFF until the first time throttle reaches this value. AirMode is always on after this. Note that 3D users have to reconfigure their threshold to something else otherwise airmode would be always enabled.

**x_min_usec = 885**
Allowed range: 750 - 2250

**rx_max_usec = 2115**
Allowed range: 750 - 2250

**serialrx_halfduplex = OFF**
Allowed values: OFF, ON

**adc_device = 1**
Allowed range: 0 - 3

**adc_vrefint_calibration = 0**
Allowed range: 0 - 2000

**adc_tempsensor_calibration30 = 0**
Allowed range: 0 - 2000

**adc_tempsensor_calibration110 = 0**
Allowed range: 0 - 2000

**input_filtering_mode = OFF**
Allowed values: OFF, ON

**blackbox_p_ratio = 32**
Allowed range: 0 - 32767

**blackbox_device = SDCARD**
Allowed values: NONE, SPIFLASH, SDCARD, SERIAL

**blackbox_record_acc = ON**
Allowed values: OFF, ON

**blackbox_mode = NORMAL**
Allowed values: NORMAL, MOTOR_TEST, ALWAYS

**min_throttle = 1070**
Allowed range: 750 - 2250

**pid_at_min_throttle = ON**
profile 0
Allowed values: OFF, ON
pid_at_min_throttle enables the copter to continue process the PID algorithm even at minimum throttle. But pid_at_min_throttle only keeps P and D active, I is zero’ed

**max_throttle = 2000**
Allowed range: 750 - 2250

**min_command = 1000**
Allowed range: 750 - 2250

**dshot_idle_value = 550**
Allowed range: 0 - 2000

**dshot_burst = OFF**
Allowed values: OFF, ON
[details](/docs/wiki/guides/current/DSHOT-RPM-Filtering#dma)

**use_unsynced_pwm = OFF**
Allowed values: OFF, ON

**motor_pwm_protocol = ONESHOT125**
Allowed values: OFF, ONESHOT125, ONESHOT42, MULTISHOT, BRUSHED, DSHOT150, DSHOT300, DSHOT600, DSHOT1200, PROSHOT1000

**motor_pwm_rate = 480**
Allowed range: 200 - 32000

**motor_pwm_inversion = OFF**
Allowed values: OFF, ON

**motor_poles = 14**
Allowed range: 4 - 255
The escs report erpm which needs to be converted to rpm using the number of poles (magnets) of the motors. Regular 5" motors have 14 poles and that's the default setting. Smaller motors have less poles, often 12. Count them or look up the motor specs
[details](/docs/wiki/guides/current/DSHOT-RPM-Filtering)

**thr_corr_value = 0**
Allowed range: 0 - 150

**thr_corr_angle = 800**
Allowed range: 1 - 900

**failsafe_delay = 4**
Allowed range: 0 - 200

**failsafe_throttle = 1000**
Allowed range: 750 - 2250

**failsafe_throttle_low_delay = 100**
Allowed range: 0 - 300

**failsafe_switch_mode = STAGE1**
Allowed values: STAGE1, KILL, STAGE2

**failsafe_throttle_low_delay = 100**
Allowed range: 0 - 300

**failsafe_procedure = DROP**
Allowed values: AUTO-LAND, DROP, GPS-RESCUE

**align_board_roll = 0**
Allowed range: -180 - 360

**align_board_pitch = 0**
Allowed range: -180 - 360

**align_board_yaw = 0**
Allowed range: -180 - 360

**gimbal_mode = NORMAL**
Allowed values: NORMAL, MIXTILT

**bat_capacity = 0**
Allowed range: 0 - 20000

**vbat_max_cell_voltage = 430**
Allowed range: 100 - 500

**vbat_full_cell_voltage = 410**
Allowed range: 100 - 500

**vbat_min_cell_voltage = 330**
Allowed range: 100 - 500

**vbat_warning_cell_voltage = 350**
Allowed range: 100 - 500

**vbat_hysteresis = 1**
Allowed range: 0 - 250

**current_meter = ADC**
Allowed values: NONE, ADC, VIRTUAL, ESC, MSP

**battery_meter = ADC**
Allowed values: NONE, ADC, ESC

**vbat_detect_cell_voltage = 300**
Allowed range: 0 - 2000

**use_vbat_alerts = ON**
Allowed values: OFF, ON

**use_cbat_alerts = OFF**
Allowed values: OFF, ON

**cbat_alert_percent = 10**
Allowed range: 0 - 100

**force_battery_cell_count = 0**
Allowed range: 0 - 24

**vbat_scale = 110**
Allowed range: 0 - 255

**vbat_divider = 10**
Allowed range: 1 - 255

**vbat_multiplier = 1**
Allowed range: 1 - 255

**ibata_scale = 250**
Allowed range: -16000 - 16000

_**ibata_set **_

**ibatv_scale = 0**
Allowed range: -16000 - 16000

_**ibatv_set **_

**beeper_inversion = ON**
Allowed values: OFF, ON

**beeper_od = OFF**
Allowed values: OFF, ON

**beeper_frequency = 3800**
Allowed range: 0 - 16000

**beeper_dshot_beacon_tone = 1**
Allowed range: 1 - 5

**yaw_motors_reversed = OFF**
Allowed values: OFF, ON

**crashflip_motor_percent = 0**
Allowed range: 0 - 100

**3d_deadband_low = 1406**
Allowed range: 750 - 1500

**3d_deadband_high = 1514**
Allowed range: 1500 - 2250

**3d_neutral = 1460**
Allowed range: 750 - 2250

**3d_deadband_throttle = 50**
Allowed range: 1 - 100

**3d_limit_low = 1000**
Allowed range: 750 - 1500

**3d_limit_high = 2000**
Allowed range: 1500 - 2250

**3d_switched_mode = OFF**
Allowed values: OFF, ON

**servo_center_pulse = 1500**
Allowed range: 750 - 2250

**servo_pwm_rate = 50**
Allowed range: 50 - 498

**servo_lowpass_hz = 0**
Allowed range: 0 - 400

**tri_unarmed_servo = ON**
Allowed values: OFF, ON

**channel_forwarding_start = 4**
Allowed range: 4 - 18

**reboot_character = 82**
Allowed range: 48 - 126

**serial_update_rate_hz = 100**
Allowed range: 100 - 2000

**imu_dcm_kp = 2500**
Allowed range: 0 - 32000

**imu_dcm_ki = 0**
Allowed range: 0 - 32000

**small_angle = 25**
Allowed range: 0 - 180

**auto_disarm_delay = 5**
Allowed range: 0 - 60

**gyro_cal_on_first_arm = OFF**
Allowed values: OFF, ON

**gps_provider = NMEA**
Allowed values: NMEA, UBLOX, MSP

**gps_sbas_mode = AUTO**
Allowed values: AUTO, EGNOS, WAAS, MSAS, GAGAN

**gps_auto_config = ON**
Allowed values: OFF, ON

**gps_auto_baud = OFF**
Allowed values: OFF, ON

**gps_ublox_use_galileo = OFF**
Allowed values: OFF, ON

**gps_rescue_angle = 32**
Allowed range: 0 - 200
GPS-rescue-mode

**gps_rescue_initial_alt = 50**
Allowed range: 20 - 100

**gps_rescue_descent_dist = 200**
Allowed range: 30 - 500

**gps_rescue_ground_speed = 2000**
Allowed range: 30 - 3000

**gps_rescue_throttle_p = 150**
Allowed range: 0 - 500

**gps_rescue_throttle_i = 20**
Allowed range: 0 - 500

**gps_rescue_throttle_d = 50**
Allowed range: 0 - 500

**gps_rescue_velocity_p = 80**
Allowed range: 0 - 500

**gps_rescue_velocity_i = 20**
Allowed range: 0 - 500

**gps_rescue_velocity_d = 15**
Allowed range: 0 - 500

**gps_rescue_yaw_p = 40**
Allowed range: 0 - 500

**gps_rescue_throttle_min = 1200**
Allowed range: 1000 - 2000

**gps_rescue_throttle_max = 1600**
Allowed range: 1000 - 2000

**gps_rescue_throttle_hover = 1280**
Allowed range: 1000 - 2000

**gps_rescue_sanity_checks = RESCUE_SANITY_ON**
Allowed values: RESCUE_SANITY_OFF, RESCUE_SANITY_ON, RESCUE_SANITY_FS_ONLY

**gps_rescue_min_sats = 8**
Allowed range: 0 - 50

**gps_rescue_min_dth = 100**
Allowed range: 50 - 1000

**3d_deadband_low = 1406**
Allowed range: 750 - 1500

**3d_deadband_high = 1514**
Allowed range: 1500 - 2250

**3d_deadband_throttle = 50**
Allowed range: 1 - 100

**deadband = 0**
Allowed range: 0 - 32

**yaw_deadband = 0**
Allowed range: 0 - 100

**yaw_deadband = 0**
Allowed range: 0 - 100

**yaw_control_reversed = OFF**
Allowed values: OFF, ON

**pid_process_denom = 4**
Allowed range: 1 - 16

**runaway_takeoff_prevention**

Runaway-Takeoff-Prevention
Set this to OFF to completely disable the feature. Note that there will be no protection against runaway takeoff events and the firmware will behave as it did before the feature was implemented.

The remaining parameters affect the logic used to detect normal controlled flight and deactivate the feature for the remainder of the battery:

**runaway_takeoff_deactivate_delay**

This is the amount of successful flight time in milliseconds that must be accumulated to deactivate the feature. Valid values range from 100 (0.1 seconds) to 1000 (1 second). The default value of 500 (0.5 seconds) seems to be very reliable and shouldn't need to be adjusted. The goal is to deactivate the logic after a "reasonable" but short period of time once we've determined the craft is flying normally. However we want it to deactivate before we might reach the first point where a crash or other event may occur (like at the first gate during a race). Raising this value will delay the deactivation and it's possible that a crash or gate/branch clip could cause an unintended disarm. Lowering this value too much could result in the logic deactivating too soon and not providing protection in a runaway event. It's important to note that the delay is the accumulated amount of flight time where the other criteria like throttle level, stick activity, etc. are met. Thus the "real" elapsed time before deactivation may be longer than 0.5 seconds if the throttle was dropping below the limit or if the R/P/Y sticks were centered. The actual behavior can be viewed by using blackbox logging - see the debugging section below.

**runaway_takeoff_deactivate_throttle_percent**

Determines the minimum throttle percentage threshold where successful flight can be considered. Valid values range from 0 to 100. Along with throttle level the logic also requires activity on the roll, pitch or yaw sticks along with the PID controller successfully controlling the craft with the PID_sum staying under control. When these conditions are met the logic accumulates successful flight time. Generally you won't need to adjust this value as most quads require around 25% or more throttle to takeoff/hover. The exception may be if you have and extremely powerful or light craft that is capable of flying well below 25% throttle. In this case you may want to lower this value closer to your actual hover throttle percent. If this value is set too low it's possible that the logic will deactivate too quickly and may not trigger in a real runaway event. Setting it too high will result in the logic taking more flight time to deactivate as it only accumulates flight time when the throttle is above the setting.

**tlm_inverted = OFF**
Allowed values: OFF, ON

**tlm_halfduplex = ON**
Allowed values: OFF, ON

**frsky_default_lat = 0**
Allowed range: -9000 - 9000

**frsky_default_long = 0**
Allowed range: -18000 - 18000

**frsky_gps_format = 0**
Allowed range: 0 - 1

**frsky_unit = IMPERIAL**
Allowed values: IMPERIAL, METRIC

**frsky_vfas_precision = 0**
Allowed range: 0 - 1

**hott_alarm_int = 5**
Allowed range: 0 - 120

**pid_in_tlm = OFF**
Allowed values: OFF, ON

**report_cell_voltage = OFF**
Allowed values: OFF, ON

**ibus_sensor = 1,2,3,0,0,0,0,0,0,0,0,0,0,0,0**
Array length: 15

**mavlink_mah_as_heading_divisor = 0**
Allowed range: 0 - 30000

**ledstrip_visual_beeper = OFF**
Allowed values: OFF, ON
When set to on, and the LEDLOW mode is active (i.e. LED strip off), blink the LED strip in synch with beeping, as a visual indicator in cases where the craft is too far away for the beeper to be heard / multiple craft are flying.

**ledstrip_grb_rgb = GRB**
Allowed values: GRB, RGB
For more info see the [ledstrip development page](/docs/development/LedStrip#ws2811-vs-ws2812)

**sdcard_detect_inverted = OFF**
Allowed values: OFF, ON

**sdcard_mode = SPI**
Allowed values: OFF, SPI, SDIO

**sdcard_dma = OFF**
Allowed values: OFF, ON

**sdcard_spi_bus = 2**
Allowed range: 0 - 3

**osd_units = METRIC**
Allowed values: IMPERIAL, METRIC

**osd_warn_arming_disable = ON**
Allowed values: OFF, ON

**osd_warn_batt_not_full = ON**
Allowed values: OFF, ON

**osd_profile = 1**
Allowed range: 1 - 3

**system_hse_mhz = 8**
Allowed range: 0 - 30

**task_statistics = ON**
Allowed values: OFF, ON

**debug_mode = NONE**
Allowed values: NONE, CYCLETIME, BATTERY, GYRO_FILTERED, ACCELEROMETER, PIDLOOP, GYRO_SCALED, RC_INTERPOLATION, ANGLERATE, ESC_SENSOR, SCHEDULER, STACK, ESC_SENSOR_RPM, ESC_SENSOR_TMP, ALTITUDE, FFT, FFT_TIME, FFT_FREQ, RX_FRSKY_SPI, RX_SFHSS_SPI, GYRO_RAW, DUAL_GYRO, DUAL_GYRO_RAW, DUAL_GYRO_COMBINE, DUAL_GYRO_DIFF, MAX7456_SIGNAL, MAX7456_SPICLOCK, SBUS, FPORT, RANGEFINDER, RANGEFINDER_QUALITY, LIDAR_TF, ADC_INTERNAL, RUNAWAY_TAKEOFF, SDIO, CURRENT_SENSOR, USB, SMARTAUDIO, RTH, ITERM_RELAX, ACRO_TRAINER, RC_SMOOTHING, RX_SIGNAL_LOSS, RC_SMOOTHING_RATE, ANTI_GRAVITY, DYN_LPF, RX_SPEKTRUM_SPI

**rate_6pos_switch = OFF**
Allowed values: OFF, ON

**cpu_overclock = OFF**
Allowed values: OFF, 192MHZ, 216MHZ, 240MHZ

**pwr_on_arm_grace = 5**
Allowed range: 0 - 30

**vtx_band = 4**
Allowed range: 0 - 5
0=user, 1=A, 2=B, 3=E, 4=F(Airwaves/Fatshark), 5=Raceband

**vtx_channel = 1**
Allowed range: 1 - 8
VTX-CLI-Settings

**vtx_power = 1**
Allowed range: 0 - 4
for SmartAudio: 0=25mW, 1=25mW, 2=200mW, 3=500mW, 4=800mW
for TBS Unify Nano: 0=25mW, 1=25mW, 2=50mW
for IRC-Tramp: 0=25mW, 1=25mW, 2=100mW, 3=200mW, 4=400mW, 5=600mW

**vtx_low_power_disarm = OFF**
Allowed values: OFF, ON, UNTIL_FIRST_ARM
If ON and the flight controller is disarmed, the video transmitter output power will be set to its lowest value (vtx_power=1). Otherwise, the video transmitter output power will be set to the configured 'vtx_power' value. (Note one exception: If a receiver failsafe has occurred then the output power will not be lowered.)

**vtx_freq = 5740**
Allowed range: 0 - 5999
if vtx_band!=0 and VTX connected then shows freq in MHz
if vtx_band==0 then sets frequency in MHz
if vtx_band==0 and vtx_freq==0 then the settings will not be sent out to the VTX
For example, to configure the VTX to use band 'F' and channel '6' (5840 MHz), enter the CLI and input:
set vtx_band = 4
set vtx_channel = 6
save
The VTX configuration will not be changed until after the 'save' and restart. If it is successful then entering 'get vtx_freq' will show the current frequency value in MHz.

Frequency table:
Channel
1 2 3 4 5 6 7 8
Band 1: 5865 5845 5825 5805 5785 5765 5745 5725 (A: Boscam A / TBS / RC305)
Band 2: 5733 5752 5771 5790 5809 5828 5847 5866 (B: Boscam B)
Band 3: 5705 5685 5665 5645 5885 5905 5925 5945 (E: Boscam E / DJI)
Band 4: 5740 5760 5780 5800 5820 5840 5860 5880 (F: IRC NexWave / Fatshark)
Band 5: 5658 5695 5732 5769 5806 5843 5880 5917 (R: Raceband)

**vtx_pit_mode_freq = 0**
Allowed range: 0 - 5999

**vtx_halfduplex = ON**
Allowed values: OFF, ON

**vcd_video_system = AUTO**
Allowed values: AUTO, PAL, NTSC

**max7456_clock = DEFAULT**
Allowed values: HALF, DEFAULT, FULL

**max7456_spi_bus = 3**
Allowed range: 0 - 3

**max7456_preinit_opu = OFF**
Allowed values: OFF, ON

**displayport_msp_col_adjust = 0**
Allowed range: -6 - 0

**displayport_msp_row_adjust = 0**
Allowed range: -3 - 0

**displayport_max7456_col_adjust = 0**
Allowed range: -6 - 0

**displayport_max7456_row_adjust = 0**
Allowed range: -3 - 0

**displayport_max7456_inv = OFF**
Allowed values: OFF, ON

**displayport_max7456_blk = 0**
Allowed range: 0 - 3

**displayport_max7456_wht = 2**
Allowed range: 0 - 3

**esc_sensor_halfduplex = OFF**
Allowed values: OFF, ON

**led_inversion = 0**
Allowed range: 0 - 7

**camera_control_mode = HARDWARE_PWM**
Allowed values: HARDWARE_PWM, SOFTWARE_PWM, DAC
mode of operation, software_pwm is the least restrictive in terms of available PIN selection, but it requires both a resistor and a capacitor to work properly; hardware_pwm is almost guaranteed to work with just a resistor given you can spare a timer for it; dac (not yet implemented) is supported on the very few FCs that have a DAC pin broken out and unoccupied by other functions, it works by direct connection to the camera.
[Camera Control](/docs/wiki/guides/current/FPV-Camera-Control-Joystick-Emulation)

**camera_control_ref_voltage = 330**
Allowed range: 200 - 400
voltage (in 10 mV steps) measured across your camera's floating OSD and GND pins, usually 3V3, but not guaranteed, e.g. my RunCam Sky has 3V4, and some cameras have reportedly have as low as 3V1.

**camera_control_key_delay = 180**
Allowed range: 100 - 500
the duration of each key press (in ms presence at the camera_control pin, after consulting with RunCam it was set to 180 ms to accommodate most cameras, while some of them accept as low as 125 ms.

**camera_control_internal_resistance = 470**
Allowed range: 10 - 1000
the internal resistance (in 100 Ω steps) of your camera, most HS1177 derivatives have 47 kΩ, but that's not guaranteed. You'll have to derive this value for your camera in case the default one doesn't work.

**camera_control_inverted = OFF**
Allowed values: OFF, ON

**pinio_config = 1,1,1,1**
Array length: 4
Pinio-and-PinioBox

**pinio_box = 255,255,255,255**
Array length: 4

**usb_hid_cdc = OFF**
Allowed values: OFF, ON
HID joystick support is currently only available on F4 / F7 boards.

**usb_msc_pin_pullup = ON**
Allowed values: OFF, ON

**flash_spi_bus = 3**
Allowed range: 0 - 3

**rcdevice_init_dev_attempts = 6**
Allowed range: 0 - 10

**rcdevice_init_dev_attempt_interval = 1000**
Allowed range: 0 - 327680500

**gyro_1_bustype = SPI**
Allowed values: NONE, I2C, SPI, SLAVE

**gyro_1_spibus = 1**
Allowed range: 0 - 3

**gyro_1_i2cBus = 0**
Allowed range: 0 - 3

**gyro_1_i2c_address = 0**
Allowed range: 0 - 119

**gyro_1_sensor_align = CW0**
Allowed values: DEFAULT, CW0, CW90, CW180, CW270, CW0FLIP, CW90FLIP, CW180FLIP, CW270FLIP

**gyro_2_bustype = SPI**
Allowed values: NONE, I2C, SPI, SLAVE

**gyro_2_spibus = 1**
Allowed range: 0 - 3

**gyro_2_i2cBus = 0**
Allowed range: 0 - 3

**gyro_2_i2c_address = 0**
Allowed range: 0 - 119

**gyro_2_sensor_align = DEFAULT**
Allowed values: DEFAULT, CW0, CW90, CW180, CW270, CW0FLIP, CW90FLIP, CW180FLIP, CW270FLIP

_timezone_offset_minutes = 0_

**dyn_lpf_dterm_min_hz = 150**
profile 0
Allowed range: 0 - 1000

**dyn_lpf_dterm_max_hz = 250**
profile 0
Allowed range: 0 - 1000

**dterm_lowpass_type = BIQUAD**
profile 0
Allowed values: PT1, BIQUAD

**dterm_lowpass_hz = 150**
profile 0
Allowed range: 0 - 16000

**dterm_lowpass2_type = BIQUAD**
profile 0
Allowed values: PT1, BIQUAD

**dterm_lowpass2_hz = 150**
profile 0
Allowed range: 0 - 16000

**dterm_notch_hz = 0**
profile 0
Allowed range: 0 - 16000

**dterm_notch_cutoff = 0**
profile 0
Allowed range: 0 - 16000

**vbat_pid_gain = OFF**
profile 0
Allowed values: OFF, ON

**pid_at_min_throttle = ON**
profile 0
Allowed values: OFF, ON

**anti_gravity_mode = SMOOTH**
profile 0
Allowed values: SMOOTH, STEP

**anti_gravity_threshold = 250**
profile 0
Allowed range: 20 - 1000

**anti_gravity_gain = 5000**
profile 0
Allowed range: 1000 - 30000

**feedforward_transition = 0**
profile 0
Allowed range: 0 - 100

**acc_limit_yaw = 0**
profile 0
Allowed range: 0 - 500

**acc_limit_yaw = 0**
profile 0
Allowed range: 0 - 500

**acc_limit = 0**
profile 0
Allowed range: 0 - 500

**crash_dthreshold = 50**
profile 0
Allowed range: 0 - 2000

**crash_gthreshold = 400**
profile 0
Allowed range: 0 - 2000

**crash_setpoint_threshold = 350**
profile 0
Allowed range: 0 - 2000

**crash_time = 500**
profile 0
Allowed range: 0 - 5000

**crash_delay = 0**
profile 0
Allowed range: 0 - 500

**crash_recovery_angle = 10**
profile 0
Allowed range: 0 - 30

**crash_recovery_rate = 100**
profile 0
Allowed range: 0 - 255

**crash_limit_yaw = 200**
profile 0
Allowed range: 0 - 1000

**crash_recovery_angle = 10**
profile 0
Allowed range: 0 - 30

**crash_recovery_rate = 100**
profile 0
Allowed range: 0 - 255

**crash_recovery = OFF**
profile 0
Allowed values: OFF, ON, BEEP

**iterm_rotation = ON**
profile 0
Allowed values: OFF, ON

**smart_feedforward = OFF**
profile 0
Allowed values: OFF, ON

**iterm_relax = RP**
profile 0
Allowed values: OFF, RP, RPY, RP_INC, RPY_INC

**iterm_relax_type = SETPOINT**
profile 0
Allowed values: GYRO, SETPOINT

**iterm_relax_cutoff = 20**
profile 0
Allowed range: 1 - 100

**iterm_relax_type = SETPOINT**
profile 0
Allowed values: GYRO, SETPOINT

**iterm_relax_cutoff = 20**
profile 0
Allowed range: 1 - 100

**iterm_windup = 100**
profile 0
Allowed range: 30 - 100

**iterm_limit = 400**
profile 0
Allowed range: 0 - 500

**pidsum_limit = 500**
profile 0
Allowed range: 100 - 1000

**pidsum_limit_yaw = 400**
profile 0
Allowed range: 100 - 1000

**pidsum_limit_yaw = 400**
profile 0
Allowed range: 100 - 1000

**yaw_lowpass_hz = 0**
profile 0
Allowed range: 0 - 500

**throttle_boost = 5**
profile 0
Allowed range: 0 - 100

**throttle_boost_cutoff = 15**
profile 0
Allowed range: 5 - 50

**throttle_boost_cutoff = 15**
profile 0
Allowed range: 5 - 50

**acro_trainer_angle_limit = 20**
profile 0
Allowed range: 10 - 80

**acro_trainer_lookahead_ms = 50**
profile 0
Allowed range: 10 - 200

**acro_trainer_debug_axis = ROLL**
profile 0
Allowed values: ROLL, PITCH

**acro_trainer_gain = 75**
profile 0
Allowed range: 25 - 255

**p_pitch = 50**
profile 0
Allowed range: 0 - 200

**i_pitch = 75**
profile 0
Allowed range: 0 - 200

**align_board_pitch = 0**
Allowed range: -180 - 360

**d_pitch = 32**
profile 0
Allowed range: 0 - 200

**f_pitch = 60**
profile 0
Allowed range: 0 - 2000

**p_roll = 46**
profile 0
Allowed range: 0 - 200

**i_roll = 65**
profile 0
Allowed range: 0 - 200

**align_board_roll = 0**
Allowed range: -180 - 360

**d_roll = 30**
profile 0
Allowed range: 0 - 200

**f_roll = 60**
profile 0
Allowed range: 0 - 2000

**p_yaw = 45**
profile 0
Allowed range: 0 - 200

**i_yaw = 100**
profile 0
Allowed range: 0 - 200

**align_board_yaw = 0**
Allowed range: -180 - 360

**d_yaw = 0**
profile 0
Allowed range: 0 - 200

**use_integrated_yaw = OFF**
profile 0
Allowed values: OFF, ON

**integrated_yaw_relax = 200**
profile 0
Allowed range: 0 - 255

**f_yaw = 100**
profile 0
Allowed range: 0 - 2000

**_angle_level_strength = 50_**
profile 0
Allowed range: 0 - 200

**horizon_level_strength = 50**
profile 0
Allowed range: 0 - 200

**horizon_transition = 75**
profile 0
Allowed range: 0 - 200

**level_limit = 55**
profile 0
Allowed range: 10 - 90

**horizon_tilt_effect = 75**
profile 0
Allowed range: 0 - 250

**horizon_tilt_expert_mode = OFF**
profile 0
Allowed values: OFF, ON

**abs_control_gain = 0**
profile 0
Allowed range: 0 - 20

**abs_control_limit = 90**
profile 0
Allowed range: 10 - 255

**abs_control_error_limit = 20**
profile 0
Allowed range: 1 - 45

**abs_control_cutoff = 11**
profile 0
Allowed range: 1 - 45

**use_integrated_yaw = OFF**
profile 0
Allowed values: OFF, ON

**integrated_yaw_relax = 200**
profile 0
Allowed range: 0 - 255

**launch_control_mode = NORMAL**
profile 0
Allowed values: NORMAL, PITCHONLY, FULL
Launch-Control

**launch_trigger_allow_reset = ON**
profile 0
Allowed values: OFF, ON

**launch_trigger_throttle_percent = 20**
profile 0
Allowed range: 0 - 90

**launch_angle_limit = 0**
profile 0
Allowed range: 0 - 80

**launch_control_gain = 40**
profile 0
Allowed range: 0 - 200

**thr_mid = 50**
rateprofile 0
Allowed range: 0 - 100

**thr_expo = 0**
rateprofile 0
Allowed range: 0 - 100

**rates_type = BETAFLIGHT**
rateprofile 0
Allowed values: BETAFLIGHT, RACEFLIGHT
Allowed range: 0 - 100

**tpa_breakpoint = 1500**
rateprofile 0
Allowed range: 750 - 2250

**tpa_mode = D**
rateprofile 0
Allowed values: PD, D

**throttle_limit_type = OFF**
rateprofile 0
Allowed values: OFF, SCALE, CLIP

**throttle_limit_percent = 100**
rateprofile 0
Allowed range: 25 - 100

**roll_rate_limit = 1998**
rateprofile 0
Allowed range: 200 - 1998

**pitch_rate_limit = 1998**
rateprofile 0
Allowed range: 200 - 1998

**yaw_rate_limit = 1998**
rateprofile 0
Allowed range: 200 - 1998

_\*telemetry_disabled_voltage = OFF_

_Through_

_\*telemetry_disabled_temperature = OFF_

_\*gps_ublox_use_galileo = OFF_

_\*gps_set_home_point_once = OFF_

_\*gps_rescue_allow_arming_without_fix = OFF_

_\*gps_rescue_use_mag = ON_

_\*thrust_linear = 0_

https://github.com/betaflight/betaflight/pull/7304

_\*scheduler_optimize_rate = OFF_

_\*dterm_cut_percent = 65_

d_cut

_\*dterm_cut_gain = 15_

_\*dterm_cut_range_hz = 40_

_\*dterm_cut_lowpass_hz = 7_

_\*integrated_yaw_relax = 200_

_\*use_integrated_yaw = OFF_

_\*gyro_rpm_notch_q = 500_

_\*gyro_rpm_notch_min = 100_

_\*dterm_rpm_notch_harmonics = 1_

_\*dterm_rpm_notch_q = 500_

_\*dterm_rpm_notch_min = 100_

_\*gyro_rpm_notch_harmonics_

_\*airmode_noise_reduction_

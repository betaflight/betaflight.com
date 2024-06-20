# 4.5 CLI Command Line Reference

**For best results, in your web browser, use Ctrl-F to find CLI command in question.**

## HELP Command

Betaflight CLI displays useful commands when the `help` command is entered.

```
# help

adjrange - configure adjustment ranges
    <index> <unused> <range channel> <start> <end> <function> <select channel> [<center> <scale>]
aux - configure modes
    <index> <mode> <aux> <start> <end> <logic>
batch - start or end a batch of commands
    start | end
beacon - enable/disable Dshot beacon for a condition
    list
    <->[name]
beeper - enable/disable beeper for a condition
    list
    <->[name]
bind_rx - initiate binding for RX SPI, SRXL2 or CRSF
bl - reboot into bootloader
    [rom]
board_name - get / set the name of the board model
    [board name]
color - configure colors
defaults - reset to defaults and reboot
    {nosave}
diff - list configuration changes from default
    [master|profile|rates|hardware|all] {defaults|bare}
dma - show/set DMA assignments
    <> | <device> <index> list | <device> <index> [<option>|none] | list | show
dshot_telemetry_info - display dshot telemetry info and stats
dshotprog - program DShot ESC(s)
    <index> <command>+
dump - dump configuration
    [master|profile|rates|hardware|all] {defaults|bare}
escprog - passthrough esc to serial
    <mode [sk/bl/ki/cc]> <index>
exit
feature - configure features
    list
    <->[name]
flash_erase - erase flash chip
flash_info - show flash chip info
flash_read
    <length> <address>
flash_scan - scan flash device for errors
flash_write
    <address> <message>
get - get variable value
    [name]
gpspassthrough - passthrough gps to serial
gyroregisters - dump gyro config registers contents
help - display command help
    [search string]
led - configure leds
manufacturer_id - get / set the id of the board manufacturer
    [manufacturer id]
map - configure rc channel order
    [<map>]
mcu_id - id of the microcontroller
mixer - configure mixer
    list
    <name>
mmix - custom motor mixer
mode_color - configure mode and special colors
motor - get/set motor
    <index> [<value>]
msc - switch into msc mode
    [<timezone offset minutes>]
play_sound
    [<index>]
profile - change profile
    [<index>]
rateprofile - change rate profile
    [<index>]
rc_smoothing_info - show rc_smoothing operational settings
resource - show/set resources
    <> | <resource name> <index> [<pin>|none] | show [all]
rxfail - show/set rx failsafe settings
rxrange - configure rx channel ranges
save - save and reboot
serial - configure serial ports
serialpassthrough - passthrough serial data data from port 1 to VCP / port 2
    <id1> [<baud1>] [<mode1>] [none|<dtr pinio>|reset] [<id2>] [<baud2>] [<mode2>]
servo - configure servos
set - change setting
    [<name>=<value>]
signature - get / set the board type signature
    [signature]
simplified_tuning - applies or disables simplified tuning
    apply | disable
smix - servo mixer
    <rule> <servo> <source> <rate> <speed> <min> <max> <box>
    reset
    load <mixer>
    reverse <servo> <source> r|n
status - show status
tasks - show task stats
timer - show/set timers
    <> | <pin> list | <pin> [af<alternate function>|none|<option(deprecated)>] | list | show
version - show version
vtx - vtx channels on switch
    <index> <aux_channel> <vtx_band> <vtx_channel> <vtx_power> <start_range> <end_range>
vtx_info - vtx power config dump
vtxtable - vtx frequency table
    <band> <bandname> <bandletter> [FACTORY|CUSTOM] <freq> ... <freq>
```

## GET and SET Commands

Type a `get` and part of a CLI parameter name (example: `get acc`). The CLI will return all commands that have the name part with the current value plus what the valid value range or valid Names. This is a very handy feature and allows easy to find variable names that can then be copy/pasted from the CLI display to the command line entry box.

Type `set` along with parameter names and values configure your settings. Be sure to enter a `save` command.

Example:

```
set dyn_notch_min_hz = 150
save
```

## Betaflight 4.5 CLI Parameters

```
# get

gyro_hardware_lpf = NORMAL
Allowed values: NORMAL, OPTION_1, OPTION_2, EXPERIMENTAL

gyro_lpf1_type = PT1
Allowed values: PT1, BIQUAD, PT2, PT3

gyro_lpf1_static_hz = 250
Allowed range: 0 - 1000

gyro_lpf2_type = PT1
Allowed values: PT1, BIQUAD, PT2, PT3

gyro_lpf2_static_hz = 500
Allowed range: 0 - 1000

gyro_notch1_hz = 0
Allowed range: 0 - 1000

gyro_notch1_cutoff = 0
Allowed range: 0 - 1000

gyro_notch2_hz = 0
Allowed range: 0 - 1000

gyro_notch2_cutoff = 0
Allowed range: 0 - 1000

gyro_calib_duration = 125
Allowed range: 50 - 3000

gyro_calib_noise_limit = 48
Allowed range: 0 - 200

gyro_offset_yaw = 0
Allowed range: -1000 - 1000

gyro_overflow_detect = ALL
Allowed values: OFF, YAW, ALL

yaw_spin_recovery = AUTO
Allowed values: OFF, ON, AUTO

yaw_spin_threshold = 1950
Allowed range: 500 - 1950

gyro_to_use = FIRST
Allowed values: FIRST, SECOND, BOTH

dyn_notch_count = 3
Allowed range: 0 - 5

dyn_notch_q = 300
Allowed range: 1 - 1000

dyn_notch_min_hz = 100
Allowed range: 20 - 250

dyn_notch_max_hz = 600
Allowed range: 200 - 1000

gyro_lpf1_dyn_min_hz = 250
Allowed range: 0 - 1000

gyro_lpf1_dyn_max_hz = 500
Allowed range: 0 - 1000

gyro_lpf1_dyn_expo = 5
Allowed range: 0 - 10

gyro_filter_debug_axis = ROLL
Allowed values: ROLL, PITCH, YAW

acc_hardware = AUTO
Allowed values: AUTO, NONE, ADXL345, MPU6050, MMA8452, BMA280, LSM303DLHC, MPU6000,
 MPU6500, MPU9250, ICM20601, ICM20602, ICM20608G, ICM20649, ICM20689, ICM42605, ICM42688P,
 BMI160, BMI270, LSM6DSO, LSM6DSV16X, VIRTUAL

acc_lpf_hz = 25
Allowed range: 0 - 500

acc_trim_pitch = 0
Allowed range: -300 - 300

acc_trim_roll = 0
Allowed range: -300 - 300

acc_calibration = 0,0,0,0
Array length: 4

mid_rc = 1500
Allowed range: 1200 - 1700

min_check = 1050
Allowed range: 750 - 2250

max_check = 1900
Allowed range: 750 - 2250

rssi_channel = 0
Allowed range: 0 - 18

rssi_src_frame_errors = OFF
Allowed values: OFF, ON

rssi_scale = 100
Allowed range: 1 - 255

rssi_offset = 0
Allowed range: -100 - 100

rssi_invert = OFF
Allowed values: OFF, ON

rssi_src_frame_lpf_period = 30
Allowed range: 0 - 255

rssi_smoothing = 125
Allowed range: 0 - 255

rc_smoothing = ON
Allowed values: OFF, ON

rc_smoothing_auto_factor = 30
Allowed range: 0 - 250

rc_smoothing_auto_factor_throttle = 30
Allowed range: 0 - 250

rc_smoothing_setpoint_cutoff = 0
Allowed range: 0 - 255

rc_smoothing_feedforward_cutoff = 0
Allowed range: 0 - 255

rc_smoothing_throttle_cutoff = 0
Allowed range: 0 - 255

rc_smoothing_debug_axis = ROLL
Allowed values: ROLL, PITCH, YAW, THROTTLE

fpv_mix_degrees = 0
Allowed range: 0 - 90

max_aux_channels = 14
Allowed range: 0 - 14

serialrx_provider = CRSF
Allowed values: NONE, SPEK2048, SBUS, SUMD, SUMH, XB-B, XB-B-RJ01, IBUS, JETIEXBUS, CRSF, SRXL,
 CUSTOM, FPORT, SRXL2, GHST, SPEK1024

serialrx_inverted = OFF
Allowed values: OFF, ON

spektrum_sat_bind = 0
Allowed range: 0 - 10

spektrum_sat_bind_autoreset = ON
Allowed values: OFF, ON

srxl2_unit_id = 1
Allowed range: 0 - 15

srxl2_baud_fast = ON
Allowed values: OFF, ON

sbus_baud_fast = OFF
Allowed values: OFF, ON

crsf_use_negotiated_baud = OFF
Allowed values: OFF, ON

airmode_start_throttle_percent = 25
Allowed range: 0 - 100

rx_min_usec = 885
Allowed range: 750 - 2250

rx_max_usec = 2115
Allowed range: 750 - 2250

serialrx_halfduplex = OFF
Allowed values: OFF, ON

msp_override_channels_mask = 0
Allowed range: 0 - 262143

msp_override_failsafe = OFF
Allowed values: OFF, ON

adc_device = 1
Allowed range: 0 - 3

adc_vrefint_calibration = 0
Allowed range: 0 - 2000

adc_tempsensor_calibration30 = 0
Allowed range: 0 - 2000

adc_tempsensor_calibration110 = 0
Allowed range: 0 - 2000

input_filtering_mode = OFF
Allowed values: OFF, ON

blackbox_sample_rate = 1/4
Allowed values: 1/1, 1/2, 1/4, 1/8, 1/16

blackbox_device = SPIFLASH
Allowed values: NONE, SPIFLASH, SDCARD, SERIAL

blackbox_disable_pids = OFF
Allowed values: OFF, ON

blackbox_disable_rc = OFF
Allowed values: OFF, ON

blackbox_disable_setpoint = OFF
Allowed values: OFF, ON

blackbox_disable_bat = OFF
Allowed values: OFF, ON

blackbox_disable_alt = OFF
Allowed values: OFF, ON

blackbox_disable_rssi = OFF
Allowed values: OFF, ON

blackbox_disable_gyro = OFF
Allowed values: OFF, ON

blackbox_disable_gyrounfilt = OFF
Allowed values: OFF, ON

blackbox_disable_acc = OFF
Allowed values: OFF, ON

blackbox_disable_debug = OFF
Allowed values: OFF, ON

blackbox_disable_motors = OFF
Allowed values: OFF, ON

blackbox_disable_rpm = OFF
Allowed values: OFF, ON

blackbox_disable_gps = OFF
Allowed values: OFF, ON

blackbox_mode = NORMAL
Allowed values: NORMAL, MOTOR_TEST, ALWAYS

blackbox_high_resolution = OFF
Allowed values: OFF, ON

min_throttle = 1070
Allowed range: 750 - 2250

max_throttle = 2000
Allowed range: 750 - 2250

min_command = 1000
Allowed range: 750 - 2250

motor_kv = 1960
Allowed range: 1 - 40000

dshot_idle_value = 550
Allowed range: 0 - 2000

dshot_burst = ON
Allowed values: OFF, ON, AUTO

dshot_bidir = OFF
Allowed values: OFF, ON

dshot_edt = OFF
Allowed values: OFF, ON

dshot_bitbang = AUTO
Allowed values: OFF, ON, AUTO

dshot_bitbang_timer = AUTO
Allowed values: AUTO, TIM1, TIM8

use_unsynced_pwm = OFF
Allowed values: OFF, ON

motor_pwm_protocol = DSHOT600
Allowed values: PWM, ONESHOT125, ONESHOT42, MULTISHOT, BRUSHED, DSHOT150, DSHOT300, DSHOT600, PROSHOT1000, DISABLED

motor_pwm_rate = 480
Allowed range: 200 - 32000

motor_pwm_inversion = OFF
Allowed values: OFF, ON

motor_poles = 14
Allowed range: 4 - 255

motor_output_reordering = 0,1,2,3,4,5,6,7
Array length: 8

thr_corr_value = 0
Allowed range: 0 - 150

thr_corr_angle = 800
Allowed range: 1 - 900

failsafe_delay = 15
Allowed range: 1 - 200

failsafe_off_delay = 10
Allowed range: 0 - 200

failsafe_throttle = 1000
Allowed range: 750 - 2250

failsafe_switch_mode = STAGE1
Allowed values: STAGE1, KILL, STAGE2

failsafe_throttle_low_delay = 100
Allowed range: 0 - 300

failsafe_procedure = DROP
Allowed values: AUTO-LAND, DROP, GPS-RESCUE

failsafe_recovery_delay = 5
Allowed range: 1 - 200

failsafe_stick_threshold = 30
Allowed range: 0 - 50

align_board_roll = 0
Allowed range: -180 - 360

align_board_pitch = 0
Allowed range: -180 - 360

align_board_yaw = 0
Allowed range: -180 - 360

gimbal_mode = NORMAL
Allowed values: NORMAL, MIXTILT

bat_capacity = 0
Allowed range: 0 - 20000

vbat_max_cell_voltage = 430
Allowed range: 100 - 500

vbat_full_cell_voltage = 410
Allowed range: 100 - 500

vbat_min_cell_voltage = 330
Allowed range: 100 - 500

vbat_warning_cell_voltage = 350
Allowed range: 100 - 500

vbat_hysteresis = 1
Allowed range: 0 - 250

current_meter = ADC
Allowed values: NONE, ADC, VIRTUAL, ESC, MSP

battery_meter = ADC
Allowed values: NONE, ADC, ESC

vbat_detect_cell_voltage = 300
Allowed range: 0 - 2000

use_vbat_alerts = ON
Allowed values: OFF, ON

use_cbat_alerts = OFF
Allowed values: OFF, ON

cbat_alert_percent = 10
Allowed range: 0 - 100

vbat_cutoff_percent = 100
Allowed range: 0 - 100

force_battery_cell_count = 0
Allowed range: 0 - 24

vbat_display_lpf_period = 30
Allowed range: 1 - 255

vbat_sag_lpf_period = 2
Allowed range: 1 - 255

ibat_lpf_period = 10
Allowed range: 0 - 255

vbat_duration_for_warning = 0
Allowed range: 0 - 150

vbat_duration_for_critical = 0
Allowed range: 0 - 150

vbat_scale = 110
Allowed range: 0 - 255

vbat_divider = 10
Allowed range: 1 - 255

vbat_multiplier = 1
Allowed range: 1 - 255

ibata_scale = 166
Allowed range: -16000 - 16000

ibata_offset = 0
Allowed range: -32000 - 32000

ibatv_scale = 0
Allowed range: -16000 - 16000

ibatv_offset = 0
Allowed range: 0 - 16000

battery_continue = OFF
Allowed values: OFF, ON

beeper_inversion = ON
Allowed values: OFF, ON

beeper_od = OFF
Allowed values: OFF, ON

beeper_frequency = 0
Allowed range: 0 - 16000

beeper_dshot_beacon_tone = 1
Allowed range: 1 - 5

yaw_motors_reversed = OFF
Allowed values: OFF, ON

mixer_type = LEGACY
Allowed values: LEGACY, LINEAR, DYNAMIC, EZLANDING

crashflip_motor_percent = 0
Allowed range: 0 - 100

crashflip_expo = 35
Allowed range: 0 - 100

rpm_limit = OFF
Allowed values: OFF, ON

rpm_limit_p = 25
Allowed range: 0 - 100

rpm_limit_i = 10
Allowed range: 0 - 1000

rpm_limit_d = 8
Allowed range: 0 - 100

rpm_limit_value = 18000
Allowed range: 1 - 65535

3d_deadband_low = 1406
Allowed range: 750 - 1500

3d_deadband_high = 1514
Allowed range: 1500 - 2250

3d_neutral = 1460
Allowed range: 750 - 2250

3d_deadband_throttle = 50
Allowed range: 1 - 100

3d_limit_low = 1000
Allowed range: 750 - 1500

3d_limit_high = 2000
Allowed range: 1500 - 2250

3d_switched_mode = OFF
Allowed values: OFF, ON

servo_center_pulse = 1500
Allowed range: 750 - 2250

servo_pwm_rate = 50
Allowed range: 50 - 498

servo_lowpass_hz = 0
Allowed range: 0 - 400

tri_unarmed_servo = ON
Allowed values: OFF, ON

channel_forwarding_start = 4
Allowed range: 4 - 18

rateprofile_name = -
rateprofile 0
String length: 1 - 8

thr_mid = 50
rateprofile 0
Allowed range: 0 - 100

thr_expo = 0
rateprofile 0
Allowed range: 0 - 100

rates_type = ACTUAL
rateprofile 0
Allowed values: BETAFLIGHT, RACEFLIGHT, KISS, ACTUAL, QUICK

quickrates_rc_expo = OFF
rateprofile 0
Allowed values: OFF, ON

roll_rc_rate = 7
rateprofile 0
Allowed range: 1 - 255

pitch_rc_rate = 7
rateprofile 0
Allowed range: 1 - 255

yaw_rc_rate = 7
rateprofile 0
Allowed range: 1 - 255

roll_expo = 0
rateprofile 0
Allowed range: 0 - 100

pitch_expo = 0
rateprofile 0
Allowed range: 0 - 100

yaw_expo = 0
rateprofile 0
Allowed range: 0 - 100

roll_srate = 67
rateprofile 0
Allowed range: 0 - 255

pitch_srate = 67
rateprofile 0
Allowed range: 0 - 255

yaw_srate = 67
rateprofile 0
Allowed range: 0 - 255

throttle_limit_type = OFF
rateprofile 0
Allowed values: OFF, SCALE, CLIP

throttle_limit_percent = 100
rateprofile 0
Allowed range: 25 - 100

roll_rate_limit = 1998
rateprofile 0
Allowed range: 200 - 1998

pitch_rate_limit = 1998
rateprofile 0
Allowed range: 200 - 1998

yaw_rate_limit = 1998
rateprofile 0
Allowed range: 200 - 1998

reboot_character = 82
Allowed range: 48 - 126

serial_update_rate_hz = 100
Allowed range: 100 - 2000

imu_dcm_kp = 2500
Allowed range: 0 - 32000

imu_dcm_ki = 0
Allowed range: 0 - 32000

small_angle = 25
Allowed range: 0 - 180

imu_process_denom = 2
Allowed range: 1 - 4

auto_disarm_delay = 5
Allowed range: 0 - 60

gyro_cal_on_first_arm = OFF
Allowed values: OFF, ON

gps_provider = UBLOX
Allowed values: NMEA, UBLOX, MSP

gps_sbas_mode = NONE
Allowed values: AUTO, EGNOS, WAAS, MSAS, GAGAN, NONE

gps_auto_config = ON
Allowed values: OFF, ON

gps_auto_baud = OFF
Allowed values: OFF, ON

gps_ublox_acquire_model = STATIONARY
Allowed values: PORTABLE, STATIONARY, PEDESTRIAN, AUTOMOTIVE, AT_SEA, AIRBORNE_1G, AIRBORNE_2G, AIRBORNE_4G

gps_ublox_flight_model = AIRBORNE_4G
Allowed values: PORTABLE, STATIONARY, PEDESTRIAN, AUTOMOTIVE, AT_SEA, AIRBORNE_1G, AIRBORNE_2G, AIRBORNE_4G

gps_update_rate_hz = 10
Allowed range: 1 - 20

gps_ublox_utc_standard = AUTO
Allowed values: AUTO, USNO, EU, SU, NTSC

gps_ublox_use_galileo = OFF
Allowed values: OFF, ON

gps_set_home_point_once = OFF
Allowed values: OFF, ON

gps_use_3d_speed = OFF
Allowed values: OFF, ON

gps_sbas_integrity = OFF
Allowed values: OFF, ON

gps_nmea_custom_commands = -
String length: 1 - 64

gps_rescue_min_start_dist = 15
Allowed range: 10 - 30

gps_rescue_alt_mode = MAX_ALT
Allowed values: MAX_ALT, FIXED_ALT, CURRENT_ALT

gps_rescue_initial_climb = 10
Allowed range: 0 - 100

gps_rescue_ascend_rate = 750
Allowed range: 50 - 2500

gps_rescue_return_alt = 30
Allowed range: 5 - 1000

gps_rescue_ground_speed = 750
Allowed range: 0 - 3000

gps_rescue_max_angle = 45
Allowed range: 30 - 60

gps_rescue_roll_mix = 150
Allowed range: 0 - 250

gps_rescue_pitch_cutoff = 75
Allowed range: 10 - 255

gps_rescue_imu_yaw_gain = 10
Allowed range: 5 - 20

gps_rescue_descent_dist = 20
Allowed range: 10 - 500

gps_rescue_descend_rate = 150
Allowed range: 25 - 500

gps_rescue_landing_alt = 4
Allowed range: 1 - 15

gps_rescue_disarm_threshold = 20
Allowed range: 1 - 250

gps_rescue_throttle_min = 1100
Allowed range: 1000 - 2000

gps_rescue_throttle_max = 1700
Allowed range: 1000 - 2000

gps_rescue_throttle_hover = 1275
Allowed range: 1000 - 2000

gps_rescue_sanity_checks = RESCUE_SANITY_FS_ONLY
Allowed values: RESCUE_SANITY_OFF, RESCUE_SANITY_ON, RESCUE_SANITY_FS_ONLY

gps_rescue_min_sats = 8
Allowed range: 5 - 50

gps_rescue_allow_arming_without_fix = OFF
Allowed values: OFF, ON

gps_rescue_throttle_p = 15
Allowed range: 0 - 255

gps_rescue_throttle_i = 15
Allowed range: 0 - 255

gps_rescue_throttle_d = 20
Allowed range: 0 - 255

gps_rescue_velocity_p = 8
Allowed range: 0 - 255

gps_rescue_velocity_i = 40
Allowed range: 0 - 255

gps_rescue_velocity_d = 12
Allowed range: 0 - 255

gps_rescue_yaw_p = 20
Allowed range: 0 - 255

deadband = 0
Allowed range: 0 - 32

yaw_deadband = 0
Allowed range: 0 - 100

yaw_control_reversed = OFF
Allowed values: OFF, ON

pid_process_denom = 1
Allowed range: 1 - 16

runaway_takeoff_prevention = ON
Allowed values: OFF, ON

runaway_takeoff_deactivate_delay = 500
Allowed range: 100 - 1000

runaway_takeoff_deactivate_throttle_percent = 20
Allowed range: 0 - 100

profile_name = -
profile 0
String length: 1 - 8

dterm_lpf1_dyn_min_hz = 75
profile 0
Allowed range: 0 - 1000

dterm_lpf1_dyn_max_hz = 150
profile 0
Allowed range: 0 - 1000

dterm_lpf1_dyn_expo = 5
profile 0
Allowed range: 0 - 10

dterm_lpf1_type = PT1
profile 0
Allowed values: PT1, BIQUAD, PT2, PT3

dterm_lpf1_static_hz = 75
profile 0
Allowed range: 0 - 1000

dterm_lpf2_type = PT1
profile 0
Allowed values: PT1, BIQUAD, PT2, PT3

dterm_lpf2_static_hz = 150
profile 0
Allowed range: 0 - 1000

dterm_notch_hz = 0
profile 0
Allowed range: 0 - 1000

dterm_notch_cutoff = 0
profile 0
Allowed range: 0 - 1000

vbat_sag_compensation = 0
profile 0
Allowed range: 0 - 150

pid_at_min_throttle = ON
profile 0
Allowed values: OFF, ON

anti_gravity_gain = 80
profile 0
Allowed range: 0 - 250

anti_gravity_cutoff_hz = 5
profile 0
Allowed range: 2 - 50

anti_gravity_p_gain = 100
profile 0
Allowed range: 0 - 250

acc_limit_yaw = 0
profile 0
Allowed range: 0 - 500

acc_limit = 0
profile 0
Allowed range: 0 - 500

crash_dthreshold = 50
profile 0
Allowed range: 10 - 2000

crash_gthreshold = 400
profile 0
Allowed range: 100 - 2000

crash_setpoint_threshold = 350
profile 0
Allowed range: 50 - 2000

crash_time = 500
profile 0
Allowed range: 100 - 5000

crash_delay = 0
profile 0
Allowed range: 0 - 500

crash_recovery_angle = 10
profile 0
Allowed range: 5 - 30

crash_recovery_rate = 100
profile 0
Allowed range: 50 - 255

crash_limit_yaw = 200
profile 0
Allowed range: 0 - 1000

crash_recovery = OFF
profile 0
Allowed values: OFF, ON, BEEP, DISARM

iterm_rotation = OFF
profile 0
Allowed values: OFF, ON

iterm_relax = RP
profile 0
Allowed values: OFF, RP, RPY, RP_INC, RPY_INC

iterm_relax_type = SETPOINT
profile 0
Allowed values: GYRO, SETPOINT

iterm_relax_cutoff = 15
profile 0
Allowed range: 1 - 50

iterm_windup = 85
profile 0
Allowed range: 30 - 100

iterm_limit = 400
profile 0
Allowed range: 0 - 500

pidsum_limit = 500
profile 0
Allowed range: 100 - 1000

pidsum_limit_yaw = 400
profile 0
Allowed range: 100 - 1000

yaw_lowpass_hz = 100
profile 0
Allowed range: 0 - 500

throttle_boost = 5
profile 0
Allowed range: 0 - 100

throttle_boost_cutoff = 15
profile 0
Allowed range: 5 - 50

p_pitch = 47
profile 0
Allowed range: 0 - 250

i_pitch = 84
profile 0
Allowed range: 0 - 250

d_pitch = 46
profile 0
Allowed range: 0 - 250

f_pitch = 125
profile 0
Allowed range: 0 - 1000

p_roll = 45
profile 0
Allowed range: 0 - 250

i_roll = 80
profile 0
Allowed range: 0 - 250

d_roll = 40
profile 0
Allowed range: 0 - 250

f_roll = 120
profile 0
Allowed range: 0 - 1000

p_yaw = 45
profile 0
Allowed range: 0 - 250

i_yaw = 80
profile 0
Allowed range: 0 - 250

d_yaw = 0
profile 0
Allowed range: 0 - 250

f_yaw = 120
profile 0
Allowed range: 0 - 1000

angle_p_gain = 50
profile 0
Allowed range: 0 - 200

angle_feedforward = 50
profile 0
Allowed range: 0 - 200

angle_feedforward_smoothing_ms = 80
profile 0
Allowed range: 10 - 250

angle_limit = 60
profile 0
Allowed range: 10 - 85

angle_earth_ref = 100
profile 0
Allowed range: 0 - 100

horizon_level_strength = 75
profile 0
Allowed range: 0 - 100

horizon_limit_sticks = 75
profile 0
Allowed range: 10 - 200

horizon_limit_degrees = 135
profile 0
Allowed range: 10 - 250

horizon_ignore_sticks = OFF
profile 0
Allowed values: OFF, ON

horizon_delay_ms = 500
profile 0
Allowed range: 10 - 5000

abs_control_gain = 0
profile 0
Allowed range: 0 - 20

abs_control_limit = 90
profile 0
Allowed range: 10 - 255

abs_control_error_limit = 20
profile 0
Allowed range: 1 - 45

abs_control_cutoff = 11
profile 0
Allowed range: 1 - 45

use_integrated_yaw = OFF
profile 0
Allowed values: OFF, ON

integrated_yaw_relax = 200
profile 0
Allowed range: 0 - 255

d_min_roll = 30
profile 0
Allowed range: 0 - 250

d_min_pitch = 34
profile 0
Allowed range: 0 - 250

d_min_yaw = 0
profile 0
Allowed range: 0 - 250

d_max_gain = 37
profile 0
Allowed range: 0 - 100

d_max_advance = 20
profile 0
Allowed range: 0 - 200

motor_output_limit = 100
profile 0
Allowed range: 1 - 100

auto_profile_cell_count = 0
profile 0
Allowed range: -1 - 8

launch_control_mode = NORMAL
profile 0
Allowed values: NORMAL, PITCHONLY, FULL

launch_trigger_allow_reset = ON
profile 0
Allowed values: OFF, ON

launch_trigger_throttle_percent = 20
profile 0
Allowed range: 0 - 90

launch_angle_limit = 0
profile 0
Allowed range: 0 - 80

launch_control_gain = 40
profile 0
Allowed range: 0 - 200

thrust_linear = 0
profile 0
Allowed range: 0 - 150

transient_throttle_limit = 0
profile 0
Allowed range: 0 - 30

feedforward_transition = 0
profile 0
Allowed range: 0 - 100

feedforward_averaging = OFF
profile 0
Allowed values: OFF, 2_POINT, 3_POINT, 4_POINT

feedforward_smooth_factor = 25
profile 0
Allowed range: 0 - 95

feedforward_jitter_factor = 7
profile 0
Allowed range: 0 - 20

feedforward_boost = 15
profile 0
Allowed range: 0 - 50

feedforward_max_rate_limit = 90
profile 0
Allowed range: 0 - 200

dyn_idle_min_rpm = 0
profile 0
Allowed range: 0 - 200

dyn_idle_p_gain = 50
profile 0
Allowed range: 1 - 250

dyn_idle_i_gain = 50
profile 0
Allowed range: 1 - 250

dyn_idle_d_gain = 50
profile 0
Allowed range: 0 - 250

dyn_idle_max_increase = 150
profile 0
Allowed range: 10 - 255

dyn_idle_start_increase = 50
profile 0
Allowed range: 10 - 255

level_race_mode = OFF
profile 0
Allowed values: OFF, ON

simplified_pids_mode = RPY
profile 0
Allowed values: OFF, RP, RPY

simplified_master_multiplier = 100
profile 0
Allowed range: 0 - 200

simplified_i_gain = 100
profile 0
Allowed range: 0 - 200

simplified_d_gain = 100
profile 0
Allowed range: 0 - 200

simplified_pi_gain = 100
profile 0
Allowed range: 0 - 200

simplified_dmax_gain = 100
profile 0
Allowed range: 0 - 200

simplified_feedforward_gain = 100
profile 0
Allowed range: 0 - 200

simplified_pitch_d_gain = 100
profile 0
Allowed range: 0 - 200

simplified_pitch_pi_gain = 100
profile 0
Allowed range: 0 - 200

simplified_dterm_filter = ON
profile 0
Allowed values: OFF, ON

simplified_dterm_filter_multiplier = 100
profile 0
Allowed range: 10 - 200

simplified_gyro_filter = ON
Allowed values: OFF, ON

simplified_gyro_filter_multiplier = 100
Allowed range: 10 - 200

tpa_mode = D
profile 0
Allowed values: PD, D

tpa_rate = 65
profile 0
Allowed range: 0 - 100

tpa_breakpoint = 1350
profile 0
Allowed range: 1000 - 2000

tpa_low_rate = 20
profile 0
Allowed range: 0 - 100

tpa_low_breakpoint = 1050
profile 0
Allowed range: 1000 - 2000

tpa_low_always = OFF
profile 0
Allowed values: OFF, ON

ez_landing_threshold = 25
profile 0
Allowed range: 0 - 200

ez_landing_limit = 15
profile 0
Allowed range: 0 - 75

ez_landing_speed = 50
profile 0
Allowed range: 0 - 250

tlm_inverted = OFF
Allowed values: OFF, ON

tlm_halfduplex = ON
Allowed values: OFF, ON

frsky_default_lat = 0
Allowed range: -9000 - 9000

frsky_default_long = 0
Allowed range: -18000 - 18000

frsky_gps_format = 0
Allowed range: 0 - 1

frsky_unit = METRIC
Allowed values: IMPERIAL, METRIC, BRITISH

frsky_vfas_precision = 0
Allowed range: 0 - 1

hott_alarm_int = 5
Allowed range: 0 - 120

pid_in_tlm = OFF
Allowed values: OFF, ON

report_cell_voltage = OFF
Allowed values: OFF, ON

ibus_sensor = 1,2,3,0,0,0,0,0,0,0,0,0,0,0,0
Array length: 15

mavlink_mah_as_heading_divisor = 0
Allowed range: 0 - 30000

telemetry_disabled_voltage = OFF
Allowed values: OFF, ON

telemetry_disabled_current = OFF
Allowed values: OFF, ON

telemetry_disabled_fuel = OFF
Allowed values: OFF, ON

telemetry_disabled_mode = OFF
Allowed values: OFF, ON

telemetry_disabled_acc_x = OFF
Allowed values: OFF, ON

telemetry_disabled_acc_y = OFF
Allowed values: OFF, ON

telemetry_disabled_acc_z = OFF
Allowed values: OFF, ON

telemetry_disabled_pitch = OFF
Allowed values: OFF, ON

telemetry_disabled_roll = OFF
Allowed values: OFF, ON

telemetry_disabled_heading = OFF
Allowed values: OFF, ON

telemetry_disabled_altitude = OFF
Allowed values: OFF, ON

telemetry_disabled_vario = OFF
Allowed values: OFF, ON

telemetry_disabled_lat_long = OFF
Allowed values: OFF, ON

telemetry_disabled_ground_speed = OFF
Allowed values: OFF, ON

telemetry_disabled_distance = OFF
Allowed values: OFF, ON

telemetry_disabled_esc_current = ON
Allowed values: OFF, ON

telemetry_disabled_esc_voltage = ON
Allowed values: OFF, ON

telemetry_disabled_esc_rpm = ON
Allowed values: OFF, ON

telemetry_disabled_esc_temperature = ON
Allowed values: OFF, ON

telemetry_disabled_temperature = OFF
Allowed values: OFF, ON

telemetry_disabled_cap_used = ON
Allowed values: OFF, ON

ledstrip_visual_beeper = OFF
Allowed values: OFF, ON

ledstrip_visual_beeper_color = WHITE
Allowed values: BLACK, WHITE, RED, ORANGE, YELLOW, LIME_GREEN, GREEN, MINT_GREEN, CYAN, LIGHT_BLUE, BLUE, DARK_VIOLET, MAGENTA, DEEP_PINK

ledstrip_grb_rgb = GRB
Allowed values: GRB, RGB, GRBW

ledstrip_profile = STATUS
Allowed values: RACE, BEACON, STATUS

ledstrip_race_color = ORANGE
Allowed values: BLACK, WHITE, RED, ORANGE, YELLOW, LIME_GREEN, GREEN, MINT_GREEN, CYAN, LIGHT_BLUE, BLUE, DARK_VIOLET, MAGENTA, DEEP_PINK

ledstrip_beacon_color = WHITE
Allowed values: BLACK, WHITE, RED, ORANGE, YELLOW, LIME_GREEN, GREEN, MINT_GREEN, CYAN, LIGHT_BLUE, BLUE, DARK_VIOLET, MAGENTA, DEEP_PINK

ledstrip_beacon_period_ms = 500
Allowed range: 50 - 10000

ledstrip_beacon_percent = 50
Allowed range: 0 - 100

ledstrip_beacon_armed_only = OFF
Allowed values: OFF, ON

ledstrip_brightness = 100
Allowed range: 5 - 100

ledstrip_rainbow_delta = 0
Allowed range: 0 - 359

ledstrip_rainbow_freq = 120
Allowed range: 1 - 2000

osd_units = METRIC
Allowed values: IMPERIAL, METRIC, BRITISH

osd_warn_bitmask = 270335
Allowed range: 0 - 4294967295

osd_rssi_alarm = 20
Allowed range: 0 - 100

osd_link_quality_alarm = 80
Allowed range: 0 - 100

osd_rssi_dbm_alarm = -60
Allowed range: -130 - 0

osd_rsnr_alarm = 4
Allowed range: -30 - 20

osd_cap_alarm = 2200
Allowed range: 0 - 20000

osd_alt_alarm = 100
Allowed range: 0 - 10000

osd_distance_alarm = 0
Allowed range: 0 - 65535

osd_esc_temp_alarm = 0
Allowed range: 0 - 255

osd_esc_rpm_alarm = -1
Allowed range: -1 - 32767

osd_esc_current_alarm = -1
Allowed range: -1 - 32767

osd_core_temp_alarm = 70
Allowed range: 0 - 255

osd_ah_max_pit = 20
Allowed range: 0 - 90

osd_ah_max_rol = 40
Allowed range: 0 - 90

osd_ah_invert = OFF
Allowed values: OFF, ON

osd_logo_on_arming = OFF
Allowed values: OFF, ON, FIRST_ARMING

osd_logo_on_arming_duration = 5
Allowed range: 5 - 50

osd_use_quick_menu = ON
Allowed values: OFF, ON

osd_show_spec_prearm = OFF
Allowed values: OFF, ON

osd_tim1 = 2560
Allowed range: 0 - 32767

osd_tim2 = 2561
Allowed range: 0 - 32767

osd_vbat_pos = 341
Allowed range: 0 - 65535

osd_rssi_pos = 341
Allowed range: 0 - 65535

osd_link_quality_pos = 341
Allowed range: 0 - 65535

osd_link_tx_power_pos = 341
Allowed range: 0 - 65535

osd_rssi_dbm_pos = 341
Allowed range: 0 - 65535

osd_rsnr_pos = 341
Allowed range: 0 - 65535

osd_tim_1_pos = 341
Allowed range: 0 - 65535

osd_tim_2_pos = 341
Allowed range: 0 - 65535

osd_remaining_time_estimate_pos = 341
Allowed range: 0 - 65535

osd_flymode_pos = 341
Allowed range: 0 - 65535

osd_anti_gravity_pos = 341
Allowed range: 0 - 65535

osd_g_force_pos = 341
Allowed range: 0 - 65535

osd_throttle_pos = 341
Allowed range: 0 - 65535

osd_vtx_channel_pos = 341
Allowed range: 0 - 65535

osd_crosshairs_pos = 312
Allowed range: 0 - 65535

osd_ah_sbar_pos = 313
Allowed range: 0 - 65535

osd_ah_pos = 185
Allowed range: 0 - 65535

osd_current_pos = 341
Allowed range: 0 - 65535

osd_mah_drawn_pos = 341
Allowed range: 0 - 65535

osd_wh_drawn_pos = 341
Allowed range: 0 - 65535

osd_motor_diag_pos = 341
Allowed range: 0 - 65535

osd_craft_name_pos = 341
Allowed range: 0 - 65535

osd_pilot_name_pos = 341
Allowed range: 0 - 65535

osd_gps_speed_pos = 341
Allowed range: 0 - 65535

osd_gps_lon_pos = 341
Allowed range: 0 - 65535

osd_gps_lat_pos = 341
Allowed range: 0 - 65535

osd_gps_sats_pos = 341
Allowed range: 0 - 65535

osd_home_dir_pos = 341
Allowed range: 0 - 65535

osd_home_dist_pos = 341
Allowed range: 0 - 65535

osd_flight_dist_pos = 341
Allowed range: 0 - 65535

osd_compass_bar_pos = 341
Allowed range: 0 - 65535

osd_altitude_pos = 341
Allowed range: 0 - 65535

osd_pid_roll_pos = 341
Allowed range: 0 - 65535

osd_pid_pitch_pos = 341
Allowed range: 0 - 65535

osd_pid_yaw_pos = 341
Allowed range: 0 - 65535

osd_debug_pos = 341
Allowed range: 0 - 65535

osd_power_pos = 341
Allowed range: 0 - 65535

osd_pidrate_profile_pos = 341
Allowed range: 0 - 65535

osd_warnings_pos = 14772
Allowed range: 0 - 65535

osd_avg_cell_voltage_pos = 341
Allowed range: 0 - 65535

osd_pit_ang_pos = 341
Allowed range: 0 - 65535

osd_rol_ang_pos = 341
Allowed range: 0 - 65535

osd_battery_usage_pos = 341
Allowed range: 0 - 65535

osd_disarmed_pos = 341
Allowed range: 0 - 65535

osd_nheading_pos = 341
Allowed range: 0 - 65535

osd_up_down_reference_pos = 312
Allowed range: 0 - 65535

osd_ready_mode_pos = 341
Allowed range: 0 - 65535

osd_nvario_pos = 341
Allowed range: 0 - 65535

osd_esc_tmp_pos = 341
Allowed range: 0 - 65535

osd_esc_rpm_pos = 341
Allowed range: 0 - 65535

osd_esc_rpm_freq_pos = 341
Allowed range: 0 - 65535

osd_rtc_date_time_pos = 341
Allowed range: 0 - 65535

osd_adjustment_range_pos = 341
Allowed range: 0 - 65535

osd_flip_arrow_pos = 341
Allowed range: 0 - 65535

osd_core_temp_pos = 341
Allowed range: 0 - 65535

osd_log_status_pos = 341
Allowed range: 0 - 65535

osd_stick_overlay_left_pos = 341
Allowed range: 0 - 65535

osd_stick_overlay_right_pos = 341
Allowed range: 0 - 65535

osd_stick_overlay_radio_mode = 2
Allowed range: 1 - 4

osd_rate_profile_name_pos = 341
Allowed range: 0 - 65535

osd_pid_profile_name_pos = 341
Allowed range: 0 - 65535

osd_profile_name_pos = 341
Allowed range: 0 - 65535

osd_rcchannels_pos = 341
Allowed range: 0 - 65535

osd_camera_frame_pos = 142
Allowed range: 0 - 65535

osd_efficiency_pos = 341
Allowed range: 0 - 65535

osd_total_flights_pos = 341
Allowed range: 0 - 65535

osd_aux_pos = 341
Allowed range: 0 - 65535

osd_sys_goggle_voltage_pos = 341
Allowed range: 0 - 65535

osd_sys_vtx_voltage_pos = 341
Allowed range: 0 - 65535

osd_sys_bitrate_pos = 341
Allowed range: 0 - 65535

osd_sys_delay_pos = 341
Allowed range: 0 - 65535

osd_sys_distance_pos = 341
Allowed range: 0 - 65535

osd_sys_lq_pos = 341
Allowed range: 0 - 65535

osd_sys_goggle_dvr_pos = 341
Allowed range: 0 - 65535

osd_sys_vtx_dvr_pos = 341
Allowed range: 0 - 65535

osd_sys_warnings_pos = 341
Allowed range: 0 - 65535

osd_sys_vtx_temp_pos = 341
Allowed range: 0 - 65535

osd_sys_fan_speed_pos = 341
Allowed range: 0 - 65535

osd_stat_bitmask = 1879062316
Allowed range: 0 - 4294967295

osd_profile = 1
Allowed range: 1 - 3

osd_profile_1_name = -
String length: 1 - 16

osd_profile_2_name = -
String length: 1 - 16

osd_profile_3_name = -
String length: 1 - 16

osd_gps_sats_show_pdop = OFF
Allowed values: OFF, ON

osd_displayport_device = MSP
Allowed values: NONE, AUTO, MAX7456, MSP, FRSKYOSD

osd_rcchannels = -1,-1,-1,-1
Array length: 4

osd_camera_frame_width = 24
Allowed range: 2 - 30

osd_camera_frame_height = 11
Allowed range: 2 - 16

osd_stat_avg_cell_value = OFF
Allowed values: OFF, ON

osd_framerate_hz = 12
Allowed range: 1 - 60

osd_menu_background = TRANSPARENT
Allowed values: TRANSPARENT, BLACK, GRAY, LIGHT_GRAY

osd_aux_channel = 1
Allowed range: 1 - 18

osd_aux_scale = 200
Allowed range: 1 - 1000

osd_aux_symbol = 65
Allowed range: 0 - 255

osd_canvas_width = 53
Allowed range: 0 - 63

osd_canvas_height = 20
Allowed range: 0 - 31

osd_craftname_msgs = OFF
Allowed values: OFF, ON

system_hse_mhz = 8
Allowed range: 0 - 30

task_statistics = ON
Allowed values: OFF, ON

debug_mode = NONE
Allowed values: NONE, CYCLETIME, BATTERY, GYRO_FILTERED, ACCELEROMETER, PIDLOOP, GYRO_SCALED, RC_INTERPOLATION,
 ANGLERATE, ESC_SENSOR, SCHEDULER, STACK, ESC_SENSOR_RPM, ESC_SENSOR_TMP, ALTITUDE, FFT, FFT_TIME, FFT_FREQ, RX_FRSKY_SPI,
 RX_SFHSS_SPI, GYRO_RAW, DUAL_GYRO_RAW, DUAL_GYRO_DIFF, MAX7456_SIGNAL, MAX7456_SPICLOCK, SBUS, FPORT, RANGEFINDER,
 RANGEFINDER_QUALITY, LIDAR_TF, ADC_INTERNAL, RUNAWAY_TAKEOFF, SDIO, CURRENT_SENSOR, USB, SMARTAUDIO, RTH, ITERM_RELAX,
 ACRO_TRAINER, RC_SMOOTHING, RX_SIGNAL_LOSS, RC_SMOOTHING_RATE, ANTI_GRAVITY, DYN_LPF, RX_SPEKTRUM_SPI, DSHOT_RPM_TELEMETRY,
 RPM_FILTER, D_MIN, AC_CORRECTION, AC_ERROR, DUAL_GYRO_SCALED, DSHOT_RPM_ERRORS, CRSF_LINK_STATISTICS_UPLINK,
 CRSF_LINK_STATISTICS_PWR, CRSF_LINK_STATISTICS_DOWN, BARO, GPS_RESCUE_THROTTLE_PID, DYN_IDLE, FEEDFORWARD_LIMIT, FEEDFORWARD,
 BLACKBOX_OUTPUT, GYRO_SAMPLE, RX_TIMING, D_LPF, VTX_TRAMP, GHST, GHST_MSP, SCHEDULER_DETERMINISM, TIMING_ACCURACY,
 RX_EXPRESSLRS_SPI, RX_EXPRESSLRS_PHASELOCK, RX_STATE_TIME, GPS_RESCUE_VELOCITY, GPS_RESCUE_HEADING, GPS_RESCUE_TRACKING,
 GPS_CONNECTION, ATTITUDE, VTX_MSP, GPS_DOP, FAILSAFE, GYRO_CALIBRATION, ANGLE_MODE, ANGLE_TARGET, CURRENT_ANGLE,
 DSHOT_TELEMETRY_COUNTS, RPM_LIMIT, RC_STATS, MAG_CALIB, MAG_TASK_RATE, EZLANDING

rate_6pos_switch = OFF
Allowed values: OFF, ON

cpu_overclock = OFF
Allowed values: OFF, 192MHZ, 216MHZ, 240MHZ

pwr_on_arm_grace = 5
Allowed range: 0 - 30

enable_stick_arming = OFF
Allowed values: OFF, ON

vtx_band = 0
Allowed range: 0 - 8

vtx_channel = 0
Allowed range: 0 - 8

vtx_power = 0
Allowed range: 0 - 7

vtx_low_power_disarm = OFF
Allowed values: OFF, ON, UNTIL_FIRST_ARM

vtx_softserial_alt = OFF
Allowed values: OFF, ON

vtx_freq = 0
Allowed range: 0 - 5999

vtx_pit_mode_freq = 0
Allowed range: 0 - 5999

vtx_halfduplex = ON
Allowed values: OFF, ON

vtx_spi_bus = 0
Allowed range: 0 - 3

vcd_video_system = HD
Allowed values: AUTO, PAL, NTSC, HD

vcd_h_offset = 0
Allowed range: -32 - 31

vcd_v_offset = 0
Allowed range: -15 - 16

max7456_clock = NOMINAL
Allowed values: HALF, NOMINAL, DOUBLE

max7456_spi_bus = 3
Allowed range: 0 - 3

max7456_preinit_opu = OFF
Allowed values: OFF, ON

displayport_msp_col_adjust = 0
Allowed range: -6 - 0

displayport_msp_row_adjust = 0
Allowed range: -3 - 0

displayport_msp_fonts = 0,1,2,3
Array length: 4

displayport_msp_use_device_blink = OFF
Allowed values: OFF, ON

displayport_max7456_col_adjust = 0
Allowed range: -6 - 0

displayport_max7456_row_adjust = 0
Allowed range: -3 - 0

displayport_max7456_inv = OFF
Allowed values: OFF, ON

displayport_max7456_blk = 0
Allowed range: 0 - 3

displayport_max7456_wht = 2
Allowed range: 0 - 3

esc_sensor_halfduplex = OFF
Allowed values: OFF, ON

esc_sensor_current_offset = 0
Allowed range: 0 - 16000

led_inversion = 0
Allowed range: 0 - 7

dashboard_i2c_bus = 1
Allowed range: 0 - 3

dashboard_i2c_addr = 60
Allowed range: 8 - 119

camera_control_mode = HARDWARE_PWM
Allowed values: HARDWARE_PWM, SOFTWARE_PWM, DAC

camera_control_ref_voltage = 330
Allowed range: 200 - 400

camera_control_key_delay = 180
Allowed range: 100 - 500

camera_control_internal_resistance = 470
Allowed range: 10 - 1000

camera_control_button_resistance = 450,270,150,68,0
Array length: 5

camera_control_inverted = OFF
Allowed values: OFF, ON

rangefinder_hardware = NONE
Allowed values: NONE, HCSR04, TFMINI, TF02

pinio_config = 1,1,1,1
Array length: 4

pinio_box = 255,255,255,255
Array length: 4

usb_hid_cdc = OFF
Allowed values: OFF, ON

usb_msc_pin_pullup = ON
Allowed values: OFF, ON

flash_spi_bus = 2
Allowed range: 0 - 3

rcdevice_init_dev_attempts = 6
Allowed range: 0 - 10

rcdevice_init_dev_attempt_interval = 1000
Allowed range: 0 - 5000

rcdevice_protocol_version = 0
Allowed range: 0 - 1

rcdevice_feature = 0
Allowed range: 0 - 65535

gyro_1_bustype = SPI
Allowed values: NONE, I2C, SPI, SLAVE

gyro_1_spibus = 1
Allowed range: 0 - 3

gyro_1_i2cBus = 0
Allowed range: 0 - 3

gyro_1_i2c_address = 0
Allowed range: 0 - 119

gyro_1_sensor_align = CW90
Allowed values: DEFAULT, CW0, CW90, CW180, CW270, CW0FLIP, CW90FLIP, CW180FLIP, CW270FLIP, CUSTOM

gyro_1_align_roll = 0
Allowed range: -3600 - 3600

gyro_1_align_pitch = 0
Allowed range: -3600 - 3600

gyro_1_align_yaw = 900
Allowed range: -3600 - 3600

gyro_2_bustype = NONE
Allowed values: NONE, I2C, SPI, SLAVE

gyro_2_spibus = 0
Allowed range: 0 - 3

gyro_2_i2cBus = 0
Allowed range: 0 - 3

gyro_2_i2c_address = 0
Allowed range: 0 - 119

gyro_2_sensor_align = DEFAULT
Allowed values: DEFAULT, CW0, CW90, CW180, CW270, CW0FLIP, CW90FLIP, CW180FLIP, CW270FLIP, CUSTOM

gyro_2_align_roll = 0
Allowed range: -3600 - 3600

gyro_2_align_pitch = 0
Allowed range: -3600 - 3600

gyro_2_align_yaw = 0
Allowed range: -3600 - 3600

i2c1_pullup = OFF
Allowed values: OFF, ON

i2c1_clockspeed_khz = 800
Allowed range: 100 - 1300

i2c2_pullup = OFF
Allowed values: OFF, ON

i2c2_clockspeed_khz = 800
Allowed range: 100 - 1300

i2c3_pullup = OFF
Allowed values: OFF, ON

i2c3_clockspeed_khz = 800
Allowed range: 100 - 1300

mco2_on_pc9 = OFF
Allowed values: OFF, ON

scheduler_relax_rx = 25
Allowed range: 0 - 500

scheduler_relax_osd = 25
Allowed range: 0 - 500

cpu_late_limit_permille = 10
Allowed range: 0 - 100

serialmsp_halfduplex = OFF
Allowed values: OFF, ON

timezone_offset_minutes = 0
Allowed range: -780 - 780

rpm_filter_harmonics = 3
Allowed range: 0 - 3

rpm_filter_weights = 100,100,100
Array length: 3

rpm_filter_q = 500
Allowed range: 250 - 3000

rpm_filter_min_hz = 100
Allowed range: 30 - 200

rpm_filter_fade_range_hz = 50
Allowed range: 0 - 1000

rpm_filter_lpf_hz = 150
Allowed range: 100 - 500

stats_min_armed_time_s = -1
Allowed range: -1 - 127

stats_total_flights = 0
Allowed range: 0 - 4294967295

stats_total_time_s = 0
Allowed range: 0 - 4294967295

stats_total_dist_m = 0
Allowed range: 0 - 4294967295

stats_mah_used = 0
Allowed range: 0 - 4294967295

craft_name = -
String length: 1 - 16

pilot_name = -
String length: 1 - 16

altitude_source = DEFAULT
Allowed values: DEFAULT, BARO_ONLY, GPS_ONLY

altitude_prefer_baro = 100
Allowed range: 0 - 100

altitude_lpf = 300
Allowed range: 10 - 1000

altitude_d_lpf = 100
Allowed range: 10 - 1000

box_user_1_name = -
String length: 1 - 16

box_user_2_name = -
String length: 1 - 16

box_user_3_name = -
String length: 1 - 16

box_user_4_name = -
String length: 1 - 16
```

# Betaflight 2.x CLI commands

:::note
These settings are specific to betaflight 2.x. For cleanflight CLI docs go here
https://github.com/cleanflight/cleanflight/blob/master/docs/Cli.md
:::

<h4>Note: This Wiki Page covers the CLI Command changes for BetaFlight Version 2.x. </h4>  
New [Docs](https://github.com/martinbudden/betaflight/tree/master/docs) for BetaFlight 2.x.

Follow these links for the new CLI commands for [BetaFlight 3.0.x](/docs/wiki/release/older/Betaflight-3-0-Release-Notes) and [BetaFlight 3.1.x](/docs/wiki/release/older/Betaflight-3-1-Release-Notes).

The setting shown are the Defaults + possible values.

<h3>GET command</h3>
New CLI feature is type a "get" and part of a CLI command name (example: "get acc"). The cli will return all CLI commands that have the name part with the current value plus what the valid value range or valid Names.
Unknown on which Version this was added but is in v2.6.1  
This is a very handy feature and allows easy to find variable names that can then be copy/pasted from the CLI display to the command line entry box.    
   
`set roll_yaw_cam_mix_degrees = 0`<br/>
<i>[0..50]</i><br/>
Need feedback about proof of concept feature for mixing of roll and yaw to FPV cam angle. `set roll_yaw_cam_mix_degrees = <degrees>`
<br/>
Here a good preview for this option: [https://youtu.be/gXeaINFpvow FPV camera tilt compensation]

Another video on this option: [https://www.youtube.com/watch?v=gEcWxHIH378 Betaflight Camera Uptilt Compensation]

Note that in newer BF versions, you need to enable a flight mode for 'FPV ANGLE MIX' on the modes tab to make the mixing work. You can either define a switch to switch FPV cam angle mixing on and off OR you can set the full range of any switch to keep it permanently on.

`set gyro_lpf = 188HZ` <br/>
<i>[OFF,188HZ,98HZ,42HZ,EXPERIMENTAL(2.5.0)]</i> See [[Gyro & Dterm filtering recommendations]] for more information.

This is the internal gyro filtering value. The lower the value the more buffering and delay will be introduced to gyro. Must be set to OFF to enable 2K mode (starting with Version 2.3.0)(starting with Version 2.4 this is automatically set to OFF if 500 looptime is selected in the GUI)''

(F1 boards must disable accelerometer with set acc_hardware = 1 and in case there are other sensors on board like baro and mag disable those too. set mag_hardware = 1 and set baro_hardware = 1) Disabling any level modes
Hardware lowpass filter for gyro. Allowed values depend on the driver - For example MPU6050 allows 5,10,20,42,98,188,256Hz, while MPU3050 doesn't allow 5Hz. If you have to set gyro lpf below 42Hz generally means the frame is vibrating too much, and that should be fixed first. Values outside of supported range will usually be ignored by drivers, and will configure lpf to default value of 42Hz.

Boris said:

gyro_lpf = OFF basically still means there is a little bit of filtering on the gyro.
When setting it to EXPERIMENTAL it will remove any possible filtering and give raw data, which is extremely noisy. I don't recommend it. I just added it to be there in case someone wants to play with it.

For V2.4.0 and above- see the set gyro_sync_denom CLI command below.

(starting with Version 2.4 the following hardware is automatically set to NONE on F1 boards if 500usec looptime is selected in the GUI)

set acc_hardware = 0 (default on) (must be set to 1 for 2K mode on F1 targets)<br/>
<i>[0,...,9] (from 2.4.0 [AUTO,NONE,...])</i><br/>
Sets the accelerometer 0 means auto detect, 1 means NONE, 2 for ADXL345, 3 for MPU6050 integrated accelerometer, 4 for MMA8452, 5 for BMA280, 6 for LSM303DLHC, 7 for MPU6000, 8 for MPU6500

NB - There's an issue with configurator that means the gyro icon goes dark when you disable the accelerometer - it's here: https://github.com/cleanflight/cleanflight-configurator/issues/313

`set baro_hardware = 0` (default on), 1 = disabled<br/>
<i>[0,...,3] (from 2.4.0 [AUTO,NONE,...])</i>

`set mag_hardware = 0` (default on), 1 = disabled<br/>
<i>[0,...,3] (from 2.4.0 [AUTO,NONE,...])</i>

set imu_dcm_kp = 2500<br/>
<i>[0,...,50000]</i>

set imu_dcm_ki = 0<br/>
<i>[0,...,50000]</i>

set enable_buzzer_p6 = OFF<br/>
<i>[OFF,ON]</i>
Enables a lost buzzer on ESC Port 6 (CC3D only)

set beeper_off_flags = 256<br/>
<i>[0,...,65535]</i>

beeper_off_flags = sum of each desired beeper turned off

BEEPER*GYRO_CALIBRATED, 1
BEEPER_RX_LOST_LANDING, 2 // Beeps SOS when armed and TX is turned off or signal lost (autolanding/autodisarm)
BEEPER_RX_LOST, 4 // Beeps when TX is turned off or signal lost (repeat until TX is okay)
BEEPER_DISARMING, 8 // Beep when disarming the board
BEEPER_ARMING, 16 // Beep when arming the board
BEEPER_ARMING_GPS_FIX, 32 // Beep a special tone when arming the board and GPS has fix
BEEPER_BAT_CRIT_LOW, 64 // Longer warning beeps when battery is critically low (repeats)
BEEPER_BAT_LOW, 128 // Warning beeps when battery is getting low (repeats)
BEEPER*, 256 // when plugged into USB
BEEPER_RX_SET, 512 // Beeps when aux channel is set for beep or beep sequence how many satellites has found if GPS enabled
BEEPER_DISARM_REPEAT, 1024 // Beeps sounded while stick held in disarm position
BEEPER_ACC_CALIBRATION, 2048 // ACC inflight calibration completed confirmation
BEEPER_ACC_CALIBRATION_FAIL, 4096 // ACC inflight calibration failed
BEEPER_READY_BEEP, 8192 // Ring a tone when GPS is locked and ready
BEEPER_MULTI_BEEPS, 16384 // Internal value used by 'beeperConfirmationBeeps()'.
BEEPER_ARMED, 32768 // Warning beeps when board is armed (repeats until board is disarmed or throttle is increased)

<u>New in V2.5.0 Final</u>

The beeper off flags command is replaced by new textual representation using beeper command.
Examples:
To disable all beeper scenarios:

# beeper -ALL

To enable all beeper scenarios:

# beeper ALL

To disable beeping while USB is connected:

# beeper -ON_USB

# beeper

beeper GYRO_CALIBRATED
beeper RX_LOST
beeper RX_LOST_LANDING
beeper DISARMING
beeper ARMING
beeper ARMING_GPS_FIX
beeper BAT_CRIT_LOW
beeper BAT_LOW
beeper GPS_STATUS
beeper RX_SET
beeper ACC_CALIBRATION
beeper ACC_CALIBRATION_FAIL
beeper READY_BEEP
beeper MULTI_BEEPS
beeper DISARM_REPEAT
beeper ARMED
beeper SYSTEM_INIT
beeper ON_USB

Note: A copy paste from the CLI does not work and gives "Invalid" due to too many spaces between 'beeper' and the name. Just delete the extra space so there is only one space before hitting 'enter'.

set acc_lpf_hz = 20<br/>
<i>[0,...,200]</i>
Accelerometer low pass filter. Decreasing the value might help with drift in horizon and level modes.

set soft_gyro_lpf_hz = 60<br/>
<i>[0,...,255]</i>
BiQuad Low pass filter for gyro. Works as a substitute for gyro_lpf, which is a hardware filter inside the gyro but can also work together with gyro_lpf. value of 60 gives around 20-25db reflection to frequencies above 200hz, which are usually motor/prop frequencies. The value of 60 should be fine on most multirotors. It may be possible that very noisy setups could benefit from lower values.

set dterm_lpf_hz = 0<br/>
<i>[0,...,255]</i>
Biquad low pass filter for D in hz. Should not be needed. Especially not from 2.3.4 versions.

`set acro_plus_factor = 30` Replaced with SUPER EXPO
Range is 0-100. If set to anything other than 0 roll and pitch rates in the GUI will be ignored. RC rate and RC expo still apply. Warning 100 results in insane rolls and flips that may result in your inability to comprehend. Use at your own risk!

See the "What is Acro Plus" topic on the Frequently Asked Questions page.

set yaw_jump_prevention_limit = 200<br/>
<i>[80,...,500]</i><br/>
The maximum allowed P on Yaw stops....when stick centered basically.
Description by Boris here: http://www.rcgroups.com/forums/showpost.php?p=33860926&postcount=16558

<strike>set delta_from_gyro = ON<br/></strike>
<strike><i>[OFF,ON]</i><br/></strike>
Description by ctzsnooze here: http://www.rcgroups.com/forums/showpost.php?p=33859758&postcount=16547
Also see "The delta_from_gyro setting and all about the PID Controller D values" on the "Betaflight Deep Dive" Wiki page and the "How does yaw_jump_prevention_limit work ?" in the FAQs.

RC_smoothing = OFF<br/>
<i>[OFF,ON]</i><br/>

This enables a running average of the RC commands (stick values from TX). If you see large steps in the rc command BlackBox traces which then cause jumps in the 'P' and/or 'D' traces enabling this will smooth these out.

status<br/>

The status command is used to give a brief overview of the health of the Flight Controller. One of the most useful readings is the CPU percentage.

Here is an example output from the status command that shows the CPU at 100%
This will more than likely mean the Flight Controller will not arm.

System Uptime: 46 seconds, Voltage: 149 \* 0.1V (4S battery - OK), CPU:100%
CPU Clock=72MHz, GYRO=MPU6050, ACC=MPU6050.n, BARO=MS5611, MAG=HMC5883
Cycle Time: 988, I2C Errors: 0, config size: 1316

Here is another example output from the status command that shows the CPU at 37%
This gives plenty of CPU head-room for other Flight Controller features to be enabled if desired.
System Uptime: 104 seconds, Voltage: 1 \* 0.1V (1S battery - NOT PRESENT), CPU:37%
CPU Clock=72MHz, GYRO=MPU6500, ACC=MPU6500
Cycle Time: 365, I2C Errors: 1, config size: 1316

See the tasks command for details on how the CPU percentage usage can be lowered.

tasks<br/>
Used in conjunction with the status command to determine the general health of the copter.
Here is an example output that shows too many features running which will give rise to 100% CPU usage:
Task list:
0 - SYSTEM, max = 10 us, avg = 0 us, total = 1 ms
1 - GYRO/PID, max = 1039 us, avg = 722 us, total = 19987 ms
2 - ACCEL, max = 151 us, avg = 120 us, total = 672 ms
3 - SERIAL, max = 141 us, avg = 2 us, total = 17 ms
4 - BEEPER, max = 8 us, avg = 0 us, total = 2 ms
5 - BATTERY, max = 40085 us, avg = 15 us, total = 51 ms
6 - RX, max = 159 us, avg = 128 us, total = 205 ms
7 - COMPASS, max = 160 us, avg = 124 us, total = 24 ms
8 - BARO, max = 137 us, avg = 105 us, total = 183 ms
10 - ALTITUDE, max = 281 us, avg = 163 us, total = 122 ms
11 - DISPLAY, max = 130010 us, avg = 32784 us, total = 4391 ms

If the CPU load is 100% then disable Magnetometer, Barometer, LEDstrip and Display then try again.

Are you running LuxFloat? If so, change to MWREWRITE.

Also reduce the amount of AUX channels to reduce time for task RX.

Notes copied from Forum:

- ATTITUDE is as it says acc calculations.
- ACCEL is only sampling of accelerometer and filtering and ATTITUDE is real processing of it, which doesnt have to be fast. 100hz is more than enough!

- When posting to the Forum please type "version", "status" and "tasks" and post all three of these CLI outputs as well as which PIDC is used. Version is important since it shows What ßF version and processor binary (.hex or .bin) file was loaded.

<u><i>New 2.4.0 CLI commands</i></u>

set pid_delta_method = MEASUREMENT<br/>
<i>[MEASUREMENT,ERROR]</i><br/>

It's the old \_delta_from_gyro = OFF. Boris gave it a proper name.
There is basically a choice between 2 types of delta

set airmode_saturation_limit = 50

Default value of 50 means that airmode will try to compensate at it's best till 50% saturation. 0 means always maximum stabilization and 100 always limited. 0 is like version 2.3.3 and 2.3.4 and 100 would act same like pre 2.3.3 and like in 2.3.5.

2.5.x has no limit (removed)....works as 2.3.3 and 2.3.4. There is just yaw_p_limit to prevent yaw domination.

set gyro_sync_denom = 1

For 2khz, set it = 4
for 2.6khz, set it = 3
for 4 khz, set it = 2 (iffy depending on ESCs, can be used with OneShot125 if Short Cal'ed or with MultiShot & OneShot42)
for 8 khz (not recommended) set it = 1 (Can be used if ESCs are running MutliShot or OneShot42)

Denom is always a divider of the max loop rate (8khz). 4 means 8kHz /4 = 2khz. Loop time is the reciprocal (1/ Rate). Don't forget to check CPU usage when playing with this value.
It is highly recommended to use the 'looptime' (in microSecond) box in the config GUI. This takes care of all the required settings.

set vbat_pid_compensation = OFF<br/>
<i>[ON,OFF]</i><br/>

Uses maximum cell voltage as an offset. Tune your quad with a full lipo and your pids will be scaled up to 25% when voltage gets lower.

Also good when you have old and new lipos. The old ones with more voltage droop will automatically get more PID adjustments.
It also disables itself when voltage completely drops below 2 cells.
The cell count is calculated and the PID adjustments are based on the Cell voltage. Therefore moving from 3S to 4S is not a problem.

Note: This requires VBAT connection on FC.

set blackbox_device = SERIAL<br/>
<i>[SERIAL,SPIFLASH,SDCARD]</i><br/>

New named values.

set pid_controller = = MWREWRITE<br/>
<i>[MWREWRITE,LUX,MW23]</i><br/>

New named values.
Note: all other PIDCs have been removed.
V2.4.0 has only MWREWRITE & LUX
MW23 is added back in V2.4.1

<u><i>New 2.4.1 RC2 CLI commands</i></u>

set dterm_average_count = 4

averaging samples can now be configured for dterm to remove spiking.

set acro_plus_offset = 40

I brought back the normal rates in it. Reworked it with fixed point math, but now I also added acro_plus_offset. This is the breakpoint for acro plus. That means normal rates up to offset percentage of the stick output and after that the desired acro_plus_factor kicks in.

Works really well!

set max_aux_channels = 4 ?? <br/>
<i>[0,...,16]</i><br/>
Need to check what the default and maximum number of aux channels are.

<u><i>New 2.4.2 CLI commands</i></u>

serialpassthrough<br/>
<i>[id] [baud] [mode]</i><br/>
Serial data to port forwarding.
UART1 - ID 0
UART2 - ID 1
UART3 - ID 2

If your OSD is connected to UART2 with a baudrate of 57600 and you want to connect to it with your software enter this command:
serialpassthrough 1 57600
Then disconnect cleanflight configurator and connect your OSD Software to the com port.

<u><i>New 2.5.0 RC1 CLI commands</i></u>

Note: Use configurator to set looptime (in microSeconds) and all needed CLI values will be automatically set for proper operation.

TODO
add the new CLI commands/settings.

set use_oneshot42 = OFF<br/>
<i>[OFF,ON]</i><br/>
Enable OneShot42. Feature OneShot125 must be active.

set use_multishot = OFF<br/>
<i>[OFF,ON]</i><br/>
Enable MultiShot. Feature OneShot125 must be active.

set sbus_inversion = OFF ?? <br/>
<i>[OFF,ON]</i><br/>
SBUS inversion ONLY ON F3 TARGETS.

set frsky_vfas_cell_voltage = OFF ?? <br/>
<i>[OFF,ON]</i><br/>
Configurable VFAS cell voltage / battery voltage.

<u><i>New 2.5.01 RC2 CLI commands</i></u>

set forced_motor_pwm = OFF<br/>
<i>[OFF,ON]</i><br/>
Replaces set enable_fast_pwm. This is automatically set to proper values when LOOPTIME (microSeconds) is set using the Config GUI.
Also see "set motor_pwm_rate" above.

<u>New 2.5.0 Final</u>

TODO
Fill in the details of possible values and a description of what these do.

set debug_mode = NONE<br/>
<i>[NONE,CYCLETIME,BATTERY,GYRO,ACCELEROMETER,MIXER,AIRMODE]</i><br/>
Enables display/logging of various debug information through the debug streams.<br/>
Data can be seen as Debug 0-3 in the Sensors tab and logs.<br/>

set spektrum_sat_bind_autoreset = 1<br/>
<i>[1,??]</i><br/>

set pid_process_denom = 1<br/>
<i>[1,...,8]</i><br/>
Determines PID and motor write frequency by dividing the gyro sample rate. This is automatically set to proper values when LOOPTIME (microSeconds) is set using the Config GUI.

<u>New in 2.5.3</u>

set yaw_p_limit = 300<br/>
<i>[100,...,300]</i><br/>
Sets the maximum allowed P on Yaw.

<u>New in 2.5.4</u>

set gyro_cal_on_first_arm = OFF<br/>
<i>[OFF,ON]</i><br/>
Forces a Gyro calibration upon Arming the first time after power up when set = ON.

<br/><br/><a name="v260"/>
<u><i>Changes in 2.6.0</i></u><br/><br/>
<u>Removed:</u><br/>
set acro_plus_factor<br/>
set acro_plus_offset<br/>
set p_pitchf and all other float PID variables<br/>
set level_horizon<br/>
set level_angle<br/>
<br/>
<u>Changed:</u><br/>
set gyro_soft_lpf = 60 replaced with set gyro_lowpass_hz = 80<br/>
<i>[0,...,500]</i><br/>

<!--Only name and default changed?--><br/>

set dterm_lpf_hz = 0 replaced with set dterm_lowpass_hz = 70<br/>
<i>[0,...,500]</i><br/>

<!--New filter behavior?--><br/>

set dterm_average_count = 4<br/>
New range: <i>[0,...,12]</i><br/>
<br/>
<u>Added:</u><br/>
escprog <i>[bl|sk] [#]</i><br/><a name="escprog"/>
The first argument, <i>bl</i> or <i>sk</i>, is your ESC bootloader (bl for blheli or sk for simonk)<br/>
The second argument is the ESC number you wish to connect to.<br/><br/>
You can connect the ESC power at any point.<br/>
Type the command, then disconnect or close the cleanflight configurator.<br/>
Now connect with BLHeliSuite using the appropriate (USB/Com) interface. (C or 1)<br/>
Atmel SK interface needs confirmed, but should be option 4 or 5.<br/>
After finishing with one ESC the board needs to be restarted before running the CLI command for the next ESC. This usually means unplugging both the battery and USB.<br/>

set iterm_reset_degrees = 200<br/>
<i>[50,...,1000]</i><br/>
Experimental threshold for resetting iterm for pitch and roll on certain rates<br/>
<br/>
set super_expo_factor = 30<br/>
<i>[1,...,100]</i><br/>
Super Expo Factor<br/>
<br/>
set vbat_hysteresis = 1<br/>
<i>[0,...,250]</i><br/>
Hysteresis for alarm, default 1 = 0.1V<br/>
<br/>
set yaw_iterm_reset_degrees = 50<br/>
<i>[25,...,1000]</i><br/>
Experimental threshold for resetting iterm for yaw on certain rates<br/>
<br/>
set yaw_lowpass_hz = 70<br/>
<i>[0,...,500]</i><br/>
Additional yaw filter when yaw axis too noisy<br/>

<br/><br/><a name="v261"/>
<u><i>Changes in 2.6.1</i></u><br/><br/>
<u>Removed:</u><br/>
escprog <i>[bl|sk] [#]</i><br/><a name="escprog"/>

<br/><br/><a name="v270"/>
<u><i>Changes in 2.7.0</i></u><br/><br/>

<br/>
set super_expo_factor_yaw = 30 <br/>
<i>[1-100]</i><br/>

<br/>
set super_expo_yaw = OFF<br/>
<i>[OFF,ON,ALWAYS]</i><br/>

<br/>
set iterm_always_reset = OFF<br/>
<i>[OFF,ON]</i><br/>
Optional Iterm reset option even without super expo

<br/>
set unsynced_fast_pwm = OFF<br/>
<i>[ON,OFF]</i><br/>
unsynced motor update speeds for fast PWM protocols up to 32k with    
Set motor_pwm_rate = [0-32000]
(Oneshot125 not over 4000, os42 not over 12000, ms right up to 32k)

<br/>
set fast_pwm_protocol = ONESHOT125<br/>
<i>[ONESHOT125,ONESHOT42,MULTISHOT]</i><br/>
configuring fast PWM protocols

<i>Replaced use_Multishot and use_oneshot42.</i>  
 Note: 'feature oneshot125' must be enabled to use any of these fast pwm protocols.

<br/>
set iterm_reset_offset = 15<br/>
<i>[0-100]</i><br/>
Configurable Iterm reset offset

<br/><br/><a name="v280"/>
<u><i>Changes in 2.8.0</i></u><br/><br/>

TODO - add new CLI comands with explainations

<br/>
set airmode_activate_throttle = 1350<br/>
<i>[1000-2000]</i><br/>
This keeps AirMode OFF until the the first time throttle reaches this value. AirMode is always on after this.
Note that 3D users have to reconfigure their threshold to something else otherwise airmode would be always enabled.

<br/>
set iterm_reset is REMOVED<br/>

<br/>
set anti_desync_power_step = 10000<br/>
<i>[0-10000]</i><br/>
The default is set to the maximum ESC throttle change. Decrease until desync no longer happen.

Boris noted: For those who have desync issues might try this. Very curious if this can help ESCs in some situation with hard quick motor jumps from pid controller. I flew it and it flew quite well.  
I was analysing some of the logs from folks who had desyncs or unwanted rolls or flips. In 100% of cases desync happened when PID controller was doing abrupt throttle changes. Like for example after roll or flip where the quad needs to get stopped motors would shortly pulse up and down. That abrupt stepping can now be controlled with this feature. The ESC's have the most difficulty with quick changing RPM's.  
This is working directly on the motor output. It is basically the maximum allowed throttle change within 1ms.
100 means 100 throttle steps per millisecond.

From powdermnky007  
I saw Boris set the desync prevention thing down to 100, so if 1000 still desyncs (it probably will) drop down to 500, 250, 100 etc.

Make big jumps until you fix it, then work your way back up slowly.
<br/>
set d_yaw = 20<br/>
<i>[0-200]</i><br/>
As per release notes this now is what sets the yaw_jump_prevention_limit.
Boris noted: Yes 0 yaw D is 400 actually. Which might be too much in most times.  
1 D step equals to 8 steps in yaw_jump_prevention reduction  
D of 20: 400 - 160 = 240. (400 - d_yaw \*8)

Increasing Yaw D reduces the yaw_jump_prevention_limit, which is a limit on motor power during yaw movements.
Hence higher yaw D numbers mean less 'jump' and a reduction in the maximum possible yaw rate.

<br/>
set ledstrip_visual_beeper = OFF<br/>
<i>[ON,OFF]</i><br/>

<br/>
set iterm_ignore_threshold = 900<br/>
<i>[50-1000]</i><br/>

<br/>
set yaw_iterm_ignore_threshold = 35<br/>
<i>[25-1000]</i><br/>

ctzsnooze describes these two settings:
Both "iterm_ignore_threshold" and "yaw_iterm_ignore_threshold" parameters modify iTerm behavior during fast stick inputs. When intended turn rate is zero, e.g. while hovering or in stable FFF, iTerm is 'normal' - set by PID I alone - because iTerm accumulates 'normally'. As intended turn rate (set in acro by stick angle) approaches the term_ignore_threshold value, iTerm accumulation is decreased until it is zero at, and above, the item_ignore value.

Note that with this system iTerm accumulation during uncommanded events (wind, impact, etc) is always 'normal' - the attenuation occurs only during commanded inputs.

The intent is to smoothly reduce inputs to iTerm at high commanded turn rates, e.g. during flips and rolls, so that we minimise unwanted iTerm accumulation, which we know can cause bounce back or instability immediately we stop the flip or roll.

A higher threshold value allows more iTerm accumulation during high roll rate commands, and vice versa.

If the threshold is too low, a quick push forward on the stick may not accumulate enough iTerm to lock the new desired angle. If that happens, consider increasing the threshold.

A combination of a lower threshold and a higher PID I value may be useful if you want more I to deal with really windy days (i.e. to manage low amplitude relatively low frequency uncommanded inputs more aggressively) but you don't want or are getting excessive I effects during commanded flips, rolls etc. The default value of 200 seems about right, however at this point in time the optimal value is not known with great certainty.

<br/>
<strike>'set dynamic_pid = ON'<br/>
<i>[ON,OFF]</i><br/></strike>
- removed in 3.0.0

<br/>
set fast_pwm_protocol = ONESHOT125<br/>
<i>[ONESHOT125,ONESHOT42,MULTISHOT,OFF]</i><br/>
  set fast_pwm_protocol = off for brushed or normal pwm in 2.8

<br/>
feature -SUPEREXPO_RATES<br/>
Disables the Super Expo feature. 
This will allow the old rates and Expos.

<br/>
feature -AIRMODE<br/>
Disables the Air Mode feature.

<br/>
set rc_rate_yaw = 0<br/>
<i>[0-1.0??]</i><br/>

<br/>
set ledstrip_visual_beeper = OFF<br/>
<i>[ON,OFF]</i><br/>
When set to on, and the LEDLOW mode is active (i.e. LED strip off), blink the LED strip in synch with beeping, as a visual indicator in cases where the craft is too far away for the beeper to be heard / multiple craft are flying.

# Arming Sequence & Safety

## Switch arming

The AUX channel configured for arming will choose a default value that falls outside of the configured arm range (as configured in the "Modes" configurator tab), this value is either 1 "step" (25us) above or below the configured range. This is a safety feature to ensure the default value would not cause accidental arming.

Note that this default value is overwritten by the first values data from the receiver, therefore bad RX initial states or failsafe settings can still cause issues.

## Arming Prevention

Betaflight 3.2 (and above) includes more detailed troubleshooting information for the case when a craft will not arm.

This information is available via:

- the CLI
- Betaflight OSD
- beep patterns
- Betaflight App

Several of these conditions are to assist in preventing accidental arming via bad radio system configuration, unreliable/poor quality receivers and user mistakes.

These reasons for not arming are encoded as a set of flags (see [runtime_config.h](https://github.com/betaflight/betaflight/blob/master/src/main/fc/runtime_config.h)).

## CLI

Flags can be viewed via the `status` command.

Some targets with limited flash space will only provide the hexadecimal representation of these flags, in which case the active flags must be derived from the `armingDisableFlags_e` enum in `runtime_config.h` (ensure the version of the file you are looking at matches that of your firmware).

## Beeper

When arming is attempted and fails, if a beeper is connected to the flight controller it will emit a warning signal indicating the most important (lowest number) reason why disarming is disabled.

The signal is as follows:

- five short 'attention' beeps;
- a number of long beeps (may be 0);
- a number of short beeps with long intervals (may be 0).

The arming prevention condition that is active can be calculated as `(5 * <number of long beeps>) + <number of short beeps>`. For example:

- 1 long and 2 short beeps = 7
- 2 long beeps = 10

## Description of arming prevention flags

What each flag means and what you should do to (probably) fix the issue.

This list _should_ be kept up to date with the code in `master` (`armingDisableFlags_e` in [src/main/fc/runtime_config.h](https://github.com/betaflight/betaflight/blob/master/src/main/fc/runtime_config.h#L37-L60)) so can be used to find what flag corresponds to a certain index, however if you run an older version you'd have to check this manually as mentioned above.

<table>
<tr><th rowspan="2">Name</th><th rowspan="2">Description</th><th colspan="6">Beep code</th><th rowspan="2">Required Actions</th></tr>
<tr><th>3.2</th><th>3.3</th><th>3.4/3.5</th><th>4.0</th><th>4.1</th><th>4.2+</th></tr>
<tr><td><code>NOGYRO</code></td><td>A gyro was not detected</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>You may have a hardware failure, if a previous firmware version works then it may be a firmware issue. Or you might have flashed a wrong target.</td></tr>
<tr><td><code>FAILSAFE</code></td><td>Failsafe is active</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>Rectify the failure condition and try again.</td></tr>
<tr><td><code>RXLOSS</code><sup>(1)</sup> or <code>RX_FAILSAFE</code></td><td>No valid receiver signal is detected</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>Your receiver is either faulty or has no link to the transmitter.</td></tr>
<tr><td><code>BADRX</code><sup>(1)</sup></td><td>Your receiver has just recovered from receiver failsafe but the arm switch is on</td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td>Switch the arm switch off.</td></tr>
<tr><td><code>BOXFAILSAFE</code></td><td>The 'FAILSAFE' switch was activated</td><td>5</td><td>5</td><td>5</td><td>5</td><td>5</td><td>5</td><td>See <code>FAILSAFE</code></td></tr>
<tr><td><code>RUNAWAY</code></td><td>Runway Takeoff Prevention has been triggered</td><td> </td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>Disarm to clear this condition.</td></tr>
<tr><td><code>CRASH</code></td><td>Crash Recovery has been triggered</td><td> </td><td> </td><td> </td><td> </td><td>7</td><td>7</td><td>Disarm to clear this condition.</td></tr>
<tr><td><code>THROTTLE</code></td><td>Throttle channel is too high</td><td>6</td><td>7</td><td>7</td><td>7</td><td>8</td><td>8</td><td>Lower throttle below <code>min_check</code>.</td></tr>
<tr><td><code>ANGLE</code></td><td>Craft is not level (enough)</td><td>7</td><td>8</td><td>8</td><td>8</td><td>9</td><td>9</td><td>Level craft to within <code>small_angle</code> degrees (default 25).</td></tr>
<tr><td><code>BOOTGRACE</code></td><td>Arming too soon after power on</td><td>8</td><td>9</td><td>9</td><td>10</td><td>10</td><td>10</td><td>Wait until <code>pwr_on_arm_grace</code> seconds (default 5) have elapsed.</td></tr>
<tr><td><code>NOPREARM</code></td><td>Prearm switch is not activated or prearm has not been toggled after disarm</td><td>9</td><td>10</td><td>10</td><td>10</td><td>11</td><td>11</td><td>Toggle the prearm switch.</td></tr>
<tr><td><code>LOAD</code></td><td>System load is too high for safe flight</td><td>10</td><td>11</td><td>11</td><td>11</td><td>12</td><td>12</td><td>Revisit configuration and disable features.</td></tr>
<tr><td><code>CALIB</code></td><td>Sensor calibration is still ongoing</td><td>11</td><td>12</td><td>12</td><td>12</td><td>13</td><td>13</td><td>Wait for sensor calibration to complete.</td></tr>
<tr><td><code>CLI</code></td><td>CLI is active</td><td>12</td><td>13</td><td>13</td><td>13</td><td>14</td><td>14</td><td>Exit the CLI.</td></tr>
<tr><td><code>CMS</code></td><td>CMS (config menu) is Active - over OSD or other display</td><td>13</td><td>14</td><td>14</td><td>14</td><td>15</td><td>15</td><td>Exit the CMS (or OSD menu).</td></tr>
<tr><td><code>OSD</code></td><td>OSD menu is active</td><td>14</td><td>15</td><td>16</td><td></td><td></td><td></td><td>Exit OSD menu.</td></tr>
<tr><td><code>BST</code></td><td>A Black Sheep Telemetry device (TBS Core Pro for example) disarmed and is preventing arming</td><td>15</td><td>16</td><td>16</td><td>15</td><td>16</td><td>16</td><td>Refer to the manual for your hardware.</td></tr>
<tr><td><code>MSP</code> </td><td>MSP connection is active, probably via Betaflight App</td><td>16</td><td>17</td><td>17</td><td>16</td><td>17</td><td>17</td><td>Terminate the Betaflight App connection (disconnect).</td></tr>
<tr><td><code>PARALYZE</code></td><td>Paralyze mode has been activated</td><td></td><td></td><td>18</td><td>17</td><td>18</td><td>18</td><td>Power cycle/reset FC board.</td></tr>
<tr><td><code>GPS</code></td><td>GPS rescue mode is configured but required number of satellites has not been fixed</td><td></td><td></td><td>19</td><td>18</td><td>19</td><td>19</td><td>Wait for GPS fix, enable arming without GPS fix, or disable GPS rescue mode.</td></tr>
<tr><td><code>RESCUE_SW</code></td><td>GPS Rescue switch is in an unsafe position</td><td></td><td></td><td></td><td>19</td><td>20</td><td>20</td><td>Turn off the GPS Rescue switch to arm.</td></tr>
<tr><td><code>RPMFILTER</code><sup>(2)</sup> or <code>DSHOT_TELEM</code></td><td>Motor RPM-based filtering is not functioning</td><td></td><td></td><td></td><td>21</td><td>21</td><td>21</td><td>One or more ESC's are not supplying valid RPM telemetry.</td></tr>
<tr><td><code>REBOOT_REQD</code></td><td>Reboot required</td><td></td><td></td><td></td><td></td><td>22</td><td>22</td><td>Reboot the flight controller for settings changes to take effect.</td></tr>
<tr><td><code>DSHOT_BBANG</code></td><td>DSHOT Bitbang is not working</td><td></td><td></td><td></td><td></td><td>23</td><td>23</td><td>(3)</td></tr>
<tr><td><code>NO_ACC_CAL</code></td><td>Accelerometer calibration required</td><td></td><td></td><td></td><td></td><td></td><td>24</td><td>Calibrate the accelerometer or disable features that use it</td></tr>
<tr><td><code>MOTOR_PROTO</code></td><td>ESC/Motor Protocol not configured</td><td></td><td></td><td></td><td></td><td></td><td>25</td><td>Select the ESC/Motor protocol to use on the Configuration tab.</td></tr><tr><td><code>ARMSWITCH</code></td><td>Arm switch is in an unsafe position</td><td>17</td><td>18</td><td>20</td><td>21</td><td>24</td><td>26</td><td>Toggle the arm switch to arm.</td></tr>
</table>

(1) This may appear on the Betaflight OSD during flight, take it as a sign that your radio system is either faulty or you are flying at the edge of your range. Treat it the same you would an "RSSI critically low" warning.

(2) RPM-based filtering is enabled but one or more ESC's are not supplying valid DSHOT telemetry. Check that the ESC's are capable of and have the required firmware installed to support bidirectional DSHOT telemetry.

(3) Bitbang DSHOT is not working properly and the motors can't be controlled. Likely caused by a timer conflict with other features enabled on the flight controller.

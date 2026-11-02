# Building in Arch Linux

To build BetaFlight, first the ARM toolchain has to be installed:

## Setup GNU ARM Toolchain

```bash
pacman -S arm-none-eabi-gcc arm-none-eabi-newlib arm-none-eabi-binutils
```

For running tests, the `libblocksruntime` package from the AUR also has to be installed:

```bash
trizen -S libblocksruntime
```

At the time of writing, the repository version of GCC is 9.2.0, unlike 9.2.1 which BetaFlight expects.
If you get the following error, you can override the GCC version in `make/locak.mk` before proceeding:

```bash
$ make
make/tools.mk:301: *** **ERROR** your arm-none-eabi-gcc is '9.2.0', but '9.2.1' is expected. Override with 'GCC_REQUIRED_VERSION' in make/local.mk or run 'make arm_sdk_install' to install the right version automatically in the tools folder of this repo.  Stop.
$ echo "GCC_REQUIRED_VERSION = 9.2.0" >> make/local.mk
```

## Building

After the ARM toolchain is installed, you should be able to build from source.

```bash
cd src
git clone git@github.com:betaflight/betaflight.git
cd betaflight
make configs
make MATEKF411
```

You'll see a set of files being compiled, and finally linked, yielding both an ELF and then a HEX:

```
...
$ ls -l obj/
total 1516
-rwxr-xr-x 1 s-ol s-ol  428584 Jan 11 12:04 betaflight_4.4.2_MATEKF411.bin*
-rw-r--r-- 1 s-ol s-ol 1136991 Jan 11 12:04 betaflight_4.4.2_MATEKF411.hex
drwxr-xr-x 3 s-ol s-ol    4096 Jan 11 12:04 main/
```

You can use the Betaflight-Configurator to flash the `obj/betaflight_4.4.2_MATEKF411.hex` file.

## Serial and DFU Permissions

To flash a target with the Betaflight App, your user needs access to the flight controller's serial port and to its DFU bootloader.

Serial ports (`/dev/ttyACM*` for the flight controller's own USB port, `/dev/ttyUSB*` for USB-to-serial adapters) belong to the `uucp` group on Arch. Add yourself to it:

```bash
sudo usermod -aG uucp $USER
```

If ModemManager is installed, it can grab the flight controller's serial port right after it is plugged in. Stop it, or remove it if you do not need it for a cellular modem:

```bash
sudo systemctl disable --now ModemManager.service
```

DFU devices need a udev rule. The `uaccess` tag grants access to the user logged in at the machine, so no extra group is needed:

```bash
sudo tee /etc/udev/rules.d/70-betaflight-dfu.rules > /dev/null <<'EOF'
# DFU (Internal bootloader for STM32, GD32, AT32, APM32, X32, UM32 and RP2350 MCUs)
# STM32
SUBSYSTEM=="usb", ATTRS{idVendor}=="0483", ATTRS{idProduct}=="df11", TAG+="uaccess"
# GD32
SUBSYSTEM=="usb", ATTRS{idVendor}=="28e9", ATTRS{idProduct}=="0189", TAG+="uaccess"
# AT32
SUBSYSTEM=="usb", ATTRS{idVendor}=="2e3c", ATTRS{idProduct}=="df11", TAG+="uaccess"
# APM32
SUBSYSTEM=="usb", ATTRS{idVendor}=="314b", ATTRS{idProduct}=="0106", TAG+="uaccess"
# X32
SUBSYSTEM=="usb", ATTRS{idVendor}=="3997", ATTRS{idProduct}=="df11", TAG+="uaccess"
# UM32
SUBSYSTEM=="usb", ATTRS{idVendor}=="396a", ATTRS{idProduct}=="df00", TAG+="uaccess"
# RP2350 (Raspberry Pi Pico)
SUBSYSTEM=="usb", ATTRS{idVendor}=="2e8a", ATTRS{idProduct}=="000f", TAG+="uaccess"
EOF
```

Keep each comment on its own line: udev rejects a rule line that ends in a comment and silently skips that rule. The file number must stay below 73, because systemd applies `uaccess` in `73-seat-late.rules` and ignores a tag added by a later file.

Reload the rules, then log out and back in so the group change takes effect:

```bash
sudo udevadm control --reload-rules
sudo udevadm trigger
```

## Updating and rebuilding

Navigate to the local betaflight repository and use the following steps to pull the latest changes and rebuild your version of betaflight:

```bash
cd src/betaflight
git reset --hard
git pull
make clean
make
```

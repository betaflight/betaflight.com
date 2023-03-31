# Building in Ubuntu

Building for Ubuntu platform is remarkably easy.
This document is tested and based on the latest Ubuntu 22.04 LTS release and can also be used for WSL.

### Clone Betaflight Repository and Install Toolchain

    $ sudo apt update && sudo apt upgrade
    $ sudo apt install build-essential libblocksruntime-dev libtool git curl clang
    $ git clone https://github.com/betaflight/betaflight.git
    $ cd betaflight
    $ make arm_sdk_install

### Updating and Rebuilding Firmware

Navigate to your local betaflight repository and use the following steps to pull the latest changes and rebuild your version of betaflight:

    $ git pull
    $ make MATEKF405 [EXTRA_FLAGS="-DUSE_RANGEFINDER"] [DEBUG=DBG]

Using the optional EXTRA_FLAGS parameters you can specify options like USE_RANGEFINDER.
Using the optional DEBUG parameter you can specify the debugger.

You'll see a set of files being compiled, and finally linked, yielding both an ELF and then a HEX.
You can use the Betaflight-Configurator to flash the `obj/betaflight_MATEKF405.hex` file.
Make sure to remove `obj/` and `make clean`, before building again.

### Building Betaflight Configurator

    $ sudo apt update && sudo apt upgrade
    $ sudo apt install libatomic1 npm
    $ sudo npm install -g gulp-cli yarn
    $ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
    $ source ~/.bashrc
    $ nvm install 16 (for exact version please check link below)

See [Betaflight Configurator Development](https://github.com/betaflight/betaflight-configurator#development) for how to build the Betaflight Configurator.

### Flashing a Target with Betaflight Configurator on Ubuntu 22.04

In most Linux distributions the user won't have access to serial interfaces by default. Flashing a target requires configuration of usb for dfu mode. To add this access right type the following command in a terminal:

```
    $ sudo usermod -a -G dialout $USER
    $ sudo usermod -a -G plugdev $USER
    $ sudo apt-get remove modemmanager
    $ sudo tee -a /etc/udev/rules.d/46-stdfu-permissions.rules <<EOF
# DFU (Internal bootloader for STM32 MCUs)

ACTION=="add", SUBSYSTEM=="usb", ATTRS{idVendor}=="0483", ATTRS{idProduct}=="df11", MODE="0664", GROUP="plugdev"
ACTION=="add", SUBSYSTEM=="usb", ATTRS{idVendor}=="2e3c", ATTRS{idProduct}=="df11", MODE="0664", GROUP="plugdev"EOF
EOF
```

Please log out and log in to active the settings. You should now be able to flash your target using Betaflight Configurator.

Credit goes to K.C. Budd, AKfreak for testing, and pulsar for doing the long legwork that yielded the original content of this document.

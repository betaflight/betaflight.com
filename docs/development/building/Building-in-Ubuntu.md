---
sidebar_position: 1
sidebar_label: Building in Ubuntu
title: Building in Ubuntu
---

# Building in Ubuntu

Building for Ubuntu platform is remarkably easy.
This document is tested and based on Ubuntu 24.04 LTS release and can also be used for WSL.

### Clone Betaflight Repository and Install Toolchain

Cloning the Betaflight repository will create a folder named `betaflight` in your current folder and download a copy for local use. You may wish to begin in a project folder such as `~/Git/`, `~/Github/`, or `~/My-Projects/`. Your local clone will not be automatically synced when Betaflight's github repository is updated; Syncing must be done manually. If development and pull-requests is intended, then please see the "[Git and Github](../Git)" section. The following command-lines will install necessary prerequisites, clone and setup Betaflight.

```
sudo apt update && sudo apt upgrade
sudo apt -y install build-essential git curl clang-18 python3 python-is-python3
git clone https://github.com/betaflight/betaflight.git
cd betaflight
make arm_sdk_install
make configs
```

### Updating and Rebuilding Firmware

Navigate to your local betaflight repository and use the following steps to pull the latest changes and rebuild your version of betaflight:

```
git pull
make MATEKF405 [EXTRA_FLAGS="-DUSE_RANGEFINDER"] [DEBUG=DBG]
```

Using the optional EXTRA_FLAGS parameters you can specify options like USE_RANGEFINDER.
Using the optional DEBUG parameter you can specify the debugger.

You'll see a set of files being compiled, and finally linked, yielding both an ELF and then a HEX.
You can use the Betaflight-Configurator to flash the `obj/betaflight_MATEKF405.hex` file.
Make sure to remove `obj/` and `make clean`, before building again.

### Building the Betaflight App

Change to your project-folder if desired. (e.g. `cd ~/Git`)

```
sudo apt update && sudo apt upgrade
sudo apt install libatomic1 npm
sudo npm install -g gulp-cli yarn
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
git clone https://github.com/betaflight/betaflight-configurator.git
cd betaflight-configurator
nvm install
yarn install
yarn build
yarn vite
```

This will start a local server for the Betaflight App. Use a Web-Serial compatible web browser to visit `http://localhost:8000/`. Press `q`, then `Enter` in the terminal to quit. You may delete the `nohup.out` file if it remains after quitting. Please see https://github.com/betaflight/betaflight-configurator?tab=readme-ov-file#betaflight-configurator for further details.

See [Betaflight App Development](https://github.com/betaflight/betaflight-configurator#development) for how to build the Betaflight App.

### Flashing a Target with the Betaflight App

In most Linux distributions the user won't have access to serial interfaces by default. Flashing a target requires configuration of usb for dfu mode. To add this access right type the following command in a terminal:

```
sudo usermod -a -G dialout $USER
sudo usermod -a -G plugdev $USER
sudo apt-get remove modemmanager
sudo tee -a /etc/udev/rules.d/46-stdfu-permissions.rules <<EOF
# DFU (Internal bootloader for STM32, AT32 and APM32 MCUs)

ACTION=="add", SUBSYSTEM=="usb", ATTRS{idVendor}=="0483", ATTRS{idProduct}=="df11", MODE="0664", GROUP="plugdev"
ACTION=="add", SUBSYSTEM=="usb", ATTRS{idVendor}=="2e3c", ATTRS{idProduct}=="df11", MODE="0664", GROUP="plugdev"
ACTION=="add", SUBSYSTEM=="usb", ATTRS{idVendor}=="314b", ATTRS{idProduct}=="0106", MODE="0664", GROUP="plugdev"
EOF
```

Please log out and log in to active the settings. You should now be able to flash your target using the Betaflight App.

Credit goes to K.C. Budd, AKfreak for testing, and pulsar for doing the long legwork that yielded the original content of this document.

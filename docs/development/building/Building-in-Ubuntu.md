---
sidebar_position: 1
sidebar_label: Building in Ubuntu
title: Building in Ubuntu
---

# Building in Ubuntu

Building for Ubuntu platform is remarkably easy.
This document is tested and based on Ubuntu 26.04 LTS release and can also be used for WSL.

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

- Using the optional EXTRA_FLAGS parameters you can specify options like `USE_RANGEFINDER`.
- Using the optional DEBUG parameter you can specify the debugger.

You'll see a set of files being compiled, and finally linked, yielding both an ELF and then a HEX.
You can use the Betaflight-Configurator to flash the `obj/betaflight_MATEKF405.hex` file.
Make sure to remove `obj/` and `make clean`, before building again.

### Building the Betaflight App

Change to your project-folder if desired. (e.g. `cd ~/Git`)

```
sudo apt update && sudo apt upgrade
sudo apt install libatomic1 npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
source ~/.bashrc
git clone https://github.com/betaflight/betaflight-configurator.git
cd betaflight-configurator
nvm install 24 --lts
npm install
npm run build
npm run dev
```

This will start a local server for the Betaflight App.
- Use a Web-Serial compatible web browser to visit `http://localhost:8080/`. 
- Press `Ctrl+C` in the terminal to quit.
- Check https://github.com/betaflight/betaflight-configurator?tab=readme-ov-file#betaflight-configurator for further details.

See [Betaflight App Development](https://github.com/betaflight/betaflight-configurator#development) for how to build the Betaflight App.

### Building the Betaflight App for Android

The Betaflight App can also be built for Android using [Capacitor](https://capacitorjs.com/) and the Android SDK. First, install [Android Studio](https://developer.android.com/studio) and then set up the environment variables:

```bash
echo '
# Android development (Betaflight Configurator)
export JAVA_HOME=/opt/android-studio/jbr
export ANDROID_HOME="$HOME/Android/Sdk"
export NDK_HOME="$ANDROID_HOME/ndk/$(ls -1 $ANDROID_HOME/ndk 2>/dev/null | head -1)"
export PATH="$PATH:$ANDROID_HOME/platform-tools:$NDK_HOME"
' >> ~/.bashrc
source ~/.bashrc
```

You can now build and run the Android app from the [betaflight-configurator](https://github.com/betaflight/betaflight-configurator) repository:

```bash
cd betaflight-configurator
npm run android:dev
```

To open the project in Android Studio for debugging:

```bash
npm run android:open
```

### Installing GitHub CLI

The [GitHub CLI](https://cli.github.com/) (`gh`) is the official command-line tool from GitHub. While `git` handles version control, `gh` handles everything on the GitHub side — creating PRs, reviewing diffs, checking CI status, managing issues, and triggering workflows — all without leaving the terminal. It authenticates via OAuth so you don't need to manage personal access tokens manually.

```bash
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update && sudo apt install gh
gh auth login
```

Common usage examples:

```bash
gh pr create --title "fix: description" --body "summary of changes"
gh pr list
gh pr checks
gh issue list --repo betaflight/betaflight
gh run list
```

### Flashing a Target with the Betaflight App

In most Linux distributions the user won't have access to serial interfaces by default. Flashing a target requires configuration of usb for dfu mode. To add this access right type the following command in a terminal:

```
sudo usermod -a -G dialout $USER
sudo usermod -a -G plugdev $USER
sudo apt-get remove modemmanager
sudo tee -a /etc/udev/rules.d/46-stdfu-permissions.rules <<EOF
# DFU (Internal bootloader for STM32, GD32, AT32, APM32, X32 and RP2350 MCUs)

# STM32
ACTION=="add", SUBSYSTEM=="usb", ATTRS{idVendor}=="0483", ATTRS{idProduct}=="df11", MODE="0664", GROUP="plugdev"
# GD32
ACTION=="add", SUBSYSTEM=="usb", ATTRS{idVendor}=="28e9", ATTRS{idProduct}=="0189", MODE="0664", GROUP="plugdev"
# AT32
ACTION=="add", SUBSYSTEM=="usb", ATTRS{idVendor}=="2e3c", ATTRS{idProduct}=="df11", MODE="0664", GROUP="plugdev"
# RP2350
ACTION=="add", SUBSYSTEM=="usb", ATTRS{idVendor}=="2e8a", ATTRS{idProduct}=="000f", MODE="0664", GROUP="plugdev"
# APM32
ACTION=="add", SUBSYSTEM=="usb", ATTRS{idVendor}=="314b", ATTRS{idProduct}=="0106", MODE="0664", GROUP="plugdev"
# X32
ACTION=="add", SUBSYSTEM=="usb", ATTRS{idVendor}=="3997", ATTRS{idProduct}=="df11", MODE="0664", GROUP="plugdev"

# FTDI USB-to-Serial

# FT232R
ACTION=="add", SUBSYSTEM=="usb", ATTRS{idVendor}=="0403", ATTRS{idProduct}=="6001", MODE="0664", GROUP="plugdev"
# FT2232H (also ESP-Prog)
ACTION=="add", SUBSYSTEM=="usb", ATTRS{idVendor}=="0403", ATTRS{idProduct}=="6010", MODE="0664", GROUP="plugdev"
# FT4232H
ACTION=="add", SUBSYSTEM=="usb", ATTRS{idVendor}=="0403", ATTRS{idProduct}=="6011", MODE="0664", GROUP="plugdev"
# FT232H
ACTION=="add", SUBSYSTEM=="usb", ATTRS{idVendor}=="0403", ATTRS{idProduct}=="6014", MODE="0664", GROUP="plugdev"
# FT230X/FT231X
ACTION=="add", SUBSYSTEM=="usb", ATTRS{idVendor}=="0403", ATTRS{idProduct}=="6015", MODE="0664", GROUP="plugdev"

# Silicon Labs CP210x USB-to-Serial

# CP210x
ACTION=="add", SUBSYSTEM=="usb", ATTRS{idVendor}=="10c4", ATTRS{idProduct}=="ea60", MODE="0664", GROUP="plugdev"
# CP210x
ACTION=="add", SUBSYSTEM=="usb", ATTRS{idVendor}=="10c4", ATTRS{idProduct}=="ea61", MODE="0664", GROUP="plugdev"
# CP210x
ACTION=="add", SUBSYSTEM=="usb", ATTRS{idVendor}=="10c4", ATTRS{idProduct}=="ea62", MODE="0664", GROUP="plugdev"
# CP2105
ACTION=="add", SUBSYSTEM=="usb", ATTRS{idVendor}=="10c4", ATTRS{idProduct}=="ea70", MODE="0664", GROUP="plugdev"
# CP2108
ACTION=="add", SUBSYSTEM=="usb", ATTRS{idVendor}=="10c4", ATTRS{idProduct}=="ea71", MODE="0664", GROUP="plugdev"

# WCH CH34x/CH9102 USB-to-Serial

# CH341
ACTION=="add", SUBSYSTEM=="usb", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="5523", MODE="0664", GROUP="plugdev"
# CH340 (variant)
ACTION=="add", SUBSYSTEM=="usb", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7522", MODE="0664", GROUP="plugdev"
# CH340
ACTION=="add", SUBSYSTEM=="usb", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE="0664", GROUP="plugdev"
# CH340S
ACTION=="add", SUBSYSTEM=="usb", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7584", MODE="0664", GROUP="plugdev"
# CH343
ACTION=="add", SUBSYSTEM=="usb", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="55d3", MODE="0664", GROUP="plugdev"
# CH9102
ACTION=="add", SUBSYSTEM=="usb", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="55d4", MODE="0664", GROUP="plugdev"

# Prolific USB-to-Serial

# PL2303
ACTION=="add", SUBSYSTEM=="usb", ATTRS{idVendor}=="067b", ATTRS{idProduct}=="2303", MODE="0664", GROUP="plugdev"
# PL2303GC
ACTION=="add", SUBSYSTEM=="usb", ATTRS{idVendor}=="067b", ATTRS{idProduct}=="23a3", MODE="0664", GROUP="plugdev"

# Microchip USB-to-Serial

# MCP2221
ACTION=="add", SUBSYSTEM=="usb", ATTRS{idVendor}=="04d8", ATTRS{idProduct}=="00dd", MODE="0664", GROUP="plugdev"
# MCP2200
ACTION=="add", SUBSYSTEM=="usb", ATTRS{idVendor}=="04d8", ATTRS{idProduct}=="00df", MODE="0664", GROUP="plugdev"

# Espressif native USB

# ESP32-S3/C3 USB-Serial/JTAG
ACTION=="add", SUBSYSTEM=="usb", ATTRS{idVendor}=="303a", ATTRS{idProduct}=="1001", MODE="0664", GROUP="plugdev"
EOF
```

Each label sits on its own line because udev rejects a rule line that ends in a comment (`Invalid key/value pair, ignoring`), which silently disables the rule. Check your file with `udevadm verify /etc/udev/rules.d/46-stdfu-permissions.rules` after editing it.

Please log out and log in to activate the settings. You should now be able to flash your target using the Betaflight App.

Credit goes to K.C. Budd, AKfreak for testing, and pulsar for doing the long legwork that yielded the original content of this document.

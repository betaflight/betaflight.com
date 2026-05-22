---
sidebar_position: 4
sidebar_label: Building in Fedora
title: Building in Fedora
---

# Building in Fedora 44

This guide covers building the Betaflight firmware and configurator on Fedora 44.

## Clone Betaflight Repository and Install Toolchain

Install build dependencies (`clang` and `libblocksruntime-devel` are needed for unit tests via `make test`):

```bash
$ sudo dnf check-update
$ sudo dnf install git clang libblocksruntime-devel
$ sudo dnf group install "C Development Tools and Libraries"
```

Clone the repository, install the ARM toolchain, and build:

```bash
$ git clone https://github.com/betaflight/betaflight.git
$ cd betaflight
$ make arm_sdk_install
$ make configs
$ make MATEKH743
```

## Updating and Rebuilding Firmware

```bash
$ cd betaflight
$ git pull
$ make clean
$ make configs
$ make MATEKH743
```

## Building the Betaflight Configurator

Install Node.js 24 using [nvm](https://github.com/nvm-sh/nvm):

```bash
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
$ source ~/.bashrc
$ nvm install 24
```

Alternatively, if you prefer system packages:

```bash
$ sudo dnf install nodejs24-bin
```

Install system dependencies, clone, and build:

```bash
$ sudo dnf install libatomic rpm-build dpkg
$ git clone https://github.com/betaflight/betaflight-configurator.git
$ cd betaflight-configurator
$ npm install
$ npm run dev
```

This starts the development server at `http://localhost:8080/`.

Note: check the [.nvmrc](https://github.com/betaflight/betaflight-configurator/blob/master/.nvmrc) file for the currently required Node.js version.

## Installing Chromium

The Betaflight Configurator requires a Chromium-based browser for [WebSerial API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API) support (Firefox does not support WebSerial). Install Chromium via dnf:

```bash
$ sudo dnf install chromium
```

Open `http://localhost:8080/` in Chromium to use the configurator's development build with serial device access.

## Serial Permissions

If ModemManager is installed, remove it to prevent it from interfering with flight controller connections:

```bash
$ sudo dnf remove ModemManager
```

Add yourself to the `dialout` group:

```bash
$ sudo usermod -aG dialout $(whoami)
```

Create the udev rules file for DFU device access. Save and reboot after adding the following contents:

```bash
$ sudo nano /etc/udev/rules.d/45-stdfu-permissions.rules

# Notify ModemManager this device should be ignored
ACTION!="add|change|move", GOTO="mm_usb_device_blacklist_end"
SUBSYSTEM!="usb", GOTO="mm_usb_device_blacklist_end"
ENV{DEVTYPE}!="usb_device", GOTO="mm_usb_device_blacklist_end"

# STM32 DFU
ATTRS{idVendor}=="0483", ATTRS{idProduct}=="df11", ENV{ID_MM_DEVICE_IGNORE}="1"
# GD32 DFU
ATTRS{idVendor}=="28e9", ATTRS{idProduct}=="0189", ENV{ID_MM_DEVICE_IGNORE}="1"
# AT32 DFU
ATTRS{idVendor}=="2e3c", ATTRS{idProduct}=="df11", ENV{ID_MM_DEVICE_IGNORE}="1"
# APM32 DFU
ATTRS{idVendor}=="314b", ATTRS{idProduct}=="0106", ENV{ID_MM_DEVICE_IGNORE}="1"
# RP2350 (Raspberry Pi Pico) Bootloader
ATTRS{idVendor}=="2e8a", ATTRS{idProduct}=="000f", ENV{ID_MM_DEVICE_IGNORE}="1"

LABEL="mm_usb_device_blacklist_end"

# STM32 DFU Access
SUBSYSTEM=="usb", ATTRS{idVendor}=="0483", ATTRS{idProduct}=="df11", TAG+="uaccess"
# GD32 DFU Access
SUBSYSTEM=="usb", ATTRS{idVendor}=="28e9", ATTRS{idProduct}=="0189", TAG+="uaccess"
# AT32 DFU Access
SUBSYSTEM=="usb", ATTRS{idVendor}=="2e3c", ATTRS{idProduct}=="df11", TAG+="uaccess"
# APM32 DFU Access
SUBSYSTEM=="usb", ATTRS{idVendor}=="314b", ATTRS{idProduct}=="0106", TAG+="uaccess"
# RP2350 (Raspberry Pi Pico) Bootloader Access
SUBSYSTEM=="usb", ATTRS{idVendor}=="2e8a", ATTRS{idProduct}=="000f", TAG+="uaccess"
```

## Using Devcontainers

Both the [betaflight](https://github.com/betaflight/betaflight) and [betaflight-configurator](https://github.com/betaflight/betaflight-configurator) repositories include `.devcontainer/` configurations that follow the open [Development Container Specification](https://containers.dev/). These provide a fully configured build environment out of the box.

Devcontainers work with any editor or tool that supports the spec:

- **VS Code** — via the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
- **devpod** — an open-source wrapper supporting CLion, IntelliJ, WebStorm, Zed, Cursor, and [many more](https://devpod.sh/)
- **Docker / Podman** — directly from the command line, no IDE required

Install Podman (Fedora's default container runtime) if not already present:

```bash
$ sudo dnf install podman
```

For full details see the [Building with Docker](./Building-with-Docker) guide.

## Using Toolbox Containers

[Toolbox](https://containertoolbx.org/) provides isolated development containers on Fedora that share your home directory. This is useful for keeping build dependencies separate from your host system.

Create a Fedora 44 toolbox:

```bash
$ toolbox create betaflight
$ toolbox enter betaflight
```

Inside the toolbox, follow the build instructions above. Serial device access from inside toolbox containers requires the host udev rules to be configured as described in the Serial Permissions section above.

For firmware-only builds, a dedicated toolbox keeps the ARM toolchain isolated:

```bash
$ toolbox create --image registry.fedoraproject.org/fedora-toolbox:44 bf-firmware
$ toolbox enter bf-firmware
$ sudo dnf install git clang libblocksruntime-devel
$ sudo dnf group install "C Development Tools and Libraries"
```

---
sidebar_position: 1
sidebar_label: Building with Docker
title: Building with Docker
---

# Building with Docker / Devcontainers

The Betaflight repository includes a preconfigured devcontainer that provides a consistent build environment across all platforms.

## Prerequisites

### Docker Desktop (Windows/macOS)

1. Download and install Docker Desktop:
   - [Windows](https://docs.docker.com/desktop/setup/install/windows-install/)
   - [macOS](https://docs.docker.com/desktop/setup/install/mac-install/)
2. Ensure Docker is running (check the system tray icon)

### Docker Engine (Linux)

Follow the [official installation guide](https://docs.docker.com/engine/install/) for your distribution.

```bash
# After installation, add your user to the docker group
sudo usermod -aG docker $USER
# Log out and back in for changes to take effect
```

## Option 1: VS Code with Dev Containers (Recommended)

This provides the best development experience with full IDE integration.

### Setup

1. Install [Visual Studio Code](https://code.visualstudio.com/)
2. Install the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
3. Fork and clone the Betaflight repository:
   ```bash
   # Fork betaflight/betaflight on GitHub first, then:
   git clone https://github.com/YOUR_USERNAME/betaflight.git
   cd betaflight
   ```
4. Open the folder in VS Code
5. When prompted "Reopen in Container", click **Yes**
   - Or press `Ctrl+Shift+P` → "Dev Containers: Reopen in Container"

VS Code will build the container and open a terminal inside it. This may take a few minutes the first time.

### Building Firmware

Once inside the container, use the integrated terminal:

```bash
# Build a specific target
make TARGET=SPEEDYBEEF405WING

# Build all targets
make all

# Clean build artifacts
make clean

# See available targets and options
make help
```

## Option 2: Command Line Only

If you prefer not to use VS Code, you can build directly from the command line.

### Build the Container Image

```bash
cd betaflight
docker build -t betaflight-dev -f .devcontainer/containerfile .devcontainer/
```

### Build Firmware

```bash
# Build a specific target
docker run --rm -v ${PWD}:/workspace -w /workspace betaflight-dev make TARGET=SPEEDYBEEF405WING

# Interactive shell for multiple builds
docker run --rm -it -v ${PWD}:/workspace -w /workspace betaflight-dev bash
```

:::tip Windows PowerShell
On Windows PowerShell, use `${PWD}` for the current directory. On CMD, use `%cd%` instead.
:::

## Option 3: Podman (Rootless Alternative)

[Podman](https://podman.io/) is a rootless, daemonless alternative to Docker.

```bash
# Install Podman (see https://podman.io/docs/installation)

# Build the container
podman build -t betaflight-dev -f .devcontainer/containerfile .devcontainer/

# Build firmware
podman run --rm -v ${PWD}:/workspace:Z -w /workspace betaflight-dev make TARGET=SPEEDYBEEF405WING
```

## Hardware Access (Flashing via DFU or UART)

The devcontainer includes `dfu-util` for flashing over USB DFU and `stm32flash` for flashing an STM32 through its UART bootloader with a USB-to-serial adapter (FTDI, CP210x, CH340 and similar). The container runs privileged with the host's `/dev` mounted, so access to these devices is granted by udev rules on the host.

### Linux Host

Set up udev rules on your host system for device access:

1. Create `/etc/udev/rules.d/70-betaflight.rules`:

   ```bash
   # Flight controller USB (VCP)
   # STM32
   SUBSYSTEM=="tty", ATTRS{idVendor}=="0483", ATTRS{idProduct}=="5740", TAG+="uaccess"
   # STM32 ST-Link (NUCLEO boards)
   SUBSYSTEM=="tty", ATTRS{idVendor}=="0483", ATTRS{idProduct}=="374e", TAG+="uaccess"
   # GD32
   SUBSYSTEM=="tty", ATTRS{idVendor}=="28e9", ATTRS{idProduct}=="018a", TAG+="uaccess"
   # AT32
   SUBSYSTEM=="tty", ATTRS{idVendor}=="2e3c", ATTRS{idProduct}=="5740", TAG+="uaccess"
   # APM32
   SUBSYSTEM=="tty", ATTRS{idVendor}=="314b", ATTRS{idProduct}=="5740", TAG+="uaccess"
   # X32
   SUBSYSTEM=="tty", ATTRS{idVendor}=="3997", ATTRS{idProduct}=="5740", TAG+="uaccess"
   # UM32
   SUBSYSTEM=="tty", ATTRS{idVendor}=="396a", ATTRS{idProduct}=="1000", TAG+="uaccess"
   # RP2350 (Raspberry Pi Pico)
   SUBSYSTEM=="tty", ATTRS{idVendor}=="2e8a", ATTRS{idProduct}=="0009", TAG+="uaccess"

   # DFU bootloaders
   # STM32
   SUBSYSTEM=="usb", ATTR{idVendor}=="0483", ATTR{idProduct}=="df11", TAG+="uaccess"
   # GD32
   SUBSYSTEM=="usb", ATTR{idVendor}=="28e9", ATTR{idProduct}=="0189", TAG+="uaccess"
   # AT32
   SUBSYSTEM=="usb", ATTR{idVendor}=="2e3c", ATTR{idProduct}=="df11", TAG+="uaccess"
   # APM32
   SUBSYSTEM=="usb", ATTR{idVendor}=="314b", ATTR{idProduct}=="0106", TAG+="uaccess"
   # X32
   SUBSYSTEM=="usb", ATTR{idVendor}=="3997", ATTR{idProduct}=="df11", TAG+="uaccess"
   # UM32
   SUBSYSTEM=="usb", ATTR{idVendor}=="396a", ATTR{idProduct}=="df00", TAG+="uaccess"
   # RP2350 (Raspberry Pi Pico)
   SUBSYSTEM=="usb", ATTR{idVendor}=="2e8a", ATTR{idProduct}=="000f", TAG+="uaccess"

   # USB-to-serial adapters for stm32flash (these vendors make only bridge chips, so all products match)
   # FTDI
   SUBSYSTEM=="tty", ATTRS{idVendor}=="0403", TAG+="uaccess"
   # Silicon Labs CP210x
   SUBSYSTEM=="tty", ATTRS{idVendor}=="10c4", TAG+="uaccess"
   # WCH CH34x / CH343 / CH9102
   SUBSYSTEM=="tty", ATTRS{idVendor}=="1a86", TAG+="uaccess"
   # Prolific PL2303
   SUBSYSTEM=="tty", ATTRS{idVendor}=="067b", TAG+="uaccess"

   # Vendors that also make other USB devices, so only their bridge products match
   # Microchip MCP2221
   SUBSYSTEM=="tty", ATTRS{idVendor}=="04d8", ATTRS{idProduct}=="00dd", TAG+="uaccess"
   # Microchip MCP2200
   SUBSYSTEM=="tty", ATTRS{idVendor}=="04d8", ATTRS{idProduct}=="00df", TAG+="uaccess"
   # Espressif ESP32-S3/C3 USB-Serial/JTAG
   SUBSYSTEM=="tty", ATTRS{idVendor}=="303a", ATTRS{idProduct}=="1001", TAG+="uaccess"
   ```

   Keep each comment on its own line: udev rejects a rule line that ends in a comment and silently skips that rule.

   The file number must stay below 73: systemd applies `uaccess` in `73-seat-late.rules`, so a tag added by a later file is ignored.

   The rules set no `MODE`, so each device keeps the distribution's default (serial ports `root:dialout`, or `root:uucp` on Arch, mode `0660`; DFU devices `root:root`, mode `0664`) and `uaccess` adds access only for the user logged in at the machine. The container user has the same uid (1000) as the usual first desktop user, so that access carries into the container. On a host without a local login session, for example over SSH, `uaccess` grants nothing: run the flashing tool with `sudo` inside a Docker container (`sudo stm32flash`, `sudo dfu-util`). With Podman, add your host user to `dialout` (`uucp` on Arch) and add `--group-add=keep-groups` to `runArgs` in `.devcontainer/devcontainer.json`; this covers serial ports only, not DFU.

2. Reload udev rules:

   ```bash
   sudo udevadm control --reload-rules
   sudo udevadm trigger
   ```

3. Unplug and replug your flight controller or USB-to-serial adapter

To flash over UART, wire the adapter to the flight controller's UART1 (TX to RX, RX to TX, GND to GND), hold the BOOT button while powering up so the MCU starts in its bootloader, then run inside the container:

```bash
stm32flash -w obj/betaflight_*_SPEEDYBEEF405WING.hex -v -g 0x0 /dev/ttyUSB0
```

Replace `SPEEDYBEEF405WING` with the target you built, and `/dev/ttyUSB0` with your adapter's port (`ls /dev/ttyUSB*` shows it).

### Windows Host

DFU flashing from within the container on Windows requires additional setup. It's recommended to:

- Build in the container
- Flash using [Betaflight Configurator](https://app.betaflight.com) on your Windows host

## Troubleshooting

### Container Build Fails

Ensure Docker has enough resources allocated:

- **Memory**: At least 4GB (8GB recommended for H7 targets)
- **Disk**: At least 10GB free space

### Permission Denied Errors

On Linux, ensure your user is in the `docker` group:

```bash
sudo usermod -aG docker $USER
# Log out and back in
```

### Slow Builds on Windows/macOS

Docker on Windows and macOS runs in a VM, which can slow file operations. For better performance:

- Clone the repository inside the container's filesystem
- Ensure Docker Desktop is using the WSL2 backend (default on modern installations)

## Further Reading

- [Devcontainer README](https://github.com/betaflight/betaflight/blob/master/.devcontainer/README.md) - Detailed devcontainer documentation
- [Development Container Specification](https://containers.dev/) - Official devcontainer spec

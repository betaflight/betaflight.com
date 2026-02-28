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

## Hardware Access (Flashing via DFU)

The devcontainer includes DFU utilities for flashing firmware directly to your flight controller.

### Linux Host

Set up udev rules on your host system for device access:

1. Create `/etc/udev/rules.d/99-betaflight.rules`:

   ```bash
   SUBSYSTEM=="tty", ATTRS{idVendor}=="0483", ATTRS{idProduct}=="5740", MODE="0666", TAG+="uaccess"
   SUBSYSTEM=="usb", ATTR{idVendor}=="0483", ATTR{idProduct}=="df11", MODE="0666"
   ```

2. Reload udev rules:

   ```bash
   sudo udevadm control --reload-rules
   sudo udevadm trigger
   ```

3. Unplug and replug your flight controller

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

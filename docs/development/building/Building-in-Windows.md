---
sidebar_position: 2
sidebar_label: Building in Windows
title: Building in Windows
---

# Building on Windows 11 using the Linux Subsystem

Since Windows 10, there is a new feature that allows any developer to quickly and easily run a complete Linux subsystem in Windows (WSL) and access it via a `bash` terminal. This gives developers full use of the entire Linux OS and all of the great existing Linux tools and programs. When Bash for Windows is up and running it feels like you ssh'd into a full Linux box, except the Linux distro is actually running alongside Windows locally.

The official Microsoft instruction to install WSL is https://msdn.microsoft.com/commandline/wsl/install_guide; However, we will include our own instructions below.

## Install the Ubuntu (WSL) in Windows 11

Open any one of `Windows Terminal`, `Command Prompt` (CMD) or `PowerShell` with elevated privileges. I.e. Search for `Terminal`, `PowerShell`, or `CMD` and select "Run As Administrator".

Execute the following commands in order:

```
dism.exe /online /enable-feature /featurename:Microsoft-Hyper-V-All /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
wsl.exe --install --no-distribution
wsl.exe --update
shutdown.exe /r /f /t 5
```

:::tip
WSL is configured for to use half your physical RAM by default. Newer targets such as G4 and H7 may require 4GB memory or more. Use the Start-menu to search for and open `WSL Settings`. Increase WSL's `Memory Size` to at least `4096` if not already set. Alternatively, when building targets, use the `-j` parameter with the `make` command to reduce memory usage. Example: `make -j 2 [target]`. (Note, some targets such as F4 and F7 will compile with only 2GB.)
:::

After reboot, open an elevated terminal again and run the following commands:

```
wsl.exe --install Ubuntu-24.04
```

After Ubuntu (WSL) is installed, use the Start Menu to search for and run Ubuntu 24.04. It may take some time for the menu index to update. Upon launching Ubuntu, you will be prompted to create a new username and password. Linux is case sensitive, so use a lowercase username.

:::tip
It will be the developers option to create a project-folder. Although not necessary, some examples might be a folder named `Git`, `Github`, or `My-Projects`. In your `bash` terminal, create a folder with `mkdir [foldername]` and change to that folder with `cd [foldername]`.

Example:

```
mkdir Git
cd Git
```

:::

Once you have Ubuntu (WSL) `bash` running properly on Windows, you can follow the "[Building in Ubuntu](Building-in-Ubuntu)" instructions for building Betaflight.

:::note
Linux systems like Ubuntu use an administrator account named `root` which has privileged rights. Regular users can elevate to root privileges with the `sudo` command.

If your newly created user has issue with sudo or otherwise does not have privileges, please refer to option 2 or 3 here: https://www.tenforums.com/tutorials/128094-add-remove-list-sudo-users-wsl-linux-distro-windows-10-a.html#option2
:::

:::note
If you have Internet connectivity issues from within Ubuntu (WSL), then please solve using some of these methods: https://www.google.com/search?hl=en&q=wsl%20no%20internet%20on%20public%20network.

Specifically substituting DNS resolution nameservers with known good DNS servers like 1.1.1.1 (Cloudflare), 8.8.8.8 (Google), or 208.67.222.222 (OpenDNS).
:::

:::info
The file system mapping of WSL is mounted into `Ubuntu 24.04 //wsl/localhost` . They are accessible, but they are mounted with `root:root` permissions. This causes permission issues with a lot of things and leads to errors when trying to build Betaflight from a repository that was cloned in Linux on a local disk under Windows. Therefore, always access, modify and build from the Ubuntu `bash` terminal.
Example folder: `\\wsl.localhost\Ubuntu-24.04\home\username\Git\betaflight`.
:::

:::info
It is not recommended to run WSL inside of a Windows VM (Hypervisor Guest) as the performance will be degraded. If you choose to do so, you will required to enable the `Virtualize Intel VT-x/EPT or AMD-RVI` option or similar in the hypervisor's VM options.
:::

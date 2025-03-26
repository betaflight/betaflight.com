---
sidebar_position: 2
sidebar_label: Building in Windows
title: Building in Windows
---

# Building on Windows 11 using the Linux Subsystem

A new feature in since Windows 10 allows any developer to quickly and easily run an entire Linux subsystem in Windows (WSL) and access it via a `bash` terminal. This gives developers full use of the entire Linux OS and all of the great existing Linux tools and programs. When Bash for Windows is up and running it feels like you ssh'd into a full Linux box, except the Linux distro is actually running alongside Windows locally.

The official Microsoft instruction to install WSL is https://msdn.microsoft.com/commandline/wsl/install_guide; However, we will include our own instructions below.

## Install the Ubuntu (WSL) in Windows 11

Enable WSL2 by opening "Control Panel", "Programs", "Turn Windows features on or off", selecting "Windows Subsystem for Linux", "Hyper-V" and press OK. Reboot if required.

From the Microsoft Store, install the latest Ubuntu LTS (Long Term Support). Reboot if required.

Launch from windows search your Ubuntu, by typing Ubuntu. In the bash screen that opens add a user (lower case) and password.

The Linux system like Ubuntu use an "administrator" which has privileged commands and correspond to user `root` (like windows administrator) then we have regular users we can name as we want. Let's enable administrator!! In a command prompt type `wsl -u root`, then type `passwd root` and set your root password.

In the bash window type `AllowRoot=true`.

Login as root typing "su root" and login with your root password

Before proceeding, edit WSL's DNS resolution with `sudo nano /etc/resolv.conf` and replace nameserver ip with Google's `8.8.8.8`. Type `Ctrl + o` to save and `Ctrl + x` to exit. WSL usually creates a nameserver with dummy 172.xxx.xxx.xxx (Class B network) that doesn't work on public network.

Please note that it will be the developers option to create a project-folder. Although not necessary, some examples might be a folder named `Git`, or `Github` or `My-Projects`. In your `bash` terminal, create a folder with `mkdir [foldername]` and change to that folder with `cd [foldername]`. Example:

```
mkdir Git
cd Git
```

**Note:** The file system mapping of WSL is mounted into `Ubuntu 22.0.4 //wsl/localhost` . They are accessible, but they are mounted with `root:root` permissions. This causes permission issues with a lot of things and leads to errors when trying to build Betaflight from a repository that was cloned in Linux on a local disk under Windows. Therefore, always access, modify and build from the Ubuntu bash. Example folder: `\\wsl.localhost\Ubuntu-22.04\home\username\Git\betaflight`.

Once you have `bash` On Windows running you can follow the "[Building in Ubuntu](Building-in-Ubuntu)" instructions for building Betaflight.

---
sidebar_position: 3
sidebar_label: Building in Mac OS X
title: Building in Mac OS X
---

# Building in Mac OS X

Building in Mac OS X can be accomplished in just a few steps:

- Install general development tools (clang, make, git)
- Checkout Betaflight sourcecode through git
- Install ARM GCC compiler
- Build the code

## Install general development tools (clang, make, git)

Open up a terminal and run `make`. If it is installed already, you should see a message like this, which means that you
already have the required development tools installed:

```
make: *** No targets specified and no makefile found.  Stop.
```

If it isn't installed yet, you might get a popup like this. If so, click the "install" button to install the commandline
developer tools:

![Prompt to install developer tools](../assets/mac-prompt-tools-install.png)

If you just get an error like this instead of a helpful popup prompt:

```
-bash: make: command not found
```

Try running `xcode-select --install` instead to trigger the popup.

If that doesn't work, you'll need to install the Xcode development environment [from the App Store][]. After
installation, open up Xcode and enter its preferences menu. Go to the "downloads" tab and install the
"command line tools" package.

[from the app store]: https://itunes.apple.com/us/app/xcode/id497799835

## Checkout Betaflight sourcecode through git

Enter your development directory and clone the [Betaflight repository][] using the "HTTPS clone URL" which is shown on
the right side of the Betaflight GitHub page, like so:

```
git clone https://github.com/betaflight/betaflight.git
```

This will download the entire betaflight repository for you into a new folder called "betaflight".

[betaflight repository]: https://github.com/betaflight/betaflight

## Install ARM GCC compiler

To install the needed compiler you just need to enter the betaflight directory and run `make arm_sdk_install`

## Build the code

Enter the betaflight directory and run `make configs` to retrieve board targets then `make MATEKH743` to
build firmware for the MATEKH743. When the build completes, the .hex firmware should be available as
`obj/betaflight_2025.12.0_MATEKH743.hex` for you to flash using the Betaflight App.

## Updating to the latest source

If you want to erase your local changes and update to the latest version of the Betaflight source, enter your
betaflight directory and run these commands to first erase your local changes, fetch and merge the latest
changes from the repository, then rebuild the firmware:

```
git reset --hard
git pull

make clean CONFIG=MATEKH743
make MATEKH743
```

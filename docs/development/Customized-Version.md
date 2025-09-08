# Create a Customized Version

Flight controllers have limitations in space and computing capacity. The developers must decide which features to enable or disable in order to create a firmware file that can be used by the majority of users. Cloud build was introduced in firmware 4.4, where users can decide for themselves which required features they want to add.

For example, the official firmware published to users include support for a lot of brands of transmitters and receivers, but habitually you will use only one. This is necessary for a public version, but the protocols not used are spending space that can be used for other features.

This document gives a little guide of how-to start creating your own version, activating and deactivating features, especially if your flight controller is an older one with not too much space.

Keep in mind that when you create your own firmware, you're using a piece of software created by you and can have some bugs that are not present in the official version. **You use it at your own risk**.

## Build the firmware

This document is aimed to people who have some knowledge about programming skills and can build their own firmware. You can find information about this process in the [`building`](/docs/category/building) pages.

Once you are able to compile your own firmware, you can continue to the next section of this document.

When you compile the firmware, the `make` process ends with an info summary of the firmware created, something like this:

```
   text    data     bss     dec     hex filename
 470129    5964   84964  561057   88fa1 ./obj/main/betaflight_STM32F405_STM32F4DISCOVERY.elf
```

The 'text + data' gives you the flash size, and the 'data + bss' is the (static) ram usage. It's recommended to keep the customized version under the values of the unmodified version.

## Specific features for each Flight Controller

Each flight controller has its own file to specify what features are enabled or disabled only for it. Sometimes they have been disabled by space limitations, but other times it's for limited computing capacity or a bug, so enable them at your own risk. These are located in a sub-module within the betaflight repository. The [config repository](https://github.com/betaflight/config) is also available for pull requests (encouraged from both manufacturers or users).

This file is located in `./src/main/configs/config/[FLIGHT_CONTROLLER_NAME]/config.h`.

Cloud build allows you to specify a variety of options to be enabled within the firmware you are flashing.

## Final considerations

As has been said several times in this document, when you activate a feature disabled by the developers, you can overcharge the processor, or include a bug in your firmware version. **So be careful and do it at your own risk**.

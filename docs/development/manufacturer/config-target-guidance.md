# Config Target Guidance - Cloud Build

Due to the increase in poorly designed flight controllers, primarily clones of known poorly designed units, Betaflight is now taking a strong stance on adding targets to our cloud build platform.

From the 1st of July 2024 **ALL** targets presented to the config repository for use in the cloud build system will be required to follow these conditions:


1. Schematics need to be presented with the prospective config file. If your company requires these schematics to not be public they can be emailed to [cloudtargets@betaflight.com](mailto:cloudtargets@betaflight.com)


2. Our team will assess the schematics. If the schematic has resource sharing, lack of DMA and or timers on critical functions eg gyro, motors, sharing SPI bus lines or is a blatant clone of existing designs (especially so if we consider it to be poorly designed), it will be DENIED a target until such time as it is redesigned to both meet the expected performance of the betaflight firmware, and demonstrates it is not merely a clone of an existing design.



:::info

It is advised to start a dialogue with the Betaflight team before you move to making prototypes. The Betaflight team will endeavor to create a reference library to assist manufacturers as early as possible in the process.

:::

3. Due to the increasing number of issues from cheap poor quality hardware hitting the market there will be a target fee for our team to approve and add a target to our system for deployment in the cloud build system. Please contact the team via cloudtargets@betaflight.com for details. Note if you are a hobbyist please contact us via our discord or the above email as we will not be charging non commercial users for target insertion.



:::info

**PLEASE NOTE:** that betaflight is free software, and will continue to be free, however the automated build and delivery system is not free and comes with operational costs. Supporting the costs of running the cloud build system is optional. You are free to distribute your own hexes however you choose. Your customers are able to flash your distributed firmware using the “Load Local” function of the betaflight configuration and maintenance application.

:::

4. If a company wants to collaborate on the design with our team for performance testing, optimisation  and official betaflight approved status to their flight controller we have a numbers of options available via the [Betaflight Partners Program](https://betaflight.com/docs/sponsors/partners) with details available via the email [partnersprogram@betaflight.com](mailto:partnersprogram@betaflight.com)


5. This document was produced to give guidance to manufacturers. Read It [Manufacturer Design Guidelines](https://betaflight.com/docs/development/manufacturer/manufacturer-design-guidelines)


6. If your company is part of the [Betaflight Partners Program](https://betaflight.com/docs/sponsors/partners) already you are exempt from the target fees.

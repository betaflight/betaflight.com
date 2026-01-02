# Requirements for the Submission of New and Updated Targets

The following new requirements for pull requests adding new targets or modifying existing targets are put in place from now on:

1. Hardware should comply with the [Manufacturer Design Guidelines](manufacturer-design-guidelines). Hardware designs that do not comply will NOT be accepted as [Betaflight Supported](betaflight-supported). To avoid costly issues and delays, **please consult the Betaflight developers early in the design process.**

2. New manufacturers are required to be added to the [manufacturers list](https://github.com/betaflight/config/blob/master/Manufacturers.md).

3. For any new targets, a definition file needs to be submitted to [betaflight/config](https://github.com/betaflight/config). See the [instructions](https://betaflight.com/docs/development/manufacturer/creating-configuration) for how to create a configuration file. Ensure you adhere to the [Config Target Guidance](config-target-guidance) also.

4. For changes to existing targets, the existing definition configuration file must be updated in the [Betaflight Config](https://github.com/betaflight/config) repository.

5. Upon approval and merging, you must add [board documentation](/docs/category/boards) as per [documentation guidelines](fc_documentation/how-to-create-board-documentation).

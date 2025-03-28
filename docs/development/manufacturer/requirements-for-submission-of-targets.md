# Requirements for the Submission of New and Updated Targets

The following new requirements for pull requests adding new targets or modifying existing targets are put in place from now on:

1. Hardware must comply with the [Manufacturer Design Guidelines](manufacturer-design-guidelines). Bad hardware designs will not be accepted as described in the [Config Target Guidance](config-target-guidance). To avoid costly issues and delays, **please consult the Betaflight developers early in the design process.**

2. New manufacturers are required to be added to the `Manufacturers.md` list in https://github.com/betaflight/config.

3. For any new targets, a definition file needs to be submitted to https://github.com/betaflight/config. See the [instructions](https://betaflight.com/docs/development/manufacturer/creating-configuration) for how to create a configuration file.

4. For changes to existing targets, consider updating both https://github.com/betaflight/config and https://github.com/betaflight/unified-targets.

5. Upon approval and merging, consider adding [board documentation](/docs/category/boards) as per [documentation guidelines](fc_documentation/how-to-create-board-documentation).

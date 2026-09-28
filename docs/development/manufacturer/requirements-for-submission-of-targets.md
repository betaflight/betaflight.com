# Requirements for the Submission of New and Updated Targets

Pull requests adding new targets or modifying existing targets need to meet the following requirements:

1. Hardware should follow the [Manufacturer Design Guidelines](manufacturer-design-guidelines). Designs outside the guidelines can still be submitted as Manufacturer supported, but are not eligible for [Betaflight Supported](betaflight-supported), see the [Hardware Policy](hardware-policy). To avoid costly issues and delays, **please talk to the Betaflight team early in the design process.**

2. New manufacturers are required to be added to the [manufacturers list](https://github.com/betaflight/config/blob/master/Manufacturers.md). Your four-letter manufacturer ID is also the name of the directory your configs live in, so it must be registered before the first target is submitted. Submissions that have no registered vendor use one of the reserved IDs already in that list (`CUST`, `FOSS`, `COMM`, `LEGA`) and need no new entry.

3. For any new targets, a definition file needs to be submitted to [betaflight/config](https://github.com/betaflight/config), placed at `configs/<MANUFACTURER_ID>/<BOARD_NAME>/config.h`. Board names must be unique across the whole repository. See the [instructions](https://betaflight.com/docs/development/manufacturer/creating-configuration) for how to create a configuration file. Ensure you adhere to the [Config Target Guidance](config-target-guidance) also.

4. For changes to existing targets, the existing definition configuration file must be updated in the [Betaflight Config](https://github.com/betaflight/config) repository.

5. Pull requests to the config repository must be raised from a custom branch, not from `master`. Pull requests from `master` are closed automatically.

6. Upon approval and merging, you must add [board documentation](/docs/category/boards) as per [documentation guidelines](fc_documentation/how-to-create-board-documentation).

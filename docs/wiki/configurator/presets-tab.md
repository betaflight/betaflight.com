---
sidebar_position: 6
---

# Presets Tab

Presets offer an easy way to configure your settings. They are short snippets of CLI commands that can be
applied to your configuration. Everything from tune presets to product-specific settings. You can also create your own presets and share them with the community.

![Presets tab](/img/betaflight_configurator_presets_tab.png)

## Search Filters

Narrow down your search by using the search filters. You can filter by:

- **Category** - Select from multiple common categories for a wide range of presets. Categories include:
  - **FILTERS**
  - **LEDS**
  - **MODES**
  - **OSD**
  - **OTHER**
  - **RATES**
  - **RC_LINK**
  - **TUNE**
  - **VTX**
- **Keywords** - Enter keywords to search for in the preset name and description, allows for a more specific search
- **Author** - Select from a list of authors to filter presets by
- **Firmware** - Select from a list of firmware versions to filter presets by
- **Status** - Select from various statuses to filter presets by
  - **OFFICIAL** - Presets that are made and/or officially supported by the Betaflight team. Usually more
    advanced and/or specific to a particular setting
  - **COMMUNITY** - Presets that are made by other users in the community. Often for specific products
    (like VTX tables) and pilot rates
  - **EXPERIMENTAL** - Presets that are in development and in the process of being tested

## Preset Preview

View the basic info for a preset in the results, and a detailed description of the preset along with its
options when opened

### Result Preview

Shows basic information about the preset, including the name, description, author, firmware version, and status.

![Preset preview](/img/betaflight_configurator_preset_1.png)

### Preset Details

Shows the same info as the result preview, along with detailed information about the preset:

- **Options** - A list of options that can be configured for the preset to change its behavior (for example
  to pick motor KV for a tune preset, or link options for receiver presets)
- **Description** - A detailed description of the preset and its options, including any warnings or
  recommendations
- **Discussion** - A link to the Pull Request for the preset, where you can see and contribute to the
  discussion about the preset
- **View online** - A link to the preset file, where you can view the preset's code
- **View CLI** - View the CLI commands that will be applied when the preset is selected
- **Close** - Close the preset details
- **Apply** - Apply the preset to your configuration

![Preset preview](/img/betaflight_configurator_preset_2.png)

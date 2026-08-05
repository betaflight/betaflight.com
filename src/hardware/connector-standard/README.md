# Connector Standard Render Source

The KiCad project in `kicad/` is the source for the connector-standard schematic and PCB images published from `static/img/connector_standard/`.

## Crop Areas

Each connector must have the same lowercase, hyphenated crop name in both editors, for example `esc-connector`.

In the Schematic Editor:

1. Draw one rectangular rule area around the connector.
2. Leave all rule-area attributes disabled.
3. Group the rule area with the connector circuit.
4. Give the group the crop name.

In the PCB Editor:

1. Draw one rectangular rule area around the board coupon.
2. Allow tracks, vias, pads, copper pours, and footprints, and disable placement rules.
3. Give the rule area the same crop name as the schematic group.

The renderer validates that crop areas are axis-aligned rectangles, names are unique, and the two editors contain the same names. Hyphens in crop names become underscores in generated filenames.

Schematic crop guides are removed from a temporary project copy before export. PCB rule areas do not appear in the 3D renderer. The checked-in KiCad project is never modified by the script.

The PCB render uses the solder-mask colors from **Board Setup → Board Stackup → Physical Stackup**. Set both mask layers to black there to match the current connector-standard artwork.

## Commands

Install Node.js 20 or later and KiCad 10.0.0, then run:

```sh
npm ci
npm run validate:connector-standard
npm run render:connector-standard
```

`render:connector-standard` locates `kicad-cli` on `PATH` and in the standard KiCad 10 Windows installation directory. Set `KICAD_CLI` to use another executable:

```sh
KICAD_CLI=/opt/kicad/bin/kicad-cli npm run render:connector-standard
```

Generated files retain the existing documentation filenames:

```text
static/img/connector_standard/esc_connector_schematic.png
static/img/connector_standard/esc_connector_render.png
static/img/connector_standard/uart_connector_schematic.png
static/img/connector_standard/uart_connector_render.png
static/img/connector_standard/bf_connector_standard.svg
static/img/connector_standard/bf_connector_standard.pdf
```

CI runs `npm run check:connector-standard`, which renders into a temporary directory and fails when the generated artwork differs from its committed counterpart. PNG and SVG comparisons allow only a tightly bounded one-level antialiasing difference between platforms. The PDF embeds a deterministic SHA-256 source fingerprint and is checked by that fingerprint and its stable document structure because KiCad orders visually equivalent PDF drawing streams differently on Windows and Linux.

The repository-owned `render-theme.json` controls schematic colors, default PCB materials, lighting background, and other presentation details. Explicit board-stackup colors take precedence over its material defaults. KiCad is given an isolated temporary configuration directory, so rendering does not modify or depend on the user's KiCad preferences.

Geist Bold and Geist Mono Medium 1.7.2 are vendored in `fonts/` under the SIL Open Font License. The renderer exposes only this repository-owned font directory to KiCad, uses Geist Mono Medium for the schematic SVG and cropped schematic images, and uses Geist Bold for PCB silkscreen text. The downloadable schematic PDF retains KiCad's built-in stroke font because KiCad writes outline-font PDF subsets in nondeterministic order.

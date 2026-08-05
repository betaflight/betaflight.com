import path from 'node:path';
import { copyFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const schematicSource = path.join(__dirname, '..', 'src', 'hardware', 'connector-standard', 'kicad', 'connector-standard.kicad_sch');
const schematicStaticPath = path.join(__dirname, '..', 'static', 'img', 'connector_standard', 'connector-standard.kicad_sch');

/** @returns {import('@docusaurus/types').PluginModule} */
export default function connectorSchematicPlugin() {
  return {
    name: 'docusaurus-plugin-connector-schematic',
    async loadContent() {
      await mkdir(path.dirname(schematicStaticPath), { recursive: true });
      await copyFile(schematicSource, schematicStaticPath);
    },
    getPathsToWatch() {
      return [schematicSource];
    },
  };
}

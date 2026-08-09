import path from 'node:path';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { zipSync } from 'fflate';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectName = 'connector-standard';
const projectDirectory = path.join(__dirname, '..', 'src', 'hardware', 'connector-standard', 'kicad');
const projectSources = ['kicad_sch', 'kicad_pcb', 'kicad_pro'].map((extension) => path.join(projectDirectory, `${projectName}.${extension}`));
const archivePath = path.join(__dirname, '..', 'static', 'img', 'connector_standard', `${projectName}.zip`);

async function createProjectArchive() {
  await mkdir(path.dirname(archivePath), { recursive: true });
  const entries = await Promise.all(projectSources.map(async (source) => [path.basename(source), await readFile(source)]));
  await writeFile(archivePath, zipSync(Object.fromEntries(entries), { level: 9 }));
}

/** @returns {import('@docusaurus/types').PluginModule} */
export default function connectorSchematicPlugin() {
  return {
    name: 'docusaurus-plugin-connector-schematic',
    async loadContent() {
      await createProjectArchive();
    },
    getPathsToWatch() {
      return projectSources;
    },
  };
}

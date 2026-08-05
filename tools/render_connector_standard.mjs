import { execFile as execFileCallback, spawn } from 'node:child_process';
import { access, copyFile, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { constants as fsConstants } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

import sharp from 'sharp';

const execFile = promisify(execFileCallback);
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const hardwareDir = join(repoRoot, 'src', 'hardware', 'connector-standard');
const projectDir = resolve(process.env.CONNECTOR_STANDARD_KICAD_DIR || join(hardwareDir, 'kicad'));
const projectBase = 'connector-standard';
const schematicPath = join(projectDir, `${projectBase}.kicad_sch`);
const boardPath = join(projectDir, `${projectBase}.kicad_pcb`);
const projectPath = join(projectDir, `${projectBase}.kicad_pro`);
const themePath = join(hardwareDir, 'render-theme.json');
const fontsDir = join(hardwareDir, 'fonts');
const assetsDir = resolve(process.env.CONNECTOR_STANDARD_ASSETS_DIR || join(repoRoot, 'static', 'img', 'connector_standard'));
const outputPrefix = 'render:';
const schematicFont = 'Geist Mono Medium';
const schematicSize = 1024;
const boardSize = schematicSize;
const boardSourceSize = 8192;
const boardSourceZoom = 0.9;
const kicadMajorMinor = '10.0';
const kicadVersion = '10.0.0';

function parseArguments(argv) {
  const options = { check: false, validate: false, kicadCli: process.env.KICAD_CLI || '' };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];

    if (argument === '--check') {
      options.check = true;
    } else if (argument === '--validate') {
      options.validate = true;
    } else if (argument === '--kicad-cli') {
      options.kicadCli = argv[++index] || '';
    } else {
      throw new Error(`Unknown argument: ${argument}`);
    }
  }

  return options;
}

function parseSExpression(source) {
  let position = 0;

  function skipTrivia() {
    while (position < source.length) {
      if (/\s/.test(source[position])) {
        position += 1;
      } else if (source[position] === ';') {
        while (position < source.length && source[position] !== '\n') {
          position += 1;
        }
      } else {
        break;
      }
    }
  }

  function parseString() {
    const start = position;
    let value = '';
    position += 1;

    while (position < source.length) {
      const character = source[position++];
      if (character === '"') {
        return { type: 'atom', value, quoted: true, start, end: position };
      }

      if (character === '\\') {
        if (position >= source.length) {
          throw new Error(`Unterminated escape sequence at byte ${position}`);
        }
        const escaped = source[position++];
        value += { n: '\n', r: '\r', t: '\t' }[escaped] ?? escaped;
      } else {
        value += character;
      }
    }

    throw new Error(`Unterminated string at byte ${start}`);
  }

  function parseAtom() {
    const start = position;
    while (position < source.length && !/[\s()]/.test(source[position])) {
      position += 1;
    }
    if (position === start) {
      throw new Error(`Expected an atom at byte ${position}`);
    }
    return { type: 'atom', value: source.slice(start, position), quoted: false, start, end: position };
  }

  function parseList() {
    const start = position;
    const children = [];
    position += 1;

    while (position < source.length) {
      skipTrivia();
      if (source[position] === ')') {
        position += 1;
        return { type: 'list', children, start, end: position };
      }

      children.push(parseNode());
    }

    throw new Error(`Unterminated list at byte ${start}`);
  }

  function parseNode() {
    skipTrivia();
    if (source[position] === '(') {
      return parseList();
    }
    if (source[position] === '"') {
      return parseString();
    }
    return parseAtom();
  }

  const forms = [];
  while (position < source.length) {
    skipTrivia();
    if (position < source.length) {
      forms.push(parseNode());
    }
  }

  return forms;
}

function head(node) {
  return node?.type === 'list' && node.children[0]?.type === 'atom' ? node.children[0].value : undefined;
}

function directChildren(node, name) {
  return node.children.filter((child) => head(child) === name);
}

function directChild(node, name) {
  return directChildren(node, name)[0];
}

function atomValue(node, index = 1) {
  const atom = node?.children[index];
  if (atom?.type !== 'atom') {
    throw new Error(`Expected atom ${index} in ${head(node) || 'expression'}`);
  }
  return atom.value;
}

function pointsFrom(node) {
  const pointsNode = directChild(node, 'pts');
  if (!pointsNode) {
    throw new Error(`${head(node)} has no point list`);
  }

  return directChildren(pointsNode, 'xy').map((point) => ({ x: Number(atomValue(point, 1)), y: Number(atomValue(point, 2)) }));
}

function rectangleBounds(points, description) {
  if (points.length > 1 && points[0].x === points.at(-1).x && points[0].y === points.at(-1).y) {
    points = points.slice(0, -1);
  }
  if (points.length !== 4) {
    throw new Error(`${description} must have exactly four corners; found ${points.length}`);
  }

  const xs = [...new Set(points.map((point) => point.x))].sort((a, b) => a - b);
  const ys = [...new Set(points.map((point) => point.y))].sort((a, b) => a - b);
  const corners = new Set(points.map((point) => `${point.x},${point.y}`));

  if (xs.length !== 2 || ys.length !== 2 || xs.some((x) => ys.some((y) => !corners.has(`${x},${y}`)))) {
    throw new Error(`${description} must be an axis-aligned rectangle`);
  }

  return { minX: xs[0], minY: ys[0], maxX: xs[1], maxY: ys[1], width: xs[1] - xs[0], height: ys[1] - ys[0] };
}

function canonicalName(name) {
  const canonical = name.startsWith(outputPrefix) ? name.slice(outputPrefix.length) : name;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(canonical)) {
    throw new Error(`Crop name "${name}" must use lowercase letters, numbers, and hyphens`);
  }
  return canonical;
}

function outputSlug(name) {
  return canonicalName(name).replaceAll('-', '_');
}

function readSchematicCrops(source) {
  const root = parseSExpression(source).find((node) => head(node) === 'kicad_sch');
  if (!root) {
    throw new Error('Could not find the kicad_sch root expression');
  }

  const ruleAreas = directChildren(root, 'rule_area').map((node) => {
    const polyline = directChild(node, 'polyline');
    const uuid = atomValue(directChild(polyline, 'uuid'));
    return { node, uuid, bounds: rectangleBounds(pointsFrom(polyline), `Schematic rule area ${uuid}`) };
  });
  const areasByUuid = new Map(ruleAreas.map((area) => [area.uuid, area]));
  const crops = [];

  for (const group of directChildren(root, 'group')) {
    const name = atomValue(group);
    const members =
      directChild(group, 'members')
        ?.children.slice(1)
        .filter((child) => child.type === 'atom')
        .map((child) => child.value) || [];
    const memberAreas = members.map((uuid) => areasByUuid.get(uuid)).filter(Boolean);
    if (memberAreas.length === 0) {
      continue;
    }
    if (memberAreas.length !== 1) {
      throw new Error(`Schematic group "${name}" contains ${memberAreas.length} crop rule areas; expected one`);
    }

    crops.push({ name: canonicalName(name), bounds: memberAreas[0].bounds, guideNode: memberAreas[0].node, groupNode: group });
  }

  if (crops.length === 0) {
    throw new Error('No schematic groups containing crop rule areas were found');
  }
  assertUniqueNames(crops, 'schematic');
  return crops.sort((a, b) => a.name.localeCompare(b.name));
}

function readBoardCrops(source) {
  const root = parseSExpression(source).find((node) => head(node) === 'kicad_pcb');
  if (!root) {
    throw new Error('Could not find the kicad_pcb root expression');
  }

  const crops = directChildren(root, 'zone')
    .filter((node) => directChild(node, 'keepout') && directChild(node, 'name'))
    .map((node) => {
      const name = canonicalName(atomValue(directChild(node, 'name')));
      const polygon = directChild(node, 'polygon');
      return { name, bounds: rectangleBounds(pointsFrom(polygon), `PCB rule area "${name}"`) };
    });

  if (crops.length === 0) {
    throw new Error('No named PCB keepout rule areas were found');
  }
  assertUniqueNames(crops, 'PCB');

  const edgeRectangles = directChildren(root, 'gr_rect')
    .filter((node) => atomValue(directChild(node, 'layer')) === 'Edge.Cuts')
    .map((node) => {
      const start = directChild(node, 'start');
      const end = directChild(node, 'end');
      return rectangleBounds(
        [
          { x: Number(atomValue(start, 1)), y: Number(atomValue(start, 2)) },
          { x: Number(atomValue(end, 1)), y: Number(atomValue(start, 2)) },
          { x: Number(atomValue(end, 1)), y: Number(atomValue(end, 2)) },
          { x: Number(atomValue(start, 1)), y: Number(atomValue(end, 2)) },
        ],
        'Edge.Cuts rectangle',
      );
    });

  if (edgeRectangles.length === 0) {
    throw new Error('No rectangular Edge.Cuts board outlines were found');
  }
  return { crops: crops.sort((a, b) => a.name.localeCompare(b.name)), boardBounds: unionBounds(edgeRectangles) };
}

function assertUniqueNames(items, kind) {
  const names = new Set();
  for (const item of items) {
    if (names.has(item.name)) {
      throw new Error(`Duplicate ${kind} crop name "${item.name}"`);
    }
    names.add(item.name);
  }
}

function unionBounds(items) {
  return {
    minX: Math.min(...items.map((item) => item.minX)),
    minY: Math.min(...items.map((item) => item.minY)),
    maxX: Math.max(...items.map((item) => item.maxX)),
    maxY: Math.max(...items.map((item) => item.maxY)),
    width: Math.max(...items.map((item) => item.maxX)) - Math.min(...items.map((item) => item.minX)),
    height: Math.max(...items.map((item) => item.maxY)) - Math.min(...items.map((item) => item.minY)),
  };
}

function validateMatchingCrops(schematicCrops, boardCrops) {
  const schematicNames = schematicCrops.map((crop) => crop.name);
  const boardNames = boardCrops.map((crop) => crop.name);
  const missingOnBoard = schematicNames.filter((name) => !boardNames.includes(name));
  const missingOnSchematic = boardNames.filter((name) => !schematicNames.includes(name));

  if (missingOnBoard.length || missingOnSchematic.length) {
    const details = [];
    if (missingOnBoard.length) {
      details.push(`missing on PCB: ${missingOnBoard.join(', ')}`);
    }
    if (missingOnSchematic.length) {
      details.push(`missing on schematic: ${missingOnSchematic.join(', ')}`);
    }
    throw new Error(`Schematic and PCB crop names do not match (${details.join('; ')})`);
  }
}

function removeSourceRanges(source, ranges) {
  return [...ranges].sort((a, b) => b.start - a.start).reduce((result, range) => `${result.slice(0, range.start)}${result.slice(range.end)}`, source);
}

function normalizedSvg(svg) {
  return svg.replace(/<title>SVG Image created as [^<]*<\/title>/, '<title>Betaflight Connector Standard</title>').replace(/[ \t]+$/gm, '');
}

function croppedSvg(svg, bounds) {
  const size = Math.max(bounds.width, bounds.height);
  const x = bounds.minX - (size - bounds.width) / 2;
  const y = bounds.minY - (size - bounds.height) / 2;
  const svgStart = svg.indexOf('<svg');
  const tagEnd = svg.indexOf('>', svgStart);
  if (svgStart < 0 || tagEnd < 0) {
    throw new Error('Exported schematic is not an SVG document');
  }

  let tag = svg.slice(svgStart, tagEnd + 1);
  tag = tag.replace(/\bwidth="[^"]+"/, `width="${schematicSize}"`);
  tag = tag.replace(/\bheight="[^"]+"/, `height="${schematicSize}"`);
  tag = tag.replace(/\bviewBox="[^"]+"/, `viewBox="${x.toFixed(4)} ${y.toFixed(4)} ${size.toFixed(4)} ${size.toFixed(4)}"`);
  return `${svg.slice(0, svgStart)}${tag}${svg.slice(tagEnd + 1)}`;
}

function normalizePdf(buffer) {
  const text = buffer.toString('latin1').replace(/\/CreationDate \(D:\d{4}:\d{2}:\d{2}:\d{2}:\d{2}:\d{2}\)/g, '/CreationDate (D:2000:01:01:00:00:00)');
  return Buffer.from(text, 'latin1');
}

async function visiblePixelBounds(path) {
  const { data, info } = await sharp(path).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let minX = info.width;
  let minY = info.height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      if (data[(y * info.width + x) * 4 + 3] === 0) {
        continue;
      }
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }

  if (maxX < 0) {
    throw new Error('KiCad produced an empty PCB render');
  }
  return { minX, minY, maxX, maxY, width: maxX - minX + 1, height: maxY - minY + 1, imageWidth: info.width, imageHeight: info.height };
}

function boardBackgroundSvg(theme) {
  const top = theme['3d_viewer']?.background_top;
  const bottom = theme['3d_viewer']?.background_bottom;
  const validColor = /^rgba?\([\d.,\s]+\)$/;
  if (!validColor.test(top) || !validColor.test(bottom)) {
    throw new Error('Render theme must define valid 3D background_top and background_bottom colors');
  }

  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${boardSize}" height="${boardSize}">
  <defs><linearGradient id="background" x1="0" y1="0" x2="0" y2="1"><stop stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs>
  <rect width="100%" height="100%" fill="url(#background)"/>
</svg>`);
}

async function pathExists(path) {
  try {
    await access(path, fsConstants.X_OK);
    return true;
  } catch {
    return false;
  }
}

async function findKicadCli(explicitPath) {
  if (explicitPath) {
    const path = resolve(explicitPath);
    if (!(await pathExists(path))) {
      throw new Error(`KiCad CLI does not exist or is not executable: ${path}`);
    }
    return path;
  }

  const command = process.platform === 'win32' ? 'where.exe' : 'which';
  try {
    const { stdout } = await execFile(command, ['kicad-cli']);
    const firstPath = stdout.split(/\r?\n/).find(Boolean);
    if (firstPath) {
      return firstPath.trim();
    }
  } catch {
    // Try the standard Windows installation locations below.
  }

  if (process.platform === 'win32') {
    for (const path of [String.raw`C:\Program Files\KiCad\${kicadMajorMinor}\bin\kicad-cli.exe`, String.raw`C:\Program Files\KiCad\10.0\bin\kicad-cli.exe`]) {
      if (await pathExists(path)) {
        return path;
      }
    }
  }

  throw new Error('Could not find kicad-cli. Install KiCad 10 or set the KICAD_CLI environment variable.');
}

async function run(command, args, environment) {
  await new Promise((resolvePromise, reject) => {
    const child = spawn(command, args, { env: environment, stdio: 'inherit', windowsHide: true });
    child.once('error', reject);
    child.once('exit', (code) => (code === 0 ? resolvePromise() : reject(new Error(`${basename(command)} exited with code ${code}`))));
  });
}

async function prepareKicadEnvironment(tempRoot) {
  const configRoot = join(tempRoot, 'config');
  const colorsDir = join(configRoot, kicadMajorMinor, 'colors');
  const fontCacheDir = join(tempRoot, 'font-cache');
  const fontConfigPath = join(configRoot, 'fonts.conf');
  await Promise.all([mkdir(colorsDir, { recursive: true }), mkdir(fontCacheDir, { recursive: true })]);
  await copyFile(themePath, join(colorsDir, 'betaflight-connector-standard.json'));
  const xmlPath = (path) => path.replaceAll('\\', '/').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  await writeFile(
    fontConfigPath,
    `<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "urn:fontconfig:fonts.dtd">
<fontconfig>
  <dir>${xmlPath(fontsDir)}</dir>
  <cachedir>${xmlPath(fontCacheDir)}</cachedir>
</fontconfig>
`,
  );

  return {
    ...process.env,
    FONTCONFIG_FILE: fontConfigPath,
    FONTCONFIG_PATH: configRoot,
    KICAD_CONFIG_HOME: configRoot,
    XDG_CONFIG_HOME: configRoot,
  };
}

async function exportSchematicFiles(kicadCli, tempSchematicPath, schematicExportDir, generatedDir, theme, environment) {
  await run(kicadCli, ['sch', 'export', 'svg', '--output', schematicExportDir, '--theme', theme, '--default-font', schematicFont, tempSchematicPath], environment);
  // KiCad emits outline-font PDF subsets in nondeterministic object order.
  // Keep the downloadable PDF on the deterministic built-in stroke font;
  // the SVG and cropped schematic images use the selected render font.
  await run(kicadCli, ['sch', 'export', 'pdf', '--output', join(generatedDir, 'bf_connector_standard.pdf'), '--theme', theme, tempSchematicPath], environment);

  const exportedSvgPath = join(schematicExportDir, `${projectBase}.svg`);
  const svg = normalizedSvg(await readFile(exportedSvgPath, 'utf8'));
  await writeFile(join(generatedDir, 'bf_connector_standard.svg'), svg);
  return svg;
}

async function renderSchematicCropImages(svg, schematicCrops, generatedDir) {
  for (const crop of schematicCrops) {
    const target = join(generatedDir, `${outputSlug(crop.name)}_schematic.png`);
    await sharp(Buffer.from(croppedSvg(svg, crop.bounds)))
      .png({ compressionLevel: 9, adaptiveFiltering: false })
      .toFile(target);
  }
}

async function renderBoardCropImages({ rawBoardPath, boardCrops, boardCenter, visibleBounds, pixelsPerMillimeter, panelCenter, background, generatedDir }) {
  for (const crop of boardCrops) {
    const cropSpan = Math.max(crop.bounds.width, crop.bounds.height);
    const cropCenter = { x: (crop.bounds.minX + crop.bounds.maxX) / 2, y: (crop.bounds.minY + crop.bounds.maxY) / 2 };
    const target = join(generatedDir, `${outputSlug(crop.name)}_render.png`);
    const cropPixels = Math.round(cropSpan * pixelsPerMillimeter);
    const centerX = panelCenter.x + (cropCenter.x - boardCenter.x) * pixelsPerMillimeter;
    const centerY = panelCenter.y + (cropCenter.y - boardCenter.y) * pixelsPerMillimeter;
    const extract = { left: Math.round(centerX - cropPixels / 2), top: Math.round(centerY - cropPixels / 2), width: cropPixels, height: cropPixels };

    if (cropPixels < boardSize) {
      throw new Error(`PCB crop "${crop.name}" is only ${cropPixels}px before the ${boardSize}px output resize; increase boardSourceSize to avoid upscaling`);
    }

    if (extract.left < 0 || extract.top < 0 || extract.left + extract.width > visibleBounds.imageWidth || extract.top + extract.height > visibleBounds.imageHeight) {
      throw new Error(`PCB crop "${crop.name}" extends outside the source render; reduce boardSourceZoom`);
    }

    const foreground = await sharp(rawBoardPath).extract(extract).resize(boardSize, boardSize, { fit: 'fill' }).png().toBuffer();
    await sharp(background)
      .composite([{ input: foreground }])
      .png({ compressionLevel: 9, adaptiveFiltering: false })
      .toFile(target);
  }
}

function listGeneratedFiles(schematicCrops, boardCrops) {
  return [
    'bf_connector_standard.svg',
    'bf_connector_standard.pdf',
    ...schematicCrops.map((crop) => `${outputSlug(crop.name)}_schematic.png`),
    ...boardCrops.map((crop) => `${outputSlug(crop.name)}_render.png`),
  ];
}

async function verifyGeneratedAssets(generatedFiles, generatedDir) {
  const stale = [];
  for (const file of generatedFiles) {
    const generated = await readFile(join(generatedDir, file));
    try {
      const committed = await readFile(join(assetsDir, file));
      if (!generated.equals(committed)) {
        stale.push(file);
      }
    } catch {
      stale.push(`${file} (missing)`);
    }
  }

  if (stale.length) {
    throw new Error(`Generated connector-standard assets are stale:\n  ${stale.join('\n  ')}\nRun npm run render:connector-standard and commit the results.`);
  }
  console.log(`Verified ${generatedFiles.length} generated connector-standard assets.`);
}

async function publishGeneratedAssets(generatedFiles, generatedDir, version) {
  await mkdir(assetsDir, { recursive: true });
  await Promise.all(generatedFiles.map((file) => copyFile(join(generatedDir, file), join(assetsDir, file))));
  console.log(`Rendered ${generatedFiles.length} connector-standard assets with KiCad ${version}.`);
}

async function syncGeneratedAssets(options, generatedFiles, generatedDir, version) {
  if (options.check) {
    await verifyGeneratedAssets(generatedFiles, generatedDir);
  } else {
    await publishGeneratedAssets(generatedFiles, generatedDir, version);
  }
}

async function render(options, schematicSource, schematicCrops, boardCrops, boardBounds) {
  const kicadCli = await findKicadCli(options.kicadCli);
  const { stdout: versionOutput } = await execFile(kicadCli, ['version']);
  const version = versionOutput.trim();
  if (version !== kicadVersion) {
    throw new Error(`Expected KiCad ${kicadVersion}, found ${version}`);
  }

  const tempRoot = await mkdtemp(join(tmpdir(), 'betaflight-connector-standard-'));
  const tempProjectDir = join(tempRoot, 'project');
  const generatedDir = join(tempRoot, 'generated');
  const schematicExportDir = join(tempRoot, 'schematic-export');
  const environment = await prepareKicadEnvironment(tempRoot);

  try {
    await Promise.all([mkdir(tempProjectDir, { recursive: true }), mkdir(generatedDir, { recursive: true }), mkdir(schematicExportDir, { recursive: true })]);

    const rangesToRemove = schematicCrops.flatMap((crop) => [crop.guideNode, crop.groupNode]);
    const cleanSchematic = removeSourceRanges(schematicSource, rangesToRemove);
    const tempSchematicPath = join(tempProjectDir, `${projectBase}.kicad_sch`);
    await writeFile(tempSchematicPath, cleanSchematic);
    await copyFile(projectPath, join(tempProjectDir, `${projectBase}.kicad_pro`));

    const theme = 'Betaflight Connector Standard';
    const svg = await exportSchematicFiles(kicadCli, tempSchematicPath, schematicExportDir, generatedDir, theme, environment);
    await renderSchematicCropImages(svg, schematicCrops, generatedDir);

    const boardCenter = { x: (boardBounds.minX + boardBounds.maxX) / 2, y: (boardBounds.minY + boardBounds.maxY) / 2 };
    const rawBoardPath = join(tempRoot, 'board-panel-raw.png');

    await run(
      kicadCli,
      [
        'pcb',
        'render',
        '--output',
        rawBoardPath,
        '--width',
        String(boardSourceSize),
        '--height',
        String(boardSourceSize),
        '--side',
        'top',
        '--background',
        'transparent',
        '--quality',
        'basic',
        '--preset',
        theme,
        '--zoom',
        String(boardSourceZoom),
        boardPath,
      ],
      environment,
    );

    const visibleBounds = await visiblePixelBounds(rawBoardPath);
    const pixelsPerMillimeter = ((visibleBounds.width - 1) / boardBounds.width + (visibleBounds.height - 1) / boardBounds.height) / 2;
    const panelCenter = { x: (visibleBounds.minX + visibleBounds.maxX) / 2, y: (visibleBounds.minY + visibleBounds.maxY) / 2 };
    const background = boardBackgroundSvg(JSON.parse(await readFile(themePath, 'utf8')));
    await renderBoardCropImages({
      rawBoardPath,
      boardCrops,
      boardCenter,
      visibleBounds,
      pixelsPerMillimeter,
      panelCenter,
      background,
      generatedDir,
    });

    const pdfPath = join(generatedDir, 'bf_connector_standard.pdf');
    await writeFile(pdfPath, normalizePdf(await readFile(pdfPath)));
    const generatedFiles = listGeneratedFiles(schematicCrops, boardCrops);
    await syncGeneratedAssets(options, generatedFiles, generatedDir, version);
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  const [schematicSource, boardSource] = await Promise.all([readFile(schematicPath, 'utf8'), readFile(boardPath, 'utf8')]);
  const schematicCrops = readSchematicCrops(schematicSource);
  const { crops: boardCrops, boardBounds } = readBoardCrops(boardSource);
  validateMatchingCrops(schematicCrops, boardCrops);

  console.log(`Found ${schematicCrops.length} connector crop pairs: ${schematicCrops.map((crop) => crop.name).join(', ')}`);
  if (!options.validate) {
    await render(options, schematicSource, schematicCrops, boardCrops, boardBounds);
  }
}

main().catch((error) => {
  console.error(`Connector-standard render failed: ${error.message}`);
  process.exitCode = 1;
});

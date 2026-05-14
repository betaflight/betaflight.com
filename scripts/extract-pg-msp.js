/**
 * extract-pg-msp.js
 *
 * Reads Betaflight firmware source and generates reference tables for:
 *   - Parameter Groups (PG): docs/development/Parameter-Group-Reference.md
 *   - MSP codes + payload fields: docs/development/MSP-Protocol-Reference-Dev.md
 *   - JSON snapshot: static/resources/pg-msp-data.json
 *
 * Usage:
 *   node scripts/extract-pg-msp.js --firmware-path <path-to-betaflight-repo>
 *
 * Known limitations:
 *   - defaultLookup (default values) and fieldLookup (min/max/type) are keyed by field name
 *     only, not by struct type. First match across all .c files wins. Fields with the same
 *     name in different structs (e.g. `enabled`, `rate`) may get defaults/ranges from an
 *     unrelated struct. The "Default", "Min", "Max" columns in MSP payload tables are
 *     best-effort and should be verified against firmware source for critical values.
 *   - Byte offsets after variable-length fields (sbufWriteData/sbufWriteString) are shown
 *     as "?" because the field size is unknown at parse time.
 *   - MSP case detection uses a break-indent heuristic: a bare `break;` at ≤8 spaces
 *     indentation is treated as ending the current case. This works for Betaflight's
 *     standard formatting but would misfire on a standalone `break;` inside a multi-line
 *     if-body at that indentation level.
 *   - PG_REGISTER_ARRAY argument capture uses `[^)]*` which stops at the first `)`.
 *     A size argument containing nested parentheses (e.g. `sizeof(type)`) would truncate
 *     the match, causing rawArgs to have fewer than 5 elements and the macro to be skipped.
 *     All current Betaflight firmware PG_REGISTER_ARRAY calls use plain numeric size args,
 *     so this is not a current problem, but it would silently drop entries if that changes.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const fwIdx = args.indexOf('--firmware-path');
if (fwIdx === -1 || !args[fwIdx + 1]) {
  console.error('Usage: node scripts/extract-pg-msp.js --firmware-path <path>');
  console.error('');
  console.error('  --firmware-path  Absolute path to betaflight firmware repo root');
  process.exit(1);
}

const firmwarePath = path.resolve(args[fwIdx + 1]);
if (!fs.existsSync(firmwarePath)) {
  console.error(`Error: firmware path not found: ${firmwarePath}`);
  process.exit(1);
}

let firmwareCommit = null;
try {
  firmwareCommit = execSync('git rev-parse HEAD', { cwd: firmwarePath, encoding: 'utf-8' }).trim();
} catch {
  console.warn('Warning: could not determine firmware git commit (not a git repo?)');
}

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(scriptDir, '..');
const docsDevDir = path.join(repoRoot, 'docs', 'development');
const staticResourcesDir = path.join(repoRoot, 'static', 'resources');

let errors = 0;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function readFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`Error: file not found: ${filePath}`);
    errors++;
    return null;
  }
  return fs.readFileSync(filePath, 'utf-8');
}

function getAllCFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getAllCFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.c')) {
      results.push(fullPath);
    }
  }
  return results;
}

function getAllHFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getAllHFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.h')) {
      results.push(fullPath);
    }
  }
  return results;
}

function replaceSection(fileContent, startMarker, endMarker, newContent) {
  const startIdx = fileContent.indexOf(startMarker);
  const endIdx = fileContent.indexOf(endMarker);
  if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) return null;
  return `${fileContent.slice(0, startIdx + startMarker.length)}\n${newContent}\n${fileContent.slice(endIdx)}`;
}

function padEnd(val, len) {
  return String(val).padEnd(len, ' ');
}

function ctypeBytes(ctype) {
  switch (ctype) {
    case 'U8':
    case 'S8':
      return 1;
    case 'U16':
    case 'S16':
      return 2;
    case 'U32':
    case 'S32':
    case 'Float':
      return 4;
    default:
      return 0;
  }
}

/** Extract the last identifier from a C accessor expression like config()->field or ptr->field */
function extractFieldName(expr) {
  if (!expr) return null;
  expr = expr.trim();
  // Match: ...->fieldName or ...).fieldName at end
  const m = expr.match(/[->.)(]+(\w+)\s*$/);
  if (m) return m[1];
  return null;
}

/** Extract trailing line comment */
function extractComment(line) {
  const m = line.match(/\/\/\s*(.+)$/);
  return m ? m[1].trim() : null;
}

/** Resolve a C value token to a display string: numbers stay, constants resolved via map, booleans simplified */
function resolveConstant(val, constantMap) {
  val = val.trim();
  if (val === 'true') return '1';
  if (val === 'false') return '0';
  // Strip trailing 'f' from float literals
  const noF = val.replace(/^(-?[\d.]+)f$/, '$1');
  if (/^-?[\d.]+$/.test(noF)) return noF;
  // Try to resolve named constant
  if (constantMap[val] !== undefined) return constantMap[val];
  return val;
}

// ---------------------------------------------------------------------------
// Parse PG IDs from src/main/pg/pg_ids.h
// ---------------------------------------------------------------------------

console.log('Parsing PG IDs from pg_ids.h...');
const pgIdsPath = path.join(firmwarePath, 'src/main/pg/pg_ids.h');
const pgIdsContent = readFile(pgIdsPath);
if (!pgIdsContent) process.exit(1);

const pgIdMap = {};
const pgIdLineRe = /^#define\s+(PG_\w+)\s+(\d+)/gm;
let m;
while ((m = pgIdLineRe.exec(pgIdsContent)) !== null) {
  pgIdMap[m[1]] = parseInt(m[2], 10);
}
console.log(`  Found ${Object.keys(pgIdMap).length} PG ID definitions`);

// ---------------------------------------------------------------------------
// Parse PG_REGISTER* macros from src/main/**/*.c
// ---------------------------------------------------------------------------

console.log('Scanning .c files for PG_REGISTER* macros...');
const cFiles = getAllCFiles(path.join(firmwarePath, 'src/main'));
console.log(`  Scanning ${cFiles.length} .c files...`);

const pgRegistrations = {};
const macroRe = /(PG_REGISTER(?:_ARRAY)?(?:_WITH_RESET_(?:FN|TEMPLATE))?)\s*\(([^)]*)\)\s*;/g;

for (const file of cFiles) {
  const content = readFile(file);
  if (!content) continue;
  macroRe.lastIndex = 0;
  let match;
  while ((match = macroRe.exec(content)) !== null) {
    const macroName = match[1];
    const rawArgs = match[2]
      .replace(/\s+/g, ' ')
      .split(',')
      .map((s) => s.trim());
    let structType, pgConstant, version;
    if (macroName.includes('_ARRAY')) {
      if (rawArgs.length < 5) continue;
      structType = rawArgs[0];
      pgConstant = rawArgs[3];
      version = parseInt(rawArgs[4], 10);
    } else {
      if (rawArgs.length < 4) continue;
      structType = rawArgs[0];
      pgConstant = rawArgs[2];
      version = parseInt(rawArgs[3], 10);
    }
    if (!pgConstant || !pgConstant.startsWith('PG_')) continue;
    if (!pgRegistrations[pgConstant]) {
      pgRegistrations[pgConstant] = {
        structType,
        version: isNaN(version) ? 0 : version,
        sourceFile: path.relative(firmwarePath, file),
      };
    }
  }
}
console.log(`  Found ${Object.keys(pgRegistrations).length} unique PG registrations`);

// ---------------------------------------------------------------------------
// Build sorted PG groups data
// ---------------------------------------------------------------------------

const pgGroups = Object.entries(pgIdMap)
  .sort((a, b) => a[1] - b[1])
  .map(([name, id]) => {
    const reg = pgRegistrations[name];
    if (!reg) console.warn(`  Warning: ${name} (${id}) has no PG_REGISTER* macro`);
    return {
      id,
      name,
      structType: reg ? reg.structType : null,
      pgVersion: reg ? reg.version : null,
      sourceFile: reg ? reg.sourceFile : null,
    };
  });

// Check for duplicate PG IDs (firmware bug, but warn so it's visible in output)
const seenIds = {};
for (const g of pgGroups) {
  if (seenIds[g.id]) {
    console.warn(`  Warning: duplicate PG ID ${g.id} — ${seenIds[g.id]} and ${g.name}`);
  } else {
    seenIds[g.id] = g.name;
  }
}

// ---------------------------------------------------------------------------
// Parse settings.c to build field min/max/type lookup
// ---------------------------------------------------------------------------

console.log('Parsing settings.c for field min/max/type...');
const settingsPath = path.join(firmwarePath, 'src/main/cli/settings.c');
const settingsContent = readFile(settingsPath);
const fieldLookup = {}; // fieldName -> { varType, min, max, lookupTable }

if (settingsContent) {
  const lines = settingsContent.split('\n');
  for (const line of lines) {
    // Extract: offsetof(structType_t, fieldName)
    const offsetMatch = line.match(/offsetof\s*\(\s*\w+\s*,\s*(\w+)\s*\)/);
    if (!offsetMatch) continue;
    const fieldName = offsetMatch[1];

    // Extract var type
    const typeMatch = line.match(/\b(VAR_UINT8|VAR_UINT16|VAR_UINT32|VAR_INT8|VAR_INT16|VAR_INT32|VAR_FLOAT)\b/);
    const varType = typeMatch ? typeMatch[1].replace('VAR_', '') : null;

    // Extract min/max (numeric or constant names)
    let min = null;
    let max = null;
    const mmMatch = line.match(/\.config\.minmax(?:Unsigned)?\s*=\s*\{\s*(-?[\w.]+)\s*,\s*(-?[\w.]+)\s*\}/);
    if (mmMatch) {
      min = mmMatch[1];
      max = mmMatch[2];
    }

    // Extract lookup table for enum types
    let lookupTable = null;
    const lookupMatch = line.match(/\.config\.lookup\s*=\s*\{\s*(TABLE_\w+)\s*\}/);
    if (lookupMatch) lookupTable = lookupMatch[1];

    // Don't overwrite if already seen (first definition wins)
    if (!fieldLookup[fieldName]) {
      fieldLookup[fieldName] = { varType, min, max, lookupTable };
    }
  }
  console.log(`  Built lookup for ${Object.keys(fieldLookup).length} fields`);
}

// ---------------------------------------------------------------------------
// Parse default values from PG reset templates and reset functions
// ---------------------------------------------------------------------------

console.log('Parsing default values from firmware...');

// Build a constant resolution map from all .h files in src/main
const constantMap = {};
const hFiles = getAllHFiles(path.join(firmwarePath, 'src/main'));
for (const hFile of hFiles) {
  const content = readFile(hFile);
  if (!content) continue;
  const re = /^#define\s+([A-Z][A-Z0-9_]+)\s+([-]?[\d.]+f?)\s*(?:\/\/.*)?$/gm;
  let hm;
  while ((hm = re.exec(content)) !== null) {
    if (constantMap[hm[1]] === undefined) {
      constantMap[hm[1]] = resolveConstant(hm[2], {});
    }
  }
}

// Build fieldName -> defaultValue from all .c files
const defaultLookup = {};

for (const file of cFiles) {
  const content = readFile(file);
  if (!content) continue;
  const lines = content.split('\n');

  // Pattern 1: PG_RESET_TEMPLATE(type, name, .field = value, ...)
  let inTemplate = false;
  let parenDepth = 0;
  for (const line of lines) {
    if (!inTemplate) {
      if (line.match(/PG_RESET_TEMPLATE\s*\(/)) {
        inTemplate = true;
        parenDepth = (line.match(/\(/g) || []).length - (line.match(/\)/g) || []).length;
        // Also check for .field = value on same line (unlikely but safe)
      }
    } else {
      parenDepth += (line.match(/\(/g) || []).length - (line.match(/\)/g) || []).length;
      const fm = line.match(/\.\s*(\w+)\s*=\s*([^,/\n]+)/);
      if (fm) {
        const fieldName = fm[1];
        const rawVal = fm[2].trim();
        if (!defaultLookup[fieldName]) {
          defaultLookup[fieldName] = resolveConstant(rawVal, constantMap);
        }
      }
      if (parenDepth <= 0) inTemplate = false;
    }
  }

  // Pattern 2: void pgResetFn_name(type *ptr) { ptr->field = value; }
  let inResetFn = false;
  let fnParam = null;
  let braceDepth = 0;
  for (const line of lines) {
    if (!inResetFn) {
      const fm = line.match(/^void pgResetFn_\w+\s*\(\s*\w+\s*\*\s*(\w+)/);
      if (fm) {
        inResetFn = true;
        fnParam = fm[1];
        braceDepth = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
      }
    } else {
      braceDepth += (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
      if (fnParam) {
        const re = new RegExp(`${fnParam}\\s*->\\s*(\\w+)\\s*=\\s*([^;\\n]+)`);
        const am = line.match(re);
        if (am) {
          const fieldName = am[1];
          const rawVal = am[2].trim();
          if (!defaultLookup[fieldName]) {
            defaultLookup[fieldName] = resolveConstant(rawVal, constantMap);
          }
        }
      }
      if (braceDepth <= 0) {
        inResetFn = false;
        fnParam = null;
      }
    }
  }
}

console.log(`  Built default lookup for ${Object.keys(defaultLookup).length} fields`);

// ---------------------------------------------------------------------------
// Parse MSP codes from header files
// ---------------------------------------------------------------------------

console.log('Parsing MSP codes from headers...');

function parseMspV1Header(filePath) {
  const content = readFile(filePath);
  if (!content) return [];
  const results = [];
  for (const line of content.split('\n')) {
    const t = line.trim();
    const mt = t.match(/^#define\s+(MSP_\w+)\s+(\d+)/);
    if (!mt) continue;
    const name = mt[1];
    const code = parseInt(mt[2], 10);
    let direction = 'unknown';
    if (t.includes('// out message')) direction = 'out';
    else if (t.includes('// in message')) direction = 'in';
    else if (t.includes('// in/out message')) direction = 'both';
    else if (name === 'MSP_RESERVE_1' || name === 'MSP_RESERVE_2' || name === 'MSP_V2_FRAME' || name === 'MSP_PROTOCOL_VERSION') direction = 'system';
    let notes = '';
    const descMatch = t.match(/\/\/\s*(?:out|in(?:\/out)?)\s+message:\s*(.+)/);
    if (descMatch) notes = descMatch[1].trim();
    else {
      const gc = t.match(/\/\/\s*(.+)$/);
      if (gc) notes = gc[1].trim();
    }
    results.push({ name, code: String(code), codeNum: code, direction, notes, v2: false });
  }
  return results;
}

function parseMspV2Header(filePath) {
  const content = readFile(filePath);
  if (!content) return [];
  const results = [];
  for (const line of content.split('\n')) {
    const t = line.trim();
    const mt = t.match(/^#define\s+(MSP2_\w+)\s+(0x[0-9A-Fa-f]+)/);
    if (!mt) continue;
    const name = mt[1];
    const hexCode = mt[2].toLowerCase();
    if (parseInt(hexCode, 16) < 0x1000) continue;
    let direction = 'unknown';
    if (name.includes('_GET_') || name.startsWith('MSP2_GET')) direction = 'out';
    else if (name.includes('_SET_') || name.startsWith('MSP2_SET') || name.includes('_SEND_')) direction = 'in';
    let notes = '';
    const gc = t.match(/\/\/\s*(.+)$/);
    if (gc) notes = gc[1].trim();
    results.push({ name, code: hexCode, codeNum: parseInt(hexCode, 16), direction, notes, v2: true });
  }
  return results;
}

const mspV1Codes = parseMspV1Header(path.join(firmwarePath, 'src/main/msp/msp_protocol.h'));
const mspV2CommonCodes = parseMspV2Header(path.join(firmwarePath, 'src/main/msp/msp_protocol_v2_common.h'));
const mspV2BfCodes = parseMspV2Header(path.join(firmwarePath, 'src/main/msp/msp_protocol_v2_betaflight.h'));
const allMspCodes = [...mspV1Codes, ...mspV2CommonCodes, ...mspV2BfCodes];
// Build lookup: name -> code entry
const mspCodeByName = {};
for (const c of allMspCodes) mspCodeByName[c.name] = c;

console.log(`  MSP v1: ${mspV1Codes.length}, v2 common: ${mspV2CommonCodes.length}, v2 BF: ${mspV2BfCodes.length}`);

// ---------------------------------------------------------------------------
// Parse msp.c to extract per-command payload fields
// ---------------------------------------------------------------------------

console.log('Parsing msp.c for payload fields...');
const mspCPath = path.join(firmwarePath, 'src/main/msp/msp.c');
const mspCContent = readFile(mspCPath);

// mspOutPayloads / mspInPayloads: commandName -> { fields: [...] }
// Kept separate so bidirectional commands don't mix OUT and IN fields in one array.
const mspOutPayloads = {};
const mspInPayloads = {};

if (mspCContent) {
  const lines = mspCContent.split('\n');

  // Line ranges for out vs in handlers (0-indexed)
  // mspCommonProcessOutCommand: ~line 627
  // mspProcessOutCommand: ~line 1085
  // mspProcessInCommand: ~line 2647
  // Detect by scanning for function signatures
  let outStart = -1;
  let inStart = -1;
  let inEnd = -1;

  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (l.match(/^static bool mspCommonProcessOutCommand|^static bool mspProcessOutCommand/)) {
      if (outStart === -1) outStart = i;
    }
    if (l.match(/^static mspResult_e mspProcessInCommand/)) {
      inStart = i;
    }
    if (l.match(/^mspResult_e mspFcProcessCommand/)) {
      inEnd = i;
      break;
    }
  }

  if (outStart === -1) outStart = 627;
  if (inStart === -1) inStart = 2647;
  if (inEnd === -1) inEnd = 4421;

  // Parse a range of lines for case blocks and sbuf calls
  const parseHandlerRange = (startLine, endLine, direction, payloadsMap) => {
    let currentCommand = null;
    let byteOffset = 0;
    let offsetUnknown = false; // true after a variable-length field; subsequent offsets are unreliable

    for (let i = startLine; i < endLine && i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      // Detect new case label
      const caseMatch = trimmed.match(/^case\s+(MSP2?_\w+)\s*:/);
      if (caseMatch) {
        currentCommand = caseMatch[1];
        byteOffset = 0;
        offsetUnknown = false;
        if (!payloadsMap[currentCommand]) {
          payloadsMap[currentCommand] = { direction, fields: [] };
        }
        continue;
      }

      // Detect break (end of case) — only at top indentation level of case body
      // A break at indentation ≤ 8 spaces ends the case (Betaflight uses 4-space indent;
      // a top-level case body break sits at 8 spaces = 2 levels in)
      if (currentCommand && trimmed === 'break;') {
        const indent = line.match(/^(\s*)/)[1].length;
        if (indent <= 8) {
          // Top-level break in case
          currentCommand = null;
          byteOffset = 0;
          offsetUnknown = false;
          continue;
        }
      }

      if (!currentCommand) continue;

      const cmd = payloadsMap[currentCommand];

      if (direction === 'out') {
        // Match: sbufWriteU8(dst, expr) or sbufWriteU16LE(dst, expr) etc.
        const wm = line.match(/sbufWrite(U8|U16|U32|S8|S16|S32|Float)(?:LE|BE)?\s*\(\s*dst\s*,\s*(.+?)\s*\)\s*;/);
        if (wm) {
          const ctype = wm[1];
          const expr = wm[2].trim();
          const bytes = ctypeBytes(ctype);
          const fieldName = extractFieldName(expr);
          const comment = extractComment(line);
          const notes = comment || (expr === '0' ? 'deprecated/padding' : null);
          cmd.fields.push({ fieldName: fieldName || '(value)', ctype, bytes, offset: offsetUnknown ? '?' : byteOffset, expr, notes });
          byteOffset += bytes;
        }
        // Match sbufWriteData/sbufWriteString — variable length; mark subsequent offsets unknown
        else if (line.match(/sbufWriteData\s*\(\s*dst/)) {
          const comment = extractComment(line);
          cmd.fields.push({ fieldName: '(variable data)', ctype: 'bytes', bytes: null, offset: offsetUnknown ? '?' : byteOffset, expr: null, notes: comment || 'variable-length data' });
          offsetUnknown = true;
        } else if (line.match(/sbufWriteString\s*\(\s*dst|sbufWritePString\s*\(\s*dst/)) {
          const comment = extractComment(line);
          cmd.fields.push({ fieldName: '(string)', ctype: 'str', bytes: null, offset: offsetUnknown ? '?' : byteOffset, expr: null, notes: comment || 'string data' });
          offsetUnknown = true;
        }
      } else {
        // IN direction: match config->field = sbufReadU8(src) or bare sbufReadU8(src)
        const rm = line.match(/sbufRead(U8|U16|U32|S8|S16|S32|Float)(?:LE|BE)?\s*\(\s*src\s*\)/);
        if (rm) {
          const ctype = rm[1];
          const bytes = ctypeBytes(ctype);
          // Try to extract lvalue field name
          const assignMatch = line.match(/(\w+(?:\(\)|))\s*->\s*(\w+)\s*=\s*sbufRead/);
          const fieldName = assignMatch ? assignMatch[2] : null;
          const comment = extractComment(line);
          const expr = trimmed.includes('sbufReadU8(src)') && !assignMatch ? '(ignored)' : null;
          const notes = comment || (expr === '(ignored)' ? 'deprecated/ignored' : null);
          cmd.fields.push({ fieldName: fieldName || '(read)', ctype, bytes, offset: offsetUnknown ? '?' : byteOffset, expr: null, notes });
          byteOffset += bytes;
        }
      }
    }
  };

  // Parse both OUT functions (common + fc-specific) and the IN function
  parseHandlerRange(outStart, inStart, 'out', mspOutPayloads);
  parseHandlerRange(inStart, inEnd, 'in', mspInPayloads);

  const allPayloadKeys = new Set([...Object.keys(mspOutPayloads), ...Object.keys(mspInPayloads)]);
  const withFields = [...allPayloadKeys].filter((k) => (mspOutPayloads[k]?.fields.length ?? 0) + (mspInPayloads[k]?.fields.length ?? 0) > 0).length;
  console.log(`  Extracted payload fields for ${withFields} MSP commands (of ${allPayloadKeys.size} cases found)`);
}

// ---------------------------------------------------------------------------
// Enrich MSP codes with payload fields
// ---------------------------------------------------------------------------

for (const code of allMspCodes) {
  const outPayload = mspOutPayloads[code.name];
  const inPayload = mspInPayloads[code.name];
  if (outPayload || inPayload) {
    // Concatenate OUT fields before IN fields; each field set is kept in order
    code.fields = [...(outPayload?.fields ?? []), ...(inPayload?.fields ?? [])];
    // Reconcile direction (header annotation takes precedence, fall back to msp.c)
    const payloadDirection = outPayload ? outPayload.direction : inPayload.direction;
    if (code.direction === 'unknown' && payloadDirection) {
      code.direction = payloadDirection;
    }
  } else {
    code.fields = [];
  }

  // Enrich each field with min/max/default from settings and default lookups
  for (const f of code.fields) {
    if (f.fieldName && fieldLookup[f.fieldName]) {
      const s = fieldLookup[f.fieldName];
      f.min = s.min;
      f.max = s.max;
      f.settingsType = s.varType;
      f.lookupTable = s.lookupTable;
    }
    if (f.fieldName && defaultLookup[f.fieldName] !== undefined) {
      f.default = defaultLookup[f.fieldName];
    }
  }
}

// ---------------------------------------------------------------------------
// Generate Markdown tables
// ---------------------------------------------------------------------------

function buildTable(headers, rows) {
  const widths = headers.map((h, i) => Math.max(h.length, ...rows.map((r) => String(r[i] ?? '').length)));
  const header = `| ${headers.map((h, i) => padEnd(h, widths[i])).join(' | ')} |`;
  const sep = `| ${widths.map((w) => '-'.repeat(w)).join(' | ')} |`;
  const body = rows.map((r) => `| ${r.map((cell, i) => padEnd(cell ?? '', widths[i])).join(' | ')} |`);
  return [header, sep, ...body].join('\n');
}

const directionLabel = { out: 'from FC', in: 'to FC', both: 'both', system: 'system', unknown: 'unknown' };

// Summary table
const mspSummaryTable = buildTable(
  ['Command', 'Msg Id', 'Direction', 'Fields', 'Notes'],
  allMspCodes.map((c) => [c.name, c.code, directionLabel[c.direction] || c.direction, c.fields.length > 0 ? String(c.fields.length) : '—', c.notes]),
);

// PG table
const pgTable = buildTable(
  ['ID', 'Name', 'Struct Type', 'PG Version', 'Source File'],
  pgGroups.map((g) => [g.id, g.name, g.structType ?? '—', g.pgVersion ?? '—', g.sourceFile ?? '—']),
);

// Per-command detail sections
function generateMspDetails(codes) {
  const sections = [];
  for (const c of codes) {
    if (c.fields.length === 0) continue;
    const dirLabel = directionLabel[c.direction] || c.direction;
    sections.push(`### ${c.name} — ${c.code} — ${dirLabel}`);
    sections.push('');
    if (c.notes) {
      sections.push(`_${c.notes}_`);
      sections.push('');
    }
    // Build field table
    const rows = c.fields.map((f) => {
      const type = f.ctype;
      const dflt = f.default !== undefined && f.default !== null ? String(f.default) : '';
      const min = f.min !== undefined && f.min !== null ? String(f.min) : '';
      const max = f.max !== undefined && f.max !== null ? String(f.max) : '';
      const notes = [f.lookupTable ? `lookup: ${f.lookupTable}` : null, f.notes ? f.notes : null].filter(Boolean).join('; ');
      return [String(f.offset), f.fieldName || '—', type, String(f.bytes ?? '?'), dflt, min, max, notes];
    });
    sections.push(buildTable(['Offset', 'Field', 'Type', 'Bytes', 'Default', 'Min', 'Max', 'Notes'], rows));
    sections.push('');
  }
  return sections.join('\n');
}

const mspDetailContent = generateMspDetails(allMspCodes);

// ---------------------------------------------------------------------------
// Write section markers in .md files
// ---------------------------------------------------------------------------

const PG_START = '<!-- PG_TABLE_START -->';
const PG_END = '<!-- PG_TABLE_END -->';
const MSP_TABLE_START = '<!-- MSP_TABLE_START -->';
const MSP_TABLE_END = '<!-- MSP_TABLE_END -->';
const MSP_DETAIL_START = '<!-- MSP_DETAIL_START -->';
const MSP_DETAIL_END = '<!-- MSP_DETAIL_END -->';

const pgDocPath = path.join(docsDevDir, 'Parameter-Group-Reference.md');
const mspDocPath = path.join(docsDevDir, 'MSP-Protocol-Reference-Dev.md');

function writeSection(docPath, startMarker, endMarker, content, label) {
  const fileContent = readFile(docPath);
  if (!fileContent) return;
  const updated = replaceSection(fileContent, startMarker, endMarker, content);
  if (updated === null) {
    console.error(`Error: markers ${startMarker}/${endMarker} not found in ${path.relative(repoRoot, docPath)}`);
    errors++;
    return;
  }
  fs.writeFileSync(docPath, updated, 'utf-8');
  const rows = content.split('\n').length - 2;
  console.log(`  Written ${label} (${rows} lines) → ${path.relative(repoRoot, docPath)}`);
}

const commitNote = firmwareCommit ? `_Generated from firmware commit: \`${firmwareCommit}\`_\n\n` : '';

console.log('Writing to doc files...');
writeSection(pgDocPath, PG_START, PG_END, `${commitNote}${pgTable}`, 'PG table');
writeSection(mspDocPath, MSP_TABLE_START, MSP_TABLE_END, `${commitNote}${mspSummaryTable}`, 'MSP summary table');
writeSection(mspDocPath, MSP_DETAIL_START, MSP_DETAIL_END, mspDetailContent, 'MSP detail sections');

// ---------------------------------------------------------------------------
// Write JSON snapshot
// ---------------------------------------------------------------------------

fs.mkdirSync(staticResourcesDir, { recursive: true });
const jsonSnapshot = {
  generated: new Date().toISOString(),
  firmwareCommit,
  source: 'scripts/extract-pg-msp.js',
  pgGroups,
  mspCodes: allMspCodes.map((c) => ({
    name: c.name,
    code: c.code,
    direction: c.direction,
    notes: c.notes,
    v2: c.v2,
    fields: c.fields.map((f) => ({
      offset: f.offset,
      fieldName: f.fieldName,
      ctype: f.ctype,
      bytes: f.bytes,
      default: f.default ?? null,
      min: f.min ?? null,
      max: f.max ?? null,
      settingsType: f.settingsType ?? null,
      lookupTable: f.lookupTable ?? null,
      notes: f.notes ?? null,
    })),
  })),
};
fs.writeFileSync(path.join(staticResourcesDir, 'pg-msp-data.json'), `${JSON.stringify(jsonSnapshot, null, 2)}\n`, 'utf-8');
console.log(`  Written JSON snapshot → static/resources/pg-msp-data.json`);

// ---------------------------------------------------------------------------
// Exit
// ---------------------------------------------------------------------------

if (errors > 0) {
  console.error(`\nFailed with ${errors} error(s).`);
  process.exit(1);
}
console.log('\nDone.');

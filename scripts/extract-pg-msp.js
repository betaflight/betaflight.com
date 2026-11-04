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

/** Struct type behind a PG accessor in `xxxConfig()->f` / `xxxConfigMutable(i)->f`, e.g. `xxxConfig_t`. */
function accessorStruct(text) {
  const before = text.slice(0, Math.max(text.indexOf('->'), 0)).trimEnd();
  if (!before.endsWith(')')) {
    return null;
  }
  let start = before.lastIndexOf('(');
  const nameEnd = start;
  while (start > 0 && /\w/.test(before[start - 1])) {
    start--;
  }
  const name = before.slice(start, nameEnd);
  if (!name) {
    return null;
  }
  const base = name.endsWith('Mutable') ? name.slice(0, -'Mutable'.length) : name;
  return `${base}_t`;
}

/** Extract the last identifier from a C accessor expression like config()->field or ptr->field */
function extractFieldName(expr) {
  if (!expr) return null;
  expr = expr.trim();
  // Array element inside a loop, e.g. `profile->spa_center[i]` → `spa_center[]`
  const open = expr.lastIndexOf('[');
  if (expr.endsWith(']') && open > 0 && /^\w+$/.test(expr.slice(open + 1, -1).trim())) {
    const base = extractFieldName(expr.slice(0, open));
    return base ? `${base}[]` : null;
  }
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

/** Evaluate a C integer constant expression (literals, parentheses, + - * / << >> & ^ | ~). Throws on anything else. */
function evalIntExpr(text) {
  const tokens = text.match(/0[xX][\da-fA-F]+|\d+|<<|>>|[-+*/&|^~()]|\S/g) ?? [];
  let pos = 0;
  const binary = (next, ops) => () => {
    let v = next();
    while (ops[tokens[pos]]) {
      const op = tokens[pos++];
      v = ops[op](v, next());
    }
    return v;
  };
  const primary = () => {
    const t = tokens[pos++];
    if (t === '(') {
      const v = orExpr();
      if (tokens[pos++] !== ')') {
        throw new Error('unbalanced parentheses');
      }
      return v;
    }
    if (t === '-') {
      return -primary();
    }
    if (t === '~') {
      return ~primary();
    }
    if (/^0[xX]/.test(t ?? '')) {
      return Number.parseInt(t, 16);
    }
    if (/^\d+$/.test(t ?? '')) {
      return Number.parseInt(t, 10);
    }
    throw new Error(`unexpected token ${t}`);
  };
  const mulExpr = binary(primary, { '*': (a, b) => a * b, '/': (a, b) => Math.trunc(a / b) });
  const addExpr = binary(mulExpr, { '+': (a, b) => a + b, '-': (a, b) => a - b });
  const shiftExpr = binary(addExpr, { '<<': (a, b) => a << b, '>>': (a, b) => a >> b });
  const andExpr = binary(shiftExpr, { '&': (a, b) => a & b });
  const xorExpr = binary(andExpr, { '^': (a, b) => a ^ b });
  const orExpr = binary(xorExpr, { '|': (a, b) => a | b });
  const value = orExpr();
  if (pos !== tokens.length) {
    throw new Error('trailing tokens');
  }
  return value;
}

/** Parse the argument of `#define NAME VALUE` under the active conditions; null for function-like or empty defines. */
function parseDefineArg(arg, conds) {
  const space = arg.search(/\s/);
  const name = space > 0 ? arg.slice(0, space) : '';
  if (!/^\w+$/.test(name)) {
    return null;
  }
  const condition = conds.length > 0 ? conds.join(' && ') : null;
  return { name, entry: { value: arg.slice(space).trim(), condition } };
}

/**
 * Collect `#define NAME VALUE` lines in a file together with the preprocessor condition they sit
 * under (e.g. `USE_WING`, `!USE_WING`), so conditional definitions can all be reported.
 */
function collectDefines(content) {
  const defines = {};
  const conds = [];
  const negate = (c) => (c.startsWith('!') ? c.slice(1) : `!${c}`);
  const conditional = {
    ifdef: (arg) => conds.push(arg),
    if: (arg) => conds.push(arg.replace(/^defined\s*\(\s*(\w+)\s*\)$/, '$1')),
    ifndef: (arg) => conds.push(`!${arg}`),
    elif: (arg) => conds.splice(-1, 1, arg),
    else: () => conds.length > 0 && conds.splice(-1, 1, negate(conds.at(-1))),
    endif: () => conds.pop(),
  };
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('#')) {
      continue;
    }
    const body = trimmed.slice(1).trimStart();
    const directive = body.match(/^[a-z]+/)?.[0] ?? '';
    const arg = stripLineComment(body.slice(directive.length)).trim();
    if (Object.hasOwn(conditional, directive)) {
      conditional[directive](arg);
    } else if (directive === 'define') {
      const def = parseDefineArg(arg, conds);
      if (def) {
        defines[def.name] ??= [];
        defines[def.name].push(def.entry);
      }
    }
  }
  return defines;
}

/**
 * Resolve a PG version argument to every value it can take: [{ value, condition }]. Literals and
 * integer expressions evaluate directly; macros are followed through all their (conditional)
 * `#define`s in the same file. Macros inside an expression must have a single definition.
 */
function resolveVersionVariants(token, defines, depth = 0) {
  const expr = token.trim();
  if (depth > 5) {
    return [];
  }
  if (/^[A-Za-z_]\w*$/.test(expr)) {
    return (defines[expr] ?? []).flatMap((d) =>
      resolveVersionVariants(d.value, defines, depth + 1).map((v) => ({
        value: v.value,
        condition: [d.condition, v.condition].filter(Boolean).join(' && ') || null,
      })),
    );
  }
  try {
    const substituted = expr.replace(/\b[A-Za-z_]\w*/g, (id) => {
      const vs = resolveVersionVariants(id, defines, depth + 1);
      if (vs.length !== 1) {
        throw new Error(`ambiguous ${id}`);
      }
      return String(vs[0].value);
    });
    return [{ value: evalIntExpr(substituted), condition: null }];
  } catch {
    return [];
  }
}

/**
 * Pick the reported PG version from its variants. Distinct conditional values are kept as
 * `variants`; the primary is the build without the optional feature (a negated condition).
 */
function summarizeVersion(variants) {
  const distinct = variants.filter((v, i) => variants.findIndex((w) => w.value === v.value) === i);
  if (distinct.length === 0) {
    return { version: 0, variants: null };
  }
  if (distinct.length === 1) {
    return { version: distinct[0].value, variants: null };
  }
  const primary = distinct.find((v) => v.condition?.startsWith('!')) ?? distinct[0];
  return { version: primary.value, variants: distinct };
}

const macroRe = /(PG_REGISTER(?:_ARRAY)?(?:_WITH_RESET_(?:FN|TEMPLATE))?)\s*\(([^)]*)\)\s*;/g;

for (const file of cFiles) {
  const content = readFile(file);
  if (!content) continue;
  macroRe.lastIndex = 0;
  const defines = collectDefines(content);
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
      version = summarizeVersion(resolveVersionVariants(rawArgs[4], defines));
    } else {
      if (rawArgs.length < 4) continue;
      structType = rawArgs[0];
      pgConstant = rawArgs[2];
      version = summarizeVersion(resolveVersionVariants(rawArgs[3], defines));
    }
    if (!pgConstant || !pgConstant.startsWith('PG_')) continue;
    if (!pgRegistrations[pgConstant]) {
      pgRegistrations[pgConstant] = {
        structType,
        version: version.version,
        versionVariants: version.variants,
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
      // Only present when the version differs between builds, e.g. [{ value: 14, condition: 'USE_WING' }, ...]
      pgVersionVariants: reg?.versionVariants ?? undefined,
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
const fieldStructs = {}; // fieldName -> Set of struct types that declare a setting with this name
const fieldLookupByStruct = {}; // `structType.fieldName` -> { varType, min, max, lookupTable }
const ambiguousFields = new Set(); // field names declared by more than one struct

if (settingsContent) {
  const lines = settingsContent.split('\n');
  for (const line of lines) {
    // Extract: offsetof(structType_t, fieldName)
    const offsetMatch = line.match(/offsetof\s*\(\s*(\w+)\s*,\s*(\w+)\s*\)/);
    if (!offsetMatch) continue;
    const fieldName = offsetMatch[2];
    fieldStructs[fieldName] ??= new Set();
    fieldStructs[fieldName].add(offsetMatch[1]);

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
    fieldLookupByStruct[`${offsetMatch[1]}.${fieldName}`] ??= { varType, min, max, lookupTable };
  }
  for (const [name, structs] of Object.entries(fieldStructs)) {
    if (structs.size > 1) {
      ambiguousFields.add(name);
    }
  }
  console.log(`  Built lookup for ${Object.keys(fieldLookup).length} fields (${ambiguousFields.size} names shared by several structs are not used for enrichment)`);
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
const defaultLookupByStruct = {}; // `structType.fieldName` -> defaultValue

function recordDefault(structType, fieldName, rawVal) {
  const value = resolveConstant(rawVal, constantMap);
  defaultLookup[fieldName] ??= value;
  if (structType) {
    defaultLookupByStruct[`${structType}.${fieldName}`] ??= value;
  }
}

for (const file of cFiles) {
  const content = readFile(file);
  if (!content) continue;
  const lines = content.split('\n');

  // Pattern 1: PG_RESET_TEMPLATE(type, name, .field = value, ...)
  let inTemplate = false;
  let parenDepth = 0;
  let templateType = null;
  for (const line of lines) {
    if (!inTemplate) {
      const tm = line.match(/PG_RESET_TEMPLATE\s*\(\s*(\w+)/);
      if (tm) {
        inTemplate = true;
        templateType = tm[1];
        parenDepth = (line.match(/\(/g) || []).length - (line.match(/\)/g) || []).length;
        // Also check for .field = value on same line (unlikely but safe)
      }
    } else {
      parenDepth += (line.match(/\(/g) || []).length - (line.match(/\)/g) || []).length;
      const fm = line.match(/\.\s*(\w+)\s*=\s*([^,/\n]+)/);
      if (fm) {
        recordDefault(templateType, fm[1], fm[2].trim());
      }
      if (parenDepth <= 0) inTemplate = false;
    }
  }

  // Pattern 2: void pgResetFn_name(type *ptr) { ptr->field = value; }
  let inResetFn = false;
  let fnParam = null;
  let fnType = null;
  let braceDepth = 0;
  for (const line of lines) {
    if (!inResetFn) {
      const fm = line.match(/^void pgResetFn_\w+\s*\(\s*(\w+)\s*\*\s*(\w+)/);
      if (fm) {
        inResetFn = true;
        fnType = fm[1];
        fnParam = fm[2];
        braceDepth = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
      }
    } else {
      braceDepth += (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
      if (fnParam) {
        const re = new RegExp(`${fnParam}\\s*->\\s*(\\w+)\\s*=\\s*([^;\\n]+)`);
        const am = line.match(re);
        if (am) {
          recordDefault(fnType, am[1], am[2].trim());
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

/** Strip a trailing `//` or `/*` comment from a line of C. */
function stripLineComment(text) {
  const cut = [text.indexOf('//'), text.indexOf('/*')].filter((i) => i >= 0);
  return cut.length > 0 ? text.slice(0, Math.min(...cut)) : text;
}

/**
 * Parse `#define NAME VALUE`. Returns { name, value } where value is the integer, or null when it
 * is not a plain integer or the define sits directly under `#ifndef NAME` (overridable by targets).
 */
function parseCountDefine(line, prevLine) {
  const head = line.match(/^\s*#\s*define\s+(\w+)/);
  if (!head) {
    return null;
  }
  const name = head[1];
  const rest = stripLineComment(line.slice(head[0].length)).trim();
  const guarded = new RegExp(String.raw`^\s*#\s*ifndef\s+${name}\b`).test(prevLine);
  const value = !guarded && /^\d+$/.test(rest) ? Number.parseInt(rest, 10) : null;
  return { name, value };
}

// Numeric macros usable as fixed loop counts. A macro qualifies only if src/main defines it
// exactly once, as a plain integer, and not behind `#ifndef NAME` (targets may override those).
// Anything else (target-dependent, enum terminators, runtime values) is treated as unresolved.
const fixedCountMacros = (() => {
  const defs = {};
  for (const file of [...cFiles, ...hFiles]) {
    let prev = '';
    for (const l of (readFile(file) ?? '').split('\n')) {
      const def = parseCountDefine(l, prev);
      if (def) {
        defs[def.name] = [...(defs[def.name] ?? []), def.value];
      }
      if (l.trim()) {
        prev = l;
      }
    }
  }
  const result = {};
  for (const [name, values] of Object.entries(defs)) {
    if (values.length === 1 && values[0] !== null) {
      result[name] = values[0];
    }
  }
  return result;
})();

// Resolve the iteration count of `for (<type> i = 0; i < BOUND; i++)`; null if not a fixed count.
function resolveLoopCount(forLine) {
  const unresolved = { count: null, bound: null };
  const open = forLine.indexOf('(');
  const [init, cond] = forLine.slice(open + 1).split(';');
  if (open < 0 || cond === undefined) {
    return unresolved;
  }
  const [lhs, rhs] = init.split('=');
  const loopVar = lhs.trim().split(/\s+/).at(-1);
  const lt = cond.indexOf('<');
  if (rhs?.trim() !== '0' || lt < 0 || cond[lt + 1] === '=' || cond.slice(0, lt).trim() !== loopVar) {
    return unresolved;
  }
  const bound = cond.slice(lt + 1).trim();
  if (/^\d+$/.test(bound)) {
    return { count: Number.parseInt(bound, 10), bound };
  }
  return { count: fixedCountMacros[bound] ?? null, bound };
}

// Count net `{` minus `}` on a line, ignoring string/char literals and comments.
function braceDelta(line) {
  const code = stripLineComment(line.replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, '').replace(/\/\*.*?\*\//g, ''));
  return (code.match(/\{/g)?.length ?? 0) - (code.match(/\}/g)?.length ?? 0);
}

console.log('Parsing msp.c for payload fields...');
const mspCPath = path.join(firmwarePath, 'src/main/msp/msp.c');
const mspCContent = readFile(mspCPath);

// mspOutPayloads / mspInPayloads: commandName -> { fields: [...] }
// Kept separate so bidirectional commands don't mix OUT and IN fields in one array.
const mspOutPayloads = {};
const mspInPayloads = {};

if (mspCContent) {
  const lines = mspCContent.split('\n');

  // Line ranges for out vs in handlers (0-indexed), detected by scanning for function signatures:
  // out = mspCommonProcessOutCommand .. mspProcessInCommand, in = mspProcessInCommand .. mspFcProcessCommand
  let outStart = -1;
  let inStart = -1;
  let inEnd = -1;

  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    // Signatures may carry attribute macros such as RAM_CODE or NOINLINE before `static`
    if (l.match(/^(?:[A-Z_]+\s+)*static bool msp(?:Common)?ProcessOutCommand\s*\(/)) {
      if (outStart === -1) outStart = i;
    }
    if (l.match(/^(?:[A-Z_]+\s+)*static mspResult_e mspProcessInCommand\s*\(/)) {
      inStart = i;
    }
    if (l.match(/^(?:[A-Z_]+\s+)*mspResult_e mspFcProcessCommand\s*\(/)) {
      inEnd = i;
      break;
    }
  }

  if (outStart === -1 || inStart === -1 || inEnd === -1) {
    console.error(`Error: could not locate MSP handler functions in msp.c (outStart=${outStart}, inStart=${inStart}, inEnd=${inEnd})`);
    process.exit(1);
  }

  // Parse a range of lines for case blocks and sbuf calls
  const parseHandlerRange = (startLine, endLine, direction, payloadsMap) => {
    let currentCommand = null;
    let byteOffset = 0;
    let offsetUnknown = false; // true after a variable-length field; subsequent offsets are unreliable
    let depth = 0; // brace depth, used to find the end of `for` loop bodies
    let loops = []; // open `for` loops in the current case: { bodyDepth, count, bound, startOffset, firstField }
    // `if` blocks inside loops. A block that writes fields and ends in `continue;` is an early-out
    // alternative to the rest of the iteration (e.g. MSP_MOTOR writes 0 for disabled motors), so its
    // fields describe the same bytes and are dropped.
    let ifBlocks = []; // { bodyDepth, startOffset, firstField }
    let lastStatement = '';
    // Preprocessor conditionals. Only the first #if/#elif/#else branch that yields fields for a command
    // is counted, since mutually exclusive branches describe the same payload bytes.
    const ppStack = []; // { inAlt, cmds: commands with fields so far, taken: commands covered by earlier branches }

    const addField = (cmd, field) => {
      cmd.fields.push(field);
      for (const frame of ppStack) {
        frame.cmds.add(currentCommand);
      }
    };

    const closeLoop = (cmd, loop) => {
      const body = cmd.fields.slice(loop.firstField);
      if (body.length === 0) {
        return;
      }
      const bodyBytes = byteOffset - loop.startOffset;
      let label;
      if (loop.count === null) {
        label = `repeated × ${loop.bound ?? 'n'} (runtime count)`;
      } else {
        label = loop.bound === String(loop.count) ? `repeated ×${loop.count}` : `repeated ×${loop.count} (${loop.bound})`;
        if (body.length > 1) {
          label += `, stride ${bodyBytes}`;
        }
      }
      for (const f of body) {
        f.notes = f.notes ? `${label}; ${f.notes}` : label;
      }
      if (loop.count === null) {
        offsetUnknown = true;
      } else if (!offsetUnknown) {
        byteOffset = loop.startOffset + loop.count * bodyBytes;
      }
    };

    // Close `if` blocks and `for` loops whose body ended at the current brace depth
    const closeEndedBlocks = (cmd) => {
      while (ifBlocks.length > 0 && depth < ifBlocks.at(-1).bodyDepth) {
        const block = ifBlocks.pop();
        if (lastStatement === 'continue;' && cmd.fields.length > block.firstField) {
          cmd.fields.splice(block.firstField);
          byteOffset = block.startOffset;
        }
      }
      while (loops.length > 0 && depth < loops.at(-1).bodyDepth) {
        closeLoop(cmd, loops.pop());
      }
    };

    for (let i = startLine; i < endLine && i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      // Preprocessor conditionals
      const pp = trimmed.match(/^#\s*(if|ifdef|ifndef|elif|else|endif)\b/);
      if (pp) {
        if (pp[1].startsWith('if')) {
          ppStack.push({ inAlt: false, cmds: new Set(), taken: new Set() });
        } else if (pp[1] === 'endif') {
          ppStack.pop();
        } else if (ppStack.length > 0) {
          const frame = ppStack.at(-1);
          frame.taken = new Set(frame.cmds);
          frame.inAlt = true;
        }
        continue;
      }

      // Track brace depth; close any `for` loops whose body ended on this line
      depth += braceDelta(line);
      if (currentCommand) {
        closeEndedBlocks(payloadsMap[currentCommand]);
      }
      if (trimmed && !/^[{}]+$/.test(trimmed)) {
        lastStatement = trimmed;
      }

      // Detect new case label
      const caseMatch = trimmed.match(/^case\s+(MSP2?_\w+)\s*:/);
      if (caseMatch) {
        currentCommand = caseMatch[1];
        byteOffset = 0;
        offsetUnknown = false;
        loops = [];
        ifBlocks = [];
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
          loops = [];
          ifBlocks = [];
          continue;
        }
      }

      if (!currentCommand) continue;

      const cmd = payloadsMap[currentCommand];

      // Open a `for` loop; its body sits at the depth reached after this line's `{`
      if (/^for\s*\(/.test(trimmed)) {
        const { count, bound } = resolveLoopCount(trimmed);
        loops.push({ bodyDepth: depth, count, bound, startOffset: byteOffset, firstField: cmd.fields.length });
        continue;
      }
      if (loops.length > 0 && /^if\s*\(.*\{$/.test(trimmed)) {
        ifBlocks.push({ bodyDepth: depth, startOffset: byteOffset, firstField: cmd.fields.length });
        continue;
      }

      // Skip a later #else/#elif branch when an earlier branch already described this command's bytes
      if (ppStack.some((frame) => frame.inAlt && frame.taken.has(currentCommand))) {
        continue;
      }

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
          addField(cmd, { fieldName: fieldName || '(value)', ctype, bytes, offset: offsetUnknown ? '?' : byteOffset, expr, notes, owner: accessorStruct(expr) });
          byteOffset += bytes;
        }
        // Match sbufWriteData/sbufWriteString — variable length; mark subsequent offsets unknown
        else if (line.match(/sbufWriteData\s*\(\s*dst/)) {
          const comment = extractComment(line);
          addField(cmd, { fieldName: '(variable data)', ctype: 'bytes', bytes: null, offset: offsetUnknown ? '?' : byteOffset, expr: null, notes: comment || 'variable-length data' });
          offsetUnknown = true;
        } else if (line.match(/sbufWriteString\s*\(\s*dst|sbufWritePString\s*\(\s*dst/)) {
          const comment = extractComment(line);
          addField(cmd, { fieldName: '(string)', ctype: 'str', bytes: null, offset: offsetUnknown ? '?' : byteOffset, expr: null, notes: comment || 'string data' });
          offsetUnknown = true;
        }
      } else {
        // IN direction: match config->field = sbufReadU8(src) or bare sbufReadU8(src)
        // Also match sbufReadXxConstrained(src, min, max), and sbufReadLookupIndex(src, TABLE_x) which reads a U8
        const typedRead = line.match(/sbufRead(U8|U16|U32|S8|S16|S32|Float)(?:LE|BE)?(?:Constrained)?\s*\(\s*src\s*[,)]/);
        const lookupRead = !typedRead && /sbufReadLookupIndex\s*\(\s*src\s*,/.test(line);
        if (typedRead || lookupRead) {
          const ctype = typedRead ? typedRead[1] : 'U8';
          const bytes = ctypeBytes(ctype);
          // Try to extract lvalue field name
          const assignMatch = line.match(/->\s*(\w+)(\[\w+\])?\s*=\s*sbufRead/);
          let fieldName = null;
          if (assignMatch) {
            fieldName = assignMatch[2] ? `${assignMatch[1]}[]` : assignMatch[1];
          }
          const comment = extractComment(line);
          const expr = trimmed.includes('sbufReadU8(src)') && !assignMatch ? '(ignored)' : null;
          const notes = comment || (expr === '(ignored)' ? 'deprecated/ignored' : null);
          addField(cmd, { fieldName: fieldName || '(read)', ctype, bytes, offset: offsetUnknown ? '?' : byteOffset, expr: null, notes, owner: accessorStruct(line) });
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

/**
 * Fill min/max/type/lookup/default for a payload field from settings.c and PG reset defaults.
 * Names shared by several structs (e.g. `mode`, `deadband`) are only enriched when the handler's
 * PG accessor identifies the struct; a bare-name match could attach another struct's metadata.
 */
function enrichField(f) {
  const { owner } = f;
  delete f.owner;
  if (!f.fieldName) {
    return;
  }
  let setting = fieldLookup[f.fieldName];
  let def = defaultLookup[f.fieldName];
  if (ambiguousFields.has(f.fieldName)) {
    const key = owner ? `${owner}.${f.fieldName}` : null;
    setting = key ? fieldLookupByStruct[key] : undefined;
    def = key ? defaultLookupByStruct[key] : undefined;
  }
  if (setting) {
    f.min = setting.min;
    f.max = setting.max;
    f.settingsType = setting.varType;
    f.lookupTable = setting.lookupTable;
  }
  if (def !== undefined) {
    f.default = def;
  }
}

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
    enrichField(f);
  }
}

// ---------------------------------------------------------------------------
// Generate Markdown tables
// ---------------------------------------------------------------------------

// Escape `|` so C expressions such as `A | B` don't split a Markdown table cell.
function escapeCell(cell) {
  return String(cell ?? '').replace(/(?<!\\)\|/g, String.raw`\|`);
}

function buildTable(headers, rawRows) {
  const rows = rawRows.map((r) => r.map(escapeCell));
  const widths = headers.map((h, i) => Math.max(h.length, ...rows.map((r) => String(r[i] ?? '').length)));
  const header = `| ${headers.map((h, i) => padEnd(h, widths[i])).join(' | ')} |`;
  const sep = `| ${widths.map((w) => '-'.repeat(w)).join(' | ')} |`;
  const body = rows.map((r) => `| ${r.map((cell, i) => padEnd(cell ?? '', widths[i])).join(' | ')} |`);
  return [header, sep, ...body].join('\n');
}

const directionLabel = { out: 'from FC', in: 'to FC', both: 'both', system: 'system', unknown: 'unknown' };

/** PG version cell; build-dependent versions read e.g. `13 (14 with USE_WING)`. */
function formatPgVersion(g) {
  if (g.pgVersion === null) {
    return '—';
  }
  const others = (g.pgVersionVariants ?? []).filter((v) => v.value !== g.pgVersion);
  if (others.length === 0) {
    return String(g.pgVersion);
  }
  const variants = others.map((v) => `${v.value} with ${v.condition}`).join(', ');
  return `${g.pgVersion} (${variants})`;
}

// Summary table
const mspSummaryTable = buildTable(
  ['Command', 'Msg Id', 'Direction', 'Fields', 'Notes'],
  allMspCodes.map((c) => [c.name, c.code, directionLabel[c.direction] || c.direction, c.fields.length > 0 ? String(c.fields.length) : '—', c.notes]),
);

// PG table
const pgTable = buildTable(
  ['ID', 'Name', 'Struct Type', 'PG Version', 'Source File'],
  pgGroups.map((g) => [g.id, g.name, g.structType ?? '—', formatPgVersion(g), g.sourceFile ?? '—']),
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

// Freshness check: renders the diagram in memory and compares it with the committed
// SVGs in static/img/betaflight/, so an edit to the model that was never re-rendered
// fails `npm run check`. Line endings are normalised first, so a Windows checkout with
// core.autocrlf does not count as stale. Run `npm run signal-flow` to fix.
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { OUTPUTS, build } from './render.mjs';

const COMMITTED = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'static', 'img', 'betaflight');
const norm = (s) => s.replaceAll('\r\n', '\n');
const committed = (file) => {
  try {
    return norm(readFileSync(join(COMMITTED, file), 'utf-8'));
  } catch {
    return null; // missing: stale
  }
};
// exactly the files render.mjs owns; a render error throws and fails the check on its own
const stale = OUTPUTS.filter(({ file, theme, model }) => norm(build(theme, model)) !== committed(file)).map((o) => o.file);
if (stale.length) {
  console.error(`signal-flow: ${stale.join(', ')} out of date with tools/signal-flow; run \`npm run signal-flow\``);
  process.exitCode = 1;
} else {
  console.log('signal-flow SVGs up to date');
}

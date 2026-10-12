// Live preview for the signal-flow diagram. Run via `npm run signal-flow:preview`.
//
// Watches the generator sources in this folder, re-runs check.mjs and render.mjs on
// every save and pushes the result to the open page, which swaps in the new SVGs
// without losing its scroll position. Rendering goes to a temp folder, so a broken
// edit never touches static/img/betaflight/; `npm run signal-flow` still writes those.
// Dependency-free, like the rest of tools/signal-flow.
import { createServer } from 'node:http';
import { spawnSync } from 'node:child_process';
import { readFileSync, existsSync, mkdirSync, watch } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(tmpdir(), 'signal-flow-preview');
const PORT = Number(process.env.PORT) || 5178;

mkdirSync(OUT, { recursive: true });

let state = { version: 0, ok: false, check: '', error: '', at: '' };
const clients = new Set();

function run(script, args = []) {
  const r = spawnSync(process.execPath, [join(HERE, script), ...args], { cwd: HERE, encoding: 'utf-8' });
  return { code: r.status, out: (r.stdout || '') + (r.stderr || '') };
}

function build() {
  const check = run('check.mjs');
  const render = run('render.mjs', [OUT]);
  state = {
    version: state.version + 1,
    ok: check.code === 0 && render.code === 0,
    check: check.out.trim(),
    // keep the last good SVGs on screen when the model itself fails to load
    error: render.code === 0 ? '' : render.out.trim(),
    at: new Date().toLocaleTimeString(),
  };
  const msg = `event: build\ndata: ${JSON.stringify(state)}\n\n`;
  for (const res of clients) {
    res.write(msg);
  }
  console.log(`[${state.at}] build ${state.version}: ${state.ok ? 'layout OK' : 'PROBLEMS'}`);
}

let timer = null;
watch(HERE, (_, file) => {
  if (!file?.endsWith('.mjs') || file === 'preview.mjs') {
    return;
  }
  clearTimeout(timer);
  timer = setTimeout(build, 150);
});

const PAGE = String.raw`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Signal Flow Preview</title>
<style>
  :root { --bg: #0e0e10; --panel: #18181b; --line: #2a2a2e; --fg: #e9e9ef; --muted: #8a8a94;
    --ok: #74c791; --bad: #eb8b91; --acc: #ffbb00; --mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--bg); color: var(--fg); font-family: var(--mono); font-size: 12px; }
  header { position: sticky; top: 0; z-index: 1; display: flex; flex-wrap: wrap; gap: 8px 16px; align-items: center;
    padding: 10px 24px; background: var(--bg); border-bottom: 1px solid var(--line); }
  header b { color: var(--acc); letter-spacing: .08em; }
  #status { color: var(--muted); }
  #status.ok { color: var(--ok); }
  #status.bad { color: var(--bad); }
  .spacer { flex: 1; }
  button { font: inherit; color: var(--fg); background: var(--panel); border: 1px solid var(--line);
    border-radius: 4px; padding: 4px 10px; cursor: pointer; }
  button[aria-pressed="true"] { border-color: var(--acc); color: var(--acc); }
  button:focus-visible { outline: 2px solid var(--acc); outline-offset: 1px; }
  pre { margin: 0; padding: 10px 24px; white-space: pre-wrap; color: var(--bad); border-bottom: 1px solid var(--line); }
  main { display: flex; flex-direction: column; gap: 24px; padding: 24px; }
  figure { margin: 0; display: flex; flex-direction: column; gap: 8px; }
  figcaption { color: var(--muted); }
  .frame { border: 1px solid var(--line); overflow-x: auto; }
  .frame.light { background: #ffffff; }
  .frame.dark { background: #18181b; }
  .frame img { display: block; width: 100%; }
  body.actual .frame img { width: auto; max-width: none; }
  [hidden] { display: none !important; }
</style>
</head>
<body>
<header>
  <b>SIGNAL FLOW</b>
  <span id="status">building…</span>
  <span class="spacer"></span>
  <button id="b-overview" aria-pressed="true">Overview</button>
  <button id="b-light" aria-pressed="true">Light</button>
  <button id="b-dark" aria-pressed="true">Dark</button>
  <button id="b-zoom" aria-pressed="false">1:1</button>
</header>
<pre id="problems" hidden></pre>
<main>
  <figure id="f-light"><figcaption>signal-flow-light.svg</figcaption>
    <div class="frame light"><img id="i-light" alt="Signal flow, light theme"></div></figure>
  <figure id="f-dark"><figcaption>signal-flow-dark.svg</figcaption>
    <div class="frame dark"><img id="i-dark" alt="Signal flow, dark theme"></div></figure>
  <figure id="f-overview-light" class="ov"><figcaption>signal-flow-overview-light.svg</figcaption>
    <div class="frame light"><img id="i-overview-light" alt="Module overview, light theme"></div></figure>
  <figure id="f-overview-dark" class="ov"><figcaption>signal-flow-overview-dark.svg</figcaption>
    <div class="frame dark"><img id="i-overview-dark" alt="Module overview, dark theme"></div></figure>
</main>
<script>
  const $ = (id) => document.getElementById(id)
  function show(s) {
    $('status').textContent = (s.ok ? 'layout OK' : 'problems') + ' · build ' + s.version + ' · ' + s.at
    $('status').className = s.ok ? 'ok' : 'bad'
    // a model that fails to load breaks check and render alike: show that trace once
    const text = [s.error, s.ok || s.check === s.error ? '' : s.check].filter(Boolean).join('\n\n')
    $('problems').textContent = text
    $('problems').hidden = !text
    for (const t of ['light', 'dark', 'overview-light', 'overview-dark']) $('i-' + t).src = '/' + t + '.svg?v=' + s.version
  }
  function toggle(btn, fn) {
    btn.addEventListener('click', () => { const on = btn.getAttribute('aria-pressed') !== 'true'
      btn.setAttribute('aria-pressed', on); fn(on) })
  }
  // light / dark pick the themes, overview adds the module overview below the detailed pair
  const sync = () => {
    const on = (id) => $(id).getAttribute('aria-pressed') === 'true'
    $('f-light').hidden = !on('b-light')
    $('f-dark').hidden = !on('b-dark')
    $('f-overview-light').hidden = !(on('b-overview') && on('b-light'))
    $('f-overview-dark').hidden = !(on('b-overview') && on('b-dark'))
  }
  for (const id of ['b-light', 'b-dark', 'b-overview']) toggle($(id), sync)
  toggle($('b-zoom'), (on) => document.body.classList.toggle('actual', on))
  fetch('/status').then((r) => r.json()).then(show)
  new EventSource('/events').addEventListener('build', (e) => show(JSON.parse(e.data)))
</script>
</body>
</html>
`;

createServer((req, res) => {
  const path = req.url.split('?')[0];
  if (path === '/') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    return res.end(PAGE);
  }
  if (path === '/status') {
    res.writeHead(200, { 'content-type': 'application/json' });
    return res.end(JSON.stringify(state));
  }
  if (path === '/events') {
    res.writeHead(200, { 'content-type': 'text/event-stream', 'cache-control': 'no-cache', connection: 'keep-alive' });
    res.write(': connected\n\n');
    clients.add(res);
    const beat = setInterval(() => res.write(': ping\n\n'), 25000);
    req.on('close', () => {
      clearInterval(beat);
      clients.delete(res);
    });
    return;
  }
  const m = path.match(/^\/((?:overview-)?(?:light|dark))\.svg$/);
  const file = m && join(OUT, `signal-flow-${m[1]}.svg`);
  if (file && existsSync(file)) {
    res.writeHead(200, { 'content-type': 'image/svg+xml', 'cache-control': 'no-store' });
    return res.end(readFileSync(file));
  }
  res.writeHead(404);
  res.end('not found');
}).listen(PORT, '127.0.0.1', () => {
  console.log(`signal-flow preview on http://localhost:${PORT} (rendering to ${OUT})`);
  build();
});

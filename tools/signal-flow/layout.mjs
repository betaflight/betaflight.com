// Computed layered layout for the signal-flow model.
//
// model.mjs declares nodes (with lane and group membership), lanes, edges and
// junctions; this module turns that into coordinates and orthogonal routes.
//
//   1. layer assignment  longest path from the sources over the layered edges
//                        (feedback and loop-closing 'fold' edges are excluded),
//                        then ALAP compaction so every chain ends flush against
//                        its consumer; lanes with a flow hint place their members
//                        relative to their feeder (rtl / under / row / stack);
//                        an 'under' lane may start offset columns past its feeder
//   2. rows              lanes in declaration order; a lane flagged row:'share'
//                        sits beside the previous lane when their columns are
//                        disjoint; stacks take a run of rows
//   3. grid snap         fixed column pitch and row pitch; one width per column
//   4. groups            tight bbox of members and their parameter text + GPAD
//   5. tracks            the track graph: column centres, two channels per gap, two
//                        (or three) channels per corridor, port and hint tracks
//   6. routing           Dijkstra over the track graph with bend and overlap
//                        penalties; nodes and foreign groups are hard obstacles,
//                        mirroring the rules in check.mjs
//   7. junctions         placed on the routed host edge at a named track
//   8. labels            edge label anchors clear of artwork and each other
//   9. canvas            notes box, symmetric margins, legend below everything

export const COL_W = 216;
export const NODE_H = 80;
export const GAP = 112;
export const ROW_PITCH = 244;
export const ROW_MID = 42;
export const X0 = 96;
export const Y0 = 104;
export const GPAD = 24;
export const GHEAD = 10; // extra room at the top of a group for its label (the label rides the frame)
const BEND = 320;
const OVERLAP = 260;
// clearance kept between a routed line and other artwork. segHitsRect takes a
// pad that SHRINKS the obstacle, so these are negative: the rect grows by that
// many pixels and the router has to stay outside it.
export const CLEAR_NODE = -16;
export const CLEAR_GROUP = 0;
export const CLEAR_PARAM = -12;
export const CLEAR_OWN_PARAM = -4;
// a line may cross a group frame, but running ALONGSIDE one within FRAME_CLR px
// reads as a mistake, so every grid step that does costs FRAME extra
export const FRAME_CLR = 16;
const FRAME = 300;
const CW = 5.7; // 9.5 px monospace at 0.6 em: the widest common fallback (Menlo, DejaVu Sans Mono)
const LH = 12;

// Inter advance widths (1/1000 em) for the characters the drawing uses, so the
// generator can measure text: edge-label boxes, legend columns, and textLength on long
// titles, which keeps them inside their box when a wider fallback font is used.
const W_CHARS = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\u2192\u2212\u00d7\u00b7\u25b2\u25bc\u03a3\u2026\u2019';
const W_INTER = {
  400: [
    281, 288, 466, 633, 642, 982, 644, 300, 365, 365, 501, 662, 288, 460, 288, 360, 631, 407, 610, 618, 646, 608, 620, 566, 619, 620, 288, 302, 662, 662, 662, 511, 966, 690, 654, 730, 722, 601, 590,
    746, 743, 269, 571, 672, 565, 903, 753, 765, 639, 765, 644, 642, 646, 744, 690, 985, 682, 679, 629, 365, 360, 365, 471, 456, 323, 562, 612, 571, 612, 583, 370, 613, 591, 242, 242, 549, 242, 876,
    591, 600, 612, 612, 376, 528, 327, 591, 562, 818, 546, 562, 552, 426, 333, 426, 662, 954, 662, 662, 288, 1011, 1011, 689, 864, 261,
  ],
  600: [
    252, 321, 523, 644, 650, 1004, 663, 326, 373, 373, 540, 673, 319, 465, 319, 379, 660, 423, 623, 636, 666, 629, 640, 576, 640, 640, 319, 329, 673, 673, 673, 543, 999, 728, 659, 737, 722, 605, 588,
    749, 746, 277, 580, 703, 565, 922, 759, 769, 645, 773, 652, 650, 660, 736, 728, 1020, 720, 713, 652, 373, 379, 373, 481, 469, 351, 574, 624, 583, 624, 591, 389, 625, 612, 262, 262, 569, 262, 900,
    612, 609, 624, 624, 397, 549, 353, 612, 587, 839, 569, 588, 566, 455, 359, 455, 673, 954, 673, 673, 319, 1034, 1034, 692, 956, 294,
  ],
};
export function textW(str, size, weight = 400) {
  const t = W_INTER[weight] || W_INTER[400];
  let w = 0;
  for (const ch of str) {
    const i = W_CHARS.indexOf(ch);
    w += i < 0 ? 600 : t[i];
  }
  return (w / 1000) * size;
}

export function wrap(items, maxchars) {
  const lines = [];
  let cur = '';
  for (const it of items) {
    const cand = cur ? cur + ' · ' + it : it;
    if (cand.length > maxchars && cur) {
      lines.push(cur);
      cur = it;
    } else {
      cur = cand;
    }
  }
  if (cur) {
    lines.push(cur);
  }
  return lines;
}

// 'split' captions sit either side of a bottom or top port, so the line entering
// there runs between them instead of through the text: items fill the left block
// (right-aligned, ending at the port) up to half, the rest go right of it
export function splitParams(d) {
  const port = d.x + d.w / 2 + (d.pport || 0);
  // each half may run 40px past its box edge, like a centred caption does
  const maxL = Math.floor((port - 7 - (d.x - 40)) / CW);
  const maxR = Math.floor((d.x + d.w + 40 - (port + 7)) / CW);
  const left = [],
    right = [];
  const half = Math.ceil(d.params.length / 2);
  for (const it of d.params) {
    if (left.length < half && it.length <= maxL && !right.length) {
      left.push(it);
    } else {
      right.push(it);
    }
  }
  return { port, left: wrap(left, maxL), right: wrap(right, maxR) };
}

// estimated parameter text boxes, same arithmetic as check.mjs; a node may have two
export function paramBoxes(d) {
  if (d.ppos === 'none' || d.ppos === 'inside' || !d.params.length) {
    return [];
  }
  let lines, wpx;
  if (d.ppos === 'left') {
    lines = wrap(d.params, 26);
    wpx = Math.max(...lines.map((l) => l.length)) * CW;
    return [[d.x - 9 - wpx, d.y + 3, wpx, LH * lines.length]];
  }
  if (d.ppos === 'strip') {
    lines = wrap(d.params, d.pwrap);
    wpx = Math.max(...lines.map((l) => l.length)) * CW;
    return [[d.pxy[0], d.pxy[1] - 8, wpx, LH * lines.length]];
  }
  if (d.ppos === 'split') {
    const s = splitParams(d);
    const top = d.y + d.h + 13 - 8;
    const out = [];
    const wl = Math.max(0, ...s.left.map((l) => l.length)) * CW;
    const wr = Math.max(0, ...s.right.map((l) => l.length)) * CW;
    if (s.left.length) {
      out.push([s.port - 7 - wl, top, wl, LH * s.left.length]);
    }
    if (s.right.length) {
      out.push([s.port + 7, top, wr, LH * s.right.length]);
    }
    return out;
  }
  lines = wrap(d.params, Math.floor((d.w + 40) / CW));
  wpx = Math.max(...lines.map((l) => l.length)) * CW;
  const ncx = d.x + d.w / 2;
  const top = d.ppos === 'above' ? d.y - 9 - LH * (lines.length - 1) - 8 : d.y + d.h + 13 - 8;
  return [[ncx - wpx / 2, top, wpx, LH * lines.length]];
}
export const paramBox = (d) => paramBoxes(d)[0] || null;

// every routed segment as [p, q, edge]; render.mjs uses it to arc lines over crossings
export function segments(edges) {
  return edges.flatMap((ed) => ed.pts.slice(0, -1).map((p, k) => [p, ed.pts[k + 1], ed]));
}

// the route as the list of points it passes, 1 px apart
function walkPoints(pts) {
  const out = [];
  for (let k = 0; k < pts.length - 1; k++) {
    const [a, b] = [pts[k], pts[k + 1]];
    const n = Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1]);
    for (let i = 0; i < n; i++) {
      out.push([a[0] + Math.sign(b[0] - a[0]) * i, a[1] + Math.sign(b[1] - a[1]) * i]);
    }
  }
  out.push(pts.at(-1));
  return out;
}

// how many leading points two walks have in common
function commonPrefix(wa, wb) {
  let k = 0;
  while (k < wa.length && k < wb.length && wa[k][0] === wb[k][0] && wa[k][1] === wb[k][1]) {
    k++;
  }
  return k;
}

// where routes of one bus (same source, same bus) part ways: the last point two routes
// share. Every such point needs a branch dot, whether it lies mid-run or on a corner.
// Returns [{ p, cls }], one per point.
export function busSplits(edges) {
  const groups = new Map();
  for (const ed of edges) {
    const k = `${ed.bus}|${ed.from}`;
    if (!groups.has(k)) {
      groups.set(k, []);
    }
    groups.get(k).push(ed);
  }
  const found = new Map();
  for (const es of groups.values()) {
    const ws = es.map((ed) => walkPoints(ed.pts));
    for (let i = 0; i < es.length; i++) {
      for (let j = i + 1; j < es.length; j++) {
        const k = commonPrefix(ws[i], ws[j]);
        if (k > 1) {
          found.set(ws[i][k - 1].join(','), { p: ws[i][k - 1], cls: es[i].cls });
        }
      }
    }
  }
  return [...found.values()];
}

function segHitsRect(p, q, r, pad) {
  const [rx, ry, rw, rh] = [r[0] + pad, r[1] + pad, r[2] - 2 * pad, r[3] - 2 * pad];
  if (rw <= 0 || rh <= 0) {
    return false;
  }
  const [x1, y1] = p;
  const [x2, y2] = q;
  if (y1 === y2) {
    const [lo, hi] = [Math.min(x1, x2), Math.max(x1, x2)];
    return ry < y1 && y1 < ry + rh && lo < rx + rw && hi > rx;
  }
  const [lo, hi] = [Math.min(y1, y2), Math.max(y1, y2)];
  return rx < x1 && x1 < rx + rw && lo < ry + rh && hi > ry;
}
const inRect = (p, r, pad) => r[0] - pad <= p[0] && p[0] <= r[0] + r[2] + pad && r[1] - pad <= p[1] && p[1] <= r[1] + r[3] + pad;

class Heap {
  constructor() {
    this.a = [];
  }
  push(c, v) {
    const a = this.a;
    a.push([c, v]);
    let i = a.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (a[p][0] <= a[i][0]) {
        break;
      }
      [a[p], a[i]] = [a[i], a[p]];
      i = p;
    }
  }
  pop() {
    const a = this.a;
    const top = a[0];
    const last = a.pop();
    if (a.length) {
      a[0] = last;
      let i = 0;
      for (;;) {
        const l = 2 * i + 1,
          r = l + 1;
        let m = i;
        if (l < a.length && a[l][0] < a[m][0]) {
          m = l;
        }
        if (r < a.length && a[r][0] < a[m][0]) {
          m = r;
        }
        if (m === i) {
          break;
        }
        [a[m], a[i]] = [a[i], a[m]];
        i = m;
      }
    }
    return top;
  }
  get size() {
    return this.a.length;
  }
  peek() {
    return this.a[0];
  }
}

// side channels: they never decide a node's column
export const NONLAYERED = new Set(['fb', 'mod', 'tlm', 'phys']);

const MARGIN = 64;
const rect = (d) => [d.x, d.y, d.w, d.h];
const rowsOf = (d) => Array.from({ length: d.rows || 1 }, (_, i) => d.row + i);
const overlaps = (a, b) => a[0] < b[0] + b[2] && b[0] < a[0] + a[2] && a[1] < b[1] + b[3] && b[1] < a[1] + a[3];
const segKey = (a, b) => (a[0] < b[0] || (a[0] === b[0] && a[1] < b[1]) ? `${a}|${b}` : `${b}|${a}`);
const members = (C, lid) => C.nodes.filter((d) => d.lane === lid);
const feederOf = (C, id) => C.edges.filter((e) => e.to === id).map((e) => (C.J[e.from] ? C.J[e.from].host[1] : e.from))[0];
const firstAtLeast = (arr, v) => arr.findIndex((x) => x >= v);
const lastAtMost = (arr, v) => arr.length - 1 - [...arr].reverse().findIndex((x) => x <= v);

// layout() threads one context object C through its phases, which run in order: every
// field below is filled by the phase named beside it and only read by later ones.
function createContext(M) {
  // grid geometry, overridable per model (the module overview uses a coarser grid)
  const P = { colW: COL_W, gap: GAP, rowPitch: ROW_PITCH, rowMid: ROW_MID, nodeH: NODE_H, x0: X0, y0: Y0, corr: 88, lblCw: 5.3, lblSize: 10, ...M.opts };
  const nodes = M.nodes.map((d) => ({ ...d, lane: d.lane || d.group }));
  return {
    M,
    P,
    nodes,
    N: Object.fromEntries(nodes.map((d) => [d.id, d])),
    lanes: M.lanes,
    laneOf: Object.fromEntries(M.lanes.map((l) => [l.id, l])),
    J: Object.fromEntries(M.junctions.map((j) => [j.id, j])),
    edges: M.edges.map((e) => ({ ...e })),
    // 1. layers
    preds: {}, // node id -> layered predecessors
    succs: {}, // node id -> layered successors
    layer: {}, // node id -> column
    fixed: null, // lanes placed by their flow hint, which ALAP compaction leaves alone
    ncol: 0,
    cols: null, // [{ x, w }] per column
    // 2. rows
    row: {}, // node id -> row
    nrow: 0,
    rows: null, // [{ y, pad }] per row
    // 3. grid snap
    cell: null, // 'row:col' -> node id
    // 4. groups
    groups: null, // [{ id, rect, ... }]
    // 5. tracks
    X: null, // Set of x track coordinates
    Yt: null, // Set of y track coordinates
    corrMid: null, // per row: y midway through the corridor above it (null where there is none)
    nodeRects: null, // routing obstacles: node boxes ...
    paramRects: null, // ... and parameter captions
    xs: null, // sorted track coordinates and their index tables
    ys: null,
    xi: null,
    yi: null,
    // 6. routing
    grazeH: null, // per track pair: does a step run alongside a group frame?
    grazeV: null,
    used: new Map(), // segment key -> Set(bus)
    routed: [],
    // 7. junctions
    junctionPt: {},
  };
}

// ------------------------------------------------------------ 1. layers

function buildLayerGraph(C) {
  const layered = C.edges.filter((e) => !NONLAYERED.has(e.cls) && !e.fold);
  for (const e of layered) {
    const from = C.J[e.from] ? C.J[e.from].host[0] : e.from;
    C.succs[from] ??= [];
    C.succs[from].push(e.to);
    C.preds[e.to] ??= [];
    C.preds[e.to].push(from);
  }
}

// a node may span several columns; a 'gapOp' (summing point) sits in the gap
// right before its successors' column and takes no column of its own
const spanOf = (C, id) => (C.N[id].gapOp ? 0 : C.N[id].span || 1);

function visitLayer(C, id, stack = new Set()) {
  const { layer } = C;
  if (layer[id] !== undefined) {
    return layer[id];
  }
  if (stack.has(id)) {
    throw new Error('layering cycle at ' + id);
  }
  stack.add(id);
  // sources start at their lane's shift (default 0); everything else follows its feeders
  const lane = C.N[id].lane && C.laneOf[C.N[id].lane];
  let L = lane?.shift || 0;
  for (const p of C.preds[id] || []) {
    L = Math.max(L, visitLayer(C, p, stack) + spanOf(C, p));
  }
  stack.delete(id);
  layer[id] = L;
  return L;
}

// a stack lane puts all its members in the column of the furthest one
function alignStacks(C) {
  for (const l of C.lanes) {
    if (l.flow !== 'stack') {
      continue;
    }
    const m = members(C, l.id);
    const L = Math.max(...m.map((d) => C.layer[d.id]));
    m.forEach((d) => {
      C.layer[d.id] = L;
    });
  }
}

// one ALAP sweep: pull every free node flush against its nearest layered successor
function alapPass(C) {
  let changed = false;
  for (const d of C.nodes) {
    if (C.fixed.has(d.lane)) {
      continue;
    }
    const s = C.succs[d.id];
    if (!s?.length) {
      continue;
    }
    const L = Math.min(...s.map((x) => C.layer[x])) - spanOf(C, d.id);
    if (L > C.layer[d.id]) {
      C.layer[d.id] = L;
      changed = true;
    }
  }
  return changed;
}

// consecutive columns for a run of nodes, starting at `start`, stepping by `step`
function assignRun(layer, m, start, step) {
  let c = start;
  for (const d of m) {
    layer[d.id] = c;
    c += step;
  }
}

function applyFlowLane(C, l) {
  const m = members(C, l.id);
  const { layer } = C;
  if (l.flow === 'row') {
    assignRun(layer, m, l.align === 'start' ? 0 : layer[m[0].id], 1);
  }
  if (l.flow === 'rtl') {
    assignRun(layer, m, layer[feederOf(C, m[0].id)], -1);
  }
  if (l.flow === 'under') {
    assignRun(layer, m, layer[feederOf(C, m[0].id)] + (l.offset || 0), 1);
  }
  if (l.col !== undefined) {
    assignRun(layer, m, l.col, 1);
  }
}

function buildColumns(C) {
  const { P, layer } = C;
  C.ncol = Math.max(...C.nodes.map((d) => layer[d.id] + Math.max(spanOf(C, d.id), 1) - (d.gapOp ? 1 : 0))) + 1;
  const colW = new Array(C.ncol).fill(P.colW);
  for (const l of C.lanes) {
    if (l.colW) {
      members(C, l.id).forEach((d) => {
        colW[layer[d.id]] = Math.max(colW[layer[d.id]], l.colW);
      });
    }
  }
  C.cols = [];
  for (let c = 0, x = P.x0; c < C.ncol; c++) {
    C.cols.push({ x, w: colW[c] });
    x += colW[c] + P.gap;
  }
}

function assignLayers(C) {
  buildLayerGraph(C);
  C.nodes.forEach((d) => visitLayer(C, d.id));
  C.fixed = new Set(C.lanes.filter((l) => ['stack', 'rtl', 'under', 'row'].includes(l.flow) || l.col !== undefined).map((l) => l.id));
  alignStacks(C);
  let changed = true;
  while (changed) {
    changed = alapPass(C);
  }
  C.lanes.forEach((l) => applyFlowLane(C, l));
  buildColumns(C);
}

// -------------------------------------------------------------- 2. rows

const layerRange = (C, m) => [Math.min(...m.map((d) => C.layer[d.id])), Math.max(...m.map((d) => C.layer[d.id]))];

// a lane flagged row:'share' reuses the previous lane's row when their columns are disjoint
function sharedRow(C, m, prev) {
  const pm = members(C, prev.id);
  const [a1, a2] = layerRange(C, m),
    [b1, b2] = layerRange(C, pm);
  if (a2 < b1 || b2 < a1) {
    return C.row[pm[0].id];
  }
  return undefined;
}

// lanes in declaration order; returns the number of rows used
function assignLaneRows(C) {
  const { row } = C;
  let nextRow = 0,
    prev = null;
  for (const l of C.lanes) {
    const m = members(C, l.id);
    if (l.flow === 'stack') {
      const top = l.top ?? nextRow;
      m.forEach((d, i) => {
        row[d.id] = top + i;
      });
      continue;
    }
    let r;
    if (l.row === 'share' && prev) {
      r = sharedRow(C, m, prev);
    }
    if (r === undefined) {
      r = nextRow++;
    }
    m.forEach((d) => {
      row[d.id] = r;
    });
    prev = l;
  }
  return nextRow;
}

function buildRowGeometry(C) {
  const { P, row } = C;
  // a lane may ask for extra room above its row (padAbove), for a busy corridor
  const rowPad = new Array(C.nrow).fill(0);
  for (const l of C.lanes) {
    const m = members(C, l.id);
    if (l.padAbove && m.length) {
      rowPad[row[m[0].id]] = Math.max(rowPad[row[m[0].id]], l.padAbove);
    }
  }
  const rows = [];
  for (let r = 0, y = P.y0; r < C.nrow; r++) {
    y += rowPad[r];
    rows.push({ y, pad: rowPad[r] });
    y += P.rowPitch;
  }
  return rows;
}

function assignRows(C) {
  const nextRow = assignLaneRows(C);
  for (const d of C.nodes) {
    if (!d.lane && !d.rowCenterOf) {
      C.row[d.id] = C.row[feederOf(C, d.id)];
    }
  }
  C.nrow = nextRow;
  C.rows = buildRowGeometry(C);
}

// --------------------------------------------------------- 3. grid snap

function gapX(C, g) {
  const { cols, ncol, P } = C;
  if (g === 0) {
    return cols[0].x - P.gap / 2;
  }
  if (g === ncol) {
    return cols[ncol - 1].x + cols[ncol - 1].w + P.gap / 2;
  }
  return cols[g - 1].x + cols[g - 1].w + P.gap / 2;
}

function placeX(C, d) {
  const c = C.cols[d.col];
  if (d.gapOp) {
    d.x = gapX(C, d.col) - d.w / 2;
    return;
  }
  if (!d.op) {
    const last = C.cols[d.col + (d.span || 1) - 1];
    d.w = last.x + last.w - c.x;
  }
  d.x = c.x + (c.w - d.w) / 2;
  if (d.span > 1) {
    d.x = c.x;
  }
}

function placeY(C, d) {
  const { P, rows, row } = C;
  if (d.rowCenterOf) {
    const m = members(C, d.rowCenterOf);
    const cy = m.reduce((s, dd) => s + rows[row[dd.id]].y + P.rowMid, 0) / m.length;
    d.y = cy - d.h / 2;
    d.row = null;
    return;
  }
  d.row = row[d.id];
  d.y = rows[d.row].y + P.rowMid - d.h / 2;
  // a node with rows: n spans n grid rows, top of the first to bottom of the last
  if (d.rows > 1) {
    d.h = rows[d.row + d.rows - 1].y + P.rowMid + P.nodeH / 2 - d.y;
  }
}

// which node occupies each grid cell ('row:col'); two nodes in one cell is a model error
function buildCells(C) {
  const cell = {};
  for (const d of C.nodes) {
    if (d.row === null || d.gapOp) {
      continue;
    }
    for (let s = 0; s < (d.span || 1); s++) {
      for (let rr = 0; rr < (d.rows || 1); rr++) {
        const k = d.row + rr + ':' + (d.col + s);
        if (cell[k]) {
          throw new Error(`grid collision ${cell[k]} / ${d.id}`);
        }
        cell[k] = d.id;
      }
    }
  }
  C.cell = cell;
}

function snapToGrid(C) {
  for (const d of C.nodes) {
    d.col = C.layer[d.id];
    // one box size for every node; only the summing points differ
    if (!d.op) {
      d.h = C.P.nodeH;
    }
    placeX(C, d);
    placeY(C, d);
    if (d.ppos === 'strip') {
      d.pxy = [d.x, d.y + d.h + 13];
    }
  }
  buildCells(C);
}

// ------------------------------------------------------------ 4. groups

function groupFrame(C, grp) {
  const m = C.nodes.filter((d) => d.group === grp.id);
  const boxes = [...m.map(rect), ...m.flatMap(paramBoxes)];
  const x1 = Math.min(...boxes.map((b) => b[0])) - GPAD;
  const y1 = Math.min(...boxes.map((b) => b[1])) - GPAD - (grp.labelPos === 'bottom' ? 0 : GHEAD);
  const x2 = Math.max(...boxes.map((b) => b[0] + b[2])) + GPAD;
  const y2 = Math.max(...boxes.map((b) => b[1] + b[3])) + GPAD + (grp.labelPos === 'bottom' ? GHEAD : 0);
  return { ...grp, rect: [x1, y1, x2 - x1, y2 - y1] };
}

// make two panels share top and bottom if they form a band; true when a rect moved
function alignBand(a, b) {
  const [, ay, , ah] = a.rect,
    [, by, , bh] = b.rect;
  const ov = Math.min(ay + ah, by + bh) - Math.max(ay, by);
  if (ov <= 0.5 * Math.min(ah, bh) || Math.max(ah, bh) > 1.6 * Math.min(ah, bh)) {
    return false;
  }
  const top = Math.min(ay, by),
    bot = Math.max(ay + ah, by + bh);
  let moved = false;
  for (const r of [a.rect, b.rect]) {
    if (r[1] !== top || r[1] + r[3] !== bot) {
      r[1] = top;
      r[3] = bot - top;
      moved = true;
    }
  }
  return moved;
}

function buildGroups(C) {
  C.groups = C.M.groups.map((grp) => groupFrame(C, grp));
  // panels side by side in one band share their top and bottom edges. A band is two
  // panels overlapping by more than half the shorter one, of similar height (a panel
  // spanning several rows, like the PID column, stays as it is)
  let moved = true;
  while (moved) {
    moved = false;
    for (const a of C.groups) {
      for (const b of C.groups) {
        if (a !== b && alignBand(a, b)) {
          moved = true;
        }
      }
    }
  }
}

// ------------------------------------------------------------ 5. tracks

const gapTrack = (C, g, k) => gapX(C, g) + 12 * k;

// the edges that bound the row below a corridor (`below`) or the row above it: the outer
// edge of each panel that ends / starts there ...
function panelEdges(C, r, below) {
  const vals = [];
  for (const grp of C.groups) {
    const rs = C.nodes.filter((d) => d.group === grp.id && d.row !== null).flatMap(rowsOf);
    if (!rs.length) {
      continue;
    }
    const touches = below ? Math.min(...rs) === r : Math.max(...rs) === r - 1;
    if (touches) {
      vals.push(below ? grp.rect[1] : grp.rect[1] + grp.rect[3]);
    }
  }
  return vals;
}

// ... and of each bare block (with its caption) outside any panel
function blockEdges(C, r, below) {
  const vals = [];
  for (const d of C.nodes) {
    if (d.group || d.row === null || !rowsOf(d).includes(below ? r : r - 1)) {
      continue;
    }
    const boxes = [rect(d), ...paramBoxes(d)];
    vals.push(below ? Math.min(...boxes.map((b) => b[1])) : Math.max(...boxes.map((b) => b[1] + b[3])));
  }
  return vals;
}

function bandEdge(C, r, below) {
  const vals = [...panelEdges(C, r, below), ...blockEdges(C, r, below)];
  if (!vals.length) {
    return null;
  }
  return below ? Math.min(...vals) : Math.max(...vals);
}

// a corridor between two rows sits centred between the panels (or bare blocks) of the
// row above and those of the row below; the outer corridors keep the fixed offset
function corridorMids(C) {
  return C.rows.map((_, r) => {
    if (r === 0) {
      return null;
    }
    const a = bandEdge(C, r, false),
      b = bandEdge(C, r, true);
    return a !== null && b !== null && b > a ? Math.round((a + b) / 2) : null;
  });
}

function corrY(C, r) {
  const { nrow, corrMid, rows, P } = C;
  if (r < nrow && corrMid[r] !== null) {
    return corrMid[r];
  }
  const base = r < nrow ? rows[r].y : rows[nrow - 1].y + P.rowPitch;
  return base - P.corr;
}

// padded corridors get a third, middle track, and wider spacing between their tracks so
// parallel runs there (a cased loop line among them) keep room for labels
const isPadded = (C, r) => r < C.nrow && C.rows[r].pad;
const corrTrack = (C, r, k) => corrY(C, r) + (isPadded(C, r) ? 22 : 14) * k;

function addPortTrack(C, nid, side, off) {
  const d = C.N[nid];
  if (!d || !side) {
    return;
  }
  if (side === 'T' || side === 'B') {
    C.X.add(d.x + d.w / 2 + (off || 0));
  } else {
    C.Yt.add(d.y + d.h / 2 + (off || 0));
  }
}

function buildTracks(C) {
  C.X = new Set();
  C.Yt = new Set();
  const { X, Yt } = C;
  C.cols.forEach((c) => X.add(c.x + c.w / 2));
  for (const d of C.nodes) {
    if (d.gapOp) {
      X.add(d.x + d.w / 2);
      X.add(d.x);
      X.add(d.x + d.w);
    }
  }
  for (let g = 0; g <= C.ncol; g++) {
    for (const k of [-1, 1]) {
      X.add(gapTrack(C, g, k));
    }
  }
  C.rows.forEach((r) => Yt.add(r.y + C.P.rowMid));
  C.corrMid = corridorMids(C);
  for (let r = 0; r <= C.nrow; r++) {
    for (const k of isPadded(C, r) ? [-1, 0, 1] : [-1, 1]) {
      Yt.add(corrTrack(C, r, k));
    }
  }
  for (const e of C.edges) {
    addPortTrack(C, e.from, e.out, e.offOut);
    addPortTrack(C, e.to, e.in, e.offIn);
  }
  for (const d of C.nodes) {
    if (d.rowCenterOf) {
      Yt.add(d.y + d.h / 2);
    }
  }
  C.nodeRects = C.nodes.map((d) => ({ id: d.id, r: rect(d) }));
  // parameter captions are artwork too: keep routes off them
  C.paramRects = C.nodes.flatMap((d) => paramBoxes(d).map((r) => ({ id: d.id, r })));
  addHintTracks(C);
  sortTracks(C);
}

// a track hint hangs off a lane's row
const trackRow = (C, t) => C.row[members(C, t.above)[0].id];

function trackValue(C, spec) {
  if (spec.gap !== undefined) {
    return gapTrack(C, spec.gap, spec.k ?? 0);
  }
  if (spec.corridor !== undefined) {
    return corrTrack(C, spec.corridor, spec.k ?? 0);
  }
  if (spec.col !== undefined) {
    return C.cols[spec.col].x + C.cols[spec.col].w / 2;
  }
  throw new Error('bad track spec');
}

// the sorted track coordinates and their index tables
function sortTracks(C) {
  C.xs = [...C.X].sort((a, b) => a - b);
  C.ys = [...C.Yt].sort((a, b) => a - b);
  C.xi = new Map(C.xs.map((v, i) => [v, i]));
  C.yi = new Map(C.ys.map((v, i) => [v, i]));
}

// a track hint may name a corridor's middle track, which unpadded corridors lack
function addHintTracks(C) {
  for (const e of C.edges) {
    for (const t of [e.track || []].flat()) {
      C.Yt.add(corrTrack(C, trackRow(C, t), t.k));
    }
  }
  // junction tracks need to exist as graph tracks so hosts can pass through them
  for (const j of C.M.junctions) {
    if (j.x) {
      C.X.add(trackValue(C, j.x));
    }
    if (j.y) {
      C.Yt.add(trackValue(C, j.y));
    }
  }
}

// ----------------------------------------------------------- 6. routing

// does a step along a fixed coordinate `at` between lo and hi run alongside a group frame?
function grazes(frameLines, at, lo, hi, wantVert) {
  return frameLines.some((f) => f.vert === wantVert && Math.abs(at - f.at) < FRAME_CLR && hi > f.lo - FRAME_CLR && lo < f.hi + FRAME_CLR);
}

// frame-graze tables: a step is penalised when it runs parallel to and within
// FRAME_CLR of any group border. Precomputed per track pair, since the router
// does hundreds of thousands of lookups.
function buildGrazeTables(C) {
  const { xs, ys } = C;
  const frameLines = [];
  for (const grp of C.groups) {
    const [gx, gy, gw, gh] = grp.rect;
    frameLines.push(
      { vert: true, at: gx, lo: gy, hi: gy + gh },
      { vert: true, at: gx + gw, lo: gy, hi: gy + gh },
      { vert: false, at: gy, lo: gx, hi: gx + gw },
      { vert: false, at: gy + gh, lo: gx, hi: gx + gw },
    );
  }
  C.grazeH = ys.map((y) => xs.slice(0, -1).map((x, i) => grazes(frameLines, y, x, xs[i + 1], false)));
  C.grazeV = xs.map((x) => ys.slice(0, -1).map((y, j) => grazes(frameLines, x, y, ys[j + 1], true)));
}

// where a route leaves or enters a node: the port on its border and the nearest track crossing
function sidePort(C, d, side, off) {
  const port = [side === 'R' ? d.x + d.w : d.x, d.y + d.h / 2 + (off || 0)];
  const j = C.yi.get(port[1]);
  const i = side === 'R' ? firstAtLeast(C.xs, port[0]) : lastAtMost(C.xs, port[0]);
  return { port, i, j, dir: 0 };
}

function capPort(C, d, side, off) {
  const port = [d.x + d.w / 2 + (off || 0), side === 'B' ? d.y + d.h : d.y];
  const i = C.xi.get(port[0]);
  const j = side === 'B' ? firstAtLeast(C.ys, port[1]) : lastAtMost(C.ys, port[1]);
  return { port, i, j, dir: 1 };
}

function portLink(C, d, side, off) {
  const { port, i, j, dir } = side === 'R' || side === 'L' ? sidePort(C, d, side, off) : capPort(C, d, side, off);
  const pt = [C.xs[i], C.ys[j]];
  const len = Math.abs(pt[0] - port[0]) + Math.abs(pt[1] - port[1]);
  return { port, i, j, dir, len, seg: [port, pt] };
}

// clearance rules: everything the route does not own is grown by the CLEAR_*
// margin; its own endpoints keep the old tight fit so ports stay reachable
function hitsObstacle(C, allow, p, q, exclude) {
  return (
    C.nodeRects.some((nr) => segHitsRect(p, q, nr.r, exclude.has(nr.id) ? 3 : CLEAR_NODE)) ||
    C.paramRects.some((pr) => segHitsRect(p, q, pr.r, exclude.has(pr.id) ? CLEAR_OWN_PARAM : CLEAR_PARAM)) ||
    C.groups.some((grp) => !allow.has(grp.id) && segHitsRect(p, q, grp.rect, CLEAR_GROUP))
  );
}

// a route may touch the groups its endpoints sit in
function noteAllow(C, allow, p) {
  C.groups.forEach((grp) => {
    if (inRect(p, grp.rect, 14)) {
      allow.add(grp.id);
    }
  });
}

// the start candidates of an edge: its junction point, or a port on each allowed side.
// Adds the groups those points sit in to `allow` (shared with routeGoals)
function routeStarts(C, e, allow) {
  if (C.J[e.from]) {
    const jp = C.junctionPt[e.from];
    if (!jp) {
      throw new Error(`junction ${e.from} not placed before edge to ${e.to}`);
    }
    noteAllow(C, allow, jp.p);
    return [{ i: C.xi.get(jp.p[0]), j: C.yi.get(jp.p[1]), dir: jp.perp, cost: 0, port: jp.p }];
  }
  const starts = [];
  for (const side of e.out.split('')) {
    const l = portLink(C, C.N[e.from], side, e.offOut);
    noteAllow(C, allow, l.port);
    starts.push({ ...l, cost: l.len });
  }
  return starts;
}

// the goal ports of an edge, one per allowed side; adds their groups to `allow` too
function routeGoals(C, e, allow) {
  const goals = [];
  for (const side of e.in.split('')) {
    const l = portLink(C, C.N[e.to], side, e.offIn);
    noteAllow(C, allow, l.port);
    goals.push(l);
  }
  return goals;
}

// track hint: an edge may claim one track of a corridor (track: { above: lane, k });
// horizontal runs on that corridor's other tracks cost extra
function offTrackSet(C, e) {
  if (!e.track) {
    return null;
  }
  const offTrack = new Set();
  for (const t of [e.track].flat()) {
    const r = trackRow(C, t),
      want = corrTrack(C, r, t.k);
    for (const k of [-1, 0, 1]) {
      if (corrTrack(C, r, k) !== want) {
        offTrack.add(corrTrack(C, r, k));
      }
    }
  }
  return offTrack;
}

// Dijkstra state: a graph node is (track column i, track row j, heading dir)
const stateKey = (ny, i, j, dir) => (i * ny + j) * 2 + dir;
const decodeKey = (k, ny) => {
  const dir = k % 2,
    ij = (k - dir) / 2,
    j = ij % ny;
  return [(ij - j) / ny, j, dir];
};
const STEPS = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 1],
  [0, -1, 1],
];

function newSearch(C, okStarts, base) {
  const S = { ...base, ny: C.ys.length, dist: new Map(), parent: new Map(), heap: new Heap(), best: null };
  for (const s of okStarts) {
    const k = stateKey(S.ny, s.i, s.j, s.dir);
    S.dist.set(k, s.cost);
    S.parent.set(k, { start: s });
    S.heap.push(s.cost, k);
  }
  return S;
}

// a goal port sitting on the settled graph node closes a candidate route
function offerGoals(S, cur) {
  for (const gl of S.goals) {
    if (gl.i === cur.i && gl.j === cur.j) {
      const total = cur.c + (cur.dir !== gl.dir ? BEND : 0) + gl.len;
      if (!S.best || total < S.best.cost) {
        S.best = { cost: total, k: cur.k, goal: gl };
      }
    }
  }
}

// cost of the step from `cur` to q: length, bend, frame graze, overlap with another bus
function stepCost(C, S, cur, q, nd, ni, nj) {
  const p = cur.p;
  let cost = cur.c + Math.abs(q[0] - p[0]) + Math.abs(q[1] - p[1]) + (nd !== cur.dir ? BEND : 0);
  if (nd === 0 ? C.grazeH[cur.j][Math.min(cur.i, ni)] : C.grazeV[cur.i][Math.min(cur.j, nj)]) {
    cost += FRAME;
  }
  if (S.offTrack && nd === 0 && S.offTrack.has(p[1])) {
    cost += OVERLAP;
  }
  const u = C.used.get(segKey(p, q));
  if (u && !u.has(S.bus)) {
    cost += OVERLAP;
  }
  return cost;
}

function expandState(C, S, cur) {
  const { xs, ys } = C;
  for (const [di, dj, nd] of STEPS) {
    const ni = cur.i + di,
      nj = cur.j + dj;
    if (ni < 0 || nj < 0 || ni >= xs.length || nj >= S.ny) {
      continue;
    }
    const q = [xs[ni], ys[nj]];
    if (hitsObstacle(C, S.allow, cur.p, q, S.excl)) {
      continue;
    }
    const cost = stepCost(C, S, cur, q, nd, ni, nj);
    const nk = stateKey(S.ny, ni, nj, nd);
    if (cost < (S.dist.get(nk) ?? Infinity)) {
      S.dist.set(nk, cost);
      S.parent.set(nk, { from: cur.k });
      S.heap.push(cost, nk);
    }
  }
}

function runSearch(C, S) {
  while (S.heap.size) {
    const [c, k] = S.heap.pop();
    if (S.dist.get(k) !== c) {
      continue;
    }
    if (S.best && c >= S.best.cost) {
      break;
    }
    const [i, j, dir] = decodeKey(k, S.ny);
    const cur = { c, k, i, j, dir, p: [C.xs[i], C.ys[j]] };
    offerGoals(S, cur);
    expandState(C, S, cur);
  }
}

// walk the parent links back from the best goal to a start; returns the points start-first
function tracePath(C, S) {
  const { best } = S;
  const pts = [best.goal.port];
  for (let k = best.k; ; ) {
    const [i, j] = decodeKey(k, S.ny);
    pts.push([C.xs[i], C.ys[j]]);
    const par = S.parent.get(k);
    if (par.start) {
      if (par.start.port) {
        pts.push(par.start.port);
      }
      break;
    }
    k = par.from;
  }
  return pts.reverse();
}

function markUsed(C, pts, bus) {
  for (let k = 0; k < pts.length - 1; k++) {
    const s = segKey(pts[k], pts[k + 1]);
    if (!C.used.has(s)) {
      C.used.set(s, new Set());
    }
    C.used.get(s).add(bus);
  }
}

// merge collinear points
function mergeCollinear(pts) {
  const out = [pts[0]];
  for (let k = 1; k < pts.length - 1; k++) {
    const a = out.at(-1),
      b = pts[k],
      c = pts[k + 1];
    if ((a[0] === b[0] && b[0] === c[0]) || (a[1] === b[1] && b[1] === c[1])) {
      continue;
    }
    out.push(b);
  }
  out.push(pts.at(-1));
  return out;
}

// clone: port and junction points are shared objects (one junction feeds
// several edges), and later passes translate points in place
function orthogonalCopy(out, e) {
  const clean = out.map((p) => [p[0], p[1]]);
  for (let k = 0; k < clean.length - 1; k++) {
    const [a, b] = [clean[k], clean[k + 1]];
    if (a[0] !== b[0] && a[1] !== b[1]) {
      throw new Error(`non-orthogonal segment ${a} -> ${b} on ${e.from} -> ${e.to}`);
    }
  }
  return clean;
}

function route(C, e) {
  const allow = new Set();
  const starts = routeStarts(C, e, allow);
  const goals = routeGoals(C, e, allow);
  const excl = new Set([e.from, e.to]);
  const okStarts = starts.filter((s) => !s.seg || !hitsObstacle(C, allow, s.seg[0], s.seg[1], excl));
  const okGoals = goals.filter((gl) => !hitsObstacle(C, allow, gl.seg[0], gl.seg[1], excl));
  if (!okStarts.length || !okGoals.length) {
    throw new Error(`no free port for ${e.from} -> ${e.to}`);
  }
  const bus = e.bus || (C.J[e.from] ? C.junctionPt[e.from].bus : e.from);
  const S = newSearch(C, okStarts, { goals: okGoals, allow, excl, bus, offTrack: offTrackSet(C, e) });
  runSearch(C, S);
  if (!S.best) {
    throw new Error(`no route for ${e.from} -> ${e.to}`);
  }
  const pts = tracePath(C, S);
  markUsed(C, pts, bus);
  return { pts: orthogonalCopy(mergeCollinear(pts), e), bus };
}

// --------------------------------------------------------- 7. junctions

const between = (a, b, v) => Math.min(a, b) < v && v < Math.max(a, b);

// the point on the routed host edge where the junction's track crosses it (the last
// matching segment wins)
function locateJunction(j, pts, v, bus) {
  let found;
  for (let k = 0; k < pts.length - 1; k++) {
    const [a, b] = [pts[k], pts[k + 1]];
    if (j.x && a[1] === b[1] && between(a[0], b[0], v)) {
      found = { p: [v, a[1]], perp: 1, bus };
    }
    if (j.y && a[0] === b[0] && between(a[1], b[1], v)) {
      found = { p: [a[0], v], perp: 0, bus };
    }
  }
  return found;
}

function placeJunctions(C, e, bus) {
  for (const j of C.M.junctions) {
    if (C.junctionPt[j.id] || j.host[0] !== e.from || j.host[1] !== e.to) {
      continue;
    }
    const jp = locateJunction(j, e.pts, trackValue(C, j.x || j.y), bus);
    if (!jp) {
      throw new Error(`junction ${j.id} does not sit on its host`);
    }
    C.junctionPt[j.id] = jp;
  }
}

// a branch the router started with a short run back along its host line branches
// where that run ends: move the junction dot there and drop the run, so the dot sits
// on the real branch point (and a line crossing the host at the old spot just hops)
function trimBranchRuns(C) {
  for (const [id, jp] of Object.entries(C.junctionPt)) {
    const outs = C.routed.filter((e) => e.from === id);
    if (outs.length !== 1) {
      continue;
    }
    const pts = outs[0].pts;
    if (pts.length < 3) {
      continue;
    }
    const [a, b] = pts;
    const alongHost = jp.perp === 1 ? a[1] === b[1] : a[0] === b[0];
    if (!alongHost || a[0] !== jp.p[0] || a[1] !== jp.p[1]) {
      continue;
    }
    jp.p = [b[0], b[1]];
    outs[0].pts = pts.slice(1);
  }
}

// every outgoing route leaves the junction along axis k
const leavesAlong = (outs, jp, k) => outs.length > 0 && outs.every((e) => e.pts.length > 1 && e.pts[0][k] === jp.p[k] && e.pts[1][k] === jp.p[k]);

// a junction may ask for its branch to sit further along the host (shift: px along the
// host line): the dot and the first leg of every outgoing route move together
function shiftJunctions(C) {
  for (const j of C.M.junctions) {
    if (!j.shift || !C.junctionPt[j.id]) {
      continue;
    }
    const jp = C.junctionPt[j.id];
    const k = jp.perp === 1 ? 0 : 1; // shift x on a horizontal host, y on a vertical one
    const outs = C.routed.filter((e) => e.from === j.id);
    if (!leavesAlong(outs, jp, k)) {
      continue;
    }
    for (const e of outs) {
      e.pts = e.pts.map((p) => [...p]);
      e.pts[0][k] += j.shift;
      e.pts[1][k] += j.shift;
    }
    jp.p = [...jp.p];
    jp.p[k] += j.shift;
  }
}

function routeAll(C) {
  buildGrazeTables(C);
  for (const e of C.edges) {
    const r = route(C, e);
    e.pts = r.pts;
    e.bus = r.bus;
    C.routed.push(e);
    placeJunctions(C, e, r.bus);
  }
  trimBranchRuns(C);
  shiftJunctions(C);
}

// ----------------------------------------------------------- 8. labels

// automatic label anchor: candidates beside every segment on the preferred axis
// (both sides, nine positions along it); the first candidate in preference order
// (longest segment, centre, above / right) that collides with nothing wins, else
// the one with the fewest collisions. Obstacles: nodes, captions, group headers,
// group frames (a label may not straddle one), labels already placed.

// the segments of a routed edge a label may sit beside, longest first
function labelSegments(e) {
  const segs = [];
  for (let k = 0; k < e.pts.length - 1; k++) {
    const [a, b] = [e.pts[k], e.pts[k + 1]];
    const horiz = a[1] === b[1];
    if ((e.labelPref === 'h' && !horiz) || (e.labelPref === 'v' && horiz)) {
      continue;
    }
    segs.push({ a, b, horiz, len: Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) });
  }
  segs.sort((p, q) => q.len - p.len);
  return segs;
}

// anchors above and below a horizontal segment at fraction f of its length
function horizontalAnchors(e, a, b, f, est, lm) {
  const lo = Math.min(a[0], b[0]),
    hi = Math.max(a[0], b[0]);
  const x = Math.max(lo + 6, lo + (hi - lo) * f - est / 2);
  if (x + est > hi + 4 && hi - lo > est) {
    return [];
  }
  const k = lm.cw / 5.2;
  const c = e.cased ? lm.cas : 0;
  const above = Math.min(a[1] - 9 * k + (e.labelDy || 0), a[1] - c - 3 * k);
  const below = Math.max(a[1] + 15 * k + (e.labelDy || 0), a[1] + c + 9 * k + 3);
  return [above, below].map((yy) => [x + (e.labelDx || 0), yy]);
}

// anchors either side of a vertical segment at fraction f of its length
function verticalAnchors(e, a, b, f, est, lm) {
  const y = Math.min(a[1], b[1]) + Math.abs(a[1] - b[1]) * f + 4;
  const d = Math.max(7, (e.cased ? lm.cas : 0) + 4);
  return [d, -d - est].map((dx) => [a[0] + dx + (e.labelDx || 0), y + (e.labelDy || 0)]);
}

function labelCandidates(e, est, lm) {
  const fractions = [...[e.labelF ?? []].flat(), 0.5, 0.3, 0.7, 0.4, 0.6, 0.2, 0.8, 0.1, 0.9];
  const cands = [];
  for (const { a, b, horiz } of labelSegments(e)) {
    for (const f of fractions) {
      cands.push(...(horiz ? horizontalAnchors(e, a, b, f, est, lm) : verticalAnchors(e, a, b, f, est, lm)));
    }
  }
  return cands;
}

// label boxes scale with the label font
const labelBox = ([x, y], est, lm) => [x - 1, y - 9 * (lm.cw / 5.2), est + 2, 12 * (lm.cw / 5.2)];

const crossesFrame = (r, g) => {
  const inside = r[0] >= g[0] && r[1] >= g[1] && r[0] + r[2] <= g[0] + g[2] && r[1] + r[3] <= g[1] + g[3];
  return overlaps(r, g) && !inside;
};

const hitsLine = (routed, r) => routed.some((o) => o.pts.slice(0, -1).some((p, k) => segHitsRect(p, o.pts[k + 1], r, 0)));

// collision score of a label box: 10 per obstacle it overlaps, 3 if it sits on a line
function labelScore(C, r, headerRects, placed) {
  let n = 0;
  n += 10 * C.nodeRects.filter((nr) => overlaps(r, nr.r)).length;
  n += 10 * C.paramRects.filter((pr) => overlaps(r, pr.r)).length;
  n += 10 * headerRects.filter((hr) => overlaps(r, hr)).length;
  n += 10 * placed.filter((pl) => overlaps(r, pl)).length;
  // a label sits inside a panel or outside it, never across its frame
  n += 10 * C.groups.filter((grp) => crossesFrame(r, grp.rect)).length;
  if (hitsLine(C.routed, r)) {
    n += 3;
  }
  return n;
}

// the first candidate that collides with nothing, else the one with the lowest score
function bestLabelAnchor(C, cands, est, lm, headerRects, placed) {
  let best = null,
    bestScore = Infinity;
  for (const c of cands) {
    const sc = labelScore(C, labelBox(c, est, lm), headerRects, placed);
    if (sc < bestScore) {
      best = c;
      bestScore = sc;
    }
    if (sc === 0) {
      break;
    }
  }
  return best;
}

function placeLabels(C) {
  // labels on main-loop edges keep clear of the casing laid under them
  const lm = { cw: C.P.lblCw, cas: C.P.casingClr || 0 };
  const headerRects = C.groups.map((grp) => {
    const [x, y, , h] = grp.rect;
    const ly = grp.labelPos === 'bottom' ? y + h - 10 : y + 18;
    return [x + 10, ly - 13, grp.label.length * 9.2 + (grp.src ? 12 + grp.src.length * 5.7 : 0) + 12, 17];
  });
  const placed = [];
  for (const e of C.routed) {
    if (!e.label) {
      continue;
    }
    const est = Math.ceil(textW(e.label, C.P.lblSize)) + 1; // measured; italic runs a touch wider
    const cands = labelCandidates(e, est, lm);
    if (!cands.length) {
      continue;
    }
    e.lpos = bestLabelAnchor(C, cands, est, lm, headerRects, placed);
    placed.push(labelBox(e.lpos, est, lm));
  }
}

// --------------------------------------- 9. canvas: notes box, legend, margins

// the first row with three free cells in a line holds the notes box
function notesBox(C) {
  for (let r = 0; r < C.nrow; r++) {
    for (let c = 0; c + 2 < C.ncol; c++) {
      if ([0, 1, 2].every((k) => !C.cell[r + ':' + (c + k)])) {
        return [C.cols[c].x, C.rows[r].y + C.P.rowMid - 30 - GPAD, C.cols[c + 2].x + C.cols[c + 2].w - C.cols[c].x, 36 + 19 * (C.P.notesN ?? 6)];
      }
    }
  }
  return null;
}

function translateX(C, notes, shift) {
  for (const d of C.nodes) {
    d.x += shift;
    if (d.pxy) {
      d.pxy[0] += shift;
    }
  }
  for (const grp of C.groups) {
    grp.rect[0] += shift;
  }
  for (const ed of C.routed) {
    ed.pts.forEach((p) => {
      p[0] += shift;
    });
    if (ed.lpos) {
      ed.lpos[0] += shift;
    }
  }
  for (const j of Object.values(C.junctionPt)) {
    j.p[0] += shift;
  }
  C.cols.forEach((c) => {
    c.x += shift;
  });
  if (notes) {
    notes[0] += shift;
  }
}

function frameCanvas(C) {
  const notes = notesBox(C);
  // symmetric margins: the widest painted extent (groups, nodes, edge routes)
  // gets the same clearance on both sides; the legend spans the same width
  const extents = [...C.groups.map((grp) => [grp.rect[0], grp.rect[0] + grp.rect[2]]), ...C.nodes.map((d) => [d.x, d.x + d.w]), ...C.routed.flatMap((ed) => ed.pts.map((p) => [p[0], p[0]]))];
  const left = Math.min(...extents.map((e) => e[0]));
  const right = Math.max(...extents.map((e) => e[1]));
  const shift = MARGIN - left;
  translateX(C, notes, shift);
  const W = right + shift + MARGIN;
  // the legend goes below everything painted, routes included (a feedback bus may run
  // under the last row)
  const bottom = Math.max(...C.groups.map((grp) => grp.rect[1] + grp.rect[3]), ...C.nodes.map((d) => d.y + d.h), ...C.routed.flatMap((ed) => ed.pts.map((p) => p[1])));
  const legend = [MARGIN, bottom + 64, W - 2 * MARGIN, C.P.legendH ?? 182];
  const H = legend[1] + legend[3] + MARGIN;
  return { notes, legend, W, H };
}

export function layout(M) {
  const C = createContext(M);
  assignLayers(C); // 1
  assignRows(C); // 2
  snapToGrid(C); // 3
  buildGroups(C); // 4
  buildTracks(C); // 5
  routeAll(C); // 6 and 7
  placeLabels(C); // 8
  const { notes, legend, W, H } = frameCanvas(C); // 9
  const { nodes, N, cols, rows, groups, routed, junctionPt, xs, ys } = C;
  return { nodes, N, cols, rows, groups, edges: routed, junctions: junctionPt, xs, ys, W, H, notes, legend, MARGIN, gapTrack: (g, k) => gapTrack(C, g, k), corrTrack: (r, k) => corrTrack(C, r, k) };
}

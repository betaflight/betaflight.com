// Geometry validator for the signal-flow models: catches overlaps and stray routing.
// Checks the detailed diagram (model.mjs) and the module overview (overview.mjs) with
// the same rules. Run via `npm run signal-flow` (it runs before the renderer).
import { realpathSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as DETAILED from './model.mjs';
import * as OVERVIEW from './overview.mjs';
import { paramBoxes, segments, textW } from './layout.mjs';

function rectsOverlap(a, b, pad = 0) {
  const [ax, ay, aw, ah] = a;
  const [bx, by, bw, bh] = b;
  return !(ax + aw <= bx + pad || bx + bw <= ax + pad || ay + ah <= by + pad || by + bh <= ay + pad);
}

const nodeRect = (d) => [d.x, d.y, d.w, d.h];

// axis-aligned segment vs rect, shrunk by pad so touching an edge is fine
function segHitsRect(p, q, r, pad = 3) {
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
  if (x1 === x2) {
    const [lo, hi] = [Math.min(y1, y2), Math.max(y1, y2)];
    return rx < x1 && x1 < rx + rw && lo < ry + rh && hi > ry;
  }
  return false;
}

const inRect = (p, r, pad = 0) => r[0] - pad <= p[0] && p[0] <= r[0] + r[2] + pad && r[1] - pad <= p[1] && p[1] <= r[1] + r[3] + pad;

// plain box overlap (no padding, touching edges do not count)
const ov = (a, b) => a[0] < b[0] + b[2] && b[0] < a[0] + a[2] && a[1] < b[1] + b[3] && b[1] < a[1] + a[3];

// index of the first segment of a polyline that hits the rect, or -1
function firstSegmentHitting(pts, rect, pad) {
  for (let k = 0; k < pts.length - 1; k++) {
    if (segHitsRect(pts[k], pts[k + 1], rect, pad)) {
      return k;
    }
  }
  return -1;
}

// the model's groups plus the notes box, as [x, y, w, h, label] (what the rules treat as frames)
function groupsOf(M) {
  const { GROUPS: MODEL_GROUPS, NOTES_BOX } = M;
  return [...MODEL_GROUPS.map((grp) => grp.slice(0, 5)), ...(NOTES_BOX ? [[...NOTES_BOX, 'Read this first']] : [])];
}

// 1. canvas bounds
function checkCanvasBounds({ NODES, W, H, bad }) {
  for (const d of NODES) {
    if (d.x < 8 || d.y < 8 || d.x + d.w > W - 8 || d.y + d.h > H - 8) {
      bad(`OUT OF CANVAS: ${d.id} at (${d.x},${d.y},${d.w},${d.h})`);
    }
  }
}

// 2. node/node overlap
function checkNodeOverlap({ NODES, bad }) {
  for (let i = 0; i < NODES.length; i++) {
    for (const b of NODES.slice(i + 1)) {
      if (rectsOverlap(nodeRect(NODES[i]), nodeRect(b))) {
        bad(`NODE OVERLAP: ${NODES[i].id} <-> ${b.id}`);
      }
    }
  }
}

// 3. group/group overlap
function checkGroupOverlap({ GROUPS, bad }) {
  for (let i = 0; i < GROUPS.length; i++) {
    for (const b of GROUPS.slice(i + 1)) {
      if (rectsOverlap(GROUPS[i].slice(0, 4), b.slice(0, 4))) {
        bad(`GROUP OVERLAP: '${GROUPS[i][4].slice(0, 26)}' <-> '${b[4].slice(0, 26)}'`);
      }
    }
  }
}

// 4. node vs foreign group: a node must be fully inside a group or fully outside every group
function checkNodeGroupStraddle({ NODES, GROUPS, bad }) {
  for (const d of NODES) {
    for (const grp of GROUPS) {
      const [gx, gy, gw, gh] = grp.slice(0, 4);
      const inside = d.x >= gx && d.y >= gy && d.x + d.w <= gx + gw && d.y + d.h <= gy + gh;
      if (rectsOverlap(nodeRect(d), grp.slice(0, 4)) && !inside) {
        bad(`NODE STRADDLES GROUP: ${d.id} vs '${grp[4].slice(0, 26)}'`);
      }
    }
  }
}

// 5. operator circles vs nodes and groups
function checkOps(ctx) {
  const { NODES, OPS, GROUPS, bad } = ctx;
  for (const [id, ocx, ocy, r] of OPS) {
    const orect = [ocx - r, ocy - r, 2 * r, 2 * r];
    for (const d of NODES) {
      if (rectsOverlap(orect, nodeRect(d))) {
        bad(`OP OVERLAPS NODE: ${id} <-> ${d.id}`);
      }
    }
    for (const grp of GROUPS) {
      const [gx, gy, gw, gh] = grp.slice(0, 4);
      const inside = ocx - r >= gx && ocy - r >= gy && ocx + r <= gx + gw && ocy + r <= gy + gh;
      if (rectsOverlap(orect, grp.slice(0, 4)) && !inside) {
        bad(`OP STRADDLES GROUP: ${id} vs '${grp[4].slice(0, 26)}'`);
      }
    }
  }
}

// 6. edges must be orthogonal, and must not pass through node boxes
function checkEdgeSegment({ NODES, bad }, ed, k) {
  const [a, b] = [ed.pts[k], ed.pts[k + 1]];
  if (a[0] !== b[0] && a[1] !== b[1]) {
    bad(`NON-ORTHOGONAL SEGMENT: ${a}..${b}  [label=${ed.label}]`);
  }
  for (const d of NODES) {
    if (segHitsRect(ed.pts[k], ed.pts[k + 1], nodeRect(d))) {
      bad(`EDGE THROUGH NODE: ${ed.pts[k]}..${ed.pts[k + 1]} crosses ${d.id}  [label=${ed.label}]`);
    }
  }
}

function checkEdgesOrthogonal(ctx) {
  for (const ed of ctx.E) {
    for (let k = 0; k < ed.pts.length - 1; k++) {
      checkEdgeSegment(ctx, ed, k);
    }
  }
  for (const [a, b] of ctx.STUBS) {
    if (a[0] !== b[0] && a[1] !== b[1]) {
      ctx.bad(`NON-ORTHOGONAL STUB: ${a}..${b}`);
    }
  }
  // (stub vs caption runs after the caption boxes are known, see rule 8)
}

// 7. edges must not cut through a group box they neither start nor end inside
function checkEdgesCutGroups({ E, GROUPS, bad }) {
  for (const ed of E) {
    const pts = ed.pts;
    for (const grp of GROUPS) {
      const gr = grp.slice(0, 4);
      if (inRect(pts[0], gr, 14) || inRect(pts.at(-1), gr, 14)) {
        continue;
      }
      const k = firstSegmentHitting(pts, gr, 6);
      if (k >= 0) {
        bad(`EDGE CUTS GROUP: '${grp[4].slice(0, 26)}'  seg ${pts[k]}..${pts[k + 1]}  [label=${ed.label}]`);
      }
    }
  }
}

// 8. parameter text blocks: the layout's caption boxes, checked against nodes and each other
function checkParamBox({ NODES, W, H, bad }, pid, pb) {
  if (pb[0] < 4 || pb[1] < 4 || pb[0] + pb[2] > W - 4 || pb[1] + pb[3] > H - 4) {
    bad(`PARAMS OFF CANVAS: ${pid}`);
  }
  for (const d of NODES) {
    if (d.id === pid) {
      continue;
    }
    if (rectsOverlap(pb, nodeRect(d), 1)) {
      bad(`PARAMS OVER NODE: ${pid} params hit ${d.id}`);
    }
  }
}

function checkParamsOverlap({ pboxes, bad }) {
  for (let i = 0; i < pboxes.length; i++) {
    for (const [pb, bb] of pboxes.slice(i + 1)) {
      if (pb === pboxes[i][0]) {
        continue;
      } // the two halves of one split caption
      if (rectsOverlap(pboxes[i][1], bb, 1)) {
        bad(`PARAMS OVERLAP: ${pboxes[i][0]} <-> ${pb}`);
      }
    }
  }
}

function checkStubsThroughParams({ pboxes, STUBS, bad }) {
  for (const [a, b, lab] of STUBS) {
    for (const [pid, pb] of pboxes) {
      if (segHitsRect(a, b, pb, 0)) {
        bad(`STUB THROUGH PARAMS: '${lab}' crosses the caption of ${pid}`);
      }
    }
  }
}

function checkParams(ctx) {
  for (const [pid, pb] of ctx.pboxes) {
    checkParamBox(ctx, pid, pb);
  }
  checkParamsOverlap(ctx);
  checkStubsThroughParams(ctx);
}

// 9. every node reachable by at least one edge endpoint or stub (sanity: nothing orphaned)
function touchNodes(NODES, touched, p) {
  for (const d of NODES) {
    if (inRect(p, nodeRect(d), 3)) {
      touched.add(d.id);
    }
  }
}

function checkOrphans({ NODES, E, STUBS, bad }) {
  const touched = new Set();
  for (const ed of E) {
    for (const p of ed.pts) {
      touchNodes(NODES, touched, p);
    }
  }
  for (const [a, b] of STUBS) {
    for (const p of [a, b]) {
      touchNodes(NODES, touched, p);
    }
  }
  const orphan = NODES.filter((d) => !touched.has(d.id)).map((d) => d.id);
  if (orphan.length) {
    bad(`ORPHAN NODES (no edge touches them): ${orphan.join(', ')}`);
  }
}

// 10. routed lines must keep clear of artwork they do not terminate at
const CLEAR = 12;

function checkSegmentClearance({ NODES, pboxes, bad }, ed, k, owned) {
  for (const d of NODES) {
    if (owned.has(d.id)) {
      continue;
    }
    if (segHitsRect(ed.pts[k], ed.pts[k + 1], nodeRect(d), -CLEAR)) {
      bad(`LINE TOO CLOSE TO NODE (<${CLEAR}px): ${ed.pts[k]}..${ed.pts[k + 1]} near ${d.id}  [label=${ed.label}]`);
    }
  }
  // a line may approach the caption of the node it ends at, but never cross it
  for (const [pid, pb] of pboxes) {
    const pad = owned.has(pid) ? 0 : -8;
    if (segHitsRect(ed.pts[k], ed.pts[k + 1], pb, pad)) {
      bad(`LINE ${pad ? 'TOO CLOSE TO' : 'THROUGH'} PARAMS: ${ed.pts[k]}..${ed.pts[k + 1]} near ${pid}  [label=${ed.label}]`);
    }
  }
}

function checkLineClearance(ctx) {
  const { NODES, E } = ctx;
  for (const ed of E) {
    const ends = ed.pts.length ? [ed.pts[0], ed.pts.at(-1)] : [];
    const owned = new Set(NODES.filter((d) => ends.some((p) => inRect(p, nodeRect(d), 4))).map((d) => d.id));
    for (let k = 0; k < ed.pts.length - 1; k++) {
      checkSegmentClearance(ctx, ed, k, owned);
    }
  }
}

// 11. a line may cross a group frame, but must not run alongside one
const FRAME_CLEAR = 14;

// the four sides of every group as [vertical?, fixed coordinate, from, to, label]
function frameLinesOf(GROUPS) {
  const frameLines = [];
  for (const grp of GROUPS) {
    const [x, y, w, h] = grp.slice(0, 4);
    frameLines.push([1, x, y, y + h, grp[4]], [1, x + w, y, y + h, grp[4]], [0, y, x, x + w, grp[4]], [0, y + h, x, x + w, grp[4]]);
  }
  return frameLines;
}

// orientation, fixed coordinate and extent of an axis-aligned segment
function segmentSpan(a, b) {
  const horiz = a[1] === b[1];
  const fixed = horiz ? a[1] : a[0];
  const lo = horiz ? Math.min(a[0], b[0]) : Math.min(a[1], b[1]);
  const hi = horiz ? Math.max(a[0], b[0]) : Math.max(a[1], b[1]);
  return { horiz, fixed, lo, hi };
}

function checkSegmentAlongsideFrames({ bad }, ed, a, b, frameLines) {
  const { horiz, fixed, lo, hi } = segmentSpan(a, b);
  for (const [vert, at, flo, fhi, lab] of frameLines) {
    if (vert === (horiz ? 1 : 0)) {
      continue;
    }
    if (Math.abs(fixed - at) >= FRAME_CLEAR) {
      continue;
    }
    if (Math.min(hi, fhi) - Math.max(lo, flo) <= 24) {
      continue;
    }
    bad(`LINE ALONGSIDE GROUP FRAME (<${FRAME_CLEAR}px): ${a}..${b} on '${lab.slice(0, 26)}'  [label=${ed.label}]`);
  }
}

function checkFrameClearance(ctx) {
  const { E, GROUPS } = ctx;
  const frameLines = frameLinesOf(GROUPS);
  for (const ed of E) {
    for (let k = 0; k < ed.pts.length - 1; k++) {
      const [a, b] = [ed.pts[k], ed.pts[k + 1]];
      if (Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) < 24) {
        continue;
      }
      checkSegmentAlongsideFrames(ctx, ed, a, b, frameLines);
    }
  }
}

// 13. routes and stubs must not cross a group's header text (label + source note)
function groupHeaderRect(grp) {
  const [x, y, , h, lab, src, pos] = grp;
  // the label sits inside the panel, along its top (or bottom) edge
  const ly = pos === 'bottom' ? y + h - 10 : y + 18;
  const hw = lab.length * 9.2 + (src ? 12 + src.length * 5.7 : 0);
  return [x + 10, ly - 13, hw + 12, 17];
}

function checkGroupHeaders({ MODEL_GROUPS, E, STUBS, bad }) {
  for (const grp of MODEL_GROUPS) {
    const lab = grp[4];
    const hr = groupHeaderRect(grp);
    for (const ed of E) {
      for (let k = 0; k < ed.pts.length - 1; k++) {
        if (segHitsRect(ed.pts[k], ed.pts[k + 1], hr, 0)) {
          bad(`LINE THROUGH GROUP HEADER: '${lab}'  seg ${ed.pts[k]}..${ed.pts[k + 1]}  [label=${ed.label}]`);
        }
      }
    }
    for (const [a, b, sl] of STUBS) {
      if (segHitsRect(a, b, hr, 0)) {
        bad(`STUB THROUGH GROUP HEADER: '${lab}' [${sl}]`);
      }
    }
  }
}

// 14. edge labels: clear of nodes, captions, lines and each other
function labelBoxes(M) {
  const LCW = M.LBL_CW ?? 5.3;
  const LK = LCW / 5.3; // label boxes scale with the label font
  return M.E.filter((ed) => ed.label && ed.lpos).map((ed) => [ed.label, [ed.lpos[0] - 1, ed.lpos[1] - 9 * LK, Math.ceil(textW(ed.label, M.LBL_SIZE ?? 10)) + 3, 12 * LK]]);
}

function checkLabelBox({ NODES, E, pboxes, bad }, lab, r) {
  for (const d of NODES) {
    if (ov(r, nodeRect(d))) {
      bad(`LABEL OVER NODE: '${lab}' on ${d.id}`);
    }
  }
  for (const [pid, pb] of pboxes) {
    if (ov(r, pb)) {
      bad(`LABEL OVER PARAMS: '${lab}' on ${pid}`);
    }
  }
  for (const ed of E) {
    if (firstSegmentHitting(ed.pts, r, 0) >= 0) {
      bad(`LABEL ON A LINE: '${lab}' crosses [${ed.label}]`);
    }
  }
}

function checkLabels(ctx) {
  const { bad } = ctx;
  const lboxes = labelBoxes(ctx.M);
  for (const [lab, r] of lboxes) {
    checkLabelBox(ctx, lab, r);
  }
  for (let i = 0; i < lboxes.length; i++) {
    for (const [lab, r] of lboxes.slice(i + 1)) {
      if (ov(lboxes[i][1], r)) {
        bad(`LABELS OVERLAP: '${lboxes[i][0]}' / '${lab}'`);
      }
    }
  }
}

// 15. module boxes (overview): title and summary lines fit inside the box
function checkModuleBoxes({ NODES, bad }) {
  for (const d of NODES.filter((n) => n.big)) {
    const room = d.w - 20;
    if (d.title.length * 12.6 > room) {
      bad(`MODULE TITLE TOO WIDE: ${d.id}`);
    }
    for (const s of d.subs) {
      if (s.length * 7.4 > room) {
        bad(`MODULE SUMMARY TOO WIDE: ${d.id} '${s}'`);
      }
    }
    if (26 + 18 * d.subs.length > d.h - 12) {
      bad(`MODULE TEXT TOO TALL: ${d.id}`);
    }
  }
}

// 12. two routes of different buses must not run on top of each other
function sameRoute(e1, e2) {
  return e1 === e2 || (e1.bus && e1.bus === e2.bus);
}

// length of the stretch two axis-aligned segments share on one line (0 when they are not collinear)
function sharedRun(a1, b1, a2, b2) {
  const h1 = a1[1] === b1[1],
    h2 = a2[1] === b2[1];
  if (h1 !== h2) {
    return 0;
  }
  if (h1 ? a1[1] !== a2[1] : a1[0] !== a2[0]) {
    return 0;
  }
  const ax = h1 ? 0 : 1;
  const lo = Math.max(Math.min(a1[ax], b1[ax]), Math.min(a2[ax], b2[ax]));
  const hi = Math.min(Math.max(a1[ax], b1[ax]), Math.max(a2[ax], b2[ax]));
  return hi - lo;
}

function checkRouteOverlap({ E, bad }) {
  const segs = segments(E);
  for (let i = 0; i < segs.length; i++) {
    const [a1, b1, e1] = segs[i];
    for (const [a2, b2, e2] of segs.slice(i + 1)) {
      if (sameRoute(e1, e2)) {
        continue;
      }
      if (sharedRun(a1, b1, a2, b2) > 8) {
        bad(`LINES OVERLAP: ${a1}..${b1} [${e1.label}] and ${a2}..${b2} [${e2.label}]`);
      }
    }
  }
}

// runs every rule on one model and returns the list of problems found (empty when clean)
export function checkModel(M, name) {
  const { NODES, OPS, GROUPS: MODEL_GROUPS, E, STUBS, W, H } = M;
  const problems = [];
  const bad = (msg) => problems.push(`[${name}] ${msg}`);
  // GROUPS: the frames every rule checks against (model groups plus the notes box, as
  // [x, y, w, h, label]); MODEL_GROUPS: the raw model groups, whose source note and label
  // position only the group-header rule needs
  const ctx = { M, NODES, OPS, MODEL_GROUPS, GROUPS: groupsOf(M), E, STUBS, W, H, bad, pboxes: NODES.flatMap((d) => paramBoxes(d).map((r) => [d.id, r])) };

  checkCanvasBounds(ctx);
  checkNodeOverlap(ctx);
  checkGroupOverlap(ctx);
  checkNodeGroupStraddle(ctx);
  checkOps(ctx);
  checkEdgesOrthogonal(ctx);
  checkEdgesCutGroups(ctx);
  checkParams(ctx);
  checkOrphans(ctx);
  checkLineClearance(ctx);
  checkFrameClearance(ctx);
  checkGroupHeaders(ctx);
  checkLabels(ctx);
  checkModuleBoxes(ctx);
  checkRouteOverlap(ctx);
  return problems;
}

function summaryLine(M, name) {
  return `${name}: nodes=${M.NODES.length} groups=${groupsOf(M).length} edges=${M.E.length} ops=${M.OPS.length}`;
}

// validate only when run as a script, so checkModel() can be imported (e.g. by a test)
// without validating both models and exiting. Node
// loads the main module by its real path, so compare real paths (same guard as render.mjs)
if (process.argv[1] && fileURLToPath(import.meta.url) === realpathSync(resolve(process.argv[1]))) {
  const problems = [];
  for (const [M, name] of [
    [DETAILED, 'detailed'],
    [OVERVIEW, 'overview'],
  ]) {
    problems.push(...checkModel(M, name));
    console.log(summaryLine(M, name));
  }
  if (problems.length) {
    console.log(`\n${problems.length} PROBLEM(S):`);
    for (const p of problems) {
      console.log(' -', p);
    }
    process.exit(1);
  }
  console.log('\nlayout OK');
}

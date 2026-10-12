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
//   5. routing           Dijkstra over a track graph (column centres, two channels
//                        per gap, two channels per corridor) with bend and overlap
//                        penalties; nodes and foreign groups are hard obstacles,
//                        mirroring the rules in check.mjs
//   6. junctions         placed on the routed host edge at a named track

export const COL_W = 216
export const NODE_H = 80
export const GAP = 112
export const ROW_PITCH = 244
export const ROW_MID = 42
export const X0 = 96
export const Y0 = 104
export const GPAD = 24
export const GHEAD = 10 // extra room at the top of a group for its label (the label rides the frame)
const BEND = 320
const OVERLAP = 260
// clearance kept between a routed line and other artwork. segHitsRect takes a
// pad that SHRINKS the obstacle, so these are negative: the rect grows by that
// many pixels and the router has to stay outside it.
export const CLEAR_NODE = -16
export const CLEAR_GROUP = 0
export const CLEAR_PARAM = -12
export const CLEAR_OWN_PARAM = -4
// a line may cross a group frame, but running ALONGSIDE one within FRAME_CLR px
// reads as a mistake, so every grid step that does costs FRAME extra
export const FRAME_CLR = 16
const FRAME = 300
const CW = 5.7 // 9.5 px monospace at 0.6 em: the widest common fallback (Menlo, DejaVu Sans Mono)
const LH = 12

// Inter advance widths (1/1000 em) for the characters the drawing uses, so the
// generator can measure text: edge-label boxes, legend columns, and textLength on long
// titles, which keeps them inside their box when a wider fallback font is used.
const W_CHARS = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\u2192\u2212\u00d7\u00b7\u25b2\u25bc\u03a3\u2026\u2019"
const W_INTER = {
  400: [281,288,466,633,642,982,644,300,365,365,501,662,288,460,288,360,631,407,610,618,646,608,620,566,619,620,288,302,662,662,662,511,966,690,654,730,722,601,590,746,743,269,571,672,565,903,753,765,639,765,644,642,646,744,690,985,682,679,629,365,360,365,471,456,323,562,612,571,612,583,370,613,591,242,242,549,242,876,591,600,612,612,376,528,327,591,562,818,546,562,552,426,333,426,662,954,662,662,288,1011,1011,689,864,261],
  600: [252,321,523,644,650,1004,663,326,373,373,540,673,319,465,319,379,660,423,623,636,666,629,640,576,640,640,319,329,673,673,673,543,999,728,659,737,722,605,588,749,746,277,580,703,565,922,759,769,645,773,652,650,660,736,728,1020,720,713,652,373,379,373,481,469,351,574,624,583,624,591,389,625,612,262,262,569,262,900,612,609,624,624,397,549,353,612,587,839,569,588,566,455,359,455,673,954,673,673,319,1034,1034,692,956,294],
}
export function textW(str, size, weight = 400) {
  const t = W_INTER[weight] || W_INTER[400]
  let w = 0
  for (const ch of str) {
    const i = W_CHARS.indexOf(ch)
    w += i < 0 ? 600 : t[i]
  }
  return (w / 1000) * size
}

export function wrap(items, maxchars) {
  const lines = []
  let cur = ''
  for (const it of items) {
    const cand = cur ? cur + ' · ' + it : it
    if (cand.length > maxchars && cur) {
      lines.push(cur)
      cur = it
    } else {
      cur = cand
    }
  }
  if (cur) lines.push(cur)
  return lines
}

// 'split' captions sit either side of a bottom or top port, so the line entering
// there runs between them instead of through the text: items fill the left block
// (right-aligned, ending at the port) up to half, the rest go right of it
export function splitParams(d) {
  const port = d.x + d.w / 2 + (d.pport || 0)
  // each half may run 40px past its box edge, like a centred caption does
  const maxL = Math.floor((port - 7 - (d.x - 40)) / CW)
  const maxR = Math.floor((d.x + d.w + 40 - (port + 7)) / CW)
  const left = [], right = []
  const half = Math.ceil(d.params.length / 2)
  for (const it of d.params) {
    if (left.length < half && it.length <= maxL && !right.length) left.push(it)
    else right.push(it)
  }
  return { port, left: wrap(left, maxL), right: wrap(right, maxR) }
}

// estimated parameter text boxes, same arithmetic as check.mjs; a node may have two
export function paramBoxes(d) {
  if (d.ppos === 'none' || d.ppos === 'inside' || !d.params.length) return []
  let lines, wpx
  if (d.ppos === 'left') {
    lines = wrap(d.params, 26)
    wpx = Math.max(...lines.map((l) => l.length)) * CW
    return [[d.x - 9 - wpx, d.y + 3, wpx, LH * lines.length]]
  }
  if (d.ppos === 'strip') {
    lines = wrap(d.params, d.pwrap)
    wpx = Math.max(...lines.map((l) => l.length)) * CW
    return [[d.pxy[0], d.pxy[1] - 8, wpx, LH * lines.length]]
  }
  if (d.ppos === 'split') {
    const s = splitParams(d)
    const top = d.y + d.h + 13 - 8
    const out = []
    const wl = Math.max(0, ...s.left.map((l) => l.length)) * CW
    const wr = Math.max(0, ...s.right.map((l) => l.length)) * CW
    if (s.left.length) out.push([s.port - 7 - wl, top, wl, LH * s.left.length])
    if (s.right.length) out.push([s.port + 7, top, wr, LH * s.right.length])
    return out
  }
  lines = wrap(d.params, Math.floor((d.w + 40) / CW))
  wpx = Math.max(...lines.map((l) => l.length)) * CW
  const ncx = d.x + d.w / 2
  const top = d.ppos === 'above' ? d.y - 9 - LH * (lines.length - 1) - 8 : d.y + d.h + 13 - 8
  return [[ncx - wpx / 2, top, wpx, LH * lines.length]]
}
export const paramBox = (d) => paramBoxes(d)[0] || null

// every routed segment as [p, q, edge]; render.mjs uses it to arc lines over crossings
export function segments(edges) {
  return edges.flatMap((ed) => ed.pts.slice(0, -1).map((p, k) => [p, ed.pts[k + 1], ed]))
}

// where routes of one bus (same source, same bus) part ways: the last point two routes
// share. Every such point needs a branch dot, whether it lies mid-run or on a corner.
// Returns [{ p, cls }], one per point.
export function busSplits(edges) {
  // the route as the list of points it passes, 1 px apart
  const walk = (pts) => {
    const out = []
    for (let k = 0; k < pts.length - 1; k++) {
      const [a, b] = [pts[k], pts[k + 1]]
      const n = Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1])
      for (let i = 0; i < n; i++) out.push([a[0] + Math.sign(b[0] - a[0]) * i, a[1] + Math.sign(b[1] - a[1]) * i])
    }
    out.push(pts[pts.length - 1])
    return out
  }
  const groups = new Map()
  for (const ed of edges) {
    const k = `${ed.bus}|${ed.from}`
    if (!groups.has(k)) groups.set(k, [])
    groups.get(k).push(ed)
  }
  const found = new Map()
  for (const es of groups.values()) {
    const ws = es.map((ed) => walk(ed.pts))
    for (let i = 0; i < es.length; i++) {
      for (let j = i + 1; j < es.length; j++) {
        let k = 0
        while (k < ws[i].length && k < ws[j].length && ws[i][k][0] === ws[j][k][0] && ws[i][k][1] === ws[j][k][1]) k++
        if (k > 1) found.set(ws[i][k - 1].join(','), { p: ws[i][k - 1], cls: es[i].cls })
      }
    }
  }
  return [...found.values()]
}

function segHitsRect(p, q, r, pad) {
  const [rx, ry, rw, rh] = [r[0] + pad, r[1] + pad, r[2] - 2 * pad, r[3] - 2 * pad]
  if (rw <= 0 || rh <= 0) return false
  const [x1, y1] = p
  const [x2, y2] = q
  if (y1 === y2) {
    const [lo, hi] = [Math.min(x1, x2), Math.max(x1, x2)]
    return ry < y1 && y1 < ry + rh && lo < rx + rw && hi > rx
  }
  const [lo, hi] = [Math.min(y1, y2), Math.max(y1, y2)]
  return rx < x1 && x1 < rx + rw && lo < ry + rh && hi > ry
}
const inRect = (p, r, pad) =>
  r[0] - pad <= p[0] && p[0] <= r[0] + r[2] + pad && r[1] - pad <= p[1] && p[1] <= r[1] + r[3] + pad

class Heap {
  constructor() { this.a = [] }
  push(c, v) {
    const a = this.a
    a.push([c, v])
    let i = a.length - 1
    while (i > 0) {
      const p = (i - 1) >> 1
      if (a[p][0] <= a[i][0]) break
      ;[a[p], a[i]] = [a[i], a[p]]
      i = p
    }
  }
  pop() {
    const a = this.a
    const top = a[0]
    const last = a.pop()
    if (a.length) {
      a[0] = last
      let i = 0
      for (;;) {
        const l = 2 * i + 1, r = l + 1
        let m = i
        if (l < a.length && a[l][0] < a[m][0]) m = l
        if (r < a.length && a[r][0] < a[m][0]) m = r
        if (m === i) break
        ;[a[m], a[i]] = [a[i], a[m]]
        i = m
      }
    }
    return top
  }
  get size() { return this.a.length }
  peek() { return this.a[0] }
}

// side channels: they never decide a node's column
export const NONLAYERED = new Set(['fb', 'mod', 'tlm', 'phys'])

export function layout(M) {
  // grid geometry, overridable per model (the module overview uses a coarser grid)
  const P = { colW: COL_W, gap: GAP, rowPitch: ROW_PITCH, rowMid: ROW_MID, nodeH: NODE_H, x0: X0, y0: Y0, corr: 88, lblCw: 5.3, lblSize: 10, ...M.opts }
  const nodes = M.nodes.map((d) => ({ ...d, lane: d.lane || d.group }))
  const N = Object.fromEntries(nodes.map((d) => [d.id, d]))
  const lanes = M.lanes
  const laneOf = Object.fromEntries(lanes.map((l) => [l.id, l]))
  const members = (lid) => nodes.filter((d) => d.lane === lid)
  const J = Object.fromEntries(M.junctions.map((j) => [j.id, j]))
  const edges = M.edges.map((e) => ({ ...e }))

  // ------------------------------------------------------------ 1. layers
  const layered = edges.filter((e) => !NONLAYERED.has(e.cls) && !e.fold)
  const preds = {}, succs = {}
  for (const e of layered) {
    const from = J[e.from] ? J[e.from].host[0] : e.from
    ;(succs[from] ??= []).push(e.to)
    ;(preds[e.to] ??= []).push(from)
  }
  const layer = {}
  // a node may span several columns; a 'gapOp' (summing point) sits in the gap
  // right before its successors' column and takes no column of its own
  const span = (id) => (N[id].gapOp ? 0 : N[id].span || 1)
  const visit = (id, stack = new Set()) => {
    if (layer[id] !== undefined) return layer[id]
    if (stack.has(id)) throw new Error('layering cycle at ' + id)
    stack.add(id)
    // sources start at their lane's shift (default 0); everything else follows its feeders
    let L = (N[id].lane && laneOf[N[id].lane] && laneOf[N[id].lane].shift) || 0
    for (const p of preds[id] || []) L = Math.max(L, visit(p, stack) + span(p))
    stack.delete(id)
    layer[id] = L
    return L
  }
  nodes.forEach((d) => visit(d.id))
  const fixed = new Set(lanes.filter((l) => ['stack', 'rtl', 'under', 'row'].includes(l.flow) || l.col !== undefined).map((l) => l.id))
  for (const l of lanes) {
    if (l.flow !== 'stack') continue
    const m = members(l.id)
    const L = Math.max(...m.map((d) => layer[d.id]))
    m.forEach((d) => { layer[d.id] = L })
  }
  // ALAP: pull every free node flush against its nearest layered successor
  for (let changed = true; changed;) {
    changed = false
    for (const d of nodes) {
      if (fixed.has(d.lane)) continue
      const s = succs[d.id]
      if (!s || !s.length) continue
      const L = Math.min(...s.map((x) => layer[x])) - span(d.id)
      if (L > layer[d.id]) { layer[d.id] = L; changed = true }
    }
  }
  const feederOf = (id) => edges.filter((e) => e.to === id).map((e) => (J[e.from] ? J[e.from].host[1] : e.from))[0]
  for (const l of lanes) {
    const m = members(l.id)
    if (l.flow === 'row') { let c = l.align === 'start' ? 0 : layer[m[0].id]; m.forEach((d) => { layer[d.id] = c++ }) }
    if (l.flow === 'rtl') { let c = layer[feederOf(m[0].id)]; m.forEach((d) => { layer[d.id] = c-- }) }
    if (l.flow === 'under') { let c = layer[feederOf(m[0].id)] + (l.offset || 0); m.forEach((d) => { layer[d.id] = c++ }) }
    if (l.col !== undefined) { let c = l.col; m.forEach((d) => { layer[d.id] = c++ }) }
  }
  const ncol = Math.max(...nodes.map((d) => layer[d.id] + Math.max(span(d.id), 1) - (d.gapOp ? 1 : 0))) + 1
  const colW = Array(ncol).fill(P.colW)
  for (const l of lanes) if (l.colW) members(l.id).forEach((d) => { colW[layer[d.id]] = Math.max(colW[layer[d.id]], l.colW) })
  const cols = []
  for (let c = 0, x = P.x0; c < ncol; c++) { cols.push({ x, w: colW[c] }); x += colW[c] + P.gap }

  // -------------------------------------------------------------- 2. rows
  const row = {}
  const range = (m) => [Math.min(...m.map((d) => layer[d.id])), Math.max(...m.map((d) => layer[d.id]))]
  let nextRow = 0, prev = null
  for (const l of lanes) {
    const m = members(l.id)
    if (l.flow === 'stack') { const top = l.top ?? nextRow; m.forEach((d, i) => { row[d.id] = top + i }); continue }
    let r
    if (l.row === 'share' && prev) {
      const [a1, a2] = range(m), [b1, b2] = range(members(prev.id))
      if (a2 < b1 || b2 < a1) r = row[members(prev.id)[0].id]
    }
    if (r === undefined) r = nextRow++
    m.forEach((d) => { row[d.id] = r })
    prev = l
  }
  for (const d of nodes) if (!d.lane && !d.rowCenterOf) row[d.id] = row[feederOf(d.id)]
  const nrow = nextRow
  // a lane may ask for extra room above its row (padAbove), for a busy corridor
  const rowPad = Array(nrow).fill(0)
  for (const l of lanes) {
    const m = members(l.id)
    if (l.padAbove && m.length) rowPad[row[m[0].id]] = Math.max(rowPad[row[m[0].id]], l.padAbove)
  }
  const rows = []
  for (let r = 0, y = P.y0; r < nrow; r++) { y += rowPad[r]; rows.push({ y, pad: rowPad[r] }); y += P.rowPitch }

  // --------------------------------------------------------- 3. grid snap
  const gapX = (g) => (g === 0 ? cols[0].x - P.gap / 2 : g === ncol ? cols[ncol - 1].x + cols[ncol - 1].w + P.gap / 2
    : cols[g - 1].x + cols[g - 1].w + P.gap / 2)
  for (const d of nodes) {
    d.col = layer[d.id]
    const c = cols[d.col]
    if (!d.op) d.h = P.nodeH // one box size for every node; only the summing points differ
    if (d.gapOp) {
      d.x = gapX(d.col) - d.w / 2
    } else {
      if (!d.op) {
        const last = cols[d.col + (d.span || 1) - 1]
        d.w = last.x + last.w - c.x
      }
      d.x = c.x + (c.w - d.w) / 2
      if (d.span > 1) d.x = c.x
    }
    if (d.rowCenterOf) {
      const m = members(d.rowCenterOf)
      const cy = m.reduce((s, dd) => s + rows[row[dd.id]].y + P.rowMid, 0) / m.length
      d.y = cy - d.h / 2
      d.row = null
    } else {
      d.row = row[d.id]
      d.y = rows[d.row].y + P.rowMid - d.h / 2
      // a node with rows: n spans n grid rows, top of the first to bottom of the last
      if (d.rows > 1) d.h = rows[d.row + d.rows - 1].y + P.rowMid + P.nodeH / 2 - d.y
    }
    if (d.ppos === 'strip') d.pxy = [d.x, d.y + d.h + 13]
  }
  const cell = {}
  for (const d of nodes) {
    if (d.row === null || d.gapOp) continue
    for (let s = 0; s < (d.span || 1); s++) {
      for (let rr = 0; rr < (d.rows || 1); rr++) {
        const k = d.row + rr + ':' + (d.col + s)
        if (cell[k]) throw new Error(`grid collision ${cell[k]} / ${d.id}`)
        cell[k] = d.id
      }
    }
  }

  // ------------------------------------------------------------ 4. groups
  const rect = (d) => [d.x, d.y, d.w, d.h]
  const groups = M.groups.map((grp) => {
    const m = nodes.filter((d) => d.group === grp.id)
    const boxes = m.map(rect).concat(m.flatMap(paramBoxes))
    const x1 = Math.min(...boxes.map((b) => b[0])) - GPAD
    const y1 = Math.min(...boxes.map((b) => b[1])) - GPAD - (grp.labelPos === 'bottom' ? 0 : GHEAD)
    const x2 = Math.max(...boxes.map((b) => b[0] + b[2])) + GPAD
    const y2 = Math.max(...boxes.map((b) => b[1] + b[3])) + GPAD + (grp.labelPos === 'bottom' ? GHEAD : 0)
    return { ...grp, rect: [x1, y1, x2 - x1, y2 - y1] }
  })
  // panels side by side in one band share their top and bottom edges. A band is two
  // panels overlapping by more than half the shorter one, of similar height (a panel
  // spanning several rows, like the PID column, stays as it is)
  for (let moved = true; moved; ) {
    moved = false
    for (const a of groups) for (const b of groups) {
      if (a === b) continue
      const [, ay, , ah] = a.rect, [, by, , bh] = b.rect
      const ov = Math.min(ay + ah, by + bh) - Math.max(ay, by)
      if (ov <= 0.5 * Math.min(ah, bh) || Math.max(ah, bh) > 1.6 * Math.min(ah, bh)) continue
      const top = Math.min(ay, by), bot = Math.max(ay + ah, by + bh)
      for (const r of [a.rect, b.rect]) if (r[1] !== top || r[1] + r[3] !== bot) { r[1] = top; r[3] = bot - top; moved = true }
    }
  }

  // ------------------------------------------------------------ 5. tracks
  const X = new Set(), Yt = new Set()
  cols.forEach((c) => X.add(c.x + c.w / 2))
  for (const d of nodes) if (d.gapOp) { X.add(d.x + d.w / 2); X.add(d.x); X.add(d.x + d.w) }
  const gapTrack = (g, k) => gapX(g) + 12 * k
  for (let g = 0; g <= ncol; g++) for (const k of [-1, 1]) X.add(gapTrack(g, k))
  rows.forEach((r) => Yt.add(r.y + P.rowMid))
  // a corridor between two rows sits centred between the panels (or bare blocks) of the
  // row above and those of the row below; the outer corridors keep the fixed offset
  const rowsOf = (d) => Array.from({ length: d.rows || 1 }, (_, i) => d.row + i)
  const bandEdge = (r, below) => {
    const vals = []
    for (const grp of groups) {
      const rs = nodes.filter((d) => d.group === grp.id && d.row !== null).flatMap(rowsOf)
      if (!rs.length) continue
      if (below ? Math.min(...rs) === r : Math.max(...rs) === r - 1) vals.push(below ? grp.rect[1] : grp.rect[1] + grp.rect[3])
    }
    for (const d of nodes) {
      if (d.group || d.row === null || !rowsOf(d).includes(below ? r : r - 1)) continue
      const boxes = [rect(d), ...paramBoxes(d)]
      vals.push(below ? Math.min(...boxes.map((b) => b[1])) : Math.max(...boxes.map((b) => b[1] + b[3])))
    }
    return vals.length ? (below ? Math.min(...vals) : Math.max(...vals)) : null
  }
  const corrMid = rows.map((_, r) => {
    if (r === 0) return null
    const a = bandEdge(r, false), b = bandEdge(r, true)
    return a !== null && b !== null && b > a ? Math.round((a + b) / 2) : null
  })
  const corrY = (r) => (r < nrow && corrMid[r] !== null ? corrMid[r]
    : (r < nrow ? rows[r].y : rows[nrow - 1].y + P.rowPitch) - P.corr)
  // padded corridors get a third, middle track, and wider spacing between their tracks so
  // parallel runs there (a cased loop line among them) keep room for labels
  const corrTrack = (r, k) => corrY(r) + (r < nrow && rows[r].pad ? 22 : 14) * k
  for (let r = 0; r <= nrow; r++) for (const k of (r < nrow && rows[r].pad ? [-1, 0, 1] : [-1, 1])) Yt.add(corrTrack(r, k))
  for (const e of edges) {
    for (const [nid, side, off] of [[e.from, e.out, e.offOut], [e.to, e.in, e.offIn]]) {
      const d = N[nid]
      if (!d || !side) continue
      if (side === 'T' || side === 'B') X.add(d.x + d.w / 2 + (off || 0))
      else Yt.add(d.y + d.h / 2 + (off || 0))
    }
  }
  for (const d of nodes) if (d.rowCenterOf) Yt.add(d.y + d.h / 2)
  const xs = [...X].sort((a, b) => a - b), ys = [...Yt].sort((a, b) => a - b)
  const xi = new Map(xs.map((v, i) => [v, i])), yi = new Map(ys.map((v, i) => [v, i]))
  const nodeRects = nodes.map((d) => ({ id: d.id, r: rect(d) }))
  // parameter captions are artwork too: keep routes off them
  const paramRects = nodes.flatMap((d) => paramBoxes(d).map((r) => ({ id: d.id, r })))

  // ----------------------------------------------------------- 6. routing
  const used = new Map() // segment key -> Set(bus)
  const segKey = (a, b) => (a[0] < b[0] || (a[0] === b[0] && a[1] < b[1]) ? `${a}|${b}` : `${b}|${a}`)
  const junctionPt = {}
  const routed = []

  function portLink(d, side, off, which) {
    const cx = d.x + d.w / 2, cy = d.y + d.h / 2
    let port, i, j, dir
    if (side === 'R' || side === 'L') {
      port = [side === 'R' ? d.x + d.w : d.x, cy + (off || 0)]
      j = yi.get(port[1])
      i = side === 'R' ? xs.findIndex((v) => v >= port[0]) : xs.length - 1 - [...xs].reverse().findIndex((v) => v <= port[0])
      dir = 0
    } else {
      port = [cx + (off || 0), side === 'B' ? d.y + d.h : d.y]
      i = xi.get(port[0])
      j = side === 'B' ? ys.findIndex((v) => v >= port[1]) : ys.length - 1 - [...ys].reverse().findIndex((v) => v <= port[1])
      dir = 1
    }
    const pt = [xs[i], ys[j]]
    const len = Math.abs(pt[0] - port[0]) + Math.abs(pt[1] - port[1])
    return { port, i, j, dir, len, seg: [port, pt], which }
  }

  function route(e) {
    const src = N[e.from], dst = N[e.to]
    const allow = new Set()
    const noteAllow = (p) => groups.forEach((grp) => { if (inRect(p, grp.rect, 14)) allow.add(grp.id) })
    // clearance rules: everything the route does not own is grown by the CLEAR_*
    // margin; its own endpoints keep the old tight fit so ports stay reachable
    const hits = (p, q, exclude) => {
      for (const nr of nodeRects) if (segHitsRect(p, q, nr.r, exclude.has(nr.id) ? 3 : CLEAR_NODE)) return true
      for (const pr of paramRects) if (segHitsRect(p, q, pr.r, exclude.has(pr.id) ? CLEAR_OWN_PARAM : CLEAR_PARAM)) return true
      for (const grp of groups) if (!allow.has(grp.id) && segHitsRect(p, q, grp.rect, CLEAR_GROUP)) return true
      return false
    }
    const starts = [], goals = []
    if (J[e.from]) {
      const jp = junctionPt[e.from]
      if (!jp) throw new Error(`junction ${e.from} not placed before edge to ${e.to}`)
      noteAllow(jp.p)
      starts.push({ i: xi.get(jp.p[0]), j: yi.get(jp.p[1]), dir: jp.perp, cost: 0, port: jp.p })
    } else {
      for (const side of e.out.split('')) {
        const l = portLink(src, side, e.offOut)
        noteAllow(l.port)
        starts.push({ ...l, cost: l.len })
      }
    }
    for (const side of e.in.split('')) {
      const l = portLink(dst, side, e.offIn)
      noteAllow(l.port)
      goals.push(l)
    }
    const excl = new Set([e.from, e.to])
    const okStarts = starts.filter((s) => !s.seg || !hits(s.seg[0], s.seg[1], excl))
    const okGoals = goals.filter((gl) => !hits(gl.seg[0], gl.seg[1], excl))
    if (!okStarts.length || !okGoals.length) throw new Error(`no free port for ${e.from} -> ${e.to}`)
    const ny = ys.length
    const key = (i, j, dir) => (i * ny + j) * 2 + dir
    const dist = new Map(), parent = new Map()
    const heap = new Heap()
    for (const s of okStarts) { const k = key(s.i, s.j, s.dir); dist.set(k, s.cost); parent.set(k, { start: s }); heap.push(s.cost, k) }
    let best = null
    const bus = e.bus || (J[e.from] ? junctionPt[e.from].bus : e.from)
    // track hint: an edge may claim one track of a corridor (track: { above: lane, k });
    // horizontal runs on that corridor's other tracks cost extra
    let offTrack = null
    if (e.track) {
      offTrack = new Set()
      for (const t of [].concat(e.track)) {
        const r = trackRow(t), want = corrTrack(r, t.k)
        for (const k of [-1, 0, 1]) if (corrTrack(r, k) !== want) offTrack.add(corrTrack(r, k))
      }
    }
    while (heap.size) {
      const [c, k] = heap.pop()
      if (dist.get(k) !== c) continue
      if (best && c >= best.cost) break
      const dir = k % 2, ij = (k - dir) / 2, j = ij % ny, i = (ij - j) / ny
      for (const gl of okGoals) {
        if (gl.i === i && gl.j === j) {
          const total = c + (dir !== gl.dir ? BEND : 0) + gl.len
          if (!best || total < best.cost) best = { cost: total, k, goal: gl }
        }
      }
      const p = [xs[i], ys[j]]
      for (const [di, dj, nd] of [[1, 0, 0], [-1, 0, 0], [0, 1, 1], [0, -1, 1]]) {
        const ni = i + di, nj = j + dj
        if (ni < 0 || nj < 0 || ni >= xs.length || nj >= ny) continue
        const q = [xs[ni], ys[nj]]
        if (hits(p, q, excl)) continue
        let cost = c + Math.abs(q[0] - p[0]) + Math.abs(q[1] - p[1]) + (nd !== dir ? BEND : 0)
        if (nd === 0 ? grazeH[j][Math.min(i, ni)] : grazeV[i][Math.min(j, nj)]) cost += FRAME
        if (offTrack && nd === 0 && offTrack.has(p[1])) cost += OVERLAP
        const u = used.get(segKey(p, q))
        if (u && !u.has(bus)) cost += OVERLAP
        const nk = key(ni, nj, nd)
        if (cost < (dist.get(nk) ?? Infinity)) { dist.set(nk, cost); parent.set(nk, { from: k }); heap.push(cost, nk) }
      }
    }
    if (!best) throw new Error(`no route for ${e.from} -> ${e.to}`)
    const pts = [best.goal.port]
    for (let k = best.k; ; ) {
      const dir = k % 2, ij = (k - dir) / 2, j = ij % ny, i = (ij - j) / ny
      pts.push([xs[i], ys[j]])
      const par = parent.get(k)
      if (par.start) { if (par.start.port) pts.push(par.start.port); break }
      k = par.from
    }
    pts.reverse()
    for (let k = 0; k < pts.length - 1; k++) {
      const s = segKey(pts[k], pts[k + 1])
      if (!used.has(s)) used.set(s, new Set())
      used.get(s).add(bus)
    }
    // merge collinear points
    const out = [pts[0]]
    for (let k = 1; k < pts.length - 1; k++) {
      const a = out[out.length - 1], b = pts[k], c = pts[k + 1]
      if ((a[0] === b[0] && b[0] === c[0]) || (a[1] === b[1] && b[1] === c[1])) continue
      out.push(b)
    }
    out.push(pts[pts.length - 1])
    // clone: port and junction points are shared objects (one junction feeds
    // several edges), and later passes translate points in place
    const clean = out.map((p) => [p[0], p[1]])
    for (let k = 0; k < clean.length - 1; k++) {
      const [a, b] = [clean[k], clean[k + 1]]
      if (a[0] !== b[0] && a[1] !== b[1]) throw new Error(`non-orthogonal segment ${a} -> ${b} on ${e.from} -> ${e.to}`)
    }
    return { pts: clean, bus }
  }

  const trackValue = (spec) => {
    if (spec.gap !== undefined) return gapTrack(spec.gap, spec.k ?? 0)
    if (spec.corridor !== undefined) return corrTrack(spec.corridor, spec.k ?? 0)
    if (spec.col !== undefined) return cols[spec.col].x + cols[spec.col].w / 2
    throw new Error('bad track spec')
  }
  // a track hint may name a corridor's middle track, which unpadded corridors lack
  const trackRow = (t) => row[members(t.above)[0].id]
  for (const e of edges) for (const t of [].concat(e.track || [])) Yt.add(corrTrack(trackRow(t), t.k))
  // junction tracks need to exist as graph tracks so hosts can pass through them
  for (const j of M.junctions) { if (j.x) X.add(trackValue(j.x)); if (j.y) Yt.add(trackValue(j.y)) }
  xs.splice(0, xs.length, ...[...X].sort((a, b) => a - b)); xi.clear(); xs.forEach((v, i) => xi.set(v, i))
  ys.splice(0, ys.length, ...[...Yt].sort((a, b) => a - b)); yi.clear(); ys.forEach((v, i) => yi.set(v, i))

  // frame-graze tables: a step is penalised when it runs parallel to and within
  // FRAME_CLR of any group border. Precomputed per track pair, since the router
  // does hundreds of thousands of lookups.
  const frameLines = []
  for (const grp of groups) {
    const [gx, gy, gw, gh] = grp.rect
    frameLines.push({ vert: true, at: gx, lo: gy, hi: gy + gh })
    frameLines.push({ vert: true, at: gx + gw, lo: gy, hi: gy + gh })
    frameLines.push({ vert: false, at: gy, lo: gx, hi: gx + gw })
    frameLines.push({ vert: false, at: gy + gh, lo: gx, hi: gx + gw })
  }
  const grazes = (fixed, lo, hi, wantVert) => frameLines.some((f) => f.vert === wantVert
    && Math.abs(fixed - f.at) < FRAME_CLR && hi > f.lo - FRAME_CLR && lo < f.hi + FRAME_CLR)
  const grazeH = ys.map((y) => xs.slice(0, -1).map((x, i) => grazes(y, x, xs[i + 1], false)))
  const grazeV = xs.map((x) => ys.slice(0, -1).map((y, j) => grazes(x, y, ys[j + 1], true)))

  for (const e of edges) {
    const r = route(e)
    e.pts = r.pts
    e.bus = r.bus
    routed.push(e)
    for (const j of M.junctions) {
      if (junctionPt[j.id] || j.host[0] !== e.from || j.host[1] !== e.to) continue
      const v = j.x ? trackValue(j.x) : trackValue(j.y)
      for (let k = 0; k < e.pts.length - 1; k++) {
        const [a, b] = [e.pts[k], e.pts[k + 1]]
        if (j.x && a[1] === b[1] && Math.min(a[0], b[0]) < v && v < Math.max(a[0], b[0])) junctionPt[j.id] = { p: [v, a[1]], perp: 1, bus: r.bus }
        if (j.y && a[0] === b[0] && Math.min(a[1], b[1]) < v && v < Math.max(a[1], b[1])) junctionPt[j.id] = { p: [a[0], v], perp: 0, bus: r.bus }
      }
      if (!junctionPt[j.id]) throw new Error(`junction ${j.id} does not sit on its host`)
    }
  }

  // a branch the router started with a short run back along its host line branches
  // where that run ends: move the junction dot there and drop the run, so the dot sits
  // on the real branch point (and a line crossing the host at the old spot just hops)
  for (const [id, jp] of Object.entries(junctionPt)) {
    const outs = routed.filter((e) => e.from === id)
    if (outs.length !== 1) continue
    const pts = outs[0].pts
    if (pts.length < 3) continue
    const [a, b] = pts
    const alongHost = jp.perp === 1 ? a[1] === b[1] : a[0] === b[0]
    if (!alongHost || a[0] !== jp.p[0] || a[1] !== jp.p[1]) continue
    jp.p = [b[0], b[1]]
    outs[0].pts = pts.slice(1)
  }
  // a junction may ask for its branch to sit further along the host (shift: px along the
  // host line): the dot and the first leg of every outgoing route move together
  for (const j of M.junctions) {
    if (!j.shift || !junctionPt[j.id]) continue
    const jp = junctionPt[j.id]
    const k = jp.perp === 1 ? 0 : 1 // shift x on a horizontal host, y on a vertical one
    const outs = routed.filter((e) => e.from === j.id)
    const ok = outs.length && outs.every((e) => e.pts.length > 1 && e.pts[0][k] === jp.p[k] && e.pts[1][k] === jp.p[k])
    if (!ok) continue
    for (const e of outs) {
      e.pts = e.pts.map((p) => [...p])
      e.pts[0][k] += j.shift
      e.pts[1][k] += j.shift
    }
    jp.p = [...jp.p]
    jp.p[k] += j.shift
  }

  // automatic label anchor: candidates beside every segment on the preferred axis
  // (both sides, nine positions along it); the first candidate in preference order
  // (longest segment, centre, above / right) that collides with nothing wins, else
  // the one with the fewest collisions. Obstacles: nodes, captions, group headers,
  // group frames (a label may not straddle one), labels already placed.
  const LBL_CW = P.lblCw
  const headerRects = groups.map((grp) => {
    const [x, y, , h] = grp.rect
    const ly = grp.labelPos === 'bottom' ? y + h - 10 : y + 18
    return [x + 10, ly - 13, grp.label.length * 9.2 + (grp.src ? 12 + grp.src.length * 5.7 : 0) + 12, 17]
  })
  // labels on main-loop edges keep clear of the casing laid under them
  const CAS = P.casingClr || 0
  const placed = []
  const overlaps = (a, b) => a[0] < b[0] + b[2] && b[0] < a[0] + a[2] && a[1] < b[1] + b[3] && b[1] < a[1] + a[3]
  for (const e of routed) {
    if (!e.label) continue
    const est = Math.ceil(textW(e.label, P.lblSize)) + 1 // measured; italic runs a touch wider
    const segs = []
    for (let k = 0; k < e.pts.length - 1; k++) {
      const [a, b] = [e.pts[k], e.pts[k + 1]]
      const horiz = a[1] === b[1]
      if (e.labelPref === 'h' && !horiz) continue
      if (e.labelPref === 'v' && horiz) continue
      segs.push({ a, b, horiz, len: Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) })
    }
    segs.sort((p, q) => q.len - p.len)
    const cands = []
    for (const { a, b, horiz } of segs) {
      for (const f of [...[].concat(e.labelF ?? []), 0.5, 0.3, 0.7, 0.4, 0.6, 0.2, 0.8, 0.1, 0.9]) {
        if (horiz) {
          const lo = Math.min(a[0], b[0]), hi = Math.max(a[0], b[0])
          const x = Math.max(lo + 6, lo + (hi - lo) * f - est / 2)
          if (x + est > hi + 4 && hi - lo > est) continue
          const k = LBL_CW / 5.2
          const c = e.cased ? CAS : 0
          const above = Math.min(a[1] - 9 * k + (e.labelDy || 0), a[1] - c - 3 * k)
          const below = Math.max(a[1] + 15 * k + (e.labelDy || 0), a[1] + c + 9 * k + 3)
          for (const yy of [above, below]) cands.push([x + (e.labelDx || 0), yy])
        } else {
          const y = Math.min(a[1], b[1]) + Math.abs(a[1] - b[1]) * f + 4
          const d = Math.max(7, (e.cased ? CAS : 0) + 4)
          for (const dx of [d, -d - est]) cands.push([a[0] + dx + (e.labelDx || 0), y + (e.labelDy || 0)])
        }
      }
    }
    if (!cands.length) continue
    const lk = LBL_CW / 5.2 // label boxes scale with the label font
    const box = ([x, y]) => [x - 1, y - 9 * lk, est + 2, 12 * lk]
    const hitsLine = (r) => routed.some((o) => o.pts.slice(0, -1).some((p, k) => segHitsRect(p, o.pts[k + 1], r, 0)))
    const score = (c) => {
      const r = box(c)
      let n = 0
      for (const nr of nodeRects) if (overlaps(r, nr.r)) n += 10
      for (const pr of paramRects) if (overlaps(r, pr.r)) n += 10
      for (const hr of headerRects) if (overlaps(r, hr)) n += 10
      for (const pl of placed) if (overlaps(r, pl)) n += 10
      // a label sits inside a panel or outside it, never across its frame
      for (const grp of groups) {
        const g = grp.rect
        const inside = r[0] >= g[0] && r[1] >= g[1] && r[0] + r[2] <= g[0] + g[2] && r[1] + r[3] <= g[1] + g[3]
        if (overlaps(r, g) && !inside) n += 10
      }
      if (hitsLine(r)) n += 3
      return n
    }
    let best = null, bestScore = Infinity
    for (const c of cands) {
      const sc = score(c)
      if (sc < bestScore) { best = c; bestScore = sc }
      if (sc === 0) break
    }
    e.lpos = best
    placed.push(box(best))
  }

  // ------------------------------------------------- notes box, legend, canvas
  let notes = null
  for (let r = 0; r < nrow && !notes; r++) {
    for (let c = 0; c + 2 < ncol; c++) {
      if ([0, 1, 2].every((k) => !cell[r + ':' + (c + k)])) {
        notes = [cols[c].x, rows[r].y + P.rowMid - 30 - GPAD, cols[c + 2].x + cols[c + 2].w - cols[c].x, 36 + 19 * (P.notesN ?? 6)]
        break
      }
    }
  }
  // symmetric margins: the widest painted extent (groups, nodes, edge routes)
  // gets the same clearance on both sides; the legend spans the same width
  const extents = groups.map((grp) => [grp.rect[0], grp.rect[0] + grp.rect[2]])
    .concat(nodes.map((d) => [d.x, d.x + d.w]))
    .concat(routed.flatMap((ed) => ed.pts.map((p) => [p[0], p[0]])))
  const left = Math.min(...extents.map((e) => e[0]))
  const right = Math.max(...extents.map((e) => e[1]))
  const MARGIN = 64
  const shift = MARGIN - left
  for (const d of nodes) { d.x += shift; if (d.pxy) d.pxy[0] += shift }
  for (const grp of groups) grp.rect[0] += shift
  for (const ed of routed) { ed.pts.forEach((p) => { p[0] += shift }); if (ed.lpos) ed.lpos[0] += shift }
  for (const j of Object.values(junctionPt)) j.p[0] += shift
  cols.forEach((c) => { c.x += shift })
  if (notes) notes[0] += shift
  const W = right + shift + MARGIN
  // the legend goes below everything painted, routes included (a feedback bus may run
  // under the last row)
  const bottom = Math.max(...groups.map((grp) => grp.rect[1] + grp.rect[3]), ...nodes.map((d) => d.y + d.h),
    ...routed.flatMap((ed) => ed.pts.map((p) => p[1])))
  const legend = [MARGIN, bottom + 64, W - 2 * MARGIN, P.legendH ?? 182]
  const H = legend[1] + legend[3] + MARGIN

  return { nodes, N, cols, rows, groups, edges: routed, junctions: junctionPt, xs, ys, W, H, notes, legend, MARGIN,
    gapTrack, corrTrack }

}

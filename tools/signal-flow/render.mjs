// Renders model.mjs (detailed) and overview.mjs (simplified) to the light and dark SVGs
// in static/img/betaflight/: signal-flow-{light,dark}.svg, signal-flow-overview-{light,dark}.svg.
//
// Visual identity: ink linework on grey module panels. Every block kind has a pale fill,
// an outline in its own hue (Okabe-Ito, see model.mjs) AND a construction of its own:
//   io    stadium (pill), heavy outline          - signal sources / sinks (neutral)
//   proc  rectangle, r 3                         - processing stages (blue)
//   filt  rectangle with two inset side rails    - filters (bluish green)
//   pid   double frame on an amber tint          - PID terms
//   mix   chamfered rectangle                    - mixer / output stages (reddish purple)
//   fb    dashed outline, mixer tint             - computed in the mixer, used next loop
//   plant heavy frame                            - physics (airframe), not firmware
// The main control loop runs on a pale amber casing laid under its lines: the first
// thing the eye follows. Line types: signal (ink, solid; thick for the RX-to-motor
// spine; feedforward is a signal too), scheduling (grey, dash-dot, open arrowhead),
// ESC telemetry (sky blue, dotted), physics (solid, heavier than any signal line),
// external input (stub from an open terminal).
//
// Presentation is baked onto each element as attributes (no <style> block, no CSS):
// the files must survive <img>, rasterisers and sanitisers. Both themes come from the
// same model, so they cannot drift. Run via `npm run signal-flow`.
import { writeFileSync, statSync, realpathSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'
import { FONT, MONO, FW_REV, DIA_VER, LIGHT, DARK, g, esc, wrap, splitParams, hopPath } from './model.mjs'
import { segments, textW } from './layout.mjs'
import * as DETAILED from './model.mjs'
import * as OVERVIEW from './overview.mjs'

let M = DETAILED
let T = LIGHT
let ID = 'sf'

// ------------------------------------------------------------------ type scale
// sizes in px at native scale. Detailed: titles read at 60 % zoom, captions at 100 %.
// Simplified: shown at ~67 %, so nothing is below 16.5 px (11 px rendered).
const TYPE = {
  detailed: {
    ttl: [14.5, 600], sub: [10.5, 400], subLH: 12.5, cnd: [10, 500], rate: [8.5, 700], par: [9.5, 400], parLH: 12,
    elab: [10, 400], grpt: [11.5, 700], src: [9.5, 400], lgt: [11, 400], lgh: [9, 700], note: [11, 400],
    tb: [15, 800], cap: [9, 700], mono: [10.5, 400], opg: [17, 600], opc: [10, 400], sign: [15, 700],
    tagt: [9, 700], bwt: [9.5, 700], nmkt: [9.5, 800],
  },
  overview: {
    ttl: [24, 600], sub: [17, 400], elab: [17, 400], lgt: [17, 400], tb: [17, 800], note: [17, 400],
    opg: [22, 600], sign: [22, 700],
  },
}
const ty = () => (M.OVERVIEW ? TYPE.overview : TYPE.detailed)

function txt(cls, x, y, s, o = {}) {
  const [size, weight] = ty()[cls] || TYPE.detailed[cls]
  const fam = ['rate', 'par', 'src', 'lgh', 'cap', 'mono', 'tagt', 'bwt'].includes(cls) ? MONO : FONT
  const col = o.fill || {
    ttl: T.ink, sub: T.muted, cnd: T.amberInk, rate: T.ink2, par: T.faint, elab: T.muted, grpt: T.grptext,
    src: T.faint, lgt: T.muted, lgh: T.faint, note: T.muted, tb: T.ink, cap: T.faint, mono: T.muted, opg: T.ink,
    opc: T.muted, sign: T.ink, tagt: T.ink, bwt: T.ink, nmkt: '#18181d',
  }[cls]
  const ls = { rate: '.06em', grpt: '.1em', lgh: '.16em', cap: '.16em', tb: '.12em', tagt: '.04em' }[cls]
  const italic = ['cnd', 'elab', 'opc'].includes(cls)
  let a = `class="${cls}" x="${g(x)}" y="${g(y)}" font-family="${fam}" font-size="${size}" `
    + `font-weight="${weight}" fill="${col}"`
  if (ls) a += ` letter-spacing="${ls}"`
  if (italic) a += ' font-style="italic"'
  if (o.anchor && o.anchor !== 'start') a += ` text-anchor="${o.anchor}"`
  if (o.textLength) a += ` textLength="${g(Math.round(o.textLength * 10) / 10)}" lengthAdjust="spacingAndGlyphs"`
  return `<text ${a}>${s}</text>\n`
}
const rect = (x, y, w, h, a) => `<rect x="${g(x)}" y="${g(y)}" width="${g(w)}" height="${g(h)}" ${a}/>\n`
const line = (x1, y1, x2, y2, a) => `<line x1="${g(x1)}" y1="${g(y1)}" x2="${g(x2)}" y2="${g(y2)}" ${a}/>\n`
const pts = (p) => p.map((q) => q.map(g).join(',')).join(' ')

// ------------------------------------------------------------------ line styles
// width, dash, colour token, arrowhead [shape, length, width]; casing under the main loop
const LINES = {
  detailed: {
    sig: { w: 1.6, col: 'ink', head: ['tri', 9, 7] },
    wide: { w: 3, col: 'ink', head: ['tri', 12, 9] },
    mix: { w: 1.6, col: 'ink', head: ['tri', 9, 7] },
    mod: { w: 1.25, col: 'muted', dash: '8 3 1.5 3', head: ['open', 8, 8] },
    tlm: { w: 1.6, col: 'tlm', dash: '0.01 3.6', cap: 'round', head: ['tri', 8, 6.5] },
    phys: { w: 4.5, col: 'phys', head: ['tri', 14, 12] },
    ext: { w: 1.25, col: 'ink', head: ['tri', 8, 6] },
    casing: 12, hop: 5, dot: 3.5,
  },
  overview: {
    sig: { w: 2.2, col: 'ink', head: ['tri', 12, 9] },
    wide: { w: 3.5, col: 'ink', head: ['tri', 15, 12] },
    phys: { w: 6, col: 'phys', head: ['tri', 18, 15] },
    casing: 18, hop: 7, dot: 5,
  },
}
const LS = () => (M.OVERVIEW ? LINES.overview : LINES.detailed)
const styleOf = (cls, wide) => {
  const L = LS()
  if (wide && (cls === 'sig' || cls === 'mix')) return { ...L.wide, key: 'wide' }
  // an unknown class draws as a signal and must use the signal marker, the only one defined for it
  return L[cls] ? { ...L[cls], key: cls } : { ...L.sig, key: 'sig' }
}

// how far a line stops short of its arrow tip, so its butt end sits inside the head
// (where the head is wider than the line); the marker is anchored the same distance back
const headBack = (s) => (s.head[0] === 'open' ? 0.6 : s.head[1] * Math.max(0.45, s.w / s.head[2]) + 0.5)

function markers() {
  const L = LS()
  let o = ''
  for (const key of Object.keys(L)) {
    const s = L[key]
    if (!s || !s.head) continue
    const [shape, len, wid] = s.head
    const col = T[s.col]
    const vb = `0 0 ${g(len)} ${g(wid)}`
    // the tip lands on the line's original end: the line is pulled back by headBack()
    // in edgeSvg() and the marker anchored that same distance behind its tip
    o += `<marker id="${ID}-a-${key}" viewBox="${vb}" refX="${g(len - headBack(s))}" refY="${g(wid / 2)}" `
      + `markerWidth="${g(len)}" markerHeight="${g(wid)}" markerUnits="userSpaceOnUse" orient="auto-start-reverse">`
    o += shape === 'open'
      ? `<path d="M 0.8 0.8 L ${g(len - 0.8)} ${g(wid / 2)} L 0.8 ${g(wid - 0.8)}" fill="none" stroke="${col}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>`
      : `<path d="M 0 0 L ${g(len)} ${g(wid / 2)} L 0 ${g(wid)} z" fill="${col}"/>`
    o += '</marker>\n'
  }
  return o
}

// pull the last point back by d along its final segment
function shorten(p, d) {
  if (!d || p.length < 2) return p
  const q = p.map((v) => [...v])
  // a repeated end point would give a zero-length segment (and NaN below)
  while (q.length > 2 && q[q.length - 1][0] === q[q.length - 2][0] && q[q.length - 1][1] === q[q.length - 2][1]) q.pop()
  const [a, b] = [q[q.length - 2], q[q.length - 1]]
  const len = Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1])
  if (len <= 0.5) return q // too short to pull back without reversing it
  const k = Math.min(d, len - 0.5) / len
  b[0] -= (b[0] - a[0]) * k
  b[1] -= (b[1] - a[1]) * k
  return q
}

// hop radius grows with the stroke width, so a hop on a heavy line stays a hop
function hopped(p, allsegs, ed, w = 1.6) {
  const r = Math.max(5, 2 + 1.75 * w)
  let d = `M ${g(p[0][0])} ${g(p[0][1])}`
  for (let k = 0; k < p.length - 1; k++) {
    d += ' ' + hopPath(p[k], p[k + 1], allsegs, ed, r).split(' ').slice(3).join(' ')
  }
  return d
}

// one routed line; the main-loop casing is drawn separately
// an edge entering a summing point off-centre ends on the circle, not on its bounding box
function toCircle(ed) {
  const op = ed.to && M.OPS.find((o) => o[0] === ed.to && o[3] > 6)
  if (!op) return ed.pts
  const [, cx, cy, r] = op
  const q = ed.pts.map((v) => [...v])
  const [a, b] = [q[q.length - 2], q[q.length - 1]]
  if (a[1] === b[1] && Math.abs(b[1] - cy) < r) b[0] = cx - Math.sign(b[0] - a[0]) * Math.sqrt(r * r - (b[1] - cy) ** 2)
  if (a[0] === b[0] && Math.abs(b[0] - cx) < r) b[1] = cy - Math.sign(b[1] - a[1]) * Math.sqrt(r * r - (b[0] - cx) ** 2)
  return q
}

function edgeSvg(ed, allsegs) {
  const s = styleOf(ed.cls, ed.wide)
  const col = T[s.col]
  const head = ed.arrow && s.head
  const back = head ? headBack(s) : 0
  const p = shorten(toCircle(ed), back)
  const mk = head ? ` marker-end="url(#${ID}-a-${s.key})"` : ''
  const dash = s.dash || (ed.dash ? '6 4' : '')
  let o = `<path class="ln ${ed.cls}${ed.wide ? ' wide' : ''}" d="${hopped(p, allsegs, ed, s.w)}" fill="none" stroke="${col}" `
    + `stroke-width="${s.w}" stroke-linecap="${s.cap || 'butt'}" stroke-linejoin="round"`
    + `${dash ? ` stroke-dasharray="${dash}"` : ''}${mk}/>\n`
  return o
}

function casingSvg() {
  let o = ''
  const w = LS().casing
  for (const ed of M.E) {
    if (!ed.loop) continue
    let p = ed.pts
    if (ed.loopUntil) {
      // keep the polyline up to the point where it passes loopUntil
      const [ux, uy] = ed.loopUntil
      const out = [p[0]]
      for (let k = 1; k < p.length; k++) {
        const [a, b] = [p[k - 1], p[k]]
        const onSeg = (a[1] === b[1] && b[1] === uy && Math.min(a[0], b[0]) <= ux && ux <= Math.max(a[0], b[0]))
          || (a[0] === b[0] && b[0] === ux && Math.min(a[1], b[1]) <= uy && uy <= Math.max(a[1], b[1]))
        if (onSeg) { out.push([ux, uy]); break }
        out.push(b)
      }
      p = out
    }
    o += `<path class="casing" d="M ${p.map((q) => q.map(g).join(' ')).join(' L ')}" fill="none" stroke="${T.casing}" `
      + `stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>\n`
  }
  return o
}

// ------------------------------------------------------------------ blocks
const STROKE = { io: 2.25, proc: 1.25, filt: 1.25, pid: 1.75, mix: 1.25, fb: 1, plant: 3, min: 1.5 }

function shapeSvg(d, ov = false) {
  // ov: module boxes of the simplified view ('min' draws as proc)
  const { x, y, w, h } = d
  const kind = ov ? (d.kind === 'min' ? 'proc' : d.kind) : d.kind
  const fillOf = ov && d.kind === 'min' ? T.grpfill : T.surface
  const sw = ov ? { proc: 1.75, pid: 2, plant: 3.5 }[kind] : STROKE[kind]
  const dash = d.cond ? ' stroke-dasharray="5 3"' : ''
  const base = (fill, stroke) => `fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${dash}`
  if (kind === 'io') return rect(x, y, w, h, `class="bx io" rx="${g(h / 2)}" ${base(T.io_f, T.io_s)}`)
  // computed in the mixer: the mixer's tint, dashed (used one loop later)
  if (kind === 'fb') return rect(x, y, w, h, `class="bx fb" fill="${T.mix_f}" stroke="${T.mix_s}" stroke-width="1.25" stroke-dasharray="3 3"`)
  if (kind === 'plant') return rect(x, y, w, h, `class="bx plant" rx="2" ${base(T.physFill, T.phys)}`)
  if (kind === 'mix') {
    const c = 10
    const p = [[x + c, y], [x + w - c, y], [x + w, y + c], [x + w, y + h - c], [x + w - c, y + h], [x + c, y + h],
      [x, y + h - c], [x, y + c]]
    return `<polygon class="bx mix" points="${pts(p)}" stroke-linejoin="round" ${base(T.mix_f, T.mix_s)}/>\n`
  }
  if (kind === 'pid') {
    const i = ov ? 5 : 4
    return rect(x, y, w, h, `class="bx pid" rx="2" ${base(T.pidFill, T.amberInk)}`)
      + rect(x + i, y + i, w - 2 * i, h - 2 * i, `class="inner" rx="1" fill="none" stroke="${T.amberInk}" stroke-width="${ov ? 1 : 0.75}"`)
  }
  const [f, st] = kind === 'filt' ? [T.filt_f, T.filt_s] : ov ? [fillOf, T.ink2] : [T.proc_f, T.proc_s]
  let o = rect(x, y, w, h, `class="bx ${kind}" rx="${ov ? 4 : 3}" ${base(f, st)}`)
  if (kind === 'filt') {
    const [ix, iy] = [5, 9]
    o += line(x + ix, y + iy, x + ix, y + h - iy, `class="rail" stroke="${T.filt_s}" stroke-width="1"`)
    o += line(x + w - ix, y + iy, x + w - ix, y + h - iy, `class="rail" stroke="${T.filt_s}" stroke-width="1"`)
  }
  return o
}

function badge(label, x, y) {
  const w = label.length * 5.6 + 8
  return rect(x, y, w, 13, `class="ratebg" rx="2" fill="${T.badge}"`)
    + txt('rate', x + w / 2, y + 9.6, esc(label), { anchor: 'middle' })
}

function noteMark(n, cx, cy, r = 8) {
  return `<circle class="nmk" cx="${g(cx)}" cy="${g(cy)}" r="${r}" fill="${T.amber}" stroke="${T.bg}" stroke-width="1.5"/>\n`
    + txt('nmkt', cx, cy + 3.4, String(n), { anchor: 'middle' })
}

function nodeSvg(d) {
  const cx = d.x + d.w / 2
  if (d.big) {
    let o = shapeSvg(d, true)
    const Y = ty()
    o += txt('ttl', cx, d.y + d.h / 2 - 3, esc(d.title), { anchor: 'middle' })
    let yy = d.y + d.h / 2 + 22
    for (const s of d.subs) { o += txt('sub', cx, yy, esc(s), { anchor: 'middle' }); yy += Y.sub[0] * 1.3 }
    return o
  }
  let o = shapeSvg(d)
  const Y = TYPE.detailed
  const block = 16 + Y.subLH * d.subs.length
  const avail = d.h - (d.cond ? 13 : 0)
  let yy = d.y + (avail - block) / 2 + 13.5
  const tw = textW(d.title, Y.ttl[0], 600)
  o += txt('ttl', cx, yy, esc(d.title), { anchor: 'middle', textLength: tw > d.w - 46 ? tw : 0 })
  yy += 16
  for (const s of d.subs) { o += txt('sub', cx, yy, esc(s), { anchor: 'middle' }); yy += Y.subLH }
  if (d.cond) o += txt('cnd', cx, d.y + d.h - 7.5, esc(d.cond), { anchor: 'middle' })
  if (d.rate) o += badge(d.rate, d.x + (d.kind === 'io' ? 22 : 6), d.y + 6)
  if (d.note) o += noteMark(d.note, d.x + d.w - 2, d.y + 2)
  return o
}

function paramsSvg(d) {
  if (d.ppos === 'none' || !d.params.length) return ''
  const LH = TYPE.detailed.parLH
  const CW = 5.7
  let o = ''
  if (d.ppos === 'inside') {
    const lines = wrap(d.params, Math.floor((d.w - 16) / CW))
    let yy = d.y + d.h - 8 - LH * (lines.length - 1)
    for (const ln of lines) { o += txt('par', d.x + d.w / 2, yy, esc(ln), { anchor: 'middle' }); yy += LH }
    return o
  }
  if (d.ppos === 'left') {
    let yy = d.y + 13
    for (const ln of wrap(d.params, 26)) { o += txt('par', d.x - 9, yy, esc(ln), { anchor: 'end' }); yy += LH }
    return o
  }
  if (d.ppos === 'split') {
    const sp = splitParams(d)
    let yy = d.y + d.h + 14
    for (const ln of sp.left) { o += txt('par', sp.port - 7, yy, esc(ln), { anchor: 'end' }); yy += LH }
    yy = d.y + d.h + 14
    for (const ln of sp.right) { o += txt('par', sp.port + 7, yy, esc(ln)); yy += LH }
    return o
  }
  if (d.ppos === 'strip') {
    let [px, py] = d.pxy
    for (const ln of wrap(d.params, d.pwrap)) { o += txt('par', px, py, esc(ln)); py += LH }
    return o
  }
  const lines = wrap(d.params, Math.floor((d.w + 40) / CW))
  let yy = d.ppos === 'above' ? d.y - 9 - LH * (lines.length - 1) : d.y + d.h + 14
  for (const ln of lines) { o += txt('par', d.x + d.w / 2, yy, esc(ln), { anchor: 'middle' }); yy += LH }
  return o
}

// ------------------------------------------------------------------ containers
// grey panel with a light frame; the label sits inside the top (or bottom) edge,
// the source path follows in monospace
function groupFrameSvg([x, y, w, h]) {
  return rect(x, y, w, h, `class="grp" rx="4" fill="${T.grpfill}" stroke="${T.grpline}" stroke-width="1"`)
}

function groupLabelSvg([x, y, , h, lab, src, pos]) {
  const ly = pos === 'bottom' ? y + h - 10 : y + 18
  const labW = lab.length * 9.2
  let o = txt('grpt', x + 16, ly, esc(lab.toUpperCase()))
  if (src) o += txt('src', x + 16 + labW + 12, ly - 0.5, esc(src))
  return o
}

function tagSvg(label, x, y, dir) {
  const tw = label.length * 5.8 + 10
  const hh = 8
  const p = dir === 'R'
    ? [[x, y - hh], [x + tw, y - hh], [x + tw + 7, y], [x + tw, y + hh], [x, y + hh]]
    : [[x - tw / 2, y - 2 * hh - 7], [x + tw / 2, y - 2 * hh - 7], [x + tw / 2, y - 7], [x, y], [x - tw / 2, y - 7]]
  const [tx, tyy] = dir === 'R' ? [x + tw / 2, y + 3.2] : [x, y - hh - 7 + 3.2]
  return `<polygon class="tag" points="${pts(p)}" fill="${T.surface}" stroke="${T.ink2}" stroke-width="1.1" stroke-linejoin="round"/>\n`
    + txt('tagt', tx, tyy, esc(label), { anchor: 'middle' })
}

// the tick sits at 30 % of a long segment, mid-way along a short one, and moves along
// the segment, if it must, to stay 16 px clear of any line crossing it (and its hop)
function widthTick(a, b, w, allsegs = [], ed = null) {
  const horiz = a[1] === b[1]
  const len = horiz ? Math.abs(b[0] - a[0]) : Math.abs(b[1] - a[1])
  const ax = horiz ? 0 : 1
  const lo = Math.min(a[ax], b[ax]), hi = Math.max(a[ax], b[ax])
  const cross = allsegs.filter(([p, q, o]) => o !== ed && (p[ax] === q[ax]) && lo < p[ax] && p[ax] < hi
    && Math.min(p[1 - ax], q[1 - ax]) < a[1 - ax] && a[1 - ax] < Math.max(p[1 - ax], q[1 - ax])).map(([p]) => p[ax])
  const f0 = len > 120 ? 0.3 : 0.5
  const fs = [f0, f0 - 0.15, f0 + 0.15, f0 - 0.25, f0 + 0.25, 0.2, 0.8]
  const f = fs.find((ff) => cross.every((c) => Math.abs(a[ax] + (b[ax] - a[ax]) * ff - c) >= 16)) ?? f0
  const x = a[0] + (b[0] - a[0]) * f
  const y = a[1] + (b[1] - a[1]) * f
  let o = line(x - 3.5, y + 6, x + 3.5, y - 6, `class="bw" stroke="${T.ink}" stroke-width="1.25" stroke-linecap="round"`)
  o += horiz ? txt('bwt', x + 2, y + 17, esc(w), { anchor: 'middle' }) : txt('bwt', x + 9, y + 4, esc(w))
  return o
}

function sumSvg(cx, cy, r, glyph, cap) {
  let o = `<circle class="op" cx="${g(cx)}" cy="${g(cy)}" r="${g(r)}" fill="${T.pidFill}" stroke="${T.amberInk}" stroke-width="${M.OVERVIEW ? 2 : 1.75}"/>\n`
  o += txt('opg', cx, cy + (M.OVERVIEW ? 7.5 : 6), esc(glyph), { anchor: 'middle' })
  // caption at the upper left, above the sign of a left entry: the top entry and its sign
  // on the right are taken
  if (cap) o += txt('opc', cx - r + 2, cy - r - 14, esc(cap), { anchor: 'end' })
  return o
}

// ------------------------------------------------------------------ legend / title block
const KIND_LABEL = [
  ['io', 'Signal source / sink'], ['proc', 'Processing'], ['filt', 'Filter'], ['pid', 'PID term'],
  ['mix', 'Mixer / output'], ['fb', 'Computed in the mixer, used next loop'], ['plant', 'Physics (not firmware)'],
]
const LINE_LABEL = [
  ['sig', 'Signal (thick: RX-to-motor spine)'], ['mod', 'Scheduling: sets a gain, cutoff or limit'],
  ['tlm', 'ESC telemetry (bidirectional DShot)'], ['phys', 'Physics: thrust and rotation'],
]

function swatch(k, x, y) {
  const d = { x, y, w: 22, h: 14, kind: k }
  if (k === 'pid') {
    return rect(x, y, 22, 14, `rx="1.5" fill="${T.pidFill}" stroke="${T.amberInk}" stroke-width="1.5"`)
      + rect(x + 2.5, y + 2.5, 17, 9, `fill="none" stroke="${T.amberInk}" stroke-width="0.75"`)
  }
  if (k === 'mix') {
    const c = 4
    return `<polygon points="${pts([[x + c, y], [x + 22 - c, y], [x + 22, y + c], [x + 22, y + 10], [x + 22 - c, y + 14], [x + c, y + 14], [x, y + 10], [x, y + c]])}" fill="${T.mix_f}" stroke="${T.mix_s}" stroke-width="1.25"/>\n`
  }
  if (k === 'filt') {
    return rect(x, y, 22, 14, `rx="2" fill="${T.filt_f}" stroke="${T.filt_s}" stroke-width="1.25"`)
      + line(x + 3, y + 3, x + 3, y + 11, `stroke="${T.filt_s}" stroke-width="1"`)
      + line(x + 19, y + 3, x + 19, y + 11, `stroke="${T.filt_s}" stroke-width="1"`)
  }
  if (k === 'io') return rect(x, y, 22, 14, `rx="7" fill="${T.io_f}" stroke="${T.io_s}" stroke-width="2"`)
  if (k === 'fb') return rect(x, y, 22, 14, `fill="${T.mix_f}" stroke="${T.mix_s}" stroke-width="1.25" stroke-dasharray="3 3"`)
  if (k === 'plant') return rect(x, y, 22, 14, `rx="1.5" fill="${T.physFill}" stroke="${T.phys}" stroke-width="2.5"`)
  return rect(x, y, 22, 14, `rx="2" fill="${T.proc_f}" stroke="${T.proc_s}" stroke-width="1.25"`)
}

function lineSample(cls, x, y, len, wide = false) {
  const ed = { cls, wide, arrow: true, pts: [[x, y], [x + len, y]] }
  return edgeSvg(ed, [])
}

function casingSample(x, y, len) {
  return `<path d="M ${g(x)} ${g(y)} h ${g(len)}" stroke="${T.casing}" stroke-width="${LS().casing}" stroke-linecap="round" fill="none"/>\n`
    + lineSample('sig', x, y, len)
}

function legendSvg() {
  const [X, Y, LW, LH] = M.LEGEND_BOX
  let o = rect(X, Y, LW, LH, `class="grp" rx="4" fill="${T.grpfill}" stroke="${T.grpline}" stroke-width="1"`)
  o += line(X, Y + 56, X + LW, Y + 56, `stroke="${T.grpline}" stroke-width="1"`)
  for (const dx of [360, 1100]) o += line(X + dx, Y, X + dx, Y + 56, `stroke="${T.grpline}" stroke-width="1"`)
  o += rect(X + 20, Y + 15, 5, 26, `fill="${T.amber}"`)
  o += txt('tb', X + 36, Y + 30, 'BETAFLIGHT SIGNAL FLOW')
  o += txt('src', X + 36, Y + 46, `signal-flow diagram ${esc(DIA_VER)}`)
  o += txt('cap', X + 380, Y + 22, 'FIRMWARE REVISION')
  o += txt('mono', X + 380, Y + 42, esc(FW_REV))
  o += txt('src', X + 720, Y + 42, 'content verified against the firmware source')
  o += txt('cap', X + 1120, Y + 22, 'LICENCE')
  o += txt('mono', X + 1120, Y + 42, 'Derived from the betaflight_processing diagram by mrRobot62 &#183; GPL-3.0')
  const head = (lab, yb) => txt('lgh', X + 20, yb, lab)
  const label = (x, yb, s) => txt('lgt', x, yb, esc(s))
  const adv = (s) => s.length * 6.1 + 46
  const X0 = X + 116

  let x = X0
  let yb = Y + 88
  o += head('BLOCKS', yb)
  for (const [k, lab] of KIND_LABEL) {
    o += swatch(k, x, yb - 11)
    o += label(x + 30, yb, lab)
    x += adv(lab)
  }
  o += rect(x, yb - 11, 22, 14, `rx="2" fill="${T.surface}" stroke="${T.ink2}" stroke-width="1.25" stroke-dasharray="5 3"`)
  o += txt('cnd', x + 30, yb, 'optional')
  o += label(x + 78, yb, '= dashed outline + condition')
  x += adv('optional = dashed outline + condition') + 6
  o += badge('RX', x, yb - 10)
  o += badge('GYRO', x + 26, yb - 10)
  o += badge('ATT', x + 66, yb - 10)
  o += label(x + 100, yb, 'runs per RX packet / at gyro rate / in the attitude task; unmarked = every PID loop')

  x = X0
  yb = Y + 124
  o += head('LINES', yb)
  o += casingSample(x, yb - 4, 30)
  o += label(x + 42, yb, 'Main control loop')
  x += adv('Main control loop') + 8
  for (const [cls, lab] of LINE_LABEL) {
    o += lineSample(cls, x, yb - 4, 30, cls === 'sig')
    o += label(x + 42, yb, lab)
    x += adv(lab) + 8
  }
  o += lineSample('ext', x + 4, yb - 4, 26)
  o += `<circle cx="${g(x + 4)}" cy="${g(yb - 4)}" r="3.5" fill="${T.bg}" stroke="${T.ink}" stroke-width="1.25"/>\n`
  o += label(x + 42, yb, 'External input (autopilot, GPS rescue)')

  x = X0
  yb = Y + 160
  o += head('MARKS', yb)
  o += `<circle cx="${g(x + 10)}" cy="${g(yb - 4)}" r="10" fill="${T.pidFill}" stroke="${T.amberInk}" stroke-width="1.5"/>\n`
  o += txt('opg', x + 10, yb + 0.5, '&#931;', { anchor: 'middle', fill: T.ink }).replace('font-size="17"', 'font-size="11"')
  o += label(x + 28, yb, 'Summing point (signs at the entries)')
  x += adv('Summing point (signs at the entries)') + 8
  o += `<circle cx="${g(x + 6)}" cy="${g(yb - 4)}" r="3.5" fill="${T.ink}"/>\n`
  o += label(x + 18, yb, 'Signal branch')
  x += adv('Signal branch')
  o += tagSvg('TPA', x, yb - 4, 'R')
  o += label(x + 48, yb, 'Off-sheet connector: continues at the tag with the same name')
  x += adv('Off-sheet connector: continues at the tag with the same name') + 20
  o += line(x, yb - 4, x + 30, yb - 4, `stroke="${T.ink}" stroke-width="1.6"`)
  o += widthTick([x, yb - 4], [x + 30, yb - 4], '3').replace(/y="[\d.]+" font-family="ui-mono/, `y="${g(yb + 13)}" font-family="ui-mono`)
  o += label(x + 42, yb, 'Bus width: 3 = roll / pitch / yaw, N = one per motor')
  x += adv('Bus width: 3 = roll / pitch / yaw, N = one per motor')
  o += noteMark(1, x + 8, yb - 4)
  o += label(x + 24, yb, 'See note with that number')
  x += adv('See note with that number')
  o += label(x, yb, '▲▼ shift the motor output window [motorRangeMin .. motorRangeMax]')
  return o
}

function overviewLegendSvg() {
  const [X, Y, LW, LH] = M.LEGEND_BOX
  let o = rect(X, Y, LW, LH, `class="grp" rx="4" fill="${T.grpfill}" stroke="${T.grpline}" stroke-width="1"`)
  o += line(X, Y + 52, X + LW, Y + 52, `stroke="${T.grpline}" stroke-width="1"`)
  o += rect(X + 20, Y + 14, 5, 24, `fill="${T.amber}"`)
  o += txt('tb', X + 36, Y + 32, 'BETAFLIGHT SIGNAL FLOW')
  o += txt('note', X + 340, Y + 32, `Simplified &#183; diagram ${esc(DIA_VER)} &#183; ${esc(FW_REV)}`)
  const yb = Y + 88
  let x = X + 20
  const item = (draw, lab, w) => { o += draw(x); o += txt('lgt', x + 52, yb, esc(lab)); x += 52 + lab.length * 8.6 + 40 }
  item((x0) => casingSample(x0, yb - 6, 36), 'Main control loop')
  item((x0) => lineSample('sig', x0, yb - 6, 36, true), 'Signal (thick: forward path)')
  item((x0) => lineSample('phys', x0, yb - 6, 36), 'Physics: thrust and rotation')
  o += txt('lgt', X + LW - 20, yb, 'Detailed view: every block, parameter and side path', { anchor: 'end' })
  return o
}

function notesSvg() {
  const [nx, ny, nw, nh] = M.NOTES_BOX
  let o = '<g id="sf-notes">\n'
  o += rect(nx, ny, nw, nh, `class="grp" rx="4" fill="${T.grpfill}" stroke="${T.grpline}" stroke-width="1"`)
  o += rect(nx + 16, ny + 9, 4, 11, `fill="${T.amber}"`)
  o += txt('grpt', nx + 28, ny + 18, 'NOTES')
  let yy = ny + 44
  M.NOTES.forEach((ln, i) => {
    o += noteMark(i + 1, nx + 24, yy - 4, 7.5)
    o += txt('note', nx + 42, yy, esc(ln))
    yy += 19
  })
  return o + '</g>\n'
}

// ------------------------------------------------------------------ build
const LICENCE = `<!--
  Betaflight signal-flow diagram.
  Firmware revision depicted: ${FW_REV}
  Derived from the betaflight_processing diagram by mrRobot62:
  https://github.com/mrRobot62/betaflight_processing
  Licensed under the GNU General Public License v3.0.
-->
`

export function build(theme, model) {
  M = model
  T = theme === 'light' ? LIGHT : DARK
  ID = `sf-${M.OVERVIEW ? 'ov-' : ''}${theme}`
  let o = LICENCE
  o += `<svg xmlns="http://www.w3.org/2000/svg" width="${M.W}" height="${M.H}" viewBox="0 0 ${M.W} ${M.H}" `
    + 'preserveAspectRatio="xMidYMid meet" role="img" '
    + `aria-label="Betaflight signal flow ${M.OVERVIEW ? 'module overview' : 'diagram'} for the current master branch">\n`
  o += `<title>Betaflight signal flow${M.OVERVIEW ? ', module overview' : ''} &#8212; ${esc(FW_REV)}</title>\n`
  o += M.OVERVIEW
    ? '<desc>Module overview: RC and setpoint, feedforward, gyro and D-term filtering, attitude, PID '
      + 'controller, throttle, mixer, motor output and airframe, and the connections '
      + 'between them. Derived from the betaflight_processing diagram by mrRobot62, GPL-3.0.</desc>\n'
    : '<desc>RX to motor command path, gyro and D-term filter chains, PID controller, mixer and '
      + 'motor output, the attitude outer loop and the airframe, with the RPM telemetry, throttle '
      + 'scheduling and physical feedback paths. Derived from the betaflight_processing '
      + 'diagram by mrRobot62, GPL-3.0.</desc>\n'
  o += `<defs>\n${markers()}</defs>\n`
  o += rect(0, 0, M.W, M.H, `class="bg" fill="${T.bg}"`)

  o += '<g id="sf-groups">\n'
  for (const grp of M.GROUPS) o += groupFrameSvg(grp)
  o += '</g>\n'
  o += '<g id="sf-loop">\n' + casingSvg() + '</g>\n'

  const allsegs = segments(M.E)
  o += '<g id="sf-edges">\n'
  for (const ed of M.E) {
    o += edgeSvg(ed, allsegs)
    if (ed.label && ed.lpos) o += txt('elab', ed.lpos[0], ed.lpos[1], esc(ed.label))
    if (ed.width) {
      let best = 0
      const len = (p, q) => Math.abs(p[0] - q[0]) + Math.abs(p[1] - q[1])
      for (let k = 1; k < ed.pts.length - 1; k++) if (len(ed.pts[k], ed.pts[k + 1]) > len(ed.pts[best], ed.pts[best + 1])) best = k
      o += widthTick(ed.pts[best], ed.pts[best + 1], ed.width, allsegs, ed)
    }
  }
  for (const [a, b, lab, pos] of M.EXT) {
    o += edgeSvg({ cls: 'ext', arrow: true, pts: [[a[0], a[1] + 3.5], b] }, [])
    o += `<circle class="term" cx="${g(a[0])}" cy="${g(a[1])}" r="3.5" fill="${T.bg}" stroke="${T.ink}" stroke-width="1.25"/>\n`
    const [tx, tyy, anc] = pos || [a[0] + 7, b[1] - 4, 'start']
    o += txt('elab', tx, tyy, esc(lab), { anchor: anc })
  }
  for (const c of M.CONNECTORS) {
    const [[sx, sy], [ex]] = c.out
    o += edgeSvg({ cls: 'mod', arrow: false, pts: [[sx, sy], [ex, sy]] }, [])
    o += tagSvg(c.tag, ex, sy, 'R')
    for (const [[ax, ay], [, by]] of c.ins) {
      o += edgeSvg({ cls: 'mod', arrow: true, pts: [[ax, ay], [ax, by]] }, [])
      o += tagSvg(c.tag, ax, ay, 'D')
    }
  }
  o += '</g>\n'

  // group labels after the lines (check.mjs keeps every route out of the label band)
  o += '<g id="sf-group-labels">\n'
  for (const grp of M.GROUPS) o += groupLabelSvg(grp)
  o += '</g>\n'

  o += '<g id="sf-nodes">\n'
  for (const d of M.NODES) o += nodeSvg(d)
  for (const [id, ocx, ocy, r, glyph, cap] of M.OPS) {
    // a junction dot in the colour of the line it sits on
    const dotCol = T[(LS()[M.JCLS?.[id]] ?? LS().sig).col]
    if (r <= 6) o += `<circle class="jdot" cx="${g(ocx)}" cy="${g(ocy)}" r="${LS().dot}" fill="${dotCol}"/>\n`
    else o += sumSvg(ocx, ocy, r, glyph, cap)
  }
  o += '</g>\n'

  o += '<g id="sf-floats">\n'
  for (const [s, fx, fy, fcls, fanc] of M.FLOATS) {
    const cls = fcls === 'cnd2' ? 'cnd' : fcls
    o += txt(cls, fx, fy, esc(s), { anchor: fanc })
  }
  o += '</g>\n'

  o += '<g id="sf-parameters" data-layer="parameters">\n'
  for (const d of M.NODES) o += paramsSvg(d)
  o += '</g>\n'

  if (M.NOTES_BOX) o += notesSvg()
  o += '<g id="sf-legend">\n' + (M.OVERVIEW ? overviewLegendSvg() : legendSvg()) + '</g>\n'
  o += '</svg>\n'
  return o
}

// every file this renderer writes; fresh.mjs compares exactly these against the committed copies
export const OUTPUTS = [['signal-flow', DETAILED], ['signal-flow-overview', OVERVIEW]]
  .flatMap(([prefix, model]) => ['light', 'dark'].map((theme) => ({ file: `${prefix}-${theme}.svg`, theme, model })))

// render only when run as a script, so fresh.mjs can import OUTPUTS and build(). Node
// loads the main module by its real path, so compare real paths: through a symlink or
// junction the resolved argv path would differ and nothing would be written
if (process.argv[1] && fileURLToPath(import.meta.url) === realpathSync(resolve(process.argv[1]))) {
  const outDir = process.argv[2] || join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'static', 'img', 'betaflight')
  for (const { file, theme, model } of OUTPUTS) {
    const p = join(outDir, file)
    writeFileSync(p, build(theme, model), 'utf-8')
    console.log('wrote', p, statSync(p).size, 'bytes')
  }
}

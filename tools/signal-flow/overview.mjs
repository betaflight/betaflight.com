// Simplified view of the Betaflight signal flow: the control loop as a classic block
// diagram, one box per module, no crossing lines.
//
//            Feedforward      Throttle
//                 |               |
//   RC/setpoint → Σ → PID → Mixer → Motor output → Airframe
//        ↑        ↑     ↑                               |
//    Attitude     |  D-term                       Gyro filtering
//        └────────┴─────┴────── filtered gyro ──────────┘
//
// The forward path runs left to right on one row; the measurement returns along the
// bottom and branches up into the error sum, the D-term path and the attitude
// estimate; side inputs (feedforward, throttle) come down from above. Gain
// scheduling, ESC telemetry and the autopilot are left to the detailed diagram.
//
// Rendered as signal-flow-overview-{light,dark}.svg by `npm run signal-flow`; the
// docs-page viewer switches between it and the detailed diagram. Same layout engine,
// renderer and checks as model.mjs. When a module changes there, update its summary here.

import { layout } from './layout.mjs'

export const OVERVIEW = true

// coarser grid, larger type (see render.mjs: nodes with big: true)
const OPTS = { colW: 240, gap: 140, rowPitch: 178, rowMid: 46, nodeH: 84, corr: 42, lblCw: 9, lblSize: 17, legendH: 112, y0: 58, casingClr: 12 }

// rows: side inputs | forward path | feedback modules (the measurement bus runs below)
const LANES = [
  { id: 'ff', col: 1 },
  { id: 'thr', col: 2, row: 'share' },
  { id: 'rc', col: 0 },
  { id: 'pid', col: 1, row: 'share' },
  { id: 'mix', col: 2, row: 'share' },
  { id: 'out', col: 3, row: 'share' },
  { id: 'air', col: 4, row: 'share' },
  { id: 'att', col: 0 },
  { id: 'dterm', col: 1, row: 'share' },
  { id: 'gyro', col: 4, row: 'share' },
]

const NDECL = []
function m(id, kind, title, sub) {
  NDECL.push({ id, lane: id, group: null, kind, title, subs: [sub], params: [], cond: null, ppos: 'none', big: true })
}
m('ff', 'min', 'Feedforward', 'from stick speed')
m('thr', 'min', 'Throttle', 'curve, limit, boost')
m('rc', 'min', 'RC / setpoint', 'sticks → rotation rate')
m('pid', 'pid', 'PID controller', 'P + I + D + F per axis')
m('mix', 'min', 'Mixer', 'axes → motors')
m('out', 'min', 'Motor output', 'DShot to the ESCs')
m('air', 'plant', 'Airframe', 'thrust → rotation')
m('att', 'min', 'Attitude', 'angle estimate (IMU)')
m('dterm', 'min', 'D-term filtering', 'derivative of the gyro')
m('gyro', 'min', 'Gyro filtering', 'sensor, notches, LPFs')
NDECL.push({ id: 'e_err', op: true, gapOp: true, r: 24, w: 48, h: 48, glyph: 'Σ', cap: '', params: [], ppos: 'none' })

const EDECL = []
function e(from, to, cls = 'sig', o = {}) {
  EDECL.push({ from, to, cls, out: o.out || 'R', in: o.in || 'L', offOut: 0, offIn: 0,
    label: o.label || null, labelPref: o.labelPref || null, labelDx: 0, labelDy: 0,
    wide: !!o.wide, dash: false, arrow: true, fold: !!o.fold, bus: o.bus || null, width: null })
}
// forward path
e('rc', 'e_err', 'sig', { wide: true })
e('e_err', 'pid', 'sig', { wide: true })
e('pid', 'mix', 'sig', { wide: true })
e('mix', 'out', 'sig', { wide: true })
e('out', 'air', 'phys', { wide: true })
// the measurement: airframe → gyro, then back along the bottom; one bus, three taps
e('air', 'gyro', 'phys', { out: 'B', in: 'T', label: 'body rates', labelPref: 'v' })
e('gyro', 'att', 'sig', { out: 'B', in: 'B', fold: true, label: 'filtered gyro', labelPref: 'h' })
e('j_err', 'e_err', 'sig', { in: 'B', fold: true })
e('j_d', 'dterm', 'sig', { in: 'B', fold: true })
e('dterm', 'pid', 'sig', { out: 'T', in: 'B', fold: true })
e('att', 'rc', 'sig', { out: 'T', in: 'B', fold: true, label: 'angle', labelPref: 'v' })
// side inputs
e('rc', 'ff', 'sig', { out: 'T', fold: true })
e('ff', 'pid', 'sig', { out: 'B', in: 'T', fold: true })
e('thr', 'mix', 'sig', { out: 'B', in: 'T', fold: true })

const JDECL = [
  { id: 'j_err', host: ['gyro', 'att'], x: { gap: 1 }, r: 5 },
  { id: 'j_d', host: ['gyro', 'att'], x: { col: 1 }, r: 5 },
]

// the main control loop (see model.mjs); the measurement bus is cased only as far as the
// error sum's branch, its run on to the attitude estimate is the outer loop
const LOOP = new Set(['rc>e_err', 'e_err>pid', 'pid>mix', 'mix>out', 'out>air', 'air>gyro', 'gyro>att',
  'j_err>e_err', 'j_d>dterm', 'dterm>pid'])
const LOOP_UNTIL = { 'gyro>att': 'j_err' }
for (const ed of EDECL) ed.cased = LOOP.has(`${ed.from}>${ed.to}`)

const L = layout({ nodes: NDECL, lanes: LANES, groups: [], edges: EDECL, junctions: JDECL, opts: OPTS })

export const NODES = L.nodes.filter((d) => !d.op)
export const NODE = Object.fromEntries(L.nodes.map((d) => [d.id, d]))
export const W = L.W
export const H = L.H
export const OPS = [
  ...L.nodes.filter((d) => d.op).map((d) => [d.id, d.x + d.w / 2, d.y + d.h / 2, d.r, d.glyph, d.cap, 0, 'middle', 0]),
  ...JDECL.map((j) => [j.id, L.junctions[j.id].p[0], L.junctions[j.id].p[1], j.r, '', '', 0, 'middle', 0]),
]
export const GROUPS = []
export const LEGEND_BOX = L.legend
export const MARGIN = L.MARGIN
export const NOTES_BOX = null
export const NOTES = []
export const EXT = []
export const CONNECTORS = []
export const STUBS = []
export const LBL_CW = OPTS.lblCw
export const LBL_SIZE = OPTS.lblSize
export const E = L.edges.map((ed) => {
  const key = `${ed.from}>${ed.to}`
  const until = LOOP_UNTIL[key] ? L.junctions[LOOP_UNTIL[key]].p : null
  return {
    pts: ed.pts, cls: ed.cls, label: ed.label, lpos: ed.lpos, dash: ed.dash, arrow: ed.arrow, wide: ed.wide,
    width: ed.width, bus: ed.bus, from: ed.from, to: ed.to, loop: LOOP.has(key), loopUntil: until,
  }
})
const S = NODE.e_err
export const FLOATS = [
  ['+', S.x - 6, S.y - 6, 'sign', 'end'],
  ['−', S.x - 6, S.y + S.h + 20, 'sign', 'end'],
]

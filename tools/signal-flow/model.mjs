// Model for the Betaflight signal-flow diagram.
//
// Single source of truth for the light and dark SVGs in static/img/betaflight/,
// so the two artefacts cannot drift. Edit this file, then run `npm run signal-flow`
// to re-validate the geometry and re-render both themes.
//
// Content verified against betaflight/betaflight master @ 617e84f11f (2026-09-16).
//
// This file only declares nodes, lanes, groups, edges and junctions. Coordinates
// and routes come from layout.mjs (layered layout, computed). Lane order top to
// bottom is the declaration order of LANES:
//   feedforward | RC / setpoint -> error -> P | gyro chain -> I | D-term + mixer
//   cluster + attitude -> D | throttle | mixer (right to left) + airframe |
//   telemetry + output-window shapers
// The PID stack sits in the column right of the error junction; the mixer row
// runs back towards the gyro so the loop closes clockwise; the airframe (physics)
// returns its rotation to the gyro up the left margin. Values that travel too far
// to route (TPA, anti-gravity, attitude) use off-sheet connector tags.

import { layout, busSplits } from './layout.mjs';

export const FONT = "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
export const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace";

export const FW_REV = 'master @ 617e84f11f (2026-09-16, 2026.12.0-alpha)';
export const DIA_VER = 'v1.0';

// Redesign tokens: Okabe-Ito hues (darkened where needed for WCAG AA on light, lightened
// for dark) on Tailwind zinc neutrals, the family of the site's #18181b. Block kinds keep a
// pale fill plus an outline in their hue; the Betaflight amber marks the PID terms, summing
// points, the main-loop casing, note markers and the title bar. Every meaning also has a
// shape, dash or weight of its own.
export const LIGHT = {
  bg: '#ffffff',
  surface: '#ffffff',
  grpfill: '#f4f4f5',
  grpline: '#dcdce0',
  ink: '#18181b',
  ink2: '#3f3f46',
  muted: '#52525b',
  faint: '#5f5f68',
  rule: '#8e8e96',
  grptext: '#3f3f46',
  badge: '#e8e8eb',
  amber: '#ffbb00',
  amberInk: '#9a5b00',
  pidFill: '#fff3d1',
  casing: '#ffe9ad',
  proc_f: '#e2eef8',
  proc_s: '#0068a3',
  filt_f: '#dff2eb',
  filt_s: '#007a5a',
  mix_f: '#f7e8f1',
  mix_s: '#9c4377',
  io_f: '#ececee',
  io_s: '#3c3c44',
  phys: '#3c3c44',
  physFill: '#ececee',
  tlm: '#2a7cb0',
};

export const DARK = {
  bg: '#18181b',
  surface: '#27272a',
  grpfill: '#1f1f23',
  grpline: '#34343a',
  ink: '#f4f4f5',
  ink2: '#c4c4cc',
  muted: '#a1a1aa',
  faint: '#8e8e98',
  rule: '#6b6b74',
  grptext: '#c4c4cc',
  badge: '#2f2f35',
  amber: '#ffbb00',
  amberInk: '#e69f00',
  pidFill: '#2d2510',
  casing: '#3d3210',
  proc_f: '#0e2536',
  proc_s: '#4aa6e6',
  filt_f: '#0f2a22',
  filt_s: '#2fc79a',
  mix_f: '#2e1d29',
  mix_s: '#e08cbd',
  io_f: '#2a2a2f',
  io_s: '#c8c8d0',
  phys: '#c8c8d0',
  physFill: '#2a2a2f',
  tlm: '#8ccdf2',
};

// ------------------------------------------------------------------- lanes
// flow: ltr (default, layered + compacted) | rtl (runs back from its feeder) |
// under (starts under its feeder) | row (side by side, packed to the left) |
// stack (one column, consecutive rows). row:'share' sits beside the previous
// lane when the columns are disjoint. shift: n starts the lane's sources at column n;
// offset: n starts an 'under' lane n columns past its feeder.
const LANES = [
  { id: 'ff' },
  { id: 'rc' },
  { id: 'gyro' },
  { id: 'dterm', padAbove: 40 }, // the corridor above carries four routes
  { id: 'mixk', flow: 'row', align: 'start', row: 'share' },
  { id: 'att', col: 3, row: 'share' },
  { id: 'thr_rc' },
  { id: 'thr_mix', row: 'share' },
  { id: 'mix', flow: 'rtl' },
  { id: 'tlm', flow: 'under' },
  { id: 'shape', flow: 'under', offset: 2, row: 'share' },
  { id: 'pid', flow: 'stack', top: 0 },
];

// [id, label, source, labelPos?]
const GROUPS_DECL = [
  { id: 'ff', label: 'Feedforward', src: 'fc/rc.c: FF per RX packet, PT3 per PID loop' },
  { id: 'rc', label: 'RC / setpoint path', src: 'fc/rc.c' },
  { id: 'gyro', label: 'Gyro filter chain', src: 'sensors/gyro.c: gyroUpdate() at gyro rate, filterGyro() at PID rate' },
  { id: 'dterm', label: 'D-term chain', src: 'flight/pid.c', labelPos: 'bottom' },
  { id: 'mixk', label: 'Computed in the mixer', src: 'consumed by the NEXT PID loop' },
  { id: 'att', label: 'Attitude', src: 'flight/imu.c', labelPos: 'bottom' },
  { id: 'thr_rc', label: 'Throttle (RC)', src: 'fc/rc.c' },
  { id: 'thr_mix', label: 'Throttle (mixer)', src: 'mixTable, flight/mixer.c' },
  { id: 'mix', label: 'Mixer', src: 'flight/mixer.c' },
  { id: 'drv', label: 'Motor output', src: 'drivers/motor.c, drivers/dshot.c' },
  { id: 'pid', label: 'PID controller', src: 'flight/pid.c' },
];

// ------------------------------------------------------------------- nodes
const NDECL = [];
function n(id, group, h, kind, title, subs = [], { params = [], cond = null, ppos = 'below', ...extra } = {}) {
  NDECL.push({ id, group, h, kind, title, subs, params, cond, ppos, pwrap: null, pxy: null, ...extra });
}

// feedforward
// the PT1 sits inside the per-packet calculation, ahead of boost, jitter, max rate,
// yaw hold, transition and averaging; jitter, duplicate and transition logic read rcCommand
n('f_ff', 'ff', 60, 'proc', 'Feedforward', ['d(setpoint)/dt per RX packet', 'PT1 first, then boost, jitter,', 'max rate, yaw hold, transition, avg', 'jitter / dup. tests read rcCommand'], {
  params: [
    'feedforward_transition',
    'feedforward_boost',
    'feedforward_jitter_factor',
    'feedforward_max_rate_limit',
    'feedforward_averaging',
    'feedforward_smooth_factor',
    'feedforward_yaw_hold_gain',
    'feedforward_yaw_hold_time',
  ],
  ppos: 'strip',
  pwrap: 90,
});
// RC smoothing's filterFeedforward bank; skipped when rc_smoothing is off
n('f_sm', 'ff', 60, 'filt', 'FF smoothing', ['PT3 at PID rate, shares the', 'RC smoothing setpoint cutoff'], { cond: 'when rc_smoothing on', ppos: 'none' });

// RC / setpoint path
n('c_rx', 'rc', 60, 'io', 'RX', ['rcData[]'], { params: ['serialrx_provider', 'rx_min_usec', 'rx_max_usec'] });
n('c_cmd', 'rc', 60, 'proc', 'rcCommand', ['deadband, centring'], { params: ['deadband', 'yaw_deadband', 'yaw_control_reversed'] });
n('c_rate', 'rc', 60, 'proc', 'Rates and expo', ['deflection to deg/s'], { params: ['rates_type', 'roll_rc_rate', 'roll_expo', 'roll_srate'] });
n('c_lim', 'rc', 60, 'proc', 'Rate limit', [], { params: ['roll_rate_limit', 'pitch_rate_limit', 'yaw_rate_limit'] });
// rewrites rawSetpoint after feedforward has read it
n('c_fpv', 'rc', 60, 'proc', 'FPV camera mix', ['rotates roll / yaw setpoint', 'feedforward taps before it'], { params: ['fpv_mix_degrees'], cond: 'FPV ANGLE MIX mode' });
n('c_sm', 'rc', 60, 'filt', 'RC smoothing', ['PT3, at PID rate'], { params: ['rc_smoothing', 'rc_smoothing_setpoint_cutoff', 'rc_smoothing_auto_factor'], cond: 'optional' });
n('c_cond', 'rc', 60, 'proc', 'Setpoint conditioning', ['flight/pid.c: levelling,', 'acro trainer, launch control', 'angle: P x (target − attitude)'], {
  params: ['angle_p_gain', 'angle_feedforward', 'angle_feedforward_smoothing_ms', 'angle_limit', 'angle_earth_ref', 'horizon_limit_degrees', 'horizon_delay_ms', 'acc_limit', 'acc_limit_yaw'],
});

// gyro filter chain
n('g_sens', 'gyro', 68, 'io', 'Gyro', ['sensor(s)'], { params: ['gyro_enabled_bitmask', 'gyro_hardware_lpf'] });
n('g_prep', 'gyro', 68, 'proc', 'Align, scale', ['average of N gyros'], { params: ['align_board_roll', 'align_board_pitch', 'align_board_yaw'] });
n('g_lpf2', 'gyro', 68, 'filt', 'Gyro LPF2', ['decimator, runs at', 'raw sensor ODR'], { params: ['gyro_lpf2_type', 'gyro_lpf2_static_hz'] });
n('g_rpm', 'gyro', 68, 'filt', 'RPM filter', ['one block over', 'all three axes'], {
  params: ['rpm_filter_harmonics', 'rpm_filter_weights', 'rpm_filter_q', 'rpm_filter_min_hz', 'rpm_filter_fade_range_hz'],
  cond: 'needs bidir DShot',
});
n('g_ntch', 'gyro', 68, 'filt', 'Notch 1 and 2', ['static'], { params: ['gyro_notch1_hz', 'gyro_notch1_cutoff', 'gyro_notch2_hz', 'gyro_notch2_cutoff'], cond: 'off by default' });
n('g_lpf1', 'gyro', 68, 'filt', 'Gyro LPF1', ['dyn LPF retunes', 'this same filter'], {
  params: ['gyro_lpf1_type', 'gyro_lpf1_static_hz', 'gyro_lpf1_dyn_min_hz', 'gyro_lpf1_dyn_max_hz', 'gyro_lpf1_dyn_expo'],
});
n('g_dyn', 'gyro', 68, 'filt', 'Dynamic notch', ['SDFT, N peaks', 'per axis'], { params: ['dyn_notch_count', 'dyn_notch_q', 'dyn_notch_min_hz', 'dyn_notch_max_hz'], cond: 'PID loop >= 2 kHz' });

// D-term chain
n('d_ntch', 'dterm', 64, 'filt', 'D notch', [], { params: ['dterm_notch_hz', 'dterm_notch_cutoff'], cond: 'off by default' });
n('d_lp1', 'dterm', 64, 'filt', 'D LPF1', ['dynamic'], { params: ['dterm_lpf1_type', 'dterm_lpf1_static_hz', 'dterm_lpf1_dyn_min_hz', 'dterm_lpf1_dyn_max_hz', 'dterm_lpf1_dyn_expo'] });
n('d_lp2', 'dterm', 64, 'filt', 'D LPF2', ['static'], { params: ['dterm_lpf2_type', 'dterm_lpf2_static_hz'] });
// derivative on measurement: the minus sign lives here, every term enters the PID sum with +
n('d_dif', 'dterm', 64, 'proc', '−d/dt, then x Kd', ['derivative on measurement', '(filtered gyro, not error)'], { ppos: 'none' });

// values the mixer computes for the next PID loop
n('k_ag', 'mixk', 56, 'fb', 'Anti-gravity', ['boosts I and P on throttle moves'], { params: ['anti_gravity_gain', 'anti_gravity_cutoff_hz', 'anti_gravity_p_gain'] });
n('k_tpa', 'mixk', 56, 'fb', 'TPA', ['to P (if tpa_mode = PD) and D'], { params: ['tpa_rate', 'tpa_breakpoint', 'tpa_mode', 'tpa_low_rate', 'tpa_low_breakpoint'] });
n('k_dyn', 'mixk', 56, 'fb', 'Dynamic LPF cutoffs', ['retunes gyro LPF1 and D LPF1'], { params: ['gyro_lpf1_dyn_*', 'dterm_lpf1_dyn_*'], ppos: 'inside' });

// attitude: Mahony AHRS in imuUpdateAttitude(), gyro via gyroGetFilteredDownsampled()
// (GYRO_IMU_DOWNSAMPLE_CUTOFF_HZ = 200 PT1 on gyro.gyroADCf), acc via its own PT2
n('i_imu', 'att', 60, 'proc', 'Attitude (IMU)', ['Mahony AHRS: gyro + acc', 'gyro via own 200 Hz PT1', '(+ mag, GPS course if fitted)'], {
  params: ['imu_dcm_kp', 'imu_dcm_ki', 'acc_lpf_hz', 'small_angle', 'imu_process_denom'],
});

// throttle lane
n('t_rx', 'thr_rc', 58, 'io', 'Throttle in', ['rcData[THROTTLE] → 0 .. 1000', 'x LVC % once voltage critical'], { params: ['min_check', 'vbat_cutoff_percent'] });
n('t_curve', 'thr_rc', 58, 'proc', 'Throttle curve', ['Bezier', 'output: rcCommand[THROTTLE]'], { params: ['thr_mid', 'thr_expo', 'thr_hover'] });
n('t_sm', 'thr_rc', 58, 'filt', 'RC smoothing', ['PT3'], { params: ['rc_smoothing_throttle_cutoff', 'rc_smoothing_auto_factor_throttle'], cond: 'optional' });
n('t_norm', 'thr_mix', 58, 'proc', 'Normalise', ['(thr − 1000 + tilt corr.) / 1000', 'tilt corr.: attitude, Angle/Horizon'], { params: ['thr_corr_value', 'thr_corr_angle'] });
n('t_lim', 'thr_mix', 58, 'proc', 'Throttle limit', [], { params: ['throttle_limit_type', 'throttle_limit_percent'], cond: 'optional' });
n('t_boost', 'thr_mix', 58, 'proc', 'Throttle boost', [], { params: ['throttle_boost', 'throttle_boost_cutoff'], cond: 'optional' });
// only the approximate inverse lives here; the forward curve acts per motor in m_lin
n('t_lin', 'thr_mix', 58, 'proc', 'Thrust-lin. compensation', ['approx. inverse of forward curve', 'keeps hover throttle'], { params: ['thrust_linear'], cond: 'off by default' });
n('t_rpml', 'thr_mix', 58, 'proc', 'RPM limiter', ['PID on avg RPM, own 6 Hz PT1'], { params: ['rpm_limit', 'rpm_limit_value'], cond: 'needs bidir DShot' });
// last assignment wins; bypasses limit, boost, compensation and the RPM limiter
n('t_ovr', 'thr_mix', 58, 'proc', 'Throttle override', ['yaw-spin 0.5 (no airmode); launch 0', 'alt hold / GPS rescue: autopilot'], { cond: 'mode dependent' });

// mixer (declared in signal order; the lane runs right to left)
n('m_clip', 'mix', 64, 'mix', 'PID sum limit', ['applied here, not in pid.c', 'yaw: 1000 in yaw-spin recovery'], { params: ['pidsum_limit', 'pidsum_limit_yaw'] });
n('m_mix', 'mix', 64, 'mix', 'Motor mix', ['R/P/Y x mixer table'], { params: ['yaw_motors_reversed'] });
n('m_air', 'mix', 64, 'mix', 'Mix adjustment (airmode)', ['mix / range if range > 1', 'throttle clamped: no motor clips', 'airmode off: mix x 0.5..1 (thr<50%)'], {
  params: ['mixer_type', 'ez_landing_threshold', 'ez_landing_limit', 'ez_landing_speed'],
});
n('m_lin', 'mix', 64, 'mix', 'Mix + throttle', ['per motor, 0 .. 1', 'thrust_linear > 0: forward curve'], { params: ['thrust_linear'] });
n('m_scale', 'mix', 64, 'mix', 'Scale to range', ['[motorRangeMin ..', 'motorRangeMax]'], { params: ['motor_idle', 'motor_output_limit'], ppos: 'above' });
// output and ESC telemetry live in the drivers, not in the mixer
n('m_out', 'drv', 64, 'mix', 'Motor output', ['DShot packet'], { params: ['motor_pwm_protocol', 'dshot_bidir'], lane: 'mix' });
n('m_esc', 'drv', 64, 'io', 'ESC and motors', [], { ppos: 'none', lane: 'mix' });
n('a_air', null, 64, 'plant', 'Airframe', ['thrust → torque → rotation', 'physics, not firmware'], { ppos: 'none', lane: 'mix' });
n('r_rpm', 'drv', 56, 'proc', 'eRPM to Hz', ['/ pole pairs, PT1 per motor', 'start of the filter task'], { params: ['motor_poles', 'rpm_filter_lpf_hz'], cond: 'needs bidir DShot', lane: 'tlm' });
// output-window shapers, under the scale stage they act on
n('w_idle', 'mix', 60, 'mix', 'Dynamic idle', ['PID on min motor Hz', 'raises motorRangeMin'], {
  params: ['dyn_idle_min_rpm', 'dyn_idle_p_gain', 'dyn_idle_i_gain', 'dyn_idle_d_gain', 'dyn_idle_max_increase'],
  cond: 'needs bidir DShot',
  lane: 'shape',
});
n('w_vbat', 'mix', 60, 'mix', 'V-bat sag comp.', ['lowers motorRangeMax'], { params: ['vbat_sag_compensation'], cond: 'optional', lane: 'shape' });

// PID controller stack, top to bottom
n('p_f', 'pid', 96, 'pid', 'F', ['Kf x smoothed feedforward', 'R/P: zero in Angle (not Horizon)'], { params: ['f_roll', 'f_pitch', 'f_yaw'] });
n('p_p', 'pid', 96, 'pid', 'P', ['x TPA only if tpa_mode = PD', 'R/P: x anti-gravity; yaw: PT1'], { params: ['p_roll', 'p_pitch', 'p_yaw', 'yaw_lowpass_hz'] });
n('p_i', 'pid', 96, 'pid', 'I', ['relax scales error by setpoint HPF', 'clamp: windup % of pidsum_limit', '(pidsum_limit_yaw on yaw)'], {
  params: ['i_roll', 'i_pitch', 'i_yaw', 'iterm_relax', 'iterm_relax_type', 'iterm_relax_cutoff', 'iterm_rotation', 'iterm_windup'],
});
n('p_d', 'pid', 96, 'pid', 'D', ['input: Kd x (−dgyro/dt)', 'x D_MAX: max(|FF|, |dgyro|) boost', 'FF part 0 in Angle; then x TPA'], {
  params: ['d_roll', 'd_pitch', 'd_yaw', 'd_max_roll', 'd_max_pitch', 'd_max_yaw', 'd_max_gain', 'd_max_advance'],
});

// rate badges mark the blocks that do not run once per PID loop
const RATE = {
  RX: ['c_rx', 'c_cmd', 'c_rate', 'c_lim', 'c_fpv', 'f_ff', 't_rx', 't_curve'],
  GYRO: ['g_sens', 'g_prep', 'g_lpf2'],
  ATT: ['i_imu'],
};
for (const [r, ids] of Object.entries(RATE)) {
  for (const id of ids) {
    NDECL.find((d) => d.id === id).rate = r;
  }
}
// numbered markers tie the NOTES box to the blocks it talks about
for (const [id, k] of [
  ['g_lpf2', 1],
  ['k_dyn', 2],
  ['m_clip', 3],
  ['m_air', 4],
  ['i_imu', 5],
]) {
  NDECL.find((d) => d.id === id).note = k;
}
// lines entering from below run between the two halves of the caption
for (const [id, port] of [
  ['g_lpf1', 0],
  ['g_rpm', -24],
  ['t_rpml', 30],
  ['k_ag', 0],
  ['k_tpa', 0],
]) {
  Object.assign(
    NDECL.find((d) => d.id === id),
    { ppos: 'split', pport: port },
  );
}

// summing points: circles placed by the same layering (no lane, no group). The
// error sum follows the longer gyro chain, so the RC chain compacts against it.
NDECL.push(
  { id: 'e_err', op: true, r: 22, w: 44, h: 44, glyph: 'Σ', cap: '', params: [], ppos: 'none' },
  { id: 'e_sum', op: true, r: 26, w: 52, h: 52, glyph: 'Σ', cap: 'PID sum', params: [], ppos: 'none', rowCenterOf: 'pid' },
);

// ------------------------------------------------------------------- edges
// e(from, to, cls, {out, in, offOut, offIn, label, labelPref, wide, dash, arrow, fold, bus, width})
// cls: sig (signal) | mix (mixer/output) | mod (scheduling: sets a gain,
// cutoff or limit, not a signal value) | tlm (ESC telemetry) | phys (physics: thrust, rotation)
const EDECL = [];
function e(from, to, cls = 'sig', o = {}) {
  EDECL.push({
    from,
    to,
    cls,
    out: o.out || 'R',
    in: o.in || 'L',
    offOut: o.offOut || 0,
    offIn: o.offIn || 0,
    label: o.label || null,
    labelPref: o.labelPref || null,
    labelDx: o.labelDx || 0,
    labelDy: o.labelDy || 0,
    labelF: o.labelF ?? null,
    wide: !!o.wide,
    dash: !!o.dash,
    arrow: o.arrow !== false,
    fold: !!o.fold,
    bus: o.bus || null,
    width: o.width || null,
    track: o.track || null,
  });
}
function chain(ids, cls, o = {}, labels = []) {
  for (let k = 0; k < ids.length - 1; k++) {
    e(ids[k], ids[k + 1], cls, { ...o, label: labels[k] || null });
  }
}

// RC spine into the error junction
chain(['c_rx', 'c_cmd', 'c_rate', 'c_lim', 'c_fpv', 'c_sm', 'c_cond'], 'sig', { wide: true }, ['rcData', 'rcCommand']);
e('c_cond', 'e_err', 'sig', { wide: true, label: 'setpoint' });
// feedforward branch off rawSetpoint, ahead of the FPV camera mix
e('j_raw', 'f_ff', 'sig', { label: 'rawSetpoint', labelPref: 'v' });
e('f_ff', 'f_sm', 'sig');
e('f_sm', 'p_f', 'sig', { label: 'feedforward' });
// feedforward has two more consumers: the D_MAX boost and the angle loop
// label on the riser just above the D-term panel: the stub into D is too short for it, and beside the D entry
// the riser runs too close to the panel frames on both sides
e('j_ff', 'p_d', 'sig', { offIn: -20, fold: true, label: 'D_MAX', labelPref: 'v', labelF: 0.9 });
// angle FF leaves the D_MAX riser at j_angle, so the split carries a dot
e('j_angle', 'c_cond', 'sig', { in: 'T', offIn: 60, fold: true, label: 'angle FF', labelPref: 'h', track: { above: 'rc', k: -1 } });
// error into P and I
e('e_err', 'p_p', 'sig');
e('j_err', 'p_i', 'sig');
// gyro chain; one filtered-gyro output, branching at j_gyro into the error sum
// (rising into the empty cell under it), the D-term chain and the attitude estimator
chain(['g_sens', 'g_prep', 'g_lpf2', 'g_rpm', 'g_ntch', 'g_lpf1', 'g_dyn'], 'sig');
e('g_dyn', 'e_err', 'sig', { out: 'R', in: 'B' });
// both branches take the corridor's low track: clear of the mod line above, room for the label
const GYRO_BUS = { above: 'dterm', k: 1 };
e('j_gyro', 'd_ntch', 'sig', { in: 'T', fold: true, label: 'gyro.gyroADCf to D-term', labelPref: 'h', track: GYRO_BUS });
e('j_gyro', 'i_imu', 'sig', { in: 'T', fold: true, track: GYRO_BUS });
chain(['d_ntch', 'd_lp1', 'd_lp2', 'd_dif'], 'sig');
e('d_dif', 'p_d', 'sig', { label: 'Kd x (−dgyro/dt)' });
// PID terms into the sum
// PID terms into the sum: four separate entries, so the terms are added at the summing
// point and not where their lines would meet (F from above, P and I either side of the
// left, D from below; the sum leaves to the right and drops into the mixer)
e('p_f', 'e_sum', 'sig', { in: 'T' });
e('p_p', 'e_sum', 'sig', { in: 'L', offIn: -12 });
e('p_i', 'e_sum', 'sig', { in: 'L', offIn: 12 });
e('p_d', 'e_sum', 'sig', { in: 'B' });
// sum drops into the mixer row, which runs back towards the gyro
e('e_sum', 'm_clip', 'sig', { out: 'R', in: 'T', offIn: 68, wide: true, fold: true });
chain(['m_clip', 'm_mix', 'm_air', 'm_lin', 'm_scale', 'm_out', 'm_esc'], 'mix', { out: 'L', in: 'R', wide: true, labelDy: -34 }, [
  'PID sums R/P/Y',
  'motorMix[]',
  'mix, clamped thr.',
  'per-motor 0..1',
  'motor[]',
  'DShot frame',
]);
// throttle lane, then into the mix adjustment, which clamps it before it is added
chain(['t_rx', 't_curve', 't_sm', 't_norm', 't_lim', 't_boost', 't_lin', 't_rpml', 't_ovr'], 'sig');
e('t_ovr', 'm_air', 'sig', { out: 'B', in: 'T', fold: true, label: 'throttle 0..1', labelPref: 'v', track: { above: 'mix', k: 1 } });
// gain scheduling: the limited, pre-boost throttle feeds the cluster (mixerThrottle is
// the post-boost value); dynamic LPF retunes both LPF1s
// the tap bus rises out of the throttle panel and runs on the centre track above it
const TAP = { above: 'thr_rc', k: 0 };
e('j_tap', 'k_dyn', 'mod', { in: 'B', bus: 'tap', label: 'throttle (limited, pre-boost)', labelPref: 'h', track: TAP });
e('j_tap', 'k_tpa', 'mod', { in: 'B', bus: 'tap', track: TAP });
e('j_tap', 'k_ag', 'mod', { in: 'B', bus: 'tap', track: TAP });
// the dyn bus takes the corridor's high track, the gyro bus the low one (GYRO_BUS)
e('k_dyn', 'd_lp1', 'mod', { out: 'T', in: 'T', bus: 'dyn', track: { above: 'dterm', k: -1 } });
e('k_dyn', 'g_lpf1', 'mod', { out: 'T', in: 'B', bus: 'dyn', track: { above: 'dterm', k: -1 } });
// output-window shapers: they move the window, not the signal
e('w_idle', 'm_scale', 'mod', { out: 'T', in: 'B', label: '▲ raises the floor' }); // centre to centre: one straight line
e('w_vbat', 'm_scale', 'mod', { out: 'T', in: 'B', offOut: 22, offIn: 44, label: '▼ lowers the ceiling' });
// RPM return: ESC -> eRPM -> per-motor Hz (PT1) -> RPM filter, dynamic idle (minimum);
// the RPM limiter reads the unfiltered average RPM straight from the eRPM samples
e('m_esc', 'r_rpm', 'tlm', { out: 'B', in: 'T', label: 'bidirectional DShot: eRPM', labelPref: 'v' });
// labelF: in the free band between the throttle panels and the motor output panel
e('r_rpm', 'g_rpm', 'tlm', { out: 'L', in: 'B', offIn: -24, label: 'per-motor Hz', labelPref: 'v', labelF: 0.58 });
e('r_rpm', 'w_idle', 'tlm', { label: 'min motor Hz', labelPref: 'h' });
e('j_erpm', 't_rpml', 'tlm', { in: 'B', offIn: 30, label: 'avg RPM, unfiltered', labelPref: 'h', track: { above: 'mix', k: 0 } });
// the physical loop: motors push the airframe, the gyro senses its rotation
e('m_esc', 'a_air', 'phys', { out: 'L', in: 'R', label: 'thrust' });
e('a_air', 'g_sens', 'phys', { out: 'L', in: 'L', label: 'body rates, sensed by the gyro', labelPref: 'h' });

// bus width ticks: R/P/Y vectors (3) and per-motor arrays (N)
for (const [f, t, w] of [
  ['c_cmd', 'c_rate', '3'],
  ['c_cond', 'e_err', '3'],
  ['g_prep', 'g_lpf2', '3'],
  ['e_sum', 'm_clip', '3'],
  ['m_mix', 'm_air', 'N'],
  ['m_scale', 'm_out', 'N'],
]) {
  EDECL.find((ed) => ed.from === f && ed.to === t).width = w;
}

// junctions: a dot on a routed host edge at a named track. gap g lies between
// columns g-1 and g; corridor r lies above row r.
const JDECL = [
  { id: 'j_raw', host: ['c_lim', 'c_fpv'], x: { gap: 4 }, r: 5 },
  // shift: keep the branch to I well clear of the D_MAX feedforward riser beside it
  { id: 'j_err', host: ['e_err', 'p_p'], x: { gap: 8 }, r: 4, shift: -38 },
  // shift: branch at the corner under the error sum, so the leg down to the D-term chain
  // and the riser up into the sum form one straight vertical
  { id: 'j_gyro', host: ['g_dyn', 'e_err'], x: { gap: 7 }, r: 5, shift: 164 },
  { id: 'j_ff', host: ['f_sm', 'p_f'], x: { gap: 8 }, r: 4 },
  { id: 'j_angle', host: ['j_ff', 'p_d'], y: { corridor: 1, k: -1 }, r: 4 },
  // k -1: the tap drops on the gap's left track, the avg RPM line rises on its right one
  { id: 'j_tap', host: ['t_lim', 't_boost'], x: { gap: 5, k: -1 }, r: 5 },
  { id: 'j_erpm', host: ['m_esc', 'r_rpm'], y: { corridor: 6 }, r: 4 },
  { id: 'j_imu', host: ['j_gyro', 'i_imu'], x: { col: 4 }, r: 4 },
];

// ================================================================== layout
// the main control loop: setpoint -> error -> P, I, D -> PID sum -> mixer -> motors ->
// airframe -> gyro -> filters -> error / D-term. The renderer lays a casing under it.
const LOOP = new Set([
  'c_cond>e_err',
  'e_err>p_p',
  'j_err>p_i',
  'p_p>e_sum',
  'p_i>e_sum',
  'p_d>e_sum',
  'e_sum>m_clip',
  'm_clip>m_mix',
  'm_mix>m_air',
  'm_air>m_lin',
  'm_lin>m_scale',
  'm_scale>m_out',
  'm_out>m_esc',
  'm_esc>a_air',
  'a_air>g_sens',
  'g_sens>g_prep',
  'g_prep>g_lpf2',
  'g_lpf2>g_rpm',
  'g_rpm>g_ntch',
  'g_ntch>g_lpf1',
  'g_lpf1>g_dyn',
  'g_dyn>e_err',
  'j_gyro>d_ntch',
  'd_ntch>d_lp1',
  'd_lp1>d_lp2',
  'd_lp2>d_dif',
  'd_dif>p_d',
]);

for (const ed of EDECL) {
  ed.cased = LOOP.has(`${ed.from}>${ed.to}`);
}

export const NOTES = [
  'Gyro LPF2 is the decimator: it runs at the raw sensor rate, ahead of the RPM filter.',
  'Dynamic LPF adds no filter of its own, it retunes gyro LPF1 and D LPF1 from throttle.',
  'mixTable() limits the PID sum and updates TPA and anti-gravity (used one loop later).',
  'The mixer desaturates the mix (mixer_type, airmode) before throttle is added.',
  'Attitude closes a slower outer loop: setpoint conditioning levels from it.',
];

// casingClr: half the main-loop casing (12) plus 3, kept free around edge labels
const L = layout({ nodes: NDECL, lanes: LANES, groups: GROUPS_DECL, edges: EDECL, junctions: JDECL, opts: { casingClr: 9, notesN: NOTES.length } });

export const NODES = L.nodes.filter((d) => !d.op);
export const NODE = Object.fromEntries(L.nodes.map((d) => [d.id, d]));
export const W = L.W;
export const H = L.H;

export const lx = (i) => NODE[i].x;
export const rx = (i) => NODE[i].x + NODE[i].w;
export const cx = (i) => NODE[i].x + NODE[i].w / 2;
export const ty = (i) => NODE[i].y;
export const by = (i) => NODE[i].y + NODE[i].h;
export const cy = (i) => NODE[i].y + NODE[i].h / 2;

// operators: [id, cx, cy, r, glyph, caption, captionDx, captionAnchor, captionDy]
// radius > 6 = open circle (summing point); <= 6 = filled junction dot.
// branch dots the junctions do not cover: a bus that fans out on its way (the throttle
// tap, the dyn LPF bus) gets a dot wherever two of its routes part
const jointAt = new Set(JDECL.map((j) => L.junctions[j.id].p.join(',')));
const SPLITS = busSplits(L.edges).filter((s) => !jointAt.has(s.p.join(',')));
export const OPS = [
  ...L.nodes.filter((d) => d.op).map((d) => [d.id, cx(d.id), cy(d.id), d.r, d.glyph, d.cap, 0, 'middle', 0]),
  ...JDECL.map((j) => [j.id, L.junctions[j.id].p[0], L.junctions[j.id].p[1], j.r, '', '', 0, 'middle', 0]),
  ...SPLITS.map((s, i) => [`split${i + 1}`, s.p[0], s.p[1], 4, '', '', 0, 'middle', 0]),
];
// a branch dot takes the line type of the line it sits on (a junction's host, a split's
// bus), so its colour matches that line: telemetry blue, scheduling grey
export const JCLS = Object.fromEntries([...JDECL.map((j) => [j.id, EDECL.find((ed) => ed.from === j.host[0] && ed.to === j.host[1]).cls]), ...SPLITS.map((s, i) => [`split${i + 1}`, s.cls])]);
export const ox = (i) => OPS.find((o) => o[0] === i)[1];
export const oy = (i) => OPS.find((o) => o[0] === i)[2];

// [x, y, w, h, label, source, labelPos?]
export const GROUPS = L.groups.map((grp) => [...grp.rect, grp.label, grp.src, grp.labelPos]);

export const LEGEND_BOX = L.legend;
export const MARGIN = L.MARGIN;
export const NOTES_BOX = L.notes;

// edges for the renderer: {pts, cls, label, lpos, dash, arrow, wide}
export const E = L.edges.map((ed) => ({
  pts: ed.pts,
  cls: ed.cls,
  label: ed.label,
  lpos: ed.lpos,
  dash: ed.dash,
  arrow: ed.arrow,
  wide: ed.wide,
  width: ed.width,
  bus: ed.bus,
  from: ed.from,
  to: ed.to,
  loop: LOOP.has(`${ed.from}>${ed.to}`),
}));

// annotations anchored to the computed geometry
const riser = L.edges.find((ed) => ed.from === 'g_dyn' && ed.to === 'e_err');
const riserX = riser.pts.find((p, k) => k < riser.pts.length - 1 && riser.pts[k + 1][0] === p[0])[0];
export const FLOATS = [
  ['+', ox('e_err') - 22 - 8, oy('e_err') - 11, 'sign', 'end'],
  ['−', ox('e_err') + 8, oy('e_err') + 22 + 18, 'sign', 'start'],
  ['error', ox('e_err') + 28, oy('e_err') - 12, 'elab', 'start'],
  ['crash / yaw-spin recovery may', ox('e_err'), oy('e_err') - 22 - 22, 'cnd2', 'middle'],
  ['override setpoint, error, I', ox('e_err'), oy('e_err') - 22 - 10, 'cnd2', 'middle'],
  ['gyro.gyroADCf', riserX + 11, ty('g_dyn') - 36, 'elab', 'start'],
  // PID sum: every term enters with + (D carries its minus inside the term). One sign per
  // corner, so none pairs up with a neighbour's: F and D right of their lines, P above its
  // line, I below its line (P's runs 24 px above it)
  ['+', ox('e_sum') + 8, oy('e_sum') - 26 - 6, 'sign', 'start'],
  ['+', ox('e_sum') - 26 - 8, oy('e_sum') - 12 - 11, 'sign', 'end'],
  ['+', ox('e_sum') - 26 - 8, oy('e_sum') + 12 + 23, 'sign', 'end'],
  ['+', ox('e_sum') + 8, oy('e_sum') + 26 + 18, 'sign', 'start'],
];

// external inputs (autopilot / GPS rescue live outside this diagram): a short stub
// from an open terminal into the consumer. [[x1,y1],[x2,y2], label, [lx, ly, anchor]?]
export const EXT = [
  // rescue / autopilot yaw replaces the rate-curve output, so it still passes the rate limit
  [[cx('c_lim'), ty('c_lim') - 50], [cx('c_lim'), ty('c_lim')], 'GPS rescue / autopilot: yaw rate', [cx('c_lim') - 8, ty('c_lim') - 46, 'end']],
  [[lx('c_cond') + 40, ty('c_cond') - 50], [lx('c_cond') + 40, ty('c_cond')], 'GPS rescue / pos hold: R/P angle', [lx('c_cond') + 32, ty('c_cond') - 46, 'end']],
  [[lx('t_ovr') + 40, ty('t_ovr') - 50], [lx('t_ovr') + 40, ty('t_ovr')], 'autopilot throttle', [lx('t_ovr') + 48, ty('t_ovr') - 46, 'start']],
];

// off-sheet connectors: values that travel too far to route. The source gets a tag
// on its right edge, every consumer a matching tag on a stub into its top edge.
// {tag, src, dst: [[node, x offset from the left edge]]}
export const CONNECTORS = [
  {
    tag: 'TPA',
    src: 'k_tpa',
    dst: [
      ['p_p', 40],
      ['p_d', 40],
    ],
  },
  {
    tag: 'AG',
    src: 'k_ag',
    dst: [
      ['p_p', 122],
      ['p_i', 40],
    ],
  },
  // the ATT stub is as long as the external-input stubs beside it, so its tag clears the
  // panel frame; x: evenly between the GPS rescue stub (+40) and angle FF (+168)
  { tag: 'ATT', src: 'i_imu', dst: [['c_cond', 104, 50]] },
].map((c) => ({
  ...c,
  out: [
    [rx(c.src), cy(c.src)],
    [rx(c.src) + 18, cy(c.src)],
  ],
  ins: c.dst.map(([id, off, len = 26]) => [
    [lx(id) + off, ty(id) - len],
    [lx(id) + off, ty(id)],
  ]),
}));

// every stub segment, for the geometry checks
export const STUBS = [...EXT.map((s) => [s[0], s[1], s[2]]), ...CONNECTORS.flatMap((c) => [[...c.out, c.tag], ...c.ins.map((i) => [...i, c.tag])])];

// --------------------------------------------------------------------- helpers
export { wrap, splitParams } from './layout.mjs';

// like Python's '%g': up to six significant digits, no trailing zeros
export function g(v) {
  if (Number.isInteger(v)) {
    return String(v);
  }
  return String(Number.parseFloat(v.toPrecision(6)));
}

export function esc(s) {
  return String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;');
}

// x positions of the verticals of other edges that cross the horizontal segment a-b
function crossingXs([x1, y1], [x2], allsegs, me, r) {
  const xs = [];
  for (const [p, q, ed] of allsegs) {
    if (ed === me || p[0] !== q[0]) {
      continue;
    }
    const vx = p[0];
    const [vy1, vy2] = [Math.min(p[1], q[1]), Math.max(p[1], q[1])];
    const [lo, hi] = [Math.min(x1, x2), Math.max(x1, x2)];
    if (lo + r + 1 < vx && vx < hi - r - 1 && vy1 + 2 < y1 && y1 < vy2 - 2) {
      xs.push(vx);
    }
  }
  return xs;
}

// sorted along the travel direction, crossings closer than 2r + 4 merged into one [first, last] run
function crossingRuns(xs, step, r) {
  const uniq = [...new Set(xs)].sort((p, q) => (step > 0 ? p - q : q - p));
  const runs = [];
  for (const vx of uniq) {
    const last = runs.at(-1);
    if (last && Math.abs(vx - last[1]) < 2 * r + 4) {
      last[1] = vx;
    } else {
      runs.push([vx, vx]);
    }
  }
  return runs;
}

// Render a horizontal segment as a path, arcing over any crossing verticals. r grows
// with the stroke width (the renderer passes it); crossings closer than 2r + 4 share
// one wider arc instead of two touching ones.
export function hopPath(a, b, allsegs, me, r = 5) {
  const [[x1, y1], [x2, y2]] = [a, b];
  const straight = `M ${g(x1)} ${g(y1)} L ${g(x2)} ${g(y2)}`;
  if (y1 !== y2) {
    return straight;
  }
  const xs = crossingXs(a, b, allsegs, me, r);
  if (!xs.length) {
    return straight;
  }
  const step = x2 > x1 ? 1 : -1;
  let d = `M ${g(x1)} ${g(y1)}`;
  for (const [s0, s1] of crossingRuns(xs, step, r)) {
    const rx = r + Math.abs(s1 - s0) / 2;
    d += ` L ${g(s0 - r * step)} ${g(y1)}`;
    d += ` A ${g(rx)} ${g(r)} 0 0 ${step > 0 ? 1 : 0} ${g(s1 + r * step)} ${g(y1)}`;
  }
  d += ` L ${g(x2)} ${g(y2)}`;
  return d;
}

// bend report: edges that still need more than two bends
export const BEND_REPORT = L.edges.map((ed) => ({ from: ed.from, to: ed.to, bends: ed.pts.length - 2 })).filter((r) => r.bends > 2);

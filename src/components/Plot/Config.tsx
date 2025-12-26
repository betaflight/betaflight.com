import { formatSignificant } from './Tools';

// ============================================================================
// Recharts Props Configuration
// ============================================================================
// Configure plot styling and behavior here.
// For plot line colors, see Plot.module.css
// ============================================================================

/**
 * Container configuration for ResponsiveContainer
 */
const CONTAINER = {
  height: 350,
};

/**
 * Chart container styling (i.e. for spacing of axis labels)
 */
const CHART = {
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
};

/**
 * Grid styling for CartesianGrid component
 */
const GRID = {
  strokeDasharray: '3 3',
  stroke: 'var(--ifm-color-emphasis-300)',
  strokeWidth: 1,
  strokeLinecap: 'round' as const,
  // Background fill for the chart area (adapts to theme)
  fill: 'var(--plot-grid-fill)',
};

/**
 * Base styling for all axes (shared by x and y axes)
 */
const AXIS_BASE = {
  stroke: 'var(--ifm-color-emphasis-500)',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  tick: {
    fill: 'var(--ifm-font-color-base)',
    fontFamily: 'var(--ifm-font-family-base)',
    fontSize: '12px',
  },
};

/**
 * Individual axis configurations
 * - x: Bottom primary X-axis (data values)
 * - y: Left primary Y-axis (data values)
 * - top: Top border axis (decorative, no ticks)
 * - right: Right border axis (decorative, no ticks)
 */
const AXIS = {
  x: {
    ...AXIS_BASE,
    dataKey: 'x',
    type: 'number' as const,
    domain: ['auto' as const, 'auto' as const],
    tickLine: { transform: 'translate(0, -6)' },
    tickFormatter: (v: number | string) => formatSignificant(v),
  },
  y: {
    ...AXIS_BASE,
    tickLine: { transform: 'translate(6, 0)' },
    tickFormatter: (v: number | string) => formatSignificant(v),
  },
  top: {
    ...AXIS_BASE,
    xAxisId: 'top', // Separate ID for top border axis
    orientation: 'top' as const,
    ticks: [], // No tick marks (decorative border only)
  },
  right: {
    ...AXIS_BASE,
    yAxisId: 'right', // Separate ID for right border axis
    orientation: 'right' as const,
    ticks: [], // No tick marks (decorative border only)
  },
};

/**
 * Line styling configuration (used in Series rendering)
 */
const LINE = {
  type: 'linear' as const,
  dataKey: 'y',
  stroke: 'var(--ifm-color-primary)',
  strokeWidth: 4,
  strokeLinecap: 'butt' as const,
  strokeDasharray: '0',
  fill: 'none',
  dot: false,
  isAnimationActive: false,
};

/**
 * Tooltip configuration for data point hover display
 */
const TOOLTIP = {
  labelFormatter: (l: number | string) => `x : ${formatSignificant(l)}`,
  formatter: (v: number | string) => formatSignificant(v),
  isAnimationActive: false,
  contentStyle: {
    backgroundColor: 'var(--ifm-background-surface-color)',
    borderColor: 'var(--ifm-color-emphasis-300)',
    color: 'var(--ifm-font-color-base)',
  },
  itemStyle: {
    margin: 0,
    padding: 0,
    lineHeight: 1.5,
  },
};

/**
 * Color palette for multiple series lines
 * Cycles through these colors when multiple Plot.Series are rendered
 * Define color values in Plot.module.css
 */
export const SERIES_COLORS = [
  'var(--plot-color-1)',
  'var(--plot-color-2)',
  'var(--plot-color-3)',
  'var(--plot-color-4)',
  'var(--plot-color-5)',
  'var(--plot-color-6)',
  'var(--plot-color-7)',
] as const;

const PLOT_PROPS = {
  CONTAINER,
  CHART,
  GRID,
  AXIS_BASE,
  AXIS,
  LINE,
  TOOLTIP,
};

export default PLOT_PROPS;

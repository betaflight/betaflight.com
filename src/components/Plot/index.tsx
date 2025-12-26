'use client';

/**
 * Entry point for the Plot component library.
 * Exports Plot and Series components along with types for external use.
 */

import PlotComponent from './Plot';
import { Series } from './Series';

/**
 * Attach Series as a property to Plot component for convenient access.
 * Allows usage as either:
 *   - <Plot.Series />  (nested)
 *   - <Series />       (standalone)
 */
const Plot = Object.assign(PlotComponent, { Series });

/**
 * Re-export types for external consumers
 * - SeriesProps: Props for Series component
 * - PlotProps: Props for Plot component
 * - DataPoint: Individual data point structure { x: number, y: number }
 */
export type { SeriesProps, PlotProps, DataPoint } from './Types';

/**
 * Re-export color palette constant
 * Array of CSS color variables used for multi-series coloring
 * Define actual colors in Plot.module.css
 */
export { SERIES_COLORS } from './Config';

/**
 * Default export: Plot component with attached Series property
 * Usage:
 *   <Plot fn={(x) => x * 2} label="Linear" />
 *   <Plot>
 *     <Plot.Series fn={...} />
 *     <Plot.Series fn={...} />
 *   </Plot>
 */
export default Plot;

/**
 * Named export: Series component for multi-series plots
 * Usage:
 *   <Plot>
 *     <Series fn={(x) => x * 2} label="Linear" />
 *     <Series fn={(x) => x * x} label="Quadratic" />
 *   </Plot>
 */
export { Series };

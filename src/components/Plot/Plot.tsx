'use client';

import React from 'react';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Series, useSeriesData, renderSeriesLines } from './Series';
import { calculateDomain } from './Tools';
import { PlotProps } from './Types';
import props from './Config';
import css from './Plot.module.css';

/**
 * Plot component for displaying mathematical functions or lookup data
 *
 * @example
 * // Simple function plot
 * <Plot fn={(x) => x**2} />
 *
 * @example
 * // Multi-series with custom styling
 * <Plot>
 *   <Series id="sin" label="sin(x)" fn={Math.sin} color="#ff0000" />
 *   <Series id="cos" label="cos(x)" fn={Math.cos} color="#0000ff" />
 * </Plot>
 *
 * @example
 * // Load data from JSON or CSV files
 * <Plot lookup="/data.json" />
 *
 * @param fn - Function (x) => y to plot
 * @param lookup - URL to JSON or CSV file with data points
 * @param xmin - Minimum x value for function plotting
 * @param xmax - Maximum x value for function plotting
 * @param samples - Number of sample points for function plotting
 * @param id - Optional series identifier; used as the y-key
 * @param label - Label for the series in the legend/tooltip
 * @param color - Stroke color for the series line
 * @param strokeWidth - Line thickness in pixels
 * @param strokeDasharray - SVG dash pattern (e.g., "5 5") for the line style
 * @param dot - Whether to render dots at data points (boolean or Recharts dot props)
 * @param className - Additional CSS class names
 * @param children - Series components for multi-line plots
 */
export default function Plot({
  fn,
  lookup,
  xmin = 0,
  xmax = 1,
  samples = 100,
  id,
  label,
  color,
  strokeWidth,
  strokeDasharray,
  dot,
  className,
  children,
}: PlotProps) {
  const effectiveChildren = React.useMemo(() => {
    if (React.Children.count(children) === 0 && (fn || lookup)) {
      // If no children provided, create an implicit Series with the Plot's props
      return <Series fn={fn} lookup={lookup} xmin={xmin} xmax={xmax} samples={samples} id={id} label={label} color={color} strokeWidth={strokeWidth} strokeDasharray={strokeDasharray} dot={dot} />;
    }
    return children;
  }, [children, fn, lookup, xmin, xmax, samples, id, label, color, strokeWidth, strokeDasharray, dot]);

  const { series, loading, error } = useSeriesData(effectiveChildren, xmin, xmax, samples);
  const domain = calculateDomain(series, xmin, xmax);
  const lines = React.useMemo(() => renderSeriesLines(series), [series]);

  if (loading) return <div className={css.loading}>Loading plot…</div>;
  if (error) return <div className={css.error}>Error…</div>;

  return (
    <div className={`${css.container} ${className || ''}`}>
      <ResponsiveContainer {...props.CONTAINER}>
        <LineChart {...props.CHART}>
          <CartesianGrid {...props.GRID} />

          {/* Primary Axes */}
          <XAxis {...props.AXIS.x} domain={domain} />
          <YAxis {...props.AXIS.y} />

          {/* Border Axes */}
          <XAxis {...props.AXIS.top} />
          <YAxis {...props.AXIS.right} />

          {/* Interactions */}
          <Tooltip {...props.TOOLTIP} />
          {series.length > 1 && <Legend />}

          {/* Display all series lines */}
          {series.length > 0 && lines}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

import React from 'react';

// ============================================================================
// Shared Type Definitions
// ============================================================================

export type DataPoint = {
  x: number
  y: number
}

export type DataSourceProps = {
  /** Function (x) => y to plot */
  fn?: (x: number) => number
  /** URL to JSON or CSV file with data points */
  lookup?: string
  /** Minimum x value for function plotting */
  xmin?: number
  /** Maximum x value for function plotting */
  xmax?: number
  /** Number of sample points for function plotting */
  samples?: number
}

export type PlotLineProps = {
  /** Unique identifier for the series */
  id?: string
  /** Label for the legend */
  label?: string
  /** Line color (CSS color value) */
  color?: string
  /** Line thickness */
  strokeWidth?: number
  /** Dash pattern (e.g. "8 4") */
  strokeDasharray?: string
  /** Show data points */
  dot?: boolean
}

export type PlotCanvasProps = {
  /** Additional CSS class names */
  className?: string
  /** Series components for multi-line plots */
  children?: React.ReactNode
}

// ============================================================================
// Component Props
// ============================================================================

export type SeriesProps = DataSourceProps & PlotLineProps

export type PlotProps = SeriesProps & PlotCanvasProps

export type SeriesWithData = PlotLineProps & {
  id: string
  data: DataPoint[]
}

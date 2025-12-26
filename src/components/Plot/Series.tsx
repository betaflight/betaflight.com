'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Line } from 'recharts';
import { loadLookup, sampleFunction } from './Tools';
import { DataPoint, SeriesProps, SeriesWithData } from './Types';
import cfg, { SERIES_COLORS } from './Config';

/**
 * Marker component for plot series.
 * Returns null; used only for detecting series children passed to Plot.
 */
export function Series(_: SeriesProps) {
  return null;
}

/**
 * Type guard to detect `Series` elements among children.
 */
function isSeriesElement(node: React.ReactNode): node is React.ReactElement<SeriesProps> {
  return Boolean(React.isValidElement(node) && node.type === Series);
}

/**
 * Async helper that resolves one data series from props (lookup fetch or function sampling).
 */
async function buildSeriesData(props: SeriesProps, idx: number, n: number, xmin: number, xmax: number, samples: number): Promise<SeriesWithData> {
  const id = props.id || (n === 1 ? 'y' : `y-${idx}`);
  const min = props.xmin ?? xmin;
  const max = props.xmax ?? xmax;
  const resolvedSamples = props.samples ?? samples;

  let data: DataPoint[] = [];
  if (props.lookup) {
    data = await loadLookup(props.lookup);
  } else if (props.fn) {
    data = sampleFunction(props.fn, min, max, resolvedSamples);
  }

  return {
    id,
    label: props.label || id,
    color: props.color,
    strokeWidth: props.strokeWidth,
    strokeDasharray: props.strokeDasharray,
    dot: props.dot,
    data,
  };
}

/**
 * Hook: collect all `Series` children and hydrate them with loaded/sample data.
 * - Handles parallel loading via Promise.all.
 * - Exposes loading flag and assembled series array ready for recharts Lines.
 */
export function useSeriesData(children: React.ReactNode, xmin: number, xmax: number, samples: number) {
  const [series, setSeries] = useState<SeriesWithData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Collect only valid Series elements once per children change
  const nodes = useMemo(() => React.Children.toArray(children).filter(isSeriesElement) as React.ReactElement<SeriesProps>[], [children]);

  useEffect(() => {
    // No series to load: Reset state and exit
    if (nodes.length === 0) {
      setSeries([]);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    // Load all series in parallel (function samples or lookups)
    Promise.all(nodes.map((el, idx) => buildSeriesData(el.props, idx, nodes.length, xmin, xmax, samples)))
      .then((loaded) => {
        if (!cancelled) setSeries(loaded);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setSeries([]);
        }
      })
      .finally(() => {
        // Avoid setState after unmount
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [nodes, samples, xmin, xmax]);

  return { series, loading, error };
}

/**
 * Render recharts Line components for each series.
 */
export function renderSeriesLines(series: SeriesWithData[]) {
  return series.map((s, idx) => (
    <Line
      {...cfg.LINE}
      key={s.id}
      data={s.data}
      name={s.label}
      stroke={s.color || SERIES_COLORS[idx % SERIES_COLORS.length]}
      strokeWidth={s.strokeWidth ?? cfg.LINE.strokeWidth}
      strokeDasharray={s.strokeDasharray ?? cfg.LINE.strokeDasharray}
      dot={s.dot ?? cfg.LINE.dot}
    />
  ));
}

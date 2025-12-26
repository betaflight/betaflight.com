import { DataPoint, SeriesWithData } from './Types';
import { AxisDomain } from 'recharts/types/util/types';

// Shared number formatter: cap to 4 significant digits for display
const SIG4 = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 4, useGrouping: false });

/**
 * Format a number with a maximum number of significant digits.
 * Falls back to string input when value is not a finite number.
 */
export function formatSignificant(value: number | string, maxDigits = 4): string {
  const num = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(num)) return String(value);
  if (maxDigits === 4) return SIG4.format(num);
  return new Intl.NumberFormat('en-US', { maximumSignificantDigits: maxDigits, useGrouping: false }).format(num);
}

/**
 * Async loader that fetches a lookup file and returns normalized datapoints.
 * Tries JSON first, then falls back to CSV parsing when JSON parse fails.
 */
export async function loadLookup(url: string): Promise<DataPoint[]> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load lookup file: ${url}`);
  const text = await res.text();
  try {
    const parsed = JSON.parse(text);
    const normalized = normalizeData(parsed);
    if (normalized.length) return normalized;
  } catch {
    // fallback to CSV
  }
  return parseCsv(text);
}

/**
 * Samples a function across [xmin, xmax] with n points and returns datapoints.
 */
export function sampleFunction(fn: (x: number) => number, xmin: number, xmax: number, n: number): DataPoint[] {
  const data: DataPoint[] = [];
  const step = (xmax - xmin) / (n - 1);
  for (let i = 0; i < n; i++) {
    const x = xmin + i * step;
    data.push({ x, y: fn(x) });
  }
  return data;
}

/**
 * Normalizes arbitrary JSON-like input into an array of {x, y} points.
 * Supports array-of-pairs or {x:[], y:[]} shapes; returns empty when unsupported.
 */
export function normalizeData(raw: unknown): DataPoint[] {
  if (Array.isArray(raw)) return raw as DataPoint[];
  if (raw && typeof raw === 'object') {
    const obj = raw as { x?: unknown; y?: unknown };
    if (Array.isArray(obj.x) && Array.isArray(obj.y)) {
      const xs = obj.x as number[];
      const ys = obj.y as number[];
      const len = Math.min(xs.length, ys.length);
      const out: DataPoint[] = [];
      for (let i = 0; i < len; i++) out.push({ x: xs[i], y: ys[i] });
      return out;
    }
  }
  return [];
}

/**
 * Parses simple CSV-like text (handles whitespace, comma, semicolon, tab separators).
 */
export function parseCsv(text: string): DataPoint[] {
  const lines = text.trim().split(/\r?\n/);
  const out: DataPoint[] = [];
  for (const line of lines) {
    if (!line.trim()) continue;
    const parts = line
      .trim()
      .split(/[;,\t\s]+/)
      .filter(Boolean);
    if (parts.length < 2) continue;
    const x = Number(parts[0]);
    const y = Number(parts[1]);
    if (Number.isFinite(x) && Number.isFinite(y)) out.push({ x, y });
  }
  return out;
}

/**
 * Calculate the domain (min/max x-axis range) from series data.
 * Falls back to provided defaults if no data is present.
 */
export function calculateDomain(series: SeriesWithData[], xmin: number, xmax: number): AxisDomain {
  const xs = series.flatMap((s) => s.data.map((p) => p.x));
  const domainMin = xs.length ? Math.min(...xs) : xmin;
  const domainMax = xs.length ? Math.max(...xs) : xmax;
  return [domainMin, domainMax];
}

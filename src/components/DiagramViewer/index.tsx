'use client';

/**
 * Pan / zoom viewer for large generated SVG diagrams (the signal-flow diagram).
 *
 * The SVG for the active colour mode is fetched and inlined, so its text can be found
 * with the search box and with the browser's own find. The page never scrolls under
 * the pointer: plain wheel scrolls the page, Ctrl/Cmd + wheel (or any wheel in full
 * screen) zooms. Elements tagged data-layer="parameters" (the CLI parameter captions)
 * are hidden while the diagram is too small to read them, unless the reader forces them on.
 *
 * Two levels of detail: with an overview drawing (overviewLight / overviewDark), a
 * Simplified / Detailed switch swaps between it and the detailed drawing. Both are
 * fetched up front, so the switch is instant; the choice is remembered per browser.
 * Dependency-free.
 */

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent as ReactPointerEvent } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './DiagramViewer.module.css';

export interface DiagramViewerProps {
  /** SVG path (site-relative) for the light theme */
  light: string;
  /** SVG path (site-relative) for the dark theme */
  dark: string;
  /** accessible name of the diagram */
  alt: string;
  /** simplified (module overview) drawing for the light theme; enables the detail switch */
  overviewLight?: string;
  /** simplified (module overview) drawing for the dark theme */
  overviewDark?: string;
  /** level of detail before the reader picks one (default: detailed) */
  defaultDetail?: Detail;
}

type ParamMode = 'auto' | 'on' | 'off';
type Detail = 'detailed' | 'simplified';
const DETAIL_KEY = 'diagram-viewer:detail';
interface View {
  s: number;
  x: number;
  y: number;
}

const MAX_SCALE = 3;
/** parameter captions become readable at about this scale */
const PARAM_SCALE = 0.75;
const STEP = 1.4;

type Point = { x: number; y: number };

/** mean position of the active pointers */
const centroid = (pts: Point[]): Point => pts.reduce((a, p) => ({ x: a.x + p.x / pts.length, y: a.y + p.y / pts.length }), { x: 0, y: 0 });

/** distance between the first two pointers (0 with fewer) */
const spread = (pts: Point[]): number => (pts.length > 1 ? Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) : 0);

/** viewport height: in full screen the room below the toolbar, in the page the drawing's aspect ratio */
function portHeight(el: HTMLElement, w: number, ratio: number, full: boolean): number {
  if (full) return window.innerHeight - (el.querySelector(`.${styles.toolbar}`)?.clientHeight ?? 0);
  // never shorter than half the window (capped at 420px), so a phone still shows something
  // to pan, nor taller than the window, so a tall drawing does not push the page around
  const floor = Math.min(window.innerHeight * 0.5, 420);
  const ceil = Math.max(window.innerHeight - 160, floor);
  return Math.round(Math.min(Math.max(w * ratio, floor), ceil));
}

/** scale at which the whole drawing fits the viewport (1 until both are measured) */
function fitScaleFor(svg: { w: number; h: number } | null, port: { w: number; h: number }): number {
  if (!svg || !port.w) return 1;
  const fitHeight = port.h ? port.h / svg.h : Infinity;
  return Math.min(port.w / svg.w, fitHeight);
}

const PARAM_CHOICES: [ParamMode, string, string][] = [
  ['auto', 'Auto', 'Shown once zoomed in far enough to read them'],
  ['on', 'Show', 'Always shown'],
  ['off', 'Hide', 'Always hidden'],
];

/** the Auto / Show / Hide switch for the CLI parameter captions */
function ParamsControl({ params, off, onChange }: Readonly<{ params: ParamMode; off: boolean; onChange: (mode: ParamMode) => void }>): JSX.Element {
  return (
    <div className={`${styles.params} ${off ? styles.paramsOff : ''}`}>
      <span className={styles.muted} aria-hidden="true">
        Parameters
      </span>
      <fieldset className={styles.track}>
        <legend className={styles.srOnly}>Parameters</legend>
        {PARAM_CHOICES.map(([mode, label, title]) => (
          <button key={mode} type="button" onClick={() => onChange(mode)} aria-pressed={params === mode} disabled={off} title={`CLI parameter names: ${title.toLowerCase()}`}>
            {label}
          </button>
        ))}
      </fieldset>
    </div>
  );
}

/** the full-screen toggle; below 640 px only the icon shows, so the name comes from aria-label */
function FullScreenButton({ full, onToggle }: Readonly<{ full: boolean; onToggle: () => void }>): JSX.Element {
  const label = full ? 'Exit full screen' : 'Full screen';
  return (
    // the label carries the state, so no aria-pressed as well
    <button type="button" className={styles.btn} onClick={onToggle} aria-label={label}>
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
        <path d={full ? 'M5 2v3H2M9 2v3h3M12 9H9v3M2 9h3v3' : 'M2 5V2h3M9 2h3v3M12 9v3H9M5 12H2V9'} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className={styles.btnLabel}>{label}</span>
    </button>
  );
}

/** the text elements whose content contains the (lower-case) query */
function findTexts(root: SVGSVGElement, q: string): SVGTextElement[] {
  // the legend / title block describes the drawing; it is not something to find in it
  return [...root.querySelectorAll('text')].filter((t) => !t.closest('#sf-legend') && t.textContent?.toLowerCase().includes(q));
}

/** outline the found text with a rectangle */
function markHit(root: SVGSVGElement, b: DOMRect): void {
  const mark = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  mark.dataset.searchHit = '';
  mark.setAttribute('class', styles.searchHit);
  mark.setAttribute('x', String(b.x - 4));
  mark.setAttribute('y', String(b.y - 3));
  mark.setAttribute('width', String(b.width + 8));
  mark.setAttribute('height', String(b.height + 6));
  mark.setAttribute('rx', '3');
  root.appendChild(mark);
}

export default function DiagramViewer({ light, dark, alt, overviewLight, overviewDark, defaultDetail = 'detailed' }: Readonly<DiagramViewerProps>): JSX.Element {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const detailedUrl = useBaseUrl(isDark ? dark : light);
  const overviewPath = isDark ? overviewDark : overviewLight;
  const overviewUrl = useBaseUrl(overviewPath ?? '');
  const hasOverview = Boolean(overviewPath);

  const [svgs, setSvgs] = useState<Record<string, { html: string; w: number; h: number }>>({});
  const [view, setView] = useState<View>({ s: 1, x: 0, y: 0 });
  const [fitted, setFitted] = useState(true);
  const [params, setParams] = useState<ParamMode>('auto');
  const [detail, setDetail] = useState<Detail>(defaultDetail);
  const url = detail === 'simplified' && hasOverview ? overviewUrl : detailedUrl;
  // memoised: the geometry hooks depend on it, and a fresh object every render would loop them
  const svg = useMemo(() => (svgs[url] ? { url, ...svgs[url] } : null), [svgs, url]);
  const [full, setFull] = useState(false);
  const [hint, setHint] = useState(false);
  const [query, setQuery] = useState('');
  const [hit, setHit] = useState<{ n: number; of: number } | null>(null);
  const [port, setPort] = useState({ w: 0, h: 0 });

  const rootRef = useRef<HTMLDivElement>(null);
  const portRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef(view);
  viewRef.current = view;
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<{ x: number; y: number; d: number; v: View } | null>(null);
  const hintTimer = useRef<ReturnType<typeof setTimeout>>();
  const matchIndex = useRef(-1);
  const pendingSearch = useRef(false);

  // ------------------------------------------------------- level of detail
  // the remembered choice is read after mount, so the server render stays deterministic
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DETAIL_KEY);
      if (saved === 'detailed' || saved === 'simplified') setDetail(saved);
    } catch {
      /* storage blocked: keep the default */
    }
  }, []);
  const chooseDetail = (d: Detail) => {
    setDetail(d);
    matchIndex.current = -1;
    pendingSearch.current = false;
    stageRef.current?.querySelector('[data-search-hit]')?.remove();
    setHit(null);
    try {
      localStorage.setItem(DETAIL_KEY, d);
    } catch {
      /* storage blocked: the choice lasts for this page view */
    }
  };

  // ---------------------------------------------------------------- load
  // both drawings of the current theme, so switching the level of detail is instant
  const loaded = useRef(new Set<string>());
  useEffect(() => {
    let live = true;
    for (const u of hasOverview ? [detailedUrl, overviewUrl] : [detailedUrl]) {
      if (loaded.current.has(u)) continue; // already in svgs from an earlier visit to this theme
      fetch(u)
        .then((r) => (r.ok ? r.text() : Promise.reject(new Error(r.statusText))))
        .then((text) => {
          if (!live) return;
          const vb = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(text);
          if (!vb) return;
          // drop the licence comment ahead of <svg>; it is kept in the file itself
          const html = text.slice(text.indexOf('<svg'));
          loaded.current.add(u);
          setSvgs((all) => ({ ...all, [u]: { html, w: Number.parseFloat(vb[1]), h: Number.parseFloat(vb[2]) } }));
        })
        .catch(() => {
          /* the <img> fallback stays on screen */
        });
    }
    return () => {
      live = false;
    };
  }, [detailedUrl, overviewUrl, hasOverview]);

  // a different drawing starts fitted
  useEffect(() => {
    setFitted(true);
  }, [url]);

  // a theme switch replaces the inlined drawing and its highlight: start the search over
  useEffect(() => {
    matchIndex.current = -1;
    pendingSearch.current = false;
    setHit(null);
  }, [isDark]);

  // ------------------------------------------------------------- geometry
  const fitScale = fitScaleFor(svg, port);
  const minScale = fitScale * 0.8;

  const clamp = useCallback(
    (v: View): View => {
      if (!svg) return v;
      const s = Math.min(MAX_SCALE, Math.max(minScale, v.s));
      const fit = (pos: number, size: number, avail: number) => (size <= avail ? (avail - size) / 2 : Math.min(0, Math.max(avail - size, pos)));
      return { s, x: fit(v.x, svg.w * s, port.w), y: fit(v.y, svg.h * s, port.h) };
    },
    [svg, port, minScale],
  );

  const fit = useCallback(() => {
    if (!svg || !port.w) return;
    setFitted(true);
    setView(clamp({ s: fitScale, x: 0, y: 0 }));
  }, [svg, port, fitScale, clamp]);

  // viewport size; at the page width the viewport takes the diagram's aspect ratio
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      const ratio = svg ? svg.h / svg.w : 0.64;
      const h = portHeight(el, w, ratio, full);
      setPort((p) => (p.w === w && p.h === h ? p : { w, h }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [svg, full]);

  // keep the fitted view fitted when the viewport changes
  useEffect(() => {
    if (fitted) fit();
    else setView((v) => clamp(v));
  }, [port, svg, fitted, fit, clamp]);

  const zoomAt = useCallback(
    (factor: number, cx?: number, cy?: number) => {
      setFitted(false);
      setView((v) => {
        const px = cx ?? port.w / 2;
        const py = cy ?? port.h / 2;
        const s = Math.min(MAX_SCALE, Math.max(minScale, v.s * factor));
        const k = s / v.s;
        return clamp({ s, x: px - (px - v.x) * k, y: py - (py - v.y) * k });
      });
    },
    [port, minScale, clamp],
  );

  const actual = useCallback(() => {
    setFitted(false);
    setView((v) => {
      const k = 1 / v.s;
      return clamp({ s: 1, x: port.w / 2 - (port.w / 2 - v.x) * k, y: port.h / 2 - (port.h / 2 - v.y) * k });
    });
  }, [port, clamp]);

  // -------------------------------------------------------------- wheel
  useEffect(() => {
    const el = portRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!(e.ctrlKey || e.metaKey || full)) {
        // let the page scroll, but tell the reader how to zoom
        setHint(true);
        clearTimeout(hintTimer.current);
        hintTimer.current = setTimeout(() => setHint(false), 1400);
        return;
      }
      e.preventDefault();
      const r = el.getBoundingClientRect();
      zoomAt(Math.exp(-e.deltaY * 0.0022), e.clientX - r.left, e.clientY - r.top);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      clearTimeout(hintTimer.current);
    };
  }, [zoomAt, full]);

  // --------------------------------------------------- pointer: pan / pinch
  const startGesture = () => {
    const pts = [...pointers.current.values()];
    gesture.current = { ...centroid(pts), d: spread(pts), v: viewRef.current };
  };
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    startGesture();
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(e.pointerId) || !gesture.current) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const pts = [...pointers.current.values()];
    const c = centroid(pts);
    const g = gesture.current;
    let s = g.v.s;
    if (pts.length > 1 && g.d > 0) {
      s = Math.min(MAX_SCALE, Math.max(minScale, g.v.s * (spread(pts) / g.d)));
    }
    const r = portRef.current?.getBoundingClientRect();
    const ox = r ? g.x - r.left : 0;
    const oy = r ? g.y - r.top : 0;
    const k = s / g.v.s;
    setFitted(false);
    setView(clamp({ s, x: ox - (ox - g.v.x) * k + (c.x - g.x), y: oy - (oy - g.v.y) * k + (c.y - g.y) }));
  };
  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size) startGesture();
    else gesture.current = null;
  };

  // ------------------------------------------------------------ keyboard
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    // leave browser shortcuts alone (Ctrl/⌘ + zoom, Alt + arrow history)
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const pan = 80;
    const keys: Record<string, () => void> = {
      '+': () => zoomAt(STEP),
      '=': () => zoomAt(STEP),
      '-': () => zoomAt(1 / STEP),
      '0': fit,
      '1': actual,
      ArrowLeft: () => setView((v) => clamp({ ...v, x: v.x + pan })),
      ArrowRight: () => setView((v) => clamp({ ...v, x: v.x - pan })),
      ArrowUp: () => setView((v) => clamp({ ...v, y: v.y + pan })),
      ArrowDown: () => setView((v) => clamp({ ...v, y: v.y - pan })),
    };
    const act = keys[e.key];
    if (act) {
      e.preventDefault();
      if (e.key.startsWith('Arrow')) setFitted(false);
      act();
    }
  };

  // ----------------------------------------------------------- full screen
  const toggleFull = () => {
    const el = rootRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else if (el.requestFullscreen && !full) {
      el.requestFullscreen().catch(() => setFull(true));
    } else {
      setFull((f) => !f); // no Fullscreen API (iOS): cover the window instead
    }
  };
  useEffect(() => {
    const onChange = () => setFull(document.fullscreenElement === rootRef.current);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);
  useEffect(() => {
    setFitted(true);
  }, [full]);

  // ---------------------------------------------------------------- search
  // a query the overview cannot answer (a parameter, a block inside a module) switches
  // to the detailed drawing and searches again there
  const findNext = (backwards = false) => {
    const root = stageRef.current?.querySelector('svg');
    const q = query.trim().toLowerCase();
    root?.querySelector('[data-search-hit]')?.remove();
    if (!root || !q) {
      setHit(null);
      return;
    }
    const all = findTexts(root, q);
    if (!all.length && detail === 'simplified' && hasOverview) {
      chooseDetail('detailed');
      pendingSearch.current = true; // after chooseDetail, which clears it
      return;
    }
    if (!all.length) {
      setHit({ n: 0, of: 0 });
      return;
    }
    matchIndex.current = (matchIndex.current + (backwards ? -1 : 1) + all.length) % all.length;
    const t = all[matchIndex.current];
    if (t.closest('[data-layer="parameters"]') && params === 'off') setParams('on');
    const b = t.getBBox();
    markHit(root, b);
    const s = Math.max(viewRef.current.s, 1.1);
    setFitted(false);
    setView(clamp({ s, x: port.w / 2 - (b.x + b.width / 2) * s, y: port.h / 2 - (b.y + b.height / 2) * s }));
    setHit({ n: matchIndex.current + 1, of: all.length });
  };
  // re-run a search that had to switch the level of detail, once the new layers are on screen
  useEffect(() => {
    if (!pendingSearch.current || !stageRef.current?.querySelector('svg') || !svgs[url]) return;
    pendingSearch.current = false;
    findNext();
  });

  // screen readers hear the zoom once it settles, not every wheel or pinch step;
  // the initial fit on page load stays silent
  const [spokenZoom, setSpokenZoom] = useState('');
  useEffect(() => {
    if (fitted && !spokenZoom) return;
    const t = setTimeout(() => setSpokenZoom(`Zoom ${Math.round(view.s * 100)} %`), 500);
    return () => clearTimeout(t);
  }, [view.s, fitted, spokenZoom]);

  // ------------------------------------------------------------- render
  const showParams = params === 'on' || (params === 'auto' && view.s >= PARAM_SCALE);
  const ready = svg && port.w > 0;
  const html = useMemo(() => ({ __html: svg?.html ?? '' }), [svg]);
  // the overview has no parameter captions
  const paramsOff = detail === 'simplified' && hasOverview;

  return (
    <div ref={rootRef} className={`${styles.root} ${full ? styles.full : ''}`}>
      {/* a fieldset (native grouping, named by its hidden legend), not role="toolbar": it has no arrow-key navigation */}
      <fieldset className={styles.toolbar}>
        <legend className={styles.srOnly}>Diagram controls</legend>
        <div className={styles.group}>
          <button type="button" className={styles.icon} onClick={() => zoomAt(1 / STEP)} aria-label="Zoom out" title="Zoom out (−)">
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path d="M3 7h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
          <span className={styles.readout}>{Math.round(view.s * 100)} %</span>
          <span className={styles.srOnly} aria-live="polite">
            {spokenZoom}
          </span>
          <button type="button" className={styles.icon} onClick={() => zoomAt(STEP)} aria-label="Zoom in" title="Zoom in (+)">
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path d="M3 7h8M7 3v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
          <span className={styles.sep} />
          <button type="button" onClick={fit} title="Fit the whole diagram (0)">
            Fit
          </button>
          <button type="button" onClick={actual} title="Actual size (1)">
            1:1
          </button>
        </div>
        {hasOverview && (
          <fieldset className={styles.track}>
            <legend className={styles.srOnly}>Level of detail</legend>
            <button type="button" onClick={() => chooseDetail('simplified')} aria-pressed={detail === 'simplified'} title="One box per module and the connections between them">
              Simplified
            </button>
            <button type="button" onClick={() => chooseDetail('detailed')} aria-pressed={detail === 'detailed'} title="Every block, signal, parameter and note">
              Detailed
            </button>
          </fieldset>
        )}
        <ParamsControl params={params} off={paramsOff} onChange={setParams} />
        <form
          className={`${styles.search} ${hit ? styles.counting : ''}`}
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            findNext();
          }}
        >
          <svg className={styles.searchIcon} width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <circle cx="6" cy="6" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M9.2 9.2L12.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            placeholder="Find block or parameter"
            aria-label="Find a block or parameter in the diagram"
            onChange={(e) => {
              setQuery(e.target.value);
              matchIndex.current = -1;
              setHit(null);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.shiftKey) {
                e.preventDefault();
                findNext(true);
              }
            }}
          />
          {hit && <span className={styles.hits}>{hit.of ? `${hit.n} / ${hit.of}` : 'no match'}</span>}
        </form>
        <span className={styles.spacer} />
        <FullScreenButton full={full} onToggle={toggleFull} />
      </fieldset>
      {/* a pannable canvas: it takes keyboard focus for zoom and pan, pointer and touch drag it.
          role="application" is the ARIA role for exactly this, but jsx-a11y counts it as
          non-interactive, hence the two rules switched off for this element only */}
      {/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */}
      <div
        ref={portRef}
        className={styles.port}
        style={{ height: port.h || undefined }}
        tabIndex={0}
        role="application"
        aria-roledescription="zoomable diagram"
        aria-label={`${alt}. Drag to pan; plus and minus keys zoom, 0 fits, arrow keys pan.`}
        data-params={showParams ? 'show' : 'hide'}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          zoomAt(e.shiftKey ? 1 / STEP : STEP, e.clientX - r.left, e.clientY - r.top);
        }}
        onKeyDown={onKeyDown}
      >
        {/* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */}
        {ready ? (
          <div ref={stageRef} className={styles.stage} style={{ width: svg.w, height: svg.h, transform: `translate(${view.x}px, ${view.y}px) scale(${view.s})` }} dangerouslySetInnerHTML={html} />
        ) : (
          <img className={styles.fallback} src={url} alt={alt} />
        )}
        <div className={`${styles.hint} ${hint ? styles.hintOn : ''}`} aria-hidden="true">
          Ctrl or ⌘ + scroll to zoom
        </div>
      </div>
    </div>
  );
}

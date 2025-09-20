import React, { useMemo } from 'react';

/**
 * PUBLIC_INTERFACE
 * SimpleLineChart
 * Lightweight inline SVG chart that draws lines for revenue, expenses, and profit.
 * Avoids external chart libraries to keep template light.
 */
export default function SimpleLineChart({ labels = [], series = {}, height = 180 }) {
  /** Render minimal line chart with smooth polylines and legend. */
  const width = 640;
  const padding = { t: 12, r: 16, b: 28, l: 32 };

  const { paths, minY, maxY } = useMemo(() => {
    const keys = Object.keys(series);
    const values = keys.flatMap(k => series[k] || []);
    const min = Math.min(...values, 0);
    const max = Math.max(...values, 1);

    const innerW = width - padding.l - padding.r;
    const innerH = height - padding.t - padding.b;
    const xStep = labels.length > 1 ? innerW / (labels.length - 1) : 0;

    const scaleX = (i) => padding.l + i * xStep;
    const scaleY = (v) => padding.t + innerH - ((v - min) / (max - min || 1)) * innerH;

    const toPath = (arr) =>
      (arr || []).map((v, i) => `${i === 0 ? 'M' : 'L'}${scaleX(i)},${scaleY(v)}`).join(' ');

    return {
      paths: Object.fromEntries(keys.map(k => [k, toPath(series[k]) ])),
      minY: min,
      maxY: max
    };
  }, [labels, series, height]);

  const legend = [
    { key: 'revenue', label: 'Revenue', color: 'var(--co-primary)' },
    { key: 'expenses', label: 'Expenses', color: 'var(--co-secondary)' },
    { key: 'profit', label: 'Profit', color: 'var(--co-success)' },
  ].filter(l => series[l.key]);

  return (
    <div className="chart">
      <svg
        className="chart__svg"
        role="img"
        aria-label="Revenue, expenses and profit over time"
        width="100%"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <desc>Y range from {minY} to {maxY}</desc>
        {/* Axes */}
        <line x1={32} y1={12} x2={32} y2={height - 28} stroke="var(--bd-muted)" strokeWidth="1" />
        <line x1={32} y1={height - 28} x2={width - 16} y2={height - 28} stroke="var(--bd-muted)" strokeWidth="1" />

        {/* Paths */}
        {paths.revenue && (
          <path d={paths.revenue} fill="none" stroke="var(--co-primary)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        )}
        {paths.expenses && (
          <path d={paths.expenses} fill="none" stroke="var(--co-secondary)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        )}
        {paths.profit && (
          <path d={paths.profit} fill="none" stroke="var(--co-success)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        )}

        {/* X labels */}
        {labels.map((t, i) => (
          <text key={t + i} x={32 + i * ((width - 48) / Math.max(1, labels.length - 1))} y={height - 10} textAnchor="middle" className="chart__tick">
            {t}
          </text>
        ))}
      </svg>
      <div className="chart__legend" aria-hidden>
        {legend.map(l => (
          <div className="chart__lg" key={l.key}>
            <span className="chart__lg-dot" style={{ background: l.color }} />
            {l.label}
          </div>
        ))}
      </div>
    </div>
  );
}

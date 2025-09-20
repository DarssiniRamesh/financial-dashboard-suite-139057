import React from 'react';
import { fmtCurrency, fmtPercent } from '../data';

/**
 * PUBLIC_INTERFACE
 * CategoryBar
 * Renders a compact bar list visualizing category shares.
 */
export default function CategoryBar({ title, items = [], colorVar = 'var(--co-primary)' }) {
  /** Render bar list with labels, values, and progress bars. */
  return (
    <section className="panel">
      <div className="panel__head">
        <h3 className="panel__title">{title}</h3>
      </div>
      <div className="panel__body">
        <ul className="cat">
          {items.map((it) => (
            <li className="cat__row" key={it.label}>
              <div className="cat__meta">
                <span className="cat__label">{it.label}</span>
                <span className="cat__value">{fmtCurrency(it.value)}</span>
              </div>
              <div className="cat__bar">
                <span className="cat__bar-fill" style={{ width: `${Math.min(100, (it.share || 0) * 100)}%`, background: colorVar }} />
                <span className="cat__bar-text">{fmtPercent(it.share || 0, 1)}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

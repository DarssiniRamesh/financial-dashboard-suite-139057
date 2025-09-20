import React from 'react';
import { fmtCurrency, fmtPercent } from '../data';

/**
 * PUBLIC_INTERFACE
 * SummaryCards
 * Renders grid of summary items and KPIs in Soft Mono style.
 */
export default function SummaryCards({ summary, kpis }) {
  /** Render summary numbers (revenue, expenses, profit) and KPI tiles. */
  if (!summary) return null;
  const items = [
    { label: 'Total Revenue', value: fmtCurrency(summary.totalRevenue) },
    { label: 'Total Expenses', value: fmtCurrency(summary.totalExpenses) },
    { label: 'Profit', value: fmtCurrency(summary.profit) },
    { label: 'Profit Margin', value: fmtPercent(summary.profitMargin, 1) },
    { label: 'Cash on Hand', value: fmtCurrency(summary.cashOnHand) },
    { label: 'Runway', value: `${summary.runwayMonths} months` },
  ];

  return (
    <section className="cards" aria-label="Summary">
      {items.map((it) => (
        <div className="card" key={it.label}>
          <div className="card__label">{it.label}</div>
          <div className="card__value">{it.value}</div>
        </div>
      ))}
      {Array.isArray(kpis) && kpis.map(k => (
        <div className="card card--kpi" key={k.key}>
          <div className="card__label">{k.label}</div>
          <div className="card__value">
            {k.key === 'churn' ? fmtPercent(k.value, 1) : (k.key === 'cac' ? fmtCurrency(k.value) : fmtCurrency(k.value))}
          </div>
          <div className={`card__delta ${k.trend === 'up' ? 'up' : 'down'}`}>
            {k.trend === 'up' ? '▲' : '▼'} {fmtPercent(Math.abs(k.delta), 1)}
          </div>
        </div>
      ))}
    </section>
  );
}

//
// PUBLIC_INTERFACE
// Financial dashboard mock data module.
// Exposes the JSON payload and helpers for formatting and chart-ready series.
//
// Usage:
//   import { data, fmtCurrency, buildSeries } from '../data';
//
// Notes:
// - Do not hard-code env-specific values; this is client-side mock data.
// - When integrating a real API, keep the same shape returned here to minimize refactors.

import raw from './financialMockData.json';

// PUBLIC_INTERFACE
export const data = raw;

/**
 * PUBLIC_INTERFACE
 * fmtCurrency
 * Formats a number as currency respecting a given currency code and locale.
 */
export function fmtCurrency(value, currency = data?.company?.currency || 'USD', locale = 'en-US') {
  /** Formats a numeric value to currency string using Intl. */
  if (value === null || value === undefined || Number.isNaN(Number(value))) return '—';
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(value);
  } catch {
    return `$${Math.round(Number(value)).toLocaleString()}`;
  }
}

/**
 * PUBLIC_INTERFACE
 * fmtPercent
 * Formats a decimal fraction (0.123) as a percentage string (12.3%).
 */
export function fmtPercent(value, digits = 1, locale = 'en-US') {
  /** Formats a numeric fraction to percentage string. */
  if (value === null || value === undefined || Number.isNaN(Number(value))) return '—';
  try {
    return new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: digits }).format(value);
  } catch {
    return `${(Number(value) * 100).toFixed(digits)}%`;
  }
}

/**
 * PUBLIC_INTERFACE
 * buildSeries
 * Returns chart-ready arrays for revenue and expenses time series.
 * opts: { basis: 'monthly' | 'weeklyLast12' }
 */
export function buildSeries(opts = { basis: 'monthly' }) {
  /** Converts raw timeSeries into arrays suitable for chart libs. */
  const basis = opts.basis || 'monthly';
  const ts = data?.timeSeries?.[basis] || [];
  return {
    labels: ts.map(p => p.month || p.week),
    revenue: ts.map(p => p.revenue),
    expenses: ts.map(p => p.expenses),
    profit: ts.map(p => (p.profit !== undefined ? p.profit : (p.revenue ?? 0) - (p.expenses ?? 0)))
  };
}

/**
 * PUBLIC_INTERFACE
 * getCategoryBreakdown
 * Returns arrays of { label, value, share } for revenue or expenses categories.
 */
export function getCategoryBreakdown(kind = 'revenue') {
  /** Returns breakdown for 'revenue' or 'expenses' */
  const list = data?.categoryBreakdown?.[kind] || [];
  return list.map(item => ({
    label: item.category,
    value: item.value,
    share: item.share
  }));
}

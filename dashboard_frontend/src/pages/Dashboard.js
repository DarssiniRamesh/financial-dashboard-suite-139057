import React, { useMemo } from 'react';
import { data, buildSeries, getCategoryBreakdown } from '../data';
import SummaryCards from '../components/SummaryCards';
import SimpleLineChart from '../components/SimpleLineChart';
import CategoryBar from '../components/CategoryBar';
import TransactionsList from '../components/TransactionsList';

/**
 * PUBLIC_INTERFACE
 * Dashboard page for Soft Mono financial overview.
 * Composes summary, charts, categories, and transactions from mock data.
 */
export default function Dashboard() {
  /** Build chart series and category lists from mock data. */
  const monthly = useMemo(() => buildSeries({ basis: 'monthly' }), []);
  const weekly = useMemo(() => buildSeries({ basis: 'weeklyLast12' }), []);
  const revCats = useMemo(() => getCategoryBreakdown('revenue'), []);
  const expCats = useMemo(() => getCategoryBreakdown('expenses'), []);

  return (
    <main className="main">
      <div className="grid grid--summary">
        <SummaryCards summary={data.summary} kpis={data.kpis} />
      </div>

      <div className="grid grid--charts">
        <section className="panel panel--wide">
          <div className="panel__head">
            <h3 className="panel__title">Monthly Performance</h3>
            <div className="panel__meta">FY {data.company.fiscalYear}</div>
          </div>
          <div className="panel__body">
            <SimpleLineChart labels={monthly.labels} series={{ revenue: monthly.revenue, expenses: monthly.expenses, profit: monthly.profit }} height={200} />
          </div>
        </section>

        <section className="panel">
          <div className="panel__head">
            <h3 className="panel__title">Last 12 Weeks</h3>
          </div>
          <div className="panel__body">
            <SimpleLineChart labels={weekly.labels} series={{ revenue: weekly.revenue, expenses: weekly.expenses }} height={160} />
          </div>
        </section>

        <CategoryBar title="Revenue Breakdown" items={revCats} colorVar="var(--co-primary)" />
        <CategoryBar title="Expense Breakdown" items={expCats} colorVar="var(--co-secondary)" />
      </div>

      <div className="grid grid--list">
        <TransactionsList transactions={data.recentTransactions} />
      </div>
    </main>
  );
}

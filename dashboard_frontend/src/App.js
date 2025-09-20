import React, { useMemo, useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import { data } from './data';

/**
 * PUBLIC_INTERFACE
 * App
 * Soft Mono themed financial dashboard shell with sidebar, header, and main content.
 */
function App() {
  /** Render app shell and embed the Dashboard page. */
  const handleExport = () => {
    // In a real app, implement CSV/JSON export. For mock, just notify.
    // eslint-disable-next-line no-alert
    alert('Export initiated (mock).');
  };

  // Define sidebar items and simple client-side page state
  const navItems = useMemo(() => ([
    // Main
    { key: 'dashboard', label: 'Dashboard', section: 'main' },
    { key: 'reports', label: 'Reports', section: 'insights' },
    { key: 'analytics', label: 'Analytics', section: 'insights' },
    { key: 'customers', label: 'Customers', section: 'insights' },
    // Settings
    { key: 'settings', label: 'Settings', section: 'settings' },
    { key: 'billing', label: 'Billing', section: 'settings' },
    { key: 'preferences', label: 'Preferences', section: 'settings' },
  ]), []);

  const [active, setActive] = useState('dashboard');

  // Derive title/subtitle based on active section
  const headerMeta = useMemo(() => {
    switch (active) {
      case 'reports':
        return { title: 'Reports', subtitle: 'Generate and review financial reports' };
      case 'analytics':
        return { title: 'Analytics', subtitle: 'Deep-dive KPIs and time series insights' };
      case 'customers':
        return { title: 'Customers', subtitle: 'Top customers and cohort insights' };
      case 'settings':
        return { title: 'Settings', subtitle: 'Workspace and organization configuration' };
      case 'billing':
        return { title: 'Billing', subtitle: 'Plans, invoices, and payment methods' };
      case 'preferences':
        return { title: 'Preferences', subtitle: 'Personalization and display options' };
      case 'dashboard':
      default:
        return { title: 'Financial Overview', subtitle: "Company performance snapshot" };
    }
  }, [active]);

  // Placeholder content panels for non-dashboard sections
  const Panel = ({ title, children, meta }) => (
    <main className="main">
      <section className="panel">
        <div className="panel__head">
          <h3 className="panel__title">{title}</h3>
          {meta ? <div className="panel__meta">{meta}</div> : null}
        </div>
        <div className="panel__body">
          {children}
        </div>
      </section>
    </main>
  );

  const renderContent = () => {
    if (active === 'dashboard') return <Dashboard />;

    if (active === 'reports') {
      return (
        <Panel title="Reports" meta={`Last updated ${new Date(data.company.lastUpdated).toLocaleDateString()}`}>
          <p>Access monthly, quarterly, and annual financial reports.</p>
          <ul>
            <li>Profit & Loss (P&L)</li>
            <li>Balance Sheet</li>
            <li>Cash Flow Statement</li>
            <li>MRR/ARR Summary</li>
          </ul>
          <button className="btn btn--ghost" type="button">Create Report</button>
        </Panel>
      );
    }

    if (active === 'analytics') {
      return (
        <Panel title="Analytics" meta={`FY ${data.company.fiscalYear}`}>
          <p>Explore KPI trends and compare scenarios.</p>
          <div className="grid grid--summary">
            <div className="card">
              <div className="card__label">Gross Margin Target</div>
              <div className="card__value">{Math.round((data.targets.grossMarginTarget || 0) * 100)}%</div>
            </div>
            <div className="card">
              <div className="card__label">Monthly Revenue Target</div>
              <div className="card__value">${(data.targets.monthlyRevenueTarget || 0).toLocaleString()}</div>
            </div>
            <div className="card">
              <div className="card__label">Expense Budget</div>
              <div className="card__value">${(data.targets.monthlyExpenseBudget || 0).toLocaleString()}</div>
            </div>
          </div>
          <p style={{ color: 'var(--co-secondary)', marginTop: 8 }}>Detailed analytics visualizations would appear here.</p>
        </Panel>
      );
    }

    if (active === 'customers') {
      return (
        <Panel title="Customers" meta={`${data.topCustomers.length} top accounts`}>
          <div className="grid grid--list">
            <section className="panel">
              <div className="panel__head">
                <h3 className="panel__title">Top Customers</h3>
              </div>
              <div className="panel__body">
                <ul className="tx">
                  {data.topCustomers.map(c => (
                    <li key={c.name} className="tx__row">
                      <div>
                        <div className="tx__cp">{c.name}</div>
                        <div className="tx__sub">
                          <span>ARR: ${c.arr.toLocaleString()}</span>
                          <span>MRR: ${c.mrr.toLocaleString()}</span>
                          <span>Since: {new Date(c.since).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="tx__amount pos">${c.arr.toLocaleString()}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        </Panel>
      );
    }

    if (active === 'settings') {
      return (
        <Panel title="Settings">
          <p>Manage organization settings, access control, and integrations.</p>
          <ul>
            <li>Organization Profile</li>
            <li>Team & Roles</li>
            <li>Integrations (Accounting, CRM)</li>
            <li>Security</li>
          </ul>
        </Panel>
      );
    }

    if (active === 'billing') {
      return (
        <Panel title="Billing">
          <p>View plan details, invoices, and payment methods.</p>
          <ul>
            <li>Current Plan: Professional</li>
            <li>Next Invoice: ${Math.round(data.kpis.find(k => k.key === 'mrr')?.value || 0).toLocaleString()}</li>
          </ul>
          <button className="btn" type="button">Update Payment Method</button>
        </Panel>
      );
    }

    if (active === 'preferences') {
      return (
        <Panel title="Preferences">
          <p>Adjust theme, density, and data display options.</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn--ghost" type="button">Light</button>
            <button className="btn btn--ghost" type="button">System</button>
          </div>
        </Panel>
      );
    }

    return <Dashboard />;
  };

  return (
    <div className="App">
      <Sidebar items={navItems} active={active} onSelect={setActive} />
      <Header title={headerMeta.title} subtitle={headerMeta.subtitle} onExport={handleExport} />
      {renderContent()}
    </div>
  );
}

export default App;

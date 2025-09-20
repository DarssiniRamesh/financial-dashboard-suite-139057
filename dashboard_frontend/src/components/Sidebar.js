import React from 'react';

/**
 * Sidebar component for navigation in Soft Mono style.
 * Minimal links (non-functional placeholders for now).
 */
// PUBLIC_INTERFACE
export default function Sidebar() {
  /** Render left sidebar navigation with app identity and sections. */
  return (
    <aside className="sb">
      <div className="sb__brand">
        <div className="sb__logo" aria-hidden />
        <div className="sb__title">
          <div className="sb__title-main">Acme Finance</div>
          <div className="sb__title-sub">Dashboard</div>
        </div>
      </div>

      <nav className="sb__nav" aria-label="Primary">
        <a className="sb__link sb__link--active" href="#dashboard">Overview</a>
        <a className="sb__link" href="#revenue">Revenue</a>
        <a className="sb__link" href="#expenses">Expenses</a>
        <a className="sb__link" href="#customers">Customers</a>
        <a className="sb__link" href="#reports">Reports</a>
        <div className="sb__section">Settings</div>
        <a className="sb__link" href="#preferences">Preferences</a>
        <a className="sb__link" href="#billing">Billing</a>
      </nav>

      <div className="sb__foot">
        <div className="sb__foot-note">Soft Mono</div>
        <div className="sb__foot-version">v1.0</div>
      </div>
    </aside>
  );
}

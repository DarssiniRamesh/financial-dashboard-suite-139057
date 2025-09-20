import React from 'react';

/**
 * Top header with title, search input, and action buttons in Soft Mono look.
 */
// PUBLIC_INTERFACE
export default function Header({ title = 'Financial Overview', subtitle = 'Company performance snapshot', onExport }) {
  /** Render app header with breadcrumb, search, and export action. */
  return (
    <header className="hd">
      <div className="hd__left">
        <div className="hd__titles">
          <h1 className="hd__title">{title}</h1>
          <p className="hd__subtitle">{subtitle}</p>
        </div>
      </div>
      <div className="hd__right">
        <div className="hd__search">
          <span className="hd__search-icon" aria-hidden>🔎</span>
          <input className="hd__search-input" placeholder="Search…" aria-label="Search" />
        </div>
        <button className="btn btn--ghost" type="button">Download</button>
        <button className="btn" type="button" onClick={onExport}>Export</button>
      </div>
    </header>
  );
}

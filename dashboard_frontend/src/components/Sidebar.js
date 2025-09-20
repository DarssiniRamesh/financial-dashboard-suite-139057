import React from 'react';

/**
 * Sidebar component for navigation in Soft Mono style.
 * Renders sections and items and notifies selection.
 */
// PUBLIC_INTERFACE
export default function Sidebar({ items = [], active = '', onSelect = () => {} }) {
  /** Render left sidebar navigation with app identity and sections. */
  const handleClick = (key, e) => {
    e.preventDefault();
    onSelect(key);
  };

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
        {items.filter(i => i.section === 'main').map(it => (
          <a
            key={it.key}
            className={`sb__link ${active === it.key ? 'sb__link--active' : ''}`}
            href={`#${it.key}`}
            onClick={(e) => handleClick(it.key, e)}
          >
            {it.label}
          </a>
        ))}

        <div className="sb__section">Insights</div>
        {items.filter(i => i.section === 'insights').map(it => (
          <a
            key={it.key}
            className={`sb__link ${active === it.key ? 'sb__link--active' : ''}`}
            href={`#${it.key}`}
            onClick={(e) => handleClick(it.key, e)}
          >
            {it.label}
          </a>
        ))}

        <div className="sb__section">Settings</div>
        {items.filter(i => i.section === 'settings').map(it => (
          <a
            key={it.key}
            className={`sb__link ${active === it.key ? 'sb__link--active' : ''}`}
            href={`#${it.key}`}
            onClick={(e) => handleClick(it.key, e)}
          >
            {it.label}
          </a>
        ))}
      </nav>

      <div className="sb__foot">
        <div className="sb__foot-note">Soft Mono</div>
        <div className="sb__foot-version">v1.0</div>
      </div>
    </aside>
  );
}

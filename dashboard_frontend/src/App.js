import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';

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

  return (
    <div className="App">
      <Sidebar />
      <Header onExport={handleExport} />
      <Dashboard />
    </div>
  );
}

export default App;

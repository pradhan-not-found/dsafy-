import React from 'react';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';

export function AppShell({ children, showSidebar = true }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden" style={{ background: 'var(--app-canvas)' }}>
      {showSidebar && <Sidebar />}

      <div
        className="relative flex flex-col flex-1 min-h-0 overflow-hidden"
        style={{ marginLeft: showSidebar ? 'var(--sidebar-w)' : '0' }}
      >
        {/* Top bar */}
        <header
          className="h-11 shrink-0 flex items-center justify-end px-5"
          style={{
            background: 'var(--app-canvas)',
            borderBottom: '1px solid var(--app-hairline)',
          }}
        >
          <Navbar />
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto" style={{ background: 'var(--app-canvas)' }}>
          {children}
        </main>
      </div>
    </div>
  );
}

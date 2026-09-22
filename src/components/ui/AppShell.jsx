import React from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';

export function AppShell({ children, showSidebar = true }) {
  return (
    <div className="bg-gray-50 text-[var(--app-ink)] antialiased h-svh w-screen flex overflow-hidden">
      {showSidebar && <Sidebar />}
      
      <div className={`relative flex-1 flex flex-col min-h-0 no-scrollbar overflow-hidden transition-all ${showSidebar ? 'ml-64' : ''}`}>
        {/* Ambient accent backdrop tone */}
        <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-gray-200/50 to-transparent pointer-events-none z-0" />
        
        {/* Custom title bar — draggable region with window chrome */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-2 bg-transparent px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Navbar />
          </div>
        </header>
        
        <div className="flex-1 min-h-0 relative z-10 overflow-hidden flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}

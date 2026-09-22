import { Link, useLocation } from 'react-router-dom';
import { Home, List, Code2, LineChart, LogOut, ChevronUp } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { name: 'Dashboard', path: '/', icon: <Home size={18} /> },
    { name: 'Tracks', path: '/tracks', icon: <List size={18} /> },
    { name: 'Problems', path: '/problems', icon: <Code2 size={18} /> },
    { name: 'Progress', path: '/progress', icon: <LineChart size={18} /> },
  ];

  return (
    <div className="w-64 bg-transparent border-r-0 flex flex-col h-full z-40 fixed left-0 top-0 bottom-0 py-4 px-3">
      {/* Logo */}
      <div className="flex items-center gap-3 px-2 mb-8 mt-2">
        <div className="size-9 rounded-xl bg-black flex items-center justify-center shrink-0">
          <Code2 className="size-5 text-white" />
        </div>
        <div className="flex flex-col leading-[1.1]">
          <span className="text-lg font-semibold tracking-tight text-[var(--app-ink)]">DSAfy</span>
        </div>
      </div>

      {/* Nav Links */}
      <div className="flex flex-col gap-1 flex-1">
        {links.map(link => {
          const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
          return (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "rounded-xl transition-all duration-200 py-2.5 px-3 flex items-center gap-3 font-medium text-sm tracking-tight",
                isActive 
                  ? "bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] border border-[var(--app-hairline)] text-[var(--app-ink)] font-semibold"
                  : "text-[var(--app-muted)] hover:bg-[var(--app-soft)]/50 hover:text-[var(--app-ink)] border border-transparent"
              )}
            >
              <div className="shrink-0">{link.icon}</div>
              <span>{link.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer Profile */}
      <div className="mt-auto pt-4 pb-2">
        <button
          className={cn(
            "liquid-card-shell group flex items-center gap-3 rounded-xl p-2 transition-all w-full text-left"
          )}
        >
          {/* Avatar */}
          <div className="size-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0 overflow-hidden text-gray-500 font-bold">
            C
          </div>

          {/* Name */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[var(--app-ink)] truncate">Coder</p>
            <p className="text-[11px] text-[var(--app-muted)] truncate">Level 1 - Novice</p>
          </div>

          <ChevronUp className="size-4 text-[var(--app-muted)] mr-1" />
        </button>
      </div>
    </div>
  );
}

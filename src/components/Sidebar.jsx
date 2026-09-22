import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Code2, BarChart2, ChevronUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TRACKS, getTotalProblems } from '../data/tracks';
import { getProblemsByTrack } from '../data/problems';

const NAV = [
  { label: 'Dashboard', path: '/',         icon: LayoutDashboard },
  { label: 'Tracks',    path: '/tracks',   icon: BookOpen },
  { label: 'Problems',  path: '/problems', icon: Code2 },
  { label: 'Progress',  path: '/progress', icon: BarChart2 },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  const { getStatus, getLevel, xp } = useApp();
  const { level, title, next } = getLevel();
  const xpPct = next === Infinity ? 100 : Math.round((xp / next) * 100);

  return (
    <aside
      className="fixed inset-y-0 left-0 flex flex-col"
      style={{
        width: 'var(--sidebar-w)',
        background: 'var(--app-canvas)',
        borderRight: '1px solid var(--app-hairline)',
        zIndex: 40,
      }}
    >
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-4 py-5 shrink-0">
        <div
          className="size-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: 'var(--app-ink)' }}
        >
          <Code2 size={16} color="#fff" />
        </div>
        <span style={{ fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.03em', color: 'var(--app-ink)' }}>
          DSAfy
        </span>
      </div>

      {/* Nav links */}
      <nav className="flex-1 flex flex-col gap-0.5 px-3 overflow-y-auto">
        <p className="label px-2 mb-2 mt-1">Navigation</p>
        {NAV.map(({ label, path, icon: Icon }) => {
          const active = path === '/' ? pathname === '/' : pathname.startsWith(path);
          return (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${active ? 'nav-active' : 'nav-idle'}`}
            >
              <Icon size={15} style={{ flexShrink: 0 }} />
              {label}
            </Link>
          );
        })}

        {/* Track Progress */}
        <p className="label px-2 mt-5 mb-2">Track Progress</p>
        <div className="flex flex-col gap-3 px-1">
          {TRACKS.map(track => {
            const probs = getProblemsByTrack(track.id);
            const s = probs.filter(p => getStatus(p.id) === 'solved').length;
            const pct = probs.length ? Math.round((s / probs.length) * 100) : 0;
            return (
              <Link key={track.id} to={`/tracks/${track.id}`} className="group">
                <div className="flex justify-between items-center mb-1">
                  <span
                    className="text-[11px] font-medium truncate group-hover:opacity-100"
                    style={{ color: 'var(--app-muted)', maxWidth: '140px' }}
                  >
                    {track.title}
                  </span>
                  <span className="text-[10px] font-semibold" style={{ color: 'var(--app-subtle)' }}>{pct}%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer: XP Level */}
      <div className="shrink-0 px-3 pb-4 pt-3" style={{ borderTop: '1px solid var(--app-hairline)' }}>
        <div className="px-2 py-2 rounded-lg" style={{ background: 'var(--app-soft)' }}>
          <div className="flex justify-between items-center mb-1.5">
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--app-ink)' }}>
              Lv. {level} — {title}
            </span>
            <span className="label" style={{ letterSpacing: '0' }}>{xp} XP</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${xpPct}%` }} />
          </div>
        </div>
      </div>
    </aside>
  );
}

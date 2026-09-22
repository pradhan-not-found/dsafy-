import { NavLink, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { LayoutDashboard, BookOpen, BarChart3, Zap, Flame, Code2 } from 'lucide-react';

export default function Navbar() {
  const { xp, streak, getLevel } = useApp();
  const { level, title } = getLevel();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <div className="navbar-brand-icon">
          <Code2 size={18} color="white" />
        </div>
        <span className="gradient-text">DSAfy</span>
      </Link>

      <div className="navbar-nav">
        <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={15} />
          Dashboard
        </NavLink>
        <NavLink to="/tracks" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <BookOpen size={15} />
          Tracks
        </NavLink>
        <NavLink to="/problems" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Zap size={15} />
          Problems
        </NavLink>
        <NavLink to="/progress" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <BarChart3 size={15} />
          Progress
        </NavLink>
      </div>

      <div className="navbar-right">
        <div className="streak-badge">
          <Flame size={13} />
          {streak}d
        </div>
        <div className="xp-badge">
          <span>⚡</span>
          {xp} XP
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '6px 14px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-full)',
          fontSize: 'var(--text-xs)',
          fontWeight: 700,
          color: 'var(--brand-primary-light)',
        }}>
          Lv.{level} {title}
        </div>
      </div>
    </nav>
  );
}

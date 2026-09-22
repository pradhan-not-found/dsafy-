import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { TRACKS } from '../data/tracks';
import { getProblemsByTrack } from '../data/problems';

export default function Sidebar() {
  const { getStatus } = useApp();

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-section-title">DSA Tracks</div>
        {TRACKS.map(track => {
          const problems = getProblemsByTrack(track.id);
          const solvedCount = problems.filter(p => getStatus(p.id) === 'solved').length;
          return (
            <NavLink
              key={track.id}
              to={`/tracks/${track.id}`}
              className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
            >
              <div className="sidebar-item-icon" style={{ color: track.color, transform: 'scale(0.8)' }}>{track.icon}</div>
              <span style={{ flex: 1, fontSize: 'var(--text-xs)', fontWeight: 500 }}>{track.title}</span>
              <span className="sidebar-item-count">{solvedCount}/{track.totalProblems}</span>
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
}

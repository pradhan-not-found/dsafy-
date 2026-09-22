import { Link } from 'react-router-dom';
import { TRACKS } from '../data/tracks';
import { getProblemsByTrack } from '../data/problems';
import { useApp } from '../context/AppContext';
import ProgressBar from '../components/ProgressBar';
import { Clock, Layers, ArrowRight, Lock } from 'lucide-react';

export default function Tracks() {
  const { getStatus } = useApp();

  const difficultyOrder = { 'Beginner': 0, 'Beginner-Intermediate': 1, 'Intermediate': 2, 'Advanced': 3 };

  return (
    <div className="animate-fade-in">
      <div className="mb-xl">
        <h1 className="page-title">Learning Tracks</h1>
        <p className="page-subtitle">Master DSA step by step — from arrays to advanced graphs and dynamic programming.</p>
      </div>

      {/* Difficulty Groups */}
      {['Beginner', 'Beginner-Intermediate', 'Intermediate', 'Advanced'].map(diff => {
        const group = TRACKS.filter(t => t.difficulty === diff);
        if (!group.length) return null;
        return (
          <div key={diff} className="mb-xl">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <h2 className="section-title">{diff}</h2>
              <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontWeight: 600 }}>
                {group.length} tracks
              </span>
            </div>
            <div className="tracks-grid">
              {group.map((track, i) => {
                const problems = getProblemsByTrack(track.id);
                const s = problems.filter(p => getStatus(p.id) === 'solved').length;
                const pct = problems.length ? Math.round((s / problems.length) * 100) : 0;
                const started = s > 0;
                const completed = pct === 100;

                return (
                  <Link
                    key={track.id}
                    to={`/tracks/${track.id}`}
                    className={`track-card animate-fade-in stagger-${(i % 5) + 1}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                      background: `linear-gradient(90deg, ${track.color}, ${track.color}66)`,
                      opacity: started ? 1 : 0.3,
                    }} />

                    {completed && (
                      <div style={{
                        position: 'absolute', top: 12, right: 12,
                        background: 'var(--diff-easy-bg)', color: 'var(--diff-easy)',
                        borderRadius: 'var(--radius-full)', padding: '2px 8px',
                        fontSize: 'var(--text-xs)', fontWeight: 700,
                      }}>✓ Complete</div>
                    )}

                    <span className="track-card-icon">{track.icon}</span>
                    <div className="track-card-title">{track.title}</div>
                    <div className="track-card-desc">{track.description}</div>

                    <div className="track-card-stats">
                      <span className="track-stat">
                        <Layers size={11} />
                        {track.modules.length} modules
                      </span>
                      <span className="track-stat">
                        <Clock size={11} />
                        ~{track.estimatedHours}h
                      </span>
                      <span className="track-stat" style={{ marginLeft: 'auto' }}>
                        {s}/{problems.length} solved
                      </span>
                    </div>

                    <ProgressBar value={pct} color={track.color} className="thin" />

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: '0.75rem' }}>
                      {track.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

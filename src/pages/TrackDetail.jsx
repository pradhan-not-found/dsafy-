import { useParams, Link } from 'react-router-dom';
import { getTrackById } from '../data/tracks';
import { getProblemsByModule, getProblemsByTrack } from '../data/problems';
import { useApp } from '../context/AppContext';
import ProgressBar from '../components/ProgressBar';
import DifficultyBadge from '../components/DifficultyBadge';
import StatusIcon from '../components/StatusIcon';
import { ArrowLeft, Clock, Layers, CheckCircle2, Lock, ChevronRight, BookOpen } from 'lucide-react';

export default function TrackDetail() {
  const { trackId } = useParams();
  const track = getTrackById(trackId);
  const { getStatus } = useApp();

  if (!track) return (
    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
      Track not found. <Link to="/tracks" className="btn btn-ghost">Go back</Link>
    </div>
  );

  const allTrackProblems = getProblemsByTrack(trackId);
  const solvedCount = allTrackProblems.filter(p => getStatus(p.id) === 'solved').length;
  const pct = allTrackProblems.length ? Math.round((solvedCount / allTrackProblems.length) * 100) : 0;

  return (
    <div className="animate-fade-in">
      {/* Back */}
      <Link to="/tracks" className="btn btn-ghost btn-sm mb-lg" style={{ display: 'inline-flex' }}>
        <ArrowLeft size={14} /> Back to Tracks
      </Link>

      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${track.colorDim} 0%, transparent 60%)`,
        border: '1px solid var(--border-subtle)',
        borderTop: `3px solid ${track.color}`,
        borderRadius: 'var(--radius-xl)',
        padding: '2rem',
        marginBottom: '2rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, background: `radial-gradient(circle, ${track.color}20 0%, transparent 70%)`, borderRadius: '50%' }} />
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '3rem' }}>{track.icon}</span>
          <div style={{ flex: 1 }}>
            <h1 className="page-title">{track.title}</h1>
            <p className="page-subtitle">{track.description}</p>
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                <Layers size={14} /> {track.modules.length} modules
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                <Clock size={14} /> ~{track.estimatedHours} hours
              </span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                {solvedCount}/{allTrackProblems.length} problems solved
              </span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: track.color }}>{pct}%</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>Complete</div>
          </div>
        </div>
        <div style={{ marginTop: '1.5rem' }}>
          <ProgressBar value={pct} color={track.color} />
        </div>
      </div>

      {/* Modules */}
      <h2 className="section-title mb-lg">Modules</h2>
      <div className="modules-list">
        {track.modules.map((mod, idx) => {
          const modProblems = mod.problems.map(id => {
            // Find problem from data
            return { id, status: getStatus(id) };
          });
          const modSolved = modProblems.filter(p => p.status === 'solved').length;
          const modPct = modProblems.length ? Math.round((modSolved / modProblems.length) * 100) : 0;
          const isCompleted = modPct === 100;

          // Load full problem data
          const fullProblems = getProblemsByModule(mod.id);

          return (
            <div
              key={mod.id}
              className={`module-card animate-fade-in stagger-${idx + 1}`}
            >
              <div className="module-card-header">
                <div className={`module-number ${isCompleted ? 'completed' : ''}`}>
                  {isCompleted ? <CheckCircle2 size={18} /> : idx + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div className="module-title">{mod.title}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 2 }}>
                    {modSolved}/{modProblems.length} solved
                  </div>
                </div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: track.color }}>{modPct}%</div>
              </div>

              <p className="module-desc">{mod.description}</p>

              {mod.tutorial && (
                <details style={{ marginBottom: '1rem' }}>
                  <summary style={{ cursor: 'pointer', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--brand-primary)', listStyle: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem', userSelect: 'none' }}>
                    <BookOpen size={14} /> View Topic Tutorial
                  </summary>
                  <div style={{ marginTop: '0.75rem', padding: '1rem', background: 'var(--bg-input)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                    {mod.tutorial.split('\n').map((line, i) => {
                      if (line.startsWith('### ')) return <h3 key={i} style={{ marginTop: i === 0 ? 0 : '1rem', marginBottom: '0.5rem', fontSize: '1.05rem', color: 'var(--text-primary)' }}>{line.replace('### ', '')}</h3>;
                      if (line.startsWith('- **')) return <li key={i} style={{ marginLeft: '1rem', marginBottom: '0.25rem' }} dangerouslySetInnerHTML={{ __html: line.substring(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
                      if (line.startsWith('- ')) return <li key={i} style={{ marginLeft: '1rem', marginBottom: '0.25rem' }}>{line.substring(2)}</li>;
                      if (line.match(/^\d+\.\s\*\*/)) return <li key={i} style={{ marginLeft: '1rem', listStyleType: 'decimal', marginBottom: '0.25rem' }} dangerouslySetInnerHTML={{ __html: line.replace(/^\d+\.\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
                      if (line.startsWith('`') && line.endsWith('`')) return <code key={i} style={{ background: 'var(--bg-card)', padding: '2px 4px', borderRadius: 4, fontFamily: 'var(--font-mono)' }}>{line.slice(1, -1)}</code>;
                      return line.trim() ? <p key={i} style={{ marginBottom: '0.5rem' }} dangerouslySetInnerHTML={{ __html: line.replace(/`([^`]+)`/g, '<code style="background:var(--bg-card);padding:2px 4px;border-radius:4px;font-family:var(--font-mono)">$1</code>') }} /> : null;
                    })}
                  </div>
                </details>
              )}

              <ProgressBar value={modPct} color={track.color} className="thin" />

              {/* Problem list for this module */}
              {fullProblems.length > 0 && (
                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {fullProblems.map(p => (
                    <Link
                      key={p.id}
                      to={`/problem/${p.id}`}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                        padding: '8px 10px', borderRadius: 'var(--radius-md)',
                        textDecoration: 'none', transition: 'all 0.15s ease',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-input)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <StatusIcon problemId={p.id} />
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', flex: 1 }}>
                        {p.lcId}. {p.title}
                      </span>
                      <DifficultyBadge difficulty={p.difficulty} />
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{p.acceptance}%</span>
                      <ChevronRight size={13} color="var(--text-muted)" />
                    </Link>
                  ))}
                </div>
              )}

              {fullProblems.length === 0 && (
                <div style={{ marginTop: '0.75rem' }}>
                  <div className="module-problems">
                    {mod.problems.map(id => (
                      <Link key={id} to={`/problem/${id}`} className="tag" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                        {id.replace(/-/g, ' ')}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { TRACKS, getTotalProblems } from '../data/tracks';
import { getAllProblems, getProblemsByTrack } from '../data/problems';
import ProgressBar from '../components/ProgressBar';
import DifficultyBadge from '../components/DifficultyBadge';
import StatusIcon from '../components/StatusIcon';
import { ArrowRight, Zap, Trophy, Flame, Target, BookOpen, Code2 } from 'lucide-react';

export default function Home() {
  const { xp, streak, solved, attempted, getStatus, getLevel } = useApp();
  const { level, title, next } = getLevel();
  const allProblems = getAllProblems();
  const totalProblems = getTotalProblems();

  // Recent problems (last 5 attempted or solved)
  const recent = allProblems
    .filter(p => getStatus(p.id) !== 'unsolved')
    .slice(0, 5);

  // Suggested next problems (unsolved Easy first)
  const suggested = allProblems
    .filter(p => getStatus(p.id) === 'unsolved')
    .sort((a, b) => {
      const diff = { Easy: 0, Medium: 1, Hard: 2 };
      return diff[a.difficulty] - diff[b.difficulty];
    })
    .slice(0, 5);

  const levelProgress = next === Infinity ? 100 : Math.round((xp / next) * 100);

  return (
    <div className="animate-fade-in">
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(34,211,238,0.05) 100%)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-xl)',
        padding: '2rem',
        marginBottom: '2rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -60, right: -60,
          width: 240, height: 240,
          background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div className="hero-badge" style={{ display: 'inline-flex', marginBottom: '0.75rem' }}>
              <Zap size={14} /> DSA Practice Platform
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
              Welcome back, <span className="gradient-text">Coder!</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)' }}>
              {solved.length} solved · {attempted.length} attempted · {totalProblems - solved.length - attempted.length} remaining
            </p>
          </div>
          <Link to="/tracks" className="btn btn-primary btn-lg">
            Continue Learning <ArrowRight size={18} />
          </Link>
        </div>

        {/* Level Progress */}
        <div style={{ marginTop: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--brand-primary-light)' }}>
              Level {level} — {title}
            </span>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
              {xp} / {next === Infinity ? '∞' : next} XP
            </span>
          </div>
          <ProgressBar value={levelProgress} />
        </div>
      </div>

      {/* Stats Row */}
      <div className="stats-grid mb-xl">
        {[
          { label: 'Problems Solved', value: solved.length, icon: '✅', color: 'var(--diff-easy)' },
          { label: 'Total XP', value: xp, icon: '⚡', color: 'var(--accent-amber)' },
          { label: 'Day Streak', value: `${streak}🔥`, icon: '🗓️', color: 'var(--accent-rose)' },
          { label: 'Tracks Started', value: TRACKS.filter(t => getProblemsByTrack(t.id).some(p => getStatus(p.id) !== 'unsolved')).length, icon: '📚', color: 'var(--brand-primary-light)' },
          { label: 'Easy Solved', value: allProblems.filter(p => p.difficulty === 'Easy' && getStatus(p.id) === 'solved').length, icon: '🟢', color: 'var(--diff-easy)' },
          { label: 'Medium Solved', value: allProblems.filter(p => p.difficulty === 'Medium' && getStatus(p.id) === 'solved').length, icon: '🟡', color: 'var(--diff-medium)' },
        ].map((s, i) => (
          <div key={i} className={`stat-card animate-fade-in stagger-${i + 1}`}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{s.icon}</div>
            <div className="stat-value" style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}88)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {s.value}
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Tracks Overview */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 className="section-title">
              <BookOpen size={18} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
              Learning Tracks
            </h2>
            <Link to="/tracks" className="btn btn-ghost btn-sm">View all <ArrowRight size={13} /></Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {TRACKS.slice(0, 6).map((track, i) => {
              const trackProblems = getProblemsByTrack(track.id);
              const s = trackProblems.filter(p => getStatus(p.id) === 'solved').length;
              const pct = trackProblems.length ? Math.round((s / trackProblems.length) * 100) : 0;
              return (
                <Link key={track.id} to={`/tracks/${track.id}`} style={{ textDecoration: 'none' }}>
                  <div className={`card animate-fade-in stagger-${i + 1}`} style={{ padding: '0.875rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '1.1rem' }}>{track.icon}</span>
                      <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)', flex: 1 }}>{track.title}</span>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{s}/{track.totalProblems}</span>
                    </div>
                    <ProgressBar value={pct} color={track.color} className="thin" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Next Up & Recent */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Suggested */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 className="section-title">
                <Target size={18} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
                Next Up
              </h2>
              <Link to="/problems" className="btn btn-ghost btn-sm">Browse all <ArrowRight size={13} /></Link>
            </div>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              {suggested.slice(0, 5).map((p, i) => (
                <Link key={p.id} to={`/problem/${p.id}`} className="problem-row">
                  <StatusIcon problemId={p.id} />
                  <div>
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>{p.lcId}. {p.title}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{p.track.replace(/-/g, ' ')}</div>
                  </div>
                  <DifficultyBadge difficulty={p.difficulty} />
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{p.acceptance}%</span>
                </Link>
              ))}
              {suggested.length === 0 && (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  🎉 You've solved everything! Legendary!
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          {recent.length > 0 && (
            <div>
              <h2 className="section-title mb-md">
                <Flame size={18} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
                Recent Activity
              </h2>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                {recent.map((p) => (
                  <Link key={p.id} to={`/problem/${p.id}`} className="problem-row">
                    <StatusIcon problemId={p.id} />
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>{p.lcId}. {p.title}</div>
                    <DifficultyBadge difficulty={p.difficulty} />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

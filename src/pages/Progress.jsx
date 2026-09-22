import { useApp } from '../context/AppContext';
import { useLocation, Link } from 'react-router-dom';
import { TRACKS, getTotalProblems } from '../data/tracks';
import { getAllProblems, getProblemsByTrack } from '../data/problems';
import { LiquidCard } from '../components/ui/LiquidCard';
import { CheckCircle2, AlertCircle, Star, Flame, BarChart2 } from 'lucide-react';

export default function Progress() {
  const { xp, streak, solved, attempted, getStatus, getLevel } = useApp();
  const { level, title, next } = getLevel();
  const totalProblems = getTotalProblems();
  const allProblems = getAllProblems();

  const xpPct = next === Infinity ? 100 : Math.round((xp / next) * 100);

  const diffBreakdown = {
    Easy:   allProblems.filter(p => p.difficulty === 'Easy'   && getStatus(p.id) === 'solved').length,
    Medium: allProblems.filter(p => p.difficulty === 'Medium' && getStatus(p.id) === 'solved').length,
    Hard:   allProblems.filter(p => p.difficulty === 'Hard'   && getStatus(p.id) === 'solved').length,
  };
  const diffTotal = {
    Easy:   allProblems.filter(p => p.difficulty === 'Easy').length,
    Medium: allProblems.filter(p => p.difficulty === 'Medium').length,
    Hard:   allProblems.filter(p => p.difficulty === 'Hard').length,
  };

  return (
    <div className="p-6 max-w-4xl mx-auto flex flex-col gap-6">
      <div>
        <h1 style={{ fontSize: '1.15rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--app-ink)' }}>
          Progress
        </h1>
        <p className="label mt-0.5">Your end-to-end DSA journey</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Solved',    value: solved.length,    icon: <CheckCircle2 size={14} /> },
          { label: 'Attempted', value: attempted.length, icon: <AlertCircle size={14} /> },
          { label: 'Total XP',  value: xp,               icon: <Star size={14} /> },
          { label: 'Streak',    value: `${streak}d`,     icon: <Flame size={14} /> },
        ].map((s, i) => (
          <LiquidCard key={s.label} index={i} className="p-4 flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <span className="label">{s.label}</span>
              <span style={{ color: 'var(--app-subtle)' }}>{s.icon}</span>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.1, color: 'var(--app-ink)' }}>
              {s.value}
            </div>
          </LiquidCard>
        ))}
      </div>

      {/* Level + Difficulty */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* XP Level Card */}
        <LiquidCard index={4} className="p-5">
          <div className="flex justify-between items-center mb-4">
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--app-ink)' }}>Current Level</span>
            <span className="label">Lv. {level}</span>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--app-ink)', marginBottom: '8px' }}>
            {title}
          </div>
          <div className="progress-bar-bg mb-2">
            <div className="progress-bar-fill" style={{ width: `${xpPct}%` }} />
          </div>
          <div className="flex justify-between">
            <span className="label">{xp} XP earned</span>
            <span className="label">{next === Infinity ? 'Max level' : `${next} XP target`}</span>
          </div>
        </LiquidCard>

        {/* Difficulty Breakdown */}
        <LiquidCard index={5} className="p-5">
          <div className="mb-4">
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--app-ink)' }}>By Difficulty</span>
          </div>
          <div className="flex flex-col gap-4">
            {(['Easy', 'Medium', 'Hard']).map(d => {
              const s = diffBreakdown[d];
              const t = diffTotal[d];
              const pct = t ? Math.round((s / t) * 100) : 0;
              return (
                <div key={d}>
                  <div className="flex justify-between mb-1">
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--app-ink)' }}>{d}</span>
                    <span className="label">{s}/{t}</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </LiquidCard>
      </div>

      {/* Per-Track Progress */}
      <LiquidCard index={6} className="p-5">
        <div className="mb-5">
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--app-ink)' }}>Track Progress</span>
        </div>
        <div className="flex flex-col gap-5">
          {TRACKS.map((track, i) => {
            const probs = getProblemsByTrack(track.id);
            const s = probs.filter(p => getStatus(p.id) === 'solved').length;
            const att = probs.filter(p => getStatus(p.id) === 'attempted').length;
            const pct = probs.length ? Math.round((s / probs.length) * 100) : 0;
            return (
              <div key={track.id}>
                <div className="flex justify-between items-center mb-1.5">
                  <Link
                    to={`/tracks/${track.id}`}
                    style={{ fontSize: '12px', fontWeight: 600, color: 'var(--app-ink)' }}
                    className="hover:opacity-70 transition-opacity"
                  >
                    {track.title}
                  </Link>
                  <div className="flex gap-3 items-center">
                    <span className="label">{att} attempted</span>
                    <span className="label">{s}/{probs.length} solved</span>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--app-ink)', minWidth: 30, textAlign: 'right' }}>
                      {pct}%
                    </span>
                  </div>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </LiquidCard>
    </div>
  );
}

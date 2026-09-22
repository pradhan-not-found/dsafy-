import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, AlertCircle, Star, Flame, PlayCircle, Trophy } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TRACKS, getTotalProblems } from '../data/tracks';
import { getAllProblems, getProblemsByTrack } from '../data/problems';
import { LiquidCard } from '../components/ui/LiquidCard';

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function Home() {
  const { xp, streak, solved, attempted, getStatus, getLevel } = useApp();
  const { level, title, next } = getLevel();
  const allProblems = getAllProblems();
  const totalProblems = getTotalProblems();
  const suggested = allProblems.filter(p => getStatus(p.id) === 'unsolved').sort((a, b) => a.lcId - b.lcId).slice(0, 5);

  const stats = [
    { label: 'Solved',   value: solved.length,   sub: `of ${totalProblems} total`,             icon: <CheckCircle2 size={14} /> },
    { label: 'Attempted',value: attempted.length, sub: 'keep going',                            icon: <AlertCircle size={14} /> },
    { label: 'XP',       value: xp,               sub: next === Infinity ? 'max level' : `${next - xp} to next`, icon: <Star size={14} /> },
    { label: 'Streak',   value: streak,           sub: 'days in a row',                         icon: <Flame size={14} /> },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto flex flex-col gap-6">
      {/* Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--app-ink)' }}>
            {greeting()}, Coder
          </h1>
          <p className="label mt-0.5">Lv. {level} — {title}</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <LiquidCard key={s.label} index={i} className="p-4 flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="label">{s.label}</span>
              <span style={{ color: 'var(--app-subtle)' }}>{s.icon}</span>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--app-ink)', lineHeight: 1.1 }}>
              {s.value}
            </div>
            <p style={{ fontSize: '11px', color: 'var(--app-muted)' }}>{s.sub}</p>
          </LiquidCard>
        ))}
      </div>

      {/* Main two-column */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Active tracks */}
        <LiquidCard index={4} className="p-5">
          <div className="flex items-center justify-between mb-4">
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--app-ink)' }}>Active Tracks</span>
            <Link to="/tracks" className="label hover:opacity-70 transition-opacity">View all →</Link>
          </div>
          <div className="flex flex-col gap-4">
            {TRACKS.slice(0, 5).map((track, i) => {
              const probs = getProblemsByTrack(track.id);
              const s = probs.filter(p => getStatus(p.id) === 'solved').length;
              const pct = probs.length ? Math.round((s / probs.length) * 100) : 0;
              return (
                <Link key={track.id} to={`/tracks/${track.id}`} className="group flex items-start gap-3">
                  <div
                    className="size-7 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: 'var(--app-soft)', border: '1px solid var(--app-hairline)' }}
                  >
                    <Trophy size={12} style={{ color: 'var(--app-muted)' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--app-ink)' }} className="truncate">{track.title}</span>
                      <span className="label shrink-0 ml-2">{s}/{track.totalProblems}</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </LiquidCard>

        {/* Suggested next */}
        <LiquidCard index={5} className="p-5">
          <div className="flex items-center justify-between mb-4">
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--app-ink)' }}>Suggested Next</span>
            <Link to="/problems" className="label hover:opacity-70 transition-opacity">Browse all →</Link>
          </div>
          <div className="flex flex-col gap-1">
            {suggested.length === 0
              ? <p style={{ fontSize: '12px', color: 'var(--app-muted)' }}>You've solved everything — impressive!</p>
              : suggested.map((p, i) => (
                <Link
                  key={p.id}
                  to={`/problem/${p.id}`}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg group transition-all"
                  style={{ borderBottom: i < suggested.length - 1 ? '1px solid var(--app-hairline)' : 'none' }}
                >
                  <span
                    className="size-7 flex items-center justify-center rounded shrink-0 font-mono text-[10px] font-bold"
                    style={{ background: 'var(--app-soft)', color: 'var(--app-muted)' }}
                  >
                    {p.lcId}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--app-ink)' }} className="truncate">{p.title}</p>
                    <p style={{ fontSize: '10px', color: 'var(--app-subtle)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {p.difficulty}
                    </p>
                  </div>
                  <PlayCircle size={14} style={{ color: 'var(--app-subtle)', flexShrink: 0 }} />
                </Link>
              ))
            }
          </div>
        </LiquidCard>
      </div>
    </div>
  );
}

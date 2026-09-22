import { Link } from 'react-router-dom';
import { CheckCircle2, AlertCircle, Star, Flame, PlayCircle, Trophy, ChevronRight } from 'lucide-react';
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
    { label: 'Solved',   value: solved.length,   sub: `of ${totalProblems} total`,             icon: <CheckCircle2 size={16} /> },
    { label: 'Attempted',value: attempted.length, sub: 'keep going',                            icon: <AlertCircle size={16} /> },
    { label: 'XP',       value: xp,               sub: next === Infinity ? 'max level' : `${next - xp} to next`, icon: <Star size={16} /> },
    { label: 'Streak',   value: streak,           sub: 'days in a row',                         icon: <Flame size={16} /> },
  ];

  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto flex flex-col gap-6 sm:gap-8 animate-fade-in">
      {/* Greeting */}
      <div className="flex items-center justify-between pb-2 border-b border-[var(--app-hairline)]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--app-ink)]">
            {greeting()}, Coder
          </h1>
          <p className="text-sm font-medium text-[var(--app-muted)] mt-1">Lv. {level} — {title}</p>
        </div>
      </div>

      {/* Stats row */}
      <div>
        <div className="mb-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--app-muted)]">Activity Overview</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <LiquidCard key={s.label} index={i} className="p-5 flex flex-col gap-2">
              <div className="flex items-center justify-between text-[var(--app-muted)] mb-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider">{s.label}</span>
                {s.icon}
              </div>
              <div className="text-3xl font-bold tracking-tighter text-[var(--app-ink)] tabular-nums leading-none">
                {s.value}
              </div>
              <p className="text-xs text-[var(--app-muted)] mt-1 truncate">{s.sub}</p>
            </LiquidCard>
          ))}
        </div>
      </div>

      {/* Main two-column */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Active tracks */}
        <LiquidCard index={4} className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-semibold text-[var(--app-ink)]">Active Tracks</h2>
            <Link to="/tracks" className="text-[10px] font-semibold uppercase tracking-wider text-[var(--app-muted)] hover:text-[var(--app-ink)] transition-colors flex items-center gap-0.5">
              View all <ChevronRight size={14} />
            </Link>
          </div>
          <div className="flex flex-col gap-5">
            {TRACKS.slice(0, 5).map((track) => {
              const probs = getProblemsByTrack(track.id);
              const s = probs.filter(p => getStatus(p.id) === 'solved').length;
              const pct = probs.length ? Math.round((s / probs.length) * 100) : 0;
              return (
                <Link key={track.id} to={`/tracks/${track.id}`} className="group flex items-start gap-3">
                  <div className="size-8 rounded-md bg-[var(--app-soft)] border border-[var(--app-hairline)] flex items-center justify-center shrink-0 mt-0.5">
                    <Trophy size={14} className="text-[var(--app-muted)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-semibold text-[var(--app-ink)] truncate group-hover:underline">{track.title}</span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--app-muted)] shrink-0 ml-2">{s}/{track.totalProblems}</span>
                    </div>
                    <div className="h-1.5 bg-[var(--app-soft)] rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--app-ink)] transition-all duration-700 ease-out" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </LiquidCard>

        {/* Suggested next */}
        <LiquidCard index={5} className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-semibold text-[var(--app-ink)]">Suggested Next</h2>
            <Link to="/problems" className="text-[10px] font-semibold uppercase tracking-wider text-[var(--app-muted)] hover:text-[var(--app-ink)] transition-colors flex items-center gap-0.5">
              Browse all <ChevronRight size={14} />
            </Link>
          </div>
          <div className="flex flex-col rounded-lg border border-[var(--app-hairline)] overflow-hidden">
            {suggested.length === 0
              ? <div className="p-6 text-sm text-[var(--app-muted)] text-center bg-[var(--app-surface)]">You've solved everything — impressive!</div>
              : suggested.map((p, i) => (
                <Link
                  key={p.id}
                  to={`/problem/${p.id}`}
                  className={`flex items-center gap-3 px-4 py-3 bg-[var(--app-surface)] hover:bg-[var(--app-canvas)] transition-colors group ${
                    i < suggested.length - 1 ? 'border-b border-[var(--app-hairline)]' : ''
                  }`}
                >
                  <span className="size-7 flex items-center justify-center rounded bg-[var(--app-soft)] border border-[var(--app-hairline)] shrink-0 font-mono text-[10px] font-bold text-[var(--app-muted)]">
                    {p.lcId}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[var(--app-ink)] truncate group-hover:underline">{p.title}</p>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--app-muted)] mt-0.5">
                      {p.difficulty}
                    </p>
                  </div>
                  <PlayCircle size={16} className="text-[var(--app-muted)] group-hover:text-[var(--app-ink)] transition-colors flex-shrink-0" />
                </Link>
              ))
            }
          </div>
        </LiquidCard>
      </div>
    </div>
  );
}

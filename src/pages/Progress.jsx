import { useApp } from '../context/AppContext';
import { useLocation, Link } from 'react-router-dom';
import { TRACKS, getTotalProblems } from '../data/tracks';
import { getAllProblems, getProblemsByTrack } from '../data/problems';
import { LiquidCard } from '../components/ui/LiquidCard';
import { CheckCircle2, AlertCircle, Star, Flame, BarChart2, ChevronRight } from 'lucide-react';

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
    <div className="p-6 sm:p-8 max-w-5xl mx-auto flex flex-col gap-8 animate-fade-in">
      <div className="border-b border-[var(--app-hairline)] pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--app-ink)]">
          Progress
        </h1>
        <p className="text-sm font-medium text-[var(--app-muted)] mt-1">Your end-to-end DSA journey</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Solved',    value: solved.length,    icon: <CheckCircle2 size={16} /> },
          { label: 'Attempted', value: attempted.length, icon: <AlertCircle size={16} /> },
          { label: 'Total XP',  value: xp,               icon: <Star size={16} /> },
          { label: 'Streak',    value: `${streak}d`,     icon: <Flame size={16} /> },
        ].map((s, i) => (
          <LiquidCard key={s.label} index={i} className="p-5 flex flex-col gap-2">
            <div className="flex justify-between items-center text-[var(--app-muted)]">
              <span className="text-[10px] font-semibold uppercase tracking-wider">{s.label}</span>
              {s.icon}
            </div>
            <div className="text-3xl font-bold tracking-tighter text-[var(--app-ink)] tabular-nums leading-none">
              {s.value}
            </div>
          </LiquidCard>
        ))}
      </div>

      {/* Level + Difficulty */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* XP Level Card */}
        <LiquidCard index={4} className="p-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-semibold text-[var(--app-ink)]">Current Level</span>
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--app-soft)] text-[var(--app-muted)]">Lv. {level}</span>
          </div>
          <div className="text-2xl font-bold tracking-tight text-[var(--app-ink)] mb-3">
            {title}
          </div>
          <div className="h-2 bg-[var(--app-soft)] rounded-full overflow-hidden mb-3">
            <div className="h-full bg-[var(--app-ink)] transition-all duration-700 ease-out" style={{ width: `${xpPct}%` }} />
          </div>
          <div className="flex justify-between text-xs font-semibold text-[var(--app-muted)] uppercase tracking-wider">
            <span>{xp} XP earned</span>
            <span>{next === Infinity ? 'Max level' : `${next} XP target`}</span>
          </div>
        </LiquidCard>

        {/* Difficulty Breakdown */}
        <LiquidCard index={5} className="p-6">
          <div className="mb-6">
            <span className="text-sm font-semibold text-[var(--app-ink)]">By Difficulty</span>
          </div>
          <div className="flex flex-col gap-5">
            {(['Easy', 'Medium', 'Hard']).map(d => {
              const s = diffBreakdown[d];
              const t = diffTotal[d];
              const pct = t ? Math.round((s / t) * 100) : 0;
              return (
                <div key={d}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-xs font-semibold text-[var(--app-ink)]">{d}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--app-muted)]">{s}/{t}</span>
                  </div>
                  <div className="h-1.5 bg-[var(--app-soft)] rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--app-ink)] transition-all duration-700 ease-out" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </LiquidCard>
      </div>

      {/* Per-Track Progress */}
      <LiquidCard index={6} className="p-6">
        <div className="mb-6">
          <span className="text-sm font-semibold text-[var(--app-ink)]">Track Progress</span>
        </div>
        <div className="flex flex-col gap-6">
          {TRACKS.map((track, i) => {
            const probs = getProblemsByTrack(track.id);
            const s = probs.filter(p => getStatus(p.id) === 'solved').length;
            const att = probs.filter(p => getStatus(p.id) === 'attempted').length;
            const pct = probs.length ? Math.round((s / probs.length) * 100) : 0;
            return (
              <div key={track.id} className="group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <Link
                    to={`/tracks/${track.id}`}
                    className="text-sm font-semibold text-[var(--app-ink)] group-hover:underline flex items-center gap-1"
                  >
                    {track.title} <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <div className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-wider text-[var(--app-muted)]">
                    <span>{att} attempted</span>
                    <span>{s}/{probs.length} solved</span>
                    <span className="text-[var(--app-ink)] min-w-[32px] text-right text-xs">
                      {pct}%
                    </span>
                  </div>
                </div>
                <div className="h-1.5 bg-[var(--app-soft)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--app-ink)] transition-all duration-700 ease-out" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </LiquidCard>
    </div>
  );
}

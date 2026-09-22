import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, AlertCircle, Star, Flame, Trophy, PlayCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TRACKS, getTotalProblems } from '../data/tracks';
import { getAllProblems, getProblemsByTrack } from '../data/problems';
import { LiquidCard } from '../components/ui/LiquidCard';

function greetingFor(hour) {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function Home() {
  const { xp, streak, solved, attempted, getStatus, getLevel } = useApp();
  const { level, title, next } = getLevel();
  const allProblems = getAllProblems();
  const totalProblems = getTotalProblems();

  const suggested = allProblems.filter(p => getStatus(p.id) === 'unsolved').sort((a, b) => a.lcId - b.lcId).slice(0, 5);
  const now = new Date();
  const firstName = "Coder";
  
  const levelProgress = next === Infinity ? 100 : Math.round((xp / next) * 100);

  return (
    <div className="h-full flex flex-col min-h-0 w-full p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto animate-fade-in">
      {/* Greeting section (mockup-style row) - fixed header */}
      <div className="flex items-center justify-between gap-4 pb-4 shrink-0">
        <div className="flex items-center gap-3.5">
          <div className="size-10 rounded-full border border-gray-200 flex items-center justify-center shrink-0 overflow-hidden bg-gray-100 text-gray-500 font-bold">
            C
          </div>
          <h1 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[var(--app-ink)]">
            {greetingFor(now.getHours())}, {firstName}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[var(--app-soft)] border border-[var(--app-hairline)] text-[var(--app-ink)]">
            Lv. {level} {title}
          </div>
        </div>
      </div>

      {/* Scrollable Cards Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar py-4 sm:py-6 flex flex-col gap-4 sm:gap-6 pb-12 sm:pb-16 lg:pb-20">
        {/* Activity overview */}
        <div>
          <div className="mb-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--app-muted)]">Activity Overview</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <AnalyticsBlock
              index={0}
              numericValue={solved.length}
              label="Total Solved"
              icon={<CheckCircle2 className="size-4 text-[var(--app-ink)]" />}
              subtitle={`${totalProblems - solved.length - attempted.length} remaining to master`}
            />
            <AnalyticsBlock
              index={1}
              numericValue={attempted.length}
              label="Attempted"
              icon={<AlertCircle className="size-4 text-[var(--app-ink)]" />}
              subtitle="Keep trying!"
            />
            <AnalyticsBlock
              index={2}
              numericValue={xp}
              label="Total XP"
              icon={<Star className="size-4 text-[var(--app-ink)]" />}
              subtitle={`${next === Infinity ? 'Max Level' : `${next - xp} XP to next level`}`}
            />
            <AnalyticsBlock
              index={3}
              numericValue={streak}
              label="Current Streak"
              icon={<Flame className="size-4 text-[var(--app-ink)]" />}
              subtitle="Days in a row"
            />
          </div>
        </div>

        {/* Top Models + Provider Usage (Re-mapped to Tracks & Suggested) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Active Tracks */}
          <LiquidCard index={4} className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <h2 className="text-base sm:text-lg font-semibold text-[var(--app-ink)]">Active Tracks</h2>
              <Link to="/tracks" className="text-[10px] sm:text-xs font-medium text-[var(--app-muted)] uppercase tracking-wide hover:text-[var(--app-ink)] transition-colors">View All</Link>
            </div>
            <div className="flex flex-col gap-2">
              {TRACKS.slice(0, 4).map((track, i) => {
                const trackProblems = getProblemsByTrack(track.id);
                const s = trackProblems.filter(p => getStatus(p.id) === 'solved').length;
                const pct = trackProblems.length ? Math.round((s / trackProblems.length) * 100) : 0;
                
                return (
                  <Link key={track.id} to={`/tracks/${track.id}`} className="flex items-center gap-3 rounded-lg bg-[var(--app-canvas)] border border-[var(--app-hairline)] hover:border-gray-300 p-2.5 transition-colors group">
                    <div className="size-8 rounded-md bg-[var(--app-soft)] flex items-center justify-center shrink-0 border border-[var(--app-hairline)] group-hover:bg-black group-hover:text-white transition-colors">
                      <Trophy className="size-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-[var(--app-ink)] truncate">{track.title}</span>
                        <span className="text-xs font-semibold text-[var(--app-ink)] shrink-0">{pct}%</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-[var(--app-muted)] mb-1">
                        <span>{s}/{track.totalProblems} solved</span>
                        <span>{track.difficulty}</span>
                      </div>
                      <div className="h-1.5 bg-[var(--app-hairline)] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[var(--app-ink)] rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </LiquidCard>

          {/* Suggested Next */}
          <LiquidCard index={5} className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <h2 className="text-base sm:text-lg font-semibold text-[var(--app-ink)]">Suggested Next</h2>
              <Link to="/problems" className="text-[10px] sm:text-xs font-medium text-[var(--app-muted)] uppercase tracking-wide hover:text-[var(--app-ink)] transition-colors">Browse All</Link>
            </div>
            <div className="flex flex-col gap-2">
              {suggested.length === 0 ? (
                <p className="text-sm text-[var(--app-muted)]">You've solved everything!</p>
              ) : (
                suggested.map((p, i) => (
                  <Link key={p.id} to={`/problem/${p.id}`} className="flex items-center gap-3 rounded-lg bg-[var(--app-canvas)] border border-[var(--app-hairline)] hover:border-gray-300 p-2.5 transition-colors group">
                    <div className="size-8 rounded-md bg-[var(--app-soft)] flex items-center justify-center shrink-0 border border-[var(--app-hairline)] group-hover:bg-black group-hover:text-white transition-colors text-xs font-bold">
                      {p.lcId}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-[var(--app-ink)] capitalize truncate">{p.title}</span>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[var(--app-ink)] text-[var(--app-canvas)] shrink-0 uppercase">{p.difficulty}</span>
                      </div>
                      <div className="text-[10px] text-[var(--app-muted)] truncate mb-1">
                        {p.track.replace(/-/g, ' ')}
                      </div>
                    </div>
                    <div className="shrink-0 text-[var(--app-muted)] group-hover:text-black transition-colors pl-2">
                      <PlayCircle className="size-5" />
                    </div>
                  </Link>
                ))
              )}
            </div>
          </LiquidCard>
        </div>
      </div>
    </div>
  );
}

function AnalyticsBlock({ numericValue, label, icon, subtitle, index }) {
  return (
    <LiquidCard index={index} className="p-4 sm:p-5 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] sm:text-xs font-medium text-[var(--app-muted)] uppercase tracking-wide">{label}</span>
        <span className="inline-flex items-center justify-center size-7">
          {icon}
        </span>
      </div>
      <div className="text-2xl sm:text-3xl font-semibold text-[var(--app-ink)] tracking-tight tabular-nums">
        {numericValue}
      </div>
      <p className="text-[10px] sm:text-xs text-[var(--app-muted)] mt-1 truncate">{subtitle}</p>
    </LiquidCard>
  );
}

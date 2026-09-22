import { Link } from 'react-router-dom';
import { TRACKS } from '../data/tracks';
import { getProblemsByTrack } from '../data/problems';
import { useApp } from '../context/AppContext';
import { LiquidCard } from '../components/ui/LiquidCard';
import { Trophy } from 'lucide-react';

export default function Tracks() {
  const { getStatus } = useApp();

  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto flex flex-col gap-8 animate-fade-in">
      <div className="border-b border-[var(--app-hairline)] pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--app-ink)]">
          Learning Tracks
        </h1>
        <p className="text-sm font-medium text-[var(--app-muted)] mt-1">Master Data Structures and Algorithms systematically</p>
      </div>

      {['Beginner', 'Beginner-Intermediate', 'Intermediate', 'Advanced'].map(diff => {
        const group = TRACKS.filter(t => t.difficulty === diff || (diff === 'Intermediate' && t.difficulty === 'Intermediate-Advanced'));
        if (!group.length) return null;
        return (
          <div key={diff} className="mb-4">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--app-muted)]">{diff}</h2>
              <div className="flex-1 h-px bg-[var(--app-hairline)]" />
              <span className="text-xs font-medium text-[var(--app-muted)]">{group.length} tracks</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.map((track, i) => {
                const problems = getProblemsByTrack(track.id);
                const s = problems.filter(p => getStatus(p.id) === 'solved').length;
                const pct = problems.length ? Math.round((s / problems.length) * 100) : 0;
                const completed = pct === 100;

                return (
                  <LiquidCard key={track.id} index={i} className="p-5 flex flex-col group liquid-row">
                    <Link to={`/tracks/${track.id}`} className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                           <div className="size-8 rounded-md bg-[var(--app-soft)] border border-[var(--app-hairline)] flex items-center justify-center shrink-0">
                              <Trophy size={14} className="text-[var(--app-muted)]" />
                            </div>
                           <h3 className="text-sm font-semibold text-[var(--app-ink)] group-hover:underline">
                            {track.title}
                           </h3>
                        </div>
                        {completed && <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--app-ink)] text-white">DONE</span>}
                      </div>
                      <p className="text-xs text-[var(--app-muted)] mb-6 flex-1 leading-relaxed">
                        {track.description}
                      </p>
                      
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-xs font-medium text-[var(--app-muted)]">{track.modules.length} modules</span>
                        <span className="text-xs font-semibold text-[var(--app-ink)]">{pct}%</span>
                      </div>
                      <div className="progress-bar-bg">
                        <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
                      </div>
                    </Link>
                  </LiquidCard>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

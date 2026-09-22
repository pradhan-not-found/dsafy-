import { useParams, Link } from 'react-router-dom';
import { getTrackById } from '../data/tracks';
import { getProblemsByModule, getProblemsByTrack } from '../data/problems';
import { useApp } from '../context/AppContext';
import { LiquidCard } from '../components/ui/LiquidCard';
import { PlayCircle, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function TrackDetail() {
  const { trackId } = useParams();
  const track = getTrackById(trackId);
  const { getStatus } = useApp();

  if (!track) return (
    <div className="flex h-full items-center justify-center p-6 text-sm text-[var(--app-muted)]">
      Track not found. <Link to="/tracks" className="ml-2 font-semibold text-[var(--app-ink)] hover:underline">Go back</Link>
    </div>
  );

  const allTrackProblems = getProblemsByTrack(trackId);
  const solvedCount = allTrackProblems.filter(p => getStatus(p.id) === 'solved').length;
  const pct = allTrackProblems.length ? Math.round((solvedCount / allTrackProblems.length) * 100) : 0;

  return (
    <div className="p-6 sm:p-8 max-w-4xl mx-auto animate-fade-in">
      <Link to="/tracks" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--app-muted)] hover:text-[var(--app-ink)] mb-6 transition-colors">
        <ChevronLeft size={16} /> Back to Tracks
      </Link>

      <LiquidCard className="p-6 sm:p-8 mb-8">
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
          <div className="flex-1">
            <h1 className="text-2xl font-bold tracking-tight text-[var(--app-ink)] mb-2">
              {track.title}
            </h1>
            <p className="text-sm text-[var(--app-muted)] max-w-2xl leading-relaxed">
              {track.description}
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--app-muted)]">Modules</span>
                <span className="text-sm font-semibold text-[var(--app-ink)]">{track.modules.length}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--app-muted)]">Time</span>
                <span className="text-sm font-semibold text-[var(--app-ink)]">~{track.estimatedHours} hours</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--app-muted)]">Progress</span>
                <span className="text-sm font-semibold text-[var(--app-ink)]">{solvedCount}/{allTrackProblems.length} solved</span>
              </div>
            </div>
          </div>
          <div className="text-left md:text-right flex flex-col justify-end">
            <div className="text-4xl sm:text-5xl font-bold tracking-tighter text-[var(--app-ink)] tabular-nums leading-none">
              {pct}%
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--app-muted)] mt-2">Complete</div>
          </div>
        </div>
        <div className="h-1.5 bg-[var(--app-soft)] rounded-full overflow-hidden">
          <div className="h-full bg-[var(--app-ink)] transition-all duration-700 ease-out" style={{ width: `${pct}%` }} />
        </div>
      </LiquidCard>

      <div className="flex flex-col gap-6">
        {track.modules.map((mod, idx) => {
          const modProblems = mod.problems.map(id => ({ id, status: getStatus(id) }));
          const modSolved = modProblems.filter(p => p.status === 'solved').length;
          const modPct = modProblems.length ? Math.round((modSolved / modProblems.length) * 100) : 0;
          const isCompleted = modPct === 100;
          const fullProblems = getProblemsByModule(mod.id);

          return (
            <LiquidCard key={mod.id} index={idx} className="p-5 sm:p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4 items-center">
                  <div className={`size-10 flex items-center justify-center rounded-lg text-sm font-bold border transition-colors ${
                    isCompleted 
                      ? 'bg-[var(--app-ink)] text-white border-[var(--app-ink)]' 
                      : 'bg-[var(--app-soft)] text-[var(--app-muted)] border-[var(--app-hairline)]'
                  }`}>
                    {isCompleted ? <CheckCircle2 size={18} /> : idx + 1}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[var(--app-ink)]">{mod.title}</h3>
                    <div className="text-xs font-medium text-[var(--app-muted)] mt-0.5">{modSolved}/{modProblems.length} solved</div>
                  </div>
                </div>
                <div className="text-lg font-semibold text-[var(--app-ink)] tabular-nums">{modPct}%</div>
              </div>

              <p className="text-sm text-[var(--app-muted)] mb-6 leading-relaxed">
                {mod.description}
              </p>

              {mod.tutorial && (
                <details className="mb-6 group">
                  <summary className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--app-muted)] hover:text-[var(--app-ink)] cursor-pointer transition-colors list-none">
                    <ChevronRight size={14} className="group-open:rotate-90 transition-transform" />
                    Read Tutorial
                  </summary>
                  <div className="mt-4 p-5 rounded-lg bg-[var(--app-canvas)] border border-[var(--app-hairline)] text-sm text-[var(--app-ink)] leading-relaxed prose prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-[var(--app-soft)] prose-pre:text-[var(--app-ink)]">
                    {mod.tutorial.split('\n').map((line, i) => {
                      if (line.startsWith('### ')) return <h3 key={i} className="font-semibold text-[var(--app-ink)] mt-6 mb-3">{line.replace('### ', '')}</h3>;
                      if (line.startsWith('- **')) return <li key={i} className="ml-4 mb-1.5" dangerouslySetInnerHTML={{ __html: line.substring(2).replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>') }} />;
                      if (line.startsWith('- ')) return <li key={i} className="ml-4 mb-1.5">{line.substring(2)}</li>;
                      if (line.match(/^\d+\.\s\*\*/)) return <li key={i} className="ml-4 list-decimal mb-1.5" dangerouslySetInnerHTML={{ __html: line.replace(/^\d+\.\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>') }} />;
                      if (line.startsWith('`') && line.endsWith('`')) return <code key={i} className="bg-[var(--app-soft)] px-1.5 py-0.5 rounded border border-[var(--app-hairline)] font-mono text-xs">{line.slice(1, -1)}</code>;
                      return line.trim() ? <p key={i} className="mb-3" dangerouslySetInnerHTML={{ __html: line.replace(/`([^`]+)`/g, '<code class="bg-[var(--app-soft)] px-1.5 py-0.5 rounded border border-[var(--app-hairline)] font-mono text-xs">$1</code>').replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>') }} /> : null;
                    })}
                  </div>
                </details>
              )}

              <div className="h-1.5 bg-[var(--app-soft)] rounded-full overflow-hidden mb-6">
                <div className="h-full bg-[var(--app-ink)] transition-all duration-700 ease-out" style={{ width: `${modPct}%` }} />
              </div>

              {fullProblems.length > 0 && (
                <div className="flex flex-col rounded-lg border border-[var(--app-hairline)] overflow-hidden">
                  {fullProblems.map((p, i) => {
                    const st = getStatus(p.id);
                    return (
                      <Link 
                        key={p.id} 
                        to={`/problem/${p.id}`} 
                        className={`flex justify-between items-center px-4 py-3 bg-[var(--app-surface)] hover:bg-[var(--app-canvas)] transition-colors group ${
                          i < fullProblems.length - 1 ? 'border-b border-[var(--app-hairline)]' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`size-3.5 rounded-[3px] border flex items-center justify-center transition-colors ${
                            st === 'solved' ? 'bg-[var(--app-ink)] border-[var(--app-ink)] text-white' 
                            : st === 'attempted' ? 'bg-[var(--app-muted)] border-[var(--app-muted)] text-white' 
                            : 'bg-transparent border-[var(--app-hairline)]'
                          }`}>
                            {st === 'solved' && <CheckCircle2 size={10} />}
                          </div>
                          <span className="text-sm font-semibold text-[var(--app-ink)] group-hover:underline">
                            {p.lcId}. {p.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                           <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--app-muted)]">{p.difficulty}</span>
                           <PlayCircle size={16} className="text-[var(--app-muted)] group-hover:text-[var(--app-ink)] transition-colors" />
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}
            </LiquidCard>
          );
        })}
      </div>
    </div>
  );
}

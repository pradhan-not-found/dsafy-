import { useParams, Link } from 'react-router-dom';
import { getTrackById } from '../data/tracks';
import { getProblemsByModule, getProblemsByTrack } from '../data/problems';
import { useApp } from '../context/AppContext';
import { LiquidCard } from '../components/ui/LiquidCard';
import { PlayCircle, CheckCircle2 } from 'lucide-react';

export default function TrackDetail() {
  const { trackId } = useParams();
  const track = getTrackById(trackId);
  const { getStatus } = useApp();

  if (!track) return (
    <div className="flex h-full items-center justify-center p-6 text-center" style={{ color: 'var(--app-muted)' }}>
      Track not found. <Link to="/tracks" style={{ color: 'var(--app-ink)', fontWeight: 600, marginLeft: 6 }} className="hover:underline">Go back</Link>
    </div>
  );

  const allTrackProblems = getProblemsByTrack(trackId);
  const solvedCount = allTrackProblems.filter(p => getStatus(p.id) === 'solved').length;
  const pct = allTrackProblems.length ? Math.round((solvedCount / allTrackProblems.length) * 100) : 0;

  return (
    <div className="p-6 max-w-4xl mx-auto animate-fade-in">
      <Link to="/tracks" className="label hover:opacity-70 inline-block mb-6">← Back to Tracks</Link>

      <LiquidCard className="p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-5">
          <div className="flex-1">
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--app-ink)', marginBottom: 8 }}>
              {track.title}
            </h1>
            <p style={{ color: 'var(--app-muted)', maxWidth: 600, fontSize: '13px' }}>
              {track.description}
            </p>
            <div className="flex gap-4 mt-4">
              <span className="label" style={{ letterSpacing: 0 }}>{track.modules.length} MODULES</span>
              <span className="label" style={{ letterSpacing: 0 }}>~{track.estimatedHours} HOURS</span>
              <span className="label" style={{ letterSpacing: 0, color: 'var(--app-ink)' }}>{solvedCount}/{allTrackProblems.length} SOLVED</span>
            </div>
          </div>
          <div className="text-right flex flex-col justify-end">
            <div style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.05em', color: 'var(--app-ink)', lineHeight: 1 }}>
              {pct}%
            </div>
            <div className="label mt-1">Complete</div>
          </div>
        </div>
        <div className="progress-bar-bg" style={{ height: 6 }}>
          <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
        </div>
      </LiquidCard>

      <div className="flex flex-col gap-5">
        {track.modules.map((mod, idx) => {
          const modProblems = mod.problems.map(id => ({ id, status: getStatus(id) }));
          const modSolved = modProblems.filter(p => p.status === 'solved').length;
          const modPct = modProblems.length ? Math.round((modSolved / modProblems.length) * 100) : 0;
          const isCompleted = modPct === 100;
          const fullProblems = getProblemsByModule(mod.id);

          return (
            <LiquidCard key={mod.id} index={idx} className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3 items-center">
                  <div
                    className="size-8 flex items-center justify-center rounded-md font-bold text-[12px]"
                    style={{
                      background: isCompleted ? 'var(--app-ink)' : 'var(--app-soft)',
                      color: isCompleted ? '#fff' : 'var(--app-muted)',
                      border: isCompleted ? 'none' : '1px solid var(--app-hairline)'
                    }}
                  >
                    {isCompleted ? <CheckCircle2 size={16} /> : idx + 1}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--app-ink)' }}>{mod.title}</h3>
                    <div className="label" style={{ letterSpacing: 0 }}>{modSolved}/{modProblems.length} solved</div>
                  </div>
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--app-ink)' }}>{modPct}%</div>
              </div>

              <p style={{ color: 'var(--app-muted)', fontSize: '12px', marginBottom: 16 }}>
                {mod.description}
              </p>

              {mod.tutorial && (
                <details className="mb-5 group">
                  <summary className="label cursor-pointer flex gap-1 items-center hover:opacity-70 transition-opacity" style={{ listStyle: 'none' }}>
                    <span className="group-open:rotate-90 transition-transform">▸</span> Read Tutorial
                  </summary>
                  <div 
                    className="mt-3 p-4 rounded-lg text-[13px] leading-relaxed"
                    style={{ background: 'var(--app-canvas)', border: '1px solid var(--app-hairline)', color: 'var(--app-ink)' }}
                  >
                    {mod.tutorial.split('\n').map((line, i) => {
                      if (line.startsWith('### ')) return <h3 key={i} style={{ fontWeight: 700, marginTop: 12, marginBottom: 6 }}>{line.replace('### ', '')}</h3>;
                      if (line.startsWith('- **')) return <li key={i} className="ml-4 mb-1" dangerouslySetInnerHTML={{ __html: line.substring(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
                      if (line.startsWith('- ')) return <li key={i} className="ml-4 mb-1">{line.substring(2)}</li>;
                      if (line.match(/^\d+\.\s\*\*/)) return <li key={i} className="ml-4 list-decimal mb-1" dangerouslySetInnerHTML={{ __html: line.replace(/^\d+\.\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
                      if (line.startsWith('`') && line.endsWith('`')) return <code key={i} style={{ background: 'var(--app-soft)', padding: '2px 4px', borderRadius: 4, fontFamily: 'monospace', fontSize: '11px' }}>{line.slice(1, -1)}</code>;
                      return line.trim() ? <p key={i} className="mb-2" dangerouslySetInnerHTML={{ __html: line.replace(/`([^`]+)`/g, '<code style="background:var(--app-soft);padding:2px 4px;border-radius:4px;font-family:monospace;font-size:11px">$1</code>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} /> : null;
                    })}
                  </div>
                </details>
              )}

              <div className="progress-bar-bg mb-4">
                <div className="progress-bar-fill" style={{ width: `${modPct}%` }} />
              </div>

              {fullProblems.length > 0 && (
                <div className="flex flex-col rounded-lg overflow-hidden" style={{ border: '1px solid var(--app-hairline)' }}>
                  {fullProblems.map((p, i) => {
                    const st = getStatus(p.id);
                    return (
                      <Link 
                        key={p.id} 
                        to={`/problem/${p.id}`} 
                        className="flex justify-between items-center px-4 py-2.5 transition-colors group"
                        style={{ 
                          background: 'var(--app-surface)', 
                          borderBottom: i < fullProblems.length - 1 ? '1px solid var(--app-hairline)' : 'none'
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="size-3 rounded-[3px]"
                            style={{
                              background: st === 'solved' ? 'var(--app-ink)' : st === 'attempted' ? 'var(--app-muted)' : 'transparent',
                              border: st === 'solved' || st === 'attempted' ? 'none' : '1px solid var(--app-hairline)'
                            }} 
                          />
                          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--app-ink)' }} className="group-hover:underline">
                            {p.lcId}. {p.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                           <span className="label">{p.difficulty}</span>
                           <PlayCircle size={14} style={{ color: 'var(--app-subtle)' }} />
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

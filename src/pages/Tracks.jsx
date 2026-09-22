import { Link } from 'react-router-dom';
import { TRACKS } from '../data/tracks';
import { getProblemsByTrack } from '../data/problems';
import { useApp } from '../context/AppContext';
import { LiquidCard } from '../components/ui/LiquidCard';
import { Trophy } from 'lucide-react';

export default function Tracks() {
  const { getStatus } = useApp();

  return (
    <div className="p-6 max-w-5xl mx-auto flex flex-col gap-8 animate-fade-in">
      <div className="border-b pb-6" style={{ borderColor: 'var(--app-hairline)' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--app-ink)' }}>
          Learning Tracks
        </h1>
        <p className="label mt-1">Master Data Structures and Algorithms systematically</p>
      </div>

      {['Beginner', 'Beginner-Intermediate', 'Intermediate', 'Advanced'].map(diff => {
        const group = TRACKS.filter(t => t.difficulty === diff || (diff === 'Intermediate' && t.difficulty === 'Intermediate-Advanced'));
        if (!group.length) return null;
        return (
          <div key={diff} className="mb-4">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="label">{diff}</h2>
              <div className="flex-1 h-px" style={{ background: 'var(--app-hairline)' }} />
              <span className="label" style={{ letterSpacing: 0 }}>{group.length} tracks</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.map((track, i) => {
                const problems = getProblemsByTrack(track.id);
                const s = problems.filter(p => getStatus(p.id) === 'solved').length;
                const pct = problems.length ? Math.round((s / problems.length) * 100) : 0;
                const completed = pct === 100;

                return (
                  <LiquidCard key={track.id} index={i} className="p-5 flex flex-col group hover:border-black transition-all">
                    <Link to={`/tracks/${track.id}`} className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                           <div
                              className="size-7 rounded-md flex items-center justify-center shrink-0"
                              style={{ background: 'var(--app-soft)', border: '1px solid var(--app-hairline)' }}
                            >
                              <Trophy size={12} style={{ color: 'var(--app-muted)' }} />
                            </div>
                           <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--app-ink)' }} className="group-hover:underline">
                            {track.title}
                           </h3>
                        </div>
                        {completed && <span className="label" style={{ background: 'var(--app-ink)', color: '#fff', padding: '2px 6px', borderRadius: 4 }}>DONE</span>}
                      </div>
                      <p style={{ fontSize: '12px', color: 'var(--app-muted)' }} className="mb-6 flex-1">
                        {track.description}
                      </p>
                      
                      <div className="flex justify-between items-end mb-1.5">
                        <span className="label" style={{ letterSpacing: 0 }}>{track.modules.length} modules</span>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--app-ink)' }}>{pct}%</span>
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

import { useParams, Link } from 'react-router-dom';
import { getTrackById } from '../data/tracks';
import { getProblemsByModule, getProblemsByTrack } from '../data/problems';
import { useApp } from '../context/AppContext';

export default function TrackDetail() {
  const { trackId } = useParams();
  const track = getTrackById(trackId);
  const { getStatus } = useApp();

  if (!track) return (
    <div className="text-center py-24 text-gray-500">
      Track not found. <Link to="/tracks" className="text-black font-bold hover:underline">Go back</Link>
    </div>
  );

  const allTrackProblems = getProblemsByTrack(trackId);
  const solvedCount = allTrackProblems.filter(p => getStatus(p.id) === 'solved').length;
  const pct = allTrackProblems.length ? Math.round((solvedCount / allTrackProblems.length) * 100) : 0;

  return (
    <div className="animate-fade-in">
      <Link to="/tracks" className="text-xs font-bold text-gray-400 hover:text-black mb-8 inline-block">← BACK TO TRACKS</Link>

      <div className="border border-gray-200 rounded-2xl p-8 mb-10 bg-gray-50">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-3xl font-black tracking-tight mb-2">{track.title}</h1>
            <p className="text-gray-600 font-medium max-w-2xl">{track.description}</p>
            <div className="flex gap-6 mt-6 text-sm font-bold text-gray-500">
              <span>{track.modules.length} MODULES</span>
              <span>~{track.estimatedHours} HOURS</span>
              <span className="text-black">{solvedCount}/{allTrackProblems.length} SOLVED</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-5xl font-black tracking-tighter">{pct}%</div>
            <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Complete</div>
          </div>
        </div>
        <div className="mt-8 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-black transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {track.modules.map((mod, idx) => {
          const modProblems = mod.problems.map(id => ({ id, status: getStatus(id) }));
          const modSolved = modProblems.filter(p => p.status === 'solved').length;
          const modPct = modProblems.length ? Math.round((modSolved / modProblems.length) * 100) : 0;
          const isCompleted = modPct === 100;
          const fullProblems = getProblemsByModule(mod.id);

          return (
            <div key={mod.id} className="border border-gray-200 rounded-xl p-6 bg-white">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4 items-center">
                  <div className={`w-10 h-10 flex items-center justify-center rounded border ${isCompleted ? 'bg-black text-white border-black' : 'bg-gray-50 border-gray-200 text-gray-400 font-black'}`}>
                    {isCompleted ? '✓' : idx + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{mod.title}</h3>
                    <div className="text-xs font-bold text-gray-400">{modSolved}/{modProblems.length} SOLVED</div>
                  </div>
                </div>
                <div className="text-lg font-black">{modPct}%</div>
              </div>

              <p className="text-gray-600 font-medium text-sm mb-4">{mod.description}</p>

              {mod.tutorial && (
                <details className="mb-6 group">
                  <summary className="text-xs font-bold uppercase tracking-widest cursor-pointer text-gray-500 hover:text-black list-none flex gap-2 items-center">
                    <span className="group-open:rotate-90 transition-transform">▸</span> Read Tutorial
                  </summary>
                  <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded text-sm text-gray-800 leading-relaxed">
                    {mod.tutorial.split('\n').map((line, i) => {
                      if (line.startsWith('### ')) return <h3 key={i} className="font-bold text-black mt-4 mb-2">{line.replace('### ', '')}</h3>;
                      if (line.startsWith('- **')) return <li key={i} className="ml-4 mb-1" dangerouslySetInnerHTML={{ __html: line.substring(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
                      if (line.startsWith('- ')) return <li key={i} className="ml-4 mb-1">{line.substring(2)}</li>;
                      if (line.match(/^\d+\.\s\*\*/)) return <li key={i} className="ml-4 list-decimal mb-1" dangerouslySetInnerHTML={{ __html: line.replace(/^\d+\.\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
                      if (line.startsWith('`') && line.endsWith('`')) return <code key={i} className="bg-gray-200 px-1 rounded font-mono text-xs">{line.slice(1, -1)}</code>;
                      return line.trim() ? <p key={i} className="mb-2" dangerouslySetInnerHTML={{ __html: line.replace(/`([^`]+)`/g, '<code class="bg-gray-200 px-1 rounded font-mono text-xs">$1</code>') }} /> : null;
                    })}
                  </div>
                </details>
              )}

              <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden mb-6">
                <div className="h-full bg-black" style={{ width: `${modPct}%` }} />
              </div>

              {fullProblems.length > 0 && (
                <div className="flex flex-col border border-gray-200 rounded divide-y divide-gray-100">
                  {fullProblems.map(p => {
                    const st = getStatus(p.id);
                    return (
                      <Link key={p.id} to={`/problem/${p.id}`} className="flex justify-between items-center p-3 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-sm border ${st === 'solved' ? 'bg-black border-black' : st === 'attempted' ? 'bg-gray-400 border-gray-400' : 'bg-transparent border-gray-300'}`} />
                          <span className="text-sm font-semibold text-black">{p.lcId}. {p.title}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-500">
                          <span>{p.difficulty}</span>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

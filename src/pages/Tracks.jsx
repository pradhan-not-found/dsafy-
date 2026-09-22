import { Link } from 'react-router-dom';
import { TRACKS } from '../data/tracks';
import { getProblemsByTrack } from '../data/problems';
import { useApp } from '../context/AppContext';

export default function Tracks() {
  const { getStatus } = useApp();

  return (
    <div className="animate-fade-in">
      <div className="mb-12 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-black tracking-tight mb-2">Learning Tracks</h1>
        <p className="text-gray-500 font-medium">Master Data Structures and Algorithms systematically.</p>
      </div>

      {['Beginner', 'Beginner-Intermediate', 'Intermediate', 'Advanced'].map(diff => {
        const group = TRACKS.filter(t => t.difficulty === diff || (diff === 'Intermediate' && t.difficulty === 'Intermediate-Advanced'));
        if (!group.length) return null;
        return (
          <div key={diff} className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-black">{diff}</h2>
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs font-bold text-gray-400">{group.length} tracks</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.map((track) => {
                const problems = getProblemsByTrack(track.id);
                const s = problems.filter(p => getStatus(p.id) === 'solved').length;
                const pct = problems.length ? Math.round((s / problems.length) * 100) : 0;
                const completed = pct === 100;

                return (
                  <Link
                    key={track.id}
                    to={`/tracks/${track.id}`}
                    className="group flex flex-col p-6 bg-white border border-gray-200 rounded-xl hover:border-black transition-all"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-black tracking-tight group-hover:underline">{track.title}</h3>
                      {completed && <span className="text-[10px] font-bold px-2 py-1 bg-black text-white rounded">DONE</span>}
                    </div>
                    <p className="text-sm text-gray-500 font-medium mb-6 flex-1">{track.description}</p>
                    
                    <div className="flex justify-between text-xs font-bold text-gray-400 mb-2">
                      <span>{track.modules.length} modules</span>
                      <span className="text-black">{pct}%</span>
                    </div>
                    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-black" style={{ width: `${pct}%` }} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

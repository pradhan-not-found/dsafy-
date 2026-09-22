import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { TRACKS } from '../data/tracks';
import { getProblemsByTrack } from '../data/problems';

export default function Sidebar() {
  const { getStatus } = useApp();

  return (
    <aside className="fixed left-0 top-14 bottom-0 w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto px-4 py-6 z-40">
      <div className="mb-4">
        <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 px-2">DSA Tracks</div>
        <div className="flex flex-col gap-1">
          {TRACKS.map(track => {
            const problems = getProblemsByTrack(track.id);
            const solvedCount = problems.filter(p => getStatus(p.id) === 'solved').length;
            return (
              <NavLink
                key={track.id}
                to={`/tracks/${track.id}`}
                className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-gray-200 text-black font-semibold' : 'text-gray-600 hover:bg-gray-100 hover:text-black font-medium'}`}
              >
                <div className={`w-1.5 h-4 rounded-full ${solvedCount > 0 ? 'bg-black' : 'bg-gray-300'}`} />
                <span className="flex-1 truncate">{track.title}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-white border border-gray-200 rounded-full text-gray-500">
                  {solvedCount}/{track.totalProblems}
                </span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

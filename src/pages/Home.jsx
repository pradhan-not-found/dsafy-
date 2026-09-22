import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { TRACKS, getTotalProblems } from '../data/tracks';
import { getAllProblems, getProblemsByTrack } from '../data/problems';

function ProgressBar({ value }) {
  return (
    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div className="h-full bg-black transition-all duration-500" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

export default function Home() {
  const { xp, streak, solved, attempted, getStatus, getLevel } = useApp();
  const { level, title, next } = getLevel();
  const allProblems = getAllProblems();
  const totalProblems = getTotalProblems();

  const recent = allProblems.filter(p => getStatus(p.id) !== 'unsolved').slice(0, 5);
  const suggested = allProblems.filter(p => getStatus(p.id) === 'unsolved').sort((a, b) => a.lcId - b.lcId).slice(0, 5);

  const levelProgress = next === Infinity ? 100 : Math.round((xp / next) * 100);

  return (
    <div className="animate-fade-in">
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">DSA Practice Platform</div>
          <h1 className="text-3xl font-black tracking-tight mb-2 text-black">
            Welcome back, Coder.
          </h1>
          <p className="text-gray-500 font-medium">
            {solved.length} solved · {attempted.length} attempted · {totalProblems - solved.length - attempted.length} remaining
          </p>
        </div>
        <div className="w-full md:w-64">
          <div className="flex justify-between text-xs font-bold mb-2">
            <span className="text-black">Level {level} — {title}</span>
            <span className="text-gray-500">{xp} / {next === Infinity ? 'MAX' : next} XP</span>
          </div>
          <ProgressBar value={levelProgress} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { label: 'Solved', value: solved.length },
          { label: 'Total XP', value: xp },
          { label: 'Streak', value: streak },
          { label: 'Tracks', value: TRACKS.filter(t => getProblemsByTrack(t.id).some(p => getStatus(p.id) !== 'unsolved')).length },
        ].map((s, i) => (
          <div key={i} className="p-6 bg-white border border-gray-200 rounded-xl text-center">
            <div className="text-3xl font-black tracking-tight text-black">{s.value}</div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <div className="flex justify-between items-end border-b border-gray-200 pb-2 mb-6">
            <h2 className="text-lg font-bold tracking-tight">Learning Tracks</h2>
            <Link to="/tracks" className="text-xs font-bold text-gray-500 hover:text-black transition-colors">View all →</Link>
          </div>
          <div className="flex flex-col gap-4">
            {TRACKS.slice(0, 6).map((track) => {
              const trackProblems = getProblemsByTrack(track.id);
              const s = trackProblems.filter(p => getStatus(p.id) === 'solved').length;
              const pct = trackProblems.length ? Math.round((s / trackProblems.length) * 100) : 0;
              return (
                <Link key={track.id} to={`/tracks/${track.id}`} className="group block">
                  <div className="p-4 bg-white border border-gray-200 rounded-lg group-hover:border-black transition-colors">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-bold text-sm">{track.title}</span>
                      <span className="text-xs font-bold text-gray-400">{s}/{track.totalProblems}</span>
                    </div>
                    <ProgressBar value={pct} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-end border-b border-gray-200 pb-2 mb-6">
            <h2 className="text-lg font-bold tracking-tight">Suggested Next</h2>
            <Link to="/problems" className="text-xs font-bold text-gray-500 hover:text-black transition-colors">Browse all →</Link>
          </div>
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
            {suggested.map((p) => (
              <Link key={p.id} to={`/problem/${p.id}`} className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors last:border-b-0">
                <div>
                  <div className="text-sm font-bold">{p.lcId}. {p.title}</div>
                  <div className="text-xs text-gray-500 font-medium mt-0.5">{p.track.replace(/-/g, ' ')}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500">{p.difficulty}</span>
                  <span className="text-xs font-mono text-gray-400">{p.acceptance}%</span>
                </div>
              </Link>
            ))}
            {suggested.length === 0 && <div className="p-8 text-center text-gray-500 text-sm font-medium">You've solved everything.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

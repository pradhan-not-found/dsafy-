import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProblems } from '../data/problems';
import { useApp } from '../context/AppContext';

export default function Problems() {
  const { getStatus } = useApp();
  const allProblems = getAllProblems();
  const [filter, setFilter] = useState('all');

  const filtered = allProblems.filter(p => {
    if (filter === 'all') return true;
    return getStatus(p.id) === filter;
  });

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-end border-b border-gray-200 pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight mb-2">Problem Set</h1>
          <p className="text-gray-500 font-medium">Browse and practice algorithmic challenges.</p>
        </div>
        <div className="flex gap-2">
          {['all', 'unsolved', 'solved', 'attempted'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest rounded ${filter === f ? 'bg-black text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs font-bold uppercase tracking-widest text-gray-500 border-b border-gray-200">
            <tr>
              <th className="p-4 w-12 text-center">Status</th>
              <th className="p-4">Title</th>
              <th className="p-4">Track</th>
              <th className="p-4">Difficulty</th>
              <th className="p-4 text-right">Acceptance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(p => {
              const st = getStatus(p.id);
              return (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-4 text-center">
                    <div className={`mx-auto w-3 h-3 rounded-sm border ${st === 'solved' ? 'bg-black border-black' : st === 'attempted' ? 'bg-gray-400 border-gray-400' : 'bg-transparent border-gray-300'}`} />
                  </td>
                  <td className="p-4 font-bold text-black group-hover:underline">
                    <Link to={`/problem/${p.id}`}>{p.lcId}. {p.title}</Link>
                  </td>
                  <td className="p-4 text-xs font-bold text-gray-400 uppercase">{p.track.replace(/-/g, ' ')}</td>
                  <td className="p-4 text-xs font-bold uppercase tracking-widest text-gray-500">{p.difficulty}</td>
                  <td className="p-4 text-right font-mono text-xs text-gray-400">{p.acceptance}%</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="p-12 text-center text-gray-500 font-medium">No problems found.</div>}
      </div>
    </div>
  );
}

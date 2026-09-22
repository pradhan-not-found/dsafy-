import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProblems } from '../data/problems';
import { useApp } from '../context/AppContext';
import { LiquidCard } from '../components/ui/LiquidCard';
import { CheckCircle2 } from 'lucide-react';

export default function Problems() {
  const { getStatus } = useApp();
  const allProblems = getAllProblems();
  const [filter, setFilter] = useState('all');

  const filtered = allProblems.filter(p => {
    if (filter === 'all') return true;
    return getStatus(p.id) === filter;
  });

  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-[var(--app-hairline)] pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--app-ink)]">
            Problem Set
          </h1>
          <p className="text-sm font-medium text-[var(--app-muted)] mt-1">Browse and practice algorithmic challenges</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {['all', 'unsolved', 'solved', 'attempted'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-md transition-colors ${
                filter === f 
                  ? 'bg-[var(--app-ink)] text-white' 
                  : 'bg-[var(--app-soft)] text-[var(--app-muted)] hover:bg-[var(--app-hairline)]'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <LiquidCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[var(--app-canvas)] border-b border-[var(--app-hairline)] text-[10px] uppercase tracking-wider font-semibold text-[var(--app-muted)]">
              <tr>
                <th className="px-4 py-3 w-12 text-center">Status</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3 hidden md:table-cell">Track</th>
                <th className="px-4 py-3">Difficulty</th>
                <th className="px-4 py-3 text-right hidden sm:table-cell">Acceptance</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => {
                const st = getStatus(p.id);
                return (
                  <tr 
                    key={p.id} 
                    className={`group transition-colors bg-[var(--app-surface)] hover:bg-[var(--app-canvas)] ${
                      i < filtered.length - 1 ? 'border-b border-[var(--app-hairline)]' : ''
                    }`}
                  >
                    <td className="px-4 py-3.5 text-center">
                      <div className={`mx-auto size-3.5 rounded-[3px] border flex items-center justify-center transition-colors ${
                        st === 'solved' ? 'bg-[var(--app-ink)] border-[var(--app-ink)] text-white' 
                        : st === 'attempted' ? 'bg-[var(--app-muted)] border-[var(--app-muted)] text-white' 
                        : 'bg-transparent border-[var(--app-hairline)]'
                      }`}>
                        {st === 'solved' && <CheckCircle2 size={10} />}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 font-semibold text-[var(--app-ink)] group-hover:underline">
                      <Link to={`/problem/${p.id}`}>{p.lcId}. {p.title}</Link>
                    </td>
                    <td className="px-4 py-3.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--app-muted)] hidden md:table-cell">
                      {p.track.replace(/-/g, ' ')}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--app-soft)] text-[var(--app-muted)]">
                        {p.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono text-xs text-[var(--app-muted)] hidden sm:table-cell">
                      {p.acceptance}%
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="p-12 text-center text-sm font-medium text-[var(--app-muted)]">
            No problems found.
          </div>
        )}
      </LiquidCard>
    </div>
  );
}

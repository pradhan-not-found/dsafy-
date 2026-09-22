import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProblems } from '../data/problems';
import { useApp } from '../context/AppContext';
import { LiquidCard } from '../components/ui/LiquidCard';

export default function Problems() {
  const { getStatus } = useApp();
  const allProblems = getAllProblems();
  const [filter, setFilter] = useState('all');

  const filtered = allProblems.filter(p => {
    if (filter === 'all') return true;
    return getStatus(p.id) === filter;
  });

  return (
    <div className="p-6 max-w-5xl mx-auto flex flex-col gap-6 animate-fade-in">
      <div className="flex justify-between items-end border-b pb-6" style={{ borderColor: 'var(--app-hairline)' }}>
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--app-ink)' }}>
            Problem Set
          </h1>
          <p className="label mt-1">Browse and practice algorithmic challenges</p>
        </div>
        <div className="flex gap-2">
          {['all', 'unsolved', 'solved', 'attempted'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="label"
              style={{
                padding: '4px 12px',
                borderRadius: 6,
                background: filter === f ? 'var(--app-ink)' : 'var(--app-soft)',
                color: filter === f ? '#fff' : 'var(--app-muted)',
                letterSpacing: 0
              }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <LiquidCard className="overflow-hidden">
        <table className="w-full text-left text-[13px]">
          <thead style={{ background: 'var(--app-canvas)', borderBottom: '1px solid var(--app-hairline)' }}>
            <tr>
              <th className="p-3 w-12 text-center label">St</th>
              <th className="p-3 label">Title</th>
              <th className="p-3 label hidden md:table-cell">Track</th>
              <th className="p-3 label">Difficulty</th>
              <th className="p-3 label text-right hidden sm:table-cell">Acceptance</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => {
              const st = getStatus(p.id);
              return (
                <tr 
                  key={p.id} 
                  className="group transition-colors"
                  style={{ 
                    borderBottom: i < filtered.length - 1 ? '1px solid var(--app-hairline)' : 'none',
                    background: 'var(--app-surface)'
                  }}
                >
                  <td className="p-3 text-center">
                    <div 
                      className="mx-auto size-3 rounded-[3px]"
                      style={{
                        background: st === 'solved' ? 'var(--app-ink)' : st === 'attempted' ? 'var(--app-muted)' : 'transparent',
                        border: st === 'solved' || st === 'attempted' ? 'none' : '1px solid var(--app-hairline)'
                      }} 
                    />
                  </td>
                  <td className="p-3 font-semibold group-hover:underline" style={{ color: 'var(--app-ink)' }}>
                    <Link to={`/problem/${p.id}`}>{p.lcId}. {p.title}</Link>
                  </td>
                  <td className="p-3 label hidden md:table-cell" style={{ letterSpacing: 0 }}>
                    {p.track.replace(/-/g, ' ')}
                  </td>
                  <td className="p-3 label" style={{ letterSpacing: 0 }}>{p.difficulty}</td>
                  <td className="p-3 text-right font-mono text-[11px] hidden sm:table-cell" style={{ color: 'var(--app-subtle)' }}>
                    {p.acceptance}%
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="p-12 text-center" style={{ color: 'var(--app-muted)', fontSize: '13px' }}>
            No problems found.
          </div>
        )}
      </LiquidCard>
    </div>
  );
}

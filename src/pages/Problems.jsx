import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProblems } from '../data/problems';
import { TRACKS } from '../data/tracks';
import { useApp } from '../context/AppContext';
import DifficultyBadge from '../components/DifficultyBadge';
import StatusIcon from '../components/StatusIcon';
import { Search, SlidersHorizontal, ExternalLink } from 'lucide-react';

const STATUS_OPTIONS = ['All', 'Solved', 'Attempted', 'Unsolved'];
const DIFF_OPTIONS = ['All', 'Easy', 'Medium', 'Hard'];

export default function Problems() {
  const { getStatus } = useApp();
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('All');
  const [status, setStatus] = useState('All');
  const [track, setTrack] = useState('All');
  const [sort, setSort] = useState('lcId');

  const allProblems = getAllProblems();

  const filtered = allProblems
    .filter(p => {
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !String(p.lcId).includes(search)) return false;
      if (difficulty !== 'All' && p.difficulty !== difficulty) return false;
      if (track !== 'All' && p.track !== track) return false;
      if (status !== 'All') {
        const s = getStatus(p.id);
        if (status === 'Solved' && s !== 'solved') return false;
        if (status === 'Attempted' && s !== 'attempted') return false;
        if (status === 'Unsolved' && s !== 'unsolved') return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sort === 'lcId') return a.lcId - b.lcId;
      if (sort === 'title') return a.title.localeCompare(b.title);
      if (sort === 'difficulty') {
        const d = { Easy: 0, Medium: 1, Hard: 2 };
        return d[a.difficulty] - d[b.difficulty];
      }
      if (sort === 'acceptance') return b.acceptance - a.acceptance;
      return 0;
    });

  const counts = {
    solved: allProblems.filter(p => getStatus(p.id) === 'solved').length,
    attempted: allProblems.filter(p => getStatus(p.id) === 'attempted').length,
    total: allProblems.length,
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-xl">
        <h1 className="page-title">All Problems</h1>
        <p className="page-subtitle">
          {counts.solved} solved · {counts.attempted} attempted · {counts.total - counts.solved - counts.attempted} unsolved · {counts.total} total
        </p>
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            className="search-input"
            style={{ paddingLeft: 32, width: '100%' }}
            placeholder="Search by title or #..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            id="problem-search"
          />
        </div>

        <select className="filter-select" value={difficulty} onChange={e => setDifficulty(e.target.value)} id="filter-difficulty">
          {DIFF_OPTIONS.map(d => <option key={d}>{d}</option>)}
        </select>

        <select className="filter-select" value={status} onChange={e => setStatus(e.target.value)} id="filter-status">
          {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
        </select>

        <select className="filter-select" value={track} onChange={e => setTrack(e.target.value)} id="filter-track">
          <option value="All">All Tracks</option>
          {TRACKS.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
        </select>

        <select className="filter-select" value={sort} onChange={e => setSort(e.target.value)} id="filter-sort">
          <option value="lcId">Sort: LC #</option>
          <option value="title">Sort: Title</option>
          <option value="difficulty">Sort: Difficulty</option>
          <option value="acceptance">Sort: Acceptance</option>
        </select>
      </div>

      {/* Table */}
      <div className="problems-table">
        <div className="problems-table-header">
          <span>Status</span>
          <span>Title</span>
          <span>Track</span>
          <span>Difficulty</span>
          <span>Acceptance</span>
          <span>LC #</span>
        </div>

        {filtered.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No problems match your filters.
          </div>
        ) : (
          filtered.map((p) => {
            const trackInfo = TRACKS.find(t => t.id === p.track);
            return (
              <Link
                key={p.id}
                to={`/problem/${p.id}`}
                className="problem-row"
                style={{ textDecoration: 'none' }}
              >
                <StatusIcon problemId={p.id} />
                <div>
                  <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>
                    {p.title}
                  </span>
                </div>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                  {trackInfo?.icon} {trackInfo?.title}
                </span>
                <DifficultyBadge difficulty={p.difficulty} />
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{p.acceptance}%</span>
                <a
                  href={`https://leetcode.com/problems/${p.id}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  style={{ fontSize: 'var(--text-xs)', color: 'var(--brand-primary-light)', display: 'flex', alignItems: 'center', gap: 3 }}
                >
                  #{p.lcId} <ExternalLink size={10} />
                </a>
              </Link>
            );
          })
        )}
      </div>

      <div style={{ marginTop: '1rem', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textAlign: 'center' }}>
        Showing {filtered.length} of {counts.total} problems
      </div>
    </div>
  );
}

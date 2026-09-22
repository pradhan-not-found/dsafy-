import { useApp } from '../context/AppContext';
import { getAllProblems } from '../data/problems';
import { TRACKS } from '../data/tracks';
import ProgressBar from '../components/ProgressBar';
import { Trophy, Flame, Zap, Star, CheckCircle2, Target, TrendingUp } from 'lucide-react';

function Heatmap({ solveHistory }) {
  // Generate last 52 weeks of data
  const cells = [];
  const now = new Date();
  for (let i = 363; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = d.toDateString();
    const count = solveHistory[key] || 0;
    const level = count === 0 ? '' : count === 1 ? 'level-1' : count === 2 ? 'level-2' : count <= 4 ? 'level-3' : 'level-4';
    cells.push(
      <div
        key={key}
        className={`heatmap-cell ${level}`}
        title={`${key}: ${count} solved`}
      />
    );
  }
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(52, 12px)', gap: 3, overflowX: 'auto', paddingBottom: 8 }}>
      {cells}
    </div>
  );
}

export default function Progress() {
  const { xp, streak, solved, attempted, solveHistory, unlockedAchievements, getStatus, getLevel, ACHIEVEMENTS } = useApp();
  const { level, title, next } = getLevel();
  const allProblems = getAllProblems();
  const levelPct = next === Infinity ? 100 : Math.round((xp / next) * 100);

  const easy = allProblems.filter(p => p.difficulty === 'Easy');
  const medium = allProblems.filter(p => p.difficulty === 'Medium');
  const hard = allProblems.filter(p => p.difficulty === 'Hard');
  const easySolved = easy.filter(p => getStatus(p.id) === 'solved').length;
  const medSolved = medium.filter(p => getStatus(p.id) === 'solved').length;
  const hardSolved = hard.filter(p => getStatus(p.id) === 'solved').length;

  const totalSolveDays = Object.keys(solveHistory).length;
  const maxDay = Math.max(...Object.values(solveHistory), 0);

  return (
    <div className="animate-fade-in">
      <div className="mb-xl">
        <h1 className="page-title">Your Progress</h1>
        <p className="page-subtitle">Track your DSA mastery journey — XP, streaks, and achievements.</p>
      </div>

      {/* Level Card */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(34,211,238,0.05))',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-xl)',
        padding: '2rem',
        marginBottom: '2rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{
            width: 80, height: 80,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--brand-primary), var(--accent-cyan))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.75rem', fontWeight: 900, color: 'white',
            boxShadow: 'var(--shadow-glow-strong)',
            flexShrink: 0,
          }}>
            {level}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Current Level</div>
            <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 4 }}>
              <span className="gradient-text">{title}</span>
            </h2>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              {xp} XP · {next === Infinity ? 'Max Level Reached!' : `${next - xp} XP to Level ${level + 1}`}
            </div>
            <ProgressBar value={levelPct} />
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--accent-rose)' }}>{streak}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>🔥 Streak</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--accent-amber)' }}>{xp}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>⚡ Total XP</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--diff-easy)' }}>{solved.length}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>✅ Solved</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        {/* Difficulty Breakdown */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
          <h2 className="section-title mb-lg">Difficulty Breakdown</h2>
          {[
            { label: 'Easy', solved: easySolved, total: easy.length, color: 'var(--diff-easy)' },
            { label: 'Medium', solved: medSolved, total: medium.length, color: 'var(--diff-medium)' },
            { label: 'Hard', solved: hardSolved, total: hard.length, color: 'var(--diff-hard)' },
          ].map(d => (
            <div key={d.label} style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: d.color }}>{d.label}</span>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{d.solved} / {d.total}</span>
              </div>
              <ProgressBar value={d.total ? Math.round((d.solved / d.total) * 100) : 0} color={d.color} />
            </div>
          ))}
        </div>

        {/* Track Progress */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
          <h2 className="section-title mb-lg">Track Progress</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {TRACKS.map(track => {
              const tProbs = allProblems.filter(p => p.track === track.id);
              const tSolved = tProbs.filter(p => getStatus(p.id) === 'solved').length;
              const pct = tProbs.length ? Math.round((tSolved / tProbs.length) * 100) : 0;
              return (
                <div key={track.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>{track.icon} {track.title}</span>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{tSolved}/{tProbs.length}</span>
                  </div>
                  <ProgressBar value={pct} color={track.color} className="thin" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Activity Heatmap */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h2 className="section-title">Activity Heatmap</h2>
          <div style={{ display: 'flex', gap: '1rem', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
            <span>{totalSolveDays} active days</span>
            <span>Best: {maxDay} problems/day</span>
          </div>
        </div>
        <Heatmap solveHistory={solveHistory} />
        <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginTop: 8, fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
          <span>Less</span>
          {['', 'level-1', 'level-2', 'level-3', 'level-4'].map((l, i) => (
            <div key={i} className={`heatmap-cell ${l}`} style={{ flexShrink: 0 }} />
          ))}
          <span>More</span>
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h2 className="section-title mb-lg">
          <Trophy size={18} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
          Achievements
          <span style={{ marginLeft: 8, fontSize: 'var(--text-sm)', color: 'var(--text-muted)', fontWeight: 400 }}>
            {unlockedAchievements.length}/{ACHIEVEMENTS.length} unlocked
          </span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {ACHIEVEMENTS.map(a => {
            const unlocked = unlockedAchievements.includes(a.id);
            return (
              <div
                key={a.id}
                className="achievement"
                style={{ opacity: unlocked ? 1 : 0.4, filter: unlocked ? 'none' : 'grayscale(1)' }}
              >
                <div className="achievement-icon" style={{ background: unlocked ? 'var(--brand-glow)' : 'var(--bg-input)' }}>
                  {a.icon}
                </div>
                <div>
                  <div className="achievement-name">{a.title}</div>
                  <div className="achievement-desc">{a.desc}</div>
                </div>
                {unlocked && <CheckCircle2 size={16} color="var(--diff-easy)" style={{ marginLeft: 'auto', flexShrink: 0 }} />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

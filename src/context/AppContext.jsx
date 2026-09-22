import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';

const AppContext = createContext(null);

const ACHIEVEMENTS = [
  { id: 'first-solve', title: 'First Blood', desc: 'Solve your first problem', icon: '🎯', condition: (s) => s.solved.length >= 1 },
  { id: 'easy-5', title: 'Warm Up', desc: 'Solve 5 Easy problems', icon: '🔥', condition: (s) => s.solved.filter(id => s.problemMap[id]?.difficulty === 'Easy').length >= 5 },
  { id: 'medium-5', title: 'Getting Serious', desc: 'Solve 5 Medium problems', icon: '⚡', condition: (s) => s.solved.filter(id => s.problemMap[id]?.difficulty === 'Medium').length >= 5 },
  { id: 'hard-1', title: 'Hard Hitter', desc: 'Solve your first Hard problem', icon: '💎', condition: (s) => s.solved.filter(id => s.problemMap[id]?.difficulty === 'Hard').length >= 1 },
  { id: 'streak-3', title: '3-Day Streak', desc: 'Solve problems 3 days in a row', icon: '🗓️', condition: (s) => s.streak >= 3 },
  { id: 'streak-7', title: 'Week Warrior', desc: '7-day streak', icon: '🏆', condition: (s) => s.streak >= 7 },
  { id: 'xp-100', title: 'Century', desc: 'Earn 100 XP', icon: '💯', condition: (s) => s.xp >= 100 },
  { id: 'xp-500', title: 'XP Master', desc: 'Earn 500 XP', icon: '🚀', condition: (s) => s.xp >= 500 },
  { id: 'solved-10', title: 'On a Roll', desc: 'Solve 10 problems', icon: '🎲', condition: (s) => s.solved.length >= 10 },
  { id: 'solved-25', title: 'Consistent', desc: 'Solve 25 problems', icon: '🌟', condition: (s) => s.solved.length >= 25 },
];

const XP_MAP = { Easy: 10, Medium: 25, Hard: 50 };

function loadState() {
  try {
    const raw = Cookies.get('dsafy_state');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveState(state) {
  try {
    Cookies.set('dsafy_state', JSON.stringify(state), { expires: 365 });
  } catch {}
}

export function AppProvider({ children }) {
  const [solved, setSolved] = useState(() => loadState()?.solved || []);
  const [attempted, setAttempted] = useState(() => loadState()?.attempted || []);
  const [xp, setXp] = useState(() => loadState()?.xp || 0);
  const [streak, setStreak] = useState(() => loadState()?.streak || 0);
  const [lastDate, setLastDate] = useState(() => loadState()?.lastDate || null);
  const [unlockedAchievements, setUnlockedAchievements] = useState(() => loadState()?.achievements || []);
  const [toast, setToast] = useState(null);
  const [solveHistory, setSolveHistory] = useState(() => loadState()?.solveHistory || {});
  const [problemMap, setProblemMap] = useState({});

  // Load problem map for achievement checking
  useEffect(() => {
    import('../data/problems.js').then(m => {
      const map = {};
      Object.values(m.PROBLEMS).forEach(p => { map[p.id] = p; });
      setProblemMap(map);
    });
  }, []);

  // Persist to localStorage
  useEffect(() => {
    saveState({ solved, attempted, xp, streak, lastDate, achievements: unlockedAchievements, solveHistory });
  }, [solved, attempted, xp, streak, lastDate, unlockedAchievements, solveHistory]);

  // Update streak
  const updateStreak = useCallback(() => {
    const today = new Date().toDateString();
    if (lastDate === today) return;
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (lastDate === yesterday) {
      setStreak(s => s + 1);
    } else if (lastDate !== today) {
      setStreak(1);
    }
    setLastDate(today);
  }, [lastDate]);

  // Show toast
  const showToast = useCallback((message, type = 'success', icon = '🎉') => {
    setToast({ message, type, icon });
    setTimeout(() => setToast(null), 3500);
  }, []);

  // Check achievements
  const checkAchievements = useCallback((newState) => {
    ACHIEVEMENTS.forEach(a => {
      if (!unlockedAchievements.includes(a.id) && a.condition(newState)) {
        setUnlockedAchievements(prev => [...prev, a.id]);
        setTimeout(() => showToast(`Achievement unlocked: ${a.title}`, 'achievement', a.icon), 500);
      }
    });
  }, [unlockedAchievements, showToast]);

  const solveProblem = useCallback((problemId, difficulty) => {
    if (solved.includes(problemId)) return;
    const earned = XP_MAP[difficulty] || 10;
    const newSolved = [...solved, problemId];
    const newXp = xp + earned;
    const today = new Date().toDateString();
    const newHistory = { ...solveHistory, [today]: (solveHistory[today] || 0) + 1 };

    setSolved(newSolved);
    setXp(newXp);
    setSolveHistory(newHistory);
    updateStreak();

    // Remove from attempted
    setAttempted(prev => prev.filter(id => id !== problemId));

    showToast(`+${earned} XP — ${difficulty} problem solved!`, 'success', difficulty === 'Hard' ? '💎' : difficulty === 'Medium' ? '⚡' : '✅');

    // Check achievements
    checkAchievements({ solved: newSolved, xp: newXp, streak, problemMap });
  }, [solved, xp, streak, solveHistory, problemMap, updateStreak, showToast, checkAchievements]);

  const markAttempted = useCallback((problemId) => {
    if (!solved.includes(problemId) && !attempted.includes(problemId)) {
      setAttempted(prev => [...prev, problemId]);
    }
  }, [solved, attempted]);

  const getStatus = useCallback((problemId) => {
    if (solved.includes(problemId)) return 'solved';
    if (attempted.includes(problemId)) return 'attempted';
    return 'unsolved';
  }, [solved, attempted]);

  const getTrackProgress = useCallback((trackProblems) => {
    if (!trackProblems?.length) return 0;
    const s = trackProblems.filter(id => solved.includes(id)).length;
    return Math.round((s / trackProblems.length) * 100);
  }, [solved]);

  const getLevel = () => {
    if (xp < 100) return { level: 1, title: 'Novice', next: 100 };
    if (xp < 300) return { level: 2, title: 'Apprentice', next: 300 };
    if (xp < 600) return { level: 3, title: 'Explorer', next: 600 };
    if (xp < 1000) return { level: 4, title: 'Solver', next: 1000 };
    if (xp < 1500) return { level: 5, title: 'Expert', next: 1500 };
    if (xp < 2500) return { level: 6, title: 'Master', next: 2500 };
    return { level: 7, title: 'Legend', next: Infinity };
  };

  const value = {
    solved, attempted, xp, streak, unlockedAchievements, toast, solveHistory,
    solveProblem, markAttempted, getStatus, getTrackProgress, getLevel,
    ACHIEVEMENTS, XP_MAP,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};

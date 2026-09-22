import { useApp } from '../context/AppContext';

export default function Progress() {
  const { xp, streak, solved, attempted, getLevel } = useApp();
  const { level, title, next } = getLevel();

  const levelProgress = next === Infinity ? 100 : Math.round((xp / next) * 100);

  return (
    <div className="max-w-4xl mx-auto py-12 animate-fade-in">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black tracking-tighter mb-4">Your Progress</h1>
        <p className="text-gray-500 font-medium">Track your learning journey and algorithmic mastery.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="p-8 border border-gray-200 rounded-2xl bg-white shadow-sm">
          <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Current Level</div>
          <div className="flex justify-between items-end mb-2">
            <div className="text-3xl font-black">{title}</div>
            <div className="text-xl font-bold text-gray-400">Lv. {level}</div>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
            <div className="h-full bg-black" style={{ width: `${levelProgress}%` }} />
          </div>
          <div className="text-xs font-bold text-gray-500 text-right">
            {xp} / {next === Infinity ? 'MAX' : next} XP
          </div>
        </div>

        <div className="p-8 border border-gray-200 rounded-2xl bg-white shadow-sm flex flex-col justify-center">
          <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Current Streak</div>
          <div className="text-6xl font-black tracking-tighter">{streak} <span className="text-2xl text-gray-400">days</span></div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { label: 'Total Solved', value: solved.length },
          { label: 'Total Attempted', value: attempted.length },
          { label: 'Total XP', value: xp },
          { label: 'Global Rank', value: 'N/A' },
        ].map((s, i) => (
          <div key={i} className="p-6 bg-gray-50 border border-gray-200 rounded-xl text-center">
            <div className="text-3xl font-black tracking-tight">{s.value}</div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mt-2">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="p-8 border border-gray-200 rounded-2xl bg-white shadow-sm">
        <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Activity Heatmap</div>
        <div className="flex justify-center items-center h-32 border border-gray-100 rounded bg-gray-50 text-gray-400 text-sm font-bold">
          [ Heatmap Data Not Available ]
        </div>
      </div>
    </div>
  );
}

import { useApp } from '../context/AppContext';
import { Flame, Star } from 'lucide-react';

export default function Navbar() {
  const { xp, streak } = useApp();

  return (
    <div className="flex items-center gap-3 text-xs font-semibold text-[var(--app-ink)] ml-auto w-full justify-end">
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--app-soft)] rounded-lg border border-[var(--app-hairline)]">
        <Flame className="size-3.5 text-orange-500" />
        {streak} Day Streak
      </div>
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--app-soft)] rounded-lg border border-[var(--app-hairline)]">
        <Star className="size-3.5 text-yellow-500" />
        {xp} XP
      </div>
    </div>
  );
}

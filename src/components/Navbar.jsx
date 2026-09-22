import { Flame, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { xp, streak } = useApp();

  return (
    <div className="flex items-center gap-2">
      <Chip icon={<Flame size={12} className="text-orange-400" />} label={`${streak}d streak`} />
      <Chip icon={<Star size={12} className="text-yellow-400" />} label={`${xp} XP`} />
    </div>
  );
}

function Chip({ icon, label }) {
  return (
    <div
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium"
      style={{ background: 'var(--app-soft)', color: 'var(--app-muted)', border: '1px solid var(--app-hairline)' }}
    >
      {icon}
      {label}
    </div>
  );
}

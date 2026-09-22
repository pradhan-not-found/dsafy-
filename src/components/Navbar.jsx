import { NavLink, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { xp, streak, getLevel } = useApp();
  const { level, title } = getLevel();

  return (
    <nav className="fixed top-0 left-0 right-0 h-14 bg-white/90 backdrop-blur-md border-b border-gray-200 flex items-center px-6 z-50 justify-between">
      <Link to="/" className="text-xl font-black tracking-tighter text-black flex items-center gap-2">
        <span className="bg-black text-white w-6 h-6 flex items-center justify-center rounded-sm text-sm">D</span>
        DSAfy
      </Link>

      <div className="flex items-center gap-6 text-sm font-medium">
        <NavLink to="/" end className={({ isActive }) => `transition-colors ${isActive ? 'text-black font-bold' : 'text-gray-500 hover:text-black'}`}>
          Dashboard
        </NavLink>
        <NavLink to="/tracks" className={({ isActive }) => `transition-colors ${isActive ? 'text-black font-bold' : 'text-gray-500 hover:text-black'}`}>
          Tracks
        </NavLink>
        <NavLink to="/problems" className={({ isActive }) => `transition-colors ${isActive ? 'text-black font-bold' : 'text-gray-500 hover:text-black'}`}>
          Problems
        </NavLink>
        <NavLink to="/progress" className={({ isActive }) => `transition-colors ${isActive ? 'text-black font-bold' : 'text-gray-500 hover:text-black'}`}>
          Progress
        </NavLink>
      </div>

      <div className="flex items-center gap-4 text-xs font-bold text-gray-800">
        <div className="px-3 py-1 bg-gray-100 rounded-full border border-gray-200">
          Streak: {streak}
        </div>
        <div className="px-3 py-1 bg-gray-100 rounded-full border border-gray-200">
          XP: {xp}
        </div>
        <div className="px-3 py-1 border border-black rounded-full text-black bg-white">
          Lv.{level} {title}
        </div>
      </div>
    </nav>
  );
}

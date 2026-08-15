import { Dumbbell, LogOut, User } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-brand-dark/95 backdrop-blur-md border-b border-brand-border px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
          <div className="w-9 h-9 rounded-xl bg-brand-red flex items-center justify-center text-white shadow-md shadow-red-950/50">
            <Dumbbell className="w-5 h-5 -rotate-45" />
          </div>
          <span className="text-xl font-black tracking-wider uppercase text-white">
            MY <span className="text-brand-red">FITNESS</span>
          </span>
        </div>

        {/* Right User Bar */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-brand-card border border-brand-border hover:border-brand-red text-xs font-bold uppercase transition-all"
          >
            <User className="w-4 h-4 text-brand-red" />
            <span className="hidden sm:inline text-white">{user?.username || 'Athlete'}</span>
          </button>
          <button
            onClick={logout}
            className="p-2 rounded-xl bg-brand-card border border-brand-border hover:border-brand-red text-neutral-400 hover:text-brand-red transition-all"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
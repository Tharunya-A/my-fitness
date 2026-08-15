import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Dumbbell, HeartPulse, CreditCard, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext.jsx';

export const Sidebar = () => {
  const { user } = useAuth();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Workouts', path: '/workouts', icon: Dumbbell },
    { label: 'Health Vault', path: '/health', icon: HeartPulse },
    { label: 'Plans & Premium', path: '/billing', icon: CreditCard },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-brand-card border-r border-brand-border p-4 min-h-[calc(100vh-61px)]">
      <div className="space-y-1 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-bold uppercase text-xs tracking-wider transition-all ${
                  isActive
                    ? 'bg-brand-red text-white shadow-lg shadow-red-950/50'
                    : 'text-neutral-400 hover:bg-brand-dark hover:text-white'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Subscription Status Card */}
      <div className="p-4 rounded-xl bg-brand-dark border border-brand-border mt-auto">
        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck className={`w-4 h-4 ${user?.isPremium ? 'text-brand-red' : 'text-neutral-500'}`} />
          <span className="text-xs font-black uppercase text-white">
            {user?.isPremium ? 'PRO MEMBER' : 'FREE ATHLETE'}
          </span>
        </div>
        <p className="text-[11px] text-neutral-400">
          {user?.isPremium ? 'All premium features unlocked' : 'Upgrade for advanced workout logs'}
        </p>
      </div>
    </aside>
  );
};
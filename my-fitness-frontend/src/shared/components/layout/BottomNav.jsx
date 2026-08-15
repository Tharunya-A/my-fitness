import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Dumbbell, HeartPulse, CreditCard } from 'lucide-react';

export const BottomNav = () => {
  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Workouts', path: '/workouts', icon: Dumbbell },
    { label: 'Health', path: '/health', icon: HeartPulse },
    { label: 'Subscription', path: '/billing', icon: CreditCard },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-brand-dark/95 backdrop-blur-md border-t border-brand-border px-2 py-2">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
                  isActive
                    ? 'text-brand-red font-bold'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
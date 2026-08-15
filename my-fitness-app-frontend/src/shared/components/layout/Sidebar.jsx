import React from 'react';
import { NavLink } from 'react-router-dom';
import { Dumbbell, Activity, CreditCard, User, ShieldCheck } from 'lucide-react';
//import { useAuth } from '../../context/AuthContext';
import { useAuth } from '../../hooks/useAuth';

export const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user } = useAuth();

  const navItems = [
    { label: 'Workouts', path: '/workouts', icon: Dumbbell },
    { label: 'Health & Reports', path: '/health', icon: Activity },
    { label: 'Billing & Plan', path: '/billing', icon: CreditCard },
  ];

  return (
    <aside
      className={`fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out md:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full justify-between p-4">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {user && (
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center gap-3">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
              <User className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user.username || 'User'}
              </p>
              <div className="flex items-center gap-1 text-xs text-emerald-600">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Active Account</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
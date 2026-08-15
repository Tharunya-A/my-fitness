import React from 'react';
//import { useAuth } from '../../context/AuthContext';
import { useAuth } from '../../hooks/useAuth';
import { LogOut, User, Dumbbell, Activity, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/workouts" className="flex items-center gap-2 font-bold text-xl text-indigo-600">
          <Dumbbell className="w-6 h-6" />
          <span>FitTrack</span>
        </Link>

        {user && (
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-4 text-sm font-medium text-gray-600">
              <Link to="/workouts" className="hover:text-indigo-600 flex items-center gap-1.5 py-1">
                <Dumbbell className="w-4 h-4" /> Workouts
              </Link>
              <Link to="/health" className="hover:text-indigo-600 flex items-center gap-1.5 py-1">
                <Activity className="w-4 h-4" /> Health
              </Link>
              <Link to="/billing" className="hover:text-indigo-600 flex items-center gap-1.5 py-1">
                <CreditCard className="w-4 h-4" /> Billing
              </Link>
            </nav>

            <div className="flex items-center gap-3 border-l pl-4 border-gray-200">
              <span className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                <User className="w-4 h-4" /> {user.username || user.email}
              </span>
              <button
                onClick={logout}
                className="p-1.5 text-gray-500 hover:text-red-600 rounded-lg hover:bg-gray-100"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
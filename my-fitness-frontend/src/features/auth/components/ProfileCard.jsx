import { User, Mail, ShieldCheck, Calendar, LogOut } from 'lucide-react';
import { Button } from '../../../shared/components/ui/Button.jsx';

export const ProfileCard = ({ user, onLogout }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm max-w-md w-full space-y-6">
      {/* Profile Header */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-brand-red font-black text-2xl uppercase">
          {user?.username ? user.username[0] : 'A'}
        </div>
        <div>
          <h2 className="text-xl font-black text-gray-900 uppercase tracking-wide">
            {user?.username || 'Athlete'}
          </h2>
          <span className="inline-flex items-center gap-1.5 mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-red-50 text-brand-red border border-red-100">
            <ShieldCheck className="w-3.5 h-3.5" />
            {user?.isPremium ? 'PRO ATHLETE' : 'FREE MEMBER'}
          </span>
        </div>
      </div>

      {/* Details List */}
      <div className="space-y-3 pt-4 border-t border-gray-100 text-xs">
        <div className="flex items-center justify-between text-gray-600">
          <span className="flex items-center gap-2 font-bold uppercase tracking-wider">
            <Mail className="w-4 h-4 text-gray-400" /> Email
          </span>
          <span className="font-semibold text-gray-900">{user?.email || 'N/A'}</span>
        </div>

        <div className="flex items-center justify-between text-gray-600">
          <span className="flex items-center gap-2 font-bold uppercase tracking-wider">
            <User className="w-4 h-4 text-gray-400" /> Member Role
          </span>
          <span className="font-semibold text-gray-900 uppercase">{user?.role || 'User'}</span>
        </div>

        <div className="flex items-center justify-between text-gray-600">
          <span className="flex items-center gap-2 font-bold uppercase tracking-wider">
            <Calendar className="w-4 h-4 text-gray-400" /> Joined
          </span>
          <span className="font-semibold text-gray-900">
            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Active Member'}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-2">
        <Button
          onClick={onLogout}
          className="w-full py-3 bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-200 text-gray-700 hover:text-brand-red font-bold uppercase text-xs tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </Button>
      </div>
    </div>
  );
};
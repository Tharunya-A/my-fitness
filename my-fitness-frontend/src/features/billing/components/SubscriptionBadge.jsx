import { ShieldCheck, Zap } from 'lucide-react';

export const SubscriptionBadge = ({ isPremium = false, className = '' }) => {
  if (isPremium) {
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase bg-red-50 text-brand-red border border-red-200 shadow-sm ${className}`}>
        <Zap className="w-3.5 h-3.5 fill-brand-red" /> PRO ATHLETE
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase bg-gray-100 text-gray-600 border border-gray-200 ${className}`}>
      <ShieldCheck className="w-3.5 h-3.5 text-gray-400" /> FREE PLAN
    </span>
  );
};
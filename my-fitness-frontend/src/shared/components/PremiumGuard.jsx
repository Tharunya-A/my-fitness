import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';
import { Button } from './Button.jsx';
import { Lock, Crown, Sparkles } from 'lucide-react';

export const PremiumGuard = ({
  children,
  fallbackTitle = 'Pro Athlete Exclusive',
  fallbackDescription = 'Upgrade your plan to unlock AI blood report parsing, custom workout generators, and deep biomarker analytics.',
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // If user has Pro membership, render children directly
  if (user?.isPremium) {
    return <>{children}</>;
  }

  // Fallback UI when feature is locked
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm relative overflow-hidden">
      <div className="absolute -right-8 -top-8 w-24 h-24 bg-red-100/50 rounded-full blur-xl pointer-events-none" />

      <div className="max-w-md mx-auto space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-red-50 text-brand-red flex items-center justify-center mx-auto border border-red-100">
          <Crown className="w-6 h-6" />
        </div>

        <div className="space-y-1">
          <h3 className="text-base font-black uppercase text-gray-900 tracking-wide flex items-center justify-center gap-2">
            <Lock className="w-4 h-4 text-brand-red" /> {fallbackTitle}
          </h3>
          <p className="text-xs font-medium text-gray-500 leading-relaxed">
            {fallbackDescription}
          </p>
        </div>

        <div className="pt-2">
          <Button
            onClick={() => navigate('/billing')}
            variant="primary"
            className="w-full sm:w-auto"
          >
            <Sparkles className="w-4 h-4" /> Upgrade to Pro
          </Button>
        </div>
      </div>
    </div>
  );
};
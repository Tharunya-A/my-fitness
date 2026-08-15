import { useAuth } from '../../../context/AuthContext.jsx';
import { PricingCard } from '../components/PricingCard.jsx';
import { SubscriptionBadge } from '../components/SubscriptionBadge.jsx';
import { useSubscription } from '../hooks/useSubscription.js';
import { ShieldCheck, Zap, AlertCircle } from 'lucide-react';

export const SubscriptionPage = () => {
  const { user } = useAuth();
  const { subscribe, isLoading, error } = useSubscription();

  const handleSelectPlan = (planTier) => {
    subscribe(planTier);
  };

  const freeFeatures = [
    'Basic workout logging',
    'Standard exercise database access',
    'Manual metric entries',
    'Community support',
  ];

  const proFeatures = [
    'Unlimited AI Blood Report Parsing',
    'Dynamic Custom Workout Generator',
    'Advanced Biomarker Analytics & Charts',
    'Priority Support & Trainer Connect',
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-gray-900">
              MEMBERSHIP <span className="text-brand-red">PLANS</span>
            </h1>
            <SubscriptionBadge isPremium={user?.isPremium} />
          </div>
          <p className="text-xs text-gray-500 font-medium">
            Unlock maximum performance with elite fitness tracking and AI health intelligence.
          </p>
        </div>

        {user?.isPremium && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 border border-red-100 text-brand-red text-xs font-bold uppercase">
            <Zap className="w-4 h-4 fill-brand-red" /> Active Subscription
          </div>
        )}
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-brand-red text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Free Plan */}
        <PricingCard
          title="FREE ATHLETE"
          price="₹0"
          period="/forever"
          description="Essential tools for logging daily workouts and manually tracking health stats."
          features={freeFeatures}
          isPopular={false}
          isCurrentPlan={!user?.isPremium}
          onSelect={() => {}}
          isLoading={false}
        />

        {/* Pro Plan */}
        <PricingCard
          title="PRO ATHLETE"
          price="₹499"
          period="/month"
          description="Full access to AI blood report parsing, custom workout planner, and deep health analytics."
          features={proFeatures}
          isPopular={true}
          isCurrentPlan={user?.isPremium}
          onSelect={() => handleSelectPlan('PRO')}
          isLoading={isLoading}
        />
      </div>

      {/* Security & Guarantee Note */}
      <div className="text-center pt-4">
        <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-gray-400" /> SECURE 256-BIT ENCRYPTED PAYMENTS VIA RAZORPAY
        </p>
      </div>
    </div>
  );
};
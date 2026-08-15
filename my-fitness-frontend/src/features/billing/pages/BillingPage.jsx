import { useState } from 'react';
import { CreditCard, Check, ShieldCheck, Zap } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext.jsx';

export const BillingPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const plans = [
    {
      id: 'monthly_pro',
      name: 'PRO ATHLETE',
      price: '₹499',
      period: '/ month',
      features: [
        'Unlimited Custom Workouts',
        'Advanced Set/Rep Analytics',
        'AI Medical PDF Report Parser',
        'Priority Gym Support',
      ],
      popular: true,
    },
    {
      id: 'annual_pro',
      name: 'ELITE ANNUAL',
      price: '₹4,999',
      period: '/ year',
      features: [
        'Everything in Pro Athlete',
        '2 Months Free Included',
        'Custom Nutrition Targets',
        'Personal Trainer Access',
      ],
      popular: false,
    },
  ];

  const handleCheckout = (plan) => {
    setLoading(true);
    // Simulating Razorpay SDK Integration Trigger
    setTimeout(() => {
      alert(`Razorpay Checkout initialized for ${plan.name} (${plan.price})`);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black uppercase tracking-wider text-white">
          MY FITNESS <span className="text-brand-red">MEMBERSHIP</span>
        </h1>
        <p className="text-neutral-400 text-xs font-semibold uppercase tracking-widest">
          Upgrade your plan to unlock full potential
        </p>
      </div>

      {/* Current Plan Status */}
      <div className="bg-brand-card border border-brand-border p-4 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldCheck className={`w-6 h-6 ${user?.isPremium ? 'text-brand-red' : 'text-neutral-500'}`} />
          <div>
            <span className="text-xs font-bold uppercase text-neutral-400">Current Status</span>
            <h4 className="text-sm font-black text-white uppercase">{user?.isPremium ? 'Pro Member' : 'Free Athlete Plan'}</h4>
          </div>
        </div>
        <span className="text-[10px] font-bold uppercase px-3 py-1 rounded-full bg-brand-dark border border-brand-border text-brand-red">
          Active
        </span>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-brand-card border rounded-2xl p-6 flex flex-col justify-between space-y-6 ${
              plan.popular ? 'border-brand-red shadow-2xl shadow-red-950/30' : 'border-brand-border'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 right-6 bg-brand-red text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-md">
                Most Popular
              </span>
            )}

            <div>
              <h3 className="text-lg font-black uppercase text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-brand-red" /> {plan.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-black text-white">{plan.price}</span>
                <span className="text-xs text-neutral-400 uppercase font-bold">{plan.period}</span>
              </div>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-neutral-300">
                    <Check className="w-4 h-4 text-brand-red shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleCheckout(plan)}
              disabled={loading}
              className="w-full py-3.5 bg-brand-red hover:bg-brand-red-hover text-white font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-red-950/40 flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" /> Subscribe Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
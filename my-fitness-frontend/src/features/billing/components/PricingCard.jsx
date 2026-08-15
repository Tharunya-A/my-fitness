import { Check, Zap, Shield } from 'lucide-react';
import { Button } from '../../../shared/components/ui/Button.jsx';

export const PricingCard = ({
  title = 'PRO ATHLETE',
  price = '₹499',
  period = '/month',
  description = 'Unlock advanced AI workout plans, blood report analytics & direct trainer chat.',
  features = [],
  isPopular = false,
  isCurrentPlan = false,
  onSelect,
  isLoading = false,
}) => {
  return (
    <div
      className={`relative bg-white rounded-2xl p-6 md:p-8 border transition-all duration-200 flex flex-col justify-between ${
        isPopular
          ? 'border-brand-red shadow-xl ring-2 ring-red-500/20'
          : 'border-gray-200 shadow-sm hover:border-gray-300'
      }`}
    >
      {isPopular && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-red text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
          Most Popular
        </span>
      )}

      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-black uppercase text-gray-900 tracking-wide flex items-center gap-2">
            {isPopular ? <Zap className="w-5 h-5 text-brand-red" /> : <Shield className="w-5 h-5 text-gray-400" />}
            {title}
          </h3>
        </div>

        <p className="text-xs text-gray-500 mb-6">{description}</p>

        {/* Pricing */}
        <div className="flex items-baseline gap-1 mb-6">
          <span className="text-4xl font-black text-gray-900">{price}</span>
          <span className="text-xs font-bold text-gray-500 uppercase">{period}</span>
        </div>

        {/* Features list */}
        <ul className="space-y-3 mb-8 text-xs font-semibold text-gray-700">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2.5">
              <div className="p-1 rounded-md bg-red-50 text-brand-red shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Button Action */}
      <Button
        onClick={onSelect}
        disabled={isCurrentPlan || isLoading}
        className={`w-full py-3.5 rounded-xl font-bold uppercase text-xs tracking-wider transition-all ${
          isCurrentPlan
            ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
            : isPopular
            ? 'bg-brand-red hover:bg-brand-red-hover text-white shadow-lg shadow-red-500/20'
            : 'bg-gray-900 hover:bg-black text-white'
        }`}
      >
        {isCurrentPlan ? 'Current Active Plan' : isLoading ? 'Processing...' : `Upgrade to ${title}`}
      </Button>
    </div>
  );
};
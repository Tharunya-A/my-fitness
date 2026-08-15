import React from 'react';
import { Check } from 'lucide-react';

export const PricingCard = ({ title, price, features, isPopular, onSelect, loading }) => {
  return (
    <div className={`relative p-6 rounded-2xl bg-white border ${isPopular ? 'border-indigo-600 shadow-xl ring-2 ring-indigo-600/20' : 'border-gray-200 shadow-sm'}`}>
      {isPopular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full uppercase tracking-wider">
          Most Popular
        </span>
      )}
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <div className="my-4">
        <span className="text-4xl font-extrabold text-gray-900">${price}</span>
        <span className="text-gray-500 text-sm">/month</span>
      </div>
      <ul className="space-y-3 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
            <Check className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={onSelect}
        disabled={loading}
        className={`w-full py-2.5 rounded-xl font-medium transition-colors ${
          isPopular
            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
        }`}
      >
        {loading ? 'Processing...' : 'Choose Plan'}
      </button>
    </div>
  );
};
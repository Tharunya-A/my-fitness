import { Modal } from '../../../shared/components/ui/Modal.jsx';
import { Lock, Zap, Check } from 'lucide-react';
import { Button } from '../../../shared/components/ui/Button.jsx';

export const PaywallModal = ({ isOpen, onClose, onUpgrade, isLoading = false }) => {
  if (!isOpen) return null;

  const proFeatures = [
    'Unlimited AI Blood Report Parsing',
    'Custom Dynamic Workout Planner',
    'Export Progress Data & Analytics',
    'Priority Support',
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="">
      <div className="text-center space-y-5 p-2">
        {/* Icon Header */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-50 border border-red-100 text-brand-red mb-1">
          <Lock className="w-8 h-8" />
        </div>

        <div>
          <h2 className="text-2xl font-black uppercase text-gray-900 tracking-wide">
            PRO FEATURE LOCKED
          </h2>
          <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
            Upgrade your SLAM Fitness plan to unlock complete medical analytics and custom workouts.
          </p>
        </div>

        {/* Feature List */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-left space-y-2.5">
          {proFeatures.map((feat, index) => (
            <div key={index} className="flex items-center gap-2 text-xs font-semibold text-gray-800">
              <div className="p-0.5 rounded bg-red-100 text-brand-red">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span>{feat}</span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 space-y-2">
          <Button
            onClick={onUpgrade}
            disabled={isLoading}
            className="w-full py-3.5 bg-brand-red hover:bg-brand-red-hover text-white font-bold uppercase text-xs tracking-wider rounded-xl shadow-lg shadow-red-500/20 flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4 fill-white" />
            {isLoading ? 'Opening Checkout...' : 'Unlock PRO for ₹499/mo'}
          </Button>

          <button
            onClick={onClose}
            className="w-full py-2 text-xs font-bold uppercase text-gray-400 hover:text-gray-600 transition-all"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </Modal>
  );
};
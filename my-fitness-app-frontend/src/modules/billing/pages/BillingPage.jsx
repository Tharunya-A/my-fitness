import React, { useState } from 'react';
import { axiosClient } from '../../../shared/api/axiosClient';
import { API_ENDPOINTS } from '../../../config/api.config';
import { ENV } from '../../../config/env.config';
import { PricingCard } from '../components/PricingCard';

export const BillingPage = () => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.post(API_ENDPOINTS.BILLING.CHECKOUT);
      const { orderId, amount, currency, key } = response.data;

      const options = {
        key: ENV.RAZORPAY_KEY_ID || key,
        amount,
        currency,
        name: 'FitTrack Pro',
        description: 'Unlock Biomarkers & Pro Routines',
        order_id: orderId,
        handler: async (paymentResponse) => {
          await axiosClient.post(API_ENDPOINTS.BILLING.VERIFY, paymentResponse);
          alert('Subscription upgraded to Premium!');
        },
        theme: { color: '#4F46E5' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert(err?.response?.data?.message || 'Checkout initialization failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-gray-900">Choose Your Plan</h2>
        <p className="text-gray-500 mt-2">Upgrade anytime to access advanced health telemetry.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        <PricingCard
          title="Starter"
          price="0"
          features={['7-Day Workout Tracker', 'Basic Profile Metrics', 'Standard Support']}
          onSelect={() => {}}
        />
        <PricingCard
          title="Pro Athlete"
          price="19"
          isPopular
          loading={loading}
          features={['Unlimited Workout Plans', 'Medical Lab Report Parser', 'Biomarker Telemetry Charts', 'Priority Support']}
          onSelect={handleCheckout}
        />
      </div>
    </div>
  );
};
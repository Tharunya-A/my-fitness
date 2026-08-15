import { useState } from 'react';
import { createOrder, verifyPayment, getSubscriptionStatus } from '../api/billing.api.js';
import { useRazorpay } from '../../../shared/hooks/useRazorpay.js';

export const useSubscription = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { openCheckout } = useRazorpay();

  const handleSubscribe = async (planTier = 'PRO') => {
    setIsLoading(true);
    setError(null);
    try {
      // 1. Create order from backend
      const orderData = await createOrder({ plan: planTier });
      
      const options = {
        key: orderData.keyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'SLAM FITNESS',
        description: `${planTier} Membership Subscription`,
        order_id: orderData.id,
        handler: async (response) => {
          try {
            // 2. Verify payment on backend
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            window.location.reload(); // Refresh session to reflect Pro status
          } catch (verifyErr) {
            setError(verifyErr.message || 'Payment verification failed.');
          }
        },
        prefill: {
          name: orderData.user?.username || '',
          email: orderData.user?.email || '',
        },
        theme: {
          color: '#E50914',
        },
      };

      // 3. Trigger Razorpay Modal
      openCheckout(options);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to initiate checkout.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStatus = async () => {
    setIsLoading(true);
    try {
      const status = await getSubscriptionStatus();
      return status;
    } catch (err) {
      setError(err.message || 'Failed to load subscription status.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    subscribe: handleSubscribe,
    fetchStatus,
    isLoading,
    error,
  };
};
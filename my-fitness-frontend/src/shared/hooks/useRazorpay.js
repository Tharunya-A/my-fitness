import { useState, useEffect } from 'react';

export const useRazorpay = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setIsLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openCheckout = (options) => {
    if (!isLoaded || !window.Razorpay) {
      alert('Razorpay SDK failed to load. Please check your connection.');
      return;
    }
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return { openCheckout, isLoaded };
};
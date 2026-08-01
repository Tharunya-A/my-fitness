import { z } from 'zod';

export const checkoutSchema = z.object({
  amount: z.number().int().positive().default(99900),
  currency: z.string().default('INR'),
  plan: z.string().default('premium_monthly'),
});

export const verifySchema = z.object({
  orderId: z.string().min(1),
  paymentId: z.string().min(1),
  signature: z.string().min(1),
});

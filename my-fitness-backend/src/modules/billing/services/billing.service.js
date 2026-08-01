import crypto from 'crypto';
import Razorpay from 'razorpay';
import { env } from '../../../config/env.config.js';
import { billingRepository } from '../repositories/billing.repository.js';
import {
  BillingInitializationError,
  PaymentVerificationError,
  PremiumRequiredError,
  WebhookVerificationError,
} from '../errors/billing.errors.js';

const getRazorpayClient = () => {
  if (!env.RAZORPAY_KEY_ID || !env.RAZORPAY_KEY_SECRET) {
    return null;
  }

  return new Razorpay({
    key_id: env.RAZORPAY_KEY_ID,
    key_secret: env.RAZORPAY_KEY_SECRET,
  });
};

const signPayment = (orderId, paymentId) => {
  return crypto
    .createHmac('sha256', env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');
};

export const billingService = {
  async initiateCheckout(userId, input) {
    const razorpay = getRazorpayClient();
    if (!razorpay) {
      throw new BillingInitializationError('Razorpay credentials are not configured');
    }

    const amount = input.amount ?? 99900;
    const currency = input.currency ?? 'INR';
    const receipt = `rcpt_${userId}_${Date.now()}`;

    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt,
      notes: {
        userId: String(userId),
        plan: input.plan ?? 'premium_monthly',
      },
    });

    await billingRepository.createSubscriptionRecord({
      userId,
      orderId: order.id,
      paymentId: null,
      amount,
      currency,
      receipt,
      status: 'pending',
    });

    return {
      order,
      checkout: {
        key: env.RAZORPAY_KEY_ID,
        amount,
        currency,
        plan: input.plan ?? 'premium_monthly',
      },
    };
  },

  async verifyPayment(userId, input) {
    const expectedSignature = signPayment(input.orderId, input.paymentId);
    if (expectedSignature !== input.signature) {
      throw new PaymentVerificationError('Invalid Razorpay signature');
    }

    const subscription = await billingRepository.findSubscriptionByOrderId(input.orderId);
    if (!subscription) {
      throw new PaymentVerificationError('Order record not found');
    }

    await billingRepository.updateSubscriptionRecord({
      subscriptionId: subscription.id,
      fields: {
        payment_id: input.paymentId,
        signature: input.signature,
        status: 'paid',
        payload: {
          orderId: input.orderId,
          paymentId: input.paymentId,
          verifiedAt: new Date().toISOString(),
        },
      },
    });

    await billingRepository.markUserPremium(userId, true);

    return {
      status: 'paid',
      orderId: input.orderId,
      paymentId: input.paymentId,
      premium: true,
    };
  },

  async getSubscriptionStatus(userId) {
    const subscription = await billingRepository.findLatestSubscriptionByUser(userId);
    const user = await billingRepository.getUserPremiumState(userId);

    return {
      subscription,
      isPremium: user?.is_premium ?? false,
    };
  },

  async requirePremium(userId) {
    const user = await billingRepository.getUserPremiumState(userId);
    if (!user || user.is_premium !== true) {
      throw new PremiumRequiredError();
    }

    return true;
  },

  async handleWebhook(req) {
    const signature = req.headers['x-razorpay-signature'];
    const rawBodyBuffer = Buffer.isBuffer(req.body)
      ? req.body
      : req.rawBody || Buffer.from(JSON.stringify(req.body || {}));
    const rawBody = rawBodyBuffer.toString('utf8');

    if (!signature || !rawBody) {
      throw new WebhookVerificationError('Missing webhook payload');
    }

    const expectedSignature = crypto
      .createHmac('sha256', env.RAZORPAY_WEBHOOK_SECRET)
      .update(rawBody)
      .digest('hex');

    if (expectedSignature !== signature) {
      throw new WebhookVerificationError('Invalid webhook signature');
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;
    const payment = payload?.payload?.payment?.entity;
    const orderId = payment?.order_id;
    const paymentId = payment?.id;

    const subscription = paymentId
      ? await billingRepository.findSubscriptionByPaymentId(paymentId)
      : await billingRepository.findSubscriptionByOrderId(orderId);

    if (!subscription) {
      return { status: 'ignored', event, reason: 'No matching billing record found' };
    }

    let nextStatus = subscription.status;
    if (event === 'payment.captured') {
      nextStatus = 'paid';
      await billingRepository.markUserPremium(subscription.user_id, true);
    } else if (event === 'payment.failed') {
      nextStatus = 'failed';
      await billingRepository.markUserPremium(subscription.user_id, false);
    } else if (event === 'payment.cancelled') {
      nextStatus = 'cancelled';
      await billingRepository.markUserPremium(subscription.user_id, false);
    }

    await billingRepository.updateSubscriptionRecord({
      subscriptionId: subscription.id,
      fields: {
        payment_id: paymentId ?? subscription.payment_id,
        status: nextStatus,
        webhook_event: payload,
      },
    });

    return {
      status: nextStatus,
      event,
      paymentId,
      orderId,
    };
  },
};

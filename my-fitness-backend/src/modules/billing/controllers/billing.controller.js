import { billingService } from '../services/billing.service.js';
import { checkoutSchema, verifySchema } from '../validators/billing.validators.js';

export const billingController = {
  async checkout(req, res, next) {
    try {
      const parsed = checkoutSchema.parse(req.body);
      const result = await billingService.initiateCheckout(req.user.sub, parsed);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  async verify(req, res, next) {
    try {
      const parsed = verifySchema.parse(req.body);
      const result = await billingService.verifyPayment(req.user.sub, parsed);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  async getSubscriptionStatus(req, res, next) {
    try {
      const result = await billingService.getSubscriptionStatus(req.user.sub);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  async premiumFeature(req, res, next) {
    try {
      res.status(200).json({
        success: true,
        data: {
          message: 'Premium feature unlocked',
          feature: 'premium_workout_coach',
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async webhook(req, res, next) {
    try {
      const result = await billingService.handleWebhook(req);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },
};

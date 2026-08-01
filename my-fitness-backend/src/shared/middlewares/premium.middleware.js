import { billingService } from '../../modules/billing/services/billing.service.js';
import { PremiumRequiredError } from '../../modules/billing/errors/billing.errors.js';

export const requirePremium = async (req, res, next) => {
  try {
    await billingService.requirePremium(req.user.sub);
    next();
  } catch (error) {
    if (error instanceof PremiumRequiredError) {
      res.status(402).json({
        success: false,
        premiumRequired: true,
        message: error.message,
      });
      return;
    }

    next(error);
  }
};

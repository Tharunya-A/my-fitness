import express from 'express';
import { billingController } from '../controllers/billing.controller.js';
import { authenticate } from '../../../shared/middlewares/auth.middleware.js';
import { requirePremium } from '../../../shared/middlewares/premium.middleware.js';

const router = express.Router();

/**
 * @openapi
 * /billing/checkout:
 *   post:
 *     tags: [Billing]
 *     summary: Initialize a Razorpay checkout session for premium access
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 99900
 *               currency:
 *                 type: string
 *                 example: INR
 *               plan:
 *                 type: string
 *                 example: premium_monthly
 *     responses:
 *       200:
 *         description: Checkout order created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Billing initialization failed
 */
router.post('/checkout', authenticate, billingController.checkout);

/**
 * @openapi
 * /billing/verify:
 *   post:
 *     tags: [Billing]
 *     summary: Verify a Razorpay payment and activate premium access
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [orderId, paymentId, signature]
 *             properties:
 *               orderId:
 *                 type: string
 *               paymentId:
 *                 type: string
 *               signature:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment verified and premium activated
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Payment verification failed
 */
router.post('/verify', authenticate, billingController.verify);

/**
 * @openapi
 * /billing/status:
 *   get:
 *     tags: [Billing]
 *     summary: Get the authenticated user's subscription status
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Subscription status fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/status', authenticate, billingController.getSubscriptionStatus);

/**
 * @openapi
 * /billing/webhook:
 *   post:
 *     tags: [Billing]
 *     summary: Handle Razorpay webhook events for payment lifecycle updates
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Webhook processed successfully
 *       400:
 *         description: Webhook verification failed
 */
router.post('/webhook', billingController.webhook);

/**
 * @openapi
 * /billing/premium-feature:
 *   get:
 *     tags: [Billing]
 *     summary: Access a premium-only feature route
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Premium feature unlocked successfully
 *       401:
 *         description: Unauthorized
 *       402:
 *         description: Premium subscription required
 */
router.get('/premium-feature', authenticate, requirePremium, billingController.premiumFeature);
// For a non-premium user, the premium middleware responds with a 402 paywall payload.

export default router;

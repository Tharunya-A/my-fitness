import { pgPool } from '../../../config/postgres.config.js';

export const billingRepository = {
  async getUserPremiumState(userId) {
    const result = await pgPool.query(
      'SELECT id, is_premium, updated_at FROM auth_users WHERE id = $1',
      [userId]
    );

    return result.rows[0] || null;
  },

  async createSubscriptionRecord({ userId, orderId, paymentId, amount, currency, receipt, status }) {
    const result = await pgPool.query(
      `INSERT INTO billing_subscriptions (
        user_id, order_id, payment_id, amount, currency, receipt, status, payload
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [userId, orderId, paymentId || null, Number(amount), currency, receipt || null, status, {}]
    );

    return result.rows[0];
  },

  async findLatestSubscriptionByUser(userId) {
    const result = await pgPool.query(
      `SELECT *
       FROM billing_subscriptions
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT 1`,
      [userId]
    );

    return result.rows[0] || null;
  },

  async findSubscriptionByOrderId(orderId) {
    const result = await pgPool.query(
      `SELECT *
       FROM billing_subscriptions
       WHERE order_id = $1
       LIMIT 1`,
      [orderId]
    );

    return result.rows[0] || null;
  },

  async findSubscriptionByPaymentId(paymentId) {
    const result = await pgPool.query(
      `SELECT *
       FROM billing_subscriptions
       WHERE payment_id = $1
       LIMIT 1`,
      [paymentId]
    );

    return result.rows[0] || null;
  },

  async updateSubscriptionRecord({ subscriptionId, fields }) {
    const entries = [];
    const values = [];

    Object.entries(fields).forEach(([key, value], index) => {
      entries.push(`${key} = $${index + 2}`);
      values.push(value);
    });

    values.unshift(subscriptionId);

    const result = await pgPool.query(
      `UPDATE billing_subscriptions
       SET ${entries.join(', ')}, updated_at = NOW()
       WHERE id = $1
       RETURNING *`,
      values
    );

    return result.rows[0] || null;
  },

  async markUserPremium(userId, isPremium) {
    const result = await pgPool.query(
      `UPDATE auth_users
       SET is_premium = $1, updated_at = NOW()
       WHERE id = $2
       RETURNING id, is_premium, updated_at`,
      [isPremium, userId]
    );

    return result.rows[0] || null;
  },
};

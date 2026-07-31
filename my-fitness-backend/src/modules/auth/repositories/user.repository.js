import { pgPool } from '../../../config/postgres.config.js';
import { UserNotFoundError } from '../errors/auth.errors.js';

export const userRepository = {
  async findByUsernameOrEmail(username, email) {
    const result = await pgPool.query(
      'SELECT id FROM auth_users WHERE username = $1 OR email = $2',
      [username, email]
    );
    return result.rows[0] || null;
  },

  async findByUsernameWithProfile(username) {
    const result = await pgPool.query(
      `SELECT u.id, u.username, u.email, u.password_hash, u.is_premium, u.created_at, u.updated_at,
              p.height, p.weight, p.age, p.gender, p.goal, p.activity_level
       FROM auth_users u
       LEFT JOIN user_profiles p ON u.id = p.user_id
       WHERE u.username = $1`,
      [username]
    );
    return result.rows[0] || null;
  },

  async findByIdWithProfile(userId) {
    const result = await pgPool.query(
      `SELECT u.id, u.username, u.email, u.is_premium, u.created_at, u.updated_at,
              p.height, p.weight, p.age, p.gender, p.goal, p.activity_level
       FROM auth_users u
       LEFT JOIN user_profiles p ON u.id = p.user_id
       WHERE u.id = $1`,
      [userId]
    );
    return result.rows[0] || null;
  },

  async createUserWithProfile(userData, profileData = {}) {
    const client = await pgPool.connect();
    try {
      await client.query('BEGIN');

      const userRes = await client.query(
        `INSERT INTO auth_users (username, email, password_hash, is_premium)
         VALUES ($1, $2, $3, $4)
         RETURNING id, username, email, is_premium, created_at, updated_at`,
        [userData.username, userData.email, userData.passwordHash, userData.isPremium ?? false]
      );

      const newUser = userRes.rows[0];

      const profileRes = await client.query(
        `INSERT INTO user_profiles (user_id, height, weight, age, gender, goal, activity_level)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING height, weight, age, gender, goal, activity_level`,
        [
          newUser.id,
          profileData.height ?? null,
          profileData.weight ?? null,
          profileData.age ?? null,
          profileData.gender ?? null,
          profileData.goal ?? null,
          profileData.activityLevel ?? null,
        ]
      );

      await client.query('COMMIT');

      return {
        ...newUser,
        ...profileRes.rows[0],
      };
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  },

  async upsertProfile(userId, profileData = {}) {
    const client = await pgPool.connect();
    try {
      await client.query('BEGIN');

      const userCheck = await client.query('SELECT id FROM auth_users WHERE id = $1', [userId]);
      if (userCheck.rowCount === 0) {
        throw new UserNotFoundError();
      }

      await client.query(
        `INSERT INTO user_profiles (user_id, height, weight, age, gender, goal, activity_level, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
         ON CONFLICT (user_id) DO UPDATE SET
           height = COALESCE(EXCLUDED.height, user_profiles.height),
           weight = COALESCE(EXCLUDED.weight, user_profiles.weight),
           age = COALESCE(EXCLUDED.age, user_profiles.age),
           gender = COALESCE(EXCLUDED.gender, user_profiles.gender),
           goal = COALESCE(EXCLUDED.goal, user_profiles.goal),
           activity_level = COALESCE(EXCLUDED.activity_level, user_profiles.activity_level),
           updated_at = NOW()`,
        [
          userId,
          profileData.height ?? null,
          profileData.weight ?? null,
          profileData.age ?? null,
          profileData.gender ?? null,
          profileData.goal ?? null,
          profileData.activityLevel ?? null,
        ]
      );

      await client.query('UPDATE auth_users SET updated_at = NOW() WHERE id = $1', [userId]);
      await client.query('COMMIT');

      return this.findByIdWithProfile(userId);
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  },
};

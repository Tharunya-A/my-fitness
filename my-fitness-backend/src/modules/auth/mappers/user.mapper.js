export const userMapper = {
  toPublicUser(row) {
    if (!row) return null;

    return {
      id: row.id,
      username: row.username,
      email: row.email,
      profile: {
        height: row.height !== null && row.height !== undefined ? Number(row.height) : null,
        weight: row.weight !== null && row.weight !== undefined ? Number(row.weight) : null,
        age: row.age !== null && row.age !== undefined ? Number(row.age) : null,
        gender: row.gender || null,
        goal: row.goal || null,
        activityLevel: row.activity_level || null,
      },
      isPremium: row.is_premium ?? false,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  },
};

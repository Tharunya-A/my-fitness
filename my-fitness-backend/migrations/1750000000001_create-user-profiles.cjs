// migrations/1750000000001_create-user-profiles.cjs
exports.up = (pgm) => {
  pgm.createTable('user_profiles', {
    id: 'id',
    user_id: {
      type: 'integer',
      notNull: true,
      unique: true,
      references: 'auth_users(id)',
      onDelete: 'CASCADE',
    },
    height: { type: 'numeric', default: null },
    weight: { type: 'numeric', default: null },
    age: { type: 'integer', default: null },
    gender: { type: 'varchar(50)', default: null },
    goal: { type: 'varchar(100)', default: null },
    activity_level: { type: 'varchar(100)', default: null },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('user_profiles');
};
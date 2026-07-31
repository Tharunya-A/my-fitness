// migrations/1750000000000_create-auth-users.cjs
exports.up = (pgm) => {
  pgm.createTable('auth_users', {
    id: 'id',
    username: { type: 'varchar(255)', notNull: true, unique: true },
    email: { type: 'varchar(255)', notNull: true, unique: true },
    password_hash: { type: 'text', notNull: true },
    is_premium: { type: 'boolean', default: false },
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

  pgm.addConstraint('auth_users', 'auth_users_username_check', {
    check: `username <> ''`,
  });
};

exports.down = (pgm) => {
  pgm.dropTable('auth_users');
};
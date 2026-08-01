exports.up = (pgm) => {
  pgm.createTable('billing_subscriptions', {
    id: 'id',
    user_id: {
      type: 'integer',
      notNull: true,
      references: 'auth_users(id)',
      onDelete: 'cascade',
    },
    order_id: { type: 'varchar(255)', notNull: true, unique: true },
    payment_id: { type: 'varchar(255)', unique: true },
    receipt: { type: 'varchar(255)' },
    status: {
      type: 'varchar(30)',
      notNull: true,
      default: 'pending',
    },
    amount: { type: 'integer', notNull: true, default: 200 },
    currency: { type: 'varchar(8)', notNull: true, default: 'INR' },
    signature: { type: 'text' },
    payload: { type: 'jsonb', default: '{}' },
    webhook_event: { type: 'jsonb', default: '{}' },
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

  pgm.createIndex('billing_subscriptions', 'user_id');
  pgm.createIndex('billing_subscriptions', 'order_id');
  pgm.createIndex('billing_subscriptions', 'payment_id');
};

exports.down = (pgm) => {
  pgm.dropTable('billing_subscriptions');
};

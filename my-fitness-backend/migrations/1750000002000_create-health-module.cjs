exports.up = (pgm) => {
  pgm.createTable('health_measurements', {
    id: 'id',
    user_id: {
      type: 'integer',
      notNull: true,
      references: 'auth_users(id)',
      onDelete: 'CASCADE',
    },
    report_id: {
      type: 'integer',
      default: null,
      references: 'medical_reports(id)',
      onDelete: 'SET NULL',
    },
    measurement_type: {
      type: 'varchar(50)',
      notNull: true,
    },
    value: {
      type: 'numeric',
      notNull: true,
    },
    unit: {
      type: 'varchar(30)',
      default: null,
    },
    recorded_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
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

  pgm.createTable('health_biomarkers', {
    id: 'id',
    user_id: {
      type: 'integer',
      notNull: true,
      references: 'auth_users(id)',
      onDelete: 'CASCADE',
    },
    report_id: {
      type: 'integer',
      default: null,
      references: 'medical_reports(id)',
      onDelete: 'SET NULL',
    },
    hemoglobin: { type: 'numeric', default: null },
    vitamin_d: { type: 'numeric', default: null },
    vitamin_b12: { type: 'numeric', default: null },
    cholesterol: { type: 'numeric', default: null },
    hdl_ldl_ratio: { type: 'numeric', default: null },
    fasting_blood_sugar: { type: 'numeric', default: null },
    calcium: { type: 'numeric', default: null },
    recorded_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
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

  pgm.createTable('medical_reports', {
    id: 'id',
    user_id: {
      type: 'integer',
      notNull: true,
      references: 'auth_users(id)',
      onDelete: 'CASCADE',
    },
    report_type: {
      type: 'varchar(50)',
      default: 'medical',
    },
    test_date: {
      type: 'date',
      default: null,
    },
    file_name: {
      type: 'varchar(255)',
      notNull: true,
    },
    s3_key: {
      type: 'text',
      notNull: true,
      unique: true,
    },
    s3_url: {
      type: 'text',
      default: null,
    },
    mime_type: {
      type: 'varchar(100)',
      default: null,
    },
    size_bytes: {
      type: 'bigint',
      default: null,
    },
    description: {
      type: 'text',
      default: null,
    },
    uploaded_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
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

  pgm.addConstraint('health_measurements', 'health_measurements_measurement_type_check', {
    check: `measurement_type IN ('weight', 'body_fat_pct', 'muscle_pct', 'biomarker')`,
  });

  pgm.createIndex('health_measurements', 'user_id');
  pgm.createIndex('health_measurements', 'report_id');
  pgm.createIndex('health_measurements', 'measurement_type');
  pgm.createIndex('health_measurements', ['user_id', 'recorded_at']);

  pgm.createIndex('health_biomarkers', 'user_id');
  pgm.createIndex('health_biomarkers', 'report_id');
  pgm.createIndex('health_biomarkers', ['user_id', 'recorded_at']);

  pgm.createIndex('medical_reports', 'user_id');
  pgm.createIndex('medical_reports', 'test_date');
  pgm.createIndex('medical_reports', ['user_id', 'uploaded_at']);
};

exports.down = (pgm) => {
  pgm.dropTable('medical_reports');
  pgm.dropTable('health_biomarkers');
  pgm.dropTable('health_measurements');
};
import { pgPool } from '../../../config/postgres.config.js';

export const healthRepository = {
  async createMeasurement({ userId, measurementType, value, unit, recordedAt, reportId = null }) {
    const result = await pgPool.query(
      `INSERT INTO health_measurements (user_id, report_id, measurement_type, value, unit, recorded_at)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [userId, reportId, measurementType, value, unit, recordedAt]
    );

    return result.rows[0];
  },

  async findMeasurementsByUser(userId, filters = {}) {
    const clauses = ['user_id = $1'];
    const values = [userId];
    let idx = 2;

    if (filters.type) {
      clauses.push(`measurement_type = $${idx}`);
      values.push(filters.type);
      idx += 1;
    }

    if (filters.from) {
      clauses.push(`recorded_at >= $${idx}`);
      values.push(filters.from);
      idx += 1;
    }

    if (filters.to) {
      clauses.push(`recorded_at <= $${idx}`);
      values.push(filters.to);
      idx += 1;
    }

    const sql = `
      SELECT *
      FROM health_measurements
      WHERE ${clauses.join(' AND ')}
      ORDER BY recorded_at DESC
    `;

    const result = await pgPool.query(sql, values);
    return result.rows;
  },

  async createBiomarker({
    userId,
    reportId = null,
    hemoglobin,
    vitaminD,
    vitaminB12,
    cholesterol,
    hdlLdlRatio,
    fastingBloodSugar,
    calcium,
    recordedAt,
  }) {
    const result = await pgPool.query(
      `INSERT INTO health_biomarkers (
        user_id,
        report_id,
        hemoglobin,
        vitamin_d,
        vitamin_b12,
        cholesterol,
        hdl_ldl_ratio,
        fasting_blood_sugar,
        calcium,
        recorded_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *`,
      [
        userId,
        reportId,
        hemoglobin,
        vitaminD,
        vitaminB12,
        cholesterol,
        hdlLdlRatio,
        fastingBloodSugar,
        calcium,
        recordedAt,
      ]
    );

    return result.rows[0];
  },

  async findBiomarkersByUser(userId, filters = {}) {
    const clauses = ['user_id = $1'];
    const values = [userId];
    let idx = 2;

    if (filters.from) {
      clauses.push(`recorded_at >= $${idx}`);
      values.push(filters.from);
      idx += 1;
    }

    if (filters.to) {
      clauses.push(`recorded_at <= $${idx}`);
      values.push(filters.to);
      idx += 1;
    }

    const sql = `
      SELECT *
      FROM health_biomarkers
      WHERE ${clauses.join(' AND ')}
      ORDER BY recorded_at DESC
    `;

    const result = await pgPool.query(sql, values);
    return result.rows;
  },

  async createReport({
    userId,
    reportType,
    testDate,
    fileName,
    s3Key,
    s3Url,
    mimeType,
    sizeBytes,
    description,
  }) {
    const result = await pgPool.query(
      `INSERT INTO medical_reports (
        user_id,
        report_type,
        test_date,
        file_name,
        s3_key,
        s3_url,
        mime_type,
        size_bytes,
        description
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`,
      [userId, reportType, testDate, fileName, s3Key, s3Url, mimeType, sizeBytes, description]
    );

    return result.rows[0];
  },

  async findReportsByUser(userId, query = {}) {
    const result = await pgPool.query(
      `SELECT *
       FROM medical_reports
       WHERE user_id = $1
       ORDER BY uploaded_at DESC`,
      [userId]
    );

    return result.rows;
  },

  async findReportById(reportId) {
    const result = await pgPool.query(
      `SELECT *
       FROM medical_reports
       WHERE id = $1`,
      [reportId]
    );

    return result.rows[0] || null;
  },
};
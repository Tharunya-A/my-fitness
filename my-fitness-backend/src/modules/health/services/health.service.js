import { healthRepository } from '../repositories/health.repository.js';
import {
  FileUploadError,
  HealthRecordNotFoundError,
  UnauthorizedHealthAccessError,
} from '../errors/health.errors.js';
import { uploadPdfToS3 } from '../../../config/s3.config.js';

export const healthService = {
  async logMeasurement(userId, payload) {
    return healthRepository.createMeasurement({
      userId,
      measurementType: payload.measurementType,
      value: payload.value,
      unit: payload.unit ?? null,
      recordedAt: payload.recordedAt ?? new Date().toISOString(),
      reportId: payload.reportId ?? null,
    });
  },

  async getMeasurements(userId, query = {}) {
    const { type, from, to } = query;
    return healthRepository.findMeasurementsByUser(userId, {
      type,
      from,
      to,
    });
  },

  async logBiomarker(userId, payload) {
    return healthRepository.createBiomarker({
      userId,
      reportId: payload.reportId ?? null,
      hemoglobin: payload.hemoglobin ?? null,
      vitaminD: payload.vitaminD ?? null,
      vitaminB12: payload.vitaminB12 ?? null,
      cholesterol: payload.cholesterol ?? null,
      hdlLdlRatio: payload.hdlLdlRatio ?? null,
      fastingBloodSugar: payload.fastingBloodSugar ?? null,
      calcium: payload.calcium ?? null,
      recordedAt: payload.recordedAt ?? new Date().toISOString(),
    });
  },

  async getBiomarkers(userId, query = {}) {
    const { from, to } = query;
    return healthRepository.findBiomarkersByUser(userId, { from, to });
  },

  async uploadReport(userId, payload) {
    if (!payload.file || payload.file.mimetype !== 'application/pdf') {
      throw new FileUploadError('Only PDF upload is supported');
    }

    const key = `health-reports/${userId}/${Date.now()}-${payload.file.originalname}`;

    try {
      await uploadPdfToS3({
        key,
        body: payload.file.buffer,
        contentType: payload.file.mimetype,
      });

      const saved = await healthRepository.createReport({
        userId,
        reportType: payload.reportType ?? 'medical',
        testDate: payload.testDate ?? null,
        fileName: payload.file.originalname,
        s3Key: key,
        s3Url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${key}`,
        mimeType: payload.file.mimetype,
        sizeBytes: payload.file.size,
        description: payload.description ?? null,
      });

      return saved;
    } catch (error) {
      throw new FileUploadError(error.message || 'Failed to upload medical report');
    }
  },

  async getReports(userId, query = {}) {
    return healthRepository.findReportsByUser(userId, query);
  },

  async getReportById(userId, reportId) {
    const report = await healthRepository.findReportById(reportId);

    if (!report) {
      throw new HealthRecordNotFoundError('Medical report not found');
    }

    if (report.user_id !== Number(userId)) {
      throw new UnauthorizedHealthAccessError();
    }

    return report;
  },

  async previewReport(userId, reportId) {
    const report = await healthRepository.findReportById(reportId);
    if (!report) {
      throw new HealthRecordNotFoundError('Medical report not found');
    }

    if (report.user_id !== Number(userId)) {
      throw new UnauthorizedHealthAccessError();
    }

    return {
      id: report.id,
      s3Key: report.s3_key,
      s3Url: report.s3_url,
      fileName: report.file_name,
      mimeType: report.mime_type,
    };
  },
};
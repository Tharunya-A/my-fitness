import { healthService } from '../services/health.service.js';
import {
  measurementSchema,
  biomarkerSchema,
  reportUploadSchema,
} from '../validators/health.validators.js';

export const healthController = {
  async logMeasurement(req, res, next) {
    try {
      const parsed = measurementSchema.parse(req.body);
      const result = await healthService.logMeasurement(req.user.sub, parsed);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  async getMeasurements(req, res, next) {
    try {
      const result = await healthService.getMeasurements(req.user.sub, req.query);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  async logBiomarker(req, res, next) {
    try {
      const parsed = biomarkerSchema.parse(req.body);
      const result = await healthService.logBiomarker(req.user.sub, parsed);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  async getBiomarkers(req, res, next) {
    try {
      const result = await healthService.getBiomarkers(req.user.sub, req.query);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  async uploadReport(req, res, next) {
    try {
      const parsed = reportUploadSchema.parse({
        ...req.body,
        file: req.file,
      });

      const result = await healthService.uploadReport(req.user.sub, parsed);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  async getReports(req, res, next) {
    try {
      const result = await healthService.getReports(req.user.sub, req.query);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  async getReportById(req, res, next) {
    try {
      const result = await healthService.getReportById(req.user.sub, req.params.id);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  async previewReport(req, res, next) {
    try {
      const result = await healthService.previewReport(req.user.sub, req.params.id);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },
};
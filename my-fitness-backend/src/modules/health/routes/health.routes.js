import express from 'express';
import multer from 'multer';
import { healthController } from '../controllers/health.controller.js';
import { authenticate } from '../../../shared/middlewares/auth.middleware.js';

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed'));
    }
    cb(null, true);
  },
});

/**
 * @openapi
 * /health/measurements:
 *   post:
 *     tags: [Health]
 *     summary: Log a body measurement
 *     security:
 *       - bearerAuth: []
 */
router.post('/measurements', authenticate, healthController.logMeasurement);

/**
 * @openapi
 * /health/measurements:
 *   get:
 *     tags: [Health]
 *     summary: Get all measurement history for the user
 *     security:
 *       - bearerAuth: []
 */
router.get('/measurements', authenticate, healthController.getMeasurements);

/**
 * @openapi
 * /health/biomarkers:
 *   post:
 *     tags: [Health]
 *     summary: Log manual biomarker values
 *     security:
 *       - bearerAuth: []
 */
router.post('/biomarkers', authenticate, healthController.logBiomarker);

/**
 * @openapi
 * /health/biomarkers:
 *   get:
 *     tags: [Health]
 *     summary: Get biomarker history
 *     security:
 *       - bearerAuth: []
 */
router.get('/biomarkers', authenticate, healthController.getBiomarkers);

/**
 * @openapi
 * /health/reports/upload:
 *   post:
 *     tags: [Health]
 *     summary: Upload a medical report as PDF
 *     security:
 *       - bearerAuth: []
 */
router.post(
  '/reports/upload',
  authenticate,
  upload.single('report'),
  healthController.uploadReport
);

/**
 * @openapi
 * /health/reports:
 *   get:
 *     tags: [Health]
 *     summary: List uploaded medical reports
 *     security:
 *       - bearerAuth: []
 */
router.get('/reports', authenticate, healthController.getReports);

/**
 * @openapi
 * /health/reports/:id:
 *   get:
 *     tags: [Health]
 *     summary: Get medical report metadata
 *     security:
 *       - bearerAuth: []
 */
router.get('/reports/:id', authenticate, healthController.getReportById);

/**
 * @openapi
 * /health/reports/:id/preview:
 *   get:
 *     tags: [Health]
 *     summary: Preview a medical report
 *     security:
 *       - bearerAuth: []
 */
router.get('/reports/:id/preview', authenticate, healthController.previewReport);

export default router;
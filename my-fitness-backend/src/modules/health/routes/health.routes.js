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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [measurementType, value]
 *             properties:
 *               measurementType:
 *                 type: string
 *                 enum: [weight, body_fat_pct, muscle_pct, biomarker]
 *               value:
 *                 type: number
 *               unit:
 *                 type: string
 *               recordedAt:
 *                 type: string
 *                 format: date-time
 *               reportId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Measurement logged successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/measurements', authenticate, healthController.logMeasurement);

/**
 * @openapi
 * /health/measurements:
 *   get:
 *     tags: [Health]
 *     summary: Get measurement history
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date-time
 *     responses:
 *       200:
 *         description: Measurement history fetched successfully
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reportId:
 *                 type: integer
 *               hemoglobin:
 *                 type: number
 *               vitaminD:
 *                 type: number
 *               vitaminB12:
 *                 type: number
 *               cholesterol:
 *                 type: number
 *               hdlLdlRatio:
 *                 type: number
 *               fastingBloodSugar:
 *                 type: number
 *               calcium:
 *                 type: number
 *               recordedAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Biomarker saved successfully
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
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date-time
 *     responses:
 *       200:
 *         description: Biomarker history fetched successfully
 */
router.get('/biomarkers', authenticate, healthController.getBiomarkers);

/**
 * @openapi
 * /health/reports/upload:
 *   post:
 *     tags: [Health]
 *     summary: Upload a medical report PDF
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [report]
 *             properties:
 *               report:
 *                 type: string
 *                 format: binary
 *               reportType:
 *                 type: string
 *               testDate:
 *                 type: string
 *                 format: date
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Medical report uploaded successfully
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
 *     summary: Get uploaded medical reports
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reports fetched successfully
 */
router.get('/reports', authenticate, healthController.getReports);

/**
 * @openapi
 * /health/reports/{id}:
 *   get:
 *     tags: [Health]
 *     summary: Get medical report metadata by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Report metadata fetched successfully
 */
router.get('/reports/:id', authenticate, healthController.getReportById);

/**
 * @openapi
 * /health/reports/{id}/preview:
 *   get:
 *     tags: [Health]
 *     summary: Preview a medical report in-app
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Preview response returned successfully
 */
router.get('/reports/:id/preview', authenticate, healthController.previewReport);

export default router;
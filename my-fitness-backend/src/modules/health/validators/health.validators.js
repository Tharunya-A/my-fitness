import { z } from 'zod';

export const measurementSchema = z.object({
  measurementType: z.enum(['weight', 'body_fat_pct', 'muscle_pct', 'biomarker']),
  value: z.number().positive(),
  unit: z.string().optional(),
  recordedAt: z.string().datetime().optional(),
  reportId: z.number().int().positive().optional(),
}).strict();

export const biomarkerSchema = z.object({
  reportId: z.number().int().positive().optional(),
  hemoglobin: z.number().optional(),
  vitaminD: z.number().optional(),
  vitaminB12: z.number().optional(),
  cholesterol: z.number().optional(),
  hdlLdlRatio: z.number().optional(),
  fastingBloodSugar: z.number().optional(),
  calcium: z.number().optional(),
  recordedAt: z.string().datetime().optional(),
}).strict();

export const reportUploadSchema = z.object({
  reportType: z.string().optional(),
  testDate: z.string().date().optional(),
  description: z.string().optional(),
  file: z.any(),
}).strict();
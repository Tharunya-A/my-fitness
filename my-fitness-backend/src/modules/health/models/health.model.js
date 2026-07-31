export const healthMeasurementModel = {
  type: 'weight | body_fat_pct | muscle_pct',
  value: 'number',
  unit: 'string',
  recordedAt: 'ISO date string',
};

export const biomarkerModel = {
  hemoglobin: 'number',
  vitaminD: 'number',
  vitaminB12: 'number',
  cholesterol: 'number',
  hdlLdlRatio: 'number',
  fastingBloodSugar: 'number',
  calcium: 'number',
  recordedAt: 'ISO date string',
};